# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 41.8M | ⚠️ 3/20 | 29 | 339K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 40.5M | ⚠️ 2/23 | 9 | 438K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 36.9M | ⚠️ 2/24 | 9 | 448K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 36.4M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 42.3M | ⚠️ 4/33 | 31 | 943K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 39.3M | ⚠️ 14/133 | 105 | 570K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 85.04x faster (25 ns vs 2162 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 73.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.8M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 39.5M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 56.3M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 47.7M | ✅ | 523K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.6M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.2M | ✅ | 273K | 🟢 **-99%** |
| items.json | 2 | ✅ | 66.7M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.0M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 60.6M | ✅ | 309K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 47.7M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 31.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 20.8M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 37.1M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 59.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 53.7M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.7M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.3M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 56.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 36.9M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.2M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 51.8M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 59.6M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 44.7M | ✅ | 530K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 67.1M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 31.3M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.4M | ✅ | 273K | 🟢 **-99%** |
| items.json | 4 | ✅ | 56.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 48.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 58.4M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 45.1M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 14.8M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 55.0M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 66.4M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 33.5M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 51.8M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 58.3M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 50.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 51.3M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.9M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 59.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 27.9M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 30.7M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 41.1M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 56.5M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 39.1M | ✅ | 549K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 65.5M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.5M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 56.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 30.4M | ✅ | 273K | 🟢 **-99%** |
| items.json | 4 | ✅ | 59.3M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 47.6M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 41.4M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 55.5M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 66.5M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 29.2M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 54.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 52.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 46.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 50.3M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 23.6M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 32.2M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 37.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 51.8M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.1M | ✅ | 4.2M | 🟢 **-94%** |
| default.json | 7 | ✅ | 41.4M | ✅ | 516K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 71.4M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.4M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.1M | ✅ | 271K | 🟢 **-99%** |
| items.json | 4 | ✅ | 65.8M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 69.6M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 59.6M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 46.5M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.9M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 35.1M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 72.1M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 60.3M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 45.6M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 27.8M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 58.2M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 42.1M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.7M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 56.5M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.3M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 46.7M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 25.9M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 38.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.7M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.4M | ✅ | 4.4M | 🟢 **-93%** |
| default.json | 7 | ✅ | 49.0M | ✅ | 532K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 72.4M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.0M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.2M | ✅ | 237K | 🟢 **-99%** |
| items.json | 3 | ✅ | 72.7M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.0M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.2M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.5M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 55.2M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.9M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.4M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 37.6M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 57.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 63.0M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 48.3M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 26.1M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.1M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 49.7M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 56.0M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 57.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.8M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.7M | ✅ | 555K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.3M | ⚠️ 2 fail | - | - |

