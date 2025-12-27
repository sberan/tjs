import { schema } from 'json-schema-ts';

// anyOf - primitives
const AnyOfPrimitives = schema({
  anyOf: [
    { type: 'string' },
    { type: 'number' },
  ],
});
AnyOfPrimitives.type; // $ExpectType string | number

// anyOf - objects
const AnyOfObjects = schema({
  anyOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
  ],
});
AnyOfObjects.type; // $ExpectType { a: string } | { b: number }

// oneOf - discriminated union
const OneOf = schema({
  oneOf: [
    { type: 'object', properties: { kind: { const: 'a' }, a: { type: 'string' } }, required: ['kind'] },
    { type: 'object', properties: { kind: { const: 'b' }, b: { type: 'number' } }, required: ['kind'] },
  ],
});
OneOf.type; // $ExpectType { kind: "a"; a?: string } | { kind: "b"; b?: number }

// allOf - intersection of objects
const AllOf = schema({
  allOf: [
    { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
    { type: 'object', properties: { age: { type: 'number' } }, required: ['age'] },
  ],
});
AllOf.type.name; // $ExpectType string
AllOf.type.age; // $ExpectType number

// allOf - three schemas
const AllOf3 = schema({
  allOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
    { type: 'object', properties: { c: { type: 'boolean' } }, required: ['c'] },
  ],
});
AllOf3.type.a; // $ExpectType string
AllOf3.type.b; // $ExpectType number
AllOf3.type.c; // $ExpectType boolean

// if/then/else - results in union (then | else branches)
const Conditional = schema({
  type: 'object',
  properties: {
    kind: { type: 'string' },
  },
  if: { properties: { kind: { const: 'premium' } } },
  then: { properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { properties: { trial: { type: 'boolean' } } },
});
type ConditionalType = typeof Conditional.type;
// Verify both branches are valid
const _cond1: ConditionalType = { discount: 10 };
const _cond2: ConditionalType = {};

// Nested composition - anyOf inside object
const NestedAnyOf = schema({
  type: 'object',
  properties: {
    value: {
      anyOf: [
        { type: 'string' },
        { type: 'number' },
      ],
    },
  },
  required: ['value'],
});
NestedAnyOf.type; // $ExpectType { value: string | number }
