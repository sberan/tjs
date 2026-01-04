# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | jsonschema files | jsonschema tests | jsonschema ops/s | tjs vs jsonschema |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 34 | 714 | ✅ 34 | 714 | 33.5M | ⚠️ 33/34 | 671 | 103K | 🟢 **-100%** |
| draft6 | 43 | 973 | ✅ 43 | 973 | 31.6M | ⚠️ 42/43 | 919 | 127K | 🟢 **-100%** |
| draft7 | 47 | 1082 | ✅ 47 | 1082 | 33.8M | ⚠️ 46/47 | 1026 | 132K | 🟢 **-100%** |
| draft2019-09 | 56 | 1180 | ✅ 56 | 1180 | 35.9M | ⚠️ 47/56 | 1048 | 123K | 🟢 **-100%** |
| draft2020-12 | 55 | 1037 | ✅ 55 | 1037 | 36.6M | ⚠️ 43/55 | 805 | 131K | 🟢 **-100%** |
| **Total** | 235 | 4986 | ✅ 235 | 4986 | 34.3M | ⚠️ 211/235 | 4469 | 123K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs jsonschema**: 🟢 tjs is 302.13x faster (29 ns vs 8804 ns, 4986 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 37.9M | ✅ | 69K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 27.2M | ✅ | 76K | 🟢 **-100%** |
| allOf.json | 27 | ✅ | 44.6M | ✅ | 35K | 🟢 **-100%** |
| anyOf.json | 15 | ✅ | 57.5M | ✅ | 88K | 🟢 **-100%** |
| default.json | 7 | ✅ | 51.0M | ✅ | 62K | 🟢 **-100%** |
| dependencies.json | 29 | ✅ | 26.3M | ✅ | 51K | 🟢 **-100%** |
| enum.json | 49 | ✅ | 43.4M | ✅ | 97K | 🟢 **-100%** |
| format.json | 36 | ✅ | 74.3M | ✅ | 254K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 16.7M | ✅ | 40K | 🟢 **-100%** |
| items.json | 21 | ✅ | 23.0M | ✅ | 31K | 🟢 **-100%** |
| maxItems.json | 4 | ✅ | 82.4M | ✅ | 258K | 🟢 **-100%** |
| maxLength.json | 5 | ✅ | 61.1M | ✅ | 254K | 🟢 **-100%** |
| maxProperties.json | 8 | ✅ | 54.5M | ✅ | 258K | 🟢 **-100%** |
| maximum.json | 14 | ✅ | 75.4M | ✅ | 257K | 🟢 **-100%** |
| minItems.json | 4 | ✅ | 81.3M | ✅ | 256K | 🟢 **-100%** |
| minLength.json | 5 | ✅ | 59.7M | ✅ | 254K | 🟢 **-100%** |
| minProperties.json | 6 | ✅ | 61.5M | ✅ | 261K | 🟢 **-100%** |
| minimum.json | 17 | ✅ | 71.5M | ✅ | 256K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 68.3M | ✅ | 220K | 🟢 **-100%** |
| not.json | 20 | ✅ | 70.8M | ✅ | 116K | 🟢 **-100%** |
| oneOf.json | 23 | ✅ | 57.2M | ✅ | 71K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 48.5M | ✅ | 255K | 🟢 **-99%** |
| patternProperties.json | 18 | ✅ | 15.8M | ✅ | 90K | 🟢 **-99%** |
| properties.json | 24 | ✅ | 22.1M | ✅ | 56K | 🟢 **-100%** |
| ref.json | 43 | ✅ | 30.9M | ⚠️ 2 fail | - | - |
| required.json | 15 | ✅ | 34.0M | ✅ | 141K | 🟢 **-100%** |
| type.json | 79 | ✅ | 78.5M | ✅ | 237K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 137K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 66.6M | ✅ | 250K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 18.9M | ✅ | 185K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 19.1M | ✅ | 245K | 🟢 **-99%** |
| optional/format/unknown.json | 7 | ✅ | 90.4M | ✅ | 262K | 🟢 **-100%** |
| optional/id.json | 3 | ✅ | 29.0M | ✅ | 58K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.4M | ✅ | 156K | 🟢 **-99%** |

### draft6

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.1M | ✅ | 70K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 26.5M | ✅ | 69K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 44.0M | ✅ | 70K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 57.9M | ✅ | 87K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 55.3M | ✅ | 544K | 🟢 **-99%** |
| const.json | 54 | ✅ | 57.5M | ✅ | 232K | 🟢 **-100%** |
| contains.json | 19 | ✅ | 57.7M | ✅ | 95K | 🟢 **-100%** |
| default.json | 7 | ✅ | 50.2M | ✅ | 106K | 🟢 **-100%** |
| dependencies.json | 36 | ✅ | 32.5M | ✅ | 85K | 🟢 **-100%** |
| enum.json | 45 | ✅ | 38.4M | ✅ | 157K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 59.5M | ✅ | 252K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 61.4M | ✅ | 253K | 🟢 **-100%** |
| format.json | 54 | ✅ | 43.7M | ✅ | 254K | 🟢 **-99%** |
| infinite-loop-detection.json | 2 | ✅ | 37.4M | ✅ | 38K | 🟢 **-100%** |
| items.json | 28 | ✅ | 28.9M | ✅ | 38K | 🟢 **-100%** |
| maxItems.json | 6 | ✅ | 62.4M | ✅ | 253K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 50.9M | ✅ | 249K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 49.8M | ✅ | 223K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 63.3M | ✅ | 254K | 🟢 **-100%** |
| minItems.json | 6 | ✅ | 62.6M | ✅ | 254K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 51.0M | ✅ | 248K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 51.4M | ✅ | 255K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 64.1M | ✅ | 255K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 59.9M | ✅ | 214K | 🟢 **-100%** |
| not.json | 38 | ✅ | 66.9M | ✅ | 164K | 🟢 **-100%** |
| oneOf.json | 27 | ✅ | 51.8M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 44.0M | ✅ | 257K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 16.2M | ✅ | 90K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 26.4M | ✅ | 57K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 32.5M | ✅ | 154K | 🟢 **-100%** |
| ref.json | 54 | ✅ | 21.6M | ⚠️ 16 fail | - | - |
| required.json | 16 | ✅ | 31.4M | ✅ | 134K | 🟢 **-100%** |
| type.json | 80 | ✅ | 63.1M | ✅ | 238K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 24.0M | ✅ | 135K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 61.3M | ✅ | 243K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.8M | ✅ | 189K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 18.4M | ✅ | 217K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.7M | ✅ | 223K | 🟢 **-99%** |
| optional/format/unknown.json | 7 | ✅ | 75.3M | ✅ | 255K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 225K | 🟢 **-98%** |
| optional/id.json | 7 | ✅ | 40.9M | ✅ | 43K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.7M | ✅ | 150K | 🟢 **-99%** |
| optional/unknownKeyword.json | 3 | ✅ | 12.7M | ✅ | 35K | 🟢 **-100%** |

### draft7

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 28.9M | ✅ | 70K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 28.2M | ✅ | 74K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 48.3M | ✅ | 70K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 61.1M | ✅ | 82K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 59.0M | ✅ | 553K | 🟢 **-99%** |
| const.json | 54 | ✅ | 63.0M | ✅ | 236K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 54.6M | ✅ | 92K | 🟢 **-100%** |
| default.json | 7 | ✅ | 51.9M | ✅ | 100K | 🟢 **-100%** |
| dependencies.json | 36 | ✅ | 33.3M | ✅ | 78K | 🟢 **-100%** |
| enum.json | 45 | ✅ | 39.7M | ✅ | 156K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 63.8M | ✅ | 251K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 64.2M | ✅ | 250K | 🟢 **-100%** |
| format.json | 102 | ✅ | 47.1M | ✅ | 253K | 🟢 **-99%** |
| if-then-else.json | 26 | ✅ | 62.5M | ✅ | 155K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 42.4M | ✅ | 38K | 🟢 **-100%** |
| items.json | 28 | ✅ | 28.8M | ✅ | 38K | 🟢 **-100%** |
| maxItems.json | 6 | ✅ | 64.6M | ✅ | 253K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 53.6M | ✅ | 248K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 51.1M | ✅ | 250K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 66.9M | ✅ | 252K | 🟢 **-100%** |
| minItems.json | 6 | ✅ | 64.5M | ✅ | 251K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 53.2M | ✅ | 246K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 53.0M | ✅ | 248K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 66.7M | ✅ | 250K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 62.0M | ✅ | 213K | 🟢 **-100%** |
| not.json | 38 | ✅ | 67.7M | ✅ | 161K | 🟢 **-100%** |
| oneOf.json | 27 | ✅ | 55.7M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 46.0M | ✅ | 245K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 16.6M | ✅ | 90K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 24.1M | ✅ | 57K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 30.9M | ✅ | 169K | 🟢 **-99%** |
| ref.json | 56 | ✅ | 30.0M | ⚠️ 22 fail | - | - |
| required.json | 16 | ✅ | 31.9M | ✅ | 136K | 🟢 **-100%** |
| type.json | 80 | ✅ | 68.7M | ✅ | 228K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 25.6M | ✅ | 131K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 62.3M | ✅ | 242K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 18.2M | ✅ | 196K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 18.5M | ✅ | 243K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 17.0M | ✅ | 247K | 🟢 **-99%** |
| optional/format/iri-reference.json | 13 | ✅ | 29.9M | ✅ | 237K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 26.4M | ✅ | 248K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 66.0M | ✅ | 185K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 79.0M | ✅ | 253K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.3M | ✅ | 223K | 🟢 **-98%** |
| optional/id.json | 7 | ✅ | 46.8M | ✅ | 62K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.2M | ✅ | 153K | 🟢 **-99%** |
| optional/unknownKeyword.json | 3 | ✅ | 14.6M | ✅ | 35K | 🟢 **-100%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 64.9M | ✅ | 36K | 🟢 **-100%** |
| additionalProperties.json | 21 | ✅ | 29.0M | ✅ | 43K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 49.3M | ✅ | 54K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 59.7M | ✅ | 92K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 67.9M | ✅ | 541K | 🟢 **-99%** |
| const.json | 54 | ✅ | 72.3M | ✅ | 236K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 62.3M | ✅ | 90K | 🟢 **-100%** |
| content.json | 18 | ✅ | 84.3M | ✅ | 227K | 🟢 **-100%** |
| default.json | 7 | ✅ | 56.7M | ✅ | 100K | 🟢 **-100%** |
| dependentRequired.json | 3 | ✅ | 90.6M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 42.3M | ✅ | 92K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 68.1M | ✅ | 250K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 69.5M | ✅ | 249K | 🟢 **-100%** |
| format.json | 114 | ✅ | 86.1M | ✅ | 247K | 🟢 **-100%** |
| if-then-else.json | 26 | ✅ | 73.8M | ✅ | 140K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 45.0M | ✅ | 34K | 🟢 **-100%** |
| items.json | 28 | ✅ | 28.4M | ✅ | 34K | 🟢 **-100%** |
| maxContains.json | 2 | ✅ | 90.8M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 70.5M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 58.2M | ✅ | 248K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 54.0M | ✅ | 250K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 72.5M | ✅ | 258K | 🟢 **-100%** |
| minContains.json | 7 | ✅ | 70.8M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 70.5M | ✅ | 252K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 55.3M | ✅ | 246K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 56.6M | ✅ | 253K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 80.5M | ✅ | 251K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 67.5M | ✅ | 213K | 🟢 **-100%** |
| not.json | 38 | ✅ | 80.0M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 59.3M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 50.3M | ✅ | 249K | 🟢 **-100%** |
| patternProperties.json | 23 | ✅ | 15.7M | ✅ | 83K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 25.4M | ✅ | 57K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 35.0M | ✅ | 172K | 🟢 **-100%** |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 12 fail | - | - |
| ref.json | 33 | ✅ | 44.9M | ⚠️ 46 fail | - | - |
| required.json | 16 | ✅ | 34.3M | ✅ | 150K | 🟢 **-100%** |
| type.json | 80 | ✅ | 80.3M | ✅ | 231K | 🟢 **-100%** |
| unevaluatedItems.json | 15 | ✅ | 59.4M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 33.6M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 69 | ✅ | 25.7M | ✅ | 130K | 🟢 **-99%** |
| vocabulary.json | 2 | ✅ | 88.2M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 67.4M | ✅ | 243K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 45.3M | ✅ | 99K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 205K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 19.1M | ✅ | 246K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 17.2M | ✅ | 247K | 🟢 **-99%** |
| optional/format/iri-reference.json | 13 | ✅ | 32.6M | ✅ | 237K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 28.4M | ✅ | 248K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 74.2M | ✅ | 177K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 95.7M | ✅ | 254K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 224K | 🟢 **-98%** |
| optional/format/uuid.json | 22 | ✅ | 15.2M | ✅ | 242K | 🟢 **-98%** |
| optional/no-schema.json | 3 | ✅ | 63.3M | ✅ | 252K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 24.0M | ✅ | 149K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 54.5M | ✅ | 62K | 🟢 **-100%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 23.7M | ✅ | 70K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 54.9M | ✅ | 32K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 55.1M | ✅ | 86K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 65.3M | ✅ | 543K | 🟢 **-99%** |
| const.json | 54 | ✅ | 71.7M | ✅ | 244K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 62.5M | ✅ | 87K | 🟢 **-100%** |
| content.json | 18 | ✅ | 83.6M | ✅ | 265K | 🟢 **-100%** |
| default.json | 7 | ✅ | 56.6M | ✅ | 98K | 🟢 **-100%** |
| dependentRequired.json | 3 | ✅ | 91.9M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 40.2M | ✅ | 178K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 69.6M | ✅ | 251K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 69.5M | ✅ | 252K | 🟢 **-100%** |
| format.json | 28 | ✅ | 86.6M | ⚠️ 15 fail | - | - |
| if-then-else.json | 26 | ✅ | 73.6M | ✅ | 140K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 44.5M | ✅ | 34K | 🟢 **-100%** |
| items.json | 14 | ✅ | 30.3M | ⚠️ 7 fail | - | - |
| maxContains.json | 2 | ✅ | 90.9M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 69.8M | ✅ | 254K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 58.0M | ✅ | 248K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 54.6M | ✅ | 254K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 71.7M | ✅ | 254K | 🟢 **-100%** |
| minContains.json | 7 | ✅ | 70.7M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 70.5M | ✅ | 255K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 55.7M | ✅ | 249K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 56.4M | ✅ | 255K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 72.9M | ✅ | 254K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 66.9M | ✅ | 220K | 🟢 **-100%** |
| not.json | 38 | ✅ | 79.4M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 61.4M | ✅ | 81K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 44.1M | ✅ | 250K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 17.2M | ✅ | 87K | 🟢 **-99%** |
| prefixItems.json | 2 | ✅ | 84.0M | ⚠️ 2 fail | - | - |
| properties.json | 28 | ✅ | 28.2M | ✅ | 58K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 31.5M | ✅ | 161K | 🟢 **-99%** |
| ref.json | 31 | ✅ | 39.6M | ⚠️ 45 fail | - | - |
| required.json | 16 | ✅ | 34.7M | ✅ | 131K | 🟢 **-100%** |
| type.json | 80 | ✅ | 81.2M | ✅ | 233K | 🟢 **-100%** |
| unevaluatedItems.json | 17 | ✅ | 53.9M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 29.9M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 59 | ✅ | 26.9M | ⚠️ 6 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 66.7M | ✅ | 243K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 51.5M | ✅ | 98K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.6M | ✅ | 205K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 17.0M | ✅ | 245K | 🟢 **-99%** |
| optional/format/iri-reference.json | 13 | ✅ | 32.5M | ✅ | 236K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.6M | ✅ | 220K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 72.7M | ✅ | 178K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 88.5M | ✅ | 254K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 222K | 🟢 **-98%** |
| optional/format/uuid.json | 22 | ✅ | 15.7M | ✅ | 244K | 🟢 **-98%** |
| optional/format-assertion.json | 4 | ✅ | 23.7M | ✅ | 230K | 🟢 **-99%** |
| optional/no-schema.json | 3 | ✅ | 62.0M | ✅ | 251K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 24.3M | ✅ | 154K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 48.2M | ✅ | 63K | 🟢 **-100%** |

