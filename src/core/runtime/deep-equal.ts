/**
 * Deep equality comparison for JSON values.
 * Used for const and enum validation with objects/arrays.
 */
export function createDeepEqual(): (a: unknown, b: unknown) => boolean {
  return function deepEqual(a: unknown, b: unknown): boolean {
    // Fast path: strict equality (handles primitives, same reference)
    if (a === b) return true;

    // Fast path: type mismatch
    const aType = typeof a;
    const bType = typeof b;
    if (aType !== bType) return false;

    // Fast path: non-objects or nulls
    if (aType !== 'object' || a === null || b === null) return false;

    // Fast path: array vs non-array mismatch
    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);
    if (aIsArray !== bIsArray) return false;

    if (aIsArray) {
      const aArr = a as unknown[];
      const bArr = b as unknown[];
      const len = aArr.length;

      // Fast path: length mismatch
      if (len !== bArr.length) return false;

      // Optimize: use for loop instead of every() to reduce function call overhead
      for (let i = 0; i < len; i++) {
        if (!deepEqual(aArr[i], bArr[i])) return false;
      }
      return true;
    }

    // Object comparison
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const len = aKeys.length;

    // Fast path: key count mismatch
    if (len !== Object.keys(bObj).length) return false;

    // Optimize: use for loop instead of every()
    for (let i = 0; i < len; i++) {
      const key = aKeys[i];
      if (!(key in bObj) || !deepEqual(aObj[key], bObj[key])) return false;
    }
    return true;
  };
}
