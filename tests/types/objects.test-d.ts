import { schema } from 'json-schema-ts';

// =============================================================================
// Basic Object Types
// =============================================================================

// Empty object
const Empty = schema({ type: 'object' });
Empty.type; // $ExpectType Record<string, unknown>

// All optional properties
const AllOptional = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});
AllOptional.type; // $ExpectType { a?: string; b?: number }

// Some required properties
const SomeRequired = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a'],
});
SomeRequired.type; // $ExpectType { a: string; b?: number }

// All required properties
const AllRequired = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a', 'b'],
});
AllRequired.type; // $ExpectType { a: string; b: number }

// =============================================================================
// Nested Objects
// =============================================================================

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

// Complex nested with mixed required/optional
const ComplexNested = schema({
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
ComplexNested.type; // $ExpectType { required1: string; required2: { nested: number }; optional1?: boolean }

// =============================================================================
// Additional Properties
// =============================================================================

// additionalProperties: false (exact object)
const Strict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  additionalProperties: false,
});
Strict.type; // $ExpectType { id?: string }

// additionalProperties: schema (index signature)
const Dict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: { type: 'number' },
});
Dict.type; // $ExpectType { id: string; } & { [x: string]: number; }

// =============================================================================
// Required Properties Not in Properties
// =============================================================================

// Required property not defined in properties - gets type unknown
const MissingRequired = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name', 'ghost'],
});
MissingRequired.type; // $ExpectType { name: string; ghost: unknown }

// Multiple missing required properties
const MultipleMissing = schema({
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id', 'foo', 'bar', 'baz'],
});
MultipleMissing.type; // $ExpectType { id: number; foo: unknown; bar: unknown; baz: unknown }

// All required properties missing from properties
const AllMissing = schema({
  type: 'object',
  required: ['a', 'b'],
});
AllMissing.type; // $ExpectType { a: unknown; b: unknown; }

// Mix of defined required, missing required, and optional
const MixedRequired = schema({
  type: 'object',
  properties: {
    defined: { type: 'string' },
    optional: { type: 'boolean' },
  },
  required: ['defined', 'undefined_prop'],
});
MixedRequired.type; // $ExpectType { defined: string; optional?: boolean; undefined_prop: unknown }

// =============================================================================
// Nullable Objects
// =============================================================================

// Optional with nullable property
const OptionalNullable = schema({
  type: 'object',
  properties: {
    value: { type: ['string', 'null'] },
  },
});
OptionalNullable.type; // $ExpectType { value?: string | null }
