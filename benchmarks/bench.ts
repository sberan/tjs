import { loadTestFiles } from '../tests/suite/loader.js';
import type { TestFile, TestGroup } from '../tests/suite/types.js';
import type { ValidatorAdapter, BenchmarkResult } from './types.js';
import { jsonSchemaTsAdapter } from './adapters/json-schema-ts.js';
import { ajvAdapter } from './adapters/ajv.js';

// Keywords to skip (not implemented or have known issues)
const SKIP_KEYWORDS = new Set([
  'dynamicRef', // $dynamicRef / $dynamicAnchor not implemented
  'refRemote', // Remote $ref not implemented
  'vocabulary', // Vocabulary not implemented
  'infinite-loop-detection', // Causes stack overflow in some validators
]);

interface CompiledTest {
  keyword: string;
  validate: (data: unknown) => boolean;
  tests: { data: unknown; valid: boolean }[];
}

function compileTests(
  files: TestFile[],
  adapter: ValidatorAdapter
): { compiled: CompiledTest[]; skipped: number; errors: string[] } {
  const compiled: CompiledTest[] = [];
  let skipped = 0;
  const errors: string[] = [];

  for (const file of files) {
    if (SKIP_KEYWORDS.has(file.name)) {
      for (const group of file.groups) {
        skipped += group.tests.length;
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
        skipped += group.tests.length;
      }
    }
  }

  return { compiled, skipped, errors };
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

  const adapters: ValidatorAdapter[] = [ajvAdapter, jsonSchemaTsAdapter];
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
    const { compiled, skipped, errors } = compileTests(files, adapter);

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
      skipped,
      byKeyword,
    });
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

    // Per-keyword breakdown for json-schema-ts
    const jstsResult = results.find((r) => r.validator === 'json-schema-ts');
    if (jstsResult) {
      console.log();
      console.log('Per-Keyword Breakdown (json-schema-ts):');
      console.log('─'.repeat(42));

      const keywords = Object.entries(jstsResult.byKeyword)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);

      for (const [keyword, opsPerSec] of keywords) {
        const kw = keyword.padEnd(25);
        const ops = formatNumber(opsPerSec).padStart(12);
        console.log(`${kw} ${ops} ops/sec`);
      }

      // Show slowest
      const slowest = Object.entries(jstsResult.byKeyword)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3);

      console.log();
      console.log('Slowest keywords:');
      for (const [keyword, opsPerSec] of slowest) {
        const kw = keyword.padEnd(25);
        const ops = formatNumber(opsPerSec).padStart(12);
        console.log(`${kw} ${ops} ops/sec`);
      }
    }
  }
}

main();
