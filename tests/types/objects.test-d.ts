import { expectTypeOf } from 'expect-type';
import { schema } from 'json-schema-ts';

// Empty object
const Empty = schema({ type: 'object' });
expectTypeOf<typeof Empty.type>().toEqualTypeOf<Record<string, unknown>>();

// All optional
const Obj1 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});
expectTypeOf<typeof Obj1.type>().toEqualTypeOf<{ a?: string; b?: number }>();

// With required
const Obj2 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a'],
});
expectTypeOf<typeof Obj2.type>().toEqualTypeOf<{ a: string; b?: number }>();

// All required
const Obj3 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a', 'b'],
});
expectTypeOf<typeof Obj3.type>().toEqualTypeOf<{ a: string; b: number }>();

// Nested objects
const Nested = schema({
  type: 'object',
  properties: {
    inner: {
      type: 'object',
      properties: {
        value: { type: 'string' },
      },
      required: ['value'],
    },
  },
  required: ['inner'],
});
expectTypeOf<typeof Nested.type>().toEqualTypeOf<{
  inner: { value: string };
}>();

// Additional properties false (exact object)
const Strict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  additionalProperties: false,
});
expectTypeOf<typeof Strict.type>().toEqualTypeOf<{ id?: string }>();

// Additional properties typed - uses mapped type to exclude known keys
const Dict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: { type: 'number' },
});
expectTypeOf<typeof Dict.type>().toEqualTypeOf<
  { id: string } & { [K in string as K extends 'id' ? never : K]: number }
>();

// Deeply nested
const DeepNested = schema({
  type: 'object',
  properties: {
    level1: {
      type: 'object',
      properties: {
        level2: {
          type: 'object',
          properties: {
            value: { type: 'number' },
          },
          required: ['value'],
        },
      },
      required: ['level2'],
    },
  },
  required: ['level1'],
});
expectTypeOf<typeof DeepNested.type>().toEqualTypeOf<{
  level1: {
    level2: {
      value: number;
    };
  };
}>();
