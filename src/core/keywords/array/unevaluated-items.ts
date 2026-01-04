import { Code, _, pathExprIndex, indexAccess } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint } from '../shared/utils.js';

/**
 * Keyword handler for unevaluatedItems validation.
 */
export default function generateUnevaluatedItemsCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (schema.unevaluatedItems === undefined) return;
  const itemsTracker = ctx.tracker.items;

  if (itemsTracker.allItemsEvaluated) return;

  const unevalSchema = schema.unevaluatedItems;

  if (unevalSchema === true && itemsTracker.active) {
    itemsTracker.getDynamicVar();
  }

  const genCheck = () => {
    const iVar = code.genVar('i');
    const lenVar = code.genVar('len');

    const staticItemCount = itemsTracker.getStaticItemCount();
    const needsDynamic = itemsTracker.needsDynamic;
    const dynamicVar = needsDynamic ? itemsTracker.getDynamicVar() : undefined;

    const allEvalVar = needsDynamic ? code.genVar('allEval') : undefined;
    if (allEvalVar && dynamicVar) {
      code.line(_`const ${allEvalVar} = ${dynamicVar}.allItemsEvaluated;`);
    }

    code.line(_`const ${lenVar} = ${data}.length;`);

    const startIdx = staticItemCount > 0 ? staticItemCount : 0;
    const loopInit = startIdx > 0 ? _`let ${iVar} = ${startIdx}` : _`let ${iVar} = 0`;

    code.for(loopInit, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
      const itemPathExpr = pathExprIndex(path, iVar);

      let isUnevaluatedExpr: Code | null = null;

      if (needsDynamic && allEvalVar && dynamicVar) {
        isUnevaluatedExpr = _`!${allEvalVar} && !${dynamicVar}.has(${iVar})`;
      } else if (needsDynamic && dynamicVar) {
        isUnevaluatedExpr = _`!${dynamicVar}.allItemsEvaluated && !${dynamicVar}.has(${iVar})`;
      }

      const genBody = () => {
        if (unevalSchema === false) {
          ctx.withPath(itemPathExpr, () => {
            ctx.genError('unevaluatedItems', 'must NOT have unevaluated items', {});
          });
        } else if (unevalSchema === true) {
          itemsTracker.markItemEvaluated(iVar);
        } else {
          const itemAccess = indexAccess(data, iVar);
          const itemVar = code.genVar('unevalItem');
          code.line(_`const ${itemVar} = ${itemAccess};`);
          ctx.validateSubschema(unevalSchema, itemVar, itemPathExpr);
        }
      };

      if (isUnevaluatedExpr) {
        code.if(isUnevaluatedExpr, genBody);
      } else {
        genBody();
      }
    });
  };

  if (hasTypeConstraint(schema, 'array')) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}
