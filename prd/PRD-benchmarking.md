# PRD: json-schema-ts Benchmark Suite

## Overview

Benchmark `json-schema-ts` against other JSON Schema validators by running the entire JSON Schema Test Suite and measuring validation throughput.

## Goals

1. **Measure real-world performance** - Benchmark using the official test suite
2. **Compare against JSON Schema validators** - AJV, jsonschema, @cfworker/json-schema, djv
3. **Track regressions** - Detect performance changes across commits
4. **Per-keyword breakdown** - Identify which features are slow

## Non-Goals

- Benchmarking non-JSON-Schema libraries (Zod, TypeBox, Yup, etc.)
- Synthetic microbenchmarks with artificial data
- Benchmarking schema compilation (compile once, validate many)

---

## Research Summary

### How AJV Benchmarks

AJV references [json-schema-benchmark](https://github.com/ebdrup/json-schema-benchmark) which:
- Uses the official JSON Schema Test Suite as test data
- Only includes validators that pass correctness tests first
- Measures relative performance (fastest = 100%)
- Tests both valid and invalid data paths
- Compares: AJV, jsonschema, djv, @cfworker/json-schema, is-my-json-valid, z-schema, jsen

### Key Insight

The JSON Schema Test Suite is the ideal benchmark dataset because:
1. It's already in the project (`test-suite/tests/draft2020-12/`)
2. It covers all JSON Schema keywords comprehensively
3. It includes both valid and invalid test cases
4. It's what AJV and other validators use for benchmarking
5. Results are reproducible and comparable across validators

---

## Validators to Compare

All validators must:
- Accept standard JSON Schema as input
- Support draft2020-12 (or latest supported draft)

| Validator | Package | Draft Support | Notes |
|-----------|---------|---------------|-------|
| **json-schema-ts** | (local) | 2020-12 | Our validator |
| **AJV** | `ajv` | 2020-12 | Industry standard, JIT compiled |
| **jsonschema** | `jsonschema` | draft-07 | Pure interpreter, widely used |
| **@cfworker/json-schema** | `@cfworker/json-schema` | 2020-12 | Edge-runtime compatible |
| **djv** | `djv` | draft-06 | Fast, template-based |
| **@exodus/schemasafe** | `@exodus/schemasafe` | 2020-12 | Secure, no eval() |

---

## Implementation

### Directory Structure

```
benchmarks/
├── bench.ts              # Main benchmark runner
├── adapters/             # Validator wrappers
│   ├── json-schema-ts.ts
│   ├── ajv.ts
│   ├── jsonschema.ts
│   ├── cfworker.ts
│   ├── djv.ts
│   └── schemasafe.ts
└── results/              # JSON output for CI
    └── .gitkeep
```

### Benchmark Design

```typescript
// Each adapter implements this interface
interface ValidatorAdapter {
  name: string;
  compile(schema: unknown): (data: unknown) => boolean;
  // Returns a validate function
}

// Benchmark process:
// 1. Load all test files from JSON Schema Test Suite
// 2. For each validator:
//    a. Pre-compile all schemas (excluded from timing)
//    b. Warmup: run all validations 3 times
//    c. Timed: run all validations N iterations
//    d. Calculate ops/sec
```

### Key Design Decisions

1. **Pre-compile schemas** - Schema compilation is one-time; benchmark only validation
2. **Run full suite** - Every test case from every keyword file
3. **Multiple iterations** - Run suite 50-100 times, report median
4. **Warmup phase** - Discard first 3 runs for JIT optimization
5. **Track skipped tests** - Note when validators don't support certain features

---

## Output Format

### Console Output
```
json-schema-ts Benchmark (JSON Schema Test Suite draft2020-12)
==============================================================

Total: 1,247 test cases across 46 keyword files

Validator              ops/sec       relative    skipped
────────────────────────────────────────────────────────
ajv                   8,234,567      100.0%          0
@exodus/schemasafe    4,567,890       55.5%          0
@cfworker/json-schema 2,345,678       28.5%          0
json-schema-ts          456,789        5.5%         47
jsonschema              234,567        2.8%         89

Per-Keyword Breakdown (json-schema-ts):
───────────────────────────────────────
type                  1,234,567 ops/sec
const                 1,123,456 ops/sec
enum                    987,654 ops/sec
properties              890,123 ops/sec
...
unevaluatedProperties    23,456 ops/sec  ← slowest
```

### JSON Output (CI)
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "commit": "abc1234",
  "suite": "draft2020-12",
  "testCount": 1247,
  "results": {
    "json-schema-ts": {
      "opsPerSec": 456789,
      "skipped": 47,
      "byKeyword": {
        "type": 1234567,
        "properties": 890123
      }
    },
    "ajv": {
      "opsPerSec": 8234567,
      "skipped": 0,
      "byKeyword": {}
    }
  }
}
```

### NPM Scripts

```json
{
  "scripts": {
    "bench": "tsx benchmarks/bench.ts",
    "bench:json": "tsx benchmarks/bench.ts --json > benchmarks/results/latest.json"
  }
}
```

---

## Implementation Phases

### Phase 1: MVP
- [ ] Create benchmark runner infrastructure
- [ ] Implement json-schema-ts adapter
- [ ] Implement AJV adapter
- [ ] Console output with ops/sec comparison
- [ ] `npm run bench` script

### Phase 2: Expanded Validators
- [ ] Add jsonschema adapter
- [ ] Add @cfworker/json-schema adapter
- [ ] Add @exodus/schemasafe adapter
- [ ] Per-keyword breakdown reporting

### Phase 3: CI Integration
- [ ] JSON output format
- [ ] GitHub Actions workflow
- [ ] Compare vs main branch
- [ ] Regression alerts (>10% slowdown)
- [ ] PR comment with results

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Benchmark runs in | < 60 seconds |
| Validators compared | 4+ |
| Test coverage | All non-skipped test suite files |
| Reproducibility | ±5% variance between runs |

---

## Example Implementation

```typescript
// benchmarks/adapters/ajv.ts
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ajvAdapter = {
  name: 'ajv',
  compile(schema: unknown) {
    const ajv = new Ajv({ allErrors: false, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema as object);
    return (data: unknown) => validate(data) as boolean;
  },
};

// benchmarks/adapters/json-schema-ts.ts
import { Validator } from '../../src/validator.js';

export const jsonSchemaTsAdapter = {
  name: 'json-schema-ts',
  compile(schema: unknown) {
    const validator = new Validator(schema as JsonSchema);
    return (data: unknown) => validator.validate(data);
  },
};

// benchmarks/bench.ts
import { loadTestFiles } from '../tests/suite/loader.js';

const files = loadTestFiles({ includeOptional: false });
const adapters = [jsonSchemaTsAdapter, ajvAdapter];

for (const adapter of adapters) {
  // Pre-compile all schemas
  const compiled = files.flatMap(file =>
    file.groups.map(group => ({
      validator: adapter.compile(group.schema),
      tests: group.tests,
    }))
  );

  const totalTests = compiled.reduce((sum, c) => sum + c.tests.length, 0);

  // Warmup (3 iterations)
  for (let i = 0; i < 3; i++) {
    for (const { validator, tests } of compiled) {
      for (const test of tests) {
        validator(test.data);
      }
    }
  }

  // Timed run
  const iterations = 100;
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    for (const { validator, tests } of compiled) {
      for (const test of tests) {
        validator(test.data);
      }
    }
  }

  const elapsed = performance.now() - start;
  const totalValidations = totalTests * iterations;
  const opsPerSec = Math.round((totalValidations / elapsed) * 1000);

  console.log(`${adapter.name}: ${opsPerSec.toLocaleString()} ops/sec`);
}
```

---

## References

- [json-schema-benchmark](https://github.com/ebdrup/json-schema-benchmark) - Industry standard Node.js benchmark
- [AJV Performance](https://ajv.js.org/guide/why-ajv.html) - AJV's performance claims
- [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite) - Official test suite
- Existing infrastructure: [tests/suite/](tests/suite/)
