/**
 * Compare tjs vs ajv generated code side-by-side
 */

import { compile as tjsCompile } from '../dist/core/compiler.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ code: { source: true }, allErrors: false });
addFormats(ajv);

function compare(name, schema, tjsOptions = {}) {
  console.log('\n' + '='.repeat(80));
  console.log(`SCHEMA: ${name}`);
  console.log('='.repeat(80));
  console.log('Input:', JSON.stringify(schema, null, 2));

  // tjs
  console.log('\n--- TJS Generated Code ---');
  try {
    const tjsFn = tjsCompile(schema, tjsOptions);
    console.log(tjsFn.toString());
  } catch (e) {
    console.log('Error:', e.message);
  }

  // ajv
  console.log('\n--- AJV Generated Code ---');
  try {
    const ajvValidate = ajv.compile(schema);
    // Get source code from ajv
    const sourceCode = ajv.getSchema(schema.$id || '#')?.source?.code;
    if (sourceCode) {
      console.log(sourceCode);
    } else {
      // Fallback: show the function
      console.log(ajvValidate.toString());
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}

// 1. Enum optimization
console.log('\n\n### 1. ENUM OPTIMIZATION ###');
compare('small enum (5 values)', {
  $id: 'enum5',
  enum: ['red', 'green', 'blue', 'yellow', 'purple']
});

// 2. Multiple types (typeof caching)
console.log('\n\n### 2. TYPEOF CACHING ###');
compare('multiple primitive types', {
  $id: 'types3',
  type: ['string', 'number', 'boolean']
});

// 3. oneOf early exit
console.log('\n\n### 3. ONEOF EARLY EXIT ###');
compare('oneOf', {
  $id: 'oneOf3',
  oneOf: [
    { type: 'string' },
    { type: 'number' },
    { type: 'boolean' }
  ]
});

// 4. allOf with no-ops
console.log('\n\n### 4. ALLOF NO-OP FILTERING ###');
compare('allOf with true and {}', {
  $id: 'allOf4',
  allOf: [
    true,
    { type: 'object' },
    {},
    { properties: { name: { type: 'string' } } }
  ]
});

// 5. anyOf with no-op
console.log('\n\n### 5. ANYOF NO-OP ###');
compare('anyOf with true', {
  $id: 'anyOf2',
  anyOf: [
    true,
    { type: 'string' }
  ]
});

// 6. Format validation
console.log('\n\n### 6. FORMAT VALIDATION ###');
compare('date-time format', {
  $id: 'datetime',
  type: 'string',
  format: 'date-time'
}, { formatAssertion: true });

// 7. contains
console.log('\n\n### 7. CONTAINS ###');
compare('contains true', {
  $id: 'containsTrue',
  type: 'array',
  contains: true
});

console.log('\n\nDone!');
