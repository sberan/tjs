# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 23.7M | ⚠️ 31/38 | 707 | 11.0M | 🟢 **-53%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 26.0M | ⚠️ 46/49 | 1025 | 12.8M | 🟢 **-51%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.0M | ⚠️ 51/54 | 1221 | 11.7M | 🟢 **-47%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.1M | ⚠️ 62/69 | 1399 | 5.2M | 🟢 **-74%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.5M | ⚠️ 61/68 | 1394 | 5.8M | 🟢 **-73%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 22.1M | ⚠️ 251/278 | 5746 | 7.6M | 🟢 **-66%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.99x faster (45 ns vs 135 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 56.3M | ✅ | 21.7M | 🟢 **-61%** |
| additionalProperties.json | 16 | ✅ | 28.9M | ✅ | 15.5M | 🟢 **-46%** |
| allOf.json | 27 | ✅ | 41.4M | ✅ | 10.1M | 🟢 **-76%** |
| anyOf.json | 15 | ✅ | 51.8M | ✅ | 14.0M | 🟢 **-73%** |
| default.json | 7 | ✅ | 45.9M | ✅ | 45.9M | 0% |
| dependencies.json | 29 | ✅ | 25.2M | ✅ | 28.4M | +13% |
| enum.json | 49 | ✅ | 36.4M | ✅ | 20.3M | 🟢 **-44%** |
| format.json | 36 | ✅ | 47.3M | ✅ | 45.4M | -4% |
| infinite-loop-detection.json | 2 | ✅ | 35.5M | ✅ | 33.9M | -5% |
| items.json | 21 | ✅ | 20.9M | ✅ | 16.2M | 🟢 **-23%** |
| maxItems.json | 4 | ✅ | 57.5M | ✅ | 48.7M | -15% |
| maxLength.json | 5 | ✅ | 49.8M | ✅ | 47.1M | -6% |
| maxProperties.json | 8 | ✅ | 45.5M | ✅ | 36.2M | 🟢 **-21%** |
| maximum.json | 8 | ✅ | 59.1M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 63.1M | ✅ | 47.6M | 🟢 **-25%** |
| minLength.json | 5 | ✅ | 48.7M | ✅ | 42.9M | -12% |
| minProperties.json | 6 | ✅ | 48.5M | ✅ | 42.0M | -13% |
| minimum.json | 11 | ✅ | 59.8M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 55.7M | ✅ | 23.5M | 🟢 **-58%** |
| not.json | 20 | ✅ | 58.9M | ✅ | 37.5M | 🟢 **-36%** |
| oneOf.json | 23 | ✅ | 48.6M | ✅ | 10.2M | 🟢 **-79%** |
| pattern.json | 9 | ✅ | 37.6M | ✅ | 37.8M | +1% |
| patternProperties.json | 18 | ✅ | 14.8M | ✅ | 7.8M | 🟢 **-48%** |
| properties.json | 17 | ✅ | 25.9M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 29.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 38.3M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 48.5M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 54.2M | ✅ | 32.1M | 🟢 **-41%** |
| uniqueItems.json | 69 | ✅ | 22.2M | ✅ | 13.9M | 🟢 **-38%** |
| optional/bignum.json | 7 | ✅ | 53.1M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 15.8M | ✅ | 15.7M | -1% |
| optional/format/date-time.json | 26 | ✅ | 24.8M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 17.8M | ✅ | 22.5M | 🔴 **+27%** |
| optional/format/ipv4.json | 16 | ✅ | 37.4M | ✅ | 30.4M | -19% |
| optional/format/ipv6.json | 40 | ✅ | 11.4M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 53.0M | -19% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-30%** |
| optional/non-bmp-regex.json | 12 | ✅ | 18.5M | ✅ | 13.0M | 🟢 **-30%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 53.9M | ✅ | 20.3M | 🟢 **-62%** |
| additionalProperties.json | 16 | ✅ | 30.0M | ✅ | 18.7M | 🟢 **-38%** |
| allOf.json | 30 | ✅ | 44.0M | ✅ | 11.6M | 🟢 **-74%** |
| anyOf.json | 18 | ✅ | 54.1M | ✅ | 13.0M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 64.1M | ✅ | 45.3M | 🟢 **-29%** |
| const.json | 54 | ✅ | 53.8M | ✅ | 18.6M | 🟢 **-66%** |
| contains.json | 19 | ✅ | 49.6M | ✅ | 8.2M | 🟢 **-83%** |
| default.json | 7 | ✅ | 46.1M | ✅ | 44.4M | -4% |
| definitions.json | 2 | ✅ | 13.2M | ✅ | 1.4M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 30.6M | ✅ | 30.5M | 0% |
| enum.json | 45 | ✅ | 35.6M | ✅ | 21.0M | 🟢 **-41%** |
| exclusiveMaximum.json | 4 | ✅ | 60.3M | ✅ | 44.2M | 🟢 **-27%** |
| exclusiveMinimum.json | 4 | ✅ | 62.4M | ✅ | 40.7M | 🟢 **-35%** |
| format.json | 54 | ✅ | 45.8M | ✅ | 44.4M | -3% |
| infinite-loop-detection.json | 2 | ✅ | 38.7M | ✅ | 34.3M | -11% |
| items.json | 28 | ✅ | 25.4M | ✅ | 18.6M | 🟢 **-27%** |
| maxItems.json | 6 | ✅ | 59.2M | ✅ | 46.8M | 🟢 **-21%** |
| maxLength.json | 7 | ✅ | 50.5M | ✅ | 45.2M | -10% |
| maxProperties.json | 10 | ✅ | 45.9M | ✅ | 37.7M | -18% |
| maximum.json | 8 | ✅ | 60.8M | ✅ | 48.9M | -19% |
| minItems.json | 6 | ✅ | 52.6M | ✅ | 48.8M | -7% |
| minLength.json | 7 | ✅ | 50.5M | ✅ | 41.2M | -18% |
| minProperties.json | 8 | ✅ | 47.5M | ✅ | 38.5M | -19% |
| minimum.json | 11 | ✅ | 61.7M | ✅ | 48.9M | 🟢 **-21%** |
| multipleOf.json | 10 | ✅ | 58.1M | ✅ | 22.4M | 🟢 **-61%** |
| not.json | 38 | ✅ | 60.3M | ✅ | 38.8M | 🟢 **-36%** |
| oneOf.json | 27 | ✅ | 43.3M | ✅ | 10.7M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 40.5M | ✅ | 39.0M | -4% |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 9.2M | 🟢 **-42%** |
| properties.json | 21 | ✅ | 26.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.8M | ✅ | 14.1M | 🟢 **-53%** |
| ref.json | 65 | ✅ | 22.8M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 29.9M | ✅ | 16.5M | 🟢 **-45%** |
| required.json | 9 | ✅ | 51.3M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 63.1M | ✅ | 36.6M | 🟢 **-42%** |
| uniqueItems.json | 69 | ✅ | 24.1M | ✅ | 17.5M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 57.3M | ✅ | 30.1M | 🟢 **-47%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 16.5M | +1% |
| optional/format/date-time.json | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 21.8M | +20% |
| optional/format/ipv4.json | 16 | ✅ | 32.2M | ✅ | 29.6M | -8% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.1M | ✅ | 25.1M | -17% |
| optional/format/unknown.json | 7 | ✅ | 59.6M | ✅ | 54.7M | -8% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.0M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.6M | ✅ | 15.2M | -2% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ | 40.0M | ✅ | 9.4M | 🟢 **-76%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.9M | ✅ | 13.2M | 🟢 **-42%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 26.2M | ✅ | 41.4M | 🔴 **+58%** |
| additionalProperties.json | 16 | ✅ | 25.1M | ✅ | 18.0M | 🟢 **-28%** |
| allOf.json | 30 | ✅ | 41.4M | ✅ | 11.4M | 🟢 **-72%** |
| anyOf.json | 18 | ✅ | 51.7M | ✅ | 13.0M | 🟢 **-75%** |
| boolean_schema.json | 18 | ✅ | 60.8M | ✅ | 45.1M | 🟢 **-26%** |
| const.json | 54 | ✅ | 49.7M | ✅ | 18.6M | 🟢 **-63%** |
| contains.json | 21 | ✅ | 52.1M | ✅ | 15.4M | 🟢 **-70%** |
| default.json | 7 | ✅ | 45.3M | ✅ | 47.5M | +5% |
| definitions.json | 2 | ✅ | 13.1M | ✅ | 1.4M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 28.9M | ✅ | 30.2M | +5% |
| enum.json | 45 | ✅ | 35.4M | ✅ | 20.2M | 🟢 **-43%** |
| exclusiveMaximum.json | 4 | ✅ | 51.8M | ✅ | 43.6M | -16% |
| exclusiveMinimum.json | 4 | ✅ | 59.5M | ✅ | 41.0M | 🟢 **-31%** |
| format.json | 102 | ✅ | 43.9M | ✅ | 42.7M | -3% |
| if-then-else.json | 26 | ✅ | 52.1M | ✅ | 34.6M | 🟢 **-34%** |
| infinite-loop-detection.json | 2 | ✅ | 34.8M | ✅ | 34.6M | -1% |
| items.json | 28 | ✅ | 26.9M | ✅ | 15.9M | 🟢 **-41%** |
| maxItems.json | 6 | ✅ | 56.7M | ✅ | 48.8M | -14% |
| maxLength.json | 7 | ✅ | 48.2M | ✅ | 44.5M | -8% |
| maxProperties.json | 10 | ✅ | 42.8M | ✅ | 36.5M | -15% |
| maximum.json | 8 | ✅ | 55.1M | ✅ | 48.1M | -13% |
| minItems.json | 6 | ✅ | 55.7M | ✅ | 45.3M | -19% |
| minLength.json | 7 | ✅ | 47.3M | ✅ | 42.9M | -9% |
| minProperties.json | 8 | ✅ | 44.9M | ✅ | 36.7M | -18% |
| minimum.json | 11 | ✅ | 57.5M | ✅ | 46.2M | -20% |
| multipleOf.json | 10 | ✅ | 54.2M | ✅ | 23.8M | 🟢 **-56%** |
| not.json | 38 | ✅ | 52.0M | ✅ | 34.4M | 🟢 **-34%** |
| oneOf.json | 27 | ✅ | 45.7M | ✅ | 10.1M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 45.2M | ✅ | 38.9M | -14% |
| patternProperties.json | 23 | ✅ | 15.3M | ✅ | 9.4M | 🟢 **-38%** |
| properties.json | 21 | ✅ | 26.6M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.4M | ✅ | 13.9M | 🟢 **-51%** |
| ref.json | 73 | ✅ | 21.4M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 27.5M | ✅ | 15.6M | 🟢 **-43%** |
| required.json | 9 | ✅ | 52.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 57.6M | ✅ | 36.7M | 🟢 **-36%** |
| uniqueItems.json | 69 | ✅ | 22.7M | ✅ | 17.0M | 🟢 **-25%** |
| optional/bignum.json | 9 | ✅ | 55.6M | ✅ | 30.8M | 🟢 **-45%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.1M | ✅ | 17.0M | -1% |
| optional/format/date-time.json | 26 | ✅ | 24.2M | ✅ | 2.8M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.2M | ✅ | 7.9M | -4% |
| optional/format/email.json | 17 | ✅ | 17.7M | ✅ | 22.5M | 🔴 **+27%** |
| optional/format/ipv4.json | 16 | ✅ | 37.0M | ✅ | 30.8M | -17% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.5M | ✅ | 25.3M | -11% |
| optional/format/regex.json | 8 | ✅ | 56.3M | ✅ | 906K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 31.6M | ✅ | 29.8M | -6% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.5M | -15% |
| optional/format/unknown.json | 7 | ✅ | 64.5M | ✅ | 55.1M | -15% |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 8.8M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.3M | ✅ | 15.4M | +1% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 40.8M | ✅ | 21.6M | 🟢 **-47%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.7M | ✅ | 13.0M | 🟢 **-40%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 52.6M | ✅ | 37.4M | 🟢 **-29%** |
| additionalProperties.json | 21 | ✅ | 24.6M | ✅ | 14.8M | 🟢 **-40%** |
| allOf.json | 30 | ✅ | 45.6M | ✅ | 18.9M | 🟢 **-59%** |
| anchor.json | 8 | ✅ | 48.3M | ✅ | 44.4M | -8% |
| anyOf.json | 18 | ✅ | 50.2M | ✅ | 12.2M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 64.9M | ✅ | 44.4M | 🟢 **-32%** |
| const.json | 54 | ✅ | 51.6M | ✅ | 18.0M | 🟢 **-65%** |
| contains.json | 21 | ✅ | 51.8M | ✅ | 8.8M | 🟢 **-83%** |
| content.json | 18 | ✅ | 63.6M | ✅ | 39.7M | 🟢 **-38%** |
| default.json | 7 | ✅ | 48.9M | ✅ | 46.6M | -5% |
| defs.json | 2 | ✅ | 1.8M | ✅ | 730K | 🟢 **-60%** |
| dependentRequired.json | 20 | ✅ | 41.3M | ✅ | 39.3M | -5% |
| dependentSchemas.json | 20 | ✅ | 43.1M | ✅ | 36.0M | -16% |
| enum.json | 45 | ✅ | 35.5M | ✅ | 19.7M | 🟢 **-44%** |
| exclusiveMaximum.json | 4 | ✅ | 55.2M | ✅ | 43.8M | 🟢 **-21%** |
| exclusiveMinimum.json | 4 | ✅ | 59.8M | ✅ | 42.8M | 🟢 **-28%** |
| format.json | 114 | ✅ | 65.1M | ✅ | 39.6M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 62.5M | ✅ | 34.4M | 🟢 **-45%** |
| infinite-loop-detection.json | 2 | ✅ | 36.2M | ✅ | 34.7M | -4% |
| items.json | 28 | ✅ | 25.0M | ✅ | 16.4M | 🟢 **-34%** |
| maxContains.json | 12 | ✅ | 55.5M | ✅ | 34.9M | 🟢 **-37%** |
| maxItems.json | 6 | ✅ | 59.6M | ✅ | 48.9M | -18% |
| maxLength.json | 7 | ✅ | 49.7M | ✅ | 44.9M | -10% |
| maxProperties.json | 10 | ✅ | 45.6M | ✅ | 37.5M | -18% |
| maximum.json | 8 | ✅ | 61.5M | ✅ | 48.9M | 🟢 **-20%** |
| minContains.json | 28 | ✅ | 62.3M | ✅ | 25.0M | 🟢 **-60%** |
| minItems.json | 6 | ✅ | 59.3M | ✅ | 47.6M | -20% |
| minLength.json | 7 | ✅ | 50.6M | ✅ | 43.7M | -14% |
| minProperties.json | 8 | ✅ | 47.9M | ✅ | 39.8M | -17% |
| minimum.json | 11 | ✅ | 61.5M | ✅ | 49.2M | -20% |
| multipleOf.json | 10 | ✅ | 58.5M | ✅ | 23.4M | 🟢 **-60%** |
| not.json | 40 | ✅ | 57.5M | ✅ | 36.4M | 🟢 **-37%** |
| oneOf.json | 27 | ✅ | 39.1M | ✅ | 10.3M | 🟢 **-74%** |
| pattern.json | 9 | ✅ | 37.8M | ✅ | 38.1M | +1% |
| patternProperties.json | 23 | ✅ | 15.5M | ✅ | 7.4M | 🟢 **-53%** |
| properties.json | 21 | ✅ | 25.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 25.5M | ✅ | 13.7M | 🟢 **-46%** |
| recursiveRef.json | 31 | ✅ | 5.7M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 15.9M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 32.6M | ✅ | 15.8M | 🟢 **-52%** |
| required.json | 9 | ✅ | 52.0M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 60.0M | ✅ | 34.7M | 🟢 **-42%** |
| unevaluatedItems.json | 51 | ✅ | 12.2M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 11.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.9M | ✅ | 16.6M | 🟢 **-28%** |
| vocabulary.json | 2 | ✅ | 62.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.2M | ✅ | 10.8M | 🟢 **-79%** |
| optional/bignum.json | 9 | ✅ | 53.7M | ✅ | 31.4M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 41.4M | ✅ | 34.6M | -16% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.6M | ✅ | 16.8M | -5% |
| optional/format/date-time.json | 26 | ✅ | 23.8M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 8.1M | -6% |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 22.3M | 🔴 **+22%** |
| optional/format/idn-email.json | 10 | ✅ | 16.5M | ✅ | 64K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 34.8M | ✅ | 31.0M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.6M | ✅ | 23.7M | -17% |
| optional/format/regex.json | 8 | ✅ | 60.1M | ✅ | 847K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.9M | ✅ | 29.9M | -19% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.6M | -13% |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 55.3M | -17% |
| optional/format/uri-reference.json | 15 | ✅ | 9.0M | ✅ | 9.0M | +1% |
| optional/format/uri-template.json | 10 | ✅ | 16.6M | ✅ | 15.2M | -9% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/format/uuid.json | 22 | ✅ | 15.0M | ✅ | 14.9M | 0% |
| optional/id.json | 3 | ✅ | 34.0M | ✅ | 13.7M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 54.9M | ✅ | 44.5M | -19% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.6M | ✅ | 11.7M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.6M | ✅ | 41.2M | -5% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 19.4M | ✅ | 12.5M | 🟢 **-36%** |
| allOf.json | 30 | ✅ | 44.4M | ✅ | 11.3M | 🟢 **-74%** |
| anchor.json | 8 | ✅ | 51.0M | ✅ | 40.6M | 🟢 **-20%** |
| anyOf.json | 18 | ✅ | 48.4M | ✅ | 12.7M | 🟢 **-74%** |
| boolean_schema.json | 18 | ✅ | 61.0M | ✅ | 45.5M | 🟢 **-25%** |
| const.json | 54 | ✅ | 47.1M | ✅ | 18.5M | 🟢 **-61%** |
| contains.json | 21 | ✅ | 52.3M | ✅ | 15.4M | 🟢 **-71%** |
| content.json | 18 | ✅ | 63.8M | ✅ | 42.1M | 🟢 **-34%** |
| default.json | 7 | ✅ | 46.1M | ✅ | 47.2M | +2% |
| defs.json | 2 | ✅ | 2.2M | ✅ | 754K | 🟢 **-65%** |
| dependentRequired.json | 20 | ✅ | 38.7M | ✅ | 40.3M | +4% |
| dependentSchemas.json | 20 | ✅ | 41.5M | ✅ | 35.8M | -14% |
| dynamicRef.json | 4 | ✅ | 8.5M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 34.8M | ✅ | 24.4M | 🟢 **-30%** |
| exclusiveMaximum.json | 4 | ✅ | 52.2M | ✅ | 41.5M | 🟢 **-20%** |
| exclusiveMinimum.json | 4 | ✅ | 53.5M | ✅ | 42.9M | -20% |
| format.json | 133 | ✅ | 64.7M | ✅ | 40.2M | 🟢 **-38%** |
| if-then-else.json | 26 | ✅ | 52.9M | ✅ | 37.4M | 🟢 **-29%** |
| infinite-loop-detection.json | 2 | ✅ | 36.5M | ✅ | 34.4M | -6% |
| items.json | 29 | ✅ | 24.9M | ✅ | 15.8M | 🟢 **-37%** |
| maxContains.json | 12 | ✅ | 55.9M | ✅ | 35.0M | 🟢 **-37%** |
| maxItems.json | 6 | ✅ | 56.7M | ✅ | 48.7M | -14% |
| maxLength.json | 7 | ✅ | 46.5M | ✅ | 45.3M | -3% |
| maxProperties.json | 10 | ✅ | 43.0M | ✅ | 37.4M | -13% |
| maximum.json | 8 | ✅ | 57.4M | ✅ | 48.5M | -16% |
| minContains.json | 28 | ✅ | 61.2M | ✅ | 25.6M | 🟢 **-58%** |
| minItems.json | 6 | ✅ | 57.0M | ✅ | 49.1M | -14% |
| minLength.json | 7 | ✅ | 44.0M | ✅ | 42.8M | -3% |
| minProperties.json | 8 | ✅ | 43.6M | ✅ | 40.1M | -8% |
| minimum.json | 11 | ✅ | 58.2M | ✅ | 49.3M | -15% |
| multipleOf.json | 10 | ✅ | 53.7M | ✅ | 23.7M | 🟢 **-56%** |
| not.json | 40 | ✅ | 53.4M | ✅ | 36.9M | 🟢 **-31%** |
| oneOf.json | 27 | ✅ | 45.2M | ✅ | 10.5M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 39.6M | ✅ | 38.7M | -2% |
| patternProperties.json | 23 | ✅ | 14.2M | ✅ | 6.0M | 🟢 **-58%** |
| prefixItems.json | 11 | ✅ | 54.0M | ✅ | 50.1M | -7% |
| properties.json | 21 | ✅ | 25.2M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.0M | ✅ | 14.6M | 🟢 **-50%** |
| ref.json | 71 | ✅ | 18.0M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.6M | ✅ | 17.1M | 🟢 **-42%** |
| required.json | 9 | ✅ | 50.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 54.0M | ✅ | 33.0M | 🟢 **-39%** |
| unevaluatedItems.json | 47 | ✅ | 15.7M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.9M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.4M | ✅ | 14.7M | 🟢 **-42%** |
| vocabulary.json | 2 | ✅ | 57.8M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 42.4M | ✅ | 11.6M | 🟢 **-73%** |
| optional/bignum.json | 9 | ✅ | 51.0M | ✅ | 30.5M | 🟢 **-40%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 38.5M | ✅ | 34.8M | -10% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 17.2M | +5% |
| optional/format/date-time.json | 26 | ✅ | 24.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.1M | ✅ | 7.9M | -3% |
| optional/format/idn-email.json | 10 | ✅ | 16.7M | ✅ | 79K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 38.0M | ✅ | 31.1M | -18% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.6M | ✅ | 24.7M | +5% |
| optional/format/regex.json | 8 | ✅ | 57.0M | ✅ | 849K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.3M | ✅ | 29.8M | -18% |
| optional/format/time.json | 46 | ✅ | 6.7M | ✅ | 5.7M | -15% |
| optional/format/unknown.json | 7 | ✅ | 64.7M | ✅ | 55.3M | -15% |
| optional/format/uri-reference.json | 15 | ✅ | 9.5M | ✅ | 9.1M | -4% |
| optional/format/uri-template.json | 10 | ✅ | 15.4M | ✅ | 15.7M | +2% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.2M | 🟢 **-33%** |
| optional/format/uuid.json | 22 | ✅ | 14.9M | ✅ | 15.0M | +1% |
| optional/id.json | 3 | ✅ | 31.8M | ✅ | 12.2M | 🟢 **-62%** |
| optional/no-schema.json | 3 | ✅ | 45.3M | ✅ | 43.5M | -4% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.3M | ✅ | 11.1M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 44.7M | ✅ | 40.6M | -9% |

