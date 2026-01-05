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

// Build a lookup map for groups by draft:file:groupDesc
function buildGroupLookup(data: ValidatorBenchmark): Map<string, GroupResult> {
  const lookup = new Map<string, GroupResult>();
  for (const result of data.results) {
    for (const group of result.groups) {
      const key = `${result.draft}:${result.file}:${group.groupDesc}`;
      lookup.set(key, group);
    }
  }
  return lookup;
}

// Calculate head-to-head comparison between two validators (optionally filtered by draft)
function calculateH2H(
  tjsData: ValidatorBenchmark,
  otherData: ValidatorBenchmark,
  filterDraft?: string
): { tjsNs: number; otherNs: number; faster: string; ratio: number; tests: number } | null {
  const otherLookup = buildGroupLookup(otherData);

  let h2hTjsNs = 0;
  let h2hOtherNs = 0;
  let h2hTests = 0;

  for (const result of tjsData.results) {
    // Skip if filtering by draft and this doesn't match
    if (filterDraft && result.draft !== filterDraft) continue;

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

  return { tjsNs: tjsAvg, otherNs: otherAvg, faster, ratio, tests: h2hTests };
}

interface DraftH2H {
  draft: string;
  tjsNs: number;
  otherNs: number;
  tests: number;
}

interface ValidatorComparison {
  validator: string;
  // H2H comparison per draft (fair: only tests both pass)
  drafts: DraftH2H[];
  draftsOld: DraftH2H[];
  h2hOld: { tjsNs: number; otherNs: number; faster: string; ratio: number; tests: number } | null;
  h2hNew: { tjsNs: number; otherNs: number; faster: string; ratio: number; tests: number } | null;
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

  const draftNames = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];

  // Calculate H2H per draft (fair comparison on shared tests)
  const drafts: DraftH2H[] = [];
  const draftsOld: DraftH2H[] = [];

  for (const draft of draftNames) {
    const h2hNew = calculateH2H(tjsNew, otherNew, draft);
    if (h2hNew) {
      drafts.push({
        draft,
        tjsNs: h2hNew.tjsNs,
        otherNs: h2hNew.otherNs,
        tests: h2hNew.tests,
      });
    }

    if (tjsOld && otherOld) {
      const h2hOldDraft = calculateH2H(tjsOld, otherOld, draft);
      if (h2hOldDraft) {
        draftsOld.push({
          draft,
          tjsNs: h2hOldDraft.tjsNs,
          otherNs: h2hOldDraft.otherNs,
          tests: h2hOldDraft.tests,
        });
      }
    }
  }

  return {
    validator,
    drafts,
    draftsOld,
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
  lines.push('_All comparisons use head-to-head benchmarks on tests both validators pass._');
  lines.push('');

  for (const comp of comparisons) {
    const hasOldData = comp.draftsOld.length > 0;

    lines.push(`### tjs vs ${comp.validator}`);
    lines.push('');

    if (hasOldData) {
      // Build lookup for old data by draft
      const oldByDraft = new Map(comp.draftsOld.map((d) => [d.draft, d]));

      lines.push(
        '| Draft | tjs (PR) | tjs (main) | Δ | ' +
          `${comp.validator} (PR) | ${comp.validator} (main) | Δ |`
      );
      lines.push('|-------|----------|------------|---|----------|------------|---|');

      for (const d of comp.drafts) {
        const old = oldByDraft.get(d.draft);
        const tjsOld = old?.tjsNs ?? 0;
        const otherOld = old?.otherNs ?? 0;

        const tjsDiff = tjsOld > 0 ? formatDiffPercent(d.tjsNs, tjsOld) : 'new';
        const tjsEmoji = tjsOld > 0 ? formatDiffEmoji(d.tjsNs, tjsOld) : '';
        const otherDiff = otherOld > 0 ? formatDiffPercent(d.otherNs, otherOld) : 'new';
        const otherEmoji = otherOld > 0 ? formatDiffEmoji(d.otherNs, otherOld) : '';

        lines.push(
          `| ${d.draft} | ${formatOps(d.tjsNs)} | ${formatOps(tjsOld)} | ${tjsEmoji} ${tjsDiff} | ` +
            `${formatOps(d.otherNs)} | ${formatOps(otherOld)} | ${otherEmoji} ${otherDiff} |`
        );
      }
    } else {
      lines.push(`| Draft | tjs | ${comp.validator} | tjs vs ${comp.validator} |`);
      lines.push('|-------|-----|-----|-----|');

      for (const d of comp.drafts) {
        // Calculate ratio: positive means tjs is slower
        const ratio = d.otherNs > 0 ? ((d.tjsNs - d.otherNs) / d.otherNs) * 100 : 0;
        const emoji = ratio < -5 ? '🟢' : ratio > 5 ? '🔴' : '';
        lines.push(
          `| ${d.draft} | ${formatOps(d.tjsNs)} | ${formatOps(d.otherNs)} | ${emoji} ${ratio > 0 ? '+' : ''}${ratio.toFixed(0)}% |`
        );
      }
    }
    lines.push('');

    // Overall head-to-head
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
          `**Overall**: ${emoji} ${h2h.faster} is **${h2h.ratio.toFixed(2)}×** faster${changeStr}`
        );
      } else {
        lines.push(
          `**Overall**: ${emoji} ${h2h.faster} is **${h2h.ratio.toFixed(2)}×** faster (${h2h.tests} tests)`
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
    lines.push('_All comparisons use head-to-head benchmarks on tests both validators pass._');
    lines.push('');

    for (const comp of comparisons) {
      const hasOldData = comp.draftsOld.length > 0;
      if (!hasOldData) continue;

      // Show h2h ratio change (this is the fair comparison)
      if (comp.h2hOld && comp.h2hNew) {
        const oldRatio = comp.h2hOld.ratio;
        const newRatio = comp.h2hNew.ratio;
        const oldFaster = comp.h2hOld.faster;
        const newFaster = comp.h2hNew.faster;

        if (Math.abs(newRatio - oldRatio) >= 0.1 || oldFaster !== newFaster) {
          const emoji = newFaster === 'tjs' ? '🟢' : '🔴';
          lines.push(
            `- **tjs vs ${comp.validator}**: ${emoji} ${newFaster} is ${newRatio.toFixed(2)}× faster (was ${oldRatio.toFixed(2)}×)`
          );
        }
      }
    }

    lines.push('');
    lines.push('<details>');
    lines.push('<summary>Detailed comparison (click to expand)</summary>');
    lines.push('');

    for (const comp of comparisons) {
      const hasOldData = comp.draftsOld.length > 0;
      if (!hasOldData) continue;

      const oldByDraft = new Map(comp.draftsOld.map((d) => [d.draft, d]));

      lines.push(`#### tjs vs ${comp.validator}`);
      lines.push('');
      lines.push('| Draft | tjs (new) | tjs (old) | Δ |');
      lines.push('|-------|-----------|-----------|---|');

      for (const d of comp.drafts) {
        const old = oldByDraft.get(d.draft);
        if (!old) continue;
        const diff = formatDiffPercent(d.tjsNs, old.tjsNs);
        const emoji = formatDiffEmoji(d.tjsNs, old.tjsNs);
        lines.push(
          `| ${d.draft} | ${formatOps(d.tjsNs)} | ${formatOps(old.tjsNs)} | ${emoji} ${diff} |`
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
