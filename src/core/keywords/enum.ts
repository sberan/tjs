/**
 * Enum keyword handler
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.1.2
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, stringify, or } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError } from './utils.js';

/**
 * Generate enum check code
 */
export function generateEnumCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (!schema.enum) return;

  // Separate primitives from complex values (objects/arrays)
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
    // All primitives - use inline === checks for small enums, Set for larger ones
    // Inline === is faster for small enums (like AJV does)
    // Benchmarking shows inline is faster up to ~15 values due to Set.has() overhead
    if (primitives.length <= 15) {
      // Generate inline checks: !(data === v1 || data === v2 || ...)
      // Build checks array without map for micro-optimization
      const checks: Code[] = [];
      for (let i = 0; i < primitives.length; i++) {
        checks.push(_`${dataVar} === ${stringify(primitives[i])}`);
      }
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        genError(
          code,
          pathExprCode,
          '#/enum',
          'enum',
          'must be equal to one of the allowed values',
          {
            allowedValues: schema.enum,
          },
          ctx
        );
      });
    } else {
      // Use Set for larger enums (better O(1) performance)
      const setName = new Name(ctx.genRuntimeName('enumSet'));
      ctx.addRuntimeFunction(setName.str, new Set(primitives));
      code.if(_`!${setName}.has(${dataVar})`, () => {
        genError(
          code,
          pathExprCode,
          '#/enum',
          'enum',
          'must be equal to one of the allowed values',
          {
            allowedValues: schema.enum,
          },
          ctx
        );
      });
    }
  } else if (primitives.length === 0) {
    // All complex - AJV-style inline expressions for small enums
    const arrName = new Name(ctx.genRuntimeName('enumArr'));
    ctx.addRuntimeFunction(arrName.str, complexValues);

    if (complexValues.length <= 10) {
      // Small enum: generate inline expression (no loop overhead)
      // deepEqual(data, arr[0]) || deepEqual(data, arr[1]) || ...
      const checks = complexValues.map((_val, i) => _`deepEqual(${dataVar}, ${arrName}[${i}])`);
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        genError(
          code,
          pathExprCode,
          '#/enum',
          'enum',
          'must be equal to one of the allowed values',
          {
            allowedValues: schema.enum,
          },
          ctx
        );
      });
    } else {
      // Large enum: use loop
      const matchVar = code.genVar('match');
      const iVar = code.genVar('i');
      code.line(_`let ${matchVar} = false;`);
      code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
      code.line(_`  if (deepEqual(${dataVar}, ${arrName}[${iVar}])) {`);
      code.line(_`    ${matchVar} = true;`);
      code.line(_`    break;`);
      code.line(_`  }`);
      code.line(_`}`);
      code.if(_`!${matchVar}`, () => {
        genError(
          code,
          pathExprCode,
          '#/enum',
          'enum',
          'must be equal to one of the allowed values',
          {
            allowedValues: schema.enum,
          },
          ctx
        );
      });
    }
  } else {
    // Mixed: AJV-style single expression for small enums
    const totalLen = primitives.length + complexValues.length;

    if (totalLen <= 15) {
      // Small mixed enum: generate single expression
      // data === v1 || data === v2 || deepEqual(data, arr[0]) || ...
      const arrName = new Name(ctx.genRuntimeName('enumArr'));
      ctx.addRuntimeFunction(arrName.str, complexValues);

      const checks: Code[] = [];
      // Add primitive checks first (faster)
      for (const val of primitives) {
        checks.push(_`${dataVar} === ${stringify(val)}`);
      }
      // Add complex checks
      for (let i = 0; i < complexValues.length; i++) {
        checks.push(_`deepEqual(${dataVar}, ${arrName}[${i}])`);
      }

      const condition = _`!(${or(...checks)})`;
      code.if(condition, () => {
        genError(
          code,
          pathExprCode,
          '#/enum',
          'enum',
          'must be equal to one of the allowed values',
          {
            allowedValues: schema.enum,
          },
          ctx
        );
      });
    } else {
      // Large mixed enum: use Set for primitives + loop for complex
      const arrName = new Name(ctx.genRuntimeName('enumArr'));
      ctx.addRuntimeFunction(arrName.str, complexValues);

      const checkedVar = code.genVar('checked');
      const setName = new Name(ctx.genRuntimeName('enumSet'));
      ctx.addRuntimeFunction(setName.str, new Set(primitives));
      code.line(_`let ${checkedVar} = ${setName}.has(${dataVar});`);

      // Check complex values only if needed
      code.if(_`!${checkedVar} && typeof ${dataVar} === 'object' && ${dataVar} !== null`, () => {
        const iVar = code.genVar('i');
        code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
        code.line(_`  if (deepEqual(${dataVar}, ${arrName}[${iVar}])) {`);
        code.line(_`    ${checkedVar} = true;`);
        code.line(_`    break;`);
        code.line(_`  }`);
        code.line(_`}`);
      });
      code.if(_`!${checkedVar}`, () => {
        genError(
          code,
          pathExprCode,
          '#/enum',
          'enum',
          'must be equal to one of the allowed values',
          {
            allowedValues: schema.enum,
          },
          ctx
        );
      });
    }
  }
}
