import { schema } from 'json-schema-ts';

// =============================================================================
// Shorthand Type Syntax
// =============================================================================

// String shorthand
const ShortString = schema('string');
ShortString.type; // $ExpectType string

// Number shorthand
const ShortNumber = schema('number');
ShortNumber.type; // $ExpectType number

// Integer shorthand
const ShortInteger = schema('integer');
ShortInteger.type; // $ExpectType number

// Boolean shorthand
const ShortBoolean = schema('boolean');
ShortBoolean.type; // $ExpectType boolean

// Null shorthand
const ShortNull = schema('null');
ShortNull.type; // $ExpectType null

// Object shorthand
const ShortObject = schema('object');
ShortObject.type; // $ExpectType Record<string, unknown>

// Array shorthand
const ShortArray = schema('array');
ShortArray.type; // $ExpectType unknown[]

// =============================================================================
// Primitive Types
// =============================================================================

// String
const S = schema({ type: 'string' });
S.type; // $ExpectType string

// Number
const N = schema({ type: 'number' });
N.type; // $ExpectType number

// Integer maps to number
const I = schema({ type: 'integer' });
I.type; // $ExpectType number

// Boolean
const B = schema({ type: 'boolean' });
B.type; // $ExpectType boolean

// Null
const Null = schema({ type: 'null' });
Null.type; // $ExpectType null

// =============================================================================
// Const - Literal Types
// =============================================================================

// Const - string
const ConstStr = schema({ const: 'foo' });
ConstStr.type; // $ExpectType "foo"

// Const - number
const ConstNum = schema({ const: 42 });
ConstNum.type; // $ExpectType 42

// Const - boolean
const ConstBool = schema({ const: true });
ConstBool.type; // $ExpectType true

// =============================================================================
// Enum - Union of Literals
// =============================================================================

// Enum - strings
const EnumStr = schema({ enum: ['a', 'b', 'c'] });
EnumStr.type; // $ExpectType "a" | "b" | "c"

// Enum - numbers
const EnumNum = schema({ enum: [1, 2, 3] });
EnumNum.type; // $ExpectType 1 | 2 | 3

// Enum - mixed
const EnumMixed = schema({ enum: ['yes', 'no', 1, 0, null] });
EnumMixed.type; // $ExpectType "yes" | "no" | 1 | 0 | null

// =============================================================================
// Type Arrays - Union Types
// =============================================================================

// Type array - nullable string
const NullableString = schema({ type: ['string', 'null'] });
NullableString.type; // $ExpectType string | null

// Type array - multiple primitives
const MultiPrimitive = schema({ type: ['string', 'number', 'boolean'] });
MultiPrimitive.type; // $ExpectType string | number | boolean

// Type array - nullable object with properties
const NullableObject = schema({
  type: ['object', 'null'],
  properties: {
    foo: { type: 'string' },
  },
});
NullableObject.type; // $ExpectType { foo?: string } | null

// Type array - nullable object with required
const NullableObjectRequired = schema({
  type: ['object', 'null'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['id'],
});
NullableObjectRequired.type; // $ExpectType { id: string; name?: string } | null

// Type array - nullable array
const NullableArray = schema({
  type: ['array', 'null'],
  items: { type: 'number' },
});
NullableArray.type; // $ExpectType number[] | null

// Type array - object or array
const ObjectOrArray = schema({
  type: ['object', 'array'],
  properties: {
    value: { type: 'string' },
  },
  items: { type: 'number' },
});
ObjectOrArray.type; // $ExpectType { value?: string } | number[]

// Type array - string or object
const StringOrObject = schema({
  type: ['string', 'object'],
  properties: {
    data: { type: 'boolean' },
  },
});
StringOrObject.type; // $ExpectType string | { data?: boolean }
