import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

export function validateItems(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate } = ctx;

  if (!Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const errors: ValidationError[] = [];
  const evaluatedItems = new Set<number>();

  // Validate prefixItems (tuple)
  if (schema.prefixItems) {
    for (let i = 0; i < schema.prefixItems.length; i++) {
      if (i < data.length) {
        evaluatedItems.add(i);
        const result = validate(data[i], schema.prefixItems[i], `${path}[${i}]`, dynamicScope);
        errors.push(...result.errors);
      }
    }

    // Validate remaining items after prefixItems
    const restStart = schema.prefixItems.length;
    if (schema.items === false) {
      if (data.length > restStart) {
        errors.push({
          path,
          message: `Array must have exactly ${restStart} items`,
          keyword: 'items',
          value: data,
        });
      }
    } else if (schema.items === true) {
      for (let i = restStart; i < data.length; i++) {
        evaluatedItems.add(i);
      }
    } else if (typeof schema.items === 'object') {
      for (let i = restStart; i < data.length; i++) {
        evaluatedItems.add(i);
        const result = validate(data[i], schema.items, `${path}[${i}]`, dynamicScope);
        errors.push(...result.errors);
      }
    }
  } else if (schema.items === false) {
    if (data.length > 0) {
      errors.push({
        path,
        message: 'Array must be empty',
        keyword: 'items',
        value: data,
      });
    }
  } else if (schema.items === true) {
    for (let i = 0; i < data.length; i++) {
      evaluatedItems.add(i);
    }
  } else if (typeof schema.items === 'object') {
    for (let i = 0; i < data.length; i++) {
      evaluatedItems.add(i);
      const result = validate(data[i], schema.items, `${path}[${i}]`, dynamicScope);
      errors.push(...result.errors);
    }
  }

  return {
    errors,
    evaluatedItems: evaluatedItems.size > 0 ? evaluatedItems : undefined,
  };
}

export function validateContains(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate, validationEnabled } = ctx;

  // Check !== undefined to handle contains: false
  if (schema.contains === undefined) {
    return EMPTY_RESULT;
  }

  if (!Array.isArray(data)) {
    return EMPTY_RESULT;
  }

  const minContains = validationEnabled ? (schema.minContains ?? 1) : 1;
  const maxContains = validationEnabled ? (schema.maxContains ?? Infinity) : Infinity;

  const evaluatedItems = new Set<number>();
  let matchCount = 0;

  for (let i = 0; i < data.length; i++) {
    const result = validate(data[i], schema.contains, `${path}[${i}]`, dynamicScope);
    if (result.errors.length === 0) {
      matchCount++;
      evaluatedItems.add(i);
    }
  }

  const errors: ValidationError[] = [];

  if (validationEnabled) {
    if (minContains > 0 && matchCount < minContains) {
      errors.push({
        path,
        message: `Array must contain at least ${minContains} item(s) matching the contains schema`,
        keyword: 'contains',
        value: matchCount,
      });
    }
    if (matchCount > maxContains) {
      errors.push({
        path,
        message: `Array must contain at most ${maxContains} item(s) matching the contains schema`,
        keyword: 'maxContains',
        value: matchCount,
      });
    }
  }

  return {
    errors,
    evaluatedItems: evaluatedItems.size > 0 ? evaluatedItems : undefined,
  };
}
