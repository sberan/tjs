/**
 * Keyword handlers barrel export
 *
 * Re-exports all keyword handlers for use by the compiler.
 */

// Types
export type {
  SchemaValidator,
  SimpleKeywordOptions,
  ComplexKeywordOptions,
  SimpleKeywordHandler,
  ComplexKeywordHandler,
} from './types.js';

// Simple keyword handlers (no sub-schema validation needed)
export { generateTypeCheck } from './type.js';
export { generateConstCheck } from './const.js';
export { generateEnumCheck } from './enum.js';
export { generateStringChecks } from './string.js';
export { generateNumberChecks } from './number.js';
export { generateArrayChecks } from './array-constraints.js';
export { generateObjectChecks } from './object-constraints.js';

// Utilities
export {
  genError,
  genSubschemaExit,
  genPropertyCheck,
  genBatchedRequiredChecks,
  hasTypeConstraint,
  getTypeCheck,
  getOptimizedUnionTypeCheck,
  getItemTypes,
  isNoOpSchema,
  getSimpleType,
  getInlineTypeCheck,
  determineRegexFlags,
} from './utils.js';

// Format validators
export { createFormatValidators } from './format.js';
