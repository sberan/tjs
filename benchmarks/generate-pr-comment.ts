/**
 * Generate a PR comment from benchmark JSON output.
 *
 * Usage:
 *   npx tsx benchmarks/generate-pr-comment.ts <json-file> > comment.md
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
  summary: Record<string, DraftSummary>;
  headToHead: H2H | null;
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
  const jsonFile = process.argv[2];
  if (!jsonFile) {
    console.error('Usage: npx tsx benchmarks/generate-pr-comment.ts <json-file>');
    process.exit(1);
  }

  const data: BenchmarkData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  const validator = data.compareValidator;

  const lines: string[] = [];

  lines.push('## Benchmark Results');
  lines.push('');

  // Summary table
  lines.push('### Performance Summary');
  lines.push('');
  lines.push(`| Draft | tjs | ${validator} | tjs vs ${validator} |`);
  lines.push('|-------|----:|----:|:----------:|');

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;
    const diff = formatDiff(s.tjs.nsPerTest, s.other.nsPerTest);
    const emoji = s.tjs.nsPerTest < s.other.nsPerTest ? '🟢' : '🔴';
    lines.push(
      `| ${draft} | ${formatOps(s.tjs.nsPerTest)} | ${formatOps(s.other.nsPerTest)} | ${emoji} ${diff} |`
    );
  }
  lines.push('');

  // Head-to-head
  lines.push('### Head-to-Head');
  lines.push('');
  lines.push('_Only includes test groups where both validators pass all tests._');
  lines.push('');
  const h2h = data.headToHead;
  if (h2h) {
    const emoji = h2h.faster === 'tjs' ? '🟢' : '🔴';
    lines.push(
      `- **tjs vs ${validator}**: ${emoji} ${h2h.faster} is ${h2h.ratio.toFixed(2)}x faster (${h2h.totalTests} tests)`
    );
  }
  lines.push('');

  // Compliance
  lines.push('### Compliance');
  lines.push('');
  lines.push(`| Draft | tjs | ${validator} |`);
  lines.push('|-------|----:|----:|');
  for (const draft of drafts) {
    const s = data.summary[draft];
    if (!s) continue;
    const tjsTotal = s.tjs.pass + s.tjs.fail;
    const otherTotal = s.other.pass + s.other.fail;
    lines.push(`| ${draft} | ${s.tjs.pass}/${tjsTotal} | ${s.other.pass}/${otherTotal} |`);
  }

  console.log(lines.join('\n'));
}

main();
