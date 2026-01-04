import type { JsonSchemaBase } from '../../../types.js';
import { Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { determineRegexFlags } from './regex-flags.js';

/**
 * Helper function for pattern validation.
 * Called by string-checks.ts within the string type check.
 */
export function generatePatternCheck(schema: JsonSchemaBase, ctx: CompileContext): void {
  if (schema.pattern === undefined) return;

  const { code, data } = ctx;
  const flags = determineRegexFlags(schema.pattern);

  const regexName = new Name(ctx.genRuntimeName('pattern'));
  ctx.addRuntimeFunction(regexName.str, new RegExp(schema.pattern, flags));

  code.if(_`!${regexName}.test(${data})`, () => {
    ctx.genError('pattern', `must match pattern "${schema.pattern}"`, {
      pattern: schema.pattern,
    });
  });
}
