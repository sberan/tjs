/**
 * Merge multiple per-draft benchmark JSON files into a single combined result.
 *
 * Usage:
 *   npx tsx benchmarks/merge-benchmarks.ts <output.json> <input1.json> <input2.json> ...
 *
 * Example:
 *   npx tsx benchmarks/merge-benchmarks.ts results/ajv.json \
 *     results/ajv-draft4.json results/ajv-draft6.json results/ajv-draft7.json \
 *     results/ajv-draft2019-09.json results/ajv-draft2020-12.json
 */

import * as fs from 'fs';

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
  results: FileResult[];
  summary: Record<string, DraftSummary>;
  headToHead: H2H | null;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      'Usage: npx tsx benchmarks/merge-benchmarks.ts <output.json> <input1.json> [input2.json ...]'
    );
    process.exit(1);
  }

  const outputFile = args[0];
  const inputFiles = args.slice(1);

  // Load all input files
  const inputs: BenchmarkData[] = [];
  for (const file of inputFiles) {
    if (!fs.existsSync(file)) {
      console.error(`Warning: ${file} not found, skipping`);
      continue;
    }
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      inputs.push(data);
    } catch (e) {
      console.error(`Warning: Failed to parse ${file}, skipping`);
    }
  }

  if (inputs.length === 0) {
    console.error('Error: No valid input files found');
    process.exit(1);
  }

  // All inputs should have the same compareValidator
  const compareValidator = inputs[0].compareValidator;

  // Merge results from all inputs
  const allResults: FileResult[] = [];
  const allSummaries: Record<string, DraftSummary> = {};

  for (const input of inputs) {
    // Add results
    if (input.results) {
      allResults.push(...input.results);
    }

    // Merge summaries
    if (input.summary) {
      for (const [draft, summary] of Object.entries(input.summary)) {
        allSummaries[draft] = summary;
      }
    }
  }

  // Compute combined head-to-head
  const computeH2H = (): H2H | null => {
    const applicable = allResults.filter((r) => r.other.nsPerTest > 0 && r.tjs.nsPerTest > 0);
    if (applicable.length === 0) return null;

    const totalTjs = applicable.reduce((sum, r) => sum + r.tjs.nsPerTest * r.testCount, 0);
    const totalOther = applicable.reduce((sum, r) => sum + r.other.nsPerTest * r.testCount, 0);
    const totalTests = applicable.reduce((sum, r) => sum + r.testCount, 0);
    const avgTjs = totalTjs / totalTests;
    const avgOther = totalOther / totalTests;
    const faster = avgTjs < avgOther ? 'tjs' : compareValidator;
    const ratio = avgTjs < avgOther ? avgOther / avgTjs : avgTjs / avgOther;

    return {
      validatorA: 'tjs',
      validatorB: compareValidator,
      avgNsA: avgTjs,
      avgNsB: avgOther,
      faster,
      ratio,
      totalTests,
    };
  };

  const merged: BenchmarkData = {
    compareValidator,
    results: allResults,
    summary: allSummaries,
    headToHead: computeH2H(),
  };

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));
  console.log(`Merged ${inputs.length} files into ${outputFile}`);
  console.log(`  - ${allResults.length} file results`);
  console.log(`  - ${Object.keys(allSummaries).length} draft summaries`);
}

main();
