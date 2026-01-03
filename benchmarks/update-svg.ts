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

  // Calculate max ops for scaling
  const maxOps = Math.max(tjsOps, ajvOps, zodOps, joiOps);

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

  // Define validator styles
  const validatorStyles: Record<
    string,
    {
      gradient: string;
      gradientStart: string;
      gradientEnd: string;
      labelColor: string;
      glow?: boolean;
    }
  > = {
    tjs: {
      gradient: 'grad-tjs',
      gradientStart: '#34d399',
      gradientEnd: '#10b981',
      labelColor: '#34d399',
      glow: true,
    },
    ajv: {
      gradient: 'grad-ajv',
      gradientStart: '#818cf8',
      gradientEnd: '#6366f1',
      labelColor: '#818cf8',
    },
    zod: {
      gradient: 'grad-zod',
      gradientStart: '#fbbf24',
      gradientEnd: '#f59e0b',
      labelColor: '#fbbf24',
    },
    joi: {
      gradient: 'grad-joi',
      gradientStart: '#f87171',
      gradientEnd: '#ef4444',
      labelColor: '#f87171',
    },
  };

  // Create sorted array of validators by ops/sec (fastest first)
  const validators = [
    { name: 'tjs', ops: tjsOps },
    { name: 'ajv', ops: ajvOps },
    { name: 'zod', ops: zodOps },
    { name: 'joi', ops: joiOps },
  ]
    .filter((v) => v.ops > 0)
    .sort((a, b) => b.ops - a.ops);

  console.error(`\nSorted order (fastest to slowest): ${validators.map((v) => v.name).join(', ')}`);

  // Calculate bar positions and heights
  const barWidth = 120;
  const barSpacing = 160;
  const startX = 140;
  const baseY = 400;
  const maxHeight = 300;

  const barsData = validators.map((v, i) => {
    const height = Math.max(8, Math.round((v.ops / maxOps) * maxHeight));
    const x = startX + i * barSpacing;
    const y = baseY - height;
    const style = validatorStyles[v.name];
    const multiplier = v.name === 'tjs' ? null : tjsOps / v.ops;
    return { ...v, height, x, y, style, multiplier };
  });

  // Generate gradient definitions
  const gradientDefs = validators
    .map((v) => {
      const style = validatorStyles[v.name];
      return `    <linearGradient id="${style.gradient}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${style.gradientStart};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${style.gradientEnd};stop-opacity:1" />
    </linearGradient>`;
    })
    .join('\n');

  // Generate bars SVG
  const barsSvg = barsData
    .map((bar) => {
      const filter = bar.style.glow ? ' filter="url(#glow-tjs)"' : '';
      const rx = Math.min(8, bar.height / 2);
      return `  <!-- ${bar.name}: ${formatOps(bar.ops)} = ${bar.height}px height -->
  <rect x="${bar.x}" y="${bar.y}" width="${barWidth}" height="${bar.height}" rx="${rx}" fill="url(#${bar.style.gradient})"${filter}/>
  <text x="${bar.x + barWidth / 2}" y="440" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">${bar.name}</text>
  <text x="${bar.x + barWidth / 2}" y="${bar.y - 15}" text-anchor="middle" fill="${bar.style.labelColor}" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold">${formatOps(bar.ops)}</text>`;
    })
    .join('\n\n');

  // Generate multiplier badges (show between adjacent bars, comparing to tjs)
  const multiplierBadges = barsData
    .slice(1)
    .map((bar, i) => {
      if (!bar.multiplier) return '';
      const prevBar = barsData[i];
      const badgeX = (prevBar.x + barWidth + bar.x) / 2 - 30;
      const badgeY = Math.max(Math.max(prevBar.y, bar.y) - 30, 100);
      const multiplierText =
        bar.multiplier >= 10 ? `${bar.multiplier.toFixed(0)}×` : `${bar.multiplier.toFixed(1)}×`;
      return `  <rect x="${badgeX}" y="${badgeY}" width="60" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="${badgeX + 30}" y="${badgeY + 19}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">${multiplierText}</text>`;
    })
    .filter((s) => s)
    .join('\n\n');

  // Generate SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <!-- Gradients for bars -->
${gradientDefs}
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
${barsSvg}

  <!-- Multiplier badges -->
${multiplierBadges}
</svg>
`;

  // Write to file
  const svgPath = path.join(__dirname, '../assets/benchmark.svg');
  fs.writeFileSync(svgPath, svg);
  console.error(`\nUpdated ${svgPath}`);
}

main();
