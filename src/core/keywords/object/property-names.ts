import { Name, _, pathExprDynamic } from '../../codegen.js';
import type { CompileContext } from '../../context.js';

/**
 * Keyword handler for propertyNames validation.
 */
export default function generatePropertyNamesCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (schema.propertyNames === undefined) return;

  const propNamesSchema = schema.propertyNames;

  if (propNamesSchema === true) {
    return;
  }

  if (propNamesSchema === false) {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
      code.if(_`Object.keys(${data}).length > 0`, () => {
        ctx.genError('propertyNames', 'property name must be valid', {});
      });
    });
    return;
  }

  code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
    const keyVar = new Name('key');
    code.forIn(keyVar, data, () => {
      const keyPathExpr = pathExprDynamic(path, keyVar);
      ctx.validateSubschema(propNamesSchema, keyVar, keyPathExpr);
    });
  });
}
