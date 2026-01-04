# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 41.8M | ⚠️ 3/20 | 29 | 334K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 39.8M | ⚠️ 2/23 | 9 | 438K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 44.3M | ⚠️ 2/24 | 9 | 434K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 33.6M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 41.9M | ⚠️ 4/33 | 31 | 947K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 39.6M | ⚠️ 14/133 | 105 | 565K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 92.53x faster (25 ns vs 2338 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 36.6M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 37.3M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 53.1M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 48.4M | ✅ | 535K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.6M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.5M | ✅ | 271K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.9M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 52.5M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 59.8M | ✅ | 302K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 46.9M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 24.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.5M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 41.9M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 59.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 52.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.6M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.1M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 73.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.3M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 37.7M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.9M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 49.0M | ✅ | 533K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.3M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.0M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.3M | ✅ | 270K | 🟢 **-99%** |
| items.json | 4 | ✅ | 37.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.1M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 62.4M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 55.7M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 22.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 20.0M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 75.3M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 35.9M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 57.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 53.5M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 53.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.1M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.5M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.2M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 58.8M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 48.3M | ✅ | 524K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 77.0M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.5M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 67.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 45.8M | ✅ | 270K | 🟢 **-99%** |
| items.json | 4 | ✅ | 64.3M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 62.0M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 55.4M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.1M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 37.1M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 58.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 64.7M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 50.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.4M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.6M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 59.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 25.7M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 33.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 50.5M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 58.9M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 61.8M | ✅ | 4.1M | 🟢 **-93%** |
| default.json | 7 | ✅ | 44.6M | ✅ | 532K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 65.3M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 29.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 58.1M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 33.5M | ✅ | 270K | 🟢 **-99%** |
| items.json | 4 | ✅ | 58.3M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 55.9M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 64.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 48.7M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 58.1M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 50.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.7M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 55.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 65.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 33.7M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 52.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 56.5M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 37.7M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 26.9M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 50.9M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 41.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 50.8M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 46.8M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 24.4M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 44.2M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 28.9M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 39.5M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.0M | ✅ | 4.3M | 🟢 **-93%** |
| default.json | 7 | ✅ | 46.9M | ✅ | 513K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 69.9M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 31.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.3M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.6M | ✅ | 267K | 🟢 **-99%** |
| items.json | 3 | ✅ | 69.5M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 72.8M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 71.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.6M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 60.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 47.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.0M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 65.1M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 59.5M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.0M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 38.2M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 55.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 61.7M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 44.0M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 26.4M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 47.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 54.3M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 56.7M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.4M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.5M | ✅ | 542K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.4M | ⚠️ 2 fail | - | - |

