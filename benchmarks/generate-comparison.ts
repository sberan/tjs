/**
 * Generate a comparison between current benchmark results and main branch
 *
 * Usage:
 *   npx tsx benchmarks/generate-comparison.ts [--format pr-comment|pr-body]
 *
 * This script compares the current benchmark JSON files against the versions
 * on origin/main and generates a formatted diff showing performance changes.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

function getMainFileContent(filePath: string): string | null {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    return execSync(`git show origin/main:${relativePath} 2>/dev/null`, {
      encoding: 'utf-8',
    });
  } catch {
    return null;
  }
}

function loadJson(content: string): BenchmarkData | null {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function formatOps(ns: number): string {
  if (ns === 0) return '-';
  const ops = 1e9 / ns;
  if (ops >= 1_000_000) {
    return `${(ops / 1_000_000).toFixed(1)}M`;
  }
  return `${(ops / 1_000).toFixed(0)}K`;
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

interface ValidatorComparison {
  validator: string;
  drafts: {
    draft: string;
    tjs: { old: number; new: number };
    other: { old: number; new: number };
  }[];
  h2hOld: H2H | null;
  h2hNew: H2H | null;
}

function compareValidator(validator: string): ValidatorComparison | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const newContent = fs.readFileSync(filePath, 'utf-8');
  const oldContent = getMainFileContent(filePath);

  const newData = loadJson(newContent);
  const oldData = oldContent ? loadJson(oldContent) : null;

  if (!newData) return null;

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const draftComparisons = [];

  for (const draft of drafts) {
    const newSummary = newData.summary[draft];
    const oldSummary = oldData?.summary[draft];

    if (!newSummary) continue;

    draftComparisons.push({
      draft,
      tjs: {
        old: oldSummary?.tjs.nsPerTest ?? 0,
        new: newSummary.tjs.nsPerTest,
      },
      other: {
        old: oldSummary?.other.nsPerTest ?? 0,
        new: newSummary.other.nsPerTest,
      },
    });
  }

  return {
    validator,
    drafts: draftComparisons,
    h2hOld: oldData?.headToHead ?? null,
    h2hNew: newData.headToHead,
  };
}

function generatePrComment(): string {
  const validators = ['ajv', 'zod', 'joi'];
  const comparisons = validators.map(compareValidator).filter((c) => c !== null);

  if (comparisons.length === 0) {
    return '## Benchmark Results\n\nNo benchmark data available.';
  }

  const lines: string[] = [];
  lines.push('## Benchmark Results');
  lines.push('');

  for (const comp of comparisons) {
    const hasOldData = comp.drafts.some((d) => d.tjs.old > 0);

    lines.push(`### tjs vs ${comp.validator}`);
    lines.push('');

    if (hasOldData) {
      lines.push(
        '| Draft | tjs (PR) | tjs (main) | Δ | ' +
          `${comp.validator} (PR) | ${comp.validator} (main) | Δ |`
      );
      lines.push('|-------|----------|------------|---|----------|------------|---|');
    } else {
      lines.push(`| Draft | tjs | ${comp.validator} | tjs vs ${comp.validator} |`);
      lines.push('|-------|-----|-----|-----|');
    }

    for (const d of comp.drafts) {
      if (hasOldData) {
        const tjsDiff = formatDiffPercent(d.tjs.new, d.tjs.old);
        const tjsEmoji = formatDiffEmoji(d.tjs.new, d.tjs.old);
        const otherDiff = formatDiffPercent(d.other.new, d.other.old);
        const otherEmoji = formatDiffEmoji(d.other.new, d.other.old);

        lines.push(
          `| ${d.draft} | ${formatOps(d.tjs.new)} | ${formatOps(d.tjs.old)} | ${tjsEmoji} ${tjsDiff} | ` +
            `${formatOps(d.other.new)} | ${formatOps(d.other.old)} | ${otherEmoji} ${otherDiff} |`
        );
      } else {
        const ratio = d.other.new > 0 ? ((d.tjs.new - d.other.new) / d.other.new) * 100 : 0;
        const emoji = ratio < 0 ? '🟢' : ratio > 0 ? '🔴' : '';
        lines.push(
          `| ${d.draft} | ${formatOps(d.tjs.new)} | ${formatOps(d.other.new)} | ${emoji} ${ratio > 0 ? '+' : ''}${ratio.toFixed(0)}% |`
        );
      }
    }
    lines.push('');

    // Head-to-head
    if (comp.h2hNew) {
      const h2h = comp.h2hNew;
      const emoji = h2h.faster === 'tjs' ? '🟢' : '🔴';

      if (comp.h2hOld) {
        const oldRatio = comp.h2hOld.ratio;
        const newRatio = h2h.ratio;
        const ratioChange = ((newRatio - oldRatio) / oldRatio) * 100;
        const changeStr =
          Math.abs(ratioChange) < 1
            ? ''
            : ratioChange > 0
              ? ` (↑${ratioChange.toFixed(1)}%)`
              : ` (↓${Math.abs(ratioChange).toFixed(1)}%)`;

        lines.push(
          `**Head-to-Head**: ${emoji} ${h2h.faster} is **${h2h.ratio.toFixed(2)}×** faster${changeStr}`
        );
      } else {
        lines.push(
          `**Head-to-Head**: ${emoji} ${h2h.faster} is **${h2h.ratio.toFixed(2)}×** faster (${h2h.totalTests} tests)`
        );
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

function generatePrBody(): string {
  const validators = ['ajv', 'zod', 'joi'];
  const comparisons = validators.map(compareValidator).filter((c) => c !== null);

  const lines: string[] = [];
  lines.push('## Summary');
  lines.push('');
  lines.push('This PR updates the benchmark results and documentation.');
  lines.push('');

  if (comparisons.length > 0) {
    lines.push('### Performance Changes');
    lines.push('');

    for (const comp of comparisons) {
      const hasOldData = comp.drafts.some((d) => d.tjs.old > 0);
      if (!hasOldData) continue;

      // Calculate overall change
      let totalOldNs = 0;
      let totalNewNs = 0;
      let totalTests = 0;
      for (const d of comp.drafts) {
        if (d.tjs.old > 0 && d.tjs.new > 0) {
          totalOldNs += d.tjs.old;
          totalNewNs += d.tjs.new;
          totalTests++;
        }
      }

      if (totalTests > 0) {
        const avgDiff = ((totalOldNs - totalNewNs) / totalOldNs) * 100;
        if (Math.abs(avgDiff) >= 1) {
          const emoji = avgDiff > 0 ? '🟢' : '🔴';
          const direction = avgDiff > 0 ? 'faster' : 'slower';
          lines.push(
            `- **tjs vs ${comp.validator}**: ${emoji} tjs is ${Math.abs(avgDiff).toFixed(1)}% ${direction}`
          );
        }
      }

      // Show h2h ratio change
      if (comp.h2hOld && comp.h2hNew) {
        const oldRatio = comp.h2hOld.ratio;
        const newRatio = comp.h2hNew.ratio;
        if (Math.abs(newRatio - oldRatio) >= 0.1) {
          lines.push(`  - Head-to-head: ${oldRatio.toFixed(2)}× → ${newRatio.toFixed(2)}×`);
        }
      }
    }

    lines.push('');
    lines.push('<details>');
    lines.push('<summary>Detailed comparison (click to expand)</summary>');
    lines.push('');

    for (const comp of comparisons) {
      const hasOldData = comp.drafts.some((d) => d.tjs.old > 0);
      if (!hasOldData) continue;

      lines.push(`#### tjs vs ${comp.validator}`);
      lines.push('');
      lines.push('| Draft | tjs (new) | tjs (old) | Δ |');
      lines.push('|-------|-----------|-----------|---|');

      for (const d of comp.drafts) {
        if (d.tjs.old === 0) continue;
        const diff = formatDiffPercent(d.tjs.new, d.tjs.old);
        const emoji = formatDiffEmoji(d.tjs.new, d.tjs.old);
        lines.push(
          `| ${d.draft} | ${formatOps(d.tjs.new)} | ${formatOps(d.tjs.old)} | ${emoji} ${diff} |`
        );
      }
      lines.push('');
    }

    lines.push('</details>');
    lines.push('');
  }

  lines.push('### Files Updated');
  lines.push('- Benchmark results JSON files');
  lines.push('- Benchmark markdown reports');
  lines.push('- SVG performance chart');
  lines.push('- README.md benchmark data');
  lines.push('');

  return lines.join('\n');
}

function main() {
  const format = process.argv.includes('--format')
    ? process.argv[process.argv.indexOf('--format') + 1]
    : 'pr-comment';

  if (format === 'pr-body') {
    console.log(generatePrBody());
  } else {
    console.log(generatePrComment());
  }
}

main();
