/**
 * Merge multiple per-draft isolated benchmark JSON files into a single combined result.
 *
 * Usage:
 *   npx tsx benchmarks/merge-isolated.ts <output.json> <input1.json> <input2.json> ...
 *
 * Example:
 *   npx tsx benchmarks/merge-isolated.ts results/tjs-isolated.json \
 *     results/tjs-draft4.json results/tjs-draft6.json results/tjs-draft7.json \
 *     results/tjs-draft2019-09.json results/tjs-draft2020-12.json
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

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      'Usage: npx tsx benchmarks/merge-isolated.ts <output.json> <input1.json> [input2.json ...]'
    );
    process.exit(1);
  }

  const outputFile = args[0];
  const inputFiles = args.slice(1);

  // Load all input files
  const inputs: IsolatedBenchmarkResult[] = [];
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

  // All inputs should have the same validator
  const validator = inputs[0].validator;

  // Merge results from all inputs
  const allResults: FileResult[] = [];
  const allSummaries: Record<string, { totalPass: number; totalFail: number; files: number }> = {};

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

  const merged: IsolatedBenchmarkResult = {
    validator,
    timestamp: new Date().toISOString(),
    results: allResults,
    summary: allSummaries,
  };

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));
  console.log(`Merged ${inputs.length} files into ${outputFile}`);
  console.log(`  - ${allResults.length} file results`);
  console.log(`  - ${Object.keys(allSummaries).length} draft summaries`);
}

main();
