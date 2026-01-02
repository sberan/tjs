import { createValidator } from '../dist/core/index.js';

// Test case 1: unevaluatedItems with tuple (worst case: 6.3x slower)
const s1 = createValidator({
  type: 'array',
  prefixItems: [{ type: 'string' }],
  unevaluatedItems: false,
});

console.log('=== unevaluatedItems with tuple ===');
console.log(s1.toString());
console.log('\n');

// Test case 2: unevaluatedItems with $recursiveRef (2.9x slower)
const s2 = createValidator({
  $recursiveAnchor: true,
  type: 'array',
  prefixItems: [{ type: 'string' }],
  items: { $recursiveRef: '#' },
  unevaluatedItems: false,
});

console.log('=== unevaluatedItems with $recursiveRef ===');
console.log(s2.toString());
console.log('\n');

// Test case 3: unevaluatedItems with anyOf (1.2x slower)
const s3 = createValidator({
  type: 'array',
  anyOf: [{ prefixItems: [{ const: 'foo' }] }, { prefixItems: [{ const: 'bar' }] }],
  unevaluatedItems: false,
});

console.log('=== unevaluatedItems with anyOf ===');
console.log(s3.toString());
