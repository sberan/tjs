/**
 * Array constraint keyword handlers (minItems, maxItems, uniqueItems)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.4
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError, hasTypeConstraint, getItemTypes } from './utils.js';

/**
 * Generate array validation checks (minItems, maxItems, uniqueItems)
 */
export function generateArrayChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const hasArrayChecks =
    schema.minItems !== undefined || schema.maxItems !== undefined || schema.uniqueItems === true;

  if (!hasArrayChecks) return;

  const genChecks = () => {
    if (schema.minItems !== undefined) {
      code.if(_`${dataVar}.length < ${schema.minItems}`, () => {
        genError(
          code,
          pathExprCode,
          '#/minItems',
          'minItems',
          `must NOT have fewer than ${schema.minItems} items`,
          { limit: schema.minItems },
          ctx
        );
      });
    }

    if (schema.maxItems !== undefined) {
      code.if(_`${dataVar}.length > ${schema.maxItems}`, () => {
        genError(
          code,
          pathExprCode,
          '#/maxItems',
          'maxItems',
          `must NOT have more than ${schema.maxItems} items`,
          { limit: schema.maxItems },
          ctx
        );
      });
    }

    if (schema.uniqueItems === true) {
      // Check if items are known to be primitives at compile time
      const itemTypes = getItemTypes(schema);
      const canOptimize =
        itemTypes.length > 0 && !itemTypes.some((t) => t === 'object' || t === 'array');

      const iVar = code.genVar('i');

      if (canOptimize) {
        // Fast path: items are primitives, use Set for O(n) uniqueness check
        const seenVar = code.genVar('seen');
        const lenVar = code.genVar('len');
        const itemVar = code.genVar('item');
        code.line(_`const ${seenVar} = new Set();`);
        code.block(
          _`for (let ${iVar} = 0, ${lenVar} = ${dataVar}.length; ${iVar} < ${lenVar}; ${iVar}++)`,
          () => {
            code.line(_`const ${itemVar} = ${dataVar}[${iVar}];`);
            code.if(_`${seenVar}.has(${itemVar})`, () => {
              genError(
                code,
                pathExprCode,
                '#/uniqueItems',
                'uniqueItems',
                'must NOT have duplicate items',
                {},
                ctx
              );
            });
            code.line(_`${seenVar}.add(${itemVar});`);
          }
        );
      } else {
        // Slow path: O(n²) comparison using deepEqual
        const jVar = code.genVar('j');
        code.block(_`outer: for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.block(_`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
            code.if(_`deepEqual(${dataVar}[${iVar}], ${dataVar}[${jVar}])`, () => {
              genError(
                code,
                pathExprCode,
                '#/uniqueItems',
                'uniqueItems',
                'must NOT have duplicate items',
                {},
                ctx
              );
            });
          });
        });
      }
    }
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    // Only check if data is an array
    code.if(_`Array.isArray(${dataVar})`, genChecks);
  }
}
