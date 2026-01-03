/**
 * Extract JSON from benchmark output that may contain progress lines and warnings.
 *
 * Usage:
 *   npm run bench:json | npx tsx benchmarks/extract-json.ts > benchmark.json
 */

import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8');

  // Find the outermost complete JSON object by tracking braces
  let depth = 0;
  let jsonStart = -1;
  let jsonEnd = -1;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '{') {
      if (depth === 0) jsonStart = i;
      depth++;
    } else if (input[i] === '}') {
      depth--;
      if (depth === 0) {
        jsonEnd = i;
        // Keep going to find the last complete JSON object
      }
    }
  }

  if (jsonStart !== -1 && jsonEnd !== -1) {
    const jsonStr = input.slice(jsonStart, jsonEnd + 1);
    try {
      const json = JSON.parse(jsonStr);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Failed to parse JSON:', (e as Error).message);
      console.error('JSON string (first 500 chars):', jsonStr.substring(0, 500));
      process.exit(1);
    }
  } else {
    console.error('Failed to find JSON in output');
    console.error('Output (first 500 chars):', input.substring(0, 500));
    process.exit(1);
  }
}

main();
