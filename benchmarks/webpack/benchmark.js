import { execSync } from 'child_process';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { gzipSync } from 'zlib';

const DIST_DIR = './dist';

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getGzipSize(filePath) {
  const content = readFileSync(filePath);
  return gzipSync(content).length;
}

function runBenchmark() {
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║           TJS Webpack Bundle Size Benchmark                       ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
  console.log();

  // Build production bundles
  console.log('Building production bundles...');
  console.log();

  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }

  console.log();
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('                         BUNDLE SIZES');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log();

  const files = readdirSync(DIST_DIR)
    .filter(f => f.endsWith('.bundle.js'))
    .sort();

  const results = [];

  console.log('┌─────────────────┬────────────────┬────────────────┐');
  console.log('│ Entry           │ Raw Size       │ Gzipped        │');
  console.log('├─────────────────┼────────────────┼────────────────┤');

  for (const file of files) {
    const filePath = join(DIST_DIR, file);
    const stats = statSync(filePath);
    const rawSize = stats.size;
    const gzipSize = getGzipSize(filePath);
    const name = file.replace('.bundle.js', '');

    results.push({ name, rawSize, gzipSize });

    console.log(
      `│ ${name.padEnd(15)} │ ${formatBytes(rawSize).padStart(14)} │ ${formatBytes(gzipSize).padStart(14)} │`
    );
  }

  console.log('└─────────────────┴────────────────┴────────────────┘');
  console.log();

  // Separate runtime and precompiled
  const runtimeBundles = results.filter(r => r.name !== 'precompiled');
  const precompiledBundle = results.find(r => r.name === 'precompiled');

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('                           SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log();

  if (runtimeBundles.length > 0) {
    const minRuntime = runtimeBundles.reduce((a, b) => a.gzipSize < b.gzipSize ? a : b);
    const maxRuntime = runtimeBundles.reduce((a, b) => a.gzipSize > b.gzipSize ? a : b);
    console.log('  RUNTIME COMPILATION (includes tjs compiler):');
    console.log(`    Min: ${formatBytes(minRuntime.gzipSize)} (${minRuntime.name})`);
    console.log(`    Max: ${formatBytes(maxRuntime.gzipSize)} (${maxRuntime.name})`);
    console.log();
  }

  if (precompiledBundle) {
    console.log('  BUILD-TIME COMPILATION (no compiler):');
    console.log(`    Size: ${formatBytes(precompiledBundle.gzipSize)} (${precompiledBundle.name})`);
    console.log();

    if (runtimeBundles.length > 0) {
      const avgRuntime = runtimeBundles.reduce((s, r) => s + r.gzipSize, 0) / runtimeBundles.length;
      const savings = ((avgRuntime - precompiledBundle.gzipSize) / avgRuntime * 100).toFixed(1);
      console.log(`  SAVINGS: ${savings}% smaller than runtime compilation!`);
      console.log();
    }
  }

  // Analysis
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('                          ANALYSIS');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log();
  console.log('  Runtime compilation (includes ~87KB compiler):');
  console.log('  ───────────────────────────────────────────────');
  console.log('  • minimal  - Simple string schema');
  console.log('  • medium   - Object with format validation');
  console.log('  • complex  - Nested objects, $refs, conditionals');
  console.log('  • full     - All exports including meta-schemas');
  console.log();
  console.log('  Build-time compilation (no compiler needed):');
  console.log('  ────────────────────────────────────────────');
  console.log('  • precompiled - Pre-generated validator, only ~3-5KB');
  console.log();
  console.log('  Use `tjs compile schema.json -o validator.js` to generate');
  console.log('  standalone validators at build time.');
  console.log();

  // Return results for programmatic use
  return results;
}

runBenchmark();
