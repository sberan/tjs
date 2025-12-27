import type { JsonSchema, JsonSchemaBase } from '../types.js';

/**
 * Validation error
 */
export interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  value?: unknown;
}

/**
 * Result from a keyword validation
 */
export interface KeywordResult {
  errors: ValidationError[];
  evaluatedProperties?: Set<string>;
  evaluatedItems?: Set<number>;
  /** If true, stop processing further keywords and return immediately */
  halt?: boolean;
}

/**
 * Context passed to keyword validators
 */
export interface KeywordContext {
  /** The data being validated */
  data: unknown;
  /** The schema containing this keyword */
  schema: JsonSchemaBase;
  /** JSON path to current location */
  path: string;
  /** Dynamic scope for $dynamicRef resolution */
  dynamicScope: JsonSchema[];
  /** Whether validation vocabulary is enabled */
  validationEnabled: boolean;
  /** Recursive validation function */
  validate: (
    data: unknown,
    schema: JsonSchema,
    path: string,
    dynamicScope: JsonSchema[]
  ) => KeywordResult;
  /** Deep equality check */
  deepEqual: (a: unknown, b: unknown) => boolean;
  /** Check if items are unique */
  areItemsUnique: (data: unknown[]) => boolean;
  /** Resolve a $ref */
  resolveRef: (ref: string, fromSchema: JsonSchemaBase) => JsonSchema | undefined;
  /** Resolve a $dynamicRef */
  resolveDynamicRef: (
    ref: string,
    fromSchema: JsonSchemaBase,
    dynamicScope: JsonSchema[]
  ) => JsonSchema | undefined;
  /** Build dynamic scope for $ref */
  buildRefDynamicScope: (
    ref: string,
    fromSchema: JsonSchemaBase,
    currentScope: JsonSchema[]
  ) => JsonSchema[];
  /** Get base URI for a schema */
  getBaseUri: (schema: JsonSchemaBase) => string;
  /** Resolve URI against base */
  resolveUri: (ref: string, baseUri: string) => string;
}

/**
 * A keyword validator function
 */
export type KeywordValidator = (ctx: KeywordContext) => KeywordResult;

/**
 * Vocabulary identifiers
 */
export const Vocabulary = {
  CORE: 'https://json-schema.org/draft/2020-12/vocab/core',
  APPLICATOR: 'https://json-schema.org/draft/2020-12/vocab/applicator',
  UNEVALUATED: 'https://json-schema.org/draft/2020-12/vocab/unevaluated',
  VALIDATION: 'https://json-schema.org/draft/2020-12/vocab/validation',
  META_DATA: 'https://json-schema.org/draft/2020-12/vocab/meta-data',
  FORMAT_ANNOTATION: 'https://json-schema.org/draft/2020-12/vocab/format-annotation',
  CONTENT: 'https://json-schema.org/draft/2020-12/vocab/content',
} as const;

/**
 * Empty result constant
 */
export const EMPTY_RESULT: KeywordResult = Object.freeze({ errors: [] });

/**
 * Create a halting empty result (for const/enum that match)
 */
export function haltResult(): KeywordResult {
  return { errors: [], halt: true };
}

/**
 * Create a result with a single error
 */
export function errorResult(
  path: string,
  message: string,
  keyword: string,
  value?: unknown,
  halt?: boolean
): KeywordResult {
  return {
    errors: [{ path, message, keyword, value }],
    halt,
  };
}

/**
 * Merge multiple keyword results
 */
export function mergeResults(...results: KeywordResult[]): KeywordResult {
  if (results.length === 0) return EMPTY_RESULT;
  if (results.length === 1) return results[0];

  const merged: KeywordResult = { errors: [] };

  for (const result of results) {
    if (result.errors.length > 0) {
      merged.errors.push(...result.errors);
    }

    if (result.evaluatedProperties) {
      merged.evaluatedProperties = merged.evaluatedProperties ?? new Set();
      for (const key of result.evaluatedProperties) {
        merged.evaluatedProperties.add(key);
      }
    }

    if (result.evaluatedItems) {
      merged.evaluatedItems = merged.evaluatedItems ?? new Set();
      for (const idx of result.evaluatedItems) {
        merged.evaluatedItems.add(idx);
      }
    }

    if (result.halt) {
      merged.halt = true;
    }
  }

  return merged;
}
