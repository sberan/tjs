# PRD: Keyword & Validator Module Refactor

## Overview

Refactor the tjs codebase to separate each JSON Schema keyword handler and each validator into individual files, achieving better code organization, testability, and maintainability while maintaining **zero performance cost**.

## Current State

### File Structure
```
src/
├── core/
│   ├── compiler.ts          # 3955 lines - ALL 24 keyword handlers embedded
│   ├── context.ts           # 1023 lines - compilation context
│   ├── codegen.ts           # 577 lines - code generation utilities
│   ├── coercion.ts          # 651 lines - type coercion
│   └── keywords/
│       ├── format.ts        # 1841 lines - format validators only
│       └── utils.ts         # 419 lines - shared keyword utilities
```

### Current Keyword Handlers (in compiler.ts)
| Handler Function | Keywords |
|-----------------|----------|
| `generateTypeCheck` | `type` |
| `generateConstCheck` | `const` |
| `generateEnumCheck` | `enum` |
| `generateStringChecks` | `minLength`, `maxLength`, `pattern` |
| `generateNumberChecks` | `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, `multipleOf` |
| `generateArrayChecks` | `minItems`, `maxItems`, `uniqueItems` |
| `generateObjectChecks` | `minProperties`, `maxProperties`, `required` |
| `generatePropertiesChecks` | `properties`, `patternProperties`, `additionalProperties` |
| `generateItemsChecks` | `items`, `prefixItems`, `additionalItems` |
| `generateUnevaluatedPropertiesCheck` | `unevaluatedProperties` |
| `generateUnevaluatedItemsCheck` | `unevaluatedItems` |
| `generateContainsCheck` | `contains`, `minContains`, `maxContains` |
| `generateDependentRequiredCheck` | `dependentRequired` |
| `generateDependentSchemasCheck` | `dependentSchemas` |
| `generateDependenciesCheck` | `dependencies` (legacy) |
| `generatePropertyNamesCheck` | `propertyNames` |
| `generateRefCheck` | `$ref` |
| `generateDynamicRefCheck` | `$dynamicRef` |
| `generateRecursiveRefCheck` | `$recursiveRef` |
| `generateCompositionChecks` | `allOf`, `anyOf`, `oneOf`, `not` |
| `generateFormatCheck` | `format` |
| `generateContentChecks` | `contentMediaType`, `contentEncoding`, `contentSchema` |
| `generateIfThenElseCheck` | `if`, `then`, `else` |

---

## Target State

### New File Structure
```
src/
├── core/
│   ├── compiler.ts              # Orchestration only (~300 lines)
│   ├── context.ts               # Unchanged
│   ├── codegen.ts               # Unchanged
│   ├── coercion.ts              # Unchanged
│   ├── keywords/
│   │   ├── index.ts             # Barrel export + keyword registry
│   │   ├── types.ts             # KeywordHandler interface
│   │   ├── utils.ts             # Shared utilities (existing)
│   │   │
│   │   ├── type.ts              # type keyword
│   │   ├── const.ts             # const keyword
│   │   ├── enum.ts              # enum keyword
│   │   │
│   │   ├── string/
│   │   │   ├── index.ts         # minLength, maxLength, pattern
│   │   │   ├── min-length.ts
│   │   │   ├── max-length.ts
│   │   │   └── pattern.ts
│   │   │
│   │   ├── number/
│   │   │   ├── index.ts         # numeric constraints
│   │   │   ├── minimum.ts
│   │   │   ├── maximum.ts
│   │   │   ├── exclusive-minimum.ts
│   │   │   ├── exclusive-maximum.ts
│   │   │   └── multiple-of.ts
│   │   │
│   │   ├── array/
│   │   │   ├── index.ts         # array constraints
│   │   │   ├── min-items.ts
│   │   │   ├── max-items.ts
│   │   │   ├── unique-items.ts
│   │   │   ├── items.ts
│   │   │   ├── prefix-items.ts
│   │   │   ├── additional-items.ts
│   │   │   ├── contains.ts
│   │   │   └── unevaluated-items.ts
│   │   │
│   │   ├── object/
│   │   │   ├── index.ts         # object constraints
│   │   │   ├── min-properties.ts
│   │   │   ├── max-properties.ts
│   │   │   ├── required.ts
│   │   │   ├── properties.ts
│   │   │   ├── pattern-properties.ts
│   │   │   ├── additional-properties.ts
│   │   │   ├── property-names.ts
│   │   │   ├── dependent-required.ts
│   │   │   ├── dependent-schemas.ts
│   │   │   ├── dependencies.ts
│   │   │   └── unevaluated-properties.ts
│   │   │
│   │   ├── composition/
│   │   │   ├── index.ts         # composition keywords
│   │   │   ├── all-of.ts
│   │   │   ├── any-of.ts
│   │   │   ├── one-of.ts
│   │   │   ├── not.ts
│   │   │   └── if-then-else.ts
│   │   │
│   │   ├── ref/
│   │   │   ├── index.ts         # reference keywords
│   │   │   ├── ref.ts
│   │   │   ├── dynamic-ref.ts
│   │   │   └── recursive-ref.ts
│   │   │
│   │   ├── format/
│   │   │   ├── index.ts         # format orchestration
│   │   │   ├── validators.ts    # existing format validators
│   │   │   └── format.ts        # format keyword handler
│   │   │
│   │   └── content/
│   │       ├── index.ts
│   │       ├── media-type.ts
│   │       ├── encoding.ts
│   │       └── schema.ts
│   │
│   └── validators/
│       ├── index.ts             # Barrel export
│       ├── types.ts             # Validator interfaces
│       ├── validator.ts         # Base Validator class/factory
│       ├── sync-validator.ts    # Synchronous validator
│       └── async-validator.ts   # Async validator (for remote $ref)
```

---

## Zero-Cost Performance Strategy

### 1. Build-Time Inlining

**Approach**: Use `tsup` (or `esbuild`) with `--minify` and `--treeshake` to inline all imports at build time.

```typescript
// src/core/keywords/index.ts
export { generateTypeCheck } from './type.js';
export { generateConstCheck } from './const.js';
// ... all exports

// Build output: single inlined bundle, identical to current monolith
```

**Result**: Production bundle is identical to current single-file approach.

### 2. No Runtime Dispatch Overhead

**Current (preserved)**:
```typescript
// compiler.ts - calls keyword handlers directly
generateTypeCheck(schema, code, ctx);
generatePropertiesChecks(schema, code, ctx);
```

**NOT this (avoided)**:
```typescript
// Avoid: runtime registry lookup
for (const keyword of Object.keys(schema)) {
  keywordHandlers[keyword]?.(schema, code, ctx);  // ❌ runtime cost
}
```

**Rationale**: Keep the explicit, ordered function calls. The refactor is purely about file organization, not runtime architecture.

### 3. Static Import Graph

All keyword handlers are **statically imported** at the top of `compiler.ts`:

```typescript
// compiler.ts
import { generateTypeCheck } from './keywords/type.js';
import { generateConstCheck } from './keywords/const.js';
import { generateEnumCheck } from './keywords/enum.js';
import { generateStringChecks } from './keywords/string/index.js';
// ... etc

export function compileSchema(schema, code, ctx) {
  generateTypeCheck(schema, code, ctx);
  generateConstCheck(schema, code, ctx);
  // ... same explicit call order as today
}
```

**Result**: Bundler inlines everything; zero runtime module resolution.

### 4. Grouped Keywords Stay Together

Some keywords are always processed together (e.g., string constraints). These remain in a single file with multiple exports:

```typescript
// keywords/string/index.ts
export function generateMinLengthCheck(...) { }
export function generateMaxLengthCheck(...) { }
export function generatePatternCheck(...) { }

// Combined export for convenience
export function generateStringChecks(schema, code, ctx) {
  if (schema.minLength !== undefined) generateMinLengthCheck(...);
  if (schema.maxLength !== undefined) generateMaxLengthCheck(...);
  if (schema.pattern !== undefined) generatePatternCheck(...);
}
```

### 5. Benchmark Validation

Before/after benchmarks to verify zero performance cost:

```bash
# Add to package.json scripts
"bench:keywords": "node bench/keywords.js"
```

**Acceptance criteria**:
- Compile time: ±2% variance (within noise)
- Validation time: ±1% variance (within noise)
- Bundle size: ±1KB variance

---

## Keyword Handler Interface

```typescript
// src/core/keywords/types.ts

import type { CodeBuilder } from '../codegen.js';
import type { CompileContext } from '../context.js';
import type { JsonSchema } from '../../types.js';

/**
 * Standard interface for all keyword handlers.
 * Each handler generates validation code for its keyword(s).
 */
export interface KeywordGeneratorOptions {
  /** The schema being compiled */
  schema: JsonSchema;
  /** Code builder for generating JavaScript */
  code: CodeBuilder;
  /** Compilation context (refs, vocabularies, options) */
  ctx: CompileContext;
  /** JSON pointer path to current schema location */
  path: string;
  /** Variable name containing data being validated */
  dataVar: string;
}

/**
 * A keyword handler generates validation code.
 * Returns void - side effect is appending to CodeBuilder.
 */
export type KeywordHandler = (opts: KeywordGeneratorOptions) => void;
```

---

## Validator Interface

```typescript
// src/core/validators/types.ts

export interface ValidationError {
  path: string;
  keyword: string;
  message: string;
  params?: Record<string, unknown>;
}

export interface ValidationResult<T> {
  valid: boolean;
  value: T | undefined;
  errors: ValidationError[] | undefined;
}

export interface Validator<T = unknown> {
  /** Validate and return boolean (AJV-compatible) */
  (data: unknown): data is T;

  /** Validate with detailed result */
  validate(data: unknown): ValidationResult<T>;

  /** Validate and throw on failure */
  assert(data: unknown): T;

  /** Phantom type for TypeScript inference */
  readonly type: T;

  /** Last validation errors (AJV-compatible) */
  errors: ValidationError[] | null;
}
```

---

## Implementation Phases

### Phase 1: Infrastructure (1 PR)
- [ ] Create `src/core/keywords/types.ts` with `KeywordHandler` interface
- [ ] Create `src/core/validators/types.ts` with `Validator` interface
- [ ] Add benchmark scripts to validate zero performance cost
- [ ] Update `tsconfig.json` if needed for path resolution

### Phase 2: Extract Type Keywords (1 PR)
- [ ] Extract `type.ts`, `const.ts`, `enum.ts`
- [ ] Update imports in `compiler.ts`
- [ ] Run benchmarks - must pass

### Phase 3: Extract Primitive Keywords (1 PR)
- [ ] Extract `string/` subdirectory (minLength, maxLength, pattern)
- [ ] Extract `number/` subdirectory (min, max, multipleOf)
- [ ] Run benchmarks - must pass

### Phase 4: Extract Array Keywords (1 PR)
- [ ] Extract `array/` subdirectory
- [ ] Run benchmarks - must pass

### Phase 5: Extract Object Keywords (1 PR)
- [ ] Extract `object/` subdirectory
- [ ] Run benchmarks - must pass

### Phase 6: Extract Composition Keywords (1 PR)
- [ ] Extract `composition/` subdirectory (allOf, anyOf, oneOf, not, if/then/else)
- [ ] Run benchmarks - must pass

### Phase 7: Extract Ref Keywords (1 PR)
- [ ] Extract `ref/` subdirectory ($ref, $dynamicRef, $recursiveRef)
- [ ] Run benchmarks - must pass

### Phase 8: Extract Content Keywords (1 PR)
- [ ] Extract `content/` subdirectory
- [ ] Move format keyword handler to `format/format.ts`
- [ ] Run benchmarks - must pass

### Phase 9: Extract Validators (1 PR)
- [ ] Create `validators/validator.ts` - base factory
- [ ] Create `validators/sync-validator.ts`
- [ ] Create `validators/async-validator.ts`
- [ ] Run benchmarks - must pass

### Phase 10: Cleanup (1 PR)
- [ ] Remove dead code from `compiler.ts`
- [ ] Update documentation
- [ ] Final benchmark validation
- [ ] Update README if needed

---

## File Template

Each keyword file follows this template:

```typescript
// src/core/keywords/type.ts

import { _ } from '../codegen.js';
import type { KeywordGeneratorOptions } from './types.js';
import { getTypeCheck } from './utils.js';

/**
 * Generates validation code for the `type` keyword.
 *
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-6.1.1
 */
export function generateTypeCheck({
  schema,
  code,
  ctx,
  path,
  dataVar,
}: KeywordGeneratorOptions): void {
  if (schema.type === undefined) return;

  const typeCheck = getTypeCheck(schema.type, dataVar);
  code.append(_`
    if (!(${typeCheck})) {
      errors.push({
        path: ${path},
        keyword: 'type',
        message: 'must be ${schema.type}',
      });
      return false;
    }
  `);
}
```

---

## Testing Strategy

### Unit Tests (New)
Each keyword gets its own test file:
```
tests/keywords/
├── type.test.ts
├── const.test.ts
├── enum.test.ts
├── string/
│   ├── min-length.test.ts
│   └── ...
```

### Integration Tests (Existing)
- Existing type tests in `tests/types/` continue to work
- Add integration tests that validate full schemas

### Benchmark Tests
```typescript
// bench/keywords.js
const schemas = loadTestSchemas();
const iterations = 10000;

console.time('compile');
for (let i = 0; i < iterations; i++) {
  for (const s of schemas) compile(s);
}
console.timeEnd('compile');

console.time('validate');
for (let i = 0; i < iterations; i++) {
  for (const [validator, data] of testCases) {
    validator(data);
  }
}
console.timeEnd('validate');
```

---

## Success Criteria

1. **Zero Performance Cost**
   - Compile time within ±2% of baseline
   - Validation time within ±1% of baseline
   - Bundle size within ±1KB of baseline

2. **Maintainability**
   - Each keyword in its own file (or logical group)
   - Each validator type in its own file
   - Clear import/export structure

3. **Testability**
   - Keywords can be unit tested in isolation
   - Validators can be unit tested in isolation

4. **Backward Compatibility**
   - Public API unchanged
   - All existing tests pass
   - No breaking changes

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Circular dependencies between keywords | Use dependency injection or lazy resolution |
| Bundler not inlining properly | Verify with `--analyze` flag; use explicit inline hints |
| Import overhead in dev mode | Dev performance is acceptable; production is priority |
| Shared state between keywords | Pass all shared state via `KeywordGeneratorOptions` |

---

## Out of Scope

- Runtime keyword plugin system (would add overhead)
- Dynamic keyword loading
- Keyword-level tree shaking (all keywords included by default)
- Changes to the public API

---

## Appendix: Current `compiler.ts` Call Order

This order must be preserved:

```typescript
// 1. Core type keywords
generateTypeCheck()
generateConstCheck()
generateEnumCheck()

// 2. Format (before other string checks)
generateFormatCheck()

// 3. String constraints
generateStringChecks()

// 4. Number constraints
generateNumberChecks()

// 5. Array constraints
generateArrayChecks()

// 6. Object constraints
generateObjectChecks()

// 7. Structural keywords (order matters for unevaluated*)
generatePropertiesChecks()
generatePatternPropertiesCheck()    // if separate
generateAdditionalPropertiesCheck() // if separate
generateItemsChecks()
generateContainsCheck()
generatePropertyNamesCheck()

// 8. Dependencies
generateDependentRequiredCheck()
generateDependentSchemasCheck()
generateDependenciesCheck()

// 9. Unevaluated (must come after properties/items)
generateUnevaluatedPropertiesCheck()
generateUnevaluatedItemsCheck()

// 10. Composition (can contain any other keywords)
generateCompositionChecks()
generateIfThenElseCheck()

// 11. References (may recurse)
generateRefCheck()
generateDynamicRefCheck()
generateRecursiveRefCheck()

// 12. Content
generateContentChecks()
```
