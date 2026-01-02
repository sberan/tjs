# PRD: Reference Resolution Optimization

## Overview

This document outlines performance optimization opportunities for `$ref` resolution in tjs. While tjs is generally faster than AJV for simple references, complex reference chains and remote refs show significant performance gaps.

## Current State

### Benchmark Summary ($ref tests)

| Test Category | Draft | tjs ns | AJV ns | Gap |
|---------------|-------|--------|--------|-----|
| remote ref, containing refs itself | draft2020-12 | 81,949 | 362 | **226x slower** |
| remote ref, containing refs itself | draft2019-09 | 45,896 | 490 | **94x slower** |
| remote ref, containing refs itself | draft7 | 562 | 283 | **2x slower** |
| remote ref | draft2019-09 | 113 | 31 | **3.7x slower** |
| ref within remote ref | draft4 | 157 | 82 | **1.9x slower** |
| fragment within remote ref | draft4 | 239 | 180 | **1.3x slower** |

### Tests Where tjs is Faster

| Test Category | Draft | tjs ns | AJV ns | Result |
|---------------|-------|--------|--------|--------|
| ref within remote ref | draft6 | 29 | 150 | **5.2x faster** |
| fragment within remote ref | draft7 | 26 | 113 | **4.3x faster** |
| ref within remote ref | draft2019-09 | 66 | 129 | **1.9x faster** |
| root ref in remote ref | draft2020-12 | 163 | 227 | **1.4x faster** |

### Key Observation

The **"remote ref, containing refs itself"** test is the primary bottleneck. This test uses `{ "$ref": "https://json-schema.org/draft/2020-12/schema" }` which references the meta-schema. The extreme slowdown (94-226x) on draft2019-09/2020-12 is actually caused by the modular meta-schema structure and `$dynamicRef` handling, which is covered in the [Dynamic Scope Optimization PRD](./PRD-performance-improvements.md#phase-1-dynamic-scope-optimization-focus-draft2019-092020-12).

This PRD focuses on **general $ref resolution optimizations** that apply to all reference types.

## Problem Analysis

### 1. Reference Resolution Overhead

**Current Implementation** (in `src/core/context.ts`):

```typescript
resolveRef(ref: string, fromSchema: JsonSchemaBase): JsonSchema | undefined {
  const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';

  if (ref === '#') { ... }
  if (ref.startsWith('#/')) { /* JSON pointer resolution */ }

  // Multiple Map lookups, string parsing, URI resolution
  const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
  // ... more string operations
}
```

**Issues**:
1. Every `$ref` requires string parsing with regex
2. Multiple Map lookups per resolution
3. URI resolution involves string concatenation
4. JSON pointer traversal requires array operations

### 2. JSON Pointer Resolution

**Current Implementation**:
```typescript
#resolveJsonPointer(schema: JsonSchema, pointer: string): JsonSchema | undefined {
  const segments = pointer
    .split('/')
    .slice(1)
    .map((seg) => decodeURIComponent(seg).replace(/~1/g, '/').replace(/~0/g, '~'));
  // ... traversal
}
```

**Issues**:
1. Creates new arrays on every call (`split`, `slice`, `map`)
2. Runs `decodeURIComponent` and regex replacements even for simple pointers
3. No caching of resolved paths

### 3. Compile-Time vs Validation-Time Resolution

**Current State**: All `$ref` resolution happens at compile time, which is good. However:
- No caching of resolved schemas across compilations
- No pre-computation of common reference patterns
- Each schema compilation re-resolves all references

### 4. Function Call Overhead for $ref

**Generated Code** (for simple `$ref`):
```javascript
if (!validate1(data, errors, path)) {
  return false;
}
```

**Issues**:
- Every `$ref` becomes a function call
- Function calls have overhead (stack frame, argument passing)
- Simple schemas could be inlined instead

## Proposed Improvements

### Phase 1: Ref Resolution Caching (High Impact)

**Goal**: Eliminate repeated ref resolution for the same URI.

**Approach**:
```typescript
// Cache resolved refs with composite key: (ref, baseUri) -> schema
readonly #refCache = new Map<string, JsonSchema>();

resolveRef(ref: string, fromSchema: JsonSchemaBase): JsonSchema | undefined {
  const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';
  const cacheKey = `${currentBaseUri}|${ref}`;

  if (this.#refCache.has(cacheKey)) {
    return this.#refCache.get(cacheKey);
  }

  const resolved = this.#resolveRefImpl(ref, currentBaseUri);
  if (resolved) {
    this.#refCache.set(cacheKey, resolved);
  }
  return resolved;
}
```

**Expected Impact**: 20-30% improvement for schemas with many repeated $refs.

### Phase 2: Optimized JSON Pointer Resolution (Medium Impact)

**Goal**: Reduce allocations and string operations in pointer resolution.

**Approach**:
```typescript
// Pre-compiled pointer resolution (at compile time)
#resolveJsonPointer(schema: JsonSchema, pointer: string): JsonSchema | undefined {
  // Fast path for common patterns
  if (pointer === '/$defs') return (schema as any).$defs;
  if (pointer === '/definitions') return (schema as any).definitions;

  // Single-segment optimization (most common case)
  const firstSlash = pointer.indexOf('/', 1);
  if (firstSlash === -1) {
    const key = pointer.slice(1); // No decoding needed for most keys
    return (schema as any)[key];
  }

  // Use iterative approach instead of array allocation
  let current: unknown = schema;
  let start = 1;
  while (start < pointer.length) {
    const end = pointer.indexOf('/', start);
    const segment = end === -1
      ? pointer.slice(start)
      : pointer.slice(start, end);

    // Only decode if necessary
    const decoded = segment.includes('%') || segment.includes('~')
      ? decodePointerSegment(segment)
      : segment;

    current = (current as any)[decoded];
    if (current === undefined) return undefined;

    start = end === -1 ? pointer.length : end + 1;
  }
  return current as JsonSchema;
}
```

**Expected Impact**: 10-20% improvement for JSON pointer resolution.

### Phase 3: Ref Inlining (High Impact)

**Goal**: Inline small referenced schemas to eliminate function call overhead.

**Current Behavior**: Every `$ref` generates a function call.

**Proposed Behavior**: Inline schemas that are:
- Boolean schemas (`true` or `false`)
- Simple type checks (`{ "type": "string" }`)
- Small schemas (<5 keywords, no sub-refs)

**Implementation**:
```typescript
function canInlineRef(schema: JsonSchema): boolean {
  if (typeof schema === 'boolean') return true;
  if (typeof schema !== 'object' || schema === null) return false;

  // Don't inline if has $ref (would need recursive resolution)
  if (schema.$ref) return false;

  // Don't inline if has composition keywords
  if (schema.allOf || schema.anyOf || schema.oneOf || schema.not) return false;
  if (schema.if || schema.then || schema.else) return false;

  // Count keywords
  const keywords = Object.keys(schema).filter(k => !k.startsWith('$') || k === '$ref');
  return keywords.length <= 3;
}

// Generated code for inlined ref
// BEFORE:
if (!validate1(data, errors, path)) return false;

// AFTER (inlined { "type": "string" }):
if (!(typeof data === 'string')) {
  validate0.errors = [{ instancePath: path, ... }];
  return false;
}
```

**Expected Impact**: 30-50% improvement for schemas with many simple $refs.

### Phase 4: URI Resolution Optimization (Low Impact)

**Goal**: Faster URI resolution for relative refs.

**Approach**:
```typescript
#resolveUri(ref: string, baseUri: string): string {
  // Fast path: already absolute
  if (ref.charCodeAt(0) === 104 /* 'h' */ && ref.startsWith('http')) {
    return ref;
  }

  // Fast path: no base URI
  if (!baseUri) return ref;

  // Cache the base URI without fragment (computed once per schema)
  const base = this.#cachedBaseWithoutFragment.get(baseUri) ??
    baseUri.split('#')[0];

  // ... rest of resolution
}
```

**Expected Impact**: 5-10% improvement for schemas with many relative refs.

### Phase 5: Compile-Time Ref Chain Optimization (Medium Impact)

**Goal**: Pre-resolve reference chains at compile time.

**Example**:
```json
{
  "$defs": {
    "a": { "$ref": "#/$defs/b" },
    "b": { "$ref": "#/$defs/c" },
    "c": { "type": "string" }
  },
  "$ref": "#/$defs/a"
}
```

**Current**: Generates 3 nested function calls.
**Proposed**: Detect chain and resolve to final target at compile time.

```typescript
function resolveRefChain(ref: string, ctx: CompileContext): JsonSchema {
  const visited = new Set<string>();
  let current = ctx.resolveRef(ref, schema);

  while (current && typeof current === 'object' && current.$ref) {
    if (visited.has(current.$ref)) {
      // Circular ref - stop resolution
      break;
    }
    visited.add(current.$ref);
    current = ctx.resolveRef(current.$ref, current);
  }

  return current;
}
```

**Expected Impact**: 15-25% improvement for schemas with ref chains.

## Implementation Plan

### Milestone 1: Ref Resolution Caching
- [ ] Add ref cache to CompileContext
- [ ] Benchmark cache hit rate for real-world schemas
- [ ] Measure memory impact of caching

### Milestone 2: JSON Pointer Optimization
- [ ] Implement iterative pointer resolution
- [ ] Add fast paths for common patterns
- [ ] Benchmark improvement on pointer-heavy schemas

### Milestone 3: Ref Inlining
- [ ] Implement `canInlineRef()` heuristic
- [ ] Update code generation to inline simple schemas
- [ ] Add tests for inlined refs
- [ ] Benchmark improvement

### Milestone 4: Ref Chain Optimization
- [ ] Implement ref chain detection
- [ ] Pre-resolve chains at compile time
- [ ] Handle circular refs safely
- [ ] Benchmark improvement

### Milestone 5: URI Resolution Optimization
- [ ] Profile URI resolution hot spots
- [ ] Implement caching for base URI components
- [ ] Benchmark improvement

## Success Criteria

| Metric | Current | Target |
|--------|---------|--------|
| Simple remote ref | 1.5-2x slower | <1.2x slower |
| Ref chain resolution | 2-3x slower | <1.5x slower |
| JSON pointer resolution | 1.5x slower | <1.2x slower |
| Ref-heavy schemas (overall) | varies | 20% improvement |

## Non-Goals

1. **Runtime ref caching**: All refs are resolved at compile time; no validation-time caching needed.

2. **Async ref fetching optimization**: Out of scope for this PRD (handled separately).

3. **meta-schema ref optimization**: The extreme slowdown for "remote ref, containing refs itself" on draft2019-09/2020-12 is caused by `$dynamicRef`, not general ref resolution. That is addressed in the Dynamic Scope Optimization PRD.

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Inlining increases code size | Set keyword limit for inlining, benchmark code size |
| Cache memory growth | Limit cache size, clear between compilations |
| Ref chain cycles | Track visited refs, stop at cycles |

## Appendix A: Benchmark Commands

```bash
# All ref tests
npm run bench:quick -- --filter "ref"

# Specific ref patterns
npm run bench:quick -- --filter "remote ref"
npm run bench:quick -- --filter "fragment within"
npm run bench:quick -- --filter "ref chain"

# Profile ref resolution
node --inspect-brk node_modules/.bin/tsx benchmarks/compare-ajv-quick.ts --quick draft7 --filter ref
```

## Appendix B: Key Files

| File | Description |
|------|-------------|
| `src/core/context.ts` | `resolveRef()`, `#resolveJsonPointer()`, `#resolveUri()` |
| `src/core/compiler.ts` | `$ref` code generation, ref chain handling |
| `benchmarks/compare-ajv-quick.ts` | Benchmark script |

## Appendix C: Reference Resolution Flow

```
$ref: "other.json#/$defs/foo"
        │
        ▼
┌───────────────────────────────┐
│ 1. Parse ref string           │
│    - Extract URI: "other.json"│
│    - Extract fragment: "#/$defs/foo"
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│ 2. Resolve URI against base   │
│    - currentBaseUri + ref URI │
│    - Normalize path           │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│ 3. Lookup base schema         │
│    - Check #schemasById       │
│    - Check #anchors           │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│ 4. Resolve JSON pointer       │
│    - Split pointer into parts │
│    - Traverse schema tree     │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│ 5. Queue for compilation      │
│    - Generate function name   │
│    - Add to compile queue     │
└───────────────────────────────┘
```

Each step has optimization opportunities identified in this PRD.
