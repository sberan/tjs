# AJV-Compatible Error Messages

Run this command to implement AJV-compatible `.errors` property on validators.

## Goal

Make tjs validators expose errors in the same way AJV does - via a `.errors` property on the validator function after validation:

```typescript
// AJV pattern
const validate = ajv.compile(schema);
const valid = validate(data);
console.log(validate.errors); // Array of errors or null

// tjs should support the same pattern
const validate = schema(schemaObj);
const valid = validate(data);  // boolean (new API)
console.log(validate.errors); // Array of errors or null
```

## AJV Error Format

```typescript
interface AjvError {
  instancePath: string;      // JSON pointer to location in data (e.g., "/name")
  schemaPath: string;        // JSON pointer to location in schema (e.g., "#/properties/name/type")
  keyword: string;           // The keyword that failed (e.g., "type", "required")
  params: object;            // Keyword-specific parameters
  message: string;           // Human-readable message
}
```

## Current tjs Error Format

```typescript
interface TjsError {
  path: string;              // Dot-notation path (e.g., "name")
  message: string;           // Human-readable message
  keyword: string;           // The keyword that failed
}
```

## Instructions for Claude

This is a feature implementation task. Spawn a single agent to implement the feature:

### Create Worktree

```bash
git worktree add /tmp/tjs-ajv-errors -b feat/ajv-compat-errors 2>/dev/null || echo "Worktree exists"
```

### Spawn Agent

Use the Task tool with this prompt:

```
AJV-COMPATIBLE ERRORS IMPLEMENTATION TASK

## Setup
Working directory: /tmp/tjs-ajv-errors
Branch: feat/ajv-compat-errors

First run:
cd /tmp/tjs-ajv-errors && npm install

## Requirements

1. **Add `.errors` property to validators** that matches AJV's format
   - After calling `validator(data)` (the raw validate function), `.errors` should contain the array of errors or null
   - The existing `.validate(data)` API that returns `{ valid, value, error }` should continue to work

2. **Error format must match AJV**:
   ```typescript
   interface AjvCompatError {
     instancePath: string;      // JSON pointer format: "" for root, "/prop", "/arr/0"
     schemaPath: string;        // JSON pointer to schema location
     keyword: string;           // Same as current
     params: object;            // Keyword-specific params (type: {type: "string"}, required: {missingProperty: "foo"}, etc.)
     message: string;           // Human-readable message
   }
   ```

3. **Backward compatibility**: The existing `.validate()` and `.assert()` methods must continue to work exactly as before

4. **No performance regression**: Run benchmarks before and after to ensure no regression
   - Baseline: `npm run bench:compare -- draft7`
   - Measure: ops/s for tjs should not decrease by more than 5%

## Implementation Steps

1. **Read current implementation**
   - Read `src/index.ts` to understand Validator interface
   - Read `src/core/compiler.ts` to understand error generation
   - Read `src/types.ts` for type definitions

2. **Design the solution**
   - Consider: Should errors be collected during validation or converted after?
   - Consider: How to add `schemaPath` tracking without performance impact?
   - Consider: How to generate proper `params` for each keyword?

3. **Implement changes**
   - Update Validator interface to include callable function with `.errors`
   - Update error generation to include AJV-compatible fields
   - Ensure `.validate()` and `.assert()` still work

4. **Add tests**
   - Add tests comparing tjs error format to AJV error format
   - Test various schema types: type, required, properties, items, pattern, format, etc.
   - Ensure error paths match AJV's JSON pointer format

5. **Benchmark**
   - Run: `npm run bench:compare -- draft7`
   - Compare to baseline - must not regress by more than 5%

6. **Validate**
   - Run: `npm test`
   - All existing tests must pass

7. **Commit if successful**
   ```bash
   git add -A && git commit -m "feat: add AJV-compatible .errors property on validators"
   ```

8. **Report Results**
   Return a structured report:
   - STATUS: "success" | "partial" | "error"
   - BASELINE_OPS: baseline ops/s
   - NEW_OPS: new ops/s after implementation
   - PERF_CHANGE: percentage change (should be within -5%)
   - TESTS_ADDED: number of new tests
   - TEST_RESULT: "pass" | "fail"
   - DESCRIPTION: summary of implementation approach
   - DIFF: full git diff output
   - FILES_CHANGED: list of modified files

## Key Considerations

- **Path format**: AJV uses JSON Pointer format (`/foo/bar/0`), tjs uses dot notation (`foo.bar.0`). Need to convert.
- **schemaPath**: Currently not tracked in tjs. May need to pass schema path through compilation.
- **params**: Each keyword has different params format. Study AJV source for exact format.
- **Performance**: The `.errors` property should be set during validation, not require post-processing.

## Example Expected Behavior

```typescript
import { schema } from 'tjs';

const validate = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer', minimum: 0 }
  },
  required: ['name']
});

// Direct call (new pattern)
const valid = validate({ name: 123 });
console.log(valid); // false
console.log(validate.errors);
// [
//   {
//     instancePath: '/name',
//     schemaPath: '#/properties/name/type',
//     keyword: 'type',
//     params: { type: 'string' },
//     message: 'must be string'
//   }
// ]

// Existing API still works
const result = validate.validate({ name: 123 });
console.log(result.valid); // false
console.log(result.error); // existing format
```
```

### Process Agent Result

When the agent returns:

1. If STATUS == "success" AND PERF_CHANGE > -5% AND TEST_RESULT == "pass":
   ```bash
   cd /Users/samberan/tjs
   git merge feat/ajv-compat-errors --no-edit
   git worktree remove /tmp/tjs-ajv-errors
   git branch -d feat/ajv-compat-errors
   ```

2. If unsuccessful:
   ```bash
   git worktree remove /tmp/tjs-ajv-errors --force
   git branch -D feat/ajv-compat-errors
   ```
   Report the failure reason and consider alternative approaches.

## Success Criteria

- [ ] Validator can be called directly as a function returning boolean
- [ ] `.errors` property contains AJV-format errors after validation
- [ ] Existing `.validate()` and `.assert()` methods unchanged
- [ ] All tests pass
- [ ] Performance within 5% of baseline
- [ ] Error format matches AJV (instancePath, schemaPath, keyword, params, message)
