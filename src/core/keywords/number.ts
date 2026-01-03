/**
 * Number keyword handlers (minimum, maximum, multipleOf, etc.)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.2
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import { CompileContext, VOCABULARIES } from '../context.js';
import { genError, hasTypeConstraint } from './utils.js';

/**
 * Generate number validation checks (minimum, maximum, multipleOf, etc.)
 */
export function generateNumberChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  // Number checks are validation vocabulary keywords
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const hasNumberChecks =
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined;

  if (!hasNumberChecks) return;

  // Check if we need the typeof guard - skip if type already constrains to number/integer
  const needsTypeGuard =
    !hasTypeConstraint(schema, 'number') && !hasTypeConstraint(schema, 'integer');

  const genChecks = () => {
    // Handle minimum with optional exclusiveMinimum (draft4 boolean form)
    if (schema.minimum !== undefined) {
      // In draft4, exclusiveMinimum is a boolean that modifies minimum
      if (schema.exclusiveMinimum === true) {
        code.if(_`${dataVar} <= ${schema.minimum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minimum',
            'minimum',
            `must be > ${schema.minimum}`,
            {
              comparison: '>',
              limit: schema.minimum,
            },
            ctx
          );
        });
      } else {
        code.if(_`${dataVar} < ${schema.minimum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minimum',
            'minimum',
            `must be >= ${schema.minimum}`,
            {
              comparison: '>=',
              limit: schema.minimum,
            },
            ctx
          );
        });
      }
    }

    // Handle maximum with optional exclusiveMaximum (draft4 boolean form)
    if (schema.maximum !== undefined) {
      // In draft4, exclusiveMaximum is a boolean that modifies maximum
      if (schema.exclusiveMaximum === true) {
        code.if(_`${dataVar} >= ${schema.maximum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maximum',
            'maximum',
            `must be < ${schema.maximum}`,
            {
              comparison: '<',
              limit: schema.maximum,
            },
            ctx
          );
        });
      } else {
        code.if(_`${dataVar} > ${schema.maximum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maximum',
            'maximum',
            `must be <= ${schema.maximum}`,
            {
              comparison: '<=',
              limit: schema.maximum,
            },
            ctx
          );
        });
      }
    }

    // Handle exclusiveMinimum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMinimum === 'number') {
      code.if(_`${dataVar} <= ${schema.exclusiveMinimum}`, () => {
        genError(
          code,
          pathExprCode,
          '#/exclusiveMinimum',
          'exclusiveMinimum',
          `must be > ${schema.exclusiveMinimum}`,
          { comparison: '>', limit: schema.exclusiveMinimum },
          ctx
        );
      });
    }

    // Handle exclusiveMaximum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMaximum === 'number') {
      code.if(_`${dataVar} >= ${schema.exclusiveMaximum}`, () => {
        genError(
          code,
          pathExprCode,
          '#/exclusiveMaximum',
          'exclusiveMaximum',
          `must be < ${schema.exclusiveMaximum}`,
          { comparison: '<', limit: schema.exclusiveMaximum },
          ctx
        );
      });
    }

    if (schema.multipleOf !== undefined) {
      const multipleOf = schema.multipleOf;
      // For integer multipleOf values >= 1, use simpler modulo check
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        code.if(_`${dataVar} % ${multipleOf} !== 0`, () => {
          genError(
            code,
            pathExprCode,
            '#/multipleOf',
            'multipleOf',
            `must be multiple of ${schema.multipleOf}`,
            { multipleOf: schema.multipleOf },
            ctx
          );
        });
      } else if (Number.isInteger(1 / multipleOf)) {
        // "Clean" fractions where 1/multipleOf is integer (0.5→2, 0.25→4, 0.0001→10000)
        // Any integer is a multiple of these, but we need different checks:
        // - Small values: use division (0.0075/0.0001=75, modulo has fp error)
        // - Large values that overflow: use modulo (1e308%0.5=0, division=Infinity)
        const divVar = code.genVar('div');
        code.line(_`const ${divVar} = ${dataVar} / ${multipleOf};`);
        code.if(_`!Number.isFinite(${divVar})`, () => {
          // Overflow: modulo is correct for clean fractions
          code.if(_`${dataVar} % ${multipleOf} !== 0`, () => {
            genError(
              code,
              pathExprCode,
              '#/multipleOf',
              'multipleOf',
              `must be multiple of ${schema.multipleOf}`,
              { multipleOf: schema.multipleOf },
              ctx
            );
          });
        });
        code.else(() => {
          // Normal: division is more accurate
          code.if(_`!Number.isInteger(${divVar})`, () => {
            genError(
              code,
              pathExprCode,
              '#/multipleOf',
              'multipleOf',
              `must be multiple of ${schema.multipleOf}`,
              { multipleOf: schema.multipleOf },
              ctx
            );
          });
        });
      } else {
        // Non-clean fractions (e.g., 0.123456789): division + isInteger
        // Overflow to Infinity → isInteger(Infinity) = false → correctly rejects
        // (these can't evenly divide large integers anyway)
        code.if(_`!Number.isInteger(${dataVar} / ${multipleOf})`, () => {
          genError(
            code,
            pathExprCode,
            '#/multipleOf',
            'multipleOf',
            `must be multiple of ${schema.multipleOf}`,
            { multipleOf: schema.multipleOf },
            ctx
          );
        });
      }
    }
  };

  // Skip type guard if we already know it's a number/integer
  if (needsTypeGuard) {
    code.if(_`typeof ${dataVar} === 'number'`, genChecks);
  } else {
    genChecks();
  }
}
