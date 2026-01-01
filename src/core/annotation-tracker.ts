/**
 * Unified Annotation Tracker
 *
 * Coordinates PropsTracker and ItemsTracker to reduce boilerplate in compiler.ts.
 * Provides high-level methods for common tracking patterns.
 */

import type { JsonSchema } from '../types.js';
import type { Name } from './codegen.js';
import { PropsTracker, hasRestrictiveUnevaluatedProperties } from './props-tracker.js';
import type { BranchState as PropsBranchState } from './props-tracker.js';
import { ItemsTracker, hasRestrictiveUnevaluatedItems } from './items-tracker.js';
import type { ItemsBranchState } from './items-tracker.js';

/**
 * Combined branch state for both props and items tracking.
 */
export interface BranchHandle {
  props: PropsBranchState;
  items: ItemsBranchState;
  propsIsolate: boolean;
  itemsIsolate: boolean;
}

/**
 * Unified tracker that coordinates property and item annotation tracking.
 */
export class AnnotationTracker {
  readonly #props: PropsTracker;
  readonly #items: ItemsTracker;

  constructor(props: PropsTracker, items: ItemsTracker) {
    this.#props = props;
    this.#items = items;
  }

  /** Access the underlying PropsTracker */
  get props(): PropsTracker {
    return this.#props;
  }

  /** Access the underlying ItemsTracker */
  get items(): ItemsTracker {
    return this.#items;
  }

  /** Check if either tracker is active */
  get active(): boolean {
    return this.#props.active || this.#items.active;
  }

  /**
   * Ensure dynamic vars are created before branching.
   * Call this before entering branches in anyOf/oneOf.
   */
  ensureDynamicVars(): void {
    if (this.#props.active) {
      this.#props.getDynamicVar();
    }
    if (this.#items.active) {
      this.#items.getDynamicVar();
    }
  }

  /**
   * Enter a branch with optional schema-based isolation.
   * Use for anyOf/oneOf where subschemas may have their own unevaluatedProperties/Items.
   *
   * @param schema - The subschema to check for isolation needs (optional)
   * @returns BranchHandle to pass to exitBranch and mergeBranch
   */
  enterBranch(schema?: JsonSchema): BranchHandle {
    const propsIsolate = schema ? hasRestrictiveUnevaluatedProperties(schema) : false;
    const itemsIsolate = schema ? hasRestrictiveUnevaluatedItems(schema) : false;

    const props = this.#props.enterBranch();
    const items = this.#items.enterBranch();

    if (propsIsolate) this.#props.pushScope();
    if (itemsIsolate) this.#items.pushScope();

    return { props, items, propsIsolate, itemsIsolate };
  }

  /**
   * Exit a branch context.
   * Must be called after the branch code is generated, before mergeBranch.
   */
  exitBranch(handle: BranchHandle): void {
    if (handle.propsIsolate) this.#props.popScope(false);
    if (handle.itemsIsolate) this.#items.popScope(false);
    this.#props.exitBranch();
    this.#items.exitBranch();
  }

  /**
   * Merge a branch's annotations based on a condition variable.
   * Call after exitBranch.
   */
  mergeBranch(handle: BranchHandle, validVar: Name): void {
    this.#props.mergeBranch(handle.props, validVar);
    this.#items.mergeBranch(handle.items, validVar);
  }

  /**
   * Combined exit and merge for convenience.
   * Use when you have the validVar ready immediately after generating the check.
   */
  exitAndMergeBranch(handle: BranchHandle, validVar: Name): void {
    this.exitBranch(handle);
    this.mergeBranch(handle, validVar);
  }

  /**
   * Execute code within an isolated scope that discards annotations.
   * Use for 'not' keyword where annotations should not propagate.
   */
  withDiscardedScope<T>(fn: () => T): T {
    this.#props.pushScope();
    this.#items.pushScope();
    const result = fn();
    this.#props.popScope(false);
    this.#items.popScope(false);
    return result;
  }

  /**
   * Execute code with conditional scope isolation based on schema.
   * Use for $ref inlining where the ref target may have unevaluatedProperties/Items.
   */
  withConditionalScope<T>(schema: JsonSchema, fn: () => T): T {
    const propsIsolate = hasRestrictiveUnevaluatedProperties(schema);
    const itemsIsolate = hasRestrictiveUnevaluatedItems(schema);

    if (propsIsolate) this.#props.pushScope();
    if (itemsIsolate) this.#items.pushScope();

    const result = fn();

    if (propsIsolate) this.#props.popScope(false);
    if (itemsIsolate) this.#items.popScope(false);

    return result;
  }

  /**
   * Execute code with items-only scope isolation.
   * Use for array item validation where nested arrays are different instances.
   */
  withItemsScope<T>(fn: () => T): T {
    this.#items.pushScope();
    const result = fn();
    this.#items.popScope(false);
    return result;
  }
}
