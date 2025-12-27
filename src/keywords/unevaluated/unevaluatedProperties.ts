import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateUnevaluatedProperties(
  ctx: KeywordContext,
  evaluatedProperties: Set<string>
): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (schema.unevaluatedProperties === undefined) {
    return EMPTY_RESULT;
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const obj = data as Record<string, unknown>;
  const errors: ValidationError[] = [];
  const newEvaluated = new Set<string>();

  for (const [key, value] of Object.entries(obj)) {
    if (!evaluatedProperties.has(key)) {
      if (schema.unevaluatedProperties === false) {
        errors.push({
          path: path ? `${path}.${key}` : key,
          message: 'Unevaluated property is not allowed',
          keyword: 'unevaluatedProperties',
          value,
        });
      } else if (typeof schema.unevaluatedProperties === 'object') {
        const result = validate(
          value,
          schema.unevaluatedProperties,
          path ? `${path}.${key}` : key,
          dynamicScope
        );
        errors.push(...result.errors);
        newEvaluated.add(key);
      } else {
        // unevaluatedProperties: true
        newEvaluated.add(key);
      }
    }
  }

  // When unevaluatedProperties is true or a schema (not false), mark all properties as evaluated
  if (schema.unevaluatedProperties !== false) {
    for (const key of Object.keys(obj)) {
      newEvaluated.add(key);
    }
  }

  return {
    errors,
    evaluatedProperties: newEvaluated.size > 0 ? newEvaluated : undefined,
  };
}
