# JIT Compiler Implementation Plan

## Overview

The current interpreter-based validator is ~100x slower than AJV because it:
1. Creates many intermediate objects (KeywordContext, KeywordResult, Sets for evaluated items)
2. Calls functions dynamically for each keyword
3. Uses generic code paths that can't be optimized by V8

The JIT compiler will generate specialized JavaScript code at schema compile time, similar to how AJV works.

## Hybrid Architecture (Key Design Decision)

**Allow mixing JIT and interpreter keywords** so we can:
1. Implement keywords incrementally
2. Run benchmarks after each keyword to measure progress
3. Fall back to interpreter for complex/unsupported keywords
4. Always maintain 100% compliance

The generated code will call into the interpreter for any keyword not yet JIT-compiled:

```javascript
function validate(data) {
  // JIT-compiled type check
  if (typeof data !== 'object' || data === null) return false;

  // Fallback to interpreter for complex keyword
  if (!interpreterValidate(data, unevaluatedPropsSchema)) return false;

  return true;
}
```

This means we can ship partial JIT and still pass all tests.

## Architecture

### Phase 1: Code Generator Foundation

Create `src/jit/` directory with:

1. **`codegen.ts`** - Code generation utilities
   - `CodeBuilder` class for building code strings with proper indentation
   - Variable name generation (unique names for nested scopes)
   - Path building helpers

2. **`context.ts`** - Compilation context
   - Track which schemas have been compiled (for $ref deduplication)
   - Variable name counters
   - Schema registry for lookups
   - Options (formatAssertion, etc.)

3. **`compiler.ts`** - Main compiler
   - `compile(schema) -> (data: unknown) => boolean`
   - Generates a validation function as a string
   - Uses `new Function()` to create the validator

### Phase 2: Keyword Code Generators

For each keyword, create a code generator that emits inline JavaScript:

**Validation Keywords:**
- `type` - `if (typeof data !== 'string') return false;`
- `const` - `if (!deepEqual(data, constValue)) return false;`
- `enum` - `if (!enumValues.some(v => deepEqual(data, v))) return false;`
- `minLength/maxLength` - `if ([...data].length < 3) return false;`
- `pattern` - `if (!/^pattern$/.test(data)) return false;`
- `minimum/maximum` - `if (data < 5) return false;`
- `minItems/maxItems` - `if (data.length < 1) return false;`
- `required` - `if (!('prop' in data)) return false;`

**Applicator Keywords:**
- `properties` - Inline property checks with recursive validation calls
- `items` - Loop over array items with inline validation
- `allOf` - Multiple inline checks
- `anyOf` - `if (check1(data) || check2(data)) ...`
- `oneOf` - Count matches, ensure exactly 1
- `$ref` - Call pre-compiled function for referenced schema

**Special Handling:**
- `unevaluatedProperties/Items` - Track evaluated paths during codegen
- `$dynamicRef` - Must use runtime lookup (can't fully JIT)

### Phase 3: Generated Code Structure

```javascript
// Generated for: { type: "object", properties: { name: { type: "string" } }, required: ["name"] }
function validate(data) {
  // Type check (with early exit)
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;

  // Required check
  if (!('name' in data)) return false;

  // Properties
  if ('name' in data) {
    if (typeof data.name !== 'string') return false;
  }

  return true;
}
```

### Phase 4: Integration

1. **`ValidatorJIT<T>`** class - Same interface as `Validator<T>`
   - `validate(data)` - Returns boolean (fast path)
   - `parse(data)` - Returns `ParseResult<T>` (with errors if needed)
   - `assert(data)` - Throws on invalid

2. **Hybrid JIT/Interpreter execution**:
   - JIT-compiled keywords execute inline
   - Unimplemented keywords call interpreter at runtime
   - `canJIT(schema)` checks which keywords are supported
   - Gradual migration: implement keywords one by one, benchmark each

3. **Benchmark adapter** - Add JIT adapter for comparison

## Implementation Order

Each step includes running benchmarks to measure progress:

1. **Core codegen utilities** (`codegen.ts`, `context.ts`) + hybrid fallback
2. **Compiler skeleton** with Function() invocation + interpreter fallback for all keywords
3. **`type` keyword** → benchmark (expect small improvement)
4. **`const`, `enum`** → benchmark
5. **String keywords** (`minLength`, `maxLength`, `pattern`) → benchmark
6. **Number keywords** (`minimum`, `maximum`, `multipleOf`, etc.) → benchmark
7. **Array constraints** (`minItems`, `maxItems`, `uniqueItems`) → benchmark
8. **Object constraints** (`required`, `minProperties`, `maxProperties`) → benchmark
9. **`properties`, `additionalProperties`, `patternProperties`** → benchmark (big impact expected)
10. **`items`, `prefixItems`** → benchmark (big impact expected)
11. **Composition keywords** (`allOf`, `anyOf`, `oneOf`, `not`, `if-then-else`) → benchmark
12. **`$ref` handling** (pre-compile referenced schemas) → benchmark
13. **Format validation** → benchmark
14. **`unevaluatedProperties/Items`** (may stay interpreter) → benchmark
15. **Error collection mode** for `parse()`

## Key Optimizations

1. **Inline everything** - No function calls in hot paths
2. **Early exits** - Return false as soon as possible
3. **Avoid object allocation** - No KeywordResult objects
4. **Pre-compute constants** - Regex patterns, enum sets
5. **Type narrowing** - After type check, assume type in subsequent code
6. **Skip unnecessary checks** - If type is "string", don't check array keywords

## Trade-offs

- **Compile time** - JIT adds overhead at schema compile time
- **Code size** - Generated functions can be large for complex schemas
- **Debug-ability** - Generated code is harder to debug
- **Memory** - Each compiled schema holds a function closure

## Success Metrics

- Within 2-5x of AJV performance (from current 100x gap)
- Pass all 1271 compliance tests
- Maintain type inference (T type parameter)
