# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | djv files | djv tests | djv ops/s | tjs vs djv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 30 | 540 | ✅ 30 | 540 | 31.3M | ⚠️ 23/30 | 351 | 3.8M | 🟢 **-88%** |
| draft6 | 37 | 706 | ✅ 37 | 706 | 33.4M | ⚠️ 29/37 | 476 | 4.5M | 🟢 **-86%** |
| draft7 | 38 | 760 | ✅ 38 | 760 | 35.8M | ⚠️ 29/38 | 476 | 4.6M | 🟢 **-87%** |
| draft2019-09 | 48 | 868 | ✅ 48 | 868 | 35.7M | ⚠️ 32/48 | 510 | 4.3M | 🟢 **-88%** |
| draft2020-12 | 48 | 843 | ✅ 48 | 843 | 38.4M | ⚠️ 31/48 | 467 | 4.1M | 🟢 **-89%** |
| **Total** | 201 | 3717 | ✅ 201 | 3717 | 35.1M | ⚠️ 144/201 | 2280 | 4.3M | 🟢 **-88%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs djv**: 🟢 tjs is 9.13x faster (28 ns vs 260 ns, 3717 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 50.3M | ✅ | 10.1M | 🟢 **-80%** |
| additionalProperties.json | 16 | ✅ | 15.7M | ✅ | 7.9M | 🟢 **-50%** |
| allOf.json | 27 | ✅ | 40.9M | ✅ | 2.5M | 🟢 **-94%** |
| anyOf.json | 15 | ✅ | 50.3M | ✅ | 2.9M | 🟢 **-94%** |
| default.json | 7 | ✅ | 44.3M | ✅ | 2.2M | 🟢 **-95%** |
| dependencies.json | 25 | ✅ | 29.4M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 30.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 32.2M | ✅ | 1.7M | 🟢 **-95%** |
| items.json | 21 | ✅ | 24.0M | ✅ | 4.4M | 🟢 **-82%** |
| maxItems.json | 4 | ✅ | 60.4M | ✅ | 15.7M | 🟢 **-74%** |
| maxLength.json | 5 | ✅ | 51.6M | ✅ | 16.3M | 🟢 **-68%** |
| maxProperties.json | 8 | ✅ | 43.3M | ✅ | 14.7M | 🟢 **-66%** |
| maximum.json | 8 | ✅ | 56.3M | ⚠️ 3 fail | - | - |
| minItems.json | 4 | ✅ | 56.5M | ✅ | 15.7M | 🟢 **-72%** |
| minLength.json | 5 | ✅ | 48.2M | ✅ | 10.6M | 🟢 **-78%** |
| minProperties.json | 6 | ✅ | 48.8M | ✅ | 18.5M | 🟢 **-62%** |
| minimum.json | 15 | ✅ | 58.9M | ⚠️ 1 fail | - | - |
| multipleOf.json | 10 | ✅ | 53.7M | ✅ | 9.1M | 🟢 **-83%** |
| not.json | 20 | ✅ | 58.5M | ✅ | 4.5M | 🟢 **-92%** |
| oneOf.json | 23 | ✅ | 48.2M | ✅ | 1.9M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 45.0M | ✅ | 20.5M | 🟢 **-54%** |
| patternProperties.json | 18 | ✅ | 15.5M | ✅ | 5.5M | 🟢 **-65%** |
| properties.json | 24 | ✅ | 22.0M | ✅ | 1.1M | 🟢 **-95%** |
| ref.json | 35 | ✅ | 25.1M | ⚠️ 10 fail | - | - |
| required.json | 15 | ✅ | 33.0M | ✅ | 2.9M | 🟢 **-91%** |
| type.json | 79 | ✅ | 56.1M | ✅ | 7.8M | 🟢 **-86%** |
| uniqueItems.json | 13 | ✅ | 22.5M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 57.7M | ✅ | 10.4M | 🟢 **-82%** |
| optional/ecmascript-regex.json | 60 | ✅ | 18.1M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 64.7M | ✅ | 45.8M | 🟢 **-29%** |

### draft6

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 26.0M | ✅ | 10.9M | 🟢 **-58%** |
| additionalProperties.json | 16 | ✅ | 27.0M | ✅ | 8.6M | 🟢 **-68%** |
| allOf.json | 30 | ✅ | 41.4M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 18 | ✅ | 54.2M | ✅ | 3.3M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 52.6M | ✅ | 13.2M | 🟢 **-75%** |
| const.json | 23 | ✅ | 53.8M | ⚠️ 12 fail | - | - |
| contains.json | 15 | ✅ | 55.2M | ⚠️ 1 fail | - | - |
| default.json | 7 | ✅ | 46.8M | ✅ | 2.4M | 🟢 **-95%** |
| dependencies.json | 32 | ✅ | 27.7M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 31.6M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 53.8M | ✅ | 8.7M | 🟢 **-84%** |
| exclusiveMinimum.json | 4 | ✅ | 54.9M | ✅ | 8.7M | 🟢 **-84%** |
| infinite-loop-detection.json | 2 | ✅ | 36.0M | ✅ | 1.7M | 🟢 **-95%** |
| items.json | 28 | ✅ | 26.3M | ✅ | 5.6M | 🟢 **-79%** |
| maxItems.json | 6 | ✅ | 57.7M | ✅ | 15.8M | 🟢 **-73%** |
| maxLength.json | 7 | ✅ | 47.7M | ✅ | 15.9M | 🟢 **-67%** |
| maxProperties.json | 10 | ✅ | 43.9M | ✅ | 14.7M | 🟢 **-67%** |
| maximum.json | 8 | ✅ | 59.4M | ✅ | 19.6M | 🟢 **-67%** |
| minItems.json | 6 | ✅ | 57.7M | ✅ | 16.0M | 🟢 **-72%** |
| minLength.json | 7 | ✅ | 48.2M | ✅ | 11.2M | 🟢 **-77%** |
| minProperties.json | 8 | ✅ | 46.7M | ✅ | 17.3M | 🟢 **-63%** |
| minimum.json | 11 | ✅ | 59.2M | ✅ | 17.8M | 🟢 **-70%** |
| multipleOf.json | 10 | ✅ | 56.4M | ✅ | 11.0M | 🟢 **-80%** |
| not.json | 38 | ✅ | 54.2M | ✅ | 5.4M | 🟢 **-90%** |
| oneOf.json | 27 | ✅ | 40.0M | ✅ | 1.9M | 🟢 **-95%** |
| pattern.json | 9 | ✅ | 38.6M | ✅ | 28.2M | 🟢 **-27%** |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 5.5M | 🟢 **-65%** |
| properties.json | 28 | ✅ | 24.6M | ✅ | 1.2M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 28.1M | ✅ | 5.3M | 🟢 **-81%** |
| ref.json | 50 | ✅ | 28.6M | ⚠️ 19 fail | - | - |
| required.json | 16 | ✅ | 34.8M | ✅ | 3.3M | 🟢 **-91%** |
| type.json | 80 | ✅ | 57.1M | ✅ | 8.5M | 🟢 **-85%** |
| uniqueItems.json | 13 | ✅ | 23.0M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 56.2M | ✅ | 11.9M | 🟢 **-79%** |
| optional/ecmascript-regex.json | 60 | ✅ | 18.7M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 110.9M | 🔴 **+70%** |
| optional/id.json | 4 | ✅ | 39.4M | ⚠️ 2 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 46.6M | ✅ | 11.2M | 🟢 **-76%** |
| additionalProperties.json | 16 | ✅ | 29.4M | ✅ | 9.0M | 🟢 **-70%** |
| allOf.json | 30 | ✅ | 40.6M | ✅ | 2.7M | 🟢 **-93%** |
| anyOf.json | 18 | ✅ | 55.9M | ✅ | 3.3M | 🟢 **-94%** |
| boolean_schema.json | 18 | ✅ | 52.6M | ✅ | 13.4M | 🟢 **-75%** |
| const.json | 23 | ✅ | 55.9M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 55.6M | ⚠️ 1 fail | - | - |
| default.json | 7 | ✅ | 48.2M | ✅ | 2.4M | 🟢 **-95%** |
| dependencies.json | 32 | ✅ | 32.4M | ⚠️ 1 fail | - | - |
| enum.json | 33 | ✅ | 32.3M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 60.1M | ✅ | 8.8M | 🟢 **-85%** |
| exclusiveMinimum.json | 4 | ✅ | 59.9M | ✅ | 8.9M | 🟢 **-85%** |
| format.json | 48 | ✅ | 46.9M | ⚠️ 40 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.7M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.7M | ✅ | 1.7M | 🟢 **-95%** |
| items.json | 28 | ✅ | 27.2M | ✅ | 5.5M | 🟢 **-80%** |
| maxItems.json | 6 | ✅ | 59.1M | ✅ | 16.2M | 🟢 **-73%** |
| maxLength.json | 7 | ✅ | 49.7M | ✅ | 16.1M | 🟢 **-68%** |
| maxProperties.json | 10 | ✅ | 44.4M | ✅ | 14.8M | 🟢 **-67%** |
| maximum.json | 8 | ✅ | 61.2M | ✅ | 19.8M | 🟢 **-68%** |
| minItems.json | 6 | ✅ | 59.5M | ✅ | 16.1M | 🟢 **-73%** |
| minLength.json | 7 | ✅ | 49.3M | ✅ | 11.2M | 🟢 **-77%** |
| minProperties.json | 8 | ✅ | 46.4M | ✅ | 17.7M | 🟢 **-62%** |
| minimum.json | 11 | ✅ | 61.6M | ✅ | 16.7M | 🟢 **-73%** |
| multipleOf.json | 10 | ✅ | 58.3M | ✅ | 11.1M | 🟢 **-81%** |
| not.json | 38 | ✅ | 60.0M | ✅ | 5.5M | 🟢 **-91%** |
| oneOf.json | 27 | ✅ | 37.9M | ✅ | 1.9M | 🟢 **-95%** |
| pattern.json | 9 | ✅ | 41.4M | ✅ | 28.6M | 🟢 **-31%** |
| patternProperties.json | 23 | ✅ | 15.9M | ✅ | 5.5M | 🟢 **-65%** |
| properties.json | 28 | ✅ | 23.5M | ✅ | 1.2M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 30.3M | ✅ | 5.4M | 🟢 **-82%** |
| ref.json | 50 | ✅ | 29.7M | ⚠️ 27 fail | - | - |
| required.json | 16 | ✅ | 30.5M | ✅ | 3.3M | 🟢 **-89%** |
| type.json | 80 | ✅ | 59.3M | ✅ | 8.6M | 🟢 **-85%** |
| uniqueItems.json | 13 | ✅ | 23.5M | ⚠️ 30 fail | - | - |
| optional/bignum.json | 9 | ✅ | 56.7M | ✅ | 12.3M | 🟢 **-78%** |
| optional/ecmascript-regex.json | 60 | ✅ | 19.8M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.2M | ✅ | 107.8M | 🔴 **+60%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 50.9M | ✅ | 11.2M | 🟢 **-78%** |
| additionalProperties.json | 21 | ✅ | 22.4M | ✅ | 7.3M | 🟢 **-67%** |
| allOf.json | 30 | ✅ | 44.5M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 18 | ✅ | 50.8M | ✅ | 3.4M | 🟢 **-93%** |
| boolean_schema.json | 18 | ✅ | 55.8M | ✅ | 13.4M | 🟢 **-76%** |
| const.json | 23 | ✅ | 56.1M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 56.1M | ⚠️ 1 fail | - | - |
| content.json | 18 | ✅ | 65.7M | ✅ | 117.3M | 🔴 **+78%** |
| default.json | 7 | ✅ | 48.8M | ✅ | 2.4M | 🟢 **-95%** |
| dependentRequired.json | 3 | ✅ | 76.0M | ⚠️ 6 fail | - | - |
| enum.json | 33 | ✅ | 33.5M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 55.6M | ✅ | 8.9M | 🟢 **-84%** |
| exclusiveMinimum.json | 4 | ✅ | 55.2M | ✅ | 8.9M | 🟢 **-84%** |
| format.json | 60 | ✅ | 68.6M | ⚠️ 40 fail | - | - |
| if-then-else.json | 8 | ✅ | 67.0M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 38.8M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | 28 | ✅ | 26.9M | ✅ | 5.7M | 🟢 **-79%** |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 59.3M | ✅ | 16.1M | 🟢 **-73%** |
| maxLength.json | 7 | ✅ | 54.8M | ✅ | 16.4M | 🟢 **-70%** |
| maxProperties.json | 10 | ✅ | 43.8M | ✅ | 15.0M | 🟢 **-66%** |
| maximum.json | 8 | ✅ | 59.2M | ✅ | 19.6M | 🟢 **-67%** |
| minContains.json | 7 | ✅ | 60.2M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 59.6M | ✅ | 16.0M | 🟢 **-73%** |
| minLength.json | 7 | ✅ | 49.3M | ✅ | 11.4M | 🟢 **-77%** |
| minProperties.json | 8 | ✅ | 47.2M | ✅ | 17.4M | 🟢 **-63%** |
| minimum.json | 11 | ✅ | 59.5M | ✅ | 16.9M | 🟢 **-72%** |
| multipleOf.json | 10 | ✅ | 57.9M | ✅ | 11.1M | 🟢 **-81%** |
| not.json | 38 | ✅ | 63.4M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 42.6M | ✅ | 2.0M | 🟢 **-95%** |
| pattern.json | 9 | ✅ | 38.0M | ✅ | 29.1M | 🟢 **-23%** |
| patternProperties.json | 23 | ✅ | 16.2M | ✅ | 5.4M | 🟢 **-66%** |
| properties.json | 28 | ✅ | 25.2M | ✅ | 1.2M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 31.1M | ✅ | 5.5M | 🟢 **-82%** |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 45 | ✅ | 34.1M | ⚠️ 32 fail | - | - |
| required.json | 16 | ✅ | 34.8M | ✅ | 3.3M | 🟢 **-91%** |
| type.json | 80 | ✅ | 61.6M | ✅ | 8.9M | 🟢 **-86%** |
| unevaluatedItems.json | 15 | ✅ | 49.2M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 30.4M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 13 | ✅ | 23.8M | ⚠️ 30 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 53.0M | ✅ | 12.4M | 🟢 **-77%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 42.9M | ✅ | 2.3M | 🟢 **-95%** |
| optional/ecmascript-regex.json | 60 | ✅ | 18.6M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 110.7M | 🔴 **+66%** |
| optional/no-schema.json | 3 | ✅ | 55.0M | ✅ | 13.3M | 🟢 **-76%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 42.1M | ✅ | 2.0M | 🟢 **-95%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 25.8M | ✅ | 7.5M | 🟢 **-71%** |
| allOf.json | 30 | ✅ | 44.7M | ✅ | 2.7M | 🟢 **-94%** |
| anyOf.json | 18 | ✅ | 51.6M | ✅ | 3.4M | 🟢 **-93%** |
| boolean_schema.json | 18 | ✅ | 55.4M | ✅ | 13.1M | 🟢 **-76%** |
| const.json | 23 | ✅ | 54.9M | ⚠️ 12 fail | - | - |
| contains.json | 17 | ✅ | 63.6M | ⚠️ 1 fail | - | - |
| content.json | 18 | ✅ | 65.9M | ✅ | 116.1M | 🔴 **+76%** |
| default.json | 7 | ✅ | 45.8M | ✅ | 2.4M | 🟢 **-95%** |
| dependentRequired.json | 3 | ✅ | 74.0M | ⚠️ 6 fail | - | - |
| enum.json | 33 | ✅ | 33.8M | ⚠️ 4 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 60.3M | ✅ | 8.7M | 🟢 **-86%** |
| exclusiveMinimum.json | 4 | ✅ | 59.8M | ✅ | 8.7M | 🟢 **-85%** |
| format.json | 70 | ✅ | 65.1M | ⚠️ 49 fail | - | - |
| if-then-else.json | 8 | ✅ | 66.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.0M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | 14 | ✅ | 27.2M | ⚠️ 7 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 15.6M | 🟢 **-74%** |
| maxLength.json | 7 | ✅ | 51.4M | ✅ | 16.1M | 🟢 **-69%** |
| maxProperties.json | 10 | ✅ | 45.7M | ✅ | 14.1M | 🟢 **-69%** |
| maximum.json | 8 | ✅ | 60.0M | ✅ | 19.4M | 🟢 **-68%** |
| minContains.json | 7 | ✅ | 59.8M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 59.5M | ✅ | 15.9M | 🟢 **-73%** |
| minLength.json | 7 | ✅ | 48.4M | ✅ | 11.0M | 🟢 **-77%** |
| minProperties.json | 8 | ✅ | 48.0M | ✅ | 17.3M | 🟢 **-64%** |
| minimum.json | 11 | ✅ | 61.3M | ✅ | 16.6M | 🟢 **-73%** |
| multipleOf.json | 10 | ✅ | 57.9M | ✅ | 11.0M | 🟢 **-81%** |
| not.json | 38 | ✅ | 63.4M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 49.4M | ✅ | 1.9M | 🟢 **-96%** |
| pattern.json | 9 | ✅ | 46.9M | ✅ | 26.8M | 🟢 **-43%** |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 5.5M | 🟢 **-65%** |
| prefixItems.json | 2 | ✅ | 68.7M | ⚠️ 2 fail | - | - |
| properties.json | 28 | ✅ | 24.6M | ✅ | 1.2M | 🟢 **-95%** |
| propertyNames.json | 20 | ✅ | 30.7M | ✅ | 5.4M | 🟢 **-82%** |
| ref.json | 43 | ✅ | 33.6M | ⚠️ 31 fail | - | - |
| required.json | 16 | ✅ | 35.6M | ✅ | 3.3M | 🟢 **-91%** |
| type.json | 80 | ✅ | 60.9M | ✅ | 8.7M | 🟢 **-86%** |
| unevaluatedItems.json | 17 | ✅ | 43.3M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 27.5M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 8 | ✅ | 31.2M | ⚠️ 32 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.7M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 52.0M | ✅ | 12.3M | 🟢 **-76%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 38.1M | ✅ | 2.3M | 🟢 **-94%** |
| optional/ecmascript-regex.json | 60 | ✅ | 18.7M | ⚠️ 10 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 108.5M | 🔴 **+62%** |
| optional/format-assertion.json | 4 | ✅ | 22.8M | ✅ | 6.6M | 🟢 **-71%** |
| optional/no-schema.json | 3 | ✅ | 47.5M | ✅ | 14.1M | 🟢 **-70%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 46.6M | ✅ | 2.0M | 🟢 **-96%** |

