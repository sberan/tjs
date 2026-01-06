# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.4M | 150/199 | 3.4M | 150 | 🟢 **-88%** |
| draft6 | 276 | ✅ 276 | 29.6M | 208/276 | 3.6M | 208 | 🟢 **-88%** |
| draft7 | 313 | ✅ 313 | 16.2M | 219/313 | 3.9M | 219 | 🟢 **-76%** |
| draft2019-09 | 435 | ✅ 435 | 19.7M | 254/435 | 4.6M | 254 | 🟢 **-77%** |
| draft2020-12 | 448 | ✅ 448 | 20.4M | 244/448 | 4.7M | 244 | 🟢 **-77%** |
| **Total** | 1671 | 1670/1671 | 20.8M | 1075/1671 | 4.1M | 1075 | 🟢 **-80%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **10.72x faster** (23 ns vs 246 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.4M | ✅ | 7.2M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.0M | ✅ | 85.8M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 19.9M | 🟢 **-86%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 108.5M | 🟢 **-37%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 90.3M | 🟢 **-27%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ✅ | 3.3M | 🟢 **-93%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.4M | ✅ | 6.7M | 🟢 **-89%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.6M | ✅ | 9.0M | 🟢 **-88%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 103.4M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 48.6M | ✅ | 14.5M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 42.0M | ✅ | 6.9M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 8.1M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.4M | ✅ | 6.7M | 🟢 **-85%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 157.6M | ✅ | 103.3M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 3.5M | 🟢 **-89%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 61.1M | +17% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 1.4M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.2M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 92.4M | ✅ | 6.3M | 🟢 **-93%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 103.3M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.7M | ✅ | 103.3M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.4M | ✅ | 6.8M | 🟢 **-88%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.7M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 6.2M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.1M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 12.5M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.7M | 🟢 **-94%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 51.1M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.2M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 4.3M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.6M | ✅ | 2.4M | 🟢 **-93%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.3M | ✅ | 1.4M | 🟢 **-98%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 5.9M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 4.5M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 15.2M | ✅ | 1.5M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.4M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 108.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 108.3M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.0M | ✅ | 2.9M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 67.2M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 87.9M | ✅ | 4.2M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 57.8M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 92.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 82.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 157.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.7M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 163.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 81.5M | ✅ | 12.3M | 🟢 **-85%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.2M | ✅ | 26.9M | 🟢 **-61%** |
| items.json | items and subitems | 6 | ✅ | 28.7M | ✅ | 2.1M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 3.2M | 🟢 **-74%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 88.5M | +17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 92.5M | +14% |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 19.4M | 🟢 **-75%** |
| maxLength.json | maxLength validation | 5 | ✅ | 66.8M | ✅ | 21.5M | 🟢 **-68%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 23.9M | 🟢 **-59%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.3M | ✅ | 9.7M | 🟢 **-62%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 17.8M | 🟢 **-77%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ✅ | 19.9M | 🟢 **-74%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ✅ | 19.5M | 🟢 **-76%** |
| minLength.json | minLength validation | 5 | ✅ | 57.7M | ✅ | 12.5M | 🟢 **-78%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 23.6M | 🟢 **-61%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 17.5M | 🟢 **-77%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 15.2M | 🟢 **-80%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 16.8M | 🟢 **-77%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 12.2M | 🟢 **-84%** |
| multipleOf.json | by number | 3 | ✅ | 70.7M | ✅ | 14.1M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 9.4M | 🟢 **-86%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.2M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.6M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 6.8M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 2.7M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.6M | ✅ | 6.6M | 🟢 **-88%** |
| not.json | double negation | 1 | ✅ | 95.9M | ✅ | 6.5M | 🟢 **-93%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 3.9M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.4M | ✅ | 5.6M | 🟢 **-85%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 70.4M | ✅ | 6.2M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.9M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.1M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 28.1M | 🟢 **-50%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.1M | ✅ | 30.1M | 🔴 **+20%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ✅ | 9.3M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.7M | ✅ | 5.2M | 🟢 **-71%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 22.8M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 1.9M | 🟢 **-97%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.7M | ✅ | 393K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 875K | 🟢 **-97%** |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.3M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ✅ | 6.3M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 2.8M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.8M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.0M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ✅ | 133K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 54.8M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.6M | ✅ | 2.2M | 🟢 **-96%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 32.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 4.6M | 🟢 **-94%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 4.3M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 4.4M | 🟢 **-94%** |
| refRemote.json | remote ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.8M | ✅ | 8.5M | 🟢 **-86%** |
| required.json | required default validation | 1 | ✅ | 97.9M | ✅ | 44.6M | 🟢 **-55%** |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ✅ | 2.8M | 🟢 **-90%** |
| type.json | integer type matches integers | 8 | ✅ | 64.5M | ✅ | 7.0M | 🟢 **-89%** |
| type.json | number type matches numbers | 9 | ✅ | 67.4M | ✅ | 8.9M | 🟢 **-87%** |
| type.json | string type matches strings | 9 | ✅ | 67.1M | ✅ | 8.8M | 🟢 **-87%** |
| type.json | object type matches objects | 7 | ✅ | 57.9M | ✅ | 7.1M | 🟢 **-88%** |
| type.json | array type matches arrays | 7 | ✅ | 63.3M | ✅ | 7.2M | 🟢 **-89%** |
| type.json | boolean type matches booleans | 10 | ✅ | 65.6M | ✅ | 7.7M | 🟢 **-88%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.0M | ✅ | 6.8M | 🟢 **-90%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 64.8M | ✅ | 8.1M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 10.7M | 🟢 **-86%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 9.4M | 🟢 **-87%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 12.7M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 4.9M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 5.2M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 154.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 71.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 12.6M | 🟢 **-86%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 40.9M | 🟢 **-54%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.2M | 🟢 **-90%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 43.3M | 🟢 **-45%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 4.1M | 🟢 **-93%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 42.2M | 🟢 **-47%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 4.3M | 🟢 **-93%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 7.6M | 🟢 **-88%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.1M | ✅ | 7.4M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 7.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 7.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 5.9M | 🟢 **-80%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 10.2M | 🟢 **-60%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 7.5M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 7.4M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 12.7M | 🟢 **-53%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 5.3M | 🟢 **-83%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 4.4M | 🟢 **-71%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 5.0M | 🟢 **-67%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 6.2M | 🟢 **-78%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.8M | ✅ | 4.7M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ✅ | 5.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 3.9M | 🟢 **-52%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ✅ | 45.1M | 🟢 **-49%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 22.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 7.0M | -5% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.0M | ✅ | 6.8M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ✅ | 86.0M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 18.0M | 🟢 **-75%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.3M | ✅ | 113.4M | 🟢 **-34%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 82.4M | +12% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 3.6M | 🟢 **-93%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.1M | ✅ | 6.8M | 🟢 **-84%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 103.7M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.6M | ✅ | 14.2M | 🟢 **-78%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.0M | ✅ | 7.5M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.7M | ✅ | 8.3M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.4M | ✅ | 6.5M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 104.1M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.8M | ✅ | 3.4M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 60.5M | -13% |
| allOf.json | allOf | 4 | ✅ | 38.3M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 55.1M | ✅ | 6.4M | 🟢 **-88%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 100.1M | 🟢 **-37%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.9M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.5M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.2M | ✅ | 104.9M | 🟢 **-34%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ✅ | 7.0M | 🟢 **-90%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.9M | ✅ | 4.7M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.4M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ✅ | 6.3M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.0M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 103.5M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 103.4M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.0M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ✅ | 12.6M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 4.7M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 152.8M | ✅ | 70.8M | 🟢 **-54%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.7M | ✅ | 6.9M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 54.3M | ✅ | 6.9M | 🟢 **-87%** |
| const.json | const with object | 4 | ✅ | 48.4M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 52.6M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 90.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.8M | ✅ | 5.3M | 🟢 **-91%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.5M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 49.9M | ✅ | 4.2M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 89.7M | ✅ | 3.2M | 🟢 **-96%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.4M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ✅ | 10.9M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 63.8M | ✅ | 6.2M | 🟢 **-90%** |
| contains.json | items + contains | 4 | ✅ | 51.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 93.2M | 🔴 **+32%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 48.9M | ✅ | 2.8M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.1M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 49.6M | ✅ | 4.3M | 🟢 **-91%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.2M | ✅ | 7.3M | 🟢 **-96%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.6M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.0M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.3M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 10.9M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 6.1M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 34.3M | ✅ | 4.6M | 🟢 **-87%** |
| enum.json | enums in properties | 6 | ✅ | 15.4M | ✅ | 1.6M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.6M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 104.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 110.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 47.7M | ✅ | 3.8M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 101.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 44.3M | ✅ | 3.8M | 🟢 **-91%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 4.3M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.1M | ✅ | 8.7M | 🟢 **-87%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.3M | ✅ | 8.8M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 74.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 156.0M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 79.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 160.5M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 75.1M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 157.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 78.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 150.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 48.1M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 49.9M | ✅ | 12.7M | 🟢 **-75%** |
| items.json | an array of schemas for items | 6 | ✅ | 102.2M | ✅ | 26.8M | 🟢 **-74%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ✅ | 99.7M | 🟢 **-42%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.5M | ✅ | 6.9M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 59.9M | ✅ | 15.6M | 🟢 **-74%** |
| items.json | items and subitems | 6 | ✅ | 29.3M | ✅ | 2.2M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 11.6M | ✅ | 3.2M | 🟢 **-72%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 88.0M | 🔴 **+28%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 93.3M | 🔴 **+27%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 19.7M | 🟢 **-72%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 11.0M | 🟢 **-83%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.1M | ✅ | 20.4M | 🟢 **-64%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.1M | ✅ | 10.3M | 🟢 **-81%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 24.1M | 🟢 **-56%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.3M | ✅ | 9.6M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.3M | ✅ | 9.5M | 🟢 **-79%** |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 18.5M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 20.3M | 🟢 **-71%** |
| minItems.json | minItems validation | 4 | ✅ | 71.4M | ✅ | 19.7M | 🟢 **-72%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 11.0M | 🟢 **-83%** |
| minLength.json | minLength validation | 5 | ✅ | 53.4M | ✅ | 12.2M | 🟢 **-77%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ✅ | 10.1M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 23.9M | 🟢 **-57%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.9M | ✅ | 9.8M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 18.3M | 🟢 **-74%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 17.4M | 🟢 **-74%** |
| multipleOf.json | by int | 3 | ✅ | 70.0M | ✅ | 12.8M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 14.2M | 🟢 **-79%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 9.9M | 🟢 **-84%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 19.9M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 69.9M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not multiple types | 3 | ✅ | 64.6M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not more complex schema | 3 | ✅ | 62.7M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 45.4M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.6M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.7M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.8M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 6.9M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 62.0M | ✅ | 3.9M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.5M | ✅ | 5.7M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.3M | ✅ | 5.8M | 🟢 **-90%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.7M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.7M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 6.3M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.8M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.6M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 51.9M | ✅ | 28.5M | 🟢 **-45%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.7M | ✅ | 31.7M | 🔴 **+131%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 9.1M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.4M | ✅ | 5.0M | 🟢 **-62%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ✅ | 5.1M | 🟢 **-71%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ✅ | 4.6M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.4M | ✅ | 22.7M | 🔴 **+58%** |
| properties.json | object properties validation | 6 | ✅ | 51.1M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.0M | ✅ | 406K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ✅ | 896K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.3M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ✅ | 6.4M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 62.7M | 🟢 **-63%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.9M | ✅ | 5.9M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.1M | ✅ | 5.3M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.2M | ✅ | 4.0M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.7M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 6.4M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.5M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 38.6M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.8M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.4M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ✅ | 104.4M | 🟢 **-34%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 131K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 50.8M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 34.0M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.7M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.3M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 4.7M | 🟢 **-93%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.8M | ✅ | 4.8M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.0M | ✅ | 4.6M | 🟢 **-93%** |
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
| required.json | required validation | 5 | ✅ | 60.1M | ✅ | 10.1M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 102.4M | 🟢 **-36%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 95.3M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 8.6M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ✅ | 10.0M | 🟢 **-84%** |
| type.json | string type matches strings | 9 | ✅ | 61.6M | ✅ | 10.1M | 🟢 **-84%** |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 8.0M | 🟢 **-85%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 8.6M | 🟢 **-85%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.1M | ✅ | 7.7M | 🟢 **-87%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.0M | ✅ | 9.1M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 12.8M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 65.6M | ✅ | 11.1M | 🟢 **-83%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 15.4M | 🟢 **-78%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ✅ | 5.2M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ✅ | 5.5M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 15.0M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 88.0M | +10% |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 6.7M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 98.9M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 4.8M | 🟢 **-91%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.8M | ✅ | 97.9M | 🔴 **+36%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 4.8M | 🟢 **-91%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.9M | ✅ | 9.1M | 🟢 **-87%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 34.9M | ✅ | 9.1M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 9.1M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 8.8M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 7.0M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.9M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.4M | ✅ | 14.4M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 6.2M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ✅ | 5.5M | 🟢 **-66%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 5.8M | 🟢 **-63%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 7.0M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ✅ | 5.4M | 🟢 **-72%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ✅ | 5.5M | 🟢 **-73%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 4.3M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 13.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 110.9M | 🔴 **+40%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.8M | ✅ | 830K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.4M | ✅ | 848K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.0M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.9M | ✅ | 6.3M | 🟢 **-84%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 134.5M | ✅ | 86.3M | 🟢 **-36%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ✅ | 17.7M | 🟢 **-76%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.5M | ✅ | 114.3M | 🟢 **-33%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 92.9M | +15% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 50.5M | ✅ | 3.5M | 🟢 **-93%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.5M | ✅ | 6.6M | 🟢 **-85%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 9.1M | 🟢 **-92%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 103.6M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.2M | ✅ | 13.8M | 🟢 **-78%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.0M | ✅ | 7.0M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.4M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.7M | ✅ | 6.6M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 103.1M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 61.1M | -12% |
| allOf.json | allOf | 4 | ✅ | 40.9M | ✅ | 1.4M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.2M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.6M | ✅ | 104.3M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.5M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 103.1M | 🟢 **-35%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 101.9M | 🟢 **-36%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 4.6M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 81.7M | ✅ | 6.3M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 58.7M | ✅ | 3.5M | 🟢 **-94%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 104.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.2M | ✅ | 103.8M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 73.0M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 12.4M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.7M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.3M | ✅ | 112.7M | 🟢 **-38%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.4M | ✅ | 6.9M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 67.4M | ✅ | 6.9M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 57.6M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 119.8M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 72.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 70.6M | ✅ | 5.2M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 58.0M | ✅ | 2.9M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.0M | ✅ | 3.2M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.5M | ✅ | 10.5M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.5M | ✅ | 6.2M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 48.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 34.7M | ✅ | 10.8M | 🟢 **-69%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 90.6M | 🟢 **-27%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 69.8M | ✅ | 2.7M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.8M | ✅ | 1.8M | 🟢 **-96%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.5M | ✅ | 4.3M | 🟢 **-93%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 92.0M | ✅ | 7.2M | 🟢 **-92%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.4M | ✅ | 2.5M | 🟢 **-93%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ✅ | 1.3M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.1M | ✅ | 2.8M | 🟢 **-95%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ✅ | 1.1M | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 69.1M | ✅ | 6.1M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.2M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.1M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 14.4M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 64.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 34.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.8M | ✅ | 8.5M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.9M | ✅ | 8.6M | 🟢 **-88%** |
| format.json | email format | 6 | ✅ | 51.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 83.2M | ✅ | 118.1M | 🔴 **+42%** |
| format.json | regex format | 6 | ✅ | 91.6M | ✅ | 21.1M | 🟢 **-77%** |
| format.json | ipv4 format | 6 | ✅ | 88.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 82.9M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 91.5M | ✅ | 117.1M | 🔴 **+28%** |
| format.json | hostname format | 6 | ✅ | 83.8M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 83.5M | ✅ | 103.6M | 🔴 **+24%** |
| format.json | date-time format | 6 | ✅ | 91.6M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 83.4M | ✅ | 117.5M | 🔴 **+41%** |
| format.json | json-pointer format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 82.8M | ✅ | 103.3M | 🔴 **+25%** |
| format.json | iri format | 6 | ✅ | 81.0M | ✅ | 118.3M | 🔴 **+46%** |
| format.json | iri-reference format | 6 | ✅ | 83.8M | ✅ | 96.0M | +15% |
| format.json | uri format | 6 | ✅ | 92.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 92.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 83.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 114.6M | 🟢 **-33%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 113.3M | 🟢 **-34%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 90.4M | 🟢 **-47%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.1M | ✅ | 107.7M | 🟢 **-37%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ✅ | 1.7M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 53.8M | ✅ | 12.7M | 🟢 **-76%** |
| items.json | an array of schemas for items | 6 | ✅ | 56.0M | ✅ | 27.1M | 🟢 **-52%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 97.8M | 🟢 **-43%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 84.0M | ✅ | 6.8M | 🟢 **-92%** |
| items.json | items with boolean schemas | 3 | ✅ | 58.0M | ✅ | 15.7M | 🟢 **-73%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ✅ | 2.1M | 🟢 **-83%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 84.5M | +12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 89.7M | +11% |
| maxItems.json | maxItems validation | 4 | ✅ | 80.5M | ✅ | 20.0M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ✅ | 10.9M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.1M | ✅ | 20.8M | 🟢 **-67%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 10.2M | 🟢 **-83%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.2M | ✅ | 23.8M | 🟢 **-59%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 9.6M | 🟢 **-81%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 9.8M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 17.9M | 🟢 **-77%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ✅ | 19.8M | 🟢 **-74%** |
| minItems.json | minItems validation | 4 | ✅ | 78.6M | ✅ | 19.9M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 10.9M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 57.2M | ✅ | 12.2M | 🟢 **-79%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.7M | ✅ | 10.1M | 🟢 **-83%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 23.5M | 🟢 **-61%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ✅ | 9.5M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.7M | ✅ | 17.8M | 🟢 **-77%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.1M | ✅ | 17.0M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 12.3M | 🟢 **-84%** |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 14.2M | 🟢 **-81%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 9.8M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 20.4M | 🟢 **-73%** |
| not.json | not | 2 | ✅ | 76.9M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 54.3M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ✅ | 7.0M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 59.6M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.6M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 7.0M | 🟢 **-96%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 3.8M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.0M | ✅ | 5.6M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.6M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.2M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 65.9M | ✅ | 1.8M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.2M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 59.0M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.5M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 56.0M | ✅ | 27.7M | 🟢 **-50%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 31.0M | 🔴 **+22%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 9.1M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 4.7M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ✅ | 5.0M | 🟢 **-72%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ✅ | 4.4M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 20.3M | +13% |
| properties.json | object properties validation | 6 | ✅ | 56.3M | ✅ | 1.9M | 🟢 **-97%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.4M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 53.1M | ✅ | 388K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 868K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.2M | ✅ | 5.3M | 🟢 **-88%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 6.1M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.3M | ✅ | 63.5M | 🟢 **-63%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ✅ | 6.1M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.3M | ✅ | 5.4M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.8M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 1.5M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.0M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ✅ | 6.1M | 🟢 **-90%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 42.6M | ✅ | 2.9M | 🟢 **-93%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 58.0M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.3M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.7M | ✅ | 104.0M | 🟢 **-35%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ✅ | 130K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 54.9M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 4.6M | 🟢 **-94%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 4.6M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 4.6M | 🟢 **-94%** |
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
| required.json | required validation | 5 | ✅ | 64.1M | ✅ | 10.0M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 103.3M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 159.0M | ✅ | 94.1M | 🟢 **-41%** |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ✅ | 1.0M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ✅ | 2.9M | 🟢 **-90%** |
| type.json | integer type matches integers | 9 | ✅ | 85.9M | ✅ | 8.5M | 🟢 **-90%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 10.0M | 🟢 **-86%** |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ✅ | 10.0M | 🟢 **-86%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 7.9M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 8.6M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 7.6M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.7M | ✅ | 9.2M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 12.6M | 🟢 **-84%** |
| type.json | type: array or object | 5 | ✅ | 71.0M | ✅ | 11.0M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 76.3M | ✅ | 15.4M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 5.1M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 5.3M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.6M | ✅ | 88.1M | -1% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.4M | 🟢 **-90%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.4M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.7M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 88.7M | +12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.7M | 🟢 **-92%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 346K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 426K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 58.2M | ✅ | 8.7M | 🟢 **-85%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 8.8M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ✅ | 8.8M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 8.8M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 7.1M | 🟢 **-76%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 11.5M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 8.9M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 8.5M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 15.8M | 🟢 **-42%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.7M | ✅ | 6.1M | 🟢 **-81%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 5.2M | 🟢 **-67%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 5.8M | 🟢 **-63%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.4M | ✅ | 6.9M | 🟢 **-76%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 5.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 5.4M | 🟢 **-73%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 4.1M | 🟢 **-49%** |
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
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.2M | ✅ | 117.3M | 🔴 **+33%** |
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

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.1M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 6.8M | 🟢 **-82%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.6M | ✅ | 87.1M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 65.1M | ✅ | 20.5M | 🟢 **-69%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 114.0M | 🟢 **-33%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 75.7M | +3% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.5M | ✅ | 3.5M | 🟢 **-88%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 34.7M | ✅ | 6.8M | 🟢 **-80%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 9.1M | 🟢 **-92%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 103.6M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 32.7M | ✅ | 14.8M | 🟢 **-55%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.8M | ✅ | 7.4M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.6M | ✅ | 8.2M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.7M | ✅ | 6.6M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 93.1M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.0M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 61.4M | -11% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.2M | ✅ | 6.1M | 🟢 **-78%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.1M | ✅ | 4.4M | 🟢 **-85%** |
| allOf.json | allOf | 4 | ✅ | 37.2M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ✅ | 6.2M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 104.2M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.9M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.3M | ✅ | 3.5M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.7M | ✅ | 104.5M | 🔴 **+28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 103.8M | 🟢 **-35%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ✅ | 6.9M | 🟢 **-90%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 6.8M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.6M | ✅ | 4.7M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.7M | ✅ | 3.4M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.5M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 65.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 42.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 81.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 69.8M | ✅ | 6.2M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.4M | ✅ | 3.6M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 146.1M | ✅ | 102.2M | 🟢 **-30%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 103.5M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 2.4M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.8M | ✅ | 12.2M | 🟢 **-86%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.9M | ✅ | 4.7M | 🟢 **-93%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.7M | ✅ | 120.0M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.7M | ✅ | 6.9M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 58.6M | ✅ | 6.7M | 🟢 **-88%** |
| const.json | const with object | 4 | ✅ | 33.1M | ✅ | 1.6M | 🟢 **-95%** |
| const.json | const with array | 3 | ✅ | 50.2M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 66.1M | ✅ | 4.0M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 58.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 56.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.8M | ✅ | 5.2M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.4M | ✅ | 2.9M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 4.2M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.4M | ✅ | 3.2M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.6M | ✅ | 10.6M | 🟢 **-84%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.8M | ✅ | 6.1M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 38.9M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 63.4M | ✅ | 10.7M | 🟢 **-83%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 85.8M | 🔴 **+22%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ✅ | 111.9M | 🟢 **-37%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 99.6M | 🟢 **-44%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.8M | ✅ | 118.4M | 🟢 **-34%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.2M | ✅ | 102.1M | 🟢 **-44%** |
| default.json | invalid type for default | 2 | ✅ | 65.5M | ✅ | 3.4M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.5M | ✅ | 1.8M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 58.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.6M | ✅ | 116.7M | 🟢 **-33%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 79.5M | ✅ | 5.9M | 🟢 **-93%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.9M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 1.5M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.5M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.0M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 67.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.9M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.2M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.6M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 4.1M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ✅ | 8.6M | 🟢 **-86%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.9M | ✅ | 8.6M | 🟢 **-87%** |
| format.json | email format | 6 | ✅ | 180.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.2M | ✅ | 115.9M | 🟢 **-36%** |
| format.json | regex format | 6 | ✅ | 181.1M | ✅ | 22.2M | 🟢 **-88%** |
| format.json | ipv4 format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 179.1M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 178.7M | ✅ | 119.9M | 🟢 **-33%** |
| format.json | hostname format | 6 | ✅ | 181.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 181.8M | ✅ | 104.3M | 🟢 **-43%** |
| format.json | date-time format | 6 | ✅ | 177.3M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 182.9M | ✅ | 117.5M | 🟢 **-36%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 178.1M | ✅ | 104.0M | 🟢 **-42%** |
| format.json | iri format | 6 | ✅ | 182.2M | ✅ | 118.4M | 🟢 **-35%** |
| format.json | iri-reference format | 6 | ✅ | 182.3M | ✅ | 104.5M | 🟢 **-43%** |
| format.json | uri format | 6 | ✅ | 181.1M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 182.6M | ✅ | 120.2M | 🟢 **-34%** |
| format.json | duration format | 6 | ✅ | 182.1M | ✅ | 104.2M | 🟢 **-43%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 113.5M | 🟢 **-34%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.8M | ✅ | 111.9M | 🟢 **-35%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 114.0M | 🟢 **-33%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 114.2M | 🟢 **-33%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 48.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.5M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 50.8M | ✅ | 12.5M | 🟢 **-75%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.9M | ✅ | 26.8M | 🟢 **-57%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 100.7M | 🟢 **-41%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 65.3M | ✅ | 6.7M | 🟢 **-90%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ✅ | 15.6M | 🟢 **-73%** |
| items.json | items and subitems | 6 | ✅ | 12.6M | ✅ | 2.2M | 🟢 **-83%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 3.2M | 🟢 **-74%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 85.4M | 🔴 **+24%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 91.5M | 🔴 **+25%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 113.3M | 🟢 **-34%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 65.5M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 19.5M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 10.8M | 🟢 **-84%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.8M | ✅ | 21.1M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.4M | ✅ | 10.1M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.5M | ✅ | 24.0M | 🟢 **-56%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.4M | ✅ | 9.4M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.0M | ✅ | 9.6M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 69.9M | ✅ | 18.6M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 19.5M | 🟢 **-72%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 114.3M | 🟢 **-33%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.3M | ✅ | 6.9M | 🟢 **-89%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 50.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.1M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.2M | ✅ | 19.5M | 🟢 **-73%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 10.7M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 53.5M | ✅ | 12.3M | 🟢 **-77%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.6M | ✅ | 10.1M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.7M | ✅ | 23.7M | 🟢 **-58%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.9M | ✅ | 9.6M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 69.9M | ✅ | 18.2M | 🟢 **-74%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 17.1M | 🟢 **-74%** |
| multipleOf.json | by int | 3 | ✅ | 70.4M | ✅ | 12.5M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ✅ | 14.0M | 🟢 **-78%** |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 9.8M | 🟢 **-84%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.8M | ✅ | 5.3M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.6M | ✅ | 19.8M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 69.9M | ✅ | 6.6M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 64.8M | ✅ | 6.8M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 63.0M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 50.2M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.9M | ✅ | 6.8M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ✅ | 7.0M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 114.0M | ✅ | 6.8M | 🟢 **-94%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.8M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.4M | ✅ | 5.6M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.3M | ✅ | 5.7M | 🟢 **-90%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.5M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.8M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 6.2M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.4M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.3M | ✅ | 1.5M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ✅ | 4.6M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 52.2M | ✅ | 28.4M | 🟢 **-46%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.6M | ✅ | 31.0M | 🔴 **+26%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.2M | ✅ | 9.3M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ✅ | 5.3M | 🟢 **-67%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.1M | ✅ | 4.5M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.2M | ✅ | 22.8M | 🔴 **+103%** |
| properties.json | object properties validation | 6 | ✅ | 52.6M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 48.4M | ✅ | 403K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 890K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.2M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 6.3M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.1M | ✅ | 67.5M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.8M | ✅ | 5.1M | 🟢 **-89%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ✅ | 5.4M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.5M | ✅ | 4.2M | 🟢 **-90%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 4.4M | 🔴 **+43%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.9M | ✅ | 1.5M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.7M | ✅ | 6.2M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.3M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 3.7M | 🟢 **-90%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.3M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 102.4M | 🟢 **-36%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ✅ | 3.6M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.5M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.8M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 36.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.2M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.3M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.8M | ✅ | 6.9M | 🟢 **-90%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 6.9M | 🟢 **-90%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.8M | ✅ | 4.6M | 🟢 **-93%** |
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
| required.json | required validation | 5 | ✅ | 59.9M | ✅ | 9.8M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 158.9M | ✅ | 104.3M | 🟢 **-34%** |
| required.json | required with empty array | 1 | ✅ | 158.3M | ✅ | 94.4M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 47.7M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ✅ | 2.9M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 60.2M | ✅ | 8.5M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 62.2M | ✅ | 9.9M | 🟢 **-84%** |
| type.json | string type matches strings | 9 | ✅ | 62.0M | ✅ | 9.8M | 🟢 **-84%** |
| type.json | object type matches objects | 7 | ✅ | 54.5M | ✅ | 7.8M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 58.3M | ✅ | 7.8M | 🟢 **-87%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 8.4M | 🟢 **-86%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.4M | ✅ | 7.6M | 🟢 **-87%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.1M | ✅ | 9.1M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 69.0M | ✅ | 12.6M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 60.6M | ✅ | 10.8M | 🟢 **-82%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 15.2M | 🟢 **-78%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.1M | ✅ | 114.4M | 🔴 **+54%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.6M | ✅ | 74.5M | +15% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 71.5M | ✅ | 88.7M | 🔴 **+24%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 74.1M | ✅ | 98.8M | 🔴 **+33%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.5M | ✅ | 98.8M | 🔴 **+382%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 80.7M | ✅ | 118.6M | 🔴 **+47%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.7M | ✅ | 84.1M | 🔴 **+22%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.0M | ✅ | 90.8M | 🔴 **+68%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 63.9M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.7M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.5M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.2M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.1M | ✅ | 3.4M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.4M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.7M | ✅ | 115.5M | 🔴 **+66%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.4M | ✅ | 84.2M | 🔴 **+70%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.8M | ✅ | 5.3M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ✅ | 5.4M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 69.9M | ✅ | 12.4M | 🟢 **-82%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.3M | ✅ | 15.2M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 79.6M | ✅ | 88.7M | +11% |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 6.6M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.5M | ✅ | 98.3M | 🔴 **+38%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 4.7M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 98.5M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 4.7M | 🟢 **-92%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 66.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.2M | ✅ | 4.2M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 170.7M | ✅ | 7.2M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.9M | ✅ | 2.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.7M | ✅ | 1.6M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.7M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.1M | ✅ | 2.7M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.5M | ✅ | 1.8M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 57.3M | ✅ | 9.0M | 🟢 **-84%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 9.0M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.5M | ✅ | 7.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.7M | 🟢 **-56%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.4M | ✅ | 8.9M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 16.0M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 6.2M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.7M | ✅ | 5.5M | 🟢 **-67%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.6M | ✅ | 5.9M | 🟢 **-57%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 7.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.9M | ✅ | 5.4M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 5.8M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 4.3M | 🟢 **-46%** |
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
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.1M | ✅ | 118.9M | 🔴 **+50%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.8M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 62.2M | ✅ | 14.4M | 🟢 **-77%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.3M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 50.2M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.7M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.4M | ✅ | 6.9M | 🟢 **-90%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.4M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 20.0M | ✅ | 16.1M | -19% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 7.5M | 🟢 **-77%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 17.9M | ✅ | 6.7M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.9M | ✅ | 102.0M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 3.6M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 60.5M | -13% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.7M | ✅ | 6.2M | 🟢 **-79%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 4.4M | 🟢 **-86%** |
| allOf.json | allOf | 4 | ✅ | 40.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.3M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 103.7M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.0M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 100.4M | 🟢 **-37%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 60.1M | 🟢 **-62%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 38.8M | ✅ | 7.0M | 🟢 **-82%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 4.6M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 3.4M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 72.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 70.1M | ✅ | 6.4M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.9M | ✅ | 3.5M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 103.2M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 103.9M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.8M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 12.3M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 4.8M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 153.5M | ✅ | 112.9M | 🟢 **-26%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.8M | ✅ | 7.1M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 82.0M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const with object | 4 | ✅ | 40.9M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 55.8M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 78.8M | ✅ | 4.1M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 63.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 66.9M | ✅ | 5.3M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 70.9M | ✅ | 3.0M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 4.2M | 🟢 **-94%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.7M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.1M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 11.1M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.4M | ✅ | 6.3M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 70.7M | ✅ | 11.1M | 🟢 **-84%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.9M | ✅ | 90.5M | 🔴 **+28%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.9M | ✅ | 116.3M | 🟢 **-34%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 165.2M | ✅ | 99.7M | 🟢 **-40%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.8M | ✅ | 117.7M | 🟢 **-33%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 176.6M | ✅ | 105.8M | 🟢 **-40%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ✅ | 1.9M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.7M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.8M | ✅ | 115.9M | 🟢 **-34%** |
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
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 6.2M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 1.4M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 79.5M | ✅ | 3.6M | 🟢 **-96%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 3.1M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.1M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.3M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.1M | 🟢 **-94%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ✅ | 8.8M | 🟢 **-88%** |
| format.json | email format | 7 | ✅ | 181.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 181.1M | ✅ | 117.7M | 🟢 **-35%** |
| format.json | regex format | 7 | ✅ | 181.8M | ✅ | 23.4M | 🟢 **-87%** |
| format.json | ipv4 format | 7 | ✅ | 182.0M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.0M | ✅ | 117.8M | 🟢 **-35%** |
| format.json | hostname format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 181.6M | ✅ | 104.4M | 🟢 **-43%** |
| format.json | date-time format | 7 | ✅ | 181.8M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 182.4M | ✅ | 117.5M | 🟢 **-36%** |
| format.json | json-pointer format | 7 | ✅ | 181.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 181.9M | ✅ | 105.1M | 🟢 **-42%** |
| format.json | iri format | 7 | ✅ | 181.9M | ✅ | 118.8M | 🟢 **-35%** |
| format.json | iri-reference format | 7 | ✅ | 176.8M | ✅ | 104.7M | 🟢 **-41%** |
| format.json | uri format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 175.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 181.3M | ✅ | 117.8M | 🟢 **-35%** |
| format.json | duration format | 7 | ✅ | 182.0M | ✅ | 104.9M | 🟢 **-42%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 114.1M | 🟢 **-33%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 168.8M | ✅ | 113.6M | 🟢 **-33%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 126.8M | ✅ | 113.9M | -10% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.2M | ✅ | 113.6M | 🟢 **-34%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 13.0M | 🟢 **-76%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.2M | ✅ | 96.3M | 🟢 **-44%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 7.0M | 🟢 **-90%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 3.3M | 🟢 **-74%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.7M | ✅ | 6.8M | 🟢 **-85%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 40.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.4M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 88.6M | +18% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ✅ | 114.4M | 🟢 **-33%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.5M | ✅ | 20.0M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.1M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 61.0M | ✅ | 20.9M | 🟢 **-66%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.3M | ✅ | 10.4M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 24.4M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 9.5M | 🟢 **-81%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.0M | ✅ | 9.8M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 18.9M | 🟢 **-75%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 20.4M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.2M | ✅ | 110.3M | 🟢 **-36%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.9M | ✅ | 7.2M | 🟢 **-90%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.6M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ✅ | 20.1M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.2M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ✅ | 12.3M | 🟢 **-79%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 10.3M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 24.5M | 🟢 **-59%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 9.8M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 18.7M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 17.1M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 12.8M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 14.3M | 🟢 **-81%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.3M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.7M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.7M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 51.8M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.0M | ✅ | 7.1M | 🟢 **-89%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.1M | ✅ | 7.2M | 🟢 **-96%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 6.7M | 🟢 **-96%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.0M | ✅ | 5.7M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.8M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.4M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.5M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 53.5M | ✅ | 28.1M | 🟢 **-48%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 30.9M | 🔴 **+22%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ✅ | 9.2M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ✅ | 5.0M | 🟢 **-63%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ✅ | 5.1M | 🟢 **-71%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.1M | ✅ | 4.4M | 🟢 **-76%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 22.7M | 🔴 **+26%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 103.0M | 🔴 **+27%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 96.2M | +19% |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.6M | ✅ | 1.7M | 🟢 **-90%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.6M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.5M | ✅ | 394K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ✅ | 894K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.9M | ✅ | 5.5M | 🟢 **-88%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ✅ | 6.4M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ✅ | 64.7M | 🟢 **-62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ✅ | 6.1M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.8M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.1M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.5M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.3M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 38.7M | ✅ | 3.7M | 🟢 **-90%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.4M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 104.5M | 🟢 **-34%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.5M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 86.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 55.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 53.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.0M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 55.3M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.3M | ✅ | 7.1M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 4.8M | 🟢 **-94%** |
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
| required.json | required validation | 5 | ✅ | 65.1M | ✅ | 9.9M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 154.4M | ✅ | 81.6M | 🟢 **-47%** |
| required.json | required with empty array | 1 | ✅ | 158.3M | ✅ | 95.0M | 🟢 **-40%** |
| required.json | required with escaped characters | 2 | ✅ | 53.7M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 58.3M | ✅ | 8.7M | 🟢 **-85%** |
| type.json | number type matches numbers | 9 | ✅ | 68.7M | ✅ | 10.2M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 85.8M | ✅ | 10.1M | 🟢 **-88%** |
| type.json | object type matches objects | 7 | ✅ | 58.7M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 63.5M | ✅ | 8.0M | 🟢 **-87%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 8.6M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.8M | ✅ | 9.4M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 13.1M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 72.2M | ✅ | 11.1M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 15.8M | 🟢 **-80%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.9M | ✅ | 114.1M | 🔴 **+38%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 78.4M | +11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 91.8M | +16% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.0M | ✅ | 6.7M | 🟢 **-84%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ✅ | 98.5M | 🔴 **+20%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.2M | ✅ | 113.2M | 🔴 **+459%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ✅ | 119.4M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 83.2M | +10% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 112.3M | 🔴 **+93%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 94.3M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 33.3M | ✅ | 6.6M | 🟢 **-80%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.6M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.9M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.4M | ✅ | 108.1M | 🔴 **+31%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 84.3M | 🔴 **+61%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.6M | ✅ | 5.3M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.1M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 12.9M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.1M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 87.2M | -2% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.8M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.9M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 95.4M | 🔴 **+21%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 4.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 7.5M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ✅ | 2.6M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ✅ | 1.6M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.7M | ✅ | 1.9M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 2.8M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ✅ | 1.8M | 🟢 **-96%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 9.1M | 🟢 **-86%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 8.7M | 🟢 **-56%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 9.0M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.1M | ✅ | 6.7M | 🟢 **-77%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 11.7M | 🟢 **-53%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.5M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.4M | ✅ | 16.0M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.1M | ✅ | 6.1M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 5.5M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 6.0M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ✅ | 7.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 5.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 5.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 4.2M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 42.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
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
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.2M | ✅ | 118.1M | 🔴 **+24%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.8M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.0M | ✅ | 6.5M | 🟢 **-73%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.2M | ✅ | 6.2M | 🟢 **-66%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 67.9M | ✅ | 14.8M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.0M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.3M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.5M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 7.1M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.8M | ❌ | - | - |
