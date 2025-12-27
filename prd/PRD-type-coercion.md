# PRD: Type Coercion

## Overview

Add type coercion capabilities to json-schema-ts, allowing the validator to automatically convert input values to their target types before validation. This is a common feature in form handling, API request processing, and configuration parsing where string inputs need to be converted to numbers, booleans, arrays, or other types.

## Problem Statement

When processing data from external sources (HTTP query params, form data, environment variables, CSV files), values often arrive as strings even when the schema expects other types:

```typescript
// Input from query params: { page: "1", active: "true" }
// Schema expects: { page: number, active: boolean }

const schema = schema({
  type: 'object',
  properties: {
    page: { type: 'integer' },
    active: { type: 'boolean' }
  }
});

// Currently fails validation - strings don't match expected types
schema.validate({ page: "1", active: "true" }); // false
```

Users must manually coerce types before validation, which is error-prone and repetitive.

## Goals

1. **Opt-in coercion** - Enable type coercion via configuration, disabled by default to maintain strict validation behavior
2. **Type-safe results** - Coerced values should match the inferred TypeScript types
3. **Predictable behavior** - Clear, well-documented coercion rules with no surprises
4. **Composable** - Works correctly with schema composition (`allOf`, `anyOf`, `oneOf`, `if-then-else`)
5. **Non-destructive** - Original input is not mutated; coerced data returned separately

## Non-Goals

1. **Lossy coercion** - No coercion that loses data (e.g., truncating strings, rounding numbers)
2. **Complex transformations** - No custom transformation functions (use preprocessing instead)
3. **Bidirectional coercion** - No serialization/encoding support (validation only)
4. **Format-based coercion** - No automatic Date object creation from `format: 'date-time'` strings

## API Design

### Configuration

Add a `coerce` option to `ValidatorOptions`:

```typescript
interface ValidatorOptions {
  formatAssertion?: boolean;
  coerce?: boolean | CoercionOptions;
}

interface CoercionOptions {
  // Enable/disable specific coercions (all true by default when coerce is enabled)
  string?: boolean;    // Coerce to string
  number?: boolean;    // Coerce to number/integer
  boolean?: boolean;   // Coerce to boolean
  null?: boolean;      // Coerce to null
  array?: boolean;     // Coerce to array (wrap single values)
}
```

### Usage

```typescript
// Enable all coercions
const validator = schema(mySchema, { coerce: true });

// Enable specific coercions only
const validator = schema(mySchema, {
  coerce: {
    number: true,
    boolean: true
  }
});

// Use parse() to get coerced data
const result = validator.parse({ page: "1", active: "true" });
// { ok: true, data: { page: 1, active: true } }
```

### New Method: `coerce()`

Add a standalone coercion method for cases where users want coerced data without validation:

```typescript
class Validator<T> {
  // Existing methods
  validate(data: unknown): data is T;
  parse(data: unknown): ParseResult<T>;
  assert(data: unknown): T;

  // New method - coerce without validation
  coerce(data: unknown): T;
}
```

## Coercion Rules

### String Coercion (`type: 'string'`)

| Input Type | Coercion | Example |
|------------|----------|---------|
| `number` | `String(value)` | `42` → `"42"` |
| `boolean` | `String(value)` | `true` → `"true"` |
| `null` | ❌ No coercion | - |
| `undefined` | ❌ No coercion | - |
| `object` | ❌ No coercion | - |
| `array` | ❌ No coercion | - |

### Number/Integer Coercion (`type: 'number'` or `type: 'integer'`)

| Input Type | Coercion | Example |
|------------|----------|---------|
| `string` (numeric) | `Number(value)` | `"42"` → `42` |
| `string` (empty) | ❌ No coercion | `""` stays `""` |
| `string` (non-numeric) | ❌ No coercion | `"abc"` stays `"abc"` |
| `boolean` | ❌ No coercion | - |
| `null` | ❌ No coercion | - |

For `type: 'integer'`:
- Only coerce strings that parse to integers (no decimal point)
- `"42.0"` → `42` (allowed, mathematically integer)
- `"42.5"` → ❌ No coercion (not an integer)

### Boolean Coercion (`type: 'boolean'`)

| Input Type | Coercion | Example |
|------------|----------|---------|
| `string` `"true"` | `true` | `"true"` → `true` |
| `string` `"false"` | `false` | `"false"` → `false` |
| `string` `"1"` | `true` | `"1"` → `true` |
| `string` `"0"` | `false` | `"0"` → `false` |
| `number` `1` | `true` | `1` → `true` |
| `number` `0` | `false` | `0` → `false` |
| Other strings | ❌ No coercion | `"yes"` stays `"yes"` |
| Other numbers | ❌ No coercion | `2` stays `2` |

### Null Coercion (`type: 'null'`)

| Input Type | Coercion | Example |
|------------|----------|---------|
| `string` `""` | `null` | `""` → `null` |
| `string` `"null"` | `null` | `"null"` → `null` |
| Other | ❌ No coercion | - |

### Array Coercion (`type: 'array'`)

| Input Type | Coercion | Example |
|------------|----------|---------|
| Non-array | Wrap in array | `"foo"` → `["foo"]` |
| `null` | ❌ No coercion | - |
| `undefined` | ❌ No coercion | - |

This is useful for query params where `?tag=foo` and `?tag=foo&tag=bar` should both work.

### Object Coercion

No automatic object coercion. Objects require explicit structure.

### Type Union Coercion (`type: ['string', 'number']`)

When multiple types are specified, attempt coercion in order of type array:
1. Try first type - if coercion succeeds and validates, use it
2. Try next type - continue until one works
3. If no coercion succeeds, use original value

## Implementation Details

### Coercion Timing

Coercion happens **before** validation, at each schema node:

```
Input → Coerce → Validate → Output
```

For nested schemas:
```
Object Input
  └─► Property "age"
        └─► Coerce string "42" to number 42
        └─► Validate against { type: 'integer', minimum: 0 }
```

### Recursive Coercion

Coercion must be applied recursively:
- Object properties are coerced individually
- Array items are coerced individually
- Nested schemas receive coerced values

### Composition Keyword Handling

#### `allOf`
- Coerce based on the intersection of types
- If schemas disagree on type, no coercion (let validation fail)

#### `anyOf` / `oneOf`
- Try each branch with coercion
- Use first branch where coercion + validation succeeds
- For `oneOf`, ensure exactly one branch matches after coercion

#### `if-then-else`
- Coerce based on the applicable branch (`then` or `else`)
- The `if` condition is evaluated on coerced data

### Const and Enum

```typescript
// With coerce: true
{ const: 42 }        // "42" coerced to 42, matches const
{ enum: [1, 2, 3] }  // "2" coerced to 2, matches enum
```

### Error Messages

When coercion is enabled but fails, error messages should indicate what was attempted:

```typescript
{
  path: '/age',
  message: 'Expected integer, got string "abc" (coercion failed)',
  keyword: 'type',
  value: 'abc'
}
```

## Type System Considerations

### Inferred Types Unchanged

Coercion does not affect type inference. The schema:

```typescript
const v = schema({ type: 'integer' }, { coerce: true });
```

Still infers `Validator<number>`. The coercion is a runtime convenience, not a type-level feature.

### Input Type for Coercing Validators

Consider adding a generic for the "loose" input type:

```typescript
// Future enhancement - not in initial scope
type Validator<T, TInput = T> = {
  parse(data: TInput): ParseResult<T>;
}
```

This would allow `parse()` to accept `string | number` when `number` coercion is enabled.

## Testing Strategy

### Unit Tests

1. **Coercion function tests** - Test each coercion rule in isolation
2. **Integration tests** - Test coercion with full validation pipeline
3. **Composition tests** - Test with `allOf`, `anyOf`, `oneOf`, `if-then-else`
4. **Edge cases** - Empty strings, `NaN`, `Infinity`, whitespace strings

### Type Tests

1. Verify inferred types are unchanged with coercion enabled
2. Verify `parse()` returns correctly typed data after coercion

## Migration & Compatibility

- **Backward compatible** - Coercion is opt-in, default behavior unchanged
- **No breaking changes** - All existing code continues to work

## Open Questions

1. **Whitespace handling** - Should `"  42  "` coerce to `42`? (Proposed: yes, trim whitespace for number coercion)

2. **Case sensitivity** - Should `"TRUE"` coerce to `true`? (Proposed: yes, case-insensitive for boolean strings)

3. **Scientific notation** - Should `"1e10"` coerce to `10000000000`? (Proposed: yes, valid number strings)

4. **Empty array** - Should `null` coerce to `[]` for array type? (Proposed: no, too implicit)

5. **Coercion + default** - How do `coerce` and `default` interact? (Proposed: coerce first, then apply default if still undefined)

## Success Metrics

1. All existing tests pass (no regressions)
2. Coercion test coverage > 95%
3. No performance regression > 10% for non-coercing validators
4. Clear documentation with examples

## Future Enhancements

1. **Custom coercers** - Allow user-defined coercion functions
2. **Strict mode** - Fail if coercion was needed (for detecting loose input)
3. **Coercion reporting** - Return metadata about what was coerced
4. **Format coercion** - Convert `format: 'date'` strings to Date objects (separate feature)

## References

- [Zod coercion](https://zod.dev/?id=coercion-for-primitives) - Similar feature in Zod
- [AJV coercion](https://ajv.js.org/coercion.html) - AJV's type coercion
- [JSON Schema type keyword](https://json-schema.org/understanding-json-schema/reference/type.html)
