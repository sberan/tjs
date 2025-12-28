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
const user = User.parse(data);
//    ^? { name: string; email: string; age?: number }
```

## Why tjs?

### 100% JSON Schema Compliance

tjs passes **100% of the official JSON Schema Test Suite** across all drafts:

| Draft | Compliance |
|-------|------------|
| draft-04 | 613/613 (100%) |
| draft-06 | 832/832 (100%) |
| draft-07 | 916/916 (100%) |
| draft-2020-12 | 1271/1271 (100%) |
| **Total** | **3632/3632 (100%)** |

Compare to other validators:

| Library | draft-04 | draft-06 | draft-07 | draft-2020-12 | Total |
|---------|----------|----------|----------|---------------|-------|
| **tjs** | **100%** | **100%** | **100%** | **100%** | **100%** |
| ajv | 93.8% | 98.9% | 94.1% | 92.9% | 94.6% |

### Faster Than ajv

tjs uses JIT compilation to generate optimized validation code. Benchmarks show **53.8% faster performance on average**:

```
Performance vs ajv (JSON Schema Test Suite):
  draft-04:    173 faster, 5 slower   (+92.4% avg)
  draft-06:    242 faster, 33 slower  (+51.2% avg)
  draft-07:    274 faster, 38 slower  (+43.0% avg)
  draft-2020:  368 faster, 69 slower  (+47.5% avg)
  ────────────────────────────────────────────────
  Total:       1057 faster, 145 slower (+53.8% avg)
```

Top performers see 300-400% improvements:

```
anyOf with boolean schemas              +367%
allOf combined with anyOf, oneOf        +311%
small multiple of large integer         +242%
additionalProperties validation         +223%
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

if (User.validate(input)) {
  console.log(input.name); // TypeScript knows the type
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
Config.validate({ port: '3000', debug: 'true', timeout: '30.5' }); // true

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
| TypeScript inference | ✅ First-class | ⚠️ Via json-schema-to-ts | ✅ Native | ❌ None |
| Runtime dependencies | ✅ 0 | ❌ 4+ | ✅ 0 | ❌ 5+ |
| Performance | ✅ Fastest | ⚠️ Fast | ❌ Slower | ❌ Slower |
| Coercion support | ✅ Built-in | ⚠️ Via plugin | ✅ Built-in | ✅ Built-in |
| Bundle size (min+gz) | ✅ ~16KB | ❌ ~35KB | ✅ ~13KB | ❌ ~50KB |

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
