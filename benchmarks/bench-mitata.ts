/**
 * Benchmark using mitata's proper bench/run API for better warmup and stability.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { run, bench, group } from 'mitata';
import Ajv from 'ajv';
import Ajv2019 from 'ajv/dist/2019.js';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { createValidator } from '../src/core/index.js';
import type { JsonSchema } from '../src/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load meta-schemas
function loadRemotes(): Record<string, unknown> {
  const remotes: Record<string, unknown> = {};
  const metaSchemaDir = path.join(__dirname, '../src/meta-schemas');

  const metaSchemas: Record<string, string> = {
    'http://json-schema.org/draft-04/schema': path.join(metaSchemaDir, 'draft-04.json'),
    'http://json-schema.org/draft-06/schema': path.join(metaSchemaDir, 'draft-06.json'),
    'http://json-schema.org/draft-07/schema': path.join(metaSchemaDir, 'draft-07.json'),
    'https://json-schema.org/draft/2019-09/schema': path.join(metaSchemaDir, 'draft-2019-09.json'),
    'https://json-schema.org/draft/2019-09/meta/core': path.join(
      metaSchemaDir,
      'draft-2019-09/core.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/applicator': path.join(
      metaSchemaDir,
      'draft-2019-09/applicator.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/validation': path.join(
      metaSchemaDir,
      'draft-2019-09/validation.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/meta-data': path.join(
      metaSchemaDir,
      'draft-2019-09/meta-data.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/format': path.join(
      metaSchemaDir,
      'draft-2019-09/format.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/content': path.join(
      metaSchemaDir,
      'draft-2019-09/content.json'
    ),
    'https://json-schema.org/draft/2020-12/schema': path.join(metaSchemaDir, 'draft-2020-12.json'),
    'https://json-schema.org/draft/2020-12/meta/core': path.join(
      metaSchemaDir,
      'draft-2020-12/core.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/applicator': path.join(
      metaSchemaDir,
      'draft-2020-12/applicator.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/validation': path.join(
      metaSchemaDir,
      'draft-2020-12/validation.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/meta-data': path.join(
      metaSchemaDir,
      'draft-2020-12/meta-data.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/format-annotation': path.join(
      metaSchemaDir,
      'draft-2020-12/format-annotation.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/content': path.join(
      metaSchemaDir,
      'draft-2020-12/content.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/unevaluated': path.join(
      metaSchemaDir,
      'draft-2020-12/unevaluated.json'
    ),
  };

  for (const [uri, filePath] of Object.entries(metaSchemas)) {
    if (fs.existsSync(filePath)) {
      remotes[uri] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  }

  return remotes;
}

const remotes = loadRemotes();

// Create AJV instances
function createAjvInstance(draft: string): Ajv {
  const opts = { allErrors: false, strict: false, validateFormats: false };
  let ajv: Ajv;
  if (draft === 'draft2020-12') {
    ajv = new Ajv2020(opts);
  } else if (draft === 'draft2019-09') {
    ajv = new Ajv2019(opts);
  } else {
    ajv = new Ajv(opts);
  }
  addFormats(ajv);
  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }
  return ajv;
}

// Test data
const testData = { minLength: 1 };

// Define test cases
const testCases = [
  {
    name: 'draft6',
    schema: { $ref: 'http://json-schema.org/draft-06/schema#' },
    defaultMeta: 'draft6',
  },
  {
    name: 'draft7',
    schema: { $ref: 'http://json-schema.org/draft-07/schema#' },
    defaultMeta: 'draft7',
  },
  {
    name: 'draft2019-09',
    schema: {
      $schema: 'https://json-schema.org/draft/2019-09/schema',
      $ref: 'https://json-schema.org/draft/2019-09/schema',
    },
    defaultMeta: 'draft2019-09',
  },
  {
    name: 'draft2020-12',
    schema: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $ref: 'https://json-schema.org/draft/2020-12/schema',
    },
    defaultMeta: 'draft2020-12',
  },
];

console.log('Compiling validators...\n');

// Pre-compile all validators
const validators: Array<{
  name: string;
  tjs: (data: unknown) => boolean;
  ajv: (data: unknown) => boolean;
}> = [];

for (const tc of testCases) {
  try {
    const tjsValidator = createValidator(tc.schema as JsonSchema, {
      defaultMeta: tc.defaultMeta as any,
      remotes: remotes as Record<string, JsonSchema>,
    });

    const ajv = createAjvInstance(tc.defaultMeta);
    const ajvValidator = ajv.compile(tc.schema);

    validators.push({
      name: tc.name,
      tjs: tjsValidator,
      ajv: (data) => ajvValidator(data) as boolean,
    });

    console.log(`✓ ${tc.name}: tjs=${tjsValidator.toString().length} chars`);
  } catch (e: any) {
    console.log(`✗ ${tc.name}: ${e.message}`);
  }
}

console.log('\nRunning benchmarks...\n');

// Register benchmarks using mitata's bench API
group('remote ref, containing refs itself', () => {
  for (const v of validators) {
    bench(`tjs ${v.name}`, () => {
      v.tjs(testData);
    });

    bench(`ajv ${v.name}`, () => {
      v.ajv(testData);
    });
  }
});

// Run all benchmarks
await run();
