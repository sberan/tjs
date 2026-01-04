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

// Calculate average ns/test for a validator's draft
function calculateDraftStats(
  data: ValidatorBenchmark,
  draft: string
): { avgNs: number; tests: number; pass: number; fail: number } {
  const draftResults = data.results.filter((r) => r.draft === draft);
  let totalNs = 0;
  let totalTests = 0;
  let totalPass = 0;
  let totalFail = 0;

  for (const result of draftResults) {
    totalPass += result.totalPass;
    totalFail += result.totalFail;
    for (const group of result.groups) {
      if (group.passed && group.nsPerTest > 0) {
        totalNs += group.nsPerTest * group.testCount;
        totalTests += group.testCount;
      }
    }
  }

  return {
    avgNs: totalTests > 0 ? totalNs / totalTests : 0,
    tests: totalTests,
    pass: totalPass,
    fail: totalFail,
  };
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
  lines.push('### tjs vs ajv');
  lines.push('');

  if (hasBaseData) {
    // Show comparison with base
    lines.push('| Draft | tjs (PR) | tjs (base) | Δ tjs | ajv (PR) | ajv (base) | Δ ajv |');
    lines.push('|-------|----------|------------|-------|----------|------------|-------|');

    for (const draft of drafts) {
      const tjsStats = calculateDraftStats(tjsData, draft);
      const ajvStats = calculateDraftStats(ajvData, draft);
      const baseTjsStats = baseTjsData ? calculateDraftStats(baseTjsData, draft) : null;
      const baseAjvStats = baseAjvData ? calculateDraftStats(baseAjvData, draft) : null;

      const tjsNew = tjsStats.avgNs;
      const tjsOld = baseTjsStats?.avgNs ?? 0;
      const ajvNew = ajvStats.avgNs;
      const ajvOld = baseAjvStats?.avgNs ?? 0;

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
    // No base data, show simple comparison
    lines.push('| Draft | tjs | ajv | tjs vs ajv |');
    lines.push('|-------|----:|----:|:----------:|');

    for (const draft of drafts) {
      const tjsStats = calculateDraftStats(tjsData, draft);
      const ajvStats = calculateDraftStats(ajvData, draft);

      const ratio =
        ajvStats.avgNs > 0 ? ((tjsStats.avgNs - ajvStats.avgNs) / ajvStats.avgNs) * 100 : 0;
      const emoji = ratio < 0 ? '🟢' : ratio > 0 ? '🔴' : '';
      const diff = `${ratio > 0 ? '+' : ''}${Math.round(ratio)}%`;

      lines.push(
        `| ${draft} | ${formatOps(tjsStats.avgNs)} | ${formatOps(ajvStats.avgNs)} | ${emoji} ${diff} |`
      );
    }
  }

  lines.push('');

  // Head-to-head (only groups where both pass)
  lines.push('### Head-to-Head');
  lines.push('');
  lines.push('_Only includes test groups where both validators pass all tests._');
  lines.push('');

  const tjsLookup = buildGroupLookup(tjsData);
  const ajvLookup = buildGroupLookup(ajvData);

  // Calculate head-to-head stats
  let h2hTjsNs = 0;
  let h2hAjvNs = 0;
  let h2hTests = 0;
  let h2hGroups = 0;

  for (const [key, tjsGroup] of tjsLookup) {
    const ajvGroup = ajvLookup.get(key);
    if (tjsGroup.passed && ajvGroup?.passed && tjsGroup.nsPerTest > 0 && ajvGroup.nsPerTest > 0) {
      h2hTjsNs += tjsGroup.nsPerTest * tjsGroup.testCount;
      h2hAjvNs += ajvGroup.nsPerTest * ajvGroup.testCount;
      h2hTests += tjsGroup.testCount;
      h2hGroups++;
    }
  }

  if (h2hTests > 0) {
    const h2hTjsAvg = h2hTjsNs / h2hTests;
    const h2hAjvAvg = h2hAjvNs / h2hTests;
    const faster = h2hTjsAvg < h2hAjvAvg ? 'tjs' : 'ajv';
    const ratio = h2hTjsAvg < h2hAjvAvg ? h2hAjvAvg / h2hTjsAvg : h2hTjsAvg / h2hAjvAvg;
    const emoji = faster === 'tjs' ? '🟢' : '🔴';

    // Check for base comparison
    if (hasBaseData) {
      const baseTjsLookup = buildGroupLookup(baseTjsData!);
      const baseAjvLookup = buildGroupLookup(baseAjvData!);

      let baseH2hTjsNs = 0;
      let baseH2hAjvNs = 0;
      let baseH2hTests = 0;

      for (const [key, tjsGroup] of baseTjsLookup) {
        const ajvGroup = baseAjvLookup.get(key);
        if (
          tjsGroup.passed &&
          ajvGroup?.passed &&
          tjsGroup.nsPerTest > 0 &&
          ajvGroup.nsPerTest > 0
        ) {
          baseH2hTjsNs += tjsGroup.nsPerTest * tjsGroup.testCount;
          baseH2hAjvNs += ajvGroup.nsPerTest * ajvGroup.testCount;
          baseH2hTests += tjsGroup.testCount;
        }
      }

      if (baseH2hTests > 0) {
        const baseRatio =
          baseH2hTjsNs < baseH2hAjvNs ? baseH2hAjvNs / baseH2hTjsNs : baseH2hTjsNs / baseH2hAjvNs;
        const ratioChange = ((ratio - baseRatio) / baseRatio) * 100;

        let changeStr = '';
        if (Math.abs(ratioChange) >= 1) {
          const arrow = ratioChange > 0 ? '↑' : '↓';
          changeStr = ` (was ${baseRatio.toFixed(2)}×, ${arrow}${Math.abs(ratioChange).toFixed(1)}%)`;
        }

        lines.push(
          `- **tjs vs ajv**: ${emoji} ${faster} is **${ratio.toFixed(2)}×** faster${changeStr}`
        );
      } else {
        lines.push(
          `- **tjs vs ajv**: ${emoji} ${faster} is **${ratio.toFixed(2)}×** faster (${h2hTests} tests, ${h2hGroups} groups)`
        );
      }
    } else {
      lines.push(
        `- **tjs vs ajv**: ${emoji} ${faster} is **${ratio.toFixed(2)}×** faster (${h2hTests} tests, ${h2hGroups} groups)`
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
    const tjsStats = calculateDraftStats(tjsData, draft);
    const ajvStats = calculateDraftStats(ajvData, draft);
    const tjsTotal = tjsStats.pass + tjsStats.fail;
    const ajvTotal = ajvStats.pass + ajvStats.fail;
    lines.push(`| ${draft} | ${tjsStats.pass}/${tjsTotal} | ${ajvStats.pass}/${ajvTotal} |`);
  }

  console.log(lines.join('\n'));
}

main();
