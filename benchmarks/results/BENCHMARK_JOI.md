# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 790 | ✅ 38 | 790 | 27.5M | ⚠️ 0/38 | 0 | - | - |
| draft6 | 49 | 1120 | ✅ 49 | 1120 | 28.2M | ⚠️ 0/49 | 0 | - | - |
| draft7 | 54 | 1324 | ✅ 54 | 1324 | 25.2M | ⚠️ 0/54 | 0 | - | - |
| draft2019-09 | 69 | 1703 | ✅ 69 | 1703 | 19.2M | ⚠️ 1/69 | 18 | 6.2M | 🟢 **-68%** |
| draft2020-12 | 68 | 1665 | ✅ 68 | 1665 | 20.1M | ⚠️ 1/68 | 18 | 6.3M | 🟢 **-69%** |
| **Total** | 278 | 6602 | ✅ 278 | 6602 | 22.6M | ⚠️ 2/278 | 36 | 6.2M | 🟢 **-72%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 6.70x faster (24 ns vs 161 ns, 36 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 59.5M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 16 | ✅ | 37.2M | ⚠️ 13 fail | - | - |
| allOf.json | 27 | ✅ | 41.7M | ⚠️ 21 fail | - | - |
| anyOf.json | 15 | ✅ | 48.9M | ⚠️ 13 fail | - | - |
| default.json | 7 | ✅ | 51.8M | ⚠️ 7 fail | - | - |
| dependencies.json | 29 | ✅ | 34.3M | ⚠️ 15 fail | - | - |
| enum.json | 49 | ✅ | 23.8M | ⚠️ 23 fail | - | - |
| format.json | 36 | ✅ | 66.3M | ⚠️ 36 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 43.1M | ⚠️ 2 fail | - | - |
| items.json | 21 | ✅ | 32.6M | ⚠️ 11 fail | - | - |
| maxItems.json | 4 | ✅ | 65.4M | ⚠️ 1 fail | - | - |
| maxLength.json | 5 | ✅ | 52.9M | ⚠️ 1 fail | - | - |
| maxProperties.json | 8 | ✅ | 46.0M | ⚠️ 2 fail | - | - |
| maximum.json | 8 | ✅ | 61.7M | ⚠️ 4 fail | - | - |
| minItems.json | 4 | ✅ | 64.1M | ⚠️ 1 fail | - | - |
| minLength.json | 5 | ✅ | 50.9M | ⚠️ 2 fail | - | - |
| minProperties.json | 6 | ✅ | 51.4M | ⚠️ 1 fail | - | - |
| minimum.json | 11 | ✅ | 62.3M | ⚠️ 5 fail | - | - |
| multipleOf.json | 10 | ✅ | 59.5M | ⚠️ 5 fail | - | - |
| not.json | 20 | ✅ | 47.7M | ⚠️ 20 fail | - | - |
| oneOf.json | 23 | ✅ | 41.9M | ⚠️ 21 fail | - | - |
| pattern.json | 9 | ✅ | 50.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 18 | ✅ | 22.6M | ⚠️ 7 fail | - | - |
| properties.json | 17 | ✅ | 33.0M | ⚠️ 24 fail | - | - |
| ref.json | 26 | ✅ | 36.9M | ⚠️ 42 fail | - | - |
| refRemote.json | 6 | ✅ | 43.9M | ⚠️ 16 fail | - | - |
| required.json | 8 | ✅ | 55.1M | ⚠️ 11 fail | - | - |
| type.json | 79 | ✅ | 46.0M | ⚠️ 59 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 7 | ✅ | 56.8M | ⚠️ 7 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 23.1M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 22.2M | ⚠️ 9 fail | - | - |
| optional/format/email.json | 17 | ✅ | 19.3M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 36.0M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 13.8M | ⚠️ 7 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 73.5M | ⚠️ 7 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.2M | ⚠️ 7 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 26.1M | ⚠️ 6 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 54.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 36.9M | ⚠️ 13 fail | - | - |
| allOf.json | 30 | ✅ | 41.6M | ⚠️ 23 fail | - | - |
| anyOf.json | 18 | ✅ | 49.1M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 50.6M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 28.2M | ⚠️ 32 fail | - | - |
| contains.json | 19 | ✅ | 17.4M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 51.8M | ⚠️ 7 fail | - | - |
| definitions.json | 2 | ✅ | 16.7M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 36.6M | ⚠️ 17 fail | - | - |
| enum.json | 45 | ✅ | 23.5M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 54.5M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 54.1M | ⚠️ 2 fail | - | - |
| format.json | 54 | ✅ | 65.8M | ⚠️ 54 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 39.1M | ⚠️ 2 fail | - | - |
| items.json | 28 | ✅ | 36.1M | ⚠️ 13 fail | - | - |
| maxItems.json | 6 | ✅ | 50.6M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 43.5M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 40.0M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 61.6M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 50.9M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 42.5M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 43.1M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 62.7M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 57.8M | ⚠️ 5 fail | - | - |
| not.json | 38 | ✅ | 47.0M | ⚠️ 29 fail | - | - |
| oneOf.json | 27 | ✅ | 42.8M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 42.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 22.0M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 34.8M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 38.9M | ⚠️ 5 fail | - | - |
| ref.json | 65 | ✅ | 33.9M | ⚠️ 65 fail | - | - |
| refRemote.json | 23 | ✅ | 38.1M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 54.9M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 45.8M | ⚠️ 60 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 55.5M | ⚠️ 7 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 23.4M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 22.0M | ⚠️ 9 fail | - | - |
| optional/format/email.json | 17 | ✅ | 19.4M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 34.6M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 13.8M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 29.4M | ⚠️ 38 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 68.5M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 11.7M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 20.4M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.3M | ⚠️ 7 fail | - | - |
| optional/id.json | 7 | ✅ | 30.3M | ⚠️ 6 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 25.6M | ⚠️ 6 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 53.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 16 | ✅ | 37.0M | ⚠️ 13 fail | - | - |
| allOf.json | 30 | ✅ | 41.3M | ⚠️ 23 fail | - | - |
| anyOf.json | 18 | ✅ | 49.1M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 48.8M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 28.2M | ⚠️ 32 fail | - | - |
| contains.json | 21 | ✅ | 26.9M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 51.8M | ⚠️ 7 fail | - | - |
| definitions.json | 2 | ✅ | 16.7M | ⚠️ 2 fail | - | - |
| dependencies.json | 36 | ✅ | 36.9M | ⚠️ 17 fail | - | - |
| enum.json | 45 | ✅ | 23.6M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 55.6M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 54.3M | ⚠️ 2 fail | - | - |
| format.json | 102 | ✅ | 65.5M | ⚠️ 102 fail | - | - |
| if-then-else.json | 26 | ✅ | 55.1M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 40.6M | ⚠️ 2 fail | - | - |
| items.json | 28 | ✅ | 35.5M | ⚠️ 13 fail | - | - |
| maxItems.json | 6 | ✅ | 50.7M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 43.5M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 40.4M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 61.6M | ⚠️ 2 fail | - | - |
| minItems.json | 6 | ✅ | 50.4M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 41.8M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 43.5M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 61.9M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 58.6M | ⚠️ 5 fail | - | - |
| not.json | 38 | ✅ | 45.3M | ⚠️ 29 fail | - | - |
| oneOf.json | 27 | ✅ | 43.2M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 50.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 21.7M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 34.4M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 38.5M | ⚠️ 5 fail | - | - |
| ref.json | 73 | ✅ | 33.9M | ⚠️ 73 fail | - | - |
| refRemote.json | 23 | ✅ | 38.1M | ⚠️ 22 fail | - | - |
| required.json | 9 | ✅ | 54.4M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 45.2M | ⚠️ 60 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 9 | ✅ | 53.6M | ⚠️ 7 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 23.0M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 22.0M | ⚠️ 9 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.6M | ⚠️ 14 fail | - | - |
| optional/format/email.json | 17 | ✅ | 19.3M | ⚠️ 6 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 34.7M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 13.8M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 28.5M | ⚠️ 38 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 54.3M | ⚠️ 8 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 33.9M | ⚠️ 18 fail | - | - |
| optional/format/time.json | 46 | ✅ | 8.1M | ⚠️ 16 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 72.1M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 11.6M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 20.1M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 8.3M | ⚠️ 7 fail | - | - |
| optional/id.json | 7 | ✅ | 26.1M | ⚠️ 4 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 25.5M | ⚠️ 6 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 34.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 21 | ✅ | 26.0M | ⚠️ 17 fail | - | - |
| allOf.json | 30 | ✅ | 29.8M | ⚠️ 23 fail | - | - |
| anchor.json | 8 | ✅ | 31.5M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 32.2M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 33.8M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 21.1M | ⚠️ 32 fail | - | - |
| contains.json | 21 | ✅ | 20.8M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 41.5M | ✅ | 6.2M | 🟢 **-85%** |
| default.json | 7 | ✅ | 35.1M | ⚠️ 7 fail | - | - |
| defs.json | 2 | ✅ | 2.8M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 31.5M | ⚠️ 6 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 30.1M | ⚠️ 12 fail | - | - |
| enum.json | 45 | ✅ | 18.1M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 34.6M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 34.1M | ⚠️ 2 fail | - | - |
| format.json | 114 | ✅ | 41.6M | ⚠️ 114 fail | - | - |
| if-then-else.json | 26 | ✅ | 33.8M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 29.7M | ⚠️ 2 fail | - | - |
| items.json | 28 | ✅ | 27.3M | ⚠️ 13 fail | - | - |
| maxContains.json | 12 | ✅ | 28.1M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 37.0M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 33.9M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 30.5M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 38.2M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 27.9M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 36.4M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 32.4M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 30.9M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 32.7M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 33.7M | ⚠️ 5 fail | - | - |
| not.json | 40 | ✅ | 31.0M | ⚠️ 31 fail | - | - |
| oneOf.json | 27 | ✅ | 29.7M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 32.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 18.3M | ⚠️ 10 fail | - | - |
| properties.json | 21 | ✅ | 25.4M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 31 | ✅ | 8.3M | ⚠️ 32 fail | - | - |
| ref.json | 73 | ✅ | 19.4M | ⚠️ 76 fail | - | - |
| refRemote.json | 31 | ✅ | 27.7M | ⚠️ 30 fail | - | - |
| required.json | 9 | ✅ | 34.5M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 29.8M | ⚠️ 60 fail | - | - |
| unevaluatedItems.json | 51 | ✅ | 18.8M | ⚠️ 23 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 13.8M | ⚠️ 114 fail | - | - |
| uniqueItems.json | 69 | ✅ | 19.6M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 33.5M | ⚠️ 5 fail | - | - |
| optional/anchor.json | 4 | ✅ | 21.5M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 32.2M | ⚠️ 7 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 31.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 18.9M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 18.5M | ⚠️ 9 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.0M | ⚠️ 14 fail | - | - |
| optional/format/email.json | 17 | ✅ | 15.8M | ⚠️ 6 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 26.0M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.1M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 21.9M | ⚠️ 38 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 36.1M | ⚠️ 8 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 24.7M | ⚠️ 18 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.6M | ⚠️ 16 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 42.5M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 10.5M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.7M | ⚠️ 7 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 13.7M | ⚠️ 13 fail | - | - |
| optional/id.json | 3 | ✅ | 18.3M | ⚠️ 2 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 34.9M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 20.4M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 30.9M | ⚠️ 10 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 25.8M | ⚠️ 17 fail | - | - |
| allOf.json | 30 | ✅ | 29.2M | ⚠️ 23 fail | - | - |
| anchor.json | 8 | ✅ | 29.0M | ⚠️ 8 fail | - | - |
| anyOf.json | 18 | ✅ | 31.8M | ⚠️ 14 fail | - | - |
| boolean_schema.json | 18 | ✅ | 32.1M | ⚠️ 18 fail | - | - |
| const.json | 54 | ✅ | 21.2M | ⚠️ 32 fail | - | - |
| contains.json | 21 | ✅ | 20.7M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 41.8M | ✅ | 6.3M | 🟢 **-85%** |
| default.json | 7 | ✅ | 35.1M | ⚠️ 7 fail | - | - |
| defs.json | 2 | ✅ | 3.4M | ⚠️ 2 fail | - | - |
| dependentRequired.json | 20 | ✅ | 31.6M | ⚠️ 6 fail | - | - |
| dependentSchemas.json | 20 | ✅ | 29.8M | ⚠️ 12 fail | - | - |
| dynamicRef.json | 4 | ✅ | 11.4M | ⚠️ 41 fail | - | - |
| enum.json | 45 | ✅ | 18.0M | ⚠️ 23 fail | - | - |
| exclusiveMaximum.json | 4 | ✅ | 33.1M | ⚠️ 2 fail | - | - |
| exclusiveMinimum.json | 4 | ✅ | 33.9M | ⚠️ 2 fail | - | - |
| format.json | 133 | ✅ | 42.2M | ⚠️ 132 fail | - | - |
| if-then-else.json | 26 | ✅ | 33.5M | ⚠️ 8 fail | - | - |
| infinite-loop-detection.json | 2 | ✅ | 29.7M | ⚠️ 2 fail | - | - |
| items.json | 29 | ✅ | 26.4M | ⚠️ 15 fail | - | - |
| maxContains.json | 12 | ✅ | 26.8M | ⚠️ 6 fail | - | - |
| maxItems.json | 6 | ✅ | 34.5M | ⚠️ 2 fail | - | - |
| maxLength.json | 7 | ✅ | 30.7M | ⚠️ 2 fail | - | - |
| maxProperties.json | 10 | ✅ | 28.3M | ⚠️ 3 fail | - | - |
| maximum.json | 8 | ✅ | 34.6M | ⚠️ 2 fail | - | - |
| minContains.json | 28 | ✅ | 27.6M | ⚠️ 14 fail | - | - |
| minItems.json | 6 | ✅ | 34.5M | ⚠️ 2 fail | - | - |
| minLength.json | 7 | ✅ | 31.2M | ⚠️ 3 fail | - | - |
| minProperties.json | 8 | ✅ | 30.8M | ⚠️ 2 fail | - | - |
| minimum.json | 11 | ✅ | 33.1M | ⚠️ 3 fail | - | - |
| multipleOf.json | 10 | ✅ | 33.5M | ⚠️ 5 fail | - | - |
| not.json | 40 | ✅ | 30.0M | ⚠️ 31 fail | - | - |
| oneOf.json | 27 | ✅ | 29.7M | ⚠️ 22 fail | - | - |
| pattern.json | 9 | ✅ | 32.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 23 | ✅ | 18.3M | ⚠️ 10 fail | - | - |
| prefixItems.json | 11 | ✅ | 35.8M | ⚠️ 2 fail | - | - |
| properties.json | 21 | ✅ | 25.4M | ⚠️ 28 fail | - | - |
| propertyNames.json | 20 | ✅ | 28.0M | ⚠️ 5 fail | - | - |
| ref.json | 71 | ✅ | 21.5M | ⚠️ 74 fail | - | - |
| refRemote.json | 31 | ✅ | 27.6M | ⚠️ 30 fail | - | - |
| required.json | 9 | ✅ | 34.5M | ⚠️ 12 fail | - | - |
| type.json | 80 | ✅ | 29.1M | ⚠️ 60 fail | - | - |
| unevaluatedItems.json | 47 | ✅ | 23.0M | ⚠️ 31 fail | - | - |
| unevaluatedProperties.json | 117 | ✅ | 14.6M | ⚠️ 102 fail | - | - |
| uniqueItems.json | 69 | ✅ | 21.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 31.4M | ⚠️ 5 fail | - | - |
| optional/anchor.json | 4 | ✅ | 21.4M | ⚠️ 3 fail | - | - |
| optional/bignum.json | 9 | ✅ | 33.1M | ⚠️ 7 fail | - | - |
| optional/dependencies-compatibility.json | 36 | ✅ | 31.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 74 | ✅ | 18.9M | ⚠️ 66 fail | - | - |
| optional/format/date-time.json | 26 | ✅ | 18.5M | ⚠️ 9 fail | - | - |
| optional/format/date.json | 48 | ✅ | 9.0M | ⚠️ 14 fail | - | - |
| optional/format/idn-email.json | 10 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| optional/format/ipv4.json | 16 | ✅ | 24.1M | ⚠️ 8 fail | - | - |
| optional/format/ipv6.json | 40 | ✅ | 12.1M | ⚠️ 7 fail | - | - |
| optional/format/json-pointer.json | 38 | ✅ | 22.0M | ⚠️ 38 fail | - | - |
| optional/format/regex.json | 8 | ✅ | 35.4M | ⚠️ 8 fail | - | - |
| optional/format/relative-json-pointer.json | 18 | ✅ | 24.4M | ⚠️ 18 fail | - | - |
| optional/format/time.json | 46 | ✅ | 7.6M | ⚠️ 16 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 42.5M | ⚠️ 7 fail | - | - |
| optional/format/uri-reference.json | 15 | ✅ | 10.4M | ⚠️ 15 fail | - | - |
| optional/format/uri-template.json | 10 | ✅ | 16.2M | ⚠️ 10 fail | - | - |
| optional/format/uri.json | 36 | ✅ | 7.7M | ⚠️ 7 fail | - | - |
| optional/format/uuid.json | 22 | ✅ | 13.6M | ⚠️ 13 fail | - | - |
| optional/id.json | 3 | ✅ | 17.8M | ⚠️ 2 fail | - | - |
| optional/no-schema.json | 3 | ✅ | 34.4M | ⚠️ 1 fail | - | - |
| optional/non-bmp-regex.json | 12 | ✅ | 19.7M | ⚠️ 6 fail | - | - |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 28.8M | ⚠️ 10 fail | - | - |

