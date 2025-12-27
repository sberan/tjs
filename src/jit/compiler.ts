/**
 * JIT Compiler for JSON Schema validation
 *
 * Generates optimized JavaScript validation functions from schemas.
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import { CodeBuilder, escapeString, propAccess, stringify } from './codegen.js';
import { CompileContext, type JITOptions } from './context.js';

/**
 * Validation error type for internal use
 */
export interface JITError {
  path: string;
  message: string;
  keyword: string;
}

/**
 * Compiled validation function type
 * When errors array is provided, errors are collected instead of early return
 */
export type ValidateFn = (data: unknown, errors?: JITError[]) => boolean;

/**
 * Compile a JSON Schema into a validation function
 */
export function compile(schema: JsonSchema, options: JITOptions = {}): ValidateFn {
  const ctx = new CompileContext(schema, options);
  const code = new CodeBuilder();

  // Add runtime functions
  ctx.addRuntimeFunction('deepEqual', createDeepEqual());
  ctx.addRuntimeFunction('formatValidators', createFormatValidators());

  // Generate the main validation function
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema, mainFuncName);

  // Generate code for main schema
  generateSchemaValidator(code, schema, 'data', "''", ctx);

  // Process any queued schemas (from $ref)
  let queued: { schema: JsonSchema; funcName: string } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    code.blank();
    code.block(`function ${q.funcName}(data, errors, path)`, () => {
      generateSchemaValidator(code, q.schema, 'data', 'path', ctx);
      code.line('return true;');
    });
  }

  // Build the final function
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());
  const runtimeValues = Array.from(runtimeFuncs.values());

  const fullCode = `
${code.toString()}
return true;
`;

  // DEBUG: Uncomment to see generated code
  // console.log('Generated code:', `function ${mainFuncName}(data, errors) {\n${fullCode}\n}`);

  // Create the function with runtime dependencies injected
  const factory = new Function(
    ...runtimeNames,
    `return function ${mainFuncName}(data, errors) {\n${fullCode}\n}`
  );
  return factory(...runtimeValues) as ValidateFn;
}

/**
 * Generate validation code for a schema
 * @param pathExpr - JavaScript expression that evaluates to the current path string
 */
function generateSchemaValidator(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // Boolean schemas
  if (schema === true) {
    // Always valid - no code needed
    return;
  }

  if (schema === false) {
    code.line(
      `if (errors) errors.push({ path: ${pathExpr}, message: 'Schema is false', keyword: 'false' });`
    );
    code.line('return false;');
    return;
  }

  // Generate JIT code for each keyword
  generateTypeCheck(code, schema, dataVar, pathExpr, ctx);
  generateConstCheck(code, schema, dataVar, pathExpr, ctx);
  generateEnumCheck(code, schema, dataVar, pathExpr, ctx);
  generateStringChecks(code, schema, dataVar, pathExpr, ctx);
  generateFormatCheck(code, schema, dataVar, pathExpr, ctx);
  generateNumberChecks(code, schema, dataVar, pathExpr, ctx);
  generateArrayChecks(code, schema, dataVar, pathExpr, ctx);
  generateObjectChecks(code, schema, dataVar, pathExpr, ctx);
  generatePropertiesChecks(code, schema, dataVar, pathExpr, ctx);
  generateItemsChecks(code, schema, dataVar, pathExpr, ctx);
  generateCompositionChecks(code, schema, dataVar, pathExpr, ctx);
  generateRefCheck(code, schema, dataVar, pathExpr, ctx);
  generateDynamicRefCheck(code, schema, dataVar, pathExpr, ctx);
  generateContainsCheck(code, schema, dataVar, pathExpr, ctx);
  generateDependentRequiredCheck(code, schema, dataVar, pathExpr, ctx);
  generatePropertyNamesCheck(code, schema, dataVar, pathExpr, ctx);
  generateDependentSchemasCheck(code, schema, dataVar, pathExpr, ctx);
  generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExpr, ctx);
  generateUnevaluatedItemsCheck(code, schema, dataVar, pathExpr, ctx);
}

/**
 * Create a deep equality function for const/enum validation
 */
function createDeepEqual(): (a: unknown, b: unknown) => boolean {
  return function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      const bArr = b as unknown[];
      if (a.length !== bArr.length) return false;
      return a.every((v, i) => deepEqual(v, bArr[i]));
    }

    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => deepEqual(aObj[k], bObj[k]));
  };
}

/**
 * Create format validators for format keyword
 */
function createFormatValidators(): Record<string, (s: string) => boolean> {
  return {
    email: (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
    uuid: (s) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s),
    'date-time': (s) => !isNaN(Date.parse(s)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s),
    uri: (s) => /^[a-z][a-z\d+.-]*:\/\/.+$/i.test(s),
    ipv4: (s) => /^(\d{1,3}\.){3}\d{1,3}$/.test(s) && s.split('.').every((n) => parseInt(n) <= 255),
    ipv6: (s) => /^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i.test(s),
    date: (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s)),
    time: (s) => /^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(s),
    duration: (s) =>
      /^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/.test(s) &&
      s !== 'P' &&
      s !== 'PT',
    hostname: (s) =>
      /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(s),
    'uri-reference': (s) => {
      try {
        new URL(s, 'http://example.com');
        return true;
      } catch {
        return false;
      }
    },
    'json-pointer': (s) => s === '' || /^(\/([^~/]|~0|~1)*)*$/.test(s),
    'relative-json-pointer': (s) => /^\d+(#|(\/([^~/]|~0|~1)*)*)?$/.test(s),
    regex: (s) => {
      try {
        new RegExp(s);
        return true;
      } catch {
        return false;
      }
    },
  };
}

// =============================================================================
// Keyword Code Generators
// =============================================================================

/**
 * Generate code to push an error and return false (or just return false if no errors array)
 */
function genError(code: CodeBuilder, pathExpr: string, keyword: string, message: string): void {
  code.line(
    `if (errors) errors.push({ path: ${pathExpr}, message: '${escapeString(message)}', keyword: '${keyword}' });`
  );
  code.line('return false;');
}

/**
 * Generate type check code
 */
export function generateTypeCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  if (!schema.type) return;

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const expectedType = types.join(' or ');

  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(dataVar, type);
    code.if(`!(${check})`, () => {
      genError(code, pathExpr, 'type', `Expected ${expectedType}`);
    });
  } else {
    // Multiple types - need OR
    const checks = types.map((t) => getTypeCheck(dataVar, t));
    code.if(`!(${checks.join(' || ')})`, () => {
      genError(code, pathExpr, 'type', `Expected ${expectedType}`);
    });
  }
}

function getTypeCheck(dataVar: string, type: string): string {
  switch (type) {
    case 'string':
      return `typeof ${dataVar} === 'string'`;
    case 'number':
      return `typeof ${dataVar} === 'number'`;
    case 'integer':
      return `typeof ${dataVar} === 'number' && Number.isInteger(${dataVar})`;
    case 'boolean':
      return `typeof ${dataVar} === 'boolean'`;
    case 'null':
      return `${dataVar} === null`;
    case 'array':
      return `Array.isArray(${dataVar})`;
    case 'object':
      return `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`;
    default:
      return 'false';
  }
}

/**
 * Generate const check code
 */
export function generateConstCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  if (schema.const === undefined) return;

  // For primitives, use strict equality
  if (schema.const === null || typeof schema.const !== 'object') {
    code.if(`${dataVar} !== ${stringify(schema.const)}`, () => {
      genError(code, pathExpr, 'const', `Expected constant value`);
    });
  } else {
    // For objects/arrays, use deepEqual
    code.if(`!deepEqual(${dataVar}, ${stringify(schema.const)})`, () => {
      genError(code, pathExpr, 'const', `Expected constant value`);
    });
  }
}

/**
 * Generate enum check code
 */
export function generateEnumCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  if (!schema.enum) return;

  // Check if all values are primitives (can use Set/includes)
  const allPrimitive = schema.enum.every((v) => v === null || typeof v !== 'object');

  if (allPrimitive) {
    const values = stringify(schema.enum);
    code.if(`!${values}.includes(${dataVar})`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  } else {
    // Need deepEqual for object values
    const values = stringify(schema.enum);
    code.if(`!${values}.some(v => deepEqual(${dataVar}, v))`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  }
}

/**
 * Generate string validation checks (minLength, maxLength, pattern)
 */
export function generateStringChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  const hasStringChecks =
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined;

  if (!hasStringChecks) return;

  // Only check if data is a string
  code.if(`typeof ${dataVar} === 'string'`, () => {
    // Use code point length for proper Unicode handling
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      code.line(`const len = [...${dataVar}].length;`);

      if (schema.minLength !== undefined) {
        code.if(`len < ${schema.minLength}`, () => {
          genError(
            code,
            pathExpr,
            'minLength',
            `String must be at least ${schema.minLength} characters`
          );
        });
      }

      if (schema.maxLength !== undefined) {
        code.if(`len > ${schema.maxLength}`, () => {
          genError(
            code,
            pathExpr,
            'maxLength',
            `String must be at most ${schema.maxLength} characters`
          );
        });
      }
    }

    if (schema.pattern !== undefined) {
      // Escape the pattern for use in RegExp
      const escapedPattern = escapeString(schema.pattern);
      code.if(`!/${escapedPattern}/.test(${dataVar})`, () => {
        genError(code, pathExpr, 'pattern', `String must match pattern ${schema.pattern}`);
      });
    }
  });
}

/**
 * Generate number validation checks (minimum, maximum, multipleOf, etc.)
 */
export function generateNumberChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  const hasNumberChecks =
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined;

  if (!hasNumberChecks) return;

  // Only check if data is a number
  code.if(`typeof ${dataVar} === 'number'`, () => {
    if (schema.minimum !== undefined) {
      code.if(`${dataVar} < ${schema.minimum}`, () => {
        genError(code, pathExpr, 'minimum', `Value must be >= ${schema.minimum}`);
      });
    }

    if (schema.maximum !== undefined) {
      code.if(`${dataVar} > ${schema.maximum}`, () => {
        genError(code, pathExpr, 'maximum', `Value must be <= ${schema.maximum}`);
      });
    }

    if (schema.exclusiveMinimum !== undefined) {
      code.if(`${dataVar} <= ${schema.exclusiveMinimum}`, () => {
        genError(code, pathExpr, 'exclusiveMinimum', `Value must be > ${schema.exclusiveMinimum}`);
      });
    }

    if (schema.exclusiveMaximum !== undefined) {
      code.if(`${dataVar} >= ${schema.exclusiveMaximum}`, () => {
        genError(code, pathExpr, 'exclusiveMaximum', `Value must be < ${schema.exclusiveMaximum}`);
      });
    }

    if (schema.multipleOf !== undefined) {
      // Handle floating point precision issues
      const multipleOf = schema.multipleOf;
      code.if(
        `Math.abs(${dataVar} / ${multipleOf} - Math.round(${dataVar} / ${multipleOf})) > 1e-10`,
        () => {
          genError(
            code,
            pathExpr,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        }
      );
    }
  });
}

/**
 * Generate array validation checks (minItems, maxItems, uniqueItems)
 */
export function generateArrayChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  const hasArrayChecks =
    schema.minItems !== undefined || schema.maxItems !== undefined || schema.uniqueItems === true;

  if (!hasArrayChecks) return;

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    if (schema.minItems !== undefined) {
      code.if(`${dataVar}.length < ${schema.minItems}`, () => {
        genError(code, pathExpr, 'minItems', `Array must have at least ${schema.minItems} items`);
      });
    }

    if (schema.maxItems !== undefined) {
      code.if(`${dataVar}.length > ${schema.maxItems}`, () => {
        genError(code, pathExpr, 'maxItems', `Array must have at most ${schema.maxItems} items`);
      });
    }

    if (schema.uniqueItems === true) {
      // Use a Set for primitive values, fall back to O(n²) for objects
      code.line(`const seen = new Set();`);
      code.line(`const objects = [];`);
      code.forOf('item', dataVar, () => {
        code.if(`typeof item === 'object' && item !== null`, () => {
          code.forOf('obj', 'objects', () => {
            code.if(`deepEqual(item, obj)`, () => {
              genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
            });
          });
          code.line('objects.push(item);');
        });
        code.else(() => {
          code.if(`seen.has(item)`, () => {
            genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
          });
          code.line('seen.add(item);');
        });
      });
    }
  });
}

/**
 * Generate object validation checks (required, minProperties, maxProperties)
 */
export function generateObjectChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  const hasObjectChecks =
    (schema.required && schema.required.length > 0) ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined;

  if (!hasObjectChecks) return;

  // Only check if data is an object
  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      if (schema.required && schema.required.length > 0) {
        for (const prop of schema.required) {
          const propStr = escapeString(prop);
          const propPathExpr = pathExpr === "''" ? `'${propStr}'` : `${pathExpr} + '.${propStr}'`;
          code.if(`!('${propStr}' in ${dataVar})`, () => {
            code.line(
              `if (errors) errors.push({ path: ${propPathExpr}, message: 'Required property missing', keyword: 'required' });`
            );
            code.line('return false;');
          });
        }
      }

      if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
        code.line(`const propCount = Object.keys(${dataVar}).length;`);

        if (schema.minProperties !== undefined) {
          code.if(`propCount < ${schema.minProperties}`, () => {
            genError(
              code,
              pathExpr,
              'minProperties',
              `Object must have at least ${schema.minProperties} properties`
            );
          });
        }

        if (schema.maxProperties !== undefined) {
          code.if(`propCount > ${schema.maxProperties}`, () => {
            genError(
              code,
              pathExpr,
              'maxProperties',
              `Object must have at most ${schema.maxProperties} properties`
            );
          });
        }
      }
    }
  );
}

/**
 * Generate properties, additionalProperties, patternProperties checks
 */
export function generatePropertiesChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  const hasProps = schema.properties && Object.keys(schema.properties).length > 0;
  const hasPatternProps =
    schema.patternProperties && Object.keys(schema.patternProperties).length > 0;
  const hasAdditionalProps = schema.additionalProperties !== undefined;

  if (!hasProps && !hasPatternProps && !hasAdditionalProps) return;

  // Only check if data is an object
  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      // Validate defined properties
      if (schema.properties) {
        for (const [propName, propSchema] of Object.entries(schema.properties)) {
          const propAccessed = propAccess(dataVar, propName);
          const propPathExpr =
            pathExpr === "''"
              ? `'${escapeString(propName)}'`
              : `${pathExpr} + '.${escapeString(propName)}'`;
          code.if(`'${escapeString(propName)}' in ${dataVar}`, () => {
            generateSchemaValidator(code, propSchema, propAccessed, propPathExpr, ctx);
          });
        }
      }

      // Handle additionalProperties and patternProperties
      if (hasAdditionalProps || hasPatternProps) {
        const definedProps = schema.properties ? Object.keys(schema.properties) : [];
        const patterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

        code.forIn('key', dataVar, () => {
          // Check if it's a defined property
          if (definedProps.length > 0) {
            const propsArray = stringify(definedProps);
            code.if(`${propsArray}.includes(key)`, () => {
              code.line('continue;');
            });
          }

          // Dynamic path expression for key
          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;

          // Check pattern properties
          if (hasPatternProps && schema.patternProperties) {
            for (const [pattern, patternSchema] of Object.entries(schema.patternProperties)) {
              const escapedPattern = escapeString(pattern);
              code.if(`/${escapedPattern}/.test(key)`, () => {
                const propAccessed = `${dataVar}[key]`;
                generateSchemaValidator(code, patternSchema, propAccessed, keyPathExpr, ctx);
              });
            }
          }

          // Handle additionalProperties
          if (schema.additionalProperties !== undefined) {
            const addPropsSchema = schema.additionalProperties;

            // Build condition: not a defined prop and not matching any pattern
            let condition = 'true';
            if (definedProps.length > 0) {
              condition = `!${stringify(definedProps)}.includes(key)`;
            }
            if (patterns.length > 0) {
              const patternChecks = patterns
                .map((p) => `!/${escapeString(p)}/.test(key)`)
                .join(' && ');
              condition = condition === 'true' ? patternChecks : `${condition} && ${patternChecks}`;
            }

            if (condition !== 'true') {
              code.if(condition, () => {
                generateAdditionalPropsCheck(
                  code,
                  addPropsSchema,
                  `${dataVar}[key]`,
                  keyPathExpr,
                  ctx
                );
              });
            } else {
              generateAdditionalPropsCheck(
                code,
                addPropsSchema,
                `${dataVar}[key]`,
                keyPathExpr,
                ctx
              );
            }
          }
        });
      }
    }
  );
}

function generateAdditionalPropsCheck(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema === false) {
    genError(code, pathExpr, 'additionalProperties', 'Additional properties not allowed');
  } else if (schema === true) {
    // No check needed
  } else {
    generateSchemaValidator(code, schema, dataVar, pathExpr, ctx);
  }
}

/**
 * Generate contains check (minContains, maxContains)
 */
export function generateContainsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.contains) return;

  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  code.if(`Array.isArray(${dataVar})`, () => {
    const countVar = code.genVar('containsCount');
    code.line(`let ${countVar} = 0;`);

    const iVar = code.genVar('i');
    code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
      const itemAccess = `${dataVar}[${iVar}]`;

      code.line(`if ((function() {`);
      const checkVar = code.genVar('check');
      code.line(`  const ${checkVar} = ${itemAccess};`);
      generateSchemaValidatorForAnyOf(code, containsSchema, checkVar, ctx);
      code.line(`  return true;`);
      code.line(`})()) ${countVar}++;`);

      // Early exit if we've found enough and no maxContains
      if (maxContains === undefined) {
        code.if(`${countVar} >= ${minContains}`, () => {
          code.line('break;');
        });
      }
    });

    code.if(`${countVar} < ${minContains}`, () => {
      genError(
        code,
        pathExpr,
        'contains',
        `Array must contain at least ${minContains} matching items`
      );
    });

    if (maxContains !== undefined) {
      code.if(`${countVar} > ${maxContains}`, () => {
        genError(
          code,
          pathExpr,
          'maxContains',
          `Array must contain at most ${maxContains} matching items`
        );
      });
    }
  });
}

/**
 * Generate dependentRequired check
 */
export function generateDependentRequiredCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  if (!schema.dependentRequired) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, requiredProps] of Object.entries(schema.dependentRequired!)) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          for (const reqProp of requiredProps) {
            const reqPropStr = escapeString(reqProp);
            const reqPathExpr =
              pathExpr === "''" ? `'${reqPropStr}'` : `${pathExpr} + '.${reqPropStr}'`;
            code.if(`!('${reqPropStr}' in ${dataVar})`, () => {
              code.line(
                `if (errors) errors.push({ path: ${reqPathExpr}, message: 'Property required when ${propStr} is present', keyword: 'dependentRequired' });`
              );
              code.line('return false;');
            });
          }
        });
      }
    }
  );
}

/**
 * Generate dependentSchemas check
 */
export function generateDependentSchemasCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.dependentSchemas) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          generateSchemaValidator(code, depSchema, dataVar, pathExpr, ctx);
        });
      }
    }
  );
}

/**
 * Generate propertyNames check
 */
export function generatePropertyNamesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.propertyNames) return;

  const propNamesSchema = schema.propertyNames;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      code.forIn('key', dataVar, () => {
        // For propertyNames, the path is the key itself
        generateSchemaValidator(code, propNamesSchema, 'key', 'key', ctx);
      });
    }
  );
}

/**
 * Generate $ref check
 */
export function generateRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.$ref) return;

  // Resolve the reference
  const refSchema = ctx.resolveRef(schema.$ref, schema);

  if (!refSchema) {
    // Can't resolve - schema is invalid, always fail
    genError(code, pathExpr, '$ref', `Cannot resolve reference ${schema.$ref}`);
    return;
  }

  // Check if already compiled (avoid infinite recursion)
  const existingName = ctx.getCompiledName(refSchema);
  if (existingName) {
    // Call the already-compiled function
    code.if(`!${existingName}(${dataVar}, errors, ${pathExpr})`, () => {
      code.line('return false;');
    });
  } else {
    // Queue for compilation and generate a call
    const funcName = ctx.queueCompile(refSchema);
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr})`, () => {
      code.line('return false;');
    });
  }
}

/**
 * Generate composition checks (allOf, anyOf, oneOf, not, if-then-else)
 */
export function generateCompositionChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // allOf - all subschemas must validate
  if (schema.allOf && schema.allOf.length > 0) {
    for (const subSchema of schema.allOf) {
      generateSchemaValidator(code, subSchema, dataVar, pathExpr, ctx);
    }
  }

  // anyOf - at least one subschema must validate
  if (schema.anyOf && schema.anyOf.length > 0) {
    const resultVar = code.genVar('anyOfResult');
    code.line(`let ${resultVar} = false;`);

    for (const subSchema of schema.anyOf) {
      // Try each subschema, set result to true if any passes
      code.if(`!${resultVar}`, () => {
        if (subSchema === true) {
          code.line(`${resultVar} = true;`);
        } else if (subSchema === false) {
          // Skip - false schema never validates
        } else {
          // Generate inline check wrapped in IIFE to catch early returns
          const checkVar = code.genVar('check');
          code.line(`${resultVar} = (function() {`);
          code.line(`  const ${checkVar} = ${dataVar};`);
          generateSchemaValidatorForAnyOf(code, subSchema, checkVar, ctx);
          code.line(`  return true;`);
          code.line(`})();`);
        }
      });
    }

    code.if(`!${resultVar}`, () => {
      genError(code, pathExpr, 'anyOf', 'Value must match at least one schema');
    });
  }

  // oneOf - exactly one subschema must validate
  if (schema.oneOf && schema.oneOf.length > 0) {
    const countVar = code.genVar('oneOfCount');
    code.line(`let ${countVar} = 0;`);

    for (const subSchema of schema.oneOf) {
      if (subSchema === true) {
        code.line(`${countVar}++;`);
      } else if (subSchema === false) {
        // Skip - false schema never validates
      } else {
        code.line(`if ((function() {`);
        const checkVar = code.genVar('check');
        code.line(`  const ${checkVar} = ${dataVar};`);
        generateSchemaValidatorForAnyOf(code, subSchema, checkVar, ctx);
        code.line(`  return true;`);
        code.line(`})()) ${countVar}++;`);
      }

      // Early exit if more than one matches
      code.if(`${countVar} > 1`, () => {
        genError(code, pathExpr, 'oneOf', 'Value must match exactly one schema');
      });
    }

    code.if(`${countVar} !== 1`, () => {
      genError(code, pathExpr, 'oneOf', 'Value must match exactly one schema');
    });
  }

  // not - subschema must NOT validate
  if (schema.not !== undefined) {
    const notSchema = schema.not;
    if (notSchema === true) {
      // not true = always fails
      genError(code, pathExpr, 'not', 'Value must not match schema');
    } else if (notSchema === false) {
      // not false = always passes, no code needed
    } else {
      code.line(`if ((function() {`);
      const checkVar = code.genVar('check');
      code.line(`  const ${checkVar} = ${dataVar};`);
      generateSchemaValidatorForAnyOf(code, notSchema, checkVar, ctx);
      code.line(`  return true;`);
      code.line(`})()) {`);
      genError(code, pathExpr, 'not', 'Value must not match schema');
      code.line(`}`);
    }
  }

  // if-then-else
  if (schema.if !== undefined) {
    const ifSchema = schema.if;
    const thenSchema = schema.then;
    const elseSchema = schema.else;

    // Check if condition matches
    const condVar = code.genVar('ifCond');

    if (ifSchema === true) {
      code.line(`const ${condVar} = true;`);
    } else if (ifSchema === false) {
      code.line(`const ${condVar} = false;`);
    } else {
      code.line(`const ${condVar} = (function() {`);
      const checkVar = code.genVar('check');
      code.line(`  const ${checkVar} = ${dataVar};`);
      generateSchemaValidatorForAnyOf(code, ifSchema, checkVar, ctx);
      code.line(`  return true;`);
      code.line(`})();`);
    }

    // Apply then or else based on condition
    if (thenSchema !== undefined) {
      code.if(condVar, () => {
        if (thenSchema === false) {
          genError(code, pathExpr, 'then', 'Conditional validation failed');
        } else if (thenSchema !== true) {
          generateSchemaValidator(code, thenSchema, dataVar, pathExpr, ctx);
        }
      });
    }

    if (elseSchema !== undefined) {
      code.if(`!${condVar}`, () => {
        if (elseSchema === false) {
          genError(code, pathExpr, 'else', 'Conditional validation failed');
        } else if (elseSchema !== true) {
          generateSchemaValidator(code, elseSchema, dataVar, pathExpr, ctx);
        }
      });
    }
  }
}

/**
 * Generate schema validator for use in anyOf/oneOf/not (returns early instead of returning false)
 * Note: This doesn't collect errors since it's used for boolean checks only
 */
function generateSchemaValidatorForAnyOf(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  ctx: CompileContext
): void {
  if (schema === true) return;
  if (schema === false) {
    code.line('return false;');
    return;
  }

  // Generate checks that return false on failure (which means the subschema didn't match)
  // Use empty path since we don't collect errors in anyOf/oneOf/not checks
  const dummyPath = "''";
  generateTypeCheck(code, schema, dataVar, dummyPath, ctx);
  generateConstCheck(code, schema, dataVar, dummyPath, ctx);
  generateEnumCheck(code, schema, dataVar, dummyPath, ctx);
  generateStringChecks(code, schema, dataVar, dummyPath, ctx);
  generateNumberChecks(code, schema, dataVar, dummyPath, ctx);
  generateArrayChecks(code, schema, dataVar, dummyPath, ctx);
  generateObjectChecks(code, schema, dataVar, dummyPath, ctx);
  generatePropertiesChecks(code, schema, dataVar, dummyPath, ctx);
  generateItemsChecks(code, schema, dataVar, dummyPath, ctx);
  // Note: We don't recurse into composition here to avoid deep nesting
}

/**
 * Generate items and prefixItems checks for arrays
 */
export function generateItemsChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  const hasPrefixItems = schema.prefixItems && schema.prefixItems.length > 0;
  const hasItems = schema.items !== undefined;

  if (!hasPrefixItems && !hasItems) return;

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    // Handle prefixItems (tuple validation)
    if (hasPrefixItems && schema.prefixItems) {
      for (let i = 0; i < schema.prefixItems.length; i++) {
        const itemSchema = schema.prefixItems[i];
        const itemPathExpr = pathExpr === "''" ? `'[${i}]'` : `${pathExpr} + '[${i}]'`;
        code.if(`${dataVar}.length > ${i}`, () => {
          const itemAccess = `${dataVar}[${i}]`;
          generateSchemaValidator(code, itemSchema, itemAccess, itemPathExpr, ctx);
        });
      }
    }

    // Handle items (applies to all items after prefixItems)
    if (hasItems) {
      const itemsSchema = schema.items!;
      const startIndex = hasPrefixItems && schema.prefixItems ? schema.prefixItems.length : 0;

      if (itemsSchema === false) {
        // No additional items allowed
        if (startIndex > 0) {
          code.if(`${dataVar}.length > ${startIndex}`, () => {
            genError(code, pathExpr, 'items', `Array must have at most ${startIndex} items`);
          });
        } else {
          code.if(`${dataVar}.length > 0`, () => {
            genError(code, pathExpr, 'items', 'Array must be empty');
          });
        }
      } else if (itemsSchema !== true) {
        // Validate each item
        const iVar = code.genVar('i');
        code.for(`let ${iVar} = ${startIndex}`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
          const itemAccess = `${dataVar}[${iVar}]`;
          const itemPathExpr =
            pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;
          generateSchemaValidator(code, itemsSchema, itemAccess, itemPathExpr, ctx);
        });
      }
    }
  });
}

/**
 * Generate format check code
 */
export function generateFormatCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.format === undefined) return;

  // Skip if formatAssertion is disabled
  if (!ctx.options.formatAssertion) return;

  const format = schema.format;

  // Only check if data is a string
  code.if(`typeof ${dataVar} === 'string'`, () => {
    code.if(
      `formatValidators['${escapeString(format)}'] && !formatValidators['${escapeString(format)}'](${dataVar})`,
      () => {
        genError(code, pathExpr, 'format', `Invalid ${format} format`);
      }
    );
  });
}

/**
 * Generate $dynamicRef check code
 */
export function generateDynamicRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.$dynamicRef) return;

  // For $dynamicRef, we resolve it statically at compile time
  // Dynamic resolution based on dynamic scope is complex and requires runtime support
  // For now, we resolve it like a regular $ref and queue for compilation
  const refSchema = ctx.resolveRef(schema.$dynamicRef, schema);

  if (!refSchema) {
    // Can't resolve - schema is invalid, always fail
    genError(code, pathExpr, '$dynamicRef', `Cannot resolve reference ${schema.$dynamicRef}`);
    return;
  }

  // Check if already compiled (avoid infinite recursion)
  const existingName = ctx.getCompiledName(refSchema);
  if (existingName) {
    code.if(`!${existingName}(${dataVar}, errors, ${pathExpr})`, () => {
      code.line('return false;');
    });
  } else {
    // Queue for compilation and generate a call
    const funcName = ctx.queueCompile(refSchema);
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr})`, () => {
      code.line('return false;');
    });
  }
}

/**
 * Collect all property names that are evaluated by a schema (recursively)
 */
function collectEvaluatedProperties(schema: JsonSchema): {
  props: string[];
  patterns: string[];
  hasAdditional: boolean;
} {
  if (typeof schema !== 'object' || schema === null) {
    return { props: [], patterns: [], hasAdditional: false };
  }

  const props: string[] = [];
  const patterns: string[] = [];
  let hasAdditional = false;

  // Direct properties
  if (schema.properties) {
    props.push(...Object.keys(schema.properties));
  }

  // Pattern properties
  if (schema.patternProperties) {
    patterns.push(...Object.keys(schema.patternProperties));
  }

  // additionalProperties evaluates all additional properties
  if (schema.additionalProperties !== undefined && schema.additionalProperties !== false) {
    hasAdditional = true;
  }

  // allOf - all subschemas' properties are evaluated
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      const collected = collectEvaluatedProperties(sub);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
    }
  }

  // anyOf - properties from all branches are potentially evaluated
  if (schema.anyOf) {
    for (const sub of schema.anyOf) {
      const collected = collectEvaluatedProperties(sub);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
    }
  }

  // oneOf - properties from all branches are potentially evaluated
  if (schema.oneOf) {
    for (const sub of schema.oneOf) {
      const collected = collectEvaluatedProperties(sub);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
    }
  }

  // if/then/else - DON'T collect from these branches statically
  // because we need runtime evaluation to know which branch was taken.
  // The generateUnevaluatedPropertiesCheck will handle this specially.

  return { props: [...new Set(props)], patterns: [...new Set(patterns)], hasAdditional };
}

/**
 * Generate unevaluatedProperties check code
 *
 * This tracks which properties have been evaluated by other keywords
 * and validates any remaining properties against the unevaluatedProperties schema.
 */
export function generateUnevaluatedPropertiesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.unevaluatedProperties === undefined) return;

  // Collect all property names that are "evaluated" by other keywords
  const { props: evaluatedProps, patterns, hasAdditional } = collectEvaluatedProperties(schema);

  // If additionalProperties is set, all properties are evaluated
  if (hasAdditional) {
    return; // Nothing to check
  }

  // Handle if/then/else specially - we need to know at runtime which branch was taken
  const hasIfThenElse = schema.if !== undefined;
  let thenProps: string[] = [];
  let elseProps: string[] = [];
  let thenPatterns: string[] = [];
  let elsePatterns: string[] = [];

  if (hasIfThenElse) {
    if (schema.then) {
      const collected = collectEvaluatedProperties(schema.then);
      thenProps = collected.props;
      thenPatterns = collected.patterns;
    }
    if (schema.else) {
      const collected = collectEvaluatedProperties(schema.else);
      elseProps = collected.props;
      elsePatterns = collected.patterns;
    }
  }

  // Only check if data is an object
  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      // If there's if/then/else, we need to evaluate the condition first
      if (hasIfThenElse) {
        const ifSchema = schema.if!;
        const condVar = code.genVar('ifCond');

        if (ifSchema === true) {
          code.line(`const ${condVar} = true;`);
        } else if (ifSchema === false) {
          code.line(`const ${condVar} = false;`);
        } else {
          code.line(`const ${condVar} = (function() {`);
          const checkVar = code.genVar('check');
          code.line(`  const ${checkVar} = ${dataVar};`);
          generateSchemaValidatorForAnyOf(code, ifSchema, checkVar, ctx);
          code.line(`  return true;`);
          code.line(`})();`);
        }

        // Build runtime-evaluated property lists
        code.line(`const evaluatedPropsRuntime = ${stringify(evaluatedProps)}.slice();`);

        // Add properties from the matching branch
        if (thenProps.length > 0 || elseProps.length > 0) {
          code.if(condVar, () => {
            if (thenProps.length > 0) {
              code.line(`evaluatedPropsRuntime.push(...${stringify(thenProps)});`);
            }
          });
          if (elseProps.length > 0) {
            code.else(() => {
              code.line(`evaluatedPropsRuntime.push(...${stringify(elseProps)});`);
            });
          }
        }

        // Now check unevaluated properties
        code.forIn('key', dataVar, () => {
          const conditions: string[] = ['!evaluatedPropsRuntime.includes(key)'];

          for (const pattern of patterns) {
            conditions.push(`!/${escapeString(pattern)}/.test(key)`);
          }

          // Add runtime pattern checks for if/then/else
          if (thenPatterns.length > 0 || elsePatterns.length > 0) {
            code.line(`let matchesConditionalPattern = false;`);
            code.if(condVar, () => {
              for (const pattern of thenPatterns) {
                code.if(`/${escapeString(pattern)}/.test(key)`, () => {
                  code.line('matchesConditionalPattern = true;');
                });
              }
            });
            if (elsePatterns.length > 0) {
              code.else(() => {
                for (const pattern of elsePatterns) {
                  code.if(`/${escapeString(pattern)}/.test(key)`, () => {
                    code.line('matchesConditionalPattern = true;');
                  });
                }
              });
            }
            conditions.push('!matchesConditionalPattern');
          }

          const condition = conditions.join(' && ');

          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
          code.if(condition, () => {
            if (schema.unevaluatedProperties === false) {
              code.line(
                `if (errors) errors.push({ path: ${keyPathExpr}, message: 'Unevaluated property not allowed', keyword: 'unevaluatedProperties' });`
              );
              code.line('return false;');
            } else if (
              schema.unevaluatedProperties !== true &&
              schema.unevaluatedProperties !== undefined
            ) {
              generateSchemaValidator(
                code,
                schema.unevaluatedProperties,
                `${dataVar}[key]`,
                keyPathExpr,
                ctx
              );
            }
          });
        });
      } else {
        // No if/then/else, use static evaluation
        code.forIn('key', dataVar, () => {
          const conditions: string[] = [];

          if (evaluatedProps.length > 0) {
            conditions.push(`!${stringify(evaluatedProps)}.includes(key)`);
          }

          for (const pattern of patterns) {
            conditions.push(`!/${escapeString(pattern)}/.test(key)`);
          }

          const condition = conditions.length > 0 ? conditions.join(' && ') : 'true';

          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
          code.if(condition, () => {
            if (schema.unevaluatedProperties === false) {
              code.line(
                `if (errors) errors.push({ path: ${keyPathExpr}, message: 'Unevaluated property not allowed', keyword: 'unevaluatedProperties' });`
              );
              code.line('return false;');
            } else if (
              schema.unevaluatedProperties !== true &&
              schema.unevaluatedProperties !== undefined
            ) {
              generateSchemaValidator(
                code,
                schema.unevaluatedProperties,
                `${dataVar}[key]`,
                keyPathExpr,
                ctx
              );
            }
          });
        });
      }
    }
  );
}

/**
 * Collect the highest evaluated item index from a schema (recursively)
 */
function collectEvaluatedItems(schema: JsonSchema): {
  prefixCount: number;
  hasItems: boolean;
  containsSchema: JsonSchema | null;
} {
  if (typeof schema !== 'object' || schema === null) {
    return { prefixCount: 0, hasItems: false, containsSchema: null };
  }

  let prefixCount = schema.prefixItems?.length ?? 0;
  let hasItems = schema.items !== undefined && schema.items !== false;
  let containsSchema: JsonSchema | null = schema.contains ?? null;

  // allOf - take maximum prefix count
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      const collected = collectEvaluatedItems(sub);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.containsSchema) containsSchema = collected.containsSchema;
    }
  }

  // anyOf - take maximum prefix count
  if (schema.anyOf) {
    for (const sub of schema.anyOf) {
      const collected = collectEvaluatedItems(sub);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.containsSchema) containsSchema = collected.containsSchema;
    }
  }

  // oneOf - take maximum prefix count
  if (schema.oneOf) {
    for (const sub of schema.oneOf) {
      const collected = collectEvaluatedItems(sub);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.containsSchema) containsSchema = collected.containsSchema;
    }
  }

  // if/then/else
  if (schema.then) {
    const collected = collectEvaluatedItems(schema.then);
    prefixCount = Math.max(prefixCount, collected.prefixCount);
    if (collected.hasItems) hasItems = true;
    if (collected.containsSchema) containsSchema = collected.containsSchema;
  }
  if (schema.else) {
    const collected = collectEvaluatedItems(schema.else);
    prefixCount = Math.max(prefixCount, collected.prefixCount);
    if (collected.hasItems) hasItems = true;
    if (collected.containsSchema) containsSchema = collected.containsSchema;
  }

  return { prefixCount, hasItems, containsSchema };
}

/**
 * Generate unevaluatedItems check code
 *
 * This tracks which array items have been evaluated by other keywords
 * and validates any remaining items against the unevaluatedItems schema.
 */
export function generateUnevaluatedItemsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.unevaluatedItems === undefined) return;

  // Collect info about evaluated items from the schema tree
  const { prefixCount, hasItems, containsSchema } = collectEvaluatedItems(schema);

  // If items is defined and not false anywhere, all items are evaluated
  if (hasItems) {
    return; // Nothing to check
  }

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    // If contains is present, we need to track which items matched contains at runtime
    if (containsSchema !== null) {
      // Create a set to track which items are evaluated (matched contains or are in prefixItems)
      const evaluatedSetVar = code.genVar('evaluatedItems');
      code.line(`const ${evaluatedSetVar} = new Set();`);

      // Mark prefixItems as evaluated
      if (prefixCount > 0) {
        const iVar = code.genVar('i');
        code.for(
          `let ${iVar} = 0`,
          `${iVar} < Math.min(${prefixCount}, ${dataVar}.length)`,
          `${iVar}++`,
          () => {
            code.line(`${evaluatedSetVar}.add(${iVar});`);
          }
        );
      }

      // Check each item against contains and mark matched ones as evaluated
      const iVar = code.genVar('i');
      code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
        code.line(`if ((function() {`);
        const checkVar = code.genVar('check');
        code.line(`  const ${checkVar} = ${dataVar}[${iVar}];`);
        generateSchemaValidatorForAnyOf(code, containsSchema, checkVar, ctx);
        code.line(`  return true;`);
        code.line(`})()) ${evaluatedSetVar}.add(${iVar});`);
      });

      // Now validate unevaluated items
      if (schema.unevaluatedItems === false) {
        // Check if there are any items not in the evaluated set
        const jVar = code.genVar('j');
        code.for(`let ${jVar} = 0`, `${jVar} < ${dataVar}.length`, `${jVar}++`, () => {
          code.if(`!${evaluatedSetVar}.has(${jVar})`, () => {
            const itemPathExpr =
              pathExpr === "''" ? `'[' + ${jVar} + ']'` : `${pathExpr} + '[' + ${jVar} + ']'`;
            code.line(
              `if (errors) errors.push({ path: ${itemPathExpr}, message: 'Unevaluated item not allowed', keyword: 'unevaluatedItems' });`
            );
            code.line('return false;');
          });
        });
      } else if (schema.unevaluatedItems !== true) {
        // Validate unevaluated items against the schema
        const jVar = code.genVar('j');
        code.for(`let ${jVar} = 0`, `${jVar} < ${dataVar}.length`, `${jVar}++`, () => {
          code.if(`!${evaluatedSetVar}.has(${jVar})`, () => {
            const itemPathExpr =
              pathExpr === "''" ? `'[' + ${jVar} + ']'` : `${pathExpr} + '[' + ${jVar} + ']'`;
            generateSchemaValidator(
              code,
              schema.unevaluatedItems as JsonSchema,
              `${dataVar}[${jVar}]`,
              itemPathExpr,
              ctx
            );
          });
        });
      }
    } else {
      // No contains, use simpler static evaluation
      if (schema.unevaluatedItems === false) {
        if (prefixCount > 0) {
          code.if(`${dataVar}.length > ${prefixCount}`, () => {
            const itemPathExpr =
              pathExpr === "''"
                ? `'[' + ${prefixCount} + ']'`
                : `${pathExpr} + '[' + ${prefixCount} + ']'`;
            code.line(
              `if (errors) errors.push({ path: ${itemPathExpr}, message: 'Unevaluated item not allowed', keyword: 'unevaluatedItems' });`
            );
            code.line('return false;');
          });
        } else {
          code.if(`${dataVar}.length > 0`, () => {
            genError(code, pathExpr, 'unevaluatedItems', 'Array must be empty');
          });
        }
      } else if (schema.unevaluatedItems !== true) {
        // Validate unevaluated items against the schema
        const iVar = code.genVar('i');
        code.for(`let ${iVar} = ${prefixCount}`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
          const itemPathExpr =
            pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;
          generateSchemaValidator(
            code,
            schema.unevaluatedItems as JsonSchema,
            `${dataVar}[${iVar}]`,
            itemPathExpr,
            ctx
          );
        });
      }
    }
  });
}
