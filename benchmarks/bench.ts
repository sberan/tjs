/**
 * Benchmark tjs vs another validator using mitata's measure() API.
 *
 * Benchmarks at the FILE level (e.g., ref.json, allOf.json) for meaningful
 * keyword-level insights with minimal overhead.
 *
 * Usage:
 *   npm run bench [drafts...] [--filter <regex>] [--per-test] [--validator <name>] [--json]
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
 *   npm run bench --json                     # Output JSON for CI/programmatic use
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

interface CompiledTest {
  tjsValidator: (data: unknown) => boolean;
  ajvValidator: (data: unknown) => boolean;
  zodValidator: ((data: unknown) => boolean) | null;
  joiValidator: ((data: unknown) => boolean) | null;
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
  ajvNs: number;
}

interface FileResult {
  draft: string;
  file: string; // relative path from suite dir (e.g., "optional/format/date.json")
  testCount: number;
  tjsNs: number;
  ajvNs: number;
  zodNs: number;
  joiNs: number;
  tjsPass: number;
  tjsFail: number;
  ajvPass: number;
  ajvFail: number;
  zodPass: number;
  zodFail: number;
  joiPass: number;
  joiFail: number;
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
  isFormat: boolean
): CompiledTestWithDesc[] {
  const groups: TestGroup[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const sharedAjv = createAjv(draft, remotes, false);
  const sharedAjvWithFormat = createAjv(draft, remotes, true);

  const compiledTests: CompiledTestWithDesc[] = [];

  for (const group of groups) {
    const ajv = isFormat ? sharedAjvWithFormat : sharedAjv;

    let tjsValidator: ((data: unknown) => boolean) | null = null;
    let ajvValidator: ((data: unknown) => boolean) | null = null;

    try {
      tjsValidator = createValidator(group.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
        ...(isFormat && { formatAssertion: true }),
      });
    } catch {}

    try {
      const fn = ajv.compile(group.schema as object);
      ajvValidator = (data: unknown) => fn(data) as boolean;
    } catch {}

    // First pass: check compliance for all tests in this group
    const groupResults: {
      tjsOk: boolean;
      ajvOk: boolean;
      data: unknown;
      testDesc: string;
      valid: boolean;
    }[] = [];
    let groupAjvAllPass = true;
    let groupTjsAllPass = true;

    for (const test of group.tests) {
      // Check compliance
      let tjsOk = false,
        ajvOk = false;
      if (tjsValidator) {
        try {
          tjsOk = tjsValidator(test.data) === test.valid;
        } catch {}
      }
      if (ajvValidator) {
        try {
          ajvOk = ajvValidator(test.data) === test.valid;
        } catch {}
      }

      if (!tjsOk) groupTjsAllPass = false;
      if (!ajvOk) groupAjvAllPass = false;

      groupResults.push({
        tjsOk,
        ajvOk,
        data: test.data,
        testDesc: test.description,
        valid: test.valid,
      });
    }

    // Second pass: only add tests to benchmark if AJV passes ALL tests in this group
    // This ensures we don't benchmark against a validator that doesn't fully implement
    // the validation (e.g., AJV's hostname format doesn't validate punycode)
    if (groupAjvAllPass && groupTjsAllPass && tjsValidator && ajvValidator) {
      for (const result of groupResults) {
        compiledTests.push({
          tjsValidator,
          ajvValidator,
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
  isFormat: boolean
): {
  compiledTests: CompiledTest[];
  tjsPass: number;
  tjsFail: number;
  ajvPass: number;
  ajvFail: number;
  zodPass: number;
  zodFail: number;
  joiPass: number;
  joiFail: number;
} {
  const groups: TestGroup[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const sharedAjv = createAjv(draft, remotes, false);
  const sharedAjvWithFormat = createAjv(draft, remotes, true);

  const compiledTests: CompiledTest[] = [];
  let tjsPass = 0,
    tjsFail = 0,
    ajvPass = 0,
    ajvFail = 0,
    zodPass = 0,
    zodFail = 0,
    joiPass = 0,
    joiFail = 0;

  for (const group of groups) {
    const ajv = isFormat ? sharedAjvWithFormat : sharedAjv;

    let tjsValidator: ((data: unknown) => boolean) | null = null;
    try {
      tjsValidator = createValidator(group.schema as JsonSchema, {
        defaultMeta: draft,
        remotes: remotes as Record<string, JsonSchema>,
        ...(isFormat && { formatAssertion: true }),
      });
    } catch {}

    let ajvValidator: ((data: unknown) => boolean) | null = null;
    try {
      const fn = ajv.compile(group.schema as object);
      ajvValidator = (data: unknown) => fn(data) as boolean;
    } catch {}

    // Create Zod validator using native z.fromJSONSchema
    let zodValidator: ((data: unknown) => boolean) | null = null;
    try {
      const zodSchema = z.fromJSONSchema(group.schema as object);
      zodValidator = (data: unknown) => zodSchema.safeParse(data).success;
    } catch {}

    // Create Joi validator using enjoi
    let joiValidator: ((data: unknown) => boolean) | null = null;
    try {
      const joiSchema = enjoi.schema(group.schema as object);
      joiValidator = (data: unknown) => !joiSchema.validate(data).error;
    } catch {}

    // First pass: check compliance for all tests in this group
    const groupResults: {
      tjsOk: boolean;
      ajvOk: boolean;
      zodOk: boolean;
      joiOk: boolean;
      data: unknown;
    }[] = [];
    let groupAjvAllPass = true;
    let groupTjsAllPass = true;
    let groupZodAllPass = true;
    let groupJoiAllPass = true;

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

      // Check AJV compliance
      let ajvOk = false;
      if (ajvValidator) {
        try {
          ajvOk = ajvValidator(test.data) === test.valid;
        } catch {}
      }
      if (ajvOk) ajvPass++;
      else {
        ajvFail++;
        groupAjvAllPass = false;
      }

      // Check Zod compliance
      let zodOk = false;
      if (zodValidator) {
        try {
          zodOk = zodValidator(test.data) === test.valid;
        } catch {}
      }
      if (zodOk) zodPass++;
      else {
        zodFail++;
        groupZodAllPass = false;
      }

      // Check Joi compliance
      let joiOk = false;
      if (joiValidator) {
        try {
          joiOk = joiValidator(test.data) === test.valid;
        } catch {}
      }
      if (joiOk) joiPass++;
      else {
        joiFail++;
        groupJoiAllPass = false;
      }

      groupResults.push({ tjsOk, ajvOk, zodOk, joiOk, data: test.data });
    }

    // Second pass: only add tests to benchmark if both tjs and ajv pass ALL tests in this group
    // Zod and Joi are included if they compiled (even if they fail some tests)
    if (groupAjvAllPass && groupTjsAllPass && tjsValidator && ajvValidator) {
      for (const result of groupResults) {
        compiledTests.push({
          tjsValidator,
          ajvValidator,
          zodValidator: groupZodAllPass ? zodValidator : null,
          joiValidator: groupJoiAllPass ? joiValidator : null,
          data: result.data,
        });
      }
    }
  }

  return {
    compiledTests,
    tjsPass,
    tjsFail,
    ajvPass,
    ajvFail,
    zodPass,
    zodFail,
    joiPass,
    joiFail,
  };
}

// Per-test benchmark mode: benchmarks each test case individually
async function runPerTestBenchmark(
  drafts: Draft[],
  filter: RegExp | null,
  remotes: Record<string, unknown>,
  measureOpts: { min_cpu_time: number; min_samples: number }
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
      const tests = compileFileTestsWithDesc(file, draft, remotes, isFormat);
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
      test.ajvValidator(test.data);
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

    const ajvResult = await measure(() => {
      test.ajvValidator(test.data);
    }, measureOpts);

    const tjsNs = (tjsResult as any).p50 ?? tjsResult.avg;
    const ajvNs = (ajvResult as any).p50 ?? ajvResult.avg;

    results.push({
      draft,
      file,
      groupDesc: test.groupDesc,
      testDesc: test.testDesc,
      valid: test.valid,
      tjsNs,
      ajvNs,
    });

    // Progress
    const percent = Math.round(((i + 1) / allTests.length) * 100);
    const ratio = ajvNs > 0 ? tjsNs / ajvNs : 0;
    const status =
      ratio > 1
        ? `${RED}+${Math.round((ratio - 1) * 100)}%${RESET}`
        : `${GREEN}-${Math.round((1 - ratio) * 100)}%${RESET}`;
    const desc = `${test.groupDesc}: ${test.testDesc}`.slice(0, 50);
    console.log(`${percent.toString().padStart(3)}% ${status} ${desc}`);
  }

  console.log('');

  // Sort by slowest vs AJV
  const slowest = results
    .filter((r) => r.tjsNs > r.ajvNs)
    .sort((a, b) => b.tjsNs - b.ajvNs - (a.tjsNs - a.ajvNs))
    .slice(0, 20);

  const fastest = results
    .filter((r) => r.tjsNs < r.ajvNs)
    .sort((a, b) => b.ajvNs - b.tjsNs - (a.ajvNs - a.tjsNs))
    .slice(0, 20);

  // Print slowest
  console.log('═'.repeat(140));
  console.log('Top 20 Slowest vs AJV (where tjs loses)');
  console.log('─'.repeat(140));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'File'.padEnd(30) +
      'Group'.padEnd(35) +
      'Test'.padEnd(30) +
      'tjs ns'.padStart(9) +
      'ajv ns'.padStart(9) +
      'ratio'.padStart(8)
  );
  console.log('─'.repeat(140));

  for (let i = 0; i < slowest.length; i++) {
    const r = slowest[i];
    const file = r.file.length > 28 ? r.file.slice(0, 25) + '...' : r.file;
    const group = r.groupDesc.length > 33 ? r.groupDesc.slice(0, 30) + '...' : r.groupDesc;
    const test = r.testDesc.length > 28 ? r.testDesc.slice(0, 25) + '...' : r.testDesc;
    const ratio = r.ajvNs > 0 ? (r.tjsNs / r.ajvNs).toFixed(1) + 'x' : '∞';
    console.log(
      `${i + 1}`.padEnd(4) +
        r.draft.padEnd(14) +
        file.padEnd(30) +
        group.padEnd(35) +
        test.padEnd(30) +
        Math.round(r.tjsNs).toLocaleString().padStart(9) +
        Math.round(r.ajvNs).toLocaleString().padStart(9) +
        `${RED}${ratio}${RESET}`.padStart(17)
    );
  }
  console.log('─'.repeat(140));

  // Print fastest
  if (fastest.length > 0) {
    console.log('\nTop 20 Fastest vs AJV (where tjs wins)');
    console.log('─'.repeat(140));
    console.log(
      '#'.padEnd(4) +
        'Draft'.padEnd(14) +
        'File'.padEnd(30) +
        'Group'.padEnd(35) +
        'Test'.padEnd(30) +
        'tjs ns'.padStart(9) +
        'ajv ns'.padStart(9) +
        'ratio'.padStart(8)
    );
    console.log('─'.repeat(140));

    for (let i = 0; i < fastest.length; i++) {
      const r = fastest[i];
      const file = r.file.length > 28 ? r.file.slice(0, 25) + '...' : r.file;
      const group = r.groupDesc.length > 33 ? r.groupDesc.slice(0, 30) + '...' : r.groupDesc;
      const test = r.testDesc.length > 28 ? r.testDesc.slice(0, 25) + '...' : r.testDesc;
      const ratio = r.tjsNs > 0 ? (r.ajvNs / r.tjsNs).toFixed(1) + 'x' : '∞';
      console.log(
        `${i + 1}`.padEnd(4) +
          r.draft.padEnd(14) +
          file.padEnd(30) +
          group.padEnd(35) +
          test.padEnd(30) +
          Math.round(r.tjsNs).toLocaleString().padStart(9) +
          Math.round(r.ajvNs).toLocaleString().padStart(9) +
          `${GREEN}${ratio}${RESET}`.padStart(17)
      );
    }
    console.log('─'.repeat(140));
  }

  // Summary
  const totalTjsNs = results.reduce((sum, r) => sum + r.tjsNs, 0);
  const totalAjvNs = results.reduce((sum, r) => sum + r.ajvNs, 0);
  const avgTjsNs = totalTjsNs / results.length;
  const avgAjvNs = totalAjvNs / results.length;
  const diffPercent = avgAjvNs > 0 ? ((avgTjsNs - avgAjvNs) / avgAjvNs) * 100 : 0;
  const color = diffPercent <= 0 ? GREEN : RED;
  const sign = diffPercent <= 0 ? '' : '+';

  console.log(
    `\nSummary: ${results.length} tests, avg tjs: ${Math.round(avgTjsNs)}ns, avg ajv: ${Math.round(avgAjvNs)}ns (${color}${sign}${Math.round(diffPercent)}%${RESET})`
  );
}

type Validator = 'tjs' | 'ajv' | 'zod' | 'joi';

async function main() {
  const args = process.argv.slice(2);
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;
  let complianceOnly = false;
  let perTestMode = false;
  let jsonOutput = false;
  const validators: Validator[] = [];

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
      jsonOutput = true;
    } else if (arg === '--validator' || arg === '-v') {
      const v = args[++i]?.toLowerCase();
      if (v && ['tjs', 'ajv', 'zod', 'joi'].includes(v)) {
        validators.push(v as Validator);
      }
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }

  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12');
  }

  // Default to ajv; only one comparison validator at a time
  const runTjs = true; // Always run tjs
  const compareValidator = validators.length > 0 ? validators[0] : 'ajv';
  const runAjv = compareValidator === 'ajv';
  const runZod = compareValidator === 'zod';
  const runJoi = compareValidator === 'joi';

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
    ajvPass: number;
    ajvFail: number;
    zodPass: number;
    zodFail: number;
    joiPass: number;
    joiFail: number;
  }

  const allPrepared: PreparedFile[] = [];

  // Track compliance across ALL tests (not just benchmarkable ones)
  interface DraftCompliance {
    tjsPass: number;
    tjsFail: number;
    ajvPass: number;
    ajvFail: number;
    zodPass: number;
    zodFail: number;
    joiPass: number;
    joiFail: number;
  }
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
      ajvPass: 0,
      ajvFail: 0,
      zodPass: 0,
      zodFail: 0,
      joiPass: 0,
      joiFail: 0,
    };

    for (const { file, relativePath, isFormat } of testFiles) {
      const {
        compiledTests,
        tjsPass,
        tjsFail,
        ajvPass,
        ajvFail,
        zodPass,
        zodFail,
        joiPass,
        joiFail,
      } = compileFileTests(file, draft, remotes, isFormat);

      // Always track compliance counts (even if no benchmarkable tests)
      draftCompliance[draft].tjsPass += tjsPass;
      draftCompliance[draft].tjsFail += tjsFail;
      draftCompliance[draft].ajvPass += ajvPass;
      draftCompliance[draft].ajvFail += ajvFail;
      draftCompliance[draft].zodPass += zodPass;
      draftCompliance[draft].zodFail += zodFail;
      draftCompliance[draft].joiPass += joiPass;
      draftCompliance[draft].joiFail += joiFail;

      if (compiledTests.length > 0) {
        allPrepared.push({
          draft,
          filePath: relativePath,
          compiledTests,
          tjsPass,
          tjsFail,
          ajvPass,
          ajvFail,
          zodPass,
          zodFail,
          joiPass,
          joiFail,
        });
      }
    }

    // Print compliance summary for this draft (from total counts, not just benchmarkable files)
    const { tjsPass, tjsFail, ajvPass, ajvFail, zodPass, zodFail, joiPass, joiFail } =
      draftCompliance[draft];
    console.log(
      `  tjs: ${tjsPass}/${tjsPass + tjsFail} (${tjsFail} failures), ajv: ${ajvPass}/${ajvPass + ajvFail} (${ajvFail} failures), zod: ${zodPass}/${zodPass + zodFail} (${zodFail} failures), joi: ${joiPass}/${joiPass + joiFail} (${joiFail} failures)`
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
    await runPerTestBenchmark(drafts, filter, remotes, measureOpts);
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
        if (runTjs) t.tjsValidator(t.data);
        if (runAjv) t.ajvValidator(t.data);
        if (runZod && t.zodValidator) t.zodValidator(t.data);
        if (runJoi && t.joiValidator) t.joiValidator(t.data);
      }
    }
  }
  console.log('Warmup complete.\n');

  // Benchmark each file
  const results: FileResult[] = [];

  for (let i = 0; i < allPrepared.length; i++) {
    const {
      draft,
      filePath,
      compiledTests,
      tjsPass,
      tjsFail,
      ajvPass,
      ajvFail,
      zodPass,
      zodFail,
      joiPass,
      joiFail,
    } = allPrepared[i];

    // Check if Zod/Joi are available for all tests in this file
    const hasZod = runZod && compiledTests.every((t) => t.zodValidator !== null);
    const hasJoi = runJoi && compiledTests.every((t) => t.joiValidator !== null);

    // Benchmark tjs
    let tjsNs = 0;
    if (runTjs) {
      const tjsResult = await measure(() => {
        for (const t of compiledTests) {
          t.tjsValidator(t.data);
        }
      }, measureOpts);
      tjsNs = ((tjsResult as any).p50 ?? tjsResult.avg) / compiledTests.length;
    }

    // Benchmark ajv
    let ajvNs = 0;
    if (runAjv) {
      const ajvResult = await measure(() => {
        for (const t of compiledTests) {
          t.ajvValidator(t.data);
        }
      }, measureOpts);
      ajvNs = ((ajvResult as any).p50 ?? ajvResult.avg) / compiledTests.length;
    }

    // Benchmark zod (if available)
    let zodNs = 0;
    if (hasZod) {
      const zodResult = await measure(() => {
        for (const t of compiledTests) {
          t.zodValidator!(t.data);
        }
      }, measureOpts);
      zodNs = ((zodResult as any).p50 ?? zodResult.avg) / compiledTests.length;
    }

    // Benchmark joi (if available)
    let joiNs = 0;
    if (hasJoi) {
      const joiResult = await measure(() => {
        for (const t of compiledTests) {
          t.joiValidator!(t.data);
        }
      }, measureOpts);
      joiNs = ((joiResult as any).p50 ?? joiResult.avg) / compiledTests.length;
    }

    results.push({
      draft,
      file: filePath,
      testCount: compiledTests.length,
      tjsNs,
      ajvNs,
      zodNs,
      joiNs,
      tjsPass,
      tjsFail,
      ajvPass,
      ajvFail,
      zodPass,
      zodFail,
      joiPass,
      joiFail,
    });

    // Print progress
    const percent = Math.round(((i + 1) / allPrepared.length) * 100);
    let status = '';
    if (runAjv && ajvNs > 0) {
      const ratio = tjsNs / ajvNs;
      status =
        ratio > 1
          ? `${RED}+${Math.round((ratio - 1) * 100)}%${RESET}`
          : `${GREEN}-${Math.round((1 - ratio) * 100)}%${RESET}`;
    }
    console.log(`${percent}% ${draft} ${filePath} ${status}`);
  }

  console.log('');

  // JSON output mode - output structured data and exit
  if (jsonOutput) {
    // Compute head-to-head stats for JSON
    const computeH2HJson = (
      validatorA: string,
      validatorB: string,
      getNsA: (r: FileResult) => number,
      getNsB: (r: FileResult) => number,
      isAvailable: (r: FileResult) => boolean
    ) => {
      const applicable = results.filter((r) => isAvailable(r) && getNsA(r) > 0 && getNsB(r) > 0);
      if (applicable.length === 0) return null;

      const totalA = applicable.reduce((sum, r) => sum + getNsA(r) * r.testCount, 0);
      const totalB = applicable.reduce((sum, r) => sum + getNsB(r) * r.testCount, 0);
      const totalTests = applicable.reduce((sum, r) => sum + r.testCount, 0);
      const avgA = totalA / totalTests;
      const avgB = totalB / totalTests;
      const faster = avgA < avgB ? validatorA : validatorB;
      const ratio = avgA < avgB ? avgB / avgA : avgA / avgB;

      return { validatorA, validatorB, avgNsA: avgA, avgNsB: avgB, faster, ratio, totalTests };
    };

    const jsonData = {
      results: results.map((r) => ({
        draft: r.draft,
        file: r.file,
        testCount: r.testCount,
        tjs: { nsPerTest: r.tjsNs, pass: r.tjsPass, fail: r.tjsFail },
        ajv: { nsPerTest: r.ajvNs, pass: r.ajvPass, fail: r.ajvFail },
        zod: { nsPerTest: r.zodNs, pass: r.zodPass, fail: r.zodFail },
        joi: { nsPerTest: r.joiNs, pass: r.joiPass, fail: r.joiFail },
      })),
      summary: Object.fromEntries(
        drafts.map((draft) => {
          const draftResults = results.filter((r) => r.draft === draft);
          const compliance = draftCompliance[draft];
          const testCount = draftResults.reduce((sum, r) => sum + r.testCount, 0);
          const tjsTotalNs = draftResults.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
          const ajvTotalNs = draftResults.reduce((sum, r) => sum + r.ajvNs * r.testCount, 0);
          const zodTotalNs = draftResults.reduce((sum, r) => sum + r.zodNs * r.testCount, 0);
          const joiTotalNs = draftResults.reduce((sum, r) => sum + r.joiNs * r.testCount, 0);
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
              ajv: {
                nsPerTest: testCount > 0 ? ajvTotalNs / testCount : 0,
                pass: compliance.ajvPass,
                fail: compliance.ajvFail,
              },
              zod: {
                nsPerTest: testCount > 0 ? zodTotalNs / testCount : 0,
                pass: compliance.zodPass,
                fail: compliance.zodFail,
              },
              joi: {
                nsPerTest: testCount > 0 ? joiTotalNs / testCount : 0,
                pass: compliance.joiPass,
                fail: compliance.joiFail,
              },
            },
          ];
        })
      ),
      headToHead: {
        tjsVsAjv: computeH2HJson(
          'tjs',
          'ajv',
          (r) => r.tjsNs,
          (r) => r.ajvNs,
          () => true
        ),
        tjsVsZod: computeH2HJson(
          'tjs',
          'zod',
          (r) => r.tjsNs,
          (r) => r.zodNs,
          (r) => r.zodNs > 0
        ),
        tjsVsJoi: computeH2HJson(
          'tjs',
          'joi',
          (r) => r.tjsNs,
          (r) => r.joiNs,
          (r) => r.joiNs > 0
        ),
        ajvVsZod: computeH2HJson(
          'ajv',
          'zod',
          (r) => r.ajvNs,
          (r) => r.zodNs,
          (r) => r.zodNs > 0
        ),
        ajvVsJoi: computeH2HJson(
          'ajv',
          'joi',
          (r) => r.ajvNs,
          (r) => r.joiNs,
          (r) => r.joiNs > 0
        ),
      },
    };

    console.log(JSON.stringify(jsonData, null, 2));
    return;
  }

  // Sort results - weight by total time impact (per-test diff × test count)
  const slowestVsAjv = results
    .filter((r) => r.tjsNs > r.ajvNs)
    .sort((a, b) => (b.tjsNs - b.ajvNs) * b.testCount - (a.tjsNs - a.ajvNs) * a.testCount)
    .slice(0, 15);

  const fastestVsAjv = results
    .filter((r) => r.tjsNs < r.ajvNs)
    .sort((a, b) => (b.ajvNs - b.tjsNs) * b.testCount - (a.ajvNs - a.tjsNs) * a.testCount)
    .slice(0, 15);

  // Top slowest vs AJV
  console.log('═'.repeat(120));
  console.log('Top 15 Slowest vs AJV (where tjs loses) - sorted by total impact');
  console.log('─'.repeat(120));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'File'.padEnd(40) +
      'Tests'.padStart(6) +
      'tjs ns'.padStart(9) +
      'ajv ns'.padStart(9) +
      'diff/test'.padStart(10) +
      'total diff'.padStart(12) +
      'ratio'.padStart(8)
  );
  console.log('─'.repeat(120));

  for (let i = 0; i < slowestVsAjv.length; i++) {
    const r = slowestVsAjv[i];
    const name = r.file.length > 38 ? r.file.slice(0, 35) + '...' : r.file;
    const diffPerTest = Math.round(r.tjsNs - r.ajvNs);
    const totalDiff = Math.round((r.tjsNs - r.ajvNs) * r.testCount);
    const ratio = r.ajvNs > 0 ? (r.tjsNs / r.ajvNs).toFixed(1) + 'x' : '∞';
    console.log(
      `${i + 1}`.padEnd(4) +
        r.draft.padEnd(14) +
        name.padEnd(40) +
        r.testCount.toString().padStart(6) +
        Math.round(r.tjsNs).toLocaleString().padStart(9) +
        Math.round(r.ajvNs).toLocaleString().padStart(9) +
        `+${diffPerTest.toLocaleString()}`.padStart(10) +
        `${RED}+${totalDiff.toLocaleString()}${RESET}`.padStart(21) +
        ratio.padStart(8)
    );
  }
  console.log('─'.repeat(120));

  // Top fastest vs AJV
  if (fastestVsAjv.length > 0) {
    console.log('\nTop 15 Fastest vs AJV (where tjs wins) - sorted by total impact');
    console.log('─'.repeat(120));
    console.log(
      '#'.padEnd(4) +
        'Draft'.padEnd(14) +
        'File'.padEnd(40) +
        'Tests'.padStart(6) +
        'tjs ns'.padStart(9) +
        'ajv ns'.padStart(9) +
        'saved/test'.padStart(11) +
        'total saved'.padStart(12) +
        'ratio'.padStart(8)
    );
    console.log('─'.repeat(120));

    for (let i = 0; i < fastestVsAjv.length; i++) {
      const r = fastestVsAjv[i];
      const name = r.file.length > 38 ? r.file.slice(0, 35) + '...' : r.file;
      const savedPerTest = Math.round(r.ajvNs - r.tjsNs);
      const totalSaved = Math.round((r.ajvNs - r.tjsNs) * r.testCount);
      const ratio = r.tjsNs > 0 ? (r.ajvNs / r.tjsNs).toFixed(1) + 'x' : '∞';
      console.log(
        `${i + 1}`.padEnd(4) +
          r.draft.padEnd(14) +
          name.padEnd(40) +
          r.testCount.toString().padStart(6) +
          Math.round(r.tjsNs).toLocaleString().padStart(9) +
          Math.round(r.ajvNs).toLocaleString().padStart(9) +
          `-${savedPerTest.toLocaleString()}`.padStart(11) +
          `${GREEN}-${totalSaved.toLocaleString()}${RESET}`.padStart(21) +
          ratio.padStart(8)
      );
    }
    console.log('─'.repeat(120));
  }

  // Overall summary by draft
  console.log('\n' + '═'.repeat(160));
  console.log('OVERALL PERFORMANCE SUMMARY');
  console.log('─'.repeat(160));
  console.log(
    'Draft'.padEnd(14) +
      'Files'.padStart(6) +
      'Tests'.padStart(8) +
      ' │' +
      'tjs ns'.padStart(10) +
      'ajv ns'.padStart(10) +
      'zod ns'.padStart(10) +
      'joi ns'.padStart(10) +
      ' │' +
      'tjs pass'.padStart(10) +
      'tjs fail'.padStart(10) +
      'ajv fail'.padStart(10) +
      'zod fail'.padStart(10) +
      'joi fail'.padStart(10)
  );
  console.log('─'.repeat(160));

  let totalTjsNs = 0,
    totalAjvNs = 0,
    totalZodNs = 0,
    totalJoiNs = 0,
    totalTests2 = 0,
    totalFiles = 0;
  let totalTjsPass = 0,
    totalTjsFail = 0,
    totalAjvFail = 0,
    totalZodFail = 0,
    totalJoiFail = 0;

  for (const draft of drafts) {
    const draftResults = results.filter((r) => r.draft === draft);
    const fileCount = draftResults.length;
    const testCount = draftResults.reduce((sum, r) => sum + r.testCount, 0);
    const tjsTotalNs = draftResults.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
    const ajvTotalNs = draftResults.reduce((sum, r) => sum + r.ajvNs * r.testCount, 0);
    const zodTotalNs = draftResults.reduce((sum, r) => sum + r.zodNs * r.testCount, 0);
    const joiTotalNs = draftResults.reduce((sum, r) => sum + r.joiNs * r.testCount, 0);

    // Use draftCompliance for pass/fail counts (includes ALL tests, not just benchmarkable ones)
    const compliance = draftCompliance[draft] || {
      tjsPass: 0,
      tjsFail: 0,
      ajvPass: 0,
      ajvFail: 0,
      zodPass: 0,
      zodFail: 0,
      joiPass: 0,
      joiFail: 0,
    };
    const tjsPass = compliance.tjsPass;
    const tjsFail = compliance.tjsFail;
    const ajvFail = compliance.ajvFail;
    const zodFail = compliance.zodFail;
    const joiFail = compliance.joiFail;

    const tjsNsPerTest = testCount > 0 ? tjsTotalNs / testCount : 0;
    const ajvNsPerTest = testCount > 0 ? ajvTotalNs / testCount : 0;
    const zodNsPerTest = testCount > 0 ? zodTotalNs / testCount : 0;
    const joiNsPerTest = testCount > 0 ? joiTotalNs / testCount : 0;

    console.log(
      draft.padEnd(14) +
        fileCount.toString().padStart(6) +
        testCount.toString().padStart(8) +
        ' │' +
        Math.round(tjsNsPerTest).toLocaleString().padStart(10) +
        Math.round(ajvNsPerTest).toLocaleString().padStart(10) +
        Math.round(zodNsPerTest).toLocaleString().padStart(10) +
        Math.round(joiNsPerTest).toLocaleString().padStart(10) +
        ' │' +
        `${GREEN}${tjsPass}${RESET}`.padStart(19) +
        `${tjsFail > 0 ? RED : DIM}${tjsFail}${RESET}`.padStart(19) +
        `${ajvFail > 0 ? RED : DIM}${ajvFail}${RESET}`.padStart(19) +
        `${zodFail > 0 ? RED : DIM}${zodFail}${RESET}`.padStart(19) +
        `${joiFail > 0 ? RED : DIM}${joiFail}${RESET}`.padStart(19)
    );

    totalTjsNs += tjsTotalNs;
    totalAjvNs += ajvTotalNs;
    totalZodNs += zodTotalNs;
    totalJoiNs += joiTotalNs;
    totalTests2 += testCount;
    totalFiles += fileCount;
    totalTjsPass += tjsPass;
    totalTjsFail += tjsFail;
    totalAjvFail += ajvFail;
    totalZodFail += zodFail;
    totalJoiFail += joiFail;
  }

  console.log('─'.repeat(160));
  const totalTjsNsPerTest = totalTests2 > 0 ? totalTjsNs / totalTests2 : 0;
  const totalAjvNsPerTest = totalTests2 > 0 ? totalAjvNs / totalTests2 : 0;
  const totalZodNsPerTest = totalTests2 > 0 ? totalZodNs / totalTests2 : 0;
  const totalJoiNsPerTest = totalTests2 > 0 ? totalJoiNs / totalTests2 : 0;

  console.log(
    'TOTAL'.padEnd(14) +
      totalFiles.toString().padStart(6) +
      totalTests2.toString().padStart(8) +
      ' │' +
      Math.round(totalTjsNsPerTest).toLocaleString().padStart(10) +
      Math.round(totalAjvNsPerTest).toLocaleString().padStart(10) +
      Math.round(totalZodNsPerTest).toLocaleString().padStart(10) +
      Math.round(totalJoiNsPerTest).toLocaleString().padStart(10) +
      ' │' +
      `${GREEN}${totalTjsPass}${RESET}`.padStart(19) +
      `${totalTjsFail > 0 ? RED : DIM}${totalTjsFail}${RESET}`.padStart(19) +
      `${totalAjvFail > 0 ? RED : DIM}${totalAjvFail}${RESET}`.padStart(19) +
      `${totalZodFail > 0 ? RED : DIM}${totalZodFail}${RESET}`.padStart(19) +
      `${totalJoiFail > 0 ? RED : DIM}${totalJoiFail}${RESET}`.padStart(19)
  );
  console.log('─'.repeat(160));

  // Head-to-head comparisons (only on tests where BOTH validators pass all tests in the group)
  console.log('\n' + '═'.repeat(100));
  console.log('HEAD-TO-HEAD COMPARISONS (on mutually passing test groups only)');
  console.log('─'.repeat(100));

  // Helper to compute head-to-head stats
  const computeH2H = (
    validatorA: string,
    validatorB: string,
    getNsA: (r: FileResult) => number,
    getNsB: (r: FileResult) => number,
    isAvailable: (r: FileResult) => boolean
  ) => {
    const applicable = results.filter((r) => isAvailable(r) && getNsA(r) > 0 && getNsB(r) > 0);
    if (applicable.length === 0) return null;

    const totalA = applicable.reduce((sum, r) => sum + getNsA(r) * r.testCount, 0);
    const totalB = applicable.reduce((sum, r) => sum + getNsB(r) * r.testCount, 0);
    const totalTests = applicable.reduce((sum, r) => sum + r.testCount, 0);
    const avgA = totalA / totalTests;
    const avgB = totalB / totalTests;
    const faster = avgA < avgB ? validatorA : validatorB;
    const ratio = avgA < avgB ? avgB / avgA : avgA / avgB;
    const diffPercent = ((avgA - avgB) / avgB) * 100;

    return {
      validatorA,
      validatorB,
      avgA,
      avgB,
      faster,
      ratio,
      diffPercent,
      totalTests,
      fileCount: applicable.length,
    };
  };

  // tjs vs ajv
  const tjsVsAjv = computeH2H(
    'tjs',
    'ajv',
    (r) => r.tjsNs,
    (r) => r.ajvNs,
    () => true
  );
  if (tjsVsAjv) {
    const color = tjsVsAjv.faster === 'tjs' ? GREEN : RED;
    console.log(
      `tjs vs ajv:  ${color}${tjsVsAjv.faster} is ${tjsVsAjv.ratio.toFixed(2)}x faster${RESET} ` +
        `(${Math.round(tjsVsAjv.avgA)} ns vs ${Math.round(tjsVsAjv.avgB)} ns, ${tjsVsAjv.totalTests} tests)`
    );
  }

  // tjs vs zod
  const tjsVsZod = computeH2H(
    'tjs',
    'zod',
    (r) => r.tjsNs,
    (r) => r.zodNs,
    (r) => r.zodNs > 0
  );
  if (tjsVsZod) {
    const color = tjsVsZod.faster === 'tjs' ? GREEN : RED;
    console.log(
      `tjs vs zod:  ${color}${tjsVsZod.faster} is ${tjsVsZod.ratio.toFixed(1)}x faster${RESET} ` +
        `(${Math.round(tjsVsZod.avgA)} ns vs ${Math.round(tjsVsZod.avgB).toLocaleString()} ns, ${tjsVsZod.totalTests} tests)`
    );
  }

  // tjs vs joi
  const tjsVsJoi = computeH2H(
    'tjs',
    'joi',
    (r) => r.tjsNs,
    (r) => r.joiNs,
    (r) => r.joiNs > 0
  );
  if (tjsVsJoi) {
    const color = tjsVsJoi.faster === 'tjs' ? GREEN : RED;
    console.log(
      `tjs vs joi:  ${color}${tjsVsJoi.faster} is ${tjsVsJoi.ratio.toFixed(2)}x faster${RESET} ` +
        `(${Math.round(tjsVsJoi.avgA)} ns vs ${Math.round(tjsVsJoi.avgB)} ns, ${tjsVsJoi.totalTests} tests)`
    );
  }

  // ajv vs zod
  const ajvVsZod = computeH2H(
    'ajv',
    'zod',
    (r) => r.ajvNs,
    (r) => r.zodNs,
    (r) => r.zodNs > 0
  );
  if (ajvVsZod) {
    const color = ajvVsZod.faster === 'ajv' ? GREEN : RED;
    console.log(
      `ajv vs zod:  ${color}${ajvVsZod.faster} is ${ajvVsZod.ratio.toFixed(1)}x faster${RESET} ` +
        `(${Math.round(ajvVsZod.avgA)} ns vs ${Math.round(ajvVsZod.avgB).toLocaleString()} ns, ${ajvVsZod.totalTests} tests)`
    );
  }

  // ajv vs joi
  const ajvVsJoi = computeH2H(
    'ajv',
    'joi',
    (r) => r.ajvNs,
    (r) => r.joiNs,
    (r) => r.joiNs > 0
  );
  if (ajvVsJoi) {
    const color = ajvVsJoi.faster === 'ajv' ? GREEN : RED;
    console.log(
      `ajv vs joi:  ${color}${ajvVsJoi.faster} is ${ajvVsJoi.ratio.toFixed(2)}x faster${RESET} ` +
        `(${Math.round(ajvVsJoi.avgA)} ns vs ${Math.round(ajvVsJoi.avgB)} ns, ${ajvVsJoi.totalTests} tests)`
    );
  }

  console.log('─'.repeat(100));
}

main().catch(console.error);
