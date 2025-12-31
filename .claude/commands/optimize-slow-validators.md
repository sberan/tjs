# Optimize Slow Validators

Aggressively optimize the two slowest validators to match or beat AJV performance.

## Target Validators

1. **dynamic evalation inside nested refs** - Currently ~800ns vs AJV ~240ns (3.3x slower)
2. **collect annotations inside a 'not'** - Currently ~650ns vs AJV ~100ns (6.5x slower)

## Instructions for Claude

### Step 1: Analyze the Test Cases

First, find and understand what these tests actually validate:

```bash
grep -r "dynamic evalation inside nested refs" tests/json-schema-test-suite/
grep -r "collect annotations inside a 'not'" tests/json-schema-test-suite/
```

Read the test files to understand the exact schemas and data being validated.

### Step 2: Generate and Analyze the Compiled Validators

For each slow test, generate the compiled validator code to understand what's happening:

```javascript
// In src/claude-debug.js
import { schema } from './index.js';

const s = schema({
  // paste the schema from the test
}, { defaultMeta: 'draft2020-12' });

// Get the compiled code
console.log(s._compiled?.toString() || 'No compiled code');
```

Run with: `node src/claude-debug.js`

### Step 3: Compare with AJV's Approach

Look at how AJV handles these cases:
- AJV source: `node_modules/ajv/dist/compile/`
- Focus on: How does AJV handle dynamic refs? How does it track annotations in 'not'?

### Step 4: Identify Optimization Opportunities

Common causes of slowness in these patterns:

**For dynamic refs:**
- Excessive function call overhead
- Repeated scope chain lookups
- Unnecessary object allocations for dynamic anchor tracking

**For annotations in 'not':**
- Creating temp trackers when not needed
- Expensive merge operations
- Not short-circuiting when annotations will be discarded

### Step 5: Implement Optimizations

Key files to modify:
- `src/core/compiler.ts` - Main compilation logic
- `src/core/eval-tracker.ts` - Annotation tracking
- `src/core/keywords/ref.ts` - $ref and $dynamicRef handling

**Optimization strategies:**

1. **Inline simple schemas** - If the dynamicRef resolves to a simple type check, inline it
2. **Skip annotation tracking** - Inside 'not', annotations are discarded anyway
3. **Reduce allocations** - Reuse objects instead of creating new ones
4. **Early exits** - Fail fast when possible
5. **Flatten nested calls** - Reduce function call depth

### Step 6: Benchmark After Each Change

```bash
npm run bench 2>&1 | grep -A2 "dynamic eval\|annotations inside"
```

Target: Get within 20% of AJV's performance on these tests.

### Step 7: Validate

```bash
npm test
```

All tests must pass. Do not sacrifice correctness for speed.

### Step 8: Commit if Improved

If improvement > 20% and tests pass:
```bash
git add -A && git commit -m "perf: optimize [description of what was optimized]"
```

## Report Format

Return a structured report:
- VALIDATOR: name of the validator optimized
- BASELINE_TJS: original ns
- BASELINE_AJV: ajv ns
- NEW_TJS: new ns after optimization
- IMPROVEMENT: percentage improvement
- DESCRIPTION: what was changed
- TEST_RESULT: pass/fail
- DIFF: git diff of changes
