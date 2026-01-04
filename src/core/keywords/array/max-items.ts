import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint } from '../shared/utils.js';

/**
 * Keyword handler for maxItems validation.
 */
export default function generateMaxItemsCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.maxItems === undefined) return;

  const genCheck = () => {
    code.if(_`${data}.length > ${schema.maxItems}`, () => {
      ctx.genError('maxItems', `must NOT have more than ${schema.maxItems} items`, {
        limit: schema.maxItems,
      });
    });
  };

  if (hasTypeConstraint(schema, 'array')) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}
