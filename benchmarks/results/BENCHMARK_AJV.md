# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.9M | 172/199 | 13.6M | 172 | 🟢 **-50%** |
| draft6 | 276 | ✅ 276 | 28.5M | 269/276 | 15.1M | 269 | 🟢 **-47%** |
| draft7 | 313 | ✅ 313 | 14.8M | 296/313 | 13.1M | 296 | -11% |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 413/435 | 6.6M | 413 | 🟢 **-66%** |
| draft2020-12 | 448 | ✅ 448 | 18.6M | 398/448 | 6.4M | 398 | 🟢 **-65%** |
| **Total** | 1671 | 1670/1671 | 19.5M | 1548/1671 | 8.8M | 1548 | 🟢 **-55%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.88x faster** (39 ns vs 113 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 47.5M | ✅ | 7.2M | 🟢 **-85%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.7M | ✅ | 70.4M | 🟢 **-22%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 129.0M | ✅ | 49.8M | 🟢 **-61%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 94.4M | ✅ | 68.6M | 🟢 **-27%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 132.2M | ✅ | 66.5M | 🟢 **-50%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ✅ | 28.8M | -17% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.8M | ✅ | 36.2M | 🟢 **-21%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.9M | ✅ | 48.2M | 🟢 **-34%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 166.2M | ✅ | 69.0M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.9M | ✅ | 30.8M | -17% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.4M | ✅ | 23.2M | +14% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.8M | ✅ | 17.2M | 🟢 **-47%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.5M | ✅ | 13.1M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 89.9M | ✅ | 74.1M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.4M | ✅ | 8.1M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 46.7M | -11% |
| allOf.json | allOf | 4 | ✅ | 39.2M | ✅ | 32.4M | -17% |
| allOf.json | allOf with base schema | 5 | ✅ | 24.2M | ✅ | 24.3M | +0% |
| allOf.json | allOf simple types | 2 | ✅ | 122.9M | ✅ | 50.9M | 🟢 **-59%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.4M | ✅ | 73.6M | -18% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.1M | ✅ | 69.4M | 🟢 **-58%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.4M | ✅ | 48.4M | 🟢 **-37%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 125.4M | ✅ | 50.6M | 🟢 **-60%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 75.5M | ✅ | 50.8M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.6M | ✅ | 9.7M | 🟢 **-88%** |
| anyOf.json | anyOf | 4 | ✅ | 78.7M | ✅ | 26.1M | 🟢 **-67%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ✅ | 20.2M | 🟢 **-57%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.9M | ✅ | 33.3M | 🟢 **-36%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 176.3M | ✅ | 68.4M | 🟢 **-61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.2M | ✅ | 27.8M | 🟢 **-64%** |
| default.json | invalid type for default | 2 | ✅ | 104.8M | ✅ | 57.7M | 🟢 **-45%** |
| default.json | invalid string value for default | 2 | ✅ | 53.8M | ✅ | 49.3M | -8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 67.8M | ✅ | 44.6M | 🟢 **-34%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ✅ | 42.7M | 🟢 **-53%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.0M | ✅ | 33.3M | +7% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 49.1M | ✅ | 39.2M | 🟢 **-20%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 12.0M | ✅ | 21.4M | 🔴 **+78%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 40.9M | ✅ | 38.6M | -6% |
| enum.json | simple enum validation | 2 | ✅ | 75.5M | ✅ | 48.5M | 🟢 **-36%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 17.8M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.6M | ✅ | 42.5M | 🟢 **-38%** |
| enum.json | enums in properties | 6 | ✅ | 15.1M | ✅ | 33.1M | 🔴 **+119%** |
| enum.json | enum with escaped characters | 3 | ✅ | 58.1M | ✅ | 44.2M | 🟢 **-24%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 119.7M | ✅ | 39.4M | 🟢 **-67%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.0M | ✅ | 14.2M | 🟢 **-74%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 117.7M | ✅ | 38.1M | 🟢 **-68%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ✅ | 26.3M | 🟢 **-53%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 45.1M | 🟢 **-61%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.6M | ✅ | 27.9M | 🟢 **-56%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 110.1M | ✅ | 43.9M | 🟢 **-60%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.7M | ✅ | 28.5M | 🟢 **-55%** |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 45.2M | 🟢 **-53%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ✅ | 44.3M | -12% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 89.7M | ✅ | 45.5M | 🟢 **-49%** |
| format.json | email format | 6 | ✅ | 81.6M | ✅ | 55.2M | 🟢 **-32%** |
| format.json | ipv4 format | 6 | ✅ | 152.6M | ✅ | 55.8M | 🟢 **-63%** |
| format.json | ipv6 format | 6 | ✅ | 90.4M | ✅ | 55.3M | 🟢 **-39%** |
| format.json | hostname format | 6 | ✅ | 156.0M | ✅ | 54.9M | 🟢 **-65%** |
| format.json | date-time format | 6 | ✅ | 81.4M | ✅ | 54.9M | 🟢 **-33%** |
| format.json | uri format | 6 | ✅ | 157.7M | ✅ | 54.8M | 🟢 **-65%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.0M | ✅ | 34.8M | -1% |
| items.json | a schema given for items | 4 | ✅ | 64.8M | ✅ | 43.5M | 🟢 **-33%** |
| items.json | an array of schemas for items | 6 | ✅ | 53.6M | ✅ | 49.0M | -9% |
| items.json | items and subitems | 6 | ✅ | 27.8M | ✅ | 21.7M | 🟢 **-22%** |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 11.6M | -6% |
| items.json | items with null instance elements | 1 | ✅ | 77.5M | ✅ | 49.4M | 🟢 **-36%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 81.0M | ✅ | 67.9M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 67.5M | ✅ | 33.1M | 🟢 **-51%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 46.9M | -19% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 43.1M | 🟢 **-26%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.0M | ✅ | 35.7M | -17% |
| maximum.json | maximum validation | 4 | ✅ | 69.4M | ✅ | 46.2M | 🟢 **-33%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.8M | ✅ | 35.0M | 🟢 **-48%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 71.3M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 69.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.6M | ✅ | 36.6M | 🟢 **-47%** |
| minLength.json | minLength validation | 5 | ✅ | 53.7M | ✅ | 36.2M | 🟢 **-33%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.5M | ✅ | 41.5M | 🟢 **-25%** |
| minimum.json | minimum validation | 4 | ✅ | 76.6M | ✅ | 46.7M | 🟢 **-39%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.2M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 68.6M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.7M | ✅ | 47.6M | 🟢 **-34%** |
| multipleOf.json | by int | 3 | ✅ | 78.5M | ✅ | 43.8M | 🟢 **-44%** |
| multipleOf.json | by number | 3 | ✅ | 72.8M | ✅ | 41.4M | 🟢 **-43%** |
| multipleOf.json | by small number | 2 | ✅ | 61.4M | ✅ | 41.3M | 🟢 **-33%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 8.6M | 🟢 **-84%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 70.3M | ✅ | 8.7M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 77.4M | ✅ | 39.4M | 🟢 **-49%** |
| not.json | not multiple types | 3 | ✅ | 70.8M | ✅ | 29.3M | 🟢 **-59%** |
| not.json | not more complex schema | 3 | ✅ | 70.1M | ✅ | 37.2M | 🟢 **-47%** |
| not.json | forbidden property | 2 | ✅ | 41.3M | ✅ | 38.8M | -6% |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.6M | ✅ | 38.5M | 🟢 **-39%** |
| not.json | double negation | 1 | ✅ | 88.9M | ✅ | 73.7M | -17% |
| oneOf.json | oneOf | 4 | ✅ | 69.7M | ✅ | 21.8M | 🟢 **-69%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 26.5M | 🟢 **-23%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 21.1M | 🟢 **-52%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.5M | ✅ | 36.7M | 🟢 **-51%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.0M | ✅ | 21.4M | 🟢 **-54%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.4M | ✅ | 22.1M | 🟢 **-53%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 75.0M | ✅ | 24.2M | 🟢 **-68%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 44.9M | -19% |
| pattern.json | pattern is not anchored | 1 | ✅ | 15.7M | ✅ | 30.9M | 🔴 **+97%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ✅ | 13.7M | 🟢 **-44%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 7.6M | 🟢 **-45%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 7.9M | 🟢 **-46%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.2M | ✅ | 21.6M | +12% |
| properties.json | object properties validation | 6 | ✅ | 47.2M | ✅ | 45.1M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.9M | ✅ | 10.0M | 🟢 **-41%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.2M | ✅ | 41.7M | -3% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 71.0M | ✅ | 60.0M | -15% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.0M | ✅ | 21.6M | -6% |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.9M | ✅ | 43.9M | -2% |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.2M | ✅ | 44.9M | -7% |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ✅ | 39.7M | -2% |
| ref.json | nested refs | 2 | ✅ | 28.6M | ✅ | 48.0M | 🔴 **+68%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 76.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 19.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.9M | ✅ | 44.1M | +3% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 43.4M | +2% |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.2M | ✅ | 43.1M | -7% |
| ref.json | Location-independent identifier | 2 | ✅ | 76.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 36.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.3M | ✅ | 17.0M | 🟢 **-70%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 41.3M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 75.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 75.5M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.5M | ✅ | 50.6M | 🟢 **-27%** |
| refRemote.json | remote ref | 2 | ✅ | 34.8M | ✅ | 47.9M | 🔴 **+38%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 31.6M | ✅ | 47.3M | 🔴 **+50%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.2M | ✅ | 44.7M | 🔴 **+35%** |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 49.2M | -18% |
| required.json | required default validation | 1 | ✅ | 90.2M | ✅ | 74.8M | -17% |
| required.json | required with escaped characters | 2 | ✅ | 43.8M | ✅ | 38.7M | -12% |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 59.3M | ✅ | 36.8M | 🟢 **-38%** |
| type.json | number type matches numbers | 9 | ✅ | 68.0M | ✅ | 43.6M | 🟢 **-36%** |
| type.json | string type matches strings | 9 | ✅ | 66.2M | ✅ | 45.9M | 🟢 **-31%** |
| type.json | object type matches objects | 7 | ✅ | 57.7M | ✅ | 34.8M | 🟢 **-40%** |
| type.json | array type matches arrays | 7 | ✅ | 62.0M | ✅ | 40.7M | 🟢 **-34%** |
| type.json | boolean type matches booleans | 10 | ✅ | 65.3M | ✅ | 44.3M | 🟢 **-32%** |
| type.json | null type matches only the null object | 10 | ✅ | 64.1M | ✅ | 36.3M | 🟢 **-43%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 38.5M | 🟢 **-39%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 42.5M | 🟢 **-45%** |
| type.json | type: array or object | 5 | ✅ | 70.7M | ✅ | 41.6M | 🟢 **-41%** |
| type.json | type: array, object or null | 5 | ✅ | 76.3M | ✅ | 44.5M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 15.8M | ✅ | 10.6M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ✅ | 23.0M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ✅ | 26.7M | 🔴 **+36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.4M | ✅ | 54.5M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 67.8M | ✅ | 54.3M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 71.9M | ✅ | 43.3M | 🟢 **-40%** |
| optional/bignum.json | integer | 2 | ✅ | 83.6M | ✅ | 14.2M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 87.7M | ✅ | 68.8M | 🟢 **-22%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 38.0M | 🟢 **-40%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 79.8M | ✅ | 67.8M | -15% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 61.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 79.8M | ✅ | 68.0M | -15% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 61.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.4M | ✅ | 27.8M | -2% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.8M | ✅ | 27.5M | -8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 27.5M | -4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.9M | ✅ | 27.7M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 27.7M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.2M | ✅ | 29.2M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.2M | ✅ | 27.6M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 27.8M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 29.8M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.0M | ✅ | 27.0M | -13% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.7M | ✅ | 17.7M | +0% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.3M | ✅ | 13.5M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 14.5M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 26.7M | -5% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ✅ | 22.7M | +5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.2M | ✅ | 23.1M | +9% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.0M | ✅ | 21.1M | +17% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 21.2M | 🔴 **+37%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 9.2M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 9.0M | +3% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 21.9M | 🔴 **+24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ✅ | 31.0M | -16% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ✅ | 2.8M | 🟢 **-78%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.2M | ✅ | 54.1M | 🟢 **-33%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ✅ | 4.3M | 🟢 **-39%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 31.6M | ✅ | 24.4M | 🟢 **-23%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.7M | ✅ | 8.1M | 🟢 **-49%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.3M | -2% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 33.9M | -8% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.2M | ✅ | 74.5M | 🟢 **-51%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.7M | ✅ | 49.3M | 🟢 **-32%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ✅ | 68.9M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 66.0M | -10% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ✅ | 8.4M | 🟢 **-85%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.1M | ✅ | 38.3M | -9% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 49.4M | 🟢 **-54%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 74.5M | +1% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.2M | ✅ | 33.4M | 🟢 **-26%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.5M | ✅ | 22.2M | +3% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 17.2M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.9M | ✅ | 13.6M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 74.4M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.0M | ✅ | 8.3M | 🟢 **-69%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.1M | ✅ | 45.1M | 🟢 **-35%** |
| allOf.json | allOf | 4 | ✅ | 38.0M | ✅ | 33.7M | -11% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 23.5M | 🟢 **-23%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ✅ | 49.5M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 73.4M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ✅ | 40.7M | 🟢 **-33%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 40.9M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 74.6M | +2% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 74.3M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.6M | ✅ | 48.8M | 🟢 **-30%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 50.2M | 🟢 **-57%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 50.8M | 🟢 **-28%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 5.0M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 72.0M | ✅ | 27.3M | 🟢 **-62%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 20.2M | 🟢 **-56%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.6M | ✅ | 74.0M | -8% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 113.9M | ✅ | 74.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ✅ | 21.7M | 🟢 **-64%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 65.4M | ✅ | 32.9M | 🟢 **-50%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.9M | ✅ | 68.7M | -9% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 27.2M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 55.9M | 🟢 **-29%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.5M | ✅ | 32.5M | 🟢 **-64%** |
| const.json | const validation | 3 | ✅ | 54.6M | ✅ | 40.6M | 🟢 **-26%** |
| const.json | const with object | 4 | ✅ | 49.7M | ✅ | 15.2M | 🟢 **-69%** |
| const.json | const with array | 3 | ✅ | 53.1M | ✅ | 15.9M | 🟢 **-70%** |
| const.json | const with null | 2 | ✅ | 119.3M | ✅ | 48.6M | 🟢 **-59%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.4M | ✅ | 40.1M | 🟢 **-39%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 39.6M | 🟢 **-65%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.7M | ✅ | 26.9M | 🟢 **-55%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 23.5M | 🟢 **-75%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.0M | ✅ | 12.6M | 🟢 **-75%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 12.7M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.1M | ✅ | 43.8M | 🟢 **-23%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 44.4M | 🟢 **-60%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.7M | ✅ | 41.6M | 🟢 **-31%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 112.8M | ✅ | 41.9M | 🟢 **-63%** |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 41.2M | 🟢 **-31%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 39.4M | 🟢 **-50%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.0M | ✅ | 46.9M | -6% |
| contains.json | contains keyword validation | 6 | ✅ | 89.2M | ✅ | 8.2M | 🟢 **-91%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.9M | ✅ | 13.8M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ✅ | 41.3M | 🟢 **-61%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 55.4M | ✅ | 32.6M | 🟢 **-41%** |
| contains.json | items + contains | 4 | ✅ | 51.5M | ✅ | 7.1M | 🟢 **-86%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 66.2M | -6% |
| default.json | invalid type for default | 2 | ✅ | 107.4M | ✅ | 30.8M | 🟢 **-71%** |
| default.json | invalid string value for default | 2 | ✅ | 49.6M | ✅ | 49.7M | +0% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.3M | ✅ | 27.6M | 🟢 **-63%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.1M | ✅ | 1.5M | 🟢 **-85%** |
| dependencies.json | dependencies | 7 | ✅ | 90.3M | ✅ | 49.4M | 🟢 **-45%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 85.0M | ✅ | 66.4M | 🟢 **-22%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 38.0M | ✅ | 34.8M | -9% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.6M | ✅ | 37.8M | -13% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 40.2M | ✅ | 24.1M | 🟢 **-40%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.9M | ✅ | 22.2M | 🔴 **+50%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 24.5M | ✅ | 37.6M | 🔴 **+54%** |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 42.1M | 🟢 **-39%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 10.8M | 🟢 **-82%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 48.6M | 🟢 **-29%** |
| enum.json | enums in properties | 6 | ✅ | 15.7M | ✅ | 36.7M | 🔴 **+134%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 50.7M | 🟢 **-30%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.6M | ✅ | 39.6M | 🟢 **-65%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.1M | ✅ | 21.1M | 🟢 **-64%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 104.8M | ✅ | 41.8M | 🟢 **-60%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.2M | ✅ | 20.2M | 🟢 **-62%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 102.9M | ✅ | 51.3M | 🟢 **-50%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 55.6M | ✅ | 23.2M | 🟢 **-58%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 46.0M | 🟢 **-59%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.3M | ✅ | 23.8M | 🟢 **-60%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.2M | ✅ | 46.2M | 🟢 **-49%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 30.4M | ✅ | 41.9M | 🔴 **+38%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.4M | ✅ | 40.6M | 🟢 **-63%** |
| format.json | email format | 6 | ✅ | 75.6M | ✅ | 55.7M | 🟢 **-26%** |
| format.json | ipv4 format | 6 | ✅ | 155.5M | ✅ | 60.4M | 🟢 **-61%** |
| format.json | ipv6 format | 6 | ✅ | 75.1M | ✅ | 60.4M | -19% |
| format.json | hostname format | 6 | ✅ | 157.9M | ✅ | 55.9M | 🟢 **-65%** |
| format.json | date-time format | 6 | ✅ | 82.0M | ✅ | 54.2M | 🟢 **-34%** |
| format.json | json-pointer format | 6 | ✅ | 160.8M | ✅ | 55.7M | 🟢 **-65%** |
| format.json | uri format | 6 | ✅ | 81.1M | ✅ | 55.7M | 🟢 **-31%** |
| format.json | uri-reference format | 6 | ✅ | 154.4M | ✅ | 56.0M | 🟢 **-64%** |
| format.json | uri-template format | 6 | ✅ | 81.4M | ✅ | 59.9M | 🟢 **-26%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.6M | ✅ | 37.8M | 🟢 **-34%** |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ✅ | 43.7M | -14% |
| items.json | an array of schemas for items | 6 | ✅ | 107.8M | ✅ | 49.3M | 🟢 **-54%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.6M | ✅ | 69.2M | -17% |
| items.json | items with boolean schema (false) | 2 | ✅ | 131.5M | ✅ | 43.6M | 🟢 **-67%** |
| items.json | items with boolean schemas | 3 | ✅ | 59.8M | ✅ | 44.3M | 🟢 **-26%** |
| items.json | items and subitems | 6 | ✅ | 18.2M | ✅ | 22.0M | 🔴 **+21%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 12.9M | +7% |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 51.4M | 🟢 **-25%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.5M | ✅ | 68.7M | -7% |
| maxItems.json | maxItems validation | 4 | ✅ | 71.4M | ✅ | 47.5M | 🟢 **-34%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 49.3M | 🟢 **-26%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.3M | ✅ | 47.5M | -13% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 43.8M | -17% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 41.8M | 🟢 **-22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.0M | ✅ | 31.3M | 🟢 **-30%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.8M | ✅ | 34.4M | 🟢 **-23%** |
| maximum.json | maximum validation | 4 | ✅ | 70.0M | ✅ | 47.5M | 🟢 **-32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.3M | ✅ | 47.6M | 🟢 **-30%** |
| minItems.json | minItems validation | 4 | ✅ | 70.8M | ✅ | 48.1M | 🟢 **-32%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 48.9M | 🟢 **-26%** |
| minLength.json | minLength validation | 5 | ✅ | 53.6M | ✅ | 44.4M | -17% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ✅ | 44.3M | -16% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 42.3M | 🟢 **-24%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.4M | ✅ | 31.4M | 🟢 **-34%** |
| minimum.json | minimum validation | 4 | ✅ | 68.5M | ✅ | 47.1M | 🟢 **-31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 47.2M | 🟢 **-28%** |
| multipleOf.json | by int | 3 | ✅ | 70.6M | ✅ | 43.6M | 🟢 **-38%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 42.1M | 🟢 **-37%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 39.1M | 🟢 **-37%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 8.8M | 🟢 **-84%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 9.2M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 70.0M | ✅ | 43.2M | 🟢 **-38%** |
| not.json | not multiple types | 3 | ✅ | 64.8M | ✅ | 38.1M | 🟢 **-41%** |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 39.6M | 🟢 **-35%** |
| not.json | forbidden property | 2 | ✅ | 49.7M | ✅ | 42.5M | -14% |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 39.6M | 🟢 **-32%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.9M | ✅ | 32.4M | 🟢 **-44%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.4M | ✅ | 54.8M | 🟢 **-32%** |
| not.json | double negation | 1 | ✅ | 80.7M | ✅ | 73.8M | -9% |
| oneOf.json | oneOf | 4 | ✅ | 62.0M | ✅ | 21.8M | 🟢 **-65%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.2M | ✅ | 24.6M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 37.1M | 🟢 **-39%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 78.5M | ✅ | 29.1M | 🟢 **-63%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ✅ | 36.1M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 18.9M | 🟢 **-69%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.2M | ✅ | 22.8M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.3M | ✅ | 36.8M | 🟢 **-46%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.1M | ✅ | 16.6M | 🟢 **-63%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.7M | ✅ | 22.0M | 🟢 **-53%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ✅ | 27.9M | 🟢 **-60%** |
| pattern.json | pattern validation | 8 | ✅ | 52.0M | ✅ | 44.4M | -15% |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 31.0M | 🔴 **+120%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.3M | ✅ | 12.9M | 🟢 **-51%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 7.4M | 🟢 **-50%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 8.4M | 🟢 **-47%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.5M | ✅ | 8.6M | 🟢 **-56%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 21.5M | 🔴 **+21%** |
| properties.json | object properties validation | 6 | ✅ | 52.2M | ✅ | 44.5M | -15% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 10.1M | 🟢 **-48%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.0M | ✅ | 40.7M | -11% |
| properties.json | properties with escaped characters | 2 | ✅ | 48.2M | ✅ | 43.7M | -9% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 59.0M | -8% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ✅ | 32.6M | -16% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 16.2M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.5M | ✅ | 68.5M | -18% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ✅ | 28.3M | 🟢 **-41%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.0M | ✅ | 31.6M | -17% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ✅ | 33.4M | -18% |
| ref.json | root pointer ref | 4 | ✅ | 24.5M | ✅ | 20.4M | -17% |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.6M | ✅ | 42.6M | -12% |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 45.1M | -14% |
| ref.json | escaped pointer ref | 6 | ✅ | 44.0M | ✅ | 39.0M | -11% |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 47.9M | 🔴 **+29%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.5M | ✅ | 4.7M | 🟢 **-80%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.7M | ✅ | 43.9M | -12% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.8M | ✅ | 43.9M | -10% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ✅ | 73.8M | -9% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ✅ | 40.8M | 🟢 **-33%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 7.5M | -11% |
| ref.json | refs with quote | 2 | ✅ | 49.3M | ✅ | 43.7M | -11% |
| ref.json | Location-independent identifier | 2 | ✅ | 48.0M | ✅ | 46.3M | -4% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 48.4M | ✅ | 49.2M | +2% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.5M | ✅ | 49.7M | +7% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.1M | ✅ | 14.1M | 🟢 **-73%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.9M | ✅ | 31.3M | -5% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.2M | ✅ | 33.3M | +3% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.1M | ✅ | 23.7M | 🟢 **-41%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.8M | ✅ | 43.7M | -14% |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.3M | ✅ | 43.5M | -14% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.0M | ✅ | 43.5M | -5% |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.3M | ✅ | 43.9M | -13% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.7M | ✅ | 43.7M | -4% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.2M | ✅ | 43.4M | +14% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.3M | ✅ | 44.7M | +3% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 49.6M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 49.7M | 🟢 **-29%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.5M | ✅ | 50.5M | 🟢 **-22%** |
| refRemote.json | remote ref | 2 | ✅ | 47.4M | ✅ | 48.3M | +2% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.4M | ✅ | 49.7M | +5% |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.2M | ✅ | 50.0M | +8% |
| refRemote.json | base URI change | 2 | ✅ | 28.3M | ✅ | 27.9M | -2% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ✅ | 27.5M | -14% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.5M | ✅ | 27.7M | 🟢 **-26%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ✅ | 11.4M | 🟢 **-64%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.5M | ✅ | 32.6M | -19% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.5M | ✅ | 42.0M | +12% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.3M | ✅ | 29.7M | 🟢 **-32%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.9M | ✅ | 42.7M | +10% |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 48.6M | -18% |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 73.7M | -9% |
| required.json | required with empty array | 1 | ✅ | 80.8M | ✅ | 74.1M | -8% |
| required.json | required with escaped characters | 2 | ✅ | 48.2M | ✅ | 37.2M | 🟢 **-23%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 59.6M | ✅ | 40.5M | 🟢 **-32%** |
| type.json | number type matches numbers | 9 | ✅ | 62.5M | ✅ | 34.7M | 🟢 **-44%** |
| type.json | string type matches strings | 9 | ✅ | 61.5M | ✅ | 45.7M | 🟢 **-26%** |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 39.4M | 🟢 **-28%** |
| type.json | array type matches arrays | 7 | ✅ | 57.9M | ✅ | 40.5M | 🟢 **-30%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 42.9M | 🟢 **-28%** |
| type.json | null type matches only the null object | 10 | ✅ | 56.3M | ✅ | 36.1M | 🟢 **-36%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.3M | ✅ | 38.3M | 🟢 **-36%** |
| type.json | type as array with one item | 2 | ✅ | 69.5M | ✅ | 49.0M | 🟢 **-30%** |
| type.json | type: array or object | 5 | ✅ | 65.8M | ✅ | 42.6M | 🟢 **-35%** |
| type.json | type: array, object or null | 5 | ✅ | 67.5M | ✅ | 44.8M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 10.3M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 20.9M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 26.1M | 🔴 **+43%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.6M | ✅ | 55.4M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 53.3M | -19% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.1M | ✅ | 49.3M | 🟢 **-21%** |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 66.8M | -16% |
| optional/bignum.json | string | 1 | ✅ | 56.3M | ✅ | 40.1M | 🟢 **-29%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 67.7M | -6% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 38.5M | 🟢 **-31%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 67.9M | -6% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 38.7M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 34.7M | ✅ | 27.7M | 🟢 **-20%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.6M | ✅ | 27.4M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 27.8M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.0M | ✅ | 28.0M | 🔴 **+47%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.4M | ✅ | 27.4M | 0% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.9M | ✅ | 29.2M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.1M | ✅ | 27.6M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ✅ | 27.6M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 29.4M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.9M | ✅ | 24.6M | -15% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 17.7M | +5% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.6M | ✅ | 13.8M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 14.1M | -5% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.2M | ✅ | 26.9M | -1% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ✅ | 23.3M | +10% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 23.0M | +4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 21.2M | +6% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.5M | ✅ | 21.3M | +9% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.5M | 🔴 **+20%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 9.2M | +11% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 20.7M | +13% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ✅ | 30.2M | 🟢 **-28%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ✅ | 25.4M | -19% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 55.3M | 🟢 **-30%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 9.4M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.8M | ✅ | 15.5M | -8% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.4M | 🟢 **-31%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.1M | ✅ | 14.4M | 🟢 **-59%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 45.0M | ✅ | 9.5M | 🟢 **-79%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.8M | ✅ | 9.7M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.0M | ✅ | 26.6M | -5% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 9.1M | 🟢 **-44%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.4M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 49.1M | 🔴 **+586%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.0M | ✅ | 32.1M | -11% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 73.7M | 🟢 **-52%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.8M | ✅ | 42.2M | 🟢 **-35%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 63.3M | 🟢 **-61%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.2M | ✅ | 69.5M | -1% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 24.5M | 🟢 **-55%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.9M | ✅ | 28.8M | 🟢 **-30%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 105.6M | ✅ | 47.0M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 75.5M | +8% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 23.7M | 🟢 **-49%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.6M | ✅ | 19.8M | -4% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.8M | ✅ | 16.7M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 13.2M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.2M | ✅ | 68.5M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.5M | ✅ | 7.9M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.9M | ✅ | 44.3M | 🟢 **-34%** |
| allOf.json | allOf | 4 | ✅ | 36.9M | ✅ | 28.4M | 🟢 **-23%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 20.6M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 53.2M | ✅ | 39.5M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 75.2M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 57.5M | ✅ | 32.3M | 🟢 **-44%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 32.6M | 🟢 **-65%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.9M | ✅ | 75.1M | +7% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 76.4M | 🟢 **-50%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 36.8M | 🟢 **-45%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 40.5M | 🟢 **-66%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 44.2M | 🟢 **-35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 9.4M | 🟢 **-89%** |
| anyOf.json | anyOf | 4 | ✅ | 58.5M | ✅ | 22.8M | 🟢 **-61%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 16.3M | 🟢 **-64%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.7M | ✅ | 72.3M | -6% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 151.9M | ✅ | 71.8M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 12.8M | 🟢 **-78%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.3M | ✅ | 23.0M | 🟢 **-66%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 71.4M | ✅ | 73.7M | +3% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 21.8M | 🟢 **-82%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 67.3M | ✅ | 55.3M | -18% |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.3M | ✅ | 30.6M | 🟢 **-66%** |
| const.json | const validation | 3 | ✅ | 57.7M | ✅ | 33.1M | 🟢 **-43%** |
| const.json | const with object | 4 | ✅ | 49.3M | ✅ | 14.4M | 🟢 **-71%** |
| const.json | const with array | 3 | ✅ | 48.3M | ✅ | 15.1M | 🟢 **-69%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 39.2M | 🟢 **-67%** |
| const.json | const with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 33.0M | 🟢 **-47%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 33.1M | 🟢 **-70%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.8M | ✅ | 23.0M | 🟢 **-56%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 22.5M | 🟢 **-76%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.8M | ✅ | 11.5M | 🟢 **-80%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ✅ | 11.9M | 🟢 **-88%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 30.1M | ✅ | 35.7M | +19% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 40.4M | 🟢 **-64%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.6M | ✅ | 36.2M | 🟢 **-38%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 92.3M | ✅ | 38.2M | 🟢 **-59%** |
| const.json | nul characters in strings | 2 | ✅ | 57.5M | ✅ | 35.5M | 🟢 **-38%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 34.8M | 🟢 **-56%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 38.6M | 🟢 **-22%** |
| contains.json | contains keyword validation | 6 | ✅ | 90.2M | ✅ | 7.2M | 🟢 **-92%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.7M | ✅ | 9.5M | 🟢 **-84%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 37.0M | 🟢 **-65%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.4M | ✅ | 25.2M | 🟢 **-54%** |
| contains.json | items + contains | 4 | ✅ | 51.5M | ✅ | 6.7M | 🟢 **-87%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.9M | ✅ | 38.5M | 🟢 **-37%** |
| contains.json | contains with null instance elements | 1 | ✅ | 120.7M | ✅ | 68.0M | 🟢 **-44%** |
| default.json | invalid type for default | 2 | ✅ | 62.7M | ✅ | 39.8M | 🟢 **-37%** |
| default.json | invalid string value for default | 2 | ✅ | 59.5M | ✅ | 50.0M | -16% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 37.4M | ✅ | 38.7M | +3% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ✅ | 1.3M | 🟢 **-89%** |
| dependencies.json | dependencies | 7 | ✅ | 55.6M | ✅ | 45.0M | -19% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 80.3M | ✅ | 65.5M | -18% |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.8M | ✅ | 31.0M | -2% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 33.4M | 🟢 **-21%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 51.4M | ✅ | 34.4M | 🟢 **-33%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.5M | ✅ | 20.4M | 🔴 **+41%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 24.6M | ✅ | 31.5M | 🔴 **+28%** |
| enum.json | simple enum validation | 2 | ✅ | 68.3M | ✅ | 32.7M | 🟢 **-52%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.4M | ✅ | 10.3M | 🟢 **-76%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.5M | ✅ | 41.5M | 🟢 **-34%** |
| enum.json | enums in properties | 6 | ✅ | 13.7M | ✅ | 31.7M | 🔴 **+132%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 41.0M | 🟢 **-32%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 33.5M | ✅ | 29.7M | -12% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 19.3M | 🟢 **-65%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.4M | ✅ | 33.1M | 🟢 **-43%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.9M | ✅ | 18.7M | 🟢 **-67%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.0M | ✅ | 40.9M | 🟢 **-35%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.7M | ✅ | 21.0M | 🟢 **-64%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 59.5M | ✅ | 41.2M | 🟢 **-31%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.8M | ✅ | 20.5M | 🟢 **-64%** |
| enum.json | nul characters in strings | 2 | ✅ | 54.0M | ✅ | 34.6M | 🟢 **-36%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 32.6M | ✅ | 37.0M | +13% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ✅ | 35.6M | 🟢 **-35%** |
| format.json | email format | 6 | ✅ | 73.0M | ✅ | 54.3M | 🟢 **-26%** |
| format.json | idn-email format | 6 | ✅ | 70.8M | ✅ | 50.8M | 🟢 **-28%** |
| format.json | regex format | 6 | ✅ | 73.6M | ✅ | 53.0M | 🟢 **-28%** |
| format.json | ipv4 format | 6 | ✅ | 73.2M | ✅ | 42.7M | 🟢 **-42%** |
| format.json | ipv6 format | 6 | ✅ | 73.1M | ✅ | 53.3M | 🟢 **-27%** |
| format.json | idn-hostname format | 6 | ✅ | 73.0M | ✅ | 54.2M | 🟢 **-26%** |
| format.json | hostname format | 6 | ✅ | 77.2M | ✅ | 54.4M | 🟢 **-29%** |
| format.json | date format | 6 | ✅ | 72.9M | ✅ | 52.5M | 🟢 **-28%** |
| format.json | date-time format | 6 | ✅ | 73.3M | ✅ | 38.0M | 🟢 **-48%** |
| format.json | time format | 6 | ✅ | 73.1M | ✅ | 52.3M | 🟢 **-28%** |
| format.json | json-pointer format | 6 | ✅ | 72.8M | ✅ | 51.8M | 🟢 **-29%** |
| format.json | relative-json-pointer format | 6 | ✅ | 72.9M | ✅ | 52.9M | 🟢 **-27%** |
| format.json | iri format | 6 | ✅ | 72.9M | ✅ | 53.6M | 🟢 **-26%** |
| format.json | iri-reference format | 6 | ✅ | 72.9M | ✅ | 52.7M | 🟢 **-28%** |
| format.json | uri format | 6 | ✅ | 72.7M | ✅ | 55.2M | 🟢 **-24%** |
| format.json | uri-reference format | 6 | ✅ | 72.7M | ✅ | 49.0M | 🟢 **-33%** |
| format.json | uri-template format | 6 | ✅ | 73.0M | ✅ | 55.5M | 🟢 **-24%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 78.9M | ✅ | 70.6M | -11% |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 73.4M | -7% |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.1M | ✅ | 73.7M | +2% |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ✅ | 34.8M | 🟢 **-48%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.2M | ✅ | 30.5M | 🟢 **-54%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ✅ | 30.0M | 🟢 **-52%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 70.1M | ✅ | 73.3M | +5% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.1M | ✅ | 40.9M | 🟢 **-38%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.6M | ✅ | 38.7M | 🟢 **-41%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 25.5M | 🟢 **-35%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.8M | ✅ | 29.6M | 🟢 **-22%** |
| items.json | a schema given for items | 4 | ✅ | 49.0M | ✅ | 36.9M | 🟢 **-25%** |
| items.json | an array of schemas for items | 6 | ✅ | 60.4M | ✅ | 45.1M | 🟢 **-25%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.2M | ✅ | 67.0M | -15% |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.0M | ✅ | 33.2M | 🟢 **-47%** |
| items.json | items with boolean schemas | 3 | ✅ | 55.7M | ✅ | 39.9M | 🟢 **-28%** |
| items.json | items and subitems | 6 | ✅ | 15.9M | ✅ | 20.1M | 🔴 **+26%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 11.6M | -2% |
| items.json | single-form items with null instance ... | 1 | ✅ | 66.1M | ✅ | 48.1M | 🟢 **-27%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.1M | ✅ | 70.7M | +10% |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 42.7M | 🟢 **-37%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 36.8M | 🟢 **-42%** |
| maxLength.json | maxLength validation | 5 | ✅ | 49.7M | ✅ | 40.3M | -19% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 34.9M | 🟢 **-32%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.6M | ✅ | 37.8M | 🟢 **-28%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.4M | ✅ | 26.3M | 🟢 **-39%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.3M | ✅ | 26.8M | 🟢 **-40%** |
| maximum.json | maximum validation | 4 | ✅ | 67.0M | ✅ | 43.6M | 🟢 **-35%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.1M | ✅ | 42.9M | 🟢 **-35%** |
| minItems.json | minItems validation | 4 | ✅ | 67.9M | ✅ | 41.9M | 🟢 **-38%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.8M | ✅ | 42.5M | 🟢 **-33%** |
| minLength.json | minLength validation | 5 | ✅ | 47.5M | ✅ | 37.6M | 🟢 **-21%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 50.9M | ✅ | 39.8M | 🟢 **-22%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 38.4M | 🟢 **-28%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.1M | ✅ | 27.7M | 🟢 **-40%** |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ✅ | 43.2M | 🟢 **-35%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.4M | ✅ | 43.1M | 🟢 **-32%** |
| multipleOf.json | by int | 3 | ✅ | 66.8M | ✅ | 38.0M | 🟢 **-43%** |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ✅ | 36.3M | 🟢 **-43%** |
| multipleOf.json | by small number | 2 | ✅ | 59.0M | ✅ | 32.5M | 🟢 **-45%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 7.9M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.5M | ✅ | 10.6M | 🟢 **-84%** |
| not.json | not | 2 | ✅ | 66.8M | ✅ | 31.7M | 🟢 **-53%** |
| not.json | not multiple types | 3 | ✅ | 60.5M | ✅ | 27.4M | 🟢 **-55%** |
| not.json | not more complex schema | 3 | ✅ | 60.1M | ✅ | 30.7M | 🟢 **-49%** |
| not.json | forbidden property | 2 | ✅ | 46.7M | ✅ | 37.3M | 🟢 **-20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.1M | ✅ | 29.8M | 🟢 **-46%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ✅ | 26.6M | 🟢 **-52%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.9M | ✅ | 54.3M | 🟢 **-29%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 73.5M | -4% |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 17.8M | 🟢 **-70%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.2M | ✅ | 23.5M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.0M | ✅ | 28.6M | 🟢 **-50%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 18.2M | 🟢 **-76%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 26.5M | 🟢 **-54%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.1M | ✅ | 13.6M | 🟢 **-77%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 17.7M | 🟢 **-57%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.1M | ✅ | 28.0M | 🟢 **-58%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ✅ | 15.6M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 19.1M | 🟢 **-58%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.2M | ✅ | 25.3M | 🟢 **-62%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 39.0M | 🟢 **-21%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 23.4M | ✅ | 32.2M | 🔴 **+38%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.4M | ✅ | 13.4M | 🟢 **-47%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 7.4M | 🟢 **-47%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 8.2M | 🟢 **-44%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 8.9M | 🟢 **-56%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 21.2M | 🔴 **+21%** |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 39.7M | 🟢 **-21%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.3M | ✅ | 8.9M | 🟢 **-51%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.0M | ✅ | 34.0M | 🟢 **-23%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.5M | ✅ | 38.4M | -16% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.5M | ✅ | 65.1M | +9% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.9M | ✅ | 28.7M | 🟢 **-24%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 15.3M | 🟢 **-20%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 67.5M | -15% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.3M | ✅ | 21.0M | 🟢 **-55%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 24.9M | 🟢 **-33%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.0M | ✅ | 26.9M | 🟢 **-31%** |
| ref.json | root pointer ref | 4 | ✅ | 22.8M | ✅ | 18.9M | -17% |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.1M | ✅ | 36.0M | 🟢 **-24%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.9M | ✅ | 38.1M | 🟢 **-24%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 35.3M | -18% |
| ref.json | nested refs | 2 | ✅ | 36.4M | ✅ | 42.3M | +16% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.4M | ✅ | 3.9M | 🟢 **-83%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 36.8M | 🟢 **-22%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.5M | ✅ | 39.8M | -16% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ✅ | 75.4M | -2% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ✅ | 32.3M | 🟢 **-45%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 7.0M | -17% |
| ref.json | refs with quote | 2 | ✅ | 47.2M | ✅ | 39.5M | -16% |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ✅ | 39.3M | -14% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 43.3M | ✅ | 43.1M | -1% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 42.8M | ✅ | 35.0M | -18% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.2M | ✅ | 12.9M | 🟢 **-75%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ✅ | 27.2M | -15% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.6M | ✅ | 29.9M | -5% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.2M | ✅ | 39.3M | -13% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.8M | ✅ | 21.9M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.5M | ✅ | 36.9M | 🟢 **-22%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.4M | ✅ | 37.6M | -19% |
| ref.json | URN base URI with r-component | 2 | ✅ | 40.1M | ✅ | 34.9M | -13% |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.9M | ✅ | 37.5M | -15% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.3M | ✅ | 34.3M | 🟢 **-23%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.1M | ✅ | 33.8M | -9% |
| ref.json | ref to if | 2 | ✅ | 45.7M | ✅ | 36.9M | -19% |
| ref.json | ref to then | 2 | ✅ | 46.2M | ✅ | 41.5M | -10% |
| ref.json | ref to else | 2 | ✅ | 45.0M | ✅ | 42.6M | -5% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.8M | ✅ | 34.4M | 🟢 **-25%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.6M | ✅ | 42.2M | 🟢 **-37%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 43.4M | 🟢 **-35%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.2M | ✅ | 36.0M | 🟢 **-41%** |
| refRemote.json | remote ref | 2 | ✅ | 44.0M | ✅ | 38.7M | -12% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.9M | ✅ | 38.9M | -11% |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.6M | ✅ | 43.0M | -1% |
| refRemote.json | base URI change | 2 | ✅ | 27.8M | ✅ | 24.1M | -13% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.7M | ✅ | 26.8M | -13% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.9M | ✅ | 27.0M | 🟢 **-20%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.1M | ✅ | 10.2M | 🟢 **-66%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.3M | ✅ | 32.5M | -20% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.0M | ✅ | 37.0M | +3% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.6M | ✅ | 27.4M | 🟢 **-34%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 35.0M | ✅ | 36.1M | +3% |
| required.json | required validation | 5 | ✅ | 57.5M | ✅ | 43.6M | 🟢 **-24%** |
| required.json | required default validation | 1 | ✅ | 76.7M | ✅ | 75.2M | -2% |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 75.6M | -2% |
| required.json | required with escaped characters | 2 | ✅ | 45.6M | ✅ | 31.4M | 🟢 **-31%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 58.0M | ✅ | 34.2M | 🟢 **-41%** |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 35.7M | 🟢 **-40%** |
| type.json | string type matches strings | 9 | ✅ | 59.0M | ✅ | 38.6M | 🟢 **-35%** |
| type.json | object type matches objects | 7 | ✅ | 52.4M | ✅ | 34.2M | 🟢 **-35%** |
| type.json | array type matches arrays | 7 | ✅ | 55.5M | ✅ | 34.9M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 36.5M | 🟢 **-37%** |
| type.json | null type matches only the null object | 10 | ✅ | 54.0M | ✅ | 30.1M | 🟢 **-44%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.9M | ✅ | 30.1M | 🟢 **-48%** |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 36.5M | 🟢 **-45%** |
| type.json | type: array or object | 5 | ✅ | 58.4M | ✅ | 34.7M | 🟢 **-41%** |
| type.json | type: array, object or null | 5 | ✅ | 66.4M | ✅ | 39.4M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 10.1M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 20.5M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 23.3M | 🔴 **+29%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 73.2M | ✅ | 57.5M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 50.2M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.2M | ✅ | 41.6M | 🟢 **-30%** |
| optional/bignum.json | integer | 2 | ✅ | 75.4M | ✅ | 11.5M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 75.7M | ✅ | 66.6M | -12% |
| optional/bignum.json | string | 1 | ✅ | 73.1M | ✅ | 31.5M | 🟢 **-57%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 71.6M | +4% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 30.7M | 🟢 **-43%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 72.0M | +5% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 29.1M | 🟢 **-46%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 356K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 22.9M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.3M | ✅ | 23.8M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.3M | ✅ | 23.2M | -8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.3M | ✅ | 23.5M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.2M | ✅ | 21.2M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 24.5M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 22.9M | -13% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.1M | ✅ | 23.1M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 27.5M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 22.7M | 🟢 **-21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ✅ | 17.0M | +12% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 14.5M | +0% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.9M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 22.3M | -12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 9.8M | ✅ | 20.1M | 🔴 **+106%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 20.8M | -8% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.7M | ✅ | 19.1M | -3% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 17.9M | -7% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.3M | +19% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 8.7M | +6% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.7M | ✅ | 3.1M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ✅ | 8.5M | +2% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ✅ | 19.6M | +6% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.0M | ✅ | 26.5M | 🟢 **-24%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ✅ | 3.1M | 🟢 **-74%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 28.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 19.1M | ✅ | 23.4M | 🔴 **+22%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 869K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.7M | ✅ | 27.0M | -20% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.7M | -13% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.2M | ✅ | 55.9M | 🟢 **-26%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 9.4M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ✅ | 16.4M | +8% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.5M | 🟢 **-29%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 31.7M | ✅ | 11.6M | 🟢 **-63%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 53.4M | ✅ | 27.2M | 🟢 **-49%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 53.4M | ✅ | 28.3M | 🟢 **-47%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ✅ | 24.1M | -11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ✅ | 8.8M | 🟢 **-46%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 7.2M | 🟢 **-84%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.7M | ✅ | 34.4M | -1% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 166.0M | ✅ | 74.2M | 🟢 **-55%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 45.1M | 🟢 **-38%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 175.2M | ✅ | 67.0M | 🟢 **-62%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 87.0M | ✅ | 66.7M | 🟢 **-23%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 33.7M | ✅ | 28.4M | -16% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 31.0M | ✅ | 36.6M | +18% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.7M | ✅ | 48.6M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 88.9M | ✅ | 74.1M | -17% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 43.9M | ✅ | 27.2M | 🟢 **-38%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.8M | ✅ | 22.2M | +7% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.9M | ✅ | 16.7M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.0M | ✅ | 9.1M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 166.3M | ✅ | 74.3M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 20.3M | ✅ | 8.2M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 71.8M | ✅ | 47.0M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.0M | ✅ | 10.1M | 🟢 **-60%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 23.5M | ✅ | 9.1M | 🟢 **-62%** |
| allOf.json | allOf | 4 | ✅ | 30.7M | ✅ | 33.9M | +11% |
| allOf.json | allOf with base schema | 5 | ✅ | 26.8M | ✅ | 19.0M | 🟢 **-29%** |
| allOf.json | allOf simple types | 2 | ✅ | 82.6M | ✅ | 48.3M | 🟢 **-42%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 166.2M | ✅ | 74.5M | 🟢 **-55%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.5M | ✅ | 40.4M | 🟢 **-46%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.9M | ✅ | 40.6M | 🟢 **-60%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 99.6M | ✅ | 74.8M | 🟢 **-25%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.3M | ✅ | 74.3M | 🟢 **-56%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.7M | ✅ | 48.5M | 🟢 **-43%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.6M | ✅ | 50.1M | 🟢 **-60%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 85.8M | ✅ | 49.3M | 🟢 **-43%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 4.9M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 83.3M | ✅ | 47.4M | 🟢 **-43%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 69.1M | ✅ | 48.2M | 🟢 **-30%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 34.3M | ✅ | 49.3M | 🔴 **+44%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 85.4M | ✅ | 48.4M | 🟢 **-43%** |
| anyOf.json | anyOf | 4 | ✅ | 86.7M | ✅ | 25.0M | 🟢 **-71%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.9M | ✅ | 20.2M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.1M | ✅ | 73.6M | 🟢 **-26%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 99.3M | ✅ | 73.7M | 🟢 **-26%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 74.4M | ✅ | 19.7M | 🟢 **-74%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 58.4M | ✅ | 23.9M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 90.2M | ✅ | 58.9M | 🟢 **-35%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 86.1M | ✅ | 27.7M | 🟢 **-68%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 77.8M | ✅ | 56.1M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 71.5M | ✅ | 39.6M | 🟢 **-45%** |
| const.json | const validation | 3 | ✅ | 76.9M | ✅ | 38.2M | 🟢 **-50%** |
| const.json | const with object | 4 | ✅ | 44.1M | ✅ | 15.2M | 🟢 **-66%** |
| const.json | const with array | 3 | ✅ | 64.6M | ✅ | 16.0M | 🟢 **-75%** |
| const.json | const with null | 2 | ✅ | 86.4M | ✅ | 48.6M | 🟢 **-44%** |
| const.json | const with false does not match 0 | 3 | ✅ | 81.6M | ✅ | 43.4M | 🟢 **-47%** |
| const.json | const with true does not match 1 | 3 | ✅ | 78.6M | ✅ | 39.4M | 🟢 **-50%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 72.3M | ✅ | 27.1M | 🟢 **-63%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 72.1M | ✅ | 25.5M | 🟢 **-65%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 69.7M | ✅ | 12.6M | 🟢 **-82%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 70.8M | ✅ | 12.6M | 🟢 **-82%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 72.0M | ✅ | 43.2M | 🟢 **-40%** |
| const.json | const with 1 does not match true | 3 | ✅ | 82.3M | ✅ | 43.8M | 🟢 **-47%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 79.0M | ✅ | 40.3M | 🟢 **-49%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 80.1M | ✅ | 43.0M | 🟢 **-46%** |
| const.json | nul characters in strings | 2 | ✅ | 72.1M | ✅ | 45.9M | 🟢 **-36%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.6M | ✅ | 44.1M | 🟢 **-33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.2M | ✅ | 47.3M | 🟢 **-35%** |
| contains.json | contains keyword validation | 6 | ✅ | 71.1M | ✅ | 8.8M | 🟢 **-88%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 68.1M | ✅ | 7.1M | 🟢 **-90%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 79.0M | ✅ | 30.8M | 🟢 **-61%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 77.9M | ✅ | 32.2M | 🟢 **-59%** |
| contains.json | items + contains | 4 | ✅ | 38.3M | ✅ | 6.8M | 🟢 **-82%** |
| contains.json | contains with false if subschema | 2 | ✅ | 76.4M | ✅ | 45.8M | 🟢 **-40%** |
| contains.json | contains with null instance elements | 1 | ✅ | 87.1M | ✅ | 65.9M | 🟢 **-24%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 104.3M | ✅ | 62.6M | 🟢 **-40%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 105.4M | ✅ | 64.5M | 🟢 **-39%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 90.5M | ✅ | 54.8M | 🟢 **-39%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 78.3M | ✅ | 51.5M | 🟢 **-34%** |
| default.json | invalid type for default | 2 | ✅ | 77.1M | ✅ | 59.6M | 🟢 **-23%** |
| default.json | invalid string value for default | 2 | ✅ | 77.1M | ✅ | 42.0M | 🟢 **-46%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.3M | ✅ | 44.2M | -17% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.7M | ✅ | 968K | 🟢 **-43%** |
| dependentRequired.json | single dependency | 7 | ✅ | 63.9M | ✅ | 49.4M | 🟢 **-23%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 104.9M | ✅ | 61.5M | 🟢 **-41%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.7M | ✅ | 36.1M | 🔴 **+35%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 44.8M | ✅ | 34.8M | 🟢 **-22%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.7M | ✅ | 35.7M | 🟢 **-30%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 61.0M | ✅ | 41.3M | 🟢 **-32%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.0M | ✅ | 32.2M | -13% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.1M | ✅ | 37.3M | +13% |
| enum.json | simple enum validation | 2 | ✅ | 82.0M | ✅ | 29.8M | 🟢 **-64%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 51.4M | ✅ | 11.4M | 🟢 **-78%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 81.5M | ✅ | 45.8M | 🟢 **-44%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 33.3M | 🔴 **+123%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.4M | ✅ | 44.4M | 🟢 **-49%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 81.4M | ✅ | 38.3M | 🟢 **-53%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ✅ | 21.1M | 🟢 **-71%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 81.1M | ✅ | 38.8M | 🟢 **-52%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 72.1M | ✅ | 20.8M | 🟢 **-71%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 83.5M | ✅ | 43.4M | 🟢 **-48%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.1M | ✅ | 21.6M | 🟢 **-71%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 83.3M | ✅ | 43.6M | 🟢 **-48%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 72.0M | ✅ | 22.4M | 🟢 **-69%** |
| enum.json | nul characters in strings | 2 | ✅ | 71.8M | ✅ | 41.0M | 🟢 **-43%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.2M | ✅ | 27.8M | 🟢 **-65%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.5M | ✅ | 28.3M | 🟢 **-64%** |
| format.json | email format | 6 | ✅ | 103.5M | ✅ | 55.3M | 🟢 **-47%** |
| format.json | idn-email format | 6 | ✅ | 104.5M | ✅ | 55.4M | 🟢 **-47%** |
| format.json | regex format | 6 | ✅ | 90.6M | ✅ | 55.6M | 🟢 **-39%** |
| format.json | ipv4 format | 6 | ✅ | 90.5M | ✅ | 54.1M | 🟢 **-40%** |
| format.json | ipv6 format | 6 | ✅ | 76.7M | ✅ | 55.2M | 🟢 **-28%** |
| format.json | idn-hostname format | 6 | ✅ | 90.6M | ✅ | 55.6M | 🟢 **-39%** |
| format.json | hostname format | 6 | ✅ | 91.2M | ✅ | 55.0M | 🟢 **-40%** |
| format.json | date format | 6 | ✅ | 90.6M | ✅ | 55.5M | 🟢 **-39%** |
| format.json | date-time format | 6 | ✅ | 91.3M | ✅ | 54.9M | 🟢 **-40%** |
| format.json | time format | 6 | ✅ | 90.5M | ✅ | 55.7M | 🟢 **-39%** |
| format.json | json-pointer format | 6 | ✅ | 91.1M | ✅ | 55.7M | 🟢 **-39%** |
| format.json | relative-json-pointer format | 6 | ✅ | 90.2M | ✅ | 55.7M | 🟢 **-38%** |
| format.json | iri format | 6 | ✅ | 91.0M | ✅ | 54.8M | 🟢 **-40%** |
| format.json | iri-reference format | 6 | ✅ | 89.5M | ✅ | 55.7M | 🟢 **-38%** |
| format.json | uri format | 6 | ✅ | 92.1M | ✅ | 55.0M | 🟢 **-40%** |
| format.json | uri-reference format | 6 | ✅ | 90.5M | ✅ | 55.2M | 🟢 **-39%** |
| format.json | uri-template format | 6 | ✅ | 89.9M | ✅ | 55.6M | 🟢 **-38%** |
| format.json | uuid format | 6 | ✅ | 91.0M | ✅ | 55.5M | 🟢 **-39%** |
| format.json | duration format | 6 | ✅ | 91.0M | ✅ | 55.2M | 🟢 **-39%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.2M | ✅ | 66.9M | 🟢 **-28%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.3M | ✅ | 68.5M | 🟢 **-27%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 93.1M | ✅ | 68.9M | 🟢 **-26%** |
| if-then-else.json | if and then without else | 3 | ✅ | 85.7M | ✅ | 37.2M | 🟢 **-57%** |
| if-then-else.json | if and else without then | 3 | ✅ | 79.6M | ✅ | 38.1M | 🟢 **-52%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 80.8M | ✅ | 36.4M | 🟢 **-55%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 93.7M | ✅ | 68.4M | 🟢 **-27%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 84.2M | ✅ | 50.1M | 🟢 **-41%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 74.9M | ✅ | 47.2M | 🟢 **-37%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.3M | ✅ | 31.5M | 🟢 **-32%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.5M | ✅ | 33.8M | -14% |
| items.json | a schema given for items | 4 | ✅ | 54.8M | ✅ | 43.5M | 🟢 **-21%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.8M | ✅ | 44.9M | 🟢 **-31%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 105.5M | ✅ | 67.2M | 🟢 **-36%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 78.1M | ✅ | 43.5M | 🟢 **-44%** |
| items.json | items with boolean schemas | 3 | ✅ | 55.0M | ✅ | 43.9M | 🟢 **-20%** |
| items.json | items and subitems | 6 | ✅ | 14.2M | ✅ | 20.6M | 🔴 **+45%** |
| items.json | nested items | 3 | ✅ | 11.5M | ✅ | 11.7M | +1% |
| items.json | single-form items with null instance ... | 1 | ✅ | 83.8M | ✅ | 58.0M | 🟢 **-31%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.6M | ✅ | 68.1M | 🟢 **-23%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 104.0M | ✅ | 64.9M | 🟢 **-38%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 64.1M | ✅ | 28.0M | 🟢 **-56%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 72.8M | ✅ | 44.6M | 🟢 **-39%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 67.4M | ✅ | 37.0M | 🟢 **-45%** |
| maxItems.json | maxItems validation | 4 | ✅ | 88.1M | ✅ | 48.2M | 🟢 **-45%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 82.2M | ✅ | 46.7M | 🟢 **-43%** |
| maxLength.json | maxLength validation | 5 | ✅ | 64.7M | ✅ | 45.5M | 🟢 **-30%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 62.2M | ✅ | 43.3M | 🟢 **-30%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 62.1M | ✅ | 42.3M | 🟢 **-32%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 32.3M | 🟢 **-35%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.2M | ✅ | 35.2M | 🟢 **-34%** |
| maximum.json | maximum validation | 4 | ✅ | 85.7M | ✅ | 46.5M | 🟢 **-46%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 81.9M | ✅ | 47.8M | 🟢 **-42%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 104.8M | ✅ | 68.4M | 🟢 **-35%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 78.6M | ✅ | 36.0M | 🟢 **-54%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 67.9M | ✅ | 34.2M | 🟢 **-50%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 74.3M | ✅ | 41.7M | 🟢 **-44%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 67.8M | ✅ | 37.7M | 🟢 **-44%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 66.1M | ✅ | 34.6M | 🟢 **-48%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 103.9M | ✅ | 68.7M | 🟢 **-34%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 80.1M | ✅ | 45.1M | 🟢 **-44%** |
| minItems.json | minItems validation | 4 | ✅ | 89.0M | ✅ | 47.1M | 🟢 **-47%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.8M | ✅ | 47.4M | 🟢 **-43%** |
| minLength.json | minLength validation | 5 | ✅ | 64.2M | ✅ | 44.5M | 🟢 **-31%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 62.3M | ✅ | 43.3M | 🟢 **-31%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.4M | ✅ | 42.6M | 🟢 **-34%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.9M | ✅ | 34.2M | 🟢 **-34%** |
| minimum.json | minimum validation | 4 | ✅ | 85.4M | ✅ | 47.1M | 🟢 **-45%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 48.3M | 🟢 **-40%** |
| multipleOf.json | by int | 3 | ✅ | 87.9M | ✅ | 37.7M | 🟢 **-57%** |
| multipleOf.json | by number | 3 | ✅ | 81.5M | ✅ | 42.7M | 🟢 **-48%** |
| multipleOf.json | by small number | 2 | ✅ | 74.6M | ✅ | 41.1M | 🟢 **-45%** |
| multipleOf.json | float division = inf | 1 | ✅ | 64.6M | ✅ | 8.8M | 🟢 **-86%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.5M | ✅ | 8.7M | 🟢 **-89%** |
| not.json | not | 2 | ✅ | 85.2M | ✅ | 42.4M | 🟢 **-50%** |
| not.json | not multiple types | 3 | ✅ | 78.9M | ✅ | 37.4M | 🟢 **-53%** |
| not.json | not more complex schema | 3 | ✅ | 75.7M | ✅ | 39.2M | 🟢 **-48%** |
| not.json | forbidden property | 2 | ✅ | 45.6M | ✅ | 42.8M | -6% |
| not.json | forbid everything with empty schema | 9 | ✅ | 71.4M | ✅ | 39.4M | 🟢 **-45%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 71.2M | ✅ | 31.8M | 🟢 **-55%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.7M | ✅ | 54.8M | 🟢 **-43%** |
| not.json | double negation | 1 | ✅ | 100.0M | ✅ | 73.8M | 🟢 **-26%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 35.5M | ✅ | 24.2M | 🟢 **-32%** |
| oneOf.json | oneOf | 4 | ✅ | 72.1M | ✅ | 21.7M | 🟢 **-70%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.3M | ✅ | 24.7M | 🟢 **-32%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 73.9M | ✅ | 36.4M | 🟢 **-51%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 98.9M | ✅ | 22.9M | 🟢 **-77%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 72.4M | ✅ | 36.2M | 🟢 **-50%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.3M | ✅ | 17.4M | 🟢 **-77%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.3M | ✅ | 18.5M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.7M | ✅ | 36.5M | 🟢 **-56%** |
| oneOf.json | oneOf with required | 4 | ✅ | 51.1M | ✅ | 16.8M | 🟢 **-67%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 51.0M | ✅ | 20.2M | 🟢 **-60%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 83.1M | ✅ | 28.1M | 🟢 **-66%** |
| pattern.json | pattern validation | 8 | ✅ | 59.0M | ✅ | 41.1M | 🟢 **-30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.5M | ✅ | 29.2M | +6% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 10.6M | 🟢 **-59%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 6.3M | 🟢 **-54%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ✅ | 7.8M | 🟢 **-47%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.0M | ✅ | 5.9M | 🟢 **-69%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.4M | ✅ | 17.8M | -13% |
| properties.json | object properties validation | 6 | ✅ | 51.6M | ✅ | 44.8M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 10.0M | 🟢 **-45%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.2M | ✅ | 40.8M | -6% |
| properties.json | properties with escaped characters | 2 | ✅ | 42.3M | ✅ | 43.0M | +2% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.0M | ✅ | 60.2M | 🟢 **-23%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.6M | ✅ | 32.0M | -19% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 14.7M | 🟢 **-23%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 105.0M | ✅ | 68.5M | 🟢 **-35%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 54.2M | ✅ | 28.8M | 🟢 **-47%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.7M | ✅ | 32.0M | -15% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.8M | ✅ | 33.1M | -15% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 11.7M | ✅ | 18.0M | 🔴 **+54%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ✅ | 1.8M | 🟢 **-69%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 2.3M | -13% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 10.6M | ✅ | 2.7M | 🟢 **-75%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.9M | ✅ | 2.6M | 🟢 **-74%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.2M | ✅ | 1.9M | 🟢 **-73%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ✅ | 3.8M | -10% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 3.9M | -5% |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 19.4M | -14% |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.7M | ✅ | 39.4M | -17% |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.4M | ✅ | 44.6M | -11% |
| ref.json | escaped pointer ref | 6 | ✅ | 42.2M | ✅ | 39.7M | -6% |
| ref.json | nested refs | 2 | ✅ | 26.2M | ✅ | 48.6M | 🔴 **+85%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.1M | ✅ | 37.5M | -4% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.6M | ✅ | 2.3M | -9% |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.5M | ✅ | 43.7M | -8% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 37.1M | -17% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 98.9M | ✅ | 74.7M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 76.3M | ✅ | 40.3M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.6M | ✅ | 7.3M | -4% |
| ref.json | refs with quote | 2 | ✅ | 47.7M | ✅ | 44.4M | -7% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 21.7M | ✅ | 33.8M | 🔴 **+56%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.4M | ✅ | 14.4M | 🟢 **-77%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 27.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 33.3M | ✅ | 48.6M | 🔴 **+46%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 32.7M | ✅ | 47.0M | 🔴 **+44%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 83.6M | ✅ | 46.6M | 🟢 **-44%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 27.7M | ✅ | 42.4M | 🔴 **+53%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 46.4M | ✅ | 22.9M | 🟢 **-51%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ✅ | 43.5M | -8% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.3M | ✅ | 44.1M | -5% |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ✅ | 44.0M | +5% |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.7M | ✅ | 43.9M | +1% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 41.8M | ✅ | 43.9M | +5% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.3M | ✅ | 44.2M | 0% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 34.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 34.0M | ✅ | 45.4M | 🔴 **+33%** |
| ref.json | ref to then | 2 | ✅ | 35.0M | ✅ | 47.9M | 🔴 **+37%** |
| ref.json | ref to else | 2 | ✅ | 34.0M | ✅ | 48.3M | 🔴 **+42%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 34.5M | ✅ | 48.7M | 🔴 **+41%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.2M | ✅ | 49.4M | 🟢 **-42%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.6M | ✅ | 50.2M | 🟢 **-41%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 48.1M | 🟢 **-37%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.3M | ✅ | 17.2M | 🔴 **+299%** |
| refRemote.json | remote ref | 2 | ✅ | 36.4M | ✅ | 48.2M | 🔴 **+32%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 32.7M | ✅ | 49.5M | 🔴 **+52%** |
| refRemote.json | anchor within remote ref | 2 | ✅ | 34.8M | ✅ | 49.3M | 🔴 **+42%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 35.2M | ✅ | 47.9M | 🔴 **+36%** |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ✅ | 28.0M | -3% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.1M | ✅ | 27.7M | -5% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ✅ | 27.7M | 🟢 **-23%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.6M | ✅ | 11.0M | 🟢 **-49%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 33.1M | ✅ | 37.4M | +13% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.1M | ✅ | 41.0M | 🔴 **+20%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.6M | ✅ | 29.3M | 🟢 **-30%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 35.1M | ✅ | 41.1M | +17% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 35.1M | ✅ | 41.0M | +17% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 30.6M | ✅ | 41.5M | 🔴 **+36%** |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 33.6M | ✅ | 41.5M | 🔴 **+24%** |
| required.json | required validation | 5 | ✅ | 64.7M | ✅ | 49.2M | 🟢 **-24%** |
| required.json | required default validation | 1 | ✅ | 99.1M | ✅ | 74.3M | 🟢 **-25%** |
| required.json | required with empty array | 1 | ✅ | 98.6M | ✅ | 73.6M | 🟢 **-25%** |
| required.json | required with escaped characters | 2 | ✅ | 47.5M | ✅ | 38.5M | -19% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 72.2M | ✅ | 40.7M | 🟢 **-44%** |
| type.json | number type matches numbers | 9 | ✅ | 73.7M | ✅ | 40.2M | 🟢 **-45%** |
| type.json | string type matches strings | 9 | ✅ | 73.8M | ✅ | 45.7M | 🟢 **-38%** |
| type.json | object type matches objects | 7 | ✅ | 62.8M | ✅ | 39.9M | 🟢 **-37%** |
| type.json | array type matches arrays | 7 | ✅ | 67.2M | ✅ | 38.1M | 🟢 **-43%** |
| type.json | boolean type matches booleans | 10 | ✅ | 71.9M | ✅ | 40.8M | 🟢 **-43%** |
| type.json | null type matches only the null object | 10 | ✅ | 71.6M | ✅ | 41.9M | 🟢 **-41%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.8M | ✅ | 38.1M | 🟢 **-45%** |
| type.json | type as array with one item | 2 | ✅ | 81.5M | ✅ | 47.0M | 🟢 **-42%** |
| type.json | type: array or object | 5 | ✅ | 79.2M | ✅ | 42.8M | 🟢 **-46%** |
| type.json | type: array, object or null | 5 | ✅ | 83.1M | ✅ | 44.9M | 🟢 **-46%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 92.0M | ✅ | 69.0M | 🟢 **-25%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 49.5M | ✅ | 45.6M | -8% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.8M | ✅ | 42.6M | -14% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 77.5M | ✅ | 62.6M | -19% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 46.4M | ✅ | 45.0M | -3% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 86.4M | ✅ | 66.7M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 38.3M | ✅ | 34.9M | -9% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 33.8M | ✅ | 35.3M | +4% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 42.4M | ✅ | 44.4M | +5% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 90.5M | ✅ | 38.1M | 🟢 **-58%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 63.8M | 🔴 **+200%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.5M | ✅ | 24.4M | 🔴 **+111%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.1M | ✅ | 20.9M | 🔴 **+48%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 30.5M | ✅ | 35.7M | +17% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.7M | ✅ | 26.2M | 🔴 **+145%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 50.1M | ✅ | 47.8M | -5% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 42.8M | ✅ | 43.4M | +2% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 41.7M | ✅ | 43.7M | +5% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.1M | ✅ | 9.6M | 🔴 **+368%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.1M | ✅ | 20.1M | 🟢 **-43%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.7M | ✅ | 30.6M | 🔴 **+29%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 73.2M | ✅ | 53.7M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 85.0M | ✅ | 65.3M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 32.2M | ✅ | 35.9M | +12% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 60.9M | ✅ | 62.2M | +2% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.3M | ✅ | 16.1M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.6M | ✅ | 39.6M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.8M | ✅ | 37.0M | 🔴 **+24%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ✅ | 10.3M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 75.1M | ✅ | 59.3M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.2M | ✅ | 33.5M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 9.3M | -2% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 74.3M | ✅ | 52.7M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 34.8M | ✅ | 59.7M | 🔴 **+72%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.5M | ✅ | 10.1M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ✅ | 13.4M | 🟢 **-28%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 20.4M | ✅ | 29.4M | 🔴 **+44%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.1M | ✅ | 17.3M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.9M | ✅ | 19.1M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.4M | ✅ | 22.8M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ✅ | 38.0M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.4M | ✅ | 31.3M | +6% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ✅ | 33.1M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.9M | ✅ | 10.4M | 🔴 **+254%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.9M | ✅ | 33.6M | 🔴 **+40%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.9M | ✅ | 33.9M | 🔴 **+42%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 35.1M | ✅ | 58.4M | 🔴 **+67%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.3M | ✅ | 53.5M | 🔴 **+61%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.4M | ✅ | 30.6M | 🔴 **+36%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.7M | ✅ | 36.1M | 🔴 **+35%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 18.0M | ✅ | 29.4M | 🔴 **+63%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ✅ | 33.6M | 🔴 **+202%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.9M | ✅ | 23.6M | -16% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 27.4M | ✅ | 32.1M | +17% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 50.5M | ✅ | 24.9M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ✅ | 13.0M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.4M | ✅ | 13.8M | 🟢 **-33%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 5.2M | 🟢 **-29%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 92.5M | ✅ | 55.1M | 🟢 **-40%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 54.9M | ✅ | 45.0M | -18% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.3M | ✅ | 12.1M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.2M | ✅ | 17.3M | -14% |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 20.3M | ✅ | 23.4M | +15% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 10.4M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.7M | ✅ | 20.0M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.4M | ✅ | 25.4M | 🔴 **+25%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.5M | ✅ | 54.8M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ✅ | 52.6M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.1M | ✅ | 49.2M | 🟢 **-38%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.0M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 80.9M | ✅ | 44.2M | 🟢 **-45%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 65.9M | ✅ | 11.7M | 🟢 **-82%** |
| optional/bignum.json | integer | 2 | ✅ | 93.6M | ✅ | 14.1M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 98.8M | ✅ | 68.7M | 🟢 **-30%** |
| optional/bignum.json | string | 1 | ✅ | 71.6M | ✅ | 39.8M | 🟢 **-44%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 89.2M | ✅ | 67.8M | 🟢 **-24%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 67.0M | ✅ | 37.9M | 🟢 **-44%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 89.0M | ✅ | 67.8M | 🟢 **-24%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.6M | ✅ | 38.7M | 🟢 **-42%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.5M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 77.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.9M | ✅ | 49.5M | -19% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 103.1M | ✅ | 64.9M | 🟢 **-37%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.9M | ✅ | 34.4M | +8% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.1M | ✅ | 37.9M | -16% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 47.5M | ✅ | 41.8M | -12% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 62.3M | ✅ | 41.3M | 🟢 **-34%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.8M | ✅ | 31.9M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 38.1M | ✅ | 26.3M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 27.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.2M | ✅ | 27.8M | -8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 27.0M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 26.1M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.5M | ✅ | 26.0M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 31.3M | ✅ | 26.0M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 31.0M | ✅ | 27.5M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 28.4M | ✅ | 29.2M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 24.4M | 🟢 **-26%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.9M | ✅ | 17.7M | -1% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.8M | ✅ | 13.4M | 🟢 **-25%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ✅ | 14.1M | -13% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 30.7M | ✅ | 26.2M | -15% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.6M | ✅ | 22.8M | +1% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 23.1M | 0% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 20.7M | +11% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 21.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.0M | +14% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.6M | -1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 28.0M | ✅ | 2.9M | 🟢 **-90%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.5M | ✅ | 8.0M | -16% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 44.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.5M | ✅ | 21.5M | +11% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ✅ | 79K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ✅ | 30.7M | 🟢 **-23%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.6M | ✅ | 2.8M | 🟢 **-78%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 35.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.3M | ✅ | 25.0M | 🟢 **-25%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 78.7M | ✅ | 917K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.9M | ✅ | 30.7M | -19% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ✅ | 5.5M | -19% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 104.0M | ✅ | 53.3M | 🟢 **-49%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ✅ | 9.0M | -14% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.5M | ✅ | 15.3M | -17% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.2M | ✅ | 4.2M | 🟢 **-42%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 16.5M | ✅ | 14.3M | -13% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 31.0M | ✅ | 11.8M | 🟢 **-62%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 69.0M | ✅ | 44.5M | 🟢 **-35%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.9M | ✅ | 28.0M | -15% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 6.9M | 🟢 **-57%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 43.5M | ✅ | 39.8M | -8% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 45.1M | ✅ | 43.5M | -4% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 43.1M | -9% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 84.8M | ✅ | 49.9M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.0M | ✅ | 43.0M | -6% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.9M | ✅ | 20.1M | 🟢 **-65%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.0M | ✅ | 17.8M | -15% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 16.5M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 16.0M | ✅ | 12.9M | -20% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 151.6M | ✅ | 71.5M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.4M | ✅ | 5.0M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 43.2M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.7M | ✅ | 9.1M | 🟢 **-63%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.9M | ✅ | 10.8M | 🟢 **-65%** |
| allOf.json | allOf | 4 | ✅ | 37.7M | ✅ | 26.9M | 🟢 **-29%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.2M | ✅ | 21.5M | 🟢 **-27%** |
| allOf.json | allOf simple types | 2 | ✅ | 64.7M | ✅ | 35.0M | 🟢 **-46%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 73.1M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ✅ | 23.8M | 🟢 **-61%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 25.1M | 🟢 **-73%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 66.5M | -9% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 150.8M | ✅ | 71.6M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ✅ | 33.4M | 🟢 **-52%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 35.9M | 🟢 **-69%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.8M | ✅ | 33.6M | 🟢 **-53%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 72.5M | ✅ | 8.7M | 🟢 **-88%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 84.5M | ✅ | 34.0M | 🟢 **-60%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 41.7M | ✅ | 32.6M | 🟢 **-22%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.8M | ✅ | 35.5M | 🟢 **-59%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 69.6M | ✅ | 31.4M | 🟢 **-55%** |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ✅ | 19.5M | 🟢 **-73%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 16.0M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.8M | ✅ | 73.5M | -9% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 80.7M | ✅ | 67.5M | -16% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 10.9M | 🟢 **-82%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.3M | ✅ | 15.0M | 🟢 **-68%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.1M | ✅ | 39.5M | 🟢 **-48%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 17.3M | 🟢 **-76%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 80.5M | ✅ | 51.1M | 🟢 **-36%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 56.7M | ✅ | 28.3M | 🟢 **-50%** |
| const.json | const validation | 3 | ✅ | 60.1M | ✅ | 30.1M | 🟢 **-50%** |
| const.json | const with object | 4 | ✅ | 38.9M | ✅ | 13.5M | 🟢 **-65%** |
| const.json | const with array | 3 | ✅ | 54.0M | ✅ | 15.2M | 🟢 **-72%** |
| const.json | const with null | 2 | ✅ | 71.1M | ✅ | 42.0M | 🟢 **-41%** |
| const.json | const with false does not match 0 | 3 | ✅ | 68.2M | ✅ | 34.3M | 🟢 **-50%** |
| const.json | const with true does not match 1 | 3 | ✅ | 67.5M | ✅ | 32.5M | 🟢 **-52%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.8M | ✅ | 22.3M | 🟢 **-63%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 60.3M | ✅ | 23.1M | 🟢 **-62%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.2M | ✅ | 11.7M | 🟢 **-81%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.5M | ✅ | 11.6M | 🟢 **-81%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.1M | ✅ | 35.6M | 🟢 **-39%** |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ✅ | 37.4M | 🟢 **-45%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.9M | ✅ | 37.3M | 🟢 **-39%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.4M | ✅ | 36.2M | 🟢 **-46%** |
| const.json | nul characters in strings | 2 | ✅ | 58.2M | ✅ | 39.1M | 🟢 **-33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ✅ | 33.8M | 🟢 **-38%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.5M | ✅ | 37.9M | 🟢 **-37%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.5M | ✅ | 15.4M | 🟢 **-74%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ✅ | 8.6M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.7M | ✅ | 42.0M | 🟢 **-36%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.1M | ✅ | 26.6M | 🟢 **-60%** |
| contains.json | items + contains | 4 | ✅ | 37.6M | ✅ | 6.8M | 🟢 **-82%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.3M | ✅ | 41.7M | 🟢 **-34%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 66.9M | -5% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 84.8M | ✅ | 63.2M | 🟢 **-25%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 84.8M | ✅ | 60.3M | 🟢 **-29%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 75.8M | ✅ | 61.6M | -19% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 71.2M | ✅ | 54.8M | 🟢 **-23%** |
| default.json | invalid type for default | 2 | ✅ | 65.4M | ✅ | 59.4M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 51.3M | ✅ | 46.8M | -9% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.4M | ✅ | 36.6M | 🟢 **-30%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ✅ | 739K | 🟢 **-65%** |
| dependentRequired.json | single dependency | 7 | ✅ | 60.1M | ✅ | 43.3M | 🟢 **-28%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 84.8M | ✅ | 63.4M | 🟢 **-25%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.9M | ✅ | 27.1M | -3% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ✅ | 31.1M | 🟢 **-33%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.8M | ✅ | 36.2M | 🟢 **-30%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.2M | ✅ | 32.8M | 🟢 **-40%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.7M | ✅ | 24.5M | 🟢 **-38%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.6M | ✅ | 31.4M | -14% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.3M | ✅ | 17.9M | +9% |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.7M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.3M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ✅ | 9.8M | 🔴 **+52%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.8M | ✅ | 34.5M | 🟢 **-47%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.9M | ✅ | 10.6M | 🟢 **-76%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.0M | ✅ | 38.3M | 🟢 **-44%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 30.1M | 🔴 **+107%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 37.0M | 🟢 **-49%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 65.7M | ✅ | 27.9M | 🟢 **-58%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.4M | ✅ | 18.4M | 🟢 **-70%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 68.1M | ✅ | 29.7M | 🟢 **-56%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.7M | ✅ | 17.4M | 🟢 **-71%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.4M | ✅ | 36.8M | 🟢 **-45%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.2M | ✅ | 20.6M | 🟢 **-67%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.4M | ✅ | 37.7M | 🟢 **-44%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ✅ | 20.1M | 🟢 **-68%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 32.3M | 🟢 **-46%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.6M | ✅ | 32.3M | 🟢 **-46%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 65.2M | ✅ | 31.5M | 🟢 **-52%** |
| format.json | email format | 7 | ✅ | 76.9M | ✅ | 51.6M | 🟢 **-33%** |
| format.json | idn-email format | 7 | ✅ | 79.2M | ✅ | 46.4M | 🟢 **-41%** |
| format.json | regex format | 7 | ✅ | 71.0M | ✅ | 51.1M | 🟢 **-28%** |
| format.json | ipv4 format | 7 | ✅ | 71.1M | ✅ | 50.1M | 🟢 **-30%** |
| format.json | ipv6 format | 7 | ✅ | 70.4M | ✅ | 49.4M | 🟢 **-30%** |
| format.json | idn-hostname format | 7 | ✅ | 71.1M | ✅ | 52.4M | 🟢 **-26%** |
| format.json | hostname format | 7 | ✅ | 71.2M | ✅ | 50.2M | 🟢 **-29%** |
| format.json | date format | 7 | ✅ | 70.9M | ✅ | 51.8M | 🟢 **-27%** |
| format.json | date-time format | 7 | ✅ | 69.9M | ✅ | 52.2M | 🟢 **-25%** |
| format.json | time format | 7 | ✅ | 71.0M | ✅ | 51.0M | 🟢 **-28%** |
| format.json | json-pointer format | 7 | ✅ | 71.2M | ✅ | 51.2M | 🟢 **-28%** |
| format.json | relative-json-pointer format | 7 | ✅ | 79.0M | ✅ | 53.3M | 🟢 **-33%** |
| format.json | iri format | 7 | ✅ | 71.2M | ✅ | 52.4M | 🟢 **-26%** |
| format.json | iri-reference format | 7 | ✅ | 71.1M | ✅ | 54.2M | 🟢 **-24%** |
| format.json | uri format | 7 | ✅ | 71.1M | ✅ | 51.2M | 🟢 **-28%** |
| format.json | uri-reference format | 7 | ✅ | 71.2M | ✅ | 52.9M | 🟢 **-26%** |
| format.json | uri-template format | 7 | ✅ | 71.2M | ✅ | 52.1M | 🟢 **-27%** |
| format.json | uuid format | 7 | ✅ | 71.1M | ✅ | 51.1M | 🟢 **-28%** |
| format.json | duration format | 7 | ✅ | 71.2M | ✅ | 53.8M | 🟢 **-24%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 76.1M | ✅ | 68.4M | -10% |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.6M | ✅ | 64.7M | 🟢 **-23%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 76.1M | ✅ | 65.7M | -14% |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ✅ | 31.4M | 🟢 **-55%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.6M | ✅ | 24.0M | 🟢 **-65%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.8M | ✅ | 25.5M | 🟢 **-61%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 76.0M | ✅ | 47.1M | 🟢 **-38%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 68.1M | ✅ | 32.3M | 🟢 **-53%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.7M | ✅ | 30.3M | 🟢 **-56%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.1M | ✅ | 22.0M | 🟢 **-45%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.0M | ✅ | 25.6M | 🟢 **-34%** |
| items.json | a schema given for items | 4 | ✅ | 50.6M | ✅ | 21.6M | 🟢 **-57%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.5M | ✅ | 63.7M | 🟢 **-24%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.5M | ✅ | 22.5M | 🟢 **-64%** |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 12.3M | -3% |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 9.7M | -19% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.7M | ✅ | 39.8M | 🟢 **-45%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 43.2M | ✅ | 27.9M | 🟢 **-35%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 42.0M | ✅ | 27.2M | 🟢 **-35%** |
| items.json | items with heterogeneous array | 2 | ✅ | 66.7M | ✅ | 31.6M | 🟢 **-53%** |
| items.json | items with null instance elements | 1 | ✅ | 68.9M | ✅ | 59.1M | -14% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 82.9M | ✅ | 45.1M | 🟢 **-46%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.8M | ✅ | 21.8M | 🟢 **-61%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ✅ | 30.1M | 🟢 **-51%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 55.7M | ✅ | 26.4M | 🟢 **-53%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 38.9M | 🟢 **-45%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 33.1M | 🟢 **-50%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 35.1M | 🟢 **-36%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 30.5M | 🟢 **-43%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 33.8M | 🟢 **-38%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.6M | ✅ | 20.8M | 🟢 **-55%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.9M | ✅ | 22.7M | 🟢 **-53%** |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 37.8M | 🟢 **-45%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 40.2M | 🟢 **-42%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 82.5M | ✅ | 63.2M | 🟢 **-23%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 61.1M | ✅ | 29.3M | 🟢 **-52%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.5M | ✅ | 23.0M | 🟢 **-60%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.0M | ✅ | 31.1M | 🟢 **-49%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 49.8M | ✅ | 26.7M | 🟢 **-46%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 54.8M | ✅ | 21.1M | 🟢 **-62%** |
| minContains.json | minContains = 0 | 2 | ✅ | 83.6M | ✅ | 63.3M | 🟢 **-24%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ✅ | 34.7M | 🟢 **-47%** |
| minItems.json | minItems validation | 4 | ✅ | 68.3M | ✅ | 40.6M | 🟢 **-41%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 25.9M | 🟢 **-61%** |
| minLength.json | minLength validation | 5 | ✅ | 54.3M | ✅ | 33.3M | 🟢 **-39%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 30.3M | 🟢 **-43%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.4M | ✅ | 36.0M | 🟢 **-35%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.6M | ✅ | 24.4M | 🟢 **-49%** |
| minimum.json | minimum validation | 4 | ✅ | 69.9M | ✅ | 38.4M | 🟢 **-45%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 36.3M | 🟢 **-45%** |
| multipleOf.json | by int | 3 | ✅ | 70.6M | ✅ | 37.7M | 🟢 **-47%** |
| multipleOf.json | by number | 3 | ✅ | 61.2M | ✅ | 32.7M | 🟢 **-47%** |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 31.9M | 🟢 **-48%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.8M | ✅ | 6.8M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 10.4M | 🟢 **-85%** |
| not.json | not | 2 | ✅ | 69.8M | ✅ | 18.7M | 🟢 **-73%** |
| not.json | not multiple types | 3 | ✅ | 65.0M | ✅ | 26.5M | 🟢 **-59%** |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ✅ | 30.0M | 🟢 **-52%** |
| not.json | forbidden property | 2 | ✅ | 49.0M | ✅ | 32.7M | 🟢 **-33%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.6M | ✅ | 29.7M | 🟢 **-46%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ✅ | 30.2M | 🟢 **-48%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ✅ | 52.7M | 🟢 **-34%** |
| not.json | double negation | 1 | ✅ | 80.6M | ✅ | 75.4M | -7% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.9M | ✅ | 20.7M | 🟢 **-35%** |
| oneOf.json | oneOf | 4 | ✅ | 54.7M | ✅ | 17.9M | 🟢 **-67%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.9M | ✅ | 22.8M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 27.6M | 🟢 **-54%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 21.6M | 🟢 **-73%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 29.0M | 🟢 **-52%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 11.5M | 🟢 **-81%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 15.9M | 🟢 **-62%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.2M | ✅ | 29.0M | 🟢 **-58%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ✅ | 14.1M | 🟢 **-69%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.5M | ✅ | 16.2M | 🟢 **-65%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.3M | ✅ | 24.7M | 🟢 **-64%** |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 36.4M | 🟢 **-30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.5M | ✅ | 31.5M | 🔴 **+29%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 11.0M | 🟢 **-58%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ✅ | 6.2M | 🟢 **-56%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 7.7M | 🟢 **-49%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 6.0M | 🟢 **-70%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 12.8M | ✅ | 16.0M | 🔴 **+25%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 61.6M | ✅ | 44.3M | 🟢 **-28%** |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 60.1M | ✅ | 39.7M | 🟢 **-34%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 73.2M | ✅ | 63.3M | -14% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 73.4M | ✅ | 70.9M | -3% |
| properties.json | object properties validation | 6 | ✅ | 52.1M | ✅ | 39.3M | 🟢 **-25%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 9.6M | 🟢 **-50%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 35.2M | 🟢 **-24%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.7M | ✅ | 36.6M | 🟢 **-23%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 58.4M | -9% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.5M | ✅ | 29.1M | 🟢 **-22%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 15.4M | -19% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 72.0M | -14% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.2M | ✅ | 21.0M | 🟢 **-56%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.0M | ✅ | 25.5M | 🟢 **-33%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.7M | ✅ | 26.3M | 🟢 **-35%** |
| ref.json | root pointer ref | 4 | ✅ | 23.3M | ✅ | 16.4M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.9M | ✅ | 36.2M | 🟢 **-26%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.5M | ✅ | 36.8M | 🟢 **-33%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.5M | ✅ | 34.0M | 🟢 **-24%** |
| ref.json | nested refs | 2 | ✅ | 37.8M | ✅ | 37.7M | 0% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.6M | ✅ | 28.8M | 🟢 **-31%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ✅ | 2.0M | 🟢 **-41%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.8M | ✅ | 30.7M | 🟢 **-37%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.6M | ✅ | 29.4M | 🟢 **-42%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.8M | ✅ | 69.9M | -14% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ✅ | 23.8M | 🟢 **-61%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 6.2M | 🟢 **-26%** |
| ref.json | refs with quote | 2 | ✅ | 51.0M | ✅ | 32.1M | 🟢 **-37%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.6M | ✅ | 21.0M | 🟢 **-21%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 12.2M | 🟢 **-77%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.0M | ✅ | 32.4M | 🟢 **-31%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.7M | ✅ | 31.6M | 🟢 **-32%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.4M | ✅ | 28.9M | 🟢 **-57%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.7M | ✅ | 30.2M | 🟢 **-20%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ✅ | 16.4M | 🟢 **-58%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.8M | ✅ | 31.9M | 🟢 **-35%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.8M | ✅ | 29.5M | 🟢 **-40%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.7M | ✅ | 27.8M | 🟢 **-42%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.1M | ✅ | 29.9M | 🟢 **-35%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.4M | ✅ | 30.8M | 🟢 **-32%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ✅ | 29.0M | 🟢 **-37%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 48.2M | ✅ | 29.9M | 🟢 **-38%** |
| ref.json | ref to then | 2 | ✅ | 48.5M | ✅ | 32.9M | 🟢 **-32%** |
| ref.json | ref to else | 2 | ✅ | 48.4M | ✅ | 28.2M | 🟢 **-42%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.9M | ✅ | 28.8M | 🟢 **-40%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.3M | ✅ | 30.5M | 🟢 **-56%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 32.4M | 🟢 **-54%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.6M | ✅ | 34.4M | 🟢 **-47%** |
| refRemote.json | remote ref | 2 | ✅ | 46.3M | ✅ | 32.9M | 🟢 **-29%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.2M | ✅ | 32.0M | 🟢 **-29%** |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.0M | ✅ | 32.6M | 🟢 **-31%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.4M | ✅ | 32.7M | 🟢 **-29%** |
| refRemote.json | base URI change | 2 | ✅ | 26.1M | ✅ | 21.6M | -17% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ✅ | 24.8M | 🟢 **-23%** |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ✅ | 24.7M | 🟢 **-35%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.7M | ✅ | 9.0M | 🟢 **-71%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.2M | ✅ | 30.7M | 🟢 **-25%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 45.6M | ✅ | 32.4M | 🟢 **-29%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.4M | ✅ | 26.3M | 🟢 **-38%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.2M | ✅ | 34.5M | 🟢 **-28%** |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.9M | ✅ | 35.1M | 🟢 **-27%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 36.8M | ✅ | 33.9M | -8% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ✅ | 30.3M | 🟢 **-35%** |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 42.9M | 🟢 **-28%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 74.3M | -8% |
| required.json | required with empty array | 1 | ✅ | 80.6M | ✅ | 74.2M | -8% |
| required.json | required with escaped characters | 2 | ✅ | 43.0M | ✅ | 29.0M | 🟢 **-32%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 34.1M | 🟢 **-43%** |
| type.json | number type matches numbers | 9 | ✅ | 62.2M | ✅ | 33.2M | 🟢 **-47%** |
| type.json | string type matches strings | 9 | ✅ | 61.8M | ✅ | 37.2M | 🟢 **-40%** |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 30.4M | 🟢 **-44%** |
| type.json | array type matches arrays | 7 | ✅ | 58.0M | ✅ | 34.1M | 🟢 **-41%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 35.7M | 🟢 **-40%** |
| type.json | null type matches only the null object | 10 | ✅ | 58.8M | ✅ | 33.2M | 🟢 **-44%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.9M | ✅ | 32.0M | 🟢 **-43%** |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 46.1M | 🟢 **-34%** |
| type.json | type: array or object | 5 | ✅ | 60.4M | ✅ | 34.5M | 🟢 **-43%** |
| type.json | type: array, object or null | 5 | ✅ | 69.8M | ✅ | 39.4M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.0M | ✅ | 71.1M | -5% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.6M | ✅ | 34.7M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ✅ | 36.9M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.7M | ✅ | 61.6M | -5% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.2M | ✅ | 34.8M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 71.7M | ✅ | 66.6M | -7% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.9M | ✅ | 31.6M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.6M | ✅ | 35.4M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 68.3M | ✅ | 64.7M | -5% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.1M | ✅ | 62.0M | 🔴 **+209%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.0M | ✅ | 22.1M | 🔴 **+85%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.1M | ✅ | 18.0M | +19% |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.3M | ✅ | 26.8M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ✅ | 22.3M | 🔴 **+100%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.9M | ✅ | 32.4M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 46.1M | ✅ | 33.5M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.0M | ✅ | 31.4M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.6M | ✅ | 28.8M | 🟢 **-34%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.3M | ✅ | 23.3M | -4% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 75.6M | ✅ | 50.9M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.9M | ✅ | 64.5M | -7% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.7M | ✅ | 26.2M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.7M | ✅ | 69.4M | 🔴 **+32%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.1M | ✅ | 15.6M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.4M | ✅ | 29.7M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.3M | ✅ | 26.4M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ✅ | 11.6M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 83.5M | ✅ | 64.2M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.3M | ✅ | 12.8M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.7M | ✅ | 25.7M | -7% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.1M | ✅ | 8.6M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.9M | ✅ | 54.9M | -14% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.5M | ✅ | 50.6M | 🔴 **+84%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 12.8M | ✅ | 8.3M | 🟢 **-35%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.0M | ✅ | 12.5M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.1M | ✅ | 20.9M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.5M | ✅ | 14.8M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ✅ | 15.9M | -8% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.5M | ✅ | 20.6M | -19% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.8M | ✅ | 26.2M | -15% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ✅ | 25.1M | -10% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.7M | ✅ | 25.6M | -8% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ✅ | 22.2M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.7M | ✅ | 23.1M | -19% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.7M | ✅ | 56.9M | 🔴 **+99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.5M | ✅ | 59.4M | 🔴 **+115%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.6M | ✅ | 22.2M | -6% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 28.5M | +9% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.6M | ✅ | 21.1M | +7% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ✅ | 28.3M | 🔴 **+139%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.2M | ✅ | 19.2M | 🟢 **-24%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.1M | ✅ | 25.8M | -17% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.1M | ✅ | 15.9M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.9M | ✅ | 12.3M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 12.0M | 🟢 **-39%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 4.4M | 🟢 **-36%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.8M | ✅ | 50.8M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.4M | ✅ | 43.3M | -12% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.5M | ✅ | 11.8M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.4M | ✅ | 22.5M | +10% |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.7M | ✅ | 19.8M | -16% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 9.6M | 🟢 **-45%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.4M | ✅ | 18.1M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.5M | ✅ | 22.1M | 🟢 **-49%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.7M | ✅ | 49.0M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.9M | ✅ | 49.7M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 41.4M | 🟢 **-33%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 70.1M | ✅ | 35.7M | 🟢 **-49%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 56.0M | ✅ | 5.8M | 🟢 **-90%** |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 11.5M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 68.2M | -15% |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 24.1M | 🟢 **-59%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.9M | ✅ | 67.5M | -5% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 22.9M | 🟢 **-59%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 62.7M | -13% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 24.2M | 🟢 **-57%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 76.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 58.9M | ✅ | 40.7M | 🟢 **-31%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 84.9M | ✅ | 60.3M | 🟢 **-29%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 28.4M | -14% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.9M | ✅ | 30.5M | 🟢 **-34%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.7M | ✅ | 34.7M | 🟢 **-33%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.0M | ✅ | 28.6M | 🟢 **-50%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.9M | ✅ | 24.2M | 🟢 **-38%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.2M | ✅ | 20.6M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 21.2M | +8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 21.0M | -19% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 20.7M | 🟢 **-24%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 19.5M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 22.0M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 21.4M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.7M | ✅ | 21.2M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 25.1M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.3M | ✅ | 21.6M | 🟢 **-26%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 16.5M | -2% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 13.4M | -11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 13.7M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.5M | ✅ | 19.7M | 🟢 **-23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ✅ | 18.8M | -11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ✅ | 19.3M | -16% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 17.8M | -11% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 17.5M | -13% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.1M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 8.7M | +4% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ✅ | 3.0M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 7.9M | ✅ | 7.9M | 0% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.2M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 48.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ✅ | 75K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ✅ | 24.4M | 🟢 **-42%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ✅ | 3.0M | 🟢 **-74%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ✅ | 22.2M | 🟢 **-29%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.8M | ✅ | 855K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.5M | ✅ | 26.3M | 🟢 **-34%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ✅ | 5.6M | -11% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.3M | ✅ | 53.4M | 🟢 **-33%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 9.4M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.4M | ✅ | 16.1M | +5% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.4M | 🟢 **-32%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 13.7M | -10% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.0M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.4M | ✅ | 10.8M | 🟢 **-69%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 58.5M | ✅ | 36.9M | 🟢 **-37%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ✅ | 22.8M | 🟢 **-23%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 6.8M | 🟢 **-58%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.0M | ✅ | 32.3M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.2M | ✅ | 31.2M | 🟢 **-36%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.0M | ✅ | 29.8M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.3M | ✅ | 33.2M | 🟢 **-52%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.9M | ✅ | 30.3M | 🟢 **-39%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.7M | ❌ | - | - |
