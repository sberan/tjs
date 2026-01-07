# Benchmarks

Performance comparison of **tjs** against all major JSON Schema validators using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

Head-to-head performance comparison (tjs vs each validator). Only test groups where **both** validators pass all tests are included in performance metrics.

| Validator | Compliance | ops/s | vs tjs |
|-----------|----------:|------:|-------:|
| [tjs](https://github.com/sberan/tjs) | 100% | 6.9M | - |
| [ajv](https://ajv.js.org/) | 95% | 357K | 🟢 19.3x slower |
| [zod](https://zod.dev/) | 59% | 35K | 🟢 195.6x slower |
| [joi](https://joi.dev/) | 58% | 276K | 🟢 25.0x slower |
| [jsonschema](https://www.npmjs.com/package/jsonschema) | 87% | 47K | 🟢 145.2x slower |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | 81% | 3.3M | 🟢 2.1x slower |
| [djv](https://github.com/korzio/djv) | 76% | 1.7M | 🟢 4.0x slower |
| [jsen](https://github.com/bugventure/jsen) | 76% | 2.4M | 🟢 2.8x slower |
| [@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe) | 90% | 2.6M | 🟢 2.7x slower |

## Performance Chart

![Benchmark](assets/benchmark.svg)

## Detailed Reports

Click on a validator below to see the full benchmark report:

- [**tjs vs ajv**](benchmarks/results/BENCHMARK_AJV.md) - The fastest JSON Schema validator (until now)
- [**tjs vs zod**](benchmarks/results/BENCHMARK_ZOD.md) - TypeScript-first schema validation
- [**tjs vs joi**](benchmarks/results/BENCHMARK_JOI.md) - Object schema validation (via enjoi)
- [**tjs vs jsonschema**](benchmarks/results/BENCHMARK_JSONSCHEMA.md) - Simple and lightweight validator
- [**tjs vs is-my-json-valid**](benchmarks/results/BENCHMARK_IS_MY_JSON_VALID.md) - Code-generation based validator
- [**tjs vs djv**](benchmarks/results/BENCHMARK_DJV.md) - Dynamic JSON Schema Validator
- [**tjs vs jsen**](benchmarks/results/BENCHMARK_JSEN.md) - JSON Sentinel, built for speed
- [**tjs vs @exodus/schemasafe**](benchmarks/results/BENCHMARK_SCHEMASAFE.md) - Safe JSON Schema validator with code generation

## Performance by Draft

Average nanoseconds per test for each JSON Schema draft version (lower is better):

| Draft | tjs | ajv | zod | joi | jsonschema | is-my-json-valid | djv | jsen | schemasafe |
|-------|----:|----:|----:|----:|----:|----:|----:|----:|----:|
| draft4 | 119 | 466 | 65254 | 4193 | 19898 | 341 | 666 | 490 | 354 |
| draft6 | 111 | 484 | 17638 | 3323 | 17083 | 318 | 633 | 443 | 348 |
| draft7 | 145 | 436 | 47384 | 3316 | 27294 | 316 | 620 | 425 | 326 |
| draft2019-09 | 161 | 9221 | 14742 | 3762 | 13442 | 272 | 530 | 370 | 411 |
| draft2020-12 | 162 | 795 | 11864 | 3588 | 27747 | 292 | 526 | 357 | 453 |

## Error Validation Summary

Summary of cases where validator results did not match expected error states (expected error but got none, or expected no error but got one):

| Validator | Missing Errors | False Errors | Total Mismatches |
|-----------|---------------:|-------------:|-----------------:|
| [tjs](https://github.com/sberan/tjs) | 1 | 0 | **1** |
| [ajv](https://ajv.js.org/) | 232 | 95 | **327** |
| [zod](https://zod.dev/) | 1877 | 692 | **2569** |
| [joi](https://joi.dev/) | 1579 | 1313 | **2892** |
| [jsonschema](https://www.npmjs.com/package/jsonschema) | 547 | 259 | **806** |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | 1286 | 158 | **1444** |
| [djv](https://github.com/korzio/djv) | 775 | 869 | **1644** |
| [jsen](https://github.com/bugventure/jsen) | 1211 | 377 | **1588** |
| [@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe) | 89 | 427 | **516** |

- **Missing Errors**: Data was invalid but validator returned `true` (passed) - failed to catch invalid data
- **False Errors**: Data was valid but validator returned `false` (failed) - incorrectly rejected valid data

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

All validators are configured to report the **first validation error** (not all errors). This ensures a fair comparison since tjs always provides detailed error objects.

Benchmarks are run using [mitata](https://github.com/evanwashere/mitata) with:
- Minimum 50ms CPU time per benchmark
- Minimum 50 samples
- Warm-up phase before measurements
- Isolated process per validator to prevent JIT/cache interference
