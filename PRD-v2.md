# JSON Schema Validator v2 - Missing Keywords & Type Mappings

This document extends the original PRD with keywords from the [JSON Schema 2020-12 specification](https://json-schema.org/draft/2020-12) that are not yet implemented.

---

## Missing Applicator Keywords (Affect Type Inference)

### `contains`

Validates that an array contains at least one item matching the schema.

| JSON Schema | TypeScript | Notes |
|-------------|------------|-------|
| `{ type: 'array', contains: { type: 'string' } }` | `unknown[]` | Type remains generic; runtime validates presence |
| `{ type: 'array', items: { type: 'number' }, contains: { const: 0 } }` | `number[]` | `items` dominates type; `contains` is runtime check |

```typescript
const HasString = schema({
  type: 'array',
  contains: { type: 'string' },
});
type HasString = typeof HasString.type;  // unknown[]
// Runtime: validates at least one element is a string

const HasZero = schema({
  type: 'array',
  items: { type: 'number' },
  contains: { const: 0 },
});
type HasZero = typeof HasZero.type;  // number[]
// Runtime: validates at least one element is 0
```

### `minContains` / `maxContains`

Works with `contains` to specify how many items must match.

| JSON Schema | TypeScript | Runtime |
|-------------|------------|---------|
| `{ contains: S, minContains: 2 }` | `unknown[]` | At least 2 items match S |
| `{ contains: S, maxContains: 5 }` | `unknown[]` | At most 5 items match S |
| `{ contains: S, minContains: 0 }` | `unknown[]` | Disables `contains` validation |

```typescript
const AtLeastTwo = schema({
  type: 'array',
  contains: { type: 'string' },
  minContains: 2,
});
type AtLeastTwo = typeof AtLeastTwo.type;  // unknown[]
```

### `patternProperties`

Validates object properties whose names match a regex pattern.

**Type-level inference IS possible** for common patterns using TypeScript's template literal types:

| JSON Schema | TypeScript | Notes |
|-------------|------------|-------|
| `{ patternProperties: { '^S_': { type: 'string' } } }` | `` { [K: `S_${string}`]: string } `` | Prefix patterns fully supported |
| `{ patternProperties: { '_id$': { type: 'string' } } }` | `` { [K: `${string}_id`]: string } `` | Suffix patterns fully supported |
| `{ patternProperties: { '^exact$': { type: 'string' } } }` | `{ exact: string }` | Exact match patterns supported |
| `{ patternProperties: { '[a-z]+': { type: 'string' } } }` | `{ [K: string]: string }` | Complex patterns fall back to `string` |

```typescript
const Prefixed = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  patternProperties: {
    '^S_': { type: 'string' },
    '^N_': { type: 'number' },
    '_date$': { type: 'string' },
  },
});
type Prefixed = typeof Prefixed.type;
// {
//   id?: string;
//   [K: `S_${string}`]: string;
//   [K: `N_${string}`]: number;
//   [K: `${string}_date`]: string;
// }

// TypeScript enforces patterns at compile time!
const obj: Prefixed = {
  id: 'abc',
  S_name: 'hello',       // ✓ matches ^S_
  N_count: 42,           // ✓ matches ^N_
  created_date: '2024',  // ✓ matches _date$
};
```

### `propertyNames`

Validates that all property names match a schema (typically string constraints).

| JSON Schema | TypeScript | Runtime |
|-------------|------------|---------|
| `{ propertyNames: { pattern: '^[a-z]+$' } }` | `Record<string, unknown>` | All keys must be lowercase |
| `{ propertyNames: { minLength: 2, maxLength: 10 } }` | `Record<string, unknown>` | Key length 2-10 chars |

```typescript
const LowerKeys = schema({
  type: 'object',
  propertyNames: {
    pattern: '^[a-z]+$',
  },
});
type LowerKeys = typeof LowerKeys.type;  // Record<string, unknown>
// Runtime: rejects { "Foo": 1 }, accepts { "foo": 1 }
```

### `dependentSchemas`

Applies additional schema constraints when a property is present.

| JSON Schema | TypeScript | Notes |
|-------------|------------|-------|
| `{ dependentSchemas: { foo: { required: ['bar'] } } }` | Base type | Could use conditional types |

```typescript
const Dependent = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    creditCard: { type: 'string' },
    billingAddress: { type: 'string' },
  },
  dependentSchemas: {
    creditCard: {
      required: ['billingAddress'],
    },
  },
});
type Dependent = typeof Dependent.type;
// { name?: string; creditCard?: string; billingAddress?: string }
// Runtime: if creditCard present, billingAddress required

// Advanced type inference (optional):
type DependentAdvanced =
  | { name?: string; creditCard?: never; billingAddress?: string }
  | { name?: string; creditCard: string; billingAddress: string };
```

### `unevaluatedProperties`

Catches properties not validated by `properties`, `patternProperties`, or schema composition.

| JSON Schema | TypeScript | Notes |
|-------------|------------|-------|
| `{ unevaluatedProperties: false }` | Exact object | Forbids extra props after composition |
| `{ allOf: [...], unevaluatedProperties: false }` | Intersection | Complex to track at type level |

```typescript
const Strict = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  unevaluatedProperties: false,
});
type Strict = typeof Strict.type;  // { name?: string }
// Unlike additionalProperties, works through allOf/anyOf

const Extended = schema({
  allOf: [
    { properties: { name: { type: 'string' } } },
    { properties: { age: { type: 'number' } } },
  ],
  unevaluatedProperties: false,
});
type Extended = typeof Extended.type;  // { name?: string } & { age?: number }
// Runtime: only name and age allowed, nothing else
```

### `unevaluatedItems`

Catches array items not validated by `prefixItems`, `items`, or `contains`.

| JSON Schema | TypeScript | Notes |
|-------------|------------|-------|
| `{ prefixItems: [...], unevaluatedItems: false }` | `[T, U]` | Strict tuple |
| `{ allOf: [...], unevaluatedItems: false }` | Complex | Tracks evaluated indices |

```typescript
const StrictTuple = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'number' },
  ],
  unevaluatedItems: false,
});
type StrictTuple = typeof StrictTuple.type;  // [string, number]
// Equivalent to items: false for simple cases
```

---

## Missing Validation Keywords (Runtime Only)

### Object Constraints

| Keyword | JSON Schema | Runtime Validation |
|---------|-------------|-------------------|
| `minProperties` | `{ minProperties: 1 }` | Object must have >= 1 property |
| `maxProperties` | `{ maxProperties: 10 }` | Object must have <= 10 properties |
| `dependentRequired` | `{ dependentRequired: { foo: ['bar'] } }` | If `foo` present, `bar` required |

```typescript
const NonEmpty = schema({
  type: 'object',
  minProperties: 1,
});
type NonEmpty = typeof NonEmpty.type;  // Record<string, unknown>
// Runtime: rejects {}

const Limited = schema({
  type: 'object',
  maxProperties: 5,
});
type Limited = typeof Limited.type;  // Record<string, unknown>
// Runtime: rejects objects with > 5 properties

const DepReq = schema({
  type: 'object',
  properties: {
    foo: { type: 'string' },
    bar: { type: 'number' },
    baz: { type: 'boolean' },
  },
  dependentRequired: {
    foo: ['bar', 'baz'],  // if foo present, bar and baz required
  },
});
type DepReq = typeof DepReq.type;  // { foo?: string; bar?: number; baz?: boolean }
```

---

## Missing Format Values

Current implementation supports: `email`, `uuid`, `date-time`, `uri`, `ipv4`, `ipv6`

### Standard Formats to Add

| Format | Description | Regex/Validation |
|--------|-------------|------------------|
| `date` | Full date (YYYY-MM-DD) | `^\d{4}-\d{2}-\d{2}$` + valid date |
| `time` | Time with offset | `^\d{2}:\d{2}:\d{2}` + timezone |
| `duration` | ISO 8601 duration | `^P(\d+Y)?(\d+M)?...` |
| `hostname` | Internet hostname | RFC 1123 |
| `idn-hostname` | Internationalized hostname | Unicode + punycode |
| `uri-reference` | URI or relative reference | RFC 3986 |
| `uri-template` | URI template | RFC 6570 |
| `iri` | Internationalized URI | RFC 3987 |
| `iri-reference` | IRI or relative reference | RFC 3987 |
| `json-pointer` | JSON Pointer | RFC 6901 |
| `relative-json-pointer` | Relative JSON Pointer | Draft spec |
| `regex` | ECMA-262 regex | Try `new RegExp()` |

```typescript
const Event = schema({
  type: 'object',
  properties: {
    date: { type: 'string', format: 'date' },
    time: { type: 'string', format: 'time' },
    duration: { type: 'string', format: 'duration' },
  },
});
type Event = typeof Event.type;  // { date?: string; time?: string; duration?: string }
```

---

## Missing Core Keywords

### `$id`

Sets the canonical URI for the schema.

```typescript
const Named = schema({
  $id: 'https://example.com/schemas/person',
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
});
// $id is metadata, doesn't affect types
```

### `$anchor`

Creates a plain-name fragment for referencing.

```typescript
const WithAnchor = schema({
  $defs: {
    Address: {
      $anchor: 'address',
      type: 'object',
      properties: {
        street: { type: 'string' },
      },
    },
  },
  type: 'object',
  properties: {
    home: { $ref: '#address' },  // reference by anchor
  },
});
```

### `$dynamicRef` / `$dynamicAnchor`

Enables extensible recursive schemas.

| JSON Schema | TypeScript | Notes |
|-------------|------------|-------|
| `{ $dynamicRef: '#node' }` | Resolved type | Dynamic resolution at runtime |
| `{ $dynamicAnchor: 'node' }` | N/A | Marks extension point |

```typescript
// Base tree schema
const TreeBase = schema({
  $id: 'https://example.com/tree',
  $dynamicAnchor: 'node',
  type: 'object',
  properties: {
    value: { type: 'string' },
    children: {
      type: 'array',
      items: { $dynamicRef: '#node' },
    },
  },
});

// Extended with additional properties
const ExtendedTree = schema({
  $id: 'https://example.com/extended-tree',
  $ref: 'https://example.com/tree',
  $dynamicAnchor: 'node',
  properties: {
    metadata: { type: 'object' },
  },
});
```

---

## Missing Meta-Data Keywords (Annotations)

These keywords are purely informational and don't affect types or validation.

| Keyword | Purpose | Example |
|---------|---------|---------|
| `title` | Human-readable name | `"title": "User Profile"` |
| `description` | Detailed explanation | `"description": "A user's profile data"` |
| `default` | Default value hint | `"default": "anonymous"` |
| `deprecated` | Mark as deprecated | `"deprecated": true` |
| `examples` | Example values | `"examples": ["foo", "bar"]` |
| `readOnly` | Clients shouldn't modify | `"readOnly": true` |
| `writeOnly` | Value hidden in responses | `"writeOnly": true` |

```typescript
const User = schema({
  type: 'object',
  title: 'User',
  description: 'A registered user account',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      readOnly: true,
    },
    password: {
      type: 'string',
      writeOnly: true,
      minLength: 8,
    },
    role: {
      type: 'string',
      enum: ['user', 'admin'],
      default: 'user',
      deprecated: false,
    },
    legacyField: {
      type: 'string',
      deprecated: true,
      description: 'Use newField instead',
    },
  },
});
type User = typeof User.type;  // { id?: string; password?: string; role?: 'user' | 'admin'; legacyField?: string }
```

---

## Missing Content Keywords

For validating encoded content (e.g., base64-encoded JSON).

| Keyword | Purpose | Example |
|---------|---------|---------|
| `contentEncoding` | How content is encoded | `"base64"`, `"quoted-printable"` |
| `contentMediaType` | MIME type of content | `"application/json"`, `"image/png"` |
| `contentSchema` | Schema for decoded content | Any JSON Schema |

```typescript
const EncodedData = schema({
  type: 'string',
  contentEncoding: 'base64',
  contentMediaType: 'application/json',
  contentSchema: {
    type: 'object',
    properties: {
      nested: { type: 'string' },
    },
  },
});
type EncodedData = typeof EncodedData.type;  // string
// Runtime: decode base64, parse JSON, validate against contentSchema
```

---

## Type Mapping Summary

### Keywords That Affect Type Inference

| Keyword | Current | Proposed Type |
|---------|---------|---------------|
| `contains` | ❌ | No change to array type |
| `patternProperties` | ❌ | **Template literal index signatures** (e.g., `` [K: `S_${string}`]: T ``) |
| `propertyNames` | ❌ | No change |
| `dependentSchemas` | ❌ | Optional: conditional types |
| `unevaluatedProperties` | ❌ | Same as `additionalProperties: false` |
| `unevaluatedItems` | ❌ | Same as `items: false` for tuples |
| `$dynamicRef` | ❌ | Resolved type from anchor |
| `$anchor` | ❌ | Reference target |

### Keywords That Are Runtime-Only

| Keyword | Validation |
|---------|------------|
| `minContains` | Min items matching `contains` |
| `maxContains` | Max items matching `contains` |
| `minProperties` | Min property count |
| `maxProperties` | Max property count |
| `dependentRequired` | Conditional required properties |
| `contentEncoding` | Decode before validating |
| `contentMediaType` | Parse as MIME type |
| `contentSchema` | Validate decoded content |

### Keywords That Are Annotations Only

| Keyword | Purpose |
|---------|---------|
| `title` | Display name |
| `description` | Documentation |
| `default` | Default value hint |
| `deprecated` | Deprecation marker |
| `examples` | Example values |
| `readOnly` | Client hint |
| `writeOnly` | Client hint |
| `$id` | Schema URI |
| `$comment` | Developer notes |

---

## Implementation Priority

### Phase 1: High Value, Low Complexity ✅ COMPLETE

1. **`minProperties` / `maxProperties`** - ✅ Implemented
2. **`dependentRequired`** - ✅ Implemented
3. **`contains` / `minContains` / `maxContains`** - ✅ Implemented
4. **Missing formats** - ✅ Implemented (`date`, `time`, `duration`, `hostname`, `uri-reference`, `json-pointer`, `relative-json-pointer`, `regex`)
5. **Annotation keywords** - ✅ Implemented (`title`, `description`, `default`, `deprecated`, `examples`, `readOnly`, `writeOnly`, `$comment`, `$id`)

### Phase 2: Medium Complexity ✅ COMPLETE

1. **`patternProperties`** - ✅ Implemented (runtime only, no type inference)
2. **`propertyNames`** - ✅ Implemented
3. **`$anchor`** - ✅ Implemented

### Phase 3: High Complexity ✅ COMPLETE

1. **`dependentSchemas`** - ✅ Implemented
2. **`unevaluatedProperties`** - ✅ Implemented (with evaluation tracking through composition)
3. **`unevaluatedItems`** - ✅ Implemented (with evaluation tracking through composition)
4. **`$dynamicRef` / `$dynamicAnchor`** - ⏸️ Deferred (rarely needed, complex semantics)
5. **`contentEncoding` / `contentMediaType` / `contentSchema`** - ✅ Implemented (base64, application/json)

---

## Implementation Details

This section provides concrete implementation guidance for each missing keyword.

### Phase 1 Implementations

#### `minProperties` / `maxProperties`

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  minProperties?: number;
  maxProperties?: number;
}
```

**validator.ts changes:**
```typescript
#validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const keys = Object.keys(data);

  // Add at start of method
  if (schema.minProperties !== undefined && keys.length < schema.minProperties) {
    errors.push({
      path,
      message: `Object must have at least ${schema.minProperties} properties`,
      keyword: 'minProperties',
      value: keys.length,
    });
  }
  if (schema.maxProperties !== undefined && keys.length > schema.maxProperties) {
    errors.push({
      path,
      message: `Object must have at most ${schema.maxProperties} properties`,
      keyword: 'maxProperties',
      value: keys.length,
    });
  }

  // ... rest of existing validation
}
```

**Complexity:** Low - Simple numeric comparison on `Object.keys(data).length`

---

#### `dependentRequired`

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  dependentRequired?: Record<string, readonly string[]>;
}
```

**validator.ts changes:**
```typescript
#validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationError[] {
  // ... existing validation

  // Add after required validation
  if (schema.dependentRequired) {
    for (const [trigger, dependents] of Object.entries(schema.dependentRequired)) {
      if (trigger in data) {
        for (const dependent of dependents) {
          if (!(dependent in data)) {
            errors.push({
              path: path ? `${path}.${dependent}` : dependent,
              message: `Property "${dependent}" is required when "${trigger}" is present`,
              keyword: 'dependentRequired',
            });
          }
        }
      }
    }
  }

  // ... rest of existing validation
}
```

**Complexity:** Low - Iterate over trigger keys, check if dependents exist

---

#### `contains`

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  contains?: JsonSchema;
  minContains?: number;
  maxContains?: number;
}
```

**validator.ts changes:**
```typescript
#validateArray(data: unknown[], schema: JsonSchemaBase, path: string): ValidationError[] {
  // ... existing validation

  // Add after uniqueItems validation
  if (schema.contains) {
    const minContains = schema.minContains ?? 1;
    const maxContains = schema.maxContains ?? Infinity;

    // minContains: 0 disables contains validation
    if (minContains === 0) {
      // Skip contains validation entirely
    } else {
      let matchCount = 0;
      for (let i = 0; i < data.length; i++) {
        if (this.#validate(data[i], schema.contains, `${path}[${i}]`).length === 0) {
          matchCount++;
        }
      }

      if (matchCount < minContains) {
        errors.push({
          path,
          message: `Array must contain at least ${minContains} item(s) matching the contains schema`,
          keyword: 'contains',
          value: matchCount,
        });
      }
      if (matchCount > maxContains) {
        errors.push({
          path,
          message: `Array must contain at most ${maxContains} item(s) matching the contains schema`,
          keyword: 'maxContains',
          value: matchCount,
        });
      }
    }
  }

  // ... rest of existing validation
}
```

**Complexity:** Medium - Must validate each item against contains schema, track count

---

#### Missing Formats

**Files to modify:** `validator.ts`

**validator.ts changes:**
```typescript
#validateFormat(data: string, format: string, path: string): ValidationError | null {
  const formatValidators: Record<string, (s: string) => boolean> = {
    // Existing
    email: s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
    uuid: s => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s),
    'date-time': s => !isNaN(Date.parse(s)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s),
    uri: s => /^[a-z][a-z\d+.-]*:\/\/.+$/i.test(s),
    ipv4: s => /^(\d{1,3}\.){3}\d{1,3}$/.test(s) && s.split('.').every(n => parseInt(n) <= 255),
    ipv6: s => /^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i.test(s),

    // New formats
    date: s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s)),
    time: s => /^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(s),
    duration: s => /^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/.test(s) && s !== 'P',
    hostname: s => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(s),
    'uri-reference': s => {
      try {
        // Can be absolute or relative
        new URL(s, 'http://example.com');
        return true;
      } catch {
        return false;
      }
    },
    'json-pointer': s => s === '' || /^(\/([^~/]|~0|~1)*)*$/.test(s),
    'relative-json-pointer': s => /^\d+(#|\/([^~/]|~0|~1)*)?$/.test(s),
    regex: s => {
      try {
        new RegExp(s);
        return true;
      } catch {
        return false;
      }
    },
  };

  const validator = formatValidators[format];
  if (validator && !validator(data)) {
    return { path, message: `Invalid ${format} format`, keyword: 'format', value: data };
  }
  return null;
}
```

**Complexity:** Low-Medium - Regex patterns, some require try/catch for validation

---

#### Annotation Keywords

**Files to modify:** `types.ts` only (no validation needed)

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields

  // Annotations (no validation, metadata only)
  title?: string;
  description?: string;
  default?: JsonValue;
  deprecated?: boolean;
  examples?: readonly JsonValue[];
  readOnly?: boolean;
  writeOnly?: boolean;
  $comment?: string;
  $id?: string;
}
```

**Complexity:** None - Just type definitions, no validation logic

---

### Phase 2 Implementations

#### `patternProperties`

**Files to modify:** `types.ts`, `validator.ts`, `infer.ts`

##### Type-Level Pattern Matching with Template Literals

TypeScript's template literal types can handle common regex patterns at compile time. While we can't support arbitrary regex, we CAN support the patterns that cover 90%+ of real-world use cases:

| Regex Pattern | Template Literal Type | Example Keys |
|---------------|----------------------|--------------|
| `^prefix` | `` `prefix${string}` `` | `prefixFoo`, `prefixBar` |
| `suffix$` | `` `${string}suffix` `` | `fooSuffix`, `barSuffix` |
| `^exact$` | `"exact"` | `exact` |
| `^pre.*suf$` | `` `pre${string}suf` `` | `preFooSuf`, `preBarSuf` |

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  patternProperties?: Record<string, JsonSchema>;
}
```

**infer.ts changes - Pattern to Template Literal Type:**
```typescript
// Convert regex pattern string to template literal type
// Supports common prefix/suffix patterns
type PatternToTemplateLiteral<P extends string> =
  // ^prefix$ → exact match
  P extends `^${infer Exact}$`
    ? Exact
  // ^prefix → starts with
  : P extends `^${infer Prefix}`
    ? `${Prefix}${string}`
  // suffix$ → ends with
  : P extends `${infer Suffix}$`
    ? `${string}${Suffix}`
  // Unsupported pattern → fall back to string
  : string;

// Build index signature from patternProperties
type InferPatternProperties<
  PP extends Record<string, JsonSchema>,
  Defs
> = {
  [Pattern in keyof PP as PatternToTemplateLiteral<Pattern & string>]: Infer<PP[Pattern], Defs>;
};

// Example usage in InferObject:
type InferObject<S extends JsonSchemaBase, Defs> =
  S extends { properties: infer P extends Record<string, JsonSchema> }
    ? S extends { patternProperties: infer PP extends Record<string, JsonSchema> }
      ? BuildObject<P, S['required'] extends readonly string[] ? S['required'] : [], Defs>
        & InferPatternProperties<PP, Defs>
      : BuildObject<P, S['required'] extends readonly string[] ? S['required'] : [], Defs>
    : S extends { patternProperties: infer PP extends Record<string, JsonSchema> }
      ? InferPatternProperties<PP, Defs>
      : Record<string, unknown>;
```

**Result:**
```typescript
const Schema = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  patternProperties: {
    '^S_': { type: 'string' },
    '^N_': { type: 'number' },
    '_date$': { type: 'string' },
  },
});

// Inferred type:
type Result = {
  id?: string;
} & {
  [K: `S_${string}`]: string;
  [K: `N_${string}`]: number;
  [K: `${string}_date`]: string;
};

// TypeScript enforces the patterns!
const obj: Result = {
  id: 'abc',
  S_name: 'hello',     // ✓ matches ^S_
  N_count: 42,         // ✓ matches ^N_
  created_date: '2024', // ✓ matches _date$
  // @ts-error: random: 'x'  // ✗ doesn't match any pattern
};
```

**Advanced: More Complex Patterns**

For patterns beyond simple prefix/suffix, we can extend the parser:

```typescript
// Handle alternation: ^(foo|bar)
type ParseAlternation<P extends string> =
  P extends `^(${infer Options})$`
    ? Options extends `${infer A}|${infer B}`
      ? A | ParseAlternation<`^(${B})$`>
      : Options
    : never;

// Handle character classes (limited): ^[a-z]+$
// This is where it gets tricky - we can't enumerate all possibilities
// But we CAN handle known patterns like ^[A-Z]{2}$ for 2-letter codes
type TwoLetterCode = `${Uppercase<string>}${Uppercase<string>}`;
```

**Limitations:**
- Character classes `[a-z]` → falls back to `string`
- Quantifiers `+`, `*`, `{n}` → can't enumerate at type level
- Complex alternation → may hit TypeScript recursion limits
- Lookahead/lookbehind → not supported

**Fallback behavior:** Unsupported patterns fall back to `string` key type with a `// @ts-expect-pattern-unsupported` comment in the type.

**validator.ts changes:**
```typescript
#validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationError[] {
  // ... existing validation

  // Track which keys have been validated (for unevaluatedProperties later)
  const evaluatedKeys = new Set<string>(Object.keys(schema.properties ?? {}));

  // After properties validation, add patternProperties
  if (schema.patternProperties) {
    for (const [pattern, propSchema] of Object.entries(schema.patternProperties)) {
      const regex = new RegExp(pattern);
      for (const [key, value] of Object.entries(data)) {
        if (regex.test(key)) {
          evaluatedKeys.add(key);
          errors.push(...this.#validate(value, propSchema, path ? `${path}.${key}` : key));
        }
      }
    }
  }

  // Modify additionalProperties to exclude patternProperties matches
  if (schema.additionalProperties !== undefined) {
    for (const [key, value] of Object.entries(data)) {
      if (!evaluatedKeys.has(key)) {
        if (schema.additionalProperties === false) {
          errors.push({
            path: path ? `${path}.${key}` : key,
            message: 'Additional property is not allowed',
            keyword: 'additionalProperties',
            value,
          });
        } else if (typeof schema.additionalProperties === 'object') {
          errors.push(...this.#validate(value, schema.additionalProperties, path ? `${path}.${key}` : key));
        }
      }
    }
  }

  // ... rest of existing validation
}
```

**Complexity:** Medium for runtime, Medium-High for type inference

**Design decisions:**
1. Pre-compile regex patterns in constructor for performance
2. Support common prefix/suffix patterns at type level
3. Fall back gracefully for complex patterns
4. Consider optional dependency on [ArkType's ArkRegex](https://arktype.io/docs/blog/arkregex) for full regex support

---

#### `propertyNames`

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  propertyNames?: JsonSchema;
}
```

**validator.ts changes:**
```typescript
#validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationError[] {
  // ... existing validation

  // Add property name validation
  if (schema.propertyNames) {
    for (const key of Object.keys(data)) {
      // propertyNames validates the key as a string value
      const keyErrors = this.#validate(key, schema.propertyNames, `${path}[propertyName:${key}]`);
      for (const err of keyErrors) {
        errors.push({
          ...err,
          message: `Property name "${key}" is invalid: ${err.message}`,
          keyword: 'propertyNames',
        });
      }
    }
  }

  // ... rest of existing validation
}
```

**Complexity:** Low - Validate each key as a string against the schema

---

#### `$anchor`

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  $anchor?: string;
}
```

**validator.ts changes:**
```typescript
export class Validator<T> {
  readonly #schema: JsonSchema;
  readonly #defs: Record<string, JsonSchema>;
  readonly #anchors: Map<string, JsonSchema>;  // NEW

  constructor(schema: JsonSchema) {
    this.#schema = schema;
    this.#defs = typeof schema === 'object' && schema.$defs ? schema.$defs : {};
    this.#anchors = new Map();

    // Build anchor map during construction
    this.#collectAnchors(schema);
  }

  #collectAnchors(schema: JsonSchema): void {
    if (typeof schema !== 'object') return;

    if (schema.$anchor) {
      this.#anchors.set(schema.$anchor, schema);
    }

    // Recurse into all subschemas
    if (schema.$defs) {
      for (const def of Object.values(schema.$defs)) {
        this.#collectAnchors(def);
      }
    }
    if (schema.properties) {
      for (const prop of Object.values(schema.properties)) {
        this.#collectAnchors(prop);
      }
    }
    // ... etc for items, prefixItems, anyOf, oneOf, allOf, etc.
  }

  #resolveRef(ref: string): JsonSchema | undefined {
    // Existing: #/$defs/Name
    const defsMatch = ref.match(/^#\/\$defs\/(.+)$/);
    if (defsMatch && defsMatch[1] in this.#defs) {
      return this.#defs[defsMatch[1]];
    }

    // NEW: #anchorName
    const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      return this.#anchors.get(anchorMatch[1]);
    }

    return undefined;
  }
}
```

**infer.ts changes:**
```typescript
// Handle $ref resolution - add anchor support
type InferRef<R extends string, Defs, Anchors> =
  R extends `#/$defs/${infer Name}`
    ? Name extends keyof Defs
      ? Defs[Name] extends JsonSchema
        ? Infer<Defs[Name], Defs>
        : unknown
      : unknown
    : R extends `#${infer AnchorName}`
      ? AnchorName extends keyof Anchors
        ? Anchors[AnchorName] extends JsonSchema
          ? Infer<Anchors[AnchorName], Defs>
          : unknown
        : unknown
      : unknown;
```

**Complexity:** Medium - Requires collecting anchors during construction, modifying ref resolution

**Design decision:** Anchors should be collected once at construction time and stored in a Map for O(1) lookup.

---

### Phase 3 Implementations

#### `dependentSchemas`

**Files to modify:** `types.ts`, `validator.ts`, `infer.ts` (optional advanced types)

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  dependentSchemas?: Record<string, JsonSchema>;
}
```

**validator.ts changes:**
```typescript
#validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationError[] {
  // ... existing validation

  // Apply dependent schemas when trigger property exists
  if (schema.dependentSchemas) {
    for (const [trigger, dependentSchema] of Object.entries(schema.dependentSchemas)) {
      if (trigger in data) {
        // The dependent schema applies to the entire object, not just the trigger
        errors.push(...this.#validate(data, dependentSchema, path));
      }
    }
  }

  // ... rest of existing validation
}
```

**infer.ts changes (advanced, optional):**
```typescript
// This creates a discriminated union based on property presence
// Very complex to implement correctly at the type level
type InferDependentSchemas<
  Base,
  DependentSchemas extends Record<string, JsonSchema>,
  Defs
> = {
  [K in keyof DependentSchemas]:
    K extends string
      ? (Base & { [P in K]: unknown } & Infer<DependentSchemas[K], Defs>)
      : never
}[keyof DependentSchemas] | Omit<Base, keyof DependentSchemas>;

// Likely too complex for practical use - recommend runtime-only
```

**Complexity:** High for types - Runtime is straightforward, but type-level inference of conditional schemas based on property presence is complex and may hit TypeScript limits

**Recommendation:** Implement runtime validation only. Type inference for dependentSchemas is a "nice to have" that adds significant complexity for marginal benefit.

---

#### `unevaluatedProperties`

**Files to modify:** `types.ts`, `validator.ts`

This is the most complex keyword to implement correctly because it requires tracking which properties have been "evaluated" through all schema composition keywords.

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  unevaluatedProperties?: boolean | JsonSchema;
}
```

**validator.ts approach:**

The key insight is that "evaluated" means "validated against some schema". We need to track which keys have been validated by:
- `properties`
- `patternProperties`
- `additionalProperties`
- Subschemas in `allOf`, `anyOf`, `oneOf`, `if/then/else`

```typescript
// Change validate methods to return both errors AND evaluated keys
interface ValidationResult {
  errors: ValidationError[];
  evaluatedProperties?: Set<string>;
  evaluatedItems?: Set<number>;
}

#validateWithTracking(
  data: unknown,
  schema: JsonSchema,
  path: string
): ValidationResult {
  // ... validation logic that tracks evaluated keys
}

#validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationResult {
  const errors: ValidationError[] = [];
  const evaluatedProperties = new Set<string>();

  // Track properties
  if (schema.properties) {
    for (const key of Object.keys(schema.properties)) {
      if (key in data) {
        evaluatedProperties.add(key);
        // ... validate
      }
    }
  }

  // Track patternProperties
  if (schema.patternProperties) {
    for (const [pattern, propSchema] of Object.entries(schema.patternProperties)) {
      const regex = new RegExp(pattern);
      for (const key of Object.keys(data)) {
        if (regex.test(key)) {
          evaluatedProperties.add(key);
          // ... validate
        }
      }
    }
  }

  // Track additionalProperties
  if (schema.additionalProperties !== undefined && schema.additionalProperties !== false) {
    for (const key of Object.keys(data)) {
      if (!evaluatedProperties.has(key)) {
        evaluatedProperties.add(key);
        // ... validate
      }
    }
  }

  // Merge evaluated keys from allOf subschemas
  if (schema.allOf) {
    for (const subSchema of schema.allOf) {
      const result = this.#validateWithTracking(data, subSchema, path);
      errors.push(...result.errors);
      if (result.evaluatedProperties) {
        for (const key of result.evaluatedProperties) {
          evaluatedProperties.add(key);
        }
      }
    }
  }

  // Finally check unevaluatedProperties
  if (schema.unevaluatedProperties !== undefined) {
    for (const [key, value] of Object.entries(data)) {
      if (!evaluatedProperties.has(key)) {
        if (schema.unevaluatedProperties === false) {
          errors.push({
            path: path ? `${path}.${key}` : key,
            message: 'Unevaluated property is not allowed',
            keyword: 'unevaluatedProperties',
            value,
          });
        } else if (typeof schema.unevaluatedProperties === 'object') {
          errors.push(...this.#validate(value, schema.unevaluatedProperties, path ? `${path}.${key}` : key));
        }
      }
    }
  }

  return { errors, evaluatedProperties };
}
```

**Complexity:** Very High - Requires refactoring validation to track evaluated properties through all composition paths

**Breaking change:** The internal validation API changes to return evaluation tracking info. This is an internal change but affects the architecture significantly.

---

#### `unevaluatedItems`

Similar to `unevaluatedProperties` but for arrays.

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  unevaluatedItems?: boolean | JsonSchema;
}
```

**validator.ts approach:**

Track evaluated indices through:
- `prefixItems` (indices 0 to length-1)
- `items` (all indices from prefixItems.length onwards)
- `contains` (indices that matched)
- Subschemas in composition keywords

```typescript
#validateArray(data: unknown[], schema: JsonSchemaBase, path: string): ValidationResult {
  const errors: ValidationError[] = [];
  const evaluatedItems = new Set<number>();

  // Track prefixItems
  if (schema.prefixItems) {
    for (let i = 0; i < schema.prefixItems.length && i < data.length; i++) {
      evaluatedItems.add(i);
      // ... validate
    }
  }

  // Track items (validates all remaining indices)
  if (schema.items !== undefined && schema.items !== false) {
    const startIndex = schema.prefixItems?.length ?? 0;
    for (let i = startIndex; i < data.length; i++) {
      evaluatedItems.add(i);
      // ... validate
    }
  }

  // Track contains matches
  if (schema.contains) {
    for (let i = 0; i < data.length; i++) {
      if (this.#validate(data[i], schema.contains, `${path}[${i}]`).length === 0) {
        evaluatedItems.add(i);
      }
    }
  }

  // Merge from allOf subschemas
  // ...

  // Check unevaluatedItems
  if (schema.unevaluatedItems !== undefined) {
    for (let i = 0; i < data.length; i++) {
      if (!evaluatedItems.has(i)) {
        if (schema.unevaluatedItems === false) {
          errors.push({
            path: `${path}[${i}]`,
            message: 'Unevaluated item is not allowed',
            keyword: 'unevaluatedItems',
            value: data[i],
          });
        } else if (typeof schema.unevaluatedItems === 'object') {
          errors.push(...this.#validate(data[i], schema.unevaluatedItems, `${path}[${i}]`));
        }
      }
    }
  }

  return { errors, evaluatedItems };
}
```

**Complexity:** Very High - Same architectural changes as unevaluatedProperties

---

#### `$dynamicRef` / `$dynamicAnchor`

This is the most complex feature in JSON Schema 2020-12. It enables "open" recursive schemas that can be extended.

**Concept:**
- `$dynamicAnchor: "node"` marks a schema as an extension point
- `$dynamicRef: "#node"` resolves to the *outermost* `$dynamicAnchor` with that name in the current evaluation path

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  $dynamicRef?: string;
  $dynamicAnchor?: string;
}
```

**validator.ts approach:**

```typescript
export class Validator<T> {
  // ... existing fields
  readonly #dynamicAnchors: Map<string, JsonSchema[]>;  // Stack of schemas per anchor name

  constructor(schema: JsonSchema) {
    // ... existing setup
    this.#dynamicAnchors = new Map();
    this.#collectDynamicAnchors(schema);
  }

  #validate(
    data: unknown,
    schema: JsonSchema,
    path: string,
    dynamicScope: Map<string, JsonSchema> = new Map()  // Current dynamic scope
  ): ValidationError[] {
    // ... existing validation

    // Handle $dynamicAnchor - add to scope
    if (typeof schema === 'object' && schema.$dynamicAnchor) {
      if (!dynamicScope.has(schema.$dynamicAnchor)) {
        // Only the outermost anchor is used
        dynamicScope = new Map(dynamicScope);
        dynamicScope.set(schema.$dynamicAnchor, schema);
      }
    }

    // Handle $dynamicRef
    if (typeof schema === 'object' && schema.$dynamicRef) {
      const anchorName = schema.$dynamicRef.replace(/^#/, '');
      const target = dynamicScope.get(anchorName);
      if (target) {
        return this.#validate(data, target, path, dynamicScope);
      }
      // Fall back to static resolution if no dynamic anchor in scope
      // ...
    }

    // Pass dynamicScope to all recursive calls
    // ...
  }
}
```

**Complexity:** Very High - Requires threading dynamic scope through entire validation, understanding the subtle semantics of dynamic resolution

**Use case:** This is primarily for meta-schemas and highly generic reusable schemas. Most applications don't need this feature.

**Recommendation:** Defer implementation until there's clear demand. Document as "not supported" in the meantime.

---

#### Content Keywords

**Files to modify:** `types.ts`, `validator.ts`

**types.ts changes:**
```typescript
export interface JsonSchemaBase {
  // ... existing fields
  contentEncoding?: string;
  contentMediaType?: string;
  contentSchema?: JsonSchema;
}
```

**validator.ts approach:**

```typescript
#validateString(data: string, schema: JsonSchemaBase, path: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // ... existing string validation

  // Content validation
  if (schema.contentEncoding || schema.contentMediaType || schema.contentSchema) {
    let decoded: string | unknown = data;

    // Step 1: Decode
    if (schema.contentEncoding === 'base64') {
      try {
        decoded = atob(data);
      } catch {
        errors.push({
          path,
          message: 'Invalid base64 encoding',
          keyword: 'contentEncoding',
          value: data,
        });
        return errors;  // Can't proceed without decoding
      }
    }
    // Add other encodings: quoted-printable, etc.

    // Step 2: Parse media type
    if (schema.contentMediaType === 'application/json') {
      try {
        decoded = JSON.parse(decoded as string);
      } catch {
        errors.push({
          path,
          message: 'Invalid JSON content',
          keyword: 'contentMediaType',
          value: data,
        });
        return errors;
      }
    }
    // Add other media types

    // Step 3: Validate against contentSchema
    if (schema.contentSchema) {
      errors.push(...this.#validate(decoded, schema.contentSchema, path));
    }
  }

  return errors;
}
```

**Complexity:** Medium - Straightforward logic but needs handling for various encodings/media types

**Note:** Per the spec, these keywords are assertions but implementations may choose to not validate them by default. Consider making this opt-in via a validator option.

---

## Architecture Decisions

### Evaluation Tracking for Unevaluated Keywords

The `unevaluatedProperties` and `unevaluatedItems` keywords require a significant architectural change. Two approaches:

**Option A: Return tracking info from all validation**
- Pros: Clean, explicit
- Cons: Changes the internal API, more verbose

**Option B: Use a context object passed through validation**
- Pros: Doesn't change return types
- Cons: Mutable state, harder to reason about

**Recommendation:** Option A. The extra complexity is justified for correctness.

### Regex Compilation

For `patternProperties`, regex patterns should be pre-compiled:

```typescript
export class Validator<T> {
  readonly #patternPropertyRegexes: Map<string, RegExp>;

  constructor(schema: JsonSchema) {
    this.#patternPropertyRegexes = new Map();
    this.#compilePatterns(schema);
  }

  #compilePatterns(schema: JsonSchema): void {
    if (typeof schema !== 'object') return;
    if (schema.patternProperties) {
      for (const pattern of Object.keys(schema.patternProperties)) {
        this.#patternPropertyRegexes.set(pattern, new RegExp(pattern));
      }
    }
    // Recurse into subschemas
  }
}
```

### Format Validation Toggle

Per JSON Schema spec, format validation is optional. Consider:

```typescript
interface ValidatorOptions {
  validateFormats?: boolean;  // default: true
  unknownFormats?: 'ignore' | 'warn' | 'error';  // default: 'ignore'
}

export class Validator<T> {
  constructor(schema: JsonSchema, options?: ValidatorOptions) {
    // ...
  }
}
```

---

## Testing Strategy

Each new keyword should have:

1. **Type tests** (in `tests/types/`) - Verify TypeScript inference
2. **Runtime tests** (in `tests/runtime/`) - Verify validation logic
3. **Edge case tests** - Empty arrays, null values, nested schemas

Example test structure for `contains`:

```typescript
// tests/types/contains.test-d.ts
import type { Equal, Expect } from './test-utils.js';
import { schema } from 'json-schema-ts';

const HasString = schema({
  type: 'array',
  contains: { type: 'string' },
});
type _HasString = Expect<Equal<typeof HasString.type, unknown[]>>;

// tests/runtime/contains.test.ts
import { describe, it, expect } from 'vitest';
import { schema } from 'json-schema-ts';

describe('contains', () => {
  const HasString = schema({
    type: 'array',
    contains: { type: 'string' },
  });

  it('validates array with matching element', () => {
    expect(HasString.validate([1, 'hello', 3])).toBe(true);
  });

  it('rejects array without matching element', () => {
    expect(HasString.validate([1, 2, 3])).toBe(false);
  });

  it('rejects empty array', () => {
    expect(HasString.validate([])).toBe(false);
  });
});
```

---

## Known Type Inference Holes

This section documents edge cases where the current `infer.ts` implementation produces incorrect or suboptimal types. These should be addressed in future iterations.

### HIGH Priority

#### 1. Type Array with Properties/Items Loses Structure

**Location:** `infer.ts:51-52` - `InferType` with array of types

When `type` is an array (union of types), the implementation maps each type via `MapType`, which returns generic types like `Record<string, unknown>` for objects. This ignores any `properties` or `items` constraints.

```typescript
// CURRENT BEHAVIOR (INCORRECT)
const Schema = schema({
  type: ['object', 'null'],
  properties: { foo: { type: 'string' } },
});
type T = typeof Schema.type;  // Record<string, unknown> | null

// EXPECTED BEHAVIOR
type T = { foo?: string } | null;
```

**Impact:** High - Union types with structured schemas are common for nullable objects.

**Fix:** When type is an array containing 'object' or 'array', check for properties/items and infer structured types for those branches.

```typescript
type InferType<S extends JsonSchemaBase, Defs> =
  S extends { type: infer T }
    ? T extends readonly (infer U extends JsonSchemaType)[]
      ? InferTypeUnion<U, S, Defs>  // NEW: pass schema for structure
      : // ... existing single type handling
    : unknown;

type InferTypeUnion<U extends JsonSchemaType, S extends JsonSchemaBase, Defs> =
  U extends 'object'
    ? InferObject<S, Defs>
    : U extends 'array'
      ? InferArray<S, Defs>
      : MapType<U>;
```

---

#### 2. `if` with Only `else` (No `then`) Falls Through

**Location:** `infer.ts:41-45` - `InferSchema` if/then/else handling

The implementation handles `if/then/else` and `if/then`, but not `if/else` (without `then`). This case falls through to `InferType`, ignoring the conditional entirely.

```typescript
// CURRENT BEHAVIOR (INCORRECT)
const Schema = schema({
  if: { type: 'string' },
  else: { type: 'number' },
});
type T = typeof Schema.type;  // unknown (falls through)

// EXPECTED BEHAVIOR
type T = string | number;
// If condition matches → any string value is valid
// If condition fails → must be number
```

**Impact:** High - Valid JSON Schema pattern is silently ignored.

**Fix:** Add handling for `if/else` without `then`:

```typescript
: S extends { if: JsonSchema; else: infer E extends JsonSchema }
  ? InferType<S, Defs> | Infer<E, Defs>  // if matches → base type, else → E
```

---

### MEDIUM Priority

#### 3. Circular `$ref` Causes TypeScript Recursion Error

**Location:** `infer.ts:134-141` - `InferRef`

No cycle detection exists for recursive `$ref` references. Self-referential schemas cause TypeScript to hit "Type instantiation is excessively deep and possibly infinite."

```typescript
// CAUSES TYPESCRIPT ERROR
const Schema = schema({
  $defs: { Node: { $ref: '#/$defs/Node' } },
  $ref: '#/$defs/Node',
});
// Error: Type instantiation is excessively deep and possibly infinite.
```

**Impact:** Medium - Crashes TypeScript compiler, but circular refs without termination are uncommon in practice.

**Fix:** Two options:
1. **Lazy evaluation:** Use a type that defers resolution (complex)
2. **Depth limit:** Track recursion depth and return `unknown` after N levels

```typescript
type InferRef<R extends string, Defs, Depth extends unknown[] = []> =
  Depth['length'] extends 10
    ? unknown  // Recursion limit reached
    : R extends `#/$defs/${infer Name}`
      ? Name extends keyof Defs
        ? Infer<Defs[Name], Defs, [...Depth, unknown]>
        : unknown
      : unknown;
```

---

#### 4. `required` Array with Non-Existent Properties Silently Ignored

**Location:** `infer.ts:96-103` - `BuildObject`

If `required` contains property names not defined in `properties`, they are silently ignored rather than causing an error or adding them as required with `unknown` type.

```typescript
// CURRENT BEHAVIOR
const Schema = schema({
  type: 'object',
  required: ['ghost', 'name'],
  properties: { name: { type: 'string' } },
});
type T = typeof Schema.type;  // { name: string }
// 'ghost' is ignored - no error, no required field

// POSSIBLE EXPECTED BEHAVIOR
type T = { name: string; ghost: unknown };
```

**Impact:** Medium - Silent failure, but technically valid per JSON Schema spec (properties can be required without being defined in `properties`).

**Decision:** This may be intentional. Document behavior or add `unknown` for missing required properties.

---

### LOW Priority

#### 5. `not` with Complex Schemas Falls Back to `JsonValue`

**Location:** `infer.ts:144-157` - `InferNot`

The `not` handler only recognizes simple `{ type: X }` patterns. Complex schemas like `{ not: { enum: [1, 2] } }` or `{ not: { minimum: 5 } }` fall back to `JsonValue`.

```typescript
// CURRENT BEHAVIOR (ACCEPTABLE)
const NotEnum = schema({ not: { enum: [1, 2] } });
type T = typeof NotEnum.type;  // JsonValue (catch-all)

// IDEAL BEHAVIOR (IMPOSSIBLE TO EXPRESS PRECISELY)
type T = Exclude<JsonValue, 1 | 2>;  // Can't exclude from primitives
```

**Impact:** Low - `not` is inherently difficult to express at the type level. The fallback is safe but imprecise.

**Decision:** Document as limitation. More precise handling would require extensive pattern matching.

---

#### 6. `oneOf` vs `anyOf` Semantic Difference Not Expressible

**Location:** `infer.ts:32-33` - `oneOf` treated same as `anyOf`

Both `oneOf` and `anyOf` produce union types, but `oneOf` has a runtime constraint that exactly one schema must match. This can't be expressed in TypeScript types.

```typescript
// CURRENT BEHAVIOR (CORRECT FOR TYPES)
const Schema = schema({
  oneOf: [{ type: 'string' }, { type: 'string', minLength: 5 }],
});
type T = typeof Schema.type;  // string

// Runtime: Would reject "ab" because both schemas match
// Types: Can't express "exactly one matches"
```

**Impact:** Low - Type inference is correct; runtime validation handles the difference.

**Decision:** Document as intentional. Add comment in code explaining the semantic difference.

---

#### 7. Empty `allOf` Returns `unknown` Instead of Unconstrained

**Location:** `infer.ts:126-131` - `InferAllOf`

Empty `allOf: []` returns `unknown`, which is technically correct per JSON Schema (no constraints = any value valid).

```typescript
const Schema = schema({ allOf: [] });
type T = typeof Schema.type;  // unknown ✓
```

**Impact:** None - Current behavior is correct. Included for completeness.

---

#### 8. `const` + `type` Conflict: `const` Always Wins

**Location:** `infer.ts:23-24` - `const` checked before `type`

When `const` and `type` conflict, the type inference returns the `const` value's type. Runtime validation would reject such data.

```typescript
// CURRENT BEHAVIOR
const Schema = schema({ const: 42, type: 'string' });
type T = typeof Schema.type;  // 42

// Runtime: Would reject 42 because it's not a string
```

**Impact:** Low - This schema is contradictory and would never validate successfully. Type inference returning `42` is arguably more useful than `never`.

**Decision:** Document as edge case. Consider returning `never` for contradictory schemas in a future version.

---

#### 9. Deep Nesting Hits TypeScript Recursion Limits

**Location:** All recursive types in `infer.ts`

TypeScript has a recursion limit (~50-100 levels depending on complexity). Deeply nested schemas will fail with "Type instantiation is excessively deep."

```typescript
// CAUSES TYPESCRIPT ERROR
const Schema = schema({
  allOf: [{
    allOf: [{
      allOf: [{
        // ... 30+ levels deep
      }]
    }]
  }]
});
```

**Impact:** Low - Extremely deep nesting is rare in practice.

**Decision:** Document as known limitation. No reasonable fix without lazy type evaluation.

---

### Summary Table

| # | Issue | Priority | Location | Status |
|---|-------|----------|----------|--------|
| 1 | Type array ignores properties/items | HIGH | `InferType` | ✅ Fixed |
| 2 | `if/else` without `then` ignored | HIGH | `InferSchema` | ✅ Fixed |
| 3 | Circular `$ref` recursion error | MEDIUM | `InferRef` | ✅ Fixed |
| 4 | Missing required properties ignored | MEDIUM | `BuildObject` | ✅ Fixed |
| 5 | `not` complex schemas → `JsonValue` | LOW | `InferNot` | Accept |
| 6 | `oneOf`/`anyOf` same at type level | LOW | `InferSchema` | Accept |
| 7 | Empty `allOf` → `unknown` | LOW | `InferAllOf` | Correct |
| 8 | `const`+`type` conflict | LOW | `InferSchema` | Document |
| 9 | Deep nesting recursion limit | LOW | All | Document |
| 10 | `not` with type array loses specificity | MEDIUM | `InferNot` | ✅ Fixed |

---

## Developer Experience Improvements

### Prettier

Add Prettier for consistent code formatting across the codebase.

```bash
npm install -D prettier
```

Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Add scripts to `package.json`:
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Pre-commit Hook

Use Husky + lint-staged for pre-commit formatting and linting.

```bash
npm install -D husky lint-staged
npx husky init
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{ts,js,json,md}": "prettier --write"
  }
}
```

Create `.husky/pre-commit`:
```bash
npx lint-staged
npm run test:types
```

### eslint-plugin-expect-type for Type Testing ✅ IMPLEMENTED

Type tests now use [eslint-plugin-expect-type](https://github.com/JoshuaKGoldberg/eslint-plugin-expect-type) with `$ExpectType` comments for type assertions.

**Installation:**
```bash
npm install -D eslint eslint-plugin-expect-type @typescript-eslint/parser
```

**Configuration (`eslint.config.mjs`):**
```javascript
import tsParser from '@typescript-eslint/parser';
import * as expectType from 'eslint-plugin-expect-type';

export default [
  {
    files: ['tests/types/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tests/types/tsconfig.json',
      },
    },
    plugins: {
      'expect-type': expectType,
    },
    rules: {
      'expect-type/expect': 'error',
    },
  },
];
```

**Usage:**
```typescript
import { schema } from 'json-schema-ts';

// String type
const S = schema({ type: 'string' });
S.type; // $ExpectType string

// Object with properties
const Obj = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
});
Obj.type; // $ExpectType { name?: string }
```

**Test script (`package.json`):**
```json
{
  "scripts": {
    "test:types": "eslint tests/types/"
  }
}
```

**Note:** The test tsconfig includes `"exactOptionalPropertyTypes": true` to get cleaner type output without `| undefined` on optional properties.

---

## References

- [JSON Schema Core 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)
- [JSON Schema Validation 2020-12](https://json-schema.org/draft/2020-12/json-schema-validation)
- [Learn JSON Schema](https://www.learnjsonschema.com/2020-12/)
