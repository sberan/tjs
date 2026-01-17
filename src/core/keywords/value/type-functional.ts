/**
 * Functional type validation - returns CodeBlock instead of mutating
 *
 * CURRENT (imperative):
 *   code.if(not(check), () => {
 *     ctx.genError('type', ...);
 *   });
 *
 * FUNCTIONAL:
 *   return code`
 *     if (!(${check})) {
 *       ${genError(...)}
 *     }
 *   `;
 */

import { code, CodeBlock } from '../../codeblock.js';
import { Code, Name, _, or, not } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { VOCABULARIES } from '../../context.js';
import { getTypeCheck, getOptimizedUnionTypeCheck } from '../shared/utils.js';

/**
 * Generate error code block.
 *
 * This is the functional equivalent of ctx.genError().
 * Returns a CodeBlock instead of mutating the code builder.
 */
function genError(
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
  // For now, inline the error structure

  return code`
    ${mainFunc}.errors = [{
      instancePath: ${pathExpr},
      schemaPath: ${Code.raw(JSON.stringify(schemaPath))},
      keyword: ${keyword},
      params: ${Code.raw(JSON.stringify(params))},
      message: ${message}
    }];
    return false;
  `;
}

/**
 * Generate type check code - functional style.
 *
 * Compare to the imperative version:
 *
 * IMPERATIVE:
 *   const { schema, code, data } = ctx;
 *   code.if(not(check), () => {
 *     ctx.genError('type', `must be ${type}`, { type });
 *   });
 *
 * FUNCTIONAL:
 *   const { schema, data } = ctx;  // no 'code' from context!
 *   return code`
 *     if (!(${check})) {
 *       ${genError(ctx, 'type', `must be ${type}`, { type })}
 *     }
 *   `;
 */
export default function generateTypeCheck(ctx: CompileContext): CodeBlock {
  const { schema, data } = ctx;

  // Early returns for no-op cases
  if (!schema.type) return CodeBlock.empty();
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return CodeBlock.empty();

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];

  // === Single type ===
  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(data, type);

    return code`
      if (${not(check)}) {
        ${genError(ctx, 'type', `must be ${type}`, { type })}
      }
    `;
  }

  // === Multiple types ===

  // Optimization: if all types are typeof-checkable, cache typeof once
  const canOptimizeWithTypeof = types.every(
    (t) => t === 'string' || t === 'number' || t === 'boolean'
  );

  if (canOptimizeWithTypeof) {
    // TODO: genVar equivalent - for now hardcode
    const typeofVar = new Name('t0');
    const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);

    return code`
      const ${typeofVar} = typeof ${data};
      if (${not(or(...checks))}) {
        ${genError(ctx, 'type', `must be ${types.join(' or ')}`, { type: types.join(',') })}
      }
    `;
  }

  // Try optimized union check (e.g., string|null -> data == null || typeof data === 'string')
  const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
  if (optimizedCheck) {
    return code`
      if (${not(optimizedCheck)}) {
        ${genError(ctx, 'type', `must be ${types.join(' or ')}`, { type: types.join(',') })}
      }
    `;
  }

  // Fallback: OR together individual type checks
  const checks = types.map((t) => getTypeCheck(data, t));

  return code`
    if (${not(or(...checks))}) {
      ${genError(ctx, 'type', `must be ${types.join(' or ')}`, { type: types.join(',') })}
    }
  `;
}
