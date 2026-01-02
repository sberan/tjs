import { describe, it, expect, beforeAll } from 'vitest';
import { loadTestFiles } from './loader.js';
import { formatReport } from './runner.js';
import { createValidatorAsync, type Validator } from '../../src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { JsonSchema } from '../../src/types.js';
import type { TestResult, ComplianceReport } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

// Optional test files that are skipped (these tests fail across all validators in json-schema-benchmark)
// See: json-schema-benchmark/draft7/reports/tjs.md "All validators fail this test"
const SKIPPED_OPTIONAL_FILES: string[] = [
  'zeroTerminatedFloats', // Language-specific numeric representation (1.0 vs 1)
];

// Keywords that are not implemented
const SKIPPED_KEYWORDS: string[] = [
  // unevaluatedItems is now implemented
];

// Specific test descriptions to skip
const SKIPPED_TEST_DESCRIPTIONS: string[] = [
  // All tests now pass!
];

// Remotes directory for the test suite
const REMOTES_DIR = path.join(__dirname, '../json-schema-test-suite/remotes');

/**
 * Create a custom fetch function that serves schemas from local files.
 * Maps URLs like http://localhost:1234/foo.json to local files.
 */
function createLocalFetch(): typeof fetch {
  return async (input: RequestInfo | URL): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();

    // Map localhost URLs to local files (both http and https)
    const localhostPrefix = url.startsWith('http://localhost:1234/')
      ? 'http://localhost:1234/'
      : url.startsWith('https://localhost:1234/')
        ? 'https://localhost:1234/'
        : null;

    if (localhostPrefix) {
      const filePath = path.join(REMOTES_DIR, url.slice(localhostPrefix.length));
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return new Response(content, {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch {
        return new Response('Not found', { status: 404 });
      }
    }

    // For real URLs (meta-schemas), use global fetch
    return globalThis.fetch(url);
  };
}

/**
 * Load all remote schemas for a draft by scanning the remotes directory.
 * Uses the built-in schema loading with a custom fetch for local files.
 */
function loadRemoteSchemas(draft: Draft): Record<string, JsonSchema> {
  const remotes: Record<string, JsonSchema> = {};

  const loadDir = (dir: string, baseUrl: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const schema = JSON.parse(content) as JsonSchema;
          const urlPath = `${baseUrl}${entry.name}`;
          remotes[urlPath] = schema;
          // Also register by $id and id
          if (typeof schema === 'object' && schema !== null) {
            if (schema.$id) remotes[schema.$id] = schema;
            if ((schema as { id?: string }).id) {
              remotes[(schema as { id: string }).id] = schema;
            }
          }
        } catch {
          // Skip invalid JSON files
        }
      }
    }
  };

  // Load base remotes (skip draft subdirectories)
  for (const entry of fs.readdirSync(REMOTES_DIR, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith('draft')) {
      loadDir(path.join(REMOTES_DIR, entry.name), `http://localhost:1234/${entry.name}/`);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      try {
        const content = fs.readFileSync(path.join(REMOTES_DIR, entry.name), 'utf-8');
        const schema = JSON.parse(content) as JsonSchema;
        remotes[`http://localhost:1234/${entry.name}`] = schema;
        if (typeof schema === 'object' && schema !== null) {
          if (schema.$id) remotes[schema.$id] = schema;
          if ((schema as { id?: string }).id) {
            remotes[(schema as { id: string }).id] = schema;
          }
        }
      } catch {
        // Skip invalid files
      }
    }
  }

  // Load draft-specific remotes
  const draftRemotesDir = path.join(REMOTES_DIR, draft);
  if (fs.existsSync(draftRemotesDir)) {
    loadDir(draftRemotesDir, `http://localhost:1234/${draft}/`);
  }

  // For cross-draft tests, load schemas from ALL draft directories
  const allDrafts: Draft[] = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  for (const otherDraft of allDrafts) {
    if (otherDraft !== draft) {
      const otherDraftDir = path.join(REMOTES_DIR, otherDraft);
      if (fs.existsSync(otherDraftDir)) {
        loadDir(otherDraftDir, `http://localhost:1234/${otherDraft}/`);
      }
    }
  }

  return remotes;
}

// Test a single draft
function testDraft(draft: Draft, includeOptional: boolean = true) {
  describe(draft, () => {
    const files = loadTestFiles({ draft, includeOptional });
    const remotes = loadRemoteSchemas(draft);
    const localFetch = createLocalFetch();

    // Track results for report generation
    const allResults: TestResult[] = [];

    // Generate individual test cases for each file/group/test
    for (const file of files) {
      const keyword = file.name;
      const isSkippedKeyword = SKIPPED_KEYWORDS.includes(keyword);
      const isSkippedFile = SKIPPED_OPTIONAL_FILES.includes(keyword) || isSkippedKeyword;
      // Optional format tests specifically test format validation (not annotation-only)
      const isFormatTest = file.isFormatTest === true;

      describe(keyword, () => {
        for (const group of file.groups) {
          describe(group.description, () => {
            let validator: Validator<unknown> | null = null;
            let schemaError: string | null = null;

            beforeAll(async () => {
              if (isSkippedFile) return;

              try {
                // Use createValidatorAsync with local fetch to auto-resolve remote refs
                // Enable formatAssertion for optional format tests (they test format validation)
                validator = await createValidatorAsync(group.schema as JsonSchema, {
                  defaultMeta: draft,
                  remotes,
                  fetch: localFetch,
                  silent: true,
                  ...(isFormatTest && { formatAssertion: true }),
                });
              } catch (err) {
                schemaError = `Schema construction failed: ${err}`;
              }
            });

            for (const test of group.tests) {
              const isSkippedTest = SKIPPED_TEST_DESCRIPTIONS.includes(test.description);
              const shouldSkip = isSkippedFile || isSkippedTest;
              const testFn = shouldSkip ? it.skip : it;

              testFn(test.description, () => {
                const result: TestResult = {
                  file: file.name,
                  group: group.description,
                  test: test.description,
                  expected: test.valid,
                  actual: false,
                  passed: false,
                };

                if (schemaError) {
                  result.error = schemaError;
                  allResults.push(result);
                  expect.fail(schemaError);
                  return;
                }

                if (!validator) {
                  result.error = 'Validator not initialized';
                  allResults.push(result);
                  expect.fail('Validator not initialized');
                  return;
                }

                let actual: boolean;
                try {
                  const validateResult = validator.validate(test.data);
                  actual = validateResult.error === undefined;
                } catch (err) {
                  result.error = `Validation threw: ${err}`;
                  allResults.push(result);
                  expect.fail(`Validation threw: ${err}`);
                  return;
                }

                result.actual = actual;
                result.passed = actual === test.valid;

                if (!result.passed) {
                  allResults.push(result);
                }

                expect(
                  actual,
                  `Expected ${test.valid ? 'valid' : 'invalid'}, got ${actual ? 'valid' : 'invalid'}`
                ).toBe(test.valid);
              });
            }
          });
        }
      });
    }

    // Generate report after all tests complete
    it.concurrent(`generates ${draft} compliance report`, async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      let total = 0;
      let passed = 0;
      let failed = 0;
      let skipped = 0;
      const byKeyword: Record<string, { passed: number; failed: number; skipped: number }> = {};

      for (const file of files) {
        const keyword = file.name;
        if (!byKeyword[keyword]) {
          byKeyword[keyword] = { passed: 0, failed: 0, skipped: 0 };
        }

        const isSkippedKeyword = SKIPPED_KEYWORDS.includes(keyword);
        const isSkippedFile = SKIPPED_OPTIONAL_FILES.includes(keyword) || isSkippedKeyword;

        for (const group of file.groups) {
          for (const test of group.tests) {
            total++;
            const isSkippedTest = SKIPPED_TEST_DESCRIPTIONS.includes(test.description);
            const shouldSkip = isSkippedFile || isSkippedTest;

            if (shouldSkip) {
              skipped++;
              byKeyword[keyword].skipped++;
            } else {
              const failure = allResults.find(
                (r) =>
                  r.file === file.name &&
                  r.group === group.description &&
                  r.test === test.description
              );
              if (failure) {
                failed++;
                byKeyword[keyword].failed++;
              } else {
                passed++;
                byKeyword[keyword].passed++;
              }
            }
          }
        }
      }

      const report: ComplianceReport = {
        total,
        passed,
        failed,
        skipped,
        byKeyword,
        failures: allResults,
      };

      console.log(
        `\n${draft}: ${report.passed}/${report.total} (${((report.passed / report.total) * 100).toFixed(1)}%)`
      );

      // Only write report for draft2020-12
      if (draft === 'draft2020-12') {
        const reportPath = path.join(__dirname, '../../COMPLIANCE.md');
        fs.writeFileSync(reportPath, formatReport(report));
      }
    });
  });
}

describe('JSON Schema Test Suite Compliance', () => {
  // Test each draft in isolation
  testDraft('draft4');
  testDraft('draft6');
  testDraft('draft7');
  testDraft('draft2019-09');
  testDraft('draft2020-12');
});
