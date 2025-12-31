/*
 * this file is for any scratch work that claude might help with
 */

import { createValidator } from '../dist/index.js';

const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $defs: {
    one: {
      oneOf: [
        { $ref: '#/$defs/two' },
        { required: ['b'], properties: { b: true } },
        { required: ['xx'], patternProperties: { x: true } },
        { required: ['all'], unevaluatedProperties: true },
      ],
    },
    two: {
      oneOf: [
        { required: ['c'], properties: { c: true } },
        { required: ['d'], properties: { d: true } },
      ],
    },
  },
  oneOf: [{ $ref: '#/$defs/one' }, { required: ['a'], properties: { a: true } }],
  unevaluatedProperties: false,
};

const validator = createValidator(schema);
console.log(validator.toString());
