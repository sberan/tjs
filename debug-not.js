import { schema } from './dist/index.js';

const s = schema({
  $schema: 'https://json-schema.org/v1',
  not: {
    $comment: 'this subschema must still produce annotations internally',
    anyOf: [true, { properties: { foo: true } }],
    unevaluatedProperties: false,
  },
});

// Get the validator function code
console.log('Generated code:');
console.log(s.validate.toString());
console.log('\n---\n');

// Test it
console.log('Test { bar: 1 }:', s.validate({ bar: 1 }));
console.log('Test { foo: 1 }:', s.validate({ foo: 1 }));
