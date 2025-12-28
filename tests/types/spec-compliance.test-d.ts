import type { JsonArray, JsonObject, JsonValue } from 'type-fest';
import { schema } from 'tjs';

// =============================================================================
// JSON Schema Test Suite - Type Level Tests
// Based on schemas from https://github.com/json-schema-org/JSON-Schema-Test-Suite
//
// NOTE: JSON Schema without explicit `type` field returns `unknown` because
// JSON Schema allows any value when type is not specified. The tests below
// reflect the library's actual type inference behavior.
// =============================================================================

// =============================================================================
// type keyword (type.json)
// =============================================================================

// integer type matches integers
const IntegerType = schema({ type: 'integer' });
IntegerType.type; // $ExpectType number

// number type matches numbers
const NumberType = schema({ type: 'number' });
NumberType.type; // $ExpectType number

// string type matches strings
const StringType = schema({ type: 'string' });
StringType.type; // $ExpectType string

// object type matches objects
const ObjectType = schema({ type: 'object' });
ObjectType.type; // $ExpectType Record<string, unknown>

// array type matches arrays
const ArrayType = schema({ type: 'array' });
ArrayType.type; // $ExpectType unknown[]

// boolean type matches booleans
const BooleanType = schema({ type: 'boolean' });
BooleanType.type; // $ExpectType boolean

// null type matches only the null object
const NullType = schema({ type: 'null' });
NullType.type; // $ExpectType null

// multiple types can be specified in an array
const IntegerOrString = schema({ type: ['integer', 'string'] });
IntegerOrString.type; // $ExpectType string | number

// type as array with one item
const TypeArraySingle = schema({ type: ['string'] });
TypeArraySingle.type; // $ExpectType string

// type: array or object
const ArrayOrObject = schema({ type: ['array', 'object'] });
ArrayOrObject.type; // $ExpectType unknown[] | Record<string, unknown>

// type: array, object or null
const ArrayObjectNull = schema({ type: ['array', 'object', 'null'] });
ArrayObjectNull.type; // $ExpectType unknown[] | Record<string, unknown> | null

// =============================================================================
// properties keyword (properties.json)
// Type inference requires type: 'object' to be specified
// =============================================================================

// object properties validation
const ObjectProperties = schema({
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string' },
  },
});
ObjectProperties.type; // $ExpectType { foo?: number; bar?: string }

// properties, patternProperties, additionalProperties interaction
const PropertiesInteraction = schema({
  type: 'object',
  properties: {
    foo: { type: 'array', maxItems: 3 },
    bar: { type: 'array' },
  },
  patternProperties: { 'f.o': { minItems: 2 } },
  additionalProperties: { type: 'integer' },
});
PropertiesInteraction.type; // $ExpectType { foo?: unknown[]; bar?: unknown[] } & { [x: string]: number }

// properties with boolean schema
const PropertiesBoolean = schema({
  type: 'object',
  properties: {
    foo: true,
    bar: false,
  },
});
PropertiesBoolean.type; // $ExpectType { foo?: unknown; bar?: never }

// properties with null valued instance properties
const PropertiesNull = schema({
  type: 'object',
  properties: {
    foo: { type: 'null' },
  },
});
PropertiesNull.type; // $ExpectType { foo?: null }

// =============================================================================
// additionalProperties keyword (additionalProperties.json)
// =============================================================================

// additionalProperties being false does not allow other properties
const AdditionalPropertiesFalse = schema({
  type: 'object',
  properties: { foo: {}, bar: {} },
  patternProperties: { '^v': {} },
  additionalProperties: false,
});
AdditionalPropertiesFalse.type; // $ExpectType { foo?: unknown; bar?: unknown }

// additionalProperties with schema
const AdditionalPropertiesSchema = schema({
  type: 'object',
  properties: { foo: {}, bar: {} },
  additionalProperties: { type: 'boolean' },
});
AdditionalPropertiesSchema.type; // $ExpectType { foo?: unknown; bar?: unknown } & { [x: string]: boolean }

// additionalProperties can exist by itself (with type)
const AdditionalPropertiesOnly = schema({
  type: 'object',
  additionalProperties: { type: 'boolean' },
});
AdditionalPropertiesOnly.type; // $ExpectType Record<string, unknown>

// additionalProperties are allowed by default
const AdditionalPropertiesDefault = schema({
  type: 'object',
  properties: { foo: {}, bar: {} },
});
AdditionalPropertiesDefault.type; // $ExpectType { foo?: unknown; bar?: unknown }

// additionalProperties with null valued instance properties
const AdditionalPropertiesNull = schema({
  type: 'object',
  additionalProperties: { type: 'null' },
});
AdditionalPropertiesNull.type; // $ExpectType Record<string, unknown>

// =============================================================================
// items keyword (items.json)
// Type inference requires type: 'array' to be specified
// =============================================================================

// a schema given for items
const ItemsSchema = schema({
  type: 'array',
  items: { type: 'integer' },
});
ItemsSchema.type; // $ExpectType number[]

// items with boolean schema (true)
const ItemsTrue = schema({
  type: 'array',
  items: true,
});
ItemsTrue.type; // $ExpectType unknown[]

// items with boolean schema (false)
const ItemsFalse = schema({
  type: 'array',
  items: false,
});
ItemsFalse.type; // $ExpectType []

// nested items
const NestedItems = schema({
  type: 'array',
  items: {
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'number' },
      },
    },
  },
});
NestedItems.type; // $ExpectType number[][][][]

// items with null instance elements
const ItemsNull = schema({
  type: 'array',
  items: { type: 'null' },
});
ItemsNull.type; // $ExpectType null[]

// =============================================================================
// prefixItems keyword (prefixItems.json)
// Type inference requires type: 'array' to be specified
// =============================================================================

// a schema given for prefixItems (open tuple)
const PrefixItemsSchema = schema({
  type: 'array',
  prefixItems: [{ type: 'integer' }, { type: 'string' }],
});
PrefixItemsSchema.type; // $ExpectType [number, string, ...unknown[]]

// prefixItems with boolean schemas
const PrefixItemsBoolean = schema({
  type: 'array',
  prefixItems: [true, false],
});
PrefixItemsBoolean.type; // $ExpectType [unknown, never, ...unknown[]]

// additional items are allowed by default
const PrefixItemsDefault = schema({
  type: 'array',
  prefixItems: [{ type: 'integer' }],
});
PrefixItemsDefault.type; // $ExpectType [number, ...unknown[]]

// prefixItems with null instance elements
const PrefixItemsNull = schema({
  type: 'array',
  prefixItems: [{ type: 'null' }],
});
PrefixItemsNull.type; // $ExpectType [null, ...unknown[]]

// prefixItems with items: false (closed tuple)
const PrefixItemsTuple = schema({
  type: 'array',
  prefixItems: [{ type: 'integer' }, { type: 'string' }],
  items: false,
});
PrefixItemsTuple.type; // $ExpectType [number, string]

// prefixItems with items schema (tuple with rest)
const PrefixItemsWithRest = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }],
  items: { type: 'integer' },
});
PrefixItemsWithRest.type; // $ExpectType [string, ...number[]]

// =============================================================================
// allOf keyword (allOf.json)
// =============================================================================

// allOf with object schemas
const AllOfSchema = schema({
  allOf: [
    { type: 'object', properties: { bar: { type: 'integer' } }, required: ['bar'] },
    { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
  ],
});
AllOfSchema.type; // $ExpectType { bar: number } & { foo: string }

// allOf with base schema - base properties are included in the intersection
const AllOfWithBase = schema({
  type: 'object',
  properties: { bar: { type: 'integer' } },
  required: ['bar'],
  allOf: [
    { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
    { type: 'object', properties: { baz: { type: 'null' } }, required: ['baz'] },
  ],
});
AllOfWithBase.type; // $ExpectType { bar: number } & { foo: string } & { baz: null }

// allOf with boolean schemas, all true
const AllOfAllTrue = schema({
  allOf: [true, true],
});
AllOfAllTrue.type; // $ExpectType unknown

// allOf with boolean schemas, some false
const AllOfSomeFalse = schema({
  allOf: [true, false],
});
AllOfSomeFalse.type; // $ExpectType never

// allOf with boolean schemas, all false
const AllOfAllFalse = schema({
  allOf: [false, false],
});
AllOfAllFalse.type; // $ExpectType never

// allOf with one empty schema
const AllOfOneEmpty = schema({
  allOf: [{}],
});
AllOfOneEmpty.type; // $ExpectType unknown

// allOf with the first empty schema
const AllOfFirstEmpty = schema({
  allOf: [{}, { type: 'number' }],
});
AllOfFirstEmpty.type; // $ExpectType number

// nested allOf
const NestedAllOf = schema({
  allOf: [{ allOf: [{ type: 'null' }] }],
});
NestedAllOf.type; // $ExpectType null

// =============================================================================
// anyOf keyword (anyOf.json)
// =============================================================================

// anyOf - returns union of all alternatives
const AnyOfSchema = schema({
  anyOf: [{ type: 'integer' }, { type: 'string' }],
});
AnyOfSchema.type; // $ExpectType string | number

// anyOf with base schema
const AnyOfWithBase = schema({
  type: 'string',
  anyOf: [{ maxLength: 2 }, { minLength: 4 }],
});
AnyOfWithBase.type; // $ExpectType string

// anyOf with boolean schemas, all true
const AnyOfAllTrue = schema({
  anyOf: [true, true],
});
AnyOfAllTrue.type; // $ExpectType unknown

// anyOf with boolean schemas, some true
const AnyOfSomeTrue = schema({
  anyOf: [true, false],
});
AnyOfSomeTrue.type; // $ExpectType unknown

// anyOf with boolean schemas, all false
const AnyOfAllFalse = schema({
  anyOf: [false, false],
});
AnyOfAllFalse.type; // $ExpectType never

// anyOf complex types
const AnyOfComplex = schema({
  anyOf: [
    { type: 'object', properties: { bar: { type: 'integer' } }, required: ['bar'] },
    { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
  ],
});
AnyOfComplex.type; // $ExpectType { bar: number } | { foo: string }

// anyOf with one empty schema - union simplifies to unknown
const AnyOfWithEmpty = schema({
  anyOf: [{ type: 'number' }, {}],
});
AnyOfWithEmpty.type; // $ExpectType unknown

// nested anyOf
const NestedAnyOf = schema({
  anyOf: [{ anyOf: [{ type: 'null' }] }],
});
NestedAnyOf.type; // $ExpectType null

// =============================================================================
// oneOf keyword (oneOf.json)
// =============================================================================

// oneOf - returns union of all alternatives (same as anyOf at type level)
const OneOfSchema = schema({
  oneOf: [{ type: 'integer' }, { type: 'string' }],
});
OneOfSchema.type; // $ExpectType string | number

// oneOf with base schema
const OneOfWithBase = schema({
  type: 'string',
  oneOf: [{ minLength: 2 }, { maxLength: 4 }],
});
OneOfWithBase.type; // $ExpectType string

// oneOf with boolean schemas, one true
const OneOfOneTrue = schema({
  oneOf: [true, false, false],
});
OneOfOneTrue.type; // $ExpectType unknown

// oneOf with boolean schemas, all false
const OneOfAllFalse = schema({
  oneOf: [false, false, false],
});
OneOfAllFalse.type; // $ExpectType never

// oneOf complex types
const OneOfComplex = schema({
  oneOf: [
    { type: 'object', properties: { bar: { type: 'integer' } }, required: ['bar'] },
    { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
  ],
});
OneOfComplex.type; // $ExpectType { bar: number } | { foo: string }

// oneOf with required (discriminated union)
const OneOfRequired = schema({
  type: 'object',
  oneOf: [{ required: ['foo', 'bar'] }, { required: ['foo', 'baz'] }],
});
OneOfRequired.type; // $ExpectType Record<string, unknown>

// nested oneOf
const NestedOneOf = schema({
  oneOf: [{ oneOf: [{ type: 'null' }] }],
});
NestedOneOf.type; // $ExpectType null

// =============================================================================
// not keyword (not.json)
// =============================================================================

// not integer
const NotSchema = schema({
  not: { type: 'integer' },
});
NotSchema.type; // $ExpectType string | boolean | null | JsonArray | JsonObject

// not multiple types
const NotMultiple = schema({
  not: { type: ['integer', 'boolean'] },
});
NotMultiple.type; // $ExpectType string | null | JsonArray | JsonObject

// forbid everything with empty schema - note: library returns JsonValue here
const NotEmpty = schema({
  not: {},
});
NotEmpty.type; // $ExpectType JsonValue

// forbid everything with boolean schema true - note: library returns JsonValue here
const NotTrue = schema({
  not: true,
});
NotTrue.type; // $ExpectType JsonValue

// allow everything with boolean schema false
const NotFalse = schema({
  not: false,
});
NotFalse.type; // $ExpectType JsonValue

// double negation
const DoubleNot = schema({
  not: { not: {} },
});
DoubleNot.type; // $ExpectType JsonValue

// =============================================================================
// const keyword (const.json)
// =============================================================================

// const validation
const ConstNumber = schema({
  const: 2,
});
ConstNumber.type; // $ExpectType 2

// const with object - note: readonly modifier is applied
const ConstObject = schema({
  const: { foo: 'bar', baz: 'bax' },
});
ConstObject.type; // $ExpectType { readonly foo: "bar"; readonly baz: "bax" }

// const with array - note: inner object is readonly but array is mutable
const ConstArray = schema({
  const: [{ foo: 'bar' }],
});
ConstArray.type; // $ExpectType [{ readonly foo: "bar" }]

// const with null
const ConstNull = schema({
  const: null,
});
ConstNull.type; // $ExpectType null

// const with false
const ConstFalse = schema({
  const: false,
});
ConstFalse.type; // $ExpectType false

// const with true
const ConstTrue = schema({
  const: true,
});
ConstTrue.type; // $ExpectType true

// const with 0
const ConstZero = schema({
  const: 0,
});
ConstZero.type; // $ExpectType 0

// const with 1
const ConstOne = schema({
  const: 1,
});
ConstOne.type; // $ExpectType 1

// const with string
const ConstString = schema({
  const: 'foo',
});
ConstString.type; // $ExpectType "foo"

// =============================================================================
// enum keyword (enum.json)
// =============================================================================

// simple enum validation
const EnumSimple = schema({
  enum: [1, 2, 3],
});
EnumSimple.type; // $ExpectType 1 | 2 | 3

// heterogeneous enum validation - note: readonly modifier on objects
const EnumHeterogeneous = schema({
  enum: [6, 'foo', [], true, { foo: 12 }],
});
EnumHeterogeneous.type; // $ExpectType true | [] | "foo" | 6 | { readonly foo: 12 }

// heterogeneous enum-with-null validation
const EnumWithNull = schema({
  enum: [6, null],
});
EnumWithNull.type; // $ExpectType 6 | null

// enums in properties
const EnumInProperties = schema({
  type: 'object',
  properties: {
    foo: { enum: ['foo'] },
    bar: { enum: ['bar'] },
  },
  required: ['bar'],
});
EnumInProperties.type; // $ExpectType { bar: "bar"; foo?: "foo" }

// enum with false
const EnumFalse = schema({
  enum: [false],
});
EnumFalse.type; // $ExpectType false

// enum with true
const EnumTrue = schema({
  enum: [true],
});
EnumTrue.type; // $ExpectType true

// enum with 0
const EnumZero = schema({
  enum: [0],
});
EnumZero.type; // $ExpectType 0

// enum with 1
const EnumOne = schema({
  enum: [1],
});
EnumOne.type; // $ExpectType 1

// =============================================================================
// if-then-else keywords (if-then-else.json)
// Note: Without type constraints, these return unknown
// =============================================================================

// if and then without else
const IfThenNoElse = schema({
  if: { exclusiveMaximum: 0 },
  then: { minimum: -10 },
});
IfThenNoElse.type; // $ExpectType unknown

// if and else without then
const IfElseNoThen = schema({
  if: { exclusiveMaximum: 0 },
  else: { multipleOf: 2 },
});
IfElseNoThen.type; // $ExpectType unknown

// validate against correct branch, then vs else
const IfThenElse = schema({
  if: { exclusiveMaximum: 0 },
  then: { minimum: -10 },
  else: { multipleOf: 2 },
});
IfThenElse.type; // $ExpectType unknown

// if with boolean schema true and typed branches
const IfBoolTrue = schema({
  if: true,
  then: { const: 'then' },
  else: { const: 'else' },
});
IfBoolTrue.type; // $ExpectType "then" | "else"

// if with boolean schema false and typed branches
const IfBoolFalse = schema({
  if: false,
  then: { const: 'then' },
  else: { const: 'else' },
});
IfBoolFalse.type; // $ExpectType "then" | "else"

// =============================================================================
// $ref and $defs keywords (ref.json)
// =============================================================================

// relative pointer ref to object
const RefToObject = schema({
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { $ref: '#/properties/foo' },
  },
});
// Note: $ref to properties path isn't resolved - needs #/$defs/ format
RefToObject.type; // $ExpectType { foo?: number; bar?: unknown }

// nested refs using $defs
const NestedRefs = schema({
  $defs: {
    a: { type: 'integer' },
    b: { $ref: '#/$defs/a' },
    c: { $ref: '#/$defs/b' },
  },
  $ref: '#/$defs/c',
});
NestedRefs.type; // $ExpectType number

// $ref to boolean schema true
const RefToBoolTrue = schema({
  $ref: '#/$defs/bool',
  $defs: {
    bool: true,
  },
});
RefToBoolTrue.type; // $ExpectType unknown

// $ref to boolean schema false
const RefToBoolFalse = schema({
  $ref: '#/$defs/bool',
  $defs: {
    bool: false,
  },
});
RefToBoolFalse.type; // $ExpectType never

// simple ref with $defs
const RefWithDefs = schema({
  type: 'object',
  properties: {
    foo: { $ref: '#/$defs/bar' },
  },
  $defs: {
    bar: { type: 'string' },
  },
});
RefWithDefs.type; // $ExpectType { foo?: string }

// =============================================================================
// boolean_schema keyword (boolean_schema.json)
// =============================================================================

// boolean schema 'true'
const BoolSchemaTrue = schema(true);
BoolSchemaTrue.type; // $ExpectType unknown

// boolean schema 'false'
const BoolSchemaFalse = schema(false);
BoolSchemaFalse.type; // $ExpectType never

// =============================================================================
// contains keyword (contains.json)
// Note: contains doesn't affect the type - arrays remain generic
// =============================================================================

// contains keyword validation - no type effect
const ContainsSchema = schema({
  contains: { minimum: 5 },
});
ContainsSchema.type; // $ExpectType unknown

// =============================================================================
// dependentSchemas keyword (dependentSchemas.json)
// Note: dependentSchemas doesn't affect static type inference
// =============================================================================

// single dependency - no type effect
const DependentSchema = schema({
  dependentSchemas: {
    bar: {
      properties: {
        foo: { type: 'integer' },
        bar: { type: 'integer' },
      },
    },
  },
});
DependentSchema.type; // $ExpectType unknown

// =============================================================================
// unevaluatedItems keyword (unevaluatedItems.json)
// =============================================================================

// unevaluatedItems with prefixItems (closed tuple)
const UnevaluatedItemsTuple = schema({
  type: 'array',
  prefixItems: [{ type: 'string' }],
  unevaluatedItems: false,
});
UnevaluatedItemsTuple.type; // $ExpectType [string]

// =============================================================================
// unevaluatedProperties keyword (unevaluatedProperties.json)
// =============================================================================

// unevaluatedProperties with adjacent properties
const UnevaluatedPropsWithProps = schema({
  type: 'object',
  properties: {
    foo: { type: 'string' },
  },
  unevaluatedProperties: false,
});
UnevaluatedPropsWithProps.type; // $ExpectType { foo?: string }

// =============================================================================
// patternProperties keyword (patternProperties.json)
// Note: Pattern properties result in index signature
// =============================================================================

// patternProperties validates properties matching a regex
const PatternProps = schema({
  type: 'object',
  patternProperties: {
    '^S_': { type: 'string' },
    '^I_': { type: 'integer' },
  },
});
PatternProps.type; // $ExpectType Record<string, unknown>

// =============================================================================
// propertyNames keyword (propertyNames.json)
// Note: propertyNames validates key names, doesn't affect value types
// =============================================================================

// propertyNames validation - no type effect
const PropertyNamesSchema = schema({
  propertyNames: { maxLength: 3 },
});
PropertyNamesSchema.type; // $ExpectType unknown

// =============================================================================
// required keyword (required.json)
// =============================================================================

// required validation
const RequiredSchema = schema({
  type: 'object',
  properties: {
    foo: {},
    bar: {},
  },
  required: ['foo'],
});
RequiredSchema.type; // $ExpectType { foo: unknown; bar?: unknown }

// required with empty array
const RequiredEmpty = schema({
  type: 'object',
  properties: {
    foo: { type: 'string' },
  },
  required: [],
});
RequiredEmpty.type; // $ExpectType { foo?: string }

// required default behavior - all optional
const RequiredDefault = schema({
  type: 'object',
  properties: {
    foo: { type: 'string' },
    bar: { type: 'number' },
  },
});
RequiredDefault.type; // $ExpectType { foo?: string; bar?: number }

// all required
const AllRequired = schema({
  type: 'object',
  properties: {
    foo: { type: 'string' },
    bar: { type: 'number' },
  },
  required: ['foo', 'bar'],
});
AllRequired.type; // $ExpectType { foo: string; bar: number }

// =============================================================================
// Empty schema
// =============================================================================

// empty schema accepts any value
const EmptySchema = schema({});
EmptySchema.type; // $ExpectType unknown

// =============================================================================
// Complex combinations from the test suite
// =============================================================================

// allOf combined with anyOf, oneOf (without type constraints = unknown)
const CombinedApplicators = schema({
  allOf: [{ multipleOf: 2 }],
  anyOf: [{ multipleOf: 3 }],
  oneOf: [{ multipleOf: 5 }],
});
CombinedApplicators.type; // $ExpectType unknown

// nested objects with refs
const NestedObjectsWithRefs = schema({
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
NestedObjectsWithRefs.type; // $ExpectType { start: { x: number; y: number }; end: { x: number; y: number } }

// items and subitems with refs (complex nested tuple)
const ItemsWithRefs = schema({
  $defs: {
    item: {
      type: 'array',
      items: false,
      prefixItems: [{ $ref: '#/$defs/sub-item' }, { $ref: '#/$defs/sub-item' }],
    },
    'sub-item': {
      type: 'object',
      required: ['foo'],
    },
  },
  type: 'array',
  items: false,
  prefixItems: [{ $ref: '#/$defs/item' }, { $ref: '#/$defs/item' }, { $ref: '#/$defs/item' }],
});
ItemsWithRefs.type; // $ExpectType [[{ foo: unknown }, { foo: unknown }], [{ foo: unknown }, { foo: unknown }], [{ foo: unknown }, { foo: unknown }]]

// oneOf with missing optional property (discriminated union pattern)
const DiscriminatedUnion = schema({
  oneOf: [
    {
      type: 'object',
      properties: { bar: true, baz: true },
      required: ['bar'],
    },
    {
      type: 'object',
      properties: { foo: true },
      required: ['foo'],
    },
  ],
});
DiscriminatedUnion.type; // $ExpectType { bar: unknown; baz?: unknown } | { foo: unknown }
