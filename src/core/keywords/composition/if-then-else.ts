import type { JsonSchema } from '../../../types.js';
import { CodeBuilder, Code, Name, _, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { isNoOpSchema } from '../shared/utils.js';
import { generateSubschemaCheck } from '../shared/helpers.js';

function tryInlineIfCondition(
  code: CodeBuilder,
  ifSchema: JsonSchema,
  dataVar: Name
): { conditionVar: Name; evaluatedProps: string[] } | undefined {
  if (isNoOpSchema(ifSchema)) {
    const condVar = code.genVar('ifCond');
    code.line(_`const ${condVar} = true;`);
    return { conditionVar: condVar, evaluatedProps: [] };
  }
  if (ifSchema === false) {
    const condVar = code.genVar('ifCond');
    code.line(_`const ${condVar} = false;`);
    return { conditionVar: condVar, evaluatedProps: [] };
  }

  if (typeof ifSchema !== 'object' || ifSchema === null) return undefined;

  if (
    ifSchema.$ref ||
    ifSchema.$dynamicRef ||
    ifSchema.allOf ||
    ifSchema.anyOf ||
    ifSchema.oneOf ||
    ifSchema.not ||
    ifSchema.if
  ) {
    return undefined;
  }

  const hasProperties = ifSchema.properties !== undefined;
  const hasRequired = ifSchema.required !== undefined && Array.isArray(ifSchema.required);
  const hasPatternProperties = ifSchema.patternProperties !== undefined;
  const hasAdditionalProperties = ifSchema.additionalProperties !== undefined;
  const hasDependencies =
    ifSchema.dependencies !== undefined || ifSchema.dependentSchemas !== undefined;

  const canInline =
    (hasProperties || hasRequired) &&
    !hasPatternProperties &&
    !hasAdditionalProperties &&
    !hasDependencies &&
    !ifSchema.prefixItems &&
    !ifSchema.items &&
    !ifSchema.contains &&
    !ifSchema.propertyNames &&
    !ifSchema.minProperties &&
    !ifSchema.maxProperties;

  if (!canInline) return undefined;

  const condVar = code.genVar('ifCond');
  const tempResultVar = code.genVar('ifResult');
  const evaluatedProps: string[] = [];

  code.line(_`let ${tempResultVar} = true;`);

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    if (hasRequired && ifSchema.required && ifSchema.required.length > 0) {
      for (const propName of ifSchema.required) {
        if (typeof propName === 'string') {
          code.if(_`${tempResultVar} && !(${propName} in ${dataVar})`, () => {
            code.line(_`${tempResultVar} = false;`);
          });
        }
      }
    }

    if (hasProperties && ifSchema.properties) {
      for (const [propName, propSchema] of Object.entries(ifSchema.properties)) {
        if (typeof propName !== 'string') continue;

        const propVar = code.genVar('prop');

        code.line(_`const ${propVar} = ${dataVar}[${propName}];`);
        code.if(_`${tempResultVar} && ${propVar} !== undefined`, () => {
          const inlineValidation = tryInlinePropertyValidation(
            code,
            propSchema,
            propVar,
            tempResultVar
          );

          if (!inlineValidation) {
            code.line(_`${tempResultVar} = false;`);
          }
        });

        evaluatedProps.push(propName);

        if (Object.keys(ifSchema.properties).length > 1) {
          code.if(_`!${tempResultVar}`, () => {
            code.line(_`${tempResultVar} = false;`);
          });
        }
      }
    }
  });

  code.else(() => {
    code.line(_`${tempResultVar} = false;`);
  });

  code.line(_`const ${condVar} = ${tempResultVar};`);
  return { conditionVar: condVar, evaluatedProps };
}

function tryInlinePropertyValidation(
  code: CodeBuilder,
  propSchema: JsonSchema,
  propVar: Name,
  resultVar: Name
): boolean {
  if (isNoOpSchema(propSchema)) {
    return true;
  }
  if (propSchema === false) {
    code.line(_`${resultVar} = false;`);
    return true;
  }

  if (typeof propSchema !== 'object' || propSchema === null) return false;

  if (
    propSchema.$ref ||
    propSchema.$dynamicRef ||
    propSchema.allOf ||
    propSchema.anyOf ||
    propSchema.oneOf ||
    propSchema.not ||
    propSchema.if ||
    propSchema.properties ||
    propSchema.patternProperties ||
    propSchema.additionalProperties ||
    propSchema.unevaluatedProperties ||
    propSchema.unevaluatedItems
  ) {
    return false;
  }

  if (propSchema.type !== undefined) {
    const typeCheck = generateTypeCheckInline(propVar, propSchema.type);
    if (!typeCheck) return false;

    code.if(_`!(${typeCheck})`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }

  if (propSchema.const !== undefined) {
    code.if(_`${propVar} !== ${stringify(propSchema.const)}`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }

  if (propSchema.enum !== undefined && Array.isArray(propSchema.enum)) {
    code.if(_`!${stringify(propSchema.enum)}.includes(${propVar})`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }

  return true;
}

function generateTypeCheckInline(valueVar: Name, type: unknown): Code | undefined {
  if (typeof type === 'string') {
    switch (type) {
      case 'null':
        return _`${valueVar} === null`;
      case 'boolean':
        return _`typeof ${valueVar} === 'boolean'`;
      case 'object':
        return _`${valueVar} && typeof ${valueVar} === 'object' && !Array.isArray(${valueVar})`;
      case 'array':
        return _`Array.isArray(${valueVar})`;
      case 'number':
        return _`typeof ${valueVar} === 'number'`;
      case 'string':
        return _`typeof ${valueVar} === 'string'`;
      case 'integer':
        return _`Number.isInteger(${valueVar})`;
      default:
        return undefined;
    }
  }
  return undefined;
}

/**
 * Keyword handler for if/then/else validation.
 */
export default function generateIfThenElseCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (schema.if === undefined) return;
  const ifSchema = schema.if;
  const thenSchema = schema.then;
  const elseSchema = schema.else;
  const propsTracker = ctx.tracker.props;
  const itemsTracker = ctx.tracker.items;
  const ifTracker = ctx.tracker;

  if (thenSchema === undefined && elseSchema === undefined && !ifTracker.active) {
    return;
  }

  const inlinedCheck = tryInlineIfCondition(code, ifSchema, data);

  if (inlinedCheck) {
    const condVar = inlinedCheck.conditionVar;

    if (
      propsTracker.active &&
      (inlinedCheck.evaluatedProps.length > 0 || thenSchema || elseSchema)
    ) {
      propsTracker.getDynamicVar();
    }
    if (itemsTracker.active && (thenSchema || elseSchema)) {
      itemsTracker.getDynamicVar();
    }

    code.if(condVar, () => {
      propsTracker.emitAddProperties(inlinedCheck.evaluatedProps);

      if (thenSchema !== undefined) {
        if (thenSchema === false) {
          ctx.genError('if', 'must match "then" schema', {});
        } else if (thenSchema !== true) {
          const branch = ifTracker.enterBranch();
          ctx.validateSubschema(thenSchema, data, path);
          ifTracker.exitAndMergeBranch(branch, new Name('true'));
        }
      }
    });

    if (elseSchema !== undefined) {
      code.if(_`!${condVar}`, () => {
        if (elseSchema === false) {
          ctx.genError('if', 'must match "else" schema', {});
        } else if (elseSchema !== true) {
          const branch = ifTracker.enterBranch();
          ctx.validateSubschema(elseSchema, data, path);
          ifTracker.exitAndMergeBranch(branch, new Name('true'));
        }
      });
    }
  } else {
    const condVar = code.genVar('ifCond');

    ifTracker.ensureDynamicVars();

    const ifBranch = ifTracker.enterBranch();
    const checkExpr = generateSubschemaCheck(code, ifSchema, data, ctx, ctx.getDynamicScopeVar());
    ifTracker.exitBranch(ifBranch);
    code.line(_`const ${condVar} = ${checkExpr};`);

    code.if(condVar, () => {
      ifTracker.mergeBranch(ifBranch, new Name('true'));
      if (thenSchema !== undefined) {
        if (thenSchema === false) {
          ctx.genError('if', 'must match "then" schema', {});
        } else if (thenSchema !== true) {
          const thenBranch = ifTracker.enterBranch();
          ctx.validateSubschema(thenSchema, data, path);
          ifTracker.exitAndMergeBranch(thenBranch, new Name('true'));
        }
      }
    });

    if (elseSchema !== undefined) {
      code.if(_`!${condVar}`, () => {
        if (elseSchema === false) {
          ctx.genError('if', 'must match "else" schema', {});
        } else if (elseSchema !== true) {
          const elseBranch = ifTracker.enterBranch();
          ctx.validateSubschema(elseSchema, data, path);
          ifTracker.exitAndMergeBranch(elseBranch, new Name('true'));
        }
      });
    }
  }
}
