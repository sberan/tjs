# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 25.9M | 169/199 | 863K | 169 | 🟢 **-97%** |
| draft6 | 276 | ✅ 276 | 28.6M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 15.5M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 18.3M | 28/435 | 681K | 28 | 🟢 **-96%** |
| draft2020-12 | 448 | ✅ 448 | 18.4M | 28/448 | 687K | 28 | 🟢 **-96%** |
| **Total** | 1671 | 1670/1671 | 19.3M | 225/1671 | 834K | 225 | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **41.58x faster** (29 ns vs 1199 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 676K | 🟢 **-91%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 76.7M | ✅ | 1.7M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.6M | ✅ | 1.8M | 🟢 **-99%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 79.1M | ✅ | 3.2M | 🟢 **-96%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 2.1M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 42.2M | ✅ | 383K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.3M | ✅ | 669K | 🟢 **-99%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 63.9M | ✅ | 1.3M | 🟢 **-98%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 3.6M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 1.1M | 🟢 **-98%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 42.2M | ✅ | 804K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.6M | ✅ | 746K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 42.5M | ✅ | 787K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 76.7M | ✅ | 1.4M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.8M | ✅ | 399K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 47.8M | ✅ | 1.8M | 🟢 **-96%** |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 470K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 25.8M | ✅ | 392K | 🟢 **-98%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.8M | ✅ | 3.1M | 🟢 **-96%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 2.5M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 1.0M | 🟢 **-98%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 993K | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.7M | ✅ | 989K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.5M | ✅ | 351K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 68.7M | ✅ | 683K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.0M | ✅ | 585K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.1M | ✅ | 398K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 2.7M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 67.8M | ✅ | 610K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 2.2M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 49.6M | ✅ | 1.9M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.5M | ✅ | 901K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.5M | ✅ | 128K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 90.8M | ✅ | 1.8M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 32.3M | ✅ | 867K | 🟢 **-97%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.9M | ✅ | 464K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.1M | ✅ | 733K | 🟢 **-93%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.2M | ✅ | 792K | 🟢 **-98%** |
| enum.json | simple enum validation | 2 | ✅ | 65.5M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 831K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.3M | ✅ | 2.2M | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 15.1M | ✅ | 665K | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 52.7M | ✅ | 2.2M | 🟢 **-96%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 111.8M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.7M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 104.1M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.3M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ✅ | 2.4M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ✅ | 1.5M | 🟢 **-98%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 2.3M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.0M | ✅ | 1.5M | 🟢 **-97%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.2M | ✅ | 2.0M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 51.9M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.8M | ✅ | 1.9M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 72.8M | ✅ | 3.4M | 🟢 **-95%** |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ✅ | 3.2M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 72.4M | ✅ | 3.1M | 🟢 **-96%** |
| format.json | hostname format | 6 | ✅ | 158.1M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 71.5M | ✅ | 3.1M | 🟢 **-96%** |
| format.json | uri format | 6 | ✅ | 156.7M | ✅ | 3.2M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.5M | ✅ | 362K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 72.6M | ✅ | 1.0M | 🟢 **-99%** |
| items.json | an array of schemas for items | 6 | ✅ | 60.5M | ✅ | 961K | 🟢 **-98%** |
| items.json | items and subitems | 6 | ✅ | 29.5M | ✅ | 244K | 🟢 **-99%** |
| items.json | nested items | 3 | ✅ | 12.6M | ✅ | 138K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 66.0M | ✅ | 2.2M | 🟢 **-97%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.3M | ✅ | 2.2M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 66.3M | ✅ | 1.8M | 🟢 **-97%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.6M | ✅ | 2.1M | 🟢 **-96%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.8M | ✅ | 1.7M | 🟢 **-97%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.0M | ✅ | 1.1M | 🟢 **-98%** |
| maximum.json | maximum validation | 4 | ✅ | 66.6M | ✅ | 1.6M | 🟢 **-98%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.0M | ✅ | 1.7M | 🟢 **-97%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.6M | ✅ | 1.5M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 61.7M | ✅ | 1.6M | 🟢 **-97%** |
| minItems.json | minItems validation | 4 | ✅ | 62.2M | ✅ | 1.9M | 🟢 **-97%** |
| minLength.json | minLength validation | 5 | ✅ | 51.4M | ✅ | 1.6M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.0M | ✅ | 2.0M | 🟢 **-96%** |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ✅ | 1.6M | 🟢 **-98%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 66.8M | ✅ | 1.5M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 62.0M | ✅ | 1.4M | 🟢 **-98%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.6M | ✅ | 1.8M | 🟢 **-97%** |
| multipleOf.json | by int | 3 | ✅ | 65.1M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 60.8M | ✅ | 1.3M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 56.1M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.0M | ✅ | 777K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 847K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 60.2M | ✅ | 897K | 🟢 **-99%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 558K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 47.2M | ✅ | 901K | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 51.8M | ✅ | 1.2M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 76.7M | ✅ | 1.3M | 🟢 **-98%** |
| oneOf.json | oneOf | 4 | ✅ | 33.5M | ✅ | 498K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.3M | ✅ | 597K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 318K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 65.2M | ✅ | 761K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 22.8M | ✅ | 388K | 🟢 **-98%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.1M | ✅ | 382K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.1M | ✅ | 677K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 49.7M | ✅ | 2.1M | 🟢 **-96%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 23.5M | ✅ | 2.5M | 🟢 **-89%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ✅ | 758K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 453K | 🟢 **-97%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 635K | 🟢 **-96%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.1M | ✅ | 1.3M | 🟢 **-92%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 751K | 🟢 **-98%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 578K | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 194K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 61.5M | ✅ | 1.7M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 776K | 🟢 **-97%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.7M | ✅ | 749K | 🟢 **-98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.8M | ✅ | 707K | 🟢 **-99%** |
| ref.json | escaped pointer ref | 6 | ✅ | 38.7M | ✅ | 723K | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 36.9M | ✅ | 947K | 🟢 **-97%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.5M | ✅ | 875K | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 66.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ✅ | 336K | 🟢 **-99%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.2M | ✅ | 759K | 🟢 **-98%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.2M | ✅ | 731K | 🟢 **-98%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.0M | ✅ | 730K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 66.8M | ✅ | 936K | 🟢 **-99%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 66.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 66.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.8M | ✅ | 954K | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 45.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.5M | ✅ | 1.7M | 🟢 **-97%** |
| required.json | required default validation | 1 | ✅ | 76.7M | ✅ | 3.1M | 🟢 **-96%** |
| required.json | required with escaped characters | 2 | ✅ | 46.5M | ✅ | 578K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 52.4M | ✅ | 885K | 🟢 **-98%** |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | string type matches strings | 9 | ✅ | 59.1M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | object type matches objects | 7 | ✅ | 52.8M | ✅ | 898K | 🟢 **-98%** |
| type.json | array type matches arrays | 7 | ✅ | 55.8M | ✅ | 933K | 🟢 **-98%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.2M | ✅ | 969K | 🟢 **-98%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.1M | ✅ | 875K | 🟢 **-98%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.7M | ✅ | 848K | 🟢 **-99%** |
| type.json | type as array with one item | 2 | ✅ | 66.6M | ✅ | 1.3M | 🟢 **-98%** |
| type.json | type: array or object | 5 | ✅ | 58.4M | ✅ | 871K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 62.1M | ✅ | 1.2M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 1.5M | 🟢 **-91%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.6M | ✅ | 709K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ✅ | 719K | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.0M | ✅ | 3.7M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.3M | ✅ | 1.3M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.2M | ✅ | 1.1M | 🟢 **-98%** |
| optional/bignum.json | integer | 2 | ✅ | 74.5M | ✅ | 2.6M | 🟢 **-97%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 2.5M | 🟢 **-97%** |
| optional/bignum.json | string | 1 | ✅ | 56.5M | ✅ | 994K | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 3.4M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 52.9M | ✅ | 855K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 3.5M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.8M | ✅ | 861K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 56.1M | ✅ | 822K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.5M | ✅ | 822K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 818K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.5M | ✅ | 819K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.2M | ✅ | 744K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 1.1M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.2M | ✅ | 815K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.2M | ✅ | 836K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 1.4M | 🟢 **-94%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.5M | ✅ | 650K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 810K | 🟢 **-95%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 896K | 🟢 **-94%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 812K | 🟢 **-97%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 662K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.3M | ✅ | 698K | 🟢 **-96%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.3M | ✅ | 671K | 🟢 **-92%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 425K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.0M | ✅ | 1.1M | 🟢 **-90%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.0M | ✅ | 1.2M | 🟢 **-97%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.5M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.1M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.2M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 151.2M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 68.5M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 162.0M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.3M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.3M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.4M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.1M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 151.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 38.4M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.2M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.3M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 68.9M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.0M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 151.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 83.6M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 61.8M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 68.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.2M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.0M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.4M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.6M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.2M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.8M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.9M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.0M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 15.3M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 72.5M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.5M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 57.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 58.9M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 75.6M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 119.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 77.8M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 156.4M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 75.6M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 156.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 75.1M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 126.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 75.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 51.1M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 50.3M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 96.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.6M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 52.8M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 56.7M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.8M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.8M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 70.4M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 60.8M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.5M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 48.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.2M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.0M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 33.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.5M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.6M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 66.6M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 70.5M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 67.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 70.1M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 65.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 49.1M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 80.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.4M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 45.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.8M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.3M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 31.0M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 12.4M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 52.6M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.9M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.7M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 52.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.2M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 80.7M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 80.7M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 50.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 61.9M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 61.5M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 54.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 57.7M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 56.4M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 69.6M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 60.4M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 68.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 58.5M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.8M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 68.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.9M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.7M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.8M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.9M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 60.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.9M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 76.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 149.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 37.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 23.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 52.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.0M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.6M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 59.9M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 74.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 43.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 32.3M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 69.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 48.9M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 62.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.8M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 62.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 94.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 61.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 59.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 110.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 64.5M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 99.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 59.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 62.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 98.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.3M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 52.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 76.0M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 68.2M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 35.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 34.2M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 61.7M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 89.8M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.8M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 45.3M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 54.6M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.4M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.4M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 73.7M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 72.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 64.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.2M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.1M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 86.8M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 79.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 41.0M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 86.5M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 86.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 86.8M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 87.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 86.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 75.5M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 87.0M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 86.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 85.0M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 87.1M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 88.4M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.6M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 74.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 88.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 72.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.1M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 51.9M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.8M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 63.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 22.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 76.6M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.2M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.7M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 57.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.7M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.7M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 55.7M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.7M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 58.0M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 69.8M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.4M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 66.6M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 51.2M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.4M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.5M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 85.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.3M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.3M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 51.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.8M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 54.6M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 47.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 49.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.5M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 45.9M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.8M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.6M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.9M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 66.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 84.9M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 84.8M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 49.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 81.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 64.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 63.6M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 55.4M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 60.0M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 62.1M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 60.8M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 72.2M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 66.3M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 72.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 83.9M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 50.8M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.6M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 346K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 422K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 62.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 19.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 42.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 70.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.8M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.4M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 57.3M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 57.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.8M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.1M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 151.5M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 66.9M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 52.6M | ✅ | 514K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.4M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.9M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 579K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.4M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 545K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 38.2M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ✅ | 725K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 718K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.8M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.6M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 116.2M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.0M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.2M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 69.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 47.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 69.7M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 72.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 80.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ✅ | 695K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.4M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.9M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 61.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 38.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 70.4M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 68.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 61.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 61.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 59.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 66.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 39.7M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 63.2M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 84.6M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 85.0M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 67.2M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 71.4M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 65.5M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.2M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.0M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 84.4M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 51.3M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.7M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.0M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.9M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 72.2M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 65.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 58.9M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 68.1M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.7M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.0M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.5M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 62.3M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 59.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 78.2M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 80.5M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 70.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 68.7M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 69.9M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 69.9M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 64.8M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 71.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 70.1M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 70.1M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 70.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 68.9M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 77.1M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 76.0M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 75.9M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.4M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 76.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 68.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 44.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.8M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 50.3M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 62.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.6M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 65.1M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 58.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 11.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.8M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.3M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 83.5M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 70.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 50.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 52.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 44.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 64.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 33.9M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 83.5M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 51.0M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.3M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 50.0M | ✅ | 661K | 🟢 **-99%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 83.5M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 63.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.3M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 62.9M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 27.1M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 53.7M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.8M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 65.2M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.8M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 60.6M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 696K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 55.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 62.8M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 60.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 48.4M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.8M | ✅ | 730K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ✅ | 763K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 80.6M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 16.0M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 57.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 59.8M | ✅ | 687K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 79.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ✅ | 684K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.2M | ✅ | 688K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.4M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 45.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.4M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.5M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 48.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.3M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.2M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.8M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 43.4M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.4M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.2M | ✅ | 651K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.5M | ✅ | 560K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 52.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 38.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.5M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.5M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 46.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 38.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.7M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 80.6M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 80.8M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 48.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 59.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 61.5M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 54.4M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 57.6M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 59.5M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.9M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 60.2M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 69.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 71.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 42.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 74.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 38.9M | ✅ | 529K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 54.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 46.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.2M | ✅ | 598K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 67.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.2M | ✅ | 571K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 63.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.8M | ✅ | 483K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.3M | ✅ | 589K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.9M | ✅ | 591K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.1M | ✅ | 553K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.1M | ✅ | 529K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.1M | ✅ | 569K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 69.2M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 58.4M | ✅ | 742K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 736K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 65.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 750K | 🟢 **-99%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.1M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 65.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 84.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 53.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 68.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.8M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 66.4M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.3M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 34.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 60.5M | ✅ | 2.5M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 48.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.3M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 52.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 37.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 166.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 21.9M | ✅ | 568K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 65.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.0M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 23.2M | ✅ | 536K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 32.4M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 26.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 72.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 165.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.4M | ✅ | 714K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.9M | ✅ | 706K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 79.3M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.0M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.9M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 129.9M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 75.0M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.9M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 66.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 31.7M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 58.0M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 67.1M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 83.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 84.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 65.6M | ✅ | 684K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.4M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 70.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 52.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 70.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 69.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 63.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 26.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 27.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 63.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 61.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 55.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 33.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 51.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 76.2M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 87.5M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 87.9M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 77.3M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 69.8M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 69.6M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 53.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.8M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 52.7M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 88.4M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.6M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 46.4M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 55.6M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 34.1M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 30.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 11.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 15.3M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 13.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 5.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 4.6M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 5.3M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 5.1M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 6.1M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 7.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 21.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 5.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 72.4M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.9M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 75.6M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 70.4M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 62.5M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 66.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 62.4M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 72.9M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 62.1M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.7M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 79.0M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 79.4M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 72.5M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 72.7M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 72.8M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 72.7M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 72.7M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 72.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 72.7M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 72.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 65.5M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 72.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 72.7M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 72.5M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.6M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.2M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.7M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 73.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 73.1M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 66.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 72.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.2M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 46.7M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 89.0M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.1M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 75.9M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 37.0M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 34.9M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 71.2M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 74.1M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.7M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 56.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 65.2M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 60.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 76.3M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.1M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.0M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.7M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 74.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.3M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 89.0M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 64.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 59.4M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.3M | ✅ | 660K | 🟢 **-99%** |
| minContains.json | minContains = 0 | 2 | ✅ | 88.5M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 69.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.5M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 74.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 70.2M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 76.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.4M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 62.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 51.7M | ✅ | 708K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 67.6M | ❌ | - | - |
| not.json | not | 2 | ✅ | 70.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 65.2M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 65.1M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 25.2M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.0M | ✅ | 723K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 59.8M | ✅ | 748K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.7M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 84.3M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.6M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 687K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 84.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 65.8M | ✅ | 686K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.3M | ✅ | 689K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.9M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 71.3M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.7M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 54.7M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 15.5M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.4M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.2M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 57.3M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 50.8M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.4M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.0M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 46.4M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.3M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 40.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 40.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 68.7M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 36.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 20.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.6M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 43.6M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 38.9M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 26.1M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 35.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 39.6M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 40.0M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 83.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 65.4M | ✅ | 658K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 20.8M | ✅ | 562K | 🟢 **-97%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.8M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 25.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 25.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 32.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 32.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 71.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 26.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 41.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 40.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 40.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 32.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 31.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 33.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 33.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 32.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 74.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.7M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 30.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 30.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 26.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 20.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 31.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 56.2M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 83.8M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 84.3M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 39.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 61.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 64.3M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 63.8M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 55.8M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 59.3M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 61.3M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 60.7M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.7M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 74.2M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 62.2M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 72.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 79.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 44.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 69.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 76.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 36.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 28.3M | ✅ | 533K | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 44.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 37.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 37.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 31.9M | ✅ | 602K | 🟢 **-98%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 22.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 9.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 85.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 74.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 28.6M | ✅ | 573K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 87.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 18.5M | ✅ | 508K | 🟢 **-97%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 25.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 20.7M | ✅ | 597K | 🟢 **-97%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 21.1M | ✅ | 595K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 20.8M | ✅ | 581K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 16.3M | ✅ | 560K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 18.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 18.7M | ✅ | 567K | 🟢 **-97%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 75.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 44.5M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 74.4M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 56.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 80.7M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 83.5M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.1M | ✅ | 741K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 74.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.6M | ✅ | 745K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.4M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.3M | ✅ | 744K | 🟢 **-99%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 79.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 53.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 88.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 40.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 45.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 30.2M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 6.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 30.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 6.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 6.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.0M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 50.5M | ✅ | 745K | 🟢 **-99%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.6M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 66.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 80.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.9M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 27.6M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 64.3M | ✅ | 2.7M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 40.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 74.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 8.3M | ❌ | - | - |
