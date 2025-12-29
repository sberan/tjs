/**
 * Shared utilities for keyword code generators
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, escapeString, propAccess } from '../codegen.js';

/**
 * Property names that exist on Object.prototype or Array.prototype.
 * These require Object.hasOwn for accurate existence check.
 * Other property names can use the faster `!== undefined` pattern.
 * Generated at module load time from actual prototype chains.
 */
export const PROTOTYPE_PROPS = new Set([
  ...Object.getOwnPropertyNames(Object.prototype),
  ...Object.getOwnPropertyNames(Array.prototype),
]);

/**
 * Check if a property name is safe for fast existence check (!== undefined).
 * Unsafe names are those that exist on Object.prototype or Array.prototype.
 */
export function isSafePropertyName(name: string): boolean {
  return !PROTOTYPE_PROPS.has(name);
}

/**
 * Generate code to check if a property exists and execute a callback with the value.
 * Uses fast path (!== undefined) for safe property names, Object.hasOwn for prototype names.
 */
export function genPropertyCheck(
  code: CodeBuilder,
  dataVar: string,
  propName: string,
  callback: (valueVar: string) => void
): void {
  const propStr = escapeString(propName);
  const propAccessed = propAccess(dataVar, propName);

  if (isSafePropertyName(propName)) {
    // Fast path: store value and check !== undefined
    const propVar = code.genVar('prop');
    code.line(`const ${propVar} = ${propAccessed};`);
    code.if(`${propVar} !== undefined`, () => {
      callback(propVar);
    });
  } else {
    // Slow path: use Object.hasOwn for prototype property names
    code.if(`Object.hasOwn(${dataVar}, '${propStr}')`, () => {
      callback(propAccessed);
    });
  }
}

/**
 * Generate code to check if a required property exists.
 * Uses fast path ('in' operator) for safe names, Object.hasOwn for prototype names.
 */
export function genRequiredCheck(
  code: CodeBuilder,
  dataVar: string,
  propName: string,
  pathExpr: string
): void {
  const propStr = escapeString(propName);
  const propPathExpr = pathExpr === "''" ? `'${propStr}'` : `${pathExpr} + '.${propStr}'`;

  // For prototype property names, use Object.hasOwn for accuracy.
  // For other names, use the faster 'in' operator.
  const checkExpr = isSafePropertyName(propName)
    ? `!('${propStr}' in ${dataVar})`
    : `!Object.hasOwn(${dataVar}, '${propStr}')`;

  code.if(checkExpr, () => {
    genError(code, propPathExpr, 'required', 'Required property missing');
  });
}

/**
 * Generate code to assign error and return false (like AJV)
 */
export function genError(
  code: CodeBuilder,
  pathExpr: string,
  keyword: string,
  message: string
): void {
  // Assign error directly to main function (like AJV) - avoids array push overhead
  code.line(
    `validate0.errors = [{ path: ${pathExpr}, message: '${escapeString(message)}', keyword: '${keyword}' }];`
  );
  code.line('return false;');
}

/**
 * Check if schema has a specific type constraint that guarantees the type is already validated
 */
export function hasTypeConstraint(schema: JsonSchemaBase, type: string): boolean {
  if (!schema.type) return false;
  if (Array.isArray(schema.type)) {
    // Only if single type
    return schema.type.length === 1 && schema.type[0] === type;
  }
  return schema.type === type;
}

/**
 * Generate type checking expression for a given type
 */
export function getTypeCheck(dataVar: string, type: string): string {
  switch (type) {
    case 'string':
      return `typeof ${dataVar} === 'string'`;
    case 'number':
      return `typeof ${dataVar} === 'number'`;
    case 'integer':
      return `typeof ${dataVar} === 'number' && Number.isInteger(${dataVar})`;
    case 'boolean':
      return `typeof ${dataVar} === 'boolean'`;
    case 'null':
      return `${dataVar} === null`;
    case 'array':
      return `Array.isArray(${dataVar})`;
    case 'object':
      return `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`;
    default:
      return 'false';
  }
}

/**
 * Get allowed types from an items/prefixItems schema for contains optimization
 * Returns empty array if types are unknown or could include objects/arrays
 */
export function getItemTypes(schema: JsonSchemaBase): string[] {
  // Check items schema for type constraints
  const itemsSchema = schema.items;
  if (typeof itemsSchema === 'object' && itemsSchema !== null && !Array.isArray(itemsSchema)) {
    const itemType = (itemsSchema as JsonSchemaBase).type;
    if (typeof itemType === 'string') {
      return [itemType];
    }
    if (Array.isArray(itemType)) {
      return itemType as string[];
    }
  }
  // prefixItems or array items - too complex to analyze
  return [];
}

/**
 * Check if a schema is a no-op (always passes)
 */
export function isNoOpSchema(schema: unknown): boolean {
  // boolean true or empty object are no-ops
  if (schema === true) return true;
  if (typeof schema === 'object' && schema !== null) {
    return Object.keys(schema).length === 0;
  }
  return false;
}
