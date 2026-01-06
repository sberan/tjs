import type { JsonSchema } from '../../../types.js';
import { Code, Name, _, and, pathExpr, pathExprDynamic, indexAccess } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { hasTypeConstraint, isNoOpSchema, genPropertyCheck } from '../shared/utils.js';
import { determineRegexFlags, generateOptimizedPatternCheck } from '../string/regex-flags.js';

function generateAdditionalPropsCheck(
  schema: JsonSchema,
  dataExpr: Code,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const { code } = ctx;
  if (schema === false) {
    ctx.withPath(pathExprCode, () => {
      ctx.genError('additionalProperties', 'must NOT have additional properties', {});
    });
  } else if (schema === true) {
  } else {
    const propVar = code.genVar('ap');
    code.line(_`const ${propVar} = ${dataExpr};`);
    const propsTracker = ctx.tracker.props;
    propsTracker.withScope(() => {
      ctx.validateSubschema(schema, propVar, pathExprCode);
    }, false);
  }
}

/**
 * Keyword handler for properties, patternProperties, additionalProperties validation.
 */
export default function generatePropertiesChecks(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  const nonTrivialProps = schema.properties
    ? Object.entries(schema.properties).filter(([, s]) => !isNoOpSchema(s))
    : [];
  const nonTrivialPatternProps = schema.patternProperties
    ? Object.entries(schema.patternProperties).filter(([, s]) => !isNoOpSchema(s))
    : [];

  const hasProps = nonTrivialProps.length > 0;
  const hasPatternProps = nonTrivialPatternProps.length > 0;
  const hasAdditionalProps =
    schema.additionalProperties !== undefined && !isNoOpSchema(schema.additionalProperties);

  const propsTracker = ctx.tracker.props;

  if (schema.properties) {
    propsTracker.addProperties(Object.keys(schema.properties));
  }

  if (schema.patternProperties) {
    propsTracker.addPatterns(Object.keys(schema.patternProperties));
  }

  if (schema.additionalProperties !== undefined && schema.additionalProperties !== false) {
    propsTracker.markAllEvaluated();
  }

  if (!hasProps && !hasPatternProps && !hasAdditionalProps) return;

  const genChecks = () => {
    for (const [propName, propSchema] of nonTrivialProps) {
      const propPathExpr = pathExpr(path, propName);
      genPropertyCheck(code, data, propName, (valueVar) => {
        const valueVarName = valueVar instanceof Name ? valueVar : code.genVar('pv');
        if (!(valueVar instanceof Name)) {
          code.line(_`const ${valueVarName} = ${valueVar};`);
        }
        propsTracker.withScope(() => {
          ctx.validateSubschema(propSchema, valueVarName as Name, propPathExpr);
        }, false);
      });
    }

    if (hasPatternProps || hasAdditionalProps) {
      const definedProps = schema.properties ? Object.keys(schema.properties) : [];
      const allPatterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

      // For each pattern, determine if we can use optimized string methods or need regex
      const patternChecks: Array<{ pattern: string; check: Code | Name; isOptimized: boolean }> =
        [];
      for (const pattern of allPatterns) {
        const optimized = generateOptimizedPatternCheck(pattern, new Name('key'));
        if (optimized) {
          // Use optimized string method (startsWith, endsWith, etc.)
          patternChecks.push({ pattern, check: optimized, isOptimized: true });
        } else {
          // Fall back to regex
          const flags = determineRegexFlags(pattern);
          const regexName = new Name(ctx.genRuntimeName('patternRe'));
          ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
          patternChecks.push({ pattern, check: regexName, isOptimized: false });
        }
      }

      if (nonTrivialPatternProps.length > 0 || hasAdditionalProps) {
        const keyVar = new Name('key');
        code.forIn(keyVar, data, () => {
          const keyPathExpr = pathExprDynamic(path, keyVar);

          for (let i = 0; i < nonTrivialPatternProps.length; i++) {
            const [pattern, patternSchema] = nonTrivialPatternProps[i];
            const patternIdx = allPatterns.indexOf(pattern);
            const patternInfo = patternChecks[patternIdx];

            // Generate condition based on whether we're using optimized check or regex
            const condition = patternInfo.isOptimized
              ? patternInfo.check // Already a Code expression like key.startsWith("S_")
              : _`${patternInfo.check}.test(${keyVar})`; // Regex test

            code.if(condition, () => {
              const propAccessed = indexAccess(data, keyVar);
              const propVar = code.genVar('pv');
              code.line(_`const ${propVar} = ${propAccessed};`);
              propsTracker.withScope(() => {
                ctx.validateSubschema(patternSchema, propVar, keyPathExpr);
              }, false);
            });
          }

          if (hasAdditionalProps) {
            const addPropsSchema = schema.additionalProperties!;

            const conditions: Code[] = [];

            if (definedProps.length > 0 && definedProps.length <= 3) {
              const propChecks = definedProps.map((p) => _`${keyVar} !== ${p}`);
              conditions.push(_`(${and(...propChecks)})`);
            } else if (definedProps.length > 3) {
              const propsSetName = new Name(ctx.genRuntimeName('propsSet'));
              ctx.addRuntimeFunction(propsSetName.str, new Set(definedProps));
              conditions.push(_`!${propsSetName}.has(${keyVar})`);
            }

            // Add negated pattern checks for additionalProperties
            for (const patternInfo of patternChecks) {
              if (patternInfo.isOptimized) {
                conditions.push(_`!(${patternInfo.check})`);
              } else {
                conditions.push(_`!${patternInfo.check}.test(${keyVar})`);
              }
            }

            if (conditions.length > 0) {
              code.if(and(...conditions), () => {
                generateAdditionalPropsCheck(
                  addPropsSchema,
                  indexAccess(data, keyVar),
                  keyPathExpr,
                  ctx
                );
              });
            } else {
              generateAdditionalPropsCheck(
                addPropsSchema,
                indexAccess(data, keyVar),
                keyPathExpr,
                ctx
              );
            }
          }
        });
      }
    }
  };

  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, genChecks);
  }
}
