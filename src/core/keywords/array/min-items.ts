import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint } from '../shared/utils.js';

/**
 * Keyword handler for minItems validation.
 */
export default function generateMinItemsCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.minItems === undefined) return;

  const genCheck = () => {
    code.if(_`${data}.length < ${schema.minItems}`, () => {
      ctx.genError('minItems', `must NOT have fewer than ${schema.minItems} items`, {
        limit: schema.minItems,
      });
    });
  };

  if (hasTypeConstraint(schema, 'array')) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}
