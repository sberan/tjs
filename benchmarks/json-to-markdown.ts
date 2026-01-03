/**
 * Convert benchmark JSON output to BENCHMARKS.md format
 *
 * Usage:
 *   npm run bench --json | npx tsx benchmarks/json-to-markdown.ts > BENCHMARKS.md
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
  results: FileResult[];
  summary: Record<string, DraftSummary>;
  headToHead: {
    tjsVsAjv: H2H | null;
    tjsVsZod: H2H | null;
    tjsVsJoi: H2H | null;
    ajvVsZod: H2H | null;
    ajvVsJoi: H2H | null;
  };
}

function formatOpsPerSec(nsPerTest: number): string {
  if (nsPerTest === 0) return '-';
  const opsPerSec = 1_000_000_000 / nsPerTest;
  if (opsPerSec >= 1_000_000) {
    return `${(opsPerSec / 1_000_000).toFixed(1)}M`;
  }
  return `${(opsPerSec / 1_000).toFixed(0)}K`;
}

function formatDiff(tjsNs: number, ajvNs: number): string {
  if (ajvNs === 0 || tjsNs === 0) return '-';
  const diff = ((tjsNs - ajvNs) / ajvNs) * 100;
  if (Math.abs(diff) < 20) return `${diff > 0 ? '+' : ''}${Math.round(diff)}%`;
  if (diff > 0) return `🔴 **+${Math.round(diff)}%**`;
  return `🟢 **${Math.round(diff)}%**`;
}

function formatPassFail(pass: number, fail: number, linkAnchor?: string): string {
  if (fail === 0) return `✅ ${pass}`;
  if (linkAnchor) return `⚠️ ${pass}`;
  return `⚠️ ${pass}`;
}

function main() {
  // Read JSON from stdin
  let input = '';
  const stdin = fs.readFileSync(0, 'utf-8');
  input = stdin;

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

  lines.push('# Benchmarks');
  lines.push('');
  lines.push(
    'Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** vs **[zod](https://zod.dev/)** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).'
  );
  lines.push('');

  // Summary table
  lines.push('## Summary');
  lines.push('');
  lines.push(
    '| Draft | Files | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | zod pass | zod fail | zod ops/s | joi pass | joi fail | joi ops/s | tjs vs ajv |'
  );
  lines.push(
    '|-------|------:|------:|---------:|---------:|----------:|---------:|---------:|----------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|'
  );

  let totalFiles = 0;
  let totalTests = 0;
  let totalTjs = { pass: 0, fail: 0, ns: 0 };
  let totalAjv = { pass: 0, fail: 0, ns: 0 };
  let totalZod = { pass: 0, fail: 0, ns: 0 };
  let totalJoi = { pass: 0, fail: 0, ns: 0 };

  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;

    totalFiles += s.files;
    totalTests += s.tests;
    totalTjs.pass += s.tjs.pass;
    totalTjs.fail += s.tjs.fail;
    totalTjs.ns += s.tjs.nsPerTest * s.tests;
    totalAjv.pass += s.ajv.pass;
    totalAjv.fail += s.ajv.fail;
    totalAjv.ns += s.ajv.nsPerTest * s.tests;
    totalZod.pass += s.zod.pass;
    totalZod.fail += s.zod.fail;
    totalZod.ns += s.zod.nsPerTest * s.tests;
    totalJoi.pass += s.joi.pass;
    totalJoi.fail += s.joi.fail;
    totalJoi.ns += s.joi.nsPerTest * s.tests;

    lines.push(
      `| ${draft} | ${s.files} | ${s.tests} | ${formatPassFail(s.tjs.pass, s.tjs.fail)} | ${s.tjs.fail} | ${formatOpsPerSec(s.tjs.nsPerTest)} | ${formatPassFail(s.ajv.pass, s.ajv.fail)} | ${s.ajv.fail} | ${formatOpsPerSec(s.ajv.nsPerTest)} | ${formatPassFail(s.zod.pass, s.zod.fail)} | ${s.zod.fail} | ${formatOpsPerSec(s.zod.nsPerTest)} | ${formatPassFail(s.joi.pass, s.joi.fail)} | ${s.joi.fail} | ${formatOpsPerSec(s.joi.nsPerTest)} | ${formatDiff(s.tjs.nsPerTest, s.ajv.nsPerTest)} |`
    );
  }

  const avgTjsNs = totalTests > 0 ? totalTjs.ns / totalTests : 0;
  const avgAjvNs = totalTests > 0 ? totalAjv.ns / totalTests : 0;
  const avgZodNs = totalTests > 0 ? totalZod.ns / totalTests : 0;
  const avgJoiNs = totalTests > 0 ? totalJoi.ns / totalTests : 0;

  lines.push(
    `| **Total** | ${totalFiles} | ${totalTests} | ✅ ${totalTjs.pass} | ${totalTjs.fail} | ${formatOpsPerSec(avgTjsNs)} | ✅ ${totalAjv.pass} | ${totalAjv.fail} | ${formatOpsPerSec(avgAjvNs)} | ✅ ${totalZod.pass} | ${totalZod.fail} | ${formatOpsPerSec(avgZodNs)} | ✅ ${totalJoi.pass} | ${totalJoi.fail} | ${formatOpsPerSec(avgJoiNs)} | ${formatDiff(avgTjsNs, avgAjvNs)} |`
  );
  lines.push('');

  // Head-to-head section
  lines.push('## Head-to-Head Performance');
  lines.push('');
  lines.push('Comparison on test groups where both validators pass all tests:');
  lines.push('');

  const h2h = data.headToHead;
  if (h2h.tjsVsAjv) {
    const emoji = h2h.tjsVsAjv.faster === 'tjs' ? '🟢' : '🔴';
    lines.push(
      `- **tjs vs ajv**: ${emoji} ${h2h.tjsVsAjv.faster} is ${h2h.tjsVsAjv.ratio.toFixed(2)}x faster (${Math.round(h2h.tjsVsAjv.avgNsA)} ns vs ${Math.round(h2h.tjsVsAjv.avgNsB)} ns, ${h2h.tjsVsAjv.totalTests} tests)`
    );
  }
  if (h2h.tjsVsZod) {
    const emoji = h2h.tjsVsZod.faster === 'tjs' ? '🟢' : '🔴';
    lines.push(
      `- **tjs vs zod**: ${emoji} ${h2h.tjsVsZod.faster} is ${h2h.tjsVsZod.ratio.toFixed(0)}x faster (${Math.round(h2h.tjsVsZod.avgNsA)} ns vs ${Math.round(h2h.tjsVsZod.avgNsB).toLocaleString()} ns, ${h2h.tjsVsZod.totalTests} tests)`
    );
  }
  if (h2h.tjsVsJoi) {
    const emoji = h2h.tjsVsJoi.faster === 'tjs' ? '🟢' : '🔴';
    lines.push(
      `- **tjs vs joi**: ${emoji} ${h2h.tjsVsJoi.faster} is ${h2h.tjsVsJoi.ratio.toFixed(2)}x faster (${Math.round(h2h.tjsVsJoi.avgNsA)} ns vs ${Math.round(h2h.tjsVsJoi.avgNsB)} ns, ${h2h.tjsVsJoi.totalTests} tests)`
    );
  }
  if (h2h.ajvVsZod) {
    lines.push(
      `- **ajv vs zod**: ${h2h.ajvVsZod.faster} is ${h2h.ajvVsZod.ratio.toFixed(0)}x faster`
    );
  }
  if (h2h.ajvVsJoi) {
    lines.push(
      `- **ajv vs joi**: ${h2h.ajvVsJoi.faster} is ${h2h.ajvVsJoi.ratio.toFixed(2)}x faster`
    );
  }
  lines.push('');

  // Detailed results by draft
  lines.push('## Detailed Results');
  lines.push('');

  for (const draft of drafts) {
    const draftResults = data.results.filter((r) => r.draft === draft);
    if (draftResults.length === 0) continue;

    lines.push(`### ${draft}`);
    lines.push('');
    lines.push(
      '| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |'
    );
    lines.push(
      '|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|'
    );

    for (const r of draftResults) {
      lines.push(
        `| ${r.file} | ${r.testCount} | ${formatPassFail(r.tjs.pass, r.tjs.fail)} | ${r.tjs.fail} | ${formatOpsPerSec(r.tjs.nsPerTest)} | ${formatPassFail(r.ajv.pass, r.ajv.fail)} | ${r.ajv.fail} | ${formatOpsPerSec(r.ajv.nsPerTest)} | ${formatDiff(r.tjs.nsPerTest, r.ajv.nsPerTest)} |`
      );
    }
    lines.push('');
  }

  console.log(lines.join('\n'));
}

main();
