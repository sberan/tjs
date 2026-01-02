# Spawn Overall Performance Optimization Agents

Run this command to spawn parallel subagents that look for cross-cutting optimizations across the entire codebase, rather than focusing on individual keywords.

## Instructions for Claude

Follow this process to spawn agents that analyze different aspects of the system for optimization opportunities.

### Log File

All optimization results are logged to `PERF_IMPROVEMENTS.md` in the project root.

**At session start**, if the file doesn't exist, create it with this header:
```markdown
# Performance Improvements Log

This file tracks all performance optimization attempts and their results.

---

```

### Step 1: Spawn Analysis Agents in Parallel

Launch ALL of these agents in a SINGLE message using multiple Task tool calls:

#### Agent 1: CodeGen Hot Path Analysis
```
PERFORMANCE ANALYSIS TASK: Analyze CodeGen Hot Paths

## Setup
Working directory: /tmp/tjs-opt-codegen
Branch: perf/codegen-hotpath

First run:
git worktree add /tmp/tjs-opt-codegen -b perf/codegen-hotpath 2>/dev/null || true
cd /tmp/tjs-opt-codegen && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:quick -- draft7 2>&1 | tail -40
   Record overall ns/test for tjs and ajv

2. **Analyze Generated Code**
   - Create a test schema and inspect generated validator code
   - Look for patterns that appear repeatedly in generated code
   - Identify overhead in the generated validation functions

   Example:
   ```js
   const { schema } = require('./dist/index.js');
   const v = schema({ type: 'object', properties: { a: { type: 'string' } } });
   console.log(v.validate.toString());
   ```

3. **Look for These Optimization Opportunities**
   - Unnecessary function calls that could be inlined
   - Repeated property accesses that could be cached
   - Conditions that could be short-circuited earlier
   - Object allocations in hot paths (errors array, etc.)
   - String concatenation that could use template literals
   - typeof checks that could be combined or eliminated

4. **Implement Optimization**
   Focus on changes to src/core/codegen.ts or src/core/compiler.ts that affect ALL validators.

5. **Measure Improvement**
   Run: npm run bench:quick -- draft7 2>&1 | tail -40
   Compare overall ns/test to baseline

6. **Validate**
   Run: npm test

7. **Commit if Improved**
   If overall improvement > 5% and tests pass:
   git add -A && git commit -m "perf: optimize codegen hot paths"

8. **Report Results**
   Return: AREA, STATUS, BASELINE_TJS, NEW_TJS, IMPROVEMENT, DESCRIPTION, TEST_RESULT, DIFF, FILES_CHANGED
```

#### Agent 2: Error Handling Optimization
```
PERFORMANCE ANALYSIS TASK: Optimize Error Handling

## Setup
Working directory: /tmp/tjs-opt-errors
Branch: perf/error-handling

First run:
git worktree add /tmp/tjs-opt-errors -b perf/error-handling 2>/dev/null || true
cd /tmp/tjs-opt-errors && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:quick -- draft7 2>&1 | tail -40

2. **Analyze Error Handling**
   - Read src/core/codegen.ts for error generation code
   - Look at how errors array is managed
   - Check if errors are allocated even on valid paths
   - Look for error object creation overhead

3. **Optimization Opportunities**
   - Lazy error array creation (only allocate on first error)
   - Avoid creating error objects until needed
   - Use object pooling for error objects
   - Simplify error path strings
   - Avoid string interpolation in hot paths

4. **Implement, Measure, Validate, Report**
   Same as above - focus on error handling code paths
```

#### Agent 3: Type Checking Optimization
```
PERFORMANCE ANALYSIS TASK: Optimize Type Checking

## Setup
Working directory: /tmp/tjs-opt-types
Branch: perf/type-checking

First run:
git worktree add /tmp/tjs-opt-types -b perf/type-checking 2>/dev/null || true
cd /tmp/tjs-opt-types && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:quick -- draft7 --filter "type" 2>&1 | tail -20
   And: npm run bench:quick -- draft7 2>&1 | tail -40

2. **Analyze Type Checking Code**
   - Read how 'type' keyword generates validation code
   - Look at typeof checks, Array.isArray, null checks
   - Check order of type checks (most common first?)

3. **Optimization Opportunities**
   - Reorder type checks by frequency (string/number first)
   - Combine multiple typeof calls
   - Use faster type checking patterns
   - Avoid redundant null checks
   - Short-circuit on first match for union types

4. **Implement, Measure, Validate, Report**
```

#### Agent 4: Property Access Optimization
```
PERFORMANCE ANALYSIS TASK: Optimize Property Access

## Setup
Working directory: /tmp/tjs-opt-props
Branch: perf/property-access

First run:
git worktree add /tmp/tjs-opt-props -b perf/property-access 2>/dev/null || true
cd /tmp/tjs-opt-props && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:quick -- draft7 --filter "properties|additionalProperties" 2>&1 | tail -20
   And: npm run bench:quick -- draft7 2>&1 | tail -40

2. **Analyze Property Validation**
   - How are object properties iterated?
   - Are property accesses cached or repeated?
   - How is hasOwnProperty checked?
   - How are additional properties detected?

3. **Optimization Opportunities**
   - Cache data[prop] in a local variable
   - Use 'in' operator vs hasOwnProperty where safe
   - Avoid Object.keys() allocation if possible
   - Use for-in with hasOwnProperty check
   - Pre-compute known property sets at compile time

4. **Implement, Measure, Validate, Report**
```

#### Agent 5: Array Validation Optimization
```
PERFORMANCE ANALYSIS TASK: Optimize Array Validation

## Setup
Working directory: /tmp/tjs-opt-arrays
Branch: perf/array-validation

First run:
git worktree add /tmp/tjs-opt-arrays -b perf/array-validation 2>/dev/null || true
cd /tmp/tjs-opt-arrays && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:quick -- draft7 --filter "items|contains|uniqueItems" 2>&1 | tail -20
   And: npm run bench:quick -- draft7 2>&1 | tail -40

2. **Analyze Array Validation**
   - How are items iterated (for, for-of, forEach)?
   - How is uniqueItems implemented?
   - How is contains implemented?
   - Are there unnecessary array copies?

3. **Optimization Opportunities**
   - Use indexed for loops instead of for-of
   - Optimize uniqueItems with Set or early-exit
   - Short-circuit contains on first match
   - Avoid .length access in loop condition (cache it)
   - Unroll small array validations

4. **Implement, Measure, Validate, Report**
```

#### Agent 6: Compiler/Runtime Boundary
```
PERFORMANCE ANALYSIS TASK: Move Work from Runtime to Compile Time

## Setup
Working directory: /tmp/tjs-opt-compiletime
Branch: perf/compile-time

First run:
git worktree add /tmp/tjs-opt-compiletime -b perf/compile-time 2>/dev/null || true
cd /tmp/tjs-opt-compiletime && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:quick -- draft7 2>&1 | tail -40

2. **Analyze Runtime vs Compile-time Work**
   - What computations happen at validation time that could be pre-computed?
   - Are regex patterns compiled once or every validation?
   - Are lookup tables built at compile time?
   - Are constant values inlined?

3. **Optimization Opportunities**
   - Pre-compile all regex patterns into validator closure
   - Pre-compute character lookup tables
   - Inline constant schema values
   - Pre-compute property lists, required sets
   - Generate specialized code paths for common patterns

4. **Implement, Measure, Validate, Report**
```

### Step 2: Process Completed Agents

When agents return, for each:

1. Parse the agent's report
2. If STATUS == "success" AND IMPROVEMENT > 5% AND TEST_RESULT == "pass":
   - Check for conflicts with already-merged changes
   - If no conflicts:
     ```bash
     cd /Users/samberan/tjs
     git merge perf/BRANCH --no-edit
     git worktree remove /tmp/tjs-opt-AREA
     git branch -d perf/BRANCH
     ```
   - Log to PERF_IMPROVEMENTS.md

3. If unsuccessful or conflicts:
   ```bash
   git worktree remove /tmp/tjs-opt-AREA --force
   git branch -D perf/BRANCH
   ```
   - Log to PERF_IMPROVEMENTS.md

### Step 3: Resolve Conflicts (if any)

If multiple agents succeed but their changes conflict:
1. Identify the highest-impact change
2. Merge that first
3. Re-run benchmarks
4. Manually integrate compatible parts of other changes

### Step 4: Final Summary

After all agents complete:

1. Run final benchmark:
   ```bash
   npm run bench:quick -- draft7 2>&1 | tail -40
   ```

2. Print summary:
```
## Overall Performance Optimization Summary

### Successfully Merged
| Area | Baseline | New | Improvement | Description |
|------|----------|-----|-------------|-------------|

### Failed/Conflicted
| Area | Reason |
|------|--------|

### Final Results
- Overall tjs ops/s: X (was Y, +Z%)
- vs AJV: X% faster/slower
```

## Key Points

- **Parallel Execution**: Launch ALL 6 agents in ONE message
- **Cross-cutting Focus**: These optimize patterns that affect many validators
- **Conflict Awareness**: Changes may conflict - merge highest impact first
- **Lower Threshold**: Accept 5% improvement (vs 10% for keyword-specific)
- **Log Everything**: Record all attempts in PERF_IMPROVEMENTS.md

## Related Commands

- **`/spawn-perf-agents`**: For keyword-specific optimizations (format validators like idn-hostname, uri, etc., or schema keywords like unevaluatedItems, contains, etc.). Use this when benchmarks show specific validators are slow compared to AJV.
