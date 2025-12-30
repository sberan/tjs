import { describe, it, expect } from 'vitest';
import { schema, struct } from '../../src/index.js';

describe('struct helper', () => {
  it('validates struct with all required fields', () => {
    const Person = struct({
      firstName: 'string',
      lastName: 'string',
      age: 'number',
    });

    expect(Person.validate({ firstName: 'John', lastName: 'Doe', age: 30 }).error).toBeUndefined();
    expect(Person.validate({ firstName: 'John', lastName: 'Doe' }).error).toBeDefined(); // missing age
    expect(Person.validate({ firstName: 'John', age: 30 }).error).toBeDefined(); // missing lastName
    expect(Person.validate({}).error).toBeDefined();
  });

  it('validates struct with optional fields using { optional: true }', () => {
    const Person = struct({
      firstName: 'string',
      middleName: { type: 'string', optional: true },
      lastName: 'string',
      age: { type: 'number', optional: true },
    });

    expect(Person.validate({ firstName: 'John', lastName: 'Doe' }).error).toBeUndefined();
    expect(
      Person.validate({ firstName: 'John', middleName: 'M', lastName: 'Doe' }).error
    ).toBeUndefined();
    expect(Person.validate({ firstName: 'John', lastName: 'Doe', age: 30 }).error).toBeUndefined();
    expect(
      Person.validate({ firstName: 'John', middleName: 'M', lastName: 'Doe', age: 30 }).error
    ).toBeUndefined();
    expect(Person.validate({ firstName: 'John' }).error).toBeDefined(); // missing required lastName
  });

  it('validates struct with full schema definitions', () => {
    const User = struct({
      id: 'number',
      tags: { type: 'array', items: { type: 'string' } },
    });

    expect(User.validate({ id: 1, tags: ['a', 'b'] }).error).toBeUndefined();
    expect(User.validate({ id: 1, tags: [] }).error).toBeUndefined();
    expect(User.validate({ id: 1, tags: [1, 2] }).error).toBeDefined(); // wrong item type
    expect(User.validate({ id: 1 }).error).toBeDefined(); // missing tags
  });

  it('validates types correctly', () => {
    const S = struct({
      str: 'string',
      num: 'number',
      bool: 'boolean',
    });

    expect(S.validate({ str: 'hello', num: 42, bool: true }).error).toBeUndefined();
    expect(S.validate({ str: 123, num: 42, bool: true }).error).toBeDefined(); // wrong str type
    expect(S.validate({ str: 'hello', num: '42', bool: true }).error).toBeDefined(); // wrong num type
  });

  it('validates self-referential structs with $ref', () => {
    const Node = struct({
      value: 'string',
      next: { $ref: '#', optional: true },
    });

    expect(Node.validate({ value: 'a' }).error).toBeUndefined();
    expect(Node.validate({ value: 'a', next: { value: 'b' } }).error).toBeUndefined();
    expect(
      Node.validate({ value: 'a', next: { value: 'b', next: { value: 'c' } } }).error
    ).toBeUndefined();
    expect(Node.validate({ value: 'a', next: { value: 123 } }).error).toBeDefined(); // wrong nested type
  });
});

describe('shorthand type syntax', () => {
  it('validates string shorthand', () => {
    const S = schema('string');
    expect(S.validate('hello').error).toBeUndefined();
    expect(S.validate(123).error).toBeDefined();
    expect(S.validate(null).error).toBeDefined();
  });

  it('validates number shorthand', () => {
    const N = schema('number');
    expect(N.validate(123).error).toBeUndefined();
    expect(N.validate(12.5).error).toBeUndefined();
    expect(N.validate('123').error).toBeDefined();
    expect(N.validate(null).error).toBeDefined();
  });

  it('validates integer shorthand', () => {
    const I = schema('integer');
    expect(I.validate(123).error).toBeUndefined();
    expect(I.validate(12.5).error).toBeDefined();
    expect(I.validate('123').error).toBeDefined();
  });

  it('validates boolean shorthand', () => {
    const B = schema('boolean');
    expect(B.validate(true).error).toBeUndefined();
    expect(B.validate(false).error).toBeUndefined();
    expect(B.validate(1).error).toBeDefined();
    expect(B.validate('true').error).toBeDefined();
  });

  it('validates null shorthand', () => {
    const Null = schema('null');
    expect(Null.validate(null).error).toBeUndefined();
    expect(Null.validate(undefined).error).toBeDefined();
    expect(Null.validate('').error).toBeDefined();
  });

  it('validates object shorthand', () => {
    const Obj = schema('object');
    expect(Obj.validate({}).error).toBeUndefined();
    expect(Obj.validate({ foo: 'bar' }).error).toBeUndefined();
    expect(Obj.validate([]).error).toBeDefined();
    expect(Obj.validate(null).error).toBeDefined();
    expect(Obj.validate('object').error).toBeDefined();
  });

  it('validates array shorthand', () => {
    const Arr = schema('array');
    expect(Arr.validate([]).error).toBeUndefined();
    expect(Arr.validate([1, 2, 3]).error).toBeUndefined();
    expect(Arr.validate({}).error).toBeDefined();
    expect(Arr.validate('array').error).toBeDefined();
  });
});

describe('minProperties / maxProperties', () => {
  const MinProps = schema({
    type: 'object',
    minProperties: 2,
  });

  const MaxProps = schema({
    type: 'object',
    maxProperties: 3,
  });

  const BothProps = schema({
    type: 'object',
    minProperties: 1,
    maxProperties: 2,
  });

  it('validates minProperties', () => {
    expect(MinProps.validate({}).error).toBeDefined();
    expect(MinProps.validate({ a: 1 }).error).toBeDefined();
    expect(MinProps.validate({ a: 1, b: 2 }).error).toBeUndefined();
    expect(MinProps.validate({ a: 1, b: 2, c: 3 }).error).toBeUndefined();
  });

  it('validates maxProperties', () => {
    expect(MaxProps.validate({}).error).toBeUndefined();
    expect(MaxProps.validate({ a: 1, b: 2, c: 3 }).error).toBeUndefined();
    expect(MaxProps.validate({ a: 1, b: 2, c: 3, d: 4 }).error).toBeDefined();
  });

  it('validates both min and max', () => {
    expect(BothProps.validate({}).error).toBeDefined();
    expect(BothProps.validate({ a: 1 }).error).toBeUndefined();
    expect(BothProps.validate({ a: 1, b: 2 }).error).toBeUndefined();
    expect(BothProps.validate({ a: 1, b: 2, c: 3 }).error).toBeDefined();
  });
});

describe('dependentRequired', () => {
  const DepReq = schema({
    type: 'object',
    properties: {
      foo: { type: 'string' },
      bar: { type: 'number' },
      baz: { type: 'boolean' },
    },
    dependentRequired: {
      foo: ['bar', 'baz'],
    },
  });

  it('passes when trigger is absent', () => {
    expect(DepReq.validate({}).error).toBeUndefined();
    expect(DepReq.validate({ bar: 1 }).error).toBeUndefined();
  });

  it('passes when trigger and all dependents are present', () => {
    expect(DepReq.validate({ foo: 'x', bar: 1, baz: true }).error).toBeUndefined();
  });

  it('fails when trigger is present but dependents are missing', () => {
    expect(DepReq.validate({ foo: 'x' }).error).toBeDefined();
    expect(DepReq.validate({ foo: 'x', bar: 1 }).error).toBeDefined();
    expect(DepReq.validate({ foo: 'x', baz: true }).error).toBeDefined();
  });

  it('returns correct error messages', () => {
    const result = DepReq.validate({ foo: 'x' });
    expect(result.error === undefined).toBe(false);
    if (result.error !== undefined) {
      expect(result.error.length).toBe(1);
      expect(result.error[0].keyword).toBe('dependentRequired');
      expect(result.error[0].path).toBe('bar');
    }
  });
});

describe('contains', () => {
  const HasString = schema({
    type: 'array',
    contains: { type: 'string' },
  });

  it('validates array with matching element', () => {
    expect(HasString.validate([1, 'hello', 3]).error).toBeUndefined();
    expect(HasString.validate(['a']).error).toBeUndefined();
  });

  it('rejects array without matching element', () => {
    expect(HasString.validate([1, 2, 3]).error).toBeDefined();
    expect(HasString.validate([]).error).toBeDefined();
  });
});

describe('minContains / maxContains', () => {
  const AtLeastTwo = schema({
    type: 'array',
    contains: { type: 'string' },
    minContains: 2,
  });

  const AtMostTwo = schema({
    type: 'array',
    contains: { type: 'string' },
    maxContains: 2,
  });

  const ExactlyTwo = schema({
    type: 'array',
    contains: { type: 'string' },
    minContains: 2,
    maxContains: 2,
  });

  const Disabled = schema({
    type: 'array',
    contains: { type: 'string' },
    minContains: 0,
  });

  it('validates minContains', () => {
    expect(AtLeastTwo.validate(['a']).error).toBeDefined();
    expect(AtLeastTwo.validate(['a', 'b']).error).toBeUndefined();
    expect(AtLeastTwo.validate(['a', 1, 'b', 2]).error).toBeUndefined();
  });

  it('validates maxContains', () => {
    expect(AtMostTwo.validate(['a', 'b']).error).toBeUndefined();
    expect(AtMostTwo.validate(['a', 'b', 'c']).error).toBeDefined();
    expect(AtMostTwo.validate([1, 2, 3]).error).toBeDefined(); // 0 matches, but minContains defaults to 1
  });

  it('validates exact count', () => {
    expect(ExactlyTwo.validate(['a']).error).toBeDefined();
    expect(ExactlyTwo.validate(['a', 'b']).error).toBeUndefined();
    expect(ExactlyTwo.validate(['a', 1, 'b']).error).toBeUndefined();
    expect(ExactlyTwo.validate(['a', 'b', 'c']).error).toBeDefined();
  });

  it('minContains: 0 disables contains validation', () => {
    expect(Disabled.validate([]).error).toBeUndefined();
    expect(Disabled.validate([1, 2, 3]).error).toBeUndefined();
    expect(Disabled.validate(['a', 'b']).error).toBeUndefined();
  });
});

// In draft 2020-12, format is annotation-only by default.
// To test format validation, we explicitly enable formatAssertion.
describe('format validators', () => {
  describe('date', () => {
    const DateSchema = schema({ type: 'string', format: 'date' }, { formatAssertion: true });

    it('accepts valid dates', () => {
      expect(DateSchema.validate('2024-01-15').error).toBeUndefined();
      expect(DateSchema.validate('2024-12-31').error).toBeUndefined();
    });

    it('rejects invalid dates', () => {
      expect(DateSchema.validate('2024-1-15').error).toBeDefined(); // not zero-padded
      expect(DateSchema.validate('2024/01/15').error).toBeDefined(); // wrong separator
      expect(DateSchema.validate('2024-01-15T10:00:00').error).toBeDefined(); // date-time
    });
  });

  describe('time', () => {
    const TimeSchema = schema({ type: 'string', format: 'time' }, { formatAssertion: true });

    it('accepts valid times', () => {
      expect(TimeSchema.validate('14:30:00Z').error).toBeUndefined();
      expect(TimeSchema.validate('14:30:00.123Z').error).toBeUndefined();
      expect(TimeSchema.validate('14:30:00+05:30').error).toBeUndefined();
      expect(TimeSchema.validate('14:30:00-08:00').error).toBeUndefined();
    });

    it('rejects invalid times', () => {
      expect(TimeSchema.validate('14:30:00').error).toBeDefined(); // missing timezone (RFC 3339 requires it)
      expect(TimeSchema.validate('14:30').error).toBeDefined(); // missing seconds
      expect(TimeSchema.validate('2:30:00Z').error).toBeDefined(); // not zero-padded
    });
  });

  describe('duration', () => {
    const DurationSchema = schema(
      { type: 'string', format: 'duration' },
      { formatAssertion: true }
    );

    it('accepts valid durations', () => {
      expect(DurationSchema.validate('P1Y').error).toBeUndefined();
      expect(DurationSchema.validate('P1M').error).toBeUndefined();
      expect(DurationSchema.validate('P1D').error).toBeUndefined();
      expect(DurationSchema.validate('PT1H').error).toBeUndefined();
      expect(DurationSchema.validate('PT1M').error).toBeUndefined();
      expect(DurationSchema.validate('PT1S').error).toBeUndefined();
      expect(DurationSchema.validate('P1Y2M3DT4H5M6S').error).toBeUndefined();
    });

    it('rejects invalid durations', () => {
      expect(DurationSchema.validate('P').error).toBeDefined(); // empty
      expect(DurationSchema.validate('PT').error).toBeDefined(); // empty time
      expect(DurationSchema.validate('1Y').error).toBeDefined(); // missing P
    });
  });

  describe('hostname', () => {
    const HostnameSchema = schema(
      { type: 'string', format: 'hostname' },
      { formatAssertion: true }
    );

    it('accepts valid hostnames', () => {
      expect(HostnameSchema.validate('example.com').error).toBeUndefined();
      expect(HostnameSchema.validate('sub.example.com').error).toBeUndefined();
      expect(HostnameSchema.validate('localhost').error).toBeUndefined();
      expect(HostnameSchema.validate('my-server').error).toBeUndefined();
    });

    it('rejects invalid hostnames', () => {
      expect(HostnameSchema.validate('-invalid.com').error).toBeDefined(); // starts with hyphen
      expect(HostnameSchema.validate('invalid-.com').error).toBeDefined(); // ends with hyphen
      expect(HostnameSchema.validate('inva lid.com').error).toBeDefined(); // space
    });
  });

  describe('json-pointer', () => {
    const JsonPointerSchema = schema(
      { type: 'string', format: 'json-pointer' },
      { formatAssertion: true }
    );

    it('accepts valid JSON pointers', () => {
      expect(JsonPointerSchema.validate('').error).toBeUndefined(); // root
      expect(JsonPointerSchema.validate('/foo').error).toBeUndefined();
      expect(JsonPointerSchema.validate('/foo/bar').error).toBeUndefined();
      expect(JsonPointerSchema.validate('/foo/0').error).toBeUndefined();
      expect(JsonPointerSchema.validate('/~0').error).toBeUndefined(); // escaped ~
      expect(JsonPointerSchema.validate('/~1').error).toBeUndefined(); // escaped /
    });

    it('rejects invalid JSON pointers', () => {
      expect(JsonPointerSchema.validate('foo').error).toBeDefined(); // missing leading /
      expect(JsonPointerSchema.validate('/~2').error).toBeDefined(); // invalid escape
    });
  });

  describe('regex', () => {
    const RegexSchema = schema({ type: 'string', format: 'regex' }, { formatAssertion: true });

    it('accepts valid regex patterns', () => {
      expect(RegexSchema.validate('^[a-z]+$').error).toBeUndefined();
      expect(RegexSchema.validate('\\d+').error).toBeUndefined();
      expect(RegexSchema.validate('.*').error).toBeUndefined();
    });

    it('rejects invalid regex patterns', () => {
      expect(RegexSchema.validate('[').error).toBeDefined(); // unclosed bracket
      expect(RegexSchema.validate('*').error).toBeDefined(); // nothing to repeat
    });
  });

  describe('formatAssertion option', () => {
    it('can disable format validation with formatAssertion: false', () => {
      const DateSchemaNoAssert = schema(
        { type: 'string', format: 'date' },
        { formatAssertion: false }
      );
      // Invalid dates pass when format assertion is disabled
      expect(DateSchemaNoAssert.validate('not-a-date').error).toBeUndefined();
      expect(DateSchemaNoAssert.validate('2024-1-15').error).toBeUndefined();
    });
  });
});

describe('annotation keywords', () => {
  it('accepts schemas with annotation keywords', () => {
    const Schema = schema({
      type: 'object',
      title: 'User',
      description: 'A user object',
      properties: {
        name: {
          type: 'string',
          default: 'Anonymous',
          examples: ['Alice', 'Bob'],
        },
        email: {
          type: 'string',
          deprecated: true,
        },
        role: {
          type: 'string',
          readOnly: true,
        },
      },
      $comment: 'Internal schema comment',
      $id: 'https://example.com/user.schema.json',
    });

    // Annotations don't affect validation
    expect(
      Schema.validate({ name: 'Alice', email: 'alice@example.com', role: 'admin' }).error
    ).toBeUndefined();
    expect(Schema.validate({}).error).toBeUndefined();
  });
});
