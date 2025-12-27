import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateArrayConstraints(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled, areItemsUnique } = ctx;

  if (!validationEnabled || !Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const errors: ValidationError[] = [];

  if (schema.minItems !== undefined && data.length < schema.minItems) {
    errors.push({
      path,
      message: `Array must have at least ${schema.minItems} items`,
      keyword: 'minItems',
      value: data,
    });
  }

  if (schema.maxItems !== undefined && data.length > schema.maxItems) {
    errors.push({
      path,
      message: `Array must have at most ${schema.maxItems} items`,
      keyword: 'maxItems',
      value: data,
    });
  }

  if (schema.uniqueItems && !areItemsUnique(data)) {
    errors.push({
      path,
      message: 'Array items must be unique',
      keyword: 'uniqueItems',
      value: data,
    });
  }

  return errors.length > 0 ? { errors } : EMPTY_RESULT;
}
