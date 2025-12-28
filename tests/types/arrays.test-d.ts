import { schema } from 'tjs';

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

// =============================================
// Draft-07 compatibility: items as array
// =============================================

// Draft-07 tuple - fixed length with additionalItems: false
const Draft07Tuple = schema({
  type: 'array',
  items: [{ type: 'string' }, { type: 'number' }],
  additionalItems: false,
} as const);
Draft07Tuple.type; // $ExpectType [string, number]

// Draft-07 tuple with three elements
const Draft07Tuple3 = schema({
  type: 'array',
  items: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
  additionalItems: false,
} as const);
Draft07Tuple3.type; // $ExpectType [string, number, boolean]

// Draft-07 tuple with rest elements (additionalItems schema)
const Draft07TupleRest = schema({
  type: 'array',
  items: [{ type: 'string' }],
  additionalItems: { type: 'number' },
} as const);
Draft07TupleRest.type; // $ExpectType [string, ...number[]]

// Draft-07 tuple with multiple prefix and rest
const Draft07TupleMultiRest = schema({
  type: 'array',
  items: [{ type: 'string' }, { type: 'boolean' }],
  additionalItems: { type: 'number' },
} as const);
Draft07TupleMultiRest.type; // $ExpectType [string, boolean, ...number[]]

// Draft-07 tuple without additionalItems (open tuple)
const Draft07OpenTuple = schema({
  type: 'array',
  items: [{ type: 'string' }, { type: 'number' }],
} as const);
Draft07OpenTuple.type; // $ExpectType [string, number, ...unknown[]]
