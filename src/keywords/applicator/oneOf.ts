import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult } from '../types.js';

export function validateOneOf(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (!schema.oneOf) {
    return EMPTY_RESULT;
  }

  let validResult: KeywordResult | null = null;
  let validCount = 0;

  for (const subSchema of schema.oneOf) {
    const result = validate(data, subSchema, path, dynamicScope);
    if (result.errors.length === 0) {
      validCount++;
      validResult = result;
    }
  }

  if (validCount !== 1) {
    return errorResult(
      path,
      `Value must match exactly one schema in oneOf, matched ${validCount}`,
      'oneOf',
      data
    );
  }

  // Return the single matching result with its evaluated properties/items
  return validResult!;
}
