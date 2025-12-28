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

  // In legacy mode (draft-07 and earlier), skip dynamic scope entirely for better performance
  const useDynamicScope = !ctx.options.legacyRef;
  const dynamicScopeVar = useDynamicScope ? 'dynamicScope' : '';

  // Collect dynamic anchors from the root resource to add to scope at startup
  const anchorFuncNames: Array<{ anchor: string; funcName: string }> = [];
  if (useDynamicScope) {
    const rootResourceId =
      typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : '__root__';
    const rootDynamicAnchors = ctx.getResourceDynamicAnchors(rootResourceId);

    // Queue root resource's dynamic anchors for compilation FIRST
    // This ensures they get compiled before we process the queue
    for (const { anchor, schema: anchorSchema } of rootDynamicAnchors) {
      const funcName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
      anchorFuncNames.push({ anchor, funcName });
    }
  }

  // Generate code for main schema
  generateSchemaValidator(code, schema, 'data', "''", ctx, dynamicScopeVar);

  // Process any queued schemas (from $ref)
  let queued: { schema: JsonSchema; funcName: string } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    code.blank();
    if (useDynamicScope) {
      code.block(`function ${q.funcName}(data, errors, path, dynamicScope)`, () => {
        generateSchemaValidator(code, q.schema, 'data', 'path', ctx, 'dynamicScope');
        code.line('return true;');
      });
    } else {
      // In legacy mode, skip dynamicScope parameter for faster function calls
      code.block(`function ${q.funcName}(data, errors, path)`, () => {
        generateSchemaValidator(code, q.schema, 'data', 'path', ctx, '');
        code.line('return true;');
      });
    }
  }

  // Build the final function
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());
  const runtimeValues = Array.from(runtimeFuncs.values());

  // Push root resource's dynamic anchors to scope at startup (only in modern mode)
  let scopeInit = '';
  if (useDynamicScope) {
    scopeInit = 'const dynamicScope = [];\n';
    for (const { anchor, funcName } of anchorFuncNames) {
      scopeInit += `dynamicScope.push({ anchor: ${stringify(anchor)}, validate: ${funcName} });\n`;
    }
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
  dynamicScopeVar?: string
): void {
  // In legacy mode, never use dynamic scope
  const scopeVar = ctx.options.legacyRef ? '' : (dynamicScopeVar ?? 'dynamicScope');
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
  // Skip this in legacy mode ($dynamicAnchor is a draft-2020-12 feature)
  let resourceAnchors: Array<{ anchor: string; schema: JsonSchema }> = [];
  if (scopeVar && schema.$id) {
    const schemaResourceId = ctx.getBaseUri(schema);
    resourceAnchors = schemaResourceId ? ctx.getResourceDynamicAnchors(schemaResourceId) : [];

    if (resourceAnchors.length > 0) {
      // Push dynamic anchors for this resource
      for (const { anchor, schema: anchorSchema } of resourceAnchors) {
        const anchorFuncName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
        code.line(
          `${scopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
        );
      }
    }
  }

  // In legacy mode (draft-07 and earlier), $ref overrides all sibling keywords
  // Only generate $ref check and skip everything else
  if (schema.$ref && ctx.options.legacyRef) {
    generateRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
  } else {
    // Generate JIT code for each keyword (draft-2020-12 behavior)
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
    generateRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
    generateDynamicRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
    generateContainsCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependentRequiredCheck(code, schema, dataVar, pathExpr, ctx);
    generatePropertyNamesCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependentSchemasCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependenciesCheck(code, schema, dataVar, pathExpr, ctx);
    generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExpr, ctx);
    generateUnevaluatedItemsCheck(code, schema, dataVar, pathExpr, ctx);
  }

  // Pop dynamic anchors after validation (if we pushed any)
  if (resourceAnchors.length > 0) {
    for (let i = 0; i < resourceAnchors.length; i++) {
      code.line(`${scopeVar}.pop();`);
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
  // IPv6 validation helper - handles full, compressed, and IPv4-mapped formats
  const isValidIPv6 = (s: string): boolean => {
    // Handle IPv4-mapped IPv6 (::ffff:192.0.2.1)
    const ipv4Suffix = s.match(/:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
    if (ipv4Suffix) {
      const ipv4 = ipv4Suffix[1];
      const octets = ipv4.split('.');
      if (!octets.every((o) => parseInt(o) <= 255 && !/^0\d/.test(o))) return false;
      s = s.slice(0, -ipv4Suffix[0].length) + ':0:0'; // Replace IPv4 with two groups
    }

    // Check for :: (zero compression)
    const parts = s.split('::');
    if (parts.length > 2) return false;

    if (parts.length === 2) {
      const left = parts[0] ? parts[0].split(':') : [];
      const right = parts[1] ? parts[1].split(':') : [];
      if (left.length + right.length > 7) return false;
      const groups = [...left, ...Array(8 - left.length - right.length).fill('0'), ...right];
      return groups.every((g) => /^[0-9a-f]{1,4}$/i.test(g));
    }

    // No compression - must have exactly 8 groups
    const groups = s.split(':');
    return groups.length === 8 && groups.every((g) => /^[0-9a-f]{1,4}$/i.test(g));
  };

  return {
    // Email: RFC 5321/5322 simplified - no dots at start/end, no consecutive dots
    email: (s) => {
      const atIdx = s.lastIndexOf('@');
      if (atIdx < 1 || atIdx === s.length - 1) return false;
      const local = s.slice(0, atIdx);
      const domain = s.slice(atIdx + 1);
      // Local part: no leading/trailing dots, no consecutive dots
      if (local.startsWith('.') || local.endsWith('.') || /\.\./.test(local)) return false;
      // Basic validation - non-empty parts, domain has at least one dot
      return /^[^\s@]+$/.test(local) && /^[^\s@]+\.[^\s@]+$/.test(domain);
    },
    uuid: (s) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s),
    // Date-time: RFC 3339 with case-insensitive T and Z
    'date-time': (s) => {
      const match = s.match(
        /^(\d{4})-(\d{2})-(\d{2})[Tt](\d{2}):(\d{2}):(\d{2})(\.\d+)?([Zz]|[+-]\d{2}:\d{2})$/
      );
      if (!match) return false;
      const [, , m, d, h, min, sec] = match.map(Number);
      return m >= 1 && m <= 12 && d >= 1 && d <= 31 && h <= 23 && min <= 59 && sec <= 60;
    },
    // URI: RFC 3986 - scheme followed by ":" and scheme-specific part
    uri: (s) => {
      // Must start with scheme (letter followed by letters, digits, +, -, .)
      if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) return false;
      // Must not contain spaces or control chars
      if (/[\s\x00-\x1f]/.test(s)) return false;
      return true;
    },
    ipv4: (s) => {
      const parts = s.split('.');
      if (parts.length !== 4) return false;
      return parts.every((p) => /^\d{1,3}$/.test(p) && parseInt(p) <= 255 && !/^0\d/.test(p));
    },
    ipv6: isValidIPv6,
    date: (s) => {
      const match = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) return false;
      const [, , m, d] = match.map(Number);
      return m >= 1 && m <= 12 && d >= 1 && d <= 31;
    },
    time: (s) => /^\d{2}:\d{2}:\d{2}(\.\d+)?([Zz]|[+-]\d{2}:\d{2})?$/i.test(s),
    duration: (s) =>
      /^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/.test(s) &&
      s !== 'P' &&
      s !== 'PT',
    hostname: (s) =>
      /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(s),
    'uri-reference': (s) => {
      // Empty string is valid (same-document reference)
      if (s === '') return true;
      // Must not contain spaces or certain control chars
      if (/[\s\x00-\x1f]/.test(s)) return false;
      // Fragment-only is valid
      if (s.startsWith('#')) return true;
      // If has scheme, validate as URI
      if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return true;
      // Relative reference - basic validation
      return true;
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
    // All primitives - use Set for O(1) lookup
    const setName = ctx.genRuntimeName('enumSet');
    ctx.addRuntimeFunction(setName, new Set(primitives));
    code.if(`!${setName}.has(${dataVar})`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  } else if (primitives.length === 0) {
    // All complex - use deepEqual for all
    const arrName = ctx.genRuntimeName('enumArr');
    ctx.addRuntimeFunction(arrName, complexValues);
    code.if(`!${arrName}.some(v => deepEqual(${dataVar}, v))`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  } else {
    // Mixed: check primitives with Set, complex with deepEqual
    // Only call deepEqual if data is an object (since primitives are already covered by Set)
    const setName = ctx.genRuntimeName('enumSet');
    ctx.addRuntimeFunction(setName, new Set(primitives));
    const arrName = ctx.genRuntimeName('enumArr');
    ctx.addRuntimeFunction(arrName, complexValues);
    code.if(
      `!${setName}.has(${dataVar}) && (typeof ${dataVar} !== 'object' || ${dataVar} === null || !${arrName}.some(v => deepEqual(${dataVar}, v)))`,
      () => {
        genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
      }
    );
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
  ctx: CompileContext
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
      // Pre-compile regex as a runtime function for consistent performance
      const regexName = ctx.genRuntimeName('pattern');
      ctx.addRuntimeFunction(regexName, new RegExp(schema.pattern));
      code.if(`!${regexName}.test(${dataVar})`, () => {
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
    // Handle minimum with optional exclusiveMinimum (draft4 boolean form)
    if (schema.minimum !== undefined) {
      // In draft4, exclusiveMinimum is a boolean that modifies minimum
      if (schema.exclusiveMinimum === true) {
        code.if(`${dataVar} <= ${schema.minimum}`, () => {
          genError(code, pathExpr, 'minimum', `Value must be > ${schema.minimum}`);
        });
      } else {
        code.if(`${dataVar} < ${schema.minimum}`, () => {
          genError(code, pathExpr, 'minimum', `Value must be >= ${schema.minimum}`);
        });
      }
    }

    // Handle maximum with optional exclusiveMaximum (draft4 boolean form)
    if (schema.maximum !== undefined) {
      // In draft4, exclusiveMaximum is a boolean that modifies maximum
      if (schema.exclusiveMaximum === true) {
        code.if(`${dataVar} >= ${schema.maximum}`, () => {
          genError(code, pathExpr, 'maximum', `Value must be < ${schema.maximum}`);
        });
      } else {
        code.if(`${dataVar} > ${schema.maximum}`, () => {
          genError(code, pathExpr, 'maximum', `Value must be <= ${schema.maximum}`);
        });
      }
    }

    // Handle exclusiveMinimum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMinimum === 'number') {
      code.if(`${dataVar} <= ${schema.exclusiveMinimum}`, () => {
        genError(code, pathExpr, 'exclusiveMinimum', `Value must be > ${schema.exclusiveMinimum}`);
      });
    }

    // Handle exclusiveMaximum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMaximum === 'number') {
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

      // Handle patternProperties and additionalProperties in a single loop
      if (hasPatternProps || hasAdditionalProps) {
        const definedProps = schema.properties ? Object.keys(schema.properties) : [];
        const patterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

        // Pre-compile pattern regexes if we have patterns
        const patternRegexNames: string[] = [];
        for (const pattern of patterns) {
          const regexName = ctx.genRuntimeName('patternRe');
          ctx.addRuntimeFunction(regexName, new RegExp(pattern));
          patternRegexNames.push(regexName);
        }

        code.forIn('key', dataVar, () => {
          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;

          // Generate patternProperties checks first (skip empty schemas that always pass)
          if (hasPatternProps && schema.patternProperties) {
            const patternEntries = Object.entries(schema.patternProperties);
            for (let i = 0; i < patternEntries.length; i++) {
              const [, patternSchema] = patternEntries[i];
              // Skip generating checks for schemas that always pass (true, {}, empty object)
              if (patternSchema === true) continue;
              if (
                typeof patternSchema === 'object' &&
                patternSchema !== null &&
                Object.keys(patternSchema).length === 0
              ) {
                continue;
              }
              const regexName = patternRegexNames[i];
              code.if(`${regexName}.test(key)`, () => {
                const propAccessed = `${dataVar}[key]`;
                generateSchemaValidator(code, patternSchema, propAccessed, keyPathExpr, ctx);
              });
            }
          }

          // Generate additionalProperties check
          if (hasAdditionalProps) {
            const addPropsSchema = schema.additionalProperties!;

            // Build condition: not a defined prop and not matching any pattern
            // Use inline comparisons for small numbers of properties (faster than Set.has)
            const conditions: string[] = [];

            // For defined properties, use inline comparison for up to ~10 props
            if (definedProps.length > 0 && definedProps.length <= 10) {
              const propChecks = definedProps
                .map((p) => `key !== "${escapeString(p)}"`)
                .join(' && ');
              conditions.push(`(${propChecks})`);
            } else if (definedProps.length > 10) {
              // Use Set for larger number of properties
              const propsSetName = ctx.genRuntimeName('propsSet');
              ctx.addRuntimeFunction(propsSetName, new Set(definedProps));
              conditions.push(`!${propsSetName}.has(key)`);
            }

            // Pattern checks using pre-compiled regexes
            for (const regexName of patternRegexNames) {
              conditions.push(`!${regexName}.test(key)`);
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
 * Generate legacy dependencies check (draft-07)
 * dependencies can contain either:
 * - array of strings (like dependentRequired)
 * - schema object (like dependentSchemas)
 */
export function generateDependenciesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.dependencies) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, dep] of Object.entries(schema.dependencies!)) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          if (Array.isArray(dep)) {
            // Array of required property names
            for (const reqProp of dep) {
              const reqPropStr = escapeString(reqProp);
              const reqPathExpr =
                pathExpr === "''" ? `'${reqPropStr}'` : `${pathExpr} + '.${reqPropStr}'`;
              code.if(`!('${reqPropStr}' in ${dataVar})`, () => {
                code.line(
                  `if (errors) errors.push({ path: ${reqPathExpr}, message: 'Property required when ${propStr} is present', keyword: 'dependencies' });`
                );
                code.line('return false;');
              });
            }
          } else {
            // Schema that must validate
            generateSchemaValidator(code, dep as JsonSchema, dataVar, pathExpr, ctx);
          }
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

  // In legacy mode, dynamicScopeVar is empty - simpler function call
  if (!dynamicScopeVar) {
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr})`, () => {
      code.line('return false;');
    });
    return;
  }

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
function generateSubschemaCheck(schema: JsonSchema, dataVar: string, ctx: CompileContext): string {
  if (schema === true) return 'true';
  if (schema === false) return 'false';

  // Compile the subschema as a separate function to handle all keywords including composition
  const funcName = ctx.queueCompile(schema);
  // In legacy mode (draft-07 and earlier), don't pass dynamicScope for faster calls
  if (ctx.options.legacyRef) {
    return `${funcName}(${dataVar}, null, '')`;
  }
  return `${funcName}(${dataVar}, null, '', dynamicScope)`;
}

/**
 * Generate items and prefixItems checks for arrays
 * Supports both draft-2020-12 (prefixItems + items) and draft-07 (items array + additionalItems)
 */
export function generateItemsChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // Draft-07 compatibility: items can be an array (acts like prefixItems)
  const itemsIsArray = Array.isArray(schema.items);
  const tupleSchemas: JsonSchema[] = itemsIsArray
    ? (schema.items as JsonSchema[])
    : schema.prefixItems
      ? [...schema.prefixItems]
      : [];
  const hasTupleItems = tupleSchemas.length > 0;

  // For items after the tuple:
  // - draft-2020-12: use schema.items (if not array)
  // - draft-07: use schema.additionalItems (if items is array)
  let afterTupleSchema: JsonSchema | undefined;
  if (itemsIsArray) {
    afterTupleSchema = schema.additionalItems;
  } else if (!itemsIsArray && schema.items !== undefined) {
    // schema.items is boolean | JsonSchema (not array) here
    afterTupleSchema = schema.items as JsonSchema;
  }
  const hasAfterTupleSchema = afterTupleSchema !== undefined;

  if (!hasTupleItems && !hasAfterTupleSchema) return;

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    // Handle tuple items (prefixItems in 2020-12, items array in draft-07)
    if (hasTupleItems) {
      for (let i = 0; i < tupleSchemas.length; i++) {
        const itemSchema = tupleSchemas[i];
        const itemPathExpr = pathExpr === "''" ? `'[${i}]'` : `${pathExpr} + '[${i}]'`;
        code.if(`${dataVar}.length > ${i}`, () => {
          const itemAccess = `${dataVar}[${i}]`;
          generateSchemaValidator(code, itemSchema, itemAccess, itemPathExpr, ctx);
        });
      }
    }

    // Handle items after tuple (items in 2020-12, additionalItems in draft-07)
    if (hasAfterTupleSchema) {
      const startIndex = tupleSchemas.length;

      if (afterTupleSchema === false) {
        // No additional items allowed
        if (startIndex > 0) {
          code.if(`${dataVar}.length > ${startIndex}`, () => {
            genError(
              code,
              pathExpr,
              itemsIsArray ? 'additionalItems' : 'items',
              `Array must have at most ${startIndex} items`
            );
          });
        } else {
          code.if(`${dataVar}.length > 0`, () => {
            genError(code, pathExpr, 'items', 'Array must be empty');
          });
        }
      } else if (afterTupleSchema !== true) {
        // Validate each item after tuple
        const iVar = code.genVar('i');
        code.for(`let ${iVar} = ${startIndex}`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
          const itemAccess = `${dataVar}[${iVar}]`;
          const itemPathExpr =
            pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;
          generateSchemaValidator(code, afterTupleSchema!, itemAccess, itemPathExpr, ctx);
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
    for (const p of staticProps.props) {
      code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
    }
  }
  if (staticProps.patterns.length > 0) {
    code.line(`dynamicPatterns.push(...${stringify(staticProps.patterns)});`);
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
        // Create runtime object for evaluated properties (faster than Set for property lookup)
        const propsObjInit =
          staticProps.length > 0
            ? `{${staticProps.map((p) => `"${escapeString(p)}": true`).join(', ')}}`
            : '{}';
        code.line(`const evaluatedProps = ${propsObjInit};`);

        // Pre-compile static patterns as runtime regex functions
        const patternVars: string[] = [];
        for (const pattern of staticPatterns) {
          const patternVar = ctx.genRuntimeName('evalPattern');
          ctx.addRuntimeFunction(patternVar, new RegExp(pattern));
          patternVars.push(patternVar);
        }

        // Track dynamic patterns added at runtime
        code.line(`const dynamicPatterns = [];`);
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
            for (const p of ifProps.props) {
              code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
            }
            if (ifProps.patterns.length > 0) {
              code.line(`dynamicPatterns.push(...${stringify(ifProps.patterns)});`);
            }
            if (ifProps.hasAdditional || ifProps.hasUnevaluatedTrue) {
              code.line('allPropsEvaluated = true;');
            }

            // Also add then properties if then exists
            if (schema.then) {
              const thenProps = collectLocalEvaluatedProperties(schema.then, ctx);
              for (const p of thenProps.props) {
                code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
              }
              if (thenProps.patterns.length > 0) {
                code.line(`dynamicPatterns.push(...${stringify(thenProps.patterns)});`);
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
              for (const p of elseProps.props) {
                code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
              }
              if (elseProps.patterns.length > 0) {
                code.line(`dynamicPatterns.push(...${stringify(elseProps.patterns)});`);
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
                for (const p of depProps.props) {
                  code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
                }
                if (depProps.patterns.length > 0) {
                  code.line(`dynamicPatterns.push(...${stringify(depProps.patterns)});`);
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

        // Now check unevaluated properties using the runtime-built object
        code.if('!allPropsEvaluated', () => {
          code.forIn('key', dataVar, () => {
            // Build the condition: check object property, pre-compiled patterns, then dynamic patterns
            const conditions: string[] = ['!evaluatedProps[key]'];

            // Add pre-compiled static pattern checks
            for (const patternVar of patternVars) {
              conditions.push(`!${patternVar}.test(key)`);
            }

            // Add dynamic patterns check only if there might be dynamic patterns
            conditions.push('!dynamicPatterns.some(p => new RegExp(p).test(key))');

            code.if(conditions.join(' && '), () => {
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
            });
          });
        });
      } else {
        // No runtime evaluation needed, use static evaluation
        // Pre-compile static patterns as runtime regex for better performance
        const staticPatternVars: string[] = [];
        for (const pattern of staticPatterns) {
          const patternVar = ctx.genRuntimeName('evalPattern');
          ctx.addRuntimeFunction(patternVar, new RegExp(pattern));
          staticPatternVars.push(patternVar);
        }

        // Use object lookup for static properties (faster than includes)
        let staticPropsVar: string | null = null;
        if (staticProps.length > 0) {
          staticPropsVar = ctx.genRuntimeName('evalProps');
          const propsObj: Record<string, true> = {};
          for (const p of staticProps) {
            propsObj[p] = true;
          }
          ctx.addRuntimeFunction(staticPropsVar, propsObj);
        }

        code.forIn('key', dataVar, () => {
          const conditions: string[] = [];

          if (staticPropsVar) {
            conditions.push(`!${staticPropsVar}[key]`);
          }

          for (const patternVar of staticPatternVars) {
            conditions.push(`!${patternVar}.test(key)`);
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

  // Check if any subschema has contains (requires Set tracking)
  const anySubschemaHasContains = (): boolean => {
    const checkSchema = (s: JsonSchemaBase): boolean => {
      if (s.contains !== undefined) return true;
      if (s.anyOf) {
        for (const sub of s.anyOf) {
          if (typeof sub === 'object' && sub !== null && checkSchema(sub)) return true;
        }
      }
      if (s.oneOf) {
        for (const sub of s.oneOf) {
          if (typeof sub === 'object' && sub !== null && checkSchema(sub)) return true;
        }
      }
      if (s.allOf) {
        for (const sub of s.allOf) {
          if (typeof sub === 'object' && sub !== null && checkSchema(sub)) return true;
        }
      }
      if (s.if !== undefined) {
        // Check the if schema itself
        if (typeof s.if === 'object' && s.if !== null && checkSchema(s.if)) return true;
        if (s.then && typeof s.then === 'object' && checkSchema(s.then)) return true;
        if (s.else && typeof s.else === 'object' && checkSchema(s.else)) return true;
      }
      return false;
    };
    return hasContains || checkSchema(schema);
  };

  // Use Set only when contains is present (can evaluate arbitrary items)
  // Otherwise use a simple maxEvaluatedIndex number (faster)
  const needsSet = anySubschemaHasContains();

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    if (needsRuntimeEval) {
      // Track evaluated items - use number when possible, Set when contains is present
      const maxIndexVar = code.genVar('maxIdx');
      const evaluatedSetVar = needsSet ? code.genVar('evaluatedItems') : null;

      code.line(`let ${maxIndexVar} = ${staticPrefixCount - 1};`);
      if (evaluatedSetVar) {
        code.line(`const ${evaluatedSetVar} = new Set();`);
        // Mark static prefixItems as evaluated
        if (staticPrefixCount > 0) {
          code.line(
            `for (let k = 0; k < Math.min(${staticPrefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
          );
        }
      }

      // Handle contains - check each item against all contains schemas (requires Set)
      if (evaluatedSetVar) {
        for (const containsSchema of containsSchemas) {
          const iVar = code.genVar('i');
          code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
            const checkExpr = generateSubschemaCheck(containsSchema, `${dataVar}[${iVar}]`, ctx);
            code.if(checkExpr, () => {
              code.line(`${evaluatedSetVar}.add(${iVar});`);
            });
          });
        }
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
                // All items are evaluated - set max to array length
                code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
                if (evaluatedSetVar) {
                  code.line(
                    `for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`
                  );
                }
              } else {
                if (subCollected.prefixCount > 0) {
                  // Update max index
                  code.line(
                    `${maxIndexVar} = Math.max(${maxIndexVar}, ${subCollected.prefixCount - 1});`
                  );
                  if (evaluatedSetVar) {
                    code.line(
                      `for (let k = 0; k < Math.min(${subCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
                    );
                  }
                }
                // Handle nested contains
                if (evaluatedSetVar) {
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
                code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
                if (evaluatedSetVar) {
                  code.line(
                    `for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`
                  );
                }
              } else {
                if (subCollected.prefixCount > 0) {
                  code.line(
                    `${maxIndexVar} = Math.max(${maxIndexVar}, ${subCollected.prefixCount - 1});`
                  );
                  if (evaluatedSetVar) {
                    code.line(
                      `for (let k = 0; k < Math.min(${subCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
                    );
                  }
                }
                if (evaluatedSetVar) {
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
              }
            });
          }
        }
      }

      // Handle if/then/else - recursively handles nested if/then/else in then/else branches
      if (hasIfThenElse) {
        if (evaluatedSetVar) {
          generateIfThenElseEvaluatedItems(code, schema, dataVar, evaluatedSetVar, ctx);
        } else {
          generateIfThenElseEvaluatedItemsNumeric(code, schema, dataVar, maxIndexVar, ctx);
        }
      }

      // Now validate unevaluated items
      if (schema.unevaluatedItems === false) {
        if (evaluatedSetVar) {
          // Use Set-based check
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
        } else {
          // Use simple length check (much faster)
          code.if(`${dataVar}.length > ${maxIndexVar} + 1`, () => {
            const itemPathExpr =
              pathExpr === "''"
                ? `'[' + (${maxIndexVar} + 1) + ']'`
                : `${pathExpr} + '[' + (${maxIndexVar} + 1) + ']'`;
            code.line(
              `if (errors) errors.push({ path: ${itemPathExpr}, message: 'Unevaluated item not allowed', keyword: 'unevaluatedItems' });`
            );
            code.line('return false;');
          });
        }
      } else if (schema.unevaluatedItems !== true) {
        if (evaluatedSetVar) {
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
        } else {
          // Validate items beyond maxIndex against the schema
          const jVar = code.genVar('j');
          code.for(
            `let ${jVar} = ${maxIndexVar} + 1`,
            `${jVar} < ${dataVar}.length`,
            `${jVar}++`,
            () => {
              const itemPathExpr =
                pathExpr === "''" ? `'[' + ${jVar} + ']'` : `${pathExpr} + '[' + ${jVar} + ']'`;
              generateSchemaValidator(
                code,
                schema.unevaluatedItems as JsonSchema,
                `${dataVar}[${jVar}]`,
                itemPathExpr,
                ctx
              );
            }
          );
        }
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

/**
 * Numeric version of if/then/else evaluated items tracking.
 * Uses a simple maxIndex counter instead of Set (faster when no contains).
 */
function generateIfThenElseEvaluatedItemsNumeric(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  maxIndexVar: string,
  ctx: CompileContext
): void {
  if (schema.if === undefined) return;

  const ifSchema = schema.if;
  const condVar = code.genVar('ifCond');
  const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
  code.line(`const ${condVar} = ${checkExpr};`);

  // When if matches, update maxIndex from if and then
  code.if(condVar, () => {
    const ifCollected = collectEvaluatedItems(ifSchema, ctx, new Set(), false);
    if (ifCollected.prefixCount > 0) {
      code.line(`${maxIndexVar} = Math.max(${maxIndexVar}, ${ifCollected.prefixCount - 1});`);
    }
    if (ifCollected.hasItems) {
      code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
    }

    // Handle the then branch
    if (schema.then) {
      const thenSchema = schema.then;
      const thenCollected = collectEvaluatedItems(thenSchema, ctx, new Set(), false);
      if (thenCollected.hasItems) {
        code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
      } else if (thenCollected.prefixCount > 0) {
        code.line(`${maxIndexVar} = Math.max(${maxIndexVar}, ${thenCollected.prefixCount - 1});`);
      }

      // Recursively handle nested if/then/else in the then branch
      if (typeof thenSchema === 'object' && thenSchema !== null && thenSchema.if !== undefined) {
        generateIfThenElseEvaluatedItemsNumeric(code, thenSchema, dataVar, maxIndexVar, ctx);
      }
    }
  });

  // When if doesn't match, update maxIndex from else
  if (schema.else) {
    code.else(() => {
      const elseSchema = schema.else!;
      const elseCollected = collectEvaluatedItems(elseSchema, ctx, new Set(), false);
      if (elseCollected.hasItems) {
        code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
      } else if (elseCollected.prefixCount > 0) {
        code.line(`${maxIndexVar} = Math.max(${maxIndexVar}, ${elseCollected.prefixCount - 1});`);
      }

      // Recursively handle nested if/then/else in the else branch
      if (typeof elseSchema === 'object' && elseSchema !== null && elseSchema.if !== undefined) {
        generateIfThenElseEvaluatedItemsNumeric(code, elseSchema, dataVar, maxIndexVar, ctx);
      }
    });
  }
}
