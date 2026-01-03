# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 24.6M | ⚠️ 31/38 | 707 | 11.6M | 🟢 **-53%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 25.0M | ⚠️ 46/49 | 1025 | 13.1M | 🟢 **-47%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 21.9M | ⚠️ 51/54 | 1221 | 11.8M | 🟢 **-46%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 19.2M | ⚠️ 62/69 | 1399 | 3.4M | 🟢 **-82%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 14.5M | ⚠️ 61/68 | 1394 | 5.8M | 🟢 **-60%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 19.4M | ⚠️ 251/278 | 5746 | 6.5M | 🟢 **-67%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.99x faster (52 ns vs 154 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 55.1M | ✅ | 41.6M | 🟢 **-25%** |
| additionalProperties.json | 16 | ✅ | 24.1M | ✅ | 17.6M | 🟢 **-27%** |
| allOf.json | 27 | ✅ | 41.6M | ✅ | 17.5M | 🟢 **-58%** |
| anyOf.json | 15 | ✅ | 49.1M | ✅ | 14.2M | 🟢 **-71%** |
| default.json | 7 | ✅ | 47.7M | ✅ | 47.0M | -1% |
| dependencies.json | 29 | ✅ | 28.7M | ✅ | 28.4M | -1% |
| enum.json | 49 | ✅ | 38.0M | ✅ | 23.9M | 🟢 **-37%** |
| format.json | 36 | ✅ | 49.4M | ✅ | 49.5M | +0% |
| infinite-loop-detection.json | 2 | ✅ | 36.1M | ✅ | 34.0M | -6% |
| items.json | 21 | ✅ | 25.0M | ✅ | 24.2M | -3% |
| maxItems.json | 4 | ✅ | 65.9M | ✅ | 49.0M | 🟢 **-26%** |
| maxLength.json | 5 | ✅ | 50.9M | ✅ | 46.1M | -9% |
| maxProperties.json | 8 | ✅ | 47.5M | ✅ | 38.7M | -18% |
| maximum.json | 8 | ✅ | 60.9M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 64.3M | ✅ | 48.5M | 🟢 **-25%** |
| minLength.json | 5 | ✅ | 50.3M | ✅ | 43.3M | -14% |
| minProperties.json | 6 | ✅ | 50.1M | ✅ | 42.3M | -16% |
| minimum.json | 11 | ✅ | 61.5M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 56.5M | ✅ | 22.1M | 🟢 **-61%** |
| not.json | 20 | ✅ | 60.5M | ✅ | 38.1M | 🟢 **-37%** |
| oneOf.json | 23 | ✅ | 42.7M | ✅ | 10.1M | 🟢 **-76%** |
| pattern.json | 9 | ✅ | 41.9M | ✅ | 39.7M | -5% |
| patternProperties.json | 18 | ✅ | 16.2M | ✅ | 7.1M | 🟢 **-56%** |
| properties.json | 17 | ✅ | 25.1M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 33.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.2M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 52.4M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 50.8M | ✅ | 36.5M | 🟢 **-28%** |
| uniqueItems.json | 69 | ✅ | 24.2M | ✅ | 17.6M | 🟢 **-27%** |
| optional/bignum.json | 7 | ✅ | 53.0M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 17.5M | ✅ | 17.1M | -2% |
| optional/format/date-time.json | 26 | ✅ | 23.2M | ✅ | 3.0M | 🟢 **-87%** |
| optional/format/email.json | 17 | ✅ | 16.8M | ✅ | 22.0M | 🔴 **+31%** |
| optional/format/ipv4.json | 16 | ✅ | 33.8M | ✅ | 30.0M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.5M | ✅ | 2.6M | 🟢 **-77%** |
| optional/format/unknown.json | 7 | ✅ | 66.7M | ✅ | 55.1M | -17% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.2M | 🟢 **-34%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.1M | ✅ | 13.1M | 🟢 **-43%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 48.4M | ✅ | 37.7M | 🟢 **-22%** |
| additionalProperties.json | 16 | ✅ | 26.0M | ✅ | 18.2M | 🟢 **-30%** |
| allOf.json | 30 | ✅ | 41.3M | ✅ | 18.7M | 🟢 **-55%** |
| anyOf.json | 18 | ✅ | 46.1M | ✅ | 12.5M | 🟢 **-73%** |
| boolean_schema.json | 18 | ✅ | 52.1M | ✅ | 44.0M | -16% |
| const.json | 54 | ✅ | 49.8M | ✅ | 19.8M | 🟢 **-60%** |
| contains.json | 19 | ✅ | 54.4M | ✅ | 14.4M | 🟢 **-74%** |
| default.json | 7 | ✅ | 43.2M | ✅ | 45.9M | +6% |
| definitions.json | 2 | ✅ | 12.6M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 29.4M | ✅ | 33.2M | +13% |
| enum.json | 45 | ✅ | 32.1M | ✅ | 22.5M | 🟢 **-30%** |
| exclusiveMaximum.json | 4 | ✅ | 55.8M | ✅ | 42.4M | 🟢 **-24%** |
| exclusiveMinimum.json | 4 | ✅ | 55.7M | ✅ | 32.7M | 🟢 **-41%** |
| format.json | 54 | ✅ | 44.4M | ✅ | 46.9M | +6% |
| infinite-loop-detection.json | 2 | ✅ | 17.8M | ✅ | 32.7M | 🔴 **+84%** |
| items.json | 28 | ✅ | 26.2M | ✅ | 17.1M | 🟢 **-35%** |
| maxItems.json | 6 | ✅ | 50.1M | ✅ | 46.9M | -6% |
| maxLength.json | 7 | ✅ | 44.1M | ✅ | 43.9M | 0% |
| maxProperties.json | 10 | ✅ | 42.6M | ✅ | 37.1M | -13% |
| maximum.json | 8 | ✅ | 61.5M | ✅ | 46.4M | 🟢 **-25%** |
| minItems.json | 6 | ✅ | 50.3M | ✅ | 47.6M | -5% |
| minLength.json | 7 | ✅ | 43.8M | ✅ | 43.5M | -1% |
| minProperties.json | 8 | ✅ | 42.8M | ✅ | 38.4M | -10% |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 48.4M | 🟢 **-21%** |
| multipleOf.json | 10 | ✅ | 56.2M | ✅ | 22.8M | 🟢 **-59%** |
| not.json | 38 | ✅ | 51.5M | ✅ | 35.9M | 🟢 **-30%** |
| oneOf.json | 27 | ✅ | 49.0M | ✅ | 10.3M | 🟢 **-79%** |
| pattern.json | 9 | ✅ | 39.6M | ✅ | 41.9M | +6% |
| patternProperties.json | 23 | ✅ | 16.2M | ✅ | 9.0M | 🟢 **-45%** |
| properties.json | 21 | ✅ | 24.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.4M | ✅ | 14.6M | 🟢 **-52%** |
| ref.json | 65 | ✅ | 28.0M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 29.2M | ✅ | 15.5M | 🟢 **-47%** |
| required.json | 9 | ✅ | 54.2M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 47.8M | ✅ | 35.6M | 🟢 **-25%** |
| uniqueItems.json | 69 | ✅ | 23.3M | ✅ | 16.5M | 🟢 **-29%** |
| optional/bignum.json | 9 | ✅ | 46.3M | ✅ | 29.9M | 🟢 **-35%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.4M | ✅ | 16.7M | -4% |
| optional/format/date-time.json | 26 | ✅ | 19.5M | ✅ | 2.9M | 🟢 **-85%** |
| optional/format/email.json | 17 | ✅ | 15.7M | ✅ | 21.7M | 🔴 **+38%** |
| optional/format/ipv4.json | 16 | ✅ | 26.2M | ✅ | 29.5M | +13% |
| optional/format/ipv6.json | 40 | ✅ | 10.9M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.3M | ✅ | 24.4M | +4% |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 54.7M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.0M | ✅ | 9.1M | +2% |
| optional/format/uri-template.json | 10 | ✅ | 14.3M | ✅ | 15.0M | +5% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ | 39.9M | ✅ | 11.7M | 🟢 **-71%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.5M | ✅ | 14.4M | 🟢 **-33%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 43.2M | ✅ | 39.7M | -8% |
| additionalProperties.json | 16 | ✅ | 27.4M | ✅ | 16.9M | 🟢 **-38%** |
| allOf.json | 30 | ✅ | 38.8M | ✅ | 18.4M | 🟢 **-53%** |
| anyOf.json | 18 | ✅ | 46.7M | ✅ | 12.9M | 🟢 **-72%** |
| boolean_schema.json | 18 | ✅ | 49.3M | ✅ | 44.4M | -10% |
| const.json | 54 | ✅ | 52.4M | ✅ | 21.0M | 🟢 **-60%** |
| contains.json | 21 | ✅ | 53.1M | ✅ | 15.4M | 🟢 **-71%** |
| default.json | 7 | ✅ | 44.3M | ✅ | 46.3M | +5% |
| definitions.json | 2 | ✅ | 13.4M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ | 28.9M | ✅ | 28.5M | -1% |
| enum.json | 45 | ✅ | 33.9M | ✅ | 23.8M | 🟢 **-30%** |
| exclusiveMaximum.json | 4 | ✅ | 55.4M | ✅ | 40.7M | 🟢 **-26%** |
| exclusiveMinimum.json | 4 | ✅ | 60.1M | ✅ | 39.8M | 🟢 **-34%** |
| format.json | 102 | ✅ | 41.4M | ✅ | 42.8M | +3% |
| if-then-else.json | 26 | ✅ | 56.6M | ✅ | 34.3M | 🟢 **-39%** |
| infinite-loop-detection.json | 2 | ✅ | 32.9M | ✅ | 31.4M | -4% |
| items.json | 28 | ✅ | 26.7M | ✅ | 16.5M | 🟢 **-38%** |
| maxItems.json | 6 | ✅ | 45.0M | ✅ | 47.0M | +4% |
| maxLength.json | 7 | ✅ | 43.8M | ✅ | 46.0M | +5% |
| maxProperties.json | 10 | ✅ | 42.7M | ✅ | 37.3M | -13% |
| maximum.json | 8 | ✅ | 60.6M | ✅ | 47.8M | 🟢 **-21%** |
| minItems.json | 6 | ✅ | 51.2M | ✅ | 48.2M | -6% |
| minLength.json | 7 | ✅ | 43.8M | ✅ | 42.4M | -3% |
| minProperties.json | 8 | ✅ | 42.9M | ✅ | 38.5M | -10% |
| minimum.json | 11 | ✅ | 61.7M | ✅ | 49.1M | 🟢 **-20%** |
| multipleOf.json | 10 | ✅ | 48.7M | ✅ | 20.7M | 🟢 **-57%** |
| not.json | 38 | ✅ | 52.0M | ✅ | 34.2M | 🟢 **-34%** |
| oneOf.json | 27 | ✅ | 38.4M | ✅ | 10.3M | 🟢 **-73%** |
| pattern.json | 9 | ✅ | 37.5M | ✅ | 41.7M | +11% |
| patternProperties.json | 23 | ✅ | 15.7M | ✅ | 9.1M | 🟢 **-42%** |
| properties.json | 21 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.2M | ✅ | 25.2M | -16% |
| ref.json | 73 | ✅ | 27.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 20.9M | ✅ | 22.7M | +8% |
| required.json | 9 | ✅ | 53.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 45.5M | ✅ | 35.6M | 🟢 **-22%** |
| uniqueItems.json | 69 | ✅ | 23.3M | ✅ | 17.0M | 🟢 **-27%** |
| optional/bignum.json | 9 | ✅ | 52.5M | ✅ | 29.9M | 🟢 **-43%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 16.1M | -10% |
| optional/format/date-time.json | 26 | ✅ | 21.9M | ✅ | 3.0M | 🟢 **-86%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 8.1M | -5% |
| optional/format/email.json | 17 | ✅ | 16.7M | ✅ | 21.6M | 🔴 **+29%** |
| optional/format/ipv4.json | 16 | ✅ | 31.5M | ✅ | 28.7M | -9% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.6M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 24.4M | ✅ | 24.4M | +0% |
| optional/format/regex.json | 8 | ✅ | 57.7M | ✅ | 846K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 32.0M | ✅ | 29.3M | -9% |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.5M | -12% |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 55.0M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.3M | ✅ | 9.3M | 0% |
| optional/format/uri-template.json | 10 | ✅ | 14.5M | ✅ | 15.3M | +5% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ | 41.5M | ✅ | 20.4M | 🟢 **-51%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.2M | ✅ | 13.5M | 🟢 **-30%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 44.9M | ✅ | 35.5M | 🟢 **-21%** |
| additionalProperties.json | 21 | ✅ | 24.2M | ✅ | 13.5M | 🟢 **-44%** |
| allOf.json | 30 | ✅ | 43.1M | ✅ | 19.2M | 🟢 **-55%** |
| anchor.json | 8 | ✅ | 45.7M | ✅ | 41.6M | -9% |
| anyOf.json | 18 | ✅ | 50.8M | ✅ | 12.0M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 50.0M | ✅ | 44.4M | -11% |
| const.json | 54 | ✅ | 51.3M | ✅ | 20.9M | 🟢 **-59%** |
| contains.json | 21 | ✅ | 51.9M | ✅ | 15.1M | 🟢 **-71%** |
| content.json | 18 | ✅ | 63.0M | ✅ | 42.4M | 🟢 **-33%** |
| default.json | 7 | ✅ | 47.7M | ✅ | 46.7M | -2% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 742K | 🟢 **-60%** |
| dependentRequired.json | 20 | ✅ | 41.4M | ✅ | 39.0M | -6% |
| dependentSchemas.json | 20 | ✅ | 40.2M | ✅ | 34.7M | -14% |
| enum.json | 45 | ✅ | 35.3M | ✅ | 24.0M | 🟢 **-32%** |
| exclusiveMaximum.json | 4 | ✅ | 70.4M | ✅ | 40.4M | 🟢 **-43%** |
| exclusiveMinimum.json | 4 | ✅ | 54.7M | ✅ | 40.4M | 🟢 **-26%** |
| format.json | 114 | ✅ | 68.9M | ✅ | 44.3M | 🟢 **-36%** |
| if-then-else.json | 26 | ✅ | 56.8M | ✅ | 36.2M | 🟢 **-36%** |
| infinite-loop-detection.json | 2 | ✅ | 36.1M | ✅ | 34.2M | -5% |
| items.json | 28 | ✅ | 26.1M | ✅ | 28.5M | +9% |
| maxContains.json | 12 | ✅ | 54.4M | ✅ | 33.4M | 🟢 **-39%** |
| maxItems.json | 6 | ✅ | 51.6M | ✅ | 47.6M | -8% |
| maxLength.json | 7 | ✅ | 43.9M | ✅ | 40.3M | -8% |
| maxProperties.json | 10 | ✅ | 42.4M | ✅ | 37.4M | -12% |
| maximum.json | 8 | ✅ | 59.7M | ✅ | 47.8M | -20% |
| minContains.json | 28 | ✅ | 56.7M | ✅ | 25.1M | 🟢 **-56%** |
| minItems.json | 6 | ✅ | 51.7M | ✅ | 47.1M | -9% |
| minLength.json | 7 | ✅ | 43.6M | ✅ | 43.7M | +0% |
| minProperties.json | 8 | ✅ | 43.1M | ✅ | 38.0M | -12% |
| minimum.json | 11 | ✅ | 61.4M | ✅ | 49.2M | -20% |
| multipleOf.json | 10 | ✅ | 58.3M | ✅ | 23.1M | 🟢 **-60%** |
| not.json | 40 | ✅ | 49.1M | ✅ | 34.3M | 🟢 **-30%** |
| oneOf.json | 27 | ✅ | 42.2M | ✅ | 10.2M | 🟢 **-76%** |
| pattern.json | 9 | ✅ | 38.8M | ✅ | 41.9M | +8% |
| patternProperties.json | 23 | ✅ | 15.1M | ✅ | 7.1M | 🟢 **-53%** |
| properties.json | 21 | ✅ | 25.7M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.5M | ✅ | 17.2M | 🟢 **-42%** |
| recursiveRef.json | 31 | ✅ | 5.4M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 18.1M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.4M | ✅ | 22.9M | 🟢 **-22%** |
| required.json | 9 | ✅ | 53.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 46.3M | ✅ | 36.3M | 🟢 **-22%** |
| unevaluatedItems.json | 51 | ✅ | 12.5M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 9.9M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.6M | ✅ | 17.3M | 🟢 **-27%** |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.1M | ✅ | 12.2M | 🟢 **-77%** |
| optional/bignum.json | 9 | ✅ | 50.4M | ✅ | 30.0M | 🟢 **-40%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 39.3M | ✅ | 37.8M | -4% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.6M | ✅ | 16.2M | -2% |
| optional/format/date-time.json | 26 | ✅ | 22.2M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 8.3M | ✅ | 8.2M | -1% |
| optional/format/email.json | 17 | ✅ | 16.6M | ✅ | 22.2M | 🔴 **+33%** |
| optional/format/idn-email.json | 10 | ✅ | 15.6M | ✅ | 34K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 30.1M | ✅ | 30.3M | +1% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 2.6M | 🟢 **-78%** |
| optional/format/json-pointer.json | 38 | ✅ | 24.0M | ✅ | 24.0M | 0% |
| optional/format/regex.json | 8 | ✅ | 55.5M | ✅ | 850K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 30.4M | ✅ | 30.2M | -1% |
| optional/format/time.json | 46 | ✅ | 6.2M | ✅ | 5.5M | -12% |
| optional/format/unknown.json | 7 | ✅ | 66.5M | ✅ | 54.7M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.0M | ✅ | 9.0M | +0% |
| optional/format/uri-template.json | 10 | ✅ | 14.3M | ✅ | 15.7M | +10% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/format/uuid.json | 22 | ✅ | 12.8M | ✅ | 14.0M | +9% |
| optional/id.json | 3 | ✅ | 32.0M | ✅ | 13.9M | 🟢 **-56%** |
| optional/no-schema.json | 3 | ✅ | 46.3M | ✅ | 43.7M | -6% |
| optional/non-bmp-regex.json | 12 | ✅ | 22.1M | ✅ | 12.5M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.4M | ✅ | 41.7M | -4% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 24.1M | ✅ | 16.7M | 🟢 **-31%** |
| allOf.json | 30 | ✅ | 41.0M | ✅ | 11.2M | 🟢 **-73%** |
| anchor.json | 8 | ✅ | 43.5M | ✅ | 44.3M | +2% |
| anyOf.json | 18 | ✅ | 51.3M | ✅ | 12.0M | 🟢 **-77%** |
| boolean_schema.json | 18 | ✅ | 49.4M | ✅ | 44.6M | -10% |
| const.json | 54 | ✅ | 52.8M | ✅ | 20.7M | 🟢 **-61%** |
| contains.json | 21 | ✅ | 46.7M | ✅ | 15.2M | 🟢 **-67%** |
| content.json | 18 | ✅ | 65.9M | ✅ | 39.6M | 🟢 **-40%** |
| default.json | 7 | ✅ | 48.9M | ✅ | 46.6M | -5% |
| defs.json | 2 | ✅ | 2.1M | ✅ | 739K | 🟢 **-65%** |
| dependentRequired.json | 20 | ✅ | 39.8M | ✅ | 40.5M | +2% |
| dependentSchemas.json | 20 | ✅ | 41.8M | ✅ | 36.0M | -14% |
| dynamicRef.json | 4 | ✅ | 8.5M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 33.8M | ✅ | 23.3M | 🟢 **-31%** |
| exclusiveMaximum.json | 4 | ✅ | 60.1M | ✅ | 42.0M | 🟢 **-30%** |
| exclusiveMinimum.json | 4 | ✅ | 54.3M | ✅ | 42.2M | 🟢 **-22%** |
| format.json | 133 | ✅ | 66.9M | ✅ | 38.4M | 🟢 **-43%** |
| if-then-else.json | 26 | ✅ | 49.1M | ✅ | 33.3M | 🟢 **-32%** |
| infinite-loop-detection.json | 2 | ✅ | 19.0M | ✅ | 33.8M | 🔴 **+78%** |
| items.json | 29 | ✅ | 25.1M | ✅ | 14.3M | 🟢 **-43%** |
| maxContains.json | 12 | ✅ | 51.0M | ✅ | 33.9M | 🟢 **-34%** |
| maxItems.json | 6 | ✅ | 51.5M | ✅ | 48.8M | -5% |
| maxLength.json | 7 | ✅ | 44.0M | ✅ | 44.9M | +2% |
| maxProperties.json | 10 | ✅ | 42.7M | ✅ | 37.2M | -13% |
| maximum.json | 8 | ✅ | 60.8M | ✅ | 48.8M | -20% |
| minContains.json | 28 | ✅ | 50.1M | ✅ | 34.3M | 🟢 **-32%** |
| minItems.json | 6 | ✅ | 50.9M | ✅ | 47.5M | -7% |
| minLength.json | 7 | ✅ | 39.6M | ✅ | 41.9M | +6% |
| minProperties.json | 8 | ✅ | 43.1M | ✅ | 39.0M | -10% |
| minimum.json | 11 | ✅ | 56.5M | ✅ | 47.7M | -16% |
| multipleOf.json | 10 | ✅ | 58.2M | ✅ | 22.3M | 🟢 **-62%** |
| not.json | 40 | ✅ | 49.9M | ✅ | 34.6M | 🟢 **-31%** |
| oneOf.json | 27 | ✅ | 41.0M | ✅ | 10.3M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 38.8M | ✅ | 41.0M | +6% |
| patternProperties.json | 23 | ✅ | 15.7M | ✅ | 7.1M | 🟢 **-55%** |
| prefixItems.json | 11 | ✅ | 58.4M | ✅ | 48.5M | -17% |
| properties.json | 21 | ✅ | 23.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.5M | ✅ | 20.9M | 🟢 **-31%** |
| ref.json | 71 | ✅ | 21.9M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 24.1M | ✅ | 15.4M | 🟢 **-36%** |
| required.json | 9 | ✅ | 54.1M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 54.3M | ✅ | 36.0M | 🟢 **-34%** |
| unevaluatedItems.json | 47 | ✅ | 15.1M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 2.6M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.9M | ✅ | 17.5M | 🟢 **-32%** |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 51.7M | ✅ | 13.1M | 🟢 **-75%** |
| optional/bignum.json | 9 | ✅ | 52.4M | ✅ | 29.6M | 🟢 **-44%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 36.1M | ✅ | 35.9M | -1% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.6M | ✅ | 16.7M | -5% |
| optional/format/date-time.json | 26 | ✅ | 22.2M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 7.9M | ✅ | 7.9M | 0% |
| optional/format/idn-email.json | 10 | ✅ | 16.0M | ✅ | 78K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 29.4M | ✅ | 30.7M | +4% |
| optional/format/ipv6.json | 40 | ✅ | 11.3M | ✅ | 2.6M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 24.3M | ✅ | 25.6M | +5% |
| optional/format/regex.json | 8 | ✅ | 54.5M | ✅ | 852K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 29.9M | ✅ | 30.3M | +1% |
| optional/format/time.json | 46 | ✅ | 6.2M | ✅ | 5.6M | -10% |
| optional/format/unknown.json | 7 | ✅ | 63.9M | ✅ | 52.8M | -17% |
| optional/format/uri-reference.json | 15 | ✅ | 9.1M | ✅ | 9.0M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 14.6M | ✅ | 15.3M | +5% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-31%** |
| optional/format/uuid.json | 22 | ✅ | 12.8M | ✅ | 14.4M | +12% |
| optional/id.json | 3 | ✅ | 33.8M | ✅ | 13.5M | 🟢 **-60%** |
| optional/no-schema.json | 3 | ✅ | 49.0M | ✅ | 42.9M | -12% |
| optional/non-bmp-regex.json | 12 | ✅ | 21.2M | ✅ | 10.8M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 42.5M | ✅ | 40.8M | -4% |

