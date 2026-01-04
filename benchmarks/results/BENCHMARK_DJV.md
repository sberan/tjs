# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | djv files | djv tests | djv ops/s | tjs vs djv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 30 | 540 | ✅ 30 | 540 | 36.2M | ⚠️ 23/30 | 351 | 4.1M | 🟢 **-89%** |
| draft6 | 37 | 706 | ✅ 37 | 706 | 41.4M | ⚠️ 29/37 | 476 | 4.6M | 🟢 **-89%** |
| draft7 | 38 | 760 | ✅ 38 | 760 | 37.2M | ⚠️ 29/38 | 476 | 4.5M | 🟢 **-88%** |
| draft2019-09 | 48 | 868 | ✅ 48 | 868 | 41.0M | ⚠️ 32/48 | 510 | 4.3M | 🟢 **-89%** |
| draft2020-12 | 48 | 843 | ✅ 48 | 843 | 40.8M | ⚠️ 31/48 | 467 | 4.5M | 🟢 **-89%** |
| **Total** | 201 | 3717 | ✅ 201 | 3717 | 39.5M | ⚠️ 144/201 | 2280 | 4.4M | 🟢 **-89%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs djv**: 🟢 tjs is 10.02x faster (25 ns vs 254 ns, 3717 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 56.8M | ✅ | 11.4M | 🟢 **-80%** |
| additionalProperties.json | 16 | ✅ | 26.2M | ✅ | 8.4M | 🟢 **-68%** |
| allOf.json | 27 | ✅ | 44.8M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 15 | ✅ | 57.0M | ✅ | 3.0M | 🟢 **-95%** |
| default.json | 7 | ✅ | 50.3M | ✅ | 2.5M | 🟢 **-95%** |
| dependencies.json | 25 | ✅ | 28.2M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 35.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.6M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | 21 | ✅ | 24.9M | ✅ | 4.7M | 🟢 **-81%** |
| maxItems.json | 4 | ✅ | 71.7M | ✅ | 17.0M | 🟢 **-76%** |
| maxLength.json | 5 | ✅ | 61.9M | ✅ | 16.1M | 🟢 **-74%** |
| maxProperties.json | 8 | ✅ | 53.1M | ✅ | 14.7M | 🟢 **-72%** |
| maximum.json | 8 | ✅ | 75.2M | ⚠️ 3 fail | - | - |
| minItems.json | 4 | ✅ | 82.2M | ✅ | 16.5M | 🟢 **-80%** |
| minLength.json | 5 | ✅ | 61.5M | ✅ | 10.4M | 🟢 **-83%** |
| minProperties.json | 6 | ✅ | 61.9M | ✅ | 19.2M | 🟢 **-69%** |
| minimum.json | 15 | ✅ | 76.5M | ⚠️ 1 fail | - | - |
| multipleOf.json | 10 | ✅ | 67.3M | ✅ | 8.6M | 🟢 **-87%** |
| not.json | 20 | ✅ | 73.5M | ✅ | 4.6M | 🟢 **-94%** |
| oneOf.json | 23 | ✅ | 57.3M | ✅ | 2.0M | 🟢 **-97%** |
| pattern.json | 9 | ✅ | 49.6M | ✅ | 20.5M | 🟢 **-59%** |
| patternProperties.json | 18 | ✅ | 15.1M | ✅ | 5.8M | 🟢 **-62%** |
| properties.json | 24 | ✅ | 23.0M | ✅ | 1.2M | 🟢 **-95%** |
| ref.json | 35 | ✅ | 29.8M | ⚠️ 10 fail | - | - |
| required.json | 15 | ✅ | 33.8M | ✅ | 3.1M | 🟢 **-91%** |
| type.json | 79 | ✅ | 76.4M | ✅ | 8.0M | 🟢 **-90%** |
| uniqueItems.json | 13 | ✅ | 25.9M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 64.8M | ✅ | 10.3M | 🟢 **-84%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.8M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 90.0M | ✅ | 47.4M | 🟢 **-47%** |

### draft6

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 61.9M | ✅ | 11.2M | 🟢 **-82%** |
| additionalProperties.json | 16 | ✅ | 33.8M | ✅ | 8.8M | 🟢 **-74%** |
| allOf.json | 30 | ✅ | 55.2M | ✅ | 2.7M | 🟢 **-95%** |
| anyOf.json | 18 | ✅ | 59.2M | ✅ | 3.4M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 65.0M | ✅ | 13.3M | 🟢 **-80%** |
| const.json | 23 | ✅ | 68.1M | ⚠️ 12 fail | - | - |
| contains.json | 15 | ✅ | 66.1M | ⚠️ 1 fail | - | - |
| default.json | 7 | ✅ | 56.4M | ✅ | 2.4M | 🟢 **-96%** |
| dependencies.json | 32 | ✅ | 32.8M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 37.3M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 69.5M | ✅ | 8.6M | 🟢 **-88%** |
| exclusiveMinimum.json | 4 | ✅ | 69.6M | ✅ | 8.8M | 🟢 **-87%** |
| infinite-loop-detection.json | 2 | ✅ | 44.4M | ✅ | 1.7M | 🟢 **-96%** |
| items.json | 28 | ✅ | 31.4M | ✅ | 5.7M | 🟢 **-82%** |
| maxItems.json | 6 | ✅ | 70.0M | ✅ | 15.9M | 🟢 **-77%** |
| maxLength.json | 7 | ✅ | 57.5M | ✅ | 16.1M | 🟢 **-72%** |
| maxProperties.json | 10 | ✅ | 54.5M | ✅ | 14.7M | 🟢 **-73%** |
| maximum.json | 8 | ✅ | 72.5M | ✅ | 19.5M | 🟢 **-73%** |
| minItems.json | 6 | ✅ | 70.1M | ✅ | 16.1M | 🟢 **-77%** |
| minLength.json | 7 | ✅ | 56.5M | ✅ | 11.2M | 🟢 **-80%** |
| minProperties.json | 8 | ✅ | 55.7M | ✅ | 17.3M | 🟢 **-69%** |
| minimum.json | 11 | ✅ | 72.8M | ✅ | 16.7M | 🟢 **-77%** |
| multipleOf.json | 10 | ✅ | 67.1M | ✅ | 11.0M | 🟢 **-84%** |
| not.json | 38 | ✅ | 80.6M | ✅ | 5.6M | 🟢 **-93%** |
| oneOf.json | 27 | ✅ | 61.1M | ✅ | 1.9M | 🟢 **-97%** |
| pattern.json | 9 | ✅ | 44.4M | ✅ | 27.4M | 🟢 **-38%** |
| patternProperties.json | 23 | ✅ | 17.2M | ✅ | 5.5M | 🟢 **-68%** |
| properties.json | 28 | ✅ | 29.5M | ✅ | 1.2M | 🟢 **-96%** |
| propertyNames.json | 20 | ✅ | 36.2M | ✅ | 5.4M | 🟢 **-85%** |
| ref.json | 50 | ✅ | 34.3M | ⚠️ 19 fail | - | - |
| required.json | 16 | ✅ | 40.1M | ✅ | 3.3M | 🟢 **-92%** |
| type.json | 80 | ✅ | 85.6M | ✅ | 8.8M | 🟢 **-90%** |
| uniqueItems.json | 13 | ✅ | 25.3M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 70.7M | ✅ | 12.3M | 🟢 **-83%** |
| optional/ecmascript-regex.json | 60 | ✅ | 21.1M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 88.6M | ✅ | 109.0M | 🔴 **+23%** |
| optional/id.json | 4 | ✅ | 44.3M | ⚠️ 2 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.1M | ✅ | 11.3M | 🟢 **-60%** |
| additionalProperties.json | 16 | ✅ | 30.2M | ✅ | 8.8M | 🟢 **-71%** |
| allOf.json | 30 | ✅ | 45.6M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 18 | ✅ | 53.1M | ✅ | 3.3M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 56.4M | ✅ | 13.3M | 🟢 **-76%** |
| const.json | 23 | ✅ | 59.9M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 66.0M | ⚠️ 1 fail | - | - |
| default.json | 7 | ✅ | 50.4M | ✅ | 2.3M | 🟢 **-95%** |
| dependencies.json | 32 | ✅ | 34.6M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 35.3M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 54.1M | ✅ | 8.7M | 🟢 **-84%** |
| exclusiveMinimum.json | 4 | ✅ | 61.1M | ✅ | 8.8M | 🟢 **-86%** |
| format.json | 48 | ✅ | 47.3M | ⚠️ 40 fail | - | - |
| if-then-else.json | 8 | ✅ | 72.9M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.1M | ✅ | 1.7M | 🟢 **-95%** |
| items.json | 28 | ✅ | 28.2M | ✅ | 5.4M | 🟢 **-81%** |
| maxItems.json | 6 | ✅ | 62.2M | ✅ | 16.1M | 🟢 **-74%** |
| maxLength.json | 7 | ✅ | 51.4M | ✅ | 16.3M | 🟢 **-68%** |
| maxProperties.json | 10 | ✅ | 48.6M | ✅ | 15.0M | 🟢 **-69%** |
| maximum.json | 8 | ✅ | 63.4M | ✅ | 19.7M | 🟢 **-69%** |
| minItems.json | 6 | ✅ | 62.4M | ✅ | 15.8M | 🟢 **-75%** |
| minLength.json | 7 | ✅ | 51.0M | ✅ | 11.2M | 🟢 **-78%** |
| minProperties.json | 8 | ✅ | 51.2M | ✅ | 17.6M | 🟢 **-66%** |
| minimum.json | 11 | ✅ | 63.2M | ✅ | 16.6M | 🟢 **-74%** |
| multipleOf.json | 10 | ✅ | 59.4M | ✅ | 11.3M | 🟢 **-81%** |
| not.json | 38 | ✅ | 64.5M | ✅ | 5.5M | 🟢 **-91%** |
| oneOf.json | 27 | ✅ | 48.3M | ✅ | 1.9M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 41.8M | ✅ | 28.0M | 🟢 **-33%** |
| patternProperties.json | 23 | ✅ | 16.6M | ✅ | 5.5M | 🟢 **-67%** |
| properties.json | 28 | ✅ | 25.0M | ✅ | 1.2M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 34.1M | ✅ | 5.4M | 🟢 **-84%** |
| ref.json | 50 | ✅ | 29.3M | ⚠️ 27 fail | - | - |
| required.json | 16 | ✅ | 32.0M | ✅ | 3.3M | 🟢 **-90%** |
| type.json | 80 | ✅ | 66.3M | ✅ | 8.8M | 🟢 **-87%** |
| uniqueItems.json | 13 | ✅ | 24.7M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 61.5M | ✅ | 12.5M | 🟢 **-80%** |
| optional/ecmascript-regex.json | 60 | ✅ | 19.9M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 72.3M | ✅ | 110.4M | 🔴 **+53%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 51.6M | ✅ | 11.0M | 🟢 **-79%** |
| additionalProperties.json | 21 | ✅ | 26.6M | ✅ | 7.3M | 🟢 **-72%** |
| allOf.json | 30 | ✅ | 50.0M | ✅ | 2.7M | 🟢 **-95%** |
| anyOf.json | 18 | ✅ | 59.7M | ✅ | 3.4M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 67.8M | ✅ | 13.3M | 🟢 **-80%** |
| const.json | 23 | ✅ | 68.9M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 65.3M | ⚠️ 1 fail | - | - |
| content.json | 18 | ✅ | 84.2M | ✅ | 116.9M | 🔴 **+39%** |
| default.json | 7 | ✅ | 57.1M | ✅ | 2.4M | 🟢 **-96%** |
| dependentRequired.json | 3 | ✅ | 92.9M | ⚠️ 6 fail | - | - |
| enum.json | 33 | ✅ | 38.7M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 69.5M | ✅ | 8.8M | 🟢 **-87%** |
| exclusiveMinimum.json | 4 | ✅ | 69.6M | ✅ | 8.8M | 🟢 **-87%** |
| format.json | 60 | ✅ | 87.4M | ⚠️ 40 fail | - | - |
| if-then-else.json | 8 | ✅ | 85.4M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 44.8M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | 28 | ✅ | 30.5M | ✅ | 5.7M | 🟢 **-81%** |
| maxContains.json | 2 | ✅ | 90.7M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 70.7M | ✅ | 15.9M | 🟢 **-78%** |
| maxLength.json | 7 | ✅ | 58.2M | ✅ | 15.8M | 🟢 **-73%** |
| maxProperties.json | 10 | ✅ | 54.8M | ✅ | 14.9M | 🟢 **-73%** |
| maximum.json | 8 | ✅ | 72.2M | ✅ | 19.8M | 🟢 **-73%** |
| minContains.json | 7 | ✅ | 70.2M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 70.6M | ✅ | 15.9M | 🟢 **-78%** |
| minLength.json | 7 | ✅ | 54.0M | ✅ | 11.0M | 🟢 **-80%** |
| minProperties.json | 8 | ✅ | 56.3M | ✅ | 17.7M | 🟢 **-69%** |
| minimum.json | 11 | ✅ | 72.7M | ✅ | 16.9M | 🟢 **-77%** |
| multipleOf.json | 10 | ✅ | 67.3M | ✅ | 11.1M | 🟢 **-84%** |
| not.json | 38 | ✅ | 80.4M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 52.8M | ✅ | 1.9M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 48.0M | ✅ | 29.4M | 🟢 **-39%** |
| patternProperties.json | 23 | ✅ | 17.4M | ✅ | 5.5M | 🟢 **-68%** |
| properties.json | 28 | ✅ | 29.5M | ✅ | 1.2M | 🟢 **-96%** |
| propertyNames.json | 20 | ✅ | 34.8M | ✅ | 5.5M | 🟢 **-84%** |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 45 | ✅ | 41.0M | ⚠️ 32 fail | - | - |
| required.json | 16 | ✅ | 39.2M | ✅ | 3.2M | 🟢 **-92%** |
| type.json | 80 | ✅ | 78.2M | ✅ | 8.8M | 🟢 **-89%** |
| unevaluatedItems.json | 15 | ✅ | 54.1M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 31.6M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 13 | ✅ | 25.6M | ⚠️ 30 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.5M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 65.9M | ✅ | 12.1M | 🟢 **-82%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 48.8M | ✅ | 2.3M | 🟢 **-95%** |
| optional/ecmascript-regex.json | 60 | ✅ | 21.3M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 95.6M | ✅ | 111.1M | +16% |
| optional/no-schema.json | 3 | ✅ | 54.9M | ✅ | 14.3M | 🟢 **-74%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 54.3M | ✅ | 2.1M | 🟢 **-96%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 28.0M | ✅ | 7.5M | 🟢 **-73%** |
| allOf.json | 30 | ✅ | 44.8M | ✅ | 3.0M | 🟢 **-93%** |
| anyOf.json | 18 | ✅ | 52.8M | ✅ | 3.6M | 🟢 **-93%** |
| boolean_schema.json | 18 | ✅ | 58.7M | ✅ | 13.5M | 🟢 **-77%** |
| const.json | 23 | ✅ | 62.2M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 62.3M | ⚠️ 1 fail | - | - |
| content.json | 18 | ✅ | 70.4M | ✅ | 120.5M | 🔴 **+71%** |
| default.json | 7 | ✅ | 47.9M | ✅ | 2.6M | 🟢 **-95%** |
| dependentRequired.json | 3 | ✅ | 82.5M | ⚠️ 6 fail | - | - |
| enum.json | 33 | ✅ | 36.3M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 64.6M | ✅ | 9.2M | 🟢 **-86%** |
| exclusiveMinimum.json | 4 | ✅ | 67.4M | ✅ | 9.2M | 🟢 **-86%** |
| format.json | 70 | ✅ | 74.7M | ⚠️ 49 fail | - | - |
| if-then-else.json | 8 | ✅ | 71.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.0M | ✅ | 1.9M | 🟢 **-94%** |
| items.json | 14 | ✅ | 27.4M | ⚠️ 7 fail | - | - |
| maxContains.json | 2 | ✅ | 83.3M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 63.7M | ✅ | 16.8M | 🟢 **-74%** |
| maxLength.json | 7 | ✅ | 54.7M | ✅ | 15.9M | 🟢 **-71%** |
| maxProperties.json | 10 | ✅ | 51.1M | ✅ | 14.9M | 🟢 **-71%** |
| maximum.json | 8 | ✅ | 69.1M | ✅ | 20.2M | 🟢 **-71%** |
| minContains.json | 7 | ✅ | 63.0M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 65.4M | ✅ | 16.5M | 🟢 **-75%** |
| minLength.json | 7 | ✅ | 48.8M | ✅ | 11.0M | 🟢 **-77%** |
| minProperties.json | 8 | ✅ | 52.1M | ✅ | 18.0M | 🟢 **-65%** |
| minimum.json | 11 | ✅ | 68.8M | ✅ | 18.1M | 🟢 **-74%** |
| multipleOf.json | 10 | ✅ | 60.8M | ✅ | 9.7M | 🟢 **-84%** |
| not.json | 38 | ✅ | 71.8M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 49.7M | ✅ | 2.1M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 46.8M | ✅ | 29.4M | 🟢 **-37%** |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 5.8M | 🟢 **-64%** |
| prefixItems.json | 2 | ✅ | 77.7M | ⚠️ 2 fail | - | - |
| properties.json | 28 | ✅ | 25.7M | ✅ | 1.3M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 31.6M | ✅ | 5.4M | 🟢 **-83%** |
| ref.json | 43 | ✅ | 35.2M | ⚠️ 31 fail | - | - |
| required.json | 16 | ✅ | 34.2M | ✅ | 3.6M | 🟢 **-90%** |
| type.json | 80 | ✅ | 68.3M | ✅ | 9.2M | 🟢 **-87%** |
| unevaluatedItems.json | 17 | ✅ | 47.7M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 28.6M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 8 | ✅ | 28.9M | ⚠️ 32 fail | - | - |
| vocabulary.json | 2 | ✅ | 67.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 58.5M | ✅ | 12.2M | 🟢 **-79%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 41.0M | ✅ | 2.6M | 🟢 **-94%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.7M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 80.1M | ✅ | 111.5M | 🔴 **+39%** |
| optional/format-assertion.json | 4 | ✅ | 23.4M | ✅ | 6.7M | 🟢 **-72%** |
| optional/no-schema.json | 3 | ✅ | 55.0M | ✅ | 14.3M | 🟢 **-74%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.7M | ✅ | 2.3M | 🟢 **-95%** |

