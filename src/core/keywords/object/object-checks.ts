import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint, genBatchedRequiredChecks } from '../shared/utils.js';

/**
 * Keyword handler for required, minProperties, maxProperties validation.
 */
export default function generateObjectChecks(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  const hasObjectChecks =
    (schema.required && schema.required.length > 0) ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined;

  if (!hasObjectChecks) return;

  const genChecks = () => {
    if (schema.required && schema.required.length > 0) {
      genBatchedRequiredChecks(code, data, schema.required, ctx);
    }

    if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
      code.line(_`const propCount = Object.keys(${data}).length;`);

      if (schema.minProperties !== undefined) {
        code.if(_`propCount < ${schema.minProperties}`, () => {
          ctx.genError(
            'minProperties',
            `must NOT have fewer than ${schema.minProperties} properties`,
            { limit: schema.minProperties }
          );
        });
      }

      if (schema.maxProperties !== undefined) {
        code.if(_`propCount > ${schema.maxProperties}`, () => {
          ctx.genError(
            'maxProperties',
            `must NOT have more than ${schema.maxProperties} properties`,
            { limit: schema.maxProperties }
          );
        });
      }
    }
  };

  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, genChecks);
  }
}
