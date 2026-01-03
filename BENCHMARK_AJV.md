# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | tjs vs ajv |
|-------|------:|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| draft4 | 38 | 790 | ⚠️ 881 | 1 | 29.9M | ⚠️ 827 | 55 | 19.4M | 🟢 **-35%** |
| draft6 | 49 | 1120 | ✅ 1170 | 0 | 31.2M | ⚠️ 1157 | 13 | 21.1M | 🟢 **-32%** |
| draft7 | 54 | 1324 | ✅ 1534 | 0 | 27.2M | ⚠️ 1443 | 91 | 18.2M | 🟢 **-33%** |
| draft2019-09 | 69 | 1703 | ✅ 1941 | 0 | 20.3M | ⚠️ 1855 | 86 | 10.3M | 🟢 **-49%** |
| draft2020-12 | 68 | 1665 | ✅ 1990 | 0 | 21.4M | ⚠️ 1860 | 130 | 10.8M | 🟢 **-50%** |
| **Total** | 278 | 6602 | ✅ 7516 | 1 | 24.2M | ✅ 7142 | 375 | 13.6M | 🟢 **-44%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs ajv**: 🟢 tjs is 1.78x faster (41 ns vs 74 ns, 6602 tests)

## Detailed Results

### draft4

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 17 | ✅ 17 | 0 | 69.9M | ✅ 17 | 0 | 58.5M | -16% |
| additionalProperties.json | 16 | ✅ 16 | 0 | 42.3M | ✅ 16 | 0 | 29.7M | 🟢 **-30%** |
| allOf.json | 27 | ✅ 27 | 0 | 50.4M | ✅ 27 | 0 | 28.2M | 🟢 **-44%** |
| anyOf.json | 15 | ✅ 15 | 0 | 55.7M | ✅ 15 | 0 | 39.2M | 🟢 **-30%** |
| default.json | 7 | ✅ 7 | 0 | 64.0M | ✅ 7 | 0 | 60.4M | -6% |
| dependencies.json | 29 | ✅ 29 | 0 | 39.3M | ✅ 29 | 0 | 43.8M | +11% |
| enum.json | 49 | ✅ 49 | 0 | 25.5M | ✅ 49 | 0 | 36.4M | 🔴 **+42%** |
| format.json | 36 | ✅ 36 | 0 | 78.1M | ✅ 36 | 0 | 72.1M | -8% |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 49.6M | ✅ 2 | 0 | 41.3M | -17% |
| items.json | 21 | ✅ 21 | 0 | 31.9M | ✅ 21 | 0 | 34.6M | +8% |
| maxItems.json | 4 | ✅ 4 | 0 | 70.9M | ✅ 4 | 0 | 71.0M | +0% |
| maxLength.json | 5 | ✅ 5 | 0 | 65.0M | ✅ 5 | 0 | 61.5M | -5% |
| maxProperties.json | 8 | ✅ 8 | 0 | 54.3M | ✅ 8 | 0 | 51.0M | -6% |
| maximum.json | 8 | ✅ 14 | 0 | 69.9M | ⚠️ 8 | 6 | 63.7M | -9% |
| minItems.json | 4 | ✅ 4 | 0 | 69.3M | ✅ 4 | 0 | 70.8M | +2% |
| minLength.json | 5 | ✅ 5 | 0 | 59.2M | ✅ 5 | 0 | 54.5M | -8% |
| minProperties.json | 6 | ✅ 6 | 0 | 62.1M | ✅ 6 | 0 | 57.8M | -7% |
| minimum.json | 11 | ✅ 17 | 0 | 71.7M | ⚠️ 11 | 6 | 65.2M | -9% |
| multipleOf.json | 10 | ✅ 10 | 0 | 66.0M | ✅ 10 | 0 | 28.6M | 🟢 **-57%** |
| not.json | 20 | ✅ 20 | 0 | 57.3M | ✅ 20 | 0 | 51.7M | -10% |
| oneOf.json | 23 | ✅ 23 | 0 | 43.0M | ✅ 23 | 0 | 33.7M | 🟢 **-22%** |
| pattern.json | 9 | ✅ 9 | 0 | 55.5M | ✅ 9 | 0 | 54.9M | -1% |
| patternProperties.json | 18 | ✅ 18 | 0 | 24.0M | ✅ 18 | 0 | 15.1M | 🟢 **-37%** |
| properties.json | 17 | ✅ 24 | 0 | 36.6M | ⚠️ 23 | 1 | 22.8M | 🟢 **-38%** |
| ref.json | 26 | ✅ 45 | 0 | 42.7M | ⚠️ 28 | 17 | 40.1M | -6% |
| refRemote.json | 6 | ✅ 17 | 0 | 50.2M | ⚠️ 6 | 11 | 59.7M | +19% |
| required.json | 8 | ✅ 15 | 0 | 65.3M | ⚠️ 11 | 4 | 58.6M | -10% |
| type.json | 79 | ✅ 79 | 0 | 54.8M | ✅ 79 | 0 | 51.7M | -6% |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.9M | ✅ 69 | 0 | 23.2M | -14% |
| optional/bignum.json | 7 | ✅ 9 | 0 | 70.1M | ⚠️ 7 | 2 | 31.4M | 🟢 **-55%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 22.1M | ✅ 74 | 0 | 24.0M | +9% |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 24.8M | ✅ 26 | 0 | 4.7M | 🟢 **-81%** |
| optional/format/email.json | 17 | ✅ 17 | 0 | 21.3M | ✅ 17 | 0 | 27.9M | 🔴 **+31%** |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 42.0M | ✅ 16 | 0 | 38.7M | -8% |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 15.0M | ✅ 40 | 0 | 4.4M | 🟢 **-70%** |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 91.4M | ✅ 7 | 0 | 70.8M | 🟢 **-23%** |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.6M | ✅ 36 | 0 | 5.9M | 🟢 **-31%** |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 29.5M | ✅ 12 | 0 | 22.2M | 🟢 **-25%** |

### draft6

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 64.5M | ✅ 19 | 0 | 55.2M | -14% |
| additionalProperties.json | 16 | ✅ 16 | 0 | 42.1M | ✅ 16 | 0 | 29.4M | 🟢 **-30%** |
| allOf.json | 30 | ✅ 30 | 0 | 48.5M | ✅ 30 | 0 | 29.1M | 🟢 **-40%** |
| anyOf.json | 18 | ✅ 18 | 0 | 44.4M | ✅ 18 | 0 | 38.4M | -14% |
| boolean_schema.json | 18 | ✅ 18 | 0 | 61.3M | ✅ 18 | 0 | 56.0M | -9% |
| const.json | 54 | ✅ 54 | 0 | 31.1M | ✅ 54 | 0 | 31.4M | +1% |
| contains.json | 19 | ✅ 19 | 0 | 31.0M | ✅ 19 | 0 | 22.3M | 🟢 **-28%** |
| default.json | 7 | ✅ 7 | 0 | 63.4M | ✅ 7 | 0 | 59.6M | -6% |
| definitions.json | 2 | ✅ 2 | 0 | 17.3M | ✅ 2 | 0 | 2.3M | 🟢 **-87%** |
| dependencies.json | 36 | ✅ 36 | 0 | 42.1M | ✅ 36 | 0 | 46.0M | +9% |
| enum.json | 45 | ✅ 45 | 0 | 25.2M | ✅ 45 | 0 | 35.6M | 🔴 **+42%** |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 63.0M | ✅ 4 | 0 | 59.6M | -5% |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 63.2M | ✅ 4 | 0 | 59.6M | -6% |
| format.json | 54 | ✅ 54 | 0 | 77.8M | ✅ 54 | 0 | 70.9M | -9% |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 50.1M | ✅ 2 | 0 | 41.1M | -18% |
| items.json | 28 | ✅ 28 | 0 | 41.0M | ✅ 28 | 0 | 39.0M | -5% |
| maxItems.json | 6 | ✅ 6 | 0 | 59.8M | ✅ 6 | 0 | 61.1M | +2% |
| maxLength.json | 7 | ✅ 7 | 0 | 50.6M | ✅ 7 | 0 | 56.5M | +12% |
| maxProperties.json | 10 | ✅ 10 | 0 | 47.9M | ✅ 10 | 0 | 48.7M | +2% |
| maximum.json | 8 | ✅ 8 | 0 | 70.6M | ✅ 8 | 0 | 62.5M | -11% |
| minItems.json | 6 | ✅ 6 | 0 | 60.6M | ✅ 6 | 0 | 61.6M | +2% |
| minLength.json | 7 | ✅ 7 | 0 | 49.6M | ✅ 7 | 0 | 54.7M | +10% |
| minProperties.json | 8 | ✅ 8 | 0 | 50.7M | ✅ 8 | 0 | 51.0M | +1% |
| minimum.json | 11 | ✅ 11 | 0 | 71.7M | ✅ 11 | 0 | 65.1M | -9% |
| multipleOf.json | 10 | ✅ 10 | 0 | 66.7M | ✅ 10 | 0 | 28.2M | 🟢 **-58%** |
| not.json | 38 | ✅ 38 | 0 | 55.1M | ✅ 38 | 0 | 53.6M | -3% |
| oneOf.json | 27 | ✅ 27 | 0 | 49.1M | ✅ 27 | 0 | 33.7M | 🟢 **-31%** |
| pattern.json | 9 | ✅ 9 | 0 | 56.3M | ✅ 9 | 0 | 54.2M | -4% |
| patternProperties.json | 23 | ✅ 23 | 0 | 23.9M | ✅ 23 | 0 | 11.5M | 🟢 **-52%** |
| properties.json | 21 | ✅ 28 | 0 | 39.6M | ⚠️ 27 | 1 | 27.3M | 🟢 **-31%** |
| propertyNames.json | 20 | ✅ 20 | 0 | 44.5M | ✅ 20 | 0 | 37.6M | -15% |
| ref.json | 65 | ✅ 70 | 0 | 39.3M | ⚠️ 67 | 3 | 27.9M | 🟢 **-29%** |
| refRemote.json | 23 | ✅ 23 | 0 | 43.5M | ✅ 23 | 0 | 37.7M | -13% |
| required.json | 9 | ✅ 16 | 0 | 66.3M | ⚠️ 12 | 4 | 59.8M | -10% |
| type.json | 80 | ✅ 80 | 0 | 54.2M | ✅ 80 | 0 | 51.5M | -5% |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.7M | ✅ 69 | 0 | 22.7M | -15% |
| optional/bignum.json | 9 | ✅ 9 | 0 | 63.9M | ✅ 9 | 0 | 32.6M | 🟢 **-49%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 23.5M | ✅ 74 | 0 | 25.5M | +9% |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 24.2M | ✅ 26 | 0 | 4.7M | 🟢 **-81%** |
| optional/format/email.json | 17 | ✅ 17 | 0 | 20.5M | ✅ 17 | 0 | 27.7M | 🔴 **+35%** |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 39.3M | ✅ 16 | 0 | 38.1M | -3% |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 14.3M | ✅ 40 | 0 | 4.4M | 🟢 **-69%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 32.4M | ✅ 38 | 0 | 30.4M | -6% |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 90.1M | ✅ 7 | 0 | 73.1M | -19% |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 12.3M | ✅ 15 | 0 | 12.1M | -2% |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 22.2M | ✅ 10 | 0 | 21.2M | -5% |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.5M | ✅ 36 | 0 | 5.8M | 🟢 **-32%** |
| optional/id.json | 7 | ✅ 7 | 0 | 33.7M | ✅ 7 | 0 | 19.2M | 🟢 **-43%** |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 27.9M | ✅ 12 | 0 | 22.1M | 🟢 **-21%** |

### draft7

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 63.4M | ✅ 19 | 0 | 53.8M | -15% |
| additionalProperties.json | 16 | ✅ 16 | 0 | 41.0M | ✅ 16 | 0 | 28.9M | 🟢 **-30%** |
| allOf.json | 30 | ✅ 30 | 0 | 41.3M | ✅ 30 | 0 | 28.0M | 🟢 **-32%** |
| anyOf.json | 18 | ✅ 18 | 0 | 56.6M | ✅ 18 | 0 | 39.5M | 🟢 **-30%** |
| boolean_schema.json | 18 | ✅ 18 | 0 | 57.9M | ✅ 18 | 0 | 55.5M | -4% |
| const.json | 54 | ✅ 54 | 0 | 30.8M | ✅ 54 | 0 | 31.9M | +4% |
| contains.json | 21 | ✅ 21 | 0 | 32.3M | ✅ 21 | 0 | 23.2M | 🟢 **-28%** |
| default.json | 7 | ✅ 7 | 0 | 63.9M | ✅ 7 | 0 | 59.6M | -7% |
| definitions.json | 2 | ✅ 2 | 0 | 17.5M | ✅ 2 | 0 | 2.1M | 🟢 **-88%** |
| dependencies.json | 36 | ✅ 36 | 0 | 41.8M | ✅ 36 | 0 | 45.3M | +8% |
| enum.json | 45 | ✅ 45 | 0 | 25.3M | ✅ 45 | 0 | 35.3M | 🔴 **+40%** |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 64.1M | ✅ 4 | 0 | 59.1M | -8% |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 62.5M | ✅ 4 | 0 | 58.0M | -7% |
| format.json | 102 | ✅ 102 | 0 | 76.7M | ✅ 102 | 0 | 71.0M | -7% |
| if-then-else.json | 26 | ✅ 26 | 0 | 64.7M | ✅ 26 | 0 | 54.5M | -16% |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 41.9M | ✅ 2 | 0 | 40.8M | -3% |
| items.json | 28 | ✅ 28 | 0 | 39.2M | ✅ 28 | 0 | 38.1M | -3% |
| maxItems.json | 6 | ✅ 6 | 0 | 59.5M | ✅ 6 | 0 | 59.7M | +0% |
| maxLength.json | 7 | ✅ 7 | 0 | 49.1M | ✅ 7 | 0 | 52.2M | +6% |
| maxProperties.json | 10 | ✅ 10 | 0 | 46.5M | ✅ 10 | 0 | 42.7M | -8% |
| maximum.json | 8 | ✅ 8 | 0 | 67.5M | ✅ 8 | 0 | 63.3M | -6% |
| minItems.json | 6 | ✅ 6 | 0 | 59.8M | ✅ 6 | 0 | 60.7M | +1% |
| minLength.json | 7 | ✅ 7 | 0 | 49.1M | ✅ 7 | 0 | 52.5M | +7% |
| minProperties.json | 8 | ✅ 8 | 0 | 50.6M | ✅ 8 | 0 | 52.8M | +4% |
| minimum.json | 11 | ✅ 11 | 0 | 71.8M | ✅ 11 | 0 | 64.0M | -11% |
| multipleOf.json | 10 | ✅ 10 | 0 | 66.8M | ✅ 10 | 0 | 26.9M | 🟢 **-60%** |
| not.json | 38 | ✅ 38 | 0 | 53.0M | ✅ 38 | 0 | 52.7M | -1% |
| oneOf.json | 27 | ✅ 27 | 0 | 48.7M | ✅ 27 | 0 | 34.2M | 🟢 **-30%** |
| pattern.json | 9 | ✅ 9 | 0 | 56.3M | ✅ 9 | 0 | 54.5M | -3% |
| patternProperties.json | 23 | ✅ 23 | 0 | 23.8M | ✅ 23 | 0 | 11.7M | 🟢 **-51%** |
| properties.json | 21 | ✅ 28 | 0 | 36.9M | ⚠️ 27 | 1 | 26.7M | 🟢 **-28%** |
| propertyNames.json | 20 | ✅ 20 | 0 | 43.7M | ✅ 20 | 0 | 19.3M | 🟢 **-56%** |
| ref.json | 73 | ✅ 78 | 0 | 37.6M | ⚠️ 75 | 3 | 30.9M | -18% |
| refRemote.json | 23 | ✅ 23 | 0 | 42.9M | ✅ 23 | 0 | 37.5M | -13% |
| required.json | 9 | ✅ 16 | 0 | 65.8M | ⚠️ 12 | 4 | 60.0M | -9% |
| type.json | 80 | ✅ 80 | 0 | 52.4M | ✅ 80 | 0 | 50.5M | -4% |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.2M | ✅ 69 | 0 | 22.7M | -13% |
| optional/bignum.json | 9 | ✅ 9 | 0 | 62.2M | ✅ 9 | 0 | 32.0M | 🟢 **-49%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 25.4M | ✅ 74 | 0 | 25.7M | +1% |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 23.5M | ✅ 26 | 0 | 4.6M | 🟢 **-81%** |
| optional/format/date.json | 48 | ✅ 48 | 0 | 10.0M | ✅ 48 | 0 | 10.0M | +0% |
| optional/format/email.json | 17 | ✅ 17 | 0 | 20.3M | ✅ 17 | 0 | 27.0M | 🔴 **+33%** |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 39.6M | ✅ 16 | 0 | 37.8M | -4% |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 14.2M | ✅ 40 | 0 | 4.4M | 🟢 **-69%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 31.1M | ✅ 38 | 0 | 30.7M | -1% |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 67.2M | ✅ 8 | 0 | 1.3M | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 38.4M | ✅ 18 | 0 | 35.6M | -7% |
| optional/format/time.json | 46 | ✅ 46 | 0 | 8.2M | ✅ 46 | 0 | 7.7M | -5% |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 85.7M | ✅ 7 | 0 | 69.4M | -19% |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 12.0M | ✅ 15 | 0 | 11.8M | -2% |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 20.8M | ✅ 10 | 0 | 20.7M | 0% |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.4M | ✅ 36 | 0 | 5.8M | 🟢 **-31%** |
| optional/id.json | 7 | ✅ 7 | 0 | 28.2M | ✅ 7 | 0 | 29.5M | +5% |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 28.4M | ✅ 12 | 0 | 22.0M | 🟢 **-22%** |

### draft2019-09

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 37.9M | ✅ 19 | 0 | 55.0M | 🔴 **+45%** |
| additionalProperties.json | 21 | ✅ 21 | 0 | 28.3M | ✅ 21 | 0 | 27.7M | -2% |
| allOf.json | 30 | ✅ 30 | 0 | 33.1M | ✅ 30 | 0 | 28.8M | -13% |
| anchor.json | 8 | ✅ 8 | 0 | 34.8M | ✅ 8 | 0 | 60.7M | 🔴 **+74%** |
| anyOf.json | 18 | ✅ 18 | 0 | 36.1M | ✅ 18 | 0 | 36.6M | +1% |
| boolean_schema.json | 18 | ✅ 18 | 0 | 36.4M | ✅ 18 | 0 | 30.0M | -18% |
| const.json | 54 | ✅ 54 | 0 | 22.7M | ✅ 54 | 0 | 31.9M | 🔴 **+40%** |
| contains.json | 21 | ✅ 21 | 0 | 23.4M | ✅ 21 | 0 | 23.0M | -1% |
| content.json | 18 | ✅ 18 | 0 | 46.4M | ✅ 18 | 0 | 74.6M | 🔴 **+61%** |
| default.json | 7 | ✅ 7 | 0 | 40.2M | ✅ 7 | 0 | 59.2M | 🔴 **+47%** |
| defs.json | 2 | ✅ 2 | 0 | 2.7M | ✅ 2 | 0 | 1.5M | 🟢 **-44%** |
| dependentRequired.json | 20 | ✅ 20 | 0 | 35.2M | ✅ 20 | 0 | 54.3M | 🔴 **+54%** |
| dependentSchemas.json | 20 | ✅ 20 | 0 | 33.3M | ✅ 20 | 0 | 47.6M | 🔴 **+43%** |
| enum.json | 45 | ✅ 45 | 0 | 19.6M | ✅ 45 | 0 | 35.4M | 🔴 **+81%** |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 35.8M | ✅ 4 | 0 | 55.6M | 🔴 **+55%** |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 36.0M | ✅ 4 | 0 | 57.0M | 🔴 **+58%** |
| format.json | 114 | ✅ 114 | 0 | 45.1M | ✅ 114 | 0 | 70.5M | 🔴 **+56%** |
| if-then-else.json | 26 | ✅ 26 | 0 | 37.7M | ✅ 26 | 0 | 55.2M | 🔴 **+46%** |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 31.5M | ✅ 2 | 0 | 45.7M | 🔴 **+45%** |
| items.json | 28 | ✅ 28 | 0 | 29.4M | ✅ 28 | 0 | 37.4M | 🔴 **+27%** |
| maxContains.json | 12 | ✅ 12 | 0 | 31.6M | ✅ 12 | 0 | 44.2M | 🔴 **+40%** |
| maxItems.json | 6 | ✅ 6 | 0 | 42.0M | ✅ 6 | 0 | 61.2M | 🔴 **+46%** |
| maxLength.json | 7 | ✅ 7 | 0 | 39.1M | ✅ 7 | 0 | 56.5M | 🔴 **+44%** |
| maxProperties.json | 10 | ✅ 10 | 0 | 33.2M | ✅ 10 | 0 | 47.0M | 🔴 **+41%** |
| maximum.json | 8 | ✅ 8 | 0 | 40.1M | ✅ 8 | 0 | 63.6M | 🔴 **+59%** |
| minContains.json | 28 | ✅ 28 | 0 | 31.2M | ✅ 28 | 0 | 47.6M | 🔴 **+53%** |
| minItems.json | 6 | ✅ 6 | 0 | 35.0M | ✅ 6 | 0 | 61.2M | 🔴 **+75%** |
| minLength.json | 7 | ✅ 7 | 0 | 35.5M | ✅ 7 | 0 | 53.9M | 🔴 **+52%** |
| minProperties.json | 8 | ✅ 8 | 0 | 33.0M | ✅ 8 | 0 | 53.6M | 🔴 **+62%** |
| minimum.json | 11 | ✅ 11 | 0 | 36.3M | ✅ 11 | 0 | 65.3M | 🔴 **+80%** |
| multipleOf.json | 10 | ✅ 10 | 0 | 37.1M | ✅ 10 | 0 | 28.8M | 🟢 **-22%** |
| not.json | 40 | ✅ 40 | 0 | 34.3M | ✅ 40 | 0 | 51.9M | 🔴 **+51%** |
| oneOf.json | 27 | ✅ 27 | 0 | 32.2M | ✅ 27 | 0 | 31.1M | -3% |
| pattern.json | 9 | ✅ 9 | 0 | 36.0M | ✅ 9 | 0 | 54.8M | 🔴 **+52%** |
| patternProperties.json | 23 | ✅ 23 | 0 | 19.0M | ✅ 23 | 0 | 9.9M | 🟢 **-48%** |
| properties.json | 21 | ✅ 28 | 0 | 27.4M | ⚠️ 27 | 1 | 23.5M | -14% |
| propertyNames.json | 20 | ✅ 20 | 0 | 30.8M | ✅ 20 | 0 | 20.3M | 🟢 **-34%** |
| recursiveRef.json | 31 | ✅ 34 | 0 | 8.2M | ⚠️ 32 | 2 | 4.5M | 🟢 **-46%** |
| ref.json | 73 | ✅ 81 | 0 | 20.9M | ⚠️ 73 | 8 | 23.1M | +11% |
| refRemote.json | 31 | ✅ 31 | 0 | 29.2M | ✅ 31 | 0 | 38.1M | 🔴 **+31%** |
| required.json | 9 | ✅ 16 | 0 | 38.5M | ⚠️ 12 | 4 | 57.5M | 🔴 **+49%** |
| type.json | 80 | ✅ 80 | 0 | 32.7M | ✅ 80 | 0 | 51.7M | 🔴 **+58%** |
| unevaluatedItems.json | 51 | ✅ 56 | 0 | 19.6M | ⚠️ 53 | 3 | 42.4M | 🔴 **+117%** |
| unevaluatedProperties.json | 117 | ✅ 123 | 0 | 14.5M | ⚠️ 120 | 3 | 13.7M | -6% |
| uniqueItems.json | 69 | ✅ 69 | 0 | 20.3M | ✅ 69 | 0 | 22.7M | +12% |
| vocabulary.json | 2 | ✅ 5 | 0 | 34.0M | ⚠️ 4 | 1 | 67.3M | 🔴 **+98%** |
| optional/anchor.json | 4 | ✅ 4 | 0 | 21.6M | ✅ 4 | 0 | 16.0M | 🟢 **-26%** |
| optional/bignum.json | 9 | ✅ 9 | 0 | 36.9M | ✅ 9 | 0 | 32.5M | -12% |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | 0 | 33.9M | ✅ 36 | 0 | 52.1M | 🔴 **+53%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 19.7M | ✅ 74 | 0 | 25.6M | 🔴 **+30%** |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 19.8M | ✅ 26 | 0 | 4.7M | 🟢 **-77%** |
| optional/format/date.json | 48 | ✅ 48 | 0 | 9.2M | ✅ 48 | 0 | 10.0M | +8% |
| optional/format/email.json | 17 | ✅ 17 | 0 | 17.1M | ✅ 17 | 0 | 27.6M | 🔴 **+61%** |
| optional/format/idn-email.json | 10 | ✅ 10 | 0 | 18.3M | ✅ 10 | 0 | 144K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 27.9M | ✅ 16 | 0 | 38.2M | 🔴 **+37%** |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 12.7M | ✅ 40 | 0 | 4.4M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 23.5M | ✅ 38 | 0 | 30.8M | 🔴 **+31%** |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 39.6M | ✅ 8 | 0 | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 26.3M | ✅ 18 | 0 | 36.2M | 🔴 **+37%** |
| optional/format/time.json | 46 | ✅ 46 | 0 | 7.8M | ✅ 46 | 0 | 7.8M | 0% |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 43.6M | ✅ 7 | 0 | 71.7M | 🔴 **+65%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 10.8M | ✅ 15 | 0 | 12.1M | +13% |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 17.2M | ✅ 10 | 0 | 21.1M | 🔴 **+23%** |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 7.9M | ✅ 36 | 0 | 5.9M | 🟢 **-26%** |
| optional/format/uuid.json | 22 | ✅ 22 | 0 | 13.9M | ✅ 22 | 0 | 18.4M | 🔴 **+32%** |
| optional/id.json | 3 | ✅ 3 | 0 | 19.8M | ✅ 3 | 0 | 19.8M | 0% |
| optional/no-schema.json | 3 | ✅ 3 | 0 | 39.3M | ✅ 3 | 0 | 57.9M | 🔴 **+48%** |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 21.4M | ✅ 12 | 0 | 19.6M | -8% |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | 0 | 33.7M | ✅ 10 | 0 | 52.9M | 🔴 **+57%** |

### draft2020-12

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalProperties.json | 21 | ✅ 21 | 0 | 27.7M | ✅ 21 | 0 | 27.3M | -2% |
| allOf.json | 30 | ✅ 30 | 0 | 32.0M | ✅ 30 | 0 | 28.7M | -10% |
| anchor.json | 8 | ✅ 8 | 0 | 32.2M | ✅ 8 | 0 | 60.4M | 🔴 **+88%** |
| anyOf.json | 18 | ✅ 18 | 0 | 35.4M | ✅ 18 | 0 | 36.2M | +2% |
| boolean_schema.json | 18 | ✅ 18 | 0 | 35.7M | ✅ 18 | 0 | 55.7M | 🔴 **+56%** |
| const.json | 54 | ✅ 54 | 0 | 22.5M | ✅ 54 | 0 | 31.7M | 🔴 **+41%** |
| contains.json | 21 | ✅ 21 | 0 | 23.3M | ✅ 21 | 0 | 23.7M | +2% |
| content.json | 18 | ✅ 18 | 0 | 45.8M | ✅ 18 | 0 | 74.4M | 🔴 **+62%** |
| default.json | 7 | ✅ 7 | 0 | 39.0M | ✅ 7 | 0 | 59.2M | 🔴 **+52%** |
| defs.json | 2 | ✅ 2 | 0 | 3.5M | ✅ 2 | 0 | 1.3M | 🟢 **-64%** |
| dependentRequired.json | 20 | ✅ 20 | 0 | 35.2M | ✅ 20 | 0 | 51.2M | 🔴 **+45%** |
| dependentSchemas.json | 20 | ✅ 20 | 0 | 33.3M | ✅ 20 | 0 | 47.8M | 🔴 **+44%** |
| dynamicRef.json | 4 | ✅ 44 | 0 | 11.7M | ⚠️ 19 | 25 | 20.1M | 🔴 **+72%** |
| enum.json | 45 | ✅ 45 | 0 | 19.2M | ✅ 45 | 0 | 35.4M | 🔴 **+84%** |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 37.8M | ✅ 4 | 0 | 58.9M | 🔴 **+56%** |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 36.8M | ✅ 4 | 0 | 31.7M | -14% |
| format.json | 133 | ✅ 133 | 0 | 46.7M | ✅ 133 | 0 | 66.3M | 🔴 **+42%** |
| if-then-else.json | 26 | ✅ 26 | 0 | 35.8M | ✅ 26 | 0 | 54.6M | 🔴 **+53%** |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 32.4M | ✅ 2 | 0 | 41.9M | 🔴 **+29%** |
| items.json | 29 | ✅ 29 | 0 | 28.1M | ✅ 29 | 0 | 24.9M | -11% |
| maxContains.json | 12 | ✅ 12 | 0 | 30.2M | ✅ 12 | 0 | 45.9M | 🔴 **+52%** |
| maxItems.json | 6 | ✅ 6 | 0 | 37.1M | ✅ 6 | 0 | 60.0M | 🔴 **+62%** |
| maxLength.json | 7 | ✅ 7 | 0 | 34.5M | ✅ 7 | 0 | 56.2M | 🔴 **+63%** |
| maxProperties.json | 10 | ✅ 10 | 0 | 31.0M | ✅ 10 | 0 | 46.7M | 🔴 **+51%** |
| maximum.json | 8 | ✅ 8 | 0 | 40.7M | ✅ 8 | 0 | 63.8M | 🔴 **+57%** |
| minContains.json | 28 | ✅ 28 | 0 | 30.4M | ✅ 28 | 0 | 51.5M | 🔴 **+69%** |
| minItems.json | 6 | ✅ 6 | 0 | 37.9M | ✅ 6 | 0 | 61.1M | 🔴 **+61%** |
| minLength.json | 7 | ✅ 7 | 0 | 36.5M | ✅ 7 | 0 | 54.2M | 🔴 **+49%** |
| minProperties.json | 8 | ✅ 8 | 0 | 31.7M | ✅ 8 | 0 | 53.3M | 🔴 **+68%** |
| minimum.json | 11 | ✅ 11 | 0 | 36.2M | ✅ 11 | 0 | 65.2M | 🔴 **+80%** |
| multipleOf.json | 10 | ✅ 10 | 0 | 37.0M | ✅ 10 | 0 | 28.9M | 🟢 **-22%** |
| not.json | 40 | ✅ 40 | 0 | 33.3M | ✅ 40 | 0 | 51.9M | 🔴 **+56%** |
| oneOf.json | 27 | ✅ 27 | 0 | 32.5M | ✅ 27 | 0 | 32.5M | 0% |
| pattern.json | 9 | ✅ 9 | 0 | 34.0M | ✅ 9 | 0 | 53.7M | 🔴 **+58%** |
| patternProperties.json | 23 | ✅ 23 | 0 | 19.1M | ✅ 23 | 0 | 12.1M | 🟢 **-37%** |
| prefixItems.json | 11 | ✅ 11 | 0 | 39.6M | ✅ 11 | 0 | 65.2M | 🔴 **+65%** |
| properties.json | 21 | ✅ 28 | 0 | 27.8M | ⚠️ 27 | 1 | 27.2M | -2% |
| propertyNames.json | 20 | ✅ 20 | 0 | 29.0M | ✅ 20 | 0 | 37.8M | 🔴 **+30%** |
| ref.json | 71 | ✅ 79 | 0 | 23.8M | ⚠️ 71 | 8 | 28.0M | +18% |
| refRemote.json | 31 | ✅ 31 | 0 | 30.1M | ✅ 31 | 0 | 40.8M | 🔴 **+35%** |
| required.json | 9 | ✅ 16 | 0 | 38.8M | ⚠️ 12 | 4 | 59.1M | 🔴 **+52%** |
| type.json | 80 | ✅ 80 | 0 | 33.1M | ✅ 80 | 0 | 51.7M | 🔴 **+56%** |
| unevaluatedItems.json | 47 | ✅ 71 | 0 | 24.8M | ⚠️ 59 | 12 | 28.3M | +14% |
| unevaluatedProperties.json | 117 | ✅ 125 | 0 | 15.5M | ⚠️ 120 | 5 | 14.2M | -8% |
| uniqueItems.json | 69 | ✅ 69 | 0 | 22.3M | ✅ 69 | 0 | 22.9M | +3% |
| vocabulary.json | 2 | ✅ 5 | 0 | 37.2M | ⚠️ 4 | 1 | 67.8M | 🔴 **+82%** |
| optional/anchor.json | 4 | ✅ 4 | 0 | 22.2M | ✅ 4 | 0 | 16.0M | 🟢 **-28%** |
| optional/bignum.json | 9 | ✅ 9 | 0 | 38.2M | ✅ 9 | 0 | 32.8M | -14% |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | 0 | 34.6M | ✅ 36 | 0 | 51.5M | 🔴 **+49%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 19.4M | ✅ 74 | 0 | 25.4M | 🔴 **+31%** |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 19.9M | ✅ 26 | 0 | 4.7M | 🟢 **-77%** |
| optional/format/date.json | 48 | ✅ 48 | 0 | 9.2M | ✅ 48 | 0 | 9.9M | +7% |
| optional/format/idn-email.json | 10 | ✅ 10 | 0 | 18.6M | ✅ 10 | 0 | 147K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 25.8M | ✅ 16 | 0 | 38.4M | 🔴 **+49%** |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 12.7M | ✅ 40 | 0 | 4.4M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 23.3M | ✅ 38 | 0 | 31.1M | 🔴 **+33%** |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 39.6M | ✅ 8 | 0 | 1.3M | 🟢 **-97%** |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 26.4M | ✅ 18 | 0 | 35.8M | 🔴 **+35%** |
| optional/format/time.json | 46 | ✅ 46 | 0 | 7.8M | ✅ 46 | 0 | 7.8M | 0% |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 47.0M | ✅ 7 | 0 | 71.5M | 🔴 **+52%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 10.8M | ✅ 15 | 0 | 12.1M | +13% |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 17.2M | ✅ 10 | 0 | 21.4M | 🔴 **+24%** |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 7.7M | ✅ 36 | 0 | 5.8M | 🟢 **-25%** |
| optional/format/uuid.json | 22 | ✅ 22 | 0 | 14.3M | ✅ 22 | 0 | 18.7M | 🔴 **+31%** |
| optional/id.json | 3 | ✅ 3 | 0 | 19.8M | ✅ 3 | 0 | 19.8M | +0% |
| optional/no-schema.json | 3 | ✅ 3 | 0 | 39.5M | ✅ 3 | 0 | 64.4M | 🔴 **+63%** |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 21.6M | ✅ 12 | 0 | 19.8M | -8% |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | 0 | 26.7M | ✅ 10 | 0 | 53.7M | 🔴 **+101%** |

