# JSON Schema Validator with TypeScript Type Emission - PRD

## Overview

A single-function library that takes a JSON Schema and returns a typed validator. TypeScript types are inferred directly from the schema definition at compile time.

## Requirements

- **TypeScript 5.0+** — Required for `const` type parameters (eliminates need for `as const`)

## Dependencies

| Package | Purpose |
|---------|---------|
| [`type-fest`](https://github.com/sindresorhus/type-fest) | Provides `JsonValue`, `JsonObject`, `JsonArray`, `JsonPrimitive` types |

```bash
npm install type-fest
```

## Implementation Note

The `schema` function uses a `const` type parameter to automatically infer literal types:

```typescript
function schema<const T extends JsonSchema>(definition: T): Validator<Infer<T>>;
```

This eliminates the need for `as const` on every schema definition.

## API

```typescript
import { schema } from 'json-schema-ts';

const Person = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer' },
  },
  required: ['name'],
});

Person.validate(data);   // → boolean
Person.assert(data);     // → typed data or throws
Person.parse(data);      // → { ok, data } | { ok, errors }

type Person = typeof Person.type;
```

---

## JSON Schema to TypeScript Type Mapping

### Primitive Types

| JSON Schema | TypeScript |
|-------------|------------|
| `{ type: 'string' }` | `string` |
| `{ type: 'number' }` | `number` |
| `{ type: 'integer' }` | `number` |
| `{ type: 'boolean' }` | `boolean` |
| `{ type: 'null' }` | `null` |

```typescript
const S = schema({ type: 'string' });
type S = typeof S.type;  // string

const N = schema({ type: 'number' });
type N = typeof N.type;  // number

const I = schema({ type: 'integer' });
type I = typeof I.type;  // number

const B = schema({ type: 'boolean' });
type B = typeof B.type;  // boolean

const Null = schema({ type: 'null' });
type Null = typeof Null.type;  // null
```

### Const and Enum

| JSON Schema | TypeScript |
|-------------|------------|
| `{ const: 'foo' }` | `'foo'` |
| `{ const: 42 }` | `42` |
| `{ const: true }` | `true` |
| `{ enum: ['a', 'b', 'c'] }` | `'a' \| 'b' \| 'c'` |
| `{ enum: [1, 2, 3] }` | `1 \| 2 \| 3` |
| `{ enum: ['a', 1, null] }` | `'a' \| 1 \| null` |

```typescript
const Const = schema({ const: 'foo' });
type Const = typeof Const.type;  // 'foo'

const Enum = schema({ enum: ['a', 'b', 'c'] });
type Enum = typeof Enum.type;  // 'a' | 'b' | 'c'

const MixedEnum = schema({ enum: ['yes', 'no', 1, 0, null] });
type MixedEnum = typeof MixedEnum.type;  // 'yes' | 'no' | 1 | 0 | null
```

### Type Arrays (Union of Types)

| JSON Schema | TypeScript |
|-------------|------------|
| `{ type: ['string', 'null'] }` | `string \| null` |
| `{ type: ['string', 'number'] }` | `string \| number` |
| `{ type: ['string', 'number', 'null'] }` | `string \| number \| null` |

```typescript
const Nullable = schema({ type: ['string', 'null'] });
type Nullable = typeof Nullable.type;  // string | null

const Multi = schema({ type: ['string', 'number', 'boolean'] });
type Multi = typeof Multi.type;  // string | number | boolean
```

### Objects

| JSON Schema | TypeScript |
|-------------|------------|
| `{ type: 'object' }` | `Record<string, unknown>` |
| `{ type: 'object', properties: { ... } }` | `{ prop?: T, ... }` |
| `{ ..., required: ['prop'] }` | `{ prop: T, ... }` |
| `{ ..., additionalProperties: false }` | exact object type |
| `{ ..., additionalProperties: { type: 'string' } }` | `{ ... } & { [K in string as K extends KnownKeys ? never : K]: string }` |

```typescript
// Empty object
const Empty = schema({ type: 'object' });
type Empty = typeof Empty.type;  // Record<string, unknown>

// With properties (all optional by default)
const Obj = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
  },
});
type Obj = typeof Obj.type;  // { name?: string; age?: number }

// With required
const ObjReq = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
  },
  required: ['name'],
});
type ObjReq = typeof ObjReq.type;  // { name: string; age?: number }

// Additional properties typed
const Dict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: { type: 'number' },
});
type Dict = typeof Dict.type;  // { id: string } & { [K in string as K extends 'id' ? never : K]: number }

// Additional properties false (exact)
const Strict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  additionalProperties: false,
});
type Strict = typeof Strict.type;  // { id?: string }
```

### Arrays

| JSON Schema | TypeScript |
|-------------|------------|
| `{ type: 'array' }` | `unknown[]` |
| `{ type: 'array', items: { type: 'string' } }` | `string[]` |
| `{ type: 'array', items: false }` | `[]` |
| `{ type: 'array', prefixItems: [...] }` | `[T, U, ...]` |
| `{ type: 'array', prefixItems: [...], items: { type: T } }` | `[T, U, ...V[]]` |

```typescript
// Untyped array
const Arr = schema({ type: 'array' });
type Arr = typeof Arr.type;  // unknown[]

// Typed array
const StrArr = schema({
  type: 'array',
  items: { type: 'string' },
});
type StrArr = typeof StrArr.type;  // string[]

// Tuple
const Tuple = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'number' },
  ],
  items: false,
});
type Tuple = typeof Tuple.type;  // [string, number]

// Tuple with rest
const TupleRest = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
  ],
  items: { type: 'number' },
});
type TupleRest = typeof TupleRest.type;  // [string, ...number[]]
```

### Composition (anyOf, oneOf, allOf)

| JSON Schema | TypeScript |
|-------------|------------|
| `{ anyOf: [A, B] }` | `A \| B` |
| `{ oneOf: [A, B] }` | `A \| B` |
| `{ allOf: [A, B] }` | `A & B` |

```typescript
// anyOf → union
const AnyOf = schema({
  anyOf: [
    { type: 'string' },
    { type: 'number' },
  ],
});
type AnyOf = typeof AnyOf.type;  // string | number

// oneOf → union (same as anyOf for types)
const OneOf = schema({
  oneOf: [
    { type: 'object', properties: { kind: { const: 'a' }, a: { type: 'string' } }, required: ['kind'] },
    { type: 'object', properties: { kind: { const: 'b' }, b: { type: 'number' } }, required: ['kind'] },
  ],
});
type OneOf = typeof OneOf.type;  // { kind: 'a'; a?: string } | { kind: 'b'; b?: number }

// allOf → intersection
const AllOf = schema({
  allOf: [
    { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
    { type: 'object', properties: { age: { type: 'number' } }, required: ['age'] },
  ],
});
type AllOf = typeof AllOf.type;  // { name: string } & { age: number }
```

### Conditional (if/then/else)

| JSON Schema | TypeScript |
|-------------|------------|
| `{ if: A, then: B, else: C }` | `B \| C` |
| `{ if: A, then: B }` | `B \| BaseType` |

```typescript
const Conditional = schema({
  type: 'object',
  properties: {
    kind: { type: 'string' },
  },
  if: { properties: { kind: { const: 'premium' } } },
  then: { properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { properties: { trial: { type: 'boolean' } } },
});
type Conditional = typeof Conditional.type;
// { kind?: string; discount: number } | { kind?: string; trial?: boolean }
```

### References ($ref, $defs)

| JSON Schema | TypeScript |
|-------------|------------|
| `{ $ref: '#/$defs/Foo' }` | resolved type from `$defs.Foo` |
| `{ $defs: { Foo: ... } }` | internal type registry |

```typescript
const WithRefs = schema({
  $defs: {
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
      required: ['street', 'city'],
    },
  },
  type: 'object',
  properties: {
    home: { $ref: '#/$defs/Address' },
    work: { $ref: '#/$defs/Address' },
  },
});
type WithRefs = typeof WithRefs.type;
// { home?: { street: string; city: string }; work?: { street: string; city: string } }
```

### Not

The `not` keyword uses a `JsonValue` type to constrain valid JSON and then excludes the negated type.

| JSON Schema | TypeScript |
|-------------|------------|
| `{ not: { type: 'null' } }` | `JsonValue` (excludes `null`) |
| `{ not: { type: 'string' } }` | `JsonValue` (excludes `string`) |
| `{ not: { type: 'object' } }` | `JsonPrimitive \| JsonArray` |

```typescript
import type { JsonValue, JsonObject, JsonArray, JsonPrimitive } from 'type-fest';

// not null → all JSON values except null
const NotNull = schema({ not: { type: 'null' } });
type NotNull = typeof NotNull.type;  // string | number | boolean | JsonArray | JsonObject

// not string → all JSON values except string
const NotString = schema({ not: { type: 'string' } });
type NotString = typeof NotString.type;  // number | boolean | null | JsonArray | JsonObject

// not object → primitives and arrays only
const NotObject = schema({ not: { type: 'object' } });
type NotObject = typeof NotObject.type;  // JsonPrimitive | JsonArray

// Combining with type constraints
const NonNullString = schema({
  allOf: [
    { type: 'string' },
    { not: { const: '' } },
  ],
});
type NonNullString = typeof NonNullString.type;  // string (runtime validates non-empty)
```

### String Formats (Runtime Only)

Formats are validated at runtime but do not affect the TypeScript type.

| JSON Schema | TypeScript | Runtime Validation |
|-------------|------------|-------------------|
| `{ type: 'string', format: 'email' }` | `string` | validates email |
| `{ type: 'string', format: 'uuid' }` | `string` | validates UUID |
| `{ type: 'string', format: 'date-time' }` | `string` | validates ISO 8601 |
| `{ type: 'string', format: 'uri' }` | `string` | validates URI |
| `{ type: 'string', format: 'ipv4' }` | `string` | validates IPv4 |
| `{ type: 'string', format: 'ipv6' }` | `string` | validates IPv6 |

### Numeric Constraints (Runtime Only)

| JSON Schema | TypeScript | Runtime Validation |
|-------------|------------|-------------------|
| `{ type: 'number', minimum: 0 }` | `number` | validates >= 0 |
| `{ type: 'number', maximum: 100 }` | `number` | validates <= 100 |
| `{ type: 'number', exclusiveMinimum: 0 }` | `number` | validates > 0 |
| `{ type: 'number', multipleOf: 5 }` | `number` | validates divisibility |
| `{ type: 'integer' }` | `number` | validates whole number |

### String Constraints (Runtime Only)

| JSON Schema | TypeScript | Runtime Validation |
|-------------|------------|-------------------|
| `{ type: 'string', minLength: 1 }` | `string` | validates length >= 1 |
| `{ type: 'string', maxLength: 100 }` | `string` | validates length <= 100 |
| `{ type: 'string', pattern: '^[a-z]+$' }` | `string` | validates regex match |

### Array Constraints (Runtime Only)

| JSON Schema | TypeScript | Runtime Validation |
|-------------|------------|-------------------|
| `{ type: 'array', minItems: 1 }` | `T[]` | validates length >= 1 |
| `{ type: 'array', maxItems: 10 }` | `T[]` | validates length <= 10 |
| `{ type: 'array', uniqueItems: true }` | `T[]` | validates no duplicates |

---

## Type-Level Testing Strategy

### Approach

Use `@tsd` or `expect-type` to verify that inferred types match expected types at compile time. Tests should fail to compile if types are incorrect.

### Test Structure

```
tests/
  types/
    primitives.test-d.ts
    objects.test-d.ts
    arrays.test-d.ts
    composition.test-d.ts
    refs.test-d.ts
    edge-cases.test-d.ts
```

### Testing with `expect-type`

```typescript
// tests/types/primitives.test-d.ts
import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// String
const S = schema({ type: 'string' });
expectTypeOf<typeof S.type>().toEqualTypeOf<string>();

// Number
const N = schema({ type: 'number' });
expectTypeOf<typeof N.type>().toEqualTypeOf<number>();

// Integer maps to number
const I = schema({ type: 'integer' });
expectTypeOf<typeof I.type>().toEqualTypeOf<number>();

// Boolean
const B = schema({ type: 'boolean' });
expectTypeOf<typeof B.type>().toEqualTypeOf<boolean>();

// Null
const Null = schema({ type: 'null' });
expectTypeOf<typeof Null.type>().toEqualTypeOf<null>();
```

```typescript
// tests/types/objects.test-d.ts
import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// All optional
const Obj1 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});
expectTypeOf<typeof Obj1.type>().toEqualTypeOf<{ a?: string; b?: number }>();

// With required
const Obj2 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a'],
});
expectTypeOf<typeof Obj2.type>().toEqualTypeOf<{ a: string; b?: number }>();

// Nested
const Nested = schema({
  type: 'object',
  properties: {
    inner: {
      type: 'object',
      properties: {
        value: { type: 'string' },
      },
      required: ['value'],
    },
  },
  required: ['inner'],
});
expectTypeOf<typeof Nested.type>().toEqualTypeOf<{
  inner: { value: string };
}>();
```

```typescript
// tests/types/arrays.test-d.ts
import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// Simple array
const Arr = schema({
  type: 'array',
  items: { type: 'string' },
});
expectTypeOf<typeof Arr.type>().toEqualTypeOf<string[]>();

// Tuple
const Tuple = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }, { type: 'number' }],
  items: false,
});
expectTypeOf<typeof Tuple.type>().toEqualTypeOf<[string, number]>();

// Tuple with rest
const TupleRest = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }],
  items: { type: 'number' },
});
expectTypeOf<typeof TupleRest.type>().toEqualTypeOf<[string, ...number[]]>();
```

```typescript
// tests/types/composition.test-d.ts
import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// anyOf
const Union = schema({
  anyOf: [{ type: 'string' }, { type: 'number' }],
});
expectTypeOf<typeof Union.type>().toEqualTypeOf<string | number>();

// allOf
const Intersection = schema({
  allOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
  ],
});
expectTypeOf<typeof Intersection.type>().toEqualTypeOf<
  { a: string } & { b: number }
>();

// Enum
const Enum = schema({ enum: ['a', 'b', 'c'] });
expectTypeOf<typeof Enum.type>().toEqualTypeOf<'a' | 'b' | 'c'>();

// Const
const Const = schema({ const: 'literal' });
expectTypeOf<typeof Const.type>().toEqualTypeOf<'literal'>();
```

```typescript
// tests/types/refs.test-d.ts
import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

const WithDefs = schema({
  $defs: {
    Item: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  type: 'array',
  items: { $ref: '#/$defs/Item' },
});
expectTypeOf<typeof WithDefs.type>().toEqualTypeOf<{ id: string }[]>();
```

```typescript
// tests/types/edge-cases.test-d.ts
import { expectTypeOf } from 'expect-type';
import type { JsonValue, JsonObject, JsonArray } from 'type-fest';
import { schema } from 'json-schema-ts';

// Empty object
const Empty = schema({ type: 'object' });
expectTypeOf<typeof Empty.type>().toEqualTypeOf<Record<string, unknown>>();

// Untyped array
const UntypedArr = schema({ type: 'array' });
expectTypeOf<typeof UntypedArr.type>().toEqualTypeOf<unknown[]>();

// Nullable
const Nullable = schema({ type: ['string', 'null'] });
expectTypeOf<typeof Nullable.type>().toEqualTypeOf<string | null>();

// Not (excludes from JsonValue)
const NotNull = schema({ not: { type: 'null' } });
expectTypeOf<typeof NotNull.type>().toEqualTypeOf<string | number | boolean | JsonArray | JsonObject>();

const NotString = schema({ not: { type: 'string' } });
expectTypeOf<typeof NotString.type>().toEqualTypeOf<number | boolean | null | JsonArray | JsonObject>();

// Boolean schema
const True = schema(true);
expectTypeOf<typeof True.type>().toEqualTypeOf<unknown>();

const False = schema(false);
expectTypeOf<typeof False.type>().toEqualTypeOf<never>();
```

### Test Execution

```json
// package.json
{
  "scripts": {
    "test:types": "tsc --noEmit -p tests/types/tsconfig.json && vitest typecheck",
    "test:runtime": "vitest run",
    "test": "npm run test:types && npm run test:runtime"
  }
}
```

### CI Integration

```yaml
# .github/workflows/test.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:types
      - run: npm run test:runtime
```

---

## Summary

| Category | JSON Schema | TypeScript |
|----------|-------------|------------|
| Primitives | `type: 'string'` etc | `string`, `number`, `boolean`, `null` |
| Const | `const: 'x'` | `'x'` |
| Enum | `enum: ['a', 'b']` | `'a' \| 'b'` |
| Nullable | `type: ['string', 'null']` | `string \| null` |
| Object | `type: 'object', properties` | `{ key?: T }` |
| Required | `required: ['key']` | `{ key: T }` |
| Array | `type: 'array', items` | `T[]` |
| Tuple | `prefixItems` | `[T, U]` |
| Union | `anyOf`, `oneOf` | `A \| B` |
| Intersection | `allOf` | `A & B` |
| Ref | `$ref` | resolved type |
| Not | `not: { type: 'null' }` | `Exclude<JsonValue, null>` |
| Constraints | `minLength`, `minimum`, etc | runtime only |
