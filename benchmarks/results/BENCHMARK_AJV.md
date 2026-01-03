# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 30.1M | ⚠️ 31/38 | 707 | 18.2M | 🟢 **-40%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 30.6M | ⚠️ 46/49 | 1025 | 20.4M | 🟢 **-33%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 26.9M | ⚠️ 51/54 | 1221 | 17.7M | 🟢 **-34%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.3M | ⚠️ 62/69 | 1399 | 9.9M | 🟢 **-51%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.3M | ⚠️ 61/68 | 1394 | 10.0M | 🟢 **-53%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 24.1M | ⚠️ 251/278 | 5746 | 13.1M | 🟢 **-46%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 1.75x faster (42 ns vs 73 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 68.4M | ✅ | 55.8M | -18% |
| additionalProperties.json | 16 | ✅ | 42.0M | ✅ | 29.0M | 🟢 **-31%** |
| allOf.json | 27 | ✅ | 49.4M | ✅ | 27.2M | 🟢 **-45%** |
| anyOf.json | 15 | ✅ | 54.2M | ✅ | 38.4M | 🟢 **-29%** |
| default.json | 7 | ✅ | 62.9M | ✅ | 59.2M | -6% |
| dependencies.json | 29 | ✅ | 38.7M | ✅ | 43.4M | +12% |
| enum.json | 49 | ✅ | 25.4M | ✅ | 35.8M | 🔴 **+41%** |
| format.json | 36 | ✅ | 77.9M | ✅ | 71.8M | -8% |
| infinite-loop-detection.json | 2 | ✅ | 48.8M | ✅ | 46.5M | -5% |
| items.json | 21 | ✅ | 36.5M | ✅ | 34.1M | -6% |
| maxItems.json | 4 | ✅ | 70.0M | ✅ | 63.9M | -9% |
| maxLength.json | 5 | ✅ | 63.5M | ✅ | 58.8M | -7% |
| maxProperties.json | 8 | ✅ | 52.6M | ✅ | 49.7M | -6% |
| maximum.json | 8 | ✅ | 68.9M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 70.0M | ✅ | 65.3M | -7% |
| minLength.json | 5 | ✅ | 59.1M | ✅ | 55.0M | -7% |
| minProperties.json | 6 | ✅ | 61.0M | ✅ | 56.4M | -8% |
| minimum.json | 11 | ✅ | 72.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 67.4M | ✅ | 28.4M | 🟢 **-58%** |
| not.json | 20 | ✅ | 54.5M | ✅ | 50.8M | -7% |
| oneOf.json | 23 | ✅ | 48.2M | ✅ | 33.7M | 🟢 **-30%** |
| pattern.json | 9 | ✅ | 56.3M | ✅ | 55.5M | -1% |
| patternProperties.json | 18 | ✅ | 24.5M | ✅ | 15.3M | 🟢 **-38%** |
| properties.json | 17 | ✅ | 36.7M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 41.3M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 49.9M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 66.4M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 53.9M | ✅ | 50.5M | -6% |
| uniqueItems.json | 69 | ✅ | 26.6M | ✅ | 22.6M | -15% |
| optional/bignum.json | 7 | ✅ | 68.2M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.0M | ✅ | 25.4M | +1% |
| optional/format/date-time.json | 26 | ✅ | 24.2M | ✅ | 4.7M | 🟢 **-81%** |
| optional/format/email.json | 17 | ✅ | 21.0M | ✅ | 27.6M | 🔴 **+31%** |
| optional/format/ipv4.json | 16 | ✅ | 41.7M | ✅ | 38.3M | -8% |
| optional/format/ipv6.json | 40 | ✅ | 14.7M | ✅ | 4.4M | 🟢 **-70%** |
| optional/format/unknown.json | 7 | ✅ | 94.4M | ✅ | 72.4M | 🟢 **-23%** |
| optional/format/uri.json | 36 | ✅ | 8.4M | ✅ | 6.0M | 🟢 **-29%** |
| optional/non-bmp-regex.json | 12 | ✅ | 28.0M | ✅ | 19.1M | 🟢 **-32%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 61.8M | ✅ | 52.6M | -15% |
| additionalProperties.json | 16 | ✅ | 40.8M | ✅ | 29.5M | 🟢 **-28%** |
| allOf.json | 30 | ✅ | 48.5M | ✅ | 28.7M | 🟢 **-41%** |
| anyOf.json | 18 | ✅ | 57.9M | ✅ | 40.0M | 🟢 **-31%** |
| boolean_schema.json | 18 | ✅ | 61.1M | ✅ | 55.4M | -9% |
| const.json | 54 | ✅ | 30.7M | ✅ | 31.6M | +3% |
| contains.json | 19 | ✅ | 30.8M | ✅ | 21.8M | 🟢 **-29%** |
| default.json | 7 | ✅ | 63.3M | ✅ | 59.0M | -7% |
| definitions.json | 2 | ✅ | 17.0M | ✅ | 2.2M | 🟢 **-87%** |
| dependencies.json | 36 | ✅ | 41.9M | ✅ | 45.5M | +9% |
| enum.json | 45 | ✅ | 25.5M | ✅ | 35.0M | 🔴 **+38%** |
| exclusiveMaximum.json | 4 | ✅ | 63.7M | ✅ | 58.6M | -8% |
| exclusiveMinimum.json | 4 | ✅ | 62.6M | ✅ | 56.8M | -9% |
| format.json | 54 | ✅ | 75.6M | ✅ | 71.3M | -6% |
| infinite-loop-detection.json | 2 | ✅ | 44.2M | ✅ | 41.8M | -6% |
| items.json | 28 | ✅ | 36.9M | ✅ | 38.6M | +5% |
| maxItems.json | 6 | ✅ | 59.6M | ✅ | 61.0M | +2% |
| maxLength.json | 7 | ✅ | 51.4M | ✅ | 56.2M | +10% |
| maxProperties.json | 10 | ✅ | 46.9M | ✅ | 48.1M | +3% |
| maximum.json | 8 | ✅ | 70.1M | ✅ | 62.9M | -10% |
| minItems.json | 6 | ✅ | 59.8M | ✅ | 61.3M | +2% |
| minLength.json | 7 | ✅ | 50.0M | ✅ | 55.0M | +10% |
| minProperties.json | 8 | ✅ | 50.1M | ✅ | 52.9M | +6% |
| minimum.json | 11 | ✅ | 71.7M | ✅ | 64.7M | -10% |
| multipleOf.json | 10 | ✅ | 67.7M | ✅ | 28.9M | 🟢 **-57%** |
| not.json | 38 | ✅ | 54.8M | ✅ | 52.9M | -3% |
| oneOf.json | 27 | ✅ | 48.8M | ✅ | 33.2M | 🟢 **-32%** |
| pattern.json | 9 | ✅ | 55.4M | ✅ | 53.4M | -3% |
| patternProperties.json | 23 | ✅ | 23.9M | ✅ | 11.6M | 🟢 **-51%** |
| properties.json | 21 | ✅ | 38.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 43.8M | ✅ | 37.1M | -15% |
| ref.json | 65 | ✅ | 34.7M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 43.2M | ✅ | 37.3M | -14% |
| required.json | 9 | ✅ | 68.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 53.3M | ✅ | 51.6M | -3% |
| uniqueItems.json | 69 | ✅ | 26.3M | ✅ | 22.8M | -13% |
| optional/bignum.json | 9 | ✅ | 63.2M | ✅ | 32.9M | 🟢 **-48%** |
| optional/ecmascript-regex.json | 74 | ✅ | 25.4M | ✅ | 26.0M | +2% |
| optional/format/date-time.json | 26 | ✅ | 22.6M | ✅ | 4.7M | 🟢 **-79%** |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 26.9M | 🔴 **+49%** |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ✅ | 37.8M | +9% |
| optional/format/ipv6.json | 40 | ✅ | 14.0M | ✅ | 4.4M | 🟢 **-69%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.6M | ✅ | 30.5M | +3% |
| optional/format/unknown.json | 7 | ✅ | 92.7M | ✅ | 72.3M | 🟢 **-22%** |
| optional/format/uri-reference.json | 15 | ✅ | 12.0M | ✅ | 12.3M | +2% |
| optional/format/uri-template.json | 10 | ✅ | 19.0M | ✅ | 18.0M | -5% |
| optional/format/uri.json | 36 | ✅ | 8.3M | ✅ | 5.8M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 33.8M | ✅ | 14.2M | 🟢 **-58%** |
| optional/non-bmp-regex.json | 12 | ✅ | 28.6M | ✅ | 22.4M | 🟢 **-22%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 61.9M | ✅ | 41.1M | 🟢 **-34%** |
| additionalProperties.json | 16 | ✅ | 40.6M | ✅ | 29.3M | 🟢 **-28%** |
| allOf.json | 30 | ✅ | 48.4M | ✅ | 27.5M | 🟢 **-43%** |
| anyOf.json | 18 | ✅ | 56.8M | ✅ | 38.9M | 🟢 **-32%** |
| boolean_schema.json | 18 | ✅ | 57.6M | ✅ | 53.5M | -7% |
| const.json | 54 | ✅ | 28.5M | ✅ | 31.4M | +10% |
| contains.json | 21 | ✅ | 21.7M | ✅ | 23.0M | +6% |
| default.json | 7 | ✅ | 62.6M | ✅ | 56.9M | -9% |
| definitions.json | 2 | ✅ | 16.6M | ✅ | 2.1M | 🟢 **-88%** |
| dependencies.json | 36 | ✅ | 40.7M | ✅ | 44.4M | +9% |
| enum.json | 45 | ✅ | 25.2M | ✅ | 35.0M | 🔴 **+39%** |
| exclusiveMaximum.json | 4 | ✅ | 60.9M | ✅ | 58.6M | -4% |
| exclusiveMinimum.json | 4 | ✅ | 62.6M | ✅ | 57.8M | -8% |
| format.json | 102 | ✅ | 70.8M | ✅ | 72.7M | +3% |
| if-then-else.json | 26 | ✅ | 65.4M | ✅ | 48.1M | 🟢 **-26%** |
| infinite-loop-detection.json | 2 | ✅ | 44.0M | ✅ | 40.3M | -8% |
| items.json | 28 | ✅ | 40.0M | ✅ | 38.4M | -4% |
| maxItems.json | 6 | ✅ | 60.2M | ✅ | 61.1M | +2% |
| maxLength.json | 7 | ✅ | 51.7M | ✅ | 55.4M | +7% |
| maxProperties.json | 10 | ✅ | 40.8M | ✅ | 43.9M | +8% |
| maximum.json | 8 | ✅ | 71.2M | ✅ | 62.5M | -12% |
| minItems.json | 6 | ✅ | 60.1M | ✅ | 61.4M | +2% |
| minLength.json | 7 | ✅ | 50.2M | ✅ | 54.9M | +9% |
| minProperties.json | 8 | ✅ | 49.8M | ✅ | 53.6M | +8% |
| minimum.json | 11 | ✅ | 71.6M | ✅ | 64.6M | -10% |
| multipleOf.json | 10 | ✅ | 67.4M | ✅ | 28.2M | 🟢 **-58%** |
| not.json | 38 | ✅ | 54.8M | ✅ | 53.1M | -3% |
| oneOf.json | 27 | ✅ | 49.8M | ✅ | 33.4M | 🟢 **-33%** |
| pattern.json | 9 | ✅ | 56.9M | ✅ | 53.7M | -5% |
| patternProperties.json | 23 | ✅ | 21.8M | ✅ | 15.0M | 🟢 **-31%** |
| properties.json | 21 | ✅ | 38.5M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 43.6M | ✅ | 19.6M | 🟢 **-55%** |
| ref.json | 73 | ✅ | 38.2M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 30.4M | ✅ | 36.2M | +19% |
| required.json | 9 | ✅ | 66.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 51.7M | ✅ | 48.0M | -7% |
| uniqueItems.json | 69 | ✅ | 26.3M | ✅ | 22.5M | -15% |
| optional/bignum.json | 9 | ✅ | 59.3M | ✅ | 32.4M | 🟢 **-45%** |
| optional/ecmascript-regex.json | 74 | ✅ | 25.0M | ✅ | 25.9M | +4% |
| optional/format/date-time.json | 26 | ✅ | 24.4M | ✅ | 4.7M | 🟢 **-81%** |
| optional/format/date.json | 48 | ✅ | 10.0M | ✅ | 9.9M | -1% |
| optional/format/email.json | 17 | ✅ | 20.3M | ✅ | 27.2M | 🔴 **+34%** |
| optional/format/ipv4.json | 16 | ✅ | 39.1M | ✅ | 38.1M | -3% |
| optional/format/ipv6.json | 40 | ✅ | 14.3M | ✅ | 4.4M | 🟢 **-70%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.3M | ✅ | 29.5M | -3% |
| optional/format/regex.json | 8 | ✅ | 69.4M | ✅ | 1.3M | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 38.0M | ✅ | 36.0M | -5% |
| optional/format/time.json | 46 | ✅ | 8.3M | ✅ | 7.8M | -6% |
| optional/format/unknown.json | 7 | ✅ | 91.7M | ✅ | 72.4M | 🟢 **-21%** |
| optional/format/uri-reference.json | 15 | ✅ | 12.1M | ✅ | 12.1M | +0% |
| optional/format/uri-template.json | 10 | ✅ | 19.6M | ✅ | 19.6M | 0% |
| optional/format/uri.json | 36 | ✅ | 8.5M | ✅ | 5.9M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 28.8M | ✅ | 28.9M | +0% |
| optional/non-bmp-regex.json | 12 | ✅ | 28.5M | ✅ | 21.1M | 🟢 **-26%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 37.8M | ✅ | 55.2M | 🔴 **+46%** |
| additionalProperties.json | 21 | ✅ | 27.9M | ✅ | 27.7M | -1% |
| allOf.json | 30 | ✅ | 32.9M | ✅ | 29.0M | -12% |
| anchor.json | 8 | ✅ | 33.1M | ✅ | 61.2M | 🔴 **+85%** |
| anyOf.json | 18 | ✅ | 35.5M | ✅ | 36.6M | +3% |
| boolean_schema.json | 18 | ✅ | 36.3M | ✅ | 55.5M | 🔴 **+53%** |
| const.json | 54 | ✅ | 22.5M | ✅ | 32.0M | 🔴 **+42%** |
| contains.json | 21 | ✅ | 23.4M | ✅ | 23.6M | +1% |
| content.json | 18 | ✅ | 46.3M | ✅ | 75.1M | 🔴 **+62%** |
| default.json | 7 | ✅ | 38.7M | ✅ | 60.0M | 🔴 **+55%** |
| defs.json | 2 | ✅ | 2.7M | ✅ | 1.3M | 🟢 **-53%** |
| dependentRequired.json | 20 | ✅ | 35.2M | ✅ | 54.3M | 🔴 **+54%** |
| dependentSchemas.json | 20 | ✅ | 33.1M | ✅ | 47.8M | 🔴 **+45%** |
| enum.json | 45 | ✅ | 19.8M | ✅ | 34.0M | 🔴 **+72%** |
| exclusiveMaximum.json | 4 | ✅ | 37.6M | ✅ | 62.6M | 🔴 **+67%** |
| exclusiveMinimum.json | 4 | ✅ | 37.6M | ✅ | 58.5M | 🔴 **+55%** |
| format.json | 114 | ✅ | 47.4M | ✅ | 71.0M | 🔴 **+50%** |
| if-then-else.json | 26 | ✅ | 36.5M | ✅ | 54.9M | 🔴 **+50%** |
| infinite-loop-detection.json | 2 | ✅ | 32.4M | ✅ | 46.1M | 🔴 **+42%** |
| items.json | 28 | ✅ | 29.2M | ✅ | 38.4M | 🔴 **+32%** |
| maxContains.json | 12 | ✅ | 30.5M | ✅ | 45.2M | 🔴 **+48%** |
| maxItems.json | 6 | ✅ | 42.4M | ✅ | 61.6M | 🔴 **+45%** |
| maxLength.json | 7 | ✅ | 38.6M | ✅ | 56.8M | 🔴 **+47%** |
| maxProperties.json | 10 | ✅ | 32.7M | ✅ | 48.7M | 🔴 **+49%** |
| maximum.json | 8 | ✅ | 42.2M | ✅ | 63.6M | 🔴 **+51%** |
| minContains.json | 28 | ✅ | 29.9M | ✅ | 49.2M | 🔴 **+65%** |
| minItems.json | 6 | ✅ | 42.7M | ✅ | 61.5M | 🔴 **+44%** |
| minLength.json | 7 | ✅ | 36.3M | ✅ | 55.0M | 🔴 **+51%** |
| minProperties.json | 8 | ✅ | 34.1M | ✅ | 53.7M | 🔴 **+57%** |
| minimum.json | 11 | ✅ | 35.6M | ✅ | 65.2M | 🔴 **+83%** |
| multipleOf.json | 10 | ✅ | 36.4M | ✅ | 28.7M | 🟢 **-21%** |
| not.json | 40 | ✅ | 34.4M | ✅ | 41.8M | 🔴 **+22%** |
| oneOf.json | 27 | ✅ | 31.6M | ✅ | 32.0M | +1% |
| pattern.json | 9 | ✅ | 32.7M | ✅ | 54.9M | 🔴 **+68%** |
| patternProperties.json | 23 | ✅ | 19.3M | ✅ | 10.3M | 🟢 **-47%** |
| properties.json | 21 | ✅ | 27.5M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.4M | ✅ | 37.0M | 🔴 **+26%** |
| recursiveRef.json | 31 | ✅ | 8.4M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 21.3M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 27.3M | ✅ | 38.9M | 🔴 **+42%** |
| required.json | 9 | ✅ | 38.1M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 31.9M | ✅ | 49.9M | 🔴 **+56%** |
| unevaluatedItems.json | 51 | ✅ | 19.5M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.5M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 20.9M | ✅ | 22.9M | +9% |
| vocabulary.json | 2 | ✅ | 37.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 22.6M | ✅ | 17.3M | 🟢 **-23%** |
| optional/bignum.json | 9 | ✅ | 34.8M | ✅ | 32.9M | -6% |
| optional/dependencies-compatibility.json | 36 | ✅ | 34.5M | ✅ | 51.6M | 🔴 **+50%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.8M | ✅ | 24.1M | 🔴 **+22%** |
| optional/format/date-time.json | 26 | ✅ | 19.6M | ✅ | 4.7M | 🟢 **-76%** |
| optional/format/date.json | 48 | ✅ | 9.3M | ✅ | 10.0M | +7% |
| optional/format/email.json | 17 | ✅ | 17.3M | ✅ | 27.3M | 🔴 **+58%** |
| optional/format/idn-email.json | 10 | ✅ | 18.4M | ✅ | 149K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 28.3M | ✅ | 37.3M | 🔴 **+32%** |
| optional/format/ipv6.json | 40 | ✅ | 12.7M | ✅ | 4.4M | 🟢 **-66%** |
| optional/format/json-pointer.json | 38 | ✅ | 22.7M | ✅ | 31.0M | 🔴 **+36%** |
| optional/format/regex.json | 8 | ✅ | 40.6M | ✅ | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.6M | ✅ | 36.2M | 🔴 **+36%** |
| optional/format/time.json | 46 | ✅ | 7.8M | ✅ | 7.9M | +1% |
| optional/format/unknown.json | 7 | ✅ | 47.5M | ✅ | 71.4M | 🔴 **+50%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.8M | ✅ | 12.3M | +13% |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ✅ | 20.1M | 🔴 **+23%** |
| optional/format/uri.json | 36 | ✅ | 7.9M | ✅ | 5.9M | 🟢 **-25%** |
| optional/format/uuid.json | 22 | ✅ | 14.1M | ✅ | 18.3M | 🔴 **+30%** |
| optional/id.json | 3 | ✅ | 19.4M | ✅ | 19.7M | +1% |
| optional/no-schema.json | 3 | ✅ | 39.3M | ✅ | 57.5M | 🔴 **+46%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.5M | ✅ | 19.3M | -10% |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 33.7M | ✅ | 55.1M | 🔴 **+64%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 28.0M | ✅ | 27.9M | 0% |
| allOf.json | 30 | ✅ | 32.0M | ✅ | 29.1M | -9% |
| anchor.json | 8 | ✅ | 31.9M | ✅ | 60.2M | 🔴 **+89%** |
| anyOf.json | 18 | ✅ | 35.0M | ✅ | 35.9M | +3% |
| boolean_schema.json | 18 | ✅ | 35.5M | ✅ | 55.0M | 🔴 **+55%** |
| const.json | 54 | ✅ | 22.5M | ✅ | 31.5M | 🔴 **+40%** |
| contains.json | 21 | ✅ | 23.4M | ✅ | 13.4M | 🟢 **-43%** |
| content.json | 18 | ✅ | 46.0M | ✅ | 75.0M | 🔴 **+63%** |
| default.json | 7 | ✅ | 39.7M | ✅ | 58.8M | 🔴 **+48%** |
| defs.json | 2 | ✅ | 3.5M | ✅ | 1.3M | 🟢 **-62%** |
| dependentRequired.json | 20 | ✅ | 34.2M | ✅ | 52.4M | 🔴 **+53%** |
| dependentSchemas.json | 20 | ✅ | 31.0M | ✅ | 47.5M | 🔴 **+53%** |
| dynamicRef.json | 4 | ✅ | 11.6M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 19.5M | ✅ | 33.5M | 🔴 **+71%** |
| exclusiveMaximum.json | 4 | ✅ | 38.1M | ✅ | 53.8M | 🔴 **+41%** |
| exclusiveMinimum.json | 4 | ✅ | 28.1M | ✅ | 54.6M | 🔴 **+95%** |
| format.json | 133 | ✅ | 45.7M | ✅ | 66.2M | 🔴 **+45%** |
| if-then-else.json | 26 | ✅ | 36.8M | ✅ | 53.3M | 🔴 **+45%** |
| infinite-loop-detection.json | 2 | ✅ | 32.3M | ✅ | 41.4M | 🔴 **+28%** |
| items.json | 29 | ✅ | 27.9M | ✅ | 34.6M | 🔴 **+24%** |
| maxContains.json | 12 | ✅ | 28.8M | ✅ | 45.4M | 🔴 **+58%** |
| maxItems.json | 6 | ✅ | 37.6M | ✅ | 61.6M | 🔴 **+64%** |
| maxLength.json | 7 | ✅ | 34.2M | ✅ | 56.2M | 🔴 **+65%** |
| maxProperties.json | 10 | ✅ | 29.7M | ✅ | 41.9M | 🔴 **+41%** |
| maximum.json | 8 | ✅ | 37.6M | ✅ | 60.6M | 🔴 **+61%** |
| minContains.json | 28 | ✅ | 29.8M | ✅ | 49.8M | 🔴 **+67%** |
| minItems.json | 6 | ✅ | 37.6M | ✅ | 60.1M | 🔴 **+60%** |
| minLength.json | 7 | ✅ | 32.5M | ✅ | 54.6M | 🔴 **+68%** |
| minProperties.json | 8 | ✅ | 30.9M | ✅ | 52.7M | 🔴 **+71%** |
| minimum.json | 11 | ✅ | 35.3M | ✅ | 65.0M | 🔴 **+84%** |
| multipleOf.json | 10 | ✅ | 35.9M | ✅ | 26.6M | 🟢 **-26%** |
| not.json | 40 | ✅ | 32.4M | ✅ | 51.7M | 🔴 **+59%** |
| oneOf.json | 27 | ✅ | 32.6M | ✅ | 31.7M | -3% |
| pattern.json | 9 | ✅ | 35.8M | ✅ | 54.3M | 🔴 **+52%** |
| patternProperties.json | 23 | ✅ | 19.1M | ✅ | 12.3M | 🟢 **-35%** |
| prefixItems.json | 11 | ✅ | 40.6M | ✅ | 65.1M | 🔴 **+60%** |
| properties.json | 21 | ✅ | 27.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.8M | ✅ | 37.7M | 🔴 **+23%** |
| ref.json | 71 | ✅ | 24.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.9M | ✅ | 40.6M | 🔴 **+35%** |
| required.json | 9 | ✅ | 38.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 33.0M | ✅ | 52.7M | 🔴 **+60%** |
| unevaluatedItems.json | 47 | ✅ | 24.9M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.8M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.0M | ✅ | 22.9M | +4% |
| vocabulary.json | 2 | ✅ | 37.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 23.0M | ✅ | 18.0M | 🟢 **-22%** |
| optional/bignum.json | 9 | ✅ | 36.9M | ✅ | 33.2M | -10% |
| optional/dependencies-compatibility.json | 36 | ✅ | 34.8M | ✅ | 47.5M | 🔴 **+37%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.7M | ✅ | 25.7M | 🔴 **+31%** |
| optional/format/date-time.json | 26 | ✅ | 19.7M | ✅ | 4.6M | 🟢 **-76%** |
| optional/format/date.json | 48 | ✅ | 9.2M | ✅ | 10.0M | +8% |
| optional/format/idn-email.json | 10 | ✅ | 18.5M | ✅ | 151K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 26.2M | ✅ | 38.3M | 🔴 **+46%** |
| optional/format/ipv6.json | 40 | ✅ | 12.6M | ✅ | 4.4M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ | 24.0M | ✅ | 31.0M | 🔴 **+29%** |
| optional/format/regex.json | 8 | ✅ | 41.8M | ✅ | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.6M | ✅ | 36.1M | 🔴 **+36%** |
| optional/format/time.json | 46 | ✅ | 7.8M | ✅ | 7.8M | +0% |
| optional/format/unknown.json | 7 | ✅ | 47.8M | ✅ | 72.2M | 🔴 **+51%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.9M | ✅ | 12.3M | +13% |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ✅ | 20.3M | 🔴 **+25%** |
| optional/format/uri.json | 36 | ✅ | 7.9M | ✅ | 5.9M | 🟢 **-25%** |
| optional/format/uuid.json | 22 | ✅ | 14.2M | ✅ | 18.1M | 🔴 **+27%** |
| optional/id.json | 3 | ✅ | 19.8M | ✅ | 19.6M | -1% |
| optional/no-schema.json | 3 | ✅ | 38.6M | ✅ | 64.0M | 🔴 **+66%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.3M | ✅ | 19.6M | -8% |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 32.3M | ✅ | 54.4M | 🔴 **+68%** |

