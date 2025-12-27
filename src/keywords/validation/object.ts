import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateObjectConstraints(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, validationEnabled } = ctx;

  if (!validationEnabled || typeof data !== 'object' || data === null || Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const obj = data as Record<string, unknown>;
  const keys = Object.keys(obj);
  const errors: ValidationError[] = [];

  // minProperties / maxProperties
  if (schema.minProperties !== undefined && keys.length < schema.minProperties) {
    errors.push({
      path,
      message: `Object must have at least ${schema.minProperties} properties`,
      keyword: 'minProperties',
      value: keys.length,
    });
  }

  if (schema.maxProperties !== undefined && keys.length > schema.maxProperties) {
    errors.push({
      path,
      message: `Object must have at most ${schema.maxProperties} properties`,
      keyword: 'maxProperties',
      value: keys.length,
    });
  }

  // required
  if (schema.required) {
    for (const key of schema.required) {
      if (!Object.hasOwn(obj, key)) {
        errors.push({
          path: path ? `${path}.${key}` : key,
          message: 'Required property is missing',
          keyword: 'required',
        });
      }
    }
  }

  // dependentRequired
  if (schema.dependentRequired) {
    for (const [trigger, dependents] of Object.entries(schema.dependentRequired)) {
      if (Object.hasOwn(obj, trigger)) {
        for (const dependent of dependents) {
          if (!Object.hasOwn(obj, dependent)) {
            errors.push({
              path: path ? `${path}.${dependent}` : dependent,
              message: `Property "${dependent}" is required when "${trigger}" is present`,
              keyword: 'dependentRequired',
            });
          }
        }
      }
    }
  }

  return errors.length > 0 ? { errors } : EMPTY_RESULT;
}
