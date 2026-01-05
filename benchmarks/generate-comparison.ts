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

function loadJson(content: string): ValidatorBenchmark | null {
  try {
    const data = JSON.parse(content);
    // Validate that this is the new format (has results array with groups)
    if (!data.results || !Array.isArray(data.results)) return null;
    if (data.results.length > 0 && !Array.isArray(data.results[0].groups)) return null;
    return data;
  } catch {
    return null;
  }
}

function loadValidatorData(validator: string): ValidatorBenchmark | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return loadJson(content);
}

function loadValidatorDataFromMain(validator: string): ValidatorBenchmark | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  const content = getMainFileContent(filePath);
  return content ? loadJson(content) : null;
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

// Calculate average ns/test for a validator's draft
function calculateDraftNs(data: ValidatorBenchmark, draft: string): number {
  const draftResults = data.results.filter((r) => r.draft === draft);
  let totalNs = 0;
  let totalTests = 0;

  for (const result of draftResults) {
    for (const group of result.groups) {
      if (group.passed && group.nsPerTest > 0) {
        totalNs += group.nsPerTest * group.testCount;
        totalTests += group.testCount;
      }
    }
  }

  return totalTests > 0 ? totalNs / totalTests : 0;
}

// Calculate head-to-head comparison between two validators
function calculateH2H(
  tjsData: ValidatorBenchmark,
  otherData: ValidatorBenchmark
): { faster: string; ratio: number; tests: number } | null {
  // Build lookup for other validator's groups
  const otherLookup = new Map<string, GroupResult>();
  for (const result of otherData.results) {
    for (const group of result.groups) {
      const key = `${result.draft}:${result.file}:${group.groupDesc}`;
      otherLookup.set(key, group);
    }
  }

  let h2hTjsNs = 0;
  let h2hOtherNs = 0;
  let h2hTests = 0;

  for (const result of tjsData.results) {
    for (const tjsGroup of result.groups) {
      const key = `${result.draft}:${result.file}:${tjsGroup.groupDesc}`;
      const otherGroup = otherLookup.get(key);

      if (
        tjsGroup.passed &&
        otherGroup?.passed &&
        tjsGroup.nsPerTest > 0 &&
        otherGroup.nsPerTest > 0
      ) {
        h2hTjsNs += tjsGroup.nsPerTest * tjsGroup.testCount;
        h2hOtherNs += otherGroup.nsPerTest * otherGroup.testCount;
        h2hTests += tjsGroup.testCount;
      }
    }
  }

  if (h2hTests === 0) return null;

  const tjsAvg = h2hTjsNs / h2hTests;
  const otherAvg = h2hOtherNs / h2hTests;

  const faster = tjsAvg < otherAvg ? 'tjs' : otherData.validator;
  const ratio = tjsAvg < otherAvg ? otherAvg / tjsAvg : tjsAvg / otherAvg;

  return { faster, ratio, tests: h2hTests };
}

interface ValidatorComparison {
  validator: string;
  drafts: {
    draft: string;
    tjsOld: number;
    tjsNew: number;
    otherOld: number;
    otherNew: number;
  }[];
  h2hOld: { faster: string; ratio: number; tests: number } | null;
  h2hNew: { faster: string; ratio: number; tests: number } | null;
}

const ALL_VALIDATORS = [
  'ajv',
  'zod',
  'joi',
  'jsonschema',
  'is-my-json-valid',
  'z-schema',
  'djv',
  'jsen',
  'schemasafe',
];

function compareValidator(validator: string): ValidatorComparison | null {
  const tjsNew = loadValidatorData('tjs');
  const otherNew = loadValidatorData(validator);

  if (!tjsNew || !otherNew) return null;

  const tjsOld = loadValidatorDataFromMain('tjs');
  const otherOld = loadValidatorDataFromMain(validator);

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const draftComparisons = [];

  for (const draft of drafts) {
    const tjsNewNs = calculateDraftNs(tjsNew, draft);
    const otherNewNs = calculateDraftNs(otherNew, draft);

    if (tjsNewNs === 0 && otherNewNs === 0) continue;

    draftComparisons.push({
      draft,
      tjsOld: tjsOld ? calculateDraftNs(tjsOld, draft) : 0,
      tjsNew: tjsNewNs,
      otherOld: otherOld ? calculateDraftNs(otherOld, draft) : 0,
      otherNew: otherNewNs,
    });
  }

  return {
    validator,
    drafts: draftComparisons,
    h2hOld: tjsOld && otherOld ? calculateH2H(tjsOld, otherOld) : null,
    h2hNew: calculateH2H(tjsNew, otherNew),
  };
}

function generatePrComment(): string {
  const comparisons = ALL_VALIDATORS.map(compareValidator).filter((c) => c !== null);

  if (comparisons.length === 0) {
    return '## Benchmark Results\n\nNo benchmark data available.';
  }

  const lines: string[] = [];
  lines.push('## Benchmark Results');
  lines.push('');

  for (const comp of comparisons) {
    const hasOldData = comp.drafts.some((d) => d.tjsOld > 0);

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
        const tjsDiff = formatDiffPercent(d.tjsNew, d.tjsOld);
        const tjsEmoji = formatDiffEmoji(d.tjsNew, d.tjsOld);
        const otherDiff = formatDiffPercent(d.otherNew, d.otherOld);
        const otherEmoji = formatDiffEmoji(d.otherNew, d.otherOld);

        lines.push(
          `| ${d.draft} | ${formatOps(d.tjsNew)} | ${formatOps(d.tjsOld)} | ${tjsEmoji} ${tjsDiff} | ` +
            `${formatOps(d.otherNew)} | ${formatOps(d.otherOld)} | ${otherEmoji} ${otherDiff} |`
        );
      } else {
        const ratio = d.otherNew > 0 ? ((d.tjsNew - d.otherNew) / d.otherNew) * 100 : 0;
        const emoji = ratio < 0 ? '🟢' : ratio > 0 ? '🔴' : '';
        lines.push(
          `| ${d.draft} | ${formatOps(d.tjsNew)} | ${formatOps(d.otherNew)} | ${emoji} ${ratio > 0 ? '+' : ''}${ratio.toFixed(0)}% |`
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
          `**Head-to-Head**: ${emoji} ${h2h.faster} is **${h2h.ratio.toFixed(2)}×** faster (${h2h.tests} tests)`
        );
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

function generatePrBody(): string {
  const comparisons = ALL_VALIDATORS.map(compareValidator).filter((c) => c !== null);

  const lines: string[] = [];
  lines.push('## Summary');
  lines.push('');
  lines.push('This PR updates the benchmark results and documentation.');
  lines.push('');

  if (comparisons.length > 0) {
    lines.push('### Performance Changes');
    lines.push('');

    for (const comp of comparisons) {
      const hasOldData = comp.drafts.some((d) => d.tjsOld > 0);
      if (!hasOldData) continue;

      // Calculate overall change
      let totalOldNs = 0;
      let totalNewNs = 0;
      let totalTests = 0;
      for (const d of comp.drafts) {
        if (d.tjsOld > 0 && d.tjsNew > 0) {
          totalOldNs += d.tjsOld;
          totalNewNs += d.tjsNew;
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
      const hasOldData = comp.drafts.some((d) => d.tjsOld > 0);
      if (!hasOldData) continue;

      lines.push(`#### tjs vs ${comp.validator}`);
      lines.push('');
      lines.push('| Draft | tjs (new) | tjs (old) | Δ |');
      lines.push('|-------|-----------|-----------|---|');

      for (const d of comp.drafts) {
        if (d.tjsOld === 0) continue;
        const diff = formatDiffPercent(d.tjsNew, d.tjsOld);
        const emoji = formatDiffEmoji(d.tjsNew, d.tjsOld);
        lines.push(
          `| ${d.draft} | ${formatOps(d.tjsNew)} | ${formatOps(d.tjsOld)} | ${emoji} ${diff} |`
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
