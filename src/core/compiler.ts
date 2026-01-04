/**
 * JSON Schema Compiler
 *
 * Generates optimized JavaScript validation functions from schemas.
 * Uses safe code generation to prevent injection attacks.
 */

import type { JsonSchema } from '../types.js';
import { CodeBuilder, Code, Name, _, stringify } from './codegen.js';
import { CompileContext, type CompileOptions } from './context.js';
import { createDeepEqual, createUcs2Length, createFormatValidators } from './runtime/index.js';
import { genError } from './keywords/shared/utils.js';
// Import all keyword handlers
import {
  generateTypeCheck,
  generateConstCheck,
  generateEnumCheck,
  generateStringChecks,
  generateContentChecks,
  generateNumberChecks,
  generateMinItemsCheck,
  generateMaxItemsCheck,
  generateUniqueItemsCheck,
  generateItemsChecks,
  generateContainsCheck,
  generateUnevaluatedItemsCheck,
  generateObjectChecks,
  generatePropertiesChecks,
  generateUnevaluatedPropertiesCheck,
  generateDependentRequiredCheck,
  generateDependentSchemasCheck,
  generateDependenciesCheck,
  generatePropertyNamesCheck,
  generateAllOfCheck,
  generateAnyOfCheck,
  generateOneOfCheck,
  generateNotCheck,
  generateIfThenElseCheck,
  generateRefCheck,
  generateDynamicRefCheck,
  generateRecursiveRefCheck,
  generateFormatCheck,
  setCompileFn,
  setGenerateSchemaValidator,
} from './keywords/index.js';
import {
  hasRestrictiveUnevaluatedProperties,
  containsUnevaluatedProperties,
} from './props-tracker.js';
import { hasRestrictiveUnevaluatedItems, containsUnevaluatedItems } from './items-tracker.js';

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

  // Inject the validateSubschema callback to break circular dependency
  // The callback bridges the new API (schema, dataVar, pathExprCode, ctx) to the old one
  ctx.setValidateSubschemaFn((subschema, dataVar, pathExprCode, subCtx, dynamicScopeVar) => {
    generateSchemaValidator(subCtx.code, subschema, dataVar, pathExprCode, subCtx, dynamicScopeVar);
  });

  // Add runtime functions
  ctx.addRuntimeFunction('deepEqual', createDeepEqual());
  ctx.addRuntimeFunction('ucs2length', createUcs2Length());
  ctx.addRuntimeFunction('formatValidators', createFormatValidators());

  // Generate the main validation function
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema, mainFuncName);

  // In legacy mode (draft-07 and earlier), skip dynamic scope entirely for better performance
  // Only enable dynamic scope if the root schema actually uses $dynamicRef or $recursiveRef
  // This avoids overhead from meta-schemas with $recursiveAnchor that are never used
  const hasDynamicFeatures = !ctx.options.legacyRef && ctx.rootUsesDynamicRefs();
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

  // Create the function with runtime dependencies injected
  const factory = new Function(
    ...runtimeNames,
    `return function ${mainFuncName}(data, errors) {\n${fullCode}\n}`
  );
  return factory(...runtimeValues) as ValidateFn;
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

  // Set the dynamic scope var and schema context so handlers can use ctx.schema, ctx.data, ctx.path
  ctx.setDynamicScopeVar(scopeVar);
  ctx.setSchemaContext(schema, dataVar, pathExprCode);

  // In legacy mode (draft-07 and earlier), $ref overrides all sibling keywords
  if (schema.$ref && ctx.options.legacyRef) {
    generateRefCheck(ctx);
  } else {
    // Generate code for each keyword (draft-2020-12 behavior)
    generateTypeCheck(ctx);
    generateConstCheck(ctx);
    generateEnumCheck(ctx);
    generateStringChecks(ctx);
    generateFormatCheck(ctx);
    generateContentChecks(ctx);
    generateNumberChecks(ctx);
    generateItemsChecks(ctx);
    generateMinItemsCheck(ctx);
    generateMaxItemsCheck(ctx);
    generateUniqueItemsCheck(ctx);
    generateObjectChecks(ctx);
    generatePropertiesChecks(ctx);
    generateAllOfCheck(ctx);
    generateAnyOfCheck(ctx);
    generateOneOfCheck(ctx);
    generateNotCheck(ctx);
    generateIfThenElseCheck(ctx);
    generateRefCheck(ctx);
    generateDynamicRefCheck(ctx);
    generateRecursiveRefCheck(ctx);
    generateContainsCheck(ctx);
    generateDependentRequiredCheck(ctx);
    generatePropertyNamesCheck(ctx);
    generateDependentSchemasCheck(ctx);
    generateDependenciesCheck(ctx);
    // unevaluated* must be checked LAST after all other keywords
    generateUnevaluatedPropertiesCheck(ctx);
    generateUnevaluatedItemsCheck(ctx);
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

// Initialize circular dependency setters
// These allow keyword handlers to call back into the compiler
setCompileFn(compile);
setGenerateSchemaValidator(generateSchemaValidator);
