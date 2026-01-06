# Benchmarks

Performance comparison of **tjs** against all major JSON Schema validators using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

Head-to-head performance comparison (tjs vs each validator). Only test groups where **both** validators pass all tests are included in performance metrics.

| Validator | Compliance | ops/s | vs tjs |
|-----------|----------:|------:|-------:|
| [tjs](https://github.com/sberan/tjs) | 100% | 19.9M | - |
| [ajv](https://ajv.js.org/) | 95% | 9.0M | 2.2x slower |
| [zod](https://zod.dev/) | 59% | 167K | 119.4x slower |
| [joi](https://joi.dev/) | 58% | 443K | 44.9x slower |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | 81% | 17.8M | 1.1x slower |
| [z-schema](https://github.com/zaggino/z-schema) | 52% | 795K | 25.0x slower |
| [djv](https://github.com/korzio/djv) | 76% | 4.2M | 4.8x slower |
| [jsen](https://github.com/bugventure/jsen) | 76% | 16.7M | 1.2x slower |
| [@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe) | 90% | 19.1M | 1.0x slower |

## Performance Chart

![Benchmark](assets/benchmark.svg)

## Detailed Reports

Click on a validator below to see the full benchmark report:

- [**tjs vs ajv**](benchmarks/results/BENCHMARK_AJV.md) - The fastest JSON Schema validator (until now)
- [**tjs vs zod**](benchmarks/results/BENCHMARK_ZOD.md) - TypeScript-first schema validation
- [**tjs vs joi**](benchmarks/results/BENCHMARK_JOI.md) - Object schema validation (via enjoi)
- [**tjs vs is-my-json-valid**](benchmarks/results/BENCHMARK_IS_MY_JSON_VALID.md) - Code-generation based validator
- [**tjs vs z-schema**](benchmarks/results/BENCHMARK_Z_SCHEMA.md) - JSON Schema validator with async support
- [**tjs vs djv**](benchmarks/results/BENCHMARK_DJV.md) - Dynamic JSON Schema Validator
- [**tjs vs jsen**](benchmarks/results/BENCHMARK_JSEN.md) - JSON Sentinel, built for speed
- [**tjs vs @exodus/schemasafe**](benchmarks/results/BENCHMARK_SCHEMASAFE.md) - Safe JSON Schema validator with code generation

## Performance by Draft

Average nanoseconds per test for each JSON Schema draft version (lower is better):

| Draft | tjs | ajv | zod | joi | is-my-json-valid | z-schema | djv | jsen | schemasafe |
|-------|----:|----:|----:|----:|----:|----:|----:|----:|----:|
| draft4 | 37 | 74 | 7079 | 2553 | 66 | 1190 | 296 | 66 | 46 |
| draft6 | 34 | 67 | 6669 | 2436 | 64 | - | 257 | 64 | 43 |
| draft7 | 64 | 75 | 6138 | 2085 | 54 | - | 248 | 58 | 48 |
| draft2019-09 | 53 | 151 | 5441 | 2240 | 50 | 1479 | 205 | 57 | 53 |
| draft2020-12 | 52 | 146 | 5281 | 2075 | 50 | 1934 | 216 | 56 | 65 |

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

All validators are configured to report the **first validation error** (not all errors). This ensures a fair comparison since tjs always provides detailed error objects.

Benchmarks are run using [mitata](https://github.com/evanwashere/mitata) with:
- Minimum 50ms CPU time per benchmark
- Minimum 50 samples
- Warm-up phase before measurements
- Isolated process per validator to prevent JIT/cache interference
