import { Code, Name, _, or, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { canInlineComparison, genInlineComparison } from './const.js';

export default function generateEnumCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (!schema.enum) return;

  const primitives: unknown[] = [];
  const complexValues: unknown[] = [];

  for (const v of schema.enum) {
    if (v === null || typeof v !== 'object') {
      primitives.push(v);
    } else {
      complexValues.push(v);
    }
  }

  if (complexValues.length === 0) {
    if (primitives.length <= 15) {
      const checks: Code[] = [];
      for (let i = 0; i < primitives.length; i++) {
        checks.push(_`${data} === ${stringify(primitives[i])}`);
      }
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    } else {
      const setName = new Name(ctx.genRuntimeName('enumSet'));
      ctx.addRuntimeFunction(setName.str, new Set(primitives));
      code.if(_`!${setName}.has(${data})`, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    }
  } else if (primitives.length === 0) {
    const inlinableValues: unknown[] = [];
    const nonInlinableValues: unknown[] = [];
    for (const v of complexValues) {
      if (canInlineComparison(v)) {
        inlinableValues.push(v);
      } else {
        nonInlinableValues.push(v);
      }
    }

    if (nonInlinableValues.length === 0) {
      const checks: Code[] = [];
      for (const val of inlinableValues) {
        checks.push(genInlineComparison(data, val));
      }
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    } else if (complexValues.length <= 10) {
      const arrName = new Name(ctx.genRuntimeName('enumArr'));
      ctx.addRuntimeFunction(arrName.str, complexValues);
      const checks = complexValues.map((_val, i) => _`deepEqual(${data}, ${arrName}[${i}])`);
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    } else {
      const arrName = new Name(ctx.genRuntimeName('enumArr'));
      ctx.addRuntimeFunction(arrName.str, complexValues);
      const matchVar = code.genVar('match');
      const iVar = code.genVar('i');
      code.line(_`let ${matchVar} = false;`);
      code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
      code.line(_`  if (deepEqual(${data}, ${arrName}[${iVar}])) {`);
      code.line(_`    ${matchVar} = true;`);
      code.line(_`    break;`);
      code.line(_`  }`);
      code.line(_`}`);
      code.if(_`!${matchVar}`, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    }
  } else {
    const totalLen = primitives.length + complexValues.length;

    const inlinableComplex: unknown[] = [];
    const nonInlinableComplex: unknown[] = [];
    for (const v of complexValues) {
      if (canInlineComparison(v)) {
        inlinableComplex.push(v);
      } else {
        nonInlinableComplex.push(v);
      }
    }

    if (totalLen <= 15 && nonInlinableComplex.length === 0) {
      const checks: Code[] = [];
      for (const val of primitives) {
        checks.push(_`${data} === ${stringify(val)}`);
      }
      for (const val of inlinableComplex) {
        checks.push(genInlineComparison(data, val));
      }

      const condition = _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    } else if (totalLen <= 15) {
      const arrName = new Name(ctx.genRuntimeName('enumArr'));
      ctx.addRuntimeFunction(arrName.str, complexValues);

      const checks: Code[] = [];
      for (const val of primitives) {
        checks.push(_`${data} === ${stringify(val)}`);
      }
      for (let i = 0; i < complexValues.length; i++) {
        checks.push(_`deepEqual(${data}, ${arrName}[${i}])`);
      }

      const condition = _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    } else {
      const arrName = new Name(ctx.genRuntimeName('enumArr'));
      ctx.addRuntimeFunction(arrName.str, complexValues);

      const checkedVar = code.genVar('checked');
      const setName = new Name(ctx.genRuntimeName('enumSet'));
      ctx.addRuntimeFunction(setName.str, new Set(primitives));
      code.line(_`let ${checkedVar} = ${setName}.has(${data});`);

      code.if(_`!${checkedVar} && typeof ${data} === 'object' && ${data} !== null`, () => {
        const iVar = code.genVar('i');
        code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
        code.line(_`  if (deepEqual(${data}, ${arrName}[${iVar}])) {`);
        code.line(_`    ${checkedVar} = true;`);
        code.line(_`    break;`);
        code.line(_`  }`);
        code.line(_`}`);
      });
      code.if(_`!${checkedVar}`, () => {
        ctx.genError('enum', 'must be equal to one of the allowed values', {
          allowedValues: schema.enum,
        });
      });
    }
  }
}
