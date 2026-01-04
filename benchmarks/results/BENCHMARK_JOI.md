# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 44.6M | ⚠️ 3/20 | 29 | 333K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 52.4M | ⚠️ 2/23 | 9 | 436K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 49.3M | ⚠️ 2/24 | 9 | 446K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 41.9M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 45.6M | ⚠️ 4/33 | 31 | 913K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 46.2M | ⚠️ 14/133 | 105 | 562K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 101.94x faster (22 ns vs 2207 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 85.4M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 42.6M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 43.0M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 59.4M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 54.4M | ✅ | 515K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 40.1M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.2M | ✅ | 267K | 🟢 **-99%** |
| items.json | 2 | ✅ | 77.1M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 63.5M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 70.9M | ✅ | 303K | 🟢 **-100%** |
| oneOf.json | 12 | ✅ | 50.8M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 21.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.9M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 67.2M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 43.8M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 74.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 58.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 66.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 77.3M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 25.2M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 89.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 44.3M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 45.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 66.3M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 56.5M | ✅ | 531K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 92.2M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 38.1M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 40.2M | ✅ | 267K | 🟢 **-99%** |
| items.json | 4 | ✅ | 87.8M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 68.3M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 65.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 25.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.1M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 70.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 54.7M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 45.8M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 69.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 86.5M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 66.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 71.5M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 32.6M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 41.4M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 39.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 65.9M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 56.0M | ✅ | 545K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 92.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 39.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 84.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 40.3M | ✅ | 273K | 🟢 **-99%** |
| items.json | 4 | ✅ | 87.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 67.9M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 66.4M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 25.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 70.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.4M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 44.5M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 69.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 88.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 66.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 72.1M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 25.2M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 83.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 35.0M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 44.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 59.1M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 73.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 79.0M | ✅ | 4.1M | 🟢 **-95%** |
| default.json | 7 | ✅ | 55.1M | ✅ | 531K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 85.3M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 36.4M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 81.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.2M | ✅ | 271K | 🟢 **-99%** |
| items.json | 4 | ✅ | 79.9M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 85.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 86.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 63.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 74.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 63.7M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 21.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 67.0M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 85.5M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 43.4M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 65.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 80.5M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 57.8M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 31.8M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 61.9M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 71.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 73.6M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 68.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 31.4M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 55.4M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 33.1M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 41.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.9M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 65.7M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 72.0M | ✅ | 4.1M | 🟢 **-94%** |
| default.json | 7 | ✅ | 50.6M | ✅ | 528K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 77.3M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 73.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 30.6M | ✅ | 225K | 🟢 **-99%** |
| items.json | 3 | ✅ | 62.3M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 76.6M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.6M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 57.6M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 66.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 58.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.9M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 72.2M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.9M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 41.1M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 76.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 68.0M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 52.7M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 30.1M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 67.2M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 50.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 67.7M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 63.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.9M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.6M | ✅ | 538K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 50.6M | ⚠️ 2 fail | - | - |

