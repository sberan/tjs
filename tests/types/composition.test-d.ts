import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// anyOf - primitives
const AnyOfPrimitives = schema({
  anyOf: [
    { type: 'string' },
    { type: 'number' },
  ],
});
expectTypeOf<typeof AnyOfPrimitives.type>().toEqualTypeOf<string | number>();

// anyOf - objects
const AnyOfObjects = schema({
  anyOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
  ],
});
expectTypeOf<typeof AnyOfObjects.type>().toEqualTypeOf<{ a: string } | { b: number }>();

// oneOf - discriminated union
const OneOf = schema({
  oneOf: [
    { type: 'object', properties: { kind: { const: 'a' }, a: { type: 'string' } }, required: ['kind'] },
    { type: 'object', properties: { kind: { const: 'b' }, b: { type: 'number' } }, required: ['kind'] },
  ],
});
expectTypeOf<typeof OneOf.type>().toEqualTypeOf<
  { kind: 'a'; a?: string } | { kind: 'b'; b?: number }
>();

// allOf - intersection of objects
const AllOf = schema({
  allOf: [
    { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
    { type: 'object', properties: { age: { type: 'number' } }, required: ['age'] },
  ],
});
expectTypeOf<typeof AllOf.type>().toEqualTypeOf<{ name: string } & { age: number }>();

// allOf - three schemas
const AllOf3 = schema({
  allOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
    { type: 'object', properties: { c: { type: 'boolean' } }, required: ['c'] },
  ],
});
expectTypeOf<typeof AllOf3.type>().toEqualTypeOf<
  { a: string } & { b: number } & { c: boolean }
>();

// if/then/else
const Conditional = schema({
  type: 'object',
  properties: {
    kind: { type: 'string' },
  },
  if: { properties: { kind: { const: 'premium' } } },
  then: { properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { properties: { trial: { type: 'boolean' } } },
});
expectTypeOf<typeof Conditional.type>().toEqualTypeOf<
  { kind?: string; discount: number } | { kind?: string; trial?: boolean }
>();

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
expectTypeOf<typeof NestedAnyOf.type>().toEqualTypeOf<{ value: string | number }>();
