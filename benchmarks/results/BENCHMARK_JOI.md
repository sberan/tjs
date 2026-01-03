# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 37.7M | ⚠️ 3/20 | 29 | 328K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 35.1M | ⚠️ 2/23 | 9 | 418K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 39.9M | ⚠️ 2/24 | 9 | 418K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 36.4M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 40.0M | ⚠️ 4/33 | 31 | 931K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 37.8M | ⚠️ 14/133 | 105 | 552K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 85.07x faster (26 ns vs 2252 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.2M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 38.4M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 52.9M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 25.1M | ✅ | 523K | 🟢 **-98%** |
| enum.json | 32 | ✅ | 34.4M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.3M | ✅ | 270K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.3M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.0M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 58.1M | ✅ | 296K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 47.6M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 24.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 37.6M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 58.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 52.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 51.8M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.3M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.2M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 53.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 33.8M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 31.3M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 46.5M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 52.4M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 37.9M | ✅ | 505K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 56.1M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 29.1M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 31.3M | ✅ | 260K | 🟢 **-99%** |
| items.json | 4 | ✅ | 50.8M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 42.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 51.2M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 46.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 47.9M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 57.4M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 30.0M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 45.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 51.4M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 45.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 45.2M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 20.0M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 63.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 37.5M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 37.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 53.4M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 62.0M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 46.1M | ✅ | 507K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 69.4M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 31.8M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 64.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.1M | ✅ | 259K | 🟢 **-99%** |
| items.json | 4 | ✅ | 62.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 59.1M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 52.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 57.1M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.3M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 35.1M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 54.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 60.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 51.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 48.5M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.1M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 63.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 24.9M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 36.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.0M | ✅ | 4.0M | 🟢 **-94%** |
| default.json | 7 | ✅ | 40.7M | ✅ | 522K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.3M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 65.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.3M | ✅ | 270K | 🟢 **-99%** |
| items.json | 4 | ✅ | 65.9M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 72.8M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 71.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.2M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 60.8M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 50.9M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 20.6M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.3M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.2M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 35.1M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 68.9M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 62.3M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 46.0M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.9M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 62.1M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 46.4M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.8M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 56.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.7M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.1M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 26.8M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 38.5M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 52.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 59.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 62.1M | ✅ | 4.4M | 🟢 **-93%** |
| default.json | 7 | ✅ | 44.2M | ✅ | 527K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 66.7M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 31.5M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 62.9M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.0M | ✅ | 232K | 🟢 **-99%** |
| items.json | 3 | ✅ | 61.4M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 66.2M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 65.2M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 48.8M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 58.0M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 51.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 23.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.3M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 57.9M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 54.2M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 66.1M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 35.0M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 50.3M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 58.4M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 43.9M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 26.2M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 50.9M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 48.1M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 46.1M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 53.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.1M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 21.6M | ✅ | 551K | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 43.2M | ⚠️ 2 fail | - | - |

