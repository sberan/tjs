import type { JsonSchema } from '../../src/types.js';
import { ValidatorJIT } from '../../src/jit/index.js';
import type { ValidatorAdapter } from '../types.js';

export const jitAdapter: ValidatorAdapter = {
  name: 'json-schema-ts-jit',
  compile(schema: unknown) {
    const validator = new ValidatorJIT(schema as JsonSchema);
    return (data: unknown) => validator.validate(data);
  },
};
