# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.8M | 150/199 | 3.5M | 150 | 🟢 **-87%** |
| draft6 | 276 | ✅ 276 | 29.8M | 208/276 | 3.7M | 208 | 🟢 **-88%** |
| draft7 | 313 | ✅ 313 | 15.1M | 219/313 | 4.0M | 219 | 🟢 **-73%** |
| draft2019-09 | 435 | ✅ 435 | 18.8M | 254/435 | 4.6M | 254 | 🟢 **-75%** |
| draft2020-12 | 448 | ✅ 448 | 19.1M | 244/448 | 4.7M | 244 | 🟢 **-76%** |
| **Total** | 1671 | 1670/1671 | 19.7M | 1075/1671 | 4.1M | 1075 | 🟢 **-79%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **10.38x faster** (24 ns vs 244 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.3M | -1% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 85.1M | ✅ | 83.0M | -3% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.1M | ✅ | 19.0M | 🟢 **-87%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 88.3M | ✅ | 114.4M | 🔴 **+30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 92.6M | 🟢 **-26%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 45.1M | ✅ | 3.5M | 🟢 **-92%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 49.6M | ✅ | 6.8M | 🟢 **-86%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.7M | ✅ | 9.3M | 🟢 **-87%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.9M | ✅ | 103.8M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 37.0M | ✅ | 14.7M | 🟢 **-60%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.9M | ✅ | 6.9M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.2M | ✅ | 8.3M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.5M | ✅ | 6.7M | 🟢 **-85%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 77.1M | ✅ | 102.8M | 🔴 **+33%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 32.8M | ✅ | 3.5M | 🟢 **-89%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 61.5M | 🔴 **+21%** |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.0M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 6.4M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 84.4M | ✅ | 103.9M | 🔴 **+23%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 104.3M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.5M | ✅ | 3.4M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 75.9M | ✅ | 6.2M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.2M | ✅ | 12.9M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 4.8M | 🟢 **-94%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ✅ | 1.9M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.7M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.0M | ✅ | 4.3M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.8M | ✅ | 2.5M | 🟢 **-93%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 56.2M | ✅ | 1.4M | 🟢 **-98%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.5M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.4M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 6.0M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.0M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.3M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.5M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.0M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.8M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 4.3M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 56.1M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 86.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 87.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.4M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 80.7M | ✅ | 12.8M | 🟢 **-84%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ✅ | 27.6M | 🟢 **-58%** |
| items.json | items and subitems | 6 | ✅ | 28.8M | ✅ | 2.2M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 88.5M | 🔴 **+23%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 92.9M | 🔴 **+21%** |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ✅ | 20.2M | 🟢 **-73%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.4M | ✅ | 21.4M | 🟢 **-62%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.5M | ✅ | 24.0M | 🟢 **-57%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.5M | ✅ | 9.9M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ✅ | 18.8M | 🟢 **-74%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.0M | ✅ | 20.4M | 🟢 **-72%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 73.2M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 67.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 74.6M | ✅ | 19.8M | 🟢 **-73%** |
| minLength.json | minLength validation | 5 | ✅ | 55.5M | ✅ | 11.9M | 🟢 **-79%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.5M | ✅ | 24.3M | 🟢 **-58%** |
| minimum.json | minimum validation | 4 | ✅ | 71.1M | ✅ | 17.8M | 🟢 **-75%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 71.8M | ✅ | 16.4M | 🟢 **-77%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 67.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.3M | ✅ | 17.6M | 🟢 **-74%** |
| multipleOf.json | by int | 3 | ✅ | 73.0M | ✅ | 12.4M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 67.3M | ✅ | 14.3M | 🟢 **-79%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 9.8M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.2M | ✅ | 5.4M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 19.8M | 🟢 **-72%** |
| not.json | not | 2 | ✅ | 72.9M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 65.4M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not more complex schema | 3 | ✅ | 63.0M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 50.5M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.5M | ✅ | 7.1M | 🟢 **-89%** |
| not.json | double negation | 1 | ✅ | 85.0M | ✅ | 7.0M | 🟢 **-92%** |
| oneOf.json | oneOf | 4 | ✅ | 70.9M | ✅ | 4.1M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ✅ | 5.6M | 🟢 **-83%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 6.3M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.6M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 42.3M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.7M | ✅ | 4.6M | 🟢 **-92%** |
| pattern.json | pattern validation | 8 | ✅ | 53.2M | ✅ | 29.4M | 🟢 **-45%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.3M | ✅ | 31.4M | 🔴 **+48%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.6M | ✅ | 8.9M | 🟢 **-67%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 5.1M | 🟢 **-64%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.2M | ✅ | 5.0M | 🟢 **-69%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.5M | ✅ | 22.8M | 🔴 **+38%** |
| properties.json | object properties validation | 6 | ✅ | 53.5M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.6M | ✅ | 398K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.6M | ✅ | 897K | 🟢 **-97%** |
| ref.json | root pointer ref | 4 | ✅ | 22.3M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 25.5M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.0M | ✅ | 6.3M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.8M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 29.1M | ✅ | 2.9M | 🟢 **-90%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.2M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 73.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.3M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 51.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.1M | ✅ | 133K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 51.6M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 73.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 54.9M | ✅ | 2.2M | 🟢 **-96%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.3M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.4M | ✅ | 4.4M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.9M | ✅ | 4.4M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 50.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.6M | ✅ | 8.7M | 🟢 **-86%** |
| required.json | required default validation | 1 | ✅ | 84.0M | ✅ | 44.6M | 🟢 **-47%** |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.3M | ✅ | 2.8M | 🟢 **-90%** |
| type.json | integer type matches integers | 8 | ✅ | 61.5M | ✅ | 7.2M | 🟢 **-88%** |
| type.json | number type matches numbers | 9 | ✅ | 66.1M | ✅ | 9.0M | 🟢 **-86%** |
| type.json | string type matches strings | 9 | ✅ | 65.4M | ✅ | 9.0M | 🟢 **-86%** |
| type.json | object type matches objects | 7 | ✅ | 56.7M | ✅ | 7.1M | 🟢 **-87%** |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 7.2M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 62.8M | ✅ | 7.7M | 🟢 **-88%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.9M | ✅ | 7.1M | 🟢 **-89%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.4M | ✅ | 8.1M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 11.0M | 🟢 **-85%** |
| type.json | type: array or object | 5 | ✅ | 68.8M | ✅ | 9.5M | 🟢 **-86%** |
| type.json | type: array, object or null | 5 | ✅ | 73.1M | ✅ | 13.0M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.5M | ✅ | 4.9M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 5.1M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 12.4M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 83.1M | ✅ | 40.8M | 🟢 **-51%** |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 6.2M | 🟢 **-90%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 43.3M | 🟢 **-42%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.7M | ✅ | 4.4M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 43.3M | 🟢 **-42%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.7M | ✅ | 4.4M | 🟢 **-92%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.1M | ✅ | 8.3M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 8.0M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 8.0M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 8.0M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.0M | ✅ | 6.6M | 🟢 **-76%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 10.2M | 🟢 **-59%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.0M | ✅ | 8.1M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.0M | ✅ | 7.8M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 13.4M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.9M | ✅ | 5.8M | 🟢 **-81%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 4.9M | 🟢 **-68%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 5.6M | 🟢 **-64%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 6.4M | 🟢 **-77%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 4.9M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 5.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 4.0M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ✅ | 45.6M | 🟢 **-45%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.1M | ✅ | 7.1M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.1M | ✅ | 6.7M | 🟢 **-83%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 84.5M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.1M | ✅ | 18.2M | 🟢 **-75%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.2M | ✅ | 109.0M | 🟢 **-33%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 91.3M | +13% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ✅ | 3.5M | 🟢 **-93%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.3M | ✅ | 6.8M | 🟢 **-85%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 9.4M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 79.9M | ✅ | 101.2M | 🔴 **+27%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 47.4M | ✅ | 14.0M | 🟢 **-71%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 7.4M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 8.1M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.4M | ✅ | 6.8M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 150.8M | ✅ | 103.7M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.6M | ✅ | 3.6M | 🟢 **-86%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 53.0M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 39.7M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.5M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 104.0M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 53.3M | ✅ | 3.7M | 🟢 **-93%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 75.6M | ✅ | 3.7M | 🟢 **-95%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 52.8M | ✅ | 103.2M | 🔴 **+96%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.4M | ✅ | 103.3M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 7.0M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 39.6M | ✅ | 4.6M | 🟢 **-88%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.7M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 76.9M | ✅ | 6.2M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.6M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 103.5M | +15% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.6M | ✅ | 103.3M | 🟢 **-32%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 57.6M | ✅ | 1.4M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 93.5M | ✅ | 12.1M | 🟢 **-87%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.7M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.6M | ✅ | 114.1M | 🔴 **+45%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.2M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 67.1M | ✅ | 7.0M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 49.7M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 58.4M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 156.1M | ✅ | 4.1M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.3M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 66.7M | ✅ | 5.3M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.0M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.4M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 60.9M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 11.1M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.8M | ✅ | 6.2M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 51.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 91.4M | +18% |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.6M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 55.1M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.6M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.0M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 7.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.1M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 47.8M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.1M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.5M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.9M | ✅ | 6.2M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 1.5M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 111.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.5M | ✅ | 3.0M | 🟢 **-96%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.7M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.3M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.1M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.6M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.3M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 90.6M | ✅ | 4.3M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.6M | ✅ | 8.9M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 163.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 159.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 163.0M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 163.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 92.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.9M | ✅ | 1.8M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 12.6M | 🟢 **-77%** |
| items.json | an array of schemas for items | 6 | ✅ | 106.9M | ✅ | 27.3M | 🟢 **-74%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 97.1M | +3% |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 7.0M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.2M | ✅ | 14.7M | 🟢 **-77%** |
| items.json | items and subitems | 6 | ✅ | 28.6M | ✅ | 2.2M | 🟢 **-92%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 82.7M | +10% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 74.9M | -7% |
| maxItems.json | maxItems validation | 4 | ✅ | 80.7M | ✅ | 20.2M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.9M | ✅ | 11.2M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.2M | ✅ | 21.1M | 🟢 **-64%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 10.1M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 24.5M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.6M | ✅ | 9.9M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 9.8M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 18.9M | 🟢 **-75%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 77.0M | ✅ | 20.5M | 🟢 **-73%** |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 19.9M | 🟢 **-73%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.0M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 12.6M | 🟢 **-78%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 10.3M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 24.5M | 🟢 **-59%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.0M | ✅ | 9.9M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 18.7M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 17.7M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 12.8M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 14.2M | 🟢 **-81%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.3M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 74.9M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 65.0M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 51.7M | ✅ | 2.9M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.0M | ✅ | 7.1M | 🟢 **-89%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.2M | ✅ | 7.0M | 🟢 **-89%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 7.0M | 🟢 **-92%** |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 7.0M | 🟢 **-92%** |
| oneOf.json | oneOf | 4 | ✅ | 77.7M | ✅ | 3.9M | 🟢 **-95%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.1M | ✅ | 5.7M | 🟢 **-80%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.8M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.4M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.8M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.3M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.0M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 55.9M | ✅ | 28.8M | 🟢 **-49%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 31.0M | 🔴 **+22%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.2M | ✅ | 9.4M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 4.9M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 5.2M | 🟢 **-67%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ✅ | 4.3M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.8M | 🔴 **+20%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ✅ | 409K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ✅ | 893K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.5M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 6.0M | 🟢 **-70%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.6M | ✅ | 66.8M | 🟢 **-29%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ✅ | 6.2M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.7M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.7M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ✅ | 6.4M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 42.8M | ✅ | 3.0M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.8M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.6M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 104.2M | +16% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 132K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 51.8M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.8M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.3M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.7M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 48.6M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.8M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 4.8M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.4M | ✅ | 4.8M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 39.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.6M | ✅ | 10.0M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 104.2M | +16% |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 95.4M | +6% |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 66.0M | ✅ | 8.8M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 10.0M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 8.0M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.9M | ✅ | 8.7M | 🟢 **-86%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.5M | ✅ | 9.4M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.6M | ✅ | 12.9M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 11.0M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 15.5M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.8M | ✅ | 5.3M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 5.5M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 73.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.1M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 88.6M | 0% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.7M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 94.8M | 🔴 **+20%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.4M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 9.1M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ✅ | 7.1M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.8M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 8.9M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ✅ | 16.0M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 36.1M | ✅ | 6.2M | 🟢 **-83%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.7M | ✅ | 5.5M | 🟢 **-65%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 5.9M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 7.0M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 5.4M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 5.7M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 4.3M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.0M | ✅ | 116.4M | 🔴 **+29%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.6M | ✅ | 834K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.5M | ✅ | 852K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.5M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.5M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 17.5M | ✅ | 7.1M | 🟢 **-59%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.2M | ✅ | 6.7M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.8M | ✅ | 84.6M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 67.1M | ✅ | 19.1M | 🟢 **-72%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 158.8M | ✅ | 111.8M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 93.6M | 🔴 **+27%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.9M | ✅ | 3.6M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.7M | ✅ | 6.9M | 🟢 **-82%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 103.0M | 🔴 **+40%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 41.6M | ✅ | 14.5M | 🟢 **-65%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.4M | ✅ | 7.4M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 8.1M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.0M | ✅ | 6.6M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 103.7M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 3.4M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.1M | ✅ | 60.8M | -12% |
| allOf.json | allOf | 4 | ✅ | 37.5M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 55.0M | ✅ | 6.3M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.3M | ✅ | 104.0M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.9M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.5M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 103.9M | 🔴 **+41%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.1M | ✅ | 104.8M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ✅ | 6.8M | 🟢 **-90%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 69.6M | ✅ | 4.7M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 71.2M | ✅ | 6.3M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.8M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.5M | ✅ | 72.2M | -10% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 153.0M | ✅ | 104.2M | 🟢 **-32%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ✅ | 1.4M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.1M | ✅ | 12.3M | 🟢 **-84%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.3M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 72.1M | ✅ | 112.5M | 🔴 **+56%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.9M | ✅ | 6.9M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 56.8M | ✅ | 6.6M | 🟢 **-88%** |
| const.json | const with object | 4 | ✅ | 46.2M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 50.3M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 4.1M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 68.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 104.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 52.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 93.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 89.9M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.9M | ✅ | 5.2M | 🟢 **-91%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 108.4M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 47.3M | ✅ | 4.2M | 🟢 **-91%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 57.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 89.7M | ✅ | 3.3M | 🟢 **-96%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.8M | ✅ | 10.9M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 56.6M | ✅ | 6.2M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 26.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 60.3M | ✅ | 11.0M | 🟢 **-82%** |
| contains.json | contains with null instance elements | 1 | ✅ | 56.3M | ✅ | 84.6M | 🔴 **+50%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.4M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 65.4M | ✅ | 1.8M | 🟢 **-97%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.6M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.8M | ✅ | 7.2M | 🟢 **-91%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.3M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.5M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 75.2M | ✅ | 2.8M | 🟢 **-96%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.4M | ✅ | 1.1M | 🟢 **-93%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.0M | ✅ | 6.1M | 🟢 **-89%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 59.0M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.8M | ✅ | 4.7M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 15.6M | ✅ | 1.6M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 69.9M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.3M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.7M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.6M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.2M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 57.7M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 81.1M | ✅ | 4.2M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.5M | ✅ | 8.8M | 🟢 **-85%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 90.7M | ✅ | 8.8M | 🟢 **-90%** |
| format.json | email format | 6 | ✅ | 72.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 162.8M | ✅ | 119.6M | 🟢 **-27%** |
| format.json | regex format | 6 | ✅ | 75.7M | ✅ | 22.0M | 🟢 **-71%** |
| format.json | ipv4 format | 6 | ✅ | 134.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 75.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 155.0M | ✅ | 119.1M | 🟢 **-23%** |
| format.json | hostname format | 6 | ✅ | 48.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 156.2M | ✅ | 102.6M | 🟢 **-34%** |
| format.json | date-time format | 6 | ✅ | 75.6M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 152.2M | ✅ | 117.1M | 🟢 **-23%** |
| format.json | json-pointer format | 6 | ✅ | 75.7M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 133.9M | ✅ | 104.3M | 🟢 **-22%** |
| format.json | iri format | 6 | ✅ | 73.4M | ✅ | 119.9M | 🔴 **+63%** |
| format.json | iri-reference format | 6 | ✅ | 86.5M | ✅ | 104.3M | 🔴 **+21%** |
| format.json | uri format | 6 | ✅ | 75.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 113.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 163.7M | ✅ | 103.5M | 🟢 **-37%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 77.8M | ✅ | 113.8M | 🔴 **+46%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 164.5M | ✅ | 113.7M | 🟢 **-31%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 40.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.4M | ✅ | 113.6M | 🟢 **-31%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.6M | ✅ | 1.8M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ✅ | 12.8M | 🟢 **-75%** |
| items.json | an array of schemas for items | 6 | ✅ | 97.7M | ✅ | 27.1M | 🟢 **-72%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.2M | ✅ | 101.2M | 🔴 **+22%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 131.5M | ✅ | 6.9M | 🟢 **-95%** |
| items.json | items with boolean schemas | 3 | ✅ | 60.2M | ✅ | 15.5M | 🟢 **-74%** |
| items.json | items and subitems | 6 | ✅ | 21.1M | ✅ | 2.1M | 🟢 **-90%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 88.4M | 🔴 **+28%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 90.7M | 🔴 **+23%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.4M | ✅ | 19.6M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 10.9M | 🟢 **-84%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.8M | ✅ | 21.0M | 🟢 **-62%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 45.0M | ✅ | 10.2M | 🟢 **-77%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.8M | ✅ | 24.0M | 🟢 **-55%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.5M | ✅ | 9.7M | 🟢 **-79%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.3M | ✅ | 9.8M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 70.0M | ✅ | 18.6M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 65.8M | ✅ | 19.4M | 🟢 **-71%** |
| minItems.json | minItems validation | 4 | ✅ | 68.4M | ✅ | 19.8M | 🟢 **-71%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 10.9M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 54.1M | ✅ | 12.1M | 🟢 **-78%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ✅ | 10.2M | 🟢 **-81%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.5M | ✅ | 24.0M | 🟢 **-57%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.5M | ✅ | 9.6M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 69.8M | ✅ | 18.2M | 🟢 **-74%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 17.1M | 🟢 **-74%** |
| multipleOf.json | by int | 3 | ✅ | 70.5M | ✅ | 12.7M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 66.6M | ✅ | 14.2M | 🟢 **-79%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 9.9M | 🟢 **-84%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 19.8M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 70.0M | ✅ | 6.8M | 🟢 **-90%** |
| not.json | not multiple types | 3 | ✅ | 62.5M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not more complex schema | 3 | ✅ | 63.0M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 50.9M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 58.0M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.0M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.5M | ✅ | 7.1M | 🟢 **-91%** |
| not.json | double negation | 1 | ✅ | 80.7M | ✅ | 6.9M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 61.9M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.1M | ✅ | 5.6M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 5.7M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.6M | ✅ | 1.8M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.0M | ✅ | 6.3M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.6M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.8M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.3M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 49.8M | ✅ | 29.5M | 🟢 **-41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.3M | ✅ | 31.3M | 🔴 **+120%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 9.4M | 🟢 **-62%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 4.8M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.4M | ✅ | 5.1M | 🟢 **-67%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ✅ | 4.4M | 🟢 **-77%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 22.5M | 🔴 **+28%** |
| properties.json | object properties validation | 6 | ✅ | 51.7M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.8M | ✅ | 1.7M | 🟢 **-90%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.4M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.4M | ✅ | 396K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.5M | ✅ | 899K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.4M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.0M | ✅ | 6.3M | 🟢 **-63%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 67.4M | -19% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.5M | ✅ | 6.1M | 🟢 **-87%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.4M | ✅ | 5.4M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.1M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.6M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.7M | ✅ | 6.3M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 40.2M | ✅ | 2.9M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.4M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.9M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.8M | ✅ | 104.3M | 🔴 **+29%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.9M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.9M | ✅ | 133K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 43.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 25.7M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.2M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 51.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 45.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.3M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 4.6M | 🟢 **-93%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.9M | ✅ | 4.8M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.5M | ✅ | 4.7M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 45.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.9M | ✅ | 10.1M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 103.2M | 🔴 **+28%** |
| required.json | required with empty array | 1 | ✅ | 80.8M | ✅ | 93.2M | +15% |
| required.json | required with escaped characters | 2 | ✅ | 46.9M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.6M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 8.6M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 62.6M | ✅ | 10.0M | 🟢 **-84%** |
| type.json | string type matches strings | 9 | ✅ | 61.5M | ✅ | 9.9M | 🟢 **-84%** |
| type.json | object type matches objects | 7 | ✅ | 54.8M | ✅ | 8.0M | 🟢 **-85%** |
| type.json | array type matches arrays | 7 | ✅ | 58.0M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 8.5M | 🟢 **-86%** |
| type.json | null type matches only the null object | 10 | ✅ | 56.3M | ✅ | 7.7M | 🟢 **-86%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.3M | ✅ | 9.2M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 69.3M | ✅ | 12.7M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 62.8M | ✅ | 11.0M | 🟢 **-83%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 15.5M | 🟢 **-78%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.4M | ✅ | 5.2M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ✅ | 5.4M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 76.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.7M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.3M | ✅ | 15.2M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 79.5M | ✅ | 88.3M | +11% |
| optional/bignum.json | string | 1 | ✅ | 58.0M | ✅ | 6.6M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 97.2M | 🔴 **+35%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 4.8M | 🟢 **-91%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 97.0M | 🔴 **+35%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 4.8M | 🟢 **-91%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 341K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 417K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 23.5M | ✅ | 9.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.1M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.3M | ✅ | 9.2M | 🟢 **-62%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.6M | ✅ | 9.2M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.2M | ✅ | 7.3M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.7M | ✅ | 12.1M | 🟢 **-49%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.5M | ✅ | 9.0M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.6M | ✅ | 9.2M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.2M | ✅ | 16.7M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.3M | ✅ | 6.2M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 5.5M | 🟢 **-60%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 6.0M | 🟢 **-57%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.0M | ✅ | 7.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 5.4M | 🟢 **-72%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ✅ | 5.8M | 🟢 **-68%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 4.3M | 🟢 **-45%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 12.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 5.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.1M | ✅ | 116.6M | 🔴 **+47%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.7M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 55.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 55.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.6M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.7M | ✅ | 7.3M | -6% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.6M | ✅ | 6.8M | 🟢 **-83%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 90.0M | ✅ | 86.8M | -4% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.1M | ✅ | 19.1M | 🟢 **-86%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.9M | ✅ | 114.4M | 🔴 **+22%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 92.4M | 🟢 **-26%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.5M | ✅ | 3.5M | 🟢 **-92%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 54.8M | ✅ | 6.9M | 🟢 **-87%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 9.3M | 🟢 **-87%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.1M | ✅ | 103.9M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 37.4M | ✅ | 14.0M | 🟢 **-63%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.7M | ✅ | 7.3M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 8.1M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.4M | ✅ | 6.8M | 🟢 **-85%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 81.0M | ✅ | 104.0M | 🔴 **+28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 3.6M | 🟢 **-90%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 32.5M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.3M | ✅ | 6.0M | 🟢 **-79%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 28.0M | ✅ | 4.4M | 🟢 **-84%** |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.5M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 137.9M | ✅ | 6.5M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 103.6M | +15% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 146.5M | ✅ | 3.7M | 🟢 **-97%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.9M | ✅ | 103.8M | 🟢 **-32%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 80.9M | ✅ | 103.0M | 🔴 **+27%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 117.8M | ✅ | 6.6M | 🟢 **-94%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 76.6M | ✅ | 6.7M | 🟢 **-91%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.7M | 🟢 **-96%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 59.8M | ✅ | 3.3M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 115.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 51.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 80.1M | ✅ | 6.4M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.1M | ✅ | 3.6M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 104.1M | +16% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.9M | ✅ | 104.2M | +16% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.4M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 57.3M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 12.8M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.8M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 120.5M | 🔴 **+51%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 65.1M | ✅ | 7.1M | 🟢 **-89%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 6.9M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 78.8M | ✅ | 4.0M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 72.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 65.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 62.9M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.9M | ✅ | 5.3M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 3.0M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.1M | 🟢 **-94%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.5M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.1M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 10.8M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ✅ | 6.3M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 42.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 10.6M | 🟢 **-85%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 92.8M | 🔴 **+20%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.1M | ✅ | 116.5M | 🔴 **+21%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 96.1M | ✅ | 99.7M | +4% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 86.4M | ✅ | 118.0M | 🔴 **+37%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 78.9M | ✅ | 106.0M | 🔴 **+34%** |
| default.json | invalid type for default | 2 | ✅ | 36.0M | ✅ | 3.5M | 🟢 **-90%** |
| default.json | invalid string value for default | 2 | ✅ | 54.9M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 29.6M | ✅ | 1.9M | 🟢 **-94%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 63.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 117.0M | 🔴 **+22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.1M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 6.1M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.9M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.7M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 64.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 64.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 33.6M | ✅ | 3.0M | 🟢 **-91%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.1M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.3M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.4M | ✅ | 8.7M | 🟢 **-88%** |
| format.json | email format | 6 | ✅ | 77.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 87.1M | ✅ | 119.2M | 🔴 **+37%** |
| format.json | regex format | 6 | ✅ | 77.5M | ✅ | 22.1M | 🟢 **-71%** |
| format.json | ipv4 format | 6 | ✅ | 77.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 76.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 72.7M | ✅ | 120.8M | 🔴 **+66%** |
| format.json | hostname format | 6 | ✅ | 80.3M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 80.8M | ✅ | 103.9M | 🔴 **+29%** |
| format.json | date-time format | 6 | ✅ | 73.1M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 42.5M | ✅ | 117.7M | 🔴 **+177%** |
| format.json | json-pointer format | 6 | ✅ | 77.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 77.5M | ✅ | 104.3M | 🔴 **+35%** |
| format.json | iri format | 6 | ✅ | 77.3M | ✅ | 120.3M | 🔴 **+56%** |
| format.json | iri-reference format | 6 | ✅ | 76.8M | ✅ | 104.5M | 🔴 **+36%** |
| format.json | uri format | 6 | ✅ | 76.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 77.1M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 82.5M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 75.2M | ✅ | 117.7M | 🔴 **+57%** |
| format.json | duration format | 6 | ✅ | 82.6M | ✅ | 104.0M | 🔴 **+26%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.1M | ✅ | 114.0M | 🔴 **+36%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.6M | ✅ | 114.3M | 🔴 **+37%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 42.8M | ✅ | 114.8M | 🔴 **+168%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.3M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.2M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 77.1M | ✅ | 114.3M | 🔴 **+48%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.1M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 13.0M | 🟢 **-76%** |
| items.json | an array of schemas for items | 6 | ✅ | 66.9M | ✅ | 26.0M | 🟢 **-61%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 98.6M | +5% |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 6.8M | 🟢 **-91%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.5M | ✅ | 15.8M | 🟢 **-76%** |
| items.json | items and subitems | 6 | ✅ | 13.0M | ✅ | 2.2M | 🟢 **-83%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 3.3M | 🟢 **-74%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 88.0M | +17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 92.5M | +14% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 114.7M | 🔴 **+22%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.6M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 58.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.7M | ✅ | 20.0M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.1M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 20.2M | 🟢 **-65%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.1M | ✅ | 9.8M | 🟢 **-83%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.0M | ✅ | 24.4M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 9.6M | 🟢 **-81%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.5M | ✅ | 9.8M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 69.3M | ✅ | 18.4M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 51.0M | ✅ | 20.4M | 🟢 **-60%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 113.5M | 🔴 **+21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.7M | ✅ | 7.2M | 🟢 **-90%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.6M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 93.9M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 79.8M | ✅ | 20.1M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 65.2M | ✅ | 11.0M | 🟢 **-83%** |
| minLength.json | minLength validation | 5 | ✅ | 58.2M | ✅ | 12.3M | 🟢 **-79%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 10.2M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 24.1M | 🟢 **-60%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.6M | ✅ | 9.7M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.5M | ✅ | 18.4M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 17.2M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 51.8M | ✅ | 12.6M | 🟢 **-76%** |
| multipleOf.json | by number | 3 | ✅ | 71.6M | ✅ | 14.2M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 9.8M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 42.3M | ✅ | 5.4M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 20.5M | 🟢 **-73%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.8M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 7.0M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.4M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 90.4M | ✅ | 7.0M | 🟢 **-92%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 88.8M | ✅ | 6.9M | 🟢 **-92%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 7.1M | 🟢 **-92%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.9M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.6M | ✅ | 5.8M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.8M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.4M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.1M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.3M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.4M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 56.0M | ✅ | 28.2M | 🟢 **-50%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.2M | ✅ | 31.4M | 🔴 **+138%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.4M | ✅ | 9.3M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.0M | ✅ | 5.0M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.5M | ✅ | 5.0M | 🟢 **-68%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.5M | ✅ | 4.4M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 22.2M | 🔴 **+23%** |
| properties.json | object properties validation | 6 | ✅ | 55.8M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 37.6M | ✅ | 2.1M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.3M | ✅ | 395K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 45.3M | ✅ | 3.5M | 🟢 **-92%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 899K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.6M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.3M | ✅ | 6.3M | 🟢 **-65%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 66.0M | 🟢 **-30%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.5M | ✅ | 6.2M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.2M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.1M | ✅ | 4.2M | 🟢 **-90%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 4.4M | 🔴 **+41%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.1M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.6M | ✅ | 6.4M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 42.5M | ✅ | 3.7M | 🟢 **-91%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.5M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 104.1M | +16% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 89.7M | ✅ | 3.7M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.6M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.2M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.8M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 48.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.1M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.1M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.2M | ✅ | 4.8M | 🟢 **-93%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 52.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 51.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 10.0M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 103.7M | +15% |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 94.7M | +5% |
| required.json | required with escaped characters | 2 | ✅ | 54.0M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 67.0M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.3M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 9.9M | 🟢 **-86%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 86.0M | ✅ | 8.7M | 🟢 **-90%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 8.5M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 12.7M | 🟢 **-84%** |
| type.json | type: array or object | 5 | ✅ | 72.2M | ✅ | 10.5M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 15.4M | 🟢 **-80%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 113.7M | 🔴 **+37%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 77.4M | +10% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.9M | ✅ | 91.3M | +16% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 44.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.6M | ✅ | 99.0M | 🔴 **+21%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 98.4M | 🔴 **+366%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 60.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 80.8M | ✅ | 120.0M | 🔴 **+49%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 80.5M | +7% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 90.9M | 🔴 **+56%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 34.0M | ✅ | 3.4M | 🟢 **-90%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 36.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 33.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.0M | ✅ | 3.5M | 🟢 **-90%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.4M | ✅ | 3.5M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 54.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.5M | ✅ | 120.2M | 🔴 **+46%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 84.1M | 🔴 **+60%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 5.3M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 5.5M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 12.8M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.6M | ✅ | 15.8M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 88.4M | 0% |
| optional/bignum.json | string | 1 | ✅ | 63.4M | ✅ | 6.6M | 🟢 **-90%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.6M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 97.4M | 🔴 **+23%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.9M | 🟢 **-92%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 71.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ✅ | 4.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 7.4M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.5M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.1M | ✅ | 1.7M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 1.9M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 2.8M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.6M | ✅ | 1.8M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 36.2M | ✅ | 9.1M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.1M | ✅ | 9.1M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ✅ | 8.7M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 9.2M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.4M | ✅ | 7.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.4M | ✅ | 11.9M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.3M | ✅ | 8.9M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 9.2M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 15.8M | 🟢 **-36%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 6.2M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 5.4M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 5.7M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 7.1M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 5.4M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 5.8M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 4.3M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 25.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.4M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.8M | ✅ | 118.6M | 🔴 **+24%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.3M | ✅ | 14.3M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.1M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.3M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.4M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 7.1M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.5M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.7M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.0M | ✅ | 16.2M | 🟢 **-61%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.1M | ✅ | 7.4M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 8.3M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.2M | ✅ | 6.8M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.0M | ✅ | 103.3M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.8M | ✅ | 3.6M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 61.4M | -12% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.9M | ✅ | 6.1M | 🟢 **-76%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.5M | ✅ | 4.5M | 🟢 **-86%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.7M | ✅ | 6.3M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 126.7M | ✅ | 103.8M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 103.9M | 🔴 **+28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.1M | ✅ | 103.3M | 🟢 **-33%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.5M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 81.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.7M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.8M | ✅ | 6.3M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.7M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 97.4M | +8% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.9M | ✅ | 102.0M | +13% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 12.7M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.8M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.9M | ✅ | 110.5M | 🔴 **+40%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.1M | ✅ | 6.9M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 6.9M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 52.9M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 62.1M | ✅ | 4.1M | 🟢 **-93%** |
| const.json | const with false does not match 0 | 3 | ✅ | 38.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 37.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 64.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 63.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 54.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 67.2M | ✅ | 5.3M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 72.4M | ✅ | 3.0M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 62.1M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.6M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 11.1M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.5M | ✅ | 6.3M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 42.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 11.0M | 🟢 **-84%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 93.1M | 🔴 **+21%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 95.4M | ✅ | 116.9M | 🔴 **+22%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 95.4M | ✅ | 114.2M | +20% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.4M | ✅ | 100.8M | 🔴 **+21%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 79.0M | ✅ | 118.4M | 🔴 **+50%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 3.6M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.8M | ✅ | 1.9M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.1M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 95.5M | ✅ | 116.4M | 🔴 **+22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.6M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 47.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 30.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.1M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.8M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 70.7M | ✅ | 6.1M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.7M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 63.7M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 1.6M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.4M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 70.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 62.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 74.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.2M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.2M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 63.6M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 40.0M | ✅ | 3.8M | 🟢 **-91%** |
| enum.json | nul characters in strings | 2 | ✅ | 61.3M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.9M | ✅ | 8.7M | 🟢 **-87%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.8M | ✅ | 8.6M | 🟢 **-88%** |
| format.json | email format | 7 | ✅ | 57.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 88.4M | ✅ | 110.1M | 🔴 **+25%** |
| format.json | regex format | 7 | ✅ | 78.2M | ✅ | 22.7M | 🟢 **-71%** |
| format.json | ipv4 format | 7 | ✅ | 77.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 77.6M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.3M | ✅ | 117.9M | 🔴 **+51%** |
| format.json | hostname format | 7 | ✅ | 76.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 70.8M | ✅ | 99.8M | 🔴 **+41%** |
| format.json | date-time format | 7 | ✅ | 78.0M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 78.4M | ✅ | 117.6M | 🔴 **+50%** |
| format.json | json-pointer format | 7 | ✅ | 78.1M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 75.9M | ✅ | 105.2M | 🔴 **+39%** |
| format.json | iri format | 7 | ✅ | 77.9M | ✅ | 116.8M | 🔴 **+50%** |
| format.json | iri-reference format | 7 | ✅ | 78.2M | ✅ | 103.7M | 🔴 **+33%** |
| format.json | uri format | 7 | ✅ | 77.8M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 76.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 78.2M | ✅ | 115.4M | 🔴 **+48%** |
| format.json | duration format | 7 | ✅ | 78.4M | ✅ | 105.3M | 🔴 **+34%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 114.1M | 🔴 **+36%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.7M | ✅ | 93.9M | +0% |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 91.5M | +9% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 94.5M | +12% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.5M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 54.5M | ✅ | 13.0M | 🟢 **-76%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.8M | ✅ | 96.5M | +3% |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.7M | ✅ | 7.0M | 🟢 **-90%** |
| items.json | items and subitems | 6 | ✅ | 12.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.5M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.4M | ✅ | 6.8M | 🟢 **-85%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.1M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 88.6M | +18% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.8M | ✅ | 114.4M | 🔴 **+22%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 73.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 20.1M | 🟢 **-74%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.2M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 21.3M | 🟢 **-64%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 10.1M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.8M | ✅ | 23.9M | 🟢 **-59%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ✅ | 9.9M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 9.9M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 70.6M | ✅ | 19.0M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.3M | ✅ | 20.4M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.8M | ✅ | 113.8M | 🔴 **+21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.3M | ✅ | 7.1M | 🟢 **-89%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 59.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 59.0M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 93.8M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.9M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.6M | ✅ | 20.1M | 🟢 **-74%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.2M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 11.8M | 🟢 **-80%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 10.3M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 23.8M | 🟢 **-60%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 9.8M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 76.7M | ✅ | 18.7M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 17.5M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 12.9M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 55.7M | ✅ | 14.3M | 🟢 **-74%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.1M | ✅ | 2.9M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 65.3M | ✅ | 7.0M | 🟢 **-89%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.1M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 7.0M | 🟢 **-92%** |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 7.0M | 🟢 **-92%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.0M | ✅ | 5.6M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.9M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.2M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.4M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.4M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.7M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.7M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 52.7M | ✅ | 28.4M | 🟢 **-46%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.1M | ✅ | 31.8M | 🔴 **+51%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.0M | ✅ | 9.4M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.3M | ✅ | 5.2M | 🟢 **-66%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ✅ | 4.4M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 22.7M | 🔴 **+26%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 66.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 103.8M | 🔴 **+29%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 103.8M | 🔴 **+28%** |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.6M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.7M | ✅ | 394K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 69.9M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 892K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.5M | ✅ | 5.6M | 🟢 **-85%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 6.3M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.8M | ✅ | 65.8M | 🟢 **-30%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.8M | ✅ | 6.1M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.9M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 41.8M | ✅ | 3.7M | 🟢 **-91%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.4M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 102.3M | +14% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.9M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.4M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.4M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.4M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 48.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 6.9M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.7M | ✅ | 4.7M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 40.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 48.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 10.0M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 89.8M | ✅ | 103.9M | +16% |
| required.json | required with empty array | 1 | ✅ | 89.9M | ✅ | 94.8M | +5% |
| required.json | required with escaped characters | 2 | ✅ | 52.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.0M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 66.6M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 58.6M | ✅ | 10.1M | 🟢 **-83%** |
| type.json | string type matches strings | 9 | ✅ | 68.7M | ✅ | 10.0M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 59.0M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 8.0M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 56.8M | ✅ | 8.7M | 🟢 **-85%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 7.7M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.3M | ✅ | 9.4M | 🟢 **-83%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 12.8M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 71.8M | ✅ | 11.1M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 76.6M | ✅ | 15.8M | 🟢 **-79%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 113.4M | 🔴 **+37%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 55.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 78.4M | +11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 77.4M | ✅ | 92.7M | +20% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.5M | ✅ | 6.9M | 🟢 **-85%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 100.9M | 🔴 **+23%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 114.4M | 🔴 **+441%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.4M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 120.4M | 🔴 **+32%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 84.5M | +12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 113.4M | 🔴 **+95%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 95.5M | +2% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.8M | ✅ | 6.6M | 🟢 **-82%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.0M | ✅ | 120.3M | 🔴 **+47%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 84.1M | 🔴 **+60%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 5.2M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 56.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 12.9M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 88.3M | 0% |
| optional/bignum.json | string | 1 | ✅ | 63.3M | ✅ | 6.8M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.4M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.6M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.6M | ✅ | 4.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 95.8M | ✅ | 7.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.4M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ✅ | 1.6M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 54.6M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ✅ | 2.8M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.3M | ✅ | 1.8M | 🟢 **-96%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.5M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 9.0M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.0M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 7.3M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.9M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.6M | ✅ | 9.1M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 16.5M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 6.2M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.8M | ✅ | 5.6M | 🟢 **-56%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 6.0M | 🟢 **-61%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.1M | ✅ | 7.1M | 🟢 **-72%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ✅ | 5.3M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ✅ | 5.7M | 🟢 **-69%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 4.2M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 42.2M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 92.1M | ✅ | 118.6M | 🔴 **+29%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.5M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.1M | ✅ | 6.5M | 🟢 **-74%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ✅ | 6.5M | 🟢 **-65%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 64.1M | ✅ | 14.7M | 🟢 **-77%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.9M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.7M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.4M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 6.9M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |
