# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs pass | tjs fail | tjs ops/s | zod pass | zod fail | zod ops/s | tjs vs zod |
|-------|------:|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| draft4 | 38 | 790 | ⚠️ 881 | 1 | 29.8M | ⚠️ 575 | 307 | 878K | 🟢 **-97%** |
| draft6 | 49 | 1120 | ✅ 1170 | 0 | 30.8M | ⚠️ 763 | 407 | 1.1M | 🟢 **-96%** |
| draft7 | 54 | 1324 | ✅ 1534 | 0 | 27.0M | ⚠️ 954 | 580 | 1.3M | 🟢 **-95%** |
| draft2019-09 | 69 | 1703 | ✅ 1941 | 0 | 19.8M | ⚠️ 1071 | 870 | 1.7M | 🟢 **-91%** |
| draft2020-12 | 68 | 1665 | ✅ 1990 | 0 | 21.0M | ⚠️ 1076 | 914 | 1.6M | 🟢 **-92%** |
| **Total** | 278 | 6602 | ✅ 7516 | 1 | 23.8M | ✅ 4439 | 3078 | 1.3M | 🟢 **-94%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs zod**: 🟢 tjs is 227.93x faster (21 ns vs 4812 ns, 1020 tests)

## Detailed Results

### draft4

| File | Tests | tjs pass | tjs fail | tjs ops/s | zod pass | zod fail | zod ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 17 | ✅ 17 | 0 | 67.1M | ⚠️ 12 | 5 | - | - |
| additionalProperties.json | 16 | ✅ 16 | 0 | 40.3M | ⚠️ 11 | 5 | - | - |
| allOf.json | 27 | ✅ 27 | 0 | 47.6M | ⚠️ 12 | 15 | - | - |
| anyOf.json | 15 | ✅ 15 | 0 | 54.9M | ⚠️ 12 | 3 | - | - |
| default.json | 7 | ✅ 7 | 0 | 61.5M | ✅ 7 | 0 | 745K | 🟢 **-99%** |
| dependencies.json | 29 | ✅ 29 | 0 | 37.5M | ⚠️ 16 | 13 | - | - |
| enum.json | 49 | ✅ 49 | 0 | 25.1M | ⚠️ 38 | 11 | - | - |
| format.json | 36 | ✅ 36 | 0 | 75.0M | ✅ 36 | 0 | 29.0M | 🟢 **-61%** |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 50.1M | ⚠️ 1 | 1 | - | - |
| items.json | 21 | ✅ 21 | 0 | 35.5M | ⚠️ 13 | 8 | - | - |
| maxItems.json | 4 | ✅ 4 | 0 | 70.0M | ⚠️ 3 | 1 | - | - |
| maxLength.json | 5 | ✅ 5 | 0 | 61.0M | ⚠️ 4 | 1 | - | - |
| maxProperties.json | 8 | ✅ 8 | 0 | 51.8M | ⚠️ 6 | 2 | - | - |
| maximum.json | 8 | ✅ 14 | 0 | 69.0M | ⚠️ 10 | 4 | - | - |
| minItems.json | 4 | ✅ 4 | 0 | 74.2M | ⚠️ 3 | 1 | - | - |
| minLength.json | 5 | ✅ 5 | 0 | 57.3M | ⚠️ 3 | 2 | - | - |
| minProperties.json | 6 | ✅ 6 | 0 | 60.4M | ⚠️ 5 | 1 | - | - |
| minimum.json | 11 | ✅ 17 | 0 | 70.4M | ⚠️ 12 | 5 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 65.3M | ⚠️ 7 | 3 | - | - |
| not.json | 20 | ✅ 20 | 0 | 54.6M | ⚠️ 10 | 10 | - | - |
| oneOf.json | 23 | ✅ 23 | 0 | 46.6M | ⚠️ 14 | 9 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 53.5M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 18 | ✅ 18 | 0 | 23.9M | ⚠️ 11 | 7 | - | - |
| properties.json | 17 | ✅ 24 | 0 | 36.7M | ⚠️ 14 | 10 | - | - |
| ref.json | 26 | ✅ 45 | 0 | 41.7M | ⚠️ 13 | 32 | - | - |
| refRemote.json | 6 | ✅ 17 | 0 | 49.2M | ⚠️ 1 | 16 | - | - |
| required.json | 8 | ✅ 15 | 0 | 64.1M | ⚠️ 9 | 6 | - | - |
| type.json | 79 | ✅ 79 | 0 | 52.8M | ✅ 79 | 0 | 89K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.1M | ⚠️ 50 | 19 | - | - |
| optional/bignum.json | 7 | ✅ 9 | 0 | 66.3M | ⚠️ 5 | 4 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 25.2M | ⚠️ 56 | 18 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 24.4M | ⚠️ 13 | 13 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 20.5M | ⚠️ 11 | 6 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 41.2M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 14.5M | ⚠️ 17 | 23 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 82.7M | ✅ 7 | 0 | 29.3M | 🟢 **-65%** |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.5M | ⚠️ 19 | 17 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 27.9M | ⚠️ 6 | 6 | - | - |

### draft6

| File | Tests | tjs pass | tjs fail | tjs ops/s | zod pass | zod fail | zod ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 61.8M | ⚠️ 13 | 6 | - | - |
| additionalProperties.json | 16 | ✅ 16 | 0 | 40.3M | ⚠️ 11 | 5 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 47.8M | ⚠️ 15 | 15 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 56.5M | ⚠️ 15 | 3 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 54.2M | ✅ 18 | 0 | 208K | 🟢 **-100%** |
| const.json | 54 | ✅ 54 | 0 | 30.3M | ⚠️ 47 | 7 | - | - |
| contains.json | 19 | ✅ 19 | 0 | 30.0M | ⚠️ 10 | 9 | - | - |
| default.json | 7 | ✅ 7 | 0 | 61.6M | ✅ 7 | 0 | 579K | 🟢 **-99%** |
| definitions.json | 2 | ✅ 2 | 0 | 17.0M | ⚠️ 0 | 2 | - | - |
| dependencies.json | 36 | ✅ 36 | 0 | 41.2M | ⚠️ 21 | 15 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 25.2M | ⚠️ 34 | 11 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 63.2M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 62.2M | ⚠️ 2 | 2 | - | - |
| format.json | 54 | ✅ 54 | 0 | 74.7M | ✅ 54 | 0 | 29.1M | 🟢 **-61%** |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 43.7M | ⚠️ 1 | 1 | - | - |
| items.json | 28 | ✅ 28 | 0 | 39.4M | ⚠️ 18 | 10 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 58.2M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 49.8M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 46.3M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 68.6M | ⚠️ 6 | 2 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 58.1M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 48.7M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 49.8M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 70.5M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 65.9M | ⚠️ 7 | 3 | - | - |
| not.json | 38 | ✅ 38 | 0 | 53.2M | ⚠️ 10 | 28 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 47.4M | ⚠️ 18 | 9 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 55.5M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 23.5M | ⚠️ 13 | 10 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 38.8M | ⚠️ 16 | 12 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 43.9M | ⚠️ 15 | 5 | - | - |
| ref.json | 65 | ✅ 70 | 0 | 38.7M | ⚠️ 21 | 49 | - | - |
| refRemote.json | 23 | ✅ 23 | 0 | 30.4M | ⚠️ 2 | 21 | - | - |
| required.json | 9 | ✅ 16 | 0 | 63.8M | ⚠️ 10 | 6 | - | - |
| type.json | 80 | ✅ 80 | 0 | 53.0M | ✅ 80 | 0 | 91K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ 69 | 0 | 26.4M | ⚠️ 50 | 19 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 61.8M | ⚠️ 5 | 4 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 25.6M | ⚠️ 56 | 18 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 23.9M | ⚠️ 13 | 13 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 20.3M | ⚠️ 11 | 6 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 38.9M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 14.3M | ⚠️ 17 | 23 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 31.7M | ⚠️ 26 | 12 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 80.9M | ✅ 7 | 0 | 29.2M | 🟢 **-64%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 12.5M | ⚠️ 11 | 4 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 20.8M | ⚠️ 9 | 1 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.4M | ⚠️ 19 | 17 | - | - |
| optional/id.json | 7 | ✅ 7 | 0 | 33.2M | ⚠️ 0 | 7 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 26.0M | ⚠️ 6 | 6 | - | - |

### draft7

| File | Tests | tjs pass | tjs fail | tjs ops/s | zod pass | zod fail | zod ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 61.6M | ⚠️ 13 | 6 | - | - |
| additionalProperties.json | 16 | ✅ 16 | 0 | 40.6M | ⚠️ 11 | 5 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 47.5M | ⚠️ 15 | 15 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 55.6M | ⚠️ 15 | 3 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 56.1M | ✅ 18 | 0 | 204K | 🟢 **-100%** |
| const.json | 54 | ✅ 54 | 0 | 30.0M | ⚠️ 47 | 7 | - | - |
| contains.json | 21 | ✅ 21 | 0 | 31.4M | ⚠️ 11 | 10 | - | - |
| default.json | 7 | ✅ 7 | 0 | 61.7M | ✅ 7 | 0 | 564K | 🟢 **-99%** |
| definitions.json | 2 | ✅ 2 | 0 | 17.1M | ⚠️ 0 | 2 | - | - |
| dependencies.json | 36 | ✅ 36 | 0 | 40.5M | ⚠️ 21 | 15 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 24.7M | ⚠️ 34 | 11 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 61.7M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 60.9M | ⚠️ 2 | 2 | - | - |
| format.json | 102 | ✅ 102 | 0 | 74.6M | ✅ 102 | 0 | 28.5M | 🟢 **-62%** |
| if-then-else.json | 26 | ✅ 26 | 0 | 62.4M | ⚠️ 0 | 26 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 49.2M | ⚠️ 1 | 1 | - | - |
| items.json | 28 | ✅ 28 | 0 | 39.6M | ⚠️ 18 | 10 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 57.5M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 49.8M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 45.9M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 68.7M | ⚠️ 6 | 2 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 58.8M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 48.6M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 49.2M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 70.3M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 65.7M | ⚠️ 7 | 3 | - | - |
| not.json | 38 | ✅ 38 | 0 | 53.9M | ⚠️ 10 | 28 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 48.5M | ⚠️ 18 | 9 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 55.5M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 23.5M | ⚠️ 13 | 10 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 38.5M | ⚠️ 16 | 12 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 43.8M | ⚠️ 15 | 5 | - | - |
| ref.json | 73 | ✅ 78 | 0 | 35.0M | ⚠️ 21 | 57 | - | - |
| refRemote.json | 23 | ✅ 23 | 0 | 43.1M | ⚠️ 2 | 21 | - | - |
| required.json | 9 | ✅ 16 | 0 | 63.7M | ⚠️ 10 | 6 | - | - |
| type.json | 80 | ✅ 80 | 0 | 52.3M | ✅ 80 | 0 | 91K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ 69 | 0 | 25.9M | ⚠️ 50 | 19 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 61.6M | ⚠️ 5 | 4 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 25.0M | ⚠️ 56 | 18 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 24.0M | ⚠️ 13 | 13 | - | - |
| optional/format/date.json | 48 | ✅ 48 | 0 | 10.0M | ⚠️ 21 | 27 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 19.8M | ⚠️ 11 | 6 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 37.4M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 14.1M | ⚠️ 17 | 23 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 30.9M | ⚠️ 26 | 12 | - | - |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 68.7M | ⚠️ 7 | 1 | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 37.1M | ⚠️ 11 | 7 | - | - |
| optional/format/time.json | 46 | ✅ 46 | 0 | 8.3M | ⚠️ 18 | 28 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 81.6M | ✅ 7 | 0 | 28.9M | 🟢 **-65%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 12.0M | ⚠️ 11 | 4 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 19.0M | ⚠️ 9 | 1 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 8.4M | ⚠️ 19 | 17 | - | - |
| optional/id.json | 7 | ✅ 7 | 0 | 27.8M | ⚠️ 0 | 7 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 27.5M | ⚠️ 6 | 6 | - | - |

### draft2019-09

| File | Tests | tjs pass | tjs fail | tjs ops/s | zod pass | zod fail | zod ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalItems.json | 19 | ✅ 19 | 0 | 36.0M | ⚠️ 13 | 6 | - | - |
| additionalProperties.json | 21 | ✅ 21 | 0 | 27.6M | ⚠️ 12 | 9 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 30.9M | ⚠️ 15 | 15 | - | - |
| anchor.json | 8 | ✅ 8 | 0 | 33.4M | ⚠️ 0 | 8 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 34.3M | ⚠️ 15 | 3 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 36.5M | ✅ 18 | 0 | 181K | 🟢 **-100%** |
| const.json | 54 | ✅ 54 | 0 | 22.0M | ⚠️ 47 | 7 | - | - |
| contains.json | 21 | ✅ 21 | 0 | 22.7M | ⚠️ 11 | 10 | - | - |
| content.json | 18 | ✅ 18 | 0 | 45.3M | ✅ 18 | 0 | 28.4M | 🟢 **-37%** |
| default.json | 7 | ✅ 7 | 0 | 38.9M | ✅ 7 | 0 | 560K | 🟢 **-99%** |
| defs.json | 2 | ✅ 2 | 0 | 2.7M | ⚠️ 0 | 2 | - | - |
| dependentRequired.json | 20 | ✅ 20 | 0 | 34.1M | ⚠️ 0 | 20 | - | - |
| dependentSchemas.json | 20 | ✅ 20 | 0 | 31.7M | ⚠️ 0 | 20 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 19.0M | ⚠️ 34 | 11 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 37.4M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 37.1M | ⚠️ 2 | 2 | - | - |
| format.json | 114 | ✅ 114 | 0 | 43.3M | ✅ 114 | 0 | 28.7M | 🟢 **-34%** |
| if-then-else.json | 26 | ✅ 26 | 0 | 36.5M | ⚠️ 0 | 26 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 31.9M | ⚠️ 1 | 1 | - | - |
| items.json | 28 | ✅ 28 | 0 | 28.2M | ⚠️ 22 | 6 | - | - |
| maxContains.json | 12 | ✅ 12 | 0 | 29.4M | ⚠️ 6 | 6 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 40.4M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 38.1M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 31.7M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 40.1M | ⚠️ 6 | 2 | - | - |
| minContains.json | 28 | ✅ 28 | 0 | 29.9M | ⚠️ 14 | 14 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 40.3M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 34.0M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 32.6M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 34.6M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 35.8M | ⚠️ 7 | 3 | - | - |
| not.json | 40 | ✅ 40 | 0 | 32.9M | ⚠️ 10 | 30 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 32.0M | ⚠️ 18 | 9 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 34.1M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 18.7M | ⚠️ 13 | 10 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 26.8M | ⚠️ 16 | 12 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 29.5M | ⚠️ 15 | 5 | - | - |
| recursiveRef.json | 31 | ✅ 34 | 0 | 8.3M | ⚠️ 20 | 14 | - | - |
| ref.json | 73 | ✅ 81 | 0 | 20.6M | ⚠️ 27 | 54 | - | - |
| refRemote.json | 31 | ✅ 31 | 0 | 28.3M | ⚠️ 2 | 29 | - | - |
| required.json | 9 | ✅ 16 | 0 | 36.2M | ⚠️ 10 | 6 | - | - |
| type.json | 80 | ✅ 80 | 0 | 31.3M | ✅ 80 | 0 | 91K | 🟢 **-100%** |
| unevaluatedItems.json | 51 | ✅ 56 | 0 | 19.1M | ⚠️ 1 | 55 | - | - |
| unevaluatedProperties.json | 117 | ✅ 123 | 0 | 14.4M | ⚠️ 0 | 123 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 19.9M | ⚠️ 50 | 19 | - | - |
| vocabulary.json | 2 | ✅ 5 | 0 | 32.7M | ⚠️ 4 | 1 | 179K | 🟢 **-99%** |
| optional/anchor.json | 4 | ✅ 4 | 0 | 22.8M | ⚠️ 0 | 4 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 36.0M | ⚠️ 5 | 4 | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | 0 | 33.7M | ⚠️ 22 | 14 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 19.6M | ⚠️ 56 | 18 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 19.2M | ⚠️ 13 | 13 | - | - |
| optional/format/date.json | 48 | ✅ 48 | 0 | 9.1M | ⚠️ 21 | 27 | - | - |
| optional/format/email.json | 17 | ✅ 17 | 0 | 16.8M | ⚠️ 11 | 6 | - | - |
| optional/format/idn-email.json | 10 | ✅ 10 | 0 | 18.0M | ⚠️ 8 | 2 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 27.2M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 12.4M | ⚠️ 17 | 23 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 22.6M | ⚠️ 26 | 12 | - | - |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 39.3M | ⚠️ 7 | 1 | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 25.9M | ⚠️ 11 | 7 | - | - |
| optional/format/time.json | 46 | ✅ 46 | 0 | 7.7M | ⚠️ 18 | 28 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 46.5M | ✅ 7 | 0 | 29.1M | 🟢 **-37%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 10.7M | ⚠️ 11 | 4 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 13.2M | ⚠️ 9 | 1 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 7.7M | ⚠️ 19 | 17 | - | - |
| optional/format/uuid.json | 22 | ✅ 22 | 0 | 14.1M | ⚠️ 14 | 8 | - | - |
| optional/id.json | 3 | ✅ 3 | 0 | 18.7M | ⚠️ 0 | 3 | - | - |
| optional/no-schema.json | 3 | ✅ 3 | 0 | 33.9M | ⚠️ 2 | 1 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 20.2M | ⚠️ 6 | 6 | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | 0 | 31.5M | ⚠️ 4 | 6 | - | - |

### draft2020-12

| File | Tests | tjs pass | tjs fail | tjs ops/s | zod pass | zod fail | zod ops/s | Diff |
|------|------:|---------:|---------:|----------:|---------:|---------:|----------:|-----:|
| additionalProperties.json | 21 | ✅ 21 | 0 | 26.1M | ⚠️ 12 | 9 | - | - |
| allOf.json | 30 | ✅ 30 | 0 | 29.8M | ⚠️ 15 | 15 | - | - |
| anchor.json | 8 | ✅ 8 | 0 | 30.5M | ⚠️ 0 | 8 | - | - |
| anyOf.json | 18 | ✅ 18 | 0 | 34.0M | ⚠️ 15 | 3 | - | - |
| boolean_schema.json | 18 | ✅ 18 | 0 | 34.8M | ✅ 18 | 0 | 210K | 🟢 **-99%** |
| const.json | 54 | ✅ 54 | 0 | 22.4M | ⚠️ 47 | 7 | - | - |
| contains.json | 21 | ✅ 21 | 0 | 22.8M | ⚠️ 11 | 10 | - | - |
| content.json | 18 | ✅ 18 | 0 | 45.7M | ✅ 18 | 0 | 28.8M | 🟢 **-37%** |
| default.json | 7 | ✅ 7 | 0 | 38.9M | ✅ 7 | 0 | 562K | 🟢 **-99%** |
| defs.json | 2 | ✅ 2 | 0 | 3.5M | ⚠️ 0 | 2 | - | - |
| dependentRequired.json | 20 | ✅ 20 | 0 | 34.7M | ⚠️ 0 | 20 | - | - |
| dependentSchemas.json | 20 | ✅ 20 | 0 | 31.8M | ⚠️ 0 | 20 | - | - |
| dynamicRef.json | 4 | ✅ 44 | 0 | 11.7M | ⚠️ 3 | 41 | - | - |
| enum.json | 45 | ✅ 45 | 0 | 18.7M | ⚠️ 34 | 11 | - | - |
| exclusiveMaximum.json | 4 | ✅ 4 | 0 | 36.4M | ⚠️ 2 | 2 | - | - |
| exclusiveMinimum.json | 4 | ✅ 4 | 0 | 35.6M | ⚠️ 2 | 2 | - | - |
| format.json | 133 | ✅ 133 | 0 | 46.2M | ✅ 133 | 0 | 29.1M | 🟢 **-37%** |
| if-then-else.json | 26 | ✅ 26 | 0 | 37.3M | ⚠️ 0 | 26 | - | - |
| infinite-loop-detection.json | 2 | ✅ 2 | 0 | 32.1M | ⚠️ 1 | 1 | - | - |
| items.json | 29 | ✅ 29 | 0 | 27.8M | ⚠️ 21 | 8 | - | - |
| maxContains.json | 12 | ✅ 12 | 0 | 26.7M | ⚠️ 6 | 6 | - | - |
| maxItems.json | 6 | ✅ 6 | 0 | 37.7M | ⚠️ 4 | 2 | - | - |
| maxLength.json | 7 | ✅ 7 | 0 | 33.7M | ⚠️ 5 | 2 | - | - |
| maxProperties.json | 10 | ✅ 10 | 0 | 30.1M | ⚠️ 7 | 3 | - | - |
| maximum.json | 8 | ✅ 8 | 0 | 39.7M | ⚠️ 6 | 2 | - | - |
| minContains.json | 28 | ✅ 28 | 0 | 29.5M | ⚠️ 14 | 14 | - | - |
| minItems.json | 6 | ✅ 6 | 0 | 36.6M | ⚠️ 4 | 2 | - | - |
| minLength.json | 7 | ✅ 7 | 0 | 32.2M | ⚠️ 4 | 3 | - | - |
| minProperties.json | 8 | ✅ 8 | 0 | 30.6M | ⚠️ 6 | 2 | - | - |
| minimum.json | 11 | ✅ 11 | 0 | 35.5M | ⚠️ 8 | 3 | - | - |
| multipleOf.json | 10 | ✅ 10 | 0 | 35.8M | ⚠️ 7 | 3 | - | - |
| not.json | 40 | ✅ 40 | 0 | 32.2M | ⚠️ 10 | 30 | - | - |
| oneOf.json | 27 | ✅ 27 | 0 | 32.0M | ⚠️ 18 | 9 | - | - |
| pattern.json | 9 | ✅ 9 | 0 | 35.9M | ⚠️ 8 | 1 | - | - |
| patternProperties.json | 23 | ✅ 23 | 0 | 18.6M | ⚠️ 13 | 10 | - | - |
| prefixItems.json | 11 | ✅ 11 | 0 | 38.6M | ⚠️ 9 | 2 | - | - |
| properties.json | 21 | ✅ 28 | 0 | 27.2M | ⚠️ 16 | 12 | - | - |
| propertyNames.json | 20 | ✅ 20 | 0 | 29.8M | ⚠️ 15 | 5 | - | - |
| ref.json | 71 | ✅ 79 | 0 | 23.3M | ⚠️ 27 | 52 | - | - |
| refRemote.json | 31 | ✅ 31 | 0 | 28.7M | ⚠️ 2 | 29 | - | - |
| required.json | 9 | ✅ 16 | 0 | 36.8M | ⚠️ 10 | 6 | - | - |
| type.json | 80 | ✅ 80 | 0 | 31.6M | ✅ 80 | 0 | 87K | 🟢 **-100%** |
| unevaluatedItems.json | 47 | ✅ 71 | 0 | 24.0M | ⚠️ 1 | 70 | - | - |
| unevaluatedProperties.json | 117 | ✅ 125 | 0 | 15.1M | ⚠️ 1 | 124 | - | - |
| uniqueItems.json | 69 | ✅ 69 | 0 | 21.5M | ⚠️ 50 | 19 | - | - |
| vocabulary.json | 2 | ✅ 5 | 0 | 35.5M | ⚠️ 4 | 1 | 178K | 🟢 **-99%** |
| optional/anchor.json | 4 | ✅ 4 | 0 | 22.8M | ⚠️ 0 | 4 | - | - |
| optional/bignum.json | 9 | ✅ 9 | 0 | 35.0M | ⚠️ 5 | 4 | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ 36 | 0 | 33.4M | ⚠️ 22 | 14 | - | - |
| optional/ecmascript-regex.json | 74 | ✅ 74 | 0 | 19.1M | ⚠️ 56 | 18 | - | - |
| optional/format/date-time.json | 26 | ✅ 26 | 0 | 19.3M | ⚠️ 13 | 13 | - | - |
| optional/format/date.json | 48 | ✅ 48 | 0 | 9.2M | ⚠️ 21 | 27 | - | - |
| optional/format/idn-email.json | 10 | ✅ 10 | 0 | 18.1M | ⚠️ 8 | 2 | - | - |
| optional/format/ipv4.json | 16 | ✅ 16 | 0 | 25.4M | ⚠️ 8 | 8 | - | - |
| optional/format/ipv6.json | 40 | ✅ 40 | 0 | 12.5M | ⚠️ 17 | 23 | - | - |
| optional/format/json-pointer.json | 38 | ✅ 38 | 0 | 23.5M | ⚠️ 26 | 12 | - | - |
| optional/format/regex.json | 8 | ✅ 8 | 0 | 39.5M | ⚠️ 7 | 1 | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ 18 | 0 | 26.2M | ⚠️ 11 | 7 | - | - |
| optional/format/time.json | 46 | ✅ 46 | 0 | 7.8M | ⚠️ 18 | 28 | - | - |
| optional/format/unknown.json | 7 | ✅ 7 | 0 | 46.5M | ✅ 7 | 0 | 29.1M | 🟢 **-37%** |
| optional/format/uri-reference.json | 15 | ✅ 15 | 0 | 10.6M | ⚠️ 11 | 4 | - | - |
| optional/format/uri-template.json | 10 | ✅ 10 | 0 | 16.2M | ⚠️ 9 | 1 | - | - |
| optional/format/uri.json | 36 | ✅ 36 | 0 | 7.9M | ⚠️ 19 | 17 | - | - |
| optional/format/uuid.json | 22 | ✅ 22 | 0 | 14.3M | ⚠️ 14 | 8 | - | - |
| optional/id.json | 3 | ✅ 3 | 0 | 19.5M | ⚠️ 0 | 3 | - | - |
| optional/no-schema.json | 3 | ✅ 3 | 0 | 36.7M | ⚠️ 2 | 1 | - | - |
| optional/non-bmp-regex.json | 12 | ✅ 12 | 0 | 21.0M | ⚠️ 6 | 6 | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ 10 | 0 | 33.3M | ⚠️ 4 | 6 | - | - |

