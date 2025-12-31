import { describe, it, expect } from 'vitest';
import { schema, struct } from '../../src/index.js';

describe('AJV-compatible .errors property', () => {
  describe('basic behavior', () => {
    it('returns null on valid data', () => {
      const validate = schema({ type: 'string' });
      validate('hello');
      expect(validate.errors).toBeNull();
    });

    it('returns error array on invalid data', () => {
      const validate = schema({ type: 'string' });
      validate(123);
      expect(validate.errors).toBeInstanceOf(Array);
      expect(validate.errors).toHaveLength(1);
    });

    it('clears errors after subsequent valid data', () => {
      const validate = schema({ type: 'string' });

      validate(123);
      expect(validate.errors).not.toBeNull();

      validate('hello');
      expect(validate.errors).toBeNull();
    });
  });

  describe('error format', () => {
    it('has AJV-compatible error structure', () => {
      const validate = schema({ type: 'string' });
      validate(123);

      const error = validate.errors?.[0];
      expect(error).toHaveProperty('instancePath');
      expect(error).toHaveProperty('schemaPath');
      expect(error).toHaveProperty('keyword');
      expect(error).toHaveProperty('params');
      expect(error).toHaveProperty('message');
    });

    it('type error has correct format', () => {
      const validate = schema({ type: 'string' });
      validate(123);

      expect(validate.errors).toEqual([
        {
          instancePath: '',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ]);
    });

    it('required error has correct format', () => {
      const validate = schema({
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
      });
      validate({});

      expect(validate.errors).toEqual([
        {
          instancePath: '/name',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'name' },
          message: "must have required property 'name'",
        },
      ]);
    });

    it('nested property error has correct instancePath', () => {
      const validate = schema({
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
            },
          },
        },
      });
      validate({ user: { name: 123 } });

      expect(validate.errors?.[0].instancePath).toBe('/user/name');
    });

    it('array item error has correct instancePath', () => {
      const validate = schema({
        type: 'array',
        items: { type: 'string' },
      });
      validate(['hello', 123, 'world']);

      expect(validate.errors?.[0].instancePath).toBe('/1');
    });
  });

  describe('different validation keywords', () => {
    it('minimum error', () => {
      const validate = schema({ type: 'number', minimum: 10 });
      validate(5);

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'minimum',
        schemaPath: '#/minimum',
        params: { comparison: '>=', limit: 10 },
      });
    });

    it('maxLength error', () => {
      const validate = schema({ type: 'string', maxLength: 5 });
      validate('too long');

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'maxLength',
        schemaPath: '#/maxLength',
        params: { limit: 5 },
      });
    });

    it('pattern error', () => {
      const validate = schema({ type: 'string', pattern: '^[a-z]+$' });
      validate('ABC');

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'pattern',
        schemaPath: '#/pattern',
        params: { pattern: '^[a-z]+$' },
      });
    });

    it('enum error', () => {
      const validate = schema({ enum: ['red', 'green', 'blue'] });
      validate('yellow');

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'enum',
        schemaPath: '#/enum',
      });
    });

    it('const error', () => {
      const validate = schema({ const: 'expected' });
      validate('actual');

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'const',
        schemaPath: '#/const',
      });
    });

    it('additionalProperties error', () => {
      const validate = schema({
        type: 'object',
        properties: { name: { type: 'string' } },
        additionalProperties: false,
      });
      validate({ name: 'test', extra: 'field' });

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'additionalProperties',
        schemaPath: '#/additionalProperties',
      });
    });

    it('minItems error', () => {
      const validate = schema({ type: 'array', minItems: 2 });
      validate([1]);

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'minItems',
        schemaPath: '#/minItems',
        params: { limit: 2 },
      });
    });

    it('uniqueItems error', () => {
      const validate = schema({ type: 'array', uniqueItems: true });
      validate([1, 2, 1]);

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'uniqueItems',
        schemaPath: '#/uniqueItems',
      });
    });
  });

  describe('struct helper', () => {
    it('struct validator also has .errors property', () => {
      const User = struct({
        name: 'string',
        age: 'number',
      });

      User({});
      expect(User.errors).toBeInstanceOf(Array);

      User({ name: 'John', age: 30 });
      expect(User.errors).toBeNull();
    });
  });

  describe('complex schemas', () => {
    it('anyOf error', () => {
      const validate = schema({
        anyOf: [{ type: 'string' }, { type: 'number' }],
      });
      validate(true);

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'anyOf',
        schemaPath: '#/anyOf',
      });
    });

    it('oneOf error', () => {
      const validate = schema({
        oneOf: [{ type: 'string' }, { type: 'number' }],
      });
      validate(true);

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'oneOf',
        schemaPath: '#/oneOf',
      });
    });

    it('not error', () => {
      const validate = schema({
        not: { type: 'string' },
      });
      validate('hello');

      expect(validate.errors?.[0]).toMatchObject({
        keyword: 'not',
        schemaPath: '#/not',
      });
    });
  });

  describe('instancePath format', () => {
    it('uses JSON Pointer format with / separator', () => {
      const validate = schema({
        type: 'object',
        properties: {
          level1: {
            type: 'object',
            properties: {
              level2: { type: 'string' },
            },
          },
        },
      });
      validate({ level1: { level2: 123 } });

      expect(validate.errors?.[0].instancePath).toBe('/level1/level2');
    });

    it('escapes special characters in property names', () => {
      const validate = schema({
        type: 'object',
        properties: {
          'prop/with/slashes': { type: 'string' },
        },
      });
      validate({ 'prop/with/slashes': 123 });

      // JSON Pointer escapes / as ~1
      expect(validate.errors?.[0].instancePath).toBe('/prop~1with~1slashes');
    });

    it('escapes tilde in property names', () => {
      const validate = schema({
        type: 'object',
        properties: {
          'prop~with~tildes': { type: 'string' },
        },
      });
      validate({ 'prop~with~tildes': 123 });

      // JSON Pointer escapes ~ as ~0
      expect(validate.errors?.[0].instancePath).toBe('/prop~0with~0tildes');
    });
  });
});
