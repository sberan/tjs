import type { JsonSchemaBase } from '../../../types.js';
import { Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';

/**
 * Helper function for maxLength validation.
 * Called by string-checks.ts with a pre-computed length variable.
 */
export function generateMaxLengthCheck(
  schema: JsonSchemaBase,
  ctx: CompileContext,
  lenVar: Name
): void {
  if (schema.maxLength === undefined) return;

  const { code } = ctx;

  code.if(_`${lenVar} > ${schema.maxLength}`, () => {
    ctx.genError('maxLength', `must NOT have more than ${schema.maxLength} characters`, {
      limit: schema.maxLength,
    });
  });
}
