import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult } from '../types.js';

export function validateNot(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (!schema.not) {
    return EMPTY_RESULT;
  }

  const result = validate(data, schema.not, path, dynamicScope);

  if (result.errors.length === 0) {
    return errorResult(path, 'Value must not match the schema in not', 'not', data);
  }

  // Note: no evaluated properties from 'not'
  return EMPTY_RESULT;
}
