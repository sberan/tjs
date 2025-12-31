/**
 * EvalTracker - Runtime tracking for evaluated properties/items
 *
 * Used by unevaluatedProperties and unevaluatedItems keywords to track
 * which properties/items have been evaluated by other schema keywords.
 */

import { CodeBuilder, Name, Code, _, escapeString } from './codegen.js';

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
  /** Variable name for the runtime tracker */
  readonly trackerVar: Name;
  /** Whether we're tracking properties */
  readonly trackProps: boolean;
  /** Whether we're tracking items */
  readonly trackItems: boolean;
  /** Pattern regex variable names registered for this tracker */
  readonly patternVars: Name[] = [];
  /** Parent tracker (for bubbling up) */
  readonly parentTracker?: EvalTracker;
  /** If true, tracker may be undefined at runtime - generate conditional checks */
  readonly isRuntimeOptional: boolean;
  /** If true, use Set-based item tracking (for contains) instead of just maxItem */
  readonly useItemSet: boolean;
  /** If true, this tracker expects patterns and should include pattern checks */
  readonly hasPatterns: boolean;
  /** Track the maximum item index marked at compile time for optimization */
  private compileTimeMaxItem: number = -1;

  private readonly code: CodeBuilder;

  constructor(
    code: CodeBuilder,
    trackerVar: Name | string,
    options: {
      trackProps?: boolean;
      trackItems?: boolean;
      parentTracker?: EvalTracker;
      isRuntimeOptional?: boolean;
      useItemSet?: boolean;
      hasPatterns?: boolean;
    } = {}
  ) {
    this.code = code;
    this.trackerVar = typeof trackerVar === 'string' ? new Name(trackerVar) : trackerVar;
    this.trackProps = options.trackProps ?? false;
    this.trackItems = options.trackItems ?? false;
    this.parentTracker = options.parentTracker;
    this.isRuntimeOptional = options.isRuntimeOptional ?? false;
    this.useItemSet = options.useItemSet ?? false;
    this.hasPatterns = options.hasPatterns ?? true; // default to true for backwards compatibility
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
      parts.push('props: {}');
      // Only include patterns array if needed
      if (this.hasPatterns) {
        parts.push('patterns: []');
      }
    }
    if (this.trackItems) {
      parts.push('maxItem: -1');
      if (this.useItemSet) {
        parts.push('items: new Set()');
      }
    }
    if (parts.length > 0) {
      this.code.line(_`const ${this.trackerVar} = { ${new Code(parts.join(', '))} };`);
    }
  }

  /** Mark a static property name as evaluated */
  markProp(propName: string): void {
    if (this.trackProps) {
      const escaped = escapeString(propName);
      const stmt = _`${this.trackerVar}.props["${new Code(escaped)}"] = true;`;
      if (this.isRuntimeOptional) {
        this.code.if(this.trackerVar, () => {
          this.code.line(stmt);
        });
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark multiple static property names as evaluated - optimized batch operation */
  markProps(propNames: string[]): void {
    if (!this.trackProps || propNames.length === 0) return;

    // For small numbers, inline individual assignments
    if (propNames.length <= 3) {
      for (const propName of propNames) {
        this.markProp(propName);
      }
      return;
    }

    // For larger numbers, use Object.assign with a literal object for better performance
    const assignments = propNames.map((name) => `"${escapeString(name)}": true`).join(', ');
    const stmt = _`Object.assign(${this.trackerVar}.props, { ${new Code(assignments)} });`;

    if (this.isRuntimeOptional) {
      this.code.if(this.trackerVar, () => {
        this.code.line(stmt);
      });
    } else {
      this.code.line(stmt);
    }
  }

  /** Mark a dynamic property (key variable) as evaluated */
  markPropDynamic(keyVar: Name | string): void {
    if (this.trackProps) {
      const keyName = typeof keyVar === 'string' ? new Name(keyVar) : keyVar;
      const stmt = _`${this.trackerVar}.props[${keyName}] = true;`;
      if (this.isRuntimeOptional) {
        this.code.if(this.trackerVar, () => {
          this.code.line(stmt);
        });
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark all properties as evaluated (e.g., when additionalProperties is present) */
  markAllProps(): void {
    if (this.trackProps) {
      const stmt = _`${this.trackerVar}.props.__all__ = true;`;
      if (this.isRuntimeOptional) {
        this.code.if(this.trackerVar, () => {
          this.code.line(stmt);
        });
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Mark a static item index as evaluated */
  markItem(index: number): void {
    if (this.trackItems) {
      // Optimization: Skip the condition check if we know at compile time that index > compileTimeMaxItem
      // This is common when marking sequential items (0, 1, 2, ...) in prefixItems
      const needsCondition = index <= this.compileTimeMaxItem;
      const baseStmt = needsCondition
        ? _`if (${new Code(String(index))} > ${this.trackerVar}.maxItem) ${this.trackerVar}.maxItem = ${new Code(String(index))};`
        : _`${this.trackerVar}.maxItem = ${new Code(String(index))};`;

      // Update compile-time tracking
      if (index > this.compileTimeMaxItem) {
        this.compileTimeMaxItem = index;
      }

      if (this.useItemSet) {
        const setStmt = _`${this.trackerVar}.items.add(${new Code(String(index))});`;
        if (this.isRuntimeOptional) {
          this.code.if(this.trackerVar, () => {
            this.code.line(baseStmt);
            this.code.line(setStmt);
          });
        } else {
          this.code.line(baseStmt);
          this.code.line(setStmt);
        }
      } else {
        if (this.isRuntimeOptional) {
          this.code.if(this.trackerVar, () => {
            this.code.line(baseStmt);
          });
        } else {
          this.code.line(baseStmt);
        }
      }
    }
  }

  /** Mark items up to a dynamic index as evaluated (sequential marking) */
  markItemsDynamic(indexVar: Name | string): void {
    if (this.trackItems) {
      const idxName = typeof indexVar === 'string' ? new Name(indexVar) : indexVar;
      const baseStmt = _`if (${idxName} > ${this.trackerVar}.maxItem) ${this.trackerVar}.maxItem = ${idxName};`;
      if (this.useItemSet) {
        const setStmt = _`${this.trackerVar}.items.add(${idxName});`;
        if (this.isRuntimeOptional) {
          this.code.if(this.trackerVar, () => {
            this.code.line(baseStmt);
            this.code.line(setStmt);
          });
        } else {
          this.code.line(baseStmt);
          this.code.line(setStmt);
        }
      } else {
        if (this.isRuntimeOptional) {
          this.code.if(this.trackerVar, () => {
            this.code.line(baseStmt);
          });
        } else {
          this.code.line(baseStmt);
        }
      }
    }
  }

  /** Mark a single arbitrary item as evaluated (for contains) */
  markSingleItem(indexVar: Name | string): void {
    if (!this.trackItems) return;
    const idxName = typeof indexVar === 'string' ? new Name(indexVar) : indexVar;
    // For runtime-optional trackers (received from caller), check if items Set exists at runtime
    // For known useItemSet trackers, generate unconditional code
    if (this.isRuntimeOptional) {
      // Check both tracker existence and items Set existence at runtime
      this.code.if(_`${this.trackerVar} && ${this.trackerVar}.items`, () => {
        this.code.line(_`${this.trackerVar}.items.add(${idxName});`);
      });
    } else if (this.useItemSet) {
      this.code.line(_`${this.trackerVar}.items.add(${idxName});`);
    }
  }

  /** Mark all items as evaluated (e.g., when items schema covers all) */
  markAllItems(): void {
    if (this.trackItems) {
      const stmt = _`${this.trackerVar}.maxItem = Infinity;`;
      if (this.isRuntimeOptional) {
        this.code.if(this.trackerVar, () => {
          this.code.line(stmt);
        });
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Register a pattern regex variable for unevaluatedProperties check */
  addPattern(regexVarName: Name): void {
    if (this.trackProps && this.hasPatterns) {
      // Add to compile-time list (for local unevaluatedProperties checks)
      this.patternVars.push(regexVarName);
      // Also push to runtime tracker.patterns (for cross-function tracking)
      const stmt = _`${this.trackerVar}.patterns.push(${regexVarName});`;
      if (this.isRuntimeOptional) {
        this.code.if(this.trackerVar, () => {
          this.code.line(stmt);
        });
      } else {
        this.code.line(stmt);
      }
    }
  }

  /** Check if a property is unevaluated (returns Code expression) */
  isUnevaluatedProp(keyVar: Name | string): Code {
    const keyName = typeof keyVar === 'string' ? new Name(keyVar) : keyVar;
    // Check: not marked as all evaluated, not in evaluated props object, not matching any pattern
    // We check both compile-time patternVars (local) and runtime tracker.patterns (from called functions)

    // Build base condition efficiently with early exits
    // Order: cheapest checks first (property lookups), then regex tests
    let expr = `!${this.trackerVar}.props.__all__ && !${this.trackerVar}.props[${keyName}]`;

    // Check compile-time patterns inline for better JIT optimization
    for (const patternVar of this.patternVars) {
      expr += ` && !${patternVar}.test(${keyName})`;
    }

    // Check runtime patterns (from nested function calls)
    // OPTIMIZATION: When we know at tracker creation time that there will be no patterns
    // (i.e., no patternProperties in the schema tree), we can skip the patterns check entirely.
    // This is determined by the hasPatterns flag set during tracker initialization.
    if (this.hasPatterns) {
      // Optimize: use !.some() instead of .every() - benchmarks show .some() is faster
      // Also check length === 0 first to short-circuit in the common case
      const patternsVar = `${this.trackerVar}.patterns`;
      expr += ` && (${patternsVar}.length === 0 || !${patternsVar}.some(p => p.test(${keyName})))`;
    }

    return new Code(expr);
  }

  /** Check if an item is unevaluated (returns Code expression) */
  isUnevaluatedItem(indexVar: Name | string): Code {
    const idxName = typeof indexVar === 'string' ? new Name(indexVar) : indexVar;
    if (this.useItemSet) {
      // Check both maxItem (for sequential) and items Set (for arbitrary/contains)
      return _`${idxName} > ${this.trackerVar}.maxItem && !${this.trackerVar}.items.has(${idxName})`;
    }
    return _`${idxName} > ${this.trackerVar}.maxItem`;
  }

  /** Create a child tracker that shares the same runtime tracker variable */
  child(): EvalTracker {
    const child = new EvalTracker(this.code, this.trackerVar, {
      trackProps: this.trackProps,
      trackItems: this.trackItems,
      isRuntimeOptional: this.isRuntimeOptional,
      useItemSet: this.useItemSet,
      hasPatterns: this.hasPatterns,
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
        // Fast path: if child marked all props, parent should too - just set the flag
        this.code.if(_`${this.trackerVar}.props.__all__`, () => {
          this.code.line(_`${parentVar}.props.__all__ = true;`);
        });
        // Only copy props if __all__ is NOT set (else branch avoids unnecessary copy when __all__ is true)
        this.code.else(() => {
          // Copy individual props using Object.assign - faster than for...in
          this.code.line(_`Object.assign(${parentVar}.props, ${this.trackerVar}.props);`);
          // Only copy patterns if both trackers have patterns support
          if (this.hasPatterns && this.parentTracker && this.parentTracker.hasPatterns) {
            // Only copy patterns if there are any to avoid spread operator overhead
            this.code.if(_`${this.trackerVar}.patterns.length > 0`, () => {
              this.code.line(_`${parentVar}.patterns.push(...${this.trackerVar}.patterns);`);
            });
          }
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
        this.code.if(_`${this.trackerVar}.maxItem > ${parentVar}.maxItem`, () => {
          this.code.line(_`${parentVar}.maxItem = ${this.trackerVar}.maxItem;`);
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
   * Create a temp tracker variable and return it as a Name.
   * Used for conditional tracking in anyOf/oneOf/if-then-else.
   * Returns undefined if tracking is not enabled.
   */
  createTempTracker(prefix: string): Name | undefined {
    if (!this.enabled) return undefined;
    const tempVar = this.code.genVar(prefix);
    const parts: string[] = [];
    if (this.trackProps) {
      parts.push('props: {}');
      // Only include patterns array if needed
      if (this.hasPatterns) {
        parts.push('patterns: []');
      }
    }
    if (this.trackItems) {
      parts.push('maxItem: -1');
      if (this.useItemSet) {
        parts.push('items: new Set()');
      }
    }
    this.code.line(_`const ${tempVar} = { ${new Code(parts.join(', '))} };`);
    return tempVar;
  }

  /**
   * Merge a temp tracker into this tracker.
   * Used for conditional branches (anyOf/oneOf/if-then-else).
   *
   * This copies from a TEMP tracker variable to THIS tracker (horizontal, sibling → current).
   */
  mergeFrom(tempVar: Name | undefined): void {
    if (!this.enabled || !tempVar) return;
    const doMerge = () => {
      if (this.trackProps) {
        // Use Object.assign for bulk property copy - faster than for...in loop
        this.code.line(_`Object.assign(${this.trackerVar}.props, ${tempVar}.props);`);
        // Only merge patterns if patterns are supported
        if (this.hasPatterns) {
          // Optimize: only push patterns if there are any to avoid spread overhead
          this.code.if(_`${tempVar}.patterns.length > 0`, () => {
            this.code.line(_`${this.trackerVar}.patterns.push(...${tempVar}.patterns);`);
          });
        }
      }
      if (this.trackItems) {
        this.code.line(
          _`if (${tempVar}.maxItem > ${this.trackerVar}.maxItem) ${this.trackerVar}.maxItem = ${tempVar}.maxItem;`
        );
        if (this.useItemSet) {
          this.code.line(_`for (const i of ${tempVar}.items) ${this.trackerVar}.items.add(i);`);
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
