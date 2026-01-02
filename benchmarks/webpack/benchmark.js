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

  // Summary statistics
  const minBundle = results.reduce((a, b) => a.gzipSize < b.gzipSize ? a : b);
  const maxBundle = results.reduce((a, b) => a.gzipSize > b.gzipSize ? a : b);

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('                           SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log();
  console.log(`  Minimum bundle size (gzipped): ${formatBytes(minBundle.gzipSize)} (${minBundle.name})`);
  console.log(`  Maximum bundle size (gzipped): ${formatBytes(maxBundle.gzipSize)} (${maxBundle.name})`);
  console.log();

  // Analysis
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('                          ANALYSIS');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log();
  console.log('  Bundle breakdown:');
  console.log('  ─────────────────');
  console.log('  • minimal  - Simple string schema (baseline)');
  console.log('  • medium   - Object with format validation');
  console.log('  • complex  - Nested objects, $refs, conditionals');
  console.log('  • full     - All exports including meta-schemas');
  console.log();
  console.log('  Note: All bundles include the TJS compiler since schema');
  console.log('  compilation happens at runtime. For pre-compiled schemas,');
  console.log('  consider using a build-time compilation approach.');
  console.log();

  // Return results for programmatic use
  return results;
}

runBenchmark();
