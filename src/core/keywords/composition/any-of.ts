import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { isNoOpSchema } from '../shared/utils.js';
import { generateSubschemaCheck } from '../shared/helpers.js';

/**
 * Keyword handler for anyOf validation.
 */
export default function generateAnyOfCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (!schema.anyOf || schema.anyOf.length === 0) return;

  const hasNoOpBranch = schema.anyOf.some((s) => isNoOpSchema(s));
  const propsTracker = ctx.tracker.props;
  const itemsTracker = ctx.tracker.items;
  const tracker = ctx.tracker;

  const needsTracking =
    (propsTracker.active || itemsTracker.active) &&
    schema.anyOf.some((s) => !isNoOpSchema(s) && typeof s === 'object' && s !== null);

  if (hasNoOpBranch && !needsTracking) {
    propsTracker.enableDynamic();
  } else if (hasNoOpBranch && needsTracking) {
    propsTracker.enableDynamic();
    itemsTracker.enableDynamic();

    tracker.ensureDynamicVars();

    schema.anyOf.forEach((subSchema) => {
      if (isNoOpSchema(subSchema)) return;

      const branch = tracker.enterBranch(subSchema);
      const checkExpr = generateSubschemaCheck(
        code,
        subSchema,
        data,
        ctx,
        ctx.getDynamicScopeVar()
      );
      tracker.exitBranch(branch);

      const matchedVar = code.genVar('matched');
      code.line(_`const ${matchedVar} = ${checkExpr};`);
      tracker.mergeBranch(branch, matchedVar);
    });
  } else {
    const resultVar = code.genVar('anyOfResult');
    code.line(_`let ${resultVar} = false;`);

    tracker.ensureDynamicVars();

    schema.anyOf.forEach((subSchema, index) => {
      const generateBranchCheck = () => {
        const branch = tracker.enterBranch(subSchema);
        const checkExpr = generateSubschemaCheck(
          code,
          subSchema,
          data,
          ctx,
          ctx.getDynamicScopeVar()
        );
        tracker.exitBranch(branch);

        const matchedVar = code.genVar('matched');
        code.line(_`const ${matchedVar} = ${checkExpr};`);
        code.if(matchedVar, () => {
          code.line(_`${resultVar} = true;`);
        });
        tracker.mergeBranch(branch, matchedVar);
      };

      if (index > 0 && !tracker.active) {
        code.if(_`!${resultVar}`, generateBranchCheck);
      } else {
        generateBranchCheck();
      }
    });

    code.if(_`!${resultVar}`, () => {
      ctx.genError('anyOf', 'must match a schema in anyOf', {});
    });
  }
}
