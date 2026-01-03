# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test files where **both** validators pass **all** tests in that file. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Files where either validator fails any test are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 30.0M | ⚠️ 4/38 | 129 | 142K | 🟢 **-100%** |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 30.7M | ⚠️ 5/49 | 166 | 166K | 🟢 **-99%** |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 27.3M | ⚠️ 5/54 | 214 | 214K | 🟢 **-99%** |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 20.3M | ⚠️ 6/69 | 244 | 238K | 🟢 **-99%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 21.6M | ⚠️ 6/68 | 263 | 261K | 🟢 **-99%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 24.3M | ⚠️ 26/278 | 1016 | 206K | 🟢 **-99%** |

## Head-to-Head Performance

Comparison on test groups where both validators pass all tests:

**tjs vs zod**: 🟢 tjs is 238.73x faster (20 ns vs 4868 ns, 1020 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 61.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 16 | ✅ | 42.1M | ⚠️ 5 fail | - | - |
| allOf.json | 27 | ✅ | 47.5M | ⚠️ 15 fail | - | - |
| anyOf.json | 15 | ✅ | 54.9M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 62.1M | ✅ | 744K | 🟢 **-99%** |
| dependencies.json | 29 | ✅ | 38.1M | ⚠️ 13 fail | - | - |
| enum.json | 49 | ✅ | 25.4M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 76.9M | ✅ | 29.1M | 🟢 **-62%** |
| infinite-loop-detection.json | 2 | ✅ | 45.2M | ⚠️ 1 fail | - | - |
| items.json | 21 | ✅ | 36.0M | ⚠️ 8 fail | - | - |
| maxItems.json | 4 | ✅ | 74.0M | ⚠️ 1 fail | - | - |
| maxLength.json | 5 | ✅ | 62.7M | ⚠️ 1 fail | - | - |
| maxProperties.json | 8 | ✅ | 53.0M | ⚠️ 2 fail | - | - |
| maximum.json | 8 | ✅ | 70.4M | ⚠️ 4 fail | - | - |
| minItems.json | 4 | ✅ | 72.8M | ⚠️ 1 fail | - | - |
| minLength.json | 5 | ✅ | 58.5M | ⚠️ 2 fail | - | - |
| minProperties.json | 6 | ✅ | 60.2M | ⚠️ 1 fail | - | - |
| minimum.json | 11 | ✅ | 72.4M | ⚠️ 5 fail | - | - |
| multipleOf.json | 10 | ✅ | 68.4M | ⚠️ 3 fail | - | - |
| not.json | 20 | ✅ | 55.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 23 | ✅ | 47.5M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 56.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 18 | ✅ | 24.3M | ⚠️ 7 fail | - | - |
| properties.json | 17 | ✅ | 36.7M | ⚠️ 10 fail | - | - |
| ref.json | 26 | ✅ | 42.8M | ⚠️ 32 fail | - | - |
| refRemote.json | 6 | ✅ | 50.3M | ⚠️ 16 fail | - | - |
| required.json | 8 | ✅ | 66.5M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 54.5M | ✅ | 88K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 26.8M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 7 | ✅ | 66.4M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.2M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 24.4M | ⚠️ 13 fail | - | - |
| optional/format/email.json | 17 | ✅ | 21.0M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 41.7M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 14.4M | ⚠️ 23 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 84.7M | ✅ | 29.0M | 🟢 **-66%** |
| optional/format/uri.json | 36 | ✅ | 8.3M | ⚠️ 17 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 28.8M | ⚠️ 6 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 63.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 41.2M | ⚠️ 5 fail | - | - |
| allOf.json | 30 | ✅ | 49.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 18 | ✅ | 57.6M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 61.0M | ✅ | 214K | 🟢 **-100%** |
| const.json | 54 | ✅ | 30.4M | ⚠️ 7 fail | - | - |
| contains.json | 19 | ✅ | 30.3M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 63.1M | ✅ | 564K | 🟢 **-99%** |
| definitions.json | 2 | ✅ | 17.2M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 42.0M | ⚠️ 15 fail | - | - |
| enum.json | 45 | ✅ | 25.5M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 63.7M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 62.6M | ⚠️ 2 fail | - | - |
| format.json | 54 | ✅ | 77.8M | ✅ | 29.4M | 🟢 **-62%** |
| infinite-loop-detection.json | 2 | ✅ | 50.7M | ⚠️ 1 fail | - | - |
| items.json | 28 | ✅ | 39.8M | ⚠️ 10 fail | - | - |
| maxItems.json | 6 | ✅ | 60.3M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 51.1M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 47.2M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 70.2M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 60.7M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 49.7M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 50.7M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 71.5M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 66.3M | ⚠️ 3 fail | - | - |
| not.json | 38 | ✅ | 54.5M | ⚠️ 28 fail | - | - |
| oneOf.json | 27 | ✅ | 49.3M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 55.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 24.3M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 39.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 44.1M | ⚠️ 5 fail | - | - |
| ref.json | 65 | ✅ | 38.3M | ⚠️ 49 fail | - | - |
| refRemote.json | 23 | ✅ | 39.7M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 60.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 53.5M | ✅ | 89K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 25.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 60.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 22.5M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 22.6M | ⚠️ 13 fail | - | - |
| optional/format/email.json | 17 | ✅ | 20.2M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 39.8M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 14.4M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 32.4M | ⚠️ 12 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 28.6M | 🟢 **-56%** |
| optional/format/uri-reference.json | 15 | ✅ | 12.3M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 22.2M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.3M | ⚠️ 17 fail | - | - |
| optional/id.json | 7 | ✅ | 31.9M | ⚠️ 7 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 27.7M | ⚠️ 6 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 61.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 40.9M | ⚠️ 5 fail | - | - |
| allOf.json | 30 | ✅ | 48.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 18 | ✅ | 56.4M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 57.4M | ✅ | 207K | 🟢 **-100%** |
| const.json | 54 | ✅ | 30.8M | ⚠️ 7 fail | - | - |
| contains.json | 21 | ✅ | 32.1M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 63.0M | ✅ | 539K | 🟢 **-99%** |
| definitions.json | 2 | ✅ | 17.1M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 42.1M | ⚠️ 15 fail | - | - |
| enum.json | 45 | ✅ | 25.6M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 60.7M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 53.5M | ⚠️ 2 fail | - | - |
| format.json | 102 | ✅ | 76.1M | ✅ | 29.3M | 🟢 **-62%** |
| if-then-else.json | 26 | ✅ | 63.3M | ⚠️ 26 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 43.8M | ⚠️ 1 fail | - | - |
| items.json | 28 | ✅ | 39.8M | ⚠️ 10 fail | - | - |
| maxItems.json | 6 | ✅ | 60.3M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 51.4M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 47.0M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 70.3M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 60.2M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 49.6M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 50.1M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 71.9M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 66.8M | ⚠️ 3 fail | - | - |
| not.json | 38 | ✅ | 53.3M | ⚠️ 28 fail | - | - |
| oneOf.json | 27 | ✅ | 48.5M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 56.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 23.6M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 38.3M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 43.5M | ⚠️ 5 fail | - | - |
| ref.json | 73 | ✅ | 33.6M | ⚠️ 57 fail | - | - |
| refRemote.json | 23 | ✅ | 42.8M | ⚠️ 21 fail | - | - |
| required.json | 9 | ✅ | 66.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 53.7M | ✅ | 89K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 26.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 64.4M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 25.4M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 24.1M | ⚠️ 13 fail | - | - |
| optional/format/date.json | 48 | ✅ | 10.0M | ⚠️ 27 fail | - | - |
| optional/format/email.json | 17 | ✅ | 20.3M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 40.1M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 14.5M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 31.7M | ⚠️ 12 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 69.6M | ⚠️ 1 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.7M | ⚠️ 7 fail | - | - |
| optional/format/time.json | 46 | ✅ | 8.4M | ⚠️ 28 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 94.2M | ✅ | 29.6M | 🟢 **-69%** |
| optional/format/uri-reference.json | 15 | ✅ | 12.1M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 21.5M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.3M | ⚠️ 17 fail | - | - |
| optional/id.json | 7 | ✅ | 28.8M | ⚠️ 7 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 28.2M | ⚠️ 6 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 37.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 21 | ✅ | 28.3M | ⚠️ 9 fail | - | - |
| allOf.json | 30 | ✅ | 32.5M | ⚠️ 15 fail | - | - |
| anchor.json | 8 | ✅ | 35.1M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 35.8M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 37.5M | ✅ | 182K | 🟢 **-100%** |
| const.json | 54 | ✅ | 22.4M | ⚠️ 7 fail | - | - |
| contains.json | 21 | ✅ | 23.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 46.3M | ✅ | 29.0M | 🟢 **-37%** |
| default.json | 7 | ✅ | 39.9M | ✅ | 576K | 🟢 **-99%** |
| defs.json | 2 | ✅ | 2.7M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 35.2M | ⚠️ 20 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 32.7M | ⚠️ 20 fail | - | - |
| enum.json | 45 | ✅ | 18.7M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 37.6M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 37.3M | ⚠️ 2 fail | - | - |
| format.json | 114 | ✅ | 45.6M | ✅ | 27.9M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 35.8M | ⚠️ 26 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 31.5M | ⚠️ 1 fail | - | - |
| items.json | 28 | ✅ | 27.9M | ⚠️ 6 fail | - | - |
| maxContains.json | 12 | ✅ | 29.7M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 41.2M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 38.1M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 31.9M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 41.8M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 30.3M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 41.3M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 36.5M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 33.2M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 35.0M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 36.2M | ⚠️ 3 fail | - | - |
| not.json | 40 | ✅ | 32.7M | ⚠️ 30 fail | - | - |
| oneOf.json | 27 | ✅ | 31.6M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 36.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 18.7M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 26.0M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 29.5M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 31 | ✅ | 8.2M | ⚠️ 14 fail | - | - |
| ref.json | 73 | ✅ | 21.8M | ⚠️ 54 fail | - | - |
| refRemote.json | 31 | ✅ | 30.4M | ⚠️ 29 fail | - | - |
| required.json | 9 | ✅ | 39.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 33.3M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedItems.json | 51 | ✅ | 20.0M | ⚠️ 55 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.7M | ⚠️ 123 fail | - | - |
| uniqueItems.json | 69 | ✅ | 21.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 34.7M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 23.2M | ⚠️ 4 fail | - | - |
| optional/bignum.json | 9 | ✅ | 37.0M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 35.0M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 19.6M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 19.9M | ⚠️ 13 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.3M | ⚠️ 27 fail | - | - |
| optional/format/email.json | 17 | ✅ | 17.4M | ⚠️ 6 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 18.4M | ⚠️ 2 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 28.3M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.7M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 24.0M | ⚠️ 12 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 40.5M | ⚠️ 1 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.8M | ⚠️ 7 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.9M | ⚠️ 28 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 47.6M | ✅ | 29.5M | 🟢 **-38%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.9M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 17.3M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.7M | ⚠️ 17 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 14.4M | ⚠️ 8 fail | - | - |
| optional/id.json | 3 | ✅ | 19.8M | ⚠️ 3 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 39.7M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 22.0M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 34.5M | ⚠️ 6 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 28.2M | ⚠️ 9 fail | - | - |
| allOf.json | 30 | ✅ | 32.1M | ⚠️ 15 fail | - | - |
| anchor.json | 8 | ✅ | 32.9M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 35.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 36.1M | ✅ | 205K | 🟢 **-99%** |
| const.json | 54 | ✅ | 22.9M | ⚠️ 7 fail | - | - |
| contains.json | 21 | ✅ | 23.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 47.0M | ✅ | 29.1M | 🟢 **-38%** |
| default.json | 7 | ✅ | 40.0M | ✅ | 576K | 🟢 **-99%** |
| defs.json | 2 | ✅ | 3.5M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 35.6M | ⚠️ 20 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 33.4M | ⚠️ 20 fail | - | - |
| dynamicRef.json | 4 | ✅ | 11.6M | ⚠️ 41 fail | - | - |
| enum.json | 45 | ✅ | 19.5M | ⚠️ 11 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 38.1M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 38.4M | ⚠️ 2 fail | - | - |
| format.json | 133 | ✅ | 47.4M | ✅ | 28.9M | 🟢 **-39%** |
| if-then-else.json | 26 | ✅ | 37.7M | ⚠️ 26 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 35.4M | ⚠️ 1 fail | - | - |
| items.json | 29 | ✅ | 28.9M | ⚠️ 8 fail | - | - |
| maxContains.json | 12 | ✅ | 30.0M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 39.1M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 34.7M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 31.4M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 38.9M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 31.0M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 37.3M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 32.9M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 32.1M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 36.8M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 37.8M | ⚠️ 3 fail | - | - |
| not.json | 40 | ✅ | 33.7M | ⚠️ 30 fail | - | - |
| oneOf.json | 27 | ✅ | 33.1M | ⚠️ 9 fail | - | - |
| pattern.json | 9 | ✅ | 36.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 19.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 11 | ✅ | 41.6M | ⚠️ 2 fail | - | - |
| properties.json | 21 | ✅ | 27.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 20 | ✅ | 31.2M | ⚠️ 5 fail | - | - |
| ref.json | 71 | ✅ | 23.7M | ⚠️ 52 fail | - | - |
| refRemote.json | 31 | ✅ | 30.5M | ⚠️ 29 fail | - | - |
| required.json | 9 | ✅ | 40.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 32.8M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedItems.json | 47 | ✅ | 24.9M | ⚠️ 70 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 15.7M | ⚠️ 124 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.3M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 37.6M | ⚠️ 1 fail | - | - |
| optional/anchor.json | 4 | ✅ | 23.2M | ⚠️ 4 fail | - | - |
| optional/bignum.json | 9 | ✅ | 37.5M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 34.8M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 20.0M | ⚠️ 18 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 19.9M | ⚠️ 13 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.3M | ⚠️ 27 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 18.4M | ⚠️ 2 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 26.1M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.7M | ⚠️ 23 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 23.6M | ⚠️ 12 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 40.0M | ⚠️ 1 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 26.7M | ⚠️ 7 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.8M | ⚠️ 28 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 47.7M | ✅ | 29.3M | 🟢 **-38%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.8M | ⚠️ 4 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 17.3M | ⚠️ 1 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.7M | ⚠️ 17 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 14.5M | ⚠️ 8 fail | - | - |
| optional/id.json | 3 | ✅ | 19.6M | ⚠️ 3 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 38.6M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 21.7M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 32.7M | ⚠️ 6 fail | - | - |

