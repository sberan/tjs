# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 30.0M | ⚠️ 31/38 | 707 | 18.1M | 🟢 **-40%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 30.3M | ⚠️ 46/49 | 1025 | 20.6M | 🟢 **-32%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 26.6M | ⚠️ 51/54 | 1221 | 17.6M | 🟢 **-34%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.3M | ⚠️ 62/69 | 1399 | 10.0M | 🟢 **-51%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.2M | ⚠️ 61/68 | 1394 | 9.9M | 🟢 **-53%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 24.0M | ⚠️ 251/278 | 5746 | 13.1M | 🟢 **-45%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 1.74x faster (42 ns vs 73 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 67.9M | ✅ | 57.1M | -16% |
| additionalProperties.json | 16 | ✅ | 42.3M | ✅ | 23.4M | 🟢 **-45%** |
| allOf.json | 27 | ✅ | 49.1M | ✅ | 28.2M | 🟢 **-43%** |
| anyOf.json | 15 | ✅ | 55.3M | ✅ | 18.4M | 🟢 **-67%** |
| default.json | 7 | ✅ | 63.2M | ✅ | 60.6M | -4% |
| dependencies.json | 29 | ✅ | 38.6M | ✅ | 44.0M | +14% |
| enum.json | 49 | ✅ | 25.8M | ✅ | 36.4M | 🔴 **+41%** |
| format.json | 36 | ✅ | 77.0M | ✅ | 72.0M | -6% |
| infinite-loop-detection.json | 2 | ✅ | 44.9M | ✅ | 41.8M | -7% |
| items.json | 21 | ✅ | 34.6M | ✅ | 34.0M | -2% |
| maxItems.json | 4 | ✅ | 76.4M | ✅ | 70.2M | -8% |
| maxLength.json | 5 | ✅ | 63.7M | ✅ | 60.5M | -5% |
| maxProperties.json | 8 | ✅ | 54.4M | ✅ | 50.5M | -7% |
| maximum.json | 8 | ✅ | 68.8M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 76.7M | ✅ | 71.3M | -7% |
| minLength.json | 5 | ✅ | 58.8M | ✅ | 53.6M | -9% |
| minProperties.json | 6 | ✅ | 60.0M | ✅ | 59.4M | -1% |
| minimum.json | 11 | ✅ | 71.9M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 66.0M | ✅ | 29.4M | 🟢 **-55%** |
| not.json | 20 | ✅ | 55.2M | ✅ | 49.2M | -11% |
| oneOf.json | 23 | ✅ | 47.1M | ✅ | 34.7M | 🟢 **-26%** |
| pattern.json | 9 | ✅ | 57.3M | ✅ | 55.1M | -4% |
| patternProperties.json | 18 | ✅ | 22.3M | ✅ | 11.9M | 🟢 **-47%** |
| properties.json | 17 | ✅ | 33.8M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 42.5M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 49.3M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 65.6M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 52.8M | ✅ | 52.4M | -1% |
| uniqueItems.json | 69 | ✅ | 26.6M | ✅ | 23.3M | -13% |
| optional/bignum.json | 7 | ✅ | 69.1M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.6M | ✅ | 26.8M | +4% |
| optional/format/date-time.json | 26 | ✅ | 24.8M | ✅ | 4.7M | 🟢 **-81%** |
| optional/format/email.json | 17 | ✅ | 21.2M | ✅ | 27.8M | 🔴 **+31%** |
| optional/format/ipv4.json | 16 | ✅ | 40.1M | ✅ | 38.9M | -3% |
| optional/format/ipv6.json | 40 | ✅ | 14.6M | ✅ | 4.5M | 🟢 **-70%** |
| optional/format/unknown.json | 7 | ✅ | 83.6M | ✅ | 73.7M | -12% |
| optional/format/uri.json | 36 | ✅ | 8.4M | ✅ | 6.1M | 🟢 **-27%** |
| optional/non-bmp-regex.json | 12 | ✅ | 28.6M | ✅ | 21.4M | 🟢 **-25%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 58.0M | ✅ | 54.0M | -7% |
| additionalProperties.json | 16 | ✅ | 39.1M | ✅ | 28.3M | 🟢 **-28%** |
| allOf.json | 30 | ✅ | 45.9M | ✅ | 29.1M | 🟢 **-37%** |
| anyOf.json | 18 | ✅ | 53.3M | ✅ | 39.7M | 🟢 **-25%** |
| boolean_schema.json | 18 | ✅ | 57.0M | ✅ | 54.0M | -5% |
| const.json | 54 | ✅ | 30.2M | ✅ | 31.9M | +6% |
| contains.json | 19 | ✅ | 30.5M | ✅ | 22.3M | 🟢 **-27%** |
| default.json | 7 | ✅ | 53.0M | ✅ | 60.3M | +14% |
| definitions.json | 2 | ✅ | 17.3M | ✅ | 2.3M | 🟢 **-87%** |
| dependencies.json | 36 | ✅ | 39.4M | ✅ | 46.2M | +17% |
| enum.json | 45 | ✅ | 23.7M | ✅ | 32.5M | 🔴 **+37%** |
| exclusiveMaximum.json | 4 | ✅ | 63.3M | ✅ | 57.3M | -9% |
| exclusiveMinimum.json | 4 | ✅ | 65.7M | ✅ | 62.9M | -4% |
| format.json | 54 | ✅ | 65.4M | ✅ | 72.0M | +10% |
| infinite-loop-detection.json | 2 | ✅ | 44.3M | ✅ | 41.3M | -7% |
| items.json | 28 | ✅ | 36.8M | ✅ | 38.9M | +6% |
| maxItems.json | 6 | ✅ | 58.3M | ✅ | 60.7M | +4% |
| maxLength.json | 7 | ✅ | 50.2M | ✅ | 56.4M | +12% |
| maxProperties.json | 10 | ✅ | 45.0M | ✅ | 47.2M | +5% |
| maximum.json | 8 | ✅ | 66.5M | ✅ | 63.7M | -4% |
| minItems.json | 6 | ✅ | 58.9M | ✅ | 62.5M | +6% |
| minLength.json | 7 | ✅ | 48.5M | ✅ | 54.7M | +13% |
| minProperties.json | 8 | ✅ | 49.1M | ✅ | 53.7M | +9% |
| minimum.json | 11 | ✅ | 70.9M | ✅ | 65.0M | -8% |
| multipleOf.json | 10 | ✅ | 66.0M | ✅ | 29.0M | 🟢 **-56%** |
| not.json | 38 | ✅ | 53.4M | ✅ | 54.1M | +1% |
| oneOf.json | 27 | ✅ | 51.1M | ✅ | 34.1M | 🟢 **-33%** |
| pattern.json | 9 | ✅ | 56.4M | ✅ | 55.5M | -2% |
| patternProperties.json | 23 | ✅ | 23.6M | ✅ | 14.9M | 🟢 **-37%** |
| properties.json | 21 | ✅ | 38.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 44.3M | ✅ | 19.6M | 🟢 **-56%** |
| ref.json | 65 | ✅ | 38.6M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 43.4M | ✅ | 37.8M | -13% |
| required.json | 9 | ✅ | 67.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 51.4M | ✅ | 51.7M | +0% |
| uniqueItems.json | 69 | ✅ | 26.5M | ✅ | 22.7M | -14% |
| optional/bignum.json | 9 | ✅ | 60.5M | ✅ | 31.7M | 🟢 **-48%** |
| optional/ecmascript-regex.json | 74 | ✅ | 25.4M | ✅ | 26.5M | +5% |
| optional/format/date-time.json | 26 | ✅ | 22.6M | ✅ | 4.7M | 🟢 **-79%** |
| optional/format/email.json | 17 | ✅ | 19.5M | ✅ | 27.2M | 🔴 **+39%** |
| optional/format/ipv4.json | 16 | ✅ | 34.3M | ✅ | 39.3M | +14% |
| optional/format/ipv6.json | 40 | ✅ | 13.9M | ✅ | 4.5M | 🟢 **-68%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.6M | ✅ | 31.1M | +5% |
| optional/format/unknown.json | 7 | ✅ | 82.4M | ✅ | 72.6M | -12% |
| optional/format/uri-reference.json | 15 | ✅ | 12.1M | ✅ | 12.3M | +2% |
| optional/format/uri-template.json | 10 | ✅ | 20.3M | ✅ | 21.5M | +6% |
| optional/format/uri.json | 36 | ✅ | 8.4M | ✅ | 6.0M | 🟢 **-28%** |
| optional/id.json | 7 | ✅ | 33.1M | ✅ | 12.6M | 🟢 **-62%** |
| optional/non-bmp-regex.json | 12 | ✅ | 27.2M | ✅ | 20.7M | 🟢 **-24%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 56.9M | ✅ | 54.1M | -5% |
| additionalProperties.json | 16 | ✅ | 38.1M | ✅ | 28.9M | 🟢 **-24%** |
| allOf.json | 30 | ✅ | 45.3M | ✅ | 29.4M | 🟢 **-35%** |
| anyOf.json | 18 | ✅ | 52.2M | ✅ | 38.8M | 🟢 **-26%** |
| boolean_schema.json | 18 | ✅ | 54.4M | ✅ | 51.4M | -5% |
| const.json | 54 | ✅ | 27.5M | ✅ | 30.7M | +12% |
| contains.json | 21 | ✅ | 21.9M | ✅ | 14.9M | 🟢 **-32%** |
| default.json | 7 | ✅ | 51.6M | ✅ | 56.4M | +9% |
| definitions.json | 2 | ✅ | 16.4M | ✅ | 1.9M | 🟢 **-88%** |
| dependencies.json | 36 | ✅ | 37.4M | ✅ | 45.6M | 🔴 **+22%** |
| enum.json | 45 | ✅ | 23.9M | ✅ | 33.9M | 🔴 **+42%** |
| exclusiveMaximum.json | 4 | ✅ | 59.6M | ✅ | 55.8M | -6% |
| exclusiveMinimum.json | 4 | ✅ | 64.9M | ✅ | 62.4M | -4% |
| format.json | 102 | ✅ | 69.3M | ✅ | 76.5M | +10% |
| if-then-else.json | 26 | ✅ | 62.5M | ✅ | 53.8M | -14% |
| infinite-loop-detection.json | 2 | ✅ | 39.3M | ✅ | 41.3M | +5% |
| items.json | 28 | ✅ | 35.6M | ✅ | 27.1M | 🟢 **-24%** |
| maxItems.json | 6 | ✅ | 56.3M | ✅ | 60.9M | +8% |
| maxLength.json | 7 | ✅ | 50.4M | ✅ | 55.4M | +10% |
| maxProperties.json | 10 | ✅ | 43.1M | ✅ | 48.6M | +13% |
| maximum.json | 8 | ✅ | 68.6M | ✅ | 63.8M | -7% |
| minItems.json | 6 | ✅ | 59.0M | ✅ | 61.0M | +3% |
| minLength.json | 7 | ✅ | 46.8M | ✅ | 54.4M | +16% |
| minProperties.json | 8 | ✅ | 49.7M | ✅ | 52.1M | +5% |
| minimum.json | 11 | ✅ | 71.9M | ✅ | 65.4M | -9% |
| multipleOf.json | 10 | ✅ | 66.1M | ✅ | 28.6M | 🟢 **-57%** |
| not.json | 38 | ✅ | 53.0M | ✅ | 52.6M | -1% |
| oneOf.json | 27 | ✅ | 47.9M | ✅ | 33.7M | 🟢 **-30%** |
| pattern.json | 9 | ✅ | 55.4M | ✅ | 52.8M | -5% |
| patternProperties.json | 23 | ✅ | 22.1M | ✅ | 14.9M | 🟢 **-32%** |
| properties.json | 21 | ✅ | 35.5M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 43.7M | ✅ | 37.4M | -14% |
| ref.json | 73 | ✅ | 39.0M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 43.3M | ✅ | 37.8M | -13% |
| required.json | 9 | ✅ | 67.1M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 52.5M | ✅ | 48.1M | -8% |
| uniqueItems.json | 69 | ✅ | 24.9M | ✅ | 22.0M | -12% |
| optional/bignum.json | 9 | ✅ | 62.5M | ✅ | 32.6M | 🟢 **-48%** |
| optional/ecmascript-regex.json | 74 | ✅ | 25.3M | ✅ | 24.7M | -3% |
| optional/format/date-time.json | 26 | ✅ | 23.9M | ✅ | 4.7M | 🟢 **-80%** |
| optional/format/date.json | 48 | ✅ | 10.0M | ✅ | 10.0M | 0% |
| optional/format/email.json | 17 | ✅ | 19.7M | ✅ | 27.4M | 🔴 **+39%** |
| optional/format/ipv4.json | 16 | ✅ | 38.5M | ✅ | 38.4M | 0% |
| optional/format/ipv6.json | 40 | ✅ | 14.4M | ✅ | 4.4M | 🟢 **-69%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.9M | ✅ | 30.6M | -1% |
| optional/format/regex.json | 8 | ✅ | 66.2M | ✅ | 1.2M | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.4M | ✅ | 36.0M | -4% |
| optional/format/time.json | 46 | ✅ | 8.3M | ✅ | 7.9M | -5% |
| optional/format/unknown.json | 7 | ✅ | 82.8M | ✅ | 72.6M | -12% |
| optional/format/uri-reference.json | 15 | ✅ | 12.1M | ✅ | 12.2M | +1% |
| optional/format/uri-template.json | 10 | ✅ | 20.7M | ✅ | 21.4M | +3% |
| optional/format/uri.json | 36 | ✅ | 8.5M | ✅ | 6.0M | 🟢 **-29%** |
| optional/id.json | 7 | ✅ | 27.8M | ✅ | 29.6M | +7% |
| optional/non-bmp-regex.json | 12 | ✅ | 27.3M | ✅ | 22.4M | -18% |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 37.0M | ✅ | 53.0M | 🔴 **+43%** |
| additionalProperties.json | 21 | ✅ | 28.2M | ✅ | 27.9M | -1% |
| allOf.json | 30 | ✅ | 30.7M | ✅ | 29.5M | -4% |
| anchor.json | 8 | ✅ | 34.8M | ✅ | 59.9M | 🔴 **+72%** |
| anyOf.json | 18 | ✅ | 34.8M | ✅ | 36.6M | +5% |
| boolean_schema.json | 18 | ✅ | 36.9M | ✅ | 55.3M | 🔴 **+50%** |
| const.json | 54 | ✅ | 22.0M | ✅ | 32.0M | 🔴 **+45%** |
| contains.json | 21 | ✅ | 23.2M | ✅ | 23.8M | +2% |
| content.json | 18 | ✅ | 46.3M | ✅ | 74.1M | 🔴 **+60%** |
| default.json | 7 | ✅ | 39.1M | ✅ | 59.9M | 🔴 **+53%** |
| defs.json | 2 | ✅ | 2.8M | ✅ | 1.5M | 🟢 **-46%** |
| dependentRequired.json | 20 | ✅ | 35.3M | ✅ | 54.4M | 🔴 **+54%** |
| dependentSchemas.json | 20 | ✅ | 32.8M | ✅ | 47.8M | 🔴 **+46%** |
| enum.json | 45 | ✅ | 19.6M | ✅ | 35.8M | 🔴 **+83%** |
| exclusiveMaximum.json | 4 | ✅ | 38.1M | ✅ | 62.3M | 🔴 **+63%** |
| exclusiveMinimum.json | 4 | ✅ | 36.9M | ✅ | 61.3M | 🔴 **+66%** |
| format.json | 114 | ✅ | 47.2M | ✅ | 71.1M | 🔴 **+51%** |
| if-then-else.json | 26 | ✅ | 36.3M | ✅ | 54.6M | 🔴 **+50%** |
| infinite-loop-detection.json | 2 | ✅ | 31.8M | ✅ | 46.3M | 🔴 **+46%** |
| items.json | 28 | ✅ | 24.1M | ✅ | 38.7M | 🔴 **+60%** |
| maxContains.json | 12 | ✅ | 30.8M | ✅ | 45.8M | 🔴 **+48%** |
| maxItems.json | 6 | ✅ | 41.4M | ✅ | 62.1M | 🔴 **+50%** |
| maxLength.json | 7 | ✅ | 38.7M | ✅ | 56.9M | 🔴 **+47%** |
| maxProperties.json | 10 | ✅ | 32.9M | ✅ | 48.5M | 🔴 **+47%** |
| maximum.json | 8 | ✅ | 40.5M | ✅ | 64.0M | 🔴 **+58%** |
| minContains.json | 28 | ✅ | 30.5M | ✅ | 51.7M | 🔴 **+70%** |
| minItems.json | 6 | ✅ | 41.5M | ✅ | 61.9M | 🔴 **+49%** |
| minLength.json | 7 | ✅ | 33.3M | ✅ | 53.9M | 🔴 **+62%** |
| minProperties.json | 8 | ✅ | 33.2M | ✅ | 53.6M | 🔴 **+61%** |
| minimum.json | 11 | ✅ | 35.7M | ✅ | 65.3M | 🔴 **+83%** |
| multipleOf.json | 10 | ✅ | 37.4M | ✅ | 28.0M | 🟢 **-25%** |
| not.json | 40 | ✅ | 33.7M | ✅ | 50.9M | 🔴 **+51%** |
| oneOf.json | 27 | ✅ | 32.9M | ✅ | 32.4M | -1% |
| pattern.json | 9 | ✅ | 35.1M | ✅ | 54.7M | 🔴 **+56%** |
| patternProperties.json | 23 | ✅ | 19.1M | ✅ | 10.2M | 🟢 **-47%** |
| properties.json | 21 | ✅ | 27.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.1M | ✅ | 37.6M | 🔴 **+25%** |
| recursiveRef.json | 31 | ✅ | 8.6M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 21.6M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.5M | ✅ | 26.2M | -11% |
| required.json | 9 | ✅ | 39.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 32.4M | ✅ | 51.7M | 🔴 **+60%** |
| unevaluatedItems.json | 51 | ✅ | 19.9M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.3M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 20.5M | ✅ | 22.8M | +11% |
| vocabulary.json | 2 | ✅ | 36.5M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 22.6M | ✅ | 17.6M | 🟢 **-22%** |
| optional/bignum.json | 9 | ✅ | 36.2M | ✅ | 33.1M | -9% |
| optional/dependencies-compatibility.json | 36 | ✅ | 34.1M | ✅ | 49.2M | 🔴 **+44%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.7M | ✅ | 26.3M | 🔴 **+33%** |
| optional/format/date-time.json | 26 | ✅ | 19.5M | ✅ | 4.7M | 🟢 **-76%** |
| optional/format/date.json | 48 | ✅ | 9.3M | ✅ | 10.0M | +8% |
| optional/format/email.json | 17 | ✅ | 17.2M | ✅ | 27.7M | 🔴 **+61%** |
| optional/format/idn-email.json | 10 | ✅ | 18.4M | ✅ | 151K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 27.9M | ✅ | 38.4M | 🔴 **+37%** |
| optional/format/ipv6.json | 40 | ✅ | 12.6M | ✅ | 4.4M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.7M | ✅ | 31.0M | 🔴 **+31%** |
| optional/format/regex.json | 8 | ✅ | 39.6M | ✅ | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.4M | ✅ | 36.3M | 🔴 **+38%** |
| optional/format/time.json | 46 | ✅ | 7.8M | ✅ | 7.9M | +1% |
| optional/format/unknown.json | 7 | ✅ | 47.5M | ✅ | 74.6M | 🔴 **+57%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.8M | ✅ | 12.1M | +13% |
| optional/format/uri-template.json | 10 | ✅ | 17.2M | ✅ | 21.2M | 🔴 **+23%** |
| optional/format/uri.json | 36 | ✅ | 7.8M | ✅ | 6.0M | 🟢 **-24%** |
| optional/format/uuid.json | 22 | ✅ | 14.3M | ✅ | 18.4M | 🔴 **+29%** |
| optional/id.json | 3 | ✅ | 19.4M | ✅ | 19.3M | 0% |
| optional/no-schema.json | 3 | ✅ | 34.6M | ✅ | 65.3M | 🔴 **+89%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.8M | ✅ | 19.5M | -11% |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 33.3M | ✅ | 53.3M | 🔴 **+60%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 27.8M | ✅ | 28.1M | +1% |
| allOf.json | 30 | ✅ | 31.4M | ✅ | 29.2M | -7% |
| anchor.json | 8 | ✅ | 31.7M | ✅ | 60.6M | 🔴 **+91%** |
| anyOf.json | 18 | ✅ | 34.6M | ✅ | 36.7M | +6% |
| boolean_schema.json | 18 | ✅ | 34.7M | ✅ | 55.7M | 🔴 **+61%** |
| const.json | 54 | ✅ | 22.7M | ✅ | 31.8M | 🔴 **+40%** |
| contains.json | 21 | ✅ | 23.1M | ✅ | 13.9M | 🟢 **-40%** |
| content.json | 18 | ✅ | 46.5M | ✅ | 74.8M | 🔴 **+61%** |
| default.json | 7 | ✅ | 39.4M | ✅ | 59.7M | 🔴 **+52%** |
| defs.json | 2 | ✅ | 3.5M | ✅ | 1.6M | 🟢 **-56%** |
| dependentRequired.json | 20 | ✅ | 34.8M | ✅ | 53.4M | 🔴 **+53%** |
| dependentSchemas.json | 20 | ✅ | 32.7M | ✅ | 48.2M | 🔴 **+47%** |
| dynamicRef.json | 4 | ✅ | 11.7M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 19.3M | ✅ | 35.9M | 🔴 **+86%** |
| exclusiveMaximum.json | 4 | ✅ | 38.0M | ✅ | 58.9M | 🔴 **+55%** |
| exclusiveMinimum.json | 4 | ✅ | 37.7M | ✅ | 57.8M | 🔴 **+53%** |
| format.json | 133 | ✅ | 46.3M | ✅ | 66.9M | 🔴 **+44%** |
| if-then-else.json | 26 | ✅ | 37.0M | ✅ | 49.1M | 🔴 **+33%** |
| infinite-loop-detection.json | 2 | ✅ | 32.4M | ✅ | 41.7M | 🔴 **+29%** |
| items.json | 29 | ✅ | 22.0M | ✅ | 26.1M | +19% |
| maxContains.json | 12 | ✅ | 29.3M | ✅ | 45.5M | 🔴 **+55%** |
| maxItems.json | 6 | ✅ | 37.8M | ✅ | 61.9M | 🔴 **+64%** |
| maxLength.json | 7 | ✅ | 34.0M | ✅ | 56.4M | 🔴 **+66%** |
| maxProperties.json | 10 | ✅ | 30.9M | ✅ | 49.2M | 🔴 **+60%** |
| maximum.json | 8 | ✅ | 40.6M | ✅ | 63.9M | 🔴 **+57%** |
| minContains.json | 28 | ✅ | 30.0M | ✅ | 51.4M | 🔴 **+71%** |
| minItems.json | 6 | ✅ | 37.7M | ✅ | 61.6M | 🔴 **+63%** |
| minLength.json | 7 | ✅ | 31.7M | ✅ | 54.8M | 🔴 **+73%** |
| minProperties.json | 8 | ✅ | 31.4M | ✅ | 53.2M | 🔴 **+70%** |
| minimum.json | 11 | ✅ | 36.6M | ✅ | 64.1M | 🔴 **+75%** |
| multipleOf.json | 10 | ✅ | 36.5M | ✅ | 29.2M | 🟢 **-20%** |
| not.json | 40 | ✅ | 32.7M | ✅ | 52.1M | 🔴 **+60%** |
| oneOf.json | 27 | ✅ | 32.7M | ✅ | 33.1M | +1% |
| pattern.json | 9 | ✅ | 35.2M | ✅ | 55.0M | 🔴 **+56%** |
| patternProperties.json | 23 | ✅ | 19.4M | ✅ | 10.4M | 🟢 **-46%** |
| prefixItems.json | 11 | ✅ | 38.9M | ✅ | 65.7M | 🔴 **+69%** |
| properties.json | 21 | ✅ | 27.2M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.0M | ✅ | 19.7M | 🟢 **-34%** |
| ref.json | 71 | ✅ | 23.8M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.9M | ✅ | 40.7M | 🔴 **+36%** |
| required.json | 9 | ✅ | 36.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 31.9M | ✅ | 52.5M | 🔴 **+64%** |
| unevaluatedItems.json | 47 | ✅ | 24.7M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 15.3M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.2M | ✅ | 22.8M | +3% |
| vocabulary.json | 2 | ✅ | 39.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 22.3M | ✅ | 17.6M | 🟢 **-21%** |
| optional/bignum.json | 9 | ✅ | 35.9M | ✅ | 32.7M | -9% |
| optional/dependencies-compatibility.json | 36 | ✅ | 34.3M | ✅ | 51.8M | 🔴 **+51%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.6M | ✅ | 25.8M | 🔴 **+32%** |
| optional/format/date-time.json | 26 | ✅ | 19.5M | ✅ | 4.7M | 🟢 **-76%** |
| optional/format/date.json | 48 | ✅ | 9.2M | ✅ | 10.0M | +9% |
| optional/format/idn-email.json | 10 | ✅ | 18.2M | ✅ | 149K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 25.9M | ✅ | 38.8M | 🔴 **+50%** |
| optional/format/ipv6.json | 40 | ✅ | 12.3M | ✅ | 4.4M | 🟢 **-64%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.6M | ✅ | 31.5M | 🔴 **+34%** |
| optional/format/regex.json | 8 | ✅ | 38.3M | ✅ | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.3M | ✅ | 36.1M | 🔴 **+37%** |
| optional/format/time.json | 46 | ✅ | 7.8M | ✅ | 7.9M | +1% |
| optional/format/unknown.json | 7 | ✅ | 47.3M | ✅ | 75.4M | 🔴 **+59%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.8M | ✅ | 12.2M | +13% |
| optional/format/uri-template.json | 10 | ✅ | 17.4M | ✅ | 21.5M | 🔴 **+24%** |
| optional/format/uri.json | 36 | ✅ | 7.8M | ✅ | 5.9M | 🟢 **-24%** |
| optional/format/uuid.json | 22 | ✅ | 14.0M | ✅ | 17.9M | 🔴 **+28%** |
| optional/id.json | 3 | ✅ | 19.3M | ✅ | 19.6M | +1% |
| optional/no-schema.json | 3 | ✅ | 33.3M | ✅ | 58.0M | 🔴 **+74%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.3M | ✅ | 18.4M | -14% |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 32.4M | ✅ | 53.1M | 🔴 **+64%** |

