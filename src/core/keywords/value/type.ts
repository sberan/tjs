import { Code, _, or, not } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { VOCABULARIES } from '../../context.js';
import { getTypeCheck, getOptimizedUnionTypeCheck } from '../shared/utils.js';

export default function generateTypeCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (!schema.type) return;
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];

  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(data, type);
    code.if(not(check), () => {
      ctx.genError('type', `must be ${type}`, { type });
    });
  } else {
    const canOptimizeWithTypeof = types.every(
      (t) => t === 'string' || t === 'number' || t === 'boolean'
    );

    if (canOptimizeWithTypeof) {
      const typeofVar = code.genVar('t');
      code.line(_`const ${typeofVar} = typeof ${data};`);
      const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);
      code.if(not(or(...checks)), () => {
        ctx.genError('type', `must be ${types.join(' or ')}`, { type: types.join(',') });
      });
    } else {
      const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
      if (optimizedCheck) {
        code.if(not(optimizedCheck), () => {
          ctx.genError('type', `must be ${types.join(' or ')}`, { type: types.join(',') });
        });
      } else {
        const checks = types.map((t) => getTypeCheck(data, t));
        code.if(not(or(...checks)), () => {
          ctx.genError('type', `must be ${types.join(' or ')}`, { type: types.join(',') });
        });
      }
    }
  }
}
