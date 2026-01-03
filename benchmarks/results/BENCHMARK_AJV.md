# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.4M | ⚠️ 31/38 | 707 | 11.5M | 🟢 **-53%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 24.4M | ⚠️ 46/49 | 1025 | 13.5M | 🟢 **-45%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.0M | ⚠️ 51/54 | 1221 | 11.7M | 🟢 **-47%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.0M | ⚠️ 62/69 | 1399 | 5.0M | 🟢 **-75%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.2M | ⚠️ 61/68 | 1394 | 5.9M | 🟢 **-72%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 21.8M | ⚠️ 251/278 | 5746 | 7.6M | 🟢 **-65%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.99x faster (46 ns vs 137 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 58.3M | ✅ | 41.2M | 🟢 **-29%** |
| additionalProperties.json | 16 | ✅ | 25.7M | ✅ | 18.2M | 🟢 **-29%** |
| allOf.json | 27 | ✅ | 45.3M | ✅ | 10.5M | 🟢 **-77%** |
| anyOf.json | 15 | ✅ | 47.6M | ✅ | 12.5M | 🟢 **-74%** |
| default.json | 7 | ✅ | 48.7M | ✅ | 47.0M | -3% |
| dependencies.json | 29 | ✅ | 28.7M | ✅ | 28.6M | 0% |
| enum.json | 49 | ✅ | 34.1M | ✅ | 22.4M | 🟢 **-34%** |
| format.json | 36 | ✅ | 49.2M | ✅ | 52.3M | +6% |
| infinite-loop-detection.json | 2 | ✅ | 19.8M | ✅ | 34.4M | 🔴 **+73%** |
| items.json | 21 | ✅ | 24.5M | ✅ | 15.9M | 🟢 **-35%** |
| maxItems.json | 4 | ✅ | 64.2M | ✅ | 51.6M | -20% |
| maxLength.json | 5 | ✅ | 51.8M | ✅ | 45.8M | -12% |
| maxProperties.json | 8 | ✅ | 47.7M | ✅ | 38.8M | -19% |
| maximum.json | 8 | ✅ | 60.3M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 64.1M | ✅ | 48.0M | 🟢 **-25%** |
| minLength.json | 5 | ✅ | 50.0M | ✅ | 41.9M | -16% |
| minProperties.json | 6 | ✅ | 50.0M | ✅ | 42.1M | -16% |
| minimum.json | 11 | ✅ | 66.0M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 58.2M | ✅ | 22.7M | 🟢 **-61%** |
| not.json | 20 | ✅ | 60.5M | ✅ | 33.9M | 🟢 **-44%** |
| oneOf.json | 23 | ✅ | 42.3M | ✅ | 10.1M | 🟢 **-76%** |
| pattern.json | 9 | ✅ | 38.9M | ✅ | 40.0M | +3% |
| patternProperties.json | 18 | ✅ | 15.6M | ✅ | 9.2M | 🟢 **-41%** |
| properties.json | 17 | ✅ | 24.9M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 33.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.3M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 52.1M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 47.4M | ✅ | 35.6M | 🟢 **-25%** |
| uniqueItems.json | 69 | ✅ | 24.1M | ✅ | 17.2M | 🟢 **-29%** |
| optional/bignum.json | 7 | ✅ | 52.0M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 17.2M | ✅ | 16.8M | -2% |
| optional/format/date-time.json | 26 | ✅ | 23.5M | ✅ | 2.8M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 17.2M | ✅ | 20.7M | 🔴 **+21%** |
| optional/format/ipv4.json | 16 | ✅ | 32.1M | ✅ | 30.4M | -5% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 66.6M | ✅ | 55.5M | -17% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.4M | 🟢 **-31%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.5M | ✅ | 13.3M | 🟢 **-41%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 52.3M | ✅ | 37.7M | 🟢 **-28%** |
| additionalProperties.json | 16 | ✅ | 26.5M | ✅ | 17.2M | 🟢 **-35%** |
| allOf.json | 30 | ✅ | 37.0M | ✅ | 17.9M | 🟢 **-52%** |
| anyOf.json | 18 | ✅ | 46.1M | ✅ | 12.6M | 🟢 **-73%** |
| boolean_schema.json | 18 | ✅ | 53.1M | ✅ | 42.8M | -19% |
| const.json | 54 | ✅ | 49.6M | ✅ | 19.7M | 🟢 **-60%** |
| contains.json | 19 | ✅ | 52.5M | ✅ | 14.5M | 🟢 **-72%** |
| default.json | 7 | ✅ | 43.8M | ✅ | 46.3M | +6% |
| definitions.json | 2 | ✅ | 13.5M | ✅ | 1.5M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 28.3M | ✅ | 31.6M | +12% |
| enum.json | 45 | ✅ | 32.8M | ✅ | 23.1M | 🟢 **-29%** |
| exclusiveMaximum.json | 4 | ✅ | 56.0M | ✅ | 42.3M | 🟢 **-24%** |
| exclusiveMinimum.json | 4 | ✅ | 55.5M | ✅ | 41.7M | 🟢 **-25%** |
| format.json | 54 | ✅ | 41.8M | ✅ | 45.3M | +8% |
| infinite-loop-detection.json | 2 | ✅ | 17.7M | ✅ | 32.9M | 🔴 **+86%** |
| items.json | 28 | ✅ | 25.6M | ✅ | 27.5M | +8% |
| maxItems.json | 6 | ✅ | 50.1M | ✅ | 45.8M | -8% |
| maxLength.json | 7 | ✅ | 43.9M | ✅ | 41.7M | -5% |
| maxProperties.json | 10 | ✅ | 41.6M | ✅ | 36.6M | -12% |
| maximum.json | 8 | ✅ | 51.6M | ✅ | 47.4M | -8% |
| minItems.json | 6 | ✅ | 50.2M | ✅ | 47.1M | -6% |
| minLength.json | 7 | ✅ | 43.9M | ✅ | 43.4M | -1% |
| minProperties.json | 8 | ✅ | 42.5M | ✅ | 39.0M | -8% |
| minimum.json | 11 | ✅ | 61.7M | ✅ | 48.3M | 🟢 **-22%** |
| multipleOf.json | 10 | ✅ | 58.3M | ✅ | 21.7M | 🟢 **-63%** |
| not.json | 38 | ✅ | 51.9M | ✅ | 34.6M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 49.4M | ✅ | 10.3M | 🟢 **-79%** |
| pattern.json | 9 | ✅ | 37.9M | ✅ | 39.8M | +5% |
| patternProperties.json | 23 | ✅ | 16.1M | ✅ | 9.1M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 26.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.8M | ✅ | 14.9M | 🟢 **-51%** |
| ref.json | 65 | ✅ | 22.4M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 27.0M | ✅ | 23.6M | -13% |
| required.json | 9 | ✅ | 53.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 47.7M | ✅ | 36.8M | 🟢 **-23%** |
| uniqueItems.json | 69 | ✅ | 24.4M | ✅ | 17.6M | 🟢 **-28%** |
| optional/bignum.json | 9 | ✅ | 52.3M | ✅ | 29.6M | 🟢 **-43%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.2M | ✅ | 16.9M | -2% |
| optional/format/date-time.json | 26 | ✅ | 21.2M | ✅ | 2.8M | 🟢 **-87%** |
| optional/format/email.json | 17 | ✅ | 15.9M | ✅ | 21.8M | 🔴 **+38%** |
| optional/format/ipv4.json | 16 | ✅ | 27.6M | ✅ | 29.0M | +5% |
| optional/format/ipv6.json | 40 | ✅ | 11.4M | ✅ | 2.8M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 19.3M | ✅ | 24.6M | 🔴 **+27%** |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 53.6M | 🟢 **-20%** |
| optional/format/uri-reference.json | 15 | ✅ | 8.6M | ✅ | 8.9M | +4% |
| optional/format/uri-template.json | 10 | ✅ | 14.2M | ✅ | 15.5M | +9% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.4M | 🟢 **-29%** |
| optional/id.json | 7 | ✅ | 39.3M | ✅ | 11.9M | 🟢 **-70%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.4M | ✅ | 13.4M | 🟢 **-34%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 50.4M | ✅ | 38.5M | 🟢 **-24%** |
| additionalProperties.json | 16 | ✅ | 26.9M | ✅ | 17.7M | 🟢 **-34%** |
| allOf.json | 30 | ✅ | 39.2M | ✅ | 18.5M | 🟢 **-53%** |
| anyOf.json | 18 | ✅ | 45.4M | ✅ | 12.6M | 🟢 **-72%** |
| boolean_schema.json | 18 | ✅ | 49.0M | ✅ | 40.2M | -18% |
| const.json | 54 | ✅ | 53.7M | ✅ | 21.0M | 🟢 **-61%** |
| contains.json | 21 | ✅ | 51.2M | ✅ | 9.0M | 🟢 **-82%** |
| default.json | 7 | ✅ | 43.2M | ✅ | 45.4M | +5% |
| definitions.json | 2 | ✅ | 13.4M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 29.2M | ✅ | 29.3M | +0% |
| enum.json | 45 | ✅ | 33.9M | ✅ | 23.3M | 🟢 **-31%** |
| exclusiveMaximum.json | 4 | ✅ | 55.5M | ✅ | 42.0M | 🟢 **-24%** |
| exclusiveMinimum.json | 4 | ✅ | 55.1M | ✅ | 42.3M | 🟢 **-23%** |
| format.json | 102 | ✅ | 43.5M | ✅ | 42.8M | -2% |
| if-then-else.json | 26 | ✅ | 55.4M | ✅ | 34.0M | 🟢 **-39%** |
| infinite-loop-detection.json | 2 | ✅ | 33.8M | ✅ | 33.0M | -2% |
| items.json | 28 | ✅ | 24.9M | ✅ | 27.0M | +8% |
| maxItems.json | 6 | ✅ | 47.8M | ✅ | 47.2M | -1% |
| maxLength.json | 7 | ✅ | 44.2M | ✅ | 41.3M | -7% |
| maxProperties.json | 10 | ✅ | 39.7M | ✅ | 37.0M | -7% |
| maximum.json | 8 | ✅ | 52.1M | ✅ | 47.5M | -9% |
| minItems.json | 6 | ✅ | 44.0M | ✅ | 48.0M | +9% |
| minLength.json | 7 | ✅ | 43.6M | ✅ | 43.6M | +0% |
| minProperties.json | 8 | ✅ | 42.7M | ✅ | 39.0M | -9% |
| minimum.json | 11 | ✅ | 56.1M | ✅ | 46.0M | -18% |
| multipleOf.json | 10 | ✅ | 57.9M | ✅ | 22.2M | 🟢 **-62%** |
| not.json | 38 | ✅ | 54.7M | ✅ | 36.6M | 🟢 **-33%** |
| oneOf.json | 27 | ✅ | 39.0M | ✅ | 10.9M | 🟢 **-72%** |
| pattern.json | 9 | ✅ | 37.9M | ✅ | 39.6M | +5% |
| patternProperties.json | 23 | ✅ | 15.2M | ✅ | 9.1M | 🟢 **-41%** |
| properties.json | 21 | ✅ | 25.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.9M | ✅ | 13.6M | 🟢 **-53%** |
| ref.json | 73 | ✅ | 27.4M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 28.9M | ✅ | 14.6M | 🟢 **-50%** |
| required.json | 9 | ✅ | 53.5M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 45.0M | ✅ | 35.3M | 🟢 **-22%** |
| uniqueItems.json | 69 | ✅ | 23.3M | ✅ | 16.9M | 🟢 **-28%** |
| optional/bignum.json | 9 | ✅ | 50.2M | ✅ | 31.3M | 🟢 **-38%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.9M | ✅ | 16.7M | -1% |
| optional/format/date-time.json | 26 | ✅ | 21.6M | ✅ | 2.8M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 8.3M | ✅ | 7.8M | -6% |
| optional/format/email.json | 17 | ✅ | 16.5M | ✅ | 19.5M | +18% |
| optional/format/ipv4.json | 16 | ✅ | 32.0M | ✅ | 30.6M | -5% |
| optional/format/ipv6.json | 40 | ✅ | 11.1M | ✅ | 2.7M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.6M | ✅ | 24.5M | -14% |
| optional/format/regex.json | 8 | ✅ | 57.3M | ✅ | 860K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 32.5M | ✅ | 29.7M | -9% |
| optional/format/time.json | 46 | ✅ | 6.6M | ✅ | 5.6M | -15% |
| optional/format/unknown.json | 7 | ✅ | 66.5M | ✅ | 54.9M | -17% |
| optional/format/uri-reference.json | 15 | ✅ | 8.8M | ✅ | 8.9M | +2% |
| optional/format/uri-template.json | 10 | ✅ | 14.5M | ✅ | 15.1M | +4% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.4M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 43.8M | ✅ | 21.2M | 🟢 **-52%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.5M | ✅ | 14.7M | 🟢 **-31%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 47.2M | ✅ | 35.5M | 🟢 **-25%** |
| additionalProperties.json | 21 | ✅ | 24.3M | ✅ | 13.2M | 🟢 **-46%** |
| allOf.json | 30 | ✅ | 40.3M | ✅ | 18.1M | 🟢 **-55%** |
| anchor.json | 8 | ✅ | 45.9M | ✅ | 41.8M | -9% |
| anyOf.json | 18 | ✅ | 50.9M | ✅ | 12.6M | 🟢 **-75%** |
| boolean_schema.json | 18 | ✅ | 49.5M | ✅ | 43.7M | -12% |
| const.json | 54 | ✅ | 49.9M | ✅ | 20.9M | 🟢 **-58%** |
| contains.json | 21 | ✅ | 52.7M | ✅ | 15.9M | 🟢 **-70%** |
| content.json | 18 | ✅ | 65.7M | ✅ | 39.4M | 🟢 **-40%** |
| default.json | 7 | ✅ | 47.7M | ✅ | 46.9M | -2% |
| defs.json | 2 | ✅ | 1.8M | ✅ | 755K | 🟢 **-59%** |
| dependentRequired.json | 20 | ✅ | 39.9M | ✅ | 40.9M | +3% |
| dependentSchemas.json | 20 | ✅ | 43.2M | ✅ | 36.7M | -15% |
| enum.json | 45 | ✅ | 35.6M | ✅ | 23.7M | 🟢 **-33%** |
| exclusiveMaximum.json | 4 | ✅ | 66.8M | ✅ | 40.3M | 🟢 **-40%** |
| exclusiveMinimum.json | 4 | ✅ | 55.4M | ✅ | 42.8M | 🟢 **-23%** |
| format.json | 114 | ✅ | 68.9M | ✅ | 41.9M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 56.9M | ✅ | 35.9M | 🟢 **-37%** |
| infinite-loop-detection.json | 2 | ✅ | 20.3M | ✅ | 34.4M | 🔴 **+70%** |
| items.json | 28 | ✅ | 28.6M | ✅ | 19.4M | 🟢 **-32%** |
| maxContains.json | 12 | ✅ | 49.9M | ✅ | 33.0M | 🟢 **-34%** |
| maxItems.json | 6 | ✅ | 44.0M | ✅ | 47.9M | +9% |
| maxLength.json | 7 | ✅ | 42.5M | ✅ | 43.5M | +3% |
| maxProperties.json | 10 | ✅ | 39.7M | ✅ | 37.7M | -5% |
| maximum.json | 8 | ✅ | 65.5M | ✅ | 47.4M | 🟢 **-28%** |
| minContains.json | 28 | ✅ | 53.3M | ✅ | 33.7M | 🟢 **-37%** |
| minItems.json | 6 | ✅ | 49.6M | ✅ | 46.4M | -6% |
| minLength.json | 7 | ✅ | 43.4M | ✅ | 43.3M | 0% |
| minProperties.json | 8 | ✅ | 41.6M | ✅ | 37.0M | -11% |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 49.2M | -20% |
| multipleOf.json | 10 | ✅ | 58.3M | ✅ | 22.6M | 🟢 **-61%** |
| not.json | 40 | ✅ | 46.1M | ✅ | 33.1M | 🟢 **-28%** |
| oneOf.json | 27 | ✅ | 43.5M | ✅ | 10.9M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 37.1M | ✅ | 39.3M | +6% |
| patternProperties.json | 23 | ✅ | 14.7M | ✅ | 7.2M | 🟢 **-51%** |
| properties.json | 21 | ✅ | 25.3M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.5M | ✅ | 20.9M | 🟢 **-27%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 19.2M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 32.1M | ✅ | 16.1M | 🟢 **-50%** |
| required.json | 9 | ✅ | 53.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 52.5M | ✅ | 35.6M | 🟢 **-32%** |
| unevaluatedItems.json | 51 | ✅ | 15.7M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.0M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.7M | ✅ | 17.5M | 🟢 **-26%** |
| vocabulary.json | 2 | ✅ | 62.6M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 51.0M | ✅ | 12.9M | 🟢 **-75%** |
| optional/bignum.json | 9 | ✅ | 53.8M | ✅ | 29.5M | 🟢 **-45%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 37.7M | ✅ | 34.2M | -9% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.5M | ✅ | 16.6M | +0% |
| optional/format/date-time.json | 26 | ✅ | 22.2M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 8.3M | ✅ | 8.2M | -2% |
| optional/format/email.json | 17 | ✅ | 16.3M | ✅ | 21.0M | 🔴 **+29%** |
| optional/format/idn-email.json | 10 | ✅ | 16.0M | ✅ | 58K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 32.1M | ✅ | 30.6M | -5% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 24.0M | ✅ | 25.4M | +6% |
| optional/format/regex.json | 8 | ✅ | 52.9M | ✅ | 919K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 27.9M | ✅ | 30.7M | +10% |
| optional/format/time.json | 46 | ✅ | 6.5M | ✅ | 5.6M | -14% |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 55.0M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 8.8M | ✅ | 8.9M | +1% |
| optional/format/uri-template.json | 10 | ✅ | 14.5M | ✅ | 15.4M | +6% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.4M | 🟢 **-30%** |
| optional/format/uuid.json | 22 | ✅ | 13.9M | ✅ | 15.1M | +8% |
| optional/id.json | 3 | ✅ | 31.1M | ✅ | 13.5M | 🟢 **-57%** |
| optional/no-schema.json | 3 | ✅ | 42.6M | ✅ | 44.6M | +5% |
| optional/non-bmp-regex.json | 12 | ✅ | 19.2M | ✅ | 12.1M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 48.4M | ✅ | 41.6M | -14% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 24.9M | ✅ | 17.7M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 43.4M | ✅ | 18.6M | 🟢 **-57%** |
| anchor.json | 8 | ✅ | 48.1M | ✅ | 45.9M | -5% |
| anyOf.json | 18 | ✅ | 51.3M | ✅ | 12.8M | 🟢 **-75%** |
| boolean_schema.json | 18 | ✅ | 53.0M | ✅ | 44.9M | -15% |
| const.json | 54 | ✅ | 48.0M | ✅ | 21.0M | 🟢 **-56%** |
| contains.json | 21 | ✅ | 52.8M | ✅ | 15.6M | 🟢 **-71%** |
| content.json | 18 | ✅ | 66.1M | ✅ | 53.4M | -19% |
| default.json | 7 | ✅ | 48.4M | ✅ | 47.2M | -2% |
| defs.json | 2 | ✅ | 2.1M | ✅ | 853K | 🟢 **-60%** |
| dependentRequired.json | 20 | ✅ | 41.5M | ✅ | 41.1M | -1% |
| dependentSchemas.json | 20 | ✅ | 42.1M | ✅ | 36.7M | -13% |
| dynamicRef.json | 4 | ✅ | 8.6M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 33.4M | ✅ | 20.4M | 🟢 **-39%** |
| exclusiveMaximum.json | 4 | ✅ | 58.3M | ✅ | 41.2M | 🟢 **-29%** |
| exclusiveMinimum.json | 4 | ✅ | 55.6M | ✅ | 42.6M | 🟢 **-23%** |
| format.json | 133 | ✅ | 65.2M | ✅ | 40.3M | 🟢 **-38%** |
| if-then-else.json | 26 | ✅ | 54.0M | ✅ | 35.2M | 🟢 **-35%** |
| infinite-loop-detection.json | 2 | ✅ | 36.2M | ✅ | 34.0M | -6% |
| items.json | 29 | ✅ | 24.9M | ✅ | 23.2M | -7% |
| maxContains.json | 12 | ✅ | 50.8M | ✅ | 34.1M | 🟢 **-33%** |
| maxItems.json | 6 | ✅ | 44.4M | ✅ | 47.9M | +8% |
| maxLength.json | 7 | ✅ | 39.9M | ✅ | 44.2M | +11% |
| maxProperties.json | 10 | ✅ | 39.5M | ✅ | 37.5M | -5% |
| maximum.json | 8 | ✅ | 60.8M | ✅ | 48.7M | -20% |
| minContains.json | 28 | ✅ | 49.9M | ✅ | 24.8M | 🟢 **-50%** |
| minItems.json | 6 | ✅ | 49.9M | ✅ | 49.0M | -2% |
| minLength.json | 7 | ✅ | 39.8M | ✅ | 43.5M | +9% |
| minProperties.json | 8 | ✅ | 41.6M | ✅ | 38.8M | -7% |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 45.6M | 🟢 **-26%** |
| multipleOf.json | 10 | ✅ | 57.2M | ✅ | 22.4M | 🟢 **-61%** |
| not.json | 40 | ✅ | 47.1M | ✅ | 34.1M | 🟢 **-28%** |
| oneOf.json | 27 | ✅ | 39.9M | ✅ | 10.7M | 🟢 **-73%** |
| pattern.json | 9 | ✅ | 39.1M | ✅ | 39.1M | 0% |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 7.2M | 🟢 **-55%** |
| prefixItems.json | 11 | ✅ | 49.1M | ✅ | 49.3M | +0% |
| properties.json | 21 | ✅ | 26.2M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.8M | ✅ | 26.4M | -14% |
| ref.json | 71 | ✅ | 20.4M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 28.7M | ✅ | 16.3M | 🟢 **-43%** |
| required.json | 9 | ✅ | 53.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 56.2M | ✅ | 36.0M | 🟢 **-36%** |
| unevaluatedItems.json | 47 | ✅ | 21.9M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 11.4M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.8M | ✅ | 17.8M | 🟢 **-31%** |
| vocabulary.json | 2 | ✅ | 62.5M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 51.9M | ✅ | 12.9M | 🟢 **-75%** |
| optional/bignum.json | 9 | ✅ | 52.4M | ✅ | 30.5M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 39.5M | ✅ | 36.2M | -8% |
| optional/ecmascript-regex.json | 74 | ✅ | 15.9M | ✅ | 16.6M | +5% |
| optional/format/date-time.json | 26 | ✅ | 22.0M | ✅ | 2.8M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 8.0M | -6% |
| optional/format/idn-email.json | 10 | ✅ | 15.7M | ✅ | 78K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 31.9M | ✅ | 31.0M | -3% |
| optional/format/ipv6.json | 40 | ✅ | 11.3M | ✅ | 2.8M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 24.3M | ✅ | 25.4M | +5% |
| optional/format/regex.json | 8 | ✅ | 54.2M | ✅ | 854K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 30.6M | ✅ | 30.2M | -1% |
| optional/format/time.json | 46 | ✅ | 6.1M | ✅ | 5.5M | -10% |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 55.0M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 8.8M | ✅ | 9.0M | +3% |
| optional/format/uri-template.json | 10 | ✅ | 14.5M | ✅ | 15.4M | +6% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.3M | 🟢 **-30%** |
| optional/format/uuid.json | 22 | ✅ | 13.9M | ✅ | 15.2M | +10% |
| optional/id.json | 3 | ✅ | 34.0M | ✅ | 14.0M | 🟢 **-59%** |
| optional/no-schema.json | 3 | ✅ | 46.3M | ✅ | 44.6M | -4% |
| optional/non-bmp-regex.json | 12 | ✅ | 22.5M | ✅ | 12.3M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 41.8M | ✅ | 40.6M | -3% |

