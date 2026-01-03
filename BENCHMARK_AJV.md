# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | ajv files | ajv tests | ajv ops/s | tjs vs ajv |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 29.5M | ⚠️ 31/38 | 707 | 17.9M | 🟢 **-39%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 30.6M | ⚠️ 46/49 | 1025 | 20.4M | 🟢 **-33%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 27.1M | ⚠️ 51/54 | 1221 | 17.8M | 🟢 **-34%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.3M | ⚠️ 62/69 | 1399 | 9.8M | 🟢 **-52%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.1M | ⚠️ 61/68 | 1394 | 10.1M | 🟢 **-52%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 24.0M | ⚠️ 251/278 | 5746 | 13.1M | 🟢 **-45%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs ajv**: 🟢 tjs is 1.75x faster (42 ns vs 73 ns, 6602 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 68.2M | ✅ | 54.8M | -20% |
| additionalProperties.json | 16 | ✅ | 41.4M | ✅ | 29.8M | 🟢 **-28%** |
| allOf.json | 27 | ✅ | 35.4M | ✅ | 26.9M | 🟢 **-24%** |
| anyOf.json | 15 | ✅ | 53.6M | ✅ | 39.2M | 🟢 **-27%** |
| default.json | 7 | ✅ | 61.5M | ✅ | 59.0M | -4% |
| dependencies.json | 29 | ✅ | 37.7M | ✅ | 38.0M | +1% |
| enum.json | 49 | ✅ | 24.9M | ✅ | 36.0M | 🔴 **+45%** |
| format.json | 36 | ✅ | 76.8M | ✅ | 72.3M | -6% |
| infinite-loop-detection.json | 2 | ✅ | 48.2M | ✅ | 44.6M | -7% |
| items.json | 21 | ✅ | 35.9M | ✅ | 21.8M | 🟢 **-39%** |
| maxItems.json | 4 | ✅ | 65.3M | ✅ | 47.6M | 🟢 **-27%** |
| maxLength.json | 5 | ✅ | 52.7M | ✅ | 47.8M | -9% |
| maxProperties.json | 8 | ✅ | 50.2M | ✅ | 50.1M | 0% |
| maximum.json | 8 | ✅ | 68.4M | ⚠️ 6 fail | - | - |
| minItems.json | 4 | ✅ | 76.2M | ✅ | 63.5M | -17% |
| minLength.json | 5 | ✅ | 58.3M | ✅ | 53.7M | -8% |
| minProperties.json | 6 | ✅ | 60.7M | ✅ | 48.5M | 🟢 **-20%** |
| minimum.json | 11 | ✅ | 60.9M | ⚠️ 6 fail | - | - |
| multipleOf.json | 10 | ✅ | 57.6M | ✅ | 25.8M | 🟢 **-55%** |
| not.json | 20 | ✅ | 48.3M | ✅ | 46.7M | -3% |
| oneOf.json | 23 | ✅ | 44.4M | ✅ | 32.5M | 🟢 **-27%** |
| pattern.json | 9 | ✅ | 55.0M | ✅ | 52.1M | -5% |
| patternProperties.json | 18 | ✅ | 23.4M | ✅ | 11.5M | 🟢 **-51%** |
| properties.json | 17 | ✅ | 35.9M | ⚠️ 1 fail | - | - |
| ref.json | 26 | ✅ | 41.6M | ⚠️ 17 fail | - | - |
| refRemote.json | 6 | ✅ | 48.9M | ⚠️ 11 fail | - | - |
| required.json | 8 | ✅ | 64.4M | ⚠️ 4 fail | - | - |
| type.json | 79 | ✅ | 52.7M | ✅ | 51.5M | -2% |
| uniqueItems.json | 69 | ✅ | 26.4M | ✅ | 23.2M | -12% |
| optional/bignum.json | 7 | ✅ | 67.1M | ⚠️ 2 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.1M | ✅ | 26.3M | +5% |
| optional/format/date-time.json | 26 | ✅ | 24.2M | ✅ | 4.7M | 🟢 **-81%** |
| optional/format/email.json | 17 | ✅ | 20.7M | ✅ | 27.5M | 🔴 **+33%** |
| optional/format/ipv4.json | 16 | ✅ | 41.7M | ✅ | 38.4M | -8% |
| optional/format/ipv6.json | 40 | ✅ | 14.6M | ✅ | 4.5M | 🟢 **-69%** |
| optional/format/unknown.json | 7 | ✅ | 83.1M | ✅ | 73.9M | -11% |
| optional/format/uri.json | 36 | ✅ | 8.5M | ✅ | 5.9M | 🟢 **-31%** |
| optional/non-bmp-regex.json | 12 | ✅ | 27.0M | ✅ | 22.4M | -17% |

### draft6

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 61.9M | ✅ | 52.1M | -16% |
| additionalProperties.json | 16 | ✅ | 41.0M | ✅ | 29.2M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 48.7M | ✅ | 29.3M | 🟢 **-40%** |
| anyOf.json | 18 | ✅ | 55.8M | ✅ | 38.4M | 🟢 **-31%** |
| boolean_schema.json | 18 | ✅ | 58.1M | ✅ | 54.9M | -5% |
| const.json | 54 | ✅ | 29.8M | ✅ | 31.0M | +4% |
| contains.json | 19 | ✅ | 26.6M | ✅ | 13.3M | 🟢 **-50%** |
| default.json | 7 | ✅ | 61.6M | ✅ | 59.4M | -3% |
| definitions.json | 2 | ✅ | 16.1M | ✅ | 2.3M | 🟢 **-86%** |
| dependencies.json | 36 | ✅ | 40.9M | ✅ | 45.9M | +12% |
| enum.json | 45 | ✅ | 25.0M | ✅ | 35.5M | 🔴 **+42%** |
| exclusiveMaximum.json | 4 | ✅ | 61.6M | ✅ | 58.3M | -5% |
| exclusiveMinimum.json | 4 | ✅ | 60.6M | ✅ | 57.5M | -5% |
| format.json | 54 | ✅ | 75.1M | ✅ | 71.9M | -4% |
| infinite-loop-detection.json | 2 | ✅ | 49.8M | ✅ | 45.6M | -8% |
| items.json | 28 | ✅ | 37.3M | ✅ | 25.7M | 🟢 **-31%** |
| maxItems.json | 6 | ✅ | 57.9M | ✅ | 60.2M | +4% |
| maxLength.json | 7 | ✅ | 49.6M | ✅ | 56.2M | +13% |
| maxProperties.json | 10 | ✅ | 45.5M | ✅ | 47.6M | +5% |
| maximum.json | 8 | ✅ | 68.8M | ✅ | 63.4M | -8% |
| minItems.json | 6 | ✅ | 57.4M | ✅ | 60.8M | +6% |
| minLength.json | 7 | ✅ | 48.3M | ✅ | 54.8M | +14% |
| minProperties.json | 8 | ✅ | 49.0M | ✅ | 53.3M | +9% |
| minimum.json | 11 | ✅ | 70.0M | ✅ | 64.7M | -7% |
| multipleOf.json | 10 | ✅ | 65.1M | ✅ | 28.5M | 🟢 **-56%** |
| not.json | 38 | ✅ | 54.3M | ✅ | 53.1M | -2% |
| oneOf.json | 27 | ✅ | 47.6M | ✅ | 33.0M | 🟢 **-31%** |
| pattern.json | 9 | ✅ | 56.2M | ✅ | 53.9M | -4% |
| patternProperties.json | 23 | ✅ | 22.3M | ✅ | 14.9M | 🟢 **-33%** |
| properties.json | 21 | ✅ | 36.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 43.6M | ✅ | 37.2M | -15% |
| ref.json | 65 | ✅ | 38.0M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 41.5M | ✅ | 37.0M | -11% |
| required.json | 9 | ✅ | 64.9M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 52.4M | ✅ | 50.4M | -4% |
| uniqueItems.json | 69 | ✅ | 25.9M | ✅ | 23.0M | -11% |
| optional/bignum.json | 9 | ✅ | 61.6M | ✅ | 32.4M | 🟢 **-47%** |
| optional/ecmascript-regex.json | 74 | ✅ | 25.0M | ✅ | 26.1M | +4% |
| optional/format/date-time.json | 26 | ✅ | 23.7M | ✅ | 4.7M | 🟢 **-80%** |
| optional/format/email.json | 17 | ✅ | 19.9M | ✅ | 27.2M | 🔴 **+37%** |
| optional/format/ipv4.json | 16 | ✅ | 38.7M | ✅ | 38.5M | 0% |
| optional/format/ipv6.json | 40 | ✅ | 14.2M | ✅ | 4.4M | 🟢 **-69%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.5M | ✅ | 30.9M | -2% |
| optional/format/unknown.json | 7 | ✅ | 80.8M | ✅ | 73.2M | -9% |
| optional/format/uri-reference.json | 15 | ✅ | 12.5M | ✅ | 12.2M | -2% |
| optional/format/uri-template.json | 10 | ✅ | 22.0M | ✅ | 21.2M | -4% |
| optional/format/uri.json | 36 | ✅ | 8.4M | ✅ | 5.9M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 33.4M | ✅ | 19.4M | 🟢 **-42%** |
| optional/non-bmp-regex.json | 12 | ✅ | 27.5M | ✅ | 22.4M | -19% |

### draft7

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 60.1M | ✅ | 54.3M | -10% |
| additionalProperties.json | 16 | ✅ | 40.6M | ✅ | 29.0M | 🟢 **-29%** |
| allOf.json | 30 | ✅ | 47.8M | ✅ | 28.5M | 🟢 **-40%** |
| anyOf.json | 18 | ✅ | 56.7M | ✅ | 39.8M | 🟢 **-30%** |
| boolean_schema.json | 18 | ✅ | 56.5M | ✅ | 55.5M | -2% |
| const.json | 54 | ✅ | 30.5M | ✅ | 31.6M | +4% |
| contains.json | 21 | ✅ | 31.5M | ✅ | 23.2M | 🟢 **-26%** |
| default.json | 7 | ✅ | 59.2M | ✅ | 59.7M | +1% |
| definitions.json | 2 | ✅ | 17.2M | ✅ | 2.1M | 🟢 **-88%** |
| dependencies.json | 36 | ✅ | 41.4M | ✅ | 40.1M | -3% |
| enum.json | 45 | ✅ | 25.3M | ✅ | 35.4M | 🔴 **+40%** |
| exclusiveMaximum.json | 4 | ✅ | 61.1M | ✅ | 56.9M | -7% |
| exclusiveMinimum.json | 4 | ✅ | 59.9M | ✅ | 56.8M | -5% |
| format.json | 102 | ✅ | 74.2M | ✅ | 71.8M | -3% |
| if-then-else.json | 26 | ✅ | 63.7M | ✅ | 54.3M | -15% |
| infinite-loop-detection.json | 2 | ✅ | 46.7M | ✅ | 46.0M | -1% |
| items.json | 28 | ✅ | 38.4M | ✅ | 25.1M | 🟢 **-35%** |
| maxItems.json | 6 | ✅ | 58.0M | ✅ | 59.1M | +2% |
| maxLength.json | 7 | ✅ | 49.4M | ✅ | 56.6M | +14% |
| maxProperties.json | 10 | ✅ | 45.7M | ✅ | 47.1M | +3% |
| maximum.json | 8 | ✅ | 68.4M | ✅ | 63.6M | -7% |
| minItems.json | 6 | ✅ | 57.9M | ✅ | 61.4M | +6% |
| minLength.json | 7 | ✅ | 48.4M | ✅ | 54.5M | +13% |
| minProperties.json | 8 | ✅ | 49.0M | ✅ | 53.5M | +9% |
| minimum.json | 11 | ✅ | 70.3M | ✅ | 64.9M | -8% |
| multipleOf.json | 10 | ✅ | 64.6M | ✅ | 28.9M | 🟢 **-55%** |
| not.json | 38 | ✅ | 52.9M | ✅ | 53.2M | +1% |
| oneOf.json | 27 | ✅ | 50.5M | ✅ | 32.7M | 🟢 **-35%** |
| pattern.json | 9 | ✅ | 54.8M | ✅ | 54.1M | -1% |
| patternProperties.json | 23 | ✅ | 23.2M | ✅ | 11.8M | 🟢 **-49%** |
| properties.json | 21 | ✅ | 38.1M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 40.7M | ✅ | 37.0M | -9% |
| ref.json | 73 | ✅ | 37.3M | ⚠️ 3 fail | - | - |
| refRemote.json | 23 | ✅ | 42.3M | ✅ | 37.5M | -11% |
| required.json | 9 | ✅ | 64.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 51.6M | ✅ | 50.7M | -2% |
| uniqueItems.json | 69 | ✅ | 25.8M | ✅ | 22.7M | -12% |
| optional/bignum.json | 9 | ✅ | 61.2M | ✅ | 32.2M | 🟢 **-47%** |
| optional/ecmascript-regex.json | 74 | ✅ | 24.9M | ✅ | 25.8M | +4% |
| optional/format/date-time.json | 26 | ✅ | 23.7M | ✅ | 4.7M | 🟢 **-80%** |
| optional/format/date.json | 48 | ✅ | 10.0M | ✅ | 10.0M | 0% |
| optional/format/email.json | 17 | ✅ | 20.2M | ✅ | 27.7M | 🔴 **+37%** |
| optional/format/ipv4.json | 16 | ✅ | 38.7M | ✅ | 38.4M | -1% |
| optional/format/ipv6.json | 40 | ✅ | 14.2M | ✅ | 4.4M | 🟢 **-69%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.8M | ✅ | 30.8M | 0% |
| optional/format/regex.json | 8 | ✅ | 69.1M | ✅ | 1.3M | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.4M | ✅ | 35.9M | -4% |
| optional/format/time.json | 46 | ✅ | 8.3M | ✅ | 7.8M | -6% |
| optional/format/unknown.json | 7 | ✅ | 82.4M | ✅ | 71.7M | -13% |
| optional/format/uri-reference.json | 15 | ✅ | 12.1M | ✅ | 12.2M | +1% |
| optional/format/uri-template.json | 10 | ✅ | 20.5M | ✅ | 21.3M | +4% |
| optional/format/uri.json | 36 | ✅ | 8.3M | ✅ | 5.9M | 🟢 **-30%** |
| optional/id.json | 7 | ✅ | 28.2M | ✅ | 30.2M | +7% |
| optional/non-bmp-regex.json | 12 | ✅ | 27.4M | ✅ | 22.2M | -19% |

### draft2019-09

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 36.5M | ✅ | 54.2M | 🔴 **+49%** |
| additionalProperties.json | 21 | ✅ | 28.1M | ✅ | 27.5M | -2% |
| allOf.json | 30 | ✅ | 31.1M | ✅ | 29.0M | -7% |
| anchor.json | 8 | ✅ | 34.2M | ✅ | 58.8M | 🔴 **+72%** |
| anyOf.json | 18 | ✅ | 34.6M | ✅ | 36.8M | +6% |
| boolean_schema.json | 18 | ✅ | 36.7M | ✅ | 56.0M | 🔴 **+53%** |
| const.json | 54 | ✅ | 22.3M | ✅ | 31.7M | 🔴 **+42%** |
| contains.json | 21 | ✅ | 23.0M | ✅ | 23.3M | +2% |
| content.json | 18 | ✅ | 46.2M | ✅ | 74.7M | 🔴 **+62%** |
| default.json | 7 | ✅ | 39.5M | ✅ | 59.6M | 🔴 **+51%** |
| defs.json | 2 | ✅ | 2.8M | ✅ | 1.3M | 🟢 **-55%** |
| dependentRequired.json | 20 | ✅ | 35.1M | ✅ | 47.5M | 🔴 **+35%** |
| dependentSchemas.json | 20 | ✅ | 31.9M | ✅ | 48.0M | 🔴 **+50%** |
| enum.json | 45 | ✅ | 19.4M | ✅ | 35.9M | 🔴 **+85%** |
| exclusiveMaximum.json | 4 | ✅ | 37.4M | ✅ | 58.5M | 🔴 **+56%** |
| exclusiveMinimum.json | 4 | ✅ | 36.0M | ✅ | 57.9M | 🔴 **+61%** |
| format.json | 114 | ✅ | 46.8M | ✅ | 69.7M | 🔴 **+49%** |
| if-then-else.json | 26 | ✅ | 37.3M | ✅ | 54.2M | 🔴 **+45%** |
| infinite-loop-detection.json | 2 | ✅ | 31.9M | ✅ | 46.8M | 🔴 **+47%** |
| items.json | 28 | ✅ | 29.1M | ✅ | 38.2M | 🔴 **+31%** |
| maxContains.json | 12 | ✅ | 30.8M | ✅ | 46.1M | 🔴 **+50%** |
| maxItems.json | 6 | ✅ | 40.3M | ✅ | 61.4M | 🔴 **+52%** |
| maxLength.json | 7 | ✅ | 38.4M | ✅ | 56.9M | 🔴 **+48%** |
| maxProperties.json | 10 | ✅ | 32.8M | ✅ | 49.0M | 🔴 **+49%** |
| maximum.json | 8 | ✅ | 39.4M | ✅ | 63.4M | 🔴 **+61%** |
| minContains.json | 28 | ✅ | 30.3M | ✅ | 51.6M | 🔴 **+70%** |
| minItems.json | 6 | ✅ | 40.7M | ✅ | 61.0M | 🔴 **+50%** |
| minLength.json | 7 | ✅ | 35.6M | ✅ | 54.8M | 🔴 **+54%** |
| minProperties.json | 8 | ✅ | 32.9M | ✅ | 53.5M | 🔴 **+63%** |
| minimum.json | 11 | ✅ | 35.7M | ✅ | 62.4M | 🔴 **+75%** |
| multipleOf.json | 10 | ✅ | 37.0M | ✅ | 28.5M | 🟢 **-23%** |
| not.json | 40 | ✅ | 33.8M | ✅ | 51.0M | 🔴 **+51%** |
| oneOf.json | 27 | ✅ | 32.6M | ✅ | 31.8M | -2% |
| pattern.json | 9 | ✅ | 35.3M | ✅ | 55.0M | 🔴 **+56%** |
| patternProperties.json | 23 | ✅ | 19.1M | ✅ | 9.6M | 🟢 **-50%** |
| properties.json | 21 | ✅ | 27.0M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.3M | ✅ | 37.2M | 🔴 **+23%** |
| recursiveRef.json | 31 | ✅ | 8.7M | ⚠️ 2 fail | - | - |
| ref.json | 73 | ✅ | 21.7M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.0M | ✅ | 40.2M | 🔴 **+39%** |
| required.json | 9 | ✅ | 36.7M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 31.8M | ✅ | 51.4M | 🔴 **+62%** |
| unevaluatedItems.json | 51 | ✅ | 19.7M | ⚠️ 3 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.5M | ⚠️ 3 fail | - | - |
| uniqueItems.json | 69 | ✅ | 20.7M | ✅ | 22.9M | +11% |
| vocabulary.json | 2 | ✅ | 36.0M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 21.9M | ✅ | 16.9M | 🟢 **-23%** |
| optional/bignum.json | 9 | ✅ | 34.4M | ✅ | 33.9M | -2% |
| optional/dependencies-compatibility.json | 36 | ✅ | 33.9M | ✅ | 47.5M | 🔴 **+40%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.9M | ✅ | 26.4M | 🔴 **+33%** |
| optional/format/date-time.json | 26 | ✅ | 19.5M | ✅ | 4.7M | 🟢 **-76%** |
| optional/format/date.json | 48 | ✅ | 9.3M | ✅ | 10.0M | +8% |
| optional/format/email.json | 17 | ✅ | 17.1M | ✅ | 27.3M | 🔴 **+59%** |
| optional/format/idn-email.json | 10 | ✅ | 18.1M | ✅ | 146K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 27.9M | ✅ | 38.2M | 🔴 **+37%** |
| optional/format/ipv6.json | 40 | ✅ | 12.6M | ✅ | 4.4M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.6M | ✅ | 31.1M | 🔴 **+32%** |
| optional/format/regex.json | 8 | ✅ | 39.1M | ✅ | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.6M | ✅ | 36.1M | 🔴 **+36%** |
| optional/format/time.json | 46 | ✅ | 7.8M | ✅ | 7.9M | +1% |
| optional/format/unknown.json | 7 | ✅ | 43.0M | ✅ | 68.2M | 🔴 **+59%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.8M | ✅ | 11.6M | +8% |
| optional/format/uri-template.json | 10 | ✅ | 15.8M | ✅ | 20.2M | 🔴 **+28%** |
| optional/format/uri.json | 36 | ✅ | 7.7M | ✅ | 5.8M | 🟢 **-24%** |
| optional/format/uuid.json | 22 | ✅ | 14.3M | ✅ | 18.4M | 🔴 **+29%** |
| optional/id.json | 3 | ✅ | 19.2M | ✅ | 19.6M | +2% |
| optional/no-schema.json | 3 | ✅ | 38.3M | ✅ | 65.0M | 🔴 **+70%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.7M | ✅ | 16.1M | 🟢 **-26%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 33.6M | ✅ | 52.3M | 🔴 **+55%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 27.9M | ✅ | 20.7M | 🟢 **-26%** |
| allOf.json | 30 | ✅ | 31.0M | ✅ | 29.0M | -7% |
| anchor.json | 8 | ✅ | 31.6M | ✅ | 60.7M | 🔴 **+92%** |
| anyOf.json | 18 | ✅ | 34.7M | ✅ | 36.5M | +5% |
| boolean_schema.json | 18 | ✅ | 34.6M | ✅ | 52.3M | 🔴 **+51%** |
| const.json | 54 | ✅ | 22.5M | ✅ | 32.0M | 🔴 **+43%** |
| contains.json | 21 | ✅ | 22.8M | ✅ | 23.2M | +2% |
| content.json | 18 | ✅ | 45.4M | ✅ | 73.8M | 🔴 **+63%** |
| default.json | 7 | ✅ | 38.5M | ✅ | 59.1M | 🔴 **+54%** |
| defs.json | 2 | ✅ | 3.5M | ✅ | 1.3M | 🟢 **-64%** |
| dependentRequired.json | 20 | ✅ | 34.8M | ✅ | 53.7M | 🔴 **+54%** |
| dependentSchemas.json | 20 | ✅ | 32.0M | ✅ | 47.3M | 🔴 **+48%** |
| dynamicRef.json | 4 | ✅ | 11.7M | ⚠️ 25 fail | - | - |
| enum.json | 45 | ✅ | 19.4M | ✅ | 35.6M | 🔴 **+83%** |
| exclusiveMaximum.json | 4 | ✅ | 36.8M | ✅ | 58.4M | 🔴 **+59%** |
| exclusiveMinimum.json | 4 | ✅ | 36.7M | ✅ | 57.8M | 🔴 **+57%** |
| format.json | 133 | ✅ | 46.6M | ✅ | 66.8M | 🔴 **+43%** |
| if-then-else.json | 26 | ✅ | 37.4M | ✅ | 54.9M | 🔴 **+47%** |
| infinite-loop-detection.json | 2 | ✅ | 30.8M | ✅ | 45.8M | 🔴 **+49%** |
| items.json | 29 | ✅ | 27.7M | ✅ | 35.4M | 🔴 **+28%** |
| maxContains.json | 12 | ✅ | 29.1M | ✅ | 45.9M | 🔴 **+58%** |
| maxItems.json | 6 | ✅ | 36.4M | ✅ | 61.5M | 🔴 **+69%** |
| maxLength.json | 7 | ✅ | 33.4M | ✅ | 56.2M | 🔴 **+69%** |
| maxProperties.json | 10 | ✅ | 30.6M | ✅ | 47.2M | 🔴 **+55%** |
| maximum.json | 8 | ✅ | 42.2M | ✅ | 63.5M | 🔴 **+50%** |
| minContains.json | 28 | ✅ | 30.1M | ✅ | 51.8M | 🔴 **+72%** |
| minItems.json | 6 | ✅ | 37.5M | ✅ | 61.0M | 🔴 **+63%** |
| minLength.json | 7 | ✅ | 30.6M | ✅ | 54.5M | 🔴 **+78%** |
| minProperties.json | 8 | ✅ | 31.1M | ✅ | 52.9M | 🔴 **+70%** |
| minimum.json | 11 | ✅ | 35.7M | ✅ | 65.0M | 🔴 **+82%** |
| multipleOf.json | 10 | ✅ | 36.8M | ✅ | 28.6M | 🟢 **-22%** |
| not.json | 40 | ✅ | 32.7M | ✅ | 51.8M | 🔴 **+58%** |
| oneOf.json | 27 | ✅ | 32.4M | ✅ | 32.5M | +0% |
| pattern.json | 9 | ✅ | 34.5M | ✅ | 54.5M | 🔴 **+58%** |
| patternProperties.json | 23 | ✅ | 18.9M | ✅ | 12.4M | 🟢 **-34%** |
| prefixItems.json | 11 | ✅ | 38.9M | ✅ | 65.2M | 🔴 **+67%** |
| properties.json | 21 | ✅ | 27.4M | ⚠️ 1 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.2M | ✅ | 38.0M | 🔴 **+26%** |
| ref.json | 71 | ✅ | 23.4M | ⚠️ 8 fail | - | - |
| refRemote.json | 31 | ✅ | 29.7M | ✅ | 26.6M | -10% |
| required.json | 9 | ✅ | 36.8M | ⚠️ 4 fail | - | - |
| type.json | 80 | ✅ | 32.0M | ✅ | 51.6M | 🔴 **+61%** |
| unevaluatedItems.json | 47 | ✅ | 24.5M | ⚠️ 12 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 15.1M | ⚠️ 5 fail | - | - |
| uniqueItems.json | 69 | ✅ | 21.8M | ✅ | 22.4M | +3% |
| vocabulary.json | 2 | ✅ | 36.5M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 22.1M | ✅ | 17.7M | -20% |
| optional/bignum.json | 9 | ✅ | 36.3M | ✅ | 32.1M | -12% |
| optional/dependencies-compatibility.json | 36 | ✅ | 33.9M | ✅ | 51.8M | 🔴 **+53%** |
| optional/ecmascript-regex.json | 74 | ✅ | 19.5M | ✅ | 26.2M | 🔴 **+35%** |
| optional/format/date-time.json | 26 | ✅ | 19.5M | ✅ | 4.6M | 🟢 **-76%** |
| optional/format/date.json | 48 | ✅ | 9.3M | ✅ | 9.9M | +7% |
| optional/format/idn-email.json | 10 | ✅ | 18.1M | ✅ | 154K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ | 26.1M | ✅ | 38.7M | 🔴 **+48%** |
| optional/format/ipv6.json | 40 | ✅ | 12.6M | ✅ | 4.4M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ | 23.7M | ✅ | 31.2M | 🔴 **+32%** |
| optional/format/regex.json | 8 | ✅ | 35.7M | ✅ | 1.3M | 🟢 **-96%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.3M | ✅ | 36.0M | 🔴 **+37%** |
| optional/format/time.json | 46 | ✅ | 7.8M | ✅ | 7.8M | +0% |
| optional/format/unknown.json | 7 | ✅ | 45.9M | ✅ | 72.4M | 🔴 **+57%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.8M | ✅ | 12.1M | +12% |
| optional/format/uri-template.json | 10 | ✅ | 17.0M | ✅ | 21.4M | 🔴 **+26%** |
| optional/format/uri.json | 36 | ✅ | 7.7M | ✅ | 5.8M | 🟢 **-24%** |
| optional/format/uuid.json | 22 | ✅ | 14.2M | ✅ | 18.6M | 🔴 **+31%** |
| optional/id.json | 3 | ✅ | 18.6M | ✅ | 19.4M | +4% |
| optional/no-schema.json | 3 | ✅ | 37.3M | ✅ | 65.1M | 🔴 **+74%** |
| optional/non-bmp-regex.json | 12 | ✅ | 14.2M | ✅ | 18.3M | 🔴 **+29%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 32.1M | ✅ | 53.1M | 🔴 **+65%** |

