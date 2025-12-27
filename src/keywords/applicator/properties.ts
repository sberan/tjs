import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT, mergeResults } from '../types.js';

export function validateProperties(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const obj = data as Record<string, unknown>;
  const errors: ValidationError[] = [];
  const evaluatedProperties = new Set<string>();

  // Validate properties
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (Object.hasOwn(obj, key)) {
        evaluatedProperties.add(key);
        const result = validate(obj[key], propSchema, path ? `${path}.${key}` : key, dynamicScope);
        errors.push(...result.errors);
      }
    }
  }

  // Validate patternProperties
  if (schema.patternProperties) {
    for (const [pattern, propSchema] of Object.entries(schema.patternProperties)) {
      const regex = new RegExp(pattern);
      for (const [key, value] of Object.entries(obj)) {
        if (regex.test(key)) {
          evaluatedProperties.add(key);
          const result = validate(value, propSchema, path ? `${path}.${key}` : key, dynamicScope);
          errors.push(...result.errors);
        }
      }
    }
  }

  // Validate additionalProperties
  if (schema.additionalProperties !== undefined) {
    for (const [key, value] of Object.entries(obj)) {
      if (!evaluatedProperties.has(key)) {
        if (schema.additionalProperties === false) {
          errors.push({
            path: path ? `${path}.${key}` : key,
            message: 'Additional property is not allowed',
            keyword: 'additionalProperties',
            value,
          });
        } else if (schema.additionalProperties === true) {
          evaluatedProperties.add(key);
        } else if (typeof schema.additionalProperties === 'object') {
          evaluatedProperties.add(key);
          const result = validate(
            value,
            schema.additionalProperties,
            path ? `${path}.${key}` : key,
            dynamicScope
          );
          errors.push(...result.errors);
        }
      }
    }
  }

  return {
    errors,
    evaluatedProperties: evaluatedProperties.size > 0 ? evaluatedProperties : undefined,
  };
}

export function validatePropertyNames(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  // Check !== undefined to handle propertyNames: false
  if (schema.propertyNames === undefined) {
    return EMPTY_RESULT;
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const obj = data as Record<string, unknown>;
  const errors: ValidationError[] = [];

  for (const key of Object.keys(obj)) {
    const keyResult = validate(
      key,
      schema.propertyNames,
      `${path}[propertyName:${key}]`,
      dynamicScope
    );
    for (const err of keyResult.errors) {
      errors.push({
        path: path ? `${path}.${key}` : key,
        message: `Property name "${key}" is invalid: ${err.message}`,
        keyword: 'propertyNames',
        value: key,
      });
    }
  }

  return errors.length > 0 ? { errors } : EMPTY_RESULT;
}

export function validateDependentSchemas(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (!schema.dependentSchemas) {
    return EMPTY_RESULT;
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const obj = data as Record<string, unknown>;
  const results: KeywordResult[] = [];

  for (const [trigger, dependentSchema] of Object.entries(schema.dependentSchemas)) {
    if (Object.hasOwn(obj, trigger)) {
      const result = validate(data, dependentSchema, path, dynamicScope);
      results.push(result);
    }
  }

  return mergeResults(...results);
}
