# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 38.0M | ⚠️ 3/20 | 29 | 338K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 41.6M | ⚠️ 2/23 | 9 | 436K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 44.0M | ⚠️ 2/24 | 9 | 436K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 37.1M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 42.9M | ⚠️ 4/33 | 31 | 956K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 40.5M | ⚠️ 14/133 | 105 | 568K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 93.79x faster (25 ns vs 2314 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 56.7M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 35.3M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 36.3M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 47.7M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 43.7M | ✅ | 529K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 29.1M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 33.2M | ✅ | 276K | 🟢 **-99%** |
| items.json | 2 | ✅ | 54.6M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 47.2M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 54.4M | ✅ | 306K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 42.6M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 28.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.9M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 52.8M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 35.7M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 50.1M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 51.1M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 48.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 48.8M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.1M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 61.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 36.0M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.7M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 62.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 45.8M | ✅ | 524K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 69.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.1M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.0M | ✅ | 276K | 🟢 **-99%** |
| items.json | 4 | ✅ | 63.3M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.5M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 59.3M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 51.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.7M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 57.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.7M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 35.5M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 54.8M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 61.2M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 53.0M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.0M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 39.0M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 38.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 49.0M | ✅ | 534K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 61.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.9M | ✅ | 266K | 🟢 **-99%** |
| items.json | 4 | ✅ | 38.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 62.9M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 52.2M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 19.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 36.7M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 59.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 67.2M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 51.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 67.1M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.4M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 33.6M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 38.5M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.6M | ✅ | 4.1M | 🟢 **-94%** |
| default.json | 7 | ✅ | 48.7M | ✅ | 526K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 75.0M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.7M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.9M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.0M | ✅ | 269K | 🟢 **-99%** |
| items.json | 4 | ✅ | 69.7M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 75.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 73.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 62.5M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 55.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 71.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 36.6M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 75.9M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 47.8M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 29.1M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 62.4M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 49.7M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 59.4M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 48.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.3M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 47.4M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 30.4M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 38.0M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 56.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.4M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.8M | ✅ | 4.2M | 🟢 **-94%** |
| default.json | 7 | ✅ | 46.3M | ✅ | 536K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 76.8M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.6M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 67.3M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.2M | ✅ | 265K | 🟢 **-99%** |
| items.json | 3 | ✅ | 72.3M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 75.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 73.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 55.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.7M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 74.0M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 37.7M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 57.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 62.3M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 47.3M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 27.4M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 50.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 48.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 60.2M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 57.5M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.9M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.7M | ✅ | 531K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 48.1M | ⚠️ 2 fail | - | - |

