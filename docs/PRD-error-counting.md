# PRD: Labeled Block Subschema Checks

## Problem Statement

The current `generateSubschemaCheck` function uses an expensive pattern for checking if a subschema validates:

```javascript
// Current approach (slow)
const savedErrors3 = validate0.errors;
validate0.errors = undefined;
subschemaValid4 = (function() {
  // validation code with "return false" on error
  return true;
})();
validate0.errors = savedErrors3;
```

This has three sources of overhead:
1. **Error save/restore** - Two property accesses per subschema check
2. **IIFE creation** - Function object allocation and call overhead
3. **Return-based control flow** - Prevents inlining, forces function boundary

## Goals

1. Eliminate IIFE overhead for subschema checks
2. Remove error save/restore entirely
3. Maintain 100% compliance with JSON Schema test suite
4. Improve performance on schemas with `anyOf`, `oneOf`, `not`, `if/then/else`

## Non-Goals

- Changing the public API
- Changing error message format
- Supporting `allErrors` mode (collect all errors, not just first)

## Technical Design

### Key Insight

We don't need error counting at all. The expensive pattern only happens in `generateSubschemaCheck` for `anyOf`, `oneOf`, `not`, and `if/then/else`.

**Normal validation**: Keep `return false` on first error (fast path unchanged)
**Subschema checks only**: Use labeled block with `break` (no IIFE, no error tracking)

This is a **surgical change** - only `generateSubschemaCheck` needs modification.

### Current Architecture

```javascript
// Top-level validation (KEEP THIS)
genError() {
  mainFunc.errors = [errorObject];
  return false;  // Early exit - this is good!
}

// Subschema check (CHANGE THIS)
generateSubschemaCheck() {
  const savedErrors = mainFunc.errors;
  mainFunc.errors = undefined;
  result = (function() {
    // validation with return false
    return true;
  })();
  mainFunc.errors = savedErrors;
  return result;
}
```

### Proposed Architecture

```javascript
// Top-level validation (UNCHANGED)
genError() {
  mainFunc.errors = [errorObject];
  return false;  // Still returns early!
}

// Subschema check (NEW - uses labeled block + break)
generateSubschemaCheck() {
  let _valid = true;
  _check: {
    // validation code, but instead of "return false":
    _valid = false; break _check;
  }
  return _valid;
}
```

The labeled block with `break` gives us early exit without a function boundary!

### Generated Code

```javascript
// Generated code for anyOf branch
let _valid0 = true;
_check0: {
  if (typeof data.bar !== 'number') {
    _valid0 = false;
    break _check0;
  }
  // more checks...
}
if (_valid0) { props["bar"] = true; matched = true; }
```

**Advantages:**
- No IIFE (no function call overhead)
- No error save/restore (no property access overhead)
- Early exit preserved via `break`
- Simple boolean check for result

### Implementation

#### Step 1: Add Subschema Mode to Context

Add a mode flag to `CompileContext` to track when we're inside a subschema check:

```typescript
// In context.ts
class CompileContext {
  #subschemaLabel: Name | null = null;
  #subschemaValidVar: Name | null = null;

  enterSubschemaCheck(label: Name, validVar: Name): void {
    this.#subschemaLabel = label;
    this.#subschemaValidVar = validVar;
  }

  exitSubschemaCheck(): void {
    this.#subschemaLabel = null;
    this.#subschemaValidVar = null;
  }

  isInSubschemaCheck(): boolean {
    return this.#subschemaLabel !== null;
  }

  getSubschemaLabel(): Name {
    return this.#subschemaLabel!;
  }

  getSubschemaValidVar(): Name {
    return this.#subschemaValidVar!;
  }
}
```

#### Step 2: Modify genError

When in subschema mode, use `break` instead of `return`:

```typescript
// In keywords/utils.ts
export function genError(
  code: CodeBuilder,
  pathExprCode: Code,
  schemaPath: string,
  keyword: string,
  message: string,
  params: object,
  ctx: CompileContext
): void {
  if (ctx.isInSubschemaCheck()) {
    // Subschema mode: set valid = false 和 break
    code.line(_`${ctx.getSubschemaValidVar()} = false;`);
    code.line(_`break ${ctx.getSubschemaLabel()};`);
  } else {
    // Normal mode: set errors and return
    const mainFuncName = ctx.getMainFuncName();
    const paramsCode = stringify(params);
    const errObj = _`{ instancePath: ${pathExprCode}, schemaPath: ${schemaPath}, keyword: ${keyword}, params: ${paramsCode}, message: ${message} }`;
    code.line(_`${mainFuncName}.errors = [${errObj}];`);
    code.line(_`return false;`);
  }
}
```

#### Step 3: Simplify generateSubschemaCheck

Replace the IIFE pattern with labeled block:

```typescript
// In compiler.ts
function generateSubschemaCheck(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): Code {
  // ... existing simple schema inlining (type checks, const, enum) ...

  // For complex schemas, use labeled block
  const label = code.genVar('check');
  const validVar = code.genVar('valid');

  code.line(_`let ${validVar} = true;`);
  code.line(_`${label}: {`);

  // Enter subschema mode
  ctx.enterSubschemaCheck(label, validVar);

  // Generate validation (genError will use break instead of return)
  generateSchemaValidator(code, schema, dataVar, _`''`, ctx, dynamicScopeVar);

  // Exit subschema mode
  ctx.exitSubschemaCheck();

  code.line(_`}`);

  return _`${validVar}`;
}
```

### Handling Nested Subschema Checks

For nested `anyOf` within `anyOf`, we need a stack:

```typescript
class CompileContext {
  #subschemaStack: Array<{ label: Name; validVar: Name }> = [];

  enterSubschemaCheck(label: Name, validVar: Name): void {
    this.#subschemaStack.push({ label, validVar });
  }

  exitSubschemaCheck(): void {
    this.#subschemaStack.pop();
  }

  isInSubschemaCheck(): boolean {
    return this.#subschemaStack.length > 0;
  }

  getSubschemaLabel(): Name {
    return this.#subschemaStack[this.#subschemaStack.length - 1].label;
  }

  getSubschemaValidVar(): Name {
    return this.#subschemaStack[this.#subschemaStack.length - 1].validVar;
  }
}
```

### Files to Modify

| File | Changes |
|------|---------|
| `src/core/compiler.ts` | Modify `generateSubschemaCheck` to use labeled blocks |
| `src/core/keywords/utils.ts` | Modify `genError` to check subschema mode |
| `src/core/context.ts` | Add subschema stack tracking |

### Risks

1. **Nested breaks**: Need to ensure the correct label is used for nested subschema checks. The stack approach handles this.

2. **Edge cases**: Some validation patterns might not work well with `break`. Need thorough testing.

### Success Metrics

- **Primary**: 20%+ improvement on `unevaluatedProperties` benchmarks
- **Secondary**: No regression on simple schema benchmarks
- **Required**: 100% test suite compliance maintained

### Estimated Complexity

- **Lines of code**: ~100-150 modified
- **Risk**: Low-Medium (localized change with clear semantics)
- **Testing**: Existing test suite should catch regressions

## Appendix: Generated Code Comparison

### Before (anyOf with 2 branches)

```javascript
const savedErrors3 = validate0.errors;
validate0.errors = undefined;
let subschemaValid4 = true;
subschemaValid4 = (function() {
  if (typeof data.bar !== 'number') {
    validate0.errors = [{ instancePath: '/bar', ... }];
    return false;
  }
  return true;
})();
validate0.errors = savedErrors3;
if (subschemaValid4) { props3["bar"] = true; matched2 = true; }

const savedErrors5 = validate0.errors;
validate0.errors = undefined;
let subschemaValid6 = true;
subschemaValid6 = (function() {
  if (typeof data.baz !== 'boolean') {
    validate0.errors = [{ instancePath: '/baz', ... }];
    return false;
  }
  return true;
})();
validate0.errors = savedErrors5;
if (subschemaValid6) { props3["baz"] = true; matched2 = true; }
```

**Lines: 24** | **IIFEs: 2** | **Property accesses: 8**

### After (Labeled Block)

```javascript
let _valid0 = true;
_check0: {
  if (typeof data.bar !== 'number') {
    _valid0 = false;
    break _check0;
  }
}
if (_valid0) { props3["bar"] = true; matched2 = true; }

let _valid1 = true;
_check1: {
  if (typeof data.baz !== 'boolean') {
    _valid1 = false;
    break _check1;
  }
}
if (_valid1) { props3["baz"] = true; matched2 = true; }
```

**Lines: 16** | **IIFEs: 0** | **Property accesses: 0**

### Improvement Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Lines of code | 24 | 16 | -33% |
| IIFEs | 2 | 0 | -100% |
| Property accesses | 8 | 0 | -100% |
| Function calls | 2 | 0 | -100% |

**Key benefits:**
- No IIFE (no function call overhead)
- No error save/restore (no property access overhead)
- Early exit preserved via labeled blocks
- Top-level validation still uses `return false` for fast failure
