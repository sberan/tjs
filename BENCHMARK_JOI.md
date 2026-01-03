# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 28.3M | ⚠️ 0/38 | 0 | - | - |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 28.4M | ⚠️ 0/49 | 0 | - | - |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 26.3M | ⚠️ 0/54 | 0 | - | - |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 19.8M | ⚠️ 1/69 | 18 | 6.1M | 🟢 **-69%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 20.5M | ⚠️ 1/68 | 18 | 6.2M | 🟢 **-70%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 23.2M | ⚠️ 2/278 | 36 | 6.2M | 🟢 **-73%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs joi**: 🟢 tjs is 7.15x faster (23 ns vs 162 ns, 36 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 64.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 16 | ✅ | 36.2M | ⚠️ 13 fail | - | - |
| allOf.json | 27 | ✅ | 44.1M | ⚠️ 21 fail | - | - |
| anyOf.json | 15 | ✅ | 50.1M | ⚠️ 13 fail | - | - |
| default.json | 7 | ✅ | 58.1M | ⚠️ 7 fail | - | - |
| dependencies.json | 29 | ✅ | 35.9M | ⚠️ 15 fail | - | - |
| enum.json | 49 | ✅ | 23.1M | ⚠️ 23 fail | - | - |
| format.json | 36 | ✅ | 71.9M | ⚠️ 36 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 42.4M | ⚠️ 2 fail | - | - |
| items.json | 21 | ✅ | 30.3M | ⚠️ 11 fail | - | - |
| maxItems.json | 4 | ✅ | 66.6M | ⚠️ 1 fail | - | - |
| maxLength.json | 5 | ✅ | 57.9M | ⚠️ 1 fail | - | - |
| maxProperties.json | 8 | ✅ | 51.0M | ⚠️ 2 fail | - | - |
| maximum.json | 8 | ✅ | 67.4M | ⚠️ 4 fail | - | - |
| minItems.json | 4 | ✅ | 67.3M | ⚠️ 1 fail | - | - |
| minLength.json | 5 | ✅ | 56.0M | ⚠️ 2 fail | - | - |
| minProperties.json | 6 | ✅ | 57.1M | ⚠️ 1 fail | - | - |
| minimum.json | 11 | ✅ | 69.0M | ⚠️ 5 fail | - | - |
| multipleOf.json | 10 | ✅ | 63.5M | ⚠️ 5 fail | - | - |
| not.json | 20 | ✅ | 52.2M | ⚠️ 20 fail | - | - |
| oneOf.json | 23 | ✅ | 44.5M | ⚠️ 21 fail | - | - |
| pattern.json | 9 | ✅ | 52.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 18 | ✅ | 22.6M | ⚠️ 7 fail | - | - |
| properties.json | 17 | ✅ | 34.1M | ⚠️ 24 fail | - | - |
| ref.json | 26 | ✅ | 39.4M | ⚠️ 42 fail | - | - |
| refRemote.json | 6 | ✅ | 47.5M | ⚠️ 16 fail | - | - |
| required.json | 8 | ✅ | 60.0M | ⚠️ 11 fail | - | - |
| type.json | 79 | ✅ | 50.2M | ⚠️ 59 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 7 | ✅ | 63.8M | ⚠️ 7 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 24.2M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 23.3M | ⚠️ 9 fail | - | - |
| optional/format/email.json | 17 | ✅ | 19.5M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 37.9M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 13.6M | ⚠️ 7 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 72.5M | ⚠️ 7 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.2M | ⚠️ 7 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 26.7M | ⚠️ 6 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 59.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 34.9M | ⚠️ 13 fail | - | - |
| allOf.json | 30 | ✅ | 44.5M | ⚠️ 23 fail | - | - |
| anyOf.json | 18 | ✅ | 52.0M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.9M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 26.8M | ⚠️ 32 fail | - | - |
| contains.json | 19 | ✅ | 28.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 56.7M | ⚠️ 7 fail | - | - |
| definitions.json | 2 | ✅ | 16.5M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 39.5M | ⚠️ 17 fail | - | - |
| enum.json | 45 | ✅ | 23.8M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 58.8M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 58.8M | ⚠️ 2 fail | - | - |
| format.json | 54 | ✅ | 70.0M | ⚠️ 54 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 41.5M | ⚠️ 2 fail | - | - |
| items.json | 28 | ✅ | 37.1M | ⚠️ 13 fail | - | - |
| maxItems.json | 6 | ✅ | 56.1M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 47.8M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 43.4M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 64.8M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 51.6M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 45.6M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 45.9M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 61.8M | ⚠️ 5 fail | - | - |
| not.json | 38 | ✅ | 49.3M | ⚠️ 29 fail | - | - |
| oneOf.json | 27 | ✅ | 44.5M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 53.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 22.5M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 36.8M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 40.9M | ⚠️ 5 fail | - | - |
| ref.json | 65 | ✅ | 35.8M | ⚠️ 65 fail | - | - |
| refRemote.json | 23 | ✅ | 24.1M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 35.4M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 48.6M | ⚠️ 60 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.8M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 58.8M | ⚠️ 7 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 24.2M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 21.6M | ⚠️ 9 fail | - | - |
| optional/format/email.json | 17 | ✅ | 17.9M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 33.3M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.9M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 26.9M | ⚠️ 38 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 79.2M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 11.5M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 19.7M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.1M | ⚠️ 7 fail | - | - |
| optional/id.json | 7 | ✅ | 31.8M | ⚠️ 6 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 27.4M | ⚠️ 6 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 58.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 39.2M | ⚠️ 13 fail | - | - |
| allOf.json | 30 | ✅ | 46.3M | ⚠️ 23 fail | - | - |
| anyOf.json | 18 | ✅ | 52.9M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 55.1M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 28.3M | ⚠️ 32 fail | - | - |
| contains.json | 21 | ✅ | 29.7M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 58.8M | ⚠️ 7 fail | - | - |
| definitions.json | 2 | ✅ | 16.9M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 39.1M | ⚠️ 17 fail | - | - |
| enum.json | 45 | ✅ | 23.7M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 59.2M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 58.1M | ⚠️ 2 fail | - | - |
| format.json | 102 | ✅ | 65.4M | ⚠️ 102 fail | - | - |
| if-then-else.json | 26 | ✅ | 60.6M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 45.6M | ⚠️ 2 fail | - | - |
| items.json | 28 | ✅ | 38.6M | ⚠️ 13 fail | - | - |
| maxItems.json | 6 | ✅ | 56.7M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 48.4M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 44.5M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 68.0M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 56.7M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 47.0M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 46.4M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 68.9M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 63.7M | ⚠️ 5 fail | - | - |
| not.json | 38 | ✅ | 51.2M | ⚠️ 29 fail | - | - |
| oneOf.json | 27 | ✅ | 45.8M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 53.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 22.9M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 36.2M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 42.1M | ⚠️ 5 fail | - | - |
| ref.json | 73 | ✅ | 36.8M | ⚠️ 73 fail | - | - |
| refRemote.json | 23 | ✅ | 40.1M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 62.3M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 49.9M | ⚠️ 60 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 59.7M | ⚠️ 7 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 24.5M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 22.8M | ⚠️ 9 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.8M | ⚠️ 14 fail | - | - |
| optional/format/email.json | 17 | ✅ | 19.3M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 37.3M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 14.0M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 29.2M | ⚠️ 38 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 57.5M | ⚠️ 8 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 35.5M | ⚠️ 18 fail | - | - |
| optional/format/time.json | 46 | ✅ | 8.2M | ⚠️ 16 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 78.2M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 11.8M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 20.3M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.3M | ⚠️ 7 fail | - | - |
| optional/id.json | 7 | ✅ | 26.8M | ⚠️ 4 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 27.1M | ⚠️ 6 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 36.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 21 | ✅ | 27.4M | ⚠️ 17 fail | - | - |
| allOf.json | 30 | ✅ | 31.4M | ⚠️ 23 fail | - | - |
| anchor.json | 8 | ✅ | 32.0M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 33.8M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 35.4M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 21.6M | ⚠️ 32 fail | - | - |
| contains.json | 21 | ✅ | 21.9M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 43.7M | ✅ | 6.1M | 🟢 **-86%** |
| default.json | 7 | ✅ | 37.1M | ⚠️ 7 fail | - | - |
| defs.json | 2 | ✅ | 2.7M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 33.4M | ⚠️ 6 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 31.3M | ⚠️ 12 fail | - | - |
| enum.json | 45 | ✅ | 18.7M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 36.5M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 35.6M | ⚠️ 2 fail | - | - |
| format.json | 114 | ✅ | 44.5M | ⚠️ 114 fail | - | - |
| if-then-else.json | 26 | ✅ | 35.4M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 31.4M | ⚠️ 2 fail | - | - |
| items.json | 28 | ✅ | 28.7M | ⚠️ 13 fail | - | - |
| maxContains.json | 12 | ✅ | 30.0M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 40.6M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 38.2M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 26.6M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 39.4M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 29.4M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 40.6M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 33.4M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 33.0M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 35.1M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 36.1M | ⚠️ 5 fail | - | - |
| not.json | 40 | ✅ | 33.1M | ⚠️ 31 fail | - | - |
| oneOf.json | 27 | ✅ | 31.5M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 33.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 18.6M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 26.5M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.5M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 31 | ✅ | 8.3M | ⚠️ 32 fail | - | - |
| ref.json | 73 | ✅ | 20.9M | ⚠️ 76 fail | - | - |
| refRemote.json | 31 | ✅ | 29.4M | ⚠️ 30 fail | - | - |
| required.json | 9 | ✅ | 37.2M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 31.6M | ⚠️ 60 fail | - | - |
| unevaluatedItems.json | 51 | ✅ | 19.2M | ⚠️ 23 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.4M | ⚠️ 114 fail | - | - |
| uniqueItems.json | 69 | ✅ | 20.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 34.0M | ⚠️ 5 fail | - | - |
| optional/anchor.json | 4 | ✅ | 20.9M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 33.2M | ⚠️ 7 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 33.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 19.4M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 19.5M | ⚠️ 9 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.2M | ⚠️ 14 fail | - | - |
| optional/format/email.json | 17 | ✅ | 16.8M | ⚠️ 6 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 17.9M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 26.9M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.2M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 22.6M | ⚠️ 38 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 38.2M | ⚠️ 8 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 25.3M | ⚠️ 18 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.7M | ⚠️ 16 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 45.3M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 10.2M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 16.6M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.7M | ⚠️ 7 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 13.9M | ⚠️ 13 fail | - | - |
| optional/id.json | 3 | ✅ | 18.8M | ⚠️ 2 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 37.0M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 21.3M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 32.9M | ⚠️ 10 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 27.4M | ⚠️ 17 fail | - | - |
| allOf.json | 30 | ✅ | 29.2M | ⚠️ 23 fail | - | - |
| anchor.json | 8 | ✅ | 30.4M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 34.0M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 34.3M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 21.6M | ⚠️ 32 fail | - | - |
| contains.json | 21 | ✅ | 22.4M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 44.3M | ✅ | 6.2M | 🟢 **-86%** |
| default.json | 7 | ✅ | 37.8M | ⚠️ 7 fail | - | - |
| defs.json | 2 | ✅ | 3.5M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 33.9M | ⚠️ 6 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 30.8M | ⚠️ 12 fail | - | - |
| dynamicRef.json | 4 | ✅ | 11.5M | ⚠️ 41 fail | - | - |
| enum.json | 45 | ✅ | 18.5M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 35.8M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 36.4M | ⚠️ 2 fail | - | - |
| format.json | 133 | ✅ | 43.9M | ⚠️ 132 fail | - | - |
| if-then-else.json | 26 | ✅ | 35.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 31.4M | ⚠️ 2 fail | - | - |
| items.json | 29 | ✅ | 27.0M | ⚠️ 15 fail | - | - |
| maxContains.json | 12 | ✅ | 28.3M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 34.3M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 30.5M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 28.6M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 36.8M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 27.5M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 34.9M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 29.4M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 29.3M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 34.0M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 35.9M | ⚠️ 5 fail | - | - |
| not.json | 40 | ✅ | 31.4M | ⚠️ 31 fail | - | - |
| oneOf.json | 27 | ✅ | 31.0M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 35.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 18.9M | ⚠️ 10 fail | - | - |
| prefixItems.json | 11 | ✅ | 39.2M | ⚠️ 2 fail | - | - |
| properties.json | 21 | ✅ | 26.8M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.4M | ⚠️ 5 fail | - | - |
| ref.json | 71 | ✅ | 22.6M | ⚠️ 74 fail | - | - |
| refRemote.json | 31 | ✅ | 27.8M | ⚠️ 30 fail | - | - |
| required.json | 9 | ✅ | 36.9M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 30.3M | ⚠️ 60 fail | - | - |
| unevaluatedItems.json | 47 | ✅ | 23.7M | ⚠️ 31 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.2M | ⚠️ 102 fail | - | - |
| uniqueItems.json | 69 | ✅ | 21.5M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 36.1M | ⚠️ 5 fail | - | - |
| optional/anchor.json | 4 | ✅ | 22.3M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 34.3M | ⚠️ 7 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 33.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 19.5M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 19.2M | ⚠️ 9 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.2M | ⚠️ 14 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 18.1M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 25.3M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.2M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 22.7M | ⚠️ 38 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 38.7M | ⚠️ 8 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 25.6M | ⚠️ 18 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.6M | ⚠️ 16 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 44.9M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 10.5M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 16.6M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.7M | ⚠️ 7 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 13.8M | ⚠️ 13 fail | - | - |
| optional/id.json | 3 | ✅ | 19.1M | ⚠️ 2 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 36.2M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 21.1M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 31.6M | ⚠️ 10 fail | - | - |

