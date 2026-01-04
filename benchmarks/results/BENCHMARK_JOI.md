# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 46.2M | ⚠️ 3/20 | 29 | 345K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 45.0M | ⚠️ 2/23 | 9 | 420K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 52.8M | ⚠️ 2/24 | 9 | 442K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 41.7M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 46.8M | ⚠️ 4/33 | 31 | 947K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 46.0M | ⚠️ 14/133 | 105 | 574K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 102.09x faster (22 ns vs 2219 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 80.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 34.1M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 34.6M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 55.9M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 47.8M | ✅ | 558K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 37.9M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 33.7M | ✅ | 277K | 🟢 **-99%** |
| items.json | 2 | ✅ | 78.1M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 69.6M | ✅ | 311K | 🟢 **-100%** |
| oneOf.json | 12 | ✅ | 56.9M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 26.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 19.3M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 68.5M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 44.8M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 73.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 57.2M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 66.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 65.7M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 33.5M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 73.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 19.9M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 43.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 60.2M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 70.4M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 52.3M | ✅ | 506K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 81.0M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 37.0M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.0M | ✅ | 264K | 🟢 **-99%** |
| items.json | 4 | ✅ | 75.9M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 60.9M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 60.8M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 61.5M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.7M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 63.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 59.4M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 41.6M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 62.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 78.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 61.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 63.9M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 24.2M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 89.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 41.0M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 44.0M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 61.7M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 39.7M | ✅ | 534K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 92.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 39.7M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 84.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 57.7M | ✅ | 276K | 🟢 **-100%** |
| items.json | 4 | ✅ | 88.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 73.8M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 66.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 25.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.1M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 70.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.9M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 46.1M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 69.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 87.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 67.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 72.4M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 31.6M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 77.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 34.9M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 45.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 63.2M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 73.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 80.1M | ✅ | 4.3M | 🟢 **-95%** |
| default.json | 7 | ✅ | 54.7M | ✅ | 544K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 86.5M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 38.0M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 80.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ✅ | 274K | 🟢 **-99%** |
| items.json | 4 | ✅ | 79.4M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 85.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 87.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 63.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 71.6M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 63.9M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 13.0M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 67.0M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 85.5M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 45.2M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 85.4M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 80.6M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 56.5M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 31.2M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 63.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 70.3M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 65.4M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 81.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.3M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 55.3M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 33.7M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 42.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 57.7M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 70.4M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 71.1M | ✅ | 4.3M | 🟢 **-94%** |
| default.json | 7 | ✅ | 51.3M | ✅ | 541K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 81.3M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 37.6M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 74.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 37.9M | ✅ | 236K | 🟢 **-99%** |
| items.json | 3 | ✅ | 77.9M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 80.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 79.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 66.2M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 59.4M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.7M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 75.2M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 64.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 80.3M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 43.2M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 80.4M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 71.7M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 53.0M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 30.1M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 66.4M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 52.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 64.9M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 66.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.5M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 23.2M | ✅ | 558K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 52.2M | ⚠️ 2 fail | - | - |

