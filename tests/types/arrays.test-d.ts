import { schema } from 'json-schema-ts';

// Untyped array
const Arr = schema({ type: 'array' });
Arr.type; // $ExpectType unknown[]

// Typed array - strings
const StrArr = schema({
  type: 'array',
  items: { type: 'string' },
});
StrArr.type; // $ExpectType string[]

// Typed array - numbers
const NumArr = schema({
  type: 'array',
  items: { type: 'number' },
});
NumArr.type; // $ExpectType number[]

// Typed array - objects
const ObjArr = schema({
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      value: { type: 'number' },
    },
    required: ['id'],
  },
});
ObjArr.type; // $ExpectType { id: string; value?: number }[]

// Empty tuple (items: false)
const EmptyTuple = schema({
  type: 'array',
  items: false,
});
EmptyTuple.type; // $ExpectType []

// Tuple - fixed length
const Tuple = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }, { type: 'number' }],
  items: false,
});
Tuple.type; // $ExpectType [string, number]

// Tuple - three elements
const Tuple3 = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
  items: false,
});
Tuple3.type; // $ExpectType [string, number, boolean]

// Tuple with rest elements
const TupleRest = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }],
  items: { type: 'number' },
});
TupleRest.type; // $ExpectType [string, ...number[]]

// Tuple with multiple prefix and rest
const TupleMultiRest = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }, { type: 'boolean' }],
  items: { type: 'number' },
});
TupleMultiRest.type; // $ExpectType [string, boolean, ...number[]]

// Nested arrays
const NestedArr = schema({
  type: 'array',
  items: {
    type: 'array',
    items: { type: 'string' },
  },
});
NestedArr.type; // $ExpectType string[][]
