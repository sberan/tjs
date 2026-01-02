/**
 * Medium test case: object schema with multiple properties
 * This represents a typical API request/response validation scenario.
 */
import { schema } from 'tjs';

const userSchema = schema({
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 0, maximum: 150 },
    active: { type: 'boolean' },
    role: { type: 'string', enum: ['admin', 'user', 'guest'] },
  },
  required: ['id', 'name', 'email'],
  additionalProperties: false,
});

export { userSchema };

export function validateUser(data) {
  return userSchema.validate(data);
}
