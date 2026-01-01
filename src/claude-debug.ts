import { createValidator, type JsonSchema } from './index.js';

// Test 1: in-place applicator siblings, anyOf has unevaluated
const schema1: JsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  allOf: [{ properties: { foo: true } }],
  anyOf: [{ properties: { bar: true }, unevaluatedProperties: false }],
};
const v1 = createValidator(schema1);
console.log('=== Test 1: in-place applicator siblings ===');
console.log(
  `{ foo: 1, bar: 1 }: ${v1.validate({ foo: 1, bar: 1 }).error ? 'INVALID ✓' : 'VALID ✗'}`
);
console.log(`{ foo: 1 }: ${v1.validate({ foo: 1 }).error ? 'INVALID ✓' : 'VALID ✗'}`);
console.log(`{ bar: 1 }: ${!v1.validate({ bar: 1 }).error ? 'VALID ✓' : 'INVALID ✗'}`);

// Test 2: nested outer false, inner true
const schema2: JsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  properties: { foo: { type: 'string' } },
  allOf: [{ unevaluatedProperties: true }],
  unevaluatedProperties: false,
};
const v2 = createValidator(schema2);
console.log('\n=== Test 2: nested outer false, inner true ===');
console.log(`{ foo: "foo" }: ${!v2.validate({ foo: 'foo' }).error ? 'VALID ✓' : 'INVALID ✗'}`);
console.log(
  `{ foo: "foo", bar: "bar" }: ${!v2.validate({ foo: 'foo', bar: 'bar' }).error ? 'VALID ✓' : 'INVALID ✗'}`
);

// Test 3: nested outer true, inner false
const schema3: JsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  properties: { foo: { type: 'string' } },
  allOf: [{ unevaluatedProperties: false }],
  unevaluatedProperties: true,
};
const v3 = createValidator(schema3);
console.log('\n=== Test 3: nested outer true, inner false ===');
console.log(`{ foo: "foo" }: ${v3.validate({ foo: 'foo' }).error ? 'INVALID ✓' : 'VALID ✗'}`);

// Test 4: instance location
const schema4: JsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  properties: { foo: { properties: { bar: { type: 'string' } } } },
  unevaluatedProperties: false,
};
const v4 = createValidator(schema4);
console.log('\n=== Test 4: instance location ===');
console.log(
  `{ foo: { bar: "x" }, bar: "y" }: ${v4.validate({ foo: { bar: 'x' }, bar: 'y' }).error ? 'INVALID ✓' : 'VALID ✗'}`
);
