/**
 * Bundled JSON Schema meta-schemas for validation
 */

import type { JsonSchema } from '../types.js';

// Import meta-schemas as JSON
import draft07 from './draft-07.json' with { type: 'json' };
import draft06 from './draft-06.json' with { type: 'json' };
import draft04 from './draft-04.json' with { type: 'json' };
import draft201909 from './draft-2019-09.json' with { type: 'json' };
import draft201909Core from './draft-2019-09/core.json' with { type: 'json' };
import draft201909Applicator from './draft-2019-09/applicator.json' with { type: 'json' };
import draft201909Validation from './draft-2019-09/validation.json' with { type: 'json' };
import draft201909MetaData from './draft-2019-09/meta-data.json' with { type: 'json' };
import draft201909Format from './draft-2019-09/format.json' with { type: 'json' };
import draft201909Content from './draft-2019-09/content.json' with { type: 'json' };
import draft202012 from './draft-2020-12.json' with { type: 'json' };
import draft202012Core from './draft-2020-12/core.json' with { type: 'json' };
import draft202012Applicator from './draft-2020-12/applicator.json' with { type: 'json' };
import draft202012Validation from './draft-2020-12/validation.json' with { type: 'json' };
import draft202012MetaData from './draft-2020-12/meta-data.json' with { type: 'json' };
import draft202012FormatAnnotation from './draft-2020-12/format-annotation.json' with { type: 'json' };
import draft202012Content from './draft-2020-12/content.json' with { type: 'json' };
import draft202012Unevaluated from './draft-2020-12/unevaluated.json' with { type: 'json' };

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
 * JSON Schema Draft-2019-09 meta-schema
 */
export const draft201909Schema = draft201909 as JsonSchema;

/**
 * JSON Schema Draft-2020-12 meta-schema
 */
export const draft202012Schema = draft202012 as JsonSchema;

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
  // Draft-2019-09
  'https://json-schema.org/draft/2019-09/schema': draft201909Schema,
  'https://json-schema.org/draft/2019-09/meta/core': draft201909Core as JsonSchema,
  'https://json-schema.org/draft/2019-09/meta/applicator': draft201909Applicator as JsonSchema,
  'https://json-schema.org/draft/2019-09/meta/validation': draft201909Validation as JsonSchema,
  'https://json-schema.org/draft/2019-09/meta/meta-data': draft201909MetaData as JsonSchema,
  'https://json-schema.org/draft/2019-09/meta/format': draft201909Format as JsonSchema,
  'https://json-schema.org/draft/2019-09/meta/content': draft201909Content as JsonSchema,
  // Draft-2020-12
  'https://json-schema.org/draft/2020-12/schema': draft202012Schema,
  'https://json-schema.org/draft/2020-12/meta/core': draft202012Core as JsonSchema,
  'https://json-schema.org/draft/2020-12/meta/applicator': draft202012Applicator as JsonSchema,
  'https://json-schema.org/draft/2020-12/meta/validation': draft202012Validation as JsonSchema,
  'https://json-schema.org/draft/2020-12/meta/meta-data': draft202012MetaData as JsonSchema,
  'https://json-schema.org/draft/2020-12/meta/format-annotation': draft202012FormatAnnotation as JsonSchema,
  'https://json-schema.org/draft/2020-12/meta/content': draft202012Content as JsonSchema,
  'https://json-schema.org/draft/2020-12/meta/unevaluated': draft202012Unevaluated as JsonSchema,
};

export default metaSchemas;
