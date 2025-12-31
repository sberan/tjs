import { schema } from './dist/index.js';

const s = schema({
  $schema: 'https://json-schema.org/v1',
  not: {
    $comment: 'this subschema must still produce annotations internally',
    anyOf: [true, { properties: { foo: true } }],
    unevaluatedProperties: false,
  },
});

// Access the internal validate function
const validateFn = s.validate;
// Get to the actual validation function
let actualValidator;
for (const prop in validateFn) {
  if (typeof validateFn[prop] === 'function') {
    console.log(`Function property: ${prop}`);
    console.log(validateFn[prop].toString());
  }
}

// Try to get the toString of validateFn itself
console.log('\n=== validateFn itself ===');
// Check if there's a way to access the compiled code
if (validateFn.toString) {
  const fnString = validateFn.toString();
  console.log(fnString.substring(0, 2000));
}
