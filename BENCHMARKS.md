# Benchmarks

Performance comparison of **tjs** against all major JSON Schema validators using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

Head-to-head performance comparison (tjs vs each validator). Only test groups where **both** validators pass all tests are included in performance metrics.

| Validator | Compliance | ops/s | vs tjs |
|-----------|----------:|------:|-------:|
| [tjs](https://github.com/sberan/tjs) | 100% | 21.6M | - |
| [ajv](https://ajv.js.org/) | 95% | 8.6M | 2.5x slower |
| [zod](https://zod.dev/) | 59% | 169K | 128.1x slower |
| [joi](https://joi.dev/) | 58% | 430K | 50.4x slower |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | 81% | 17.8M | 1.2x slower |
| [z-schema](https://github.com/zaggino/z-schema) | 52% | 795K | 27.2x slower |
| [djv](https://github.com/korzio/djv) | 76% | 4.1M | 5.3x slower |
| [jsen](https://github.com/bugventure/jsen) | 76% | 16.8M | 1.3x slower |
| [@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe) | 90% | 18.8M | 1.1x slower |

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
| draft4 | 34 | 73 | 7068 | 2393 | 67 | 1193 | 289 | 67 | 47 |
| draft6 | 30 | 66 | 6663 | 2643 | 64 | - | 275 | 64 | 43 |
| draft7 | 61 | 77 | 5838 | 2135 | 54 | - | 251 | 59 | 47 |
| draft2019-09 | 48 | 168 | 5365 | 2335 | 49 | 1492 | 216 | 55 | 56 |
| draft2020-12 | 48 | 147 | 5289 | 2182 | 50 | 1874 | 215 | 56 | 65 |

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

All validators are configured to report the **first validation error** (not all errors). This ensures a fair comparison since tjs always provides detailed error objects.

Benchmarks are run using [mitata](https://github.com/evanwashere/mitata) with:
- Minimum 50ms CPU time per benchmark
- Minimum 50 samples
- Warm-up phase before measurements
- Isolated process per validator to prevent JIT/cache interference
