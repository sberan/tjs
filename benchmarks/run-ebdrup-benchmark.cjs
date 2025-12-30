#!/usr/bin/env node
/**
 * Run the ebdrup/json-schema-benchmark with json-schema-ts included
 *
 * This script:
 * 1. Installs dependencies in the json-schema-benchmark submodule
 * 2. Patches validators.js to include our validator
 * 3. Runs the benchmark
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BENCHMARK_DIR = path.join(__dirname, '..', 'json-schema-benchmark');
const VALIDATORS_FILE = path.join(BENCHMARK_DIR, 'validators.js');

// Our validator adapter code to inject
// Uses the refs object already built by the benchmark
const OUR_VALIDATOR = `
   name: 'tjs',
    setup: function (schema) {
      const { schema: tjs } = require('../dist/index.js');
      return tjs(schema, { remotes: refs, formatAssertion: false, coerce: false });
    },
    test: function (instance, json, schema) {
      return instance(json);
    },`;

async function main() {
  console.log('=== ebdrup/json-schema-benchmark ===\n');

  // Check if submodule is initialized
  if (!fs.existsSync(path.join(BENCHMARK_DIR, 'package.json'))) {
    console.log('Initializing git submodule...');
    execSync('git submodule update --init --recursive', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });
  }

  // Check if our dist exists
  const distPath = path.join(__dirname, '..', 'dist', 'jit', 'compiler.js');
  if (!fs.existsSync(distPath)) {
    console.log('Building json-schema-ts...');
    execSync('npm run build', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  }

  // Install dependencies in benchmark dir if needed
  if (!fs.existsSync(path.join(BENCHMARK_DIR, 'node_modules'))) {
    console.log('Installing benchmark dependencies (this may take a while)...');
    execSync('npm install', { cwd: BENCHMARK_DIR, stdio: 'inherit' });
  }

  // Initialize the JSON-Schema-Test-Suite submodule within the benchmark
  const testSuiteDir = path.join(BENCHMARK_DIR, 'JSON-Schema-Test-Suite');
  if (!fs.existsSync(path.join(testSuiteDir, 'tests'))) {
    console.log('Initializing JSON-Schema-Test-Suite submodule...');
    execSync('git submodule update --init --recursive', { cwd: BENCHMARK_DIR, stdio: 'inherit' });
  }

  // Read and patch validators.js
  let validatorsContent = fs.readFileSync(VALIDATORS_FILE, 'utf8');

  // Check if already patched
  if (validatorsContent.includes('tjs')) {
    console.log('validators.js already patched with tjs');
  } else {
    console.log('Patching validators.js to include tjs...');

    // Find the validators array and insert our validator at the beginning
    // Look for the pattern "const validators = [" and insert after it
    const insertPoint = validatorsContent.indexOf('const validators = [');
    if (insertPoint === -1) {
      console.error('Could not find validators array in validators.js');
      process.exit(1);
    }

    const arrayStart = validatorsContent.indexOf('[', insertPoint);
    validatorsContent =
      validatorsContent.slice(0, arrayStart + 1) +
      OUR_VALIDATOR +
      validatorsContent.slice(arrayStart + 1);

    fs.writeFileSync(VALIDATORS_FILE, validatorsContent);
    console.log('Patched validators.js');
  }

  // Run the benchmark
  console.log('\nRunning benchmark...\n');

  // The benchmark uses --experimental-modules flag
  const benchProcess = spawn(
    'node',
    ['--experimental-modules', '--es-module-specifier-resolution=node', 'index.js'],
    {
      cwd: BENCHMARK_DIR,
      stdio: 'inherit',
      env: { ...process.env, NODE_OPTIONS: '' },
    }
  );

  benchProcess.on('close', (code) => {
    if (code === 0) {
      console.log('\n=== Benchmark complete ===');
      console.log(`Results saved to: ${BENCHMARK_DIR}/README.md`);
    } else {
      console.error(`Benchmark exited with code ${code}`);
    }
    process.exit(code);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
