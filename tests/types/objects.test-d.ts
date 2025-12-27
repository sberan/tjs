import type { Equal, Expect } from './test-utils.js';
import { schema } from 'json-schema-ts';

// Empty object
const Empty = schema({ type: 'object' });
type _Empty = Expect<Equal<typeof Empty.type, Record<string, unknown>>>;

// All optional
const Obj1 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});
type _Obj1 = Expect<Equal<typeof Obj1.type, { a?: string; b?: number }>>;

// With required
const Obj2 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a'],
});
type _Obj2 = Expect<Equal<typeof Obj2.type, { a: string; b?: number }>>;

// All required
const Obj3 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a', 'b'],
});
type _Obj3 = Expect<Equal<typeof Obj3.type, { a: string; b: number }>>;

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
type _Nested = Expect<Equal<typeof Nested.type, { inner: { value: string } }>>;

// Additional properties false (exact object)
const Strict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  additionalProperties: false,
});
type _Strict = Expect<Equal<typeof Strict.type, { id?: string }>>;

// Additional properties typed
// Note: Due to TypeScript limitations with index signatures, when additionalProperties
// has a different type than defined properties, we verify the named property type.
const Dict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: { type: 'number' },
});
type _DictId = Expect<Equal<typeof Dict.type['id'], string>>;

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
type _DeepNested = Expect<Equal<typeof DeepNested.type, { level1: { level2: { value: number } } }>>;
