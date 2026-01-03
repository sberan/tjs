# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 29.8M | ⚠️ 4/38 | 129 | 144K | 🟢 **-100%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 30.2M | ⚠️ 5/49 | 166 | 164K | 🟢 **-99%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 27.2M | ⚠️ 5/54 | 214 | 208K | 🟢 **-99%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.4M | ⚠️ 6/69 | 244 | 248K | 🟢 **-99%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.5M | ⚠️ 6/68 | 263 | 261K | 🟢 **-99%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 24.2M | ⚠️ 26/278 | 1016 | 206K | 🟢 **-99%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs zod**: 🟢 tjs is 233.91x faster (21 ns vs 4853 ns, 1020 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 68.9M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 16 | ✅ | 40.8M | ⚠️ 5 fail | - | - |
| allOf.json | 27 | ✅ | 47.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 15 | ✅ | 53.7M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 61.4M | ✅ | 726K | 🟢 **-99%** |
| dependencies.json | 29 | ✅ | 38.5M | ⚠️ 13 fail | - | - |
| enum.json | 49 | ✅ | 25.1M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 75.9M | ✅ | 28.5M | 🟢 **-62%** |
| infinite-loop-detection.json | 2 | ✅ | 42.5M | ⚠️ 1 fail | - | - |
| items.json | 21 | ✅ | 35.4M | ⚠️ 8 fail | - | - |
| maxItems.json | 4 | ✅ | 73.6M | ⚠️ 1 fail | - | - |
| maxLength.json | 5 | ✅ | 62.4M | ⚠️ 1 fail | - | - |
| maxProperties.json | 8 | ✅ | 52.6M | ⚠️ 2 fail | - | - |
| maximum.json | 8 | ✅ | 70.0M | ⚠️ 4 fail | - | - |
| minItems.json | 4 | ✅ | 68.1M | ⚠️ 1 fail | - | - |
| minLength.json | 5 | ✅ | 59.0M | ⚠️ 2 fail | - | - |
| minProperties.json | 6 | ✅ | 60.7M | ⚠️ 1 fail | - | - |
| minimum.json | 11 | ✅ | 71.4M | ⚠️ 5 fail | - | - |
| multipleOf.json | 10 | ✅ | 66.2M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 54.8M | ⚠️ 10 fail | - | - |
| oneOf.json | 23 | ✅ | 47.2M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 55.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 18 | ✅ | 23.9M | ⚠️ 7 fail | - | - |
| properties.json | 17 | ✅ | 36.0M | ⚠️ 10 fail | - | - |
| ref.json | 26 | ✅ | 42.0M | ⚠️ 32 fail | - | - |
| refRemote.json | 6 | ✅ | 49.2M | ⚠️ 16 fail | - | - |
| required.json | 8 | ✅ | 65.3M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 50.9M | ✅ | 89K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 26.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 7 | ✅ | 68.2M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.5M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 24.3M | ⚠️ 13 fail | - | - |
| optional/format/email.json | 17 | ✅ | 20.7M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 41.0M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 14.5M | ⚠️ 23 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 93.0M | ✅ | 28.7M | 🟢 **-69%** |
| optional/format/uri.json | 36 | ✅ | 8.4M | ⚠️ 17 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 27.9M | ⚠️ 6 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 60.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 41.5M | ⚠️ 5 fail | - | - |
| allOf.json | 30 | ✅ | 48.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 18 | ✅ | 57.1M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 58.4M | ✅ | 213K | 🟢 **-100%** |
| const.json | 54 | ✅ | 30.9M | ⚠️ 7 fail | - | - |
| contains.json | 19 | ✅ | 19.8M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 63.5M | ✅ | 560K | 🟢 **-99%** |
| definitions.json | 2 | ✅ | 16.8M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 40.6M | ⚠️ 15 fail | - | - |
| enum.json | 45 | ✅ | 24.3M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 61.8M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 61.9M | ⚠️ 2 fail | - | - |
| format.json | 54 | ✅ | 73.9M | ✅ | 28.5M | 🟢 **-61%** |
| infinite-loop-detection.json | 2 | ✅ | 49.1M | ⚠️ 1 fail | - | - |
| items.json | 28 | ✅ | 38.3M | ⚠️ 10 fail | - | - |
| maxItems.json | 6 | ✅ | 59.1M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 49.9M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 46.1M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 69.6M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 59.9M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 47.9M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 50.1M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 71.4M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 67.3M | ⚠️ 3 fail | - | - |
| not.json | 38 | ✅ | 53.3M | ⚠️ 28 fail | - | - |
| oneOf.json | 27 | ✅ | 47.9M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 55.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 23.3M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 38.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 43.8M | ⚠️ 5 fail | - | - |
| ref.json | 65 | ✅ | 37.5M | ⚠️ 49 fail | - | - |
| refRemote.json | 23 | ✅ | 41.8M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 68.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 51.2M | ✅ | 88K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 26.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 63.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.4M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 22.5M | ⚠️ 13 fail | - | - |
| optional/format/email.json | 17 | ✅ | 19.5M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 13.8M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 29.4M | ⚠️ 12 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 92.0M | ✅ | 28.9M | 🟢 **-69%** |
| optional/format/uri-reference.json | 15 | ✅ | 11.8M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 20.1M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.2M | ⚠️ 17 fail | - | - |
| optional/id.json | 7 | ✅ | 33.9M | ⚠️ 7 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 28.2M | ⚠️ 6 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 61.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 41.4M | ⚠️ 5 fail | - | - |
| allOf.json | 30 | ✅ | 47.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 18 | ✅ | 56.6M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 57.6M | ✅ | 182K | 🟢 **-100%** |
| const.json | 54 | ✅ | 30.3M | ⚠️ 7 fail | - | - |
| contains.json | 21 | ✅ | 31.5M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 62.0M | ✅ | 568K | 🟢 **-99%** |
| definitions.json | 2 | ✅ | 17.2M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 41.0M | ⚠️ 15 fail | - | - |
| enum.json | 45 | ✅ | 25.3M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 63.6M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 62.6M | ⚠️ 2 fail | - | - |
| format.json | 102 | ✅ | 70.4M | ✅ | 29.3M | 🟢 **-58%** |
| if-then-else.json | 26 | ✅ | 63.8M | ⚠️ 26 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 48.9M | ⚠️ 1 fail | - | - |
| items.json | 28 | ✅ | 39.3M | ⚠️ 10 fail | - | - |
| maxItems.json | 6 | ✅ | 60.0M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 50.6M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 46.9M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 70.4M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 58.9M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 49.3M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 50.2M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 71.4M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 66.9M | ⚠️ 3 fail | - | - |
| not.json | 38 | ✅ | 53.5M | ⚠️ 28 fail | - | - |
| oneOf.json | 27 | ✅ | 47.8M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 55.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 23.7M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 37.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 42.8M | ⚠️ 5 fail | - | - |
| ref.json | 73 | ✅ | 37.5M | ⚠️ 57 fail | - | - |
| refRemote.json | 23 | ✅ | 42.5M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 66.7M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 52.8M | ✅ | 87K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 26.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 64.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.1M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 23.8M | ⚠️ 13 fail | - | - |
| optional/format/date.json | 48 | ✅ | 10.0M | ⚠️ 27 fail | - | - |
| optional/format/email.json | 17 | ✅ | 20.1M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 38.5M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 14.3M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 30.8M | ⚠️ 12 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 69.7M | ⚠️ 1 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 38.0M | ⚠️ 7 fail | - | - |
| optional/format/time.json | 46 | ✅ | 8.3M | ⚠️ 28 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 93.2M | ✅ | 29.1M | 🟢 **-69%** |
| optional/format/uri-reference.json | 15 | ✅ | 11.9M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 20.5M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.4M | ⚠️ 17 fail | - | - |
| optional/id.json | 7 | ✅ | 27.3M | ⚠️ 7 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 28.0M | ⚠️ 6 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 37.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 21 | ✅ | 28.0M | ⚠️ 9 fail | - | - |
| allOf.json | 30 | ✅ | 31.7M | ⚠️ 15 fail | - | - |
| anchor.json | 8 | ✅ | 34.2M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 34.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 36.9M | ✅ | 210K | 🟢 **-99%** |
| const.json | 54 | ✅ | 22.2M | ⚠️ 7 fail | - | - |
| contains.json | 21 | ✅ | 22.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 45.1M | ✅ | 28.5M | 🟢 **-37%** |
| default.json | 7 | ✅ | 39.1M | ✅ | 564K | 🟢 **-99%** |
| defs.json | 2 | ✅ | 2.8M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 34.9M | ⚠️ 20 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 32.9M | ⚠️ 20 fail | - | - |
| enum.json | 45 | ✅ | 19.5M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 38.7M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 37.9M | ⚠️ 2 fail | - | - |
| format.json | 114 | ✅ | 47.1M | ✅ | 29.0M | 🟢 **-38%** |
| if-then-else.json | 26 | ✅ | 35.1M | ⚠️ 26 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 32.7M | ⚠️ 1 fail | - | - |
| items.json | 28 | ✅ | 29.6M | ⚠️ 6 fail | - | - |
| maxContains.json | 12 | ✅ | 31.0M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 42.4M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 40.7M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 33.3M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 41.9M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 31.0M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 42.7M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 36.1M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 34.1M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 36.3M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 37.6M | ⚠️ 3 fail | - | - |
| not.json | 40 | ✅ | 34.9M | ⚠️ 30 fail | - | - |
| oneOf.json | 27 | ✅ | 33.2M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 35.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 19.0M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 26.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.3M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 31 | ✅ | 8.7M | ⚠️ 14 fail | - | - |
| ref.json | 73 | ✅ | 21.4M | ⚠️ 54 fail | - | - |
| refRemote.json | 31 | ✅ | 30.1M | ⚠️ 29 fail | - | - |
| required.json | 9 | ✅ | 38.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 31.9M | ✅ | 91K | 🟢 **-100%** |
| unevaluatedItems.json | 51 | ✅ | 20.0M | ⚠️ 55 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.8M | ⚠️ 123 fail | - | - |
| uniqueItems.json | 69 | ✅ | 20.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 37.0M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 23.2M | ⚠️ 4 fail | - | - |
| optional/bignum.json | 9 | ✅ | 35.1M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 35.0M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 19.8M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 19.9M | ⚠️ 13 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.3M | ⚠️ 27 fail | - | - |
| optional/format/email.json | 17 | ✅ | 17.3M | ⚠️ 6 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 18.5M | ⚠️ 2 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 28.1M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.6M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 23.7M | ⚠️ 12 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 40.9M | ⚠️ 1 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.9M | ⚠️ 7 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.8M | ⚠️ 28 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 48.7M | ✅ | 29.9M | 🟢 **-39%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.9M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 17.2M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.8M | ⚠️ 17 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 14.4M | ⚠️ 8 fail | - | - |
| optional/id.json | 3 | ✅ | 19.1M | ⚠️ 3 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 39.4M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 21.7M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 34.5M | ⚠️ 6 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 28.0M | ⚠️ 9 fail | - | - |
| allOf.json | 30 | ✅ | 32.2M | ⚠️ 15 fail | - | - |
| anchor.json | 8 | ✅ | 31.9M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 35.8M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 36.2M | ✅ | 181K | 🟢 **-99%** |
| const.json | 54 | ✅ | 22.7M | ⚠️ 7 fail | - | - |
| contains.json | 21 | ✅ | 22.9M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 45.4M | ✅ | 28.5M | 🟢 **-37%** |
| default.json | 7 | ✅ | 38.8M | ✅ | 559K | 🟢 **-99%** |
| defs.json | 2 | ✅ | 3.5M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 35.8M | ⚠️ 20 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 33.1M | ⚠️ 20 fail | - | - |
| dynamicRef.json | 4 | ✅ | 11.8M | ⚠️ 41 fail | - | - |
| enum.json | 45 | ✅ | 19.5M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 38.6M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 38.1M | ⚠️ 2 fail | - | - |
| format.json | 133 | ✅ | 47.3M | ✅ | 29.0M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 37.7M | ⚠️ 26 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 32.8M | ⚠️ 1 fail | - | - |
| items.json | 29 | ✅ | 28.2M | ⚠️ 8 fail | - | - |
| maxContains.json | 12 | ✅ | 30.1M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 37.8M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 34.2M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 30.9M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 41.7M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 30.2M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 38.5M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 34.5M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 32.0M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 36.6M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 37.2M | ⚠️ 3 fail | - | - |
| not.json | 40 | ✅ | 33.7M | ⚠️ 30 fail | - | - |
| oneOf.json | 27 | ✅ | 33.4M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 37.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 19.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 11 | ✅ | 41.1M | ⚠️ 2 fail | - | - |
| properties.json | 21 | ✅ | 28.2M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 30.0M | ⚠️ 5 fail | - | - |
| ref.json | 71 | ✅ | 24.0M | ⚠️ 52 fail | - | - |
| refRemote.json | 31 | ✅ | 29.6M | ⚠️ 29 fail | - | - |
| required.json | 9 | ✅ | 39.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 33.1M | ✅ | 90K | 🟢 **-100%** |
| unevaluatedItems.json | 47 | ✅ | 24.2M | ⚠️ 70 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 15.2M | ⚠️ 124 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 34.3M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 22.5M | ⚠️ 4 fail | - | - |
| optional/bignum.json | 9 | ✅ | 37.0M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 34.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 20.0M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 19.9M | ⚠️ 13 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.3M | ⚠️ 27 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 17.9M | ⚠️ 2 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 25.5M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.7M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 23.8M | ⚠️ 12 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 41.1M | ⚠️ 1 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.8M | ⚠️ 7 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.8M | ⚠️ 28 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 47.3M | ✅ | 29.5M | 🟢 **-38%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.7M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 17.1M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.8M | ⚠️ 17 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 14.4M | ⚠️ 8 fail | - | - |
| optional/id.json | 3 | ✅ | 19.8M | ⚠️ 3 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 38.6M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 21.6M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 33.3M | ⚠️ 6 fail | - | - |

