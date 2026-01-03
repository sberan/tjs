# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.2M | ⚠️ 31/38 | 707 | 11.2M | 🟢 **-54%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 26.0M | ⚠️ 46/49 | 1025 | 12.5M | 🟢 **-52%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.8M | ⚠️ 51/54 | 1221 | 11.5M | 🟢 **-49%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 15.0M | ⚠️ 62/69 | 1399 | 5.8M | 🟢 **-62%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.8M | ⚠️ 61/68 | 1394 | 5.8M | 🟢 **-73%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 20.4M | ⚠️ 251/278 | 5746 | 7.8M | 🟢 **-62%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.67x faster (49 ns vs 131 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 58.3M | ✅ | 20.7M | 🟢 **-64%** |
| additionalProperties.json | 16 | ✅ | 25.1M | ✅ | 18.1M | 🟢 **-28%** |
| allOf.json | 27 | ✅ | 42.2M | ✅ | 11.1M | 🟢 **-74%** |
| anyOf.json | 15 | ✅ | 52.0M | ✅ | 15.5M | 🟢 **-70%** |
| default.json | 7 | ✅ | 49.1M | ✅ | 47.1M | -4% |
| dependencies.json | 29 | ✅ | 29.2M | ✅ | 28.3M | -3% |
| enum.json | 49 | ✅ | 35.8M | ✅ | 20.2M | 🟢 **-44%** |
| format.json | 36 | ✅ | 48.8M | ✅ | 45.0M | -8% |
| infinite-loop-detection.json | 2 | ✅ | 37.0M | ✅ | 34.5M | -7% |
| items.json | 21 | ✅ | 23.2M | ✅ | 14.2M | 🟢 **-39%** |
| maxItems.json | 4 | ✅ | 64.3M | ✅ | 49.7M | 🟢 **-23%** |
| maxLength.json | 5 | ✅ | 52.0M | ✅ | 48.3M | -7% |
| maxProperties.json | 8 | ✅ | 47.7M | ✅ | 39.2M | -18% |
| maximum.json | 8 | ✅ | 61.5M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 58.7M | ✅ | 30.6M | 🟢 **-48%** |
| minLength.json | 5 | ✅ | 48.6M | ✅ | 41.8M | -14% |
| minProperties.json | 6 | ✅ | 49.0M | ✅ | 42.2M | -14% |
| minimum.json | 11 | ✅ | 61.3M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 57.5M | ✅ | 23.2M | 🟢 **-60%** |
| not.json | 20 | ✅ | 60.3M | ✅ | 37.0M | 🟢 **-39%** |
| oneOf.json | 23 | ✅ | 48.2M | ✅ | 9.6M | 🟢 **-80%** |
| pattern.json | 9 | ✅ | 40.2M | ✅ | 22.7M | 🟢 **-44%** |
| patternProperties.json | 18 | ✅ | 15.0M | ✅ | 7.5M | 🟢 **-50%** |
| properties.json | 17 | ✅ | 24.5M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 30.1M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.6M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 52.5M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 49.9M | ✅ | 35.8M | 🟢 **-28%** |
| uniqueItems.json | 69 | ✅ | 24.4M | ✅ | 17.9M | 🟢 **-27%** |
| optional/bignum.json | 7 | ✅ | 53.2M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 16.6M | +1% |
| optional/format/date-time.json | 26 | ✅ | 24.8M | ✅ | 2.8M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 17.9M | ✅ | 20.6M | +15% |
| optional/format/ipv4.json | 16 | ✅ | 39.1M | ✅ | 31.2M | 🟢 **-20%** |
| optional/format/ipv6.json | 40 | ✅ | 11.5M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 55.2M | -18% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-31%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.9M | ✅ | 13.3M | 🟢 **-39%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 45.6M | ✅ | 22.8M | 🟢 **-50%** |
| additionalProperties.json | 16 | ✅ | 24.7M | ✅ | 17.0M | 🟢 **-31%** |
| allOf.json | 30 | ✅ | 38.0M | ✅ | 11.2M | 🟢 **-71%** |
| anyOf.json | 18 | ✅ | 48.2M | ✅ | 10.7M | 🟢 **-78%** |
| boolean_schema.json | 18 | ✅ | 57.0M | ✅ | 37.9M | 🟢 **-34%** |
| const.json | 54 | ✅ | 56.4M | ✅ | 18.5M | 🟢 **-67%** |
| contains.json | 19 | ✅ | 46.3M | ✅ | 7.0M | 🟢 **-85%** |
| default.json | 7 | ✅ | 38.0M | ✅ | 38.4M | +1% |
| definitions.json | 2 | ✅ | 12.4M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 26.7M | ✅ | 26.7M | +0% |
| enum.json | 45 | ✅ | 36.0M | ✅ | 19.6M | 🟢 **-46%** |
| exclusiveMaximum.json | 4 | ✅ | 59.7M | ✅ | 35.5M | 🟢 **-40%** |
| exclusiveMinimum.json | 4 | ✅ | 60.2M | ✅ | 35.5M | 🟢 **-41%** |
| format.json | 54 | ✅ | 58.2M | ✅ | 52.0M | -11% |
| infinite-loop-detection.json | 2 | ✅ | 32.5M | ✅ | 25.9M | 🟢 **-20%** |
| items.json | 28 | ✅ | 25.4M | ✅ | 15.9M | 🟢 **-37%** |
| maxItems.json | 6 | ✅ | 57.4M | ✅ | 41.0M | 🟢 **-29%** |
| maxLength.json | 7 | ✅ | 49.5M | ✅ | 39.2M | 🟢 **-21%** |
| maxProperties.json | 10 | ✅ | 43.0M | ✅ | 30.1M | 🟢 **-30%** |
| maximum.json | 8 | ✅ | 58.5M | ✅ | 41.6M | 🟢 **-29%** |
| minItems.json | 6 | ✅ | 57.6M | ✅ | 40.5M | 🟢 **-30%** |
| minLength.json | 7 | ✅ | 45.9M | ✅ | 36.4M | 🟢 **-21%** |
| minProperties.json | 8 | ✅ | 45.2M | ✅ | 34.6M | 🟢 **-24%** |
| minimum.json | 11 | ✅ | 57.7M | ✅ | 43.1M | 🟢 **-25%** |
| multipleOf.json | 10 | ✅ | 59.7M | ✅ | 19.3M | 🟢 **-68%** |
| not.json | 38 | ✅ | 56.0M | ✅ | 32.6M | 🟢 **-42%** |
| oneOf.json | 27 | ✅ | 44.4M | ✅ | 9.7M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 44.3M | ✅ | 34.3M | 🟢 **-23%** |
| patternProperties.json | 23 | ✅ | 15.1M | ✅ | 9.1M | 🟢 **-40%** |
| properties.json | 21 | ✅ | 24.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.2M | ✅ | 12.4M | 🟢 **-58%** |
| ref.json | 65 | ✅ | 21.6M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 24.6M | ✅ | 12.8M | 🟢 **-48%** |
| required.json | 9 | ✅ | 44.5M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 58.3M | ✅ | 31.5M | 🟢 **-46%** |
| uniqueItems.json | 69 | ✅ | 23.1M | ✅ | 16.5M | 🟢 **-28%** |
| optional/bignum.json | 9 | ✅ | 58.7M | ✅ | 25.9M | 🟢 **-56%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 16.6M | -7% |
| optional/format/date-time.json | 26 | ✅ | 24.4M | ✅ | 3.0M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 19.4M | +7% |
| optional/format/ipv4.json | 16 | ✅ | 33.4M | ✅ | 25.0M | 🟢 **-25%** |
| optional/format/ipv6.json | 40 | ✅ | 12.3M | ✅ | 3.0M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.0M | ✅ | 22.9M | 🟢 **-24%** |
| optional/format/unknown.json | 7 | ✅ | 63.9M | ✅ | 53.4M | -16% |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 9.1M | -7% |
| optional/format/uri-template.json | 10 | ✅ | 16.8M | ✅ | 16.0M | -5% |
| optional/format/uri.json | 36 | ✅ | 7.0M | ✅ | 4.4M | 🟢 **-38%** |
| optional/id.json | 7 | ✅ | 37.0M | ✅ | 8.1M | 🟢 **-78%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.1M | ✅ | 12.5M | 🟢 **-38%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 45.6M | ✅ | 40.1M | -12% |
| additionalProperties.json | 16 | ✅ | 29.5M | ✅ | 12.8M | 🟢 **-57%** |
| allOf.json | 30 | ✅ | 43.7M | ✅ | 11.5M | 🟢 **-74%** |
| anyOf.json | 18 | ✅ | 49.8M | ✅ | 13.5M | 🟢 **-73%** |
| boolean_schema.json | 18 | ✅ | 57.3M | ✅ | 45.2M | 🟢 **-21%** |
| const.json | 54 | ✅ | 53.7M | ✅ | 18.6M | 🟢 **-65%** |
| contains.json | 21 | ✅ | 55.8M | ✅ | 9.1M | 🟢 **-84%** |
| default.json | 7 | ✅ | 44.1M | ✅ | 44.1M | +0% |
| definitions.json | 2 | ✅ | 13.3M | ✅ | 1.4M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 31.6M | ✅ | 30.1M | -5% |
| enum.json | 45 | ✅ | 38.2M | ✅ | 20.8M | 🟢 **-46%** |
| exclusiveMaximum.json | 4 | ✅ | 59.8M | ✅ | 43.6M | 🟢 **-27%** |
| exclusiveMinimum.json | 4 | ✅ | 60.1M | ✅ | 42.5M | 🟢 **-29%** |
| format.json | 102 | ✅ | 44.8M | ✅ | 45.1M | +1% |
| if-then-else.json | 26 | ✅ | 55.5M | ✅ | 36.6M | 🟢 **-34%** |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ✅ | 35.6M | -9% |
| items.json | 28 | ✅ | 27.2M | ✅ | 18.3M | 🟢 **-33%** |
| maxItems.json | 6 | ✅ | 59.4M | ✅ | 48.7M | -18% |
| maxLength.json | 7 | ✅ | 49.8M | ✅ | 44.8M | -10% |
| maxProperties.json | 10 | ✅ | 42.6M | ✅ | 37.5M | -12% |
| maximum.json | 8 | ✅ | 60.1M | ✅ | 46.9M | 🟢 **-22%** |
| minItems.json | 6 | ✅ | 59.0M | ✅ | 49.3M | -17% |
| minLength.json | 7 | ✅ | 50.8M | ✅ | 44.0M | -13% |
| minProperties.json | 8 | ✅ | 47.9M | ✅ | 40.0M | -17% |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 49.9M | -19% |
| multipleOf.json | 10 | ✅ | 57.7M | ✅ | 23.3M | 🟢 **-60%** |
| not.json | 38 | ✅ | 60.5M | ✅ | 39.3M | 🟢 **-35%** |
| oneOf.json | 27 | ✅ | 48.3M | ✅ | 10.6M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 41.3M | ✅ | 40.3M | -3% |
| patternProperties.json | 23 | ✅ | 16.2M | ✅ | 9.3M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 26.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.6M | ✅ | 14.7M | 🟢 **-50%** |
| ref.json | 73 | ✅ | 28.0M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 22.1M | ✅ | 16.9M | 🟢 **-24%** |
| required.json | 9 | ✅ | 54.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 63.1M | ✅ | 34.8M | 🟢 **-45%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 16.9M | 🟢 **-29%** |
| optional/bignum.json | 9 | ✅ | 57.4M | ✅ | 30.3M | 🟢 **-47%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 16.5M | +0% |
| optional/format/date-time.json | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 7.9M | -6% |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 21.2M | +17% |
| optional/format/ipv4.json | 16 | ✅ | 39.1M | ✅ | 28.0M | 🟢 **-28%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.5M | ✅ | 25.3M | -17% |
| optional/format/regex.json | 8 | ✅ | 58.2M | ✅ | 846K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.4M | ✅ | 29.7M | 🟢 **-21%** |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.6M | -12% |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 55.3M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 8.8M | ✅ | 8.9M | +1% |
| optional/format/uri-template.json | 10 | ✅ | 14.9M | ✅ | 15.6M | +4% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ | 43.5M | ✅ | 21.2M | 🟢 **-51%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.5M | ✅ | 13.1M | 🟢 **-39%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 54.3M | ✅ | 37.5M | 🟢 **-31%** |
| additionalProperties.json | 21 | ✅ | 24.8M | ✅ | 13.5M | 🟢 **-46%** |
| allOf.json | 30 | ✅ | 45.1M | ✅ | 11.6M | 🟢 **-74%** |
| anchor.json | 8 | ✅ | 52.8M | ✅ | 41.6M | 🟢 **-21%** |
| anyOf.json | 18 | ✅ | 51.4M | ✅ | 12.9M | 🟢 **-75%** |
| boolean_schema.json | 18 | ✅ | 64.4M | ✅ | 44.6M | 🟢 **-31%** |
| const.json | 54 | ✅ | 56.0M | ✅ | 18.9M | 🟢 **-66%** |
| contains.json | 21 | ✅ | 56.0M | ✅ | 15.6M | 🟢 **-72%** |
| content.json | 18 | ✅ | 64.2M | ✅ | 41.2M | 🟢 **-36%** |
| default.json | 7 | ✅ | 49.1M | ✅ | 47.3M | -4% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 744K | 🟢 **-62%** |
| dependentRequired.json | 20 | ✅ | 41.1M | ✅ | 39.9M | -3% |
| dependentSchemas.json | 20 | ✅ | 40.3M | ✅ | 36.9M | -8% |
| enum.json | 45 | ✅ | 36.2M | ✅ | 21.3M | 🟢 **-41%** |
| exclusiveMaximum.json | 4 | ✅ | 58.8M | ✅ | 43.3M | 🟢 **-26%** |
| exclusiveMinimum.json | 4 | ✅ | 60.0M | ✅ | 42.4M | 🟢 **-29%** |
| format.json | 114 | ✅ | 67.3M | ✅ | 42.0M | 🟢 **-38%** |
| if-then-else.json | 26 | ✅ | 49.9M | ✅ | 35.0M | 🟢 **-30%** |
| infinite-loop-detection.json | 2 | ✅ | 36.4M | ✅ | 34.6M | -5% |
| items.json | 28 | ✅ | 25.9M | ✅ | 19.4M | 🟢 **-25%** |
| maxContains.json | 12 | ✅ | 55.7M | ✅ | 35.2M | 🟢 **-37%** |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 48.9M | -18% |
| maxLength.json | 7 | ✅ | 50.0M | ✅ | 44.7M | -11% |
| maxProperties.json | 10 | ✅ | 45.4M | ✅ | 36.6M | -19% |
| maximum.json | 8 | ✅ | 61.4M | ✅ | 47.5M | 🟢 **-23%** |
| minContains.json | 28 | ✅ | 55.9M | ✅ | 24.4M | 🟢 **-56%** |
| minItems.json | 6 | ✅ | 58.7M | ✅ | 47.3M | -19% |
| minLength.json | 7 | ✅ | 50.3M | ✅ | 42.3M | -16% |
| minProperties.json | 8 | ✅ | 47.6M | ✅ | 39.3M | -18% |
| minimum.json | 11 | ✅ | 61.7M | ✅ | 49.5M | -20% |
| multipleOf.json | 10 | ✅ | 58.3M | ✅ | 23.7M | 🟢 **-59%** |
| not.json | 40 | ✅ | 57.1M | ✅ | 34.4M | 🟢 **-40%** |
| oneOf.json | 27 | ✅ | 46.9M | ✅ | 10.6M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 39.8M | ✅ | 39.3M | -1% |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 7.3M | 🟢 **-54%** |
| properties.json | 21 | ✅ | 26.9M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 27.8M | ✅ | 13.6M | 🟢 **-51%** |
| recursiveRef.json | 31 | ✅ | 5.6M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.4M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.5M | ✅ | 16.7M | 🟢 **-44%** |
| required.json | 9 | ✅ | 54.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 57.1M | ✅ | 34.4M | 🟢 **-40%** |
| unevaluatedItems.json | 51 | ✅ | 15.8M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 3.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 21.1M | ✅ | 16.8M | 🟢 **-21%** |
| vocabulary.json | 2 | ✅ | 61.3M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.2M | ✅ | 11.1M | 🟢 **-79%** |
| optional/bignum.json | 9 | ✅ | 53.2M | ✅ | 30.1M | 🟢 **-43%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 39.5M | ✅ | 32.9M | -17% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.2M | ✅ | 16.2M | +0% |
| optional/format/date-time.json | 26 | ✅ | 23.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 8.1M | -6% |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 22.5M | 🔴 **+25%** |
| optional/format/idn-email.json | 10 | ✅ | 16.8M | ✅ | 78K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ✅ | 30.8M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.0M | ✅ | 26.5M | -12% |
| optional/format/regex.json | 8 | ✅ | 58.1M | ✅ | 847K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 31.9M | ✅ | 30.5M | -4% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.5M | -16% |
| optional/format/unknown.json | 7 | ✅ | 67.1M | ✅ | 54.7M | -19% |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 9.3M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 15.0M | ✅ | 15.3M | +2% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.4M | 🟢 **-31%** |
| optional/format/uuid.json | 22 | ✅ | 15.0M | ✅ | 14.9M | -1% |
| optional/id.json | 3 | ✅ | 34.4M | ✅ | 13.7M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 55.4M | ✅ | 43.9M | 🟢 **-21%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.3M | ✅ | 11.2M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 41.7M | ✅ | 40.4M | -3% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 25.0M | ✅ | 9.9M | 🟢 **-60%** |
| allOf.json | 30 | ✅ | 39.7M | ✅ | 11.9M | 🟢 **-70%** |
| anchor.json | 8 | ✅ | 49.9M | ✅ | 40.0M | -20% |
| anyOf.json | 18 | ✅ | 48.2M | ✅ | 12.5M | 🟢 **-74%** |
| boolean_schema.json | 18 | ✅ | 47.8M | ✅ | 44.6M | -7% |
| const.json | 54 | ✅ | 49.7M | ✅ | 18.7M | 🟢 **-62%** |
| contains.json | 21 | ✅ | 52.6M | ✅ | 15.0M | 🟢 **-71%** |
| content.json | 18 | ✅ | 64.2M | ✅ | 54.4M | -15% |
| default.json | 7 | ✅ | 46.1M | ✅ | 47.3M | +3% |
| defs.json | 2 | ✅ | 2.2M | ✅ | 769K | 🟢 **-65%** |
| dependentRequired.json | 20 | ✅ | 37.3M | ✅ | 40.4M | +8% |
| dependentSchemas.json | 20 | ✅ | 37.3M | ✅ | 33.3M | -11% |
| dynamicRef.json | 4 | ✅ | 8.1M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 34.9M | ✅ | 23.9M | 🟢 **-32%** |
| exclusiveMaximum.json | 4 | ✅ | 55.3M | ✅ | 44.1M | 🟢 **-20%** |
| exclusiveMinimum.json | 4 | ✅ | 59.5M | ✅ | 40.6M | 🟢 **-32%** |
| format.json | 133 | ✅ | 67.2M | ✅ | 41.4M | 🟢 **-38%** |
| if-then-else.json | 26 | ✅ | 52.7M | ✅ | 36.0M | 🟢 **-32%** |
| infinite-loop-detection.json | 2 | ✅ | 33.6M | ✅ | 37.9M | +13% |
| items.json | 29 | ✅ | 28.4M | ✅ | 17.3M | 🟢 **-39%** |
| maxContains.json | 12 | ✅ | 51.2M | ✅ | 34.1M | 🟢 **-33%** |
| maxItems.json | 6 | ✅ | 57.0M | ✅ | 46.8M | -18% |
| maxLength.json | 7 | ✅ | 48.4M | ✅ | 44.5M | -8% |
| maxProperties.json | 10 | ✅ | 43.1M | ✅ | 37.6M | -13% |
| maximum.json | 8 | ✅ | 57.5M | ✅ | 42.7M | 🟢 **-26%** |
| minContains.json | 28 | ✅ | 59.7M | ✅ | 25.2M | 🟢 **-58%** |
| minItems.json | 6 | ✅ | 56.8M | ✅ | 48.4M | -15% |
| minLength.json | 7 | ✅ | 47.5M | ✅ | 43.4M | -9% |
| minProperties.json | 8 | ✅ | 45.0M | ✅ | 38.9M | -13% |
| minimum.json | 11 | ✅ | 57.0M | ✅ | 47.0M | -18% |
| multipleOf.json | 10 | ✅ | 54.9M | ✅ | 22.9M | 🟢 **-58%** |
| not.json | 40 | ✅ | 55.4M | ✅ | 37.0M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 46.5M | ✅ | 10.4M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 36.8M | ✅ | 38.6M | +5% |
| patternProperties.json | 23 | ✅ | 15.3M | ✅ | 7.3M | 🟢 **-52%** |
| prefixItems.json | 11 | ✅ | 54.4M | ✅ | 49.4M | -9% |
| properties.json | 21 | ✅ | 25.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 26.4M | ✅ | 13.8M | 🟢 **-48%** |
| ref.json | 71 | ✅ | 21.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 22.7M | ✅ | 22.5M | -1% |
| required.json | 9 | ✅ | 51.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 53.6M | ✅ | 33.1M | 🟢 **-38%** |
| unevaluatedItems.json | 47 | ✅ | 21.2M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.5M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.6M | ✅ | 13.8M | 🟢 **-46%** |
| vocabulary.json | 2 | ✅ | 58.1M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 49.3M | ✅ | 12.9M | 🟢 **-74%** |
| optional/bignum.json | 9 | ✅ | 51.6M | ✅ | 30.7M | 🟢 **-41%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 42.4M | ✅ | 33.8M | 🟢 **-20%** |
| optional/ecmascript-regex.json | 74 | ✅ | 15.5M | ✅ | 16.6M | +7% |
| optional/format/date-time.json | 26 | ✅ | 24.4M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.0M | ✅ | 7.8M | -3% |
| optional/format/idn-email.json | 10 | ✅ | 15.9M | ✅ | 79K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 38.1M | ✅ | 31.0M | -19% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.1M | ✅ | 24.5M | -16% |
| optional/format/regex.json | 8 | ✅ | 57.0M | ✅ | 844K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.2M | ✅ | 29.9M | -17% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.5M | -14% |
| optional/format/unknown.json | 7 | ✅ | 64.7M | ✅ | 51.6M | 🟢 **-20%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 9.3M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 15.1M | ✅ | 15.6M | +3% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.4M | 🟢 **-30%** |
| optional/format/uuid.json | 22 | ✅ | 14.9M | ✅ | 15.0M | +1% |
| optional/id.json | 3 | ✅ | 32.6M | ✅ | 13.9M | 🟢 **-57%** |
| optional/no-schema.json | 3 | ✅ | 51.9M | ✅ | 43.9M | -16% |
| optional/non-bmp-regex.json | 12 | ✅ | 22.3M | ✅ | 11.3M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 39.6M | ✅ | 41.3M | +4% |

