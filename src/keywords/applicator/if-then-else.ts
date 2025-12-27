import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, mergeResults } from '../types.js';

export function validateIfThenElse(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  // Check !== undefined to handle if: false
  if (schema.if === undefined) {
    return EMPTY_RESULT;
  }

  const ifResult = validate(data, schema.if, path, dynamicScope);
  const ifValid = ifResult.errors.length === 0;

  if (ifValid) {
    // When if is TRUE: merge from if AND then (if exists)
    const results: KeywordResult[] = [
      {
        errors: [],
        evaluatedProperties: ifResult.evaluatedProperties,
        evaluatedItems: ifResult.evaluatedItems,
      },
    ];

    if (schema.then !== undefined) {
      const thenResult = validate(data, schema.then, path, dynamicScope);
      results.push(thenResult);
    }

    return mergeResults(...results);
  } else {
    // When if is FALSE: merge from else (if exists), NOT from if
    if (schema.else !== undefined) {
      return validate(data, schema.else, path, dynamicScope);
    }
    return EMPTY_RESULT;
  }
}
