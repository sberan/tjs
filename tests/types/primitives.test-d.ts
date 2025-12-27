import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// String
const S = schema({ type: 'string' });
expectTypeOf<typeof S.type>().toEqualTypeOf<string>();

// Number
const N = schema({ type: 'number' });
expectTypeOf<typeof N.type>().toEqualTypeOf<number>();

// Integer maps to number
const I = schema({ type: 'integer' });
expectTypeOf<typeof I.type>().toEqualTypeOf<number>();

// Boolean
const B = schema({ type: 'boolean' });
expectTypeOf<typeof B.type>().toEqualTypeOf<boolean>();

// Null
const Null = schema({ type: 'null' });
expectTypeOf<typeof Null.type>().toEqualTypeOf<null>();

// Const - string
const ConstStr = schema({ const: 'foo' });
expectTypeOf<typeof ConstStr.type>().toEqualTypeOf<'foo'>();

// Const - number
const ConstNum = schema({ const: 42 });
expectTypeOf<typeof ConstNum.type>().toEqualTypeOf<42>();

// Const - boolean
const ConstBool = schema({ const: true });
expectTypeOf<typeof ConstBool.type>().toEqualTypeOf<true>();

// Enum - strings
const EnumStr = schema({ enum: ['a', 'b', 'c'] });
expectTypeOf<typeof EnumStr.type>().toEqualTypeOf<'a' | 'b' | 'c'>();

// Enum - numbers
const EnumNum = schema({ enum: [1, 2, 3] });
expectTypeOf<typeof EnumNum.type>().toEqualTypeOf<1 | 2 | 3>();

// Enum - mixed
const EnumMixed = schema({ enum: ['yes', 'no', 1, 0, null] });
expectTypeOf<typeof EnumMixed.type>().toEqualTypeOf<'yes' | 'no' | 1 | 0 | null>();

// Type array - nullable
const Nullable = schema({ type: ['string', 'null'] });
expectTypeOf<typeof Nullable.type>().toEqualTypeOf<string | null>();

// Type array - multiple
const Multi = schema({ type: ['string', 'number', 'boolean'] });
expectTypeOf<typeof Multi.type>().toEqualTypeOf<string | number | boolean>();
