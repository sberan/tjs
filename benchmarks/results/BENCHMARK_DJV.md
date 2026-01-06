# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.7M | 150/199 | 3.5M | 150 | 🟢 **-87%** |
| draft6 | 276 | ✅ 276 | 29.9M | 208/276 | 3.7M | 208 | 🟢 **-88%** |
| draft7 | 313 | ✅ 313 | 15.4M | 219/313 | 4.0M | 219 | 🟢 **-74%** |
| draft2019-09 | 435 | ✅ 435 | 17.9M | 254/435 | 4.6M | 254 | 🟢 **-74%** |
| draft2020-12 | 448 | ✅ 448 | 18.9M | 244/448 | 4.6M | 244 | 🟢 **-75%** |
| **Total** | 1671 | 1670/1671 | 19.5M | 1075/1671 | 4.1M | 1075 | 🟢 **-79%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **10.12x faster** (24 ns vs 245 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ✅ | 7.1M | +1% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.2M | ✅ | 85.9M | -5% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 134.2M | ✅ | 18.5M | 🟢 **-86%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 94.1M | ✅ | 114.4M | 🔴 **+22%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 123.1M | ✅ | 93.4M | 🟢 **-24%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 31.0M | ✅ | 3.5M | 🟢 **-89%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ✅ | 6.9M | 🟢 **-85%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.9M | ✅ | 9.3M | 🟢 **-87%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 167.5M | ✅ | 103.6M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.0M | ✅ | 14.4M | 🟢 **-60%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.0M | ✅ | 7.1M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 29.7M | ✅ | 8.2M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.0M | ✅ | 6.7M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 82.6M | ✅ | 103.1M | 🔴 **+25%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.4M | ✅ | 3.6M | 🟢 **-84%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.8M | ✅ | 61.4M | +19% |
| allOf.json | allOf | 4 | ✅ | 37.4M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.5M | ✅ | 1.5M | 🟢 **-94%** |
| allOf.json | allOf simple types | 2 | ✅ | 122.0M | ✅ | 6.4M | 🟢 **-95%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.8M | ✅ | 81.9M | -9% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.9M | ✅ | 103.6M | 🟢 **-38%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 120.1M | ✅ | 6.8M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.4M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.6M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 79.6M | ✅ | 6.2M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.8M | ✅ | 3.5M | 🟢 **-92%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.1M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.4M | ✅ | 12.6M | 🟢 **-93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 77.4M | ✅ | 4.7M | 🟢 **-94%** |
| default.json | invalid type for default | 2 | ✅ | 112.0M | ✅ | 3.6M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 56.0M | ✅ | 2.9M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 67.4M | ✅ | 1.8M | 🟢 **-97%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 87.1M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 2.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.8M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.4M | ✅ | 1.1M | 🟢 **-93%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 4.1M | 🟢 **-94%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 65.8M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.2M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 54.6M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 46.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 60.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 116.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 58.4M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 123.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.5M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.1M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.3M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 94.3M | ✅ | 4.2M | 🟢 **-96%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 59.5M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 36.4M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 154.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 90.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 157.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 90.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 154.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 29.7M | ✅ | 1.8M | 🟢 **-94%** |
| items.json | a schema given for items | 4 | ✅ | 69.0M | ✅ | 12.8M | 🟢 **-81%** |
| items.json | an array of schemas for items | 6 | ✅ | 58.4M | ✅ | 27.2M | 🟢 **-53%** |
| items.json | items and subitems | 6 | ✅ | 15.7M | ✅ | 2.2M | 🟢 **-86%** |
| items.json | nested items | 3 | ✅ | 12.5M | ✅ | 3.2M | 🟢 **-74%** |
| items.json | items with null instance elements | 1 | ✅ | 69.3M | ✅ | 87.7M | 🔴 **+27%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 92.6M | +16% |
| maxItems.json | maxItems validation | 4 | ✅ | 27.9M | ✅ | 19.6M | 🟢 **-30%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.3M | ✅ | 21.3M | 🟢 **-63%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ✅ | 24.1M | 🟢 **-57%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.6M | ✅ | 9.8M | 🟢 **-79%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 18.7M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 78.1M | ✅ | 19.9M | 🟢 **-74%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 78.2M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 71.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 77.1M | ✅ | 20.1M | 🟢 **-74%** |
| minLength.json | minLength validation | 5 | ✅ | 55.9M | ✅ | 12.2M | 🟢 **-78%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.1M | ✅ | 23.7M | 🟢 **-59%** |
| minimum.json | minimum validation | 4 | ✅ | 78.0M | ✅ | 18.6M | 🟢 **-76%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 77.4M | ✅ | 16.1M | 🟢 **-79%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 71.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.9M | ✅ | 17.4M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 79.2M | ✅ | 12.4M | 🟢 **-84%** |
| multipleOf.json | by number | 3 | ✅ | 72.1M | ✅ | 14.2M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 66.6M | ✅ | 9.8M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 56.5M | ✅ | 5.5M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.0M | ✅ | 19.8M | 🟢 **-73%** |
| not.json | not | 2 | ✅ | 75.8M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 71.3M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 67.8M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 41.6M | ✅ | 2.9M | 🟢 **-93%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.2M | ✅ | 7.0M | 🟢 **-89%** |
| not.json | double negation | 1 | ✅ | 88.1M | ✅ | 7.0M | 🟢 **-92%** |
| oneOf.json | oneOf | 4 | ✅ | 73.9M | ✅ | 3.9M | 🟢 **-95%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ✅ | 5.7M | 🟢 **-83%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.4M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.8M | ✅ | 6.2M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.3M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.0M | ✅ | 4.5M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 53.2M | ✅ | 28.8M | 🟢 **-46%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.8M | ✅ | 32.1M | 🔴 **+24%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ✅ | 9.2M | 🟢 **-63%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.3M | ✅ | 5.0M | 🟢 **-62%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ✅ | 5.1M | 🟢 **-64%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.7M | ✅ | 22.6M | +15% |
| properties.json | object properties validation | 6 | ✅ | 45.9M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.2M | ✅ | 1.7M | 🟢 **-90%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.2M | ✅ | 400K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.5M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ✅ | 879K | 🟢 **-97%** |
| ref.json | root pointer ref | 4 | ✅ | 22.3M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.9M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.2M | ✅ | 6.4M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.1M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 34.4M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.1M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 74.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.2M | ✅ | 2.3M | 🟢 **-94%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ✅ | 133K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 43.8M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 74.5M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 33.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 55.4M | ✅ | 2.2M | 🟢 **-96%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 35.3M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.6M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 76.9M | ✅ | 4.4M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 71.1M | ✅ | 4.5M | 🟢 **-94%** |
| refRemote.json | remote ref | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 34.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 20.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 30.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ✅ | 8.5M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 88.9M | ✅ | 44.0M | 🟢 **-51%** |
| required.json | required with escaped characters | 2 | ✅ | 40.0M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ✅ | 2.9M | 🟢 **-88%** |
| type.json | integer type matches integers | 8 | ✅ | 63.7M | ✅ | 7.0M | 🟢 **-89%** |
| type.json | number type matches numbers | 9 | ✅ | 68.2M | ✅ | 9.0M | 🟢 **-87%** |
| type.json | string type matches strings | 9 | ✅ | 66.9M | ✅ | 9.0M | 🟢 **-87%** |
| type.json | object type matches objects | 7 | ✅ | 55.7M | ✅ | 6.8M | 🟢 **-88%** |
| type.json | array type matches arrays | 7 | ✅ | 62.8M | ✅ | 7.2M | 🟢 **-89%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.9M | ✅ | 7.7M | 🟢 **-88%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.1M | ✅ | 7.1M | 🟢 **-89%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 8.3M | 🟢 **-87%** |
| type.json | type as array with one item | 2 | ✅ | 77.2M | ✅ | 11.0M | 🟢 **-86%** |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 9.6M | 🟢 **-86%** |
| type.json | type: array, object or null | 5 | ✅ | 76.2M | ✅ | 12.8M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.6M | ✅ | 4.8M | 🟢 **-86%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.9M | ✅ | 5.1M | 🟢 **-75%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 84.7M | ✅ | 12.6M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 87.7M | ✅ | 40.0M | 🟢 **-54%** |
| optional/bignum.json | string | 1 | ✅ | 66.4M | ✅ | 6.3M | 🟢 **-91%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 80.0M | ✅ | 43.2M | 🟢 **-46%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.2M | ✅ | 4.4M | 🟢 **-93%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 80.1M | ✅ | 43.3M | 🟢 **-46%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 61.5M | ✅ | 4.4M | 🟢 **-93%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 8.1M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 30.9M | ✅ | 7.8M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.0M | ✅ | 7.9M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.7M | ✅ | 7.6M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 6.7M | 🟢 **-77%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 10.0M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.1M | ✅ | 8.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.5M | ✅ | 8.1M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.8M | ✅ | 12.8M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.5M | ✅ | 5.6M | 🟢 **-82%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.2M | ✅ | 4.9M | 🟢 **-71%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ✅ | 5.5M | 🟢 **-66%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.2M | ✅ | 6.3M | 🟢 **-78%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.3M | ✅ | 4.8M | 🟢 **-72%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 16.9M | ✅ | 5.1M | 🟢 **-70%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 3.8M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.8M | ✅ | 45.8M | 🟢 **-50%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.8M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 31.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.4M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 7.1M | -5% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 18.8M | ✅ | 6.7M | 🟢 **-64%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 150.5M | ✅ | 77.3M | 🟢 **-49%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ✅ | 18.2M | 🟢 **-78%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 113.9M | 🟢 **-31%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 92.8M | +15% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.8M | ✅ | 3.6M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.3M | ✅ | 6.6M | 🟢 **-86%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.9M | ✅ | 9.2M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 102.2M | 🔴 **+26%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.6M | ✅ | 14.1M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.4M | ✅ | 7.3M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ✅ | 8.1M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.0M | ✅ | 6.6M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 102.0M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 59.0M | -15% |
| allOf.json | allOf | 4 | ✅ | 40.7M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.4M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 103.9M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 96.6M | +19% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 104.3M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.6M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.6M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ✅ | 6.2M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 3.6M | 🟢 **-92%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 89.9M | 0% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.0M | ✅ | 102.8M | 🟢 **-32%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 12.7M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 119.8M | 🔴 **+50%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 80.1M | ✅ | 7.0M | 🟢 **-91%** |
| const.json | const with object | 4 | ✅ | 50.0M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 58.3M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 70.7M | ✅ | 4.1M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ✅ | 5.4M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 95.1M | ✅ | 3.3M | 🟢 **-97%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 62.8M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 11.1M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ✅ | 6.1M | 🟢 **-92%** |
| contains.json | items + contains | 4 | ✅ | 51.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 92.4M | +20% |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.6M | ✅ | 1.9M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.7M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.6M | ✅ | 4.5M | 🟢 **-95%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 7.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 47.1M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 59.4M | ✅ | 2.8M | 🟢 **-95%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 12.2M | ✅ | 1.1M | 🟢 **-91%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 113.7M | ✅ | 6.0M | 🟢 **-95%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.6M | ✅ | 1.4M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 111.8M | ✅ | 4.6M | 🟢 **-96%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.5M | ✅ | 3.8M | 🟢 **-97%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 96.4M | ✅ | 3.0M | 🟢 **-97%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 3.0M | 🟢 **-97%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 97.6M | ✅ | 3.8M | 🟢 **-96%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.5M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 98.7M | ✅ | 3.8M | 🟢 **-96%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 141.8M | ✅ | 8.8M | 🟢 **-94%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 8.8M | 🟢 **-88%** |
| format.json | email format | 6 | ✅ | 161.3M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 92.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 162.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 162.7M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 92.3M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 162.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.2M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 81.7M | ✅ | 13.0M | 🟢 **-84%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ✅ | 27.2M | 🟢 **-60%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.2M | ✅ | 100.9M | 🟢 **-39%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.3M | ✅ | 7.0M | 🟢 **-90%** |
| items.json | items with boolean schemas | 3 | ✅ | 84.5M | ✅ | 15.9M | 🟢 **-81%** |
| items.json | items and subitems | 6 | ✅ | 25.6M | ✅ | 2.1M | 🟢 **-92%** |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 3.2M | 🟢 **-75%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 86.5M | +15% |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.4M | ✅ | 93.2M | 🟢 **-27%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 20.0M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 78.8M | ✅ | 11.1M | 🟢 **-86%** |
| maxLength.json | maxLength validation | 5 | ✅ | 61.1M | ✅ | 20.7M | 🟢 **-66%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 75.4M | ✅ | 10.2M | 🟢 **-86%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 23.6M | 🟢 **-60%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 63.8M | ✅ | 9.9M | 🟢 **-85%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 9.8M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 125.5M | ✅ | 18.7M | 🟢 **-85%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.3M | ✅ | 20.3M | 🟢 **-72%** |
| minItems.json | minItems validation | 4 | ✅ | 127.4M | ✅ | 20.2M | 🟢 **-84%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 67.1M | ✅ | 11.1M | 🟢 **-83%** |
| minLength.json | minLength validation | 5 | ✅ | 77.8M | ✅ | 12.5M | 🟢 **-84%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 10.3M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 82.3M | ✅ | 24.1M | 🟢 **-71%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 9.8M | 🟢 **-80%** |
| minimum.json | minimum validation | 4 | ✅ | 123.5M | ✅ | 18.5M | 🟢 **-85%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 17.3M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 123.9M | ✅ | 12.8M | 🟢 **-90%** |
| multipleOf.json | by number | 3 | ✅ | 70.8M | ✅ | 14.4M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 94.8M | ✅ | 9.7M | 🟢 **-90%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 107.8M | ✅ | 19.7M | 🟢 **-82%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 107.7M | ✅ | 6.9M | 🟢 **-94%** |
| not.json | not more complex schema | 3 | ✅ | 66.5M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 70.6M | ✅ | 2.8M | 🟢 **-96%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.1M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 89.1M | ✅ | 7.1M | 🟢 **-92%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.7M | ✅ | 7.2M | 🟢 **-92%** |
| not.json | double negation | 1 | ✅ | 152.8M | ✅ | 7.0M | 🟢 **-95%** |
| oneOf.json | oneOf | 4 | ✅ | 66.5M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 39.3M | ✅ | 5.7M | 🟢 **-86%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 5.8M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 152.6M | ✅ | 3.3M | 🟢 **-98%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 1.7M | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 113.7M | ✅ | 6.3M | 🟢 **-94%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 65.7M | ✅ | 1.6M | 🟢 **-98%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 73.5M | ✅ | 28.9M | 🟢 **-61%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 31.2M | 🔴 **+23%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 30.3M | ✅ | 9.2M | 🟢 **-70%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 5.0M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ✅ | 5.2M | 🟢 **-68%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.0M | ✅ | 4.4M | 🟢 **-81%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 22.1M | 🔴 **+22%** |
| properties.json | object properties validation | 6 | ✅ | 69.7M | ✅ | 2.0M | 🟢 **-97%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 59.8M | ✅ | 2.0M | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.1M | ✅ | 401K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 104.5M | ✅ | 3.5M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ✅ | 898K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 51.5M | ✅ | 5.7M | 🟢 **-89%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 6.3M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 163.9M | ✅ | 66.5M | 🟢 **-59%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.3M | ✅ | 6.0M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 54.5M | ✅ | 5.5M | 🟢 **-90%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.2M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 32.9M | ✅ | 1.6M | 🟢 **-95%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.2M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 80.5M | ✅ | 6.4M | 🟢 **-92%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 58.8M | ✅ | 2.9M | 🟢 **-95%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.9M | ✅ | 2.4M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.9M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 101.2M | +13% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.0M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ✅ | 133K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 55.2M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.0M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 4.8M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 4.8M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 10.3M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 100.8M | +12% |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 94.2M | +5% |
| required.json | required with escaped characters | 2 | ✅ | 53.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 67.2M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 10.2M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 8.0M | 🟢 **-87%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 8.5M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 9.4M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 12.8M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 11.1M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 15.7M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 5.2M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 5.4M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 88.3M | -1% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.9M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 97.3M | 🔴 **+23%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 4.7M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.1M | ✅ | 98.8M | 🔴 **+27%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 4.8M | 🟢 **-92%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 36.5M | ✅ | 9.0M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 8.9M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 8.6M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 7.3M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.8M | 🟢 **-56%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 16.2M | 🟢 **-38%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 6.2M | 🟢 **-80%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 5.4M | 🟢 **-64%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 5.9M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 7.1M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 5.3M | 🟢 **-75%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 5.7M | 🟢 **-72%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 4.1M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 42.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.5M | ✅ | 117.9M | 🔴 **+33%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.9M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.5M | ✅ | 837K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.6M | ✅ | 847K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.2M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.7M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 29.9M | ✅ | 7.1M | 🟢 **-76%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 6.6M | 🟢 **-82%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 86.8M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.3M | ✅ | 20.5M | 🟢 **-68%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.1M | ✅ | 113.7M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 74.4M | +1% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.2M | ✅ | 3.5M | 🟢 **-93%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.5M | ✅ | 6.9M | 🟢 **-82%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 9.2M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 104.0M | 🔴 **+42%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.0M | ✅ | 14.1M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ✅ | 7.2M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.9M | ✅ | 6.7M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.1M | ✅ | 103.8M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.1M | ✅ | 3.5M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 60.8M | -12% |
| allOf.json | allOf | 4 | ✅ | 36.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.3M | ✅ | 6.4M | 🟢 **-90%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 53.0M | ✅ | 103.8M | 🔴 **+96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.8M | ✅ | 100.4M | 🟢 **-34%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 73.4M | ✅ | 103.5M | 🔴 **+41%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 117.8M | ✅ | 6.8M | 🟢 **-94%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 68.7M | ✅ | 6.8M | 🟢 **-90%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.6M | 🟢 **-96%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 56.1M | ✅ | 3.3M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 128.4M | ✅ | 6.2M | 🟢 **-95%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ✅ | 3.6M | 🟢 **-91%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 103.7M | 🟢 **-32%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 73.5M | ✅ | 88.4M | 🔴 **+20%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.4M | ✅ | 2.5M | 🟢 **-97%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.4M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 12.5M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 4.7M | 🟢 **-93%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.1M | ✅ | 113.1M | 🟢 **-34%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ✅ | 7.0M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 133.1M | ✅ | 6.7M | 🟢 **-95%** |
| const.json | const with object | 4 | ✅ | 37.5M | ✅ | 1.5M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 83.9M | ✅ | 2.6M | 🟢 **-97%** |
| const.json | const with null | 2 | ✅ | 38.7M | ✅ | 4.0M | 🟢 **-90%** |
| const.json | const with false does not match 0 | 3 | ✅ | 77.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 68.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 61.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 48.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 97.9M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.5M | ✅ | 5.2M | 🟢 **-95%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.7M | ✅ | 3.0M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 91.2M | ✅ | 4.2M | 🟢 **-95%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.6M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.2M | ✅ | 3.2M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 87.0M | ✅ | 1.7M | 🟢 **-98%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.2M | ✅ | 10.9M | 🟢 **-83%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 106.4M | ✅ | 6.1M | 🟢 **-94%** |
| contains.json | items + contains | 4 | ✅ | 38.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 101.1M | ✅ | 10.8M | 🟢 **-89%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 86.2M | 🔴 **+22%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.6M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.7M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.1M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.9M | ✅ | 7.4M | 🟢 **-91%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.8M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 86.4M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 25.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.7M | ✅ | 5.9M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.2M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 15.9M | ✅ | 1.6M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.8M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.4M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.4M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.7M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.2M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 109.9M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.8M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 4.2M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ✅ | 8.8M | 🟢 **-87%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.4M | ✅ | 8.8M | 🟢 **-92%** |
| format.json | email format | 6 | ✅ | 81.9M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 161.8M | ✅ | 118.1M | 🟢 **-27%** |
| format.json | regex format | 6 | ✅ | 79.7M | ✅ | 22.2M | 🟢 **-72%** |
| format.json | ipv4 format | 6 | ✅ | 157.2M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 82.0M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 162.8M | ✅ | 109.7M | 🟢 **-33%** |
| format.json | hostname format | 6 | ✅ | 82.1M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 163.3M | ✅ | 102.7M | 🟢 **-37%** |
| format.json | date-time format | 6 | ✅ | 75.0M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 162.2M | ✅ | 120.7M | 🟢 **-26%** |
| format.json | json-pointer format | 6 | ✅ | 81.9M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 161.7M | ✅ | 102.5M | 🟢 **-37%** |
| format.json | iri format | 6 | ✅ | 79.6M | ✅ | 119.3M | 🔴 **+50%** |
| format.json | iri-reference format | 6 | ✅ | 147.0M | ✅ | 103.5M | 🟢 **-30%** |
| format.json | uri format | 6 | ✅ | 81.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 162.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 75.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 159.9M | ✅ | 113.2M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.5M | ✅ | 114.0M | 🔴 **+37%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 164.4M | ✅ | 113.3M | 🟢 **-31%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.2M | ✅ | 114.4M | 🟢 **-30%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 56.4M | ✅ | 1.8M | 🟢 **-97%** |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ✅ | 12.8M | 🟢 **-75%** |
| items.json | an array of schemas for items | 6 | ✅ | 107.3M | ✅ | 26.9M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.5M | ✅ | 101.2M | 🔴 **+21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 6.9M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 59.8M | ✅ | 15.7M | 🟢 **-74%** |
| items.json | items and subitems | 6 | ✅ | 29.2M | ✅ | 2.1M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 88.8M | 🔴 **+29%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 73.6M | +0% |
| maxItems.json | maxItems validation | 4 | ✅ | 69.7M | ✅ | 19.7M | 🟢 **-72%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 10.5M | 🟢 **-84%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 21.0M | 🟢 **-62%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 9.9M | 🟢 **-81%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 24.1M | 🟢 **-56%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.8M | ✅ | 9.6M | 🟢 **-79%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.0M | ✅ | 9.8M | 🟢 **-79%** |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 18.4M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.0M | ✅ | 20.0M | 🟢 **-71%** |
| minItems.json | minItems validation | 4 | ✅ | 71.2M | ✅ | 19.4M | 🟢 **-73%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 11.0M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 52.6M | ✅ | 12.2M | 🟢 **-77%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.4M | ✅ | 10.2M | 🟢 **-81%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 24.0M | 🟢 **-57%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 9.5M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 18.1M | 🟢 **-74%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 16.9M | 🟢 **-74%** |
| multipleOf.json | by int | 3 | ✅ | 66.6M | ✅ | 12.7M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 14.3M | 🟢 **-79%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 9.7M | 🟢 **-84%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 21.2M | 🟢 **-69%** |
| not.json | not | 2 | ✅ | 70.1M | ✅ | 6.7M | 🟢 **-90%** |
| not.json | not multiple types | 3 | ✅ | 64.3M | ✅ | 6.8M | 🟢 **-89%** |
| not.json | not more complex schema | 3 | ✅ | 62.6M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 48.5M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 6.8M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.0M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ✅ | 7.1M | 🟢 **-91%** |
| not.json | double negation | 1 | ✅ | 80.8M | ✅ | 6.8M | 🟢 **-92%** |
| oneOf.json | oneOf | 4 | ✅ | 61.9M | ✅ | 3.9M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.4M | ✅ | 5.6M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.5M | ✅ | 5.8M | 🟢 **-90%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 3.2M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.6M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 6.2M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.9M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 51.6M | ✅ | 29.2M | 🟢 **-43%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.7M | ✅ | 30.6M | 🔴 **+48%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 9.2M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 5.0M | 🟢 **-63%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.5M | ✅ | 5.0M | 🟢 **-68%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ✅ | 4.3M | 🟢 **-79%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 22.4M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 51.5M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.2M | ✅ | 411K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 898K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.3M | ✅ | 5.6M | 🟢 **-85%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ✅ | 6.3M | 🟢 **-66%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.5M | ✅ | 65.2M | 🟢 **-22%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ✅ | 6.0M | 🟢 **-87%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.3M | ✅ | 5.3M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.6M | ✅ | 4.2M | 🟢 **-89%** |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.7M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.7M | ✅ | 6.4M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.7M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 37.2M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.0M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.4M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ✅ | 104.3M | 🔴 **+29%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.3M | ✅ | 135K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.1M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.2M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.3M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 39.3M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 4.8M | 🟢 **-93%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 4.6M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.6M | ✅ | 4.7M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.7M | ✅ | 10.1M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 100.6M | 🔴 **+25%** |
| required.json | required with empty array | 1 | ✅ | 80.7M | ✅ | 94.6M | +17% |
| required.json | required with escaped characters | 2 | ✅ | 48.0M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.9M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 8.6M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 62.4M | ✅ | 10.0M | 🟢 **-84%** |
| type.json | string type matches strings | 9 | ✅ | 61.1M | ✅ | 9.7M | 🟢 **-84%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 8.0M | 🟢 **-85%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 7.8M | 🟢 **-86%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.2M | ✅ | 8.5M | 🟢 **-85%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.2M | ✅ | 7.6M | 🟢 **-87%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.8M | ✅ | 9.2M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 69.6M | ✅ | 12.6M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 65.6M | ✅ | 10.9M | 🟢 **-83%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 15.5M | 🟢 **-78%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 5.1M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 5.5M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.7M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 15.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 87.5M | +10% |
| optional/bignum.json | string | 1 | ✅ | 58.0M | ✅ | 6.5M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 98.0M | 🔴 **+36%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ✅ | 4.7M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 98.9M | 🔴 **+38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 4.7M | 🟢 **-92%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 354K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 426K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.9M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.3M | ✅ | 9.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 8.8M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 7.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 11.7M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.6M | ✅ | 8.7M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.4M | ✅ | 8.8M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 16.4M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.4M | ✅ | 6.2M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 5.5M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 5.9M | 🟢 **-60%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.9M | ✅ | 7.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 5.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 5.7M | 🟢 **-70%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 4.2M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.3M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 68.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 108.1M | 🔴 **+37%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.2M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 53.9M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 55.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.2M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.8M | ✅ | 6.7M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.2M | ✅ | 83.8M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 61.0M | ✅ | 20.2M | 🟢 **-67%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 113.6M | 🟢 **-31%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 67.2M | ✅ | 92.9M | 🔴 **+38%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.5M | ✅ | 3.6M | 🟢 **-93%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.9M | ✅ | 6.8M | 🟢 **-83%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.1M | ✅ | 9.2M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 66.0M | ✅ | 102.2M | 🔴 **+55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.7M | ✅ | 14.0M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.7M | ✅ | 7.3M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.7M | ✅ | 8.1M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.5M | ✅ | 6.7M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 103.8M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.8M | ✅ | 3.4M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 61.1M | -12% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.1M | ✅ | 6.1M | 🟢 **-75%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 4.4M | 🟢 **-86%** |
| allOf.json | allOf | 4 | ✅ | 35.6M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.9M | ✅ | 6.4M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 103.5M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 55.8M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.2M | ✅ | 87.5M | +20% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 104.2M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 63.3M | ✅ | 7.0M | 🟢 **-89%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 4.8M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 63.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 44.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 63.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 59.0M | ✅ | 6.2M | 🟢 **-89%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 32.7M | ✅ | 3.5M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.2M | ✅ | 100.4M | 🔴 **+37%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 73.2M | ✅ | 103.9M | 🔴 **+42%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 56.2M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.7M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.2M | ✅ | 12.8M | 🟢 **-81%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 4.8M | 🟢 **-93%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 59.6M | ✅ | 117.6M | 🔴 **+97%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 50.0M | ✅ | 7.0M | 🟢 **-86%** |
| const.json | const validation | 3 | ✅ | 51.7M | ✅ | 7.0M | 🟢 **-86%** |
| const.json | const with object | 4 | ✅ | 37.3M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 47.8M | ✅ | 2.6M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 64.7M | ✅ | 4.0M | 🟢 **-94%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 61.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.9M | ✅ | 5.3M | 🟢 **-91%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.0M | ✅ | 2.9M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 4.3M | 🟢 **-92%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.9M | ✅ | 3.3M | 🟢 **-94%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 59.4M | ✅ | 10.9M | 🟢 **-82%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.1M | ✅ | 6.2M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 36.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 58.4M | ✅ | 9.5M | 🟢 **-84%** |
| contains.json | contains with null instance elements | 1 | ✅ | 64.6M | ✅ | 92.6M | 🔴 **+43%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 75.8M | ✅ | 117.3M | 🔴 **+55%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 76.0M | ✅ | 99.5M | 🔴 **+31%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 60.1M | ✅ | 118.5M | 🔴 **+97%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 61.2M | ✅ | 105.7M | 🔴 **+73%** |
| default.json | invalid type for default | 2 | ✅ | 58.1M | ✅ | 3.3M | 🟢 **-94%** |
| default.json | invalid string value for default | 2 | ✅ | 46.4M | ✅ | 2.7M | 🟢 **-94%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 46.1M | ✅ | 1.8M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 75.5M | ✅ | 115.8M | 🔴 **+53%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.3M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.3M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 47.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.7M | ✅ | 6.1M | 🟢 **-81%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.4M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.2M | ✅ | 4.7M | 🟢 **-92%** |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 63.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 52.6M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.1M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.6M | ✅ | 3.1M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 60.7M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 59.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ✅ | 3.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.9M | ✅ | 4.3M | 🟢 **-92%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.0M | ✅ | 8.8M | 🟢 **-84%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 28.4M | ✅ | 8.8M | 🟢 **-69%** |
| format.json | email format | 6 | ✅ | 66.7M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 69.6M | ✅ | 119.9M | 🔴 **+72%** |
| format.json | regex format | 6 | ✅ | 61.2M | ✅ | 20.7M | 🟢 **-66%** |
| format.json | ipv4 format | 6 | ✅ | 62.4M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 62.4M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 62.3M | ✅ | 106.4M | 🔴 **+71%** |
| format.json | hostname format | 6 | ✅ | 33.2M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 60.9M | ✅ | 102.6M | 🔴 **+69%** |
| format.json | date-time format | 6 | ✅ | 61.3M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 62.3M | ✅ | 117.1M | 🔴 **+88%** |
| format.json | json-pointer format | 6 | ✅ | 60.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 62.1M | ✅ | 102.5M | 🔴 **+65%** |
| format.json | iri format | 6 | ✅ | 61.1M | ✅ | 106.9M | 🔴 **+75%** |
| format.json | iri-reference format | 6 | ✅ | 62.2M | ✅ | 103.8M | 🔴 **+67%** |
| format.json | uri format | 6 | ✅ | 62.4M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 62.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 59.4M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 62.3M | ✅ | 105.4M | 🔴 **+69%** |
| format.json | duration format | 6 | ✅ | 62.1M | ✅ | 97.9M | 🔴 **+58%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 52.5M | ✅ | 112.4M | 🔴 **+114%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 54.0M | ✅ | 103.9M | 🔴 **+93%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 68.3M | ✅ | 114.0M | 🔴 **+67%** |
| if-then-else.json | if and then without else | 3 | ✅ | 55.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.9M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 55.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 35.2M | ✅ | 108.0M | 🔴 **+207%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 50.3M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 58.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 38.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.0M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 46.5M | ✅ | 12.7M | 🟢 **-73%** |
| items.json | an array of schemas for items | 6 | ✅ | 57.8M | ✅ | 27.2M | 🟢 **-53%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 75.0M | ✅ | 101.2M | 🔴 **+35%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.2M | ✅ | 6.9M | 🟢 **-89%** |
| items.json | items with boolean schemas | 3 | ✅ | 53.0M | ✅ | 16.0M | 🟢 **-70%** |
| items.json | items and subitems | 6 | ✅ | 12.6M | ✅ | 2.1M | 🟢 **-83%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.3M | ✅ | 88.0M | 🔴 **+39%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 67.3M | ✅ | 93.3M | 🔴 **+39%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 75.1M | ✅ | 114.7M | 🔴 **+53%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.1M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 56.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 51.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 65.0M | ✅ | 20.1M | 🟢 **-69%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 61.1M | ✅ | 10.9M | 🟢 **-82%** |
| maxLength.json | maxLength validation | 5 | ✅ | 51.2M | ✅ | 20.9M | 🟢 **-59%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.5M | ✅ | 10.0M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.6M | ✅ | 24.3M | 🟢 **-52%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.6M | ✅ | 9.7M | 🟢 **-77%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.3M | ✅ | 9.8M | 🟢 **-78%** |
| maximum.json | maximum validation | 4 | ✅ | 64.1M | ✅ | 18.9M | 🟢 **-70%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.1M | ✅ | 20.3M | 🟢 **-68%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 75.3M | ✅ | 85.1M | +13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 55.7M | ✅ | 7.0M | 🟢 **-87%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 53.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 56.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 49.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.4M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 75.2M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 59.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.1M | ✅ | 20.1M | 🟢 **-69%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 61.2M | ✅ | 11.1M | 🟢 **-82%** |
| minLength.json | minLength validation | 5 | ✅ | 50.5M | ✅ | 12.2M | 🟢 **-76%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ✅ | 10.4M | 🟢 **-79%** |
| minProperties.json | minProperties validation | 6 | ✅ | 51.8M | ✅ | 23.6M | 🟢 **-55%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 44.1M | ✅ | 9.7M | 🟢 **-78%** |
| minimum.json | minimum validation | 4 | ✅ | 64.0M | ✅ | 18.8M | 🟢 **-71%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.7M | ✅ | 17.3M | 🟢 **-71%** |
| multipleOf.json | by int | 3 | ✅ | 63.8M | ✅ | 12.8M | 🟢 **-80%** |
| multipleOf.json | by number | 3 | ✅ | 61.1M | ✅ | 14.2M | 🟢 **-77%** |
| multipleOf.json | by small number | 2 | ✅ | 56.7M | ✅ | 10.0M | 🟢 **-82%** |
| multipleOf.json | float division = inf | 1 | ✅ | 50.4M | ✅ | 5.5M | 🟢 **-89%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 61.3M | ✅ | 19.8M | 🟢 **-68%** |
| not.json | not | 2 | ✅ | 64.0M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not multiple types | 3 | ✅ | 58.1M | ✅ | 6.9M | 🟢 **-88%** |
| not.json | not more complex schema | 3 | ✅ | 56.3M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 45.3M | ✅ | 2.7M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.2M | ✅ | 7.0M | 🟢 **-86%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.2M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 71.2M | ✅ | 7.2M | 🟢 **-90%** |
| not.json | double negation | 1 | ✅ | 73.0M | ✅ | 7.0M | 🟢 **-90%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 57.1M | ✅ | 3.9M | 🟢 **-93%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.5M | ✅ | 5.6M | 🟢 **-81%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 5.9M | 🟢 **-89%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.2M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.1M | ✅ | 3.3M | 🟢 **-94%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 56.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.6M | ✅ | 6.2M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.0M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 1.6M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 61.1M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 48.8M | ✅ | 27.0M | 🟢 **-45%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.6M | ✅ | 31.3M | 🔴 **+130%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.5M | ✅ | 9.0M | 🟢 **-62%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ✅ | 4.5M | 🟢 **-77%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 10.9M | ✅ | 22.5M | 🔴 **+107%** |
| properties.json | object properties validation | 6 | ✅ | 46.3M | ✅ | 1.9M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.7M | ✅ | 1.6M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.9M | ✅ | 1.9M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.4M | ✅ | 391K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.5M | ✅ | 3.4M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ✅ | 888K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 36.3M | ✅ | 5.5M | 🟢 **-85%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.6M | ✅ | 6.1M | 🟢 **-67%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 75.2M | ✅ | 66.3M | -12% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ✅ | 5.9M | 🟢 **-86%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.7M | ✅ | 5.5M | 🟢 **-85%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.0M | ✅ | 4.2M | 🟢 **-89%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 4.4M | 🔴 **+52%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.6M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.0M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.5M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.5M | ✅ | 6.1M | 🟢 **-87%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.6M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 35.9M | ✅ | 3.6M | 🟢 **-90%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.5M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.3M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.2M | ✅ | 103.5M | 🔴 **+41%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 56.3M | ✅ | 3.7M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 45.6M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 49.6M | ✅ | 2.3M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 42.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 35.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 36.3M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.6M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.9M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 45.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 43.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 7.1M | 🟢 **-89%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 6.9M | 🟢 **-89%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 59.0M | ✅ | 4.7M | 🟢 **-92%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 42.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 28.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 43.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.2M | ✅ | 9.5M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 73.1M | ✅ | 104.1M | 🔴 **+42%** |
| required.json | required with empty array | 1 | ✅ | 73.0M | ✅ | 94.8M | 🔴 **+30%** |
| required.json | required with escaped characters | 2 | ✅ | 40.5M | ✅ | 1.1M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.8M | ✅ | 2.9M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 52.5M | ✅ | 8.7M | 🟢 **-83%** |
| type.json | number type matches numbers | 9 | ✅ | 56.1M | ✅ | 10.2M | 🟢 **-82%** |
| type.json | string type matches strings | 9 | ✅ | 56.9M | ✅ | 10.1M | 🟢 **-82%** |
| type.json | object type matches objects | 7 | ✅ | 50.9M | ✅ | 8.1M | 🟢 **-84%** |
| type.json | array type matches arrays | 7 | ✅ | 53.5M | ✅ | 7.9M | 🟢 **-85%** |
| type.json | boolean type matches booleans | 10 | ✅ | 55.4M | ✅ | 8.7M | 🟢 **-84%** |
| type.json | null type matches only the null object | 10 | ✅ | 52.2M | ✅ | 7.8M | 🟢 **-85%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.0M | ✅ | 9.4M | 🟢 **-83%** |
| type.json | type as array with one item | 2 | ✅ | 63.1M | ✅ | 12.9M | 🟢 **-80%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 11.1M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 63.6M | ✅ | 15.6M | 🟢 **-75%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 68.2M | ✅ | 114.3M | 🔴 **+67%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 44.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 59.6M | ✅ | 77.8M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 46.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 65.8M | ✅ | 90.4M | 🔴 **+38%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 44.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 66.7M | ✅ | 87.5M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.8M | ✅ | 87.5M | 🔴 **+341%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 36.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 61.1M | ✅ | 120.4M | 🔴 **+97%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 63.3M | ✅ | 75.7M | +20% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 50.4M | ✅ | 89.1M | 🔴 **+77%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 58.3M | ✅ | 3.3M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 58.0M | ✅ | 3.4M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.3M | ✅ | 3.2M | 🟢 **-89%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.3M | ✅ | 3.3M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 3.3M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 38.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.5M | ✅ | 1.7M | 🟢 **-91%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 63.3M | ✅ | 119.1M | 🔴 **+88%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.2M | ✅ | 84.5M | 🔴 **+83%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 22.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.7M | ✅ | 5.2M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 5.4M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 70.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 56.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 45.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 64.1M | ✅ | 12.8M | 🟢 **-80%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 51.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 71.0M | ✅ | 15.0M | 🟢 **-79%** |
| optional/bignum.json | number | 2 | ✅ | 70.0M | ✅ | 87.2M | 🔴 **+25%** |
| optional/bignum.json | string | 1 | ✅ | 54.3M | ✅ | 6.6M | 🟢 **-88%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.0M | ✅ | 96.5M | 🔴 **+46%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.4M | ✅ | 4.8M | 🟢 **-91%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 65.3M | ✅ | 98.7M | 🔴 **+51%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ✅ | 4.5M | 🟢 **-91%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 56.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.4M | ✅ | 4.2M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 76.1M | ✅ | 6.9M | 🟢 **-91%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.0M | ✅ | 2.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.9M | ✅ | 1.6M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 47.8M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 51.2M | ✅ | 2.7M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.3M | ✅ | 1.7M | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.4M | ✅ | 8.8M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.2M | ✅ | 8.9M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.8M | ✅ | 8.9M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 9.0M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.3M | ✅ | 7.0M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 11.2M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.7M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 8.9M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.4M | ✅ | 16.1M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 6.2M | 🟢 **-78%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 5.3M | 🟢 **-65%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 5.7M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.0M | ✅ | 7.2M | 🟢 **-72%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.3M | ✅ | 5.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ✅ | 5.6M | 🟢 **-70%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 4.2M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 61.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 70.8M | ✅ | 111.7M | 🔴 **+58%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.6M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.9M | ✅ | 14.7M | 🟢 **-73%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 45.5M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 45.6M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.9M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.8M | ✅ | 6.9M | 🟢 **-89%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.5M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.9M | ✅ | 16.0M | 🟢 **-63%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ✅ | 7.4M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 6.8M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 103.2M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.5M | ✅ | 3.6M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 61.6M | -11% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ✅ | 6.1M | 🟢 **-76%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.9M | ✅ | 4.5M | 🟢 **-86%** |
| allOf.json | allOf | 4 | ✅ | 38.8M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 6.4M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 103.6M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.8M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.7M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.0M | ✅ | 103.0M | 🔴 **+34%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.2M | ✅ | 103.6M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 4.8M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ✅ | 6.3M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.2M | ✅ | 3.6M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 103.7M | 🔴 **+22%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 103.7M | 🔴 **+22%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.9M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.5M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.8M | ✅ | 12.8M | 🟢 **-84%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 4.8M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 84.6M | ✅ | 113.4M | 🔴 **+34%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.7M | ✅ | 7.0M | 🟢 **-89%** |
| const.json | const validation | 3 | ✅ | 63.7M | ✅ | 6.9M | 🟢 **-89%** |
| const.json | const with object | 4 | ✅ | 38.1M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 56.3M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 74.6M | ✅ | 4.0M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 71.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 70.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 64.1M | ✅ | 5.3M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.3M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.2M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 60.7M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.4M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 79.7M | ✅ | 11.2M | 🟢 **-86%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.9M | ✅ | 6.3M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ✅ | 10.9M | 🟢 **-83%** |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 92.1M | 🔴 **+25%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ✅ | 116.2M | 🔴 **+29%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 88.8M | ✅ | 116.9M | 🔴 **+32%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 91.1M | ✅ | 118.1M | 🔴 **+30%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 72.0M | ✅ | 105.2M | 🔴 **+46%** |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ✅ | 3.6M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 2.7M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 50.9M | ✅ | 1.8M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 89.2M | ✅ | 117.1M | 🔴 **+31%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.2M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 49.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 56.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.0M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.5M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 9.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.6M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 6.0M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.3M | ✅ | 1.4M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.2M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.5M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 72.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.8M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.2M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.2M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.3M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 61.4M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ✅ | 8.8M | 🟢 **-87%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.2M | ✅ | 8.8M | 🟢 **-87%** |
| format.json | email format | 7 | ✅ | 83.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 90.0M | ✅ | 118.1M | 🔴 **+31%** |
| format.json | regex format | 7 | ✅ | 74.4M | ✅ | 23.3M | 🟢 **-69%** |
| format.json | ipv4 format | 7 | ✅ | 74.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 74.0M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 74.0M | ✅ | 118.8M | 🔴 **+61%** |
| format.json | hostname format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 74.5M | ✅ | 103.8M | 🔴 **+39%** |
| format.json | date-time format | 7 | ✅ | 79.3M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 73.8M | ✅ | 112.5M | 🔴 **+53%** |
| format.json | json-pointer format | 7 | ✅ | 74.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 82.6M | ✅ | 102.4M | 🔴 **+24%** |
| format.json | iri format | 7 | ✅ | 74.5M | ✅ | 119.2M | 🔴 **+60%** |
| format.json | iri-reference format | 7 | ✅ | 68.8M | ✅ | 104.5M | 🔴 **+52%** |
| format.json | uri format | 7 | ✅ | 74.0M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 74.4M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 74.2M | ✅ | 118.6M | 🔴 **+60%** |
| format.json | duration format | 7 | ✅ | 73.6M | ✅ | 104.4M | 🔴 **+42%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.9M | ✅ | 112.8M | 🔴 **+41%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.6M | ✅ | 114.1M | 🔴 **+29%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ✅ | 110.6M | 🔴 **+39%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.9M | ✅ | 97.8M | 🔴 **+22%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.7M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 52.1M | ✅ | 12.8M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 100.7M | +14% |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.2M | ✅ | 7.0M | 🟢 **-90%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 45.0M | ✅ | 6.7M | 🟢 **-85%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.7M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.7M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 86.4M | 🔴 **+20%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 113.8M | 🔴 **+29%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 72.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.8M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.0M | ✅ | 20.1M | 🟢 **-73%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 11.0M | 🟢 **-84%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.3M | ✅ | 21.1M | 🟢 **-63%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 10.3M | 🟢 **-81%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ✅ | 24.2M | 🟢 **-57%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.6M | ✅ | 9.9M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 9.9M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 18.7M | 🟢 **-75%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 20.5M | 🟢 **-72%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.4M | ✅ | 109.2M | 🔴 **+24%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 68.7M | ✅ | 7.2M | 🟢 **-90%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.6M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.6M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 88.6M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.9M | ✅ | 20.0M | 🟢 **-72%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 11.2M | 🟢 **-84%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 12.4M | 🟢 **-78%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 9.8M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ✅ | 24.2M | 🟢 **-58%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.7M | ✅ | 9.9M | 🟢 **-77%** |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ✅ | 18.2M | 🟢 **-75%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.9M | ✅ | 17.5M | 🟢 **-75%** |
| multipleOf.json | by int | 3 | ✅ | 72.3M | ✅ | 12.7M | 🟢 **-82%** |
| multipleOf.json | by number | 3 | ✅ | 70.4M | ✅ | 14.3M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 10.1M | 🟢 **-84%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.5M | ✅ | 19.8M | 🟢 **-72%** |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 68.0M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 66.0M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 51.9M | ✅ | 2.8M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.1M | ✅ | 7.1M | 🟢 **-89%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.3M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 82.3M | ✅ | 7.2M | 🟢 **-91%** |
| not.json | double negation | 1 | ✅ | 85.0M | ✅ | 7.1M | 🟢 **-92%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.5M | ✅ | 5.8M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 5.8M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.0M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 6.3M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.0M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 70.1M | ✅ | 4.5M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 54.0M | ✅ | 28.3M | 🟢 **-48%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 31.8M | 🔴 **+27%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 9.2M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 5.0M | 🟢 **-63%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.8M | ✅ | 4.8M | 🟢 **-70%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 4.6M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 22.7M | 🔴 **+27%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.7M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 75.7M | ✅ | 102.2M | 🔴 **+35%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 77.0M | ✅ | 97.2M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 47.8M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 49.0M | ✅ | 390K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 3.3M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ✅ | 899K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.6M | ✅ | 5.7M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.6M | ✅ | 6.0M | 🟢 **-69%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 64.4M | 🟢 **-27%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.9M | ✅ | 6.2M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.2M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.4M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 38.1M | ✅ | 3.7M | 🟢 **-90%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 51.2M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 84.9M | ✅ | 103.6M | 🔴 **+22%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ✅ | 3.6M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.9M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.8M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.3M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.2M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.7M | ✅ | 7.0M | 🟢 **-90%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 7.0M | 🟢 **-90%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 4.8M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.1M | ✅ | 10.2M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 103.7M | 🔴 **+22%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 93.0M | +9% |
| required.json | required with escaped characters | 2 | ✅ | 51.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 63.3M | ✅ | 8.7M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 66.6M | ✅ | 10.0M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 62.8M | ✅ | 10.1M | 🟢 **-84%** |
| type.json | object type matches objects | 7 | ✅ | 56.8M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 61.3M | ✅ | 8.0M | 🟢 **-87%** |
| type.json | boolean type matches booleans | 10 | ✅ | 60.9M | ✅ | 8.6M | 🟢 **-86%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.0M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.8M | ✅ | 9.3M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 72.6M | ✅ | 13.0M | 🟢 **-82%** |
| type.json | type: array or object | 5 | ✅ | 67.8M | ✅ | 11.1M | 🟢 **-84%** |
| type.json | type: array, object or null | 5 | ✅ | 73.7M | ✅ | 15.7M | 🟢 **-79%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.2M | ✅ | 110.9M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 58.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ✅ | 78.1M | +16% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 68.1M | ✅ | 93.1M | 🔴 **+37%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.4M | ✅ | 6.7M | 🟢 **-85%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.9M | ✅ | 101.0M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.2M | ✅ | 111.5M | 🔴 **+479%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 44.9M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.4M | ✅ | 115.5M | 🔴 **+34%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.6M | ✅ | 83.0M | 🔴 **+21%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ✅ | 114.5M | 🔴 **+104%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 83.0M | ✅ | 114.3M | 🔴 **+38%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.1M | ✅ | 6.6M | 🟢 **-81%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.5M | ✅ | 3.4M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.8M | ✅ | 3.4M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 24.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ✅ | 3.4M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ✅ | 3.5M | 🟢 **-87%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 6.9M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.8M | ✅ | 116.9M | 🔴 **+50%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ✅ | 84.1M | 🔴 **+65%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.0M | ✅ | 5.3M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 53.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 72.5M | ✅ | 12.7M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 15.1M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 82.7M | ✅ | 88.1M | +6% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 6.8M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 72.9M | ✅ | 98.1M | 🔴 **+35%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.7M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.3M | ✅ | 98.6M | 🔴 **+38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.2M | ✅ | 4.8M | 🟢 **-92%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 62.3M | ✅ | 4.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 7.6M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.5M | ✅ | 2.5M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ✅ | 1.7M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.7M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 66.7M | ✅ | 2.7M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.9M | ✅ | 1.8M | 🟢 **-96%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.8M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 16.4M | ✅ | 9.2M | 🟢 **-44%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 8.8M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 9.2M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 7.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 11.7M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.7M | ✅ | 9.2M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.5M | ✅ | 9.2M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.6M | ✅ | 16.1M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 6.2M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 5.6M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 5.3M | 🟢 **-66%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ✅ | 7.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 5.4M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 5.9M | 🟢 **-70%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 4.1M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.2M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 49.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 35.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ✅ | 118.6M | 🔴 **+42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.8M | ✅ | 6.3M | 🟢 **-75%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.4M | ✅ | 6.1M | 🟢 **-63%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 33.5M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.9M | ✅ | 14.8M | 🟢 **-76%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 50.6M | ✅ | 2.1M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.2M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 51.6M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 70.4M | ✅ | 7.0M | 🟢 **-90%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.3M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |
