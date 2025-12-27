import type { Equal, Expect } from './test-utils.js';
import { schema } from 'json-schema-ts';

// anyOf - primitives
const AnyOfPrimitives = schema({
  anyOf: [
    { type: 'string' },
    { type: 'number' },
  ],
});
type _AnyOfPrimitives = Expect<Equal<typeof AnyOfPrimitives.type, string | number>>;

// anyOf - objects
const AnyOfObjects = schema({
  anyOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
  ],
});
type _AnyOfObjects = Expect<Equal<typeof AnyOfObjects.type, { a: string } | { b: number }>>;

// oneOf - discriminated union
const OneOf = schema({
  oneOf: [
    { type: 'object', properties: { kind: { const: 'a' }, a: { type: 'string' } }, required: ['kind'] },
    { type: 'object', properties: { kind: { const: 'b' }, b: { type: 'number' } }, required: ['kind'] },
  ],
});
type _OneOf = Expect<Equal<typeof OneOf.type, { kind: 'a'; a?: string } | { kind: 'b'; b?: number }>>;

// allOf - intersection of objects
const AllOf = schema({
  allOf: [
    { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
    { type: 'object', properties: { age: { type: 'number' } }, required: ['age'] },
  ],
});
type _AllOfName = Expect<Equal<typeof AllOf.type['name'], string>>;
type _AllOfAge = Expect<Equal<typeof AllOf.type['age'], number>>;

// allOf - three schemas
const AllOf3 = schema({
  allOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
    { type: 'object', properties: { c: { type: 'boolean' } }, required: ['c'] },
  ],
});
type _AllOf3A = Expect<Equal<typeof AllOf3.type['a'], string>>;
type _AllOf3B = Expect<Equal<typeof AllOf3.type['b'], number>>;
type _AllOf3C = Expect<Equal<typeof AllOf3.type['c'], boolean>>;

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
type _NestedAnyOf = Expect<Equal<typeof NestedAnyOf.type, { value: string | number }>>;
