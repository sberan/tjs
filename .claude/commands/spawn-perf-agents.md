# Spawn Performance Optimization Agents

Run this command to automatically spawn 5 parallel subagents to optimize the slowest  validators.

## Instructions for Claude

1. First, run the benchmark to identify the top 5 slowest validators:
   ```bash
   npm run bench:compare:all 2>&1 | tail -20
   ```

2. For each of the top 5 slowest validators (e.g., idn-hostname, iri, iri-reference, idn-email, etc.):

   Create a git worktree:
   ```bash
   git worktree add /tmp/tjs-opt-FORMAT -b perf/FORMAT
   ```

3. Spawn 5 subagents IN PARALLEL using the Task tool with this prompt template:

```
PERFORMANCE OPTIMIZATION TASK: Optimize the FORMAT format validator (draft DRAFT)

## Setup (already done)
Working directory: /tmp/tjs-opt-FORMAT
Branch: perf/FORMAT
Run: cd /tmp/tjs-opt-FORMAT && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:compare -- DRAFT
   Record the ops/s for "validation of FORMAT" test suite

2. **Analyze Current Implementation**
   Read src/core/compile.ts and find the relevant code
   Understand how it works and why it might be slow

3. **Implement Optimization**
   Common strategies:
   - Replace regex with character-by-character validation
   - Use early-exit on first invalid character
   - Avoid string allocations (no .split(), .slice() in hot paths)
   - Cache compiled patterns at compile time
   - Use lookup tables for character classes

4. **Measure Improvement**
   Run: npm run bench:compare -- draft7 draft2020-12
   Compare ops/s to baseline

5. **Validate**
   Run: npm test
   Ensure all tests still pass

6. **Commit if Improved**
   If improvement > 10% and tests pass:
   git add -A && git commit -m "perf: optimize FORMAT format validation"

7. **Report Results**
   Return:
   - Baseline ops/s
   - New ops/s
   - Percentage improvement
   - What was changed
   - Test results (pass/fail)
```

4. Wait for all subagents to complete

5. For each successful optimization (>10% improvement, tests pass):
   ```bash
   cd /Users/samberan/tjs
   git merge perf/FORMAT --no-edit
   git worktree remove /tmp/tjs-opt-FORMAT
   ```

6. Run final benchmark:
   ```bash
   npm run bench:compare:all
   ```

7. Report summary of all optimizations applied

## Key Points

- Launch ALL 5 subagents in a SINGLE message using multiple Task tool calls
- Each subagent works independently in its own worktree
- Only merge changes that show >10% improvement AND pass tests
- If a subagent fails, note it but continue with others
