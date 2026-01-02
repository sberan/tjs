# PRD: tjs Performance Improvements

## Overview

This document outlines performance optimization opportunities for tjs based on benchmark comparisons against AJV. While tjs is already **34% faster than AJV on average** for draft7 schemas, specific edge cases show significant performance gaps that can be addressed.

## Current State

### Benchmark Summary (draft7)

| Metric | tjs | AJV |
|--------|-----|-----|
| Average ns/test | 32 | 48 |
| Compliance | 1534/1534 (100%) | 1443/1534 (94%) |
| Overall Performance | **34% faster** | baseline |

### Identified Performance Gaps (Updated After Optimizations)

After implementing Map-based dynamic scope and ref resolution caching:

| Category | Test Example | tjs ns | AJV ns | Gap | Status |
|----------|-------------|--------|--------|-----|--------|
| Meta-schema validation (draft6/7) | `validate definition against metaschema` | 199-414 | 707-739 | **1.7-3.7x faster** | ✅ Done |
| Meta-schema validation (2019-09) | `validate definition against metaschema` | 1,940 | 873 | **2.2x slower** | 🔄 Improved |
| Meta-schema validation (2020-12) | `validate definition against metaschema` | 1,897 | 874 | **2.2x slower** | 🔄 Improved |
| Remote refs (2019-09) | `remote ref, containing refs itself` | 1,376 | 502 | **2.7x slower** | 🔄 Improved |
| Remote refs (2020-12) | `remote ref, containing refs itself` | 1,094 | 405 | **2.7x slower** | 🔄 Improved |
| Complex property tracking | `dependentSchemas with additionalProperties` | ~1,348 | ~677 | **2x slower** | ⏳ Pending |

**Improvements achieved:**
- draft2019-09 "remote ref, containing refs itself": 45,896 → 1,376 ns (**33x faster**)
- draft2020-12 "remote ref, containing refs itself": 81,949 → 1,094 ns (**75x faster**)

> **Note**: The remaining 2-3x gap on draft2019-09/2020-12 is due to inherent complexity of modular meta-schemas (6-7 vocabulary schemas in `allOf`). Further optimization would require inlining vocabulary schemas.

## Problem Analysis

### 1. Meta-Schema Validation (Critical for draft2019-09/2020-12)

**Current State** (corrected after investigation):
- **draft6/7**: tjs is **3x faster** than AJV ✓
- **draft2019-09**: tjs is **2.4x slower** than AJV ✗
- **draft2020-12**: tjs is **4.6x slower** than AJV ✗

**Root Cause for draft2019-09/2020-12 Slowness**:

Investigation of the generated validator code revealed three key issues:

1. **Larger Generated Code**:
   - draft-06: 20,417 chars
   - draft-07: 22,485 chars
   - draft2019-09: **39,279 chars** (1.9x larger)
   - draft2020-12: **41,148 chars** (2x larger)

2. **Dynamic Scope Management Overhead**:
   The 2019-09/2020-12 meta-schemas use `$recursiveRef` and `$dynamicRef` which require maintaining a dynamic scope array. Every validator function pushes/pops to this array:
   ```javascript
   dynamicScope.push({ anchor: 'meta', validate: validate1 });
   // ... validation code ...
   dynamicScope.pop();
   ```

3. **Dynamic Validator Lookup Loop**:
   For each `$recursiveRef`/`$dynamicRef`, the generated code searches the dynamic scope:
   ```javascript
   let dynamicValidator = null;
   for (let i = 0; i < dynamicScope.length; i++) {
     if (dynamicScope[i].anchor === 'meta') {
       dynamicValidator = dynamicScope[i].validate;
       break;
     }
   }
   ```
   This O(n) lookup happens repeatedly during validation.

4. **Modular Meta-Schema Structure**:
   The 2019-09/2020-12 meta-schemas use `allOf` with 6-7 separate vocabulary schemas:
   ```json
   {
     "allOf": [
       { "$ref": "meta/core" },
       { "$ref": "meta/applicator" },
       { "$ref": "meta/validation" },
       { "$ref": "meta/meta-data" },
       { "$ref": "meta/format" },
       { "$ref": "meta/content" }
     ]
   }
   ```
   Each requires a separate function call with dynamic scope management.

**Why draft6/7 is faster**:
- Single monolithic meta-schema (no `allOf` with multiple refs)
- No `$recursiveRef`/`$dynamicRef` handling required
- Simpler generated code with no dynamic scope overhead

**Impact**:
- Affects schema validation use cases (validating schemas against meta-schemas)
- Performance gap grows with schema complexity
- Particularly impacts users of modern JSON Schema drafts

**Why AJV is faster on draft2019-09/2020-12**:
- AJV pre-compiles meta-schemas with optimized dynamic anchor handling
- Uses more efficient dynamic scope representation
- May use hash-based lookup instead of linear search for anchors

### 2. Remote Reference Resolution (High)

**Root Cause**: Each `$ref` to a remote schema incurs resolution overhead. Nested refs multiply this cost.

**Impact**:
- 10-15x slower for complex ref chains
- Affects modular schema architectures
- Common in OpenAPI/Swagger schemas

**Why AJV is faster**:
- Resolves and compiles all refs at schema compile time
- Inlines small referenced schemas
- Uses pointer-based resolution instead of string parsing

### 3. Property Tracking Overhead (Medium)

**Root Cause**: Keywords like `additionalProperties`, `unevaluatedProperties`, and `dependentSchemas` require tracking which properties have been validated.

**Impact**:
- 2-3x slower for complex object schemas
- Affects enterprise schemas with strict property control

**Why AJV is faster**:
- Uses Set-based tracking instead of array operations
- Generates specialized code paths for common patterns
- Avoids property enumeration when possible

## Proposed Improvements

### Phase 1: Dynamic Scope Optimization (Focus: draft2019-09/2020-12)

**Goal**: Reduce draft2019-09/2020-12 meta-schema validation from 2-5x slower to parity with draft6/7 (faster than AJV)

**Current Performance by Draft**:
| Draft | tjs ns | AJV ns | Status |
|-------|--------|--------|--------|
| draft6 | 131 | 412 | ✅ 3.2x faster |
| draft7 | 113 | 354 | ✅ 3.1x faster |
| 2019-09 | 954 | 403 | ❌ 2.4x slower |
| 2020-12 | 1,866 | 409 | ❌ 4.6x slower |

**Optimization Approaches**:

#### 1. Optimize Dynamic Anchor Lookup (High Impact)

Replace O(n) linear search with O(1) Map lookup:

```javascript
// BEFORE: Linear search on every $dynamicRef
let dynamicValidator = null;
for (let i = 0; i < dynamicScope.length; i++) {
  if (dynamicScope[i].anchor === 'meta') {
    dynamicValidator = dynamicScope[i].validate;
    break;
  }
}

// AFTER: Use Map for O(1) lookup
const dynamicValidator = dynamicScope.get('meta');
```

**Implementation**:
- Change `dynamicScope` from `Array<{anchor, validate}>` to `Map<string, {validate, depth}>`
- Track depth for proper scoping on push/pop
- Use Map.get() for instant lookup

#### 2. Reduce Dynamic Scope Push/Pop Overhead

Only push to dynamic scope when schema actually defines `$dynamicAnchor` or `$recursiveAnchor`:

```javascript
// BEFORE: Always push/pop
dynamicScope.push({ anchor: 'meta', validate: validate1 });
// ... validation ...
dynamicScope.pop();

// AFTER: Conditional push/pop (when anchor is defined)
const savedAnchor = dynamicScope.get('meta');
dynamicScope.set('meta', validate1);
// ... validation ...
if (savedAnchor) dynamicScope.set('meta', savedAnchor);
else dynamicScope.delete('meta');
```

#### 3. Inline Simple Vocabulary Schemas

For meta-schemas with modular `allOf` structure, inline the simple vocabularies:

```javascript
// BEFORE: 7 function calls for 7 vocabulary schemas
if (!validate_core(data, errors, path, dynamicScope)) return false;
if (!validate_applicator(data, errors, path, dynamicScope)) return false;
// ... 5 more calls ...

// AFTER: Inline simple checks, only call complex validators
// Inline: meta-data (just type checks), format-annotation, content
// Keep separate: core, applicator, validation (complex logic)
```

#### 4. Static Analysis for Dynamic Ref Elimination

At compile time, detect when `$dynamicRef` always resolves to the same target:

```javascript
// If only one schema defines $dynamicAnchor: "meta" in the entire
// compilation unit, $dynamicRef: "#meta" can be resolved statically
// and converted to a direct function call.
```

**Implementation Files**:
- `src/core/compiler.ts`: Dynamic scope initialization
- `src/core/codegen.ts`: `generateDynamicRefCheck`, `generateRecursiveRefCheck`

**Investigation Tasks**:
1. [x] Compare generated code for draft6 vs draft2019-09 meta-schema validation
2. [x] Identify specific overhead sources in generated code
3. [x] Prototype Map-based dynamic scope
4. [x] Benchmark Map vs Array for scope management
5. [ ] Identify vocabulary schemas that can be inlined

**Results Achieved**:
- ✅ Map-based dynamic scope implemented
- ✅ O(1) lookup instead of O(n) linear search
- ✅ draft2019-09 "remote ref": 45,896 → 1,376 ns (33x faster)
- ✅ draft2020-12 "remote ref": 81,949 → 1,094 ns (75x faster)
- ⏳ Remaining gap: 2-3x slower than AJV (due to modular meta-schema structure)

**Success Metric**:
- ~~draft2019-09/2020-12 meta-schema validation within 1.5x of draft6/7 performance~~
- Current: 2.2-2.7x slower than AJV (was 94-226x slower)

### Phase 2: Reference Resolution Optimization

**Goal**: Reduce ref resolution overhead by 80%

**Approach**:
1. Resolve all $refs at compile time, not validation time
2. Inline small referenced schemas (<10 keywords)
3. Use JSON pointer arithmetic instead of string splitting
4. Cache resolved ref targets in the compiled validator

**Implementation**:
```typescript
// At compile time, resolve and inline refs
function resolveRef(ref: string, root: Schema): Schema {
  // Use cached resolution if available
  if (refCache.has(ref)) return refCache.get(ref);

  // Resolve using pointer arithmetic
  const resolved = resolvePointer(ref, root);
  refCache.set(ref, resolved);
  return resolved;
}
```

**Success Metric**: Remote ref tests <1,000 ns/test

### Phase 3: Property Tracking Optimization

**Goal**: Reduce property tracking overhead by 50%

**Approach**:
1. Use `Set` instead of arrays for property tracking
2. Generate specialized code paths:
   - No additionalProperties: skip tracking entirely
   - additionalProperties: true: skip tracking entirely
   - additionalProperties: false: use optimized exclusion set
3. Pre-compute static property sets at compile time

**Implementation**:
```typescript
// Generated code for additionalProperties: false
const knownProps = new Set(['foo', 'bar', 'baz']);
for (const key in data) {
  if (!knownProps.has(key)) {
    errors.push({ path, message: `unexpected property: ${key}` });
  }
}
```

**Success Metric**: Property tracking tests <500 ns/test

### Phase 4: Code Generation Improvements

**Goal**: Improve overall codegen efficiency by 20%

**Approach**:
1. Inline type checks for common patterns
2. Reduce function call overhead in hot paths
3. Use early-exit patterns for validation failures
4. Avoid object allocations in the happy path

**Example optimizations**:
```typescript
// Before: function call per type check
if (!checkType(data, 'string')) { ... }

// After: inlined check
if (typeof data !== 'string') { ... }
```

**Success Metric**: Overall benchmark improvement of 20%

## Non-Goals

1. **Matching AJV for all edge cases**: Some architectural differences make certain patterns inherently slower. We prioritize common use cases.

2. **Breaking API changes**: All optimizations must maintain backward compatibility.

3. **Reducing code readability**: Optimizations should not make the codebase unmaintainable.

## Success Criteria

| Metric | Current | Target |
|--------|---------|--------|
| Meta-schema (draft6/7) | 3x faster | maintain |
| Meta-schema (2019-09) | 2.4x slower | <1.5x slower |
| Meta-schema (2020-12) | 4.6x slower | <2x slower |
| Remote ref resolution | 14x slower | <3x slower |
| Property tracking | 2x slower | <1.5x slower |
| Overall performance | 34% faster | 40% faster |

## Implementation Plan

### Milestone 1: Dynamic Scope Optimization (Completed Investigation)
- [x] Profile 2019-09/2020-12 meta-schema validation to identify hotspots
- [x] Compare generated validator code across all drafts
- [x] Identify O(n) dynamic scope lookup as primary bottleneck
- [x] Document root causes in PRD

### Milestone 2: Map-Based Dynamic Scope ✅ COMPLETED
- [x] Prototype Map-based dynamic scope implementation
- [x] Benchmark Map vs Array for scope management
- [x] Implement save/restore pattern for scope changes
- [x] Update code generation for new scope format
- **Result**: 33-75x improvement on draft2019-09/2020-12 remote refs

### Milestone 3: Dynamic Ref Optimization (Partial)
- [x] O(1) Map lookup instead of O(n) linear search
- [ ] Detect when $dynamicRef can be resolved statically
- [ ] Eliminate dynamic lookup for single-anchor schemas
- [ ] Inline simple vocabulary schemas

### Milestone 4: Reference Resolution ✅ COMPLETED
- [x] Ref resolution caching (composite key: baseUri|ref)
- [x] Optimized JSON pointer resolution (iterative, lazy decoding)
- [x] Ref inlining already implemented via `shouldInlineRef()`
- [x] Ref chain optimization (follow chains to final target)

### Milestone 5: Property Tracking
- [ ] Convert property tracking to Set-based
- [ ] Generate specialized code paths for common patterns
- [ ] Pre-compute static property sets at compile time
- [ ] Skip tracking when not needed (additionalProperties: true)

### Milestone 6: Codegen Polish
- [ ] Inline common type checks
- [ ] Reduce allocations in hot paths
- [ ] Add early-exit patterns for validation failures
- [ ] Final benchmarking and tuning

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Regressions in correctness | Comprehensive test suite, CI benchmarks |
| Memory increase from caching | Limit cache size, use WeakMap where appropriate |
| Compile-time slowdown | Lazy compilation, benchmark compile times |

## Appendix A: Benchmark Commands

```bash
# Full benchmark
npm run bench

# Quick benchmark (faster feedback)
npm run bench:quick

# Filter to specific tests
npm run bench -- draft7 --filter "metaschema"

# Compliance only (no timing)
npm run bench -- --compliance-only

# Compare specific drafts
npm run bench:quick -- draft6 draft7 --filter "definition"
```

## Appendix B: Profiling Approaches

### Node.js Profiling

```bash
# CPU profiling with Chrome DevTools
node --inspect-brk node_modules/.bin/tsx benchmarks/compare-ajv-quick.ts --quick draft6 --filter definition

# Then open chrome://inspect in Chrome
```

### Comparing Generated Code

```typescript
// Add to src/claude-debug.ts
import { createValidator } from './core/index.js';

// Compare generated code for draft6 vs draft7
const draft6Schema = { $ref: 'http://json-schema.org/draft-06/schema#' };
const draft7Schema = { $ref: 'http://json-schema.org/draft-07/schema#' };

const v6 = createValidator(draft6Schema, { defaultMeta: 'draft6' });
const v7 = createValidator(draft7Schema, { defaultMeta: 'draft7' });

// Inspect the validator source
console.log('Draft6 validator:', v6.toString?.() || 'no source');
console.log('Draft7 validator:', v7.toString?.() || 'no source');
```

### Flame Graph Analysis

```bash
# Generate flamegraph
node --prof node_modules/.bin/tsx benchmarks/compare-ajv-quick.ts --quick draft6 --filter definition
node --prof-process isolate-*.log > profile.txt

# Or use 0x for visual flamegraphs
npx 0x -- node_modules/.bin/tsx benchmarks/compare-ajv-quick.ts --quick draft6 --filter definition
```

## Appendix C: Key Files

| File | Description |
|------|-------------|
| `src/core/compiler.ts` | Main schema compilation logic |
| `src/core/codegen.ts` | Validator code generation |
| `src/core/keywords/*.ts` | Individual keyword implementations |
| `src/meta-schemas/*.json` | Pre-downloaded meta-schemas |
| `benchmarks/compare-ajv-quick.ts` | Benchmark script |

## Appendix D: Benchmark Output Fields

The benchmark now outputs detailed information:

| Field | Description |
|-------|-------------|
| tjs avg | Average nanoseconds per test (tjs) |
| ajv avg | Average nanoseconds per test (AJV) |
| p50 | Median latency |
| p99 | 99th percentile latency |
| min/max | Latency range |
| ratio | How many times slower/faster than AJV |
| kw | Number of schema keywords used |
| variability | (max-min)/avg as percentage |
