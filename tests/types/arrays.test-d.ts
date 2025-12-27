import type { Equal, Expect } from './test-utils.js';
import { schema } from 'json-schema-ts';

// Untyped array
const Arr = schema({ type: 'array' });
type _Arr = Expect<Equal<typeof Arr.type, unknown[]>>;

// Typed array - strings
const StrArr = schema({
  type: 'array',
  items: { type: 'string' },
});
type _StrArr = Expect<Equal<typeof StrArr.type, string[]>>;

// Typed array - numbers
const NumArr = schema({
  type: 'array',
  items: { type: 'number' },
});
type _NumArr = Expect<Equal<typeof NumArr.type, number[]>>;

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
type _ObjArr = Expect<Equal<typeof ObjArr.type, { id: string; value?: number }[]>>;

// Empty tuple (items: false)
const EmptyTuple = schema({
  type: 'array',
  items: false,
});
type _EmptyTuple = Expect<Equal<typeof EmptyTuple.type, []>>;

// Tuple - fixed length
const Tuple = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'number' },
  ],
  items: false,
});
type _Tuple = Expect<Equal<typeof Tuple.type, [string, number]>>;

// Tuple - three elements
const Tuple3 = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'number' },
    { type: 'boolean' },
  ],
  items: false,
});
type _Tuple3 = Expect<Equal<typeof Tuple3.type, [string, number, boolean]>>;

// Tuple with rest elements
const TupleRest = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
  ],
  items: { type: 'number' },
});
type _TupleRest = Expect<Equal<typeof TupleRest.type, [string, ...number[]]>>;

// Tuple with multiple prefix and rest
const TupleMultiRest = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'boolean' },
  ],
  items: { type: 'number' },
});
type _TupleMultiRest = Expect<Equal<typeof TupleMultiRest.type, [string, boolean, ...number[]]>>;

// Nested arrays
const NestedArr = schema({
  type: 'array',
  items: {
    type: 'array',
    items: { type: 'string' },
  },
});
type _NestedArr = Expect<Equal<typeof NestedArr.type, string[][]>>;
