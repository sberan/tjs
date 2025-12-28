import { describe, it, expect } from 'vitest';
import { schema } from '../../src/index.js';

describe('patternProperties', () => {
  const Prefixed = schema({
    type: 'object',
    patternProperties: {
      '^S_': { type: 'string' },
      '^N_': { type: 'number' },
    },
  });

  it('validates properties matching patterns', () => {
    expect(Prefixed.validate({ S_name: 'hello', N_count: 42 }).error).toBeUndefined();
    expect(Prefixed.validate({ S_foo: 'bar' }).error).toBeUndefined();
    expect(Prefixed.validate({ N_value: 123 }).error).toBeUndefined();
  });

  it('rejects properties with wrong types for patterns', () => {
    expect(Prefixed.validate({ S_name: 123 }).error).toBeDefined(); // should be string
    expect(Prefixed.validate({ N_count: 'abc' }).error).toBeDefined(); // should be number
  });

  it('allows properties not matching any pattern', () => {
    expect(Prefixed.validate({ other: 'anything' }).error).toBeUndefined();
  });

  it('works with additionalProperties: false', () => {
    const Strict = schema({
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      patternProperties: {
        '^x_': { type: 'number' },
      },
      additionalProperties: false,
    });

    expect(Strict.validate({ id: 'abc', x_value: 42 }).error).toBeUndefined();
    expect(Strict.validate({ id: 'abc', other: 'x' }).error).toBeDefined(); // other not allowed
  });

  it('validates against multiple matching patterns', () => {
    const MultiMatch = schema({
      type: 'object',
      patternProperties: {
        '^a': { type: 'string' },
        b$: { minLength: 2 },
      },
    });

    // 'ab' matches both patterns: must be string AND have minLength 2
    expect(MultiMatch.validate({ ab: 'hi' }).error).toBeUndefined();
    expect(MultiMatch.validate({ ab: 'x' }).error).toBeDefined(); // too short
    expect(MultiMatch.validate({ ab: 123 }).error).toBeDefined(); // not a string
  });
});

describe('propertyNames', () => {
  const LowerCase = schema({
    type: 'object',
    propertyNames: {
      pattern: '^[a-z]+$',
    },
  });

  it('validates property names matching pattern', () => {
    expect(LowerCase.validate({ foo: 1, bar: 2 }).error).toBeUndefined();
    expect(LowerCase.validate({}).error).toBeUndefined();
  });

  it('rejects property names not matching pattern', () => {
    expect(LowerCase.validate({ Foo: 1 }).error).toBeDefined(); // uppercase
    expect(LowerCase.validate({ foo_bar: 1 }).error).toBeDefined(); // underscore
    expect(LowerCase.validate({ '123': 1 }).error).toBeDefined(); // numbers
  });

  const LengthConstrained = schema({
    type: 'object',
    propertyNames: {
      minLength: 2,
      maxLength: 5,
    },
  });

  it('validates property name length', () => {
    expect(LengthConstrained.validate({ ab: 1, abcde: 2 }).error).toBeUndefined();
    expect(LengthConstrained.validate({ a: 1 }).error).toBeDefined(); // too short
    expect(LengthConstrained.validate({ abcdef: 1 }).error).toBeDefined(); // too long
  });

  it('returns correct error messages', () => {
    const result = LowerCase.validate({ BadKey: 1 });
    expect(result.error === undefined).toBe(false);
    if (result.error !== undefined) {
      expect(result.error.length).toBe(1);
      expect(result.error[0].keyword).toBe('pattern');
      expect(result.error[0].path).toBe('BadKey');
    }
  });
});

describe('$anchor', () => {
  const WithAnchor = schema({
    $defs: {
      Address: {
        $anchor: 'address',
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
        },
        required: ['street', 'city'],
      },
    },
    type: 'object',
    properties: {
      home: { $ref: '#address' },
      work: { $ref: '#address' },
    },
  });

  it('resolves anchor references', () => {
    expect(
      WithAnchor.validate({
        home: { street: '123 Main', city: 'Boston' },
        work: { street: '456 Oak', city: 'Cambridge' },
      }).error
    ).toBeUndefined();
  });

  it('validates against anchor schema', () => {
    expect(
      WithAnchor.validate({
        home: { street: '123 Main' }, // missing city
      }).error
    ).toBeDefined();
  });

  it('works with nested anchors', () => {
    const Nested = schema({
      $defs: {
        Inner: {
          $anchor: 'inner',
          type: 'object',
          properties: {
            value: { type: 'number' },
          },
          required: ['value'],
        },
      },
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            nested: { $ref: '#inner' },
          },
        },
      },
    });

    expect(Nested.validate({ data: { nested: { value: 42 } } }).error).toBeUndefined();
    expect(Nested.validate({ data: { nested: { value: 'x' } } }).error).toBeDefined();
  });

  it('anchor takes precedence when name could conflict', () => {
    const WithBothRefs = schema({
      $defs: {
        Item: {
          $anchor: 'myitem',
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
      },
      type: 'object',
      properties: {
        byDef: { $ref: '#/$defs/Item' },
        byAnchor: { $ref: '#myitem' },
      },
    });

    expect(
      WithBothRefs.validate({
        byDef: { name: 'foo' },
        byAnchor: { name: 'bar' },
      }).error
    ).toBeUndefined();
  });
});
