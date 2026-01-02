/**
 * Compare tjs vs ajv performance using mitata's measure() API.
 *
 * Uses mitata's measure() for stable, accurate measurements with progress output.
 * measure() auto-calibrates warmup and iterations.
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

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

// Known JSON Schema keywords for extraction
const SCHEMA_KEYWORDS = new Set([
  'type',
  'enum',
  'const',
  'multipleOf',
  'maximum',
  'exclusiveMaximum',
  'minimum',
  'exclusiveMinimum',
  'maxLength',
  'minLength',
  'pattern',
  'maxItems',
  'minItems',
  'uniqueItems',
  'maxContains',
  'minContains',
  'maxProperties',
  'minProperties',
  'required',
  'dependentRequired',
  'properties',
  'patternProperties',
  'additionalProperties',
  'propertyNames',
  'items',
  'prefixItems',
  'additionalItems',
  'contains',
  'unevaluatedItems',
  'unevaluatedProperties',
  'allOf',
  'anyOf',
  'oneOf',
  'not',
  'if',
  'then',
  'else',
  'dependentSchemas',
  'dependencies',
  '$ref',
  '$dynamicRef',
  '$recursiveRef',
  'format',
]);

function extractSchemaKeywords(schema: unknown, keywords = new Set<string>()): string[] {
  if (typeof schema !== 'object' || schema === null) return [];
  for (const [key, value] of Object.entries(schema)) {
    if (SCHEMA_KEYWORDS.has(key)) keywords.add(key);
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        for (const item of value) extractSchemaKeywords(item, keywords);
      } else {
        extractSchemaKeywords(value, keywords);
      }
    }
  }
  return Array.from(keywords).sort();
}

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

function loadTestSuites(draft: Draft, includeOptional: boolean = true): TestGroup[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const suites: TestGroup[] = [];

  const loadDir = (dir: string, isFormatTest: boolean = false) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        loadDir(fullPath, isFormatTest || entry.name === 'format');
      } else if (entry.name.endsWith('.json')) {
        const groups: TestGroup[] = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        if (isFormatTest) groups.forEach((g) => (g.isFormatTest = true));
        suites.push(...groups);
      }
    }
  };

  for (const filename of fs.readdirSync(suiteDir)) {
    if (!filename.endsWith('.json')) continue;
    const filepath = path.join(suiteDir, filename);
    if (!fs.statSync(filepath).isFile()) continue;
    suites.push(...JSON.parse(fs.readFileSync(filepath, 'utf-8')));
  }

  if (includeOptional) {
    loadDir(path.join(suiteDir, 'optional'));
  }

  return suites;
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
  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }
  return ajv;
}

function compileTestSuites(
  testSuites: TestGroup[],
  draft: Draft,
  remotes: Record<string, unknown>
): CompiledTestSuite[] {
  const sharedAjv = createAjv(draft, remotes, false);
  const sharedAjvWithFormat = createAjv(draft, remotes, true);

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
      const ajv = suite.isFormatTest ? sharedAjvWithFormat : sharedAjv;
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

interface SuiteResult {
  draft: string;
  description: string;
  tjsNs: number;
  ajvNs: number;
  testCount: number;
  schemaKeywords: string[];
  tjsPass: number;
  tjsFail: number;
  ajvPass: number;
  ajvFail: number;
}

async function main() {
  const args = process.argv.slice(2);
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;
  let complianceOnly = false;
  let quickMode = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--filter' || arg === '-f') {
      const pattern = args[++i];
      if (pattern) filter = new RegExp(pattern, 'i');
    } else if (arg === '--compliance-only' || arg === '-c') {
      complianceOnly = true;
    } else if (arg === '--quick' || arg === '-q') {
      quickMode = true;
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }

  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12');
  }

  // Benchmark options - quick mode uses fewer samples for faster feedback
  const measureOpts = quickMode
    ? { min_cpu_time: 50_000_000, min_samples: 8 } // 50ms, 8 samples
    : { min_cpu_time: 200_000_000, min_samples: 12 }; // 200ms, 12 samples

  console.log(`tjs vs ajv Benchmark (mitata measure API)${quickMode ? ' [QUICK]' : ''}`);
  if (filter) console.log(`Filter: ${filter}`);
  console.log('═'.repeat(100));

  const remotes = loadRemoteSchemas();

  // Collect all suites across drafts
  interface PreparedSuite {
    draft: Draft;
    suite: CompiledTestSuite;
    benchId: string;
  }

  const allPrepared: PreparedSuite[] = [];
  const complianceResults: Map<
    string,
    { tjsPass: number; tjsFail: number; ajvPass: number; ajvFail: number }
  > = new Map();

  for (const draft of drafts) {
    console.log(`\nLoading ${draft}...`);
    let testSuites = loadTestSuites(draft, true);
    if (filter) {
      testSuites = testSuites.filter((s) => filter!.test(s.description));
      console.log(`  Filtered to ${testSuites.length} schemas`);
    }

    const compiled = compileTestSuites(testSuites, draft, remotes);

    // Check compliance
    let tjsPass = 0,
      tjsFail = 0,
      ajvPass = 0,
      ajvFail = 0;
    for (const suite of compiled) {
      for (const test of suite.tests) {
        if (suite.tjsValidator) {
          try {
            if (suite.tjsValidator(test.data) === test.valid) tjsPass++;
            else tjsFail++;
          } catch {
            tjsFail++;
          }
        } else tjsFail++;

        if (suite.ajvValidator) {
          try {
            if (suite.ajvValidator(test.data) === test.valid) ajvPass++;
            else ajvFail++;
          } catch {
            ajvFail++;
          }
        } else ajvFail++;
      }
    }

    complianceResults.set(draft, { tjsPass, tjsFail, ajvPass, ajvFail });
    console.log(
      `  tjs: ${tjsPass}/${tjsPass + tjsFail} (${tjsFail} failures), ajv: ${ajvPass}/${ajvPass + ajvFail} (${ajvFail} failures)`
    );

    // Filter to suites where both validators work and both pass all tests
    const validSuites = compiled.filter((s) => {
      if (!s.tjsValidator || !s.ajvValidator) return false;
      for (const test of s.tests) {
        try {
          if (s.tjsValidator(test.data) !== test.valid) return false;
          if (s.ajvValidator(test.data) !== test.valid) return false;
        } catch {
          return false;
        }
      }
      return true;
    });

    for (const suite of validSuites) {
      const benchId = `${draft}::${suite.description}`;
      allPrepared.push({ draft, suite, benchId });
    }
  }

  if (complianceOnly) {
    console.log('\nCompliance check complete (benchmark skipped).');
    return;
  }

  console.log(`\nRunning ${allPrepared.length} benchmark suites...\n`);

  // Use measure() API for progress printing
  // measure() auto-calibrates warmup and iterations for stable results
  const suiteResults: Map<string, { tjsNs: number; ajvNs: number }> = new Map();

  const PROGRESS_WIDTH = 30;
  const YELLOW = '\x1b[33m';

  for (let i = 0; i < allPrepared.length; i++) {
    const { draft, suite, benchId } = allPrepared[i];
    const tjsValidator = suite.tjsValidator!;
    const ajvValidator = suite.ajvValidator!;
    const tests = suite.tests;

    // Progress bar
    const progress = (i + 1) / allPrepared.length;
    const filled = Math.round(progress * PROGRESS_WIDTH);
    const empty = PROGRESS_WIDTH - filled;
    const bar = `${GREEN}${'█'.repeat(filled)}${DIM}${'░'.repeat(empty)}${RESET}`;
    const percent = `${Math.round(progress * 100)}%`.padStart(4);

    // Truncate description to fit
    const maxDescLen = 40;
    const shortDesc =
      suite.description.length > maxDescLen
        ? suite.description.slice(0, maxDescLen - 3) + '...'
        : suite.description.padEnd(maxDescLen);

    // Draft badge
    const draftBadge = `${YELLOW}${draft.padEnd(12)}${RESET}`;

    process.stdout.write(`\r${bar} ${percent} ${draftBadge} ${shortDesc}`);

    // Benchmark tjs (measure() handles warmup automatically)
    const tjsResult = await measure(() => {
      for (const test of tests) {
        tjsValidator(test.data);
      }
    }, measureOpts);

    // Benchmark ajv
    const ajvResult = await measure(() => {
      for (const test of tests) {
        ajvValidator(test.data);
      }
    }, measureOpts);

    const tjsNs = tjsResult.avg;
    const ajvNs = ajvResult.avg;
    suiteResults.set(benchId, { tjsNs, ajvNs });

    // Update progress bar color based on result
    const ratio = ajvNs > 0 ? tjsNs / ajvNs : 0;
    const barColor = ratio > 1 ? RED : GREEN;
    const updatedBar = `${barColor}${'█'.repeat(filled)}${DIM}${'░'.repeat(empty)}${RESET}`;
    process.stdout.write(`\r${updatedBar} ${percent} ${draftBadge} ${shortDesc}`);
  }
  // Clear the progress line
  process.stdout.write('\r' + ' '.repeat(100) + '\r');
  console.log('Done!\n');

  // Build final results
  const finalResults: SuiteResult[] = [];
  for (const { draft, suite, benchId } of allPrepared) {
    const timing = suiteResults.get(benchId);
    if (!timing) continue;

    // Divide by test count to get per-test timing
    const testCount = suite.tests.length;
    finalResults.push({
      draft,
      description: suite.description,
      tjsNs: timing.tjsNs / testCount,
      ajvNs: timing.ajvNs / testCount,
      testCount,
      schemaKeywords: extractSchemaKeywords(suite.schema),
      tjsPass: testCount, // All pass (we filtered)
      tjsFail: 0,
      ajvPass: testCount,
      ajvFail: 0,
    });
  }

  // Sort and display results
  const slowestVsAjv = finalResults
    .filter((s) => s.tjsNs > s.ajvNs)
    .sort((a, b) => b.tjsNs - b.ajvNs - (a.tjsNs - a.ajvNs))
    .slice(0, 10);

  const fastestVsAjv = finalResults
    .filter((s) => s.tjsNs < s.ajvNs)
    .sort((a, b) => b.ajvNs - b.tjsNs - (a.ajvNs - a.tjsNs))
    .slice(0, 10);

  // Top 10 slowest overall (by absolute tjs time)
  const slowestOverall = [...finalResults].sort((a, b) => b.tjsNs - a.tjsNs).slice(0, 10);

  // Top 10 slowest overall
  console.log('═'.repeat(100));
  console.log('Top 10 Slowest Overall (by tjs ns)');
  console.log('─'.repeat(110));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'Test'.padEnd(42) +
      'tjs ns'.padStart(10) +
      'ajv ns'.padStart(10) +
      'diff'.padStart(12) +
      'ratio'.padStart(8) +
      'kw'.padStart(6)
  );
  console.log('─'.repeat(110));

  for (let i = 0; i < slowestOverall.length; i++) {
    const s = slowestOverall[i];
    const name = s.description.length > 40 ? s.description.slice(0, 37) + '...' : s.description;
    const diffNs = Math.round(s.tjsNs - s.ajvNs);
    const ratio = s.ajvNs > 0 ? (s.tjsNs / s.ajvNs).toFixed(1) + 'x' : '∞';
    const diffColor = diffNs > 0 ? RED : GREEN;
    const diffSign = diffNs > 0 ? '+' : '';
    console.log(
      `${i + 1}`.padEnd(4) +
        s.draft.padEnd(14) +
        name.padEnd(42) +
        Math.round(s.tjsNs).toLocaleString().padStart(10) +
        Math.round(s.ajvNs).toLocaleString().padStart(10) +
        `${diffColor}${diffSign}${diffNs.toLocaleString()}${RESET}`.padStart(21) +
        ratio.padStart(8) +
        s.schemaKeywords.length.toString().padStart(6)
    );
  }
  console.log('─'.repeat(110));

  // Top 10 slowest vs AJV
  console.log('\nTop 10 Slowest vs AJV (where tjs loses)');
  console.log('─'.repeat(110));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'Test'.padEnd(42) +
      'tjs ns'.padStart(10) +
      'ajv ns'.padStart(10) +
      'diff'.padStart(12) +
      'ratio'.padStart(8) +
      'kw'.padStart(6)
  );
  console.log('─'.repeat(110));

  for (let i = 0; i < slowestVsAjv.length; i++) {
    const s = slowestVsAjv[i];
    const name = s.description.length > 40 ? s.description.slice(0, 37) + '...' : s.description;
    const diffNs = Math.round(s.tjsNs - s.ajvNs);
    const ratio = s.ajvNs > 0 ? (s.tjsNs / s.ajvNs).toFixed(1) + 'x' : '∞';
    console.log(
      `${i + 1}`.padEnd(4) +
        s.draft.padEnd(14) +
        name.padEnd(42) +
        Math.round(s.tjsNs).toLocaleString().padStart(10) +
        Math.round(s.ajvNs).toLocaleString().padStart(10) +
        `${RED}+${diffNs.toLocaleString()}${RESET}`.padStart(21) +
        ratio.padStart(8) +
        s.schemaKeywords.length.toString().padStart(6)
    );
  }
  console.log('─'.repeat(110));

  // Top 10 fastest
  if (fastestVsAjv.length > 0) {
    console.log('\nTop 10 Fastest vs AJV (where tjs wins)');
    console.log('─'.repeat(106));
    console.log(
      '#'.padEnd(4) +
        'Draft'.padEnd(14) +
        'Test'.padEnd(42) +
        'tjs ns'.padStart(10) +
        'ajv ns'.padStart(10) +
        'saved'.padStart(12) +
        'ratio'.padStart(8)
    );
    console.log('─'.repeat(106));

    for (let i = 0; i < fastestVsAjv.length; i++) {
      const s = fastestVsAjv[i];
      const name = s.description.length > 40 ? s.description.slice(0, 37) + '...' : s.description;
      const savedNs = Math.round(s.ajvNs - s.tjsNs);
      const ratio = s.tjsNs > 0 ? (s.ajvNs / s.tjsNs).toFixed(1) + 'x' : '∞';
      console.log(
        `${i + 1}`.padEnd(4) +
          s.draft.padEnd(14) +
          name.padEnd(42) +
          Math.round(s.tjsNs).toLocaleString().padStart(10) +
          Math.round(s.ajvNs).toLocaleString().padStart(10) +
          `${GREEN}-${savedNs.toLocaleString()}${RESET}`.padStart(21) +
          ratio.padStart(8)
      );
    }
    console.log('─'.repeat(106));
  }

  // Overall summary by draft
  console.log('\n' + '═'.repeat(100));
  console.log('OVERALL PERFORMANCE SUMMARY');
  console.log('─'.repeat(100));
  console.log(
    'Draft'.padEnd(14) +
      'Tests'.padStart(8) +
      ' │' +
      'tjs ns/test'.padStart(12) +
      'ajv ns/test'.padStart(12) +
      'Diff'.padStart(10) +
      ' │' +
      'tjs pass'.padStart(10) +
      'tjs fail'.padStart(10) +
      'ajv pass'.padStart(10) +
      'ajv fail'.padStart(10)
  );
  console.log('─'.repeat(100));

  let totalTjsNs = 0,
    totalAjvNs = 0,
    totalTests = 0;
  let totalTjsPass = 0,
    totalTjsFail = 0,
    totalAjvPass = 0,
    totalAjvFail = 0;

  for (const draft of drafts) {
    const draftResults = finalResults.filter((r) => r.draft === draft);
    const testCount = draftResults.reduce((sum, r) => sum + r.testCount, 0);
    const tjsTotalNs = draftResults.reduce((sum, r) => sum + r.tjsNs * r.testCount, 0);
    const ajvTotalNs = draftResults.reduce((sum, r) => sum + r.ajvNs * r.testCount, 0);

    const compliance = complianceResults.get(draft) || {
      tjsPass: 0,
      tjsFail: 0,
      ajvPass: 0,
      ajvFail: 0,
    };

    const tjsNsPerTest = testCount > 0 ? tjsTotalNs / testCount : 0;
    const ajvNsPerTest = testCount > 0 ? ajvTotalNs / testCount : 0;
    const diff =
      ajvNsPerTest > 0 ? Math.round(((tjsNsPerTest - ajvNsPerTest) / ajvNsPerTest) * 100) : 0;
    const color = diff <= 0 ? GREEN : RED;
    const sign = diff <= 0 ? '' : '+';

    console.log(
      draft.padEnd(14) +
        testCount.toString().padStart(8) +
        ' │' +
        Math.round(tjsNsPerTest).toLocaleString().padStart(12) +
        Math.round(ajvNsPerTest).toLocaleString().padStart(12) +
        `${color}${sign}${diff}%${RESET}`.padStart(19) +
        ' │' +
        `${GREEN}${compliance.tjsPass}${RESET}`.padStart(19) +
        `${compliance.tjsFail > 0 ? RED : DIM}${compliance.tjsFail}${RESET}`.padStart(19) +
        `${GREEN}${compliance.ajvPass}${RESET}`.padStart(19) +
        `${compliance.ajvFail > 0 ? RED : DIM}${compliance.ajvFail}${RESET}`.padStart(19)
    );

    totalTjsNs += tjsTotalNs;
    totalAjvNs += ajvTotalNs;
    totalTests += testCount;
    totalTjsPass += compliance.tjsPass;
    totalTjsFail += compliance.tjsFail;
    totalAjvPass += compliance.ajvPass;
    totalAjvFail += compliance.ajvFail;
  }

  console.log('─'.repeat(100));
  const totalTjsNsPerTest = totalTests > 0 ? totalTjsNs / totalTests : 0;
  const totalAjvNsPerTest = totalTests > 0 ? totalAjvNs / totalTests : 0;
  const totalDiff =
    totalAjvNsPerTest > 0
      ? Math.round(((totalTjsNsPerTest - totalAjvNsPerTest) / totalAjvNsPerTest) * 100)
      : 0;
  const totalColor = totalDiff <= 0 ? GREEN : RED;
  const totalSign = totalDiff <= 0 ? '' : '+';

  console.log(
    'TOTAL'.padEnd(14) +
      totalTests.toString().padStart(8) +
      ' │' +
      Math.round(totalTjsNsPerTest).toLocaleString().padStart(12) +
      Math.round(totalAjvNsPerTest).toLocaleString().padStart(12) +
      `${totalColor}${totalSign}${totalDiff}%${RESET}`.padStart(19) +
      ' │' +
      `${GREEN}${totalTjsPass}${RESET}`.padStart(19) +
      `${totalTjsFail > 0 ? RED : DIM}${totalTjsFail}${RESET}`.padStart(19) +
      `${GREEN}${totalAjvPass}${RESET}`.padStart(19) +
      `${totalAjvFail > 0 ? RED : DIM}${totalAjvFail}${RESET}`.padStart(19)
  );
  console.log('─'.repeat(100));
}

main().catch(console.error);
