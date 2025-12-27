import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult } from '../types.js';

function checkType(data: unknown, type: string): boolean {
  switch (type) {
    case 'string':
      return typeof data === 'string';
    case 'number':
      return typeof data === 'number';
    case 'integer':
      return typeof data === 'number' && Number.isInteger(data);
    case 'boolean':
      return typeof data === 'boolean';
    case 'null':
      return data === null;
    case 'array':
      return Array.isArray(data);
    case 'object':
      return typeof data === 'object' && data !== null && !Array.isArray(data);
    default:
      return false;
  }
}

export function validateType(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled } = ctx;

  if (!validationEnabled || !schema.type) {
    return EMPTY_RESULT;
  }

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const typeValid = types.some((t) => checkType(data, t));

  if (!typeValid) {
    return errorResult(
      path,
      `Expected type ${types.join(' | ')}, got ${typeof data}`,
      'type',
      data,
      true // halt on type mismatch
    );
  }

  return EMPTY_RESULT;
}
