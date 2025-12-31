/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from '../dist/index.js';

console.log('Testing AJV-compatible error format...\n');

// Test 1: Type error
const v1 = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer', minimum: 0 }
  },
  required: ['name']
});

console.log('Test 1: Type error');
const result1 = v1({ name: 123 });
console.log('Valid:', result1);
console.log('Errors:', JSON.stringify(v1.errors, null, 2));

console.log('\nTest 2: Required error');
const result2 = v1({ age: 25 });
console.log('Valid:', result2);
console.log('Errors:', JSON.stringify(v1.errors, null, 2));

console.log('\nTest 3: Minimum error');
const result3 = v1({ name: 'John', age: -5 });
console.log('Valid:', result3);
console.log('Errors:', JSON.stringify(v1.errors, null, 2));

console.log('\nTest 4: Successful validation');
const result4 = v1({ name: 'John', age: 25 });
console.log('Valid:', result4);
console.log('Errors:', v1.errors);

console.log('\nTest 5: Pattern error');
const v2 = schema({ type: 'string', pattern: '^[a-z]+$' });
v2('ABC123');
console.log('Errors:', JSON.stringify(v2.errors, null, 2));

console.log('\nAll tests passed!');
