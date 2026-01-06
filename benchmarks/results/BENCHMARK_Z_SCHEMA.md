# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.4M | 169/199 | 1.1M | 169 | 🟢 **-96%** |
| draft6 | 276 | ✅ 276 | 29.6M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 16.2M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 19.7M | 28/435 | 499K | 28 | 🟢 **-97%** |
| draft2020-12 | 448 | ✅ 448 | 20.4M | 28/448 | 676K | 28 | 🟢 **-97%** |
| **Total** | 1671 | 1670/1671 | 20.8M | 225/1671 | 965K | 225 | 🟢 **-95%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **38.97x faster** (27 ns vs 1036 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.4M | ✅ | 901K | 🟢 **-98%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.0M | ✅ | 1.7M | 🟢 **-99%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 2.2M | 🟢 **-98%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 3.2M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 2.3M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ✅ | 520K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.4M | ✅ | 889K | 🟢 **-98%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.6M | ✅ | 1.9M | 🟢 **-97%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 3.9M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 48.6M | ✅ | 1.3M | 🟢 **-97%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 42.0M | ✅ | 1.1M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 1.0M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.4M | ✅ | 1.1M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 157.6M | ✅ | 1.5M | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 501K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 1.9M | 🟢 **-96%** |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 559K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.2M | ✅ | 471K | 🟢 **-98%** |
| allOf.json | allOf simple types | 2 | ✅ | 92.4M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 3.3M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.7M | ✅ | 2.7M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.4M | ✅ | 1.3M | 🟢 **-98%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 1.3M | 🟢 **-98%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 506K | 🟢 **-99%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 933K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 836K | 🟢 **-98%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.1M | ✅ | 542K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 2.9M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 918K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 2.2M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 51.1M | ✅ | 2.0M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.2M | ✅ | 1.1M | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ✅ | 150K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 2.3M | 🟢 **-97%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.6M | ✅ | 1.2M | 🟢 **-97%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.3M | ✅ | 590K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ✅ | 942K | 🟢 **-92%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.1M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 1.8M | 🟢 **-98%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 2.3M | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 15.2M | ✅ | 833K | 🟢 **-95%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.4M | ✅ | 2.3M | 🟢 **-96%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 108.6M | ✅ | 1.8M | 🟢 **-98%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 108.3M | ✅ | 1.8M | 🟢 **-98%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.0M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 2.4M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 67.2M | ✅ | 2.0M | 🟢 **-97%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.2M | ✅ | 2.4M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 1.9M | 🟢 **-97%** |
| enum.json | nul characters in strings | 2 | ✅ | 87.9M | ✅ | 2.1M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 57.8M | ✅ | 1.9M | 🟢 **-97%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 2.0M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 92.8M | ✅ | 3.4M | 🟢 **-96%** |
| format.json | ipv4 format | 6 | ✅ | 162.6M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 82.1M | ✅ | 3.1M | 🟢 **-96%** |
| format.json | hostname format | 6 | ✅ | 157.0M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 92.7M | ✅ | 3.0M | 🟢 **-97%** |
| format.json | uri format | 6 | ✅ | 163.4M | ✅ | 3.1M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 455K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 81.5M | ✅ | 1.2M | 🟢 **-98%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.2M | ✅ | 1.2M | 🟢 **-98%** |
| items.json | items and subitems | 6 | ✅ | 28.7M | ✅ | 265K | 🟢 **-99%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 158K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 2.2M | 🟢 **-97%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 2.2M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 2.4M | 🟢 **-97%** |
| maxLength.json | maxLength validation | 5 | ✅ | 66.8M | ✅ | 2.5M | 🟢 **-96%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 2.2M | 🟢 **-96%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.3M | ✅ | 1.6M | 🟢 **-94%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 2.1M | 🟢 **-97%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ✅ | 2.2M | 🟢 **-97%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 1.9M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 1.6M | 🟢 **-98%** |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ✅ | 2.4M | 🟢 **-97%** |
| minLength.json | minLength validation | 5 | ✅ | 57.7M | ✅ | 2.0M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 2.3M | 🟢 **-96%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 2.1M | 🟢 **-97%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 1.9M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ✅ | 1.5M | 🟢 **-98%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 2.2M | 🟢 **-97%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 1.9M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 70.7M | ✅ | 1.7M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 1.3M | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 813K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 1.2M | 🟢 **-98%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 1.1M | 🟢 **-98%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 728K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 1.1M | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.6M | ✅ | 1.5M | 🟢 **-97%** |
| not.json | double negation | 1 | ✅ | 95.9M | ✅ | 1.4M | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 692K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.4M | ✅ | 797K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 429K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 70.4M | ✅ | 1.0M | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.9M | ✅ | 530K | 🟢 **-99%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.1M | ✅ | 532K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 909K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 2.5M | 🟢 **-96%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.1M | ✅ | 2.6M | 🟢 **-89%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ✅ | 928K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 561K | 🟢 **-96%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.7M | ✅ | 813K | 🟢 **-95%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 1.3M | 🟢 **-93%** |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 988K | 🟢 **-98%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 735K | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.7M | ✅ | 241K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 1.7M | 🟢 **-98%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 978K | 🟢 **-96%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.3M | ✅ | 962K | 🟢 **-98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ✅ | 907K | 🟢 **-98%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 929K | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 1.3M | 🟢 **-97%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.8M | ✅ | 1.1M | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.2M | ✅ | 392K | 🟢 **-98%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.0M | ✅ | 988K | 🟢 **-98%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 933K | 🟢 **-98%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.8M | ✅ | 937K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 1.3M | 🟢 **-98%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.6M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 32.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 1.3M | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.8M | ✅ | 2.0M | 🟢 **-97%** |
| required.json | required default validation | 1 | ✅ | 97.9M | ✅ | 3.0M | 🟢 **-97%** |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 767K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.5M | ✅ | 1.3M | 🟢 **-98%** |
| type.json | number type matches numbers | 9 | ✅ | 67.4M | ✅ | 1.5M | 🟢 **-98%** |
| type.json | string type matches strings | 9 | ✅ | 67.1M | ✅ | 1.5M | 🟢 **-98%** |
| type.json | object type matches objects | 7 | ✅ | 57.9M | ✅ | 1.3M | 🟢 **-98%** |
| type.json | array type matches arrays | 7 | ✅ | 63.3M | ✅ | 1.3M | 🟢 **-98%** |
| type.json | boolean type matches booleans | 10 | ✅ | 65.6M | ✅ | 1.3M | 🟢 **-98%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.0M | ✅ | 1.2M | 🟢 **-98%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 64.8M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 1.5M | 🟢 **-98%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 1.2M | 🟢 **-98%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 1.5M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 1.5M | 🟢 **-91%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 953K | 🟢 **-97%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 924K | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 154.8M | ✅ | 3.8M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ✅ | 1.5M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 71.0M | ✅ | 1.3M | 🟢 **-98%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 2.6M | 🟢 **-97%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 2.6M | 🟢 **-97%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 1.1M | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.6M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 893K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.6M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 894K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 1.1M | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.1M | ✅ | 1.1M | 🟢 **-94%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 1.1M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 1.1M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 950K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 1.3M | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 1.1M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 1.1M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 1.6M | 🟢 **-94%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 872K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 1.2M | 🟢 **-92%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 1.3M | 🟢 **-92%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 1.1M | 🟢 **-96%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.8M | ✅ | 822K | 🟢 **-96%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ✅ | 818K | 🟢 **-96%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 774K | 🟢 **-90%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.7M | ✅ | 455K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 1.4M | 🟢 **-88%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.0M | ✅ | 1.5M | 🟢 **-96%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 22.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.3M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 38.3M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 55.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.2M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.9M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.0M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 152.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 54.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 48.4M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 52.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 90.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 49.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 89.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 63.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 48.9M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.1M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 49.6M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.2M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.6M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.0M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 10.9M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 34.3M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 15.4M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 72.6M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 104.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 110.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 47.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 101.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 44.3M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 74.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 156.0M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 79.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 160.5M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 75.1M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 157.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 78.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 150.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 48.1M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 49.9M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 102.2M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.5M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.6M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.4M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 70.0M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 69.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 64.6M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 62.7M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 45.4M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.6M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.7M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.8M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 62.0M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.7M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 44.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.6M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 51.9M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.7M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.4M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.4M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 51.1M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 45.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.6M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.0M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.0M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.1M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 61.6M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 59.1M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 65.6M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.8M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 34.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 13.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.9M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 134.5M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.5M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 50.5M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.2M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 40.9M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.7M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 58.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 73.0M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.3M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 57.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 70.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 58.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.0M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 48.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 34.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 69.8M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.8M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.5M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 92.0M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.4M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 69.1M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.1M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.4M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 64.4M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 34.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 51.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 83.2M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 91.6M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 88.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 82.9M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 91.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 83.8M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 83.5M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 91.6M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 83.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 82.8M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 81.0M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 83.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 92.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 92.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 83.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 53.8M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 56.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 84.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 58.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.8M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.5M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.6M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 57.2M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.7M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.7M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 76.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 70.9M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 54.3M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 59.6M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.6M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 65.9M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 59.0M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 56.0M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 56.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.4M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 53.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.3M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.0M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 42.6M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 58.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.3M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.9M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.6M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.0M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 85.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.7M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 71.0M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 76.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.6M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 346K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 426K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 58.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.7M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.8M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.6M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 65.1M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.5M | ✅ | 371K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 34.7M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 32.7M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.0M | ✅ | 421K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.2M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.1M | ✅ | 422K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 37.2M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.9M | ✅ | 491K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.3M | ✅ | 502K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.7M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.6M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.7M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.5M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 65.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 42.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 81.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 69.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 146.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 501K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.8M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 66.1M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 58.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 56.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.9M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 63.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.8M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.2M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 65.5M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.5M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 58.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.6M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 79.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 72.5M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 67.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.9M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.2M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.6M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 180.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 181.1M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 179.1M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 178.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 181.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 177.3M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 178.1M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 181.1M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 182.1M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.8M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 67.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 48.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.5M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 50.8M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 62.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 65.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 170.9M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 65.5M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.8M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.4M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.0M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 50.3M | ✅ | 479K | 🟢 **-99%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.1M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.5M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.6M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.7M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 70.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 53.8M | ✅ | 457K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.6M | ❌ | - | - |
| not.json | not | 2 | ✅ | 69.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 64.8M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 63.0M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 50.2M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 537K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.9M | ✅ | 555K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 114.0M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.8M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.3M | ✅ | 510K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.5M | ✅ | 481K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 494K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.8M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 45.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.3M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.2M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.6M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.2M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.2M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 52.6M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 48.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.3M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.1M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ✅ | 471K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.2M | ✅ | 408K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.8M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 36.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 158.9M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 158.3M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 47.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.2M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 62.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 62.0M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 54.5M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 58.3M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 59.4M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 69.0M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 60.6M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 71.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 74.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.0M | ✅ | 403K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.2M | ✅ | 439K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 80.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.1M | ✅ | 409K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 63.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.0M | ✅ | 375K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.2M | ✅ | 429K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.5M | ✅ | 432K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.2M | ✅ | 437K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ✅ | 448K | 🟢 **-98%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.7M | ✅ | 411K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 69.9M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.3M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.6M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 506K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.5M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 515K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 513K | 🟢 **-99%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 66.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 170.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 57.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.6M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.8M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 62.2M | ✅ | 1.5M | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 50.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 20.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 17.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 560K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.7M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 539K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 40.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 710K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.0M | ✅ | 706K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 38.8M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 72.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 70.1M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 674K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.8M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 153.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 82.0M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 55.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 63.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 66.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 70.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.7M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 70.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.9M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.9M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 165.2M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.8M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 176.6M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.7M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.8M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.2M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.9M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.4M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.8M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 79.5M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.1M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 181.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 181.1M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 181.8M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 182.0M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.0M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 181.6M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 181.8M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 181.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 181.9M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 181.9M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 176.8M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 175.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 181.3M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 182.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 168.8M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 126.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.2M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.4M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.7M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 40.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.4M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.5M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 61.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.0M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.2M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.9M | ✅ | 640K | 🟢 **-99%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.6M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.3M | ✅ | 680K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 71.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 51.8M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 707K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.0M | ✅ | 739K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.1M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.3M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 673K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 670K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 667K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 53.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.3M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.7M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 645K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.0M | ✅ | 551K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 86.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.9M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.6M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 55.1M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 53.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 55.3M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 51.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 154.4M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 158.3M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 53.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 58.3M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 68.7M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 85.8M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 58.7M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 63.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.8M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 72.2M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.4M | ✅ | 526K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.1M | ✅ | 591K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.5M | ✅ | 565K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 33.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.1M | ✅ | 499K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.1M | ✅ | 583K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.2M | ✅ | 585K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.6M | ✅ | 573K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.4M | ✅ | 554K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.5M | ✅ | 558K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.1M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 729K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 726K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 727K | 🟢 **-99%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 42.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ✅ | 729K | 🟢 **-99%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.3M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.8M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.0M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.2M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 67.9M | ✅ | 2.7M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.8M | ❌ | - | - |
