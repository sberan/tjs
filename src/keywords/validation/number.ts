import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateNumber(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled } = ctx;

  if (!validationEnabled || typeof data !== 'number') {
    return EMPTY_RESULT;
  }

  const errors: ValidationError[] = [];

  if (schema.minimum !== undefined && data < schema.minimum) {
    errors.push({
      path,
      message: `Number must be >= ${schema.minimum}`,
      keyword: 'minimum',
      value: data,
    });
  }

  if (schema.maximum !== undefined && data > schema.maximum) {
    errors.push({
      path,
      message: `Number must be <= ${schema.maximum}`,
      keyword: 'maximum',
      value: data,
    });
  }

  if (schema.exclusiveMinimum !== undefined && data <= schema.exclusiveMinimum) {
    errors.push({
      path,
      message: `Number must be > ${schema.exclusiveMinimum}`,
      keyword: 'exclusiveMinimum',
      value: data,
    });
  }

  if (schema.exclusiveMaximum !== undefined && data >= schema.exclusiveMaximum) {
    errors.push({
      path,
      message: `Number must be < ${schema.exclusiveMaximum}`,
      keyword: 'exclusiveMaximum',
      value: data,
    });
  }

  if (schema.multipleOf !== undefined) {
    const quotient = data / schema.multipleOf;
    const isMultiple =
      Number.isFinite(quotient) && Math.abs(quotient - Math.round(quotient)) < 1e-10;
    if (!isMultiple) {
      errors.push({
        path,
        message: `Number must be a multiple of ${schema.multipleOf}`,
        keyword: 'multipleOf',
        value: data,
      });
    }
  }

  return errors.length > 0 ? { errors } : EMPTY_RESULT;
}
