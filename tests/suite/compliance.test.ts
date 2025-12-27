import { describe, it, expect, beforeAll } from 'vitest';
import { loadTestFiles } from './loader.js';
import { runTestSuite, formatReport } from './runner.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { JsonSchema } from '../../src/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load remote schemas for the test suite
function loadRemoteSchemas(): Record<string, JsonSchema> {
  const remotes: Record<string, JsonSchema> = {};
  const remotesDir = path.join(__dirname, '../../test-suite/remotes/draft2020-12');

  if (fs.existsSync(remotesDir)) {
    const loadDir = (dir: string, baseUrl: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          loadDir(fullPath, `${baseUrl}${entry.name}/`);
        } else if (entry.name.endsWith('.json')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const schema = JSON.parse(content) as JsonSchema;
            // Use the schema's $id if present, otherwise construct URL
            const schemaId =
              typeof schema === 'object' && schema !== null && schema.$id
                ? schema.$id
                : `${baseUrl}${entry.name}`;
            remotes[schemaId] = schema;
          } catch {
            // Skip invalid JSON files
          }
        }
      }
    };
    loadDir(remotesDir, 'http://localhost:1234/draft2020-12/');
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

describe('JSON Schema Test Suite Compliance', () => {
  const files = loadTestFiles({ includeOptional: false });
  const remotes = loadRemoteSchemas();

  // Pre-fetch any missing remote schemas (e.g., metaschema dependencies)
  beforeAll(async () => {
    await fetchRemoteSchemas([], remotes);
  }, 30000); // 30 second timeout for network requests

  it('runs all required tests and generates report', () => {
    const failures: string[] = [];

    const report = runTestSuite(files, {
      skipUnimplemented: true,
      remotes,
      onResult: (result) => {
        if (!result.passed) {
          failures.push(`FAIL: ${result.file}/${result.group}/${result.test}`);
        }
      },
    });

    // Write report to file
    const reportPath = path.join(__dirname, '../../COMPLIANCE.md');
    fs.writeFileSync(reportPath, formatReport(report));

    // Log summary
    console.log(
      `\nCompliance: ${report.passed}/${report.total} (${((report.passed / report.total) * 100).toFixed(1)}%)`
    );
    console.log(`Skipped: ${report.skipped}`);
    console.log(`Failed: ${report.failed}`);

    // Log first 10 failures for debugging
    if (failures.length > 0) {
      console.log('\nFirst 10 failures:');
      for (const f of failures.slice(0, 10)) {
        console.log(`  ${f}`);
      }
    }

    // Verify we ran tests
    expect(report.total).toBeGreaterThan(0);

    // Assert high compliance rate (adjust as implementation improves)
    const passRate = report.passed / (report.total - report.skipped);
    expect(passRate).toBeGreaterThan(0.8); // Expect at least 80% pass rate
  });
});
