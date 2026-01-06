# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.3M | 169/199 | 817K | 169 | 🟢 **-97%** |
| draft6 | 276 | ✅ 276 | 29.4M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 14.4M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 28/435 | 669K | 28 | 🟢 **-96%** |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 28/448 | 698K | 28 | 🟢 **-96%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 225/1671 | 796K | 225 | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **45.82x faster** (27 ns vs 1256 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 675K | 🟢 **-91%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 89.9M | ✅ | 1.7M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.6M | ✅ | 1.7M | 🟢 **-99%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.9M | ✅ | 3.3M | 🟢 **-96%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 2.1M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 45.9M | ✅ | 368K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 57.3M | ✅ | 654K | 🟢 **-99%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 1.4M | 🟢 **-98%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.9M | ✅ | 3.7M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 1.1M | 🟢 **-97%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.0M | ✅ | 828K | 🟢 **-96%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 768K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 42.5M | ✅ | 787K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 81.0M | ✅ | 1.4M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.7M | ✅ | 387K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 1.8M | 🟢 **-97%** |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 441K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.4M | ✅ | 370K | 🟢 **-99%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.9M | ✅ | 3.2M | 🟢 **-96%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 2.6M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.9M | ✅ | 940K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 954K | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 911K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 346K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 81.6M | ✅ | 571K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 500K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.4M | ✅ | 366K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 162.0M | ✅ | 2.5M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 583K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 1.9M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 1.8M | 🟢 **-97%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ✅ | 818K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ✅ | 123K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 1.7M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.2M | ✅ | 826K | 🟢 **-98%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.4M | ✅ | 434K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 662K | 🟢 **-96%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.2M | ✅ | 776K | 🟢 **-98%** |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 1.7M | 🟢 **-98%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 712K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 2.1M | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 617K | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 61.1M | ✅ | 2.0M | 🟢 **-97%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.0M | ✅ | 1.1M | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ✅ | 896K | 🟢 **-99%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 1.1M | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.7M | ✅ | 967K | 🟢 **-99%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 1.8M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.6M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 1.9M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.7M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 1.6M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 1.5M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 93.0M | ✅ | 3.4M | 🟢 **-96%** |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 3.1M | 🟢 **-97%** |
| format.json | hostname format | 6 | ✅ | 162.7M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 92.8M | ✅ | 3.1M | 🟢 **-97%** |
| format.json | uri format | 6 | ✅ | 162.1M | ✅ | 3.0M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 319K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 65.2M | ✅ | 941K | 🟢 **-99%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.6M | ✅ | 915K | 🟢 **-99%** |
| items.json | items and subitems | 6 | ✅ | 13.6M | ✅ | 236K | 🟢 **-98%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 133K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 2.1M | 🟢 **-97%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 2.2M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.6M | ✅ | 1.8M | 🟢 **-98%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.3M | ✅ | 1.9M | 🟢 **-97%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.9M | ✅ | 1.6M | 🟢 **-97%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.1M | ✅ | 1.0M | 🟢 **-98%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 1.5M | 🟢 **-98%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 1.6M | 🟢 **-98%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 75.4M | ✅ | 1.4M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 1.4M | 🟢 **-98%** |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 1.8M | 🟢 **-98%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 1.5M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 1.8M | 🟢 **-97%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 1.5M | 🟢 **-98%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 1.4M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ✅ | 916K | 🟢 **-99%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ✅ | 1.7M | 🟢 **-98%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 888K | 🟢 **-99%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 759K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 73.9M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 815K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 832K | 🟢 **-99%** |
| not.json | not more complex schema | 3 | ✅ | 60.6M | ✅ | 527K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 848K | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 1.1M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 1.3M | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 59.4M | ✅ | 468K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ✅ | 563K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 294K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 743K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ✅ | 341K | 🟢 **-99%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.2M | ✅ | 359K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 71.8M | ✅ | 467K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 2.1M | 🟢 **-96%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 2.6M | 🟢 **-90%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ✅ | 736K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 433K | 🟢 **-97%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.8M | ✅ | 602K | 🟢 **-96%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 1.2M | 🟢 **-94%** |
| properties.json | object properties validation | 6 | ✅ | 53.9M | ✅ | 759K | 🟢 **-99%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 580K | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 50.6M | ✅ | 184K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 48.8M | ✅ | 1.7M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.9M | ✅ | 716K | 🟢 **-97%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.6M | ✅ | 692K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.0M | ✅ | 610K | 🟢 **-99%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 695K | 🟢 **-99%** |
| ref.json | nested refs | 2 | ✅ | 23.9M | ✅ | 899K | 🟢 **-96%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.2M | ✅ | 846K | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ✅ | 332K | 🟢 **-99%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.0M | ✅ | 696K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.3M | ✅ | 711K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.3M | ✅ | 723K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 69.4M | ✅ | 924K | 🟢 **-99%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.7M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 926K | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 1.6M | 🟢 **-98%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 2.9M | 🟢 **-97%** |
| required.json | required with escaped characters | 2 | ✅ | 53.2M | ✅ | 493K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.7M | ✅ | 830K | 🟢 **-99%** |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 999K | 🟢 **-99%** |
| type.json | string type matches strings | 9 | ✅ | 69.4M | ✅ | 1.0M | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 834K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 862K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.3M | ✅ | 860K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 808K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.3M | ✅ | 804K | 🟢 **-99%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 1.0M | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 72.4M | ✅ | 856K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 1.1M | 🟢 **-99%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 1.5M | 🟢 **-91%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 695K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 685K | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.9M | ✅ | 3.5M | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 1.3M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 77.2M | ✅ | 1.1M | 🟢 **-99%** |
| optional/bignum.json | integer | 2 | ✅ | 88.1M | ✅ | 2.4M | 🟢 **-97%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 2.5M | 🟢 **-97%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 1.0M | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.5M | 🟢 **-96%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 845K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.4M | 🟢 **-96%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 651K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 785K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.2M | ✅ | 836K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 808K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 823K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 734K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 1.0M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 827K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 793K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 1.3M | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 638K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.4M | ✅ | 810K | 🟢 **-95%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 731K | 🟢 **-95%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.7M | ✅ | 634K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 558K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 658K | 🟢 **-97%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 605K | 🟢 **-92%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ✅ | 439K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ✅ | 1.0M | 🟢 **-91%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.9M | ✅ | 1.2M | 🟢 **-97%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 15.4M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 151.4M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 39.7M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.8M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 80.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 38.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 59.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.3M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 70.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 42.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 64.2M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 85.3M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 76.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 78.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.5M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 110.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 99.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 32.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 62.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 90.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 60.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 48.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 94.9M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 74.3M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.8M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.5M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.7M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 70.6M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 16.3M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 111.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.2M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 100.8M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 161.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.4M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 93.0M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 92.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 58.1M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 106.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 64.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.2M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 58.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 78.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.1M | ❌ | - | - |
| not.json | not | 2 | ✅ | 76.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 70.6M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 54.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.7M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 90.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.2M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 66.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.0M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 55.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 56.4M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 48.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.1M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.8M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 56.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.1M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.0M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.3M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 51.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 90.0M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 90.0M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 52.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.1M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 68.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 47.0M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 64.0M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 54.9M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.2M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 77.0M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 72.2M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.7M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.2M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 8.2M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 30.5M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.2M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 27.3M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 56.2M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.9M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 54.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 43.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 25.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 60.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 39.1M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 45.6M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 22.9M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 60.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 48.0M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.6M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 54.5M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 107.9M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 53.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 117.2M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 45.5M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 128.2M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 54.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 39.5M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 54.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 44.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 98.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.8M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 83.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 113.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 51.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 47.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 46.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 94.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 47.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 48.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 43.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 47.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 91.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 51.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 107.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 33.6M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 101.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 54.3M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 41.9M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.3M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 56.7M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.6M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 36.8M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.2M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 9.9M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 53.0M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 44.9M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 53.4M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 48.5M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 41.0M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.5M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 56.9M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 163.0M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 56.9M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 160.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 56.7M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 162.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 56.9M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 163.6M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 57.0M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 162.3M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 56.9M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 162.7M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 56.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 163.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 56.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 159.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 56.5M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 164.5M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 151.9M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 53.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 49.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 53.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 34.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 56.7M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 41.5M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 96.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 61.3M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 101.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 44.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.2M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.7M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 53.4M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 56.1M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 51.3M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 51.3M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 44.4M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 43.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 43.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 38.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 37.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 50.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 49.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 50.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 51.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 43.7M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 42.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 45.0M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 36.0M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 49.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 51.5M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 53.0M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 50.7M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 48.4M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.5M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 53.4M | ❌ | - | - |
| not.json | not | 2 | ✅ | 53.5M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 49.6M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 48.3M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 40.4M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.2M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.3M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 55.5M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 53.9M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 46.0M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 48.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 60.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 48.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 48.0M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 35.4M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 53.3M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 38.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.5M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 43.0M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 42.7M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.9M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.5M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.5M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 42.1M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.7M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 38.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 39.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 51.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 29.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 60.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.1M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 30.9M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 32.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 19.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 42.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 32.6M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 40.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 21.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 40.3M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 40.5M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 60.4M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 47.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 39.7M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 41.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 36.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 37.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 35.0M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 33.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 37.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 37.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 53.9M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 49.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 35.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 25.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 26.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 36.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 32.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 47.5M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 56.9M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 60.3M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 56.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 46.7M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 49.1M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 43.9M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 46.6M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 46.3M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 45.8M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 53.7M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 48.2M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 50.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 58.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 51.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 48.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 59.2M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 59.6M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 46.9M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 55.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 55.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 44.4M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 349K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 24.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 22.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 13.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 7.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 27.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 13.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 26.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 50.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 29.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 54.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 29.2M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 11.7M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.7M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.6M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.9M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 30.4M | ✅ | 511K | 🟢 **-98%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 20.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.0M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 76.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.5M | ✅ | 573K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 21.7M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 17.3M | ✅ | 540K | 🟢 **-97%** |
| allOf.json | allOf | 4 | ✅ | 38.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 69.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 78.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.3M | ✅ | 712K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.2M | ✅ | 710K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.5M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.5M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 49.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 679K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.3M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.8M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 84.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 70.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 71.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.7M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 70.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 69.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 61.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 89.9M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 80.4M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 74.2M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.0M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 61.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.3M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.8M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.4M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.2M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 76.7M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.3M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.9M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 62.1M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 89.6M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 89.5M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 72.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 80.2M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 72.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 79.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 89.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 74.9M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 72.7M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 72.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 72.7M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 72.7M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 72.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 79.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 72.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 72.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 80.2M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 80.4M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 74.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.6M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.5M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.7M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 73.8M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.4M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 52.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 7.7M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.5M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.4M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.9M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.4M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.9M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 71.7M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 56.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.5M | ✅ | 648K | 🟢 **-99%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.6M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 74.9M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 55.0M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.5M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 35.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 63.7M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 690K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 72.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 67.7M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 65.5M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 49.7M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.0M | ✅ | 706K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.7M | ✅ | 736K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 83.8M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 85.1M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.4M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 60.7M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.4M | ✅ | 674K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 670K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.3M | ✅ | 669K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 71.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.1M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 50.0M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.8M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.6M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.9M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 66.5M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.8M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.5M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ✅ | 648K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.3M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 550K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.1M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 85.1M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 85.1M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 49.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.3M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 66.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 56.1M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 62.2M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 62.2M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 68.6M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 73.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 77.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.4M | ✅ | 528K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.1M | ✅ | 590K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 70.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.8M | ✅ | 567K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.6M | ✅ | 489K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 587K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ✅ | 586K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 553K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ✅ | 527K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ✅ | 567K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.4M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.0M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 82.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 731K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 730K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 734K | 🟢 **-99%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.8M | ✅ | 2.6M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 72.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 60.8M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 12.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 22.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.6M | ✅ | 585K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 67.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.2M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 29.4M | ✅ | 549K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 36.5M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 26.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 61.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.4M | ✅ | 718K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ✅ | 715K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.3M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 138.6M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.7M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 100.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.4M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.2M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 65.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 43.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 83.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 84.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.4M | ✅ | 693K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.3M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 67.7M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 63.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 30.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 55.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 70.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 70.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 61.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 50.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.2M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 76.1M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 73.8M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.0M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 77.7M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 73.9M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 69.1M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.7M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.4M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 89.8M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 45.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.8M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 50.3M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 15.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.3M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 25.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.6M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.5M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.5M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 75.7M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 70.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.7M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 70.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 60.2M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.0M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 64.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 58.3M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.7M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 82.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 88.3M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 73.5M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 73.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 73.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 73.1M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 73.3M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 71.7M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 71.9M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 72.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.0M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.4M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 74.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 74.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.4M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 52.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.4M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 11.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.0M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.1M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 70.4M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 74.3M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.5M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 56.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 58.3M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 74.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 70.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 56.7M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.7M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.2M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 33.9M | ✅ | 672K | 🟢 **-98%** |
| minContains.json | minContains = 0 | 2 | ✅ | 87.7M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 70.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 74.5M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 70.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 51.1M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.0M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.8M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 66.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.5M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 75.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 72.4M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.5M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.6M | ✅ | 719K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 72.5M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 68.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 66.3M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 51.9M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 58.7M | ✅ | 742K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.7M | ✅ | 766K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 83.2M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 84.7M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.1M | ✅ | 701K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 83.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 62.6M | ✅ | 691K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 62.5M | ✅ | 698K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.5M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.0M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 50.0M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.0M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 53.9M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.2M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 62.4M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 54.6M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 77.9M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.1M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 50.8M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 48.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.9M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 43.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.7M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.8M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 84.8M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 62.4M | ✅ | 668K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.7M | ✅ | 559K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.5M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 71.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.6M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.3M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 84.8M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 84.7M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 48.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 61.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 80.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 63.6M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.3M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 58.8M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 61.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 61.2M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.7M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 73.4M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 66.3M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 65.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 56.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 75.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.7M | ✅ | 536K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.1M | ✅ | 605K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 83.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 74.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.0M | ✅ | 583K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 85.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.5M | ✅ | 505K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.1M | ✅ | 598K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 600K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.4M | ✅ | 588K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ✅ | 566K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.7M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 58.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ✅ | 568K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 50.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.8M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 85.8M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 751K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.3M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 58.5M | ✅ | 747K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 58.4M | ✅ | 745K | 🟢 **-99%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 89.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 9.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 10.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.4M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.4M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 48.4M | ✅ | 755K | 🟢 **-98%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.8M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 61.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.2M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 63.4M | ✅ | 2.7M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.0M | ❌ | - | - |
