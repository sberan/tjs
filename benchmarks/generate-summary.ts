/**
 * Generate a comprehensive summary BENCHMARKS.md from all validator results
 * using a template file for clean generation.
 *
 * Usage:
 *   npx tsx benchmarks/generate-summary.ts
 *
 * Reads from:
 *   benchmarks/results/*.json
 *   benchmarks/BENCHMARKS.template.md
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const validatorInfo: Record<string, { name: string; link: string; description: string }> = {
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

function loadBenchmarkData(validator: string): BenchmarkData | null {
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

function generateSummaryTable(validatorData: Map<string, BenchmarkData>): string {
  const lines: string[] = [];

  lines.push('| Validator | Compliance | tjs ops/s | Other ops/s | Winner | Speedup |');
  lines.push('|-----------|----------:|----------:|------------:|:------:|--------:|');

  for (const validator of ALL_VALIDATORS) {
    const data = validatorData.get(validator);
    if (!data) continue;

    const h2h = data.headToHead;
    if (!h2h) continue;

    // Calculate compliance from summary
    let totalPassed = 0;
    let totalTests = 0;
    for (const summary of Object.values(data.summary)) {
      totalPassed += summary.other.pass;
      totalTests += summary.other.pass + summary.other.fail;
    }
    const compliance = totalTests > 0 ? formatPercent((totalPassed / totalTests) * 100) : '-';

    const tjsOps = formatOps(h2h.avgNsA);
    const otherOps = formatOps(h2h.avgNsB);
    const winner = h2h.faster === 'tjs' ? '**tjs**' : `${validator}`;
    const speedup = `${h2h.ratio.toFixed(2)}x`;

    const info = validatorInfo[validator];
    const validatorLink = info ? `[${info.name}](${info.link})` : validator;

    lines.push(
      `| ${validatorLink} | ${compliance} | ${tjsOps} | ${otherOps} | ${winner} | ${speedup} |`
    );
  }

  return lines.join('\n');
}

function generateDetailedReports(validatorData: Map<string, BenchmarkData>): string {
  const lines: string[] = [];

  for (const validator of ALL_VALIDATORS) {
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

  return lines.join('\n');
}

function generateDraftTable(validatorData: Map<string, BenchmarkData>): string {
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  const lines: string[] = [];

  // Build header
  let header = '| Draft | tjs |';
  let separator = '|-------|----:|';
  for (const validator of ALL_VALIDATORS) {
    if (validatorData.has(validator)) {
      header += ` ${validator} |`;
      separator += '----:|';
    }
  }
  lines.push(header);
  lines.push(separator);

  for (const draft of drafts) {
    let row = `| ${draft} |`;

    // Get tjs time from first available validator's data
    let tjsNs = 0;
    for (const data of validatorData.values()) {
      const summary = data.summary[draft];
      if (summary && summary.tjs.nsPerTest > 0) {
        tjsNs = summary.tjs.nsPerTest;
        break;
      }
    }
    row += ` ${Math.round(tjsNs)} |`;

    for (const validator of ALL_VALIDATORS) {
      const data = validatorData.get(validator);
      if (!data) continue;
      const summary = data.summary[draft];
      if (summary && summary.other.nsPerTest > 0) {
        row += ` ${Math.round(summary.other.nsPerTest)} |`;
      } else {
        row += ' - |';
      }
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
  const validatorData: Map<string, BenchmarkData> = new Map();
  for (const validator of ALL_VALIDATORS) {
    const data = loadBenchmarkData(validator);
    if (data) {
      validatorData.set(validator, data);
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
