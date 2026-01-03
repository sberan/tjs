/**
 * Dependent required keyword handler (dependentRequired)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.5.4
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, pathExpr } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { supportsFeature } from '../context.js';
import { genError } from './utils.js';

/**
 * Generate dependentRequired validation check.
 * This is a simple handler - no sub-schema validation needed.
 */
export function generateDependentRequiredCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (!schema.dependentRequired) return;

  // dependentRequired was introduced in draft 2019-09
  // Check if this keyword is supported in the compilation context's draft
  if (!supportsFeature(ctx.options.defaultMeta, 'unevaluated')) {
    // In draft-07 and earlier, dependentRequired doesn't exist - ignore it
    // (unevaluated feature check is a proxy for 2019-09+ which includes dependentRequired)
    return;
  }

  // Filter out empty arrays (no requirements)
  const deps = Object.entries(schema.dependentRequired).filter(([, reqs]) => reqs.length > 0);
  if (deps.length === 0) return;

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const [prop, requiredProps] of deps) {
      code.if(_`${prop} in ${dataVar}`, () => {
        for (const reqProp of requiredProps) {
          const reqPathExpr = pathExpr(pathExprCode, reqProp);
          code.if(_`!(${reqProp} in ${dataVar})`, () => {
            genError(
              code,
              reqPathExpr,
              '#/dependentRequired',
              'dependentRequired',
              `must have property '${reqProp}' when property '${prop}' is present`,
              { missingProperty: reqProp },
              ctx
            );
          });
        }
      });
    }
  });
}
