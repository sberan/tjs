import type { JsonSchema } from '../../../types.js';
import { Code, Name, _, or, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { isNoOpSchema } from '../shared/utils.js';
import { generateSubschemaCheck } from '../shared/helpers.js';

function tryInlineNotCheck(notSchema: JsonSchema, dataVar: Name): Code | undefined {
  if (typeof notSchema !== 'object' || notSchema === null) {
    return undefined;
  }

  const keywords = Object.keys(notSchema).filter(
    (k) => k !== '$schema' && k !== '$comment' && k !== 'title' && k !== 'description'
  );

  if (keywords.length !== 1) {
    return undefined;
  }

  const keyword = keywords[0];

  if (keyword === 'type') {
    const typeValue = notSchema.type;
    if (typeof typeValue === 'string') {
      const typeCheck = generateTypeCheckInline(dataVar, typeValue);
      if (typeCheck) {
        return typeCheck;
      }
    } else if (Array.isArray(typeValue) && typeValue.length > 0 && typeValue.length <= 3) {
      const typeChecks: Code[] = [];
      for (const t of typeValue) {
        if (typeof t === 'string') {
          const check = generateTypeCheckInline(dataVar, t);
          if (check) {
            typeChecks.push(check);
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      }
      if (typeChecks.length === typeValue.length) {
        return or(...typeChecks);
      }
    }
  }

  if (keyword === 'const') {
    return _`${dataVar} === ${stringify(notSchema.const)}`;
  }

  if (keyword === 'enum' && Array.isArray(notSchema.enum) && notSchema.enum.length <= 5) {
    const allPrimitives = notSchema.enum.every((val) => val === null || typeof val !== 'object');
    if (allPrimitives) {
      const checks = notSchema.enum.map((val) => _`${dataVar} === ${stringify(val)}`);
      return or(...checks);
    }
  }

  return undefined;
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
 * Keyword handler for not validation.
 */
export default function generateNotCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.not === undefined) return;
  const notSchema = schema.not;
  const notTracker = ctx.tracker;

  if (isNoOpSchema(notSchema)) {
    ctx.genError('not', 'must NOT be valid', {});
  } else if (notSchema === false) {
  } else if (
    typeof notSchema === 'object' &&
    notSchema !== null &&
    notSchema.not !== undefined &&
    Object.keys(notSchema).length === 1
  ) {
    const innerNotSchema = notSchema.not;

    if (isNoOpSchema(innerNotSchema)) {
    } else if (innerNotSchema === false) {
      ctx.genError('not', 'must NOT be valid', {});
    } else {
      const checkExpr = notTracker.withDiscardedScope(() =>
        generateSubschemaCheck(code, innerNotSchema, data, ctx, ctx.getDynamicScopeVar())
      );
      code.if(_`!(${checkExpr})`, () => {
        ctx.genError('not', 'must NOT be valid', {});
      });
    }
  } else {
    const inlinedCheck = tryInlineNotCheck(notSchema, data);
    if (inlinedCheck) {
      code.if(inlinedCheck, () => {
        ctx.genError('not', 'must NOT be valid', {});
      });
    } else {
      const checkExpr = notTracker.withDiscardedScope(() =>
        generateSubschemaCheck(code, notSchema, data, ctx, ctx.getDynamicScopeVar())
      );
      code.if(checkExpr, () => {
        ctx.genError('not', 'must NOT be valid', {});
      });
    }
  }
}
