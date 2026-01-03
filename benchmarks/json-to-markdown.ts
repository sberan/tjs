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

  // Summary table
  lines.push('## Summary');
  lines.push('');
  lines.push(
    `| Draft | Files | Tests | tjs pass | tjs fail | tjs ops/s | ${validator} pass | ${validator} fail | ${validator} ops/s | tjs vs ${validator} |`
  );
  lines.push(
    '|-------|------:|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|'
  );

  let totalFiles = 0;
  let totalTests = 0;
  let totalTjs = { pass: 0, fail: 0, ns: 0 };
  let totalOther = { pass: 0, fail: 0, ns: 0 };

  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;

    const other = s[validatorKey];

    totalFiles += s.files;
    totalTests += s.tests;
    totalTjs.pass += s.tjs.pass;
    totalTjs.fail += s.tjs.fail;
    totalTjs.ns += s.tjs.nsPerTest * s.tests;
    totalOther.pass += other.pass;
    totalOther.fail += other.fail;
    totalOther.ns += other.nsPerTest * s.tests;

    lines.push(
      `| ${draft} | ${s.files} | ${s.tests} | ${formatPassFail(s.tjs.pass, s.tjs.fail)} | ${s.tjs.fail} | ${formatOpsPerSec(s.tjs.nsPerTest)} | ${formatPassFail(other.pass, other.fail)} | ${other.fail} | ${formatOpsPerSec(other.nsPerTest)} | ${formatDiff(s.tjs.nsPerTest, other.nsPerTest)} |`
    );
  }

  const avgTjsNs = totalTests > 0 ? totalTjs.ns / totalTests : 0;
  const avgOtherNs = totalTests > 0 ? totalOther.ns / totalTests : 0;

  lines.push(
    `| **Total** | ${totalFiles} | ${totalTests} | ✅ ${totalTjs.pass} | ${totalTjs.fail} | ${formatOpsPerSec(avgTjsNs)} | ✅ ${totalOther.pass} | ${totalOther.fail} | ${formatOpsPerSec(avgOtherNs)} | ${formatDiff(avgTjsNs, avgOtherNs)} |`
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

  for (const draft of drafts) {
    const draftResults = data.results.filter((r) => r.draft === draft);
    if (draftResults.length === 0) continue;

    lines.push(`### ${draft}`);
    lines.push('');
    lines.push(
      `| File | Tests | tjs pass | tjs fail | tjs ops/s | ${validator} pass | ${validator} fail | ${validator} ops/s | Diff |`
    );
    lines.push(
      '|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|'
    );

    for (const r of draftResults) {
      const other = r[validatorKey];
      lines.push(
        `| ${r.file} | ${r.testCount} | ${formatPassFail(r.tjs.pass, r.tjs.fail)} | ${r.tjs.fail} | ${formatOpsPerSec(r.tjs.nsPerTest)} | ${formatPassFail(other.pass, other.fail)} | ${other.fail} | ${formatOpsPerSec(other.nsPerTest)} | ${formatDiff(r.tjs.nsPerTest, other.nsPerTest)} |`
      );
    }
    lines.push('');
  }

  console.log(lines.join('\n'));
}

main();
