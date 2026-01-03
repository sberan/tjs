/**
 * String keyword handlers (minLength, maxLength, pattern)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.3
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError, determineRegexFlags } from './utils.js';

/**
 * Generate string validation checks (minLength, maxLength, pattern)
 */
export function generateStringChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const hasStringChecks =
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined;

  if (!hasStringChecks) return;

  // Optimization: If schema.type === 'string', we know data is already a string
  // (the type check would have failed and returned if it wasn't)
  // So we can skip the typeof check wrapper
  const needsTypeCheck = schema.type !== 'string';

  const generateChecks = () => {
    // Use ucs2length for proper Unicode code point counting (handles surrogate pairs)
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ucs2length(${dataVar});`);

      if (schema.minLength !== undefined) {
        code.if(_`${lenVar} < ${schema.minLength}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minLength',
            'minLength',
            `must NOT have fewer than ${schema.minLength} characters`,
            { limit: schema.minLength },
            ctx
          );
        });
      }

      if (schema.maxLength !== undefined) {
        code.if(_`${lenVar} > ${schema.maxLength}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maxLength',
            'maxLength',
            `must NOT have more than ${schema.maxLength} characters`,
            { limit: schema.maxLength },
            ctx
          );
        });
      }
    }

    if (schema.pattern !== undefined) {
      // Pre-compile regex as a runtime function for consistent performance
      // Optimize: Only use 'u' flag when necessary for better performance
      // The 'u' flag is required for:
      // 1. Unicode property escapes (\p{...}, \P{...})
      // 2. Unicode code point escapes (\u{...})
      // 3. Characters outside BMP (code points > 0xFFFF, i.e., surrogate pairs)
      const flags = determineRegexFlags(schema.pattern);

      const regexName = new Name(ctx.genRuntimeName('pattern'));
      ctx.addRuntimeFunction(regexName.str, new RegExp(schema.pattern, flags));

      code.if(_`!${regexName}.test(${dataVar})`, () => {
        genError(
          code,
          pathExprCode,
          '#/pattern',
          'pattern',
          `must match pattern "${schema.pattern}"`,
          { pattern: schema.pattern },
          ctx
        );
      });
    }
  };

  // Only wrap in typeof check if we don't already have a string type constraint
  if (needsTypeCheck) {
    code.if(_`typeof ${dataVar} === 'string'`, generateChecks);
  } else {
    generateChecks();
  }
}
