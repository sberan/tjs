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
import { createFormatValidators } from './keywords/format.js';
import {
  genError,
  genSubschemaExit,
  genPropertyCheck,
  genBatchedRequiredChecks,
  hasTypeConstraint,
  getTypeCheck,
  getOptimizedUnionTypeCheck,
  getItemTypes,
  isNoOpSchema,
  getSimpleType,
} from './keywords/utils.js';
import {
  hasRestrictiveUnevaluatedProperties,
  containsUnevaluatedProperties,
} from './props-tracker.js';
import { hasRestrictiveUnevaluatedItems, containsUnevaluatedItems } from './items-tracker.js';
import { extractStaticProperties } from './schema-utils.js';
import { AnnotationTracker } from './annotation-tracker.js';

/**
 * Compile error type for internal use (AJV-compatible format)
 */
export interface CompileError {
  instancePath: string; // JSON pointer format: "" for root, "/prop", "/arr/0"
  schemaPath: string; // JSON pointer to schema location
  keyword: string; // Validation keyword that failed
  params: object; // Keyword-specific params
  message: string; // Human-readable error message
}

/**
 * Compiled validation function type.
 * The function sets .errors property on itself (AJV-compatible).
 */
export interface ValidateFn {
  (data: unknown): boolean;
  errors: CompileError[] | null;
}

/**
 * Compile a JSON Schema into a validation function
 */
export function compile(schema: JsonSchema, options: CompileOptions = {}): ValidateFn {
  const ctx = new CompileContext(schema, options);
  const code = new CodeBuilder();

  // Initialize property tracker for unevaluatedProperties support
  // Pre-scan schema to activate tracking if any nested schema has unevaluatedProperties
  const needsPropsTracking = containsUnevaluatedProperties(schema);
  ctx.initPropsTracker(code, needsPropsTracking);

  // Initialize items tracker for unevaluatedItems support
  // Pre-scan schema to activate tracking if any nested schema has unevaluatedItems
  const needsItemsTracking = containsUnevaluatedItems(schema);
  ctx.initItemsTracker(code, needsItemsTracking);

  // Add runtime functions
  ctx.addRuntimeFunction('deepEqual', createDeepEqual());
  ctx.addRuntimeFunction('formatValidators', createFormatValidators());
  ctx.addRuntimeFunction('ucs2length', createUcs2Length());

  // Generate the main validation function
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema, mainFuncName);

  // In legacy mode (draft-07 and earlier), skip dynamic scope entirely for better performance
  // Also skip if schema has no dynamic anchors (common case - significant perf improvement)
  // Include $recursiveAnchor (draft 2019-09) in the check
  const hasDynamicFeatures =
    !ctx.options.legacyRef && (ctx.hasAnyDynamicAnchors() || ctx.hasAnyRecursiveAnchors());
  const dynamicScopeVar = hasDynamicFeatures ? new Name('dynamicScope') : undefined;

  // Collect dynamic anchors from the root resource to add to scope at startup
  const anchorFuncNames: Array<{ anchor: string; funcName: Name }> = [];
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
  let queued: { schema: JsonSchema; funcName: Name } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    const qFuncName = q.funcName;
    code.blank();
    if (hasDynamicFeatures) {
      // Function signature: (data, errors, path, dynamicScope)
      code.block(_`function ${qFuncName}(data, errors, path, dynamicScope)`, () => {
        const qDataVar = new Name('data');
        const qPathVar = new Name('path');
        const qDynamicScope = new Name('dynamicScope');
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx, qDynamicScope);
        code.line(_`return true;`);
      });
    } else {
      // In legacy mode, skip dynamicScope parameter for faster function calls
      // Function signature: (data, errors, path)
      code.block(_`function ${qFuncName}(data, errors, path)`, () => {
        const qDataVar = new Name('data');
        const qPathVar = new Name('path');
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx);
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
    scopeInit = 'const dynamicScope = new Map();\n';
    for (const { anchor, funcName } of anchorFuncNames) {
      scopeInit += `dynamicScope.set(${JSON.stringify(anchor)}, ${funcName});\n`;
    }
  }

  const fullCode = `
${scopeInit}
${code.toString()}
${mainFuncName}.errors = null;
return true;
`;

  // DEBUG: Uncomment to see generated code
  if (process.env.DEBUG_TJS) {
    console.log('Generated code:', `function ${mainFuncName}(data, errors) {\n${fullCode}\n}`);
  }

  // Create the function with runtime dependencies injected
  const factory = new Function(
    ...runtimeNames,
    `return function ${mainFuncName}(data, errors) {\n${fullCode}\n}`
  );
  return factory(...runtimeValues) as ValidateFn;
}

/**
 * Result of compiling a schema to code (for build-time compilation)
 */
export interface CompileToCodeResult {
  /** The main function name */
  functionName: string;
  /** The generated validation code (function body) */
  code: string;
  /** Runtime dependencies that need to be included */
  runtimeDependencies: string[];
}

/**
 * Compile a JSON Schema to source code (for build-time compilation).
 * Unlike `compile()`, this returns the generated code as a string instead of a function.
 * This allows the code to be written to a file for use without the tjs compiler at runtime.
 */
export function compileToCode(
  schema: JsonSchema,
  options: CompileOptions = {}
): CompileToCodeResult {
  const ctx = new CompileContext(schema, options);
  const code = new CodeBuilder();

  // Initialize property tracker for unevaluatedProperties support
  const needsPropsTracking = containsUnevaluatedProperties(schema);
  ctx.initPropsTracker(code, needsPropsTracking);

  // Initialize items tracker for unevaluatedItems support
  const needsItemsTracking = containsUnevaluatedItems(schema);
  ctx.initItemsTracker(code, needsItemsTracking);

  // Add runtime functions
  ctx.addRuntimeFunction('deepEqual', createDeepEqual());
  ctx.addRuntimeFunction('formatValidators', createFormatValidators());
  ctx.addRuntimeFunction('ucs2length', createUcs2Length());

  // Generate the main validation function
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema, mainFuncName);

  // Check for dynamic features
  const hasDynamicFeatures =
    !ctx.options.legacyRef && (ctx.hasAnyDynamicAnchors() || ctx.hasAnyRecursiveAnchors());
  const dynamicScopeVar = hasDynamicFeatures ? new Name('dynamicScope') : undefined;

  // Collect dynamic anchors from the root resource
  const anchorFuncNames: Array<{ anchor: string; funcName: Name }> = [];
  if (hasDynamicFeatures) {
    const rootResourceId =
      typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : '__root__';
    const rootDynamicAnchors = ctx.getResourceDynamicAnchors(rootResourceId);

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
  let queued: { schema: JsonSchema; funcName: Name } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued;
    const qFuncName = q.funcName;
    code.blank();
    if (hasDynamicFeatures) {
      code.block(_`function ${qFuncName}(data, errors, path, dynamicScope)`, () => {
        const qDataVar = new Name('data');
        const qPathVar = new Name('path');
        const qDynamicScope = new Name('dynamicScope');
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx, qDynamicScope);
        code.line(_`return true;`);
      });
    } else {
      code.block(_`function ${qFuncName}(data, errors, path)`, () => {
        const qDataVar = new Name('data');
        const qPathVar = new Name('path');
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx);
        code.line(_`return true;`);
      });
    }
  }

  // Build the runtime dependencies list
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());

  // Push root resource's dynamic anchors to scope at startup
  let scopeInit = '';
  if (hasDynamicFeatures) {
    scopeInit = 'const dynamicScope = new Map();\n';
    for (const { anchor, funcName } of anchorFuncNames) {
      scopeInit += `dynamicScope.set(${JSON.stringify(anchor)}, ${funcName});\n`;
    }
  }

  const fullCode = `${scopeInit}${code.toString()}
${mainFuncName}.errors = null;
return true;`;

  return {
    functionName: mainFuncName.str,
    code: fullCode,
    runtimeDependencies: runtimeNames,
  };
}

/**
 * Generate validation code for a schema
 * @param pathExprCode - Code expression that evaluates to the current path string
 * @param dynamicScopeVar - Variable name for the dynamic scope array (for $dynamicRef)
 */
function generateSchemaValidator(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  // In legacy mode, never use dynamic scope
  const scopeVar = ctx.options.legacyRef ? undefined : dynamicScopeVar;
  // Boolean schemas
  if (schema === true) {
    // Always valid - no code needed
    return;
  }

  if (schema === false) {
    genError(code, pathExprCode, '#', 'false', 'boolean schema is false', {}, ctx);
    return;
  }

  // String shorthand types (e.g., 'string' is equivalent to { type: 'string' })
  if (typeof schema === 'string') {
    // Convert shorthand to equivalent type schema and recurse
    generateSchemaValidator(code, { type: schema }, dataVar, pathExprCode, ctx, dynamicScopeVar);
    return;
  }

  const propsTracker = ctx.getPropsTracker();
  const itemsTracker = ctx.getItemsTracker();

  if (!propsTracker.active && hasRestrictiveUnevaluatedProperties(schema)) {
    propsTracker.active = true;
  }

  // Lazy activation for unevaluatedItems
  if (!itemsTracker.active && hasRestrictiveUnevaluatedItems(schema)) {
    itemsTracker.activate();
  }

  // If schema has $dynamicRef and unevaluatedProperties, we need dynamic tracking
  // because the dynamically resolved schema may define additional properties
  if (schema.$dynamicRef && hasRestrictiveUnevaluatedProperties(schema)) {
    propsTracker.activate();
    propsTracker.enableDynamic();
  }

  // If schema has $dynamicRef and unevaluatedItems, we need dynamic tracking
  if (schema.$dynamicRef && hasRestrictiveUnevaluatedItems(schema)) {
    itemsTracker.activate();
    itemsTracker.enableDynamic();
  }

  // Check if this schema is a new schema resource (has $id)
  // If so, we need to push its dynamic anchors to scope
  // Skip this in legacy mode ($dynamicAnchor is a draft-2020-12 feature)
  let resourceAnchors: Array<{ anchor: string; schema: JsonSchema }> = [];
  const savedAnchorVars: Map<string, Name> = new Map();
  let hasRecursiveAnchor = false;
  let savedRecursiveVar: Name | undefined;
  let savedRecursiveCurrentVar: Name | undefined;
  let needsItemsScopeIsolation = false;
  let needsPropsScopeIsolation = false;

  if (scopeVar && schema.$id) {
    const schemaResourceId = ctx.getBaseUri(schema);
    resourceAnchors = schemaResourceId ? ctx.getResourceDynamicAnchors(schemaResourceId) : [];

    if (resourceAnchors.length > 0) {
      // Set dynamic anchors for this resource if not already set (first wins for $dynamicRef)
      for (const { anchor, schema: anchorSchema } of resourceAnchors) {
        const anchorFuncName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
        const savedVar = new Name('saved');
        savedAnchorVars.set(anchor, savedVar);
        code.line(_`const ${savedVar} = ${scopeVar}.get(${stringify(anchor)});`);
        code.line(
          _`if (${savedVar} === undefined) ${scopeVar}.set(${stringify(anchor)}, ${anchorFuncName});`
        );
      }
    }

    // Handle $recursiveAnchor: true (draft 2019-09)
    // Set this schema to scope with TWO anchors:
    // - '__recursive__' for $recursiveRef (outermost-wins, set only if undefined)
    // - '__recursive_current__' for $ref: "#" (innermost-wins, always overwrite)
    if (schema.$recursiveAnchor === true) {
      hasRecursiveAnchor = true;
      const recursiveFuncName = ctx.getCompiledName(schema) ?? ctx.queueCompile(schema);
      savedRecursiveVar = new Name('saved');
      code.line(_`const ${savedRecursiveVar} = ${scopeVar}.get('__recursive__');`);
      code.line(
        _`if (${savedRecursiveVar} === undefined) ${scopeVar}.set('__recursive__', ${recursiveFuncName});`
      );
      // Always update the "current" anchor for innermost semantics
      savedRecursiveCurrentVar = new Name('saved_current');
      code.line(_`const ${savedRecursiveCurrentVar} = ${scopeVar}.get('__recursive_current__');`);
      code.line(_`${scopeVar}.set('__recursive_current__', ${recursiveFuncName});`);
    }

    // When entering a new schema resource (one with $id), we need to isolate
    // tracking scopes for unevaluated* keywords if this schema doesn't have them.
    // This prevents the parent's unevaluated* constraints from leaking into the child resource.
    needsItemsScopeIsolation = itemsTracker.active && !hasRestrictiveUnevaluatedItems(schema);
    needsPropsScopeIsolation = propsTracker.active && !hasRestrictiveUnevaluatedProperties(schema);

    if (needsItemsScopeIsolation) {
      itemsTracker.pushScope();
    }
    if (needsPropsScopeIsolation) {
      propsTracker.pushScope();
    }
  }

  // In legacy mode (draft-07 and earlier), $ref overrides all sibling keywords
  if (schema.$ref && ctx.options.legacyRef) {
    generateRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
  } else {
    // Generate code for each keyword (draft-2020-12 behavior)
    generateTypeCheck(code, schema, dataVar, pathExprCode, ctx);
    generateConstCheck(code, schema, dataVar, pathExprCode, ctx);
    generateEnumCheck(code, schema, dataVar, pathExprCode, ctx);
    generateStringChecks(code, schema, dataVar, pathExprCode, ctx);
    generateFormatCheck(code, schema, dataVar, pathExprCode, ctx);
    generateContentChecks(code, schema, dataVar, pathExprCode, ctx);
    generateNumberChecks(code, schema, dataVar, pathExprCode, ctx);
    generateItemsChecks(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateArrayChecks(code, schema, dataVar, pathExprCode, ctx);
    generateObjectChecks(code, schema, dataVar, pathExprCode, ctx);
    generatePropertiesChecks(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateCompositionChecks(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateDynamicRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateRecursiveRefCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateContainsCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateDependentRequiredCheck(code, schema, dataVar, pathExprCode, ctx);
    generatePropertyNamesCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateDependentSchemasCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateDependenciesCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    // unevaluated* must be checked LAST after all other keywords
    generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
    generateUnevaluatedItemsCheck(code, schema, dataVar, pathExprCode, ctx, scopeVar);
  }

  // Pop unevaluated tracking scopes if we pushed them
  if (needsPropsScopeIsolation) {
    propsTracker.popScope(false);
  }
  if (needsItemsScopeIsolation) {
    itemsTracker.popScope(false);
  }

  // Restore dynamic anchors after validation (if we set any)
  if (resourceAnchors.length > 0 && scopeVar) {
    for (const { anchor } of resourceAnchors) {
      const savedVar = savedAnchorVars.get(anchor);
      if (savedVar) {
        // Only restore if we were the ones who set it (savedVar was undefined)
        code.line(_`if (${savedVar} === undefined) ${scopeVar}.delete(${stringify(anchor)});`);
      }
    }
  }

  // Restore recursive anchor if we set one (draft 2019-09)
  if (hasRecursiveAnchor && scopeVar && savedRecursiveVar && savedRecursiveCurrentVar) {
    // Only delete outermost anchor if we were the ones who set it (savedVar was undefined)
    code.line(_`if (${savedRecursiveVar} === undefined) ${scopeVar}.delete('__recursive__');`);
    // Always restore the "current" anchor for innermost semantics
    code.line(
      _`if (${savedRecursiveCurrentVar} !== undefined) ${scopeVar}.set('__recursive_current__', ${savedRecursiveCurrentVar});`
    );
    code.line(_`else ${scopeVar}.delete('__recursive_current__');`);
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

  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(dataVar, type);
    code.if(not(check), () => {
      genError(code, pathExprCode, '#/type', 'type', `must be ${type}`, { type }, ctx);
    });
  } else {
    // Multiple types - check if all can use typeof
    const canOptimizeWithTypeof = types.every(
      (t) => t === 'string' || t === 'number' || t === 'boolean'
    );

    if (canOptimizeWithTypeof) {
      // Optimize by caching typeof result
      const typeofVar = code.genVar('t');
      code.line(_`const ${typeofVar} = typeof ${dataVar};`);
      const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);
      code.if(not(or(...checks)), () => {
        const typeList = types.join(',');
        genError(
          code,
          pathExprCode,
          '#/type',
          'type',
          `must be ${types.join(' or ')}`,
          {
            type: typeList,
          },
          ctx
        );
      });
    } else {
      // Try optimized union check first
      const optimizedCheck = getOptimizedUnionTypeCheck(dataVar, types);
      if (optimizedCheck) {
        code.if(not(optimizedCheck), () => {
          const typeList = types.join(',');
          genError(
            code,
            pathExprCode,
            '#/type',
            'type',
            `must be ${types.join(' or ')}`,
            {
              type: typeList,
            },
            ctx
          );
        });
      } else {
        // Fallback: generate individual OR checks
        const checks = types.map((t) => getTypeCheck(dataVar, t));
        code.if(not(or(...checks)), () => {
          const typeList = types.join(',');
          genError(
            code,
            pathExprCode,
            '#/type',
            'type',
            `must be ${types.join(' or ')}`,
            {
              type: typeList,
            },
            ctx
          );
        });
      }
    }
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
  ctx: CompileContext
): void {
  if (schema.const === undefined) return;

  // For primitives, use strict equality
  if (schema.const === null || typeof schema.const !== 'object') {
    code.if(_`${dataVar} !== ${stringify(schema.const)}`, () => {
      genError(
        code,
        pathExprCode,
        '#/const',
        'const',
        'must be equal to constant',
        {
          allowedValue: schema.const,
        },
        ctx
      );
    });
  } else {
    // For objects/arrays, store as runtime constant and use deepEqual
    // This avoids JSON parsing overhead of stringify at runtime
    const constName = new Name(ctx.genRuntimeName('const'));
    ctx.addRuntimeFunction(constName.str, schema.const);
    code.if(_`!deepEqual(${dataVar}, ${constName})`, () => {
      genError(
        code,
        pathExprCode,
        '#/const',
        'const',
        'must be equal to constant',
        {
          allowedValue: schema.const,
        },
        ctx
      );
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

/**
 * Determine the optimal regex flags for a pattern string.
 * Uses 'u' flag only when necessary for better performance.
 * Cached results improve repeated calls with same patterns.
 */
const regexFlagsCache = new Map<string, string>();

function determineRegexFlags(pattern: string): string {
  // Check cache first
  const cached = regexFlagsCache.get(pattern);
  if (cached !== undefined) return cached;

  // The 'u' flag is required for:
  // 1. Unicode property escapes (\p{...}, \P{...})
  // 2. Unicode code point escapes (\u{...})
  // 3. Characters outside BMP (code points > 0xFFFF, i.e., surrogate pairs)

  // Optimized: Single pass check for all unicode requirements
  // Check for \p{ or \P{ (unicode property escapes)
  let needsUnicode = false;
  let i = 0;
  const len = pattern.length;

  while (i < len) {
    const ch = pattern.charCodeAt(i);

    // Check for surrogate pairs (high unicode)
    if (ch >= 0xd800 && ch <= 0xdfff) {
      needsUnicode = true;
      break;
    }

    // Check for backslash escapes
    if (ch === 92 /* \ */) {
      if (i + 1 < len) {
        const next = pattern.charCodeAt(i + 1);
        // Check for \p{ or \P{ (unicode property escapes)
        if (
          (next === 112 /* p */ || next === 80) /* P */ &&
          i + 2 < len &&
          pattern.charCodeAt(i + 2) === 123 /* { */
        ) {
          needsUnicode = true;
          break;
        }
        // Check for \u{ (unicode code point escapes)
        if (next === 117 /* u */ && i + 2 < len && pattern.charCodeAt(i + 2) === 123 /* { */) {
          needsUnicode = true;
          break;
        }
        i++; // Skip next char as it's escaped
      }
    }
    i++;
  }

  const flags = needsUnicode ? 'u' : '';
  regexFlagsCache.set(pattern, flags);
  return flags;
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

  // Optimization: If schema.type === 'string', we know data is already a string
  // (the type check would have failed and returned if it wasn't)
  // So we can skip the typeof check wrapper
  const needsTypeCheck = schema.type !== 'string';

  const generateChecks = () => {
    // Use ucs2length for proper Unicode code point counting (handles surrogate pairs)
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const lenVar = code.genVar('len');
      code.line(_`const ${lenVar} = ucs2length(${dataVar});`);

      if (schema.minLength !== undefined) {
        code.if(_`${lenVar} < ${schema.minLength}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minLength',
            'minLength',
            `must NOT have fewer than ${schema.minLength} characters`,
            { limit: schema.minLength },
            ctx
          );
        });
      }

      if (schema.maxLength !== undefined) {
        code.if(_`${lenVar} > ${schema.maxLength}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maxLength',
            'maxLength',
            `must NOT have more than ${schema.maxLength} characters`,
            { limit: schema.maxLength },
            ctx
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
      const flags = determineRegexFlags(schema.pattern);

      const regexName = new Name(ctx.genRuntimeName('pattern'));
      ctx.addRuntimeFunction(regexName.str, new RegExp(schema.pattern, flags));

      code.if(_`!${regexName}.test(${dataVar})`, () => {
        genError(
          code,
          pathExprCode,
          '#/pattern',
          'pattern',
          `must match pattern "${schema.pattern}"`,
          { pattern: schema.pattern },
          ctx
        );
      });
    }
  };

  // Only wrap in typeof check if we don't already have a string type constraint
  if (needsTypeCheck) {
    code.if(_`typeof ${dataVar} === 'string'`, generateChecks);
  } else {
    generateChecks();
  }
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
          genError(
            code,
            pathExprCode,
            '#/contentEncoding',
            'contentEncoding',
            'must be base64 encoded',
            {},
            ctx
          );
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
              genError(
                code,
                pathExprCode,
                '#/contentMediaType',
                'contentMediaType',
                'must be application/json',
                {},
                ctx
              );
            }
          );
        } else {
          // Validate directly as JSON
          code.try(
            () => {
              code.line(_`JSON.parse(${dataVar});`);
            },
            () => {
              genError(
                code,
                pathExprCode,
                '#/contentMediaType',
                'contentMediaType',
                'must be application/json',
                {},
                ctx
              );
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
          genError(
            code,
            pathExprCode,
            '#/minimum',
            'minimum',
            `must be > ${schema.minimum}`,
            {
              comparison: '>',
              limit: schema.minimum,
            },
            ctx
          );
        });
      } else {
        code.if(_`${dataVar} < ${schema.minimum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minimum',
            'minimum',
            `must be >= ${schema.minimum}`,
            {
              comparison: '>=',
              limit: schema.minimum,
            },
            ctx
          );
        });
      }
    }

    // Handle maximum with optional exclusiveMaximum (draft4 boolean form)
    if (schema.maximum !== undefined) {
      // In draft4, exclusiveMaximum is a boolean that modifies maximum
      if (schema.exclusiveMaximum === true) {
        code.if(_`${dataVar} >= ${schema.maximum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maximum',
            'maximum',
            `must be < ${schema.maximum}`,
            {
              comparison: '<',
              limit: schema.maximum,
            },
            ctx
          );
        });
      } else {
        code.if(_`${dataVar} > ${schema.maximum}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maximum',
            'maximum',
            `must be <= ${schema.maximum}`,
            {
              comparison: '<=',
              limit: schema.maximum,
            },
            ctx
          );
        });
      }
    }

    // Handle exclusiveMinimum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMinimum === 'number') {
      code.if(_`${dataVar} <= ${schema.exclusiveMinimum}`, () => {
        genError(
          code,
          pathExprCode,
          '#/exclusiveMinimum',
          'exclusiveMinimum',
          `must be > ${schema.exclusiveMinimum}`,
          { comparison: '>', limit: schema.exclusiveMinimum },
          ctx
        );
      });
    }

    // Handle exclusiveMaximum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMaximum === 'number') {
      code.if(_`${dataVar} >= ${schema.exclusiveMaximum}`, () => {
        genError(
          code,
          pathExprCode,
          '#/exclusiveMaximum',
          'exclusiveMaximum',
          `must be < ${schema.exclusiveMaximum}`,
          { comparison: '<', limit: schema.exclusiveMaximum },
          ctx
        );
      });
    }

    if (schema.multipleOf !== undefined) {
      const multipleOf = schema.multipleOf;
      // For integer multipleOf values >= 1, use simpler modulo check
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        code.if(_`${dataVar} % ${multipleOf} !== 0`, () => {
          genError(
            code,
            pathExprCode,
            '#/multipleOf',
            'multipleOf',
            `must be multiple of ${schema.multipleOf}`,
            { multipleOf: schema.multipleOf },
            ctx
          );
        });
      } else if (Number.isInteger(1 / multipleOf)) {
        // "Clean" fractions where 1/multipleOf is integer (0.5→2, 0.25→4, 0.0001→10000)
        // Any integer is a multiple of these, but we need different checks:
        // - Small values: use division (0.0075/0.0001=75, modulo has fp error)
        // - Large values that overflow: use modulo (1e308%0.5=0, division=Infinity)
        const divVar = code.genVar('div');
        code.line(_`const ${divVar} = ${dataVar} / ${multipleOf};`);
        code.if(_`!Number.isFinite(${divVar})`, () => {
          // Overflow: modulo is correct for clean fractions
          code.if(_`${dataVar} % ${multipleOf} !== 0`, () => {
            genError(
              code,
              pathExprCode,
              '#/multipleOf',
              'multipleOf',
              `must be multiple of ${schema.multipleOf}`,
              { multipleOf: schema.multipleOf },
              ctx
            );
          });
        });
        code.else(() => {
          // Normal: division is more accurate
          code.if(_`!Number.isInteger(${divVar})`, () => {
            genError(
              code,
              pathExprCode,
              '#/multipleOf',
              'multipleOf',
              `must be multiple of ${schema.multipleOf}`,
              { multipleOf: schema.multipleOf },
              ctx
            );
          });
        });
      } else {
        // Non-clean fractions (e.g., 0.123456789): division + isInteger
        // Overflow to Infinity → isInteger(Infinity) = false → correctly rejects
        // (these can't evenly divide large integers anyway)
        code.if(_`!Number.isInteger(${dataVar} / ${multipleOf})`, () => {
          genError(
            code,
            pathExprCode,
            '#/multipleOf',
            'multipleOf',
            `must be multiple of ${schema.multipleOf}`,
            { multipleOf: schema.multipleOf },
            ctx
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
  ctx: CompileContext
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
          '#/minItems',
          'minItems',
          `must NOT have fewer than ${schema.minItems} items`,
          { limit: schema.minItems },
          ctx
        );
      });
    }

    if (schema.maxItems !== undefined) {
      code.if(_`${dataVar}.length > ${schema.maxItems}`, () => {
        genError(
          code,
          pathExprCode,
          '#/maxItems',
          'maxItems',
          `must NOT have more than ${schema.maxItems} items`,
          { limit: schema.maxItems },
          ctx
        );
      });
    }

    if (schema.uniqueItems === true) {
      // Check if items are known to be primitives at compile time
      const itemTypes = getItemTypes(schema);
      const canOptimize =
        itemTypes.length > 0 && !itemTypes.some((t) => t === 'object' || t === 'array');

      const iVar = code.genVar('i');

      if (canOptimize) {
        // Fast path: items are primitives, use Set for O(n) uniqueness check
        const seenVar = code.genVar('seen');
        const lenVar = code.genVar('len');
        const itemVar = code.genVar('item');
        code.line(_`const ${seenVar} = new Set();`);
        code.block(
          _`for (let ${iVar} = 0, ${lenVar} = ${dataVar}.length; ${iVar} < ${lenVar}; ${iVar}++)`,
          () => {
            code.line(_`const ${itemVar} = ${dataVar}[${iVar}];`);
            code.if(_`${seenVar}.has(${itemVar})`, () => {
              genError(
                code,
                pathExprCode,
                '#/uniqueItems',
                'uniqueItems',
                'must NOT have duplicate items',
                {},
                ctx
              );
            });
            code.line(_`${seenVar}.add(${itemVar});`);
          }
        );
      } else {
        // Slow path: O(n²) comparison using deepEqual
        const jVar = code.genVar('j');
        code.block(_`outer: for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.block(_`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
            code.if(_`deepEqual(${dataVar}[${iVar}], ${dataVar}[${jVar}])`, () => {
              genError(
                code,
                pathExprCode,
                '#/uniqueItems',
                'uniqueItems',
                'must NOT have duplicate items',
                {},
                ctx
              );
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
  ctx: CompileContext
): void {
  const hasObjectChecks =
    (schema.required && schema.required.length > 0) ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined;

  if (!hasObjectChecks) return;

  const genChecks = () => {
    if (schema.required && schema.required.length > 0) {
      genBatchedRequiredChecks(code, dataVar, schema.required, pathExprCode, ctx);
    }

    if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
      code.line(_`const propCount = Object.keys(${dataVar}).length;`);

      if (schema.minProperties !== undefined) {
        code.if(_`propCount < ${schema.minProperties}`, () => {
          genError(
            code,
            pathExprCode,
            '#/minProperties',
            'minProperties',
            `must NOT have fewer than ${schema.minProperties} properties`,
            { limit: schema.minProperties },
            ctx
          );
        });
      }

      if (schema.maxProperties !== undefined) {
        code.if(_`propCount > ${schema.maxProperties}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maxProperties',
            'maxProperties',
            `must NOT have more than ${schema.maxProperties} properties`,
            { limit: schema.maxProperties },
            ctx
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
  dynamicScopeVar?: Name
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

  // Track evaluated properties for unevaluatedProperties support
  const propsTracker = ctx.getPropsTracker();

  // Track ALL defined properties (even trivial ones) - they're still "evaluated"
  if (schema.properties) {
    propsTracker.addProperties(Object.keys(schema.properties));
  }

  // Track pattern properties patterns
  if (schema.patternProperties) {
    propsTracker.addPatterns(Object.keys(schema.patternProperties));
  }

  // additionalProperties (when present and not false) evaluates ALL remaining properties
  if (schema.additionalProperties !== undefined && schema.additionalProperties !== false) {
    propsTracker.markAllEvaluated();
  }

  // Early return optimization: skip entirely if nothing to validate
  if (!hasProps && !hasPatternProps && !hasAdditionalProps) return;

  const genChecks = () => {
    // Validate defined properties (only non-trivial ones)
    for (const [propName, propSchema] of nonTrivialProps) {
      const propPathExpr = pathExpr(pathExprCode, propName);
      genPropertyCheck(code, dataVar, propName, (valueVar) => {
        const valueVarName = valueVar instanceof Name ? valueVar : code.genVar('pv');
        if (!(valueVar instanceof Name)) {
          code.line(_`const ${valueVarName} = ${valueVar};`);
        }
        // Use isolated scope for property value validation
        // Property value is a different instance location - its annotations shouldn't
        // pollute the parent's unevaluatedProperties tracking
        propsTracker.withScope(() => {
          generateSchemaValidator(
            code,
            propSchema,
            valueVarName as Name,
            propPathExpr,
            ctx,
            dynamicScopeVar
          );
        }, false); // Don't merge - different instance location
      });
    }

    // Handle patternProperties and additionalProperties validation in a single loop
    if (hasPatternProps || hasAdditionalProps) {
      const definedProps = schema.properties ? Object.keys(schema.properties) : [];
      // For additionalProperties, we need ALL patternProperties patterns (even no-ops)
      // because they affect which properties are considered "additional"
      const allPatterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

      // Pre-compile pattern regexes for ALL patterns (needed for additionalProperties check)
      // Only use 'u' flag when necessary for better performance
      const patternRegexNames: Name[] = [];
      for (const pattern of allPatterns) {
        const flags = determineRegexFlags(pattern);
        const regexName = new Name(ctx.genRuntimeName('patternRe'));
        ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
        patternRegexNames.push(regexName);
      }

      // Only generate the for-in loop if there's something to do inside
      // (non-trivial pattern props or additional props check)
      if (nonTrivialPatternProps.length > 0 || hasAdditionalProps) {
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
              // Use isolated scope - property value is different instance location
              propsTracker.withScope(() => {
                generateSchemaValidator(
                  code,
                  patternSchema,
                  propVar,
                  keyPathExpr,
                  ctx,
                  dynamicScopeVar
                );
              }, false);
            });
          }

          // Generate additionalProperties check
          if (hasAdditionalProps) {
            const addPropsSchema = schema.additionalProperties!;

            // Build condition: not a defined prop and not matching any pattern
            // Use inline comparisons for small numbers of properties, Set for larger
            const conditions: Code[] = [];

            // For defined properties, use inline comparison for up to 3 props, Set for more
            // Modern JS engines optimize Set.has() very well, and it reduces code size
            if (definedProps.length > 0 && definedProps.length <= 3) {
              const propChecks = definedProps.map((p) => _`${keyVar} !== ${p}`);
              conditions.push(_`(${and(...propChecks)})`);
            } else if (definedProps.length > 3) {
              // Use Set for 4+ properties - faster and smaller code
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
    genError(
      code,
      pathExprCode,
      '#/additionalProperties',
      'additionalProperties',
      'must NOT have additional properties',
      {},
      ctx
    );
  } else if (schema === true) {
    // No check needed
  } else {
    const propVar = code.genVar('ap');
    code.line(_`const ${propVar} = ${dataExpr};`);
    // Use isolated scope - property value is different instance location
    const propsTracker = ctx.getPropsTracker();
    propsTracker.withScope(() => {
      generateSchemaValidator(code, schema, propVar, pathExprCode, ctx, dynamicScopeVar);
    }, false);
  }
}

/**
 * Generate unevaluatedProperties check
 * This must be called LAST after all other keywords have evaluated properties.
 */
export function generateUnevaluatedPropertiesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  if (schema.unevaluatedProperties === undefined) return;

  const propsTracker = ctx.getPropsTracker();

  // If all properties are already evaluated, nothing to check
  if (propsTracker.allEvaluated) return;

  const unevalSchema = schema.unevaluatedProperties;

  // If unevaluatedProperties: true, we need to ensure dynamic var exists before the loop
  // so that property markings are visible to parent schemas
  if (unevalSchema === true && propsTracker.active) {
    propsTracker.getDynamicVar();
  }

  const genCheck = () => {
    const keyVar = new Name('key');
    code.forIn(keyVar, dataVar, () => {
      const keyPathExpr = pathExprDynamic(pathExprCode, keyVar);

      // Build the unevaluated check condition
      // We need to pass pattern regex names if patternProperties were used
      const patterns = propsTracker.getPatterns();
      const patternRegexVars: Name[] = [];

      // Create regex variables for patterns
      for (const pattern of patterns) {
        const flags = determineRegexFlags(pattern);
        const regexName = new Name(ctx.genRuntimeName('unevalPatternRe'));
        ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
        patternRegexVars.push(regexName);
      }

      // Generate the condition: is this property unevaluated?
      const isUnevaluatedExpr = propsTracker.isUnevaluated(keyVar, patternRegexVars, ctx);

      code.if(isUnevaluatedExpr, () => {
        if (unevalSchema === false) {
          // unevaluatedProperties: false - no unevaluated properties allowed
          genError(
            code,
            keyPathExpr,
            '#/unevaluatedProperties',
            'unevaluatedProperties',
            'must NOT have unevaluated properties',
            {},
            ctx
          );
        } else if (unevalSchema === true) {
          // unevaluatedProperties: true - all unevaluated properties are valid
          // Mark property as evaluated so parent schemas see it
          propsTracker.markPropertyEvaluated(keyVar);
        } else {
          // unevaluatedProperties: schema - validate against the schema
          const propValue = indexAccess(dataVar, keyVar);
          const propVar = code.genVar('unevalProp');
          code.line(_`const ${propVar} = ${propValue};`);
          generateSchemaValidator(code, unevalSchema, propVar, keyPathExpr, ctx, dynamicScopeVar);
        }
      });
    });
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genCheck();
  } else {
    code.if(
      _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`,
      genCheck
    );
  }
}

/**
 * Generate unevaluatedItems check for arrays
 */
export function generateUnevaluatedItemsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  if (schema.unevaluatedItems === undefined) return;

  const itemsTracker = ctx.getItemsTracker();

  // If all items are already evaluated, nothing to check
  if (itemsTracker.allItemsEvaluated) return;

  const unevalSchema = schema.unevaluatedItems;

  // If unevaluatedItems: true, we need to ensure dynamic var exists before the loop
  // so that item markings are visible to parent schemas
  if (unevalSchema === true && itemsTracker.active) {
    itemsTracker.getDynamicVar();
  }

  const genCheck = () => {
    const iVar = code.genVar('i');
    const lenVar = code.genVar('len');

    // Get static item count to optimize loop bounds
    const staticItemCount = itemsTracker.getStaticItemCount();
    const needsDynamic = itemsTracker.needsDynamic;
    const dynamicVar = needsDynamic ? itemsTracker.getDynamicVar() : undefined;

    // Optimization: If we have dynamic tracking, cache the allItemsEvaluated check
    // to avoid repeated property lookups in the loop
    const allEvalVar = needsDynamic ? code.genVar('allEval') : undefined;
    if (allEvalVar && dynamicVar) {
      code.line(_`const ${allEvalVar} = ${dynamicVar}.allItemsEvaluated;`);
    }

    code.line(_`const ${lenVar} = ${dataVar}.length;`);

    // Optimization: Start loop from static item count instead of 0
    // This avoids checking condition inside loop for static items
    const startIdx = staticItemCount > 0 ? staticItemCount : 0;
    const loopInit = startIdx > 0 ? _`let ${iVar} = ${startIdx}` : _`let ${iVar} = 0`;

    code.for(loopInit, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
      const itemPathExpr = pathExprIndex(pathExprCode, iVar);

      // Generate optimized unevaluated check
      let isUnevaluatedExpr: Code | null = null;

      if (needsDynamic && allEvalVar && dynamicVar) {
        // Use cached allItemsEvaluated variable and simplify condition
        isUnevaluatedExpr = _`!${allEvalVar} && !${dynamicVar}.has(${iVar})`;
      } else if (needsDynamic && dynamicVar) {
        // Fallback without cache (shouldn't happen but keep for safety)
        isUnevaluatedExpr = _`!${dynamicVar}.allItemsEvaluated && !${dynamicVar}.has(${iVar})`;
      }
      // For pure static tracking: we already started from staticItemCount,
      // so all items in the loop are unevaluated - skip the if check entirely

      const genBody = () => {
        if (unevalSchema === false) {
          // unevaluatedItems: false - no unevaluated items allowed
          genError(
            code,
            itemPathExpr,
            '#/unevaluatedItems',
            'unevaluatedItems',
            'must NOT have unevaluated items',
            {},
            ctx
          );
        } else if (unevalSchema === true) {
          // unevaluatedItems: true - all unevaluated items are valid
          // Mark item as evaluated so parent schemas see it
          itemsTracker.markItemEvaluated(iVar);
        } else {
          // unevaluatedItems: schema - validate against the schema
          const itemAccess = indexAccess(dataVar, iVar);
          const itemVar = code.genVar('unevalItem');
          code.line(_`const ${itemVar} = ${itemAccess};`);
          generateSchemaValidator(code, unevalSchema, itemVar, itemPathExpr, ctx, dynamicScopeVar);
        }
      };

      // Only add condition if we have dynamic tracking, otherwise all items in loop are unevaluated
      if (isUnevaluatedExpr) {
        code.if(isUnevaluatedExpr, genBody);
      } else {
        genBody();
      }
    });
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${dataVar})`, genCheck);
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
  _dynamicScopeVar?: Name
): void {
  if (schema.contains === undefined) return;

  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  // Get tracker for unevaluatedItems support
  const itemsTracker = ctx.getItemsTracker();
  const needsItemsTracking = itemsTracker.active;

  // Handle boolean schemas directly
  if (containsSchema === true) {
    // Every item matches - mark all items as evaluated
    if (needsItemsTracking) {
      itemsTracker.markAllItemsEvaluated();
    }
    // Check array length
    code.if(_`Array.isArray(${dataVar})`, () => {
      code.if(_`${dataVar}.length < ${minContains}`, () => {
        genError(
          code,
          pathExprCode,
          '#/contains',
          'contains',
          `must contain at least ${minContains} valid item(s)`,
          { minContains },
          ctx
        );
      });
      if (maxContains !== undefined) {
        code.if(_`${dataVar}.length > ${maxContains}`, () => {
          genError(
            code,
            pathExprCode,
            '#/maxContains',
            'contains',
            `must contain at most ${maxContains} valid item(s)`,
            { maxContains },
            ctx
          );
        });
      }
    });
    return;
  }

  if (containsSchema === false) {
    // Nothing matches - only valid if minContains is 0
    // No items are evaluated by contains: false
    code.if(_`Array.isArray(${dataVar})`, () => {
      if (minContains > 0) {
        genError(
          code,
          pathExprCode,
          '#/contains',
          'contains',
          `must contain at least ${minContains} valid item(s)`,
          { minContains },
          ctx
        );
      }
    });
    return;
  }

  // If minContains is 0 and no maxContains, and no items tracking needed,
  // contains is always satisfied and we can skip
  if (minContains === 0 && maxContains === undefined && !needsItemsTracking) {
    return;
  }

  // Ensure the items dynamic var is created BEFORE the array check block
  // so it's in scope for both contains and unevaluatedItems
  if (needsItemsTracking) {
    itemsTracker.getDynamicVar();
  }

  code.if(_`Array.isArray(${dataVar})`, () => {
    const countVar = code.genVar('containsCount');
    code.line(_`let ${countVar} = 0;`);

    const iVar = code.genVar('i');

    // When tracking items for unevaluatedItems, we can't use early exit
    // because we need to find ALL matching indices
    const canEarlyExit = !needsItemsTracking;

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
            inlineCheck = _`Number.isInteger(${itemAccess})`;
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
          // Track matched index for unevaluatedItems
          if (needsItemsTracking) {
            itemsTracker.markItemEvaluated(iVar);
          }
        });

        // Early exit optimizations
        if (canEarlyExit) {
          if (maxContains === undefined) {
            // If only minContains matters, exit when satisfied
            code.if(_`${countVar} >= ${minContains}`, () => {
              code.line(_`break;`);
            });
          } else {
            // If maxContains is defined, exit when we exceed it (no point continuing)
            code.if(_`${countVar} > ${maxContains}`, () => {
              code.line(_`break;`);
            });
          }
        }
      });
    } else {
      // Queue the contains schema for compilation (reuses all existing generators)
      const containsFuncName = ctx.queueCompile(containsSchema);

      code.forArray(iVar, dataVar, () => {
        const itemAccess = indexAccess(dataVar, iVar);

        // Call the compiled contains validator (pass null for errors to skip collection)
        code.if(_`${containsFuncName}(${itemAccess}, null, '')`, () => {
          code.line(_`${countVar}++;`);
          // Track matched index for unevaluatedItems
          if (needsItemsTracking) {
            itemsTracker.markItemEvaluated(iVar);
          }
        });

        // Early exit optimizations
        if (canEarlyExit) {
          if (maxContains === undefined) {
            // If only minContains matters, exit when satisfied
            code.if(_`${countVar} >= ${minContains}`, () => {
              code.line(_`break;`);
            });
          } else {
            // If maxContains is defined, exit when we exceed it (no point continuing)
            code.if(_`${countVar} > ${maxContains}`, () => {
              code.line(_`break;`);
            });
          }
        }
      });
    }

    code.if(_`${countVar} < ${minContains}`, () => {
      genError(
        code,
        pathExprCode,
        '#/contains',
        'contains',
        `must contain at least ${minContains} valid item(s)`,
        { minContains },
        ctx
      );
    });

    if (maxContains !== undefined) {
      code.if(_`${countVar} > ${maxContains}`, () => {
        genError(
          code,
          pathExprCode,
          '#/maxContains',
          'contains',
          `must contain at most ${maxContains} valid item(s)`,
          { maxContains },
          ctx
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
  ctx: CompileContext
): void {
  if (!schema.dependentRequired) return;

  // dependentRequired was introduced in draft 2019-09
  // Check if this keyword is supported in the compilation context's draft
  if (!supportsFeature(ctx.options.defaultMeta, 'unevaluated')) {
    // In draft-07 and earlier, dependentRequired doesn't exist - ignore it
    // (unevaluated feature check is a proxy for 2019-09+ which includes dependentRequired)
    return;
  }

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
              '#/dependentRequired',
              'dependentRequired',
              `must have property '${reqProp}' when property '${prop}' is present`,
              { missingProperty: reqProp },
              ctx
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
  dynamicScopeVar?: Name
): void {
  if (!schema.dependentSchemas) return;

  // dependentSchemas was introduced in draft 2019-09
  if (!supportsFeature(ctx.options.defaultMeta, 'unevaluated')) {
    return; // Skip in draft-07 and earlier
  }

  const tracker = new AnnotationTracker(ctx.getPropsTracker(), ctx.getItemsTracker());
  tracker.ensureDynamicVars();

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
      // Use branch tracking: properties from dependent schemas only count as evaluated
      // when the trigger property is present at runtime
      const branch = tracker.enterBranch();

      // Create a variable to track if the trigger property exists
      const triggerExists = code.genVar('depTrigger');
      code.line(_`const ${triggerExists} = ${stringify(prop)} in ${dataVar};`);

      code.if(triggerExists, () => {
        generateSchemaValidator(code, depSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
      });

      tracker.exitBranch(branch);
      tracker.mergeBranch(branch, triggerExists);
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
  dynamicScopeVar?: Name
): void {
  if (!schema.dependencies) return;

  // Check if we have any non-trivial dependencies to avoid unnecessary code generation
  let hasNonTrivial = false;
  for (const prop in schema.dependencies) {
    const dep = schema.dependencies[prop];
    if (
      Array.isArray(dep)
        ? dep.length > 0
        : dep !== true &&
          !(typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0)
    ) {
      hasNonTrivial = true;
      break;
    }
  }

  if (!hasNonTrivial) return;

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const prop in schema.dependencies) {
      const dep = schema.dependencies[prop];

      // Skip trivial dependencies
      if (Array.isArray(dep)) {
        if (dep.length === 0) continue;
      } else if (
        dep === true ||
        (typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0)
      ) {
        continue;
      }
      code.if(_`${prop} in ${dataVar}`, () => {
        if (Array.isArray(dep)) {
          // Array of required property names
          for (const reqProp of dep) {
            const reqPathExpr = pathExpr(pathExprCode, reqProp);
            code.if(_`!(${reqProp} in ${dataVar})`, () => {
              genError(
                code,
                reqPathExpr,
                '#/dependencies',
                'dependencies',
                `must have property '${reqProp}' when property '${prop}' is present`,
                { missingProperty: reqProp },
                ctx
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
            dynamicScopeVar
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
        genError(
          code,
          pathExprCode,
          '#/propertyNames',
          'propertyNames',
          'property name must be valid',
          {},
          ctx
        );
      });
    });
    return;
  }

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    const keyVar = new Name('key');
    code.forIn(keyVar, dataVar, () => {
      // For propertyNames, the path is the key itself (with JSON pointer prefix)
      const keyPathExpr = pathExprDynamic(pathExprCode, keyVar);
      generateSchemaValidator(code, propNamesSchema, keyVar, keyPathExpr, ctx, dynamicScopeVar);
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
  _dynamicScopeVar?: Name
): boolean {
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

  // Don't inline if already compiled (cyclic reference)
  if (ctx.isCompiled(refSchema)) return false;

  // Don't inline schemas with $defs or definitions (they may have nested refs)
  // These should be compiled as separate functions to allow proper ref resolution
  if (refSchema.$defs || refSchema.definitions) return false;

  // Don't inline schemas with patternProperties or dependentSchemas (complex)
  if (refSchema.patternProperties || refSchema.dependentSchemas || refSchema.dependencies)
    return false;

  // Helper to check if a schema is complex
  const isComplexSchema = (s: JsonSchema): boolean => {
    if (typeof s !== 'object' || s === null || Array.isArray(s)) return false;
    return !!(
      s.properties ||
      s.patternProperties ||
      s.prefixItems ||
      s.items ||
      s.contains ||
      s.allOf ||
      s.anyOf ||
      s.oneOf ||
      s.not ||
      s.if
    );
  };

  // Allow inlining simple object schemas with a small number of properties
  if (
    refSchema.properties &&
    typeof refSchema.properties === 'object' &&
    !Array.isArray(refSchema.properties)
  ) {
    const propCount = Object.keys(refSchema.properties).length;
    // Only inline if we have 5 or fewer properties
    if (propCount > 5) return false;

    // Check that property schemas are simple (no nested complexity)
    for (const propSchema of Object.values(refSchema.properties)) {
      if (isComplexSchema(propSchema)) {
        return false;
      }
    }
  }

  // Allow inlining simple array schemas with simple items
  // But not if items is an array (tuple schema) or if the items schema is complex
  if (refSchema.items) {
    // Don't inline tuple schemas (items is an array)
    if (Array.isArray(refSchema.items)) return false;
    // Don't inline if items is complex (after ruling out array, items is JsonSchema)
    const itemsSchema = refSchema.items as JsonSchema;
    if (isComplexSchema(itemsSchema)) {
      return false;
    }
  }

  // Don't inline prefixItems or contains (more complex)
  if (refSchema.prefixItems || refSchema.contains) return false;

  // Count the number of validation keywords
  const keywords = Object.keys(refSchema).filter(
    (k) =>
      k !== '$schema' && k !== '$comment' && k !== 'title' && k !== 'description' && k !== '$anchor'
  );

  // Inline if it has a reasonable number of keywords
  // Allow more keywords now that we can inline properties/items
  return keywords.length <= 8;
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
  dynamicScopeVar?: Name
): void {
  if (!schema.$ref) return;

  // Don't inline remote refs (http:// or https://) - they may have complex internal structure
  const isRemoteRef = /^https?:\/\//.test(schema.$ref);

  // Resolve the reference
  let refSchema = ctx.resolveRef(schema.$ref, schema);

  // Optimization: follow chains of $ref-only schemas to avoid function call overhead
  // Only safe when there are no $dynamicAnchor or $recursiveAnchor definitions
  if (!ctx.hasAnyDynamicAnchors() && !ctx.hasAnyRecursiveAnchors() && refSchema) {
    let depth = 0;
    const maxDepth = 100; // Prevent infinite loops
    const visited = new Set<JsonSchema>(); // Track visited schemas to detect cycles

    while (
      typeof refSchema === 'object' &&
      refSchema !== null &&
      refSchema.$ref &&
      Object.keys(refSchema).length === 1 && // Only $ref, nothing else
      depth < maxDepth &&
      !visited.has(refSchema)
    ) {
      visited.add(refSchema);
      const nextSchema = ctx.resolveRef(refSchema.$ref, refSchema);
      if (!nextSchema) break;
      refSchema = nextSchema;
      depth++;
    }
  }

  if (!refSchema) {
    // Can't resolve - schema is invalid, always fail
    genError(
      code,
      pathExprCode,
      '#/$ref',
      '$ref',
      `can't resolve reference ${schema.$ref}`,
      {
        $ref: schema.$ref,
      },
      ctx
    );
    return;
  }

  // Optimize: if ref points to a no-op schema (true or {}), skip entirely
  if (
    refSchema === true ||
    (typeof refSchema === 'object' && Object.keys(refSchema).length === 0)
  ) {
    return;
  }

  // Check for cross-draft reference: if the referenced schema has a different $schema,
  // compile it separately with its own draft-specific options
  const crossDraftSchema = ctx.getCrossDraftSchema(refSchema);
  if (crossDraftSchema) {
    // This is a cross-draft reference - compile it separately with its own options
    const crossDraftName = new Name(ctx.genRuntimeName('crossDraftValidator'));

    // Create a wrapper that adapts the top-level validator to the internal validator signature
    // Internal validators take (data, errors, path, [dynamicScope])
    // Top-level validators take (data, errors)
    const crossDraftOptions: CompileOptions = {
      ...ctx.options,
      defaultMeta: crossDraftSchema,
      legacyRef: supportsFeature(crossDraftSchema, 'legacyRef'),
      formatAssertion:
        ctx.options.formatAssertion ?? supportsFeature(crossDraftSchema, 'formatAssertion'),
    };

    // Compile the cross-draft schema
    const crossDraftValidator = compile(refSchema, crossDraftOptions);

    // Create a wrapper function that adjusts error paths
    const wrapperFn = (data: unknown, path: string) => {
      const result = crossDraftValidator(data);

      // Adjust paths in errors from cross-draft validator
      if (!result && crossDraftValidator.errors) {
        crossDraftValidator.errors = crossDraftValidator.errors.map((err) => ({
          ...err,
          instancePath: path + err.instancePath,
        }));
      }

      return result;
    };

    ctx.addRuntimeFunction(crossDraftName.str, wrapperFn);

    // Generate code to call the cross-draft validator wrapper
    code.if(_`!${crossDraftName}(${dataVar}, ${pathExprCode})`, () => {
      genSubschemaExit(code, ctx);
    });
    return;
  }

  // NEW OPTIMIZATION: Inline simple schemas to avoid function call overhead
  // But don't inline remote refs - they need their own compilation context
  // Also force inlining when property/item tracking is active (for unevaluatedProperties/Items support)
  // But never inline cyclic refs (they would cause infinite recursion)
  const propsTracker = ctx.getPropsTracker();
  const itemsTracker = ctx.getItemsTracker();
  const refHasId = typeof refSchema === 'object' && refSchema !== null && refSchema.$id;
  const isCyclicRef = ctx.isCompiled(refSchema);
  const forceInlineForTracking =
    (propsTracker.active || itemsTracker.active) && !refHasId && !isCyclicRef;
  if (
    !isRemoteRef &&
    (shouldInlineRef(refSchema, ctx, dynamicScopeVar) || forceInlineForTracking)
  ) {
    // Inline the schema validation directly
    // Per JSON Schema spec, $ref creates a new scope for annotations.
    // If the referenced schema has unevaluatedProperties/Items, it should NOT see
    // annotations from sibling keywords in the referrer schema.
    const tracker = new AnnotationTracker(propsTracker, itemsTracker);
    tracker.withConditionalScope(refSchema, () => {
      generateSchemaValidator(code, refSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
    });
    return;
  }

  // Get the function name (queue for compilation if needed)
  const funcName = ctx.getCompiledName(refSchema) ?? ctx.queueCompile(refSchema);

  // When property tracking is active and we're calling into a ref function,
  // we need to track the properties that the ref schema statically defines.
  // This allows unevaluatedProperties in the parent to see what the ref evaluates.
  const refStaticProps =
    propsTracker.active && !hasRestrictiveUnevaluatedProperties(refSchema)
      ? extractStaticProperties(refSchema)
      : new Set<string>();

  // Check if the ref target has $recursiveAnchor: true
  const hasRecursiveAnchor =
    typeof refSchema === 'object' && refSchema !== null && refSchema.$recursiveAnchor === true;

  // If the ref target has $recursiveAnchor, track properties/items from ALL schemas
  // with $recursiveAnchor: true, because any of them could be the runtime resolution target
  // (This is needed when the ref can't be inlined due to $id or recursion)
  if (hasRecursiveAnchor && (propsTracker.active || itemsTracker.active)) {
    for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
      if (typeof dynSchema === 'object' && dynSchema !== null) {
        // Track properties
        if (propsTracker.active && dynSchema.properties) {
          propsTracker.addProperties(Object.keys(dynSchema.properties));
        }
        // Track items - only track tuple items, not schema items
        if (itemsTracker.active && Array.isArray(dynSchema.items)) {
          itemsTracker.addPrefixItems(dynSchema.items.length);
        }
      }
    }
  }

  // DRAFT 2019-09: If $ref: "#" resolves to a schema with $recursiveAnchor: true,
  // search the dynamic scope for a schema with $recursiveAnchor: true
  const isRecursiveRef = schema.$ref === '#' && hasRecursiveAnchor;

  if (isRecursiveRef && dynamicScopeVar) {
    // DRAFT 2019-09: $ref: "#" with $recursiveAnchor: true
    const pathArg = pathExprCode.toString() === "''" ? _`''` : _`errors ? ${pathExprCode} : ''`;

    // Optimization: if there's only one $recursiveAnchor in the entire schema tree,
    // we can statically resolve it and avoid the Map.get() lookup overhead
    const allRecursiveAnchors = ctx.getAllRecursiveAnchorSchemas();
    if (allRecursiveAnchors.length === 1) {
      // Static resolution: only one possible target, call it directly
      code.if(_`!${funcName}(${dataVar}, errors, ${pathArg}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    } else {
      // Multiple $recursiveAnchors - need runtime lookup for INNERMOST validator
      const validatorVar = new Name('validator');
      code.line(
        _`const ${validatorVar} = ${dynamicScopeVar}.get('__recursive_current__') || ${funcName};`
      );
      code.if(_`!${validatorVar}(${dataVar}, errors, ${pathArg}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    }
    return;
  }

  // In legacy mode, dynamicScopeVar is undefined - simpler function call
  if (!dynamicScopeVar) {
    // Optimization: only compute path when errors array is present (deferred path construction)
    // Most validators run without error tracking, so this avoids string concatenation overhead
    const pathArg = pathExprCode.toString() === "''" ? _`''` : _`errors ? ${pathExprCode} : ''`;
    code.if(_`!${funcName}(${dataVar}, errors, ${pathArg})`, () => {
      genSubschemaExit(code, ctx);
    });
    // Track ref's static properties after successful validation
    if (refStaticProps.size > 0) {
      propsTracker.addProperties([...refStaticProps]);
    }
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
      // Set dynamic anchors for this resource if not already set (outermost-wins), call validator, then restore
      // Optimization: defer path construction when errors is not present
      const pathArg = pathExprCode.toString() === "''" ? _`''` : _`errors ? ${pathExprCode} : ''`;
      code.block(_``, () => {
        // Save current values and generate unique variable names
        const savedVars = new Map<string, Name>();
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName =
            ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
          const savedVar = new Name('saved');
          savedVars.set(anchor, savedVar);
          code.line(_`const ${savedVar} = ${dynamicScopeVar}.get(${stringify(anchor)});`);
          // Only set if not already defined (outermost-wins for $dynamicRef)
          code.line(
            _`if (${savedVar} === undefined) ${dynamicScopeVar}.set(${stringify(anchor)}, ${anchorFuncName});`
          );
        }
        code.if(_`!${funcName}(${dataVar}, errors, ${pathArg}, ${dynamicScopeVar})`, () => {
          // Restore before exiting - only delete if we set it
          for (const { anchor } of resourceAnchors) {
            const savedVar = savedVars.get(anchor);
            if (savedVar) {
              code.line(
                _`if (${savedVar} === undefined) ${dynamicScopeVar}.delete(${stringify(anchor)});`
              );
            }
          }
          genSubschemaExit(code, ctx);
        });
        // Restore after successful validation - only delete if we set it
        for (const { anchor } of resourceAnchors) {
          const savedVar = savedVars.get(anchor);
          if (savedVar) {
            code.line(
              _`if (${savedVar} === undefined) ${dynamicScopeVar}.delete(${stringify(anchor)});`
            );
          }
        }
      });
      // Track ref's static properties after successful validation
      if (refStaticProps.size > 0) {
        propsTracker.addProperties([...refStaticProps]);
      }
      return;
    }
  }

  // No dynamic anchors to push - simple call
  // Optimization: defer path construction when errors is not present
  const pathArg = pathExprCode.toString() === "''" ? _`''` : _`errors ? ${pathExprCode} : ''`;
  code.if(_`!${funcName}(${dataVar}, errors, ${pathArg}, ${dynamicScopeVar})`, () => {
    genSubschemaExit(code, ctx);
  });
  // Track ref's static properties after successful validation
  if (refStaticProps.size > 0) {
    propsTracker.addProperties([...refStaticProps]);
  }
}

/**
 * Generate composition checks (allOf, anyOf, oneOf, not, if-then-else)
 */
export function generateCompositionChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  // allOf - all subschemas must validate
  // Property tracking is automatic - generatePropertiesChecks handles it
  if (schema.allOf && schema.allOf.length > 0) {
    // Filter out no-op schemas (true, {}) - they always pass and add no constraints
    const nonNoOpSchemas = schema.allOf.filter((s) => !isNoOpSchema(s));

    if (nonNoOpSchemas.length > 0) {
      const propsTracker = ctx.getPropsTracker();
      const itemsTracker = ctx.getItemsTracker();
      for (const subSchema of nonNoOpSchemas) {
        // If subschema has restrictive unevaluatedProperties/unevaluatedItems, it needs isolated tracking
        // so it doesn't see sibling annotations (cousins can't see each other)
        const needsPropsIsolation = hasRestrictiveUnevaluatedProperties(subSchema);
        const needsItemsIsolation = hasRestrictiveUnevaluatedItems(subSchema);
        if (needsPropsIsolation) {
          propsTracker.withScope(() => {
            if (needsItemsIsolation) {
              itemsTracker.withScope(() => {
                generateSchemaValidator(
                  code,
                  subSchema,
                  dataVar,
                  pathExprCode,
                  ctx,
                  dynamicScopeVar
                );
              }, false);
            } else {
              generateSchemaValidator(code, subSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
            }
          }, false); // Don't merge - each allOf subschema's unevaluated scope is isolated
        } else if (needsItemsIsolation) {
          itemsTracker.withScope(() => {
            generateSchemaValidator(code, subSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
          }, false);
        } else {
          generateSchemaValidator(code, subSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
        }
      }
    }
  }

  // anyOf - at least one subschema must validate
  if (schema.anyOf && schema.anyOf.length > 0) {
    // If any schema is a no-op (true, {}), anyOf always passes
    const hasNoOpBranch = schema.anyOf.some((s) => isNoOpSchema(s));
    const propsTracker = ctx.getPropsTracker();
    const itemsTracker = ctx.getItemsTracker();

    // If we're tracking items/props and there are non-trivial branches that could evaluate items,
    // we need to process all branches even if there's a no-op branch
    const needsTracking =
      (propsTracker.active || itemsTracker.active) &&
      schema.anyOf.some((s) => !isNoOpSchema(s) && typeof s === 'object' && s !== null);

    if (hasNoOpBranch && !needsTracking) {
      // Skip generating anyOf check entirely - it always passes
      // But if tracking, we need to enable dynamic mode since any branch could match
      propsTracker.enableDynamic();
    } else if (hasNoOpBranch && needsTracking) {
      // anyOf always passes but we need to track which branches matched for annotations
      // Since there's a no-op, we don't need the result check, just evaluate branches
      propsTracker.enableDynamic();
      itemsTracker.enableDynamic();

      const tracker = new AnnotationTracker(propsTracker, itemsTracker);
      tracker.ensureDynamicVars();

      // Process each non-trivial branch to collect annotations
      schema.anyOf.forEach((subSchema) => {
        if (isNoOpSchema(subSchema)) return; // Skip no-op branches

        const branch = tracker.enterBranch(subSchema);
        const checkExpr = generateSubschemaCheck(code, subSchema, dataVar, ctx, dynamicScopeVar);
        tracker.exitBranch(branch);

        const matchedVar = code.genVar('matched');
        code.line(_`const ${matchedVar} = ${checkExpr};`);
        tracker.mergeBranch(branch, matchedVar);
      });
    } else {
      const resultVar = code.genVar('anyOfResult');
      code.line(_`let ${resultVar} = false;`);

      const tracker = new AnnotationTracker(propsTracker, itemsTracker);
      tracker.ensureDynamicVars();

      schema.anyOf.forEach((subSchema, index) => {
        const generateBranchCheck = () => {
          const branch = tracker.enterBranch(subSchema);
          const checkExpr = generateSubschemaCheck(code, subSchema, dataVar, ctx, dynamicScopeVar);
          tracker.exitBranch(branch);

          const matchedVar = code.genVar('matched');
          code.line(_`const ${matchedVar} = ${checkExpr};`);
          code.if(matchedVar, () => {
            code.line(_`${resultVar} = true;`);
          });
          tracker.mergeBranch(branch, matchedVar);
        };

        // Only short-circuit if NOT tracking properties or items
        if (index > 0 && !tracker.active) {
          code.if(_`!${resultVar}`, generateBranchCheck);
        } else {
          generateBranchCheck();
        }
      });

      code.if(_`!${resultVar}`, () => {
        genError(code, pathExprCode, '#/anyOf', 'anyOf', 'must match a schema in anyOf', {}, ctx);
      });
    }
  }

  // oneOf - exactly one subschema must validate
  if (schema.oneOf && schema.oneOf.length > 0) {
    const propsTracker = ctx.getPropsTracker();
    const itemsTracker = ctx.getItemsTracker();
    const tracker = new AnnotationTracker(propsTracker, itemsTracker);
    const countVar = code.genVar('oneOfCount');
    code.line(_`let ${countVar} = 0;`);

    tracker.ensureDynamicVars();

    schema.oneOf.forEach((subSchema) => {
      const branch = tracker.enterBranch(subSchema);
      const checkExpr = generateSubschemaCheck(code, subSchema, dataVar, ctx, dynamicScopeVar);
      tracker.exitBranch(branch);

      const matchedVar = code.genVar('oneOfMatched');
      code.line(_`const ${matchedVar} = ${checkExpr};`);

      code.if(matchedVar, () => {
        code.line(_`${countVar}++;`);
        // Early exit optimization: check immediately after increment
        code.if(_`${countVar} > 1`, () => {
          genError(
            code,
            pathExprCode,
            '#/oneOf',
            'oneOf',
            'must match exactly one schema in oneOf',
            {},
            ctx
          );
        });
      });

      // Merge this branch's properties/items if it matched (conditionally)
      tracker.mergeBranch(branch, matchedVar);
    });

    // Final validation - exactly one must match
    // Inline the validation check instead of creating a temp variable
    code.if(_`${countVar} !== 1`, () => {
      genError(
        code,
        pathExprCode,
        '#/oneOf',
        'oneOf',
        'must match exactly one schema in oneOf',
        {},
        ctx
      );
    });
  }

  // not - subschema must NOT validate
  // IMPORTANT: Annotations inside 'not' should NOT be collected (per JSON Schema spec)
  if (schema.not !== undefined) {
    const notSchema = schema.not;
    const tracker = new AnnotationTracker(ctx.getPropsTracker(), ctx.getItemsTracker());

    // Optimization: detect always-pass and always-fail patterns
    // not: true or not: {} → always fails (since true/{} matches everything)
    if (isNoOpSchema(notSchema)) {
      genError(code, pathExprCode, '#/not', 'not', 'must NOT be valid', {}, ctx);
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
        genError(code, pathExprCode, '#/not', 'not', 'must NOT be valid', {}, ctx);
      } else {
        // Double negation with non-trivial schema: validate inner schema directly
        // This avoids the overhead of two negation checks
        const checkExpr = tracker.withDiscardedScope(() =>
          generateSubschemaCheck(code, innerNotSchema, dataVar, ctx, dynamicScopeVar)
        );
        code.if(_`!(${checkExpr})`, () => {
          genError(code, pathExprCode, '#/not', 'not', 'must NOT be valid', {}, ctx);
        });
      }
    } else {
      // Try to inline simple negation patterns for better performance
      const inlinedCheck = tryInlineNotCheck(notSchema, dataVar);
      if (inlinedCheck) {
        // Successfully inlined - use negated condition directly
        code.if(inlinedCheck, () => {
          genError(code, pathExprCode, '#/not', 'not', 'must NOT be valid', {}, ctx);
        });
      } else {
        // Fall back to full subschema check with isolated scope
        const checkExpr = tracker.withDiscardedScope(() =>
          generateSubschemaCheck(code, notSchema, dataVar, ctx, dynamicScopeVar)
        );
        code.if(checkExpr, () => {
          genError(code, pathExprCode, '#/not', 'not', 'must NOT be valid', {}, ctx);
        });
      }
    }
  }

  // if-then-else
  if (schema.if !== undefined) {
    const ifSchema = schema.if;
    const thenSchema = schema.then;
    const elseSchema = schema.else;
    const propsTracker = ctx.getPropsTracker();
    const itemsTracker = ctx.getItemsTracker();
    const tracker = new AnnotationTracker(propsTracker, itemsTracker);

    // Skip if there's no then or else AND we're not tracking properties or items
    // (if tracking, we need to process the if schema for its annotations)
    if (thenSchema === undefined && elseSchema === undefined && !tracker.active) {
      return;
    }

    // OPTIMIZATION: Try to inline the if schema check for better performance
    const inlinedCheck = tryInlineIfCondition(code, ifSchema, dataVar, pathExprCode, ctx);

    if (inlinedCheck) {
      // Successfully inlined - use the inlined condition variable
      const condVar = inlinedCheck.conditionVar;

      // Ensure dynamic vars are created before branching (so they're in correct scope)
      if (
        propsTracker.active &&
        (inlinedCheck.evaluatedProps.length > 0 || thenSchema || elseSchema)
      ) {
        propsTracker.getDynamicVar();
      }
      if (itemsTracker.active && (thenSchema || elseSchema)) {
        itemsTracker.getDynamicVar();
      }

      // When if matches, apply then schema AND track if properties
      // According to JSON Schema spec:
      // - When `if` succeeds: `if` annotations + `then` annotations are collected
      // - When `if` fails: only `else` annotations are collected
      code.if(condVar, () => {
        // Track properties from `if` schema since if succeeded
        propsTracker.emitAddProperties(inlinedCheck.evaluatedProps);

        if (thenSchema !== undefined) {
          if (thenSchema === false) {
            genError(code, pathExprCode, '#/then', 'if', 'must match "then" schema', {}, ctx);
          } else if (thenSchema !== true) {
            // Use branch tracking: properties only count when then branch is taken
            const branch = tracker.enterBranch();
            generateSchemaValidator(code, thenSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
            tracker.exitAndMergeBranch(branch, new Name('true'));
          }
        }
      });

      // When if doesn't match, apply else schema if present
      if (elseSchema !== undefined) {
        code.if(_`!${condVar}`, () => {
          if (elseSchema === false) {
            genError(code, pathExprCode, '#/else', 'if', 'must match "else" schema', {}, ctx);
          } else if (elseSchema !== true) {
            // Use branch tracking: properties only count when else branch is taken
            const branch = tracker.enterBranch();
            generateSchemaValidator(code, elseSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
            tracker.exitAndMergeBranch(branch, new Name('true'));
          }
        });
      }
    } else {
      // Fallback to original approach
      const condVar = code.genVar('ifCond');

      tracker.ensureDynamicVars();

      // Track properties/items from `if` schema in a branch.
      // According to JSON Schema spec:
      // - When `if` succeeds: `if` annotations + `then` annotations are collected
      // - When `if` fails: only `else` annotations are collected
      const ifBranch = tracker.enterBranch();
      const checkExpr = generateSubschemaCheck(code, ifSchema, dataVar, ctx, dynamicScopeVar);
      tracker.exitBranch(ifBranch);
      code.line(_`const ${condVar} = ${checkExpr};`);

      // When if matches, apply then schema if present AND merge if annotations
      code.if(condVar, () => {
        // Merge if annotations since if succeeded
        tracker.mergeBranch(ifBranch, new Name('true'));
        if (thenSchema !== undefined) {
          if (thenSchema === false) {
            genError(code, pathExprCode, '#/then', 'if', 'must match "then" schema', {}, ctx);
          } else if (thenSchema !== true) {
            // Track then properties - merge unconditionally since we're inside the if block
            const thenBranch = tracker.enterBranch();
            generateSchemaValidator(code, thenSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
            tracker.exitAndMergeBranch(thenBranch, new Name('true'));
          }
        }
      });

      // When if doesn't match, apply else schema if present
      if (elseSchema !== undefined) {
        code.if(_`!${condVar}`, () => {
          if (elseSchema === false) {
            genError(code, pathExprCode, '#/else', 'if', 'must match "else" schema', {}, ctx);
          } else if (elseSchema !== true) {
            // Track else properties - merge unconditionally since we're inside the else block
            const elseBranch = tracker.enterBranch();
            generateSchemaValidator(code, elseSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
            tracker.exitAndMergeBranch(elseBranch, new Name('true'));
          }
        });
      }
    }
  }
}

/**
 * Try to inline a simple not check for better performance.
 * Returns a condition Code that when TRUE means validation FAILS (i.e., the inner schema matched).
 * Returns undefined if we need to fall back to full check.
 *
 * Handles common simple patterns like:
 * - not: { type: 'string' } → if (typeof data === 'string') fail
 * - not: { type: ['string', 'number'] } → if (typeof data === 'string' || typeof data === 'number') fail
 * - not: { const: value } → if (data === value) fail
 * - not: { enum: [a, b, c] } → if (data === a || data === b || data === c) fail
 */
function tryInlineNotCheck(notSchema: JsonSchema, dataVar: Name): Code | undefined {
  // Only inline objects (not booleans)
  if (typeof notSchema !== 'object' || notSchema === null) {
    return undefined;
  }

  // Count non-metadata keywords
  const keywords = Object.keys(notSchema).filter(
    (k) => k !== '$schema' && k !== '$comment' && k !== 'title' && k !== 'description'
  );

  // Only inline single-keyword schemas to keep it simple and fast
  if (keywords.length !== 1) {
    return undefined;
  }

  const keyword = keywords[0];

  // Inline simple type checks
  if (keyword === 'type') {
    const typeValue = notSchema.type;
    if (typeof typeValue === 'string') {
      // Single type: not: { type: 'string' } → if (typeof data === 'string') fail
      const typeCheck = generateTypeCheckInline(dataVar, typeValue);
      if (typeCheck) {
        return typeCheck;
      }
    } else if (Array.isArray(typeValue) && typeValue.length > 0 && typeValue.length <= 3) {
      // Multiple types (up to 3 for performance):
      // not: { type: ['string', 'number'] } → if (typeof data === 'string' || typeof data === 'number') fail
      const typeChecks: Code[] = [];
      for (const t of typeValue) {
        if (typeof t === 'string') {
          const check = generateTypeCheckInline(dataVar, t);
          if (check) {
            typeChecks.push(check);
          } else {
            return undefined; // Can't inline this type
          }
        } else {
          return undefined; // Invalid type value
        }
      }
      if (typeChecks.length === typeValue.length) {
        // If any type matches, we fail: (check1 || check2 || ...)
        return or(...typeChecks);
      }
    }
  }

  // Inline const check
  if (keyword === 'const') {
    // not: { const: value } → if (data === value) fail
    return _`${dataVar} === ${stringify(notSchema.const)}`;
  }

  // Inline simple enum check (up to 5 primitive values)
  if (keyword === 'enum' && Array.isArray(notSchema.enum) && notSchema.enum.length <= 5) {
    const allPrimitives = notSchema.enum.every((val) => val === null || typeof val !== 'object');
    if (allPrimitives) {
      // not: { enum: [a, b, c] } → if (data === a || data === b || data === c) fail
      const checks = notSchema.enum.map((val) => _`${dataVar} === ${stringify(val)}`);
      return or(...checks);
    }
  }

  // Can't inline - fall back to full check
  return undefined;
}

/**
 * Try to inline an if condition check instead of calling a separate function.
 * Returns { conditionVar, evaluatedProps } if successful, undefined if we need to fall back to function call.
 */
function tryInlineIfCondition(
  code: CodeBuilder,
  ifSchema: JsonSchema,
  dataVar: Name,
  _pathExprCode: Code,
  _ctx: CompileContext
): { conditionVar: Name; evaluatedProps: string[] } | undefined {
  // Handle no-op schemas
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

  // Only inline object schemas without complex keywords
  if (typeof ifSchema !== 'object' || ifSchema === null) return undefined;

  // Don't inline if it has composition keywords or refs
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

  // OPTIMIZATION: Inline simple property-based conditions
  // Common pattern: { properties: {...}, required: [...] }
  const hasProperties = ifSchema.properties !== undefined;
  const hasRequired = ifSchema.required !== undefined && Array.isArray(ifSchema.required);
  const hasPatternProperties = ifSchema.patternProperties !== undefined;
  const hasAdditionalProperties = ifSchema.additionalProperties !== undefined;
  const hasDependencies =
    ifSchema.dependencies !== undefined || ifSchema.dependentSchemas !== undefined;

  // For now, only inline the common simple case:
  // - Object type check (implicit or explicit)
  // - Properties validation
  // - Required properties
  // - No pattern properties, additionalProperties, or other complex features
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

  // Generate inline condition check
  const condVar = code.genVar('ifCond');
  const tempResultVar = code.genVar('ifResult');
  const evaluatedProps: string[] = [];

  // Start with true, then check each constraint
  code.line(_`let ${tempResultVar} = true;`);

  // Check object type first
  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    // Check required properties
    if (hasRequired && ifSchema.required && ifSchema.required.length > 0) {
      for (const propName of ifSchema.required) {
        if (typeof propName === 'string') {
          code.if(_`${tempResultVar} && !(${propName} in ${dataVar})`, () => {
            code.line(_`${tempResultVar} = false;`);
          });
        }
      }
    }

    // Check property validations
    if (hasProperties && ifSchema.properties) {
      for (const [propName, propSchema] of Object.entries(ifSchema.properties)) {
        if (typeof propName !== 'string') continue;

        const propVar = code.genVar('prop');

        code.line(_`const ${propVar} = ${dataVar}[${propName}];`);
        code.if(_`${tempResultVar} && ${propVar} !== undefined`, () => {
          // Generate inline validation for simple property schemas
          const inlineValidation = tryInlinePropertyValidation(
            code,
            propSchema,
            propVar,
            tempResultVar
          );

          if (!inlineValidation) {
            // Can't inline this property validation - bail out
            code.line(_`${tempResultVar} = false; // Complex property schema, can't inline`);
          }
        });

        // Track this property for marking if condition passes
        evaluatedProps.push(propName);

        // Early exit if validation failed
        if (Object.keys(ifSchema.properties).length > 1) {
          code.if(_`!${tempResultVar}`, () => {
            code.line(_`${tempResultVar} = false;`);
          });
        }
      }
    }
  });

  // If not an object, the if condition fails
  code.else(() => {
    code.line(_`${tempResultVar} = false;`);
  });

  code.line(_`const ${condVar} = ${tempResultVar};`);
  return { conditionVar: condVar, evaluatedProps };
}

/**
 * Try to inline a simple property validation.
 * Returns true if successful, false if we need to fall back.
 */
function tryInlinePropertyValidation(
  code: CodeBuilder,
  propSchema: JsonSchema,
  propVar: Name,
  resultVar: Name
): boolean {
  // Handle no-op schemas
  if (isNoOpSchema(propSchema)) {
    return true; // No validation needed
  }
  if (propSchema === false) {
    code.line(_`${resultVar} = false;`);
    return true;
  }

  if (typeof propSchema !== 'object' || propSchema === null) return false;

  // Don't inline complex schemas
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

  // Inline simple type check
  if (propSchema.type !== undefined) {
    const typeCheck = generateTypeCheckInline(propVar, propSchema.type);
    if (!typeCheck) return false;

    code.if(_`!(${typeCheck})`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }

  // Inline const check
  if (propSchema.const !== undefined) {
    code.if(_`${propVar} !== ${stringify(propSchema.const)}`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }

  // Inline enum check
  if (propSchema.enum !== undefined && Array.isArray(propSchema.enum)) {
    code.if(_`!${stringify(propSchema.enum)}.includes(${propVar})`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }

  return true;
}

/**
 * Generate an inline type check expression
 */
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
 * Generate a subschema check expression.
 * Generates inline validation code and returns an expression that evaluates to
 * whether the validation passed (true) or failed (false).
 *
 * This is used for checking if a subschema matches in anyOf, oneOf, not, if/then/else.
 */
function generateSubschemaCheck(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  ctx: CompileContext,
  dynamicScopeVar?: Name
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
        // Multiple types - try optimized union check first
        const optimizedCheck = getOptimizedUnionTypeCheck(dataVar, types);
        if (optimizedCheck) {
          return optimizedCheck;
        }
        // Fallback: generate individual OR checks
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

    // Inline simple required check (single property)
    if (keywords.length === 1 && resolvedSchema.required && resolvedSchema.required.length === 1) {
      const propName = resolvedSchema.required[0];
      return _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar}) && ${JSON.stringify(propName)} in ${dataVar}`;
    }
  }

  // For complex schemas, use labeled block approach
  // This avoids IIFE overhead and error save/restore

  // Determine which schema to validate (follow $ref chains if possible)
  const isRefOnly =
    typeof schema === 'object' &&
    schema !== null &&
    schema.$ref &&
    Object.keys(schema).filter((k) => k !== '$ref' && k !== '$schema' && k !== '$comment')
      .length === 0;
  const schemaToValidate = isRefOnly && resolvedSchema !== schema ? resolvedSchema : schema;

  // Create labeled block for early exit without IIFE
  const label = code.genVar('check');
  const validVar = code.genVar('valid');

  code.line(_`let ${validVar} = true;`);
  code.line(_`${label}: {`);

  // Enter subschema check mode - genError will use break instead of return
  ctx.enterSubschemaCheck(label, validVar);

  // Generate validation inline (genError will set validVar = false and break)
  generateSchemaValidator(code, schemaToValidate, dataVar, _`''`, ctx, dynamicScopeVar);

  // Exit subschema check mode
  ctx.exitSubschemaCheck();

  code.line(_`}`);

  return _`${validVar}`;
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
  dynamicScopeVar?: Name
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

  // Filter out no-op tuple schemas - avoid creating intermediate objects
  const nonTrivialTupleSchemas: Array<{ schema: JsonSchema; index: number }> = [];
  for (let i = 0; i < tupleSchemas.length; i++) {
    const s = tupleSchemas[i];
    if (!isNoOpSchema(s)) {
      nonTrivialTupleSchemas.push({ schema: s, index: i });
    }
  }
  const hasNonTrivialTuples = nonTrivialTupleSchemas.length > 0;

  // Track items for unevaluatedItems support
  const itemsTracker = ctx.getItemsTracker();
  const tracker = new AnnotationTracker(ctx.getPropsTracker(), itemsTracker);

  // prefixItems marks items 0..N-1 as evaluated (even if schemas are trivial like `true`)
  if (tupleSchemas.length > 0) {
    itemsTracker.addPrefixItems(tupleSchemas.length);
  }

  // items keyword (when not an array) marks ALL items as evaluated
  if (afterTupleSchema !== undefined) {
    itemsTracker.markAllItemsEvaluated();
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
        // Push isolated scope for item schema - item's arrays/objects are different instances
        // Don't let nested array/object tracking leak into parent's tracking
        tracker.withItemsScope(() => {
          generateSchemaValidator(code, itemSchema, itemVar, itemPathExpr, ctx, dynamicScopeVar);
        });
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
              itemsIsArray ? '#/additionalItems' : '#/items',
              itemsIsArray ? 'additionalItems' : 'items',
              `must NOT have more than ${startIndex} items`,
              {},
              ctx
            );
          });
        } else {
          code.if(_`${dataVar}.length > 0`, () => {
            genError(
              code,
              pathExprCode,
              '#/items',
              'items',
              'must NOT have more than 0 items',
              {},
              ctx
            );
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
              // Inline type check directly on array access - no intermediate variable
              const typeCheck = getTypeCheck(itemAccess, simpleType);
              code.if(not(typeCheck), () => {
                genError(
                  code,
                  itemPathExpr,
                  '#/items/type',
                  'type',
                  `must be ${simpleType}`,
                  {
                    type: simpleType,
                  },
                  ctx
                );
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
              // Push isolated scope for item schema - item's arrays/objects are different instances
              tracker.withItemsScope(() => {
                generateSchemaValidator(
                  code,
                  afterTupleSchema!,
                  itemVar,
                  itemPathExpr,
                  ctx,
                  dynamicScopeVar
                );
              });
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

  // Determine if format validation should be enabled:
  // 1. If there's a custom metaschema with $vocabulary, check if format-assertion is enabled
  // 2. Otherwise, use the global formatAssertion option (auto-detected from dialect)
  let enableFormatAssertion: boolean;
  if (ctx.hasCustomVocabulary()) {
    // Custom metaschema: use vocabulary to determine format validation
    enableFormatAssertion = ctx.isVocabularyEnabled(VOCABULARIES.format_assertion);
  } else {
    // No custom metaschema: use the global option (respects user's explicit setting or auto-detection)
    enableFormatAssertion = ctx.options.formatAssertion;
  }

  if (!enableFormatAssertion) return;

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
      genError(
        code,
        pathExprCode,
        '#/format',
        'format',
        `must match format "${format}"`,
        {
          format,
        },
        ctx
      );
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
  dynamicScopeVar?: Name
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
      genError(
        code,
        pathExprCode,
        '#/$dynamicRef',
        '$dynamicRef',
        `can't resolve reference ${ref}`,
        { $ref: ref },
        ctx
      );
      return;
    }
    const staticFuncName = ctx.queueCompile(staticSchema);

    // Check if the statically resolved schema has a matching $dynamicAnchor
    // If not, $dynamicRef behaves like a regular $ref (no dynamic scope search)
    const hasDynamicAnchor =
      typeof staticSchema === 'object' &&
      staticSchema !== null &&
      staticSchema.$dynamicAnchor === anchorName;

    // For unevaluatedProperties: track properties from all schemas with matching $dynamicAnchor
    const propsTracker = ctx.getPropsTracker();
    if (propsTracker.active) {
      for (const dynSchema of ctx.getDynamicAnchors(anchorName)) {
        if (typeof dynSchema === 'object' && dynSchema !== null && dynSchema.properties) {
          propsTracker.emitAddProperties(Object.keys(dynSchema.properties));
        }
      }
    }

    // If no dynamic scope var (legacy mode or empty), just call static validator
    if (!dynamicScopeVar) {
      code.if(_`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, [])`, () => {
        genSubschemaExit(code, ctx);
      });
    } else if (!hasDynamicAnchor) {
      // No matching $dynamicAnchor - behave like a regular $ref
      code.if(
        _`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar})`,
        () => {
          genSubschemaExit(code, ctx);
        }
      );
    } else {
      // Has matching $dynamicAnchor - use Map.get() for O(1) lookup
      code.block(_``, () => {
        // Use dynamic validator if found in scope, otherwise use static fallback
        code.line(
          _`const validator = ${dynamicScopeVar}.get(${stringify(anchorName)}) || ${staticFuncName};`
        );
        code.if(_`!validator(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar})`, () => {
          genSubschemaExit(code, ctx);
        });
      });
    }
  } else {
    // Not an anchor reference - resolve statically like $ref
    // This handles cases like $dynamicRef: "#/$defs/items"
    const refSchema = ctx.resolveRef(ref, schema);

    if (!refSchema) {
      genError(
        code,
        pathExprCode,
        '#/$dynamicRef',
        '$dynamicRef',
        `can't resolve reference ${ref}`,
        { $ref: ref },
        ctx
      );
      return;
    }

    const funcName = ctx.queueCompile(refSchema);
    const scopeArg = dynamicScopeVar || _`[]`;
    code.if(_`!${funcName}(${dataVar}, errors, ${pathExprCode}, ${scopeArg})`, () => {
      genSubschemaExit(code, ctx);
    });
  }
}

/**
 * Generate $recursiveRef check code (draft 2019-09)
 * $recursiveRef is always "#" and works with $recursiveAnchor: true (boolean, not named)
 */
export function generateRecursiveRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  if (!schema.$recursiveRef) return;

  const ref = schema.$recursiveRef;

  // $recursiveRef should always be "#" in draft 2019-09
  if (ref !== '#') {
    genError(
      code,
      pathExprCode,
      '#/$recursiveRef',
      '$recursiveRef',
      `$recursiveRef must be "#" (got "${ref}")`,
      { $ref: ref },
      ctx
    );
    return;
  }

  // Resolve "#" to get the current resource root schema
  const staticSchema = ctx.resolveRef(ref, schema);
  if (!staticSchema) {
    genError(
      code,
      pathExprCode,
      '#/$recursiveRef',
      '$recursiveRef',
      `can't resolve reference ${ref}`,
      { $ref: ref },
      ctx
    );
    return;
  }

  const staticFuncName = ctx.queueCompile(staticSchema);

  // Check if the statically resolved schema has $recursiveAnchor: true
  // If not, $recursiveRef behaves like a regular $ref
  const hasRecursiveAnchor = ctx.hasRecursiveAnchor(staticSchema);

  // Track properties/items from ALL schemas with $recursiveAnchor: true
  // because any of them could be the runtime resolution target
  if (hasRecursiveAnchor) {
    const propsTracker = ctx.getPropsTracker();
    const itemsTracker = ctx.getItemsTracker();

    for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
      if (typeof dynSchema === 'object' && dynSchema !== null) {
        // Track properties
        if (propsTracker.active && dynSchema.properties) {
          propsTracker.addProperties(Object.keys(dynSchema.properties));
        }
        // Track items - only track tuple items, not schema items
        if (itemsTracker.active && Array.isArray(dynSchema.items)) {
          itemsTracker.addPrefixItems(dynSchema.items.length);
        }
      }
    }
  }

  // If no dynamic scope var (legacy mode or empty), just call static validator
  if (!dynamicScopeVar) {
    code.if(_`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, [])`, () => {
      genSubschemaExit(code, ctx);
    });
  } else if (!hasRecursiveAnchor) {
    // No $recursiveAnchor - behave like a regular $ref
    code.if(_`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar})`, () => {
      genSubschemaExit(code, ctx);
    });
  } else {
    // Has $recursiveAnchor: true
    // Optimization: if there's only one $recursiveAnchor in the entire schema tree,
    // we can statically resolve it and avoid the Map.get() lookup overhead
    const allRecursiveAnchors = ctx.getAllRecursiveAnchorSchemas();
    if (allRecursiveAnchors.length === 1) {
      // Static resolution: only one possible target, call it directly
      code.if(
        _`!${staticFuncName}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar})`,
        () => {
          genSubschemaExit(code, ctx);
        }
      );
    } else {
      // Multiple $recursiveAnchors - need runtime lookup
      // Use Map.get() for O(1) lookup, but avoid extra block scope
      const validatorVar = new Name('validator');
      code.line(
        _`const ${validatorVar} = ${dynamicScopeVar}.get('__recursive__') || ${staticFuncName};`
      );
      code.if(_`!${validatorVar}(${dataVar}, errors, ${pathExprCode}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    }
  }
}
