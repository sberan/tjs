# Benchmarks

Performance comparison of **tjs** against all major JSON Schema validators using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

Head-to-head performance comparison (tjs vs each validator). Only test groups where **both** validators pass all tests are included in performance metrics.

| Validator | Compliance | ops/s | vs tjs |
|-----------|----------:|------:|-------:|
| [tjs](https://github.com/sberan/tjs) | 100% | 20.7M | - |
| [ajv](https://ajv.js.org/) | 95% | 9.0M | 🟢 2.3x slower |
| [zod](https://zod.dev/) | 59% | 167K | 🟢 124.3x slower |
| [joi](https://joi.dev/) | 58% | 450K | 🟢 46.1x slower |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | 81% | 17.2M | 🟢 1.2x slower |
| [z-schema](https://github.com/zaggino/z-schema) | 52% | 795K | 🟢 26.1x slower |
| [djv](https://github.com/korzio/djv) | 76% | 4.1M | 🟢 5.1x slower |
| [jsen](https://github.com/bugventure/jsen) | 76% | 16.6M | 🟢 1.2x slower |
| [@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe) | 90% | 19.1M | 🟢 1.1x slower |

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
| draft4 | 35 | 74 | 6860 | 2261 | 65 | 1187 | 289 | 66 | 46 |
| draft6 | 34 | 66 | 7056 | 2452 | 63 | - | 275 | 69 | 42 |
| draft7 | 61 | 75 | 5984 | 2155 | 54 | - | 249 | 60 | 48 |
| draft2019-09 | 51 | 151 | 5390 | 2115 | 51 | 1496 | 216 | 55 | 53 |
| draft2020-12 | 50 | 147 | 5282 | 2184 | 59 | 1939 | 216 | 54 | 66 |

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

All validators are configured to report the **first validation error** (not all errors). This ensures a fair comparison since tjs always provides detailed error objects.

Benchmarks are run using [mitata](https://github.com/evanwashere/mitata) with:
- Minimum 50ms CPU time per benchmark
- Minimum 50 samples
- Warm-up phase before measurements
- Isolated process per validator to prevent JIT/cache interference
