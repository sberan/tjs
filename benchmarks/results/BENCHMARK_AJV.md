# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 172/199 | 13.5M | 172 | 🟢 **-49%** |
| draft6 | 276 | ✅ 276 | 30.1M | 269/276 | 15.1M | 269 | 🟢 **-50%** |
| draft7 | 313 | ✅ 313 | 15.8M | 296/313 | 13.1M | 296 | -17% |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 413/435 | 6.6M | 413 | 🟢 **-65%** |
| draft2020-12 | 448 | ✅ 448 | 19.8M | 398/448 | 6.9M | 398 | 🟢 **-65%** |
| **Total** | 1671 | 1670/1671 | 20.1M | 1548/1671 | 9.0M | 1548 | 🟢 **-55%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.99x faster** (37 ns vs 111 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.6M | ✅ | 17.4M | 🟢 **-71%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.1M | ✅ | 75.9M | 🟢 **-52%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.9M | ✅ | 49.6M | 🟢 **-63%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 68.8M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.1M | ✅ | 66.1M | 🟢 **-49%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 48.2M | ✅ | 27.2M | 🟢 **-44%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 54.1M | ✅ | 37.3M | 🟢 **-31%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.7M | ✅ | 48.4M | -15% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.0M | ✅ | 74.1M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 34.5M | 🟢 **-26%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 47.4M | ✅ | 23.2M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.1M | ✅ | 17.0M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.5M | ✅ | 12.9M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.0M | ✅ | 74.5M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.2M | ✅ | 7.5M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 46.7M | ✅ | 47.1M | +1% |
| allOf.json | allOf | 4 | ✅ | 74.5M | ✅ | 34.2M | 🟢 **-54%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.2M | ✅ | 23.1M | -15% |
| allOf.json | allOf simple types | 2 | ✅ | 113.2M | ✅ | 51.1M | 🟢 **-55%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 74.7M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.5M | ✅ | 74.2M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.6M | ✅ | 48.7M | -12% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 50.1M | 🟢 **-57%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 49.5M | -14% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 81.9M | ✅ | 4.9M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 60.0M | ✅ | 25.6M | 🟢 **-57%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ✅ | 20.1M | 🟢 **-60%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.2M | ✅ | 26.3M | 🟢 **-40%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 67.5M | 🟢 **-61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 22.5M | 🟢 **-61%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 48.7M | 🟢 **-52%** |
| default.json | invalid string value for default | 2 | ✅ | 49.3M | ✅ | 47.5M | -4% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 43.7M | 🟢 **-45%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 98.2M | ✅ | 49.3M | 🟢 **-50%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 28.9M | ✅ | 36.7M | 🔴 **+27%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.1M | ✅ | 38.8M | 🟢 **-34%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.1M | ✅ | 20.9M | +15% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 56.8M | ✅ | 39.2M | 🟢 **-31%** |
| enum.json | simple enum validation | 2 | ✅ | 63.8M | ✅ | 45.2M | 🟢 **-29%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.3M | ✅ | 17.9M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.7M | ✅ | 42.4M | 🟢 **-29%** |
| enum.json | enums in properties | 6 | ✅ | 50.0M | ✅ | 31.9M | 🟢 **-36%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.3M | ✅ | 42.4M | -14% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.3M | ✅ | 39.5M | 🟢 **-64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.3M | ✅ | 25.8M | 🟢 **-53%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.3M | ✅ | 37.8M | 🟢 **-65%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 46.6M | ✅ | 23.5M | 🟢 **-50%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 42.9M | 🟢 **-63%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 51.8M | ✅ | 28.4M | 🟢 **-45%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ✅ | 48.8M | 🟢 **-57%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.3M | ✅ | 28.5M | 🟢 **-47%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 45.3M | 🟢 **-49%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 45.8M | ✅ | 25.4M | 🟢 **-45%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 39.7M | 🟢 **-56%** |
| format.json | email format | 6 | ✅ | 78.0M | ✅ | 55.1M | 🟢 **-29%** |
| format.json | ipv4 format | 6 | ✅ | 163.4M | ✅ | 43.5M | 🟢 **-73%** |
| format.json | ipv6 format | 6 | ✅ | 78.0M | ✅ | 55.7M | 🟢 **-29%** |
| format.json | hostname format | 6 | ✅ | 163.0M | ✅ | 53.9M | 🟢 **-67%** |
| format.json | date-time format | 6 | ✅ | 77.1M | ✅ | 55.7M | 🟢 **-28%** |
| format.json | uri format | 6 | ✅ | 162.8M | ✅ | 55.1M | 🟢 **-66%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.0M | ✅ | 34.5M | -4% |
| items.json | a schema given for items | 4 | ✅ | 89.1M | ✅ | 42.5M | 🟢 **-52%** |
| items.json | an array of schemas for items | 6 | ✅ | 58.4M | ✅ | 54.2M | -7% |
| items.json | items and subitems | 6 | ✅ | 34.6M | ✅ | 21.9M | 🟢 **-37%** |
| items.json | nested items | 3 | ✅ | 13.0M | ✅ | 11.7M | -10% |
| items.json | items with null instance elements | 1 | ✅ | 70.3M | ✅ | 67.3M | -4% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 65.8M | -12% |
| maxItems.json | maxItems validation | 4 | ✅ | 59.7M | ✅ | 46.6M | 🟢 **-22%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.6M | ✅ | 47.7M | -11% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.9M | ✅ | 36.2M | 🟢 **-26%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.4M | ✅ | 32.2M | -18% |
| maximum.json | maximum validation | 4 | ✅ | 57.1M | ✅ | 47.7M | -17% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.5M | ✅ | 48.2M | -15% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 57.0M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.6M | ✅ | 46.9M | 🟢 **-29%** |
| minLength.json | minLength validation | 5 | ✅ | 48.0M | ✅ | 43.3M | -10% |
| minProperties.json | minProperties validation | 6 | ✅ | 50.2M | ✅ | 43.2M | -14% |
| minimum.json | minimum validation | 4 | ✅ | 56.9M | ✅ | 47.4M | -17% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 60.1M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 44.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.3M | ✅ | 45.4M | 🟢 **-21%** |
| multipleOf.json | by int | 3 | ✅ | 60.2M | ✅ | 43.4M | 🟢 **-28%** |
| multipleOf.json | by number | 3 | ✅ | 56.0M | ✅ | 41.6M | 🟢 **-26%** |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ✅ | 40.4M | 🟢 **-22%** |
| multipleOf.json | float division = inf | 1 | ✅ | 39.0M | ✅ | 8.7M | 🟢 **-78%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 7.1M | 🟢 **-89%** |
| not.json | not | 2 | ✅ | 49.3M | ✅ | 43.3M | -12% |
| not.json | not multiple types | 3 | ✅ | 49.8M | ✅ | 37.9M | 🟢 **-24%** |
| not.json | not more complex schema | 3 | ✅ | 52.4M | ✅ | 39.7M | 🟢 **-24%** |
| not.json | forbidden property | 2 | ✅ | 20.1M | ✅ | 43.7M | 🔴 **+118%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.7M | ✅ | 39.3M | -3% |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 73.4M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 46.3M | ✅ | 21.8M | 🟢 **-53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.9M | ✅ | 26.5M | -8% |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.3M | ✅ | 21.3M | 🟢 **-43%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 40.2M | 🟢 **-27%** |
| oneOf.json | oneOf with required | 4 | ✅ | 37.3M | ✅ | 16.9M | 🟢 **-55%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.0M | ✅ | 22.3M | 🟢 **-44%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 47.4M | ✅ | 28.0M | 🟢 **-41%** |
| pattern.json | pattern validation | 8 | ✅ | 46.8M | ✅ | 44.8M | -4% |
| pattern.json | pattern is not anchored | 1 | ✅ | 44.5M | ✅ | 31.0M | 🟢 **-30%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 13.5M | 🟢 **-45%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 7.7M | 🟢 **-47%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 8.5M | 🟢 **-50%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.4M | ✅ | 17.9M | 🔴 **+25%** |
| properties.json | object properties validation | 6 | ✅ | 44.5M | ✅ | 45.0M | +1% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 10.1M | 🟢 **-48%** |
| properties.json | properties with escaped characters | 2 | ✅ | 36.0M | ✅ | 43.8M | 🔴 **+22%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 61.1M | +2% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.4M | ✅ | 20.5M | -9% |
| ref.json | relative pointer ref to object | 2 | ✅ | 35.6M | ✅ | 43.6M | 🔴 **+22%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 40.4M | ✅ | 42.4M | +5% |
| ref.json | escaped pointer ref | 6 | ✅ | 37.4M | ✅ | 40.3M | +8% |
| ref.json | nested refs | 2 | ✅ | 41.2M | ✅ | 48.3M | +17% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 46.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 55.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.7M | ✅ | 44.1M | +3% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.6M | ✅ | 39.7M | -7% |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 42.7M | ✅ | 41.8M | -2% |
| ref.json | Location-independent identifier | 2 | ✅ | 56.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 43.1M | ✅ | 17.5M | 🟢 **-59%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.7M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.7M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.8M | ✅ | 50.3M | -10% |
| refRemote.json | remote ref | 2 | ✅ | 52.5M | ✅ | 49.6M | -6% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 54.0M | ✅ | 49.5M | -8% |
| refRemote.json | ref within remote ref | 2 | ✅ | 54.0M | ✅ | 47.9M | -11% |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 48.9M | -8% |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 74.5M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 40.8M | ✅ | 38.9M | -5% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.7M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 41.8M | ✅ | 39.0M | -7% |
| type.json | number type matches numbers | 9 | ✅ | 46.2M | ✅ | 43.7M | -5% |
| type.json | string type matches strings | 9 | ✅ | 48.5M | ✅ | 40.5M | -16% |
| type.json | object type matches objects | 7 | ✅ | 41.4M | ✅ | 40.1M | -3% |
| type.json | array type matches arrays | 7 | ✅ | 44.2M | ✅ | 36.9M | -16% |
| type.json | boolean type matches booleans | 10 | ✅ | 43.7M | ✅ | 43.8M | +0% |
| type.json | null type matches only the null object | 10 | ✅ | 43.2M | ✅ | 42.4M | -2% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.0M | ✅ | 38.6M | -16% |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 50.6M | -9% |
| type.json | type: array or object | 5 | ✅ | 49.2M | ✅ | 42.9M | -13% |
| type.json | type: array, object or null | 5 | ✅ | 55.1M | ✅ | 41.1M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 10.4M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.4M | ✅ | 20.9M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.6M | ✅ | 26.6M | 🔴 **+51%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 54.7M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.0M | ✅ | 54.3M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.6M | ✅ | 49.3M | -14% |
| optional/bignum.json | integer | 2 | ✅ | 72.6M | ✅ | 14.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 67.0M | -12% |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 40.2M | -6% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 40.7M | 🟢 **-42%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ✅ | 67.9M | -3% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.1M | ✅ | 25.4M | 🟢 **-47%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.3M | ✅ | 27.8M | 🔴 **+52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.2M | ✅ | 27.9M | +15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 27.4M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.2M | ✅ | 26.3M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.6M | ✅ | 26.0M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 25.1M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.5M | ✅ | 27.6M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 29.4M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.8M | ✅ | 23.5M | -9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ✅ | 17.8M | +10% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 13.3M | -6% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 14.6M | +3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.8M | ✅ | 27.0M | +9% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.6M | ✅ | 21.6M | +5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ✅ | 23.0M | +3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 19.9M | +4% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 20.5M | +3% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.3M | +16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 9.0M | +2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ✅ | 22.0M | 🔴 **+24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.5M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 31.2M | ✅ | 30.6M | -2% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ✅ | 2.8M | 🟢 **-82%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.7M | ✅ | 55.0M | 🟢 **-26%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.4M | 🟢 **-30%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.0M | ✅ | 26.1M | +0% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ✅ | 8.3M | 🟢 **-48%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.0M | ✅ | 7.3M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.0M | ✅ | 34.4M | -14% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 155.0M | ✅ | 72.5M | 🟢 **-53%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.7M | ✅ | 49.8M | 🟢 **-35%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 161.0M | ✅ | 70.9M | 🟢 **-56%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 66.4M | 🟢 **-20%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 27.0M | 🟢 **-52%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.9M | ✅ | 38.0M | -2% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.2M | ✅ | 48.2M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 151.6M | ✅ | 74.0M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.8M | ✅ | 30.2M | 🟢 **-51%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 33.1M | ✅ | 23.3M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.3M | ✅ | 16.7M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 13.1M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 154.9M | ✅ | 76.5M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 7.8M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 47.0M | 🟢 **-30%** |
| allOf.json | allOf | 4 | ✅ | 34.2M | ✅ | 26.6M | 🟢 **-22%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 25.8M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 41.1M | 🟢 **-32%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 154.5M | ✅ | 74.3M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 39.4M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.2M | ✅ | 40.4M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 154.7M | ✅ | 74.5M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 154.6M | ✅ | 74.1M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 49.9M | -20% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 46.5M | 🟢 **-60%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 49.4M | 🟢 **-24%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.5M | ✅ | 4.9M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 66.4M | ✅ | 27.2M | 🟢 **-59%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.2M | ✅ | 18.8M | 🟢 **-63%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.0M | ✅ | 74.1M | 🟢 **-51%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 153.6M | ✅ | 74.1M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 19.9M | 🟢 **-60%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.3M | ✅ | 26.8M | 🟢 **-64%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 166.9M | ✅ | 69.1M | 🟢 **-59%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.5M | ✅ | 27.4M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 174.5M | ✅ | 55.2M | 🟢 **-68%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 87.1M | ✅ | 38.3M | 🟢 **-56%** |
| const.json | const validation | 3 | ✅ | 55.2M | ✅ | 38.4M | 🟢 **-30%** |
| const.json | const with object | 4 | ✅ | 49.8M | ✅ | 15.0M | 🟢 **-70%** |
| const.json | const with array | 3 | ✅ | 48.6M | ✅ | 16.9M | 🟢 **-65%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 46.3M | 🟢 **-61%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ✅ | 39.0M | 🟢 **-34%** |
| const.json | const with true does not match 1 | 3 | ✅ | 107.1M | ✅ | 27.2M | 🟢 **-75%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 26.9M | 🟢 **-50%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ✅ | 26.8M | 🟢 **-72%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.6M | ✅ | 12.7M | 🟢 **-75%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ✅ | 12.5M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 42.0M | 🟢 **-21%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.1M | ✅ | 49.2M | 🟢 **-57%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 41.6M | 🟢 **-25%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.1M | ✅ | 43.0M | 🟢 **-61%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 47.5M | -14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 40.0M | 🟢 **-49%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.6M | ✅ | 48.1M | -14% |
| contains.json | contains keyword validation | 6 | ✅ | 94.8M | ✅ | 13.9M | 🟢 **-85%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ✅ | 14.4M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.2M | ✅ | 47.9M | 🟢 **-54%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 32.0M | 🟢 **-45%** |
| contains.json | items + contains | 4 | ✅ | 61.9M | ✅ | 8.0M | 🟢 **-87%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.8M | ✅ | 66.5M | -18% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 59.1M | 🟢 **-42%** |
| default.json | invalid string value for default | 2 | ✅ | 52.6M | ✅ | 46.8M | -11% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.9M | ✅ | 44.3M | 🟢 **-44%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.8M | ✅ | 1.4M | 🟢 **-88%** |
| dependencies.json | dependencies | 7 | ✅ | 97.1M | ✅ | 47.5M | 🟢 **-51%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 171.4M | ✅ | 64.4M | 🟢 **-62%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.2M | ✅ | 32.4M | -19% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.5M | ✅ | 31.3M | 🟢 **-23%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 85.5M | ✅ | 35.4M | 🟢 **-59%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ✅ | 21.4M | +14% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.1M | ✅ | 38.8M | 🟢 **-27%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 39.9M | 🟢 **-37%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.3M | ✅ | 11.4M | 🟢 **-81%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.0M | ✅ | 45.0M | 🟢 **-33%** |
| enum.json | enums in properties | 6 | ✅ | 54.9M | ✅ | 35.5M | 🟢 **-35%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.3M | ✅ | 44.8M | 🟢 **-37%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.1M | ✅ | 39.3M | 🟢 **-64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.9M | ✅ | 21.2M | 🟢 **-61%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.3M | ✅ | 30.5M | 🟢 **-72%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 20.7M | 🟢 **-62%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ✅ | 48.9M | 🟢 **-57%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.2M | ✅ | 11.7M | 🟢 **-80%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.2M | ✅ | 44.0M | 🟢 **-61%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.1M | ✅ | 21.3M | 🟢 **-65%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 45.8M | 🟢 **-48%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.9M | ✅ | 28.5M | 🟢 **-52%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 111.1M | ✅ | 40.8M | 🟢 **-63%** |
| format.json | email format | 6 | ✅ | 88.0M | ✅ | 54.4M | 🟢 **-38%** |
| format.json | ipv4 format | 6 | ✅ | 158.9M | ✅ | 54.3M | 🟢 **-66%** |
| format.json | ipv6 format | 6 | ✅ | 87.7M | ✅ | 54.7M | 🟢 **-38%** |
| format.json | hostname format | 6 | ✅ | 159.3M | ✅ | 43.6M | 🟢 **-73%** |
| format.json | date-time format | 6 | ✅ | 88.3M | ✅ | 53.8M | 🟢 **-39%** |
| format.json | json-pointer format | 6 | ✅ | 159.4M | ✅ | 48.8M | 🟢 **-69%** |
| format.json | uri format | 6 | ✅ | 88.3M | ✅ | 55.8M | 🟢 **-37%** |
| format.json | uri-reference format | 6 | ✅ | 159.3M | ✅ | 55.5M | 🟢 **-65%** |
| format.json | uri-template format | 6 | ✅ | 88.2M | ✅ | 55.7M | 🟢 **-37%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 30.1M | 🟢 **-48%** |
| items.json | a schema given for items | 4 | ✅ | 54.9M | ✅ | 43.4M | 🟢 **-21%** |
| items.json | an array of schemas for items | 6 | ✅ | 107.9M | ✅ | 49.2M | 🟢 **-54%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 166.9M | ✅ | 50.1M | 🟢 **-70%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.3M | ✅ | 37.4M | 🟢 **-64%** |
| items.json | items with boolean schemas | 3 | ✅ | 61.7M | ✅ | 40.8M | 🟢 **-34%** |
| items.json | items and subitems | 6 | ✅ | 35.2M | ✅ | 21.6M | 🟢 **-39%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 10.8M | -19% |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 36.7M | 🟢 **-52%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 82.9M | ✅ | 68.0M | -18% |
| maxItems.json | maxItems validation | 4 | ✅ | 71.0M | ✅ | 47.8M | 🟢 **-33%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.3M | ✅ | 41.5M | 🟢 **-35%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.9M | ✅ | 47.6M | -18% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 46.7M | ✅ | 43.5M | -7% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.9M | ✅ | 39.6M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.6M | ✅ | 34.7M | -8% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 35.4M | -17% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 46.8M | 🟢 **-32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.8M | ✅ | 47.9M | 🟢 **-26%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 48.1M | 🟢 **-35%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 47.9M | 🟢 **-24%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 44.5M | -16% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 44.3M | -15% |
| minProperties.json | minProperties validation | 6 | ✅ | 54.7M | ✅ | 42.5M | 🟢 **-22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.4M | ✅ | 32.8M | 🟢 **-21%** |
| minimum.json | minimum validation | 4 | ✅ | 68.9M | ✅ | 47.3M | 🟢 **-31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 47.2M | 🟢 **-27%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 44.0M | 🟢 **-36%** |
| multipleOf.json | by number | 3 | ✅ | 58.9M | ✅ | 42.8M | 🟢 **-27%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 41.5M | 🟢 **-28%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 9.0M | 🟢 **-79%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 9.2M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 43.6M | 🟢 **-31%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 38.1M | 🟢 **-32%** |
| not.json | not more complex schema | 3 | ✅ | 59.3M | ✅ | 39.8M | 🟢 **-33%** |
| not.json | forbidden property | 2 | ✅ | 45.7M | ✅ | 44.2M | -3% |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 39.6M | -19% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.8M | ✅ | 39.5M | 🟢 **-35%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.9M | ✅ | 55.0M | 🟢 **-69%** |
| not.json | double negation | 1 | ✅ | 155.0M | ✅ | 73.7M | 🟢 **-52%** |
| oneOf.json | oneOf | 4 | ✅ | 50.7M | ✅ | 21.8M | 🟢 **-57%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.4M | ✅ | 23.1M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.7M | ✅ | 37.4M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 155.0M | ✅ | 24.9M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 37.3M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 18.4M | 🟢 **-63%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 21.0M | 🟢 **-48%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.8M | ✅ | 40.6M | 🟢 **-34%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 16.9M | 🟢 **-59%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.6M | ✅ | 21.6M | 🟢 **-55%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 28.3M | 🟢 **-55%** |
| pattern.json | pattern validation | 8 | ✅ | 51.0M | ✅ | 44.9M | -12% |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 31.0M | 🟢 **-36%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 12.3M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 7.4M | 🟢 **-51%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.1M | ✅ | 8.3M | 🟢 **-51%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ✅ | 8.8M | 🟢 **-58%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 21.6M | 🔴 **+22%** |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 45.0M | -9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 9.9M | 🟢 **-49%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ✅ | 38.8M | -9% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.6M | ✅ | 38.6M | -13% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 57.7M | -11% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.6M | ✅ | 30.8M | 🟢 **-29%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 16.8M | -13% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 166.7M | ✅ | 64.0M | 🟢 **-62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.6M | ✅ | 29.0M | 🟢 **-34%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.8M | ✅ | 32.0M | 🟢 **-23%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ✅ | 34.2M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 19.4M | -20% |
| ref.json | relative pointer ref to object | 2 | ✅ | 57.1M | ✅ | 43.1M | 🟢 **-25%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 64.7M | ✅ | 44.2M | 🟢 **-32%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.3M | ✅ | 40.3M | 0% |
| ref.json | nested refs | 2 | ✅ | 49.5M | ✅ | 38.2M | 🟢 **-23%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ✅ | 4.8M | 🟢 **-81%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 42.8M | -9% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 44.0M | -6% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 155.2M | ✅ | 74.3M | 🟢 **-52%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 40.9M | -18% |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 7.6M | -17% |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 44.8M | -4% |
| ref.json | Location-independent identifier | 2 | ✅ | 59.8M | ✅ | 49.4M | -17% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.7M | ✅ | 47.7M | 🟢 **-20%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ✅ | 49.3M | -18% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.2M | ✅ | 14.4M | 🟢 **-70%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.3M | ✅ | 33.3M | -8% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ✅ | 33.3M | -10% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 23.9M | 🟢 **-29%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 38.4M | -18% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 43.3M | -7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.8M | ✅ | 44.0M | -6% |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.8M | ✅ | 43.1M | -8% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 43.6M | -7% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.6M | ✅ | 44.1M | -9% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.5M | ✅ | 50.1M | -16% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 50.0M | -20% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.3M | ✅ | 50.4M | -18% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 50.3M | -19% |
| refRemote.json | remote ref | 2 | ✅ | 59.3M | ✅ | 48.5M | -18% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.6M | ✅ | 49.4M | -17% |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.5M | ✅ | 49.4M | -17% |
| refRemote.json | base URI change | 2 | ✅ | 32.2M | ✅ | 28.1M | -13% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.6M | ✅ | 27.7M | -15% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ✅ | 27.7M | 🟢 **-29%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ✅ | 11.0M | 🟢 **-71%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 48.7M | ✅ | 36.0M | 🟢 **-26%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.3M | ✅ | 41.7M | -12% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ✅ | 31.0M | 🟢 **-23%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 47.0M | ✅ | 41.8M | -11% |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 48.8M | -16% |
| required.json | required default validation | 1 | ✅ | 153.5M | ✅ | 68.3M | 🟢 **-55%** |
| required.json | required with empty array | 1 | ✅ | 155.3M | ✅ | 74.4M | 🟢 **-52%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 38.0M | -15% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.4M | ✅ | 39.7M | 🟢 **-24%** |
| type.json | number type matches numbers | 9 | ✅ | 54.8M | ✅ | 43.9M | -20% |
| type.json | string type matches strings | 9 | ✅ | 54.6M | ✅ | 40.3M | 🟢 **-26%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 39.8M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 37.0M | 🟢 **-28%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 43.1M | -17% |
| type.json | null type matches only the null object | 10 | ✅ | 48.7M | ✅ | 42.5M | -13% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.9M | ✅ | 38.2M | 🟢 **-26%** |
| type.json | type as array with one item | 2 | ✅ | 61.6M | ✅ | 49.0M | 🟢 **-20%** |
| type.json | type: array or object | 5 | ✅ | 54.8M | ✅ | 42.8M | 🟢 **-22%** |
| type.json | type: array, object or null | 5 | ✅ | 66.8M | ✅ | 44.9M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 10.5M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.3M | ✅ | 20.6M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 26.7M | 🔴 **+45%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 99.8M | ✅ | 55.0M | 🟢 **-45%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.0M | ✅ | 54.2M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.2M | ✅ | 46.1M | 🟢 **-33%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 68.6M | -19% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 40.1M | -16% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.8M | -12% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 38.3M | -16% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 68.1M | -12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 39.0M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 49.8M | ✅ | 27.7M | 🟢 **-44%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.7M | ✅ | 27.8M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 27.9M | +4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.4M | ✅ | 27.6M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 27.3M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 29.1M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.6M | ✅ | 27.4M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 27.6M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 28.1M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 26.8M | -3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 17.3M | +4% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 13.4M | -7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.6M | ✅ | 13.5M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 26.9M | +2% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ✅ | 23.1M | +8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 23.1M | -2% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 20.9M | +3% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 21.7M | +5% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 8.9M | +11% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 9.0M | +5% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ✅ | 22.7M | 🔴 **+25%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.1M | ✅ | 30.6M | -18% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.9M | ✅ | 25.1M | -16% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.1M | ✅ | 55.4M | 🟢 **-32%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 9.2M | -7% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.6M | ✅ | 15.4M | -7% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 39.8M | ✅ | 14.4M | 🟢 **-64%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 42.9M | ✅ | 12.5M | 🟢 **-71%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.4M | ✅ | 9.7M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.3M | ✅ | 27.5M | +1% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ✅ | 9.1M | 🟢 **-46%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.0M | ✅ | 7.2M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.6M | ✅ | 34.4M | -8% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 73.6M | 🟢 **-54%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 67.0M | ✅ | 47.7M | 🟢 **-29%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ✅ | 68.4M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 66.5M | -16% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 25.9M | 🟢 **-54%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.4M | ✅ | 34.7M | -7% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 48.1M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 63.0M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.8M | ✅ | 32.5M | 🟢 **-48%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.8M | ✅ | 23.3M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.3M | ✅ | 16.4M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.2M | ✅ | 13.2M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 73.8M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 7.6M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 25.4M | 🟢 **-62%** |
| allOf.json | allOf | 4 | ✅ | 33.2M | ✅ | 20.0M | 🟢 **-40%** |
| allOf.json | allOf with base schema | 5 | ✅ | 38.5M | ✅ | 9.7M | 🟢 **-75%** |
| allOf.json | allOf simple types | 2 | ✅ | 56.9M | ✅ | 45.1M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 74.1M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.8M | ✅ | 30.6M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 38.8M | 🟢 **-58%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.9M | ✅ | 73.2M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 73.6M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 43.9M | 🟢 **-26%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 39.9M | 🟢 **-66%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 40.9M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.5M | ✅ | 4.5M | 🟢 **-95%** |
| anyOf.json | anyOf | 4 | ✅ | 63.2M | ✅ | 26.3M | 🟢 **-58%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.7M | ✅ | 18.4M | 🟢 **-64%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.1M | ✅ | 73.0M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 73.8M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 47.0M | ✅ | 19.1M | 🟢 **-59%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ✅ | 32.6M | 🟢 **-56%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 53.3M | 🟢 **-69%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 27.1M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.3M | ✅ | 55.5M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 81.0M | ✅ | 31.6M | 🟢 **-61%** |
| const.json | const validation | 3 | ✅ | 51.7M | ✅ | 27.9M | 🟢 **-46%** |
| const.json | const with object | 4 | ✅ | 50.1M | ✅ | 14.6M | 🟢 **-71%** |
| const.json | const with array | 3 | ✅ | 43.7M | ✅ | 15.8M | 🟢 **-64%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 47.3M | 🟢 **-60%** |
| const.json | const with false does not match 0 | 3 | ✅ | 54.8M | ✅ | 32.1M | 🟢 **-41%** |
| const.json | const with true does not match 1 | 3 | ✅ | 107.7M | ✅ | 39.9M | 🟢 **-63%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.0M | ✅ | 26.8M | 🟢 **-45%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 26.5M | 🟢 **-72%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 48.3M | ✅ | 12.3M | 🟢 **-75%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 48.0M | ✅ | 12.5M | 🟢 **-74%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 49.3M | ✅ | 39.5M | -20% |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 42.7M | 🟢 **-63%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.6M | ✅ | 41.1M | 🟢 **-22%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.3M | ✅ | 42.4M | 🟢 **-62%** |
| const.json | nul characters in strings | 2 | ✅ | 52.4M | ✅ | 39.3M | 🟢 **-25%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 41.0M | 🟢 **-48%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 45.6M | -8% |
| contains.json | contains keyword validation | 6 | ✅ | 92.6M | ✅ | 9.8M | 🟢 **-89%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 50.6M | ✅ | 13.1M | 🟢 **-74%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 45.4M | 🟢 **-56%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.3M | ✅ | 25.5M | 🟢 **-53%** |
| contains.json | items + contains | 4 | ✅ | 48.5M | ✅ | 5.8M | 🟢 **-88%** |
| contains.json | contains with false if subschema | 2 | ✅ | 56.6M | ✅ | 45.9M | -19% |
| contains.json | contains with null instance elements | 1 | ✅ | 127.0M | ✅ | 66.0M | 🟢 **-48%** |
| default.json | invalid type for default | 2 | ✅ | 64.4M | ✅ | 59.2M | -8% |
| default.json | invalid string value for default | 2 | ✅ | 71.2M | ✅ | 42.0M | 🟢 **-41%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 43.1M | ✅ | 42.6M | -1% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.9M | ✅ | 1.2M | 🟢 **-91%** |
| dependencies.json | dependencies | 7 | ✅ | 56.8M | ✅ | 48.4M | -15% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.1M | ✅ | 63.9M | 🟢 **-64%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.8M | ✅ | 32.3M | +8% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 38.0M | ✅ | 35.4M | -7% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 46.3M | ✅ | 40.1M | -13% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.4M | ✅ | 20.6M | +12% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 18.4M | ✅ | 39.3M | 🔴 **+114%** |
| enum.json | simple enum validation | 2 | ✅ | 56.9M | ✅ | 49.2M | -14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.3M | ✅ | 11.3M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.9M | ✅ | 45.0M | 🟢 **-24%** |
| enum.json | enums in properties | 6 | ✅ | 36.0M | ✅ | 37.9M | +5% |
| enum.json | enum with escaped characters | 3 | ✅ | 59.8M | ✅ | 51.5M | -14% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.1M | ✅ | 39.3M | 🟢 **-29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 49.1M | ✅ | 21.1M | 🟢 **-57%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 54.4M | ✅ | 37.9M | 🟢 **-30%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.5M | ✅ | 21.0M | 🟢 **-58%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.7M | ✅ | 48.9M | 🟢 **-21%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 51.2M | ✅ | 23.0M | 🟢 **-55%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 61.6M | ✅ | 47.8M | 🟢 **-22%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 50.9M | ✅ | 22.6M | 🟢 **-56%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 45.3M | -14% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 52.0M | ✅ | 40.5M | 🟢 **-22%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 51.6M | ✅ | 40.6M | 🟢 **-21%** |
| format.json | email format | 6 | ✅ | 77.4M | ✅ | 53.9M | 🟢 **-30%** |
| format.json | idn-email format | 6 | ✅ | 77.3M | ✅ | 55.3M | 🟢 **-28%** |
| format.json | regex format | 6 | ✅ | 74.5M | ✅ | 55.5M | 🟢 **-25%** |
| format.json | ipv4 format | 6 | ✅ | 42.4M | ✅ | 55.5M | 🔴 **+31%** |
| format.json | ipv6 format | 6 | ✅ | 74.3M | ✅ | 54.6M | 🟢 **-27%** |
| format.json | idn-hostname format | 6 | ✅ | 73.7M | ✅ | 55.6M | 🟢 **-24%** |
| format.json | hostname format | 6 | ✅ | 77.2M | ✅ | 55.4M | 🟢 **-28%** |
| format.json | date format | 6 | ✅ | 77.2M | ✅ | 54.2M | 🟢 **-30%** |
| format.json | date-time format | 6 | ✅ | 77.9M | ✅ | 55.4M | 🟢 **-29%** |
| format.json | time format | 6 | ✅ | 80.9M | ✅ | 55.2M | 🟢 **-32%** |
| format.json | json-pointer format | 6 | ✅ | 82.9M | ✅ | 53.0M | 🟢 **-36%** |
| format.json | relative-json-pointer format | 6 | ✅ | 83.5M | ✅ | 55.3M | 🟢 **-34%** |
| format.json | iri format | 6 | ✅ | 81.9M | ✅ | 55.2M | 🟢 **-33%** |
| format.json | iri-reference format | 6 | ✅ | 83.3M | ✅ | 55.5M | 🟢 **-33%** |
| format.json | uri format | 6 | ✅ | 83.4M | ✅ | 55.3M | 🟢 **-34%** |
| format.json | uri-reference format | 6 | ✅ | 77.1M | ✅ | 55.5M | 🟢 **-28%** |
| format.json | uri-template format | 6 | ✅ | 80.0M | ✅ | 54.9M | 🟢 **-31%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.0M | ✅ | 67.2M | 🟢 **-61%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ✅ | 68.1M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 68.1M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 65.5M | ✅ | 43.1M | 🟢 **-34%** |
| if-then-else.json | if and else without then | 3 | ✅ | 65.2M | ✅ | 38.2M | 🟢 **-41%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.5M | ✅ | 36.2M | 🟢 **-37%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.2M | ✅ | 67.5M | 🟢 **-61%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 60.9M | ✅ | 49.5M | -19% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ✅ | 47.0M | 🟢 **-22%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.2M | ✅ | 32.6M | -19% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.2M | ✅ | 37.7M | +1% |
| items.json | a schema given for items | 4 | ✅ | 53.2M | ✅ | 43.5M | -18% |
| items.json | an array of schemas for items | 6 | ✅ | 61.9M | ✅ | 50.2M | -19% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ✅ | 68.4M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 58.2M | ✅ | 43.6M | 🟢 **-25%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.2M | ✅ | 49.8M | -13% |
| items.json | items and subitems | 6 | ✅ | 26.9M | ✅ | 20.3M | 🟢 **-25%** |
| items.json | nested items | 3 | ✅ | 13.3M | ✅ | 11.5M | -13% |
| items.json | single-form items with null instance ... | 1 | ✅ | 73.5M | ✅ | 67.2M | -9% |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.9M | ✅ | 68.5M | -13% |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ✅ | 48.0M | 🟢 **-31%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.8M | ✅ | 47.1M | 🟢 **-21%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.2M | ✅ | 47.5M | -15% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.3M | ✅ | 43.2M | -12% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.2M | ✅ | 39.8M | 🟢 **-22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.1M | ✅ | 31.9M | 🟢 **-21%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.8M | ✅ | 35.0M | -14% |
| maximum.json | maximum validation | 4 | ✅ | 65.2M | ✅ | 47.4M | 🟢 **-27%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.2M | ✅ | 47.7M | 🟢 **-26%** |
| minItems.json | minItems validation | 4 | ✅ | 69.7M | ✅ | 47.8M | 🟢 **-31%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 59.8M | ✅ | 45.8M | 🟢 **-23%** |
| minLength.json | minLength validation | 5 | ✅ | 50.3M | ✅ | 42.5M | -16% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.6M | ✅ | 43.0M | -13% |
| minProperties.json | minProperties validation | 6 | ✅ | 52.2M | ✅ | 42.6M | -18% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.5M | ✅ | 33.6M | -17% |
| minimum.json | minimum validation | 4 | ✅ | 64.9M | ✅ | 46.7M | 🟢 **-28%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.2M | ✅ | 47.9M | 🟢 **-22%** |
| multipleOf.json | by int | 3 | ✅ | 65.0M | ✅ | 43.6M | 🟢 **-33%** |
| multipleOf.json | by number | 3 | ✅ | 58.9M | ✅ | 41.6M | 🟢 **-29%** |
| multipleOf.json | by small number | 2 | ✅ | 54.3M | ✅ | 40.9M | 🟢 **-25%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 9.0M | 🟢 **-78%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.0M | ✅ | 9.2M | 🟢 **-86%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 39.6M | 🟢 **-33%** |
| not.json | not multiple types | 3 | ✅ | 52.8M | ✅ | 37.5M | 🟢 **-29%** |
| not.json | not more complex schema | 3 | ✅ | 55.2M | ✅ | 39.5M | 🟢 **-28%** |
| not.json | forbidden property | 2 | ✅ | 44.1M | ✅ | 43.0M | -3% |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.6M | ✅ | 32.2M | 🟢 **-26%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 43.8M | ✅ | 32.1M | 🟢 **-27%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.5M | ✅ | 54.7M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 73.5M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 48.5M | ✅ | 20.7M | 🟢 **-57%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.3M | ✅ | 26.1M | -19% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 36.5M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ✅ | 25.4M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 47.0M | ✅ | 36.4M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 42.3M | ✅ | 17.6M | 🟢 **-58%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.6M | ✅ | 19.2M | 🟢 **-50%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.3M | ✅ | 39.4M | 🟢 **-32%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.5M | ✅ | 16.1M | 🟢 **-59%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.1M | ✅ | 19.4M | 🟢 **-53%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.7M | ✅ | 28.0M | 🟢 **-52%** |
| pattern.json | pattern validation | 8 | ✅ | 50.7M | ✅ | 44.8M | -12% |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.6M | ✅ | 30.4M | 🟢 **-35%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 13.1M | 🟢 **-49%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 7.2M | 🟢 **-48%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.4M | ✅ | 8.0M | 🟢 **-51%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.5M | ✅ | 8.9M | 🟢 **-54%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.2M | ✅ | 21.5M | 🔴 **+25%** |
| properties.json | object properties validation | 6 | ✅ | 47.1M | ✅ | 44.3M | -6% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 9.6M | 🟢 **-49%** |
| properties.json | properties with boolean schema | 4 | ✅ | 40.6M | ✅ | 40.5M | 0% |
| properties.json | properties with escaped characters | 2 | ✅ | 41.5M | ✅ | 43.4M | +5% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 55.2M | ✅ | 60.5M | +10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.3M | ✅ | 27.5M | 🟢 **-35%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ✅ | 16.9M | -13% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 68.3M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.9M | ✅ | 28.6M | 🟢 **-30%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ✅ | 31.9M | -17% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ✅ | 33.4M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 23.1M | ✅ | 19.3M | -17% |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.3M | ✅ | 43.5M | -2% |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.9M | ✅ | 44.6M | -9% |
| ref.json | escaped pointer ref | 6 | ✅ | 38.7M | ✅ | 38.7M | 0% |
| ref.json | nested refs | 2 | ✅ | 44.3M | ✅ | 44.9M | +1% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.9M | ✅ | 4.1M | 🟢 **-83%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.5M | ✅ | 44.0M | -1% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 41.7M | -6% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ✅ | 73.8M | 🟢 **-54%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 47.0M | ✅ | 39.6M | -16% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 7.1M | -20% |
| ref.json | refs with quote | 2 | ✅ | 44.3M | ✅ | 44.8M | +1% |
| ref.json | Location-independent identifier | 2 | ✅ | 54.7M | ✅ | 45.4M | -17% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 54.9M | ✅ | 46.8M | -15% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.1M | ✅ | 47.5M | -14% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 42.3M | ✅ | 14.4M | 🟢 **-66%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.4M | ✅ | 32.5M | -6% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.4M | ✅ | 31.1M | -10% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 53.5M | ✅ | 40.6M | 🟢 **-24%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 23.5M | 🟢 **-26%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.1M | ✅ | 42.0M | -2% |
| ref.json | URN base URI with NSS | 2 | ✅ | 44.4M | ✅ | 43.7M | -2% |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 43.5M | -2% |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.6M | ✅ | 43.8M | -2% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.5M | ✅ | 43.9M | +3% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.0M | ✅ | 43.8M | -3% |
| ref.json | ref to if | 2 | ✅ | 55.6M | ✅ | 37.0M | 🟢 **-33%** |
| ref.json | ref to then | 2 | ✅ | 55.6M | ✅ | 45.4M | -18% |
| ref.json | ref to else | 2 | ✅ | 56.0M | ✅ | 46.1M | -18% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.3M | ✅ | 46.5M | -7% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 56.4M | ✅ | 48.5M | -14% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 49.1M | -17% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.8M | ✅ | 45.6M | 🟢 **-23%** |
| refRemote.json | remote ref | 2 | ✅ | 55.6M | ✅ | 45.4M | -18% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.7M | ✅ | 47.0M | -16% |
| refRemote.json | ref within remote ref | 2 | ✅ | 55.3M | ✅ | 46.8M | -15% |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ✅ | 28.0M | -3% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.0M | ✅ | 25.5M | -15% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.6M | ✅ | 27.5M | 🟢 **-27%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.3M | ✅ | 11.1M | 🟢 **-69%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.3M | ✅ | 35.4M | 🟢 **-22%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.6M | ✅ | 41.0M | -6% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 32.3M | ✅ | 29.4M | -9% |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 43.9M | ✅ | 40.6M | -7% |
| required.json | required validation | 5 | ✅ | 54.9M | ✅ | 48.7M | -11% |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 73.7M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 73.8M | 🟢 **-54%** |
| required.json | required with escaped characters | 2 | ✅ | 41.1M | ✅ | 37.4M | -9% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 46.3M | ✅ | 39.5M | -15% |
| type.json | number type matches numbers | 9 | ✅ | 51.2M | ✅ | 39.7M | 🟢 **-22%** |
| type.json | string type matches strings | 9 | ✅ | 50.9M | ✅ | 44.7M | -12% |
| type.json | object type matches objects | 7 | ✅ | 43.6M | ✅ | 37.6M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 47.9M | ✅ | 39.2M | -18% |
| type.json | boolean type matches booleans | 10 | ✅ | 48.6M | ✅ | 42.3M | -13% |
| type.json | null type matches only the null object | 10 | ✅ | 45.8M | ✅ | 40.1M | -12% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 44.6M | ✅ | 36.5M | -18% |
| type.json | type as array with one item | 2 | ✅ | 58.5M | ✅ | 48.4M | -17% |
| type.json | type: array or object | 5 | ✅ | 52.4M | ✅ | 40.4M | 🟢 **-23%** |
| type.json | type: array, object or null | 5 | ✅ | 58.7M | ✅ | 44.7M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 10.5M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.4M | ✅ | 19.3M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 25.3M | 🔴 **+40%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.1M | ✅ | 54.6M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.4M | ✅ | 54.2M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 49.1M | 🟢 **-20%** |
| optional/bignum.json | integer | 2 | ✅ | 76.2M | ✅ | 14.4M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 68.5M | -14% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 38.6M | -14% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 61.9M | ✅ | 67.5M | +9% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 38.3M | -11% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 60.2M | -18% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 32.8M | ✅ | 37.8M | +15% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 344K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 18.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 422K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 56.8M | ✅ | 26.1M | 🟢 **-54%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.3M | ✅ | 24.8M | 🔴 **+44%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.1M | ✅ | 27.5M | 🔴 **+52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.6M | ✅ | 27.7M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 20.8M | ✅ | 27.4M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 28.9M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.9M | ✅ | 25.9M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.6M | ✅ | 26.7M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 28.9M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.6M | ✅ | 23.8M | -11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ✅ | 17.5M | +8% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.0M | ✅ | 13.4M | -4% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 14.4M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.4M | ✅ | 27.1M | +7% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.7M | ✅ | 22.6M | +9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ✅ | 22.7M | +1% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ✅ | 19.6M | -2% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ✅ | 21.6M | +6% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 9.2M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 8.6M | 0% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.9M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.5M | ✅ | 7.7M | 🟢 **-69%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ✅ | 22.2M | 🔴 **+23%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.9M | ✅ | 30.9M | -16% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 22.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.9M | ✅ | 25.0M | -13% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.1M | ✅ | 916K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 35.3M | ✅ | 29.3M | -17% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ✅ | 5.7M | -10% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 77.8M | ✅ | 55.2M | 🟢 **-29%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 9.0M | -6% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.0M | ✅ | 14.8M | -8% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.2M | 🟢 **-33%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.7M | ✅ | 14.5M | 🟢 **-62%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.2M | ✅ | 38.2M | 🟢 **-24%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.2M | ✅ | 37.4M | 🟢 **-26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.4M | ✅ | 25.5M | -3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ✅ | 8.5M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.5M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.5M | ✅ | 17.3M | 🟢 **-32%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.0M | ✅ | 34.3M | -2% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.9M | ✅ | 74.7M | 🟢 **-53%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 60.5M | ✅ | 49.1M | -19% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.8M | ✅ | 68.7M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 71.6M | ✅ | 65.5M | -9% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 28.7M | 🟢 **-50%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 34.5M | ✅ | 37.8M | +10% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 48.0M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 73.9M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.1M | ✅ | 31.1M | 🟢 **-54%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.8M | ✅ | 22.3M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.5M | ✅ | 16.4M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.4M | ✅ | 13.3M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 73.8M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.9M | ✅ | 8.3M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 47.0M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.0M | ✅ | 9.7M | 🟢 **-61%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.7M | ✅ | 10.1M | 🟢 **-73%** |
| allOf.json | allOf | 4 | ✅ | 30.4M | ✅ | 33.7M | +11% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.9M | ✅ | 26.0M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 50.3M | ✅ | 40.7M | -19% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.9M | ✅ | 74.2M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 41.8M | ✅ | 41.2M | -1% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 40.9M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ✅ | 73.7M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 74.3M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 52.8M | ✅ | 48.9M | -7% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 48.8M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 54.4M | ✅ | 30.3M | 🟢 **-44%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 4.8M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 53.3M | ✅ | 30.8M | 🟢 **-42%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 47.5M | 🟢 **-58%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ✅ | 47.8M | -4% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 52.3M | ✅ | 46.5M | -11% |
| anyOf.json | anyOf | 4 | ✅ | 54.0M | ✅ | 14.7M | 🟢 **-73%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.0M | ✅ | 19.9M | 🟢 **-34%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 73.6M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 73.7M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 41.8M | ✅ | 19.8M | 🟢 **-53%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 42.9M | ✅ | 10.4M | 🟢 **-76%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ✅ | 58.8M | 🟢 **-66%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 54.4M | ✅ | 21.9M | 🟢 **-60%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.8M | ✅ | 55.6M | 🟢 **-70%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 39.0M | ✅ | 32.7M | -16% |
| const.json | const validation | 3 | ✅ | 46.6M | ✅ | 38.5M | -17% |
| const.json | const with object | 4 | ✅ | 32.9M | ✅ | 15.1M | 🟢 **-54%** |
| const.json | const with array | 3 | ✅ | 40.0M | ✅ | 16.1M | 🟢 **-60%** |
| const.json | const with null | 2 | ✅ | 54.4M | ✅ | 47.8M | -12% |
| const.json | const with false does not match 0 | 3 | ✅ | 48.6M | ✅ | 38.5M | 🟢 **-21%** |
| const.json | const with true does not match 1 | 3 | ✅ | 48.6M | ✅ | 39.4M | -19% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 44.6M | ✅ | 25.9M | 🟢 **-42%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 45.3M | ✅ | 14.1M | 🟢 **-69%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 44.0M | ✅ | 12.6M | 🟢 **-71%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 44.2M | ✅ | 12.8M | 🟢 **-71%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 44.7M | ✅ | 40.4M | -10% |
| const.json | const with 1 does not match true | 3 | ✅ | 55.8M | ✅ | 44.1M | 🟢 **-21%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 47.2M | ✅ | 41.6M | -12% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 52.4M | ✅ | 40.3M | 🟢 **-23%** |
| const.json | nul characters in strings | 2 | ✅ | 47.8M | ✅ | 43.7M | -8% |
| const.json | characters with the same visual repre... | 2 | ✅ | 41.5M | ✅ | 45.2M | +9% |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.5M | ✅ | 46.5M | 0% |
| contains.json | contains keyword validation | 6 | ✅ | 51.3M | ✅ | 18.5M | 🟢 **-64%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.4M | ✅ | 9.9M | 🟢 **-79%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 52.1M | ✅ | 45.7M | -12% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 48.4M | ✅ | 31.1M | 🟢 **-36%** |
| contains.json | items + contains | 4 | ✅ | 35.0M | ✅ | 6.8M | 🟢 **-80%** |
| contains.json | contains with false if subschema | 2 | ✅ | 50.9M | ✅ | 46.5M | -9% |
| contains.json | contains with null instance elements | 1 | ✅ | 70.1M | ✅ | 43.8M | 🟢 **-37%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.6M | ✅ | 63.4M | 🟢 **-64%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.1M | ✅ | 64.4M | 🟢 **-63%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.5M | ✅ | 54.6M | 🟢 **-70%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.1M | ✅ | 55.2M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 48.3M | ✅ | 50.3M | +4% |
| default.json | invalid string value for default | 2 | ✅ | 45.4M | ✅ | 49.0M | +8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 42.1M | ✅ | 44.1M | +5% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ✅ | 765K | 🟢 **-60%** |
| dependentRequired.json | single dependency | 7 | ✅ | 51.2M | ✅ | 49.3M | -4% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 65.0M | 🟢 **-63%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.2M | ✅ | 30.8M | 🔴 **+27%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 35.9M | ✅ | 37.3M | +4% |
| dependentSchemas.json | single dependency | 8 | ✅ | 41.6M | ✅ | 42.9M | +3% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 40.4M | ✅ | 41.3M | +2% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 17.9M | ✅ | 31.2M | 🔴 **+74%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.4M | ✅ | 39.6M | +15% |
| enum.json | simple enum validation | 2 | ✅ | 51.1M | ✅ | 40.1M | 🟢 **-22%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 35.5M | ✅ | 11.5M | 🟢 **-68%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 55.3M | ✅ | 43.2M | 🟢 **-22%** |
| enum.json | enums in properties | 6 | ✅ | 33.4M | ✅ | 35.8M | +7% |
| enum.json | enum with escaped characters | 3 | ✅ | 34.2M | ✅ | 51.4M | 🔴 **+51%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 45.3M | ✅ | 39.8M | -12% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 45.0M | ✅ | 20.5M | 🟢 **-55%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 44.8M | ✅ | 38.2M | -15% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 40.8M | ✅ | 19.8M | 🟢 **-51%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 52.9M | ✅ | 50.5M | -4% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 50.3M | ✅ | 22.0M | 🟢 **-56%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 55.3M | ✅ | 43.8M | 🟢 **-21%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 50.5M | ✅ | 21.7M | 🟢 **-57%** |
| enum.json | nul characters in strings | 2 | ✅ | 45.8M | ✅ | 46.4M | +1% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.3M | ✅ | 42.1M | -11% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 46.9M | ✅ | 41.4M | -12% |
| format.json | email format | 6 | ✅ | 173.3M | ✅ | 55.4M | 🟢 **-68%** |
| format.json | idn-email format | 6 | ✅ | 180.7M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | regex format | 6 | ✅ | 163.8M | ✅ | 55.1M | 🟢 **-66%** |
| format.json | ipv4 format | 6 | ✅ | 181.7M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | ipv6 format | 6 | ✅ | 182.2M | ✅ | 52.5M | 🟢 **-71%** |
| format.json | idn-hostname format | 6 | ✅ | 181.4M | ✅ | 55.8M | 🟢 **-69%** |
| format.json | hostname format | 6 | ✅ | 182.2M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | date format | 6 | ✅ | 181.7M | ✅ | 53.0M | 🟢 **-71%** |
| format.json | date-time format | 6 | ✅ | 179.9M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | time format | 6 | ✅ | 145.6M | ✅ | 55.5M | 🟢 **-62%** |
| format.json | json-pointer format | 6 | ✅ | 138.8M | ✅ | 55.2M | 🟢 **-60%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.8M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | iri format | 6 | ✅ | 182.8M | ✅ | 51.6M | 🟢 **-72%** |
| format.json | iri-reference format | 6 | ✅ | 183.0M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uri format | 6 | ✅ | 182.3M | ✅ | 55.0M | 🟢 **-70%** |
| format.json | uri-reference format | 6 | ✅ | 183.0M | ✅ | 55.9M | 🟢 **-69%** |
| format.json | uri-template format | 6 | ✅ | 182.2M | ✅ | 55.8M | 🟢 **-69%** |
| format.json | uuid format | 6 | ✅ | 182.2M | ✅ | 48.9M | 🟢 **-73%** |
| format.json | duration format | 6 | ✅ | 182.4M | ✅ | 55.7M | 🟢 **-69%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.5M | ✅ | 66.4M | 🟢 **-61%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 67.1M | 🟢 **-61%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 68.2M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 57.5M | ✅ | 43.0M | 🟢 **-25%** |
| if-then-else.json | if and else without then | 3 | ✅ | 58.3M | ✅ | 37.1M | 🟢 **-36%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 48.2M | ✅ | 37.2M | 🟢 **-23%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 68.9M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 54.4M | ✅ | 47.6M | -12% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 54.0M | ✅ | 42.8M | 🟢 **-21%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.8M | ✅ | 30.9M | -18% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 34.6M | ✅ | 37.8M | +9% |
| items.json | a schema given for items | 4 | ✅ | 46.0M | ✅ | 43.1M | -6% |
| items.json | an array of schemas for items | 6 | ✅ | 56.1M | ✅ | 48.4M | -14% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.8M | ✅ | 67.7M | 🟢 **-61%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 51.7M | ✅ | 43.7M | -15% |
| items.json | items with boolean schemas | 3 | ✅ | 51.5M | ✅ | 44.0M | -15% |
| items.json | items and subitems | 6 | ✅ | 26.3M | ✅ | 20.5M | 🟢 **-22%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 12.6M | -2% |
| items.json | single-form items with null instance ... | 1 | ✅ | 67.3M | ✅ | 66.8M | -1% |
| items.json | array-form items with null instance e... | 1 | ✅ | 71.6M | ✅ | 68.8M | -4% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.5M | ✅ | 69.0M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 49.9M | ✅ | 27.7M | 🟢 **-44%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 49.4M | ✅ | 44.0M | -11% |
| maxContains.json | minContains < maxContains | 3 | ✅ | 43.1M | ✅ | 37.0M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 62.1M | ✅ | 47.8M | 🟢 **-23%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 53.5M | ✅ | 48.1M | -10% |
| maxLength.json | maxLength validation | 5 | ✅ | 51.3M | ✅ | 41.0M | 🟢 **-20%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 44.9M | ✅ | 43.5M | -3% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 40.9M | ✅ | 42.1M | +3% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.1M | ✅ | 32.3M | -13% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 37.9M | ✅ | 35.6M | -6% |
| maximum.json | maximum validation | 4 | ✅ | 58.3M | ✅ | 47.3M | -19% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 57.5M | ✅ | 47.9M | -17% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 68.6M | 🟢 **-60%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 51.0M | ✅ | 35.9M | 🟢 **-30%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 46.3M | ✅ | 29.7M | 🟢 **-36%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 50.0M | ✅ | 44.8M | -10% |
| minContains.json | maxContains = minContains | 4 | ✅ | 40.2M | ✅ | 38.1M | -5% |
| minContains.json | maxContains < minContains | 4 | ✅ | 36.7M | ✅ | 39.6M | +8% |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 172.0M | ✅ | 69.1M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 54.3M | ✅ | 44.9M | -17% |
| minItems.json | minItems validation | 4 | ✅ | 61.9M | ✅ | 49.8M | -19% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 53.4M | ✅ | 44.3M | -17% |
| minLength.json | minLength validation | 5 | ✅ | 46.0M | ✅ | 43.3M | -6% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 45.3M | ✅ | 43.7M | -4% |
| minProperties.json | minProperties validation | 6 | ✅ | 48.4M | ✅ | 42.7M | -12% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 37.7M | ✅ | 33.7M | -11% |
| minimum.json | minimum validation | 4 | ✅ | 59.0M | ✅ | 47.1M | 🟢 **-20%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 55.5M | ✅ | 48.4M | -13% |
| multipleOf.json | by int | 3 | ✅ | 56.5M | ✅ | 43.9M | 🟢 **-22%** |
| multipleOf.json | by number | 3 | ✅ | 53.6M | ✅ | 37.1M | 🟢 **-31%** |
| multipleOf.json | by small number | 2 | ✅ | 48.8M | ✅ | 41.4M | -15% |
| multipleOf.json | float division = inf | 1 | ✅ | 37.0M | ✅ | 8.9M | 🟢 **-76%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 61.1M | ✅ | 9.0M | 🟢 **-85%** |
| not.json | not | 2 | ✅ | 53.2M | ✅ | 43.3M | -19% |
| not.json | not multiple types | 3 | ✅ | 47.3M | ✅ | 38.0M | -20% |
| not.json | not more complex schema | 3 | ✅ | 49.7M | ✅ | 39.6M | 🟢 **-20%** |
| not.json | forbidden property | 2 | ✅ | 39.4M | ✅ | 44.0M | +12% |
| not.json | forbid everything with empty schema | 9 | ✅ | 38.7M | ✅ | 39.4M | +2% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 38.7M | ✅ | 32.8M | -15% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.8M | ✅ | 54.7M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 73.6M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 27.3M | ✅ | 24.1M | -12% |
| oneOf.json | oneOf | 4 | ✅ | 43.5M | ✅ | 21.0M | 🟢 **-52%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.1M | ✅ | 24.8M | -18% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 41.7M | ✅ | 36.7M | -12% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ✅ | 22.1M | 🟢 **-86%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 41.8M | ✅ | 37.3M | -11% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 41.8M | ✅ | 18.7M | 🟢 **-55%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.0M | ✅ | 18.0M | 🟢 **-50%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 52.2M | ✅ | 38.9M | 🟢 **-25%** |
| oneOf.json | oneOf with required | 4 | ✅ | 36.9M | ✅ | 21.6M | 🟢 **-41%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.5M | ✅ | 19.9M | 🟢 **-48%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 52.8M | ✅ | 28.2M | 🟢 **-46%** |
| pattern.json | pattern validation | 8 | ✅ | 46.3M | ✅ | 40.2M | -13% |
| pattern.json | pattern is not anchored | 1 | ✅ | 42.9M | ✅ | 31.1M | 🟢 **-28%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 11.6M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 5.9M | 🟢 **-57%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ✅ | 7.8M | 🟢 **-53%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.1M | ✅ | 5.8M | 🟢 **-70%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.2M | ✅ | 17.9M | +4% |
| properties.json | object properties validation | 6 | ✅ | 43.3M | ✅ | 44.5M | +3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.3M | ✅ | 9.2M | 🟢 **-50%** |
| properties.json | properties with boolean schema | 4 | ✅ | 37.5M | ✅ | 40.7M | +9% |
| properties.json | properties with escaped characters | 2 | ✅ | 38.3M | ✅ | 43.3M | +13% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.8M | ✅ | 60.4M | +5% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.6M | ✅ | 29.8M | 🟢 **-26%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ✅ | 14.0M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 68.9M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 37.6M | ✅ | 28.9M | 🟢 **-23%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 36.2M | ✅ | 31.8M | -12% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.5M | ✅ | 26.8M | 🟢 **-30%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.5M | ✅ | 18.8M | 🔴 **+40%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.2M | ✅ | 1.8M | 🟢 **-70%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ✅ | 4.0M | 🔴 **+34%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.3M | ✅ | 2.0M | 🟢 **-85%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.3M | ✅ | 1.9M | 🟢 **-85%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.8M | ✅ | 1.3M | 🟢 **-83%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ✅ | 3.7M | -10% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.3M | ✅ | 3.8M | -10% |
| ref.json | root pointer ref | 4 | ✅ | 20.6M | ✅ | 18.3M | -11% |
| ref.json | relative pointer ref to object | 2 | ✅ | 40.6M | ✅ | 40.5M | 0% |
| ref.json | relative pointer ref to array | 2 | ✅ | 44.3M | ✅ | 45.0M | +1% |
| ref.json | escaped pointer ref | 6 | ✅ | 36.2M | ✅ | 40.0M | +11% |
| ref.json | nested refs | 2 | ✅ | 42.0M | ✅ | 49.5M | +18% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 32.7M | ✅ | 37.1M | +13% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ✅ | 2.3M | 🟢 **-29%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 40.6M | ✅ | 43.4M | +7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 39.7M | ✅ | 43.8M | +10% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 74.4M | 🟢 **-53%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 41.8M | ✅ | 40.6M | -3% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 7.3M | -16% |
| ref.json | refs with quote | 2 | ✅ | 39.3M | ✅ | 44.5M | +13% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.8M | ✅ | 33.8M | 🔴 **+37%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 40.9M | ✅ | 13.9M | 🟢 **-66%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.9M | ✅ | 50.2M | +3% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.9M | ✅ | 47.2M | -3% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 52.0M | ✅ | 47.3M | -9% |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 42.0M | ✅ | 42.7M | +2% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 28.7M | ✅ | 22.8M | 🟢 **-20%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 40.6M | ✅ | 43.8M | +8% |
| ref.json | URN base URI with NSS | 2 | ✅ | 40.7M | ✅ | 43.6M | +7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 40.9M | ✅ | 43.6M | +6% |
| ref.json | URN base URI with q-component | 2 | ✅ | 40.6M | ✅ | 38.7M | -5% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.6M | ✅ | 43.6M | +10% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 40.8M | ✅ | 43.5M | +7% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.4M | ✅ | 49.6M | -2% |
| ref.json | ref to then | 2 | ✅ | 49.5M | ✅ | 47.3M | -4% |
| ref.json | ref to else | 2 | ✅ | 50.9M | ✅ | 48.0M | -6% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.6M | ✅ | 50.2M | +3% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 52.8M | ✅ | 49.4M | -6% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 52.7M | ✅ | 49.6M | -6% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 52.8M | ✅ | 48.4M | -8% |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ✅ | 16.6M | 🔴 **+251%** |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ✅ | 49.4M | -2% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.0M | ✅ | 50.0M | +2% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.7M | ✅ | 49.7M | +2% |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.8M | ✅ | 47.4M | -3% |
| refRemote.json | base URI change | 2 | ✅ | 27.5M | ✅ | 27.9M | +2% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.4M | ✅ | 25.3M | -14% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.3M | ✅ | 27.2M | 🟢 **-23%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.4M | ✅ | 10.9M | 🟢 **-67%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.5M | ✅ | 36.7M | -12% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.5M | ✅ | 42.0M | -15% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 35.7M | ✅ | 29.4M | -18% |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.5M | ✅ | 41.8M | -17% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.8M | ✅ | 41.8M | -18% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.1M | ✅ | 41.8M | +7% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 51.3M | ✅ | 41.8M | -18% |
| required.json | required validation | 5 | ✅ | 50.6M | ✅ | 44.3M | -12% |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 73.2M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 159.6M | ✅ | 74.4M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 18.8M | ✅ | 38.1M | 🔴 **+103%** |
| required.json | required properties whose names are J... | 7 | ✅ | 22.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 41.9M | ✅ | 40.0M | -5% |
| type.json | number type matches numbers | 9 | ✅ | 43.7M | ✅ | 39.5M | -10% |
| type.json | string type matches strings | 9 | ✅ | 45.9M | ✅ | 45.5M | -1% |
| type.json | object type matches objects | 7 | ✅ | 39.2M | ✅ | 40.3M | +3% |
| type.json | array type matches arrays | 7 | ✅ | 42.0M | ✅ | 39.9M | -5% |
| type.json | boolean type matches booleans | 10 | ✅ | 41.9M | ✅ | 43.6M | +4% |
| type.json | null type matches only the null object | 10 | ✅ | 40.4M | ✅ | 41.5M | +3% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 43.7M | ✅ | 38.7M | -11% |
| type.json | type as array with one item | 2 | ✅ | 52.8M | ✅ | 48.5M | -8% |
| type.json | type: array or object | 5 | ✅ | 47.2M | ✅ | 41.7M | -11% |
| type.json | type: array, object or null | 5 | ✅ | 53.1M | ✅ | 44.6M | -16% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.5M | ✅ | 68.5M | -4% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 45.4M | ✅ | 49.8M | +10% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.8M | ✅ | 43.0M | -12% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 63.4M | ✅ | 62.7M | -1% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 43.6M | ✅ | 46.3M | +6% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 70.0M | ✅ | 66.8M | -5% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.2M | ✅ | 38.1M | -3% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.2M | ✅ | 37.9M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 38.5M | ✅ | 43.9M | +14% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 71.9M | ✅ | 63.2M | -12% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.1M | ✅ | 64.3M | 🔴 **+220%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ✅ | 25.1M | 🔴 **+107%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.2M | ✅ | 19.7M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 30.7M | ✅ | 37.2M | 🔴 **+21%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.8M | ✅ | 27.0M | 🔴 **+149%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 45.8M | ✅ | 49.6M | +8% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 41.4M | ✅ | 43.4M | +5% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.4M | ✅ | 42.2M | -16% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ✅ | 9.8M | 🔴 **+339%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 33.7M | ✅ | 39.6M | +18% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.1M | ✅ | 30.2M | 🔴 **+25%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 71.3M | ✅ | 54.8M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 67.3M | ✅ | 66.1M | -2% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 31.2M | ✅ | 37.1M | +19% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 49.6M | ✅ | 61.7M | 🔴 **+24%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.4M | ✅ | 16.3M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.9M | ✅ | 39.6M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.3M | ✅ | 36.5M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.1M | ✅ | 12.9M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 57.9M | ✅ | 58.0M | +0% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.0M | ✅ | 33.3M | +19% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.1M | ✅ | 9.4M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 58.0M | ✅ | 60.0M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.4M | ✅ | 59.9M | 🔴 **+104%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.5M | ✅ | 10.0M | 🟢 **-40%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.2M | ✅ | 13.6M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.4M | ✅ | 24.8M | +2% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.2M | ✅ | 16.3M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ✅ | 20.1M | +16% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ✅ | 25.0M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.5M | ✅ | 36.8M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.6M | ✅ | 33.1M | +12% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.7M | ✅ | 31.0M | +4% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ✅ | 10.4M | 🔴 **+245%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.5M | ✅ | 34.0M | 🔴 **+28%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.4M | ✅ | 33.8M | 🔴 **+28%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.6M | ✅ | 58.8M | 🔴 **+92%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ✅ | 55.5M | 🔴 **+86%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.9M | ✅ | 29.4M | 🔴 **+23%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 35.9M | 🔴 **+38%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.5M | ✅ | 29.3M | 🔴 **+50%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ✅ | 34.0M | 🔴 **+186%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.2M | ✅ | 23.6M | -13% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.1M | ✅ | 33.4M | +15% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 33.1M | ✅ | 18.6M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.6M | ✅ | 13.2M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.1M | ✅ | 15.6M | -14% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 5.3M | 🟢 **-25%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 64.7M | ✅ | 55.2M | -15% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 45.4M | ✅ | 45.0M | -1% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.6M | ✅ | 11.8M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.7M | ✅ | 27.0M | 🔴 **+30%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 22.8M | ✅ | 29.0M | 🔴 **+27%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 7.5M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 27.6M | ✅ | 21.5M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.3M | ✅ | 28.3M | 🔴 **+64%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 54.4M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 53.9M | -18% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 55.5M | ✅ | 49.4M | -11% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 44.5M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 52.9M | ✅ | 47.8M | -10% |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 45.6M | ✅ | 10.5M | 🟢 **-77%** |
| optional/bignum.json | integer | 2 | ✅ | 69.3M | ✅ | 14.2M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 72.5M | ✅ | 68.0M | -6% |
| optional/bignum.json | string | 1 | ✅ | 40.3M | ✅ | 40.0M | -1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.7M | ✅ | 67.9M | +2% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 38.0M | ✅ | 38.5M | +1% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 67.4M | ✅ | 67.9M | +1% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 38.9M | ✅ | 38.5M | -1% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 61.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 51.2M | ✅ | 49.0M | -4% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 170.7M | ✅ | 64.5M | 🟢 **-62%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.2M | ✅ | 31.8M | +13% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 43.5M | ✅ | 36.9M | -15% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 42.3M | ✅ | 42.8M | +1% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 42.1M | ✅ | 39.8M | -6% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.9M | ✅ | 32.0M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 45.3M | ✅ | 27.4M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.5M | ✅ | 22.5M | -4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.4M | ✅ | 27.5M | +17% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.5M | ✅ | 27.8M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.4M | ✅ | 27.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.1M | ✅ | 28.7M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.8M | ✅ | 27.6M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 26.7M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.5M | ✅ | 30.0M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.0M | ✅ | 24.4M | -2% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.9M | ✅ | 17.5M | +11% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.5M | ✅ | 14.4M | +7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.7M | ✅ | 13.8M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 22.9M | ✅ | 26.0M | +14% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.1M | ✅ | 22.4M | +17% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ✅ | 23.2M | +4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.6M | ✅ | 21.5M | +16% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ✅ | 21.3M | +19% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 9.4M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.3M | -4% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.8M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.1M | ✅ | 7.7M | 🟢 **-68%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 34.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.6M | ✅ | 22.4M | 🔴 **+27%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 17.6M | ✅ | 79K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.0M | ✅ | 29.9M | -12% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ✅ | 2.8M | 🟢 **-82%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 27.3M | ✅ | 25.5M | -7% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 62.4M | ✅ | 905K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.0M | ✅ | 29.3M | -11% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ✅ | 5.6M | -13% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 70.8M | ✅ | 55.2M | 🟢 **-22%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.2M | ✅ | 9.4M | +1% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.5M | ✅ | 15.3M | -7% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ✅ | 4.4M | 🟢 **-28%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.4M | ✅ | 15.0M | +4% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.6M | ✅ | 12.0M | 🟢 **-66%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 51.6M | ✅ | 43.8M | -15% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.1M | ✅ | 26.9M | +7% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ✅ | 6.9M | 🟢 **-57%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 40.4M | ✅ | 43.1M | +7% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 40.3M | ✅ | 43.6M | +8% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 40.5M | ✅ | 43.5M | +7% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 52.8M | ✅ | 48.0M | -9% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 39.5M | ✅ | 43.2M | +9% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 22.2M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 52.2M | ✅ | 37.1M | 🟢 **-29%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 23.2M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.4M | ✅ | 16.4M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 13.5M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 74.7M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.8M | ✅ | 7.7M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 46.8M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.1M | ✅ | 9.1M | 🟢 **-69%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.8M | ✅ | 9.7M | 🟢 **-74%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 30.6M | -12% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.1M | ✅ | 26.5M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 68.9M | ✅ | 40.6M | 🟢 **-41%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 74.6M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 40.5M | -19% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 40.7M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ✅ | 74.3M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.7M | ✅ | 74.3M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 49.1M | 🟢 **-21%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 40.6M | 🟢 **-65%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 53.6M | ✅ | 49.3M | -8% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.2M | ✅ | 5.0M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 60.0M | ✅ | 48.5M | -19% |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 49.3M | 🟢 **-57%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 58.4M | ✅ | 48.7M | -17% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.2M | ✅ | 50.5M | -19% |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 27.8M | 🟢 **-58%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.4M | ✅ | 22.9M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 74.3M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.6M | ✅ | 73.5M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 21.8M | 🟢 **-56%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 18.9M | 🟢 **-61%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 54.2M | 🟢 **-68%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.5M | ✅ | 24.1M | 🟢 **-61%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 167.1M | ✅ | 55.9M | 🟢 **-67%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.0M | ✅ | 38.9M | 🟢 **-21%** |
| const.json | const validation | 3 | ✅ | 49.0M | ✅ | 38.8M | 🟢 **-21%** |
| const.json | const with object | 4 | ✅ | 35.4M | ✅ | 14.9M | 🟢 **-58%** |
| const.json | const with array | 3 | ✅ | 45.8M | ✅ | 16.5M | 🟢 **-64%** |
| const.json | const with null | 2 | ✅ | 64.4M | ✅ | 50.7M | 🟢 **-21%** |
| const.json | const with false does not match 0 | 3 | ✅ | 53.3M | ✅ | 43.5M | -18% |
| const.json | const with true does not match 1 | 3 | ✅ | 30.2M | ✅ | 39.8M | 🔴 **+32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.5M | ✅ | 27.1M | 🟢 **-45%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 53.8M | ✅ | 26.5M | 🟢 **-51%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 47.7M | ✅ | 12.6M | 🟢 **-74%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 49.4M | ✅ | 11.8M | 🟢 **-76%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.6M | ✅ | 43.8M | -17% |
| const.json | const with 1 does not match true | 3 | ✅ | 58.9M | ✅ | 44.5M | 🟢 **-24%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 45.5M | -19% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 62.9M | ✅ | 43.1M | 🟢 **-31%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 45.5M | -18% |
| const.json | characters with the same visual repre... | 2 | ✅ | 48.1M | ✅ | 46.7M | -3% |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.2M | ✅ | 47.1M | -16% |
| contains.json | contains keyword validation | 6 | ✅ | 56.2M | ✅ | 15.5M | 🟢 **-72%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 48.5M | ✅ | 10.2M | 🟢 **-79%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 56.8M | ✅ | 45.8M | -19% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 29.6M | 🟢 **-49%** |
| contains.json | items + contains | 4 | ✅ | 39.5M | ✅ | 7.0M | 🟢 **-82%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 38.8M | 🟢 **-35%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 65.9M | -19% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ✅ | 62.7M | 🟢 **-64%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.7M | ✅ | 64.0M | 🟢 **-64%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 50.7M | 🟢 **-72%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.2M | ✅ | 54.6M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 63.8M | ✅ | 59.7M | -6% |
| default.json | invalid string value for default | 2 | ✅ | 45.4M | ✅ | 49.0M | +8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ✅ | 43.8M | -3% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ✅ | 992K | 🟢 **-55%** |
| dependentRequired.json | single dependency | 7 | ✅ | 56.8M | ✅ | 49.6M | -13% |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.3M | ✅ | 64.9M | 🟢 **-63%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.9M | ✅ | 33.2M | 🔴 **+28%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 39.6M | -5% |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.4M | ✅ | 42.8M | -12% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ✅ | 37.0M | 🟢 **-21%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.5M | ✅ | 16.0M | 🟢 **-60%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.0M | ✅ | 37.4M | -2% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.7M | ✅ | 17.9M | +7% |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.6M | ✅ | 9.9M | 🔴 **+50%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.2M | ✅ | 48.3M | -20% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.4M | ✅ | 10.9M | 🟢 **-72%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.6M | ✅ | 45.1M | 🟢 **-30%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 36.1M | -5% |
| enum.json | enum with escaped characters | 3 | ✅ | 68.7M | ✅ | 45.6M | 🟢 **-34%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 53.3M | ✅ | 36.9M | 🟢 **-31%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 49.2M | ✅ | 20.9M | 🟢 **-58%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.0M | ✅ | 37.5M | 🟢 **-35%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.4M | ✅ | 17.8M | 🟢 **-64%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 65.2M | ✅ | 29.0M | 🟢 **-56%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ✅ | 22.5M | 🟢 **-60%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.9M | ✅ | 36.7M | 🟢 **-38%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ✅ | 22.2M | 🟢 **-58%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.0M | ✅ | 45.5M | -17% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ✅ | 39.1M | 🟢 **-30%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.0M | ✅ | 39.4M | 🟢 **-28%** |
| format.json | email format | 7 | ✅ | 169.4M | ✅ | 54.6M | 🟢 **-68%** |
| format.json | idn-email format | 7 | ✅ | 182.6M | ✅ | 54.6M | 🟢 **-70%** |
| format.json | regex format | 7 | ✅ | 149.3M | ✅ | 48.6M | 🟢 **-67%** |
| format.json | ipv4 format | 7 | ✅ | 176.5M | ✅ | 54.0M | 🟢 **-69%** |
| format.json | ipv6 format | 7 | ✅ | 175.7M | ✅ | 54.8M | 🟢 **-69%** |
| format.json | idn-hostname format | 7 | ✅ | 175.7M | ✅ | 54.9M | 🟢 **-69%** |
| format.json | hostname format | 7 | ✅ | 175.6M | ✅ | 43.7M | 🟢 **-75%** |
| format.json | date format | 7 | ✅ | 181.4M | ✅ | 57.6M | 🟢 **-68%** |
| format.json | date-time format | 7 | ✅ | 174.6M | ✅ | 55.3M | 🟢 **-68%** |
| format.json | time format | 7 | ✅ | 181.9M | ✅ | 53.4M | 🟢 **-71%** |
| format.json | json-pointer format | 7 | ✅ | 170.3M | ✅ | 55.0M | 🟢 **-68%** |
| format.json | relative-json-pointer format | 7 | ✅ | 182.9M | ✅ | 55.9M | 🟢 **-69%** |
| format.json | iri format | 7 | ✅ | 176.1M | ✅ | 55.4M | 🟢 **-69%** |
| format.json | iri-reference format | 7 | ✅ | 183.2M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uri format | 7 | ✅ | 182.6M | ✅ | 54.8M | 🟢 **-70%** |
| format.json | uri-reference format | 7 | ✅ | 183.1M | ✅ | 56.0M | 🟢 **-69%** |
| format.json | uri-template format | 7 | ✅ | 182.9M | ✅ | 54.8M | 🟢 **-70%** |
| format.json | uuid format | 7 | ✅ | 181.2M | ✅ | 56.0M | 🟢 **-69%** |
| format.json | duration format | 7 | ✅ | 173.9M | ✅ | 55.8M | 🟢 **-68%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 156.9M | ✅ | 68.6M | 🟢 **-56%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.5M | ✅ | 68.1M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 156.9M | ✅ | 52.5M | 🟢 **-67%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ✅ | 42.9M | 🟢 **-39%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ✅ | 38.1M | 🟢 **-45%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.2M | ✅ | 37.0M | 🟢 **-40%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.7M | ✅ | 68.0M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ✅ | 48.8M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 43.4M | 🟢 **-32%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.8M | ✅ | 31.8M | 🟢 **-26%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.6M | ✅ | 35.1M | -11% |
| items.json | a schema given for items | 4 | ✅ | 56.2M | ✅ | 43.3M | 🟢 **-23%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.6M | ✅ | 67.8M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 43.5M | 🟢 **-30%** |
| items.json | items and subitems | 6 | ✅ | 28.5M | ✅ | 17.0M | 🟢 **-40%** |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 11.3M | -12% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 77.0M | ✅ | 49.9M | 🟢 **-35%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 47.6M | ✅ | 35.5M | 🟢 **-25%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.4M | ✅ | 37.5M | -17% |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ✅ | 48.6M | 🟢 **-23%** |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 67.0M | -13% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.4M | ✅ | 69.0M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ✅ | 28.1M | 🟢 **-46%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ✅ | 44.6M | 🟢 **-23%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.8M | ✅ | 38.6M | 🟢 **-24%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.9M | ✅ | 48.3M | 🟢 **-35%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 47.9M | 🟢 **-25%** |
| maxLength.json | maxLength validation | 5 | ✅ | 40.2M | ✅ | 46.1M | +15% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 43.6M | -16% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ✅ | 39.7M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.2M | ✅ | 32.5M | 🟢 **-21%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 35.0M | -18% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 47.6M | 🟢 **-31%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ✅ | 48.0M | 🟢 **-29%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 52.4M | 🟢 **-69%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.2M | ✅ | 36.0M | 🟢 **-40%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ✅ | 34.3M | 🟢 **-38%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 55.2M | ✅ | 44.7M | -19% |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.1M | ✅ | 38.4M | -19% |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.2M | ✅ | 34.5M | 🟢 **-20%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.6M | ✅ | 68.7M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ✅ | 44.9M | 🟢 **-32%** |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ✅ | 47.6M | 🟢 **-36%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 48.0M | 🟢 **-24%** |
| minLength.json | minLength validation | 5 | ✅ | 52.9M | ✅ | 44.2M | -17% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 43.4M | -17% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.2M | ✅ | 42.8M | 🟢 **-22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.3M | ✅ | 33.8M | -20% |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ✅ | 47.4M | 🟢 **-31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 48.4M | 🟢 **-25%** |
| multipleOf.json | by int | 3 | ✅ | 66.6M | ✅ | 44.1M | 🟢 **-34%** |
| multipleOf.json | by number | 3 | ✅ | 63.3M | ✅ | 42.3M | 🟢 **-33%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 39.8M | 🟢 **-31%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 8.9M | 🟢 **-79%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 9.0M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 60.5M | ✅ | 43.0M | 🟢 **-29%** |
| not.json | not multiple types | 3 | ✅ | 56.0M | ✅ | 37.4M | 🟢 **-33%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 38.8M | 🟢 **-33%** |
| not.json | forbidden property | 2 | ✅ | 46.3M | ✅ | 43.9M | -5% |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 39.1M | 🟢 **-20%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ✅ | 32.6M | 🟢 **-34%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.6M | ✅ | 54.6M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 73.7M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.4M | ✅ | 23.9M | -19% |
| oneOf.json | oneOf | 4 | ✅ | 46.0M | ✅ | 21.5M | 🟢 **-53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.6M | ✅ | 24.8M | -16% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 36.8M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.2M | ✅ | 27.7M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 37.1M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 18.8M | 🟢 **-62%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.5M | ✅ | 18.1M | 🟢 **-54%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.8M | ✅ | 39.5M | 🟢 **-36%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.3M | ✅ | 16.5M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 20.3M | 🟢 **-53%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 28.4M | 🟢 **-54%** |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 35.2M | 🟢 **-32%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ✅ | 31.1M | 🟢 **-34%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.2M | ✅ | 11.7M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 12.5M | ✅ | 6.4M | 🟢 **-49%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.2M | ✅ | 7.2M | 🟢 **-55%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.8M | ✅ | 5.9M | 🟢 **-70%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 17.9M | +0% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.3M | ✅ | 50.6M | 🟢 **-22%** |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.0M | ✅ | 51.0M | -18% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ✅ | 66.6M | -20% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 83.0M | ✅ | 67.6M | -19% |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 44.9M | -10% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 9.6M | 🟢 **-51%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ✅ | 40.5M | -5% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 43.3M | -3% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ✅ | 60.7M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.2M | ✅ | 30.6M | 🟢 **-31%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 16.3M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 50.5M | 🟢 **-71%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.2M | ✅ | 29.2M | 🟢 **-31%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ✅ | 32.0M | -19% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.1M | ✅ | 33.5M | -10% |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 18.2M | 🟢 **-24%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 42.0M | -10% |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 44.5M | -13% |
| ref.json | escaped pointer ref | 6 | ✅ | 39.9M | ✅ | 40.8M | +2% |
| ref.json | nested refs | 2 | ✅ | 47.3M | ✅ | 48.6M | +3% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 37.5M | ✅ | 37.6M | +0% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ✅ | 2.2M | 🟢 **-39%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 43.5M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 43.9M | -6% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 156.9M | ✅ | 74.5M | 🟢 **-53%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 39.7M | 🟢 **-20%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ✅ | 7.2M | 🟢 **-20%** |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 44.7M | -4% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.6M | ✅ | 34.0M | 🔴 **+23%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.0M | ✅ | 14.5M | 🟢 **-68%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.4M | ✅ | 48.2M | -19% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 56.0M | ✅ | 47.1M | -16% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ✅ | 47.2M | 🟢 **-23%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 47.4M | ✅ | 42.6M | -10% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 23.0M | 🟢 **-31%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 43.9M | -6% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 43.7M | -7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 44.0M | -6% |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ✅ | 40.5M | -14% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 43.4M | -7% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.9M | ✅ | 43.8M | -6% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.7M | ✅ | 48.1M | -19% |
| ref.json | ref to then | 2 | ✅ | 59.5M | ✅ | 41.0M | 🟢 **-31%** |
| ref.json | ref to else | 2 | ✅ | 59.8M | ✅ | 48.2M | -19% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.6M | ✅ | 49.1M | -18% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 48.5M | 🟢 **-22%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 48.9M | 🟢 **-22%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 48.7M | 🟢 **-22%** |
| refRemote.json | remote ref | 2 | ✅ | 57.9M | ✅ | 44.9M | 🟢 **-22%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.6M | ✅ | 48.0M | -19% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 59.6M | ✅ | 48.6M | -18% |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.5M | ✅ | 48.4M | -19% |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ✅ | 28.1M | -2% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.4M | ✅ | 27.6M | -20% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ✅ | 27.5M | 🟢 **-30%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.3M | ✅ | 10.8M | 🟢 **-71%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.7M | ✅ | 36.5M | 🟢 **-23%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 58.6M | ✅ | 41.8M | 🟢 **-29%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ✅ | 28.5M | 🟢 **-29%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.9M | ✅ | 41.8M | 🟢 **-30%** |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 59.2M | ✅ | 41.5M | 🟢 **-30%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 47.6M | ✅ | 42.1M | -12% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 59.7M | ✅ | 41.8M | 🟢 **-30%** |
| required.json | required validation | 5 | ✅ | 57.4M | ✅ | 49.2M | -14% |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 71.4M | 🟢 **-55%** |
| required.json | required with empty array | 1 | ✅ | 159.3M | ✅ | 74.6M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 44.6M | ✅ | 38.5M | -14% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 51.9M | ✅ | 38.3M | 🟢 **-26%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 44.2M | -20% |
| type.json | string type matches strings | 9 | ✅ | 54.5M | ✅ | 45.8M | -16% |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 37.6M | -19% |
| type.json | array type matches arrays | 7 | ✅ | 51.3M | ✅ | 40.8M | 🟢 **-20%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 37.8M | 🟢 **-27%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.0M | ✅ | 36.6M | 🟢 **-25%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.8M | ✅ | 38.4M | 🟢 **-26%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 50.4M | -19% |
| type.json | type: array or object | 5 | ✅ | 55.3M | ✅ | 43.2M | 🟢 **-22%** |
| type.json | type: array, object or null | 5 | ✅ | 62.3M | ✅ | 45.9M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 68.3M | -18% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ✅ | 49.5M | -7% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.8M | ✅ | 41.3M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 62.6M | -13% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.2M | ✅ | 47.1M | -6% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.9M | ✅ | 66.9M | -17% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 46.0M | ✅ | 42.6M | -7% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.8M | ✅ | 44.7M | -7% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 83.9M | ✅ | 64.6M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 17.6M | ✅ | 64.4M | 🔴 **+267%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ✅ | 25.2M | 🔴 **+124%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.9M | ✅ | 21.2M | 🔴 **+52%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 37.8M | +7% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.7M | ✅ | 27.6M | 🔴 **+158%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.4M | ✅ | 47.3M | -11% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.9M | ✅ | 44.1M | -8% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.7M | ✅ | 43.7M | -8% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 40.1M | +3% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 22.3M | ✅ | 30.0M | 🔴 **+35%** |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.6M | ✅ | 54.7M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 66.1M | -14% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 18.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ✅ | 37.5M | +4% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 68.9M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.2M | ✅ | 16.2M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.9M | ✅ | 40.0M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 23.1M | ✅ | 36.4M | 🔴 **+58%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.7M | ✅ | 12.9M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 68.5M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.6M | ✅ | 13.5M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ✅ | 31.8M | +11% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.4M | ✅ | 9.2M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 59.3M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.6M | ✅ | 60.0M | 🔴 **+110%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.2M | ✅ | 10.0M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.3M | ✅ | 13.0M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.7M | ✅ | 29.9M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.4M | ✅ | 17.4M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.5M | ✅ | 20.1M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ✅ | 24.2M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ✅ | 37.3M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.2M | ✅ | 30.9M | +3% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.3M | ✅ | 33.3M | +18% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.6M | ✅ | 34.0M | +15% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.6M | ✅ | 34.0M | +15% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.0M | ✅ | 60.2M | 🔴 **+108%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.0M | ✅ | 60.3M | 🔴 **+108%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.3M | ✅ | 30.6M | 🔴 **+26%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.2M | ✅ | 36.2M | 🔴 **+33%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.7M | ✅ | 28.8M | 🔴 **+39%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.0M | ✅ | 36.5M | 🔴 **+230%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.6M | ✅ | 22.7M | -15% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ✅ | 32.9M | +1% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 40.4M | ✅ | 20.0M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.7M | ✅ | 13.4M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.3M | ✅ | 14.2M | 🟢 **-26%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 5.3M | 🟢 **-26%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 79.3M | ✅ | 55.3M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 46.8M | -6% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.8M | ✅ | 11.9M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ✅ | 27.2M | 🔴 **+23%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.6M | ✅ | 29.1M | 🔴 **+23%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 10.4M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.4M | ✅ | 23.0M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 39.9M | ✅ | 25.4M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.0M | ✅ | 54.5M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 54.4M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ✅ | 46.8M | 🟢 **-27%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.4M | ✅ | 49.7M | 🟢 **-20%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.2M | ✅ | 11.3M | 🟢 **-78%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 68.2M | -19% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 39.7M | -17% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 65.7M | -15% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 37.6M | -17% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.5M | -12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 38.5M | -16% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.4M | ✅ | 48.9M | -18% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.9M | ✅ | 64.6M | 🟢 **-63%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.7M | ✅ | 31.0M | +1% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 38.4M | -9% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 42.3M | -13% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ✅ | 40.8M | -16% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.5M | ✅ | 31.8M | 🟢 **-21%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.5M | ✅ | 27.6M | 🟢 **-47%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.6M | ✅ | 25.4M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.5M | ✅ | 27.9M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.0M | ✅ | 27.7M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.9M | ✅ | 26.3M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 29.0M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.5M | ✅ | 27.2M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 27.8M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 29.0M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 24.4M | -12% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ✅ | 18.0M | +12% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 13.8M | 0% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 13.9M | -3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 27.1M | +3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.8M | ✅ | 23.0M | 🔴 **+29%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ✅ | 22.9M | -2% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 21.2M | +5% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 21.5M | +6% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.8M | +12% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 8.7M | -1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.1M | ✅ | 7.5M | 🟢 **-71%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 40.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ✅ | 80K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.2M | ✅ | 30.6M | -10% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 26.6M | ✅ | 25.4M | -5% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.1M | ✅ | 908K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.8M | ✅ | 30.6M | -17% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.3M | -18% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 55.3M | 🟢 **-33%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 9.1M | -5% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ✅ | 15.6M | -8% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-32%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ✅ | 15.2M | +2% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.8M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.0M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 39.7M | ✅ | 12.7M | 🟢 **-68%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.9M | ✅ | 44.2M | 🟢 **-26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ✅ | 27.1M | -2% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ✅ | 6.8M | 🟢 **-60%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.4M | ✅ | 43.6M | -6% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.4M | ✅ | 43.6M | -6% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 43.9M | -5% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 49.5M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 43.5M | -6% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.5M | ❌ | - | - |
