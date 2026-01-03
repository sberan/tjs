/**
 * Object constraint keyword handlers (required, minProperties, maxProperties)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.5
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError, genBatchedRequiredChecks, hasTypeConstraint } from './utils.js';

/**
 * Generate object validation checks (required, minProperties, maxProperties)
 */
export function generateObjectChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const hasObjectChecks =
    (schema.required && schema.required.length > 0) ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined;

  if (!hasObjectChecks) return;

  const genChecks = () => {
    if (schema.required && schema.required.length > 0) {
      genBatchedRequiredChecks(code, dataVar, schema.required, pathExprCode, ctx);
    }

    if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
      code.line(_`const propCount = Object.keys(${dataVar}).length;`);

      if (schema.minProperties !== undefined) {
        code.if(_`propCount < ${schema.minProperties}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minProperties',
            'minProperties',
            `must NOT have fewer than ${schema.minProperties} properties`,
            { limit: schema.minProperties },
            ctx
          );
        });
      }

      if (schema.maxProperties !== undefined) {
        code.if(_`propCount > ${schema.maxProperties}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maxProperties',
            'maxProperties',
            `must NOT have more than ${schema.maxProperties} properties`,
            { limit: schema.maxProperties },
            ctx
          );
        });
      }
    }
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    // Only check if data is an object
    code.if(
      _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
}
