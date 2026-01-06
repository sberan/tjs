import { _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { generatePatternCheck } from './pattern.js';

/**
 * Keyword handler for string validation keywords: minLength, maxLength, pattern.
 * Bundles these checks together for optimization (shared type check, shared length var).
 *
 * ASCII Fast Path Optimization:
 * Since Unicode length (code points) <= ASCII length (UTF-16 code units):
 * - maxLength: If data.length <= max, Unicode length is also <=, skip expensive calc
 * - minLength: If data.length < min, fail fast (Unicode length is even smaller)
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
    const hasMin = schema.minLength !== undefined;
    const hasMax = schema.maxLength !== undefined;

    if (hasMin || hasMax) {
      // Use ASCII fast path optimization like schemasafe
      // ASCII length >= Unicode length, so we can fast-exit in some cases

      if (hasMax && !hasMin) {
        // Only maxLength: If ASCII length <= max, pass. Otherwise check Unicode.
        code.if(_`${data}.length > ${schema.maxLength}`, () => {
          // ASCII length exceeds max, check Unicode length
          const lenVar = code.genVar('len');
          code.line(_`const ${lenVar} = ucs2length(${data});`);
          code.if(_`${lenVar} > ${schema.maxLength}`, () => {
            ctx.genError('maxLength', `must NOT have more than ${schema.maxLength} characters`, {
              limit: schema.maxLength,
            });
          });
        });
      } else if (hasMin && !hasMax) {
        // Only minLength: If ASCII length < min, check Unicode (might still pass).
        // If Unicode length < min, fail.
        code.if(
          _`${data}.length < ${schema.minLength} || ucs2length(${data}) < ${schema.minLength}`,
          () => {
            ctx.genError('minLength', `must NOT have fewer than ${schema.minLength} characters`, {
              limit: schema.minLength,
            });
          }
        );
      } else {
        // Both minLength and maxLength
        // Always need Unicode length for accurate minLength check
        const lenVar = code.genVar('len');
        code.line(_`const ${lenVar} = ucs2length(${data});`);

        code.if(_`${lenVar} < ${schema.minLength}`, () => {
          ctx.genError('minLength', `must NOT have fewer than ${schema.minLength} characters`, {
            limit: schema.minLength,
          });
        });
        code.if(_`${lenVar} > ${schema.maxLength}`, () => {
          ctx.genError('maxLength', `must NOT have more than ${schema.maxLength} characters`, {
            limit: schema.maxLength,
          });
        });
      }
    }

    generatePatternCheck(schema, ctx);
  };

  if (needsTypeCheck) {
    code.if(_`typeof ${data} === 'string'`, generateChecks);
  } else {
    generateChecks();
  }
}
