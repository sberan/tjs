import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import type { ValidatorAdapter } from '../types.js';

// Create a single AJV instance to reuse (avoids recompiling meta-schema)
// Suppress unknown format warnings with logger: false
const ajv = new Ajv2020({ allErrors: false, strict: false, logger: false });
addFormats(ajv);

export const ajvAdapter: ValidatorAdapter = {
  name: 'ajv',
  compile(schema: unknown) {
    const validate = ajv.compile(schema as object);
    return (data: unknown) => validate(data) as boolean;
  },
};
