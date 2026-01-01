/**
 * Shared utilities for keyword code generators
 */

import type { JsonSchemaBase } from '../../types.js';
import {
  CodeBuilder,
  Code,
  Name,
  _,
  propAccess,
  pathExpr,
  pathExprDynamic,
  stringify,
} from '../codegen.js';
import type { CompileContext } from '../context.js';

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
    // Pass raw propName - the _ template tag handles escaping via safeInterpolate
    code.if(_`Object.hasOwn(${dataVar}, ${propName})`, () => {
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
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const propPathExpr = pathExpr(pathExprCode, propName);

  // For prototype property names, use Object.hasOwn for accuracy.
  // For other names, use the faster 'in' operator.
  // Pass raw propName - the _ template tag handles escaping via safeInterpolate
  const checkExpr = isSafePropertyName(propName)
    ? _`!(${propName} in ${dataVar})`
    : _`!Object.hasOwn(${dataVar}, ${propName})`;

  code.if(checkExpr, () => {
    genError(
      code,
      propPathExpr,
      '#/required',
      'required',
      `must have required property '${propName}'`,
      {
        missingProperty: propName,
      },
      ctx
    );
  });
}

/**
 * Generate batched required checks for better performance.
 * Combines all required checks into a single compound boolean expression
 * similar to AJV's approach, which is more efficient than separate if statements.
 */
export function genBatchedRequiredChecks(
  code: CodeBuilder,
  dataVar: Name,
  requiredProps: readonly string[],
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (requiredProps.length === 0) return;

  // For single property, use simple check without missing variable overhead
  if (requiredProps.length === 1) {
    genRequiredCheck(code, dataVar, requiredProps[0], pathExprCode, ctx);
    return;
  }

  // For multiple properties, batch them into a single check
  // Generate a compound condition with missing variable tracking
  const missingVar = code.genVar('missing');
  code.line(_`let ${missingVar};`);

  // Build the compound condition
  const conditions: Code[] = [];
  for (const propName of requiredProps) {
    // Pass raw propName - the _ template tag handles escaping via safeInterpolate
    if (isSafePropertyName(propName)) {
      // Fast path: use 'in' operator
      conditions.push(_`(!(${propName} in ${dataVar}) && (${missingVar} = ${propName}))`);
    } else {
      // Slow path: use !Object.hasOwn for prototype properties
      conditions.push(
        _`(!Object.hasOwn(${dataVar}, ${propName}) && (${missingVar} = ${propName}))`
      );
    }
  }

  // Combine all conditions with ||
  let combinedCondition = conditions[0];
  for (let i = 1; i < conditions.length; i++) {
    combinedCondition = _`${combinedCondition} || ${conditions[i]}`;
  }

  // Generate the if statement with error
  code.if(combinedCondition, () => {
    // Check if we're in subschema check mode
    if (ctx?.isInSubschemaCheck()) {
      // Subschema mode: set valid = false and break out of labeled block
      const validVar = ctx.getSubschemaValidVar();
      const label = ctx.getSubschemaLabel();
      code.line(_`${validVar} = false;`);
      code.line(_`break ${label};`);
    } else {
      // Normal mode: set errors and return false
      // Use the missing variable to create dynamic path (already in JSON Pointer format)
      const propPathExpr = pathExprDynamic(pathExprCode, missingVar);
      code.line(
        _`${ctx.getMainFuncName()}.errors = [{ instancePath: ${propPathExpr}, schemaPath: '#/required', keyword: 'required', params: { missingProperty: ${missingVar} }, message: "must have required property '" + ${missingVar} + "'" }];`
      );
      code.line(_`return false;`);
    }
  });
}

/**
 * Generate code to push an error and return false.
 * Errors are in AJV-compatible format with instancePath, schemaPath, keyword, params, message.
 *
 * When called inside a subschema check context (ctx.isInSubschemaCheck() is true),
 * this generates `validVar = false; break label;` instead of `return false`.
 * This allows subschema checks to use labeled blocks instead of IIFEs.
 *
 * @param code - Code builder
 * @param pathExprCode - Code expression for the instance path (already in JSON Pointer format)
 * @param schemaPath - Schema path as JSON pointer (e.g., "#/properties/name/type")
 * @param keyword - Validation keyword that failed
 * @param message - Human-readable error message
 * @param params - Keyword-specific params object (will be stringified)
 * @param mainFuncName - Main function name for setting .errors property (AJV-compatible)
 * @param ctx - Optional compile context for subschema check mode
 */
export function genError(
  code: CodeBuilder,
  pathExprCode: Code,
  schemaPath: string,
  keyword: string,
  message: string,
  params: object,
  ctx: CompileContext
): void {
  // Check if we're in subschema check mode
  if (ctx?.isInSubschemaCheck()) {
    // Subschema mode: set valid = false and break out of labeled block
    const validVar = ctx.getSubschemaValidVar();
    const label = ctx.getSubschemaLabel();
    code.line(_`${validVar} = false;`);
    code.line(_`break ${label};`);
    return;
  }

  // Normal mode: set errors and return false
  // Use stringify() to get a Code object that won't be double-quoted by the _ template
  const paramsCode = stringify(params);

  // Build the error object
  const errObj = _`{ instancePath: ${pathExprCode}, schemaPath: ${schemaPath}, keyword: ${keyword}, params: ${paramsCode}, message: ${message} }`;

  // Set .errors on main function directly (AJV-compatible pattern)
  code.line(_`${ctx.getMainFuncName()}.errors = [${errObj}];`);
  code.line(_`return false;`);
}

/**
 * Generate code to exit from a subschema check when a sub-validator call fails.
 * In normal mode: generates `return false`
 * In subschema mode: generates `validVar = false; break label;`
 *
 * Use this when calling a sub-validator function and need to handle its failure.
 * Unlike genError, this doesn't set error objects (the sub-validator already did).
 */
export function genSubschemaExit(code: CodeBuilder, ctx: CompileContext): void {
  if (ctx.isInSubschemaCheck()) {
    // Subschema mode: set valid = false and break out of labeled block
    const validVar = ctx.getSubschemaValidVar();
    const label = ctx.getSubschemaLabel();
    code.line(_`${validVar} = false;`);
    code.line(_`break ${label};`);
  } else {
    // Normal mode: just return false (error was already set by sub-validator)
    code.line(_`return false;`);
  }
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
      // Use Number.isInteger for better performance and correctness
      // It's a single native function call instead of multiple checks
      return _`Number.isInteger(${dataVar})`;
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
