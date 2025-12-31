/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from '../dist/index.js';

// Test current TJS code
const testSchema = {
  properties: {
    foo: {},
    bar: {},
  },
  required: ['foo'],
};

const validator = schema(testSchema);
console.log('=== TJS Generated Code ===');
console.log(validator.toString());

const testSchema2 = {
  properties: {
    foo: {},
    bar: {},
    baz: {},
  },
  required: ['foo', 'bar', 'baz'],
};

const validator2 = schema(testSchema2);
console.log('\n=== TJS Multiple Required ===');
console.log(validator2.toString());

// Test AJV code
const Ajv = require('ajv').default;
const ajv = new Ajv({ code: { source: true, lines: true } });

const validate = ajv.compile(testSchema);
console.log('\n=== AJV Generated Code ===');
console.log(validate.toString());

const validate2 = ajv.compile(testSchema2);
console.log('\n=== AJV Multiple Required ===');
console.log(validate2.toString());
