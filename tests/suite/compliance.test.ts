import { describe, it, expect, beforeAll } from 'vitest';
import { loadTestFiles } from './loader.js';
import { formatReport } from './runner.js';
import { createValidator, type Validator } from '../../src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { JsonSchema } from '../../src/types.js';
import type { TestResult, ComplianceReport } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

// Keywords that are not yet implemented or have known issues
const UNIMPLEMENTED_KEYWORDS = [
  'unknownKeyword', // TODO: Meta-schema validation not implemented
];

// Optional test files that are skipped (these tests fail across all validators in json-schema-benchmark)
// See: json-schema-benchmark/draft7/reports/tjs.md "All validators fail this test"
const SKIPPED_OPTIONAL_FILES: string[] = [
  'float-overflow', // Optional overflow handling for large floats
  'zeroTerminatedFloats', // Language-specific numeric representation (1.0 vs 1)
  'format-assertion', // Meta-schema format-assertion keyword
];

// Specific test descriptions to skip (format validation edge cases)
// Currently empty - all format validations are now properly implemented
const SKIPPED_TEST_DESCRIPTIONS: string[] = [];

// Load remote schemas for the test suite
function loadRemoteSchemas(draft: Draft): Record<string, JsonSchema> {
  const remotes: Record<string, JsonSchema> = {};

  const loadDir = (dir: string, baseUrl: string, skipDrafts: boolean = true) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // Skip other draft directories when requested
      if (
        skipDrafts &&
        entry.isDirectory() &&
        (entry.name.startsWith('draft') || entry.name === 'draft2019-09')
      ) {
        continue;
      }
      if (entry.isDirectory()) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`, skipDrafts);
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const schema = JSON.parse(content) as JsonSchema;
          const urlPath = `${baseUrl}${entry.name}`;
          remotes[urlPath] = schema;
          if (typeof schema === 'object' && schema !== null && schema.$id) {
            remotes[schema.$id] = schema;
          }
          // Also register by id for older drafts
          if (typeof schema === 'object' && schema !== null && (schema as { id?: string }).id) {
            remotes[(schema as { id: string }).id] = schema;
          }
        } catch {
          // Skip invalid JSON files
        }
      }
    }
  };

  const remotesDir = path.join(__dirname, '../json-schema-test-suite/remotes');
  loadDir(remotesDir, 'http://localhost:1234/');

  // Load draft-specific remotes
  const draftRemotesDir = path.join(remotesDir, draft);
  if (fs.existsSync(draftRemotesDir)) {
    loadDir(draftRemotesDir, `http://localhost:1234/${draft}/`);
  }

  // For cross-draft tests, also load schemas from ALL draft directories
  // This allows draft7 schemas to reference draft2019-09 schemas, etc.
  const allDrafts: Draft[] = ['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'];
  for (const otherDraft of allDrafts) {
    if (otherDraft !== draft) {
      const otherDraftDir = path.join(remotesDir, otherDraft);
      if (fs.existsSync(otherDraftDir)) {
        loadDir(otherDraftDir, `http://localhost:1234/${otherDraft}/`, false);
      }
    }
  }

  return remotes;
}

// Fetch and cache remote schemas from the web
async function fetchRemoteSchemas(
  urls: string[],
  cache: Record<string, JsonSchema>
): Promise<void> {
  const fetchQueue = [...urls];
  const fetched = new Set(Object.keys(cache));

  // First, scan all cached schemas for external refs that need fetching
  for (const [schemaId, schema] of Object.entries(cache)) {
    if (typeof schema === 'object' && schema !== null) {
      findExternalRefs(schema, schemaId, fetchQueue, fetched);
    }
  }

  while (fetchQueue.length > 0) {
    const url = fetchQueue.shift()!;
    if (fetched.has(url)) continue;

    try {
      const response = await globalThis.fetch(url);
      if (!response.ok) {
        continue;
      }

      const schema = (await response.json()) as JsonSchema;
      const schemaId =
        typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : url;
      cache[schemaId] = schema;
      fetched.add(schemaId);
      fetched.add(url);

      // Find any $ref to external schemas and queue them
      if (typeof schema === 'object' && schema !== null) {
        findExternalRefs(schema, schemaId, fetchQueue, fetched);
      }
    } catch {
      // Skip failed fetches
    }
  }
}

function findExternalRefs(
  schema: JsonSchema,
  baseUri: string,
  queue: string[],
  fetched: Set<string>
): void {
  if (typeof schema !== 'object' || schema === null) return;

  // Check $ref
  if (schema.$ref && !schema.$ref.startsWith('#')) {
    const resolved = resolveUri(schema.$ref, baseUri);
    if (resolved.startsWith('http') && !fetched.has(resolved)) {
      queue.push(resolved);
    }
  }

  // Recurse into subschemas
  const subschemas = [
    ...(schema.$defs ? Object.values(schema.$defs) : []),
    ...(schema.properties ? Object.values(schema.properties) : []),
    ...(schema.prefixItems ?? []),
    ...(schema.anyOf ?? []),
    ...(schema.oneOf ?? []),
    ...(schema.allOf ?? []),
    schema.items,
    schema.additionalProperties,
    schema.not,
    schema.if,
    schema.then,
    schema.else,
    schema.contains,
  ];

  for (const sub of subschemas) {
    if (typeof sub === 'object' && sub !== null) {
      const subBaseUri = sub.$id ? resolveUri(sub.$id, baseUri) : baseUri;
      findExternalRefs(sub, subBaseUri, queue, fetched);
    }
  }
}

function resolveUri(ref: string, baseUri: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) return ref;
  if (!baseUri) return ref;
  const baseWithoutFragment = baseUri.split('#')[0];
  const lastSlash = baseWithoutFragment.lastIndexOf('/');
  if (lastSlash !== -1) return baseWithoutFragment.slice(0, lastSlash + 1) + ref;
  return ref;
}

// Test a single draft
function testDraft(draft: Draft, includeOptional: boolean = true) {
  describe(draft, () => {
    const files = loadTestFiles({ draft, includeOptional });
    const remotes = loadRemoteSchemas(draft);
    const legacyRef = draft !== 'draft2020-12' && draft !== 'draft2019-09';

    // Track results for report generation
    const allResults: TestResult[] = [];

    // Pre-fetch any missing remote schemas (e.g., metaschema dependencies)
    beforeAll(async () => {
      const metaSchemaUrls: Record<Draft, string[]> = {
        draft4: ['http://json-schema.org/draft-04/schema#'],
        draft6: ['http://json-schema.org/draft-06/schema#'],
        draft7: ['http://json-schema.org/draft-07/schema#'],
        'draft2019-09': ['https://json-schema.org/draft/2019-09/schema'],
        'draft2020-12': ['https://json-schema.org/draft/2020-12/schema'],
      };
      await fetchRemoteSchemas(metaSchemaUrls[draft] || [], remotes);
    }, 30000);

    // Generate individual test cases for each file/group/test
    for (const file of files) {
      const keyword = file.name;
      const isUnimplemented = UNIMPLEMENTED_KEYWORDS.includes(keyword);
      const isSkippedFile = SKIPPED_OPTIONAL_FILES.includes(keyword);
      const isFormatTest = file.isFormatTest ?? false;

      describe(keyword, () => {
        for (const group of file.groups) {
          describe(group.description, () => {
            let validator: Validator<unknown> | null = null;
            let schemaError: string | null = null;

            beforeAll(() => {
              if (isUnimplemented || isSkippedFile) return;

              try {
                // Content tests need contentAssertion enabled only for draft-07 and earlier
                // In draft2020-12 and 2019-09, content keywords are annotation-only
                const isContentTest =
                  keyword === 'content' &&
                  (draft === 'draft4' || draft === 'draft6' || draft === 'draft7');
                validator = createValidator(group.schema as JsonSchema, {
                  // Format tests need formatAssertion enabled to actually validate formats
                  // Non-format tests use formatAssertion: false per JSON Schema spec default
                  formatAssertion: isFormatTest,
                  // Content tests need contentAssertion enabled to validate content (draft-07 only)
                  contentAssertion: isContentTest,
                  remotes,
                  legacyRef,
                });
              } catch (err) {
                schemaError = `Schema construction failed: ${err}`;
              }
            });

            for (const test of group.tests) {
              const isSkippedTest = SKIPPED_TEST_DESCRIPTIONS.includes(test.description);
              const shouldSkip = isUnimplemented || isSkippedFile || isSkippedTest;
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

        const isUnimplemented = UNIMPLEMENTED_KEYWORDS.includes(keyword);
        const isSkippedFile = SKIPPED_OPTIONAL_FILES.includes(keyword);

        for (const group of file.groups) {
          for (const test of group.tests) {
            total++;
            const isSkippedTest = SKIPPED_TEST_DESCRIPTIONS.includes(test.description);
            const shouldSkip = isUnimplemented || isSkippedFile || isSkippedTest;

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
  testDraft('draft2020-12');
});
