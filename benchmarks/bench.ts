/**
 * Benchmark a single JSON Schema validator using mitata's measure() API.
 *
 * Benchmarks at the FILE level (e.g., ref.json, allOf.json) for meaningful
 * keyword-level insights with minimal overhead.
 *
 * METHODOLOGY:
 *   All validators are configured to report the first validation error (not all errors).
 *   This ensures a fair comparison since tjs always provides detailed error objects.
 *   For schemasafe, this means enabling { includeErrors: true }.
 *
 * Usage:
 *   npm run bench [drafts...] [--filter <regex>] [--validator <name>] [--json <file>]
 *
 * Supported validators:
 *   tjs           - This library (default)
 *   ajv           - The fastest JSON Schema validator
 *   zod           - TypeScript-first schema validation
 *   joi           - Object schema validation (via enjoi)
 *   jsonschema    - Simple and lightweight validator
 *   is-my-json-valid - Code-generation based fast validator
 *   z-schema      - JSON Schema validator with async support
 *   djv           - Dynamic JSON Schema Validator
 *   jsen          - JSON Sentinel, built for speed
 *   schemasafe    - Safe JSON Schema validator with code generation (with error reporting)
 *
 * Examples:
 *   npm run bench                            # Benchmark tjs (default)
 *   npm run bench -v ajv                     # Benchmark ajv
 *   npm run bench -v zod                     # Benchmark zod
 *   npm run bench draft7 --filter ref        # Only ref-related files
 *   npm run bench --filter "format|pattern"  # format or pattern files
 *   npm run bench draft2019-09               # Single draft
 *   npm run bench --compliance-only          # Only check compliance, skip benchmark
 *   npm run bench --json benchmark.json      # Write JSON results to file
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { measure } from 'mitata';
import Ajv from 'ajv';
import Ajv2019 from 'ajv/dist/2019.js';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
// @ts-ignore - no types available
import addFormats2019 from 'ajv-formats-draft2019';
import { z } from 'zod';
// @ts-ignore - no types available
import enjoi from 'enjoi';
// @ts-ignore - no types available
import { Validator as JsonSchemaValidator } from 'jsonschema';
// @ts-ignore - no types available
import isMyJsonValid from 'is-my-json-valid';
// @ts-ignore - no types available
import ZSchema from 'z-schema';
// @ts-ignore - no types available
import djv from 'djv';
// @ts-ignore - no types available
import jsen from 'jsen';
// @ts-ignore - no types available
import { validator as schemasafe } from '@exodus/schemasafe';
import { createValidator } from '../src/core/index.js';
import type { JsonSchema } from '../src/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

interface TestCase {
  data: unknown;
  valid: boolean;
  description: string;
}

interface TestGroup {
  description: string;
  schema: unknown;
  tests: TestCase[];
}

type ValidatorName =
  | 'tjs'
  | 'ajv'
  | 'zod'
  | 'joi'
  | 'jsonschema'
  | 'is-my-json-valid'
  | 'z-schema'
  | 'djv'
  | 'jsen'
  | 'schemasafe';

interface CompiledTest {
  validator: (data: unknown) => boolean;
  data: unknown;
  valid: boolean;
}

interface ErrorMismatch {
  description: string;
  expected: 'error' | 'no-error';
  actual: 'error' | 'no-error';
}

interface GroupResult {
  groupDesc: string;
  passed: boolean;
  passCount: number;
  failCount: number;
  nsPerTest: number;
  testCount: number;
  errorMismatches?: ErrorMismatch[];
}

interface FileResult {
  draft: string;
  file: string;
  groups: GroupResult[];
  totalPass: number;
  totalFail: number;
}

// ANSI colors
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function loadRemoteSchemas(): Record<string, unknown> {
  const remotes: Record<string, unknown> = {};
  const remotesDir = path.join(__dirname, '../tests/json-schema-test-suite/remotes');

  const loadDir = (dir: string, baseUrl: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('draft')) {
        loadDir(fullPath, `${baseUrl}${entry.name}/`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const schema = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
          remotes[`${baseUrl}${entry.name}`] = schema;
          if (schema?.$id) remotes[schema.$id] = schema;
          if (schema?.id) remotes[schema.id] = schema;
        } catch {}
      }
    }
  };

  loadDir(remotesDir, 'http://localhost:1234/');

  for (const entry of fs.readdirSync(remotesDir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith('draft')) {
      loadDir(path.join(remotesDir, entry.name), `http://localhost:1234/${entry.name}/`);
    }
  }

  const metaSchemas: Record<string, string> = {
    'http://json-schema.org/draft-04/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-04.json'
    ),
    'http://json-schema.org/draft-06/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-06.json'
    ),
    'http://json-schema.org/draft-07/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-07.json'
    ),
    'https://json-schema.org/draft/2019-09/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/core': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/core.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/applicator': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/applicator.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/validation': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/validation.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/meta-data': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/meta-data.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/format': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/format.json'
    ),
    'https://json-schema.org/draft/2019-09/meta/content': path.join(
      __dirname,
      '../src/meta-schemas/draft-2019-09/content.json'
    ),
    'https://json-schema.org/draft/2020-12/schema': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/core': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/core.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/applicator': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/applicator.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/validation': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/validation.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/meta-data': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/meta-data.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/format-annotation': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/format-annotation.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/content': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/content.json'
    ),
    'https://json-schema.org/draft/2020-12/meta/unevaluated': path.join(
      __dirname,
      '../src/meta-schemas/draft-2020-12/unevaluated.json'
    ),
  };

  for (const [uri, filePath] of Object.entries(metaSchemas)) {
    if (fs.existsSync(filePath)) {
      try {
        remotes[uri] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch {}
    }
  }

  return remotes;
}

function createAjv(draft: Draft, remotes: Record<string, unknown>, formatAssertion: boolean): Ajv {
  const opts = {
    allErrors: false,
    logger: false as const,
    validateFormats: formatAssertion,
    strict: false,
  };
  let ajv: Ajv;
  if (draft === 'draft2020-12') ajv = new Ajv2020(opts);
  else if (draft === 'draft2019-09') ajv = new Ajv2019(opts);
  else ajv = new Ajv(opts);
  addFormats(ajv);
  if (draft === 'draft2019-09' || draft === 'draft2020-12') {
    addFormats2019(ajv);
  }
  for (const [uri, schema] of Object.entries(remotes)) {
    try {
      ajv.addSchema(schema as object, uri);
    } catch {}
  }
  return ajv;
}

// Create a validator function for a given schema and validator library
function createValidatorFn(
  validatorName: ValidatorName,
  schema: unknown,
  draft: Draft,
  remotes: Record<string, unknown>,
  isFormat: boolean,
  ajv: Ajv
): ((data: unknown) => boolean) | null {
  try {
    switch (validatorName) {
      case 'tjs':
        return createValidator(schema as JsonSchema, {
          defaultMeta: draft,
          remotes: remotes as Record<string, JsonSchema>,
          ...(isFormat && { formatAssertion: true }),
        });

      case 'ajv': {
        const fn = ajv.compile(schema as object);
        return (data: unknown) => fn(data) as boolean;
      }

      case 'zod': {
        const zodSchema = z.fromJSONSchema(schema as Parameters<typeof z.fromJSONSchema>[0]);
        return (data: unknown) => zodSchema.safeParse(data).success;
      }

      case 'joi': {
        const joiSchema = enjoi.schema(schema as object);
        return (data: unknown) => !joiSchema.validate(data).error;
      }

      case 'jsonschema': {
        const jsv = new JsonSchemaValidator();
        return (data: unknown) => jsv.validate(data, schema as object).errors.length === 0;
      }

      case 'is-my-json-valid': {
        const validate = isMyJsonValid(schema as object);
        return (data: unknown) => validate(data) as boolean;
      }

      case 'z-schema': {
        const zschema = new ZSchema({});
        return (data: unknown) => zschema.validate(data, schema as object);
      }

      case 'djv': {
        const env = djv();
        env.addSchema('test', schema as object);
        return (data: unknown) => env.validate('test', data) === undefined;
      }

      case 'jsen': {
        const validate = jsen(schema as object);
        return (data: unknown) => validate(data) as boolean;
      }

      case 'schemasafe': {
        const validate = schemasafe(schema as object, { mode: 'lax', includeErrors: true });
        return (data: unknown) => validate(data) as boolean;
      }

      default:
        return null;
    }
  } catch {
    return null;
  }
}

// Get all test files for a draft (including optional subdirectories)
function getTestFiles(draft: Draft): { file: string; relativePath: string; isFormat: boolean }[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const files: { file: string; relativePath: string; isFormat: boolean }[] = [];

  // Main directory files
  for (const entry of fs.readdirSync(suiteDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push({
        file: path.join(suiteDir, entry.name),
        relativePath: entry.name,
        isFormat: false,
      });
    }
  }

  // Optional directory (recursive)
  const loadOptional = (dir: string, relPrefix: string, isFormat: boolean) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        loadOptional(fullPath, relPath, isFormat || entry.name === 'format');
      } else if (entry.name.endsWith('.json')) {
        files.push({ file: fullPath, relativePath: relPath, isFormat });
      }
    }
  };
  loadOptional(path.join(suiteDir, 'optional'), 'optional', false);

  return files;
}

// Compile and benchmark a single file
async function benchmarkFile(
  filePath: string,
  draft: Draft,
  remotes: Record<string, unknown>,
  isFormat: boolean,
  validatorName: ValidatorName,
  measureOpts: { min_cpu_time: number; min_samples: number }
): Promise<{ groups: GroupResult[]; totalPass: number; totalFail: number }> {
  const groups: TestGroup[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const ajv = createAjv(draft, remotes, isFormat);

  const groupResults: GroupResult[] = [];
  let totalPass = 0;
  let totalFail = 0;

  for (const group of groups) {
    const validatorFn = createValidatorFn(
      validatorName,
      group.schema,
      draft,
      remotes,
      isFormat,
      ajv
    );

    if (!validatorFn) {
      // Validator couldn't compile this schema - mark all tests as failed
      totalFail += group.tests.length;
      const compilationMismatches: ErrorMismatch[] = group.tests.map((test) => ({
        description: test.description,
        expected: test.valid ? 'no-error' : 'error',
        actual: 'error' as const, // Compilation failure is treated as an error
      }));
      groupResults.push({
        groupDesc: group.description,
        passed: false,
        passCount: 0,
        failCount: group.tests.length,
        nsPerTest: 0,
        testCount: group.tests.length,
        errorMismatches: compilationMismatches,
      });
      continue;
    }

    // Check compliance for all tests in this group
    const compiledTests: CompiledTest[] = [];
    let passCount = 0;
    let failCount = 0;
    const errorMismatches: ErrorMismatch[] = [];

    for (const test of group.tests) {
      let validationResult: boolean | undefined;
      try {
        validationResult = validatorFn(test.data);
      } catch {}

      const isCorrect = validationResult === test.valid;

      if (isCorrect) {
        passCount++;
        totalPass++;
      } else {
        failCount++;
        totalFail++;
        // Track the error mismatch details
        const expected = test.valid ? 'no-error' : 'error';
        const actual = validationResult ? 'no-error' : 'error';
        errorMismatches.push({
          description: test.description,
          expected,
          actual,
        });
      }

      compiledTests.push({
        validator: validatorFn,
        data: test.data,
        valid: test.valid,
      });
    }

    const groupPassed = failCount === 0;

    // Only benchmark if all tests in the group pass
    let nsPerTest = 0;
    if (groupPassed && compiledTests.length > 0) {
      // Warmup
      for (let w = 0; w < 50; w++) {
        for (const t of compiledTests) {
          t.validator(t.data);
        }
      }

      // Benchmark
      const result = await measure(() => {
        for (const t of compiledTests) {
          t.validator(t.data);
        }
      }, measureOpts);

      nsPerTest = ((result as any).p50 ?? result.avg) / compiledTests.length;
    }

    groupResults.push({
      groupDesc: group.description,
      passed: groupPassed,
      passCount,
      failCount,
      nsPerTest,
      testCount: group.tests.length,
      ...(errorMismatches.length > 0 && { errorMismatches }),
    });
  }

  return { groups: groupResults, totalPass, totalFail };
}

async function main() {
  const args = process.argv.slice(2);
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;
  let complianceOnly = false;
  let jsonFile: string | null = null;
  let validatorName: ValidatorName = 'tjs';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--filter' || arg === '-f') {
      const pattern = args[++i];
      if (pattern) filter = new RegExp(pattern, 'i');
    } else if (arg === '--compliance-only' || arg === '-c') {
      complianceOnly = true;
    } else if (arg === '--json') {
      jsonFile = args[++i] || 'benchmark.json';
    } else if (arg === '--validator' || arg === '-v') {
      const v = args[++i]?.toLowerCase();
      const validValidators = [
        'tjs',
        'ajv',
        'zod',
        'joi',
        'jsonschema',
        'is-my-json-valid',
        'z-schema',
        'djv',
        'jsen',
        'schemasafe',
      ];
      if (v && validValidators.includes(v)) {
        validatorName = v as ValidatorName;
      }
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }

  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12');
  }

  // Benchmark options
  const measureOpts = { min_cpu_time: 50_000_000, min_samples: 50 };

  console.log(`${validatorName} Benchmark`);
  if (filter) console.log(`Filter: ${filter}`);
  console.log('═'.repeat(80));

  const remotes = loadRemoteSchemas();

  const allResults: FileResult[] = [];
  const draftSummary: Record<Draft, { totalPass: number; totalFail: number; files: number }> =
    {} as Record<Draft, { totalPass: number; totalFail: number; files: number }>;

  for (const draft of drafts) {
    console.log(`\nLoading ${draft}...`);
    let testFiles = getTestFiles(draft);

    if (filter) {
      testFiles = testFiles.filter((f) => filter!.test(f.relativePath));
      console.log(`  Filtered to ${testFiles.length} files`);
    }

    draftSummary[draft] = { totalPass: 0, totalFail: 0, files: testFiles.length };

    for (const { file, relativePath, isFormat } of testFiles) {
      const { groups, totalPass, totalFail } = await benchmarkFile(
        file,
        draft,
        remotes,
        isFormat,
        validatorName,
        complianceOnly ? { min_cpu_time: 0, min_samples: 1 } : measureOpts
      );

      draftSummary[draft].totalPass += totalPass;
      draftSummary[draft].totalFail += totalFail;

      allResults.push({
        draft,
        file: relativePath,
        groups,
        totalPass,
        totalFail,
      });

      // Progress indicator
      const passRate =
        totalPass + totalFail > 0 ? Math.round((totalPass / (totalPass + totalFail)) * 100) : 0;
      const statusColor = passRate === 100 ? GREEN : DIM;
      console.log(`  ${statusColor}${passRate}%${RESET} ${relativePath}`);
    }

    // Draft summary
    const { totalPass, totalFail } = draftSummary[draft];
    const draftPassRate =
      totalPass + totalFail > 0 ? Math.round((totalPass / (totalPass + totalFail)) * 100) : 0;
    console.log(`  ${draft}: ${totalPass}/${totalPass + totalFail} (${draftPassRate}%)`);
  }

  if (complianceOnly) {
    console.log('\nCompliance check complete (benchmark skipped).');
    return;
  }

  // Calculate summary statistics
  console.log('\n' + '═'.repeat(80));
  console.log(`SUMMARY: ${validatorName}`);
  console.log('─'.repeat(80));

  let grandTotalPass = 0;
  let grandTotalFail = 0;
  let grandTotalNs = 0;
  let grandTotalTests = 0;

  for (const draft of drafts) {
    const draftResults = allResults.filter((r) => r.draft === draft);
    const { totalPass, totalFail } = draftSummary[draft];
    grandTotalPass += totalPass;
    grandTotalFail += totalFail;

    // Calculate average ns/test for passing groups only
    let draftNs = 0;
    let draftTests = 0;
    for (const result of draftResults) {
      for (const group of result.groups) {
        if (group.passed && group.nsPerTest > 0) {
          draftNs += group.nsPerTest * group.testCount;
          draftTests += group.testCount;
        }
      }
    }

    grandTotalNs += draftNs;
    grandTotalTests += draftTests;

    const avgNs = draftTests > 0 ? Math.round(draftNs / draftTests) : 0;
    const passRate =
      totalPass + totalFail > 0 ? Math.round((totalPass / (totalPass + totalFail)) * 100) : 0;

    console.log(
      `${draft.padEnd(14)} ${totalPass}/${totalPass + totalFail} (${passRate}%)`.padEnd(35) +
        (avgNs > 0 ? `${avgNs} ns/test` : '')
    );
  }

  console.log('─'.repeat(80));
  const grandPassRate =
    grandTotalPass + grandTotalFail > 0
      ? Math.round((grandTotalPass / (grandTotalPass + grandTotalFail)) * 100)
      : 0;
  const grandAvgNs = grandTotalTests > 0 ? Math.round(grandTotalNs / grandTotalTests) : 0;
  console.log(
    `${'TOTAL'.padEnd(14)} ${grandTotalPass}/${grandTotalPass + grandTotalFail} (${grandPassRate}%)`.padEnd(
      35
    ) + (grandAvgNs > 0 ? `${grandAvgNs} ns/test` : '')
  );
  console.log('─'.repeat(80));

  // JSON output
  if (jsonFile) {
    const jsonData = {
      validator: validatorName,
      timestamp: new Date().toISOString(),
      results: allResults,
      summary: Object.fromEntries(
        drafts.map((draft) => [
          draft,
          {
            totalPass: draftSummary[draft].totalPass,
            totalFail: draftSummary[draft].totalFail,
            files: draftSummary[draft].files,
          },
        ])
      ),
    };

    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`\nWrote results to ${jsonFile}`);
  }
}

main().catch(console.error);
