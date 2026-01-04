# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 42.0M | ⚠️ 3/20 | 29 | 330K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 38.5M | ⚠️ 2/23 | 9 | 438K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 44.3M | ⚠️ 2/24 | 9 | 437K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 32.8M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 43.5M | ⚠️ 4/33 | 31 | 913K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 39.4M | ⚠️ 14/133 | 105 | 561K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 90.28x faster (25 ns vs 2289 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.9M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 40.0M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 52.9M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 49.1M | ✅ | 517K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 34.2M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.2M | ✅ | 269K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.5M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 58.5M | ✅ | 299K | 🟢 **-99%** |
| oneOf.json | 12 | ✅ | 53.3M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.8M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 39.0M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 65.5M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 53.5M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 57.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 56.9M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.6M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 57.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 35.3M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 31.6M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 50.2M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 57.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 43.6M | ✅ | 527K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 63.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 28.3M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 43.8M | ✅ | 275K | 🟢 **-99%** |
| items.json | 4 | ✅ | 57.8M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 47.1M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 55.1M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 50.2M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 22.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.7M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 53.0M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 63.2M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 31.7M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 50.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 55.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 49.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 48.4M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 24.9M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.2M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 36.8M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 45.7M | ✅ | 527K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.3M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.9M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 33.5M | ✅ | 274K | 🟢 **-99%** |
| items.json | 4 | ✅ | 70.3M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.5M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 55.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 18.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 11.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.0M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 36.5M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 59.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 65.2M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.6M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.5M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 52.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 24.6M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 32.7M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 48.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 61.8M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 54.1M | ✅ | 4.1M | 🟢 **-92%** |
| default.json | 7 | ✅ | 43.5M | ✅ | 559K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 69.6M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 30.0M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 54.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 30.5M | ✅ | 275K | 🟢 **-99%** |
| items.json | 4 | ✅ | 65.3M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 69.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 67.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 52.7M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 46.9M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 48.5M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.2M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 58.8M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.0M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.5M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 36.2M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 65.4M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 56.3M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 44.3M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 26.9M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 43.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 43.1M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 55.2M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 53.4M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.8M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 38.0M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 32.7M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 38.5M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.9M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 63.0M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 58.4M | ✅ | 3.8M | 🟢 **-93%** |
| default.json | 7 | ✅ | 41.5M | ✅ | 529K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 32.6M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 67.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 37.2M | ✅ | 232K | 🟢 **-99%** |
| items.json | 3 | ✅ | 72.5M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.5M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.0M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 55.8M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.9M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 37.6M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 76.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 65.0M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 48.5M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 27.6M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 49.4M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 60.4M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 58.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.2M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 21.5M | ✅ | 542K | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 47.4M | ⚠️ 2 fail | - | - |

