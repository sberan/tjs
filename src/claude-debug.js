/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from '../dist/index.js';

const testSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  prefixItems: [{ const: 'foo' }],
  oneOf: [
    {
      prefixItems: [true, { const: 'bar' }],
    },
    {
      prefixItems: [true, { const: 'baz' }],
    },
  ],
  unevaluatedItems: false,
};

const validator = schema(testSchema);
console.log('=== Generated Code ===');
console.log(validator.toString());
