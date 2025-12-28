import type { JsonSchema } from '../../src/types.js';
import { createValidator } from '../../src/jit/index.js';
import type { ValidatorAdapter } from '../types.js';

export const jitAdapter: ValidatorAdapter = {
  name: 'json-schema-ts-jit',
  compile(schema: unknown, remotes?: Record<string, unknown>) {
    // Use legacyRef: false to support draft-2020-12 features like $dynamicRef
    const validator = createValidator(schema as JsonSchema, {
      legacyRef: false,
      remotes: remotes as Record<string, JsonSchema>,
    });
    return (data: unknown) => validator.validate(data);
  },
};
