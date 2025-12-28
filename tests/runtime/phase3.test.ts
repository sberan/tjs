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
    expect(Payment.validate({}).error).toBeUndefined();
    expect(Payment.validate({ name: 'Alice' }).error).toBeUndefined();
    expect(Payment.validate({ billingAddress: '123 Main St' }).error).toBeUndefined();
  });

  it('passes when trigger and required dependent are present', () => {
    expect(
      Payment.validate({ creditCard: '1234', billingAddress: '123 Main St' }).error
    ).toBeUndefined();
    expect(
      Payment.validate({ name: 'Alice', creditCard: '1234', billingAddress: '123 Main St' }).error
    ).toBeUndefined();
  });

  it('fails when trigger is present but dependent required is missing', () => {
    expect(Payment.validate({ creditCard: '1234' }).error).toBeDefined();
    expect(Payment.validate({ name: 'Alice', creditCard: '1234' }).error).toBeDefined();
  });

  it('returns correct error message', () => {
    const result = Payment.validate({ creditCard: '1234' });
    expect(result.error === undefined).toBe(false);
    if (result.error !== undefined) {
      expect(result.error[0].keyword).toBe('required');
      expect(result.error[0].path).toBe('billingAddress');
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
    expect(ConditionalType.validate({ type: 'numeric', value: 42 }).error).toBeUndefined();
    expect(
      ConditionalType.validate({ type: 'numeric', value: 'not a number' }).error
    ).toBeDefined();
  });

  it('does not apply schema when trigger is absent', () => {
    expect(ConditionalType.validate({ value: 'anything' }).error).toBeUndefined();
    expect(ConditionalType.validate({ value: 42 }).error).toBeUndefined();
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
    expect(Multi.validate({ foo: 'x', fooExtra: 1 }).error).toBeUndefined();
    expect(Multi.validate({ foo: 'x' }).error).toBeDefined();

    // Only bar trigger
    expect(Multi.validate({ bar: 'x', barExtra: true }).error).toBeUndefined();
    expect(Multi.validate({ bar: 'x' }).error).toBeDefined();

    // Both triggers
    expect(
      Multi.validate({ foo: 'x', bar: 'x', fooExtra: 1, barExtra: true }).error
    ).toBeUndefined();
    expect(Multi.validate({ foo: 'x', bar: 'x', fooExtra: 1 }).error).toBeDefined();
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
    expect(Nested.validate({}).error).toBeUndefined();
    expect(Nested.validate({ advanced: true, settings: { timeout: 30 } }).error).toBeUndefined();
    expect(Nested.validate({ advanced: true }).error).toBeDefined();
    expect(Nested.validate({ advanced: true, settings: {} }).error).toBeDefined();
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
    expect(Strict.validate({ name: 'Alice' }).error).toBeUndefined();
    expect(Strict.validate({}).error).toBeUndefined();
  });

  it('rejects unevaluated properties when false', () => {
    expect(Strict.validate({ name: 'Alice', extra: 'value' }).error).toBeDefined();
    expect(Strict.validate({ other: 123 }).error).toBeDefined();
  });

  it('returns correct error message', () => {
    const result = Strict.validate({ name: 'Alice', extra: 'value' });
    expect(result.error === undefined).toBe(false);
    if (result.error !== undefined) {
      expect(result.error[0].keyword).toBe('unevaluatedProperties');
      expect(result.error[0].path).toBe('extra');
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
    expect(AllOfExtended.validate({ name: 'Alice', age: 30 }).error).toBeUndefined();
    expect(AllOfExtended.validate({ name: 'Alice' }).error).toBeUndefined();
    expect(AllOfExtended.validate({ age: 30 }).error).toBeUndefined();
    expect(AllOfExtended.validate({}).error).toBeUndefined();
  });

  it('rejects extra properties not in any allOf subschema', () => {
    expect(AllOfExtended.validate({ name: 'Alice', age: 30, extra: 'x' }).error).toBeDefined();
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
    expect(AnyOfSchema.validate({ kind: 'a', a: 'hello' }).error).toBeUndefined();
    expect(AnyOfSchema.validate({ kind: 'b', b: 42 }).error).toBeUndefined();
  });

  it('rejects extra properties with anyOf', () => {
    expect(AnyOfSchema.validate({ kind: 'a', a: 'hello', extra: true }).error).toBeDefined();
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
    expect(Conditional.validate({ type: 'person', name: 'Alice' }).error).toBeUndefined();
  });

  it('evaluates properties from if/else branch', () => {
    expect(Conditional.validate({ type: 'company', title: 'Acme Corp' }).error).toBeUndefined();
  });

  it('rejects extra properties not in conditional branch', () => {
    expect(
      Conditional.validate({ type: 'person', name: 'Alice', title: 'ignored' }).error
    ).toBeDefined();
    expect(
      Conditional.validate({ type: 'company', title: 'Acme', name: 'ignored' }).error
    ).toBeDefined();
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
    expect(WithSchema.validate({ id: 'abc', extra: 42 }).error).toBeUndefined();
    expect(WithSchema.validate({ id: 'abc', foo: 1, bar: 2 }).error).toBeUndefined();
  });

  it('rejects unevaluated properties not matching schema', () => {
    expect(WithSchema.validate({ id: 'abc', extra: 'string' }).error).toBeDefined();
    expect(WithSchema.validate({ id: 'abc', extra: true }).error).toBeDefined();
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
    expect(WithPattern.validate({ id: 'abc', x_count: 42 }).error).toBeUndefined();
    expect(WithPattern.validate({ id: 'abc', x_foo: 1, x_bar: 2 }).error).toBeUndefined();
  });

  it('rejects properties not matching patterns', () => {
    expect(WithPattern.validate({ id: 'abc', other: 'value' }).error).toBeDefined();
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
    expect(WithAdditional.validate({ id: 'abc', extra: 42 }).error).toBeUndefined();
    // If additionalProperties validates, unevaluatedProperties should not trigger
    expect(WithAdditional.validate({ id: 'abc', foo: 1, bar: 2 }).error).toBeUndefined();
  });
});

describe('unevaluatedItems', () => {
  // Basic tuple with unevaluatedItems: false - strict tuple
  const StrictTuple = schema({
    type: 'array',
    prefixItems: [{ type: 'string' }, { type: 'number' }],
    unevaluatedItems: false,
  });

  it('allows items matching prefixItems', () => {
    expect(StrictTuple.validate(['hello', 42]).error).toBeUndefined();
    expect(StrictTuple.validate(['x', 1]).error).toBeUndefined();
  });

  it('rejects extra items when unevaluatedItems is false', () => {
    expect(StrictTuple.validate(['hello', 42, 'extra']).error).toBeDefined();
    expect(StrictTuple.validate(['hello', 42, 1, 2, 3]).error).toBeDefined();
  });

  it('returns correct error message', () => {
    const result = StrictTuple.validate(['hello', 42, 'extra']);
    expect(result.error === undefined).toBe(false);
    if (result.error !== undefined) {
      expect(result.error[0].keyword).toBe('unevaluatedItems');
      expect(result.error[0].path).toBe('[2]');
    }
  });

  // unevaluatedItems with schema (not just false)
  const WithSchema = schema({
    type: 'array',
    prefixItems: [{ type: 'string' }],
    unevaluatedItems: { type: 'number' },
  });

  it('validates unevaluated items against schema', () => {
    expect(WithSchema.validate(['hello', 1, 2, 3]).error).toBeUndefined();
    expect(WithSchema.validate(['hello']).error).toBeUndefined();
  });

  it('rejects unevaluated items not matching schema', () => {
    expect(WithSchema.validate(['hello', 'world']).error).toBeDefined();
    expect(WithSchema.validate(['hello', 1, 'bad']).error).toBeDefined();
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
    expect(AllOfTuple.validate(['hello', 42]).error).toBeUndefined();
    expect(AllOfTuple.validate(['x', 1]).error).toBeUndefined();
  });

  it('rejects extra items not in any allOf subschema', () => {
    expect(AllOfTuple.validate(['hello', 42, 'extra']).error).toBeDefined();
  });

  // unevaluatedItems with contains
  const WithContains = schema({
    type: 'array',
    contains: { type: 'string' },
    unevaluatedItems: { type: 'number' },
  });

  it('marks items matching contains as evaluated', () => {
    // 'hello' matches contains, 1 and 2 are unevaluated but match schema
    expect(WithContains.validate(['hello', 1, 2]).error).toBeUndefined();
    expect(WithContains.validate([1, 'hello', 2]).error).toBeUndefined();
  });

  it('rejects unevaluated items not matching schema when contains present', () => {
    // 'hello' matches contains, true is unevaluated and doesn't match number
    expect(WithContains.validate(['hello', true]).error).toBeDefined();
  });

  // Interaction with items (not prefixItems)
  const WithItems = schema({
    type: 'array',
    items: { type: 'number' },
    unevaluatedItems: false,
  });

  it('items marks all positions as evaluated', () => {
    expect(WithItems.validate([1, 2, 3]).error).toBeUndefined();
    expect(WithItems.validate([]).error).toBeUndefined();
  });

  // When items validates all, unevaluatedItems should never trigger
  it('unevaluatedItems never triggers when items is present', () => {
    // All items are evaluated by 'items', so unevaluatedItems: false has nothing to reject
    expect(WithItems.validate([1, 2, 3, 4, 5]).error).toBeUndefined();
  });

  // Partial tuple with items for rest
  const PartialTuple = schema({
    type: 'array',
    prefixItems: [{ type: 'string' }],
    items: { type: 'number' },
    unevaluatedItems: false,
  });

  it('prefixItems + items marks all as evaluated', () => {
    expect(PartialTuple.validate(['hello', 1, 2, 3]).error).toBeUndefined();
    expect(PartialTuple.validate(['hello']).error).toBeUndefined();
  });
});

// Per JSON Schema spec (draft 2020-12), contentEncoding, contentMediaType,
// and contentSchema are ANNOTATIONS by default, not assertions.
// They do not cause validation failures.
// See: https://json-schema.org/understanding-json-schema/reference/non_json_data
describe('contentEncoding (annotation-only by default)', () => {
  const Base64String = schema({
    type: 'string',
    contentEncoding: 'base64',
  });

  it('accepts all strings (content keywords are annotation-only)', () => {
    expect(Base64String.validate('SGVsbG8gV29ybGQ=').error).toBeUndefined(); // valid base64
    expect(Base64String.validate('dGVzdA==').error).toBeUndefined(); // valid base64
    expect(Base64String.validate('').error).toBeUndefined(); // empty string
    // Per spec, invalid content still passes validation
    expect(Base64String.validate('not valid base64!!!').error).toBeUndefined();
    expect(Base64String.validate('SGVsbG8@V29ybGQ=').error).toBeUndefined(); // invalid char @
  });
});

describe('contentMediaType (annotation-only by default)', () => {
  const JsonString = schema({
    type: 'string',
    contentMediaType: 'application/json',
  });

  it('accepts all strings (content keywords are annotation-only)', () => {
    expect(JsonString.validate('{"name":"Alice"}').error).toBeUndefined(); // valid JSON
    expect(JsonString.validate('[1,2,3]').error).toBeUndefined(); // valid JSON
    expect(JsonString.validate('"hello"').error).toBeUndefined(); // valid JSON
    expect(JsonString.validate('42').error).toBeUndefined(); // valid JSON
    expect(JsonString.validate('null').error).toBeUndefined(); // valid JSON
    // Per spec, invalid content still passes validation
    expect(JsonString.validate('{invalid json}').error).toBeUndefined();
    expect(JsonString.validate('{"unclosed": ').error).toBeUndefined();
    expect(JsonString.validate('undefined').error).toBeUndefined();
  });
});

describe('contentSchema (annotation-only by default)', () => {
  // JSON string with schema annotation
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

  it('accepts all strings (content keywords are annotation-only)', () => {
    expect(JsonWithSchema.validate('{"name":"Alice","age":30}').error).toBeUndefined();
    expect(JsonWithSchema.validate('{"name":"Bob"}').error).toBeUndefined();
    // Per spec, invalid content still passes validation
    expect(JsonWithSchema.validate('{"age":30}').error).toBeUndefined();
    expect(JsonWithSchema.validate('{"name":123}').error).toBeUndefined();
  });

  // Base64 encoded JSON with schema annotation
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

  it('accepts all strings (content keywords are annotation-only)', () => {
    // {"id":42} encoded as base64 - valid
    expect(Base64JsonWithSchema.validate('eyJpZCI6NDJ9').error).toBeUndefined();
    // Per spec, invalid content still passes validation
    expect(Base64JsonWithSchema.validate('not-base64!!!').error).toBeUndefined();
    expect(Base64JsonWithSchema.validate('bm90IGpzb24=').error).toBeUndefined(); // "not json" encoded
  });
});
