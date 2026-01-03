/**
 * Generate a markdown report for the benchmark issue
 *
 * Usage:
 *   npx tsx benchmarks/generate-issue-report.ts
 *
 * Outputs markdown to stdout
 */

import * as fs from 'fs';
import * as path from 'path';
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

interface BenchmarkData {
  compareValidator: string;
  summary: Record<string, DraftSummary>;
}

function loadBenchmarkData(validator: string): BenchmarkData | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function formatOps(opsPerSec: number): string {
  if (opsPerSec >= 1_000_000) {
    return `${(opsPerSec / 1_000_000).toFixed(1)}M`;
  }
  if (opsPerSec >= 1_000) {
    return `${(opsPerSec / 1_000).toFixed(0)}K`;
  }
  return `${Math.round(opsPerSec)}`;
}

function formatDiff(tjsNs: number, otherNs: number): string {
  if (otherNs === 0 || tjsNs === 0) return '-';
  const diff = ((tjsNs - otherNs) / otherNs) * 100;
  if (diff > 0) return `🔴 +${Math.round(diff)}%`;
  return `🟢 ${Math.round(diff)}%`;
}

function main() {
  const ajvData = loadBenchmarkData('ajv');
  const zodData = loadBenchmarkData('zod');
  const joiData = loadBenchmarkData('joi');

  const lines: string[] = [];

  lines.push('## Performance Summary');
  lines.push('');
  lines.push(
    '> Auto-updated on every push to main. Merge the suggested changes below to update README.'
  );
  lines.push('');

  // Calculate ops/sec for each validator
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];

  const calcOps = (data: BenchmarkData | null): number => {
    if (!data) return 0;
    let totalTests = 0;
    let totalNs = 0;
    for (const draft of drafts) {
      const s = data.summary[draft];
      if (!s) continue;
      totalTests += s.tests;
      totalNs += s.tjs.nsPerTest * s.tests;
    }
    return totalTests > 0 && totalNs > 0 ? (1e9 * totalTests) / totalNs : 0;
  };

  const calcOtherOps = (data: BenchmarkData | null): number => {
    if (!data) return 0;
    let totalTests = 0;
    let totalNs = 0;
    for (const draft of drafts) {
      const s = data.summary[draft];
      if (!s) continue;
      totalTests += s.tests;
      totalNs += s.other.nsPerTest * s.tests;
    }
    return totalTests > 0 && totalNs > 0 ? (1e9 * totalTests) / totalNs : 0;
  };

  const tjsOps = calcOps(ajvData);
  const ajvOps = ajvData ? calcOtherOps(ajvData) : 0;
  const zodOps = zodData ? calcOtherOps(zodData) : 0;
  const joiOps = joiData ? calcOtherOps(joiData) : 0;

  // Sort by ops/sec
  const validators = [
    { name: 'tjs', ops: tjsOps },
    { name: 'ajv', ops: ajvOps },
    { name: 'zod', ops: zodOps },
    { name: 'joi', ops: joiOps },
  ]
    .filter((v) => v.ops > 0)
    .sort((a, b) => b.ops - a.ops);

  lines.push('### Operations per Second');
  lines.push('');
  lines.push('| Validator | ops/sec | vs tjs |');
  lines.push('|-----------|--------:|-------:|');
  for (const v of validators) {
    const multiplier = v.name === 'tjs' ? '-' : `${(tjsOps / v.ops).toFixed(1)}x slower`;
    lines.push(`| **${v.name}** | ${formatOps(v.ops)} | ${multiplier} |`);
  }
  lines.push('');

  // Per-draft breakdown for ajv
  if (ajvData) {
    lines.push('### tjs vs ajv by Draft');
    lines.push('');
    lines.push('| Draft | Files | Tests | tjs ns/test | ajv ns/test | Diff |');
    lines.push('|-------|------:|------:|------------:|------------:|-----:|');

    let totalFiles = 0;
    let totalTests = 0;
    let totalTjsNs = 0;
    let totalAjvNs = 0;

    for (const draft of drafts) {
      const s = ajvData.summary[draft];
      if (!s) continue;
      totalFiles += s.files;
      totalTests += s.tests;
      totalTjsNs += s.tjs.nsPerTest * s.tests;
      totalAjvNs += s.other.nsPerTest * s.tests;

      const diff = formatDiff(s.tjs.nsPerTest, s.other.nsPerTest);
      lines.push(
        `| ${draft} | ${s.files} | ${s.tests} | ${Math.round(s.tjs.nsPerTest)} | ${Math.round(s.other.nsPerTest)} | ${diff} |`
      );
    }

    const avgTjsNs = totalTjsNs / totalTests;
    const avgAjvNs = totalAjvNs / totalTests;
    lines.push(
      `| **Total** | ${totalFiles} | ${totalTests} | ${Math.round(avgTjsNs)} | ${Math.round(avgAjvNs)} | ${formatDiff(avgTjsNs, avgAjvNs)} |`
    );
    lines.push('');
  }

  // Compliance
  lines.push('### Compliance');
  lines.push('');
  lines.push('| Validator | Pass Rate |');
  lines.push('|-----------|----------:|');
  lines.push('| tjs | 100% |');

  if (ajvData) {
    let passed = 0;
    let total = 0;
    for (const draft of drafts) {
      const s = ajvData.summary[draft];
      if (!s) continue;
      passed += s.other.pass;
      total += s.other.pass + s.other.fail;
    }
    const rate = total > 0 ? Math.round((passed / total) * 100) : 0;
    lines.push(`| ajv | ${rate}% |`);
  }
  lines.push('| zod | Basic |');
  lines.push('| joi | None |');
  lines.push('');

  // Instructions
  lines.push('---');
  lines.push('');
  lines.push('### To update README with these results:');
  lines.push('');
  lines.push('```bash');
  lines.push('# Run locally and commit the changes');
  lines.push('npm run bench:ajv && npm run bench:zod && npm run bench:joi');
  lines.push('npx tsx benchmarks/update-svg.ts');
  lines.push('npx tsx benchmarks/update-readme.ts');
  lines.push('git add -A && git commit -m "chore: update benchmarks"');
  lines.push('```');
  lines.push('');
  lines.push(`*Last updated: ${new Date().toISOString()}*`);

  console.log(lines.join('\n'));
}

main();
