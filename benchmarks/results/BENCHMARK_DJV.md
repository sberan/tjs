# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.1M | 150/199 | 3.5M | 150 | 🟢 **-87%** |
| draft6 | 276 | ✅ 276 | 28.9M | 208/276 | 3.7M | 208 | 🟢 **-87%** |
| draft7 | 313 | ✅ 313 | 16.0M | 219/313 | 4.0M | 219 | 🟢 **-75%** |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 254/435 | 4.6M | 254 | 🟢 **-76%** |
| draft2020-12 | 448 | ✅ 448 | 20.0M | 244/448 | 4.6M | 244 | 🟢 **-77%** |
| **Total** | 1671 | 1670/1671 | 20.4M | 1075/1671 | 4.1M | 1075 | 🟢 **-80%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **10.30x faster** (24 ns vs 244 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 58.1M | ✅ | 7.1M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.0M | ✅ | 87.0M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.6M | ✅ | 19.6M | 🟢 **-85%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 165.6M | ✅ | 110.9M | 🟢 **-33%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.0M | ✅ | 86.0M | 🟢 **-33%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.1M | ✅ | 3.1M | 🟢 **-92%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 53.4M | ✅ | 6.9M | 🟢 **-87%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 63.2M | ✅ | 9.1M | 🟢 **-86%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 147.4M | ✅ | 103.4M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 49.8M | ✅ | 14.3M | 🟢 **-71%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.1M | ✅ | 7.3M | 🟢 **-84%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.3M | ✅ | 8.0M | 🟢 **-77%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.1M | ✅ | 6.5M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 100.7M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 3.5M | 🟢 **-91%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.5M | ✅ | 60.2M | 🔴 **+22%** |
| allOf.json | allOf | 4 | ✅ | 70.1M | ✅ | 1.4M | 🟢 **-98%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.4M | ✅ | 1.4M | 🟢 **-94%** |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 6.4M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ✅ | 101.2M | 🟢 **-36%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 103.5M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 6.6M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 4.6M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.7M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 6.3M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.5M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 12.8M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 4.7M | 🟢 **-93%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 52.6M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 1.9M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 94.1M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.9M | ✅ | 2.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.0M | ✅ | 1.3M | 🟢 **-98%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.3M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 6.1M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.1M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 50.0M | ✅ | 1.5M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 52.3M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.8M | ✅ | 2.9M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 100.5M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 51.1M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 54.5M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 4.2M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.4M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.3M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 82.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 81.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 163.7M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 80.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 161.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.7M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 89.1M | ✅ | 12.9M | 🟢 **-86%** |
| items.json | an array of schemas for items | 6 | ✅ | 63.8M | ✅ | 25.8M | 🟢 **-60%** |
| items.json | items and subitems | 6 | ✅ | 34.4M | ✅ | 2.1M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 13.3M | ✅ | 3.3M | 🟢 **-75%** |
| items.json | items with null instance elements | 1 | ✅ | 68.0M | ✅ | 88.2M | 🔴 **+30%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 82.9M | ✅ | 73.9M | -11% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 20.0M | 🟢 **-73%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ✅ | 20.9M | 🟢 **-65%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 23.7M | 🟢 **-56%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 9.7M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 31.6M | ✅ | 18.6M | 🟢 **-41%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 62.2M | ✅ | 20.1M | 🟢 **-68%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 68.5M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 59.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 66.0M | ✅ | 20.0M | 🟢 **-70%** |
| minLength.json | minLength validation | 5 | ✅ | 51.8M | ✅ | 12.4M | 🟢 **-76%** |
| minProperties.json | minProperties validation | 6 | ✅ | 54.1M | ✅ | 24.1M | 🟢 **-55%** |
| minimum.json | minimum validation | 4 | ✅ | 66.4M | ✅ | 18.1M | 🟢 **-73%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 66.6M | ✅ | 16.3M | 🟢 **-75%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 28.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 17.3M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 12.8M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 60.4M | ✅ | 14.2M | 🟢 **-76%** |
| multipleOf.json | by small number | 2 | ✅ | 48.7M | ✅ | 9.8M | 🟢 **-80%** |
| multipleOf.json | float division = inf | 1 | ✅ | 37.5M | ✅ | 5.4M | 🟢 **-86%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 20.6M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 6.8M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 51.4M | ✅ | 6.9M | 🟢 **-87%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 44.6M | ✅ | 2.9M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 7.0M | 🟢 **-86%** |
| not.json | double negation | 1 | ✅ | 159.4M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 50.6M | ✅ | 4.0M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.9M | ✅ | 5.6M | 🟢 **-82%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.2M | ✅ | 6.3M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 51.1M | ✅ | 29.2M | 🟢 **-43%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 30.6M | 🟢 **-36%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 9.2M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ✅ | 5.1M | 🟢 **-71%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.2M | ✅ | 22.7M | 🔴 **+40%** |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 1.9M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.0M | ✅ | 402K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.0M | ✅ | 894K | 🟢 **-97%** |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 57.2M | ✅ | 1.5M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 47.1M | ✅ | 6.4M | 🟢 **-86%** |
| ref.json | escaped pointer ref | 6 | ✅ | 34.3M | ✅ | 1.2M | 🟢 **-96%** |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 2.9M | 🟢 **-94%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.8M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.1M | ✅ | 130K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 48.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ✅ | 4.5M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 4.4M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 58.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 8.7M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 42.9M | 🟢 **-73%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 2.9M | 🟢 **-89%** |
| type.json | integer type matches integers | 8 | ✅ | 50.2M | ✅ | 6.9M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 55.0M | ✅ | 9.0M | 🟢 **-84%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 8.9M | 🟢 **-84%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 7.0M | 🟢 **-85%** |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 7.3M | 🟢 **-86%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 7.8M | 🟢 **-85%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ✅ | 7.1M | 🟢 **-85%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.9M | ✅ | 8.1M | 🟢 **-84%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 11.0M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 9.5M | 🟢 **-83%** |
| type.json | type: array, object or null | 5 | ✅ | 62.3M | ✅ | 13.1M | 🟢 **-79%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.3M | ✅ | 4.9M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 5.0M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 12.6M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 40.6M | 🟢 **-52%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 6.3M | 🟢 **-87%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 42.6M | 🟢 **-45%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 4.3M | 🟢 **-90%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 43.2M | 🟢 **-44%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.5M | 🟢 **-90%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.8M | ✅ | 8.2M | 🟢 **-84%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.2M | ✅ | 8.3M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 7.9M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 8.2M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 15.8M | ✅ | 6.5M | 🟢 **-59%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.3M | ✅ | 10.2M | 🟢 **-60%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 8.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.4M | ✅ | 8.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 13.6M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 24.3M | ✅ | 5.7M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.6M | ✅ | 5.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ✅ | 5.4M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 6.4M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 5.0M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 5.4M | 🟢 **-73%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 3.9M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.2M | ✅ | 45.8M | 🟢 **-44%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.0M | ✅ | 7.1M | 🟢 **-89%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 42.7M | ✅ | 6.6M | 🟢 **-85%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 83.2M | 🟢 **-48%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.5M | ✅ | 18.1M | 🟢 **-75%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 114.3M | 🟢 **-33%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 92.9M | +18% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.4M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 6.7M | 🟢 **-85%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.6M | ✅ | 103.8M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.6M | ✅ | 14.2M | 🟢 **-79%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 7.3M | 🟢 **-77%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.5M | ✅ | 8.2M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.7M | ✅ | 6.5M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 103.5M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.2M | ✅ | 3.3M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.6M | ✅ | 60.6M | -9% |
| allOf.json | allOf | 4 | ✅ | 33.4M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ✅ | 6.3M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 104.0M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.9M | ✅ | 3.7M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 104.3M | 🟢 **-34%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 103.8M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 6.8M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 4.7M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 62.7M | ✅ | 6.2M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 48.5M | ✅ | 3.7M | 🟢 **-92%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 147.4M | ✅ | 104.0M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 104.0M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 12.8M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 180.0M | ✅ | 116.3M | 🟢 **-35%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 52.1M | ✅ | 6.9M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 42.1M | ✅ | 2.7M | 🟢 **-94%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 55.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.7M | ✅ | 5.4M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.3M | ✅ | 2.9M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 4.3M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.7M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.4M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.2M | ✅ | 11.1M | 🟢 **-89%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.4M | ✅ | 6.2M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 63.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 92.7M | 🔴 **+20%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 50.9M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 99.1M | ✅ | 4.4M | 🟢 **-96%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.2M | ✅ | 7.3M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 38.5M | ✅ | 1.4M | 🟢 **-96%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 72.9M | ✅ | 2.8M | 🟢 **-96%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 59.9M | ✅ | 6.1M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.3M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 63.2M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 56.6M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.0M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.1M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 51.1M | ✅ | 2.9M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.3M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 4.3M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 52.3M | ✅ | 8.8M | 🟢 **-83%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.2M | ✅ | 8.7M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 78.7M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 83.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 163.3M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 83.5M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 163.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 83.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 162.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 81.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 1.8M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 53.6M | ✅ | 12.8M | 🟢 **-76%** |
| items.json | an array of schemas for items | 6 | ✅ | 108.8M | ✅ | 27.4M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 172.0M | ✅ | 101.4M | 🟢 **-41%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 129.1M | ✅ | 7.0M | 🟢 **-95%** |
| items.json | items with boolean schemas | 3 | ✅ | 56.4M | ✅ | 15.9M | 🟢 **-72%** |
| items.json | items and subitems | 6 | ✅ | 33.9M | ✅ | 2.2M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 3.3M | 🟢 **-74%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 44.3M | ✅ | 87.8M | 🔴 **+98%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.8M | ✅ | 92.9M | +18% |
| maxItems.json | maxItems validation | 4 | ✅ | 62.8M | ✅ | 19.5M | 🟢 **-69%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.5M | ✅ | 11.2M | 🟢 **-81%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.1M | ✅ | 20.5M | 🟢 **-62%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 41.8M | ✅ | 10.2M | 🟢 **-76%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.6M | ✅ | 24.4M | 🟢 **-52%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 35.4M | ✅ | 9.3M | 🟢 **-74%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 29.4M | ✅ | 9.8M | 🟢 **-67%** |
| maximum.json | maximum validation | 4 | ✅ | 59.5M | ✅ | 17.3M | 🟢 **-71%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.8M | ✅ | 20.5M | 🟢 **-68%** |
| minItems.json | minItems validation | 4 | ✅ | 59.2M | ✅ | 19.9M | 🟢 **-66%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 50.4M | ✅ | 11.0M | 🟢 **-78%** |
| minLength.json | minLength validation | 5 | ✅ | 49.2M | ✅ | 12.4M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 43.2M | ✅ | 10.4M | 🟢 **-76%** |
| minProperties.json | minProperties validation | 6 | ✅ | 25.9M | ✅ | 24.2M | -7% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 37.2M | ✅ | 9.8M | 🟢 **-74%** |
| minimum.json | minimum validation | 4 | ✅ | 59.9M | ✅ | 18.5M | 🟢 **-69%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.5M | ✅ | 17.4M | 🟢 **-71%** |
| multipleOf.json | by int | 3 | ✅ | 68.0M | ✅ | 12.9M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 53.8M | ✅ | 14.2M | 🟢 **-74%** |
| multipleOf.json | by small number | 2 | ✅ | 54.1M | ✅ | 10.0M | 🟢 **-82%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 5.2M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.2M | ✅ | 19.8M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 55.8M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 50.8M | ✅ | 6.9M | 🟢 **-86%** |
| not.json | not more complex schema | 3 | ✅ | 50.6M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 42.7M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 42.9M | ✅ | 7.0M | 🟢 **-84%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.9M | ✅ | 7.1M | 🟢 **-84%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.0M | ✅ | 7.1M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 158.6M | ✅ | 6.6M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 48.3M | ✅ | 4.0M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 15.7M | ✅ | 5.4M | 🟢 **-66%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 5.8M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.1M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 1.7M | 🟢 **-96%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.5M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.3M | ✅ | 6.4M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.8M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.4M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.6M | ✅ | 4.5M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 29.2M | 🟢 **-41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 45.8M | ✅ | 30.6M | 🟢 **-33%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 9.2M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.2M | ✅ | 5.0M | 🟢 **-71%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.0M | ✅ | 4.2M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.2M | ✅ | 21.7M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 46.8M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 40.5M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.8M | ✅ | 404K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 3.5M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ✅ | 899K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.3M | ✅ | 5.6M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ✅ | 6.4M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 66.0M | 🟢 **-62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.9M | ✅ | 6.1M | 🟢 **-85%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 23.2M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.4M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.8M | ✅ | 6.3M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 38.9M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 45.9M | ✅ | 2.9M | 🟢 **-94%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.8M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.5M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.2M | ✅ | 104.0M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ✅ | 2.5M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.0M | ✅ | 134K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 43.2M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 57.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.9M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.1M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 38.9M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 40.4M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.4M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.6M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 4.8M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 56.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 45.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 45.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.4M | ✅ | 9.8M | 🟢 **-82%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 104.5M | 🟢 **-34%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 94.9M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 42.6M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.6M | ✅ | 2.9M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 46.8M | ✅ | 8.3M | 🟢 **-82%** |
| type.json | number type matches numbers | 9 | ✅ | 51.7M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | string type matches strings | 9 | ✅ | 51.4M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | object type matches objects | 7 | ✅ | 43.7M | ✅ | 8.1M | 🟢 **-81%** |
| type.json | array type matches arrays | 7 | ✅ | 48.3M | ✅ | 7.8M | 🟢 **-84%** |
| type.json | boolean type matches booleans | 10 | ✅ | 48.6M | ✅ | 8.7M | 🟢 **-82%** |
| type.json | null type matches only the null object | 10 | ✅ | 45.7M | ✅ | 7.6M | 🟢 **-83%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 48.6M | ✅ | 9.4M | 🟢 **-81%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 12.8M | 🟢 **-78%** |
| type.json | type: array or object | 5 | ✅ | 52.6M | ✅ | 11.0M | 🟢 **-79%** |
| type.json | type: array, object or null | 5 | ✅ | 58.9M | ✅ | 15.6M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.7M | ✅ | 5.2M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 5.4M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 15.0M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 88.3M | +10% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 6.8M | 🟢 **-85%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.4M | ✅ | 98.6M | 🔴 **+34%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 98.3M | 🔴 **+34%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ✅ | 4.8M | 🟢 **-89%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 50.8M | ✅ | 8.9M | 🟢 **-82%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 24.7M | ✅ | 9.1M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 9.2M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.7M | ✅ | 7.3M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 11.7M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.1M | ✅ | 9.2M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.5M | ✅ | 9.1M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ✅ | 16.7M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.7M | ✅ | 6.3M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 5.5M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 6.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 19.5M | ✅ | 7.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 5.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.4M | ✅ | 5.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 4.2M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 32.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.3M | ✅ | 119.1M | 🔴 **+52%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.0M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 41.4M | ✅ | 831K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.4M | ✅ | 856K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 25.5M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 19.4M | ✅ | 7.2M | 🟢 **-63%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.7M | ✅ | 6.6M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 86.1M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 70.5M | ✅ | 20.4M | 🟢 **-71%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 113.0M | 🟢 **-34%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 91.5M | +10% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 3.4M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.4M | ✅ | 6.6M | 🟢 **-84%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 96.9M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.6M | ✅ | 13.9M | 🟢 **-77%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.8M | ✅ | 7.4M | 🟢 **-77%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 26.8M | ✅ | 8.1M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.5M | ✅ | 6.5M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 157.9M | ✅ | 103.7M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 11.9M | ✅ | 3.5M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 61.3M | -8% |
| allOf.json | allOf | 4 | ✅ | 34.3M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 18.6M | ✅ | 1.5M | 🟢 **-92%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 6.5M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 3.7M | 🟢 **-93%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 102.6M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 103.6M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 62.3M | ✅ | 7.1M | 🟢 **-89%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 85.0M | ✅ | 4.7M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 47.1M | ✅ | 3.4M | 🟢 **-93%** |
| anyOf.json | anyOf | 4 | ✅ | 102.8M | ✅ | 6.3M | 🟢 **-94%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.3M | ✅ | 3.7M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 103.8M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 104.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 2.5M | 🟢 **-97%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.7M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 12.9M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.5M | ✅ | 4.8M | 🟢 **-93%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.6M | ✅ | 115.5M | 🟢 **-37%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.1M | ✅ | 7.0M | 🟢 **-86%** |
| const.json | const validation | 3 | ✅ | 97.5M | ✅ | 7.0M | 🟢 **-93%** |
| const.json | const with object | 4 | ✅ | 33.2M | ✅ | 1.6M | 🟢 **-95%** |
| const.json | const with array | 3 | ✅ | 82.6M | ✅ | 2.6M | 🟢 **-97%** |
| const.json | const with null | 2 | ✅ | 64.7M | ✅ | 4.0M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 110.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 95.7M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 97.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 108.9M | ✅ | 5.2M | 🟢 **-95%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 57.7M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 44.8M | ✅ | 4.2M | 🟢 **-91%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 89.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 94.3M | ✅ | 1.8M | 🟢 **-98%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ✅ | 11.0M | 🟢 **-82%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 105.2M | ✅ | 6.2M | 🟢 **-94%** |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 126.9M | ✅ | 11.0M | 🟢 **-91%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 93.3M | +15% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 52.5M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 1.9M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 99.2M | ✅ | 4.4M | 🟢 **-96%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.7M | ✅ | 7.4M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.5M | ✅ | 2.6M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 83.1M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 49.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 62.3M | ✅ | 6.1M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.1M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 55.1M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.2M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.6M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.6M | ✅ | 3.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 4.3M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.1M | ✅ | 8.7M | 🟢 **-85%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.3M | ✅ | 8.7M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 88.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 160.9M | ✅ | 118.5M | 🟢 **-26%** |
| format.json | regex format | 6 | ✅ | 88.2M | ✅ | 21.0M | 🟢 **-76%** |
| format.json | ipv4 format | 6 | ✅ | 158.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 161.8M | ✅ | 120.0M | 🟢 **-26%** |
| format.json | hostname format | 6 | ✅ | 87.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 162.8M | ✅ | 103.4M | 🟢 **-37%** |
| format.json | date-time format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 162.3M | ✅ | 118.7M | 🟢 **-27%** |
| format.json | json-pointer format | 6 | ✅ | 88.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 161.7M | ✅ | 104.0M | 🟢 **-36%** |
| format.json | iri format | 6 | ✅ | 88.4M | ✅ | 120.8M | 🔴 **+37%** |
| format.json | iri-reference format | 6 | ✅ | 162.2M | ✅ | 104.1M | 🟢 **-36%** |
| format.json | uri format | 6 | ✅ | 88.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 158.9M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 81.1M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 111.6M | 🟢 **-35%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.5M | ✅ | 114.2M | 🟢 **-33%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.5M | ✅ | 94.9M | 🟢 **-45%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 118.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.4M | ✅ | 114.8M | 🟢 **-33%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 111.5M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.3M | ✅ | 1.7M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 56.3M | ✅ | 12.9M | 🟢 **-77%** |
| items.json | an array of schemas for items | 6 | ✅ | 109.1M | ✅ | 27.5M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 96.4M | 🟢 **-44%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 6.7M | 🟢 **-94%** |
| items.json | items with boolean schemas | 3 | ✅ | 60.5M | ✅ | 16.0M | 🟢 **-74%** |
| items.json | items and subitems | 6 | ✅ | 35.2M | ✅ | 2.1M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 13.2M | ✅ | 3.3M | 🟢 **-75%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 88.3M | +14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 93.1M | +12% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 20.0M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 11.0M | 🟢 **-83%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.9M | ✅ | 21.3M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 10.4M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ✅ | 24.3M | 🟢 **-55%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 9.7M | 🟢 **-77%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ✅ | 9.9M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 67.6M | ✅ | 18.3M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 20.5M | 🟢 **-70%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 20.0M | 🟢 **-73%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 11.2M | 🟢 **-82%** |
| minLength.json | minLength validation | 5 | ✅ | 51.3M | ✅ | 12.7M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 10.4M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 54.9M | ✅ | 24.5M | 🟢 **-55%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.9M | ✅ | 9.7M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 18.0M | 🟢 **-74%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.8M | ✅ | 17.2M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 69.2M | ✅ | 12.6M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 60.2M | ✅ | 14.2M | 🟢 **-76%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 9.9M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 5.5M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 19.8M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 2.7M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 45.9M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 7.0M | 🟢 **-86%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 174.1M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.6M | ✅ | 6.8M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 50.6M | ✅ | 3.9M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.3M | ✅ | 5.7M | 🟢 **-82%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 5.8M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 6.3M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 4.6M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 29.0M | 🟢 **-45%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 31.4M | 🟢 **-34%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 9.4M | 🟢 **-62%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 5.2M | 🟢 **-69%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 4.6M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 22.5M | 🔴 **+27%** |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 407K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 900K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.8M | ✅ | 5.6M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.6M | ✅ | 6.3M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 66.0M | 🟢 **-62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.5M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 5.4M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.8M | ✅ | 4.2M | 🟢 **-89%** |
| ref.json | root pointer ref | 4 | ✅ | 23.5M | ✅ | 1.5M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 6.5M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 46.4M | ✅ | 2.9M | 🟢 **-94%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.5M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 57.8M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ✅ | 103.9M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 2.5M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 134K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.4M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 4.8M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 58.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.2M | ✅ | 10.0M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 104.1M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 94.6M | 🟢 **-41%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.2M | ✅ | 3.0M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 52.6M | ✅ | 8.7M | 🟢 **-84%** |
| type.json | number type matches numbers | 9 | ✅ | 52.6M | ✅ | 10.2M | 🟢 **-81%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 10.1M | 🟢 **-81%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 8.1M | 🟢 **-82%** |
| type.json | array type matches arrays | 7 | ✅ | 51.1M | ✅ | 8.0M | 🟢 **-84%** |
| type.json | boolean type matches booleans | 10 | ✅ | 47.7M | ✅ | 8.6M | 🟢 **-82%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 7.7M | 🟢 **-84%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 9.3M | 🟢 **-82%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 13.1M | 🟢 **-79%** |
| type.json | type: array or object | 5 | ✅ | 55.5M | ✅ | 11.0M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 63.0M | ✅ | 15.7M | 🟢 **-75%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.9M | ✅ | 5.3M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 5.4M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 15.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 87.0M | +3% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 6.8M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.6M | ✅ | 98.2M | 🔴 **+47%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 96.8M | 🔴 **+26%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 9.1M | 🟢 **-83%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.2M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 9.2M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 9.1M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.9M | ✅ | 7.1M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 11.8M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.8M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.0M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 16.4M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 6.3M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ✅ | 5.4M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.8M | ✅ | 5.9M | 🟢 **-57%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.2M | ✅ | 7.3M | 🟢 **-70%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.4M | ✅ | 5.4M | 🟢 **-70%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 5.9M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 4.2M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.6M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 85.1M | ✅ | 105.0M | 🔴 **+23%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 32.4M | ✅ | 7.3M | 🟢 **-77%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.0M | ✅ | 6.8M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ✅ | 84.4M | 🟢 **-47%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 67.8M | ✅ | 18.3M | 🟢 **-73%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 114.2M | 🟢 **-34%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 68.5M | ✅ | 61.0M | -11% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.5M | ✅ | 6.5M | 🟢 **-83%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.2M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 103.5M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.9M | ✅ | 14.3M | 🟢 **-79%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.7M | ✅ | 7.2M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.0M | ✅ | 8.0M | 🟢 **-77%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 6.7M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 103.7M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.1M | ✅ | 3.6M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 61.3M | -8% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 13.7M | ✅ | 6.0M | 🟢 **-56%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 19.1M | ✅ | 4.4M | 🟢 **-77%** |
| allOf.json | allOf | 4 | ✅ | 33.6M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.1M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 58.6M | ✅ | 6.4M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.6M | ✅ | 104.4M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.2M | ✅ | 3.6M | 🟢 **-93%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 146.5M | ✅ | 104.4M | 🟢 **-29%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 147.0M | ✅ | 104.0M | 🟢 **-29%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 60.4M | ✅ | 6.9M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 59.4M | ✅ | 4.8M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 80.5M | ✅ | 3.4M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 54.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 104.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 52.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 61.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 65.3M | ✅ | 6.3M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 3.6M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 104.0M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 104.2M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.3M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.5M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 162.1M | ✅ | 12.8M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 59.5M | ✅ | 4.8M | 🟢 **-92%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 177.0M | ✅ | 120.5M | 🟢 **-32%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.0M | ✅ | 7.0M | 🟢 **-86%** |
| const.json | const validation | 3 | ✅ | 54.3M | ✅ | 7.0M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 34.3M | ✅ | 1.6M | 🟢 **-95%** |
| const.json | const with array | 3 | ✅ | 40.7M | ✅ | 2.7M | 🟢 **-93%** |
| const.json | const with null | 2 | ✅ | 64.2M | ✅ | 4.1M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 57.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 53.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 5.4M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 54.5M | ✅ | 4.2M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ✅ | 11.1M | 🟢 **-82%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 6.3M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 40.4M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.5M | ✅ | 11.0M | 🟢 **-81%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.8M | ✅ | 93.2M | +15% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.6M | ✅ | 117.1M | 🟢 **-34%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.6M | ✅ | 96.2M | 🟢 **-45%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.5M | ✅ | 115.3M | 🟢 **-35%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.0M | ✅ | 105.8M | 🟢 **-43%** |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 47.4M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.9M | ✅ | 1.9M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 117.3M | 🟢 **-33%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 47.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.8M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 6.1M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.6M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.9M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.4M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.0M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 54.5M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.0M | ✅ | 8.8M | 🟢 **-85%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 58.8M | ✅ | 8.9M | 🟢 **-85%** |
| format.json | email format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 181.6M | ✅ | 118.6M | 🟢 **-35%** |
| format.json | regex format | 6 | ✅ | 183.0M | ✅ | 22.3M | 🟢 **-88%** |
| format.json | ipv4 format | 6 | ✅ | 170.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 183.1M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 179.6M | ✅ | 117.4M | 🟢 **-35%** |
| format.json | hostname format | 6 | ✅ | 178.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 175.0M | ✅ | 104.3M | 🟢 **-40%** |
| format.json | date-time format | 6 | ✅ | 174.0M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 181.8M | ✅ | 120.8M | 🟢 **-34%** |
| format.json | json-pointer format | 6 | ✅ | 171.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 181.0M | ✅ | 101.6M | 🟢 **-44%** |
| format.json | iri format | 6 | ✅ | 174.3M | ✅ | 116.3M | 🟢 **-33%** |
| format.json | iri-reference format | 6 | ✅ | 181.9M | ✅ | 104.2M | 🟢 **-43%** |
| format.json | uri format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 181.9M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 181.6M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 180.1M | ✅ | 116.9M | 🟢 **-35%** |
| format.json | duration format | 6 | ✅ | 181.7M | ✅ | 103.9M | 🟢 **-43%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.3M | ✅ | 109.0M | 🟢 **-36%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.7M | ✅ | 95.6M | 🟢 **-44%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 114.1M | 🟢 **-34%** |
| if-then-else.json | if and then without else | 3 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 56.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 162.8M | ✅ | 106.2M | 🟢 **-35%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 62.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.8M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 56.1M | ✅ | 12.9M | 🟢 **-77%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.5M | ✅ | 27.0M | 🟢 **-59%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.2M | ✅ | 89.8M | 🟢 **-48%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.6M | ✅ | 7.0M | 🟢 **-89%** |
| items.json | items with boolean schemas | 3 | ✅ | 60.4M | ✅ | 15.7M | 🟢 **-74%** |
| items.json | items and subitems | 6 | ✅ | 29.1M | ✅ | 2.2M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 76.2M | ✅ | 88.9M | +17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 92.9M | +12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 114.1M | 🟢 **-34%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 58.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 56.6M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.6M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 20.1M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 11.2M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.8M | ✅ | 21.5M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 10.2M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 22.2M | 🟢 **-59%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 9.8M | 🟢 **-77%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.6M | ✅ | 9.9M | 🟢 **-76%** |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 18.8M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 20.4M | 🟢 **-70%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 165.0M | ✅ | 113.5M | 🟢 **-31%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.7M | ✅ | 7.2M | 🟢 **-88%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.9M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 63.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 19.4M | 🟢 **-74%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 62.7M | ✅ | 10.7M | 🟢 **-83%** |
| minLength.json | minLength validation | 5 | ✅ | 49.0M | ✅ | 12.7M | 🟢 **-74%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ✅ | 10.4M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.1M | ✅ | 24.4M | 🟢 **-56%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 9.7M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 68.9M | ✅ | 18.7M | 🟢 **-73%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 17.4M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 12.8M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 62.9M | ✅ | 14.3M | 🟢 **-77%** |
| multipleOf.json | by small number | 2 | ✅ | 51.9M | ✅ | 9.8M | 🟢 **-81%** |
| multipleOf.json | float division = inf | 1 | ✅ | 42.7M | ✅ | 5.4M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 67.0M | ✅ | 19.8M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 61.8M | ✅ | 6.7M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 56.0M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not more complex schema | 3 | ✅ | 54.6M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 41.2M | ✅ | 2.8M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ✅ | 7.0M | 🟢 **-86%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.0M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 7.0M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 52.2M | ✅ | 3.9M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ✅ | 5.7M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.3M | ✅ | 5.9M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.1M | ✅ | 3.3M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.2M | ✅ | 6.3M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 40.5M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 56.9M | ✅ | 4.5M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 28.9M | 🟢 **-44%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.4M | ✅ | 31.4M | 🟢 **-32%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.7M | ✅ | 9.4M | 🟢 **-63%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ✅ | 5.2M | 🟢 **-68%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ✅ | 4.5M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 23.0M | 🔴 **+30%** |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 1.9M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.5M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 409K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 901K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 24.4M | ✅ | 5.6M | 🟢 **-77%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 6.3M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 67.2M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.1M | ✅ | 5.4M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 4.2M | 🟢 **-90%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 4.4M | 🔴 **+43%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.8M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 6.4M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 47.9M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.6M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 100.3M | 🟢 **-37%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.0M | ✅ | 3.6M | 🟢 **-93%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 41.4M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 43.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 32.1M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.4M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 41.1M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.0M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 57.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 7.1M | 🟢 **-89%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 60.5M | ✅ | 7.0M | 🟢 **-88%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.3M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 60.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 57.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 58.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ✅ | 10.3M | 🟢 **-82%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 97.5M | 🟢 **-39%** |
| required.json | required with empty array | 1 | ✅ | 159.0M | ✅ | 95.3M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.0M | ✅ | 2.9M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 8.7M | 🟢 **-84%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | string type matches strings | 9 | ✅ | 54.6M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | object type matches objects | 7 | ✅ | 45.4M | ✅ | 8.0M | 🟢 **-82%** |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 7.9M | 🟢 **-85%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 8.6M | 🟢 **-83%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.7M | ✅ | 7.8M | 🟢 **-84%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.8M | ✅ | 9.4M | 🟢 **-82%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 12.6M | 🟢 **-80%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 11.0M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 15.6M | 🟢 **-75%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 112.5M | 🔴 **+34%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.9M | ✅ | 76.9M | +13% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.8M | ✅ | 89.7M | +11% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 82.6M | ✅ | 99.0M | +20% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ✅ | 99.1M | 🔴 **+371%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.4M | ✅ | 119.3M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.2M | ✅ | 84.1M | +12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.6M | ✅ | 90.6M | 🔴 **+66%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.4M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.2M | ✅ | 3.4M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.0M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.3M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.9M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 38.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.7M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 73.8M | ✅ | 120.3M | 🔴 **+63%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 43.8M | ✅ | 84.0M | 🔴 **+92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.6M | ✅ | 5.2M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 15.0M | ✅ | 5.4M | 🟢 **-64%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.0M | ✅ | 12.8M | 🟢 **-79%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 15.0M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 86.8M | +3% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 6.8M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 76.8M | ✅ | 91.7M | +19% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 91.6M | +19% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 56.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.2M | ✅ | 4.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 7.4M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 35.0M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ✅ | 1.6M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.3M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ✅ | 2.7M | 🟢 **-94%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.7M | ✅ | 1.8M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.3M | ✅ | 9.1M | 🟢 **-83%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 7.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 11.9M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 9.2M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.2M | ✅ | 16.1M | 🟢 **-36%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 6.3M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.9M | ✅ | 5.5M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.7M | ✅ | 6.0M | 🟢 **-56%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 7.0M | 🟢 **-72%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 5.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.4M | ✅ | 5.7M | 🟢 **-69%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 4.2M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 110.5M | 🔴 **+34%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 39.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 58.4M | ✅ | 14.9M | 🟢 **-75%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 13.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.1M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 44.4M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.4M | ✅ | 1.6M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 61.1M | ✅ | 7.1M | 🟢 **-88%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 43.3M | ✅ | 1.6M | 🟢 **-96%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.9M | ✅ | 16.0M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.1M | ✅ | 7.5M | 🟢 **-77%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 6.7M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 154.5M | ✅ | 103.9M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 59.7M | -10% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.0M | ✅ | 6.3M | 🟢 **-80%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.2M | ✅ | 4.4M | 🟢 **-88%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 28.3M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 68.9M | ✅ | 6.4M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.4M | ✅ | 103.4M | 🟢 **-33%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 3.7M | 🟢 **-93%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.1M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 153.6M | ✅ | 102.5M | 🟢 **-33%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 141.9M | ✅ | 103.7M | 🟢 **-27%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.0M | ✅ | 7.1M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 4.8M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 81.8M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 145.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.9M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.5M | ✅ | 6.3M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 153.9M | ✅ | 103.7M | 🟢 **-33%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 153.8M | ✅ | 103.6M | 🟢 **-33%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.5M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.9M | ✅ | 12.6M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 4.8M | 🟢 **-93%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.3M | ✅ | 119.0M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.5M | ✅ | 7.1M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 7.0M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 36.4M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 48.7M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 64.7M | ✅ | 4.0M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 52.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 49.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 50.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 54.9M | ✅ | 5.4M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 4.3M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.0M | ✅ | 10.9M | 🟢 **-82%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.4M | ✅ | 6.3M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 11.0M | 🟢 **-82%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 88.5M | +10% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 169.8M | ✅ | 116.1M | 🟢 **-32%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 170.0M | ✅ | 99.6M | 🟢 **-41%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 173.4M | ✅ | 117.8M | 🟢 **-32%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 178.4M | ✅ | 102.7M | 🟢 **-42%** |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 52.0M | ✅ | 2.7M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ✅ | 1.8M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.4M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 169.6M | ✅ | 115.8M | 🟢 **-32%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.1M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.6M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.3M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 16.0M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.1M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 7.0M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 10.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 6.2M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.4M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.3M | ✅ | 4.7M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 38.2M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.3M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 65.1M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.5M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.7M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 56.6M | ✅ | 8.8M | 🟢 **-84%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.0M | ✅ | 8.8M | 🟢 **-85%** |
| format.json | email format | 7 | ✅ | 177.4M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 176.5M | ✅ | 118.4M | 🟢 **-33%** |
| format.json | regex format | 7 | ✅ | 177.3M | ✅ | 22.2M | 🟢 **-87%** |
| format.json | ipv4 format | 7 | ✅ | 177.9M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 175.6M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 173.5M | ✅ | 118.7M | 🟢 **-32%** |
| format.json | hostname format | 7 | ✅ | 177.7M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 177.3M | ✅ | 103.5M | 🟢 **-42%** |
| format.json | date-time format | 7 | ✅ | 173.6M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 176.9M | ✅ | 119.0M | 🟢 **-33%** |
| format.json | json-pointer format | 7 | ✅ | 177.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 176.5M | ✅ | 105.0M | 🟢 **-41%** |
| format.json | iri format | 7 | ✅ | 177.5M | ✅ | 119.0M | 🟢 **-33%** |
| format.json | iri-reference format | 7 | ✅ | 178.0M | ✅ | 103.8M | 🟢 **-42%** |
| format.json | uri format | 7 | ✅ | 177.1M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 177.9M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 177.3M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 177.3M | ✅ | 119.0M | 🟢 **-33%** |
| format.json | duration format | 7 | ✅ | 176.8M | ✅ | 104.6M | 🟢 **-41%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 163.9M | ✅ | 114.2M | 🟢 **-30%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 165.2M | ✅ | 114.2M | 🟢 **-31%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 164.5M | ✅ | 114.0M | 🟢 **-31%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.1M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.7M | ✅ | 114.5M | 🟢 **-31%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.6M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 58.4M | ✅ | 12.7M | 🟢 **-78%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.5M | ✅ | 98.6M | 🟢 **-40%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.2M | ✅ | 7.0M | 🟢 **-89%** |
| items.json | items and subitems | 6 | ✅ | 28.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.3M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.8M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 47.4M | ✅ | 6.8M | 🟢 **-86%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 47.1M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 85.6M | +11% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 163.4M | ✅ | 114.8M | 🟢 **-30%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 49.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 20.1M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 11.2M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.9M | ✅ | 21.6M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 10.3M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 24.4M | 🟢 **-54%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 9.6M | 🟢 **-77%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.2M | ✅ | 9.7M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 18.5M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 18.3M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 151.1M | ✅ | 114.6M | 🟢 **-24%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 58.2M | ✅ | 7.1M | 🟢 **-88%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.4M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 165.3M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 19.9M | 🟢 **-73%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.0M | ✅ | 11.0M | 🟢 **-82%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 11.4M | 🟢 **-79%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 10.4M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.2M | ✅ | 24.2M | 🟢 **-56%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ✅ | 9.8M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 68.5M | ✅ | 18.6M | 🟢 **-73%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.8M | ✅ | 17.3M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 69.3M | ✅ | 12.7M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 14.4M | 🟢 **-77%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 10.0M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 5.3M | 🟢 **-88%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 19.9M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 51.7M | ✅ | 6.9M | 🟢 **-87%** |
| not.json | not more complex schema | 3 | ✅ | 57.7M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.6M | ✅ | 7.1M | 🟢 **-85%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.5M | ✅ | 7.1M | 🟢 **-85%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.9M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 153.1M | ✅ | 7.0M | 🟢 **-95%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 4.0M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 5.6M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 5.7M | 🟢 **-89%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 153.1M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.3M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.6M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 6.4M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 40.6M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.2M | ✅ | 1.5M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 4.6M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 28.7M | 🟢 **-44%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 31.6M | 🟢 **-34%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 9.3M | 🟢 **-63%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 4.9M | 🟢 **-68%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.1M | ✅ | 5.2M | 🟢 **-70%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ✅ | 4.5M | 🟢 **-77%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 22.8M | 🔴 **+29%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 61.7M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ✅ | 94.8M | +14% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 82.8M | ✅ | 103.6M | 🔴 **+25%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.5M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.9M | ✅ | 395K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.3M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 896K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.4M | ✅ | 5.7M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ✅ | 6.3M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 165.4M | ✅ | 66.6M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.8M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 22.9M | ✅ | 1.5M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.1M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 153.0M | ✅ | 98.9M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 3.6M | 🟢 **-93%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 45.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 7.1M | 🟢 **-89%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.0M | ✅ | 7.1M | 🟢 **-88%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 4.8M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 59.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 60.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 60.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.8M | ✅ | 10.2M | 🟢 **-82%** |
| required.json | required default validation | 1 | ✅ | 153.3M | ✅ | 100.8M | 🟢 **-34%** |
| required.json | required with empty array | 1 | ✅ | 152.7M | ✅ | 95.1M | 🟢 **-38%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 2.9M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 8.6M | 🟢 **-84%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | string type matches strings | 9 | ✅ | 54.6M | ✅ | 10.1M | 🟢 **-81%** |
| type.json | object type matches objects | 7 | ✅ | 54.5M | ✅ | 8.1M | 🟢 **-85%** |
| type.json | array type matches arrays | 7 | ✅ | 51.1M | ✅ | 8.0M | 🟢 **-84%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 8.7M | 🟢 **-83%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 7.6M | 🟢 **-84%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.4M | ✅ | 9.4M | 🟢 **-82%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 12.6M | 🟢 **-80%** |
| type.json | type: array or object | 5 | ✅ | 55.5M | ✅ | 10.9M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 67.2M | ✅ | 15.3M | 🟢 **-77%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.7M | ✅ | 113.6M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 78.1M | +8% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.7M | ✅ | 93.6M | +16% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 47.2M | ✅ | 6.8M | 🟢 **-86%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 83.9M | ✅ | 101.1M | 🔴 **+21%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 112.5M | 🔴 **+435%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.2M | ✅ | 120.7M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 75.5M | -2% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 113.9M | 🔴 **+107%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 164.8M | ✅ | 114.4M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.7M | ✅ | 6.7M | 🟢 **-81%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.0M | ✅ | 3.4M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.4M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.0M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 41.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 74.8M | ✅ | 117.3M | 🔴 **+57%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.1M | ✅ | 79.0M | 🔴 **+61%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.2M | ✅ | 5.2M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 38.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 157.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.9M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.4M | ✅ | 12.9M | 🟢 **-79%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 15.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 88.2M | +5% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 6.7M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 86.3M | +12% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 96.7M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.4M | ✅ | 4.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 169.7M | ✅ | 7.5M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.0M | ✅ | 2.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 1.6M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ✅ | 2.7M | 🟢 **-94%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.0M | ✅ | 1.7M | 🟢 **-96%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 9.1M | 🟢 **-83%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 9.2M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 8.9M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 9.2M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 7.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 12.0M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.1M | ✅ | 9.1M | 🟢 **-62%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 9.2M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 23.4M | ✅ | 16.3M | 🟢 **-30%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.4M | ✅ | 6.2M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 5.5M | 🟢 **-61%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.4M | ✅ | 5.8M | 🟢 **-60%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 7.3M | 🟢 **-71%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 5.4M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 5.8M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 4.3M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.6M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.6M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 35.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ✅ | 119.0M | 🔴 **+35%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.7M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.6M | ✅ | 6.3M | 🟢 **-72%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 20.3M | ✅ | 6.7M | 🟢 **-67%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.9M | ✅ | 14.3M | 🟢 **-76%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.9M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.9M | ✅ | 1.6M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 7.0M | 🟢 **-89%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.4M | ❌ | - | - |
