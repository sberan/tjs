# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 23.9M | ⚠️ 31/38 | 707 | 11.2M | 🟢 **-53%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 24.4M | ⚠️ 46/49 | 1025 | 12.8M | 🟢 **-47%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 22.3M | ⚠️ 51/54 | 1221 | 11.8M | 🟢 **-47%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.1M | ⚠️ 62/69 | 1399 | 5.4M | 🟢 **-73%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 20.1M | ⚠️ 61/68 | 1394 | 5.7M | 🟢 **-72%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 21.6M | ⚠️ 251/278 | 5746 | 7.7M | 🟢 **-64%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs ajv**: 🟢 tjs is 2.87x faster (46 ns vs 133 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 29.5M | ✅ | 23.6M | -20% |
| additionalProperties.json | 16 | ✅ | 25.8M | ✅ | 10.3M | 🟢 **-60%** |
| allOf.json | 27 | ✅ | 39.4M | ✅ | 10.4M | 🟢 **-74%** |
| anyOf.json | 15 | ✅ | 52.7M | ✅ | 15.8M | 🟢 **-70%** |
| default.json | 7 | ✅ | 44.2M | ✅ | 46.2M | +4% |
| dependencies.json | 29 | ✅ | 26.7M | ✅ | 26.1M | -2% |
| enum.json | 49 | ✅ | 33.7M | ✅ | 20.2M | 🟢 **-40%** |
| format.json | 36 | ✅ | 55.4M | ✅ | 42.6M | 🟢 **-23%** |
| infinite-loop-detection.json | 2 | ✅ | 37.9M | ✅ | 37.8M | 0% |
| items.json | 21 | ✅ | 23.3M | ✅ | 25.3M | +9% |
| maxItems.json | 4 | ✅ | 57.7M | ✅ | 49.4M | -14% |
| maxLength.json | 5 | ✅ | 50.7M | ✅ | 47.3M | -7% |
| maxProperties.json | 8 | ✅ | 45.7M | ✅ | 39.8M | -13% |
| maximum.json | 8 | ✅ | 59.4M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 63.3M | ✅ | 48.7M | 🟢 **-23%** |
| minLength.json | 5 | ✅ | 53.8M | ✅ | 44.4M | -18% |
| minProperties.json | 6 | ✅ | 49.6M | ✅ | 42.1M | -15% |
| minimum.json | 11 | ✅ | 59.6M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 62.3M | ✅ | 22.6M | 🟢 **-64%** |
| not.json | 20 | ✅ | 58.9M | ✅ | 39.4M | 🟢 **-33%** |
| oneOf.json | 23 | ✅ | 48.2M | ✅ | 10.5M | 🟢 **-78%** |
| pattern.json | 9 | ✅ | 35.0M | ✅ | 37.8M | +8% |
| patternProperties.json | 18 | ✅ | 14.9M | ✅ | 7.1M | 🟢 **-52%** |
| properties.json | 17 | ✅ | 25.9M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 27.9M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 39.1M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 46.7M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 56.3M | ✅ | 36.2M | 🟢 **-36%** |
| uniqueItems.json | 69 | ✅ | 22.2M | ✅ | 16.3M | 🟢 **-26%** |
| optional/bignum.json | 7 | ✅ | 51.2M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 16.9M | ✅ | 15.6M | -8% |
| optional/format/date-time.json | 26 | ✅ | 22.7M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/email.json | 17 | ✅ | 17.8M | ✅ | 21.5M | 🔴 **+21%** |
| optional/format/ipv4.json | 16 | ✅ | 38.6M | ✅ | 30.2M | 🟢 **-22%** |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/unknown.json | 7 | ✅ | 65.5M | ✅ | 55.4M | -15% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-32%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.8M | ✅ | 13.1M | 🟢 **-34%** |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 47.4M | ✅ | 20.3M | 🟢 **-57%** |
| additionalProperties.json | 16 | ✅ | 24.5M | ✅ | 14.0M | 🟢 **-43%** |
| allOf.json | 30 | ✅ | 38.0M | ✅ | 10.7M | 🟢 **-72%** |
| anyOf.json | 18 | ✅ | 44.3M | ✅ | 11.8M | 🟢 **-73%** |
| boolean_schema.json | 18 | ✅ | 50.0M | ✅ | 43.7M | -13% |
| const.json | 54 | ✅ | 45.1M | ✅ | 21.5M | 🟢 **-52%** |
| contains.json | 19 | ✅ | 48.1M | ✅ | 14.4M | 🟢 **-70%** |
| default.json | 7 | ✅ | 43.5M | ✅ | 47.0M | +8% |
| definitions.json | 2 | ✅ | 11.0M | ✅ | 1.5M | 🟢 **-87%** |
| dependencies.json | 36 | ✅ | 26.4M | ✅ | 30.2M | +14% |
| enum.json | 45 | ✅ | 33.0M | ✅ | 20.2M | 🟢 **-39%** |
| exclusiveMaximum.json | 4 | ✅ | 48.7M | ✅ | 43.5M | -11% |
| exclusiveMinimum.json | 4 | ✅ | 54.7M | ✅ | 41.1M | 🟢 **-25%** |
| format.json | 54 | ✅ | 45.8M | ✅ | 47.1M | +3% |
| infinite-loop-detection.json | 2 | ✅ | 35.0M | ✅ | 37.8M | +8% |
| items.json | 28 | ✅ | 27.8M | ✅ | 18.8M | 🟢 **-32%** |
| maxItems.json | 6 | ✅ | 52.9M | ✅ | 48.6M | -8% |
| maxLength.json | 7 | ✅ | 45.1M | ✅ | 45.6M | +1% |
| maxProperties.json | 10 | ✅ | 40.7M | ✅ | 37.5M | -8% |
| maximum.json | 8 | ✅ | 53.1M | ✅ | 47.5M | -11% |
| minItems.json | 6 | ✅ | 52.9M | ✅ | 48.7M | -8% |
| minLength.json | 7 | ✅ | 43.5M | ✅ | 44.1M | +1% |
| minProperties.json | 8 | ✅ | 42.9M | ✅ | 40.0M | -7% |
| minimum.json | 11 | ✅ | 53.8M | ✅ | 49.8M | -7% |
| multipleOf.json | 10 | ✅ | 49.8M | ✅ | 23.5M | 🟢 **-53%** |
| not.json | 38 | ✅ | 57.2M | ✅ | 40.3M | 🟢 **-29%** |
| oneOf.json | 27 | ✅ | 44.3M | ✅ | 10.9M | 🟢 **-75%** |
| pattern.json | 9 | ✅ | 37.4M | ✅ | 40.2M | +7% |
| patternProperties.json | 23 | ✅ | 14.2M | ✅ | 7.2M | 🟢 **-50%** |
| properties.json | 21 | ✅ | 26.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.5M | ✅ | 14.5M | 🟢 **-51%** |
| ref.json | 65 | ✅ | 21.0M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 27.8M | ✅ | 15.9M | 🟢 **-43%** |
| required.json | 9 | ✅ | 48.5M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 53.2M | ✅ | 36.1M | 🟢 **-32%** |
| uniqueItems.json | 69 | ✅ | 22.7M | ✅ | 17.4M | 🟢 **-23%** |
| optional/bignum.json | 9 | ✅ | 50.4M | ✅ | 29.8M | 🟢 **-41%** |
| optional/ecmascript-regex.json | 74 | ✅ | 15.2M | ✅ | 15.9M | +5% |
| optional/format/date-time.json | 26 | ✅ | 23.5M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | 17 | ✅ | 17.3M | ✅ | 20.8M | +20% |
| optional/format/ipv4.json | 16 | ✅ | 31.5M | ✅ | 29.6M | -6% |
| optional/format/ipv6.json | 40 | ✅ | 11.2M | ✅ | 2.7M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 27.8M | ✅ | 25.1M | -10% |
| optional/format/unknown.json | 7 | ✅ | 61.9M | ✅ | 54.2M | -12% |
| optional/format/uri-reference.json | 15 | ✅ | 9.5M | ✅ | 8.9M | -6% |
| optional/format/uri-template.json | 10 | ✅ | 14.9M | ✅ | 15.5M | +4% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ | 36.0M | ✅ | 9.4M | 🟢 **-74%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.2M | ✅ | 13.1M | 🟢 **-35%** |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 49.8M | ✅ | 20.8M | 🟢 **-58%** |
| additionalProperties.json | 16 | ✅ | 26.1M | ✅ | 18.6M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 42.2M | ✅ | 11.9M | 🟢 **-72%** |
| anyOf.json | 18 | ✅ | 46.8M | ✅ | 28.7M | 🟢 **-39%** |
| boolean_schema.json | 18 | ✅ | 55.5M | ✅ | 45.2M | -18% |
| const.json | 54 | ✅ | 51.1M | ✅ | 18.6M | 🟢 **-64%** |
| contains.json | 21 | ✅ | 54.2M | ✅ | 15.1M | 🟢 **-72%** |
| default.json | 7 | ✅ | 44.6M | ✅ | 45.7M | +2% |
| definitions.json | 2 | ✅ | 12.5M | ✅ | 1.3M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ | 29.2M | ✅ | 30.3M | +4% |
| enum.json | 45 | ✅ | 35.3M | ✅ | 21.2M | 🟢 **-40%** |
| exclusiveMaximum.json | 4 | ✅ | 54.1M | ✅ | 41.8M | 🟢 **-23%** |
| exclusiveMinimum.json | 4 | ✅ | 57.0M | ✅ | 43.2M | 🟢 **-24%** |
| format.json | 102 | ✅ | 46.8M | ✅ | 49.6M | +6% |
| if-then-else.json | 26 | ✅ | 60.1M | ✅ | 38.0M | 🟢 **-37%** |
| infinite-loop-detection.json | 2 | ✅ | 36.0M | ✅ | 37.4M | +4% |
| items.json | 28 | ✅ | 26.8M | ✅ | 19.1M | 🟢 **-29%** |
| maxItems.json | 6 | ✅ | 57.9M | ✅ | 49.1M | -15% |
| maxLength.json | 7 | ✅ | 48.3M | ✅ | 41.0M | -15% |
| maxProperties.json | 10 | ✅ | 42.9M | ✅ | 37.4M | -13% |
| maximum.json | 8 | ✅ | 59.3M | ✅ | 49.3M | -17% |
| minItems.json | 6 | ✅ | 57.8M | ✅ | 49.2M | -15% |
| minLength.json | 7 | ✅ | 49.0M | ✅ | 44.0M | -10% |
| minProperties.json | 8 | ✅ | 44.9M | ✅ | 39.3M | -13% |
| minimum.json | 11 | ✅ | 59.5M | ✅ | 49.3M | -17% |
| multipleOf.json | 10 | ✅ | 56.7M | ✅ | 23.2M | 🟢 **-59%** |
| not.json | 38 | ✅ | 59.4M | ✅ | 40.7M | 🟢 **-31%** |
| oneOf.json | 27 | ✅ | 47.6M | ✅ | 10.9M | 🟢 **-77%** |
| pattern.json | 9 | ✅ | 42.5M | ✅ | 40.3M | -5% |
| patternProperties.json | 23 | ✅ | 16.1M | ✅ | 9.3M | 🟢 **-43%** |
| properties.json | 21 | ✅ | 26.8M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.9M | ✅ | 14.3M | 🟢 **-50%** |
| ref.json | 73 | ✅ | 23.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 21.5M | ✅ | 17.6M | -18% |
| required.json | 9 | ✅ | 51.2M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 57.4M | ✅ | 35.4M | 🟢 **-38%** |
| uniqueItems.json | 69 | ✅ | 21.8M | ✅ | 15.7M | 🟢 **-28%** |
| optional/bignum.json | 9 | ✅ | 56.0M | ✅ | 31.5M | 🟢 **-44%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 16.7M | +2% |
| optional/format/date-time.json | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 8.0M | -6% |
| optional/format/email.json | 17 | ✅ | 17.9M | ✅ | 21.7M | 🔴 **+21%** |
| optional/format/ipv4.json | 16 | ✅ | 33.8M | ✅ | 30.5M | -10% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.4M | ✅ | 25.5M | -13% |
| optional/format/regex.json | 8 | ✅ | 58.4M | ✅ | 859K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.8M | ✅ | 30.3M | -18% |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.6M | -13% |
| optional/format/unknown.json | 7 | ✅ | 65.2M | ✅ | 55.1M | -15% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 8.9M | -8% |
| optional/format/uri-template.json | 10 | ✅ | 16.7M | ✅ | 15.2M | -9% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.4M | 🟢 **-28%** |
| optional/id.json | 7 | ✅ | 42.8M | ✅ | 18.0M | 🟢 **-58%** |
| optional/non-bmp-regex.json | 12 | ✅ | 18.4M | ✅ | 13.2M | 🟢 **-28%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 55.7M | ✅ | 32.8M | 🟢 **-41%** |
| additionalProperties.json | 21 | ✅ | 24.9M | ✅ | 17.7M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 44.2M | ✅ | 18.0M | 🟢 **-59%** |
| anchor.json | 8 | ✅ | 53.0M | ✅ | 42.5M | -20% |
| anyOf.json | 18 | ✅ | 50.9M | ✅ | 12.1M | 🟢 **-76%** |
| boolean_schema.json | 18 | ✅ | 55.6M | ✅ | 40.2M | 🟢 **-28%** |
| const.json | 54 | ✅ | 53.0M | ✅ | 18.4M | 🟢 **-65%** |
| contains.json | 21 | ✅ | 55.3M | ✅ | 8.7M | 🟢 **-84%** |
| content.json | 18 | ✅ | 64.5M | ✅ | 39.3M | 🟢 **-39%** |
| default.json | 7 | ✅ | 46.5M | ✅ | 43.4M | -7% |
| defs.json | 2 | ✅ | 1.9M | ✅ | 897K | 🟢 **-52%** |
| dependentRequired.json | 20 | ✅ | 38.2M | ✅ | 39.4M | +3% |
| dependentSchemas.json | 20 | ✅ | 42.4M | ✅ | 36.0M | -15% |
| enum.json | 45 | ✅ | 35.3M | ✅ | 19.4M | 🟢 **-45%** |
| exclusiveMaximum.json | 4 | ✅ | 59.9M | ✅ | 43.2M | 🟢 **-28%** |
| exclusiveMinimum.json | 4 | ✅ | 59.6M | ✅ | 42.4M | 🟢 **-29%** |
| format.json | 114 | ✅ | 63.6M | ✅ | 38.6M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 56.5M | ✅ | 35.7M | 🟢 **-37%** |
| infinite-loop-detection.json | 2 | ✅ | 36.3M | ✅ | 34.6M | -5% |
| items.json | 28 | ✅ | 26.5M | ✅ | 26.3M | 0% |
| maxContains.json | 12 | ✅ | 55.5M | ✅ | 33.8M | 🟢 **-39%** |
| maxItems.json | 6 | ✅ | 58.2M | ✅ | 46.1M | 🟢 **-21%** |
| maxLength.json | 7 | ✅ | 49.9M | ✅ | 44.3M | -11% |
| maxProperties.json | 10 | ✅ | 45.3M | ✅ | 37.3M | -18% |
| maximum.json | 8 | ✅ | 58.7M | ✅ | 48.7M | -17% |
| minContains.json | 28 | ✅ | 62.1M | ✅ | 27.3M | 🟢 **-56%** |
| minItems.json | 6 | ✅ | 59.4M | ✅ | 48.4M | -19% |
| minLength.json | 7 | ✅ | 50.8M | ✅ | 42.7M | -16% |
| minProperties.json | 8 | ✅ | 47.0M | ✅ | 39.9M | -15% |
| minimum.json | 11 | ✅ | 61.6M | ✅ | 49.2M | 🟢 **-20%** |
| multipleOf.json | 10 | ✅ | 48.2M | ✅ | 22.8M | 🟢 **-53%** |
| not.json | 40 | ✅ | 58.0M | ✅ | 36.6M | 🟢 **-37%** |
| oneOf.json | 27 | ✅ | 48.5M | ✅ | 9.9M | 🟢 **-80%** |
| pattern.json | 9 | ✅ | 37.0M | ✅ | 38.4M | +4% |
| patternProperties.json | 23 | ✅ | 15.0M | ✅ | 5.8M | 🟢 **-62%** |
| properties.json | 21 | ✅ | 26.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.1M | ✅ | 13.9M | 🟢 **-50%** |
| recursiveRef.json | 31 | ✅ | 5.5M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 16.3M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 30.1M | ✅ | 15.2M | 🟢 **-50%** |
| required.json | 9 | ✅ | 53.6M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 60.1M | ✅ | 35.7M | 🟢 **-41%** |
| unevaluatedItems.json | 51 | ✅ | 12.0M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.3M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 17.6M | 🟢 **-27%** |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 52.3M | ✅ | 12.5M | 🟢 **-76%** |
| optional/bignum.json | 9 | ✅ | 53.7M | ✅ | 30.2M | 🟢 **-44%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 38.8M | ✅ | 32.9M | -15% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 16.6M | -1% |
| optional/format/date-time.json | 26 | ✅ | 25.1M | ✅ | 2.8M | 🟢 **-89%** |
| optional/format/date.json | 48 | ✅ | 8.2M | ✅ | 8.1M | -1% |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 20.4M | +13% |
| optional/format/idn-email.json | 10 | ✅ | 16.9M | ✅ | 69K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 34.8M | ✅ | 31.0M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 2.7M | 🟢 **-77%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.0M | ✅ | 23.3M | 🟢 **-22%** |
| optional/format/regex.json | 8 | ✅ | 59.2M | ✅ | 914K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 32.9M | ✅ | 30.2M | -8% |
| optional/format/time.json | 46 | ✅ | 6.4M | ✅ | 5.6M | -13% |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 55.1M | -18% |
| optional/format/uri-reference.json | 15 | ✅ | 9.1M | ✅ | 9.0M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 15.3M | ✅ | 15.4M | +0% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/format/uuid.json | 22 | ✅ | 15.1M | ✅ | 14.8M | -2% |
| optional/id.json | 3 | ✅ | 33.7M | ✅ | 11.1M | 🟢 **-67%** |
| optional/no-schema.json | 3 | ✅ | 55.4M | ✅ | 44.5M | -20% |
| optional/non-bmp-regex.json | 12 | ✅ | 19.2M | ✅ | 11.7M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 42.7M | ✅ | 36.2M | -15% |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 23.8M | ✅ | 12.7M | 🟢 **-47%** |
| allOf.json | 30 | ✅ | 37.9M | ✅ | 11.4M | 🟢 **-70%** |
| anchor.json | 8 | ✅ | 40.0M | ✅ | 40.6M | +2% |
| anyOf.json | 18 | ✅ | 43.2M | ✅ | 12.5M | 🟢 **-71%** |
| boolean_schema.json | 18 | ✅ | 44.2M | ✅ | 44.5M | +1% |
| const.json | 54 | ✅ | 40.8M | ✅ | 20.9M | 🟢 **-49%** |
| contains.json | 21 | ✅ | 45.8M | ✅ | 15.3M | 🟢 **-67%** |
| content.json | 18 | ✅ | 55.0M | ✅ | 40.3M | 🟢 **-27%** |
| default.json | 7 | ✅ | 40.9M | ✅ | 47.3M | +16% |
| defs.json | 2 | ✅ | 2.1M | ✅ | 749K | 🟢 **-65%** |
| dependentRequired.json | 20 | ✅ | 30.6M | ✅ | 38.2M | 🔴 **+25%** |
| dependentSchemas.json | 20 | ✅ | 31.2M | ✅ | 33.9M | +9% |
| dynamicRef.json | 4 | ✅ | 8.0M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 31.6M | ✅ | 24.4M | 🟢 **-23%** |
| exclusiveMaximum.json | 4 | ✅ | 44.3M | ✅ | 42.7M | -4% |
| exclusiveMinimum.json | 4 | ✅ | 44.9M | ✅ | 43.3M | -4% |
| format.json | 133 | ✅ | 56.7M | ✅ | 41.3M | 🟢 **-27%** |
| if-then-else.json | 26 | ✅ | 47.0M | ✅ | 37.0M | 🟢 **-21%** |
| infinite-loop-detection.json | 2 | ✅ | 31.5M | ✅ | 37.4M | +19% |
| items.json | 29 | ✅ | 26.0M | ✅ | 15.4M | 🟢 **-41%** |
| maxContains.json | 12 | ✅ | 50.2M | ✅ | 34.2M | 🟢 **-32%** |
| maxItems.json | 6 | ✅ | 46.7M | ✅ | 48.6M | +4% |
| maxLength.json | 7 | ✅ | 42.5M | ✅ | 42.8M | +1% |
| maxProperties.json | 10 | ✅ | 38.1M | ✅ | 37.4M | -2% |
| maximum.json | 8 | ✅ | 48.4M | ✅ | 45.5M | -6% |
| minContains.json | 28 | ✅ | 49.8M | ✅ | 23.1M | 🟢 **-54%** |
| minItems.json | 6 | ✅ | 47.8M | ✅ | 47.5M | -1% |
| minLength.json | 7 | ✅ | 42.0M | ✅ | 43.0M | +3% |
| minProperties.json | 8 | ✅ | 40.1M | ✅ | 39.2M | -2% |
| minimum.json | 11 | ✅ | 49.5M | ✅ | 48.0M | -3% |
| multipleOf.json | 10 | ✅ | 46.2M | ✅ | 21.7M | 🟢 **-53%** |
| not.json | 40 | ✅ | 45.5M | ✅ | 36.9M | -19% |
| oneOf.json | 27 | ✅ | 36.4M | ✅ | 10.5M | 🟢 **-71%** |
| pattern.json | 9 | ✅ | 35.7M | ✅ | 39.1M | +9% |
| patternProperties.json | 23 | ✅ | 13.4M | ✅ | 6.0M | 🟢 **-55%** |
| prefixItems.json | 11 | ✅ | 47.1M | ✅ | 50.7M | +8% |
| properties.json | 21 | ✅ | 22.6M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 26.8M | ✅ | 14.2M | 🟢 **-47%** |
| ref.json | 71 | ✅ | 16.9M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 28.3M | ✅ | 16.4M | 🟢 **-42%** |
| required.json | 9 | ✅ | 45.4M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 49.0M | ✅ | 35.7M | 🟢 **-27%** |
| unevaluatedItems.json | 47 | ✅ | 14.3M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 12.1M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.6M | ✅ | 14.7M | 🟢 **-38%** |
| vocabulary.json | 2 | ✅ | 48.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 42.6M | ✅ | 11.3M | 🟢 **-74%** |
| optional/bignum.json | 9 | ✅ | 45.2M | ✅ | 29.6M | 🟢 **-35%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 35.1M | ✅ | 34.4M | -2% |
| optional/ecmascript-regex.json | 74 | ✅ | 15.4M | ✅ | 17.1M | +11% |
| optional/format/date-time.json | 26 | ✅ | 22.6M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | 48 | ✅ | 8.3M | ✅ | 7.9M | -4% |
| optional/format/idn-email.json | 10 | ✅ | 15.2M | ✅ | 77K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 30.5M | ✅ | 30.3M | -1% |
| optional/format/ipv6.json | 40 | ✅ | 10.9M | ✅ | 2.7M | 🟢 **-75%** |
| optional/format/json-pointer.json | 38 | ✅ | 26.3M | ✅ | 24.5M | -7% |
| optional/format/regex.json | 8 | ✅ | 49.4M | ✅ | 850K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 29.1M | ✅ | 29.4M | +1% |
| optional/format/time.json | 46 | ✅ | 6.3M | ✅ | 5.7M | -10% |
| optional/format/unknown.json | 7 | ✅ | 54.4M | ✅ | 55.6M | +2% |
| optional/format/uri-reference.json | 15 | ✅ | 9.0M | ✅ | 8.9M | -1% |
| optional/format/uri-template.json | 10 | ✅ | 14.4M | ✅ | 15.6M | +8% |
| optional/format/uri.json | 36 | ✅ | 6.2M | ✅ | 4.2M | 🟢 **-32%** |
| optional/format/uuid.json | 22 | ✅ | 13.1M | ✅ | 14.5M | +11% |
| optional/id.json | 3 | ✅ | 28.8M | ✅ | 13.7M | 🟢 **-52%** |
| optional/no-schema.json | 3 | ✅ | 42.0M | ✅ | 44.4M | +6% |
| optional/non-bmp-regex.json | 12 | ✅ | 18.9M | ✅ | 11.4M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 39.9M | ✅ | 38.7M | -3% |

