import type { JsonSchema } from './types.js';
import type { Infer } from './infer.js';
import { createValidator, type ValidatorJIT, type JITOptions } from './jit/index.js';

export function schema<const T extends JsonSchema>(
  definition: T,
  options?: JITOptions
): ValidatorJIT<Infer<T>> {
  return createValidator<Infer<T>>(definition, options);
}

// Re-export types
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type { ValidationError, ParseResult, JITOptions as ValidatorOptions } from './jit/index.js';
export type { ValidatorJIT } from './jit/index.js';

// Export createValidator as Validator for backwards compatibility with `new Validator(...)` syntax
export { createValidator as Validator } from './jit/index.js';
