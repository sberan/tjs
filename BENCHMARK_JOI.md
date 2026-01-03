# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs pass | tjs fail | tjs ops/s | joi pass | joi fail | joi ops/s | tjs vs joi |
|-------|------:|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| draft4 | 38 | 790 | ⚠️ 881 | 1 | 29.3M | ⚠️ 358 | 524 | - | - |
| draft6 | 49 | 1120 | ✅ 1170 | 0 | 30.1M | ⚠️ 433 | 737 | - | - |
| draft7 | 54 | 1324 | ✅ 1534 | 0 | 26.4M | ⚠️ 534 | 1000 | - | - |
| draft2019-09 | 69 | 1703 | ✅ 1941 | 0 | 19.7M | ⚠️ 646 | 1295 | 598.3M | 🔴 **+2937%** |
| draft2020-12 | 68 | 1665 | ✅ 1990 | 0 | 20.8M | ⚠️ 670 | 1320 | 548.1M | 🔴 **+2529%** |
| **Total** | 278 | 6602 | ✅ 7516 | 1 | 23.5M | ✅ 2641 | 4876 | 1121.9M | 🔴 **+4669%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs joi**: 🟢 tjs is 7.30x faster (22 ns vs 163 ns, 36 tests)

## Detailed Results

### draft4

| File | Tests | tjs pass | tjs fail | tjs ops/s | joi pass | joi fail | joi ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 17 | ✅ 17 | 0 | 66.1M | ⚠️ 12 | 5 | - | - |
| additionalProperties.json | 16 | ✅ 16 | 0 | 40.6M | ⚠️ 3 | 13 | - | - |
| allOf.json | 27 | ✅ 27 | 0 | 46.9M | ⚠️ 6 | 21 | - | - |
| anyOf.json | 15 | ✅ 15 | 0 | 53.8M | ⚠️ 2 | 13 | - | - |
| default.json | 7 | ✅ 7 | 0 | 59.9M | ⚠️ 0 | 7 | - | - |
| dependencies.json | 29 | ✅ 29 | 0 | 37.8M | ⚠️ 14 | 15 | - | - |
| enum.json | 49 | ✅ 49 | 0 | 24.9M | ⚠️ 26 | 23 | - | - |
| format.json | 36 | ✅ 36 | 0 | 75.7M | ⚠️ 0 | 36 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 45.6M | ⚠️ 0 | 2 | - | - |
| items.json | 21 | ✅ 21 | 0 | 35.3M | ⚠️ 10 | 11 | - | - |
| maxItems.json | 4 | ✅ 4 | 0 | 73.6M | ⚠️ 3 | 1 | - | - |
| maxLength.json | 5 | ✅ 5 | 0 | 61.3M | ⚠️ 4 | 1 | - | - |
| maxProperties.json | 8 | ✅ 8 | 0 | 51.8M | ⚠️ 6 | 2 | - | - |
| maximum.json | 8 | ✅ 14 | 0 | 68.6M | ⚠️ 10 | 4 | - | - |
| minItems.json | 4 | ✅ 4 | 0 | 74.1M | ⚠️ 3 | 1 | - | - |
| minLength.json | 5 | ✅ 5 | 0 | 58.1M | ⚠️ 3 | 2 | - | - |
| minProperties.json | 6 | ✅ 6 | 0 | 58.9M | ⚠️ 5 | 1 | - | - |
| minimum.json | 11 | ✅ 17 | 0 | 69.6M | ⚠️ 12 | 5 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 62.9M | ⚠️ 5 | 5 | - | - |
| not.json | 20 | ✅ 20 | 0 | 53.6M | ⚠️ 0 | 20 | - | - |
| oneOf.json | 23 | ✅ 23 | 0 | 45.3M | ⚠️ 2 | 21 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 54.0M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 18 | ✅ 18 | 0 | 23.7M | ⚠️ 11 | 7 | - | - |
| properties.json | 17 | ✅ 24 | 0 | 35.4M | ⚠️ 0 | 24 | - | - |
| ref.json | 26 | ✅ 45 | 0 | 40.8M | ⚠️ 3 | 42 | - | - |
| refRemote.json | 6 | ✅ 17 | 0 | 47.4M | ⚠️ 1 | 16 | - | - |
| required.json | 8 | ✅ 15 | 0 | 62.3M | ⚠️ 4 | 11 | - | - |
| type.json | 79 | ✅ 79 | 0 | 51.7M | ⚠️ 20 | 59 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.1M | ⚠️ 50 | 19 | - | - |
| optional/bignum.json | 7 | ✅ 9 | 0 | 66.0M | ⚠️ 2 | 7 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 24.1M | ⚠️ 8 | 66 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 23.5M | ⚠️ 17 | 9 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 19.7M | ⚠️ 11 | 6 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 39.4M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 14.4M | ⚠️ 33 | 7 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 82.9M | ⚠️ 0 | 7 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.3M | ⚠️ 29 | 7 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 27.4M | ⚠️ 6 | 6 | - | - |

### draft6

| File | Tests | tjs pass | tjs fail | tjs ops/s | joi pass | joi fail | joi ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 61.9M | ⚠️ 13 | 6 | - | - |
| additionalProperties.json | 16 | ✅ 16 | 0 | 39.9M | ⚠️ 3 | 13 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 48.1M | ⚠️ 7 | 23 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 56.0M | ⚠️ 4 | 14 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 60.4M | ⚠️ 0 | 18 | - | - |
| const.json | 54 | ✅ 54 | 0 | 30.0M | ⚠️ 22 | 32 | - | - |
| contains.json | 19 | ✅ 19 | 0 | 29.5M | ⚠️ 10 | 9 | - | - |
| default.json | 7 | ✅ 7 | 0 | 59.6M | ⚠️ 0 | 7 | - | - |
| definitions.json | 2 | ✅ 2 | 0 | 17.3M | ⚠️ 0 | 2 | - | - |
| dependencies.json | 36 | ✅ 36 | 0 | 40.2M | ⚠️ 19 | 17 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 24.6M | ⚠️ 22 | 23 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 61.1M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 60.5M | ⚠️ 2 | 2 | - | - |
| format.json | 54 | ✅ 54 | 0 | 74.4M | ⚠️ 0 | 54 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 45.6M | ⚠️ 0 | 2 | - | - |
| items.json | 28 | ✅ 28 | 0 | 30.1M | ⚠️ 15 | 13 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 58.0M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 49.3M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 46.2M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 68.1M | ⚠️ 6 | 2 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 57.9M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 48.2M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 48.8M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 69.1M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 64.8M | ⚠️ 5 | 5 | - | - |
| not.json | 38 | ✅ 38 | 0 | 53.1M | ⚠️ 9 | 29 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 47.0M | ⚠️ 5 | 22 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 55.4M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 23.3M | ⚠️ 13 | 10 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 37.8M | ⚠️ 0 | 28 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 43.2M | ⚠️ 15 | 5 | - | - |
| ref.json | 65 | ✅ 70 | 0 | 37.2M | ⚠️ 5 | 65 | - | - |
| refRemote.json | 23 | ✅ 23 | 0 | 41.9M | ⚠️ 1 | 22 | - | - |
| required.json | 9 | ✅ 16 | 0 | 65.1M | ⚠️ 4 | 12 | - | - |
| type.json | 80 | ✅ 80 | 0 | 52.6M | ⚠️ 20 | 60 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.1M | ⚠️ 50 | 19 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 60.5M | ⚠️ 2 | 7 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 25.1M | ⚠️ 8 | 66 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 23.4M | ⚠️ 17 | 9 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 19.7M | ⚠️ 11 | 6 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 33.6M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 13.6M | ⚠️ 33 | 7 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 31.1M | ⚠️ 0 | 38 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 81.7M | ⚠️ 0 | 7 | - | - |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 12.3M | ⚠️ 0 | 15 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 21.8M | ⚠️ 0 | 10 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.0M | ⚠️ 29 | 7 | - | - |
| optional/id.json | 7 | ✅ 7 | 0 | 31.2M | ⚠️ 1 | 6 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 26.0M | ⚠️ 6 | 6 | - | - |

### draft7

| File | Tests | tjs pass | tjs fail | tjs ops/s | joi pass | joi fail | joi ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 59.3M | ⚠️ 13 | 6 | - | - |
| additionalProperties.json | 16 | ✅ 16 | 0 | 38.9M | ⚠️ 3 | 13 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 45.9M | ⚠️ 7 | 23 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 54.8M | ⚠️ 4 | 14 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 53.6M | ⚠️ 0 | 18 | - | - |
| const.json | 54 | ✅ 54 | 0 | 29.8M | ⚠️ 22 | 32 | - | - |
| contains.json | 21 | ✅ 21 | 0 | 31.0M | ⚠️ 11 | 10 | - | - |
| default.json | 7 | ✅ 7 | 0 | 58.7M | ⚠️ 0 | 7 | - | - |
| definitions.json | 2 | ✅ 2 | 0 | 16.6M | ⚠️ 0 | 2 | - | - |
| dependencies.json | 36 | ✅ 36 | 0 | 40.2M | ⚠️ 19 | 17 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 24.8M | ⚠️ 22 | 23 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 60.0M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 58.5M | ⚠️ 2 | 2 | - | - |
| format.json | 102 | ✅ 102 | 0 | 70.5M | ⚠️ 0 | 102 | - | - |
| if-then-else.json | 26 | ✅ 26 | 0 | 55.8M | ⚠️ 18 | 8 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 40.9M | ⚠️ 0 | 2 | - | - |
| items.json | 28 | ✅ 28 | 0 | 38.8M | ⚠️ 15 | 13 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 57.1M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 45.9M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 42.5M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 66.5M | ⚠️ 6 | 2 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 46.9M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 44.9M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 40.5M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 63.2M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 62.7M | ⚠️ 5 | 5 | - | - |
| not.json | 38 | ✅ 38 | 0 | 48.1M | ⚠️ 9 | 29 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 46.5M | ⚠️ 5 | 22 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 53.9M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 22.9M | ⚠️ 13 | 10 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 36.5M | ⚠️ 0 | 28 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 43.0M | ⚠️ 15 | 5 | - | - |
| ref.json | 73 | ✅ 78 | 0 | 37.1M | ⚠️ 5 | 73 | - | - |
| refRemote.json | 23 | ✅ 23 | 0 | 41.7M | ⚠️ 1 | 22 | - | - |
| required.json | 9 | ✅ 16 | 0 | 64.9M | ⚠️ 4 | 12 | - | - |
| type.json | 80 | ✅ 80 | 0 | 51.6M | ⚠️ 20 | 60 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 25.7M | ⚠️ 50 | 19 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 59.9M | ⚠️ 2 | 7 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 24.2M | ⚠️ 8 | 66 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 22.2M | ⚠️ 17 | 9 | - | - |
| optional/format/date.json | 48 | ✅ 48 | 0 | 9.8M | ⚠️ 34 | 14 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 19.3M | ⚠️ 11 | 6 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 35.8M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 13.8M | ⚠️ 33 | 7 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 29.8M | ⚠️ 0 | 38 | - | - |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 68.2M | ⚠️ 0 | 8 | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 37.4M | ⚠️ 0 | 18 | - | - |
| optional/format/time.json | 46 | ✅ 46 | 0 | 8.2M | ⚠️ 30 | 16 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 74.0M | ⚠️ 0 | 7 | - | - |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 11.8M | ⚠️ 0 | 15 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 20.6M | ⚠️ 0 | 10 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.2M | ⚠️ 29 | 7 | - | - |
| optional/id.json | 7 | ✅ 7 | 0 | 26.6M | ⚠️ 3 | 4 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 27.2M | ⚠️ 6 | 6 | - | - |

### draft2019-09

| File | Tests | tjs pass | tjs fail | tjs ops/s | joi pass | joi fail | joi ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 36.3M | ⚠️ 13 | 6 | - | - |
| additionalProperties.json | 21 | ✅ 21 | 0 | 27.2M | ⚠️ 4 | 17 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 29.6M | ⚠️ 7 | 23 | - | - |
| anchor.json | 8 | ✅ 8 | 0 | 33.9M | ⚠️ 0 | 8 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 34.0M | ⚠️ 4 | 14 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 36.3M | ⚠️ 0 | 18 | - | - |
| const.json | 54 | ✅ 54 | 0 | 22.0M | ⚠️ 22 | 32 | - | - |
| contains.json | 21 | ✅ 21 | 0 | 22.6M | ⚠️ 11 | 10 | - | - |
| content.json | 18 | ✅ 18 | 0 | 45.5M | ✅ 18 | 0 | 6.3M | 🟢 **-86%** |
| default.json | 7 | ✅ 7 | 0 | 38.0M | ⚠️ 0 | 7 | - | - |
| defs.json | 2 | ✅ 2 | 0 | 2.8M | ⚠️ 0 | 2 | - | - |
| dependentRequired.json | 20 | ✅ 20 | 0 | 34.5M | ⚠️ 14 | 6 | - | - |
| dependentSchemas.json | 20 | ✅ 20 | 0 | 31.9M | ⚠️ 8 | 12 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 18.9M | ⚠️ 22 | 23 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 36.3M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 34.9M | ⚠️ 2 | 2 | - | - |
| format.json | 114 | ✅ 114 | 0 | 44.6M | ⚠️ 0 | 114 | - | - |
| if-then-else.json | 26 | ✅ 26 | 0 | 35.9M | ⚠️ 18 | 8 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 31.9M | ⚠️ 0 | 2 | - | - |
| items.json | 28 | ✅ 28 | 0 | 28.1M | ⚠️ 15 | 13 | - | - |
| maxContains.json | 12 | ✅ 12 | 0 | 29.5M | ⚠️ 6 | 6 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 39.2M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 34.0M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 31.1M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 39.6M | ⚠️ 6 | 2 | - | - |
| minContains.json | 28 | ✅ 28 | 0 | 30.0M | ⚠️ 14 | 14 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 40.8M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 32.7M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 32.2M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 33.8M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 35.2M | ⚠️ 5 | 5 | - | - |
| not.json | 40 | ✅ 40 | 0 | 31.8M | ⚠️ 9 | 31 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 30.3M | ⚠️ 5 | 22 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 33.8M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 19.1M | ⚠️ 13 | 10 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 27.1M | ⚠️ 0 | 28 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 28.8M | ⚠️ 15 | 5 | - | - |
| recursiveRef.json | 31 | ✅ 34 | 0 | 8.6M | ⚠️ 2 | 32 | - | - |
| ref.json | 73 | ✅ 81 | 0 | 20.1M | ⚠️ 5 | 76 | - | - |
| refRemote.json | 31 | ✅ 31 | 0 | 27.9M | ⚠️ 1 | 30 | - | - |
| required.json | 9 | ✅ 16 | 0 | 35.4M | ⚠️ 4 | 12 | - | - |
| type.json | 80 | ✅ 80 | 0 | 31.4M | ⚠️ 20 | 60 | - | - |
| unevaluatedItems.json | 51 | ✅ 56 | 0 | 19.7M | ⚠️ 33 | 23 | - | - |
| unevaluatedProperties.json | 117 | ✅ 123 | 0 | 14.4M | ⚠️ 9 | 114 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 19.1M | ⚠️ 50 | 19 | - | - |
| vocabulary.json | 2 | ✅ 5 | 0 | 32.1M | ⚠️ 0 | 5 | - | - |
| optional/anchor.json | 4 | ✅ 4 | 0 | 20.7M | ⚠️ 1 | 3 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 35.0M | ⚠️ 2 | 7 | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | 0 | 33.1M | ⚠️ 22 | 14 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 18.3M | ⚠️ 8 | 66 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 16.8M | ⚠️ 17 | 9 | - | - |
| optional/format/date.json | 48 | ✅ 48 | 0 | 8.9M | ⚠️ 34 | 14 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 16.8M | ⚠️ 11 | 6 | - | - |
| optional/format/idn-email.json | 10 | ✅ 10 | 0 | 18.2M | ⚠️ 0 | 10 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 27.7M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 12.5M | ⚠️ 33 | 7 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 23.3M | ⚠️ 0 | 38 | - | - |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 35.5M | ⚠️ 0 | 8 | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 24.3M | ⚠️ 0 | 18 | - | - |
| optional/format/time.json | 46 | ✅ 46 | 0 | 7.7M | ⚠️ 30 | 16 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 38.4M | ⚠️ 0 | 7 | - | - |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 10.6M | ⚠️ 0 | 15 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 16.9M | ⚠️ 0 | 10 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 7.6M | ⚠️ 29 | 7 | - | - |
| optional/format/uuid.json | 22 | ✅ 22 | 0 | 14.2M | ⚠️ 9 | 13 | - | - |
| optional/id.json | 3 | ✅ 3 | 0 | 19.2M | ⚠️ 1 | 2 | - | - |
| optional/no-schema.json | 3 | ✅ 3 | 0 | 35.8M | ⚠️ 2 | 1 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 21.1M | ⚠️ 6 | 6 | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | 0 | 32.8M | ⚠️ 0 | 10 | - | - |

### draft2020-12

| File | Tests | tjs pass | tjs fail | tjs ops/s | joi pass | joi fail | joi ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalProperties.json | 21 | ✅ 21 | 0 | 27.4M | ⚠️ 4 | 17 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 29.5M | ⚠️ 7 | 23 | - | - |
| anchor.json | 8 | ✅ 8 | 0 | 31.2M | ⚠️ 0 | 8 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 33.6M | ⚠️ 4 | 14 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 34.0M | ⚠️ 0 | 18 | - | - |
| const.json | 54 | ✅ 54 | 0 | 22.2M | ⚠️ 22 | 32 | - | - |
| contains.json | 21 | ✅ 21 | 0 | 22.6M | ⚠️ 11 | 10 | - | - |
| content.json | 18 | ✅ 18 | 0 | 43.9M | ✅ 18 | 0 | 5.9M | 🟢 **-87%** |
| default.json | 7 | ✅ 7 | 0 | 37.4M | ⚠️ 0 | 7 | - | - |
| defs.json | 2 | ✅ 2 | 0 | 3.4M | ⚠️ 0 | 2 | - | - |
| dependentRequired.json | 20 | ✅ 20 | 0 | 33.9M | ⚠️ 14 | 6 | - | - |
| dependentSchemas.json | 20 | ✅ 20 | 0 | 31.1M | ⚠️ 8 | 12 | - | - |
| dynamicRef.json | 4 | ✅ 44 | 0 | 11.2M | ⚠️ 3 | 41 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 18.7M | ⚠️ 22 | 23 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 34.5M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 34.6M | ⚠️ 2 | 2 | - | - |
| format.json | 133 | ✅ 133 | 0 | 43.6M | ⚠️ 1 | 132 | - | - |
| if-then-else.json | 26 | ✅ 26 | 0 | 35.8M | ⚠️ 18 | 8 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 31.5M | ⚠️ 0 | 2 | - | - |
| items.json | 29 | ✅ 29 | 0 | 27.4M | ⚠️ 14 | 15 | - | - |
| maxContains.json | 12 | ✅ 12 | 0 | 28.5M | ⚠️ 6 | 6 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 37.4M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 33.7M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 30.3M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 38.4M | ⚠️ 6 | 2 | - | - |
| minContains.json | 28 | ✅ 28 | 0 | 29.1M | ⚠️ 14 | 14 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 37.7M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 31.6M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 30.3M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 34.6M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 36.2M | ⚠️ 5 | 5 | - | - |
| not.json | 40 | ✅ 40 | 0 | 31.9M | ⚠️ 9 | 31 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 31.6M | ⚠️ 5 | 22 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 35.2M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 18.9M | ⚠️ 13 | 10 | - | - |
| prefixItems.json | 11 | ✅ 11 | 0 | 38.0M | ⚠️ 9 | 2 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 26.8M | ⚠️ 0 | 28 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 28.3M | ⚠️ 15 | 5 | - | - |
| ref.json | 71 | ✅ 79 | 0 | 22.8M | ⚠️ 5 | 74 | - | - |
| refRemote.json | 31 | ✅ 31 | 0 | 28.9M | ⚠️ 1 | 30 | - | - |
| required.json | 9 | ✅ 16 | 0 | 36.4M | ⚠️ 4 | 12 | - | - |
| type.json | 80 | ✅ 80 | 0 | 31.8M | ⚠️ 20 | 60 | - | - |
| unevaluatedItems.json | 47 | ✅ 71 | 0 | 24.4M | ⚠️ 40 | 31 | - | - |
| unevaluatedProperties.json | 117 | ✅ 125 | 0 | 15.2M | ⚠️ 23 | 102 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 22.0M | ⚠️ 50 | 19 | - | - |
| vocabulary.json | 2 | ✅ 5 | 0 | 35.6M | ⚠️ 0 | 5 | - | - |
| optional/anchor.json | 4 | ✅ 4 | 0 | 22.1M | ⚠️ 1 | 3 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 36.5M | ⚠️ 2 | 7 | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | 0 | 34.0M | ⚠️ 22 | 14 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 19.7M | ⚠️ 8 | 66 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 18.3M | ⚠️ 17 | 9 | - | - |
| optional/format/date.json | 48 | ✅ 48 | 0 | 9.1M | ⚠️ 34 | 14 | - | - |
| optional/format/idn-email.json | 10 | ✅ 10 | 0 | 18.2M | ⚠️ 0 | 10 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 25.7M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 12.5M | ⚠️ 33 | 7 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 23.4M | ⚠️ 0 | 38 | - | - |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 39.3M | ⚠️ 0 | 8 | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 26.4M | ⚠️ 0 | 18 | - | - |
| optional/format/time.json | 46 | ✅ 46 | 0 | 7.8M | ⚠️ 30 | 16 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 45.3M | ⚠️ 0 | 7 | - | - |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 10.8M | ⚠️ 0 | 15 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 17.0M | ⚠️ 0 | 10 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 7.5M | ⚠️ 29 | 7 | - | - |
| optional/format/uuid.json | 22 | ✅ 22 | 0 | 14.0M | ⚠️ 9 | 13 | - | - |
| optional/id.json | 3 | ✅ 3 | 0 | 18.5M | ⚠️ 1 | 2 | - | - |
| optional/no-schema.json | 3 | ✅ 3 | 0 | 35.1M | ⚠️ 2 | 1 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 19.8M | ⚠️ 6 | 6 | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | 0 | 30.1M | ⚠️ 0 | 10 | - | - |

