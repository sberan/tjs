# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | djv files | djv tests | djv ops/s | tjs vs djv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 30 | 540 | ✅ 30 | 540 | 36.2M | ⚠️ 23/30 | 351 | 3.9M | 🟢 **-89%** |
| draft6 | 37 | 706 | ✅ 37 | 706 | 37.7M | ⚠️ 29/37 | 476 | 4.6M | 🟢 **-88%** |
| draft7 | 38 | 760 | ✅ 38 | 760 | 39.3M | ⚠️ 29/38 | 476 | 4.6M | 🟢 **-88%** |
| draft2019-09 | 48 | 868 | ✅ 48 | 868 | 39.2M | ⚠️ 32/48 | 510 | 4.1M | 🟢 **-89%** |
| draft2020-12 | 48 | 843 | ✅ 48 | 843 | 42.8M | ⚠️ 31/48 | 467 | 4.1M | 🟢 **-90%** |
| **Total** | 201 | 3717 | ✅ 201 | 3717 | 39.2M | ⚠️ 144/201 | 2280 | 4.3M | 🟢 **-89%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs djv**: 🟢 tjs is 10.20x faster (26 ns vs 260 ns, 3717 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 60.8M | ✅ | 10.3M | 🟢 **-83%** |
| additionalProperties.json | 16 | ✅ | 26.8M | ✅ | 8.1M | 🟢 **-70%** |
| allOf.json | 27 | ✅ | 50.8M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | 15 | ✅ | 57.0M | ✅ | 2.9M | 🟢 **-95%** |
| default.json | 7 | ✅ | 52.9M | ✅ | 2.3M | 🟢 **-96%** |
| dependencies.json | 25 | ✅ | 31.4M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 35.1M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 42.4M | ✅ | 1.7M | 🟢 **-96%** |
| items.json | 21 | ✅ | 26.5M | ✅ | 4.4M | 🟢 **-83%** |
| maxItems.json | 4 | ✅ | 70.5M | ✅ | 15.2M | 🟢 **-78%** |
| maxLength.json | 5 | ✅ | 54.7M | ✅ | 16.3M | 🟢 **-70%** |
| maxProperties.json | 8 | ✅ | 52.2M | ✅ | 14.6M | 🟢 **-72%** |
| maximum.json | 8 | ✅ | 66.4M | ⚠️ 3 fail | - | - |
| minItems.json | 4 | ✅ | 70.5M | ✅ | 16.1M | 🟢 **-77%** |
| minLength.json | 5 | ✅ | 53.4M | ✅ | 10.7M | 🟢 **-80%** |
| minProperties.json | 6 | ✅ | 55.9M | ✅ | 18.4M | 🟢 **-67%** |
| minimum.json | 15 | ✅ | 74.5M | ⚠️ 1 fail | - | - |
| multipleOf.json | 10 | ✅ | 60.5M | ✅ | 9.2M | 🟢 **-85%** |
| not.json | 20 | ✅ | 67.3M | ✅ | 4.6M | 🟢 **-93%** |
| oneOf.json | 23 | ✅ | 54.1M | ✅ | 1.9M | 🟢 **-97%** |
| pattern.json | 9 | ✅ | 43.3M | ✅ | 20.6M | 🟢 **-53%** |
| patternProperties.json | 18 | ✅ | 16.6M | ✅ | 5.5M | 🟢 **-67%** |
| properties.json | 24 | ✅ | 23.6M | ✅ | 1.1M | 🟢 **-95%** |
| ref.json | 35 | ✅ | 29.8M | ⚠️ 10 fail | - | - |
| required.json | 15 | ✅ | 31.8M | ✅ | 2.9M | 🟢 **-91%** |
| type.json | 79 | ✅ | 69.9M | ✅ | 7.8M | 🟢 **-89%** |
| uniqueItems.json | 13 | ✅ | 24.6M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 62.6M | ✅ | 10.3M | 🟢 **-84%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.5M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 78.0M | ✅ | 45.7M | 🟢 **-41%** |

### draft6

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.2M | ✅ | 11.3M | 🟢 **-60%** |
| additionalProperties.json | 16 | ✅ | 27.3M | ✅ | 8.9M | 🟢 **-67%** |
| allOf.json | 30 | ✅ | 47.3M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 18 | ✅ | 61.0M | ✅ | 3.4M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 73.2M | ✅ | 13.3M | 🟢 **-82%** |
| const.json | 23 | ✅ | 62.8M | ⚠️ 12 fail | - | - |
| contains.json | 15 | ✅ | 60.8M | ⚠️ 1 fail | - | - |
| default.json | 7 | ✅ | 52.6M | ✅ | 2.3M | 🟢 **-96%** |
| dependencies.json | 32 | ✅ | 33.0M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 36.8M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 63.9M | ✅ | 8.7M | 🟢 **-86%** |
| exclusiveMinimum.json | 4 | ✅ | 64.0M | ✅ | 8.8M | 🟢 **-86%** |
| infinite-loop-detection.json | 2 | ✅ | 39.0M | ✅ | 1.7M | 🟢 **-96%** |
| items.json | 28 | ✅ | 30.1M | ✅ | 5.6M | 🟢 **-81%** |
| maxItems.json | 6 | ✅ | 64.5M | ✅ | 16.1M | 🟢 **-75%** |
| maxLength.json | 7 | ✅ | 53.9M | ✅ | 15.9M | 🟢 **-71%** |
| maxProperties.json | 10 | ✅ | 49.1M | ✅ | 14.9M | 🟢 **-70%** |
| maximum.json | 8 | ✅ | 66.3M | ✅ | 19.9M | 🟢 **-70%** |
| minItems.json | 6 | ✅ | 64.5M | ✅ | 16.1M | 🟢 **-75%** |
| minLength.json | 7 | ✅ | 52.8M | ✅ | 11.0M | 🟢 **-79%** |
| minProperties.json | 8 | ✅ | 53.2M | ✅ | 17.7M | 🟢 **-67%** |
| minimum.json | 11 | ✅ | 66.3M | ✅ | 16.7M | 🟢 **-75%** |
| multipleOf.json | 10 | ✅ | 60.6M | ✅ | 11.1M | 🟢 **-82%** |
| not.json | 38 | ✅ | 70.6M | ✅ | 5.7M | 🟢 **-92%** |
| oneOf.json | 27 | ✅ | 56.7M | ✅ | 1.9M | 🟢 **-97%** |
| pattern.json | 9 | ✅ | 51.7M | ✅ | 29.1M | 🟢 **-44%** |
| patternProperties.json | 23 | ✅ | 16.8M | ✅ | 5.5M | 🟢 **-67%** |
| properties.json | 28 | ✅ | 28.4M | ✅ | 1.2M | 🟢 **-96%** |
| propertyNames.json | 20 | ✅ | 34.8M | ✅ | 5.4M | 🟢 **-85%** |
| ref.json | 50 | ✅ | 28.8M | ⚠️ 19 fail | - | - |
| required.json | 16 | ✅ | 33.0M | ✅ | 3.3M | 🟢 **-90%** |
| type.json | 80 | ✅ | 73.4M | ✅ | 8.8M | 🟢 **-88%** |
| uniqueItems.json | 13 | ✅ | 25.0M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 44.7M | ✅ | 12.5M | 🟢 **-72%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.1M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 79.4M | ✅ | 111.0M | 🔴 **+40%** |
| optional/id.json | 4 | ✅ | 42.0M | ⚠️ 2 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 29.3M | ✅ | 11.2M | 🟢 **-62%** |
| additionalProperties.json | 16 | ✅ | 28.5M | ✅ | 9.0M | 🟢 **-68%** |
| allOf.json | 30 | ✅ | 48.6M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 18 | ✅ | 65.7M | ✅ | 3.3M | 🟢 **-95%** |
| boolean_schema.json | 18 | ✅ | 67.3M | ✅ | 13.1M | 🟢 **-81%** |
| const.json | 23 | ✅ | 67.9M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 66.0M | ⚠️ 1 fail | - | - |
| default.json | 7 | ✅ | 54.1M | ✅ | 2.4M | 🟢 **-96%** |
| dependencies.json | 32 | ✅ | 36.7M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 37.1M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 66.0M | ✅ | 8.6M | 🟢 **-87%** |
| exclusiveMinimum.json | 4 | ✅ | 69.7M | ✅ | 8.6M | 🟢 **-88%** |
| format.json | 48 | ✅ | 46.5M | ⚠️ 40 fail | - | - |
| if-then-else.json | 8 | ✅ | 85.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 43.6M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | 28 | ✅ | 31.2M | ✅ | 5.7M | 🟢 **-82%** |
| maxItems.json | 6 | ✅ | 55.9M | ✅ | 16.1M | 🟢 **-71%** |
| maxLength.json | 7 | ✅ | 55.0M | ✅ | 16.2M | 🟢 **-70%** |
| maxProperties.json | 10 | ✅ | 53.3M | ✅ | 14.2M | 🟢 **-73%** |
| maximum.json | 8 | ✅ | 72.7M | ✅ | 19.8M | 🟢 **-73%** |
| minItems.json | 6 | ✅ | 70.5M | ✅ | 16.1M | 🟢 **-77%** |
| minLength.json | 7 | ✅ | 57.3M | ✅ | 11.2M | 🟢 **-80%** |
| minProperties.json | 8 | ✅ | 54.5M | ✅ | 17.8M | 🟢 **-67%** |
| minimum.json | 11 | ✅ | 72.8M | ✅ | 16.8M | 🟢 **-77%** |
| multipleOf.json | 10 | ✅ | 67.2M | ✅ | 10.8M | 🟢 **-84%** |
| not.json | 38 | ✅ | 72.7M | ✅ | 5.6M | 🟢 **-92%** |
| oneOf.json | 27 | ✅ | 51.7M | ✅ | 2.0M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 46.7M | ✅ | 27.8M | 🟢 **-41%** |
| patternProperties.json | 23 | ✅ | 16.6M | ✅ | 5.4M | 🟢 **-68%** |
| properties.json | 28 | ✅ | 28.1M | ✅ | 1.2M | 🟢 **-96%** |
| propertyNames.json | 20 | ✅ | 34.5M | ✅ | 5.3M | 🟢 **-85%** |
| ref.json | 50 | ✅ | 32.8M | ⚠️ 27 fail | - | - |
| required.json | 16 | ✅ | 34.1M | ✅ | 3.3M | 🟢 **-90%** |
| type.json | 80 | ✅ | 58.5M | ✅ | 8.6M | 🟢 **-85%** |
| uniqueItems.json | 13 | ✅ | 25.4M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 71.0M | ✅ | 12.4M | 🟢 **-83%** |
| optional/ecmascript-regex.json | 60 | ✅ | 21.2M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 94.9M | ✅ | 109.3M | +15% |

### draft2019-09

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 29.0M | ✅ | 11.2M | 🟢 **-61%** |
| additionalProperties.json | 21 | ✅ | 26.8M | ✅ | 7.3M | 🟢 **-73%** |
| allOf.json | 30 | ✅ | 55.3M | ✅ | 2.7M | 🟢 **-95%** |
| anyOf.json | 18 | ✅ | 60.2M | ✅ | 3.3M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 67.9M | ✅ | 13.3M | 🟢 **-80%** |
| const.json | 23 | ✅ | 67.5M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 74.9M | ⚠️ 1 fail | - | - |
| content.json | 18 | ✅ | 78.9M | ✅ | 116.4M | 🔴 **+48%** |
| default.json | 7 | ✅ | 56.0M | ✅ | 2.4M | 🟢 **-96%** |
| dependentRequired.json | 3 | ✅ | 92.7M | ⚠️ 6 fail | - | - |
| enum.json | 33 | ✅ | 38.0M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 83.3M | ✅ | 8.8M | 🟢 **-89%** |
| exclusiveMinimum.json | 4 | ✅ | 69.7M | ✅ | 8.6M | 🟢 **-88%** |
| format.json | 60 | ✅ | 88.6M | ⚠️ 40 fail | - | - |
| if-then-else.json | 8 | ✅ | 84.1M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 43.2M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | 28 | ✅ | 30.5M | ✅ | 5.6M | 🟢 **-82%** |
| maxContains.json | 2 | ✅ | 90.9M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 70.5M | ✅ | 16.0M | 🟢 **-77%** |
| maxLength.json | 7 | ✅ | 54.5M | ✅ | 16.3M | 🟢 **-70%** |
| maxProperties.json | 10 | ✅ | 54.6M | ✅ | 14.8M | 🟢 **-73%** |
| maximum.json | 8 | ✅ | 71.6M | ✅ | 19.9M | 🟢 **-72%** |
| minContains.json | 7 | ✅ | 70.7M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 70.3M | ✅ | 16.1M | 🟢 **-77%** |
| minLength.json | 7 | ✅ | 54.6M | ✅ | 11.1M | 🟢 **-80%** |
| minProperties.json | 8 | ✅ | 56.6M | ✅ | 17.7M | 🟢 **-69%** |
| minimum.json | 11 | ✅ | 72.9M | ✅ | 16.9M | 🟢 **-77%** |
| multipleOf.json | 10 | ✅ | 67.3M | ✅ | 11.1M | 🟢 **-84%** |
| not.json | 38 | ✅ | 79.8M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 53.0M | ✅ | 1.5M | 🟢 **-97%** |
| pattern.json | 9 | ✅ | 47.5M | ✅ | 28.8M | 🟢 **-39%** |
| patternProperties.json | 23 | ✅ | 17.1M | ✅ | 5.4M | 🟢 **-68%** |
| properties.json | 28 | ✅ | 26.0M | ✅ | 1.2M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 28.6M | ✅ | 5.4M | 🟢 **-81%** |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 45 | ✅ | 34.9M | ⚠️ 32 fail | - | - |
| required.json | 16 | ✅ | 37.0M | ✅ | 3.3M | 🟢 **-91%** |
| type.json | 80 | ✅ | 80.2M | ✅ | 8.7M | 🟢 **-89%** |
| unevaluatedItems.json | 15 | ✅ | 59.0M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 33.4M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 13 | ✅ | 25.5M | ⚠️ 30 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 66.9M | ✅ | 12.4M | 🟢 **-81%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 41.1M | ✅ | 2.3M | 🟢 **-94%** |
| optional/ecmascript-regex.json | 60 | ✅ | 19.3M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 91.4M | ✅ | 111.0M | 🔴 **+21%** |
| optional/no-schema.json | 3 | ✅ | 64.6M | ✅ | 14.6M | 🟢 **-77%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 52.8M | ✅ | 2.0M | 🟢 **-96%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 31.2M | ✅ | 7.4M | 🟢 **-76%** |
| allOf.json | 30 | ✅ | 49.3M | ✅ | 2.7M | 🟢 **-95%** |
| anyOf.json | 18 | ✅ | 62.2M | ✅ | 3.3M | 🟢 **-95%** |
| boolean_schema.json | 18 | ✅ | 64.6M | ✅ | 13.1M | 🟢 **-80%** |
| const.json | 23 | ✅ | 65.1M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 63.2M | ⚠️ 1 fail | - | - |
| content.json | 18 | ✅ | 79.4M | ✅ | 115.8M | 🔴 **+46%** |
| default.json | 7 | ✅ | 54.2M | ✅ | 2.4M | 🟢 **-96%** |
| dependentRequired.json | 3 | ✅ | 87.0M | ⚠️ 6 fail | - | - |
| enum.json | 33 | ✅ | 36.9M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 66.1M | ✅ | 8.7M | 🟢 **-87%** |
| exclusiveMinimum.json | 4 | ✅ | 63.1M | ✅ | 8.8M | 🟢 **-86%** |
| format.json | 70 | ✅ | 84.5M | ⚠️ 49 fail | - | - |
| if-then-else.json | 8 | ✅ | 81.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 43.6M | ✅ | 1.7M | 🟢 **-96%** |
| items.json | 14 | ✅ | 29.4M | ⚠️ 7 fail | - | - |
| maxContains.json | 2 | ✅ | 85.6M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 67.2M | ✅ | 16.2M | 🟢 **-76%** |
| maxLength.json | 7 | ✅ | 54.8M | ✅ | 16.4M | 🟢 **-70%** |
| maxProperties.json | 10 | ✅ | 52.9M | ✅ | 15.0M | 🟢 **-72%** |
| maximum.json | 8 | ✅ | 69.6M | ✅ | 19.7M | 🟢 **-72%** |
| minContains.json | 7 | ✅ | 67.6M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 67.3M | ✅ | 16.0M | 🟢 **-76%** |
| minLength.json | 7 | ✅ | 53.7M | ✅ | 11.2M | 🟢 **-79%** |
| minProperties.json | 8 | ✅ | 55.0M | ✅ | 17.6M | 🟢 **-68%** |
| minimum.json | 11 | ✅ | 69.4M | ✅ | 16.7M | 🟢 **-76%** |
| multipleOf.json | 10 | ✅ | 64.8M | ✅ | 10.9M | 🟢 **-83%** |
| not.json | 38 | ✅ | 76.6M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 50.7M | ✅ | 1.9M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 43.5M | ✅ | 29.5M | 🟢 **-32%** |
| patternProperties.json | 23 | ✅ | 16.5M | ✅ | 5.4M | 🟢 **-67%** |
| prefixItems.json | 2 | ✅ | 79.7M | ⚠️ 2 fail | - | - |
| properties.json | 28 | ✅ | 27.3M | ✅ | 1.2M | 🟢 **-96%** |
| propertyNames.json | 20 | ✅ | 34.0M | ✅ | 5.4M | 🟢 **-84%** |
| ref.json | 43 | ✅ | 37.9M | ⚠️ 31 fail | - | - |
| required.json | 16 | ✅ | 33.9M | ✅ | 3.3M | 🟢 **-90%** |
| type.json | 80 | ✅ | 72.4M | ✅ | 8.5M | 🟢 **-88%** |
| unevaluatedItems.json | 17 | ✅ | 51.7M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 28.9M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 8 | ✅ | 32.8M | ⚠️ 32 fail | - | - |
| vocabulary.json | 2 | ✅ | 70.1M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 64.0M | ✅ | 12.4M | 🟢 **-81%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 44.5M | ✅ | 2.3M | 🟢 **-95%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.0M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 83.4M | ✅ | 110.8M | 🔴 **+33%** |
| optional/format-assertion.json | 4 | ✅ | 23.7M | ✅ | 6.6M | 🟢 **-72%** |
| optional/no-schema.json | 3 | ✅ | 60.9M | ✅ | 14.5M | 🟢 **-76%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 51.7M | ✅ | 2.1M | 🟢 **-96%** |

