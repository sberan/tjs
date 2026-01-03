# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.2M | ⚠️ 31/38 | 707 | 11.7M | 🟢 **-52%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 24.8M | ⚠️ 46/49 | 1025 | 13.4M | 🟢 **-46%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 21.7M | ⚠️ 51/54 | 1221 | 12.1M | 🟢 **-44%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 19.2M | ⚠️ 62/69 | 1399 | 3.7M | 🟢 **-81%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.0M | ⚠️ 61/68 | 1394 | 5.9M | 🟢 **-72%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 21.5M | ⚠️ 251/278 | 5746 | 6.8M | 🟢 **-69%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 3.19x faster (46 ns vs 148 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 49.2M | ✅ | 21.1M | 🟢 **-57%** |
| additionalProperties.json | 16 | ✅ | 28.1M | ✅ | 18.1M | 🟢 **-36%** |
| allOf.json | 27 | ✅ | 44.5M | ✅ | 18.5M | 🟢 **-59%** |
| anyOf.json | 15 | ✅ | 48.5M | ✅ | 14.6M | 🟢 **-70%** |
| default.json | 7 | ✅ | 47.0M | ✅ | 47.0M | 0% |
| dependencies.json | 29 | ✅ | 27.9M | ✅ | 28.0M | +0% |
| enum.json | 49 | ✅ | 35.8M | ✅ | 19.8M | 🟢 **-45%** |
| format.json | 36 | ✅ | 49.0M | ✅ | 46.8M | -4% |
| infinite-loop-detection.json | 2 | ✅ | 35.5M | ✅ | 34.4M | -3% |
| items.json | 21 | ✅ | 27.3M | ✅ | 26.4M | -4% |
| maxItems.json | 4 | ✅ | 63.4M | ✅ | 48.9M | 🟢 **-23%** |
| maxLength.json | 5 | ✅ | 49.9M | ✅ | 47.4M | -5% |
| maxProperties.json | 8 | ✅ | 46.2M | ✅ | 39.2M | -15% |
| maximum.json | 8 | ✅ | 59.7M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 62.9M | ✅ | 49.4M | 🟢 **-22%** |
| minLength.json | 5 | ✅ | 49.3M | ✅ | 43.3M | -12% |
| minProperties.json | 6 | ✅ | 49.5M | ✅ | 42.2M | -15% |
| minimum.json | 11 | ✅ | 55.6M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 56.8M | ✅ | 22.9M | 🟢 **-60%** |
| not.json | 20 | ✅ | 57.8M | ✅ | 37.2M | 🟢 **-36%** |
| oneOf.json | 23 | ✅ | 47.6M | ✅ | 10.7M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 40.6M | ✅ | 40.9M | +1% |
| patternProperties.json | 18 | ✅ | 15.9M | ✅ | 7.5M | 🟢 **-53%** |
| properties.json | 17 | ✅ | 26.4M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 32.9M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.4M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 50.5M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 47.4M | ✅ | 37.5M | 🟢 **-21%** |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 17.2M | 🟢 **-29%** |
| optional/bignum.json | 7 | ✅ | 53.4M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 17.4M | ✅ | 17.1M | -2% |
| optional/format/date-time.json | 26 | ✅ | 22.8M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/email.json | 17 | ✅ | 16.8M | ✅ | 22.1M | 🔴 **+32%** |
| optional/format/ipv4.json | 16 | ✅ | 34.1M | ✅ | 30.5M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 55.0M | -16% |
| optional/format/uri.json | 36 | ✅ | 6.0M | ✅ | 4.2M | 🟢 **-30%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.7M | ✅ | 14.8M | 🟢 **-25%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 40.1M | ✅ | 34.3M | -14% |
| additionalProperties.json | 16 | ✅ | 25.8M | ✅ | 18.3M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 39.8M | ✅ | 19.5M | 🟢 **-51%** |
| anyOf.json | 18 | ✅ | 45.1M | ✅ | 13.8M | 🟢 **-69%** |
| boolean_schema.json | 18 | ✅ | 52.1M | ✅ | 45.0M | -14% |
| const.json | 54 | ✅ | 50.8M | ✅ | 20.8M | 🟢 **-59%** |
| contains.json | 19 | ✅ | 51.3M | ✅ | 8.4M | 🟢 **-84%** |
| default.json | 7 | ✅ | 42.0M | ✅ | 46.2M | +10% |
| definitions.json | 2 | ✅ | 13.4M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 28.8M | ✅ | 28.9M | +0% |
| enum.json | 45 | ✅ | 31.6M | ✅ | 23.4M | 🟢 **-26%** |
| exclusiveMaximum.json | 4 | ✅ | 56.3M | ✅ | 42.5M | 🟢 **-25%** |
| exclusiveMinimum.json | 4 | ✅ | 55.3M | ✅ | 41.8M | 🟢 **-24%** |
| format.json | 54 | ✅ | 44.0M | ✅ | 43.4M | -1% |
| infinite-loop-detection.json | 2 | ✅ | 34.8M | ✅ | 33.1M | -5% |
| items.json | 28 | ✅ | 27.1M | ✅ | 18.0M | 🟢 **-34%** |
| maxItems.json | 6 | ✅ | 47.4M | ✅ | 46.5M | -2% |
| maxLength.json | 7 | ✅ | 42.9M | ✅ | 44.3M | +3% |
| maxProperties.json | 10 | ✅ | 40.7M | ✅ | 37.2M | -9% |
| maximum.json | 8 | ✅ | 58.5M | ✅ | 48.7M | -17% |
| minItems.json | 6 | ✅ | 49.5M | ✅ | 48.6M | -2% |
| minLength.json | 7 | ✅ | 42.9M | ✅ | 43.5M | +1% |
| minProperties.json | 8 | ✅ | 41.7M | ✅ | 38.5M | -8% |
| minimum.json | 11 | ✅ | 64.4M | ✅ | 48.4M | 🟢 **-25%** |
| multipleOf.json | 10 | ✅ | 56.7M | ✅ | 23.2M | 🟢 **-59%** |
| not.json | 38 | ✅ | 52.0M | ✅ | 34.7M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 41.0M | ✅ | 18.6M | 🟢 **-55%** |
| pattern.json | 9 | ✅ | 37.4M | ✅ | 40.9M | +9% |
| patternProperties.json | 23 | ✅ | 15.7M | ✅ | 9.0M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 27.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.2M | ✅ | 14.0M | 🟢 **-54%** |
| ref.json | 65 | ✅ | 27.0M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 29.4M | ✅ | 23.1M | 🟢 **-21%** |
| required.json | 9 | ✅ | 52.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 45.8M | ✅ | 36.3M | 🟢 **-21%** |
| uniqueItems.json | 69 | ✅ | 23.7M | ✅ | 17.3M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 51.7M | ✅ | 30.5M | 🟢 **-41%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 17.3M | -3% |
| optional/format/date-time.json | 26 | ✅ | 21.1M | ✅ | 2.9M | 🟢 **-86%** |
| optional/format/email.json | 17 | ✅ | 15.9M | ✅ | 21.2M | 🔴 **+34%** |
| optional/format/ipv4.json | 16 | ✅ | 26.8M | ✅ | 30.5M | +14% |
| optional/format/ipv6.json | 40 | ✅ | 10.9M | ✅ | 2.8M | 🟢 **-74%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.3M | ✅ | 24.7M | +6% |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 54.3M | -16% |
| optional/format/uri-reference.json | 15 | ✅ | 8.9M | ✅ | 8.7M | -2% |
| optional/format/uri-template.json | 10 | ✅ | 14.4M | ✅ | 15.4M | +7% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ | 38.9M | ✅ | 7.3M | 🟢 **-81%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.7M | ✅ | 14.5M | 🟢 **-30%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 41.1M | ✅ | 39.5M | -4% |
| additionalProperties.json | 16 | ✅ | 27.2M | ✅ | 19.2M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 39.0M | ✅ | 19.2M | 🟢 **-51%** |
| anyOf.json | 18 | ✅ | 45.5M | ✅ | 13.7M | 🟢 **-70%** |
| boolean_schema.json | 18 | ✅ | 48.3M | ✅ | 43.3M | -10% |
| const.json | 54 | ✅ | 50.0M | ✅ | 20.8M | 🟢 **-58%** |
| contains.json | 21 | ✅ | 54.2M | ✅ | 15.8M | 🟢 **-71%** |
| default.json | 7 | ✅ | 42.2M | ✅ | 45.5M | +8% |
| definitions.json | 2 | ✅ | 13.2M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 28.2M | ✅ | 33.4M | +19% |
| enum.json | 45 | ✅ | 32.7M | ✅ | 23.5M | 🟢 **-28%** |
| exclusiveMaximum.json | 4 | ✅ | 64.7M | ✅ | 40.1M | 🟢 **-38%** |
| exclusiveMinimum.json | 4 | ✅ | 57.4M | ✅ | 42.2M | 🟢 **-27%** |
| format.json | 102 | ✅ | 44.3M | ✅ | 43.5M | -2% |
| if-then-else.json | 26 | ✅ | 53.4M | ✅ | 37.1M | 🟢 **-31%** |
| infinite-loop-detection.json | 2 | ✅ | 31.7M | ✅ | 33.1M | +5% |
| items.json | 28 | ✅ | 22.9M | ✅ | 17.9M | 🟢 **-22%** |
| maxItems.json | 6 | ✅ | 49.4M | ✅ | 48.0M | -3% |
| maxLength.json | 7 | ✅ | 42.6M | ✅ | 45.6M | +7% |
| maxProperties.json | 10 | ✅ | 41.7M | ✅ | 34.7M | -17% |
| maximum.json | 8 | ✅ | 59.6M | ✅ | 47.5M | 🟢 **-20%** |
| minItems.json | 6 | ✅ | 50.8M | ✅ | 47.4M | -7% |
| minLength.json | 7 | ✅ | 42.6M | ✅ | 44.0M | +3% |
| minProperties.json | 8 | ✅ | 42.0M | ✅ | 38.9M | -7% |
| minimum.json | 11 | ✅ | 59.9M | ✅ | 48.8M | -18% |
| multipleOf.json | 10 | ✅ | 56.8M | ✅ | 23.5M | 🟢 **-59%** |
| not.json | 38 | ✅ | 51.8M | ✅ | 37.4M | 🟢 **-28%** |
| oneOf.json | 27 | ✅ | 40.8M | ✅ | 10.8M | 🟢 **-74%** |
| pattern.json | 9 | ✅ | 38.3M | ✅ | 40.0M | +5% |
| patternProperties.json | 23 | ✅ | 15.1M | ✅ | 9.2M | 🟢 **-39%** |
| properties.json | 21 | ✅ | 26.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.2M | ✅ | 25.6M | -15% |
| ref.json | 73 | ✅ | 23.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 30.2M | ✅ | 15.2M | 🟢 **-50%** |
| required.json | 9 | ✅ | 52.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 53.3M | ✅ | 36.3M | 🟢 **-32%** |
| uniqueItems.json | 69 | ✅ | 23.6M | ✅ | 17.4M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 49.8M | ✅ | 29.9M | 🟢 **-40%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 17.0M | +2% |
| optional/format/date-time.json | 26 | ✅ | 21.5M | ✅ | 3.0M | 🟢 **-86%** |
| optional/format/date.json | 48 | ✅ | 8.7M | ✅ | 8.3M | -5% |
| optional/format/email.json | 17 | ✅ | 16.6M | ✅ | 20.6M | 🔴 **+24%** |
| optional/format/ipv4.json | 16 | ✅ | 31.9M | ✅ | 30.6M | -4% |
| optional/format/ipv6.json | 40 | ✅ | 11.1M | ✅ | 2.8M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.9M | ✅ | 24.4M | +2% |
| optional/format/regex.json | 8 | ✅ | 57.0M | ✅ | 861K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 32.3M | ✅ | 29.6M | -8% |
| optional/format/time.json | 46 | ✅ | 6.2M | ✅ | 5.6M | -10% |
| optional/format/unknown.json | 7 | ✅ | 65.5M | ✅ | 55.1M | -16% |
| optional/format/uri-reference.json | 15 | ✅ | 8.9M | ✅ | 8.8M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 14.4M | ✅ | 15.2M | +5% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ | 42.8M | ✅ | 21.1M | 🟢 **-51%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.2M | ✅ | 14.5M | 🟢 **-28%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 39.3M | ✅ | 33.8M | -14% |
| additionalProperties.json | 21 | ✅ | 25.1M | ✅ | 18.3M | 🟢 **-27%** |
| allOf.json | 30 | ✅ | 41.3M | ✅ | 11.7M | 🟢 **-72%** |
| anchor.json | 8 | ✅ | 44.0M | ✅ | 44.2M | +1% |
| anyOf.json | 18 | ✅ | 49.8M | ✅ | 12.7M | 🟢 **-74%** |
| boolean_schema.json | 18 | ✅ | 48.7M | ✅ | 44.9M | -8% |
| const.json | 54 | ✅ | 51.7M | ✅ | 21.2M | 🟢 **-59%** |
| contains.json | 21 | ✅ | 53.1M | ✅ | 16.0M | 🟢 **-70%** |
| content.json | 18 | ✅ | 64.1M | ✅ | 41.3M | 🟢 **-36%** |
| default.json | 7 | ✅ | 44.3M | ✅ | 47.5M | +7% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 756K | 🟢 **-59%** |
| dependentRequired.json | 20 | ✅ | 40.2M | ✅ | 41.0M | +2% |
| dependentSchemas.json | 20 | ✅ | 41.4M | ✅ | 36.1M | -13% |
| enum.json | 45 | ✅ | 30.6M | ✅ | 21.7M | 🟢 **-29%** |
| exclusiveMaximum.json | 4 | ✅ | 54.1M | ✅ | 43.5M | -20% |
| exclusiveMinimum.json | 4 | ✅ | 53.9M | ✅ | 43.0M | 🟢 **-20%** |
| format.json | 114 | ✅ | 67.7M | ✅ | 43.2M | 🟢 **-36%** |
| if-then-else.json | 26 | ✅ | 53.1M | ✅ | 36.4M | 🟢 **-31%** |
| infinite-loop-detection.json | 2 | ✅ | 18.8M | ✅ | 34.6M | 🔴 **+84%** |
| items.json | 28 | ✅ | 24.5M | ✅ | 19.4M | 🟢 **-21%** |
| maxContains.json | 12 | ✅ | 52.8M | ✅ | 32.8M | 🟢 **-38%** |
| maxItems.json | 6 | ✅ | 50.7M | ✅ | 48.8M | -4% |
| maxLength.json | 7 | ✅ | 42.8M | ✅ | 45.6M | +7% |
| maxProperties.json | 10 | ✅ | 41.7M | ✅ | 37.3M | -11% |
| maximum.json | 8 | ✅ | 64.1M | ✅ | 51.6M | -20% |
| minContains.json | 28 | ✅ | 53.8M | ✅ | 25.1M | 🟢 **-53%** |
| minItems.json | 6 | ✅ | 42.4M | ✅ | 44.3M | +5% |
| minLength.json | 7 | ✅ | 42.8M | ✅ | 43.3M | +1% |
| minProperties.json | 8 | ✅ | 41.3M | ✅ | 39.4M | -5% |
| minimum.json | 11 | ✅ | 59.7M | ✅ | 48.8M | -18% |
| multipleOf.json | 10 | ✅ | 56.8M | ✅ | 22.4M | 🟢 **-61%** |
| not.json | 40 | ✅ | 48.5M | ✅ | 35.5M | 🟢 **-27%** |
| oneOf.json | 27 | ✅ | 36.6M | ✅ | 10.8M | 🟢 **-70%** |
| pattern.json | 9 | ✅ | 37.7M | ✅ | 41.0M | +9% |
| patternProperties.json | 23 | ✅ | 15.1M | ✅ | 7.2M | 🟢 **-52%** |
| properties.json | 21 | ✅ | 26.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.2M | ✅ | 15.0M | 🟢 **-50%** |
| recursiveRef.json | 31 | ✅ | 5.4M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.0M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 31.8M | ✅ | 16.5M | 🟢 **-48%** |
| required.json | 9 | ✅ | 51.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 44.4M | ✅ | 34.4M | 🟢 **-22%** |
| unevaluatedItems.json | 51 | ✅ | 15.2M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 10.4M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.4M | ✅ | 17.9M | 🟢 **-23%** |
| vocabulary.json | 2 | ✅ | 60.3M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 50.5M | ✅ | 13.2M | 🟢 **-74%** |
| optional/bignum.json | 9 | ✅ | 51.8M | ✅ | 30.1M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 38.8M | ✅ | 34.2M | -12% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 16.1M | -3% |
| optional/format/date-time.json | 26 | ✅ | 22.0M | ✅ | 3.0M | 🟢 **-86%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 8.0M | -6% |
| optional/format/email.json | 17 | ✅ | 16.2M | ✅ | 22.0M | 🔴 **+36%** |
| optional/format/idn-email.json | 10 | ✅ | 15.8M | ✅ | 38K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 31.7M | ✅ | 30.4M | -4% |
| optional/format/ipv6.json | 40 | ✅ | 11.2M | ✅ | 2.8M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.9M | ✅ | 25.3M | +6% |
| optional/format/regex.json | 8 | ✅ | 55.8M | ✅ | 841K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 30.0M | ✅ | 30.2M | +1% |
| optional/format/time.json | 46 | ✅ | 6.1M | ✅ | 5.5M | -10% |
| optional/format/unknown.json | 7 | ✅ | 51.3M | ✅ | 52.9M | +3% |
| optional/format/uri-reference.json | 15 | ✅ | 8.7M | ✅ | 9.0M | +3% |
| optional/format/uri-template.json | 10 | ✅ | 15.6M | ✅ | 15.1M | -3% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.4M | 🟢 **-31%** |
| optional/format/uuid.json | 22 | ✅ | 13.4M | ✅ | 15.1M | +13% |
| optional/id.json | 3 | ✅ | 32.8M | ✅ | 14.0M | 🟢 **-57%** |
| optional/no-schema.json | 3 | ✅ | 44.6M | ✅ | 43.5M | -2% |
| optional/non-bmp-regex.json | 12 | ✅ | 18.8M | ✅ | 12.5M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 44.8M | ✅ | 39.6M | -12% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 24.8M | ✅ | 13.3M | 🟢 **-47%** |
| allOf.json | 30 | ✅ | 39.6M | ✅ | 18.9M | 🟢 **-52%** |
| anchor.json | 8 | ✅ | 46.4M | ✅ | 43.9M | -5% |
| anyOf.json | 18 | ✅ | 53.8M | ✅ | 12.4M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 48.9M | ✅ | 40.5M | -17% |
| const.json | 54 | ✅ | 51.5M | ✅ | 21.0M | 🟢 **-59%** |
| contains.json | 21 | ✅ | 50.8M | ✅ | 15.6M | 🟢 **-69%** |
| content.json | 18 | ✅ | 63.2M | ✅ | 44.7M | 🟢 **-29%** |
| default.json | 7 | ✅ | 46.7M | ✅ | 46.1M | -1% |
| defs.json | 2 | ✅ | 2.2M | ✅ | 849K | 🟢 **-61%** |
| dependentRequired.json | 20 | ✅ | 36.0M | ✅ | 40.2M | +12% |
| dependentSchemas.json | 20 | ✅ | 38.0M | ✅ | 33.7M | -11% |
| dynamicRef.json | 4 | ✅ | 8.7M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 35.2M | ✅ | 23.5M | 🟢 **-33%** |
| exclusiveMaximum.json | 4 | ✅ | 57.6M | ✅ | 43.9M | 🟢 **-24%** |
| exclusiveMinimum.json | 4 | ✅ | 55.7M | ✅ | 42.0M | 🟢 **-25%** |
| format.json | 133 | ✅ | 63.7M | ✅ | 39.0M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 50.7M | ✅ | 35.4M | 🟢 **-30%** |
| infinite-loop-detection.json | 2 | ✅ | 19.2M | ✅ | 34.6M | 🔴 **+80%** |
| items.json | 29 | ✅ | 25.4M | ✅ | 15.4M | 🟢 **-39%** |
| maxContains.json | 12 | ✅ | 45.5M | ✅ | 33.3M | 🟢 **-27%** |
| maxItems.json | 6 | ✅ | 50.2M | ✅ | 48.4M | -4% |
| maxLength.json | 7 | ✅ | 42.8M | ✅ | 45.3M | +6% |
| maxProperties.json | 10 | ✅ | 41.0M | ✅ | 37.3M | -9% |
| maximum.json | 8 | ✅ | 59.3M | ✅ | 48.3M | -19% |
| minContains.json | 28 | ✅ | 53.3M | ✅ | 24.7M | 🟢 **-54%** |
| minItems.json | 6 | ✅ | 49.6M | ✅ | 48.0M | -3% |
| minLength.json | 7 | ✅ | 38.3M | ✅ | 43.6M | +14% |
| minProperties.json | 8 | ✅ | 42.4M | ✅ | 39.2M | -8% |
| minimum.json | 11 | ✅ | 58.7M | ✅ | 48.6M | -17% |
| multipleOf.json | 10 | ✅ | 56.7M | ✅ | 22.8M | 🟢 **-60%** |
| not.json | 40 | ✅ | 49.8M | ✅ | 34.8M | 🟢 **-30%** |
| oneOf.json | 27 | ✅ | 47.2M | ✅ | 11.1M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 38.7M | ✅ | 41.6M | +7% |
| patternProperties.json | 23 | ✅ | 15.0M | ✅ | 7.2M | 🟢 **-52%** |
| prefixItems.json | 11 | ✅ | 49.3M | ✅ | 49.9M | +1% |
| properties.json | 21 | ✅ | 26.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.3M | ✅ | 25.9M | -14% |
| ref.json | 71 | ✅ | 22.3M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 28.2M | ✅ | 16.6M | 🟢 **-41%** |
| required.json | 9 | ✅ | 52.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 44.1M | ✅ | 35.2M | 🟢 **-20%** |
| unevaluatedItems.json | 47 | ✅ | 21.5M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 10.2M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.7M | ✅ | 16.9M | 🟢 **-31%** |
| vocabulary.json | 2 | ✅ | 60.4M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 50.6M | ✅ | 13.2M | 🟢 **-74%** |
| optional/bignum.json | 9 | ✅ | 51.4M | ✅ | 30.6M | 🟢 **-40%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 37.3M | ✅ | 31.8M | -15% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.4M | ✅ | 17.2M | -1% |
| optional/format/date-time.json | 26 | ✅ | 21.6M | ✅ | 3.0M | 🟢 **-86%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 8.1M | -5% |
| optional/format/idn-email.json | 10 | ✅ | 16.1M | ✅ | 79K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 31.8M | ✅ | 31.0M | -3% |
| optional/format/ipv6.json | 40 | ✅ | 11.1M | ✅ | 2.8M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.8M | ✅ | 25.3M | +6% |
| optional/format/regex.json | 8 | ✅ | 52.5M | ✅ | 857K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 30.2M | ✅ | 28.8M | -4% |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.6M | -11% |
| optional/format/unknown.json | 7 | ✅ | 65.1M | ✅ | 55.3M | -15% |
| optional/format/uri-reference.json | 15 | ✅ | 9.0M | ✅ | 9.2M | +1% |
| optional/format/uri-template.json | 10 | ✅ | 14.2M | ✅ | 15.2M | +7% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.4M | 🟢 **-31%** |
| optional/format/uuid.json | 22 | ✅ | 13.5M | ✅ | 15.0M | +12% |
| optional/id.json | 3 | ✅ | 32.3M | ✅ | 14.0M | 🟢 **-57%** |
| optional/no-schema.json | 3 | ✅ | 49.1M | ✅ | 46.1M | -6% |
| optional/non-bmp-regex.json | 12 | ✅ | 21.5M | ✅ | 11.1M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 41.9M | ✅ | 41.2M | -2% |

