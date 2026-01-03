/**
 * Generate a PR comment from benchmark JSON output.
 *
 * Usage:
 *   npx tsx benchmarks/generate-pr-comment.ts < benchmark.json > comment.md
 */

import * as fs from 'fs';

interface ValidatorStats {
  nsPerTest: number;
  pass: number;
  fail: number;
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
  summary: Record<string, DraftSummary>;
  headToHead: {
    tjsVsAjv: H2H | null;
    tjsVsZod: H2H | null;
    tjsVsJoi: H2H | null;
    ajvVsZod: H2H | null;
    ajvVsJoi: H2H | null;
  };
}

function formatOps(ns: number): string {
  if (ns === 0) return '-';
  return (1e9 / ns / 1e6).toFixed(1) + 'M';
}

function formatDiff(a: number, b: number): string {
  if (b === 0) return '-';
  const diff = ((a - b) / b) * 100;
  return (diff > 0 ? '+' : '') + Math.round(diff) + '%';
}

function main() {
  const input = fs.readFileSync(0, 'utf-8');
  const data: BenchmarkData = JSON.parse(input);

  const lines: string[] = [];

  lines.push('## Benchmark Results');
  lines.push('');

  // Summary table
  lines.push('### Performance Summary');
  lines.push('');
  lines.push('| Draft | tjs | ajv | tjs vs ajv |');
  lines.push('|-------|----:|----:|:----------:|');

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;
    const diff = formatDiff(s.tjs.nsPerTest, s.ajv.nsPerTest);
    const emoji = s.tjs.nsPerTest < s.ajv.nsPerTest ? '🟢' : '🔴';
    lines.push(
      `| ${draft} | ${formatOps(s.tjs.nsPerTest)} | ${formatOps(s.ajv.nsPerTest)} | ${emoji} ${diff} |`
    );
  }
  lines.push('');

  // Head-to-head
  lines.push('### Head-to-Head');
  lines.push('');
  const h2h = data.headToHead;
  if (h2h.tjsVsAjv) {
    const emoji = h2h.tjsVsAjv.faster === 'tjs' ? '🟢' : '🔴';
    lines.push(
      `- **tjs vs ajv**: ${emoji} ${h2h.tjsVsAjv.faster} is ${h2h.tjsVsAjv.ratio.toFixed(2)}x faster (${h2h.tjsVsAjv.totalTests} tests)`
    );
  }
  lines.push('');

  // Compliance
  lines.push('### Compliance');
  lines.push('');
  lines.push('| Draft | tjs | ajv |');
  lines.push('|-------|----:|----:|');
  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;
    const tjsTotal = s.tjs.pass + s.tjs.fail;
    const ajvTotal = s.ajv.pass + s.ajv.fail;
    lines.push(`| ${draft} | ${s.tjs.pass}/${tjsTotal} | ${s.ajv.pass}/${ajvTotal} |`);
  }

  console.log(lines.join('\n'));
}

main();
