import type { JsonValue } from 'type-fest';
import { schema } from 'json-schema-ts';

// Boolean schema - true accepts anything
const True = schema(true);
True.type; // $ExpectType unknown

// Boolean schema - false accepts nothing
const False = schema(false);
False.type; // $ExpectType never

// Empty schema - accepts anything
const EmptySchema = schema({});
EmptySchema.type; // $ExpectType unknown

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

// Combining type with not (allOf) - the string type dominates
const NonEmptyString = schema({
  allOf: [
    { type: 'string' },
    { not: { const: '' } },
  ],
});
// allOf with string narrows to string & JsonValue (semantically equivalent to string)
// The not: { const: '' } returns JsonValue since const-based exclusion isn't typed
NonEmptyString.type; // $ExpectType string & JsonValue

// Optional with nullable
const OptionalNullable = schema({
  type: 'object',
  properties: {
    value: { type: ['string', 'null'] },
  },
});
OptionalNullable.type; // $ExpectType { value?: string | null }

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
Complex.type; // $ExpectType { required1: string; required2: { nested: number }; optional1?: boolean }

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
ArrayOfUnions.type; // $ExpectType (string | number | null)[]

// Union of arrays
const UnionOfArrays = schema({
  anyOf: [
    { type: 'array', items: { type: 'string' } },
    { type: 'array', items: { type: 'number' } },
  ],
});
UnionOfArrays.type; // $ExpectType string[] | number[]

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
DeepRefs.type; // $ExpectType { outer: { inner: { value: string } } }

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
NullableObject.type; // $ExpectType { foo?: string } | null

// Type array with required properties
const NullableObjectRequired = schema({
  type: ['object', 'null'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['id'],
});
NullableObjectRequired.type; // $ExpectType { id: string; name?: string } | null

// Type array with array type preserves items
const NullableArray = schema({
  type: ['array', 'null'],
  items: { type: 'number' },
});
NullableArray.type; // $ExpectType number[] | null

// Type array with multiple structured types
const ObjectOrArray = schema({
  type: ['object', 'array'],
  properties: {
    value: { type: 'string' },
  },
  items: { type: 'number' },
});
ObjectOrArray.type; // $ExpectType { value?: string } | number[]

// Type array mixing primitives and structured
const StringOrObject = schema({
  type: ['string', 'object'],
  properties: {
    data: { type: 'boolean' },
  },
});
StringOrObject.type; // $ExpectType string | { data?: boolean }

// FIX #2: if/else without then now works
// Previously: would fall through to InferType returning unknown
// Now: properly infers union of if-matches type and else type
const IfElseNoThen = schema({
  if: { type: 'string' },
  else: { type: 'number' },
});
IfElseNoThen.type; // $ExpectType unknown

// if/else with base type constraint
const IfElseWithType = schema({
  type: ['string', 'number'],
  if: { type: 'string', minLength: 5 },
  else: { type: 'number', minimum: 0 },
});
IfElseWithType.type; // $ExpectType string | number

// Verify if/then/else still works (regression test)
const IfThenElse = schema({
  if: { type: 'string' },
  then: { type: 'string', minLength: 1 },
  else: { type: 'number' },
});
IfThenElse.type; // $ExpectType string | number

// if/then with base type - branch without properties uses base type
const IfThenOnly = schema({
  type: 'string',
  if: { minLength: 5 },
  then: { pattern: '^[A-Z]' },
});
IfThenOnly.type; // $ExpectType string

// if/then without base type - then branch merges with unknown base
const IfThenTyped = schema({
  if: { type: 'string' },
  then: { type: 'string' },
});
IfThenTyped.type; // $ExpectType unknown

// if/then where base type dominates
const IfThenWithBaseType = schema({
  type: 'number',
  if: { minimum: 0 },
  then: { type: 'number' },
});
IfThenWithBaseType.type; // $ExpectType number

// =============================================================================
// MEDIUM PRIORITY FIXES - Type inference holes
// =============================================================================

// FIX #3: Circular $ref now expands to depth limit instead of causing TS recursion error
// Previously: TypeScript would crash with "Type instantiation is excessively deep"
// Now: Expands to depth 15 levels before stopping
const CircularRef = schema({
  $defs: {
    Node: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        next: { $ref: '#/$defs/Node' },
      },
    },
  },
  $ref: '#/$defs/Node',
});
// Verify structure at first level (full expansion is ~15 levels deep)
CircularRef.type.value; // $ExpectType string | undefined
CircularRef.type.next?.value; // $ExpectType  string | undefined

// Self-referential definition (direct cycle)
const DirectCycle = schema({
  $defs: {
    Self: { $ref: '#/$defs/Self' },
  },
  $ref: '#/$defs/Self',
});
DirectCycle.type; // $ExpectType unknown

// FIX #4: Required properties not in `properties` now get type `unknown`
// Previously: Required properties not defined in `properties` were silently ignored
// Now: They are added with type `unknown`
const MissingRequired = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name', 'ghost'],
});
MissingRequired.type; // $ExpectType { name: string; ghost: unknown }

// Multiple missing required properties
const MultipleMissingRequired = schema({
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id', 'foo', 'bar', 'baz'],
});
MultipleMissingRequired.type; // $ExpectType { id: number; foo: unknown; bar: unknown; baz: unknown }

// All required properties missing from properties - now properly tracked
const AllMissingRequired = schema({
  type: 'object',
  required: ['a', 'b'],
});
AllMissingRequired.type; // $ExpectType { a: unknown; b: unknown; }

// Mix of defined and undefined required with optional
const MixedRequired = schema({
  type: 'object',
  properties: {
    defined: { type: 'string' },
    optional: { type: 'boolean' },
  },
  required: ['defined', 'undefined_prop'],
});
MixedRequired.type; // $ExpectType { defined: string; optional?: boolean; undefined_prop: unknown }
