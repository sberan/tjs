import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { generateSubschemaCheck } from '../shared/helpers.js';

/**
 * Keyword handler for oneOf validation.
 */
export default function generateOneOfCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (!schema.oneOf || schema.oneOf.length === 0) return;
  const oneOfTracker = ctx.tracker;
  const countVar = code.genVar('oneOfCount');
  code.line(_`let ${countVar} = 0;`);

  oneOfTracker.ensureDynamicVars();

  schema.oneOf.forEach((subSchema) => {
    const branch = oneOfTracker.enterBranch(subSchema);
    const checkExpr = generateSubschemaCheck(code, subSchema, data, ctx, ctx.getDynamicScopeVar());
    oneOfTracker.exitBranch(branch);

    const matchedVar = code.genVar('oneOfMatched');
    code.line(_`const ${matchedVar} = ${checkExpr};`);

    code.if(matchedVar, () => {
      code.line(_`${countVar}++;`);
      code.if(_`${countVar} > 1`, () => {
        ctx.genError('oneOf', 'must match exactly one schema in oneOf', {});
      });
    });

    oneOfTracker.mergeBranch(branch, matchedVar);
  });

  code.if(_`${countVar} !== 1`, () => {
    ctx.genError('oneOf', 'must match exactly one schema in oneOf', {});
  });
}
