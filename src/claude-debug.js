/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from './index.ts';

// Test case 1: collect annotations inside a 'not'
const testSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  not: {
    $comment: 'this subschema must still produce annotations internally',
    anyOf: [true, { properties: { foo: true } }],
    unevaluatedProperties: false,
  },
};

const validator = schema(testSchema);
console.log('=== Test 1: Not with unevaluatedProperties ===');
console.log(validator.toString());

// Test case 2: simple not without unevaluatedProperties
const simpleSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  not: {
    properties: { foo: { type: 'string' } },
  },
};

const validator2 = schema(simpleSchema);
console.log('\n=== Test 2: Simple Not (no unevaluatedProperties) ===');
console.log(validator2.toString());
