import { describe, it, expect } from 'vitest';
import { schema } from '../../src/index.js';

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
    expect(MinProps.validate({})).toBe(false);
    expect(MinProps.validate({ a: 1 })).toBe(false);
    expect(MinProps.validate({ a: 1, b: 2 })).toBe(true);
    expect(MinProps.validate({ a: 1, b: 2, c: 3 })).toBe(true);
  });

  it('validates maxProperties', () => {
    expect(MaxProps.validate({})).toBe(true);
    expect(MaxProps.validate({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(MaxProps.validate({ a: 1, b: 2, c: 3, d: 4 })).toBe(false);
  });

  it('validates both min and max', () => {
    expect(BothProps.validate({})).toBe(false);
    expect(BothProps.validate({ a: 1 })).toBe(true);
    expect(BothProps.validate({ a: 1, b: 2 })).toBe(true);
    expect(BothProps.validate({ a: 1, b: 2, c: 3 })).toBe(false);
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
    expect(DepReq.validate({})).toBe(true);
    expect(DepReq.validate({ bar: 1 })).toBe(true);
  });

  it('passes when trigger and all dependents are present', () => {
    expect(DepReq.validate({ foo: 'x', bar: 1, baz: true })).toBe(true);
  });

  it('fails when trigger is present but dependents are missing', () => {
    expect(DepReq.validate({ foo: 'x' })).toBe(false);
    expect(DepReq.validate({ foo: 'x', bar: 1 })).toBe(false);
    expect(DepReq.validate({ foo: 'x', baz: true })).toBe(false);
  });

  it('returns correct error messages', () => {
    const result = DepReq.parse({ foo: 'x' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBe(2);
      expect(result.errors.some((e) => e.keyword === 'dependentRequired' && e.path === 'bar')).toBe(
        true
      );
      expect(result.errors.some((e) => e.keyword === 'dependentRequired' && e.path === 'baz')).toBe(
        true
      );
    }
  });
});

describe('contains', () => {
  const HasString = schema({
    type: 'array',
    contains: { type: 'string' },
  });

  it('validates array with matching element', () => {
    expect(HasString.validate([1, 'hello', 3])).toBe(true);
    expect(HasString.validate(['a'])).toBe(true);
  });

  it('rejects array without matching element', () => {
    expect(HasString.validate([1, 2, 3])).toBe(false);
    expect(HasString.validate([])).toBe(false);
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
    expect(AtLeastTwo.validate(['a'])).toBe(false);
    expect(AtLeastTwo.validate(['a', 'b'])).toBe(true);
    expect(AtLeastTwo.validate(['a', 1, 'b', 2])).toBe(true);
  });

  it('validates maxContains', () => {
    expect(AtMostTwo.validate(['a', 'b'])).toBe(true);
    expect(AtMostTwo.validate(['a', 'b', 'c'])).toBe(false);
    expect(AtMostTwo.validate([1, 2, 3])).toBe(false); // 0 matches, but minContains defaults to 1
  });

  it('validates exact count', () => {
    expect(ExactlyTwo.validate(['a'])).toBe(false);
    expect(ExactlyTwo.validate(['a', 'b'])).toBe(true);
    expect(ExactlyTwo.validate(['a', 1, 'b'])).toBe(true);
    expect(ExactlyTwo.validate(['a', 'b', 'c'])).toBe(false);
  });

  it('minContains: 0 disables contains validation', () => {
    expect(Disabled.validate([])).toBe(true);
    expect(Disabled.validate([1, 2, 3])).toBe(true);
    expect(Disabled.validate(['a', 'b'])).toBe(true);
  });
});

describe('format validators', () => {
  describe('date', () => {
    const DateSchema = schema({ type: 'string', format: 'date' });

    it('accepts valid dates', () => {
      expect(DateSchema.validate('2024-01-15')).toBe(true);
      expect(DateSchema.validate('2024-12-31')).toBe(true);
    });

    it('rejects invalid dates', () => {
      expect(DateSchema.validate('2024-1-15')).toBe(false); // not zero-padded
      expect(DateSchema.validate('2024/01/15')).toBe(false); // wrong separator
      expect(DateSchema.validate('2024-01-15T10:00:00')).toBe(false); // date-time
    });
  });

  describe('time', () => {
    const TimeSchema = schema({ type: 'string', format: 'time' });

    it('accepts valid times', () => {
      expect(TimeSchema.validate('14:30:00')).toBe(true);
      expect(TimeSchema.validate('14:30:00Z')).toBe(true);
      expect(TimeSchema.validate('14:30:00.123')).toBe(true);
      expect(TimeSchema.validate('14:30:00+05:30')).toBe(true);
    });

    it('rejects invalid times', () => {
      expect(TimeSchema.validate('14:30')).toBe(false); // missing seconds
      expect(TimeSchema.validate('2:30:00')).toBe(false); // not zero-padded
    });
  });

  describe('duration', () => {
    const DurationSchema = schema({ type: 'string', format: 'duration' });

    it('accepts valid durations', () => {
      expect(DurationSchema.validate('P1Y')).toBe(true);
      expect(DurationSchema.validate('P1M')).toBe(true);
      expect(DurationSchema.validate('P1D')).toBe(true);
      expect(DurationSchema.validate('PT1H')).toBe(true);
      expect(DurationSchema.validate('PT1M')).toBe(true);
      expect(DurationSchema.validate('PT1S')).toBe(true);
      expect(DurationSchema.validate('P1Y2M3DT4H5M6S')).toBe(true);
    });

    it('rejects invalid durations', () => {
      expect(DurationSchema.validate('P')).toBe(false); // empty
      expect(DurationSchema.validate('PT')).toBe(false); // empty time
      expect(DurationSchema.validate('1Y')).toBe(false); // missing P
    });
  });

  describe('hostname', () => {
    const HostnameSchema = schema({ type: 'string', format: 'hostname' });

    it('accepts valid hostnames', () => {
      expect(HostnameSchema.validate('example.com')).toBe(true);
      expect(HostnameSchema.validate('sub.example.com')).toBe(true);
      expect(HostnameSchema.validate('localhost')).toBe(true);
      expect(HostnameSchema.validate('my-server')).toBe(true);
    });

    it('rejects invalid hostnames', () => {
      expect(HostnameSchema.validate('-invalid.com')).toBe(false); // starts with hyphen
      expect(HostnameSchema.validate('invalid-.com')).toBe(false); // ends with hyphen
      expect(HostnameSchema.validate('inva lid.com')).toBe(false); // space
    });
  });

  describe('json-pointer', () => {
    const JsonPointerSchema = schema({ type: 'string', format: 'json-pointer' });

    it('accepts valid JSON pointers', () => {
      expect(JsonPointerSchema.validate('')).toBe(true); // root
      expect(JsonPointerSchema.validate('/foo')).toBe(true);
      expect(JsonPointerSchema.validate('/foo/bar')).toBe(true);
      expect(JsonPointerSchema.validate('/foo/0')).toBe(true);
      expect(JsonPointerSchema.validate('/~0')).toBe(true); // escaped ~
      expect(JsonPointerSchema.validate('/~1')).toBe(true); // escaped /
    });

    it('rejects invalid JSON pointers', () => {
      expect(JsonPointerSchema.validate('foo')).toBe(false); // missing leading /
      expect(JsonPointerSchema.validate('/~2')).toBe(false); // invalid escape
    });
  });

  describe('regex', () => {
    const RegexSchema = schema({ type: 'string', format: 'regex' });

    it('accepts valid regex patterns', () => {
      expect(RegexSchema.validate('^[a-z]+$')).toBe(true);
      expect(RegexSchema.validate('\\d+')).toBe(true);
      expect(RegexSchema.validate('.*')).toBe(true);
    });

    it('rejects invalid regex patterns', () => {
      expect(RegexSchema.validate('[')).toBe(false); // unclosed bracket
      expect(RegexSchema.validate('*')).toBe(false); // nothing to repeat
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
    expect(Schema.validate({ name: 'Alice', email: 'alice@example.com', role: 'admin' })).toBe(
      true
    );
    expect(Schema.validate({})).toBe(true);
  });
});
