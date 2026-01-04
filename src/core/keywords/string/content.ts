import { Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';

/**
 * Keyword handler for content validation keywords: contentMediaType, contentEncoding.
 */
export default function generateContentChecks(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  const hasContentChecks =
    schema.contentMediaType !== undefined || schema.contentEncoding !== undefined;

  if (!hasContentChecks) return;

  if (!ctx.options.contentAssertion) {
    return;
  }

  code.if(_`typeof ${data} === 'string'`, () => {
    if (schema.contentEncoding !== undefined) {
      if (schema.contentEncoding === 'base64') {
        const regexName = new Name(ctx.genRuntimeName('base64Re'));
        ctx.addRuntimeFunction(regexName.str, /^[A-Za-z0-9+/]*={0,2}$/);
        code.if(_`!${regexName}.test(${data}) || ${data}.length % 4 !== 0`, () => {
          ctx.genError('contentEncoding', 'must be base64 encoded', {});
        });
      }
    }

    if (schema.contentMediaType !== undefined) {
      if (schema.contentMediaType === 'application/json') {
        if (schema.contentEncoding === 'base64') {
          const decodedVar = code.genVar('decoded');
          code.try(
            () => {
              code.line(_`const ${decodedVar} = atob(${data});`);
              code.line(_`JSON.parse(${decodedVar});`);
            },
            () => {
              ctx.genError('contentMediaType', 'must be application/json', {});
            }
          );
        } else {
          code.try(
            () => {
              code.line(_`JSON.parse(${data});`);
            },
            () => {
              ctx.genError('contentMediaType', 'must be application/json', {});
            }
          );
        }
      }
    }
  });
}
