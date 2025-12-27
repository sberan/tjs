import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult, haltResult } from '../types.js';

export function validateConst(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled, deepEqual } = ctx;

  if (!validationEnabled || !('const' in schema)) {
    return EMPTY_RESULT;
  }

  if (!deepEqual(data, schema.const)) {
    return errorResult(path, `Expected const ${JSON.stringify(schema.const)}`, 'const', data, true);
  }

  return haltResult();
}
