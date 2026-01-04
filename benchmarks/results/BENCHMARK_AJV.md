# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.6M | ⚠️ 31/38 | 707 | 11.3M | 🟢 **-54%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 27.4M | ⚠️ 46/49 | 1025 | 12.5M | 🟢 **-54%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 23.9M | ⚠️ 51/54 | 1221 | 11.7M | 🟢 **-51%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.8M | ⚠️ 62/69 | 1399 | 5.7M | 🟢 **-73%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 24.4M | ⚠️ 61/68 | 1394 | 5.6M | 🟢 **-77%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 23.7M | ⚠️ 251/278 | 5746 | 7.7M | 🟢 **-67%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 3.14x faster (42 ns vs 132 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 56.2M | ✅ | 42.8M | 🟢 **-24%** |
| additionalProperties.json | 16 | ✅ | 30.1M | ✅ | 11.3M | 🟢 **-62%** |
| allOf.json | 27 | ✅ | 40.9M | ✅ | 10.6M | 🟢 **-74%** |
| anyOf.json | 15 | ✅ | 52.0M | ✅ | 14.3M | 🟢 **-72%** |
| default.json | 7 | ✅ | 47.1M | ✅ | 47.4M | +1% |
| dependencies.json | 29 | ✅ | 25.4M | ✅ | 28.6M | +12% |
| enum.json | 49 | ✅ | 36.4M | ✅ | 19.9M | 🟢 **-45%** |
| format.json | 36 | ✅ | 47.8M | ✅ | 43.7M | -9% |
| infinite-loop-detection.json | 2 | ✅ | 38.4M | ✅ | 33.9M | -12% |
| items.json | 21 | ✅ | 28.3M | ✅ | 15.9M | 🟢 **-44%** |
| maxItems.json | 4 | ✅ | 57.0M | ✅ | 47.8M | -16% |
| maxLength.json | 5 | ✅ | 49.1M | ✅ | 47.3M | -4% |
| maxProperties.json | 8 | ✅ | 46.6M | ✅ | 38.7M | -17% |
| maximum.json | 8 | ✅ | 58.2M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 65.2M | ✅ | 48.2M | 🟢 **-26%** |
| minLength.json | 5 | ✅ | 48.2M | ✅ | 43.6M | -10% |
| minProperties.json | 6 | ✅ | 49.6M | ✅ | 41.8M | -16% |
| minimum.json | 11 | ✅ | 59.1M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 55.2M | ✅ | 23.5M | 🟢 **-57%** |
| not.json | 20 | ✅ | 58.8M | ✅ | 39.4M | 🟢 **-33%** |
| oneOf.json | 23 | ✅ | 48.2M | ✅ | 9.8M | 🟢 **-80%** |
| pattern.json | 9 | ✅ | 39.5M | ✅ | 39.0M | -1% |
| patternProperties.json | 18 | ✅ | 16.3M | ✅ | 7.4M | 🟢 **-54%** |
| properties.json | 17 | ✅ | 27.2M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 30.4M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 38.8M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 51.7M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 58.6M | ✅ | 35.6M | 🟢 **-39%** |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 17.7M | 🟢 **-27%** |
| optional/bignum.json | 7 | ✅ | 54.0M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 16.5M | ✅ | 17.2M | +4% |
| optional/format/date-time.json | 26 | ✅ | 24.0M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 17.2M | ✅ | 21.3M | 🔴 **+24%** |
| optional/format/ipv4.json | 16 | ✅ | 38.6M | ✅ | 30.7M | 🟢 **-20%** |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 66.5M | ✅ | 55.1M | -17% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.4M | ✅ | 12.4M | 🟢 **-42%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 62.5M | ✅ | 20.1M | 🟢 **-68%** |
| additionalProperties.json | 16 | ✅ | 32.3M | ✅ | 16.5M | 🟢 **-49%** |
| allOf.json | 30 | ✅ | 50.4M | ✅ | 10.3M | 🟢 **-80%** |
| anyOf.json | 18 | ✅ | 56.1M | ✅ | 11.8M | 🟢 **-79%** |
| boolean_schema.json | 18 | ✅ | 47.5M | ✅ | 38.6M | -19% |
| const.json | 54 | ✅ | 66.8M | ✅ | 20.7M | 🟢 **-69%** |
| contains.json | 19 | ✅ | 56.9M | ✅ | 7.2M | 🟢 **-87%** |
| default.json | 7 | ✅ | 54.7M | ✅ | 43.5M | 🟢 **-20%** |
| definitions.json | 2 | ✅ | 12.3M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 31.1M | ✅ | 30.6M | -2% |
| enum.json | 45 | ✅ | 40.8M | ✅ | 20.9M | 🟢 **-49%** |
| exclusiveMaximum.json | 4 | ✅ | 66.7M | ✅ | 43.2M | 🟢 **-35%** |
| exclusiveMinimum.json | 4 | ✅ | 78.9M | ✅ | 41.3M | 🟢 **-48%** |
| format.json | 54 | ✅ | 46.1M | ✅ | 47.1M | +2% |
| infinite-loop-detection.json | 2 | ✅ | 42.9M | ✅ | 35.5M | -17% |
| items.json | 28 | ✅ | 29.2M | ✅ | 17.4M | 🟢 **-40%** |
| maxItems.json | 6 | ✅ | 67.3M | ✅ | 46.7M | 🟢 **-31%** |
| maxLength.json | 7 | ✅ | 54.6M | ✅ | 45.3M | -17% |
| maxProperties.json | 10 | ✅ | 51.9M | ✅ | 34.6M | 🟢 **-33%** |
| maximum.json | 8 | ✅ | 69.4M | ✅ | 48.1M | 🟢 **-31%** |
| minItems.json | 6 | ✅ | 67.4M | ✅ | 49.0M | 🟢 **-27%** |
| minLength.json | 7 | ✅ | 55.1M | ✅ | 41.8M | 🟢 **-24%** |
| minProperties.json | 8 | ✅ | 54.7M | ✅ | 39.0M | 🟢 **-29%** |
| minimum.json | 11 | ✅ | 77.0M | ✅ | 47.2M | 🟢 **-39%** |
| multipleOf.json | 10 | ✅ | 64.6M | ✅ | 22.6M | 🟢 **-65%** |
| not.json | 38 | ✅ | 73.3M | ✅ | 38.8M | 🟢 **-47%** |
| oneOf.json | 27 | ✅ | 47.8M | ✅ | 10.3M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 50.6M | ✅ | 39.8M | 🟢 **-21%** |
| patternProperties.json | 23 | ✅ | 16.3M | ✅ | 6.9M | 🟢 **-58%** |
| properties.json | 21 | ✅ | 30.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 34.7M | ✅ | 14.0M | 🟢 **-60%** |
| ref.json | 65 | ✅ | 21.5M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 26.3M | ✅ | 14.6M | 🟢 **-44%** |
| required.json | 9 | ✅ | 62.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 76.1M | ✅ | 34.4M | 🟢 **-55%** |
| uniqueItems.json | 69 | ✅ | 25.1M | ✅ | 16.6M | 🟢 **-34%** |
| optional/bignum.json | 9 | ✅ | 67.9M | ✅ | 29.1M | 🟢 **-57%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.5M | ✅ | 16.3M | -7% |
| optional/format/date-time.json | 26 | ✅ | 25.9M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 18.6M | ✅ | 20.6M | +11% |
| optional/format/ipv4.json | 16 | ✅ | 43.1M | ✅ | 30.1M | 🟢 **-30%** |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.9M | ✅ | 24.6M | 🟢 **-23%** |
| optional/format/unknown.json | 7 | ✅ | 82.8M | ✅ | 54.9M | 🟢 **-34%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 9.1M | -7% |
| optional/format/uri-template.json | 10 | ✅ | 15.6M | ✅ | 15.7M | +1% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ | 43.4M | ✅ | 9.1M | 🟢 **-79%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.7M | ✅ | 13.1M | 🟢 **-45%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 58.9M | ✅ | 19.9M | 🟢 **-66%** |
| additionalProperties.json | 16 | ✅ | 29.9M | ✅ | 18.3M | 🟢 **-39%** |
| allOf.json | 30 | ✅ | 52.8M | ✅ | 11.3M | 🟢 **-79%** |
| anyOf.json | 18 | ✅ | 57.8M | ✅ | 12.6M | 🟢 **-78%** |
| boolean_schema.json | 18 | ✅ | 64.5M | ✅ | 45.2M | 🟢 **-30%** |
| const.json | 54 | ✅ | 67.5M | ✅ | 18.2M | 🟢 **-73%** |
| contains.json | 21 | ✅ | 64.3M | ✅ | 14.9M | 🟢 **-77%** |
| default.json | 7 | ✅ | 54.7M | ✅ | 47.5M | -13% |
| definitions.json | 2 | ✅ | 12.2M | ✅ | 1.3M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 34.6M | ✅ | 28.7M | -17% |
| enum.json | 45 | ✅ | 41.8M | ✅ | 20.9M | 🟢 **-50%** |
| exclusiveMaximum.json | 4 | ✅ | 66.7M | ✅ | 44.5M | 🟢 **-33%** |
| exclusiveMinimum.json | 4 | ✅ | 78.1M | ✅ | 41.0M | 🟢 **-47%** |
| format.json | 102 | ✅ | 40.7M | ✅ | 47.4M | +17% |
| if-then-else.json | 26 | ✅ | 63.3M | ✅ | 37.5M | 🟢 **-41%** |
| infinite-loop-detection.json | 2 | ✅ | 42.7M | ✅ | 36.8M | -14% |
| items.json | 28 | ✅ | 31.0M | ✅ | 19.2M | 🟢 **-38%** |
| maxItems.json | 6 | ✅ | 67.4M | ✅ | 47.9M | 🟢 **-29%** |
| maxLength.json | 7 | ✅ | 56.4M | ✅ | 45.4M | -19% |
| maxProperties.json | 10 | ✅ | 53.0M | ✅ | 37.1M | 🟢 **-30%** |
| maximum.json | 8 | ✅ | 69.6M | ✅ | 48.8M | 🟢 **-30%** |
| minItems.json | 6 | ✅ | 67.1M | ✅ | 46.4M | 🟢 **-31%** |
| minLength.json | 7 | ✅ | 55.3M | ✅ | 44.2M | -20% |
| minProperties.json | 8 | ✅ | 54.4M | ✅ | 39.3M | 🟢 **-28%** |
| minimum.json | 11 | ✅ | 77.0M | ✅ | 48.9M | 🟢 **-37%** |
| multipleOf.json | 10 | ✅ | 64.4M | ✅ | 23.0M | 🟢 **-64%** |
| not.json | 38 | ✅ | 76.0M | ✅ | 41.0M | 🟢 **-46%** |
| oneOf.json | 27 | ✅ | 56.6M | ✅ | 10.6M | 🟢 **-81%** |
| pattern.json | 9 | ✅ | 44.4M | ✅ | 37.9M | -15% |
| patternProperties.json | 23 | ✅ | 17.5M | ✅ | 9.3M | 🟢 **-47%** |
| properties.json | 21 | ✅ | 31.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 32.1M | ✅ | 14.4M | 🟢 **-55%** |
| ref.json | 73 | ✅ | 23.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 33.1M | ✅ | 16.1M | 🟢 **-51%** |
| required.json | 9 | ✅ | 62.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 74.3M | ✅ | 35.1M | 🟢 **-53%** |
| uniqueItems.json | 69 | ✅ | 25.1M | ✅ | 16.5M | 🟢 **-34%** |
| optional/bignum.json | 9 | ✅ | 76.4M | ✅ | 31.1M | 🟢 **-59%** |
| optional/ecmascript-regex.json | 74 | ✅ | 18.4M | ✅ | 16.8M | -8% |
| optional/format/date-time.json | 26 | ✅ | 26.0M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 8.2M | -5% |
| optional/format/email.json | 17 | ✅ | 18.7M | ✅ | 22.3M | +19% |
| optional/format/ipv4.json | 16 | ✅ | 37.1M | ✅ | 31.0M | -16% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.8M | ✅ | 25.3M | +6% |
| optional/format/regex.json | 8 | ✅ | 68.1M | ✅ | 850K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 40.3M | ✅ | 29.8M | 🟢 **-26%** |
| optional/format/time.json | 46 | ✅ | 6.7M | ✅ | 5.6M | -15% |
| optional/format/unknown.json | 7 | ✅ | 82.4M | ✅ | 54.9M | 🟢 **-33%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 9.1M | -7% |
| optional/format/uri-template.json | 10 | ✅ | 16.1M | ✅ | 15.7M | -3% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-34%** |
| optional/id.json | 7 | ✅ | 47.9M | ✅ | 21.6M | 🟢 **-55%** |
| optional/non-bmp-regex.json | 12 | ✅ | 24.3M | ✅ | 13.2M | 🟢 **-46%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 58.4M | ✅ | 22.2M | 🟢 **-62%** |
| additionalProperties.json | 21 | ✅ | 27.5M | ✅ | 17.4M | 🟢 **-37%** |
| allOf.json | 30 | ✅ | 48.8M | ✅ | 10.5M | 🟢 **-78%** |
| anchor.json | 8 | ✅ | 53.9M | ✅ | 40.7M | 🟢 **-25%** |
| anyOf.json | 18 | ✅ | 54.2M | ✅ | 10.9M | 🟢 **-80%** |
| boolean_schema.json | 18 | ✅ | 58.3M | ✅ | 41.9M | 🟢 **-28%** |
| const.json | 54 | ✅ | 59.8M | ✅ | 20.9M | 🟢 **-65%** |
| contains.json | 21 | ✅ | 55.1M | ✅ | 8.8M | 🟢 **-84%** |
| content.json | 18 | ✅ | 73.0M | ✅ | 55.9M | 🟢 **-23%** |
| default.json | 7 | ✅ | 52.6M | ✅ | 46.4M | -12% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 900K | 🟢 **-53%** |
| dependentRequired.json | 20 | ✅ | 40.6M | ✅ | 40.2M | -1% |
| dependentSchemas.json | 20 | ✅ | 46.7M | ✅ | 34.9M | 🟢 **-25%** |
| enum.json | 45 | ✅ | 36.6M | ✅ | 18.8M | 🟢 **-49%** |
| exclusiveMaximum.json | 4 | ✅ | 58.6M | ✅ | 40.8M | 🟢 **-30%** |
| exclusiveMinimum.json | 4 | ✅ | 63.9M | ✅ | 39.0M | 🟢 **-39%** |
| format.json | 114 | ✅ | 77.2M | ✅ | 41.1M | 🟢 **-47%** |
| if-then-else.json | 26 | ✅ | 61.9M | ✅ | 34.5M | 🟢 **-44%** |
| infinite-loop-detection.json | 2 | ✅ | 41.5M | ✅ | 34.1M | -18% |
| items.json | 28 | ✅ | 29.1M | ✅ | 16.2M | 🟢 **-44%** |
| maxContains.json | 12 | ✅ | 57.8M | ✅ | 30.4M | 🟢 **-48%** |
| maxItems.json | 6 | ✅ | 63.5M | ✅ | 41.8M | 🟢 **-34%** |
| maxLength.json | 7 | ✅ | 52.6M | ✅ | 43.7M | -17% |
| maxProperties.json | 10 | ✅ | 50.9M | ✅ | 37.5M | 🟢 **-26%** |
| maximum.json | 8 | ✅ | 66.8M | ✅ | 47.7M | 🟢 **-29%** |
| minContains.json | 28 | ✅ | 71.5M | ✅ | 26.8M | 🟢 **-63%** |
| minItems.json | 6 | ✅ | 64.2M | ✅ | 41.7M | 🟢 **-35%** |
| minLength.json | 7 | ✅ | 52.9M | ✅ | 42.9M | -19% |
| minProperties.json | 8 | ✅ | 51.7M | ✅ | 39.0M | 🟢 **-25%** |
| minimum.json | 11 | ✅ | 64.3M | ✅ | 47.6M | 🟢 **-26%** |
| multipleOf.json | 10 | ✅ | 62.1M | ✅ | 22.2M | 🟢 **-64%** |
| not.json | 40 | ✅ | 62.9M | ✅ | 35.5M | 🟢 **-44%** |
| oneOf.json | 27 | ✅ | 56.3M | ✅ | 10.0M | 🟢 **-82%** |
| pattern.json | 9 | ✅ | 42.9M | ✅ | 37.9M | -12% |
| patternProperties.json | 23 | ✅ | 15.0M | ✅ | 5.6M | 🟢 **-62%** |
| properties.json | 21 | ✅ | 26.9M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.0M | ✅ | 12.9M | 🟢 **-56%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 15.9M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 33.5M | ✅ | 14.8M | 🟢 **-56%** |
| required.json | 9 | ✅ | 59.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 68.7M | ✅ | 34.6M | 🟢 **-50%** |
| unevaluatedItems.json | 51 | ✅ | 16.3M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.4M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.1M | ✅ | 17.0M | 🟢 **-32%** |
| vocabulary.json | 2 | ✅ | 67.0M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 55.8M | ✅ | 11.0M | 🟢 **-80%** |
| optional/bignum.json | 9 | ✅ | 60.7M | ✅ | 28.7M | 🟢 **-53%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 41.3M | ✅ | 31.3M | 🟢 **-24%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.1M | ✅ | 16.6M | -3% |
| optional/format/date-time.json | 26 | ✅ | 23.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.0M | ✅ | 7.5M | -7% |
| optional/format/email.json | 17 | ✅ | 18.5M | ✅ | 20.0M | +8% |
| optional/format/idn-email.json | 10 | ✅ | 16.8M | ✅ | 77K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 35.8M | ✅ | 28.9M | -19% |
| optional/format/ipv6.json | 40 | ✅ | 11.9M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.6M | ✅ | 23.6M | 🟢 **-23%** |
| optional/format/regex.json | 8 | ✅ | 65.3M | ✅ | 851K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 39.3M | ✅ | 29.5M | 🟢 **-25%** |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.4M | -13% |
| optional/format/unknown.json | 7 | ✅ | 78.4M | ✅ | 54.3M | 🟢 **-31%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.0M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.3M | ✅ | 15.1M | -2% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.2M | 🟢 **-34%** |
| optional/format/uuid.json | 22 | ✅ | 14.9M | ✅ | 14.5M | -3% |
| optional/id.json | 3 | ✅ | 34.4M | ✅ | 14.0M | 🟢 **-59%** |
| optional/no-schema.json | 3 | ✅ | 58.5M | ✅ | 42.7M | 🟢 **-27%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.6M | ✅ | 12.2M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 46.2M | ✅ | 39.7M | -14% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 28.2M | ✅ | 16.1M | 🟢 **-43%** |
| allOf.json | 30 | ✅ | 51.3M | ✅ | 11.3M | 🟢 **-78%** |
| anchor.json | 8 | ✅ | 47.7M | ✅ | 35.6M | 🟢 **-25%** |
| anyOf.json | 18 | ✅ | 60.1M | ✅ | 10.5M | 🟢 **-83%** |
| boolean_schema.json | 18 | ✅ | 71.4M | ✅ | 38.2M | 🟢 **-46%** |
| const.json | 54 | ✅ | 72.4M | ✅ | 19.5M | 🟢 **-73%** |
| contains.json | 21 | ✅ | 64.3M | ✅ | 13.0M | 🟢 **-80%** |
| content.json | 18 | ✅ | 79.5M | ✅ | 55.1M | 🟢 **-31%** |
| default.json | 7 | ✅ | 53.9M | ✅ | 43.0M | 🟢 **-20%** |
| defs.json | 2 | ✅ | 1.9M | ✅ | 716K | 🟢 **-62%** |
| dependentRequired.json | 20 | ✅ | 41.1M | ✅ | 35.2M | -14% |
| dependentSchemas.json | 20 | ✅ | 44.9M | ✅ | 30.2M | 🟢 **-33%** |
| dynamicRef.json | 4 | ✅ | 7.1M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 46.0M | ✅ | 21.7M | 🟢 **-53%** |
| exclusiveMaximum.json | 4 | ✅ | 77.1M | ✅ | 36.9M | 🟢 **-52%** |
| exclusiveMinimum.json | 4 | ✅ | 76.7M | ✅ | 36.4M | 🟢 **-52%** |
| format.json | 133 | ✅ | 84.9M | ✅ | 48.3M | 🟢 **-43%** |
| if-then-else.json | 26 | ✅ | 63.2M | ✅ | 32.7M | 🟢 **-48%** |
| infinite-loop-detection.json | 2 | ✅ | 38.9M | ✅ | 28.4M | 🟢 **-27%** |
| items.json | 29 | ✅ | 29.2M | ✅ | 14.7M | 🟢 **-50%** |
| maxContains.json | 12 | ✅ | 66.3M | ✅ | 28.2M | 🟢 **-57%** |
| maxItems.json | 6 | ✅ | 76.7M | ✅ | 41.4M | 🟢 **-46%** |
| maxLength.json | 7 | ✅ | 61.1M | ✅ | 38.5M | 🟢 **-37%** |
| maxProperties.json | 10 | ✅ | 55.0M | ✅ | 31.7M | 🟢 **-42%** |
| maximum.json | 8 | ✅ | 77.3M | ✅ | 42.1M | 🟢 **-46%** |
| minContains.json | 28 | ✅ | 82.4M | ✅ | 20.8M | 🟢 **-75%** |
| minItems.json | 6 | ✅ | 75.6M | ✅ | 40.2M | 🟢 **-47%** |
| minLength.json | 7 | ✅ | 56.5M | ✅ | 36.7M | 🟢 **-35%** |
| minProperties.json | 8 | ✅ | 56.7M | ✅ | 35.2M | 🟢 **-38%** |
| minimum.json | 11 | ✅ | 78.7M | ✅ | 40.9M | 🟢 **-48%** |
| multipleOf.json | 10 | ✅ | 69.2M | ✅ | 20.6M | 🟢 **-70%** |
| not.json | 40 | ✅ | 69.0M | ✅ | 27.6M | 🟢 **-60%** |
| oneOf.json | 27 | ✅ | 51.9M | ✅ | 9.8M | 🟢 **-81%** |
| pattern.json | 9 | ✅ | 55.1M | ✅ | 34.8M | 🟢 **-37%** |
| patternProperties.json | 23 | ✅ | 15.1M | ✅ | 5.7M | 🟢 **-62%** |
| prefixItems.json | 11 | ✅ | 63.7M | ✅ | 43.1M | 🟢 **-32%** |
| properties.json | 21 | ✅ | 26.6M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 31.3M | ✅ | 12.2M | 🟢 **-61%** |
| ref.json | 71 | ✅ | 18.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 27.5M | ✅ | 15.5M | 🟢 **-44%** |
| required.json | 9 | ✅ | 58.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 80.6M | ✅ | 31.4M | 🟢 **-61%** |
| unevaluatedItems.json | 47 | ✅ | 24.8M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 13.8M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 27.7M | ✅ | 13.2M | 🟢 **-52%** |
| vocabulary.json | 2 | ✅ | 77.4M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 66.6M | ✅ | 9.0M | 🟢 **-86%** |
| optional/bignum.json | 9 | ✅ | 67.9M | ✅ | 26.3M | 🟢 **-61%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 43.7M | ✅ | 31.0M | 🟢 **-29%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.0M | ✅ | 16.2M | -15% |
| optional/format/date-time.json | 26 | ✅ | 27.2M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 9.8M | ✅ | 8.4M | -14% |
| optional/format/idn-email.json | 10 | ✅ | 17.4M | ✅ | 76K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 39.6M | ✅ | 26.4M | 🟢 **-33%** |
| optional/format/ipv6.json | 40 | ✅ | 12.3M | ✅ | 3.0M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 33.8M | ✅ | 22.0M | 🟢 **-35%** |
| optional/format/regex.json | 8 | ✅ | 76.6M | ✅ | 828K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.6M | ✅ | 26.2M | 🟢 **-30%** |
| optional/format/time.json | 46 | ✅ | 6.8M | ✅ | 5.4M | 🟢 **-20%** |
| optional/format/unknown.json | 7 | ✅ | 100.2M | ✅ | 53.0M | 🟢 **-47%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.9M | ✅ | 9.3M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 18.8M | ✅ | 16.2M | -14% |
| optional/format/uri.json | 36 | ✅ | 6.9M | ✅ | 4.4M | 🟢 **-35%** |
| optional/format/uuid.json | 22 | ✅ | 16.6M | ✅ | 14.0M | -16% |
| optional/id.json | 3 | ✅ | 28.6M | ✅ | 10.8M | 🟢 **-62%** |
| optional/no-schema.json | 3 | ✅ | 68.8M | ✅ | 35.7M | 🟢 **-48%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.0M | ✅ | 11.0M | 🟢 **-50%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 47.8M | ✅ | 36.2M | 🟢 **-24%** |

