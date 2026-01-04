# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | jsen files | jsen tests | jsen ops/s | tjs vs jsen |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 33 | 671 | ✅ 33 | 671 | 33.9M | ⚠️ 27/33 | 516 | 12.8M | 🟢 **-62%** |
| draft6 | 34 | 707 | ✅ 34 | 707 | 33.2M | ⚠️ 19/34 | 398 | 12.0M | 🟢 **-64%** |
| draft7 | 34 | 736 | ✅ 34 | 736 | 37.5M | ⚠️ 18/34 | 419 | 13.5M | 🟢 **-64%** |
| draft2019-09 | 44 | 838 | ✅ 44 | 838 | 40.9M | ⚠️ 21/44 | 467 | 14.5M | 🟢 **-65%** |
| draft2020-12 | 44 | 792 | ✅ 44 | 792 | 38.3M | ⚠️ 19/44 | 269 | 21.7M | 🟢 **-43%** |
| **Total** | 189 | 3744 | ✅ 189 | 3744 | 36.7M | ⚠️ 104/189 | 2069 | 13.9M | 🟢 **-62%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs jsen**: 🟢 tjs is 2.47x faster (27 ns vs 67 ns, 3744 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 66.7M | ✅ | 38.9M | 🟢 **-42%** |
| additionalProperties.json | 16 | ✅ | 33.0M | ✅ | 17.0M | 🟢 **-49%** |
| allOf.json | 27 | ✅ | 51.7M | ✅ | 24.2M | 🟢 **-53%** |
| anyOf.json | 15 | ✅ | 53.5M | ✅ | 13.8M | 🟢 **-74%** |
| default.json | 7 | ✅ | 53.9M | ✅ | 38.4M | 🟢 **-29%** |
| definitions.json | 2 | ✅ | 12.4M | ✅ | 4.8M | 🟢 **-61%** |
| dependencies.json | 22 | ✅ | 44.4M | ⚠️ 7 fail | - | - |
| enum.json | 49 | ✅ | 41.1M | ✅ | 9.8M | 🟢 **-76%** |
| format.json | 36 | ✅ | 50.1M | ✅ | 35.4M | 🟢 **-29%** |
| infinite-loop-detection.json | 2 | ✅ | 38.5M | ✅ | 28.3M | 🟢 **-26%** |
| items.json | 21 | ✅ | 25.1M | ✅ | 21.8M | -13% |
| maxItems.json | 4 | ✅ | 74.3M | ✅ | 39.5M | 🟢 **-47%** |
| maxLength.json | 5 | ✅ | 56.8M | ✅ | 37.1M | 🟢 **-35%** |
| maxProperties.json | 8 | ✅ | 54.0M | ✅ | 34.8M | 🟢 **-35%** |
| maximum.json | 14 | ✅ | 66.8M | ✅ | 38.2M | 🟢 **-43%** |
| minItems.json | 4 | ✅ | 73.9M | ✅ | 39.1M | 🟢 **-47%** |
| minLength.json | 5 | ✅ | 55.0M | ✅ | 34.8M | 🟢 **-37%** |
| minProperties.json | 6 | ✅ | 57.6M | ✅ | 37.2M | 🟢 **-35%** |
| minimum.json | 17 | ✅ | 78.3M | ✅ | 40.2M | 🟢 **-49%** |
| multipleOf.json | 9 | ✅ | 63.2M | ⚠️ 1 fail | - | - |
| not.json | 20 | ✅ | 71.2M | ✅ | 21.9M | 🟢 **-69%** |
| oneOf.json | 23 | ✅ | 56.1M | ✅ | 14.4M | 🟢 **-74%** |
| pattern.json | 9 | ✅ | 46.8M | ✅ | 35.0M | 🟢 **-25%** |
| patternProperties.json | 18 | ✅ | 17.1M | ✅ | 11.7M | 🟢 **-32%** |
| properties.json | 15 | ✅ | 25.0M | ⚠️ 3 fail | - | - |
| ref.json | 43 | ✅ | 33.3M | ⚠️ 2 fail | - | - |
| required.json | 6 | ✅ | 62.6M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 75.0M | ✅ | 27.9M | 🟢 **-63%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 4.1M | 🟢 **-83%** |
| optional/bignum.json | 9 | ✅ | 65.7M | ✅ | 26.1M | 🟢 **-60%** |
| optional/ecmascript-regex.json | 60 | ✅ | 19.6M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 11.1M | ✅ | 9.6M | -13% |
| optional/format/unknown.json | 7 | ✅ | 82.6M | ✅ | 47.6M | 🟢 **-42%** |

### draft6

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 57.8M | ✅ | 27.6M | 🟢 **-52%** |
| additionalProperties.json | 16 | ✅ | 28.8M | ✅ | 16.1M | 🟢 **-44%** |
| allOf.json | 28 | ✅ | 45.2M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 52.5M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 66.6M | ⚠️ 7 fail | - | - |
| default.json | 7 | ✅ | 50.1M | ✅ | 36.9M | 🟢 **-26%** |
| dependencies.json | 25 | ✅ | 40.4M | ⚠️ 9 fail | - | - |
| enum.json | 45 | ✅ | 37.5M | ✅ | 9.0M | 🟢 **-76%** |
| format.json | 54 | ✅ | 45.1M | ✅ | 37.6M | -17% |
| infinite-loop-detection.json | 2 | ✅ | 24.7M | ✅ | 26.7M | +8% |
| items.json | 23 | ✅ | 26.4M | ⚠️ 2 fail | - | - |
| maxItems.json | 6 | ✅ | 62.6M | ✅ | 38.9M | 🟢 **-38%** |
| maxLength.json | 7 | ✅ | 51.6M | ✅ | 36.0M | 🟢 **-30%** |
| maxProperties.json | 10 | ✅ | 49.4M | ✅ | 33.6M | 🟢 **-32%** |
| maximum.json | 8 | ✅ | 64.2M | ✅ | 41.0M | 🟢 **-36%** |
| minItems.json | 6 | ✅ | 62.3M | ✅ | 35.9M | 🟢 **-42%** |
| minLength.json | 7 | ✅ | 51.1M | ✅ | 34.8M | 🟢 **-32%** |
| minProperties.json | 8 | ✅ | 50.8M | ✅ | 35.0M | 🟢 **-31%** |
| minimum.json | 11 | ✅ | 63.3M | ✅ | 40.9M | 🟢 **-35%** |
| multipleOf.json | 9 | ✅ | 58.9M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 66.5M | ⚠️ 9 fail | - | - |
| oneOf.json | 26 | ✅ | 55.4M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 38.1M | ✅ | 34.7M | -9% |
| patternProperties.json | 18 | ✅ | 16.9M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 24.9M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.3M | ⚠️ 5 fail | - | - |
| ref.json | 42 | ✅ | 31.9M | ⚠️ 28 fail | - | - |
| required.json | 7 | ✅ | 60.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 66.7M | ✅ | 28.3M | 🟢 **-58%** |
| uniqueItems.json | 69 | ✅ | 24.6M | ✅ | 4.1M | 🟢 **-83%** |
| optional/bignum.json | 7 | ✅ | 65.8M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.1M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.8M | ✅ | 9.2M | -15% |
| optional/format/unknown.json | 7 | ✅ | 75.3M | ✅ | 39.4M | 🟢 **-48%** |

### draft7

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.8M | ✅ | 38.1M | 🔴 **+32%** |
| additionalProperties.json | 16 | ✅ | 28.1M | ✅ | 16.2M | 🟢 **-42%** |
| allOf.json | 28 | ✅ | 49.3M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 58.5M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 70.4M | ⚠️ 8 fail | - | - |
| default.json | 7 | ✅ | 51.7M | ✅ | 38.3M | 🟢 **-26%** |
| dependencies.json | 25 | ✅ | 45.5M | ⚠️ 9 fail | - | - |
| enum.json | 45 | ✅ | 40.2M | ✅ | 9.0M | 🟢 **-78%** |
| format.json | 102 | ✅ | 46.8M | ✅ | 40.1M | -14% |
| if-then-else.json | 8 | ✅ | 76.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.0M | ✅ | 28.5M | 🟢 **-25%** |
| items.json | 23 | ✅ | 27.9M | ⚠️ 2 fail | - | - |
| maxItems.json | 6 | ✅ | 64.7M | ✅ | 38.4M | 🟢 **-41%** |
| maxLength.json | 7 | ✅ | 53.2M | ✅ | 36.0M | 🟢 **-32%** |
| maxProperties.json | 10 | ✅ | 50.8M | ✅ | 33.0M | 🟢 **-35%** |
| maximum.json | 8 | ✅ | 65.5M | ✅ | 40.8M | 🟢 **-38%** |
| minItems.json | 6 | ✅ | 72.6M | ✅ | 39.2M | 🟢 **-46%** |
| minLength.json | 7 | ✅ | 53.1M | ✅ | 34.7M | 🟢 **-35%** |
| minProperties.json | 8 | ✅ | 53.1M | ✅ | 35.2M | 🟢 **-34%** |
| minimum.json | 11 | ✅ | 73.4M | ✅ | 40.8M | 🟢 **-44%** |
| multipleOf.json | 9 | ✅ | 61.0M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 68.4M | ⚠️ 9 fail | - | - |
| oneOf.json | 26 | ✅ | 56.2M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 45.8M | ✅ | 34.1M | 🟢 **-25%** |
| patternProperties.json | 18 | ✅ | 16.5M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 24.6M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 80.7M | ⚠️ 5 fail | - | - |
| ref.json | 42 | ✅ | 33.3M | ⚠️ 36 fail | - | - |
| required.json | 7 | ✅ | 64.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 72.8M | ✅ | 29.2M | 🟢 **-60%** |
| uniqueItems.json | 69 | ✅ | 24.9M | ✅ | 4.1M | 🟢 **-84%** |
| optional/bignum.json | 7 | ✅ | 68.8M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.4M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 79.2M | ✅ | 47.7M | 🟢 **-40%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 55.3M | ✅ | 37.8M | 🟢 **-32%** |
| additionalProperties.json | 21 | ✅ | 26.6M | ✅ | 16.2M | 🟢 **-39%** |
| allOf.json | 28 | ✅ | 55.0M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 65.1M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 79.0M | ✅ | 45.1M | 🟢 **-43%** |
| default.json | 7 | ✅ | 55.8M | ✅ | 36.8M | 🟢 **-34%** |
| dependentRequired.json | 3 | ✅ | 91.5M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 43.9M | ✅ | 9.6M | 🟢 **-78%** |
| format.json | 114 | ✅ | 87.6M | ✅ | 36.5M | 🟢 **-58%** |
| if-then-else.json | 8 | ✅ | 85.3M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 44.6M | ✅ | 27.6M | 🟢 **-38%** |
| items.json | 23 | ✅ | 33.0M | ⚠️ 2 fail | - | - |
| maxContains.json | 2 | ✅ | 90.4M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 70.5M | ✅ | 37.5M | 🟢 **-47%** |
| maxLength.json | 7 | ✅ | 57.7M | ✅ | 35.9M | 🟢 **-38%** |
| maxProperties.json | 10 | ✅ | 54.5M | ✅ | 30.9M | 🟢 **-43%** |
| maximum.json | 8 | ✅ | 72.4M | ✅ | 39.1M | 🟢 **-46%** |
| minContains.json | 4 | ✅ | 93.6M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 68.6M | ✅ | 37.6M | 🟢 **-45%** |
| minLength.json | 7 | ✅ | 56.6M | ✅ | 33.9M | 🟢 **-40%** |
| minProperties.json | 8 | ✅ | 56.0M | ✅ | 34.1M | 🟢 **-39%** |
| minimum.json | 11 | ✅ | 73.0M | ✅ | 38.7M | 🟢 **-47%** |
| multipleOf.json | 9 | ✅ | 67.0M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 74.0M | ⚠️ 10 fail | - | - |
| oneOf.json | 26 | ✅ | 59.7M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 48.6M | ✅ | 33.2M | 🟢 **-32%** |
| patternProperties.json | 18 | ✅ | 17.5M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 28.8M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.4M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 39 | ✅ | 36.6M | ⚠️ 40 fail | - | - |
| required.json | 7 | ✅ | 69.7M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 80.9M | ✅ | 29.7M | 🟢 **-63%** |
| unevaluatedItems.json | 15 | ✅ | 59.1M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 33.8M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 69 | ✅ | 26.9M | ✅ | 4.1M | 🟢 **-85%** |
| vocabulary.json | 2 | ✅ | 66.9M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 70.1M | ⚠️ 2 fail | - | - |
| optional/dependencies-compatibility.json | 24 | ✅ | 52.5M | ⚠️ 10 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.3M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 88.5M | ✅ | 43.9M | 🟢 **-50%** |
| optional/no-schema.json | 3 | ✅ | 60.4M | ✅ | 34.9M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 55.2M | ✅ | 35.2M | 🟢 **-36%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 23.5M | ✅ | 14.7M | 🟢 **-37%** |
| allOf.json | 28 | ✅ | 43.5M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 47.9M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 64.5M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 69.3M | ✅ | 47.5M | 🟢 **-31%** |
| default.json | 7 | ✅ | 48.7M | ✅ | 38.3M | 🟢 **-21%** |
| dependentRequired.json | 3 | ✅ | 72.9M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 36.1M | ✅ | 9.0M | 🟢 **-75%** |
| format.json | 105 | ✅ | 72.3M | ⚠️ 4 fail | - | - |
| if-then-else.json | 8 | ✅ | 68.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.9M | ✅ | 28.5M | 🟢 **-21%** |
| items.json | 12 | ✅ | 26.1M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 71.8M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 60.1M | ✅ | 39.3M | 🟢 **-35%** |
| maxLength.json | 7 | ✅ | 49.8M | ✅ | 35.9M | 🟢 **-28%** |
| maxProperties.json | 10 | ✅ | 47.5M | ✅ | 33.7M | 🟢 **-29%** |
| maximum.json | 8 | ✅ | 61.2M | ✅ | 40.9M | 🟢 **-33%** |
| minContains.json | 4 | ✅ | 71.3M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 60.2M | ✅ | 39.3M | 🟢 **-35%** |
| minLength.json | 7 | ✅ | 48.7M | ✅ | 34.8M | 🟢 **-29%** |
| minProperties.json | 8 | ✅ | 49.2M | ✅ | 35.0M | 🟢 **-29%** |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 40.8M | 🟢 **-34%** |
| multipleOf.json | 9 | ✅ | 56.6M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 63.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 26 | ✅ | 50.7M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 42.6M | ✅ | 34.4M | -19% |
| patternProperties.json | 18 | ✅ | 16.7M | ⚠️ 3 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.9M | ⚠️ 2 fail | - | - |
| properties.json | 15 | ✅ | 24.0M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.5M | ⚠️ 5 fail | - | - |
| ref.json | 37 | ✅ | 31.0M | ⚠️ 39 fail | - | - |
| required.json | 7 | ✅ | 59.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 63.6M | ✅ | 29.4M | 🟢 **-54%** |
| unevaluatedItems.json | 17 | ✅ | 46.5M | ⚠️ 29 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 28.2M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 59 | ✅ | 24.7M | ⚠️ 2 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.0M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 56.8M | ⚠️ 2 fail | - | - |
| optional/dependencies-compatibility.json | 24 | ✅ | 46.4M | ⚠️ 10 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.3M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 72.0M | ✅ | 60.1M | -17% |
| optional/format-assertion.json | 4 | ✅ | 22.3M | ✅ | 19.0M | -15% |
| optional/no-schema.json | 3 | ✅ | 53.7M | ✅ | 37.9M | 🟢 **-29%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 47.9M | ✅ | 33.7M | 🟢 **-30%** |

