# Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|-------|------:|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 881 | [1](#tjs-draft4-failures) | 17.6M | ✅ 827 | [55](#ajv-draft4-failures) | 11.6M | 🟢 -34% |
| draft6 | 49 | 1120 | ✅ 1170 | ✅ 0 | 17.3M | ✅ 1157 | [13](#ajv-draft6-failures) | 11.9M | 🟢 -31% |
| draft7 | 54 | 1324 | ✅ 1534 | ✅ 0 | 15.6M | ✅ 1443 | [91](#ajv-draft7-failures) | 10.7M | 🟢 -32% |
| draft2019-09 | 69 | 1703 | ✅ 1941 | ✅ 0 | 10.8M | ✅ 1855 | [86](#ajv-draft2019-09-failures) | 4.8M | 🟢 **-55%** |
| draft2020-12 | 68 | 1665 | ✅ 1990 | ✅ 0 | 11.0M | ✅ 1860 | [130](#ajv-draft2020-12-failures) | 4.9M | 🟢 **-55%** |
| **Total** | 278 | 6602 | ✅ 7516 | [1](#tjs-failures) | 13.1M | ✅ 7142 | [375](#ajv-failures) | 6.8M | 🟢 -48% |

## Detailed Results

### draft4

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 17 | ✅ 17 | ✅ 0 | 35.9M | ✅ 17 | ✅ 0 | 21.1M | 🟢 -40% |
| additionalProperties.json | 16 | ✅ 16 | ✅ 0 | 23.1M | ✅ 16 | ✅ 0 | 13.7M | 🟢 -41% |
| allOf.json | 27 | ✅ 27 | ✅ 0 | 25.2M | ✅ 27 | ✅ 0 | 13.8M | 🟢 -45% |
| anyOf.json | 15 | ✅ 15 | ✅ 0 | 33.8M | ✅ 15 | ✅ 0 | 20.0M | 🟢 -40% |
| default.json | 7 | ✅ 7 | ✅ 0 | 36.9M | ✅ 7 | ✅ 0 | 36.6M | 0% |
| dependencies.json | 29 | ✅ 29 | ✅ 0 | 22.5M | ✅ 29 | ✅ 0 | 22.0M | 0% |
| enum.json | 49 | ✅ 49 | ✅ 0 | 7.9M | ✅ 49 | ✅ 0 | 18.1M | 🔴 **+131%** |
| format.json | 36 | ✅ 36 | ✅ 0 | 59.1M | ✅ 36 | ✅ 0 | 48.2M | -19% |
| infinite-loop-detection.json | 2 | ✅ 2 | ✅ 0 | 27.4M | ✅ 2 | ✅ 0 | 26.2M | -5% |
| items.json | 21 | ✅ 21 | ✅ 0 | 19.4M | ✅ 21 | ✅ 0 | 15.2M | 🟢 -23% |
| maxItems.json | 4 | ✅ 4 | ✅ 0 | 42.5M | ✅ 4 | ✅ 0 | 37.6M | -11% |
| maxLength.json | 5 | ✅ 5 | ✅ 0 | 38.7M | ✅ 5 | ✅ 0 | 37.6M | -4% |
| maxProperties.json | 8 | ✅ 8 | ✅ 0 | 33.3M | ✅ 8 | ✅ 0 | 30.5M | -9% |
| maximum.json | 8 | ✅ 14 | ✅ 0 | 41.8M | ✅ 8 | ⚠️ 6 | 37.4M | -11% |
| minItems.json | 4 | ✅ 4 | ✅ 0 | 42.5M | ✅ 4 | ✅ 0 | 37.2M | -11% |
| minLength.json | 5 | ✅ 5 | ✅ 0 | 36.5M | ✅ 5 | ✅ 0 | 32.6M | -13% |
| minProperties.json | 6 | ✅ 6 | ✅ 0 | 35.0M | ✅ 6 | ✅ 0 | 33.5M | -3% |
| minimum.json | 11 | ✅ 17 | ✅ 0 | 42.9M | ✅ 11 | ⚠️ 6 | 36.9M | -15% |
| multipleOf.json | 10 | ✅ 10 | ✅ 0 | 37.1M | ✅ 10 | ✅ 0 | 18.2M | 🟢 **-51%** |
| not.json | 20 | ✅ 20 | ✅ 0 | 33.3M | ✅ 20 | ✅ 0 | 23.4M | 🟢 -30% |
| oneOf.json | 23 | ✅ 23 | ✅ 0 | 28.5M | ✅ 23 | ✅ 0 | 19.0M | 🟢 -34% |
| pattern.json | 9 | ✅ 9 | ✅ 0 | 38.7M | ✅ 9 | ✅ 0 | 33.0M | -13% |
| patternProperties.json | 18 | ✅ 18 | ✅ 0 | 13.9M | ✅ 18 | ✅ 0 | 6.7M | 🟢 **-51%** |
| properties.json | 17 | ✅ 24 | ✅ 0 | 19.1M | ✅ 23 | ⚠️ 1 | 12.4M | 🟢 -36% |
| ref.json | 26 | ✅ 45 | ✅ 0 | 18.1M | ✅ 28 | ⚠️ 17 | 19.6M | 8% |
| refRemote.json | 6 | ✅ 17 | ✅ 0 | 25.6M | ✅ 6 | ⚠️ 11 | 31.9M | 🔴 +26% |
| required.json | 8 | ✅ 15 | ✅ 0 | 39.4M | ✅ 11 | ⚠️ 4 | 33.5M | -17% |
| type.json | 79 | ✅ 79 | ✅ 0 | 32.1M | ✅ 79 | ✅ 0 | 27.6M | -14% |
| uniqueItems.json | 69 | ✅ 69 | ✅ 0 | 17.4M | ✅ 69 | ✅ 0 | 15.3M | -12% |
| optional/bignum.json | 7 | ✅ 9 | ✅ 0 | 39.9M | ✅ 7 | ⚠️ 2 | 20.6M | 🟢 -49% |
| optional/ecmascript-regex.json | 74 | ✅ 74 | ✅ 0 | 14.6M | ✅ 74 | ✅ 0 | 14.2M | -3% |
| optional/format/date-time.json | 26 | ✅ 26 | ✅ 0 | 19.0M | ✅ 26 | ✅ 0 | 2.8M | 🟢 **-85%** |
| optional/format/email.json | 17 | ✅ 17 | ✅ 0 | 14.9M | ✅ 17 | ✅ 0 | 18.7M | 🔴 +26% |
| optional/format/ipv4.json | 16 | ✅ 16 | ✅ 0 | 24.2M | ✅ 16 | ✅ 0 | 22.9M | -7% |
| optional/format/ipv6.json | 40 | ✅ 40 | ✅ 0 | 10.6M | ✅ 40 | ✅ 0 | 2.9M | 🟢 **-72%** |
| optional/format/unknown.json | 7 | ✅ 7 | ✅ 0 | 59.5M | ✅ 7 | ✅ 0 | 44.4M | 🟢 -23% |
| optional/format/uri.json | 36 | ✅ 36 | ✅ 0 | 6.1M | ✅ 36 | ✅ 0 | 4.2M | 🟢 -30% |
| optional/non-bmp-regex.json | 12 | ✅ 12 | ✅ 0 | 15.8M | ✅ 12 | ✅ 0 | 11.9M | 🟢 -25% |

### draft6

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | ✅ 0 | 32.0M | ✅ 19 | ✅ 0 | 23.4M | 🟢 -28% |
| additionalProperties.json | 16 | ✅ 16 | ✅ 0 | 22.3M | ✅ 16 | ✅ 0 | 15.0M | 🟢 -33% |
| allOf.json | 30 | ✅ 30 | ✅ 0 | 22.8M | ✅ 30 | ✅ 0 | 10.8M | 🟢 **-53%** |
| anyOf.json | 18 | ✅ 18 | ✅ 0 | 30.1M | ✅ 18 | ✅ 0 | 20.1M | 🟢 -34% |
| boolean_schema.json | 18 | ✅ 18 | ✅ 0 | 32.0M | ✅ 18 | ✅ 0 | 27.4M | -16% |
| const.json | 54 | ✅ 54 | ✅ 0 | 11.2M | ✅ 54 | ✅ 0 | 15.8M | 🔴 +41% |
| contains.json | 19 | ✅ 19 | ✅ 0 | 16.3M | ✅ 19 | ✅ 0 | 7.1M | 🟢 **-56%** |
| default.json | 7 | ✅ 7 | ✅ 0 | 38.1M | ✅ 7 | ✅ 0 | 38.3M | 0% |
| definitions.json | 2 | ✅ 2 | ✅ 0 | 11.5M | ✅ 2 | ✅ 0 | 1.3M | 🟢 **-89%** |
| dependencies.json | 36 | ✅ 36 | ✅ 0 | 25.3M | ✅ 36 | ✅ 0 | 25.2M | 0% |
| enum.json | 45 | ✅ 45 | ✅ 0 | 8.0M | ✅ 45 | ✅ 0 | 18.0M | 🔴 **+123%** |
| exclusiveMaximum.json | 4 | ✅ 4 | ✅ 0 | 35.0M | ✅ 4 | ✅ 0 | 31.0M | -9% |
| exclusiveMinimum.json | 4 | ✅ 4 | ✅ 0 | 34.3M | ✅ 4 | ✅ 0 | 28.9M | -17% |
| format.json | 54 | ✅ 54 | ✅ 0 | 40.9M | ✅ 54 | ✅ 0 | 45.4M | 9% |
| infinite-loop-detection.json | 2 | ✅ 2 | ✅ 0 | 29.9M | ✅ 2 | ✅ 0 | 26.3M | -13% |
| items.json | 28 | ✅ 28 | ✅ 0 | 21.7M | ✅ 28 | ✅ 0 | 15.5M | 🟢 -28% |
| maxItems.json | 6 | ✅ 6 | ✅ 0 | 34.9M | ✅ 6 | ✅ 0 | 35.7M | 4% |
| maxLength.json | 7 | ✅ 7 | ✅ 0 | 31.8M | ✅ 7 | ✅ 0 | 36.2M | 11% |
| maxProperties.json | 10 | ✅ 10 | ✅ 0 | 25.7M | ✅ 10 | ✅ 0 | 27.0M | 5% |
| maximum.json | 8 | ✅ 8 | ✅ 0 | 44.4M | ✅ 8 | ✅ 0 | 37.0M | -15% |
| minItems.json | 6 | ✅ 6 | ✅ 0 | 33.9M | ✅ 6 | ✅ 0 | 37.0M | 7% |
| minLength.json | 7 | ✅ 7 | ✅ 0 | 31.3M | ✅ 7 | ✅ 0 | 32.3M | 3% |
| minProperties.json | 8 | ✅ 8 | ✅ 0 | 31.6M | ✅ 8 | ✅ 0 | 30.8M | 0% |
| minimum.json | 11 | ✅ 11 | ✅ 0 | 45.6M | ✅ 11 | ✅ 0 | 38.5M | -15% |
| multipleOf.json | 10 | ✅ 10 | ✅ 0 | 36.9M | ✅ 10 | ✅ 0 | 17.8M | 🟢 **-52%** |
| not.json | 38 | ✅ 38 | ✅ 0 | 30.9M | ✅ 38 | ✅ 0 | 25.2M | 🟢 -20% |
| oneOf.json | 27 | ✅ 27 | ✅ 0 | 26.8M | ✅ 27 | ✅ 0 | 8.9M | 🟢 **-67%** |
| pattern.json | 9 | ✅ 9 | ✅ 0 | 37.2M | ✅ 9 | ✅ 0 | 31.4M | -16% |
| patternProperties.json | 23 | ✅ 23 | ✅ 0 | 12.8M | ✅ 23 | ✅ 0 | 8.0M | 🟢 -38% |
| properties.json | 21 | ✅ 28 | ✅ 0 | 22.4M | ✅ 27 | ⚠️ 1 | 11.1M | 🟢 **-50%** |
| propertyNames.json | 20 | ✅ 20 | ✅ 0 | 25.5M | ✅ 20 | ✅ 0 | 19.5M | 🟢 -24% |
| ref.json | 65 | ✅ 70 | ✅ 0 | 17.4M | ✅ 67 | ⚠️ 3 | 16.5M | -7% |
| refRemote.json | 23 | ✅ 23 | ✅ 0 | 26.2M | ✅ 23 | ✅ 0 | 11.2M | 🟢 **-58%** |
| required.json | 9 | ✅ 16 | ✅ 0 | 39.0M | ✅ 12 | ⚠️ 4 | 31.9M | -16% |
| type.json | 80 | ✅ 80 | ✅ 0 | 28.4M | ✅ 80 | ✅ 0 | 25.8M | -10% |
| uniqueItems.json | 69 | ✅ 69 | ✅ 0 | 17.5M | ✅ 69 | ✅ 0 | 14.8M | -16% |
| optional/bignum.json | 9 | ✅ 9 | ✅ 0 | 34.9M | ✅ 9 | ✅ 0 | 20.8M | 🟢 -40% |
| optional/ecmascript-regex.json | 74 | ✅ 74 | ✅ 0 | 14.0M | ✅ 74 | ✅ 0 | 13.8M | -1% |
| optional/format/date-time.json | 26 | ✅ 26 | ✅ 0 | 17.4M | ✅ 26 | ✅ 0 | 2.8M | 🟢 **-84%** |
| optional/format/email.json | 17 | ✅ 17 | ✅ 0 | 13.3M | ✅ 17 | ✅ 0 | 17.7M | 🔴 +32% |
| optional/format/ipv4.json | 16 | ✅ 16 | ✅ 0 | 21.1M | ✅ 16 | ✅ 0 | 21.5M | 2% |
| optional/format/ipv6.json | 40 | ✅ 40 | ✅ 0 | 10.2M | ✅ 40 | ✅ 0 | 2.9M | 🟢 **-72%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | ✅ 0 | 22.0M | ✅ 38 | ✅ 0 | 20.5M | -8% |
| optional/format/unknown.json | 7 | ✅ 7 | ✅ 0 | 58.3M | ✅ 7 | ✅ 0 | 43.7M | 🟢 -26% |
| optional/format/uri-reference.json | 15 | ✅ 15 | ✅ 0 | 7.7M | ✅ 15 | ✅ 0 | 8.6M | 12% |
| optional/format/uri-template.json | 10 | ✅ 10 | ✅ 0 | 14.6M | ✅ 10 | ✅ 0 | 15.4M | 6% |
| optional/format/uri.json | 36 | ✅ 36 | ✅ 0 | 6.0M | ✅ 36 | ✅ 0 | 4.2M | 🟢 -29% |
| optional/id.json | 7 | ✅ 7 | ✅ 0 | 9.9M | ✅ 7 | ✅ 0 | 8.8M | -11% |
| optional/non-bmp-regex.json | 12 | ✅ 12 | ✅ 0 | 15.0M | ✅ 12 | ✅ 0 | 11.9M | 🟢 -20% |

### draft7

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | ✅ 0 | 32.8M | ✅ 19 | ✅ 0 | 22.6M | 🟢 -32% |
| additionalProperties.json | 16 | ✅ 16 | ✅ 0 | 19.9M | ✅ 16 | ✅ 0 | 14.3M | 🟢 -29% |
| allOf.json | 30 | ✅ 30 | ✅ 0 | 24.9M | ✅ 30 | ✅ 0 | 14.9M | 🟢 -40% |
| anyOf.json | 18 | ✅ 18 | ✅ 0 | 30.5M | ✅ 18 | ✅ 0 | 11.8M | 🟢 **-61%** |
| boolean_schema.json | 18 | ✅ 18 | ✅ 0 | 31.6M | ✅ 18 | ✅ 0 | 31.7M | 0% |
| const.json | 54 | ✅ 54 | ✅ 0 | 11.5M | ✅ 54 | ✅ 0 | 16.6M | 🔴 +45% |
| contains.json | 21 | ✅ 21 | ✅ 0 | 13.6M | ✅ 21 | ✅ 0 | 7.6M | 🟢 -44% |
| default.json | 7 | ✅ 7 | ✅ 0 | 37.5M | ✅ 7 | ✅ 0 | 35.5M | -4% |
| definitions.json | 2 | ✅ 2 | ✅ 0 | 11.2M | ✅ 2 | ✅ 0 | 1.2M | 🟢 **-90%** |
| dependencies.json | 36 | ✅ 36 | ✅ 0 | 24.0M | ✅ 36 | ✅ 0 | 25.0M | 5% |
| enum.json | 45 | ✅ 45 | ✅ 0 | 7.8M | ✅ 45 | ✅ 0 | 16.9M | 🔴 **+117%** |
| exclusiveMaximum.json | 4 | ✅ 4 | ✅ 0 | 33.6M | ✅ 4 | ✅ 0 | 28.7M | -14% |
| exclusiveMinimum.json | 4 | ✅ 4 | ✅ 0 | 32.6M | ✅ 4 | ✅ 0 | 29.2M | -9% |
| format.json | 102 | ✅ 102 | ✅ 0 | 44.4M | ✅ 102 | ✅ 0 | 44.3M | 0% |
| if-then-else.json | 26 | ✅ 26 | ✅ 0 | 36.8M | ✅ 26 | ✅ 0 | 25.8M | 🟢 -31% |
| infinite-loop-detection.json | 2 | ✅ 2 | ✅ 0 | 29.2M | ✅ 2 | ✅ 0 | 24.9M | -15% |
| items.json | 28 | ✅ 28 | ✅ 0 | 20.2M | ✅ 28 | ✅ 0 | 15.2M | 🟢 -26% |
| maxItems.json | 6 | ✅ 6 | ✅ 0 | 32.3M | ✅ 6 | ✅ 0 | 33.0M | 3% |
| maxLength.json | 7 | ✅ 7 | ✅ 0 | 32.4M | ✅ 7 | ✅ 0 | 34.4M | 7% |
| maxProperties.json | 10 | ✅ 10 | ✅ 0 | 29.0M | ✅ 10 | ✅ 0 | 25.3M | -15% |
| maximum.json | 8 | ✅ 8 | ✅ 0 | 42.5M | ✅ 8 | ✅ 0 | 37.4M | -11% |
| minItems.json | 6 | ✅ 6 | ✅ 0 | 35.4M | ✅ 6 | ✅ 0 | 33.1M | -7% |
| minLength.json | 7 | ✅ 7 | ✅ 0 | 30.2M | ✅ 7 | ✅ 0 | 29.1M | -3% |
| minProperties.json | 8 | ✅ 8 | ✅ 0 | 30.1M | ✅ 8 | ✅ 0 | 29.7M | -3% |
| minimum.json | 11 | ✅ 11 | ✅ 0 | 40.4M | ✅ 11 | ✅ 0 | 34.8M | -14% |
| multipleOf.json | 10 | ✅ 10 | ✅ 0 | 35.9M | ✅ 10 | ✅ 0 | 17.9M | 🟢 **-50%** |
| not.json | 38 | ✅ 38 | ✅ 0 | 30.5M | ✅ 38 | ✅ 0 | 28.1M | -8% |
| oneOf.json | 27 | ✅ 27 | ✅ 0 | 25.9M | ✅ 27 | ✅ 0 | 9.0M | 🟢 **-65%** |
| pattern.json | 9 | ✅ 9 | ✅ 0 | 35.1M | ✅ 9 | ✅ 0 | 31.7M | -9% |
| patternProperties.json | 23 | ✅ 23 | ✅ 0 | 13.0M | ✅ 23 | ✅ 0 | 8.4M | 🟢 -35% |
| properties.json | 21 | ✅ 28 | ✅ 0 | 21.8M | ✅ 27 | ⚠️ 1 | 12.0M | 🟢 -45% |
| propertyNames.json | 20 | ✅ 20 | ✅ 0 | 23.1M | ✅ 20 | ✅ 0 | 22.0M | -7% |
| ref.json | 73 | ✅ 78 | ✅ 0 | 17.1M | ✅ 75 | ⚠️ 3 | 14.4M | -16% |
| refRemote.json | 23 | ✅ 23 | ✅ 0 | 15.8M | ✅ 23 | ✅ 0 | 17.0M | 7% |
| required.json | 9 | ✅ 16 | ✅ 0 | 37.7M | ✅ 12 | ⚠️ 4 | 31.1M | -16% |
| type.json | 80 | ✅ 80 | ✅ 0 | 26.1M | ✅ 80 | ✅ 0 | 24.6M | -7% |
| uniqueItems.json | 69 | ✅ 69 | ✅ 0 | 17.1M | ✅ 69 | ✅ 0 | 12.1M | 🟢 -29% |
| optional/bignum.json | 9 | ✅ 9 | ✅ 0 | 32.8M | ✅ 9 | ✅ 0 | 21.0M | 🟢 -35% |
| optional/ecmascript-regex.json | 74 | ✅ 74 | ✅ 0 | 14.0M | ✅ 74 | ✅ 0 | 13.8M | -3% |
| optional/format/date-time.json | 26 | ✅ 26 | ✅ 0 | 17.1M | ✅ 26 | ✅ 0 | 2.7M | 🟢 **-84%** |
| optional/format/date.json | 48 | ✅ 48 | ✅ 0 | 7.7M | ✅ 48 | ✅ 0 | 7.3M | -4% |
| optional/format/email.json | 17 | ✅ 17 | ✅ 0 | 13.1M | ✅ 17 | ✅ 0 | 17.7M | 🔴 +33% |
| optional/format/ipv4.json | 16 | ✅ 16 | ✅ 0 | 20.5M | ✅ 16 | ✅ 0 | 19.5M | -4% |
| optional/format/ipv6.json | 40 | ✅ 40 | ✅ 0 | 9.7M | ✅ 40 | ✅ 0 | 2.8M | 🟢 **-71%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | ✅ 0 | 17.8M | ✅ 38 | ✅ 0 | 20.6M | 17% |
| optional/format/regex.json | 8 | ✅ 8 | ✅ 0 | 44.6M | ✅ 8 | ✅ 0 | 819K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | ✅ 0 | 25.0M | ✅ 18 | ✅ 0 | 24.1M | -2% |
| optional/format/time.json | 46 | ✅ 46 | ✅ 0 | 5.4M | ✅ 46 | ✅ 0 | 5.2M | -4% |
| optional/format/unknown.json | 7 | ✅ 7 | ✅ 0 | 59.7M | ✅ 7 | ✅ 0 | 41.3M | 🟢 -29% |
| optional/format/uri-reference.json | 15 | ✅ 15 | ✅ 0 | 8.1M | ✅ 15 | ✅ 0 | 8.9M | 9% |
| optional/format/uri-template.json | 10 | ✅ 10 | ✅ 0 | 14.4M | ✅ 10 | ✅ 0 | 15.7M | 9% |
| optional/format/uri.json | 36 | ✅ 36 | ✅ 0 | 6.1M | ✅ 36 | ✅ 0 | 4.1M | 🟢 -33% |
| optional/id.json | 7 | ✅ 7 | ✅ 0 | 10.1M | ✅ 7 | ✅ 0 | 11.4M | 13% |
| optional/non-bmp-regex.json | 12 | ✅ 12 | ✅ 0 | 16.3M | ✅ 12 | ✅ 0 | 12.7M | 🟢 -23% |

### draft2019-09

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | ✅ 0 | 19.8M | ✅ 19 | ✅ 0 | 30.2M | 🔴 **+52%** |
| additionalProperties.json | 21 | ✅ 21 | ✅ 0 | 14.4M | ✅ 21 | ✅ 0 | 11.1M | 🟢 -22% |
| allOf.json | 30 | ✅ 30 | ✅ 0 | 16.2M | ✅ 30 | ✅ 0 | 10.9M | 🟢 -33% |
| anchor.json | 8 | ✅ 8 | ✅ 0 | 15.2M | ✅ 8 | ✅ 0 | 30.9M | 🔴 **+106%** |
| anyOf.json | 18 | ✅ 18 | ✅ 0 | 18.2M | ✅ 18 | ✅ 0 | 10.4M | 🟢 -43% |
| boolean_schema.json | 18 | ✅ 18 | ✅ 0 | 18.5M | ✅ 18 | ✅ 0 | 32.2M | 🔴 **+74%** |
| const.json | 54 | ✅ 54 | ✅ 0 | 8.5M | ✅ 54 | ✅ 0 | 16.9M | 🔴 **+100%** |
| contains.json | 21 | ✅ 21 | ✅ 0 | 11.4M | ✅ 21 | ✅ 0 | 10.3M | -9% |
| content.json | 18 | ✅ 18 | ✅ 0 | 24.3M | ✅ 18 | ✅ 0 | 50.5M | 🔴 **+105%** |
| default.json | 7 | ✅ 7 | ✅ 0 | 19.9M | ✅ 7 | ✅ 0 | 39.2M | 🔴 **+92%** |
| defs.json | 2 | ✅ 2 | ✅ 0 | 1.5M | ✅ 2 | ✅ 0 | 810K | 🟢 -46% |
| dependentRequired.json | 20 | ✅ 20 | ✅ 0 | 17.4M | ✅ 20 | ✅ 0 | 32.3M | 🔴 **+87%** |
| dependentSchemas.json | 20 | ✅ 20 | ✅ 0 | 18.2M | ✅ 20 | ✅ 0 | 26.2M | 🔴 +45% |
| enum.json | 45 | ✅ 45 | ✅ 0 | 6.4M | ✅ 45 | ✅ 0 | 17.2M | 🔴 **+169%** |
| exclusiveMaximum.json | 4 | ✅ 4 | ✅ 0 | 17.3M | ✅ 4 | ✅ 0 | 28.2M | 🔴 **+66%** |
| exclusiveMinimum.json | 4 | ✅ 4 | ✅ 0 | 16.5M | ✅ 4 | ✅ 0 | 26.8M | 🔴 **+65%** |
| format.json | 114 | ✅ 114 | ✅ 0 | 25.9M | ✅ 114 | ✅ 0 | 47.9M | 🔴 **+86%** |
| if-then-else.json | 26 | ✅ 26 | ✅ 0 | 18.8M | ✅ 26 | ✅ 0 | 27.8M | 🔴 +47% |
| infinite-loop-detection.json | 2 | ✅ 2 | ✅ 0 | 15.4M | ✅ 2 | ✅ 0 | 24.3M | 🔴 **+59%** |
| items.json | 28 | ✅ 28 | ✅ 0 | 14.1M | ✅ 28 | ✅ 0 | 16.4M | 16% |
| maxContains.json | 12 | ✅ 12 | ✅ 0 | 13.9M | ✅ 12 | ✅ 0 | 26.5M | 🔴 **+89%** |
| maxItems.json | 6 | ✅ 6 | ✅ 0 | 19.1M | ✅ 6 | ✅ 0 | 34.7M | 🔴 **+79%** |
| maxLength.json | 7 | ✅ 7 | ✅ 0 | 19.8M | ✅ 7 | ✅ 0 | 33.3M | 🔴 **+70%** |
| maxProperties.json | 10 | ✅ 10 | ✅ 0 | 16.0M | ✅ 10 | ✅ 0 | 28.1M | 🔴 **+72%** |
| maximum.json | 8 | ✅ 8 | ✅ 0 | 17.2M | ✅ 8 | ✅ 0 | 36.1M | 🔴 **+107%** |
| minContains.json | 28 | ✅ 28 | ✅ 0 | 13.7M | ✅ 28 | ✅ 0 | 19.4M | 🔴 +40% |
| minItems.json | 6 | ✅ 6 | ✅ 0 | 20.2M | ✅ 6 | ✅ 0 | 34.6M | 🔴 **+72%** |
| minLength.json | 7 | ✅ 7 | ✅ 0 | 18.0M | ✅ 7 | ✅ 0 | 30.0M | 🔴 **+70%** |
| minProperties.json | 8 | ✅ 8 | ✅ 0 | 17.6M | ✅ 8 | ✅ 0 | 30.1M | 🔴 **+73%** |
| minimum.json | 11 | ✅ 11 | ✅ 0 | 19.5M | ✅ 11 | ✅ 0 | 37.6M | 🔴 **+89%** |
| multipleOf.json | 10 | ✅ 10 | ✅ 0 | 15.5M | ✅ 10 | ✅ 0 | 15.6M | 0% |
| not.json | 40 | ✅ 40 | ✅ 0 | 14.8M | ✅ 40 | ✅ 0 | 24.2M | 🔴 **+66%** |
| oneOf.json | 27 | ✅ 27 | ✅ 0 | 15.0M | ✅ 27 | ✅ 0 | 13.8M | -8% |
| pattern.json | 9 | ✅ 9 | ✅ 0 | 17.1M | ✅ 9 | ✅ 0 | 32.8M | 🔴 **+87%** |
| patternProperties.json | 23 | ✅ 23 | ✅ 0 | 9.1M | ✅ 23 | ✅ 0 | 6.2M | 🟢 -32% |
| properties.json | 21 | ✅ 28 | ✅ 0 | 10.6M | ✅ 27 | ⚠️ 1 | 15.1M | 🔴 +44% |
| propertyNames.json | 20 | ✅ 20 | ✅ 0 | 14.9M | ✅ 20 | ✅ 0 | 20.6M | 🔴 +37% |
| recursiveRef.json | 31 | ✅ 34 | ✅ 0 | 4.3M | ✅ 32 | ⚠️ 2 | 2.4M | 🟢 -45% |
| ref.json | 73 | ✅ 81 | ✅ 0 | 9.5M | ✅ 73 | ⚠️ 8 | 13.7M | 🔴 +44% |
| refRemote.json | 31 | ✅ 31 | ✅ 0 | 13.7M | ✅ 31 | ✅ 0 | 20.9M | 🔴 **+52%** |
| required.json | 9 | ✅ 16 | ✅ 0 | 20.2M | ✅ 12 | ⚠️ 4 | 34.7M | 🔴 **+69%** |
| type.json | 80 | ✅ 80 | ✅ 0 | 16.0M | ✅ 80 | ✅ 0 | 27.5M | 🔴 **+72%** |
| unevaluatedItems.json | 51 | ✅ 56 | ✅ 0 | 9.9M | ✅ 53 | ⚠️ 3 | 23.6M | 🔴 **+140%** |
| unevaluatedProperties.json | 117 | ✅ 123 | ✅ 0 | 7.8M | ✅ 120 | ⚠️ 3 | 2.5M | 🟢 **-68%** |
| uniqueItems.json | 69 | ✅ 69 | ✅ 0 | 12.5M | ✅ 69 | ✅ 0 | 15.8M | 🔴 +27% |
| vocabulary.json | 2 | ✅ 5 | ✅ 0 | 16.3M | ✅ 4 | ⚠️ 1 | 32.4M | 🔴 **+97%** |
| optional/anchor.json | 4 | ✅ 4 | ✅ 0 | 11.3M | ✅ 4 | ✅ 0 | 8.3M | 🟢 -27% |
| optional/bignum.json | 9 | ✅ 9 | ✅ 0 | 18.8M | ✅ 9 | ✅ 0 | 21.8M | 15% |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | ✅ 0 | 17.4M | ✅ 36 | ✅ 0 | 29.0M | 🔴 **+63%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | ✅ 0 | 10.2M | ✅ 74 | ✅ 0 | 15.0M | 🔴 +46% |
| optional/format/date-time.json | 26 | ✅ 26 | ✅ 0 | 14.0M | ✅ 26 | ✅ 0 | 2.9M | 🟢 **-80%** |
| optional/format/date.json | 48 | ✅ 48 | ✅ 0 | 6.3M | ✅ 48 | ✅ 0 | 7.8M | 🔴 +22% |
| optional/format/email.json | 17 | ✅ 17 | ✅ 0 | 11.2M | ✅ 17 | ✅ 0 | 18.3M | 🔴 **+62%** |
| optional/format/idn-email.json | 10 | ✅ 10 | ✅ 0 | 10.9M | ✅ 10 | ✅ 0 | 61K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ 16 | ✅ 0 | 15.7M | ✅ 16 | ✅ 0 | 23.0M | 🔴 +49% |
| optional/format/ipv6.json | 40 | ✅ 40 | ✅ 0 | 8.1M | ✅ 40 | ✅ 0 | 2.9M | 🟢 **-64%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | ✅ 0 | 14.4M | ✅ 38 | ✅ 0 | 21.2M | 🔴 +47% |
| optional/format/regex.json | 8 | ✅ 8 | ✅ 0 | 20.9M | ✅ 8 | ✅ 0 | 827K | 🟢 **-96%** |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | ✅ 0 | 16.6M | ✅ 18 | ✅ 0 | 25.1M | 🔴 +50% |
| optional/format/time.json | 46 | ✅ 46 | ✅ 0 | 4.9M | ✅ 46 | ✅ 0 | 5.3M | 7% |
| optional/format/unknown.json | 7 | ✅ 7 | ✅ 0 | 22.7M | ✅ 7 | ✅ 0 | 50.5M | 🔴 **+120%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | ✅ 0 | 6.9M | ✅ 15 | ✅ 0 | 8.7M | 🔴 +26% |
| optional/format/uri-template.json | 10 | ✅ 10 | ✅ 0 | 11.3M | ✅ 10 | ✅ 0 | 15.8M | 🔴 +40% |
| optional/format/uri.json | 36 | ✅ 36 | ✅ 0 | 5.3M | ✅ 36 | ✅ 0 | 4.1M | 🟢 -21% |
| optional/format/uuid.json | 22 | ✅ 22 | ✅ 0 | 8.9M | ✅ 22 | ✅ 0 | 12.4M | 🔴 +38% |
| optional/id.json | 3 | ✅ 3 | ✅ 0 | 8.4M | ✅ 3 | ✅ 0 | 9.0M | 6% |
| optional/no-schema.json | 3 | ✅ 3 | ✅ 0 | 16.5M | ✅ 3 | ✅ 0 | 30.4M | 🔴 **+82%** |
| optional/non-bmp-regex.json | 12 | ✅ 12 | ✅ 0 | 8.1M | ✅ 12 | ✅ 0 | 9.2M | 14% |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | ✅ 0 | 15.0M | ✅ 10 | ✅ 0 | 27.5M | 🔴 **+86%** |

### draft2020-12

| File | Tests | tjs pass | tjs fail | tjs ops/s | ajv pass | ajv fail | ajv ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalProperties.json | 21 | ✅ 21 | ✅ 0 | 12.2M | ✅ 21 | ✅ 0 | 13.7M | 12% |
| allOf.json | 30 | ✅ 30 | ✅ 0 | 14.6M | ✅ 30 | ✅ 0 | 10.1M | 🟢 -31% |
| anchor.json | 8 | ✅ 8 | ✅ 0 | 14.9M | ✅ 8 | ✅ 0 | 28.9M | 🔴 **+91%** |
| anyOf.json | 18 | ✅ 18 | ✅ 0 | 16.8M | ✅ 18 | ✅ 0 | 9.4M | 🟢 -43% |
| boolean_schema.json | 18 | ✅ 18 | ✅ 0 | 16.6M | ✅ 18 | ✅ 0 | 29.6M | 🔴 **+76%** |
| const.json | 54 | ✅ 54 | ✅ 0 | 8.0M | ✅ 54 | ✅ 0 | 15.0M | 🔴 **+87%** |
| contains.json | 21 | ✅ 21 | ✅ 0 | 10.6M | ✅ 21 | ✅ 0 | 6.9M | 🟢 -35% |
| content.json | 18 | ✅ 18 | ✅ 0 | 22.5M | ✅ 18 | ✅ 0 | 49.5M | 🔴 **+120%** |
| default.json | 7 | ✅ 7 | ✅ 0 | 19.9M | ✅ 7 | ✅ 0 | 37.3M | 🔴 **+85%** |
| defs.json | 2 | ✅ 2 | ✅ 0 | 1.7M | ✅ 2 | ✅ 0 | 805K | 🟢 **-54%** |
| dependentRequired.json | 20 | ✅ 20 | ✅ 0 | 17.4M | ✅ 20 | ✅ 0 | 32.5M | 🔴 **+84%** |
| dependentSchemas.json | 20 | ✅ 20 | ✅ 0 | 17.5M | ✅ 20 | ✅ 0 | 29.5M | 🔴 **+68%** |
| dynamicRef.json | 4 | ✅ 44 | ✅ 0 | 6.4M | ✅ 19 | ⚠️ 25 | 11.0M | 🔴 **+73%** |
| enum.json | 45 | ✅ 45 | ✅ 0 | 6.3M | ✅ 45 | ✅ 0 | 17.7M | 🔴 **+182%** |
| exclusiveMaximum.json | 4 | ✅ 4 | ✅ 0 | 17.7M | ✅ 4 | ✅ 0 | 28.9M | 🔴 **+63%** |
| exclusiveMinimum.json | 4 | ✅ 4 | ✅ 0 | 16.3M | ✅ 4 | ✅ 0 | 28.6M | 🔴 **+74%** |
| format.json | 133 | ✅ 133 | ✅ 0 | 23.6M | ✅ 133 | ✅ 0 | 43.3M | 🔴 **+83%** |
| if-then-else.json | 26 | ✅ 26 | ✅ 0 | 21.3M | ✅ 26 | ✅ 0 | 28.8M | 🔴 +34% |
| infinite-loop-detection.json | 2 | ✅ 2 | ✅ 0 | 16.1M | ✅ 2 | ✅ 0 | 24.4M | 🔴 **+51%** |
| items.json | 29 | ✅ 29 | ✅ 0 | 13.7M | ✅ 29 | ✅ 0 | 19.7M | 🔴 +43% |
| maxContains.json | 12 | ✅ 12 | ✅ 0 | 15.3M | ✅ 12 | ✅ 0 | 26.5M | 🔴 **+71%** |
| maxItems.json | 6 | ✅ 6 | ✅ 0 | 18.1M | ✅ 6 | ✅ 0 | 35.1M | 🔴 **+90%** |
| maxLength.json | 7 | ✅ 7 | ✅ 0 | 19.0M | ✅ 7 | ✅ 0 | 34.4M | 🔴 **+83%** |
| maxProperties.json | 10 | ✅ 10 | ✅ 0 | 16.2M | ✅ 10 | ✅ 0 | 28.0M | 🔴 **+72%** |
| maximum.json | 8 | ✅ 8 | ✅ 0 | 20.6M | ✅ 8 | ✅ 0 | 39.2M | 🔴 **+85%** |
| minContains.json | 28 | ✅ 28 | ✅ 0 | 14.8M | ✅ 28 | ✅ 0 | 18.1M | 🔴 +24% |
| minItems.json | 6 | ✅ 6 | ✅ 0 | 16.9M | ✅ 6 | ✅ 0 | 36.3M | 🔴 **+111%** |
| minLength.json | 7 | ✅ 7 | ✅ 0 | 17.3M | ✅ 7 | ✅ 0 | 31.3M | 🔴 **+81%** |
| minProperties.json | 8 | ✅ 8 | ✅ 0 | 16.2M | ✅ 8 | ✅ 0 | 29.1M | 🔴 **+82%** |
| minimum.json | 11 | ✅ 11 | ✅ 0 | 18.8M | ✅ 11 | ✅ 0 | 35.9M | 🔴 **+89%** |
| multipleOf.json | 10 | ✅ 10 | ✅ 0 | 17.6M | ✅ 10 | ✅ 0 | 18.1M | 4% |
| not.json | 40 | ✅ 40 | ✅ 0 | 15.9M | ✅ 40 | ✅ 0 | 29.7M | 🔴 **+85%** |
| oneOf.json | 27 | ✅ 27 | ✅ 0 | 18.6M | ✅ 27 | ✅ 0 | 9.3M | 🟢 **-50%** |
| pattern.json | 9 | ✅ 9 | ✅ 0 | 16.6M | ✅ 9 | ✅ 0 | 33.9M | 🔴 **+107%** |
| patternProperties.json | 23 | ✅ 23 | ✅ 0 | 8.6M | ✅ 23 | ✅ 0 | 5.4M | 🟢 -37% |
| prefixItems.json | 11 | ✅ 11 | ✅ 0 | 22.9M | ✅ 11 | ✅ 0 | 38.5M | 🔴 **+69%** |
| properties.json | 21 | ✅ 28 | ✅ 0 | 14.0M | ✅ 27 | ⚠️ 1 | 16.0M | 15% |
| propertyNames.json | 20 | ✅ 20 | ✅ 0 | 17.1M | ✅ 20 | ✅ 0 | 11.4M | 🟢 -32% |
| ref.json | 71 | ✅ 79 | ✅ 0 | 10.1M | ✅ 71 | ⚠️ 8 | 13.8M | 🔴 +38% |
| refRemote.json | 31 | ✅ 31 | ✅ 0 | 12.4M | ✅ 31 | ✅ 0 | 19.4M | 🔴 **+59%** |
| required.json | 9 | ✅ 16 | ✅ 0 | 17.3M | ✅ 12 | ⚠️ 4 | 33.4M | 🔴 **+93%** |
| type.json | 80 | ✅ 80 | ✅ 0 | 14.1M | ✅ 80 | ✅ 0 | 26.5M | 🔴 **+87%** |
| unevaluatedItems.json | 47 | ✅ 71 | ✅ 0 | 11.6M | ✅ 59 | ⚠️ 12 | 17.9M | 🔴 **+54%** |
| unevaluatedProperties.json | 117 | ✅ 125 | ✅ 0 | 7.9M | ✅ 120 | ⚠️ 5 | 1.8M | 🟢 **-78%** |
| uniqueItems.json | 69 | ✅ 69 | ✅ 0 | 12.8M | ✅ 69 | ✅ 0 | 15.1M | 18% |
| vocabulary.json | 2 | ✅ 5 | ✅ 0 | 15.2M | ✅ 4 | ⚠️ 1 | 29.4M | 🔴 **+94%** |
| optional/anchor.json | 4 | ✅ 4 | ✅ 0 | 10.5M | ✅ 4 | ✅ 0 | 5.9M | 🟢 -43% |
| optional/bignum.json | 9 | ✅ 9 | ✅ 0 | 16.0M | ✅ 9 | ✅ 0 | 22.5M | 🔴 +41% |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | ✅ 0 | 14.7M | ✅ 36 | ✅ 0 | 25.6M | 🔴 **+74%** |
| optional/ecmascript-regex.json | 74 | ✅ 74 | ✅ 0 | 8.9M | ✅ 74 | ✅ 0 | 12.6M | 🔴 +43% |
| optional/format/date-time.json | 26 | ✅ 26 | ✅ 0 | 12.0M | ✅ 26 | ✅ 0 | 2.7M | 🟢 **-77%** |
| optional/format/date.json | 48 | ✅ 48 | ✅ 0 | 5.8M | ✅ 48 | ✅ 0 | 7.6M | 🔴 +30% |
| optional/format/idn-email.json | 10 | ✅ 10 | ✅ 0 | 9.4M | ✅ 10 | ✅ 0 | 73K | 🟢 **-99%** |
| optional/format/ipv4.json | 16 | ✅ 16 | ✅ 0 | 14.7M | ✅ 16 | ✅ 0 | 23.9M | 🔴 **+62%** |
| optional/format/ipv6.json | 40 | ✅ 40 | ✅ 0 | 8.2M | ✅ 40 | ✅ 0 | 2.9M | 🟢 **-65%** |
| optional/format/json-pointer.json | 38 | ✅ 38 | ✅ 0 | 14.5M | ✅ 38 | ✅ 0 | 22.0M | 🔴 +50% |
| optional/format/regex.json | 8 | ✅ 8 | ✅ 0 | 22.6M | ✅ 8 | ✅ 0 | 828K | 🟢 **-96%** |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | ✅ 0 | 15.2M | ✅ 18 | ✅ 0 | 23.0M | 🔴 **+53%** |
| optional/format/time.json | 46 | ✅ 46 | ✅ 0 | 4.9M | ✅ 46 | ✅ 0 | 5.2M | 6% |
| optional/format/unknown.json | 7 | ✅ 7 | ✅ 0 | 26.3M | ✅ 7 | ✅ 0 | 47.4M | 🔴 **+81%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | ✅ 0 | 7.3M | ✅ 15 | ✅ 0 | 8.8M | 20% |
| optional/format/uri-template.json | 10 | ✅ 10 | ✅ 0 | 11.0M | ✅ 10 | ✅ 0 | 15.7M | 🔴 +42% |
| optional/format/uri.json | 36 | ✅ 36 | ✅ 0 | 5.3M | ✅ 36 | ✅ 0 | 4.2M | -19% |
| optional/format/uuid.json | 22 | ✅ 22 | ✅ 0 | 9.8M | ✅ 22 | ✅ 0 | 13.4M | 🔴 +36% |
| optional/id.json | 3 | ✅ 3 | ✅ 0 | 9.0M | ✅ 3 | ✅ 0 | 9.2M | 2% |
| optional/no-schema.json | 3 | ✅ 3 | ✅ 0 | 18.5M | ✅ 3 | ✅ 0 | 31.5M | 🔴 **+69%** |
| optional/non-bmp-regex.json | 12 | ✅ 12 | ✅ 0 | 12.1M | ✅ 12 | ✅ 0 | 10.3M | -14% |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | ✅ 0 | 15.1M | ✅ 10 | ✅ 0 | 27.8M | 🔴 **+83%** |

## Failures

### tjs Failures

#### tjs draft4 Failures

| File | Group | Test | Expected |
|------|-------|------|----------|
| optional/zeroTerminatedFloats.json | some languages do not distinguish between different types of numeric value | a float is not an integer even without fractional part | invalid |

### ajv Failures

#### ajv draft4 Failures

| File | Group | Test | Expected |
|------|-------|------|----------|
| definitions.json | validate definition against metaschema | valid definition schema | valid |
| definitions.json | validate definition against metaschema | invalid definition schema | invalid |
| maximum.json | maximum validation (explicit false exclusivity) | below the maximum is valid | valid |
| maximum.json | maximum validation (explicit false exclusivity) | boundary point is valid | valid |
| maximum.json | maximum validation (explicit false exclusivity) | above the maximum is invalid | invalid |
| maximum.json | maximum validation (explicit false exclusivity) | ignores non-numbers | valid |
| maximum.json | exclusiveMaximum validation | below the maximum is still valid | valid |
| maximum.json | exclusiveMaximum validation | boundary point is invalid | invalid |
| minimum.json | minimum validation (explicit false exclusivity) | above the minimum is valid | valid |
| minimum.json | minimum validation (explicit false exclusivity) | boundary point is valid | valid |
| minimum.json | minimum validation (explicit false exclusivity) | below the minimum is invalid | invalid |
| minimum.json | minimum validation (explicit false exclusivity) | ignores non-numbers | valid |
| minimum.json | exclusiveMinimum validation | above the minimum is still valid | valid |
| minimum.json | exclusiveMinimum validation | boundary point is invalid | invalid |
| properties.json | properties whose names are Javascript object property names | none of the properties mentioned | valid |
| ref.json | ref overrides any sibling keywords | ref valid, maxItems ignored | valid |
| ref.json | $ref prevents a sibling id from changing the base uri | $ref resolves to /definitions/base_foo, data does not validate | invalid |
| ref.json | $ref prevents a sibling id from changing the base uri | $ref resolves to /definitions/base_foo, data validates | valid |
| ref.json | remote ref, containing refs itself | remote ref valid | valid |
| ref.json | remote ref, containing refs itself | remote ref invalid | invalid |
| ref.json | Recursive references between schemas | valid tree | valid |
| ref.json | Recursive references between schemas | invalid tree | invalid |
| ref.json | Location-independent identifier | match | valid |
| ref.json | Location-independent identifier | mismatch | invalid |
| ref.json | Location-independent identifier with base URI change in subschema | match | valid |
| ref.json | Location-independent identifier with base URI change in subschema | mismatch | invalid |
| ref.json | id must be resolved against nearest parent, not just immediate parent | number is valid | valid |
| ref.json | id must be resolved against nearest parent, not just immediate parent | non-number is invalid | invalid |
| ref.json | id with file URI still resolves pointers - *nix | number is valid | valid |
| ref.json | id with file URI still resolves pointers - *nix | non-number is invalid | invalid |
| ref.json | id with file URI still resolves pointers - windows | number is valid | valid |
| ref.json | id with file URI still resolves pointers - windows | non-number is invalid | invalid |
| refRemote.json | base URI change | base URI change ref valid | valid |
| refRemote.json | base URI change | base URI change ref invalid | invalid |
| refRemote.json | base URI change - change folder | number is valid | valid |
| refRemote.json | base URI change - change folder | string is invalid | invalid |
| refRemote.json | base URI change - change folder in subschema | number is valid | valid |
| refRemote.json | base URI change - change folder in subschema | string is invalid | invalid |
| refRemote.json | root ref in remote ref | string is valid | valid |
| refRemote.json | root ref in remote ref | null is valid | valid |
| refRemote.json | root ref in remote ref | object is invalid | invalid |
| refRemote.json | Location-independent identifier in remote ref | integer is valid | valid |
| refRemote.json | Location-independent identifier in remote ref | string is invalid | invalid |
| required.json | required properties whose names are Javascript object property names | none of the properties mentioned | invalid |
| required.json | required properties whose names are Javascript object property names | __proto__ present | invalid |
| required.json | required properties whose names are Javascript object property names | toString present | invalid |
| required.json | required properties whose names are Javascript object property names | constructor present | invalid |
| optional/bignum.json | float comparison with high precision | comparison works for high numbers | invalid |
| optional/bignum.json | float comparison with high precision on negative numbers | comparison works for very negative numbers | invalid |
| optional/float-overflow.json | all integers are multiples of 0.5, if overflow is handled | valid if optional overflow handling is implemented | valid |
| optional/format/hostname.json | validation of host names | trailing dot | invalid |
| optional/id.json | id inside an enum is not a real identifier | exact match to enum, and type matches | valid |
| optional/id.json | id inside an enum is not a real identifier | match $ref to id | valid |
| optional/id.json | id inside an enum is not a real identifier | no match on enum or $ref to id | invalid |
| optional/zeroTerminatedFloats.json | some languages do not distinguish between different types of numeric value | a float is not an integer even without fractional part | invalid |

#### ajv draft6 Failures

| File | Group | Test | Expected |
|------|-------|------|----------|
| properties.json | properties whose names are Javascript object property names | none of the properties mentioned | valid |
| ref.json | ref overrides any sibling keywords | ref valid, maxItems ignored | valid |
| ref.json | $ref prevents a sibling $id from changing the base uri | $ref resolves to /definitions/base_foo, data does not validate | invalid |
| ref.json | $ref prevents a sibling $id from changing the base uri | $ref resolves to /definitions/base_foo, data validates | valid |
| required.json | required properties whose names are Javascript object property names | none of the properties mentioned | invalid |
| required.json | required properties whose names are Javascript object property names | __proto__ present | invalid |
| required.json | required properties whose names are Javascript object property names | toString present | invalid |
| required.json | required properties whose names are Javascript object property names | constructor present | invalid |
| optional/float-overflow.json | all integers are multiples of 0.5, if overflow is handled | valid if optional overflow handling is implemented | valid |
| optional/format/hostname.json | validation of host names | trailing dot | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches second anyOf, which has a real schema in it | valid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in first anyOf | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in third anyOf | invalid |

#### ajv draft7 Failures

| File | Group | Test | Expected |
|------|-------|------|----------|
| properties.json | properties whose names are Javascript object property names | none of the properties mentioned | valid |
| ref.json | ref overrides any sibling keywords | ref valid, maxItems ignored | valid |
| ref.json | $ref prevents a sibling $id from changing the base uri | $ref resolves to /definitions/base_foo, data does not validate | invalid |
| ref.json | $ref prevents a sibling $id from changing the base uri | $ref resolves to /definitions/base_foo, data validates | valid |
| required.json | required properties whose names are Javascript object property names | none of the properties mentioned | invalid |
| required.json | required properties whose names are Javascript object property names | __proto__ present | invalid |
| required.json | required properties whose names are Javascript object property names | toString present | invalid |
| required.json | required properties whose names are Javascript object property names | constructor present | invalid |
| optional/content.json | validation of string-encoded content based on media type | an invalid JSON document | invalid |
| optional/content.json | validation of binary string-encoding | an invalid base64 string (% is not a valid character) | invalid |
| optional/content.json | validation of binary-encoded media type documents | a validly-encoded invalid JSON document | invalid |
| optional/content.json | validation of binary-encoded media type documents | an invalid base64 string that is valid JSON | invalid |
| optional/cross-draft.json | refs to future drafts are processed as future drafts | missing bar is invalid | invalid |
| optional/float-overflow.json | all integers are multiples of 0.5, if overflow is handled | valid if optional overflow handling is implemented | valid |
| optional/format/hostname.json | validation of host names | trailing dot | invalid |
| optional/format/hostname.json | validation of host names | contains "--" in the 3rd and 4th position | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | invalid Punycode | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | contains illegal char U+302E Hangul single dot tone mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with a Spacing Combining Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with a Nonspacing Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with an Enclosing Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Exceptions that are DISALLOWED, right-to-left chars | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Exceptions that are DISALLOWED, left-to-right chars | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with no preceding 'l' | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with nothing preceding | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with no following 'l' | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with nothing following | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Greek KERAIA not followed by Greek | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Greek KERAIA not followed by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERESH not preceded by Hebrew | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERESH not preceded by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERSHAYIM not preceded by Hebrew | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERSHAYIM not preceded by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | KATAKANA MIDDLE DOT with no other characters | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Arabic-Indic digits mixed with Extended Arabic-Indic digits | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | ZERO WIDTH JOINER not preceded by Virama | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | ZERO WIDTH JOINER not preceded by anything | invalid |
| optional/format/idn-email.json | validation of an internationalized e-mail addresses | an invalid idn e-mail address | invalid |
| optional/format/idn-email.json | validation of an internationalized e-mail addresses | an invalid e-mail address | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | illegal first char U+302E Hangul single dot tone mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | contains illegal char U+302E Hangul single dot tone mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | a host name with a component too long | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | invalid label, correct Punycode | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | invalid Punycode | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | U-label contains "--" in the 3rd and 4th position | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | U-label starts with a dash | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | U-label ends with a dash | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | U-label starts and ends with a dash | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with a Spacing Combining Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with a Nonspacing Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with an Enclosing Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Exceptions that are DISALLOWED, right-to-left chars | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Exceptions that are DISALLOWED, left-to-right chars | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with no preceding 'l' | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with nothing preceding | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with no following 'l' | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with nothing following | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Greek KERAIA not followed by Greek | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Greek KERAIA not followed by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERESH not preceded by Hebrew | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERESH not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERSHAYIM not preceded by Hebrew | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERSHAYIM not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | KATAKANA MIDDLE DOT with no other characters | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Arabic-Indic digits mixed with Extended Arabic-Indic digits | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | ZERO WIDTH JOINER not preceded by Virama | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | ZERO WIDTH JOINER not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | empty string | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | single dot | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | single ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | single fullwidth full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | single halfwidth ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | leading dot | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | leading ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | leading fullwidth full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | leading halfwidth ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing dot | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing fullwidth full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing halfwidth ideographic full stop | invalid |
| optional/format/iri-reference.json | validation of IRI References | an invalid IRI Reference | invalid |
| optional/format/iri-reference.json | validation of IRI References | an invalid IRI fragment | invalid |
| optional/format/iri.json | validation of IRIs | an invalid IRI based on IPv6 | invalid |
| optional/format/iri.json | validation of IRIs | an invalid relative IRI Reference | invalid |
| optional/format/iri.json | validation of IRIs | an invalid IRI | invalid |
| optional/format/iri.json | validation of IRIs | an invalid IRI though valid IRI reference | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches second anyOf, which has a real schema in it | valid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in first anyOf | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in third anyOf | invalid |

#### ajv draft2019-09 Failures

| File | Group | Test | Expected |
|------|-------|------|----------|
| properties.json | properties whose names are Javascript object property names | none of the properties mentioned | valid |
| recursiveRef.json | $recursiveRef with no $recursiveAnchor in the initial target schema resource | leaf node matches: recursion uses the inner schema | valid |
| recursiveRef.json | $recursiveRef with no $recursiveAnchor in the initial target schema resource | leaf node does not match: recursion uses the inner schema | invalid |
| ref.json | refs with relative uris and defs | invalid on inner field | invalid |
| ref.json | refs with relative uris and defs | invalid on outer field | invalid |
| ref.json | refs with relative uris and defs | valid on both fields | valid |
| ref.json | relative refs with absolute uris and defs | invalid on inner field | invalid |
| ref.json | relative refs with absolute uris and defs | invalid on outer field | invalid |
| ref.json | relative refs with absolute uris and defs | valid on both fields | valid |
| ref.json | URN ref with nested pointer ref | a string is valid | valid |
| ref.json | URN ref with nested pointer ref | a non-string is invalid | invalid |
| required.json | required properties whose names are Javascript object property names | none of the properties mentioned | invalid |
| required.json | required properties whose names are Javascript object property names | __proto__ present | invalid |
| required.json | required properties whose names are Javascript object property names | toString present | invalid |
| required.json | required properties whose names are Javascript object property names | constructor present | invalid |
| unevaluatedItems.json | unevaluatedItems with nested items | with no additional items | valid |
| unevaluatedItems.json | unevaluatedItems with nested items | with invalid additional item | invalid |
| unevaluatedItems.json | unevaluatedItems can see annotations from if without then and else | valid in case if is evaluated | valid |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else, then not defined | when if is true and has no unevaluated properties | valid |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else, then not defined | when if is false and has unevaluated properties | invalid |
| unevaluatedProperties.json | unevaluatedProperties can see annotations from if without then and else | valid in case if is evaluated | valid |
| vocabulary.json | schema that uses custom metaschema with with no validation vocabulary | no validation: invalid number, but it still validates | valid |
| optional/cross-draft.json | refs to future drafts are processed as future drafts | first item not a string is invalid | invalid |
| optional/cross-draft.json | refs to historic drafts are processed as historic drafts | missing bar is valid | valid |
| optional/float-overflow.json | all integers are multiples of 0.5, if overflow is handled | valid if optional overflow handling is implemented | valid |
| optional/format/duration.json | validation of duration strings | weeks cannot be combined with other units | invalid |
| optional/format/hostname.json | validation of host names | trailing dot | invalid |
| optional/format/hostname.json | validation of host names | contains "--" in the 3rd and 4th position | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | invalid Punycode | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | contains illegal char U+302E Hangul single dot tone mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with a Spacing Combining Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with a Nonspacing Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with an Enclosing Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Exceptions that are DISALLOWED, right-to-left chars | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Exceptions that are DISALLOWED, left-to-right chars | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with no preceding 'l' | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with nothing preceding | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with no following 'l' | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with nothing following | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Greek KERAIA not followed by Greek | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Greek KERAIA not followed by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERESH not preceded by Hebrew | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERESH not preceded by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERSHAYIM not preceded by Hebrew | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERSHAYIM not preceded by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | KATAKANA MIDDLE DOT with no other characters | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Arabic-Indic digits mixed with Extended Arabic-Indic digits | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | ZERO WIDTH JOINER not preceded by Virama | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | ZERO WIDTH JOINER not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | illegal first char U+302E Hangul single dot tone mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | contains illegal char U+302E Hangul single dot tone mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | invalid Punycode | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | U-label contains "--" in the 3rd and 4th position | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with a Spacing Combining Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with a Nonspacing Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with an Enclosing Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Exceptions that are DISALLOWED, right-to-left chars | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Exceptions that are DISALLOWED, left-to-right chars | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with no preceding 'l' | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with nothing preceding | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with no following 'l' | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with nothing following | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Greek KERAIA not followed by Greek | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Greek KERAIA not followed by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERESH not preceded by Hebrew | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERESH not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERSHAYIM not preceded by Hebrew | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERSHAYIM not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | KATAKANA MIDDLE DOT with no other characters | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Arabic-Indic digits mixed with Extended Arabic-Indic digits | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | ZERO WIDTH JOINER not preceded by Virama | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | ZERO WIDTH JOINER not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing dot | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing fullwidth full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing halfwidth ideographic full stop | invalid |
| optional/format/iri-reference.json | validation of IRI References | an invalid IRI Reference | invalid |
| optional/format/iri-reference.json | validation of IRI References | an invalid IRI fragment | invalid |
| optional/format/iri.json | validation of IRIs | a valid IRI with anchor tag | valid |
| optional/format/iri.json | validation of IRIs | a valid IRI with anchor tag and parentheses | valid |
| optional/format/iri.json | validation of IRIs | an invalid IRI based on IPv6 | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches second anyOf, which has a real schema in it | valid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in first anyOf | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in third anyOf | invalid |

#### ajv draft2020-12 Failures

| File | Group | Test | Expected |
|------|-------|------|----------|
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in the same schema resource behaves like a normal $ref to an $anchor | An array of strings is valid | valid |
| dynamicRef.json | A $dynamicRef to an $anchor in the same schema resource behaves like a normal $ref to an $anchor | An array of strings is valid | valid |
| dynamicRef.json | A $dynamicRef resolves to the first $dynamicAnchor still in scope that is encountered when the schema is evaluated | An array of strings is valid | valid |
| dynamicRef.json | A $dynamicRef without anchor in fragment behaves identical to $ref | An array of numbers is valid | valid |
| dynamicRef.json | A $dynamicRef with intermediate scopes that don't include a matching $dynamicAnchor does not affect dynamic scope resolution | An array of strings is valid | valid |
| dynamicRef.json | An $anchor with the same name as a $dynamicAnchor is not used for dynamic scope resolution | Any array is valid | valid |
| dynamicRef.json | A $dynamicRef without a matching $dynamicAnchor in the same schema resource behaves like a normal $ref to $anchor | Any array is valid | valid |
| dynamicRef.json | A $dynamicRef with a non-matching $dynamicAnchor in the same schema resource behaves like a normal $ref to $anchor | Any array is valid | valid |
| dynamicRef.json | A $dynamicRef that initially resolves to a schema with a matching $dynamicAnchor resolves to the first $dynamicAnchor in the dynamic scope | The recursive part is valid against the root | valid |
| dynamicRef.json | A $dynamicRef that initially resolves to a schema with a matching $dynamicAnchor resolves to the first $dynamicAnchor in the dynamic scope | The recursive part is not valid against the root | invalid |
| dynamicRef.json | A $dynamicRef that initially resolves to a schema without a matching $dynamicAnchor behaves like a normal $ref to $anchor | The recursive part doesn't need to validate against the root | valid |
| dynamicRef.json | multiple dynamic paths to the $dynamicRef keyword | number list with string values | invalid |
| dynamicRef.json | multiple dynamic paths to the $dynamicRef keyword | string list with number values | invalid |
| dynamicRef.json | after leaving a dynamic scope, it is not used by a $dynamicRef | string matches /$defs/thingy, but the $dynamicRef does not stop here | invalid |
| dynamicRef.json | after leaving a dynamic scope, it is not used by a $dynamicRef | first_scope is not in dynamic scope for the $dynamicRef | invalid |
| dynamicRef.json | after leaving a dynamic scope, it is not used by a $dynamicRef | /then/$defs/thingy is the final stop for the $dynamicRef | valid |
| dynamicRef.json | tests for implementation dynamic anchor and reference link | correct extended schema | valid |
| dynamicRef.json | $ref and $dynamicAnchor are independent of order - $defs first | correct extended schema | valid |
| dynamicRef.json | $ref and $dynamicAnchor are independent of order - $ref first | correct extended schema | valid |
| dynamicRef.json | $ref to $dynamicRef finds detached $dynamicAnchor | number is valid | valid |
| dynamicRef.json | $ref to $dynamicRef finds detached $dynamicAnchor | non-number is invalid | invalid |
| dynamicRef.json | $dynamicRef points to a boolean schema | follow $dynamicRef to a false schema | invalid |
| dynamicRef.json | $dynamicRef skips over intermediate resources - direct reference | integer property passes | valid |
| dynamicRef.json | $dynamicRef avoids the root of each schema, but scopes are still registered | data is sufficient for schema at second#/$defs/length | valid |
| dynamicRef.json | $dynamicRef avoids the root of each schema, but scopes are still registered | data is not sufficient for schema at second#/$defs/length | invalid |
| properties.json | properties whose names are Javascript object property names | none of the properties mentioned | valid |
| ref.json | refs with relative uris and defs | invalid on inner field | invalid |
| ref.json | refs with relative uris and defs | invalid on outer field | invalid |
| ref.json | refs with relative uris and defs | valid on both fields | valid |
| ref.json | relative refs with absolute uris and defs | invalid on inner field | invalid |
| ref.json | relative refs with absolute uris and defs | invalid on outer field | invalid |
| ref.json | relative refs with absolute uris and defs | valid on both fields | valid |
| ref.json | URN ref with nested pointer ref | a string is valid | valid |
| ref.json | URN ref with nested pointer ref | a non-string is invalid | invalid |
| required.json | required properties whose names are Javascript object property names | none of the properties mentioned | invalid |
| required.json | required properties whose names are Javascript object property names | __proto__ present | invalid |
| required.json | required properties whose names are Javascript object property names | toString present | invalid |
| required.json | required properties whose names are Javascript object property names | constructor present | invalid |
| unevaluatedItems.json | unevaluatedItems with nested items | with no additional items | valid |
| unevaluatedItems.json | unevaluatedItems with nested items | with invalid additional item | invalid |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | with no unevaluated items | valid |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | with unevaluated items | invalid |
| unevaluatedItems.json | unevaluatedItems depends on adjacent contains | contains passes, second item is not evaluated | invalid |
| unevaluatedItems.json | unevaluatedItems depends on multiple nested contains | 7 not evaluated, fails unevaluatedItems | invalid |
| unevaluatedItems.json | unevaluatedItems and contains interact to control item dependency relationship | only b's are invalid | invalid |
| unevaluatedItems.json | unevaluatedItems and contains interact to control item dependency relationship | only c's are invalid | invalid |
| unevaluatedItems.json | unevaluatedItems and contains interact to control item dependency relationship | only b's and c's are invalid | invalid |
| unevaluatedItems.json | unevaluatedItems and contains interact to control item dependency relationship | only a's and c's are invalid | invalid |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | all items evaluated by contains | valid |
| unevaluatedItems.json | unevaluatedItems can see annotations from if without then and else | valid in case if is evaluated | valid |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else, then not defined | when if is true and has no unevaluated properties | valid |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else, then not defined | when if is false and has unevaluated properties | invalid |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | with no unevaluated properties | valid |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | with unevaluated properties | invalid |
| unevaluatedProperties.json | unevaluatedProperties can see annotations from if without then and else | valid in case if is evaluated | valid |
| vocabulary.json | schema that uses custom metaschema with with no validation vocabulary | no validation: invalid number, but it still validates | valid |
| optional/cross-draft.json | refs to historic drafts are processed as historic drafts | first item not a string is valid | valid |
| optional/dynamicRef.json | $dynamicRef skips over intermediate resources - pointer reference across resource boundary | integer property passes | valid |
| optional/float-overflow.json | all integers are multiples of 0.5, if overflow is handled | valid if optional overflow handling is implemented | valid |
| optional/format/duration.json | validation of duration strings | weeks cannot be combined with other units | invalid |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | when used as a pattern | invalid |
| optional/format/email.json | validation of e-mail addresses | a quoted string with a space in the local part is valid | valid |
| optional/format/email.json | validation of e-mail addresses | a quoted string with a double dot in the local part is valid | valid |
| optional/format/email.json | validation of e-mail addresses | a quoted string with a @ in the local part is valid | valid |
| optional/format/email.json | validation of e-mail addresses | an IPv4-address-literal after the @ is valid | valid |
| optional/format/email.json | validation of e-mail addresses | an IPv6-address-literal after the @ is valid | valid |
| optional/format/hostname.json | validation of host names | trailing dot | invalid |
| optional/format/hostname.json | validation of host names | contains "--" in the 3rd and 4th position | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | invalid Punycode | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | contains illegal char U+302E Hangul single dot tone mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with a Spacing Combining Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with a Nonspacing Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Begins with an Enclosing Mark | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Exceptions that are DISALLOWED, right-to-left chars | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Exceptions that are DISALLOWED, left-to-right chars | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with no preceding 'l' | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with nothing preceding | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with no following 'l' | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | MIDDLE DOT with nothing following | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Greek KERAIA not followed by Greek | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Greek KERAIA not followed by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERESH not preceded by Hebrew | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERESH not preceded by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERSHAYIM not preceded by Hebrew | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Hebrew GERSHAYIM not preceded by anything | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | KATAKANA MIDDLE DOT with no other characters | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | Arabic-Indic digits mixed with Extended Arabic-Indic digits | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | ZERO WIDTH JOINER not preceded by Virama | invalid |
| optional/format/hostname.json | validation of A-label (punycode) host names | ZERO WIDTH JOINER not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | illegal first char U+302E Hangul single dot tone mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | contains illegal char U+302E Hangul single dot tone mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | invalid Punycode | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | U-label contains "--" in the 3rd and 4th position | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with a Spacing Combining Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with a Nonspacing Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Begins with an Enclosing Mark | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Exceptions that are DISALLOWED, right-to-left chars | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Exceptions that are DISALLOWED, left-to-right chars | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with no preceding 'l' | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with nothing preceding | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with no following 'l' | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | MIDDLE DOT with nothing following | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Greek KERAIA not followed by Greek | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Greek KERAIA not followed by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERESH not preceded by Hebrew | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERESH not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERSHAYIM not preceded by Hebrew | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Hebrew GERSHAYIM not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | KATAKANA MIDDLE DOT with no other characters | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | Arabic-Indic digits mixed with Extended Arabic-Indic digits | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | ZERO WIDTH JOINER not preceded by Virama | invalid |
| optional/format/idn-hostname.json | validation of internationalized host names | ZERO WIDTH JOINER not preceded by anything | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing dot | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing ideographic full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing fullwidth full stop | invalid |
| optional/format/idn-hostname.json | validation of separators in internationalized host names | trailing halfwidth ideographic full stop | invalid |
| optional/format/iri-reference.json | validation of IRI References | an invalid IRI Reference | invalid |
| optional/format/iri-reference.json | validation of IRI References | an invalid IRI fragment | invalid |
| optional/format/iri.json | validation of IRIs | a valid IRI with anchor tag | valid |
| optional/format/iri.json | validation of IRIs | a valid IRI with anchor tag and parentheses | valid |
| optional/format/iri.json | validation of IRIs | an invalid IRI based on IPv6 | invalid |
| optional/format-assertion.json | schema that uses custom metaschema with format-assertion: false | format-assertion: false: valid string | valid |
| optional/format-assertion.json | schema that uses custom metaschema with format-assertion: false | format-assertion: false: invalid string | invalid |
| optional/format-assertion.json | schema that uses custom metaschema with format-assertion: true | format-assertion: true: valid string | valid |
| optional/format-assertion.json | schema that uses custom metaschema with format-assertion: true | format-assertion: true: invalid string | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches second anyOf, which has a real schema in it | valid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in first anyOf | invalid |
| optional/unknownKeyword.json | $id inside an unknown keyword is not a real identifier | type matches non-schema in third anyOf | invalid |

## Running Benchmarks

```bash
npm run bench                    # Run all benchmarks
npm run bench:json               # Output as JSON
npm run bench draft7             # Single draft
npm run bench --filter ref       # Filter by filename
```
