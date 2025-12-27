/**
 * JIT-compiled JSON Schema validator
 */

import type { JsonSchema } from '../types.js';
import { compile, type ValidateFn, type JITError } from './compiler.js';
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
 * JIT-compiled JSON Schema validator
 *
 * Uses JIT compilation for maximum performance. Error messages are simplified
 * compared to the interpreter-based validator.
 */
export class ValidatorJIT<T> {
  readonly #validateFn: ValidateFn;

  /** Phantom type for TypeScript type inference */
  declare readonly type: T;

  constructor(schema: JsonSchema, options: JITOptions = {}) {
    // Create JIT-compiled validator
    this.#validateFn = compile(schema, options);
  }

  /**
   * Validate data against the schema (fast path - boolean only)
   */
  validate(data: unknown): data is T {
    return this.#validateFn(data);
  }

  /**
   * Assert data is valid, throw if not
   */
  assert(data: unknown): T {
    if (!this.#validateFn(data)) {
      throw new Error('Validation failed');
    }
    return data as T;
  }

  /**
   * Parse data and return result with errors
   */
  parse(data: unknown): ParseResult<T> {
    const errors: JITError[] = [];
    if (this.#validateFn(data, errors)) {
      return { ok: true, data: data as T };
    }

    // Return collected errors (or a generic one if none were collected)
    return {
      ok: false,
      errors:
        errors.length > 0
          ? errors
          : [{ path: '', message: 'Validation failed', keyword: 'schema' }],
    };
  }
}
