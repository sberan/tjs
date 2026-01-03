/**
 * Convert benchmark JSON output to markdown format
 *
 * Usage:
 *   npm run bench:json | npx tsx benchmarks/json-to-markdown.ts [validator]
 *
 * Examples:
 *   npm run bench:json | npx tsx benchmarks/json-to-markdown.ts ajv > BENCHMARK_AJV.md
 *   npm run bench -v zod --json | npx tsx benchmarks/json-to-markdown.ts zod > BENCHMARK_ZOD.md
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
  ajv: ValidatorStats;
  zod: ValidatorStats;
  joi: ValidatorStats;
}

interface DraftSummary {
  files: number;
  tests: number;
  tjs: ValidatorStats;
  ajv: ValidatorStats;
  zod: ValidatorStats;
  joi: ValidatorStats;
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
  headToHead: {
    tjsVsAjv: H2H | null;
    tjsVsZod: H2H | null;
    tjsVsJoi: H2H | null;
  };
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

function formatPassFail(pass: number, fail: number): string {
  if (fail === 0) return `✅ ${pass}`;
  return `⚠️ ${pass}`;
}

function main() {
  const validator = process.argv[2] || 'ajv';
  const validatorKey = validator.toLowerCase() as 'ajv' | 'zod' | 'joi';

  // Read JSON from stdin
  const input = fs.readFileSync(0, 'utf-8');

  // Find the JSON in the input (skip any non-JSON lines like progress output)
  const jsonStart = input.indexOf('{');
  const jsonEnd = input.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) {
    console.error('No JSON found in input');
    process.exit(1);
  }
  const jsonStr = input.slice(jsonStart, jsonEnd + 1);
  const data: BenchmarkData = JSON.parse(jsonStr);

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const lines: string[] = [];

  const validatorName = validatorLinks[validatorKey] || validator;

  lines.push(`# tjs vs ${validator} Benchmarks`);
  lines.push('');
  lines.push(
    `Performance comparison of **tjs** vs **${validatorName}** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).`
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
      const otherStats = r[validatorKey];
      if (otherStats.fail === 0 && otherStats.nsPerTest > 0) {
        otherFiles++;
        otherTests += r.testCount;
        otherNsSum += otherStats.nsPerTest * r.testCount;
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
  const h2hKey =
    `tjsVs${validator.charAt(0).toUpperCase()}${validator.slice(1)}` as keyof typeof data.headToHead;
  const h2h = data.headToHead[h2hKey];

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
      const other = r[validatorKey];
      // Only show ops/s if all tests pass
      const tjsOps = r.tjs.fail === 0 ? formatOpsPerSec(r.tjs.nsPerTest) : '-';
      const otherOps = other.fail === 0 ? formatOpsPerSec(other.nsPerTest) : '-';
      const diff =
        r.tjs.fail === 0 && other.fail === 0 ? formatDiff(r.tjs.nsPerTest, other.nsPerTest) : '-';
      const tjsStatus = r.tjs.fail === 0 ? '✅' : `⚠️ ${r.tjs.fail} fail`;
      const otherStatus = other.fail === 0 ? '✅' : `⚠️ ${other.fail} fail`;
      lines.push(
        `| ${r.file} | ${r.testCount} | ${tjsStatus} | ${tjsOps} | ${otherStatus} | ${otherOps} | ${diff} |`
      );
    }
    lines.push('');
  }

  console.log(lines.join('\n'));
}

main();
