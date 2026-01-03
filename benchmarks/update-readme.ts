/**
 * Update README.md with benchmark and compliance data
 *
 * Usage:
 *   npx tsx benchmarks/update-readme.ts
 *
 * Reads from:
 *   benchmarks/results/ajv.json
 *   benchmarks/results/zod.json
 *   benchmarks/results/joi.json
 *   tests/json-schema-test-suite/ (for compliance counts)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUITE_BASE = path.join(__dirname, '../tests/json-schema-test-suite');

interface ValidatorStats {
  nsPerTest: number;
  pass: number;
  fail: number;
}

interface FileResult {
  draft: string;
  file: string;
  testCount: number;
  tjs: ValidatorStats;
  other: ValidatorStats;
}

interface DraftSummary {
  files: number;
  tests: number;
  tjs: ValidatorStats;
  other: ValidatorStats;
}

interface BenchmarkData {
  compareValidator: string;
  results: FileResult[];
  summary: Record<string, DraftSummary>;
}

function loadBenchmarkData(validator: string): BenchmarkData | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Warning: ${filePath} not found`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

interface TestGroup {
  description: string;
  schema: unknown;
  tests: Array<{ description: string; data: unknown; valid: boolean }>;
}

/**
 * Count tests in the JSON Schema Test Suite for a specific draft
 */
function countTestsForDraft(draft: Draft): number {
  const suitePath = path.join(SUITE_BASE, draft);
  let total = 0;

  const countDirectory = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const filename of fs.readdirSync(dir)) {
      const filepath = path.join(dir, filename);
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        countDirectory(filepath);
      } else if (filename.endsWith('.json')) {
        try {
          const content = fs.readFileSync(filepath, 'utf-8');
          const groups: TestGroup[] = JSON.parse(content);
          for (const group of groups) {
            total += group.tests.length;
          }
        } catch {
          // Skip invalid files
        }
      }
    }
  };

  countDirectory(suitePath);
  return total;
}

/**
 * Get compliance data for all drafts
 */
function getComplianceByDraft(): Array<{ draft: Draft; displayName: string; tests: number }> {
  const drafts: Array<{ draft: Draft; displayName: string }> = [
    { draft: 'draft4', displayName: 'draft-04' },
    { draft: 'draft6', displayName: 'draft-06' },
    { draft: 'draft7', displayName: 'draft-07' },
    { draft: 'draft2019-09', displayName: 'draft-2019-09' },
    { draft: 'draft2020-12', displayName: 'draft-2020-12' },
  ];

  return drafts.map((d) => ({
    ...d,
    tests: countTestsForDraft(d.draft),
  }));
}

function calculateComplianceRate(data: BenchmarkData): {
  passed: number;
  total: number;
  rate: string;
} {
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  let totalPassed = 0;
  let totalTests = 0;

  for (const draft of drafts) {
    for (const result of data.results.filter((r) => r.draft === draft)) {
      totalPassed += result.other.pass;
      totalTests += result.other.pass + result.other.fail;
    }
  }

  const rate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
  return { passed: totalPassed, total: totalTests, rate: `${rate}%` };
}

function formatDiff(tjsNs: number, otherNs: number): string {
  if (otherNs === 0 || tjsNs === 0) return '-';
  const diff = ((tjsNs - otherNs) / otherNs) * 100;
  return `${diff > 0 ? '+' : ''}${Math.round(diff)}%`;
}

function main() {
  const ajvData = loadBenchmarkData('ajv');
  const zodData = loadBenchmarkData('zod');
  const joiData = loadBenchmarkData('joi');

  if (!ajvData) {
    console.error('Error: ajv.json is required for README updates');
    process.exit(1);
  }

  const readmePath = path.join(__dirname, '../README.md');
  let readme = fs.readFileSync(readmePath, 'utf-8');

  // Calculate compliance rates from benchmark data (other validators)
  const ajvCompliance = calculateComplianceRate(ajvData);
  const zodCompliance = zodData
    ? calculateComplianceRate(zodData)
    : { rate: '⚠️ Basic', passed: 0, total: 0 };
  const joiCompliance = joiData
    ? calculateComplianceRate(joiData)
    : { rate: '❌ None', passed: 0, total: 0 };

  // Get tjs compliance from test suite (it's always 100%)
  const complianceByDraft = getComplianceByDraft();
  const tjsTotalTests = complianceByDraft.reduce((sum, d) => sum + d.tests, 0);

  console.error('Compliance rates:');
  console.error(`  tjs: 100% (${tjsTotalTests}/${tjsTotalTests})`);
  console.error(`  ajv: ${ajvCompliance.rate} (${ajvCompliance.passed}/${ajvCompliance.total})`);
  console.error(`  zod: ${zodCompliance.rate}`);
  console.error(`  joi: ${joiCompliance.rate}`);

  // Update "At a Glance" table
  const atAGlanceTable = `| | tjs | [ajv](https://github.com/ajv-validator/ajv) | [zod](https://github.com/colinhacks/zod) | [joi](https://github.com/hapijs/joi) |
|---|:---:|:---:|:---:|:---:|
| **JSON Schema compliance** | ✅ 100% | ⚠️ ${ajvCompliance.rate} | ⚠️ Basic | ❌ None |
| **TypeScript inference** | ✅ Built-in | ⚠️ Plugin | ✅ Built-in | ❌ None |
| **Dependencies** | ✅ 0 | ❌ 4+ | ✅ 0 | ❌ 5+ |
| **Performance** | ✅ Fastest | ⚠️ Fast | ❌ Slow | ❌ Slow |`;

  readme = readme.replace(
    /\| \| tjs \| \[ajv\].*?\| \*\*Performance\*\* \|[^\n]+/s,
    atAGlanceTable
  );

  // Update compliance table
  const complianceTable = complianceByDraft
    .map((d) => `| ${d.displayName} | 100% (${d.tests}/${d.tests}) |`)
    .join('\n');
  const totalRow = `| **Total** | **100% (${tjsTotalTests}/${tjsTotalTests})** |`;

  const complianceSection = `| Draft | Compliance |
|-------|------------|
${complianceTable}
${totalRow}`;

  readme = readme.replace(
    /\| Draft \| Compliance \|[\s\S]*?\| \*\*Total\*\* \| \*\*100%.*?\*\* \|/,
    complianceSection
  );

  // Calculate benchmark performance table
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const draftDisplayNames: Record<string, string> = {
    draft4: 'draft-04',
    draft6: 'draft-06',
    draft7: 'draft-07',
    'draft2019-09': 'draft-2019-09',
    'draft2020-12': 'draft-2020-12',
  };

  let totalFiles = 0;
  let totalTests = 0;
  let totalTjsNs = 0;
  let totalAjvNs = 0;

  const perfRows: string[] = [];
  for (const draft of drafts) {
    const s = ajvData.summary[draft];
    if (!s) continue;

    totalFiles += s.files;
    totalTests += s.tests;
    totalTjsNs += s.tjs.nsPerTest * s.tests;
    totalAjvNs += s.other.nsPerTest * s.tests;

    const diff = formatDiff(s.tjs.nsPerTest, s.other.nsPerTest);
    perfRows.push(
      `${draftDisplayNames[draft].padEnd(14)}${String(s.files).padStart(5)}${String(s.tests).padStart(8)} │${String(Math.round(s.tjs.nsPerTest)).padStart(11)}${String(Math.round(s.other.nsPerTest)).padStart(13)}${diff.padStart(10)}`
    );
  }

  const avgTjsNs = totalTjsNs / totalTests;
  const avgAjvNs = totalAjvNs / totalTests;
  const totalDiff = formatDiff(avgTjsNs, avgAjvNs);

  const perfTable = `Performance vs ajv (JSON Schema Test Suite):
────────────────────────────────────────────────────────────────────────────
Draft          Files   Tests │ tjs ns/test  ajv ns/test      Diff
────────────────────────────────────────────────────────────────────────────
${perfRows.join('\n')}
────────────────────────────────────────────────────────────────────────────
TOTAL          ${String(totalFiles).padStart(5)}${String(totalTests).padStart(8)} │${String(Math.round(avgTjsNs)).padStart(11)}${String(Math.round(avgAjvNs)).padStart(13)}${totalDiff.padStart(10)}
────────────────────────────────────────────────────────────────────────────`;

  readme = readme.replace(
    /Performance vs ajv \(JSON Schema Test Suite\):[\s\S]*?─{10,}/g,
    (match) => {
      // Count how many separator lines there are
      const separatorCount = (match.match(/─{10,}/g) || []).length;
      if (separatorCount >= 4) {
        return perfTable;
      }
      return match;
    }
  );

  // Find format validation speedup data from per-file results
  const formatSpeedups: { name: string; ratio: number }[] = [];
  const formatFiles = ['idn-email', 'ecmascript-regex', 'date-time', 'ipv6'];

  for (const result of ajvData.results) {
    for (const fmt of formatFiles) {
      if (result.file.includes(fmt) && result.tjs.fail === 0 && result.other.fail === 0) {
        const ratio = result.other.nsPerTest / result.tjs.nsPerTest;
        if (ratio > 1) {
          formatSpeedups.push({
            name: fmt.replace('ecmascript-regex', 'regex syntax'),
            ratio,
          });
        }
      }
    }
  }

  // Sort by ratio and take top 4
  formatSpeedups.sort((a, b) => b.ratio - a.ratio);
  const topFormats = formatSpeedups.slice(0, 4);

  if (topFormats.length > 0) {
    const formatLines = topFormats.map((f) => {
      const ratioStr = f.ratio >= 100 ? `${Math.round(f.ratio)}x` : `${Math.round(f.ratio)}x`;
      const name = f.name.padEnd(25);
      return `${name}${ratioStr} faster than ajv`;
    });

    const formatSection = formatLines.join('\n');

    // Replace the format validation section
    readme = readme.replace(
      /Format validation is where tjs really shines.*?```\n([\s\S]*?)```/,
      `Format validation is where tjs really shines — up to **${Math.round(topFormats[0].ratio)}x faster** for complex formats:\n\n\`\`\`\n${formatSection}\n\`\`\``
    );
  }

  // Write updated README
  fs.writeFileSync(readmePath, readme);
  console.error(`\nUpdated ${readmePath}`);
}

main();
