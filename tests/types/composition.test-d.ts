import type { JsonArray, JsonObject, JsonValue } from 'type-fest';
import { schema } from 'tjs';

// =============================================================================
// anyOf - Union Types
// =============================================================================

// anyOf - primitives
const AnyOfPrimitives = schema({
  anyOf: [{ type: 'string' }, { type: 'number' }],
});
AnyOfPrimitives.type; // $ExpectType string | number

// anyOf - objects (using additionalProperties: false)
const AnyOfObjects = schema({
  anyOf: [
    {
      type: 'object',
      properties: { a: { type: 'string' } },
      required: ['a'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: { b: { type: 'number' } },
      required: ['b'],
      additionalProperties: false,
    },
  ],
});
AnyOfObjects.type; // $ExpectType { a: string } | { b: number }

// anyOf - nested inside object (using additionalProperties: false)
const NestedAnyOf = schema({
  type: 'object',
  properties: {
    value: {
      anyOf: [{ type: 'string' }, { type: 'number' }],
    },
  },
  required: ['value'],
  additionalProperties: false,
});
NestedAnyOf.type; // $ExpectType { value: string | number }

// Union of arrays
const UnionOfArrays = schema({
  anyOf: [
    { type: 'array', items: { type: 'string' } },
    { type: 'array', items: { type: 'number' } },
  ],
});
UnionOfArrays.type; // $ExpectType string[] | number[]

// Array of unions
const ArrayOfUnions = schema({
  type: 'array',
  items: {
    anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'null' }],
  },
});
ArrayOfUnions.type; // $ExpectType (string | number | null)[]

// =============================================================================
// oneOf - Exclusive Union (same as anyOf at type level)
// =============================================================================

// oneOf - discriminated union (using additionalProperties: false)
const OneOf = schema({
  oneOf: [
    {
      type: 'object',
      properties: { kind: { const: 'a' }, a: { type: 'string' } },
      required: ['kind'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: { kind: { const: 'b' }, b: { type: 'number' } },
      required: ['kind'],
      additionalProperties: false,
    },
  ],
});
OneOf.type; // $ExpectType { kind: "a"; a?: string } | { kind: "b"; b?: number }

// =============================================================================
// allOf - Intersection Types
// =============================================================================

// allOf - intersection of objects (using additionalProperties: false)
const AllOf = schema({
  allOf: [
    {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: { age: { type: 'number' } },
      required: ['age'],
      additionalProperties: false,
    },
  ],
});
AllOf.type; // $ExpectType { name: string; } & { age: number; }

// allOf - three schemas (using additionalProperties: false)
const AllOf3 = schema({
  allOf: [
    {
      type: 'object',
      properties: { a: { type: 'string' } },
      required: ['a'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: { b: { type: 'number' } },
      required: ['b'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: { c: { type: 'boolean' } },
      required: ['c'],
      additionalProperties: false,
    },
  ],
});
AllOf3.type; // $ExpectType { a: string; } & { b: number; } & { c: boolean; }

// allOf with not (string & JsonValue = string)
const AllOfWithNot = schema({
  allOf: [{ type: 'string' }, { not: { const: '' } }],
});
AllOfWithNot.type; // $ExpectType string & JsonValue

// =============================================================================
// not - Type Exclusion
// =============================================================================

// not null → all JSON values except null
const NotNull = schema({ not: { type: 'null' } });
NotNull.type; // $ExpectType string | number | boolean | JsonArray | JsonObject

// not string → all JSON values except string
const NotString = schema({ not: { type: 'string' } });
NotString.type; // $ExpectType number | boolean | null | JsonArray | JsonObject

// not number → all JSON values except number
const NotNumber = schema({ not: { type: 'number' } });
NotNumber.type; // $ExpectType string | boolean | null | JsonArray | JsonObject

// not boolean → all JSON values except boolean
const NotBoolean = schema({ not: { type: 'boolean' } });
NotBoolean.type; // $ExpectType string | number | null | JsonArray | JsonObject

// not object → primitives and arrays only
const NotObject = schema({ not: { type: 'object' } });
NotObject.type; // $ExpectType string | number | boolean | null | JsonArray

// not array → primitives and objects only
const NotArray = schema({ not: { type: 'array' } });
NotArray.type; // $ExpectType string | number | boolean | null | JsonObject

// not with type array - excludes multiple types
const NotStringOrNumber = schema({ not: { type: ['string', 'number'] } });
NotStringOrNumber.type; // $ExpectType boolean | null | JsonArray | JsonObject

// not with all primitives in array
const NotPrimitives = schema({ not: { type: ['string', 'number', 'boolean', 'null'] } });
NotPrimitives.type; // $ExpectType JsonArray | JsonObject
