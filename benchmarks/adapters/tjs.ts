import type { JsonSchema } from '../../src/types.js';
import { createValidator } from '../../src/core/index.js';
import type { ValidatorAdapter, Draft } from '../types.js';

export const tjsAdapter: ValidatorAdapter = {
  name: 'tjs',
  compile(schema: unknown, remotes?: Record<string, unknown>, draft?: Draft) {
    // Auto-detect dialect settings from draft
    const validator = createValidator(schema as JsonSchema, {
      defaultMeta: draft,
      remotes: remotes as Record<string, JsonSchema>,
    });
    return validator;
  },
};
