/**
 * Property Tracker for unevaluatedProperties
 *
 * Tracks which properties have been evaluated during schema validation.
 * Uses a hybrid approach:
 * - Static tracking for compile-time known properties (from `properties`)
 * - Dynamic tracking for runtime-determined properties (from `anyOf`, `oneOf`, etc.)
 *
 * The tracker generates minimal code - it only emits tracking code when
 * unevaluatedProperties is actually present in the schema tree.
 *
 * Supports nested scopes via push/pop for schemas with their own unevaluatedProperties.
 * Each scope has isolated tracking that doesn't pollute sibling scopes.
 */

import { Code, Name, _, stringify } from './codegen.js';
import type { CodeBuilder } from './codegen.js';

/**
 * Represents the state of evaluated properties.
 * - undefined: nothing tracked yet
 * - Set<string>: specific property names known at compile time
 * - true: all properties are evaluated (short-circuit)
 */
export type PropsState = Set<string> | true | undefined;

/**
 * Saved state for a tracking scope.
 */
interface ScopeState {
  staticProps: PropsState;
  patterns: string[];
  dynamicVar: Name | undefined;
  needsDynamic: boolean;
  branchStack: BranchState[];
}

/**
 * Branch state for tracking properties during branch execution.
 * Uses static collection by default, falls back to dynamic when needed.
 */
export interface BranchState {
  /** Static properties collected during branch execution (compile-time) */
  staticProps: Set<string>;
  /** Runtime variable for dynamic tracking (created on demand) */
  dynamicVar: Name | undefined;
  /** Whether this branch needs dynamic tracking */
  needsDynamic: boolean;
}

/**
 * Check if a schema has restrictive unevaluatedProperties (false or a schema).
 * unevaluatedProperties: true doesn't need isolation since it just accepts all.
 */
export function hasRestrictiveUnevaluatedProperties(schema: unknown): boolean {
  if (typeof schema !== 'object' || schema === null) return false;
  const unevalProps = (schema as Record<string, unknown>).unevaluatedProperties;
  // Only isolate if unevaluatedProperties is false or a schema (not true)
  return unevalProps !== undefined && unevalProps !== true;
}

/**
 * Check if a schema tree contains any restrictive unevaluatedProperties.
 * Used to determine if property tracking should be activated from the start.
 */
export function containsUnevaluatedProperties(
  schema: unknown,
  visited = new Set<unknown>()
): boolean {
  if (typeof schema !== 'object' || schema === null) return false;
  if (visited.has(schema)) return false; // Avoid cycles
  visited.add(schema);

  const s = schema as Record<string, unknown>;

  // Check current schema
  if (hasRestrictiveUnevaluatedProperties(schema)) return true;

  // Check nested schemas in composition keywords
  const checkArray = (arr: unknown) => {
    if (Array.isArray(arr)) {
      return arr.some((item) => containsUnevaluatedProperties(item, visited));
    }
    return false;
  };

  if (checkArray(s.allOf)) return true;
  if (checkArray(s.anyOf)) return true;
  if (checkArray(s.oneOf)) return true;
  if (containsUnevaluatedProperties(s.not, visited)) return true;
  if (containsUnevaluatedProperties(s.if, visited)) return true;
  if (containsUnevaluatedProperties(s.then, visited)) return true;
  if (containsUnevaluatedProperties(s.else, visited)) return true;

  // Check $ref and $dynamicRef targets would require resolving refs, skip for now
  // The lazy activation in generateSchemaValidator handles those cases

  // Check property schemas
  if (s.properties && typeof s.properties === 'object') {
    for (const prop of Object.values(s.properties)) {
      if (containsUnevaluatedProperties(prop, visited)) return true;
    }
  }
  if (s.patternProperties && typeof s.patternProperties === 'object') {
    for (const prop of Object.values(s.patternProperties)) {
      if (containsUnevaluatedProperties(prop, visited)) return true;
    }
  }
  if (containsUnevaluatedProperties(s.additionalProperties, visited)) return true;

  // Check item schemas
  if (containsUnevaluatedProperties(s.items, visited)) return true;
  if (checkArray(s.prefixItems)) return true;
  if (containsUnevaluatedProperties(s.contains, visited)) return true;
  if (containsUnevaluatedProperties(s.additionalItems, visited)) return true;

  // Check dependent schemas
  if (s.dependentSchemas && typeof s.dependentSchemas === 'object') {
    for (const dep of Object.values(s.dependentSchemas)) {
      if (containsUnevaluatedProperties(dep, visited)) return true;
    }
  }

  // Check definitions
  if (s.$defs && typeof s.$defs === 'object') {
    for (const def of Object.values(s.$defs)) {
      if (containsUnevaluatedProperties(def, visited)) return true;
    }
  }
  if (s.definitions && typeof s.definitions === 'object') {
    for (const def of Object.values(s.definitions)) {
      if (containsUnevaluatedProperties(def, visited)) return true;
    }
  }

  return false;
}

/**
 * Property tracker for unevaluatedProperties support.
 * Manages tracking of evaluated properties across schema validation.
 */
export class PropsTracker {
  readonly #code: CodeBuilder;
  #active: boolean;

  /** Static properties known at compile time */
  #staticProps: PropsState = undefined;

  /** Pattern regexes that mark properties as evaluated */
  #patterns: string[] = [];

  /** Runtime tracking variable (created on demand) */
  #dynamicVar: Name | undefined;

  /** Whether we need dynamic (runtime) tracking */
  #needsDynamic = false;

  /**
   * Stack of branch contexts.
   * When non-empty, addProperties() collects to the top branch instead of static props.
   */
  #branchStack: BranchState[] = [];

  /**
   * Stack of saved scope states for nested unevaluatedProperties.
   */
  #scopeStack: ScopeState[] = [];

  constructor(code: CodeBuilder, active = false) {
    this.#code = code;
    this.#active = active;
  }

  /**
   * Check if tracking is active
   */
  get active(): boolean {
    return this.#active;
  }

  set active(value: boolean) {
    if (value) {
      this.#active = true;
    }
  }

  /**
   * Check if all properties are marked as evaluated
   */
  get allEvaluated(): boolean {
    return this.#staticProps === true;
  }

  /**
   * Check if we're inside a branch context
   */
  get inBranch(): boolean {
    return this.#branchStack.length > 0;
  }

  activate(): void {
    this.#active = true;
  }

  /**
   * Mark specific property names as evaluated (from `properties` keyword)
   * When inside a branch context, collects to the branch's static props.
   */
  addProperties(names: string[]): void {
    if (!this.#active || this.#staticProps === true) return;

    // If inside a branch, collect to branch's static props
    if (this.#branchStack.length > 0) {
      const branch = this.#branchStack[this.#branchStack.length - 1];
      for (const name of names) {
        branch.staticProps.add(name);
      }
      return;
    }

    // Static tracking - add to the Set
    if (this.#staticProps === undefined) {
      this.#staticProps = new Set(names);
    } else {
      for (const name of names) {
        this.#staticProps.add(name);
      }
    }
  }

  /**
   * Enter a branch context (anyOf/oneOf/if-then-else).
   * Creates a branch state for collecting properties.
   * Returns the branch state for later merging.
   */
  enterBranch(): BranchState {
    const branch: BranchState = {
      staticProps: new Set(),
      dynamicVar: undefined,
      needsDynamic: false,
    };
    if (!this.#active || this.#staticProps === true) {
      // Return empty branch - methods will handle inactive state
      return branch;
    }
    this.#branchStack.push(branch);
    return branch;
  }

  /**
   * Exit the current branch context.
   */
  exitBranch(): void {
    if (this.#branchStack.length > 0) {
      this.#branchStack.pop();
    }
  }

  /**
   * Mark pattern properties as evaluated (from `patternProperties` keyword)
   * These require runtime checking.
   */
  addPatterns(patterns: string[]): void {
    if (!this.#active || this.#staticProps === true) return;
    this.#patterns.push(...patterns);
    this.#needsDynamic = true;
  }

  /**
   * Mark all properties as evaluated (from `additionalProperties` or nested `unevaluatedProperties`)
   */
  markAllEvaluated(): void {
    if (!this.#active) return;
    this.#staticProps = true;
    this.#needsDynamic = false;
    this.#patterns = [];
  }

  /**
   * Enable dynamic tracking mode.
   * Called when entering anyOf, oneOf, if/then/else where properties
   * depend on which branch validates.
   */
  enableDynamic(): void {
    if (!this.#active || this.#staticProps === true) return;
    this.#needsDynamic = true;
  }

  /**
   * Get or create the dynamic tracking variable.
   * Returns a variable that holds: { [key: string]: true }
   */
  getDynamicVar(): Name {
    if (!this.#active) {
      return new Name('__noop__');
    }

    if (this.#dynamicVar) return this.#dynamicVar;

    this.#needsDynamic = true;
    this.#dynamicVar = this.#code.genVar('props');
    this.#code.line(_`const ${this.#dynamicVar} = {};`);

    // Initialize with static properties
    if (this.#staticProps instanceof Set) {
      for (const prop of this.#staticProps) {
        this.#code.line(_`${this.#dynamicVar}[${stringify(prop)}] = true;`);
      }
    }

    return this.#dynamicVar;
  }

  /**
   * Generate code to mark a property as evaluated at runtime.
   * Used when iterating over object keys.
   */
  markPropertyEvaluated(keyVar: Name): void {
    if (!this.#active || this.#staticProps === true) return;
    const v = this.getDynamicVar();
    this.#code.line(_`${v}[${keyVar}] = true;`);
  }

  /**
   * Emit runtime code to add static properties to the dynamic var.
   * Use when properties need to be conditionally added at runtime.
   */
  emitAddProperties(names: string[]): void {
    if (!this.#active || this.#staticProps === true || names.length === 0) return;
    const v = this.getDynamicVar();
    for (const name of names) {
      this.#code.line(_`${v}[${stringify(name)}] = true;`);
    }
  }

  /**
   * Generate the unevaluated property check.
   * Returns a Code expression that evaluates to true if the key is unevaluated.
   */
  isUnevaluated(keyVar: Name, patternRegexVars: Name[] = [], ctx?: any): Code {
    if (!this.#active) return _`true`;
    if (this.#staticProps === true) return _`false`;

    const conditions: Code[] = [];

    // Check static properties
    // Optimization: Use Set lookup for > 3 properties (O(1) vs O(n) string comparisons)
    if (this.#staticProps instanceof Set && this.#staticProps.size > 0) {
      if (this.#staticProps.size > 3 && ctx) {
        // Use Set for efficient lookup
        const setName = new Name(ctx.genRuntimeName('evalPropsSet'));
        ctx.addRuntimeFunction(setName.str, this.#staticProps);
        conditions.push(_`!${setName}.has(${keyVar})`);
      } else {
        // Use inline comparisons for small sets
        for (const prop of this.#staticProps) {
          conditions.push(_`${keyVar} !== ${stringify(prop)}`);
        }
      }
    }

    // Check pattern properties
    for (const regex of patternRegexVars) {
      conditions.push(_`!${regex}.test(${keyVar})`);
    }

    // Check dynamic tracking variable
    if (this.#needsDynamic && this.#dynamicVar) {
      conditions.push(_`!${this.#dynamicVar}[${keyVar}]`);
    }

    // Check current branch's properties (if inside a branch context)
    if (this.#branchStack.length > 0) {
      const branch = this.#branchStack[this.#branchStack.length - 1];
      // Check branch's static props
      // Optimization: Use Set lookup for > 3 properties
      if (branch.staticProps.size > 3 && ctx) {
        const setName = new Name(ctx.genRuntimeName('evalPropsSet'));
        ctx.addRuntimeFunction(setName.str, branch.staticProps);
        conditions.push(_`!${setName}.has(${keyVar})`);
      } else {
        for (const prop of branch.staticProps) {
          conditions.push(_`${keyVar} !== ${stringify(prop)}`);
        }
      }
      // Check branch's dynamic var if it exists
      if (branch.dynamicVar) {
        conditions.push(_`!${branch.dynamicVar}[${keyVar}]`);
      }
    }

    if (conditions.length === 0) {
      return _`true`;
    }

    // Combine with AND
    return conditions.reduce((acc, cond) => _`${acc} && ${cond}`);
  }

  /**
   * Get the static properties (for compile-time optimization)
   */
  getStaticProps(): Set<string> | undefined {
    if (this.#staticProps instanceof Set) {
      return this.#staticProps;
    }
    return undefined;
  }

  /**
   * Get the pattern regexes
   */
  getPatterns(): string[] {
    return this.#patterns;
  }

  /**
   * Check if dynamic tracking is needed
   */
  get needsDynamic(): boolean {
    return this.#needsDynamic;
  }

  // ==================== Scope Management ====================

  /**
   * Push a new isolated scope for nested unevaluatedProperties.
   * The new scope starts fresh and doesn't see parent's tracked properties.
   * Call popScope() when done to restore parent state.
   */
  pushScope(): void {
    if (!this.#active) return;

    // Save current state
    this.#scopeStack.push({
      staticProps: this.#staticProps,
      patterns: [...this.#patterns],
      dynamicVar: this.#dynamicVar,
      needsDynamic: this.#needsDynamic,
      branchStack: [...this.#branchStack],
    });

    // Reset to fresh state for new scope
    this.#staticProps = undefined;
    this.#patterns = [];
    this.#dynamicVar = undefined;
    this.#needsDynamic = false;
    this.#branchStack = [];
  }

  /**
   * Pop the current scope and restore parent state.
   * Optionally merges the popped scope's tracked properties into the parent.
   */
  popScope(mergeToParent = false): void {
    if (!this.#active || this.#scopeStack.length === 0) return;

    const childDynamicVar = this.#dynamicVar;
    const parentState = this.#scopeStack.pop()!;

    // Restore parent state
    this.#staticProps = parentState.staticProps;
    this.#patterns = parentState.patterns;
    this.#dynamicVar = parentState.dynamicVar;
    this.#needsDynamic = parentState.needsDynamic;
    this.#branchStack = parentState.branchStack;

    // Optionally merge child's tracked properties into parent
    if (mergeToParent && childDynamicVar) {
      const parentVar = this.getDynamicVar();
      this.#code.line(_`Object.assign(${parentVar}, ${childDynamicVar});`);
    }
  }

  /**
   * Execute a callback within an isolated scope.
   * Use for schemas that have their own unevaluatedProperties.
   */
  withScope<T>(fn: () => T, mergeToParent = false): T {
    this.pushScope();
    const result = fn();
    this.popScope(mergeToParent);
    return result;
  }

  /**
   * Merge a branch back into main tracker.
   * Called when a branch validates successfully.
   * Emits property additions directly - no intermediate objects needed.
   */
  mergeBranch(branch: BranchState, validVar: Name): void {
    if (!this.#active || this.#staticProps === true) return;

    // Check if branch has anything to merge
    const hasStaticProps = branch.staticProps.size > 0;
    const hasDynamicVar = branch.dynamicVar !== undefined;

    if (!hasStaticProps && !hasDynamicVar) return;

    // Get or create main dynamic var
    const mainVar = this.getDynamicVar();

    this.#code.if(validVar, () => {
      // Emit static property additions directly
      for (const prop of branch.staticProps) {
        this.#code.line(_`${mainVar}[${stringify(prop)}] = true;`);
      }
      // If branch has dynamic var, merge it
      if (hasDynamicVar) {
        this.#code.line(_`Object.assign(${mainVar}, ${branch.dynamicVar});`);
      }
    });
  }
}
