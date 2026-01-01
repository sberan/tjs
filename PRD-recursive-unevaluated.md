# PRD: Fixing unevaluatedItems/Properties with $recursiveRef

## Problem Statement

Three draft2019-09 tests are failing because `unevaluatedItems` and `unevaluatedProperties` don't correctly track items/properties evaluated by schemas reached through `$recursiveRef` dynamic resolution.

### Failing Tests

1. **ref > $ref with $recursiveAnchor > extra items allowed for inner arrays**
2. **unevaluatedItems > unevaluatedItems with $recursiveRef > with no unevaluated items**
3. **unevaluatedProperties > unevaluatedProperties with $recursiveRef > with no unevaluated properties**

## Root Cause Analysis

### Current Architecture

The tjs validator uses a hybrid tracking approach:
- **Static tracking**: Properties/items known at compile-time are tracked via Sets
- **Dynamic tracking**: For runtime-determined schemas (anyOf/oneOf branches), a runtime variable tracks additional properties/items

When `$recursiveRef: "#"` resolves:
1. At compile time, it resolves to a static target schema
2. At runtime, if the target has `$recursiveAnchor: true`, it searches the dynamic scope for an override

**The Bug**: The current implementation only tracks properties/items from the *static* target schema at compile time. When the dynamic scope provides a *different* schema at runtime, the properties/items from that dynamically-resolved schema are not tracked.

### Example: unevaluatedProperties with $recursiveRef

```json
{
  "$id": "extended-tree",
  "$recursiveAnchor": true,
  "$ref": "./tree",
  "properties": { "name": { "type": "string" } },  // "name" is tracked

  "$defs": {
    "tree": {
      "$id": "./tree",
      "$recursiveAnchor": true,
      "properties": {
        "node": true,
        "branches": {
          "unevaluatedProperties": false,
          "$recursiveRef": "#"  // At runtime, resolves to extended-tree (not tree)
        }
      }
    }
  }
}
```

Data: `{ "name": "a", "node": 1, "branches": { "name": "b", "node": 2 } }`

**What happens now:**
- At `branches`, `$recursiveRef: "#"` statically points to `tree`
- `tree` has properties `node` and `branches`, so those are tracked
- `unevaluatedProperties: false` then rejects `name` as unevaluated
- Test fails (should pass because `extended-tree` adds `name` to evaluated properties)

**What should happen:**
- At runtime, `$recursiveRef` resolves to `extended-tree` (from dynamic scope)
- `extended-tree` has properties `name`, `node`, `branches`
- All properties in `{ "name": "b", "node": 2 }` are evaluated
- Test passes

## Solution Options

### Option A: Runtime Property/Item Tracking (Most Correct)

Pass tracking variables through the dynamic scope and let validators report what they evaluated.

**Pros**: Handles all cases correctly
**Cons**: Adds runtime overhead, requires changing validator function signatures

### Option B: Compile-Time Union of All Possible Schemas (Current Approach for $dynamicRef)

Track properties/items from ALL schemas that could potentially be resolved via `$recursiveRef`.

**Pros**: No runtime overhead, already implemented for `$dynamicRef`
**Cons**: May over-track (but that's safe - it just makes validation more permissive)

### Option C: Hybrid - Track Static + Enable Runtime Dynamic

Keep static tracking but enable the runtime dynamic tracking variable when `$recursiveRef` is involved.

**Pros**: Balances correctness and performance
**Cons**: More complex implementation

## Recommended Solution: Option B (Compile-Time Union)

This is the most pragmatic approach because:
1. It's already proven to work for `$dynamicRef`
2. No runtime performance impact
3. Safe (over-tracking is permissive, not restrictive)
4. Simpler implementation

### Implementation Plan

#### Step 1: Identify All Schemas with $recursiveAnchor: true

The context already tracks these via `#resourceRecursiveAnchors`. We need a method to get ALL schemas with `$recursiveAnchor: true`:

```typescript
// In context.ts
getAllRecursiveAnchorSchemas(): JsonSchema[] {
  return Array.from(this.#resourceRecursiveAnchors.values());
}
```

#### Step 2: Update generateRecursiveRefCheck in compiler.ts

Before calling the validator, track properties/items from ALL schemas that might be dynamically resolved:

```typescript
// In generateRecursiveRefCheck
if (hasRecursiveAnchor) {
  // Track properties/items from ALL schemas with $recursiveAnchor: true
  // because any of them could be the runtime resolution target
  const propsTracker = ctx.getPropsTracker();
  const itemsTracker = ctx.getItemsTracker();

  for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
    if (typeof dynSchema === 'object' && dynSchema !== null) {
      // Track properties
      if (propsTracker.active && dynSchema.properties) {
        propsTracker.emitAddProperties(Object.keys(dynSchema.properties));
      }
      // Track items
      if (itemsTracker.active && Array.isArray(dynSchema.items)) {
        itemsTracker.emitAddItems(dynSchema.items.length);
      }
    }
  }
}
```

#### Step 3: Handle $ref with $recursiveAnchor context

The third failing test (`$ref with $recursiveAnchor`) involves a plain `$ref: "#"` within a schema that has `$recursiveAnchor: true`. In this context, even a plain `$ref` can benefit from the extended tracking.

When compiling a `$ref`, if the current schema resource has `$recursiveAnchor: true`, track properties from all recursive anchor schemas.

### Detailed Code Changes

#### context.ts

```typescript
// Add method to get all recursive anchor schemas
getAllRecursiveAnchorSchemas(): JsonSchema[] {
  return Array.from(this.#resourceRecursiveAnchors.values());
}
```

#### compiler.ts - generateRecursiveRefCheck

```typescript
export function generateRecursiveRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): void {
  if (!schema.$recursiveRef) return;
  // ... existing validation ...

  const staticFuncName = ctx.queueCompile(staticSchema);
  const hasRecursiveAnchor = ctx.hasRecursiveAnchor(staticSchema);

  // NEW: Track properties/items from all schemas that could be dynamically resolved
  if (hasRecursiveAnchor) {
    const propsTracker = ctx.getPropsTracker();
    const itemsTracker = ctx.getItemsTracker();

    for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
      if (typeof dynSchema === 'object' && dynSchema !== null) {
        if (propsTracker.active && dynSchema.properties) {
          propsTracker.emitAddProperties(Object.keys(dynSchema.properties));
        }
        if (itemsTracker.active) {
          if (Array.isArray(dynSchema.items)) {
            itemsTracker.emitAddItems(dynSchema.items.length);
          } else if (dynSchema.items && dynSchema.items !== false) {
            itemsTracker.emitMarkAllEvaluated();
          }
        }
      }
    }
  }

  // ... rest of existing code ...
}
```

## Testing Plan

1. Run the full test suite to ensure no regressions
2. Verify all 3 failing tests now pass
3. Check performance impact (should be minimal - only affects compile time)

## Success Criteria

- All 3 failing draft2019-09 tests pass
- No regressions in other tests
- Performance remains within acceptable bounds

## Timeline

This is a focused fix that should take 1-2 hours to implement and test.
