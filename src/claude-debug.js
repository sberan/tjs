/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from './index.ts';

// Test case: nested unevaluatedProperties, outer true, inner false
const testSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  allOf: [
    {
      properties: {
        foo: {
          type: 'string',
        },
      },
      unevaluatedProperties: false,
    },
  ],
  unevaluatedProperties: true,
};

const validator = schema(testSchema);
console.log('=== Generated Code ===');
console.log(validator.toString());
