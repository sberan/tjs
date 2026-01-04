/**
 * Keyword handlers index
 *
 * This module exports all keyword handlers for the JSON Schema compiler.
 * Each handler is a default export from its module with signature: (ctx: CompileContext) => void
 */

// Value validation handlers (type, const, enum)
export { default as generateTypeCheck } from './value/type.js';
export {
  default as generateConstCheck,
  canInlineComparison,
  genInlineComparison,
} from './value/const.js';
export { default as generateEnumCheck } from './value/enum.js';

// String validation handlers
export { determineRegexFlags } from './string/regex-flags.js';
export { generateMinLengthCheck } from './string/min-length.js';
export { generateMaxLengthCheck } from './string/max-length.js';
export { generatePatternCheck } from './string/pattern.js';
export { default as generateContentChecks } from './string/content.js';
export { default as generateStringChecks } from './string/string-checks.js';

// Number validation handler
export { default as generateNumberChecks } from './number/number-checks.js';

// Array validation handlers
export { default as generateMinItemsCheck } from './array/min-items.js';
export { default as generateMaxItemsCheck } from './array/max-items.js';
export { default as generateUniqueItemsCheck } from './array/unique-items.js';
export { default as generateItemsChecks } from './array/items.js';
export { default as generateContainsCheck } from './array/contains.js';
export { default as generateUnevaluatedItemsCheck } from './array/unevaluated-items.js';

// Object validation handlers
export { default as generateObjectChecks } from './object/object-checks.js';
export { default as generatePropertiesChecks } from './object/properties.js';
export { default as generateUnevaluatedPropertiesCheck } from './object/unevaluated-properties.js';
export { default as generateDependentRequiredCheck } from './object/dependent-required.js';
export { default as generateDependentSchemasCheck } from './object/dependent-schemas.js';
export { default as generateDependenciesCheck } from './object/dependencies.js';
export { default as generatePropertyNamesCheck } from './object/property-names.js';

// Composition handlers
export { default as generateAllOfCheck } from './composition/all-of.js';
export { default as generateAnyOfCheck } from './composition/any-of.js';
export { default as generateOneOfCheck } from './composition/one-of.js';
export { default as generateNotCheck } from './composition/not.js';
export { default as generateIfThenElseCheck } from './composition/if-then-else.js';

// Reference handlers
export { default as generateRefCheck } from './ref/ref.js';
export { default as generateDynamicRefCheck } from './ref/dynamic-ref.js';
export { default as generateRecursiveRefCheck } from './ref/recursive-ref.js';
export { setCompileFn } from './ref/compile-fn.js';

// Format handler
export { default as generateFormatCheck } from './format/format-check.js';

// Helpers (for internal use and circular dependency resolution)
export { generateSubschemaCheck, setGenerateSchemaValidator } from './shared/helpers.js';

// Utils (re-export common utilities)
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
  getSimpleConst,
  isPrimitive,
  getInlineSchemaCheck,
} from './shared/utils.js';

// Types
export type { KeywordHandler } from '../context.js';
