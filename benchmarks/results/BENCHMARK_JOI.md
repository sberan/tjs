# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 40.8M | ⚠️ 3/20 | 29 | 331K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 39.1M | ⚠️ 2/23 | 9 | 442K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 41.2M | ⚠️ 2/24 | 9 | 436K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 34.9M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 42.8M | ⚠️ 4/33 | 31 | 902K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 39.4M | ⚠️ 14/133 | 105 | 560K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 86.52x faster (25 ns vs 2196 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.3M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.7M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 38.2M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 52.6M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 48.9M | ✅ | 529K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 34.1M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.9M | ✅ | 271K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.8M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 60.5M | ✅ | 298K | 🟢 **-100%** |
| oneOf.json | 12 | ✅ | 47.6M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 41.2M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 59.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 50.4M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.3M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.3M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 55.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 34.9M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 32.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 50.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 43.7M | ✅ | 539K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 61.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 29.7M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 33.2M | ✅ | 271K | 🟢 **-99%** |
| items.json | 4 | ✅ | 54.4M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 46.5M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 55.3M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 43.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 22.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.6M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 53.0M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 62.9M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 33.0M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 49.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 55.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 49.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 49.1M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.5M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 61.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 36.6M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 37.4M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 51.9M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 59.5M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 44.6M | ✅ | 530K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 65.3M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 30.4M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 62.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.0M | ✅ | 270K | 🟢 **-99%** |
| items.json | 4 | ✅ | 59.9M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 49.2M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 58.4M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 51.1M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 55.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 65.3M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 34.1M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 51.9M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 56.3M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 50.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 50.9M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.9M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 57.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 31.1M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 32.0M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 51.7M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 59.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 62.4M | ✅ | 4.2M | 🟢 **-93%** |
| default.json | 7 | ✅ | 44.7M | ✅ | 539K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 66.8M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 30.4M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 62.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 33.2M | ✅ | 278K | 🟢 **-99%** |
| items.json | 4 | ✅ | 60.7M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 61.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 64.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 48.9M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 58.5M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 50.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.0M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 55.0M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 64.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 34.0M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 66.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 59.3M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 41.1M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 27.6M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 59.1M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 43.2M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 51.8M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 48.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.6M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 44.9M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 24.8M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 40.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.3M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.2M | ✅ | 4.1M | 🟢 **-94%** |
| default.json | 7 | ✅ | 46.9M | ✅ | 513K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.0M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 62.9M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.5M | ✅ | 225K | 🟢 **-99%** |
| items.json | 3 | ✅ | 69.5M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 72.8M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 71.2M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.2M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 60.5M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 54.3M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 65.9M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 59.1M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.6M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 36.4M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 72.8M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 61.9M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 46.0M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.5M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 62.3M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 46.5M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 52.8M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 71.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.7M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 22.3M | ✅ | 536K | 🟢 **-98%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.8M | ⚠️ 2 fail | - | - |

