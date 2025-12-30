import type { JsonSchema } from '../../src/types.js';
import { createValidator } from '../../src/core/index.js';
import type { ValidatorAdapter, Draft } from '../types.js';

export const tjsAdapter: ValidatorAdapter = {
  name: 'tjs',
  compile(schema: unknown, remotes?: Record<string, unknown>, draft?: Draft) {
    // Use legacyRef for older drafts, modern mode for draft2020-12
    const legacyRef = draft !== 'draft2020-12' && draft !== 'draft2019-09';
    const validator = createValidator(schema as JsonSchema, {
      legacyRef,
      remotes: remotes as Record<string, JsonSchema>,
      formatAssertion: false,
      coerce: false,
    });
    return validator;
  },
};
