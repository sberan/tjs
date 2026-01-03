/**
 * Generate a PR comment from benchmark JSON output, comparing against main branch.
 *
 * Usage:
 *   npx tsx benchmarks/generate-pr-comment.ts <json-file> [--base-ref <ref>]
 *
 * The --base-ref flag specifies which git ref to compare against (default: origin/main)
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

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

function getBaseFileContent(filePath: string, baseRef: string): string | null {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    return execSync(`git show ${baseRef}:${relativePath} 2>/dev/null`, {
      encoding: 'utf-8',
    });
  } catch {
    return null;
  }
}

function formatOps(ns: number): string {
  if (ns === 0) return '-';
  const ops = 1e9 / ns;
  if (ops >= 1_000_000) {
    return (ops / 1_000_000).toFixed(1) + 'M';
  }
  return (ops / 1_000).toFixed(0) + 'K';
}

function formatDiffPercent(newNs: number, oldNs: number): string {
  if (oldNs === 0 || newNs === 0) return '-';
  // Lower ns = better, so if new < old, we improved (positive %)
  const diff = ((oldNs - newNs) / oldNs) * 100;
  if (Math.abs(diff) < 1) return '~';
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(1)}%`;
}

function formatDiffEmoji(newNs: number, oldNs: number, threshold = 5): string {
  if (oldNs === 0 || newNs === 0) return '';
  const diff = ((oldNs - newNs) / oldNs) * 100;
  if (Math.abs(diff) < threshold) return '';
  return diff > 0 ? '🟢' : '🔴';
}

function main() {
  const args = process.argv.slice(2);
  const jsonFile = args.find((a) => !a.startsWith('--'));
  const baseRefIndex = args.indexOf('--base-ref');
  const baseRef = baseRefIndex >= 0 ? args[baseRefIndex + 1] : 'origin/main';

  if (!jsonFile) {
    console.error(
      'Usage: npx tsx benchmarks/generate-pr-comment.ts <json-file> [--base-ref <ref>]'
    );
    process.exit(1);
  }

  const data: BenchmarkData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  const validator = data.compareValidator;

  // Try to load base data for comparison
  const baseContent = getBaseFileContent(jsonFile, baseRef);
  const baseData: BenchmarkData | null = baseContent ? JSON.parse(baseContent) : null;
  const hasBaseData = baseData !== null;

  const lines: string[] = [];

  lines.push('## Benchmark Results');
  lines.push('');
  lines.push(`### tjs vs ${validator}`);
  lines.push('');

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];

  if (hasBaseData) {
    // Show comparison with base
    lines.push(
      '| Draft | tjs (PR) | tjs (base) | Δ tjs | ' +
        `${validator} (PR) | ${validator} (base) | Δ ${validator} |`
    );
    lines.push('|-------|----------|------------|-------|----------|------------|-------|');

    for (const draft of drafts) {
      const s = data.summary[draft];
      const base = baseData.summary[draft];
      if (!s) continue;

      const tjsNew = s.tjs.nsPerTest;
      const tjsOld = base?.tjs.nsPerTest ?? 0;
      const otherNew = s.other.nsPerTest;
      const otherOld = base?.other.nsPerTest ?? 0;

      const tjsDiff = tjsOld > 0 ? formatDiffPercent(tjsNew, tjsOld) : 'new';
      const tjsEmoji = tjsOld > 0 ? formatDiffEmoji(tjsNew, tjsOld) : '';
      const otherDiff = otherOld > 0 ? formatDiffPercent(otherNew, otherOld) : 'new';
      const otherEmoji = otherOld > 0 ? formatDiffEmoji(otherNew, otherOld) : '';

      lines.push(
        `| ${draft} | ${formatOps(tjsNew)} | ${formatOps(tjsOld)} | ${tjsEmoji} ${tjsDiff} | ` +
          `${formatOps(otherNew)} | ${formatOps(otherOld)} | ${otherEmoji} ${otherDiff} |`
      );
    }
  } else {
    // No base data, show simple comparison
    lines.push(`| Draft | tjs | ${validator} | tjs vs ${validator} |`);
    lines.push('|-------|----:|----:|:----------:|');

    for (const draft of drafts) {
      const s = data.summary[draft];
      if (!s) continue;

      const ratio =
        s.other.nsPerTest > 0
          ? ((s.tjs.nsPerTest - s.other.nsPerTest) / s.other.nsPerTest) * 100
          : 0;
      const emoji = ratio < 0 ? '🟢' : ratio > 0 ? '🔴' : '';
      const diff = `${ratio > 0 ? '+' : ''}${Math.round(ratio)}%`;

      lines.push(
        `| ${draft} | ${formatOps(s.tjs.nsPerTest)} | ${formatOps(s.other.nsPerTest)} | ${emoji} ${diff} |`
      );
    }
  }

  lines.push('');

  // Head-to-head
  lines.push('### Head-to-Head');
  lines.push('');
  lines.push('_Only includes test groups where both validators pass all tests._');
  lines.push('');

  const h2h = data.headToHead;
  const baseH2h = baseData?.headToHead;

  if (h2h) {
    const emoji = h2h.faster === 'tjs' ? '🟢' : '🔴';

    if (baseH2h) {
      const oldRatio = baseH2h.ratio;
      const newRatio = h2h.ratio;
      const ratioChange = ((newRatio - oldRatio) / oldRatio) * 100;

      let changeStr = '';
      if (Math.abs(ratioChange) >= 1) {
        const arrow = ratioChange > 0 ? '↑' : '↓';
        changeStr = ` (was ${oldRatio.toFixed(2)}×, ${arrow}${Math.abs(ratioChange).toFixed(1)}%)`;
      }

      lines.push(
        `- **tjs vs ${validator}**: ${emoji} ${h2h.faster} is **${h2h.ratio.toFixed(2)}×** faster${changeStr}`
      );
    } else {
      lines.push(
        `- **tjs vs ${validator}**: ${emoji} ${h2h.faster} is ${h2h.ratio.toFixed(2)}× faster (${h2h.totalTests} tests)`
      );
    }
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
