/**
 * Isolated benchmark runner - runs ONE validator at a time.
 *
 * This prevents JIT/memory/cache interference between validators.
 * Run each validator in a separate process, then use bench-compare.ts
 * to compare results from validators that passed the same test groups.
 *
 * Usage:
 *   npx tsx bench-isolated.ts tjs [drafts...] [--filter <regex>] [--json <file>]
 *   npx tsx bench-isolated.ts ajv [drafts...] [--filter <regex>] [--json <file>]
 *   npx tsx bench-isolated.ts zod [drafts...] [--json <file>]
 *
 * Supported validators:
 *   tjs           - This library
 *   ajv           - The fastest JSON Schema validator
 *   zod           - TypeScript-first schema validation
 *   joi           - Object schema validation (via enjoi)
 *   jsonschema    - Simple and lightweight validator
 *   is-my-json-valid - Code-generation based fast validator
 *   z-schema      - JSON Schema validator with async support
 *   djv           - Dynamic JSON Schema Validator
 *   jsen          - JSON Sentinel, built for speed
 *   schemasafe    - Safe JSON Schema validator with code generation
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { measure } from 'mitata';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';
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

interface GroupResult {
  groupDesc: string;
  passed: boolean;
  passCount: number;
  failCount: number;
  nsPerTest: number;
  testCount: number;
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

// Lazy-load validators to avoid loading all of them
async function createValidatorFactory(
  validatorName: ValidatorName,
  draft: Draft,
  remotes: Record<string, unknown>,
  formatAssertion: boolean
): Promise<(schema: unknown) => ((data: unknown) => boolean) | null> {
  if (validatorName === 'tjs') {
    const { createValidator } = await import('../src/core/index.js');
    type JsonSchema = import('../src/types.js').JsonSchema;
    return (schema: unknown) => {
      try {
        return createValidator(schema as JsonSchema, {
          defaultMeta: draft,
          remotes: remotes as Record<string, JsonSchema>,
          ...(formatAssertion && { formatAssertion: true }),
        });
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'ajv') {
    const Ajv = (await import('ajv')).default;
    const Ajv2019 = (await import('ajv/dist/2019.js')).default;
    const Ajv2020 = (await import('ajv/dist/2020.js')).default;
    const addFormats = (await import('ajv-formats')).default;
    const addFormats2019 = (await import('ajv-formats-draft2019')).default;

    const opts = {
      allErrors: false,
      logger: false as const,
      validateFormats: formatAssertion,
      strict: false,
    };
    let ajv: InstanceType<typeof Ajv>;
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
    return (schema: unknown) => {
      try {
        const fn = ajv.compile(schema as object);
        return (data: unknown) => fn(data) as boolean;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'zod') {
    const { z } = await import('zod');
    return (schema: unknown) => {
      try {
        const zodSchema = z.fromJSONSchema(schema as Parameters<typeof z.fromJSONSchema>[0]);
        return (data: unknown) => zodSchema.safeParse(data).success;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'joi') {
    const enjoi = (await import('enjoi')).default;
    return (schema: unknown) => {
      try {
        const joiSchema = enjoi.schema(schema as object);
        return (data: unknown) => !joiSchema.validate(data).error;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'jsonschema') {
    const { Validator: JsonSchemaValidator } = await import('jsonschema');
    return (schema: unknown) => {
      try {
        const jsv = new JsonSchemaValidator();
        return (data: unknown) => jsv.validate(data, schema as object).errors.length === 0;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'is-my-json-valid') {
    const isMyJsonValid = (await import('is-my-json-valid')).default;
    return (schema: unknown) => {
      try {
        const validate = isMyJsonValid(schema as object);
        return (data: unknown) => validate(data) as boolean;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'z-schema') {
    const ZSchema = (await import('z-schema')).default;
    return (schema: unknown) => {
      try {
        const zschema = new ZSchema({});
        return (data: unknown) => zschema.validate(data, schema as object);
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'djv') {
    const djv = (await import('djv')).default;
    return (schema: unknown) => {
      try {
        const env = djv();
        env.addSchema('test', schema as object);
        return (data: unknown) => env.validate('test', data) === undefined;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'jsen') {
    const jsen = (await import('jsen')).default;
    return (schema: unknown) => {
      try {
        const validate = jsen(schema as object);
        return (data: unknown) => validate(data) as boolean;
      } catch {
        return null;
      }
    };
  }

  if (validatorName === 'schemasafe') {
    const { validator: schemasafe } = await import('@exodus/schemasafe');
    return (schema: unknown) => {
      try {
        // Enable includeErrors for fair comparison - both validators report first error
        const validate = schemasafe(schema as object, { mode: 'lax', includeErrors: true });
        return (data: unknown) => validate(data) as boolean;
      } catch {
        return null;
      }
    };
  }

  throw new Error(`Unknown validator: ${validatorName}`);
}

function getTestFiles(draft: Draft): { file: string; relativePath: string; isFormat: boolean }[] {
  const suiteDir = path.join(__dirname, '../tests/json-schema-test-suite', draft);
  const files: { file: string; relativePath: string; isFormat: boolean }[] = [];

  for (const entry of fs.readdirSync(suiteDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push({
        file: path.join(suiteDir, entry.name),
        relativePath: entry.name,
        isFormat: false,
      });
    }
  }

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

async function benchmarkFile(
  filePath: string,
  draft: Draft,
  remotes: Record<string, unknown>,
  isFormat: boolean,
  validatorName: ValidatorName,
  measureOpts: { min_cpu_time: number; min_samples: number }
): Promise<{ groups: GroupResult[]; totalPass: number; totalFail: number }> {
  const groups: TestGroup[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const factory = await createValidatorFactory(validatorName, draft, remotes, isFormat);

  const results: GroupResult[] = [];
  let totalPass = 0;
  let totalFail = 0;

  for (const group of groups) {
    const validator = factory(group.schema);

    // Check compliance for all tests in this group
    let groupAllPass = true;
    let passCount = 0;
    let failCount = 0;

    for (const test of group.tests) {
      let passed = false;
      if (validator) {
        try {
          passed = validator(test.data) === test.valid;
        } catch {}
      }
      if (passed) {
        passCount++;
        totalPass++;
      } else {
        failCount++;
        totalFail++;
        groupAllPass = false;
      }
    }

    // Only benchmark if all tests in the group passed
    let nsPerTest = 0;
    if (groupAllPass && validator) {
      // Warmup
      for (let w = 0; w < 50; w++) {
        for (const test of group.tests) {
          validator(test.data);
        }
      }

      // Benchmark
      const result = await measure(() => {
        for (const test of group.tests) {
          validator(test.data);
        }
      }, measureOpts);

      nsPerTest = ((result as any).p50 ?? result.avg) / group.tests.length;
    }

    results.push({
      groupDesc: group.description,
      passed: groupAllPass,
      passCount,
      failCount,
      nsPerTest,
      testCount: group.tests.length,
    });
  }

  return { groups: results, totalPass, totalFail };
}

async function main() {
  const args = process.argv.slice(2);

  // First arg should be validator name
  const validValidators: ValidatorName[] = [
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

  let validatorName: ValidatorName | null = null;
  const drafts: Draft[] = [];
  let filter: RegExp | null = null;
  let jsonFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (validValidators.includes(arg as ValidatorName)) {
      validatorName = arg as ValidatorName;
    } else if (arg === '--filter' || arg === '-f') {
      const pattern = args[++i];
      if (pattern) filter = new RegExp(pattern, 'i');
    } else if (arg === '--json') {
      jsonFile = args[++i] || 'benchmark.json';
    } else if (['draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12'].includes(arg)) {
      drafts.push(arg as Draft);
    }
  }

  if (!validatorName) {
    console.error(
      'Usage: npx tsx bench-isolated.ts <validator> [drafts...] [--filter <regex>] [--json <file>]'
    );
    console.error('Validators: ' + validValidators.join(', '));
    process.exit(1);
  }

  if (drafts.length === 0) {
    drafts.push('draft4', 'draft6', 'draft7', 'draft2019-09', 'draft2020-12');
  }

  const measureOpts = { min_cpu_time: 50_000_000, min_samples: 50 };

  console.log(`Isolated benchmark: ${validatorName}`);
  if (filter) console.log(`Filter: ${filter}`);
  console.log('═'.repeat(80));

  const remotes = loadRemoteSchemas();
  const results: FileResult[] = [];

  for (const draft of drafts) {
    console.log(`\n${draft}...`);
    let testFiles = getTestFiles(draft);

    if (filter) {
      testFiles = testFiles.filter((f) => filter!.test(f.relativePath));
    }

    for (const { file, relativePath, isFormat } of testFiles) {
      const { groups, totalPass, totalFail } = await benchmarkFile(
        file,
        draft,
        remotes,
        isFormat,
        validatorName,
        measureOpts
      );

      results.push({
        draft,
        file: relativePath,
        groups,
        totalPass,
        totalFail,
      });

      // Progress indicator
      const passedGroups = groups.filter((g) => g.passed).length;
      const totalGroups = groups.length;
      process.stdout.write(`  ${relativePath}: ${passedGroups}/${totalGroups} groups passed\n`);
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(80));
  console.log('SUMMARY');
  console.log('─'.repeat(80));

  let grandTotalPass = 0;
  let grandTotalFail = 0;

  for (const draft of drafts) {
    const draftResults = results.filter((r) => r.draft === draft);
    const pass = draftResults.reduce((sum, r) => sum + r.totalPass, 0);
    const fail = draftResults.reduce((sum, r) => sum + r.totalFail, 0);
    grandTotalPass += pass;
    grandTotalFail += fail;

    const pct = ((pass / (pass + fail)) * 100).toFixed(1);
    console.log(
      `${draft.padEnd(14)} ${GREEN}${pass}${RESET} pass, ${fail > 0 ? fail : DIM + fail + RESET} fail (${pct}%)`
    );
  }

  console.log('─'.repeat(80));
  const totalPct = ((grandTotalPass / (grandTotalPass + grandTotalFail)) * 100).toFixed(1);
  console.log(
    `${'TOTAL'.padEnd(14)} ${GREEN}${grandTotalPass}${RESET} pass, ${grandTotalFail > 0 ? grandTotalFail : DIM + grandTotalFail + RESET} fail (${totalPct}%)`
  );

  // Write JSON output
  if (jsonFile) {
    const jsonData = {
      validator: validatorName,
      timestamp: new Date().toISOString(),
      results,
      summary: Object.fromEntries(
        drafts.map((draft) => {
          const draftResults = results.filter((r) => r.draft === draft);
          const totalPass = draftResults.reduce((sum, r) => sum + r.totalPass, 0);
          const totalFail = draftResults.reduce((sum, r) => sum + r.totalFail, 0);
          return [draft, { totalPass, totalFail, files: draftResults.length }];
        })
      ),
    };

    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`\nWrote results to ${jsonFile}`);
  }
}

main().catch(console.error);
