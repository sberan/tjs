import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// Simple $ref
const WithDefs = schema({
  $defs: {
    Item: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  type: 'array',
  items: { $ref: '#/$defs/Item' },
});
expectTypeOf<typeof WithDefs.type>().toEqualTypeOf<{ id: string }[]>();

// Multiple refs to same definition
const MultiRef = schema({
  $defs: {
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
      required: ['street', 'city'],
    },
  },
  type: 'object',
  properties: {
    home: { $ref: '#/$defs/Address' },
    work: { $ref: '#/$defs/Address' },
  },
});
expectTypeOf<typeof MultiRef.type>().toEqualTypeOf<{
  home?: { street: string; city: string };
  work?: { street: string; city: string };
}>();

// Multiple definitions
const MultipleDefs = schema({
  $defs: {
    Name: {
      type: 'object',
      properties: {
        first: { type: 'string' },
        last: { type: 'string' },
      },
      required: ['first', 'last'],
    },
    Age: {
      type: 'integer',
    },
  },
  type: 'object',
  properties: {
    name: { $ref: '#/$defs/Name' },
    age: { $ref: '#/$defs/Age' },
  },
  required: ['name', 'age'],
});
expectTypeOf<typeof MultipleDefs.type>().toEqualTypeOf<{
  name: { first: string; last: string };
  age: number;
}>();

// Ref in anyOf
const RefInAnyOf = schema({
  $defs: {
    StringType: { type: 'string' },
    NumberType: { type: 'number' },
  },
  anyOf: [
    { $ref: '#/$defs/StringType' },
    { $ref: '#/$defs/NumberType' },
  ],
});
expectTypeOf<typeof RefInAnyOf.type>().toEqualTypeOf<string | number>();

// Nested object with refs
const NestedWithRefs = schema({
  $defs: {
    Coordinate: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' },
      },
      required: ['x', 'y'],
    },
  },
  type: 'object',
  properties: {
    start: { $ref: '#/$defs/Coordinate' },
    end: { $ref: '#/$defs/Coordinate' },
  },
  required: ['start', 'end'],
});
expectTypeOf<typeof NestedWithRefs.type>().toEqualTypeOf<{
  start: { x: number; y: number };
  end: { x: number; y: number };
}>();
