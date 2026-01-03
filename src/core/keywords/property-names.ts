/**
 * Property names keyword handler (propertyNames)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.5.8
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { pathExprDynamic } from '../codegen.js';
import { genError } from './utils.js';
import type { SchemaValidator } from './types.js';

/**
 * Generate propertyNames validation check.
 * Uses dependency injection for sub-schema validation to avoid circular imports.
 */
export function generatePropertyNamesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar: Name | undefined,
  validateSubschema: SchemaValidator
): void {
  if (schema.propertyNames === undefined) return;

  const propNamesSchema = schema.propertyNames;

  // Handle boolean schema for propertyNames
  if (propNamesSchema === true) {
    // All property names are valid - no check needed
    return;
  }

  if (propNamesSchema === false) {
    // No property names are valid - object must be empty
    code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
      code.if(_`Object.keys(${dataVar}).length > 0`, () => {
        genError(
          code,
          pathExprCode,
          '#/propertyNames',
          'propertyNames',
          'property name must be valid',
          {},
          ctx
        );
      });
    });
    return;
  }

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    const keyVar = new Name('key');
    code.forIn(keyVar, dataVar, () => {
      // For propertyNames, the path is the key itself (with JSON pointer prefix)
      const keyPathExpr = pathExprDynamic(pathExprCode, keyVar);
      validateSubschema(code, propNamesSchema, keyVar, keyPathExpr, ctx, dynamicScopeVar);
    });
  });
}
