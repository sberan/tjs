/**
 * Benchmark performance across git commits using mitata
 *
 * This creates a performance history graph showing how tjs performance
 * has changed over time relative to AJV.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CommitResult {
  name: string;
  hash: string;
  tjsAvg: number; // microseconds
  ajvAvg: number;
  diff: number; // percent faster than AJV
}

const COMMITS = [
  { hash: '2a3b2d2', name: 'labeled-blocks' },
  { hash: '42cd17c', name: 'unskip-tests' },
  { hash: '824eacd', name: 'allOf-empty' },
  { hash: '3433d0a', name: 'enum-opt' },
  { hash: '7eed2f6', name: 'ref-inline' },
  { hash: '82e3e9a', name: 'codegen-hotpath' },
  { hash: 'bb478ff', name: 'type-checking' },
  { hash: 'd8b9d39', name: 'array-validation' },
  { hash: '73e576e', name: 'compile-time' },
];

// Simple mitata-style benchmark that outputs JSON
const BENCH_SCRIPT = `
import { run, bench, group } from 'mitata';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { createValidator } from './src/core/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadRemoteSchemas(draft) {
  const remotes = {};
  const remotesDir = path.join(__dirname, 'tests/json-schema-test-suite/remotes');
  const loadDir = (dir, baseUrl) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('draft')) {
        loadDir(fullPath, baseUrl + entry.name + '/');
      } else if (entry.name.endsWith('.json')) {
        try {
          const schema = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
          remotes[baseUrl + entry.name] = schema;
          if (schema?.$id) remotes[schema.$id] = schema;
          if (schema?.id) remotes[schema.id] = schema;
        } catch {}
      }
    }
  };
  loadDir(remotesDir, 'http://localhost:1234/');
  return remotes;
}

function loadTestSuites(draft) {
  const suiteDir = path.join(__dirname, 'tests/json-schema-test-suite', draft);
  const suites = [];
  for (const filename of fs.readdirSync(suiteDir)) {
    if (!filename.endsWith('.json')) continue;
    const filepath = path.join(suiteDir, filename);
    if (!fs.statSync(filepath).isFile()) continue;
    suites.push(...JSON.parse(fs.readFileSync(filepath, 'utf-8')));
  }
  return suites;
}

const draft = 'draft7';
const remotes = loadRemoteSchemas(draft);
const suites = loadTestSuites(draft);
const compiled = [];

const ajv = new Ajv({ allErrors: false, logger: false });
addFormats(ajv);
for (const [uri, schema] of Object.entries(remotes)) {
  try { ajv.addSchema(schema, uri); } catch {}
}

for (const suite of suites) {
  try {
    const tjsValidator = createValidator(suite.schema, { defaultMeta: draft, remotes });
    const ajvValidator = ajv.compile(suite.schema);
    let allPass = true;
    for (const test of suite.tests) {
      if (tjsValidator(test.data) !== test.valid || ajvValidator(test.data) !== test.valid) {
        allPass = false;
        break;
      }
    }
    if (allPass) {
      compiled.push({ tests: suite.tests, tjs: tjsValidator, ajv: (d) => ajvValidator(d) });
    }
  } catch {}
}

let tjsTime = 0, ajvTime = 0;

group('bench', () => {
  bench('tjs', () => {
    for (const s of compiled) for (const t of s.tests) s.tjs(t.data);
  });
  bench('ajv', () => {
    for (const s of compiled) for (const t of s.tests) s.ajv(t.data);
  });
});

await run({ silent: false, avg: true, json: false, colors: false });
`;

async function main() {
  const results: CommitResult[] = [];
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();

  console.log('Benchmarking commits...\n');

  for (const commit of COMMITS) {
    console.log(`=== ${commit.name} (${commit.hash}) ===`);

    try {
      // Checkout and build
      execSync(`git checkout ${commit.hash} --quiet`, { stdio: 'pipe' });
      execSync('npm run build --silent 2>/dev/null || true', { stdio: 'pipe' });

      // Run mitata benchmark and parse output
      const rawOutput = execSync('npx tsx benchmarks/mitata-bench.ts draft7 2>&1', {
        encoding: 'utf-8',
        timeout: 120000,
      });

      // Strip ANSI codes
      const output = rawOutput.replace(/\x1b\[[0-9;]*m/g, '');

      // Parse mitata output for avg times
      // Format: "tjs   28.18 µs/iter" (first occurrence is the "All tests" group)
      const tjsMatch = output.match(/tjs\s+([\d.]+)\s*µs\/iter/);
      const ajvMatch = output.match(/ajv\s+([\d.]+)\s*µs\/iter/);

      if (tjsMatch && ajvMatch) {
        const tjsAvg = parseFloat(tjsMatch[1]);
        const ajvAvg = parseFloat(ajvMatch[1]);
        const diff = ((ajvAvg - tjsAvg) / ajvAvg) * 100;

        results.push({ name: commit.name, hash: commit.hash, tjsAvg, ajvAvg, diff });
        console.log(
          `  tjs: ${tjsAvg.toFixed(2)} µs, ajv: ${ajvAvg.toFixed(2)} µs, diff: ${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%\n`
        );
      } else {
        console.log('  Failed to parse output\n');
      }
    } catch (e: any) {
      console.log(`  Error: ${e.message}\n`);
    }
  }

  // Restore branch
  execSync(`git checkout ${currentBranch} --quiet`, { stdio: 'pipe' });

  // Print summary table
  console.log('\n' + '='.repeat(70));
  console.log('PERFORMANCE HISTORY');
  console.log('='.repeat(70));
  console.log(
    'Commit'.padEnd(20) + 'tjs (µs)'.padStart(12) + 'ajv (µs)'.padStart(12) + 'vs AJV'.padStart(12)
  );
  console.log('-'.repeat(70));

  for (const r of results) {
    const diffStr = `${r.diff >= 0 ? '+' : ''}${r.diff.toFixed(1)}%`;
    console.log(
      r.name.padEnd(20) +
        r.tjsAvg.toFixed(2).padStart(12) +
        r.ajvAvg.toFixed(2).padStart(12) +
        diffStr.padStart(12)
    );
  }

  // ASCII graph
  console.log('\n' + '='.repeat(70));
  console.log('PERFORMANCE GRAPH (lower is better)');
  console.log('='.repeat(70));

  const maxTime = Math.max(...results.map((r) => Math.max(r.tjsAvg, r.ajvAvg)));
  const width = 40;

  for (const r of results) {
    const tjsBar = Math.round((r.tjsAvg / maxTime) * width);
    const ajvBar = Math.round((r.ajvAvg / maxTime) * width);
    const diffStr = `${r.diff >= 0 ? '+' : ''}${r.diff.toFixed(0)}%`;

    console.log(`\n${r.name}`);
    console.log(
      `  tjs: ${'█'.repeat(tjsBar)}${'░'.repeat(width - tjsBar)} ${r.tjsAvg.toFixed(1)} µs`
    );
    console.log(
      `  ajv: ${'█'.repeat(ajvBar)}${'░'.repeat(width - ajvBar)} ${r.ajvAvg.toFixed(1)} µs (${diffStr})`
    );
  }

  // Trend summary
  if (results.length >= 2) {
    const first = results[0];
    const last = results[results.length - 1];
    const improvement = ((first.tjsAvg - last.tjsAvg) / first.tjsAvg) * 100;

    console.log('\n' + '='.repeat(70));
    console.log('SUMMARY');
    console.log('='.repeat(70));
    console.log(
      `First commit (${first.name}): ${first.tjsAvg.toFixed(2)} µs (${first.diff >= 0 ? '+' : ''}${first.diff.toFixed(1)}% vs AJV)`
    );
    console.log(
      `Last commit (${last.name}):  ${last.tjsAvg.toFixed(2)} µs (${last.diff >= 0 ? '+' : ''}${last.diff.toFixed(1)}% vs AJV)`
    );
    console.log(
      `Overall tjs improvement: ${improvement >= 0 ? '+' : ''}${improvement.toFixed(1)}%`
    );
  }
}

main().catch(console.error);
