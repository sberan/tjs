import type { JsonSchema } from '../../src/types.js';
import { Validator } from '../../src/validator.js';
import type { ValidatorAdapter } from '../types.js';

export const jsonSchemaTsAdapter: ValidatorAdapter = {
  name: 'json-schema-ts',
  compile(schema: unknown) {
    const validator = new Validator(schema as JsonSchema);
    return (data: unknown) => validator.validate(data);
  },
};
