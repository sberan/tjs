/**
 * Benchmark tjs vs another validator using mitata's measure() API.
 *
 * Benchmarks at the FILE level (e.g., ref.json, allOf.json) for meaningful
 * keyword-level insights with minimal overhead.
 *
 * Usage:
 *   npm run bench [drafts...] [--filter <regex>] [--per-test] [--validator <name>] [--json <file>]
 *
 * Examples:
 *   npm run bench                            # tjs vs ajv (default)
 *   npm run bench -v zod                     # tjs vs zod
 *   npm run bench -v joi                     # tjs vs joi
 *   npm run bench draft7 --filter ref        # Only ref-related files
 *   npm run bench --filter "format|pattern"  # format or pattern files
 *   npm run bench draft2019-09               # Single draft
 *   npm run bench draft7 --filter unevaluatedItems --per-test  # Per-test breakdown
 *   npm run bench --compliance-only          # Only check compliance, skip benchmark
 *   npm run bench --json benchmark.json      # Write JSON results to file
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { measure } from 'mitata';
import Ajv from 'ajv';
import Ajv2019 from 'ajv/dist/2019.js';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
// @ts-ignore - no types available
import addFormats2019 from 'ajv-formats-draft2019';
import { z } from 'zod';
// @ts-ignore - no types available
import enjoi from 'enjoi';
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

type CompareValidator = 'ajv' | 'zod' | 'joi';

interface CompiledTest {
  tjsValidator: (data: unknown) => boolean;
  otherValidator: ((data: unknown) => boolean) | null;
  data: unknown;
}

interface CompiledTestWithDesc extends CompiledTest {
  groupDesc: string;
  testDesc: string;
  valid: boolean;
}

interface PerTestResult {
  draft: string;
  file: string;
  groupDesc: string;
  testDesc: string;
  valid: boolean;
  tjsNs: number;
  otherNs: number;
}

interface FileResult {
  draft: string;
  file: string; // relative path from suite dir (e.g., "optional/format/date.json")
  testCount: number;
  tjsNs: number;
  otherNs: number;
  tjsPass: number;
  tjsFail: number;
  otherPass: number;
  otherFail: number;
}

interface DraftCompliance {
  tjsPass: number;
  tjsFail: number;
  otherPass: number;
  otherFail: number;
}

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

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

  for (const entry of fs.readdirSync(remotesDir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith('draft')) {
      loadDir(path.join(remotesDir, entry.name), `http://localhost:1234/${entry.name}/`);
    }
  }

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

function createAjv(draft: Draft, remotes: Record<string, unknown>, formatAssertion: boolean): Ajv {
  const opts = {
    allErrors: false,
    logger: false as const,
    validateFormats: formatAssertion,
    strict: false,
  };
  let ajv: Ajv;
  if (draft === 'draft2020-12') ajv = new Ajv2020(opts);
  else if (draft === 'draft2019-09') ajv = new Ajv2019(opts);
  else ajv = new Ajv(opts);
  addFormats(ajv);
  // Add draft-2019-09 formats (idn-email, idn-hostname, iri, iri-reference, duration)
  if (draft === 'draft2019-09' || draft === 'draft2020-12') {
    addFormats2019(ajv);
  }
  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }
  return ajv;
}

// Get all test files for a draft (including optional subdirectories)
function getTestFiles(draft: Draft): { file: string; relativePath: string; isFormat: boolean }[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const files: { file: string; relativePath: string; isFormat: boolean }[] = [];

  // Main directory files
  for (const entry of fs.readdirSync(suiteDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push({
        file: path.join(suiteDir, entry.name),
        relativePath: entry.name,
        isFormat: false,
      });
    }
  }

  // Optional directory (recursive)
  const loadOptional = (dir: string, relPrefix: string, isFormat: boolean) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        loadOptional(fullPath, relPath, isFormat || entry.name === 'format');
      } else if (entry.name.endsWith('.json')) {
        files.push({ file: fullPath, relativePath: relPath, isFormat });
      }
    }
  };
  loadOptional(path.join(suiteDir, 'optional'), 'optional', false);

  return files;
}

// Compile all tests from a file with descriptions preserved (for --per-test mode)
function compileFileTestsWithDesc(
  filePath: string,
  draft: Draft,
  remotes: Record<string, unknown>,
  isFormat: boolean,
  compareValidator: CompareValidator
): CompiledTestWithDesc[] {
  const groups: TestGroup[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const sharedAjv = createAjv(draft, remotes, false);
  const sharedAjvWithFormat = createAjv(draft, remotes, true);

  const compiledTests: CompiledTestWithDesc[] = [];

  for (const group of groups) {
    const ajv = isFormat ? sharedAjvWithFormat : sharedAjv;

    let tjsValidator: ((data: unknown) => boolean) | null = null;
    let otherValidator: ((data: unknown) => boolean) | null = null;

    try {
      tjsValidator = createValidator(group.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
        ...(isFormat && { formatAssertion: true }),
      });
    } catch {}

    // Create comparison validator based on compareValidator
    if (compareValidator === 'ajv') {
      try {
        const fn = ajv.compile(group.schema as object);
        otherValidator = (data: unknown) => fn(data) as boolean;
      } catch {}
    } else if (compareValidator === 'zod') {
      try {
        const zodSchema = z.fromJSONSchema(group.schema as Parameters<typeof z.fromJSONSchema>[0]);
        otherValidator = (data: unknown) => zodSchema.safeParse(data).success;
      } catch {}
    } else if (compareValidator === 'joi') {
      try {
        const joiSchema = enjoi.schema(group.schema as object);
        otherValidator = (data: unknown) => !joiSchema.validate(data).error;
      } catch {}
    }

    // First pass: check compliance for all tests in this group
    const groupResults: {
      tjsOk: boolean;
      otherOk: boolean;
      data: unknown;
      testDesc: string;
      valid: boolean;
    }[] = [];
    let groupOtherAllPass = true;
    let groupTjsAllPass = true;

    for (const test of group.tests) {
      // Check compliance
      let tjsOk = false,
        otherOk = false;
      if (tjsValidator) {
        try {
          tjsOk = tjsValidator(test.data) === test.valid;
        } catch {}
      }
      if (otherValidator) {
        try {
          otherOk = otherValidator(test.data) === test.valid;
        } catch {}
      }

      if (!tjsOk) groupTjsAllPass = false;
      if (!otherOk) groupOtherAllPass = false;

      groupResults.push({
        tjsOk,
        otherOk,
        data: test.data,
        testDesc: test.description,
        valid: test.valid,
      });
    }

    // Second pass: only add tests to benchmark if both validators pass ALL tests in this group
    // This ensures we don't benchmark against a validator that doesn't fully implement
    // the validation (e.g., AJV's hostname format doesn't validate punycode)
    if (groupOtherAllPass && groupTjsAllPass && tjsValidator && otherValidator) {
      for (const result of groupResults) {
        compiledTests.push({
          tjsValidator,
          otherValidator,
          data: result.data,
          groupDesc: group.description,
          testDesc: result.testDesc,
          valid: result.valid,
        });
      }
    }
  }

  return compiledTests;
}

// Compile all tests from a file into a flat array ready for benchmarking
function compileFileTests(
  filePath: string,
  draft: Draft,
  remotes: Record<string, unknown>,
  isFormat: boolean,
  compareValidator: CompareValidator
): {
  compiledTests: CompiledTest[];
  tjsPass: number;
  tjsFail: number;
  otherPass: number;
  otherFail: number;
} {
  const groups: TestGroup[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const sharedAjv = createAjv(draft, remotes, false);
  const sharedAjvWithFormat = createAjv(draft, remotes, true);

  const compiledTests: CompiledTest[] = [];
  let tjsPass = 0,
    tjsFail = 0,
    otherPass = 0,
    otherFail = 0;

  for (const group of groups) {
    const ajv = isFormat ? sharedAjvWithFormat : sharedAjv;

    // Create tjs validator
    let tjsValidator: ((data: unknown) => boolean) | null = null;
    try {
      tjsValidator = createValidator(group.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
        ...(isFormat && { formatAssertion: true }),
      });
    } catch {}

    // Create the comparison validator based on compareValidator
    let otherValidator: ((data: unknown) => boolean) | null = null;
    if (compareValidator === 'ajv') {
      try {
        const fn = ajv.compile(group.schema as object);
        otherValidator = (data: unknown) => fn(data) as boolean;
      } catch {}
    } else if (compareValidator === 'zod') {
      try {
        const zodSchema = z.fromJSONSchema(group.schema as Parameters<typeof z.fromJSONSchema>[0]);
        otherValidator = (data: unknown) => zodSchema.safeParse(data).success;
      } catch {}
    } else if (compareValidator === 'joi') {
      try {
        const joiSchema = enjoi.schema(group.schema as object);
        otherValidator = (data: unknown) => !joiSchema.validate(data).error;
      } catch {}
    }

    // First pass: check compliance for all tests in this group
    const groupResults: {
      tjsOk: boolean;
      otherOk: boolean;
      data: unknown;
    }[] = [];
    let groupTjsAllPass = true;
    let groupOtherAllPass = true;

    for (const test of group.tests) {
      // Check tjs compliance
      let tjsOk = false;
      if (tjsValidator) {
        try {
          tjsOk = tjsValidator(test.data) === test.valid;
        } catch {}
      }
      if (tjsOk) tjsPass++;
      else {
        tjsFail++;
        groupTjsAllPass = false;
      }

      // Check other validator compliance
      let otherOk = false;
      if (otherValidator) {
        try {
          otherOk = otherValidator(test.data) === test.valid;
        } catch {}
      }
      if (otherOk) otherPass++;
      else {
        otherFail++;
        groupOtherAllPass = false;
      }

      groupResults.push({ tjsOk, otherOk, data: test.data });
    }

    // Second pass: only add tests to benchmark if both validators pass ALL tests in this group
    if (groupOtherAllPass && groupTjsAllPass && tjsValidator && otherValidator) {
      for (const result of groupResults) {
        compiledTests.push({
          tjsValidator,
          otherValidator,
          data: result.data,
        });
      }
    }
  }

  return {
    compiledTests,
    tjsPass,
    tjsFail,
    otherPass,
    otherFail,
  };
}

// Per-test benchmark mode: benchmarks each test case individually
async function runPerTestBenchmark(
  drafts: Draft[],
  filter: RegExp | null,
  remotes: Record<string, unknown>,
  measureOpts: { min_cpu_time: number; min_samples: number },
  compareValidator: CompareValidator
): Promise<void> {
  console.log(`\n${'═'.repeat(100)}`);
  console.log('PER-TEST BENCHMARK MODE');
  console.log('═'.repeat(100));

  // Collect all tests with descriptions
  interface PreparedTest {
    draft: Draft;
    file: string;
    test: CompiledTestWithDesc;
  }

  const allTests: PreparedTest[] = [];

  for (const draft of drafts) {
    let testFiles = getTestFiles(draft);
    if (filter) {
      testFiles = testFiles.filter((f) => filter!.test(f.relativePath));
    }

    for (const { file, relativePath, isFormat } of testFiles) {
      const tests = compileFileTestsWithDesc(file, draft, remotes, isFormat, compareValidator);
      for (const test of tests) {
        allTests.push({ draft, file: relativePath, test });
      }
    }
  }

  if (allTests.length === 0) {
    console.log('\nNo tests found matching filter.');
    return;
  }

  console.log(`\nBenchmarking ${allTests.length} individual tests...\n`);

  // Warmup
  const WARMUP_ITERATIONS = 100;
  console.log(`Warming up (${WARMUP_ITERATIONS} iterations per test)...`);
  for (const { test } of allTests) {
    for (let w = 0; w < WARMUP_ITERATIONS; w++) {
      test.tjsValidator(test.data);
      if (test.otherValidator) test.otherValidator(test.data);
    }
  }
  console.log('Warmup complete.\n');

  // Benchmark each test
  const results: PerTestResult[] = [];

  for (let i = 0; i < allTests.length; i++) {
    const { draft, file, test } = allTests[i];

    const tjsResult = await measure(() => {
      test.tjsValidator(test.data);
    }, measureOpts);

    const otherResult = test.otherValidator
      ? await measure(() => {
          test.otherValidator!(test.data);
        }, measureOpts)
      : null;

    const tjsNs = (tjsResult as any).p50 ?? tjsResult.avg;
    const otherNs = otherResult ? ((otherResult as any).p50 ?? otherResult.avg) : 0;

    results.push({
      draft,
      file,
      groupDesc: test.groupDesc,
      testDesc: test.testDesc,
      valid: test.valid,
      tjsNs,
      otherNs,
    });

    // Progress
    const percent = Math.round(((i + 1) / allTests.length) * 100);
    const ratio = otherNs > 0 ? tjsNs / otherNs : 0;
    const status =
      ratio > 1
        ? `${RED}+${Math.round((ratio - 1) * 100)}%${RESET}`
        : `${GREEN}-${Math.round((1 - ratio) * 100)}%${RESET}`;
    const desc = `${test.groupDesc}: ${test.testDesc}`.slice(0, 50);
    console.log(`${percent.toString().padStart(3)}% ${status} ${desc}`);
  }

  console.log('');

  // Sort by slowest vs comparison validator
  const slowest = results
    .filter((r) => r.tjsNs > r.otherNs && r.otherNs > 0)
    .sort((a, b) => b.tjsNs - b.otherNs - (a.tjsNs - a.otherNs))
    .slice(0, 20);

  const fastest = results
    .filter((r) => r.tjsNs < r.otherNs && r.otherNs > 0)
    .sort((a, b) => b.otherNs - b.tjsNs - (a.otherNs - a.tjsNs))
    .slice(0, 20);

  // Print slowest
  console.log('═'.repeat(140));
  console.log(`Top 20 Slowest vs ${compareValidator} (where tjs loses)`);
  console.log('─'.repeat(140));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'File'.padEnd(30) +
      'Group'.padEnd(35) +
      'Test'.padEnd(30) +
      'tjs ns'.padStart(9) +
      `${compareValidator} ns`.padStart(9) +
      'ratio'.padStart(8)
  );
  console.log('─'.repeat(140));

  for (let i = 0; i < slowest.length; i++) {
    const r = slowest[i];
    const file = r.file.length > 28 ? r.file.slice(0, 25) + '...' : r.file;
    const group = r.groupDesc.length > 33 ? r.groupDesc.slice(0, 30) + '...' : r.groupDesc;
    const test = r.testDesc.length > 28 ? r.testDesc.slice(0, 25) + '...' : r.testDesc;
    const ratio = r.otherNs > 0 ? (r.tjsNs / r.otherNs).toFixed(1) + 'x' : '∞';
    console.log(
      `${i + 1}`.padEnd(4) +
        r.draft.padEnd(14) +
        file.padEnd(30) +
        group.padEnd(35) +
        test.padEnd(30) +
        Math.round(r.tjsNs).toLocaleString().padStart(9) +
        Math.round(r.otherNs).toLocaleString().padStart(9) +
        `${RED}${ratio}${RESET}`.padStart(17)
    );
  }
  console.log('─'.repeat(140));

  // Print fastest
  if (fastest.length > 0) {
    console.log(`\nTop 20 Fastest vs ${compareValidator} (where tjs wins)`);
    console.log('─'.repeat(140));
    console.log(
      '#'.padEnd(4) +
        'Draft'.padEnd(14) +
        'File'.padEnd(30) +
        'Group'.padEnd(35) +
        'Test'.padEnd(30) +
        'tjs ns'.padStart(9) +
        `${compareValidator} ns`.padStart(9) +
        'ratio'.padStart(8)
    );
    console.log('─'.repeat(140));

    for (let i = 0; i < fastest.length; i++) {
      const r = fastest[i];
      const file = r.file.length > 28 ? r.file.slice(0, 25) + '...' : r.file;
      const group = r.groupDesc.length > 33 ? r.groupDesc.slice(0, 30) + '...' : r.groupDesc;
      const test = r.testDesc.length > 28 ? r.testDesc.slice(0, 25) + '...' : r.testDesc;
      const ratio = r.tjsNs > 0 ? (r.otherNs / r.tjsNs).toFixed(1) + 'x' : '∞';
      console.log(
        `${i + 1}`.padEnd(4) +
          r.draft.padEnd(14) +
          file.padEnd(30) +
          group.padEnd(35) +
          test.padEnd(30) +
          Math.round(r.tjsNs).toLocaleString().padStart(9) +
          Math.round(r.otherNs).toLocaleString().padStart(9) +
          `${GREEN}${ratio}${RESET}`.padStart(17)
      );
    }
    console.log('─'.repeat(140));
  }

  // Summary
  const totalTjsNs = results.reduce((sum, r) => sum + r.tjsNs, 0);
  const totalOtherNs = results.reduce((sum, r) => sum + r.otherNs, 0);
  const avgTjsNs = totalTjsNs / results.length;
  const avgOtherNs = totalOtherNs / results.length;
  const diffPercent = avgOtherNs > 0 ? ((avgTjsNs - avgOtherNs) / avgOtherNs) * 100 : 0;
  const color = diffPercent <= 0 ? GREEN : RED;
  const sign = diffPercent <= 0 ? '' : '+';

  console.log(
    `\nSummary: ${results.length} tests, avg tjs: ${Math.round(avgTjsNs)}ns, avg ${compareValidator}: ${Math.round(avgOtherNs)}ns (${color}${sign}${Math.round(diffPercent)}%${RESET})`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;
  let complianceOnly = false;
  let perTestMode = false;
  let jsonFile: string | null = null;
  let compareValidator: CompareValidator = 'ajv';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--filter' || arg === '-f') {
      const pattern = args[++i];
      if (pattern) filter = new RegExp(pattern, 'i');
    } else if (arg === '--compliance-only' || arg === '-c') {
      complianceOnly = true;
    } else if (arg === '--per-test' || arg === '-t') {
      perTestMode = true;
    } else if (arg === '--json') {
      jsonFile = args[++i] || 'benchmark.json';
    } else if (arg === '--validator' || arg === '-v') {
      const v = args[++i]?.toLowerCase();
      if (v && ['ajv', 'zod', 'joi'].includes(v)) {
        compareValidator = v as CompareValidator;
      }
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }

  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12');
  }

  // Benchmark options
  const measureOpts = { min_cpu_time: 50_000_000, min_samples: 50 };

  console.log(`tjs vs ${compareValidator} Benchmark (per-file)`);
  if (filter) console.log(`Filter: ${filter}`);
  console.log('═'.repeat(100));

  const remotes = loadRemoteSchemas();

  // Prepare all files across all drafts
  interface PreparedFile {
    draft: Draft;
    filePath: string; // relative path like "optional/format/date.json"
    compiledTests: CompiledTest[];
    tjsPass: number;
    tjsFail: number;
    otherPass: number;
    otherFail: number;
  }

  const allPrepared: PreparedFile[] = [];

  // Track compliance across ALL tests (not just benchmarkable ones)
  const draftCompliance: Record<Draft, DraftCompliance> = {} as Record<Draft, DraftCompliance>;

  for (const draft of drafts) {
    console.log(`\nLoading ${draft}...`);
    let testFiles = getTestFiles(draft);

    if (filter) {
      testFiles = testFiles.filter((f) => filter!.test(f.relativePath));
      console.log(`  Filtered to ${testFiles.length} files`);
    }

    // Initialize compliance counters for this draft
    draftCompliance[draft] = {
      tjsPass: 0,
      tjsFail: 0,
      otherPass: 0,
      otherFail: 0,
    };

    for (const { file, relativePath, isFormat } of testFiles) {
      const { compiledTests, tjsPass, tjsFail, otherPass, otherFail } = compileFileTests(
        file,
        draft,
        remotes,
        isFormat,
        compareValidator
      );

      // Always track compliance counts (even if no benchmarkable tests)
      draftCompliance[draft].tjsPass += tjsPass;
      draftCompliance[draft].tjsFail += tjsFail;
      draftCompliance[draft].otherPass += otherPass;
      draftCompliance[draft].otherFail += otherFail;

      if (compiledTests.length > 0) {
        allPrepared.push({
          draft,
          filePath: relativePath,
          compiledTests,
          tjsPass,
          tjsFail,
          otherPass,
          otherFail,
        });
      }
    }

    // Print compliance summary for this draft (from total counts, not just benchmarkable files)
    const { tjsPass, tjsFail, otherPass, otherFail } = draftCompliance[draft];
    console.log(
      `  tjs: ${tjsPass}/${tjsPass + tjsFail} (${tjsFail} failures), ${compareValidator}: ${otherPass}/${otherPass + otherFail} (${otherFail} failures)`
    );
    const draftFiles = allPrepared.filter((f) => f.draft === draft);
    console.log(`  ${draftFiles.length} files ready for benchmark`);
  }

  if (complianceOnly) {
    console.log('\nCompliance check complete (benchmark skipped).');
    return;
  }

  // Per-test mode: benchmark each test individually
  if (perTestMode) {
    await runPerTestBenchmark(drafts, filter, remotes, measureOpts, compareValidator);
    return;
  }

  const totalTests = allPrepared.reduce((sum, f) => sum + f.compiledTests.length, 0);
  console.log(`\nBenchmarking ${allPrepared.length} files (${totalTests} tests)...\n`);

  // Warmup phase
  const WARMUP_ITERATIONS = 50;
  console.log(`Warming up (${WARMUP_ITERATIONS} iterations)...`);
  for (const { compiledTests } of allPrepared) {
    for (let w = 0; w < WARMUP_ITERATIONS; w++) {
      for (const t of compiledTests) {
        t.tjsValidator(t.data);
        if (t.otherValidator) t.otherValidator(t.data);
      }
    }
  }
  console.log('Warmup complete.\n');

  // Benchmark each file
  const results: FileResult[] = [];

  for (let i = 0; i < allPrepared.length; i++) {
    const { draft, filePath, compiledTests, tjsPass, tjsFail, otherPass, otherFail } =
      allPrepared[i];

    // Check if other validator is available for all tests in this file
    const hasOther = compiledTests.every((t) => t.otherValidator !== null);

    // Benchmark tjs
    const tjsResult = await measure(() => {
      for (const t of compiledTests) {
        t.tjsValidator(t.data);
      }
    }, measureOpts);
    const tjsNs = ((tjsResult as any).p50 ?? tjsResult.avg) / compiledTests.length;

    // Benchmark other validator (if available)
    let otherNs = 0;
    if (hasOther) {
      const otherResult = await measure(() => {
        for (const t of compiledTests) {
          t.otherValidator!(t.data);
        }
      }, measureOpts);
      otherNs = ((otherResult as any).p50 ?? otherResult.avg) / compiledTests.length;
    }

    results.push({
      draft,
      file: filePath,
      testCount: compiledTests.length,
      tjsNs,
      otherNs,
      tjsPass,
      tjsFail,
      otherPass,
      otherFail,
    });

    // Print progress
    const percent = Math.round(((i + 1) / allPrepared.length) * 100);
    let status = '';
    if (otherNs > 0) {
      const ratio = tjsNs / otherNs;
      status =
        ratio > 1
          ? `${RED}+${Math.round((ratio - 1) * 100)}%${RESET}`
          : `${GREEN}-${Math.round((1 - ratio) * 100)}%${RESET}`;
    }
    console.log(`${percent}% ${draft} ${filePath} ${status}`);
  }

  console.log('');

  // JSON output mode - write structured data to file and exit
  if (jsonFile) {
    // Compute head-to-head stats for JSON
    const computeH2HJson = () => {
      const applicable = results.filter((r) => r.otherNs > 0 && r.tjsNs > 0);
      if (applicable.length === 0) return null;

      const totalTjs = applicable.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
      const totalOther = applicable.reduce((sum, r) => sum + r.otherNs * r.testCount, 0);
      const totalTests = applicable.reduce((sum, r) => sum + r.testCount, 0);
      const avgTjs = totalTjs / totalTests;
      const avgOther = totalOther / totalTests;
      const faster = avgTjs < avgOther ? 'tjs' : compareValidator;
      const ratio = avgTjs < avgOther ? avgOther / avgTjs : avgTjs / avgOther;

      return {
        validatorA: 'tjs',
        validatorB: compareValidator,
        avgNsA: avgTjs,
        avgNsB: avgOther,
        faster,
        ratio,
        totalTests,
      };
    };

    const jsonData = {
      compareValidator,
      results: results.map((r) => ({
        draft: r.draft,
        file: r.file,
        testCount: r.testCount,
        tjs: { nsPerTest: r.tjsNs, pass: r.tjsPass, fail: r.tjsFail },
        other: { nsPerTest: r.otherNs, pass: r.otherPass, fail: r.otherFail },
      })),
      summary: Object.fromEntries(
        drafts.map((draft) => {
          const draftResults = results.filter((r) => r.draft === draft);
          const compliance = draftCompliance[draft];
          const testCount = draftResults.reduce((sum, r) => sum + r.testCount, 0);
          const tjsTotalNs = draftResults.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
          const otherTotalNs = draftResults.reduce((sum, r) => sum + r.otherNs * r.testCount, 0);
          return [
            draft,
            {
              files: draftResults.length,
              tests: testCount,
              tjs: {
                nsPerTest: testCount > 0 ? tjsTotalNs / testCount : 0,
                pass: compliance.tjsPass,
                fail: compliance.tjsFail,
              },
              other: {
                nsPerTest: testCount > 0 ? otherTotalNs / testCount : 0,
                pass: compliance.otherPass,
                fail: compliance.otherFail,
              },
            },
          ];
        })
      ),
      headToHead: computeH2HJson(),
    };

    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`Wrote benchmark results to ${jsonFile}`);
    return;
  }

  // Sort results - weight by total time impact (per-test diff × test count)
  const slowest = results
    .filter((r) => r.tjsNs > r.otherNs && r.otherNs > 0)
    .sort((a, b) => (b.tjsNs - b.otherNs) * b.testCount - (a.tjsNs - a.otherNs) * a.testCount)
    .slice(0, 15);

  const fastest = results
    .filter((r) => r.tjsNs < r.otherNs && r.otherNs > 0)
    .sort((a, b) => (b.otherNs - b.tjsNs) * b.testCount - (a.otherNs - a.tjsNs) * a.testCount)
    .slice(0, 15);

  // Top slowest vs comparison validator
  console.log('═'.repeat(120));
  console.log(`Top 15 Slowest vs ${compareValidator} (where tjs loses) - sorted by total impact`);
  console.log('─'.repeat(120));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'File'.padEnd(40) +
      'Tests'.padStart(6) +
      'tjs ns'.padStart(9) +
      `${compareValidator} ns`.padStart(9) +
      'diff/test'.padStart(10) +
      'total diff'.padStart(12) +
      'ratio'.padStart(8)
  );
  console.log('─'.repeat(120));

  for (let i = 0; i < slowest.length; i++) {
    const r = slowest[i];
    const name = r.file.length > 38 ? r.file.slice(0, 35) + '...' : r.file;
    const diffPerTest = Math.round(r.tjsNs - r.otherNs);
    const totalDiff = Math.round((r.tjsNs - r.otherNs) * r.testCount);
    const ratio = r.otherNs > 0 ? (r.tjsNs / r.otherNs).toFixed(1) + 'x' : '∞';
    console.log(
      `${i + 1}`.padEnd(4) +
        r.draft.padEnd(14) +
        name.padEnd(40) +
        r.testCount.toString().padStart(6) +
        Math.round(r.tjsNs).toLocaleString().padStart(9) +
        Math.round(r.otherNs).toLocaleString().padStart(9) +
        `+${diffPerTest.toLocaleString()}`.padStart(10) +
        `${RED}+${totalDiff.toLocaleString()}${RESET}`.padStart(21) +
        ratio.padStart(8)
    );
  }
  console.log('─'.repeat(120));

  // Top fastest vs comparison validator
  if (fastest.length > 0) {
    console.log(
      `\nTop 15 Fastest vs ${compareValidator} (where tjs wins) - sorted by total impact`
    );
    console.log('─'.repeat(120));
    console.log(
      '#'.padEnd(4) +
        'Draft'.padEnd(14) +
        'File'.padEnd(40) +
        'Tests'.padStart(6) +
        'tjs ns'.padStart(9) +
        `${compareValidator} ns`.padStart(9) +
        'saved/test'.padStart(11) +
        'total saved'.padStart(12) +
        'ratio'.padStart(8)
    );
    console.log('─'.repeat(120));

    for (let i = 0; i < fastest.length; i++) {
      const r = fastest[i];
      const name = r.file.length > 38 ? r.file.slice(0, 35) + '...' : r.file;
      const savedPerTest = Math.round(r.otherNs - r.tjsNs);
      const totalSaved = Math.round((r.otherNs - r.tjsNs) * r.testCount);
      const ratio = r.tjsNs > 0 ? (r.otherNs / r.tjsNs).toFixed(1) + 'x' : '∞';
      console.log(
        `${i + 1}`.padEnd(4) +
          r.draft.padEnd(14) +
          name.padEnd(40) +
          r.testCount.toString().padStart(6) +
          Math.round(r.tjsNs).toLocaleString().padStart(9) +
          Math.round(r.otherNs).toLocaleString().padStart(9) +
          `-${savedPerTest.toLocaleString()}`.padStart(11) +
          `${GREEN}-${totalSaved.toLocaleString()}${RESET}`.padStart(21) +
          ratio.padStart(8)
      );
    }
    console.log('─'.repeat(120));
  }

  // Overall summary by draft
  console.log('\n' + '═'.repeat(100));
  console.log(`OVERALL PERFORMANCE SUMMARY (tjs vs ${compareValidator})`);
  console.log('─'.repeat(100));
  console.log(
    'Draft'.padEnd(14) +
      'Files'.padStart(6) +
      'Tests'.padStart(8) +
      ' │' +
      'tjs ns'.padStart(10) +
      `${compareValidator} ns`.padStart(10) +
      ' │' +
      'tjs pass'.padStart(10) +
      'tjs fail'.padStart(10) +
      `${compareValidator} fail`.padStart(12)
  );
  console.log('─'.repeat(100));

  let totalTjsNs = 0,
    totalOtherNs = 0,
    totalTests2 = 0,
    totalFiles = 0;
  let totalTjsPass = 0,
    totalTjsFail = 0,
    totalOtherFail = 0;

  for (const draft of drafts) {
    const draftResults = results.filter((r) => r.draft === draft);
    const fileCount = draftResults.length;
    const testCount = draftResults.reduce((sum, r) => sum + r.testCount, 0);
    const tjsTotalNs = draftResults.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
    const otherTotalNs = draftResults.reduce((sum, r) => sum + r.otherNs * r.testCount, 0);

    // Use draftCompliance for pass/fail counts (includes ALL tests, not just benchmarkable ones)
    const compliance = draftCompliance[draft] || {
      tjsPass: 0,
      tjsFail: 0,
      otherPass: 0,
      otherFail: 0,
    };
    const tjsPass = compliance.tjsPass;
    const tjsFail = compliance.tjsFail;
    const otherFail = compliance.otherFail;

    const tjsNsPerTest = testCount > 0 ? tjsTotalNs / testCount : 0;
    const otherNsPerTest = testCount > 0 ? otherTotalNs / testCount : 0;

    console.log(
      draft.padEnd(14) +
        fileCount.toString().padStart(6) +
        testCount.toString().padStart(8) +
        ' │' +
        Math.round(tjsNsPerTest).toLocaleString().padStart(10) +
        Math.round(otherNsPerTest).toLocaleString().padStart(10) +
        ' │' +
        `${GREEN}${tjsPass}${RESET}`.padStart(19) +
        `${tjsFail > 0 ? RED : DIM}${tjsFail}${RESET}`.padStart(19) +
        `${otherFail > 0 ? RED : DIM}${otherFail}${RESET}`.padStart(21)
    );

    totalTjsNs += tjsTotalNs;
    totalOtherNs += otherTotalNs;
    totalTests2 += testCount;
    totalFiles += fileCount;
    totalTjsPass += tjsPass;
    totalTjsFail += tjsFail;
    totalOtherFail += otherFail;
  }

  console.log('─'.repeat(100));
  const totalTjsNsPerTest = totalTests2 > 0 ? totalTjsNs / totalTests2 : 0;
  const totalOtherNsPerTest = totalTests2 > 0 ? totalOtherNs / totalTests2 : 0;

  console.log(
    'TOTAL'.padEnd(14) +
      totalFiles.toString().padStart(6) +
      totalTests2.toString().padStart(8) +
      ' │' +
      Math.round(totalTjsNsPerTest).toLocaleString().padStart(10) +
      Math.round(totalOtherNsPerTest).toLocaleString().padStart(10) +
      ' │' +
      `${GREEN}${totalTjsPass}${RESET}`.padStart(19) +
      `${totalTjsFail > 0 ? RED : DIM}${totalTjsFail}${RESET}`.padStart(19) +
      `${totalOtherFail > 0 ? RED : DIM}${totalOtherFail}${RESET}`.padStart(21)
  );
  console.log('─'.repeat(100));

  // Head-to-head comparison
  console.log('\n' + '═'.repeat(80));
  console.log('HEAD-TO-HEAD (on mutually passing test groups only)');
  console.log('─'.repeat(80));

  const applicable = results.filter((r) => r.otherNs > 0 && r.tjsNs > 0);
  if (applicable.length > 0) {
    const totalTjs = applicable.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
    const totalOther = applicable.reduce((sum, r) => sum + r.otherNs * r.testCount, 0);
    const totalTests = applicable.reduce((sum, r) => sum + r.testCount, 0);
    const avgTjs = totalTjs / totalTests;
    const avgOther = totalOther / totalTests;
    const faster = avgTjs < avgOther ? 'tjs' : compareValidator;
    const ratio = avgTjs < avgOther ? avgOther / avgTjs : avgTjs / avgOther;
    const color = faster === 'tjs' ? GREEN : RED;

    console.log(
      `tjs vs ${compareValidator}:  ${color}${faster} is ${ratio.toFixed(2)}x faster${RESET} ` +
        `(${Math.round(avgTjs)} ns vs ${Math.round(avgOther)} ns, ${totalTests} tests)`
    );
  }

  console.log('─'.repeat(80));
}

main().catch(console.error);
