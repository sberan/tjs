import Ajv from 'ajv';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import type { ValidatorAdapter, Draft } from '../types.js';

// Create AJV instances for each draft (reuse to avoid recompiling meta-schemas)
const ajvInstances: Record<string, Ajv> = {};
const addedRemotes: Record<string, Set<string>> = {};

function getAjv(draft: Draft): Ajv {
  if (!ajvInstances[draft]) {
    // Use Ajv2020 for modern drafts, regular Ajv for older drafts
    // Note: We use strict: true (default) so ajv throws on unknown formats
    // like iri, iri-reference, idn-email, idn-hostname that ajv-formats
    // doesn't support. This prevents misleading benchmarks where ajv
    // appears fast but isn't actually validating.
    if (draft === 'draft2020-12') {
      ajvInstances[draft] = new Ajv2020({ allErrors: false, logger: false });
    } else {
      ajvInstances[draft] = new Ajv({ allErrors: false, logger: false });
    }
    addFormats(ajvInstances[draft]);
    addedRemotes[draft] = new Set();
  }
  return ajvInstances[draft];
}

export const ajvAdapter: ValidatorAdapter = {
  name: 'ajv',
  compile(schema: unknown, remotes?: Record<string, unknown>, draft: Draft = 'draft2020-12') {
    const ajv = getAjv(draft);
    const added = addedRemotes[draft];

    // Add remotes that haven't been added yet
    if (remotes) {
      for (const [uri, remoteSchema] of Object.entries(remotes)) {
        if (!added.has(uri)) {
          try {
            ajv.addSchema(remoteSchema as object, uri);
            added.add(uri);
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
