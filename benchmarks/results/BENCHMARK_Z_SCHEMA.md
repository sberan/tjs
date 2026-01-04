# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | z-schema files | z-schema tests | z-schema ops/s | tjs vs z-schema |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 34 | 697 | ✅ 34 | 697 | 32.8M | ⚠️ 30/34 | 581 | 1.1M | 🟢 **-97%** |
| draft2019-09 | 13 | 53 | ✅ 13 | 53 | 36.5M | ⚠️ 1/13 | 3 | 2.5M | 🟢 **-93%** |
| draft2020-12 | 13 | 53 | ✅ 13 | 53 | 38.6M | ⚠️ 2/13 | 4 | 1.5M | 🟢 **-96%** |
| **Total** | 60 | 803 | ✅ 60 | 803 | 33.3M | ⚠️ 33/60 | 588 | 1.1M | 🟢 **-97%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs z-schema**: 🟢 tjs is 34.32x faster (30 ns vs 1030 ns, 803 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 67.1M | ✅ | 1.2M | 🟢 **-98%** |
| additionalProperties.json | 16 | ✅ | 16.3M | ✅ | 995K | 🟢 **-94%** |
| allOf.json | 27 | ✅ | 53.2M | ✅ | 611K | 🟢 **-99%** |
| anyOf.json | 15 | ✅ | 60.8M | ✅ | 785K | 🟢 **-99%** |
| default.json | 7 | ✅ | 54.8M | ✅ | 1.4M | 🟢 **-97%** |
| definitions.json | 2 | ✅ | 12.7M | ✅ | 151K | 🟢 **-99%** |
| dependencies.json | 29 | ✅ | 32.2M | ✅ | 1.0M | 🟢 **-97%** |
| enum.json | 49 | ✅ | 41.8M | ✅ | 1.5M | 🟢 **-96%** |
| format.json | 36 | ✅ | 46.3M | ✅ | 2.9M | 🟢 **-94%** |
| infinite-loop-detection.json | 2 | ✅ | 43.3M | ✅ | 466K | 🟢 **-99%** |
| items.json | 21 | ✅ | 29.4M | ✅ | 405K | 🟢 **-99%** |
| maxItems.json | 4 | ✅ | 74.1M | ✅ | 2.5M | 🟢 **-97%** |
| maxLength.json | 5 | ✅ | 56.7M | ✅ | 2.6M | 🟢 **-95%** |
| maxProperties.json | 8 | ✅ | 54.2M | ✅ | 2.0M | 🟢 **-96%** |
| maximum.json | 14 | ✅ | 70.0M | ✅ | 1.9M | 🟢 **-97%** |
| minItems.json | 4 | ✅ | 74.3M | ✅ | 2.5M | 🟢 **-97%** |
| minLength.json | 5 | ✅ | 54.0M | ✅ | 2.0M | 🟢 **-96%** |
| minProperties.json | 6 | ✅ | 57.9M | ✅ | 2.4M | 🟢 **-96%** |
| minimum.json | 17 | ✅ | 70.5M | ✅ | 1.9M | 🟢 **-97%** |
| multipleOf.json | 10 | ✅ | 64.2M | ✅ | 1.5M | 🟢 **-98%** |
| not.json | 20 | ✅ | 70.8M | ✅ | 1.2M | 🟢 **-98%** |
| oneOf.json | 23 | ✅ | 56.4M | ✅ | 600K | 🟢 **-99%** |
| pattern.json | 9 | ✅ | 43.4M | ✅ | 2.4M | 🟢 **-95%** |
| patternProperties.json | 18 | ✅ | 17.1M | ✅ | 741K | 🟢 **-96%** |
| properties.json | 17 | ✅ | 29.4M | ⚠️ 1 fail | - | - |
| ref.json | 31 | ✅ | 32.5M | ⚠️ 7 fail | - | - |
| required.json | 8 | ✅ | 60.2M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 72.2M | ✅ | 1.4M | 🟢 **-98%** |
| uniqueItems.json | 69 | ✅ | 25.0M | ✅ | 1.5M | 🟢 **-94%** |
| optional/bignum.json | 9 | ✅ | 61.6M | ✅ | 1.5M | 🟢 **-97%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.8M | ⚠️ 10 fail | - | - |
| optional/format/email.json | 17 | ✅ | 18.9M | ✅ | 456K | 🟢 **-98%** |
| optional/format/hostname.json | 27 | ✅ | 11.1M | ✅ | 1.4M | 🟢 **-87%** |
| optional/format/ipv4.json | 16 | ✅ | 37.0M | ✅ | 1.6M | 🟢 **-96%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 1 | ✅ | 46.7M | ⚠️ 13 fail | - | - |
| additionalProperties.json | 4 | ✅ | 25.9M | ⚠️ 12 fail | - | - |
| allOf.json | 2 | ✅ | 57.8M | ⚠️ 10 fail | - | - |
| anyOf.json | 1 | ✅ | 56.1M | ⚠️ 12 fail | - | - |
| minContains.json | 4 | ✅ | 48.0M | ⚠️ 14 fail | - | - |
| multipleOf.json | 1 | ✅ | 50.5M | ⚠️ 6 fail | - | - |
| not.json | 18 | ✅ | 49.3M | ⚠️ 16 fail | - | - |
| oneOf.json | 3 | ✅ | 80.3M | ⚠️ 12 fail | - | - |
| ref.json | 2 | ✅ | 35.0M | ⚠️ 38 fail | - | - |
| unevaluatedItems.json | 3 | ✅ | 36.1M | ⚠️ 35 fail | - | - |
| unevaluatedProperties.json | 8 | ✅ | 17.1M | ⚠️ 63 fail | - | - |
| optional/bignum.json | 3 | ✅ | 50.0M | ⚠️ 6 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 56.4M | ✅ | 2.5M | 🟢 **-96%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 4 | ✅ | 28.1M | ⚠️ 12 fail | - | - |
| allOf.json | 2 | ✅ | 31.8M | ⚠️ 10 fail | - | - |
| anyOf.json | 1 | ✅ | 63.4M | ⚠️ 12 fail | - | - |
| minContains.json | 4 | ✅ | 52.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 1 | ✅ | 55.8M | ⚠️ 6 fail | - | - |
| not.json | 18 | ✅ | 56.8M | ⚠️ 16 fail | - | - |
| oneOf.json | 3 | ✅ | 64.2M | ⚠️ 12 fail | - | - |
| ref.json | 2 | ✅ | 41.2M | ⚠️ 37 fail | - | - |
| unevaluatedItems.json | 3 | ✅ | 37.6M | ⚠️ 42 fail | - | - |
| unevaluatedProperties.json | 8 | ✅ | 18.1M | ⚠️ 64 fail | - | - |
| optional/bignum.json | 3 | ✅ | 55.3M | ⚠️ 6 fail | - | - |
| optional/format/ecmascript-regex.json | 1 | ✅ | 47.1M | ✅ | 708K | 🟢 **-98%** |
| optional/no-schema.json | 3 | ✅ | 63.4M | ✅ | 2.5M | 🟢 **-96%** |

