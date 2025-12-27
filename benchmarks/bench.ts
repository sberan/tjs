import { loadTestFiles } from '../tests/suite/loader.js';
import type { TestFile, TestGroup } from '../tests/suite/types.js';
import type { ValidatorAdapter, BenchmarkResult } from './types.js';
import { ajvAdapter } from './adapters/ajv.js';
import { jitAdapter } from './adapters/jit.js';

// Keywords to skip (not implemented or have known issues)
const SKIP_KEYWORDS = new Set([
  'refRemote', // Remote $ref requires file I/O to load schemas (tested in compliance suite)
  'unknownKeyword', // Meta-schema validation not implemented
  'infinite-loop-detection', // Causes stack overflow in some validators
]);

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

function compileTests(files: TestFile[], adapter: ValidatorAdapter): CompileResult {
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
        const validate = adapter.compile(group.schema);
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
  const keywordCounts: Record<string, number> = {};
  const keywordTimes: Record<string, number> = {};

  // Count tests per keyword
  for (const c of compiled) {
    keywordCounts[c.keyword] = (keywordCounts[c.keyword] || 0) + c.tests.length;
  }

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

function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');
  const iterations = 1000;

  // Load test files
  const files = loadTestFiles({ includeOptional: false });
  const totalTestCount = files.reduce(
    (sum, f) => sum + f.groups.reduce((gs, g) => gs + g.tests.length, 0),
    0
  );

  const adapters: ValidatorAdapter[] = [ajvAdapter, jitAdapter];
  const results: BenchmarkResult[] = [];

  if (!jsonOutput) {
    console.log('json-schema-ts Benchmark (JSON Schema Test Suite draft2020-12)');
    console.log('='.repeat(62));
    console.log();
    console.log(
      `Total: ${formatNumber(totalTestCount)} test cases across ${files.length} keyword files`
    );
    console.log(`Iterations: ${iterations}`);
    console.log();
  }

  for (const adapter of adapters) {
    const { compiled, skippedByKeyword, skippedByError, errors } = compileTests(files, adapter);

    if (!jsonOutput && errors.length > 0) {
      console.log(`\n${adapter.name} compilation errors:`);
      for (const err of errors.slice(0, 5)) {
        console.log(`  ${err}`);
      }
      if (errors.length > 5) {
        console.log(`  ... and ${errors.length - 5} more`);
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

    if (!jsonOutput) {
      console.log(
        `${adapter.name}: skipped ${skippedByKeyword} (keywords) + ${skippedByError} (errors) = ${skippedByKeyword + skippedByError} total`
      );
    }
  }

  // Sort by ops/sec descending
  results.sort((a, b) => b.opsPerSec - a.opsPerSec);
  const fastest = results[0]?.opsPerSec || 1;

  if (jsonOutput) {
    const report = {
      timestamp: new Date().toISOString(),
      suite: 'draft2020-12',
      testCount: totalTestCount,
      iterations,
      results,
    };
    console.log(JSON.stringify(report, null, 2));
  } else {
    // Console output
    console.log('Validator              ops/sec       relative    skipped');
    console.log('─'.repeat(58));

    for (const r of results) {
      const relative = ((r.opsPerSec / fastest) * 100).toFixed(1);
      const name = r.validator.padEnd(20);
      const ops = formatNumber(r.opsPerSec).padStart(12);
      const rel = `${relative}%`.padStart(10);
      const skip = r.skipped.toString().padStart(10);
      console.log(`${name} ${ops} ${rel} ${skip}`);
    }

    // Per-keyword comparison between jit and AJV
    const jitResult = results.find((r) => r.validator === 'json-schema-ts-jit');
    const ajvResult = results.find((r) => r.validator === 'ajv');

    if (jitResult && ajvResult) {
      console.log();
      console.log('Per-Keyword Comparison (jit vs AJV):');
      console.log('─'.repeat(72));
      console.log(
        'Keyword'.padEnd(25) +
          'jit'.padStart(14) +
          'ajv'.padStart(14) +
          'ratio'.padStart(10) +
          'diff'.padStart(8)
      );
      console.log('─'.repeat(72));

      // Get all keywords present in both
      const allKeywords = new Set([
        ...Object.keys(jitResult.byKeyword),
        ...Object.keys(ajvResult.byKeyword),
      ]);

      // Calculate ratio (jit / ajv) for each keyword
      const keywordComparison: { keyword: string; jit: number; ajv: number; ratio: number }[] = [];
      for (const keyword of allKeywords) {
        const jitOps = jitResult.byKeyword[keyword];
        const ajvOps = ajvResult.byKeyword[keyword];
        if (jitOps && ajvOps) {
          keywordComparison.push({
            keyword,
            jit: jitOps,
            ajv: ajvOps,
            ratio: jitOps / ajvOps,
          });
        }
      }

      // Sort by ratio ascending (slowest relative to AJV first)
      keywordComparison.sort((a, b) => a.ratio - b.ratio);

      // Show all keywords sorted by ratio
      for (const { keyword, jit, ajv, ratio } of keywordComparison) {
        const kw = keyword.padEnd(25);
        const jitStr = formatNumber(jit).padStart(14);
        const ajvStr = formatNumber(ajv).padStart(14);
        const ratioStr = `${ratio.toFixed(2)}x`.padStart(10);
        const diffPercent = ((ratio - 1) * 100).toFixed(0);
        const diffStr = (ratio >= 1 ? `+${diffPercent}%` : `${diffPercent}%`).padStart(8);
        console.log(`${kw}${jitStr}${ajvStr}${ratioStr}${diffStr}`);
      }

      // Summary: keywords where jit is slower than AJV
      const slowerThanAjv = keywordComparison.filter((k) => k.ratio < 1);
      const fasterThanAjv = keywordComparison.filter((k) => k.ratio >= 1);

      console.log();
      console.log('─'.repeat(72));
      console.log(
        `Summary: ${fasterThanAjv.length} keywords faster, ${slowerThanAjv.length} keywords slower than AJV`
      );

      if (slowerThanAjv.length > 0) {
        console.log();
        console.log('⚠ Slowest relative to AJV (optimization targets):');
        for (const { keyword, ratio } of slowerThanAjv.slice(0, 5)) {
          const kw = keyword.padEnd(25);
          const ratioStr = `${ratio.toFixed(2)}x`.padStart(8);
          const diffPercent = ((1 - ratio) * 100).toFixed(0);
          console.log(`  ${kw}${ratioStr}  (${diffPercent}% slower)`);
        }
      }

      // Show fastest keywords (where we beat AJV the most)
      const fastestRelative = keywordComparison
        .filter((k) => k.ratio > 1)
        .sort((a, b) => b.ratio - a.ratio);
      if (fastestRelative.length > 0) {
        console.log();
        console.log('✓ Fastest relative to AJV:');
        for (const { keyword, ratio } of fastestRelative.slice(0, 5)) {
          const kw = keyword.padEnd(25);
          const ratioStr = `${ratio.toFixed(2)}x`.padStart(8);
          const diffPercent = ((ratio - 1) * 100).toFixed(0);
          console.log(`  ${kw}${ratioStr}  (${diffPercent}% faster)`);
        }
      }
    }
  }
}

main();
