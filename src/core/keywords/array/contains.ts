import type { JsonSchema } from '../../../types.js';
import { Code, _, indexAccess } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { getSimpleType } from '../shared/utils.js';
import { generateSubschemaCheck } from '../shared/helpers.js';

/**
 * Keyword handler for contains/minContains/maxContains validation.
 */
export default function generateContainsCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.contains === undefined) return;
  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  const itemsTracker = ctx.tracker.items;
  const needsItemsTracking = itemsTracker.active;

  if (containsSchema === true) {
    if (needsItemsTracking) {
      itemsTracker.markAllItemsEvaluated();
    }
    code.if(_`Array.isArray(${data})`, () => {
      code.if(_`${data}.length < ${minContains}`, () => {
        ctx.genError('contains', `must contain at least ${minContains} valid item(s)`, {
          minContains,
        });
      });
      if (maxContains !== undefined) {
        code.if(_`${data}.length > ${maxContains}`, () => {
          ctx.genError('contains', `must contain at most ${maxContains} valid item(s)`, {
            maxContains,
          });
        });
      }
    });
    return;
  }

  if (containsSchema === false) {
    code.if(_`Array.isArray(${data})`, () => {
      if (minContains > 0) {
        ctx.genError('contains', `must contain at least ${minContains} valid item(s)`, {
          minContains,
        });
      }
    });
    return;
  }

  if (minContains === 0 && maxContains === undefined && !needsItemsTracking) {
    return;
  }

  if (needsItemsTracking) {
    itemsTracker.getDynamicVar();
  }

  code.if(_`Array.isArray(${data})`, () => {
    const countVar = code.genVar('containsCount');
    code.line(_`let ${countVar} = 0;`);

    const iVar = code.genVar('i');
    const canEarlyExit = !needsItemsTracking;
    const simpleType = getSimpleType(containsSchema);

    if (simpleType) {
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ${data}.length;`);

      code.for(_`let ${iVar} = 0`, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
        const itemAccess = indexAccess(data, iVar);
        let inlineCheck: Code;
        switch (simpleType) {
          case 'string':
            inlineCheck = _`typeof ${itemAccess} === 'string'`;
            break;
          case 'number':
            inlineCheck = _`typeof ${itemAccess} === 'number'`;
            break;
          case 'integer':
            inlineCheck = _`Number.isInteger(${itemAccess})`;
            break;
          case 'boolean':
            inlineCheck = _`typeof ${itemAccess} === 'boolean'`;
            break;
          case 'null':
            inlineCheck = _`${itemAccess} === null`;
            break;
          case 'array':
            inlineCheck = _`Array.isArray(${itemAccess})`;
            break;
          case 'object':
            inlineCheck = _`${itemAccess} && typeof ${itemAccess} === 'object' && !Array.isArray(${itemAccess})`;
            break;
          default:
            inlineCheck = _`false`;
        }

        code.if(inlineCheck, () => {
          code.line(_`${countVar}++;`);
          if (needsItemsTracking) {
            itemsTracker.markItemEvaluated(iVar);
          }
        });

        if (canEarlyExit) {
          if (maxContains === undefined) {
            code.if(_`${countVar} >= ${minContains}`, () => {
              code.line(_`break;`);
            });
          } else {
            code.if(_`${countVar} > ${maxContains}`, () => {
              code.line(_`break;`);
            });
          }
        }
      });
    } else {
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ${data}.length;`);

      code.for(_`let ${iVar} = 0`, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
        const itemAccess = indexAccess(data, iVar);

        const itemVar = code.genVar('item');
        code.line(_`const ${itemVar} = ${itemAccess};`);

        const checkExpr = generateSubschemaCheck(
          code,
          containsSchema as JsonSchema,
          itemVar,
          ctx,
          ctx.getDynamicScopeVar()
        );

        code.if(checkExpr, () => {
          code.line(_`${countVar}++;`);
          if (needsItemsTracking) {
            itemsTracker.markItemEvaluated(iVar);
          }
        });

        if (canEarlyExit) {
          if (maxContains === undefined) {
            code.if(_`${countVar} >= ${minContains}`, () => {
              code.line(_`break;`);
            });
          } else {
            code.if(_`${countVar} > ${maxContains}`, () => {
              code.line(_`break;`);
            });
          }
        }
      });
    }

    code.if(_`${countVar} < ${minContains}`, () => {
      ctx.genError('contains', `must contain at least ${minContains} valid item(s)`, {
        minContains,
      });
    });

    if (maxContains !== undefined) {
      code.if(_`${countVar} > ${maxContains}`, () => {
        ctx.genError('contains', `must contain at most ${maxContains} valid item(s)`, {
          maxContains,
        });
      });
    }
  });
}
