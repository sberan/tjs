/**
 * JSON Schema validator
 */

import type { JsonSchema } from '../types.js';
import { compile, type CompileError } from './compiler.js';
import type { CompileOptions } from './context.js';
import { coerceValue, createRefResolver } from './coercion.js';

export type { CompileOptions, CoercionOptions } from './context.js';
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
 * Collect all external $ref URIs from a schema.
 * Recursively walks all nested objects and arrays to find $ref properties.
 */
function collectExternalRefs(
  schema: JsonSchema,
  baseUri: string,
  collected: Set<string>,
  visited: Set<unknown>
): void {
  if (typeof schema !== 'object' || schema === null || visited.has(schema)) return;
  visited.add(schema);

  // Check $ref (must be a string to be a valid JSON reference)
  if (typeof schema.$ref === 'string' && !schema.$ref.startsWith('#')) {
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

  // Recursively walk all values - no need to enumerate keywords
  for (const value of Object.values(schema)) {
    if (Array.isArray(value)) {
      // Array of potential schemas (anyOf, oneOf, allOf, prefixItems, etc.)
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          collectExternalRefs(item as JsonSchema, currentBase, collected, visited);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      // Could be a schema or an object containing schemas (properties, $defs, etc.)
      collectExternalRefs(value as JsonSchema, currentBase, collected, visited);
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
 * @param options - Compile options plus remote loading options
 * @returns Promise resolving to the validator
 */
export async function createValidatorAsync<T>(
  schema: JsonSchema,
  options: CompileOptions & LoadRemotesOptions = {}
): Promise<Validator<T>> {
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
 * Validation result type - returned by validate()
 */
export type ValidationResult<T> =
  | { valid: true; value: T; error: undefined }
  | { valid: false; value: undefined; error: ValidationError[] };

/**
 * JSON Schema validator interface.
 * The validator is callable: validator(data) returns true/false for validity.
 */
export interface Validator<T> {
  /** Call validator directly to test validity (returns boolean) */
  (data: unknown): boolean;

  /** Validate data and return result with value or error */
  validate(data: unknown): ValidationResult<T>;

  /** Assert data is valid, throw if not. Returns coerced value. */
  assert(data: unknown): T;

  /** Phantom type for TypeScript type inference */
  readonly type: T;
}

/**
 * Create a JSON Schema validator.
 * Returns a callable validator with validate() and assert() methods.
 */
export function createValidator<T>(schema: JsonSchema, options: CompileOptions = {}): Validator<T> {
  const validateFn = compile(schema, options);
  const coerceOptions = options.coerce;

  // Create the callable validator function
  const validator = validateFn as Validator<T>;

  // Create specialized validate/assert methods based on whether coercion is enabled
  // This eliminates the branch on every call for better performance
  if (coerceOptions) {
    // Create ref resolver for coercion (allows $ref resolution during coercion)
    const refResolver = createRefResolver(schema, options.remotes);

    // Coercion enabled - wrap with coerceValue
    validator.validate = function (data: unknown): ValidationResult<T> {
      const coercedData = coerceValue(data, schema, coerceOptions, refResolver).value;
      const errors: CompileError[] = [];
      if (validateFn(coercedData, errors)) {
        return { valid: true, value: coercedData as T, error: undefined };
      }
      return {
        valid: false,
        value: undefined,
        error:
          errors.length > 0
            ? errors
            : [{ path: '', message: 'Validation failed', keyword: 'schema' }],
      };
    };

    validator.assert = function (data: unknown): T {
      const coercedData = coerceValue(data, schema, coerceOptions, refResolver).value;
      const errors: CompileError[] = [];
      if (!validateFn(coercedData, errors)) {
        const errorMsg =
          errors.length > 0
            ? errors.map((e) => `${e.path}: ${e.message}`).join('; ')
            : 'Validation failed';
        throw new Error(errorMsg);
      }
      return coercedData as T;
    };
  } else {
    // Coercion disabled - direct validation without coercion overhead
    validator.validate = function (data: unknown): ValidationResult<T> {
      const errors: CompileError[] = [];
      if (validateFn(data, errors)) {
        return { valid: true, value: data as T, error: undefined };
      }
      return {
        valid: false,
        value: undefined,
        error:
          errors.length > 0
            ? errors
            : [{ path: '', message: 'Validation failed', keyword: 'schema' }],
      };
    };

    validator.assert = function (data: unknown): T {
      const errors: CompileError[] = [];
      if (!validateFn(data, errors)) {
        const errorMsg =
          errors.length > 0
            ? errors.map((e) => `${e.path}: ${e.message}`).join('; ')
            : 'Validation failed';
        throw new Error(errorMsg);
      }
      return data as T;
    };
  }

  // Define type as a getter
  Object.defineProperty(validator, 'type', {
    get(): T {
      throw new Error('type is a phantom property for type inference only');
    },
  });

  return validator;
}
