# JSON Schema Test Suite Compliance - PRD

This document outlines the plan for testing `json-schema-ts` against the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite) to ensure full compliance with the JSON Schema 2020-12 specification.

---

## Goals

1. **Runtime Compliance**: Validate that our `Validator` class correctly validates/rejects data according to the JSON Schema 2020-12 specification
2. **Type Inference Verification**: Ensure inferred TypeScript types are sensible and accurate across the full spectrum of JSON Schema patterns
3. **Compliance Tracking**: Generate a compliance report showing which tests pass/fail, enabling incremental progress toward full compliance
4. **Regression Prevention**: Integrate test suite into CI to prevent future regressions

---

## JSON Schema Test Suite Overview

### Source Repository

- **Repository**: [json-schema-org/JSON-Schema-Test-Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)
- **Target Version**: `draft2020-12`
- **Integration Method**: Git submodule (recommended by upstream)

### Test File Structure

Each `.json` file contains an array of test groups:

```json
[
  {
    "description": "a]schema given for items",
    "schema": {
      "items": { "type": "integer" }
    },
    "tests": [
      {
        "description": "valid items",
        "data": [1, 2, 3],
        "valid": true
      },
      {
        "description": "wrong type of items",
        "data": [1, "x"],
        "valid": false
      }
    ]
  }
]
```

### Directory Organization

```
tests/
└── draft2020-12/
    ├── additionalProperties.json
    ├── allOf.json
    ├── anchor.json
    ├── anyOf.json
    ├── boolean_schema.json
    ├── const.json
    ├── contains.json
    ├── default.json
    ├── defs.json
    ├── dependentRequired.json
    ├── dependentSchemas.json
    ├── dynamicRef.json
    ├── enum.json
    ├── exclusiveMaximum.json
    ├── exclusiveMinimum.json
    ├── format.json
    ├── id.json
    ├── if-then-else.json
    ├── infinite-loop-detection.json
    ├── items.json
    ├── maxContains.json
    ├── maxItems.json
    ├── maxLength.json
    ├── maxProperties.json
    ├── maximum.json
    ├── minContains.json
    ├── minItems.json
    ├── minLength.json
    ├── minProperties.json
    ├── minimum.json
    ├── multipleOf.json
    ├── not.json
    ├── oneOf.json
    ├── pattern.json
    ├── patternProperties.json
    ├── prefixItems.json
    ├── properties.json
    ├── propertyNames.json
    ├── ref.json
    ├── refRemote.json
    ├── required.json
    ├── type.json
    ├── unevaluatedItems.json
    ├── unevaluatedProperties.json
    ├── uniqueItems.json
    └── optional/
        ├── bignum.json
        ├── cross-draft.json
        ├── ecmascript-regex.json
        ├── float-overflow.json
        ├── format/
        │   ├── date.json
        │   ├── date-time.json
        │   ├── duration.json
        │   ├── email.json
        │   ├── hostname.json
        │   ├── ipv4.json
        │   ├── ipv6.json
        │   ├── json-pointer.json
        │   ├── regex.json
        │   ├── relative-json-pointer.json
        │   ├── time.json
        │   ├── uri.json
        │   ├── uri-reference.json
        │   ├── uri-template.json
        │   └── ... (more formats)
        ├── non-bmp-regex.json
        └── unicode.json
```

---

## Implementation Plan

### Phase 1: Infrastructure Setup

#### 1.1 Add Test Suite as Git Submodule

```bash
git submodule add https://github.com/json-schema-org/JSON-Schema-Test-Suite.git test-suite
```

Create `.gitmodules`:
```
[submodule "test-suite"]
    path = test-suite
    url = https://github.com/json-schema-org/JSON-Schema-Test-Suite.git
    branch = main
```

#### 1.2 Create Test Runner Infrastructure

**File: `tests/suite/types.ts`**

```typescript
export interface TestCase {
  description: string;
  data: unknown;
  valid: boolean;
}

export interface TestGroup {
  description: string;
  schema: unknown;
  tests: TestCase[];
}

export interface TestFile {
  name: string;
  path: string;
  groups: TestGroup[];
}

export interface TestResult {
  file: string;
  group: string;
  test: string;
  expected: boolean;
  actual: boolean;
  passed: boolean;
  error?: string;
}

export interface ComplianceReport {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  byKeyword: Record<string, { passed: number; failed: number; skipped: number }>;
  failures: TestResult[];
}
```

**File: `tests/suite/loader.ts`**

```typescript
import * as fs from 'fs';
import * as path from 'path';
import type { TestFile, TestGroup } from './types.js';

const SUITE_PATH = path.join(__dirname, '../../test-suite/tests/draft2020-12');

export function loadTestFiles(options?: {
  includeOptional?: boolean;
  filter?: (filename: string) => boolean;
}): TestFile[] {
  const files: TestFile[] = [];

  // Load required tests
  const requiredDir = SUITE_PATH;
  files.push(...loadDirectory(requiredDir, false, options?.filter));

  // Load optional tests if requested
  if (options?.includeOptional) {
    const optionalDir = path.join(SUITE_PATH, 'optional');
    if (fs.existsSync(optionalDir)) {
      files.push(...loadDirectory(optionalDir, true, options?.filter));
    }

    // Load format tests
    const formatDir = path.join(optionalDir, 'format');
    if (fs.existsSync(formatDir)) {
      files.push(...loadDirectory(formatDir, true, options?.filter));
    }
  }

  return files;
}

function loadDirectory(
  dir: string,
  optional: boolean,
  filter?: (filename: string) => boolean
): TestFile[] {
  const files: TestFile[] = [];

  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith('.json')) continue;
    if (filter && !filter(filename)) continue;

    const filepath = path.join(dir, filename);
    const stat = fs.statSync(filepath);
    if (!stat.isFile()) continue;

    const content = fs.readFileSync(filepath, 'utf-8');
    const groups: TestGroup[] = JSON.parse(content);

    files.push({
      name: filename.replace('.json', ''),
      path: filepath,
      groups,
    });
  }

  return files;
}

export function loadSingleFile(keyword: string): TestFile | null {
  const filepath = path.join(SUITE_PATH, `${keyword}.json`);
  if (!fs.existsSync(filepath)) return null;

  const content = fs.readFileSync(filepath, 'utf-8');
  const groups: TestGroup[] = JSON.parse(content);

  return {
    name: keyword,
    path: filepath,
    groups,
  };
}
```

**File: `tests/suite/runner.ts`**

```typescript
import type { JsonSchema } from '../../src/types.js';
import { Validator } from '../../src/validator.js';
import type { TestFile, TestResult, ComplianceReport } from './types.js';

export interface RunnerOptions {
  /** Skip tests for unimplemented features */
  skipUnimplemented?: boolean;
  /** Keywords to skip entirely */
  skipKeywords?: string[];
  /** Callback for each test result */
  onResult?: (result: TestResult) => void;
}

const UNIMPLEMENTED_KEYWORDS = [
  'dynamicRef',
  'unevaluatedItems',
  'unevaluatedProperties',
  'refRemote',
];

export function runTestSuite(
  files: TestFile[],
  options: RunnerOptions = {}
): ComplianceReport {
  const results: TestResult[] = [];
  const byKeyword: Record<string, { passed: number; failed: number; skipped: number }> = {};

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const file of files) {
    const keyword = file.name;

    // Initialize keyword stats
    if (!byKeyword[keyword]) {
      byKeyword[keyword] = { passed: 0, failed: 0, skipped: 0 };
    }

    // Skip unimplemented keywords
    if (options.skipUnimplemented && UNIMPLEMENTED_KEYWORDS.includes(keyword)) {
      for (const group of file.groups) {
        for (const test of group.tests) {
          total++;
          skipped++;
          byKeyword[keyword].skipped++;
        }
      }
      continue;
    }

    if (options.skipKeywords?.includes(keyword)) {
      for (const group of file.groups) {
        for (const test of group.tests) {
          total++;
          skipped++;
          byKeyword[keyword].skipped++;
        }
      }
      continue;
    }

    for (const group of file.groups) {
      let validator: Validator<unknown>;

      try {
        validator = new Validator(group.schema as JsonSchema);
      } catch (err) {
        // Schema construction failed - all tests in this group fail
        for (const test of group.tests) {
          total++;
          failed++;
          byKeyword[keyword].failed++;

          const result: TestResult = {
            file: file.name,
            group: group.description,
            test: test.description,
            expected: test.valid,
            actual: false,
            passed: false,
            error: `Schema construction failed: ${err}`,
          };

          results.push(result);
          options.onResult?.(result);
        }
        continue;
      }

      for (const test of group.tests) {
        total++;

        let actual: boolean;
        let error: string | undefined;

        try {
          actual = validator.validate(test.data);
        } catch (err) {
          actual = false;
          error = `Validation threw: ${err}`;
        }

        const testPassed = actual === test.valid;

        if (testPassed) {
          passed++;
          byKeyword[keyword].passed++;
        } else {
          failed++;
          byKeyword[keyword].failed++;
        }

        const result: TestResult = {
          file: file.name,
          group: group.description,
          test: test.description,
          expected: test.valid,
          actual,
          passed: testPassed,
          error,
        };

        if (!testPassed) {
          results.push(result);
        }

        options.onResult?.(result);
      }
    }
  }

  return {
    total,
    passed,
    failed,
    skipped,
    byKeyword,
    failures: results,
  };
}

export function formatReport(report: ComplianceReport): string {
  const lines: string[] = [];

  lines.push('# JSON Schema Test Suite Compliance Report');
  lines.push('');
  lines.push(`## Summary`);
  lines.push('');
  lines.push(`- **Total Tests**: ${report.total}`);
  lines.push(`- **Passed**: ${report.passed} (${((report.passed / report.total) * 100).toFixed(1)}%)`);
  lines.push(`- **Failed**: ${report.failed}`);
  lines.push(`- **Skipped**: ${report.skipped}`);
  lines.push('');

  lines.push('## By Keyword');
  lines.push('');
  lines.push('| Keyword | Passed | Failed | Skipped | Rate |');
  lines.push('|---------|--------|--------|---------|------|');

  for (const [keyword, stats] of Object.entries(report.byKeyword).sort()) {
    const total = stats.passed + stats.failed + stats.skipped;
    const rate = total > 0 && stats.skipped < total
      ? ((stats.passed / (stats.passed + stats.failed)) * 100).toFixed(0) + '%'
      : 'N/A';
    lines.push(`| ${keyword} | ${stats.passed} | ${stats.failed} | ${stats.skipped} | ${rate} |`);
  }

  if (report.failures.length > 0) {
    lines.push('');
    lines.push('## Failures');
    lines.push('');

    for (const failure of report.failures.slice(0, 50)) {
      lines.push(`### ${failure.file} / ${failure.group}`);
      lines.push('');
      lines.push(`**Test**: ${failure.test}`);
      lines.push(`**Expected**: ${failure.expected ? 'valid' : 'invalid'}`);
      lines.push(`**Actual**: ${failure.actual ? 'valid' : 'invalid'}`);
      if (failure.error) {
        lines.push(`**Error**: ${failure.error}`);
      }
      lines.push('');
    }

    if (report.failures.length > 50) {
      lines.push(`... and ${report.failures.length - 50} more failures`);
    }
  }

  return lines.join('\n');
}
```

#### 1.3 Create Test Files

**File: `tests/suite/compliance.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { loadTestFiles } from './loader.js';
import { runTestSuite, formatReport } from './runner.js';
import * as fs from 'fs';
import * as path from 'path';

describe('JSON Schema Test Suite Compliance', () => {
  const files = loadTestFiles({ includeOptional: false });

  it('runs all required tests and generates report', () => {
    const report = runTestSuite(files, {
      skipUnimplemented: true,
      onResult: (result) => {
        if (!result.passed) {
          console.log(`FAIL: ${result.file}/${result.group}/${result.test}`);
        }
      },
    });

    // Write report to file
    const reportPath = path.join(__dirname, '../../COMPLIANCE.md');
    fs.writeFileSync(reportPath, formatReport(report));

    console.log(`\nCompliance: ${report.passed}/${report.total} (${((report.passed / report.total) * 100).toFixed(1)}%)`);

    // For now, just verify we can run the tests
    // Later, we'll add assertions for specific pass rates
    expect(report.total).toBeGreaterThan(0);
  });
});
```

**File: `tests/suite/keyword.test.ts`**

Individual keyword tests for focused debugging:

```typescript
import { describe, it, expect } from 'vitest';
import { loadSingleFile } from './loader.js';
import { runTestSuite } from './runner.js';

// Test a single keyword in isolation
function testKeyword(keyword: string) {
  describe(`Keyword: ${keyword}`, () => {
    const file = loadSingleFile(keyword);

    if (!file) {
      it.skip(`${keyword}.json not found`, () => {});
      return;
    }

    for (const group of file.groups) {
      describe(group.description, () => {
        for (const test of group.tests) {
          it(test.description, () => {
            const report = runTestSuite([{
              ...file,
              groups: [{
                ...group,
                tests: [test],
              }],
            }]);

            expect(report.passed).toBe(1);
          });
        }
      });
    }
  });
}

// Core keywords - must pass 100%
testKeyword('type');
testKeyword('const');
testKeyword('enum');
testKeyword('properties');
testKeyword('required');
testKeyword('additionalProperties');
testKeyword('items');
testKeyword('prefixItems');
testKeyword('allOf');
testKeyword('anyOf');
testKeyword('oneOf');
testKeyword('not');
testKeyword('if-then-else');
testKeyword('ref');

// Validation keywords
testKeyword('minimum');
testKeyword('maximum');
testKeyword('exclusiveMinimum');
testKeyword('exclusiveMaximum');
testKeyword('multipleOf');
testKeyword('minLength');
testKeyword('maxLength');
testKeyword('pattern');
testKeyword('minItems');
testKeyword('maxItems');
testKeyword('uniqueItems');
testKeyword('minProperties');
testKeyword('maxProperties');

// Phase 2 keywords
testKeyword('contains');
testKeyword('minContains');
testKeyword('maxContains');
testKeyword('dependentRequired');
testKeyword('patternProperties');
testKeyword('propertyNames');
testKeyword('anchor');

// Phase 3 keywords (may have skips)
testKeyword('dependentSchemas');
testKeyword('unevaluatedItems');
testKeyword('unevaluatedProperties');
testKeyword('dynamicRef');
```

---

### Phase 2: Type Inference Verification

Beyond runtime validation, we need to verify that inferred types are sensible.

#### 2.1 Type Test Strategy

For each test schema in the suite, we verify that:
1. The schema compiles without TypeScript errors
2. The inferred type is not `unknown` (unless appropriate)
3. The inferred type accepts/rejects test data correctly at the type level

**File: `tests/suite/type-inference.test-d.ts`**

```typescript
import { schema } from '../../src/index.js';

// Test that basic schemas produce expected types
// These are compile-time checks

// Type array with properties should infer structured types
const NullableObject = schema({
  type: ['object', 'null'],
  properties: {
    name: { type: 'string' },
  },
});
// $ExpectType { name?: string } | null
NullableObject.type;

// Const should infer literal type
const ConstSchema = schema({ const: 'hello' });
// $ExpectType "hello"
ConstSchema.type;

// Enum should infer union of literals
const EnumSchema = schema({ enum: ['a', 'b', 'c'] });
// $ExpectType "a" | "b" | "c"
EnumSchema.type;

// Required properties should not be optional
const RequiredProps = schema({
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['id'],
});
// $ExpectType { id: string; name?: string }
RequiredProps.type;

// Arrays with items should infer item type
const StringArray = schema({
  type: 'array',
  items: { type: 'string' },
});
// $ExpectType string[]
StringArray.type;

// Tuples with prefixItems
const TupleSchema = schema({
  type: 'array',
  prefixItems: [
    { type: 'string' },
    { type: 'number' },
  ],
  items: false,
});
// $ExpectType [string, number]
TupleSchema.type;

// allOf should produce intersection
const AllOfSchema = schema({
  allOf: [
    { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
    { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
  ],
});
// $ExpectType { a: string } & { b: number }
AllOfSchema.type;

// anyOf should produce union
const AnyOfSchema = schema({
  anyOf: [
    { type: 'string' },
    { type: 'number' },
  ],
});
// $ExpectType string | number
AnyOfSchema.type;

// Refs should resolve correctly
const RefSchema = schema({
  $defs: {
    Item: {
      type: 'object',
      properties: { value: { type: 'number' } },
      required: ['value'],
    },
  },
  type: 'array',
  items: { $ref: '#/$defs/Item' },
});
// $ExpectType { value: number }[]
RefSchema.type;
```

#### 2.2 Generated Type Tests from Suite

Create a script to generate type test cases from the JSON Schema test suite:

**File: `scripts/generate-type-tests.ts`**

```typescript
import * as fs from 'fs';
import * as path from 'path';
import { loadTestFiles } from '../tests/suite/loader.js';

// Keywords where we can reasonably verify type inference
const TYPE_TESTABLE_KEYWORDS = [
  'type',
  'const',
  'enum',
  'properties',
  'required',
  'additionalProperties',
  'items',
  'prefixItems',
  'allOf',
  'anyOf',
  'oneOf',
  'ref',
  'defs',
];

function generateTypeTests() {
  const files = loadTestFiles({ includeOptional: false });
  const output: string[] = [];

  output.push(`// AUTO-GENERATED - DO NOT EDIT`);
  output.push(`// Generated from JSON Schema Test Suite`);
  output.push(`import { schema } from '../../src/index.js';`);
  output.push(``);

  for (const file of files) {
    if (!TYPE_TESTABLE_KEYWORDS.includes(file.name)) continue;

    output.push(`// === ${file.name.toUpperCase()} ===`);
    output.push(``);

    for (let i = 0; i < file.groups.length; i++) {
      const group = file.groups[i];
      const varName = `${file.name}_${i}`;

      output.push(`// ${group.description}`);
      output.push(`const ${varName} = schema(${JSON.stringify(group.schema, null, 2)} as const);`);
      output.push(`// Verify schema compiles and type is not never`);
      output.push(`${varName}.type satisfies unknown;`);
      output.push(``);
    }
  }

  const outPath = path.join(__dirname, '../tests/suite/generated-type-tests.ts');
  fs.writeFileSync(outPath, output.join('\n'));

  console.log(`Generated ${output.filter(l => l.startsWith('const ')).length} type tests`);
}

generateTypeTests();
```

---

### Phase 3: Compliance Reporting & CI Integration

#### 3.1 Compliance Badge

Track compliance percentage and display in README:

**Example badge format:**
```markdown
![JSON Schema Compliance](https://img.shields.io/badge/JSON%20Schema%202020--12-85%25%20compliant-yellow)
```

#### 3.2 NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test": "npm run test:types && npm run test:runtime",
    "test:types": "eslint tests/types/",
    "test:runtime": "vitest run",
    "test:suite": "vitest run tests/suite/",
    "test:suite:keyword": "vitest run tests/suite/keyword.test.ts",
    "test:compliance": "vitest run tests/suite/compliance.test.ts",
    "report:compliance": "node scripts/generate-compliance-report.js"
  }
}
```

#### 3.3 GitHub Actions Integration

**File: `.github/workflows/test.yml`**

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci

      - name: Type Tests
        run: npm run test:types

      - name: Runtime Tests
        run: npm run test:runtime

      - name: JSON Schema Test Suite
        run: npm run test:suite

      - name: Generate Compliance Report
        run: npm run report:compliance

      - name: Upload Compliance Report
        uses: actions/upload-artifact@v4
        with:
          name: compliance-report
          path: COMPLIANCE.md
```

---

## Feature Gap Analysis

Based on the test suite structure, here are known gaps in `json-schema-ts`:

### Implemented (Expected to Pass)

| Keyword | Status | Notes |
|---------|--------|-------|
| `type` | ✅ | All primitive types |
| `const` | ✅ | Full support |
| `enum` | ✅ | Full support |
| `properties` | ✅ | Full support |
| `required` | ✅ | Full support |
| `additionalProperties` | ✅ | Full support |
| `items` | ✅ | Both schema and boolean |
| `prefixItems` | ✅ | Tuple support |
| `allOf` | ✅ | Full support |
| `anyOf` | ✅ | Full support |
| `oneOf` | ✅ | Full support |
| `not` | ✅ | Full support |
| `if/then/else` | ✅ | Full support |
| `$ref` | ✅ | Local refs only |
| `$defs` | ✅ | Full support |
| `minimum/maximum` | ✅ | Full support |
| `exclusiveMinimum/Maximum` | ✅ | Full support |
| `multipleOf` | ✅ | Full support |
| `minLength/maxLength` | ✅ | Full support |
| `pattern` | ✅ | Full support |
| `minItems/maxItems` | ✅ | Full support |
| `uniqueItems` | ✅ | Full support |
| `minProperties/maxProperties` | ✅ | Full support |
| `contains` | ✅ | Full support |
| `minContains/maxContains` | ✅ | Full support |
| `dependentRequired` | ✅ | Full support |
| `patternProperties` | ✅ | Full support |
| `propertyNames` | ✅ | Full support |
| `$anchor` | ✅ | Full support |
| `dependentSchemas` | ✅ | Full support |

### Not Implemented (Expected to Fail/Skip)

| Keyword | Status | Priority | Notes |
|---------|--------|----------|-------|
| `unevaluatedProperties` | ❌ | High | Requires tracking evaluated props through composition |
| `unevaluatedItems` | ❌ | High | Requires tracking evaluated indices |
| `$dynamicRef/$dynamicAnchor` | ❌ | Low | Advanced meta-schema feature |
| `$id` | ⚠️ | Medium | Stored but not used for resolution |
| Remote `$ref` | ❌ | Low | Would require HTTP fetching |
| `contentEncoding` | ❌ | Low | Base64 decoding |
| `contentMediaType` | ❌ | Low | MIME type handling |
| `contentSchema` | ❌ | Low | Nested content validation |

### Format Support (Optional Tests)

| Format | Status | Notes |
|--------|--------|-------|
| `email` | ✅ | Basic regex |
| `uuid` | ✅ | Full support |
| `date-time` | ✅ | ISO 8601 |
| `date` | ✅ | YYYY-MM-DD |
| `time` | ✅ | HH:MM:SS |
| `duration` | ✅ | ISO 8601 duration |
| `uri` | ✅ | Basic regex |
| `uri-reference` | ✅ | Relative refs supported |
| `hostname` | ✅ | RFC 1123 |
| `ipv4` | ✅ | Full support |
| `ipv6` | ⚠️ | Basic support, may miss edge cases |
| `json-pointer` | ✅ | RFC 6901 |
| `relative-json-pointer` | ✅ | Draft spec |
| `regex` | ✅ | ECMA-262 |
| `iri` | ❌ | Not implemented |
| `iri-reference` | ❌ | Not implemented |
| `idn-hostname` | ❌ | Not implemented |
| `idn-email` | ❌ | Not implemented |
| `uri-template` | ❌ | Not implemented |

---

## Success Criteria

### Phase 1 Target: Core Compliance (80%+)

- All implemented keywords should pass 100% of their tests
- Overall compliance rate ≥ 80% for required tests
- CI pipeline running and reporting

### Phase 2 Target: High Compliance (95%+)

- Implement `unevaluatedProperties` and `unevaluatedItems`
- Fix any edge cases found in Phase 1
- All format validators passing optional format tests

### Phase 3 Target: Full Compliance (99%+)

- Implement remaining features (`$dynamicRef`, content keywords)
- Handle all edge cases
- Document any intentional deviations from spec

---

## Type Inference Quality Metrics

Beyond pass/fail, track type inference quality:

| Metric | Target | Description |
|--------|--------|-------------|
| Non-unknown rate | ≥ 95% | Schemas should produce specific types, not `unknown` |
| Literal preservation | 100% | `const` and `enum` should preserve literal types |
| Required accuracy | 100% | Required properties should not be optional |
| Tuple accuracy | 100% | `prefixItems` should produce tuple types |
| Union accuracy | 100% | `anyOf`/`oneOf` should produce unions |
| Intersection accuracy | 100% | `allOf` should produce intersections |

---

## Appendix: Test Counts by Keyword (Draft 2020-12)

Based on typical test suite size:

| Keyword | ~Tests | Notes |
|---------|--------|-------|
| additionalProperties | 20-30 | Various scenarios |
| allOf | 15-20 | Composition |
| anchor | 10-15 | Reference by anchor |
| anyOf | 15-20 | Composition |
| boolean_schema | 5-10 | true/false schemas |
| const | 15-20 | Literal values |
| contains | 20-25 | With min/max |
| default | 5-10 | Annotation only |
| defs | 10-15 | Definition tests |
| dependentRequired | 10-15 | Conditional required |
| dependentSchemas | 15-20 | Conditional schemas |
| dynamicRef | 20-30 | Complex resolution |
| enum | 15-20 | Value enumeration |
| exclusiveMaximum | 5-10 | Numeric constraint |
| exclusiveMinimum | 5-10 | Numeric constraint |
| format | 10-15 | Format validation |
| id | 10-15 | Schema identification |
| if-then-else | 20-30 | Conditional |
| items | 20-25 | Array items |
| maxContains | 10-15 | Array constraint |
| maxItems | 5-10 | Array constraint |
| maxLength | 5-10 | String constraint |
| maxProperties | 5-10 | Object constraint |
| maximum | 5-10 | Numeric constraint |
| minContains | 10-15 | Array constraint |
| minItems | 5-10 | Array constraint |
| minLength | 5-10 | String constraint |
| minProperties | 5-10 | Object constraint |
| minimum | 5-10 | Numeric constraint |
| multipleOf | 10-15 | Numeric constraint |
| not | 10-15 | Negation |
| oneOf | 15-20 | Exclusive union |
| pattern | 10-15 | Regex matching |
| patternProperties | 15-20 | Pattern-based props |
| prefixItems | 15-20 | Tuple items |
| properties | 15-20 | Object properties |
| propertyNames | 10-15 | Key validation |
| ref | 30-40 | Reference resolution |
| refRemote | 20-30 | Remote refs |
| required | 10-15 | Required properties |
| type | 30-40 | Type validation |
| unevaluatedItems | 25-35 | Complex tracking |
| unevaluatedProperties | 30-40 | Complex tracking |
| uniqueItems | 10-15 | Array uniqueness |

**Estimated Total**: ~600-800 required tests

---

## References

- [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)
- [JSON Schema 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core)
- [JSON Schema 2020-12 Validation](https://json-schema.org/draft/2020-12/json-schema-validation)
- [Ajv Validator](https://ajv.js.org/) - Reference implementation
- [@json-schema-org/tests NPM](https://www.npmjs.com/package/@json-schema-org/tests) - Archived NPM package
