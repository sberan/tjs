/**
 * EvalTracker - Runtime tracking for evaluated properties/items
 *
 * Used by unevaluatedProperties and unevaluatedItems keywords to track
 * which properties/items have been evaluated by other schema keywords.
 */

import { CodeBuilder, escapeString } from './codegen.js';

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
export class EvalTracker {
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
   *
   * This copies from THIS tracker to the PARENT tracker (vertical, child → parent).
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
   * Merge a temp tracker into this tracker.
   * Used for conditional branches (anyOf/oneOf/if-then-else).
   *
   * This copies from a TEMP tracker variable to THIS tracker (horizontal, sibling → current).
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
