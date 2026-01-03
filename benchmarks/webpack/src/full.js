/**
 * Full test case: uses all tjs exports including meta-schemas
 * This measures the maximum possible bundle size.
 */
import {
  schema,
  struct,
  createValidator,
  metaSchemas,
  draft04Schema,
  draft06Schema,
  draft07Schema,
} from 'tjs';

// Simple schema
const stringValidator = schema({ type: 'string' });

// Struct helper usage
const personValidator = struct({
  firstName: 'string',
  lastName: 'string',
  age: { type: 'integer', optional: true },
  email: { type: 'string', format: 'email' },
});

// Direct createValidator usage with complex schema
const complexValidator = createValidator({
  type: 'object',
  properties: {
    data: {
      anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'array', items: { type: 'string' } }],
    },
    metadata: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
  },
});

// Export everything to prevent tree-shaking
export {
  stringValidator,
  personValidator,
  complexValidator,
  metaSchemas,
  draft04Schema,
  draft06Schema,
  draft07Schema,
};

export function validateAll(str, person, complex) {
  return {
    str: stringValidator.validate(str),
    person: personValidator.validate(person),
    complex: complexValidator.validate(complex),
  };
}
