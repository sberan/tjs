# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | z-schema files | z-schema tests | z-schema ops/s | tjs vs z-schema |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 34 | 697 | ✅ 34 | 697 | 30.3M | ⚠️ 30/34 | 581 | 1.1M | 🟢 **-96%** |
| draft2019-09 | 13 | 53 | ✅ 13 | 53 | 34.5M | ⚠️ 1/13 | 3 | 2.5M | 🟢 **-93%** |
| draft2020-12 | 13 | 53 | ✅ 13 | 53 | 34.4M | ⚠️ 2/13 | 4 | 1.6M | 🟢 **-95%** |
| **Total** | 60 | 803 | ✅ 60 | 803 | 30.8M | ⚠️ 33/60 | 588 | 1.1M | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs z-schema**: 🟢 tjs is 31.51x faster (32 ns vs 1022 ns, 803 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 58.7M | ✅ | 1.2M | 🟢 **-98%** |
| additionalProperties.json | 16 | ✅ | 15.5M | ✅ | 997K | 🟢 **-94%** |
| allOf.json | 27 | ✅ | 46.7M | ✅ | 618K | 🟢 **-99%** |
| anyOf.json | 15 | ✅ | 53.7M | ✅ | 787K | 🟢 **-99%** |
| default.json | 7 | ✅ | 44.8M | ✅ | 1.4M | 🟢 **-97%** |
| definitions.json | 2 | ✅ | 13.5M | ✅ | 150K | 🟢 **-99%** |
| dependencies.json | 29 | ✅ | 29.0M | ✅ | 1.0M | 🟢 **-96%** |
| enum.json | 49 | ✅ | 35.4M | ✅ | 1.5M | 🟢 **-96%** |
| format.json | 36 | ✅ | 46.8M | ✅ | 3.1M | 🟢 **-93%** |
| infinite-loop-detection.json | 2 | ✅ | 36.4M | ✅ | 470K | 🟢 **-99%** |
| items.json | 21 | ✅ | 27.4M | ✅ | 404K | 🟢 **-99%** |
| maxItems.json | 4 | ✅ | 65.7M | ✅ | 2.5M | 🟢 **-96%** |
| maxLength.json | 5 | ✅ | 51.8M | ✅ | 2.6M | 🟢 **-95%** |
| maxProperties.json | 8 | ✅ | 47.8M | ✅ | 2.0M | 🟢 **-96%** |
| maximum.json | 14 | ✅ | 59.3M | ✅ | 1.9M | 🟢 **-97%** |
| minItems.json | 4 | ✅ | 64.9M | ✅ | 2.5M | 🟢 **-96%** |
| minLength.json | 5 | ✅ | 56.2M | ✅ | 2.1M | 🟢 **-96%** |
| minProperties.json | 6 | ✅ | 50.6M | ✅ | 2.4M | 🟢 **-95%** |
| minimum.json | 17 | ✅ | 66.4M | ✅ | 1.9M | 🟢 **-97%** |
| multipleOf.json | 10 | ✅ | 57.3M | ✅ | 1.5M | 🟢 **-97%** |
| not.json | 20 | ✅ | 60.4M | ✅ | 1.2M | 🟢 **-98%** |
| oneOf.json | 23 | ✅ | 48.6M | ✅ | 605K | 🟢 **-99%** |
| pattern.json | 9 | ✅ | 42.2M | ✅ | 2.4M | 🟢 **-94%** |
| patternProperties.json | 18 | ✅ | 15.4M | ✅ | 755K | 🟢 **-95%** |
| properties.json | 17 | ✅ | 26.1M | ⚠️ 1 fail | - | - |
| ref.json | 31 | ✅ | 32.5M | ⚠️ 7 fail | - | - |
| required.json | 8 | ✅ | 51.4M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 57.8M | ✅ | 1.4M | 🟢 **-98%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 1.5M | 🟢 **-94%** |
| optional/bignum.json | 9 | ✅ | 51.5M | ✅ | 1.6M | 🟢 **-97%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.0M | ⚠️ 10 fail | - | - |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 470K | 🟢 **-97%** |
| optional/format/hostname.json | 27 | ✅ | 10.9M | ✅ | 1.4M | 🟢 **-87%** |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ✅ | 1.6M | 🟢 **-95%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 1 | ✅ | 47.5M | ⚠️ 13 fail | - | - |
| additionalProperties.json | 4 | ✅ | 24.7M | ⚠️ 12 fail | - | - |
| allOf.json | 2 | ✅ | 29.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 1 | ✅ | 56.7M | ⚠️ 12 fail | - | - |
| minContains.json | 4 | ✅ | 47.9M | ⚠️ 14 fail | - | - |
| multipleOf.json | 1 | ✅ | 50.5M | ⚠️ 6 fail | - | - |
| not.json | 18 | ✅ | 49.7M | ⚠️ 16 fail | - | - |
| oneOf.json | 3 | ✅ | 55.2M | ⚠️ 12 fail | - | - |
| ref.json | 2 | ✅ | 34.5M | ⚠️ 38 fail | - | - |
| unevaluatedItems.json | 3 | ✅ | 34.8M | ⚠️ 35 fail | - | - |
| unevaluatedProperties.json | 8 | ✅ | 16.5M | ⚠️ 63 fail | - | - |
| optional/bignum.json | 3 | ✅ | 47.7M | ⚠️ 6 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 55.1M | ✅ | 2.5M | 🟢 **-95%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 4 | ✅ | 25.4M | ⚠️ 12 fail | - | - |
| allOf.json | 2 | ✅ | 63.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 1 | ✅ | 52.9M | ⚠️ 12 fail | - | - |
| minContains.json | 4 | ✅ | 44.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 1 | ✅ | 47.5M | ⚠️ 6 fail | - | - |
| not.json | 18 | ✅ | 47.4M | ⚠️ 16 fail | - | - |
| oneOf.json | 3 | ✅ | 51.5M | ⚠️ 12 fail | - | - |
| ref.json | 2 | ✅ | 33.3M | ⚠️ 37 fail | - | - |
| unevaluatedItems.json | 3 | ✅ | 32.0M | ⚠️ 42 fail | - | - |
| unevaluatedProperties.json | 8 | ✅ | 16.8M | ⚠️ 64 fail | - | - |
| optional/bignum.json | 3 | ✅ | 44.5M | ⚠️ 6 fail | - | - |
| optional/format/ecmascript-regex.json | 1 | ✅ | 39.1M | ✅ | 731K | 🟢 **-98%** |
| optional/no-schema.json | 3 | ✅ | 48.8M | ✅ | 2.6M | 🟢 **-95%** |

