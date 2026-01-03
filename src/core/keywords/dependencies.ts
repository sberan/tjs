/**
 * Legacy dependencies keyword handler (dependencies - draft-07)
 * @see https://json-schema.org/draft-07/json-schema-validation#section-6.5.7
 */

import type { JsonSchema, JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, pathExpr } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError } from './utils.js';
import type { SchemaValidator } from './types.js';

/**
 * Generate legacy dependencies validation check.
 * dependencies can contain either:
 * - array of strings (like dependentRequired)
 * - schema object (like dependentSchemas)
 *
 * Uses dependency injection for sub-schema validation to avoid circular imports.
 */
export function generateDependenciesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar: Name | undefined,
  validateSubschema: SchemaValidator
): void {
  if (!schema.dependencies) return;

  // Check if we have any non-trivial dependencies to avoid unnecessary code generation
  let hasNonTrivial = false;
  for (const prop in schema.dependencies) {
    const dep = schema.dependencies[prop];
    if (
      Array.isArray(dep)
        ? dep.length > 0
        : dep !== true &&
          !(typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0)
    ) {
      hasNonTrivial = true;
      break;
    }
  }

  if (!hasNonTrivial) return;

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const prop in schema.dependencies) {
      const dep = schema.dependencies[prop];

      // Skip trivial dependencies
      if (Array.isArray(dep)) {
        if (dep.length === 0) continue;
      } else if (
        dep === true ||
        (typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0)
      ) {
        continue;
      }
      code.if(_`${prop} in ${dataVar}`, () => {
        if (Array.isArray(dep)) {
          // Array of required property names
          for (const reqProp of dep) {
            const reqPathExpr = pathExpr(pathExprCode, reqProp);
            code.if(_`!(${reqProp} in ${dataVar})`, () => {
              genError(
                code,
                reqPathExpr,
                '#/dependencies',
                'dependencies',
                `must have property '${reqProp}' when property '${prop}' is present`,
                { missingProperty: reqProp },
                ctx
              );
            });
          }
        } else {
          // Schema that must validate
          validateSubschema(code, dep as JsonSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
        }
      });
    }
  });
}
