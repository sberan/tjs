import { createValidator } from '../dist/core/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load remotes EXACTLY like the benchmark does
const remotes = {};

// Load meta-schemas
const metaSchemaDir = path.join(__dirname, 'meta-schemas');
const metaSchemas = {
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

// Test all drafts that have "remote ref, containing refs itself"
const tests = [
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

const testData = { minLength: 1 };
const iterations = 1000;

console.log('Testing all "remote ref, containing refs itself" validators:\n');

for (const test of tests) {
  console.log(`=== ${test.name} ===`);
  try {
    const validator = createValidator(test.schema, {
      defaultMeta: test.defaultMeta,
      remotes,
    });

    console.log(`Generated code length: ${validator.toString().length} chars`);
    console.log(`validator({ minLength: 1 }): ${validator(testData)}`);

    // Warmup
    for (let i = 0; i < 100; i++) validator(testData);

    // Benchmark
    const start = performance.now();
    for (let i = 0; i < iterations; i++) validator(testData);
    const elapsed = performance.now() - start;
    const nsPerOp = (elapsed / iterations) * 1e6;

    console.log(`Performance: ${nsPerOp.toFixed(0)} ns/op`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
  console.log('');
}
