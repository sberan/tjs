import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// Untyped array
const Arr = schema({ type: 'array' });
expectTypeOf<typeof Arr.type>().toEqualTypeOf<unknown[]>();

// Typed array - strings
const StrArr = schema({
  type: 'array',
  items: { type: 'string' },
});
expectTypeOf<typeof StrArr.type>().toEqualTypeOf<string[]>();

// Typed array - numbers
const NumArr = schema({
  type: 'array',
  items: { type: 'number' },
});
expectTypeOf<typeof NumArr.type>().toEqualTypeOf<number[]>();

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
expectTypeOf<typeof ObjArr.type>().toEqualTypeOf<{ id: string; value?: number }[]>();

// Empty tuple (items: false)
const EmptyTuple = schema({
  type: 'array',
  items: false,
});
expectTypeOf<typeof EmptyTuple.type>().toEqualTypeOf<[]>();

// Tuple - fixed length
const Tuple = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'number' },
  ],
  items: false,
});
expectTypeOf<typeof Tuple.type>().toEqualTypeOf<[string, number]>();

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
expectTypeOf<typeof Tuple3.type>().toEqualTypeOf<[string, number, boolean]>();

// Tuple with rest elements
const TupleRest = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
  ],
  items: { type: 'number' },
});
expectTypeOf<typeof TupleRest.type>().toEqualTypeOf<[string, ...number[]]>();

// Tuple with multiple prefix and rest
const TupleMultiRest = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'boolean' },
  ],
  items: { type: 'number' },
});
expectTypeOf<typeof TupleMultiRest.type>().toEqualTypeOf<[string, boolean, ...number[]]>();

// Nested arrays
const NestedArr = schema({
  type: 'array',
  items: {
    type: 'array',
    items: { type: 'string' },
  },
});
expectTypeOf<typeof NestedArr.type>().toEqualTypeOf<string[][]>();
