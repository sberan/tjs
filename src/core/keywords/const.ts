/**
 * Const keyword handler
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.1.3
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, stringify } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError } from './utils.js';

/**
 * Generate const check code
 */
export function generateConstCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (schema.const === undefined) return;

  // For primitives, use strict equality
  if (schema.const === null || typeof schema.const !== 'object') {
    code.if(_`${dataVar} !== ${stringify(schema.const)}`, () => {
      genError(
        code,
        pathExprCode,
        '#/const',
        'const',
        'must be equal to constant',
        {
          allowedValue: schema.const,
        },
        ctx
      );
    });
  } else {
    // For objects/arrays, store as runtime constant and use deepEqual
    // This avoids JSON parsing overhead of stringify at runtime
    const constName = new Name(ctx.genRuntimeName('const'));
    ctx.addRuntimeFunction(constName.str, schema.const);
    code.if(_`!deepEqual(${dataVar}, ${constName})`, () => {
      genError(
        code,
        pathExprCode,
        '#/const',
        'const',
        'must be equal to constant',
        {
          allowedValue: schema.const,
        },
        ctx
      );
    });
  }
}
