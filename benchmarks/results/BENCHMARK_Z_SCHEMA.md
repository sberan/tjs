# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.5M | 169/199 | 855K | 169 | 🟢 **-97%** |
| draft6 | 276 | ✅ 276 | 29.8M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 16.2M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 19.4M | 28/435 | 509K | 28 | 🟢 **-97%** |
| draft2020-12 | 448 | ✅ 448 | 20.1M | 28/448 | 689K | 28 | 🟢 **-97%** |
| **Total** | 1671 | 1670/1671 | 20.6M | 225/1671 | 806K | 225 | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **44.96x faster** (28 ns vs 1240 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 63.4M | ✅ | 643K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.3M | ✅ | 1.5M | 🟢 **-99%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 131.3M | ✅ | 1.8M | 🟢 **-99%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.3M | ✅ | 3.2M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 128.2M | ✅ | 2.1M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 37.1M | ✅ | 367K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 64.4M | ✅ | 650K | 🟢 **-99%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 36.5M | ✅ | 1.4M | 🟢 **-96%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.0M | ✅ | 3.4M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 48.5M | ✅ | 1.1M | 🟢 **-98%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 45.9M | ✅ | 772K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.8M | ✅ | 763K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 49.9M | ✅ | 744K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 1.4M | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.2M | ✅ | 384K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.6M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf | 4 | ✅ | 49.1M | ✅ | 442K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.3M | ✅ | 379K | 🟢 **-98%** |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 987K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 3.0M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 2.5M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 957K | 🟢 **-98%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 959K | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 928K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.9M | ✅ | 351K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 679K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 52.7M | ✅ | 585K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.8M | ✅ | 396K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 167.6M | ✅ | 2.8M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.6M | ✅ | 613K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 1.9M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 52.6M | ✅ | 1.9M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 903K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.7M | ✅ | 129K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 90.8M | ✅ | 1.8M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 837K | 🟢 **-97%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.9M | ✅ | 451K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 723K | 🟢 **-96%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 52.8M | ✅ | 770K | 🟢 **-99%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.4M | ✅ | 823K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 2.0M | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 48.6M | ✅ | 654K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.3M | ✅ | 2.2M | 🟢 **-96%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.5M | ✅ | 1.3M | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.6M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 2.4M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.9M | ✅ | 1.9M | 🟢 **-97%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ✅ | 2.1M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.0M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 2.0M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.4M | ✅ | 1.8M | 🟢 **-96%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 1.9M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 88.3M | ✅ | 3.3M | 🟢 **-96%** |
| format.json | ipv4 format | 6 | ✅ | 161.8M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 85.6M | ✅ | 3.1M | 🟢 **-96%** |
| format.json | hostname format | 6 | ✅ | 131.4M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 80.1M | ✅ | 3.1M | 🟢 **-96%** |
| format.json | uri format | 6 | ✅ | 162.4M | ✅ | 3.1M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.5M | ✅ | 362K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 92.9M | ✅ | 1.0M | 🟢 **-99%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.4M | ✅ | 955K | 🟢 **-99%** |
| items.json | items and subitems | 6 | ✅ | 35.2M | ✅ | 239K | 🟢 **-99%** |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 138K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 2.1M | 🟢 **-97%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 2.2M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 1.8M | 🟢 **-98%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.9M | ✅ | 2.0M | 🟢 **-97%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.4M | ✅ | 1.7M | 🟢 **-97%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ✅ | 1.1M | 🟢 **-97%** |
| maximum.json | maximum validation | 4 | ✅ | 68.7M | ✅ | 1.6M | 🟢 **-98%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.5M | ✅ | 1.7M | 🟢 **-97%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 69.0M | ✅ | 1.5M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 59.4M | ✅ | 1.5M | 🟢 **-97%** |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 1.8M | 🟢 **-98%** |
| minLength.json | minLength validation | 5 | ✅ | 52.7M | ✅ | 1.6M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.0M | ✅ | 2.0M | 🟢 **-96%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 1.6M | 🟢 **-98%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 69.0M | ✅ | 1.5M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 58.0M | ✅ | 1.4M | 🟢 **-98%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 1.8M | 🟢 **-97%** |
| multipleOf.json | by int | 3 | ✅ | 69.3M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 1.3M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 932K | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 771K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 840K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 894K | 🟢 **-98%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 547K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 43.5M | ✅ | 898K | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 1.2M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 1.3M | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 57.9M | ✅ | 495K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.4M | ✅ | 602K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 320K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.8M | ✅ | 789K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.7M | ✅ | 382K | 🟢 **-99%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 379K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 679K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 2.1M | 🟢 **-96%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 2.6M | 🟢 **-95%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ✅ | 768K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 458K | 🟢 **-97%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.5M | ✅ | 655K | 🟢 **-96%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.1M | ✅ | 1.3M | 🟢 **-92%** |
| properties.json | object properties validation | 6 | ✅ | 49.3M | ✅ | 779K | 🟢 **-98%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 589K | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 193K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 1.7M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 791K | 🟢 **-97%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.2M | ✅ | 758K | 🟢 **-98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 715K | 🟢 **-99%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.3M | ✅ | 734K | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 49.5M | ✅ | 944K | 🟢 **-98%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 46.8M | ✅ | 881K | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.4M | ✅ | 337K | 🟢 **-99%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.5M | ✅ | 761K | 🟢 **-98%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.8M | ✅ | 727K | 🟢 **-98%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 738K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 62.9M | ✅ | 939K | 🟢 **-99%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 960K | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 56.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 58.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 1.6M | 🟢 **-97%** |
| required.json | required default validation | 1 | ✅ | 159.2M | ✅ | 3.0M | 🟢 **-98%** |
| required.json | required with escaped characters | 2 | ✅ | 44.3M | ✅ | 510K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 50.2M | ✅ | 904K | 🟢 **-98%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 907K | 🟢 **-98%** |
| type.json | array type matches arrays | 7 | ✅ | 50.6M | ✅ | 906K | 🟢 **-98%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 988K | 🟢 **-98%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.7M | ✅ | 892K | 🟢 **-98%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 855K | 🟢 **-98%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 896K | 🟢 **-98%** |
| type.json | type: array, object or null | 5 | ✅ | 66.8M | ✅ | 1.2M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 1.2M | 🟢 **-93%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 730K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 732K | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 3.8M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.0M | ✅ | 1.3M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 67.3M | ✅ | 1.1M | 🟢 **-98%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 2.5M | 🟢 **-97%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 2.5M | 🟢 **-97%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 1.0M | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 76.6M | ✅ | 3.5M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 855K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 3.6M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 863K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.8M | ✅ | 823K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.9M | ✅ | 825K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 829K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 827K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.6M | ✅ | 745K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 1.0M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.2M | ✅ | 822K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.2M | ✅ | 824K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 1.4M | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 653K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ✅ | 800K | 🟢 **-94%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.4M | ✅ | 920K | 🟢 **-94%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.6M | ✅ | 806K | 🟢 **-97%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 677K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 716K | 🟢 **-97%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 679K | 🟢 **-92%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ✅ | 430K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ✅ | 1.1M | 🟢 **-90%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.3M | ✅ | 1.2M | 🟢 **-96%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 58.0M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 39.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 91.9M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.7M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 34.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.7M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 156.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.5M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 66.9M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 48.0M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 153.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 85.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 113.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 59.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 99.1M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.0M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.2M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.4M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 51.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.5M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 56.3M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.3M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.3M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 87.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.9M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 163.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 162.5M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.8M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 60.2M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 103.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 98.8M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 33.2M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 70.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.4M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 54.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 46.2M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.6M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 52.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 41.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 46.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.6M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 39.3M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 48.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 57.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.1M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.2M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 58.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 46.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.0M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.2M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 50.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 48.2M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.7M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 63.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 42.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 85.8M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.2M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.4M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 58.4M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 70.6M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.8M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 82.8M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.9M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 13.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 34.2M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 154.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.0M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.2M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 59.1M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 158.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.0M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 48.6M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 45.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 52.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 47.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 63.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 128.0M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 67.4M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.1M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 59.2M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 173.2M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.4M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 48.8M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 38.2M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 59.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.9M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.3M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.5M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.0M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.9M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 59.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 88.3M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 80.7M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 80.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 88.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 87.6M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 88.2M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 87.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 88.3M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.8M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.3M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 60.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.1M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 58.8M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.2M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.0M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.0M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 38.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 66.9M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 72.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 59.8M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 46.2M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.3M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.6M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.4M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 158.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.8M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 41.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.4M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.1M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.6M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 45.8M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 32.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 58.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 57.3M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 43.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.1M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.0M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 40.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 24.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.2M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.5M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.5M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 67.7M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 82.1M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 58.9M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 350K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.7M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.5M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 70.5M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 358K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.0M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.2M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.5M | ✅ | 424K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.2M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 35.9M | ✅ | 431K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 34.3M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 501K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 506K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 57.7M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 63.6M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 60.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 58.9M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 61.5M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 65.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 501K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.3M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 59.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.7M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 60.0M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.4M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.1M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.7M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.7M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 67.6M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 52.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.4M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.4M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.3M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.6M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.5M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.7M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 52.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 49.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.7M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.6M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 57.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 64.9M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 181.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 135.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 178.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 166.4M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 92.3M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 145.2M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 175.3M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 180.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 173.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 180.8M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 181.2M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 180.7M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 138.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 169.7M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 67.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 66.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 56.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.7M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.6M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 27.5M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 63.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.4M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.1M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 82.1M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 169.7M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 58.7M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 39.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 68.7M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 172.0M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.0M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 54.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 46.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ✅ | 522K | 🟢 **-99%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.8M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 72.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 51.7M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 65.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 60.8M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 497K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 44.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 532K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ✅ | 555K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.5M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.6M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 30.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 482K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 486K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 484K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.8M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.7M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 48.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 42.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 41.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 34.3M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.0M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 144.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 473K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 430K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.2M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 58.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 56.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 57.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 58.7M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 57.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 55.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 58.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 57.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 58.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.2M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.5M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 158.8M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 50.1M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 54.4M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 45.9M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 50.6M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 49.0M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.9M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.7M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 65.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 44.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 44.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 83.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 34.7M | ✅ | 406K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 447K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ✅ | 423K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.9M | ✅ | 390K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 442K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ✅ | 444K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ✅ | 461K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.7M | ✅ | 449K | 🟢 **-98%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.8M | ✅ | 428K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.1M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 62.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 43.9M | ✅ | 524K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.4M | ✅ | 522K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 506K | 🟢 **-99%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.4M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 58.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 51.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.8M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.9M | ✅ | 1.9M | 🟢 **-97%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.1M | ✅ | 577K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.4M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.8M | ✅ | 542K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 718K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 711K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.3M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.8M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 56.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 71.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 62.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 158.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 677K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 174.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 48.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.0M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 32.8M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 45.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 59.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.2M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.4M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.8M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 52.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 48.8M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.1M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.4M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.1M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.2M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.3M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 38.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 38.0M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 63.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.2M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.4M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 59.4M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 182.5M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 179.2M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 180.9M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 182.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 180.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 180.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 181.0M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 183.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.5M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 66.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 59.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 33.5M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 56.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 61.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 73.8M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 41.8M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 40.6M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 77.0M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.5M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 50.5M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.6M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 58.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 44.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 23.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 61.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 62.2M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.8M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 54.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 56.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.1M | ✅ | 660K | 🟢 **-98%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.9M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 57.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 51.7M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 50.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 52.4M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 65.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.5M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.0M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 56.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 698K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 60.5M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 45.8M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.9M | ✅ | 727K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 759K | 🟢 **-98%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 180.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.2M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.4M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 47.6M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 687K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 681K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 681K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.2M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.4M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 40.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 49.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.4M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.0M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 60.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 83.0M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.6M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 37.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.7M | ✅ | 658K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ✅ | 559K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.1M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 56.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 56.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 56.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 58.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 57.9M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 55.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 58.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 58.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 46.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 58.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 157.9M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.4M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 43.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.3M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.6M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 48.6M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.4M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.4M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 62.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 47.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 84.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 534K | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 605K | 🟢 **-98%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.6M | ✅ | 573K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 53.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 138.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.0M | ✅ | 499K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 600K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 597K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.4M | ✅ | 582K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.6M | ✅ | 563K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 38.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ✅ | 572K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 39.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.8M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.4M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 741K | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 736K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 735K | 🟢 **-98%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 174.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.7M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 4.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.0M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.9M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 40.9M | ✅ | 743K | 🟢 **-98%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.0M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.7M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.0M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.2M | ✅ | 2.7M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.1M | ❌ | - | - |
