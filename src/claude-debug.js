/**
 * Debug script to inspect generated validation code from tjs
 * Validates assumptions about performance optimizations
 */

import { compile } from '../dist/core/compiler.js';

// Helper to get generated code
function inspectCode(name, schemaObj, options = {}) {
  console.log('\n' + '='.repeat(70));
  console.log(`SCHEMA: ${name}`);
  console.log('='.repeat(70));
  console.log('Input:', JSON.stringify(schemaObj, null, 2));
  if (Object.keys(options).length > 0) {
    console.log('Options:', JSON.stringify(options));
  }

  try {
    // Compile directly to get the raw validation function
    const validateFn = compile(schemaObj, options);

    // Get the underlying validation function's source
    const fnSource = validateFn.toString();

    console.log('\n--- Generated Validation Code ---');
    console.log(fnSource);
    console.log('--- End Code ---\n');

    // Test that it works
    console.log('Validator works:', typeof validateFn === 'function');
  } catch (e) {
    console.error('Error:', e.message);
    console.error(e.stack);
  }
}

// 1. Format validation WITH assertion enabled
console.log('\n\n### 1. FORMAT VALIDATION (with formatAssertion: true) ###');
inspectCode('date-time format', {
  type: 'string',
  format: 'date-time'
}, { formatAssertion: true });

inspectCode('email format', {
  type: 'string',
  format: 'email'
}, { formatAssertion: true });

inspectCode('ipv6 format', {
  type: 'string',
  format: 'ipv6'
}, { formatAssertion: true });

inspectCode('regex format', {
  type: 'string',
  format: 'regex'
}, { formatAssertion: true });

// 2. Enum with objects (needs deepEqual)
console.log('\n\n### 2. ENUM with OBJECTS (uses deepEqual) ###');
inspectCode('enum with objects', {
  enum: [{ a: 1 }, { b: 2 }, 'simple']
});

// 3. Enum optimization comparison
console.log('\n\n### 3. ENUM SIZE THRESHOLD ###');
inspectCode('enum with 15 values (inline)', {
  enum: Array.from({length: 15}, (_, i) => `value${i}`)
});

inspectCode('enum with 16 values (Set)', {
  enum: Array.from({length: 16}, (_, i) => `value${i}`)
});

// 4. oneOf early exit
console.log('\n\n### 4. ONEOF EARLY EXIT ###');
inspectCode('oneOf early exit', {
  oneOf: [
    { type: 'string' },
    { type: 'number' },
    { type: 'boolean' }
  ]
});

// 5. allOf no-op filtering
console.log('\n\n### 5. ALLOF NO-OP FILTERING ###');
inspectCode('allOf with true and {} filtered', {
  allOf: [
    true,
    { type: 'object' },
    {},
    { properties: { name: { type: 'string' } } }
  ]
});

// 6. anyOf no-op optimization
console.log('\n\n### 6. ANYOF NO-OP OPTIMIZATION ###');
inspectCode('anyOf with true (skips entirely)', {
  anyOf: [
    true,
    { type: 'string' }
  ]
});

// 7. Type check typeof caching
console.log('\n\n### 7. TYPEOF CACHING ###');
inspectCode('multiple primitive types', {
  type: ['string', 'number', 'boolean']
});

// 8. contains optimizations
console.log('\n\n### 8. CONTAINS OPTIMIZATIONS ###');
inspectCode('contains true (just length check)', {
  type: 'array',
  contains: true
});

inspectCode('contains with early exit on minContains', {
  type: 'array',
  contains: { type: 'number' },
  minContains: 2
});

// 9. $ref inlining
console.log('\n\n### 9. $REF INLINING ###');
inspectCode('simple $ref is inlined', {
  $defs: {
    name: { type: 'string', minLength: 1 }
  },
  $ref: '#/$defs/name'
});

console.log('\n\nDone inspecting all schemas!');
