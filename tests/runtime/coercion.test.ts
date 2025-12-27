import { describe, it, expect } from 'vitest';
import { schema } from '../../src/index.js';

/**
 * Tests for type coercion feature.
 * Coercion is opt-in via { coerce: true } option.
 * These tests define the expected behavior before implementation.
 */

describe.skip('coercion', () => {
  describe('disabled by default', () => {
    it('does not coerce when coerce option is not set', () => {
      const NumberSchema = schema({ type: 'number' });
      expect(NumberSchema.validate('42')).toBe(false);
      expect(NumberSchema.validate(42)).toBe(true);
    });

    it('does not coerce when coerce is explicitly false', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: false });
      expect(NumberSchema.validate('42')).toBe(false);
    });
  });

  describe('string', () => {
    const StringSchema = schema({ type: 'string' }, { coerce: true });

    it('coerces number to string', () => {
      const result = StringSchema.parse(42);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe('42');
      }
    });

    it('coerces floating point number to string', () => {
      const result = StringSchema.parse(3.14);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe('3.14');
      }
    });

    it('coerces boolean to string', () => {
      expect(StringSchema.parse(true)).toEqual({ ok: true, data: 'true' });
      expect(StringSchema.parse(false)).toEqual({ ok: true, data: 'false' });
    });

    it('does not coerce null to string', () => {
      const result = StringSchema.parse(null);
      expect(result.ok).toBe(false);
    });

    it('does not coerce undefined to string', () => {
      const result = StringSchema.parse(undefined);
      expect(result.ok).toBe(false);
    });

    it('does not coerce object to string', () => {
      const result = StringSchema.parse({ foo: 'bar' });
      expect(result.ok).toBe(false);
    });

    it('does not coerce array to string', () => {
      const result = StringSchema.parse(['a', 'b']);
      expect(result.ok).toBe(false);
    });

    it('passes through valid strings unchanged', () => {
      const result = StringSchema.parse('hello');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe('hello');
      }
    });
  });

  describe('number', () => {
    const NumberSchema = schema({ type: 'number' }, { coerce: true });

    it('coerces numeric string to number', () => {
      const result = NumberSchema.parse('42');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('coerces floating point string to number', () => {
      const result = NumberSchema.parse('3.14');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(3.14);
      }
    });

    it('coerces negative number string to number', () => {
      const result = NumberSchema.parse('-42');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(-42);
      }
    });

    it('coerces scientific notation string to number', () => {
      const result = NumberSchema.parse('1e10');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(1e10);
      }
    });

    it('trims whitespace before coercing', () => {
      const result = NumberSchema.parse('  42  ');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('does not coerce empty string to number', () => {
      const result = NumberSchema.parse('');
      expect(result.ok).toBe(false);
    });

    it('does not coerce non-numeric string to number', () => {
      const result = NumberSchema.parse('abc');
      expect(result.ok).toBe(false);
    });

    it('does not coerce boolean to number', () => {
      expect(NumberSchema.parse(true).ok).toBe(false);
      expect(NumberSchema.parse(false).ok).toBe(false);
    });

    it('does not coerce null to number', () => {
      const result = NumberSchema.parse(null);
      expect(result.ok).toBe(false);
    });

    it('passes through valid numbers unchanged', () => {
      const result = NumberSchema.parse(42);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('validates coerced number against constraints', () => {
      const ConstrainedNumber = schema(
        { type: 'number', minimum: 0, maximum: 100 },
        { coerce: true }
      );
      expect(ConstrainedNumber.parse('50').ok).toBe(true);
      expect(ConstrainedNumber.parse('150').ok).toBe(false);
      expect(ConstrainedNumber.parse('-10').ok).toBe(false);
    });
  });

  describe('integer', () => {
    const IntegerSchema = schema({ type: 'integer' }, { coerce: true });

    it('coerces integer string to integer', () => {
      const result = IntegerSchema.parse('42');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('coerces string ending in .0 to integer', () => {
      const result = IntegerSchema.parse('42.0');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('does not coerce non-integer decimal string', () => {
      const result = IntegerSchema.parse('42.5');
      expect(result.ok).toBe(false);
    });

    it('does not coerce floating point string to integer', () => {
      const result = IntegerSchema.parse('3.14');
      expect(result.ok).toBe(false);
    });

    it('passes through valid integers unchanged', () => {
      const result = IntegerSchema.parse(42);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('validates coerced integer against constraints', () => {
      const ConstrainedInt = schema({ type: 'integer', minimum: 1, maximum: 10 }, { coerce: true });
      expect(ConstrainedInt.parse('5').ok).toBe(true);
      expect(ConstrainedInt.parse('15').ok).toBe(false);
    });
  });

  describe('boolean', () => {
    const BooleanSchema = schema({ type: 'boolean' }, { coerce: true });

    it('coerces "true" string to true', () => {
      const result = BooleanSchema.parse('true');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(true);
      }
    });

    it('coerces "false" string to false', () => {
      const result = BooleanSchema.parse('false');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(false);
      }
    });

    it('coerces "TRUE" string (case-insensitive) to true', () => {
      const result = BooleanSchema.parse('TRUE');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(true);
      }
    });

    it('coerces "FALSE" string (case-insensitive) to false', () => {
      const result = BooleanSchema.parse('FALSE');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(false);
      }
    });

    it('coerces "1" string to true', () => {
      const result = BooleanSchema.parse('1');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(true);
      }
    });

    it('coerces "0" string to false', () => {
      const result = BooleanSchema.parse('0');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(false);
      }
    });

    it('coerces number 1 to true', () => {
      const result = BooleanSchema.parse(1);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(true);
      }
    });

    it('coerces number 0 to false', () => {
      const result = BooleanSchema.parse(0);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(false);
      }
    });

    it('does not coerce other strings to boolean', () => {
      expect(BooleanSchema.parse('yes').ok).toBe(false);
      expect(BooleanSchema.parse('no').ok).toBe(false);
      expect(BooleanSchema.parse('on').ok).toBe(false);
      expect(BooleanSchema.parse('off').ok).toBe(false);
    });

    it('does not coerce other numbers to boolean', () => {
      expect(BooleanSchema.parse(2).ok).toBe(false);
      expect(BooleanSchema.parse(-1).ok).toBe(false);
    });

    it('does not coerce null to boolean', () => {
      const result = BooleanSchema.parse(null);
      expect(result.ok).toBe(false);
    });

    it('passes through valid booleans unchanged', () => {
      expect(BooleanSchema.parse(true)).toEqual({ ok: true, data: true });
      expect(BooleanSchema.parse(false)).toEqual({ ok: true, data: false });
    });
  });

  describe('null', () => {
    const NullSchema = schema({ type: 'null' }, { coerce: true });

    it('coerces empty string to null', () => {
      const result = NullSchema.parse('');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(null);
      }
    });

    it('coerces "null" string to null', () => {
      const result = NullSchema.parse('null');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(null);
      }
    });

    it('does not coerce other strings to null', () => {
      expect(NullSchema.parse('undefined').ok).toBe(false);
      expect(NullSchema.parse('nil').ok).toBe(false);
    });

    it('does not coerce number to null', () => {
      expect(NullSchema.parse(0).ok).toBe(false);
    });

    it('does not coerce boolean to null', () => {
      expect(NullSchema.parse(false).ok).toBe(false);
    });

    it('passes through null unchanged', () => {
      const result = NullSchema.parse(null);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(null);
      }
    });
  });

  describe('array', () => {
    const ArraySchema = schema({ type: 'array', items: { type: 'string' } }, { coerce: true });

    it('wraps single value in array', () => {
      const result = ArraySchema.parse('foo');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(['foo']);
      }
    });

    it('wraps number in array (with item coercion)', () => {
      const result = ArraySchema.parse(42);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(['42']);
      }
    });

    it('wraps object in array', () => {
      const ObjArraySchema = schema({ type: 'array', items: { type: 'object' } }, { coerce: true });
      const result = ObjArraySchema.parse({ foo: 'bar' });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual([{ foo: 'bar' }]);
      }
    });

    it('does not coerce null to array', () => {
      const result = ArraySchema.parse(null);
      expect(result.ok).toBe(false);
    });

    it('does not coerce undefined to array', () => {
      const result = ArraySchema.parse(undefined);
      expect(result.ok).toBe(false);
    });

    it('passes through valid arrays unchanged', () => {
      const result = ArraySchema.parse(['a', 'b', 'c']);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(['a', 'b', 'c']);
      }
    });

    it('coerces array items', () => {
      const NumberArraySchema = schema(
        { type: 'array', items: { type: 'number' } },
        { coerce: true }
      );
      const result = NumberArraySchema.parse(['1', '2', '3']);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual([1, 2, 3]);
      }
    });
  });

  describe('type unions', () => {
    it('coerces to first matching type in union', () => {
      const UnionSchema = schema({ type: ['string', 'number'] }, { coerce: true });
      // Already a string - no coercion needed
      expect(UnionSchema.parse('hello')).toEqual({ ok: true, data: 'hello' });
      // Already a number - no coercion needed
      expect(UnionSchema.parse(42)).toEqual({ ok: true, data: 42 });
    });

    it('handles nullable types', () => {
      const NullableNumber = schema({ type: ['number', 'null'] }, { coerce: true });
      const result1 = NullableNumber.parse('42');
      expect(result1.ok).toBe(true);
      if (result1.ok) {
        expect(result1.data).toBe(42);
      }

      const result2 = NullableNumber.parse('');
      expect(result2.ok).toBe(true);
      if (result2.ok) {
        expect(result2.data).toBe(null);
      }
    });
  });

  describe('const and enum', () => {
    it('coerces value to match const', () => {
      const ConstSchema = schema({ const: 42 }, { coerce: true });
      const result = ConstSchema.parse('42');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('coerces value to match enum', () => {
      const EnumSchema = schema({ enum: [1, 2, 3] }, { coerce: true });
      const result = EnumSchema.parse('2');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(2);
      }
    });

    it('fails when coerced value does not match const', () => {
      const ConstSchema = schema({ const: 42 }, { coerce: true });
      const result = ConstSchema.parse('43');
      expect(result.ok).toBe(false);
    });

    it('fails when coerced value does not match enum', () => {
      const EnumSchema = schema({ enum: [1, 2, 3] }, { coerce: true });
      const result = EnumSchema.parse('5');
      expect(result.ok).toBe(false);
    });

    it('coerces boolean const', () => {
      const TrueConst = schema({ const: true }, { coerce: true });
      expect(TrueConst.parse('true')).toEqual({ ok: true, data: true });
      expect(TrueConst.parse('1')).toEqual({ ok: true, data: true });
    });

    it('coerces string enum', () => {
      const StringEnum = schema({ enum: ['a', 'b', 'c'] }, { coerce: true });
      const result = StringEnum.parse(1);
      // 1 coerces to '1', which doesn't match enum
      expect(result.ok).toBe(false);
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
      const result = UserSchema.parse({
        name: 'John',
        age: '30',
        active: 'true',
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual({
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

      const result = DeepSchema.parse({
        level1: {
          level2: {
            value: '42',
          },
        },
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual({
          level1: {
            level2: {
              value: 42,
            },
          },
        });
      }
    });

    it('coerces array items within objects', () => {
      const result = UserSchema.parse({
        name: 'John',
        age: '30',
        tags: [1, 2, 3],
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.tags).toEqual(['1', '2', '3']);
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
        const result = AllOfSchema.parse('42');
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBe(42);
        }
      });

      it('fails if coerced value does not satisfy all schemas', () => {
        const AllOfSchema = schema(
          {
            allOf: [{ type: 'number' }, { minimum: 100 }],
          },
          { coerce: true }
        );
        const result = AllOfSchema.parse('42');
        expect(result.ok).toBe(false);
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
        const result = AnyOfSchema.parse('42');
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBe(42);
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
        const result = AnyOfSchema.parse('42');
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBe(42);
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
        const result = OneOfSchema.parse('42');
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBe(42);
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
        const result = OneOfSchema.parse('42');
        expect(result.ok).toBe(false);
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

        const result1 = ConditionalSchema.parse({ type: 'number', value: '42' });
        expect(result1.ok).toBe(true);
        if (result1.ok) {
          expect(result1.data.value).toBe(42);
        }

        const result2 = ConditionalSchema.parse({ type: 'string', value: 123 });
        expect(result2.ok).toBe(true);
        if (result2.ok) {
          expect(result2.data.value).toBe('123');
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

      const result = RefSchema.parse({ count: '42' });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.count).toBe(42);
      }
    });
  });

  describe('selective coercion options', () => {
    it('only coerces specified types when using CoercionOptions', () => {
      const SelectiveSchema = schema(
        { type: 'number' },
        { coerce: { number: true, boolean: false } }
      );
      const result = SelectiveSchema.parse('42');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(42);
      }
    });

    it('does not coerce disabled types', () => {
      const SelectiveSchema = schema(
        { type: 'boolean' },
        { coerce: { number: true, boolean: false } }
      );
      const result = SelectiveSchema.parse('true');
      expect(result.ok).toBe(false);
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

      const result = NumberOnlyCoerce.parse({ count: '42', active: 'true' });
      // count should be coerced, active should fail
      expect(result.ok).toBe(false);
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
      const result = Schema.parse(input);
      expect(result.ok).toBe(true);
      // Original input should be unchanged
      expect(input.age).toBe('42');
      // Coerced data should be different
      if (result.ok) {
        expect(result.data.age).toBe(42);
      }
    });

    it('returns new array when coercing array items', () => {
      const Schema = schema({ type: 'array', items: { type: 'number' } }, { coerce: true });

      const input = ['1', '2', '3'];
      const result = Schema.parse(input);
      expect(result.ok).toBe(true);
      // Original input should be unchanged
      expect(input).toEqual(['1', '2', '3']);
      // Coerced data should be different
      if (result.ok) {
        expect(result.data).toEqual([1, 2, 3]);
      }
    });
  });

  describe('validate() method behavior', () => {
    it('validate() returns true for coercible values when coerce is enabled', () => {
      const Schema = schema({ type: 'number' }, { coerce: true });
      expect(Schema.validate('42')).toBe(true);
    });

    it('validate() acts as type guard after coercion', () => {
      const Schema = schema({ type: 'number' }, { coerce: true });
      const data: unknown = '42';
      if (Schema.validate(data)) {
        // TypeScript should allow treating data as number here
        // Note: at runtime, data is still '42', but it's coercible
        expect(true).toBe(true);
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
      const result = NumberSchema.parse('NaN');
      // NaN is technically a number, but we may want to reject it
      // This test documents the behavior - implementation decides
      expect(result.ok).toBe(false);
    });

    it('handles Infinity string', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.parse('Infinity');
      // Infinity is a valid number
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(Infinity);
      }
    });

    it('handles negative Infinity string', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.parse('-Infinity');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBe(-Infinity);
      }
    });

    it('handles whitespace-only string for number coercion', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.parse('   ');
      expect(result.ok).toBe(false);
    });

    it('handles zero string edge cases', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      expect(NumberSchema.parse('0')).toEqual({ ok: true, data: 0 });
      expect(NumberSchema.parse('-0')).toEqual({ ok: true, data: -0 });
      expect(NumberSchema.parse('+0')).toEqual({ ok: true, data: 0 });
    });

    it('handles prefixItems tuple coercion', () => {
      const TupleSchema = schema(
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        },
        { coerce: true }
      );
      const result = TupleSchema.parse([123, '42', 'true']);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(['123', 42, true]);
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
      const result = Schema.parse({ known: 123, extra: '42' });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual({ known: '123', extra: 42 });
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
      const result = Schema.parse({ num_value: '42', str_value: 123 });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual({ num_value: 42, str_value: '123' });
      }
    });
  });

  describe('error messages', () => {
    it('provides helpful error when coercion fails', () => {
      const NumberSchema = schema({ type: 'number' }, { coerce: true });
      const result = NumberSchema.parse('abc');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0].keyword).toBe('type');
        // Error message should indicate coercion was attempted
        expect(result.errors[0].message).toContain('coercion');
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
      const result = Schema.parse({ user: { age: 'not-a-number' } });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors[0].path).toBe('user.age');
      }
    });
  });
});
