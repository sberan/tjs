# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 38.9M | ⚠️ 3/20 | 29 | 342K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 39.4M | ⚠️ 2/23 | 9 | 441K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 42.5M | ⚠️ 2/24 | 9 | 443K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 36.0M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 41.3M | ⚠️ 4/33 | 31 | 966K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 39.4M | ⚠️ 14/133 | 105 | 576K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 82.30x faster (25 ns vs 2089 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.4M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 36.6M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 38.3M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 47.5M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 48.6M | ✅ | 539K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.9M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.3M | ✅ | 275K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.5M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.5M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 60.5M | ✅ | 310K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 45.6M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 23.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.9M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 41.0M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 59.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 51.2M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.7M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.4M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 37.7M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 36.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.1M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 48.5M | ✅ | 533K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 34.6M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.1M | ✅ | 274K | 🟢 **-99%** |
| items.json | 4 | ✅ | 69.7M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.8M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 49.6M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 53.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 36.2M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 58.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 50.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 54.7M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.3M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 37.7M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.9M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 44.0M | ✅ | 538K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.7M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 64.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.3M | ✅ | 273K | 🟢 **-99%** |
| items.json | 4 | ✅ | 70.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.9M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 62.6M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 46.5M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.0M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 35.7M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 59.4M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 67.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.9M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 25.2M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 62.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 31.7M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 35.8M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.7M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.5M | ✅ | 4.3M | 🟢 **-93%** |
| default.json | 7 | ✅ | 48.7M | ✅ | 534K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 74.7M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 64.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.7M | ✅ | 275K | 🟢 **-99%** |
| items.json | 4 | ✅ | 69.2M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 74.8M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 68.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 60.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 46.5M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 20.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 74.7M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 39.7M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 58.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 49.9M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 46.4M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.6M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.4M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 30.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 56.0M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 49.4M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.4M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 44.6M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 27.7M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 35.7M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.2M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.1M | ✅ | 4.2M | 🟢 **-94%** |
| default.json | 7 | ✅ | 47.0M | ✅ | 532K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 76.6M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 35.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.0M | ✅ | 274K | 🟢 **-99%** |
| items.json | 3 | ✅ | 71.9M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 75.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 64.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 57.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 45.9M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 69.0M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.8M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 39.1M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 76.4M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 46.1M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 43.5M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.0M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 61.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.4M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 57.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.5M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 20.6M | ✅ | 547K | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.8M | ⚠️ 2 fail | - | - |

