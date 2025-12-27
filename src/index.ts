import type { JsonSchema } from './types.js';
import type { Infer } from './infer.js';
import { ValidatorJIT, type JITOptions } from './jit/index.js';

export function schema<const T extends JsonSchema>(
  definition: T,
  options?: JITOptions
): ValidatorJIT<Infer<T>> {
  return new ValidatorJIT(definition, options) as ValidatorJIT<Infer<T>>;
}

// Re-export types
export type { JsonSchema, JsonSchemaBase, JsonValue, JsonObject, JsonArray } from './types.js';
export type { Infer } from './infer.js';
export type { ValidationError, ParseResult, JITOptions as ValidatorOptions } from './jit/index.js';

// Export JIT validator as the main Validator
export { ValidatorJIT as Validator } from './jit/index.js';
