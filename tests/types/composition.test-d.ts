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
AllOf.type; // $ExpectType { name: string; } & { age: number; }

// allOf - three schemas
const AllOf3 = schema({
  allOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
    { type: 'object', properties: { c: { type: 'boolean' } }, required: ['c'] },
  ],
});
AllOf3.type; // $ExpectType { a: string; } & { b: number; } & { c: boolean; }

// if/then/else - produces union of then/else branches
const Conditional = schema({
  if: { type: 'string' },
  then: { type: 'string', minLength: 1 },
  else: { type: 'number' },
});
Conditional.type; // $ExpectType string | number

// if/then/else with object branches (explicit types)
const ConditionalObjects = schema({
  if: { type: 'object' },
  then: { type: 'object', properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { type: 'object', properties: { trial: { type: 'boolean' } } },
});
ConditionalObjects.type; // $ExpectType { discount: number; } | { trial?: boolean }

// if/then/else with base object and partial branches - merges properties
const ConditionalMerged = schema({
  type: 'object',
  properties: {
    kind: { type: 'string' },
  },
  if: { properties: { kind: { const: 'premium' } } },
  then: { properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { properties: { trial: { type: 'boolean' } } },
});
ConditionalMerged.type; // $ExpectType { discount: number; kind?: string; } | { kind?: string; trial?: boolean; }

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
