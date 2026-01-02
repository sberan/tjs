import { createValidator } from '../dist/core/index.js';

// Test case 1: object type
const s1 = createValidator({
  type: 'object',
});

console.log('=== OBJECT ===');
console.log(s1.toString());
console.log('\n');

// Test case 2: string type
const s2 = createValidator({
  type: 'string',
});

console.log('=== STRING ===');
console.log(s2.toString());
console.log('\n');

// Test case 3: integer type
const s3 = createValidator({
  type: 'integer',
});

console.log('=== INTEGER ===');
console.log(s3.toString());
console.log('\n');

// Test case 4: array type
const s4 = createValidator({
  type: 'array',
});

console.log('=== ARRAY ===');
console.log(s4.toString());
