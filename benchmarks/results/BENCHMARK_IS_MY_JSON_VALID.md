# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | is-my-json-valid files | is-my-json-valid tests | is-my-json-valid ops/s | tjs vs is-my-json-valid |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 31 | 640 | ✅ 31 | 640 | 31.1M | ⚠️ 24/31 | 459 | 11.3M | 🟢 **-64%** |
| draft6 | 36 | 703 | ✅ 36 | 703 | 33.1M | ⚠️ 18/36 | 369 | 12.5M | 🟢 **-62%** |
| draft7 | 36 | 732 | ✅ 36 | 732 | 35.4M | ⚠️ 17/36 | 390 | 14.3M | 🟢 **-59%** |
| draft2019-09 | 47 | 842 | ✅ 47 | 842 | 36.5M | ⚠️ 19/47 | 400 | 16.1M | 🟢 **-56%** |
| draft2020-12 | 48 | 785 | ✅ 48 | 785 | 32.8M | ⚠️ 19/48 | 272 | 12.9M | 🟢 **-61%** |
| **Total** | 198 | 3702 | ✅ 198 | 3702 | 33.8M | ⚠️ 97/198 | 1890 | 13.2M | 🟢 **-61%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs is-my-json-valid**: 🟢 tjs is 2.60x faster (30 ns vs 77 ns, 3702 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 45.7M | ✅ | 23.2M | 🟢 **-49%** |
| additionalProperties.json | 16 | ✅ | 26.3M | ✅ | 7.4M | 🟢 **-72%** |
| allOf.json | 27 | ✅ | 37.9M | ✅ | 7.9M | 🟢 **-79%** |
| anyOf.json | 15 | ✅ | 48.3M | ✅ | 32.7M | 🟢 **-32%** |
| default.json | 7 | ✅ | 45.1M | ✅ | 46.1M | +2% |
| dependencies.json | 29 | ✅ | 25.9M | ✅ | 18.3M | 🟢 **-29%** |
| enum.json | 49 | ✅ | 36.4M | ✅ | 4.0M | 🟢 **-89%** |
| format.json | 36 | ✅ | 62.4M | ✅ | 57.0M | -9% |
| infinite-loop-detection.json | 2 | ✅ | 31.7M | ✅ | 12.5M | 🟢 **-60%** |
| items.json | 15 | ✅ | 16.6M | ⚠️ 1 fail | - | - |
| maxItems.json | 4 | ✅ | 53.7M | ✅ | 40.0M | 🟢 **-26%** |
| maxProperties.json | 8 | ✅ | 41.4M | ✅ | 31.9M | 🟢 **-23%** |
| maximum.json | 14 | ✅ | 59.0M | ✅ | 38.1M | 🟢 **-35%** |
| minItems.json | 4 | ✅ | 57.0M | ✅ | 40.3M | 🟢 **-29%** |
| minProperties.json | 6 | ✅ | 46.7M | ✅ | 39.5M | -15% |
| minimum.json | 17 | ✅ | 57.9M | ✅ | 35.2M | 🟢 **-39%** |
| multipleOf.json | 8 | ✅ | 52.7M | ⚠️ 2 fail | - | - |
| not.json | 20 | ✅ | 53.5M | ✅ | 20.6M | 🟢 **-62%** |
| oneOf.json | 23 | ✅ | 42.3M | ✅ | 21.7M | 🟢 **-49%** |
| pattern.json | 9 | ✅ | 40.1M | ✅ | 40.7M | +2% |
| patternProperties.json | 18 | ✅ | 14.6M | ✅ | 5.1M | 🟢 **-65%** |
| properties.json | 17 | ✅ | 24.7M | ⚠️ 3 fail | - | - |
| ref.json | 32 | ✅ | 29.9M | ⚠️ 6 fail | - | - |
| required.json | 8 | ✅ | 44.2M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 45.8M | ✅ | 22.0M | 🟢 **-52%** |
| uniqueItems.json | 41 | ✅ | 37.7M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 52.0M | ✅ | 33.8M | 🟢 **-35%** |
| optional/ecmascript-regex.json | 60 | ✅ | 20.9M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.6M | ✅ | 5.5M | 🟢 **-48%** |
| optional/format/ipv4.json | 16 | ✅ | 38.5M | ✅ | 5.6M | 🟢 **-85%** |
| optional/format/unknown.json | 7 | ✅ | 66.2M | ✅ | 64.5M | -2% |

### draft6

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 49.7M | ✅ | 18.0M | 🟢 **-64%** |
| additionalProperties.json | 16 | ✅ | 26.7M | ✅ | 8.1M | 🟢 **-70%** |
| allOf.json | 28 | ✅ | 42.6M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 49.0M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 66.3M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 7 fail | - | - |
| default.json | 7 | ✅ | 48.2M | ✅ | 46.0M | -5% |
| dependencies.json | 32 | ✅ | 30.2M | ⚠️ 2 fail | - | - |
| enum.json | 45 | ✅ | 38.2M | ✅ | 3.8M | 🟢 **-90%** |
| format.json | 54 | ✅ | 45.8M | ✅ | 50.0M | +9% |
| infinite-loop-detection.json | 2 | ✅ | 37.0M | ✅ | 13.7M | 🟢 **-63%** |
| items.json | 17 | ✅ | 25.1M | ⚠️ 3 fail | - | - |
| maxItems.json | 6 | ✅ | 58.4M | ✅ | 38.2M | 🟢 **-35%** |
| maxLength.json | 2 | ✅ | 49.4M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 45.5M | ✅ | 30.5M | 🟢 **-33%** |
| maximum.json | 8 | ✅ | 60.9M | ✅ | 41.5M | 🟢 **-32%** |
| minItems.json | 6 | ✅ | 58.8M | ✅ | 37.7M | 🟢 **-36%** |
| minLength.json | 2 | ✅ | 49.5M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 48.0M | ✅ | 35.7M | 🟢 **-26%** |
| minimum.json | 11 | ✅ | 66.2M | ✅ | 42.5M | 🟢 **-36%** |
| multipleOf.json | 8 | ✅ | 58.2M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 62.4M | ✅ | 27.1M | 🟢 **-57%** |
| oneOf.json | 26 | ✅ | 48.8M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 45.7M | ✅ | 39.7M | -13% |
| patternProperties.json | 18 | ✅ | 16.4M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 24.3M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.0M | ⚠️ 5 fail | - | - |
| ref.json | 38 | ✅ | 35.4M | ⚠️ 17 fail | - | - |
| required.json | 9 | ✅ | 53.3M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 52.1M | ✅ | 23.1M | 🟢 **-56%** |
| uniqueItems.json | 41 | ✅ | 39.2M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 7 | ✅ | 60.6M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 16.9M | ⚠️ 10 fail | - | - |
| optional/format/hostname.json | 27 | ✅ | 10.9M | ✅ | 5.5M | 🟢 **-50%** |
| optional/format/ipv4.json | 16 | ✅ | 34.4M | ✅ | 9.0M | 🟢 **-74%** |
| optional/format/unknown.json | 7 | ✅ | 67.7M | ✅ | 67.9M | +0% |

### draft7

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 25.1M | ✅ | 23.8M | -5% |
| additionalProperties.json | 16 | ✅ | 25.7M | ✅ | 8.0M | 🟢 **-69%** |
| allOf.json | 28 | ✅ | 42.7M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 51.9M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 65.1M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 49.8M | ⚠️ 8 fail | - | - |
| default.json | 7 | ✅ | 41.7M | ✅ | 45.0M | +8% |
| dependencies.json | 32 | ✅ | 28.9M | ⚠️ 2 fail | - | - |
| enum.json | 45 | ✅ | 33.3M | ✅ | 3.8M | 🟢 **-89%** |
| format.json | 102 | ✅ | 50.8M | ✅ | 50.1M | -1% |
| if-then-else.json | 8 | ✅ | 64.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 34.7M | ✅ | 13.6M | 🟢 **-61%** |
| items.json | 17 | ✅ | 21.5M | ⚠️ 3 fail | - | - |
| maxItems.json | 6 | ✅ | 57.3M | ✅ | 38.4M | 🟢 **-33%** |
| maxLength.json | 2 | ✅ | 54.7M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 43.6M | ✅ | 32.6M | 🟢 **-25%** |
| maximum.json | 8 | ✅ | 59.1M | ✅ | 42.4M | 🟢 **-28%** |
| minItems.json | 6 | ✅ | 55.9M | ✅ | 37.7M | 🟢 **-33%** |
| minLength.json | 2 | ✅ | 47.7M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 46.1M | ✅ | 33.2M | 🟢 **-28%** |
| minimum.json | 11 | ✅ | 59.6M | ✅ | 42.3M | 🟢 **-29%** |
| multipleOf.json | 8 | ✅ | 56.7M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 52.4M | ✅ | 12.3M | 🟢 **-76%** |
| oneOf.json | 26 | ✅ | 43.8M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 41.3M | ✅ | 41.9M | +1% |
| patternProperties.json | 18 | ✅ | 16.0M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 23.3M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.4M | ⚠️ 5 fail | - | - |
| ref.json | 38 | ✅ | 31.1M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 45.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 55.5M | ✅ | 21.4M | 🟢 **-61%** |
| uniqueItems.json | 41 | ✅ | 37.5M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 7 | ✅ | 54.9M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 18.3M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 31.5M | ✅ | 8.9M | 🟢 **-72%** |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 68.8M | +6% |

### draft2019-09

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 26.1M | ✅ | 26.3M | +1% |
| additionalProperties.json | 21 | ✅ | 25.6M | ✅ | 9.2M | 🟢 **-64%** |
| allOf.json | 28 | ✅ | 45.0M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 55.0M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 65.6M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 65.8M | ✅ | 70.8M | +8% |
| default.json | 7 | ✅ | 48.1M | ✅ | 46.5M | -3% |
| dependentRequired.json | 3 | ✅ | 72.8M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 37.6M | ✅ | 3.9M | 🟢 **-90%** |
| format.json | 114 | ✅ | 69.2M | ✅ | 52.9M | 🟢 **-24%** |
| if-then-else.json | 8 | ✅ | 66.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 36.5M | ✅ | 13.6M | 🟢 **-63%** |
| items.json | 17 | ✅ | 22.1M | ⚠️ 3 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 58.7M | ✅ | 38.6M | 🟢 **-34%** |
| maxLength.json | 2 | ✅ | 49.6M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 45.7M | ✅ | 32.6M | 🟢 **-29%** |
| maximum.json | 8 | ✅ | 59.6M | ✅ | 43.1M | 🟢 **-28%** |
| minContains.json | 4 | ✅ | 74.0M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 59.3M | ✅ | 38.5M | 🟢 **-35%** |
| minLength.json | 2 | ✅ | 49.2M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 47.8M | ✅ | 35.6M | 🟢 **-26%** |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 42.2M | 🟢 **-31%** |
| multipleOf.json | 8 | ✅ | 57.9M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 63.0M | ⚠️ 1 fail | - | - |
| oneOf.json | 26 | ✅ | 49.0M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 41.2M | ✅ | 39.8M | -3% |
| patternProperties.json | 18 | ✅ | 14.6M | ⚠️ 3 fail | - | - |
| properties.json | 17 | ✅ | 23.0M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.7M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 11 fail | - | - |
| ref.json | 41 | ✅ | 31.8M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 54.3M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 55.2M | ✅ | 21.6M | 🟢 **-61%** |
| unevaluatedItems.json | 15 | ✅ | 43.1M | ⚠️ 21 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 28.3M | ⚠️ 44 fail | - | - |
| uniqueItems.json | 41 | ✅ | 40.9M | ⚠️ 3 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.2M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 55.2M | ⚠️ 2 fail | - | - |
| optional/cross-draft.json | 1 | ✅ | 47.2M | ⚠️ 1 fail | - | - |
| optional/dependencies-compatibility.json | 32 | ✅ | 40.7M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 19.9M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 33.9M | ✅ | 9.1M | 🟢 **-73%** |
| optional/format/unknown.json | 7 | ✅ | 67.2M | ✅ | 68.0M | +1% |
| optional/no-schema.json | 3 | ✅ | 54.1M | ✅ | 36.7M | 🟢 **-32%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 44.1M | ✅ | 26.4M | 🟢 **-40%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 21.4M | ✅ | 8.1M | 🟢 **-62%** |
| allOf.json | 28 | ✅ | 37.2M | ⚠️ 2 fail | - | - |
| anyOf.json | 17 | ✅ | 41.2M | ⚠️ 1 fail | - | - |
| boolean_schema.json | 9 | ✅ | 52.2M | ⚠️ 9 fail | - | - |
| contains.json | 1 | ✅ | 52.4M | ⚠️ 8 fail | - | - |
| content.json | 18 | ✅ | 54.4M | ✅ | 71.2M | 🔴 **+31%** |
| default.json | 7 | ✅ | 41.1M | ✅ | 46.1M | +12% |
| dependentRequired.json | 3 | ✅ | 56.3M | ⚠️ 6 fail | - | - |
| dynamicRef.json | 4 | ✅ | 11.1M | ⚠️ 22 fail | - | - |
| enum.json | 45 | ✅ | 29.4M | ✅ | 4.5M | 🟢 **-85%** |
| format.json | 84 | ✅ | 55.4M | ⚠️ 7 fail | - | - |
| if-then-else.json | 8 | ✅ | 52.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 31.0M | ✅ | 13.5M | 🟢 **-56%** |
| items.json | 12 | ✅ | 21.8M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 57.4M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 48.1M | ✅ | 38.5M | 🟢 **-20%** |
| maxLength.json | 2 | ✅ | 40.9M | ⚠️ 1 fail | - | - |
| maxProperties.json | 10 | ✅ | 37.3M | ✅ | 30.6M | -18% |
| maximum.json | 8 | ✅ | 48.8M | ✅ | 42.9M | -12% |
| minContains.json | 4 | ✅ | 53.0M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 48.5M | ✅ | 38.4M | 🟢 **-21%** |
| minLength.json | 2 | ✅ | 39.7M | ⚠️ 1 fail | - | - |
| minProperties.json | 8 | ✅ | 39.4M | ✅ | 34.2M | -13% |
| minimum.json | 11 | ✅ | 49.4M | ✅ | 42.4M | -14% |
| multipleOf.json | 8 | ✅ | 47.0M | ⚠️ 2 fail | - | - |
| not.json | 38 | ✅ | 52.6M | ⚠️ 1 fail | - | - |
| oneOf.json | 26 | ✅ | 34.6M | ⚠️ 1 fail | - | - |
| pattern.json | 9 | ✅ | 36.5M | ✅ | 38.1M | +4% |
| patternProperties.json | 18 | ✅ | 13.2M | ⚠️ 3 fail | - | - |
| prefixItems.json | 2 | ✅ | 50.1M | ⚠️ 2 fail | - | - |
| properties.json | 17 | ✅ | 24.1M | ⚠️ 5 fail | - | - |
| propertyNames.json | 2 | ✅ | 57.5M | ⚠️ 5 fail | - | - |
| ref.json | 39 | ✅ | 28.5M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 43.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 48.8M | ✅ | 22.6M | 🟢 **-54%** |
| unevaluatedItems.json | 17 | ✅ | 34.5M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 24.4M | ⚠️ 44 fail | - | - |
| uniqueItems.json | 31 | ✅ | 41.9M | ⚠️ 5 fail | - | - |
| vocabulary.json | 2 | ✅ | 49.1M | ⚠️ 2 fail | - | - |
| optional/bignum.json | 7 | ✅ | 46.3M | ⚠️ 2 fail | - | - |
| optional/cross-draft.json | 1 | ✅ | 45.0M | ✅ | 63.9M | 🔴 **+42%** |
| optional/dependencies-compatibility.json | 32 | ✅ | 33.7M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 60 | ✅ | 17.1M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 29.1M | ✅ | 8.9M | 🟢 **-70%** |
| optional/format/unknown.json | 7 | ✅ | 55.9M | ✅ | 71.3M | 🔴 **+28%** |
| optional/format-assertion.json | 4 | ✅ | 20.6M | ✅ | 9.9M | 🟢 **-52%** |
| optional/no-schema.json | 3 | ✅ | 44.6M | ✅ | 37.5M | -16% |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 37.8M | ✅ | 26.3M | 🟢 **-30%** |

