/**
 * Type keyword handler
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.1.1
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, or, not } from '../codegen.js';
import { CompileContext, VOCABULARIES } from '../context.js';
import { genError, getTypeCheck, getOptimizedUnionTypeCheck } from './utils.js';

/**
 * Generate type check code
 */
export function generateTypeCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (!schema.type) return;
  // type is a validation vocabulary keyword
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];

  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(dataVar, type);
    code.if(not(check), () => {
      genError(code, pathExprCode, '#/type', 'type', `must be ${type}`, { type }, ctx);
    });
  } else {
    // Multiple types - check if all can use typeof
    const canOptimizeWithTypeof = types.every(
      (t) => t === 'string' || t === 'number' || t === 'boolean'
    );

    if (canOptimizeWithTypeof) {
      // Optimize by caching typeof result
      const typeofVar = code.genVar('t');
      code.line(_`const ${typeofVar} = typeof ${dataVar};`);
      const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);
      code.if(not(or(...checks)), () => {
        const typeList = types.join(',');
        genError(
          code,
          pathExprCode,
          '#/type',
          'type',
          `must be ${types.join(' or ')}`,
          {
            type: typeList,
          },
          ctx
        );
      });
    } else {
      // Try optimized union check first
      const optimizedCheck = getOptimizedUnionTypeCheck(dataVar, types);
      if (optimizedCheck) {
        code.if(not(optimizedCheck), () => {
          const typeList = types.join(',');
          genError(
            code,
            pathExprCode,
            '#/type',
            'type',
            `must be ${types.join(' or ')}`,
            {
              type: typeList,
            },
            ctx
          );
        });
      } else {
        // Fallback: generate individual OR checks
        const checks = types.map((t) => getTypeCheck(dataVar, t));
        code.if(not(or(...checks)), () => {
          const typeList = types.join(',');
          genError(
            code,
            pathExprCode,
            '#/type',
            'type',
            `must be ${types.join(' or ')}`,
            {
              type: typeList,
            },
            ctx
          );
        });
      }
    }
  }
}
