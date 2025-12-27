import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult, haltResult } from '../types.js';

export function validateEnum(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled, deepEqual } = ctx;

  if (!validationEnabled || !schema.enum) {
    return EMPTY_RESULT;
  }

  if (!schema.enum.some((v) => deepEqual(data, v))) {
    return errorResult(
      path,
      `Value must be one of: ${JSON.stringify(schema.enum)}`,
      'enum',
      data,
      true
    );
  }

  return haltResult();
}
