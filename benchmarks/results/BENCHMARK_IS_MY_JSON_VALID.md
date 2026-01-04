# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | is-my-json-valid files | is-my-json-valid tests | is-my-json-valid ops/s | tjs vs is-my-json-valid |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 31 | 640 | ✅ 31 | 640 | 35.9M | ⚠️ 24/31 | 459 | 11.6M | 🟢 **-68%** |
| draft6 | 36 | 703 | ✅ 36 | 703 | 35.2M | ⚠️ 18/36 | 369 | 11.5M | 🟢 **-67%** |
| draft7 | 36 | 732 | ✅ 36 | 732 | 40.5M | ⚠️ 17/36 | 390 | 15.0M | 🟢 **-63%** |
| draft2019-09 | 47 | 842 | ✅ 47 | 842 | 42.5M | ⚠️ 19/47 | 400 | 15.9M | 🟢 **-63%** |
| draft2020-12 | 48 | 785 | ✅ 48 | 785 | 42.0M | ⚠️ 19/48 | 272 | 11.5M | 🟢 **-73%** |
| **Total** | 198 | 3702 | ✅ 198 | 3702 | 39.2M | ⚠️ 97/198 | 1890 | 12.9M | 🟢 **-67%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs is-my-json-valid**: 🟢 tjs is 2.99x faster (25 ns vs 76 ns, 3702 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 38.3M | ✅ | 25.6M | 🟢 **-33%** |
| additionalProperties.json | 16 | ✅ | 27.7M | ✅ | 7.1M | 🟢 **-74%** |
| allOf.json | 27 | ✅ | 47.6M | ✅ | 16.9M | 🟢 **-65%** |
| anyOf.json | 15 | ✅ | 62.3M | ✅ | 30.6M | 🟢 **-51%** |
| default.json | 7 | ✅ | 51.0M | ✅ | 44.0M | -14% |
| dependencies.json | 29 | ✅ | 29.1M | ✅ | 18.0M | 🟢 **-38%** |
| enum.json | 49 | ✅ | 43.5M | ✅ | 4.1M | 🟢 **-91%** |
| format.json | 36 | ✅ | 73.0M | ✅ | 55.2M | 🟢 **-24%** |
| infinite-loop-detection.json | 2 | ✅ | 35.5M | ✅ | 11.4M | 🟢 **-68%** |
| items.json | 15 | ✅ | 22.4M | ⚠️ 1 fail | - | - |
| maxItems.json | 4 | ✅ | 82.5M | ✅ | 40.8M | 🟢 **-51%** |
| maxProperties.json | 8 | ✅ | 54.4M | ✅ | 32.5M | 🟢 **-40%** |
| maximum.json | 14 | ✅ | 74.7M | ✅ | 38.0M | 🟢 **-49%** |
| minItems.json | 4 | ✅ | 80.2M | ✅ | 40.8M | 🟢 **-49%** |
| minProperties.json | 6 | ✅ | 58.9M | ✅ | 38.7M | 🟢 **-34%** |
| minimum.json | 17 | ✅ | 75.5M | ✅ | 35.4M | 🟢 **-53%** |
| multipleOf.json | 8 | ✅ | 70.3M | ⚠️ 2 fail | - | - |
| not.json | 20 | ✅ | 73.6M | ✅ | 20.6M | 🟢 **-72%** |
| oneOf.json | 23 | ✅ | 58.8M | ✅ | 12.0M | 🟢 **-80%** |
| pattern.json | 9 | ✅ | 49.9M | ✅ | 39.5M | 🟢 **-21%** |
| patternProperties.json | 18 | ✅ | 15.1M | ✅ | 5.1M | 🟢 **-66%** |
| properties.json | 17 | ✅ | 26.6M | ⚠️ 3 fail | - | - |
| ref.json | 32 | ✅ | 35.7M | ⚠️ 6 fail | - | - |
| required.json | 8 | ✅ | 55.5M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 61.6M | ✅ | 21.4M | 🟢 **-65%** |
| uniqueItems.json | 41 | ✅ | 47.3M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 67.8M | ✅ | 34.1M | 🟢 **-50%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.9M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 11.4M | ✅ | 5.4M | 🟢 **-53%** |
| optional/format/ipv4.json | 16 | ✅ | 45.5M | ✅ | 5.6M | 🟢 **-88%** |
| optional/format/unknown.json | 7 | ✅ | 89.7M | ✅ | 64.8M | 🟢 **-28%** |

### draft6

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 62.2M | ✅ | 26.2M | 🟢 **-58%** |
| additionalProperties.json | 16 | ✅ | 16.3M | ✅ | 8.7M | 🟢 **-47%** |
| allOf.json | 28 | ✅ | 47.2M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 61.4M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 81.4M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 28.9M | ⚠️ 7 fail | - | - |
| default.json | 7 | ✅ | 54.9M | ✅ | 43.6M | 🟢 **-21%** |
| dependencies.json | 32 | ✅ | 33.3M | ⚠️ 2 fail | - | - |
| enum.json | 45 | ✅ | 41.7M | ✅ | 3.6M | 🟢 **-91%** |
| format.json | 54 | ✅ | 49.9M | ✅ | 50.6M | +1% |
| infinite-loop-detection.json | 2 | ✅ | 40.2M | ✅ | 12.6M | 🟢 **-69%** |
| items.json | 17 | ✅ | 27.2M | ⚠️ 3 fail | - | - |
| maxItems.json | 6 | ✅ | 66.9M | ✅ | 36.5M | 🟢 **-45%** |
| maxLength.json | 2 | ✅ | 54.0M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 53.1M | ✅ | 31.6M | 🟢 **-41%** |
| maximum.json | 8 | ✅ | 69.6M | ✅ | 40.4M | 🟢 **-42%** |
| minItems.json | 6 | ✅ | 67.4M | ✅ | 36.0M | 🟢 **-47%** |
| minLength.json | 2 | ✅ | 51.5M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 54.9M | ✅ | 34.2M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 69.4M | ✅ | 40.2M | 🟢 **-42%** |
| multipleOf.json | 8 | ✅ | 64.7M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 73.9M | ✅ | 12.4M | 🟢 **-83%** |
| oneOf.json | 26 | ✅ | 49.4M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 49.9M | ✅ | 38.4M | 🟢 **-23%** |
| patternProperties.json | 18 | ✅ | 15.2M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 28.2M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 85.5M | ⚠️ 5 fail | - | - |
| ref.json | 38 | ✅ | 37.4M | ⚠️ 17 fail | - | - |
| required.json | 9 | ✅ | 62.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 56.5M | ✅ | 21.0M | 🟢 **-63%** |
| uniqueItems.json | 41 | ✅ | 43.7M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 7 | ✅ | 64.0M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.5M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.5M | ✅ | 5.7M | 🟢 **-46%** |
| optional/format/ipv4.json | 16 | ✅ | 43.0M | ✅ | 6.6M | 🟢 **-85%** |
| optional/format/unknown.json | 7 | ✅ | 83.4M | ✅ | 64.6M | 🟢 **-23%** |

### draft7

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 29.5M | ✅ | 24.6M | -17% |
| additionalProperties.json | 16 | ✅ | 28.3M | ✅ | 8.9M | 🟢 **-69%** |
| allOf.json | 28 | ✅ | 49.2M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 65.8M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 86.1M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 8 fail | - | - |
| default.json | 7 | ✅ | 53.4M | ✅ | 46.3M | -13% |
| dependencies.json | 32 | ✅ | 34.5M | ⚠️ 2 fail | - | - |
| enum.json | 45 | ✅ | 43.5M | ✅ | 3.7M | 🟢 **-91%** |
| format.json | 102 | ✅ | 42.7M | ✅ | 49.9M | +17% |
| if-then-else.json | 8 | ✅ | 85.3M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.5M | ✅ | 12.6M | 🟢 **-68%** |
| items.json | 17 | ✅ | 23.5M | ⚠️ 3 fail | - | - |
| maxItems.json | 6 | ✅ | 70.6M | ✅ | 37.9M | 🟢 **-46%** |
| maxLength.json | 2 | ✅ | 55.9M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 48.4M | ✅ | 28.8M | 🟢 **-40%** |
| maximum.json | 8 | ✅ | 72.3M | ✅ | 42.9M | 🟢 **-41%** |
| minItems.json | 6 | ✅ | 69.9M | ✅ | 38.2M | 🟢 **-45%** |
| minLength.json | 2 | ✅ | 55.5M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 56.0M | ✅ | 35.5M | 🟢 **-37%** |
| minimum.json | 11 | ✅ | 72.8M | ✅ | 42.1M | 🟢 **-42%** |
| multipleOf.json | 8 | ✅ | 68.5M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 79.9M | ✅ | 27.0M | 🟢 **-66%** |
| oneOf.json | 26 | ✅ | 60.1M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 54.2M | ✅ | 38.8M | 🟢 **-28%** |
| patternProperties.json | 18 | ✅ | 16.4M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 29.2M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.9M | ⚠️ 5 fail | - | - |
| ref.json | 38 | ✅ | 39.3M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 65.5M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 60.9M | ✅ | 23.0M | 🟢 **-62%** |
| uniqueItems.json | 41 | ✅ | 46.9M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 7 | ✅ | 74.5M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.2M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 43.2M | ✅ | 6.4M | 🟢 **-85%** |
| optional/format/unknown.json | 7 | ✅ | 88.5M | ✅ | 70.5M | 🟢 **-20%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 54.9M | ✅ | 18.7M | 🟢 **-66%** |
| additionalProperties.json | 21 | ✅ | 25.0M | ✅ | 9.2M | 🟢 **-63%** |
| allOf.json | 28 | ✅ | 49.4M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 59.1M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 82.7M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 83.5M | ✅ | 69.3M | -17% |
| default.json | 7 | ✅ | 54.8M | ✅ | 46.4M | -15% |
| dependentRequired.json | 3 | ✅ | 92.5M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 41.5M | ✅ | 3.8M | 🟢 **-91%** |
| format.json | 114 | ✅ | 85.4M | ✅ | 50.5M | 🟢 **-41%** |
| if-then-else.json | 8 | ✅ | 85.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 40.0M | ✅ | 13.4M | 🟢 **-67%** |
| items.json | 17 | ✅ | 24.5M | ⚠️ 3 fail | - | - |
| maxContains.json | 2 | ✅ | 86.4M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 70.6M | ✅ | 38.3M | 🟢 **-46%** |
| maxLength.json | 2 | ✅ | 55.9M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 54.9M | ✅ | 33.0M | 🟢 **-40%** |
| maximum.json | 8 | ✅ | 71.2M | ✅ | 42.3M | 🟢 **-41%** |
| minContains.json | 4 | ✅ | 88.7M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 70.6M | ✅ | 38.5M | 🟢 **-45%** |
| minLength.json | 2 | ✅ | 53.6M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 56.8M | ✅ | 35.1M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 71.9M | ✅ | 39.4M | 🟢 **-45%** |
| multipleOf.json | 8 | ✅ | 67.1M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 79.9M | ⚠️ 1 fail | - | - |
| oneOf.json | 26 | ✅ | 51.2M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 47.6M | ✅ | 40.8M | -14% |
| patternProperties.json | 18 | ✅ | 16.1M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 26.7M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.8M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 41 | ✅ | 41.7M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 65.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 80.4M | ✅ | 22.9M | 🟢 **-71%** |
| unevaluatedItems.json | 15 | ✅ | 59.1M | ⚠️ 21 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 33.4M | ⚠️ 44 fail | - | - |
| uniqueItems.json | 41 | ✅ | 47.0M | ⚠️ 3 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.5M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 69.2M | ⚠️ 2 fail | - | - |
| optional/cross-draft.json | 1 | ✅ | 54.3M | ⚠️ 1 fail | - | - |
| optional/dependencies-compatibility.json | 32 | ✅ | 50.0M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 21.2M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 38.1M | ✅ | 9.1M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 95.9M | ✅ | 70.6M | 🟢 **-26%** |
| optional/no-schema.json | 3 | ✅ | 64.5M | ✅ | 37.7M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 55.2M | ✅ | 25.9M | 🟢 **-53%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 27.1M | ✅ | 8.9M | 🟢 **-67%** |
| allOf.json | 28 | ✅ | 52.0M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 53.0M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 76.6M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 70.4M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 74.7M | ✅ | 64.2M | -14% |
| default.json | 7 | ✅ | 52.8M | ✅ | 41.2M | 🟢 **-22%** |
| dependentRequired.json | 3 | ✅ | 76.6M | ⚠️ 6 fail | - | - |
| dynamicRef.json | 4 | ✅ | 12.2M | ⚠️ 22 fail | - | - |
| enum.json | 45 | ✅ | 39.6M | ✅ | 3.8M | 🟢 **-90%** |
| format.json | 84 | ✅ | 79.0M | ⚠️ 7 fail | - | - |
| if-then-else.json | 8 | ✅ | 75.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 42.1M | ✅ | 11.8M | 🟢 **-72%** |
| items.json | 12 | ✅ | 28.9M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 80.6M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 64.6M | ✅ | 34.6M | 🟢 **-46%** |
| maxLength.json | 2 | ✅ | 52.2M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 51.0M | ✅ | 30.3M | 🟢 **-41%** |
| maximum.json | 8 | ✅ | 66.8M | ✅ | 37.7M | 🟢 **-44%** |
| minContains.json | 4 | ✅ | 79.7M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 59.8M | ✅ | 34.0M | 🟢 **-43%** |
| minLength.json | 2 | ✅ | 45.1M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 52.9M | ✅ | 32.7M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 66.7M | ✅ | 38.1M | 🟢 **-43%** |
| multipleOf.json | 8 | ✅ | 62.7M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 71.1M | ⚠️ 1 fail | - | - |
| oneOf.json | 26 | ✅ | 45.4M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 43.6M | ✅ | 38.3M | -12% |
| patternProperties.json | 18 | ✅ | 16.7M | ⚠️ 3 fail | - | - |
| prefixItems.json | 2 | ✅ | 75.5M | ⚠️ 2 fail | - | - |
| properties.json | 17 | ✅ | 28.4M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 80.5M | ⚠️ 5 fail | - | - |
| ref.json | 39 | ✅ | 36.7M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 54.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 68.9M | ✅ | 20.2M | 🟢 **-71%** |
| unevaluatedItems.json | 17 | ✅ | 52.9M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 29.0M | ⚠️ 44 fail | - | - |
| uniqueItems.json | 31 | ✅ | 52.6M | ⚠️ 5 fail | - | - |
| vocabulary.json | 2 | ✅ | 66.7M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 63.2M | ⚠️ 2 fail | - | - |
| optional/cross-draft.json | 1 | ✅ | 57.1M | ✅ | 44.3M | 🟢 **-22%** |
| optional/dependencies-compatibility.json | 32 | ✅ | 46.3M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.0M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 36.2M | ✅ | 8.2M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 78.5M | ✅ | 57.7M | 🟢 **-26%** |
| optional/format-assertion.json | 4 | ✅ | 23.2M | ✅ | 9.3M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 51.4M | ✅ | 30.4M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 48.9M | ✅ | 18.3M | 🟢 **-63%** |

