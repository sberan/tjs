import { describe, it, expect, beforeAll } from 'vitest';
import { loadTestFiles } from './loader.js';
import { formatReport } from './runner.js';
import { Validator, type ValidatorJIT } from '../../src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { JsonSchema } from '../../src/types.js';
import type { TestResult, ComplianceReport } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Keywords that are not yet implemented or have known issues
const UNIMPLEMENTED_KEYWORDS = [
  'unknownKeyword', // Meta-schema validation not implemented
];

// Load remote schemas for the test suite
function loadRemoteSchemas(): Record<string, JsonSchema> {
  const remotes: Record<string, JsonSchema> = {};

  const loadDir = (dir: string, baseUrl: string) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // Skip other draft directories (we only support draft2020-12)
      if (
        entry.isDirectory() &&
        (entry.name.startsWith('draft') || entry.name === 'draft2019-09')
      ) {
        continue;
      }
      if (entry.isDirectory()) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const schema = JSON.parse(content) as JsonSchema;
          // Always register by URL path
          const urlPath = `${baseUrl}${entry.name}`;
          remotes[urlPath] = schema;
          // Also register by $id if present
          if (typeof schema === 'object' && schema !== null && schema.$id) {
            remotes[schema.$id] = schema;
          }
        } catch {
          // Skip invalid JSON files
        }
      }
    }
  };

  // Load from root remotes directory
  const remotesDir = path.join(__dirname, '../../test-suite/remotes');
  loadDir(remotesDir, 'http://localhost:1234/');

  // Also load from draft2020-12 subdirectory with that base URL
  const draft2020Dir = path.join(remotesDir, 'draft2020-12');
  loadDir(draft2020Dir, 'http://localhost:1234/draft2020-12/');

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
  // TODO this is insane - find a better way to do this
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

describe('JSON Schema Test Suite Compliance', () => {
  const files = loadTestFiles({ includeOptional: false });
  const remotes = loadRemoteSchemas();

  // Track results for report generation
  const allResults: TestResult[] = [];

  // Pre-fetch any missing remote schemas (e.g., metaschema dependencies)
  beforeAll(async () => {
    // Explicitly fetch the draft 2020-12 metaschema which some tests reference
    await fetchRemoteSchemas(['https://json-schema.org/draft/2020-12/schema'], remotes);
  }, 30000); // 30 second timeout for network requests

  // Generate individual test cases for each file/group/test
  for (const file of files) {
    const keyword = file.name;
    const isUnimplemented = UNIMPLEMENTED_KEYWORDS.includes(keyword);

    describe(keyword, () => {
      for (const group of file.groups) {
        describe(group.description, () => {
          // Create validator once per group (shared across tests in the group)
          let validator: ValidatorJIT<unknown> | null = null;
          let schemaError: string | null = null;

          // Try to create the validator before running tests
          beforeAll(() => {
            if (isUnimplemented) return;

            try {
              validator = Validator(group.schema as JsonSchema, {
                formatAssertion: false,
                remotes,
                legacyRef: false, // draft-2020-12: $ref no longer overrides sibling keywords
              });
            } catch (err) {
              schemaError = `Schema construction failed: ${err}`;
            }
          });

          for (const test of group.tests) {
            const testFn = isUnimplemented ? it.skip : it;

            testFn(test.description, () => {
              const result: TestResult = {
                file: file.name,
                group: group.description,
                test: test.description,
                expected: test.valid,
                actual: false,
                passed: false,
              };

              // Handle schema construction failure
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
                actual = validator.validate(test.data);
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
  it.concurrent('generates compliance report', async () => {
    // Wait a tick to ensure all other tests have run
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Count results from Vitest's perspective
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

      for (const group of file.groups) {
        for (const test of group.tests) {
          total++;
          if (isUnimplemented) {
            skipped++;
            byKeyword[keyword].skipped++;
          } else {
            // Check if this test failed
            const failure = allResults.find(
              (r) =>
                r.file === file.name && r.group === group.description && r.test === test.description
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

    // Write report to file
    const reportPath = path.join(__dirname, '../../COMPLIANCE.md');
    fs.writeFileSync(reportPath, formatReport(report));

    // Log summary
    console.log(
      `\nCompliance: ${report.passed}/${report.total} (${((report.passed / report.total) * 100).toFixed(1)}%)`
    );
  });
});
