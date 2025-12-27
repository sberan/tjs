import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult, mergeResults } from '../types.js';

export function validateAnyOf(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (!schema.anyOf) {
    return EMPTY_RESULT;
  }

  let anyValid = false;
  const validResults: KeywordResult[] = [];

  for (const subSchema of schema.anyOf) {
    const result = validate(data, subSchema, path, dynamicScope);
    if (result.errors.length === 0) {
      anyValid = true;
      validResults.push(result);
      // Don't break - continue to collect annotations from other valid subschemas
    }
  }

  if (!anyValid) {
    return errorResult(path, 'Value does not match any of the schemas in anyOf', 'anyOf', data);
  }

  // Merge evaluated properties/items from ALL matching subschemas
  return mergeResults(...validResults);
}
