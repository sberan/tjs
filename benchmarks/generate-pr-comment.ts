/**
 * Generate a PR comment from benchmark JSON output, comparing tjs vs ajv.
 *
 * Usage:
 *   npx tsx benchmarks/generate-pr-comment.ts [--base-ref <ref>]
 *
 * The --base-ref flag specifies which git ref to compare against (default: origin/main)
 *
 * Reads from:
 *   benchmarks/results/tjs.json
 *   benchmarks/results/ajv.json
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

function loadBenchmarkData(validator: string): ValidatorBenchmark | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
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

// Calculate head-to-head comparison (only tests where both validators pass)
// Optionally filter by draft
function calculateH2H(
  tjsData: ValidatorBenchmark,
  ajvData: ValidatorBenchmark,
  filterDraft?: string
): { tjsNs: number; ajvNs: number; tests: number } | null {
  const ajvLookup = buildGroupLookup(ajvData);

  let h2hTjsNs = 0;
  let h2hAjvNs = 0;
  let h2hTests = 0;

  for (const result of tjsData.results) {
    if (filterDraft && result.draft !== filterDraft) continue;

    for (const tjsGroup of result.groups) {
      const key = `${result.draft}:${result.file}:${tjsGroup.groupDesc}`;
      const ajvGroup = ajvLookup.get(key);

      if (
        tjsGroup.passed &&
        ajvGroup?.passed &&
        tjsGroup.nsPerTest > 0 &&
        ajvGroup.nsPerTest > 0
      ) {
        h2hTjsNs += tjsGroup.nsPerTest * tjsGroup.testCount;
        h2hAjvNs += ajvGroup.nsPerTest * ajvGroup.testCount;
        h2hTests += tjsGroup.testCount;
      }
    }
  }

  if (h2hTests === 0) return null;

  return {
    tjsNs: h2hTjsNs / h2hTests,
    ajvNs: h2hAjvNs / h2hTests,
    tests: h2hTests,
  };
}

// Calculate compliance stats for a validator's draft
function calculateCompliance(
  data: ValidatorBenchmark,
  draft: string
): { pass: number; total: number } {
  const draftResults = data.results.filter((r) => r.draft === draft);
  let totalPass = 0;
  let totalFail = 0;

  for (const result of draftResults) {
    totalPass += result.totalPass;
    totalFail += result.totalFail;
  }

  return { pass: totalPass, total: totalPass + totalFail };
}

function main() {
  const args = process.argv.slice(2);
  const baseRefIndex = args.indexOf('--base-ref');
  const baseRef = baseRefIndex >= 0 ? args[baseRefIndex + 1] : 'origin/main';

  const tjsData = loadBenchmarkData('tjs');
  const ajvData = loadBenchmarkData('ajv');

  if (!tjsData || !ajvData) {
    console.error('Error: Both tjs.json and ajv.json are required');
    process.exit(1);
  }

  // Try to load base data for comparison
  const tjsFilePath = path.join(__dirname, 'results', 'tjs.json');
  const ajvFilePath = path.join(__dirname, 'results', 'ajv.json');
  const baseTjsContent = getBaseFileContent(tjsFilePath, baseRef);
  const baseAjvContent = getBaseFileContent(ajvFilePath, baseRef);
  const baseTjsData: ValidatorBenchmark | null = baseTjsContent ? JSON.parse(baseTjsContent) : null;
  const baseAjvData: ValidatorBenchmark | null = baseAjvContent ? JSON.parse(baseAjvContent) : null;
  const hasBaseData = baseTjsData !== null && baseAjvData !== null;

  const lines: string[] = [];
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];

  lines.push('## Benchmark Results');
  lines.push('');
  lines.push('_All comparisons use head-to-head benchmarks on tests both validators pass._');
  lines.push('');
  lines.push('### tjs vs ajv');
  lines.push('');

  if (hasBaseData) {
    // Show comparison with base using H2H per draft
    lines.push('| Draft | tjs (PR) | tjs (base) | Δ tjs | ajv (PR) | ajv (base) | Δ ajv |');
    lines.push('|-------|----------|------------|-------|----------|------------|-------|');

    for (const draft of drafts) {
      const h2hNew = calculateH2H(tjsData, ajvData, draft);
      const h2hOld = baseTjsData && baseAjvData ? calculateH2H(baseTjsData, baseAjvData, draft) : null;

      if (!h2hNew) continue;

      const tjsNew = h2hNew.tjsNs;
      const ajvNew = h2hNew.ajvNs;
      const tjsOld = h2hOld?.tjsNs ?? 0;
      const ajvOld = h2hOld?.ajvNs ?? 0;

      const tjsDiff = tjsOld > 0 ? formatDiffPercent(tjsNew, tjsOld) : 'new';
      const tjsEmoji = tjsOld > 0 ? formatDiffEmoji(tjsNew, tjsOld) : '';
      const ajvDiff = ajvOld > 0 ? formatDiffPercent(ajvNew, ajvOld) : 'new';
      const ajvEmoji = ajvOld > 0 ? formatDiffEmoji(ajvNew, ajvOld) : '';

      lines.push(
        `| ${draft} | ${formatOps(tjsNew)} | ${formatOps(tjsOld)} | ${tjsEmoji} ${tjsDiff} | ` +
          `${formatOps(ajvNew)} | ${formatOps(ajvOld)} | ${ajvEmoji} ${ajvDiff} |`
      );
    }
  } else {
    // No base data, show simple H2H comparison per draft
    lines.push('| Draft | tjs | ajv | tjs vs ajv |');
    lines.push('|-------|----:|----:|:----------:|');

    for (const draft of drafts) {
      const h2h = calculateH2H(tjsData, ajvData, draft);
      if (!h2h) continue;

      // Calculate ratio: positive means tjs is slower
      const ratio = h2h.ajvNs > 0 ? ((h2h.tjsNs - h2h.ajvNs) / h2h.ajvNs) * 100 : 0;
      const emoji = ratio < -5 ? '🟢' : ratio > 5 ? '🔴' : '';
      const diff = `${ratio > 0 ? '+' : ''}${Math.round(ratio)}%`;

      lines.push(`| ${draft} | ${formatOps(h2h.tjsNs)} | ${formatOps(h2h.ajvNs)} | ${emoji} ${diff} |`);
    }
  }

  lines.push('');

  // Overall head-to-head
  lines.push('### Overall');
  lines.push('');

  const h2hOverall = calculateH2H(tjsData, ajvData);

  if (h2hOverall) {
    const faster = h2hOverall.tjsNs < h2hOverall.ajvNs ? 'tjs' : 'ajv';
    const ratio =
      h2hOverall.tjsNs < h2hOverall.ajvNs
        ? h2hOverall.ajvNs / h2hOverall.tjsNs
        : h2hOverall.tjsNs / h2hOverall.ajvNs;
    const emoji = faster === 'tjs' ? '🟢' : '🔴';

    // Check for base comparison
    if (hasBaseData) {
      const h2hBase = calculateH2H(baseTjsData!, baseAjvData!);

      if (h2hBase) {
        const baseFaster = h2hBase.tjsNs < h2hBase.ajvNs ? 'tjs' : 'ajv';
        const baseRatio =
          h2hBase.tjsNs < h2hBase.ajvNs
            ? h2hBase.ajvNs / h2hBase.tjsNs
            : h2hBase.tjsNs / h2hBase.ajvNs;
        const ratioChange = ((ratio - baseRatio) / baseRatio) * 100;

        let changeStr = '';
        if (Math.abs(ratioChange) >= 1 || faster !== baseFaster) {
          const arrow = ratioChange > 0 ? '↑' : '↓';
          changeStr = ` (was ${baseRatio.toFixed(2)}×, ${arrow}${Math.abs(ratioChange).toFixed(1)}%)`;
        }

        lines.push(`- **tjs vs ajv**: ${emoji} ${faster} is **${ratio.toFixed(2)}×** faster${changeStr}`);
      } else {
        lines.push(
          `- **tjs vs ajv**: ${emoji} ${faster} is **${ratio.toFixed(2)}×** faster (${h2hOverall.tests} tests)`
        );
      }
    } else {
      lines.push(
        `- **tjs vs ajv**: ${emoji} ${faster} is **${ratio.toFixed(2)}×** faster (${h2hOverall.tests} tests)`
      );
    }
  }
  lines.push('');

  // Compliance
  lines.push('### Compliance');
  lines.push('');
  lines.push('| Draft | tjs | ajv |');
  lines.push('|-------|----:|----:|');
  for (const draft of drafts) {
    const tjsComp = calculateCompliance(tjsData, draft);
    const ajvComp = calculateCompliance(ajvData, draft);
    lines.push(`| ${draft} | ${tjsComp.pass}/${tjsComp.total} | ${ajvComp.pass}/${ajvComp.total} |`);
  }

  console.log(lines.join('\n'));
}

main();
