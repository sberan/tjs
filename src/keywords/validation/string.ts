import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateString(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled } = ctx;

  if (!validationEnabled || typeof data !== 'string') {
    return EMPTY_RESULT;
  }

  const errors: ValidationError[] = [];

  // Use code point count (not code unit count) for length validation
  // This handles surrogate pairs correctly (e.g., emoji like 💩)
  const codePointLength = [...data].length;

  if (schema.minLength !== undefined && codePointLength < schema.minLength) {
    errors.push({
      path,
      message: `String must have at least ${schema.minLength} characters`,
      keyword: 'minLength',
      value: data,
    });
  }

  if (schema.maxLength !== undefined && codePointLength > schema.maxLength) {
    errors.push({
      path,
      message: `String must have at most ${schema.maxLength} characters`,
      keyword: 'maxLength',
      value: data,
    });
  }

  if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(data)) {
    errors.push({
      path,
      message: `String must match pattern ${schema.pattern}`,
      keyword: 'pattern',
      value: data,
    });
  }

  return errors.length > 0 ? { errors } : EMPTY_RESULT;
}
