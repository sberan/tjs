/**
 * Update the benchmark SVG bar chart from JSON output files
 *
 * Usage:
 *   npx tsx benchmarks/update-svg.ts
 *
 * Reads from:
 *   benchmarks/results/ajv.json
 *   benchmarks/results/zod.json
 *   benchmarks/results/joi.json
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

function formatOps(opsPerSec: number): string {
  if (opsPerSec >= 1_000_000) {
    return `${(opsPerSec / 1_000_000).toFixed(1)}M`;
  }
  if (opsPerSec >= 1_000) {
    return `${(opsPerSec / 1_000).toFixed(0)}K`;
  }
  return `${Math.round(opsPerSec)}`;
}

function loadBenchmarkData(validator: string): BenchmarkData | null {
  const filePath = path.join(__dirname, 'results', `${validator}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Warning: ${filePath} not found`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function main() {
  // Load benchmark data from each validator's JSON file
  const ajvData = loadBenchmarkData('ajv');
  const zodData = loadBenchmarkData('zod');
  const joiData = loadBenchmarkData('joi');

  if (!ajvData && !zodData && !joiData) {
    console.error('No benchmark data found. Run benchmarks first:');
    console.error('  npm run bench:ajv');
    console.error('  npm run bench:zod');
    console.error('  npm run bench:joi');
    process.exit(1);
  }

  // Calculate weighted average ops/sec across all drafts
  // Each validator comparison has its own test set (only tests where both pass)
  const drafts = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];

  // Use ajvData for tjs stats (tjs is consistent, we just need one source)
  let tjsTotalTests = 0;
  let tjsTotalNs = 0;
  const primaryData = ajvData || zodData || joiData;
  if (primaryData) {
    for (const draft of drafts) {
      const s = primaryData.summary[draft];
      if (!s) continue;
      tjsTotalTests += s.tests;
      tjsTotalNs += s.tjs.nsPerTest * s.tests;
    }
  }

  // Each validator uses its own test count (only benchmarkable tests where both pass)
  let ajvTotalTests = 0;
  let ajvTotalNs = 0;
  if (ajvData) {
    for (const draft of drafts) {
      const s = ajvData.summary[draft];
      if (!s) continue;
      ajvTotalTests += s.tests;
      ajvTotalNs += s.other.nsPerTest * s.tests;
    }
  }

  let zodTotalTests = 0;
  let zodTotalNs = 0;
  if (zodData) {
    for (const draft of drafts) {
      const s = zodData.summary[draft];
      if (!s) continue;
      zodTotalTests += s.tests;
      zodTotalNs += s.other.nsPerTest * s.tests;
    }
  }

  let joiTotalTests = 0;
  let joiTotalNs = 0;
  if (joiData) {
    for (const draft of drafts) {
      const s = joiData.summary[draft];
      if (!s) continue;
      joiTotalTests += s.tests;
      joiTotalNs += s.other.nsPerTest * s.tests;
    }
  }

  // Convert to ops/sec - each validator uses its own test count
  const tjsOps = tjsTotalTests > 0 && tjsTotalNs > 0 ? (1e9 * tjsTotalTests) / tjsTotalNs : 0;
  const ajvOps = ajvTotalTests > 0 && ajvTotalNs > 0 ? (1e9 * ajvTotalTests) / ajvTotalNs : 0;
  const zodOps = zodTotalTests > 0 && zodTotalNs > 0 ? (1e9 * zodTotalTests) / zodTotalNs : 0;
  const joiOps = joiTotalTests > 0 && joiTotalNs > 0 ? (1e9 * joiTotalTests) / joiTotalNs : 0;

  console.error(`Performance (ops/sec):`);
  console.error(`  tjs: ${formatOps(tjsOps)} ops/sec`);
  console.error(`  ajv: ${formatOps(ajvOps)} ops/sec`);
  console.error(`  zod: ${formatOps(zodOps)} ops/sec`);
  console.error(`  joi: ${formatOps(joiOps)} ops/sec`);

  // Calculate bar heights (max height is 300px, baseline y is 400)
  const maxOps = Math.max(tjsOps, ajvOps, zodOps, joiOps);
  const maxHeight = 300;
  const baseY = 400;

  const tjsHeight = Math.round((tjsOps / maxOps) * maxHeight);
  const ajvHeight = Math.round((ajvOps / maxOps) * maxHeight);
  const zodHeight = Math.max(8, Math.round((zodOps / maxOps) * maxHeight)); // min 8px for visibility
  const joiHeight = Math.max(8, Math.round((joiOps / maxOps) * maxHeight)); // min 8px for visibility

  const tjsY = baseY - tjsHeight;
  const ajvY = baseY - ajvHeight;
  const zodY = baseY - zodHeight;
  const joiY = baseY - joiHeight;

  // Calculate multipliers (tjs vs others)
  const ajvMultiplier = ajvOps > 0 ? tjsOps / ajvOps : 0;
  const zodMultiplier = zodOps > 0 ? tjsOps / zodOps : 0;
  const joiMultiplier = joiOps > 0 ? tjsOps / joiOps : 0;

  console.error(`\nMultipliers (tjs vs):`);
  console.error(`  ajv: ${ajvMultiplier > 0 ? ajvMultiplier.toFixed(1) + '×' : 'N/A'}`);
  console.error(`  zod: ${zodMultiplier > 0 ? zodMultiplier.toFixed(0) + '×' : 'N/A'}`);
  console.error(`  joi: ${joiMultiplier > 0 ? joiMultiplier.toFixed(0) + '×' : 'N/A'}`);

  // Calculate Y-axis scale
  const maxOpsRounded = Math.ceil(maxOps / 1e6) * 1e6; // Round up to nearest million
  const yAxisStep = maxOpsRounded / 3;

  // Generate SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <!-- Gradients for bars -->
    <linearGradient id="grad-tjs" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#34d399;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad-ajv" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#818cf8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad-zod" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad-joi" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f87171;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" />
    </linearGradient>
    <!-- Glow effects -->
    <filter id="glow-tjs" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="#0f172a"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.1">
    <line x1="100" y1="400" x2="750" y2="400" stroke="#94a3b8" stroke-width="1"/>
    <line x1="100" y1="300" x2="750" y2="300" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="100" y1="200" x2="750" y2="200" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="100" y1="100" x2="750" y2="100" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
  </g>

  <!-- Y-axis labels -->
  <text x="90" y="405" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="14">0</text>
  <text x="90" y="305" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="14">${formatOps(yAxisStep)}</text>
  <text x="90" y="205" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="14">${formatOps(yAxisStep * 2)}</text>
  <text x="90" y="105" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="14">${formatOps(yAxisStep * 3)}</text>

  <!-- Title -->
  <text x="400" y="45" text-anchor="middle" fill="#f1f5f9" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="bold">Validation Performance</text>
  <text x="400" y="75" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="16">Operations per second (higher is better)</text>

  <!-- Bars -->
  <!-- tjs: ${formatOps(tjsOps)} = ${tjsHeight}px height -->
  <rect x="140" y="${tjsY}" width="120" height="${tjsHeight}" rx="8" fill="url(#grad-tjs)" filter="url(#glow-tjs)"/>
  <text x="200" y="440" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">tjs</text>
  <text x="200" y="${tjsY - 15}" text-anchor="middle" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">${formatOps(tjsOps)}</text>

  <!-- ajv: ${formatOps(ajvOps)} = ${ajvHeight}px height -->
  <rect x="300" y="${ajvY}" width="120" height="${ajvHeight}" rx="8" fill="url(#grad-ajv)"/>
  <text x="360" y="440" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">ajv</text>
  <text x="360" y="${ajvY - 15}" text-anchor="middle" fill="#818cf8" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">${formatOps(ajvOps)}</text>

  <!-- zod: ${formatOps(zodOps)} = ${zodHeight}px height -->
  <rect x="460" y="${zodY}" width="120" height="${zodHeight}" rx="8" fill="url(#grad-zod)"/>
  <text x="520" y="440" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">zod</text>
  <text x="520" y="${zodY - 15}" text-anchor="middle" fill="#fbbf24" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">${formatOps(zodOps)}</text>

  <!-- joi: ${formatOps(joiOps)} = ${joiHeight}px height -->
  <rect x="620" y="${joiY}" width="120" height="${joiHeight}" rx="${Math.min(8, joiHeight / 2)}" fill="url(#grad-joi)"/>
  <text x="680" y="440" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">joi</text>
  <text x="680" y="${joiY - 15}" text-anchor="middle" fill="#f87171" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">${formatOps(joiOps)}</text>

  <!-- Multiplier badges -->
  <rect x="270" y="${Math.max(ajvY, tjsY) + 20}" width="60" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="300" y="${Math.max(ajvY, tjsY) + 39}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">${ajvMultiplier.toFixed(1)}×</text>

  <rect x="430" y="${Math.max(zodY - 30, 100)}" width="60" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="460" y="${Math.max(zodY - 30, 100) + 19}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">${zodMultiplier.toFixed(0)}×</text>

  <rect x="590" y="${Math.max(joiY - 30, 100)}" width="60" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="620" y="${Math.max(joiY - 30, 100) + 19}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">${joiMultiplier.toFixed(0)}×</text>
</svg>
`;

  // Write to file
  const svgPath = path.join(__dirname, '../assets/benchmark.svg');
  fs.writeFileSync(svgPath, svg);
  console.error(`\nUpdated ${svgPath}`);
}

main();
