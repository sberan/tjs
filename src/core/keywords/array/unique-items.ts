import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint, getItemTypes } from '../shared/utils.js';

/**
 * Keyword handler for uniqueItems validation.
 */
export default function generateUniqueItemsCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.uniqueItems !== true) return;

  const genCheck = () => {
    const itemTypes = getItemTypes(schema);
    const canOptimize =
      itemTypes.length > 0 && !itemTypes.some((t) => t === 'object' || t === 'array');

    const iVar = code.genVar('i');

    if (canOptimize) {
      const seenVar = code.genVar('seen');
      const lenVar = code.genVar('len');
      const itemVar = code.genVar('item');
      code.line(_`const ${seenVar} = new Set();`);
      code.block(
        _`for (let ${iVar} = 0, ${lenVar} = ${data}.length; ${iVar} < ${lenVar}; ${iVar}++)`,
        () => {
          code.line(_`const ${itemVar} = ${data}[${iVar}];`);
          code.if(_`${seenVar}.has(${itemVar})`, () => {
            ctx.genError('uniqueItems', 'must NOT have duplicate items', {});
          });
          code.line(_`${seenVar}.add(${itemVar});`);
        }
      );
    } else {
      const jVar = code.genVar('j');
      code.block(_`outer: for (let ${iVar} = ${data}.length; ${iVar}--;)`, () => {
        code.block(_`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
          code.if(_`deepEqual(${data}[${iVar}], ${data}[${jVar}])`, () => {
            ctx.genError('uniqueItems', 'must NOT have duplicate items', {});
          });
        });
      });
    }
  };

  if (hasTypeConstraint(schema, 'array')) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}
