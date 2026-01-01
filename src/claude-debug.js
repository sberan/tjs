/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from '../dist/index.js';

// The problematic test case
const testSchema = {
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  $id: 'https://example.com/schemas/unevaluated-items-are-disallowed',
  $ref: '/schemas/unevaluated-items-are-allowed',
  $recursiveAnchor: true,
  unevaluatedItems: false,
  $defs: {
    '/schemas/unevaluated-items-are-allowed': {
      $schema: 'https://json-schema.org/draft/2019-09/schema',
      $id: '/schemas/unevaluated-items-are-allowed',
      $recursiveAnchor: true,
      type: 'array',
      items: [{ type: 'string' }, { $ref: '#' }],
    },
  },
};

// Create validator
const validator = schema(testSchema, { draft: '2019-09' });

// Test case 1: extra items allowed for inner arrays
const data1 = ['foo', ['bar', [], 8]];
console.log('\n=== Test 1: extra items allowed for inner arrays ===');
console.log('Data:', JSON.stringify(data1));
console.log('Data structure:');
console.log('  Root array length:', data1.length);
console.log('  Item 0:', JSON.stringify(data1[0]));
console.log('  Item 1:', JSON.stringify(data1[1]), '(nested array, length:', data1[1].length, ')');
console.log('Expected: valid (true)');
const result1 = validator.validate(data1);
console.log('Actual:', result1.error ? 'invalid (false)' : 'valid (true)');
if (result1.error) {
  console.log('Errors:', JSON.stringify(result1.error, null, 2));
}

// Test case 2: extra items disallowed for root
const data2 = ['foo', ['bar', [], 8], 8];
console.log('\n=== Test 2: extra items disallowed for root ===');
console.log('Data:', JSON.stringify(data2));
console.log('Expected: invalid (false)');
const result2 = validator.validate(data2);
console.log('Actual:', result2.error ? 'invalid (false)' : 'valid (true)');
if (result2.error) {
  console.log('Errors:', JSON.stringify(result2.error, null, 2));
}

// Let's also output the generated code to see what's happening
console.log('\n=== Generated validation code ===');
const code = validator.toString();
console.log(code);

// Let's manually test the generated function
console.log('\n=== Manual test of generated function ===');
const fn = validator._validate;
console.log('Function type:', typeof fn);
console.log('Testing data1:', JSON.stringify(data1));
const manualResult1 = fn(data1);
console.log('Manual result:', manualResult1);
console.log('Function errors:', fn.errors);
