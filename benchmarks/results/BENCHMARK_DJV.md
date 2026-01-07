# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.0M | 150/199 | 3.7M | 150 | 🟢 **-86%** |
| draft6 | 276 | ✅ 276 | 29.0M | 208/276 | 3.6M | 208 | 🟢 **-87%** |
| draft7 | 313 | ✅ 313 | 15.6M | 219/313 | 4.0M | 219 | 🟢 **-74%** |
| draft2019-09 | 435 | ✅ 435 | 19.8M | 254/435 | 4.6M | 254 | 🟢 **-77%** |
| draft2020-12 | 448 | ✅ 448 | 19.8M | 244/448 | 4.6M | 244 | 🟢 **-77%** |
| **Total** | 1671 | 1670/1671 | 20.3M | 1075/1671 | 4.1M | 1075 | 🟢 **-80%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **9.98x faster** (24 ns vs 242 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.6M | ✅ | 7.8M | 🟢 **-87%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.5M | ✅ | 89.5M | 🟢 **-44%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.6M | ✅ | 21.1M | 🟢 **-84%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 117.1M | 🟢 **-32%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 122.2M | ✅ | 93.3M | 🟢 **-24%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 64.8M | ✅ | 7.3M | 🟢 **-89%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 63.6M | ✅ | 9.6M | 🟢 **-85%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 88.8M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.2M | ✅ | 13.8M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.3M | ✅ | 7.2M | 🟢 **-85%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.4M | ✅ | 8.4M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.3M | ✅ | 6.7M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 154.4M | ✅ | 106.2M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.4M | ✅ | 3.6M | 🟢 **-91%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.6M | ✅ | 59.0M | +19% |
| allOf.json | allOf | 4 | ✅ | 49.2M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.4M | ✅ | 1.5M | 🟢 **-94%** |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 6.7M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 105.7M | 🟢 **-34%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 99.6M | 🟢 **-37%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 7.4M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 113.9M | ✅ | 7.4M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 5.3M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.2M | ✅ | 3.4M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 6.4M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 49.3M | ✅ | 3.5M | 🟢 **-93%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 1.6M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.1M | ✅ | 12.6M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 5.1M | 🟢 **-92%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.7M | 🟢 **-96%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 3.0M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 2.0M | 🟢 **-97%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 95.4M | ✅ | 4.5M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.7M | ✅ | 2.6M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.5M | ✅ | 1.5M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ✅ | 1.2M | 🟢 **-93%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 72.8M | ✅ | 6.3M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 5.0M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 50.1M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 54.1M | ✅ | 4.1M | 🟢 **-92%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 3.3M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 106.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 3.4M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.2M | ✅ | 4.3M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.2M | ✅ | 4.4M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 4.5M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.1M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.1M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 84.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 81.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 83.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 80.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 155.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ✅ | 1.9M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 81.1M | ✅ | 13.3M | 🟢 **-84%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.3M | ✅ | 27.1M | 🟢 **-58%** |
| items.json | items and subitems | 6 | ✅ | 34.9M | ✅ | 2.3M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 13.2M | ✅ | 3.5M | 🟢 **-73%** |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 87.4M | +13% |
| items.json | array-form items with null instance e... | 1 | ✅ | 82.9M | ✅ | 91.8M | +11% |
| maxItems.json | maxItems validation | 4 | ✅ | 70.0M | ✅ | 20.5M | 🟢 **-71%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ✅ | 20.8M | 🟢 **-64%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 23.9M | 🟢 **-55%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ✅ | 9.6M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 59.8M | ✅ | 18.7M | 🟢 **-69%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 62.2M | ✅ | 20.4M | 🟢 **-67%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 68.4M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 59.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 66.7M | ✅ | 20.5M | 🟢 **-69%** |
| minLength.json | minLength validation | 5 | ✅ | 57.5M | ✅ | 11.7M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.9M | ✅ | 24.2M | 🟢 **-55%** |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ✅ | 18.5M | 🟢 **-72%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 69.0M | ✅ | 16.2M | 🟢 **-77%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 55.8M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 17.4M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 66.2M | ✅ | 8.0M | 🟢 **-88%** |
| multipleOf.json | by number | 3 | ✅ | 61.9M | ✅ | 12.2M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 50.6M | ✅ | 10.3M | 🟢 **-80%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.1M | ✅ | 4.9M | 🟢 **-89%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 39.2M | 🟢 **-43%** |
| not.json | not | 2 | ✅ | 62.6M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 44.1M | ✅ | 6.8M | 🟢 **-85%** |
| not.json | not more complex schema | 3 | ✅ | 52.5M | ✅ | 2.9M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 40.2M | ✅ | 3.0M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 46.1M | ✅ | 7.0M | 🟢 **-85%** |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 6.8M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 49.6M | ✅ | 3.8M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.4M | ✅ | 5.1M | 🟢 **-84%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.7M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 49.2M | ✅ | 6.5M | 🟢 **-87%** |
| oneOf.json | oneOf with required | 4 | ✅ | 40.7M | ✅ | 1.4M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 42.8M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.0M | ✅ | 4.9M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 50.4M | ✅ | 29.6M | 🟢 **-41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ✅ | 33.8M | 🟢 **-28%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ✅ | 9.4M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 12.8M | ✅ | 5.1M | 🟢 **-60%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ✅ | 5.4M | 🟢 **-67%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.1M | ✅ | 23.0M | 🔴 **+34%** |
| properties.json | object properties validation | 6 | ✅ | 48.7M | ✅ | 2.2M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.2M | ✅ | 1.9M | 🟢 **-89%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.3M | ✅ | 468K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.9M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.0M | ✅ | 975K | 🟢 **-96%** |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 1.7M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.3M | ✅ | 1.8M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.3M | ✅ | 6.9M | 🟢 **-86%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.2M | ✅ | 1.3M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 46.7M | ✅ | 3.3M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ✅ | 2.6M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 2.5M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.3M | ✅ | 152K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 1.9M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 49.0M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ✅ | 5.3M | 🟢 **-91%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ✅ | 5.0M | 🟢 **-92%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 4.9M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.7M | ✅ | 9.0M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 158.8M | ✅ | 47.5M | 🟢 **-70%** |
| required.json | required with escaped characters | 2 | ✅ | 44.4M | ✅ | 1.2M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 3.0M | 🟢 **-88%** |
| type.json | integer type matches integers | 8 | ✅ | 49.9M | ✅ | 7.2M | 🟢 **-85%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 9.3M | 🟢 **-83%** |
| type.json | string type matches strings | 9 | ✅ | 51.3M | ✅ | 9.2M | 🟢 **-82%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 7.3M | 🟢 **-84%** |
| type.json | array type matches arrays | 7 | ✅ | 50.4M | ✅ | 7.4M | 🟢 **-85%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 8.1M | 🟢 **-84%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ✅ | 7.0M | 🟢 **-86%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.9M | ✅ | 8.6M | 🟢 **-83%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 11.4M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 9.9M | 🟢 **-82%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 13.3M | 🟢 **-79%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 4.7M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ✅ | 5.0M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 10.3M | 🟢 **-87%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 44.3M | 🟢 **-47%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 6.3M | 🟢 **-87%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 44.8M | 🟢 **-42%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 4.6M | 🟢 **-90%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 45.4M | 🟢 **-41%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.6M | 🟢 **-90%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 8.3M | 🟢 **-84%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.4M | ✅ | 8.3M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 8.3M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 8.4M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 6.8M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 10.9M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ✅ | 8.3M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 8.4M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 14.1M | 🟢 **-46%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.3M | ✅ | 5.9M | 🟢 **-78%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.0M | ✅ | 5.4M | 🟢 **-61%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 5.6M | 🟢 **-61%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 6.7M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 5.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ✅ | 5.5M | 🟢 **-69%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 4.0M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 32.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ✅ | 50.7M | 🟢 **-38%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.1M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 61.1M | ✅ | 7.2M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 42.7M | ✅ | 6.7M | 🟢 **-84%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ✅ | 77.7M | 🟢 **-51%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.4M | ✅ | 20.8M | 🟢 **-71%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ✅ | 98.1M | 🟢 **-43%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 76.7M | ✅ | 90.9M | +19% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.4M | ✅ | 6.8M | 🟢 **-84%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 9.2M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 97.4M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.2M | ✅ | 14.2M | 🟢 **-77%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 33.6M | ✅ | 7.4M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.6M | ✅ | 8.3M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.6M | ✅ | 6.7M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 157.1M | ✅ | 101.3M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 3.5M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 59.6M | -11% |
| allOf.json | allOf | 4 | ✅ | 33.4M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.9M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ✅ | 6.3M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 102.4M | 🟢 **-36%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 47.0M | ✅ | 3.7M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.8M | ✅ | 102.3M | 🟢 **-36%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 102.8M | 🟢 **-36%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 57.6M | ✅ | 7.0M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 4.7M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.5M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 63.3M | ✅ | 6.4M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.7M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 96.4M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.6M | ✅ | 103.0M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 47.0M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.2M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 12.8M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.8M | ✅ | 116.1M | 🟢 **-32%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.4M | ✅ | 6.9M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 47.8M | ✅ | 7.0M | 🟢 **-85%** |
| const.json | const with object | 4 | ✅ | 50.2M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 43.7M | ✅ | 2.7M | 🟢 **-94%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 3.9M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 53.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 47.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 83.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 112.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.7M | ✅ | 5.4M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.0M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 50.4M | ✅ | 4.3M | 🟢 **-91%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 100.9M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.5M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 78.6M | ✅ | 10.8M | 🟢 **-86%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 52.5M | ✅ | 6.1M | 🟢 **-88%** |
| contains.json | items + contains | 4 | ✅ | 59.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 88.5M | +15% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 3.6M | 🟢 **-96%** |
| default.json | invalid string value for default | 2 | ✅ | 43.7M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 38.4M | ✅ | 1.8M | 🟢 **-95%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 87.9M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.9M | ✅ | 7.5M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 37.8M | ✅ | 1.4M | 🟢 **-96%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 82.8M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.3M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 51.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 50.1M | ✅ | 6.1M | 🟢 **-88%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 59.7M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 61.1M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 56.7M | ✅ | 1.5M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.0M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.5M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 50.5M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.7M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.7M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 55.8M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 113.6M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.8M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 69.8M | ✅ | 4.3M | 🟢 **-94%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 52.1M | ✅ | 8.6M | 🟢 **-84%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.3M | ✅ | 8.5M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 77.2M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 75.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 79.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 134.0M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 76.9M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 163.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 80.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.8M | ✅ | 1.7M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 53.3M | ✅ | 13.0M | 🟢 **-76%** |
| items.json | an array of schemas for items | 6 | ✅ | 108.8M | ✅ | 27.5M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.8M | ✅ | 99.9M | 🟢 **-42%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 6.9M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.2M | ✅ | 15.8M | 🟢 **-72%** |
| items.json | items and subitems | 6 | ✅ | 35.2M | ✅ | 2.2M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 13.2M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 73.5M | ✅ | 83.8M | +14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.9M | ✅ | 91.8M | +16% |
| maxItems.json | maxItems validation | 4 | ✅ | 69.2M | ✅ | 20.0M | 🟢 **-71%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.8M | ✅ | 10.9M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.6M | ✅ | 20.6M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.1M | ✅ | 10.2M | 🟢 **-78%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.3M | ✅ | 24.5M | 🟢 **-50%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.2M | ✅ | 9.6M | 🟢 **-76%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.9M | ✅ | 9.7M | 🟢 **-76%** |
| maximum.json | maximum validation | 4 | ✅ | 64.3M | ✅ | 18.4M | 🟢 **-71%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.9M | ✅ | 20.3M | 🟢 **-67%** |
| minItems.json | minItems validation | 4 | ✅ | 69.4M | ✅ | 19.8M | 🟢 **-71%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 59.9M | ✅ | 11.0M | 🟢 **-82%** |
| minLength.json | minLength validation | 5 | ✅ | 49.9M | ✅ | 12.6M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ✅ | 10.3M | 🟢 **-79%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.1M | ✅ | 24.4M | 🟢 **-54%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.5M | ✅ | 9.8M | 🟢 **-76%** |
| minimum.json | minimum validation | 4 | ✅ | 65.2M | ✅ | 18.3M | 🟢 **-72%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.5M | ✅ | 17.5M | 🟢 **-72%** |
| multipleOf.json | by int | 3 | ✅ | 64.9M | ✅ | 12.9M | 🟢 **-80%** |
| multipleOf.json | by number | 3 | ✅ | 58.9M | ✅ | 14.3M | 🟢 **-76%** |
| multipleOf.json | by small number | 2 | ✅ | 54.3M | ✅ | 9.7M | 🟢 **-82%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 5.5M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.8M | ✅ | 19.8M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 52.8M | ✅ | 7.0M | 🟢 **-87%** |
| not.json | not more complex schema | 3 | ✅ | 54.9M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 44.2M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.6M | ✅ | 7.1M | 🟢 **-84%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 43.5M | ✅ | 7.1M | 🟢 **-84%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.3M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 48.5M | ✅ | 4.0M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.0M | ✅ | 5.4M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 47.0M | ✅ | 5.8M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 3.4M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 1.7M | 🟢 **-96%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.8M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.2M | ✅ | 6.3M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.8M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.0M | ✅ | 1.5M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.8M | ✅ | 4.5M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 47.9M | ✅ | 28.5M | 🟢 **-41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 45.6M | ✅ | 30.8M | 🟢 **-32%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ✅ | 9.3M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.1M | ✅ | 5.2M | 🟢 **-70%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ✅ | 4.4M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 21.3M | 🔴 **+21%** |
| properties.json | object properties validation | 6 | ✅ | 47.8M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 40.8M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.9M | ✅ | 391K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 2.6M | 🟢 **-96%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.6M | ✅ | 894K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.6M | ✅ | 5.6M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 6.3M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.1M | ✅ | 67.0M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.9M | ✅ | 6.1M | 🟢 **-85%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 36.3M | ✅ | 5.5M | 🟢 **-85%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ✅ | 4.3M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 23.3M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.4M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 43.9M | ✅ | 6.4M | 🟢 **-85%** |
| ref.json | escaped pointer ref | 6 | ✅ | 39.0M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 46.0M | ✅ | 2.9M | 🟢 **-94%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.0M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 57.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.8M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.2M | ✅ | 102.5M | 🟢 **-36%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ✅ | 2.5M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ✅ | 131K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 44.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 55.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 57.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 45.1M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 30.7M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 38.9M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 55.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.0M | ✅ | 4.8M | 🟢 **-92%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 4.8M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 56.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 57.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 46.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 45.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.6M | ✅ | 9.9M | 🟢 **-82%** |
| required.json | required default validation | 1 | ✅ | 158.6M | ✅ | 102.9M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 92.5M | 🟢 **-42%** |
| required.json | required with escaped characters | 2 | ✅ | 42.3M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.6M | ✅ | 3.0M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 46.7M | ✅ | 8.8M | 🟢 **-81%** |
| type.json | number type matches numbers | 9 | ✅ | 51.7M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | string type matches strings | 9 | ✅ | 51.4M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | object type matches objects | 7 | ✅ | 43.7M | ✅ | 8.1M | 🟢 **-81%** |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 8.0M | 🟢 **-83%** |
| type.json | boolean type matches booleans | 10 | ✅ | 48.8M | ✅ | 8.7M | 🟢 **-82%** |
| type.json | null type matches only the null object | 10 | ✅ | 46.1M | ✅ | 7.8M | 🟢 **-83%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 49.1M | ✅ | 9.3M | 🟢 **-81%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 13.0M | 🟢 **-78%** |
| type.json | type: array or object | 5 | ✅ | 52.7M | ✅ | 11.1M | 🟢 **-79%** |
| type.json | type: array, object or null | 5 | ✅ | 59.0M | ✅ | 15.5M | 🟢 **-74%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.4M | ✅ | 5.3M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 5.5M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 15.0M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 81.5M | +2% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 6.5M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 96.6M | 🔴 **+31%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 96.8M | 🔴 **+32%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ✅ | 4.7M | 🟢 **-89%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 51.0M | ✅ | 9.0M | 🟢 **-82%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 9.0M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.9M | ✅ | 7.0M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 11.5M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.8M | ✅ | 8.8M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.0M | ✅ | 8.5M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.6M | ✅ | 15.7M | 🟢 **-38%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.7M | ✅ | 6.2M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 5.5M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.4M | ✅ | 6.0M | 🟢 **-58%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.1M | ✅ | 7.1M | 🟢 **-72%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 5.4M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 5.1M | 🟢 **-75%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 4.2M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 21.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.1M | ✅ | 116.5M | 🔴 **+49%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.4M | ✅ | 827K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.4M | ✅ | 849K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 25.7M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 40.5M | ✅ | 7.1M | 🟢 **-82%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.9M | ✅ | 6.8M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.0M | ✅ | 86.4M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.4M | ✅ | 19.5M | 🟢 **-69%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 111.5M | 🟢 **-35%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 64.2M | ✅ | 93.3M | 🔴 **+45%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.2M | ✅ | 6.7M | 🟢 **-81%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.3M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 103.9M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.6M | ✅ | 14.4M | 🟢 **-77%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 7.2M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.7M | ✅ | 8.2M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.4M | ✅ | 6.6M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.6M | ✅ | 103.9M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.7M | ✅ | 3.6M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 60.7M | -9% |
| allOf.json | allOf | 4 | ✅ | 32.0M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 54.0M | ✅ | 6.4M | 🟢 **-88%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 44.3M | ✅ | 3.6M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ✅ | 103.5M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 103.4M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 7.0M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.4M | ✅ | 4.7M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 130.7M | ✅ | 3.4M | 🟢 **-97%** |
| anyOf.json | anyOf | 4 | ✅ | 60.0M | ✅ | 6.5M | 🟢 **-89%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 47.3M | ✅ | 3.7M | 🟢 **-92%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 103.4M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 103.9M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 2.5M | 🟢 **-94%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 13.0M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.2M | ✅ | 119.0M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.5M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 56.9M | ✅ | 6.9M | 🟢 **-88%** |
| const.json | const with object | 4 | ✅ | 50.2M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 41.3M | ✅ | 2.7M | 🟢 **-94%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 47.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 94.7M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 46.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 93.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 46.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.6M | ✅ | 5.3M | 🟢 **-89%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.2M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 50.2M | ✅ | 4.3M | 🟢 **-91%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.6M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 52.8M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 103.5M | ✅ | 5.8M | 🟢 **-94%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 51.2M | ✅ | 6.2M | 🟢 **-88%** |
| contains.json | items + contains | 4 | ✅ | 59.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 60.1M | ✅ | 11.0M | 🟢 **-82%** |
| contains.json | contains with null instance elements | 1 | ✅ | 129.2M | ✅ | 93.0M | 🟢 **-28%** |
| default.json | invalid type for default | 2 | ✅ | 62.7M | ✅ | 3.5M | 🟢 **-94%** |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ✅ | 2.8M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 44.8M | ✅ | 1.9M | 🟢 **-96%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 54.4M | ✅ | 4.4M | 🟢 **-92%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.2M | ✅ | 7.5M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.1M | ✅ | 2.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 37.0M | ✅ | 1.4M | 🟢 **-96%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 44.3M | ✅ | 2.8M | 🟢 **-94%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.2M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 35.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.3M | ✅ | 6.1M | 🟢 **-89%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 37.6M | ✅ | 1.3M | 🟢 **-96%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 52.8M | ✅ | 4.6M | 🟢 **-91%** |
| enum.json | enums in properties | 6 | ✅ | 35.0M | ✅ | 1.6M | 🟢 **-95%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 49.8M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.5M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 47.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 46.7M | ✅ | 3.0M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 55.2M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.9M | ✅ | 3.9M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.6M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.6M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 42.9M | ✅ | 4.3M | 🟢 **-90%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 49.6M | ✅ | 8.9M | 🟢 **-82%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 49.4M | ✅ | 8.9M | 🟢 **-82%** |
| format.json | email format | 6 | ✅ | 73.6M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 72.6M | ✅ | 114.4M | 🔴 **+58%** |
| format.json | regex format | 6 | ✅ | 73.7M | ✅ | 19.7M | 🟢 **-73%** |
| format.json | ipv4 format | 6 | ✅ | 72.2M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 74.0M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 41.2M | ✅ | 118.5M | 🔴 **+187%** |
| format.json | hostname format | 6 | ✅ | 70.8M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 73.8M | ✅ | 101.1M | 🔴 **+37%** |
| format.json | date-time format | 6 | ✅ | 73.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 67.3M | ✅ | 119.8M | 🔴 **+78%** |
| format.json | json-pointer format | 6 | ✅ | 73.9M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 73.9M | ✅ | 102.7M | 🔴 **+39%** |
| format.json | iri format | 6 | ✅ | 73.7M | ✅ | 120.1M | 🔴 **+63%** |
| format.json | iri-reference format | 6 | ✅ | 73.7M | ✅ | 104.4M | 🔴 **+42%** |
| format.json | uri format | 6 | ✅ | 71.4M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 73.5M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 71.1M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 114.4M | 🟢 **-33%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 162.8M | ✅ | 111.9M | 🟢 **-31%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 108.2M | 🟢 **-37%** |
| if-then-else.json | if and then without else | 3 | ✅ | 54.2M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 59.9M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 50.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 87.8M | ✅ | 114.1M | 🔴 **+30%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 56.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.2M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 50.1M | ✅ | 12.9M | 🟢 **-74%** |
| items.json | an array of schemas for items | 6 | ✅ | 57.6M | ✅ | 27.5M | 🟢 **-52%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 99.1M | 🟢 **-42%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.2M | ✅ | 7.0M | 🟢 **-87%** |
| items.json | items with boolean schemas | 3 | ✅ | 51.8M | ✅ | 15.9M | 🟢 **-69%** |
| items.json | items and subitems | 6 | ✅ | 26.9M | ✅ | 2.1M | 🟢 **-92%** |
| items.json | nested items | 3 | ✅ | 13.0M | ✅ | 3.3M | 🟢 **-75%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ✅ | 84.7M | 🔴 **+20%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 93.3M | 🔴 **+24%** |
| maxItems.json | maxItems validation | 4 | ✅ | 58.4M | ✅ | 20.1M | 🟢 **-66%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.5M | ✅ | 11.2M | 🟢 **-80%** |
| maxLength.json | maxLength validation | 5 | ✅ | 52.4M | ✅ | 21.4M | 🟢 **-59%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 44.7M | ✅ | 10.4M | 🟢 **-77%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.0M | ✅ | 24.1M | 🟢 **-51%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 38.6M | ✅ | 9.7M | 🟢 **-75%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 36.8M | ✅ | 9.8M | 🟢 **-73%** |
| maximum.json | maximum validation | 4 | ✅ | 62.0M | ✅ | 18.8M | 🟢 **-70%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.9M | ✅ | 20.2M | 🟢 **-67%** |
| minItems.json | minItems validation | 4 | ✅ | 61.9M | ✅ | 20.2M | 🟢 **-67%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 11.1M | 🟢 **-80%** |
| minLength.json | minLength validation | 5 | ✅ | 47.9M | ✅ | 12.4M | 🟢 **-74%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 47.4M | ✅ | 10.4M | 🟢 **-78%** |
| minProperties.json | minProperties validation | 6 | ✅ | 50.5M | ✅ | 24.4M | 🟢 **-52%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 38.0M | ✅ | 9.8M | 🟢 **-74%** |
| minimum.json | minimum validation | 4 | ✅ | 61.7M | ✅ | 18.4M | 🟢 **-70%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.7M | ✅ | 17.5M | 🟢 **-70%** |
| multipleOf.json | by int | 3 | ✅ | 61.4M | ✅ | 12.8M | 🟢 **-79%** |
| multipleOf.json | by number | 3 | ✅ | 56.3M | ✅ | 14.4M | 🟢 **-74%** |
| multipleOf.json | by small number | 2 | ✅ | 51.5M | ✅ | 10.0M | 🟢 **-81%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.7M | ✅ | 5.2M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 19.8M | 🟢 **-69%** |
| not.json | not | 2 | ✅ | 56.1M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 49.5M | ✅ | 7.0M | 🟢 **-86%** |
| not.json | not more complex schema | 3 | ✅ | 52.3M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 42.1M | ✅ | 2.9M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.1M | ✅ | 7.1M | 🟢 **-83%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 40.8M | ✅ | 7.1M | 🟢 **-83%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.9M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 46.3M | ✅ | 4.0M | 🟢 **-91%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.1M | ✅ | 5.8M | 🟢 **-81%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 43.9M | ✅ | 5.9M | 🟢 **-87%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ✅ | 3.3M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 43.9M | ✅ | 3.4M | 🟢 **-92%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.3M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.0M | ✅ | 6.3M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.3M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.1M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.8M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ✅ | 29.4M | 🟢 **-40%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 31.8M | 🟢 **-31%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.7M | ✅ | 9.2M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ✅ | 5.1M | 🟢 **-69%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.8M | ✅ | 4.5M | 🟢 **-77%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 22.6M | 🔴 **+30%** |
| properties.json | object properties validation | 6 | ✅ | 44.6M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 39.1M | ✅ | 2.1M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.7M | ✅ | 408K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.9M | ✅ | 3.4M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.9M | ✅ | 896K | 🟢 **-96%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.1M | ✅ | 5.6M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 6.4M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.0M | ✅ | 66.7M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.3M | ✅ | 6.2M | 🟢 **-84%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 5.2M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.0M | ✅ | 4.1M | 🟢 **-89%** |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.6M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 6.4M | 🟢 **-86%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.1M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 43.5M | ✅ | 2.9M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.6M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.2M | ✅ | 2.3M | 🟢 **-94%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 103.6M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.2M | ✅ | 2.5M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 130K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 42.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 40.5M | ✅ | 2.2M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 30.2M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.7M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.5M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.3M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 41.5M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 41.9M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 39.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.6M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 4.7M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 54.4M | ✅ | 4.7M | 🟢 **-91%** |
| refRemote.json | remote ref | 2 | ✅ | 51.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 53.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 52.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 42.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.2M | ✅ | 9.9M | 🟢 **-81%** |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 102.6M | 🟢 **-36%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 95.1M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 19.7M | ✅ | 1.1M | 🟢 **-95%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.9M | ✅ | 3.0M | 🟢 **-87%** |
| type.json | integer type matches integers | 9 | ✅ | 52.3M | ✅ | 8.8M | 🟢 **-83%** |
| type.json | number type matches numbers | 9 | ✅ | 46.0M | ✅ | 10.2M | 🟢 **-78%** |
| type.json | string type matches strings | 9 | ✅ | 48.1M | ✅ | 10.1M | 🟢 **-79%** |
| type.json | object type matches objects | 7 | ✅ | 41.1M | ✅ | 8.0M | 🟢 **-80%** |
| type.json | array type matches arrays | 7 | ✅ | 45.0M | ✅ | 8.0M | 🟢 **-82%** |
| type.json | boolean type matches booleans | 10 | ✅ | 44.1M | ✅ | 8.7M | 🟢 **-80%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ✅ | 7.8M | 🟢 **-82%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.0M | ✅ | 9.4M | 🟢 **-80%** |
| type.json | type as array with one item | 2 | ✅ | 55.5M | ✅ | 13.1M | 🟢 **-76%** |
| type.json | type: array or object | 5 | ✅ | 49.6M | ✅ | 11.0M | 🟢 **-78%** |
| type.json | type: array, object or null | 5 | ✅ | 55.5M | ✅ | 15.7M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.6M | ✅ | 5.2M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.7M | ✅ | 5.5M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.7M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ✅ | 15.1M | 🟢 **-79%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 84.7M | +11% |
| optional/bignum.json | string | 1 | ✅ | 42.5M | ✅ | 6.8M | 🟢 **-84%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.2M | ✅ | 98.4M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.4M | ✅ | 4.8M | 🟢 **-88%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 98.5M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 4.8M | 🟢 **-88%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 343K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.5M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 427K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.6M | ✅ | 8.9M | 🟢 **-82%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 15.7M | ✅ | 9.2M | 🟢 **-42%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.5M | ✅ | 9.1M | 🟢 **-61%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.5M | ✅ | 9.0M | 🟢 **-60%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 24.2M | ✅ | 7.2M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 22.3M | ✅ | 11.9M | 🟢 **-47%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.4M | ✅ | 9.0M | 🟢 **-45%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 21.6M | ✅ | 9.0M | 🟢 **-58%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 16.2M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 6.2M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.4M | ✅ | 5.5M | 🟢 **-59%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 6.0M | 🟢 **-58%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 21.3M | ✅ | 7.2M | 🟢 **-66%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 5.4M | 🟢 **-72%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 5.9M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 4.3M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 23.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 31.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 31.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.0M | ✅ | 118.7M | 🔴 **+60%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.8M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.6M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.5M | ✅ | 7.1M | 🟢 **-72%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.9M | ✅ | 6.7M | 🟢 **-82%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.7M | ✅ | 85.0M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 70.2M | ✅ | 18.7M | 🟢 **-73%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ✅ | 110.9M | 🟢 **-35%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 93.2M | +12% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 3.6M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.4M | ✅ | 6.8M | 🟢 **-82%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 9.2M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.7M | ✅ | 102.7M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.3M | ✅ | 14.2M | 🟢 **-79%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.8M | ✅ | 7.3M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.4M | ✅ | 8.2M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ✅ | 6.8M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 102.6M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 3.6M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 60.3M | -10% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 30.7M | ✅ | 6.0M | 🟢 **-80%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.6M | ✅ | 4.3M | 🟢 **-88%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.0M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 6.2M | 🟢 **-90%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 102.8M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 3.6M | 🟢 **-93%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 87.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.5M | ✅ | 102.4M | 🟢 **-36%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 102.4M | 🟢 **-36%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 6.9M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 4.7M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 130.8M | ✅ | 3.4M | 🟢 **-97%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.4M | ✅ | 6.2M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 3.6M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.4M | ✅ | 103.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.6M | ✅ | 102.8M | 🟢 **-36%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 12.7M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 4.7M | 🟢 **-93%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.4M | ✅ | 117.8M | 🟢 **-36%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 48.7M | ✅ | 7.0M | 🟢 **-86%** |
| const.json | const validation | 3 | ✅ | 55.2M | ✅ | 7.0M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 36.3M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 49.6M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 64.8M | ✅ | 4.0M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 50.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.0M | ✅ | 5.4M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 55.3M | ✅ | 4.3M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.7M | ✅ | 3.3M | 🟢 **-94%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ✅ | 11.1M | 🟢 **-82%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ✅ | 6.3M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 40.4M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.8M | ✅ | 11.0M | 🟢 **-82%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 92.6M | +14% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 92.3M | ✅ | 115.8M | 🔴 **+26%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.5M | ✅ | 114.6M | 🟢 **-35%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 173.0M | ✅ | 100.1M | 🟢 **-42%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 179.4M | ✅ | 118.5M | 🟢 **-34%** |
| default.json | invalid type for default | 2 | ✅ | 46.4M | ✅ | 3.6M | 🟢 **-92%** |
| default.json | invalid string value for default | 2 | ✅ | 51.6M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 46.9M | ✅ | 1.8M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 115.9M | 🟢 **-34%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.4M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.9M | ✅ | 6.1M | 🟢 **-81%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.1M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.5M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enums in properties | 6 | ✅ | 37.9M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 64.3M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 56.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.1M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 64.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.8M | ✅ | 3.7M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 65.1M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.3M | ✅ | 8.8M | 🟢 **-84%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.3M | ✅ | 9.0M | 🟢 **-84%** |
| format.json | email format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 179.9M | ✅ | 119.6M | 🟢 **-34%** |
| format.json | regex format | 6 | ✅ | 155.5M | ✅ | 22.2M | 🟢 **-86%** |
| format.json | ipv4 format | 6 | ✅ | 182.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 170.3M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 182.6M | ✅ | 115.8M | 🟢 **-37%** |
| format.json | hostname format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 169.1M | ✅ | 103.2M | 🟢 **-39%** |
| format.json | date-time format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 179.6M | ✅ | 119.5M | 🟢 **-33%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 163.9M | ✅ | 101.0M | 🟢 **-38%** |
| format.json | iri format | 6 | ✅ | 127.9M | ✅ | 112.6M | -12% |
| format.json | iri-reference format | 6 | ✅ | 182.5M | ✅ | 100.7M | 🟢 **-45%** |
| format.json | uri format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 95.3M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 182.4M | ✅ | 113.4M | 🟢 **-38%** |
| format.json | duration format | 6 | ✅ | 182.5M | ✅ | 102.8M | 🟢 **-44%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 88.1M | ✅ | 112.6M | 🔴 **+28%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.6M | ✅ | 113.3M | 🟢 **-34%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 156.7M | ✅ | 113.2M | 🟢 **-28%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 60.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 112.9M | 🟢 **-34%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 61.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 59.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 56.3M | ✅ | 12.9M | 🟢 **-77%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.2M | ✅ | 27.4M | 🟢 **-58%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.6M | ✅ | 97.1M | 🟢 **-43%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.2M | ✅ | 7.0M | 🟢 **-89%** |
| items.json | items with boolean schemas | 3 | ✅ | 60.2M | ✅ | 15.9M | 🟢 **-74%** |
| items.json | items and subitems | 6 | ✅ | 29.0M | ✅ | 2.1M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 88.0M | +14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 92.8M | +12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 112.8M | 🟢 **-34%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.6M | ✅ | 20.1M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 11.2M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ✅ | 21.2M | 🟢 **-64%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 10.2M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.7M | ✅ | 24.6M | 🟢 **-54%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 39.8M | ✅ | 9.9M | 🟢 **-75%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.7M | ✅ | 9.8M | 🟢 **-77%** |
| maximum.json | maximum validation | 4 | ✅ | 68.4M | ✅ | 18.8M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 20.5M | 🟢 **-70%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 169.7M | ✅ | 113.0M | 🟢 **-33%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.2M | ✅ | 7.1M | 🟢 **-88%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 19.9M | 🟢 **-73%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 10.6M | 🟢 **-83%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 12.4M | 🟢 **-77%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 10.0M | 🟢 **-81%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.1M | ✅ | 24.5M | 🟢 **-56%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.9M | ✅ | 9.8M | 🟢 **-78%** |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ✅ | 18.5M | 🟢 **-73%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 17.4M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 12.9M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 63.6M | ✅ | 14.3M | 🟢 **-78%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 9.9M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 5.5M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 19.8M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 6.8M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.2M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 158.9M | ✅ | 7.0M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.8M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 54.2M | ✅ | 4.1M | 🟢 **-93%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ✅ | 5.7M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 5.9M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.3M | ✅ | 3.3M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 6.3M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 40.9M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 4.6M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 28.3M | 🟢 **-46%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 31.0M | 🟢 **-36%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ✅ | 9.4M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ✅ | 5.1M | 🟢 **-68%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ✅ | 4.5M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 22.7M | 🔴 **+28%** |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 1.9M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.9M | ✅ | 402K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ✅ | 896K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ✅ | 5.6M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ✅ | 6.4M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ✅ | 65.8M | 🟢 **-62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.5M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.9M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.0M | ✅ | 4.2M | 🟢 **-89%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ✅ | 4.5M | 🔴 **+39%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.0M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 6.4M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 47.8M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 37.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 103.0M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 3.7M | 🟢 **-93%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.1M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 60.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.3M | ✅ | 2.1M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 7.1M | 🟢 **-89%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 7.0M | 🟢 **-89%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 5.0M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 59.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 60.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ✅ | 10.2M | 🟢 **-82%** |
| required.json | required default validation | 1 | ✅ | 159.2M | ✅ | 102.7M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 94.3M | 🟢 **-41%** |
| required.json | required with escaped characters | 2 | ✅ | 44.6M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 3.0M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 52.2M | ✅ | 8.7M | 🟢 **-83%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 10.2M | 🟢 **-82%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 8.1M | 🟢 **-83%** |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 8.0M | 🟢 **-85%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 8.5M | 🟢 **-84%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ✅ | 7.8M | 🟢 **-84%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.8M | ✅ | 9.4M | 🟢 **-82%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 12.7M | 🟢 **-80%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 11.1M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 66.5M | ✅ | 15.5M | 🟢 **-77%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 111.8M | 🔴 **+33%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 78.4M | +9% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 79.0M | ✅ | 90.3M | +14% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 43.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 44.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 84.0M | ✅ | 88.5M | +5% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.8M | ✅ | 95.0M | 🔴 **+379%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 50.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.1M | ✅ | 118.0M | 🔴 **+28%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 76.7M | ✅ | 73.3M | -4% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 87.9M | 🔴 **+60%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.4M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.4M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.9M | ✅ | 3.4M | 🟢 **-90%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.0M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.0M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.7M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 75.5M | ✅ | 119.3M | 🔴 **+58%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 83.9M | 🔴 **+69%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.2M | ✅ | 5.2M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 5.5M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ✅ | 12.8M | 🟢 **-79%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 15.0M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 84.5M | +0% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 6.8M | 🟢 **-86%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 97.6M | 🔴 **+27%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 94.6M | 🔴 **+23%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 4.8M | 🟢 **-89%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.9M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.3M | ✅ | 4.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 7.4M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.9M | ✅ | 2.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 1.7M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ✅ | 2.8M | 🟢 **-94%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ✅ | 1.8M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.1M | ✅ | 9.1M | 🟢 **-83%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.8M | ✅ | 9.1M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.0M | ✅ | 9.1M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.2M | ✅ | 6.8M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.5M | ✅ | 11.5M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 9.2M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.7M | ✅ | 9.1M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 16.3M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 6.3M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 5.2M | 🟢 **-62%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 6.0M | 🟢 **-59%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 20.8M | ✅ | 7.3M | 🟢 **-65%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 5.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.5M | ✅ | 5.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 4.2M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.2M | ✅ | 107.6M | 🔴 **+31%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.2M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.5M | ✅ | 14.8M | 🟢 **-75%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 43.3M | ✅ | 2.1M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 41.3M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 7.1M | 🟢 **-89%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 87.8M | ✅ | 16.2M | 🟢 **-82%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.0M | ✅ | 7.3M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.2M | ✅ | 8.2M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.7M | ✅ | 6.7M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 103.3M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 11.8M | ✅ | 3.5M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 61.3M | -8% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.5M | ✅ | 6.1M | 🟢 **-78%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.0M | ✅ | 4.4M | 🟢 **-86%** |
| allOf.json | allOf | 4 | ✅ | 32.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 28.1M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 54.1M | ✅ | 6.4M | 🟢 **-88%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 36.2M | ✅ | 3.7M | 🟢 **-90%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 101.9M | 🟢 **-36%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 102.4M | 🟢 **-36%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.3M | ✅ | 6.9M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.3M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 4.8M | 🟢 **-92%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 42.2M | ✅ | 3.4M | 🟢 **-92%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 59.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 56.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 56.9M | ✅ | 6.3M | 🟢 **-89%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.3M | ✅ | 3.6M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 100.8M | 🟢 **-37%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 104.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 2.5M | 🟢 **-95%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.4M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ✅ | 12.7M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 60.9M | ✅ | 4.7M | 🟢 **-92%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.8M | ✅ | 109.6M | 🟢 **-40%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 43.9M | ✅ | 7.0M | 🟢 **-84%** |
| const.json | const validation | 3 | ✅ | 52.1M | ✅ | 6.8M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 35.1M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 46.8M | ✅ | 2.6M | 🟢 **-94%** |
| const.json | const with null | 2 | ✅ | 61.0M | ✅ | 4.0M | 🟢 **-93%** |
| const.json | const with false does not match 0 | 3 | ✅ | 55.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 54.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 50.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 61.9M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.3M | ✅ | 5.3M | 🟢 **-90%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 59.3M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 4.2M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 48.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 56.9M | ✅ | 3.3M | 🟢 **-94%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.4M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 58.4M | ✅ | 10.7M | 🟢 **-82%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.1M | ✅ | 6.3M | 🟢 **-88%** |
| contains.json | items + contains | 4 | ✅ | 38.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 56.7M | ✅ | 10.7M | 🟢 **-81%** |
| contains.json | contains with null instance elements | 1 | ✅ | 76.9M | ✅ | 81.1M | +5% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ✅ | 117.2M | 🟢 **-34%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 98.3M | 🟢 **-44%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.8M | ✅ | 116.0M | 🟢 **-35%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.5M | ✅ | 103.6M | 🟢 **-44%** |
| default.json | invalid type for default | 2 | ✅ | 64.6M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 49.3M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.2M | ✅ | 1.9M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 56.9M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 166.5M | ✅ | 117.2M | 🟢 **-30%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.2M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 40.3M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 46.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 44.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.1M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.2M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.2M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.9M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 59.8M | ✅ | 6.0M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 40.1M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 61.4M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enums in properties | 6 | ✅ | 36.4M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 66.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 52.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.0M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 49.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.6M | ✅ | 3.1M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 63.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ✅ | 3.7M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 50.4M | ✅ | 8.7M | 🟢 **-83%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 52.0M | ✅ | 8.7M | 🟢 **-83%** |
| format.json | email format | 7 | ✅ | 168.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 179.7M | ✅ | 118.6M | 🟢 **-34%** |
| format.json | regex format | 7 | ✅ | 182.3M | ✅ | 23.5M | 🟢 **-87%** |
| format.json | ipv4 format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 180.5M | ✅ | 118.7M | 🟢 **-34%** |
| format.json | hostname format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 183.4M | ✅ | 104.6M | 🟢 **-43%** |
| format.json | date-time format | 7 | ✅ | 184.2M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 183.6M | ✅ | 118.5M | 🟢 **-35%** |
| format.json | json-pointer format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.1M | ✅ | 104.9M | 🟢 **-43%** |
| format.json | iri format | 7 | ✅ | 183.4M | ✅ | 117.7M | 🟢 **-36%** |
| format.json | iri-reference format | 7 | ✅ | 182.9M | ✅ | 101.4M | 🟢 **-45%** |
| format.json | uri format | 7 | ✅ | 182.8M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 184.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.4M | ✅ | 118.8M | 🟢 **-35%** |
| format.json | duration format | 7 | ✅ | 183.0M | ✅ | 105.1M | 🟢 **-43%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 170.5M | ✅ | 114.3M | 🟢 **-33%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.8M | ✅ | 74.6M | 🟢 **-56%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.8M | ✅ | 111.9M | 🟢 **-35%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 65.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.6M | ✅ | 114.0M | 🟢 **-33%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 60.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.3M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 53.6M | ✅ | 12.8M | 🟢 **-76%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.1M | ✅ | 101.4M | 🟢 **-41%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 58.6M | ✅ | 6.9M | 🟢 **-88%** |
| items.json | items and subitems | 6 | ✅ | 27.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.5M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.5M | ✅ | 6.8M | 🟢 **-85%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.4M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 59.9M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 73.5M | ✅ | 68.0M | -8% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 113.5M | 🟢 **-34%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 49.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 48.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 69.3M | ✅ | 20.0M | 🟢 **-71%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.7M | ✅ | 10.9M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.3M | ✅ | 21.4M | 🟢 **-61%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.3M | ✅ | 10.1M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.9M | ✅ | 24.3M | 🟢 **-53%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.3M | ✅ | 9.7M | 🟢 **-76%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.9M | ✅ | 9.7M | 🟢 **-76%** |
| maximum.json | maximum validation | 4 | ✅ | 65.3M | ✅ | 18.2M | 🟢 **-72%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.0M | ✅ | 19.6M | 🟢 **-69%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 112.6M | 🟢 **-34%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 57.0M | ✅ | 7.1M | 🟢 **-87%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 52.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 54.9M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 44.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 40.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.8M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 60.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 69.4M | ✅ | 20.1M | 🟢 **-71%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 59.8M | ✅ | 10.8M | 🟢 **-82%** |
| minLength.json | minLength validation | 5 | ✅ | 50.4M | ✅ | 12.5M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ✅ | 10.0M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.0M | ✅ | 23.7M | 🟢 **-55%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.6M | ✅ | 9.6M | 🟢 **-76%** |
| minimum.json | minimum validation | 4 | ✅ | 65.1M | ✅ | 18.5M | 🟢 **-72%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.0M | ✅ | 17.4M | 🟢 **-72%** |
| multipleOf.json | by int | 3 | ✅ | 65.2M | ✅ | 12.6M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 59.1M | ✅ | 14.1M | 🟢 **-76%** |
| multipleOf.json | by small number | 2 | ✅ | 54.3M | ✅ | 9.6M | 🟢 **-82%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 5.4M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 19.9M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not multiple types | 3 | ✅ | 52.8M | ✅ | 6.9M | 🟢 **-87%** |
| not.json | not more complex schema | 3 | ✅ | 54.3M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 44.2M | ✅ | 2.9M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.2M | ✅ | 7.1M | 🟢 **-84%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 43.9M | ✅ | 7.0M | 🟢 **-84%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 177.3M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.6M | ✅ | 7.0M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 30.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.1M | ✅ | 3.9M | 🟢 **-92%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.4M | ✅ | 5.7M | 🟢 **-82%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 47.0M | ✅ | 5.6M | 🟢 **-88%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.3M | ✅ | 3.4M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 3.3M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.0M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.3M | ✅ | 6.2M | 🟢 **-89%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.6M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.8M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.8M | ✅ | 4.5M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 50.5M | ✅ | 28.1M | 🟢 **-44%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 31.6M | 🟢 **-33%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ✅ | 9.4M | 🟢 **-62%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.2M | ✅ | 5.0M | 🟢 **-71%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ✅ | 4.5M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 21.9M | 🔴 **+25%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 62.2M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 57.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.8M | ✅ | 103.0M | 🔴 **+31%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.9M | ✅ | 103.3M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 47.4M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 40.8M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.9M | ✅ | 397K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.6M | ✅ | 900K | 🟢 **-96%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.4M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.8M | ✅ | 6.3M | 🟢 **-66%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.5M | ✅ | 66.7M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.7M | ✅ | 6.2M | 🟢 **-85%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.4M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.9M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 22.0M | ✅ | 1.5M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.0M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 38.0M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 43.4M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 35.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 43.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 97.8M | 🟢 **-39%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ✅ | 3.7M | 🟢 **-92%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 45.0M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 54.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 57.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 44.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.4M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 56.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 53.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 56.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.8M | ✅ | 6.9M | 🟢 **-88%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.8M | ✅ | 6.9M | 🟢 **-88%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 4.7M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 56.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 57.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 55.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 45.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.5M | ✅ | 10.0M | 🟢 **-82%** |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 104.4M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 93.5M | 🟢 **-41%** |
| required.json | required with escaped characters | 2 | ✅ | 42.4M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ✅ | 3.0M | 🟢 **-88%** |
| type.json | integer type matches integers | 9 | ✅ | 46.5M | ✅ | 8.6M | 🟢 **-81%** |
| type.json | number type matches numbers | 9 | ✅ | 51.2M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | string type matches strings | 9 | ✅ | 51.2M | ✅ | 10.1M | 🟢 **-80%** |
| type.json | object type matches objects | 7 | ✅ | 43.3M | ✅ | 8.0M | 🟢 **-82%** |
| type.json | array type matches arrays | 7 | ✅ | 47.6M | ✅ | 7.8M | 🟢 **-84%** |
| type.json | boolean type matches booleans | 10 | ✅ | 48.3M | ✅ | 8.4M | 🟢 **-83%** |
| type.json | null type matches only the null object | 10 | ✅ | 45.4M | ✅ | 7.7M | 🟢 **-83%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 48.6M | ✅ | 9.2M | 🟢 **-81%** |
| type.json | type as array with one item | 2 | ✅ | 58.6M | ✅ | 12.6M | 🟢 **-78%** |
| type.json | type: array or object | 5 | ✅ | 52.7M | ✅ | 11.0M | 🟢 **-79%** |
| type.json | type: array, object or null | 5 | ✅ | 58.8M | ✅ | 15.6M | 🟢 **-74%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 79.4M | ✅ | 114.3M | 🔴 **+44%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 53.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.9M | ✅ | 72.7M | +6% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 76.9M | ✅ | 94.1M | 🔴 **+22%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.1M | ✅ | 6.7M | 🟢 **-85%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 72.1M | ✅ | 99.1M | 🔴 **+38%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.6M | ✅ | 114.0M | 🔴 **+454%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 33.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 49.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 37.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.4M | ✅ | 117.9M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 73.5M | ✅ | 84.0M | +14% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 34.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 53.1M | ✅ | 114.3M | 🔴 **+115%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 114.4M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 33.6M | ✅ | 6.5M | 🟢 **-81%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.8M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 33.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 3.4M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.9M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 70.6M | ✅ | 119.6M | 🔴 **+69%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 48.2M | ✅ | 83.6M | 🔴 **+74%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.6M | ✅ | 5.2M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 39.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 48.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.2M | ✅ | 12.7M | 🟢 **-77%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 49.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.2M | ✅ | 15.0M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 88.3M | +10% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 6.8M | 🟢 **-85%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 98.3M | 🔴 **+34%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 4.8M | 🟢 **-89%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 98.2M | 🔴 **+34%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ✅ | 4.7M | 🟢 **-89%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 72.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 55.5M | ✅ | 4.4M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.3M | ✅ | 7.3M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.9M | ✅ | 2.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 40.2M | ✅ | 1.6M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 46.6M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 46.5M | ✅ | 2.8M | 🟢 **-94%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.0M | ✅ | 1.8M | 🟢 **-95%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 51.0M | ✅ | 9.1M | 🟢 **-82%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.6M | ✅ | 9.0M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.9M | ✅ | 9.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.8M | ✅ | 9.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.9M | ✅ | 6.8M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 11.9M | 🟢 **-53%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.2M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.8M | ✅ | 8.5M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.6M | ✅ | 16.1M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.7M | ✅ | 6.1M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.0M | ✅ | 5.3M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 12.9M | ✅ | 5.9M | 🟢 **-54%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.1M | ✅ | 7.1M | 🟢 **-72%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 5.1M | 🟢 **-75%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.4M | ✅ | 5.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 4.1M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.4M | ✅ | 117.9M | 🔴 **+50%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.3M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.5M | ✅ | 6.5M | 🟢 **-71%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.1M | ✅ | 6.5M | 🟢 **-60%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 38.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 57.1M | ✅ | 14.3M | 🟢 **-75%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 13.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.3M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 44.5M | ✅ | 2.0M | 🟢 **-95%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.2M | ✅ | 1.6M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 58.9M | ✅ | 6.9M | 🟢 **-88%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 43.4M | ✅ | 1.6M | 🟢 **-96%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.2M | ❌ | - | - |
