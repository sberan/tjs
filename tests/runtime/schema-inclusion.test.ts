import { describe, it, expect } from 'vitest';
import { schema } from '../../src/index.js';

describe('Schema Inclusion', () => {
  describe('including validators in properties', () => {
    const Address = schema({
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
      required: ['street', 'city'],
    });

    const Person = schema({
      type: 'object',
      properties: {
        name: { type: 'string' },
        address: Address,
      },
      required: ['name', 'address'],
    });

    it('validates nested validators correctly', () => {
      const valid = Person.validate({
        name: 'John',
        address: { street: '123 Main', city: 'NYC' },
      });
      expect(valid.valid).toBe(true);
    });

    it('rejects invalid nested data', () => {
      const invalid = Person.validate({
        name: 'John',
        address: { street: 123, city: 'NYC' }, // street should be string
      });
      expect(invalid.valid).toBe(false);
    });

    it('exposes the schema property', () => {
      expect(Address.schema).toBeDefined();
      expect(Address.schema).toHaveProperty('type', 'object');
      expect(Address.schema).toHaveProperty('properties');
    });

    it('preserves included validators in schema property', () => {
      const personSchema = Person.schema as Record<string, unknown>;
      expect(personSchema.properties).toBeDefined();
      const props = personSchema.properties as Record<string, unknown>;
      // The validator is preserved as-is in the schema
      expect(props.address).toBe(Address);
    });
  });

  describe('including validators in array items', () => {
    const Item = schema({
      type: 'object',
      properties: { id: { type: 'number' } },
      required: ['id'],
    });

    const ItemList = schema({
      type: 'array',
      items: Item,
    });

    it('validates arrays with included validators', () => {
      const valid = ItemList.validate([{ id: 1 }, { id: 2 }]);
      expect(valid.valid).toBe(true);
    });

    it('rejects invalid array items', () => {
      const invalid = ItemList.validate([{ id: 'not a number' }]);
      expect(invalid.valid).toBe(false);
    });
  });

  describe('including validators in anyOf', () => {
    const StringType = schema({ type: 'string' });
    const NumberType = schema({ type: 'number' });

    const StringOrNumber = schema({
      anyOf: [StringType, NumberType],
    });

    it('validates either type', () => {
      expect(StringOrNumber.validate('hello').valid).toBe(true);
      expect(StringOrNumber.validate(42).valid).toBe(true);
    });

    it('rejects other types', () => {
      expect(StringOrNumber.validate(true).valid).toBe(false);
    });
  });

  describe('including validators in allOf', () => {
    const HasName = schema({
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
    });

    const HasAge = schema({
      type: 'object',
      properties: { age: { type: 'number' } },
      required: ['age'],
    });

    const Person = schema({
      allOf: [HasName, HasAge],
    });

    it('validates intersection of schemas', () => {
      const valid = Person.validate({ name: 'John', age: 30 });
      expect(valid.valid).toBe(true);
    });

    it('rejects partial data', () => {
      expect(Person.validate({ name: 'John' }).valid).toBe(false);
      expect(Person.validate({ age: 30 }).valid).toBe(false);
    });
  });

  describe('deeply nested inclusion', () => {
    const Address = schema({
      type: 'object',
      properties: { city: { type: 'string' } },
      required: ['city'],
    });

    const Employee = schema({
      type: 'object',
      properties: {
        name: { type: 'string' },
        address: Address,
      },
      required: ['name', 'address'],
    });

    const Company = schema({
      type: 'object',
      properties: {
        name: { type: 'string' },
        headquarters: Address,
        employees: {
          type: 'array',
          items: Employee,
        },
      },
      required: ['name', 'headquarters', 'employees'],
    });

    it('validates deeply nested structures', () => {
      const valid = Company.validate({
        name: 'Acme Corp',
        headquarters: { city: 'NYC' },
        employees: [
          { name: 'John', address: { city: 'LA' } },
          { name: 'Jane', address: { city: 'SF' } },
        ],
      });
      expect(valid.valid).toBe(true);
    });

    it('rejects invalid deeply nested data', () => {
      const invalid = Company.validate({
        name: 'Acme Corp',
        headquarters: { city: 'NYC' },
        employees: [
          { name: 'John', address: { city: 123 } }, // city should be string
        ],
      });
      expect(invalid.valid).toBe(false);
    });
  });
});
