import type { JsonSchema } from './types.js';
import type { Infer, ValidatorLike } from './infer.js';
import {
  createValidator,
  createValidatorAsync,
  type CompileOptions,
  type LoadRemotesOptions,
  type Validator,
} from './core/index.js';

export function schema<const T extends JsonSchema | ValidatorLike>(
  definition: T,
  options?: CompileOptions
): Validator<Infer<T>> {
  return createValidator<Infer<T>>(definition as JsonSchema, options);
}

/**
 * Async version of schema() that automatically loads remote $ref schemas.
 * Use this when your schema references external schemas via http(s):// URLs.
 */
export async function schemaAsync<const T extends JsonSchema | ValidatorLike>(
  definition: T,
  options?: CompileOptions & LoadRemotesOptions
): Promise<Validator<Infer<T>>> {
  return createValidatorAsync<Infer<T>>(definition as JsonSchema, options);
}

// Re-export types
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type {
  Validator,
  ValidationError,
  ValidationResult,
  CompileOptions as ValidatorOptions,
  LoadRemotesOptions,
} from './core/index.js';

// Export functions
export { createValidator, createValidatorAsync, loadRemoteSchemas } from './core/index.js';

// Export bundled meta-schemas
export { metaSchemas, draft04Schema, draft06Schema, draft07Schema } from './meta-schemas/index.js';

// Export struct helper
export { struct, type StructPropertyDef, type StructSchema } from './struct.js';
