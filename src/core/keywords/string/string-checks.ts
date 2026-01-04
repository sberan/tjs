import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { generateMinLengthCheck } from './min-length.js';
import { generateMaxLengthCheck } from './max-length.js';
import { generatePatternCheck } from './pattern.js';

/**
 * Keyword handler for string validation keywords: minLength, maxLength, pattern.
 * Bundles these checks together for optimization (shared type check, shared length var).
 */
export default function generateStringChecks(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  const hasStringChecks =
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined;

  if (!hasStringChecks) return;

  const needsTypeCheck = schema.type !== 'string';

  const generateChecks = () => {
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ucs2length(${data});`);

      generateMinLengthCheck(schema, ctx, lenVar);
      generateMaxLengthCheck(schema, ctx, lenVar);
    }

    generatePatternCheck(schema, ctx);
  };

  if (needsTypeCheck) {
    code.if(_`typeof ${data} === 'string'`, generateChecks);
  } else {
    generateChecks();
  }
}
