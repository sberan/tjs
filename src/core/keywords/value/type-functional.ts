/**
 * Functional type validation - returns CodeBlock instead of mutating
 */

import { code, CodeBlock } from '../../codeblock.js';
import { Code, Name, _, or } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { VOCABULARIES } from '../../context.js';
import { getTypeCheck, getOptimizedUnionTypeCheck } from '../shared/utils.js';

/**
 * Fail unless the check passes.
 *
 * This is THE primitive for validation:
 *   fail.unless(check, ctx, keyword, message, params)
 *
 * The check is the PASSING condition - we negate it internally.
 * This avoids operator precedence bugs with manual negation.
 */
const fail = {
  unless(
    check: Code,
    ctx: CompileContext,
    keyword: string,
    message: string,
    params: Record<string, unknown>
  ): CodeBlock {
    const pathExpr = ctx.path;
    const schemaPath = `#/${keyword}`;
    const mainFunc = ctx.getMainFuncName();

    // TODO: In full implementation, this would:
    // 1. Handle subschema mode (validVar = false; break label;)
    // 2. Use pre-allocated error objects via addRuntimeFunction

    return code`
      if (!(${check})) {
        ${mainFunc}.errors = [{
          instancePath: ${pathExpr},
          schemaPath: ${Code.raw(JSON.stringify(schemaPath))},
          keyword: ${keyword},
          params: ${Code.raw(JSON.stringify(params))},
          message: ${message}
        }];
        return false;
      }
    `;
  }
};
export default function generateTypeCheck(ctx: CompileContext): CodeBlock {
  const { schema, data } = ctx;

  if (!schema.type) return CodeBlock.empty();
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return CodeBlock.empty();

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];

  // Single type
  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(data, type);
    return fail.unless(check, ctx, 'type', `must be ${type}`, { type });
  }

  // Multiple types - optimize if all are typeof-checkable
  const canOptimizeWithTypeof = types.every(
    (t) => t === 'string' || t === 'number' || t === 'boolean'
  );

  if (canOptimizeWithTypeof) {
    const typeofVar = new Name('t0');
    const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);

    return code`
      const ${typeofVar} = typeof ${data};
      ${fail.unless(or(...checks), ctx, 'type', `must be ${types.join(' or ')}`, { type: types.join(',') })}
    `;
  }

  // Try optimized union check
  const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
  if (optimizedCheck) {
    return fail.unless(optimizedCheck, ctx, 'type', `must be ${types.join(' or ')}`, { type: types.join(',') });
  }

  // Fallback: OR together individual type checks
  const checks = types.map((t) => getTypeCheck(data, t));
  return fail.unless(or(...checks), ctx, 'type', `must be ${types.join(' or ')}`, { type: types.join(',') });
}
