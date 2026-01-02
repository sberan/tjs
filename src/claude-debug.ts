import * as fs from 'fs';
import * as path from 'path';
import { createValidator } from './core/index.js';
import type { JsonSchema } from './types.js';

const suiteDir = './tests/json-schema-test-suite/draft4';
const remotesDir = './tests/json-schema-test-suite/remotes';

// Load remotes
const remotes: Record<string, JsonSchema> = {};
function loadDir(dir: string, baseUrl: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('draft')) {
      loadDir(fullPath, baseUrl + entry.name + '/');
    } else if (entry.name.endsWith('.json')) {
      try {
        const schema = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        remotes[baseUrl + entry.name] = schema;
        if (schema.$id) remotes[schema.$id] = schema;
        if (schema.id) remotes[schema.id] = schema;
      } catch {}
    }
  }
}
loadDir(remotesDir, 'http://localhost:1234/');
loadDir(path.join(remotesDir, 'draft4'), 'http://localhost:1234/draft4/');

interface TestCase {
  data: unknown;
  valid: boolean;
  description: string;
}

interface TestGroup {
  description: string;
  schema: JsonSchema;
  tests: TestCase[];
}

// Test all files
function testFiles(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      testFiles(fullPath);
    } else if (entry.name.endsWith('.json')) {
      const groups: TestGroup[] = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      for (const group of groups) {
        try {
          const validator = createValidator(group.schema, {
            defaultMeta: 'draft4',
            remotes,
            formatAssertion: true,
          });
          for (const test of group.tests) {
            const result = validator(test.data);
            if (result !== test.valid) {
              console.log('FAILURE:', fullPath);
              console.log('  Group:', group.description);
              console.log('  Test:', test.description);
              console.log('  Expected:', test.valid, 'Got:', result);
              console.log('  Schema:', JSON.stringify(group.schema));
              console.log('  Data:', JSON.stringify(test.data));
            }
          }
        } catch (e) {
          console.log('ERROR:', fullPath, group.description, (e as Error).message);
        }
      }
    }
  }
}

testFiles(suiteDir);
console.log('Done');
