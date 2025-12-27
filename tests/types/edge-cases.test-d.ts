import type { Equal, Expect } from './test-utils.js';
import type { JsonObject, JsonArray } from 'type-fest';
import { schema } from 'json-schema-ts';

// Boolean schema - true accepts anything
const True = schema(true);
type _True = Expect<Equal<typeof True.type, unknown>>;

// Boolean schema - false accepts nothing
const False = schema(false);
type _False = Expect<Equal<typeof False.type, never>>;

// Empty schema - accepts anything
const EmptySchema = schema({});
type _EmptySchema = Expect<Equal<typeof EmptySchema.type, unknown>>;

// not null → all JSON values except null
const NotNull = schema({ not: { type: 'null' } });
type _NotNull = Expect<Equal<typeof NotNull.type, string | number | boolean | JsonArray | JsonObject>>;

// not string → all JSON values except string
const NotString = schema({ not: { type: 'string' } });
type _NotString = Expect<Equal<typeof NotString.type, number | boolean | null | JsonArray | JsonObject>>;

// not number → all JSON values except number
const NotNumber = schema({ not: { type: 'number' } });
type _NotNumber = Expect<Equal<typeof NotNumber.type, string | boolean | null | JsonArray | JsonObject>>;

// not boolean → all JSON values except boolean
const NotBoolean = schema({ not: { type: 'boolean' } });
type _NotBoolean = Expect<Equal<typeof NotBoolean.type, string | number | null | JsonArray | JsonObject>>;

// not object → primitives and arrays only
const NotObject = schema({ not: { type: 'object' } });
type _NotObject = Expect<Equal<typeof NotObject.type, string | number | boolean | null | JsonArray>>;

// not array → primitives and objects only
const NotArray = schema({ not: { type: 'array' } });
type _NotArray = Expect<Equal<typeof NotArray.type, string | number | boolean | null | JsonObject>>;

// Combining type with not (allOf) - the string type dominates
const NonEmptyString = schema({
  allOf: [
    { type: 'string' },
    { not: { const: '' } },
  ],
});
// allOf with string narrows to string (runtime validates non-empty)
type NonEmptyStringType = typeof NonEmptyString.type;
const _nes: string = '' as NonEmptyStringType;

// Optional with nullable
const OptionalNullable = schema({
  type: 'object',
  properties: {
    value: { type: ['string', 'null'] },
  },
});
type _OptionalNullable = Expect<Equal<typeof OptionalNullable.type, { value?: string | null }>>;

// Complex nested optional/required
const Complex = schema({
  type: 'object',
  properties: {
    required1: { type: 'string' },
    required2: {
      type: 'object',
      properties: {
        nested: { type: 'number' },
      },
      required: ['nested'],
    },
    optional1: { type: 'boolean' },
  },
  required: ['required1', 'required2'],
});
type _Complex = Expect<Equal<typeof Complex.type, {
  required1: string;
  required2: { nested: number };
  optional1?: boolean;
}>>;

// Array of unions
const ArrayOfUnions = schema({
  type: 'array',
  items: {
    anyOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'null' },
    ],
  },
});
type _ArrayOfUnions = Expect<Equal<typeof ArrayOfUnions.type, (string | number | null)[]>>;

// Union of arrays
const UnionOfArrays = schema({
  anyOf: [
    { type: 'array', items: { type: 'string' } },
    { type: 'array', items: { type: 'number' } },
  ],
});
type _UnionOfArrays = Expect<Equal<typeof UnionOfArrays.type, string[] | number[]>>;

// Deeply nested refs
const DeepRefs = schema({
  $defs: {
    Inner: {
      type: 'object',
      properties: { value: { type: 'string' } },
      required: ['value'],
    },
    Outer: {
      type: 'object',
      properties: { inner: { $ref: '#/$defs/Inner' } },
      required: ['inner'],
    },
  },
  type: 'object',
  properties: {
    outer: { $ref: '#/$defs/Outer' },
  },
  required: ['outer'],
});
type _DeepRefs = Expect<Equal<typeof DeepRefs.type, { outer: { inner: { value: string } } }>>;

// =============================================================================
// HIGH PRIORITY FIXES - Type inference holes
// =============================================================================

// FIX #1: Type array with properties preserves structure
// Previously: type: ['object', 'null'] would return Record<string, unknown> | null
// Now: properly infers { foo?: string } | null
const NullableObject = schema({
  type: ['object', 'null'],
  properties: {
    foo: { type: 'string' },
  },
});
type _NullableObject = Expect<Equal<typeof NullableObject.type, { foo?: string } | null>>;

// Type array with required properties
const NullableObjectRequired = schema({
  type: ['object', 'null'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['id'],
});
type _NullableObjectRequired = Expect<Equal<typeof NullableObjectRequired.type, { id: string; name?: string } | null>>;

// Type array with array type preserves items
const NullableArray = schema({
  type: ['array', 'null'],
  items: { type: 'number' },
});
type _NullableArray = Expect<Equal<typeof NullableArray.type, number[] | null>>;

// Type array with multiple structured types
const ObjectOrArray = schema({
  type: ['object', 'array'],
  properties: {
    value: { type: 'string' },
  },
  items: { type: 'number' },
});
type _ObjectOrArray = Expect<Equal<typeof ObjectOrArray.type, { value?: string } | number[]>>;

// Type array mixing primitives and structured
const StringOrObject = schema({
  type: ['string', 'object'],
  properties: {
    data: { type: 'boolean' },
  },
});
type _StringOrObject = Expect<Equal<typeof StringOrObject.type, string | { data?: boolean }>>;

// FIX #2: if/else without then now works
// Previously: would fall through to InferType returning unknown
// Now: properly infers union of if-matches type and else type
const IfElseNoThen = schema({
  if: { type: 'string' },
  else: { type: 'number' },
});
type _IfElseNoThen = Expect<Equal<typeof IfElseNoThen.type, unknown | number>>;

// if/else with base type constraint
const IfElseWithType = schema({
  type: ['string', 'number'],
  if: { type: 'string', minLength: 5 },
  else: { type: 'number', minimum: 0 },
});
type _IfElseWithType = Expect<Equal<typeof IfElseWithType.type, string | number>>;

// Verify if/then/else still works (regression test)
const IfThenElse = schema({
  if: { type: 'string' },
  then: { type: 'string', minLength: 1 },
  else: { type: 'number' },
});
type _IfThenElse = Expect<Equal<typeof IfThenElse.type, string | number>>;

// Verify if/then still works (regression test)
// Note: then schema has no type, so Infer<then> returns unknown
// Result is Infer<then> | InferType<S> = unknown | string = unknown
const IfThenOnly = schema({
  type: 'string',
  if: { minLength: 5 },
  then: { pattern: '^[A-Z]' },
});
type _IfThenOnly = Expect<Equal<typeof IfThenOnly.type, unknown>>;

// if/then with explicit types - properly narrows
const IfThenTyped = schema({
  if: { type: 'string' },
  then: { type: 'string' },
});
type _IfThenTyped = Expect<Equal<typeof IfThenTyped.type, string | unknown>>;

// if/then where base type dominates
const IfThenWithBaseType = schema({
  type: 'number',
  if: { minimum: 0 },
  then: { type: 'number' },
});
type _IfThenWithBaseType = Expect<Equal<typeof IfThenWithBaseType.type, number>>;
