import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, mergeResults } from '../types.js';

export function validateAllOf(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (!schema.allOf) {
    return EMPTY_RESULT;
  }

  const results: KeywordResult[] = [];

  for (const subSchema of schema.allOf) {
    const result = validate(data, subSchema, path, dynamicScope);
    results.push(result);
  }

  return mergeResults(...results);
}
