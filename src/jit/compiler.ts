/**
 * JIT Compiler for JSON Schema validation
 *
 * Generates optimized JavaScript validation functions from schemas.
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import { CodeBuilder, escapeString, propAccess, stringify } from './codegen.js';
import { CompileContext, VOCABULARIES, type JITOptions } from './context.js';

/**
 * Property names that exist on Object.prototype or Array.prototype.
 * These require Object.hasOwn for accurate existence check.
 * Other property names can use the faster `!== undefined` pattern.
 * Generated at module load time from actual prototype chains.
 */
const PROTOTYPE_PROPS = new Set([
  ...Object.getOwnPropertyNames(Object.prototype),
  ...Object.getOwnPropertyNames(Array.prototype),
]);

/**
 * Check if a property name is safe for fast existence check (!== undefined).
 * Unsafe names are those that exist on Object.prototype or Array.prototype.
 */
function isSafePropertyName(name: string): boolean {
  return !PROTOTYPE_PROPS.has(name);
}

/**
 * Generate code to check if a property exists and execute a callback with the value.
 * Uses fast path (!== undefined) for safe property names, Object.hasOwn for prototype names.
 */
function genPropertyCheck(
  code: CodeBuilder,
  dataVar: string,
  propName: string,
  callback: (valueVar: string) => void
): void {
  const propStr = escapeString(propName);
  const propAccessed = propAccess(dataVar, propName);

  if (isSafePropertyName(propName)) {
    // Fast path: store value and check !== undefined
    const propVar = code.genVar('prop');
    code.line(`const ${propVar} = ${propAccessed};`);
    code.if(`${propVar} !== undefined`, () => {
      callback(propVar);
    });
  } else {
    // Slow path: use Object.hasOwn for prototype property names
    code.if(`Object.hasOwn(${dataVar}, '${propStr}')`, () => {
      callback(propAccessed);
    });
  }
}

/**
 * Generate code to check if a required property exists.
 * Uses fast path ('in' operator) for safe names, Object.hasOwn for prototype names.
 */
function genRequiredCheck(
  code: CodeBuilder,
  dataVar: string,
  propName: string,
  pathExpr: string
): void {
  const propStr = escapeString(propName);
  const propPathExpr = pathExpr === "''" ? `'${propStr}'` : `${pathExpr} + '.${propStr}'`;

  // For prototype property names, use Object.hasOwn for accuracy.
  // For other names, use the faster 'in' operator.
  const checkExpr = isSafePropertyName(propName)
    ? `!('${propStr}' in ${dataVar})`
    : `!Object.hasOwn(${dataVar}, '${propStr}')`;

  code.if(checkExpr, () => {
    code.line(
      `if (errors) errors.push({ path: ${propPathExpr}, message: 'Required property missing', keyword: 'required' });`
    );
    code.line('return false;');
  });
}

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
  ctx.addRuntimeFunction('ucs2length', createUcs2Length());

  // Generate the main validation function
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema, mainFuncName);

  // Collect dynamic anchors from the root resource to add to scope at startup
  const rootResourceId =
    typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : '__root__';
  const rootDynamicAnchors = ctx.getResourceDynamicAnchors(rootResourceId);

  // Queue root resource's dynamic anchors for compilation FIRST
  // This ensures they get compiled before we process the queue
  const anchorFuncNames: Array<{ anchor: string; funcName: string }> = [];
  for (const { anchor, schema: anchorSchema } of rootDynamicAnchors) {
    const funcName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
    anchorFuncNames.push({ anchor, funcName });
  }

  // Generate code for main schema
  // Pass dynamicScope for $dynamicRef resolution
  generateSchemaValidator(code, schema, 'data', "''", ctx, 'dynamicScope');

  // Process any queued schemas (from $ref)
  let queued: { schema: JsonSchema; funcName: string } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    code.blank();
    code.block(`function ${q.funcName}(data, errors, path, dynamicScope)`, () => {
      generateSchemaValidator(code, q.schema, 'data', 'path', ctx, 'dynamicScope');
      code.line('return true;');
    });
  }

  // Build the final function
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());
  const runtimeValues = Array.from(runtimeFuncs.values());

  // Push root resource's dynamic anchors to scope at startup
  let scopeInit = 'const dynamicScope = [];\n';
  for (const { anchor, funcName } of anchorFuncNames) {
    scopeInit += `dynamicScope.push({ anchor: ${stringify(anchor)}, validate: ${funcName} });\n`;
  }

  const fullCode = `
${scopeInit}
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
 * @param dynamicScopeVar - Variable name for the dynamic scope array (for $dynamicRef)
 */
function generateSchemaValidator(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  dynamicScopeVar: string = 'dynamicScope'
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

  // Check if this schema is a new schema resource (has $id)
  // If so, we need to push its dynamic anchors to scope
  const schemaResourceId = schema.$id ? ctx.getBaseUri(schema) : undefined;
  const resourceAnchors = schemaResourceId ? ctx.getResourceDynamicAnchors(schemaResourceId) : [];

  if (resourceAnchors.length > 0) {
    // Push dynamic anchors for this resource
    for (const { anchor, schema: anchorSchema } of resourceAnchors) {
      const anchorFuncName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
      code.line(
        `${dynamicScopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
      );
    }
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
  generateRefCheck(code, schema, dataVar, pathExpr, ctx, dynamicScopeVar);
  generateDynamicRefCheck(code, schema, dataVar, pathExpr, ctx, dynamicScopeVar);
  generateContainsCheck(code, schema, dataVar, pathExpr, ctx);
  generateDependentRequiredCheck(code, schema, dataVar, pathExpr, ctx);
  generatePropertyNamesCheck(code, schema, dataVar, pathExpr, ctx);
  generateDependentSchemasCheck(code, schema, dataVar, pathExpr, ctx);
  generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExpr, ctx);
  generateUnevaluatedItemsCheck(code, schema, dataVar, pathExpr, ctx);

  // Pop dynamic anchors after validation (if we pushed any)
  if (resourceAnchors.length > 0) {
    for (let i = 0; i < resourceAnchors.length; i++) {
      code.line(`${dynamicScopeVar}.pop();`);
    }
  }
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

/**
 * Create a Unicode code point length function for minLength/maxLength validation.
 * This handles surrogate pairs (emojis, etc.) correctly.
 * Based on https://mathiasbynens.be/notes/javascript-encoding
 */
function createUcs2Length(): (str: string) => number {
  return function ucs2length(str: string): number {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value: number;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 0xd800 && value <= 0xdbff && pos < len) {
        // high surrogate, and there is a next character
        value = str.charCodeAt(pos);
        if ((value & 0xfc00) === 0xdc00) pos++; // low surrogate
      }
    }
    return length;
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
  ctx: CompileContext
): void {
  if (!schema.type) return;
  // type is a validation vocabulary keyword
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const expectedType = types.join(' or ');
  //TODO we dont't need this optimization, the multiple case is fine
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
    // TODO let's make a conveninece function to do an if check with an error if true
    // i.e. code.assertIf(condition, pathExpr, keyword, message)
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
  ctx: CompileContext
): void {
  if (!schema.enum) return;

  // Check if all values are primitives (can use Set for O(1) lookup)
  const allPrimitive = schema.enum.every((v) => v === null || typeof v !== 'object');

  if (allPrimitive) {
    // Use a pre-compiled Set for O(1) lookup instead of array.includes() O(n)
    const setName = ctx.genRuntimeName('enumSet');
    ctx.addRuntimeFunction(setName, new Set(schema.enum));
    code.if(`!${setName}.has(${dataVar})`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  } else {
    // Need deepEqual for object values - use pre-compiled array
    const arrName = ctx.genRuntimeName('enumArr');
    ctx.addRuntimeFunction(arrName, schema.enum);
    code.if(`!${arrName}.some(v => deepEqual(${dataVar}, v))`, () => {
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
    // Use ucs2length for proper Unicode code point counting (handles surrogate pairs)
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const lenVar = code.genVar('len');
      code.line(`const ${lenVar} = ucs2length(${dataVar});`);

      if (schema.minLength !== undefined) {
        code.if(`${lenVar} < ${schema.minLength}`, () => {
          genError(
            code,
            pathExpr,
            'minLength',
            `String must be at least ${schema.minLength} characters`
          );
        });
      }

      if (schema.maxLength !== undefined) {
        code.if(`${lenVar} > ${schema.maxLength}`, () => {
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
  ctx: CompileContext
): void {
  // Number checks are validation vocabulary keywords
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

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
      // Handle floating point precision issues and potential infinity overflow
      const multipleOf = schema.multipleOf;
      const divVar = code.genVar('div');
      code.line(`const ${divVar} = ${dataVar} / ${multipleOf};`);
      // Check for infinity (overflow) or non-integer result
      code.if(
        `!Number.isFinite(${divVar}) || Math.abs(${divVar} - Math.round(${divVar})) > 1e-10`,
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
      // O(n²) comparison using deepEqual - same approach as AJV's fallback
      // This handles all types correctly including object key ordering
      const iVar = code.genVar('i');
      const jVar = code.genVar('j');
      code.block(`outer: for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
        code.block(`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
          code.if(`deepEqual(${dataVar}[${iVar}], ${dataVar}[${jVar}])`, () => {
            genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
          });
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
          genRequiredCheck(code, dataVar, prop, pathExpr);
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
          const propPathExpr =
            pathExpr === "''"
              ? `'${escapeString(propName)}'`
              : `${pathExpr} + '.${escapeString(propName)}'`;
          genPropertyCheck(code, dataVar, propName, (valueVar) => {
            generateSchemaValidator(code, propSchema, valueVar, propPathExpr, ctx);
          });
        }
      }

      // Handle patternProperties - applies to ALL properties (including defined ones)
      if (hasPatternProps && schema.patternProperties) {
        code.forIn('key', dataVar, () => {
          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
          for (const [pattern, patternSchema] of Object.entries(schema.patternProperties!)) {
            const escapedPattern = escapeString(pattern);
            code.if(`/${escapedPattern}/.test(key)`, () => {
              const propAccessed = `${dataVar}[key]`;
              generateSchemaValidator(code, patternSchema, propAccessed, keyPathExpr, ctx);
            });
          }
        });
      }

      // Handle additionalProperties - only applies to undefined properties not matching patterns
      if (hasAdditionalProps) {
        const definedProps = schema.properties ? Object.keys(schema.properties) : [];
        const patterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

        // Create a Set for O(1) property lookup if there are defined properties
        let propsSetName: string | undefined;
        if (definedProps.length > 0) {
          propsSetName = ctx.genRuntimeName('propsSet');
          ctx.addRuntimeFunction(propsSetName, new Set(definedProps));
        }

        code.forIn('key', dataVar, () => {
          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
          const addPropsSchema = schema.additionalProperties!;

          // Build condition: not a defined prop and not matching any pattern
          const conditions: string[] = [];
          if (propsSetName) {
            conditions.push(`!${propsSetName}.has(key)`);
          }
          for (const pattern of patterns) {
            conditions.push(`!/${escapeString(pattern)}/.test(key)`);
          }

          if (conditions.length > 0) {
            code.if(conditions.join(' && '), () => {
              generateAdditionalPropsCheck(
                code,
                addPropsSchema,
                `${dataVar}[key]`,
                keyPathExpr,
                ctx
              );
            });
          } else {
            generateAdditionalPropsCheck(code, addPropsSchema, `${dataVar}[key]`, keyPathExpr, ctx);
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
  if (schema.contains === undefined) return;

  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  // Handle boolean schemas directly
  if (containsSchema === true) {
    // Every item matches - just check array length against minContains/maxContains
    code.if(`Array.isArray(${dataVar})`, () => {
      code.if(`${dataVar}.length < ${minContains}`, () => {
        genError(
          code,
          pathExpr,
          'contains',
          `Array must contain at least ${minContains} matching items`
        );
      });
      if (maxContains !== undefined) {
        code.if(`${dataVar}.length > ${maxContains}`, () => {
          genError(
            code,
            pathExpr,
            'maxContains',
            `Array must contain at most ${maxContains} matching items`
          );
        });
      }
    });
    return;
  }

  if (containsSchema === false) {
    // Nothing matches - only valid if minContains is 0
    code.if(`Array.isArray(${dataVar})`, () => {
      if (minContains > 0) {
        genError(
          code,
          pathExpr,
          'contains',
          `Array must contain at least ${minContains} matching items`
        );
      }
      // maxContains is always satisfied since count is 0
    });
    return;
  }

  // Queue the contains schema for compilation (reuses all existing generators)
  const containsFuncName = ctx.queueCompile(containsSchema);

  code.if(`Array.isArray(${dataVar})`, () => {
    const countVar = code.genVar('containsCount');
    code.line(`let ${countVar} = 0;`);

    const iVar = code.genVar('i');
    code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
      const itemAccess = `${dataVar}[${iVar}]`;

      // Call the compiled contains validator (pass null for errors to skip collection)
      code.if(`${containsFuncName}(${itemAccess}, null, '')`, () => {
        code.line(`${countVar}++;`);
      });

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
  if (schema.propertyNames === undefined) return;

  const propNamesSchema = schema.propertyNames;

  // Handle boolean schema for propertyNames
  if (propNamesSchema === true) {
    // All property names are valid - no check needed
    return;
  }

  if (propNamesSchema === false) {
    // No property names are valid - object must be empty
    code.if(
      `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
      () => {
        code.if(`Object.keys(${dataVar}).length > 0`, () => {
          genError(code, pathExpr, 'propertyNames', 'No properties allowed');
        });
      }
    );
    return;
  }

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
  ctx: CompileContext,
  dynamicScopeVar: string = 'dynamicScope'
): void {
  if (!schema.$ref) return;

  // Resolve the reference
  const refSchema = ctx.resolveRef(schema.$ref, schema);

  if (!refSchema) {
    // Can't resolve - schema is invalid, always fail
    genError(code, pathExpr, '$ref', `Cannot resolve reference ${schema.$ref}`);
    return;
  }

  // Get the function name (queue for compilation if needed)
  const funcName = ctx.getCompiledName(refSchema) ?? ctx.queueCompile(refSchema);

  // Check if the $ref is entering a new schema resource
  // This happens when the $ref has a URI part (not just a fragment)
  // E.g., "second#/$defs/stuff" enters the "second" resource
  const refResourceId = ctx.getRefResourceId(schema.$ref, schema);

  if (refResourceId) {
    const resourceAnchors = ctx.getResourceDynamicAnchors(refResourceId);
    if (resourceAnchors.length > 0) {
      // Push dynamic anchors for this resource, call validator, then pop
      code.block('', () => {
        const pushCount = resourceAnchors.length;
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName =
            ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
          code.line(
            `${dynamicScopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
          );
        }
        code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
          // Pop before returning
          for (let i = 0; i < pushCount; i++) {
            code.line(`${dynamicScopeVar}.pop();`);
          }
          code.line('return false;');
        });
        // Pop after successful validation
        for (let i = 0; i < pushCount; i++) {
          code.line(`${dynamicScopeVar}.pop();`);
        }
      });
      return;
    }
  }

  // No dynamic anchors to push - simple call
  code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
    code.line('return false;');
  });
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
        const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
        code.line(`${resultVar} = ${checkExpr};`);
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
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
      code.line(`if (${checkExpr}) ${countVar}++;`);

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
    const checkExpr = generateSubschemaCheck(notSchema, dataVar, ctx);
    code.if(checkExpr, () => {
      genError(code, pathExpr, 'not', 'Value must not match schema');
    });
  }

  // if-then-else
  if (schema.if !== undefined) {
    const ifSchema = schema.if;
    const thenSchema = schema.then;
    const elseSchema = schema.else;

    // Check if condition matches
    const condVar = code.genVar('ifCond');
    const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
    code.line(`const ${condVar} = ${checkExpr};`);

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
 * Generate a call to validate against a subschema for anyOf/oneOf/not
 * Returns a code expression that evaluates to true if the subschema matches
 */
function generateSubschemaCheck(
  schema: JsonSchema,
  dataVar: string,
  ctx: CompileContext,
  dynamicScopeVar: string = 'dynamicScope'
): string {
  if (schema === true) return 'true';
  if (schema === false) return 'false';

  // Compile the subschema as a separate function to handle all keywords including composition
  const funcName = ctx.queueCompile(schema);
  return `${funcName}(${dataVar}, null, '', ${dynamicScopeVar})`;
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
  ctx: CompileContext,
  dynamicScopeVar: string = 'dynamicScope'
): void {
  if (!schema.$dynamicRef) return;

  const ref = schema.$dynamicRef;

  // Check if this ref contains an anchor fragment (like #items or extended#meta)
  // The anchor must be a plain name (not a JSON pointer like #/defs/foo)
  const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);

  if (anchorMatch) {
    // This is an anchor reference - first resolve statically
    const anchorName = anchorMatch[1];

    // Resolve the static fallback
    const staticSchema = ctx.resolveRef(ref, schema);
    if (!staticSchema) {
      genError(code, pathExpr, '$dynamicRef', `Cannot resolve reference ${ref}`);
      return;
    }
    const staticFuncName = ctx.queueCompile(staticSchema);

    // Check if the statically resolved schema has a matching $dynamicAnchor
    // If not, $dynamicRef behaves like a regular $ref (no dynamic scope search)
    const hasDynamicAnchor =
      typeof staticSchema === 'object' &&
      staticSchema !== null &&
      staticSchema.$dynamicAnchor === anchorName;

    if (!hasDynamicAnchor) {
      // No matching $dynamicAnchor - behave like a regular $ref
      code.if(`!${staticFuncName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
        code.line('return false;');
      });
    } else {
      // Has matching $dynamicAnchor - search dynamic scope at runtime
      // The dynamic scope is searched from the BEGINNING (outermost/first) to find the first match
      code.block('', () => {
        code.line(`let dynamicValidator = null;`);
        code.line(`for (let i = 0; i < ${dynamicScopeVar}.length; i++) {`);
        code.line(`  if (${dynamicScopeVar}[i].anchor === ${stringify(anchorName)}) {`);
        code.line(`    dynamicValidator = ${dynamicScopeVar}[i].validate;`);
        code.line(`    break;`);
        code.line(`  }`);
        code.line(`}`);
        // Use dynamic validator if found, otherwise use static fallback
        code.line(`const validator = dynamicValidator || ${staticFuncName};`);
        code.if(`!validator(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
          code.line('return false;');
        });
      });
    }
  } else {
    // Not an anchor reference - resolve statically like $ref
    // This handles cases like $dynamicRef: "#/$defs/items"
    const refSchema = ctx.resolveRef(ref, schema);

    if (!refSchema) {
      genError(code, pathExpr, '$dynamicRef', `Cannot resolve reference ${ref}`);
      return;
    }

    const funcName = ctx.queueCompile(refSchema);
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
      code.line('return false;');
    });
  }
}

/**
 * Collect properties evaluated by a schema recursively (follows all keywords that evaluate properties)
 * This is used for runtime tracking of which branch matched
 * @param recurseComposition - if true, also recurse into anyOf/oneOf (for branch evaluation)
 */
function collectLocalEvaluatedProperties(
  schema: JsonSchema,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set(),
  recurseComposition: boolean = true
): {
  props: string[];
  patterns: string[];
  hasAdditional: boolean;
  hasUnevaluatedTrue: boolean;
} {
  if (typeof schema !== 'object' || schema === null) {
    return { props: [], patterns: [], hasAdditional: false, hasUnevaluatedTrue: false };
  }

  if (visited.has(schema)) {
    return { props: [], patterns: [], hasAdditional: false, hasUnevaluatedTrue: false };
  }
  visited.add(schema);

  const props: string[] = [];
  const patterns: string[] = [];
  let hasAdditional = false;
  let hasUnevaluatedTrue = false;

  // Check for unevaluatedProperties: true which evaluates all properties
  if (schema.unevaluatedProperties === true) {
    hasUnevaluatedTrue = true;
  }

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      const collected = collectLocalEvaluatedProperties(
        refSchema,
        ctx,
        visited,
        recurseComposition
      );
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }
  }

  // Follow $dynamicRef - need to collect from ALL possible dynamic targets
  if (schema.$dynamicRef) {
    const ref = schema.$dynamicRef;
    const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      // Get all schemas with this dynamic anchor
      const anchorName = anchorMatch[1];
      const dynamicSchemas = ctx.getDynamicAnchors(anchorName);
      for (const dynSchema of dynamicSchemas) {
        const collected = collectLocalEvaluatedProperties(
          dynSchema,
          ctx,
          new Set(visited),
          recurseComposition
        );
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    } else {
      // Not a dynamic anchor ref, resolve statically
      const refSchema = ctx.resolveRef(ref, schema);
      if (refSchema) {
        const collected = collectLocalEvaluatedProperties(
          refSchema,
          ctx,
          visited,
          recurseComposition
        );
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    }
  }

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

  // allOf - recurse (allOf always applies)
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      const collected = collectLocalEvaluatedProperties(sub, ctx, visited, recurseComposition);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }
  }

  // For branch evaluation, also recurse into anyOf/oneOf
  if (recurseComposition) {
    // anyOf - recurse
    if (schema.anyOf) {
      for (const sub of schema.anyOf) {
        const collected = collectLocalEvaluatedProperties(sub, ctx, visited, true);
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    }

    // oneOf - recurse
    if (schema.oneOf) {
      for (const sub of schema.oneOf) {
        const collected = collectLocalEvaluatedProperties(sub, ctx, visited, true);
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    }

    // if - collect from if schema when it matches
    if (schema.if) {
      const collected = collectLocalEvaluatedProperties(schema.if, ctx, visited, true);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }

    // then - collect when if matches
    if (schema.then) {
      const collected = collectLocalEvaluatedProperties(schema.then, ctx, visited, true);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }

    // else - collect when if doesn't match
    if (schema.else) {
      const collected = collectLocalEvaluatedProperties(schema.else, ctx, visited, true);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }
  }

  return {
    props: [...new Set(props)],
    patterns: [...new Set(patterns)],
    hasAdditional,
    hasUnevaluatedTrue,
  };
}

/**
 * Collect nested composition keywords (anyOf/oneOf/if-then-else) from allOf branches
 * These need runtime evaluation for unevaluatedProperties
 */
function collectNestedCompositions(
  schema: JsonSchema,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set()
): Array<{ type: 'anyOf' | 'oneOf' | 'if'; schemas: readonly JsonSchema[] }> {
  if (typeof schema !== 'object' || schema === null) return [];
  if (visited.has(schema)) return [];
  visited.add(schema);

  const result: Array<{ type: 'anyOf' | 'oneOf' | 'if'; schemas: readonly JsonSchema[] }> = [];

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      result.push(...collectNestedCompositions(refSchema, ctx, visited));
    }
  }

  // Check allOf for nested composition keywords
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      if (typeof sub === 'object' && sub !== null) {
        // Check for anyOf in this allOf branch
        if (sub.anyOf && sub.anyOf.length > 0) {
          result.push({ type: 'anyOf', schemas: sub.anyOf });
        }
        // Check for oneOf in this allOf branch
        if (sub.oneOf && sub.oneOf.length > 0) {
          result.push({ type: 'oneOf', schemas: sub.oneOf });
        }
        // Check for if/then/else in this allOf branch
        if (sub.if !== undefined) {
          const ifSchemas: JsonSchema[] = [sub.if];
          if (sub.then) ifSchemas.push(sub.then);
          if (sub.else) ifSchemas.push(sub.else);
          result.push({ type: 'if', schemas: ifSchemas });
        }
        // Recurse into nested allOf
        result.push(...collectNestedCompositions(sub, ctx, visited));
      }
    }
  }

  return result;
}

/**
 * Generate runtime code to collect evaluated properties from a matched branch,
 * recursively handling nested oneOf/anyOf
 */
function generateBranchEvaluatedProperties(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set()
): void {
  if (typeof schema !== 'object' || schema === null) return;
  if (visited.has(schema)) return;
  visited.add(schema);

  // Collect static properties (not recursing into oneOf/anyOf)
  const staticProps = collectLocalEvaluatedProperties(schema, ctx, new Set(), false);

  // Add static props and patterns
  if (staticProps.props.length > 0) {
    code.line(`${stringify(staticProps.props)}.forEach(p => evaluatedProps.add(p));`);
  }
  if (staticProps.patterns.length > 0) {
    code.line(`evaluatedPatterns.push(...${stringify(staticProps.patterns)});`);
  }
  if (staticProps.hasAdditional || staticProps.hasUnevaluatedTrue) {
    code.line('allPropsEvaluated = true;');
    return; // No need to check further
  }

  // Resolve $ref and check its nested compositions
  let targetSchema = schema;
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema && typeof refSchema === 'object' && refSchema !== null) {
      targetSchema = refSchema;
    }
  }

  // Handle nested oneOf - check which branch matches and recursively collect
  if (typeof targetSchema === 'object' && targetSchema !== null && targetSchema.oneOf) {
    for (const subSchema of targetSchema.oneOf) {
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
      code.if(checkExpr, () => {
        generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx, new Set(visited));
      });
    }
  }

  // Handle nested anyOf - check all matching branches
  if (typeof targetSchema === 'object' && targetSchema !== null && targetSchema.anyOf) {
    for (const subSchema of targetSchema.anyOf) {
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
      code.if(checkExpr, () => {
        generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx, new Set(visited));
      });
    }
  }

  // Handle nested if/then/else
  if (typeof targetSchema === 'object' && targetSchema !== null && targetSchema.if !== undefined) {
    const ifSchema = targetSchema.if;
    const condVar = code.genVar('nestedIfCond');
    const condCheckExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
    code.line(`const ${condVar} = ${condCheckExpr};`);

    code.if(condVar, () => {
      generateBranchEvaluatedProperties(code, ifSchema, dataVar, ctx, new Set(visited));
      if (targetSchema.then) {
        generateBranchEvaluatedProperties(code, targetSchema.then, dataVar, ctx, new Set(visited));
      }
    });
    if (targetSchema.else) {
      code.else(() => {
        generateBranchEvaluatedProperties(code, targetSchema.else!, dataVar, ctx, new Set(visited));
      });
    }
  }
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

  // Collect static evaluated properties (from properties, patternProperties, additionalProperties, allOf, $ref)
  // Don't recurse into anyOf/oneOf/if-then-else - those need runtime evaluation
  const {
    props: staticProps,
    patterns: staticPatterns,
    hasAdditional,
    hasUnevaluatedTrue,
  } = collectLocalEvaluatedProperties(schema, ctx, new Set(), false);

  // If additionalProperties is set or unevaluatedProperties: true is in allOf, all properties are evaluated
  if (hasAdditional || hasUnevaluatedTrue) {
    return; // Nothing to check
  }

  // Collect information about runtime-evaluated branches
  const hasAnyOf = schema.anyOf && schema.anyOf.length > 0;
  const hasOneOf = schema.oneOf && schema.oneOf.length > 0;
  const hasIfThenElse = schema.if !== undefined;
  const hasDependentSchemas =
    schema.dependentSchemas && Object.keys(schema.dependentSchemas).length > 0;

  // Collect nested composition keywords from allOf that need runtime evaluation
  const nestedCompositions = collectNestedCompositions(schema, ctx);
  const hasNestedCompositions = nestedCompositions.length > 0;

  // Need runtime evaluation if we have any conditional keywords
  const needsRuntimeEval =
    hasAnyOf || hasOneOf || hasIfThenElse || hasDependentSchemas || hasNestedCompositions;

  // Only check if data is an object
  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      if (needsRuntimeEval) {
        // Create runtime arrays/sets for evaluated properties
        code.line(`const evaluatedProps = new Set(${stringify(staticProps)});`);
        code.line(`const evaluatedPatterns = ${stringify(staticPatterns)}.slice();`);
        code.line(`let allPropsEvaluated = false;`);

        // Handle if/then/else
        if (hasIfThenElse) {
          const ifSchema = schema.if!;
          const condVar = code.genVar('ifCond');
          const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
          code.line(`const ${condVar} = ${checkExpr};`);

          // When if matches, collect properties from the if schema itself
          code.if(condVar, () => {
            const ifProps = collectLocalEvaluatedProperties(ifSchema, ctx);
            if (ifProps.props.length > 0) {
              code.line(`${stringify(ifProps.props)}.forEach(p => evaluatedProps.add(p));`);
            }
            if (ifProps.patterns.length > 0) {
              code.line(`evaluatedPatterns.push(...${stringify(ifProps.patterns)});`);
            }
            if (ifProps.hasAdditional || ifProps.hasUnevaluatedTrue) {
              code.line('allPropsEvaluated = true;');
            }

            // Also add then properties if then exists
            if (schema.then) {
              const thenProps = collectLocalEvaluatedProperties(schema.then, ctx);
              if (thenProps.props.length > 0) {
                code.line(`${stringify(thenProps.props)}.forEach(p => evaluatedProps.add(p));`);
              }
              if (thenProps.patterns.length > 0) {
                code.line(`evaluatedPatterns.push(...${stringify(thenProps.patterns)});`);
              }
              if (thenProps.hasAdditional || thenProps.hasUnevaluatedTrue) {
                code.line('allPropsEvaluated = true;');
              }
            }
          });

          // When if doesn't match, add else properties
          if (schema.else) {
            code.else(() => {
              const elseProps = collectLocalEvaluatedProperties(schema.else!, ctx);
              if (elseProps.props.length > 0) {
                code.line(`${stringify(elseProps.props)}.forEach(p => evaluatedProps.add(p));`);
              }
              if (elseProps.patterns.length > 0) {
                code.line(`evaluatedPatterns.push(...${stringify(elseProps.patterns)});`);
              }
              if (elseProps.hasAdditional || elseProps.hasUnevaluatedTrue) {
                code.line('allPropsEvaluated = true;');
              }
            });
          }
        }

        // Handle anyOf - add properties from ALL matching branches
        if (hasAnyOf) {
          for (const subSchema of schema.anyOf!) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx);
            });
          }
        }

        // Handle oneOf - add properties from THE matching branch
        if (hasOneOf) {
          for (const subSchema of schema.oneOf!) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx);
            });
          }
        }

        // Handle dependentSchemas - add properties from matching schemas
        if (hasDependentSchemas) {
          for (const [triggerProp, depSchema] of Object.entries(schema.dependentSchemas!)) {
            const depProps = collectLocalEvaluatedProperties(depSchema, ctx);
            if (
              depProps.props.length > 0 ||
              depProps.patterns.length > 0 ||
              depProps.hasAdditional ||
              depProps.hasUnevaluatedTrue
            ) {
              code.if(`Object.hasOwn(${dataVar}, '${escapeString(triggerProp)}')`, () => {
                if (depProps.props.length > 0) {
                  code.line(`${stringify(depProps.props)}.forEach(p => evaluatedProps.add(p));`);
                }
                if (depProps.patterns.length > 0) {
                  code.line(`evaluatedPatterns.push(...${stringify(depProps.patterns)});`);
                }
                if (depProps.hasAdditional || depProps.hasUnevaluatedTrue) {
                  code.line('allPropsEvaluated = true;');
                }
              });
            }
          }
        }

        // Handle nested compositions from allOf (anyOf/oneOf/if inside allOf)
        if (hasNestedCompositions) {
          for (const comp of nestedCompositions) {
            if (comp.type === 'anyOf' || comp.type === 'oneOf') {
              // For each branch, check if it matches and add its properties
              for (const subSchema of comp.schemas) {
                const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
                code.if(checkExpr, () => {
                  generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx);
                });
              }
            }
            // Note: nested if/then/else is handled similarly but we'd need the if schema to check the condition
          }
        }

        // Now check unevaluated properties using the runtime-built sets
        code.if('!allPropsEvaluated', () => {
          code.forIn('key', dataVar, () => {
            code.if(
              '!evaluatedProps.has(key) && !evaluatedPatterns.some(p => new RegExp(p).test(key))',
              () => {
                const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
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
              }
            );
          });
        });
      } else {
        // No runtime evaluation needed, use static evaluation
        code.forIn('key', dataVar, () => {
          const conditions: string[] = [];

          if (staticProps.length > 0) {
            conditions.push(`!${stringify(staticProps)}.includes(key)`);
          }

          for (const pattern of staticPatterns) {
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
 * @param recurseComposition - if false, don't recurse into anyOf/oneOf/if-then-else
 */
function collectEvaluatedItems(
  schema: JsonSchema,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set(),
  recurseComposition: boolean = true
): {
  prefixCount: number;
  hasItems: boolean;
  hasUnevaluatedItemsTrue: boolean;
  containsSchemas: JsonSchema[];
} {
  if (typeof schema !== 'object' || schema === null) {
    return { prefixCount: 0, hasItems: false, hasUnevaluatedItemsTrue: false, containsSchemas: [] };
  }

  // Prevent infinite recursion for circular refs
  if (visited.has(schema)) {
    return { prefixCount: 0, hasItems: false, hasUnevaluatedItemsTrue: false, containsSchemas: [] };
  }
  visited.add(schema);

  let prefixCount = schema.prefixItems?.length ?? 0;
  let hasItems = schema.items !== undefined && schema.items !== false;
  let hasUnevaluatedItemsTrue = schema.unevaluatedItems === true;
  const containsSchemas: JsonSchema[] = schema.contains ? [schema.contains] : [];

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      const collected = collectEvaluatedItems(refSchema, ctx, visited, recurseComposition);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
  }

  // Follow $dynamicRef - need to collect from ALL possible dynamic targets
  if (schema.$dynamicRef) {
    const ref = schema.$dynamicRef;
    const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      // Get all schemas with this dynamic anchor
      const anchorName = anchorMatch[1];
      const dynamicSchemas = ctx.getDynamicAnchors(anchorName);
      for (const dynSchema of dynamicSchemas) {
        const collected = collectEvaluatedItems(
          dynSchema,
          ctx,
          new Set(visited),
          recurseComposition
        );
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    } else {
      // Not a dynamic anchor ref, resolve statically
      const refSchema = ctx.resolveRef(ref, schema);
      if (refSchema) {
        const collected = collectEvaluatedItems(refSchema, ctx, visited, recurseComposition);
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    }
  }

  // allOf - take maximum prefix count
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      const collected = collectEvaluatedItems(sub, ctx, visited, recurseComposition);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
  }

  // Only recurse into anyOf/oneOf/if-then-else if recurseComposition is true
  if (recurseComposition) {
    // anyOf - take maximum prefix count
    if (schema.anyOf) {
      for (const sub of schema.anyOf) {
        const collected = collectEvaluatedItems(sub, ctx, visited, true);
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    }

    // oneOf - take maximum prefix count
    if (schema.oneOf) {
      for (const sub of schema.oneOf) {
        const collected = collectEvaluatedItems(sub, ctx, visited, true);
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    }

    // if/then/else
    if (schema.if) {
      const collected = collectEvaluatedItems(schema.if, ctx, visited, true);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
    if (schema.then) {
      const collected = collectEvaluatedItems(schema.then, ctx, visited, true);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
    if (schema.else) {
      const collected = collectEvaluatedItems(schema.else, ctx, visited, true);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
  }

  return { prefixCount, hasItems, hasUnevaluatedItemsTrue, containsSchemas };
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

  // Collect info about evaluated items from the schema tree (static, without anyOf/oneOf/if-then-else)
  const {
    prefixCount: staticPrefixCount,
    hasItems,
    hasUnevaluatedItemsTrue,
    containsSchemas,
  } = collectEvaluatedItems(schema, ctx, new Set(), false);

  // If items is defined and not false anywhere, or unevaluatedItems: true is in allOf, all items are evaluated
  if (hasItems || hasUnevaluatedItemsTrue) {
    return; // Nothing to check
  }

  // Check if we need runtime evaluation for anyOf/oneOf/if-then-else
  const hasAnyOf = schema.anyOf && schema.anyOf.length > 0;
  const hasOneOf = schema.oneOf && schema.oneOf.length > 0;
  const hasIfThenElse = schema.if !== undefined;
  const hasContains = containsSchemas.length > 0;
  const needsRuntimeEval = hasAnyOf || hasOneOf || hasIfThenElse || hasContains;

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    if (needsRuntimeEval) {
      // Create a set to track which items are evaluated
      const evaluatedSetVar = code.genVar('evaluatedItems');
      code.line(`const ${evaluatedSetVar} = new Set();`);
      code.line(`let maxEvaluatedIndex = ${staticPrefixCount - 1};`);

      // Mark static prefixItems as evaluated
      if (staticPrefixCount > 0) {
        const iVar = code.genVar('i');
        code.for(
          `let ${iVar} = 0`,
          `${iVar} < Math.min(${staticPrefixCount}, ${dataVar}.length)`,
          `${iVar}++`,
          () => {
            code.line(`${evaluatedSetVar}.add(${iVar});`);
          }
        );
      }

      // Handle contains - check each item against all contains schemas
      for (const containsSchema of containsSchemas) {
        const iVar = code.genVar('i');
        code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
          const checkExpr = generateSubschemaCheck(containsSchema, `${dataVar}[${iVar}]`, ctx);
          code.if(checkExpr, () => {
            code.line(`${evaluatedSetVar}.add(${iVar});`);
          });
        });
      }

      // Handle anyOf - check which branches match and get their prefixItems count
      if (hasAnyOf) {
        for (const subSchema of schema.anyOf!) {
          const subCollected = collectEvaluatedItems(subSchema, ctx, new Set(), true);
          if (
            subCollected.prefixCount > 0 ||
            subCollected.hasItems ||
            subCollected.containsSchemas.length > 0
          ) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              if (subCollected.hasItems) {
                // All items are evaluated
                code.line(`for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`);
              } else {
                if (subCollected.prefixCount > 0) {
                  code.line(
                    `for (let k = 0; k < Math.min(${subCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
                  );
                }
                // Handle nested contains
                for (const nestedContains of subCollected.containsSchemas) {
                  const kVar = code.genVar('k');
                  code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
                    const nestedCheck = generateSubschemaCheck(
                      nestedContains,
                      `${dataVar}[${kVar}]`,
                      ctx
                    );
                    code.if(nestedCheck, () => {
                      code.line(`${evaluatedSetVar}.add(${kVar});`);
                    });
                  });
                }
              }
            });
          }
        }
      }

      // Handle oneOf - similar to anyOf
      if (hasOneOf) {
        for (const subSchema of schema.oneOf!) {
          const subCollected = collectEvaluatedItems(subSchema, ctx, new Set(), true);
          if (
            subCollected.prefixCount > 0 ||
            subCollected.hasItems ||
            subCollected.containsSchemas.length > 0
          ) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              if (subCollected.hasItems) {
                code.line(`for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`);
              } else {
                if (subCollected.prefixCount > 0) {
                  code.line(
                    `for (let k = 0; k < Math.min(${subCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
                  );
                }
                for (const nestedContains of subCollected.containsSchemas) {
                  const kVar = code.genVar('k');
                  code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
                    const nestedCheck = generateSubschemaCheck(
                      nestedContains,
                      `${dataVar}[${kVar}]`,
                      ctx
                    );
                    code.if(nestedCheck, () => {
                      code.line(`${evaluatedSetVar}.add(${kVar});`);
                    });
                  });
                }
              }
            });
          }
        }
      }

      // Handle if/then/else - recursively handles nested if/then/else in then/else branches
      if (hasIfThenElse) {
        generateIfThenElseEvaluatedItems(code, schema, dataVar, evaluatedSetVar, ctx);
      }

      // Now validate unevaluated items
      if (schema.unevaluatedItems === false) {
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
      // No runtime evaluation needed, use simpler static evaluation
      if (schema.unevaluatedItems === false) {
        if (staticPrefixCount > 0) {
          code.if(`${dataVar}.length > ${staticPrefixCount}`, () => {
            const itemPathExpr =
              pathExpr === "''"
                ? `'[' + ${staticPrefixCount} + ']'`
                : `${pathExpr} + '[' + ${staticPrefixCount} + ']'`;
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
        code.for(
          `let ${iVar} = ${staticPrefixCount}`,
          `${iVar} < ${dataVar}.length`,
          `${iVar}++`,
          () => {
            const itemPathExpr =
              pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;
            generateSchemaValidator(
              code,
              schema.unevaluatedItems as JsonSchema,
              `${dataVar}[${iVar}]`,
              itemPathExpr,
              ctx
            );
          }
        );
      }
    }
  });
}

/**
 * Recursively generate code to track evaluated items for if/then/else
 * This handles nested if/then/else structures properly
 */
function generateIfThenElseEvaluatedItems(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  evaluatedSetVar: string,
  ctx: CompileContext
): void {
  if (schema.if === undefined) return;

  const ifSchema = schema.if;
  const condVar = code.genVar('ifCond');
  const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
  code.line(`const ${condVar} = ${checkExpr};`);

  // When if matches, add items from if and then
  code.if(condVar, () => {
    // Add evaluated items from the if schema itself
    const ifCollected = collectEvaluatedItems(ifSchema, ctx, new Set(), false);
    if (ifCollected.prefixCount > 0) {
      code.line(
        `for (let k = 0; k < Math.min(${ifCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
      );
    }
    // Add items matched by contains in the if schema
    for (const nestedContains of ifCollected.containsSchemas) {
      const kVar = code.genVar('k');
      code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
        const nestedCheck = generateSubschemaCheck(nestedContains, `${dataVar}[${kVar}]`, ctx);
        code.if(nestedCheck, () => {
          code.line(`${evaluatedSetVar}.add(${kVar});`);
        });
      });
    }

    // Handle the then branch
    if (schema.then) {
      const thenSchema = schema.then;
      // First add simple items from then (not from nested if/then)
      const thenCollected = collectEvaluatedItems(thenSchema, ctx, new Set(), false);
      if (thenCollected.hasItems) {
        code.line(`for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`);
      } else if (thenCollected.prefixCount > 0) {
        code.line(
          `for (let k = 0; k < Math.min(${thenCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
        );
      }
      for (const nestedContains of thenCollected.containsSchemas) {
        const kVar = code.genVar('k');
        code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
          const nestedCheck = generateSubschemaCheck(nestedContains, `${dataVar}[${kVar}]`, ctx);
          code.if(nestedCheck, () => {
            code.line(`${evaluatedSetVar}.add(${kVar});`);
          });
        });
      }

      // Recursively handle nested if/then/else in the then branch
      if (typeof thenSchema === 'object' && thenSchema !== null && thenSchema.if !== undefined) {
        generateIfThenElseEvaluatedItems(code, thenSchema, dataVar, evaluatedSetVar, ctx);
      }
    }
  });

  // When if doesn't match, add items from else
  if (schema.else) {
    code.else(() => {
      const elseSchema = schema.else!;
      const elseCollected = collectEvaluatedItems(elseSchema, ctx, new Set(), false);
      if (elseCollected.hasItems) {
        code.line(`for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`);
      } else if (elseCollected.prefixCount > 0) {
        code.line(
          `for (let k = 0; k < Math.min(${elseCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
        );
      }
      for (const nestedContains of elseCollected.containsSchemas) {
        const kVar = code.genVar('k');
        code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
          const nestedCheck = generateSubschemaCheck(nestedContains, `${dataVar}[${kVar}]`, ctx);
          code.if(nestedCheck, () => {
            code.line(`${evaluatedSetVar}.add(${kVar});`);
          });
        });
      }

      // Recursively handle nested if/then/else in the else branch
      if (typeof elseSchema === 'object' && elseSchema !== null && elseSchema.if !== undefined) {
        generateIfThenElseEvaluatedItems(code, elseSchema, dataVar, evaluatedSetVar, ctx);
      }
    });
  }
}
