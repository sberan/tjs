import { Code, Name, _, and, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';

export function canInlineComparison(value: unknown, maxDepth: number = 2): boolean {
  if (value === null || typeof value !== 'object') return true;
  if (maxDepth <= 0) return false;

  if (Array.isArray(value)) {
    if (value.length > 5) return false;
    return value.every((v) => canInlineComparison(v, maxDepth - 1));
  }

  const keys = Object.keys(value as object);
  if (keys.length > 5) return false;
  return keys.every((k) =>
    canInlineComparison((value as Record<string, unknown>)[k], maxDepth - 1)
  );
}

export function genInlineComparison(dataVar: Code | Name, value: unknown): Code {
  if (value === null) return _`${dataVar} === null`;
  if (typeof value !== 'object') return _`${dataVar} === ${stringify(value)}`;

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return _`(Array.isArray(${dataVar}) && ${dataVar}.length === 0)`;
    }
    const checks: Code[] = [_`Array.isArray(${dataVar})`, _`${dataVar}.length === ${value.length}`];
    for (let i = 0; i < value.length; i++) {
      checks.push(genInlineComparison(_`${dataVar}[${i}]`, value[i]));
    }
    return _`(${and(...checks)})`;
  }

  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj);

  if (keys.length === 0) {
    return _`(typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar}) && Object.keys(${dataVar}).length === 0)`;
  }

  if (keys.length <= 2) {
    const checks: Code[] = [
      _`typeof ${dataVar} === 'object'`,
      _`${dataVar} !== null`,
      _`!Array.isArray(${dataVar})`,
    ];
    for (const key of keys) {
      const propAccess = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? _`${dataVar}.${Code.raw(key)}`
        : _`${dataVar}[${stringify(key)}]`;
      checks.push(genInlineComparison(propAccess, obj[key]));
    }
    checks.push(_`Object.keys(${dataVar}).length === ${keys.length}`);
    return _`(${and(...checks)})`;
  }

  const checks: Code[] = [
    _`typeof ${dataVar} === 'object'`,
    _`${dataVar} !== null`,
    _`!Array.isArray(${dataVar})`,
    _`Object.keys(${dataVar}).length === ${keys.length}`,
  ];
  for (const key of keys) {
    const propAccess = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
      ? _`${dataVar}.${Code.raw(key)}`
      : _`${dataVar}[${stringify(key)}]`;
    checks.push(genInlineComparison(propAccess, obj[key]));
  }
  return _`(${and(...checks)})`;
}

export default function generateConstCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.const === undefined) return;

  if (schema.const === null || typeof schema.const !== 'object') {
    code.if(_`${data} !== ${stringify(schema.const)}`, () => {
      ctx.genError('const', 'must be equal to constant', { allowedValue: schema.const });
    });
  } else if (canInlineComparison(schema.const)) {
    const inlineCheck = genInlineComparison(data, schema.const);
    code.if(_`!(${inlineCheck})`, () => {
      ctx.genError('const', 'must be equal to constant', { allowedValue: schema.const });
    });
  } else {
    const constName = new Name(ctx.genRuntimeName('const'));
    ctx.addRuntimeFunction(constName.str, schema.const);
    code.if(_`!deepEqual(${data}, ${constName})`, () => {
      ctx.genError('const', 'must be equal to constant', { allowedValue: schema.const });
    });
  }
}
