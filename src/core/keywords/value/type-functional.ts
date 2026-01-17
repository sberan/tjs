/**
 * Functional type validation - returns CodeBlock instead of mutating
 */

import { code, CodeBlock, compose, ifBlock } from '../../codeblock.js';
import { Code, Name, _, or, not } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { VOCABULARIES } from '../../context.js';
import { getTypeCheck, getOptimizedUnionTypeCheck } from '../shared/utils.js';

/**
 * Generate error code block
 */
function genErrorBlock(
  ctx: CompileContext,
  keyword: string,
  message: string,
  params: Record<string, unknown>
): CodeBlock {
  const pathExprCode = ctx.path;
  const schemaPath = `#/${keyword}`;
  const mainFuncName = ctx.getMainFuncName();

  // For now, inline the error - simplified version
  const paramsStr = JSON.stringify(params);

  return code`
    ${mainFuncName}.errors = [{
      instancePath: ${pathExprCode},
      schemaPath: ${Code.raw(JSON.stringify(schemaPath))},
      keyword: ${keyword},
      params: ${Code.raw(paramsStr)},
      message: ${message}
    }];
    return false;
  `;
}

/**
 * Generate type check code - functional style
 * Returns a CodeBlock instead of mutating
 */
export default function generateTypeCheck(ctx: CompileContext): CodeBlock {
  const { schema, data } = ctx;

  if (!schema.type) return CodeBlock.empty();
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return CodeBlock.empty();

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];

  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(data, type);
    const errorBlock = genErrorBlock(ctx, 'type', `must be ${type}`, { type });

    return ifBlock(not(check), errorBlock);
  }

  // Multiple types
  const canOptimizeWithTypeof = types.every(
    (t) => t === 'string' || t === 'number' || t === 'boolean'
  );

  if (canOptimizeWithTypeof) {
    const typeofVar = new Name('t0'); // TODO: need genVar equivalent
    const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);
    const errorBlock = genErrorBlock(ctx, 'type', `must be ${types.join(' or ')}`, {
      type: types.join(','),
    });

    return code`
      const ${typeofVar} = typeof ${data};
      ${ifBlock(not(or(...checks)), errorBlock)}
    `;
  }

  const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
  if (optimizedCheck) {
    const errorBlock = genErrorBlock(ctx, 'type', `must be ${types.join(' or ')}`, {
      type: types.join(','),
    });
    return ifBlock(not(optimizedCheck), errorBlock);
  }

  // Fallback: check each type
  const checks = types.map((t) => getTypeCheck(data, t));
  const errorBlock = genErrorBlock(ctx, 'type', `must be ${types.join(' or ')}`, {
    type: types.join(','),
  });
  return ifBlock(not(or(...checks)), errorBlock);
}
