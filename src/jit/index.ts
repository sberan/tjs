/**
 * JIT-compiled JSON Schema validator
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import { compile, type JITError } from './compiler.js';
import type { JITOptions } from './context.js';

export type { JITOptions } from './context.js';
export { compile } from './compiler.js';

/**
 * Options for loading remote schemas
 */
export interface LoadRemotesOptions {
  /** Custom fetch function (defaults to global fetch) */
  fetch?: typeof fetch;
  /** Maximum number of concurrent fetches */
  concurrency?: number;
  /** Timeout per request in milliseconds */
  timeout?: number;
}

/**
 * Collect all external $ref URIs from a schema
 */
function collectExternalRefs(
  schema: JsonSchema,
  baseUri: string,
  collected: Set<string>,
  visited: Set<unknown>
): void {
  if (typeof schema !== 'object' || schema === null || visited.has(schema)) return;
  visited.add(schema);

  // Check $ref
  if (schema.$ref && !schema.$ref.startsWith('#')) {
    const ref = schema.$ref;
    // Resolve relative refs against base URI
    let resolvedUri: string;
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) {
      // Absolute URI
      resolvedUri = ref.split('#')[0];
    } else if (baseUri) {
      // Relative ref - resolve against base
      const base = baseUri.split('#')[0];
      if (ref.startsWith('/')) {
        const match = base.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]*)/i);
        resolvedUri = match ? match[1] + ref.split('#')[0] : ref.split('#')[0];
      } else {
        const lastSlash = base.lastIndexOf('/');
        resolvedUri = (lastSlash >= 0 ? base.slice(0, lastSlash + 1) : '') + ref.split('#')[0];
      }
    } else {
      resolvedUri = ref.split('#')[0];
    }
    if (resolvedUri && /^https?:\/\//i.test(resolvedUri)) {
      collected.add(resolvedUri);
    }
  }

  // Update base URI if $id is present
  let currentBase = baseUri;
  const schemaId = schema.$id ?? schema.id;
  if (schemaId && !schemaId.startsWith('#')) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(schemaId)) {
      currentBase = schemaId;
    } else if (baseUri) {
      const base = baseUri.split('#')[0];
      const lastSlash = base.lastIndexOf('/');
      currentBase = (lastSlash >= 0 ? base.slice(0, lastSlash + 1) : '') + schemaId;
    }
  }

  // TODO we really should find a better way to do this
  // Recurse into subschemas
  const subschemas: (JsonSchema | undefined)[] = [
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
      ? Object.values(schema.dependencies).filter((v): v is JsonSchema => !Array.isArray(v))
      : []),
    ...(schema.patternProperties ? Object.values(schema.patternProperties) : []),
  ];

  for (const sub of subschemas) {
    if (sub !== undefined) {
      collectExternalRefs(sub, currentBase, collected, visited);
    }
  }
}

/**
 * Load all remote schemas referenced by a schema.
 * Returns a map of URI -> schema that can be passed to compile() as remotes.
 *
 * @param schema - The root schema to scan for remote refs
 * @param options - Loading options
 * @returns Map of loaded remote schemas
 */
export async function loadRemoteSchemas(
  schema: JsonSchema,
  options: LoadRemotesOptions = {}
): Promise<Record<string, JsonSchema>> {
  const { fetch: fetchFn = globalThis.fetch, concurrency = 5, timeout = 10000 } = options;

  if (!fetchFn) {
    throw new Error('fetch is not available. Provide a custom fetch function.');
  }

  const remotes: Record<string, JsonSchema> = {};
  const pending = new Set<string>();
  const fetched = new Set<string>();

  // Collect initial refs
  const baseUri =
    typeof schema === 'object' && schema !== null ? (schema.$id ?? schema.id ?? '') : '';
  collectExternalRefs(schema, baseUri, pending, new Set());

  // Fetch in batches
  while (pending.size > 0) {
    const batch = Array.from(pending).slice(0, concurrency);
    batch.forEach((uri) => pending.delete(uri));

    const results = await Promise.allSettled(
      batch.map(async (uri) => {
        if (fetched.has(uri)) return null;
        fetched.add(uri);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
          const response = await fetchFn(uri, { signal: controller.signal });
          if (!response.ok) {
            console.warn(`Failed to fetch ${uri}: ${response.status}`);
            return null;
          }
          const loadedSchema = (await response.json()) as JsonSchema;
          remotes[uri] = loadedSchema;

          // Also register by $id if different
          if (
            typeof loadedSchema === 'object' &&
            loadedSchema !== null &&
            (loadedSchema.$id || loadedSchema.id)
          ) {
            const id = loadedSchema.$id ?? loadedSchema.id;
            if (id && id !== uri) {
              remotes[id] = loadedSchema;
            }
          }

          // Scan loaded schema for more refs
          collectExternalRefs(loadedSchema, uri, pending, new Set());
          return loadedSchema;
        } finally {
          clearTimeout(timeoutId);
        }
      })
    );

    // Log any errors
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status === 'rejected') {
        console.warn(`Failed to load ${batch[i]}: ${result.reason}`);
      }
    }
  }

  return remotes;
}

/**
 * Create a validator with automatic remote schema loading.
 * This is an async version of createValidator that fetches remote refs.
 *
 * @param schema - The JSON Schema to compile
 * @param options - JIT options plus remote loading options
 * @returns Promise resolving to the validator
 */
export async function createValidatorAsync<T>(
  schema: JsonSchema,
  options: JITOptions & LoadRemotesOptions = {}
  // TODO renami ValidatorJIT to just Validator
): Promise<ValidatorJIT<T>> {
  // Load remote schemas
  const loadedRemotes = await loadRemoteSchemas(schema, options);

  // Merge with any explicitly provided remotes
  const remotes = { ...loadedRemotes, ...options.remotes };

  // Create validator with loaded remotes
  return createValidator<T>(schema, { ...options, remotes });
}

/**
 * Validation error type
 */
export interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  value?: unknown;
}

/**
 * Parse result type
 */
export type ParseResult<T> = { ok: true; data: T } | { ok: false; errors: ValidationError[] };

/**
 * JIT-compiled JSON Schema validator interface.
 * The validator is callable directly for maximum performance.
 */
export interface ValidatorJIT<T> {
  /** Call directly to validate (fastest path) */
  (data: unknown): data is T;

  /** Validate data against the schema */
  // TODO should re remove this method and just use the callable directly?
  validate(data: unknown): data is T;

  /** Assert data is valid, throw if not */
  assert(data: unknown): T;

  /** Parse data and return result with errors */
  parse(data: unknown): ParseResult<T>;

  /** Phantom type for TypeScript type inference */
  readonly type: T;
}

/**
 * Create a JIT-compiled JSON Schema validator.
 * Returns a callable function with validate/assert/parse methods.
 */
export function createValidator<T>(schema: JsonSchema, options: JITOptions = {}): ValidatorJIT<T> {
  const validateFn = compile(schema, options);

  // Cast the compiled function directly - it's already callable
  const validator = validateFn as unknown as ValidatorJIT<T>;

  // Attach methods directly to the compiled function
  validator.validate = validateFn as (data: unknown) => data is T;

  validator.assert = (data: unknown): T => {
    if (!validateFn(data)) {
      throw new Error('Validation failed');
    }
    return data as T;
  };

  validator.parse = (data: unknown): ParseResult<T> => {
    const errors: JITError[] = [];
    if (validateFn(data, errors)) {
      return { ok: true, data: data as T };
    }
    return {
      ok: false,
      errors:
        errors.length > 0
          ? errors
          : [{ path: '', message: 'Validation failed', keyword: 'schema' }],
    };
  };

  return validator;
}

// Keep the class for backwards compatibility
export { createValidator as ValidatorJIT };
