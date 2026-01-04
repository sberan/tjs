# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 39.3M | ⚠️ 3/20 | 29 | 334K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 43.1M | ⚠️ 2/23 | 9 | 431K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 43.3M | ⚠️ 2/24 | 9 | 441K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 35.5M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 42.9M | ⚠️ 4/33 | 31 | 912K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 40.4M | ⚠️ 14/133 | 105 | 560K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 91.16x faster (25 ns vs 2256 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.6M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 39.4M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 33.9M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 52.4M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 48.3M | ✅ | 538K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 34.5M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.5M | ✅ | 274K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.6M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.8M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 60.9M | ✅ | 301K | 🟢 **-100%** |
| oneOf.json | 12 | ✅ | 52.9M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 24.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.8M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.5M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 40.4M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 65.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 52.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 56.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.5M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.1M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 20.7M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 56.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 49.2M | ✅ | 524K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.7M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.4M | ✅ | 265K | 🟢 **-99%** |
| items.json | 4 | ✅ | 69.1M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 55.8M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 52.1M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 59.2M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 37.3M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 57.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 65.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.5M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.6M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 60.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.3M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 34.8M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 47.2M | ✅ | 533K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 70.9M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.4M | ✅ | 275K | 🟢 **-99%** |
| items.json | 4 | ✅ | 67.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.5M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 54.2M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 54.2M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.2M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 49.5M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 35.3M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 57.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 61.8M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 55.8M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.0M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 59.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 32.0M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 37.2M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 52.7M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 62.0M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.4M | ✅ | 4.2M | 🟢 **-93%** |
| default.json | 7 | ✅ | 45.8M | ✅ | 509K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 69.8M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 31.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 63.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.9M | ✅ | 271K | 🟢 **-99%** |
| items.json | 4 | ✅ | 63.8M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 69.3M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 68.5M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 56.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 53.2M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.6M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 57.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.3M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 35.7M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 68.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 50.5M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 45.1M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.4M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 61.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 45.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 54.2M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 54.9M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.5M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.8M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 25.5M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 39.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.3M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.9M | ✅ | 4.2M | 🟢 **-93%** |
| default.json | 7 | ✅ | 46.6M | ✅ | 522K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 73.4M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 31.8M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.0M | ✅ | 223K | 🟢 **-99%** |
| items.json | 3 | ✅ | 69.6M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 72.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 71.5M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.2M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 59.6M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 54.7M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.9M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 62.7M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 70.8M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 36.5M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 72.8M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 62.0M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 47.6M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.5M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 62.6M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 53.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 59.5M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 56.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.9M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.4M | ✅ | 545K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 46.5M | ⚠️ 2 fail | - | - |

