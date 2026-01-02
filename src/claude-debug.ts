/**
 * Debug failing cross-draft compliance tests
 */

import { createValidator } from './core/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load remote schemas (same as benchmark)
function loadRemoteSchemas(): Record<string, unknown> {
  const remotes: Record<string, unknown> = {};
  const remotesDir = path.join(__dirname, '../tests/json-schema-test-suite/remotes');

  const loadDir = (dir: string, baseUrl: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const schema = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
          remotes[`${baseUrl}${entry.name}`] = schema;
          if (schema?.$id) remotes[schema.$id] = schema;
          if (schema?.id) remotes[schema.id] = schema;
        } catch {}
      }
    }
  };

  loadDir(remotesDir, 'http://localhost:1234/');
  return remotes;
}

const remotes = loadRemoteSchemas();

// Test 1: refs to future drafts (draft2019-09 -> draft2020-12)
console.log('\n=== Test 1: refs to future drafts ===');
const schema1 = {
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  type: 'array',
  $ref: 'http://localhost:1234/draft2020-12/prefixItems.json',
};
const data1_valid = ['a string', 1, 2, 3]; // First item is string - should be valid
const data1_invalid = [1, 2, 3]; // First item is not string - should be invalid

console.log('Schema:', JSON.stringify(schema1, null, 2));
console.log(
  'Remote schema:',
  JSON.stringify(remotes['http://localhost:1234/draft2020-12/prefixItems.json'], null, 2)
);
console.log('\nThe remote uses prefixItems which is draft2020-12 only.');
console.log('In draft2019-09, prefixItems does not exist, so it would be ignored.');
console.log(
  "The test expects the $ref to be processed as 2020-12 (respecting the remote's $schema).\n"
);

try {
  const validator1 = createValidator(schema1 as any, {
    defaultMeta: 'draft2019-09',
    remotes: remotes as any,
  });
  const result1_valid = validator1(data1_valid);
  const result1_invalid = validator1(data1_invalid);
  console.log('Result for ["a string", 1, 2, 3]:', result1_valid, '(expected: true)');
  console.log('Result for [1, 2, 3]:', result1_invalid, '(expected: false)');
} catch (e) {
  console.log('Error:', e);
}

// Test 2: refs to historic drafts (draft2019-09 -> draft7)
console.log('\n=== Test 2: refs to historic drafts ===');
const schema2 = {
  type: 'object',
  allOf: [
    { properties: { foo: true } },
    { $ref: 'http://localhost:1234/draft7/ignore-dependentRequired.json' },
  ],
};
const data2 = { foo: 'any value' }; // Missing 'bar' - should be valid because dependentRequired doesn't exist in draft7

console.log('Schema:', JSON.stringify(schema2, null, 2));
console.log(
  'Remote schema:',
  JSON.stringify(remotes['http://localhost:1234/draft7/ignore-dependentRequired.json'], null, 2)
);
console.log('\nThe remote uses dependentRequired which is draft2019-09+ only.');
console.log('In draft7, dependentRequired does not exist, so it should be ignored.');
console.log(
  "The test expects the $ref to be processed as draft7 (respecting the remote's $schema).\n"
);

try {
  const validator2 = createValidator(schema2 as any, {
    defaultMeta: 'draft2019-09',
    remotes: remotes as any,
  });
  const result2 = validator2(data2);
  console.log('Result for { foo: "any value" }:', result2, '(expected: true)');
} catch (e) {
  console.log('Error:', e);
}
