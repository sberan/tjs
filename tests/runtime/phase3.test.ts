import { describe, it, expect } from 'vitest';
import { schema } from '../../src/index.js';

describe('dependentSchemas', () => {
  // Classic example: creditCard requires billingAddress
  const Payment = schema({
    type: 'object',
    properties: {
      name: { type: 'string' },
      creditCard: { type: 'string' },
      billingAddress: { type: 'string' },
    },
    dependentSchemas: {
      creditCard: {
        required: ['billingAddress'],
      },
    },
  });

  it('passes when trigger property is absent', () => {
    expect(Payment.validate({})).toBe(true);
    expect(Payment.validate({ name: 'Alice' })).toBe(true);
    expect(Payment.validate({ billingAddress: '123 Main St' })).toBe(true);
  });

  it('passes when trigger and required dependent are present', () => {
    expect(Payment.validate({ creditCard: '1234', billingAddress: '123 Main St' })).toBe(true);
    expect(Payment.validate({ name: 'Alice', creditCard: '1234', billingAddress: '123 Main St' })).toBe(true);
  });

  it('fails when trigger is present but dependent required is missing', () => {
    expect(Payment.validate({ creditCard: '1234' })).toBe(false);
    expect(Payment.validate({ name: 'Alice', creditCard: '1234' })).toBe(false);
  });

  it('returns correct error message', () => {
    const result = Payment.parse({ creditCard: '1234' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some(e => e.keyword === 'required' && e.path === 'billingAddress')).toBe(true);
    }
  });

  // Complex example with property type constraints
  const ConditionalType = schema({
    type: 'object',
    properties: {
      type: { type: 'string' },
      value: {},
    },
    dependentSchemas: {
      type: {
        properties: {
          value: { type: 'number' },
        },
      },
    },
  });

  it('applies property schema when trigger is present', () => {
    expect(ConditionalType.validate({ type: 'numeric', value: 42 })).toBe(true);
    expect(ConditionalType.validate({ type: 'numeric', value: 'not a number' })).toBe(false);
  });

  it('does not apply schema when trigger is absent', () => {
    expect(ConditionalType.validate({ value: 'anything' })).toBe(true);
    expect(ConditionalType.validate({ value: 42 })).toBe(true);
  });

  // Multiple dependent schemas
  const Multi = schema({
    type: 'object',
    properties: {
      foo: { type: 'string' },
      bar: { type: 'string' },
    },
    dependentSchemas: {
      foo: {
        properties: {
          fooExtra: { type: 'number' },
        },
        required: ['fooExtra'],
      },
      bar: {
        properties: {
          barExtra: { type: 'boolean' },
        },
        required: ['barExtra'],
      },
    },
  });

  it('applies multiple dependent schemas independently', () => {
    // Only foo trigger
    expect(Multi.validate({ foo: 'x', fooExtra: 1 })).toBe(true);
    expect(Multi.validate({ foo: 'x' })).toBe(false);

    // Only bar trigger
    expect(Multi.validate({ bar: 'x', barExtra: true })).toBe(true);
    expect(Multi.validate({ bar: 'x' })).toBe(false);

    // Both triggers
    expect(Multi.validate({ foo: 'x', bar: 'x', fooExtra: 1, barExtra: true })).toBe(true);
    expect(Multi.validate({ foo: 'x', bar: 'x', fooExtra: 1 })).toBe(false);
  });

  // Nested objects in dependent schema
  const Nested = schema({
    type: 'object',
    properties: {
      advanced: { type: 'boolean' },
    },
    dependentSchemas: {
      advanced: {
        properties: {
          settings: {
            type: 'object',
            properties: {
              timeout: { type: 'number' },
            },
            required: ['timeout'],
          },
        },
        required: ['settings'],
      },
    },
  });

  it('validates nested dependent schemas', () => {
    expect(Nested.validate({})).toBe(true);
    expect(Nested.validate({ advanced: true, settings: { timeout: 30 } })).toBe(true);
    expect(Nested.validate({ advanced: true })).toBe(false);
    expect(Nested.validate({ advanced: true, settings: {} })).toBe(false);
  });
});

describe('unevaluatedProperties', () => {
  // Basic unevaluatedProperties: false - no extra properties allowed
  const Strict = schema({
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    unevaluatedProperties: false,
  });

  it('allows defined properties', () => {
    expect(Strict.validate({ name: 'Alice' })).toBe(true);
    expect(Strict.validate({})).toBe(true);
  });

  it('rejects unevaluated properties when false', () => {
    expect(Strict.validate({ name: 'Alice', extra: 'value' })).toBe(false);
    expect(Strict.validate({ other: 123 })).toBe(false);
  });

  it('returns correct error message', () => {
    const result = Strict.parse({ name: 'Alice', extra: 'value' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some(e => e.keyword === 'unevaluatedProperties' && e.path === 'extra')).toBe(true);
    }
  });

  // unevaluatedProperties with allOf - properties from all subschemas are evaluated
  const AllOfExtended = schema({
    allOf: [
      {
        type: 'object',
        properties: { name: { type: 'string' } },
      },
      {
        type: 'object',
        properties: { age: { type: 'number' } },
      },
    ],
    unevaluatedProperties: false,
  });

  it('evaluates properties from allOf subschemas', () => {
    expect(AllOfExtended.validate({ name: 'Alice', age: 30 })).toBe(true);
    expect(AllOfExtended.validate({ name: 'Alice' })).toBe(true);
    expect(AllOfExtended.validate({ age: 30 })).toBe(true);
    expect(AllOfExtended.validate({})).toBe(true);
  });

  it('rejects extra properties not in any allOf subschema', () => {
    expect(AllOfExtended.validate({ name: 'Alice', age: 30, extra: 'x' })).toBe(false);
  });

  // unevaluatedProperties with anyOf
  const AnyOfSchema = schema({
    anyOf: [
      {
        type: 'object',
        properties: { kind: { const: 'a' }, a: { type: 'string' } },
      },
      {
        type: 'object',
        properties: { kind: { const: 'b' }, b: { type: 'number' } },
      },
    ],
    unevaluatedProperties: false,
  });

  it('evaluates properties from matching anyOf branch', () => {
    expect(AnyOfSchema.validate({ kind: 'a', a: 'hello' })).toBe(true);
    expect(AnyOfSchema.validate({ kind: 'b', b: 42 })).toBe(true);
  });

  it('rejects extra properties with anyOf', () => {
    expect(AnyOfSchema.validate({ kind: 'a', a: 'hello', extra: true })).toBe(false);
  });

  // unevaluatedProperties with if/then/else
  const Conditional = schema({
    type: 'object',
    properties: {
      type: { type: 'string' },
    },
    if: {
      properties: { type: { const: 'person' } },
    },
    then: {
      properties: { name: { type: 'string' } },
    },
    else: {
      properties: { title: { type: 'string' } },
    },
    unevaluatedProperties: false,
  });

  it('evaluates properties from if/then branch', () => {
    expect(Conditional.validate({ type: 'person', name: 'Alice' })).toBe(true);
  });

  it('evaluates properties from if/else branch', () => {
    expect(Conditional.validate({ type: 'company', title: 'Acme Corp' })).toBe(true);
  });

  it('rejects extra properties not in conditional branch', () => {
    expect(Conditional.validate({ type: 'person', name: 'Alice', title: 'ignored' })).toBe(false);
    expect(Conditional.validate({ type: 'company', title: 'Acme', name: 'ignored' })).toBe(false);
  });

  // unevaluatedProperties with schema (not just false)
  const WithSchema = schema({
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    unevaluatedProperties: { type: 'number' },
  });

  it('validates unevaluated properties against schema', () => {
    expect(WithSchema.validate({ id: 'abc', extra: 42 })).toBe(true);
    expect(WithSchema.validate({ id: 'abc', foo: 1, bar: 2 })).toBe(true);
  });

  it('rejects unevaluated properties not matching schema', () => {
    expect(WithSchema.validate({ id: 'abc', extra: 'string' })).toBe(false);
    expect(WithSchema.validate({ id: 'abc', extra: true })).toBe(false);
  });

  // Interaction with patternProperties
  const WithPattern = schema({
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    patternProperties: {
      '^x_': { type: 'number' },
    },
    unevaluatedProperties: false,
  });

  it('considers patternProperties as evaluated', () => {
    expect(WithPattern.validate({ id: 'abc', x_count: 42 })).toBe(true);
    expect(WithPattern.validate({ id: 'abc', x_foo: 1, x_bar: 2 })).toBe(true);
  });

  it('rejects properties not matching patterns', () => {
    expect(WithPattern.validate({ id: 'abc', other: 'value' })).toBe(false);
  });

  // Interaction with additionalProperties
  const WithAdditional = schema({
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    additionalProperties: { type: 'number' },
    unevaluatedProperties: false,
  });

  it('additionalProperties marks properties as evaluated', () => {
    expect(WithAdditional.validate({ id: 'abc', extra: 42 })).toBe(true);
    // If additionalProperties validates, unevaluatedProperties should not trigger
    expect(WithAdditional.validate({ id: 'abc', foo: 1, bar: 2 })).toBe(true);
  });
});

describe('unevaluatedItems', () => {
  // Basic tuple with unevaluatedItems: false - strict tuple
  const StrictTuple = schema({
    type: 'array',
    prefixItems: [
      { type: 'string' },
      { type: 'number' },
    ],
    unevaluatedItems: false,
  });

  it('allows items matching prefixItems', () => {
    expect(StrictTuple.validate(['hello', 42])).toBe(true);
    expect(StrictTuple.validate(['x', 1])).toBe(true);
  });

  it('rejects extra items when unevaluatedItems is false', () => {
    expect(StrictTuple.validate(['hello', 42, 'extra'])).toBe(false);
    expect(StrictTuple.validate(['hello', 42, 1, 2, 3])).toBe(false);
  });

  it('returns correct error message', () => {
    const result = StrictTuple.parse(['hello', 42, 'extra']);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some(e => e.keyword === 'unevaluatedItems' && e.path === '[2]')).toBe(true);
    }
  });

  // unevaluatedItems with schema (not just false)
  const WithSchema = schema({
    type: 'array',
    prefixItems: [
      { type: 'string' },
    ],
    unevaluatedItems: { type: 'number' },
  });

  it('validates unevaluated items against schema', () => {
    expect(WithSchema.validate(['hello', 1, 2, 3])).toBe(true);
    expect(WithSchema.validate(['hello'])).toBe(true);
  });

  it('rejects unevaluated items not matching schema', () => {
    expect(WithSchema.validate(['hello', 'world'])).toBe(false);
    expect(WithSchema.validate(['hello', 1, 'bad'])).toBe(false);
  });

  // unevaluatedItems with allOf
  const AllOfTuple = schema({
    allOf: [
      {
        type: 'array',
        prefixItems: [{ type: 'string' }],
      },
      {
        type: 'array',
        prefixItems: [{ minLength: 1 }, { type: 'number' }],
      },
    ],
    unevaluatedItems: false,
  });

  it('merges evaluated items from allOf subschemas', () => {
    expect(AllOfTuple.validate(['hello', 42])).toBe(true);
    expect(AllOfTuple.validate(['x', 1])).toBe(true);
  });

  it('rejects extra items not in any allOf subschema', () => {
    expect(AllOfTuple.validate(['hello', 42, 'extra'])).toBe(false);
  });

  // unevaluatedItems with contains
  const WithContains = schema({
    type: 'array',
    contains: { type: 'string' },
    unevaluatedItems: { type: 'number' },
  });

  it('marks items matching contains as evaluated', () => {
    // 'hello' matches contains, 1 and 2 are unevaluated but match schema
    expect(WithContains.validate(['hello', 1, 2])).toBe(true);
    expect(WithContains.validate([1, 'hello', 2])).toBe(true);
  });

  it('rejects unevaluated items not matching schema when contains present', () => {
    // 'hello' matches contains, true is unevaluated and doesn't match number
    expect(WithContains.validate(['hello', true])).toBe(false);
  });

  // Interaction with items (not prefixItems)
  const WithItems = schema({
    type: 'array',
    items: { type: 'number' },
    unevaluatedItems: false,
  });

  it('items marks all positions as evaluated', () => {
    expect(WithItems.validate([1, 2, 3])).toBe(true);
    expect(WithItems.validate([])).toBe(true);
  });

  // When items validates all, unevaluatedItems should never trigger
  it('unevaluatedItems never triggers when items is present', () => {
    // All items are evaluated by 'items', so unevaluatedItems: false has nothing to reject
    expect(WithItems.validate([1, 2, 3, 4, 5])).toBe(true);
  });

  // Partial tuple with items for rest
  const PartialTuple = schema({
    type: 'array',
    prefixItems: [{ type: 'string' }],
    items: { type: 'number' },
    unevaluatedItems: false,
  });

  it('prefixItems + items marks all as evaluated', () => {
    expect(PartialTuple.validate(['hello', 1, 2, 3])).toBe(true);
    expect(PartialTuple.validate(['hello'])).toBe(true);
  });
});

describe('contentEncoding', () => {
  const Base64String = schema({
    type: 'string',
    contentEncoding: 'base64',
  });

  it('accepts valid base64 strings', () => {
    expect(Base64String.validate('SGVsbG8gV29ybGQ=')).toBe(true); // "Hello World"
    expect(Base64String.validate('dGVzdA==')).toBe(true); // "test"
    expect(Base64String.validate('')).toBe(true); // empty is valid base64
  });

  it('rejects invalid base64 strings', () => {
    expect(Base64String.validate('not valid base64!!!')).toBe(false);
    expect(Base64String.validate('SGVsbG8@V29ybGQ=')).toBe(false); // invalid char @
  });

  it('returns correct error message', () => {
    const result = Base64String.parse('invalid!!!');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some(e => e.keyword === 'contentEncoding')).toBe(true);
    }
  });
});

describe('contentMediaType', () => {
  const JsonString = schema({
    type: 'string',
    contentMediaType: 'application/json',
  });

  it('accepts valid JSON strings', () => {
    expect(JsonString.validate('{"name":"Alice"}')).toBe(true);
    expect(JsonString.validate('[1,2,3]')).toBe(true);
    expect(JsonString.validate('"hello"')).toBe(true);
    expect(JsonString.validate('42')).toBe(true);
    expect(JsonString.validate('null')).toBe(true);
  });

  it('rejects invalid JSON strings', () => {
    expect(JsonString.validate('{invalid json}')).toBe(false);
    expect(JsonString.validate('{"unclosed": ')).toBe(false);
    expect(JsonString.validate('undefined')).toBe(false);
  });

  it('returns correct error message', () => {
    const result = JsonString.parse('{invalid}');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some(e => e.keyword === 'contentMediaType')).toBe(true);
    }
  });
});

describe('contentSchema', () => {
  // JSON string that must match a schema
  const JsonWithSchema = schema({
    type: 'string',
    contentMediaType: 'application/json',
    contentSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
      required: ['name'],
    },
  });

  it('validates JSON content against schema', () => {
    expect(JsonWithSchema.validate('{"name":"Alice","age":30}')).toBe(true);
    expect(JsonWithSchema.validate('{"name":"Bob"}')).toBe(true);
  });

  it('rejects JSON that does not match schema', () => {
    expect(JsonWithSchema.validate('{"age":30}')).toBe(false); // missing required 'name'
    expect(JsonWithSchema.validate('{"name":123}')).toBe(false); // name should be string
  });

  // Base64 encoded JSON with schema
  const Base64JsonWithSchema = schema({
    type: 'string',
    contentEncoding: 'base64',
    contentMediaType: 'application/json',
    contentSchema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
  });

  it('validates base64-encoded JSON against schema', () => {
    // {"id":42} encoded as base64
    expect(Base64JsonWithSchema.validate('eyJpZCI6NDJ9')).toBe(true);
  });

  it('rejects invalid base64 before checking JSON', () => {
    expect(Base64JsonWithSchema.validate('not-base64!!!')).toBe(false);
  });

  it('rejects invalid JSON after decoding base64', () => {
    // "not json" encoded as base64
    expect(Base64JsonWithSchema.validate('bm90IGpzb24=')).toBe(false);
  });
});
