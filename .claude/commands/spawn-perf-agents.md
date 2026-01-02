# Spawn Performance Optimization Agents

Run this command to automatically spawn parallel subagents to optimize the slowest validators.

## Benchmark Filter Support

The benchmark script supports regex filtering to focus on specific validators:

```bash
# Filter by keyword
npm run bench -- draft7 --filter idn-hostname

# Filter with regex OR
npm run bench -- draft4 --filter "idn|iri"

# Quick mode for faster feedback
npm run bench:quick -- draft7 --filter hostname
```

## Instructions for Claude

Follow this CONTINUOUS LOOP to spawn agents, incorporate results, and spawn more:

### Log File

All optimization results are logged to `PERF_IMPROVEMENTS.md` in the project root.

**At session start**, if the file doesn't exist, create it with this header:
```markdown
# Performance Improvements Log

This file tracks all performance optimization attempts and their results.

---

```

Then append entries as optimizations complete.

### State Tracking

Maintain these lists throughout the session:
- **ACTIVE_AGENTS**: Keywords currently being optimized by running agents
- **COMPLETED**: Keywords that have been optimized (successful or failed)
- **PENDING**: Keywords identified as slow but not yet assigned

### Step 1: Run Benchmark and Identify Targets

Run benchmarks across ALL drafts to find the slowest validators:

```bash
# Run all drafts and capture slowest tests
for draft in draft4 draft6 draft7 draft2019-09 draft2020-12; do
  echo "=== $draft ===" && npm run bench:quick -- $draft 2>&1 | tail -20
done
```

Or run without draft filter to benchmark all drafts together:
```bash
npm run bench:quick 2>&1 | tail -50
```

Parse the "Top 10 Slowest Overall" table from the output. Extract keywords where tjs is slower than ajv.
Add any NEW keywords (not in ACTIVE_AGENTS or COMPLETED) to PENDING.
**Note the draft version** where each slow test appears - you'll need it for targeted benchmarking.

### Step 2: Spawn Agents for Pending Keywords

For up to 5 keywords from PENDING (respecting parallelism limits):

1. Move keyword from PENDING to ACTIVE_AGENTS
2. Create worktree:
   ```bash
   git worktree add /tmp/tjs-opt-KEYWORD -b perf/KEYWORD 2>/dev/null || echo "Worktree exists"
   ```
3. Spawn a subagent using the Task tool with this prompt:

```
PERFORMANCE OPTIMIZATION TASK: Optimize the KEYWORD validator

## Setup
Working directory: /tmp/tjs-opt-KEYWORD
Branch: perf/KEYWORD

First run:
cd /tmp/tjs-opt-KEYWORD && npm install

## Your Task

1. **Baseline Measurement**
   Run benchmarks across all drafts to find where this keyword is slowest:
   Run: npm run bench:quick --filter "KEYWORD"
   Record the ns/test for tjs and ajv for each draft where this test exists

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
   Run: npm run bench:quick --filter "KEYWORD"
   Compare ns/test to baseline across all drafts

5. **Validate**
   Run: npm test
   Ensure all tests still pass

6. **Commit if Improved**
   If improvement > 10% and tests pass:
   git add -A && git commit -m "perf: optimize KEYWORD validation"

7. **Capture Diff**
   Run: git diff HEAD~1 --stat && git diff HEAD~1
   Save the full diff output to include in your report.

8. **Report Results**
   Return a structured report:
   - KEYWORD: the keyword optimized
   - STATUS: "success" | "no-improvement" | "tests-failed" | "error"
   - BASELINE_TJS: baseline ops/s
   - BASELINE_AJV: ajv ops/s for comparison
   - NEW_TJS: new ops/s after optimization
   - IMPROVEMENT: percentage improvement
   - DESCRIPTION: brief description of changes made
   - TEST_RESULT: "pass" | "fail"
   - DIFF: the full git diff output (if success)
   - FILES_CHANGED: list of files modified
```

**IMPORTANT**: Launch multiple agents in a SINGLE message using multiple Task tool calls.

### Step 3: Process Completed Agents

When an agent returns:

1. Move keyword from ACTIVE_AGENTS to COMPLETED
2. Parse the agent's report
3. If STATUS == "success" AND IMPROVEMENT > 10% AND TEST_RESULT == "pass":
   ```bash
   cd /Users/samberan/tjs
   git merge perf/KEYWORD --no-edit
   git worktree remove /tmp/tjs-opt-KEYWORD
   git branch -d perf/KEYWORD
   ```
   **Log to PERF_IMPROVEMENTS.md** (append):
   ```markdown
   ## KEYWORD - DATE

   **Status:** ✅ Merged
   **Improvement:** BASELINE_TJS → NEW_TJS ops/s (+X%)
   **vs ajv:** NEW_TJS vs BASELINE_AJV ops/s

   ### Description
   DESCRIPTION

   ### Files Changed
   FILES_CHANGED

   ### Diff
   ```diff
   DIFF
   ```

   ---
   ```

4. If unsuccessful:
   ```bash
   git worktree remove /tmp/tjs-opt-KEYWORD --force
   git branch -D perf/KEYWORD
   ```
   **Log to PERF_IMPROVEMENTS.md** (append):
   ```markdown
   ## KEYWORD - DATE

   **Status:** ❌ STATUS
   **Reason:** DESCRIPTION

   ---
   ```

### Step 4: Continue the Loop

After processing completed agents:

1. If ACTIVE_AGENTS is not full (< 5 agents) AND PENDING is not empty:
   - Go to Step 2 to spawn more agents

2. If ACTIVE_AGENTS is empty AND PENDING is empty:
   - Run final benchmark across all drafts: `npm run bench:quick`
   - Print summary of all optimizations
   - Exit loop

3. If ACTIVE_AGENTS is not empty:
   - Wait for more agents to complete
   - Go to Step 3

### Summary Report Format

At the end, print:

```
## Performance Optimization Summary

### Successfully Merged
| Keyword | Baseline | New | Improvement |
|---------|----------|-----|-------------|
| keyword1 | 1000 | 1500 | +50% |

### Failed/No Improvement
| Keyword | Reason |
|---------|--------|
| keyword2 | no-improvement (only +3%) |

### Final Benchmark
[Include top slowest tests from final benchmark]
```

## Key Points

- **No Duplicates**: Check ACTIVE_AGENTS and COMPLETED before spawning
- **Parallel Execution**: Launch multiple Task tools in ONE message
- **Continuous Loop**: Keep spawning as agents complete
- **Structured Reports**: Agents return parseable results with diffs
- **Log Everything**: Append all results (success and failure) to PERF_IMPROVEMENTS.md
- **Include Diffs**: Successful optimizations include full git diff in log
- **Clean Up**: Remove worktrees and branches after processing
- **Only Merge Winners**: >10% improvement AND tests pass

## Related Commands

- **`/spawn-overall-perf-agents`**: For cross-cutting optimizations that affect all validators (codegen hot paths, error handling, type checking, property access, array validation, compile-time work). Use this when keyword-specific optimizations have been exhausted or when looking for systemic improvements.

## Common Slow Validators

Based on typical benchmark results, these are often the slowest:

**Format validators** (in `src/core/keywords/format.ts`):
- `idn-hostname` - Internationalized domain names
- `iri` / `iri-reference` - International Resource Identifiers
- `idn-email` - Internationalized email addresses
- `uri` / `uri-reference` - URI validation

**Schema keywords** (in `src/core/compiler.ts`):
- `contains` / `minContains` / `maxContains`
- `unevaluatedProperties` / `unevaluatedItems`
- `$dynamicRef` / `$dynamicAnchor`
- `oneOf` / `anyOf` - Schema composition
