import { schema } from 'json-schema-ts';

// Empty object
const Empty = schema({ type: 'object' });
Empty.type; // $ExpectType Record<string, unknown>

// All optional
const Obj1 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});
Obj1.type; // $ExpectType { a?: string; b?: number }

// With required
const Obj2 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a'],
});
Obj2.type; // $ExpectType { a: string; b?: number }

// All required
const Obj3 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a', 'b'],
});
Obj3.type; // $ExpectType { a: string; b: number }

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
Nested.type; // $ExpectType { inner: { value: string } }

// Additional properties false (exact object)
const Strict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  additionalProperties: false,
});
Strict.type; // $ExpectType { id?: string }

// Additional properties typed - creates intersection with index signature
const Dict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: { type: 'number' },
});
Dict.type; // $ExpectType { id: string; } & { [x: string]: number; }

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
DeepNested.type; // $ExpectType { level1: { level2: { value: number } } }
