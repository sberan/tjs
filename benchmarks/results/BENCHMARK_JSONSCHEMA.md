# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | jsonschema files | jsonschema tests | jsonschema ops/s | tjs vs jsonschema |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 34 | 714 | ✅ 34 | 714 | 30.4M | ⚠️ 33/34 | 671 | 106K | 🟢 **-100%** |
| draft6 | 43 | 973 | ✅ 43 | 973 | 29.4M | ⚠️ 42/43 | 919 | 126K | 🟢 **-100%** |
| draft7 | 47 | 1082 | ✅ 47 | 1082 | 31.5M | ⚠️ 46/47 | 1026 | 114K | 🟢 **-100%** |
| draft2019-09 | 56 | 1180 | ✅ 56 | 1180 | 32.2M | ⚠️ 47/56 | 1048 | 134K | 🟢 **-100%** |
| draft2020-12 | 55 | 1037 | ✅ 55 | 1037 | 30.1M | ⚠️ 43/55 | 805 | 140K | 🟢 **-100%** |
| **Total** | 235 | 4986 | ✅ 235 | 4986 | 30.8M | ⚠️ 211/235 | 4469 | 124K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs jsonschema**: 🟢 tjs is 268.74x faster (32 ns vs 8734 ns, 4986 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 31.9M | ✅ | 71K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 26.4M | ✅ | 68K | 🟢 **-100%** |
| allOf.json | 27 | ✅ | 41.1M | ✅ | 59K | 🟢 **-100%** |
| anyOf.json | 15 | ✅ | 45.5M | ✅ | 84K | 🟢 **-100%** |
| default.json | 7 | ✅ | 48.0M | ✅ | 65K | 🟢 **-100%** |
| dependencies.json | 29 | ✅ | 29.6M | ✅ | 66K | 🟢 **-100%** |
| enum.json | 49 | ✅ | 35.4M | ✅ | 91K | 🟢 **-100%** |
| format.json | 36 | ✅ | 49.1M | ✅ | 227K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 36.3M | ✅ | 38K | 🟢 **-100%** |
| items.json | 21 | ✅ | 24.3M | ✅ | 30K | 🟢 **-100%** |
| maxItems.json | 4 | ✅ | 66.1M | ✅ | 255K | 🟢 **-100%** |
| maxLength.json | 5 | ✅ | 52.0M | ✅ | 249K | 🟢 **-100%** |
| maxProperties.json | 8 | ✅ | 46.0M | ✅ | 254K | 🟢 **-99%** |
| maximum.json | 14 | ✅ | 56.7M | ✅ | 255K | 🟢 **-100%** |
| minItems.json | 4 | ✅ | 65.8M | ✅ | 254K | 🟢 **-100%** |
| minLength.json | 5 | ✅ | 51.1M | ✅ | 248K | 🟢 **-100%** |
| minProperties.json | 6 | ✅ | 51.0M | ✅ | 254K | 🟢 **-100%** |
| minimum.json | 17 | ✅ | 57.1M | ✅ | 256K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 57.7M | ✅ | 214K | 🟢 **-100%** |
| not.json | 20 | ✅ | 60.5M | ✅ | 114K | 🟢 **-100%** |
| oneOf.json | 23 | ✅ | 49.7M | ✅ | 65K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 41.0M | ✅ | 249K | 🟢 **-99%** |
| patternProperties.json | 18 | ✅ | 15.0M | ✅ | 83K | 🟢 **-99%** |
| properties.json | 24 | ✅ | 22.8M | ✅ | 50K | 🟢 **-100%** |
| ref.json | 43 | ✅ | 29.4M | ⚠️ 2 fail | - | - |
| required.json | 15 | ✅ | 34.5M | ✅ | 135K | 🟢 **-100%** |
| type.json | 79 | ✅ | 63.4M | ✅ | 231K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 132K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 56.1M | ✅ | 242K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 15.8M | ✅ | 185K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 244K | 🟢 **-99%** |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 253K | 🟢 **-100%** |
| optional/id.json | 3 | ✅ | 34.6M | ✅ | 50K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.8M | ✅ | 140K | 🟢 **-99%** |

### draft6

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.7M | ✅ | 74K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 24.9M | ✅ | 75K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 37.9M | ✅ | 70K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 49.9M | ✅ | 83K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 53.5M | ✅ | 557K | 🟢 **-99%** |
| const.json | 54 | ✅ | 53.7M | ✅ | 126K | 🟢 **-100%** |
| contains.json | 19 | ✅ | 46.7M | ✅ | 83K | 🟢 **-100%** |
| default.json | 7 | ✅ | 43.7M | ✅ | 97K | 🟢 **-100%** |
| dependencies.json | 36 | ✅ | 26.8M | ✅ | 80K | 🟢 **-100%** |
| enum.json | 45 | ✅ | 36.1M | ✅ | 138K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 51.1M | ✅ | 258K | 🟢 **-99%** |
| exclusiveMinimum.json | 4 | ✅ | 58.1M | ✅ | 260K | 🟢 **-100%** |
| format.json | 54 | ✅ | 56.9M | ✅ | 267K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 31.7M | ✅ | 40K | 🟢 **-100%** |
| items.json | 28 | ✅ | 25.6M | ✅ | 39K | 🟢 **-100%** |
| maxItems.json | 6 | ✅ | 57.0M | ✅ | 262K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 49.0M | ✅ | 259K | 🟢 **-99%** |
| maxProperties.json | 10 | ✅ | 41.5M | ✅ | 263K | 🟢 **-99%** |
| maximum.json | 8 | ✅ | 57.8M | ✅ | 262K | 🟢 **-100%** |
| minItems.json | 6 | ✅ | 55.9M | ✅ | 263K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 44.7M | ✅ | 261K | 🟢 **-99%** |
| minProperties.json | 8 | ✅ | 44.2M | ✅ | 232K | 🟢 **-99%** |
| minimum.json | 11 | ✅ | 56.3M | ✅ | 267K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 53.6M | ✅ | 225K | 🟢 **-100%** |
| not.json | 38 | ✅ | 54.7M | ✅ | 170K | 🟢 **-100%** |
| oneOf.json | 27 | ✅ | 48.1M | ✅ | 84K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 41.1M | ✅ | 263K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 14.8M | ✅ | 97K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 21.6M | ✅ | 60K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 28.0M | ✅ | 168K | 🟢 **-99%** |
| ref.json | 54 | ✅ | 21.2M | ⚠️ 16 fail | - | - |
| required.json | 16 | ✅ | 26.8M | ✅ | 138K | 🟢 **-99%** |
| type.json | 80 | ✅ | 53.7M | ✅ | 239K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 21.2M | ✅ | 136K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 47.8M | ✅ | 256K | 🟢 **-99%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.4M | ✅ | 218K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 17.5M | ✅ | 249K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.2M | ✅ | 253K | 🟢 **-99%** |
| optional/format/unknown.json | 7 | ✅ | 54.6M | ✅ | 264K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.9M | ✅ | 221K | 🟢 **-98%** |
| optional/id.json | 7 | ✅ | 35.6M | ✅ | 48K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 19.5M | ✅ | 156K | 🟢 **-99%** |
| optional/unknownKeyword.json | 3 | ✅ | 9.5M | ✅ | 33K | 🟢 **-100%** |

### draft7

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 48.7M | ✅ | 35K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 28.9M | ✅ | 77K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 40.1M | ✅ | 37K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 50.2M | ✅ | 92K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 54.6M | ✅ | 546K | 🟢 **-99%** |
| const.json | 54 | ✅ | 53.5M | ✅ | 214K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 49.6M | ✅ | 51K | 🟢 **-100%** |
| default.json | 7 | ✅ | 46.8M | ✅ | 97K | 🟢 **-100%** |
| dependencies.json | 36 | ✅ | 30.3M | ✅ | 41K | 🟢 **-100%** |
| enum.json | 45 | ✅ | 34.2M | ✅ | 147K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 53.4M | ✅ | 250K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 55.0M | ✅ | 251K | 🟢 **-100%** |
| format.json | 102 | ✅ | 46.1M | ✅ | 255K | 🟢 **-99%** |
| if-then-else.json | 26 | ✅ | 55.9M | ✅ | 155K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 35.7M | ✅ | 38K | 🟢 **-100%** |
| items.json | 28 | ✅ | 28.6M | ✅ | 38K | 🟢 **-100%** |
| maxItems.json | 6 | ✅ | 56.7M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 49.4M | ✅ | 248K | 🟢 **-99%** |
| maxProperties.json | 10 | ✅ | 44.4M | ✅ | 252K | 🟢 **-99%** |
| maximum.json | 8 | ✅ | 58.6M | ✅ | 252K | 🟢 **-100%** |
| minItems.json | 6 | ✅ | 58.0M | ✅ | 254K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 48.8M | ✅ | 246K | 🟢 **-99%** |
| minProperties.json | 8 | ✅ | 46.2M | ✅ | 252K | 🟢 **-99%** |
| minimum.json | 11 | ✅ | 58.1M | ✅ | 257K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 55.8M | ✅ | 213K | 🟢 **-100%** |
| not.json | 38 | ✅ | 60.4M | ✅ | 160K | 🟢 **-100%** |
| oneOf.json | 27 | ✅ | 48.8M | ✅ | 81K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 40.1M | ✅ | 249K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 14.5M | ✅ | 92K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 24.6M | ✅ | 58K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 30.3M | ✅ | 167K | 🟢 **-99%** |
| ref.json | 56 | ✅ | 22.7M | ⚠️ 22 fail | - | - |
| required.json | 16 | ✅ | 35.1M | ✅ | 131K | 🟢 **-100%** |
| type.json | 80 | ✅ | 59.7M | ✅ | 229K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 23.0M | ✅ | 131K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 55.3M | ✅ | 243K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.5M | ✅ | 204K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 17.7M | ✅ | 243K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 17.0M | ✅ | 248K | 🟢 **-99%** |
| optional/format/iri-reference.json | 13 | ✅ | 29.5M | ✅ | 237K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.7M | ✅ | 246K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 58.1M | ✅ | 178K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 65.4M | ✅ | 254K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 226K | 🟢 **-98%** |
| optional/id.json | 7 | ✅ | 42.9M | ✅ | 63K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.8M | ✅ | 150K | 🟢 **-99%** |
| optional/unknownKeyword.json | 3 | ✅ | 13.4M | ✅ | 35K | 🟢 **-100%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 48.2M | ✅ | 75K | 🟢 **-100%** |
| additionalProperties.json | 21 | ✅ | 24.3M | ✅ | 76K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 45.5M | ✅ | 70K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 51.5M | ✅ | 92K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 55.6M | ✅ | 551K | 🟢 **-99%** |
| const.json | 54 | ✅ | 53.1M | ✅ | 228K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 51.1M | ✅ | 86K | 🟢 **-100%** |
| content.json | 18 | ✅ | 66.1M | ✅ | 231K | 🟢 **-100%** |
| default.json | 7 | ✅ | 46.9M | ✅ | 108K | 🟢 **-100%** |
| dependentRequired.json | 3 | ✅ | 73.9M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 36.3M | ✅ | 176K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 60.0M | ✅ | 250K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 60.3M | ✅ | 249K | 🟢 **-100%** |
| format.json | 114 | ✅ | 67.3M | ✅ | 223K | 🟢 **-100%** |
| if-then-else.json | 26 | ✅ | 53.5M | ✅ | 145K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 38.4M | ✅ | 34K | 🟢 **-100%** |
| items.json | 28 | ✅ | 27.2M | ✅ | 35K | 🟢 **-100%** |
| maxContains.json | 2 | ✅ | 76.5M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 59.4M | ✅ | 251K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 51.1M | ✅ | 246K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 45.3M | ✅ | 249K | 🟢 **-99%** |
| maximum.json | 8 | ✅ | 61.0M | ✅ | 250K | 🟢 **-100%** |
| minContains.json | 7 | ✅ | 59.9M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 59.6M | ✅ | 249K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 51.0M | ✅ | 245K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 47.7M | ✅ | 251K | 🟢 **-99%** |
| minimum.json | 11 | ✅ | 66.1M | ✅ | 250K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 58.1M | ✅ | 217K | 🟢 **-100%** |
| not.json | 38 | ✅ | 63.6M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 49.0M | ✅ | 78K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 41.9M | ✅ | 247K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 16.0M | ✅ | 90K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 23.5M | ✅ | 58K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 27.8M | ✅ | 162K | 🟢 **-99%** |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 12 fail | - | - |
| ref.json | 33 | ✅ | 33.3M | ⚠️ 46 fail | - | - |
| required.json | 16 | ✅ | 36.1M | ✅ | 149K | 🟢 **-100%** |
| type.json | 80 | ✅ | 61.8M | ✅ | 230K | 🟢 **-100%** |
| unevaluatedItems.json | 15 | ✅ | 47.6M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 30.1M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.1M | ✅ | 121K | 🟢 **-99%** |
| vocabulary.json | 2 | ✅ | 63.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 53.9M | ✅ | 247K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 43.2M | ✅ | 99K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.7M | ✅ | 203K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 242K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 16.4M | ✅ | 246K | 🟢 **-98%** |
| optional/format/iri-reference.json | 13 | ✅ | 30.2M | ✅ | 236K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.8M | ✅ | 245K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 59.5M | ✅ | 175K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 253K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 220K | 🟢 **-98%** |
| optional/format/uuid.json | 22 | ✅ | 14.6M | ✅ | 241K | 🟢 **-98%** |
| optional/no-schema.json | 3 | ✅ | 54.9M | ✅ | 249K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.2M | ✅ | 151K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 43.2M | ✅ | 63K | 🟢 **-100%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 25.8M | ✅ | 70K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 39.2M | ✅ | 69K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 46.3M | ✅ | 91K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 50.3M | ✅ | 555K | 🟢 **-99%** |
| const.json | 54 | ✅ | 45.0M | ✅ | 236K | 🟢 **-99%** |
| contains.json | 21 | ✅ | 46.4M | ✅ | 74K | 🟢 **-100%** |
| content.json | 18 | ✅ | 60.1M | ✅ | 231K | 🟢 **-100%** |
| default.json | 7 | ✅ | 43.6M | ✅ | 111K | 🟢 **-100%** |
| dependentRequired.json | 3 | ✅ | 57.4M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 32.1M | ✅ | 163K | 🟢 **-99%** |
| exclusiveMaximum.json | 4 | ✅ | 47.8M | ✅ | 247K | 🟢 **-99%** |
| exclusiveMinimum.json | 4 | ✅ | 51.3M | ✅ | 250K | 🟢 **-100%** |
| format.json | 28 | ✅ | 61.7M | ⚠️ 15 fail | - | - |
| if-then-else.json | 26 | ✅ | 53.8M | ✅ | 126K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 34.5M | ✅ | 33K | 🟢 **-100%** |
| items.json | 14 | ✅ | 24.1M | ⚠️ 7 fail | - | - |
| maxContains.json | 2 | ✅ | 63.0M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 53.0M | ✅ | 251K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 45.3M | ✅ | 245K | 🟢 **-99%** |
| maxProperties.json | 10 | ✅ | 39.6M | ✅ | 251K | 🟢 **-99%** |
| maximum.json | 8 | ✅ | 52.5M | ✅ | 251K | 🟢 **-100%** |
| minContains.json | 7 | ✅ | 50.3M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 52.9M | ✅ | 252K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 42.2M | ✅ | 249K | 🟢 **-99%** |
| minProperties.json | 8 | ✅ | 42.9M | ✅ | 253K | 🟢 **-99%** |
| minimum.json | 11 | ✅ | 53.9M | ✅ | 257K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 49.5M | ✅ | 213K | 🟢 **-100%** |
| not.json | 38 | ✅ | 57.6M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 43.7M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 37.9M | ✅ | 248K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 15.4M | ✅ | 94K | 🟢 **-99%** |
| prefixItems.json | 2 | ✅ | 55.5M | ⚠️ 2 fail | - | - |
| properties.json | 28 | ✅ | 24.1M | ✅ | 55K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 26.5M | ✅ | 163K | 🟢 **-99%** |
| ref.json | 31 | ✅ | 31.8M | ⚠️ 45 fail | - | - |
| required.json | 16 | ✅ | 28.2M | ✅ | 148K | 🟢 **-99%** |
| type.json | 80 | ✅ | 51.7M | ✅ | 231K | 🟢 **-100%** |
| unevaluatedItems.json | 17 | ✅ | 38.9M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 25.1M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 59 | ✅ | 23.2M | ⚠️ 6 fail | - | - |
| vocabulary.json | 2 | ✅ | 53.2M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 47.0M | ✅ | 241K | 🟢 **-99%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 37.0M | ✅ | 100K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 15.6M | ✅ | 189K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 15.1M | ✅ | 246K | 🟢 **-98%** |
| optional/format/iri-reference.json | 13 | ✅ | 28.5M | ✅ | 238K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 27.7M | ✅ | 233K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 53.3M | ✅ | 176K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 61.8M | ✅ | 251K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.1M | ✅ | 224K | 🟢 **-98%** |
| optional/format/uuid.json | 22 | ✅ | 14.6M | ✅ | 242K | 🟢 **-98%** |
| optional/format-assertion.json | 4 | ✅ | 21.3M | ✅ | 231K | 🟢 **-99%** |
| optional/no-schema.json | 3 | ✅ | 48.0M | ✅ | 249K | 🟢 **-99%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.1M | ✅ | 151K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 42.8M | ✅ | 63K | 🟢 **-100%** |

