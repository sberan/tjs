/**
 * Bundled JSON Schema meta-schemas for validation
 */

import type { JsonSchema } from '../types.js';

// Import meta-schemas as JSON
import draft07 from './draft-07.json' with { type: 'json' };
import draft06 from './draft-06.json' with { type: 'json' };
import draft04 from './draft-04.json' with { type: 'json' };

/**
 * JSON Schema Draft-07 meta-schema
 */
export const draft07Schema = draft07 as JsonSchema;

/**
 * JSON Schema Draft-06 meta-schema
 */
export const draft06Schema = draft06 as JsonSchema;

/**
 * JSON Schema Draft-04 meta-schema
 */
export const draft04Schema = draft04 as JsonSchema;

/**
 * All bundled meta-schemas indexed by their canonical URIs.
 * Pass this to compile() options.remotes to enable meta-schema validation.
 */
export const metaSchemas: Record<string, JsonSchema> = {
  // Draft-07
  'http://json-schema.org/draft-07/schema': draft07Schema,
  'http://json-schema.org/draft-07/schema#': draft07Schema,
  // Draft-06
  'http://json-schema.org/draft-06/schema': draft06Schema,
  'http://json-schema.org/draft-06/schema#': draft06Schema,
  // Draft-04
  'http://json-schema.org/draft-04/schema': draft04Schema,
  'http://json-schema.org/draft-04/schema#': draft04Schema,
};

export default metaSchemas;
