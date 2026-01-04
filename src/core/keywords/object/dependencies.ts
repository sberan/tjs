import type { JsonSchema } from '../../../types.js';
import { _, pathExpr } from '../../codegen.js';
import type { CompileContext } from '../../context.js';

/**
 * Keyword handler for dependencies validation (draft-07 and earlier).
 */
export default function generateDependenciesCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (!schema.dependencies) return;

  let hasNonTrivial = false;
  for (const prop in schema.dependencies) {
    const dep = schema.dependencies[prop];
    if (
      Array.isArray(dep)
        ? dep.length > 0
        : dep !== true &&
          !(typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0)
    ) {
      hasNonTrivial = true;
      break;
    }
  }

  if (!hasNonTrivial) return;

  code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
    for (const prop in schema.dependencies) {
      const dep = schema.dependencies[prop];

      if (Array.isArray(dep)) {
        if (dep.length === 0) continue;
      } else if (
        dep === true ||
        (typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0)
      ) {
        continue;
      }
      code.if(_`${prop} in ${data}`, () => {
        if (Array.isArray(dep)) {
          for (const reqProp of dep) {
            const reqPathExpr = pathExpr(path, reqProp);
            code.if(_`!(${reqProp} in ${data})`, () => {
              ctx.withPath(reqPathExpr, () => {
                ctx.genError(
                  'dependencies',
                  `must have property '${reqProp}' when property '${prop}' is present`,
                  { missingProperty: reqProp }
                );
              });
            });
          }
        } else {
          ctx.validateSubschema(dep as JsonSchema, data, path);
        }
      });
    }
  });
}
