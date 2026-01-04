# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | jsen files | jsen tests | jsen ops/s | tjs vs jsen |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 33 | 671 | ✅ 33 | 671 | 31.4M | ⚠️ 27/33 | 516 | 12.6M | 🟢 **-60%** |
| draft6 | 34 | 707 | ✅ 34 | 707 | 35.2M | ⚠️ 19/34 | 398 | 12.1M | 🟢 **-66%** |
| draft7 | 34 | 736 | ✅ 34 | 736 | 38.1M | ⚠️ 18/34 | 419 | 13.6M | 🟢 **-64%** |
| draft2019-09 | 44 | 838 | ✅ 44 | 838 | 38.3M | ⚠️ 21/44 | 467 | 14.8M | 🟢 **-61%** |
| draft2020-12 | 44 | 792 | ✅ 44 | 792 | 43.4M | ⚠️ 19/44 | 269 | 20.9M | 🟢 **-52%** |
| **Total** | 189 | 3744 | ✅ 189 | 3744 | 37.1M | ⚠️ 104/189 | 2069 | 13.9M | 🟢 **-63%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs jsen**: 🟢 tjs is 2.50x faster (27 ns vs 67 ns, 3744 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 32.1M | ✅ | 38.5M | +20% |
| additionalProperties.json | 16 | ✅ | 26.6M | ✅ | 16.2M | 🟢 **-39%** |
| allOf.json | 27 | ✅ | 48.1M | ✅ | 23.2M | 🟢 **-52%** |
| anyOf.json | 15 | ✅ | 35.4M | ✅ | 13.0M | 🟢 **-63%** |
| default.json | 7 | ✅ | 49.8M | ✅ | 37.7M | 🟢 **-24%** |
| definitions.json | 2 | ✅ | 12.3M | ✅ | 5.4M | 🟢 **-56%** |
| dependencies.json | 22 | ✅ | 41.6M | ⚠️ 7 fail | - | - |
| enum.json | 49 | ✅ | 37.6M | ✅ | 9.3M | 🟢 **-75%** |
| format.json | 36 | ✅ | 52.0M | ✅ | 36.2M | 🟢 **-30%** |
| infinite-loop-detection.json | 2 | ✅ | 39.7M | ✅ | 28.2M | 🟢 **-29%** |
| items.json | 21 | ✅ | 28.4M | ✅ | 22.9M | -20% |
| maxItems.json | 4 | ✅ | 67.6M | ✅ | 39.3M | 🟢 **-42%** |
| maxLength.json | 5 | ✅ | 52.5M | ✅ | 37.0M | 🟢 **-30%** |
| maxProperties.json | 8 | ✅ | 49.9M | ✅ | 34.3M | 🟢 **-31%** |
| maximum.json | 14 | ✅ | 57.4M | ✅ | 40.6M | 🟢 **-29%** |
| minItems.json | 4 | ✅ | 64.6M | ✅ | 39.8M | 🟢 **-38%** |
| minLength.json | 5 | ✅ | 51.5M | ✅ | 34.8M | 🟢 **-32%** |
| minProperties.json | 6 | ✅ | 53.4M | ✅ | 36.8M | 🟢 **-31%** |
| minimum.json | 17 | ✅ | 55.1M | ✅ | 36.9M | 🟢 **-33%** |
| multipleOf.json | 9 | ✅ | 58.2M | ⚠️ 1 fail | - | - |
| not.json | 20 | ✅ | 63.4M | ✅ | 21.6M | 🟢 **-66%** |
| oneOf.json | 23 | ✅ | 46.0M | ✅ | 14.3M | 🟢 **-69%** |
| pattern.json | 9 | ✅ | 43.1M | ✅ | 35.0M | -19% |
| patternProperties.json | 18 | ✅ | 16.2M | ✅ | 11.1M | 🟢 **-31%** |
| properties.json | 15 | ✅ | 23.7M | ⚠️ 3 fail | - | - |
| ref.json | 43 | ✅ | 25.9M | ⚠️ 2 fail | - | - |
| required.json | 6 | ✅ | 59.2M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 66.8M | ✅ | 29.1M | 🟢 **-57%** |
| uniqueItems.json | 69 | ✅ | 24.8M | ✅ | 4.0M | 🟢 **-84%** |
| optional/bignum.json | 9 | ✅ | 60.7M | ✅ | 26.0M | 🟢 **-57%** |
| optional/ecmascript-regex.json | 60 | ✅ | 19.2M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.9M | ✅ | 9.0M | -17% |
| optional/format/unknown.json | 7 | ✅ | 75.3M | ✅ | 47.8M | 🟢 **-36%** |

### draft6

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 60.9M | ✅ | 28.3M | 🟢 **-54%** |
| additionalProperties.json | 16 | ✅ | 34.2M | ✅ | 16.7M | 🟢 **-51%** |
| allOf.json | 28 | ✅ | 46.7M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 57.2M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 73.6M | ⚠️ 7 fail | - | - |
| default.json | 7 | ✅ | 55.1M | ✅ | 37.2M | 🟢 **-32%** |
| dependencies.json | 25 | ✅ | 40.9M | ⚠️ 9 fail | - | - |
| enum.json | 45 | ✅ | 41.6M | ✅ | 9.2M | 🟢 **-78%** |
| format.json | 54 | ✅ | 50.0M | ✅ | 35.8M | 🟢 **-28%** |
| infinite-loop-detection.json | 2 | ✅ | 38.7M | ✅ | 27.3M | 🟢 **-29%** |
| items.json | 23 | ✅ | 27.8M | ⚠️ 2 fail | - | - |
| maxItems.json | 6 | ✅ | 65.5M | ✅ | 38.6M | 🟢 **-41%** |
| maxLength.json | 7 | ✅ | 54.6M | ✅ | 34.4M | 🟢 **-37%** |
| maxProperties.json | 10 | ✅ | 52.8M | ✅ | 32.5M | 🟢 **-38%** |
| maximum.json | 8 | ✅ | 38.6M | ✅ | 40.2M | +4% |
| minItems.json | 6 | ✅ | 65.4M | ✅ | 31.4M | 🟢 **-52%** |
| minLength.json | 7 | ✅ | 48.7M | ✅ | 34.8M | 🟢 **-29%** |
| minProperties.json | 8 | ✅ | 54.9M | ✅ | 34.9M | 🟢 **-36%** |
| minimum.json | 11 | ✅ | 69.7M | ✅ | 40.9M | 🟢 **-41%** |
| multipleOf.json | 9 | ✅ | 74.0M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 73.7M | ⚠️ 9 fail | - | - |
| oneOf.json | 26 | ✅ | 55.6M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 42.2M | ✅ | 33.4M | 🟢 **-21%** |
| patternProperties.json | 18 | ✅ | 16.4M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 27.6M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 85.5M | ⚠️ 5 fail | - | - |
| ref.json | 42 | ✅ | 35.2M | ⚠️ 28 fail | - | - |
| required.json | 7 | ✅ | 66.1M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 76.0M | ✅ | 28.6M | 🟢 **-62%** |
| uniqueItems.json | 69 | ✅ | 25.4M | ✅ | 4.1M | 🟢 **-84%** |
| optional/bignum.json | 7 | ✅ | 71.8M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.5M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 11.2M | ✅ | 9.6M | -15% |
| optional/format/unknown.json | 7 | ✅ | 83.3M | ✅ | 45.5M | 🟢 **-45%** |

### draft7

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 30.1M | ✅ | 39.8M | 🔴 **+32%** |
| additionalProperties.json | 16 | ✅ | 33.0M | ✅ | 16.5M | 🟢 **-50%** |
| allOf.json | 28 | ✅ | 52.5M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 59.3M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 8 fail | - | - |
| default.json | 7 | ✅ | 56.6M | ✅ | 37.6M | 🟢 **-33%** |
| dependencies.json | 25 | ✅ | 47.3M | ⚠️ 9 fail | - | - |
| enum.json | 45 | ✅ | 42.0M | ✅ | 9.6M | 🟢 **-77%** |
| format.json | 102 | ✅ | 40.9M | ✅ | 37.7M | -8% |
| if-then-else.json | 8 | ✅ | 85.4M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 44.7M | ✅ | 27.8M | 🟢 **-38%** |
| items.json | 23 | ✅ | 27.1M | ⚠️ 2 fail | - | - |
| maxItems.json | 6 | ✅ | 70.1M | ✅ | 38.9M | 🟢 **-45%** |
| maxLength.json | 7 | ✅ | 57.7M | ✅ | 36.1M | 🟢 **-37%** |
| maxProperties.json | 10 | ✅ | 54.4M | ✅ | 33.6M | 🟢 **-38%** |
| maximum.json | 8 | ✅ | 72.6M | ✅ | 41.1M | 🟢 **-43%** |
| minItems.json | 6 | ✅ | 70.4M | ✅ | 39.2M | 🟢 **-44%** |
| minLength.json | 7 | ✅ | 57.4M | ✅ | 34.8M | 🟢 **-39%** |
| minProperties.json | 8 | ✅ | 56.6M | ✅ | 35.1M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 72.8M | ✅ | 40.4M | 🟢 **-44%** |
| multipleOf.json | 9 | ✅ | 66.3M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 77.9M | ⚠️ 9 fail | - | - |
| oneOf.json | 26 | ✅ | 59.9M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 47.1M | ✅ | 33.8M | 🟢 **-28%** |
| patternProperties.json | 18 | ✅ | 17.3M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 24.9M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.9M | ⚠️ 5 fail | - | - |
| ref.json | 42 | ✅ | 34.5M | ⚠️ 36 fail | - | - |
| required.json | 7 | ✅ | 70.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 60.3M | ✅ | 28.1M | 🟢 **-53%** |
| uniqueItems.json | 69 | ✅ | 25.6M | ✅ | 4.1M | 🟢 **-84%** |
| optional/bignum.json | 7 | ✅ | 74.7M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.8M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 85.9M | ✅ | 45.4M | 🟢 **-47%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 42.7M | ✅ | 38.8M | -9% |
| additionalProperties.json | 21 | ✅ | 23.9M | ✅ | 15.1M | 🟢 **-37%** |
| allOf.json | 28 | ✅ | 49.5M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 55.4M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 70.4M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 75.4M | ✅ | 47.4M | 🟢 **-37%** |
| default.json | 7 | ✅ | 52.7M | ✅ | 38.0M | 🟢 **-28%** |
| dependentRequired.json | 3 | ✅ | 81.5M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 39.3M | ✅ | 9.3M | 🟢 **-76%** |
| format.json | 114 | ✅ | 77.9M | ✅ | 38.6M | 🟢 **-50%** |
| if-then-else.json | 8 | ✅ | 75.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 42.2M | ✅ | 28.0M | 🟢 **-34%** |
| items.json | 23 | ✅ | 29.4M | ⚠️ 2 fail | - | - |
| maxContains.json | 2 | ✅ | 80.8M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 64.8M | ✅ | 38.7M | 🟢 **-40%** |
| maxLength.json | 7 | ✅ | 51.7M | ✅ | 36.3M | 🟢 **-30%** |
| maxProperties.json | 10 | ✅ | 51.4M | ✅ | 33.1M | 🟢 **-36%** |
| maximum.json | 8 | ✅ | 66.1M | ✅ | 41.0M | 🟢 **-38%** |
| minContains.json | 4 | ✅ | 74.9M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 64.7M | ✅ | 38.5M | 🟢 **-40%** |
| minLength.json | 7 | ✅ | 53.3M | ✅ | 34.5M | 🟢 **-35%** |
| minProperties.json | 8 | ✅ | 53.2M | ✅ | 33.7M | 🟢 **-37%** |
| minimum.json | 11 | ✅ | 64.5M | ✅ | 41.1M | 🟢 **-36%** |
| multipleOf.json | 9 | ✅ | 61.3M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 69.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 26 | ✅ | 56.7M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 43.7M | ✅ | 34.2M | 🟢 **-22%** |
| patternProperties.json | 18 | ✅ | 16.8M | ⚠️ 3 fail | - | - |
| properties.json | 15 | ✅ | 27.0M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 80.9M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 11 fail | - | - |
| ref.json | 39 | ✅ | 39.9M | ⚠️ 40 fail | - | - |
| required.json | 7 | ✅ | 64.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 71.2M | ✅ | 30.1M | 🟢 **-58%** |
| unevaluatedItems.json | 15 | ✅ | 55.2M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 32.4M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.3M | ✅ | 4.3M | 🟢 **-83%** |
| vocabulary.json | 2 | ✅ | 66.8M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 63.7M | ⚠️ 2 fail | - | - |
| optional/dependencies-compatibility.json | 24 | ✅ | 50.1M | ⚠️ 10 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.4M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 79.2M | ✅ | 47.9M | 🟢 **-40%** |
| optional/no-schema.json | 3 | ✅ | 58.3M | ✅ | 35.6M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 52.5M | ✅ | 33.1M | 🟢 **-37%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 24.5M | ✅ | 15.5M | 🟢 **-37%** |
| allOf.json | 28 | ✅ | 56.4M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 59.6M | ⚠️ 1 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 84.5M | ✅ | 42.6M | 🟢 **-50%** |
| default.json | 7 | ✅ | 54.5M | ✅ | 31.4M | 🟢 **-42%** |
| dependentRequired.json | 3 | ✅ | 92.5M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 44.2M | ✅ | 9.2M | 🟢 **-79%** |
| format.json | 105 | ✅ | 84.5M | ⚠️ 4 fail | - | - |
| if-then-else.json | 8 | ✅ | 85.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 44.5M | ✅ | 25.6M | 🟢 **-42%** |
| items.json | 12 | ✅ | 28.5M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 90.9M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 70.5M | ✅ | 34.7M | 🟢 **-51%** |
| maxLength.json | 7 | ✅ | 53.8M | ✅ | 34.2M | 🟢 **-36%** |
| maxProperties.json | 10 | ✅ | 54.4M | ✅ | 31.7M | 🟢 **-42%** |
| maximum.json | 8 | ✅ | 72.6M | ✅ | 37.2M | 🟢 **-49%** |
| minContains.json | 4 | ✅ | 72.5M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 70.6M | ✅ | 35.4M | 🟢 **-50%** |
| minLength.json | 7 | ✅ | 56.6M | ✅ | 33.0M | 🟢 **-42%** |
| minProperties.json | 8 | ✅ | 56.6M | ✅ | 32.9M | 🟢 **-42%** |
| minimum.json | 11 | ✅ | 73.0M | ✅ | 36.8M | 🟢 **-50%** |
| multipleOf.json | 9 | ✅ | 66.9M | ⚠️ 1 fail | - | - |
| not.json | 29 | ✅ | 79.0M | ⚠️ 10 fail | - | - |
| oneOf.json | 26 | ✅ | 60.9M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 48.7M | ✅ | 33.1M | 🟢 **-32%** |
| patternProperties.json | 18 | ✅ | 16.7M | ⚠️ 3 fail | - | - |
| prefixItems.json | 2 | ✅ | 84.0M | ⚠️ 2 fail | - | - |
| properties.json | 15 | ✅ | 29.1M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.7M | ⚠️ 5 fail | - | - |
| ref.json | 37 | ✅ | 37.2M | ⚠️ 39 fail | - | - |
| required.json | 7 | ✅ | 70.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 80.9M | ✅ | 26.4M | 🟢 **-67%** |
| unevaluatedItems.json | 17 | ✅ | 56.5M | ⚠️ 29 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 30.6M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 59 | ✅ | 26.7M | ⚠️ 2 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.6M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 69.8M | ⚠️ 2 fail | - | - |
| optional/dependencies-compatibility.json | 24 | ✅ | 53.5M | ⚠️ 10 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.1M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 88.3M | ✅ | 55.1M | 🟢 **-38%** |
| optional/format-assertion.json | 4 | ✅ | 24.1M | ✅ | 19.9M | -17% |
| optional/no-schema.json | 3 | ✅ | 64.9M | ✅ | 34.3M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 56.2M | ✅ | 32.2M | 🟢 **-43%** |

