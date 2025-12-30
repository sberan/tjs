/**
 * JSON Schema Compiler
 *
 * Generates optimized JavaScript validation functions from schemas.
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import { CodeBuilder, escapeString, propAccess, stringify } from './codegen.js';
import { CompileContext, VOCABULARIES, type CompileOptions } from './context.js';
import { createFormatValidators } from './keywords/format.js';

/**
 * Runtime tracker for evaluated properties/items.
 * This is the shape of the tracker object passed at runtime.
 */
export interface RuntimeTracker {
  props?: Record<string, boolean>;
  maxItem?: number;
  patterns?: RegExp[];
}

/**
 * Tracker for evaluated properties/items.
 * Uses runtime tracking - generates code that writes to a `tracker` parameter.
 * The tracker is passed through compiled function calls.
 */
class EvalTracker {
  /** Variable name for the runtime tracker (e.g., 'tracker') */
  readonly trackerVar: string;
  /** Whether we're tracking properties */
  readonly trackProps: boolean;
  /** Whether we're tracking items */
  readonly trackItems: boolean;
  /** Pattern regex variable names registered for this tracker */
  readonly patternVars: string[] = [];
  /** Parent tracker (for bubbling up) */
  readonly parentTracker?: EvalTracker;
  /** If true, tracker may be undefined at runtime - generate conditional checks */
  readonly isRuntimeOptional: boolean;
  /** If true, use Set-based item tracking (for contains) instead of just maxItem */
  readonly useItemSet: boolean;

  private readonly code: CodeBuilder;

  constructor(
    code: CodeBuilder,
    trackerVar: string,
    options: {
      trackProps?: boolean;
      trackItems?: boolean;
      parentTracker?: EvalTracker;
      isRuntimeOptional?: boolean;
      useItemSet?: boolean;
    } = {}
  ) {
    this.code = code;
    this.trackerVar = trackerVar;
    this.trackProps = options.trackProps ?? false;
    this.trackItems = options.trackItems ?? false;
    this.parentTracker = options.parentTracker;
    this.isRuntimeOptional = options.isRuntimeOptional ?? false;
    this.useItemSet = options.useItemSet ?? false;
  }

  /** Check if any tracking is enabled */
  get enabled(): boolean {
    return this.trackProps || this.trackItems;
  }

  /** Check if we're tracking properties */
  get trackingProps(): boolean {
    return this.trackProps;
  }

  /** Check if we're tracking items */
  get trackingItems(): boolean {
    return this.trackItems;
  }

  /** Initialize the tracker (creates the tracker object if tracking is needed) */
  init(): void {
    // Create tracker with props/maxItem/items/patterns based on what we're tracking
    const parts: string[] = [];
    if (this.trackProps) {
      parts.push('props: {}', 'patterns: []');
    }
    if (this.trackItems) {
      parts.push('maxItem: -1');
      if (this.useItemSet) {
        parts.push('items: new Set()');
      }
    }
    if (parts.length > 0) {
      this.code.line(`const ${this.trackerVar} = { ${parts.join(', ')} };`);
    }
  }

  /** Mark a static property name as evaluated */
  markProp(propName: string): void {
    if (this.trackProps) {
      const stmt = `${this.trackerVar}.props["${escapeString(propName)}"] = true;`;
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) ${stmt}`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark a dynamic property (key variable) as evaluated */
  markPropDynamic(keyVar: string): void {
    if (this.trackProps) {
      const stmt = `${this.trackerVar}.props[${keyVar}] = true;`;
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) ${stmt}`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark all properties as evaluated (e.g., when additionalProperties is present) */
  markAllProps(): void {
    if (this.trackProps) {
      const stmt = `${this.trackerVar}.props.__all__ = true;`;
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) ${stmt}`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark a static item index as evaluated */
  markItem(index: number): void {
    if (this.trackItems) {
      let stmt = `if (${index} > ${this.trackerVar}.maxItem) ${this.trackerVar}.maxItem = ${index};`;
      if (this.useItemSet) {
        stmt += ` ${this.trackerVar}.items.add(${index});`;
      }
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) { ${stmt} }`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark items up to a dynamic index as evaluated (sequential marking) */
  markItemsDynamic(indexVar: string): void {
    if (this.trackItems) {
      let stmt = `if (${indexVar} > ${this.trackerVar}.maxItem) ${this.trackerVar}.maxItem = ${indexVar};`;
      if (this.useItemSet) {
        stmt += ` ${this.trackerVar}.items.add(${indexVar});`;
      }
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) { ${stmt} }`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark a single arbitrary item as evaluated (for contains) */
  markSingleItem(indexVar: string): void {
    if (!this.trackItems) return;
    // For runtime-optional trackers (received from caller), check if items Set exists at runtime
    // For known useItemSet trackers, generate unconditional code
    if (this.isRuntimeOptional) {
      // Check both tracker existence and items Set existence at runtime
      this.code.line(
        `if (${this.trackerVar} && ${this.trackerVar}.items) ${this.trackerVar}.items.add(${indexVar});`
      );
    } else if (this.useItemSet) {
      this.code.line(`${this.trackerVar}.items.add(${indexVar});`);
    }
  }

  /** Mark all items as evaluated (e.g., when items schema covers all) */
  markAllItems(): void {
    if (this.trackItems) {
      const stmt = `${this.trackerVar}.maxItem = Infinity;`;
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) ${stmt}`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Register a pattern regex variable for unevaluatedProperties check */
  addPattern(regexVarName: string): void {
    if (this.trackProps) {
      // Add to compile-time list (for local unevaluatedProperties checks)
      this.patternVars.push(regexVarName);
      // Also push to runtime tracker.patterns (for cross-function tracking)
      const stmt = `${this.trackerVar}.patterns.push(${regexVarName});`;
      if (this.isRuntimeOptional) {
        this.code.line(`if (${this.trackerVar}) ${stmt}`);
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Check if a property is unevaluated (returns expression string) */
  isUnevaluatedProp(keyVar: string): string {
    // Check: not marked as all evaluated, not in evaluated props object, not matching any pattern
    // We check both compile-time patternVars (local) and runtime tracker.patterns (from called functions)
    let expr = `!${this.trackerVar}.props.__all__ && !${this.trackerVar}.props[${keyVar}]`;
    // Check compile-time patterns
    for (const patternVar of this.patternVars) {
      expr += ` && !${patternVar}.test(${keyVar})`;
    }
    // Check runtime patterns (from nested function calls)
    expr += ` && !${this.trackerVar}.patterns.some(p => p.test(${keyVar}))`;
    return expr;
  }

  /** Check if an item is unevaluated (returns expression string) */
  isUnevaluatedItem(indexVar: string): string {
    if (this.useItemSet) {
      // Check both maxItem (for sequential) and items Set (for arbitrary/contains)
      return `${indexVar} > ${this.trackerVar}.maxItem && !${this.trackerVar}.items.has(${indexVar})`;
    }
    return `${indexVar} > ${this.trackerVar}.maxItem`;
  }

  /** Create a child tracker that shares the same runtime tracker variable */
  child(): EvalTracker {
    const child = new EvalTracker(this.code, this.trackerVar, {
      trackProps: this.trackProps,
      trackItems: this.trackItems,
      isRuntimeOptional: this.isRuntimeOptional,
      useItemSet: this.useItemSet,
    });
    child.patternVars.push(...this.patternVars);
    return child;
  }

  /**
   * Bubble up evaluated props/items to parent tracker.
   * Called after a nested schema with unevaluatedProperties/Items completes.
   */
  bubbleUpToParent(): void {
    if (!this.parentTracker) return;

    const parentVar = this.parentTracker.trackerVar;
    const needsCheck = this.parentTracker.isRuntimeOptional;

    if (this.trackProps && this.parentTracker.trackProps) {
      const copyProps = () => {
        // Copy __all__ flag if set
        this.code.if(`${this.trackerVar}.props.__all__`, () => {
          this.code.line(`${parentVar}.props.__all__ = true;`);
        });
        // Copy individual props
        this.code.else(() => {
          this.code.forIn('k', `${this.trackerVar}.props`, () => {
            this.code.line(`${parentVar}.props[k] = true;`);
          });
        });
      };

      if (needsCheck) {
        this.code.if(parentVar, copyProps);
      } else {
        copyProps();
      }
    }

    if (this.trackItems && this.parentTracker.trackItems) {
      const copyItems = () => {
        this.code.if(`${this.trackerVar}.maxItem > ${parentVar}.maxItem`, () => {
          this.code.line(`${parentVar}.maxItem = ${this.trackerVar}.maxItem;`);
        });
      };

      if (needsCheck) {
        this.code.if(parentVar, copyItems);
      } else {
        copyItems();
      }
    }
  }

  /**
   * Create a temp tracker variable and return its name.
   * Used for conditional tracking in anyOf/oneOf/if-then-else.
   * Returns undefined if tracking is not enabled.
   */
  createTempTracker(prefix: string): string | undefined {
    if (!this.enabled) return undefined;
    const tempVar = this.code.genVar(prefix);
    const parts: string[] = [];
    if (this.trackProps) parts.push('props: {}', 'patterns: []');
    if (this.trackItems) {
      parts.push('maxItem: -1');
      if (this.useItemSet) {
        parts.push('items: new Set()');
      }
    }
    this.code.line(`const ${tempVar} = { ${parts.join(', ')} };`);
    return tempVar;
  }

  /**
   * Generate code to merge a temp tracker into this tracker.
   * Only merges if this tracker exists (for runtime-optional trackers).
   * No-op if tracking is not enabled.
   */
  mergeFrom(tempVar: string | undefined): void {
    if (!this.enabled || !tempVar) return;
    const doMerge = () => {
      if (this.trackProps) {
        this.code.line(`Object.assign(${this.trackerVar}.props, ${tempVar}.props);`);
        this.code.line(`${this.trackerVar}.patterns.push(...${tempVar}.patterns);`);
      }
      if (this.trackItems) {
        this.code.line(
          `if (${tempVar}.maxItem > ${this.trackerVar}.maxItem) ${this.trackerVar}.maxItem = ${tempVar}.maxItem;`
        );
        if (this.useItemSet) {
          this.code.line(`for (const i of ${tempVar}.items) ${this.trackerVar}.items.add(i);`);
        }
      }
    };

    if (this.isRuntimeOptional) {
      this.code.if(this.trackerVar, doMerge);
    } else {
      doMerge();
    }
  }
}

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
    genError(code, propPathExpr, 'required', 'Required property missing');
  });
}

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
  // Each compiled function takes an optional tracker parameter for eval tracking
  // The tracker parameter is used to mark evaluated properties/items
  let queued: { schema: JsonSchema; funcName: string } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    code.blank();
    if (useDynamicScope) {
      // Function signature: (data, errors, path, dynamicScope, tracker?)
      code.block(`function ${q.funcName}(data, errors, path, dynamicScope, tracker)`, () => {
        // Create a "runtime" tracker that generates conditional marking code
        // The code checks `if (tracker)` before each mark operation
        const trackerObj = new EvalTracker(code, 'tracker', {
          trackProps: true,
          trackItems: true,
          isRuntimeOptional: true,
        });
        generateSchemaValidator(code, q.schema, 'data', 'path', ctx, 'dynamicScope', trackerObj);
        code.line('return true;');
      });
    } else {
      // In legacy mode, skip dynamicScope parameter for faster function calls
      // Function signature: (data, errors, path, tracker?)
      code.block(`function ${q.funcName}(data, errors, path, tracker)`, () => {
        const trackerObj = new EvalTracker(code, 'tracker', {
          trackProps: true,
          trackItems: true,
          isRuntimeOptional: true,
        });
        generateSchemaValidator(code, q.schema, 'data', 'path', ctx, '', trackerObj);
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
 * @param pathExpr - JavaScript expression that evaluates to the current path string
 * @param dynamicScopeVar - Variable name for the dynamic scope array (for $dynamicRef)
 * @param evalTracker - Tracker for evaluated properties/items (for unevaluated* keywords)
 */
function generateSchemaValidator(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  dynamicScopeVar?: string,
  evalTracker?: EvalTracker
): void {
  // In legacy mode, never use dynamic scope
  const scopeVar = ctx.options.legacyRef ? '' : (dynamicScopeVar ?? 'dynamicScope');
  // Boolean schemas
  if (schema === true) {
    // Always valid - no code needed
    return;
  }

  if (schema === false) {
    genError(code, pathExpr, 'false', 'Schema is false');
    return;
  }

  // String shorthand types (e.g., 'string' is equivalent to { type: 'string' })
  if (typeof schema === 'string') {
    // Convert shorthand to equivalent type schema and recurse
    generateSchemaValidator(code, { type: schema }, dataVar, pathExpr, ctx, dynamicScopeVar);
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
  // BUT if we have an eval tracker, we still need to inline for property tracking
  if (schema.$ref && ctx.options.legacyRef && !evalTracker) {
    generateRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
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
      // Check if contains is present anywhere - requires Set-based item tracking
      const needsItemSet = hasUnevalItems && schemaHasContains(schema, ctx);

      // This schema has its own unevaluatedProperties/Items - create a NEW tracker
      // The tracker is a local variable that gets passed to sub-validators
      // Keep reference to parent so we can bubble up after our unevaluated* check runs
      const trackerVar = code.genVar('tracker');
      tracker = new EvalTracker(code, trackerVar, {
        trackProps: hasUnevalProps,
        trackItems: hasUnevalItems,
        parentTracker: evalTracker,
        useItemSet: needsItemSet,
      });
      tracker.init();
    }
    // If no unevalProps/Items here but parent has tracker, keep using parent's tracker
    // so that properties evaluated here are visible to the parent's unevaluatedProperties check

    // Generate code for each keyword (draft-2020-12 behavior)
    generateTypeCheck(code, schema, dataVar, pathExpr, ctx);
    generateConstCheck(code, schema, dataVar, pathExpr, ctx);
    generateEnumCheck(code, schema, dataVar, pathExpr, ctx);
    generateStringChecks(code, schema, dataVar, pathExpr, ctx);
    generateFormatCheck(code, schema, dataVar, pathExpr, ctx);
    generateContentChecks(code, schema, dataVar, pathExpr, ctx);
    generateNumberChecks(code, schema, dataVar, pathExpr, ctx);
    generateItemsChecks(code, schema, dataVar, pathExpr, ctx, tracker);
    generateArrayChecks(code, schema, dataVar, pathExpr, ctx);
    generateObjectChecks(code, schema, dataVar, pathExpr, ctx);
    generatePropertiesChecks(code, schema, dataVar, pathExpr, ctx, tracker);
    generateCompositionChecks(code, schema, dataVar, pathExpr, ctx, scopeVar, tracker);
    generateRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar, tracker);
    generateDynamicRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar, tracker);
    generateContainsCheck(code, schema, dataVar, pathExpr, ctx, tracker);
    generateDependentRequiredCheck(code, schema, dataVar, pathExpr, ctx);
    generatePropertyNamesCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependentSchemasCheck(code, schema, dataVar, pathExpr, ctx, tracker);
    generateDependenciesCheck(code, schema, dataVar, pathExpr, ctx, tracker);
    generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExpr, ctx, tracker);
    generateUnevaluatedItemsCheck(code, schema, dataVar, pathExpr, ctx, tracker);

    // After unevaluatedProperties/Items checks, bubble up evaluated props to parent
    // This ensures nested unevaluatedProperties: true marks props for parent too
    if (tracker && tracker !== evalTracker) {
      tracker.bubbleUpToParent();
    }
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
 * Check if schema has a specific type constraint that guarantees the type is already validated
 */
function hasTypeConstraint(schema: JsonSchemaBase, type: string): boolean {
  if (!schema.type) return false;
  if (Array.isArray(schema.type)) {
    // Only if single type
    return schema.type.length === 1 && schema.type[0] === type;
  }
  return schema.type === type;
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
      // Use 'u' flag for Unicode support (enables \p{...} property escapes)
      const regexName = ctx.genRuntimeName('pattern');
      ctx.addRuntimeFunction(regexName, new RegExp(schema.pattern, 'u'));
      code.if(`!${regexName}.test(${dataVar})`, () => {
        genError(code, pathExpr, 'pattern', `String must match pattern ${schema.pattern}`);
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
  dataVar: string,
  pathExpr: string,
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
  code.if(`typeof ${dataVar} === 'string'`, () => {
    // First check encoding if present
    if (schema.contentEncoding !== undefined) {
      if (schema.contentEncoding === 'base64') {
        // Validate base64 encoding
        // Base64 characters: A-Z, a-z, 0-9, +, /, and = for padding
        const regexName = ctx.genRuntimeName('base64Re');
        ctx.addRuntimeFunction(regexName, /^[A-Za-z0-9+/]*={0,2}$/);
        code.if(`!${regexName}.test(${dataVar}) || ${dataVar}.length % 4 !== 0`, () => {
          genError(code, pathExpr, 'contentEncoding', 'String must be valid base64');
        });
      }
    }

    // Then check media type if present
    if (schema.contentMediaType !== undefined) {
      if (schema.contentMediaType === 'application/json') {
        // If there's also base64 encoding, we need to decode first
        if (schema.contentEncoding === 'base64') {
          const decodedVar = code.genVar('decoded');
          code.block('', () => {
            code.line('try {');
            code.line(`  const ${decodedVar} = atob(${dataVar});`);
            code.line(`  JSON.parse(${decodedVar});`);
            code.line('} catch (e) {');
            genError(code, pathExpr, 'contentMediaType', 'String must be valid JSON');
            code.line('}');
          });
        } else {
          // Validate directly as JSON
          code.block('', () => {
            code.line('try {');
            code.line(`  JSON.parse(${dataVar});`);
            code.line('} catch (e) {');
            genError(code, pathExpr, 'contentMediaType', 'String must be valid JSON');
            code.line('}');
          });
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

  // Check if we need the typeof guard - skip if type already constrains to number/integer
  const needsTypeGuard =
    !hasTypeConstraint(schema, 'number') && !hasTypeConstraint(schema, 'integer');

  const genChecks = () => {
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
      const multipleOf = schema.multipleOf;
      // Use Number.isInteger for accuracy (handles large numbers and Infinity correctly)
      // For integer multipleOf values, can use simpler modulo check
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        // Fast path for integer multipleOf: simple modulo
        code.if(`${dataVar} % ${multipleOf} !== 0`, () => {
          genError(
            code,
            pathExpr,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        });
      } else {
        const divVar = code.genVar('div');
        code.line(`const ${divVar} = ${dataVar} / ${multipleOf};`);
        code.if(`!Number.isInteger(${divVar})`, () => {
          genError(
            code,
            pathExpr,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        });
      }
    }
  };

  // Skip type guard if we already know it's a number/integer
  if (needsTypeGuard) {
    code.if(`typeof ${dataVar} === 'number'`, genChecks);
  } else {
    genChecks();
  }
}

/**
 * Get the types of items from the schema's items/prefixItems definition
 * Returns empty array if types are unknown or could include objects/arrays
 */
function getItemTypes(schema: JsonSchemaBase): string[] {
  // Check items schema for type constraints
  const itemsSchema = schema.items;
  if (typeof itemsSchema === 'object' && itemsSchema !== null && !Array.isArray(itemsSchema)) {
    const itemType = (itemsSchema as JsonSchemaBase).type;
    if (typeof itemType === 'string') {
      return [itemType];
    }
    if (Array.isArray(itemType)) {
      return itemType as string[];
    }
  }
  // prefixItems or array items - too complex to analyze
  return [];
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

  const genChecks = () => {
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

        code.line(`const ${indicesVar} = {};`);
        code.block(`for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.line(`let ${itemVar} = ${dataVar}[${iVar}];`);
          // If multiple types possible, prefix strings to avoid collision with numbers
          if (hasMultipleTypes) {
            code.if(`typeof ${itemVar} === 'string'`, () => {
              code.line(`${itemVar} = '_' + ${itemVar};`);
            });
          }
          code.if(`typeof ${indicesVar}[${itemVar}] === 'number'`, () => {
            genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
          });
          code.line(`${indicesVar}[${itemVar}] = ${iVar};`);
        });
      } else {
        // Slow path: O(n²) comparison using deepEqual
        code.block(`outer: for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.block(`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
            code.if(`deepEqual(${dataVar}[${iVar}], ${dataVar}[${jVar}])`, () => {
              genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
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
    code.if(`Array.isArray(${dataVar})`, genChecks);
  }
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

  const genChecks = () => {
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
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    // Only check if data is an object
    code.if(
      `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
}

/**
 * Generate properties, additionalProperties, patternProperties checks
 */
// Check if a schema is a no-op (true, {})
function isNoOpSchema(schema: JsonSchema): boolean {
  if (schema === true) return true;
  if (typeof schema === 'object' && schema !== null && Object.keys(schema).length === 0) {
    return true;
  }
  return false;
}

export function generatePropertiesChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
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
      for (const propName of Object.keys(schema.properties)) {
        evalTracker.markProp(propName);
      }
    }

    // Validate defined properties (only non-trivial ones)
    for (const [propName, propSchema] of nonTrivialProps) {
      const propPathExpr =
        pathExpr === "''"
          ? `'${escapeString(propName)}'`
          : `${pathExpr} + '.${escapeString(propName)}'`;
      genPropertyCheck(code, dataVar, propName, (valueVar) => {
        generateSchemaValidator(code, propSchema, valueVar, propPathExpr, ctx);
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
      // Use 'u' flag for Unicode support (enables \p{...} property escapes)
      const patternRegexNames: string[] = [];
      for (const pattern of allPatterns) {
        const regexName = ctx.genRuntimeName('patternRe');
        ctx.addRuntimeFunction(regexName, new RegExp(pattern, 'u'));
        patternRegexNames.push(regexName);
        // Register pattern with tracker for unevaluatedProperties check
        if (evalTracker) {
          evalTracker.addPattern(regexName);
        }
      }

      code.forIn('key', dataVar, () => {
        const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;

        // Generate patternProperties checks (only non-trivial ones)
        for (let i = 0; i < nonTrivialPatternProps.length; i++) {
          const [pattern, patternSchema] = nonTrivialPatternProps[i];
          // Find the index in allPatterns to get the right regex
          const regexIdx = allPatterns.indexOf(pattern);
          const regexName = patternRegexNames[regexIdx];
          code.if(`${regexName}.test(key)`, () => {
            const propAccessed = `${dataVar}[key]`;
            generateSchemaValidator(code, patternSchema, propAccessed, keyPathExpr, ctx);
          });
        }

        // Generate additionalProperties check
        if (hasAdditionalProps) {
          const addPropsSchema = schema.additionalProperties!;

          // Build condition: not a defined prop and not matching any pattern
          // Use inline comparisons for small numbers of properties (faster than Set.has)
          const conditions: string[] = [];

          // For defined properties, use inline comparison for up to ~10 props
          if (definedProps.length > 0 && definedProps.length <= 10) {
            const propChecks = definedProps.map((p) => `key !== "${escapeString(p)}"`).join(' && ');
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
            generateAdditionalPropsCheck(code, addPropsSchema, `${dataVar}[key]`, keyPathExpr, ctx);
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
      `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
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
  ctx: CompileContext,
  evalTracker?: EvalTracker
): void {
  if (schema.contains === undefined) return;

  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  // Handle boolean schemas directly
  if (containsSchema === true) {
    // Every item matches - mark all items as evaluated and check array length
    code.if(`Array.isArray(${dataVar})`, () => {
      // All items match, so mark all as evaluated
      evalTracker?.markAllItems();

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
      // maxContains is always satisfied since count is 0, no items evaluated
    });
    return;
  }

  // If minContains is 0 and no maxContains, contains is always satisfied
  // But we still need to track which items match for unevaluatedItems
  if (minContains === 0 && maxContains === undefined && !evalTracker?.trackingItems) {
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
        // Mark this item as evaluated (for unevaluatedItems)
        evalTracker?.markSingleItem(iVar);
      });

      // Early exit if we've found enough and no maxContains
      // But only if we're not tracking items (need to find all matches for tracking)
      if (maxContains === undefined && !evalTracker?.trackingItems) {
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

  // Filter out empty arrays (no requirements)
  const deps = Object.entries(schema.dependentRequired).filter(([, reqs]) => reqs.length > 0);
  if (deps.length === 0) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, requiredProps] of deps) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          for (const reqProp of requiredProps) {
            const reqPropStr = escapeString(reqProp);
            const reqPathExpr =
              pathExpr === "''" ? `'${reqPropStr}'` : `${pathExpr} + '.${reqPropStr}'`;
            code.if(`!('${reqPropStr}' in ${dataVar})`, () => {
              genError(
                code,
                reqPathExpr,
                'dependentRequired',
                `Property required when ${propStr} is present`
              );
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
  ctx: CompileContext,
  evalTracker?: EvalTracker
): void {
  if (!schema.dependentSchemas) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          generateSchemaValidator(code, depSchema, dataVar, pathExpr, ctx, undefined, evalTracker);
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
  ctx: CompileContext,
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

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, dep] of nonTrivialDeps) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          if (Array.isArray(dep)) {
            // Array of required property names
            for (const reqProp of dep) {
              const reqPropStr = escapeString(reqProp);
              const reqPathExpr =
                pathExpr === "''" ? `'${reqPropStr}'` : `${pathExpr} + '.${reqPropStr}'`;
              code.if(`!('${reqPropStr}' in ${dataVar})`, () => {
                genError(
                  code,
                  reqPathExpr,
                  'dependencies',
                  `Property required when ${propStr} is present`
                );
              });
            }
          } else {
            // Schema that must validate
            generateSchemaValidator(
              code,
              dep as JsonSchema,
              dataVar,
              pathExpr,
              ctx,
              undefined,
              evalTracker
            );
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
  dynamicScopeVar: string = 'dynamicScope',
  evalTracker?: EvalTracker
): void {
  if (!schema.$ref) return;

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
    genError(code, pathExpr, '$ref', `Cannot resolve reference ${schema.$ref}`);
    return;
  }

  // Optimize: if ref points to a no-op schema (true or {}), skip entirely
  if (
    refSchema === true ||
    (typeof refSchema === 'object' && Object.keys(refSchema).length === 0)
  ) {
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
      const trackerArg = evalTracker ? `, ${evalTracker.trackerVar}` : '';
      code.block('', () => {
        const pushCount = resourceAnchors.length;
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName =
            ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
          code.line(
            `${dynamicScopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
          );
        }
        code.if(
          `!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar}${trackerArg})`,
          () => {
            // Pop before returning
            for (let i = 0; i < pushCount; i++) {
              code.line(`${dynamicScopeVar}.pop();`);
            }
            code.line('return false;');
          }
        );
        // Pop after successful validation
        for (let i = 0; i < pushCount; i++) {
          code.line(`${dynamicScopeVar}.pop();`);
        }
      });
      return;
    }
  }

  // No dynamic anchors to push - simple call
  // Pass tracker if we have one (for runtime-optional tracking)
  const trackerArg = evalTracker ? `, ${evalTracker.trackerVar}` : '';
  code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar}${trackerArg})`, () => {
    code.line('return false;');
  });
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
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  dynamicScopeVar?: string,
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
        pathExpr,
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
      code.line(`let ${resultVar} = false;`);

      // Use a temp tracker for each branch, merge into parent only if valid
      schema.anyOf.forEach((subSchema) => {
        const tempVar = evalTracker?.createTempTracker('anyOfTracker');
        const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx, tempVar);
        code.if(checkExpr, () => {
          code.line(`${resultVar} = true;`);
          evalTracker?.mergeFrom(tempVar);
        });
      });

      code.if(`!${resultVar}`, () => {
        genError(code, pathExpr, 'anyOf', 'Value must match at least one schema');
      });
    }
  }

  // oneOf - exactly one subschema must validate
  if (schema.oneOf && schema.oneOf.length > 0) {
    const countVar = code.genVar('oneOfCount');
    code.line(`let ${countVar} = 0;`);

    // Use a temp tracker for each branch, merge into parent only if valid
    schema.oneOf.forEach((subSchema) => {
      const tempVar = evalTracker?.createTempTracker('oneOfTracker');
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx, tempVar);
      code.if(checkExpr, () => {
        code.line(`${countVar}++;`);
        evalTracker?.mergeFrom(tempVar);
      });
      // Early exit if more than one matches (only when not tracking)
      if (!evalTracker?.enabled) {
        code.if(`${countVar} > 1`, () => {
          genError(code, pathExpr, 'oneOf', 'Value must match exactly one schema');
        });
      }
    });

    code.if(`${countVar} !== 1`, () => {
      genError(code, pathExpr, 'oneOf', 'Value must match exactly one schema');
    });
  }

  // not - subschema must NOT validate
  // Note: 'not' doesn't evaluate properties - it just checks they DON'T match
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

    // Skip if there's no then or else AND we're not tracking
    // (when tracking, we need to evaluate if's properties even without then/else)
    if (thenSchema === undefined && elseSchema === undefined && !evalTracker?.enabled) {
      return;
    }

    // Check if condition matches
    // Use temp tracker so we only merge if condition matches
    const condVar = code.genVar('ifCond');
    const tempVar = evalTracker?.createTempTracker('ifTracker');
    const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx, tempVar);
    code.line(`const ${condVar} = ${checkExpr};`);

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
          genError(code, pathExpr, 'then', 'Conditional validation failed');
        } else if (thenSchema !== true) {
          generateSchemaValidator(
            code,
            thenSchema,
            dataVar,
            pathExpr,
            ctx,
            dynamicScopeVar,
            evalTracker
          );
        }
      }
    });

    // When if doesn't match, apply else schema if present
    if (elseSchema !== undefined) {
      code.if(`!${condVar}`, () => {
        if (elseSchema === false) {
          genError(code, pathExpr, 'else', 'Conditional validation failed');
        } else if (elseSchema !== true) {
          generateSchemaValidator(
            code,
            elseSchema,
            dataVar,
            pathExpr,
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
  schema: JsonSchema,
  dataVar: string,
  ctx: CompileContext,
  trackerVar?: string
): string {
  // Handle no-op schemas (true, {}) - always pass
  if (schema === true) return 'true';
  if (typeof schema === 'object' && schema !== null && Object.keys(schema).length === 0) {
    return 'true';
  }
  // Handle always-fail schema
  if (schema === false) return 'false';

  // Compile as a separate function call
  const funcName = ctx.queueCompile(schema);
  const trackerArg = trackerVar ? `, ${trackerVar}` : '';
  if (ctx.options.legacyRef) {
    return `${funcName}(${dataVar}, null, ''${trackerArg})`;
  }
  return `${funcName}(${dataVar}, null, '', dynamicScope${trackerArg})`;
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
  ctx: CompileContext,
  evalTracker?: EvalTracker
): void {
  // Draft-07 compatibility: items can be an array (acts like prefixItems)
  const itemsIsArray = Array.isArray(schema.items);

  // Cross-draft compatibility: prefixItems was introduced in 2020-12
  // In 2019-09 and earlier, prefixItems is not a keyword and should be ignored
  const schemaDialect = schema.$schema;
  const supportsPrefixItems =
    !schemaDialect ||
    schemaDialect.includes('2020-12') ||
    schemaDialect.includes('2021') ||
    schemaDialect.includes('2022') ||
    schemaDialect.includes('2023') ||
    schemaDialect.includes('2024') ||
    schemaDialect.includes('2025');

  const tupleSchemas: JsonSchema[] = itemsIsArray
    ? (schema.items as JsonSchema[])
    : supportsPrefixItems && schema.prefixItems
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
    .filter(({ schema }) => !isNoOpSchema(schema));
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
      const itemPathExpr = pathExpr === "''" ? `'[${i}]'` : `${pathExpr} + '[${i}]'`;
      code.if(`${dataVar}.length > ${i}`, () => {
        const itemAccess = `${dataVar}[${i}]`;
        generateSchemaValidator(code, itemSchema, itemAccess, itemPathExpr, ctx);
      });
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
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    // Only check if data is an array
    code.if(`Array.isArray(${dataVar})`, genChecks);
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
  const escapedFormat = escapeString(format);

  // Check if schema already has type: 'string' (no need to re-check type)
  const hasStringType = schema.type === 'string';

  // For known formats, skip the existence check
  const isKnownFormat = KNOWN_FORMATS.has(format);

  const formatCheck = isKnownFormat
    ? `!formatValidators['${escapedFormat}'](${dataVar})`
    : `formatValidators['${escapedFormat}'] && !formatValidators['${escapedFormat}'](${dataVar})`;

  const genFormatCheck = () => {
    code.if(formatCheck, () => {
      genError(code, pathExpr, 'format', `Invalid ${format} format`);
    });
  };

  if (hasStringType) {
    // Type already checked, just do format check
    genFormatCheck();
  } else {
    // Only check if data is a string
    code.if(`typeof ${dataVar} === 'string'`, genFormatCheck);
  }
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
  dynamicScopeVar: string = 'dynamicScope',
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

    // If no dynamic scope var (legacy mode or empty), just call static validator
    if (!dynamicScopeVar) {
      code.if(`!${staticFuncName}(${dataVar}, errors, ${pathExpr}, [])`, () => {
        code.line('return false;');
      });
    } else if (!hasDynamicAnchor) {
      // No matching $dynamicAnchor - behave like a regular $ref
      code.if(`!${staticFuncName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
        code.line('return false;');
      });
    } else {
      // Has matching $dynamicAnchor - search dynamic scope at runtime
      // The dynamic scope is searched from the BEGINNING (outermost/first) to find the first match
      const trackerArg = evalTracker ? `, ${evalTracker.trackerVar}` : '';
      code.block('', () => {
        code.line(`let dynamicValidator = null;`);
        code.line(`for (let i = 0; i < ${dynamicScopeVar}.length; i++) {`);
        code.line(`  if (${dynamicScopeVar}[i].anchor === ${stringify(anchorName)}) {`);
        code.line(`    dynamicValidator = ${dynamicScopeVar}[i].validate;`);
        code.line(`    break;`);
        code.line(`  }`);
        code.line(`}`);
        // Use dynamic validator if found, otherwise use static fallback
        // Pass tracker so properties are marked at runtime
        code.line(`const validator = dynamicValidator || ${staticFuncName};`);
        code.if(
          `!validator(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar}${trackerArg})`,
          () => {
            code.line('return false;');
          }
        );
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
    const scopeArg = dynamicScopeVar || '[]';
    const trackerArg = evalTracker ? `, ${evalTracker.trackerVar}` : '';
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${scopeArg}${trackerArg})`, () => {
      code.line('return false;');
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
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  evalTracker?: EvalTracker
): void {
  if (schema.unevaluatedProperties === undefined) return;

  // If no tracker, we can't track evaluated properties - this shouldn't happen
  // since generateSchemaValidator creates one when unevaluatedProperties exists
  if (!evalTracker || !evalTracker.trackingProps) {
    return;
  }

  // Only check if data is an object
  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      // Check each property against the tracker
      code.forIn('key', dataVar, () => {
        const condition = evalTracker.isUnevaluatedProp('key');
        const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;

        code.if(condition, () => {
          if (schema.unevaluatedProperties === false) {
            genError(
              code,
              keyPathExpr,
              'unevaluatedProperties',
              'Unevaluated property not allowed'
            );
          } else if (schema.unevaluatedProperties === true) {
            // unevaluatedProperties: true - mark as evaluated (for bubbling to parent)
            evalTracker.markPropDynamic('key');
          } else if (schema.unevaluatedProperties !== undefined) {
            // unevaluatedProperties: <schema> - validate and mark as evaluated
            generateSchemaValidator(
              code,
              schema.unevaluatedProperties,
              `${dataVar}[key]`,
              keyPathExpr,
              ctx
            );
            evalTracker.markPropDynamic('key');
          }
        });
      });
    }
  );
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
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  evalTracker?: EvalTracker
): void {
  if (schema.unevaluatedItems === undefined) return;

  // If no tracker, we can't track evaluated items - this shouldn't happen
  // since generateSchemaValidator creates one when unevaluatedItems exists
  if (!evalTracker || !evalTracker.trackingItems) {
    return;
  }

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    // Check each item against the tracker
    const iVar = code.genVar('i');
    code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
      const condition = evalTracker.isUnevaluatedItem(iVar);
      const itemPathExpr =
        pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;

      code.if(condition, () => {
        if (schema.unevaluatedItems === false) {
          genError(code, itemPathExpr, 'unevaluatedItems', 'Unevaluated item not allowed');
        } else if (schema.unevaluatedItems === true) {
          // unevaluatedItems: true - mark as evaluated (for bubbling to parent)
          evalTracker.markItemsDynamic(iVar);
        } else {
          // unevaluatedItems: <schema> - validate and mark as evaluated
          generateSchemaValidator(
            code,
            schema.unevaluatedItems as JsonSchema,
            `${dataVar}[${iVar}]`,
            itemPathExpr,
            ctx
          );
          evalTracker.markItemsDynamic(iVar);
        }
      });
    });
  });
}
