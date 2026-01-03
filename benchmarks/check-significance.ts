/**
 * Check if benchmark changes are significant enough to warrant a PR update
 *
 * Usage:
 *   npx tsx benchmarks/check-significance.ts
 *
 * Exit codes:
 *   0 - Changes are significant
 *   1 - Changes are not significant (minor noise)
 *
 * Significance thresholds:
 *   - Performance change > 5% for any validator
 *   - Compliance (pass/fail) changed
 *   - SVG ordering changed
 *   - README content changed (non-benchmark sections)
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PERF_THRESHOLD = 0.05; // 5% change threshold

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

interface BenchmarkData {
  compareValidator: string;
  summary: Record<string, DraftSummary>;
}

function getOldFileContent(filePath: string): string | null {
  try {
    // Get the file content from the last commit on main
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

function checkBenchmarkSignificance(validator: string): {
  significant: boolean;
  reason?: string;
} {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);

  if (!fs.existsSync(filePath)) {
    return { significant: false };
  }

  const newContent = fs.readFileSync(filePath, 'utf-8');
  const oldContent = getOldFileContent(filePath);

  if (!oldContent) {
    return { significant: true, reason: `New benchmark data for ${validator}` };
  }

  const newData = loadJson(newContent);
  const oldData = loadJson(oldContent);

  if (!newData || !oldData) {
    return { significant: true, reason: `Cannot parse ${validator} data` };
  }

  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];

  for (const draft of drafts) {
    const newSummary = newData.summary[draft];
    const oldSummary = oldData.summary[draft];

    if (!newSummary || !oldSummary) continue;

    // Check compliance changes (pass/fail counts)
    if (
      newSummary.tjs.pass !== oldSummary.tjs.pass ||
      newSummary.tjs.fail !== oldSummary.tjs.fail ||
      newSummary.other.pass !== oldSummary.other.pass ||
      newSummary.other.fail !== oldSummary.other.fail
    ) {
      return {
        significant: true,
        reason: `Compliance changed for ${validator} in ${draft}`,
      };
    }

    // Check performance changes (> threshold)
    const tjsPerfChange =
      Math.abs(newSummary.tjs.nsPerTest - oldSummary.tjs.nsPerTest) / oldSummary.tjs.nsPerTest;
    const otherPerfChange =
      Math.abs(newSummary.other.nsPerTest - oldSummary.other.nsPerTest) /
      oldSummary.other.nsPerTest;

    if (tjsPerfChange > PERF_THRESHOLD) {
      const direction = newSummary.tjs.nsPerTest < oldSummary.tjs.nsPerTest ? 'faster' : 'slower';
      return {
        significant: true,
        reason: `tjs ${(tjsPerfChange * 100).toFixed(1)}% ${direction} in ${draft}`,
      };
    }

    if (otherPerfChange > PERF_THRESHOLD) {
      const direction =
        newSummary.other.nsPerTest < oldSummary.other.nsPerTest ? 'faster' : 'slower';
      return {
        significant: true,
        reason: `${validator} ${(otherPerfChange * 100).toFixed(1)}% ${direction} in ${draft}`,
      };
    }
  }

  return { significant: false };
}

function checkSvgOrderingChange(): { significant: boolean; reason?: string } {
  const svgPath = path.join(__dirname, '../assets/benchmark.svg');

  if (!fs.existsSync(svgPath)) {
    return { significant: false };
  }

  const newContent = fs.readFileSync(svgPath, 'utf-8');
  const oldContent = getOldFileContent(svgPath);

  if (!oldContent) {
    return { significant: true, reason: 'New SVG file' };
  }

  // Extract validator names from bar comments (order matters)
  const extractOrder = (content: string): string[] => {
    const matches = content.matchAll(/<!-- (\w+): [\d.]+[KM]? = \d+px height -->/g);
    return [...matches].map((m) => m[1]);
  };

  const newOrder = extractOrder(newContent);
  const oldOrder = extractOrder(oldContent);

  if (JSON.stringify(newOrder) !== JSON.stringify(oldOrder)) {
    return {
      significant: true,
      reason: `SVG order changed: ${oldOrder.join(', ')} → ${newOrder.join(', ')}`,
    };
  }

  return { significant: false };
}

function checkComplianceChange(): { significant: boolean; reason?: string } {
  const compliancePath = path.join(__dirname, '../COMPLIANCE.md');

  if (!fs.existsSync(compliancePath)) {
    return { significant: false };
  }

  const newContent = fs.readFileSync(compliancePath, 'utf-8');
  const oldContent = getOldFileContent(compliancePath);

  if (!oldContent) {
    return { significant: true, reason: 'New COMPLIANCE.md' };
  }

  // Extract pass/fail counts
  const extractCounts = (content: string) => {
    const totalMatch = content.match(/\*\*Total Tests\*\*:\s*(\d+)/);
    const passedMatch = content.match(/\*\*Passed\*\*:\s*(\d+)/);
    const failedMatch = content.match(/\*\*Failed\*\*:\s*(\d+)/);
    return {
      total: totalMatch ? parseInt(totalMatch[1], 10) : 0,
      passed: passedMatch ? parseInt(passedMatch[1], 10) : 0,
      failed: failedMatch ? parseInt(failedMatch[1], 10) : 0,
    };
  };

  const newCounts = extractCounts(newContent);
  const oldCounts = extractCounts(oldContent);

  if (
    newCounts.total !== oldCounts.total ||
    newCounts.passed !== oldCounts.passed ||
    newCounts.failed !== oldCounts.failed
  ) {
    return {
      significant: true,
      reason: `Compliance changed: ${oldCounts.passed}/${oldCounts.total} → ${newCounts.passed}/${newCounts.total}`,
    };
  }

  return { significant: false };
}

function main() {
  console.log('Checking if benchmark changes are significant...\n');

  const checks = [
    checkBenchmarkSignificance('ajv'),
    checkBenchmarkSignificance('zod'),
    checkBenchmarkSignificance('joi'),
    checkSvgOrderingChange(),
    checkComplianceChange(),
  ];

  const significantChanges = checks.filter((c) => c.significant);

  if (significantChanges.length > 0) {
    console.log('✓ Significant changes detected:');
    for (const change of significantChanges) {
      console.log(`  - ${change.reason}`);
    }
    process.exit(0);
  } else {
    console.log('✗ No significant changes (within noise threshold)');
    console.log(`  Performance threshold: ±${PERF_THRESHOLD * 100}%`);
    process.exit(1);
  }
}

main();
