/**
 * Items Tracker for unevaluatedItems support
 *
 * Tracks which array items have been evaluated during schema validation.
 * Uses a hybrid approach:
 * - Static tracking for compile-time known items (from `prefixItems`, `items`)
 * - Dynamic tracking for runtime-determined items (from `contains`)
 *
 * The tracker generates minimal code - it only emits tracking code when
 * unevaluatedItems is actually present in the schema tree.
 *
 * Supports nested scopes via push/pop for schemas with their own unevaluatedItems.
 * Each scope has isolated tracking that doesn't pollute sibling scopes.
 */

import { Code, Name, _ } from './codegen.js';
import type { CodeBuilder } from './codegen.js';

/**
 * Represents the state of evaluated items.
 * - undefined: nothing tracked yet
 * - number: items 0..n-1 are evaluated (from prefixItems)
 * - true: all items are evaluated (from items keyword)
 */
export type ItemsState = number | true | undefined;

/**
 * Saved state for a tracking scope.
 */
interface ScopeState {
  staticItems: ItemsState;
  dynamicVar: Name | undefined;
  needsDynamic: boolean;
  branchStack: ItemsBranchState[];
}

/**
 * Branch state for tracking items during branch execution.
 */
interface ItemsBranchState {
  /** Static item count collected during branch execution (highest prefixItems index + 1) */
  staticItemCount: number;
  /** Whether all items are evaluated in this branch */
  allItemsEvaluated: boolean;
  /** Runtime variable for dynamic tracking of contains indices (created on demand) */
  dynamicVar: Name | undefined;
  /** Whether this branch needs dynamic tracking */
  needsDynamic: boolean;
}

/**
 * Check if a schema has restrictive unevaluatedItems (false or a schema).
 * unevaluatedItems: true doesn't need isolation since it just accepts all.
 */
export function hasRestrictiveUnevaluatedItems(schema: unknown): boolean {
  if (typeof schema !== 'object' || schema === null) return false;
  const unevalItems = (schema as Record<string, unknown>).unevaluatedItems;
  // Only isolate if unevaluatedItems is false or a schema (not true)
  return unevalItems !== undefined && unevalItems !== true;
}

/**
 * Check if a schema tree contains any restrictive unevaluatedItems.
 * Used to determine if item tracking should be activated from the start.
 */
export function containsUnevaluatedItems(schema: unknown, visited = new Set<unknown>()): boolean {
  if (typeof schema !== 'object' || schema === null) return false;
  if (visited.has(schema)) return false; // Avoid cycles
  visited.add(schema);

  const s = schema as Record<string, unknown>;

  // Check current schema
  if (hasRestrictiveUnevaluatedItems(schema)) return true;

  // Check nested schemas in composition keywords
  const checkArray = (arr: unknown) => {
    if (Array.isArray(arr)) {
      return arr.some((item) => containsUnevaluatedItems(item, visited));
    }
    return false;
  };

  if (checkArray(s.allOf)) return true;
  if (checkArray(s.anyOf)) return true;
  if (checkArray(s.oneOf)) return true;
  if (containsUnevaluatedItems(s.not, visited)) return true;
  if (containsUnevaluatedItems(s.if, visited)) return true;
  if (containsUnevaluatedItems(s.then, visited)) return true;
  if (containsUnevaluatedItems(s.else, visited)) return true;

  // Check property schemas
  if (s.properties && typeof s.properties === 'object') {
    for (const prop of Object.values(s.properties)) {
      if (containsUnevaluatedItems(prop, visited)) return true;
    }
  }
  if (s.patternProperties && typeof s.patternProperties === 'object') {
    for (const prop of Object.values(s.patternProperties)) {
      if (containsUnevaluatedItems(prop, visited)) return true;
    }
  }
  if (containsUnevaluatedItems(s.additionalProperties, visited)) return true;

  // Check item schemas
  if (containsUnevaluatedItems(s.items, visited)) return true;
  if (checkArray(s.prefixItems)) return true;
  if (containsUnevaluatedItems(s.contains, visited)) return true;
  if (containsUnevaluatedItems(s.additionalItems, visited)) return true;

  // Check dependent schemas
  if (s.dependentSchemas && typeof s.dependentSchemas === 'object') {
    for (const dep of Object.values(s.dependentSchemas)) {
      if (containsUnevaluatedItems(dep, visited)) return true;
    }
  }

  // Check definitions
  if (s.$defs && typeof s.$defs === 'object') {
    for (const def of Object.values(s.$defs)) {
      if (containsUnevaluatedItems(def, visited)) return true;
    }
  }
  if (s.definitions && typeof s.definitions === 'object') {
    for (const def of Object.values(s.definitions)) {
      if (containsUnevaluatedItems(def, visited)) return true;
    }
  }

  return false;
}

/**
 * Items tracker for unevaluatedItems support.
 * Manages tracking of evaluated array items across schema validation.
 */
export class ItemsTracker {
  readonly #code: CodeBuilder;
  #active: boolean;

  /** Static items: number means items 0..n-1 are evaluated, true means all items evaluated */
  #staticItems: ItemsState = undefined;

  /** Runtime tracking variable (holds Set of evaluated indices from contains) */
  #dynamicVar: Name | undefined;

  /** Whether we need dynamic item tracking (for contains) */
  #needsDynamic = false;

  /** Stack of branch contexts */
  #branchStack: ItemsBranchState[] = [];

  /** Stack of saved scope states for nested unevaluatedItems */
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

  /**
   * Activate tracking
   */
  activate(): void {
    this.#active = true;
  }

  /**
   * Check if all items are marked as evaluated
   */
  get allItemsEvaluated(): boolean {
    return this.#staticItems === true;
  }

  /**
   * Check if we're inside a branch context
   */
  get inBranch(): boolean {
    return this.#branchStack.length > 0;
  }

  /**
   * Get the static item count (highest evaluated index + 1)
   */
  getStaticItemCount(): number {
    if (typeof this.#staticItems === 'number') {
      return this.#staticItems;
    }
    return 0;
  }

  /**
   * Mark items 0..count-1 as evaluated (from prefixItems).
   * Takes the maximum of the current count and the new count.
   */
  addPrefixItems(count: number): void {
    if (!this.#active || this.#staticItems === true) return;

    // If inside a branch, collect to branch's static count
    if (this.#branchStack.length > 0) {
      const branch = this.#branchStack[this.#branchStack.length - 1];
      branch.staticItemCount = Math.max(branch.staticItemCount, count);
      return;
    }

    // Static tracking - take max
    if (this.#staticItems === undefined) {
      this.#staticItems = count;
    } else {
      this.#staticItems = Math.max(this.#staticItems, count);
    }
  }

  /**
   * Mark all items as evaluated (from `items` keyword).
   */
  markAllItemsEvaluated(): void {
    if (!this.#active) return;

    // If inside a branch, mark the branch
    if (this.#branchStack.length > 0) {
      const branch = this.#branchStack[this.#branchStack.length - 1];
      branch.allItemsEvaluated = true;
      return;
    }

    this.#staticItems = true;
    this.#needsDynamic = false;
  }

  /**
   * Enable dynamic tracking mode.
   * Called when contains is used, since matched indices are determined at runtime.
   */
  enableDynamic(): void {
    if (!this.#active || this.#staticItems === true) return;
    this.#needsDynamic = true;
  }

  /**
   * Get or create the dynamic tracking variable.
   * Returns a variable that holds a Set of evaluated indices.
   */
  getDynamicVar(): Name {
    if (!this.#active) {
      return new Name('__noop__');
    }

    if (this.#dynamicVar) return this.#dynamicVar;

    this.#needsDynamic = true;
    this.#dynamicVar = this.#code.genVar('evalItems');
    this.#code.line(_`const ${this.#dynamicVar} = new Set();`);

    return this.#dynamicVar;
  }

  /**
   * Generate code to mark an item index as evaluated at runtime.
   * Used by contains to track which indices matched.
   */
  markItemEvaluated(indexVar: Name): void {
    if (!this.#active || this.#staticItems === true) return;
    const v = this.getDynamicVar();
    this.#code.line(_`${v}.add(${indexVar});`);
  }

  /**
   * Enter a branch context (anyOf/oneOf/if-then-else).
   * Creates a branch state for collecting items.
   * Returns the branch state for later merging.
   */
  enterBranch(): ItemsBranchState {
    const branch: ItemsBranchState = {
      staticItemCount: 0,
      allItemsEvaluated: false,
      dynamicVar: undefined,
      needsDynamic: false,
    };
    if (!this.#active || this.#staticItems === true) {
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
   * Merge a branch back into main tracker.
   */
  mergeBranch(branch: ItemsBranchState, validVar: Name): void {
    if (!this.#active || this.#staticItems === true) return;

    const hasStaticItems = branch.staticItemCount > 0;
    const hasAllItems = branch.allItemsEvaluated;
    const hasDynamicVar = branch.dynamicVar !== undefined;

    if (!hasStaticItems && !hasAllItems && !hasDynamicVar) return;

    // Get or create main dynamic var
    const mainVar = this.getDynamicVar();

    this.#code.if(validVar, () => {
      // Emit static item additions
      if (hasStaticItems) {
        const iVar = this.#code.genVar('i');
        this.#code.for(
          _`let ${iVar} = 0`,
          _`${iVar} < ${branch.staticItemCount}`,
          _`${iVar}++`,
          () => {
            this.#code.line(_`${mainVar}.add(${iVar});`);
          }
        );
      }
      // If branch marked all items as evaluated, set a special property on the Set
      // to indicate all items are evaluated (can't enumerate them at compile time)
      if (hasAllItems) {
        this.#code.line(_`${mainVar}.allItemsEvaluated = true;`);
      }
      if (hasDynamicVar) {
        this.#code.line(_`${branch.dynamicVar}.forEach(function(i) { ${mainVar}.add(i); });`);
      }
    });
  }

  /**
   * Generate the unevaluated item check.
   * Returns a Code expression that evaluates to true if the index is unevaluated.
   */
  isItemUnevaluated(indexVar: Name): Code {
    if (!this.#active) return _`true`;
    if (this.#staticItems === true) return _`false`;

    const conditions: Code[] = [];

    // Check static item count (index must be >= staticItems)
    if (typeof this.#staticItems === 'number' && this.#staticItems > 0) {
      conditions.push(_`${indexVar} >= ${this.#staticItems}`);
    }

    // Check dynamic tracking variable (Set of evaluated indices)
    // Also check the special allItemsEvaluated property
    if (this.#needsDynamic && this.#dynamicVar) {
      conditions.push(_`!${this.#dynamicVar}.allItemsEvaluated`);
      conditions.push(_`!${this.#dynamicVar}.has(${indexVar})`);
    }

    // Check current branch's items (if inside a branch context)
    if (this.#branchStack.length > 0) {
      const branch = this.#branchStack[this.#branchStack.length - 1];
      if (branch.allItemsEvaluated) {
        return _`false`;
      }
      if (branch.staticItemCount > 0) {
        conditions.push(_`${indexVar} >= ${branch.staticItemCount}`);
      }
      if (branch.dynamicVar) {
        conditions.push(_`!${branch.dynamicVar}.has(${indexVar})`);
      }
    }

    if (conditions.length === 0) {
      return _`true`;
    }

    // Combine with AND
    return conditions.reduce((acc, cond) => _`${acc} && ${cond}`);
  }

  /**
   * Check if dynamic tracking is needed
   */
  get needsDynamic(): boolean {
    return this.#needsDynamic;
  }

  // ==================== Scope Management ====================

  /**
   * Push a new isolated scope for nested unevaluatedItems.
   * The new scope starts fresh and doesn't see parent's tracked items.
   * Call popScope() when done to restore parent state.
   */
  pushScope(): void {
    if (!this.#active) return;

    // Save current state
    this.#scopeStack.push({
      staticItems: this.#staticItems,
      dynamicVar: this.#dynamicVar,
      needsDynamic: this.#needsDynamic,
      branchStack: [...this.#branchStack],
    });

    // Reset to fresh state for new scope
    this.#staticItems = undefined;
    this.#dynamicVar = undefined;
    this.#needsDynamic = false;
    this.#branchStack = [];
  }

  /**
   * Pop the current scope and restore parent state.
   * Optionally merges the popped scope's tracked items into the parent.
   */
  popScope(mergeToParent = false): void {
    if (!this.#active || this.#scopeStack.length === 0) return;

    const childDynamicVar = this.#dynamicVar;
    const parentState = this.#scopeStack.pop()!;

    // Restore parent state
    this.#staticItems = parentState.staticItems;
    this.#dynamicVar = parentState.dynamicVar;
    this.#needsDynamic = parentState.needsDynamic;
    this.#branchStack = parentState.branchStack;

    // Optionally merge child's tracked items into parent
    if (mergeToParent && childDynamicVar) {
      const parentVar = this.getDynamicVar();
      this.#code.line(_`${childDynamicVar}.forEach(function(i) { ${parentVar}.add(i); });`);
    }
  }

  /**
   * Execute a callback within an isolated scope.
   * Use for schemas that have their own unevaluatedItems.
   */
  withScope<T>(fn: () => T, mergeToParent = false): T {
    this.pushScope();
    const result = fn();
    this.popScope(mergeToParent);
    return result;
  }

  /**
   * Execute a callback within a branch context.
   * Returns the branch state for merging after the callback completes.
   *
   * @param fn - The callback to execute
   * @param isolate - If true, push a new scope so the branch has isolated tracking
   */
  withBranch<T>(fn: () => T, isolate = false): { result: T; branch: ItemsBranchState } {
    if (isolate) {
      this.#active = true;
      this.pushScope();
    }
    const branch = this.enterBranch();
    const result = fn();
    this.exitBranch();
    if (isolate) {
      this.popScope(false);
    }
    return { result, branch };
  }
}
