# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 172/199 | 13.1M | 172 | 🟢 **-51%** |
| draft6 | 276 | ✅ 276 | 29.7M | 269/276 | 15.0M | 269 | 🟢 **-49%** |
| draft7 | 313 | ✅ 313 | 16.3M | 296/313 | 13.4M | 296 | -17% |
| draft2019-09 | 435 | ✅ 435 | 17.5M | 413/435 | 6.3M | 413 | 🟢 **-64%** |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 398/448 | 5.0M | 398 | 🟢 **-74%** |
| **Total** | 1671 | 1670/1671 | 19.8M | 1548/1671 | 7.9M | 1548 | 🟢 **-60%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **3.32x faster** (38 ns vs 126 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.7M | ✅ | 7.3M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.1M | ✅ | 72.8M | 🟢 **-54%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.8M | ✅ | 49.8M | 🟢 **-62%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 68.9M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 126.1M | ✅ | 65.4M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ✅ | 27.7M | 🟢 **-20%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 68.4M | ✅ | 36.9M | 🟢 **-46%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 48.5M | -14% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.2M | ✅ | 75.0M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.8M | ✅ | 25.1M | 🟢 **-45%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.1M | ✅ | 23.2M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.2M | ✅ | 17.1M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 48.1M | ✅ | 13.4M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.8M | ✅ | 74.4M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 7.7M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 46.7M | ✅ | 46.6M | 0% |
| allOf.json | allOf | 4 | ✅ | 49.1M | ✅ | 12.1M | 🟢 **-75%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.0M | ✅ | 26.4M | +15% |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 42.3M | 🟢 **-63%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 73.8M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 74.4M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 48.3M | -13% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 48.8M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 50.5M | -12% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 4.7M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 60.0M | ✅ | 23.3M | 🟢 **-61%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ✅ | 19.8M | 🟢 **-61%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.1M | ✅ | 27.7M | 🟢 **-37%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.1M | ✅ | 66.5M | 🟢 **-61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 27.2M | 🟢 **-53%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 59.5M | 🟢 **-41%** |
| default.json | invalid string value for default | 2 | ✅ | 48.7M | ✅ | 44.0M | -10% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.7M | ✅ | 44.2M | 🟢 **-44%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 92.4M | ✅ | 49.4M | 🟢 **-47%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 28.9M | ✅ | 36.6M | 🔴 **+27%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.7M | ✅ | 38.3M | 🟢 **-35%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.2M | ✅ | 20.8M | +15% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ✅ | 38.5M | 🟢 **-28%** |
| enum.json | simple enum validation | 2 | ✅ | 56.6M | ✅ | 46.3M | -18% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.4M | ✅ | 17.7M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.4M | ✅ | 45.2M | 🟢 **-24%** |
| enum.json | enums in properties | 6 | ✅ | 48.9M | ✅ | 26.0M | 🟢 **-47%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.5M | ✅ | 44.2M | -11% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.4M | ✅ | 39.3M | 🟢 **-64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.1M | ✅ | 25.8M | 🟢 **-46%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 106.9M | ✅ | 29.4M | 🟢 **-73%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.9M | ✅ | 25.9M | 🟢 **-46%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.4M | ✅ | 28.9M | 🟢 **-74%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.6M | ✅ | 28.9M | 🟢 **-46%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 38.2M | 🟢 **-67%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ✅ | 28.0M | 🟢 **-47%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 45.8M | 🟢 **-48%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ✅ | 44.7M | -3% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 45.2M | 🟢 **-50%** |
| format.json | email format | 6 | ✅ | 74.0M | ✅ | 55.0M | 🟢 **-26%** |
| format.json | ipv4 format | 6 | ✅ | 163.3M | ✅ | 54.7M | 🟢 **-67%** |
| format.json | ipv6 format | 6 | ✅ | 79.2M | ✅ | 55.3M | 🟢 **-30%** |
| format.json | hostname format | 6 | ✅ | 163.7M | ✅ | 54.9M | 🟢 **-66%** |
| format.json | date-time format | 6 | ✅ | 78.5M | ✅ | 45.5M | 🟢 **-42%** |
| format.json | uri format | 6 | ✅ | 163.6M | ✅ | 55.2M | 🟢 **-66%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 33.7M | -6% |
| items.json | a schema given for items | 4 | ✅ | 89.0M | ✅ | 42.6M | 🟢 **-52%** |
| items.json | an array of schemas for items | 6 | ✅ | 59.4M | ✅ | 35.9M | 🟢 **-40%** |
| items.json | items and subitems | 6 | ✅ | 35.3M | ✅ | 20.9M | 🟢 **-41%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 12.7M | -2% |
| items.json | items with null instance elements | 1 | ✅ | 70.3M | ✅ | 67.1M | -5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 43.6M | 🟢 **-42%** |
| maxItems.json | maxItems validation | 4 | ✅ | 65.6M | ✅ | 47.0M | 🟢 **-28%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.6M | ✅ | 47.0M | -12% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.1M | ✅ | 42.4M | -14% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.2M | ✅ | 31.8M | -19% |
| maximum.json | maximum validation | 4 | ✅ | 61.5M | ✅ | 45.9M | 🟢 **-25%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ✅ | 48.3M | 🟢 **-21%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.8M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ✅ | 47.7M | 🟢 **-27%** |
| minLength.json | minLength validation | 5 | ✅ | 47.6M | ✅ | 43.3M | -9% |
| minProperties.json | minProperties validation | 6 | ✅ | 50.3M | ✅ | 42.1M | -16% |
| minimum.json | minimum validation | 4 | ✅ | 61.9M | ✅ | 45.3M | 🟢 **-27%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 61.8M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 53.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 58.0M | ✅ | 47.3M | -18% |
| multipleOf.json | by int | 3 | ✅ | 61.3M | ✅ | 43.8M | 🟢 **-29%** |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 42.6M | 🟢 **-24%** |
| multipleOf.json | by small number | 2 | ✅ | 51.5M | ✅ | 40.2M | 🟢 **-22%** |
| multipleOf.json | float division = inf | 1 | ✅ | 39.0M | ✅ | 8.8M | 🟢 **-77%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 9.2M | 🟢 **-85%** |
| not.json | not | 2 | ✅ | 55.9M | ✅ | 43.4M | 🟢 **-22%** |
| not.json | not multiple types | 3 | ✅ | 49.0M | ✅ | 37.1M | 🟢 **-24%** |
| not.json | not more complex schema | 3 | ✅ | 52.7M | ✅ | 39.9M | 🟢 **-24%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 43.4M | +3% |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.9M | ✅ | 39.2M | -4% |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 73.5M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 54.3M | ✅ | 22.6M | 🟢 **-58%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.5M | ✅ | 24.6M | -16% |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.3M | ✅ | 20.0M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 40.2M | 🟢 **-27%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.3M | ✅ | 16.4M | 🟢 **-57%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.2M | ✅ | 20.9M | 🟢 **-48%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 28.1M | 🟢 **-50%** |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ✅ | 44.7M | -9% |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 31.1M | 🟢 **-33%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.9M | ✅ | 13.0M | 🟢 **-48%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 7.6M | 🟢 **-48%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.9M | ✅ | 8.1M | 🟢 **-42%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 21.4M | 🔴 **+23%** |
| properties.json | object properties validation | 6 | ✅ | 45.7M | ✅ | 43.7M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 9.5M | 🟢 **-50%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.0M | ✅ | 43.0M | +8% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 60.0M | +0% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.0M | ✅ | 21.5M | -2% |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.4M | ✅ | 43.5M | +3% |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 42.1M | -9% |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ✅ | 39.7M | +6% |
| ref.json | nested refs | 2 | ✅ | 37.3M | ✅ | 46.8M | 🔴 **+26%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 43.7M | +6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.7M | ✅ | 43.8M | +2% |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 42.4M | ✅ | 41.3M | -2% |
| ref.json | Location-independent identifier | 2 | ✅ | 56.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 43.0M | ✅ | 17.2M | 🟢 **-60%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.8M | ✅ | 47.2M | -15% |
| refRemote.json | remote ref | 2 | ✅ | 51.2M | ✅ | 47.9M | -6% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 53.9M | ✅ | 44.4M | -18% |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ✅ | 47.8M | -11% |
| refRemote.json | base URI change | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 47.6M | -10% |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 74.0M | 🟢 **-54%** |
| required.json | required with escaped characters | 2 | ✅ | 40.6M | ✅ | 37.6M | -7% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.4M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 41.3M | ✅ | 36.7M | -11% |
| type.json | number type matches numbers | 9 | ✅ | 45.7M | ✅ | 42.8M | -6% |
| type.json | string type matches strings | 9 | ✅ | 48.4M | ✅ | 45.7M | -6% |
| type.json | object type matches objects | 7 | ✅ | 41.4M | ✅ | 37.0M | -11% |
| type.json | array type matches arrays | 7 | ✅ | 44.5M | ✅ | 40.4M | -9% |
| type.json | boolean type matches booleans | 10 | ✅ | 44.0M | ✅ | 37.6M | -15% |
| type.json | null type matches only the null object | 10 | ✅ | 42.8M | ✅ | 35.9M | -16% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.1M | ✅ | 37.6M | -18% |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 49.8M | -11% |
| type.json | type: array or object | 5 | ✅ | 49.6M | ✅ | 42.9M | -13% |
| type.json | type: array, object or null | 5 | ✅ | 55.7M | ✅ | 44.4M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 10.4M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ✅ | 21.9M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 26.8M | 🔴 **+50%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 54.1M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.0M | ✅ | 52.9M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.8M | ✅ | 49.0M | -17% |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ✅ | 14.4M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 67.9M | -11% |
| optional/bignum.json | string | 1 | ✅ | 42.5M | ✅ | 39.9M | -6% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 68.0M | -3% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ✅ | 65.2M | -7% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.6M | ✅ | 24.8M | 🟢 **-49%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.3M | ✅ | 25.4M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.5M | ✅ | 27.7M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.2M | ✅ | 27.8M | 🔴 **+53%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 27.3M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.5M | ✅ | 29.1M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 27.6M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 27.7M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 30.2M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 24.5M | -5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.3M | ✅ | 17.6M | +15% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.0M | ✅ | 13.8M | -2% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 14.5M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.7M | ✅ | 26.9M | +9% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ✅ | 20.4M | 0% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ✅ | 18.6M | -17% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 21.0M | +8% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 20.7M | +4% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.0M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 8.8M | +2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.3M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 20.5M | +16% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.3M | ✅ | 27.8M | 🟢 **-21%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ✅ | 2.7M | 🟢 **-83%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.6M | ✅ | 49.6M | 🟢 **-34%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.2M | 🟢 **-33%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.9M | ✅ | 24.7M | -5% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ✅ | 8.8M | 🟢 **-42%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.1M | ✅ | 53.3M | -10% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.6M | ✅ | 35.9M | -12% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.3M | ✅ | 69.4M | 🟢 **-56%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.0M | ✅ | 49.1M | 🟢 **-36%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 167.7M | ✅ | 68.5M | 🟢 **-59%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 66.1M | 🟢 **-20%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 8.4M | 🟢 **-85%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.6M | ✅ | 37.8M | +1% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 47.8M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.6M | ✅ | 74.2M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.3M | ✅ | 32.9M | 🟢 **-51%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 23.2M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.3M | ✅ | 16.6M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ✅ | 13.0M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 74.1M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 7.8M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 46.8M | 🟢 **-30%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 32.7M | -6% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 20.2M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ✅ | 48.1M | -6% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 73.8M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 40.2M | -19% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 40.3M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 157.4M | ✅ | 72.3M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 73.6M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 49.1M | 🟢 **-21%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 48.9M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 49.1M | 🟢 **-24%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 9.9M | 🟢 **-88%** |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ✅ | 27.1M | 🟢 **-59%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.7M | ✅ | 18.3M | 🟢 **-60%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 74.1M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 157.7M | ✅ | 65.0M | 🟢 **-59%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 20.0M | 🟢 **-60%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 24.4M | 🟢 **-67%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 166.8M | ✅ | 64.0M | 🟢 **-62%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ✅ | 27.6M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.6M | ✅ | 55.3M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 38.5M | 🟢 **-58%** |
| const.json | const validation | 3 | ✅ | 54.9M | ✅ | 38.4M | 🟢 **-30%** |
| const.json | const with object | 4 | ✅ | 37.9M | ✅ | 15.0M | 🟢 **-60%** |
| const.json | const with array | 3 | ✅ | 25.1M | ✅ | 15.9M | 🟢 **-37%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 49.3M | 🟢 **-58%** |
| const.json | const with false does not match 0 | 3 | ✅ | 53.3M | ✅ | 39.9M | 🟢 **-25%** |
| const.json | const with true does not match 1 | 3 | ✅ | 54.7M | ✅ | 39.6M | 🟢 **-28%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 26.2M | 🟢 **-52%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 26.2M | 🟢 **-73%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 47.5M | ✅ | 12.9M | 🟢 **-73%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ✅ | 12.6M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 51.6M | ✅ | 39.6M | 🟢 **-23%** |
| const.json | const with 1 does not match true | 3 | ✅ | 57.9M | ✅ | 43.8M | 🟢 **-24%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ✅ | 41.3M | 🟢 **-26%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.0M | ✅ | 42.4M | 🟢 **-61%** |
| const.json | nul characters in strings | 2 | ✅ | 53.8M | ✅ | 46.3M | -14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 45.2M | 🟢 **-42%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 46.5M | -17% |
| contains.json | contains keyword validation | 6 | ✅ | 90.1M | ✅ | 15.1M | 🟢 **-83%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ✅ | 14.3M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 46.1M | 🟢 **-56%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.6M | ✅ | 31.9M | 🟢 **-45%** |
| contains.json | items + contains | 4 | ✅ | 59.5M | ✅ | 7.0M | 🟢 **-88%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 65.9M | -19% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 58.0M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 49.0M | -7% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.0M | ✅ | 44.4M | 🟢 **-43%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ✅ | 1.5M | 🟢 **-88%** |
| dependencies.json | dependencies | 7 | ✅ | 50.4M | ✅ | 48.8M | -3% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 171.5M | ✅ | 67.7M | 🟢 **-61%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ✅ | 33.7M | -15% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ✅ | 38.0M | -6% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 82.5M | ✅ | 41.6M | 🟢 **-50%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ✅ | 21.6M | +17% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 26.6M | ✅ | 37.9M | 🔴 **+42%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 49.1M | 🟢 **-23%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 11.3M | 🟢 **-82%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 61.2M | ✅ | 45.2M | 🟢 **-26%** |
| enum.json | enums in properties | 6 | ✅ | 54.1M | ✅ | 35.4M | 🟢 **-35%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.7M | ✅ | 45.4M | 🟢 **-24%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ✅ | 39.5M | 🟢 **-64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ✅ | 21.1M | 🟢 **-59%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.5M | ✅ | 38.9M | 🟢 **-64%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.1M | ✅ | 21.0M | 🟢 **-55%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.5M | ✅ | 51.2M | 🟢 **-55%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.4M | ✅ | 22.5M | 🟢 **-60%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 113.8M | ✅ | 42.1M | 🟢 **-63%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ✅ | 22.5M | 🟢 **-60%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 45.5M | 🟢 **-49%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ✅ | 41.5M | 🟢 **-25%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.5M | ✅ | 40.7M | 🟢 **-64%** |
| format.json | email format | 6 | ✅ | 81.0M | ✅ | 55.2M | 🟢 **-32%** |
| format.json | ipv4 format | 6 | ✅ | 147.6M | ✅ | 49.3M | 🟢 **-67%** |
| format.json | ipv6 format | 6 | ✅ | 85.2M | ✅ | 55.4M | 🟢 **-35%** |
| format.json | hostname format | 6 | ✅ | 156.4M | ✅ | 55.9M | 🟢 **-64%** |
| format.json | date-time format | 6 | ✅ | 81.2M | ✅ | 55.5M | 🟢 **-32%** |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ✅ | 55.0M | 🟢 **-65%** |
| format.json | uri format | 6 | ✅ | 88.5M | ✅ | 55.7M | 🟢 **-37%** |
| format.json | uri-reference format | 6 | ✅ | 157.0M | ✅ | 55.7M | 🟢 **-65%** |
| format.json | uri-template format | 6 | ✅ | 88.6M | ✅ | 54.8M | 🟢 **-38%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 34.6M | 🟢 **-40%** |
| items.json | a schema given for items | 4 | ✅ | 60.5M | ✅ | 43.2M | 🟢 **-29%** |
| items.json | an array of schemas for items | 6 | ✅ | 106.9M | ✅ | 50.3M | 🟢 **-53%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 167.5M | ✅ | 67.9M | 🟢 **-59%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 40.4M | 🟢 **-61%** |
| items.json | items with boolean schemas | 3 | ✅ | 61.9M | ✅ | 43.6M | 🟢 **-30%** |
| items.json | items and subitems | 6 | ✅ | 35.3M | ✅ | 21.7M | 🟢 **-39%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 11.7M | -13% |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 67.3M | -13% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 68.5M | -17% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 47.2M | 🟢 **-36%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 47.4M | 🟢 **-25%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.6M | ✅ | 47.3M | -19% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.5M | ✅ | 43.6M | -15% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.8M | ✅ | 42.0M | 🟢 **-22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 31.4M | 🟢 **-24%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.8M | ✅ | 34.5M | 🟢 **-21%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 47.6M | 🟢 **-31%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 47.6M | 🟢 **-28%** |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ✅ | 46.9M | 🟢 **-36%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 47.0M | 🟢 **-26%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 42.8M | -19% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 43.2M | -17% |
| minProperties.json | minProperties validation | 6 | ✅ | 54.2M | ✅ | 43.0M | 🟢 **-21%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ✅ | 34.3M | -18% |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 47.3M | 🟢 **-31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.0M | ✅ | 47.4M | 🟢 **-27%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 43.4M | 🟢 **-37%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 42.6M | 🟢 **-33%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 40.2M | 🟢 **-30%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 8.9M | 🟢 **-79%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 9.2M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 40.5M | 🟢 **-36%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 38.1M | 🟢 **-32%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 31.8M | 🟢 **-45%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 39.5M | -14% |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 32.1M | 🟢 **-35%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ✅ | 37.8M | 🟢 **-23%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.4M | ✅ | 54.3M | 🟢 **-68%** |
| not.json | double negation | 1 | ✅ | 158.6M | ✅ | 74.0M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 22.3M | 🟢 **-56%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.4M | ✅ | 26.0M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 34.3M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.7M | ✅ | 27.1M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 36.5M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 18.5M | 🟢 **-63%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 25.8M | 🟢 **-36%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 37.7M | 🟢 **-39%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.9M | ✅ | 16.5M | 🟢 **-63%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.5M | ✅ | 21.1M | 🟢 **-49%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 28.1M | 🟢 **-55%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ✅ | 43.3M | -18% |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 26.1M | 🟢 **-46%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 13.7M | 🟢 **-47%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 7.8M | 🟢 **-45%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 7.7M | 🟢 **-55%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 8.9M | 🟢 **-55%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 20.7M | +16% |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 43.3M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 9.6M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ✅ | 40.2M | -6% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 43.5M | -3% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.9M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.0M | ✅ | 30.5M | 🟢 **-32%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 14.8M | 🟢 **-25%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 166.9M | ✅ | 67.5M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ✅ | 27.4M | 🟢 **-37%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.1M | ✅ | 31.4M | 🟢 **-24%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 33.0M | 🟢 **-22%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 20.2M | -17% |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 42.1M | -9% |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 38.9M | 🟢 **-24%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 39.3M | -3% |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 42.5M | -11% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ✅ | 4.8M | 🟢 **-82%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 41.5M | -11% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.6M | ✅ | 40.6M | -13% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 43.1M | 🟢 **-73%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 40.7M | -18% |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 6.6M | 🟢 **-28%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 42.8M | -9% |
| ref.json | Location-independent identifier | 2 | ✅ | 50.9M | ✅ | 49.1M | -3% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.6M | ✅ | 47.7M | 🟢 **-20%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 58.5M | ✅ | 47.8M | -18% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 14.3M | 🟢 **-70%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.7M | ✅ | 33.4M | -9% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.1M | ✅ | 32.0M | -6% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 24.0M | 🟢 **-28%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 43.6M | -7% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 42.0M | -10% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 42.6M | -9% |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 43.9M | -6% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 43.5M | -7% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ✅ | 42.0M | -10% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.2M | ✅ | 41.0M | 🟢 **-32%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.1M | ✅ | 48.4M | 🟢 **-22%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 48.9M | 🟢 **-22%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.3M | ✅ | 46.5M | -16% |
| refRemote.json | remote ref | 2 | ✅ | 53.3M | ✅ | 47.1M | -12% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.0M | ✅ | 47.6M | -13% |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.0M | ✅ | 46.4M | -17% |
| refRemote.json | base URI change | 2 | ✅ | 32.3M | ✅ | 26.9M | -17% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ✅ | 25.1M | 🟢 **-26%** |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ✅ | 27.3M | 🟢 **-31%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.2M | ✅ | 11.4M | 🟢 **-70%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.9M | ✅ | 36.4M | 🟢 **-24%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.8M | ✅ | 41.7M | -13% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.0M | ✅ | 29.1M | 🟢 **-29%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.9M | ✅ | 41.8M | -11% |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 49.0M | -16% |
| required.json | required default validation | 1 | ✅ | 158.1M | ✅ | 73.2M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 158.6M | ✅ | 74.2M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 44.6M | ✅ | 38.0M | -15% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 40.1M | 🟢 **-24%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 39.7M | 🟢 **-28%** |
| type.json | string type matches strings | 9 | ✅ | 54.4M | ✅ | 43.7M | -20% |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 39.4M | -15% |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 40.4M | 🟢 **-21%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 39.0M | 🟢 **-25%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 42.7M | -13% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.0M | ✅ | 37.3M | 🟢 **-27%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 50.2M | -19% |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 41.0M | 🟢 **-25%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 44.4M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 7.3M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 19.7M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 25.7M | 🔴 **+41%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.4M | ✅ | 53.9M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 54.2M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ✅ | 49.5M | 🟢 **-23%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 68.3M | -19% |
| optional/bignum.json | string | 1 | ✅ | 47.5M | ✅ | 39.8M | -16% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.4M | -12% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 38.3M | -16% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.8M | -12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 38.5M | -16% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 26.2M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.9M | ✅ | 27.7M | +3% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 26.8M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 27.4M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 26.5M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 28.4M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 26.5M | +0% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.3M | ✅ | 26.2M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 27.6M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 23.9M | -14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ✅ | 17.8M | +9% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 13.0M | -10% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 13.8M | -4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.9M | ✅ | 25.8M | -1% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ✅ | 21.2M | +8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ✅ | 22.3M | 0% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ✅ | 20.3M | +1% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 21.5M | +12% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 9.1M | +11% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 8.8M | -2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ✅ | 3.0M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ✅ | 22.0M | 🔴 **+21%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ✅ | 30.2M | 🟢 **-22%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ✅ | 25.3M | -16% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ✅ | 55.3M | 🟢 **-33%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 9.0M | -8% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ✅ | 15.4M | -4% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.2M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ✅ | 14.5M | 🟢 **-64%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.3M | ✅ | 10.1M | 🟢 **-77%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 42.9M | ✅ | 12.5M | 🟢 **-71%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.7M | ✅ | 26.5M | 0% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ✅ | 9.1M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 64.5M | ✅ | 8.8M | 🟢 **-86%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.3M | ✅ | 34.0M | 🟢 **-21%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.5M | ✅ | 71.9M | 🟢 **-59%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.4M | ✅ | 47.9M | 🟢 **-38%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 191.0M | ✅ | 68.0M | 🟢 **-64%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 85.4M | ✅ | 66.8M | 🟢 **-22%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 62.9M | ✅ | 8.3M | 🟢 **-87%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.0M | ✅ | 34.5M | -16% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.0M | ✅ | 38.6M | 🟢 **-66%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.8M | ✅ | 73.7M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 69.5M | ✅ | 33.4M | 🟢 **-52%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.1M | ✅ | 21.7M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.1M | ✅ | 16.0M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.4M | ✅ | 13.2M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.5M | ✅ | 74.2M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.3M | ✅ | 7.2M | 🟢 **-75%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 70.4M | ✅ | 46.9M | 🟢 **-33%** |
| allOf.json | allOf | 4 | ✅ | 35.4M | ✅ | 34.9M | -1% |
| allOf.json | allOf with base schema | 5 | ✅ | 32.1M | ✅ | 10.2M | 🟢 **-68%** |
| allOf.json | allOf simple types | 2 | ✅ | 62.4M | ✅ | 43.8M | 🟢 **-30%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ✅ | 72.4M | 🟢 **-58%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 51.6M | ✅ | 38.1M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 95.0M | ✅ | 37.1M | 🟢 **-61%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 73.3M | 🟢 **-58%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.6M | ✅ | 73.2M | 🟢 **-58%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 65.6M | ✅ | 46.8M | 🟢 **-29%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 123.4M | ✅ | 46.1M | 🟢 **-63%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.0M | ✅ | 47.9M | 🟢 **-29%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ✅ | 9.8M | 🟢 **-88%** |
| anyOf.json | anyOf | 4 | ✅ | 61.6M | ✅ | 26.3M | 🟢 **-57%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 20.2M | 🟢 **-61%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.7M | ✅ | 74.3M | 🟢 **-57%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 165.3M | ✅ | 60.1M | 🟢 **-64%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 51.5M | ✅ | 18.8M | 🟢 **-64%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 88.2M | ✅ | 32.4M | 🟢 **-63%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 146.5M | ✅ | 64.4M | 🟢 **-56%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 123.6M | ✅ | 25.4M | 🟢 **-79%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 151.5M | ✅ | 55.3M | 🟢 **-64%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.7M | ✅ | 37.9M | 🟢 **-57%** |
| const.json | const validation | 3 | ✅ | 55.9M | ✅ | 37.2M | 🟢 **-33%** |
| const.json | const with object | 4 | ✅ | 53.6M | ✅ | 15.1M | 🟢 **-72%** |
| const.json | const with array | 3 | ✅ | 46.6M | ✅ | 16.9M | 🟢 **-64%** |
| const.json | const with null | 2 | ✅ | 123.9M | ✅ | 46.5M | 🟢 **-62%** |
| const.json | const with false does not match 0 | 3 | ✅ | 59.2M | ✅ | 39.9M | 🟢 **-33%** |
| const.json | const with true does not match 1 | 3 | ✅ | 106.9M | ✅ | 39.7M | 🟢 **-63%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.9M | ✅ | 26.3M | 🟢 **-48%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 92.7M | ✅ | 26.3M | 🟢 **-72%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.5M | ✅ | 13.1M | 🟢 **-74%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ✅ | 12.9M | 🟢 **-86%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.2M | ✅ | 39.5M | 🟢 **-24%** |
| const.json | const with 1 does not match true | 3 | ✅ | 94.2M | ✅ | 42.7M | 🟢 **-55%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 56.7M | ✅ | 43.1M | 🟢 **-24%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ✅ | 42.3M | 🟢 **-63%** |
| const.json | nul characters in strings | 2 | ✅ | 55.5M | ✅ | 45.8M | -17% |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.5M | ✅ | 44.7M | 🟢 **-48%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 57.4M | ✅ | 47.5M | -17% |
| contains.json | contains keyword validation | 6 | ✅ | 104.3M | ✅ | 18.9M | 🟢 **-82%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.6M | ✅ | 13.6M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 113.4M | ✅ | 46.3M | 🟢 **-59%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 50.4M | ✅ | 32.4M | 🟢 **-36%** |
| contains.json | items + contains | 4 | ✅ | 59.2M | ✅ | 7.1M | 🟢 **-88%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.6M | ✅ | 47.6M | 🟢 **-20%** |
| contains.json | contains with null instance elements | 1 | ✅ | 133.3M | ✅ | 58.3M | 🟢 **-56%** |
| default.json | invalid type for default | 2 | ✅ | 66.9M | ✅ | 59.9M | -10% |
| default.json | invalid string value for default | 2 | ✅ | 71.1M | ✅ | 48.0M | 🟢 **-33%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.1M | ✅ | 40.7M | -14% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.6M | ✅ | 1.4M | 🟢 **-88%** |
| dependencies.json | dependencies | 7 | ✅ | 58.2M | ✅ | 49.3M | -15% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.1M | ✅ | 65.1M | 🟢 **-67%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.3M | ✅ | 33.0M | +6% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.4M | ✅ | 34.8M | -14% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 49.4M | ✅ | 42.1M | -15% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 21.9M | 🔴 **+24%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.2M | ✅ | 39.4M | +6% |
| enum.json | simple enum validation | 2 | ✅ | 64.3M | ✅ | 51.1M | 🟢 **-21%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.5M | ✅ | 11.3M | 🟢 **-74%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.1M | ✅ | 48.4M | -19% |
| enum.json | enums in properties | 6 | ✅ | 37.2M | ✅ | 36.0M | -3% |
| enum.json | enum with escaped characters | 3 | ✅ | 68.6M | ✅ | 51.2M | 🟢 **-25%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 57.2M | ✅ | 39.6M | 🟢 **-31%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.5M | ✅ | 21.3M | 🟢 **-62%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.6M | ✅ | 39.4M | 🟢 **-35%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ✅ | 21.0M | 🟢 **-62%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 69.4M | ✅ | 45.8M | 🟢 **-34%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.7M | ✅ | 21.6M | 🟢 **-66%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 69.2M | ✅ | 43.8M | 🟢 **-37%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.4M | ✅ | 22.5M | 🟢 **-64%** |
| enum.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 45.8M | -14% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.1M | ✅ | 40.7M | 🟢 **-32%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 60.0M | ✅ | 41.5M | 🟢 **-31%** |
| format.json | email format | 6 | ✅ | 87.7M | ✅ | 55.2M | 🟢 **-37%** |
| format.json | idn-email format | 6 | ✅ | 93.4M | ✅ | 55.2M | 🟢 **-41%** |
| format.json | regex format | 6 | ✅ | 93.7M | ✅ | 55.7M | 🟢 **-41%** |
| format.json | ipv4 format | 6 | ✅ | 93.6M | ✅ | 55.8M | 🟢 **-40%** |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 55.2M | 🟢 **-41%** |
| format.json | idn-hostname format | 6 | ✅ | 91.1M | ✅ | 54.1M | 🟢 **-41%** |
| format.json | hostname format | 6 | ✅ | 93.6M | ✅ | 55.5M | 🟢 **-41%** |
| format.json | date format | 6 | ✅ | 93.8M | ✅ | 55.2M | 🟢 **-41%** |
| format.json | date-time format | 6 | ✅ | 93.0M | ✅ | 55.7M | 🟢 **-40%** |
| format.json | time format | 6 | ✅ | 90.7M | ✅ | 55.4M | 🟢 **-39%** |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ✅ | 55.6M | 🟢 **-40%** |
| format.json | relative-json-pointer format | 6 | ✅ | 84.9M | ✅ | 54.8M | 🟢 **-36%** |
| format.json | iri format | 6 | ✅ | 92.9M | ✅ | 55.5M | 🟢 **-40%** |
| format.json | iri-reference format | 6 | ✅ | 83.2M | ✅ | 55.3M | 🟢 **-34%** |
| format.json | uri format | 6 | ✅ | 93.0M | ✅ | 55.6M | 🟢 **-40%** |
| format.json | uri-reference format | 6 | ✅ | 93.4M | ✅ | 55.2M | 🟢 **-41%** |
| format.json | uri-template format | 6 | ✅ | 80.3M | ✅ | 55.5M | 🟢 **-31%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 190.4M | ✅ | 68.9M | 🟢 **-64%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 189.0M | ✅ | 68.3M | 🟢 **-64%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 188.0M | ✅ | 67.7M | 🟢 **-64%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.0M | ✅ | 39.1M | 🟢 **-44%** |
| if-then-else.json | if and else without then | 3 | ✅ | 71.3M | ✅ | 38.1M | 🟢 **-47%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 62.8M | ✅ | 28.2M | 🟢 **-55%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 191.1M | ✅ | 68.3M | 🟢 **-64%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 65.6M | ✅ | 49.5M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.9M | ✅ | 47.4M | 🟢 **-26%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.3M | ✅ | 30.7M | 🟢 **-32%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.9M | ✅ | 37.6M | +2% |
| items.json | a schema given for items | 4 | ✅ | 59.6M | ✅ | 43.5M | 🟢 **-27%** |
| items.json | an array of schemas for items | 6 | ✅ | 63.0M | ✅ | 49.6M | 🟢 **-21%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.6M | ✅ | 69.1M | 🟢 **-58%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 42.8M | 🟢 **-31%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ✅ | 46.0M | 🟢 **-26%** |
| items.json | items and subitems | 6 | ✅ | 28.6M | ✅ | 22.0M | 🟢 **-23%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 11.6M | -13% |
| items.json | single-form items with null instance ... | 1 | ✅ | 79.7M | ✅ | 66.9M | -16% |
| items.json | array-form items with null instance e... | 1 | ✅ | 85.2M | ✅ | 68.5M | -20% |
| maxItems.json | maxItems validation | 4 | ✅ | 75.7M | ✅ | 49.5M | 🟢 **-35%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 60.4M | ✅ | 46.8M | 🟢 **-22%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 46.8M | -19% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ✅ | 43.3M | -19% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.5M | ✅ | 39.5M | 🟢 **-25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.2M | ✅ | 32.4M | 🟢 **-21%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.7M | ✅ | 33.9M | 🟢 **-21%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 47.0M | 🟢 **-32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 70.7M | ✅ | 47.8M | 🟢 **-32%** |
| minItems.json | minItems validation | 4 | ✅ | 75.7M | ✅ | 47.6M | 🟢 **-37%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 64.5M | ✅ | 47.4M | 🟢 **-27%** |
| minLength.json | minLength validation | 5 | ✅ | 56.6M | ✅ | 42.2M | 🟢 **-26%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.3M | ✅ | 43.4M | 🟢 **-20%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.3M | ✅ | 42.8M | 🟢 **-24%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 32.5M | 🟢 **-23%** |
| minimum.json | minimum validation | 4 | ✅ | 69.3M | ✅ | 47.5M | 🟢 **-31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 48.6M | 🟢 **-25%** |
| multipleOf.json | by int | 3 | ✅ | 68.9M | ✅ | 43.5M | 🟢 **-37%** |
| multipleOf.json | by number | 3 | ✅ | 64.5M | ✅ | 42.6M | 🟢 **-34%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 41.0M | 🟢 **-28%** |
| multipleOf.json | float division = inf | 1 | ✅ | 42.6M | ✅ | 8.0M | 🟢 **-81%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.6M | ✅ | 9.0M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 64.8M | ✅ | 42.6M | 🟢 **-34%** |
| not.json | not multiple types | 3 | ✅ | 58.4M | ✅ | 37.0M | 🟢 **-37%** |
| not.json | not more complex schema | 3 | ✅ | 60.3M | ✅ | 39.4M | 🟢 **-35%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 43.5M | -9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.7M | ✅ | 38.5M | -14% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.5M | ✅ | 38.4M | -14% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 200.6M | ✅ | 54.8M | 🟢 **-73%** |
| not.json | double negation | 1 | ✅ | 174.8M | ✅ | 73.3M | 🟢 **-58%** |
| oneOf.json | oneOf | 4 | ✅ | 60.6M | ✅ | 22.4M | 🟢 **-63%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.3M | ✅ | 25.8M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 51.0M | ✅ | 35.0M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 174.6M | ✅ | 24.8M | 🟢 **-86%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 51.2M | ✅ | 35.9M | 🟢 **-30%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 50.8M | ✅ | 16.8M | 🟢 **-67%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 20.9M | 🟢 **-50%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.9M | ✅ | 35.9M | 🟢 **-43%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ✅ | 16.5M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ✅ | 26.5M | 🟢 **-42%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 64.4M | ✅ | 27.0M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 51.5M | ✅ | 43.6M | -15% |
| pattern.json | pattern is not anchored | 1 | ✅ | 53.0M | ✅ | 31.1M | 🟢 **-41%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 14.7M | 🟢 **-44%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ✅ | 7.9M | 🟢 **-50%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ✅ | 8.1M | 🟢 **-53%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.8M | ✅ | 8.5M | 🟢 **-61%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.4M | ✅ | 21.3M | +10% |
| properties.json | object properties validation | 6 | ✅ | 47.0M | ✅ | 43.7M | -7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 9.8M | 🟢 **-51%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.3M | ✅ | 39.8M | -8% |
| properties.json | properties with escaped characters | 2 | ✅ | 45.2M | ✅ | 43.3M | -4% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.4M | ✅ | 60.8M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.8M | ✅ | 32.2M | 🟢 **-28%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 15.9M | -18% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 187.7M | ✅ | 67.7M | 🟢 **-64%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.5M | ✅ | 28.9M | 🟢 **-34%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 43.6M | ✅ | 31.8M | 🟢 **-27%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.0M | ✅ | 33.5M | 🟢 **-24%** |
| ref.json | root pointer ref | 4 | ✅ | 24.9M | ✅ | 21.4M | -14% |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.8M | ✅ | 42.7M | -7% |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.0M | ✅ | 38.2M | 🟢 **-28%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.4M | ✅ | 39.7M | -4% |
| ref.json | nested refs | 2 | ✅ | 36.9M | ✅ | 46.9M | 🔴 **+27%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.4M | ✅ | 4.2M | 🟢 **-83%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.1M | ✅ | 43.0M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ✅ | 42.5M | -8% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 140.4M | ✅ | 73.8M | 🟢 **-47%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 48.4M | ✅ | 40.0M | -17% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 7.5M | -11% |
| ref.json | refs with quote | 2 | ✅ | 47.4M | ✅ | 38.5M | -19% |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ✅ | 46.9M | +2% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 46.5M | ✅ | 47.5M | +2% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.1M | ✅ | 47.1M | +2% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 48.3M | ✅ | 14.5M | 🟢 **-70%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.6M | ✅ | 33.3M | -4% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.2M | ✅ | 32.8M | -7% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.3M | ✅ | 48.1M | +4% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.6M | ✅ | 24.1M | 🟢 **-28%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.8M | ✅ | 43.1M | -6% |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.9M | ✅ | 43.8M | -5% |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 43.7M | -2% |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ✅ | 43.4M | -8% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.8M | ✅ | 43.4M | -1% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.4M | ✅ | 43.5M | +13% |
| ref.json | ref to if | 2 | ✅ | 45.3M | ✅ | 46.9M | +3% |
| ref.json | ref to then | 2 | ✅ | 43.8M | ✅ | 46.3M | +6% |
| ref.json | ref to else | 2 | ✅ | 45.1M | ✅ | 46.5M | +3% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.7M | ✅ | 48.0M | +10% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.4M | ✅ | 48.4M | 🟢 **-25%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 65.1M | ✅ | 48.1M | 🟢 **-26%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 65.1M | ✅ | 44.4M | 🟢 **-32%** |
| refRemote.json | remote ref | 2 | ✅ | 44.8M | ✅ | 46.9M | +5% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.9M | ✅ | 48.3M | +8% |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.2M | ✅ | 47.2M | +7% |
| refRemote.json | base URI change | 2 | ✅ | 30.8M | ✅ | 24.9M | -19% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.2M | ✅ | 25.9M | -11% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.4M | ✅ | 26.0M | 🟢 **-34%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.8M | ✅ | 12.1M | 🟢 **-62%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.6M | ✅ | 36.4M | -8% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ✅ | 41.9M | +15% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.7M | ✅ | 29.3M | 🟢 **-30%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.4M | ✅ | 42.1M | +15% |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 49.0M | -18% |
| required.json | required default validation | 1 | ✅ | 175.1M | ✅ | 73.6M | 🟢 **-58%** |
| required.json | required with empty array | 1 | ✅ | 173.5M | ✅ | 67.7M | 🟢 **-61%** |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ✅ | 37.9M | +3% |
| required.json | required properties whose names are J... | 7 | ✅ | 22.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 51.9M | ✅ | 40.5M | 🟢 **-22%** |
| type.json | number type matches numbers | 9 | ✅ | 54.8M | ✅ | 40.1M | 🟢 **-27%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 45.9M | -17% |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 38.7M | -16% |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 40.3M | -16% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 43.9M | -15% |
| type.json | null type matches only the null object | 10 | ✅ | 47.5M | ✅ | 41.1M | -13% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 49.5M | ✅ | 38.2M | 🟢 **-23%** |
| type.json | type as array with one item | 2 | ✅ | 65.7M | ✅ | 48.1M | 🟢 **-27%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 37.6M | 🟢 **-31%** |
| type.json | type: array, object or null | 5 | ✅ | 62.4M | ✅ | 45.2M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 10.4M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 22.7M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 26.4M | 🔴 **+40%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 164.8M | ✅ | 54.3M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ✅ | 54.2M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 60.6M | ✅ | 48.3M | 🟢 **-20%** |
| optional/bignum.json | integer | 2 | ✅ | 86.6M | ✅ | 14.2M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 90.3M | ✅ | 71.0M | 🟢 **-21%** |
| optional/bignum.json | string | 1 | ✅ | 48.3M | ✅ | 38.1M | 🟢 **-21%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 81.0M | ✅ | 67.3M | -17% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 46.4M | ✅ | 37.8M | -19% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 81.1M | ✅ | 67.1M | -17% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 46.6M | ✅ | 37.9M | -19% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 334K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 395K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 54.2M | ✅ | 26.7M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.6M | ✅ | 21.8M | +17% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 27.7M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 27.8M | +11% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 27.5M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 29.0M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.8M | ✅ | 27.6M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 27.6M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 29.0M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.3M | ✅ | 26.6M | -6% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ✅ | 17.7M | +3% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ✅ | 13.7M | -14% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 14.5M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 26.3M | -1% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ✅ | 22.9M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ✅ | 23.3M | -4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 21.3M | ✅ | 21.1M | -1% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 21.6M | +5% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 9.1M | +8% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ✅ | 9.1M | +1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.3M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.8M | ✅ | 8.0M | 🟢 **-69%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ✅ | 21.8M | +18% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.3M | ✅ | 30.6M | -8% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.8M | ✅ | 2.7M | 🟢 **-84%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.7M | ✅ | 24.6M | -17% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.5M | ✅ | 906K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.1M | ✅ | 30.7M | -7% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.7M | -12% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.1M | ✅ | 55.6M | 🟢 **-39%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ✅ | 9.0M | -11% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ✅ | 14.8M | -15% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ✅ | 4.3M | 🟢 **-38%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.5M | ✅ | 14.6M | 🟢 **-59%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 54.4M | ✅ | 37.7M | 🟢 **-31%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 51.8M | ✅ | 34.7M | 🟢 **-33%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.9M | ✅ | 27.0M | -3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ✅ | 8.4M | 🟢 **-52%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 21.0M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 21.4M | ✅ | 43.6M | 🔴 **+104%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 28.3M | ✅ | 28.3M | +0% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 155.3M | ✅ | 74.2M | 🟢 **-52%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.2M | ✅ | 41.1M | 🟢 **-35%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.5M | ✅ | 65.7M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 74.9M | ✅ | 68.9M | -8% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 21.3M | 🟢 **-63%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.6M | ✅ | 28.6M | -12% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 36.4M | 🟢 **-66%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 155.0M | ✅ | 74.8M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.5M | ✅ | 24.4M | 🟢 **-61%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.3M | ✅ | 19.6M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.5M | ✅ | 16.3M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 28.2M | ✅ | 9.6M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 155.0M | ✅ | 74.4M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 19.9M | ✅ | 8.0M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 45.0M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.8M | ✅ | 10.2M | 🟢 **-63%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 25.6M | ✅ | 11.3M | 🟢 **-56%** |
| allOf.json | allOf | 4 | ✅ | 31.7M | ✅ | 27.6M | -13% |
| allOf.json | allOf with base schema | 5 | ✅ | 38.5M | ✅ | 21.9M | 🟢 **-43%** |
| allOf.json | allOf simple types | 2 | ✅ | 54.3M | ✅ | 35.3M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 155.3M | ✅ | 75.1M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 43.6M | ✅ | 28.1M | 🟢 **-36%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 27.6M | 🟢 **-70%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 155.1M | ✅ | 70.3M | 🟢 **-55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 72.6M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 36.7M | 🟢 **-34%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.4M | ✅ | 34.3M | 🟢 **-70%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 35.0M | 🟢 **-39%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ✅ | 4.6M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ✅ | 36.1M | 🟢 **-36%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.6M | ✅ | 34.2M | 🟢 **-70%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 36.6M | ✅ | 36.5M | 0% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.7M | ✅ | 35.9M | 🟢 **-36%** |
| anyOf.json | anyOf | 4 | ✅ | 59.2M | ✅ | 21.6M | 🟢 **-64%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.3M | ✅ | 17.6M | 🟢 **-44%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 154.4M | ✅ | 74.4M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.1M | ✅ | 74.5M | 🟢 **-51%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 11.1M | 🟢 **-75%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.0M | ✅ | 16.0M | 🟢 **-63%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.9M | ✅ | 43.6M | 🟢 **-74%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.5M | ✅ | 19.3M | 🟢 **-66%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.0M | ✅ | 45.1M | 🟢 **-75%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 41.2M | ✅ | 30.0M | 🟢 **-27%** |
| const.json | const validation | 3 | ✅ | 49.1M | ✅ | 31.8M | 🟢 **-35%** |
| const.json | const with object | 4 | ✅ | 31.5M | ✅ | 13.9M | 🟢 **-56%** |
| const.json | const with array | 3 | ✅ | 37.0M | ✅ | 15.3M | 🟢 **-59%** |
| const.json | const with null | 2 | ✅ | 57.6M | ✅ | 35.5M | 🟢 **-38%** |
| const.json | const with false does not match 0 | 3 | ✅ | 51.7M | ✅ | 32.3M | 🟢 **-38%** |
| const.json | const with true does not match 1 | 3 | ✅ | 51.4M | ✅ | 32.4M | 🟢 **-37%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 48.1M | ✅ | 22.7M | 🟢 **-53%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.1M | ✅ | 22.6M | 🟢 **-53%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 40.8M | ✅ | 11.7M | 🟢 **-71%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 40.5M | ✅ | 11.8M | 🟢 **-71%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 47.3M | ✅ | 32.3M | 🟢 **-32%** |
| const.json | const with 1 does not match true | 3 | ✅ | 60.0M | ✅ | 40.1M | 🟢 **-33%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.3M | ✅ | 33.2M | 🟢 **-33%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 50.8M | ✅ | 34.7M | 🟢 **-32%** |
| const.json | nul characters in strings | 2 | ✅ | 45.3M | ✅ | 36.5M | -19% |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.5M | ✅ | 34.4M | 🟢 **-23%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 47.0M | ✅ | 36.8M | 🟢 **-22%** |
| contains.json | contains keyword validation | 6 | ✅ | 51.4M | ✅ | 14.4M | 🟢 **-72%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.5M | ✅ | 8.8M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ✅ | 36.1M | 🟢 **-34%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 38.8M | ✅ | 23.3M | 🟢 **-40%** |
| contains.json | items + contains | 4 | ✅ | 18.2M | ✅ | 6.5M | 🟢 **-64%** |
| contains.json | contains with false if subschema | 2 | ✅ | 53.5M | ✅ | 34.2M | 🟢 **-36%** |
| contains.json | contains with null instance elements | 1 | ✅ | 73.4M | ✅ | 67.8M | -8% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.1M | ✅ | 62.3M | 🟢 **-65%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.0M | ✅ | 57.9M | 🟢 **-67%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.3M | ✅ | 51.7M | 🟢 **-71%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 159.8M | ✅ | 54.0M | 🟢 **-66%** |
| default.json | invalid type for default | 2 | ✅ | 61.2M | ✅ | 60.5M | -1% |
| default.json | invalid string value for default | 2 | ✅ | 47.0M | ✅ | 49.8M | +6% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 27.3M | ✅ | 37.8M | 🔴 **+39%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.6M | ✅ | 710K | 🟢 **-56%** |
| dependentRequired.json | single dependency | 7 | ✅ | 53.5M | ✅ | 43.7M | -18% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.3M | ✅ | 60.7M | 🟢 **-66%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 17.9M | ✅ | 30.1M | 🔴 **+68%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ✅ | 31.6M | -17% |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.1M | ✅ | 36.1M | -18% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 41.5M | ✅ | 33.1M | 🟢 **-20%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 33.7M | ✅ | 26.6M | 🟢 **-21%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 30.2M | ✅ | 31.2M | +3% |
| enum.json | simple enum validation | 2 | ✅ | 47.7M | ✅ | 33.1M | 🟢 **-31%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 34.8M | ✅ | 10.6M | 🟢 **-70%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 51.2M | ✅ | 39.0M | 🟢 **-24%** |
| enum.json | enums in properties | 6 | ✅ | 33.7M | ✅ | 30.2M | -10% |
| enum.json | enum with escaped characters | 3 | ✅ | 32.8M | ✅ | 40.1M | 🔴 **+22%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 47.0M | ✅ | 33.6M | 🟢 **-29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 43.7M | ✅ | 19.1M | 🟢 **-56%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 51.4M | ✅ | 30.4M | 🟢 **-41%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ✅ | 18.9M | 🟢 **-60%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.6M | ✅ | 35.3M | 🟢 **-40%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ✅ | 20.9M | 🟢 **-61%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.8M | ✅ | 33.2M | 🟢 **-43%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.1M | ✅ | 20.8M | 🟢 **-61%** |
| enum.json | nul characters in strings | 2 | ✅ | 47.6M | ✅ | 36.0M | 🟢 **-24%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.9M | ✅ | 26.9M | 🟢 **-44%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 48.1M | ✅ | 34.2M | 🟢 **-29%** |
| format.json | email format | 6 | ✅ | 182.0M | ✅ | 54.7M | 🟢 **-70%** |
| format.json | idn-email format | 6 | ✅ | 182.6M | ✅ | 53.4M | 🟢 **-71%** |
| format.json | regex format | 6 | ✅ | 162.2M | ✅ | 54.9M | 🟢 **-66%** |
| format.json | ipv4 format | 6 | ✅ | 174.1M | ✅ | 51.6M | 🟢 **-70%** |
| format.json | ipv6 format | 6 | ✅ | 182.4M | ✅ | 54.1M | 🟢 **-70%** |
| format.json | idn-hostname format | 6 | ✅ | 174.0M | ✅ | 53.8M | 🟢 **-69%** |
| format.json | hostname format | 6 | ✅ | 171.6M | ✅ | 52.0M | 🟢 **-70%** |
| format.json | date format | 6 | ✅ | 174.2M | ✅ | 47.3M | 🟢 **-73%** |
| format.json | date-time format | 6 | ✅ | 182.5M | ✅ | 54.5M | 🟢 **-70%** |
| format.json | time format | 6 | ✅ | 181.3M | ✅ | 52.8M | 🟢 **-71%** |
| format.json | json-pointer format | 6 | ✅ | 182.6M | ✅ | 54.2M | 🟢 **-70%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.7M | ✅ | 54.6M | 🟢 **-70%** |
| format.json | iri format | 6 | ✅ | 179.0M | ✅ | 53.9M | 🟢 **-70%** |
| format.json | iri-reference format | 6 | ✅ | 181.1M | ✅ | 53.1M | 🟢 **-71%** |
| format.json | uri format | 6 | ✅ | 174.3M | ✅ | 53.4M | 🟢 **-69%** |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ✅ | 54.2M | 🟢 **-70%** |
| format.json | uri-template format | 6 | ✅ | 182.3M | ✅ | 52.8M | 🟢 **-71%** |
| format.json | uuid format | 6 | ✅ | 182.0M | ✅ | 52.9M | 🟢 **-71%** |
| format.json | duration format | 6 | ✅ | 182.6M | ✅ | 51.4M | 🟢 **-72%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 160.5M | ✅ | 71.9M | 🟢 **-55%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ✅ | 53.2M | 🟢 **-69%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 51.3M | 🟢 **-70%** |
| if-then-else.json | if and then without else | 3 | ✅ | 62.4M | ✅ | 33.7M | 🟢 **-46%** |
| if-then-else.json | if and else without then | 3 | ✅ | 60.0M | ✅ | 26.6M | 🟢 **-56%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 53.7M | ✅ | 26.5M | 🟢 **-51%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.0M | ✅ | 70.1M | 🟢 **-59%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.4M | ✅ | 35.0M | 🟢 **-39%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.1M | ✅ | 35.3M | 🟢 **-38%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ✅ | 26.5M | 🟢 **-38%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.6M | ✅ | 28.4M | 🟢 **-20%** |
| items.json | a schema given for items | 4 | ✅ | 42.6M | ✅ | 35.4M | -17% |
| items.json | an array of schemas for items | 6 | ✅ | 58.7M | ✅ | 43.8M | 🟢 **-25%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.5M | ✅ | 51.4M | 🟢 **-69%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.1M | ✅ | 29.9M | 🟢 **-46%** |
| items.json | items with boolean schemas | 3 | ✅ | 53.9M | ✅ | 38.3M | 🟢 **-29%** |
| items.json | items and subitems | 6 | ✅ | 24.3M | ✅ | 17.4M | 🟢 **-29%** |
| items.json | nested items | 3 | ✅ | 10.2M | ✅ | 10.5M | +4% |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ✅ | 41.9M | 🟢 **-40%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 68.5M | -9% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 71.6M | 🟢 **-58%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 43.0M | ✅ | 22.6M | 🟢 **-47%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 50.5M | ✅ | 33.6M | 🟢 **-33%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 44.5M | ✅ | 29.4M | 🟢 **-34%** |
| maxItems.json | maxItems validation | 4 | ✅ | 65.7M | ✅ | 41.7M | 🟢 **-37%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 35.3M | 🟢 **-37%** |
| maxLength.json | maxLength validation | 5 | ✅ | 52.9M | ✅ | 39.7M | 🟢 **-25%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.0M | ✅ | 33.4M | 🟢 **-29%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 40.3M | ✅ | 36.4M | -10% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 29.0M | ✅ | 24.7M | -15% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.0M | ✅ | 26.4M | +6% |
| maximum.json | maximum validation | 4 | ✅ | 61.9M | ✅ | 41.4M | 🟢 **-33%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ✅ | 42.6M | 🟢 **-30%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 72.2M | 🟢 **-58%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 51.3M | ✅ | 30.6M | 🟢 **-40%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 46.7M | ✅ | 25.5M | 🟢 **-45%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 50.9M | ✅ | 35.3M | 🟢 **-31%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 40.2M | ✅ | 27.9M | 🟢 **-30%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 36.3M | ✅ | 26.1M | 🟢 **-28%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.7M | ✅ | 71.2M | 🟢 **-59%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 56.1M | ✅ | 37.6M | 🟢 **-33%** |
| minItems.json | minItems validation | 4 | ✅ | 46.7M | ✅ | 40.5M | -13% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 35.5M | 🟢 **-37%** |
| minLength.json | minLength validation | 5 | ✅ | 45.9M | ✅ | 36.7M | 🟢 **-20%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 47.2M | ✅ | 34.2M | 🟢 **-28%** |
| minProperties.json | minProperties validation | 6 | ✅ | 36.3M | ✅ | 32.1M | -11% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 29.9M | ✅ | 25.9M | -13% |
| minimum.json | minimum validation | 4 | ✅ | 61.7M | ✅ | 41.5M | 🟢 **-33%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 56.9M | ✅ | 43.7M | 🟢 **-23%** |
| multipleOf.json | by int | 3 | ✅ | 61.6M | ✅ | 37.7M | 🟢 **-39%** |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 35.1M | 🟢 **-37%** |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ✅ | 32.3M | 🟢 **-37%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 7.6M | 🟢 **-80%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.4M | ✅ | 10.8M | 🟢 **-83%** |
| not.json | not | 2 | ✅ | 56.2M | ✅ | 29.6M | 🟢 **-47%** |
| not.json | not multiple types | 3 | ✅ | 49.9M | ✅ | 27.4M | 🟢 **-45%** |
| not.json | not more complex schema | 3 | ✅ | 52.8M | ✅ | 30.1M | 🟢 **-43%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 33.7M | 🟢 **-20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.2M | ✅ | 24.8M | 🟢 **-40%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.0M | ✅ | 28.2M | 🟢 **-31%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.6M | ✅ | 53.8M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 157.8M | ✅ | 73.9M | 🟢 **-53%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 22.7M | ✅ | 19.9M | -12% |
| oneOf.json | oneOf | 4 | ✅ | 45.9M | ✅ | 17.5M | 🟢 **-62%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.7M | ✅ | 21.7M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 43.7M | ✅ | 22.5M | 🟢 **-48%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 14.1M | 🟢 **-91%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.3M | ✅ | 22.5M | 🟢 **-49%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 10.5M | 🟢 **-76%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.0M | ✅ | 14.2M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 24.7M | 🟢 **-55%** |
| oneOf.json | oneOf with required | 4 | ✅ | 36.8M | ✅ | 13.8M | 🟢 **-62%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 15.3M | 🟢 **-60%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 20.4M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 41.9M | ✅ | 37.7M | -10% |
| pattern.json | pattern is not anchored | 1 | ✅ | 34.9M | ✅ | 32.5M | -7% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.6M | ✅ | 10.8M | 🟢 **-54%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 11.9M | ✅ | 5.9M | 🟢 **-51%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ✅ | 7.4M | 🟢 **-49%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.7M | ✅ | 6.1M | 🟢 **-67%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.9M | ✅ | 16.7M | +12% |
| properties.json | object properties validation | 6 | ✅ | 45.2M | ✅ | 39.6M | -12% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.0M | ✅ | 9.1M | 🟢 **-46%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.6M | ✅ | 33.4M | -13% |
| properties.json | properties with escaped characters | 2 | ✅ | 40.8M | ✅ | 33.8M | -17% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 64.6M | +8% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ✅ | 24.3M | 🟢 **-40%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 16.0M | ✅ | 15.2M | -5% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.5M | ✅ | 71.7M | 🟢 **-58%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 28.9M | ✅ | 20.6M | 🟢 **-29%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 33.9M | ✅ | 24.1M | 🟢 **-29%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.9M | ✅ | 26.1M | 🟢 **-27%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 10.7M | ✅ | 17.0M | 🔴 **+59%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 4.8M | ✅ | 1.6M | 🟢 **-66%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 2.3M | -12% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 9.8M | ✅ | 1.6M | 🟢 **-84%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.5M | ✅ | 1.6M | 🟢 **-83%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 5.6M | ✅ | 1.1M | 🟢 **-81%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.4M | ✅ | 3.1M | -8% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 3.4M | ✅ | 3.2M | -6% |
| ref.json | root pointer ref | 4 | ✅ | 20.4M | ✅ | 16.2M | 🟢 **-21%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 34.0M | -17% |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 34.3M | 🟢 **-26%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.1M | ✅ | 32.9M | -11% |
| ref.json | nested refs | 2 | ✅ | 30.2M | ✅ | 35.1M | +16% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.1M | ✅ | 29.5M | -14% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ✅ | 2.2M | -13% |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 34.4M | -17% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 34.5M | -19% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ✅ | 73.6M | 🟢 **-54%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.3M | ✅ | 26.0M | 🟢 **-41%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 6.8M | ✅ | 6.6M | -3% |
| ref.json | refs with quote | 2 | ✅ | 42.7M | ✅ | 34.1M | 🟢 **-20%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 19.2M | ✅ | 25.4M | 🔴 **+32%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 38.3M | ✅ | 12.8M | 🟢 **-66%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 38.6M | ✅ | 35.1M | -9% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 37.2M | ✅ | 34.8M | -7% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 52.4M | ✅ | 36.1M | 🟢 **-31%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 30.5M | ✅ | 34.1M | +12% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 29.4M | ✅ | 19.0M | 🟢 **-35%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.8M | ✅ | 30.9M | 🟢 **-28%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.7M | ✅ | 36.4M | -15% |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.8M | ✅ | 34.4M | -20% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 35.0M | -18% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ✅ | 34.2M | -19% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.6M | ✅ | 33.3M | 🟢 **-22%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 39.5M | ✅ | 36.9M | -7% |
| ref.json | ref to then | 2 | ✅ | 39.4M | ✅ | 35.2M | -11% |
| ref.json | ref to else | 2 | ✅ | 38.3M | ✅ | 36.6M | -5% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 38.3M | ✅ | 35.7M | -7% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 31.9M | 🟢 **-43%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 35.4M | 🟢 **-36%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.7M | ✅ | 34.5M | 🟢 **-38%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 3.6M | ✅ | 14.0M | 🔴 **+288%** |
| refRemote.json | remote ref | 2 | ✅ | 37.6M | ✅ | 36.0M | -4% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.5M | ✅ | 35.5M | -5% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 38.0M | ✅ | 35.5M | -7% |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.3M | ✅ | 35.1M | -8% |
| refRemote.json | base URI change | 2 | ✅ | 25.7M | ✅ | 24.0M | -7% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 24.1M | ✅ | 25.4M | +5% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 29.7M | ✅ | 25.5M | -14% |
| refRemote.json | root ref in remote ref | 3 | ✅ | 26.4M | ✅ | 9.3M | 🟢 **-65%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 26.2M | ✅ | 31.6M | 🔴 **+21%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.0M | ✅ | 34.0M | -10% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.2M | ✅ | 26.5M | 🟢 **-29%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 39.5M | ✅ | 34.5M | -13% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 39.1M | ✅ | 34.7M | -11% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 25.0M | ✅ | 34.1M | 🔴 **+36%** |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 37.7M | ✅ | 33.7M | -10% |
| required.json | required validation | 5 | ✅ | 52.8M | ✅ | 43.8M | -17% |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 75.6M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 75.1M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ✅ | 29.2M | 🟢 **-24%** |
| required.json | required properties whose names are J... | 7 | ✅ | 15.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 42.7M | ✅ | 33.5M | 🟢 **-22%** |
| type.json | number type matches numbers | 9 | ✅ | 45.1M | ✅ | 37.7M | -16% |
| type.json | string type matches strings | 9 | ✅ | 47.3M | ✅ | 32.9M | 🟢 **-30%** |
| type.json | object type matches objects | 7 | ✅ | 39.9M | ✅ | 32.7M | -18% |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ✅ | 29.4M | 🟢 **-35%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.2M | ✅ | 35.6M | -18% |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ✅ | 33.3M | 🟢 **-23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.8M | ✅ | 33.8M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 35.9M | 🟢 **-36%** |
| type.json | type: array or object | 5 | ✅ | 48.3M | ✅ | 36.3M | 🟢 **-25%** |
| type.json | type: array, object or null | 5 | ✅ | 54.2M | ✅ | 38.3M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.4M | ✅ | 71.7M | -5% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.0M | ✅ | 34.2M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 39.7M | ✅ | 31.0M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.0M | ✅ | 61.8M | -6% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.7M | ✅ | 35.0M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 72.5M | ✅ | 67.3M | -7% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 31.9M | ✅ | 30.1M | -6% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 28.9M | ✅ | 29.6M | +2% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 43.5M | ✅ | 34.7M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 75.8M | ✅ | 62.1M | -18% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 17.4M | ✅ | 65.0M | 🔴 **+274%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ✅ | 22.5M | 🔴 **+98%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.6M | ✅ | 19.2M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ✅ | 24.9M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.5M | ✅ | 21.9M | 🔴 **+108%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 48.2M | ✅ | 35.6M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.7M | ✅ | 32.1M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ✅ | 34.3M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.0M | ✅ | 9.2M | 🔴 **+367%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.4M | ✅ | 28.9M | -18% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ✅ | 24.3M | +4% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 76.2M | ✅ | 52.0M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ✅ | 69.2M | -2% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 44.7M | ✅ | 22.8M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.4M | ✅ | 65.4M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ✅ | 15.8M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 28.2M | ✅ | 31.0M | +10% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 25.9M | ✅ | 29.2M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.0M | ✅ | 11.9M | -8% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 60.3M | ✅ | 56.7M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 24.7M | ✅ | 25.2M | +2% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.5M | ✅ | 8.8M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.3M | ✅ | 61.0M | +1% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.7M | ✅ | 61.8M | 🔴 **+123%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.3M | ✅ | 9.5M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ✅ | 13.2M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 17.9M | ✅ | 23.4M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.0M | ✅ | 16.3M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.2M | ✅ | 16.4M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 21.6M | ✅ | 23.1M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.5M | ✅ | 30.1M | +9% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 25.3M | ✅ | 26.5M | +4% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 25.4M | ✅ | 26.8M | +5% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.5M | ✅ | 9.9M | 🔴 **+290%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.9M | ✅ | 24.5M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.4M | ✅ | 23.6M | 🔴 **+22%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 53.1M | 🔴 **+87%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 23.1M | ✅ | 58.0M | 🔴 **+151%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 18.5M | ✅ | 23.2M | 🔴 **+25%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.3M | ✅ | 28.4M | 🔴 **+22%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 15.4M | ✅ | 22.3M | 🔴 **+45%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.2M | ✅ | 28.6M | 🔴 **+155%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.6M | ✅ | 20.6M | -16% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 23.5M | ✅ | 26.1M | +11% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.9M | ✅ | 16.3M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.2M | ✅ | 11.7M | 🟢 **-28%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.8M | ✅ | 11.8M | 🟢 **-34%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 4.2M | 🟢 **-40%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.3M | ✅ | 54.2M | -19% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.7M | ✅ | 36.1M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.1M | ✅ | 12.0M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 17.9M | ✅ | 23.7M | 🔴 **+32%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 17.8M | ✅ | 21.7M | 🔴 **+22%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 9.7M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.7M | ✅ | 19.3M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 13.3M | ✅ | 23.3M | 🔴 **+76%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 55.2M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ✅ | 51.5M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.5M | ✅ | 42.2M | 🟢 **-28%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ✅ | 36.1M | 🟢 **-35%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 43.3M | ✅ | 9.3M | 🟢 **-79%** |
| optional/bignum.json | integer | 2 | ✅ | 72.6M | ✅ | 11.6M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 70.8M | -7% |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 29.3M | 🟢 **-31%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 71.0M | +1% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ✅ | 25.8M | 🟢 **-37%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 71.1M | +1% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 26.7M | 🟢 **-35%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 14.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.2M | ✅ | 43.8M | -19% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.9M | ✅ | 63.6M | 🟢 **-64%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.9M | ✅ | 30.2M | +4% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ✅ | 31.7M | -17% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.2M | ✅ | 37.0M | -16% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.5M | ✅ | 33.4M | 🟢 **-23%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.6M | ✅ | 27.0M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 46.8M | ✅ | 22.9M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 13.4M | ✅ | 22.9M | 🔴 **+71%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 15.5M | ✅ | 23.0M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 16.2M | ✅ | 23.3M | 🔴 **+44%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 15.2M | ✅ | 22.6M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 15.1M | ✅ | 24.3M | 🔴 **+61%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.2M | ✅ | 23.5M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 15.8M | ✅ | 22.7M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 15.3M | ✅ | 26.9M | 🔴 **+76%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 15.7M | ✅ | 22.5M | 🔴 **+43%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 16.9M | -1% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.5M | ✅ | 14.4M | +15% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.0M | ✅ | 14.2M | +10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 15.5M | ✅ | 22.0M | 🔴 **+42%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 14.8M | ✅ | 19.3M | 🔴 **+30%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.0M | ✅ | 20.0M | -5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.3M | ✅ | 18.4M | +1% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ✅ | 18.4M | 0% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 9.1M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 8.7M | +4% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.5M | ✅ | 3.0M | 🟢 **-87%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 22.2M | ✅ | 8.2M | 🟢 **-63%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ✅ | 19.2M | +7% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ✅ | 77K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 27.6M | ✅ | 26.7M | -3% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ✅ | 3.1M | 🟢 **-81%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 23.0M | ✅ | 21.9M | -5% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.0M | ✅ | 858K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 23.2M | ✅ | 27.3M | +17% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.6M | -14% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.2M | ✅ | 55.3M | 🟢 **-26%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.0M | ✅ | 9.2M | +1% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ✅ | 16.2M | -5% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.6M | ✅ | 4.5M | 🟢 **-20%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.1M | ✅ | 13.7M | -3% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 26.1M | ✅ | 11.0M | 🟢 **-58%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.3M | ✅ | 37.5M | 🟢 **-31%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 16.5M | ✅ | 22.9M | 🔴 **+39%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ✅ | 6.9M | 🟢 **-56%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.5M | ✅ | 33.7M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ✅ | 34.4M | -19% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.4M | ✅ | 34.2M | -19% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.7M | ✅ | 36.1M | 🟢 **-35%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.3M | ✅ | 35.0M | -17% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.5M | ✅ | 33.4M | 🟢 **-38%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.2M | ✅ | 21.9M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.1M | ✅ | 16.5M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 13.2M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 74.9M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.0M | ✅ | 8.0M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 35.0M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.5M | ✅ | 10.8M | 🟢 **-59%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 33.5M | ✅ | 31.0M | -8% |
| allOf.json | allOf | 4 | ✅ | 32.3M | ✅ | 20.2M | 🟢 **-37%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 10.3M | 🟢 **-65%** |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ✅ | 46.5M | -19% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 73.9M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.9M | ✅ | 39.0M | -17% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 39.1M | 🟢 **-58%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 73.8M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 62.4M | 🟢 **-61%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 47.8M | -19% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 29.7M | 🟢 **-74%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 47.0M | ✅ | 40.6M | -14% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.9M | ✅ | 4.7M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 59.4M | ✅ | 41.3M | 🟢 **-30%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 42.7M | 🟢 **-62%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 56.4M | ✅ | 45.1M | -20% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 58.8M | ✅ | 31.8M | 🟢 **-46%** |
| anyOf.json | anyOf | 4 | ✅ | 63.3M | ✅ | 14.7M | 🟢 **-77%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.8M | ✅ | 20.3M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 157.2M | ✅ | 74.4M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 74.1M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 14.5M | 🟢 **-69%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 42.8M | ✅ | 19.7M | 🟢 **-54%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 56.6M | 🟢 **-67%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 27.6M | 🟢 **-55%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.4M | ✅ | 55.5M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 42.6M | ✅ | 32.3M | 🟢 **-24%** |
| const.json | const validation | 3 | ✅ | 49.7M | ✅ | 36.6M | 🟢 **-26%** |
| const.json | const with object | 4 | ✅ | 33.5M | ✅ | 13.6M | 🟢 **-59%** |
| const.json | const with array | 3 | ✅ | 41.4M | ✅ | 16.6M | 🟢 **-60%** |
| const.json | const with null | 2 | ✅ | 61.0M | ✅ | 48.3M | 🟢 **-21%** |
| const.json | const with false does not match 0 | 3 | ✅ | 50.2M | ✅ | 39.8M | 🟢 **-21%** |
| const.json | const with true does not match 1 | 3 | ✅ | 54.6M | ✅ | 27.5M | 🟢 **-50%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.8M | ✅ | 26.4M | 🟢 **-48%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 36.2M | ✅ | 24.8M | 🟢 **-31%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 43.2M | ✅ | 12.9M | 🟢 **-70%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 42.5M | ✅ | 12.3M | 🟢 **-71%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.0M | ✅ | 43.0M | -14% |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ✅ | 44.3M | 🟢 **-26%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 51.4M | ✅ | 41.3M | -20% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 57.4M | ✅ | 40.3M | 🟢 **-30%** |
| const.json | nul characters in strings | 2 | ✅ | 52.4M | ✅ | 44.5M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.6M | ✅ | 44.2M | -5% |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ✅ | 46.0M | -14% |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ✅ | 8.1M | 🟢 **-85%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ✅ | 10.2M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 50.3M | ✅ | 41.3M | -18% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 48.2M | ✅ | 28.6M | 🟢 **-41%** |
| contains.json | items + contains | 4 | ✅ | 37.1M | ✅ | 7.2M | 🟢 **-81%** |
| contains.json | contains with false if subschema | 2 | ✅ | 28.7M | ✅ | 46.8M | 🔴 **+63%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 65.8M | -15% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 174.5M | ✅ | 63.9M | 🟢 **-63%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 66.9M | 🟢 **-62%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.8M | ✅ | 60.3M | 🟢 **-66%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.3M | ✅ | 55.8M | 🟢 **-68%** |
| default.json | invalid type for default | 2 | ✅ | 64.7M | ✅ | 59.4M | -8% |
| default.json | invalid string value for default | 2 | ✅ | 46.7M | ✅ | 49.2M | +5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 41.2M | ✅ | 43.8M | +6% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ✅ | 995K | 🟢 **-54%** |
| dependentRequired.json | single dependency | 7 | ✅ | 54.0M | ✅ | 49.7M | -8% |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 64.0M | 🟢 **-64%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.7M | ✅ | 32.3M | 🔴 **+31%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 37.9M | ✅ | 37.9M | 0% |
| dependentSchemas.json | single dependency | 8 | ✅ | 43.7M | ✅ | 42.7M | -2% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 24.0M | ✅ | 40.0M | 🔴 **+67%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.7M | ✅ | 30.9M | -16% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.2M | ✅ | 39.2M | +15% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.8M | ✅ | 19.8M | +18% |
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
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ✅ | 10.4M | 🔴 **+53%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 57.6M | ✅ | 41.1M | 🟢 **-29%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.2M | ✅ | 11.1M | 🟢 **-72%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.9M | ✅ | 44.9M | 🟢 **-29%** |
| enum.json | enums in properties | 6 | ✅ | 34.7M | ✅ | 35.8M | +3% |
| enum.json | enum with escaped characters | 3 | ✅ | 67.2M | ✅ | 46.5M | 🟢 **-31%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.3M | ✅ | 39.4M | 🟢 **-29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.0M | ✅ | 21.0M | 🟢 **-59%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 54.7M | ✅ | 38.9M | 🟢 **-29%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.9M | ✅ | 20.6M | 🟢 **-59%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.8M | ✅ | 51.2M | -17% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ✅ | 22.7M | 🟢 **-60%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 61.7M | ✅ | 43.8M | 🟢 **-29%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ✅ | 21.8M | 🟢 **-61%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 45.9M | -13% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 56.0M | ✅ | 41.4M | 🟢 **-26%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.3M | ✅ | 40.9M | 🟢 **-27%** |
| format.json | email format | 7 | ✅ | 182.9M | ✅ | 54.2M | 🟢 **-70%** |
| format.json | idn-email format | 7 | ✅ | 175.2M | ✅ | 55.7M | 🟢 **-68%** |
| format.json | regex format | 7 | ✅ | 181.7M | ✅ | 54.8M | 🟢 **-70%** |
| format.json | ipv4 format | 7 | ✅ | 182.4M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | ipv6 format | 7 | ✅ | 183.5M | ✅ | 54.9M | 🟢 **-70%** |
| format.json | idn-hostname format | 7 | ✅ | 183.2M | ✅ | 55.8M | 🟢 **-70%** |
| format.json | hostname format | 7 | ✅ | 182.6M | ✅ | 55.0M | 🟢 **-70%** |
| format.json | date format | 7 | ✅ | 184.3M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | date-time format | 7 | ✅ | 175.7M | ✅ | 55.2M | 🟢 **-69%** |
| format.json | time format | 7 | ✅ | 179.4M | ✅ | 55.0M | 🟢 **-69%** |
| format.json | json-pointer format | 7 | ✅ | 182.7M | ✅ | 55.4M | 🟢 **-70%** |
| format.json | relative-json-pointer format | 7 | ✅ | 182.8M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | iri format | 7 | ✅ | 182.4M | ✅ | 55.4M | 🟢 **-70%** |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | uri format | 7 | ✅ | 183.2M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ✅ | 55.4M | 🟢 **-69%** |
| format.json | uri-template format | 7 | ✅ | 183.0M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uuid format | 7 | ✅ | 183.7M | ✅ | 52.5M | 🟢 **-71%** |
| format.json | duration format | 7 | ✅ | 183.6M | ✅ | 55.4M | 🟢 **-70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.1M | ✅ | 66.5M | 🟢 **-61%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.3M | ✅ | 68.6M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 69.3M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.2M | ✅ | 43.0M | 🟢 **-35%** |
| if-then-else.json | if and else without then | 3 | ✅ | 65.5M | ✅ | 38.3M | 🟢 **-41%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.0M | ✅ | 36.9M | 🟢 **-35%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 66.8M | 🟢 **-61%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 60.9M | ✅ | 49.5M | -19% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ✅ | 47.4M | 🟢 **-22%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.5M | ✅ | 31.4M | 🟢 **-21%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.3M | ✅ | 37.5M | +1% |
| items.json | a schema given for items | 4 | ✅ | 51.5M | ✅ | 38.6M | 🟢 **-25%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ✅ | 68.5M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 58.6M | ✅ | 43.4M | 🟢 **-26%** |
| items.json | items and subitems | 6 | ✅ | 27.3M | ✅ | 16.1M | 🟢 **-41%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 11.7M | -8% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.0M | ✅ | 49.8M | 🟢 **-31%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.3M | ✅ | 39.7M | -10% |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.3M | ✅ | 37.1M | -16% |
| items.json | items with heterogeneous array | 2 | ✅ | 60.0M | ✅ | 48.2M | -20% |
| items.json | items with null instance elements | 1 | ✅ | 73.6M | ✅ | 66.7M | -9% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ✅ | 69.0M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 48.0M | ✅ | 27.8M | 🟢 **-42%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.8M | ✅ | 45.0M | -18% |
| maxContains.json | minContains < maxContains | 3 | ✅ | 48.2M | ✅ | 36.8M | 🟢 **-24%** |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ✅ | 48.0M | 🟢 **-31%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 58.8M | ✅ | 47.0M | -20% |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ✅ | 46.0M | -14% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.3M | ✅ | 42.5M | -14% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 47.8M | ✅ | 42.7M | -11% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ✅ | 32.0M | -20% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.0M | ✅ | 32.1M | 🟢 **-22%** |
| maximum.json | maximum validation | 4 | ✅ | 65.3M | ✅ | 47.3M | 🟢 **-28%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.2M | ✅ | 44.8M | 🟢 **-30%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.5M | ✅ | 67.9M | 🟢 **-60%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 54.8M | ✅ | 36.3M | 🟢 **-34%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 50.9M | ✅ | 29.4M | 🟢 **-42%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 55.2M | ✅ | 44.9M | -19% |
| minContains.json | maxContains = minContains | 4 | ✅ | 43.9M | ✅ | 37.8M | -14% |
| minContains.json | maxContains < minContains | 4 | ✅ | 40.5M | ✅ | 38.7M | -4% |
| minContains.json | minContains = 0 | 2 | ✅ | 171.3M | ✅ | 68.8M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 60.5M | ✅ | 43.2M | 🟢 **-29%** |
| minItems.json | minItems validation | 4 | ✅ | 69.6M | ✅ | 47.6M | 🟢 **-32%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 53.2M | ✅ | 46.8M | -12% |
| minLength.json | minLength validation | 5 | ✅ | 49.6M | ✅ | 44.1M | -11% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ✅ | 43.0M | -14% |
| minProperties.json | minProperties validation | 6 | ✅ | 50.8M | ✅ | 42.3M | -17% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.7M | ✅ | 32.6M | -20% |
| minimum.json | minimum validation | 4 | ✅ | 65.4M | ✅ | 46.0M | 🟢 **-30%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 59.9M | ✅ | 47.5M | 🟢 **-21%** |
| multipleOf.json | by int | 3 | ✅ | 65.3M | ✅ | 43.8M | 🟢 **-33%** |
| multipleOf.json | by number | 3 | ✅ | 59.0M | ✅ | 42.4M | 🟢 **-28%** |
| multipleOf.json | by small number | 2 | ✅ | 46.3M | ✅ | 41.0M | -11% |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 8.9M | 🟢 **-78%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 9.2M | 🟢 **-86%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 43.3M | 🟢 **-27%** |
| not.json | not multiple types | 3 | ✅ | 52.9M | ✅ | 37.9M | 🟢 **-28%** |
| not.json | not more complex schema | 3 | ✅ | 55.3M | ✅ | 39.5M | 🟢 **-29%** |
| not.json | forbidden property | 2 | ✅ | 43.6M | ✅ | 43.2M | -1% |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.0M | ✅ | 38.6M | -10% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.6M | ✅ | 32.5M | 🟢 **-24%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.5M | ✅ | 54.7M | 🟢 **-69%** |
| not.json | double negation | 1 | ✅ | 157.4M | ✅ | 73.4M | 🟢 **-53%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.8M | ✅ | 23.6M | 🟢 **-21%** |
| oneOf.json | oneOf | 4 | ✅ | 47.6M | ✅ | 21.2M | 🟢 **-55%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.4M | ✅ | 23.5M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 37.0M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 27.3M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 36.8M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 18.3M | 🟢 **-61%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.4M | ✅ | 17.4M | 🟢 **-52%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.2M | ✅ | 36.5M | 🟢 **-37%** |
| oneOf.json | oneOf with required | 4 | ✅ | 37.4M | ✅ | 16.5M | 🟢 **-56%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 20.1M | 🟢 **-48%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.8M | ✅ | 28.2M | 🟢 **-52%** |
| pattern.json | pattern validation | 8 | ✅ | 49.7M | ✅ | 40.7M | -18% |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 31.0M | 🟢 **-35%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.7M | ✅ | 11.4M | 🟢 **-52%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 6.4M | 🟢 **-57%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ✅ | 7.9M | 🟢 **-52%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 5.5M | 🟢 **-73%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.9M | ✅ | 17.9M | +12% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 58.5M | ✅ | 49.7M | -15% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 57.2M | ✅ | 44.4M | 🟢 **-22%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 66.7M | -15% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.8M | ✅ | 67.3M | -15% |
| properties.json | object properties validation | 6 | ✅ | 45.0M | ✅ | 44.3M | -2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 9.9M | 🟢 **-49%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.8M | ✅ | 40.3M | +4% |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ✅ | 43.6M | +2% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 60.3M | -3% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.4M | ✅ | 29.6M | 🟢 **-29%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 13.8M | 🟢 **-27%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 68.4M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.8M | ✅ | 27.8M | 🟢 **-32%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.6M | ✅ | 31.5M | -12% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.5M | ✅ | 26.6M | 🟢 **-31%** |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ✅ | 19.4M | -12% |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.0M | ✅ | 40.1M | -9% |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.7M | ✅ | 45.1M | -7% |
| ref.json | escaped pointer ref | 6 | ✅ | 37.9M | ✅ | 39.6M | +5% |
| ref.json | nested refs | 2 | ✅ | 45.5M | ✅ | 49.0M | +8% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.0M | ✅ | 37.3M | +10% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ✅ | 2.1M | 🟢 **-39%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.7M | ✅ | 43.4M | -3% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 43.5M | -2% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 66.3M | 🟢 **-58%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ✅ | 40.4M | -14% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 7.1M | 🟢 **-21%** |
| ref.json | refs with quote | 2 | ✅ | 44.8M | ✅ | 44.2M | -1% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.7M | ✅ | 33.5M | 🔴 **+26%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.9M | ✅ | 13.8M | 🟢 **-69%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.0M | ✅ | 47.8M | -15% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 54.1M | ✅ | 46.6M | -14% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 57.8M | ✅ | 46.7M | -19% |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 45.3M | ✅ | 42.3M | -7% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 22.6M | 🟢 **-29%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.8M | ✅ | 42.9M | -4% |
| ref.json | URN base URI with NSS | 2 | ✅ | 44.7M | ✅ | 43.3M | -3% |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.7M | ✅ | 43.0M | -4% |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 39.9M | -11% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.7M | ✅ | 43.6M | -2% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ✅ | 43.5M | +0% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 56.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 56.6M | ✅ | 48.5M | -14% |
| ref.json | ref to then | 2 | ✅ | 56.1M | ✅ | 48.1M | -14% |
| ref.json | ref to else | 2 | ✅ | 56.8M | ✅ | 43.3M | 🟢 **-24%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ✅ | 50.3M | -11% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 48.5M | -18% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 49.2M | -17% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 49.6M | -16% |
| refRemote.json | remote ref | 2 | ✅ | 56.6M | ✅ | 48.5M | -14% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.7M | ✅ | 48.9M | -14% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 56.5M | ✅ | 44.9M | 🟢 **-20%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.8M | ✅ | 47.7M | -16% |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ✅ | 27.7M | -1% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.9M | ✅ | 27.6M | -8% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ✅ | 27.5M | 🟢 **-27%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.1M | ✅ | 11.9M | 🟢 **-66%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.5M | ✅ | 36.7M | -19% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.1M | ✅ | 41.9M | 🟢 **-23%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.7M | ✅ | 29.4M | 🟢 **-24%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 56.8M | ✅ | 42.0M | 🟢 **-26%** |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 56.6M | ✅ | 41.7M | 🟢 **-26%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 45.5M | ✅ | 41.6M | -9% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.6M | ✅ | 41.6M | 🟢 **-27%** |
| required.json | required validation | 5 | ✅ | 52.8M | ✅ | 48.8M | -7% |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 73.6M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 73.3M | 🟢 **-54%** |
| required.json | required with escaped characters | 2 | ✅ | 41.9M | ✅ | 38.1M | -9% |
| required.json | required properties whose names are J... | 7 | ✅ | 22.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 46.1M | ✅ | 37.8M | -18% |
| type.json | number type matches numbers | 9 | ✅ | 50.8M | ✅ | 43.5M | -14% |
| type.json | string type matches strings | 9 | ✅ | 51.3M | ✅ | 45.6M | -11% |
| type.json | object type matches objects | 7 | ✅ | 43.5M | ✅ | 37.3M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 47.7M | ✅ | 40.9M | -14% |
| type.json | boolean type matches booleans | 10 | ✅ | 47.4M | ✅ | 37.4M | 🟢 **-21%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.3M | ✅ | 35.5M | -18% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ✅ | 38.0M | -20% |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 49.8M | -15% |
| type.json | type: array or object | 5 | ✅ | 50.3M | ✅ | 42.0M | -16% |
| type.json | type: array, object or null | 5 | ✅ | 55.6M | ✅ | 44.7M | -20% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 79.5M | ✅ | 67.5M | -15% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.7M | ✅ | 44.6M | -12% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ✅ | 42.9M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.9M | ✅ | 62.2M | -10% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.9M | ✅ | 46.0M | -4% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 76.9M | ✅ | 63.6M | -17% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.9M | ✅ | 42.1M | -6% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.7M | ✅ | 44.4M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.8M | ✅ | 63.5M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 64.3M | 🔴 **+205%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ✅ | 25.8M | 🔴 **+111%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ✅ | 20.3M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 33.7M | ✅ | 36.5M | +9% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ✅ | 27.3M | 🔴 **+144%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 41.1M | ✅ | 47.5M | +15% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 39.1M | ✅ | 43.3M | +11% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 42.5M | ✅ | 43.4M | +2% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 37.2M | ✅ | 39.3M | +6% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.9M | ✅ | 30.7M | 🔴 **+23%** |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.3M | ✅ | 54.9M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 73.6M | ✅ | 66.0M | -10% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 34.4M | ✅ | 37.3M | +8% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.9M | ✅ | 68.8M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ✅ | 16.3M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.6M | ✅ | 39.3M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.9M | ✅ | 35.3M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.2M | ✅ | 12.9M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 69.0M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 17.6M | ✅ | 12.8M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 25.9M | ✅ | 33.2M | 🔴 **+28%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.0M | ✅ | 8.6M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.8M | ✅ | 59.1M | -7% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.2M | ✅ | 59.0M | 🔴 **+95%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ✅ | 10.3M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.5M | ✅ | 13.8M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ✅ | 29.1M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.7M | ✅ | 17.7M | 0% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.4M | ✅ | 20.2M | +16% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.2M | ✅ | 25.2M | +0% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.9M | ✅ | 37.3M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 26.4M | ✅ | 32.1M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 26.3M | ✅ | 33.2M | 🔴 **+26%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ✅ | 33.9M | +19% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ✅ | 33.7M | +18% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 60.0M | 🔴 **+122%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 59.5M | 🔴 **+120%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.1M | ✅ | 30.4M | 🔴 **+31%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ✅ | 36.3M | 🔴 **+40%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ✅ | 29.0M | 🔴 **+46%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ✅ | 36.2M | 🔴 **+209%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.2M | ✅ | 23.4M | -3% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.5M | ✅ | 34.6M | +17% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 34.8M | ✅ | 25.3M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.1M | ✅ | 13.5M | -16% |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 13.8M | 🟢 **-26%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 5.3M | 🟢 **-26%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.4M | ✅ | 55.1M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 48.2M | ✅ | 41.8M | -13% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.4M | ✅ | 12.0M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ✅ | 26.9M | 🔴 **+26%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ✅ | 28.9M | 🔴 **+21%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 7.3M | 🟢 **-56%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 20.3M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 37.2M | ✅ | 28.3M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 145.5M | ✅ | 54.8M | 🟢 **-62%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 54.1M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.2M | ✅ | 48.5M | -15% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 48.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 58.9M | ✅ | 48.2M | -18% |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.3M | ✅ | 11.5M | 🟢 **-76%** |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 14.3M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 68.4M | -14% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 39.8M | -12% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 67.8M | -8% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 38.5M | -11% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 67.7M | -8% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ✅ | 38.7M | -10% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 82.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.5M | ✅ | 49.2M | -10% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.7M | ✅ | 54.1M | 🟢 **-69%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.0M | ✅ | 32.7M | +13% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.1M | ✅ | 35.9M | -6% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.6M | ✅ | 41.7M | -7% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.4M | ✅ | 39.8M | -8% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.0M | ✅ | 31.7M | -14% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.2M | ✅ | 27.6M | 🟢 **-43%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.6M | ✅ | 27.9M | +18% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 27.7M | +12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 24.2M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 27.6M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.1M | ✅ | 29.2M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 27.3M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.7M | ✅ | 22.2M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.8M | ✅ | 29.7M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.5M | ✅ | 24.5M | -7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ✅ | 17.6M | +9% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 14.0M | +1% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 14.5M | +4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ✅ | 27.1M | +10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.8M | ✅ | 23.3M | 🔴 **+24%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 23.2M | +4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 20.7M | +5% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 21.8M | +10% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.1M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ✅ | 8.4M | -8% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.1M | ✅ | 8.2M | 🟢 **-66%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ✅ | 47K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ✅ | 31.0M | -12% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.2M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.9M | ✅ | 25.4M | -12% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 66.1M | ✅ | 913K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.4M | ✅ | 30.6M | -11% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.6M | -15% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.9M | ✅ | 55.4M | 🟢 **-26%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 9.2M | -6% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ✅ | 15.4M | +1% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.2M | 🟢 **-31%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.6M | ✅ | 15.0M | +3% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 21.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.3M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.4M | ✅ | 12.4M | 🟢 **-66%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 56.8M | ✅ | 45.1M | 🟢 **-21%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.5M | ✅ | 26.9M | +2% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 7.5M | 🟢 **-54%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.3M | ✅ | 43.7M | -1% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.8M | ✅ | 34.4M | -20% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.4M | ✅ | 43.6M | -2% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 56.6M | ✅ | 49.9M | -12% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.3M | ✅ | 43.7M | -1% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.8M | ❌ | - | - |
