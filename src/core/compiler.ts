/**
 * JSON Schema Compiler
 *
 * Generates optimized JavaScript validation functions from schemas.
 * Uses safe code generation to prevent injection attacks.
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import {
  CodeBuilder,
  Code,
  Name,
  _,
  stringify,
  indexAccess,
  pathExpr,
  pathExprDynamic,
  pathExprIndex,
  or,
  and,
  not,
} from './codegen.js';
import { CompileContext, VOCABULARIES, supportsFeature, type CompileOptions } from './context.js';
import { EvalTracker } from './eval-tracker.js';
import { createFormatValidators } from './keywords/format.js';
import {
  genError,
  genPropertyCheck,
  genRequiredCheck,
  hasTypeConstraint,
  getTypeCheck,
  getItemTypes,
  isNoOpSchema,
  getSimpleType,
} from './keywords/utils.js';

export type { RuntimeTracker } from './eval-tracker.js';

/**
 * Compile error type for internal use
 */
export interface CompileError {
  path: string;
  message: string;
  keyword: string;
}

/**
 * Compiled validation function type
 * When errors array is provided, errors are collected instead of early return
 */
export type ValidateFn = (data: unknown, errors?: CompileError[]) => boolean;

/**
 * Compile a JSON Schema into a validation function
 */
export function compile(schema: JsonSchema, options: CompileOptions = {}): ValidateFn {
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
  // Also skip if schema has no dynamic anchors (common case - significant perf improvement)
  const hasDynamicFeatures = !ctx.options.legacyRef && ctx.hasAnyDynamicAnchors();
  const dynamicScopeVar = hasDynamicFeatures ? new Name('dynamicScope') : undefined;

  // Collect dynamic anchors from the root resource to add to scope at startup
  const anchorFuncNames: Array<{ anchor: string; funcName: string }> = [];
  if (hasDynamicFeatures) {
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
  const dataVar = new Name('data');
  const pathVar = _`''`;
  generateSchemaValidator(code, schema, dataVar, pathVar, ctx, dynamicScopeVar);

  // Process any queued schemas (from $ref)
  // Each compiled function takes an optional tracker parameter for eval tracking
  // The tracker parameter is used to mark evaluated properties/items
  let queued: { schema: JsonSchema; funcName: string } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    const qFuncName = new Name(q.funcName);
    code.blank();
    if (hasDynamicFeatures) {
      // Function signature: (data, errors, path, dynamicScope, tracker?)
      code.block(_`function ${qFuncName}(data, errors, path, dynamicScope, tracker)`, () => {
        // Create a "runtime" tracker that generates conditional marking code
        // The code checks `if (tracker)` before each mark operation
        const trackerObj = new EvalTracker(code, 'tracker', {
          trackProps: true,
          trackItems: true,
          isRuntimeOptional: true,
        });
        const qDataVar = new Name('data');
        const qPathVar = new Name('path');
        const qDynamicScope = new Name('dynamicScope');
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx, qDynamicScope, trackerObj);
        code.line(_`return true;`);
      });
    } else {
      // In legacy mode, skip dynamicScope parameter for faster function calls
      // Function signature: (data, errors, path, tracker?)
      code.block(_`function ${qFuncName}(data, errors, path, tracker)`, () => {
        const trackerObj = new EvalTracker(code, 'tracker', {
          trackProps: true,
          trackItems: true,
          isRuntimeOptional: true,
        });
        const qDataVar = new Name('data');
        const qPathVar = new Name('path');
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx, undefined, trackerObj);
        code.line(_`return true;`);
      });
    }
  }

  // Build the final function
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());
  const runtimeValues = Array.from(runtimeFuncs.values());

  // Push root resource's dynamic anchors to scope at startup (only when dynamic features present)
  let scopeInit = '';
  if (hasDynamicFeatures) {
    scopeInit = 'const dynamicScope = [];\n';
    for (const { anchor, funcName } of anchorFuncNames) {
      scopeInit += `dynamicScope.push({ anchor: ${JSON.stringify(anchor)}, validate: ${funcName} });\n`;
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
 * Check if a schema (or any of its subschemas) has a contains keyword.
 * Used to determine if we need Set-based item tracking for unevaluatedItems.
 */
function schemaHasContains(
  schema: JsonSchema,
  ctx: CompileContext,
  visited = new Set<JsonSchema>()
): boolean {
  if (typeof schema !== 'object' || schema === null) return false;
  if (visited.has(schema)) return false;
  visited.add(schema);

  if (schema.contains !== undefined) return true;

  // Check all subschemas
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      if (schemaHasContains(sub, ctx, visited)) return true;
    }
  }
  if (schema.anyOf) {
    for (const sub of schema.anyOf) {
      if (schemaHasContains(sub, ctx, visited)) return true;
    }
  }
  if (schema.oneOf) {
    for (const sub of schema.oneOf) {
      if (schemaHasContains(sub, ctx, visited)) return true;
    }
  }
  if (schema.if && typeof schema.if === 'object' && schemaHasContains(schema.if, ctx, visited))
    return true;
  if (
    schema.then &&
    typeof schema.then === 'object' &&
    schemaHasContains(schema.then, ctx, visited)
  )
    return true;
  if (
    schema.else &&
    typeof schema.else === 'object' &&
    schemaHasContains(schema.else, ctx, visited)
  )
    return true;

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema && schemaHasContains(refSchema, ctx, visited)) return true;
  }

  return false;
}

/**
 * Generate validation code for a schema
 * @param pathExprCode - Code expression that evaluates to the current path string
 * @param dynamicScopeVar - Variable name for the dynamic scope array (for $dynamicRef)
 * @param evalTracker - Tracker for evaluated properties/items (for unevaluated* keywords)
 */
function generateSchemaValidator(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  // In legacy mode, never use dynamic scope
  const scopeVar = ctx.options.legacyRef ? undefined : dynamicScopeVar;
  // Boolean schemas
  if (schema === true) {
    // Always valid - no code needed
    return;
  }

  if (schema === false) {
    genError(code, pathExprCode, 'false', 'Schema is false');
    return;
  }

  // String shorthand types (e.g., 'string' is equivalent to { type: 'string' })
  if (typeof schema === 'string') {
    // Convert shorthand to equivalent type schema and recurse
    generateSchemaValidator(code, { type: schema }, dataVar, pathExprCode, ctx, dynamicScopeVar);
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
          _`${scopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${new Name(anchorFuncName)} });`
        );
      }
    }
  }

  // In legacy mode (draft-07 and earlier), $ref overrides all sibling keywords
  // Only generate $ref check and skip everything else
  // BUT if we have an eval tracker, we still need to inline for property tracking
  if (schema.$ref && ctx.options.legacyRef && !evalTracker) {
    generateRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
  } else {
    // Set up evaluation tracking if this schema has unevaluatedProperties/unevaluatedItems
    // IMPORTANT: Each schema with unevaluatedProperties/unevaluatedItems needs its OWN tracker
    // because it only sees properties evaluated by its own adjacent keywords, not parent's.
    // However, if we have a parent tracker and this schema doesn't have unevalProps/unevalItems,
    // we pass the parent tracker so properties evaluated here are visible to the parent.
    let tracker = evalTracker;
    const hasUnevalProps = schema.unevaluatedProperties !== undefined;
    const hasUnevalItems = schema.unevaluatedItems !== undefined;

    if (hasUnevalProps || hasUnevalItems) {
      // Optimization: Skip tracker entirely if additionalProperties makes it redundant
      // When additionalProperties is present with unevaluatedProperties, all properties
      // are marked as evaluated, making the tracker unnecessary except for parent bubbling
      const skipPropsTracking =
        hasUnevalProps && schema.additionalProperties !== undefined && !evalTracker;

      // Check if contains is present anywhere - requires Set-based item tracking
      const needsItemSet = hasUnevalItems && schemaHasContains(schema, ctx);

      // Skip creating tracker if it would be unused
      if (skipPropsTracking && !hasUnevalItems) {
        // No need for tracker - skip it entirely
        tracker = undefined;
      } else {
        // This schema has its own unevaluatedProperties/Items - create a NEW tracker
        // The tracker is a local variable that gets passed to sub-validators
        // Keep reference to parent so we can bubble up after our unevaluated* check runs
        const trackerVar = code.genVar('tracker');
        tracker = new EvalTracker(code, trackerVar, {
          trackProps: hasUnevalProps && !skipPropsTracking,
          trackItems: hasUnevalItems,
          parentTracker: evalTracker,
          useItemSet: needsItemSet,
        });
        tracker.init();
      }
    }
    // If no unevalProps/Items here but parent has tracker, keep using parent's tracker
    // so that properties evaluated here are visible to the parent's unevaluatedProperties check

    // Generate code for each keyword (draft-2020-12 behavior)
    generateTypeCheck(code, schema, dataVar, pathExprCode, ctx);
    generateConstCheck(code, schema, dataVar, pathExprCode, ctx);
    generateEnumCheck(code, schema, dataVar, pathExprCode, ctx);
    generateStringChecks(code, schema, dataVar, pathExprCode, ctx);
    generateFormatCheck(code, schema, dataVar, pathExprCode, ctx);
    generateContentChecks(code, schema, dataVar, pathExprCode, ctx);
    generateNumberChecks(code, schema, dataVar, pathExprCode, ctx);
    generateItemsChecks(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateArrayChecks(code, schema, dataVar, pathExprCode, ctx);
    generateObjectChecks(code, schema, dataVar, pathExprCode, ctx);
    generatePropertiesChecks(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateCompositionChecks(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateDynamicRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateContainsCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateDependentRequiredCheck(code, schema, dataVar, pathExprCode, ctx);
    generatePropertyNamesCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateDependentSchemasCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateDependenciesCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);
    generateUnevaluatedItemsCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar, tracker);

    // After unevaluatedProperties/Items checks, bubble up evaluated props to parent
    // This ensures nested unevaluatedProperties: true marks props for parent too
    if (tracker && tracker !== evalTracker) {
      tracker.bubbleUpToParent();
    }
  }

  // Pop dynamic anchors after validation (if we pushed any)
  if (resourceAnchors.length > 0 && scopeVar) {
    for (let i = 0; i < resourceAnchors.length; i++) {
      code.line(_`${scopeVar}.pop();`);
    }
  }
}

/**
 * Create a deep equality function for const/enum validation
 * Optimized for performance with early exits and minimal overhead
 */
function createDeepEqual(): (a: unknown, b: unknown) => boolean {
  return function deepEqual(a: unknown, b: unknown): boolean {
    // Fast path: strict equality (handles primitives, same reference)
    if (a === b) return true;

    // Fast path: type mismatch
    const aType = typeof a;
    const bType = typeof b;
    if (aType !== bType) return false;

    // Fast path: non-objects or nulls
    if (aType !== 'object' || a === null || b === null) return false;

    // Fast path: array vs non-array mismatch
    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);
    if (aIsArray !== bIsArray) return false;

    if (aIsArray) {
      const aArr = a as unknown[];
      const bArr = b as unknown[];
      const len = aArr.length;

      // Fast path: length mismatch
      if (len !== bArr.length) return false;

      // Optimize: use for loop instead of every() to reduce function call overhead
      for (let i = 0; i < len; i++) {
        if (!deepEqual(aArr[i], bArr[i])) return false;
      }
      return true;
    }

    // Object comparison
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const len = aKeys.length;

    // Fast path: key count mismatch
    if (len !== Object.keys(bObj).length) return false;

    // Optimize: use for loop instead of every()
    for (let i = 0; i < len; i++) {
      const key = aKeys[i];
      if (!(key in bObj) || !deepEqual(aObj[key], bObj[key])) return false;
    }
    return true;
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
 * Generate type check code
 */
export function generateTypeCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (!schema.type) return;
  // type is a validation vocabulary keyword
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const expectedType = types.join(' or ');

  // When coercion is enabled, add context to the error message
  const isCoercionEnabled = ctx.options.coerce !== false;
  const errorMessage = isCoercionEnabled
    ? `Expected ${expectedType} (coercion failed)`
    : `Expected ${expectedType}`;

  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(dataVar, type);
    code.if(not(check), () => {
      genError(code, pathExprCode, 'type', errorMessage);
    });
  } else {
    // Multiple types - need OR
    const checks = types.map((t) => getTypeCheck(dataVar, t));
    code.if(not(or(...checks)), () => {
      genError(code, pathExprCode, 'type', errorMessage);
    });
  }
}

/**
 * Generate const check code
 */
export function generateConstCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  _ctx: CompileContext
): void {
  if (schema.const === undefined) return;

  // For primitives, use strict equality
  if (schema.const === null || typeof schema.const !== 'object') {
    code.if(_`${dataVar} !== ${stringify(schema.const)}`, () => {
      genError(code, pathExprCode, 'const', `Expected constant value`);
    });
  } else {
    // For objects/arrays, use deepEqual
    code.if(_`!deepEqual(${dataVar}, ${stringify(schema.const)})`, () => {
      genError(code, pathExprCode, 'const', `Expected constant value`);
    });
  }
}

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
    // All primitives - use Set for O(1) lookup
    const setName = new Name(ctx.genRuntimeName('enumSet'));
    ctx.addRuntimeFunction(setName.str, new Set(primitives));
    code.if(_`!${setName}.has(${dataVar})`, () => {
      genError(code, pathExprCode, 'enum', `Value must be one of the allowed values`);
    });
  } else if (primitives.length === 0) {
    // All complex - use inline loop with deepEqual
    const arrName = new Name(ctx.genRuntimeName('enumArr'));
    ctx.addRuntimeFunction(arrName.str, complexValues);

    // Generate inline loop instead of using .some() to reduce overhead
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
      genError(code, pathExprCode, 'enum', `Value must be one of the allowed values`);
    });
  } else {
    // Mixed: check primitives with Set, complex with inline loop
    const setName = new Name(ctx.genRuntimeName('enumSet'));
    ctx.addRuntimeFunction(setName.str, new Set(primitives));
    const arrName = new Name(ctx.genRuntimeName('enumArr'));
    ctx.addRuntimeFunction(arrName.str, complexValues);

    // Fast path: check Set first (common case for primitives)
    const checkedVar = code.genVar('checked');
    code.line(_`let ${checkedVar} = ${setName}.has(${dataVar});`);
    code.if(_`!${checkedVar} && typeof ${dataVar} === 'object' && ${dataVar} !== null`, () => {
      // Only check complex values if data is an object
      const iVar = code.genVar('i');
      code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
      code.line(_`  if (deepEqual(${dataVar}, ${arrName}[${iVar}])) {`);
      code.line(_`    ${checkedVar} = true;`);
      code.line(_`    break;`);
      code.line(_`  }`);
      code.line(_`}`);
    });
    code.if(_`!${checkedVar}`, () => {
      genError(code, pathExprCode, 'enum', `Value must be one of the allowed values`);
    });
  }
}

/**
 * Generate string validation checks (minLength, maxLength, pattern)
 */
export function generateStringChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const hasStringChecks =
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined;

  if (!hasStringChecks) return;

  // Only check if data is a string
  code.if(_`typeof ${dataVar} === 'string'`, () => {
    // Use ucs2length for proper Unicode code point counting (handles surrogate pairs)
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ucs2length(${dataVar});`);

      if (schema.minLength !== undefined) {
        code.if(_`${lenVar} < ${schema.minLength}`, () => {
          genError(
            code,
            pathExprCode,
            'minLength',
            `String must be at least ${schema.minLength} characters`
          );
        });
      }

      if (schema.maxLength !== undefined) {
        code.if(_`${lenVar} > ${schema.maxLength}`, () => {
          genError(
            code,
            pathExprCode,
            'maxLength',
            `String must be at most ${schema.maxLength} characters`
          );
        });
      }
    }

    if (schema.pattern !== undefined) {
      // Pre-compile regex as a runtime function for consistent performance
      // Optimize: Only use 'u' flag when necessary for better performance
      // The 'u' flag is required for:
      // 1. Unicode property escapes (\p{...}, \P{...})
      // 2. Unicode code point escapes (\u{...})
      // 3. Characters outside BMP (code points > 0xFFFF, i.e., surrogate pairs)
      const hasUnicodeEscapes = /\\[pP]\{/.test(schema.pattern) || /\\u\{/.test(schema.pattern);
      const hasHighUnicode = /[\uD800-\uDFFF]/.test(schema.pattern); // Surrogate pairs
      const needsUnicode = hasUnicodeEscapes || hasHighUnicode;
      const flags = needsUnicode ? 'u' : '';

      const regexName = new Name(ctx.genRuntimeName('pattern'));
      ctx.addRuntimeFunction(regexName.str, new RegExp(schema.pattern, flags));

      code.if(_`!${regexName}.test(${dataVar})`, () => {
        genError(code, pathExprCode, 'pattern', `String must match pattern ${schema.pattern}`);
      });
    }
  });
}

/**
 * Generate content validation checks (contentMediaType, contentEncoding)
 * These are optional in draft-07 and later
 * In draft 2020-12, content is annotation-only (no validation)
 */
export function generateContentChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const hasContentChecks =
    schema.contentMediaType !== undefined || schema.contentEncoding !== undefined;

  if (!hasContentChecks) return;

  // Content assertion is controlled by the contentAssertion option
  // which is auto-detected from the schema dialect during context creation
  if (!ctx.options.contentAssertion) {
    return;
  }

  // Only check if data is a string
  code.if(_`typeof ${dataVar} === 'string'`, () => {
    // First check encoding if present
    if (schema.contentEncoding !== undefined) {
      if (schema.contentEncoding === 'base64') {
        // Validate base64 encoding
        // Base64 characters: A-Z, a-z, 0-9, +, /, and = for padding
        const regexName = new Name(ctx.genRuntimeName('base64Re'));
        ctx.addRuntimeFunction(regexName.str, /^[A-Za-z0-9+/]*={0,2}$/);
        code.if(_`!${regexName}.test(${dataVar}) || ${dataVar}.length % 4 !== 0`, () => {
          genError(code, pathExprCode, 'contentEncoding', 'String must be valid base64');
        });
      }
    }

    // Then check media type if present
    if (schema.contentMediaType !== undefined) {
      if (schema.contentMediaType === 'application/json') {
        // If there's also base64 encoding, we need to decode first
        if (schema.contentEncoding === 'base64') {
          const decodedVar = code.genVar('decoded');
          code.try(
            () => {
              code.line(_`const ${decodedVar} = atob(${dataVar});`);
              code.line(_`JSON.parse(${decodedVar});`);
            },
            () => {
              genError(code, pathExprCode, 'contentMediaType', 'String must be valid JSON');
            }
          );
        } else {
          // Validate directly as JSON
          code.try(
            () => {
              code.line(_`JSON.parse(${dataVar});`);
            },
            () => {
              genError(code, pathExprCode, 'contentMediaType', 'String must be valid JSON');
            }
          );
        }
      }
    }
  });
}

/**
 * Generate number validation checks (minimum, maximum, multipleOf, etc.)
 */
export function generateNumberChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
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

  // Check if we need the typeof guard - skip if type already constrains to number/integer
  const needsTypeGuard =
    !hasTypeConstraint(schema, 'number') && !hasTypeConstraint(schema, 'integer');

  const genChecks = () => {
    // Handle minimum with optional exclusiveMinimum (draft4 boolean form)
    if (schema.minimum !== undefined) {
      // In draft4, exclusiveMinimum is a boolean that modifies minimum
      if (schema.exclusiveMinimum === true) {
        code.if(_`${dataVar} <= ${schema.minimum}`, () => {
          genError(code, pathExprCode, 'minimum', `Value must be > ${schema.minimum}`);
        });
      } else {
        code.if(_`${dataVar} < ${schema.minimum}`, () => {
          genError(code, pathExprCode, 'minimum', `Value must be >= ${schema.minimum}`);
        });
      }
    }

    // Handle maximum with optional exclusiveMaximum (draft4 boolean form)
    if (schema.maximum !== undefined) {
      // In draft4, exclusiveMaximum is a boolean that modifies maximum
      if (schema.exclusiveMaximum === true) {
        code.if(_`${dataVar} >= ${schema.maximum}`, () => {
          genError(code, pathExprCode, 'maximum', `Value must be < ${schema.maximum}`);
        });
      } else {
        code.if(_`${dataVar} > ${schema.maximum}`, () => {
          genError(code, pathExprCode, 'maximum', `Value must be <= ${schema.maximum}`);
        });
      }
    }

    // Handle exclusiveMinimum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMinimum === 'number') {
      code.if(_`${dataVar} <= ${schema.exclusiveMinimum}`, () => {
        genError(
          code,
          pathExprCode,
          'exclusiveMinimum',
          `Value must be > ${schema.exclusiveMinimum}`
        );
      });
    }

    // Handle exclusiveMaximum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMaximum === 'number') {
      code.if(_`${dataVar} >= ${schema.exclusiveMaximum}`, () => {
        genError(
          code,
          pathExprCode,
          'exclusiveMaximum',
          `Value must be < ${schema.exclusiveMaximum}`
        );
      });
    }

    if (schema.multipleOf !== undefined) {
      const multipleOf = schema.multipleOf;
      // Use Number.isInteger for accuracy (handles large numbers and Infinity correctly)
      // For integer multipleOf values, can use simpler modulo check
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        // Fast path for integer multipleOf: simple modulo
        code.if(_`${dataVar} % ${multipleOf} !== 0`, () => {
          genError(
            code,
            pathExprCode,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        });
      } else {
        const divVar = code.genVar('div');
        code.line(_`const ${divVar} = ${dataVar} / ${multipleOf};`);
        code.if(_`!Number.isInteger(${divVar})`, () => {
          genError(
            code,
            pathExprCode,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        });
      }
    }
  };

  // Skip type guard if we already know it's a number/integer
  if (needsTypeGuard) {
    code.if(_`typeof ${dataVar} === 'number'`, genChecks);
  } else {
    genChecks();
  }
}

/**
 * Generate array validation checks (minItems, maxItems, uniqueItems)
 */
export function generateArrayChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  _ctx: CompileContext
): void {
  const hasArrayChecks =
    schema.minItems !== undefined || schema.maxItems !== undefined || schema.uniqueItems === true;

  if (!hasArrayChecks) return;

  const genChecks = () => {
    if (schema.minItems !== undefined) {
      code.if(_`${dataVar}.length < ${schema.minItems}`, () => {
        genError(
          code,
          pathExprCode,
          'minItems',
          `Array must have at least ${schema.minItems} items`
        );
      });
    }

    if (schema.maxItems !== undefined) {
      code.if(_`${dataVar}.length > ${schema.maxItems}`, () => {
        genError(
          code,
          pathExprCode,
          'maxItems',
          `Array must have at most ${schema.maxItems} items`
        );
      });
    }

    if (schema.uniqueItems === true) {
      // Check if items are known to be primitives at compile time
      const itemTypes = getItemTypes(schema);
      const canOptimize =
        itemTypes.length > 0 && !itemTypes.some((t) => t === 'object' || t === 'array');

      const iVar = code.genVar('i');
      const jVar = code.genVar('j');

      if (canOptimize) {
        // Fast path: items are primitives, use object hash for O(n) lookup
        const itemVar = code.genVar('item');
        const indicesVar = code.genVar('indices');
        const hasMultipleTypes = itemTypes.length > 1;

        code.line(_`const ${indicesVar} = {};`);
        code.block(_`for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.line(_`let ${itemVar} = ${dataVar}[${iVar}];`);
          // If multiple types possible, prefix strings to avoid collision with numbers
          if (hasMultipleTypes) {
            code.if(_`typeof ${itemVar} === 'string'`, () => {
              code.line(_`${itemVar} = '_' + ${itemVar};`);
            });
          }
          code.if(_`typeof ${indicesVar}[${itemVar}] === 'number'`, () => {
            genError(code, pathExprCode, 'uniqueItems', `Array items must be unique`);
          });
          code.line(_`${indicesVar}[${itemVar}] = ${iVar};`);
        });
      } else {
        // Slow path: O(n²) comparison using deepEqual
        code.block(_`outer: for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.block(_`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
            code.if(_`deepEqual(${dataVar}[${iVar}], ${dataVar}[${jVar}])`, () => {
              genError(code, pathExprCode, 'uniqueItems', `Array items must be unique`);
            });
          });
        });
      }
    }
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    // Only check if data is an array
    code.if(_`Array.isArray(${dataVar})`, genChecks);
  }
}

/**
 * Generate object validation checks (required, minProperties, maxProperties)
 */
export function generateObjectChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  _ctx: CompileContext
): void {
  const hasObjectChecks =
    (schema.required && schema.required.length > 0) ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined;

  if (!hasObjectChecks) return;

  const genChecks = () => {
    if (schema.required && schema.required.length > 0) {
      for (const prop of schema.required) {
        genRequiredCheck(code, dataVar, prop, pathExprCode);
      }
    }

    if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
      code.line(_`const propCount = Object.keys(${dataVar}).length;`);

      if (schema.minProperties !== undefined) {
        code.if(_`propCount < ${schema.minProperties}`, () => {
          genError(
            code,
            pathExprCode,
            'minProperties',
            `Object must have at least ${schema.minProperties} properties`
          );
        });
      }

      if (schema.maxProperties !== undefined) {
        code.if(_`propCount > ${schema.maxProperties}`, () => {
          genError(
            code,
            pathExprCode,
            'maxProperties',
            `Object must have at most ${schema.maxProperties} properties`
          );
        });
      }
    }
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    // Only check if data is an object
    code.if(
      _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
}

/**
 * Generate properties, additionalProperties, patternProperties checks
 */
export function generatePropertiesChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  // Check for non-trivial property schemas
  const nonTrivialProps = schema.properties
    ? Object.entries(schema.properties).filter(([, s]) => !isNoOpSchema(s))
    : [];
  const nonTrivialPatternProps = schema.patternProperties
    ? Object.entries(schema.patternProperties).filter(([, s]) => !isNoOpSchema(s))
    : [];

  const hasProps = nonTrivialProps.length > 0;
  const hasPatternProps = nonTrivialPatternProps.length > 0;
  // For validation: only non-trivial additionalProperties needs checking
  const hasAdditionalProps =
    schema.additionalProperties !== undefined && !isNoOpSchema(schema.additionalProperties);
  // For tracking: ANY additionalProperties (including true/{}) evaluates all remaining props
  const hasAnyAdditionalProps = schema.additionalProperties !== undefined;

  // For tracking: we also need to enter if there are ANY properties (even trivial ones)
  const hasAnyProps = schema.properties && Object.keys(schema.properties).length > 0;
  // For tracking: ANY patternProperties (even trivial) marks matching properties as evaluated
  const hasAnyPatternProps =
    schema.patternProperties && Object.keys(schema.patternProperties).length > 0;

  if (
    !hasProps &&
    !hasPatternProps &&
    !hasAdditionalProps &&
    !hasAnyAdditionalProps &&
    !hasAnyProps &&
    !hasAnyPatternProps
  )
    return;

  const genChecks = () => {
    // Mark all properties from 'properties' as evaluated (even trivial ones count as evaluated)
    if (evalTracker && schema.properties) {
      const propNames = Object.keys(schema.properties);
      // Use batch marking for better performance
      evalTracker.markProps(propNames);
    }

    // Validate defined properties (only non-trivial ones)
    for (const [propName, propSchema] of nonTrivialProps) {
      const propPathExpr = pathExpr(pathExprCode, propName);
      genPropertyCheck(code, dataVar, propName, (valueVar) => {
        const valueVarName = valueVar instanceof Name ? valueVar : code.genVar('pv');
        if (!(valueVar instanceof Name)) {
          code.line(_`const ${valueVarName} = ${valueVar};`);
        }
        generateSchemaValidator(
          code,
          propSchema,
          valueVarName as Name,
          propPathExpr,
          ctx,
          dynamicScopeVar
        );
      });
    }

    // If additionalProperties is present (even true/{}), all properties are evaluated
    if (hasAnyAdditionalProps && evalTracker) {
      evalTracker.markAllProps();
    }

    // Handle patternProperties and additionalProperties validation in a single loop
    // Also enter when tracking with ANY patternProperties (even trivial ones)
    if (hasPatternProps || hasAdditionalProps || (hasAnyPatternProps && evalTracker)) {
      const definedProps = schema.properties ? Object.keys(schema.properties) : [];
      // For additionalProperties, we need ALL patternProperties patterns (even no-ops)
      // because they affect which properties are considered "additional"
      const allPatterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

      // Pre-compile pattern regexes for ALL patterns (needed for additionalProperties check)
      // Only use 'u' flag when necessary for better performance
      const patternRegexNames: Name[] = [];
      for (const pattern of allPatterns) {
        const hasUnicodeEscapes = /\\[pP]\{/.test(pattern) || /\\u\{/.test(pattern);
        const hasHighUnicode = /[\uD800-\uDFFF]/.test(pattern); // Surrogate pairs
        const needsUnicode = hasUnicodeEscapes || hasHighUnicode;
        const flags = needsUnicode ? 'u' : '';
        const regexName = new Name(ctx.genRuntimeName('patternRe'));
        ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
        patternRegexNames.push(regexName);
        // Register pattern with tracker for unevaluatedProperties check
        if (evalTracker) {
          evalTracker.addPattern(regexName);
        }
      }

      const keyVar = new Name('key');
      code.forIn(keyVar, dataVar, () => {
        const keyPathExpr = pathExprDynamic(pathExprCode, keyVar);

        // Generate patternProperties checks (only non-trivial ones)
        for (let i = 0; i < nonTrivialPatternProps.length; i++) {
          const [pattern, patternSchema] = nonTrivialPatternProps[i];
          // Find the index in allPatterns to get the right regex
          const regexIdx = allPatterns.indexOf(pattern);
          const regexName = patternRegexNames[regexIdx];
          code.if(_`${regexName}.test(${keyVar})`, () => {
            const propAccessed = indexAccess(dataVar, keyVar);
            const propVar = code.genVar('pv');
            code.line(_`const ${propVar} = ${propAccessed};`);
            generateSchemaValidator(
              code,
              patternSchema,
              propVar,
              keyPathExpr,
              ctx,
              dynamicScopeVar
            );
          });
        }

        // Generate additionalProperties check
        if (hasAdditionalProps) {
          const addPropsSchema = schema.additionalProperties!;

          // Build condition: not a defined prop and not matching any pattern
          // Use inline comparisons for small numbers of properties (faster than Set.has)
          const conditions: Code[] = [];

          // For defined properties, use inline comparison for up to ~10 props
          if (definedProps.length > 0 && definedProps.length <= 10) {
            const propChecks = definedProps.map((p) => _`${keyVar} !== ${p}`);
            conditions.push(_`(${and(...propChecks)})`);
          } else if (definedProps.length > 10) {
            // Use Set for larger number of properties
            const propsSetName = new Name(ctx.genRuntimeName('propsSet'));
            ctx.addRuntimeFunction(propsSetName.str, new Set(definedProps));
            conditions.push(_`!${propsSetName}.has(${keyVar})`);
          }

          // Pattern checks using pre-compiled regexes
          for (const regexName of patternRegexNames) {
            conditions.push(_`!${regexName}.test(${keyVar})`);
          }

          if (conditions.length > 0) {
            code.if(and(...conditions), () => {
              generateAdditionalPropsCheck(
                code,
                addPropsSchema,
                indexAccess(dataVar, keyVar),
                keyPathExpr,
                ctx,
                dynamicScopeVar
              );
            });
          } else {
            generateAdditionalPropsCheck(
              code,
              addPropsSchema,
              indexAccess(dataVar, keyVar),
              keyPathExpr,
              ctx,
              dynamicScopeVar
            );
          }
        }
      });
    }
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    // Only check if data is an object
    code.if(
      _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
}

function generateAdditionalPropsCheck(
  code: CodeBuilder,
  schema: JsonSchema,
  dataExpr: Code,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  if (schema === false) {
    genError(code, pathExprCode, 'additionalProperties', 'Additional properties not allowed');
  } else if (schema === true) {
    // No check needed
  } else {
    const propVar = code.genVar('ap');
    code.line(_`const ${propVar} = ${dataExpr};`);
    generateSchemaValidator(code, schema, propVar, pathExprCode, ctx, dynamicScopeVar);
  }
}

/**
 * Generate contains check (minContains, maxContains)
 */
export function generateContainsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  _dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  if (schema.contains === undefined) return;

  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  // Handle boolean schemas directly
  if (containsSchema === true) {
    // Every item matches - mark all items as evaluated and check array length
    code.if(_`Array.isArray(${dataVar})`, () => {
      // All items match, so mark all as evaluated
      evalTracker?.markAllItems();

      code.if(_`${dataVar}.length < ${minContains}`, () => {
        genError(
          code,
          pathExprCode,
          'contains',
          `Array must contain at least ${minContains} matching items`
        );
      });
      if (maxContains !== undefined) {
        code.if(_`${dataVar}.length > ${maxContains}`, () => {
          genError(
            code,
            pathExprCode,
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
    code.if(_`Array.isArray(${dataVar})`, () => {
      if (minContains > 0) {
        genError(
          code,
          pathExprCode,
          'contains',
          `Array must contain at least ${minContains} matching items`
        );
      }
      // maxContains is always satisfied since count is 0, no items evaluated
    });
    return;
  }

  // If minContains is 0 and no maxContains, contains is always satisfied
  // But we still need to track which items match for unevaluatedItems
  if (minContains === 0 && maxContains === undefined && !evalTracker?.trackingItems) {
    return;
  }

  code.if(_`Array.isArray(${dataVar})`, () => {
    const countVar = code.genVar('containsCount');
    code.line(_`let ${countVar} = 0;`);

    const iVar = code.genVar('i');

    // Try to inline simple type checks for better performance
    // Check if schema is a simple type-only schema that can be inlined
    const simpleType = getSimpleType(containsSchema);

    if (simpleType) {
      // Inline the type check directly in the loop for better performance
      // Cache array length for better performance
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ${dataVar}.length;`);

      code.for(_`let ${iVar} = 0`, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
        const itemAccess = indexAccess(dataVar, iVar);
        // Manually construct the type check for the array item
        let inlineCheck: Code;
        switch (simpleType) {
          case 'string':
            inlineCheck = _`typeof ${itemAccess} === 'string'`;
            break;
          case 'number':
            inlineCheck = _`typeof ${itemAccess} === 'number'`;
            break;
          case 'integer':
            inlineCheck = _`typeof ${itemAccess} === 'number' && ${itemAccess} % 1 === 0 && isFinite(${itemAccess})`;
            break;
          case 'boolean':
            inlineCheck = _`typeof ${itemAccess} === 'boolean'`;
            break;
          case 'null':
            inlineCheck = _`${itemAccess} === null`;
            break;
          case 'array':
            inlineCheck = _`Array.isArray(${itemAccess})`;
            break;
          case 'object':
            inlineCheck = _`${itemAccess} && typeof ${itemAccess} === 'object' && !Array.isArray(${itemAccess})`;
            break;
          default:
            inlineCheck = _`false`;
        }

        code.if(inlineCheck, () => {
          code.line(_`${countVar}++;`);
          // Mark this item as evaluated (for unevaluatedItems)
          evalTracker?.markSingleItem(iVar);
        });

        // Early exit if we've found enough and no maxContains
        // But only if we're not tracking items (need to find all matches for tracking)
        if (maxContains === undefined && !evalTracker?.trackingItems) {
          code.if(_`${countVar} >= ${minContains}`, () => {
            code.line(_`break;`);
          });
        }
      });
    } else {
      // Queue the contains schema for compilation (reuses all existing generators)
      const containsFuncName = new Name(ctx.queueCompile(containsSchema));

      code.forArray(iVar, dataVar, () => {
        const itemAccess = indexAccess(dataVar, iVar);

        // Call the compiled contains validator (pass null for errors to skip collection)
        code.if(_`${containsFuncName}(${itemAccess}, null, '')`, () => {
          code.line(_`${countVar}++;`);
          // Mark this item as evaluated (for unevaluatedItems)
          evalTracker?.markSingleItem(iVar);
        });

        // Early exit if we've found enough and no maxContains
        // But only if we're not tracking items (need to find all matches for tracking)
        if (maxContains === undefined && !evalTracker?.trackingItems) {
          code.if(_`${countVar} >= ${minContains}`, () => {
            code.line(_`break;`);
          });
        }
      });
    }

    code.if(_`${countVar} < ${minContains}`, () => {
      genError(
        code,
        pathExprCode,
        'contains',
        `Array must contain at least ${minContains} matching items`
      );
    });

    if (maxContains !== undefined) {
      code.if(_`${countVar} > ${maxContains}`, () => {
        genError(
          code,
          pathExprCode,
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
  dataVar: Name,
  pathExprCode: Code,
  _ctx: CompileContext
): void {
  if (!schema.dependentRequired) return;

  // Filter out empty arrays (no requirements)
  const deps = Object.entries(schema.dependentRequired).filter(([, reqs]) => reqs.length > 0);
  if (deps.length === 0) return;

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const [prop, requiredProps] of deps) {
      code.if(_`${prop} in ${dataVar}`, () => {
        for (const reqProp of requiredProps) {
          const reqPathExpr = pathExpr(pathExprCode, reqProp);
          code.if(_`!(${reqProp} in ${dataVar})`, () => {
            genError(
              code,
              reqPathExpr,
              'dependentRequired',
              `Property required when ${prop} is present`
            );
          });
        }
      });
    }
  });
}

/**
 * Generate dependentSchemas check
 */
export function generateDependentSchemasCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  if (!schema.dependentSchemas) return;

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
      code.if(_`${prop} in ${dataVar}`, () => {
        generateSchemaValidator(
          code,
          depSchema,
          dataVar,
          pathExprCode,
          ctx,
          dynamicScopeVar,
          evalTracker
        );
      });
    }
  });
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
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  if (!schema.dependencies) return;

  // Filter out no-op dependencies (empty arrays, true, {})
  const nonTrivialDeps = Object.entries(schema.dependencies).filter(([, dep]) => {
    if (Array.isArray(dep)) {
      return dep.length > 0; // Skip empty arrays
    }
    // Skip no-op schemas (true, {})
    if (dep === true) return false;
    if (typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0) return false;
    return true;
  });

  if (nonTrivialDeps.length === 0) return;

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const [prop, dep] of nonTrivialDeps) {
      code.if(_`${prop} in ${dataVar}`, () => {
        if (Array.isArray(dep)) {
          // Array of required property names
          for (const reqProp of dep) {
            const reqPathExpr = pathExpr(pathExprCode, reqProp);
            code.if(_`!(${reqProp} in ${dataVar})`, () => {
              genError(
                code,
                reqPathExpr,
                'dependencies',
                `Property required when ${prop} is present`
              );
            });
          }
        } else {
          // Schema that must validate
          generateSchemaValidator(
            code,
            dep as JsonSchema,
            dataVar,
            pathExprCode,
            ctx,
            dynamicScopeVar,
            evalTracker
          );
        }
      });
    }
  });
}

/**
 * Generate propertyNames check
 */
export function generatePropertyNamesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
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
    code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
      code.if(_`Object.keys(${dataVar}).length > 0`, () => {
        genError(code, pathExprCode, 'propertyNames', 'No properties allowed');
      });
    });
    return;
  }

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    const keyVar = new Name('key');
    code.forIn(keyVar, dataVar, () => {
      // For propertyNames, the path is the key itself
      generateSchemaValidator(code, propNamesSchema, keyVar, keyVar, ctx, dynamicScopeVar);
    });
  });
}

/**
 * Check if a schema should be inlined instead of compiled as a separate function.
 * Inlining simple schemas avoids function call overhead.
 */
function shouldInlineRef(
  refSchema: JsonSchema,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): boolean {
  // Don't inline if we have eval tracker that's actively tracking (need to pass as param)
  if (evalTracker && evalTracker.enabled) return false;

  // Only inline object schemas (not boolean or string)
  if (typeof refSchema !== 'object' || refSchema === null) return false;

  // Don't inline schemas with $id (they are resources with dynamic anchors)
  if (refSchema.$id) return false;

  // Don't inline schemas that themselves have $ref (already handled by ref chain optimization)
  if (refSchema.$ref) return false;

  // Don't inline schemas with $dynamicRef or $dynamicAnchor (need dynamic scope)
  if (refSchema.$dynamicRef || refSchema.$dynamicAnchor) return false;

  // Don't inline schemas with composition keywords (complex control flow)
  if (refSchema.allOf || refSchema.anyOf || refSchema.oneOf || refSchema.not) return false;
  if (refSchema.if || refSchema.then || refSchema.else) return false;

  // Don't inline schemas with unevaluated keywords (need tracking)
  if (refSchema.unevaluatedProperties !== undefined || refSchema.unevaluatedItems !== undefined)
    return false;

  // Don't inline schemas with complex object validation
  if (refSchema.properties || refSchema.patternProperties || refSchema.additionalProperties)
    return false;
  if (refSchema.dependentSchemas || refSchema.dependencies) return false;

  // Don't inline schemas with complex array validation
  if (refSchema.prefixItems || refSchema.items || refSchema.contains) return false;

  // Don't inline schemas with $defs or definitions (they may have nested refs)
  // These should be compiled as separate functions to allow proper ref resolution
  if (refSchema.$defs || refSchema.definitions) return false;

  // Count the number of simple validation keywords
  const keywords = Object.keys(refSchema).filter(
    (k) =>
      k !== '$schema' && k !== '$comment' && k !== 'title' && k !== 'description' && k !== '$anchor'
  );

  // Inline if it has only a few simple keywords (type, const, enum, format, etc.)
  // This catches the common case of { type: "string" }, { type: "integer" }, etc.
  return keywords.length <= 5;
}

/**
 * Generate $ref check
 */
export function generateRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  if (!schema.$ref) return;

  // Don't inline remote refs (http:// or https://) - they may have complex internal structure
  const isRemoteRef = /^https?:\/\//.test(schema.$ref);

  // Resolve the reference
  let refSchema = ctx.resolveRef(schema.$ref, schema);

  // Optimization: follow chains of $ref-only schemas to avoid function call overhead
  // Only safe when there are no $dynamicAnchor definitions in the entire schema tree
  if (!ctx.hasAnyDynamicAnchors() && refSchema) {
    let depth = 0;
    const maxDepth = 100; // Prevent infinite loops
    while (
      typeof refSchema === 'object' &&
      refSchema.$ref &&
      Object.keys(refSchema).length === 1 && // Only $ref, nothing else
      depth < maxDepth
    ) {
      const nextSchema = ctx.resolveRef(refSchema.$ref, refSchema);
      if (!nextSchema) break;
      refSchema = nextSchema;
      depth++;
    }
  }

  if (!refSchema) {
    // Can't resolve - schema is invalid, always fail
    genError(code, pathExprCode, '$ref', `Cannot resolve reference ${schema.$ref}`);
    return;
  }

  // Optimize: if ref points to a no-op schema (true or {}), skip entirely
  if (
    refSchema === true ||
    (typeof refSchema === 'object' && Object.keys(refSchema).length === 0)
  ) {
    return;
  }

  // NEW OPTIMIZATION: Inline simple schemas to avoid function call overhead
  // But don't inline remote refs - they need their own compilation context
  if (!isRemoteRef && shouldInlineRef(refSchema, ctx, dynamicScopeVar, evalTracker)) {
    // Inline the schema validation directly
    generateSchemaValidator(
      code,
      refSchema,
      dataVar,
      pathExprCode,
      ctx,
      dynamicScopeVar,
      evalTracker
    );
    return;
  }

  // Get the function name (queue for compilation if needed)
  const funcName = new Name(ctx.getCompiledName(refSchema) ?? ctx.queueCompile(refSchema));

  // In legacy mode, dynamicScopeVar is undefined - simpler function call
  if (!dynamicScopeVar) {
    code.if(_`!${funcName}(${dataVar}, errors, ${pathExprCode})`, () => {
      code.line(_`return false;`);
    });
    return;
  }

  // Check if the $ref is entering a new schema resource
  // This can happen in two ways:
  // 1. The $ref URI part (e.g., "bar" in "bar#/$defs/item") identifies a resource
  // 2. The resolved schema has its own $id, making it a sub-resource
  //
  // When both happen, the resolved schema's resource takes precedence
  // because that's where the $dynamicRef will be evaluated.
  let refResourceId = ctx.getRefResourceId(schema.$ref, schema);

  // Check if the resolved schema itself is a resource (has its own $id)
  if (typeof refSchema === 'object' && refSchema !== null && typeof refSchema.$id === 'string') {
    // The resolved schema is its own resource - use its anchors
    // Resolve the $id relative to its base URI
    const refSchemaResourceId = ctx.getSchemaResourceId(refSchema);
    if (refSchemaResourceId) {
      refResourceId = refSchemaResourceId;
    } else {
      refResourceId = refSchema.$id;
    }
  }

  if (refResourceId) {
    const resourceAnchors = ctx.getResourceDynamicAnchors(refResourceId);
    if (resourceAnchors.length > 0) {
      // Push dynamic anchors for this resource, call validator, then pop
      // Pass tracker if we have one (for runtime-optional tracking)
      const trackerArg = evalTracker ? _`, ${evalTracker.trackerVar}` : _``;
      code.block(_``, () => {
        const pushCount = resourceAnchors.length;
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName = new Name(
            ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema)
          );
          code.line(
            _`${dynamicScopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
          );
        }
        code.if(
          _`!${funcName}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar}${trackerArg})`,
          () => {
            // Pop before returning
            for (let i = 0; i < pushCount; i++) {
              code.line(_`${dynamicScopeVar}.pop();`);
            }
            code.line(_`return false;`);
          }
        );
        // Pop after successful validation
        for (let i = 0; i < pushCount; i++) {
          code.line(_`${dynamicScopeVar}.pop();`);
        }
      });
      return;
    }
  }

  // No dynamic anchors to push - simple call
  // Pass tracker if we have one (for runtime-optional tracking)
  const trackerArg = evalTracker ? _`, ${evalTracker.trackerVar}` : _``;
  code.if(
    _`!${funcName}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar}${trackerArg})`,
    () => {
      code.line(_`return false;`);
    }
  );
}

/**
 * Generate composition checks (allOf, anyOf, oneOf, not, if-then-else)
 *
 * When evalTracker is provided, subschema validation is inlined so that
 * evaluated properties can be tracked. Without a tracker, subschemas may
 * be compiled as separate functions for efficiency.
 */
export function generateCompositionChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  // allOf - all subschemas must validate
  // Always inline with tracker since all branches execute
  if (schema.allOf && schema.allOf.length > 0) {
    for (const subSchema of schema.allOf) {
      generateSchemaValidator(
        code,
        subSchema,
        dataVar,
        pathExprCode,
        ctx,
        dynamicScopeVar,
        evalTracker
      );
    }
  }

  // anyOf - at least one subschema must validate
  if (schema.anyOf && schema.anyOf.length > 0) {
    // If any schema is a no-op (true, {}), anyOf always passes
    // NOTE: no-op schemas (true/{}) match everything but DON'T mark any properties as evaluated
    // So we still need to check other branches for property tracking
    if (schema.anyOf.some((s) => isNoOpSchema(s)) && !evalTracker?.enabled) {
      // Skip generating anyOf check entirely when not tracking
    } else {
      const resultVar = code.genVar('anyOfResult');
      code.line(_`let ${resultVar} = false;`);

      // Use a temp tracker for each branch, merge into parent only if valid
      schema.anyOf.forEach((subSchema) => {
        // Optimization: skip temp tracker for no-op schemas (true, {})
        // They match everything but don't contribute any annotations
        const needsTracker = !isNoOpSchema(subSchema) && subSchema !== false;
        const tempVar = needsTracker ? evalTracker?.createTempTracker('anyOfTracker') : undefined;
        const checkExpr = generateSubschemaCheck(code, subSchema, dataVar, ctx, tempVar);
        code.if(checkExpr, () => {
          code.line(_`${resultVar} = true;`);
          if (needsTracker) {
            evalTracker?.mergeFrom(tempVar);
          }
        });
      });

      code.if(_`!${resultVar}`, () => {
        genError(code, pathExprCode, 'anyOf', 'Value must match at least one schema');
      });
    }
  }

  // oneOf - exactly one subschema must validate
  if (schema.oneOf && schema.oneOf.length > 0) {
    const countVar = code.genVar('oneOfCount');
    code.line(_`let ${countVar} = 0;`);

    // Use a temp tracker for each branch, merge into parent only if valid
    schema.oneOf.forEach((subSchema) => {
      // Optimization: skip temp tracker for no-op schemas (true, {})
      // They match everything but don't contribute any annotations
      const needsTracker = !isNoOpSchema(subSchema) && subSchema !== false;
      const tempVar = needsTracker ? evalTracker?.createTempTracker('oneOfTracker') : undefined;
      const checkExpr = generateSubschemaCheck(code, subSchema, dataVar, ctx, tempVar);
      code.if(checkExpr, () => {
        code.line(_`${countVar}++;`);
        if (needsTracker) {
          evalTracker?.mergeFrom(tempVar);
        }
      });
      // Early exit if more than one matches (only when not tracking)
      if (!evalTracker?.enabled) {
        code.if(_`${countVar} > 1`, () => {
          genError(code, pathExprCode, 'oneOf', 'Value must match exactly one schema');
        });
      }
    });

    code.if(_`${countVar} !== 1`, () => {
      genError(code, pathExprCode, 'oneOf', 'Value must match exactly one schema');
    });
  }

  // not - subschema must NOT validate
  // Note: 'not' doesn't evaluate properties - it just checks they DON'T match
  if (schema.not !== undefined) {
    const notSchema = schema.not;

    // Optimization: detect always-pass and always-fail patterns
    // not: true or not: {} → always fails (since true/{} matches everything)
    if (isNoOpSchema(notSchema)) {
      genError(code, pathExprCode, 'not', 'Value must not match schema');
    } else if (notSchema === false) {
      // Optimization: not: false → always passes (since false matches nothing)
      // Skip - always valid
    } else if (
      typeof notSchema === 'object' &&
      notSchema !== null &&
      notSchema.not !== undefined &&
      Object.keys(notSchema).length === 1
    ) {
      // Optimization: detect double negation patterns
      // not: { not: {} } or not: { not: true } → simplify to true (always passes)
      // not: { not: false } → simplify to false (always fails)
      const innerNotSchema = notSchema.not;

      if (isNoOpSchema(innerNotSchema)) {
        // not: { not: {} } or not: { not: true } → always passes (skip)
      } else if (innerNotSchema === false) {
        // not: { not: false } → always fails
        genError(code, pathExprCode, 'not', 'Value must not match schema');
      } else {
        // Not optimizable - generate normal check
        const checkExpr = generateSubschemaCheck(code, notSchema, dataVar, ctx);
        code.if(checkExpr, () => {
          genError(code, pathExprCode, 'not', 'Value must not match schema');
        });
      }
    } else {
      // Not optimizable - generate normal check
      const checkExpr = generateSubschemaCheck(code, notSchema, dataVar, ctx);
      code.if(checkExpr, () => {
        genError(code, pathExprCode, 'not', 'Value must not match schema');
      });
    }
  }

  // if-then-else
  if (schema.if !== undefined) {
    const ifSchema = schema.if;
    const thenSchema = schema.then;
    const elseSchema = schema.else;

    // Skip if there's no then or else AND we're not tracking
    // (when tracking, we need to evaluate if's properties even without then/else)
    if (thenSchema === undefined && elseSchema === undefined && !evalTracker?.enabled) {
      return;
    }

    // Check if condition matches
    // Use temp tracker so we only merge if condition matches
    const condVar = code.genVar('ifCond');
    // Optimization: skip temp tracker for no-op schemas (true, {})
    const needsTracker = !isNoOpSchema(ifSchema) && ifSchema !== false;
    const tempVar = needsTracker ? evalTracker?.createTempTracker('ifTracker') : undefined;
    const checkExpr = generateSubschemaCheck(code, ifSchema, dataVar, ctx, tempVar);
    code.line(_`const ${condVar} = ${checkExpr};`);

    // Merge temp tracker into parent only if condition matched
    if (tempVar) {
      code.if(condVar, () => {
        evalTracker?.mergeFrom(tempVar);
      });
    }

    // When if matches, apply then schema if present
    code.if(condVar, () => {
      if (thenSchema !== undefined) {
        if (thenSchema === false) {
          genError(code, pathExprCode, 'then', 'Conditional validation failed');
        } else if (thenSchema !== true) {
          generateSchemaValidator(
            code,
            thenSchema,
            dataVar,
            pathExprCode,
            ctx,
            dynamicScopeVar,
            evalTracker
          );
        }
      }
    });

    // When if doesn't match, apply else schema if present
    if (elseSchema !== undefined) {
      code.if(_`!${condVar}`, () => {
        if (elseSchema === false) {
          genError(code, pathExprCode, 'else', 'Conditional validation failed');
        } else if (elseSchema !== true) {
          generateSchemaValidator(
            code,
            elseSchema,
            dataVar,
            pathExprCode,
            ctx,
            dynamicScopeVar,
            evalTracker
          );
        }
      });
    }
  }
}

/**
 * Generate a subschema check expression.
 * Compiles the schema to a separate function and returns a call expression (without tracker).
 *
 * This is used for checking if a subschema matches without marking properties.
 * For anyOf/oneOf, we first check with this, then call again with tracker if matched.
 */
function generateSubschemaCheck(
  _code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  ctx: CompileContext,
  trackerVar?: Name
): Code {
  // Handle no-op schemas (true, {}) - always pass
  if (schema === true) return _`true`;
  if (typeof schema === 'object' && schema !== null && Object.keys(schema).length === 0) {
    return _`true`;
  }
  // Handle always-fail schema
  if (schema === false) return _`false`;

  // OPTIMIZATION: Resolve $ref chains and inline simple schemas
  let resolvedSchema: JsonSchema = schema;
  if (
    typeof schema === 'object' &&
    schema !== null &&
    schema.$ref &&
    !ctx.hasAnyDynamicAnchors() // Don't optimize with dynamic anchors
  ) {
    // Resolve the reference and follow chains
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      resolvedSchema = refSchema;

      // Follow $ref-only chains to the final schema
      let depth = 0;
      const maxDepth = 100;
      while (
        typeof resolvedSchema === 'object' &&
        resolvedSchema !== null &&
        '$ref' in resolvedSchema &&
        resolvedSchema.$ref &&
        Object.keys(resolvedSchema).length === 1 &&
        depth < maxDepth
      ) {
        const nextSchema = ctx.resolveRef(resolvedSchema.$ref, resolvedSchema);
        if (!nextSchema) break;
        resolvedSchema = nextSchema;
        depth++;
      }
    }
  }

  // Try to inline simple schemas for better performance
  // Simple type/const/enum checks don't affect property tracking, so we can inline even with tracker
  if (
    typeof resolvedSchema === 'object' &&
    resolvedSchema !== null &&
    !resolvedSchema.$ref && // Must be fully resolved (no more refs)
    !resolvedSchema.$id && // Not a resource
    !resolvedSchema.$dynamicRef &&
    !resolvedSchema.$dynamicAnchor &&
    !resolvedSchema.allOf &&
    !resolvedSchema.anyOf &&
    !resolvedSchema.oneOf &&
    !resolvedSchema.not &&
    !resolvedSchema.if &&
    !resolvedSchema.properties &&
    !resolvedSchema.patternProperties &&
    !resolvedSchema.additionalProperties &&
    !resolvedSchema.dependentSchemas &&
    !resolvedSchema.dependencies &&
    !resolvedSchema.prefixItems &&
    !resolvedSchema.items &&
    !resolvedSchema.contains &&
    !resolvedSchema.unevaluatedProperties &&
    !resolvedSchema.unevaluatedItems &&
    !resolvedSchema.$defs &&
    !resolvedSchema.definitions
  ) {
    // Count actual validation keywords (exclude metadata)
    const keywords = Object.keys(resolvedSchema).filter(
      (k) =>
        k !== '$schema' &&
        k !== '$comment' &&
        k !== 'title' &&
        k !== 'description' &&
        k !== '$anchor' &&
        k !== 'examples' &&
        k !== 'default'
    );

    // Only inline very simple schemas
    if (keywords.length === 0) {
      return _`true`; // Empty schema = no-op
    }

    // Inline single type check
    if (keywords.length === 1 && resolvedSchema.type) {
      const types = Array.isArray(resolvedSchema.type)
        ? resolvedSchema.type
        : [resolvedSchema.type];
      if (types.length === 1) {
        return getTypeCheck(dataVar, types[0]);
      } else {
        // Multiple types - need OR
        const checks = types.map((t) => getTypeCheck(dataVar, t));
        return or(...checks);
      }
    }

    // Inline const check (primitives only for simplicity)
    if (
      keywords.length === 1 &&
      'const' in resolvedSchema &&
      (resolvedSchema.const === null || typeof resolvedSchema.const !== 'object')
    ) {
      return _`${dataVar} === ${stringify(resolvedSchema.const)}`;
    }

    // Inline simple enum check (up to 5 primitive values)
    if (keywords.length === 1 && resolvedSchema.enum && resolvedSchema.enum.length <= 5) {
      const allPrimitives = resolvedSchema.enum.every(
        (val) => val === null || typeof val !== 'object'
      );
      if (allPrimitives) {
        const checks = resolvedSchema.enum.map((val) => _`${dataVar} === ${stringify(val)}`);
        return or(...checks);
      }
    }
  }

  // Fall back to function call for complex schemas
  const funcName = new Name(ctx.queueCompile(schema));
  const trackerArg = trackerVar ? _`, ${trackerVar}` : _``;
  // Skip dynamicScope in legacy mode OR when there are no dynamic anchors
  if (ctx.options.legacyRef || !ctx.hasAnyDynamicAnchors()) {
    return _`${funcName}(${dataVar}, null, ''${trackerArg})`;
  }
  return _`${funcName}(${dataVar}, null, '', dynamicScope${trackerArg})`;
}

/**
 * Generate items and prefixItems checks for arrays
 * Supports both draft-2020-12 (prefixItems + items) and draft-07 (items array + additionalItems)
 */
export function generateItemsChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  // Draft-07 compatibility: items can be an array (acts like prefixItems)
  const itemsIsArray = Array.isArray(schema.items);

  // Cross-draft compatibility: prefixItems was introduced in 2020-12
  // In 2019-09 and earlier, prefixItems is not a keyword and should be ignored
  const hasPrefixItems = supportsFeature(schema.$schema ?? ctx.options.defaultMeta, 'prefixItems');

  const tupleSchemas: JsonSchema[] = itemsIsArray
    ? (schema.items as JsonSchema[])
    : hasPrefixItems && schema.prefixItems
      ? [...schema.prefixItems]
      : [];

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
  // Skip no-op schemas (true, {})
  const hasAfterTupleSchema = afterTupleSchema !== undefined && !isNoOpSchema(afterTupleSchema);

  // Filter out no-op tuple schemas
  const nonTrivialTupleSchemas = tupleSchemas
    .map((s, i) => ({ schema: s, index: i }))
    .filter(({ schema: s }) => !isNoOpSchema(s));
  const hasNonTrivialTuples = nonTrivialTupleSchemas.length > 0;

  // Mark tuple items as evaluated (even trivial ones count for unevaluatedItems)
  if (tupleSchemas.length > 0) {
    evalTracker?.markItem(tupleSchemas.length - 1);
  }

  // Mark all items as evaluated if items schema covers them
  if (afterTupleSchema !== undefined && afterTupleSchema !== false) {
    evalTracker?.markAllItems();
  }

  if (!hasNonTrivialTuples && !hasAfterTupleSchema) return;

  const genChecks = () => {
    // Handle tuple items (prefixItems in 2020-12, items array in draft-07)
    // Only validate non-trivial schemas
    for (const { schema: itemSchema, index: i } of nonTrivialTupleSchemas) {
      const itemPathExpr = pathExpr(pathExprCode, i);
      code.if(_`${dataVar}.length > ${i}`, () => {
        const itemAccess = indexAccess(dataVar, i);
        const itemVar = code.genVar('item');
        code.line(_`const ${itemVar} = ${itemAccess};`);
        generateSchemaValidator(code, itemSchema, itemVar, itemPathExpr, ctx, dynamicScopeVar);
      });
    }

    // Handle items after tuple (items in 2020-12, additionalItems in draft-07)
    if (hasAfterTupleSchema) {
      const startIndex = tupleSchemas.length;

      if (afterTupleSchema === false) {
        // No additional items allowed
        if (startIndex > 0) {
          code.if(_`${dataVar}.length > ${startIndex}`, () => {
            genError(
              code,
              pathExprCode,
              itemsIsArray ? 'additionalItems' : 'items',
              `Array must have at most ${startIndex} items`
            );
          });
        } else {
          code.if(_`${dataVar}.length > 0`, () => {
            genError(code, pathExprCode, 'items', 'Array must be empty');
          });
        }
      } else if (afterTupleSchema !== true) {
        // Validate each item after tuple
        // Optimization: inline simple type-only item schemas to avoid function call overhead
        const simpleType = getSimpleType(afterTupleSchema);

        if (simpleType) {
          // Inline simple type check for better performance
          const iVar = code.genVar('i');
          code.forArray(
            iVar,
            dataVar,
            () => {
              const itemAccess = indexAccess(dataVar, iVar);
              const itemPathExpr = pathExprIndex(pathExprCode, iVar);
              const itemVar = code.genVar('item');
              code.line(_`const ${itemVar} = ${itemAccess};`);
              // Inline type check with error handling
              const typeCheck = getTypeCheck(itemVar, simpleType);
              code.if(not(typeCheck), () => {
                genError(code, itemPathExpr, 'type', `Expected ${simpleType}`);
              });
            },
            startIndex
          );
        } else {
          // Complex schema - use normal validation path
          const iVar = code.genVar('i');
          code.forArray(
            iVar,
            dataVar,
            () => {
              const itemAccess = indexAccess(dataVar, iVar);
              const itemPathExpr = pathExprIndex(pathExprCode, iVar);
              const itemVar = code.genVar('item');
              code.line(_`const ${itemVar} = ${itemAccess};`);
              generateSchemaValidator(
                code,
                afterTupleSchema!,
                itemVar,
                itemPathExpr,
                ctx,
                dynamicScopeVar
              );
            },
            startIndex
          );
        }
      }
    }
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    // Only check if data is an array
    code.if(_`Array.isArray(${dataVar})`, genChecks);
  }
}

/**
 * Generate format check code
 */
// Known format validators - used to skip existence check for known formats
const KNOWN_FORMATS = new Set([
  'email',
  'uuid',
  'date-time',
  'uri',
  'ipv4',
  'ipv6',
  'date',
  'time',
  'duration',
  'hostname',
  'uri-reference',
  'json-pointer',
  'relative-json-pointer',
  'regex',
]);

// Pre-created format validators instances (one for full validation, one for fast regex-only)
const sharedFormatValidators = createFormatValidators(false);

export function generateFormatCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (schema.format === undefined) return;

  // Skip if formatAssertion is disabled
  if (!ctx.options.formatAssertion) return;

  const format = schema.format;

  // Check if schema already has type: 'string' (no need to re-check type)
  const hasStringType = schema.type === 'string';

  // For known formats, register a direct function reference for faster calls
  const isKnownFormat = KNOWN_FORMATS.has(format);

  const validators = sharedFormatValidators;

  let formatCheck: Code;
  if (isKnownFormat) {
    // Register the specific format validator as a runtime function for direct calls
    // This avoids the object property lookup overhead on every validation
    const funcName = 'fmt_' + format.replace(/-/g, '_');
    const validatorName = new Name(funcName);

    // Always register the runtime function (ctx.addRuntimeFunction is idempotent for same name)
    ctx.addRuntimeFunction(funcName, validators[format]);

    formatCheck = _`!${validatorName}(${dataVar})`;
  } else {
    formatCheck = _`formatValidators[${format}] && !formatValidators[${format}](${dataVar})`;
  }

  const genFormatCheck = () => {
    code.if(formatCheck, () => {
      genError(code, pathExprCode, 'format', `Invalid ${format} format`);
    });
  };

  if (hasStringType) {
    // Type already checked, just do format check
    genFormatCheck();
  } else {
    // Only check if data is a string
    code.if(_`typeof ${dataVar} === 'string'`, genFormatCheck);
  }
}

/**
 * Generate $dynamicRef check code
 */
export function generateDynamicRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
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
      genError(code, pathExprCode, '$dynamicRef', `Cannot resolve reference ${ref}`);
      return;
    }
    const staticFuncName = new Name(ctx.queueCompile(staticSchema));

    // Check if the statically resolved schema has a matching $dynamicAnchor
    // If not, $dynamicRef behaves like a regular $ref (no dynamic scope search)
    const hasDynamicAnchor =
      typeof staticSchema === 'object' &&
      staticSchema !== null &&
      staticSchema.$dynamicAnchor === anchorName;

    // If no dynamic scope var (legacy mode or empty), just call static validator
    if (!dynamicScopeVar) {
      code.if(_`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, [])`, () => {
        code.line(_`return false;`);
      });
    } else if (!hasDynamicAnchor) {
      // No matching $dynamicAnchor - behave like a regular $ref
      code.if(
        _`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar})`,
        () => {
          code.line(_`return false;`);
        }
      );
    } else {
      // Has matching $dynamicAnchor - search dynamic scope at runtime
      // The dynamic scope is searched from the BEGINNING (outermost/first) to find the first match
      const trackerArg = evalTracker ? _`, ${evalTracker.trackerVar}` : _``;
      code.block(_``, () => {
        code.line(_`let dynamicValidator = null;`);
        code.line(_`for (let i = 0; i < ${dynamicScopeVar}.length; i++) {`);
        code.line(_`  if (${dynamicScopeVar}[i].anchor === ${stringify(anchorName)}) {`);
        code.line(_`    dynamicValidator = ${dynamicScopeVar}[i].validate;`);
        code.line(_`    break;`);
        code.line(_`  }`);
        code.line(_`}`);
        // Use dynamic validator if found, otherwise use static fallback
        // Pass tracker so properties are marked at runtime
        code.line(_`const validator = dynamicValidator || ${staticFuncName};`);
        code.if(
          _`!validator(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar}${trackerArg})`,
          () => {
            code.line(_`return false;`);
          }
        );
      });
    }
  } else {
    // Not an anchor reference - resolve statically like $ref
    // This handles cases like $dynamicRef: "#/$defs/items"
    const refSchema = ctx.resolveRef(ref, schema);

    if (!refSchema) {
      genError(code, pathExprCode, '$dynamicRef', `Cannot resolve reference ${ref}`);
      return;
    }

    const funcName = new Name(ctx.queueCompile(refSchema));
    const scopeArg = dynamicScopeVar || _`[]`;
    const trackerArg = evalTracker ? _`, ${evalTracker.trackerVar}` : _``;
    code.if(_`!${funcName}(${dataVar}, errors, ${pathExprCode}, ${scopeArg}${trackerArg})`, () => {
      code.line(_`return false;`);
    });
  }
}

/**
 * Generate unevaluatedProperties check code
 *
 * This function simply checks each property against the tracker.
 * All property marking is done by the validators themselves (properties,
 * patternProperties, additionalProperties, allOf, $ref, etc.) as they execute.
 */
export function generateUnevaluatedPropertiesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  if (schema.unevaluatedProperties === undefined) return;

  // If no tracker, we can't track evaluated properties - this shouldn't happen
  // since generateSchemaValidator creates one when unevaluatedProperties exists
  if (!evalTracker || !evalTracker.trackingProps) {
    return;
  }

  // Optimization: If additionalProperties is present (even boolean true or {}),
  // ALL properties are marked as evaluated via markAllProps().
  // In this case, unevaluatedProperties check will never find unevaluated properties,
  // so we can skip generating the check entirely.
  if (schema.additionalProperties !== undefined) {
    return; // Skip check - additionalProperties handles all props
  }

  // Optimization: when unevaluatedProperties is true, just mark all props as evaluated
  // without iterating through them. This is much faster than checking each property.
  if (schema.unevaluatedProperties === true) {
    evalTracker.markAllProps();
    return;
  }

  // Only check if data is an object
  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    // Optimize: if unevaluatedProperties is true, just mark all props without looping
    if (schema.unevaluatedProperties === true) {
      evalTracker.markAllProps();
    } else {
      // Check each property against the tracker
      const keyVar = new Name('key');
      code.forIn(keyVar, dataVar, () => {
        const condition = evalTracker.isUnevaluatedProp(keyVar);
        const keyPathExpr = pathExprDynamic(pathExprCode, keyVar);

        code.if(condition, () => {
          if (schema.unevaluatedProperties === false) {
            genError(
              code,
              keyPathExpr,
              'unevaluatedProperties',
              'Unevaluated property not allowed'
            );
          } else if (schema.unevaluatedProperties !== undefined) {
            // unevaluatedProperties: <schema> - validate and mark as evaluated
            const propVar = code.genVar('up');
            code.line(_`const ${propVar} = ${dataVar}[${keyVar}];`);
            generateSchemaValidator(
              code,
              schema.unevaluatedProperties,
              propVar,
              keyPathExpr,
              ctx,
              dynamicScopeVar
            );
            evalTracker.markPropDynamic(keyVar);
          }
        });
      });
    }
  });
}

/**
 * Generate unevaluatedItems check code
 *
 * This uses the runtime evalTracker to check which items have been evaluated.
 * Items are marked as evaluated by generateItemsChecks (prefixItems, items)
 * and generateContainsCheck (contains).
 */
export function generateUnevaluatedItemsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name,
  evalTracker?: EvalTracker
): void {
  if (schema.unevaluatedItems === undefined) return;

  // If no tracker, we can't track evaluated items - this shouldn't happen
  // since generateSchemaValidator creates one when unevaluatedItems exists
  if (!evalTracker || !evalTracker.trackingItems) {
    return;
  }

  // Optimization: when unevaluatedItems is true, just mark all items without iterating
  if (schema.unevaluatedItems === true) {
    code.if(_`Array.isArray(${dataVar})`, () => {
      evalTracker.markAllItems();
    });
    return;
  }

  // Only check if data is an array
  code.if(_`Array.isArray(${dataVar})`, () => {
    // Optimization: skip the entire loop if all items are already marked as evaluated
    // This happens when a nested schema has unevaluatedItems: true
    code.if(_`${evalTracker.trackerVar}.maxItem !== Infinity`, () => {
      // Check each item against the tracker
      const iVar = code.genVar('i');
      code.forArray(iVar, dataVar, () => {
        const condition = evalTracker.isUnevaluatedItem(iVar);
        const itemPathExpr = pathExprIndex(pathExprCode, iVar);

        code.if(condition, () => {
          if (schema.unevaluatedItems === false) {
            genError(code, itemPathExpr, 'unevaluatedItems', 'Unevaluated item not allowed');
          } else {
            // unevaluatedItems: <schema> - validate and mark as evaluated
            const itemVar = code.genVar('ui');
            code.line(_`const ${itemVar} = ${dataVar}[${iVar}];`);
            generateSchemaValidator(
              code,
              schema.unevaluatedItems as JsonSchema,
              itemVar,
              itemPathExpr,
              ctx,
              dynamicScopeVar
            );
            evalTracker.markItemsDynamic(iVar);
          }
        });
      });
    });
  });
}
