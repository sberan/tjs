/**
 * JIT-compiled JSON Schema validator
 */

import type { JsonSchema } from '../types.js';
import type { ValidationError } from '../keywords/types.js';
import { compile, type ValidateFn } from './compiler.js';
import type { JITOptions } from './context.js';
import { Validator } from '../validator.js';

export type { JITOptions } from './context.js';
export { compile } from './compiler.js';

/**
 * Parse result type
 */
export type ParseResult<T> = { ok: true; data: T } | { ok: false; errors: ValidationError[] };

/**
 * JIT-compiled JSON Schema validator
 *
 * Same interface as Validator, but uses JIT compilation for better performance.
 */
export class ValidatorJIT<T> {
  readonly #validateFn: ValidateFn;
  readonly #schema: JsonSchema;
  readonly #options: JITOptions;

  // Lazy-initialized interpreter for error collection
  #interpreterValidator: Validator<T> | null = null;

  /** Phantom type for TypeScript type inference */
  declare readonly type: T;

  constructor(schema: JsonSchema, options: JITOptions = {}) {
    this.#schema = schema;
    this.#options = options;
    // Create JIT-compiled validator
    this.#validateFn = compile(schema, options);
  }

  /**
   * Get interpreter validator (lazy initialization)
   */
  #getInterpreter(): Validator<T> {
    if (!this.#interpreterValidator) {
      this.#interpreterValidator = new Validator(this.#schema, {
        formatAssertion: this.#options.formatAssertion ?? true,
        remotes: this.#options.remotes,
      });
    }
    return this.#interpreterValidator;
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
      // Use interpreter to get error messages
      const result = this.#getInterpreter().parse(data);
      if (!result.ok) {
        const message = result.errors.map((e) => `${e.path}: ${e.message}`).join('\n');
        throw new Error(`Validation failed:\n${message}`);
      }
    }
    return data as T;
  }

  /**
   * Parse data and return result with errors
   */
  parse(data: unknown): ParseResult<T> {
    // Fast path: if valid, return success
    if (this.#validateFn(data)) {
      return { ok: true, data: data as T };
    }

    // Slow path: use interpreter to collect errors
    return this.#getInterpreter().parse(data);
  }
}
