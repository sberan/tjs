import type { JsonSchema } from './types.js';
import type { Infer } from './infer.js';
import {
  createValidator,
  createValidatorAsync,
  loadRemoteSchemas,
  type ValidatorJIT,
  type JITOptions,
  type LoadRemotesOptions,
} from './jit/index.js';

export function schema<const T extends JsonSchema>(
  definition: T,
  options?: JITOptions
): ValidatorJIT<Infer<T>> {
  return createValidator<Infer<T>>(definition, options);
}

/**
 * Async version of schema() that automatically loads remote $ref schemas.
 * Use this when your schema references external schemas via http(s):// URLs.
 */
export async function schemaAsync<const T extends JsonSchema>(
  definition: T,
  options?: JITOptions & LoadRemotesOptions
): Promise<ValidatorJIT<Infer<T>>> {
  return createValidatorAsync<Infer<T>>(definition, options);
}

// Re-export types
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type {
  ValidationError,
  ParseResult,
  JITOptions as ValidatorOptions,
  LoadRemotesOptions,
} from './jit/index.js';
export type { ValidatorJIT } from './jit/index.js';

// Export createValidator as Validator for backwards compatibility with `new Validator(...)` syntax
export { createValidator as Validator } from './jit/index.js';

// Export async utilities
export { createValidatorAsync as ValidatorAsync, loadRemoteSchemas } from './jit/index.js';
