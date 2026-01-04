# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | jsonschema files | jsonschema tests | jsonschema ops/s | tjs vs jsonschema |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 34 | 714 | ✅ 34 | 714 | 32.5M | ⚠️ 33/34 | 671 | 114K | 🟢 **-100%** |
| draft6 | 43 | 973 | ✅ 43 | 973 | 33.7M | ⚠️ 42/43 | 919 | 124K | 🟢 **-100%** |
| draft7 | 47 | 1082 | ✅ 47 | 1082 | 33.1M | ⚠️ 46/47 | 1026 | 136K | 🟢 **-100%** |
| draft2019-09 | 56 | 1180 | ✅ 56 | 1180 | 36.0M | ⚠️ 47/56 | 1048 | 133K | 🟢 **-100%** |
| draft2020-12 | 55 | 1037 | ✅ 55 | 1037 | 37.1M | ⚠️ 43/55 | 805 | 137K | 🟢 **-100%** |
| **Total** | 235 | 4986 | ✅ 235 | 4986 | 34.6M | ⚠️ 211/235 | 4469 | 129K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs jsonschema**: 🟢 tjs is 290.37x faster (29 ns vs 8404 ns, 4986 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 33.1M | ✅ | 76K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 30.8M | ✅ | 69K | 🟢 **-100%** |
| allOf.json | 27 | ✅ | 43.6M | ✅ | 59K | 🟢 **-100%** |
| anyOf.json | 15 | ✅ | 57.9M | ✅ | 78K | 🟢 **-100%** |
| default.json | 7 | ✅ | 51.5M | ✅ | 113K | 🟢 **-100%** |
| dependencies.json | 29 | ✅ | 29.6M | ✅ | 78K | 🟢 **-100%** |
| enum.json | 49 | ✅ | 39.9M | ✅ | 171K | 🟢 **-100%** |
| format.json | 36 | ✅ | 48.7M | ✅ | 234K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 33.8M | ✅ | 39K | 🟢 **-100%** |
| items.json | 21 | ✅ | 24.7M | ✅ | 30K | 🟢 **-100%** |
| maxItems.json | 4 | ✅ | 70.4M | ✅ | 256K | 🟢 **-100%** |
| maxLength.json | 5 | ✅ | 54.7M | ✅ | 250K | 🟢 **-100%** |
| maxProperties.json | 8 | ✅ | 51.6M | ✅ | 257K | 🟢 **-100%** |
| maximum.json | 14 | ✅ | 64.8M | ✅ | 257K | 🟢 **-100%** |
| minItems.json | 4 | ✅ | 66.1M | ✅ | 257K | 🟢 **-100%** |
| minLength.json | 5 | ✅ | 53.5M | ✅ | 250K | 🟢 **-100%** |
| minProperties.json | 6 | ✅ | 55.2M | ✅ | 258K | 🟢 **-100%** |
| minimum.json | 17 | ✅ | 58.8M | ✅ | 257K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 62.0M | ✅ | 215K | 🟢 **-100%** |
| not.json | 20 | ✅ | 67.7M | ✅ | 124K | 🟢 **-100%** |
| oneOf.json | 23 | ✅ | 47.7M | ✅ | 71K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 46.2M | ✅ | 255K | 🟢 **-99%** |
| patternProperties.json | 18 | ✅ | 16.7M | ✅ | 89K | 🟢 **-99%** |
| properties.json | 24 | ✅ | 26.7M | ✅ | 54K | 🟢 **-100%** |
| ref.json | 43 | ✅ | 28.4M | ⚠️ 2 fail | - | - |
| required.json | 15 | ✅ | 38.2M | ✅ | 138K | 🟢 **-100%** |
| type.json | 79 | ✅ | 70.7M | ✅ | 234K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 25.7M | ✅ | 134K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 62.8M | ✅ | 244K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.8M | ✅ | 184K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 18.3M | ✅ | 246K | 🟢 **-99%** |
| optional/format/unknown.json | 7 | ✅ | 79.1M | ✅ | 259K | 🟢 **-100%** |
| optional/id.json | 3 | ✅ | 34.9M | ✅ | 29K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.8M | ✅ | 153K | 🟢 **-99%** |

### draft6

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 29.8M | ✅ | 71K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 33.8M | ✅ | 39K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 54.7M | ✅ | 60K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 57.3M | ✅ | 90K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 80.8M | ✅ | 545K | 🟢 **-99%** |
| const.json | 54 | ✅ | 70.9M | ✅ | 247K | 🟢 **-100%** |
| contains.json | 19 | ✅ | 59.6M | ✅ | 95K | 🟢 **-100%** |
| default.json | 7 | ✅ | 57.3M | ✅ | 111K | 🟢 **-100%** |
| dependencies.json | 36 | ✅ | 36.0M | ✅ | 87K | 🟢 **-100%** |
| enum.json | 45 | ✅ | 42.3M | ✅ | 172K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 69.6M | ✅ | 253K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 69.7M | ✅ | 252K | 🟢 **-100%** |
| format.json | 54 | ✅ | 52.8M | ✅ | 258K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 43.8M | ✅ | 39K | 🟢 **-100%** |
| items.json | 28 | ✅ | 28.8M | ✅ | 37K | 🟢 **-100%** |
| maxItems.json | 6 | ✅ | 70.3M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 39.7M | ✅ | 245K | 🟢 **-99%** |
| maxProperties.json | 10 | ✅ | 54.3M | ✅ | 254K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 72.1M | ✅ | 252K | 🟢 **-100%** |
| minItems.json | 6 | ✅ | 69.2M | ✅ | 253K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 54.9M | ✅ | 244K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 56.4M | ✅ | 253K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 72.9M | ✅ | 253K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 67.4M | ✅ | 213K | 🟢 **-100%** |
| not.json | 38 | ✅ | 73.8M | ✅ | 160K | 🟢 **-100%** |
| oneOf.json | 27 | ✅ | 59.4M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 47.9M | ✅ | 255K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 16.7M | ✅ | 92K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 26.5M | ✅ | 58K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 31.3M | ✅ | 171K | 🟢 **-99%** |
| ref.json | 54 | ✅ | 23.0M | ⚠️ 16 fail | - | - |
| required.json | 16 | ✅ | 41.6M | ✅ | 133K | 🟢 **-100%** |
| type.json | 80 | ✅ | 80.3M | ✅ | 231K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 25.3M | ✅ | 134K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 70.8M | ✅ | 243K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.1M | ✅ | 203K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 19.1M | ✅ | 242K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 32.8M | ✅ | 248K | 🟢 **-99%** |
| optional/format/unknown.json | 7 | ✅ | 87.9M | ✅ | 254K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.7M | ✅ | 223K | 🟢 **-98%** |
| optional/id.json | 7 | ✅ | 44.6M | ✅ | 42K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.7M | ✅ | 153K | 🟢 **-99%** |
| optional/unknownKeyword.json | 3 | ✅ | 14.5M | ✅ | 31K | 🟢 **-100%** |

### draft7

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 31.1M | ✅ | 74K | 🟢 **-100%** |
| additionalProperties.json | 16 | ✅ | 29.5M | ✅ | 75K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 44.2M | ✅ | 75K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 58.2M | ✅ | 53K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 58.9M | ✅ | 549K | 🟢 **-99%** |
| const.json | 54 | ✅ | 63.7M | ✅ | 246K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 53.3M | ✅ | 92K | 🟢 **-100%** |
| default.json | 7 | ✅ | 45.3M | ✅ | 107K | 🟢 **-100%** |
| dependencies.json | 36 | ✅ | 30.6M | ✅ | 86K | 🟢 **-100%** |
| enum.json | 45 | ✅ | 41.6M | ✅ | 172K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 64.0M | ✅ | 262K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 56.4M | ✅ | 261K | 🟢 **-100%** |
| format.json | 102 | ✅ | 65.6M | ✅ | 241K | 🟢 **-100%** |
| if-then-else.json | 26 | ✅ | 57.4M | ✅ | 163K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 32.6M | ✅ | 40K | 🟢 **-100%** |
| items.json | 28 | ✅ | 27.8M | ✅ | 40K | 🟢 **-100%** |
| maxItems.json | 6 | ✅ | 63.7M | ✅ | 261K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 51.3M | ✅ | 263K | 🟢 **-99%** |
| maxProperties.json | 10 | ✅ | 49.9M | ✅ | 262K | 🟢 **-99%** |
| maximum.json | 8 | ✅ | 64.3M | ✅ | 264K | 🟢 **-100%** |
| minItems.json | 6 | ✅ | 61.6M | ✅ | 260K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 51.6M | ✅ | 256K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 51.2M | ✅ | 264K | 🟢 **-99%** |
| minimum.json | 11 | ✅ | 73.0M | ✅ | 262K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 58.4M | ✅ | 225K | 🟢 **-100%** |
| not.json | 38 | ✅ | 67.1M | ✅ | 172K | 🟢 **-100%** |
| oneOf.json | 27 | ✅ | 55.0M | ✅ | 84K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 44.2M | ✅ | 261K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 15.8M | ✅ | 99K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 24.2M | ✅ | 61K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 31.2M | ✅ | 183K | 🟢 **-99%** |
| ref.json | 56 | ✅ | 21.3M | ⚠️ 22 fail | - | - |
| required.json | 16 | ✅ | 30.1M | ✅ | 145K | 🟢 **-100%** |
| type.json | 80 | ✅ | 53.8M | ✅ | 245K | 🟢 **-100%** |
| uniqueItems.json | 69 | ✅ | 23.5M | ✅ | 133K | 🟢 **-99%** |
| optional/bignum.json | 9 | ✅ | 60.3M | ✅ | 248K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 18.2M | ✅ | 212K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 18.7M | ✅ | 246K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 16.8M | ✅ | 256K | 🟢 **-98%** |
| optional/format/iri-reference.json | 13 | ✅ | 32.4M | ✅ | 241K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.3M | ✅ | 256K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 66.3M | ✅ | 186K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 77.2M | ✅ | 264K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 10.2M | ✅ | 224K | 🟢 **-98%** |
| optional/id.json | 7 | ✅ | 41.7M | ✅ | 70K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.0M | ✅ | 142K | 🟢 **-99%** |
| optional/unknownKeyword.json | 3 | ✅ | 10.6M | ✅ | 36K | 🟢 **-100%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 63.0M | ✅ | 69K | 🟢 **-100%** |
| additionalProperties.json | 21 | ✅ | 29.4M | ✅ | 75K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 50.3M | ✅ | 66K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 66.2M | ✅ | 84K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 63.2M | ✅ | 537K | 🟢 **-99%** |
| const.json | 54 | ✅ | 70.6M | ✅ | 234K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 63.1M | ✅ | 86K | 🟢 **-100%** |
| content.json | 18 | ✅ | 84.4M | ✅ | 262K | 🟢 **-100%** |
| default.json | 7 | ✅ | 56.8M | ✅ | 97K | 🟢 **-100%** |
| dependentRequired.json | 3 | ✅ | 92.2M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 42.4M | ✅ | 176K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 69.5M | ✅ | 250K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 69.1M | ✅ | 251K | 🟢 **-100%** |
| format.json | 114 | ✅ | 89.3M | ✅ | 249K | 🟢 **-100%** |
| if-then-else.json | 26 | ✅ | 76.0M | ✅ | 146K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 44.2M | ✅ | 34K | 🟢 **-100%** |
| items.json | 28 | ✅ | 30.9M | ✅ | 35K | 🟢 **-100%** |
| maxContains.json | 2 | ✅ | 90.9M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 70.4M | ✅ | 250K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 58.1M | ✅ | 252K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 54.1M | ✅ | 250K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 72.1M | ✅ | 250K | 🟢 **-100%** |
| minContains.json | 7 | ✅ | 70.9M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 70.5M | ✅ | 250K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 56.5M | ✅ | 245K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 56.4M | ✅ | 250K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 73.0M | ✅ | 259K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 67.4M | ✅ | 212K | 🟢 **-100%** |
| not.json | 38 | ✅ | 80.2M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 58.8M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 46.9M | ✅ | 248K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 16.9M | ✅ | 89K | 🟢 **-99%** |
| properties.json | 28 | ✅ | 24.7M | ✅ | 53K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 31.1M | ✅ | 173K | 🟢 **-99%** |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 12 fail | - | - |
| ref.json | 33 | ✅ | 37.6M | ⚠️ 46 fail | - | - |
| required.json | 16 | ✅ | 34.6M | ✅ | 148K | 🟢 **-100%** |
| type.json | 80 | ✅ | 76.1M | ✅ | 231K | 🟢 **-100%** |
| unevaluatedItems.json | 15 | ✅ | 58.9M | ⚠️ 22 fail | - | - |
| unevaluatedProperties.json | 27 | ✅ | 33.0M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 69 | ✅ | 26.1M | ✅ | 113K | 🟢 **-100%** |
| vocabulary.json | 2 | ✅ | 73.4M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 66.4M | ✅ | 242K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 45.4M | ✅ | 94K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.4M | ✅ | 204K | 🟢 **-99%** |
| optional/format/email.json | 17 | ✅ | 19.0M | ✅ | 244K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 17.4M | ✅ | 247K | 🟢 **-99%** |
| optional/format/iri-reference.json | 13 | ✅ | 32.5M | ✅ | 238K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 32.6M | ✅ | 247K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 73.2M | ✅ | 176K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 88.5M | ✅ | 253K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 223K | 🟢 **-98%** |
| optional/format/uuid.json | 22 | ✅ | 15.6M | ✅ | 235K | 🟢 **-98%** |
| optional/no-schema.json | 3 | ✅ | 64.6M | ✅ | 248K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.7M | ✅ | 137K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 54.0M | ✅ | 61K | 🟢 **-100%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 32.0M | ✅ | 69K | 🟢 **-100%** |
| allOf.json | 30 | ✅ | 50.8M | ✅ | 68K | 🟢 **-100%** |
| anyOf.json | 18 | ✅ | 66.4M | ✅ | 78K | 🟢 **-100%** |
| boolean_schema.json | 18 | ✅ | 68.1M | ✅ | 538K | 🟢 **-99%** |
| const.json | 54 | ✅ | 72.0M | ✅ | 215K | 🟢 **-100%** |
| contains.json | 21 | ✅ | 63.5M | ✅ | 73K | 🟢 **-100%** |
| content.json | 18 | ✅ | 84.3M | ✅ | 263K | 🟢 **-100%** |
| default.json | 7 | ✅ | 57.3M | ✅ | 99K | 🟢 **-100%** |
| dependentRequired.json | 3 | ✅ | 92.8M | ⚠️ 6 fail | - | - |
| enum.json | 45 | ✅ | 44.6M | ✅ | 174K | 🟢 **-100%** |
| exclusiveMaximum.json | 4 | ✅ | 69.6M | ✅ | 251K | 🟢 **-100%** |
| exclusiveMinimum.json | 4 | ✅ | 69.3M | ✅ | 251K | 🟢 **-100%** |
| format.json | 28 | ✅ | 86.9M | ⚠️ 15 fail | - | - |
| if-then-else.json | 26 | ✅ | 74.4M | ✅ | 139K | 🟢 **-100%** |
| infinite-loop-detection.json | 2 | ✅ | 44.8M | ✅ | 35K | 🟢 **-100%** |
| items.json | 14 | ✅ | 29.4M | ⚠️ 7 fail | - | - |
| maxContains.json | 2 | ✅ | 90.9M | ⚠️ 4 fail | - | - |
| maxItems.json | 6 | ✅ | 70.4M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | 7 | ✅ | 56.9M | ✅ | 244K | 🟢 **-100%** |
| maxProperties.json | 10 | ✅ | 54.7M | ✅ | 247K | 🟢 **-100%** |
| maximum.json | 8 | ✅ | 72.6M | ✅ | 251K | 🟢 **-100%** |
| minContains.json | 7 | ✅ | 70.7M | ⚠️ 12 fail | - | - |
| minItems.json | 6 | ✅ | 69.3M | ✅ | 251K | 🟢 **-100%** |
| minLength.json | 7 | ✅ | 56.4M | ✅ | 245K | 🟢 **-100%** |
| minProperties.json | 8 | ✅ | 56.2M | ✅ | 252K | 🟢 **-100%** |
| minimum.json | 11 | ✅ | 72.9M | ✅ | 251K | 🟢 **-100%** |
| multipleOf.json | 10 | ✅ | 67.4M | ✅ | 213K | 🟢 **-100%** |
| not.json | 38 | ✅ | 80.1M | ⚠️ 1 fail | - | - |
| oneOf.json | 27 | ✅ | 61.4M | ✅ | 80K | 🟢 **-100%** |
| pattern.json | 9 | ✅ | 48.2M | ✅ | 250K | 🟢 **-99%** |
| patternProperties.json | 23 | ✅ | 16.4M | ✅ | 81K | 🟢 **-100%** |
| prefixItems.json | 2 | ✅ | 84.0M | ⚠️ 2 fail | - | - |
| properties.json | 28 | ✅ | 24.8M | ✅ | 52K | 🟢 **-100%** |
| propertyNames.json | 20 | ✅ | 35.4M | ✅ | 152K | 🟢 **-100%** |
| ref.json | 31 | ✅ | 44.9M | ⚠️ 45 fail | - | - |
| required.json | 16 | ✅ | 35.1M | ✅ | 148K | 🟢 **-100%** |
| type.json | 80 | ✅ | 81.2M | ✅ | 231K | 🟢 **-100%** |
| unevaluatedItems.json | 17 | ✅ | 53.1M | ⚠️ 28 fail | - | - |
| unevaluatedProperties.json | 29 | ✅ | 30.3M | ⚠️ 45 fail | - | - |
| uniqueItems.json | 59 | ✅ | 26.4M | ⚠️ 6 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 9 | ✅ | 67.0M | ✅ | 247K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 52.5M | ✅ | 95K | 🟢 **-100%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.9M | ✅ | 203K | 🟢 **-99%** |
| optional/format/idn-email.json | 10 | ✅ | 17.0M | ✅ | 247K | 🟢 **-99%** |
| optional/format/iri-reference.json | 13 | ✅ | 32.6M | ✅ | 238K | 🟢 **-99%** |
| optional/format/json-pointer.json | 38 | ✅ | 32.3M | ✅ | 244K | 🟢 **-99%** |
| optional/format/regex.json | 8 | ✅ | 74.1M | ✅ | 176K | 🟢 **-100%** |
| optional/format/unknown.json | 7 | ✅ | 95.9M | ✅ | 253K | 🟢 **-100%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 198K | 🟢 **-98%** |
| optional/format/uuid.json | 22 | ✅ | 14.4M | ✅ | 241K | 🟢 **-98%** |
| optional/format-assertion.json | 4 | ✅ | 24.0M | ✅ | 231K | 🟢 **-99%** |
| optional/no-schema.json | 3 | ✅ | 65.0M | ✅ | 250K | 🟢 **-100%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.2M | ✅ | 137K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 56.0M | ✅ | 62K | 🟢 **-100%** |

