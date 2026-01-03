# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 38.0M | ⚠️ 3/20 | 29 | 336K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 38.0M | ⚠️ 2/23 | 9 | 426K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 38.6M | ⚠️ 2/24 | 9 | 435K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 36.0M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 39.6M | ⚠️ 4/33 | 31 | 971K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 38.0M | ⚠️ 14/133 | 105 | 567K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 81.91x faster (26 ns vs 2158 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.9M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 37.7M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 35.6M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 51.8M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 46.8M | ✅ | 528K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 32.8M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.2M | ✅ | 264K | 🟢 **-99%** |
| items.json | 2 | ✅ | 63.9M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.4M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 58.4M | ✅ | 305K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 52.2M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 23.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.3M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 37.4M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 56.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 48.2M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 52.2M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.2M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 62.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 37.7M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 36.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.2M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 47.0M | ✅ | 528K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 70.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.4M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 32.9M | ✅ | 253K | 🟢 **-99%** |
| items.json | 4 | ✅ | 67.1M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 59.5M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 46.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.1M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.7M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 34.2M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 56.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 50.8M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 54.1M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 20.0M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 63.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.2M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.7M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.4M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 45.5M | ✅ | 544K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.2M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.4M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 19.2M | ✅ | 257K | 🟢 **-99%** |
| items.json | 4 | ✅ | 64.7M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 55.9M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 47.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 20.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.8M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 36.2M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 56.9M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 46.3M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 53.6M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.1M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 33.0M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 36.2M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.5M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.1M | ✅ | 4.3M | 🟢 **-93%** |
| default.json | 7 | ✅ | 44.7M | ✅ | 546K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 73.2M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.5M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 60.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.4M | ✅ | 251K | 🟢 **-99%** |
| items.json | 4 | ✅ | 66.7M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 57.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 71.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 52.2M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 57.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 47.2M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 14.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 71.9M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 37.1M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 72.9M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 49.7M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 47.3M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.1M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 62.3M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 60.5M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.0M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 56.4M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.0M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 46.5M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 32.3M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 36.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.4M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.9M | ✅ | 4.2M | 🟢 **-94%** |
| default.json | 7 | ✅ | 46.1M | ✅ | 546K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 73.2M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.9M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.2M | ✅ | 259K | 🟢 **-99%** |
| items.json | 3 | ✅ | 69.2M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 72.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 69.9M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.0M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 55.6M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 54.5M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 25.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.2M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 65.0M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.0M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 39.1M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 55.7M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 43.6M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 42.4M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 26.8M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 54.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 54.4M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 56.4M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.1M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 21.3M | ✅ | 563K | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 26.5M | ⚠️ 2 fail | - | - |

