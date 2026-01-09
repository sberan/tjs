/**
 * Update the benchmark SVG bar chart from JSON output files
 *
 * Usage:
 *   npx tsx benchmarks/update-svg.ts
 *
 * Reads from:
 *   benchmarks/results/*.json (individual validator benchmark results)
 *
 * Uses head-to-head comparison: only tests where both tjs AND the other
 * validator pass are compared. This gives apples-to-apples performance numbers.
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

// Calculate head-to-head ops/sec between tjs and another validator
// Only counts tests where BOTH validators pass (apples-to-apples)
function calculateH2HOps(
  tjsData: ValidatorBenchmark,
  otherData: ValidatorBenchmark
): { tjsOps: number; otherOps: number; sharedTests: number } | null {
  // Build lookup for other validator's groups
  const otherLookup = new Map<string, GroupResult>();
  for (const result of otherData.results) {
    for (const group of result.groups) {
      const key = `${result.draft}:${result.file}:${group.groupDesc}`;
      otherLookup.set(key, group);
    }
  }

  let h2hTjsNs = 0;
  let h2hOtherNs = 0;
  let h2hTests = 0;

  for (const result of tjsData.results) {
    for (const tjsGroup of result.groups) {
      const key = `${result.draft}:${result.file}:${tjsGroup.groupDesc}`;
      const otherGroup = otherLookup.get(key);

      // Only include tests where BOTH validators pass
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
  }

  if (h2hTests === 0) return null;

  return {
    tjsOps: (1e9 * h2hTests) / h2hTjsNs,
    otherOps: (1e9 * h2hTests) / h2hOtherNs,
    sharedTests: h2hTests,
  };
}

// Calculate total passed tests for a validator
function calculatePassedTests(data: ValidatorBenchmark): number {
  let totalPassed = 0;
  for (const result of data.results) {
    for (const group of result.groups) {
      if (group.passed) {
        totalPassed += group.testCount;
      }
    }
  }
  return totalPassed;
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

// Get badge color based on compliance percentage
// 90%+ = green, 30-89% = yellow, <30% = red
function getBadgeColor(percent: number): { bg: string; text: string } {
  if (percent >= 90) {
    return { bg: '#22c55e', text: '#0f172a' }; // green
  } else if (percent >= 30) {
    return { bg: '#f59e0b', text: '#0f172a' }; // yellow
  } else {
    return { bg: '#ef4444', text: '#fff' }; // red
  }
}

function main() {
  // Load tjs data first (baseline for all comparisons)
  const tjsBenchmark = loadBenchmarkData('tjs');
  if (!tjsBenchmark) {
    console.error('Error: tjs.json is required for SVG generation');
    process.exit(1);
  }

  const tjsPassedTests = calculatePassedTests(tjsBenchmark);

  // For each other validator, calculate head-to-head comparison
  // This only counts tests where BOTH validators pass
  const validatorData: Array<{
    name: string;
    ops: number; // adjusted ops/sec (normalized to tjs baseline)
    ratio: number; // how many times faster tjs is
    sharedTests: number;
    passedTests: number; // total tests this validator passes (for compliance badge)
  }> = [];

  // We'll use the tjs ops from the comparison with the most shared tests as baseline
  let tjsBaselineOps = 0;
  let maxSharedTests = 0;

  for (const validator of ALL_VALIDATORS) {
    if (validator === 'tjs') continue;

    const data = loadBenchmarkData(validator);
    if (!data) continue;

    const h2h = calculateH2HOps(tjsBenchmark, data);
    if (!h2h) continue;

    const ratio = h2h.tjsOps / h2h.otherOps;
    validatorData.push({
      name: validator,
      ops: h2h.otherOps, // will be adjusted after we find tjs baseline
      ratio,
      sharedTests: h2h.sharedTests,
      passedTests: calculatePassedTests(data),
    });

    // Track the comparison with the most shared tests to use as tjs baseline
    if (h2h.sharedTests > maxSharedTests) {
      maxSharedTests = h2h.sharedTests;
      tjsBaselineOps = h2h.tjsOps;
    }

    console.error(
      `H2H ${validator}: tjs ${formatOps(h2h.tjsOps)} vs ${formatOps(h2h.otherOps)} (${ratio.toFixed(2)}x) on ${h2h.sharedTests} shared tests`
    );
  }

  if (validatorData.length < 1) {
    console.error('Not enough benchmark data found. Run benchmarks first.');
    process.exit(1);
  }

  // Adjust each validator's ops based on ratio relative to tjs baseline
  // This normalizes all comparisons to the same scale
  for (const v of validatorData) {
    v.ops = tjsBaselineOps / v.ratio;
  }

  // Add tjs with the baseline ops
  validatorData.push({
    name: 'tjs',
    ops: tjsBaselineOps,
    ratio: 1,
    sharedTests: tjsPassedTests,
    passedTests: tjsPassedTests,
  });

  // Sort by ops/sec (fastest first)
  validatorData.sort((a, b) => b.ops - a.ops);

  console.error('\nAdjusted ops/sec (normalized to tjs baseline):');
  for (const v of validatorData) {
    const compliance = Math.round((v.passedTests / tjsPassedTests) * 100);
    console.error(`  ${v.name}: ${formatOps(v.ops)} ops/sec, ${compliance}% valid`);
  }

  // Calculate chart dimensions based on number of validators
  const maxOps = Math.max(...validatorData.map((v) => v.ops));
  const tjsTestCount = tjsPassedTests;
  const numValidators = validatorData.length;

  // Dynamic chart sizing
  const chartWidth = Math.max(900, 100 + numValidators * 80);
  const chartHeight = 520; // Increased for badges
  const barWidth = Math.min(50, (chartWidth - 200) / numValidators - 20);
  const barSpacing = barWidth + 20;
  const totalBarsWidth = numValidators * barSpacing - 20; // Total width of all bars
  const startX = (chartWidth - totalBarsWidth) / 2; // Center the bars
  const baseY = 400;
  const maxHeight = 300;

  // Calculate Y-axis scale
  const maxOpsRounded = Math.ceil(maxOps / 1e6) * 1e6;
  const yAxisStep = maxOpsRounded / 3;

  // Generate gradient definitions - use tjs color for all bars since they show tjs speedup
  const gradientDefs = validatorData
    .map((v) => {
      const colors = validatorColors[v.name] || { start: '#94a3b8', end: '#64748b' };
      return `    <linearGradient id="grad-${v.name.replace(/[^a-z0-9]/gi, '-')}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>`;
    })
    .join('\n');

  // Generate bars with compliance badges
  const barsSvg = validatorData
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

      // Calculate compliance percentage
      const compliance = Math.round((v.passedTests / tjsTestCount) * 100);
      const badgeColors = getBadgeColor(compliance);

      // Badge dimensions
      const badgeWidth = 56;
      const badgeHeight = 14;
      const badgeX = x + barWidth / 2 - badgeWidth / 2;
      const badgeY = 426;

      return `  <!-- ${v.name}: ${formatOps(v.ops)} adjusted ops/sec, ${compliance}% valid -->
  <rect x="${x}" y="${y}" width="${barWidth}" height="${height}" rx="${rx}" fill="url(#${gradientId})"${filter}/>
  <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" fill="${colors.label}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="bold">${formatOps(v.ops)}</text>
  <text x="${x + barWidth / 2}" y="420" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500">${labelName}</text>
  <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" rx="7" fill="${badgeColors.bg}"/>
  <text x="${x + barWidth / 2}" y="${badgeY + 10}" text-anchor="middle" fill="${badgeColors.text}" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="bold">${compliance}% VALID</text>`;
    })
    .join('\n\n');

  // Generate grid lines based on chart width
  const gridStartX = startX - 20;
  const gridEndX = startX + totalBarsWidth + 20;

  // Generate SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${chartWidth} ${chartHeight}">
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
  <rect width="${chartWidth}" height="${chartHeight}" fill="#0f172a"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.1">
    <line x1="${gridStartX}" y1="400" x2="${gridEndX}" y2="400" stroke="#94a3b8" stroke-width="1"/>
    <line x1="${gridStartX}" y1="300" x2="${gridEndX}" y2="300" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="${gridStartX}" y1="200" x2="${gridEndX}" y2="200" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="${gridStartX}" y1="100" x2="${gridEndX}" y2="100" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
  </g>

  <!-- Y-axis labels -->
  <text x="${gridStartX - 10}" y="405" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">0</text>
  <text x="${gridStartX - 10}" y="305" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">${formatOps(yAxisStep)}</text>
  <text x="${gridStartX - 10}" y="205" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">${formatOps(yAxisStep * 2)}</text>
  <text x="${gridStartX - 10}" y="105" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">${formatOps(yAxisStep * 3)}</text>

  <!-- Title -->
  <text x="${chartWidth / 2}" y="35" text-anchor="middle" fill="#f1f5f9" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">JSON Schema Validator Performance</text>
  <text x="${chartWidth / 2}" y="60" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14">Adjusted ops/sec (head-to-head on shared tests)</text>

  <!-- Bars -->
${barsSvg}

  <!-- Legend -->
  <text x="${chartWidth / 2}" y="465" text-anchor="middle" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="11">% VALID = JSON Schema Test Suite validations passed (${tjsTestCount.toLocaleString()} total)</text>

  <!-- Color key -->
  <g transform="translate(${chartWidth / 2 - 120}, 478)">
    <rect x="0" y="0" width="30" height="12" rx="6" fill="#22c55e"/>
    <text x="35" y="10" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10">90%+</text>
    <rect x="80" y="0" width="30" height="12" rx="6" fill="#f59e0b"/>
    <text x="115" y="10" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10">30-89%</text>
    <rect x="175" y="0" width="30" height="12" rx="6" fill="#ef4444"/>
    <text x="210" y="10" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10">&lt;30%</text>
  </g>

</svg>
`;

  // Write to file
  const svgPath = path.join(__dirname, '../assets/benchmark.svg');
  fs.writeFileSync(svgPath, svg);
  console.error(`\nUpdated ${svgPath}`);
}

main();
