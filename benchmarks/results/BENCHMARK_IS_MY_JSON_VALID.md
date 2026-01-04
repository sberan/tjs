# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | is-my-json-valid files | is-my-json-valid tests | is-my-json-valid ops/s | tjs vs is-my-json-valid |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 31 | 640 | ✅ 31 | 640 | 34.3M | ⚠️ 24/31 | 459 | 12.1M | 🟢 **-65%** |
| draft6 | 36 | 703 | ✅ 36 | 703 | 33.3M | ⚠️ 18/36 | 369 | 12.1M | 🟢 **-64%** |
| draft7 | 36 | 732 | ✅ 36 | 732 | 38.0M | ⚠️ 17/36 | 390 | 14.1M | 🟢 **-63%** |
| draft2019-09 | 47 | 842 | ✅ 47 | 842 | 41.5M | ⚠️ 19/47 | 400 | 15.7M | 🟢 **-62%** |
| draft2020-12 | 48 | 785 | ✅ 48 | 785 | 42.4M | ⚠️ 19/48 | 272 | 11.2M | 🟢 **-74%** |
| **Total** | 198 | 3702 | ✅ 198 | 3702 | 37.9M | ⚠️ 97/198 | 1890 | 12.9M | 🟢 **-66%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs is-my-json-valid**: 🟢 tjs is 2.94x faster (26 ns vs 78 ns, 3702 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 66.0M | ✅ | 21.2M | 🟢 **-68%** |
| additionalProperties.json | 16 | ✅ | 32.7M | ✅ | 8.4M | 🟢 **-74%** |
| allOf.json | 27 | ✅ | 50.8M | ✅ | 19.0M | 🟢 **-63%** |
| anyOf.json | 15 | ✅ | 55.4M | ✅ | 35.7M | 🟢 **-36%** |
| default.json | 7 | ✅ | 51.9M | ✅ | 46.2M | -11% |
| dependencies.json | 29 | ✅ | 27.3M | ✅ | 17.9M | 🟢 **-34%** |
| enum.json | 49 | ✅ | 40.8M | ✅ | 3.9M | 🟢 **-90%** |
| format.json | 36 | ✅ | 46.9M | ✅ | 47.2M | +1% |
| infinite-loop-detection.json | 2 | ✅ | 40.2M | ✅ | 13.4M | 🟢 **-67%** |
| items.json | 15 | ✅ | 21.3M | ⚠️ 1 fail | - | - |
| maxItems.json | 4 | ✅ | 64.7M | ✅ | 41.4M | 🟢 **-36%** |
| maxProperties.json | 8 | ✅ | 45.5M | ✅ | 17.7M | 🟢 **-61%** |
| maximum.json | 14 | ✅ | 67.9M | ✅ | 40.3M | 🟢 **-41%** |
| minItems.json | 4 | ✅ | 74.1M | ✅ | 23.3M | 🟢 **-69%** |
| minProperties.json | 6 | ✅ | 55.4M | ✅ | 40.2M | 🟢 **-27%** |
| minimum.json | 17 | ✅ | 69.2M | ✅ | 41.1M | 🟢 **-41%** |
| multipleOf.json | 8 | ✅ | 65.6M | ⚠️ 2 fail | - | - |
| not.json | 20 | ✅ | 69.7M | ✅ | 24.4M | 🟢 **-65%** |
| oneOf.json | 23 | ✅ | 55.6M | ✅ | 24.8M | 🟢 **-55%** |
| pattern.json | 9 | ✅ | 47.5M | ✅ | 41.1M | -14% |
| patternProperties.json | 18 | ✅ | 15.0M | ✅ | 5.5M | 🟢 **-63%** |
| properties.json | 17 | ✅ | 27.9M | ⚠️ 3 fail | - | - |
| ref.json | 32 | ✅ | 41.1M | ⚠️ 6 fail | - | - |
| required.json | 8 | ✅ | 58.9M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 57.0M | ✅ | 22.2M | 🟢 **-61%** |
| uniqueItems.json | 41 | ✅ | 41.9M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 65.9M | ✅ | 35.6M | 🟢 **-46%** |
| optional/ecmascript-regex.json | 60 | ✅ | 18.9M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 11.0M | ✅ | 5.6M | 🟢 **-49%** |
| optional/format/ipv4.json | 16 | ✅ | 42.2M | ✅ | 6.4M | 🟢 **-85%** |
| optional/format/unknown.json | 7 | ✅ | 82.5M | ✅ | 59.7M | 🟢 **-28%** |

### draft6

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.7M | ✅ | 23.5M | -15% |
| additionalProperties.json | 16 | ✅ | 30.7M | ✅ | 9.1M | 🟢 **-70%** |
| allOf.json | 28 | ✅ | 43.8M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 54.2M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 69.5M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 50.5M | ⚠️ 7 fail | - | - |
| default.json | 7 | ✅ | 49.0M | ✅ | 43.5M | -11% |
| dependencies.json | 32 | ✅ | 30.5M | ⚠️ 2 fail | - | - |
| enum.json | 45 | ✅ | 36.5M | ✅ | 3.7M | 🟢 **-90%** |
| format.json | 54 | ✅ | 45.7M | ✅ | 48.9M | +7% |
| infinite-loop-detection.json | 2 | ✅ | 37.0M | ✅ | 12.7M | 🟢 **-66%** |
| items.json | 17 | ✅ | 25.8M | ⚠️ 3 fail | - | - |
| maxItems.json | 6 | ✅ | 60.2M | ✅ | 36.1M | 🟢 **-40%** |
| maxLength.json | 2 | ✅ | 48.7M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 47.8M | ✅ | 30.6M | 🟢 **-36%** |
| maximum.json | 8 | ✅ | 60.9M | ✅ | 40.4M | 🟢 **-34%** |
| minItems.json | 6 | ✅ | 60.1M | ✅ | 36.1M | 🟢 **-40%** |
| minLength.json | 2 | ✅ | 42.7M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 48.8M | ✅ | 32.8M | 🟢 **-33%** |
| minimum.json | 11 | ✅ | 61.6M | ✅ | 39.8M | 🟢 **-35%** |
| multipleOf.json | 8 | ✅ | 57.7M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 65.0M | ✅ | 25.6M | 🟢 **-61%** |
| oneOf.json | 26 | ✅ | 51.8M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 42.5M | ✅ | 37.7M | -11% |
| patternProperties.json | 18 | ✅ | 16.5M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 27.2M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.4M | ⚠️ 5 fail | - | - |
| ref.json | 38 | ✅ | 33.8M | ⚠️ 17 fail | - | - |
| required.json | 9 | ✅ | 52.1M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 51.1M | ✅ | 21.6M | 🟢 **-58%** |
| uniqueItems.json | 41 | ✅ | 41.0M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 7 | ✅ | 58.2M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 18.1M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.7M | ✅ | 5.6M | 🟢 **-48%** |
| optional/format/ipv4.json | 16 | ✅ | 39.2M | ✅ | 6.6M | 🟢 **-83%** |
| optional/format/unknown.json | 7 | ✅ | 71.0M | ✅ | 65.7M | -7% |

### draft7

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.7M | ✅ | 27.4M | -1% |
| additionalProperties.json | 16 | ✅ | 26.9M | ✅ | 8.0M | 🟢 **-70%** |
| allOf.json | 28 | ✅ | 44.1M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 57.1M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 72.5M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 67.4M | ⚠️ 8 fail | - | - |
| default.json | 7 | ✅ | 49.1M | ✅ | 23.5M | 🟢 **-52%** |
| dependencies.json | 32 | ✅ | 31.5M | ⚠️ 2 fail | - | - |
| enum.json | 45 | ✅ | 36.4M | ✅ | 3.8M | 🟢 **-90%** |
| format.json | 102 | ✅ | 45.4M | ✅ | 50.5M | +11% |
| if-then-else.json | 8 | ✅ | 73.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 37.0M | ✅ | 13.0M | 🟢 **-65%** |
| items.json | 17 | ✅ | 23.9M | ⚠️ 3 fail | - | - |
| maxItems.json | 6 | ✅ | 62.1M | ✅ | 38.5M | 🟢 **-38%** |
| maxLength.json | 2 | ✅ | 50.2M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 49.6M | ✅ | 31.0M | 🟢 **-37%** |
| maximum.json | 8 | ✅ | 62.9M | ✅ | 41.9M | 🟢 **-33%** |
| minItems.json | 6 | ✅ | 62.6M | ✅ | 38.3M | 🟢 **-39%** |
| minLength.json | 2 | ✅ | 48.6M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 51.2M | ✅ | 35.4M | 🟢 **-31%** |
| minimum.json | 11 | ✅ | 64.2M | ✅ | 41.6M | 🟢 **-35%** |
| multipleOf.json | 8 | ✅ | 60.0M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 66.7M | ✅ | 12.7M | 🟢 **-81%** |
| oneOf.json | 26 | ✅ | 53.4M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 50.8M | ✅ | 42.5M | -16% |
| patternProperties.json | 18 | ✅ | 15.0M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 25.6M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.4M | ⚠️ 5 fail | - | - |
| ref.json | 38 | ✅ | 34.5M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 57.5M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 67.2M | ✅ | 22.5M | 🟢 **-66%** |
| uniqueItems.json | 41 | ✅ | 42.2M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 7 | ✅ | 64.5M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.0M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 39.7M | ✅ | 6.6M | 🟢 **-83%** |
| optional/format/unknown.json | 7 | ✅ | 75.4M | ✅ | 70.0M | -7% |

### draft2019-09

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 58.3M | ✅ | 26.7M | 🟢 **-54%** |
| additionalProperties.json | 21 | ✅ | 27.9M | ✅ | 8.9M | 🟢 **-68%** |
| allOf.json | 28 | ✅ | 51.8M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 56.7M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 79.3M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 73.6M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 77.1M | ✅ | 62.7M | -19% |
| default.json | 7 | ✅ | 53.8M | ✅ | 43.9M | -18% |
| dependentRequired.json | 3 | ✅ | 86.8M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 42.5M | ✅ | 3.8M | 🟢 **-91%** |
| format.json | 114 | ✅ | 84.4M | ✅ | 54.2M | 🟢 **-36%** |
| if-then-else.json | 8 | ✅ | 81.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ✅ | 11.9M | 🟢 **-70%** |
| items.json | 17 | ✅ | 24.6M | ⚠️ 3 fail | - | - |
| maxContains.json | 2 | ✅ | 83.1M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 67.2M | ✅ | 36.7M | 🟢 **-45%** |
| maxLength.json | 2 | ✅ | 54.0M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 53.0M | ✅ | 31.6M | 🟢 **-40%** |
| maximum.json | 8 | ✅ | 69.6M | ✅ | 40.7M | 🟢 **-42%** |
| minContains.json | 4 | ✅ | 54.6M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 67.3M | ✅ | 36.2M | 🟢 **-46%** |
| minLength.json | 2 | ✅ | 46.4M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 54.8M | ✅ | 34.2M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 69.7M | ✅ | 40.2M | 🟢 **-42%** |
| multipleOf.json | 8 | ✅ | 65.6M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 75.5M | ⚠️ 1 fail | - | - |
| oneOf.json | 26 | ✅ | 49.3M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 44.1M | ✅ | 37.5M | -15% |
| patternProperties.json | 18 | ✅ | 16.7M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 26.0M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 85.6M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 11 fail | - | - |
| ref.json | 41 | ✅ | 36.6M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 61.3M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 75.1M | ✅ | 21.1M | 🟢 **-72%** |
| unevaluatedItems.json | 15 | ✅ | 57.2M | ⚠️ 21 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 32.4M | ⚠️ 44 fail | - | - |
| uniqueItems.json | 41 | ✅ | 45.5M | ⚠️ 3 fail | - | - |
| vocabulary.json | 2 | ✅ | 70.2M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 66.8M | ⚠️ 2 fail | - | - |
| optional/cross-draft.json | 1 | ✅ | 52.9M | ⚠️ 1 fail | - | - |
| optional/dependencies-compatibility.json | 32 | ✅ | 49.4M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 20.1M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 37.2M | ✅ | 9.0M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 83.1M | ✅ | 66.1M | 🟢 **-20%** |
| optional/no-schema.json | 3 | ✅ | 53.0M | ✅ | 31.8M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 51.2M | ✅ | 21.6M | 🟢 **-58%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 24.0M | ✅ | 8.2M | 🟢 **-66%** |
| allOf.json | 28 | ✅ | 47.7M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 55.8M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 75.4M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 79.5M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 73.5M | ✅ | 62.3M | -15% |
| default.json | 7 | ✅ | 50.6M | ✅ | 43.4M | -14% |
| dependentRequired.json | 3 | ✅ | 80.8M | ⚠️ 6 fail | - | - |
| dynamicRef.json | 4 | ✅ | 10.0M | ⚠️ 22 fail | - | - |
| enum.json | 45 | ✅ | 42.8M | ✅ | 3.9M | 🟢 **-91%** |
| format.json | 84 | ✅ | 76.0M | ⚠️ 7 fail | - | - |
| if-then-else.json | 8 | ✅ | 74.2M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.9M | ✅ | 12.0M | 🟢 **-68%** |
| items.json | 12 | ✅ | 28.3M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 86.9M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 66.8M | ✅ | 35.0M | 🟢 **-48%** |
| maxLength.json | 2 | ✅ | 53.5M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 50.1M | ✅ | 27.2M | 🟢 **-46%** |
| maximum.json | 8 | ✅ | 70.6M | ✅ | 39.5M | 🟢 **-44%** |
| minContains.json | 4 | ✅ | 85.2M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 69.2M | ✅ | 35.8M | 🟢 **-48%** |
| minLength.json | 2 | ✅ | 56.3M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 55.0M | ✅ | 32.6M | 🟢 **-41%** |
| minimum.json | 11 | ✅ | 80.8M | ✅ | 38.9M | 🟢 **-52%** |
| multipleOf.json | 8 | ✅ | 63.9M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 73.2M | ⚠️ 1 fail | - | - |
| oneOf.json | 26 | ✅ | 49.4M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 47.1M | ✅ | 39.6M | -16% |
| patternProperties.json | 18 | ✅ | 15.1M | ⚠️ 3 fail | - | - |
| prefixItems.json | 2 | ✅ | 82.7M | ⚠️ 2 fail | - | - |
| properties.json | 17 | ✅ | 25.9M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 86.7M | ⚠️ 5 fail | - | - |
| ref.json | 39 | ✅ | 35.1M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 53.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 72.6M | ✅ | 21.0M | 🟢 **-71%** |
| unevaluatedItems.json | 17 | ✅ | 48.8M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 28.4M | ⚠️ 44 fail | - | - |
| uniqueItems.json | 31 | ✅ | 54.6M | ⚠️ 5 fail | - | - |
| vocabulary.json | 2 | ✅ | 69.6M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 64.4M | ⚠️ 2 fail | - | - |
| optional/cross-draft.json | 1 | ✅ | 56.6M | ✅ | 62.9M | +11% |
| optional/dependencies-compatibility.json | 32 | ✅ | 41.9M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 22.3M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 36.5M | ✅ | 5.4M | 🟢 **-85%** |
| optional/format/unknown.json | 7 | ✅ | 90.4M | ✅ | 61.3M | 🟢 **-32%** |
| optional/format-assertion.json | 4 | ✅ | 24.3M | ✅ | 9.7M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 68.8M | ✅ | 36.1M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 44.9M | ✅ | 22.6M | 🟢 **-50%** |

