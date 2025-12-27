import type { JsonSchema } from './types.js';
import type { Infer } from './infer.js';
import { Validator, type ValidatorOptions } from './validator.js';

export function schema<const T extends JsonSchema>(
  definition: T,
  options?: ValidatorOptions
): Validator<Infer<T>> {
  return new Validator(definition, options) as Validator<Infer<T>>;
}

// Re-export types
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type { ValidationError, ParseResult, ValidatorOptions } from './validator.js';
export { Validator } from './validator.js';
