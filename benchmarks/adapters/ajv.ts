import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import type { ValidatorAdapter } from '../types.js';

// Create a single AJV instance to reuse (avoids recompiling meta-schema)
// Suppress unknown format warnings with logger: false
const ajv = new Ajv2020({ allErrors: false, strict: false, logger: false });
addFormats(ajv);

// Track which remotes have been added
const addedRemotes = new Set<string>();

export const ajvAdapter: ValidatorAdapter = {
  name: 'ajv',
  compile(schema: unknown, remotes?: Record<string, unknown>) {
    // Add remotes that haven't been added yet
    if (remotes) {
      for (const [uri, remoteSchema] of Object.entries(remotes)) {
        if (!addedRemotes.has(uri)) {
          try {
            ajv.addSchema(remoteSchema as object, uri);
            addedRemotes.add(uri);
          } catch {
            // Schema might already be added or invalid
          }
        }
      }
    }
    const validate = ajv.compile(schema as object);
    return (data: unknown) => validate(data) as boolean;
  },
};
