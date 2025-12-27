import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateUnevaluatedItems(
  ctx: KeywordContext,
  evaluatedItems: Set<number>
): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (schema.unevaluatedItems === undefined) {
    return EMPTY_RESULT;
  }

  if (!Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const errors: ValidationError[] = [];
  const newEvaluated = new Set<number>();

  for (let i = 0; i < data.length; i++) {
    if (!evaluatedItems.has(i)) {
      if (schema.unevaluatedItems === false) {
        errors.push({
          path: `${path}[${i}]`,
          message: 'Unevaluated item is not allowed',
          keyword: 'unevaluatedItems',
          value: data[i],
        });
      } else if (typeof schema.unevaluatedItems === 'object') {
        const result = validate(data[i], schema.unevaluatedItems, `${path}[${i}]`, dynamicScope);
        errors.push(...result.errors);
        newEvaluated.add(i);
      } else {
        // unevaluatedItems: true
        newEvaluated.add(i);
      }
    }
  }

  // When unevaluatedItems is true or a schema (not false), mark all items as evaluated
  if (schema.unevaluatedItems !== false) {
    for (let i = 0; i < data.length; i++) {
      newEvaluated.add(i);
    }
  }

  return {
    errors,
    evaluatedItems: newEvaluated.size > 0 ? newEvaluated : undefined,
  };
}
