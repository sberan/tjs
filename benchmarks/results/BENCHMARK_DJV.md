# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 150/199 | 3.5M | 150 | 🟢 **-87%** |
| draft6 | 276 | ✅ 276 | 29.7M | 208/276 | 3.7M | 208 | 🟢 **-88%** |
| draft7 | 313 | ✅ 313 | 16.3M | 219/313 | 4.0M | 219 | 🟢 **-75%** |
| draft2019-09 | 435 | ✅ 435 | 17.5M | 254/435 | 4.6M | 254 | 🟢 **-74%** |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 244/448 | 4.6M | 244 | 🟢 **-76%** |
| **Total** | 1671 | 1670/1671 | 19.8M | 1075/1671 | 4.1M | 1075 | 🟢 **-79%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **9.77x faster** (25 ns vs 244 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.7M | ✅ | 7.1M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.1M | ✅ | 86.8M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.8M | ✅ | 20.7M | 🟢 **-84%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 114.0M | 🟢 **-34%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 126.1M | ✅ | 93.0M | 🟢 **-26%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ✅ | 3.5M | 🟢 **-90%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 68.4M | ✅ | 6.9M | 🟢 **-90%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 9.3M | 🟢 **-83%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.2M | ✅ | 103.7M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.8M | ✅ | 14.5M | 🟢 **-68%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.1M | ✅ | 6.9M | 🟢 **-85%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.2M | ✅ | 8.1M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 48.1M | ✅ | 6.5M | 🟢 **-86%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.8M | ✅ | 103.6M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 3.5M | 🟢 **-91%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 46.7M | ✅ | 59.6M | 🔴 **+27%** |
| allOf.json | allOf | 4 | ✅ | 49.1M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.0M | ✅ | 1.4M | 🟢 **-94%** |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 6.4M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 103.8M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 103.6M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 7.1M | 🟢 **-87%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.1M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 4.8M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 60.0M | ✅ | 6.4M | 🟢 **-89%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.1M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.1M | ✅ | 12.8M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 4.8M | 🟢 **-92%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.6M | 🟢 **-96%** |
| default.json | invalid string value for default | 2 | ✅ | 48.7M | ✅ | 2.7M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.7M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 92.4M | ✅ | 4.5M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 28.9M | ✅ | 2.5M | 🟢 **-91%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.7M | ✅ | 1.4M | 🟢 **-98%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.2M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.6M | ✅ | 6.1M | 🟢 **-89%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.4M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.4M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enums in properties | 6 | ✅ | 48.9M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.5M | ✅ | 3.8M | 🟢 **-92%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.4M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.1M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 106.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.9M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.6M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 4.2M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 74.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 163.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 79.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 163.7M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 163.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 89.0M | ✅ | 12.9M | 🟢 **-86%** |
| items.json | an array of schemas for items | 6 | ✅ | 59.4M | ✅ | 27.0M | 🟢 **-55%** |
| items.json | items and subitems | 6 | ✅ | 35.3M | ✅ | 2.1M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 3.2M | 🟢 **-75%** |
| items.json | items with null instance elements | 1 | ✅ | 70.3M | ✅ | 84.6M | 🔴 **+20%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 93.0M | 🔴 **+24%** |
| maxItems.json | maxItems validation | 4 | ✅ | 65.6M | ✅ | 19.7M | 🟢 **-70%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.6M | ✅ | 21.2M | 🟢 **-61%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.1M | ✅ | 24.3M | 🟢 **-51%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.2M | ✅ | 9.8M | 🟢 **-75%** |
| maximum.json | maximum validation | 4 | ✅ | 61.5M | ✅ | 17.6M | 🟢 **-71%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ✅ | 19.7M | 🟢 **-68%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.8M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ✅ | 19.9M | 🟢 **-70%** |
| minLength.json | minLength validation | 5 | ✅ | 47.6M | ✅ | 12.4M | 🟢 **-74%** |
| minProperties.json | minProperties validation | 6 | ✅ | 50.3M | ✅ | 24.0M | 🟢 **-52%** |
| minimum.json | minimum validation | 4 | ✅ | 61.9M | ✅ | 18.4M | 🟢 **-70%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 61.8M | ✅ | 15.9M | 🟢 **-74%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 53.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 58.0M | ✅ | 17.2M | 🟢 **-70%** |
| multipleOf.json | by int | 3 | ✅ | 61.3M | ✅ | 12.7M | 🟢 **-79%** |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 14.4M | 🟢 **-74%** |
| multipleOf.json | by small number | 2 | ✅ | 51.5M | ✅ | 9.5M | 🟢 **-81%** |
| multipleOf.json | float division = inf | 1 | ✅ | 39.0M | ✅ | 5.4M | 🟢 **-86%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 16.4M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 55.9M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 49.0M | ✅ | 6.9M | 🟢 **-86%** |
| not.json | not more complex schema | 3 | ✅ | 52.7M | ✅ | 2.7M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 2.9M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.9M | ✅ | 7.0M | 🟢 **-83%** |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 6.9M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 54.3M | ✅ | 4.0M | 🟢 **-93%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.5M | ✅ | 5.7M | 🟢 **-81%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 6.3M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.3M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.2M | ✅ | 1.8M | 🟢 **-95%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 4.5M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ✅ | 29.2M | 🟢 **-40%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 32.1M | 🟢 **-30%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.9M | ✅ | 9.3M | 🟢 **-63%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.9M | ✅ | 5.1M | 🟢 **-63%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 22.8M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 45.7M | ✅ | 1.9M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.0M | ✅ | 401K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 3.5M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ✅ | 901K | 🟢 **-96%** |
| ref.json | root pointer ref | 4 | ✅ | 22.0M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.4M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 6.4M | 🟢 **-86%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 37.3M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.9M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 2.3M | 🟢 **-94%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.3M | ✅ | 135K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 42.4M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 56.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 43.0M | ✅ | 2.2M | 🟢 **-95%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 4.8M | 🟢 **-91%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.8M | ✅ | 4.5M | 🟢 **-92%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.8M | ✅ | 4.4M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 53.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 8.7M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 44.6M | 🟢 **-72%** |
| required.json | required with escaped characters | 2 | ✅ | 40.6M | ✅ | 1.0M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.4M | ✅ | 2.9M | 🟢 **-88%** |
| type.json | integer type matches integers | 8 | ✅ | 41.3M | ✅ | 7.2M | 🟢 **-83%** |
| type.json | number type matches numbers | 9 | ✅ | 45.7M | ✅ | 9.0M | 🟢 **-80%** |
| type.json | string type matches strings | 9 | ✅ | 48.4M | ✅ | 9.1M | 🟢 **-81%** |
| type.json | object type matches objects | 7 | ✅ | 41.4M | ✅ | 7.0M | 🟢 **-83%** |
| type.json | array type matches arrays | 7 | ✅ | 44.5M | ✅ | 7.4M | 🟢 **-83%** |
| type.json | boolean type matches booleans | 10 | ✅ | 44.0M | ✅ | 7.8M | 🟢 **-82%** |
| type.json | null type matches only the null object | 10 | ✅ | 42.8M | ✅ | 7.2M | 🟢 **-83%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.1M | ✅ | 8.4M | 🟢 **-82%** |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 11.1M | 🟢 **-80%** |
| type.json | type: array or object | 5 | ✅ | 49.6M | ✅ | 9.8M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 55.7M | ✅ | 13.1M | 🟢 **-76%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ✅ | 4.5M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 4.9M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ✅ | 12.6M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 41.7M | 🟢 **-45%** |
| optional/bignum.json | string | 1 | ✅ | 42.5M | ✅ | 6.3M | 🟢 **-85%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 43.3M | 🟢 **-38%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ✅ | 4.4M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ✅ | 43.0M | 🟢 **-39%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 4.2M | 🟢 **-90%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.6M | ✅ | 7.9M | 🟢 **-84%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.3M | ✅ | 8.2M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.5M | ✅ | 7.4M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.2M | ✅ | 7.5M | 🟢 **-59%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 6.6M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.5M | ✅ | 10.4M | 🟢 **-58%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 8.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 7.9M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 13.2M | 🟢 **-47%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 5.7M | 🟢 **-78%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.0M | ✅ | 5.2M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 5.5M | 🟢 **-61%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.7M | ✅ | 6.5M | 🟢 **-74%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 4.7M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 5.4M | 🟢 **-73%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 3.9M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.6M | ✅ | 45.9M | 🟢 **-39%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.1M | ✅ | 7.1M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.6M | ✅ | 6.8M | 🟢 **-83%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.3M | ✅ | 85.5M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.0M | ✅ | 19.7M | 🟢 **-74%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 167.7M | ✅ | 114.5M | 🟢 **-32%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 93.7M | +13% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 3.6M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.6M | ✅ | 7.0M | 🟢 **-81%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 9.4M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.6M | ✅ | 109.6M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.3M | ✅ | 14.1M | 🟢 **-79%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 7.3M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.3M | ✅ | 8.3M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ✅ | 6.7M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 104.2M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 59.5M | -11% |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ✅ | 6.5M | 🟢 **-87%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 104.7M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 3.7M | 🟢 **-93%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 157.4M | ✅ | 101.9M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 104.1M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 7.0M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 4.8M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 3.4M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ✅ | 6.3M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.7M | ✅ | 3.6M | 🟢 **-92%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 103.6M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 157.7M | ✅ | 104.5M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 166.8M | ✅ | 12.4M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ✅ | 4.7M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.6M | ✅ | 115.5M | 🟢 **-36%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 7.1M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 54.9M | ✅ | 7.0M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 37.9M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 25.1M | ✅ | 2.6M | 🟢 **-90%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 54.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 47.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ✅ | 5.2M | 🟢 **-91%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.0M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 53.8M | ✅ | 4.3M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 90.1M | ✅ | 3.3M | 🟢 **-96%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 11.8M | 🟢 **-89%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.6M | ✅ | 6.3M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 59.5M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 92.7M | +15% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 2.9M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.0M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 50.4M | ✅ | 4.4M | 🟢 **-91%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 171.5M | ✅ | 7.5M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ✅ | 2.6M | 🟢 **-93%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 82.5M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ✅ | 1.2M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 26.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 6.2M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 61.2M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enums in properties | 6 | ✅ | 54.1M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.7M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.5M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.1M | ✅ | 3.2M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.4M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 113.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ✅ | 3.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 4.6M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ✅ | 9.3M | 🟢 **-83%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.5M | ✅ | 8.8M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 81.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 147.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 85.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 156.4M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 81.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 157.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 1.8M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 60.5M | ✅ | 12.9M | 🟢 **-79%** |
| items.json | an array of schemas for items | 6 | ✅ | 106.9M | ✅ | 27.6M | 🟢 **-74%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 167.5M | ✅ | 98.8M | 🟢 **-41%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 7.2M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 61.9M | ✅ | 16.8M | 🟢 **-73%** |
| items.json | items and subitems | 6 | ✅ | 35.3M | ✅ | 2.1M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 3.3M | 🟢 **-75%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 88.0M | +14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 92.4M | +11% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 20.6M | 🟢 **-72%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 12.1M | 🟢 **-81%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.6M | ✅ | 21.4M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.5M | ✅ | 10.3M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.8M | ✅ | 24.3M | 🟢 **-55%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 10.0M | 🟢 **-76%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.8M | ✅ | 9.9M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 18.9M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 22.0M | 🟢 **-67%** |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ✅ | 21.7M | 🟢 **-71%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 11.5M | 🟢 **-82%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 13.2M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 10.4M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 54.2M | ✅ | 24.3M | 🟢 **-55%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ✅ | 10.5M | 🟢 **-75%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 20.2M | 🟢 **-71%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.0M | ✅ | 17.8M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 12.9M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 14.5M | 🟢 **-77%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 9.9M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 5.9M | 🟢 **-86%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 21.1M | 🟢 **-69%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 7.5M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 7.5M | 🟢 **-87%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 2.7M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.4M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 158.6M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 3.9M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.4M | ✅ | 5.6M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 5.9M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.7M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 6.3M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.9M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.5M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 4.6M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ✅ | 28.9M | 🟢 **-45%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 21.7M | 🟢 **-55%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 9.4M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 5.1M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 5.1M | 🟢 **-70%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 4.8M | 🟢 **-76%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 22.9M | 🔴 **+29%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 399K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ✅ | 902K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.0M | ✅ | 5.6M | 🟢 **-88%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 6.3M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 166.9M | ✅ | 67.3M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.1M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 4.3M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 6.5M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 3.0M | 🟢 **-94%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.9M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 103.5M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 2.5M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 132K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.1M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.3M | ✅ | 4.7M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 53.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 10.0M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 158.1M | ✅ | 103.7M | 🟢 **-34%** |
| required.json | required with empty array | 1 | ✅ | 158.6M | ✅ | 94.7M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 44.6M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 3.0M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 8.7M | 🟢 **-83%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | string type matches strings | 9 | ✅ | 54.4M | ✅ | 10.1M | 🟢 **-81%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 8.1M | 🟢 **-82%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 8.0M | 🟢 **-84%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 8.7M | 🟢 **-83%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 7.8M | 🟢 **-84%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.0M | ✅ | 9.4M | 🟢 **-82%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 13.0M | 🟢 **-79%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 11.1M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 15.8M | 🟢 **-75%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 5.2M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 5.5M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 15.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 88.3M | +5% |
| optional/bignum.json | string | 1 | ✅ | 47.5M | ✅ | 6.6M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 98.5M | 🔴 **+28%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 98.2M | 🔴 **+27%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 9.0M | 🟢 **-83%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.9M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 7.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 11.9M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.3M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 16.4M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 6.2M | 🟢 **-78%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 5.4M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 6.0M | 🟢 **-58%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.9M | ✅ | 7.2M | 🟢 **-72%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ✅ | 5.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 5.8M | 🟢 **-70%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 4.2M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ✅ | 119.5M | 🔴 **+46%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.3M | ✅ | 831K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 42.9M | ✅ | 856K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 64.5M | ✅ | 7.2M | 🟢 **-89%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.3M | ✅ | 6.8M | 🟢 **-84%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.5M | ✅ | 85.5M | 🟢 **-51%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.4M | ✅ | 17.9M | 🟢 **-77%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 191.0M | ✅ | 110.4M | 🟢 **-42%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 85.4M | ✅ | 92.4M | +8% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 62.9M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.0M | ✅ | 6.9M | 🟢 **-83%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.0M | ✅ | 9.2M | 🟢 **-92%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.8M | ✅ | 104.2M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 69.5M | ✅ | 14.2M | 🟢 **-80%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.1M | ✅ | 7.2M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.1M | ✅ | 8.3M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.4M | ✅ | 6.7M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.5M | ✅ | 103.6M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.3M | ✅ | 3.6M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 70.4M | ✅ | 61.6M | -12% |
| allOf.json | allOf | 4 | ✅ | 35.4M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 32.1M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf simple types | 2 | ✅ | 62.4M | ✅ | 6.4M | 🟢 **-90%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ✅ | 103.7M | 🟢 **-41%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 51.6M | ✅ | 3.6M | 🟢 **-93%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 95.0M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 104.3M | 🟢 **-40%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.6M | ✅ | 103.9M | 🟢 **-40%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 65.6M | ✅ | 6.9M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 123.4M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.0M | ✅ | 4.6M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 61.6M | ✅ | 6.4M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.7M | ✅ | 104.4M | 🟢 **-40%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 165.3M | ✅ | 104.4M | 🟢 **-37%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 51.5M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 88.2M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 146.5M | ✅ | 12.7M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 123.6M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 151.5M | ✅ | 110.5M | 🟢 **-27%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.7M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 55.9M | ✅ | 6.9M | 🟢 **-88%** |
| const.json | const with object | 4 | ✅ | 53.6M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 46.6M | ✅ | 2.7M | 🟢 **-94%** |
| const.json | const with null | 2 | ✅ | 123.9M | ✅ | 3.9M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 59.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 106.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 92.7M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 94.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 56.7M | ✅ | 5.3M | 🟢 **-91%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 55.5M | ✅ | 4.2M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 104.3M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.6M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 113.4M | ✅ | 10.8M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 50.4M | ✅ | 6.1M | 🟢 **-88%** |
| contains.json | items + contains | 4 | ✅ | 59.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.6M | ✅ | 10.9M | 🟢 **-82%** |
| contains.json | contains with null instance elements | 1 | ✅ | 133.3M | ✅ | 92.0M | 🟢 **-31%** |
| default.json | invalid type for default | 2 | ✅ | 66.9M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 71.1M | ✅ | 2.8M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.1M | ✅ | 1.8M | 🟢 **-96%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.2M | ✅ | 4.4M | 🟢 **-92%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.1M | ✅ | 7.5M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.3M | ✅ | 2.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.4M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 49.4M | ✅ | 2.8M | 🟢 **-94%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.3M | ✅ | 6.1M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.5M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.1M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enums in properties | 6 | ✅ | 37.2M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 68.6M | ✅ | 3.5M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 57.2M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 69.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.7M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 69.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.1M | ✅ | 8.7M | 🟢 **-86%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 60.0M | ✅ | 8.3M | 🟢 **-86%** |
| format.json | email format | 6 | ✅ | 87.7M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 93.4M | ✅ | 118.5M | 🔴 **+27%** |
| format.json | regex format | 6 | ✅ | 93.7M | ✅ | 22.3M | 🟢 **-76%** |
| format.json | ipv4 format | 6 | ✅ | 93.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 91.1M | ✅ | 119.2M | 🔴 **+31%** |
| format.json | hostname format | 6 | ✅ | 93.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 93.8M | ✅ | 102.7M | +9% |
| format.json | date-time format | 6 | ✅ | 93.0M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 90.7M | ✅ | 118.4M | 🔴 **+31%** |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 84.9M | ✅ | 102.2M | 🔴 **+20%** |
| format.json | iri format | 6 | ✅ | 92.9M | ✅ | 120.1M | 🔴 **+29%** |
| format.json | iri-reference format | 6 | ✅ | 83.2M | ✅ | 98.7M | +19% |
| format.json | uri format | 6 | ✅ | 93.0M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 93.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 80.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 190.4M | ✅ | 107.6M | 🟢 **-43%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 189.0M | ✅ | 113.9M | 🟢 **-40%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 188.0M | ✅ | 93.6M | 🟢 **-50%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 71.3M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 62.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 191.1M | ✅ | 113.9M | 🟢 **-40%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.9M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 59.6M | ✅ | 12.8M | 🟢 **-79%** |
| items.json | an array of schemas for items | 6 | ✅ | 63.0M | ✅ | 27.4M | 🟢 **-56%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.6M | ✅ | 100.7M | 🟢 **-39%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 7.0M | 🟢 **-89%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ✅ | 15.8M | 🟢 **-75%** |
| items.json | items and subitems | 6 | ✅ | 28.6M | ✅ | 2.2M | 🟢 **-92%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 79.7M | ✅ | 84.8M | +6% |
| items.json | array-form items with null instance e... | 1 | ✅ | 85.2M | ✅ | 92.6M | +9% |
| maxItems.json | maxItems validation | 4 | ✅ | 75.7M | ✅ | 20.0M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 60.4M | ✅ | 11.1M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 21.0M | 🟢 **-64%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ✅ | 10.1M | 🟢 **-81%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.5M | ✅ | 24.1M | 🟢 **-54%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.2M | ✅ | 9.7M | 🟢 **-77%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.7M | ✅ | 9.8M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 18.6M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 70.7M | ✅ | 18.6M | 🟢 **-74%** |
| minItems.json | minItems validation | 4 | ✅ | 75.7M | ✅ | 20.1M | 🟢 **-74%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 64.5M | ✅ | 10.0M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 56.6M | ✅ | 11.9M | 🟢 **-79%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.3M | ✅ | 10.2M | 🟢 **-81%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.3M | ✅ | 24.1M | 🟢 **-57%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 9.7M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 69.3M | ✅ | 17.0M | 🟢 **-75%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 16.8M | 🟢 **-74%** |
| multipleOf.json | by int | 3 | ✅ | 68.9M | ✅ | 12.7M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 64.5M | ✅ | 14.3M | 🟢 **-78%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 9.9M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 42.6M | ✅ | 5.4M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.6M | ✅ | 19.8M | 🟢 **-73%** |
| not.json | not | 2 | ✅ | 64.8M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 58.4M | ✅ | 6.8M | 🟢 **-88%** |
| not.json | not more complex schema | 3 | ✅ | 60.3M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.7M | ✅ | 7.0M | 🟢 **-84%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.5M | ✅ | 7.0M | 🟢 **-84%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 200.6M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 174.8M | ✅ | 6.9M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 60.6M | ✅ | 3.8M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.3M | ✅ | 5.7M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 51.0M | ✅ | 5.8M | 🟢 **-89%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 174.6M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 51.2M | ✅ | 3.3M | 🟢 **-94%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 50.8M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.9M | ✅ | 6.2M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 64.4M | ✅ | 4.6M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 51.5M | ✅ | 28.8M | 🟢 **-44%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 53.0M | ✅ | 31.4M | 🟢 **-41%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 9.2M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ✅ | 5.0M | 🟢 **-68%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ✅ | 5.2M | 🟢 **-70%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.8M | ✅ | 4.5M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.4M | ✅ | 21.9M | +13% |
| properties.json | object properties validation | 6 | ✅ | 47.0M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.3M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.2M | ✅ | 407K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.4M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 891K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.8M | ✅ | 5.6M | 🟢 **-88%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 6.2M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 187.7M | ✅ | 66.2M | 🟢 **-65%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.5M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 43.6M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.0M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.9M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.8M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.0M | ✅ | 6.4M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 36.9M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.2M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.1M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 140.4M | ✅ | 104.1M | 🟢 **-26%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 48.4M | ✅ | 2.5M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 132K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 47.4M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 48.3M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.6M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.9M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 45.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 45.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.4M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 65.1M | ✅ | 4.8M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 65.1M | ✅ | 4.8M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 10.3M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 175.1M | ✅ | 103.9M | 🟢 **-41%** |
| required.json | required with empty array | 1 | ✅ | 173.5M | ✅ | 94.6M | 🟢 **-45%** |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 22.7M | ✅ | 3.0M | 🟢 **-87%** |
| type.json | integer type matches integers | 9 | ✅ | 51.9M | ✅ | 8.7M | 🟢 **-83%** |
| type.json | number type matches numbers | 9 | ✅ | 54.8M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 10.0M | 🟢 **-82%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 8.1M | 🟢 **-82%** |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 8.0M | 🟢 **-83%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 8.6M | 🟢 **-83%** |
| type.json | null type matches only the null object | 10 | ✅ | 47.5M | ✅ | 7.7M | 🟢 **-84%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 49.5M | ✅ | 9.4M | 🟢 **-81%** |
| type.json | type as array with one item | 2 | ✅ | 65.7M | ✅ | 12.7M | 🟢 **-81%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 11.0M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 62.4M | ✅ | 15.5M | 🟢 **-75%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 5.3M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 5.5M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 164.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 60.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 86.6M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 90.3M | ✅ | 87.7M | -3% |
| optional/bignum.json | string | 1 | ✅ | 48.3M | ✅ | 6.7M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 81.0M | ✅ | 98.2M | 🔴 **+21%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 46.4M | ✅ | 4.8M | 🟢 **-90%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 81.1M | ✅ | 98.6M | 🔴 **+22%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 46.6M | ✅ | 4.8M | 🟢 **-90%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 334K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 395K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 54.2M | ✅ | 9.0M | 🟢 **-83%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.6M | ✅ | 9.0M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 7.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 11.9M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.8M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 16.5M | 🟢 **-38%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.3M | ✅ | 6.2M | 🟢 **-78%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ✅ | 5.4M | 🟢 **-66%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 6.0M | 🟢 **-61%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 7.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 21.3M | ✅ | 5.3M | 🟢 **-75%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 5.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 4.3M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.3M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.1M | ✅ | 110.5M | 🔴 **+21%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 54.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 51.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 21.0M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 21.4M | ✅ | 7.3M | 🟢 **-66%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 28.3M | ✅ | 6.8M | 🟢 **-76%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 155.3M | ✅ | 86.4M | 🟢 **-44%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.2M | ✅ | 18.2M | 🟢 **-71%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.5M | ✅ | 114.0M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 74.9M | ✅ | 93.2M | 🔴 **+25%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.6M | ✅ | 6.9M | 🟢 **-79%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 155.0M | ✅ | 104.2M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.5M | ✅ | 13.8M | 🟢 **-78%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.3M | ✅ | 7.3M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.5M | ✅ | 8.1M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 28.2M | ✅ | 6.7M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 155.0M | ✅ | 103.8M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 19.9M | ✅ | 3.5M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 60.4M | -9% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.8M | ✅ | 6.1M | 🟢 **-78%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 25.6M | ✅ | 4.4M | 🟢 **-83%** |
| allOf.json | allOf | 4 | ✅ | 31.7M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf with base schema | 5 | ✅ | 38.5M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf simple types | 2 | ✅ | 54.3M | ✅ | 6.3M | 🟢 **-88%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 155.3M | ✅ | 104.1M | 🟢 **-33%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 43.6M | ✅ | 3.6M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 155.1M | ✅ | 104.3M | 🟢 **-33%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 103.3M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 7.0M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.4M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 4.7M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 36.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.7M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 59.2M | ✅ | 6.5M | 🟢 **-89%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.3M | ✅ | 3.7M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 154.4M | ✅ | 101.9M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.1M | ✅ | 58.5M | 🟢 **-62%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 2.5M | 🟢 **-94%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.0M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.9M | ✅ | 12.8M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.5M | ✅ | 4.8M | 🟢 **-92%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.0M | ✅ | 113.3M | 🟢 **-38%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 41.2M | ✅ | 7.0M | 🟢 **-83%** |
| const.json | const validation | 3 | ✅ | 49.1M | ✅ | 6.9M | 🟢 **-86%** |
| const.json | const with object | 4 | ✅ | 31.5M | ✅ | 1.6M | 🟢 **-95%** |
| const.json | const with array | 3 | ✅ | 37.0M | ✅ | 2.7M | 🟢 **-93%** |
| const.json | const with null | 2 | ✅ | 57.6M | ✅ | 4.0M | 🟢 **-93%** |
| const.json | const with false does not match 0 | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 51.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 48.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 40.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 40.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 47.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.3M | ✅ | 5.3M | 🟢 **-89%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 50.8M | ✅ | 3.0M | 🟢 **-94%** |
| const.json | nul characters in strings | 2 | ✅ | 45.3M | ✅ | 4.3M | 🟢 **-91%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 47.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 51.4M | ✅ | 3.2M | 🟢 **-94%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.5M | ✅ | 1.7M | 🟢 **-96%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ✅ | 10.9M | 🟢 **-80%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 38.8M | ✅ | 6.3M | 🟢 **-84%** |
| contains.json | items + contains | 4 | ✅ | 18.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 53.5M | ✅ | 11.0M | 🟢 **-79%** |
| contains.json | contains with null instance elements | 1 | ✅ | 73.4M | ✅ | 92.9M | 🔴 **+26%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.1M | ✅ | 115.8M | 🟢 **-34%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.0M | ✅ | 99.7M | 🟢 **-43%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.3M | ✅ | 116.5M | 🟢 **-34%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 159.8M | ✅ | 104.3M | 🟢 **-35%** |
| default.json | invalid type for default | 2 | ✅ | 61.2M | ✅ | 3.5M | 🟢 **-94%** |
| default.json | invalid string value for default | 2 | ✅ | 47.0M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 27.3M | ✅ | 1.8M | 🟢 **-93%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.6M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 53.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.3M | ✅ | 116.4M | 🟢 **-34%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 17.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.1M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 41.5M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 33.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 30.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 47.7M | ✅ | 6.1M | 🟢 **-87%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 34.8M | ✅ | 1.3M | 🟢 **-96%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 51.2M | ✅ | 4.6M | 🟢 **-91%** |
| enum.json | enums in properties | 6 | ✅ | 33.7M | ✅ | 1.6M | 🟢 **-95%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.8M | ✅ | 3.8M | 🟢 **-88%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 47.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 43.7M | ✅ | 3.0M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 51.4M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.6M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ✅ | 3.9M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.1M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 47.6M | ✅ | 4.3M | 🟢 **-91%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.9M | ✅ | 8.8M | 🟢 **-82%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 48.1M | ✅ | 8.8M | 🟢 **-82%** |
| format.json | email format | 6 | ✅ | 182.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.6M | ✅ | 119.0M | 🟢 **-35%** |
| format.json | regex format | 6 | ✅ | 162.2M | ✅ | 21.5M | 🟢 **-87%** |
| format.json | ipv4 format | 6 | ✅ | 174.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 174.0M | ✅ | 120.6M | 🟢 **-31%** |
| format.json | hostname format | 6 | ✅ | 171.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 174.2M | ✅ | 103.8M | 🟢 **-40%** |
| format.json | date-time format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 181.3M | ✅ | 120.4M | 🟢 **-34%** |
| format.json | json-pointer format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 182.7M | ✅ | 103.7M | 🟢 **-43%** |
| format.json | iri format | 6 | ✅ | 179.0M | ✅ | 120.3M | 🟢 **-33%** |
| format.json | iri-reference format | 6 | ✅ | 181.1M | ✅ | 103.9M | 🟢 **-43%** |
| format.json | uri format | 6 | ✅ | 174.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 182.0M | ✅ | 120.1M | 🟢 **-34%** |
| format.json | duration format | 6 | ✅ | 182.6M | ✅ | 102.5M | 🟢 **-44%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 160.5M | ✅ | 114.0M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ✅ | 95.3M | 🟢 **-45%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 111.9M | 🟢 **-35%** |
| if-then-else.json | if and then without else | 3 | ✅ | 62.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.0M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 53.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.0M | ✅ | 95.5M | 🟢 **-43%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.1M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.6M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 42.6M | ✅ | 12.8M | 🟢 **-70%** |
| items.json | an array of schemas for items | 6 | ✅ | 58.7M | ✅ | 27.4M | 🟢 **-53%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.5M | ✅ | 100.8M | 🟢 **-39%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.1M | ✅ | 6.9M | 🟢 **-87%** |
| items.json | items with boolean schemas | 3 | ✅ | 53.9M | ✅ | 15.9M | 🟢 **-71%** |
| items.json | items and subitems | 6 | ✅ | 24.3M | ✅ | 2.2M | 🟢 **-91%** |
| items.json | nested items | 3 | ✅ | 10.2M | ✅ | 3.3M | 🟢 **-68%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ✅ | 86.0M | 🔴 **+22%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 93.1M | 🔴 **+24%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 104.6M | 🟢 **-39%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 43.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 50.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 44.5M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 65.7M | ✅ | 20.0M | 🟢 **-69%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 11.1M | 🟢 **-80%** |
| maxLength.json | maxLength validation | 5 | ✅ | 52.9M | ✅ | 21.4M | 🟢 **-60%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.0M | ✅ | 10.2M | 🟢 **-78%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 40.3M | ✅ | 24.2M | 🟢 **-40%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 29.0M | ✅ | 9.9M | 🟢 **-66%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.0M | ✅ | 9.4M | 🟢 **-63%** |
| maximum.json | maximum validation | 4 | ✅ | 61.9M | ✅ | 18.6M | 🟢 **-70%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ✅ | 20.4M | 🟢 **-66%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 110.0M | 🟢 **-36%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 51.3M | ✅ | 7.2M | 🟢 **-86%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 46.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 50.9M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 40.2M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 36.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.7M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 56.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 46.7M | ✅ | 20.0M | 🟢 **-57%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 11.1M | 🟢 **-80%** |
| minLength.json | minLength validation | 5 | ✅ | 45.9M | ✅ | 12.4M | 🟢 **-73%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 47.2M | ✅ | 10.2M | 🟢 **-78%** |
| minProperties.json | minProperties validation | 6 | ✅ | 36.3M | ✅ | 23.7M | 🟢 **-35%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 29.9M | ✅ | 9.8M | 🟢 **-67%** |
| minimum.json | minimum validation | 4 | ✅ | 61.7M | ✅ | 18.6M | 🟢 **-70%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 56.9M | ✅ | 17.5M | 🟢 **-69%** |
| multipleOf.json | by int | 3 | ✅ | 61.6M | ✅ | 12.3M | 🟢 **-80%** |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 14.3M | 🟢 **-74%** |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ✅ | 9.8M | 🟢 **-81%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 5.4M | 🟢 **-86%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.4M | ✅ | 19.9M | 🟢 **-69%** |
| not.json | not | 2 | ✅ | 56.2M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 49.9M | ✅ | 6.8M | 🟢 **-86%** |
| not.json | not more complex schema | 3 | ✅ | 52.8M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 2.8M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.2M | ✅ | 7.0M | 🟢 **-83%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.0M | ✅ | 7.0M | 🟢 **-83%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.6M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 157.8M | ✅ | 7.0M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 22.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 45.9M | ✅ | 3.9M | 🟢 **-91%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.7M | ✅ | 5.7M | 🟢 **-81%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 43.7M | ✅ | 5.9M | 🟢 **-87%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 3.3M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.3M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 1.7M | 🟢 **-96%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.0M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 6.2M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 36.8M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 4.5M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 41.9M | ✅ | 29.0M | 🟢 **-31%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 34.9M | ✅ | 31.2M | -11% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.6M | ✅ | 9.3M | 🟢 **-61%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 11.9M | ✅ | 5.0M | 🟢 **-58%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ✅ | 5.2M | 🟢 **-64%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.7M | ✅ | 4.6M | 🟢 **-75%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.9M | ✅ | 23.0M | 🔴 **+54%** |
| properties.json | object properties validation | 6 | ✅ | 45.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.0M | ✅ | 1.7M | 🟢 **-90%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.6M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.8M | ✅ | 407K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 3.5M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ✅ | 895K | 🟢 **-96%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 16.0M | ✅ | 6.4M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.5M | ✅ | 66.1M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 28.9M | ✅ | 6.0M | 🟢 **-79%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 33.9M | ✅ | 5.5M | 🟢 **-84%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.9M | ✅ | 4.2M | 🟢 **-88%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 10.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 4.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 4.4M | 🔴 **+66%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 9.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 5.6M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.4M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 20.4M | ✅ | 1.6M | 🟢 **-92%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 6.3M | 🟢 **-86%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.1M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 30.2M | ✅ | 3.7M | 🟢 **-88%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 2.3M | 🟢 **-94%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ✅ | 104.2M | 🟢 **-34%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.3M | ✅ | 3.6M | 🟢 **-92%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 6.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 42.7M | ✅ | 1.8M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 19.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 38.3M | ✅ | 2.3M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 38.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 37.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 30.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 29.4M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.6M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 39.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 7.0M | 🟢 **-87%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 7.0M | 🟢 **-87%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.7M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 3.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 37.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 25.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 24.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 26.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 26.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 25.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 37.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.8M | ✅ | 10.0M | 🟢 **-81%** |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 103.9M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 94.8M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 15.2M | ✅ | 3.0M | 🟢 **-80%** |
| type.json | integer type matches integers | 9 | ✅ | 42.7M | ✅ | 8.7M | 🟢 **-80%** |
| type.json | number type matches numbers | 9 | ✅ | 45.1M | ✅ | 10.1M | 🟢 **-78%** |
| type.json | string type matches strings | 9 | ✅ | 47.3M | ✅ | 9.9M | 🟢 **-79%** |
| type.json | object type matches objects | 7 | ✅ | 39.9M | ✅ | 8.0M | 🟢 **-80%** |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ✅ | 8.0M | 🟢 **-82%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.2M | ✅ | 8.5M | 🟢 **-80%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ✅ | 7.8M | 🟢 **-82%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.8M | ✅ | 9.3M | 🟢 **-83%** |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 12.2M | 🟢 **-78%** |
| type.json | type: array or object | 5 | ✅ | 48.3M | ✅ | 10.3M | 🟢 **-79%** |
| type.json | type: array, object or null | 5 | ✅ | 54.2M | ✅ | 15.7M | 🟢 **-71%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.4M | ✅ | 108.9M | 🔴 **+44%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 39.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.0M | ✅ | 78.4M | +19% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 72.5M | ✅ | 91.7M | 🔴 **+27%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 43.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 75.8M | ✅ | 83.1M | +10% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 17.4M | ✅ | 83.9M | 🔴 **+383%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 76.2M | ✅ | 118.7M | 🔴 **+56%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ✅ | 84.4M | 🔴 **+20%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.4M | ✅ | 89.3M | 🔴 **+74%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 60.3M | ✅ | 3.5M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 24.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.3M | ✅ | 3.5M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.7M | ✅ | 3.5M | 🟢 **-87%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 25.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 3.4M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 23.1M | ✅ | 3.4M | 🟢 **-85%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 15.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.8M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.3M | ✅ | 107.7M | 🔴 **+60%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.7M | ✅ | 84.1M | 🔴 **+80%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.7M | ✅ | 5.2M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 13.3M | ✅ | 5.5M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ✅ | 12.8M | 🟢 **-77%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 43.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 72.6M | ✅ | 15.0M | 🟢 **-79%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 88.6M | +17% |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 6.8M | 🟢 **-84%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 87.3M | 🔴 **+24%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ✅ | 4.8M | 🟢 **-88%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 97.2M | 🔴 **+38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 4.7M | 🟢 **-88%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 14.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.2M | ✅ | 4.4M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.9M | ✅ | 7.5M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.9M | ✅ | 2.5M | 🟢 **-91%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ✅ | 1.7M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.2M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.5M | ✅ | 2.8M | 🟢 **-94%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.6M | ✅ | 1.8M | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 46.8M | ✅ | 9.0M | 🟢 **-81%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 13.4M | ✅ | 8.8M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 15.5M | ✅ | 8.9M | 🟢 **-43%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 16.2M | ✅ | 9.1M | 🟢 **-44%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 15.2M | ✅ | 7.3M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 15.1M | ✅ | 11.2M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.2M | ✅ | 9.1M | 🟢 **-44%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 15.8M | ✅ | 9.1M | 🟢 **-42%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 15.3M | ✅ | 16.5M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 15.7M | ✅ | 6.2M | 🟢 **-60%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.5M | ✅ | 5.5M | 🟢 **-56%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.0M | ✅ | 5.9M | 🟢 **-54%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 15.5M | ✅ | 7.0M | 🟢 **-55%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.3M | ✅ | 5.3M | 🟢 **-71%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ✅ | 5.7M | 🟢 **-69%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 4.3M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 22.2M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 27.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 23.0M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 23.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.2M | ✅ | 113.0M | 🔴 **+52%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.6M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.1M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 26.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.3M | ✅ | 14.5M | 🟢 **-73%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 16.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.5M | ✅ | 2.1M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.4M | ✅ | 1.6M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.7M | ✅ | 7.1M | 🟢 **-87%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.3M | ✅ | 1.6M | 🟢 **-96%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.5M | ✅ | 15.8M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.2M | ✅ | 7.5M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.1M | ✅ | 8.1M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 6.5M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 103.1M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.0M | ✅ | 3.4M | 🟢 **-84%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 61.1M | -9% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.5M | ✅ | 6.0M | 🟢 **-78%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 33.5M | ✅ | 4.3M | 🟢 **-87%** |
| allOf.json | allOf | 4 | ✅ | 32.3M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ✅ | 6.2M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 103.0M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.9M | ✅ | 3.6M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.5M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 101.7M | 🟢 **-36%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 103.4M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 7.0M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 47.0M | ✅ | 4.8M | 🟢 **-90%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.9M | ✅ | 3.4M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 59.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 56.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 58.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 63.3M | ✅ | 6.3M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.8M | ✅ | 3.6M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 157.2M | ✅ | 103.7M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 103.7M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 42.8M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 12.9M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 4.8M | 🟢 **-92%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.4M | ✅ | 106.8M | 🟢 **-40%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 42.6M | ✅ | 7.0M | 🟢 **-83%** |
| const.json | const validation | 3 | ✅ | 49.7M | ✅ | 6.9M | 🟢 **-86%** |
| const.json | const with object | 4 | ✅ | 33.5M | ✅ | 1.6M | 🟢 **-95%** |
| const.json | const with array | 3 | ✅ | 41.4M | ✅ | 2.7M | 🟢 **-94%** |
| const.json | const with null | 2 | ✅ | 61.0M | ✅ | 4.0M | 🟢 **-93%** |
| const.json | const with false does not match 0 | 3 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 54.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 36.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 43.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 42.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 51.4M | ✅ | 5.3M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 57.4M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 52.4M | ✅ | 4.3M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ✅ | 3.3M | 🟢 **-94%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 50.3M | ✅ | 10.9M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 48.2M | ✅ | 6.1M | 🟢 **-87%** |
| contains.json | items + contains | 4 | ✅ | 37.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 28.7M | ✅ | 10.9M | 🟢 **-62%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 92.5M | 🔴 **+20%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 174.5M | ✅ | 68.1M | 🟢 **-61%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 94.4M | 🟢 **-46%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.8M | ✅ | 118.2M | 🟢 **-34%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.3M | ✅ | 106.8M | 🟢 **-39%** |
| default.json | invalid type for default | 2 | ✅ | 64.7M | ✅ | 3.6M | 🟢 **-94%** |
| default.json | invalid string value for default | 2 | ✅ | 46.7M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 41.2M | ✅ | 1.9M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.0M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 91.5M | 🟢 **-48%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 37.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 43.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 24.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.9M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.7M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 57.6M | ✅ | 6.1M | 🟢 **-89%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.2M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.9M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 34.7M | ✅ | 1.6M | 🟢 **-95%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.2M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.3M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 54.7M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.9M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ✅ | 3.7M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 61.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 56.0M | ✅ | 8.9M | 🟢 **-84%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.3M | ✅ | 8.7M | 🟢 **-84%** |
| format.json | email format | 7 | ✅ | 182.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 175.2M | ✅ | 117.8M | 🟢 **-33%** |
| format.json | regex format | 7 | ✅ | 181.7M | ✅ | 23.5M | 🟢 **-87%** |
| format.json | ipv4 format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 183.2M | ✅ | 118.4M | 🟢 **-35%** |
| format.json | hostname format | 7 | ✅ | 182.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 184.3M | ✅ | 105.2M | 🟢 **-43%** |
| format.json | date-time format | 7 | ✅ | 175.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 179.4M | ✅ | 118.0M | 🟢 **-34%** |
| format.json | json-pointer format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 182.8M | ✅ | 103.4M | 🟢 **-43%** |
| format.json | iri format | 7 | ✅ | 182.4M | ✅ | 118.0M | 🟢 **-35%** |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ✅ | 105.0M | 🟢 **-43%** |
| format.json | uri format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 183.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.7M | ✅ | 118.5M | 🟢 **-35%** |
| format.json | duration format | 7 | ✅ | 183.6M | ✅ | 104.8M | 🟢 **-43%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.1M | ✅ | 113.6M | 🟢 **-34%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.3M | ✅ | 113.2M | 🟢 **-34%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 94.9M | 🟢 **-45%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.2M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 65.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 112.8M | 🟢 **-34%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 60.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.3M | ✅ | 1.7M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 51.5M | ✅ | 13.0M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ✅ | 98.7M | 🟢 **-42%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 58.6M | ✅ | 7.0M | 🟢 **-88%** |
| items.json | items and subitems | 6 | ✅ | 27.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 3.2M | 🟢 **-74%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.0M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.3M | ✅ | 6.8M | 🟢 **-85%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 60.0M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 73.6M | ✅ | 88.9M | 🔴 **+21%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ✅ | 113.4M | 🟢 **-34%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 48.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.8M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 48.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ✅ | 19.7M | 🟢 **-72%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 58.8M | ✅ | 11.2M | 🟢 **-81%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ✅ | 21.4M | 🟢 **-60%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.3M | ✅ | 10.1M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 47.8M | ✅ | 24.4M | 🟢 **-49%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ✅ | 9.8M | 🟢 **-75%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.0M | ✅ | 9.7M | 🟢 **-76%** |
| maximum.json | maximum validation | 4 | ✅ | 65.3M | ✅ | 19.0M | 🟢 **-71%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.2M | ✅ | 20.5M | 🟢 **-68%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.5M | ✅ | 92.6M | 🟢 **-46%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 54.8M | ✅ | 7.1M | 🟢 **-87%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 50.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 55.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 43.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 40.5M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.3M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 60.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 69.6M | ✅ | 20.0M | 🟢 **-71%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 53.2M | ✅ | 11.2M | 🟢 **-79%** |
| minLength.json | minLength validation | 5 | ✅ | 49.6M | ✅ | 12.6M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ✅ | 10.4M | 🟢 **-79%** |
| minProperties.json | minProperties validation | 6 | ✅ | 50.8M | ✅ | 24.1M | 🟢 **-53%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.7M | ✅ | 9.4M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 65.4M | ✅ | 18.7M | 🟢 **-71%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 59.9M | ✅ | 17.6M | 🟢 **-71%** |
| multipleOf.json | by int | 3 | ✅ | 65.3M | ✅ | 12.9M | 🟢 **-80%** |
| multipleOf.json | by number | 3 | ✅ | 59.0M | ✅ | 14.4M | 🟢 **-76%** |
| multipleOf.json | by small number | 2 | ✅ | 46.3M | ✅ | 9.9M | 🟢 **-79%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 5.4M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 19.8M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 6.7M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 52.9M | ✅ | 7.0M | 🟢 **-87%** |
| not.json | not more complex schema | 3 | ✅ | 55.3M | ✅ | 2.7M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 43.6M | ✅ | 2.9M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.0M | ✅ | 7.1M | 🟢 **-84%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.6M | ✅ | 7.1M | 🟢 **-83%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.5M | ✅ | 7.1M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 157.4M | ✅ | 7.0M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.8M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 47.6M | ✅ | 4.0M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.4M | ✅ | 5.8M | 🟢 **-81%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 5.8M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 1.7M | 🟢 **-96%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.4M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.2M | ✅ | 6.3M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 37.4M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.8M | ✅ | 4.6M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 49.7M | ✅ | 28.7M | 🟢 **-42%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 31.9M | 🟢 **-33%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.7M | ✅ | 9.4M | 🟢 **-60%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 4.9M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ✅ | 5.1M | 🟢 **-70%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 4.6M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.9M | ✅ | 22.2M | 🔴 **+40%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 58.5M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 57.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 103.5M | 🔴 **+31%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.8M | ✅ | 103.4M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 45.0M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.8M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ✅ | 403K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 3.5M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ✅ | 876K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.4M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 6.3M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 66.2M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.8M | ✅ | 6.1M | 🟢 **-85%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.6M | ✅ | 5.5M | 🟢 **-85%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.5M | ✅ | 4.2M | 🟢 **-89%** |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.0M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.9M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 45.5M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.7M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 102.1M | 🟢 **-36%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 54.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 57.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 45.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.8M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 44.7M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.7M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 56.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 56.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 56.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 7.1M | 🟢 **-88%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 7.1M | 🟢 **-88%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 4.8M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 56.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.8M | ✅ | 10.4M | 🟢 **-80%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 103.9M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 95.0M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 41.9M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 22.4M | ✅ | 3.0M | 🟢 **-87%** |
| type.json | integer type matches integers | 9 | ✅ | 46.1M | ✅ | 8.7M | 🟢 **-81%** |
| type.json | number type matches numbers | 9 | ✅ | 50.8M | ✅ | 10.2M | 🟢 **-80%** |
| type.json | string type matches strings | 9 | ✅ | 51.3M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | object type matches objects | 7 | ✅ | 43.5M | ✅ | 8.1M | 🟢 **-81%** |
| type.json | array type matches arrays | 7 | ✅ | 47.7M | ✅ | 8.0M | 🟢 **-83%** |
| type.json | boolean type matches booleans | 10 | ✅ | 47.4M | ✅ | 8.7M | 🟢 **-82%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.3M | ✅ | 7.7M | 🟢 **-82%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ✅ | 9.4M | 🟢 **-80%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 12.3M | 🟢 **-79%** |
| type.json | type: array or object | 5 | ✅ | 50.3M | ✅ | 10.9M | 🟢 **-78%** |
| type.json | type: array, object or null | 5 | ✅ | 55.6M | ✅ | 15.8M | 🟢 **-72%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 79.5M | ✅ | 111.9M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.9M | ✅ | 77.8M | +13% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 76.9M | ✅ | 75.8M | -1% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.9M | ✅ | 6.4M | 🟢 **-86%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.8M | ✅ | 100.7M | 🔴 **+26%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 100.2M | 🔴 **+375%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 33.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 41.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 39.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 42.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 37.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.3M | ✅ | 109.6M | 🔴 **+27%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 73.6M | ✅ | 83.6M | +14% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.9M | ✅ | 113.5M | 🔴 **+114%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 114.2M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 17.6M | ✅ | 6.5M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.8M | ✅ | 3.6M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.2M | ✅ | 3.6M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 3.4M | 🟢 **-87%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 3.5M | 🟢 **-87%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.4M | ✅ | 118.7M | 🔴 **+76%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 48.2M | ✅ | 84.5M | 🔴 **+75%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 5.2M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 37.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 145.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 48.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 58.9M | ✅ | 12.9M | 🟢 **-78%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 15.1M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 83.9M | +5% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 6.4M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 97.9M | 🔴 **+33%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 98.0M | 🔴 **+33%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ✅ | 4.7M | 🟢 **-89%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 82.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.5M | ✅ | 4.4M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.7M | ✅ | 7.5M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.0M | ✅ | 2.5M | 🟢 **-91%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.1M | ✅ | 1.7M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.6M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.4M | ✅ | 2.8M | 🟢 **-94%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.0M | ✅ | 1.7M | 🟢 **-95%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.2M | ✅ | 9.0M | 🟢 **-81%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.6M | ✅ | 9.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 9.1M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 9.2M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 7.2M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.1M | ✅ | 11.5M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.7M | ✅ | 9.1M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.8M | ✅ | 16.2M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.5M | ✅ | 6.3M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 5.5M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 6.0M | 🟢 **-57%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ✅ | 6.6M | 🟢 **-73%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 4.9M | 🟢 **-75%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 5.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 4.2M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.1M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 66.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.9M | ✅ | 117.6M | 🔴 **+57%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 21.1M | ✅ | 6.9M | 🟢 **-67%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.3M | ✅ | 6.8M | 🟢 **-58%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 56.8M | ✅ | 14.6M | 🟢 **-74%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.3M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.8M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.4M | ✅ | 1.6M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 56.6M | ✅ | 7.0M | 🟢 **-88%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.3M | ✅ | 1.6M | 🟢 **-96%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.8M | ❌ | - | - |
