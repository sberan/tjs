# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 24.8M | 172/199 | 13.2M | 172 | 🟢 **-47%** |
| draft6 | 276 | ✅ 276 | 29.7M | 269/276 | 15.0M | 269 | 🟢 **-50%** |
| draft7 | 313 | ✅ 313 | 15.6M | 296/313 | 13.4M | 296 | -14% |
| draft2019-09 | 435 | ✅ 435 | 18.2M | 413/435 | 6.5M | 413 | 🟢 **-64%** |
| draft2020-12 | 448 | ✅ 448 | 19.2M | 398/448 | 6.6M | 398 | 🟢 **-66%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 1548/1671 | 8.8M | 1548 | 🟢 **-55%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.89x faster** (39 ns vs 113 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.2M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 69.8M | ✅ | 74.0M | +6% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 46.9M | 🟢 **-68%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 71.2M | ✅ | 70.7M | -1% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 66.0M | 🟢 **-47%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.7M | ✅ | 25.0M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.3M | ✅ | 35.6M | 🟢 **-40%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 58.8M | ✅ | 48.1M | -18% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 72.7M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.0M | ✅ | 35.7M | +2% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.9M | ✅ | 22.7M | -9% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.1M | ✅ | 16.1M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.2M | ✅ | 13.1M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.8M | ✅ | 73.8M | +6% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.9M | ✅ | 7.5M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 44.2M | ✅ | 46.9M | +6% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 12.3M | 🟢 **-74%** |
| allOf.json | allOf with base schema | 5 | ✅ | 25.1M | ✅ | 25.2M | +1% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 47.2M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.7M | ✅ | 73.9M | +6% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.7M | ✅ | 73.5M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 40.7M | 🟢 **-33%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 48.1M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.6M | ✅ | 40.6M | 🟢 **-34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.0M | ✅ | 4.1M | 🟢 **-95%** |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 26.7M | 🟢 **-57%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.9M | ✅ | 22.9M | 🟢 **-50%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 32.9M | 🟢 **-24%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 65.5M | 🟢 **-60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 60.5M | ✅ | 27.4M | 🟢 **-55%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 59.8M | 🟢 **-44%** |
| default.json | invalid string value for default | 2 | ✅ | 45.4M | ✅ | 47.3M | +4% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.4M | ✅ | 44.5M | 🟢 **-43%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.9M | ✅ | 45.4M | 🟢 **-50%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 34.2M | +11% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.6M | ✅ | 39.4M | 🟢 **-33%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.2M | ✅ | 21.3M | 🔴 **+91%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.2M | ✅ | 38.1M | +15% |
| enum.json | simple enum validation | 2 | ✅ | 68.5M | ✅ | 48.3M | 🟢 **-29%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 17.9M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 57.8M | ✅ | 45.1M | 🟢 **-22%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 33.0M | 🔴 **+120%** |
| enum.json | enum with escaped characters | 3 | ✅ | 48.6M | ✅ | 44.0M | -9% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 41.8M | 🟢 **-63%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.9M | ✅ | 25.3M | 🟢 **-52%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 38.8M | 🟢 **-65%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.0M | ✅ | 14.0M | 🟢 **-73%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 44.6M | 🟢 **-61%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.7M | ✅ | 28.4M | 🟢 **-46%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 103.2M | ✅ | 40.7M | 🟢 **-61%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.3M | ✅ | 23.8M | 🟢 **-54%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 40.8M | 🟢 **-55%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 49.1M | ✅ | 28.8M | 🟢 **-41%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 45.6M | 🟢 **-51%** |
| format.json | email format | 6 | ✅ | 65.7M | ✅ | 55.4M | -16% |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 55.7M | 🟢 **-66%** |
| format.json | ipv6 format | 6 | ✅ | 65.8M | ✅ | 55.7M | -15% |
| format.json | hostname format | 6 | ✅ | 163.1M | ✅ | 55.8M | 🟢 **-66%** |
| format.json | date-time format | 6 | ✅ | 64.2M | ✅ | 55.9M | -13% |
| format.json | uri format | 6 | ✅ | 162.0M | ✅ | 55.7M | 🟢 **-66%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 37.5M | -3% |
| items.json | a schema given for items | 4 | ✅ | 81.9M | ✅ | 43.0M | 🟢 **-47%** |
| items.json | an array of schemas for items | 6 | ✅ | 55.5M | ✅ | 49.5M | -11% |
| items.json | items and subitems | 6 | ✅ | 28.1M | ✅ | 21.3M | 🟢 **-24%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 11.5M | -2% |
| items.json | items with null instance elements | 1 | ✅ | 60.8M | ✅ | 67.2M | +11% |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.3M | ✅ | 68.0M | +6% |
| maxItems.json | maxItems validation | 4 | ✅ | 58.3M | ✅ | 47.8M | -18% |
| maxLength.json | maxLength validation | 5 | ✅ | 49.4M | ✅ | 42.3M | -14% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.1M | ✅ | 42.5M | -12% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.8M | ✅ | 33.1M | 🟢 **-21%** |
| maximum.json | maximum validation | 4 | ✅ | 34.3M | ✅ | 47.9M | 🔴 **+40%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.3M | ✅ | 48.0M | -15% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 57.0M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 57.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 52.4M | ✅ | 47.4M | -9% |
| minLength.json | minLength validation | 5 | ✅ | 48.5M | ✅ | 43.6M | -10% |
| minProperties.json | minProperties validation | 6 | ✅ | 48.3M | ✅ | 38.5M | 🟢 **-20%** |
| minimum.json | minimum validation | 4 | ✅ | 57.0M | ✅ | 45.2M | 🟢 **-21%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.6M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 57.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.2M | ✅ | 47.4M | -17% |
| multipleOf.json | by int | 3 | ✅ | 59.8M | ✅ | 43.8M | 🟢 **-27%** |
| multipleOf.json | by number | 3 | ✅ | 57.0M | ✅ | 42.5M | 🟢 **-25%** |
| multipleOf.json | by small number | 2 | ✅ | 46.4M | ✅ | 40.8M | -12% |
| multipleOf.json | float division = inf | 1 | ✅ | 24.8M | ✅ | 9.0M | 🟢 **-64%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 60.0M | ✅ | 9.2M | 🟢 **-85%** |
| not.json | not | 2 | ✅ | 61.2M | ✅ | 41.7M | 🟢 **-32%** |
| not.json | not multiple types | 3 | ✅ | 50.7M | ✅ | 37.0M | 🟢 **-27%** |
| not.json | not more complex schema | 3 | ✅ | 49.5M | ✅ | 39.5M | 🟢 **-20%** |
| not.json | forbidden property | 2 | ✅ | 42.1M | ✅ | 44.1M | +5% |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.5M | ✅ | 39.2M | 🟢 **-22%** |
| not.json | double negation | 1 | ✅ | 69.7M | ✅ | 73.3M | +5% |
| oneOf.json | oneOf | 4 | ✅ | 53.3M | ✅ | 22.5M | 🟢 **-58%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.1M | ✅ | 24.1M | -20% |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.7M | ✅ | 20.6M | 🟢 **-47%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.0M | ✅ | 33.7M | 🟢 **-44%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.9M | ✅ | 16.8M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 39.8M | ✅ | 22.0M | 🟢 **-45%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.0M | ✅ | 28.2M | 🟢 **-53%** |
| pattern.json | pattern validation | 8 | ✅ | 46.3M | ✅ | 42.5M | -8% |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.6M | ✅ | 29.0M | 🔴 **+41%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 13.9M | 🟢 **-44%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 7.5M | 🟢 **-48%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 7.8M | 🟢 **-50%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.1M | ✅ | 21.5M | 🔴 **+33%** |
| properties.json | object properties validation | 6 | ✅ | 45.8M | ✅ | 43.8M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.4M | ✅ | 9.2M | 🟢 **-50%** |
| properties.json | properties with escaped characters | 2 | ✅ | 38.7M | ✅ | 43.2M | +12% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.2M | ✅ | 60.8M | +6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 20.6M | -9% |
| ref.json | relative pointer ref to object | 2 | ✅ | 23.5M | ✅ | 43.2M | 🔴 **+84%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 44.8M | -4% |
| ref.json | escaped pointer ref | 6 | ✅ | 39.3M | ✅ | 39.9M | +2% |
| ref.json | nested refs | 2 | ✅ | 35.0M | ✅ | 47.8M | 🔴 **+37%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 44.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 12.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.3M | ✅ | 44.0M | -1% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 21.5M | ✅ | 43.8M | 🔴 **+104%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 5.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.2M | ✅ | 44.6M | +1% |
| ref.json | Location-independent identifier | 2 | ✅ | 61.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 41.6M | ✅ | 17.2M | 🟢 **-59%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 39.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 54.1M | ✅ | 50.2M | -7% |
| refRemote.json | remote ref | 2 | ✅ | 42.7M | ✅ | 47.8M | +12% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 38.8M | ✅ | 49.6M | 🔴 **+28%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.6M | ✅ | 49.4M | 🔴 **+28%** |
| refRemote.json | base URI change | 2 | ✅ | 27.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 17.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.2M | ✅ | 49.4M | -7% |
| required.json | required default validation | 1 | ✅ | 66.8M | ✅ | 73.6M | +10% |
| required.json | required with escaped characters | 2 | ✅ | 43.3M | ✅ | 37.7M | -13% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 48.9M | ✅ | 35.5M | 🟢 **-27%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 43.8M | 🟢 **-20%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 45.8M | -17% |
| type.json | object type matches objects | 7 | ✅ | 49.0M | ✅ | 36.4M | 🟢 **-26%** |
| type.json | array type matches arrays | 7 | ✅ | 52.2M | ✅ | 40.7M | 🟢 **-22%** |
| type.json | boolean type matches booleans | 10 | ✅ | 53.6M | ✅ | 38.0M | 🟢 **-29%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.7M | ✅ | 35.9M | 🟢 **-28%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.4M | ✅ | 38.0M | 🟢 **-29%** |
| type.json | type as array with one item | 2 | ✅ | 60.6M | ✅ | 47.9M | 🟢 **-21%** |
| type.json | type: array or object | 5 | ✅ | 54.2M | ✅ | 42.7M | 🟢 **-21%** |
| type.json | type: array, object or null | 5 | ✅ | 57.3M | ✅ | 44.3M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 10.6M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 19.9M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 27.0M | 🔴 **+51%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 63.9M | ✅ | 54.4M | -15% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 57.1M | ✅ | 54.6M | -4% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 49.5M | -8% |
| optional/bignum.json | integer | 2 | ✅ | 67.7M | ✅ | 14.2M | 🟢 **-79%** |
| optional/bignum.json | number | 2 | ✅ | 68.7M | ✅ | 57.4M | -16% |
| optional/bignum.json | string | 1 | ✅ | 52.2M | ✅ | 39.1M | 🟢 **-25%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 63.3M | ✅ | 67.7M | +7% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.3M | ✅ | 67.0M | +6% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.7M | ✅ | 27.2M | +6% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.7M | ✅ | 26.7M | 0% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.5M | ✅ | 27.4M | +12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.0M | ✅ | 27.4M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.6M | ✅ | 27.0M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.3M | ✅ | 27.7M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.7M | ✅ | 27.1M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 25.1M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 30.3M | ✅ | 28.8M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.4M | ✅ | 24.5M | -11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ✅ | 17.9M | +10% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 12.6M | -12% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 13.8M | -6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.3M | ✅ | 26.1M | +3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ✅ | 23.1M | 🔴 **+31%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.9M | ✅ | 23.1M | +5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 20.8M | +9% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.7M | ✅ | 21.7M | +16% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 9.1M | +20% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 9.0M | +9% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ✅ | 21.3M | +20% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.3M | ✅ | 30.4M | -11% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.5M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 66.9M | ✅ | 55.8M | -17% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-31%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.8M | ✅ | 26.1M | -6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 8.5M | 🟢 **-47%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 50.3M | +11% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 34.3M | -7% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.5M | ✅ | 74.3M | 🟢 **-53%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 83.8M | ✅ | 50.8M | 🟢 **-39%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 172.5M | ✅ | 71.4M | 🟢 **-59%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 84.6M | ✅ | 66.5M | 🟢 **-21%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.7M | ✅ | 25.3M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.1M | ✅ | 21.5M | 🟢 **-42%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.3M | ✅ | 17.1M | 🟢 **-85%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 86.4M | ✅ | 75.8M | -12% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 31.9M | 🟢 **-24%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 18.5M | ✅ | 23.1M | 🔴 **+25%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.3M | ✅ | 16.8M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.4M | ✅ | 12.9M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 75.7M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.5M | ✅ | 8.1M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.1M | ✅ | 28.7M | 🟢 **-61%** |
| allOf.json | allOf | 4 | ✅ | 32.0M | ✅ | 34.3M | +7% |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 12.5M | 🟢 **-53%** |
| allOf.json | allOf simple types | 2 | ✅ | 77.9M | ✅ | 43.3M | 🟢 **-44%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.3M | ✅ | 73.7M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 72.0M | ✅ | 39.7M | 🟢 **-45%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 90.1M | ✅ | 39.9M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 86.1M | ✅ | 65.6M | 🟢 **-24%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 73.6M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 80.0M | ✅ | 49.9M | 🟢 **-38%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.2M | ✅ | 48.8M | 🟢 **-61%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 80.6M | ✅ | 50.0M | 🟢 **-38%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.3M | ✅ | 4.6M | 🟢 **-95%** |
| anyOf.json | anyOf | 4 | ✅ | 71.1M | ✅ | 27.0M | 🟢 **-62%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.6M | ✅ | 22.8M | 🟢 **-51%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 94.1M | ✅ | 73.4M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 73.9M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 69.8M | ✅ | 19.3M | 🟢 **-72%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 68.4M | ✅ | 25.9M | 🟢 **-62%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.0M | ✅ | 68.8M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 130.2M | ✅ | 27.5M | 🟢 **-79%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 72.0M | ✅ | 55.6M | 🟢 **-23%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.2M | ✅ | 39.0M | 🟢 **-56%** |
| const.json | const validation | 3 | ✅ | 70.7M | ✅ | 38.4M | 🟢 **-46%** |
| const.json | const with object | 4 | ✅ | 52.7M | ✅ | 15.2M | 🟢 **-71%** |
| const.json | const with array | 3 | ✅ | 59.5M | ✅ | 16.3M | 🟢 **-73%** |
| const.json | const with null | 2 | ✅ | 127.7M | ✅ | 49.5M | 🟢 **-61%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.2M | ✅ | 39.6M | 🟢 **-48%** |
| const.json | const with true does not match 1 | 3 | ✅ | 89.0M | ✅ | 39.1M | 🟢 **-56%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.7M | ✅ | 26.7M | 🟢 **-60%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.3M | ✅ | 26.2M | 🟢 **-73%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 66.6M | ✅ | 12.6M | 🟢 **-81%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ✅ | 12.1M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 64.0M | ✅ | 42.8M | 🟢 **-33%** |
| const.json | const with 1 does not match true | 3 | ✅ | 120.3M | ✅ | 43.6M | 🟢 **-64%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.3M | ✅ | 38.2M | 🟢 **-45%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 118.6M | ✅ | 42.2M | 🟢 **-64%** |
| const.json | nul characters in strings | 2 | ✅ | 67.8M | ✅ | 46.0M | 🟢 **-32%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.4M | ✅ | 44.7M | 🟢 **-48%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 69.4M | ✅ | 46.1M | 🟢 **-34%** |
| contains.json | contains keyword validation | 6 | ✅ | 102.7M | ✅ | 14.9M | 🟢 **-85%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.9M | ✅ | 14.1M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 74.1M | ✅ | 46.1M | 🟢 **-38%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 73.5M | ✅ | 31.9M | 🟢 **-57%** |
| contains.json | items + contains | 4 | ✅ | 40.4M | ✅ | 7.2M | 🟢 **-82%** |
| contains.json | contains with null instance elements | 1 | ✅ | 32.9M | ✅ | 65.6M | 🔴 **+99%** |
| default.json | invalid type for default | 2 | ✅ | 111.0M | ✅ | 59.6M | 🟢 **-46%** |
| default.json | invalid string value for default | 2 | ✅ | 55.5M | ✅ | 48.6M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 61.3M | ✅ | 44.4M | 🟢 **-28%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 9.9M | ✅ | 1.5M | 🟢 **-85%** |
| dependencies.json | dependencies | 7 | ✅ | 58.4M | ✅ | 44.8M | 🟢 **-23%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.8M | ✅ | 62.4M | 🟢 **-36%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.1M | ✅ | 33.1M | -8% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 27.3M | ✅ | 39.0M | 🔴 **+43%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 60.9M | ✅ | 41.3M | 🟢 **-32%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 13.0M | ✅ | 21.6M | 🔴 **+66%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 31.3M | ✅ | 38.9M | 🔴 **+24%** |
| enum.json | simple enum validation | 2 | ✅ | 115.8M | ✅ | 49.4M | 🟢 **-57%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.2M | ✅ | 11.0M | 🟢 **-76%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 123.1M | ✅ | 49.0M | 🟢 **-60%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 35.5M | 🔴 **+148%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.2M | ✅ | 42.0M | 🟢 **-66%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.9M | ✅ | 39.3M | 🟢 **-36%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 90.7M | ✅ | 20.3M | 🟢 **-78%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.5M | ✅ | 38.9M | 🟢 **-49%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 97.5M | ✅ | 20.7M | 🟢 **-79%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 79.6M | ✅ | 44.4M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 107.4M | ✅ | 22.5M | 🟢 **-79%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 79.3M | ✅ | 43.1M | 🟢 **-46%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 106.3M | ✅ | 22.5M | 🟢 **-79%** |
| enum.json | nul characters in strings | 2 | ✅ | 68.5M | ✅ | 45.2M | 🟢 **-34%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 115.7M | ✅ | 41.6M | 🟢 **-64%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 74.3M | ✅ | 40.6M | 🟢 **-45%** |
| format.json | email format | 6 | ✅ | 158.7M | ✅ | 55.3M | 🟢 **-65%** |
| format.json | ipv4 format | 6 | ✅ | 95.2M | ✅ | 54.7M | 🟢 **-43%** |
| format.json | ipv6 format | 6 | ✅ | 154.1M | ✅ | 55.4M | 🟢 **-64%** |
| format.json | hostname format | 6 | ✅ | 94.7M | ✅ | 55.5M | 🟢 **-41%** |
| format.json | date-time format | 6 | ✅ | 156.8M | ✅ | 55.6M | 🟢 **-65%** |
| format.json | json-pointer format | 6 | ✅ | 94.9M | ✅ | 46.4M | 🟢 **-51%** |
| format.json | uri format | 6 | ✅ | 152.2M | ✅ | 54.0M | 🟢 **-65%** |
| format.json | uri-reference format | 6 | ✅ | 92.9M | ✅ | 55.6M | 🟢 **-40%** |
| format.json | uri-template format | 6 | ✅ | 158.7M | ✅ | 55.4M | 🟢 **-65%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.4M | ✅ | 34.3M | -11% |
| items.json | a schema given for items | 4 | ✅ | 68.7M | ✅ | 42.7M | 🟢 **-38%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.3M | ✅ | 49.8M | 🟢 **-20%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 160.5M | ✅ | 54.7M | 🟢 **-66%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 69.1M | ✅ | 43.1M | 🟢 **-38%** |
| items.json | items with boolean schemas | 3 | ✅ | 73.8M | ✅ | 44.2M | 🟢 **-40%** |
| items.json | items and subitems | 6 | ✅ | 24.1M | ✅ | 22.1M | -8% |
| items.json | nested items | 3 | ✅ | 12.6M | ✅ | 12.3M | -2% |
| items.json | single-form items with null instance ... | 1 | ✅ | 80.7M | ✅ | 48.5M | 🟢 **-40%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.2M | ✅ | 68.4M | 🟢 **-47%** |
| maxItems.json | maxItems validation | 4 | ✅ | 84.7M | ✅ | 48.0M | 🟢 **-43%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 112.8M | ✅ | 46.6M | 🟢 **-59%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 46.3M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 77.7M | ✅ | 43.4M | 🟢 **-44%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.9M | ✅ | 42.6M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 64.4M | ✅ | 33.6M | 🟢 **-48%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 32.6M | 🟢 **-36%** |
| maximum.json | maximum validation | 4 | ✅ | 131.7M | ✅ | 47.0M | 🟢 **-64%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 82.2M | ✅ | 47.4M | 🟢 **-42%** |
| minItems.json | minItems validation | 4 | ✅ | 128.7M | ✅ | 47.6M | 🟢 **-63%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 78.2M | ✅ | 48.3M | 🟢 **-38%** |
| minLength.json | minLength validation | 5 | ✅ | 89.0M | ✅ | 43.6M | 🟢 **-51%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 43.2M | 🟢 **-27%** |
| minProperties.json | minProperties validation | 6 | ✅ | 83.9M | ✅ | 42.5M | 🟢 **-49%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 52.0M | ✅ | 32.6M | 🟢 **-37%** |
| minimum.json | minimum validation | 4 | ✅ | 126.3M | ✅ | 47.2M | 🟢 **-63%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 75.0M | ✅ | 47.4M | 🟢 **-37%** |
| multipleOf.json | by int | 3 | ✅ | 129.5M | ✅ | 42.5M | 🟢 **-67%** |
| multipleOf.json | by number | 3 | ✅ | 74.7M | ✅ | 42.0M | 🟢 **-44%** |
| multipleOf.json | by small number | 2 | ✅ | 98.2M | ✅ | 40.9M | 🟢 **-58%** |
| multipleOf.json | float division = inf | 1 | ✅ | 59.7M | ✅ | 7.9M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 121.7M | ✅ | 9.2M | 🟢 **-92%** |
| not.json | not | 2 | ✅ | 80.1M | ✅ | 42.4M | 🟢 **-47%** |
| not.json | not multiple types | 3 | ✅ | 111.5M | ✅ | 36.7M | 🟢 **-67%** |
| not.json | not more complex schema | 3 | ✅ | 72.4M | ✅ | 39.0M | 🟢 **-46%** |
| not.json | forbidden property | 2 | ✅ | 54.7M | ✅ | 43.5M | 🟢 **-20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 67.2M | ✅ | 38.4M | 🟢 **-43%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 88.6M | ✅ | 31.4M | 🟢 **-65%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.0M | ✅ | 53.3M | 🟢 **-40%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 71.3M | 🟢 **-55%** |
| oneOf.json | oneOf | 4 | ✅ | 68.8M | ✅ | 21.8M | 🟢 **-68%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 43.7M | ✅ | 26.3M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 69.8M | ✅ | 33.2M | 🟢 **-52%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.4M | ✅ | 22.7M | 🟢 **-86%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 64.5M | ✅ | 35.6M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 101.6M | ✅ | 16.9M | 🟢 **-83%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 20.3M | 🟢 **-54%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 123.7M | ✅ | 31.3M | 🟢 **-75%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 16.5M | 🟢 **-69%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 72.8M | ✅ | 21.1M | 🟢 **-71%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 27.9M | 🟢 **-64%** |
| pattern.json | pattern validation | 8 | ✅ | 77.1M | ✅ | 43.3M | 🟢 **-44%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.2M | ✅ | 30.9M | +14% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.2M | ✅ | 14.3M | 🟢 **-49%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 7.6M | 🟢 **-46%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 8.5M | 🟢 **-41%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 8.9M | 🟢 **-57%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.8M | ✅ | 21.3M | +8% |
| properties.json | object properties validation | 6 | ✅ | 66.3M | ✅ | 44.1M | 🟢 **-34%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 9.5M | 🟢 **-48%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.7M | ✅ | 40.5M | 🟢 **-20%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.9M | ✅ | 42.7M | -3% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 110.9M | ✅ | 60.3M | 🟢 **-46%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ✅ | 34.5M | 🟢 **-26%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.3M | ✅ | 16.8M | -8% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 172.3M | ✅ | 68.4M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 28.5M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.7M | ✅ | 24.8M | 🟢 **-45%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.3M | ✅ | 33.6M | -15% |
| ref.json | root pointer ref | 4 | ✅ | 27.7M | ✅ | 21.2M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.1M | ✅ | 43.0M | -5% |
| ref.json | relative pointer ref to array | 2 | ✅ | 60.1M | ✅ | 44.6M | 🟢 **-26%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 39.5M | -2% |
| ref.json | nested refs | 2 | ✅ | 38.3M | ✅ | 46.2M | 🔴 **+21%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.4M | ✅ | 4.8M | 🟢 **-77%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.7M | ✅ | 43.2M | +4% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 43.3M | -3% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 94.3M | ✅ | 73.9M | 🟢 **-22%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 71.3M | ✅ | 39.4M | 🟢 **-45%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.8M | ✅ | 7.4M | -4% |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 42.8M | -3% |
| ref.json | Location-independent identifier | 2 | ✅ | 34.3M | ✅ | 48.0M | 🔴 **+40%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 34.2M | ✅ | 47.0M | 🔴 **+37%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 32.9M | ✅ | 45.0M | 🔴 **+37%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 58.1M | ✅ | 14.6M | 🟢 **-75%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 26.6M | ✅ | 32.0M | 🔴 **+20%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 25.9M | ✅ | 29.5M | +14% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ✅ | 23.9M | 🟢 **-45%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.3M | ✅ | 43.5M | -6% |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ✅ | 43.2M | -10% |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ✅ | 42.9M | +3% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.6M | ✅ | 43.0M | +1% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.7M | ✅ | 43.8M | +3% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 32.4M | ✅ | 40.5M | 🔴 **+25%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 33.1M | ✅ | 50.6M | 🔴 **+53%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.9M | ✅ | 48.0M | 🟢 **-41%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.8M | ✅ | 49.4M | 🟢 **-39%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.7M | ✅ | 49.3M | 🟢 **-33%** |
| refRemote.json | remote ref | 2 | ✅ | 33.8M | ✅ | 47.4M | 🔴 **+40%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 34.6M | ✅ | 47.2M | 🔴 **+37%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.9M | ✅ | 48.7M | 🔴 **+43%** |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ✅ | 27.8M | +4% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 27.5M | ✅ | 27.3M | -1% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.8M | ✅ | 27.5M | 🟢 **-21%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 22.8M | ✅ | 12.6M | 🟢 **-45%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 32.7M | ✅ | 36.6M | +12% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 28.8M | ✅ | 41.7M | 🔴 **+45%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.0M | ✅ | 29.4M | 🟢 **-23%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 28.2M | ✅ | 41.7M | 🔴 **+48%** |
| required.json | required validation | 5 | ✅ | 60.0M | ✅ | 48.4M | -19% |
| required.json | required default validation | 1 | ✅ | 93.7M | ✅ | 74.0M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 94.7M | ✅ | 73.6M | 🟢 **-22%** |
| required.json | required with escaped characters | 2 | ✅ | 44.2M | ✅ | 37.4M | -15% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.8M | ✅ | 39.6M | 🟢 **-41%** |
| type.json | number type matches numbers | 9 | ✅ | 70.3M | ✅ | 39.8M | 🟢 **-43%** |
| type.json | string type matches strings | 9 | ✅ | 70.0M | ✅ | 42.0M | 🟢 **-40%** |
| type.json | object type matches objects | 7 | ✅ | 59.9M | ✅ | 34.3M | 🟢 **-43%** |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 39.9M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.4M | ✅ | 42.7M | 🟢 **-37%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 35.7M | 🟢 **-46%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.4M | ✅ | 37.8M | 🟢 **-42%** |
| type.json | type as array with one item | 2 | ✅ | 78.8M | ✅ | 49.6M | 🟢 **-37%** |
| type.json | type: array or object | 5 | ✅ | 73.8M | ✅ | 40.6M | 🟢 **-45%** |
| type.json | type: array, object or null | 5 | ✅ | 79.2M | ✅ | 41.3M | 🟢 **-48%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 10.5M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.9M | ✅ | 22.7M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.8M | ✅ | 26.5M | 🔴 **+34%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 82.1M | ✅ | 54.1M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.8M | ✅ | 54.2M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 75.0M | ✅ | 48.7M | 🟢 **-35%** |
| optional/bignum.json | integer | 2 | ✅ | 89.5M | ✅ | 14.2M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.3M | ✅ | 64.9M | 🟢 **-27%** |
| optional/bignum.json | string | 1 | ✅ | 68.1M | ✅ | 39.6M | 🟢 **-42%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 83.1M | ✅ | 67.5M | -19% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 64.1M | ✅ | 37.9M | 🟢 **-41%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 84.0M | ✅ | 67.4M | -20% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 64.0M | ✅ | 37.9M | 🟢 **-41%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 35.7M | ✅ | 27.4M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 32.1M | ✅ | 27.5M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.5M | ✅ | 27.5M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.0M | ✅ | 27.5M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 27.4M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.2M | ✅ | 28.7M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.7M | ✅ | 27.3M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 30.0M | ✅ | 26.2M | -13% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.3M | ✅ | 30.5M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.6M | ✅ | 22.9M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 18.0M | +6% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.1M | ✅ | 13.6M | 🟢 **-21%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 14.4M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 27.0M | -9% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.7M | ✅ | 22.9M | +1% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ✅ | 22.9M | +5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 18.5M | -1% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 21.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.3M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 9.0M | +3% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 21.2M | +12% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.4M | ✅ | 30.9M | 🟢 **-30%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ✅ | 2.7M | 🟢 **-79%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 24.5M | 🟢 **-25%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 54.8M | 🟢 **-43%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.3M | ✅ | 9.3M | -10% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.1M | ✅ | 15.2M | -16% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.4M | 🟢 **-33%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.0M | ✅ | 14.4M | 🟢 **-52%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.1M | ✅ | 12.6M | 🟢 **-75%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.1M | ✅ | 12.7M | 🟢 **-75%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.5M | ✅ | 26.9M | -17% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 8.2M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 52.9M | 🔴 **+630%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.4M | ✅ | 35.1M | -1% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 139.7M | ✅ | 72.6M | 🟢 **-48%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.4M | ✅ | 49.0M | 🟢 **-23%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 150.8M | ✅ | 67.9M | 🟢 **-55%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 69.4M | ✅ | 66.5M | -4% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.1M | ✅ | 27.0M | 🟢 **-49%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.9M | ✅ | 37.9M | -10% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 103.9M | ✅ | 18.1M | 🟢 **-83%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.3M | ✅ | 72.9M | -1% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.0M | ✅ | 33.4M | 🟢 **-21%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.5M | ✅ | 23.1M | +13% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 17.4M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.4M | ✅ | 13.7M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.7M | ✅ | 73.4M | 🟢 **-47%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 8.1M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.0M | ✅ | 46.5M | 🟢 **-32%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 33.6M | -7% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.8M | ✅ | 24.9M | -14% |
| allOf.json | allOf simple types | 2 | ✅ | 67.7M | ✅ | 49.0M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.7M | ✅ | 72.4M | 🟢 **-48%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.5M | ✅ | 38.2M | 🟢 **-36%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ✅ | 39.6M | 🟢 **-55%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.3M | ✅ | 72.9M | -1% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 139.6M | ✅ | 74.2M | 🟢 **-47%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ✅ | 49.4M | 🟢 **-29%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.2M | ✅ | 48.9M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.0M | ✅ | 50.8M | 🟢 **-27%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.8M | ✅ | 5.0M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 70.3M | ✅ | 25.6M | 🟢 **-64%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 41.8M | ✅ | 19.9M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 79.6M | ✅ | 72.8M | -9% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 139.6M | ✅ | 72.7M | 🟢 **-48%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.6M | ✅ | 19.8M | 🟢 **-67%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.0M | ✅ | 32.2M | 🟢 **-52%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.6M | ✅ | 68.1M | -10% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 112.3M | ✅ | 27.9M | 🟢 **-75%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 69.2M | ✅ | 55.7M | -19% |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 87.9M | ✅ | 39.0M | 🟢 **-56%** |
| const.json | const validation | 3 | ✅ | 77.6M | ✅ | 38.7M | 🟢 **-50%** |
| const.json | const with object | 4 | ✅ | 48.0M | ✅ | 15.4M | 🟢 **-68%** |
| const.json | const with array | 3 | ✅ | 48.2M | ✅ | 14.6M | 🟢 **-70%** |
| const.json | const with null | 2 | ✅ | 112.3M | ✅ | 49.8M | 🟢 **-56%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.3M | ✅ | 38.3M | 🟢 **-41%** |
| const.json | const with true does not match 1 | 3 | ✅ | 105.7M | ✅ | 42.5M | 🟢 **-60%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.9M | ✅ | 25.2M | 🟢 **-51%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 86.9M | ✅ | 25.2M | 🟢 **-71%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 59.4M | ✅ | 12.5M | 🟢 **-79%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 89.5M | ✅ | 12.6M | 🟢 **-86%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ✅ | 43.5M | 🟢 **-24%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 49.2M | 🟢 **-56%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.8M | ✅ | 41.4M | 🟢 **-28%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 105.6M | ✅ | 42.6M | 🟢 **-60%** |
| const.json | nul characters in strings | 2 | ✅ | 57.8M | ✅ | 47.6M | -18% |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.4M | ✅ | 47.2M | 🟢 **-41%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 59.9M | ✅ | 45.8M | 🟢 **-24%** |
| contains.json | contains keyword validation | 6 | ✅ | 83.3M | ✅ | 14.8M | 🟢 **-82%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.3M | ✅ | 14.0M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 96.8M | ✅ | 47.8M | 🟢 **-51%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.5M | ✅ | 32.3M | 🟢 **-48%** |
| contains.json | items + contains | 4 | ✅ | 47.3M | ✅ | 7.1M | 🟢 **-85%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.5M | ✅ | 48.2M | 🟢 **-24%** |
| contains.json | contains with null instance elements | 1 | ✅ | 116.8M | ✅ | 66.2M | 🟢 **-43%** |
| default.json | invalid type for default | 2 | ✅ | 33.1M | ✅ | 58.2M | 🔴 **+76%** |
| default.json | invalid string value for default | 2 | ✅ | 36.2M | ✅ | 48.9M | 🔴 **+35%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.5M | ✅ | 42.9M | -13% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ✅ | 1.4M | 🟢 **-87%** |
| dependencies.json | dependencies | 7 | ✅ | 57.6M | ✅ | 48.7M | -15% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 83.8M | ✅ | 65.9M | 🟢 **-21%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.7M | ✅ | 34.0M | +7% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 39.2M | -7% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 52.1M | ✅ | 40.2M | 🟢 **-23%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ✅ | 21.4M | 🔴 **+20%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.2M | ✅ | 37.9M | 🔴 **+98%** |
| enum.json | simple enum validation | 2 | ✅ | 67.7M | ✅ | 50.6M | 🟢 **-25%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.9M | ✅ | 11.1M | 🟢 **-76%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 49.8M | 🟢 **-25%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 36.8M | 🔴 **+162%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.3M | ✅ | 45.6M | 🔴 **+41%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.3M | ✅ | 39.4M | 🟢 **-36%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 30.8M | ✅ | 21.1M | 🟢 **-31%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 55.1M | ✅ | 39.2M | 🟢 **-29%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 19.7M | 🟢 **-65%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.6M | ✅ | 50.7M | 🟢 **-24%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.7M | ✅ | 22.5M | 🟢 **-63%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.8M | ✅ | 43.8M | 🟢 **-34%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.7M | ✅ | 22.5M | 🟢 **-57%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.2M | ✅ | 45.4M | 🟢 **-23%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 57.6M | ✅ | 41.8M | 🟢 **-27%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.1M | ✅ | 40.2M | 🟢 **-30%** |
| format.json | email format | 6 | ✅ | 73.6M | ✅ | 55.7M | 🟢 **-24%** |
| format.json | idn-email format | 6 | ✅ | 72.3M | ✅ | 55.3M | 🟢 **-23%** |
| format.json | regex format | 6 | ✅ | 63.6M | ✅ | 55.7M | -12% |
| format.json | ipv4 format | 6 | ✅ | 71.1M | ✅ | 53.1M | 🟢 **-25%** |
| format.json | ipv6 format | 6 | ✅ | 42.9M | ✅ | 55.4M | 🔴 **+29%** |
| format.json | idn-hostname format | 6 | ✅ | 69.6M | ✅ | 53.5M | 🟢 **-23%** |
| format.json | hostname format | 6 | ✅ | 55.2M | ✅ | 55.4M | +0% |
| format.json | date format | 6 | ✅ | 72.3M | ✅ | 55.4M | 🟢 **-23%** |
| format.json | date-time format | 6 | ✅ | 72.8M | ✅ | 55.5M | 🟢 **-24%** |
| format.json | time format | 6 | ✅ | 77.5M | ✅ | 49.0M | 🟢 **-37%** |
| format.json | json-pointer format | 6 | ✅ | 79.4M | ✅ | 54.7M | 🟢 **-31%** |
| format.json | relative-json-pointer format | 6 | ✅ | 73.1M | ✅ | 55.2M | 🟢 **-24%** |
| format.json | iri format | 6 | ✅ | 73.0M | ✅ | 55.5M | 🟢 **-24%** |
| format.json | iri-reference format | 6 | ✅ | 73.4M | ✅ | 49.8M | 🟢 **-32%** |
| format.json | uri format | 6 | ✅ | 79.7M | ✅ | 55.7M | 🟢 **-30%** |
| format.json | uri-reference format | 6 | ✅ | 73.2M | ✅ | 55.2M | 🟢 **-25%** |
| format.json | uri-template format | 6 | ✅ | 71.3M | ✅ | 54.6M | 🟢 **-23%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 82.8M | ✅ | 67.9M | -18% |
| if-then-else.json | ignore then without if | 2 | ✅ | 82.4M | ✅ | 50.3M | 🟢 **-39%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 75.3M | ✅ | 58.5M | 🟢 **-22%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ✅ | 42.2M | 🟢 **-40%** |
| if-then-else.json | if and else without then | 3 | ✅ | 59.5M | ✅ | 38.3M | 🟢 **-36%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 64.3M | ✅ | 36.8M | 🟢 **-43%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 75.2M | ✅ | 68.5M | -9% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 67.1M | ✅ | 49.8M | 🟢 **-26%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.4M | ✅ | 48.6M | 🟢 **-25%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ✅ | 31.8M | 🟢 **-20%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.9M | ✅ | 37.8M | 0% |
| items.json | a schema given for items | 4 | ✅ | 50.7M | ✅ | 43.1M | -15% |
| items.json | an array of schemas for items | 6 | ✅ | 59.5M | ✅ | 50.3M | -15% |
| items.json | items with boolean schema (true) | 2 | ✅ | 82.3M | ✅ | 68.1M | -17% |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.4M | ✅ | 43.6M | 🟢 **-31%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.3M | ✅ | 44.0M | 🟢 **-23%** |
| items.json | items and subitems | 6 | ✅ | 11.4M | ✅ | 21.9M | 🔴 **+92%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 12.6M | +5% |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.2M | ✅ | 48.0M | 🟢 **-32%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 54.0M | 🟢 **-26%** |
| maxItems.json | maxItems validation | 4 | ✅ | 70.1M | ✅ | 47.7M | 🟢 **-32%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 65.8M | ✅ | 48.4M | 🟢 **-26%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.0M | ✅ | 46.3M | -16% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 52.5M | ✅ | 43.5M | -17% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 42.7M | -20% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.9M | ✅ | 33.6M | -11% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.4M | ✅ | 33.4M | 🟢 **-31%** |
| maximum.json | maximum validation | 4 | ✅ | 68.6M | ✅ | 47.4M | 🟢 **-31%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.3M | ✅ | 47.9M | 🟢 **-31%** |
| minItems.json | minItems validation | 4 | ✅ | 67.7M | ✅ | 47.6M | 🟢 **-30%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 65.7M | ✅ | 48.9M | 🟢 **-26%** |
| minLength.json | minLength validation | 5 | ✅ | 54.2M | ✅ | 44.1M | -19% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 43.6M | -16% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.3M | ✅ | 42.8M | 🟢 **-23%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.0M | ✅ | 35.0M | 🟢 **-27%** |
| minimum.json | minimum validation | 4 | ✅ | 69.4M | ✅ | 47.2M | 🟢 **-32%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 48.0M | 🟢 **-27%** |
| multipleOf.json | by int | 3 | ✅ | 70.2M | ✅ | 43.8M | 🟢 **-38%** |
| multipleOf.json | by number | 3 | ✅ | 68.6M | ✅ | 42.7M | 🟢 **-38%** |
| multipleOf.json | by small number | 2 | ✅ | 63.0M | ✅ | 41.5M | 🟢 **-34%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.4M | ✅ | 9.0M | 🟢 **-83%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ✅ | 8.7M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 68.9M | ✅ | 40.3M | 🟢 **-42%** |
| not.json | not multiple types | 3 | ✅ | 64.2M | ✅ | 37.0M | 🟢 **-42%** |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 39.5M | 🟢 **-36%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 43.9M | -12% |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.8M | ✅ | 39.2M | 🟢 **-30%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 56.2M | ✅ | 32.6M | 🟢 **-42%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 78.7M | ✅ | 54.9M | 🟢 **-30%** |
| not.json | double negation | 1 | ✅ | 79.8M | ✅ | 73.5M | -8% |
| oneOf.json | oneOf | 4 | ✅ | 71.0M | ✅ | 22.7M | 🟢 **-68%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.0M | ✅ | 26.1M | -16% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 59.0M | ✅ | 36.8M | 🟢 **-38%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 79.6M | ✅ | 27.7M | 🟢 **-65%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 59.2M | ✅ | 36.0M | 🟢 **-39%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 59.3M | ✅ | 18.5M | 🟢 **-69%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.1M | ✅ | 26.2M | 🟢 **-33%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.0M | ✅ | 38.9M | 🟢 **-43%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.8M | ✅ | 16.7M | 🟢 **-61%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 21.7M | 🟢 **-50%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.5M | ✅ | 25.7M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 41.2M | -20% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.7M | ✅ | 30.9M | 🔴 **+25%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 13.4M | 🟢 **-47%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.2M | ✅ | 7.7M | 🟢 **-41%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 8.3M | 🟢 **-46%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 8.8M | 🟢 **-55%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 21.5M | 🔴 **+22%** |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 44.5M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.9M | ✅ | 10.1M | 🟢 **-44%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ✅ | 40.3M | -10% |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ✅ | 39.2M | -17% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 59.8M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ✅ | 29.7M | 🟢 **-23%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.1M | ✅ | 16.7M | -8% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 82.5M | ✅ | 68.2M | -17% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.5M | ✅ | 28.8M | 🟢 **-41%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.8M | ✅ | 31.6M | -18% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ✅ | 33.2M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 19.9M | -19% |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.1M | ✅ | 43.8M | -9% |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.4M | ✅ | 38.4M | 🟢 **-28%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.3M | ✅ | 39.7M | -6% |
| ref.json | nested refs | 2 | ✅ | 37.2M | ✅ | 48.5M | 🔴 **+31%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.5M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.5M | ✅ | 4.1M | 🟢 **-82%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ✅ | 43.2M | -10% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.1M | ✅ | 42.7M | -11% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 79.7M | ✅ | 72.9M | -9% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 59.5M | ✅ | 40.7M | 🟢 **-32%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 7.4M | -15% |
| ref.json | refs with quote | 2 | ✅ | 50.2M | ✅ | 43.8M | -13% |
| ref.json | Location-independent identifier | 2 | ✅ | 47.9M | ✅ | 49.4M | +3% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.5M | ✅ | 41.4M | -13% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ✅ | 40.8M | -10% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 13.2M | 🟢 **-75%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ✅ | 33.4M | +5% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.7M | ✅ | 31.5M | -1% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.9M | ✅ | 43.6M | -7% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.5M | ✅ | 23.9M | 🟢 **-41%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.8M | ✅ | 43.8M | -12% |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ✅ | 41.0M | -15% |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.0M | ✅ | 43.2M | -8% |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.3M | ✅ | 42.8M | -5% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.3M | ✅ | 43.2M | -14% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.3M | ✅ | 43.1M | +4% |
| ref.json | ref to if | 2 | ✅ | 47.6M | ✅ | 39.5M | -17% |
| ref.json | ref to then | 2 | ✅ | 47.7M | ✅ | 40.0M | -16% |
| ref.json | ref to else | 2 | ✅ | 47.6M | ✅ | 47.1M | -1% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.5M | ✅ | 49.6M | +4% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 68.7M | ✅ | 49.4M | 🟢 **-28%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.0M | ✅ | 48.2M | 🟢 **-30%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 63.1M | ✅ | 48.1M | 🟢 **-24%** |
| refRemote.json | remote ref | 2 | ✅ | 47.7M | ✅ | 36.7M | 🟢 **-23%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.1M | ✅ | 48.6M | +5% |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.1M | ✅ | 48.4M | +18% |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ✅ | 28.0M | -2% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.7M | ✅ | 27.4M | -13% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.2M | ✅ | 27.4M | 🟢 **-28%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ✅ | 11.6M | 🟢 **-62%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.7M | ✅ | 36.8M | -7% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.7M | ✅ | 41.5M | +13% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.9M | ✅ | 27.7M | 🟢 **-34%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 40.5M | ✅ | 41.0M | +1% |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 48.2M | -17% |
| required.json | required default validation | 1 | ✅ | 79.7M | ✅ | 72.5M | -9% |
| required.json | required with empty array | 1 | ✅ | 79.7M | ✅ | 72.6M | -9% |
| required.json | required with escaped characters | 2 | ✅ | 47.8M | ✅ | 38.7M | -19% |
| required.json | required properties whose names are J... | 7 | ✅ | 26.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 57.6M | ✅ | 40.4M | 🟢 **-30%** |
| type.json | number type matches numbers | 9 | ✅ | 59.4M | ✅ | 39.5M | 🟢 **-34%** |
| type.json | string type matches strings | 9 | ✅ | 59.4M | ✅ | 44.7M | 🟢 **-25%** |
| type.json | object type matches objects | 7 | ✅ | 50.5M | ✅ | 40.0M | 🟢 **-21%** |
| type.json | array type matches arrays | 7 | ✅ | 56.1M | ✅ | 40.7M | 🟢 **-27%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.4M | ✅ | 42.1M | 🟢 **-27%** |
| type.json | null type matches only the null object | 10 | ✅ | 57.0M | ✅ | 36.5M | 🟢 **-36%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.6M | ✅ | 38.4M | 🟢 **-33%** |
| type.json | type as array with one item | 2 | ✅ | 68.4M | ✅ | 43.1M | 🟢 **-37%** |
| type.json | type: array or object | 5 | ✅ | 57.9M | ✅ | 41.8M | 🟢 **-28%** |
| type.json | type: array, object or null | 5 | ✅ | 61.6M | ✅ | 44.6M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 10.4M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 22.6M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 24.9M | 🔴 **+39%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.1M | ✅ | 54.8M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.6M | ✅ | 54.0M | -18% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.0M | ✅ | 48.8M | -20% |
| optional/bignum.json | integer | 2 | ✅ | 78.3M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 80.4M | ✅ | 67.7M | -16% |
| optional/bignum.json | string | 1 | ✅ | 57.4M | ✅ | 39.2M | 🟢 **-32%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.8M | ✅ | 67.0M | -7% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ✅ | 36.5M | 🟢 **-34%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 66.9M | -9% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.7M | ✅ | 38.3M | 🟢 **-31%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 343K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.4M | ✅ | 26.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.5M | ✅ | 26.9M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 27.7M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 27.3M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.3M | ✅ | 27.0M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 29.3M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.3M | ✅ | 27.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.0M | ✅ | 29.4M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 30.2M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.8M | ✅ | 23.9M | -17% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.0M | ✅ | 17.9M | +12% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.0M | ✅ | 13.9M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 14.0M | -2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 27.0M | +3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ✅ | 22.3M | +9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 23.0M | +3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 20.9M | +9% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 20.9M | +12% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.9M | ✅ | 9.7M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.7M | ✅ | 8.5M | -12% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.1M | ✅ | 8.0M | -12% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 21.1M | +15% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.9M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.4M | ✅ | 30.3M | -17% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.0M | ✅ | 2.8M | 🟢 **-74%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ✅ | 25.7M | -18% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 65.3M | ✅ | 901K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.1M | ✅ | 29.4M | -14% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ✅ | 5.7M | -20% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 76.7M | ✅ | 55.8M | 🟢 **-27%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.8M | ✅ | 9.2M | -15% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ✅ | 15.5M | -15% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.3M | 🟢 **-34%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.7M | ✅ | 14.6M | 🟢 **-58%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 56.0M | ✅ | 37.3M | 🟢 **-33%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 56.0M | ✅ | 34.4M | 🟢 **-39%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 26.9M | -7% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 8.5M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 7.4M | +2% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 33.2M | ✅ | 34.2M | +3% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ✅ | 74.3M | 🟢 **-51%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.9M | ✅ | 47.5M | 🟢 **-27%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.0M | ✅ | 69.1M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.1M | ✅ | 66.3M | -5% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.0M | ✅ | 27.8M | 🟢 **-50%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.3M | ✅ | 38.0M | +2% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 48.1M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 73.9M | +6% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 29.9M | 🟢 **-36%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 23.1M | +8% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 16.9M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.8M | ✅ | 13.7M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 72.0M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 8.3M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 58.5M | ✅ | 44.6M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.6M | ✅ | 8.5M | 🟢 **-66%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.6M | ✅ | 9.6M | 🟢 **-70%** |
| allOf.json | allOf | 4 | ✅ | 37.4M | ✅ | 34.6M | -7% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 24.9M | -20% |
| allOf.json | allOf simple types | 2 | ✅ | 63.2M | ✅ | 40.5M | 🟢 **-36%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 73.3M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 58.2M | ✅ | 21.5M | 🟢 **-63%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 31.2M | 🟢 **-66%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.7M | ✅ | 46.4M | 🟢 **-40%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 136.8M | ✅ | 74.3M | 🟢 **-46%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 50.2M | 🟢 **-25%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 49.1M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 47.8M | 🟢 **-30%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 4.4M | 🟢 **-95%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.9M | ✅ | 47.3M | 🟢 **-29%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.7M | ✅ | 47.0M | 🟢 **-46%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ✅ | 47.6M | +5% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 66.6M | ✅ | 48.4M | 🟢 **-27%** |
| anyOf.json | anyOf | 4 | ✅ | 68.8M | ✅ | 19.8M | 🟢 **-71%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.0M | ✅ | 22.2M | 🟢 **-40%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.8M | ✅ | 74.3M | -3% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 76.8M | ✅ | 73.1M | -5% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 19.7M | 🟢 **-66%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ✅ | 19.0M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 72.0M | ✅ | 50.1M | 🟢 **-30%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 26.6M | 🟢 **-59%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.0M | ✅ | 55.3M | 🟢 **-26%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 52.0M | ✅ | 38.5M | 🟢 **-26%** |
| const.json | const validation | 3 | ✅ | 57.6M | ✅ | 28.4M | 🟢 **-51%** |
| const.json | const with object | 4 | ✅ | 37.5M | ✅ | 14.8M | 🟢 **-61%** |
| const.json | const with array | 3 | ✅ | 50.9M | ✅ | 15.9M | 🟢 **-69%** |
| const.json | const with null | 2 | ✅ | 68.0M | ✅ | 48.0M | 🟢 **-29%** |
| const.json | const with false does not match 0 | 3 | ✅ | 32.5M | ✅ | 39.2M | 🔴 **+21%** |
| const.json | const with true does not match 1 | 3 | ✅ | 62.2M | ✅ | 28.9M | 🟢 **-54%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 57.1M | ✅ | 25.6M | 🟢 **-55%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 26.0M | 🟢 **-54%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 53.5M | ✅ | 12.3M | 🟢 **-77%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.4M | ✅ | 12.8M | 🟢 **-76%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.1M | ✅ | 23.2M | 🟢 **-59%** |
| const.json | const with 1 does not match true | 3 | ✅ | 31.8M | ✅ | 43.9M | 🔴 **+38%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 32.8M | ✅ | 40.4M | 🔴 **+23%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.3M | ✅ | 42.7M | 🟢 **-33%** |
| const.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 47.0M | -18% |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.9M | ✅ | 42.3M | -6% |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.5M | ✅ | 46.6M | -16% |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ✅ | 8.0M | 🟢 **-85%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.6M | ✅ | 6.6M | 🟢 **-89%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.8M | ✅ | 45.9M | 🟢 **-27%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.5M | ✅ | 31.6M | 🟢 **-42%** |
| contains.json | items + contains | 4 | ✅ | 38.6M | ✅ | 7.1M | 🟢 **-82%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.8M | ✅ | 46.4M | 🟢 **-24%** |
| contains.json | contains with null instance elements | 1 | ✅ | 67.4M | ✅ | 65.2M | -3% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 79.9M | ✅ | 63.9M | 🟢 **-20%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 79.1M | ✅ | 64.6M | -18% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 70.1M | ✅ | 54.4M | 🟢 **-22%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 66.8M | ✅ | 55.3M | -17% |
| default.json | invalid type for default | 2 | ✅ | 59.6M | ✅ | 59.7M | +0% |
| default.json | invalid string value for default | 2 | ✅ | 49.8M | ✅ | 49.1M | -1% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 39.3M | ✅ | 44.2M | +12% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ✅ | 746K | 🟢 **-61%** |
| dependentRequired.json | single dependency | 7 | ✅ | 56.3M | ✅ | 49.9M | -11% |
| dependentRequired.json | empty dependents | 3 | ✅ | 68.1M | ✅ | 64.7M | -5% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.5M | ✅ | 33.4M | 🔴 **+26%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ✅ | 37.7M | -11% |
| dependentSchemas.json | single dependency | 8 | ✅ | 49.9M | ✅ | 42.4M | -15% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 48.0M | ✅ | 40.1M | -16% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.7M | ✅ | 29.6M | 🟢 **-21%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.0M | ✅ | 37.7M | +5% |
| enum.json | simple enum validation | 2 | ✅ | 75.9M | ✅ | 50.8M | 🟢 **-33%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.9M | ✅ | 11.4M | 🟢 **-73%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.7M | ✅ | 44.7M | 🟢 **-29%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 35.0M | 🔴 **+140%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 51.6M | -14% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 39.5M | 🟢 **-37%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 20.0M | 🟢 **-64%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 62.9M | ✅ | 39.1M | 🟢 **-38%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.3M | ✅ | 19.2M | 🟢 **-65%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.3M | ✅ | 51.7M | -16% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.5M | ✅ | 22.5M | 🟢 **-62%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 32.3M | ✅ | 43.7M | 🔴 **+35%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.4M | ✅ | 21.3M | 🟢 **-63%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 40.0M | 🟢 **-30%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ✅ | 38.7M | 🟢 **-38%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.2M | ✅ | 40.6M | 🟢 **-29%** |
| format.json | email format | 6 | ✅ | 74.3M | ✅ | 55.8M | 🟢 **-25%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ✅ | 55.6M | 🟢 **-30%** |
| format.json | regex format | 6 | ✅ | 74.3M | ✅ | 55.6M | 🟢 **-25%** |
| format.json | ipv4 format | 6 | ✅ | 66.6M | ✅ | 55.7M | -16% |
| format.json | ipv6 format | 6 | ✅ | 66.5M | ✅ | 55.2M | -17% |
| format.json | idn-hostname format | 6 | ✅ | 63.4M | ✅ | 55.6M | -12% |
| format.json | hostname format | 6 | ✅ | 66.5M | ✅ | 55.8M | -16% |
| format.json | date format | 6 | ✅ | 66.5M | ✅ | 55.3M | -17% |
| format.json | date-time format | 6 | ✅ | 66.5M | ✅ | 54.6M | -18% |
| format.json | time format | 6 | ✅ | 66.4M | ✅ | 55.7M | -16% |
| format.json | json-pointer format | 6 | ✅ | 66.4M | ✅ | 55.7M | -16% |
| format.json | relative-json-pointer format | 6 | ✅ | 66.5M | ✅ | 55.6M | -16% |
| format.json | iri format | 6 | ✅ | 66.5M | ✅ | 55.7M | -16% |
| format.json | iri-reference format | 6 | ✅ | 66.5M | ✅ | 55.7M | -16% |
| format.json | uri format | 6 | ✅ | 66.6M | ✅ | 55.8M | -16% |
| format.json | uri-reference format | 6 | ✅ | 66.5M | ✅ | 55.5M | -16% |
| format.json | uri-template format | 6 | ✅ | 66.7M | ✅ | 55.6M | -17% |
| format.json | uuid format | 6 | ✅ | 66.6M | ✅ | 55.3M | -17% |
| format.json | duration format | 6 | ✅ | 66.6M | ✅ | 53.8M | -19% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 72.3M | ✅ | 68.4M | -5% |
| if-then-else.json | ignore then without if | 2 | ✅ | 72.3M | ✅ | 68.6M | -5% |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.3M | ✅ | 68.7M | -5% |
| if-then-else.json | if and then without else | 3 | ✅ | 66.5M | ✅ | 42.7M | 🟢 **-36%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.5M | ✅ | 38.2M | 🟢 **-43%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ✅ | 36.1M | 🟢 **-43%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.2M | ✅ | 68.3M | -5% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.2M | ✅ | 48.9M | 🟢 **-26%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.6M | ✅ | 48.5M | 🟢 **-24%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 29.6M | 🟢 **-24%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.9M | ✅ | 37.3M | -9% |
| items.json | a schema given for items | 4 | ✅ | 48.3M | ✅ | 39.6M | -18% |
| items.json | an array of schemas for items | 6 | ✅ | 60.6M | ✅ | 51.0M | -16% |
| items.json | items with boolean schema (true) | 2 | ✅ | 65.6M | ✅ | 68.2M | +4% |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.9M | ✅ | 43.3M | 🟢 **-31%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ✅ | 49.1M | -15% |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 20.7M | 🔴 **+62%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 11.8M | -4% |
| items.json | single-form items with null instance ... | 1 | ✅ | 65.9M | ✅ | 67.3M | +2% |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.2M | ✅ | 68.3M | -3% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 78.8M | ✅ | 68.7M | -13% |
| maxContains.json | maxContains with contains | 5 | ✅ | 61.9M | ✅ | 27.3M | 🟢 **-56%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 58.7M | ✅ | 45.0M | 🟢 **-23%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.7M | ✅ | 36.7M | 🟢 **-32%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 46.8M | 🟢 **-31%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 47.3M | 🟢 **-26%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.1M | ✅ | 46.0M | -14% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 43.5M | -15% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.4M | ✅ | 43.1M | -18% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.7M | ✅ | 34.8M | 🟢 **-24%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.8M | ✅ | 35.5M | -17% |
| maximum.json | maximum validation | 4 | ✅ | 66.9M | ✅ | 47.3M | 🟢 **-29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 47.6M | 🟢 **-28%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 79.1M | ✅ | 68.9M | -13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.3M | ✅ | 35.5M | 🟢 **-40%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.6M | ✅ | 29.0M | 🟢 **-48%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.8M | ✅ | 44.4M | 🟢 **-25%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 53.0M | ✅ | 38.0M | 🟢 **-28%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 49.2M | ✅ | 38.9M | 🟢 **-21%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 79.1M | ✅ | 69.0M | -13% |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 61.2M | ✅ | 44.6M | 🟢 **-27%** |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 47.5M | 🟢 **-30%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 48.8M | 🟢 **-23%** |
| minLength.json | minLength validation | 5 | ✅ | 52.0M | ✅ | 43.8M | -16% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 43.4M | -15% |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 42.2M | 🟢 **-21%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.2M | ✅ | 33.6M | 🟢 **-27%** |
| minimum.json | minimum validation | 4 | ✅ | 66.9M | ✅ | 47.2M | 🟢 **-29%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.1M | ✅ | 48.2M | 🟢 **-24%** |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ✅ | 43.8M | 🟢 **-35%** |
| multipleOf.json | by number | 3 | ✅ | 64.3M | ✅ | 42.6M | 🟢 **-34%** |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 37.1M | 🟢 **-37%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 8.8M | 🟢 **-83%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ✅ | 9.1M | 🟢 **-86%** |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 43.7M | 🟢 **-35%** |
| not.json | not multiple types | 3 | ✅ | 62.0M | ✅ | 37.6M | 🟢 **-39%** |
| not.json | not more complex schema | 3 | ✅ | 60.0M | ✅ | 39.1M | 🟢 **-35%** |
| not.json | forbidden property | 2 | ✅ | 47.2M | ✅ | 43.2M | -8% |
| not.json | forbid everything with empty schema | 9 | ✅ | 52.0M | ✅ | 38.2M | 🟢 **-26%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ✅ | 38.8M | 🟢 **-30%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.7M | ✅ | 54.7M | 🟢 **-28%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 73.1M | -5% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.7M | ✅ | 24.0M | 🟢 **-24%** |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 21.6M | 🟢 **-64%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.8M | ✅ | 23.6M | 🟢 **-32%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.9M | ✅ | 37.1M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 25.0M | 🟢 **-67%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 37.2M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.3M | ✅ | 18.6M | 🟢 **-68%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 17.2M | 🟢 **-58%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.0M | ✅ | 39.8M | 🟢 **-40%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.0M | ✅ | 16.6M | 🟢 **-62%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 19.7M | 🟢 **-56%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 28.2M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 50.8M | ✅ | 41.4M | -18% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.1M | ✅ | 31.0M | 🔴 **+29%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 11.3M | 🟢 **-56%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 6.1M | 🟢 **-59%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 7.7M | 🟢 **-52%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ✅ | 5.6M | 🟢 **-72%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 17.9M | +2% |
| properties.json | object properties validation | 6 | ✅ | 50.5M | ✅ | 43.1M | -15% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 9.1M | 🟢 **-53%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ✅ | 39.1M | -12% |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 43.1M | -6% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 60.1M | -3% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.8M | ✅ | 29.8M | 🟢 **-21%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 13.8M | 🟢 **-28%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 68.6M | -13% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.7M | ✅ | 28.9M | 🟢 **-38%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 32.0M | -14% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.1M | ✅ | 26.2M | 🟢 **-33%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.3M | ✅ | 19.3M | 🔴 **+45%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ✅ | 1.9M | 🟢 **-68%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 2.5M | -17% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.7M | ✅ | 1.9M | 🟢 **-84%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.8M | ✅ | 1.9M | 🟢 **-84%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ✅ | 1.3M | 🟢 **-83%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.9M | ✅ | 4.3M | +10% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ✅ | 3.8M | -8% |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 18.5M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.5M | ✅ | 43.8M | -8% |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 18.5M | 🟢 **-65%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 39.4M | -8% |
| ref.json | nested refs | 2 | ✅ | 37.0M | ✅ | 49.9M | 🔴 **+35%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.7M | ✅ | 37.0M | -9% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ✅ | 2.3M | 🟢 **-28%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.3M | ✅ | 43.8M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.6M | ✅ | 44.1M | -9% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ✅ | 74.7M | -3% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ✅ | 40.8M | 🟢 **-30%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 7.2M | -13% |
| ref.json | refs with quote | 2 | ✅ | 47.5M | ✅ | 44.5M | -6% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.4M | ✅ | 33.4M | 🔴 **+32%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.3M | ✅ | 14.0M | 🟢 **-73%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.9M | ✅ | 49.0M | +7% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.3M | ✅ | 46.9M | +2% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 64.4M | ✅ | 47.8M | 🟢 **-26%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 34.9M | ✅ | 42.2M | 🔴 **+21%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ✅ | 22.7M | 🟢 **-40%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ✅ | 43.3M | -8% |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.0M | ✅ | 43.8M | -7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.6M | ✅ | 43.4M | -3% |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.3M | ✅ | 43.6M | -2% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.6M | ✅ | 43.9M | -4% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ✅ | 44.2M | +0% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.0M | ✅ | 47.2M | +1% |
| ref.json | ref to then | 2 | ✅ | 47.1M | ✅ | 39.8M | -16% |
| ref.json | ref to else | 2 | ✅ | 44.9M | ✅ | 47.7M | +6% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.0M | ✅ | 48.9M | +4% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.2M | ✅ | 47.0M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 49.8M | 🟢 **-25%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 50.0M | -17% |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ✅ | 16.2M | 🔴 **+249%** |
| refRemote.json | remote ref | 2 | ✅ | 45.5M | ✅ | 48.2M | +6% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.3M | ✅ | 49.1M | +6% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 44.1M | ✅ | 50.0M | +13% |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.8M | ✅ | 48.2M | +8% |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ✅ | 27.9M | +2% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.2M | ✅ | 27.2M | -13% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.5M | ✅ | 27.2M | 🟢 **-21%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ✅ | 10.4M | 🟢 **-66%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.7M | ✅ | 36.4M | -13% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.1M | ✅ | 41.8M | -11% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.1M | ✅ | 30.7M | 🟢 **-27%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 47.0M | ✅ | 42.0M | -11% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.1M | ✅ | 42.1M | -11% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.9M | ✅ | 41.9M | +8% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 44.8M | ✅ | 41.8M | -7% |
| required.json | required validation | 5 | ✅ | 57.6M | ✅ | 49.2M | -15% |
| required.json | required default validation | 1 | ✅ | 76.8M | ✅ | 74.0M | -4% |
| required.json | required with empty array | 1 | ✅ | 76.4M | ✅ | 70.4M | -8% |
| required.json | required with escaped characters | 2 | ✅ | 46.6M | ✅ | 38.3M | -18% |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 53.8M | ✅ | 38.0M | 🟢 **-29%** |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 43.1M | 🟢 **-28%** |
| type.json | string type matches strings | 9 | ✅ | 59.3M | ✅ | 45.4M | 🟢 **-24%** |
| type.json | object type matches objects | 7 | ✅ | 52.8M | ✅ | 36.9M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 55.3M | ✅ | 40.0M | 🟢 **-28%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 38.3M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 54.2M | ✅ | 36.0M | 🟢 **-34%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.0M | ✅ | 37.8M | 🟢 **-34%** |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 50.7M | 🟢 **-24%** |
| type.json | type: array or object | 5 | ✅ | 58.0M | ✅ | 40.4M | 🟢 **-30%** |
| type.json | type: array, object or null | 5 | ✅ | 61.9M | ✅ | 43.3M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.3M | ✅ | 68.7M | -4% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.6M | ✅ | 47.2M | -12% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.5M | ✅ | 43.2M | -7% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 62.1M | ✅ | 62.5M | +1% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.4M | ✅ | 47.1M | -3% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 68.7M | ✅ | 66.9M | -3% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.2M | ✅ | 37.4M | -9% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 38.6M | ✅ | 38.1M | -1% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.9M | ✅ | 44.5M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 70.6M | ✅ | 62.5M | -11% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 64.2M | 🔴 **+217%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ✅ | 25.1M | 🔴 **+112%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.0M | ✅ | 27.6M | 🔴 **+84%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 37.7M | ✅ | 37.6M | 0% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ✅ | 27.6M | 🔴 **+151%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 51.0M | ✅ | 46.0M | -10% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.0M | ✅ | 42.4M | -6% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.6M | ✅ | 43.4M | -7% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ✅ | 9.5M | 🔴 **+331%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.1M | ✅ | 40.1M | -5% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ✅ | 30.3M | 🔴 **+28%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 64.0M | ✅ | 54.5M | -15% |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 66.1M | ✅ | 66.2M | +0% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.2M | ✅ | 36.9M | -6% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.1M | ✅ | 62.4M | +20% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ✅ | 15.9M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.9M | ✅ | 39.3M | +19% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ✅ | 36.9M | +20% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ✅ | 12.4M | +9% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 61.2M | ✅ | 59.3M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.0M | ✅ | 29.8M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 8.7M | -8% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.2M | ✅ | 58.1M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.1M | ✅ | 60.2M | 🔴 **+100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.7M | ✅ | 11.9M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.2M | ✅ | 13.5M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.8M | ✅ | 29.4M | +18% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ✅ | 17.6M | 0% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ✅ | 18.9M | +5% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.2M | ✅ | 25.1M | -8% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ✅ | 25.5M | -19% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.1M | ✅ | 17.5M | 🟢 **-40%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.0M | ✅ | 33.9M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ✅ | 10.5M | 🔴 **+242%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.8M | ✅ | 34.0M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.3M | ✅ | 33.5M | 🔴 **+27%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ✅ | 58.9M | 🔴 **+86%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.1M | ✅ | 56.0M | 🔴 **+99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.8M | ✅ | 30.5M | 🔴 **+23%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ✅ | 35.4M | 🔴 **+35%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.2M | ✅ | 29.3M | 🔴 **+45%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ✅ | 36.3M | 🔴 **+202%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.4M | ✅ | 23.7M | -10% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.3M | ✅ | 31.6M | +8% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 42.9M | ✅ | 18.9M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.0M | ✅ | 12.7M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 15.8M | -18% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 5.4M | 🟢 **-25%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.5M | ✅ | 55.5M | -16% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.7M | ✅ | 46.9M | -2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 12.9M | ✅ | 11.9M | -8% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 6.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ✅ | 27.1M | 🔴 **+28%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ✅ | 29.2M | 🔴 **+22%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 7.2M | 🟢 **-58%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.1M | ✅ | 20.5M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 24.2M | 🔴 **+32%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.2M | ✅ | 54.0M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 54.0M | -15% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.3M | ✅ | 49.1M | -17% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 67.0M | ✅ | 47.8M | 🟢 **-29%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 53.8M | ✅ | 10.6M | 🟢 **-80%** |
| optional/bignum.json | integer | 2 | ✅ | 74.9M | ✅ | 14.2M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 68.5M | -10% |
| optional/bignum.json | string | 1 | ✅ | 56.5M | ✅ | 39.8M | 🟢 **-30%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 66.4M | -3% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 38.8M | 🟢 **-28%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 67.6M | -2% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 38.6M | 🟢 **-28%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 57.1M | ✅ | 49.4M | -14% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 80.0M | ✅ | 64.7M | -19% |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.1M | ✅ | 33.8M | +5% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.4M | ✅ | 35.8M | -19% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.5M | ✅ | 42.4M | -14% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 54.8M | ✅ | 41.2M | 🟢 **-25%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.5M | ✅ | 30.8M | 🟢 **-20%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.7M | ✅ | 27.4M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.5M | ✅ | 27.7M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 28.6M | +8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 27.9M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 22.0M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 28.5M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.9M | ✅ | 27.5M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.6M | ✅ | 27.7M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 30.0M | +20% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 24.0M | -17% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 17.1M | +3% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 13.6M | -8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 14.0M | -6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.4M | ✅ | 26.8M | +2% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.9M | ✅ | 20.5M | +3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 22.4M | -1% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ✅ | 20.1M | +3% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.3M | ✅ | 20.7M | +7% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 10.1M | 🔴 **+28%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ✅ | 9.0M | +10% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.3M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ✅ | 7.9M | -7% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 22.1M | +20% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ✅ | 78K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.7M | ✅ | 31.0M | 🟢 **-24%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-76%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.7M | ✅ | 25.4M | -17% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 897K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ✅ | 30.6M | 🟢 **-20%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ✅ | 5.4M | -16% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.4M | ✅ | 54.9M | 🟢 **-27%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 9.2M | -5% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ✅ | 15.5M | -5% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.4M | 🟢 **-30%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 14.2M | -7% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.3M | ✅ | 12.0M | 🟢 **-63%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 55.0M | ✅ | 45.0M | -18% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 26.7M | -8% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ✅ | 6.8M | 🟢 **-60%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 47.6M | ✅ | 43.7M | -8% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 47.6M | ✅ | 43.5M | -9% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 43.6M | -8% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.1M | ✅ | 50.0M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.6M | ✅ | 43.5M | -12% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.9M | ✅ | 31.0M | -13% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 22.3M | 0% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 17.1M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.3M | ✅ | 13.6M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ✅ | 73.1M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.8M | ✅ | 8.2M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 46.3M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.2M | ✅ | 10.2M | 🟢 **-59%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 30.5M | -3% |
| allOf.json | allOf | 4 | ✅ | 39.8M | ✅ | 35.4M | -11% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 10.2M | 🟢 **-65%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 46.6M | 🟢 **-36%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 72.3M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 40.2M | 🟢 **-39%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 40.1M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 74.4M | -8% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 74.0M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 48.0M | 🟢 **-38%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 47.8M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 62.1M | ✅ | 47.9M | 🟢 **-23%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.5M | ✅ | 4.5M | 🟢 **-95%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 46.3M | 🟢 **-40%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.2M | ✅ | 47.6M | 🟢 **-45%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 51.0M | ✅ | 48.1M | -6% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ✅ | 49.6M | 🟢 **-36%** |
| anyOf.json | anyOf | 4 | ✅ | 79.7M | ✅ | 25.4M | 🟢 **-68%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 40.0M | ✅ | 19.6M | 🟢 **-51%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 73.9M | -18% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.7M | ✅ | 73.3M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 21.0M | 🟢 **-68%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 19.8M | 🟢 **-61%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 57.0M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 27.4M | 🟢 **-65%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 55.2M | 🟢 **-30%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.6M | ✅ | 32.1M | 🟢 **-50%** |
| const.json | const validation | 3 | ✅ | 67.4M | ✅ | 38.6M | 🟢 **-43%** |
| const.json | const with object | 4 | ✅ | 41.2M | ✅ | 14.7M | 🟢 **-64%** |
| const.json | const with array | 3 | ✅ | 57.8M | ✅ | 16.6M | 🟢 **-71%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 50.0M | 🟢 **-37%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 39.3M | 🟢 **-48%** |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 38.4M | 🟢 **-50%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.1M | ✅ | 23.2M | 🟢 **-65%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.6M | ✅ | 24.9M | 🟢 **-63%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.6M | ✅ | 12.6M | 🟢 **-81%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.4M | ✅ | 12.3M | 🟢 **-82%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 43.7M | 🟢 **-31%** |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 44.1M | 🟢 **-40%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.7M | ✅ | 41.4M | 🟢 **-43%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.1M | ✅ | 42.5M | 🟢 **-42%** |
| const.json | nul characters in strings | 2 | ✅ | 50.0M | ✅ | 46.9M | -6% |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 45.4M | 🟢 **-22%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 46.7M | 🟢 **-29%** |
| contains.json | contains keyword validation | 6 | ✅ | 64.5M | ✅ | 14.8M | 🟢 **-77%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.5M | ✅ | 13.6M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 45.8M | 🟢 **-36%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.1M | ✅ | 32.5M | 🟢 **-54%** |
| contains.json | items + contains | 4 | ✅ | 42.2M | ✅ | 7.1M | 🟢 **-83%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.8M | ✅ | 47.6M | 🟢 **-31%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 65.5M | -15% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.0M | ✅ | 65.2M | 🟢 **-32%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 78.9M | ✅ | 55.8M | 🟢 **-29%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.4M | ✅ | 63.7M | 🟢 **-24%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 77.5M | ✅ | 55.9M | 🟢 **-28%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 59.5M | -17% |
| default.json | invalid string value for default | 2 | ✅ | 54.9M | ✅ | 49.2M | -10% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 35.7M | 🟢 **-36%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ✅ | 831K | 🟢 **-61%** |
| dependentRequired.json | single dependency | 7 | ✅ | 64.6M | ✅ | 49.0M | 🟢 **-24%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 63.8M | 🟢 **-34%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ✅ | 34.1M | 🔴 **+21%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.0M | ✅ | 38.7M | 🟢 **-21%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 54.5M | ✅ | 41.9M | 🟢 **-23%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.6M | ✅ | 41.1M | 🟢 **-25%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.0M | ✅ | 31.0M | 🟢 **-22%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ✅ | 38.5M | +0% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ✅ | 17.9M | +11% |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ✅ | 10.0M | 🔴 **+61%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 49.5M | 🟢 **-34%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.1M | ✅ | 10.8M | 🟢 **-77%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.6M | ✅ | 44.3M | 🟢 **-34%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 35.8M | 🔴 **+140%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 49.2M | 🟢 **-39%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 39.5M | 🟢 **-48%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 20.4M | 🟢 **-69%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 39.4M | 🟢 **-48%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 20.7M | 🟢 **-69%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 43.4M | 🟢 **-42%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 22.8M | 🟢 **-67%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.8M | ✅ | 43.6M | 🟢 **-40%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.9M | ✅ | 22.3M | 🟢 **-64%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 42.4M | 🟢 **-35%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 40.7M | 🟢 **-43%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.3M | ✅ | 40.8M | 🟢 **-37%** |
| format.json | email format | 7 | ✅ | 95.9M | ✅ | 55.9M | 🟢 **-42%** |
| format.json | idn-email format | 7 | ✅ | 92.4M | ✅ | 54.8M | 🟢 **-41%** |
| format.json | regex format | 7 | ✅ | 78.2M | ✅ | 55.4M | 🟢 **-29%** |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ✅ | 55.3M | 🟢 **-29%** |
| format.json | ipv6 format | 7 | ✅ | 78.4M | ✅ | 54.8M | 🟢 **-30%** |
| format.json | idn-hostname format | 7 | ✅ | 78.7M | ✅ | 55.2M | 🟢 **-30%** |
| format.json | hostname format | 7 | ✅ | 78.4M | ✅ | 55.2M | 🟢 **-30%** |
| format.json | date format | 7 | ✅ | 78.4M | ✅ | 54.6M | 🟢 **-30%** |
| format.json | date-time format | 7 | ✅ | 77.8M | ✅ | 55.4M | 🟢 **-29%** |
| format.json | time format | 7 | ✅ | 78.5M | ✅ | 55.3M | 🟢 **-30%** |
| format.json | json-pointer format | 7 | ✅ | 95.5M | ✅ | 55.8M | 🟢 **-42%** |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ✅ | 55.9M | 🟢 **-29%** |
| format.json | iri format | 7 | ✅ | 78.5M | ✅ | 55.0M | 🟢 **-30%** |
| format.json | iri-reference format | 7 | ✅ | 78.5M | ✅ | 55.9M | 🟢 **-29%** |
| format.json | uri format | 7 | ✅ | 78.4M | ✅ | 55.4M | 🟢 **-29%** |
| format.json | uri-reference format | 7 | ✅ | 78.4M | ✅ | 52.6M | 🟢 **-33%** |
| format.json | uri-template format | 7 | ✅ | 78.3M | ✅ | 56.0M | 🟢 **-29%** |
| format.json | uuid format | 7 | ✅ | 78.4M | ✅ | 55.3M | 🟢 **-29%** |
| format.json | duration format | 7 | ✅ | 78.4M | ✅ | 54.2M | 🟢 **-31%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 68.8M | -18% |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.8M | ✅ | 68.7M | 🟢 **-27%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ✅ | 68.6M | -18% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ✅ | 41.2M | 🟢 **-47%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ✅ | 35.3M | 🟢 **-54%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.6M | ✅ | 37.1M | 🟢 **-48%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 68.3M | -19% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 50.2M | 🟢 **-34%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 48.1M | 🟢 **-36%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ✅ | 32.3M | 🟢 **-23%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.5M | ✅ | 34.4M | 🟢 **-23%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 43.3M | 🟢 **-20%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 68.1M | 🟢 **-27%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 43.5M | 🟢 **-40%** |
| items.json | items and subitems | 6 | ✅ | 12.7M | ✅ | 16.9M | 🔴 **+33%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 11.8M | -3% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 43.1M | ✅ | 49.2M | +14% |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.5M | ✅ | 39.0M | -16% |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.8M | ✅ | 37.2M | -17% |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 45.5M | 🟢 **-38%** |
| items.json | items with null instance elements | 1 | ✅ | 74.9M | ✅ | 67.0M | -11% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 68.0M | 🟢 **-28%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.6M | ✅ | 30.8M | 🟢 **-48%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 44.7M | 🟢 **-32%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.4M | ✅ | 36.9M | 🟢 **-38%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.3M | ✅ | 48.3M | 🟢 **-40%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 47.4M | 🟢 **-35%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.4M | ✅ | 37.3M | 🟢 **-36%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 43.6M | 🟢 **-23%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 42.5M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 34.1M | 🟢 **-32%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 32.4M | 🟢 **-37%** |
| maximum.json | maximum validation | 4 | ✅ | 76.5M | ✅ | 47.6M | 🟢 **-38%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.1M | ✅ | 47.9M | 🟢 **-35%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 68.8M | 🟢 **-27%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.8M | ✅ | 35.9M | 🟢 **-46%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.1M | ✅ | 29.3M | 🟢 **-50%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ✅ | 44.9M | 🟢 **-32%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.5M | ✅ | 35.9M | 🟢 **-41%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.5M | ✅ | 38.4M | 🟢 **-33%** |
| minContains.json | minContains = 0 | 2 | ✅ | 93.9M | ✅ | 66.9M | 🟢 **-29%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 67.5M | ✅ | 44.8M | 🟢 **-34%** |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 48.0M | 🟢 **-39%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 47.3M | 🟢 **-35%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 43.9M | 🟢 **-25%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.2M | ✅ | 43.5M | 🟢 **-22%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.6M | ✅ | 42.5M | 🟢 **-25%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.0M | ✅ | 33.3M | 🟢 **-35%** |
| minimum.json | minimum validation | 4 | ✅ | 78.6M | ✅ | 47.1M | 🟢 **-40%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.2M | ✅ | 47.8M | 🟢 **-33%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 43.8M | 🟢 **-44%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 42.9M | 🟢 **-42%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 40.7M | 🟢 **-39%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 8.7M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 9.2M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 43.4M | 🟢 **-44%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 37.8M | 🟢 **-47%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 39.3M | 🟢 **-43%** |
| not.json | forbidden property | 2 | ✅ | 53.9M | ✅ | 43.9M | -18% |
| not.json | forbid everything with empty schema | 9 | ✅ | 65.2M | ✅ | 39.3M | 🟢 **-40%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 64.1M | ✅ | 32.7M | 🟢 **-49%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 54.0M | 🟢 **-40%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 73.3M | -19% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.1M | ✅ | 24.0M | 🟢 **-25%** |
| oneOf.json | oneOf | 4 | ✅ | 67.0M | ✅ | 22.5M | 🟢 **-66%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 22.7M | 🟢 **-34%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 34.9M | 🟢 **-47%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 24.3M | 🟢 **-73%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 37.0M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 18.4M | 🟢 **-72%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.8M | ✅ | 18.4M | 🟢 **-59%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 36.5M | 🟢 **-52%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 16.8M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 20.3M | 🟢 **-59%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.2M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 55.6M | ✅ | 41.1M | 🟢 **-26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 29.6M | 🔴 **+109%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 11.2M | 🟢 **-56%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 6.1M | 🟢 **-59%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 7.7M | 🟢 **-49%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.3M | ✅ | 5.7M | 🟢 **-70%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 17.8M | -1% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.3M | ✅ | 49.1M | 🟢 **-28%** |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ✅ | 50.1M | 🟢 **-23%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 61.6M | 🟢 **-24%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 68.4M | -15% |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 44.5M | 🟢 **-21%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 9.3M | 🟢 **-53%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 41.1M | -17% |
| properties.json | properties with escaped characters | 2 | ✅ | 52.6M | ✅ | 43.7M | -17% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.6M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.0M | ✅ | 30.4M | 🟢 **-26%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 14.0M | 🟢 **-30%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 69.0M | 🟢 **-26%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ✅ | 22.3M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ✅ | 25.4M | 🟢 **-37%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 34.2M | 🟢 **-20%** |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 19.5M | 🟢 **-21%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.1M | ✅ | 43.7M | 🟢 **-21%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 44.2M | 🟢 **-23%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 40.3M | -14% |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 48.0M | 🔴 **+25%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.2M | ✅ | 37.2M | -16% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ✅ | 2.1M | 🟢 **-40%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.2M | ✅ | 43.9M | -16% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.4M | ✅ | 43.7M | -17% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 73.9M | -18% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 40.3M | 🟢 **-39%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 7.1M | -17% |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ✅ | 45.2M | -16% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.1M | ✅ | 33.4M | +19% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 14.4M | 🟢 **-75%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.6M | ✅ | 48.6M | -2% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.6M | ✅ | 46.7M | -6% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ✅ | 46.8M | 🟢 **-36%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ✅ | 42.2M | +11% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ✅ | 22.0M | 🟢 **-47%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.0M | ✅ | 43.7M | -16% |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ✅ | 43.9M | -18% |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.5M | ✅ | 40.7M | -18% |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ✅ | 38.9M | 🟢 **-23%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ✅ | 39.7M | -18% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.9M | ✅ | 43.4M | -15% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.0M | ✅ | 30.3M | 🟢 **-39%** |
| ref.json | ref to then | 2 | ✅ | 49.8M | ✅ | 45.2M | -9% |
| ref.json | ref to else | 2 | ✅ | 48.0M | ✅ | 45.7M | -5% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.0M | ✅ | 44.7M | -9% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 48.1M | 🟢 **-38%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 47.4M | 🟢 **-38%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 47.4M | 🟢 **-33%** |
| refRemote.json | remote ref | 2 | ✅ | 45.6M | ✅ | 48.3M | +6% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.0M | ✅ | 48.2M | +0% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.4M | ✅ | 48.2M | 0% |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.8M | ✅ | 49.5M | +2% |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ✅ | 26.2M | -10% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.3M | ✅ | 27.5M | -17% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ✅ | 27.5M | 🟢 **-27%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ✅ | 11.5M | 🟢 **-64%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 40.8M | ✅ | 36.9M | -10% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.3M | ✅ | 41.9M | -17% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.1M | ✅ | 29.4M | 🟢 **-36%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.1M | ✅ | 41.4M | -17% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.1M | ✅ | 42.0M | -16% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.4M | ✅ | 41.6M | +9% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ✅ | 41.7M | -10% |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 48.7M | 🟢 **-25%** |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 73.7M | -18% |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 74.0M | -18% |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ✅ | 37.5M | 🟢 **-31%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.4M | ✅ | 40.5M | 🟢 **-39%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 42.4M | 🟢 **-39%** |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 44.8M | 🟢 **-35%** |
| type.json | object type matches objects | 7 | ✅ | 59.1M | ✅ | 39.6M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 41.0M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 43.8M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 42.3M | 🟢 **-36%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.5M | ✅ | 38.1M | 🟢 **-43%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 49.6M | 🟢 **-35%** |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 42.8M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 46.7M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 68.6M | -17% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.1M | ✅ | 47.9M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ✅ | 42.6M | -18% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 62.6M | -11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.2M | ✅ | 46.0M | -18% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 66.8M | -15% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 41.9M | -9% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.7M | ✅ | 44.0M | -10% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 63.5M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 63.4M | 🔴 **+211%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ✅ | 26.6M | 🔴 **+110%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ✅ | 21.6M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.9M | ✅ | 37.0M | -9% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 24.4M | 🔴 **+116%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ✅ | 47.6M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.4M | ✅ | 43.1M | -18% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 51.8M | ✅ | 43.4M | -16% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.4M | ✅ | 32.7M | 🟢 **-30%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.5M | ✅ | 30.0M | 🔴 **+23%** |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 54.9M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 62.2M | -17% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.1M | ✅ | 36.9M | -12% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 67.5M | +16% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.4M | ✅ | 15.6M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.5M | ✅ | 40.0M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.2M | ✅ | 36.3M | +16% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ✅ | 12.7M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 68.5M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 13.5M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ✅ | 30.6M | +6% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.2M | ✅ | 8.9M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 68.9M | ✅ | 58.1M | -16% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 59.1M | 🔴 **+107%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.6M | ✅ | 11.9M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.8M | ✅ | 13.6M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ✅ | 29.2M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.6M | ✅ | 16.8M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.2M | ✅ | 19.4M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ✅ | 25.1M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ✅ | 36.6M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.3M | ✅ | 30.7M | +8% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ✅ | 33.1M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ✅ | 33.5M | +11% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.5M | ✅ | 33.8M | +11% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ✅ | 58.8M | 🔴 **+97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 59.8M | 🔴 **+110%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ✅ | 29.8M | +14% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ✅ | 36.0M | 🔴 **+29%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.3M | ✅ | 28.9M | 🔴 **+43%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ✅ | 36.1M | 🔴 **+211%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.5M | ✅ | 23.2M | -9% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ✅ | 34.5M | +6% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.8M | ✅ | 18.6M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 13.0M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 14.3M | 🟢 **-29%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 5.4M | 🟢 **-24%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.5M | ✅ | 55.2M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 47.0M | -10% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ✅ | 12.6M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ✅ | 27.2M | 🔴 **+28%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ✅ | 29.2M | +20% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 7.2M | 🟢 **-60%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ✅ | 21.7M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ✅ | 24.6M | 🟢 **-46%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 54.3M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.0M | ✅ | 54.2M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.2M | ✅ | 48.2M | 🟢 **-27%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 50.0M | 🟢 **-35%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ✅ | 11.0M | 🟢 **-83%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 13.8M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 67.7M | 🟢 **-24%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 39.6M | 🟢 **-38%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 65.5M | -17% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 35.5M | 🟢 **-41%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.7M | -14% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 38.1M | 🟢 **-36%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 48.9M | 🟢 **-25%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 65.6M | 🟢 **-32%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.5M | ✅ | 33.7M | -2% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ✅ | 39.5M | -19% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 42.9M | 🟢 **-23%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 41.2M | 🟢 **-33%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.2M | ✅ | 31.4M | 🟢 **-24%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.1M | ✅ | 27.3M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.6M | ✅ | 26.6M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 26.9M | -5% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 26.8M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 27.1M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 27.6M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 27.1M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 27.1M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 35.1M | ✅ | 29.4M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 23.8M | 🟢 **-22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 17.4M | +2% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 14.1M | -8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 13.7M | -9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.4M | ✅ | 26.6M | -6% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ✅ | 23.1M | +6% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ✅ | 23.1M | -1% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 20.6M | +2% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ✅ | 21.4M | +11% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.0M | +14% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 9.6M | +17% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ✅ | 7.8M | -8% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.9M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ✅ | 74K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.3M | ✅ | 30.7M | 🟢 **-29%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ✅ | 25.1M | 🟢 **-23%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.6M | ✅ | 910K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ✅ | 29.6M | 🟢 **-29%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.9M | ✅ | 5.5M | 🟢 **-20%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.3M | ✅ | 55.5M | 🟢 **-42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 9.1M | -8% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ✅ | 15.1M | -10% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-33%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 14.7M | -3% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ✅ | 12.0M | 🟢 **-68%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.8M | ✅ | 45.3M | 🟢 **-31%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 23.4M | 🟢 **-24%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ✅ | 6.8M | 🟢 **-61%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.2M | ✅ | 42.3M | 🟢 **-23%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.0M | ✅ | 41.9M | 🟢 **-24%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.6M | ✅ | 43.3M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 49.1M | 🟢 **-36%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 31.0M | 🟢 **-43%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |
