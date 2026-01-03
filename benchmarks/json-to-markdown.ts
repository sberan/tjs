/**
 * Convert benchmark JSON output to markdown format
 *
 * Usage:
 *   npx tsx benchmarks/json-to-markdown.ts <json-file> > BENCHMARK_<VALIDATOR>.md
 *
 * Examples:
 *   npx tsx benchmarks/json-to-markdown.ts benchmark.json > BENCHMARK_AJV.md
 */

import * as fs from 'fs';

interface ValidatorStats {
  nsPerTest: number;
  pass: number;
  fail: number;
}

interface FileResult {
  draft: string;
  file: string;
  testCount: number;
  tjs: ValidatorStats;
  other: ValidatorStats;
}

interface DraftSummary {
  files: number;
  tests: number;
  tjs: ValidatorStats;
  other: ValidatorStats;
}

interface H2H {
  validatorA: string;
  validatorB: string;
  avgNsA: number;
  avgNsB: number;
  faster: string;
  ratio: number;
  totalTests: number;
}

interface BenchmarkData {
  compareValidator: string;
  results: FileResult[];
  summary: Record<string, DraftSummary>;
  headToHead: H2H | null;
}

const validatorLinks: Record<string, string> = {
  ajv: '[ajv](https://ajv.js.org/)',
  zod: '[zod](https://zod.dev/)',
  joi: '[joi](https://joi.dev/)',
};

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

function main() {
  const jsonFile = process.argv[2];
  if (!jsonFile) {
    console.error('Usage: npx tsx benchmarks/json-to-markdown.ts <json-file>');
    process.exit(1);
  }

  const data: BenchmarkData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  const validator = data.compareValidator;
  const validatorName = validatorLinks[validator] || validator;

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const lines: string[] = [];

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
    'We only benchmark test files where **both** validators pass **all** tests in that file. ' +
      'This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. ' +
      'Files where either validator fails any test are excluded from performance metrics but still counted for compliance.'
  );
  lines.push('');

  // Summary table - only count files where ALL tests pass for that validator
  lines.push('## Summary');
  lines.push('');
  lines.push(
    `| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ${validator} files | ${validator} tests | ${validator} ops/s | tjs vs ${validator} |`
  );
  lines.push(
    '|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|'
  );

  let totalFiles = 0;
  let totalTests = 0;
  // Only count files/tests where ALL tests pass
  let totalTjsFiles = 0;
  let totalTjsTests = 0;
  let totalTjsNs = 0;
  let totalOtherFiles = 0;
  let totalOtherTests = 0;
  let totalOtherNs = 0;

  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;
    const draftResults = data.results.filter((r) => r.draft === draft);

    totalFiles += s.files;
    totalTests += s.tests;

    // Compute stats only from files where all tests pass for that validator
    let tjsFiles = 0;
    let tjsTests = 0;
    let tjsNsSum = 0;
    let otherFiles = 0;
    let otherTests = 0;
    let otherNsSum = 0;

    for (const r of draftResults) {
      // tjs: only count if all tests pass (fail === 0)
      if (r.tjs.fail === 0 && r.tjs.nsPerTest > 0) {
        tjsFiles++;
        tjsTests += r.testCount;
        tjsNsSum += r.tjs.nsPerTest * r.testCount;
      }
      // Other validator: only count if all tests pass
      if (r.other.fail === 0 && r.other.nsPerTest > 0) {
        otherFiles++;
        otherTests += r.testCount;
        otherNsSum += r.other.nsPerTest * r.testCount;
      }
    }

    totalTjsFiles += tjsFiles;
    totalTjsTests += tjsTests;
    totalTjsNs += tjsNsSum;
    totalOtherFiles += otherFiles;
    totalOtherTests += otherTests;
    totalOtherNs += otherNsSum;

    const tjsAvgNs = tjsTests > 0 ? tjsNsSum / tjsTests : 0;
    const otherAvgNs = otherTests > 0 ? otherNsSum / otherTests : 0;

    const tjsDisplay = tjsFiles === s.files ? `✅ ${tjsFiles}` : `⚠️ ${tjsFiles}/${s.files}`;
    const otherDisplay =
      otherFiles === s.files ? `✅ ${otherFiles}` : `⚠️ ${otherFiles}/${s.files}`;

    lines.push(
      `| ${draft} | ${s.files} | ${s.tests} | ${tjsDisplay} | ${tjsTests} | ${formatOpsPerSec(tjsAvgNs)} | ${otherDisplay} | ${otherTests} | ${formatOpsPerSec(otherAvgNs)} | ${formatDiff(tjsAvgNs, otherAvgNs)} |`
    );
  }

  const avgTjsNs = totalTjsTests > 0 ? totalTjsNs / totalTjsTests : 0;
  const avgOtherNs = totalOtherTests > 0 ? totalOtherNs / totalOtherTests : 0;

  const totalTjsDisplay =
    totalTjsFiles === totalFiles ? `✅ ${totalTjsFiles}` : `⚠️ ${totalTjsFiles}/${totalFiles}`;
  const totalOtherDisplay =
    totalOtherFiles === totalFiles
      ? `✅ ${totalOtherFiles}`
      : `⚠️ ${totalOtherFiles}/${totalFiles}`;

  lines.push(
    `| **Total** | ${totalFiles} | ${totalTests} | ${totalTjsDisplay} | ${totalTjsTests} | ${formatOpsPerSec(avgTjsNs)} | ${totalOtherDisplay} | ${totalOtherTests} | ${formatOpsPerSec(avgOtherNs)} | ${formatDiff(avgTjsNs, avgOtherNs)} |`
  );
  lines.push('');

  // Head-to-head section
  const h2h = data.headToHead;

  if (h2h) {
    lines.push('## Head-to-Head Performance');
    lines.push('');
    lines.push('Comparison on test groups where both validators pass all tests:');
    lines.push('');
    const emoji = h2h.faster === 'tjs' ? '🟢' : '🔴';
    lines.push(
      `**tjs vs ${validator}**: ${emoji} ${h2h.faster} is ${h2h.ratio.toFixed(2)}x faster (${Math.round(h2h.avgNsA)} ns vs ${Math.round(h2h.avgNsB)} ns, ${h2h.totalTests} tests)`
    );
    lines.push('');
  }

  // Detailed results by draft
  lines.push('## Detailed Results');
  lines.push('');
  lines.push('Only showing ops/s for files where all tests pass.');
  lines.push('');

  for (const draft of drafts) {
    const draftResults = data.results.filter((r) => r.draft === draft);
    if (draftResults.length === 0) continue;

    lines.push(`### ${draft}`);
    lines.push('');
    lines.push(`| File | Tests | tjs | tjs ops/s | ${validator} | ${validator} ops/s | Diff |`);
    lines.push('|------|------:|----:|----------:|----:|----------:|-----:|');

    for (const r of draftResults) {
      // Only show ops/s if all tests pass
      const tjsOps = r.tjs.fail === 0 ? formatOpsPerSec(r.tjs.nsPerTest) : '-';
      const otherOps = r.other.fail === 0 ? formatOpsPerSec(r.other.nsPerTest) : '-';
      const diff =
        r.tjs.fail === 0 && r.other.fail === 0
          ? formatDiff(r.tjs.nsPerTest, r.other.nsPerTest)
          : '-';
      const tjsStatus = r.tjs.fail === 0 ? '✅' : `⚠️ ${r.tjs.fail} fail`;
      const otherStatus = r.other.fail === 0 ? '✅' : `⚠️ ${r.other.fail} fail`;
      lines.push(
        `| ${r.file} | ${r.testCount} | ${tjsStatus} | ${tjsOps} | ${otherStatus} | ${otherOps} | ${diff} |`
      );
    }
    lines.push('');
  }

  console.log(lines.join('\n'));
}

main();
