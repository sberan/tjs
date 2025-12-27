import { expectTypeOf } from 'expect-type';
import type { JsonValue, JsonObject, JsonArray } from 'type-fest';
import { schema } from 'json-schema-ts';

// Boolean schema - true accepts anything
const True = schema(true);
expectTypeOf<typeof True.type>().toEqualTypeOf<unknown>();

// Boolean schema - false accepts nothing
const False = schema(false);
expectTypeOf<typeof False.type>().toEqualTypeOf<never>();

// Empty schema - accepts anything
const EmptySchema = schema({});
expectTypeOf<typeof EmptySchema.type>().toEqualTypeOf<unknown>();

// not null → all JSON values except null
const NotNull = schema({ not: { type: 'null' } });
expectTypeOf<typeof NotNull.type>().toEqualTypeOf<string | number | boolean | JsonArray | JsonObject>();

// not string → all JSON values except string
const NotString = schema({ not: { type: 'string' } });
expectTypeOf<typeof NotString.type>().toEqualTypeOf<number | boolean | null | JsonArray | JsonObject>();

// not number → all JSON values except number
const NotNumber = schema({ not: { type: 'number' } });
expectTypeOf<typeof NotNumber.type>().toEqualTypeOf<string | boolean | null | JsonArray | JsonObject>();

// not boolean → all JSON values except boolean
const NotBoolean = schema({ not: { type: 'boolean' } });
expectTypeOf<typeof NotBoolean.type>().toEqualTypeOf<string | number | null | JsonArray | JsonObject>();

// not object → primitives and arrays only
const NotObject = schema({ not: { type: 'object' } });
expectTypeOf<typeof NotObject.type>().toEqualTypeOf<string | number | boolean | null | JsonArray>();

// not array → primitives and objects only
const NotArray = schema({ not: { type: 'array' } });
expectTypeOf<typeof NotArray.type>().toEqualTypeOf<string | number | boolean | null | JsonObject>();

// Combining type with not (allOf)
const NonEmptyString = schema({
  allOf: [
    { type: 'string' },
    { not: { const: '' } },
  ],
});
expectTypeOf<typeof NonEmptyString.type>().toEqualTypeOf<string>();

// Optional with nullable
const OptionalNullable = schema({
  type: 'object',
  properties: {
    value: { type: ['string', 'null'] },
  },
});
expectTypeOf<typeof OptionalNullable.type>().toEqualTypeOf<{ value?: string | null }>();

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
expectTypeOf<typeof Complex.type>().toEqualTypeOf<{
  required1: string;
  required2: { nested: number };
  optional1?: boolean;
}>();

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
expectTypeOf<typeof ArrayOfUnions.type>().toEqualTypeOf<(string | number | null)[]>();

// Union of arrays
const UnionOfArrays = schema({
  anyOf: [
    { type: 'array', items: { type: 'string' } },
    { type: 'array', items: { type: 'number' } },
  ],
});
expectTypeOf<typeof UnionOfArrays.type>().toEqualTypeOf<string[] | number[]>();

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
expectTypeOf<typeof DeepRefs.type>().toEqualTypeOf<{
  outer: { inner: { value: string } };
}>();
