import type { JsonSchema, JsonSchemaBase } from './types.js';
import type { KeywordContext, KeywordResult } from './keywords/types.js';
import { mergeResults, EMPTY_RESULT, Vocabulary } from './keywords/types.js';

// Import keyword validators
import { validateRef, validateDynamicRef } from './keywords/core/index.js';
import {
  validateType,
  validateConst,
  validateEnum,
  validateString,
  validateNumber,
  validateArrayConstraints,
  validateObjectConstraints,
  validateFormat,
} from './keywords/validation/index.js';
import {
  validateAllOf,
  validateAnyOf,
  validateOneOf,
  validateNot,
  validateIfThenElse,
  validateProperties,
  validatePropertyNames,
  validateDependentSchemas,
  validateItems,
  validateContains,
} from './keywords/applicator/index.js';
import {
  validateUnevaluatedProperties,
  validateUnevaluatedItems,
} from './keywords/unevaluated/index.js';

// Re-export types
export type { ValidationError, KeywordResult } from './keywords/types.js';

export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: import('./keywords/types.js').ValidationError[] };

export interface ValidatorOptions {
  formatAssertion?: boolean;
  remotes?: Record<string, JsonSchema>;
}

export class Validator<T> {
  readonly #schema: JsonSchema;
  readonly #anchors: Map<string, JsonSchema>;
  readonly #schemasById: Map<string, JsonSchema>;
  readonly #schemaToBaseUri: Map<JsonSchema, string>;
  readonly #dynamicAnchors: Map<string, JsonSchema[]>;
  readonly #options: { formatAssertion: boolean };
  readonly #metaschemaVocabularies: Map<string, Set<string>>;
  readonly #enabledVocabularies: Set<string> | null;

  declare readonly type: T;

  constructor(schema: JsonSchema, options: ValidatorOptions = {}) {
    this.#schema = schema;
    this.#anchors = new Map();
    this.#schemasById = new Map();
    this.#schemaToBaseUri = new Map();
    this.#dynamicAnchors = new Map();
    this.#options = {
      formatAssertion: options.formatAssertion ?? true,
    };
    this.#metaschemaVocabularies = new Map();

    if (options.remotes) {
      for (const [uri, remoteSchema] of Object.entries(options.remotes)) {
        const schemaId =
          typeof remoteSchema === 'object' && remoteSchema !== null && remoteSchema.$id
            ? remoteSchema.$id
            : uri;
        if (typeof remoteSchema === 'object' && remoteSchema !== null) {
          this.#schemasById.set(uri, remoteSchema);
          this.#extractVocabularies(remoteSchema, schemaId);
        }
        this.#collectAnchors(remoteSchema, schemaId);
      }
    }

    const rootBaseUri =
      typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : '';
    this.#collectAnchors(schema, rootBaseUri);

    if (typeof schema === 'object' && schema !== null && schema.$schema) {
      const vocabs = this.#metaschemaVocabularies.get(schema.$schema);
      this.#enabledVocabularies = vocabs ?? null;
    } else {
      this.#enabledVocabularies = null;
    }
  }

  #extractVocabularies(schema: JsonSchema, schemaId: string): void {
    if (typeof schema !== 'object' || schema === null) return;
    if (schema.$vocabulary && typeof schema.$vocabulary === 'object') {
      const enabledVocabs = new Set<string>();
      for (const [vocabUri, _required] of Object.entries(schema.$vocabulary)) {
        enabledVocabs.add(vocabUri);
      }
      this.#metaschemaVocabularies.set(schemaId, enabledVocabs);
    }
  }

  #isVocabularyEnabled(vocabularyUri: string): boolean {
    if (this.#enabledVocabularies === null) return true;
    return this.#enabledVocabularies.has(vocabularyUri);
  }

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
      const existing = this.#dynamicAnchors.get(schema.$dynamicAnchor) ?? [];
      existing.push(schema);
      this.#dynamicAnchors.set(schema.$dynamicAnchor, existing);
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
      schema.contentSchema,
      ...(schema.patternProperties ? Object.values(schema.patternProperties) : []),
    ];

    for (const sub of subschemas) {
      if (typeof sub === 'object' && sub !== null) {
        this.#collectAnchors(sub, currentBaseUri);
      }
    }
  }

  validate(data: unknown): data is T {
    return this.#validate(data, this.#schema, '').errors.length === 0;
  }

  assert(data: unknown): T {
    const result = this.#validate(data, this.#schema, '');
    if (result.errors.length > 0) {
      const message = result.errors.map((e) => `${e.path}: ${e.message}`).join('\n');
      throw new Error(`Validation failed:\n${message}`);
    }
    return data as T;
  }

  parse(data: unknown): ParseResult<T> {
    const result = this.#validate(data, this.#schema, '');
    if (result.errors.length === 0) {
      return { ok: true, data: data as T };
    }
    return { ok: false, errors: result.errors };
  }

  #createContext(
    data: unknown,
    schema: JsonSchemaBase,
    path: string,
    dynamicScope: JsonSchema[]
  ): KeywordContext {
    const validationEnabled = this.#isVocabularyEnabled(Vocabulary.VALIDATION);

    return {
      data,
      schema,
      path,
      dynamicScope,
      validationEnabled,
      validate: (d, s, p, ds) => this.#validate(d, s, p, ds),
      deepEqual: (a, b) => this.#deepEqual(a, b),
      areItemsUnique: (d) => this.#areItemsUnique(d),
      resolveRef: (ref, from) => this.#resolveRef(ref, from),
      resolveDynamicRef: (ref, from, scope) => this.#resolveDynamicRef(ref, from, scope),
      buildRefDynamicScope: (ref, from, scope) => this.#buildRefDynamicScope(ref, from, scope),
      getBaseUri: (s) => this.#schemaToBaseUri.get(s) ?? '',
      resolveUri: (ref, base) => this.#resolveUri(ref, base),
    };
  }

  #validate(
    data: unknown,
    schema: JsonSchema,
    path: string,
    dynamicScope: JsonSchema[] = []
  ): KeywordResult {
    // Boolean schemas
    if (schema === true) return EMPTY_RESULT;
    if (schema === false) {
      return {
        errors: [{ path, message: 'Schema is false, no value is valid', keyword: 'false' }],
      };
    }

    // Build dynamic scope
    let newDynamicScope = dynamicScope;
    if (schema.$id !== undefined) {
      newDynamicScope = [schema, ...dynamicScope];
    } else if (schema.$dynamicAnchor !== undefined && dynamicScope.length === 0) {
      newDynamicScope = [schema, ...dynamicScope];
    }

    const ctx = this.#createContext(data, schema, path, newDynamicScope);
    const results: KeywordResult[] = [];

    // Core vocabulary: $ref, $dynamicRef
    results.push(validateRef(ctx));
    results.push(validateDynamicRef(ctx));

    // Validation vocabulary: const, enum (these halt if matched)
    const constResult = validateConst(ctx);
    if (constResult.halt) {
      return mergeResults(...results, constResult);
    }
    results.push(constResult);

    const enumResult = validateEnum(ctx);
    if (enumResult.halt) {
      return mergeResults(...results, enumResult);
    }
    results.push(enumResult);

    // Applicator vocabulary: composition keywords
    results.push(validateAnyOf(ctx));
    results.push(validateOneOf(ctx));
    results.push(validateAllOf(ctx));
    results.push(validateNot(ctx));
    results.push(validateIfThenElse(ctx));

    // Validation vocabulary: type (halts on mismatch)
    const typeResult = validateType(ctx);
    if (typeResult.halt) {
      return mergeResults(...results, typeResult);
    }
    results.push(typeResult);

    // Type-specific validation
    results.push(validateString(ctx));
    results.push(validateFormat(ctx, this.#options.formatAssertion));
    results.push(validateNumber(ctx));
    results.push(validateArrayConstraints(ctx));
    results.push(validateObjectConstraints(ctx));

    // Applicator vocabulary: structure keywords
    results.push(validatePropertyNames(ctx));
    results.push(validateDependentSchemas(ctx));
    results.push(validateProperties(ctx));
    results.push(validateItems(ctx));
    results.push(validateContains(ctx));

    // Merge all results so far
    const merged = mergeResults(...results);

    // Unevaluated vocabulary (needs evaluated properties/items from previous keywords)
    const unevalPropsResult = validateUnevaluatedProperties(
      ctx,
      merged.evaluatedProperties ?? new Set()
    );
    const unevalItemsResult = validateUnevaluatedItems(ctx, merged.evaluatedItems ?? new Set());

    return mergeResults(merged, unevalPropsResult, unevalItemsResult);
  }

  // URI resolution methods
  #resolveUri(ref: string, baseUri: string): string {
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) return ref;
    if (ref.startsWith('/')) {
      const match = baseUri.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]+)/i);
      if (match) return match[1] + ref;
      return ref;
    }
    if (!baseUri) return ref;

    const baseWithoutFragment = baseUri.split('#')[0];
    const lastSlash = baseWithoutFragment.lastIndexOf('/');
    if (lastSlash !== -1) {
      let resolved = baseWithoutFragment.slice(0, lastSlash + 1) + ref;
      resolved = this.#normalizeUriPath(resolved);
      return resolved;
    }
    return ref;
  }

  #normalizeUriPath(uri: string): string {
    const match = uri.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]*)(\/.*)?$/i);
    if (!match) return uri;

    const authority = match[1];
    let path = match[2] || '/';
    const endsWithSlash = path.endsWith('/');
    const segments = path.split('/');
    const normalized: string[] = [];

    for (const segment of segments) {
      if (segment === '.') continue;
      if (segment === '') {
        if (normalized.length === 0) normalized.push('');
        continue;
      }
      if (segment === '..') {
        if (normalized.length > 1) normalized.pop();
      } else {
        normalized.push(segment);
      }
    }

    let result = authority + normalized.join('/');
    if (endsWithSlash && !result.endsWith('/')) result += '/';
    return result;
  }

  // $ref resolution
  #resolveRef(ref: string, fromSchema: JsonSchemaBase): JsonSchema | undefined {
    const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';

    if (ref === '#') {
      if (currentBaseUri) {
        return this.#schemasById.get(currentBaseUri) ?? this.#schema;
      }
      return this.#schema;
    }

    if (ref.startsWith('#/')) {
      if (currentBaseUri) {
        const baseSchema = this.#schemasById.get(currentBaseUri);
        if (baseSchema) {
          return this.#resolveJsonPointerInSchema(baseSchema, ref.slice(1));
        }
      }
      return this.#resolveJsonPointer(ref.slice(1));
    }

    const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      if (currentBaseUri) {
        const fullAnchorUri = `${currentBaseUri}#${anchorMatch[1]}`;
        const result = this.#anchors.get(fullAnchorUri);
        if (result) return result;
      }
      return this.#anchors.get(anchorMatch[1]);
    }

    const fragmentIndex = ref.indexOf('#');
    if (fragmentIndex !== -1) {
      const refBaseUri = ref.slice(0, fragmentIndex);
      const fragment = ref.slice(fragmentIndex);
      const resolvedUri = this.#resolveUri(refBaseUri, currentBaseUri);
      const baseSchema = this.#schemasById.get(resolvedUri);

      if (baseSchema) {
        if (fragment === '#') return baseSchema;
        if (fragment.startsWith('#/')) {
          return this.#resolveJsonPointerInSchema(baseSchema, fragment.slice(1));
        }
        const anchorName = fragment.slice(1);
        return this.#findAnchorInSchema(baseSchema, anchorName);
      }
    }

    const resolvedRef = this.#resolveUri(ref, currentBaseUri);
    const schema = this.#schemasById.get(resolvedRef);
    if (schema) return schema;

    return this.#schemasById.get(ref);
  }

  #buildRefDynamicScope(
    ref: string,
    fromSchema: JsonSchemaBase,
    currentScope: JsonSchema[]
  ): JsonSchema[] {
    const fragmentIndex = ref.indexOf('#');
    const refUri = fragmentIndex !== -1 ? ref.slice(0, fragmentIndex) : ref;

    if (!refUri) return currentScope;

    const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';
    const resolvedUri = this.#resolveUri(refUri, currentBaseUri);
    const targetResource = this.#schemasById.get(resolvedUri);

    if (targetResource && typeof targetResource === 'object' && targetResource !== null) {
      if (this.#resourceHasDynamicAnchor(targetResource)) {
        return [targetResource, ...currentScope];
      }
    }

    return currentScope;
  }

  #resourceHasDynamicAnchor(schema: JsonSchema): boolean {
    if (typeof schema !== 'object' || schema === null) return false;
    if (schema.$dynamicAnchor !== undefined) return true;

    const searchIn = [
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
      schema.contentSchema,
      ...(schema.patternProperties ? Object.values(schema.patternProperties) : []),
    ];

    for (const subSchema of searchIn) {
      if (typeof subSchema === 'object' && subSchema !== null) {
        if (subSchema.$id !== undefined) continue;
        if (this.#resourceHasDynamicAnchor(subSchema)) return true;
      }
    }

    return false;
  }

  #resolveDynamicRef(
    ref: string,
    fromSchema: JsonSchemaBase,
    dynamicScope: JsonSchema[]
  ): JsonSchema | undefined {
    let anchorName: string | undefined;
    const fragmentIndex = ref.indexOf('#');
    if (fragmentIndex !== -1) {
      const fragment = ref.slice(fragmentIndex + 1);
      if (fragment && !fragment.startsWith('/') && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(fragment)) {
        anchorName = fragment;
      }
    }

    if (anchorName) {
      const staticTarget = this.#resolveRef(ref, fromSchema);
      if (
        staticTarget &&
        typeof staticTarget === 'object' &&
        staticTarget.$dynamicAnchor === anchorName
      ) {
        for (let i = dynamicScope.length - 1; i >= 0; i--) {
          const resourceSchema = dynamicScope[i];
          if (typeof resourceSchema === 'object' && resourceSchema !== null) {
            const found = this.#findDynamicAnchorInResource(resourceSchema, anchorName);
            if (found) return found;
          }
        }
      }
      return staticTarget;
    }

    return this.#resolveRef(ref, fromSchema);
  }

  #findDynamicAnchorInResource(schema: JsonSchema, anchorName: string): JsonSchema | undefined {
    if (typeof schema !== 'object' || schema === null) return undefined;
    if (schema.$dynamicAnchor === anchorName) return schema;

    const searchIn = [
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
      schema.contentSchema,
      ...(schema.patternProperties ? Object.values(schema.patternProperties) : []),
    ];

    for (const subSchema of searchIn) {
      if (typeof subSchema === 'object' && subSchema !== null) {
        if (subSchema.$id !== undefined) continue;
        const found = this.#findDynamicAnchorInResource(subSchema, anchorName);
        if (found) return found;
      }
    }

    return undefined;
  }

  #findAnchorInSchema(schema: JsonSchema, anchorName: string): JsonSchema | undefined {
    if (typeof schema !== 'object' || schema === null) return undefined;

    const baseUri = this.#schemaToBaseUri.get(schema);

    if (schema.$anchor === anchorName || schema.$dynamicAnchor === anchorName) {
      return schema;
    }

    const searchIn = [
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
      schema.contentSchema,
    ];

    for (const subSchema of searchIn) {
      if (typeof subSchema === 'object' && subSchema !== null) {
        const subBaseUri = this.#schemaToBaseUri.get(subSchema);
        if (subBaseUri === baseUri) {
          const found = this.#findAnchorInSchema(subSchema, anchorName);
          if (found) return found;
        }
      }
    }

    return undefined;
  }

  #resolveJsonPointerInSchema(schema: JsonSchema, pointer: string): JsonSchema | undefined {
    if (pointer === '' || pointer === '/') return schema;

    const segments = pointer
      .split('/')
      .slice(1)
      .map((seg) => {
        let decoded = seg;
        try {
          decoded = decodeURIComponent(seg);
        } catch {
          // ignore
        }
        return decoded.replace(/~1/g, '/').replace(/~0/g, '~');
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

  #resolveJsonPointer(pointer: string): JsonSchema | undefined {
    return this.#resolveJsonPointerInSchema(this.#schema, pointer);
  }

  #areItemsUnique(data: unknown[]): boolean {
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (this.#deepEqual(data[i], data[j])) return false;
      }
    }
    return true;
  }

  #deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      const bArr = b as unknown[];
      if (a.length !== bArr.length) return false;
      return a.every((v, i) => this.#deepEqual(v, bArr[i]));
    }

    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => this.#deepEqual(aObj[k], bObj[k]));
  }
}
