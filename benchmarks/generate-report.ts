/**
 * Generate a detailed markdown comparison report between two validators
 *
 * Usage:
 *   npx tsx benchmarks/generate-report.ts <validator> [--output <file>]
 *
 * Examples:
 *   npx tsx benchmarks/generate-report.ts ajv
 *   npx tsx benchmarks/generate-report.ts ajv --output benchmarks/results/BENCHMARK_AJV.md
 *
 * Reads from:
 *   benchmarks/results/tjs.json
 *   benchmarks/results/<validator>.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface GroupResult {
  groupDesc: string;
  passed: boolean;
  passCount: number;
  failCount: number;
  nsPerTest: number;
  testCount: number;
}

interface FileResult {
  draft: string;
  file: string;
  groups: GroupResult[];
  totalPass: number;
  totalFail: number;
}

interface ValidatorBenchmark {
  validator: string;
  timestamp: string;
  results: FileResult[];
  summary: Record<string, { totalPass: number; totalFail: number; files: number }>;
}

const validatorLinks: Record<string, string> = {
  ajv: '[ajv](https://ajv.js.org/)',
  zod: '[zod](https://zod.dev/)',
  joi: '[joi](https://joi.dev/)',
  jsonschema: '[jsonschema](https://www.npmjs.com/package/jsonschema)',
  'is-my-json-valid': '[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)',
  'z-schema': '[z-schema](https://github.com/zaggino/z-schema)',
  djv: '[djv](https://github.com/korzio/djv)',
  jsen: '[jsen](https://github.com/bugventure/jsen)',
  schemasafe: '[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)',
};

function loadBenchmarkData(validator: string): ValidatorBenchmark | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function formatOpsPerSec(nsPerTest: number): string {
  if (nsPerTest === 0) return '-';
  const opsPerSec = 1_000_000_000 / nsPerTest;
  if (opsPerSec >= 1_000_000) {
    return `${(opsPerSec / 1_000_000).toFixed(1)}M`;
  }
  return `${(opsPerSec / 1_000).toFixed(0)}K`;
}

function formatDiff(tjsNs: number, otherNs: number): string {
  if (otherNs === 0 || tjsNs === 0) return '-';
  const diff = ((tjsNs - otherNs) / otherNs) * 100;
  if (Math.abs(diff) < 20) return `${diff > 0 ? '+' : ''}${Math.round(diff)}%`;
  if (diff > 0) return `🔴 **+${Math.round(diff)}%**`;
  return `🟢 **${Math.round(diff)}%**`;
}

// Build a lookup map for groups by draft:file:groupDesc
function buildGroupLookup(
  data: ValidatorBenchmark
): Map<string, { group: GroupResult; file: string; draft: string }> {
  const lookup = new Map<string, { group: GroupResult; file: string; draft: string }>();
  for (const result of data.results) {
    for (const group of result.groups) {
      const key = `${result.draft}:${result.file}:${group.groupDesc}`;
      lookup.set(key, { group, file: result.file, draft: result.draft });
    }
  }
  return lookup;
}

function main() {
  const args = process.argv.slice(2);
  let validator: string | null = null;
  let outputFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' || args[i] === '-o') {
      outputFile = args[++i];
    } else if (!validator) {
      validator = args[i];
    }
  }

  if (!validator) {
    console.error('Usage: npx tsx benchmarks/generate-report.ts <validator> [--output <file>]');
    process.exit(1);
  }

  const tjsData = loadBenchmarkData('tjs');
  const otherData = loadBenchmarkData(validator);

  if (!tjsData) {
    console.error('Error: tjs.json not found. Run `npm run bench:tjs` first.');
    process.exit(1);
  }

  if (!otherData) {
    console.error(`Error: ${validator}.json not found. Run \`npm run bench:${validator}\` first.`);
    process.exit(1);
  }

  const validatorName = validatorLinks[validator] || validator;
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const lines: string[] = [];

  // Build lookups
  const tjsLookup = buildGroupLookup(tjsData);
  const otherLookup = buildGroupLookup(otherData);

  lines.push(`# tjs vs ${validator} Benchmarks`);
  lines.push('');
  lines.push(
    `Performance comparison of **tjs** vs **${validatorName}** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).`
  );
  lines.push('');

  // Methodology note
  lines.push('## Methodology');
  lines.push('');
  lines.push(
    'We only benchmark test **groups** where **both** validators pass **all** tests in that group. ' +
      'A file contains multiple groups (each with a schema and test cases). ' +
      'If either validator fails any test in a group, that entire group is excluded from benchmarking. ' +
      'This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.'
  );
  lines.push('');

  // Summary table
  lines.push('## Summary');
  lines.push('');
  lines.push(
    `| Draft | Groups | tjs pass | tjs ops/s | ${validator} pass | ${validator} ops/s | Both pass | Diff |`
  );
  lines.push(
    '|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|'
  );

  let grandTotalGroups = 0;
  let grandTotalTjsPass = 0;
  let grandTotalOtherPass = 0;
  let grandTotalBothPass = 0;
  let grandTotalTjsNs = 0;
  let grandTotalTjsTests = 0;
  let grandTotalOtherNs = 0;
  let grandTotalOtherTests = 0;
  let grandTotalBothNs = 0;
  let grandTotalBothTests = 0;

  for (const draft of drafts) {
    const tjsDraftResults = tjsData.results.filter((r) => r.draft === draft);

    let groupCount = 0;
    let tjsPassCount = 0;
    let otherPassCount = 0;
    let bothPassCount = 0;
    let tjsNsSum = 0;
    let tjsTestSum = 0;
    let otherNsSum = 0;
    let otherTestSum = 0;
    let bothNsSum = 0;
    let bothTestSum = 0;

    for (const result of tjsDraftResults) {
      for (const tjsGroup of result.groups) {
        groupCount++;
        const key = `${draft}:${result.file}:${tjsGroup.groupDesc}`;
        const otherEntry = otherLookup.get(key);

        if (tjsGroup.passed) {
          tjsPassCount++;
          if (tjsGroup.nsPerTest > 0) {
            tjsNsSum += tjsGroup.nsPerTest * tjsGroup.testCount;
            tjsTestSum += tjsGroup.testCount;
          }
        }

        if (otherEntry?.group.passed) {
          otherPassCount++;
          if (otherEntry.group.nsPerTest > 0) {
            otherNsSum += otherEntry.group.nsPerTest * otherEntry.group.testCount;
            otherTestSum += otherEntry.group.testCount;
          }
        }

        // Both pass - for head-to-head comparison
        if (tjsGroup.passed && otherEntry?.group.passed) {
          bothPassCount++;
          if (tjsGroup.nsPerTest > 0 && otherEntry.group.nsPerTest > 0) {
            bothNsSum += tjsGroup.nsPerTest * tjsGroup.testCount;
            bothTestSum += tjsGroup.testCount;
          }
        }
      }
    }

    grandTotalGroups += groupCount;
    grandTotalTjsPass += tjsPassCount;
    grandTotalOtherPass += otherPassCount;
    grandTotalBothPass += bothPassCount;
    grandTotalTjsNs += tjsNsSum;
    grandTotalTjsTests += tjsTestSum;
    grandTotalOtherNs += otherNsSum;
    grandTotalOtherTests += otherTestSum;
    grandTotalBothNs += bothNsSum;
    grandTotalBothTests += bothTestSum;

    const tjsAvgNs = tjsTestSum > 0 ? tjsNsSum / tjsTestSum : 0;
    const otherAvgNs = otherTestSum > 0 ? otherNsSum / otherTestSum : 0;

    const tjsDisplay =
      tjsPassCount === groupCount ? `✅ ${tjsPassCount}` : `${tjsPassCount}/${groupCount}`;
    const otherDisplay =
      otherPassCount === groupCount ? `✅ ${otherPassCount}` : `${otherPassCount}/${groupCount}`;

    lines.push(
      `| ${draft} | ${groupCount} | ${tjsDisplay} | ${formatOpsPerSec(tjsAvgNs)} | ${otherDisplay} | ${formatOpsPerSec(otherAvgNs)} | ${bothPassCount} | ${formatDiff(tjsAvgNs, otherAvgNs)} |`
    );
  }

  // Totals
  const avgTjsNs = grandTotalTjsTests > 0 ? grandTotalTjsNs / grandTotalTjsTests : 0;
  const avgOtherNs = grandTotalOtherTests > 0 ? grandTotalOtherNs / grandTotalOtherTests : 0;

  const tjsTotalDisplay =
    grandTotalTjsPass === grandTotalGroups
      ? `✅ ${grandTotalTjsPass}`
      : `${grandTotalTjsPass}/${grandTotalGroups}`;
  const otherTotalDisplay =
    grandTotalOtherPass === grandTotalGroups
      ? `✅ ${grandTotalOtherPass}`
      : `${grandTotalOtherPass}/${grandTotalGroups}`;

  lines.push(
    `| **Total** | ${grandTotalGroups} | ${tjsTotalDisplay} | ${formatOpsPerSec(avgTjsNs)} | ${otherTotalDisplay} | ${formatOpsPerSec(avgOtherNs)} | ${grandTotalBothPass} | ${formatDiff(avgTjsNs, avgOtherNs)} |`
  );
  lines.push('');

  // Head-to-head section
  lines.push('## Head-to-Head Performance');
  lines.push('');
  lines.push(
    'Direct comparison using only test groups where **both** validators pass **all** tests. ' +
      'This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.'
  );
  lines.push('');

  // Calculate head-to-head stats (only groups where both pass)
  let h2hTjsNs = 0;
  let h2hOtherNs = 0;
  let h2hTests = 0;

  for (const result of tjsData.results) {
    for (const tjsGroup of result.groups) {
      const key = `${result.draft}:${result.file}:${tjsGroup.groupDesc}`;
      const otherEntry = otherLookup.get(key);

      if (
        tjsGroup.passed &&
        otherEntry?.group.passed &&
        tjsGroup.nsPerTest > 0 &&
        otherEntry.group.nsPerTest > 0
      ) {
        h2hTjsNs += tjsGroup.nsPerTest * tjsGroup.testCount;
        h2hOtherNs += otherEntry.group.nsPerTest * otherEntry.group.testCount;
        h2hTests += tjsGroup.testCount;
      }
    }
  }

  if (h2hTests > 0) {
    const h2hTjsAvg = h2hTjsNs / h2hTests;
    const h2hOtherAvg = h2hOtherNs / h2hTests;
    const faster = h2hTjsAvg < h2hOtherAvg ? 'tjs' : validator;
    const ratio = h2hTjsAvg < h2hOtherAvg ? h2hOtherAvg / h2hTjsAvg : h2hTjsAvg / h2hOtherAvg;
    const emoji = faster === 'tjs' ? '🟢' : '🔴';

    lines.push(
      `**Result**: ${emoji} **${faster}** is **${ratio.toFixed(2)}x faster** (${Math.round(h2hTjsAvg)} ns vs ${Math.round(h2hOtherAvg)} ns per test, ${h2hTests} tests in ${grandTotalBothPass} groups)`
    );
  }
  lines.push('');

  // Detailed results by draft
  lines.push('## Detailed Results by Draft');
  lines.push('');
  lines.push('Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.');
  lines.push('');

  for (const draft of drafts) {
    const tjsDraftResults = tjsData.results.filter((r) => r.draft === draft);
    if (tjsDraftResults.length === 0) continue;

    lines.push(`### ${draft}`);
    lines.push('');
    lines.push(
      `| File | Group | Tests | tjs | tjs ops/s | ${validator} | ${validator} ops/s | Diff |`
    );
    lines.push('|------|-------|------:|:---:|----------:|:---:|----------:|-----:|');

    for (const result of tjsDraftResults) {
      for (const tjsGroup of result.groups) {
        const key = `${draft}:${result.file}:${tjsGroup.groupDesc}`;
        const otherEntry = otherLookup.get(key);

        const tjsStatus = tjsGroup.passed ? '✅' : '❌';
        const otherStatus = otherEntry?.group.passed ? '✅' : '❌';
        const tjsOps =
          tjsGroup.passed && tjsGroup.nsPerTest > 0 ? formatOpsPerSec(tjsGroup.nsPerTest) : '-';
        const otherOps =
          otherEntry?.group.passed && otherEntry.group.nsPerTest > 0
            ? formatOpsPerSec(otherEntry.group.nsPerTest)
            : '-';
        const diff =
          tjsGroup.passed &&
          otherEntry?.group.passed &&
          tjsGroup.nsPerTest > 0 &&
          otherEntry.group.nsPerTest > 0
            ? formatDiff(tjsGroup.nsPerTest, otherEntry.group.nsPerTest)
            : '-';

        // Truncate group description if too long
        const groupDesc =
          tjsGroup.groupDesc.length > 40
            ? tjsGroup.groupDesc.slice(0, 37) + '...'
            : tjsGroup.groupDesc;

        lines.push(
          `| ${result.file} | ${groupDesc} | ${tjsGroup.testCount} | ${tjsStatus} | ${tjsOps} | ${otherStatus} | ${otherOps} | ${diff} |`
        );
      }
    }
    lines.push('');
  }

  const output = lines.join('\n');

  if (outputFile) {
    fs.writeFileSync(outputFile, output);
    console.error(`Generated ${outputFile}`);
  } else {
    console.log(output);
  }
}

main();
