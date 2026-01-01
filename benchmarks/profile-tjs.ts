/**
 * Profile tjs validation only (no compilation, no AJV)
 *
 * Usage:
 *   node --prof benchmarks/profile-tjs.js [draft]
 *   # Then analyze with: node --prof-process isolate-*.log > profile.txt
 *
 * Or with 0x:
 *   npx 0x benchmarks/profile-tjs.js [draft]
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createValidator } from '../src/core/index.js';
import type { JsonSchema } from '../src/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

interface TestCase {
  data: unknown;
  valid: boolean;
}

interface TestGroup {
  description: string;
  schema: unknown;
  tests: TestCase[];
}

interface CompiledSuite {
  validator: (data: unknown) => boolean;
  tests: TestCase[];
}

// Load remote schemas
function loadRemoteSchemas(draft: Draft): Record<string, unknown> {
  const remotes: Record<string, unknown> = {};
  const remotesDir = path.join(__dirname, '../tests/json-schema-test-suite/remotes');

  const loadDir = (dir: string, baseUrl: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('draft')) {
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
  const draftRemotesDir = path.join(remotesDir, draft);
  if (fs.existsSync(draftRemotesDir)) {
    loadDir(draftRemotesDir, `http://localhost:1234/${draft}/`);
  }

  return remotes;
}

// Load test suites (required tests only)
function loadTestSuites(draft: Draft): TestGroup[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const suites: TestGroup[] = [];

  for (const filename of fs.readdirSync(suiteDir)) {
    if (!filename.endsWith('.json')) continue;
    const filepath = path.join(suiteDir, filename);
    if (!fs.statSync(filepath).isFile()) continue;
    const groups: TestGroup[] = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    suites.push(...groups);
  }

  return suites;
}

// Pre-compile all validators
function compileAll(draft: Draft): CompiledSuite[] {
  const remotes = loadRemoteSchemas(draft);
  const suites = loadTestSuites(draft);
  const compiled: CompiledSuite[] = [];

  for (const suite of suites) {
    try {
      const validator = createValidator(suite.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
      });
      compiled.push({ validator, tests: suite.tests });
    } catch {}
  }

  return compiled;
}

// Main
const draft: Draft = (process.argv[2] as Draft) || 'draft7';
const iterations = parseInt(process.argv[3] || '1000', 10);

console.log(`Compiling ${draft} validators...`);
const compiled = compileAll(draft);
const testCount = compiled.reduce((sum, s) => sum + s.tests.length, 0);
console.log(`Compiled ${compiled.length} validators (${testCount} tests)`);
console.log(`Running ${iterations} iterations...\n`);

// Warmup
for (let i = 0; i < 10; i++) {
  for (const suite of compiled) {
    for (const test of suite.tests) {
      suite.validator(test.data);
    }
  }
}

// Profile this part
console.log('Starting profiled run...');
const start = performance.now();

for (let i = 0; i < iterations; i++) {
  for (const suite of compiled) {
    for (const test of suite.tests) {
      suite.validator(test.data);
    }
  }
}

const elapsed = performance.now() - start;
const totalValidations = iterations * testCount;
const nsPerValidation = (elapsed * 1_000_000) / totalValidations;

console.log(
  `\nCompleted ${totalValidations.toLocaleString()} validations in ${elapsed.toFixed(0)}ms`
);
console.log(`Average: ${nsPerValidation.toFixed(1)} ns/validation`);
console.log(
  `Throughput: ${((totalValidations / elapsed) * 1000).toLocaleString()} validations/sec`
);
