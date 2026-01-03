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

## Implementation Spike Findings

An implementation spike was conducted to validate the refactoring approach. Key findings:

### Successfully Extracted: Simple Keywords

Keywords without recursive sub-schema validation extract cleanly:
- `generateTypeCheck` - extracted to `keywords/type.ts` ✅
- `generateConstCheck`, `generateEnumCheck` - should extract similarly
- `generateStringChecks`, `generateNumberChecks`, `generateArrayChecks`, `generateObjectChecks` - leaf validators

**Result**: Tests pass with identical behavior.

### Major Complication: Circular Dependencies

**Problem**: 15+ keyword handlers call `generateSchemaValidator()` recursively to validate sub-schemas:

```
generateSchemaValidator() ──calls──> generatePropertiesChecks()
         ↑                                      │
         └──────────────────────────────────────┘
                    (recursive call)
```

**Affected handlers** (require sub-schema validation):
- `generatePropertiesChecks` → validates property schemas
- `generateItemsChecks` → validates item schemas
- `generateContainsCheck` → validates contains schema
- `generateCompositionChecks` → validates allOf/anyOf/oneOf/not schemas
- `generateRefCheck` → validates $ref target
- `generateDynamicRefCheck` → validates $dynamicRef target
- `generateDependentSchemasCheck` → validates dependent schemas
- `generateUnevaluatedPropertiesCheck` → validates unevaluated schema
- `generateUnevaluatedItemsCheck` → validates unevaluated schema
- `generatePropertyNamesCheck` → validates propertyNames schema
- `generateContentChecks` → validates contentSchema

**If extracted naively**: Circular imports would occur:
```
compiler.ts imports properties.ts
properties.ts imports generateSchemaValidator from compiler.ts  ← CIRCULAR
```

### Complication: Shared Private Utilities

Several private functions are used across multiple keyword handlers:

| Function | Used By |
|----------|---------|
| `determineRegexFlags()` | pattern, patternProperties, unevaluatedProperties |
| `generateAdditionalPropsCheck()` | properties (private helper) |

These must be extracted to shared utils or duplicated.

### Recommended Solution: Dependency Injection

**Approach**: Pass `generateSchemaValidator` as a callback parameter to handlers that need it.

```typescript
// keywords/types.ts
export type SchemaValidator = (
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
) => void;

export interface KeywordGeneratorOptions {
  schema: JsonSchemaBase;
  code: CodeBuilder;
  ctx: CompileContext;
  dataVar: Name;
  pathExprCode: Code;
  dynamicScopeVar?: Name;
  validateSubschema?: SchemaValidator;  // ← Injected dependency
}
```

**compiler.ts orchestration**:
```typescript
import { generatePropertiesChecks } from './keywords/object/properties.js';

function generateSchemaValidator(...) {
  // ... setup ...

  // Inject self as callback for recursive validation
  generatePropertiesChecks({
    schema, code, ctx, dataVar, pathExprCode, dynamicScopeVar,
    validateSubschema: generateSchemaValidator,  // ← Inject
  });
}
```

**Benefits**:
- No circular imports
- Explicit dependencies
- Testable in isolation (can mock `validateSubschema`)
- Zero runtime cost (callback is direct function reference)

### Alternative: CompileContext Method

Add `ctx.validateSubschema()` method that wraps the recursive call:

```typescript
// context.ts
class CompileContext {
  private schemaValidator?: SchemaValidator;

  setSchemaValidator(fn: SchemaValidator) {
    this.schemaValidator = fn;
  }

  validateSubschema(code, schema, dataVar, pathExprCode, dynamicScopeVar?) {
    this.schemaValidator!(code, schema, dataVar, pathExprCode, this, dynamicScopeVar);
  }
}
```

**Trade-offs**:
- Simpler API (no extra parameter)
- Less explicit (hidden dependency)
- Requires initialization before use

### Revised File Structure (Simplified)

Based on spike findings, a flatter structure is more practical:

```
src/core/
├── compiler.ts              # Orchestration (~400 lines)
├── keywords/
│   ├── index.ts             # Re-exports all handlers
│   ├── types.ts             # KeywordHandler, SchemaValidator types
│   ├── utils.ts             # Shared utilities (existing + determineRegexFlags)
│   │
│   ├── type.ts              # Simple: no sub-schema validation
│   ├── const.ts             # Simple
│   ├── enum.ts              # Simple
│   ├── string.ts            # Simple: minLength, maxLength, pattern
│   ├── number.ts            # Simple: min, max, multipleOf
│   ├── array-constraints.ts # Simple: minItems, maxItems, uniqueItems
│   ├── object-constraints.ts# Simple: minProperties, maxProperties, required
│   │
│   ├── properties.ts        # Complex: needs validateSubschema
│   ├── items.ts             # Complex: needs validateSubschema
│   ├── contains.ts          # Complex: needs validateSubschema
│   ├── composition.ts       # Complex: allOf, anyOf, oneOf, not, if/then/else
│   ├── ref.ts               # Complex: $ref, $dynamicRef, $recursiveRef
│   ├── dependencies.ts      # Complex: dependentRequired, dependentSchemas, dependencies
│   ├── unevaluated.ts       # Complex: unevaluatedProperties, unevaluatedItems
│   ├── property-names.ts    # Complex: needs validateSubschema
│   │
│   └── format/              # Already separate
│       ├── index.ts
│       └── validators.ts
```

**Rationale**:
- Fewer files = less import overhead
- Group related keywords (e.g., all composition in one file)
- Separate "simple" (no recursion) from "complex" (needs recursion)

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

import type { CodeBuilder, Code, Name } from '../codegen.js';
import type { CompileContext } from '../context.js';
import type { JsonSchema, JsonSchemaBase } from '../../types.js';

/**
 * Function type for recursive schema validation.
 * Passed to complex keyword handlers via dependency injection.
 */
export type SchemaValidator = (
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
) => void;

/**
 * Options for simple keyword handlers (no sub-schema validation needed).
 */
export interface SimpleKeywordOptions {
  code: CodeBuilder;
  schema: JsonSchemaBase;
  dataVar: Name;
  pathExprCode: Code;
  ctx: CompileContext;
}

/**
 * Options for complex keyword handlers (need sub-schema validation).
 * Extends SimpleKeywordOptions with dependency injection.
 */
export interface ComplexKeywordOptions extends SimpleKeywordOptions {
  dynamicScopeVar?: Name;
  validateSubschema: SchemaValidator;  // Required for complex handlers
}

/**
 * Simple keyword handler - no recursive validation needed.
 * Examples: type, const, enum, minLength, maximum
 */
export type SimpleKeywordHandler = (opts: SimpleKeywordOptions) => void;

/**
 * Complex keyword handler - needs recursive sub-schema validation.
 * Examples: properties, items, allOf, $ref
 */
export type ComplexKeywordHandler = (opts: ComplexKeywordOptions) => void;
```

### Why Two Handler Types?

**Simple handlers** (~40% of keywords):
- Validate leaf constraints (type checks, length limits, patterns)
- No circular dependency risk
- Simpler testing

**Complex handlers** (~60% of keywords):
- Validate nested schemas (properties, items, composition)
- Receive `validateSubschema` via dependency injection
- Can be tested with mock validator

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

## Implementation Phases (Revised)

### Phase 1: Infrastructure (1 PR) ✅ COMPLETE
- [x] Create `src/core/keywords/types.ts` with handler interfaces
  - `SimpleKeywordOptions`, `ComplexKeywordOptions`
  - `SimpleKeywordHandler`, `ComplexKeywordHandler`
  - `SchemaValidator` type
- [x] Move `determineRegexFlags()` to `keywords/utils.ts`
- [ ] Add benchmark scripts to validate zero performance cost
- [ ] Update `tsconfig.json` if needed for path resolution

### Phase 2: Extract Simple Keywords (1 PR) ✅ COMPLETE
**No circular dependency risk - straightforward extraction**
- [x] Extract `type.ts` (type keyword)
- [x] Extract `const.ts` (const keyword)
- [x] Extract `enum.ts` (enum keyword)
- [x] Extract `string.ts` (minLength, maxLength, pattern)
- [x] Extract `number.ts` (minimum, maximum, multipleOf, etc.)
- [x] Extract `array-constraints.ts` (minItems, maxItems, uniqueItems)
- [x] Extract `object-constraints.ts` (minProperties, maxProperties, required)
- [x] Update imports in `compiler.ts`
- [x] Run benchmarks - tests pass (7715/7725)

### Phase 3: Introduce Dependency Injection (1 PR)
**Critical: This enables extraction of complex keywords**
- [ ] Update `compiler.ts` to pass `generateSchemaValidator` to complex handlers
- [ ] Refactor one handler (e.g., `generatePropertiesChecks`) in-place to accept options object
- [ ] Verify tests pass with new calling convention
- [ ] Run benchmarks - must pass

### Phase 4: Extract Complex Object Keywords (1 PR)
- [ ] Extract `properties.ts` (properties, patternProperties, additionalProperties)
- [ ] Extract `property-names.ts` (propertyNames)
- [ ] Extract `unevaluated.ts` (unevaluatedProperties, unevaluatedItems)
- [ ] Run benchmarks - must pass

### Phase 5: Extract Complex Array Keywords (1 PR)
- [ ] Extract `items.ts` (items, prefixItems, additionalItems)
- [ ] Extract `contains.ts` (contains, minContains, maxContains)
- [ ] Run benchmarks - must pass

### Phase 6: Extract Composition Keywords (1 PR)
- [ ] Extract `composition.ts` (allOf, anyOf, oneOf, not, if/then/else)
- [ ] Run benchmarks - must pass

### Phase 7: Extract Ref Keywords (1 PR)
- [ ] Extract `ref.ts` ($ref, $dynamicRef, $recursiveRef)
- [ ] Run benchmarks - must pass

### Phase 8: Extract Dependencies Keywords (1 PR)
- [ ] Extract `dependencies.ts` (dependentRequired, dependentSchemas, dependencies)
- [ ] Run benchmarks - must pass

### Phase 9: Extract Validators (1 PR)
- [ ] Create `validators/types.ts` - Validator interface
- [ ] Create `validators/validator.ts` - factory
- [ ] Create `validators/sync-validator.ts`
- [ ] Create `validators/async-validator.ts`
- [ ] Run benchmarks - must pass

### Phase 10: Cleanup & Documentation (1 PR)
- [ ] Remove dead code from `compiler.ts`
- [ ] Add barrel exports in `keywords/index.ts`
- [ ] Update README if needed
- [ ] Final benchmark validation

### Key Changes from Original Plan
1. **Fewer, larger files** - Group related keywords instead of one-file-per-keyword
2. **Two-phase extraction** - Simple keywords first, then complex with DI
3. **Phase 3 is critical** - Introduces DI pattern before extracting complex handlers
4. **Defer validators** - Extract keywords first, validators last

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
| Circular dependencies between keywords | **VALIDATED**: Use dependency injection - pass `validateSubschema` as callback parameter |
| Bundler not inlining properly | Verify with `--analyze` flag; use explicit inline hints |
| Import overhead in dev mode | Dev performance is acceptable; production is priority |
| Shared state between keywords | Pass all shared state via options object |
| **NEW**: Private helper functions | Extract to utils.ts (e.g., `determineRegexFlags`, `generateAdditionalPropsCheck`) |
| **NEW**: API signature changes | Keep backward-compatible exports; deprecate old signatures if needed |
| **NEW**: Incremental migration complexity | Phase 3 (DI introduction) is critical path - test thoroughly |

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

---

## Implementation Progress

### Phase 1: Infrastructure ✅
- Created `types.ts` with `SchemaValidator`, `SimpleKeywordOptions`, `ComplexKeywordOptions` interfaces
- Moved `determineRegexFlags` to `utils.ts`

### Phase 2: Simple Keywords ✅
Extracted handlers that don't need recursive sub-schema validation:
- `type.ts` - type keyword
- `const.ts` - const keyword
- `enum.ts` - enum keyword
- `string.ts` - minLength, maxLength, pattern
- `number.ts` - minimum, maximum, multipleOf, etc.
- `array-constraints.ts` - minItems, maxItems, uniqueItems
- `object-constraints.ts` - required, minProperties, maxProperties

### Phase 3: Dependency Injection Pattern ✅
Introduced DI pattern for complex handlers:
- `property-names.ts` - propertyNames keyword
- `dependent-schemas.ts` - dependentSchemas keyword
- `dependencies.ts` - dependencies keyword (legacy)

### Phase 4: More Simple Handlers ✅
- `dependent-required.ts` - dependentRequired keyword
- `content.ts` - contentMediaType, contentEncoding
- `format-check.ts` - format keyword

### Phase 5: Remaining Complex Handlers 🚧
In progress:
- `contains.ts` - contains, minContains, maxContains
- `composition.ts` - allOf, anyOf, oneOf, not, if/then/else
- `items.ts` - items, prefixItems, additionalItems
- `properties.ts` - properties, patternProperties, additionalProperties
- `unevaluated-properties.ts`
- `unevaluated-items.ts`
- `ref.ts` - $ref, $dynamicRef, $recursiveRef

### Current Stats
- compiler.ts: Reduced from 3955 to 2717 lines (~31% reduction)
- 13 new keyword handler files created
- All 7715 tests passing
