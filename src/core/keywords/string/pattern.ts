import type { JsonSchemaBase } from '../../../types.js';
import { Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { determineRegexFlags, generateOptimizedPatternCheck } from './regex-flags.js';

/**
 * Helper function for pattern validation.
 * Called by string-checks.ts within the string type check.
 */
export function generatePatternCheck(schema: JsonSchemaBase, ctx: CompileContext): void {
  if (schema.pattern === undefined) return;

  const { code, data } = ctx;

  // Try to use optimized string methods (startsWith, endsWith, etc.)
  const optimizedCheck = generateOptimizedPatternCheck(schema.pattern, data);

  if (optimizedCheck) {
    // Use optimized string method - wrap in parens to ensure correct precedence with !
    code.if(_`!(${optimizedCheck})`, () => {
      ctx.genError('pattern', `must match pattern "${schema.pattern}"`, {
        pattern: schema.pattern,
      });
    });
  } else {
    // Fall back to regex
    const flags = determineRegexFlags(schema.pattern);
    const regexName = new Name(ctx.genRuntimeName('pattern'));
    ctx.addRuntimeFunction(regexName.str, new RegExp(schema.pattern, flags));

    code.if(_`!${regexName}.test(${data})`, () => {
      ctx.genError('pattern', `must match pattern "${schema.pattern}"`, {
        pattern: schema.pattern,
      });
    });
  }
}
