# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.4M | ⚠️ 31/38 | 707 | 11.3M | 🟢 **-54%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 25.3M | ⚠️ 46/49 | 1025 | 13.0M | 🟢 **-49%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.5M | ⚠️ 51/54 | 1221 | 11.5M | 🟢 **-49%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.3M | ⚠️ 62/69 | 1399 | 4.0M | 🟢 **-80%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 22.4M | ⚠️ 61/68 | 1394 | 5.5M | 🟢 **-75%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 22.5M | ⚠️ 251/278 | 5746 | 6.8M | 🟢 **-70%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 3.39x faster (45 ns vs 151 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 48.9M | ✅ | 23.3M | 🟢 **-52%** |
| additionalProperties.json | 16 | ✅ | 26.3M | ✅ | 18.3M | 🟢 **-30%** |
| allOf.json | 27 | ✅ | 42.1M | ✅ | 11.2M | 🟢 **-73%** |
| anyOf.json | 15 | ✅ | 47.8M | ✅ | 14.8M | 🟢 **-69%** |
| default.json | 7 | ✅ | 48.6M | ✅ | 46.7M | -4% |
| dependencies.json | 29 | ✅ | 29.0M | ✅ | 28.6M | -1% |
| enum.json | 49 | ✅ | 34.9M | ✅ | 19.8M | 🟢 **-43%** |
| format.json | 36 | ✅ | 49.7M | ✅ | 44.5M | -10% |
| infinite-loop-detection.json | 2 | ✅ | 35.6M | ✅ | 38.1M | +7% |
| items.json | 21 | ✅ | 24.3M | ✅ | 17.8M | 🟢 **-27%** |
| maxItems.json | 4 | ✅ | 66.1M | ✅ | 49.1M | 🟢 **-26%** |
| maxLength.json | 5 | ✅ | 52.2M | ✅ | 45.8M | -12% |
| maxProperties.json | 8 | ✅ | 48.2M | ✅ | 38.8M | -20% |
| maximum.json | 8 | ✅ | 61.2M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 66.0M | ✅ | 48.9M | 🟢 **-26%** |
| minLength.json | 5 | ✅ | 51.1M | ✅ | 43.2M | -15% |
| minProperties.json | 6 | ✅ | 50.9M | ✅ | 42.1M | -17% |
| minimum.json | 11 | ✅ | 66.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 57.2M | ✅ | 23.5M | 🟢 **-59%** |
| not.json | 20 | ✅ | 59.0M | ✅ | 34.5M | 🟢 **-42%** |
| oneOf.json | 23 | ✅ | 42.7M | ✅ | 10.8M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 33.5M | ✅ | 38.8M | +16% |
| patternProperties.json | 18 | ✅ | 15.1M | ✅ | 7.3M | 🟢 **-52%** |
| properties.json | 17 | ✅ | 23.5M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 32.8M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 34.8M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 52.6M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 60.8M | ✅ | 36.6M | 🟢 **-40%** |
| uniqueItems.json | 69 | ✅ | 23.4M | ✅ | 16.7M | 🟢 **-28%** |
| optional/bignum.json | 7 | ✅ | 52.3M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 16.2M | -3% |
| optional/format/date-time.json | 26 | ✅ | 25.0M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 20.7M | +14% |
| optional/format/ipv4.json | 16 | ✅ | 39.5M | ✅ | 29.8M | 🟢 **-24%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 54.6M | -18% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.4M | 🟢 **-30%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.1M | ✅ | 13.1M | 🟢 **-43%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 42.2M | ✅ | 29.0M | 🟢 **-31%** |
| additionalProperties.json | 16 | ✅ | 25.2M | ✅ | 17.6M | 🟢 **-30%** |
| allOf.json | 30 | ✅ | 42.6M | ✅ | 11.8M | 🟢 **-72%** |
| anyOf.json | 18 | ✅ | 50.4M | ✅ | 14.1M | 🟢 **-72%** |
| boolean_schema.json | 18 | ✅ | 52.7M | ✅ | 45.7M | -13% |
| const.json | 54 | ✅ | 50.4M | ✅ | 19.3M | 🟢 **-62%** |
| contains.json | 19 | ✅ | 47.6M | ✅ | 8.3M | 🟢 **-83%** |
| default.json | 7 | ✅ | 43.0M | ✅ | 44.2M | +3% |
| definitions.json | 2 | ✅ | 13.0M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 28.0M | ✅ | 30.7M | +10% |
| enum.json | 45 | ✅ | 36.1M | ✅ | 21.3M | 🟢 **-41%** |
| exclusiveMaximum.json | 4 | ✅ | 55.8M | ✅ | 44.2M | 🟢 **-21%** |
| exclusiveMinimum.json | 4 | ✅ | 55.4M | ✅ | 43.3M | 🟢 **-22%** |
| format.json | 54 | ✅ | 47.2M | ✅ | 52.4M | +11% |
| infinite-loop-detection.json | 2 | ✅ | 36.9M | ✅ | 37.8M | +3% |
| items.json | 28 | ✅ | 26.8M | ✅ | 19.4M | 🟢 **-28%** |
| maxItems.json | 6 | ✅ | 56.6M | ✅ | 49.1M | -13% |
| maxLength.json | 7 | ✅ | 47.9M | ✅ | 44.5M | -7% |
| maxProperties.json | 10 | ✅ | 42.0M | ✅ | 37.0M | -12% |
| maximum.json | 8 | ✅ | 57.9M | ✅ | 47.9M | -17% |
| minItems.json | 6 | ✅ | 57.0M | ✅ | 50.4M | -11% |
| minLength.json | 7 | ✅ | 47.0M | ✅ | 43.8M | -7% |
| minProperties.json | 8 | ✅ | 45.8M | ✅ | 38.8M | -15% |
| minimum.json | 11 | ✅ | 55.5M | ✅ | 46.9M | -15% |
| multipleOf.json | 10 | ✅ | 54.9M | ✅ | 24.1M | 🟢 **-56%** |
| not.json | 38 | ✅ | 59.3M | ✅ | 40.4M | 🟢 **-32%** |
| oneOf.json | 27 | ✅ | 42.7M | ✅ | 10.7M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 36.5M | ✅ | 37.4M | +2% |
| patternProperties.json | 23 | ✅ | 16.0M | ✅ | 7.1M | 🟢 **-56%** |
| properties.json | 21 | ✅ | 25.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.4M | ✅ | 14.6M | 🟢 **-52%** |
| ref.json | 65 | ✅ | 22.4M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 19.7M | ✅ | 16.6M | -16% |
| required.json | 9 | ✅ | 52.2M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 58.2M | ✅ | 37.2M | 🟢 **-36%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 18.1M | 🟢 **-25%** |
| optional/bignum.json | 9 | ✅ | 55.4M | ✅ | 29.9M | 🟢 **-46%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.6M | ✅ | 17.4M | +5% |
| optional/format/date-time.json | 26 | ✅ | 24.0M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 17.7M | ✅ | 19.6M | +11% |
| optional/format/ipv4.json | 16 | ✅ | 37.6M | ✅ | 30.8M | -18% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.1M | ✅ | 25.6M | -12% |
| optional/format/unknown.json | 7 | ✅ | 64.8M | ✅ | 55.5M | -14% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.2M | -4% |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ✅ | 15.5M | -5% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 37.8M | ✅ | 9.0M | 🟢 **-76%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.9M | ✅ | 13.7M | 🟢 **-37%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 26.2M | ✅ | 37.5M | 🔴 **+43%** |
| additionalProperties.json | 16 | ✅ | 26.3M | ✅ | 17.1M | 🟢 **-35%** |
| allOf.json | 30 | ✅ | 42.2M | ✅ | 9.9M | 🟢 **-77%** |
| anyOf.json | 18 | ✅ | 55.9M | ✅ | 11.7M | 🟢 **-79%** |
| boolean_schema.json | 18 | ✅ | 55.2M | ✅ | 42.7M | 🟢 **-23%** |
| const.json | 54 | ✅ | 55.0M | ✅ | 21.2M | 🟢 **-62%** |
| contains.json | 21 | ✅ | 54.2M | ✅ | 15.4M | 🟢 **-72%** |
| default.json | 7 | ✅ | 49.0M | ✅ | 46.6M | -5% |
| definitions.json | 2 | ✅ | 13.4M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 30.3M | ✅ | 29.4M | -3% |
| enum.json | 45 | ✅ | 36.3M | ✅ | 24.1M | 🟢 **-34%** |
| exclusiveMaximum.json | 4 | ✅ | 55.5M | ✅ | 41.3M | 🟢 **-26%** |
| exclusiveMinimum.json | 4 | ✅ | 70.0M | ✅ | 41.8M | 🟢 **-40%** |
| format.json | 102 | ✅ | 48.3M | ✅ | 43.2M | -10% |
| if-then-else.json | 26 | ✅ | 57.1M | ✅ | 36.6M | 🟢 **-36%** |
| infinite-loop-detection.json | 2 | ✅ | 36.4M | ✅ | 36.8M | +1% |
| items.json | 28 | ✅ | 28.2M | ✅ | 16.4M | 🟢 **-42%** |
| maxItems.json | 6 | ✅ | 58.9M | ✅ | 48.8M | -17% |
| maxLength.json | 7 | ✅ | 51.4M | ✅ | 43.3M | -16% |
| maxProperties.json | 10 | ✅ | 45.7M | ✅ | 37.5M | -18% |
| maximum.json | 8 | ✅ | 60.6M | ✅ | 48.4M | 🟢 **-20%** |
| minItems.json | 6 | ✅ | 58.9M | ✅ | 47.6M | -19% |
| minLength.json | 7 | ✅ | 50.2M | ✅ | 41.5M | -17% |
| minProperties.json | 8 | ✅ | 47.7M | ✅ | 39.2M | -18% |
| minimum.json | 11 | ✅ | 59.6M | ✅ | 49.2M | -17% |
| multipleOf.json | 10 | ✅ | 57.9M | ✅ | 22.8M | 🟢 **-61%** |
| not.json | 38 | ✅ | 61.5M | ✅ | 39.1M | 🟢 **-36%** |
| oneOf.json | 27 | ✅ | 48.2M | ✅ | 10.0M | 🟢 **-79%** |
| pattern.json | 9 | ✅ | 37.8M | ✅ | 39.7M | +5% |
| patternProperties.json | 23 | ✅ | 15.5M | ✅ | 9.4M | 🟢 **-40%** |
| properties.json | 21 | ✅ | 28.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.7M | ✅ | 14.2M | 🟢 **-54%** |
| ref.json | 73 | ✅ | 23.2M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 19.9M | ✅ | 17.5M | -12% |
| required.json | 9 | ✅ | 54.1M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 63.3M | ✅ | 35.0M | 🟢 **-45%** |
| uniqueItems.json | 69 | ✅ | 24.4M | ✅ | 14.1M | 🟢 **-42%** |
| optional/bignum.json | 9 | ✅ | 57.2M | ✅ | 31.0M | 🟢 **-46%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.1M | ✅ | 16.6M | +3% |
| optional/format/date-time.json | 26 | ✅ | 25.1M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 8.2M | -3% |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 22.5M | 🔴 **+25%** |
| optional/format/ipv4.json | 16 | ✅ | 34.4M | ✅ | 30.3M | -12% |
| optional/format/ipv6.json | 40 | ✅ | 11.4M | ✅ | 2.6M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.4M | ✅ | 22.4M | 🟢 **-24%** |
| optional/format/regex.json | 8 | ✅ | 59.1M | ✅ | 858K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.3M | ✅ | 30.0M | -20% |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.7M | -10% |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 55.2M | -17% |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 8.9M | -9% |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ✅ | 15.1M | -7% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/id.json | 7 | ✅ | 43.9M | ✅ | 18.1M | 🟢 **-59%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.0M | ✅ | 12.8M | 🟢 **-42%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 52.7M | ✅ | 36.0M | 🟢 **-32%** |
| additionalProperties.json | 21 | ✅ | 26.0M | ✅ | 18.1M | 🟢 **-31%** |
| allOf.json | 30 | ✅ | 45.2M | ✅ | 10.7M | 🟢 **-76%** |
| anchor.json | 8 | ✅ | 52.9M | ✅ | 39.0M | 🟢 **-26%** |
| anyOf.json | 18 | ✅ | 49.5M | ✅ | 11.2M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 52.9M | ✅ | 44.7M | -16% |
| const.json | 54 | ✅ | 53.4M | ✅ | 18.4M | 🟢 **-66%** |
| contains.json | 21 | ✅ | 55.6M | ✅ | 14.6M | 🟢 **-74%** |
| content.json | 18 | ✅ | 65.3M | ✅ | 41.2M | 🟢 **-37%** |
| default.json | 7 | ✅ | 45.8M | ✅ | 45.5M | -1% |
| defs.json | 2 | ✅ | 1.8M | ✅ | 714K | 🟢 **-60%** |
| dependentRequired.json | 20 | ✅ | 41.0M | ✅ | 38.1M | -7% |
| dependentSchemas.json | 20 | ✅ | 42.1M | ✅ | 35.2M | -16% |
| enum.json | 45 | ✅ | 37.8M | ✅ | 20.4M | 🟢 **-46%** |
| exclusiveMaximum.json | 4 | ✅ | 60.1M | ✅ | 42.7M | 🟢 **-29%** |
| exclusiveMinimum.json | 4 | ✅ | 59.9M | ✅ | 43.2M | 🟢 **-28%** |
| format.json | 114 | ✅ | 69.2M | ✅ | 40.8M | 🟢 **-41%** |
| if-then-else.json | 26 | ✅ | 55.4M | ✅ | 35.8M | 🟢 **-35%** |
| infinite-loop-detection.json | 2 | ✅ | 38.6M | ✅ | 34.3M | -11% |
| items.json | 28 | ✅ | 26.3M | ✅ | 16.6M | 🟢 **-37%** |
| maxContains.json | 12 | ✅ | 54.0M | ✅ | 34.4M | 🟢 **-36%** |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 49.1M | -17% |
| maxLength.json | 7 | ✅ | 51.0M | ✅ | 44.1M | -14% |
| maxProperties.json | 10 | ✅ | 45.3M | ✅ | 37.0M | -18% |
| maximum.json | 8 | ✅ | 60.7M | ✅ | 47.7M | 🟢 **-21%** |
| minContains.json | 28 | ✅ | 64.4M | ✅ | 27.4M | 🟢 **-57%** |
| minItems.json | 6 | ✅ | 58.4M | ✅ | 48.5M | -17% |
| minLength.json | 7 | ✅ | 49.6M | ✅ | 42.7M | -14% |
| minProperties.json | 8 | ✅ | 47.5M | ✅ | 39.1M | -18% |
| minimum.json | 11 | ✅ | 61.5M | ✅ | 48.8M | 🟢 **-21%** |
| multipleOf.json | 10 | ✅ | 58.2M | ✅ | 22.8M | 🟢 **-61%** |
| not.json | 40 | ✅ | 54.6M | ✅ | 32.9M | 🟢 **-40%** |
| oneOf.json | 27 | ✅ | 38.9M | ✅ | 9.5M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 39.6M | ✅ | 36.7M | -7% |
| patternProperties.json | 23 | ✅ | 15.3M | ✅ | 7.3M | 🟢 **-52%** |
| properties.json | 21 | ✅ | 26.6M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.7M | ✅ | 13.2M | 🟢 **-57%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.6M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 31.2M | ✅ | 15.1M | 🟢 **-52%** |
| required.json | 9 | ✅ | 52.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 61.2M | ✅ | 34.8M | 🟢 **-43%** |
| unevaluatedItems.json | 51 | ✅ | 14.9M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.1M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.7M | ✅ | 17.6M | 🟢 **-26%** |
| vocabulary.json | 2 | ✅ | 63.0M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.2M | ✅ | 11.3M | 🟢 **-78%** |
| optional/bignum.json | 9 | ✅ | 53.8M | ✅ | 26.6M | 🟢 **-50%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 37.9M | ✅ | 32.8M | -14% |
| optional/ecmascript-regex.json | 74 | ✅ | 14.8M | ✅ | 16.1M | +9% |
| optional/format/date-time.json | 26 | ✅ | 24.4M | ✅ | 2.8M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 7.9M | -7% |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 21.8M | 🔴 **+21%** |
| optional/format/idn-email.json | 10 | ✅ | 16.4M | ✅ | 43K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 34.2M | ✅ | 30.3M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.3M | ✅ | 24.6M | -16% |
| optional/format/regex.json | 8 | ✅ | 60.3M | ✅ | 854K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.6M | ✅ | 30.3M | -19% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.5M | -15% |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 54.9M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.3M | -3% |
| optional/format/uri-template.json | 10 | ✅ | 16.4M | ✅ | 15.4M | -6% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/format/uuid.json | 22 | ✅ | 13.6M | ✅ | 15.0M | +11% |
| optional/id.json | 3 | ✅ | 34.2M | ✅ | 12.2M | 🟢 **-64%** |
| optional/no-schema.json | 3 | ✅ | 54.8M | ✅ | 43.2M | 🟢 **-21%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.9M | ✅ | 10.9M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 45.0M | ✅ | 40.0M | -11% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 25.3M | ✅ | 11.3M | 🟢 **-55%** |
| allOf.json | 30 | ✅ | 45.2M | ✅ | 11.7M | 🟢 **-74%** |
| anchor.json | 8 | ✅ | 53.6M | ✅ | 39.3M | 🟢 **-27%** |
| anyOf.json | 18 | ✅ | 51.4M | ✅ | 13.0M | 🟢 **-75%** |
| boolean_schema.json | 18 | ✅ | 65.2M | ✅ | 44.8M | 🟢 **-31%** |
| const.json | 54 | ✅ | 54.3M | ✅ | 18.7M | 🟢 **-66%** |
| contains.json | 21 | ✅ | 47.4M | ✅ | 8.9M | 🟢 **-81%** |
| content.json | 18 | ✅ | 64.2M | ✅ | 38.5M | 🟢 **-40%** |
| default.json | 7 | ✅ | 47.6M | ✅ | 43.8M | -8% |
| defs.json | 2 | ✅ | 2.2M | ✅ | 909K | 🟢 **-58%** |
| dependentRequired.json | 20 | ✅ | 38.9M | ✅ | 39.2M | +1% |
| dependentSchemas.json | 20 | ✅ | 39.4M | ✅ | 34.1M | -13% |
| dynamicRef.json | 4 | ✅ | 8.2M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 39.1M | ✅ | 20.8M | 🟢 **-47%** |
| exclusiveMaximum.json | 4 | ✅ | 58.7M | ✅ | 42.9M | 🟢 **-27%** |
| exclusiveMinimum.json | 4 | ✅ | 69.7M | ✅ | 41.0M | 🟢 **-41%** |
| format.json | 133 | ✅ | 70.4M | ✅ | 41.5M | 🟢 **-41%** |
| if-then-else.json | 26 | ✅ | 56.9M | ✅ | 37.7M | 🟢 **-34%** |
| infinite-loop-detection.json | 2 | ✅ | 30.5M | ✅ | 31.9M | +5% |
| items.json | 29 | ✅ | 26.8M | ✅ | 26.1M | -3% |
| maxContains.json | 12 | ✅ | 61.9M | ✅ | 34.4M | 🟢 **-44%** |
| maxItems.json | 6 | ✅ | 59.3M | ✅ | 47.8M | -19% |
| maxLength.json | 7 | ✅ | 50.7M | ✅ | 43.8M | -14% |
| maxProperties.json | 10 | ✅ | 45.6M | ✅ | 35.8M | 🟢 **-22%** |
| maximum.json | 8 | ✅ | 60.2M | ✅ | 44.5M | 🟢 **-26%** |
| minContains.json | 28 | ✅ | 64.7M | ✅ | 24.6M | 🟢 **-62%** |
| minItems.json | 6 | ✅ | 59.5M | ✅ | 45.7M | 🟢 **-23%** |
| minLength.json | 7 | ✅ | 50.6M | ✅ | 43.3M | -14% |
| minProperties.json | 8 | ✅ | 47.5M | ✅ | 39.9M | -16% |
| minimum.json | 11 | ✅ | 61.6M | ✅ | 49.1M | 🟢 **-20%** |
| multipleOf.json | 10 | ✅ | 57.7M | ✅ | 21.9M | 🟢 **-62%** |
| not.json | 40 | ✅ | 54.9M | ✅ | 36.4M | 🟢 **-34%** |
| oneOf.json | 27 | ✅ | 49.7M | ✅ | 10.7M | 🟢 **-79%** |
| pattern.json | 9 | ✅ | 39.4M | ✅ | 39.3M | 0% |
| patternProperties.json | 23 | ✅ | 16.1M | ✅ | 7.2M | 🟢 **-56%** |
| prefixItems.json | 11 | ✅ | 58.2M | ✅ | 50.2M | -14% |
| properties.json | 21 | ✅ | 25.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 26.5M | ✅ | 14.0M | 🟢 **-47%** |
| ref.json | 71 | ✅ | 20.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.0M | ✅ | 16.2M | 🟢 **-44%** |
| required.json | 9 | ✅ | 53.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 56.1M | ✅ | 32.0M | 🟢 **-43%** |
| unevaluatedItems.json | 47 | ✅ | 20.8M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.8M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.9M | ✅ | 14.8M | 🟢 **-43%** |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.4M | ✅ | 11.1M | 🟢 **-79%** |
| optional/bignum.json | 9 | ✅ | 53.3M | ✅ | 27.9M | 🟢 **-48%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 39.6M | ✅ | 34.8M | -12% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 17.0M | +2% |
| optional/format/date-time.json | 26 | ✅ | 24.7M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.9M | ✅ | 8.2M | -8% |
| optional/format/idn-email.json | 10 | ✅ | 17.0M | ✅ | 72K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ✅ | 31.0M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.9M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.4M | ✅ | 25.2M | -17% |
| optional/format/regex.json | 8 | ✅ | 60.0M | ✅ | 841K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.2M | ✅ | 30.8M | -17% |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.6M | -11% |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 54.8M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 9.3M | -4% |
| optional/format/uri-template.json | 10 | ✅ | 16.4M | ✅ | 15.3M | -7% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/format/uuid.json | 22 | ✅ | 14.6M | ✅ | 14.8M | +1% |
| optional/id.json | 3 | ✅ | 34.6M | ✅ | 11.9M | 🟢 **-66%** |
| optional/no-schema.json | 3 | ✅ | 55.4M | ✅ | 44.4M | -20% |
| optional/non-bmp-regex.json | 12 | ✅ | 21.7M | ✅ | 11.5M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 46.2M | ✅ | 39.3M | -15% |

