/**
 * Compilation context for JIT compiler
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';

/**
 * Options for JIT compilation
 */
export interface JITOptions {
  /** Whether format validation is an assertion (default: true) */
  formatAssertion?: boolean;
  /** Remote schemas for $ref resolution */
  remotes?: Record<string, JsonSchema>;
  /**
   * Legacy $ref behavior (draft-07 and earlier): $ref overrides all sibling keywords.
   * When true, sibling keywords like maxItems are ignored when $ref is present.
   * Default: true (for backwards compatibility with older drafts)
   */
  legacyRef?: boolean;
}

/**
 * Standard JSON Schema 2020-12 vocabularies
 */
export const VOCABULARIES = {
  core: 'https://json-schema.org/draft/2020-12/vocab/core',
  applicator: 'https://json-schema.org/draft/2020-12/vocab/applicator',
  validation: 'https://json-schema.org/draft/2020-12/vocab/validation',
  meta_data: 'https://json-schema.org/draft/2020-12/vocab/meta-data',
  format_annotation: 'https://json-schema.org/draft/2020-12/vocab/format-annotation',
  format_assertion: 'https://json-schema.org/draft/2020-12/vocab/format-assertion',
  content: 'https://json-schema.org/draft/2020-12/vocab/content',
  unevaluated: 'https://json-schema.org/draft/2020-12/vocab/unevaluated',
} as const;

/**
 * A compiled sub-schema function
 */
export type CompiledValidator = (data: unknown) => boolean;

/**
 * Context maintained during schema compilation
 */
export class CompileContext {
  /** Options for compilation */
  readonly options: Required<Omit<JITOptions, 'remotes'>> & { remotes: Record<string, JsonSchema> };

  /** Counter for generating unique function names */
  #funcCounter = 0;

  /** Map of schema reference -> compiled function name */
  readonly #compiledRefs = new Map<JsonSchema, string>();

  /** Map of schema $id -> schema */
  readonly #schemasById = new Map<string, JsonSchema>();

  /** Map of anchor name -> schema */
  readonly #anchors = new Map<string, JsonSchema>();

  /** Map of dynamic anchor name -> list of schemas with that $dynamicAnchor */
  readonly #dynamicAnchors = new Map<string, JsonSchema[]>();

  /** Map of schema -> its base URI */
  readonly #schemaToBaseUri = new Map<JsonSchema, string>();

  /** Map of schema resource (by $id) -> all dynamic anchors within that resource */
  readonly #resourceDynamicAnchors = new Map<
    string,
    Array<{ anchor: string; schema: JsonSchema }>
  >();

  /** Runtime functions/values that will be available in generated code */
  readonly #runtimeFunctions: Map<string, unknown> = new Map();

  /** Schemas that need to be compiled (queue) */
  readonly #compileQueue: Array<{ schema: JsonSchema; funcName: string }> = [];

  /** Root schema for JSON pointer resolution */
  readonly #rootSchema: JsonSchema;

  /** Set of enabled vocabulary URIs (null means all vocabularies are enabled) */
  readonly #enabledVocabularies: Set<string> | null;

  constructor(rootSchema: JsonSchema, options: JITOptions = {}) {
    this.#rootSchema = rootSchema;
    this.options = {
      formatAssertion: options.formatAssertion ?? true,
      remotes: options.remotes ?? {},
      legacyRef: options.legacyRef ?? true,
    };

    // Register remote schemas
    for (const [uri, schema] of Object.entries(this.options.remotes)) {
      if (typeof schema === 'object' && schema !== null) {
        this.#schemasById.set(uri, schema);
        if (schema.$id) {
          this.#schemasById.set(schema.$id, schema);
        }
        this.#collectAnchors(schema, schema.$id ?? uri);
      }
    }

    // Collect anchors from root schema
    const rootBaseUri =
      typeof rootSchema === 'object' && rootSchema !== null && rootSchema.$id ? rootSchema.$id : '';
    // Use empty string '' as the resource ID for root schema without $id
    this.#collectAnchors(rootSchema, rootBaseUri, rootBaseUri || '__root__');

    // Determine enabled vocabularies from metaschema
    this.#enabledVocabularies = this.#resolveVocabularies(rootSchema);
  }

  /**
   * Resolve vocabularies from the root schema's $schema metaschema
   */
  #resolveVocabularies(schema: JsonSchema): Set<string> | null {
    if (typeof schema !== 'object' || schema === null || !schema.$schema) {
      return null; // All vocabularies enabled by default
    }

    // Standard draft 2020-12 metaschema - all vocabularies enabled
    if (schema.$schema === 'https://json-schema.org/draft/2020-12/schema') {
      return null;
    }

    // Try to resolve the custom metaschema
    const metaschema = this.#schemasById.get(schema.$schema);
    if (!metaschema || typeof metaschema !== 'object' || metaschema === null) {
      return null; // Can't resolve, assume all enabled
    }

    // Check for $vocabulary in the metaschema
    const vocabulary = (metaschema as { $vocabulary?: Record<string, boolean> }).$vocabulary;
    if (!vocabulary || typeof vocabulary !== 'object') {
      return null; // No vocabulary specified, all enabled
    }

    // Build set of enabled vocabularies
    const enabled = new Set<string>();
    for (const [vocabUri, required] of Object.entries(vocabulary)) {
      // Include vocabulary if it's marked as true or if we should support optional ones
      if (required === true) {
        enabled.add(vocabUri);
      }
    }

    return enabled;
  }

  /**
   * Collect $id, $anchor, and $dynamicAnchor from a schema tree
   * @param resourceId - The $id of the current schema resource (for tracking dynamic anchors per resource)
   */
  #collectAnchors(schema: JsonSchema, baseUri: string, resourceId?: string): void {
    if (typeof schema !== 'object' || schema === null) return;

    let currentBaseUri = baseUri;
    let currentResourceId = resourceId;

    // Handle $id (draft-06+) and id (draft-04)
    const schemaId = schema.$id ?? schema.id;
    if (schemaId) {
      // In draft-07 and earlier, $id/id can be a plain fragment like "#foo" which acts as an anchor
      if (schemaId.startsWith('#')) {
        // Plain fragment id - treat as anchor (legacy draft behavior)
        const anchorName = schemaId.slice(1);
        const anchorUri = currentBaseUri ? `${currentBaseUri}${schemaId}` : schemaId;
        this.#anchors.set(anchorUri, schema);
        this.#anchors.set(anchorName, schema);
        this.#anchors.set(schemaId, schema);
      } else {
        currentBaseUri = this.#resolveUri(schemaId, baseUri);
        this.#schemasById.set(currentBaseUri, schema);
        // This is a new schema resource
        currentResourceId = currentBaseUri;
      }
    }
    this.#schemaToBaseUri.set(schema, currentBaseUri);

    if (schema.$anchor) {
      const anchorUri = currentBaseUri
        ? `${currentBaseUri}#${schema.$anchor}`
        : `#${schema.$anchor}`;
      this.#anchors.set(anchorUri, schema);
      this.#anchors.set(schema.$anchor, schema);
    }

    if (schema.$dynamicAnchor) {
      const anchorUri = currentBaseUri
        ? `${currentBaseUri}#${schema.$dynamicAnchor}`
        : `#${schema.$dynamicAnchor}`;
      this.#anchors.set(anchorUri, schema);
      this.#anchors.set(schema.$dynamicAnchor, schema);

      // Also store in dynamic anchors map for runtime resolution
      const existingList = this.#dynamicAnchors.get(schema.$dynamicAnchor) ?? [];
      existingList.push(schema);
      this.#dynamicAnchors.set(schema.$dynamicAnchor, existingList);

      // Track this dynamic anchor for its schema resource
      if (currentResourceId) {
        const resourceAnchors = this.#resourceDynamicAnchors.get(currentResourceId) ?? [];
        resourceAnchors.push({ anchor: schema.$dynamicAnchor, schema });
        this.#resourceDynamicAnchors.set(currentResourceId, resourceAnchors);
      }
    }

    // Recurse into subschemas
    // Note: 'definitions' is the draft-07 equivalent of '$defs'
    const subschemas = [
      ...(schema.$defs ? Object.values(schema.$defs) : []),
      ...(schema.definitions ? Object.values(schema.definitions) : []),
      ...(schema.properties ? Object.values(schema.properties) : []),
      ...(schema.prefixItems ?? []),
      ...(schema.anyOf ?? []),
      ...(schema.oneOf ?? []),
      ...(schema.allOf ?? []),
      ...(Array.isArray(schema.items) ? schema.items : schema.items ? [schema.items] : []),
      schema.additionalItems,
      schema.additionalProperties,
      schema.unevaluatedProperties,
      schema.unevaluatedItems,
      schema.not,
      schema.if,
      schema.then,
      schema.else,
      schema.contains,
      schema.propertyNames,
      ...(schema.dependentSchemas ? Object.values(schema.dependentSchemas) : []),
      ...(schema.dependencies
        ? Object.values(schema.dependencies).filter((v) => !Array.isArray(v))
        : []),
      ...(schema.patternProperties ? Object.values(schema.patternProperties) : []),
    ];

    for (const sub of subschemas) {
      if (typeof sub === 'object' && sub !== null) {
        this.#collectAnchors(sub, currentBaseUri, currentResourceId);
      }
    }
  }

  #resolveUri(ref: string, baseUri: string): string {
    // Already absolute URI
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) return ref;
    if (!baseUri) return ref;

    const baseWithoutFragment = baseUri.split('#')[0];

    // Handle absolute path references (starting with /)
    if (ref.startsWith('/')) {
      // Get scheme and authority from base URI
      const match = baseWithoutFragment.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]*)/i);
      if (match) {
        return match[1] + ref;
      }
      return ref;
    }

    // Handle relative path references (like ./bar.json or bar.json)
    // Strip ./ prefix if present
    let normalizedRef = ref;
    if (ref.startsWith('./')) {
      normalizedRef = ref.slice(2);
    }

    const lastSlash = baseWithoutFragment.lastIndexOf('/');
    if (lastSlash !== -1) {
      return baseWithoutFragment.slice(0, lastSlash + 1) + normalizedRef;
    }
    return ref;
  }

  /**
   * Generate a unique function name for a schema
   */
  genFuncName(): string {
    return `validate${this.#funcCounter++}`;
  }

  /**
   * Generate a unique name for a runtime value
   */
  genRuntimeName(prefix: string): string {
    return `${prefix}${this.#funcCounter++}`;
  }

  /**
   * Check if a schema has already been compiled
   */
  isCompiled(schema: JsonSchema): boolean {
    return this.#compiledRefs.has(schema);
  }

  /**
   * Get the function name for a compiled schema
   */
  getCompiledName(schema: JsonSchema): string | undefined {
    return this.#compiledRefs.get(schema);
  }

  /**
   * Register a schema as compiled with its function name
   */
  registerCompiled(schema: JsonSchema, funcName: string): void {
    this.#compiledRefs.set(schema, funcName);
  }

  /**
   * Queue a schema for compilation (used for $ref targets)
   */
  queueCompile(schema: JsonSchema): string {
    const existing = this.#compiledRefs.get(schema);
    if (existing) return existing;

    const funcName = this.genFuncName();
    this.#compiledRefs.set(schema, funcName);
    this.#compileQueue.push({ schema, funcName });
    return funcName;
  }

  /**
   * Get the next schema to compile from the queue
   */
  nextToCompile(): { schema: JsonSchema; funcName: string } | undefined {
    return this.#compileQueue.shift();
  }

  /**
   * Resolve a $ref to a schema
   */
  resolveRef(ref: string, fromSchema: JsonSchemaBase): JsonSchema | undefined {
    const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';

    if (ref === '#') {
      if (currentBaseUri) {
        return this.#schemasById.get(currentBaseUri);
      }
      // When no base URI, '#' refers to root schema
      return this.#rootSchema;
    }

    if (ref.startsWith('#/')) {
      // JSON pointer
      if (currentBaseUri) {
        const baseSchema = this.#schemasById.get(currentBaseUri);
        if (baseSchema) {
          return this.#resolveJsonPointer(baseSchema, ref.slice(1));
        }
      }
      // When no base URI, resolve against root schema
      return this.#resolveJsonPointer(this.#rootSchema, ref.slice(1));
    }

    // Check anchors
    const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      if (currentBaseUri) {
        const fullAnchorUri = `${currentBaseUri}#${anchorMatch[1]}`;
        const result = this.#anchors.get(fullAnchorUri);
        if (result) return result;
      }
      return this.#anchors.get(anchorMatch[1]);
    }

    // Handle refs with fragments
    const fragmentIndex = ref.indexOf('#');
    if (fragmentIndex !== -1) {
      const refBaseUri = ref.slice(0, fragmentIndex);
      const fragment = ref.slice(fragmentIndex);
      const resolvedUri = this.#resolveUri(refBaseUri, currentBaseUri);
      const baseSchema = this.#schemasById.get(resolvedUri);

      if (baseSchema) {
        if (fragment === '#') return baseSchema;
        if (fragment.startsWith('#/')) {
          const resolved = this.#resolveJsonPointer(baseSchema, fragment.slice(1));
          // Set base URI for subschemas resolved via JSON pointer so internal $refs work
          if (resolved && typeof resolved === 'object' && !this.#schemaToBaseUri.has(resolved)) {
            this.#schemaToBaseUri.set(resolved, resolvedUri);
          }
          return resolved;
        }
        // Anchor reference
        const anchorName = fragment.slice(1);
        return this.#anchors.get(`${resolvedUri}#${anchorName}`) ?? this.#anchors.get(anchorName);
      }
    }

    // Plain URI reference
    const resolvedRef = this.#resolveUri(ref, currentBaseUri);
    return this.#schemasById.get(resolvedRef) ?? this.#schemasById.get(ref);
  }

  #resolveJsonPointer(schema: JsonSchema, pointer: string): JsonSchema | undefined {
    if (pointer === '' || pointer === '/') return schema;

    const segments = pointer
      .split('/')
      .slice(1)
      .map((seg) => {
        try {
          return decodeURIComponent(seg).replace(/~1/g, '/').replace(/~0/g, '~');
        } catch {
          return seg.replace(/~1/g, '/').replace(/~0/g, '~');
        }
      });

    let current: unknown = schema;
    for (const segment of segments) {
      if (current === null || typeof current !== 'object') return undefined;
      if (Array.isArray(current)) {
        const index = parseInt(segment, 10);
        if (isNaN(index) || index < 0 || index >= current.length) return undefined;
        current = current[index];
      } else {
        const obj = current as Record<string, unknown>;
        if (!(segment in obj)) return undefined;
        current = obj[segment];
      }
    }
    return current as JsonSchema;
  }

  /**
   * Register a runtime value (available in generated code)
   */
  addRuntimeFunction(name: string, value: unknown): void {
    this.#runtimeFunctions.set(name, value);
  }

  /**
   * Get all runtime values
   */
  getRuntimeFunctions(): Map<string, unknown> {
    return this.#runtimeFunctions;
  }

  /**
   * Get base URI for a schema
   */
  getBaseUri(schema: JsonSchemaBase): string {
    return this.#schemaToBaseUri.get(schema) ?? '';
  }

  /**
   * Get all schemas with a given $dynamicAnchor name
   */
  getDynamicAnchors(anchorName: string): JsonSchema[] {
    return this.#dynamicAnchors.get(anchorName) ?? [];
  }

  /**
   * Check if a schema has a $dynamicAnchor
   */
  hasDynamicAnchor(schema: JsonSchema): boolean {
    return typeof schema === 'object' && schema !== null && schema.$dynamicAnchor !== undefined;
  }

  /**
   * Get the $dynamicAnchor name for a schema
   */
  getDynamicAnchorName(schema: JsonSchema): string | undefined {
    if (typeof schema === 'object' && schema !== null) {
      return schema.$dynamicAnchor;
    }
    return undefined;
  }

  /**
   * Get all dynamic anchors for a schema resource (by its $id or '__root__' for root without $id)
   */
  getResourceDynamicAnchors(resourceId: string): Array<{ anchor: string; schema: JsonSchema }> {
    return this.#resourceDynamicAnchors.get(resourceId) ?? [];
  }

  /**
   * Get the resource ID ($id) for a schema
   */
  getSchemaResourceId(schema: JsonSchema): string | undefined {
    if (typeof schema === 'object' && schema !== null && schema.$id) {
      return this.#schemaToBaseUri.get(schema);
    }
    return undefined;
  }

  /**
   * Get root schema
   */
  getRootSchema(): JsonSchema {
    return this.#rootSchema;
  }

  /**
   * Extract the resource ID from a $ref string, resolving it against the current base URI.
   * Returns the base URI of the schema resource being referenced, or undefined if the ref
   * is just a fragment reference (like "#/defs/foo" or "#anchor").
   */
  getRefResourceId(ref: string, fromSchema: JsonSchemaBase): string | undefined {
    // Pure fragment references don't change the resource
    if (ref.startsWith('#')) {
      return undefined;
    }

    // Get the current base URI
    const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';

    // Parse the ref to get the base URI (without fragment)
    const fragmentIndex = ref.indexOf('#');
    const refUri = fragmentIndex !== -1 ? ref.slice(0, fragmentIndex) : ref;

    if (!refUri) {
      // Just a fragment, no resource change
      return undefined;
    }

    // Resolve the URI against the current base
    const resolvedUri = this.#resolveUri(refUri, currentBaseUri);

    // Check if this is a known schema resource
    if (this.#schemasById.has(resolvedUri)) {
      return resolvedUri;
    }

    return undefined;
  }

  /**
   * Check if a vocabulary is enabled for this schema
   * @param vocabularyUri - The vocabulary URI to check
   * @returns true if the vocabulary is enabled
   */
  isVocabularyEnabled(vocabularyUri: string): boolean {
    // If no vocabulary restrictions, all are enabled
    if (this.#enabledVocabularies === null) {
      return true;
    }
    return this.#enabledVocabularies.has(vocabularyUri);
  }
}
