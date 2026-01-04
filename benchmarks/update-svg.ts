/**
 * Update the benchmark SVG bar chart from JSON output files
 *
 * Usage:
 *   npx tsx benchmarks/update-svg.ts
 *
 * Reads from:
 *   benchmarks/results/*.json (individual validator benchmark results)
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

// Display names for validators
const validatorDisplayNames: Record<string, string> = {
  tjs: 'tjs',
  ajv: 'ajv',
  zod: 'zod',
  joi: 'joi',
  jsonschema: 'jsonschema',
  'is-my-json-valid': 'is-my-json-valid',
  'z-schema': 'z-schema',
  djv: 'djv',
  jsen: 'jsen',
  schemasafe: 'schemasafe',
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

function formatOps(opsPerSec: number): string {
  if (opsPerSec >= 1_000_000) {
    return `${(opsPerSec / 1_000_000).toFixed(1)}M`;
  }
  if (opsPerSec >= 1_000) {
    return `${(opsPerSec / 1_000).toFixed(0)}K`;
  }
  return `${Math.round(opsPerSec)}`;
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

// Calculate ops/sec for a validator
function calculateOps(data: ValidatorBenchmark): number {
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

  if (totalTests === 0 || totalNs === 0) return 0;
  return (1e9 * totalTests) / totalNs;
}

// Color palette for validators
const validatorColors: Record<string, { start: string; end: string; label: string }> = {
  tjs: { start: '#34d399', end: '#10b981', label: '#34d399' },
  ajv: { start: '#818cf8', end: '#6366f1', label: '#818cf8' },
  zod: { start: '#fbbf24', end: '#f59e0b', label: '#fbbf24' },
  joi: { start: '#f87171', end: '#ef4444', label: '#f87171' },
  jsonschema: { start: '#a78bfa', end: '#8b5cf6', label: '#a78bfa' },
  'is-my-json-valid': { start: '#67e8f9', end: '#22d3ee', label: '#67e8f9' },
  'z-schema': { start: '#fb923c', end: '#f97316', label: '#fb923c' },
  djv: { start: '#4ade80', end: '#22c55e', label: '#4ade80' },
  jsen: { start: '#f472b6', end: '#ec4899', label: '#f472b6' },
  schemasafe: { start: '#60a5fa', end: '#3b82f6', label: '#60a5fa' },
};

function main() {
  // Load all validator data and calculate ops/sec
  const validatorOps: Array<{ name: string; ops: number }> = [];

  for (const validator of ALL_VALIDATORS) {
    const data = loadBenchmarkData(validator);
    if (data) {
      const ops = calculateOps(data);
      if (ops > 0) {
        validatorOps.push({ name: validator, ops });
        console.error(`Loaded ${validator}: ${formatOps(ops)} ops/sec`);
      }
    }
  }

  if (validatorOps.length < 2) {
    console.error('Not enough benchmark data found. Run benchmarks first.');
    process.exit(1);
  }

  // Sort by ops/sec (fastest first)
  validatorOps.sort((a, b) => b.ops - a.ops);

  console.error('\nPerformance (ops/sec):');
  for (const v of validatorOps) {
    console.error(`  ${v.name}: ${formatOps(v.ops)} ops/sec`);
  }

  const tjsOps = validatorOps.find((v) => v.name === 'tjs')?.ops || 0;
  if (tjsOps > 0) {
    console.error('\nMultipliers (tjs vs):');
    for (const v of validatorOps) {
      if (v.name !== 'tjs') {
        const mult = tjsOps / v.ops;
        console.error(`  ${v.name}: ${mult.toFixed(1)}x`);
      }
    }
  }

  // Calculate chart dimensions based on number of validators
  const maxOps = Math.max(...validatorOps.map((v) => v.ops));
  const numValidators = validatorOps.length;

  // Dynamic chart sizing
  const chartWidth = Math.max(800, 100 + numValidators * 80);
  const barWidth = Math.min(60, (chartWidth - 200) / numValidators - 20);
  const barSpacing = barWidth + 20;
  const startX = 100;
  const baseY = 400;
  const maxHeight = 300;

  // Calculate Y-axis scale
  const maxOpsRounded = Math.ceil(maxOps / 1e6) * 1e6;
  const yAxisStep = maxOpsRounded / 3;

  // Generate gradient definitions
  const gradientDefs = validatorOps
    .map((v) => {
      const colors = validatorColors[v.name] || { start: '#94a3b8', end: '#64748b' };
      return `    <linearGradient id="grad-${v.name.replace(/[^a-z0-9]/gi, '-')}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>`;
    })
    .join('\n');

  // Generate bars
  const barsSvg = validatorOps
    .map((v, i) => {
      const height = Math.max(8, Math.round((v.ops / maxOps) * maxHeight));
      const x = startX + i * barSpacing;
      const y = baseY - height;
      const rx = Math.min(6, height / 2);
      const colors = validatorColors[v.name] || { label: '#94a3b8' };
      const filter = v.name === 'tjs' ? ' filter="url(#glow-tjs)"' : '';
      const gradientId = `grad-${v.name.replace(/[^a-z0-9]/gi, '-')}`;
      const displayName = validatorDisplayNames[v.name] || v.name;

      // Truncate long names
      const labelName = displayName.length > 12 ? displayName.substring(0, 10) + '..' : displayName;

      return `  <!-- ${v.name}: ${formatOps(v.ops)} = ${height}px height -->
  <rect x="${x}" y="${y}" width="${barWidth}" height="${height}" rx="${rx}" fill="url(#${gradientId})"${filter}/>
  <text x="${x + barWidth / 2}" y="425" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500">${labelName}</text>
  <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" fill="${colors.label}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="bold">${formatOps(v.ops)}</text>`;
    })
    .join('\n\n');

  // Generate grid lines based on chart width
  const gridEndX = startX + (numValidators - 1) * barSpacing + barWidth + 20;

  // Generate SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${chartWidth} 480">
  <defs>
    <!-- Gradients for bars -->
${gradientDefs}
    <!-- Glow effects -->
    <filter id="glow-tjs" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${chartWidth}" height="480" fill="#0f172a"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.1">
    <line x1="80" y1="400" x2="${gridEndX}" y2="400" stroke="#94a3b8" stroke-width="1"/>
    <line x1="80" y1="300" x2="${gridEndX}" y2="300" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="80" y1="200" x2="${gridEndX}" y2="200" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="80" y1="100" x2="${gridEndX}" y2="100" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
  </g>

  <!-- Y-axis labels -->
  <text x="70" y="405" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">0</text>
  <text x="70" y="305" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">${formatOps(yAxisStep)}</text>
  <text x="70" y="205" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">${formatOps(yAxisStep * 2)}</text>
  <text x="70" y="105" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">${formatOps(yAxisStep * 3)}</text>

  <!-- Title -->
  <text x="${chartWidth / 2}" y="35" text-anchor="middle" fill="#f1f5f9" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">JSON Schema Validator Performance</text>
  <text x="${chartWidth / 2}" y="60" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14">Operations per second (higher is better)</text>

  <!-- Bars -->
${barsSvg}

  <!-- Legend note -->
  <text x="${chartWidth / 2}" y="460" text-anchor="middle" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="11">Using JSON Schema Test Suite · Only passing test groups are benchmarked</text>
</svg>
`;

  // Write to file
  const svgPath = path.join(__dirname, '../assets/benchmark.svg');
  fs.writeFileSync(svgPath, svg);
  console.error(`\nUpdated ${svgPath}`);
}

main();
