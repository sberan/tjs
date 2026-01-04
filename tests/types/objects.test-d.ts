import { schema, struct } from 'tjs';
import { expectTypeOf } from 'expect-type';
import type { JsonValue } from 'tjs';

// =============================================================================
// Struct Helper
// =============================================================================

// Basic struct with all required
const Person = struct({
  firstName: 'string',
  lastName: 'string',
  age: 'number',
});
expectTypeOf(Person.type).toEqualTypeOf<{ firstName: string; lastName: string; age: number }>();

// Struct with optional fields using { optional: true }
const PersonOptional = struct({
  firstName: 'string',
  lastName: 'string',
  age: { type: 'number', optional: true },
  middleName: { type: 'string', optional: true },
});
expectTypeOf(PersonOptional.type).toEqualTypeOf<{
  firstName: string;
  lastName: string;
  age?: number;
  middleName?: string;
}>();

// Struct with full schema definitions
const User = struct({
  id: 'number',
  email: { type: 'string', format: 'email' },
  tags: { type: 'array', items: { type: 'string' }, optional: true },
});
expectTypeOf(User.type).toEqualTypeOf<{ id: number; email: string; tags?: string[] }>();

// Struct with nested objects - use structural matching
const Company = struct({
  name: 'string',
  address: {
    type: 'object',
    properties: {
      street: { type: 'string' },
      city: { type: 'string' },
    },
    required: ['street', 'city'],
  },
});
// The nested address has index signature from the object type inference
expectTypeOf(Company.type.name).toBeString();
expectTypeOf(Company.type.address.street).toBeString();
expectTypeOf(Company.type.address.city).toBeString();

// Struct with self-reference ($ref: '#')
const LinkedNode = struct({
  value: 'string',
  next: { $ref: '#', optional: true },
});
// next should be the same type as the struct itself (recursive)
expectTypeOf(LinkedNode.type.value).toBeString();
expectTypeOf(LinkedNode.type.next?.value).toBeString();

// =============================================================================
// Basic Object Types
// =============================================================================

// Empty object
const Empty = schema({ type: 'object' });
Empty.type; // $ExpectType Record<string, unknown>

// All optional properties (no additionalProperties = allows any additional properties)
const AllOptional = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});
AllOptional.type; // $ExpectType { a?: string; b?: number } & { [x: string]: JsonValue }

// Some required properties (no additionalProperties = allows any additional properties)
const SomeRequired = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a'],
});
SomeRequired.type; // $ExpectType { a: string; b?: number } & { [x: string]: JsonValue }

// All required properties (no additionalProperties = allows any additional properties)
const AllRequired = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['a', 'b'],
});
AllRequired.type; // $ExpectType { a: string; b: number } & { [x: string]: JsonValue }

// =============================================================================
// Nested Objects
// =============================================================================

// Nested objects (using additionalProperties: false to test exact structure)
const Nested = schema({
  type: 'object',
  properties: {
    inner: {
      type: 'object',
      properties: {
        value: { type: 'string' },
      },
      required: ['value'],
      additionalProperties: false,
    },
  },
  required: ['inner'],
  additionalProperties: false,
});
Nested.type; // $ExpectType { inner: { value: string } }

// Deeply nested (using additionalProperties: false to test exact structure)
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
          additionalProperties: false,
        },
      },
      required: ['level2'],
      additionalProperties: false,
    },
  },
  required: ['level1'],
  additionalProperties: false,
});
DeepNested.type; // $ExpectType { level1: { level2: { value: number } } }

// Complex nested with mixed required/optional (using additionalProperties: false)
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
      additionalProperties: false,
    },
    optional1: { type: 'boolean' },
  },
  required: ['required1', 'required2'],
  additionalProperties: false,
});
ComplexNested.type; // $ExpectType { required1: string; required2: { nested: number }; optional1?: boolean }

// =============================================================================
// Additional Properties
// =============================================================================

// additionalProperties: false (exact object - no index signature)
const Strict = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  additionalProperties: false,
});
Strict.type; // $ExpectType { id?: string }

// additionalProperties: true (explicit - allows any JsonValue)
const WithAdditionalTrue = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'boolean' },
  },
  required: ['a'],
  additionalProperties: true,
});
WithAdditionalTrue.type; // $ExpectType { a: string; b?: boolean } & { [x: string]: unknown }

// additionalProperties not specified (defaults to true - allows any JsonValue)
const WithoutAdditional = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'boolean' },
  },
  required: ['a'],
});
WithoutAdditional.type; // $ExpectType { a: string; b?: boolean } & { [x: string]: JsonValue }

// additionalProperties: schema (index signature with specific type)
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

// Required property not defined in properties - gets type unknown (with additionalProperties: false)
const MissingRequired = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name', 'ghost'],
  additionalProperties: false,
});
MissingRequired.type; // $ExpectType { name: string; ghost: unknown }

// Multiple missing required properties (with additionalProperties: false)
const MultipleMissing = schema({
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id', 'foo', 'bar', 'baz'],
  additionalProperties: false,
});
MultipleMissing.type; // $ExpectType { id: number; foo: unknown; bar: unknown; baz: unknown }

// All required properties missing from properties (with additionalProperties: false)
const AllMissing = schema({
  type: 'object',
  required: ['a', 'b'],
  additionalProperties: false,
});
AllMissing.type; // $ExpectType { a: unknown; b: unknown; }

// Mix of defined required, missing required, and optional (with additionalProperties: false)
const MixedRequired = schema({
  type: 'object',
  properties: {
    defined: { type: 'string' },
    optional: { type: 'boolean' },
  },
  required: ['defined', 'undefined_prop'],
  additionalProperties: false,
});
MixedRequired.type; // $ExpectType { defined: string; optional?: boolean; undefined_prop: unknown }

// =============================================================================
// Nullable Objects
// =============================================================================

// Optional with nullable property (with additionalProperties: false)
const OptionalNullable = schema({
  type: 'object',
  properties: {
    value: { type: ['string', 'null'] },
  },
  additionalProperties: false,
});
OptionalNullable.type; // $ExpectType { value?: string | null }
