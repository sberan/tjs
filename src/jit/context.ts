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
}

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

  /** Map of schema -> its base URI */
  readonly #schemaToBaseUri = new Map<JsonSchema, string>();

  /** Runtime functions/values that will be available in generated code */
  readonly #runtimeFunctions: Map<string, unknown> = new Map();

  /** Schemas that need to be compiled (queue) */
  readonly #compileQueue: Array<{ schema: JsonSchema; funcName: string }> = [];

  /** Root schema for JSON pointer resolution */
  readonly #rootSchema: JsonSchema;

  constructor(rootSchema: JsonSchema, options: JITOptions = {}) {
    this.#rootSchema = rootSchema;
    this.options = {
      formatAssertion: options.formatAssertion ?? true,
      remotes: options.remotes ?? {},
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
    this.#collectAnchors(rootSchema, rootBaseUri);
  }

  /**
   * Collect $id, $anchor, and $dynamicAnchor from a schema tree
   */
  #collectAnchors(schema: JsonSchema, baseUri: string): void {
    if (typeof schema !== 'object' || schema === null) return;

    let currentBaseUri = baseUri;
    if (schema.$id) {
      currentBaseUri = this.#resolveUri(schema.$id, baseUri);
      this.#schemasById.set(currentBaseUri, schema);
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
    }

    // Recurse into subschemas
    const subschemas = [
      ...(schema.$defs ? Object.values(schema.$defs) : []),
      ...(schema.properties ? Object.values(schema.properties) : []),
      ...(schema.prefixItems ?? []),
      ...(schema.anyOf ?? []),
      ...(schema.oneOf ?? []),
      ...(schema.allOf ?? []),
      schema.items,
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
      ...(schema.patternProperties ? Object.values(schema.patternProperties) : []),
    ];

    for (const sub of subschemas) {
      if (typeof sub === 'object' && sub !== null) {
        this.#collectAnchors(sub, currentBaseUri);
      }
    }
  }

  #resolveUri(ref: string, baseUri: string): string {
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) return ref;
    if (!baseUri) return ref;
    const baseWithoutFragment = baseUri.split('#')[0];
    const lastSlash = baseWithoutFragment.lastIndexOf('/');
    if (lastSlash !== -1) {
      return baseWithoutFragment.slice(0, lastSlash + 1) + ref;
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
          return this.#resolveJsonPointer(baseSchema, fragment.slice(1));
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
}
