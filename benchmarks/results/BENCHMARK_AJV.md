# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 25.0M | ⚠️ 31/38 | 707 | 11.4M | 🟢 **-55%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 27.6M | ⚠️ 46/49 | 1025 | 13.0M | 🟢 **-53%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 23.3M | ⚠️ 51/54 | 1221 | 11.7M | 🟢 **-50%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 21.6M | ⚠️ 62/69 | 1399 | 5.7M | 🟢 **-74%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 16.7M | ⚠️ 61/68 | 1394 | 5.1M | 🟢 **-70%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 21.5M | ⚠️ 251/278 | 5746 | 7.5M | 🟢 **-65%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.91x faster (47 ns vs 136 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 63.1M | ✅ | 21.6M | 🟢 **-66%** |
| additionalProperties.json | 16 | ✅ | 27.8M | ✅ | 18.7M | 🟢 **-33%** |
| allOf.json | 27 | ✅ | 44.5M | ✅ | 10.8M | 🟢 **-76%** |
| anyOf.json | 15 | ✅ | 53.2M | ✅ | 14.8M | 🟢 **-72%** |
| default.json | 7 | ✅ | 50.4M | ✅ | 46.8M | -7% |
| dependencies.json | 29 | ✅ | 25.9M | ✅ | 26.4M | +2% |
| enum.json | 49 | ✅ | 37.5M | ✅ | 19.5M | 🟢 **-48%** |
| format.json | 36 | ✅ | 47.8M | ✅ | 44.9M | -6% |
| infinite-loop-detection.json | 2 | ✅ | 37.7M | ✅ | 36.7M | -3% |
| items.json | 21 | ✅ | 26.3M | ✅ | 17.0M | 🟢 **-35%** |
| maxItems.json | 4 | ✅ | 70.6M | ✅ | 49.1M | 🟢 **-30%** |
| maxLength.json | 5 | ✅ | 54.4M | ✅ | 46.8M | -14% |
| maxProperties.json | 8 | ✅ | 52.2M | ✅ | 38.9M | 🟢 **-26%** |
| maximum.json | 8 | ✅ | 66.8M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 70.5M | ✅ | 48.9M | 🟢 **-31%** |
| minLength.json | 5 | ✅ | 53.5M | ✅ | 43.2M | -19% |
| minProperties.json | 6 | ✅ | 55.6M | ✅ | 42.4M | 🟢 **-24%** |
| minimum.json | 11 | ✅ | 66.8M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 62.1M | ✅ | 23.1M | 🟢 **-63%** |
| not.json | 20 | ✅ | 68.1M | ✅ | 38.8M | 🟢 **-43%** |
| oneOf.json | 23 | ✅ | 54.3M | ✅ | 10.5M | 🟢 **-81%** |
| pattern.json | 9 | ✅ | 41.7M | ✅ | 39.9M | -4% |
| patternProperties.json | 18 | ✅ | 14.6M | ✅ | 7.3M | 🟢 **-50%** |
| properties.json | 17 | ✅ | 28.6M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 32.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 42.3M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 57.3M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 53.3M | ✅ | 36.8M | 🟢 **-31%** |
| uniqueItems.json | 69 | ✅ | 25.2M | ✅ | 17.2M | 🟢 **-32%** |
| optional/bignum.json | 7 | ✅ | 59.9M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 16.1M | ✅ | 17.2M | +7% |
| optional/format/date-time.json | 26 | ✅ | 25.3M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 18.6M | ✅ | 19.4M | +4% |
| optional/format/ipv4.json | 16 | ✅ | 41.6M | ✅ | 30.7M | 🟢 **-26%** |
| optional/format/ipv6.json | 40 | ✅ | 11.9M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 79.1M | ✅ | 54.9M | 🟢 **-31%** |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.3M | 🟢 **-33%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.3M | ✅ | 13.3M | 🟢 **-38%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.9M | ✅ | 39.9M | 🔴 **+38%** |
| additionalProperties.json | 16 | ✅ | 28.6M | ✅ | 18.5M | 🟢 **-35%** |
| allOf.json | 30 | ✅ | 48.4M | ✅ | 11.1M | 🟢 **-77%** |
| anyOf.json | 18 | ✅ | 61.3M | ✅ | 13.2M | 🟢 **-78%** |
| boolean_schema.json | 18 | ✅ | 76.9M | ✅ | 45.4M | 🟢 **-41%** |
| const.json | 54 | ✅ | 67.8M | ✅ | 18.9M | 🟢 **-72%** |
| contains.json | 19 | ✅ | 62.2M | ✅ | 14.5M | 🟢 **-77%** |
| default.json | 7 | ✅ | 54.5M | ✅ | 47.4M | -13% |
| definitions.json | 2 | ✅ | 12.2M | ✅ | 1.4M | 🟢 **-88%** |
| dependencies.json | 36 | ✅ | 33.3M | ✅ | 29.8M | -10% |
| enum.json | 45 | ✅ | 41.2M | ✅ | 20.6M | 🟢 **-50%** |
| exclusiveMaximum.json | 4 | ✅ | 66.5M | ✅ | 44.7M | 🟢 **-33%** |
| exclusiveMinimum.json | 4 | ✅ | 66.8M | ✅ | 43.2M | 🟢 **-35%** |
| format.json | 54 | ✅ | 48.3M | ✅ | 44.0M | -9% |
| infinite-loop-detection.json | 2 | ✅ | 43.2M | ✅ | 37.7M | -13% |
| items.json | 28 | ✅ | 32.5M | ✅ | 18.4M | 🟢 **-43%** |
| maxItems.json | 6 | ✅ | 67.4M | ✅ | 47.9M | 🟢 **-29%** |
| maxLength.json | 7 | ✅ | 54.8M | ✅ | 42.8M | 🟢 **-22%** |
| maxProperties.json | 10 | ✅ | 52.5M | ✅ | 38.6M | 🟢 **-26%** |
| maximum.json | 8 | ✅ | 69.2M | ✅ | 48.5M | 🟢 **-30%** |
| minItems.json | 6 | ✅ | 67.4M | ✅ | 49.1M | 🟢 **-27%** |
| minLength.json | 7 | ✅ | 54.3M | ✅ | 43.6M | -20% |
| minProperties.json | 8 | ✅ | 54.4M | ✅ | 37.9M | 🟢 **-30%** |
| minimum.json | 11 | ✅ | 76.3M | ✅ | 48.3M | 🟢 **-37%** |
| multipleOf.json | 10 | ✅ | 64.5M | ✅ | 23.1M | 🟢 **-64%** |
| not.json | 38 | ✅ | 75.7M | ✅ | 39.4M | 🟢 **-48%** |
| oneOf.json | 27 | ✅ | 58.4M | ✅ | 10.8M | 🟢 **-81%** |
| pattern.json | 9 | ✅ | 45.1M | ✅ | 39.5M | -12% |
| patternProperties.json | 23 | ✅ | 17.0M | ✅ | 9.2M | 🟢 **-46%** |
| properties.json | 21 | ✅ | 32.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 34.7M | ✅ | 14.4M | 🟢 **-58%** |
| ref.json | 65 | ✅ | 22.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 33.6M | ✅ | 16.2M | 🟢 **-52%** |
| required.json | 9 | ✅ | 62.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 76.2M | ✅ | 33.3M | 🟢 **-56%** |
| uniqueItems.json | 69 | ✅ | 24.8M | ✅ | 16.1M | 🟢 **-35%** |
| optional/bignum.json | 9 | ✅ | 67.7M | ✅ | 30.1M | 🟢 **-55%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.9M | ✅ | 16.1M | -5% |
| optional/format/date-time.json | 26 | ✅ | 25.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 18.8M | ✅ | 22.4M | +19% |
| optional/format/ipv4.json | 16 | ✅ | 37.5M | ✅ | 30.5M | -19% |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 26.9M | ✅ | 25.0M | -7% |
| optional/format/unknown.json | 7 | ✅ | 83.3M | ✅ | 54.9M | 🟢 **-34%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 8.9M | -8% |
| optional/format/uri-template.json | 10 | ✅ | 17.2M | ✅ | 15.7M | -9% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.4M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ | 43.4M | ✅ | 8.9M | 🟢 **-79%** |
| optional/non-bmp-regex.json | 12 | ✅ | 24.4M | ✅ | 13.4M | 🟢 **-45%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.7M | ✅ | 41.8M | 🔴 **+46%** |
| additionalProperties.json | 16 | ✅ | 29.9M | ✅ | 18.8M | 🟢 **-37%** |
| allOf.json | 30 | ✅ | 48.0M | ✅ | 11.6M | 🟢 **-76%** |
| anyOf.json | 18 | ✅ | 53.7M | ✅ | 13.0M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 73.3M | ✅ | 44.4M | 🟢 **-39%** |
| const.json | 54 | ✅ | 58.7M | ✅ | 18.3M | 🟢 **-69%** |
| contains.json | 21 | ✅ | 61.8M | ✅ | 15.0M | 🟢 **-76%** |
| default.json | 7 | ✅ | 52.2M | ✅ | 46.3M | -11% |
| definitions.json | 2 | ✅ | 11.6M | ✅ | 1.3M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 32.0M | ✅ | 28.6M | -11% |
| enum.json | 45 | ✅ | 39.4M | ✅ | 20.5M | 🟢 **-48%** |
| exclusiveMaximum.json | 4 | ✅ | 64.0M | ✅ | 43.6M | 🟢 **-32%** |
| exclusiveMinimum.json | 4 | ✅ | 64.1M | ✅ | 43.4M | 🟢 **-32%** |
| format.json | 102 | ✅ | 47.6M | ✅ | 42.6M | -10% |
| if-then-else.json | 26 | ✅ | 62.6M | ✅ | 35.2M | 🟢 **-44%** |
| infinite-loop-detection.json | 2 | ✅ | 37.7M | ✅ | 33.9M | -10% |
| items.json | 28 | ✅ | 27.0M | ✅ | 16.5M | 🟢 **-39%** |
| maxItems.json | 6 | ✅ | 64.7M | ✅ | 49.0M | 🟢 **-24%** |
| maxLength.json | 7 | ✅ | 52.1M | ✅ | 43.7M | -16% |
| maxProperties.json | 10 | ✅ | 51.1M | ✅ | 37.1M | 🟢 **-28%** |
| maximum.json | 8 | ✅ | 65.8M | ✅ | 48.8M | 🟢 **-26%** |
| minItems.json | 6 | ✅ | 64.7M | ✅ | 49.1M | 🟢 **-24%** |
| minLength.json | 7 | ✅ | 51.6M | ✅ | 42.0M | -19% |
| minProperties.json | 8 | ✅ | 52.5M | ✅ | 38.7M | 🟢 **-26%** |
| minimum.json | 11 | ✅ | 66.8M | ✅ | 49.1M | 🟢 **-27%** |
| multipleOf.json | 10 | ✅ | 62.2M | ✅ | 22.2M | 🟢 **-64%** |
| not.json | 38 | ✅ | 66.2M | ✅ | 39.6M | 🟢 **-40%** |
| oneOf.json | 27 | ✅ | 55.7M | ✅ | 10.2M | 🟢 **-82%** |
| pattern.json | 9 | ✅ | 41.1M | ✅ | 37.4M | -9% |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 9.1M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 29.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 32.9M | ✅ | 13.2M | 🟢 **-60%** |
| ref.json | 73 | ✅ | 21.5M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 21.6M | ✅ | 15.4M | 🟢 **-29%** |
| required.json | 9 | ✅ | 58.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 72.7M | ✅ | 35.5M | 🟢 **-51%** |
| uniqueItems.json | 69 | ✅ | 25.2M | ✅ | 17.1M | 🟢 **-32%** |
| optional/bignum.json | 9 | ✅ | 63.8M | ✅ | 30.1M | 🟢 **-53%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.5M | ✅ | 16.6M | -6% |
| optional/format/date-time.json | 26 | ✅ | 25.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 8.8M | ✅ | 8.1M | -8% |
| optional/format/email.json | 17 | ✅ | 18.6M | ✅ | 22.1M | +18% |
| optional/format/ipv4.json | 16 | ✅ | 36.3M | ✅ | 30.0M | -17% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.3M | ✅ | 25.2M | -20% |
| optional/format/regex.json | 8 | ✅ | 67.7M | ✅ | 922K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 33.9M | ✅ | 30.7M | -10% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.5M | -15% |
| optional/format/unknown.json | 7 | ✅ | 79.2M | ✅ | 55.4M | 🟢 **-30%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 9.2M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 15.9M | ✅ | 15.2M | -4% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/id.json | 7 | ✅ | 46.5M | ✅ | 18.6M | 🟢 **-60%** |
| optional/non-bmp-regex.json | 12 | ✅ | 24.4M | ✅ | 13.4M | 🟢 **-45%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 62.7M | ✅ | 31.6M | 🟢 **-50%** |
| additionalProperties.json | 21 | ✅ | 27.0M | ✅ | 13.5M | 🟢 **-50%** |
| allOf.json | 30 | ✅ | 55.7M | ✅ | 11.7M | 🟢 **-79%** |
| anchor.json | 8 | ✅ | 62.2M | ✅ | 37.6M | 🟢 **-40%** |
| anyOf.json | 18 | ✅ | 60.0M | ✅ | 12.9M | 🟢 **-79%** |
| boolean_schema.json | 18 | ✅ | 81.2M | ✅ | 42.6M | 🟢 **-47%** |
| const.json | 54 | ✅ | 70.2M | ✅ | 20.3M | 🟢 **-71%** |
| contains.json | 21 | ✅ | 66.9M | ✅ | 15.1M | 🟢 **-77%** |
| content.json | 18 | ✅ | 84.0M | ✅ | 37.4M | 🟢 **-55%** |
| default.json | 7 | ✅ | 56.5M | ✅ | 44.4M | 🟢 **-21%** |
| defs.json | 2 | ✅ | 1.9M | ✅ | 752K | 🟢 **-61%** |
| dependentRequired.json | 20 | ✅ | 47.1M | ✅ | 38.4M | -18% |
| dependentSchemas.json | 20 | ✅ | 50.6M | ✅ | 34.4M | 🟢 **-32%** |
| enum.json | 45 | ✅ | 41.9M | ✅ | 20.3M | 🟢 **-52%** |
| exclusiveMaximum.json | 4 | ✅ | 69.6M | ✅ | 40.9M | 🟢 **-41%** |
| exclusiveMinimum.json | 4 | ✅ | 81.9M | ✅ | 37.9M | 🟢 **-54%** |
| format.json | 114 | ✅ | 87.9M | ✅ | 41.1M | 🟢 **-53%** |
| if-then-else.json | 26 | ✅ | 68.1M | ✅ | 37.1M | 🟢 **-45%** |
| infinite-loop-detection.json | 2 | ✅ | 39.8M | ✅ | 36.1M | -9% |
| items.json | 28 | ✅ | 30.4M | ✅ | 18.4M | 🟢 **-40%** |
| maxContains.json | 12 | ✅ | 63.3M | ✅ | 34.0M | 🟢 **-46%** |
| maxItems.json | 6 | ✅ | 70.2M | ✅ | 46.4M | 🟢 **-34%** |
| maxLength.json | 7 | ✅ | 56.4M | ✅ | 42.1M | 🟢 **-25%** |
| maxProperties.json | 10 | ✅ | 54.5M | ✅ | 37.1M | 🟢 **-32%** |
| maximum.json | 8 | ✅ | 72.5M | ✅ | 46.6M | 🟢 **-36%** |
| minContains.json | 28 | ✅ | 78.0M | ✅ | 25.9M | 🟢 **-67%** |
| minItems.json | 6 | ✅ | 70.5M | ✅ | 43.1M | 🟢 **-39%** |
| minLength.json | 7 | ✅ | 56.6M | ✅ | 42.2M | 🟢 **-25%** |
| minProperties.json | 8 | ✅ | 56.4M | ✅ | 38.0M | 🟢 **-33%** |
| minimum.json | 11 | ✅ | 72.9M | ✅ | 44.7M | 🟢 **-39%** |
| multipleOf.json | 10 | ✅ | 66.3M | ✅ | 23.1M | 🟢 **-65%** |
| not.json | 40 | ✅ | 66.3M | ✅ | 33.5M | 🟢 **-49%** |
| oneOf.json | 27 | ✅ | 60.9M | ✅ | 10.5M | 🟢 **-83%** |
| pattern.json | 9 | ✅ | 52.9M | ✅ | 38.5M | 🟢 **-27%** |
| patternProperties.json | 23 | ✅ | 15.3M | ✅ | 6.0M | 🟢 **-61%** |
| properties.json | 21 | ✅ | 28.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.8M | ✅ | 14.2M | 🟢 **-54%** |
| recursiveRef.json | 31 | ✅ | 5.6M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.8M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 35.6M | ✅ | 16.5M | 🟢 **-54%** |
| required.json | 9 | ✅ | 64.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 80.1M | ✅ | 32.4M | 🟢 **-60%** |
| unevaluatedItems.json | 51 | ✅ | 13.2M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 13.1M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 26.5M | ✅ | 17.6M | 🟢 **-34%** |
| vocabulary.json | 2 | ✅ | 73.0M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 60.3M | ✅ | 11.4M | 🟢 **-81%** |
| optional/bignum.json | 9 | ✅ | 66.5M | ✅ | 29.5M | 🟢 **-56%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 46.3M | ✅ | 32.5M | 🟢 **-30%** |
| optional/ecmascript-regex.json | 74 | ✅ | 18.4M | ✅ | 16.6M | -10% |
| optional/format/date-time.json | 26 | ✅ | 24.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 8.0M | -7% |
| optional/format/email.json | 17 | ✅ | 18.7M | ✅ | 21.9M | +17% |
| optional/format/idn-email.json | 10 | ✅ | 17.1M | ✅ | 76K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 44.2M | ✅ | 30.3M | 🟢 **-31%** |
| optional/format/ipv6.json | 40 | ✅ | 11.9M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 32.8M | ✅ | 24.8M | 🟢 **-24%** |
| optional/format/regex.json | 8 | ✅ | 73.7M | ✅ | 821K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 41.4M | ✅ | 29.8M | 🟢 **-28%** |
| optional/format/time.json | 46 | ✅ | 6.1M | ✅ | 5.5M | -11% |
| optional/format/unknown.json | 7 | ✅ | 88.6M | ✅ | 52.8M | 🟢 **-40%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 8.7M | -9% |
| optional/format/uri-template.json | 10 | ✅ | 16.1M | ✅ | 15.3M | -5% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.2M | 🟢 **-34%** |
| optional/format/uuid.json | 22 | ✅ | 14.7M | ✅ | 14.9M | +1% |
| optional/id.json | 3 | ✅ | 37.0M | ✅ | 13.1M | 🟢 **-65%** |
| optional/no-schema.json | 3 | ✅ | 64.6M | ✅ | 43.5M | 🟢 **-33%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.2M | ✅ | 12.0M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 52.7M | ✅ | 37.7M | 🟢 **-28%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 25.0M | ✅ | 12.1M | 🟢 **-51%** |
| allOf.json | 30 | ✅ | 54.1M | ✅ | 11.4M | 🟢 **-79%** |
| anchor.json | 8 | ✅ | 57.3M | ✅ | 44.0M | 🟢 **-23%** |
| anyOf.json | 18 | ✅ | 64.2M | ✅ | 12.3M | 🟢 **-81%** |
| boolean_schema.json | 18 | ✅ | 77.2M | ✅ | 44.7M | 🟢 **-42%** |
| const.json | 54 | ✅ | 65.1M | ✅ | 18.1M | 🟢 **-72%** |
| contains.json | 21 | ✅ | 59.8M | ✅ | 15.1M | 🟢 **-75%** |
| content.json | 18 | ✅ | 80.1M | ✅ | 39.8M | 🟢 **-50%** |
| default.json | 7 | ✅ | 54.5M | ✅ | 47.2M | -13% |
| defs.json | 2 | ✅ | 2.1M | ✅ | 753K | 🟢 **-65%** |
| dependentRequired.json | 20 | ✅ | 44.3M | ✅ | 39.9M | -10% |
| dependentSchemas.json | 20 | ✅ | 48.4M | ✅ | 34.7M | 🟢 **-28%** |
| dynamicRef.json | 4 | ✅ | 5.5M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 40.5M | ✅ | 20.1M | 🟢 **-50%** |
| exclusiveMaximum.json | 4 | ✅ | 66.7M | ✅ | 43.6M | 🟢 **-35%** |
| exclusiveMinimum.json | 4 | ✅ | 66.7M | ✅ | 43.1M | 🟢 **-35%** |
| format.json | 133 | ✅ | 83.1M | ✅ | 39.9M | 🟢 **-52%** |
| if-then-else.json | 26 | ✅ | 71.0M | ✅ | 33.7M | 🟢 **-52%** |
| infinite-loop-detection.json | 2 | ✅ | 43.6M | ✅ | 34.6M | 🟢 **-21%** |
| items.json | 29 | ✅ | 29.7M | ✅ | 14.5M | 🟢 **-51%** |
| maxContains.json | 12 | ✅ | 61.1M | ✅ | 34.3M | 🟢 **-44%** |
| maxItems.json | 6 | ✅ | 67.4M | ✅ | 47.8M | 🟢 **-29%** |
| maxLength.json | 7 | ✅ | 54.2M | ✅ | 42.5M | 🟢 **-22%** |
| maxProperties.json | 10 | ✅ | 52.8M | ✅ | 36.8M | 🟢 **-30%** |
| maximum.json | 8 | ✅ | 68.9M | ✅ | 48.1M | 🟢 **-30%** |
| minContains.json | 28 | ✅ | 75.3M | ✅ | 24.8M | 🟢 **-67%** |
| minItems.json | 6 | ✅ | 67.5M | ✅ | 49.5M | 🟢 **-27%** |
| minLength.json | 7 | ✅ | 51.3M | ✅ | 41.0M | 🟢 **-20%** |
| minProperties.json | 8 | ✅ | 54.6M | ✅ | 33.6M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 69.5M | ✅ | 49.6M | 🟢 **-29%** |
| multipleOf.json | 10 | ✅ | 64.0M | ✅ | 23.1M | 🟢 **-64%** |
| not.json | 40 | ✅ | 67.8M | ✅ | 37.9M | 🟢 **-44%** |
| oneOf.json | 27 | ✅ | 56.2M | ✅ | 10.4M | 🟢 **-82%** |
| pattern.json | 9 | ✅ | 46.1M | ✅ | 42.0M | -9% |
| patternProperties.json | 23 | ✅ | 17.1M | ✅ | 7.2M | 🟢 **-58%** |
| prefixItems.json | 11 | ✅ | 64.2M | ✅ | 46.0M | 🟢 **-28%** |
| properties.json | 21 | ✅ | 31.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.9M | ✅ | 14.3M | 🟢 **-52%** |
| ref.json | 71 | ✅ | 18.4M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 33.5M | ✅ | 16.3M | 🟢 **-51%** |
| required.json | 9 | ✅ | 63.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 77.1M | ✅ | 35.1M | 🟢 **-54%** |
| unevaluatedItems.json | 47 | ✅ | 16.9M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 3.2M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 28.3M | ✅ | 13.9M | 🟢 **-51%** |
| vocabulary.json | 2 | ✅ | 69.1M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 58.1M | ✅ | 11.2M | 🟢 **-81%** |
| optional/bignum.json | 9 | ✅ | 62.5M | ✅ | 29.6M | 🟢 **-53%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 50.4M | ✅ | 33.3M | 🟢 **-34%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 16.8M | -6% |
| optional/format/date-time.json | 26 | ✅ | 25.7M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 8.9M | ✅ | 8.3M | -6% |
| optional/format/idn-email.json | 10 | ✅ | 16.7M | ✅ | 62K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 37.4M | ✅ | 29.8M | 🟢 **-20%** |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.9M | ✅ | 26.4M | -17% |
| optional/format/regex.json | 8 | ✅ | 70.7M | ✅ | 853K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 40.4M | ✅ | 30.4M | 🟢 **-25%** |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.6M | -13% |
| optional/format/unknown.json | 7 | ✅ | 83.0M | ✅ | 55.1M | 🟢 **-34%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 8.9M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 16.1M | ✅ | 15.5M | -4% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.3M | 🟢 **-34%** |
| optional/format/uuid.json | 22 | ✅ | 15.3M | ✅ | 15.0M | -2% |
| optional/id.json | 3 | ✅ | 36.3M | ✅ | 12.1M | 🟢 **-67%** |
| optional/no-schema.json | 3 | ✅ | 61.4M | ✅ | 45.1M | 🟢 **-27%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.9M | ✅ | 11.6M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 45.4M | ✅ | 38.3M | -16% |

