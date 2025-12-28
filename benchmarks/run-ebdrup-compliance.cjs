#!/usr/bin/env node
/**
 * Quick compliance test against ebdrup/json-schema-benchmark test suite
 *
 * This runs ONLY the compliance tests (not the full benchmark) for faster feedback.
 * Use this during development, and run the full bench:ebdrup for final results.
 */

const fs = require('fs');
const path = require('path');

const BENCHMARK_DIR = path.join(__dirname, '..', 'json-schema-benchmark');
const TEST_SUITE_DIR = path.join(BENCHMARK_DIR, 'JSON-Schema-Test-Suite', 'tests');
const REMOTES_DIR = path.join(BENCHMARK_DIR, 'JSON-Schema-Test-Suite', 'remotes');

// Load remote schemas from the test suite
function loadRemoteSchemas() {
  const remotes = {};

  function loadDir(dir, baseUrl) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const schema = JSON.parse(content);
          const urlPath = `${baseUrl}${entry.name}`;
          remotes[urlPath] = schema;
          // Also register by $id if present
          if (schema.$id) {
            remotes[schema.$id] = schema;
          }
          if (schema.id) {
            remotes[schema.id] = schema;
          }
        } catch {
          // Skip invalid JSON files
        }
      }
    }
  }

  loadDir(REMOTES_DIR, 'http://localhost:1234/');
  return remotes;
}

// Load our validator
function loadValidator(remotes) {
  const { compile } = require('../dist/jit/compiler.js');
  return {
    name: 'json-schema-ts',
    compile: (schema) => compile(schema, { remotes }),
    validate: (validator, data) => validator(data),
  };
}

// Read all test files for a draft version
function readTestSuite(draftVersion) {
  const testsDir = path.join(TEST_SUITE_DIR, draftVersion);
  if (!fs.existsSync(testsDir)) {
    console.error(`Test suite not found: ${testsDir}`);
    console.error('Run "npm run bench:ebdrup" first to initialize the submodule.');
    process.exit(1);
  }

  const testFiles = fs.readdirSync(testsDir).filter(f => f.endsWith('.json'));
  const allTests = [];

  for (const file of testFiles) {
    const content = JSON.parse(fs.readFileSync(path.join(testsDir, file), 'utf8'));
    for (const group of content) {
      for (const test of group.tests) {
        allTests.push({
          file: file.replace('.json', ''),
          group: group.description,
          description: test.description,
          schema: group.schema,
          data: test.data,
          valid: test.valid,
        });
      }
    }
  }

  return allTests;
}

// Run tests and report results
function runTests(draftVersion, validator) {
  const tests = readTestSuite(draftVersion);
  const results = { passed: 0, failed: 0, failures: [] };

  for (const test of tests) {
    try {
      const compiled = validator.compile(test.schema);
      const result = validator.validate(compiled, test.data);

      if (result === test.valid) {
        results.passed++;
      } else {
        results.failed++;
        results.failures.push({
          file: test.file,
          group: test.group,
          test: test.description,
          expected: test.valid,
          got: result,
        });
      }
    } catch (err) {
      results.failed++;
      results.failures.push({
        file: test.file,
        group: test.group,
        test: test.description,
        expected: test.valid,
        error: err.message,
      });
    }
  }

  return results;
}

function main() {
  const args = process.argv.slice(2);
  const showFailures = args.includes('--failures') || args.includes('-f');
  const draftVersions = ['draft7', 'draft6', 'draft4'].filter(d =>
    !args.some(a => a.startsWith('--draft')) || args.includes(`--${d}`)
  );

  // Check if test suite exists
  if (!fs.existsSync(TEST_SUITE_DIR)) {
    console.error('JSON-Schema-Test-Suite not found.');
    console.error('Run "npm run bench:ebdrup" first to initialize the submodule.');
    process.exit(1);
  }

  console.log('=== ebdrup compliance test (quick) ===\n');

  // Load remote schemas
  const remotes = loadRemoteSchemas();
  const validator = loadValidator(remotes);
  let totalPassed = 0;
  let totalFailed = 0;

  for (const draft of draftVersions) {
    const results = runTests(draft, validator);
    totalPassed += results.passed;
    totalFailed += results.failed;

    const total = results.passed + results.failed;
    const pct = ((results.passed / total) * 100).toFixed(1);

    console.log(`${draft}: ${results.passed}/${total} (${pct}%) - ${results.failed} failures`);

    if (showFailures && results.failures.length > 0) {
      console.log('\nFailures:');
      for (const f of results.failures.slice(0, 20)) {
        if (f.error) {
          console.log(`  [${f.file}] ${f.group}, ${f.test}: ERROR - ${f.error}`);
        } else {
          console.log(`  [${f.file}] ${f.group}, ${f.test}: expected ${f.expected}, got ${f.got}`);
        }
      }
      if (results.failures.length > 20) {
        console.log(`  ... and ${results.failures.length - 20} more`);
      }
      console.log('');
    }
  }

  console.log(`\nTotal: ${totalPassed}/${totalPassed + totalFailed} (${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%)`);
}

main();
