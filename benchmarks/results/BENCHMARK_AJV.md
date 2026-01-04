# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.7M | ⚠️ 31/38 | 707 | 11.1M | 🟢 **-55%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 24.9M | ⚠️ 46/49 | 1025 | 12.9M | 🟢 **-48%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.9M | ⚠️ 51/54 | 1221 | 11.8M | 🟢 **-49%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.4M | ⚠️ 62/69 | 1399 | 5.5M | 🟢 **-73%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.2M | ⚠️ 61/68 | 1394 | 5.6M | 🟢 **-74%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 22.2M | ⚠️ 251/278 | 5746 | 7.7M | 🟢 **-66%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.96x faster (45 ns vs 133 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 53.1M | ✅ | 20.6M | 🟢 **-61%** |
| additionalProperties.json | 16 | ✅ | 26.0M | ✅ | 16.3M | 🟢 **-38%** |
| allOf.json | 27 | ✅ | 39.0M | ✅ | 9.7M | 🟢 **-75%** |
| anyOf.json | 15 | ✅ | 53.7M | ✅ | 12.9M | 🟢 **-76%** |
| default.json | 7 | ✅ | 47.4M | ✅ | 46.9M | -1% |
| dependencies.json | 29 | ✅ | 28.6M | ✅ | 26.8M | -6% |
| enum.json | 49 | ✅ | 35.2M | ✅ | 19.7M | 🟢 **-44%** |
| format.json | 36 | ✅ | 48.9M | ✅ | 46.2M | -6% |
| infinite-loop-detection.json | 2 | ✅ | 39.2M | ✅ | 35.2M | -10% |
| items.json | 21 | ✅ | 22.7M | ✅ | 14.4M | 🟢 **-37%** |
| maxItems.json | 4 | ✅ | 65.6M | ✅ | 50.0M | 🟢 **-24%** |
| maxLength.json | 5 | ✅ | 52.1M | ✅ | 47.2M | -9% |
| maxProperties.json | 8 | ✅ | 47.6M | ✅ | 39.5M | -17% |
| maximum.json | 8 | ✅ | 53.2M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 65.9M | ✅ | 48.3M | 🟢 **-27%** |
| minLength.json | 5 | ✅ | 51.1M | ✅ | 43.6M | -15% |
| minProperties.json | 6 | ✅ | 51.1M | ✅ | 42.6M | -17% |
| minimum.json | 11 | ✅ | 61.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 57.7M | ✅ | 23.5M | 🟢 **-59%** |
| not.json | 20 | ✅ | 59.8M | ✅ | 39.7M | 🟢 **-34%** |
| oneOf.json | 23 | ✅ | 49.8M | ✅ | 9.9M | 🟢 **-80%** |
| pattern.json | 9 | ✅ | 38.7M | ✅ | 36.6M | -6% |
| patternProperties.json | 18 | ✅ | 15.0M | ✅ | 7.2M | 🟢 **-52%** |
| properties.json | 17 | ✅ | 24.5M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 33.2M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.2M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 49.4M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 58.5M | ✅ | 35.9M | 🟢 **-39%** |
| uniqueItems.json | 69 | ✅ | 24.2M | ✅ | 17.5M | 🟢 **-28%** |
| optional/bignum.json | 7 | ✅ | 52.6M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 17.0M | ✅ | 17.0M | +0% |
| optional/format/date-time.json | 26 | ✅ | 25.0M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 18.3M | ✅ | 22.3M | 🔴 **+22%** |
| optional/format/ipv4.json | 16 | ✅ | 39.5M | ✅ | 30.7M | 🟢 **-22%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 55.1M | -17% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.0M | ✅ | 12.7M | 🟢 **-40%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 49.9M | ✅ | 19.9M | 🟢 **-60%** |
| additionalProperties.json | 16 | ✅ | 27.6M | ✅ | 10.2M | 🟢 **-63%** |
| allOf.json | 30 | ✅ | 44.4M | ✅ | 19.3M | 🟢 **-57%** |
| anyOf.json | 18 | ✅ | 50.7M | ✅ | 12.1M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 60.3M | ✅ | 38.2M | 🟢 **-37%** |
| const.json | 54 | ✅ | 48.1M | ✅ | 20.9M | 🟢 **-56%** |
| contains.json | 19 | ✅ | 46.4M | ✅ | 7.4M | 🟢 **-84%** |
| default.json | 7 | ✅ | 45.5M | ✅ | 43.2M | -5% |
| definitions.json | 2 | ✅ | 12.9M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 27.5M | ✅ | 29.8M | +8% |
| enum.json | 45 | ✅ | 34.4M | ✅ | 20.2M | 🟢 **-41%** |
| exclusiveMaximum.json | 4 | ✅ | 45.5M | ✅ | 36.5M | -20% |
| exclusiveMinimum.json | 4 | ✅ | 49.2M | ✅ | 40.2M | -18% |
| format.json | 54 | ✅ | 46.4M | ✅ | 51.5M | +11% |
| infinite-loop-detection.json | 2 | ✅ | 36.7M | ✅ | 37.0M | +1% |
| items.json | 28 | ✅ | 26.4M | ✅ | 18.1M | 🟢 **-31%** |
| maxItems.json | 6 | ✅ | 56.0M | ✅ | 47.1M | -16% |
| maxLength.json | 7 | ✅ | 47.0M | ✅ | 42.2M | -10% |
| maxProperties.json | 10 | ✅ | 42.2M | ✅ | 34.6M | -18% |
| maximum.json | 8 | ✅ | 56.3M | ✅ | 47.4M | -16% |
| minItems.json | 6 | ✅ | 55.0M | ✅ | 47.5M | -14% |
| minLength.json | 7 | ✅ | 46.4M | ✅ | 42.9M | -8% |
| minProperties.json | 8 | ✅ | 43.6M | ✅ | 37.9M | -13% |
| minimum.json | 11 | ✅ | 54.6M | ✅ | 46.3M | -15% |
| multipleOf.json | 10 | ✅ | 53.9M | ✅ | 21.0M | 🟢 **-61%** |
| not.json | 38 | ✅ | 58.9M | ✅ | 39.5M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 40.4M | ✅ | 10.2M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 37.5M | ✅ | 39.0M | +4% |
| patternProperties.json | 23 | ✅ | 15.9M | ✅ | 9.1M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 26.9M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 26.4M | ✅ | 14.1M | 🟢 **-47%** |
| ref.json | 65 | ✅ | 21.7M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 19.6M | ✅ | 17.2M | -13% |
| required.json | 9 | ✅ | 51.2M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 58.1M | ✅ | 33.8M | 🟢 **-42%** |
| uniqueItems.json | 69 | ✅ | 22.9M | ✅ | 17.4M | 🟢 **-24%** |
| optional/bignum.json | 9 | ✅ | 53.4M | ✅ | 29.3M | 🟢 **-45%** |
| optional/ecmascript-regex.json | 74 | ✅ | 15.5M | ✅ | 17.0M | +10% |
| optional/format/date-time.json | 26 | ✅ | 23.8M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 17.6M | ✅ | 22.5M | 🔴 **+28%** |
| optional/format/ipv4.json | 16 | ✅ | 37.5M | ✅ | 30.3M | -19% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.1M | ✅ | 24.4M | -16% |
| optional/format/unknown.json | 7 | ✅ | 63.5M | ✅ | 50.3M | 🟢 **-21%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.2M | ✅ | 9.0M | -2% |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ✅ | 15.2M | -7% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-33%** |
| optional/id.json | 7 | ✅ | 36.9M | ✅ | 11.8M | 🟢 **-68%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.3M | ✅ | 13.0M | 🟢 **-33%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 26.3M | ✅ | 37.0M | 🔴 **+41%** |
| additionalProperties.json | 16 | ✅ | 30.4M | ✅ | 18.5M | 🟢 **-39%** |
| allOf.json | 30 | ✅ | 43.9M | ✅ | 11.5M | 🟢 **-74%** |
| anyOf.json | 18 | ✅ | 55.4M | ✅ | 13.2M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 55.9M | ✅ | 45.0M | -19% |
| const.json | 54 | ✅ | 54.9M | ✅ | 19.2M | 🟢 **-65%** |
| contains.json | 21 | ✅ | 55.0M | ✅ | 15.4M | 🟢 **-72%** |
| default.json | 7 | ✅ | 47.0M | ✅ | 45.2M | -4% |
| definitions.json | 2 | ✅ | 13.2M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 28.2M | ✅ | 33.6M | +19% |
| enum.json | 45 | ✅ | 36.7M | ✅ | 20.5M | 🟢 **-44%** |
| exclusiveMaximum.json | 4 | ✅ | 49.0M | ✅ | 42.9M | -13% |
| exclusiveMinimum.json | 4 | ✅ | 51.7M | ✅ | 43.4M | -16% |
| format.json | 102 | ✅ | 45.1M | ✅ | 43.0M | -5% |
| if-then-else.json | 26 | ✅ | 53.8M | ✅ | 34.4M | 🟢 **-36%** |
| infinite-loop-detection.json | 2 | ✅ | 36.5M | ✅ | 32.3M | -11% |
| items.json | 28 | ✅ | 26.0M | ✅ | 18.3M | 🟢 **-30%** |
| maxItems.json | 6 | ✅ | 59.1M | ✅ | 49.1M | -17% |
| maxLength.json | 7 | ✅ | 50.9M | ✅ | 45.8M | -10% |
| maxProperties.json | 10 | ✅ | 45.1M | ✅ | 37.0M | -18% |
| maximum.json | 8 | ✅ | 59.4M | ✅ | 45.8M | 🟢 **-23%** |
| minItems.json | 6 | ✅ | 58.5M | ✅ | 46.7M | 🟢 **-20%** |
| minLength.json | 7 | ✅ | 49.9M | ✅ | 43.6M | -13% |
| minProperties.json | 8 | ✅ | 46.8M | ✅ | 39.3M | -16% |
| minimum.json | 11 | ✅ | 60.5M | ✅ | 48.6M | -20% |
| multipleOf.json | 10 | ✅ | 53.3M | ✅ | 23.3M | 🟢 **-56%** |
| not.json | 38 | ✅ | 61.6M | ✅ | 39.1M | 🟢 **-37%** |
| oneOf.json | 27 | ✅ | 47.0M | ✅ | 10.6M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 39.8M | ✅ | 39.6M | 0% |
| patternProperties.json | 23 | ✅ | 16.0M | ✅ | 7.1M | 🟢 **-55%** |
| properties.json | 21 | ✅ | 28.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.4M | ✅ | 14.1M | 🟢 **-52%** |
| ref.json | 73 | ✅ | 28.4M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 20.0M | ✅ | 21.9M | +10% |
| required.json | 9 | ✅ | 54.1M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 50.2M | ✅ | 35.5M | 🟢 **-29%** |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 18.1M | 🟢 **-26%** |
| optional/bignum.json | 9 | ✅ | 54.4M | ✅ | 28.3M | 🟢 **-48%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 17.2M | -3% |
| optional/format/date-time.json | 26 | ✅ | 25.2M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.8M | ✅ | 8.4M | -5% |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 21.7M | +19% |
| optional/format/ipv4.json | 16 | ✅ | 39.6M | ✅ | 31.4M | 🟢 **-21%** |
| optional/format/ipv6.json | 40 | ✅ | 11.9M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.3M | ✅ | 25.6M | -16% |
| optional/format/regex.json | 8 | ✅ | 59.0M | ✅ | 849K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 32.8M | ✅ | 30.7M | -6% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.6M | -14% |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 53.3M | 🟢 **-20%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.1M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.2M | ✅ | 15.5M | +2% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.4M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ | 44.1M | ✅ | 18.2M | 🟢 **-59%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.0M | ✅ | 13.7M | 🟢 **-40%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 54.4M | ✅ | 22.5M | 🟢 **-59%** |
| additionalProperties.json | 21 | ✅ | 26.2M | ✅ | 17.5M | 🟢 **-33%** |
| allOf.json | 30 | ✅ | 45.5M | ✅ | 17.9M | 🟢 **-61%** |
| anchor.json | 8 | ✅ | 53.7M | ✅ | 43.4M | -19% |
| anyOf.json | 18 | ✅ | 55.7M | ✅ | 12.7M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 55.7M | ✅ | 43.8M | 🟢 **-21%** |
| const.json | 54 | ✅ | 47.4M | ✅ | 19.7M | 🟢 **-58%** |
| contains.json | 21 | ✅ | 52.7M | ✅ | 15.5M | 🟢 **-70%** |
| content.json | 18 | ✅ | 64.8M | ✅ | 43.8M | 🟢 **-32%** |
| default.json | 7 | ✅ | 46.0M | ✅ | 45.7M | -1% |
| defs.json | 2 | ✅ | 1.8M | ✅ | 761K | 🟢 **-58%** |
| dependentRequired.json | 20 | ✅ | 41.2M | ✅ | 40.0M | -3% |
| dependentSchemas.json | 20 | ✅ | 38.1M | ✅ | 34.5M | -10% |
| enum.json | 45 | ✅ | 36.2M | ✅ | 21.0M | 🟢 **-42%** |
| exclusiveMaximum.json | 4 | ✅ | 60.4M | ✅ | 43.9M | 🟢 **-27%** |
| exclusiveMinimum.json | 4 | ✅ | 60.2M | ✅ | 43.4M | 🟢 **-28%** |
| format.json | 114 | ✅ | 68.0M | ✅ | 41.4M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 62.4M | ✅ | 35.5M | 🟢 **-43%** |
| infinite-loop-detection.json | 2 | ✅ | 36.5M | ✅ | 34.6M | -5% |
| items.json | 28 | ✅ | 27.7M | ✅ | 18.9M | 🟢 **-32%** |
| maxContains.json | 12 | ✅ | 63.0M | ✅ | 34.5M | 🟢 **-45%** |
| maxItems.json | 6 | ✅ | 51.7M | ✅ | 49.1M | -5% |
| maxLength.json | 7 | ✅ | 51.2M | ✅ | 45.6M | -11% |
| maxProperties.json | 10 | ✅ | 45.4M | ✅ | 37.5M | -17% |
| maximum.json | 8 | ✅ | 60.9M | ✅ | 47.3M | 🟢 **-22%** |
| minContains.json | 28 | ✅ | 59.1M | ✅ | 23.7M | 🟢 **-60%** |
| minItems.json | 6 | ✅ | 59.3M | ✅ | 49.4M | -17% |
| minLength.json | 7 | ✅ | 50.5M | ✅ | 44.6M | -12% |
| minProperties.json | 8 | ✅ | 47.9M | ✅ | 39.4M | -18% |
| minimum.json | 11 | ✅ | 60.8M | ✅ | 48.4M | 🟢 **-20%** |
| multipleOf.json | 10 | ✅ | 56.4M | ✅ | 23.3M | 🟢 **-59%** |
| not.json | 40 | ✅ | 54.4M | ✅ | 33.8M | 🟢 **-38%** |
| oneOf.json | 27 | ✅ | 45.1M | ✅ | 10.7M | 🟢 **-76%** |
| pattern.json | 9 | ✅ | 47.7M | ✅ | 40.4M | -15% |
| patternProperties.json | 23 | ✅ | 15.5M | ✅ | 7.1M | 🟢 **-54%** |
| properties.json | 21 | ✅ | 28.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 31.1M | ✅ | 14.3M | 🟢 **-54%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.7M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 32.7M | ✅ | 16.3M | 🟢 **-50%** |
| required.json | 9 | ✅ | 52.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 61.5M | ✅ | 35.0M | 🟢 **-43%** |
| unevaluatedItems.json | 51 | ✅ | 12.4M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.5M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 17.3M | 🟢 **-29%** |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.3M | ✅ | 11.7M | 🟢 **-78%** |
| optional/bignum.json | 9 | ✅ | 53.8M | ✅ | 31.1M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 42.9M | ✅ | 35.1M | -18% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.1M | ✅ | 17.2M | +0% |
| optional/format/date-time.json | 26 | ✅ | 24.6M | ✅ | 3.0M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.8M | ✅ | 8.1M | -7% |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 21.9M | 🔴 **+21%** |
| optional/format/idn-email.json | 10 | ✅ | 17.0M | ✅ | 70K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 39.5M | ✅ | 30.8M | 🟢 **-22%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.9M | ✅ | 25.5M | -15% |
| optional/format/regex.json | 8 | ✅ | 59.9M | ✅ | 849K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 31.4M | ✅ | 28.9M | -8% |
| optional/format/time.json | 46 | ✅ | 6.2M | ✅ | 5.5M | -11% |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 54.5M | -19% |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 9.1M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 16.0M | ✅ | 15.4M | -4% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.3M | 🟢 **-33%** |
| optional/format/uuid.json | 22 | ✅ | 15.1M | ✅ | 15.1M | 0% |
| optional/id.json | 3 | ✅ | 34.3M | ✅ | 14.0M | 🟢 **-59%** |
| optional/no-schema.json | 3 | ✅ | 55.4M | ✅ | 45.1M | -19% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.5M | ✅ | 11.4M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 45.6M | ✅ | 38.4M | -16% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 23.9M | ✅ | 11.8M | 🟢 **-51%** |
| allOf.json | 30 | ✅ | 37.3M | ✅ | 10.6M | 🟢 **-72%** |
| anchor.json | 8 | ✅ | 39.1M | ✅ | 35.1M | -10% |
| anyOf.json | 18 | ✅ | 42.2M | ✅ | 23.0M | 🟢 **-45%** |
| boolean_schema.json | 18 | ✅ | 50.9M | ✅ | 37.3M | 🟢 **-27%** |
| const.json | 54 | ✅ | 49.7M | ✅ | 20.2M | 🟢 **-59%** |
| contains.json | 21 | ✅ | 46.9M | ✅ | 13.8M | 🟢 **-71%** |
| content.json | 18 | ✅ | 58.2M | ✅ | 54.5M | -6% |
| default.json | 7 | ✅ | 42.2M | ✅ | 41.6M | -1% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 748K | 🟢 **-60%** |
| dependentRequired.json | 20 | ✅ | 32.8M | ✅ | 37.9M | +16% |
| dependentSchemas.json | 20 | ✅ | 35.8M | ✅ | 33.3M | -7% |
| dynamicRef.json | 4 | ✅ | 7.0M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 36.0M | ✅ | 20.6M | 🟢 **-43%** |
| exclusiveMaximum.json | 4 | ✅ | 47.1M | ✅ | 36.3M | 🟢 **-23%** |
| exclusiveMinimum.json | 4 | ✅ | 47.9M | ✅ | 37.0M | 🟢 **-23%** |
| format.json | 133 | ✅ | 57.9M | ✅ | 51.4M | -11% |
| if-then-else.json | 26 | ✅ | 49.3M | ✅ | 33.5M | 🟢 **-32%** |
| infinite-loop-detection.json | 2 | ✅ | 28.7M | ✅ | 26.3M | -9% |
| items.json | 29 | ✅ | 24.4M | ✅ | 24.3M | -1% |
| maxContains.json | 12 | ✅ | 49.7M | ✅ | 29.4M | 🟢 **-41%** |
| maxItems.json | 6 | ✅ | 53.3M | ✅ | 40.2M | 🟢 **-25%** |
| maxLength.json | 7 | ✅ | 46.0M | ✅ | 40.8M | -11% |
| maxProperties.json | 10 | ✅ | 40.5M | ✅ | 32.5M | -20% |
| maximum.json | 8 | ✅ | 52.2M | ✅ | 44.2M | -15% |
| minContains.json | 28 | ✅ | 53.5M | ✅ | 22.6M | 🟢 **-58%** |
| minItems.json | 6 | ✅ | 53.6M | ✅ | 40.4M | 🟢 **-25%** |
| minLength.json | 7 | ✅ | 44.6M | ✅ | 35.8M | -20% |
| minProperties.json | 8 | ✅ | 41.1M | ✅ | 33.5M | -19% |
| minimum.json | 11 | ✅ | 60.1M | ✅ | 44.6M | 🟢 **-26%** |
| multipleOf.json | 10 | ✅ | 49.2M | ✅ | 21.0M | 🟢 **-57%** |
| not.json | 40 | ✅ | 46.3M | ✅ | 31.2M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 38.7M | ✅ | 10.0M | 🟢 **-74%** |
| pattern.json | 9 | ✅ | 36.2M | ✅ | 33.7M | -7% |
| patternProperties.json | 23 | ✅ | 13.7M | ✅ | 7.1M | 🟢 **-48%** |
| prefixItems.json | 11 | ✅ | 46.0M | ✅ | 43.8M | -5% |
| properties.json | 21 | ✅ | 22.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 25.0M | ✅ | 12.5M | 🟢 **-50%** |
| ref.json | 71 | ✅ | 19.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 20.9M | ✅ | 21.9M | +5% |
| required.json | 9 | ✅ | 43.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 50.4M | ✅ | 30.2M | 🟢 **-40%** |
| unevaluatedItems.json | 47 | ✅ | 19.7M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.5M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.5M | ✅ | 13.9M | 🟢 **-41%** |
| vocabulary.json | 2 | ✅ | 54.0M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 46.4M | ✅ | 8.5M | 🟢 **-82%** |
| optional/bignum.json | 9 | ✅ | 47.3M | ✅ | 24.5M | 🟢 **-48%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 35.7M | ✅ | 31.5M | -12% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.0M | ✅ | 15.9M | -6% |
| optional/format/date-time.json | 26 | ✅ | 24.5M | ✅ | 3.0M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.9M | ✅ | 8.4M | -6% |
| optional/format/idn-email.json | 10 | ✅ | 15.9M | ✅ | 73K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 30.4M | ✅ | 24.2M | 🟢 **-20%** |
| optional/format/ipv6.json | 40 | ✅ | 12.3M | ✅ | 3.1M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.2M | ✅ | 23.9M | +3% |
| optional/format/regex.json | 8 | ✅ | 51.2M | ✅ | 820K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 34.1M | ✅ | 26.8M | 🟢 **-21%** |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.6M | -12% |
| optional/format/unknown.json | 7 | ✅ | 56.6M | ✅ | 51.0M | -10% |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 9.3M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 16.9M | ✅ | 16.1M | -5% |
| optional/format/uri.json | 36 | ✅ | 7.0M | ✅ | 4.4M | 🟢 **-37%** |
| optional/format/uuid.json | 22 | ✅ | 14.9M | ✅ | 13.8M | -7% |
| optional/id.json | 3 | ✅ | 26.2M | ✅ | 11.0M | 🟢 **-58%** |
| optional/no-schema.json | 3 | ✅ | 52.9M | ✅ | 36.9M | 🟢 **-30%** |
| optional/non-bmp-regex.json | 12 | ✅ | 17.2M | ✅ | 10.5M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 38.9M | ✅ | 34.2M | -12% |

