# Spawn Test Fix Agents

Run this command to automatically spawn parallel subagents to fix skipped/failing tests.

## Instructions for Claude

Follow this CONTINUOUS LOOP to spawn agents, incorporate results, and spawn more:

### Log File

All fix results are logged to `TEST_FIXES.md` in the project root.

**At session start**, if the file doesn't exist, create it with this header:
```markdown
# Test Fixes Log

This file tracks all test fix attempts and their results.

---

```

Then append entries as fixes complete.

### State Tracking

Maintain these lists throughout the session:
- **ACTIVE_AGENTS**: Test groups currently being fixed by running agents
- **COMPLETED**: Test groups that have been fixed (successful or failed)
- **PENDING**: Test groups identified as skipped but not yet assigned

### Step 1: Identify Skipped Tests

Run the test suite and identify skipped tests:

```bash
npm test 2>&1 | grep -E "skipped|skip"
```

Also check the skip lists in:
- `tests/suite/compliance.test.ts` - UNIMPLEMENTED_KEYWORDS, SKIPPED_OPTIONAL_FILES, SKIPPED_TEST_DESCRIPTIONS
- `tests/runtime/coercion.test.ts` - look for `it.skip` or `describe.skip`

Group related skipped tests together. Common groups:
1. **Coercion tests** - if-then-else coercion, error messages
2. **Content validation** - contentMediaType, contentEncoding
3. **Cross-draft refs** - $ref resolution across schema versions
4. **Format assertion** - meta-schema format-assertion keyword
5. **Float overflow** - multipleOf with very large numbers
6. **Unknown keywords** - $id inside unknown keywords

### Step 2: Spawn Agents for Pending Groups

For up to 3 groups from PENDING (respecting parallelism limits):

1. Move group from PENDING to ACTIVE_AGENTS
2. Create worktree:
   ```bash
   git worktree add /tmp/tjs-fix-GROUP -b fix/GROUP 2>/dev/null || echo "Worktree exists"
   ```
3. Spawn a subagent using the Task tool with this prompt:

```
TEST FIX TASK: Fix the GROUP tests

## Setup
Working directory: /tmp/tjs-fix-GROUP
Branch: fix/GROUP

First run:
cd /tmp/tjs-fix-GROUP && npm install

## Your Task

1. **Identify the Skipped Tests**
   Find the specific tests that are skipped for GROUP.
   Read the test files and understand what they're testing.

2. **Understand the Issue**
   - Read the test expectations
   - Trace through the code to understand why the test fails
   - Identify what needs to be implemented or fixed

3. **Implement the Fix**
   Key files to check:
   - `src/core/compiler.ts` - main compilation logic
   - `src/core/coercion.ts` - type coercion
   - `src/core/context.ts` - compilation context
   - `src/core/keywords/*.ts` - keyword handlers

4. **Unskip and Verify**
   - Remove the `.skip` from the test(s)
   - Run: npm test
   - Ensure all tests pass (including the previously skipped ones)

5. **Commit if Fixed**
   If tests pass:
   git add -A && git commit -m "fix: implement GROUP functionality"

6. **Capture Diff**
   Run: git diff HEAD~1 --stat && git diff HEAD~1
   Save the full diff output to include in your report.

7. **Report Results**
   Return a structured report:
   - GROUP: the test group fixed
   - STATUS: "success" | "partial" | "blocked" | "error"
   - TESTS_FIXED: number of tests now passing
   - TESTS_REMAINING: number still skipped (if partial)
   - DESCRIPTION: brief description of changes made
   - BLOCKERS: any issues preventing full fix (if partial/blocked)
   - DIFF: the full git diff output (if success)
   - FILES_CHANGED: list of files modified
```

**IMPORTANT**: Launch multiple agents in a SINGLE message using multiple Task tool calls.

### Step 3: Process Completed Agents

When an agent returns:

1. Move group from ACTIVE_AGENTS to COMPLETED
2. Parse the agent's report
3. If STATUS == "success":
   ```bash
   cd /Users/samberan/tjs
   git merge fix/GROUP --no-edit
   git worktree remove /tmp/tjs-fix-GROUP
   git branch -d fix/GROUP
   ```
   **Log to TEST_FIXES.md** (append):
   ```markdown
   ## GROUP - DATE

   **Status:** ✅ Fixed
   **Tests Fixed:** TESTS_FIXED

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

4. If STATUS == "partial":
   - Merge if valuable, otherwise discard
   - Log partial progress

5. If unsuccessful:
   ```bash
   git worktree remove /tmp/tjs-fix-GROUP --force
   git branch -D fix/GROUP
   ```
   **Log to TEST_FIXES.md** (append):
   ```markdown
   ## GROUP - DATE

   **Status:** ❌ STATUS
   **Blockers:** BLOCKERS
   **Reason:** DESCRIPTION

   ---
   ```

### Step 4: Continue the Loop

After processing completed agents:

1. If ACTIVE_AGENTS is not full (< 3 agents) AND PENDING is not empty:
   - Go to Step 2 to spawn more agents

2. If ACTIVE_AGENTS is empty AND PENDING is empty:
   - Run final test: `npm test`
   - Print summary of all fixes
   - Exit loop

3. If ACTIVE_AGENTS is not empty:
   - Wait for more agents to complete
   - Go to Step 3

### Summary Report Format

At the end, print:

```
## Test Fix Summary

### Successfully Fixed
| Group | Tests Fixed | Description |
|-------|-------------|-------------|
| coercion-ref | 1 | Added ref resolution to coercion |

### Partial/Blocked
| Group | Status | Blocker |
|-------|--------|---------|
| content | blocked | Requires contentMediaType validation |

### Final Test Results
[Include final test counts]
```

## Key Points

- **No Duplicates**: Check ACTIVE_AGENTS and COMPLETED before spawning
- **Parallel Execution**: Launch multiple Task tools in ONE message
- **Continuous Loop**: Keep spawning as agents complete
- **Structured Reports**: Agents return parseable results with diffs
- **Log Everything**: Append all results (success and failure) to TEST_FIXES.md
- **Include Diffs**: Successful fixes include full git diff in log
- **Clean Up**: Remove worktrees and branches after processing
- **Merge Partials Carefully**: Only merge partial fixes if they don't break anything

## Known Skipped Test Groups

### Coercion Tests (tests/runtime/coercion.test.ts)
1. **if-then-else coercion** - Requires evaluating `if` schema to choose branch
2. **coercion error messages** - Custom error messages for coercion failures

### Compliance Tests (tests/suite/compliance.test.ts)

**SKIPPED_OPTIONAL_FILES:**
1. **float-overflow** - multipleOf with 1e308 (optional overflow handling)
2. **zeroTerminatedFloats** - 1.0 vs 1 representation (language-specific)
3. **content** - contentMediaType/contentEncoding validation
4. **cross-draft** - Cross-draft $ref resolution
5. **format-assertion** - Meta-schema format-assertion keyword

**UNIMPLEMENTED_KEYWORDS:**
1. **unknownKeyword** - $id inside unknown keywords (meta-schema validation)

## Priority Order

1. **if-then-else coercion** - Most impactful, enables conditional type coercion
2. **content validation** - Useful for API validation (JSON content-type)
3. **cross-draft refs** - Important for schema reuse across versions
4. **float-overflow** - Edge case, low priority
5. **format-assertion** - Meta-schema feature, low priority
6. **unknownKeyword** - Complex meta-schema parsing, low priority
