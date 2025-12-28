/**
 * JIT-compiled JSON Schema validator
 */

import type { JsonSchema } from '../types.js';
import { compile, type JITError } from './compiler.js';
import type { JITOptions } from './context.js';

export type { JITOptions } from './context.js';
export { compile } from './compiler.js';

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
