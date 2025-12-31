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
  isFormatTest?: boolean;
}

interface CompiledTestSuite {
  description: string;
  schema: unknown;
  tests: TestCase[];
  tjsValidator: ((data: unknown) => boolean) | null;
  ajvValidator: ((data: unknown) => boolean) | null;
  isFormatTest?: boolean;
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
  tjsNs: number; // nanoseconds per test
  ajvNs: number;
  diffPercent: number; // (tjs - ajv) / ajv * 100
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

  // Add meta-schemas (required for tests that $ref to the meta-schema)
  const metaSchemas: Record<string, string> = {
    'http://json-schema.org/draft-04/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-04.json'
    ),
    'http://json-schema.org/draft-06/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-06.json'
    ),
    'http://json-schema.org/draft-07/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-07.json'
    ),
  };
  for (const [uri, filePath] of Object.entries(metaSchemas)) {
    if (fs.existsSync(filePath)) {
      try {
        remotes[uri] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch {}
    }
  }

  return remotes;
}

// Load the exact benchmark tests from json-schema-benchmark
function loadJsbBenchmarkTests(draft: Draft): Set<string> | null {
  const jsbDir = path.join(__dirname, '../../json-schema-benchmark');
  let benchmarkFile: string;

  // Map our draft names to jsb folder structure
  if (draft === 'draft7') {
    benchmarkFile = path.join(jsbDir, 'draft7/benchmark-tests.txt');
  } else if (draft === 'draft6') {
    benchmarkFile = path.join(jsbDir, 'benchmark-tests.txt'); // draft6 is the default
  } else if (draft === 'draft4') {
    benchmarkFile = path.join(jsbDir, 'draft4/benchmark-tests.txt');
  } else {
    return null; // jsb doesn't support draft2019-09 or draft2020-12
  }

  if (!fs.existsSync(benchmarkFile)) {
    console.log(`  Warning: ${benchmarkFile} not found`);
    return null;
  }

  const content = fs.readFileSync(benchmarkFile, 'utf-8');
  const tests = new Set(content.split('\n').filter((line) => line.trim()));
  return tests;
}

// Load all test suites for a draft (including optional tests)
function loadTestSuites(draft: Draft, includeOptional: boolean = true): TestGroup[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const suites: TestGroup[] = [];

  const loadDir = (dir: string, isFormatTest: boolean = false) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Mark tests in optional/format/ directory as format tests
        const isFormat = isFormatTest || entry.name === 'format';
        loadDir(fullPath, isFormat);
      } else if (entry.name.endsWith('.json')) {
        const groups: TestGroup[] = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        // Mark all groups from format directory as format tests
        if (isFormatTest) {
          for (const group of groups) {
            group.isFormatTest = true;
          }
        }
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
      ? new Ajv2020({ allErrors: false, logger: false })
      : new Ajv({ allErrors: false, logger: false });

  addFormats(ajv);

  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }

  return ajv;
}

// Pre-compile all test suites for both validators
// When freshAjvPerSchema is true, creates a fresh Ajv instance per schema (like json-schema-benchmark)
function compileTestSuites(
  testSuites: TestGroup[],
  draft: Draft,
  remotes: Record<string, unknown>,
  freshAjvPerSchema: boolean = false
): CompiledTestSuite[] {
  // Shared Ajv instance (used when freshAjvPerSchema is false)
  const sharedAjv = freshAjvPerSchema ? null : createAjv(draft, remotes);

  return testSuites.map((suite) => {
    let tjsValidator: ((data: unknown) => boolean) | null = null;
    let ajvValidator: ((data: unknown) => boolean) | null = null;

    try {
      // Enable formatAssertion for optional format tests (they test format validation)
      tjsValidator = createValidator(suite.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
        ...(suite.isFormatTest && { formatAssertion: true }),
      });
    } catch {}

    try {
      // Use fresh Ajv per schema if requested (matches json-schema-benchmark)
      const ajv = freshAjvPerSchema ? createAjv(draft, remotes) : sharedAjv!;
      const fn = ajv.compile(suite.schema as object);
      ajvValidator = (data: unknown) => fn(data) as boolean;
    } catch {}

    return {
      description: suite.description,
      schema: suite.schema,
      tests: suite.tests,
      tjsValidator,
      ajvValidator,
      isFormatTest: suite.isFormatTest,
    };
  });
}

interface FailedTest {
  suite: string;
  test: string;
  expected: boolean;
  got: boolean | 'error' | 'no-validator';
}

// Check compliance for a validator
function checkCompliance(
  compiled: CompiledTestSuite[],
  getValidator: (s: CompiledTestSuite) => ((data: unknown) => boolean) | null,
  collectFailures: boolean = false
): { pass: number; fail: number; failures: FailedTest[] } {
  let pass = 0;
  let fail = 0;
  const failures: FailedTest[] = [];

  for (const suite of compiled) {
    const validator = getValidator(suite);
    if (!validator) {
      fail += suite.tests.length;
      if (collectFailures) {
        for (const test of suite.tests) {
          failures.push({
            suite: suite.description,
            test: test.description,
            expected: test.valid,
            got: 'no-validator',
          });
        }
      }
      continue;
    }

    for (const test of suite.tests) {
      try {
        const result = validator(test.data);
        if (result === test.valid) {
          pass++;
        } else {
          fail++;
          if (collectFailures) {
            failures.push({
              suite: suite.description,
              test: test.description,
              expected: test.valid,
              got: result,
            });
          }
        }
      } catch {
        fail++;
        if (collectFailures) {
          failures.push({
            suite: suite.description,
            test: test.description,
            expected: test.valid,
            got: 'error',
          });
        }
      }
    }
  }

  return { pass, fail, failures };
}

// Timing accumulator for per-suite stats during benchmark
interface SuiteTiming {
  tjsTotalNs: number;
  ajvTotalNs: number;
  testCount: number;
  iterations: number;
}

// Collect per-suite timing during benchmark run
function collectSuitePerfs(timings: Map<string, SuiteTiming>, draft: string): SuitePerf[] {
  const results: SuitePerf[] = [];

  for (const [description, timing] of timings) {
    const tjsNsPerTest = timing.tjsTotalNs / (timing.testCount * timing.iterations);
    const ajvNsPerTest = timing.ajvTotalNs / (timing.testCount * timing.iterations);
    const diffPercent = ajvNsPerTest > 0 ? ((tjsNsPerTest - ajvNsPerTest) / ajvNsPerTest) * 100 : 0;

    results.push({
      description,
      draft,
      tjsNs: tjsNsPerTest,
      ajvNs: ajvNsPerTest,
      diffPercent,
    });
  }

  return results;
}

// Run benchmark for a draft
function runBenchmark(
  draft: Draft,
  allSuitePerfs: SuitePerf[],
  filter: RegExp | null = null,
  showFailures: boolean = false,
  includeOptional: boolean = true,
  jsbMode: boolean = false,
  jsbExact: boolean = false
): Promise<DraftResult> {
  return new Promise((resolve) => {
    console.log(`\nLoading ${draft}...`);
    const remotes = loadRemoteSchemas(draft);
    let testSuites = loadTestSuites(draft, includeOptional);

    // Apply filter if provided
    if (filter) {
      testSuites = testSuites.filter((s) => filter.test(s.description));
      console.log(`Filtered to ${testSuites.length} schemas matching ${filter}`);
    }

    console.log(`Compiling ${testSuites.length} schemas...`);
    // In JSB exact mode, use fresh Ajv per schema to match json-schema-benchmark methodology
    const compiled = compileTestSuites(testSuites, draft, remotes, jsbExact);

    // Filter to test suites where both validators compiled successfully
    const compiledSuites = compiled.filter((s) => s.tjsValidator && s.ajvValidator);

    let validSuites: CompiledTestSuite[];
    let tjsCompliance: ReturnType<typeof checkCompliance>;
    let ajvCompliance: ReturnType<typeof checkCompliance>;

    if (jsbExact) {
      // JSB Exact mode: use exactly the tests from json-schema-benchmark's benchmark-tests.txt
      const jsbTests = loadJsbBenchmarkTests(draft);
      if (!jsbTests) {
        console.log(`  Warning: No JSB benchmark tests for ${draft}, falling back to normal mode`);
        validSuites = compiledSuites;
        // Check compliance on all tests
        tjsCompliance = checkCompliance(compiled, (s) => s.tjsValidator, showFailures);
        ajvCompliance = checkCompliance(compiled, (s) => s.ajvValidator);
      } else {
        console.log(`  Filtering to ${jsbTests.size} exact JSB benchmark tests...`);
        validSuites = [];
        for (const suite of compiledSuites) {
          // Filter tests within this suite to only those in the JSB benchmark
          const filteredTests = suite.tests.filter((test) => {
            const testName = `${suite.description}, ${test.description}`;
            return jsbTests.has(testName);
          });
          if (filteredTests.length > 0) {
            validSuites.push({ ...suite, tests: filteredTests });
          }
        }
        // Check compliance only on JSB-filtered tests
        tjsCompliance = checkCompliance(validSuites, (s) => s.tjsValidator, showFailures);
        ajvCompliance = checkCompliance(validSuites, (s) => s.ajvValidator);
      }
    } else {
      // Check compliance on all tests first
      tjsCompliance = checkCompliance(compiled, (s) => s.tjsValidator, showFailures);
      ajvCompliance = checkCompliance(compiled, (s) => s.ajvValidator);
      // Pre-test to filter out schemas where validators fail
      // In jsb mode: only exclude tests where ajv fails (simulates json-schema-benchmark exclusion)
      // Normal mode: exclude tests where either validator fails
      validSuites = [];
      for (const suite of compiledSuites) {
        let suiteValid = true;
        for (const test of suite.tests) {
          try {
            const tjsResult = suite.tjsValidator!(test.data);
            const ajvResult = suite.ajvValidator!(test.data);
            if (jsbMode) {
              // JSB mode: only exclude if ajv fails (tjs failures don't exclude)
              if (ajvResult !== test.valid) {
                suiteValid = false;
                break;
              }
            } else {
              // Normal mode: exclude if either fails
              if (tjsResult !== test.valid || ajvResult !== test.valid) {
                suiteValid = false;
                break;
              }
            }
          } catch {
            suiteValid = false;
            break;
          }
        }
        if (suiteValid) {
          validSuites.push(suite);
        }
      }
    }

    // Show compliance results
    console.log(
      `  tjs compliance: ${tjsCompliance.pass}/${tjsCompliance.pass + tjsCompliance.fail} (${tjsCompliance.fail} failures)`
    );
    console.log(
      `  ajv compliance: ${ajvCompliance.pass}/${ajvCompliance.pass + ajvCompliance.fail} (${ajvCompliance.fail} failures)`
    );

    // Show tjs failures if requested
    if (showFailures && tjsCompliance.failures.length > 0) {
      console.log(`\n  tjs failures:`);
      for (const f of tjsCompliance.failures) {
        console.log(`    - ${f.suite} > ${f.test} (expected ${f.expected}, got ${f.got})`);
      }
    }

    const testCount = validSuites.reduce((sum, s) => sum + s.tests.length, 0);

    console.log(`Running benchmark on ${validSuites.length} schemas (${testCount} tests)...`);

    let tjsHz = 0;
    let ajvHz = 0;
    let tjsRme = 0;
    let ajvRme = 0;

    // Track per-suite timing during benchmark
    const suiteTimings = new Map<string, SuiteTiming>();
    for (const testSuite of validSuites) {
      suiteTimings.set(testSuite.description, {
        tjsTotalNs: 0,
        ajvTotalNs: 0,
        testCount: testSuite.tests.length,
        iterations: 0,
      });
    }

    const suite = new Benchmark.Suite();

    // Add tjs benchmark - runs ALL tests in one iteration, tracks per-suite timing
    suite.add('tjs', () => {
      for (const testSuite of validSuites) {
        const timing = suiteTimings.get(testSuite.description)!;
        const start = performance.now();
        for (const test of testSuite.tests) {
          testSuite.tjsValidator!(test.data);
        }
        timing.tjsTotalNs += (performance.now() - start) * 1_000_000;
        timing.iterations++;
      }
    });

    // Add ajv benchmark - runs ALL tests in one iteration, tracks per-suite timing
    suite.add('ajv', () => {
      for (const testSuite of validSuites) {
        const timing = suiteTimings.get(testSuite.description)!;
        const start = performance.now();
        for (const test of testSuite.tests) {
          testSuite.ajvValidator!(test.data);
        }
        timing.ajvTotalNs += (performance.now() - start) * 1_000_000;
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

      // Collect per-suite performance data
      const suitePerfs = collectSuitePerfs(suiteTimings, draft);
      allSuitePerfs.push(...suitePerfs);

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

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;
  let showFailures = false;
  let includeOptional = true;
  let jsbMode = false;
  let jsbExact = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--filter' || arg === '-f') {
      const pattern = args[++i];
      if (pattern) {
        filter = new RegExp(pattern, 'i');
      }
    } else if (arg === '--failures' || arg === '--show-failures') {
      showFailures = true;
    } else if (arg === '--no-optional') {
      includeOptional = false;
    } else if (arg === '--jsb') {
      jsbMode = true;
    } else if (arg === '--jsb-exact') {
      jsbExact = true;
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }
  if (drafts.length === 0) drafts.push('draft2020-12');

  console.log('tjs vs ajv Benchmark Comparison');
  if (filter) {
    console.log(`Filter: ${filter}`);
  }
  if (!includeOptional) {
    console.log('Excluding optional tests (format, content, etc.)');
  }
  if (jsbExact) {
    console.log('JSB Exact mode: using exact tests from json-schema-benchmark');
  } else if (jsbMode) {
    console.log('JSB mode: only excluding tests where ajv fails (like json-schema-benchmark)');
  }
  console.log('='.repeat(100));

  const results: DraftResult[] = [];
  const allSuitePerfs: SuitePerf[] = [];

  for (const draft of drafts) {
    const result = await runBenchmark(
      draft,
      allSuitePerfs,
      filter,
      showFailures,
      includeOptional,
      jsbMode,
      jsbExact
    );
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

  // Top 10 slowest tests (where tjs is slowest compared to ajv, by % difference)
  const slowest = [...allSuitePerfs]
    .filter((s) => s.diffPercent > 0) // positive means tjs is slower (higher ns)
    .sort((a, b) => b.diffPercent - a.diffPercent)
    .slice(0, 10);

  if (slowest.length > 0) {
    console.log('\nTop 10 Slowest Tests (tjs vs ajv by % slower)');
    console.log('─'.repeat(100));
    console.log(
      'Draft'.padEnd(14) +
        'Test'.padEnd(50) +
        'tjs ns/test'.padStart(12) +
        'ajv ns/test'.padStart(12) +
        'diff %'.padStart(12)
    );
    console.log('─'.repeat(100));

    for (const s of slowest) {
      const name = s.description.length > 48 ? s.description.slice(0, 45) + '...' : s.description;
      console.log(
        s.draft.padEnd(14) +
          name.padEnd(50) +
          Math.round(s.tjsNs).toLocaleString().padStart(12) +
          Math.round(s.ajvNs).toLocaleString().padStart(12) +
          `${RED}+${Math.round(s.diffPercent)}%${RESET}`.padStart(21)
      );
    }
    console.log('─'.repeat(100));
  }
}

main().catch(console.error);
