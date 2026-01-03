# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 23.2M | ⚠️ 31/38 | 707 | 11.4M | 🟢 **-51%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 26.1M | ⚠️ 46/49 | 1025 | 13.0M | 🟢 **-50%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.2M | ⚠️ 51/54 | 1221 | 11.3M | 🟢 **-49%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.3M | ⚠️ 62/69 | 1399 | 4.0M | 🟢 **-80%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 22.5M | ⚠️ 61/68 | 1394 | 5.8M | 🟢 **-74%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 22.4M | ⚠️ 251/278 | 5746 | 6.9M | 🟢 **-69%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 3.28x faster (45 ns vs 146 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 49.1M | ✅ | 23.3M | 🟢 **-53%** |
| additionalProperties.json | 16 | ✅ | 27.0M | ✅ | 15.8M | 🟢 **-41%** |
| allOf.json | 27 | ✅ | 40.4M | ✅ | 10.2M | 🟢 **-75%** |
| anyOf.json | 15 | ✅ | 47.1M | ✅ | 13.1M | 🟢 **-72%** |
| default.json | 7 | ✅ | 43.4M | ✅ | 46.5M | +7% |
| dependencies.json | 29 | ✅ | 26.7M | ✅ | 28.4M | +6% |
| enum.json | 49 | ✅ | 31.5M | ✅ | 20.5M | 🟢 **-35%** |
| format.json | 36 | ✅ | 47.1M | ✅ | 47.6M | +1% |
| infinite-loop-detection.json | 2 | ✅ | 32.8M | ✅ | 37.4M | +14% |
| items.json | 21 | ✅ | 23.6M | ✅ | 16.1M | 🟢 **-32%** |
| maxItems.json | 4 | ✅ | 55.4M | ✅ | 50.7M | -9% |
| maxLength.json | 5 | ✅ | 46.2M | ✅ | 47.6M | +3% |
| maxProperties.json | 8 | ✅ | 42.6M | ✅ | 38.3M | -10% |
| maximum.json | 8 | ✅ | 53.1M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 51.1M | ✅ | 49.5M | -3% |
| minLength.json | 5 | ✅ | 45.1M | ✅ | 41.8M | -7% |
| minProperties.json | 6 | ✅ | 45.8M | ✅ | 42.8M | -7% |
| minimum.json | 11 | ✅ | 53.7M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 42.1M | ✅ | 23.6M | 🟢 **-44%** |
| not.json | 20 | ✅ | 54.8M | ✅ | 38.7M | 🟢 **-29%** |
| oneOf.json | 23 | ✅ | 45.1M | ✅ | 10.6M | 🟢 **-76%** |
| pattern.json | 9 | ✅ | 33.8M | ✅ | 39.0M | +15% |
| patternProperties.json | 18 | ✅ | 15.5M | ✅ | 7.4M | 🟢 **-52%** |
| properties.json | 17 | ✅ | 24.9M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 28.0M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 35.8M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 47.2M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 49.3M | ✅ | 32.8M | 🟢 **-33%** |
| uniqueItems.json | 69 | ✅ | 23.0M | ✅ | 18.0M | 🟢 **-22%** |
| optional/bignum.json | 7 | ✅ | 49.3M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 15.8M | ✅ | 17.1M | +8% |
| optional/format/date-time.json | 26 | ✅ | 23.5M | ✅ | 3.0M | 🟢 **-87%** |
| optional/format/email.json | 17 | ✅ | 17.1M | ✅ | 21.8M | 🔴 **+27%** |
| optional/format/ipv4.json | 16 | ✅ | 36.4M | ✅ | 30.7M | -16% |
| optional/format/ipv6.json | 40 | ✅ | 11.5M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 61.8M | ✅ | 55.3M | -10% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.3M | 🟢 **-30%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.3M | ✅ | 13.4M | 🟢 **-34%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 46.8M | ✅ | 25.5M | 🟢 **-46%** |
| additionalProperties.json | 16 | ✅ | 28.4M | ✅ | 18.0M | 🟢 **-36%** |
| allOf.json | 30 | ✅ | 45.6M | ✅ | 10.4M | 🟢 **-77%** |
| anyOf.json | 18 | ✅ | 55.3M | ✅ | 12.2M | 🟢 **-78%** |
| boolean_schema.json | 18 | ✅ | 57.1M | ✅ | 44.8M | 🟢 **-22%** |
| const.json | 54 | ✅ | 55.6M | ✅ | 21.0M | 🟢 **-62%** |
| contains.json | 19 | ✅ | 48.5M | ✅ | 7.8M | 🟢 **-84%** |
| default.json | 7 | ✅ | 48.9M | ✅ | 42.8M | -13% |
| definitions.json | 2 | ✅ | 6.7M | ✅ | 1.4M | 🟢 **-79%** |
| dependencies.json | 36 | ✅ | 28.5M | ✅ | 30.7M | +8% |
| enum.json | 45 | ✅ | 36.4M | ✅ | 21.0M | 🟢 **-42%** |
| exclusiveMaximum.json | 4 | ✅ | 59.9M | ✅ | 43.1M | 🟢 **-28%** |
| exclusiveMinimum.json | 4 | ✅ | 59.7M | ✅ | 43.4M | 🟢 **-27%** |
| format.json | 54 | ✅ | 45.3M | ✅ | 51.6M | +14% |
| infinite-loop-detection.json | 2 | ✅ | 38.9M | ✅ | 34.4M | -11% |
| items.json | 28 | ✅ | 27.5M | ✅ | 18.6M | 🟢 **-32%** |
| maxItems.json | 6 | ✅ | 64.5M | ✅ | 49.8M | 🟢 **-23%** |
| maxLength.json | 7 | ✅ | 50.0M | ✅ | 46.2M | -8% |
| maxProperties.json | 10 | ✅ | 45.6M | ✅ | 37.5M | -18% |
| maximum.json | 8 | ✅ | 60.0M | ✅ | 49.1M | -18% |
| minItems.json | 6 | ✅ | 55.5M | ✅ | 49.3M | -11% |
| minLength.json | 7 | ✅ | 50.6M | ✅ | 44.3M | -12% |
| minProperties.json | 8 | ✅ | 44.8M | ✅ | 36.2M | -19% |
| minimum.json | 11 | ✅ | 58.3M | ✅ | 49.7M | -15% |
| multipleOf.json | 10 | ✅ | 58.1M | ✅ | 24.2M | 🟢 **-58%** |
| not.json | 38 | ✅ | 61.0M | ✅ | 41.1M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 48.3M | ✅ | 10.6M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 39.7M | ✅ | 33.5M | -16% |
| patternProperties.json | 23 | ✅ | 16.2M | ✅ | 9.3M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 28.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.7M | ✅ | 14.5M | 🟢 **-50%** |
| ref.json | 65 | ✅ | 23.1M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 29.2M | ✅ | 16.2M | 🟢 **-45%** |
| required.json | 9 | ✅ | 50.2M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 64.6M | ✅ | 36.3M | 🟢 **-44%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 17.4M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 57.2M | ✅ | 28.6M | 🟢 **-50%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.8M | ✅ | 16.9M | +0% |
| optional/format/date-time.json | 26 | ✅ | 23.5M | ✅ | 3.0M | 🟢 **-87%** |
| optional/format/email.json | 17 | ✅ | 18.3M | ✅ | 20.6M | +13% |
| optional/format/ipv4.json | 16 | ✅ | 34.6M | ✅ | 30.6M | -12% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.5M | ✅ | 25.4M | -14% |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 55.0M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.2M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 15.9M | ✅ | 15.6M | -2% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/id.json | 7 | ✅ | 39.5M | ✅ | 9.3M | 🟢 **-76%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.5M | ✅ | 13.2M | 🟢 **-35%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 45.4M | ✅ | 22.3M | 🟢 **-51%** |
| additionalProperties.json | 16 | ✅ | 25.3M | ✅ | 18.4M | 🟢 **-27%** |
| allOf.json | 30 | ✅ | 42.5M | ✅ | 9.9M | 🟢 **-77%** |
| anyOf.json | 18 | ✅ | 49.5M | ✅ | 12.1M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 54.7M | ✅ | 43.1M | 🟢 **-21%** |
| const.json | 54 | ✅ | 51.1M | ✅ | 17.7M | 🟢 **-65%** |
| contains.json | 21 | ✅ | 48.5M | ✅ | 8.5M | 🟢 **-83%** |
| default.json | 7 | ✅ | 41.7M | ✅ | 42.9M | +3% |
| definitions.json | 2 | ✅ | 13.3M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 29.4M | ✅ | 29.8M | +1% |
| enum.json | 45 | ✅ | 35.0M | ✅ | 20.3M | 🟢 **-42%** |
| exclusiveMaximum.json | 4 | ✅ | 52.8M | ✅ | 42.5M | -20% |
| exclusiveMinimum.json | 4 | ✅ | 57.7M | ✅ | 40.2M | 🟢 **-30%** |
| format.json | 102 | ✅ | 46.5M | ✅ | 41.6M | -11% |
| if-then-else.json | 26 | ✅ | 60.9M | ✅ | 36.7M | 🟢 **-40%** |
| infinite-loop-detection.json | 2 | ✅ | 35.1M | ✅ | 36.1M | +3% |
| items.json | 28 | ✅ | 24.0M | ✅ | 15.9M | 🟢 **-34%** |
| maxItems.json | 6 | ✅ | 57.0M | ✅ | 48.4M | -15% |
| maxLength.json | 7 | ✅ | 49.5M | ✅ | 42.9M | -13% |
| maxProperties.json | 10 | ✅ | 41.8M | ✅ | 37.3M | -11% |
| maximum.json | 8 | ✅ | 63.9M | ✅ | 47.2M | 🟢 **-26%** |
| minItems.json | 6 | ✅ | 57.7M | ✅ | 48.5M | -16% |
| minLength.json | 7 | ✅ | 48.2M | ✅ | 43.5M | -10% |
| minProperties.json | 8 | ✅ | 45.9M | ✅ | 38.7M | -16% |
| minimum.json | 11 | ✅ | 59.7M | ✅ | 48.8M | -18% |
| multipleOf.json | 10 | ✅ | 56.7M | ✅ | 23.5M | 🟢 **-59%** |
| not.json | 38 | ✅ | 61.6M | ✅ | 38.6M | 🟢 **-37%** |
| oneOf.json | 27 | ✅ | 44.4M | ✅ | 9.8M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 39.9M | ✅ | 38.1M | -4% |
| patternProperties.json | 23 | ✅ | 15.9M | ✅ | 9.3M | 🟢 **-42%** |
| properties.json | 21 | ✅ | 26.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.6M | ✅ | 13.6M | 🟢 **-52%** |
| ref.json | 73 | ✅ | 22.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 19.5M | ✅ | 18.5M | -5% |
| required.json | 9 | ✅ | 51.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 60.0M | ✅ | 34.9M | 🟢 **-42%** |
| uniqueItems.json | 69 | ✅ | 23.1M | ✅ | 16.8M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 55.2M | ✅ | 29.6M | 🟢 **-46%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.3M | ✅ | 15.6M | -4% |
| optional/format/date-time.json | 26 | ✅ | 24.8M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 7.8M | -8% |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 22.2M | 🔴 **+24%** |
| optional/format/ipv4.json | 16 | ✅ | 34.0M | ✅ | 30.8M | -9% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.8M | ✅ | 24.8M | -17% |
| optional/format/regex.json | 8 | ✅ | 57.2M | ✅ | 842K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.4M | ✅ | 29.3M | -20% |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.5M | -13% |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 54.9M | -16% |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 9.1M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.1M | ✅ | 15.0M | -1% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-33%** |
| optional/id.json | 7 | ✅ | 42.5M | ✅ | 17.8M | 🟢 **-58%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.4M | ✅ | 13.3M | 🟢 **-35%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 54.2M | ✅ | 31.4M | 🟢 **-42%** |
| additionalProperties.json | 21 | ✅ | 24.0M | ✅ | 13.7M | 🟢 **-43%** |
| allOf.json | 30 | ✅ | 44.8M | ✅ | 10.9M | 🟢 **-76%** |
| anchor.json | 8 | ✅ | 50.3M | ✅ | 39.2M | 🟢 **-22%** |
| anyOf.json | 18 | ✅ | 47.9M | ✅ | 11.4M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 55.9M | ✅ | 44.2M | 🟢 **-21%** |
| const.json | 54 | ✅ | 54.1M | ✅ | 17.9M | 🟢 **-67%** |
| contains.json | 21 | ✅ | 55.7M | ✅ | 14.5M | 🟢 **-74%** |
| content.json | 18 | ✅ | 66.0M | ✅ | 40.0M | 🟢 **-39%** |
| default.json | 7 | ✅ | 49.1M | ✅ | 47.4M | -4% |
| defs.json | 2 | ✅ | 1.8M | ✅ | 712K | 🟢 **-61%** |
| dependentRequired.json | 20 | ✅ | 40.0M | ✅ | 39.5M | -1% |
| dependentSchemas.json | 20 | ✅ | 41.5M | ✅ | 35.2M | -15% |
| enum.json | 45 | ✅ | 34.9M | ✅ | 19.7M | 🟢 **-44%** |
| exclusiveMaximum.json | 4 | ✅ | 55.8M | ✅ | 42.5M | 🟢 **-24%** |
| exclusiveMinimum.json | 4 | ✅ | 59.7M | ✅ | 42.2M | 🟢 **-29%** |
| format.json | 114 | ✅ | 69.1M | ✅ | 41.0M | 🟢 **-41%** |
| if-then-else.json | 26 | ✅ | 56.0M | ✅ | 34.1M | 🟢 **-39%** |
| infinite-loop-detection.json | 2 | ✅ | 33.5M | ✅ | 34.4M | +3% |
| items.json | 28 | ✅ | 26.1M | ✅ | 16.2M | 🟢 **-38%** |
| maxContains.json | 12 | ✅ | 55.5M | ✅ | 33.4M | 🟢 **-40%** |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 46.8M | 🟢 **-21%** |
| maxLength.json | 7 | ✅ | 51.0M | ✅ | 44.3M | -13% |
| maxProperties.json | 10 | ✅ | 45.5M | ✅ | 37.3M | -18% |
| maximum.json | 8 | ✅ | 61.4M | ✅ | 48.0M | 🟢 **-22%** |
| minContains.json | 28 | ✅ | 56.7M | ✅ | 23.6M | 🟢 **-58%** |
| minItems.json | 6 | ✅ | 59.0M | ✅ | 48.0M | -19% |
| minLength.json | 7 | ✅ | 49.6M | ✅ | 42.8M | -14% |
| minProperties.json | 8 | ✅ | 47.7M | ✅ | 38.7M | -19% |
| minimum.json | 11 | ✅ | 61.1M | ✅ | 47.3M | 🟢 **-23%** |
| multipleOf.json | 10 | ✅ | 58.4M | ✅ | 23.1M | 🟢 **-60%** |
| not.json | 40 | ✅ | 55.1M | ✅ | 34.7M | 🟢 **-37%** |
| oneOf.json | 27 | ✅ | 44.6M | ✅ | 9.9M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 38.8M | ✅ | 39.0M | +0% |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 7.1M | 🟢 **-55%** |
| properties.json | 21 | ✅ | 26.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.1M | ✅ | 13.2M | 🟢 **-56%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 18.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 22.7M | ✅ | 14.8M | 🟢 **-35%** |
| required.json | 9 | ✅ | 53.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 58.8M | ✅ | 34.3M | 🟢 **-42%** |
| unevaluatedItems.json | 51 | ✅ | 15.3M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.3M | ✅ | 16.7M | 🟢 **-25%** |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 51.4M | ✅ | 13.0M | 🟢 **-75%** |
| optional/bignum.json | 9 | ✅ | 58.8M | ✅ | 29.8M | 🟢 **-49%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 37.6M | ✅ | 30.3M | -19% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.3M | ✅ | 16.3M | -6% |
| optional/format/date-time.json | 26 | ✅ | 23.2M | ✅ | 3.0M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 8.7M | ✅ | 7.0M | -20% |
| optional/format/email.json | 17 | ✅ | 18.3M | ✅ | 22.2M | 🔴 **+22%** |
| optional/format/idn-email.json | 10 | ✅ | 16.6M | ✅ | 43K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 34.4M | ✅ | 30.4M | -12% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 25.5M | ✅ | 24.7M | -3% |
| optional/format/regex.json | 8 | ✅ | 57.5M | ✅ | 851K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 31.1M | ✅ | 30.1M | -3% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.4M | -16% |
| optional/format/unknown.json | 7 | ✅ | 66.6M | ✅ | 56.1M | -16% |
| optional/format/uri-reference.json | 15 | ✅ | 9.5M | ✅ | 9.4M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 15.5M | ✅ | 15.6M | +1% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/format/uuid.json | 22 | ✅ | 14.9M | ✅ | 14.9M | +0% |
| optional/id.json | 3 | ✅ | 34.2M | ✅ | 13.8M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 55.5M | ✅ | 43.8M | 🟢 **-21%** |
| optional/non-bmp-regex.json | 12 | ✅ | 17.5M | ✅ | 11.1M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 42.2M | ✅ | 39.1M | -7% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 23.3M | ✅ | 12.2M | 🟢 **-48%** |
| allOf.json | 30 | ✅ | 44.2M | ✅ | 9.3M | 🟢 **-79%** |
| anchor.json | 8 | ✅ | 49.1M | ✅ | 43.6M | -11% |
| anyOf.json | 18 | ✅ | 51.4M | ✅ | 11.5M | 🟢 **-78%** |
| boolean_schema.json | 18 | ✅ | 55.5M | ✅ | 44.1M | 🟢 **-21%** |
| const.json | 54 | ✅ | 53.8M | ✅ | 20.9M | 🟢 **-61%** |
| contains.json | 21 | ✅ | 55.1M | ✅ | 15.7M | 🟢 **-71%** |
| content.json | 18 | ✅ | 64.7M | ✅ | 51.7M | 🟢 **-20%** |
| default.json | 7 | ✅ | 45.9M | ✅ | 46.8M | +2% |
| defs.json | 2 | ✅ | 2.2M | ✅ | 761K | 🟢 **-65%** |
| dependentRequired.json | 20 | ✅ | 39.3M | ✅ | 41.7M | +6% |
| dependentSchemas.json | 20 | ✅ | 42.7M | ✅ | 37.0M | -13% |
| dynamicRef.json | 4 | ✅ | 8.8M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 36.7M | ✅ | 24.4M | 🟢 **-33%** |
| exclusiveMaximum.json | 4 | ✅ | 60.3M | ✅ | 43.3M | 🟢 **-28%** |
| exclusiveMinimum.json | 4 | ✅ | 70.5M | ✅ | 41.4M | 🟢 **-41%** |
| format.json | 133 | ✅ | 68.7M | ✅ | 40.8M | 🟢 **-41%** |
| if-then-else.json | 26 | ✅ | 62.2M | ✅ | 36.1M | 🟢 **-42%** |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ✅ | 36.7M | -6% |
| items.json | 29 | ✅ | 30.7M | ✅ | 26.1M | -15% |
| maxContains.json | 12 | ✅ | 61.6M | ✅ | 34.1M | 🟢 **-45%** |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 48.7M | -18% |
| maxLength.json | 7 | ✅ | 48.3M | ✅ | 45.2M | -6% |
| maxProperties.json | 10 | ✅ | 45.1M | ✅ | 38.1M | -16% |
| maximum.json | 8 | ✅ | 61.3M | ✅ | 49.3M | -20% |
| minContains.json | 28 | ✅ | 56.5M | ✅ | 37.8M | 🟢 **-33%** |
| minItems.json | 6 | ✅ | 59.7M | ✅ | 49.6M | -17% |
| minLength.json | 7 | ✅ | 50.7M | ✅ | 43.1M | -15% |
| minProperties.json | 8 | ✅ | 47.8M | ✅ | 39.2M | -18% |
| minimum.json | 11 | ✅ | 55.9M | ✅ | 49.1M | -12% |
| multipleOf.json | 10 | ✅ | 56.7M | ✅ | 23.2M | 🟢 **-59%** |
| not.json | 40 | ✅ | 57.1M | ✅ | 37.0M | 🟢 **-35%** |
| oneOf.json | 27 | ✅ | 47.8M | ✅ | 10.6M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 38.6M | ✅ | 36.6M | -5% |
| patternProperties.json | 23 | ✅ | 14.5M | ✅ | 7.2M | 🟢 **-50%** |
| prefixItems.json | 11 | ✅ | 56.9M | ✅ | 50.0M | -12% |
| properties.json | 21 | ✅ | 26.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.0M | ✅ | 14.6M | 🟢 **-48%** |
| ref.json | 71 | ✅ | 21.3M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 31.8M | ✅ | 17.5M | 🟢 **-45%** |
| required.json | 9 | ✅ | 52.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 58.6M | ✅ | 34.4M | 🟢 **-41%** |
| unevaluatedItems.json | 47 | ✅ | 22.5M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 13.2M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.9M | ✅ | 14.5M | 🟢 **-44%** |
| vocabulary.json | 2 | ✅ | 74.4M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.4M | ✅ | 11.0M | 🟢 **-79%** |
| optional/bignum.json | 9 | ✅ | 53.7M | ✅ | 30.6M | 🟢 **-43%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 40.9M | ✅ | 34.6M | -15% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.0M | ✅ | 16.6M | +4% |
| optional/format/date-time.json | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 7.9M | -8% |
| optional/format/idn-email.json | 10 | ✅ | 16.4M | ✅ | 80K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 39.3M | ✅ | 30.5M | 🟢 **-22%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.8M | ✅ | 25.5M | -11% |
| optional/format/regex.json | 8 | ✅ | 59.5M | ✅ | 839K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.3M | ✅ | 30.7M | -18% |
| optional/format/time.json | 46 | ✅ | 6.6M | ✅ | 5.7M | -14% |
| optional/format/unknown.json | 7 | ✅ | 69.9M | ✅ | 55.5M | 🟢 **-21%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.2M | ✅ | 9.2M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 15.6M | ✅ | 15.5M | -1% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-30%** |
| optional/format/uuid.json | 22 | ✅ | 15.0M | ✅ | 14.6M | -2% |
| optional/id.json | 3 | ✅ | 32.9M | ✅ | 12.1M | 🟢 **-63%** |
| optional/no-schema.json | 3 | ✅ | 60.9M | ✅ | 44.7M | 🟢 **-27%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.9M | ✅ | 10.8M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 39.8M | ✅ | 39.6M | 0% |

