# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | z-schema files | z-schema tests | z-schema ops/s | tjs vs z-schema |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 34 | 697 | ✅ 34 | 697 | 32.4M | ⚠️ 30/34 | 581 | 1.1M | 🟢 **-97%** |
| draft2019-09 | 13 | 53 | ✅ 13 | 53 | 37.3M | ⚠️ 1/13 | 3 | 2.5M | 🟢 **-93%** |
| draft2020-12 | 13 | 53 | ✅ 13 | 53 | 39.6M | ⚠️ 2/13 | 4 | 1.6M | 🟢 **-96%** |
| **Total** | 60 | 803 | ✅ 60 | 803 | 33.1M | ⚠️ 33/60 | 588 | 1.1M | 🟢 **-97%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs z-schema**: 🟢 tjs is 33.96x faster (30 ns vs 1027 ns, 803 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 64.8M | ✅ | 1.2M | 🟢 **-98%** |
| additionalProperties.json | 16 | ✅ | 16.1M | ✅ | 998K | 🟢 **-94%** |
| allOf.json | 27 | ✅ | 51.9M | ✅ | 607K | 🟢 **-99%** |
| anyOf.json | 15 | ✅ | 54.8M | ✅ | 789K | 🟢 **-99%** |
| default.json | 7 | ✅ | 54.5M | ✅ | 1.4M | 🟢 **-97%** |
| definitions.json | 2 | ✅ | 12.5M | ✅ | 148K | 🟢 **-99%** |
| dependencies.json | 29 | ✅ | 30.0M | ✅ | 1.0M | 🟢 **-97%** |
| enum.json | 49 | ✅ | 39.7M | ✅ | 1.5M | 🟢 **-96%** |
| format.json | 36 | ✅ | 49.8M | ✅ | 3.0M | 🟢 **-94%** |
| infinite-loop-detection.json | 2 | ✅ | 43.2M | ✅ | 465K | 🟢 **-99%** |
| items.json | 21 | ✅ | 30.8M | ✅ | 406K | 🟢 **-99%** |
| maxItems.json | 4 | ✅ | 74.4M | ✅ | 2.4M | 🟢 **-97%** |
| maxLength.json | 5 | ✅ | 56.8M | ✅ | 2.6M | 🟢 **-95%** |
| maxProperties.json | 8 | ✅ | 52.7M | ✅ | 2.0M | 🟢 **-96%** |
| maximum.json | 14 | ✅ | 69.5M | ✅ | 1.9M | 🟢 **-97%** |
| minItems.json | 4 | ✅ | 74.5M | ✅ | 2.4M | 🟢 **-97%** |
| minLength.json | 5 | ✅ | 55.5M | ✅ | 2.0M | 🟢 **-96%** |
| minProperties.json | 6 | ✅ | 57.6M | ✅ | 2.4M | 🟢 **-96%** |
| minimum.json | 17 | ✅ | 78.5M | ✅ | 1.9M | 🟢 **-98%** |
| multipleOf.json | 10 | ✅ | 64.6M | ✅ | 1.4M | 🟢 **-98%** |
| not.json | 20 | ✅ | 70.5M | ✅ | 1.2M | 🟢 **-98%** |
| oneOf.json | 23 | ✅ | 54.4M | ✅ | 601K | 🟢 **-99%** |
| pattern.json | 9 | ✅ | 45.1M | ✅ | 2.5M | 🟢 **-95%** |
| patternProperties.json | 18 | ✅ | 16.0M | ✅ | 753K | 🟢 **-95%** |
| properties.json | 17 | ✅ | 28.1M | ⚠️ 1 fail | - | - |
| ref.json | 31 | ✅ | 36.8M | ⚠️ 7 fail | - | - |
| required.json | 8 | ✅ | 59.2M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 70.5M | ✅ | 1.4M | 🟢 **-98%** |
| uniqueItems.json | 69 | ✅ | 23.8M | ✅ | 1.5M | 🟢 **-94%** |
| optional/bignum.json | 9 | ✅ | 62.0M | ✅ | 1.6M | 🟢 **-97%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.5M | ⚠️ 10 fail | - | - |
| optional/format/email.json | 17 | ✅ | 18.9M | ✅ | 461K | 🟢 **-98%** |
| optional/format/hostname.json | 27 | ✅ | 11.1M | ✅ | 1.4M | 🟢 **-87%** |
| optional/format/ipv4.json | 16 | ✅ | 41.5M | ✅ | 1.5M | 🟢 **-96%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 1 | ✅ | 49.6M | ⚠️ 13 fail | - | - |
| additionalProperties.json | 4 | ✅ | 23.8M | ⚠️ 12 fail | - | - |
| allOf.json | 2 | ✅ | 62.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 1 | ✅ | 61.1M | ⚠️ 12 fail | - | - |
| minContains.json | 4 | ✅ | 50.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 1 | ✅ | 54.0M | ⚠️ 6 fail | - | - |
| not.json | 18 | ✅ | 52.9M | ⚠️ 16 fail | - | - |
| oneOf.json | 3 | ✅ | 61.4M | ⚠️ 12 fail | - | - |
| ref.json | 2 | ✅ | 36.8M | ⚠️ 38 fail | - | - |
| unevaluatedItems.json | 3 | ✅ | 37.4M | ⚠️ 35 fail | - | - |
| unevaluatedProperties.json | 8 | ✅ | 17.6M | ⚠️ 63 fail | - | - |
| optional/bignum.json | 3 | ✅ | 53.1M | ⚠️ 6 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 60.9M | ✅ | 2.5M | 🟢 **-96%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 4 | ✅ | 28.4M | ⚠️ 12 fail | - | - |
| allOf.json | 2 | ✅ | 93.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 1 | ✅ | 63.5M | ⚠️ 12 fail | - | - |
| minContains.json | 4 | ✅ | 51.9M | ⚠️ 14 fail | - | - |
| multipleOf.json | 1 | ✅ | 55.8M | ⚠️ 6 fail | - | - |
| not.json | 18 | ✅ | 57.0M | ⚠️ 16 fail | - | - |
| oneOf.json | 3 | ✅ | 65.9M | ⚠️ 12 fail | - | - |
| ref.json | 2 | ✅ | 42.3M | ⚠️ 37 fail | - | - |
| unevaluatedItems.json | 3 | ✅ | 39.0M | ⚠️ 42 fail | - | - |
| unevaluatedProperties.json | 8 | ✅ | 18.2M | ⚠️ 64 fail | - | - |
| optional/bignum.json | 3 | ✅ | 53.9M | ⚠️ 6 fail | - | - |
| optional/format/ecmascript-regex.json | 1 | ✅ | 24.8M | ✅ | 707K | 🟢 **-97%** |
| optional/no-schema.json | 3 | ✅ | 65.4M | ✅ | 2.6M | 🟢 **-96%** |

