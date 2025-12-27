import type { Equal, Expect } from './test-utils.js';
import { schema } from 'json-schema-ts';

// String
const S = schema({ type: 'string' });
type _String = Expect<Equal<typeof S.type, string>>;

// Number
const N = schema({ type: 'number' });
type _Number = Expect<Equal<typeof N.type, number>>;

// Integer maps to number
const I = schema({ type: 'integer' });
type _Integer = Expect<Equal<typeof I.type, number>>;

// Boolean
const B = schema({ type: 'boolean' });
type _Boolean = Expect<Equal<typeof B.type, boolean>>;

// Null
const Null = schema({ type: 'null' });
type _Null = Expect<Equal<typeof Null.type, null>>;

// Const - string
const ConstStr = schema({ const: 'foo' });
type _ConstStr = Expect<Equal<typeof ConstStr.type, 'foo'>>;

// Const - number
const ConstNum = schema({ const: 42 });
type _ConstNum = Expect<Equal<typeof ConstNum.type, 42>>;

// Const - boolean
const ConstBool = schema({ const: true });
type _ConstBool = Expect<Equal<typeof ConstBool.type, true>>;

// Enum - strings
const EnumStr = schema({ enum: ['a', 'b', 'c'] });
type _EnumStr = Expect<Equal<typeof EnumStr.type, 'a' | 'b' | 'c'>>;

// Enum - numbers
const EnumNum = schema({ enum: [1, 2, 3] });
type _EnumNum = Expect<Equal<typeof EnumNum.type, 1 | 2 | 3>>;

// Enum - mixed
const EnumMixed = schema({ enum: ['yes', 'no', 1, 0, null] });
type _EnumMixed = Expect<Equal<typeof EnumMixed.type, 'yes' | 'no' | 1 | 0 | null>>;

// Type array - nullable
const Nullable = schema({ type: ['string', 'null'] });
type _Nullable = Expect<Equal<typeof Nullable.type, string | null>>;

// Type array - multiple
const Multi = schema({ type: ['string', 'number', 'boolean'] });
type _Multi = Expect<Equal<typeof Multi.type, string | number | boolean>>;
