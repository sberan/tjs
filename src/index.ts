import type { JsonSchema } from './types.js';
import type { Infer } from './infer.js';
import { Validator } from './validator.js';

export function schema<const T extends JsonSchema>(definition: T): Validator<Infer<T>> {
  return new Validator(definition) as Validator<Infer<T>>;
}

// Re-export types
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type { ValidationError, ParseResult } from './validator.js';
export { Validator } from './validator.js';
