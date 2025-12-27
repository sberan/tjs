import { schema } from 'json-schema-ts';

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

// Const - string
const ConstStr = schema({ const: 'foo' });
ConstStr.type; // $ExpectType "foo"

// Const - number
const ConstNum = schema({ const: 42 });
ConstNum.type; // $ExpectType 42

// Const - boolean
const ConstBool = schema({ const: true });
ConstBool.type; // $ExpectType true

// Enum - strings
const EnumStr = schema({ enum: ['a', 'b', 'c'] });
EnumStr.type; // $ExpectType "a" | "b" | "c"

// Enum - numbers
const EnumNum = schema({ enum: [1, 2, 3] });
EnumNum.type; // $ExpectType 1 | 2 | 3

// Enum - mixed
const EnumMixed = schema({ enum: ['yes', 'no', 1, 0, null] });
EnumMixed.type; // $ExpectType "yes" | "no" | 1 | 0 | null

// Type array - nullable
const Nullable = schema({ type: ['string', 'null'] });
Nullable.type; // $ExpectType string | null

// Type array - multiple
const Multi = schema({ type: ['string', 'number', 'boolean'] });
Multi.type; // $ExpectType string | number | boolean
