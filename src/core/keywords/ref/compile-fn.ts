/**
 * Compile function dependency injection for ref handlers
 */

import type { JsonSchema } from '../../../types.js';
import type { CompileOptions } from '../../context.js';

// Forward declaration for compile function - set during initialization
export type CompileFn = (
  schema: JsonSchema,
  options: CompileOptions
) => {
  (data: unknown): boolean;
  errors: unknown[] | null;
};

let compileFn: CompileFn | undefined;

/**
 * Set the compile function to break circular dependency.
 * This must be called during module initialization.
 */
export function setCompileFn(fn: CompileFn): void {
  compileFn = fn;
}

/**
 * Get the compile function.
 */
export function getCompileFn(): CompileFn | undefined {
  return compileFn;
}
