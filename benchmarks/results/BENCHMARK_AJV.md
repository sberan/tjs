# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.6M | ⚠️ 31/38 | 707 | 11.3M | 🟢 **-54%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 25.2M | ⚠️ 46/49 | 1025 | 13.0M | 🟢 **-48%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.4M | ⚠️ 51/54 | 1221 | 11.6M | 🟢 **-48%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 19.4M | ⚠️ 62/69 | 1399 | 5.7M | 🟢 **-70%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 22.3M | ⚠️ 61/68 | 1394 | 5.8M | 🟢 **-74%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 22.1M | ⚠️ 251/278 | 5746 | 7.9M | 🟢 **-65%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.89x faster (45 ns vs 130 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 48.0M | ✅ | 21.6M | 🟢 **-55%** |
| additionalProperties.json | 16 | ✅ | 26.7M | ✅ | 18.2M | 🟢 **-32%** |
| allOf.json | 27 | ✅ | 42.0M | ✅ | 10.9M | 🟢 **-74%** |
| anyOf.json | 15 | ✅ | 52.3M | ✅ | 15.4M | 🟢 **-71%** |
| default.json | 7 | ✅ | 47.9M | ✅ | 46.9M | -2% |
| dependencies.json | 29 | ✅ | 29.0M | ✅ | 29.0M | 0% |
| enum.json | 49 | ✅ | 34.2M | ✅ | 20.4M | 🟢 **-40%** |
| format.json | 36 | ✅ | 52.2M | ✅ | 43.2M | -17% |
| infinite-loop-detection.json | 2 | ✅ | 36.7M | ✅ | 34.5M | -6% |
| items.json | 21 | ✅ | 27.3M | ✅ | 14.0M | 🟢 **-49%** |
| maxItems.json | 4 | ✅ | 65.2M | ✅ | 48.3M | 🟢 **-26%** |
| maxLength.json | 5 | ✅ | 51.9M | ✅ | 45.3M | -13% |
| maxProperties.json | 8 | ✅ | 47.8M | ✅ | 38.5M | -19% |
| maximum.json | 8 | ✅ | 58.6M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 64.0M | ✅ | 45.2M | 🟢 **-29%** |
| minLength.json | 5 | ✅ | 51.1M | ✅ | 43.6M | -15% |
| minProperties.json | 6 | ✅ | 51.3M | ✅ | 42.5M | -17% |
| minimum.json | 11 | ✅ | 61.2M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 56.3M | ✅ | 23.0M | 🟢 **-59%** |
| not.json | 20 | ✅ | 60.3M | ✅ | 36.4M | 🟢 **-40%** |
| oneOf.json | 23 | ✅ | 49.8M | ✅ | 10.4M | 🟢 **-79%** |
| pattern.json | 9 | ✅ | 39.7M | ✅ | 39.6M | 0% |
| patternProperties.json | 18 | ✅ | 16.8M | ✅ | 7.0M | 🟢 **-58%** |
| properties.json | 17 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 30.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.1M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 52.7M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 60.0M | ✅ | 35.9M | 🟢 **-40%** |
| uniqueItems.json | 69 | ✅ | 22.7M | ✅ | 17.9M | 🟢 **-21%** |
| optional/bignum.json | 7 | ✅ | 53.6M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 16.2M | -1% |
| optional/format/date-time.json | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 22.6M | 🔴 **+26%** |
| optional/format/ipv4.json | 16 | ✅ | 39.3M | ✅ | 27.9M | 🟢 **-29%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 54.8M | -18% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.9M | ✅ | 12.9M | 🟢 **-38%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.1M | ✅ | 39.6M | 🔴 **+46%** |
| additionalProperties.json | 16 | ✅ | 26.0M | ✅ | 18.3M | 🟢 **-30%** |
| allOf.json | 30 | ✅ | 43.3M | ✅ | 11.7M | 🟢 **-73%** |
| anyOf.json | 18 | ✅ | 52.1M | ✅ | 13.6M | 🟢 **-74%** |
| boolean_schema.json | 18 | ✅ | 60.9M | ✅ | 40.2M | 🟢 **-34%** |
| const.json | 54 | ✅ | 48.9M | ✅ | 18.7M | 🟢 **-62%** |
| contains.json | 19 | ✅ | 46.6M | ✅ | 8.4M | 🟢 **-82%** |
| default.json | 7 | ✅ | 43.3M | ✅ | 44.2M | +2% |
| definitions.json | 2 | ✅ | 13.1M | ✅ | 1.5M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 30.5M | ✅ | 28.6M | -6% |
| enum.json | 45 | ✅ | 34.5M | ✅ | 20.9M | 🟢 **-40%** |
| exclusiveMaximum.json | 4 | ✅ | 52.4M | ✅ | 42.0M | -20% |
| exclusiveMinimum.json | 4 | ✅ | 54.8M | ✅ | 42.6M | 🟢 **-22%** |
| format.json | 54 | ✅ | 46.7M | ✅ | 43.3M | -7% |
| infinite-loop-detection.json | 2 | ✅ | 34.8M | ✅ | 37.8M | +8% |
| items.json | 28 | ✅ | 26.0M | ✅ | 19.1M | 🟢 **-26%** |
| maxItems.json | 6 | ✅ | 57.0M | ✅ | 47.5M | -17% |
| maxLength.json | 7 | ✅ | 48.0M | ✅ | 44.2M | -8% |
| maxProperties.json | 10 | ✅ | 43.4M | ✅ | 36.6M | -16% |
| maximum.json | 8 | ✅ | 57.6M | ✅ | 46.4M | -20% |
| minItems.json | 6 | ✅ | 54.8M | ✅ | 48.1M | -12% |
| minLength.json | 7 | ✅ | 47.7M | ✅ | 43.2M | -9% |
| minProperties.json | 8 | ✅ | 46.1M | ✅ | 39.9M | -13% |
| minimum.json | 11 | ✅ | 57.7M | ✅ | 48.2M | -16% |
| multipleOf.json | 10 | ✅ | 61.1M | ✅ | 23.2M | 🟢 **-62%** |
| not.json | 38 | ✅ | 60.4M | ✅ | 39.3M | 🟢 **-35%** |
| oneOf.json | 27 | ✅ | 45.5M | ✅ | 10.8M | 🟢 **-76%** |
| pattern.json | 9 | ✅ | 41.7M | ✅ | 39.4M | -6% |
| patternProperties.json | 23 | ✅ | 15.1M | ✅ | 9.4M | 🟢 **-38%** |
| properties.json | 21 | ✅ | 27.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.1M | ✅ | 14.4M | 🟢 **-52%** |
| ref.json | 65 | ✅ | 22.8M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 30.5M | ✅ | 17.0M | 🟢 **-44%** |
| required.json | 9 | ✅ | 50.3M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 59.0M | ✅ | 35.4M | 🟢 **-40%** |
| uniqueItems.json | 69 | ✅ | 23.9M | ✅ | 17.8M | 🟢 **-26%** |
| optional/bignum.json | 9 | ✅ | 53.8M | ✅ | 29.6M | 🟢 **-45%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.2M | ✅ | 17.3M | +7% |
| optional/format/date-time.json | 26 | ✅ | 21.5M | ✅ | 2.9M | 🟢 **-86%** |
| optional/format/email.json | 17 | ✅ | 17.2M | ✅ | 20.6M | +20% |
| optional/format/ipv4.json | 16 | ✅ | 37.5M | ✅ | 29.6M | 🟢 **-21%** |
| optional/format/ipv6.json | 40 | ✅ | 11.3M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.7M | ✅ | 24.0M | -16% |
| optional/format/unknown.json | 7 | ✅ | 63.9M | ✅ | 54.4M | -15% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 9.1M | -5% |
| optional/format/uri-template.json | 10 | ✅ | 15.9M | ✅ | 15.2M | -5% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.3M | 🟢 **-28%** |
| optional/id.json | 7 | ✅ | 37.9M | ✅ | 11.4M | 🟢 **-70%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.6M | ✅ | 13.1M | 🟢 **-39%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 25.2M | ✅ | 34.8M | 🔴 **+38%** |
| additionalProperties.json | 16 | ✅ | 25.6M | ✅ | 17.7M | 🟢 **-31%** |
| allOf.json | 30 | ✅ | 41.4M | ✅ | 10.8M | 🟢 **-74%** |
| anyOf.json | 18 | ✅ | 52.6M | ✅ | 13.5M | 🟢 **-74%** |
| boolean_schema.json | 18 | ✅ | 48.9M | ✅ | 46.9M | -4% |
| const.json | 54 | ✅ | 52.0M | ✅ | 18.8M | 🟢 **-64%** |
| contains.json | 21 | ✅ | 53.5M | ✅ | 15.5M | 🟢 **-71%** |
| default.json | 7 | ✅ | 46.2M | ✅ | 46.5M | +1% |
| definitions.json | 2 | ✅ | 13.3M | ✅ | 1.4M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 29.8M | ✅ | 30.9M | +4% |
| enum.json | 45 | ✅ | 35.3M | ✅ | 21.1M | 🟢 **-40%** |
| exclusiveMaximum.json | 4 | ✅ | 57.9M | ✅ | 43.1M | 🟢 **-26%** |
| exclusiveMinimum.json | 4 | ✅ | 53.9M | ✅ | 41.3M | 🟢 **-23%** |
| format.json | 102 | ✅ | 48.4M | ✅ | 43.6M | -10% |
| if-then-else.json | 26 | ✅ | 56.5M | ✅ | 34.6M | 🟢 **-39%** |
| infinite-loop-detection.json | 2 | ✅ | 37.4M | ✅ | 37.7M | +1% |
| items.json | 28 | ✅ | 26.6M | ✅ | 19.1M | 🟢 **-28%** |
| maxItems.json | 6 | ✅ | 57.8M | ✅ | 49.5M | -15% |
| maxLength.json | 7 | ✅ | 49.2M | ✅ | 45.5M | -8% |
| maxProperties.json | 10 | ✅ | 44.1M | ✅ | 38.7M | -12% |
| maximum.json | 8 | ✅ | 59.0M | ✅ | 48.8M | -17% |
| minItems.json | 6 | ✅ | 57.9M | ✅ | 48.8M | -16% |
| minLength.json | 7 | ✅ | 48.9M | ✅ | 43.3M | -12% |
| minProperties.json | 8 | ✅ | 46.1M | ✅ | 38.8M | -16% |
| minimum.json | 11 | ✅ | 59.8M | ✅ | 48.2M | -19% |
| multipleOf.json | 10 | ✅ | 56.7M | ✅ | 22.9M | 🟢 **-60%** |
| not.json | 38 | ✅ | 56.9M | ✅ | 40.3M | 🟢 **-29%** |
| oneOf.json | 27 | ✅ | 48.0M | ✅ | 10.9M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 40.3M | ✅ | 39.7M | -2% |
| patternProperties.json | 23 | ✅ | 15.9M | ✅ | 9.5M | 🟢 **-40%** |
| properties.json | 21 | ✅ | 25.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.8M | ✅ | 14.0M | 🟢 **-53%** |
| ref.json | 73 | ✅ | 28.5M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 20.9M | ✅ | 16.6M | 🟢 **-21%** |
| required.json | 9 | ✅ | 51.2M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 55.1M | ✅ | 36.1M | 🟢 **-35%** |
| uniqueItems.json | 69 | ✅ | 23.7M | ✅ | 17.6M | 🟢 **-26%** |
| optional/bignum.json | 9 | ✅ | 53.7M | ✅ | 31.0M | 🟢 **-42%** |
| optional/ecmascript-regex.json | 74 | ✅ | 15.6M | ✅ | 16.3M | +5% |
| optional/format/date-time.json | 26 | ✅ | 24.7M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.7M | ✅ | 8.0M | -7% |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 22.1M | 🔴 **+23%** |
| optional/format/ipv4.json | 16 | ✅ | 32.4M | ✅ | 31.0M | -5% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.9M | ✅ | 25.4M | -15% |
| optional/format/regex.json | 8 | ✅ | 58.0M | ✅ | 847K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.9M | ✅ | 30.6M | -17% |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.5M | -15% |
| optional/format/unknown.json | 7 | ✅ | 65.4M | ✅ | 52.2M | 🟢 **-20%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 9.1M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 15.4M | ✅ | 15.0M | -3% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.2M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ | 42.7M | ✅ | 18.1M | 🟢 **-58%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.2M | ✅ | 13.3M | 🟢 **-37%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 41.1M | ✅ | 39.3M | -4% |
| additionalProperties.json | 21 | ✅ | 21.7M | ✅ | 12.3M | 🟢 **-44%** |
| allOf.json | 30 | ✅ | 39.5M | ✅ | 10.3M | 🟢 **-74%** |
| anchor.json | 8 | ✅ | 49.7M | ✅ | 42.9M | -14% |
| anyOf.json | 18 | ✅ | 49.4M | ✅ | 11.3M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 57.4M | ✅ | 44.3M | 🟢 **-23%** |
| const.json | 54 | ✅ | 46.2M | ✅ | 20.2M | 🟢 **-56%** |
| contains.json | 21 | ✅ | 43.2M | ✅ | 9.0M | 🟢 **-79%** |
| content.json | 18 | ✅ | 61.5M | ✅ | 55.3M | -10% |
| default.json | 7 | ✅ | 43.2M | ✅ | 47.3M | +9% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 714K | 🟢 **-62%** |
| dependentRequired.json | 20 | ✅ | 35.6M | ✅ | 40.7M | +14% |
| dependentSchemas.json | 20 | ✅ | 40.3M | ✅ | 35.5M | -12% |
| enum.json | 45 | ✅ | 33.0M | ✅ | 20.5M | 🟢 **-38%** |
| exclusiveMaximum.json | 4 | ✅ | 53.1M | ✅ | 43.1M | -19% |
| exclusiveMinimum.json | 4 | ✅ | 49.8M | ✅ | 42.0M | -16% |
| format.json | 114 | ✅ | 65.5M | ✅ | 39.7M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 50.9M | ✅ | 37.3M | 🟢 **-27%** |
| infinite-loop-detection.json | 2 | ✅ | 32.8M | ✅ | 37.4M | +14% |
| items.json | 28 | ✅ | 25.9M | ✅ | 18.5M | 🟢 **-29%** |
| maxContains.json | 12 | ✅ | 54.5M | ✅ | 34.1M | 🟢 **-38%** |
| maxItems.json | 6 | ✅ | 54.8M | ✅ | 48.6M | -11% |
| maxLength.json | 7 | ✅ | 42.5M | ✅ | 43.8M | +3% |
| maxProperties.json | 10 | ✅ | 41.6M | ✅ | 36.8M | -11% |
| maximum.json | 8 | ✅ | 55.1M | ✅ | 49.0M | -11% |
| minContains.json | 28 | ✅ | 50.7M | ✅ | 24.1M | 🟢 **-52%** |
| minItems.json | 6 | ✅ | 54.8M | ✅ | 47.3M | -14% |
| minLength.json | 7 | ✅ | 49.4M | ✅ | 43.9M | -11% |
| minProperties.json | 8 | ✅ | 43.4M | ✅ | 37.8M | -13% |
| minimum.json | 11 | ✅ | 54.4M | ✅ | 46.6M | -14% |
| multipleOf.json | 10 | ✅ | 52.7M | ✅ | 22.3M | 🟢 **-58%** |
| not.json | 40 | ✅ | 51.5M | ✅ | 35.5M | 🟢 **-31%** |
| oneOf.json | 27 | ✅ | 41.0M | ✅ | 10.4M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 36.9M | ✅ | 39.8M | +8% |
| patternProperties.json | 23 | ✅ | 15.5M | ✅ | 7.2M | 🟢 **-53%** |
| properties.json | 21 | ✅ | 27.2M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 27.4M | ✅ | 13.8M | 🟢 **-50%** |
| recursiveRef.json | 31 | ✅ | 5.3M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.5M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 23.1M | ✅ | 16.8M | 🟢 **-27%** |
| required.json | 9 | ✅ | 49.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 52.4M | ✅ | 32.8M | 🟢 **-37%** |
| unevaluatedItems.json | 51 | ✅ | 14.9M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 11.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 21.6M | ✅ | 17.3M | -20% |
| vocabulary.json | 2 | ✅ | 55.2M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 47.7M | ✅ | 12.1M | 🟢 **-75%** |
| optional/bignum.json | 9 | ✅ | 47.4M | ✅ | 31.3M | 🟢 **-34%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 36.2M | ✅ | 32.3M | -11% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.1M | ✅ | 16.5M | +3% |
| optional/format/date-time.json | 26 | ✅ | 23.8M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.1M | ✅ | 8.2M | +1% |
| optional/format/email.json | 17 | ✅ | 17.3M | ✅ | 22.0M | 🔴 **+27%** |
| optional/format/idn-email.json | 10 | ✅ | 15.9M | ✅ | 77K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 32.3M | ✅ | 29.5M | -9% |
| optional/format/ipv6.json | 40 | ✅ | 11.4M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.1M | ✅ | 25.4M | -9% |
| optional/format/regex.json | 8 | ✅ | 55.6M | ✅ | 849K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 30.7M | ✅ | 29.6M | -4% |
| optional/format/time.json | 46 | ✅ | 6.1M | ✅ | 5.6M | -8% |
| optional/format/unknown.json | 7 | ✅ | 63.6M | ✅ | 55.5M | -13% |
| optional/format/uri-reference.json | 15 | ✅ | 9.1M | ✅ | 9.3M | +2% |
| optional/format/uri-template.json | 10 | ✅ | 15.7M | ✅ | 15.4M | -2% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.3M | 🟢 **-29%** |
| optional/format/uuid.json | 22 | ✅ | 14.4M | ✅ | 14.5M | +1% |
| optional/id.json | 3 | ✅ | 31.1M | ✅ | 12.0M | 🟢 **-61%** |
| optional/no-schema.json | 3 | ✅ | 49.6M | ✅ | 44.5M | -10% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.6M | ✅ | 11.3M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 35.5M | ✅ | 39.6M | +12% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 26.3M | ✅ | 17.3M | 🟢 **-34%** |
| allOf.json | 30 | ✅ | 41.5M | ✅ | 11.8M | 🟢 **-72%** |
| anchor.json | 8 | ✅ | 41.4M | ✅ | 35.5M | -14% |
| anyOf.json | 18 | ✅ | 44.9M | ✅ | 11.4M | 🟢 **-75%** |
| boolean_schema.json | 18 | ✅ | 54.3M | ✅ | 38.2M | 🟢 **-30%** |
| const.json | 54 | ✅ | 55.0M | ✅ | 18.7M | 🟢 **-66%** |
| contains.json | 21 | ✅ | 48.6M | ✅ | 13.6M | 🟢 **-72%** |
| content.json | 18 | ✅ | 63.5M | ✅ | 56.1M | -12% |
| default.json | 7 | ✅ | 44.7M | ✅ | 41.9M | -6% |
| defs.json | 2 | ✅ | 2.0M | ✅ | 831K | 🟢 **-58%** |
| dependentRequired.json | 20 | ✅ | 34.5M | ✅ | 36.3M | +5% |
| dependentSchemas.json | 20 | ✅ | 39.3M | ✅ | 33.0M | -16% |
| dynamicRef.json | 4 | ✅ | 6.8M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 36.7M | ✅ | 20.6M | 🟢 **-44%** |
| exclusiveMaximum.json | 4 | ✅ | 58.9M | ✅ | 36.3M | 🟢 **-38%** |
| exclusiveMinimum.json | 4 | ✅ | 60.9M | ✅ | 35.4M | 🟢 **-42%** |
| format.json | 133 | ✅ | 69.7M | ✅ | 51.2M | 🟢 **-26%** |
| if-then-else.json | 26 | ✅ | 50.1M | ✅ | 33.5M | 🟢 **-33%** |
| infinite-loop-detection.json | 2 | ✅ | 33.3M | ✅ | 29.9M | -10% |
| items.json | 29 | ✅ | 25.8M | ✅ | 24.4M | -5% |
| maxContains.json | 12 | ✅ | 50.7M | ✅ | 28.6M | 🟢 **-44%** |
| maxItems.json | 6 | ✅ | 55.6M | ✅ | 41.6M | 🟢 **-25%** |
| maxLength.json | 7 | ✅ | 48.3M | ✅ | 40.1M | -17% |
| maxProperties.json | 10 | ✅ | 42.1M | ✅ | 32.3M | 🟢 **-23%** |
| maximum.json | 8 | ✅ | 59.0M | ✅ | 42.9M | 🟢 **-27%** |
| minContains.json | 28 | ✅ | 49.5M | ✅ | 22.5M | 🟢 **-55%** |
| minItems.json | 6 | ✅ | 57.5M | ✅ | 42.6M | 🟢 **-26%** |
| minLength.json | 7 | ✅ | 47.4M | ✅ | 38.5M | -19% |
| minProperties.json | 8 | ✅ | 45.0M | ✅ | 36.6M | -19% |
| minimum.json | 11 | ✅ | 58.8M | ✅ | 43.7M | 🟢 **-26%** |
| multipleOf.json | 10 | ✅ | 54.8M | ✅ | 21.1M | 🟢 **-62%** |
| not.json | 40 | ✅ | 49.3M | ✅ | 31.8M | 🟢 **-35%** |
| oneOf.json | 27 | ✅ | 46.6M | ✅ | 10.2M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 38.4M | ✅ | 33.7M | -12% |
| patternProperties.json | 23 | ✅ | 14.1M | ✅ | 7.1M | 🟢 **-50%** |
| prefixItems.json | 11 | ✅ | 52.1M | ✅ | 41.3M | 🟢 **-21%** |
| properties.json | 21 | ✅ | 24.2M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 27.7M | ✅ | 12.4M | 🟢 **-55%** |
| ref.json | 71 | ✅ | 20.6M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 27.4M | ✅ | 15.1M | 🟢 **-45%** |
| required.json | 9 | ✅ | 43.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 46.6M | ✅ | 31.5M | 🟢 **-32%** |
| unevaluatedItems.json | 47 | ✅ | 21.6M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.6M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.1M | ✅ | 13.6M | 🟢 **-44%** |
| vocabulary.json | 2 | ✅ | 59.2M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 47.9M | ✅ | 9.2M | 🟢 **-81%** |
| optional/bignum.json | 9 | ✅ | 48.5M | ✅ | 25.0M | 🟢 **-48%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 38.7M | ✅ | 32.6M | -16% |
| optional/ecmascript-regex.json | 74 | ✅ | 18.4M | ✅ | 17.0M | -7% |
| optional/format/date-time.json | 26 | ✅ | 24.9M | ✅ | 3.1M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 9.2M | ✅ | 8.4M | -9% |
| optional/format/idn-email.json | 10 | ✅ | 16.4M | ✅ | 78K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 33.8M | ✅ | 25.5M | 🟢 **-25%** |
| optional/format/ipv6.json | 40 | ✅ | 12.6M | ✅ | 3.1M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.5M | ✅ | 23.4M | 🟢 **-20%** |
| optional/format/regex.json | 8 | ✅ | 58.1M | ✅ | 815K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 35.8M | ✅ | 25.7M | 🟢 **-28%** |
| optional/format/time.json | 46 | ✅ | 6.6M | ✅ | 5.8M | -13% |
| optional/format/unknown.json | 7 | ✅ | 64.8M | ✅ | 44.7M | 🟢 **-31%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.1M | ✅ | 9.4M | -7% |
| optional/format/uri-template.json | 10 | ✅ | 16.8M | ✅ | 16.6M | -1% |
| optional/format/uri.json | 36 | ✅ | 7.0M | ✅ | 4.5M | 🟢 **-36%** |
| optional/format/uuid.json | 22 | ✅ | 15.5M | ✅ | 14.1M | -9% |
| optional/id.json | 3 | ✅ | 30.2M | ✅ | 11.3M | 🟢 **-63%** |
| optional/no-schema.json | 3 | ✅ | 58.5M | ✅ | 38.2M | 🟢 **-35%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.3M | ✅ | 10.9M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.1M | ✅ | 37.1M | -14% |

