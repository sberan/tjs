/**
 * Compare tjs vs ajv performance using the benchmark library.
 *
 * Strategy from json-schema-benchmark (ebdrup):
 * - Pre-compile ALL validators for ALL schemas
 * - Run ALL tests in ONE benchmark iteration
 * - Uses benchmark.js for statistical accuracy
 * - Tracks compliance (pass/fail) for each validator
 * - Shows top 10 slowest tests by absolute ops/s difference
 *
 * Usage:
 *   npm run bench:compare [drafts...] [--filter <regex>]
 *
 * Examples:
 *   npm run bench:compare draft7 --filter idn       # Only idn-* formats
 *   npm run bench:compare --filter "hostname|email" # hostname or email
 *   npm run bench:compare:all --filter uri          # All drafts, uri formats
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Benchmark from 'benchmark';
import Ajv from 'ajv';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { createValidator } from '../src/core/index.js';
import type { JsonSchema } from '../src/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

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

interface CompiledTestSuite {
  description: string;
  schema: unknown;
  tests: TestCase[];
  tjsValidator: ((data: unknown) => boolean) | null;
  ajvValidator: ((data: unknown) => boolean) | null;
}

interface DraftResult {
  draft: string;
  tjsHz: number;
  ajvHz: number;
  tjsRme: number;
  ajvRme: number;
  testCount: number;
  tjsPass: number;
  tjsFail: number;
  ajvPass: number;
  ajvFail: number;
}

interface SuitePerf {
  description: string;
  draft: string;
  tjsOps: number;
  ajvOps: number;
  diff: number;
}

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

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

// Load all test suites for a draft (including optional tests)
function loadTestSuites(draft: Draft, includeOptional: boolean = true): TestGroup[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const suites: TestGroup[] = [];

  const loadDir = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        loadDir(fullPath);
      } else if (entry.name.endsWith('.json')) {
        const groups: TestGroup[] = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        suites.push(...groups);
      }
    }
  };

  // Load required tests
  for (const filename of fs.readdirSync(suiteDir)) {
    if (!filename.endsWith('.json')) continue;
    const filepath = path.join(suiteDir, filename);
    if (!fs.statSync(filepath).isFile()) continue;

    const groups: TestGroup[] = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    suites.push(...groups);
  }

  // Load optional tests (including format tests)
  if (includeOptional) {
    const optionalDir = path.join(suiteDir, 'optional');
    if (fs.existsSync(optionalDir)) {
      loadDir(optionalDir);
    }
  }

  return suites;
}

// Create AJV instance with format validation enabled
function createAjv(draft: Draft, remotes: Record<string, unknown>): Ajv {
  const ajv =
    draft === 'draft2020-12'
      ? new Ajv2020({ allErrors: false, strict: false, logger: false })
      : new Ajv({ allErrors: false, strict: false, logger: false });

  addFormats(ajv);

  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }

  return ajv;
}

// Pre-compile all test suites for both validators
function compileTestSuites(
  testSuites: TestGroup[],
  draft: Draft,
  remotes: Record<string, unknown>
): CompiledTestSuite[] {
  const ajv = createAjv(draft, remotes);
  const legacyRef = draft !== 'draft2020-12' && draft !== 'draft2019-09';

  return testSuites.map((suite) => {
    let tjsValidator: ((data: unknown) => boolean) | null = null;
    let ajvValidator: ((data: unknown) => boolean) | null = null;

    try {
      tjsValidator = createValidator(suite.schema as JsonSchema, {
        legacyRef,
        remotes: remotes as Record<string, JsonSchema>,
        formatAssertion: true,
        coerce: false,
      });
    } catch {}

    try {
      const fn = ajv.compile(suite.schema as object);
      ajvValidator = (data: unknown) => fn(data) as boolean;
    } catch {}

    return {
      description: suite.description,
      schema: suite.schema,
      tests: suite.tests,
      tjsValidator,
      ajvValidator,
    };
  });
}

// Check compliance for a validator
function checkCompliance(
  compiled: CompiledTestSuite[],
  getValidator: (s: CompiledTestSuite) => ((data: unknown) => boolean) | null
): { pass: number; fail: number } {
  let pass = 0;
  let fail = 0;

  for (const suite of compiled) {
    const validator = getValidator(suite);
    if (!validator) {
      fail += suite.tests.length;
      continue;
    }

    for (const test of suite.tests) {
      try {
        const result = validator(test.data);
        if (result === test.valid) {
          pass++;
        } else {
          fail++;
        }
      } catch {
        fail++;
      }
    }
  }

  return { pass, fail };
}

// Quick benchmark a single validator (simple timing, not benchmark.js)
function quickBench(
  validate: (data: unknown) => boolean,
  tests: TestCase[],
  iterations: number = 10000
): number {
  // Warmup
  for (let i = 0; i < 5; i++) {
    for (const test of tests) {
      validate(test.data);
    }
  }

  // Timed run
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    for (const test of tests) {
      validate(test.data);
    }
  }
  const duration = performance.now() - start;
  return Math.round(((iterations * tests.length) / duration) * 1000);
}

// Benchmark individual suites to find slowest ones
function benchmarkIndividualSuites(validSuites: CompiledTestSuite[], draft: string): SuitePerf[] {
  const results: SuitePerf[] = [];

  for (const suite of validSuites) {
    const tjsOps = quickBench(suite.tjsValidator!, suite.tests);
    const ajvOps = quickBench(suite.ajvValidator!, suite.tests);
    const diff = tjsOps - ajvOps;

    results.push({
      description: suite.description,
      draft,
      tjsOps,
      ajvOps,
      diff,
    });
  }

  return results;
}

// Run benchmark for a draft
function runBenchmark(
  draft: Draft,
  allSuitePerfs: SuitePerf[],
  filter: RegExp | null = null
): Promise<DraftResult> {
  return new Promise((resolve) => {
    console.log(`\nLoading ${draft}...`);
    const remotes = loadRemoteSchemas(draft);
    let testSuites = loadTestSuites(draft);

    // Apply filter if provided
    if (filter) {
      testSuites = testSuites.filter((s) => filter.test(s.description));
      console.log(`Filtered to ${testSuites.length} schemas matching ${filter}`);
    }

    console.log(`Compiling ${testSuites.length} schemas...`);
    const compiled = compileTestSuites(testSuites, draft, remotes);

    // Check compliance for both validators
    const tjsCompliance = checkCompliance(compiled, (s) => s.tjsValidator);
    const ajvCompliance = checkCompliance(compiled, (s) => s.ajvValidator);

    console.log(
      `  tjs compliance: ${tjsCompliance.pass}/${tjsCompliance.pass + tjsCompliance.fail} (${tjsCompliance.fail} failures)`
    );
    console.log(
      `  ajv compliance: ${ajvCompliance.pass}/${ajvCompliance.pass + ajvCompliance.fail} (${ajvCompliance.fail} failures)`
    );

    // Filter to test suites where both validators compiled successfully
    const compiledSuites = compiled.filter((s) => s.tjsValidator && s.ajvValidator);

    // Pre-test to filter out schemas that cause stack overflow or runtime errors
    const validSuites: CompiledTestSuite[] = [];
    for (const suite of compiledSuites) {
      let safe = true;
      for (const test of suite.tests) {
        try {
          suite.tjsValidator!(test.data);
          suite.ajvValidator!(test.data);
        } catch {
          safe = false;
          break;
        }
      }
      if (safe) {
        validSuites.push(suite);
      }
    }

    const testCount = validSuites.reduce((sum, s) => sum + s.tests.length, 0);

    // Benchmark individual suites
    console.log(`  Benchmarking ${validSuites.length} individual schemas...`);
    const suitePerfs = benchmarkIndividualSuites(validSuites, draft);
    allSuitePerfs.push(...suitePerfs);

    console.log(
      `Running overall benchmark on ${validSuites.length} schemas (${testCount} tests)...`
    );

    let tjsHz = 0;
    let ajvHz = 0;
    let tjsRme = 0;
    let ajvRme = 0;

    const suite = new Benchmark.Suite();

    // Add tjs benchmark - runs ALL tests in one iteration
    suite.add('tjs', () => {
      for (const testSuite of validSuites) {
        for (const test of testSuite.tests) {
          testSuite.tjsValidator!(test.data);
        }
      }
    });

    // Add ajv benchmark - runs ALL tests in one iteration
    suite.add('ajv', () => {
      for (const testSuite of validSuites) {
        for (const test of testSuite.tests) {
          testSuite.ajvValidator!(test.data);
        }
      }
    });

    suite.on('cycle', (event: Benchmark.Event) => {
      const bench = event.target;
      console.log(`  ${String(bench)}`);
      if (bench.name === 'tjs') {
        tjsHz = bench.hz ?? 0;
        tjsRme = bench.stats?.rme ?? 0;
      } else if (bench.name === 'ajv') {
        ajvHz = bench.hz ?? 0;
        ajvRme = bench.stats?.rme ?? 0;
      }
    });

    suite.on('error', (event: Benchmark.Event) => {
      console.error(`  Error in ${event.target.name}: ${(event.target as any).error}`);
    });

    suite.on('complete', function (this: Benchmark.Suite) {
      const fastest = this.filter('fastest').map('name');
      console.log(`  Fastest: ${fastest}`);
      resolve({
        draft,
        tjsHz,
        ajvHz,
        tjsRme,
        ajvRme,
        testCount,
        tjsPass: tjsCompliance.pass,
        tjsFail: tjsCompliance.fail,
        ajvPass: ajvCompliance.pass,
        ajvFail: ajvCompliance.fail,
      });
    });

    suite.run({ async: false });
  });
}

function formatHz(n: number): string {
  return Math.round(n).toLocaleString();
}

function formatOps(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--filter' || arg === '-f') {
      const pattern = args[++i];
      if (pattern) {
        filter = new RegExp(pattern, 'i');
      }
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }
  if (drafts.length === 0) drafts.push('draft2020-12');

  console.log('tjs vs ajv Benchmark Comparison');
  if (filter) {
    console.log(`Filter: ${filter}`);
  }
  console.log('='.repeat(100));

  const results: DraftResult[] = [];
  const allSuitePerfs: SuitePerf[] = [];

  for (const draft of drafts) {
    const result = await runBenchmark(draft, allSuitePerfs, filter);
    results.push(result);
  }

  // Compute totals
  const totalTests = results.reduce((sum, r) => sum + r.testCount, 0);
  const totalTjsPass = results.reduce((sum, r) => sum + r.tjsPass, 0);
  const totalTjsFail = results.reduce((sum, r) => sum + r.tjsFail, 0);
  const totalAjvPass = results.reduce((sum, r) => sum + r.ajvPass, 0);
  const totalAjvFail = results.reduce((sum, r) => sum + r.ajvFail, 0);

  // Weighted ops/s
  const weightedTjs = results.reduce((sum, r) => sum + r.tjsHz * r.testCount, 0) / totalTests;
  const weightedAjv = results.reduce((sum, r) => sum + r.ajvHz * r.testCount, 0) / totalTests;
  const overallDiff =
    weightedAjv > 0 ? Math.round(((weightedTjs - weightedAjv) / weightedAjv) * 100) : 0;

  // Summary table
  console.log('\n' + '='.repeat(100));
  console.log('Performance Summary');
  console.log('─'.repeat(100));
  console.log(
    'Draft'.padEnd(14) +
      'Tests'.padStart(6) +
      ' │' +
      'tjs ops/s'.padStart(11) +
      'ajv ops/s'.padStart(11) +
      'Diff'.padStart(8) +
      ' │' +
      'tjs pass'.padStart(10) +
      'tjs fail'.padStart(10) +
      'ajv pass'.padStart(10) +
      'ajv fail'.padStart(10)
  );
  console.log('─'.repeat(100));

  for (const r of results) {
    const diff = r.ajvHz > 0 ? Math.round(((r.tjsHz - r.ajvHz) / r.ajvHz) * 100) : 0;
    const color = diff >= 0 ? GREEN : RED;
    const sign = diff >= 0 ? '+' : '';

    const tjsFailColor = r.tjsFail > 0 ? RED : DIM;
    const ajvFailColor = r.ajvFail > 0 ? RED : DIM;

    console.log(
      r.draft.padEnd(14) +
        r.testCount.toString().padStart(6) +
        ' │' +
        formatHz(r.tjsHz).padStart(11) +
        formatHz(r.ajvHz).padStart(11) +
        `${color}${sign}${diff}%${RESET}`.padStart(17) +
        ' │' +
        `${GREEN}${r.tjsPass}${RESET}`.padStart(19) +
        `${tjsFailColor}${r.tjsFail}${RESET}`.padStart(19) +
        `${GREEN}${r.ajvPass}${RESET}`.padStart(19) +
        `${ajvFailColor}${r.ajvFail}${RESET}`.padStart(19)
    );
  }

  // Overall row
  console.log('─'.repeat(100));
  const totalColor = overallDiff >= 0 ? GREEN : RED;
  const totalSign = overallDiff >= 0 ? '+' : '';
  const tjsTotalFailColor = totalTjsFail > 0 ? RED : DIM;
  const ajvTotalFailColor = totalAjvFail > 0 ? RED : DIM;

  console.log(
    'TOTAL'.padEnd(14) +
      totalTests.toString().padStart(6) +
      ' │' +
      formatHz(weightedTjs).padStart(11) +
      formatHz(weightedAjv).padStart(11) +
      `${totalColor}${totalSign}${overallDiff}%${RESET}`.padStart(17) +
      ' │' +
      `${GREEN}${totalTjsPass}${RESET}`.padStart(19) +
      `${tjsTotalFailColor}${totalTjsFail}${RESET}`.padStart(19) +
      `${GREEN}${totalAjvPass}${RESET}`.padStart(19) +
      `${ajvTotalFailColor}${totalAjvFail}${RESET}`.padStart(19)
  );
  console.log('─'.repeat(100));

  // Top 10 slowest tests (where tjs is slowest compared to ajv)
  const slowest = [...allSuitePerfs]
    .filter((s) => s.diff < 0)
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 10);

  if (slowest.length > 0) {
    console.log('\nTop 10 Slowest Tests (tjs vs ajv by absolute ops/s difference)');
    console.log('─'.repeat(100));
    console.log(
      'Draft'.padEnd(14) +
        'Test'.padEnd(50) +
        'tjs ops/s'.padStart(12) +
        'ajv ops/s'.padStart(12) +
        'diff'.padStart(12)
    );
    console.log('─'.repeat(100));

    for (const s of slowest) {
      const name = s.description.length > 48 ? s.description.slice(0, 45) + '...' : s.description;
      console.log(
        s.draft.padEnd(14) +
          name.padEnd(50) +
          formatOps(s.tjsOps).padStart(12) +
          formatOps(s.ajvOps).padStart(12) +
          `${RED}${formatOps(s.diff)}${RESET}`.padStart(21)
      );
    }
    console.log('─'.repeat(100));
  }
}

main().catch(console.error);
