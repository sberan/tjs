/**
 * Compare isolated benchmark results.
 *
 * Takes two JSON files from bench-isolated.ts runs and compares performance
 * only for test groups where BOTH validators passed all tests.
 *
 * Usage:
 *   npx tsx bench-compare.ts results-tjs.json results-ajv.json [--json output.json]
 *
 * This ensures fair comparison - we only compare performance where both
 * validators correctly implement the validation.
 */

import * as fs from 'fs';

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

interface IsolatedBenchmarkResult {
  validator: string;
  timestamp: string;
  results: FileResult[];
  summary: Record<string, { totalPass: number; totalFail: number; files: number }>;
}

interface ComparisonResult {
  draft: string;
  file: string;
  groupDesc: string;
  testCount: number;
  nsA: number;
  nsB: number;
}

interface GroupComparisonResult {
  draft: string;
  file: string;
  groupDesc: string;
  testCount: number;
  tjs: {
    nsPerTest: number;
    passed: boolean;
  };
  other: {
    nsPerTest: number;
    passed: boolean;
  };
}

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function main() {
  const args = process.argv.slice(2);
  let fileA: string | null = null;
  let fileB: string | null = null;
  let jsonFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--json') {
      jsonFile = args[++i];
    } else if (!fileA) {
      fileA = arg;
    } else if (!fileB) {
      fileB = arg;
    }
  }

  if (!fileA || !fileB) {
    console.error(
      'Usage: npx tsx bench-compare.ts <results-a.json> <results-b.json> [--json output.json]'
    );
    process.exit(1);
  }

  const dataA: IsolatedBenchmarkResult = JSON.parse(fs.readFileSync(fileA, 'utf-8'));
  const dataB: IsolatedBenchmarkResult = JSON.parse(fs.readFileSync(fileB, 'utf-8'));

  const validatorA = dataA.validator;
  const validatorB = dataB.validator;

  console.log(`Comparing ${validatorA} vs ${validatorB}`);
  console.log('═'.repeat(100));

  // Build lookup for B results by draft/file/group
  const bLookup = new Map<string, GroupResult>();
  for (const fileResult of dataB.results) {
    for (const group of fileResult.groups) {
      const key = `${fileResult.draft}:${fileResult.file}:${group.groupDesc}`;
      bLookup.set(key, group);
    }
  }

  // Build all group comparisons (including failed ones for reporting)
  const allGroups: GroupComparisonResult[] = [];
  // Find matching groups where both passed (for head-to-head)
  const comparisons: ComparisonResult[] = [];

  for (const fileResult of dataA.results) {
    for (const groupA of fileResult.groups) {
      const key = `${fileResult.draft}:${fileResult.file}:${groupA.groupDesc}`;
      const groupB = bLookup.get(key);

      // Add to allGroups for full reporting
      allGroups.push({
        draft: fileResult.draft,
        file: fileResult.file,
        groupDesc: groupA.groupDesc,
        testCount: groupA.testCount,
        tjs: {
          nsPerTest: groupA.nsPerTest,
          passed: groupA.passed,
        },
        other: {
          nsPerTest: groupB?.nsPerTest ?? 0,
          passed: groupB?.passed ?? false,
        },
      });

      // Only add to comparisons if both passed
      if (!groupA.passed) continue;
      if (!groupB || !groupB.passed) continue;

      comparisons.push({
        draft: fileResult.draft,
        file: fileResult.file,
        groupDesc: groupA.groupDesc,
        testCount: groupA.testCount,
        nsA: groupA.nsPerTest,
        nsB: groupB.nsPerTest,
      });
    }
  }

  if (comparisons.length === 0) {
    console.log(
      '\nNo comparable test groups found (both validators must pass all tests in a group).'
    );
    return;
  }

  // Aggregate by file
  interface FileAgg {
    draft: string;
    file: string;
    testCount: number;
    totalNsA: number;
    totalNsB: number;
  }

  const fileAggMap = new Map<string, FileAgg>();
  for (const c of comparisons) {
    const key = `${c.draft}:${c.file}`;
    const existing = fileAggMap.get(key);
    if (existing) {
      existing.testCount += c.testCount;
      existing.totalNsA += c.nsA * c.testCount;
      existing.totalNsB += c.nsB * c.testCount;
    } else {
      fileAggMap.set(key, {
        draft: c.draft,
        file: c.file,
        testCount: c.testCount,
        totalNsA: c.nsA * c.testCount,
        totalNsB: c.nsB * c.testCount,
      });
    }
  }

  const fileResults = Array.from(fileAggMap.values()).map((f) => ({
    ...f,
    nsA: f.totalNsA / f.testCount,
    nsB: f.totalNsB / f.testCount,
  }));

  // Sort by impact (where A is slower than B)
  const slowest = fileResults
    .filter((f) => f.nsA > f.nsB)
    .sort((a, b) => (b.nsA - b.nsB) * b.testCount - (a.nsA - a.nsB) * a.testCount)
    .slice(0, 15);

  const fastest = fileResults
    .filter((f) => f.nsA < f.nsB)
    .sort((a, b) => (b.nsB - b.nsA) * b.testCount - (a.nsB - a.nsA) * a.testCount)
    .slice(0, 15);

  // Print slowest
  console.log(`\nTop 15 where ${validatorA} is slower than ${validatorB}`);
  console.log('─'.repeat(100));
  console.log(
    '#'.padEnd(4) +
      'Draft'.padEnd(14) +
      'File'.padEnd(40) +
      'Tests'.padStart(6) +
      `${validatorA} ns`.padStart(10) +
      `${validatorB} ns`.padStart(10) +
      'ratio'.padStart(8)
  );
  console.log('─'.repeat(100));

  for (let i = 0; i < slowest.length; i++) {
    const r = slowest[i];
    const name = r.file.length > 38 ? r.file.slice(0, 35) + '...' : r.file;
    const ratio = r.nsB > 0 ? (r.nsA / r.nsB).toFixed(1) + 'x' : '∞';
    console.log(
      `${i + 1}`.padEnd(4) +
        r.draft.padEnd(14) +
        name.padEnd(40) +
        r.testCount.toString().padStart(6) +
        Math.round(r.nsA).toLocaleString().padStart(10) +
        Math.round(r.nsB).toLocaleString().padStart(10) +
        `${RED}${ratio}${RESET}`.padStart(17)
    );
  }

  // Print fastest
  if (fastest.length > 0) {
    console.log(`\nTop 15 where ${validatorA} is faster than ${validatorB}`);
    console.log('─'.repeat(100));
    console.log(
      '#'.padEnd(4) +
        'Draft'.padEnd(14) +
        'File'.padEnd(40) +
        'Tests'.padStart(6) +
        `${validatorA} ns`.padStart(10) +
        `${validatorB} ns`.padStart(10) +
        'ratio'.padStart(8)
    );
    console.log('─'.repeat(100));

    for (let i = 0; i < fastest.length; i++) {
      const r = fastest[i];
      const name = r.file.length > 38 ? r.file.slice(0, 35) + '...' : r.file;
      const ratio = r.nsA > 0 ? (r.nsB / r.nsA).toFixed(1) + 'x' : '∞';
      console.log(
        `${i + 1}`.padEnd(4) +
          r.draft.padEnd(14) +
          name.padEnd(40) +
          r.testCount.toString().padStart(6) +
          Math.round(r.nsA).toLocaleString().padStart(10) +
          Math.round(r.nsB).toLocaleString().padStart(10) +
          `${GREEN}${ratio}${RESET}`.padStart(17)
      );
    }
  }

  // Summary by draft
  console.log('\n' + '═'.repeat(100));
  console.log('SUMMARY BY DRAFT');
  console.log('─'.repeat(100));

  const drafts = [...new Set(fileResults.map((f) => f.draft))];

  let grandTotalA = 0,
    grandTotalB = 0,
    grandTotalTests = 0;

  for (const draft of drafts) {
    const draftFiles = fileResults.filter((f) => f.draft === draft);
    const totalTests = draftFiles.reduce((sum, f) => sum + f.testCount, 0);
    const totalNsA = draftFiles.reduce((sum, f) => sum + f.nsA * f.testCount, 0);
    const totalNsB = draftFiles.reduce((sum, f) => sum + f.nsB * f.testCount, 0);
    const avgA = totalNsA / totalTests;
    const avgB = totalNsB / totalTests;

    grandTotalA += totalNsA;
    grandTotalB += totalNsB;
    grandTotalTests += totalTests;

    const faster = avgA < avgB ? validatorA : validatorB;
    const ratio = avgA < avgB ? avgB / avgA : avgA / avgB;
    const color = faster === validatorA ? GREEN : RED;

    console.log(
      `${draft.padEnd(14)} ${draftFiles.length} files, ${totalTests} tests | ` +
        `${color}${faster} ${ratio.toFixed(2)}x faster${RESET} ` +
        `(${Math.round(avgA)} ns vs ${Math.round(avgB)} ns)`
    );
  }

  // Overall
  console.log('─'.repeat(100));
  const avgA = grandTotalA / grandTotalTests;
  const avgB = grandTotalB / grandTotalTests;
  const faster = avgA < avgB ? validatorA : validatorB;
  const ratio = avgA < avgB ? avgB / avgA : avgA / avgB;
  const color = faster === validatorA ? GREEN : RED;

  console.log(
    `${'OVERALL'.padEnd(14)} ${fileResults.length} files, ${grandTotalTests} tests | ` +
      `${color}${faster} ${ratio.toFixed(2)}x faster${RESET} ` +
      `(${Math.round(avgA)} ns vs ${Math.round(avgB)} ns)`
  );

  // Compliance comparison
  console.log('\n' + '═'.repeat(100));
  console.log('COMPLIANCE');
  console.log('─'.repeat(100));

  for (const draft of Object.keys(dataA.summary)) {
    const a = dataA.summary[draft];
    const b = dataB.summary[draft];
    if (!a || !b) continue;

    const aPct = ((a.totalPass / (a.totalPass + a.totalFail)) * 100).toFixed(1);
    const bPct = ((b.totalPass / (b.totalPass + b.totalFail)) * 100).toFixed(1);

    console.log(
      `${draft.padEnd(14)} ${validatorA}: ${aPct}% (${a.totalPass}/${a.totalPass + a.totalFail}), ` +
        `${validatorB}: ${bPct}% (${b.totalPass}/${b.totalPass + b.totalFail})`
    );
  }

  // JSON output
  if (jsonFile) {
    // Include group-level results for detailed reporting
    const jsonData = {
      compareValidator: validatorB,
      // Group-level results (new format)
      groups: allGroups,
      // File-level aggregated results (for backwards compatibility)
      results: fileResults.map((f) => ({
        draft: f.draft,
        file: f.file,
        testCount: f.testCount,
        tjs: {
          nsPerTest: f.nsA,
          pass: dataA.summary[f.draft]?.totalPass ?? 0,
          fail: dataA.summary[f.draft]?.totalFail ?? 0,
        },
        other: {
          nsPerTest: f.nsB,
          pass: dataB.summary[f.draft]?.totalPass ?? 0,
          fail: dataB.summary[f.draft]?.totalFail ?? 0,
        },
      })),
      summary: Object.fromEntries(
        drafts.map((draft) => {
          const draftGroups = allGroups.filter((g) => g.draft === draft);
          const draftFiles = fileResults.filter((f) => f.draft === draft);
          const totalTests = draftFiles.reduce((sum, f) => sum + f.testCount, 0);
          const totalNsA = draftFiles.reduce((sum, f) => sum + f.nsA * f.testCount, 0);
          const totalNsB = draftFiles.reduce((sum, f) => sum + f.nsB * f.testCount, 0);

          const aCompliance = dataA.summary[draft] || { totalPass: 0, totalFail: 0 };
          const bCompliance = dataB.summary[draft] || { totalPass: 0, totalFail: 0 };

          return [
            draft,
            {
              files: draftFiles.length,
              groups: draftGroups.length,
              tests: totalTests,
              tjs: {
                nsPerTest: totalTests > 0 ? totalNsA / totalTests : 0,
                pass: aCompliance.totalPass,
                fail: aCompliance.totalFail,
              },
              other: {
                nsPerTest: totalTests > 0 ? totalNsB / totalTests : 0,
                pass: bCompliance.totalPass,
                fail: bCompliance.totalFail,
              },
            },
          ];
        })
      ),
      headToHead: {
        validatorA,
        validatorB,
        avgNsA: avgA,
        avgNsB: avgB,
        faster,
        ratio,
        totalTests: grandTotalTests,
        totalGroups: comparisons.length,
      },
    };

    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`\nWrote comparison to ${jsonFile}`);
  }
}

main();
