# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | jsen files | jsen tests | jsen ops/s | tjs vs jsen |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 33 | 671 | ✅ 33 | 671 | 29.7M | ⚠️ 27/33 | 516 | 12.4M | 🟢 **-58%** |
| draft6 | 34 | 707 | ✅ 34 | 707 | 31.2M | ⚠️ 19/34 | 398 | 12.1M | 🟢 **-61%** |
| draft7 | 34 | 736 | ✅ 34 | 736 | 34.9M | ⚠️ 18/34 | 419 | 13.7M | 🟢 **-61%** |
| draft2019-09 | 44 | 838 | ✅ 44 | 838 | 34.6M | ⚠️ 21/44 | 467 | 14.5M | 🟢 **-58%** |
| draft2020-12 | 44 | 792 | ✅ 44 | 792 | 37.7M | ⚠️ 19/44 | 269 | 21.9M | 🟢 **-42%** |
| **Total** | 189 | 3744 | ✅ 189 | 3744 | 33.6M | ⚠️ 104/189 | 2069 | 13.8M | 🟢 **-59%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs jsen**: 🟢 tjs is 2.27x faster (30 ns vs 68 ns, 3744 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 31.7M | ✅ | 39.6M | 🔴 **+25%** |
| additionalProperties.json | 16 | ✅ | 26.1M | ✅ | 16.1M | 🟢 **-38%** |
| allOf.json | 27 | ✅ | 46.2M | ✅ | 24.2M | 🟢 **-48%** |
| anyOf.json | 15 | ✅ | 52.3M | ✅ | 13.6M | 🟢 **-74%** |
| default.json | 7 | ✅ | 48.8M | ✅ | 37.4M | 🟢 **-23%** |
| definitions.json | 2 | ✅ | 14.0M | ✅ | 5.4M | 🟢 **-62%** |
| dependencies.json | 22 | ✅ | 36.0M | ⚠️ 7 fail | - | - |
| enum.json | 49 | ✅ | 35.4M | ✅ | 9.2M | 🟢 **-74%** |
| format.json | 36 | ✅ | 49.4M | ✅ | 34.6M | 🟢 **-30%** |
| infinite-loop-detection.json | 2 | ✅ | 38.5M | ✅ | 27.6M | 🟢 **-28%** |
| items.json | 21 | ✅ | 24.3M | ✅ | 23.0M | -6% |
| maxItems.json | 4 | ✅ | 65.8M | ✅ | 40.1M | 🟢 **-39%** |
| maxLength.json | 5 | ✅ | 51.7M | ✅ | 37.0M | 🟢 **-28%** |
| maxProperties.json | 8 | ✅ | 45.8M | ✅ | 34.8M | 🟢 **-24%** |
| maximum.json | 14 | ✅ | 57.3M | ✅ | 40.3M | 🟢 **-30%** |
| minItems.json | 4 | ✅ | 65.9M | ✅ | 40.1M | 🟢 **-39%** |
| minLength.json | 5 | ✅ | 51.2M | ✅ | 34.8M | 🟢 **-32%** |
| minProperties.json | 6 | ✅ | 51.2M | ✅ | 36.6M | 🟢 **-28%** |
| minimum.json | 17 | ✅ | 58.8M | ✅ | 39.7M | 🟢 **-33%** |
| multipleOf.json | 9 | ✅ | 50.9M | ⚠️ 1 fail | - | - |
| not.json | 20 | ✅ | 60.6M | ✅ | 21.6M | 🟢 **-64%** |
| oneOf.json | 23 | ✅ | 44.0M | ✅ | 14.3M | 🟢 **-67%** |
| pattern.json | 9 | ✅ | 41.7M | ✅ | 28.2M | 🟢 **-32%** |
| patternProperties.json | 18 | ✅ | 14.6M | ✅ | 11.2M | 🟢 **-23%** |
| properties.json | 15 | ✅ | 22.8M | ⚠️ 3 fail | - | - |
| ref.json | 43 | ✅ | 25.6M | ⚠️ 2 fail | - | - |
| required.json | 6 | ✅ | 53.3M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 57.7M | ✅ | 26.6M | 🟢 **-54%** |
| uniqueItems.json | 69 | ✅ | 21.8M | ✅ | 3.9M | 🟢 **-82%** |
| optional/bignum.json | 9 | ✅ | 55.1M | ✅ | 26.1M | 🟢 **-53%** |
| optional/ecmascript-regex.json | 60 | ✅ | 18.0M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.9M | ✅ | 9.0M | -17% |
| optional/format/unknown.json | 7 | ✅ | 64.1M | ✅ | 45.3M | 🟢 **-29%** |

### draft6

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 53.2M | ✅ | 39.2M | 🟢 **-26%** |
| additionalProperties.json | 16 | ✅ | 28.4M | ✅ | 16.7M | 🟢 **-41%** |
| allOf.json | 28 | ✅ | 39.2M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 53.7M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 64.5M | ⚠️ 7 fail | - | - |
| default.json | 7 | ✅ | 47.1M | ✅ | 38.5M | -18% |
| dependencies.json | 25 | ✅ | 39.2M | ⚠️ 9 fail | - | - |
| enum.json | 45 | ✅ | 35.7M | ✅ | 9.3M | 🟢 **-74%** |
| format.json | 54 | ✅ | 46.6M | ✅ | 36.2M | 🟢 **-22%** |
| infinite-loop-detection.json | 2 | ✅ | 37.9M | ✅ | 28.3M | 🟢 **-25%** |
| items.json | 23 | ✅ | 25.3M | ⚠️ 2 fail | - | - |
| maxItems.json | 6 | ✅ | 57.4M | ✅ | 39.0M | 🟢 **-32%** |
| maxLength.json | 7 | ✅ | 49.8M | ✅ | 34.7M | 🟢 **-30%** |
| maxProperties.json | 10 | ✅ | 44.4M | ✅ | 33.1M | 🟢 **-25%** |
| maximum.json | 8 | ✅ | 59.9M | ✅ | 40.9M | 🟢 **-32%** |
| minItems.json | 6 | ✅ | 56.7M | ✅ | 38.9M | 🟢 **-31%** |
| minLength.json | 7 | ✅ | 49.1M | ✅ | 34.6M | 🟢 **-29%** |
| minProperties.json | 8 | ✅ | 45.8M | ✅ | 35.0M | 🟢 **-23%** |
| minimum.json | 11 | ✅ | 59.7M | ✅ | 40.5M | 🟢 **-32%** |
| multipleOf.json | 9 | ✅ | 55.4M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 58.6M | ⚠️ 9 fail | - | - |
| oneOf.json | 26 | ✅ | 47.9M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 40.7M | ✅ | 34.3M | -16% |
| patternProperties.json | 18 | ✅ | 15.6M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 21.8M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.7M | ⚠️ 5 fail | - | - |
| ref.json | 42 | ✅ | 30.4M | ⚠️ 28 fail | - | - |
| required.json | 7 | ✅ | 55.7M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 57.5M | ✅ | 27.5M | 🟢 **-52%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 4.1M | 🟢 **-83%** |
| optional/bignum.json | 7 | ✅ | 59.9M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 17.1M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.8M | ✅ | 9.2M | -15% |
| optional/format/unknown.json | 7 | ✅ | 68.1M | ✅ | 48.3M | 🟢 **-29%** |

### draft7

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.5M | ✅ | 38.8M | 🔴 **+41%** |
| additionalProperties.json | 16 | ✅ | 26.0M | ✅ | 17.0M | 🟢 **-34%** |
| allOf.json | 28 | ✅ | 46.9M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 50.8M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 8 fail | - | - |
| default.json | 7 | ✅ | 48.1M | ✅ | 37.7M | 🟢 **-22%** |
| dependencies.json | 25 | ✅ | 41.7M | ⚠️ 9 fail | - | - |
| enum.json | 45 | ✅ | 34.7M | ✅ | 8.9M | 🟢 **-74%** |
| format.json | 102 | ✅ | 48.5M | ✅ | 41.0M | -15% |
| if-then-else.json | 8 | ✅ | 66.9M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ✅ | 28.5M | 🟢 **-27%** |
| items.json | 23 | ✅ | 25.0M | ⚠️ 2 fail | - | - |
| maxItems.json | 6 | ✅ | 59.7M | ✅ | 39.2M | 🟢 **-34%** |
| maxLength.json | 7 | ✅ | 50.9M | ✅ | 36.4M | 🟢 **-29%** |
| maxProperties.json | 10 | ✅ | 45.2M | ✅ | 33.4M | 🟢 **-26%** |
| maximum.json | 8 | ✅ | 60.8M | ✅ | 40.9M | 🟢 **-33%** |
| minItems.json | 6 | ✅ | 59.5M | ✅ | 39.4M | 🟢 **-34%** |
| minLength.json | 7 | ✅ | 49.6M | ✅ | 35.1M | 🟢 **-29%** |
| minProperties.json | 8 | ✅ | 46.8M | ✅ | 35.1M | 🟢 **-25%** |
| minimum.json | 11 | ✅ | 61.2M | ✅ | 36.9M | 🟢 **-40%** |
| multipleOf.json | 9 | ✅ | 56.9M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 60.2M | ⚠️ 9 fail | - | - |
| oneOf.json | 26 | ✅ | 48.7M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 41.3M | ✅ | 34.8M | -16% |
| patternProperties.json | 18 | ✅ | 15.9M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 22.6M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 42 | ✅ | 30.4M | ⚠️ 36 fail | - | - |
| required.json | 7 | ✅ | 58.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 59.3M | ✅ | 28.1M | 🟢 **-53%** |
| uniqueItems.json | 69 | ✅ | 23.8M | ✅ | 4.2M | 🟢 **-82%** |
| optional/bignum.json | 7 | ✅ | 60.6M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 18.6M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.7M | ✅ | 42.3M | 🟢 **-36%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 43.7M | ✅ | 36.9M | -16% |
| additionalProperties.json | 21 | ✅ | 24.6M | ✅ | 16.5M | 🟢 **-33%** |
| allOf.json | 28 | ✅ | 44.7M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 50.4M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 64.5M | ✅ | 45.4M | 🟢 **-30%** |
| default.json | 7 | ✅ | 46.6M | ✅ | 20.2M | 🟢 **-57%** |
| dependentRequired.json | 3 | ✅ | 73.1M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 35.3M | ✅ | 8.9M | 🟢 **-75%** |
| format.json | 114 | ✅ | 68.0M | ✅ | 40.1M | 🟢 **-41%** |
| if-then-else.json | 8 | ✅ | 66.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.4M | ✅ | 27.9M | 🟢 **-21%** |
| items.json | 23 | ✅ | 25.2M | ⚠️ 2 fail | - | - |
| maxContains.json | 2 | ✅ | 70.3M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 57.7M | ✅ | 39.2M | 🟢 **-32%** |
| maxLength.json | 7 | ✅ | 49.5M | ✅ | 36.3M | 🟢 **-27%** |
| maxProperties.json | 10 | ✅ | 44.3M | ✅ | 30.4M | 🟢 **-31%** |
| maximum.json | 8 | ✅ | 59.5M | ✅ | 41.0M | 🟢 **-31%** |
| minContains.json | 4 | ✅ | 71.5M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 58.0M | ✅ | 39.0M | 🟢 **-33%** |
| minLength.json | 7 | ✅ | 48.1M | ✅ | 35.1M | 🟢 **-27%** |
| minProperties.json | 8 | ✅ | 46.7M | ✅ | 34.9M | 🟢 **-25%** |
| minimum.json | 11 | ✅ | 57.4M | ✅ | 41.3M | 🟢 **-28%** |
| multipleOf.json | 9 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 59.9M | ⚠️ 10 fail | - | - |
| oneOf.json | 26 | ✅ | 46.1M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 41.6M | ✅ | 35.2M | -15% |
| patternProperties.json | 18 | ✅ | 15.0M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 22.9M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.9M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 11 fail | - | - |
| ref.json | 39 | ✅ | 34.4M | ⚠️ 40 fail | - | - |
| required.json | 7 | ✅ | 54.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 56.2M | ✅ | 28.3M | 🟢 **-50%** |
| unevaluatedItems.json | 15 | ✅ | 47.4M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.0M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.7M | ✅ | 4.2M | 🟢 **-82%** |
| vocabulary.json | 2 | ✅ | 60.3M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 55.6M | ⚠️ 2 fail | - | - |
| optional/dependencies-compatibility.json | 24 | ✅ | 44.8M | ⚠️ 10 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.2M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 45.5M | 🟢 **-30%** |
| optional/no-schema.json | 3 | ✅ | 48.6M | ✅ | 35.0M | 🟢 **-28%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.3M | ✅ | 35.9M | -17% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 26.8M | ✅ | 14.8M | 🟢 **-45%** |
| allOf.json | 28 | ✅ | 44.8M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 50.4M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 65.1M | ✅ | 46.9M | 🟢 **-28%** |
| default.json | 7 | ✅ | 48.6M | ✅ | 37.8M | 🟢 **-22%** |
| dependentRequired.json | 3 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 36.7M | ✅ | 9.4M | 🟢 **-74%** |
| format.json | 105 | ✅ | 64.0M | ⚠️ 4 fail | - | - |
| if-then-else.json | 8 | ✅ | 67.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.2M | ✅ | 28.5M | 🟢 **-27%** |
| items.json | 12 | ✅ | 25.0M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.6M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 59.4M | ✅ | 39.3M | 🟢 **-34%** |
| maxLength.json | 7 | ✅ | 51.4M | ✅ | 36.7M | 🟢 **-29%** |
| maxProperties.json | 10 | ✅ | 45.5M | ✅ | 33.5M | 🟢 **-26%** |
| maximum.json | 8 | ✅ | 60.6M | ✅ | 40.9M | 🟢 **-32%** |
| minContains.json | 4 | ✅ | 74.9M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 59.2M | ✅ | 38.7M | 🟢 **-35%** |
| minLength.json | 7 | ✅ | 50.8M | ✅ | 34.8M | 🟢 **-31%** |
| minProperties.json | 8 | ✅ | 47.6M | ✅ | 34.8M | 🟢 **-27%** |
| minimum.json | 11 | ✅ | 56.5M | ✅ | 40.5M | 🟢 **-28%** |
| multipleOf.json | 9 | ✅ | 57.6M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 62.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 26 | ✅ | 49.5M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 41.9M | ✅ | 31.2M | 🟢 **-25%** |
| patternProperties.json | 18 | ✅ | 16.4M | ⚠️ 3 fail | - | - |
| prefixItems.json | 2 | ✅ | 67.8M | ⚠️ 2 fail | - | - |
| properties.json | 15 | ✅ | 24.9M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| ref.json | 37 | ✅ | 31.3M | ⚠️ 39 fail | - | - |
| required.json | 7 | ✅ | 57.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 60.9M | ✅ | 28.9M | 🟢 **-53%** |
| unevaluatedItems.json | 17 | ✅ | 45.0M | ⚠️ 29 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 27.9M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 59 | ✅ | 24.4M | ⚠️ 2 fail | - | - |
| vocabulary.json | 2 | ✅ | 63.0M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 56.7M | ⚠️ 2 fail | - | - |
| optional/dependencies-compatibility.json | 24 | ✅ | 45.0M | ⚠️ 10 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 18.9M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 60.3M | -10% |
| optional/format-assertion.json | 4 | ✅ | 22.8M | ✅ | 19.6M | -14% |
| optional/no-schema.json | 3 | ✅ | 54.9M | ✅ | 37.9M | 🟢 **-31%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 46.2M | ✅ | 32.2M | 🟢 **-30%** |

