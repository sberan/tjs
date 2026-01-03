# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 43.8M | ⚠️ 3/20 | 29 | 333K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 40.6M | ⚠️ 2/23 | 9 | 435K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 41.1M | ⚠️ 2/24 | 9 | 448K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 37.0M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 43.0M | ⚠️ 4/33 | 31 | 913K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 40.8M | ⚠️ 14/133 | 105 | 561K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 90.30x faster (25 ns vs 2215 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.7M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.6M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 39.0M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 53.1M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 46.7M | ✅ | 524K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 32.2M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.7M | ✅ | 274K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.8M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.2M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 59.0M | ✅ | 301K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 52.8M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 19.3M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 39.7M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 58.9M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 65.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 67.7M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.6M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 61.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.1M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.2M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 52.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 47.3M | ✅ | 526K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.3M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.9M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.7M | ✅ | 270K | 🟢 **-99%** |
| items.json | 4 | ✅ | 66.1M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.6M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 59.9M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 53.4M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 58.8M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.0M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 34.2M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 56.1M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 63.8M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 55.1M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.8M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.2M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 37.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 59.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 48.6M | ✅ | 545K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.2M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.4M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.7M | ✅ | 276K | 🟢 **-99%** |
| items.json | 4 | ✅ | 69.6M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.4M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 47.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 35.3M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 59.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 60.1M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 55.9M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.4M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 73.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 32.4M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 35.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 53.1M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.8M | ✅ | 4.3M | 🟢 **-93%** |
| default.json | 7 | ✅ | 45.2M | ✅ | 521K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 76.8M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.8M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.5M | ✅ | 265K | 🟢 **-99%** |
| items.json | 4 | ✅ | 69.7M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.6M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.1M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.2M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 55.1M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.8M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.4M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 37.2M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 76.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 63.4M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 45.2M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 29.1M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 48.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 60.1M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 58.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.0M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 47.3M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 32.4M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 39.0M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.5M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.9M | ✅ | 4.0M | 🟢 **-94%** |
| default.json | 7 | ✅ | 49.0M | ✅ | 520K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 76.7M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.8M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.2M | ✅ | 230K | 🟢 **-99%** |
| items.json | 3 | ✅ | 72.5M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 62.0M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 55.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 69.0M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 75.9M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 36.7M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 76.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 58.2M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 47.6M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.7M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 63.4M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 49.7M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 59.6M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 58.8M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.7M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.6M | ✅ | 548K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 46.8M | ⚠️ 2 fail | - | - |

