import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestFiles } from '../tests/suite/loader.js';
import type { TestFile } from '../tests/suite/types.js';
import type { ValidatorAdapter, BenchmarkResult, Draft } from './types.js';
import { ajvAdapter } from './adapters/ajv.js';
import { tjsAdapter } from './adapters/tjs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Keywords to skip (not implemented or have known issues)
const SKIP_KEYWORDS = new Set([
  'unknownKeyword', // Meta-schema validation not implemented
]);

// Load remote schemas for refRemote tests
function loadRemoteSchemas(draft: Draft): Record<string, unknown> {
  const remotes: Record<string, unknown> = {};

  const loadDir = (dir: string, baseUrl: string) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // Skip other draft directories when loading root remotes
      if (
        entry.isDirectory() &&
        (entry.name.startsWith('draft') || entry.name === 'draft2019-09')
      ) {
        continue;
      }
      if (entry.isDirectory()) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const schema = JSON.parse(content);
          const urlPath = `${baseUrl}${entry.name}`;
          remotes[urlPath] = schema;
          if (typeof schema === 'object' && schema !== null && schema.$id) {
            remotes[schema.$id] = schema;
          }
          // Also register by id for older drafts
          if (typeof schema === 'object' && schema !== null && schema.id) {
            remotes[schema.id] = schema;
          }
        } catch {
          // Skip invalid JSON files
        }
      }
    }
  };

  const remotesDir = path.join(__dirname, '../tests/json-schema-test-suite/remotes');
  loadDir(remotesDir, 'http://localhost:1234/');

  // Load draft-specific remotes
  const draftRemotesDir = path.join(remotesDir, draft);
  if (fs.existsSync(draftRemotesDir)) {
    loadDir(draftRemotesDir, `http://localhost:1234/${draft}/`);
  }

  return remotes;
}

interface CompiledTest {
  keyword: string;
  validate: (data: unknown) => boolean;
  tests: { data: unknown; valid: boolean }[];
}

interface CompileResult {
  compiled: CompiledTest[];
  skippedByKeyword: number;
  skippedByError: number;
  errors: string[];
}

function compileTests(
  files: TestFile[],
  adapter: ValidatorAdapter,
  remotes: Record<string, unknown>,
  draft: Draft
): CompileResult {
  const compiled: CompiledTest[] = [];
  let skippedByKeyword = 0;
  let skippedByError = 0;
  const errors: string[] = [];

  for (const file of files) {
    if (SKIP_KEYWORDS.has(file.name)) {
      for (const group of file.groups) {
        skippedByKeyword += group.tests.length;
      }
      continue;
    }

    for (const group of file.groups) {
      try {
        const validate = adapter.compile(group.schema, remotes, draft);
        compiled.push({
          keyword: file.name,
          validate,
          tests: group.tests.map((t) => ({ data: t.data, valid: t.valid })),
        });
      } catch (err) {
        errors.push(`${adapter.name}: Failed to compile ${file.name}/${group.description}: ${err}`);
        skippedByError += group.tests.length;
      }
    }
  }

  return { compiled, skippedByKeyword, skippedByError, errors };
}

interface BenchmarkRunResult {
  totalValidations: number;
  durationMs: number;
  byKeyword: Record<string, number>;
  correctCount: number;
  incorrectCount: number;
}

// Maximum variance allowed before retrying (1%)
const MAX_VARIANCE_PCT = 1;
// Maximum number of retry attempts
const MAX_RETRIES = 3;

/**
 * Calculate the coefficient of variation (relative standard deviation) as a percentage
 */
function calculateVariancePct(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 0;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return (stdDev / mean) * 100;
}

/**
 * Run a single timed benchmark pass and return ops/sec
 */
function runTimedPass(
  safeCompiled: CompiledTest[],
  iterations: number
): { durationMs: number; opsPerSec: number } {
  const totalTests = safeCompiled.reduce((sum, c) => sum + c.tests.length, 0);

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    for (const { validate, tests } of safeCompiled) {
      for (const test of tests) {
        validate(test.data);
      }
    }
  }
  const durationMs = performance.now() - start;
  const totalValidations = totalTests * iterations;
  const opsPerSec = Math.round((totalValidations / durationMs) * 1000);

  return { durationMs, opsPerSec };
}

function runBenchmark(compiled: CompiledTest[], iterations: number): BenchmarkRunResult {
  const keywordTimes: Record<string, number> = {};
  let correctCount = 0;
  let incorrectCount = 0;

  // Test each validator to ensure it doesn't throw/stack overflow and verify correctness
  const safeCompiled: CompiledTest[] = [];
  for (const c of compiled) {
    try {
      // Test that validation doesn't crash and produces correct results
      let allCorrect = true;
      for (const test of c.tests) {
        const result = c.validate(test.data);
        if (result === test.valid) {
          correctCount++;
        } else {
          incorrectCount++;
          allCorrect = false;
        }
      }
      // Only include in benchmark if all tests pass
      if (allCorrect) {
        safeCompiled.push(c);
      }
    } catch {
      // Skip tests that cause runtime errors (e.g., stack overflow)
      incorrectCount += c.tests.length;
    }
  }

  // Warmup (3 iterations)
  for (let i = 0; i < 3; i++) {
    for (const { validate, tests } of safeCompiled) {
      for (const test of tests) {
        validate(test.data);
      }
    }
  }

  // Run benchmark with variance checking and retry
  let attempts = 0;
  let results: { durationMs: number; opsPerSec: number }[] = [];

  while (attempts < MAX_RETRIES) {
    attempts++;

    // Run two passes
    const pass1 = runTimedPass(safeCompiled, iterations);
    const pass2 = runTimedPass(safeCompiled, iterations);
    results = [pass1, pass2];

    const variancePct = calculateVariancePct(results.map((r) => r.opsPerSec));

    if (variancePct <= MAX_VARIANCE_PCT) {
      break; // Variance is acceptable
    }

    // Variance too high, retry (unless we've hit max retries)
    if (attempts < MAX_RETRIES) {
      // Small delay to let system stabilize
      const delay = 10;
      const delayStart = performance.now();
      while (performance.now() - delayStart < delay) {
        // busy wait
      }
    }
  }

  // Use the average of the final results
  const avgDurationMs = results.reduce((sum, r) => sum + r.durationMs, 0) / results.length;
  const totalTests = safeCompiled.reduce((sum, c) => sum + c.tests.length, 0);
  const totalValidations = totalTests * iterations;

  // Calculate per-keyword ops/sec (run separately for accurate timing)
  // Apply same variance checking for per-keyword measurements
  const safeKeywords = new Set(safeCompiled.map((c) => c.keyword));
  for (const keyword of safeKeywords) {
    const keywordCompiled = safeCompiled.filter((c) => c.keyword === keyword);
    const keywordTests = keywordCompiled.reduce((sum, c) => sum + c.tests.length, 0);

    let kwAttempts = 0;
    let kwResults: number[] = [];

    while (kwAttempts < MAX_RETRIES) {
      kwAttempts++;

      // Run two passes for this keyword
      const kwPass1Start = performance.now();
      for (let i = 0; i < iterations; i++) {
        for (const { validate, tests } of keywordCompiled) {
          for (const test of tests) {
            validate(test.data);
          }
        }
      }
      const kwPass1Duration = performance.now() - kwPass1Start;
      const kwOps1 = Math.round((keywordTests * iterations) / (kwPass1Duration / 1000));

      const kwPass2Start = performance.now();
      for (let i = 0; i < iterations; i++) {
        for (const { validate, tests } of keywordCompiled) {
          for (const test of tests) {
            validate(test.data);
          }
        }
      }
      const kwPass2Duration = performance.now() - kwPass2Start;
      const kwOps2 = Math.round((keywordTests * iterations) / (kwPass2Duration / 1000));

      kwResults = [kwOps1, kwOps2];
      const kwVariancePct = calculateVariancePct(kwResults);

      if (kwVariancePct <= MAX_VARIANCE_PCT) {
        break;
      }
    }

    // Use average of results
    keywordTimes[keyword] = Math.round(kwResults.reduce((a, b) => a + b, 0) / kwResults.length);
  }

  return {
    totalValidations,
    durationMs: avgDurationMs,
    byKeyword: keywordTimes,
    correctCount,
    incorrectCount,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

interface DraftResult {
  draft: Draft;
  testCount: number;
  results: BenchmarkResult[];
}

function runDraftBenchmark(
  draft: Draft,
  adapters: ValidatorAdapter[],
  iterations: number,
  verbose: boolean
): DraftResult {
  const files = loadTestFiles({ draft, includeOptional: false });
  const remotes = loadRemoteSchemas(draft);
  const totalTestCount = files.reduce(
    (sum, f) => sum + f.groups.reduce((gs, g) => gs + g.tests.length, 0),
    0
  );

  const results: BenchmarkResult[] = [];

  for (const adapter of adapters) {
    const { compiled, skippedByKeyword, skippedByError, errors } = compileTests(
      files,
      adapter,
      remotes,
      draft
    );

    if (verbose && errors.length > 0) {
      console.log(`  ${adapter.name} compilation errors:`);
      for (const err of errors.slice(0, 3)) {
        console.log(`    ${err}`);
      }
      if (errors.length > 3) {
        console.log(`    ... and ${errors.length - 3} more`);
      }
    }

    const { totalValidations, durationMs, byKeyword, correctCount, incorrectCount } = runBenchmark(
      compiled,
      iterations
    );
    const opsPerSec = Math.round((totalValidations / durationMs) * 1000);

    results.push({
      validator: adapter.name,
      opsPerSec,
      totalValidations,
      durationMs,
      skipped: skippedByKeyword + skippedByError,
      correctCount,
      incorrectCount,
      byKeyword,
    });
  }

  return { draft, testCount: totalTestCount, results };
}

function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');
  const verbose = args.includes('--verbose') || args.includes('-v');
  const iterations = 100000;

  // Parse which drafts to run
  const drafts: Draft[] = [];
  for (const arg of args) {
    if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }

  // Default to all drafts if none specified
  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2020-12');
  }

  const adapters: ValidatorAdapter[] = [tjsAdapter, ajvAdapter];
  const allResults: DraftResult[] = [];

  if (!jsonOutput) {
    console.log('tjs Benchmark');
    console.log('='.repeat(70));
    console.log();
  }

  for (const draft of drafts) {
    if (!jsonOutput) {
      console.log(`Running ${draft}...`);
    }

    const draftResult = runDraftBenchmark(draft, adapters, iterations, verbose);
    allResults.push(draftResult);

    if (!jsonOutput) {
      const tjs = draftResult.results.find((r) => r.validator === 'tjs');
      const ajv = draftResult.results.find((r) => r.validator === 'ajv');

      if (tjs && ajv) {
        const ratio = tjs.opsPerSec / ajv.opsPerSec;
        const pct = ((ratio - 1) * 100).toFixed(1);
        const comparison = ratio >= 1 ? `+${pct}%` : `${pct}%`;
        const tjsStatus = tjs.incorrectCount > 0 ? ` ❌${tjs.incorrectCount}` : '';
        const ajvStatus = ajv.incorrectCount > 0 ? ` ❌${ajv.incorrectCount}` : '';
        console.log(
          `  ${draftResult.testCount} tests | ` +
            `tjs: ${formatNumber(tjs.opsPerSec)} ops/s (skip ${tjs.skipped}${tjsStatus}) | ` +
            `ajv: ${formatNumber(ajv.opsPerSec)} ops/s (skip ${ajv.skipped}${ajvStatus}) | ` +
            `${comparison}`
        );
      }
      console.log();
    }
  }

  if (jsonOutput) {
    const report = {
      timestamp: new Date().toISOString(),
      iterations,
      drafts: allResults,
    };
    console.log(JSON.stringify(report, null, 2));
  } else {
    // Summary table
    console.log('Summary');
    console.log('─'.repeat(70));
    console.log(
      'Draft'.padEnd(15) +
        'Tests'.padStart(8) +
        'tjs ops/s'.padStart(14) +
        'ajv ops/s'.padStart(14) +
        'tjs skip'.padStart(10) +
        'ajv skip'.padStart(10)
    );
    console.log('─'.repeat(70));

    for (const dr of allResults) {
      const tjs = dr.results.find((r) => r.validator === 'tjs');
      const ajv = dr.results.find((r) => r.validator === 'ajv');

      console.log(
        dr.draft.padEnd(15) +
          dr.testCount.toString().padStart(8) +
          (tjs ? formatNumber(tjs.opsPerSec) : '-').padStart(14) +
          (ajv ? formatNumber(ajv.opsPerSec) : '-').padStart(14) +
          (tjs ? tjs.skipped.toString() : '-').padStart(10) +
          (ajv ? ajv.skipped.toString() : '-').padStart(10)
      );
    }

    // Overall comparison
    console.log('─'.repeat(70));

    let tjsTotal = 0;
    let ajvTotal = 0;
    let tjsSkipTotal = 0;
    let ajvSkipTotal = 0;
    let tjsIncorrectTotal = 0;
    let ajvIncorrectTotal = 0;

    for (const dr of allResults) {
      const tjs = dr.results.find((r) => r.validator === 'tjs');
      const ajv = dr.results.find((r) => r.validator === 'ajv');
      if (tjs) {
        tjsTotal += tjs.opsPerSec;
        tjsSkipTotal += tjs.skipped;
        tjsIncorrectTotal += tjs.incorrectCount;
      }
      if (ajv) {
        ajvTotal += ajv.opsPerSec;
        ajvSkipTotal += ajv.skipped;
        ajvIncorrectTotal += ajv.incorrectCount;
      }
    }

    const overallRatio = tjsTotal / ajvTotal;
    const overallPct = ((overallRatio - 1) * 100).toFixed(1);
    console.log(`\nOverall: tjs is ${overallRatio >= 1 ? '+' : ''}${overallPct}% vs AJV`);
    console.log(`Total skipped: tjs=${tjsSkipTotal}, ajv=${ajvSkipTotal}`);
    if (tjsIncorrectTotal > 0 || ajvIncorrectTotal > 0) {
      console.log(`Incorrect results: tjs=${tjsIncorrectTotal}, ajv=${ajvIncorrectTotal}`);
    }
  }
}

main();
