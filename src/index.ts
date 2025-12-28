import type { JsonSchema } from './types.js';
import type { Infer } from './infer.js';
import {
  createValidator,
  createValidatorAsync,
  loadRemoteSchemas,
  type CompileOptions,
  type LoadRemotesOptions,
} from './core/index.js';

// Import Validator type with a different name to avoid conflict
import type { Validator as ValidatorInterface } from './core/index.js';

export function schema<const T extends JsonSchema>(
  definition: T,
  options?: CompileOptions
): ValidatorInterface<Infer<T>> {
  return createValidator<Infer<T>>(definition, options);
}

/**
 * Async version of schema() that automatically loads remote $ref schemas.
 * Use this when your schema references external schemas via http(s):// URLs.
 */
export async function schemaAsync<const T extends JsonSchema>(
  definition: T,
  options?: CompileOptions & LoadRemotesOptions
): Promise<ValidatorInterface<Infer<T>>> {
  return createValidatorAsync<Infer<T>>(definition, options);
}

// Re-export types (except Validator which is exported as a value below)
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type {
  ValidationError,
  ParseResult,
  CompileOptions as ValidatorOptions,
  LoadRemotesOptions,
} from './core/index.js';

// Export functions
export { createValidator, createValidatorAsync, loadRemoteSchemas } from './core/index.js';

// Validator function (callable) - for backwards compatibility
// Note: The Validator type is defined in core/index.ts
export function Validator<T>(schema: JsonSchema, options?: CompileOptions): ValidatorInterface<T> {
  return createValidator<T>(schema, options);
}

// Re-export the Validator type interface
// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare
export namespace Validator {
  // This enables `Validator<T>` to work as a type
  export type Type<T> = ValidatorInterface<T>;
}

// Also export the interface directly for simpler usage
export type { Validator as ValidatorType } from './core/index.js';

// Export bundled meta-schemas
export { metaSchemas, draft04Schema, draft06Schema, draft07Schema } from './meta-schemas/index.js';
