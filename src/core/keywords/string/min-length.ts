import type { JsonSchemaBase } from '../../../types.js';
import { Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';

/**
 * Helper function for minLength validation.
 * Called by string-checks.ts with a pre-computed length variable.
 */
export function generateMinLengthCheck(
  schema: JsonSchemaBase,
  ctx: CompileContext,
  lenVar: Name
): void {
  if (schema.minLength === undefined) return;

  const { code } = ctx;

  code.if(_`${lenVar} < ${schema.minLength}`, () => {
    ctx.genError('minLength', `must NOT have fewer than ${schema.minLength} characters`, {
      limit: schema.minLength,
    });
  });
}
