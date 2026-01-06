import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { generateSubschemaCheck } from '../shared/helpers.js';

/**
 * Keyword handler for oneOf validation.
 */
export default function generateOneOfCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (!schema.oneOf || schema.oneOf.length === 0) return;

  // Optimize boolean schemas: count true/false upfront
  let trueCount = 0;
  const nonBooleanSchemas: (typeof schema.oneOf)[number][] = [];

  for (const subSchema of schema.oneOf) {
    if (subSchema === true) {
      trueCount++;
    } else if (subSchema !== false) {
      // Skip false schemas entirely (they never match)
      nonBooleanSchemas.push(subSchema);
    }
  }

  // Fast path: if we already have more than 1 true, always fails
  if (trueCount > 1) {
    ctx.genError('oneOf', 'must match exactly one schema in oneOf', {});
    return;
  }

  // Fast path: if exactly 1 true and no other schemas, always passes
  if (trueCount === 1 && nonBooleanSchemas.length === 0) {
    // Always valid - generate no validation code
    return;
  }

  const oneOfTracker = ctx.tracker;
  const countVar = code.genVar('oneOfCount');

  // Start count with the number of true schemas
  code.line(_`let ${countVar} = ${trueCount};`);

  oneOfTracker.ensureDynamicVars();

  // Only generate code for non-boolean schemas
  for (const subSchema of nonBooleanSchemas) {
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
  }

  code.if(_`${countVar} !== 1`, () => {
    ctx.genError('oneOf', 'must match exactly one schema in oneOf', {});
  });
}
