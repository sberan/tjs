import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestFiles } from '../tests/suite/loader.js';
import type { TestFile } from '../tests/suite/types.js';
import type { ValidatorAdapter, BenchmarkResult, Draft } from './types.js';
import { ajvAdapter } from './adapters/ajv.js';
import { jitAdapter } from './adapters/jit.js';

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

  const remotesDir = path.join(__dirname, '../test-suite/remotes');
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

function runBenchmark(
  compiled: CompiledTest[],
  iterations: number
): { totalValidations: number; durationMs: number; byKeyword: Record<string, number> } {
  const keywordTimes: Record<string, number> = {};

  // Test each validator to ensure it doesn't throw/stack overflow
  const safeCompiled: CompiledTest[] = [];
  for (const c of compiled) {
    try {
      // Test that validation doesn't crash
      for (const test of c.tests) {
        c.validate(test.data);
      }
      safeCompiled.push(c);
    } catch {
      // Skip tests that cause runtime errors (e.g., stack overflow)
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

  // Timed run
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    for (const { validate, tests } of safeCompiled) {
      for (const test of tests) {
        validate(test.data);
      }
    }
  }

  const durationMs = performance.now() - start;
  const totalTests = safeCompiled.reduce((sum, c) => sum + c.tests.length, 0);
  const totalValidations = totalTests * iterations;

  // Calculate per-keyword ops/sec (run separately for accurate timing)
  const safeKeywords = new Set(safeCompiled.map((c) => c.keyword));
  for (const keyword of safeKeywords) {
    const keywordCompiled = safeCompiled.filter((c) => c.keyword === keyword);
    const keywordTests = keywordCompiled.reduce((sum, c) => sum + c.tests.length, 0);

    const kwStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      for (const { validate, tests } of keywordCompiled) {
        for (const test of tests) {
          validate(test.data);
        }
      }
    }
    const kwDuration = performance.now() - kwStart;
    keywordTimes[keyword] = Math.round((keywordTests * iterations) / (kwDuration / 1000));
  }

  return { totalValidations, durationMs, byKeyword: keywordTimes };
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

    const { totalValidations, durationMs, byKeyword } = runBenchmark(compiled, iterations);
    const opsPerSec = Math.round((totalValidations / durationMs) * 1000);

    results.push({
      validator: adapter.name,
      opsPerSec,
      totalValidations,
      durationMs,
      skipped: skippedByKeyword + skippedByError,
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

  const adapters: ValidatorAdapter[] = [jitAdapter, ajvAdapter];
  const allResults: DraftResult[] = [];

  if (!jsonOutput) {
    console.log('json-schema-ts Benchmark');
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
      const jit = draftResult.results.find((r) => r.validator === 'json-schema-ts-jit');
      const ajv = draftResult.results.find((r) => r.validator === 'ajv');

      if (jit && ajv) {
        const ratio = jit.opsPerSec / ajv.opsPerSec;
        const pct = ((ratio - 1) * 100).toFixed(1);
        const comparison = ratio >= 1 ? `+${pct}%` : `${pct}%`;
        console.log(
          `  ${draftResult.testCount} tests | ` +
            `jit: ${formatNumber(jit.opsPerSec)} ops/s (skip ${jit.skipped}) | ` +
            `ajv: ${formatNumber(ajv.opsPerSec)} ops/s (skip ${ajv.skipped}) | ` +
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
        'jit ops/s'.padStart(14) +
        'ajv ops/s'.padStart(14) +
        'jit skip'.padStart(10) +
        'ajv skip'.padStart(10)
    );
    console.log('─'.repeat(70));

    for (const dr of allResults) {
      const jit = dr.results.find((r) => r.validator === 'json-schema-ts-jit');
      const ajv = dr.results.find((r) => r.validator === 'ajv');

      console.log(
        dr.draft.padEnd(15) +
          dr.testCount.toString().padStart(8) +
          (jit ? formatNumber(jit.opsPerSec) : '-').padStart(14) +
          (ajv ? formatNumber(ajv.opsPerSec) : '-').padStart(14) +
          (jit ? jit.skipped.toString() : '-').padStart(10) +
          (ajv ? ajv.skipped.toString() : '-').padStart(10)
      );
    }

    // Overall comparison
    console.log('─'.repeat(70));

    let jitTotal = 0;
    let ajvTotal = 0;
    let jitSkipTotal = 0;
    let ajvSkipTotal = 0;

    for (const dr of allResults) {
      const jit = dr.results.find((r) => r.validator === 'json-schema-ts-jit');
      const ajv = dr.results.find((r) => r.validator === 'ajv');
      if (jit) {
        jitTotal += jit.opsPerSec;
        jitSkipTotal += jit.skipped;
      }
      if (ajv) {
        ajvTotal += ajv.opsPerSec;
        ajvSkipTotal += ajv.skipped;
      }
    }

    const overallRatio = jitTotal / ajvTotal;
    const overallPct = ((overallRatio - 1) * 100).toFixed(1);
    console.log(
      `\nOverall: json-schema-ts is ${overallRatio >= 1 ? '+' : ''}${overallPct}% vs AJV`
    );
    console.log(`Total skipped: jit=${jitSkipTotal}, ajv=${ajvSkipTotal}`);
  }
}

main();
