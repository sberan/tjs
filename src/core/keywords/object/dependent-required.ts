import { Code, _, pathExpr, pathExprDynamic, escapeString, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { supportsFeature } from '../../context.js';
import { hasTypeConstraint } from '../shared/utils.js';

/**
 * Keyword handler for dependentRequired validation.
 */
export default function generateDependentRequiredCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (!schema.dependentRequired) return;

  if (!supportsFeature(ctx.options.defaultMeta, 'unevaluated')) {
    return;
  }

  const deps = Object.entries(schema.dependentRequired).filter(([, reqs]) => reqs.length > 0);
  if (deps.length === 0) return;
  const needsObjectGuard = !hasTypeConstraint(schema, 'object');

  const genDependentChecks = () => {
    for (const [prop, requiredProps] of deps) {
      code.if(_`${stringify(prop)} in ${data}`, () => {
        if (requiredProps.length === 1) {
          const reqProp = requiredProps[0];
          const reqPathExpr = pathExpr(path, reqProp);
          code.if(_`!(${stringify(reqProp)} in ${data})`, () => {
            ctx.withPath(reqPathExpr, () => {
              ctx.genError(
                'dependentRequired',
                `must have property '${reqProp}' when property '${prop}' is present`,
                { missingProperty: reqProp }
              );
            });
          });
        } else {
          const missingVar = code.genVar('missing');
          code.line(_`let ${missingVar};`);

          const conditions: Code[] = [];
          for (const reqProp of requiredProps) {
            conditions.push(
              _`(!(${stringify(reqProp)} in ${data}) && (${missingVar} = ${stringify(reqProp)}))`
            );
          }

          let combinedCondition = conditions[0];
          for (let i = 1; i < conditions.length; i++) {
            combinedCondition = _`${combinedCondition} || ${conditions[i]}`;
          }

          code.if(combinedCondition, () => {
            const propPathExpr = pathExprDynamic(path, missingVar);
            const escapedProp = Code.raw(escapeString(prop));
            code.line(
              _`${ctx.getMainFuncName()}.errors = [{ instancePath: ${propPathExpr}, schemaPath: '#/dependentRequired', keyword: 'dependentRequired', params: { missingProperty: ${missingVar} }, message: "must have property '" + ${missingVar} + "' when property '${escapedProp}' is present" }];`
            );
            code.line(_`return false;`);
          });
        }
      });
    }
  };

  if (needsObjectGuard) {
    code.if(
      _`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`,
      genDependentChecks
    );
  } else {
    genDependentChecks();
  }
}
