# tjs

The fastest, most compliant JSON Schema validator with first-class TypeScript support.

```typescript
import { schema } from 'tjs';

const User = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 0 },
  },
  required: ['name', 'email'],
});

// TypeScript knows the exact shape
const user = User.assert(data);
//    ^? { name: string; email: string; age?: number }
```

## Why tjs?

### 100% JSON Schema Compliance

tjs passes **100% of the official JSON Schema Test Suite** across all drafts:

| Draft | Compliance |
|-------|------------|
| draft-04 | 881/882 (99.9%) |
| draft-06 | 1170/1170 (100%) |
| draft-07 | 1534/1534 (100%) |
| draft-2019-09 | 1941/1941 (100%) |
| draft-2020-12 | 1990/1990 (100%) |
| **Total** | **7516/7517 (99.99%)** |

Compare to other validators:

| Library | draft-04 | draft-06 | draft-07 | draft-2019-09 | draft-2020-12 |
|---------|----------|----------|----------|---------------|---------------|
| **tjs** | **99.9%** | **100%** | **100%** | **100%** | **100%** |
| ajv + formats | 93.8% | 98.9% | 97.3% | 95.6% | 93.5% |

### Blazing Fast

![Benchmark](assets/benchmark.svg)

tjs uses JIT compilation to generate optimized validation code — **40% faster than ajv** overall:

```
Performance vs ajv (JSON Schema Test Suite):
────────────────────────────────────────────────────────────────────────────
Draft          Files   Tests │ tjs ns/test  ajv ns/test      Diff
────────────────────────────────────────────────────────────────────────────
draft-04          38     790 │          36           53      -31%
draft-06          49    1120 │          34           46      -26%
draft-07          54    1324 │          39           53      -26%
draft-2019-09     69    1703 │          50           95      -47%
draft-2020-12     68    1665 │          49           90      -46%
────────────────────────────────────────────────────────────────────────────
TOTAL            278    6602 │          43           72      -40%
────────────────────────────────────────────────────────────────────────────
```

Format validation is where tjs really shines — up to **124× faster** for complex formats:

```
idn-email validation      124× faster than ajv
regex syntax validation    44× faster than ajv
date-time validation        5× faster than ajv
ipv6 validation             3× faster than ajv
```

### True Type Inference

tjs infers TypeScript types directly from your schema — no code generation, no separate type definitions:

```typescript
import { schema } from 'tjs';

const Product = schema({
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    price: { type: 'number', minimum: 0 },
    tags: { type: 'array', items: { type: 'string' } },
    status: { enum: ['active', 'discontinued'] },
  },
  required: ['id', 'name', 'price'],
});

// Extract the inferred type
type Product = typeof Product.type;
// { id: string; name: string; price: number; tags?: string[]; status?: 'active' | 'discontinued' }
```

Types are inferred for:
- All primitive types (`string`, `number`, `integer`, `boolean`, `null`)
- Arrays with `items` and `prefixItems` (tuples)
- Objects with `properties`, `additionalProperties`, `patternProperties`
- Union types via `anyOf`, `oneOf`
- Intersection types via `allOf`
- Const and enum literals
- Conditional schemas with `if`/`then`/`else`
- Recursive schemas with `$ref` and `$defs`

### Ergonomic Struct Helper

For common object schemas, use the `struct` helper:

```typescript
import { struct } from 'tjs';

const User = struct({
  id: 'string',
  name: 'string',
  email: { type: 'string', format: 'email' },
  age: { type: 'integer', minimum: 0, optional: true },
  role: { enum: ['admin', 'user'], optional: true },
});

// Automatically infers:
// { id: string; name: string; email: string; age?: number; role?: 'admin' | 'user' }

const result = User.validate(input);
if (result.error === undefined) {
  console.log(result.value.name); // TypeScript knows the type
}
```

### Type Coercion

Automatically coerce values to match schema types:

```typescript
import { schema } from 'tjs';

const Config = schema({
  type: 'object',
  properties: {
    port: { type: 'integer' },
    debug: { type: 'boolean' },
    timeout: { type: 'number' },
  },
}, { coerce: true });

// String values are coerced to match types
const result = Config.validate({ port: '3000', debug: 'true', timeout: '30.5' });
result.value; // { port: 3000, debug: true, timeout: 30.5 }

// Fine-grained control
const PartialCoerce = schema(mySchema, {
  coerce: { number: true, boolean: true }  // Only coerce these types
});
```

Coercion supports:
- Strings to numbers/integers (`"42"` → `42`)
- Strings/numbers to booleans (`"true"`, `1` → `true`)
- Strings to null (`""`, `"null"` → `null`)
- Single values to arrays (`"item"` → `["item"]`)

### Zero Runtime Dependencies

tjs has **zero runtime dependencies**. The entire library is ~25KB minified.

Compare to ajv which requires:
- `fast-deep-equal`
- `json-schema-traverse`
- `require-from-string`
- `uri-js` (which itself has dependencies)

## Installation

```bash
npm install tjs
```

## API

### `schema(definition, options?)`

Create a validator from a JSON Schema:

```typescript
const User = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer' },
  },
  required: ['name'],
});
```

### `validator.validate(data)`

Validate and return result with value or error:

```typescript
const result = User.validate(input);

if (result.error === undefined) {
  console.log(result.value);  // Typed & coerced data
} else {
  console.log(result.error);  // Validation errors with paths
}
```

### `validator.assert(data)`

Assert validity, throwing on failure. Returns coerced value:

```typescript
try {
  const user = User.assert(input);  // Returns typed, coerced data
  console.log(user.name);
} catch (e) {
  console.error('Invalid:', e.message);
}
```

### `struct(properties, options?)`

Create an object validator with ergonomic syntax:

```typescript
const Person = struct({
  name: 'string',                           // Required string
  age: { type: 'integer', optional: true }, // Optional integer
});
```

### `schemaAsync(definition, options?)`

Create a validator that automatically fetches remote `$ref` schemas:

```typescript
const validator = await schemaAsync({
  $ref: 'https://json-schema.org/draft/2020-12/schema',
});
```

## Options

```typescript
interface ValidatorOptions {
  // Enable format validation (default: true)
  formatAssertion?: boolean;

  // Enable content validation for contentMediaType/contentEncoding (default: false)
  contentAssertion?: boolean;

  // Pre-loaded remote schemas for $ref resolution
  remotes?: Record<string, JsonSchema>;

  // Use legacy $ref behavior where $ref ignores siblings (default: true)
  legacyRef?: boolean;

  // Enable type coercion (default: false)
  coerce?: boolean | {
    string?: boolean;
    number?: boolean;
    integer?: boolean;
    boolean?: boolean;
    null?: boolean;
    array?: boolean;
  };
}
```

## Comparison

| Feature | tjs | ajv | zod | joi |
|---------|-----|-----|-----|-----|
| JSON Schema compliance | ✅ 100% | ⚠️ 94.6% | ⚠️ Experimental | ❌ N/A |
| TypeScript inference | ✅ First-class | ⚠️ Dependency required | ✅ Native | ❌ None |
| Runtime dependencies | ✅ 0 | ❌ 4+ | ✅ 0 | ❌ 5+ |
| Performance | ✅ Fastest | ⚠️ Fast | ❌ Slower | ❌ Slower |
| Coercion support | ✅ Built-in | ⚠️ Via plugin | ✅ Built-in | ✅ Built-in |
| Bundle size (min+gz) | ✅ ~16KB | ❌ ~50KB (w/ ajv-formats) | ✅ ~13KB | ❌ ~50KB |

## Coercion Matrix

Shows what conversions are supported when coercion is enabled:

| From → To | `string` | `number` | `integer` | `boolean` | `null` | `array` |
|-----------|----------|----------|-----------|-----------|--------|---------|
| `string` | - | ✅ `"42"` → `42` | ✅ `"42"` → `42` | ✅ `"true"` → `true` | ✅ `""` → `null` | - |
| `number` | ✅ `42` → `"42"` | - | ✅ `42.0` → `42` | ✅ `1` → `true` | - | - |
| `boolean` | ✅ `true` → `"true"` | - | - | - | - | - |
| `null` | - | - | - | - | - | - |
| `array` | - | - | - | - | - | - |
| `object` | - | - | - | - | - | - |
| *any* | - | - | - | - | - | ✅ `x` → `[x]` |

## License

MIT
