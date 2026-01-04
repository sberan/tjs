import { Name, _, pathExprDynamic, indexAccess } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint } from '../shared/utils.js';
import { determineRegexFlags } from '../string/regex-flags.js';

/**
 * Keyword handler for unevaluatedProperties validation.
 */
export default function generateUnevaluatedPropertiesCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (schema.unevaluatedProperties === undefined) return;
  const propsTracker = ctx.tracker.props;

  if (propsTracker.allEvaluated) return;

  const unevalSchema = schema.unevaluatedProperties;

  if (unevalSchema === true && propsTracker.active) {
    propsTracker.getDynamicVar();
  }

  const genCheck = () => {
    const keyVar = new Name('key');
    code.forIn(keyVar, data, () => {
      const keyPathExpr = pathExprDynamic(path, keyVar);

      const patterns = propsTracker.getPatterns();
      const patternRegexVars: Name[] = [];

      for (const pattern of patterns) {
        const flags = determineRegexFlags(pattern);
        const regexName = new Name(ctx.genRuntimeName('unevalPatternRe'));
        ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
        patternRegexVars.push(regexName);
      }

      const isUnevaluatedExpr = propsTracker.isUnevaluated(keyVar, patternRegexVars, ctx);

      code.if(isUnevaluatedExpr, () => {
        if (unevalSchema === false) {
          ctx.withPath(keyPathExpr, () => {
            ctx.genError('unevaluatedProperties', 'must NOT have unevaluated properties', {});
          });
        } else if (unevalSchema === true) {
          propsTracker.markPropertyEvaluated(keyVar);
        } else {
          const propValue = indexAccess(data, keyVar);
          const propVar = code.genVar('unevalProp');
          code.line(_`const ${propVar} = ${propValue};`);
          ctx.validateSubschema(unevalSchema, propVar, keyPathExpr);
        }
      });
    });
  };

  if (hasTypeConstraint(schema, 'object')) {
    genCheck();
  } else {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, genCheck);
  }
}
