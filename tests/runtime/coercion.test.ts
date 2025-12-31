import { describe, it, expect } from 'vitest';
import { schema } from '../../src/index.js';

/**
 * Tests for type coercion feature.
 * Coercion is opt-in via { coerce: true } option.
 * These tests define the expected behavior before implementation.
 */

describe('coercion', () => {
  describe('disabled by default', () => {
    it('does not coerce when coerce option is not set', () => {
      const NumberSchema = schema({ type: 'number' });
      expect(NumberSchema.validate('42').error).toBeDefined();
      expect(NumberSchema.validate(42).error).toBeUndefined();
    });

    it('does not coerce when coerce is explicitly false', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: false });
      expect(NumberSchema.validate('42').error).toBeDefined();
    });
  });

  describe('string', () => {
    const StringSchema = schema({ type: 'string' }, { coerce: true });

    it('coerces number to string', () => {
      const result = StringSchema.validate(42);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe('42');
      }
    });

    it('coerces floating point number to string', () => {
      const result = StringSchema.validate(3.14);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe('3.14');
      }
    });

    it('coerces boolean to string', () => {
      expect(StringSchema.validate(true)).toEqual({ valid: true, value: 'true', error: undefined });
      expect(StringSchema.validate(false)).toEqual({
        valid: true,
        value: 'false',
        error: undefined,
      });
    });

    it('does not coerce null to string', () => {
      const result = StringSchema.validate(null);
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce undefined to string', () => {
      const result = StringSchema.validate(undefined);
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce object to string', () => {
      const result = StringSchema.validate({ foo: 'bar' });
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce array to string', () => {
      const result = StringSchema.validate(['a', 'b']);
      expect(result.error === undefined).toBe(false);
    });

    it('passes through valid strings unchanged', () => {
      const result = StringSchema.validate('hello');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe('hello');
      }
    });
  });

  describe('number', () => {
    const NumberSchema = schema({ type: 'number' }, { coerce: true });

    it('coerces numeric string to number', () => {
      const result = NumberSchema.validate('42');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('coerces floating point string to number', () => {
      const result = NumberSchema.validate('3.14');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(3.14);
      }
    });

    it('coerces negative number string to number', () => {
      const result = NumberSchema.validate('-42');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(-42);
      }
    });

    it('coerces scientific notation string to number', () => {
      const result = NumberSchema.validate('1e10');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(1e10);
      }
    });

    it('trims whitespace before coercing', () => {
      const result = NumberSchema.validate('  42  ');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('does not coerce empty string to number', () => {
      const result = NumberSchema.validate('');
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce non-numeric string to number', () => {
      const result = NumberSchema.validate('abc');
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce boolean to number', () => {
      expect(NumberSchema.validate(true).error).toBeDefined();
      expect(NumberSchema.validate(false).error).toBeDefined();
    });

    it('does not coerce null to number', () => {
      const result = NumberSchema.validate(null);
      expect(result.error === undefined).toBe(false);
    });

    it('passes through valid numbers unchanged', () => {
      const result = NumberSchema.validate(42);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('validates coerced number against constraints', () => {
      const ConstrainedNumber = schema(
        { type: 'number', minimum: 0, maximum: 100 },
        { coerce: true }
      );
      expect(ConstrainedNumber.validate('50').error).toBeUndefined();
      expect(ConstrainedNumber.validate('150').error).toBeDefined();
      expect(ConstrainedNumber.validate('-10').error).toBeDefined();
    });
  });

  describe('integer', () => {
    const IntegerSchema = schema({ type: 'integer' }, { coerce: true });

    it('coerces integer string to integer', () => {
      const result = IntegerSchema.validate('42');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('coerces string ending in .0 to integer', () => {
      const result = IntegerSchema.validate('42.0');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('does not coerce non-integer decimal string', () => {
      const result = IntegerSchema.validate('42.5');
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce floating point string to integer', () => {
      const result = IntegerSchema.validate('3.14');
      expect(result.error === undefined).toBe(false);
    });

    it('passes through valid integers unchanged', () => {
      const result = IntegerSchema.validate(42);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('validates coerced integer against constraints', () => {
      const ConstrainedInt = schema({ type: 'integer', minimum: 1, maximum: 10 }, { coerce: true });
      expect(ConstrainedInt.validate('5').error).toBeUndefined();
      expect(ConstrainedInt.validate('15').error).toBeDefined();
    });
  });

  describe('boolean', () => {
    const BooleanSchema = schema({ type: 'boolean' }, { coerce: true });

    it('coerces "true" string to true', () => {
      const result = BooleanSchema.validate('true');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(true);
      }
    });

    it('coerces "false" string to false', () => {
      const result = BooleanSchema.validate('false');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(false);
      }
    });

    it('coerces "TRUE" string (case-insensitive) to true', () => {
      const result = BooleanSchema.validate('TRUE');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(true);
      }
    });

    it('coerces "FALSE" string (case-insensitive) to false', () => {
      const result = BooleanSchema.validate('FALSE');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(false);
      }
    });

    it('coerces "1" string to true', () => {
      const result = BooleanSchema.validate('1');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(true);
      }
    });

    it('coerces "0" string to false', () => {
      const result = BooleanSchema.validate('0');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(false);
      }
    });

    it('coerces number 1 to true', () => {
      const result = BooleanSchema.validate(1);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(true);
      }
    });

    it('coerces number 0 to false', () => {
      const result = BooleanSchema.validate(0);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(false);
      }
    });

    it('does not coerce other strings to boolean', () => {
      expect(BooleanSchema.validate('yes').error).toBeDefined();
      expect(BooleanSchema.validate('no').error).toBeDefined();
      expect(BooleanSchema.validate('on').error).toBeDefined();
      expect(BooleanSchema.validate('off').error).toBeDefined();
    });

    it('does not coerce other numbers to boolean', () => {
      expect(BooleanSchema.validate(2).error).toBeDefined();
      expect(BooleanSchema.validate(-1).error).toBeDefined();
    });

    it('does not coerce null to boolean', () => {
      const result = BooleanSchema.validate(null);
      expect(result.error === undefined).toBe(false);
    });

    it('passes through valid booleans unchanged', () => {
      expect(BooleanSchema.validate(true)).toEqual({ valid: true, value: true, error: undefined });
      expect(BooleanSchema.validate(false)).toEqual({
        valid: true,
        value: false,
        error: undefined,
      });
    });
  });

  describe('null', () => {
    const NullSchema = schema({ type: 'null' }, { coerce: true });

    it('coerces empty string to null', () => {
      const result = NullSchema.validate('');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(null);
      }
    });

    it('coerces "null" string to null', () => {
      const result = NullSchema.validate('null');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(null);
      }
    });

    it('does not coerce other strings to null', () => {
      expect(NullSchema.validate('undefined').error).toBeDefined();
      expect(NullSchema.validate('nil').error).toBeDefined();
    });

    it('does not coerce number to null', () => {
      expect(NullSchema.validate(0).error).toBeDefined();
    });

    it('does not coerce boolean to null', () => {
      expect(NullSchema.validate(false).error).toBeDefined();
    });

    it('passes through null unchanged', () => {
      const result = NullSchema.validate(null);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(null);
      }
    });
  });

  describe('array', () => {
    const ArraySchema = schema({ type: 'array', items: { type: 'string' } }, { coerce: true });

    it('wraps single value in array', () => {
      const result = ArraySchema.validate('foo');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual(['foo']);
      }
    });

    it('wraps number in array (with item coercion)', () => {
      const result = ArraySchema.validate(42);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual(['42']);
      }
    });

    it('wraps object in array', () => {
      const ObjArraySchema = schema({ type: 'array', items: { type: 'object' } }, { coerce: true });
      const result = ObjArraySchema.validate({ foo: 'bar' });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual([{ foo: 'bar' }]);
      }
    });

    it('does not coerce null to array', () => {
      const result = ArraySchema.validate(null);
      expect(result.error === undefined).toBe(false);
    });

    it('does not coerce undefined to array', () => {
      const result = ArraySchema.validate(undefined);
      expect(result.error === undefined).toBe(false);
    });

    it('passes through valid arrays unchanged', () => {
      const result = ArraySchema.validate(['a', 'b', 'c']);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual(['a', 'b', 'c']);
      }
    });

    it('coerces array items', () => {
      const NumberArraySchema = schema(
        { type: 'array', items: { type: 'number' } },
        { coerce: true }
      );
      const result = NumberArraySchema.validate(['1', '2', '3']);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual([1, 2, 3]);
      }
    });
  });

  describe('type unions', () => {
    it('coerces to first matching type in union', () => {
      const UnionSchema = schema({ type: ['string', 'number'] }, { coerce: true });
      // Already a string - no coercion needed
      expect(UnionSchema.validate('hello')).toEqual({
        valid: true,
        value: 'hello',
        error: undefined,
      });
      // Already a number - no coercion needed
      expect(UnionSchema.validate(42)).toEqual({ valid: true, value: 42, error: undefined });
    });

    it('handles nullable types', () => {
      const NullableNumber = schema({ type: ['number', 'null'] }, { coerce: true });
      const result1 = NullableNumber.validate('42');
      expect(result1.error === undefined).toBe(true);
      if (result1.error === undefined) {
        expect(result1.value).toBe(42);
      }

      const result2 = NullableNumber.validate('');
      expect(result2.error === undefined).toBe(true);
      if (result2.error === undefined) {
        expect(result2.value).toBe(null);
      }
    });
  });

  describe('const and enum', () => {
    it('coerces value to match const', () => {
      const ConstSchema = schema({ const: 42 }, { coerce: true });
      const result = ConstSchema.validate('42');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('coerces value to match enum', () => {
      const EnumSchema = schema({ enum: [1, 2, 3] }, { coerce: true });
      const result = EnumSchema.validate('2');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(2);
      }
    });

    it('fails when coerced value does not match const', () => {
      const ConstSchema = schema({ const: 42 }, { coerce: true });
      const result = ConstSchema.validate('43');
      expect(result.error === undefined).toBe(false);
    });

    it('fails when coerced value does not match enum', () => {
      const EnumSchema = schema({ enum: [1, 2, 3] }, { coerce: true });
      const result = EnumSchema.validate('5');
      expect(result.error === undefined).toBe(false);
    });

    it('coerces boolean const', () => {
      const TrueConst = schema({ const: true }, { coerce: true });
      expect(TrueConst.validate('true')).toEqual({ valid: true, value: true, error: undefined });
      expect(TrueConst.validate('1')).toEqual({ valid: true, value: true, error: undefined });
    });

    it('coerces string enum', () => {
      const StringEnum = schema({ enum: ['a', 'b', 'c'] }, { coerce: true });
      const result = StringEnum.validate(1);
      // 1 coerces to '1', which doesn't match enum
      expect(result.error === undefined).toBe(false);
    });
  });

  describe('nested objects', () => {
    const UserSchema = schema(
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'integer' },
          active: { type: 'boolean' },
          tags: { type: 'array', items: { type: 'string' } },
        },
        required: ['name', 'age'],
      },
      { coerce: true }
    );

    it('coerces nested properties', () => {
      const result = UserSchema.validate({
        name: 'John',
        age: '30',
        active: 'true',
      });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual({
          name: 'John',
          age: 30,
          active: true,
        });
      }
    });

    it('coerces deeply nested structures', () => {
      const DeepSchema = schema(
        {
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
                },
              },
            },
          },
        },
        { coerce: true }
      );

      const result = DeepSchema.validate({
        level1: {
          level2: {
            value: '42',
          },
        },
      });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual({
          level1: {
            level2: {
              value: 42,
            },
          },
        });
      }
    });

    it('coerces array items within objects', () => {
      const result = UserSchema.validate({
        name: 'John',
        age: '30',
        tags: [1, 2, 3],
      });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value.tags).toEqual(['1', '2', '3']);
      }
    });
  });

  describe('composition keywords', () => {
    describe('allOf', () => {
      it('coerces value satisfying all schemas', () => {
        const AllOfSchema = schema(
          {
            allOf: [{ type: 'number' }, { minimum: 0 }],
          },
          { coerce: true }
        );
        const result = AllOfSchema.validate('42');
        expect(result.error === undefined).toBe(true);
        if (result.error === undefined) {
          expect(result.value).toBe(42);
        }
      });

      it('fails if coerced value does not satisfy all schemas', () => {
        const AllOfSchema = schema(
          {
            allOf: [{ type: 'number' }, { minimum: 100 }],
          },
          { coerce: true }
        );
        const result = AllOfSchema.validate('42');
        expect(result.error === undefined).toBe(false);
      });
    });

    describe('anyOf', () => {
      it('coerces to first matching schema', () => {
        const AnyOfSchema = schema(
          {
            anyOf: [{ type: 'number' }, { type: 'boolean' }],
          },
          { coerce: true }
        );
        const result = AnyOfSchema.validate('42');
        expect(result.error === undefined).toBe(true);
        if (result.error === undefined) {
          expect(result.value).toBe(42);
        }
      });

      it('tries next schema if first coercion fails validation', () => {
        const AnyOfSchema = schema(
          {
            anyOf: [
              { type: 'number', minimum: 100 },
              { type: 'number', maximum: 50 },
            ],
          },
          { coerce: true }
        );
        const result = AnyOfSchema.validate('42');
        expect(result.error === undefined).toBe(true);
        if (result.error === undefined) {
          expect(result.value).toBe(42);
        }
      });
    });

    describe('oneOf', () => {
      it('coerces to exactly one matching schema', () => {
        const OneOfSchema = schema(
          {
            oneOf: [
              { type: 'number', minimum: 100 },
              { type: 'number', maximum: 50 },
            ],
          },
          { coerce: true }
        );
        const result = OneOfSchema.validate('42');
        expect(result.error === undefined).toBe(true);
        if (result.error === undefined) {
          expect(result.value).toBe(42);
        }
      });

      it('fails if coerced value matches multiple schemas', () => {
        const OneOfSchema = schema(
          {
            oneOf: [
              { type: 'number', minimum: 0 },
              { type: 'number', maximum: 100 },
            ],
          },
          { coerce: true }
        );
        // 42 matches both schemas after coercion
        const result = OneOfSchema.validate('42');
        expect(result.error === undefined).toBe(false);
      });
    });

    describe('if-then-else', () => {
      it('coerces based on conditional branch', () => {
        const ConditionalSchema = schema(
          {
            type: 'object',
            properties: {
              type: { type: 'string' },
              value: {},
            },
            if: {
              properties: { type: { const: 'number' } },
            },
            then: {
              properties: { value: { type: 'number' } },
            },
            else: {
              properties: { value: { type: 'string' } },
            },
          },
          { coerce: true }
        );

        const result1 = ConditionalSchema.validate({ type: 'number', value: '42' });
        expect(result1.error === undefined).toBe(true);
        if (result1.error === undefined) {
          expect(result1.value.value).toBe(42);
        }

        const result2 = ConditionalSchema.validate({ type: 'string', value: 123 });
        expect(result2.error === undefined).toBe(true);
        if (result2.error === undefined) {
          expect(result2.value.value).toBe('123');
        }
      });
    });
  });

  describe('$ref', () => {
    it('coerces values through $ref', () => {
      const RefSchema = schema(
        {
          $defs: {
            positiveInt: {
              type: 'integer',
              minimum: 0,
            },
          },
          type: 'object',
          properties: {
            count: { $ref: '#/$defs/positiveInt' },
          },
        },
        { coerce: true }
      );

      const result = RefSchema.validate({ count: '42' });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value.count).toBe(42);
      }
    });
  });

  describe('selective coercion options', () => {
    it('only coerces specified types when using CoercionOptions', () => {
      const SelectiveSchema = schema(
        { type: 'number' },
        { coerce: { number: true, boolean: false } }
      );
      const result = SelectiveSchema.validate('42');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(42);
      }
    });

    it('does not coerce disabled types', () => {
      const SelectiveSchema = schema(
        { type: 'boolean' },
        { coerce: { number: true, boolean: false } }
      );
      const result = SelectiveSchema.validate('true');
      expect(result.error === undefined).toBe(false);
    });

    it('allows granular control over coercion', () => {
      const NumberOnlyCoerce = schema(
        {
          type: 'object',
          properties: {
            count: { type: 'number' },
            active: { type: 'boolean' },
          },
        },
        { coerce: { number: true } }
      );

      const result = NumberOnlyCoerce.validate({ count: '42', active: 'true' });
      // count should be coerced, active should fail
      expect(result.error === undefined).toBe(false);
    });
  });

  describe('non-mutating behavior', () => {
    it('does not mutate the original input', () => {
      const Schema = schema(
        {
          type: 'object',
          properties: {
            age: { type: 'number' },
          },
        },
        { coerce: true }
      );

      const input = { age: '42' };
      const result = Schema.validate(input);
      expect(result.error === undefined).toBe(true);
      // Original input should be unchanged
      expect(input.age).toBe('42');
      // Coerced data should be different
      if (result.error === undefined) {
        expect(result.value.age).toBe(42);
      }
    });

    it('returns new array when coercing array items', () => {
      const Schema = schema({ type: 'array', items: { type: 'number' } }, { coerce: true });

      const input = ['1', '2', '3'];
      const result = Schema.validate(input);
      expect(result.error === undefined).toBe(true);
      // Original input should be unchanged
      expect(input).toEqual(['1', '2', '3']);
      // Coerced data should be different
      if (result.error === undefined) {
        expect(result.value).toEqual([1, 2, 3]);
      }
    });
  });

  describe('validate() method behavior', () => {
    it('validate() returns value and no error for coercible values when coerce is enabled', () => {
      const Schema = schema({ type: 'number' }, { coerce: true });
      const result = Schema.validate('42');
      expect(result.error).toBeUndefined();
      expect(result.value).toBe(42);
    });

    it('validate() returns coerced value', () => {
      const Schema = schema({ type: 'number' }, { coerce: true });
      const result = Schema.validate('42');
      if (result.error === undefined) {
        // result.value is the coerced number
        expect(result.value).toBe(42);
      }
    });
  });

  describe('assert() method behavior', () => {
    it('assert() returns coerced value', () => {
      const Schema = schema({ type: 'number' }, { coerce: true });
      const result = Schema.assert('42');
      expect(result).toBe(42);
    });

    it('assert() throws for non-coercible values', () => {
      const Schema = schema({ type: 'number' }, { coerce: true });
      expect(() => Schema.assert('abc')).toThrow();
    });
  });

  describe('edge cases', () => {
    it('handles NaN string', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.validate('NaN');
      // NaN is technically a number, but we may want to reject it
      // This test documents the behavior - implementation decides
      expect(result.error === undefined).toBe(false);
    });

    it('handles Infinity string', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.validate('Infinity');
      // Infinity is a valid number
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(Infinity);
      }
    });

    it('handles negative Infinity string', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.validate('-Infinity');
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toBe(-Infinity);
      }
    });

    it('handles whitespace-only string for number coercion', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.validate('   ');
      expect(result.error === undefined).toBe(false);
    });

    it('handles zero string edge cases', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      expect(NumberSchema.validate('0')).toEqual({ valid: true, value: 0, error: undefined });
      expect(NumberSchema.validate('-0')).toEqual({ valid: true, value: -0, error: undefined });
      expect(NumberSchema.validate('+0')).toEqual({ valid: true, value: 0, error: undefined });
    });

    it('handles prefixItems tuple coercion', () => {
      const TupleSchema = schema(
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        },
        { coerce: true }
      );
      const result = TupleSchema.validate([123, '42', 'true']);
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual(['123', 42, true]);
      }
    });

    it('handles additionalProperties coercion', () => {
      const Schema = schema(
        {
          type: 'object',
          properties: {
            known: { type: 'string' },
          },
          additionalProperties: { type: 'number' },
        },
        { coerce: true }
      );
      const result = Schema.validate({ known: 123, extra: '42' });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual({ known: '123', extra: 42 });
      }
    });

    it('handles patternProperties coercion', () => {
      const Schema = schema(
        {
          type: 'object',
          patternProperties: {
            '^num_': { type: 'number' },
            '^str_': { type: 'string' },
          },
        },
        { coerce: true }
      );
      const result = Schema.validate({ num_value: '42', str_value: 123 });
      expect(result.error === undefined).toBe(true);
      if (result.error === undefined) {
        expect(result.value).toEqual({ num_value: 42, str_value: '123' });
      }
    });
  });

  describe('error messages', () => {
    it('provides helpful error when coercion fails', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.validate('abc');
      expect(result.error === undefined).toBe(false);
      if (result.error !== undefined) {
        expect(result.error.length).toBeGreaterThan(0);
        expect(result.error[0].keyword).toBe('type');
        // Error message should indicate coercion was attempted
        expect(result.error[0].message).toContain('coercion');
      }
    });

    it('includes path in nested coercion errors', () => {
      const Schema = schema(
        {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                age: { type: 'integer' },
              },
            },
          },
        },
        { coerce: true }
      );
      const result = Schema.validate({ user: { age: 'not-a-number' } });
      expect(result.error === undefined).toBe(false);
      if (result.error !== undefined) {
        expect(result.error[0].path).toBe('user.age');
      }
    });
  });
});
