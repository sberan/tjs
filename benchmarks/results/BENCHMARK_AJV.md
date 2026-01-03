# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.6M | ⚠️ 31/38 | 707 | 11.4M | 🟢 **-54%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 26.0M | ⚠️ 46/49 | 1025 | 12.9M | 🟢 **-50%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 23.0M | ⚠️ 51/54 | 1221 | 11.7M | 🟢 **-49%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 14.8M | ⚠️ 62/69 | 1399 | 5.6M | 🟢 **-62%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 22.7M | ⚠️ 61/68 | 1394 | 5.8M | 🟢 **-74%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 20.5M | ⚠️ 251/278 | 5746 | 7.8M | 🟢 **-62%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.75x faster (49 ns vs 134 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 44.2M | ✅ | 24.0M | 🟢 **-46%** |
| additionalProperties.json | 16 | ✅ | 25.4M | ✅ | 17.6M | 🟢 **-31%** |
| allOf.json | 27 | ✅ | 44.9M | ✅ | 10.2M | 🟢 **-77%** |
| anyOf.json | 15 | ✅ | 46.6M | ✅ | 12.8M | 🟢 **-72%** |
| default.json | 7 | ✅ | 45.6M | ✅ | 42.7M | -6% |
| dependencies.json | 29 | ✅ | 25.8M | ✅ | 28.6M | +11% |
| enum.json | 49 | ✅ | 35.2M | ✅ | 19.8M | 🟢 **-44%** |
| format.json | 36 | ✅ | 50.1M | ✅ | 51.0M | +2% |
| infinite-loop-detection.json | 2 | ✅ | 38.5M | ✅ | 37.7M | -2% |
| items.json | 21 | ✅ | 24.9M | ✅ | 16.7M | 🟢 **-33%** |
| maxItems.json | 4 | ✅ | 66.1M | ✅ | 46.4M | 🟢 **-30%** |
| maxLength.json | 5 | ✅ | 52.0M | ✅ | 46.1M | -11% |
| maxProperties.json | 8 | ✅ | 47.8M | ✅ | 40.1M | -16% |
| maximum.json | 8 | ✅ | 58.9M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 66.1M | ✅ | 48.4M | 🟢 **-27%** |
| minLength.json | 5 | ✅ | 50.7M | ✅ | 43.9M | -13% |
| minProperties.json | 6 | ✅ | 50.5M | ✅ | 42.4M | -16% |
| minimum.json | 11 | ✅ | 61.1M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 57.0M | ✅ | 21.9M | 🟢 **-62%** |
| not.json | 20 | ✅ | 59.8M | ✅ | 39.1M | 🟢 **-35%** |
| oneOf.json | 23 | ✅ | 48.6M | ✅ | 10.5M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 43.3M | ✅ | 40.3M | -7% |
| patternProperties.json | 18 | ✅ | 16.5M | ✅ | 7.3M | 🟢 **-56%** |
| properties.json | 17 | ✅ | 24.8M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 33.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.4M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 52.2M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 49.2M | ✅ | 35.9M | 🟢 **-27%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 16.8M | 🟢 **-30%** |
| optional/bignum.json | 7 | ✅ | 53.5M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 17.7M | ✅ | 17.2M | -3% |
| optional/format/date-time.json | 26 | ✅ | 25.0M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 22.3M | 🔴 **+23%** |
| optional/format/ipv4.json | 16 | ✅ | 39.6M | ✅ | 31.0M | 🟢 **-22%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 66.7M | ✅ | 54.3M | -19% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.4M | 🟢 **-32%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.2M | ✅ | 13.6M | 🟢 **-29%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 47.8M | ✅ | 24.6M | 🟢 **-49%** |
| additionalProperties.json | 16 | ✅ | 25.1M | ✅ | 18.0M | 🟢 **-28%** |
| allOf.json | 30 | ✅ | 42.7M | ✅ | 10.9M | 🟢 **-75%** |
| anyOf.json | 18 | ✅ | 54.3M | ✅ | 12.3M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 55.7M | ✅ | 44.5M | 🟢 **-20%** |
| const.json | 54 | ✅ | 55.8M | ✅ | 21.5M | 🟢 **-62%** |
| contains.json | 19 | ✅ | 50.4M | ✅ | 7.3M | 🟢 **-86%** |
| default.json | 7 | ✅ | 47.7M | ✅ | 42.9M | -10% |
| definitions.json | 2 | ✅ | 13.4M | ✅ | 1.4M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 28.8M | ✅ | 30.0M | +4% |
| enum.json | 45 | ✅ | 36.7M | ✅ | 20.9M | 🟢 **-43%** |
| exclusiveMaximum.json | 4 | ✅ | 68.9M | ✅ | 37.8M | 🟢 **-45%** |
| exclusiveMinimum.json | 4 | ✅ | 60.3M | ✅ | 42.8M | 🟢 **-29%** |
| format.json | 54 | ✅ | 46.2M | ✅ | 45.4M | -2% |
| infinite-loop-detection.json | 2 | ✅ | 39.2M | ✅ | 38.0M | -3% |
| items.json | 28 | ✅ | 27.4M | ✅ | 19.3M | 🟢 **-29%** |
| maxItems.json | 6 | ✅ | 64.5M | ✅ | 45.5M | 🟢 **-29%** |
| maxLength.json | 7 | ✅ | 51.6M | ✅ | 44.9M | -13% |
| maxProperties.json | 10 | ✅ | 46.1M | ✅ | 37.5M | -19% |
| maximum.json | 8 | ✅ | 60.8M | ✅ | 49.1M | -19% |
| minItems.json | 6 | ✅ | 59.2M | ✅ | 49.1M | -17% |
| minLength.json | 7 | ✅ | 51.0M | ✅ | 42.9M | -16% |
| minProperties.json | 8 | ✅ | 47.6M | ✅ | 39.2M | -18% |
| minimum.json | 11 | ✅ | 61.9M | ✅ | 48.2M | 🟢 **-22%** |
| multipleOf.json | 10 | ✅ | 61.1M | ✅ | 23.2M | 🟢 **-62%** |
| not.json | 38 | ✅ | 61.7M | ✅ | 39.5M | 🟢 **-36%** |
| oneOf.json | 27 | ✅ | 48.3M | ✅ | 10.7M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 44.0M | ✅ | 39.2M | -11% |
| patternProperties.json | 23 | ✅ | 16.4M | ✅ | 9.4M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 27.9M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.1M | ✅ | 14.6M | 🟢 **-50%** |
| ref.json | 65 | ✅ | 23.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 21.8M | ✅ | 16.9M | 🟢 **-23%** |
| required.json | 9 | ✅ | 52.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 60.8M | ✅ | 36.6M | 🟢 **-40%** |
| uniqueItems.json | 69 | ✅ | 24.7M | ✅ | 17.5M | 🟢 **-29%** |
| optional/bignum.json | 9 | ✅ | 57.1M | ✅ | 29.9M | 🟢 **-48%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 17.1M | +3% |
| optional/format/date-time.json | 26 | ✅ | 24.7M | ✅ | 2.8M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 17.8M | ✅ | 22.5M | 🔴 **+27%** |
| optional/format/ipv4.json | 16 | ✅ | 38.0M | ✅ | 30.0M | 🟢 **-21%** |
| optional/format/ipv6.json | 40 | ✅ | 11.5M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.7M | ✅ | 25.5M | -14% |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 55.4M | -17% |
| optional/format/uri-reference.json | 15 | ✅ | 9.5M | ✅ | 8.9M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.3M | ✅ | 15.6M | +2% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.4M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ | 39.5M | ✅ | 11.8M | 🟢 **-70%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.2M | ✅ | 13.2M | 🟢 **-41%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 26.3M | ✅ | 36.5M | 🔴 **+39%** |
| additionalProperties.json | 16 | ✅ | 29.8M | ✅ | 16.1M | 🟢 **-46%** |
| allOf.json | 30 | ✅ | 42.4M | ✅ | 10.7M | 🟢 **-75%** |
| anyOf.json | 18 | ✅ | 55.6M | ✅ | 11.7M | 🟢 **-79%** |
| boolean_schema.json | 18 | ✅ | 55.8M | ✅ | 42.3M | 🟢 **-24%** |
| const.json | 54 | ✅ | 52.7M | ✅ | 21.2M | 🟢 **-60%** |
| contains.json | 21 | ✅ | 55.5M | ✅ | 15.7M | 🟢 **-72%** |
| default.json | 7 | ✅ | 49.0M | ✅ | 46.6M | -5% |
| definitions.json | 2 | ✅ | 13.2M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 31.5M | ✅ | 30.2M | -4% |
| enum.json | 45 | ✅ | 37.8M | ✅ | 21.2M | 🟢 **-44%** |
| exclusiveMaximum.json | 4 | ✅ | 55.6M | ✅ | 42.5M | 🟢 **-24%** |
| exclusiveMinimum.json | 4 | ✅ | 59.2M | ✅ | 42.8M | 🟢 **-28%** |
| format.json | 102 | ✅ | 49.1M | ✅ | 41.2M | -16% |
| if-then-else.json | 26 | ✅ | 62.3M | ✅ | 35.8M | 🟢 **-43%** |
| infinite-loop-detection.json | 2 | ✅ | 38.3M | ✅ | 37.9M | -1% |
| items.json | 28 | ✅ | 27.2M | ✅ | 18.2M | 🟢 **-33%** |
| maxItems.json | 6 | ✅ | 59.4M | ✅ | 48.2M | -19% |
| maxLength.json | 7 | ✅ | 50.4M | ✅ | 44.8M | -11% |
| maxProperties.json | 10 | ✅ | 45.1M | ✅ | 37.8M | -16% |
| maximum.json | 8 | ✅ | 61.2M | ✅ | 49.0M | -20% |
| minItems.json | 6 | ✅ | 59.4M | ✅ | 47.7M | -20% |
| minLength.json | 7 | ✅ | 56.3M | ✅ | 44.1M | 🟢 **-22%** |
| minProperties.json | 8 | ✅ | 47.5M | ✅ | 39.3M | -17% |
| minimum.json | 11 | ✅ | 60.9M | ✅ | 45.5M | 🟢 **-25%** |
| multipleOf.json | 10 | ✅ | 58.4M | ✅ | 23.2M | 🟢 **-60%** |
| not.json | 38 | ✅ | 63.7M | ✅ | 38.4M | 🟢 **-40%** |
| oneOf.json | 27 | ✅ | 48.7M | ✅ | 10.6M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 40.3M | ✅ | 39.5M | -2% |
| patternProperties.json | 23 | ✅ | 16.6M | ✅ | 9.4M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 25.6M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 31.9M | ✅ | 14.5M | 🟢 **-55%** |
| ref.json | 73 | ✅ | 28.8M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 22.0M | ✅ | 16.8M | 🟢 **-24%** |
| required.json | 9 | ✅ | 53.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 62.1M | ✅ | 36.1M | 🟢 **-42%** |
| uniqueItems.json | 69 | ✅ | 24.6M | ✅ | 17.9M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 56.1M | ✅ | 30.7M | 🟢 **-45%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.4M | ✅ | 17.1M | -2% |
| optional/format/date-time.json | 26 | ✅ | 25.2M | ✅ | 2.8M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 8.2M | -5% |
| optional/format/email.json | 17 | ✅ | 18.3M | ✅ | 21.4M | +17% |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ✅ | 31.0M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.4M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.8M | ✅ | 24.3M | -18% |
| optional/format/regex.json | 8 | ✅ | 58.9M | ✅ | 845K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.4M | ✅ | 30.3M | -19% |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.6M | -12% |
| optional/format/unknown.json | 7 | ✅ | 66.4M | ✅ | 55.0M | -17% |
| optional/format/uri-reference.json | 15 | ✅ | 8.9M | ✅ | 9.1M | +2% |
| optional/format/uri-template.json | 10 | ✅ | 14.8M | ✅ | 15.7M | +6% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-34%** |
| optional/id.json | 7 | ✅ | 43.9M | ✅ | 18.7M | 🟢 **-57%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.5M | ✅ | 13.2M | 🟢 **-38%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 42.3M | ✅ | 34.2M | -19% |
| additionalProperties.json | 21 | ✅ | 24.9M | ✅ | 18.0M | 🟢 **-28%** |
| allOf.json | 30 | ✅ | 38.3M | ✅ | 10.4M | 🟢 **-73%** |
| anchor.json | 8 | ✅ | 41.4M | ✅ | 41.4M | +0% |
| anyOf.json | 18 | ✅ | 46.0M | ✅ | 10.8M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 51.7M | ✅ | 45.4M | -12% |
| const.json | 54 | ✅ | 46.6M | ✅ | 21.3M | 🟢 **-54%** |
| contains.json | 21 | ✅ | 50.6M | ✅ | 8.2M | 🟢 **-84%** |
| content.json | 18 | ✅ | 61.2M | ✅ | 38.1M | 🟢 **-38%** |
| default.json | 7 | ✅ | 43.8M | ✅ | 44.9M | +2% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 747K | 🟢 **-61%** |
| dependentRequired.json | 20 | ✅ | 38.8M | ✅ | 39.7M | +2% |
| dependentSchemas.json | 20 | ✅ | 39.4M | ✅ | 35.1M | -11% |
| enum.json | 45 | ✅ | 33.0M | ✅ | 21.1M | 🟢 **-36%** |
| exclusiveMaximum.json | 4 | ✅ | 50.4M | ✅ | 43.1M | -14% |
| exclusiveMinimum.json | 4 | ✅ | 53.3M | ✅ | 43.5M | -18% |
| format.json | 114 | ✅ | 65.2M | ✅ | 42.3M | 🟢 **-35%** |
| if-then-else.json | 26 | ✅ | 55.8M | ✅ | 35.9M | 🟢 **-36%** |
| infinite-loop-detection.json | 2 | ✅ | 34.1M | ✅ | 34.6M | +1% |
| items.json | 28 | ✅ | 25.7M | ✅ | 18.2M | 🟢 **-29%** |
| maxContains.json | 12 | ✅ | 49.6M | ✅ | 34.2M | 🟢 **-31%** |
| maxItems.json | 6 | ✅ | 53.9M | ✅ | 49.0M | -9% |
| maxLength.json | 7 | ✅ | 46.6M | ✅ | 44.0M | -6% |
| maxProperties.json | 10 | ✅ | 41.9M | ✅ | 37.2M | -11% |
| maximum.json | 8 | ✅ | 58.7M | ✅ | 48.5M | -17% |
| minContains.json | 28 | ✅ | 52.5M | ✅ | 22.8M | 🟢 **-57%** |
| minItems.json | 6 | ✅ | 55.1M | ✅ | 48.6M | -12% |
| minLength.json | 7 | ✅ | 46.2M | ✅ | 41.4M | -10% |
| minProperties.json | 8 | ✅ | 44.6M | ✅ | 39.3M | -12% |
| minimum.json | 11 | ✅ | 56.2M | ✅ | 48.5M | -14% |
| multipleOf.json | 10 | ✅ | 52.9M | ✅ | 22.0M | 🟢 **-58%** |
| not.json | 40 | ✅ | 52.7M | ✅ | 34.7M | 🟢 **-34%** |
| oneOf.json | 27 | ✅ | 44.9M | ✅ | 10.5M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 38.6M | ✅ | 34.5M | -11% |
| patternProperties.json | 23 | ✅ | 15.0M | ✅ | 7.3M | 🟢 **-51%** |
| properties.json | 21 | ✅ | 26.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 27.8M | ✅ | 13.3M | 🟢 **-52%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 18.0M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 26.8M | ✅ | 16.0M | 🟢 **-40%** |
| required.json | 9 | ✅ | 49.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 54.9M | ✅ | 33.8M | 🟢 **-38%** |
| unevaluatedItems.json | 51 | ✅ | 14.7M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 3.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.2M | ✅ | 17.9M | 🟢 **-23%** |
| vocabulary.json | 2 | ✅ | 55.3M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 47.7M | ✅ | 12.8M | 🟢 **-73%** |
| optional/bignum.json | 9 | ✅ | 50.2M | ✅ | 31.4M | 🟢 **-37%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 36.9M | ✅ | 34.2M | -7% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 17.2M | +5% |
| optional/format/date-time.json | 26 | ✅ | 24.0M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.1M | ✅ | 7.8M | -4% |
| optional/format/email.json | 17 | ✅ | 17.5M | ✅ | 21.9M | 🔴 **+25%** |
| optional/format/idn-email.json | 10 | ✅ | 16.2M | ✅ | 74K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 32.6M | ✅ | 31.2M | -4% |
| optional/format/ipv6.json | 40 | ✅ | 11.4M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.8M | ✅ | 25.4M | -12% |
| optional/format/regex.json | 8 | ✅ | 56.2M | ✅ | 911K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 35.0M | ✅ | 30.1M | -14% |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.5M | -13% |
| optional/format/unknown.json | 7 | ✅ | 63.7M | ✅ | 55.0M | -14% |
| optional/format/uri-reference.json | 15 | ✅ | 9.5M | ✅ | 9.0M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 15.6M | ✅ | 15.8M | +1% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.2M | 🟢 **-32%** |
| optional/format/uuid.json | 22 | ✅ | 14.3M | ✅ | 14.7M | +2% |
| optional/id.json | 3 | ✅ | 28.0M | ✅ | 11.5M | 🟢 **-59%** |
| optional/no-schema.json | 3 | ✅ | 49.8M | ✅ | 44.7M | -10% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.4M | ✅ | 11.5M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 36.5M | ✅ | 38.8M | +6% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 26.5M | ✅ | 12.7M | 🟢 **-52%** |
| allOf.json | 30 | ✅ | 43.9M | ✅ | 11.8M | 🟢 **-73%** |
| anchor.json | 8 | ✅ | 51.4M | ✅ | 41.3M | -20% |
| anyOf.json | 18 | ✅ | 55.2M | ✅ | 13.0M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 55.7M | ✅ | 40.1M | 🟢 **-28%** |
| const.json | 54 | ✅ | 54.4M | ✅ | 20.9M | 🟢 **-62%** |
| contains.json | 21 | ✅ | 55.1M | ✅ | 15.4M | 🟢 **-72%** |
| content.json | 18 | ✅ | 65.8M | ✅ | 46.2M | 🟢 **-30%** |
| default.json | 7 | ✅ | 49.1M | ✅ | 46.6M | -5% |
| defs.json | 2 | ✅ | 2.1M | ✅ | 903K | 🟢 **-58%** |
| dependentRequired.json | 20 | ✅ | 40.5M | ✅ | 40.0M | -1% |
| dependentSchemas.json | 20 | ✅ | 42.6M | ✅ | 36.8M | -14% |
| dynamicRef.json | 4 | ✅ | 8.8M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 36.6M | ✅ | 20.8M | 🟢 **-43%** |
| exclusiveMaximum.json | 4 | ✅ | 60.0M | ✅ | 43.4M | 🟢 **-28%** |
| exclusiveMinimum.json | 4 | ✅ | 68.6M | ✅ | 41.5M | 🟢 **-40%** |
| format.json | 133 | ✅ | 69.0M | ✅ | 39.7M | 🟢 **-43%** |
| if-then-else.json | 26 | ✅ | 56.8M | ✅ | 35.0M | 🟢 **-38%** |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ✅ | 36.4M | -7% |
| items.json | 29 | ✅ | 26.6M | ✅ | 16.0M | 🟢 **-40%** |
| maxContains.json | 12 | ✅ | 62.9M | ✅ | 34.5M | 🟢 **-45%** |
| maxItems.json | 6 | ✅ | 56.2M | ✅ | 47.1M | -16% |
| maxLength.json | 7 | ✅ | 50.9M | ✅ | 45.0M | -12% |
| maxProperties.json | 10 | ✅ | 45.4M | ✅ | 37.5M | -17% |
| maximum.json | 8 | ✅ | 60.8M | ✅ | 47.7M | 🟢 **-22%** |
| minContains.json | 28 | ✅ | 56.4M | ✅ | 25.0M | 🟢 **-56%** |
| minItems.json | 6 | ✅ | 57.8M | ✅ | 49.1M | -15% |
| minLength.json | 7 | ✅ | 49.8M | ✅ | 43.2M | -13% |
| minProperties.json | 8 | ✅ | 47.8M | ✅ | 39.4M | -18% |
| minimum.json | 11 | ✅ | 61.6M | ✅ | 48.2M | 🟢 **-22%** |
| multipleOf.json | 10 | ✅ | 58.2M | ✅ | 23.7M | 🟢 **-59%** |
| not.json | 40 | ✅ | 56.6M | ✅ | 37.8M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 48.4M | ✅ | 10.4M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 38.7M | ✅ | 36.6M | -6% |
| patternProperties.json | 23 | ✅ | 16.2M | ✅ | 7.2M | 🟢 **-56%** |
| prefixItems.json | 11 | ✅ | 58.6M | ✅ | 48.5M | -17% |
| properties.json | 21 | ✅ | 27.6M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.0M | ✅ | 14.0M | 🟢 **-52%** |
| ref.json | 71 | ✅ | 21.8M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 32.4M | ✅ | 16.8M | 🟢 **-48%** |
| required.json | 9 | ✅ | 51.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 57.0M | ✅ | 34.1M | 🟢 **-40%** |
| unevaluatedItems.json | 47 | ✅ | 23.2M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 13.3M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 26.5M | ✅ | 15.0M | 🟢 **-44%** |
| vocabulary.json | 2 | ✅ | 62.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.2M | ✅ | 11.2M | 🟢 **-78%** |
| optional/bignum.json | 9 | ✅ | 51.6M | ✅ | 29.9M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 40.5M | ✅ | 34.1M | -16% |
| optional/ecmascript-regex.json | 74 | ✅ | 15.5M | ✅ | 16.9M | +9% |
| optional/format/date-time.json | 26 | ✅ | 23.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.7M | ✅ | 8.2M | -6% |
| optional/format/idn-email.json | 10 | ✅ | 16.4M | ✅ | 79K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 39.6M | ✅ | 31.0M | 🟢 **-22%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.2M | ✅ | 25.7M | -15% |
| optional/format/regex.json | 8 | ✅ | 60.2M | ✅ | 854K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.5M | ✅ | 30.3M | -17% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.7M | -13% |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 55.0M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.1M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 16.5M | ✅ | 15.6M | -5% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-34%** |
| optional/format/uuid.json | 22 | ✅ | 15.2M | ✅ | 14.8M | -2% |
| optional/id.json | 3 | ✅ | 34.4M | ✅ | 13.9M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 55.5M | ✅ | 44.8M | -19% |
| optional/non-bmp-regex.json | 12 | ✅ | 21.1M | ✅ | 12.6M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.6M | ✅ | 39.9M | -9% |

