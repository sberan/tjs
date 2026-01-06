# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 29.3M | 150/199 | 3.5M | 150 | 🟢 **-88%** |
| draft6 | 276 | ✅ 276 | 33.2M | 208/276 | 3.6M | 208 | 🟢 **-89%** |
| draft7 | 313 | ✅ 313 | 16.5M | 219/313 | 4.0M | 219 | 🟢 **-76%** |
| draft2019-09 | 435 | ✅ 435 | 20.7M | 254/435 | 4.6M | 254 | 🟢 **-78%** |
| draft2020-12 | 448 | ✅ 448 | 20.9M | 244/448 | 4.6M | 244 | 🟢 **-78%** |
| **Total** | 1671 | 1670/1671 | 21.6M | 1075/1671 | 4.1M | 1075 | 🟢 **-81%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **11.67x faster** (21 ns vs 245 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.9M | ✅ | 7.3M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 146.8M | ✅ | 83.0M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 123.0M | ✅ | 18.1M | 🟢 **-85%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 102.6M | 🟢 **-40%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 74.2M | 🟢 **-40%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ✅ | 3.5M | 🟢 **-92%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 54.3M | ✅ | 6.9M | 🟢 **-87%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 9.1M | 🟢 **-87%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 87.1M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.0M | ✅ | 14.1M | 🟢 **-73%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 50.0M | ✅ | 6.9M | 🟢 **-86%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.2M | ✅ | 8.2M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 51.5M | ✅ | 6.6M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.7M | ✅ | 101.8M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.8M | ✅ | 3.5M | 🟢 **-91%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.7M | ✅ | 60.5M | +17% |
| allOf.json | allOf | 4 | ✅ | 49.3M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.3M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 6.4M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.2M | ✅ | 103.9M | 🟢 **-34%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 103.6M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.1M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 6.4M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 3.4M | 🟢 **-93%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.4M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 13.0M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.7M | 🟢 **-94%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.6M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 2.7M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.9M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 100.1M | ✅ | 4.4M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.1M | ✅ | 2.5M | 🟢 **-93%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.8M | ✅ | 1.4M | 🟢 **-98%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.6M | ✅ | 1.2M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 6.1M | 🟢 **-93%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.7M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 48.5M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 65.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 4.2M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 94.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 163.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 134.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 1.7M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 94.2M | ✅ | 12.6M | 🟢 **-87%** |
| items.json | an array of schemas for items | 6 | ✅ | 66.8M | ✅ | 27.2M | 🟢 **-59%** |
| items.json | items and subitems | 6 | ✅ | 35.4M | ✅ | 2.1M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 13.9M | ✅ | 3.2M | 🟢 **-77%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 86.8M | +15% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 93.1M | +18% |
| maxItems.json | maxItems validation | 4 | ✅ | 81.0M | ✅ | 20.2M | 🟢 **-75%** |
| maxLength.json | maxLength validation | 5 | ✅ | 66.9M | ✅ | 20.8M | 🟢 **-69%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ✅ | 24.3M | 🟢 **-58%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ✅ | 9.7M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 17.8M | 🟢 **-77%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 19.2M | 🟢 **-75%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ✅ | 19.8M | 🟢 **-76%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 12.0M | 🟢 **-79%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 24.1M | 🟢 **-60%** |
| minimum.json | minimum validation | 4 | ✅ | 78.7M | ✅ | 17.2M | 🟢 **-78%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 15.4M | 🟢 **-80%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 61.3M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.8M | ✅ | 16.9M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 12.5M | 🟢 **-84%** |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 14.0M | 🟢 **-81%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 9.9M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.7M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 91.3M | ✅ | 6.9M | 🟢 **-92%** |
| not.json | not multiple types | 3 | ✅ | 69.6M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 77.1M | ✅ | 3.9M | 🟢 **-95%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 5.6M | 🟢 **-85%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.2M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.3M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 28.8M | 🟢 **-49%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 31.9M | 🔴 **+26%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 9.2M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.7M | ✅ | 5.1M | 🟢 **-73%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.1M | +16% |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 1.9M | 🟢 **-97%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.1M | ✅ | 397K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 3.6M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ✅ | 866K | 🟢 **-97%** |
| ref.json | root pointer ref | 4 | ✅ | 28.1M | ✅ | 1.5M | 🟢 **-95%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.6M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 6.4M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 57.0M | ✅ | 2.9M | 🟢 **-95%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.1M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 27.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.9M | ✅ | 133K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 72.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.9M | ✅ | 2.2M | 🟢 **-96%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 4.4M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 4.6M | 🟢 **-94%** |
| refRemote.json | remote ref | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 72.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 72.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 8.5M | 🟢 **-87%** |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 43.5M | 🟢 **-73%** |
| required.json | required with escaped characters | 2 | ✅ | 54.4M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ✅ | 2.8M | 🟢 **-90%** |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ✅ | 7.1M | 🟢 **-89%** |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ✅ | 9.0M | 🟢 **-87%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 8.9M | 🟢 **-87%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 7.1M | 🟢 **-88%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 7.1M | 🟢 **-89%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.0M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 6.9M | 🟢 **-89%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 8.4M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 10.8M | 🟢 **-86%** |
| type.json | type: array or object | 5 | ✅ | 66.6M | ✅ | 9.3M | 🟢 **-86%** |
| type.json | type: array, object or null | 5 | ✅ | 74.3M | ✅ | 13.1M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.8M | ✅ | 4.7M | 🟢 **-86%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ✅ | 5.0M | 🟢 **-74%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.2M | ✅ | 12.6M | 🟢 **-86%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 40.6M | 🟢 **-54%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.2M | 🟢 **-90%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.8M | ✅ | 43.1M | 🟢 **-45%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 4.3M | 🟢 **-93%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 43.0M | 🟢 **-45%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.4M | 🟢 **-93%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 8.2M | 🟢 **-87%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 7.9M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 8.1M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 8.0M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 6.4M | 🟢 **-79%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.1M | ✅ | 10.4M | 🟢 **-61%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 7.8M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.6M | ✅ | 7.8M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 13.5M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.3M | ✅ | 5.6M | 🟢 **-82%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 5.0M | 🟢 **-67%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 5.4M | 🟢 **-64%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ✅ | 6.6M | 🟢 **-78%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 4.8M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.7M | ✅ | 5.0M | 🟢 **-78%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 3.9M | 🟢 **-54%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ✅ | 45.8M | 🟢 **-52%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 43.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.1M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.7M | ✅ | 7.1M | 🟢 **-89%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 45.5M | ✅ | 6.8M | 🟢 **-85%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.7M | ✅ | 86.3M | 🟢 **-51%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 32.5M | ✅ | 18.1M | 🟢 **-44%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 187.2M | ✅ | 114.1M | 🟢 **-39%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 68.7M | ✅ | 92.7M | 🔴 **+35%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 59.8M | ✅ | 3.6M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.0M | ✅ | 6.9M | 🟢 **-84%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.6M | ✅ | 9.3M | 🟢 **-92%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.9M | ✅ | 103.9M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 58.4M | ✅ | 14.3M | 🟢 **-75%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 39.2M | ✅ | 7.5M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 40.1M | ✅ | 6.6M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.4M | ✅ | 103.2M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 30.4M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 58.7M | -15% |
| allOf.json | allOf | 4 | ✅ | 41.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.8M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 80.8M | ✅ | 6.4M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.6M | ✅ | 103.5M | 🟢 **-41%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.6M | ✅ | 3.6M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.2M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 100.6M | 🟢 **-42%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.3M | ✅ | 104.2M | 🟢 **-40%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.4M | ✅ | 6.9M | 🟢 **-92%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.9M | ✅ | 6.8M | 🟢 **-95%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 86.0M | ✅ | 4.7M | 🟢 **-95%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 85.5M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 88.0M | ✅ | 6.2M | 🟢 **-93%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 54.2M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 170.3M | ✅ | 104.3M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 175.5M | ✅ | 104.3M | 🟢 **-41%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 75.2M | ✅ | 2.5M | 🟢 **-97%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 79.2M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 190.4M | ✅ | 11.9M | 🟢 **-94%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 128.9M | ✅ | 4.7M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 196.4M | ✅ | 110.1M | 🟢 **-44%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 86.4M | ✅ | 6.9M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 76.7M | ✅ | 6.9M | 🟢 **-91%** |
| const.json | const with object | 4 | ✅ | 55.1M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 64.4M | ✅ | 2.6M | 🟢 **-96%** |
| const.json | const with null | 2 | ✅ | 130.0M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 82.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 120.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 71.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 70.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 91.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 82.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 128.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 76.1M | ✅ | 5.4M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 114.1M | ✅ | 2.9M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 69.8M | ✅ | 4.2M | 🟢 **-94%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 87.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 106.1M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 67.7M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 112.0M | ✅ | 10.8M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 80.0M | ✅ | 6.3M | 🟢 **-92%** |
| contains.json | items + contains | 4 | ✅ | 61.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 88.5M | ✅ | 92.7M | +5% |
| default.json | invalid type for default | 2 | ✅ | 113.3M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 59.7M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 85.3M | ✅ | 1.9M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 97.6M | ✅ | 4.4M | 🟢 **-96%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.9M | ✅ | 7.3M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 43.7M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.4M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 93.3M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 20.0M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 82.8M | ✅ | 6.1M | 🟢 **-93%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 67.1M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 82.4M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 59.5M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.8M | ✅ | 3.8M | 🟢 **-96%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 118.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ✅ | 3.0M | 🟢 **-96%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 119.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 70.1M | ✅ | 3.0M | 🟢 **-96%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 127.6M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.3M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 71.2M | ✅ | 3.9M | 🟢 **-95%** |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 4.3M | 🟢 **-96%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.5M | ✅ | 8.7M | 🟢 **-89%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.6M | ✅ | 8.9M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 158.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 161.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 159.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 96.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 63.4M | ✅ | 1.8M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 63.0M | ✅ | 12.6M | 🟢 **-80%** |
| items.json | an array of schemas for items | 6 | ✅ | 111.9M | ✅ | 27.0M | 🟢 **-76%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.4M | ✅ | 101.1M | 🟢 **-46%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 100.1M | ✅ | 7.0M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ✅ | 15.9M | 🟢 **-75%** |
| items.json | items and subitems | 6 | ✅ | 34.6M | ✅ | 2.2M | 🟢 **-94%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 3.2M | 🟢 **-75%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.9M | ✅ | 84.2M | -1% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 93.4M | +17% |
| maxItems.json | maxItems validation | 4 | ✅ | 84.2M | ✅ | 20.0M | 🟢 **-76%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 74.2M | ✅ | 10.9M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 70.6M | ✅ | 20.6M | 🟢 **-71%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 66.2M | ✅ | 10.0M | 🟢 **-85%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 24.2M | 🟢 **-59%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.9M | ✅ | 9.7M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.3M | ✅ | 9.7M | 🟢 **-82%** |
| maximum.json | maximum validation | 4 | ✅ | 87.1M | ✅ | 17.8M | 🟢 **-80%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 85.6M | ✅ | 20.2M | 🟢 **-76%** |
| minItems.json | minItems validation | 4 | ✅ | 87.7M | ✅ | 20.0M | 🟢 **-77%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.3M | ✅ | 10.9M | 🟢 **-87%** |
| minLength.json | minLength validation | 5 | ✅ | 65.8M | ✅ | 12.4M | 🟢 **-81%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 64.9M | ✅ | 10.0M | 🟢 **-85%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.3M | ✅ | 24.2M | 🟢 **-62%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.4M | ✅ | 9.3M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 85.6M | ✅ | 17.6M | 🟢 **-79%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 17.3M | 🟢 **-79%** |
| multipleOf.json | by int | 3 | ✅ | 84.0M | ✅ | 12.7M | 🟢 **-85%** |
| multipleOf.json | by number | 3 | ✅ | 80.2M | ✅ | 14.1M | 🟢 **-82%** |
| multipleOf.json | by small number | 2 | ✅ | 74.3M | ✅ | 9.8M | 🟢 **-87%** |
| multipleOf.json | float division = inf | 1 | ✅ | 62.7M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.7M | ✅ | 19.9M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 83.7M | ✅ | 6.3M | 🟢 **-92%** |
| not.json | not multiple types | 3 | ✅ | 78.8M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not more complex schema | 3 | ✅ | 75.9M | ✅ | 2.6M | 🟢 **-97%** |
| not.json | forbidden property | 2 | ✅ | 56.9M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 69.2M | ✅ | 7.0M | 🟢 **-90%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 69.4M | ✅ | 7.0M | 🟢 **-90%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 202.9M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 174.5M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 72.4M | ✅ | 3.9M | 🟢 **-95%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 38.6M | ✅ | 5.7M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 76.3M | ✅ | 5.9M | 🟢 **-92%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.6M | ✅ | 3.3M | 🟢 **-97%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 75.6M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.6M | ✅ | 1.8M | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.4M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.4M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 1.3M | 🟢 **-98%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 54.4M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 82.1M | ✅ | 4.5M | 🟢 **-95%** |
| pattern.json | pattern validation | 8 | ✅ | 59.9M | ✅ | 28.3M | 🟢 **-53%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 16.6M | ✅ | 31.4M | 🔴 **+89%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.9M | ✅ | 9.1M | 🟢 **-67%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 16.3M | ✅ | 4.9M | 🟢 **-70%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.8M | ✅ | 5.2M | 🟢 **-72%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.2M | ✅ | 4.5M | 🟢 **-81%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.2M | ✅ | 22.8M | +13% |
| properties.json | object properties validation | 6 | ✅ | 58.1M | ✅ | 2.0M | 🟢 **-97%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.8M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.9M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 57.4M | ✅ | 396K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.4M | ✅ | 3.5M | 🟢 **-96%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 30.7M | ✅ | 895K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 49.9M | ✅ | 5.6M | 🟢 **-89%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.4M | ✅ | 6.3M | 🟢 **-66%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 182.9M | ✅ | 66.2M | 🟢 **-64%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 53.4M | ✅ | 6.2M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 46.5M | ✅ | 5.6M | 🟢 **-88%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.9M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 28.2M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 58.7M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 64.1M | ✅ | 6.3M | 🟢 **-90%** |
| ref.json | escaped pointer ref | 6 | ✅ | 49.2M | ✅ | 1.2M | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 43.6M | ✅ | 2.9M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 60.3M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 60.2M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 60.2M | ✅ | 2.0M | 🟢 **-97%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.6M | ✅ | 103.9M | 🟢 **-40%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 75.7M | ✅ | 2.5M | 🟢 **-97%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 131K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 60.0M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 55.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 60.4M | ✅ | 2.2M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 44.7M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 60.1M | ✅ | 2.0M | 🟢 **-97%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 59.4M | ✅ | 2.0M | 🟢 **-97%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 57.5M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 60.6M | ✅ | 2.0M | 🟢 **-97%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 59.4M | ✅ | 2.0M | 🟢 **-97%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.4M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 84.7M | ✅ | 4.8M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 86.6M | ✅ | 4.7M | 🟢 **-95%** |
| refRemote.json | remote ref | 2 | ✅ | 54.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 54.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 52.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 39.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 75.0M | ✅ | 9.9M | 🟢 **-87%** |
| required.json | required default validation | 1 | ✅ | 175.4M | ✅ | 104.3M | 🟢 **-41%** |
| required.json | required with empty array | 1 | ✅ | 174.6M | ✅ | 95.4M | 🟢 **-45%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 2.8M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 70.7M | ✅ | 8.7M | 🟢 **-88%** |
| type.json | number type matches numbers | 9 | ✅ | 73.3M | ✅ | 10.1M | 🟢 **-86%** |
| type.json | string type matches strings | 9 | ✅ | 73.0M | ✅ | 9.8M | 🟢 **-87%** |
| type.json | object type matches objects | 7 | ✅ | 62.7M | ✅ | 8.1M | 🟢 **-87%** |
| type.json | array type matches arrays | 7 | ✅ | 67.5M | ✅ | 7.9M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 70.6M | ✅ | 8.5M | 🟢 **-88%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.1M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.6M | ✅ | 9.2M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 84.3M | ✅ | 12.7M | 🟢 **-85%** |
| type.json | type: array or object | 5 | ✅ | 79.3M | ✅ | 11.1M | 🟢 **-86%** |
| type.json | type: array, object or null | 5 | ✅ | 84.0M | ✅ | 15.6M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 36.3M | ✅ | 5.2M | 🟢 **-86%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ✅ | 5.5M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 191.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 78.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 94.0M | ✅ | 15.5M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 96.2M | ✅ | 88.4M | -8% |
| optional/bignum.json | string | 1 | ✅ | 71.8M | ✅ | 6.6M | 🟢 **-91%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 88.0M | ✅ | 97.2M | +10% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.5M | ✅ | 4.8M | 🟢 **-93%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 87.5M | ✅ | 98.4M | +12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.5M | ✅ | 4.7M | 🟢 **-93%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.5M | ✅ | 8.2M | 🟢 **-88%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 9.1M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.4M | ✅ | 9.0M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.0M | ✅ | 8.5M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 32.4M | ✅ | 6.7M | 🟢 **-79%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 29.5M | ✅ | 11.6M | 🟢 **-61%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 32.6M | ✅ | 8.7M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 32.6M | ✅ | 8.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.1M | ✅ | 15.9M | 🟢 **-46%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.8M | ✅ | 6.0M | 🟢 **-83%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.7M | ✅ | 5.2M | 🟢 **-71%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.3M | ✅ | 5.8M | 🟢 **-65%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.9M | ✅ | 6.8M | 🟢 **-77%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 23.7M | ✅ | 5.3M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 23.1M | ✅ | 5.5M | 🟢 **-76%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ✅ | 4.2M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 45.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 101.8M | ✅ | 118.4M | +16% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.4M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.6M | ✅ | 834K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.7M | ✅ | 846K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.8M | ✅ | 7.1M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 46.7M | ✅ | 6.6M | 🟢 **-86%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 85.4M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 75.6M | ✅ | 18.1M | 🟢 **-76%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 113.9M | 🟢 **-34%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 75.1M | ✅ | 92.8M | 🔴 **+24%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 57.9M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.6M | ✅ | 6.8M | 🟢 **-84%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 4.8M | 🟢 **-96%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 80.3M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.4M | ✅ | 13.7M | 🟢 **-80%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.5M | ✅ | 7.1M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.7M | ✅ | 8.2M | 🟢 **-84%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.0M | ✅ | 6.6M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 103.8M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 3.5M | 🟢 **-89%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.7M | ✅ | 47.0M | 🟢 **-32%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 6.4M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 44.1M | ✅ | 3.7M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 146.9M | ✅ | 103.3M | 🟢 **-30%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 104.0M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 7.0M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ✅ | 3.4M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ✅ | 6.4M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ✅ | 3.6M | 🟢 **-92%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 102.2M | 🟢 **-36%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 104.2M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.9M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 170.7M | ✅ | 12.6M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.2M | ✅ | 118.4M | 🟢 **-34%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.8M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 62.3M | ✅ | 7.0M | 🟢 **-89%** |
| const.json | const with object | 4 | ✅ | 49.1M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 54.6M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 93.8M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 59.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 63.7M | ✅ | 5.4M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 91.8M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 62.0M | ✅ | 4.2M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 95.8M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.3M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 10.8M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.8M | ✅ | 6.1M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 58.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 62.4M | ✅ | 10.9M | 🟢 **-83%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 92.9M | 🟢 **-25%** |
| default.json | invalid type for default | 2 | ✅ | 64.2M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 67.9M | ✅ | 2.8M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.7M | ✅ | 1.8M | 🟢 **-96%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.6M | ✅ | 4.5M | 🟢 **-93%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.6M | ✅ | 7.4M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.0M | ✅ | 2.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.7M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 53.9M | ✅ | 2.7M | 🟢 **-95%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.5M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 23.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 52.6M | ✅ | 6.2M | 🟢 **-88%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 43.0M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.7M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.9M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 70.9M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ✅ | 7.9M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.9M | ✅ | 8.3M | 🟢 **-88%** |
| format.json | email format | 6 | ✅ | 86.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 87.1M | ✅ | 119.8M | 🔴 **+38%** |
| format.json | regex format | 6 | ✅ | 87.0M | ✅ | 21.8M | 🟢 **-75%** |
| format.json | ipv4 format | 6 | ✅ | 87.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 86.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 87.2M | ✅ | 119.9M | 🔴 **+38%** |
| format.json | hostname format | 6 | ✅ | 86.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 87.2M | ✅ | 104.3M | +20% |
| format.json | date-time format | 6 | ✅ | 86.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 86.9M | ✅ | 114.9M | 🔴 **+32%** |
| format.json | json-pointer format | 6 | ✅ | 81.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 87.2M | ✅ | 104.6M | +20% |
| format.json | iri format | 6 | ✅ | 86.3M | ✅ | 120.2M | 🔴 **+39%** |
| format.json | iri-reference format | 6 | ✅ | 87.2M | ✅ | 104.6M | +20% |
| format.json | uri format | 6 | ✅ | 86.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 86.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 97.9M | 🟢 **-43%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 114.2M | 🟢 **-33%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 112.0M | 🟢 **-35%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 114.3M | 🟢 **-33%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 70.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 61.8M | ✅ | 12.7M | 🟢 **-79%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.5M | ✅ | 27.2M | 🟢 **-58%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ✅ | 99.9M | 🟢 **-42%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ✅ | 6.9M | 🟢 **-90%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.3M | ✅ | 15.8M | 🟢 **-76%** |
| items.json | items and subitems | 6 | ✅ | 30.6M | ✅ | 2.1M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 13.6M | ✅ | 2.8M | 🟢 **-79%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 88.7M | 🔴 **+23%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 93.3M | 🔴 **+24%** |
| maxItems.json | maxItems validation | 4 | ✅ | 75.1M | ✅ | 19.8M | 🟢 **-74%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 11.1M | 🟢 **-84%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 21.0M | 🟢 **-65%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 57.3M | ✅ | 10.2M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ✅ | 24.2M | 🟢 **-57%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.5M | ✅ | 9.3M | 🟢 **-81%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 9.7M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ✅ | 18.8M | 🟢 **-74%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.1M | ✅ | 20.2M | 🟢 **-72%** |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 19.6M | 🟢 **-71%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.0M | ✅ | 10.9M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 61.4M | ✅ | 12.2M | 🟢 **-80%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 10.0M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.9M | ✅ | 24.2M | 🟢 **-57%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ✅ | 9.8M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 18.4M | 🟢 **-75%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 17.0M | 🟢 **-75%** |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ✅ | 12.9M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 13.9M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 10.0M | 🟢 **-84%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 19.9M | 🟢 **-72%** |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 52.6M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.0M | ✅ | 7.0M | 🟢 **-89%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.9M | ✅ | 7.1M | 🟢 **-89%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.8M | ✅ | 7.1M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 61.1M | ✅ | 4.0M | 🟢 **-93%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.7M | ✅ | 5.7M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.9M | ✅ | 5.9M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 6.3M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 4.5M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 53.6M | ✅ | 28.6M | 🟢 **-47%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 30.9M | 🔴 **+24%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 9.1M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.9M | ✅ | 5.0M | 🟢 **-68%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.8M | ✅ | 5.2M | 🟢 **-71%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.5M | ✅ | 4.5M | 🟢 **-80%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 22.5M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 54.0M | ✅ | 1.9M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 33.3M | ✅ | 2.0M | 🟢 **-94%** |
| properties.json | properties with escaped characters | 2 | ✅ | 50.5M | ✅ | 391K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.6M | ✅ | 892K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.4M | ✅ | 5.5M | 🟢 **-88%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 6.3M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 64.3M | 🟢 **-63%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.8M | ✅ | 6.2M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.6M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.2M | ✅ | 4.2M | 🟢 **-91%** |
| ref.json | root pointer ref | 4 | ✅ | 27.2M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.0M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 6.4M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 54.0M | ✅ | 2.9M | 🟢 **-95%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.6M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.6M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 147.3M | ✅ | 103.6M | 🟢 **-30%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.5M | ✅ | 130K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 68.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.1M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 68.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 52.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 52.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 68.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 68.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 4.6M | 🟢 **-94%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 4.8M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 68.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 68.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 68.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 55.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 55.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 53.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 61.5M | ✅ | 10.0M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 158.6M | ✅ | 103.8M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 95.4M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 50.7M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.3M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 63.5M | ✅ | 8.7M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 10.0M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 65.4M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 56.5M | ✅ | 7.8M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 8.0M | 🟢 **-87%** |
| type.json | boolean type matches booleans | 10 | ✅ | 61.9M | ✅ | 8.7M | 🟢 **-86%** |
| type.json | null type matches only the null object | 10 | ✅ | 57.8M | ✅ | 7.8M | 🟢 **-87%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 9.3M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 12.9M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 65.1M | ✅ | 11.0M | 🟢 **-83%** |
| type.json | type: array, object or null | 5 | ✅ | 73.6M | ✅ | 15.8M | 🟢 **-79%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.2M | ✅ | 5.2M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 5.5M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ✅ | 15.1M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 88.6M | +5% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 6.7M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 96.9M | 🔴 **+29%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 98.8M | 🔴 **+31%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 4.7M | 🟢 **-92%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 352K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 427K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.9M | ✅ | 8.9M | 🟢 **-85%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 8.7M | 🟢 **-56%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.3M | ✅ | 7.3M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.2M | ✅ | 11.7M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 16.4M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.2M | ✅ | 6.3M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 5.4M | 🟢 **-65%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 6.0M | 🟢 **-60%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 7.1M | 🟢 **-73%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.3M | ✅ | 5.2M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 5.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 4.1M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 14.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 70.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.6M | ✅ | 118.7M | 🔴 **+61%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 41.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 64.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 57.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 26.6M | ✅ | 7.2M | 🟢 **-73%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 41.4M | ✅ | 6.6M | 🟢 **-84%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.6M | ✅ | 86.5M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ✅ | 18.2M | 🟢 **-75%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 87.7M | ✅ | 114.0M | 🔴 **+30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 91.7M | +16% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.2M | ✅ | 3.6M | 🟢 **-88%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 6.9M | 🟢 **-84%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 9.4M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.3M | ✅ | 100.7M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.4M | ✅ | 14.1M | 🟢 **-77%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.6M | ✅ | 7.2M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.8M | ✅ | 8.2M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 22.5M | ✅ | 6.7M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 102.3M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 31.2M | ✅ | 3.5M | 🟢 **-89%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.0M | ✅ | 61.6M | -11% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.7M | ✅ | 5.9M | 🟢 **-81%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.0M | ✅ | 4.3M | 🟢 **-89%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.4M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 103.6M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 104.2M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 103.5M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 6.8M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.7M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.2M | ✅ | 3.4M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.4M | ✅ | 6.3M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.1M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 104.3M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 104.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.0M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 54.5M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 12.7M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.8M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ✅ | 110.7M | 🟢 **-38%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 65.3M | ✅ | 6.9M | 🟢 **-89%** |
| const.json | const validation | 3 | ✅ | 67.4M | ✅ | 6.8M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 58.6M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 78.6M | ✅ | 4.0M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.2M | ✅ | 5.3M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 3.0M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.1M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.7M | ✅ | 10.9M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ✅ | 6.2M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 47.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 11.0M | 🟢 **-84%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 93.0M | 🔴 **+21%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 172.7M | ✅ | 111.7M | 🟢 **-35%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.6M | ✅ | 97.7M | 🟢 **-44%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.7M | ✅ | 116.2M | 🟢 **-35%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.8M | ✅ | 105.9M | 🟢 **-42%** |
| default.json | invalid type for default | 2 | ✅ | 70.4M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 1.9M | 🟢 **-97%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 106.3M | 🟢 **-40%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.5M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 50.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 43.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 6.1M | 🟢 **-93%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 45.1M | ✅ | 1.6M | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 77.8M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.2M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 3.0M | 🟢 **-96%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.8M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 63.4M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 8.9M | 🟢 **-87%** |
| format.json | email format | 6 | ✅ | 167.9M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.2M | ✅ | 103.2M | 🟢 **-43%** |
| format.json | regex format | 6 | ✅ | 181.5M | ✅ | 22.3M | 🟢 **-88%** |
| format.json | ipv4 format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 181.8M | ✅ | 118.5M | 🟢 **-35%** |
| format.json | hostname format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 182.8M | ✅ | 103.7M | 🟢 **-43%** |
| format.json | date-time format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 181.0M | ✅ | 116.9M | 🟢 **-35%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 182.4M | ✅ | 104.3M | 🟢 **-43%** |
| format.json | iri format | 6 | ✅ | 179.5M | ✅ | 120.5M | 🟢 **-33%** |
| format.json | iri-reference format | 6 | ✅ | 182.8M | ✅ | 101.4M | 🟢 **-45%** |
| format.json | uri format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 179.8M | ✅ | 119.9M | 🟢 **-33%** |
| format.json | duration format | 6 | ✅ | 182.5M | ✅ | 102.9M | 🟢 **-44%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 112.6M | 🟢 **-34%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 165.3M | ✅ | 105.5M | 🟢 **-36%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.0M | ✅ | 94.9M | 🟢 **-45%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 114.2M | 🟢 **-33%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 63.8M | ✅ | 12.8M | 🟢 **-80%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ✅ | 27.0M | 🟢 **-60%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.3M | ✅ | 100.7M | 🟢 **-41%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 6.9M | 🟢 **-90%** |
| items.json | items with boolean schemas | 3 | ✅ | 68.3M | ✅ | 15.6M | 🟢 **-77%** |
| items.json | items and subitems | 6 | ✅ | 31.0M | ✅ | 2.1M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 13.7M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 88.4M | +17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 93.0M | +18% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 114.0M | 🟢 **-34%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 65.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 19.9M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ✅ | 10.9M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.4M | ✅ | 21.2M | 🟢 **-66%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 10.3M | 🟢 **-83%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 24.3M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.7M | ✅ | 9.8M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 9.7M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 18.7M | 🟢 **-76%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 20.1M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 114.5M | 🟢 **-33%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 81.4M | ✅ | 7.3M | 🟢 **-91%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.1M | ✅ | 19.7M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 10.9M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ✅ | 12.5M | 🟢 **-78%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 10.3M | 🟢 **-83%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.3M | ✅ | 24.2M | 🟢 **-59%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 9.6M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 18.6M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 17.2M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 12.7M | 🟢 **-84%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 14.3M | 🟢 **-81%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 9.9M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 67.5M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 2.9M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.8M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 6.9M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 5.8M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.7M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 56.3M | ✅ | 29.6M | 🟢 **-47%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.3M | ✅ | 32.1M | 🔴 **+32%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.3M | ✅ | 9.4M | 🟢 **-67%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.0M | ✅ | 5.3M | 🟢 **-71%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ✅ | 4.6M | 🟢 **-80%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 16.3M | -10% |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.9M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.3M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.2M | ✅ | 406K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ✅ | 902K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.7M | ✅ | 5.7M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 6.3M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.9M | ✅ | 66.4M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 6.0M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ✅ | 5.6M | 🟢 **-88%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ✅ | 4.2M | 🟢 **-91%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 4.5M | 🔴 **+42%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 6.4M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 57.3M | ✅ | 3.7M | 🟢 **-94%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 47.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 104.4M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 70.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 57.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 1.9M | 🟢 **-97%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 71.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 72.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 7.1M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 4.8M | 🟢 **-94%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.9M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 71.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 71.6M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 72.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 69.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 57.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 69.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 71.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 58.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 71.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 10.1M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 103.7M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 90.6M | 🟢 **-43%** |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 66.8M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ✅ | 10.0M | 🟢 **-86%** |
| type.json | object type matches objects | 7 | ✅ | 56.3M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 7.9M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 8.6M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.8M | ✅ | 7.7M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.9M | ✅ | 8.9M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 91.2M | ✅ | 12.8M | 🟢 **-86%** |
| type.json | type: array or object | 5 | ✅ | 87.7M | ✅ | 11.1M | 🟢 **-87%** |
| type.json | type: array, object or null | 5 | ✅ | 88.6M | ✅ | 15.5M | 🟢 **-82%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 114.1M | 🔴 **+38%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 61.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 78.2M | +11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.8M | ✅ | 91.5M | +16% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 51.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.9M | ✅ | 97.5M | +19% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 98.8M | 🔴 **+386%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 120.8M | 🔴 **+32%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 84.5M | +12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.1M | ✅ | 64.8M | +12% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 42.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 40.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.3M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 35.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.2M | ✅ | 3.4M | 🟢 **-90%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.6M | ✅ | 3.5M | 🟢 **-90%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 33.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 35.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.6M | ✅ | 119.9M | 🔴 **+45%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.6M | ✅ | 84.4M | 🔴 **+63%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 5.3M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 5.5M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 52.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 39.6M | ✅ | 12.8M | 🟢 **-68%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 103.8M | +17% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.7M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.5M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 97.0M | 🔴 **+23%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 29.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ✅ | 4.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 7.4M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.2M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ✅ | 1.6M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 1.9M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 2.8M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.8M | ✅ | 1.7M | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.5M | ✅ | 9.1M | 🟢 **-86%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.2M | ✅ | 9.2M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 9.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.5M | ✅ | 7.1M | 🟢 **-76%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 11.8M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 9.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 9.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 16.5M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 6.3M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 5.6M | 🟢 **-64%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ✅ | 6.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 7.3M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 5.3M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.6M | ✅ | 5.7M | 🟢 **-75%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 4.2M | 🟢 **-50%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.0M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ✅ | 110.8M | +15% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 14.7M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ✅ | 2.1M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.5M | ✅ | 7.0M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 54.5M | ✅ | 16.2M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.2M | ✅ | 7.2M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.0M | ✅ | 8.1M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ✅ | 6.7M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 103.4M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 3.6M | 🟢 **-90%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 61.2M | -12% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 34.9M | ✅ | 6.1M | 🟢 **-83%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.3M | ✅ | 4.4M | 🟢 **-88%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.2M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 85.3M | ✅ | 6.4M | 🟢 **-92%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 103.9M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 103.5M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 6.8M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.2M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.3M | ✅ | 6.2M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.0M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 97.0M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 101.1M | 🟢 **-36%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.2M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 12.8M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 4.6M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ✅ | 115.0M | 🟢 **-36%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.5M | ✅ | 7.1M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 82.4M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 4.0M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 69.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ✅ | 5.3M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 3.1M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 64.0M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.4M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.7M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.9M | ✅ | 11.0M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ✅ | 6.2M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 47.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 54.2M | ✅ | 10.8M | 🟢 **-80%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 92.2M | +20% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.5M | ✅ | 108.0M | 🟢 **-38%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 98.3M | 🟢 **-44%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 119.0M | 🟢 **-34%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.8M | ✅ | 104.4M | 🟢 **-41%** |
| default.json | invalid type for default | 2 | ✅ | 70.3M | ✅ | 3.4M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 54.8M | ✅ | 2.7M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.5M | ✅ | 1.9M | 🟢 **-97%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 110.1M | 🟢 **-38%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 49.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 42.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.9M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.8M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 31.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 8.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 38.0M | ✅ | 6.1M | 🟢 **-84%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.0M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 45.2M | ✅ | 1.6M | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 40.7M | ✅ | 3.8M | 🟢 **-91%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.2M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.7M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 35.5M | ✅ | 3.8M | 🟢 **-89%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.1M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.8M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 61.1M | ✅ | 4.2M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 9.0M | 🟢 **-87%** |
| format.json | email format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 183.1M | ✅ | 118.1M | 🟢 **-36%** |
| format.json | regex format | 7 | ✅ | 183.8M | ✅ | 22.9M | 🟢 **-88%** |
| format.json | ipv4 format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 181.9M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.7M | ✅ | 119.2M | 🟢 **-35%** |
| format.json | hostname format | 7 | ✅ | 181.3M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 183.3M | ✅ | 103.8M | 🟢 **-43%** |
| format.json | date-time format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 147.0M | ✅ | 110.2M | 🟢 **-25%** |
| format.json | json-pointer format | 7 | ✅ | 177.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.8M | ✅ | 102.3M | 🟢 **-44%** |
| format.json | iri format | 7 | ✅ | 184.1M | ✅ | 118.8M | 🟢 **-35%** |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ✅ | 104.3M | 🟢 **-43%** |
| format.json | uri format | 7 | ✅ | 183.9M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 177.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 150.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.3M | ✅ | 117.9M | 🟢 **-36%** |
| format.json | duration format | 7 | ✅ | 183.9M | ✅ | 104.3M | 🟢 **-43%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 114.1M | 🟢 **-34%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 113.5M | 🟢 **-34%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 95.1M | 🟢 **-45%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 160.6M | ✅ | 114.3M | 🟢 **-29%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.5M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 64.2M | ✅ | 12.8M | 🟢 **-80%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 168.5M | ✅ | 100.1M | 🟢 **-41%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 6.9M | 🟢 **-90%** |
| items.json | items and subitems | 6 | ✅ | 31.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.8M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 53.5M | ✅ | 6.8M | 🟢 **-87%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 53.0M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 84.1M | +12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 114.6M | 🟢 **-33%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 20.1M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 11.0M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.2M | ✅ | 21.3M | 🟢 **-66%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 58.2M | ✅ | 10.1M | 🟢 **-83%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 24.5M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 9.9M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ✅ | 9.8M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 18.9M | 🟢 **-75%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 20.3M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 104.2M | 🟢 **-39%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 72.0M | ✅ | 7.3M | 🟢 **-90%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.7M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ✅ | 19.9M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 10.9M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 12.7M | 🟢 **-78%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 10.4M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 24.3M | 🟢 **-59%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 9.7M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.5M | ✅ | 18.8M | 🟢 **-75%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.2M | ✅ | 17.6M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 76.8M | ✅ | 12.9M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 14.3M | 🟢 **-81%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.5M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ✅ | 20.8M | 🟢 **-72%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.7M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 185.2M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 4.2M | 🟢 **-97%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 65.4M | ✅ | 3.8M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.3M | ✅ | 5.7M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 5.9M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.7M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 27.9M | 🟢 **-51%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 31.3M | 🔴 **+122%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ✅ | 8.7M | 🟢 **-68%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ✅ | 5.1M | 🟢 **-72%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ✅ | 4.4M | 🟢 **-81%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 20.1M | +15% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.9M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 68.0M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 103.7M | 🔴 **+31%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 79.0M | ✅ | 103.3M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ✅ | 1.7M | 🟢 **-92%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ✅ | 403K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ✅ | 897K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 47.8M | ✅ | 5.6M | 🟢 **-88%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 6.0M | 🟢 **-69%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.4M | ✅ | 66.2M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.8M | ✅ | 6.1M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ✅ | 5.4M | 🟢 **-88%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ✅ | 4.2M | 🟢 **-91%** |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 54.7M | ✅ | 3.7M | 🟢 **-93%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 46.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.8M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 102.6M | 🟢 **-36%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 41.9M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 54.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.2M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.8M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 70.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 70.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 70.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 4.7M | 🟢 **-94%** |
| refRemote.json | remote ref | 2 | ✅ | 71.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 70.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 70.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 57.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 70.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 70.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 69.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 77.2M | ✅ | 10.0M | 🟢 **-87%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 104.0M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 92.3M | 🟢 **-42%** |
| required.json | required with escaped characters | 2 | ✅ | 53.9M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.3M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 10.0M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 58.6M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 8.0M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 8.5M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.7M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.1M | ✅ | 9.4M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.8M | ✅ | 12.9M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 70.2M | ✅ | 11.0M | 🟢 **-84%** |
| type.json | type: array, object or null | 5 | ✅ | 77.5M | ✅ | 15.6M | 🟢 **-80%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 107.3M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 75.2M | +7% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 94.2M | +19% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 53.5M | ✅ | 6.8M | 🟢 **-87%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ✅ | 98.6M | 🔴 **+21%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.7M | ✅ | 108.5M | 🔴 **+400%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 53.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 9.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 119.0M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 78.4M | +4% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 114.5M | 🔴 **+96%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 37.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.6M | ✅ | 114.6M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 39.0M | ✅ | 6.7M | 🟢 **-83%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 23.9M | ✅ | 3.5M | 🟢 **-85%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 38.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 36.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 81.9M | ✅ | 119.4M | 🔴 **+46%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.7M | ✅ | 83.5M | 🔴 **+62%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ✅ | 5.3M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.6M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 12.9M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.6M | ✅ | 15.1M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 86.4M | -3% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.8M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 96.5M | 🔴 **+22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 97.0M | 🔴 **+23%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 4.6M | 🟢 **-92%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 4.3M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 7.4M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ✅ | 1.7M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.6M | ✅ | 1.9M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ✅ | 2.7M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.9M | ✅ | 1.8M | 🟢 **-96%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 8.7M | 🟢 **-86%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.6M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 8.9M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 9.0M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 7.1M | 🟢 **-76%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.3M | ✅ | 11.6M | 🟢 **-58%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 8.7M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 15.7M | 🟢 **-42%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 6.2M | 🟢 **-81%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 5.5M | 🟢 **-64%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ✅ | 5.9M | 🟢 **-58%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 7.2M | 🟢 **-76%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 5.4M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 5.8M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ✅ | 4.2M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 24.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.0M | ✅ | 118.5M | 🔴 **+25%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.2M | ✅ | 6.3M | 🟢 **-76%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.6M | ✅ | 6.1M | 🟢 **-67%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 42.7M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 14.6M | 🟢 **-79%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.9M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ✅ | 2.1M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 7.1M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.2M | ❌ | - | - |
