/**
 * Compare tjs vs ajv performance using mitata.
 *
 * Strategy from json-schema-benchmark (ebdrup):
 * - Pre-compile ALL validators for ALL schemas
 * - Run ALL tests in ONE benchmark iteration
 * - Uses mitata for accurate microbenchmarking
 * - Tracks compliance (pass/fail) for each validator
 * - Shows top 10 slowest tests by absolute ops/s difference
 *
 * Usage:
 *   npm run bench [drafts...] [--filter <regex>]
 *
 * Examples:
 *   npm run bench draft7 --filter idn       # Only idn-* formats
 *   npm run bench --filter "hostname|email" # hostname or email
 *   npm run bench draft2019-09              # Single draft
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { measure } from 'mitata';
import Ajv from 'ajv';
import Ajv2019 from 'ajv/dist/2019.js';
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
  testCount: number;
  tjsPass: number;
  tjsFail: number;
  ajvPass: number;
  ajvFail: number;
}

interface SuitePerf {
  description: string;
  draft: string;
  tjsNs: number;
  ajvNs: number;
  diffPercent: number;
}

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

// Load remote schemas
function loadRemoteSchemas(): Record<string, unknown> {
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

  // Load ALL draft-specific remote directories (needed for cross-draft tests)
  for (const entry of fs.readdirSync(remotesDir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith('draft')) {
      const draftRemotesDir = path.join(remotesDir, entry.name);
      loadDir(draftRemotesDir, `http://localhost:1234/${entry.name}/`);
    }
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
    'https://json-schema.org/draft/2019-09/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/core': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/core.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/applicator': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/applicator.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/validation': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/validation.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/meta-data': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/meta-data.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/format': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/format.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/content': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/content.json'
    ),
    'https://json-schema.org/draft/2020-12/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/core': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/core.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/applicator': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/applicator.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/validation': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/validation.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/meta-data': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/meta-data.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/format-annotation': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/format-annotation.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/content': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/content.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/unevaluated': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/unevaluated.json'
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

  if (draft === 'draft7') {
    benchmarkFile = path.join(jsbDir, 'draft7/benchmark-tests.txt');
  } else if (draft === 'draft6') {
    benchmarkFile = path.join(jsbDir, 'benchmark-tests.txt');
  } else if (draft === 'draft4') {
    benchmarkFile = path.join(jsbDir, 'draft4/benchmark-tests.txt');
  } else {
    return null;
  }

  if (!fs.existsSync(benchmarkFile)) {
    console.log(`  Warning: ${benchmarkFile} not found`);
    return null;
  }

  const content = fs.readFileSync(benchmarkFile, 'utf-8');
  const tests = new Set(content.split('\n').filter((line) => line.trim()));
  return tests;
}

// Load all test suites for a draft
function loadTestSuites(draft: Draft, includeOptional: boolean = true): TestGroup[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const suites: TestGroup[] = [];

  const loadDir = (dir: string, isFormatTest: boolean = false) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const isFormat = isFormatTest || entry.name === 'format';
        loadDir(fullPath, isFormat);
      } else if (entry.name.endsWith('.json')) {
        const groups: TestGroup[] = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
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

  // Load optional tests
  if (includeOptional) {
    const optionalDir = path.join(suiteDir, 'optional');
    if (fs.existsSync(optionalDir)) {
      loadDir(optionalDir);
    }
  }

  return suites;
}

// Create AJV instance
function createAjv(
  draft: Draft,
  remotes: Record<string, unknown>,
  formatAssertion: boolean = false
): Ajv {
  const opts = {
    allErrors: false,
    logger: false as const,
    validateFormats: formatAssertion,
    strict: false,
  };
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

// Pre-compile all test suites
function compileTestSuites(
  testSuites: TestGroup[],
  draft: Draft,
  remotes: Record<string, unknown>,
  freshAjvPerSchema: boolean = false
): CompiledTestSuite[] {
  const sharedAjv = freshAjvPerSchema ? null : createAjv(draft, remotes, false);
  const sharedAjvWithFormat = freshAjvPerSchema ? null : createAjv(draft, remotes, true);

  return testSuites.map((suite) => {
    let tjsValidator: ((data: unknown) => boolean) | null = null;
    let ajvValidator: ((data: unknown) => boolean) | null = null;

    try {
      tjsValidator = createValidator(suite.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
        ...(suite.isFormatTest && { formatAssertion: true }),
      });
    } catch {}

    try {
      const ajv = freshAjvPerSchema
        ? createAjv(draft, remotes, suite.isFormatTest ?? false)
        : suite.isFormatTest
          ? sharedAjvWithFormat!
          : sharedAjv!;
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

// Check compliance
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

// Prepare benchmark for a draft
function prepareBenchmark(
  draft: Draft,
  filter: RegExp | null,
  showFailures: boolean,
  includeOptional: boolean,
  jsbMode: boolean,
  jsbExact: boolean
): {
  validSuites: CompiledTestSuite[];
  result: DraftResult;
} {
  console.log(`\nLoading ${draft}...`);
  const remotes = loadRemoteSchemas();
  let testSuites = loadTestSuites(draft, includeOptional);

  if (filter) {
    testSuites = testSuites.filter((s) => filter.test(s.description));
    console.log(`Filtered to ${testSuites.length} schemas matching ${filter}`);
  }

  console.log(`Compiling ${testSuites.length} schemas...`);
  const compiled = compileTestSuites(testSuites, draft, remotes, jsbExact);
  const compiledSuites = compiled.filter((s) => s.tjsValidator && s.ajvValidator);

  let validSuites: CompiledTestSuite[];
  let tjsCompliance: ReturnType<typeof checkCompliance>;
  let ajvCompliance: ReturnType<typeof checkCompliance>;

  if (jsbExact) {
    const jsbTests = loadJsbBenchmarkTests(draft);
    if (!jsbTests) {
      console.log(`  Warning: No JSB benchmark tests for ${draft}, falling back to normal mode`);
      validSuites = compiledSuites;
      tjsCompliance = checkCompliance(compiled, (s) => s.tjsValidator, showFailures);
      ajvCompliance = checkCompliance(compiled, (s) => s.ajvValidator);
    } else {
      console.log(`  Filtering to ${jsbTests.size} exact JSB benchmark tests...`);
      const jsbFilteredSuites: CompiledTestSuite[] = [];
      for (const suite of compiledSuites) {
        const filteredTests = suite.tests.filter((test) => {
          const testName = `${suite.description}, ${test.description}`;
          return jsbTests.has(testName);
        });
        if (filteredTests.length > 0) {
          jsbFilteredSuites.push({ ...suite, tests: filteredTests });
        }
      }
      tjsCompliance = checkCompliance(jsbFilteredSuites, (s) => s.tjsValidator, showFailures);
      ajvCompliance = checkCompliance(jsbFilteredSuites, (s) => s.ajvValidator);

      validSuites = [];
      let excludedSuites = 0;
      for (const suite of jsbFilteredSuites) {
        let suiteValid = true;
        for (const test of suite.tests) {
          try {
            const tjsResult = suite.tjsValidator!(test.data);
            const ajvResult = suite.ajvValidator!(test.data);
            if (tjsResult !== test.valid || ajvResult !== test.valid) {
              suiteValid = false;
              break;
            }
          } catch {
            suiteValid = false;
            break;
          }
        }
        if (suiteValid) {
          validSuites.push(suite);
        } else {
          excludedSuites++;
        }
      }
      if (excludedSuites > 0) {
        console.log(`  Excluded ${excludedSuites} suites where either validator fails`);
      }
    }
  } else {
    tjsCompliance = checkCompliance(compiled, (s) => s.tjsValidator, showFailures);
    ajvCompliance = checkCompliance(compiled, (s) => s.ajvValidator);
    validSuites = [];
    for (const suite of compiledSuites) {
      let suiteValid = true;
      for (const test of suite.tests) {
        try {
          const tjsResult = suite.tjsValidator!(test.data);
          const ajvResult = suite.ajvValidator!(test.data);
          if (jsbMode) {
            if (ajvResult !== test.valid) {
              suiteValid = false;
              break;
            }
          } else {
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

  console.log(
    `  tjs compliance: ${tjsCompliance.pass}/${tjsCompliance.pass + tjsCompliance.fail} (${tjsCompliance.fail} failures)`
  );
  console.log(
    `  ajv compliance: ${ajvCompliance.pass}/${ajvCompliance.pass + ajvCompliance.fail} (${ajvCompliance.fail} failures)`
  );

  if (showFailures && tjsCompliance.failures.length > 0) {
    console.log(`\n  tjs failures:`);
    for (const f of tjsCompliance.failures) {
      console.log(`    - ${f.suite} > ${f.test} (expected ${f.expected}, got ${f.got})`);
    }
  }

  const testCount = validSuites.reduce((sum, s) => sum + s.tests.length, 0);
  console.log(`Running benchmark on ${validSuites.length} schemas (${testCount} tests)...`);

  return {
    validSuites,
    result: {
      draft,
      testCount,
      tjsPass: tjsCompliance.pass,
      tjsFail: tjsCompliance.fail,
      ajvPass: ajvCompliance.pass,
      ajvFail: ajvCompliance.fail,
    },
  };
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
  let quickMode = false;
  let complianceOnly = false;

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
    } else if (arg === '--quick' || arg === '-q') {
      quickMode = true;
    } else if (arg === '--compliance-only' || arg === '-c') {
      complianceOnly = true;
      showFailures = true;
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }
  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12');
  }

  console.log('tjs vs ajv Benchmark Comparison (using mitata)');
  if (quickMode) {
    console.log('Quick mode: reduced iterations for faster feedback');
  }
  if (filter) {
    console.log(`Filter: ${filter}`);
  }
  if (!includeOptional) {
    console.log('Excluding optional tests (format, content, etc.)');
  }
  if (jsbExact) {
    console.log('JSB Exact mode: using exact tests from json-schema-benchmark');
  } else if (jsbMode) {
    console.log('JSB mode: only excluding tests where ajv fails');
  }
  console.log('='.repeat(100));

  const results: DraftResult[] = [];
  const allSuitePerfs: SuitePerf[] = [];

  // Measure options: quick mode uses fewer samples
  const measureOpts = quickMode
    ? { min_cpu_time: 10 * 1e6, min_samples: 5 } // 10ms, 5 samples
    : { min_cpu_time: 500 * 1e6, min_samples: 10 }; // 500ms, 10 samples

  // First pass: prepare all drafts and count total suites
  const preparedDrafts: Array<{ draft: Draft; prepared: ReturnType<typeof prepareBenchmark> }> = [];
  let totalSuites = 0;
  for (const draft of drafts) {
    const prepared = prepareBenchmark(
      draft,
      filter,
      showFailures,
      includeOptional,
      jsbMode,
      jsbExact
    );
    preparedDrafts.push({ draft, prepared });
    results.push(prepared.result);
    totalSuites += prepared.validSuites.length;
  }

  // In compliance-only mode, skip benchmarking
  if (complianceOnly) {
    console.log('\nCompliance check complete (benchmark skipped).');
    return;
  }

  // Second pass: measure with progress
  let completedSuites = 0;
  const startTime = Date.now();

  for (const { draft, prepared } of preparedDrafts) {
    for (const testSuite of prepared.validSuites) {
      const tjsValidator = testSuite.tjsValidator!;
      const ajvValidator = testSuite.ajvValidator!;
      const tests = testSuite.tests;

      // Show progress
      completedSuites++;
      const percent = Math.round((completedSuites / totalSuites) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      process.stdout.write(
        `\r  [${percent}%] ${completedSuites}/${totalSuites} suites (${elapsed}s) - ${draft}: ${testSuite.description.slice(0, 40).padEnd(40)}`
      );

      const tjsStats = await measure(() => {
        for (const test of tests) {
          tjsValidator(test.data);
        }
      }, measureOpts);

      const ajvStats = await measure(() => {
        for (const test of tests) {
          ajvValidator(test.data);
        }
      }, measureOpts);

      const tjsNs = tjsStats.avg / tests.length;
      const ajvNs = ajvStats.avg / tests.length;
      const diffPercent = ajvNs > 0 ? ((tjsNs - ajvNs) / ajvNs) * 100 : 0;

      allSuitePerfs.push({
        description: testSuite.description,
        draft,
        tjsNs,
        ajvNs,
        diffPercent,
      });
    }
  }
  // Clear progress line
  process.stdout.write('\r' + ' '.repeat(100) + '\r');

  // Compute per-draft performance from per-suite timing
  interface DraftPerf {
    draft: string;
    testCount: number;
    tjsTotalNs: number;
    ajvTotalNs: number;
    tjsPass: number;
    tjsFail: number;
    ajvPass: number;
    ajvFail: number;
  }

  const draftPerfs: DraftPerf[] = [];
  for (const r of results) {
    const draftSuites = allSuitePerfs.filter((s) => s.draft === r.draft);
    const tjsTotalNs = draftSuites.reduce((sum, s) => sum + s.tjsNs, 0);
    const ajvTotalNs = draftSuites.reduce((sum, s) => sum + s.ajvNs, 0);
    draftPerfs.push({
      draft: r.draft,
      testCount: r.testCount,
      tjsTotalNs,
      ajvTotalNs,
      tjsPass: r.tjsPass,
      tjsFail: r.tjsFail,
      ajvPass: r.ajvPass,
      ajvFail: r.ajvFail,
    });
  }

  // Summary table
  console.log('\n' + '='.repeat(100));
  console.log('Performance Summary');
  console.log('─'.repeat(100));
  console.log(
    'Draft'.padEnd(14) +
      'Tests'.padStart(6) +
      ' │' +
      'tjs ns/test'.padStart(12) +
      'ajv ns/test'.padStart(12) +
      'Diff'.padStart(8) +
      ' │' +
      'tjs pass'.padStart(10) +
      'tjs fail'.padStart(10) +
      'ajv pass'.padStart(10) +
      'ajv fail'.padStart(10)
  );
  console.log('─'.repeat(100));

  let totalTjsNs = 0;
  let totalAjvNs = 0;
  let totalTests = 0;
  let totalTjsPass = 0;
  let totalTjsFail = 0;
  let totalAjvPass = 0;
  let totalAjvFail = 0;

  for (const r of draftPerfs) {
    const tjsNsPerTest = r.tjsTotalNs / r.testCount;
    const ajvNsPerTest = r.ajvTotalNs / r.testCount;
    const diff =
      ajvNsPerTest > 0 ? Math.round(((tjsNsPerTest - ajvNsPerTest) / ajvNsPerTest) * 100) : 0;
    const color = diff <= 0 ? GREEN : RED;
    const sign = diff <= 0 ? '' : '+';

    const tjsFailColor = r.tjsFail > 0 ? RED : DIM;
    const ajvFailColor = r.ajvFail > 0 ? RED : DIM;

    console.log(
      r.draft.padEnd(14) +
        r.testCount.toString().padStart(6) +
        ' │' +
        Math.round(tjsNsPerTest).toLocaleString().padStart(12) +
        Math.round(ajvNsPerTest).toLocaleString().padStart(12) +
        `${color}${sign}${diff}%${RESET}`.padStart(17) +
        ' │' +
        `${GREEN}${r.tjsPass}${RESET}`.padStart(19) +
        `${tjsFailColor}${r.tjsFail}${RESET}`.padStart(19) +
        `${GREEN}${r.ajvPass}${RESET}`.padStart(19) +
        `${ajvFailColor}${r.ajvFail}${RESET}`.padStart(19)
    );

    totalTjsNs += r.tjsTotalNs;
    totalAjvNs += r.ajvTotalNs;
    totalTests += r.testCount;
    totalTjsPass += r.tjsPass;
    totalTjsFail += r.tjsFail;
    totalAjvPass += r.ajvPass;
    totalAjvFail += r.ajvFail;
  }

  // Total row
  console.log('─'.repeat(100));
  const totalTjsNsPerTest = totalTjsNs / totalTests;
  const totalAjvNsPerTest = totalAjvNs / totalTests;
  const totalDiff =
    totalAjvNsPerTest > 0
      ? Math.round(((totalTjsNsPerTest - totalAjvNsPerTest) / totalAjvNsPerTest) * 100)
      : 0;
  const totalColor = totalDiff <= 0 ? GREEN : RED;
  const totalSign = totalDiff <= 0 ? '' : '+';
  const tjsTotalFailColor = totalTjsFail > 0 ? RED : DIM;
  const ajvTotalFailColor = totalAjvFail > 0 ? RED : DIM;

  console.log(
    'TOTAL'.padEnd(14) +
      totalTests.toString().padStart(6) +
      ' │' +
      Math.round(totalTjsNsPerTest).toLocaleString().padStart(12) +
      Math.round(totalAjvNsPerTest).toLocaleString().padStart(12) +
      `${totalColor}${totalSign}${totalDiff}%${RESET}`.padStart(17) +
      ' │' +
      `${GREEN}${totalTjsPass}${RESET}`.padStart(19) +
      `${tjsTotalFailColor}${totalTjsFail}${RESET}`.padStart(19) +
      `${GREEN}${totalAjvPass}${RESET}`.padStart(19) +
      `${ajvTotalFailColor}${totalAjvFail}${RESET}`.padStart(19)
  );
  console.log('─'.repeat(100));

  // Top 10 slowest tests by absolute tjs time
  const slowest = [...allSuitePerfs].sort((a, b) => b.tjsNs - a.tjsNs).slice(0, 10);

  if (slowest.length > 0) {
    console.log('\nTop 10 Slowest Tests (by tjs execution time)');
    console.log('─'.repeat(100));
    console.log(
      'Draft'.padEnd(14) + 'Test'.padEnd(55) + 'tjs ns'.padStart(10) + 'ajv ns'.padStart(10)
    );
    console.log('─'.repeat(100));

    for (const s of slowest) {
      const name = s.description.length > 53 ? s.description.slice(0, 50) + '...' : s.description;
      console.log(
        s.draft.padEnd(14) +
          name.padEnd(55) +
          Math.round(s.tjsNs).toLocaleString().padStart(10) +
          Math.round(s.ajvNs).toLocaleString().padStart(10)
      );
    }
    console.log('─'.repeat(100));
  }

  // Top 10 slowest tests compared to ajv
  const slowestVsAjv = [...allSuitePerfs]
    .filter((s) => s.tjsNs > s.ajvNs)
    .sort((a, b) => b.tjsNs - b.ajvNs - (a.tjsNs - a.ajvNs))
    .slice(0, 10);

  if (slowestVsAjv.length > 0) {
    console.log('\nTop 10 Slowest vs AJV (by ns slower than ajv)');
    console.log('─'.repeat(100));
    console.log(
      'Draft'.padEnd(14) +
        'Test'.padEnd(50) +
        'tjs ns'.padStart(10) +
        'ajv ns'.padStart(10) +
        'diff ns'.padStart(10)
    );
    console.log('─'.repeat(100));

    for (const s of slowestVsAjv) {
      const name = s.description.length > 48 ? s.description.slice(0, 45) + '...' : s.description;
      const diffNs = Math.round(s.tjsNs - s.ajvNs);
      console.log(
        s.draft.padEnd(14) +
          name.padEnd(50) +
          Math.round(s.tjsNs).toLocaleString().padStart(10) +
          Math.round(s.ajvNs).toLocaleString().padStart(10) +
          `${RED}+${diffNs.toLocaleString()}${RESET}`.padStart(19)
      );
    }
    console.log('─'.repeat(100));
  }
}

main().catch(console.error);
