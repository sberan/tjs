# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.0M | 169/199 | 854K | 169 | 🟢 **-97%** |
| draft6 | 276 | ✅ 276 | 28.9M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 14.8M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 28/435 | 665K | 28 | 🟢 **-96%** |
| draft2020-12 | 448 | ✅ 448 | 19.8M | 28/448 | 694K | 28 | 🟢 **-96%** |
| **Total** | 1671 | 1670/1671 | 19.7M | 225/1671 | 826K | 225 | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **42.30x faster** (29 ns vs 1211 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.0M | ✅ | 702K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.5M | ✅ | 1.7M | 🟢 **-99%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.9M | ✅ | 1.8M | 🟢 **-99%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 3.3M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.0M | ✅ | 2.3M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 36.3M | ✅ | 378K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 55.3M | ✅ | 681K | 🟢 **-99%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 59.9M | ✅ | 1.7M | 🟢 **-97%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.0M | ✅ | 3.8M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 47.6M | ✅ | 1.1M | 🟢 **-98%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 43.9M | ✅ | 724K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.9M | ✅ | 697K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.4M | ✅ | 715K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 1.3M | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 361K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 48.2M | ✅ | 1.9M | 🟢 **-96%** |
| allOf.json | allOf | 4 | ✅ | 71.5M | ✅ | 464K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.5M | ✅ | 405K | 🟢 **-98%** |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 1.2M | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 3.2M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.5M | ✅ | 2.6M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 982K | 🟢 **-98%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ✅ | 998K | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 942K | 🟢 **-98%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 80.6M | ✅ | 339K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 62.9M | ✅ | 638K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.0M | ✅ | 581K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.7M | ✅ | 398K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 2.6M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 642K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 1.9M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 48.6M | ✅ | 1.5M | 🟢 **-97%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.6M | ✅ | 862K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.4M | ✅ | 124K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 90.6M | ✅ | 1.7M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.6M | ✅ | 832K | 🟢 **-97%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.7M | ✅ | 459K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.3M | ✅ | 721K | 🟢 **-96%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.2M | ✅ | 793K | 🟢 **-99%** |
| enum.json | simple enum validation | 2 | ✅ | 24.9M | ✅ | 1.6M | 🟢 **-94%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 57.6M | ✅ | 835K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.7M | ✅ | 2.2M | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 50.0M | ✅ | 672K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.1M | ✅ | 2.2M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.2M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.2M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.5M | ✅ | 1.3M | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 46.6M | ✅ | 1.1M | 🟢 **-98%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.4M | ✅ | 2.3M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.5M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 2.2M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 50.8M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 2.1M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ✅ | 1.9M | 🟢 **-96%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 2.0M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 77.3M | ✅ | 3.6M | 🟢 **-95%** |
| format.json | ipv4 format | 6 | ✅ | 162.7M | ✅ | 3.4M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 80.2M | ✅ | 3.4M | 🟢 **-96%** |
| format.json | hostname format | 6 | ✅ | 163.0M | ✅ | 3.4M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 77.4M | ✅ | 3.4M | 🟢 **-96%** |
| format.json | uri format | 6 | ✅ | 162.7M | ✅ | 3.3M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.7M | ✅ | 372K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 88.3M | ✅ | 985K | 🟢 **-99%** |
| items.json | an array of schemas for items | 6 | ✅ | 61.1M | ✅ | 932K | 🟢 **-98%** |
| items.json | items and subitems | 6 | ✅ | 34.7M | ✅ | 260K | 🟢 **-99%** |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 136K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 44.7M | ✅ | 2.2M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.8M | ✅ | 2.3M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.8M | ✅ | 1.8M | 🟢 **-97%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.1M | ✅ | 2.0M | 🟢 **-96%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.2M | ✅ | 1.6M | 🟢 **-97%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.0M | ✅ | 996K | 🟢 **-98%** |
| maximum.json | maximum validation | 4 | ✅ | 59.9M | ✅ | 1.5M | 🟢 **-98%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.1M | ✅ | 1.6M | 🟢 **-97%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 64.8M | ✅ | 1.4M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 47.6M | ✅ | 1.3M | 🟢 **-97%** |
| minItems.json | minItems validation | 4 | ✅ | 63.3M | ✅ | 1.7M | 🟢 **-97%** |
| minLength.json | minLength validation | 5 | ✅ | 50.3M | ✅ | 1.6M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 52.7M | ✅ | 1.9M | 🟢 **-96%** |
| minimum.json | minimum validation | 4 | ✅ | 65.3M | ✅ | 1.5M | 🟢 **-98%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 64.9M | ✅ | 1.4M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 55.7M | ✅ | 1.4M | 🟢 **-97%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.2M | ✅ | 1.8M | 🟢 **-97%** |
| multipleOf.json | by int | 3 | ✅ | 62.7M | ✅ | 1.3M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 58.9M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 54.1M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 758K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 2.1M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 821K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 52.9M | ✅ | 900K | 🟢 **-98%** |
| not.json | not more complex schema | 3 | ✅ | 55.4M | ✅ | 550K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 44.2M | ✅ | 895K | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.5M | ✅ | 1.2M | 🟢 **-97%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 1.3M | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 48.4M | ✅ | 463K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ✅ | 581K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.4M | ✅ | 328K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.3M | ✅ | 747K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.3M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.2M | ✅ | 394K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.9M | ✅ | 645K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 50.6M | ✅ | 2.2M | 🟢 **-96%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.6M | ✅ | 2.7M | 🟢 **-94%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 764K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 458K | 🟢 **-97%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.5M | ✅ | 635K | 🟢 **-96%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 1.4M | 🟢 **-92%** |
| properties.json | object properties validation | 6 | ✅ | 47.7M | ✅ | 777K | 🟢 **-98%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 585K | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 41.5M | ✅ | 189K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 1.8M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.7M | ✅ | 768K | 🟢 **-97%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.5M | ✅ | 736K | 🟢 **-98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.0M | ✅ | 676K | 🟢 **-99%** |
| ref.json | escaped pointer ref | 6 | ✅ | 38.6M | ✅ | 710K | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 44.9M | ✅ | 839K | 🟢 **-98%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 46.9M | ✅ | 872K | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.9M | ✅ | 317K | 🟢 **-99%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.7M | ✅ | 723K | 🟢 **-98%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.7M | ✅ | 692K | 🟢 **-98%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.6M | ✅ | 700K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.6M | ✅ | 846K | 🟢 **-98%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 53.5M | ✅ | 833K | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 55.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 55.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.6M | ✅ | 1.7M | 🟢 **-97%** |
| required.json | required default validation | 1 | ✅ | 147.0M | ✅ | 3.1M | 🟢 **-98%** |
| required.json | required with escaped characters | 2 | ✅ | 42.0M | ✅ | 602K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 44.5M | ✅ | 970K | 🟢 **-98%** |
| type.json | number type matches numbers | 9 | ✅ | 51.8M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | string type matches strings | 9 | ✅ | 51.4M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | object type matches objects | 7 | ✅ | 43.7M | ✅ | 989K | 🟢 **-98%** |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 957K | 🟢 **-98%** |
| type.json | boolean type matches booleans | 10 | ✅ | 48.8M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | null type matches only the null object | 10 | ✅ | 45.8M | ✅ | 927K | 🟢 **-98%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 48.7M | ✅ | 958K | 🟢 **-98%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 1.3M | 🟢 **-98%** |
| type.json | type: array or object | 5 | ✅ | 52.6M | ✅ | 946K | 🟢 **-98%** |
| type.json | type: array, object or null | 5 | ✅ | 59.0M | ✅ | 1.2M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 1.1M | 🟢 **-93%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.5M | ✅ | 689K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 685K | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 3.8M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.9M | ✅ | 1.3M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 1.1M | 🟢 **-98%** |
| optional/bignum.json | integer | 2 | ✅ | 75.1M | ✅ | 2.3M | 🟢 **-97%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 2.3M | 🟢 **-97%** |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 970K | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 3.3M | 🟢 **-96%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 859K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 3.3M | 🟢 **-96%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.2M | ✅ | 866K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 51.0M | ✅ | 788K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 789K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 789K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 786K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 18.2M | ✅ | 725K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 1.0M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.0M | ✅ | 776K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.7M | ✅ | 780K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 30.7M | ✅ | 1.4M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.7M | ✅ | 642K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ✅ | 774K | 🟢 **-94%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ✅ | 837K | 🟢 **-94%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.7M | ✅ | 781K | 🟢 **-97%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 649K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 651K | 🟢 **-97%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 619K | 🟢 **-92%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ✅ | 434K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ✅ | 1.1M | 🟢 **-90%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.2M | ✅ | 1.2M | 🟢 **-96%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.5M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.2M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.1M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 71.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.7M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.3M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 32.3M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 28.5M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 55.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.2M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 60.0M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 75.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 62.6M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 47.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 157.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 42.6M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.4M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 177.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 81.1M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 51.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 43.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 54.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 47.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 48.7M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 92.4M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 46.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 53.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 44.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 94.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 74.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 52.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 58.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 76.7M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 81.0M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 50.3M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 63.3M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 87.4M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.1M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.7M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 35.9M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 67.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.9M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 52.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 55.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 54.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 49.7M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 63.9M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.5M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 45.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 95.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.1M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.3M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 67.1M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 51.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 80.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 133.4M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 82.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 81.0M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 160.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 82.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 161.1M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 82.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 55.5M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 53.1M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 108.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 168.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 129.2M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 51.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 73.4M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.6M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 66.3M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.2M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 55.8M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 64.2M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 49.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 52.1M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 64.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.6M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 63.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 58.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 53.4M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 39.9M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ❌ | - | - |
| not.json | not | 2 | ✅ | 58.7M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 51.9M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 54.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 41.8M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 42.6M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.5M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.5M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 47.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.0M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.6M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 57.0M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 39.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.5M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.4M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.4M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.8M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 44.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 38.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 41.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.3M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 40.7M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 36.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 41.0M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 46.6M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 43.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.2M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 45.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 42.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 43.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.2M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 53.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 39.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 54.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.5M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.4M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 41.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 22.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 45.4M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 50.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 49.9M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 42.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 57.3M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 47.1M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 44.8M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 58.2M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 50.8M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 57.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 77.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 44.3M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 42.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 42.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 49.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 17.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 76.5M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 40.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 25.3M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 51.6M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 30.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.8M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 57.2M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 162.8M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 64.7M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.3M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 100.2M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 147.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 136.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 59.9M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 28.6M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 28.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 49.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 147.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 37.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 77.2M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.7M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 147.3M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 45.3M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 102.6M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 51.2M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 75.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 51.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 147.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 147.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 39.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 69.1M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 161.9M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 102.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 81.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 44.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 43.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 39.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 110.0M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 45.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 101.3M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 41.7M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 88.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 40.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 88.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 43.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 107.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 46.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 90.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 43.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 70.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 48.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 86.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 97.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 45.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 53.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 44.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 115.2M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 57.1M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 61.1M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 31.1M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 9.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 44.3M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 168.8M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 26.3M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 34.6M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 38.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.2M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 32.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 47.2M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 32.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 48.0M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 33.1M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 52.9M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 22.4M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 43.9M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 45.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 39.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 48.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 47.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 48.6M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 46.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 44.8M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 43.3M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 45.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 66.2M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 66.9M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 68.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 66.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 66.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 70.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 69.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 70.6M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 67.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 67.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 70.4M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 65.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 65.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 58.9M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 67.5M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 64.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 137.9M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 163.1M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 149.2M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 53.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 53.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 46.2M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 161.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 47.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 48.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 33.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 29.5M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 42.5M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 56.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 162.7M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 49.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 48.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 25.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.0M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.2M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 63.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 54.2M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 50.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 42.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 43.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 44.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 33.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 36.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 52.5M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 53.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 54.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 50.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 39.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 40.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 44.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 34.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 53.5M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 54.8M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 49.9M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 49.2M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 46.9M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 35.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 52.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 42.7M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 45.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 44.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 35.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 38.8M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 36.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 162.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 146.9M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 43.6M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 39.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 146.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 40.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 39.9M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 34.0M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 45.7M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 34.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 34.0M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 43.9M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 43.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 40.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 22.4M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.0M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 39.6M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.1M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 36.4M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 35.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 54.0M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 22.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 35.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 162.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 34.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 34.0M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 17.6M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 35.3M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 33.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.0M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 39.7M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 37.1M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 36.5M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 147.8M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 40.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 37.4M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 45.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 36.1M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 36.6M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 39.0M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 36.2M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 37.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 41.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 46.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 144.7M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 147.0M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 21.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 40.6M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 41.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 44.5M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 34.8M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 40.8M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 49.4M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 37.8M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 41.8M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 49.2M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 46.2M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 52.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 15.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 60.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 38.6M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 59.7M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 35.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 60.5M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 38.3M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 339K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 17.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 417K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 39.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 22.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 12.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 22.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 16.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 17.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 28.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 27.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 13.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 26.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 53.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 31.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 67.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.2M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.7M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.8M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.2M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 40.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 22.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 20.5M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 26.0M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.3M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.0M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 75.2M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 509K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 35.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.6M | ✅ | 566K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.7M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 33.4M | ✅ | 536K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 32.1M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 28.9M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 54.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 43.9M | ✅ | 706K | 🟢 **-98%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 705K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 53.2M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.7M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 60.1M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 32.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.3M | ✅ | 682K | 🟢 **-98%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.1M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.9M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 181.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 41.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 49.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 41.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 57.2M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 51.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 51.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 48.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 44.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 44.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 47.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.5M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 55.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 48.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 51.2M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 36.6M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 53.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.5M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.7M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.8M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.7M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 62.2M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 46.7M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.8M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.4M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.4M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 42.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 35.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.6M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 38.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.3M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 35.1M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 63.2M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 51.8M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.2M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 51.5M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.7M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 60.3M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 50.1M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 49.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 49.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 181.6M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 183.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 183.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 179.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 183.0M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 180.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 182.0M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 182.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 62.2M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 61.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 50.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 32.0M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 51.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 59.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.3M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.2M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 28.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 26.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.0M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 66.0M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 45.4M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 51.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 42.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 60.1M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.1M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 48.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 35.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.0M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 56.4M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.5M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 53.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 54.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 52.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 42.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 37.7M | ✅ | 650K | 🟢 **-98%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.2M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 51.9M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 59.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.0M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 47.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 41.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 50.0M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 36.0M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 61.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.5M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 54.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 44.7M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 695K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 56.2M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 48.3M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 52.2M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 20.9M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.1M | ✅ | 705K | 🟢 **-98%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.2M | ✅ | 735K | 🟢 **-98%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 177.4M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.1M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 28.0M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 46.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 44.3M | ✅ | 669K | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.2M | ✅ | 667K | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.1M | ✅ | 668K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.6M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.3M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 41.6M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.1M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.5M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.2M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 45.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 39.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 40.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 38.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.5M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 21.5M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.4M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 42.9M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.5M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 157.2M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.2M | ✅ | 627K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.5M | ✅ | 535K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 40.6M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.9M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 27.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.7M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 52.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 52.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.4M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.5M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 40.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 44.3M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 46.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 48.5M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 41.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 44.4M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 49.6M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 55.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 50.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 73.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 40.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 76.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ✅ | 506K | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.5M | ✅ | 581K | 🟢 **-98%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.3M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 82.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 32.8M | ✅ | 558K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 60.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.1M | ✅ | 481K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ✅ | 577K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ✅ | 576K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.6M | ✅ | 553K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.9M | ✅ | 527K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 34.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.4M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.4M | ✅ | 559K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.8M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 731K | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 39.3M | ✅ | 719K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 724K | 🟢 **-98%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 161.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 37.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 44.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 24.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.3M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 32.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.7M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 13.3M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.9M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.2M | ✅ | 2.7M | 🟢 **-95%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 24.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 41.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.8M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 21.7M | ✅ | 576K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.4M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.9M | ✅ | 548K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 28.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 723K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 715K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 64.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 147.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 680K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.3M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 62.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.1M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 54.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.8M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.5M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.7M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 68.1M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 52.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.2M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 57.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.5M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.3M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 35.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.8M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.4M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 37.6M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 68.4M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 62.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 52.9M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 54.6M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 182.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 182.3M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 148.4M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 148.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 175.8M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 167.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 183.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 181.8M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 172.9M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 173.3M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 167.0M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 148.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 183.7M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 155.2M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 106.4M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 170.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.1M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 58.6M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 73.5M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 48.1M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 46.6M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 169.7M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.5M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 54.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ✅ | 666K | 🟢 **-98%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.6M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.9M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.6M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 52.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.1M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 62.8M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 62.2M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 714K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 46.0M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 733K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.9M | ✅ | 758K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.4M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.4M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 47.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 685K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 686K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 685K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.3M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.3M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 82.9M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 41.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 156.8M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 658K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 562K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.3M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.4M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 55.5M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 60.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 58.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 59.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 58.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 54.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 59.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.5M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.5M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 44.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 24.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.2M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.1M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 64.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 84.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 536K | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 608K | 🟢 **-98%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ✅ | 573K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.2M | ✅ | 513K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 599K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 602K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 25.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.3M | ✅ | 584K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ✅ | 568K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 79.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.1M | ✅ | 574K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 44.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 50.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 748K | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.4M | ✅ | 742K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 44.1M | ✅ | 751K | 🟢 **-98%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.6M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 20.7M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.3M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.9M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 40.8M | ✅ | 750K | 🟢 **-98%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.8M | ✅ | 2.7M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ❌ | - | - |
