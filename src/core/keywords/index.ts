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

// Simple keyword handlers (dependency-related)
export { generateDependentRequiredCheck } from './dependent-required.js';

// Simple keyword handlers (content/format)
export { generateContentChecks } from './content.js';
export { generateFormatCheck } from './format-check.js';

// Complex keyword handlers (dependency injection for sub-schema validation)
export { generatePropertyNamesCheck } from './property-names.js';
export { generateDependentSchemasCheck } from './dependent-schemas.js';
export { generateDependenciesCheck } from './dependencies.js';

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
