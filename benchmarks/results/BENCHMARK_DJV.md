# tjs vs djv Benchmarks

Performance comparison of **tjs** vs **[djv](https://github.com/korzio/djv)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | djv pass | djv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 25.6M | 150/199 | 3.5M | 150 | 🟢 **-86%** |
| draft6 | 276 | ✅ 276 | 29.2M | 208/276 | 3.6M | 208 | 🟢 **-88%** |
| draft7 | 313 | ✅ 313 | 15.1M | 219/313 | 4.0M | 219 | 🟢 **-74%** |
| draft2019-09 | 435 | ✅ 435 | 18.6M | 254/435 | 4.6M | 254 | 🟢 **-75%** |
| draft2020-12 | 448 | ✅ 448 | 19.1M | 244/448 | 4.7M | 244 | 🟢 **-76%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 1075/1671 | 4.1M | 1075 | 🟢 **-79%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **10.10x faster** (24 ns vs 244 ns per test, 3717 tests in 1075 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.1M | ✅ | 7.1M | 0% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 38.7M | ✅ | 84.2M | 🔴 **+117%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.2M | ✅ | 18.2M | 🟢 **-88%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 40.3M | ✅ | 107.0M | 🔴 **+165%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 90.3M | 🟢 **-27%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.7M | ✅ | 3.5M | 🟢 **-91%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 29.5M | ✅ | 6.7M | 🟢 **-77%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 57.0M | ✅ | 9.2M | 🟢 **-84%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 151.9M | ✅ | 102.7M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.6M | ✅ | 14.6M | 🟢 **-60%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.4M | ✅ | 7.2M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.4M | ✅ | 8.3M | 🟢 **-75%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 42.0M | ✅ | 6.8M | 🟢 **-84%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.9M | ✅ | 102.7M | 🔴 **+47%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.8M | ✅ | 3.5M | 🟢 **-87%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 47.7M | ✅ | 61.1M | 🔴 **+28%** |
| allOf.json | allOf | 4 | ✅ | 46.6M | ✅ | 1.5M | 🟢 **-97%** |
| allOf.json | allOf with base schema | 5 | ✅ | 21.5M | ✅ | 1.4M | 🟢 **-93%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ✅ | 6.4M | 🟢 **-94%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 61.9M | ✅ | 100.8M | 🔴 **+63%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 103.0M | 🟢 **-33%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.7M | ✅ | 6.8M | 🟢 **-90%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.8M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.1M | ✅ | 4.7M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.6M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 60.9M | ✅ | 6.3M | 🟢 **-90%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 42.9M | ✅ | 3.6M | 🟢 **-92%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.8M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 12.6M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 67.6M | ✅ | 4.8M | 🟢 **-93%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 3.5M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 49.7M | ✅ | 2.7M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 73.4M | ✅ | 1.9M | 🟢 **-97%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.3M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.5M | ✅ | 2.6M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.0M | ✅ | 1.4M | 🟢 **-98%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 44.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 65.4M | ✅ | 6.1M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 1.3M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 29.9M | ✅ | 4.5M | 🟢 **-85%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 50.3M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 94.8M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 57.2M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 103.2M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.9M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 57.8M | ✅ | 3.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 4.3M | 🟢 **-95%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 48.6M | ❌ | - | - |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 86.0M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 72.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 74.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.0M | ✅ | 1.8M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 80.1M | ✅ | 12.6M | 🟢 **-84%** |
| items.json | an array of schemas for items | 6 | ✅ | 60.3M | ✅ | 27.5M | 🟢 **-55%** |
| items.json | items and subitems | 6 | ✅ | 28.3M | ✅ | 2.2M | 🟢 **-92%** |
| items.json | nested items | 3 | ✅ | 11.6M | ✅ | 3.3M | 🟢 **-72%** |
| items.json | items with null instance elements | 1 | ✅ | 66.0M | ✅ | 87.8M | 🔴 **+33%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.3M | ✅ | 85.9M | 🔴 **+22%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.1M | ✅ | 20.2M | 🟢 **-70%** |
| maxLength.json | maxLength validation | 5 | ✅ | 52.8M | ✅ | 21.0M | 🟢 **-60%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.5M | ✅ | 23.9M | 🟢 **-54%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.9M | ✅ | 9.8M | 🟢 **-79%** |
| maximum.json | maximum validation | 4 | ✅ | 66.7M | ✅ | 18.8M | 🟢 **-72%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 65.9M | ✅ | 20.3M | 🟢 **-69%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 66.8M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 62.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 67.9M | ✅ | 19.3M | 🟢 **-72%** |
| minLength.json | minLength validation | 5 | ✅ | 52.2M | ✅ | 12.2M | 🟢 **-77%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.3M | ✅ | 23.6M | 🟢 **-56%** |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ✅ | 18.4M | 🟢 **-72%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 66.9M | ✅ | 16.1M | 🟢 **-76%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 62.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.2M | ✅ | 17.4M | 🟢 **-72%** |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ✅ | 12.8M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 14.4M | 🟢 **-78%** |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 10.0M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ✅ | 20.0M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 64.6M | ✅ | 6.7M | 🟢 **-90%** |
| not.json | not multiple types | 3 | ✅ | 60.3M | ✅ | 6.9M | 🟢 **-89%** |
| not.json | not more complex schema | 3 | ✅ | 60.1M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 51.9M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | double negation | 1 | ✅ | 76.7M | ✅ | 7.0M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 65.2M | ✅ | 3.9M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.5M | ✅ | 5.7M | 🟢 **-82%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.0M | ✅ | 6.2M | 🟢 **-91%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.3M | ✅ | 1.8M | 🟢 **-96%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.1M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 50.5M | ✅ | 29.3M | 🟢 **-42%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.2M | ✅ | 31.2M | 🔴 **+29%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ✅ | 9.1M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 5.0M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 5.1M | 🟢 **-66%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 21.8M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 50.0M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.3M | ✅ | 395K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 61.9M | ✅ | 3.4M | 🟢 **-94%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.7M | ✅ | 893K | 🟢 **-97%** |
| ref.json | root pointer ref | 4 | ✅ | 23.8M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.4M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.2M | ✅ | 6.1M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.7M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 36.3M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.7M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 66.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.0M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.2M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ✅ | 133K | 🟢 **-99%** |
| ref.json | refs with quote | 2 | ✅ | 47.4M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 66.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 51.0M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 66.5M | ✅ | 4.7M | 🟢 **-93%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 66.2M | ✅ | 4.3M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.8M | ✅ | 4.4M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.1M | ✅ | 8.5M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 76.6M | ✅ | 43.8M | 🟢 **-43%** |
| required.json | required with escaped characters | 2 | ✅ | 32.5M | ✅ | 1.0M | 🟢 **-97%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.1M | ✅ | 2.8M | 🟢 **-89%** |
| type.json | integer type matches integers | 8 | ✅ | 51.9M | ✅ | 7.2M | 🟢 **-86%** |
| type.json | number type matches numbers | 9 | ✅ | 59.4M | ✅ | 8.7M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 58.8M | ✅ | 9.1M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 52.0M | ✅ | 7.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 55.6M | ✅ | 7.3M | 🟢 **-87%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.1M | ✅ | 7.8M | 🟢 **-86%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.6M | ✅ | 7.1M | 🟢 **-87%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.2M | ✅ | 8.3M | 🟢 **-85%** |
| type.json | type as array with one item | 2 | ✅ | 66.5M | ✅ | 11.0M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 57.8M | ✅ | 9.6M | 🟢 **-83%** |
| type.json | type: array, object or null | 5 | ✅ | 64.7M | ✅ | 13.2M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ✅ | 4.8M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ✅ | 5.0M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 75.4M | ✅ | 12.6M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 40.7M | 🟢 **-46%** |
| optional/bignum.json | string | 1 | ✅ | 56.3M | ✅ | 6.1M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 41.8M | 🟢 **-39%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.8M | ✅ | 4.3M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 41.9M | 🟢 **-39%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 51.6M | ✅ | 4.3M | 🟢 **-92%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.7M | ✅ | 8.0M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.6M | ✅ | 8.1M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.7M | ✅ | 8.2M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 8.1M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.4M | ✅ | 6.2M | 🟢 **-77%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 10.5M | 🟢 **-58%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.4M | ✅ | 7.6M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.5M | ✅ | 7.5M | 🟢 **-71%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 13.4M | 🟢 **-46%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.6M | ✅ | 5.5M | 🟢 **-81%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ✅ | 5.0M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 5.4M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.6M | ✅ | 6.6M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ✅ | 4.6M | 🟢 **-76%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 5.1M | 🟢 **-74%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 3.9M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.5M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.3M | ✅ | 45.8M | 🟢 **-39%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 33.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 7.1M | -2% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.0M | ✅ | 6.7M | 🟢 **-82%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 82.9M | 🟢 **-46%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.5M | ✅ | 18.1M | 🟢 **-78%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.7M | ✅ | 106.4M | 🟢 **-35%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 85.3M | +6% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.1M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 6.9M | 🟢 **-85%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 9.3M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 100.0M | 🔴 **+24%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.5M | ✅ | 13.8M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.1M | ✅ | 7.3M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 8.1M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ✅ | 6.6M | 🟢 **-82%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 95.1M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.5M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 48.3M | 🟢 **-30%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 1.4M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.4M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 100.9M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.7M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 101.4M | 🔴 **+25%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 100.9M | 🟢 **-34%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.7M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.1M | ✅ | 3.3M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 79.9M | ✅ | 6.4M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.5M | ✅ | 3.6M | 🟢 **-92%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 100.6M | +12% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 100.5M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 12.7M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.8M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.4M | ✅ | 113.9M | 🔴 **+43%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.7M | ✅ | 7.1M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 61.3M | ✅ | 7.0M | 🟢 **-89%** |
| const.json | const with object | 4 | ✅ | 47.6M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 58.4M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 119.1M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.8M | ✅ | 5.4M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.5M | ✅ | 3.0M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 87.9M | ✅ | 3.3M | 🟢 **-96%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.9M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 11.0M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ✅ | 6.2M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 38.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 52.5M | ✅ | 89.8M | 🔴 **+71%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 3.6M | 🟢 **-97%** |
| default.json | invalid string value for default | 2 | ✅ | 52.8M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.9M | ✅ | 1.8M | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.5M | ✅ | 4.3M | 🟢 **-95%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 7.2M | 🟢 **-93%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.8M | ✅ | 2.5M | 🟢 **-94%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 25.2M | ✅ | 1.3M | 🟢 **-95%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.4M | ✅ | 2.8M | 🟢 **-97%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.6M | ✅ | 6.1M | 🟢 **-90%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 1.4M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.0M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 15.2M | ✅ | 1.6M | 🟢 **-90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 68.1M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 104.2M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.3M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.8M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 4.2M | 🟢 **-95%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 95.0M | ✅ | 8.8M | 🟢 **-91%** |
| format.json | email format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 84.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 133.9M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 91.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 161.7M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 92.8M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 146.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 90.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 33.0M | ✅ | 1.7M | 🟢 **-95%** |
| items.json | a schema given for items | 4 | ✅ | 53.8M | ✅ | 12.7M | 🟢 **-76%** |
| items.json | an array of schemas for items | 6 | ✅ | 96.8M | ✅ | 27.3M | 🟢 **-72%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.7M | ✅ | 98.5M | +5% |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 7.0M | 🟢 **-93%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.6M | ✅ | 15.8M | 🟢 **-75%** |
| items.json | items and subitems | 6 | ✅ | 28.8M | ✅ | 2.1M | 🟢 **-93%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 3.0M | 🟢 **-75%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 86.4M | +15% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 90.0M | +11% |
| maxItems.json | maxItems validation | 4 | ✅ | 38.1M | ✅ | 20.0M | 🟢 **-47%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.0M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 20.1M | 🟢 **-66%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.4M | ✅ | 10.3M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.9M | ✅ | 24.4M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ✅ | 9.3M | 🟢 **-81%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.8M | ✅ | 9.8M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 69.6M | ✅ | 18.7M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.6M | ✅ | 20.3M | 🟢 **-72%** |
| minItems.json | minItems validation | 4 | ✅ | 81.1M | ✅ | 19.9M | 🟢 **-76%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.1M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 12.3M | 🟢 **-79%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 9.6M | 🟢 **-83%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.5M | ✅ | 24.2M | 🟢 **-57%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.9M | ✅ | 9.8M | 🟢 **-78%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 18.3M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ✅ | 17.4M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.3M | ✅ | 12.8M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 14.5M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.5M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 49.4M | ✅ | 2.8M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.4M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 59.9M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 7.2M | 🟢 **-92%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 7.0M | 🟢 **-92%** |
| oneOf.json | oneOf | 4 | ✅ | 77.9M | ✅ | 3.9M | 🟢 **-95%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ✅ | 5.8M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 5.7M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.5M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 54.8M | ✅ | 28.7M | 🟢 **-48%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.5M | ✅ | 31.7M | 🔴 **+118%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 9.3M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 5.1M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 5.1M | 🟢 **-65%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ✅ | 4.6M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 22.6M | 🔴 **+25%** |
| properties.json | object properties validation | 6 | ✅ | 55.3M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.7M | ✅ | 393K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ✅ | 871K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ✅ | 6.1M | 🟢 **-69%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 63.9M | 🟢 **-32%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.8M | ✅ | 6.1M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 5.5M | 🟢 **-86%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.0M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 6.5M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 38.7M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.8M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.3M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.3M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 100.5M | +12% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.9M | ✅ | 132K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.6M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.9M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.3M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 4.8M | 🟢 **-94%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.0M | ✅ | 4.7M | 🟢 **-94%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 4.8M | 🟢 **-94%** |
| refRemote.json | remote ref | 2 | ✅ | 50.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 10.0M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 101.0M | +12% |
| required.json | required with empty array | 1 | ✅ | 89.9M | ✅ | 92.6M | +3% |
| required.json | required with escaped characters | 2 | ✅ | 52.0M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ✅ | 2.8M | 🟢 **-90%** |
| type.json | integer type matches integers | 9 | ✅ | 66.9M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 7.9M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.6M | ✅ | 8.6M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 64.6M | ✅ | 7.7M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.8M | ✅ | 9.3M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 12.9M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 71.8M | ✅ | 11.1M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 15.6M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 5.1M | 🟢 **-85%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 5.2M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.1M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 86.8M | -2% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.7M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 96.1M | 🔴 **+22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 95.8M | 🔴 **+21%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 4.8M | 🟢 **-92%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.1M | ✅ | 8.9M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 9.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 9.2M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.6M | ✅ | 7.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.8M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 9.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.6M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 16.1M | 🟢 **-41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.2M | ✅ | 6.3M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 5.6M | 🟢 **-64%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.6M | ✅ | 5.8M | 🟢 **-60%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 7.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 4.7M | 🟢 **-77%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 5.8M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 4.2M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 93.2M | ✅ | 114.8M | 🔴 **+23%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.6M | ✅ | 831K | 🟢 **-98%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.4M | ✅ | 850K | 🟢 **-98%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 7.2M | -4% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.1M | ✅ | 6.8M | 🟢 **-81%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ✅ | 84.9M | 🟢 **-44%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.9M | ✅ | 18.2M | 🟢 **-72%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 108.9M | 🟢 **-34%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.2M | ✅ | 88.9M | 🔴 **+27%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.9M | ✅ | 3.5M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.2M | ✅ | 6.8M | 🟢 **-82%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 9.1M | 🟢 **-92%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 69.9M | ✅ | 101.3M | 🔴 **+45%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.9M | ✅ | 14.1M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 7.5M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.3M | ✅ | 8.2M | 🟢 **-76%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.3M | ✅ | 6.7M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 103.7M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.6M | ✅ | 3.4M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 57.7M | -17% |
| allOf.json | allOf | 4 | ✅ | 36.4M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ✅ | 1.4M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 63.7M | ✅ | 6.3M | 🟢 **-90%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 101.4M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 58.4M | ✅ | 3.6M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 70.0M | ✅ | 103.8M | 🔴 **+48%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 101.7M | 🟢 **-33%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 6.9M | 🟢 **-90%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 6.9M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.2M | ✅ | 4.6M | 🟢 **-93%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.4M | 🟢 **-96%** |
| anyOf.json | anyOf | 4 | ✅ | 68.8M | ✅ | 6.4M | 🟢 **-91%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.7M | ✅ | 3.6M | 🟢 **-93%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.6M | ✅ | 104.0M | 🔴 **+36%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.5M | ✅ | 103.0M | 🟢 **-32%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.3M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.0M | ✅ | 1.5M | 🟢 **-98%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 71.3M | ✅ | 12.6M | 🟢 **-82%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 4.7M | 🟢 **-96%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 67.9M | ✅ | 111.0M | 🔴 **+63%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.7M | ✅ | 7.0M | 🟢 **-92%** |
| const.json | const validation | 3 | ✅ | 57.9M | ✅ | 7.0M | 🟢 **-88%** |
| const.json | const with object | 4 | ✅ | 50.0M | ✅ | 1.6M | 🟢 **-97%** |
| const.json | const with array | 3 | ✅ | 52.4M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 4.0M | 🟢 **-97%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.7M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 48.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.6M | ✅ | 5.3M | 🟢 **-91%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 108.5M | ✅ | 2.9M | 🟢 **-97%** |
| const.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 4.2M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 88.3M | ✅ | 3.2M | 🟢 **-96%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.2M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 11.1M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.5M | ✅ | 6.2M | 🟢 **-89%** |
| contains.json | items + contains | 4 | ✅ | 51.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 58.0M | ✅ | 11.0M | 🟢 **-81%** |
| contains.json | contains with null instance elements | 1 | ✅ | 120.6M | ✅ | 92.4M | 🟢 **-23%** |
| default.json | invalid type for default | 2 | ✅ | 62.6M | ✅ | 3.4M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 34.1M | ✅ | 2.8M | 🟢 **-92%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 24.0M | ✅ | 1.9M | 🟢 **-92%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 56.6M | ✅ | 4.4M | 🟢 **-92%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 80.2M | ✅ | 7.5M | 🟢 **-91%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 32.1M | ✅ | 2.5M | 🟢 **-92%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.6M | ✅ | 1.4M | 🟢 **-97%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 50.8M | ✅ | 2.8M | 🟢 **-94%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.1M | ✅ | 1.1M | 🟢 **-90%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 34.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.8M | ✅ | 6.0M | 🟢 **-91%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.8M | ✅ | 1.4M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.8M | ✅ | 4.4M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 13.9M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.0M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 64.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 57.1M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 63.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.4M | ✅ | 2.9M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.0M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.6M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 64.1M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.7M | ✅ | 3.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 39.9M | ✅ | 4.3M | 🟢 **-89%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 30.0M | ✅ | 8.6M | 🟢 **-71%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.5M | ✅ | 8.8M | 🟢 **-85%** |
| format.json | email format | 6 | ✅ | 72.8M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 72.9M | ✅ | 120.5M | 🔴 **+65%** |
| format.json | regex format | 6 | ✅ | 70.0M | ✅ | 21.9M | 🟢 **-69%** |
| format.json | ipv4 format | 6 | ✅ | 69.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 69.6M | ✅ | 120.6M | 🔴 **+73%** |
| format.json | hostname format | 6 | ✅ | 72.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 71.3M | ✅ | 102.7M | 🔴 **+44%** |
| format.json | date-time format | 6 | ✅ | 72.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 73.0M | ✅ | 119.1M | 🔴 **+63%** |
| format.json | json-pointer format | 6 | ✅ | 73.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 73.7M | ✅ | 103.5M | 🔴 **+40%** |
| format.json | iri format | 6 | ✅ | 73.1M | ✅ | 116.2M | 🔴 **+59%** |
| format.json | iri-reference format | 6 | ✅ | 76.6M | ✅ | 103.9M | 🔴 **+36%** |
| format.json | uri format | 6 | ✅ | 72.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 73.8M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 73.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 78.8M | ✅ | 114.6M | 🔴 **+46%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 95.0M | 🔴 **+20%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 71.0M | ✅ | 104.3M | 🔴 **+47%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 66.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 62.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.2M | ✅ | 104.3M | 🔴 **+44%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.0M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 48.6M | ✅ | 12.7M | 🟢 **-74%** |
| items.json | an array of schemas for items | 6 | ✅ | 60.4M | ✅ | 27.0M | 🟢 **-55%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.0M | ✅ | 100.1M | 🔴 **+27%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.0M | ✅ | 6.9M | 🟢 **-89%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.2M | ✅ | 15.9M | 🟢 **-72%** |
| items.json | items and subitems | 6 | ✅ | 23.9M | ✅ | 2.1M | 🟢 **-91%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 66.1M | ✅ | 88.3M | 🔴 **+34%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.3M | ✅ | 92.9M | 🔴 **+32%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.1M | ✅ | 20.0M | 🟢 **-71%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.8M | ✅ | 11.1M | 🟢 **-83%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.2M | ✅ | 20.3M | 🟢 **-62%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 10.1M | 🟢 **-80%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.7M | ✅ | 24.4M | 🟢 **-54%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 44.3M | ✅ | 9.8M | 🟢 **-78%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.3M | ✅ | 9.9M | 🟢 **-79%** |
| maximum.json | maximum validation | 4 | ✅ | 61.7M | ✅ | 18.7M | 🟢 **-70%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 20.4M | 🟢 **-69%** |
| minItems.json | minItems validation | 4 | ✅ | 64.4M | ✅ | 20.1M | 🟢 **-69%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 11.1M | 🟢 **-83%** |
| minLength.json | minLength validation | 5 | ✅ | 49.0M | ✅ | 12.5M | 🟢 **-75%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.4M | ✅ | 10.2M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.9M | ✅ | 24.0M | 🟢 **-55%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.3M | ✅ | 9.7M | 🟢 **-79%** |
| minimum.json | minimum validation | 4 | ✅ | 66.9M | ✅ | 18.5M | 🟢 **-72%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.6M | ✅ | 17.1M | 🟢 **-73%** |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ✅ | 12.8M | 🟢 **-81%** |
| multipleOf.json | by number | 3 | ✅ | 63.8M | ✅ | 14.3M | 🟢 **-78%** |
| multipleOf.json | by small number | 2 | ✅ | 58.9M | ✅ | 9.9M | 🟢 **-83%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 5.4M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.0M | ✅ | 19.9M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 66.2M | ✅ | 6.9M | 🟢 **-90%** |
| not.json | not multiple types | 3 | ✅ | 62.4M | ✅ | 7.0M | 🟢 **-89%** |
| not.json | not more complex schema | 3 | ✅ | 57.9M | ✅ | 2.6M | 🟢 **-95%** |
| not.json | forbidden property | 2 | ✅ | 46.8M | ✅ | 2.9M | 🟢 **-94%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 52.1M | ✅ | 7.1M | 🟢 **-86%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.0M | ✅ | 7.1M | 🟢 **-87%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 76.5M | ✅ | 7.2M | 🟢 **-91%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 6.9M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 58.0M | ✅ | 4.0M | 🟢 **-93%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.9M | ✅ | 5.7M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 58.0M | ✅ | 5.8M | 🟢 **-90%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 3.3M | 🟢 **-94%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.9M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 64.9M | ✅ | 6.3M | 🟢 **-90%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ✅ | 1.2M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 4.5M | 🟢 **-93%** |
| pattern.json | pattern validation | 8 | ✅ | 50.5M | ✅ | 26.9M | 🟢 **-47%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.2M | ✅ | 31.8M | +17% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 9.0M | 🟢 **-65%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 4.9M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.9M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 4.5M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 22.4M | 🔴 **+28%** |
| properties.json | object properties validation | 6 | ✅ | 50.4M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.1M | ✅ | 2.0M | 🟢 **-95%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 401K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 3.4M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.8M | ✅ | 890K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.9M | ✅ | 5.6M | 🟢 **-85%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.7M | ✅ | 6.3M | 🟢 **-66%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 65.0M | -18% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.6M | ✅ | 6.1M | 🟢 **-87%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.2M | ✅ | 5.5M | 🟢 **-85%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.4M | ✅ | 4.2M | 🟢 **-89%** |
| ref.json | root pointer ref | 4 | ✅ | 22.9M | ✅ | 1.6M | 🟢 **-93%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.6M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.1M | ✅ | 6.4M | 🟢 **-88%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 35.6M | ✅ | 2.9M | 🟢 **-92%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.4M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.1M | ✅ | 2.4M | 🟢 **-95%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.6M | ✅ | 90.5M | +18% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.4M | ✅ | 2.5M | 🟢 **-96%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 133K | 🟢 **-98%** |
| ref.json | refs with quote | 2 | ✅ | 47.5M | ✅ | 1.7M | 🟢 **-96%** |
| ref.json | Location-independent identifier | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 44.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 50.9M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.5M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.8M | ✅ | 2.0M | 🟢 **-95%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 40.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 41.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 4.8M | 🟢 **-93%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.7M | ✅ | 4.7M | 🟢 **-93%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.8M | ✅ | 4.7M | 🟢 **-92%** |
| refRemote.json | remote ref | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 33.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.5M | ✅ | 9.9M | 🟢 **-83%** |
| required.json | required default validation | 1 | ✅ | 76.7M | ✅ | 101.1M | 🔴 **+32%** |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 95.2M | 🔴 **+24%** |
| required.json | required with escaped characters | 2 | ✅ | 46.5M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.4M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 54.3M | ✅ | 8.7M | 🟢 **-84%** |
| type.json | number type matches numbers | 9 | ✅ | 59.9M | ✅ | 10.1M | 🟢 **-83%** |
| type.json | string type matches strings | 9 | ✅ | 59.4M | ✅ | 10.1M | 🟢 **-83%** |
| type.json | object type matches objects | 7 | ✅ | 52.4M | ✅ | 7.9M | 🟢 **-85%** |
| type.json | array type matches arrays | 7 | ✅ | 55.6M | ✅ | 8.0M | 🟢 **-86%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.3M | ✅ | 8.7M | 🟢 **-85%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.3M | ✅ | 7.6M | 🟢 **-86%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.8M | ✅ | 9.4M | 🟢 **-84%** |
| type.json | type as array with one item | 2 | ✅ | 66.6M | ✅ | 12.8M | 🟢 **-81%** |
| type.json | type: array or object | 5 | ✅ | 57.9M | ✅ | 11.1M | 🟢 **-81%** |
| type.json | type: array, object or null | 5 | ✅ | 66.5M | ✅ | 15.6M | 🟢 **-77%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ✅ | 5.2M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 5.4M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 75.5M | ✅ | 15.0M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 87.7M | +16% |
| optional/bignum.json | string | 1 | ✅ | 56.0M | ✅ | 6.7M | 🟢 **-88%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 98.5M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 4.8M | 🟢 **-91%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 98.5M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 4.8M | 🟢 **-91%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 353K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 22.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 32.4M | ✅ | 8.9M | 🟢 **-72%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.2M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 9.0M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 9.0M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 7.2M | 🟢 **-73%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.9M | ✅ | 11.7M | 🟢 **-53%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 8.6M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.4M | ✅ | 8.8M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 16.2M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.6M | ✅ | 6.1M | 🟢 **-78%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.1M | ✅ | 5.5M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ✅ | 5.8M | 🟢 **-65%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 7.0M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.7M | ✅ | 5.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ✅ | 5.7M | 🟢 **-70%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 4.2M | 🟢 **-46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.2M | ✅ | 119.3M | 🔴 **+61%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 53.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.8M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 7.2M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.6M | ✅ | 6.9M | 🟢 **-82%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 61.3M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ✅ | 18.6M | 🟢 **-77%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 114.0M | 🟢 **-31%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 93.3M | +15% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.2M | ✅ | 3.6M | 🟢 **-94%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.8M | ✅ | 6.9M | 🟢 **-85%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 9.4M | 🟢 **-91%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 104.1M | 🔴 **+29%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 14.6M | 🟢 **-68%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 7.4M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 8.1M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 6.8M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 103.6M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.6M | ✅ | 3.6M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 61.4M | -12% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.4M | ✅ | 6.2M | 🟢 **-76%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.4M | ✅ | 4.4M | 🟢 **-85%** |
| allOf.json | allOf | 4 | ✅ | 39.4M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 6.5M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 99.6M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 103.4M | 🔴 **+28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.6M | ✅ | 104.3M | 🟢 **-31%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 6.9M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 116.9M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 39.6M | ✅ | 4.8M | 🟢 **-88%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 77.1M | ✅ | 6.4M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.9M | ✅ | 3.6M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 103.7M | +15% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 45.3M | ✅ | 99.4M | 🔴 **+119%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.1M | ✅ | 1.4M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 12.6M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 4.7M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.5M | ✅ | 111.3M | 🔴 **+42%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.2M | ✅ | 7.0M | 🟢 **-89%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 6.9M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 39.4M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 57.5M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 78.2M | ✅ | 4.1M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 73.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 67.0M | ✅ | 5.4M | 🟢 **-92%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 65.7M | ✅ | 3.0M | 🟢 **-95%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.6M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 58.5M | ✅ | 3.3M | 🟢 **-94%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.5M | ✅ | 1.7M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 42.3M | ✅ | 11.0M | 🟢 **-74%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.5M | ✅ | 6.3M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 41.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 11.1M | 🟢 **-84%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 90.3M | +17% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.1M | ✅ | 116.4M | 🔴 **+21%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 80.4M | ✅ | 117.3M | 🔴 **+46%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.3M | ✅ | 98.8M | +19% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 70.4M | ✅ | 118.2M | 🔴 **+68%** |
| default.json | invalid type for default | 2 | ✅ | 50.2M | ✅ | 3.6M | 🟢 **-93%** |
| default.json | invalid string value for default | 2 | ✅ | 26.0M | ✅ | 2.8M | 🟢 **-89%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.5M | ✅ | 1.9M | 🟢 **-96%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.8M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 33.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 117.4M | 🔴 **+22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.5M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.7M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.4M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 31.9M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 6.1M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.4M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.3M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.5M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.2M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.1M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.1M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.3M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.0M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.7M | ✅ | 8.8M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.2M | ✅ | 8.9M | 🟢 **-88%** |
| format.json | email format | 6 | ✅ | 95.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 95.4M | ✅ | 116.2M | 🔴 **+22%** |
| format.json | regex format | 6 | ✅ | 77.2M | ✅ | 20.4M | 🟢 **-74%** |
| format.json | ipv4 format | 6 | ✅ | 84.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 84.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 85.0M | ✅ | 119.6M | 🔴 **+41%** |
| format.json | hostname format | 6 | ✅ | 77.3M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 85.1M | ✅ | 103.4M | 🔴 **+22%** |
| format.json | date-time format | 6 | ✅ | 77.1M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 85.1M | ✅ | 119.3M | 🔴 **+40%** |
| format.json | json-pointer format | 6 | ✅ | 85.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 77.5M | ✅ | 104.2M | 🔴 **+34%** |
| format.json | iri format | 6 | ✅ | 77.3M | ✅ | 120.7M | 🔴 **+56%** |
| format.json | iri-reference format | 6 | ✅ | 84.5M | ✅ | 103.7M | 🔴 **+23%** |
| format.json | uri format | 6 | ✅ | 85.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 77.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 77.3M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 83.7M | ✅ | 120.3M | 🔴 **+44%** |
| format.json | duration format | 6 | ✅ | 77.2M | ✅ | 100.0M | 🔴 **+29%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.1M | ✅ | 103.6M | 🔴 **+23%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 84.1M | ✅ | 112.6M | 🔴 **+34%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 114.2M | 🔴 **+36%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 114.2M | 🔴 **+36%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 53.4M | ✅ | 12.9M | 🟢 **-76%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.2M | ✅ | 27.1M | 🟢 **-60%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 97.7M | +4% |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 6.9M | 🟢 **-90%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.7M | ✅ | 15.9M | 🟢 **-76%** |
| items.json | items and subitems | 6 | ✅ | 13.0M | ✅ | 2.2M | 🟢 **-83%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 3.3M | 🟢 **-74%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 88.3M | +17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 92.7M | +15% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.8M | ✅ | 112.3M | +20% |
| maxContains.json | maxContains with contains | 5 | ✅ | 56.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.6M | ✅ | 19.9M | 🟢 **-75%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.1M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ✅ | 21.6M | 🟢 **-64%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 10.4M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.1M | ✅ | 24.3M | 🟢 **-57%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 9.8M | 🟢 **-80%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ✅ | 9.9M | 🟢 **-81%** |
| maximum.json | maximum validation | 4 | ✅ | 76.6M | ✅ | 18.6M | 🟢 **-76%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 77.2M | ✅ | 20.5M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.8M | ✅ | 114.2M | 🔴 **+22%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.9M | ✅ | 7.1M | 🟢 **-90%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 77.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 93.9M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ✅ | 20.1M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.2M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 58.1M | ✅ | 12.7M | 🟢 **-78%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 10.3M | 🟢 **-82%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.0M | ✅ | 24.4M | 🟢 **-59%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.1M | ✅ | 9.8M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.0M | ✅ | 18.8M | 🟢 **-75%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ✅ | 17.6M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 76.8M | ✅ | 12.9M | 🟢 **-83%** |
| multipleOf.json | by number | 3 | ✅ | 73.4M | ✅ | 14.4M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.7M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 76.6M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 7.0M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 2.6M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 53.6M | ✅ | 2.9M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.5M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.1M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.3M | ✅ | 7.2M | 🟢 **-92%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 7.0M | 🟢 **-92%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.0M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.8M | ✅ | 5.8M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 5.9M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.4M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ✅ | 1.1M | 🟢 **-98%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.2M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ✅ | 28.7M | 🟢 **-47%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 31.9M | 🔴 **+26%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.2M | ✅ | 9.3M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 5.1M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.2M | ✅ | 5.2M | 🟢 **-63%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ✅ | 4.5M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.9M | 🔴 **+21%** |
| properties.json | object properties validation | 6 | ✅ | 50.2M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.7M | ✅ | 2.1M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.0M | ✅ | 401K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.2M | ✅ | 894K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.5M | ✅ | 5.7M | 🟢 **-85%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 6.2M | 🟢 **-69%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 67.2M | 🟢 **-28%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.1M | ✅ | 6.1M | 🟢 **-88%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 5.3M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 4.2M | 🟢 **-90%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 4.5M | 🔴 **+53%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.7M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.0M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.1M | ✅ | 6.4M | 🟢 **-89%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.4M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 36.2M | ✅ | 3.7M | 🟢 **-90%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.2M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.4M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 102.6M | +14% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 3.7M | 🟢 **-94%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.2M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.5M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 48.8M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.3M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 7.1M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.4M | ✅ | 4.7M | 🟢 **-93%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.5M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 44.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 44.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.8M | ✅ | 9.9M | 🟢 **-85%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 104.5M | +16% |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 95.7M | +6% |
| required.json | required with escaped characters | 2 | ✅ | 52.6M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 66.7M | ✅ | 8.8M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 10.2M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 69.0M | ✅ | 10.1M | 🟢 **-85%** |
| type.json | object type matches objects | 7 | ✅ | 58.3M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 8.0M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.8M | ✅ | 8.6M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 7.8M | 🟢 **-88%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 9.4M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 13.1M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 11.1M | 🟢 **-85%** |
| type.json | type: array, object or null | 5 | ✅ | 77.1M | ✅ | 15.8M | 🟢 **-80%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.8M | ✅ | 108.5M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 78.4M | +11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.9M | ✅ | 88.1M | +12% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.8M | ✅ | 95.9M | +17% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 97.1M | 🔴 **+360%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 59.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 51.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 74.6M | ✅ | 120.5M | 🔴 **+62%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 84.7M | +12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 88.8M | 🔴 **+53%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.5M | ✅ | 3.5M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 3.6M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.3M | ✅ | 3.5M | 🟢 **-89%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.8M | ✅ | 3.4M | 🟢 **-90%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.5M | ✅ | 3.5M | 🟢 **-89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.3M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 76.4M | ✅ | 119.7M | 🔴 **+57%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 83.8M | 🔴 **+60%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.0M | ✅ | 5.0M | 🟢 **-84%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ✅ | 5.3M | 🟢 **-72%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 56.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 13.0M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 103.5M | +17% |
| optional/bignum.json | string | 1 | ✅ | 61.7M | ✅ | 6.7M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.5M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 4.7M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.2M | 🔴 **+24%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.4M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 71.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.6M | ✅ | 4.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 95.6M | ✅ | 7.4M | 🟢 **-92%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.7M | ✅ | 1.7M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.6M | ✅ | 1.9M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.1M | ✅ | 2.9M | 🟢 **-95%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ✅ | 1.8M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.5M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.5M | ✅ | 7.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 11.7M | 🟢 **-56%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 9.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 8.9M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 16.1M | 🟢 **-38%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 6.2M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.1M | ✅ | 5.5M | 🟢 **-63%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 5.7M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 7.2M | 🟢 **-74%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 5.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ✅ | 5.8M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 4.2M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.4M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.1M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.2M | ✅ | 110.0M | +14% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.9M | ✅ | 14.7M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.3M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.2M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.7M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 7.0M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.0M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.2M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | djv | djv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 41.6M | ✅ | 15.6M | 🟢 **-62%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 7.3M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 8.2M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.4M | ✅ | 6.8M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 103.0M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.8M | ✅ | 3.5M | 🟢 **-88%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 61.3M | -12% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.9M | ✅ | 6.2M | 🟢 **-76%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.0M | ✅ | 4.2M | 🟢 **-86%** |
| allOf.json | allOf | 4 | ✅ | 39.9M | ✅ | 1.5M | 🟢 **-96%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 1.5M | 🟢 **-95%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.7M | ✅ | 6.3M | 🟢 **-91%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 103.3M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 3.6M | 🟢 **-96%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 104.0M | 🔴 **+28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.4M | ✅ | 103.8M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 7.0M | 🟢 **-94%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 4.7M | 🟢 **-94%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 3.3M | 🟢 **-96%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 76.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 52.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 80.2M | ✅ | 6.4M | 🟢 **-92%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.2M | ✅ | 3.5M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 104.1M | +16% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 90.0M | ✅ | 104.4M | +16% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 2.5M | 🟢 **-96%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 52.5M | ✅ | 1.5M | 🟢 **-97%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 12.7M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 4.8M | 🟢 **-94%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 103.0M | 🔴 **+31%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.0M | ✅ | 7.0M | 🟢 **-88%** |
| const.json | const validation | 3 | ✅ | 67.1M | ✅ | 6.9M | 🟢 **-90%** |
| const.json | const with object | 4 | ✅ | 41.2M | ✅ | 1.6M | 🟢 **-96%** |
| const.json | const with array | 3 | ✅ | 58.6M | ✅ | 2.7M | 🟢 **-95%** |
| const.json | const with null | 2 | ✅ | 76.9M | ✅ | 4.1M | 🟢 **-95%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ✅ | 5.3M | 🟢 **-93%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.2M | ✅ | 3.0M | 🟢 **-96%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 4.3M | 🟢 **-93%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ✅ | 3.3M | 🟢 **-95%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.7M | ✅ | 1.8M | 🟢 **-97%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 63.1M | ✅ | 10.8M | 🟢 **-83%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ✅ | 6.2M | 🟢 **-91%** |
| contains.json | items + contains | 4 | ✅ | 42.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 11.0M | 🟢 **-84%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 90.6M | +17% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.1M | ✅ | 117.0M | 🔴 **+22%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 96.1M | ✅ | 116.8M | 🔴 **+22%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 86.3M | ✅ | 99.1M | +15% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 76.5M | ✅ | 119.4M | 🔴 **+56%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 3.5M | 🟢 **-95%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 2.8M | 🟢 **-95%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 57.2M | ✅ | 1.8M | 🟢 **-97%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.9M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 116.5M | 🔴 **+21%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.4M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 6.1M | 🟢 **-92%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.8M | ✅ | 1.3M | 🟢 **-97%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 4.6M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 1.6M | 🟢 **-89%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.0M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 65.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.9M | ✅ | 3.9M | 🟢 **-94%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.2M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 4.3M | 🟢 **-93%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.2M | ✅ | 8.7M | 🟢 **-88%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ✅ | 8.6M | 🟢 **-88%** |
| format.json | email format | 7 | ✅ | 88.5M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 95.7M | ✅ | 119.2M | 🔴 **+25%** |
| format.json | regex format | 7 | ✅ | 78.4M | ✅ | 23.3M | 🟢 **-70%** |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.5M | ✅ | 118.7M | 🔴 **+51%** |
| format.json | hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.4M | ✅ | 101.6M | 🔴 **+30%** |
| format.json | date-time format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 78.3M | ✅ | 118.1M | 🔴 **+51%** |
| format.json | json-pointer format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 76.1M | ✅ | 104.6M | 🔴 **+37%** |
| format.json | iri format | 7 | ✅ | 76.8M | ✅ | 111.1M | 🔴 **+45%** |
| format.json | iri-reference format | 7 | ✅ | 77.8M | ✅ | 98.7M | 🔴 **+27%** |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 72.5M | ✅ | 117.6M | 🔴 **+62%** |
| format.json | duration format | 7 | ✅ | 78.3M | ✅ | 101.0M | 🔴 **+29%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.1M | ✅ | 112.5M | 🔴 **+34%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 65.4M | ✅ | 113.1M | 🔴 **+73%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 83.8M | ✅ | 113.5M | 🔴 **+35%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 75.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 94.8M | +13% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.8M | ✅ | 1.8M | 🟢 **-96%** |
| items.json | a schema given for items | 4 | ✅ | 51.8M | ✅ | 12.8M | 🟢 **-75%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.8M | ✅ | 95.7M | +2% |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 6.9M | 🟢 **-90%** |
| items.json | items and subitems | 6 | ✅ | 12.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.0M | ✅ | 3.3M | 🟢 **-70%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 79.8M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.1M | ✅ | 6.6M | 🟢 **-86%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.5M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.0M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 87.6M | +16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.1M | ✅ | 114.5M | 🔴 **+23%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.4M | ✅ | 19.6M | 🟢 **-74%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 10.8M | 🟢 **-85%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.2M | ✅ | 21.1M | 🟢 **-66%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.4M | ✅ | 10.4M | 🟢 **-82%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 24.3M | 🟢 **-58%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.2M | ✅ | 9.8M | 🟢 **-77%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.3M | ✅ | 9.9M | 🟢 **-80%** |
| maximum.json | maximum validation | 4 | ✅ | 67.5M | ✅ | 18.4M | 🟢 **-73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.0M | ✅ | 20.4M | 🟢 **-73%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.1M | ✅ | 104.8M | +13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.0M | ✅ | 7.2M | 🟢 **-89%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 56.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.6M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 52.1M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 47.8M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 33.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 20.1M | 🟢 **-75%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 11.1M | 🟢 **-85%** |
| minLength.json | minLength validation | 5 | ✅ | 29.7M | ✅ | 12.2M | 🟢 **-59%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.4M | ✅ | 10.3M | 🟢 **-80%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.2M | ✅ | 24.2M | 🟢 **-59%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.7M | ✅ | 9.6M | 🟢 **-81%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 18.6M | 🟢 **-76%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 17.5M | 🟢 **-76%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 12.8M | 🟢 **-84%** |
| multipleOf.json | by number | 3 | ✅ | 72.5M | ✅ | 14.2M | 🟢 **-80%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 10.0M | 🟢 **-85%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 5.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 19.8M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 76.6M | ✅ | 6.9M | 🟢 **-91%** |
| not.json | not multiple types | 3 | ✅ | 68.6M | ✅ | 7.0M | 🟢 **-90%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 2.7M | 🟢 **-96%** |
| not.json | forbidden property | 2 | ✅ | 52.4M | ✅ | 2.9M | 🟢 **-95%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.7M | ✅ | 7.1M | 🟢 **-88%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 72.7M | ✅ | 7.2M | 🟢 **-90%** |
| not.json | double negation | 1 | ✅ | 89.8M | ✅ | 7.0M | 🟢 **-92%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 4.0M | 🟢 **-94%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.6M | ✅ | 5.7M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 5.8M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 3.3M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 3.3M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 1.1M | 🟢 **-97%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 6.3M | 🟢 **-92%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ✅ | 1.3M | 🟢 **-97%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.8M | ✅ | 1.6M | 🟢 **-97%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 4.6M | 🟢 **-94%** |
| pattern.json | pattern validation | 8 | ✅ | 54.5M | ✅ | 27.2M | 🟢 **-50%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.0M | ✅ | 31.6M | 🔴 **+31%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.2M | ✅ | 9.3M | 🟢 **-64%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ✅ | 5.1M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.5M | ✅ | 5.1M | 🟢 **-69%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 4.6M | 🟢 **-78%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 22.6M | 🔴 **+25%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.0M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.9M | ✅ | 104.1M | 🔴 **+29%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 97.9M | 🔴 **+21%** |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 1.7M | 🟢 **-91%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.1M | ✅ | 2.0M | 🟢 **-96%** |
| properties.json | properties with escaped characters | 2 | ✅ | 50.9M | ✅ | 399K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 3.5M | 🟢 **-95%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ✅ | 899K | 🟢 **-97%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.6M | ✅ | 5.6M | 🟢 **-86%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 6.3M | 🟢 **-68%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.8M | ✅ | 65.6M | 🟢 **-30%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.2M | ✅ | 6.2M | 🟢 **-87%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 5.5M | 🟢 **-87%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 4.2M | 🟢 **-90%** |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 1.6M | 🟢 **-94%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.5M | ✅ | 1.6M | 🟢 **-97%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 1.2M | 🟢 **-97%** |
| ref.json | nested refs | 2 | ✅ | 39.9M | ✅ | 3.7M | 🟢 **-91%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.9M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 55.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 101.2M | +13% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 3.6M | 🟢 **-95%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.5M | ✅ | 1.7M | 🟢 **-97%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.2M | ✅ | 2.3M | 🟢 **-96%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 85.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 1.6M | 🟢 **-96%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.1M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.7M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.0M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 51.1M | ✅ | 2.1M | 🟢 **-96%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.1M | ✅ | 2.0M | 🟢 **-96%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 6.9M | 🟢 **-91%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 7.0M | 🟢 **-91%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 4.7M | 🟢 **-93%** |
| refRemote.json | remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.3M | ✅ | 10.2M | 🟢 **-84%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 103.5M | +15% |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 94.8M | +5% |
| required.json | required with escaped characters | 2 | ✅ | 52.8M | ✅ | 1.1M | 🟢 **-98%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ✅ | 3.0M | 🟢 **-89%** |
| type.json | integer type matches integers | 9 | ✅ | 66.9M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | number type matches numbers | 9 | ✅ | 69.2M | ✅ | 10.2M | 🟢 **-85%** |
| type.json | string type matches strings | 9 | ✅ | 68.7M | ✅ | 9.9M | 🟢 **-86%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 8.1M | 🟢 **-86%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 8.0M | 🟢 **-88%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.7M | ✅ | 8.7M | 🟢 **-87%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 7.6M | 🟢 **-89%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 9.1M | 🟢 **-86%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 12.7M | 🟢 **-83%** |
| type.json | type: array or object | 5 | ✅ | 54.9M | ✅ | 11.0M | 🟢 **-80%** |
| type.json | type: array, object or null | 5 | ✅ | 76.9M | ✅ | 15.7M | 🟢 **-80%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.9M | ✅ | 102.1M | 🔴 **+23%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.3M | ✅ | 78.1M | +11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 55.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.8M | ✅ | 91.8M | +17% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 46.0M | ✅ | 6.8M | 🟢 **-85%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 53.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.7M | ✅ | 99.5M | 🔴 **+22%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 109.8M | 🔴 **+418%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ✅ | 118.6M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 84.7M | +12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 112.1M | 🔴 **+93%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.9M | ✅ | 114.6M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 31.5M | ✅ | 6.6M | 🟢 **-79%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 3.3M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 3.4M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 3.5M | 🟢 **-88%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 1.7M | 🟢 **-92%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 76.4M | ✅ | 119.4M | 🔴 **+56%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.4M | ✅ | 83.9M | 🔴 **+60%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.1M | ✅ | 5.3M | 🟢 **-83%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.7M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 12.9M | 🟢 **-83%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 15.0M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.8M | ✅ | 88.2M | -1% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 6.8M | 🟢 **-89%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 98.2M | 🔴 **+24%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.8M | ✅ | 4.8M | 🟢 **-92%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 97.7M | 🔴 **+24%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 4.8M | 🟢 **-92%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ✅ | 4.4M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 7.2M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.6M | ✅ | 2.5M | 🟢 **-93%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ✅ | 1.6M | 🟢 **-97%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 54.2M | ✅ | 1.9M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.1M | ✅ | 2.7M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.9M | ✅ | 1.8M | 🟢 **-96%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.9M | ✅ | 9.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 9.1M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.3M | ✅ | 9.1M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.4M | ✅ | 8.8M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 7.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 11.8M | 🟢 **-55%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.7M | ✅ | 8.9M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.6M | ✅ | 9.1M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 16.5M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 6.3M | 🟢 **-79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 5.4M | 🟢 **-65%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 5.9M | 🟢 **-62%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 7.2M | 🟢 **-75%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 5.3M | 🟢 **-74%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 5.8M | 🟢 **-71%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 5.5M | ✅ | 4.2M | 🟢 **-24%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 42.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 118.8M | 🔴 **+24%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.0M | ✅ | 6.4M | 🟢 **-74%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ✅ | 6.5M | 🟢 **-65%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.0M | ✅ | 14.7M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.0M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 51.5M | ✅ | 2.0M | 🟢 **-96%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.2M | ✅ | 1.6M | 🟢 **-97%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 7.1M | 🟢 **-91%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.6M | ✅ | 1.6M | 🟢 **-97%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |
