# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 256 | ✅ 20 | 256 | 40.7M | ⚠️ 3/20 | 29 | 335K | 🟢 **-99%** |
| draft6 | 23 | 288 | ✅ 23 | 288 | 39.4M | ⚠️ 2/23 | 9 | 439K | 🟢 **-99%** |
| draft7 | 24 | 296 | ✅ 24 | 296 | 40.1M | ⚠️ 2/24 | 9 | 439K | 🟢 **-99%** |
| draft2019-09 | 33 | 378 | ✅ 33 | 378 | 35.8M | ⚠️ 3/33 | 27 | 1.1M | 🟢 **-97%** |
| draft2020-12 | 33 | 373 | ✅ 33 | 373 | 40.7M | ⚠️ 4/33 | 31 | 976K | 🟢 **-98%** |
| **Total** | 133 | 1591 | ✅ 133 | 1591 | 39.1M | ⚠️ 14/133 | 105 | 571K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 84.32x faster (26 ns vs 2156 ns, 1591 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 74.0M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.6M | ⚠️ 7 fail | - | - |
| allOf.json | 17 | ✅ | 38.3M | ⚠️ 8 fail | - | - |
| anyOf.json | 8 | ✅ | 53.1M | ⚠️ 2 fail | - | - |
| default.json | 7 | ✅ | 49.1M | ✅ | 533K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.9M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.3M | ✅ | 274K | 🟢 **-99%** |
| items.json | 2 | ✅ | 67.4M | ⚠️ 4 fail | - | - |
| multipleOf.json | 2 | ✅ | 64.4M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 60.5M | ✅ | 302K | 🟢 **-100%** |
| oneOf.json | 12 | ✅ | 47.0M | ⚠️ 5 fail | - | - |
| pattern.json | 1 | ✅ | 24.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| ref.json | 19 | ✅ | 39.5M | ⚠️ 18 fail | - | - |
| required.json | 1 | ✅ | 58.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 66.6M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 52.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 57.7M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.4M | ⚠️ 18 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 63.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.5M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 38.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 56.0M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 47.9M | ✅ | 530K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.3M | ⚠️ 17 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 19.6M | ✅ | 274K | 🟢 **-99%** |
| items.json | 4 | ✅ | 70.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.8M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.2M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 48.7M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 36.1M | ⚠️ 29 fail | - | - |
| required.json | 2 | ✅ | 58.6M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 50.4M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 51.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 55.8M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.3M | ⚠️ 18 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 5 | ✅ | 38.9M | ⚠️ 7 fail | - | - |
| allOf.json | 18 | ✅ | 35.9M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 51.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 48.4M | ✅ | 533K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.0M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.4M | ✅ | 272K | 🟢 **-99%** |
| items.json | 4 | ✅ | 70.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.6M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 56.7M | ⚠️ 9 fail | - | - |
| oneOf.json | 15 | ✅ | 48.6M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 31 | ✅ | 37.0M | ⚠️ 37 fail | - | - |
| required.json | 2 | ✅ | 57.2M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 53.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 23 | ✅ | 53.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 3 | ✅ | 58.4M | ⚠️ 6 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.2M | ⚠️ 18 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 8 | ✅ | 32.7M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 36.0M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 55.8M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.2M | ✅ | 4.2M | 🟢 **-94%** |
| default.json | 7 | ✅ | 48.5M | ✅ | 534K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 76.9M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 34.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 62.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.4M | ✅ | 275K | 🟢 **-99%** |
| items.json | 4 | ✅ | 70.1M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.6M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 61.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 42.1M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 28 | ✅ | 38.1M | ⚠️ 41 fail | - | - |
| required.json | 2 | ✅ | 76.4M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 63.9M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 49.3M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 29.4M | ⚠️ 56 fail | - | - |
| uniqueItems.json | 23 | ✅ | 63.3M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 52.6M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 58.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.8M | ⚠️ 18 fail | - | - |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 46.5M | ⚠️ 2 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 8 | ✅ | 33.3M | ⚠️ 8 fail | - | - |
| allOf.json | 18 | ✅ | 36.1M | ⚠️ 10 fail | - | - |
| anyOf.json | 10 | ✅ | 54.6M | ⚠️ 3 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.3M | ✅ | 4.3M | 🟢 **-93%** |
| default.json | 7 | ✅ | 46.8M | ✅ | 534K | 🟢 **-99%** |
| dependentRequired.json | 3 | ✅ | 73.3M | ⚠️ 6 fail | - | - |
| enum.json | 28 | ✅ | 33.1M | ⚠️ 17 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.2M | ✅ | 275K | 🟢 **-99%** |
| items.json | 3 | ✅ | 72.7M | ⚠️ 11 fail | - | - |
| maxContains.json | 2 | ✅ | 76.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 73.5M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 29 | ✅ | 56.8M | ⚠️ 10 fail | - | - |
| oneOf.json | 15 | ✅ | 53.4M | ⚠️ 6 fail | - | - |
| pattern.json | 1 | ✅ | 21.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 67.4M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 14 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.9M | ⚠️ 5 fail | - | - |
| ref.json | 28 | ✅ | 40.3M | ⚠️ 39 fail | - | - |
| required.json | 2 | ✅ | 76.0M | ⚠️ 8 fail | - | - |
| type.json | 55 | ✅ | 62.2M | ⚠️ 3 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 41.7M | ⚠️ 30 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 27.7M | ⚠️ 57 fail | - | - |
| uniqueItems.json | 23 | ✅ | 62.5M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 3 | ✅ | 53.4M | ⚠️ 6 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 57.7M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.7M | ⚠️ 18 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 21.8M | ✅ | 558K | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | 6 | ✅ | 45.4M | ⚠️ 2 fail | - | - |

