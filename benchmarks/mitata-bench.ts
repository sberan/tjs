/**
 * Mitata-based benchmark for tjs vs AJV
 *
 * Mitata provides better statistical analysis than benchmark.js:
 * - Automatic warmup
 * - CPU frequency scaling detection
 * - Lower overhead
 * - Cleaner output
 */

import { run, bench, group } from 'mitata';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { createValidator } from '../src/core/index.js';
import type { JsonSchema } from '../src/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2020-12';

interface TestCase {
  data: unknown;
  valid: boolean;
  description: string;
}

interface TestGroup {
  description: string;
  schema: unknown;
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

// Load test suites (required tests only for speed)
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

// Compile validators
interface CompiledSuite {
  description: string;
  tests: TestCase[];
  tjs: (data: unknown) => boolean;
  ajv: (data: unknown) => boolean;
}

function compileSuites(draft: Draft): CompiledSuite[] {
  const remotes = loadRemoteSchemas(draft);
  const suites = loadTestSuites(draft);
  const compiled: CompiledSuite[] = [];

  const ajv = new Ajv({ allErrors: false, logger: false });
  addFormats(ajv);
  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }

  for (const suite of suites) {
    try {
      const tjsValidator = createValidator(suite.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
      });
      const ajvValidator = ajv.compile(suite.schema as object);

      // Only include if both pass all tests (fair comparison)
      let allPass = true;
      for (const test of suite.tests) {
        const tjsResult = tjsValidator(test.data);
        const ajvResult = ajvValidator(test.data) as boolean;
        if (tjsResult !== test.valid || ajvResult !== test.valid) {
          allPass = false;
          break;
        }
      }

      if (allPass) {
        compiled.push({
          description: suite.description,
          tests: suite.tests,
          tjs: tjsValidator,
          ajv: (data) => ajvValidator(data) as boolean,
        });
      }
    } catch {}
  }

  return compiled;
}

// Main benchmark
async function main() {
  const draft: Draft = (process.argv[2] as Draft) || 'draft7';
  console.log(`\nCompiling ${draft} test suites...`);

  const suites = compileSuites(draft);
  const testCount = suites.reduce((sum, s) => sum + s.tests.length, 0);
  console.log(`Compiled ${suites.length} schemas (${testCount} tests)\n`);

  // Benchmark all tests together (like our current approach)
  group(`All ${draft} tests (${testCount} tests)`, () => {
    bench('tjs', () => {
      for (const suite of suites) {
        for (const test of suite.tests) {
          suite.tjs(test.data);
        }
      }
    });

    bench('ajv', () => {
      for (const suite of suites) {
        for (const test of suite.tests) {
          suite.ajv(test.data);
        }
      }
    });
  });

  // Also benchmark individual categories for insight
  const categories = new Map<string, CompiledSuite[]>();
  for (const suite of suites) {
    const cat = suite.description.split(' ')[0].toLowerCase();
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(suite);
  }

  // Pick top 5 largest categories
  const topCategories = [...categories.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  for (const [cat, catSuites] of topCategories) {
    const catTests = catSuites.reduce((sum, s) => sum + s.tests.length, 0);
    group(`${cat} (${catTests} tests)`, () => {
      bench('tjs', () => {
        for (const suite of catSuites) {
          for (const test of suite.tests) {
            suite.tjs(test.data);
          }
        }
      });

      bench('ajv', () => {
        for (const suite of catSuites) {
          for (const test of suite.tests) {
            suite.ajv(test.data);
          }
        }
      });
    });
  }

  await run({
    silent: false,
    avg: true,
    json: false,
    colors: true,
    min_max: true,
    percentiles: true,
  });
}

main().catch(console.error);
