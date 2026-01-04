import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { VOCABULARIES } from '../../context.js';
import { hasTypeConstraint } from '../shared/utils.js';

/**
 * Keyword handler for number validation keywords: minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf.
 */
export default function generateNumberChecks(ctx: CompileContext): void {
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const { schema, code, data } = ctx;
  const hasNumberChecks =
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined;

  if (!hasNumberChecks) return;

  const needsTypeGuard =
    !hasTypeConstraint(schema, 'number') && !hasTypeConstraint(schema, 'integer');

  const genChecks = () => {
    if (schema.minimum !== undefined) {
      if (schema.exclusiveMinimum === true) {
        code.if(_`${data} <= ${schema.minimum}`, () => {
          ctx.genError('minimum', `must be > ${schema.minimum}`, {
            comparison: '>',
            limit: schema.minimum,
          });
        });
      } else {
        code.if(_`${data} < ${schema.minimum}`, () => {
          ctx.genError('minimum', `must be >= ${schema.minimum}`, {
            comparison: '>=',
            limit: schema.minimum,
          });
        });
      }
    }

    if (schema.maximum !== undefined) {
      if (schema.exclusiveMaximum === true) {
        code.if(_`${data} >= ${schema.maximum}`, () => {
          ctx.genError('maximum', `must be < ${schema.maximum}`, {
            comparison: '<',
            limit: schema.maximum,
          });
        });
      } else {
        code.if(_`${data} > ${schema.maximum}`, () => {
          ctx.genError('maximum', `must be <= ${schema.maximum}`, {
            comparison: '<=',
            limit: schema.maximum,
          });
        });
      }
    }

    if (typeof schema.exclusiveMinimum === 'number') {
      code.if(_`${data} <= ${schema.exclusiveMinimum}`, () => {
        ctx.genError('exclusiveMinimum', `must be > ${schema.exclusiveMinimum}`, {
          comparison: '>',
          limit: schema.exclusiveMinimum,
        });
      });
    }

    if (typeof schema.exclusiveMaximum === 'number') {
      code.if(_`${data} >= ${schema.exclusiveMaximum}`, () => {
        ctx.genError('exclusiveMaximum', `must be < ${schema.exclusiveMaximum}`, {
          comparison: '<',
          limit: schema.exclusiveMaximum,
        });
      });
    }

    if (schema.multipleOf !== undefined) {
      const multipleOf = schema.multipleOf;
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        code.if(_`${data} % ${multipleOf} !== 0`, () => {
          ctx.genError('multipleOf', `must be multiple of ${schema.multipleOf}`, {
            multipleOf: schema.multipleOf,
          });
        });
      } else if (Number.isInteger(1 / multipleOf)) {
        const divVar = code.genVar('div');
        code.line(_`const ${divVar} = ${data} / ${multipleOf};`);
        code.if(_`!Number.isFinite(${divVar})`, () => {
          code.if(_`${data} % ${multipleOf} !== 0`, () => {
            ctx.genError('multipleOf', `must be multiple of ${schema.multipleOf}`, {
              multipleOf: schema.multipleOf,
            });
          });
        });
        code.else(() => {
          code.if(_`!Number.isInteger(${divVar})`, () => {
            ctx.genError('multipleOf', `must be multiple of ${schema.multipleOf}`, {
              multipleOf: schema.multipleOf,
            });
          });
        });
      } else {
        code.if(_`!Number.isInteger(${data} / ${multipleOf})`, () => {
          ctx.genError('multipleOf', `must be multiple of ${schema.multipleOf}`, {
            multipleOf: schema.multipleOf,
          });
        });
      }
    }
  };

  if (needsTypeGuard) {
    code.if(_`typeof ${data} === 'number'`, genChecks);
  } else {
    genChecks();
  }
}
