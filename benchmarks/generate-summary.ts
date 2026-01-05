/**
 * Generate a comprehensive summary BENCHMARKS.md from all validator results
 * using a template file for clean generation.
 *
 * Usage:
 *   npx tsx benchmarks/generate-summary.ts
 *
 * Reads from:
 *   benchmarks/results/*.json (individual validator benchmark results)
 *   benchmarks/BENCHMARKS.template.md
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ALL_VALIDATORS = [
  'tjs',
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

const validatorInfo: Record<string, { name: string; link: string; description: string }> = {
  tjs: {
    name: 'tjs',
    link: 'https://github.com/sberan/tjs',
    description: 'The fastest JSON Schema validator with TypeScript inference',
  },
  ajv: {
    name: 'ajv',
    link: 'https://ajv.js.org/',
    description: 'The fastest JSON Schema validator (until now)',
  },
  zod: {
    name: 'zod',
    link: 'https://zod.dev/',
    description: 'TypeScript-first schema validation',
  },
  joi: {
    name: 'joi',
    link: 'https://joi.dev/',
    description: 'Object schema validation (via enjoi)',
  },
  jsonschema: {
    name: 'jsonschema',
    link: 'https://www.npmjs.com/package/jsonschema',
    description: 'Simple and lightweight validator',
  },
  'is-my-json-valid': {
    name: 'is-my-json-valid',
    link: 'https://www.npmjs.com/package/is-my-json-valid',
    description: 'Code-generation based validator',
  },
  'z-schema': {
    name: 'z-schema',
    link: 'https://github.com/zaggino/z-schema',
    description: 'JSON Schema validator with async support',
  },
  djv: {
    name: 'djv',
    link: 'https://github.com/korzio/djv',
    description: 'Dynamic JSON Schema Validator',
  },
  jsen: {
    name: 'jsen',
    link: 'https://github.com/bugventure/jsen',
    description: 'JSON Sentinel, built for speed',
  },
  schemasafe: {
    name: '@exodus/schemasafe',
    link: 'https://github.com/ExodusMovement/schemasafe',
    description: 'Safe JSON Schema validator with code generation',
  },
};

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
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
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

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

// Calculate average ns/test for a validator across all passing groups
function calculateAvgNs(data: ValidatorBenchmark): { avgNs: number; totalTests: number } {
  let totalNs = 0;
  let totalTests = 0;

  for (const result of data.results) {
    for (const group of result.groups) {
      if (group.passed && group.nsPerTest > 0) {
        totalNs += group.nsPerTest * group.testCount;
        totalTests += group.testCount;
      }
    }
  }

  return {
    avgNs: totalTests > 0 ? totalNs / totalTests : 0,
    totalTests,
  };
}

// Calculate compliance rate for a validator
function calculateCompliance(data: ValidatorBenchmark): {
  passed: number;
  total: number;
  rate: string;
} {
  let totalPassed = 0;
  let totalTests = 0;

  for (const draft of Object.values(data.summary)) {
    totalPassed += draft.totalPass;
    totalTests += draft.totalPass + draft.totalFail;
  }

  const rate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
  return { passed: totalPassed, total: totalTests, rate: `${rate}%` };
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
function calculateH2H(
  tjsData: ValidatorBenchmark,
  otherData: ValidatorBenchmark
): { tjsNs: number; otherNs: number; tests: number } | null {
  const tjsLookup = buildGroupLookup(tjsData);
  const otherLookup = buildGroupLookup(otherData);

  let h2hTjsNs = 0;
  let h2hOtherNs = 0;
  let h2hTests = 0;

  for (const [key, tjsGroup] of tjsLookup) {
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

  if (h2hTests === 0) return null;

  return {
    tjsNs: h2hTjsNs / h2hTests,
    otherNs: h2hOtherNs / h2hTests,
    tests: h2hTests,
  };
}

function generateSummaryTable(validatorData: Map<string, ValidatorBenchmark>): string {
  const lines: string[] = [];
  const tjsData = validatorData.get('tjs');

  if (!tjsData) {
    return 'No tjs benchmark data available.';
  }

  const tjsCompliance = calculateCompliance(tjsData);

  lines.push('| Validator | Compliance | ops/s | vs tjs |');
  lines.push('|-----------|----------:|------:|-------:|');

  // Add tjs row first (use overall average for tjs's own row)
  const tjsStats = calculateAvgNs(tjsData);
  const tjsOps = formatOps(tjsStats.avgNs);
  const tjsInfo = validatorInfo['tjs'];
  lines.push(`| [${tjsInfo.name}](${tjsInfo.link}) | ${tjsCompliance.rate} | ${tjsOps} | - |`);

  // Add other validators using head-to-head comparison
  for (const validator of ALL_VALIDATORS) {
    if (validator === 'tjs') continue;

    const data = validatorData.get(validator);
    if (!data) continue;

    const compliance = calculateCompliance(data);

    // Use H2H comparison for fair ops/s and speedup
    const h2h = calculateH2H(tjsData, data);

    let ops = '-';
    let speedup = '-';

    if (h2h) {
      // Show the validator's ops/s on the shared test set
      ops = formatOps(h2h.otherNs);

      // Calculate speedup ratio on shared tests
      const ratio = h2h.otherNs / h2h.tjsNs;
      if (ratio > 1.05) {
        speedup = `${ratio.toFixed(1)}x slower`;
      } else if (ratio < 0.95) {
        speedup = `${(1 / ratio).toFixed(1)}x faster`;
      } else {
        speedup = '~same';
      }
    }

    const info = validatorInfo[validator];
    const validatorLink = info ? `[${info.name}](${info.link})` : validator;

    lines.push(`| ${validatorLink} | ${compliance.rate} | ${ops} | ${speedup} |`);
  }

  return lines.join('\n');
}

function generateDetailedReports(validatorData: Map<string, ValidatorBenchmark>): string {
  const lines: string[] = [];

  for (const validator of ALL_VALIDATORS) {
    if (validator === 'tjs') continue;

    const data = validatorData.get(validator);
    if (!data) continue;

    const info = validatorInfo[validator];
    const reportFile = `benchmarks/results/BENCHMARK_${validator.toUpperCase().replace(/-/g, '_')}.md`;
    const reportPath = path.join(__dirname, '..', reportFile);

    if (fs.existsSync(reportPath)) {
      const desc = info?.description || '';
      lines.push(`- [**tjs vs ${info?.name || validator}**](${reportFile}) - ${desc}`);
    }
  }

  return lines.length > 0 ? lines.join('\n') : 'No detailed reports available yet.';
}

function generateDraftTable(validatorData: Map<string, ValidatorBenchmark>): string {
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const lines: string[] = [];

  // Build header with all available validators
  let header = '| Draft |';
  let separator = '|-------|';
  for (const validator of ALL_VALIDATORS) {
    if (validatorData.has(validator)) {
      header += ` ${validator} |`;
      separator += '----:|';
    }
  }
  lines.push(header);
  lines.push(separator);

  // Build rows for each draft
  for (const draft of drafts) {
    let row = `| ${draft} |`;

    for (const validator of ALL_VALIDATORS) {
      const data = validatorData.get(validator);
      if (!data) continue;

      // Calculate average ns for this draft
      const draftResults = data.results.filter((r) => r.draft === draft);
      let draftNs = 0;
      let draftTests = 0;

      for (const result of draftResults) {
        for (const group of result.groups) {
          if (group.passed && group.nsPerTest > 0) {
            draftNs += group.nsPerTest * group.testCount;
            draftTests += group.testCount;
          }
        }
      }

      const avgNs = draftTests > 0 ? Math.round(draftNs / draftTests) : 0;
      row += avgNs > 0 ? ` ${avgNs} |` : ' - |';
    }

    lines.push(row);
  }

  return lines.join('\n');
}

function main() {
  // Load template
  const templatePath = path.join(__dirname, 'BENCHMARKS.template.md');
  if (!fs.existsSync(templatePath)) {
    console.error(`Template file not found: ${templatePath}`);
    process.exit(1);
  }
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Load all validators
  const validatorData: Map<string, ValidatorBenchmark> = new Map();
  for (const validator of ALL_VALIDATORS) {
    const data = loadBenchmarkData(validator);
    if (data) {
      validatorData.set(validator, data);
      console.error(`Loaded ${validator}: ${data.results.length} files`);
    }
  }

  if (validatorData.size === 0) {
    console.error('No benchmark data available. Run `npm run bench:all` to generate benchmarks.');
    process.exit(1);
  }

  // Generate each section
  const summaryTable = generateSummaryTable(validatorData);
  const detailedReports = generateDetailedReports(validatorData);
  const draftTable = generateDraftTable(validatorData);

  // Replace placeholders in template
  template = template.replace('{{SUMMARY_TABLE}}', summaryTable);
  template = template.replace('{{DETAILED_REPORTS}}', detailedReports);
  template = template.replace('{{DRAFT_TABLE}}', draftTable);

  // Write to BENCHMARKS.md
  const outputPath = path.join(__dirname, '..', 'BENCHMARKS.md');
  fs.writeFileSync(outputPath, template);
  console.error(`Generated ${outputPath}`);
}

main();
