/**
 * Shared utilities for keyword code generators
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, escapeString, propAccess, pathExpr } from '../codegen.js';

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
  dataVar: Name,
  propName: string,
  callback: (valueVar: Name | Code) => void
): void {
  const propStr = escapeString(propName);
  const propAccessCode = propAccess(dataVar, propName);

  if (isSafePropertyName(propName)) {
    // Fast path: store value and check !== undefined
    const propVar = code.genVar('prop');
    code.line(_`const ${propVar} = ${propAccessCode};`);
    code.if(_`${propVar} !== undefined`, () => {
      callback(propVar);
    });
  } else {
    // Slow path: use Object.hasOwn for prototype property names
    code.if(_`Object.hasOwn(${dataVar}, '${new Code(propStr)}')`, () => {
      callback(propAccessCode);
    });
  }
}

/**
 * Generate code to check if a required property exists.
 * Uses fast path ('in' operator) for safe names, Object.hasOwn for prototype names.
 */
export function genRequiredCheck(
  code: CodeBuilder,
  dataVar: Name,
  propName: string,
  pathExprCode: Code
): void {
  const propStr = escapeString(propName);
  const propPathExpr = pathExpr(pathExprCode, propName);

  // For prototype property names, use Object.hasOwn for accuracy.
  // For other names, use the faster 'in' operator.
  const checkExpr = isSafePropertyName(propName)
    ? _`!('${new Code(propStr)}' in ${dataVar})`
    : _`!Object.hasOwn(${dataVar}, '${new Code(propStr)}')`;

  code.if(checkExpr, () => {
    genError(code, propPathExpr, 'required', 'Required property missing');
  });
}

/**
 * Generate code to push an error and return false
 */
export function genError(
  code: CodeBuilder,
  pathExprCode: Code,
  keyword: string,
  message: string
): void {
  const escapedMessage = escapeString(message);
  code.line(
    _`if (errors) errors.push({ path: ${pathExprCode}, message: '${new Code(escapedMessage)}', keyword: '${new Code(keyword)}' });`
  );
  code.line(_`return false;`);
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
export function getTypeCheck(dataVar: Name | Code, type: string): Code {
  switch (type) {
    case 'string':
      return _`typeof ${dataVar} === 'string'`;
    case 'number':
      return _`typeof ${dataVar} === 'number'`;
    case 'integer':
      return _`typeof ${dataVar} === 'number' && ${dataVar} % 1 === 0 && isFinite(${dataVar})`;
    case 'boolean':
      return _`typeof ${dataVar} === 'boolean'`;
    case 'null':
      return _`${dataVar} === null`;
    case 'array':
      return _`Array.isArray(${dataVar})`;
    case 'object':
      return _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`;
    default:
      return _`false`;
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

  // Handle tuple validation (items is an array of schemas)
  // Only optimize if additionalItems is explicitly false OR has a type constraint
  if (Array.isArray(itemsSchema)) {
    const additionalItems = schema.additionalItems;

    // Skip optimization if additionalItems is undefined or true (allows anything)
    if (additionalItems === undefined || additionalItems === true) {
      return [];
    }

    const types = new Set<string>();

    // Analyze each schema in the tuple
    for (const itemSchema of itemsSchema) {
      if (typeof itemSchema === 'object' && itemSchema !== null) {
        const itemType = (itemSchema as JsonSchemaBase).type;
        if (typeof itemType === 'string') {
          types.add(itemType);
        } else if (Array.isArray(itemType)) {
          for (const t of itemType) types.add(t);
        } else {
          // Schema without explicit type - can't optimize
          return [];
        }
      } else {
        // Boolean schema or null - can't optimize
        return [];
      }
    }

    // Check additionalItems schema if it's not false
    if (additionalItems !== false) {
      if (typeof additionalItems === 'object' && additionalItems !== null) {
        const addType = (additionalItems as JsonSchemaBase).type;
        if (typeof addType === 'string') {
          types.add(addType);
        } else if (Array.isArray(addType)) {
          for (const t of addType) types.add(t);
        } else {
          // additionalItems schema without explicit type - can't optimize
          return [];
        }
      }
    }

    return Array.from(types);
  }

  // prefixItems or other cases - too complex to analyze
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

/**
 * Get the simple type from a type-only schema.
 * Returns undefined if the schema is not a simple type-only schema.
 */
export function getSimpleType(schema: unknown): string | undefined {
  if (typeof schema !== 'object' || schema === null) return undefined;
  const s = schema as JsonSchemaBase;
  const keys = Object.keys(s);

  // Single type keyword
  if (keys.length === 1 && keys[0] === 'type' && typeof s.type === 'string') {
    return s.type;
  }

  // Type + non-validating metadata keywords ($schema, $id) which don't affect validation
  // Only allow $schema and $id because they're structural metadata, not validation constraints
  // Note: $comment, title, description are excluded because they could be validated properties
  // when the schema is used as data (e.g., validating against a metaschema)
  const metadataKeys = new Set(['$schema', '$id']);
  const validationKeys = keys.filter((k) => !metadataKeys.has(k));

  if (validationKeys.length === 1 && validationKeys[0] === 'type' && typeof s.type === 'string') {
    return s.type;
  }

  return undefined;
}

/**
 * Get inline type check code for a simple type-only schema.
 * Returns undefined if the schema cannot be inlined.
 */
export function getInlineTypeCheck(dataVar: Name, schema: unknown): Code | undefined {
  const simpleType = getSimpleType(schema);
  if (!simpleType) return undefined;
  return getTypeCheck(dataVar, simpleType);
}
