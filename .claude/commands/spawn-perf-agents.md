# Spawn Performance Optimization Agents

Run this command to automatically spawn parallel subagents to optimize the slowest validators.

## Benchmark Filter Support

The benchmark script supports regex filtering to focus on specific validators:

```bash
# Filter by keyword
npm run bench:compare -- draft7 --filter idn-hostname

# Filter with regex OR
npm run bench:compare -- draft7 --filter "idn|iri"

# Filter across all drafts
npm run bench:compare:all --filter hostname
```

## Instructions for Claude

1. First, run the benchmark to identify the slowest validators:
   ```bash
   npm run bench:compare:all 2>&1 | tail -25
   ```

   The "Top 10 Slowest Tests" table shows validators where tjs is slower than ajv.

2. For each of the top 5 slowest validators (by absolute ops/s difference):

   Create a git worktree:
   ```bash
   git worktree add /tmp/tjs-opt-KEYWORD -b perf/KEYWORD
   ```

3. Spawn 5 subagents IN PARALLEL using the Task tool with this prompt template:

```
PERFORMANCE OPTIMIZATION TASK: Optimize the KEYWORD validator

## Setup
Working directory: /tmp/tjs-opt-KEYWORD
Branch: perf/KEYWORD

First run:
cd /tmp/tjs-opt-KEYWORD && npm install

## Your Task

1. **Baseline Measurement**
   Run: npm run bench:compare -- draft7 draft2020-12 --filter "KEYWORD"
   Record the ops/s for tjs and ajv

2. **Analyze Current Implementation**
   - Read src/core/codegen.ts and search for KEYWORD
   - Read src/core/compiler.ts for schema compilation logic
   - Understand how the validator works and why it might be slow

3. **Implement Optimization**
   Common strategies:
   - Replace regex with character-by-character validation
   - Use early-exit on first invalid character
   - Avoid string allocations (no .split(), .slice() in hot paths)
   - Cache compiled patterns at compile time, not validation time
   - Use lookup tables for character classes
   - Inline small functions to avoid call overhead

4. **Measure Improvement**
   Run: npm run bench:compare -- draft7 draft2020-12 --filter "KEYWORD"
   Compare ops/s to baseline

5. **Validate**
   Run: npm test
   Ensure all tests still pass

6. **Commit if Improved**
   If improvement > 10% and tests pass:
   git add -A && git commit -m "perf: optimize KEYWORD validation"

7. **Report Results**
   Return:
   - Baseline ops/s (tjs vs ajv)
   - New ops/s (tjs vs ajv)
   - Percentage improvement
   - What was changed (brief description)
   - Test results (pass/fail count)
```

4. Wait for all subagents to complete

5. For each successful optimization (>10% improvement, tests pass):
   ```bash
   cd /Users/samberan/tjs
   git merge perf/KEYWORD --no-edit
   git worktree remove /tmp/tjs-opt-KEYWORD
   ```

6. Run final benchmark:
   ```bash
   npm run bench:compare:all
   ```

7. Report summary of all optimizations applied

## Key Points

- Launch ALL 5 subagents in a SINGLE message using multiple Task tool calls
- Each subagent works independently in its own worktree
- Use --filter to focus benchmarks on the specific validator being optimized
- Only merge changes that show >10% improvement AND pass tests
- If a subagent fails, note it but continue with others

## Common Slow Validators

Based on typical benchmark results, these are often the slowest:

**Format validators** (in `src/core/codegen.ts`):
- `idn-hostname` - Internationalized domain names
- `iri` / `iri-reference` - International Resource Identifiers
- `idn-email` - Internationalized email addresses

**Schema keywords** (in `src/core/compiler.ts`):
- `contains` / `minContains` / `maxContains`
- `unevaluatedProperties` / `unevaluatedItems`
- `$dynamicRef` / `$dynamicAnchor`
