# Performance Optimization Sprint

You are tasked with optimizing the tjs JSON Schema validator to beat ajv in performance benchmarks.

## Current State

Run `npm run bench:compare:all` to see the current benchmark results. The output shows:
- Per-draft performance comparison (ops/s)
- Top 10 slowest test suites by absolute ops/s difference
- Compliance rates for both validators

## Optimization Strategy

For each of the top 5 slowest test suites identified in the benchmark:

1. **Create a git worktree** for isolated development:
   ```bash
   git worktree add /tmp/tjs-opt-<keyword> -b perf/<keyword>
   cd /tmp/tjs-opt-<keyword>
   npm install
   ```

2. **Analyze the slow schema** by:
   - Reading the test file from `tests/json-schema-test-suite/<draft>/optional/format/<keyword>.json`
   - Understanding what validation the format requires
   - Looking at the current implementation in `src/core/codegen.ts` (search for the keyword)
   - Comparing to ajv's approach if helpful

3. **Implement optimization** focusing on:
   - Avoid regex when simple string operations work
   - Use early-exit patterns (fail fast)
   - Inline common checks instead of function calls
   - Cache compiled patterns at schema compilation time, not validation time
   - Avoid string allocations in hot paths

4. **Benchmark the change**:
   ```bash
   npm run bench:compare -- draft7 draft2020-12
   ```
   Compare the specific format validator ops/s before and after.

5. **If improvement is significant (>10%)**:
   - Run full test suite: `npm test`
   - If tests pass, commit the change with message: `perf: optimize <keyword> format validation`
   - Create a summary of what was changed and the performance delta

6. **Merge back**:
   ```bash
   cd /Users/samberan/tjs
   git merge perf/<keyword>
   git worktree remove /tmp/tjs-opt-<keyword>
   ```

## Key Files

- `src/core/codegen.ts` - Code generation for validators (format implementations)
- `src/core/compiler.ts` - Schema compilation logic
- `benchmarks/compare-ajv-quick.ts` - Benchmark script
- `tests/json-schema-test-suite/` - Test data

## Top Priority Formats (typically slowest)

Based on benchmark results, these formats are typically 10-15x slower than ajv:
1. `idn-hostname` - Internationalized domain names
2. `iri` / `iri-reference` - International Resource Identifiers
3. `idn-email` - Internationalized email addresses

These use complex Unicode validation that can be optimized.

## Output

After completing optimizations, provide:
1. Summary table of changes made
2. Before/after ops/s for each optimized format
3. Overall benchmark comparison

## Parallel Execution

Launch 5 subagents in parallel, one for each of the top 5 slowest formats. Each agent:
- Works in its own git worktree
- Implements and tests its optimization independently
- Reports back with results

Example task prompt for subagent:
```
Optimize the <FORMAT> format validator in tjs.

Working directory: /tmp/tjs-opt-<FORMAT>
Branch: perf/<FORMAT>

1. Analyze current implementation in src/core/codegen.ts
2. Compare performance to ajv using: npm run bench:compare -- draft7 draft2020-12
3. Implement optimization focusing on: [specific strategy]
4. Run tests: npm test
5. Report: before/after ops/s, changes made, test results
```
