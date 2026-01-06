# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.2M | 172/199 | 13.0M | 172 | 🟢 **-54%** |
| draft6 | 276 | ✅ 276 | 30.2M | 269/276 | 15.2M | 269 | 🟢 **-50%** |
| draft7 | 313 | ✅ 313 | 16.5M | 296/313 | 13.2M | 296 | 🟢 **-20%** |
| draft2019-09 | 435 | ✅ 435 | 20.2M | 413/435 | 6.5M | 413 | 🟢 **-68%** |
| draft2020-12 | 448 | ✅ 448 | 20.5M | 398/448 | 6.8M | 398 | 🟢 **-67%** |
| **Total** | 1671 | 1670/1671 | 21.1M | 1548/1671 | 8.9M | 1548 | 🟢 **-58%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **3.19x faster** (35 ns vs 112 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 7.3M | 0% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 142.6M | ✅ | 74.2M | 🟢 **-48%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 139.1M | ✅ | 44.7M | 🟢 **-68%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 68.7M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.3M | ✅ | 66.3M | 🟢 **-47%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.5M | ✅ | 27.9M | 🟢 **-40%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.9M | ✅ | 37.5M | 🟢 **-36%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 48.3M | 🟢 **-34%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.6M | ✅ | 74.1M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 50.6M | ✅ | 32.3M | 🟢 **-36%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 41.9M | ✅ | 23.4M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.1M | ✅ | 16.9M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.5M | ✅ | 13.5M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 75.0M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 7.3M | 🟢 **-78%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 44.5M | -15% |
| allOf.json | allOf | 4 | ✅ | 48.3M | ✅ | 35.7M | 🟢 **-26%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.4M | ✅ | 10.5M | 🟢 **-62%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 40.3M | 🟢 **-63%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.2M | ✅ | 68.8M | 🟢 **-56%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 157.6M | ✅ | 73.8M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 50.2M | 🟢 **-35%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 49.2M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 50.1M | 🟢 **-36%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 134.1M | ✅ | 10.2M | 🟢 **-92%** |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ✅ | 25.3M | 🟢 **-69%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 47.7M | ✅ | 22.9M | 🟢 **-52%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.9M | ✅ | 32.6M | 🟢 **-36%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.0M | ✅ | 69.0M | 🟢 **-60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 27.6M | 🟢 **-65%** |
| default.json | invalid type for default | 2 | ✅ | 107.4M | ✅ | 59.6M | 🟢 **-44%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 49.0M | -11% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.6M | ✅ | 44.5M | 🟢 **-43%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.9M | ✅ | 49.5M | 🟢 **-46%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.4M | ✅ | 32.9M | -4% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.2M | ✅ | 39.7M | 🟢 **-32%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ✅ | 21.5M | 🔴 **+86%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.9M | ✅ | 37.3M | 🟢 **-20%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 50.9M | 🟢 **-32%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 17.9M | 🟢 **-70%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 45.3M | 🟢 **-39%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 33.6M | 🔴 **+125%** |
| enum.json | enum with escaped characters | 3 | ✅ | 61.7M | ✅ | 44.2M | 🟢 **-28%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.7M | ✅ | 38.3M | 🟢 **-66%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 23.9M | 🟢 **-64%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.6M | ✅ | 39.4M | 🟢 **-65%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 26.8M | 🟢 **-59%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 52.0M | 🟢 **-52%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.3M | ✅ | 28.4M | 🟢 **-58%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 43.9M | 🟢 **-61%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.5M | ✅ | 27.8M | 🟢 **-59%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 46.1M | 🟢 **-50%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 44.9M | 🟢 **-23%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 47.8M | 🟢 **-49%** |
| format.json | email format | 6 | ✅ | 92.3M | ✅ | 55.4M | 🟢 **-40%** |
| format.json | ipv4 format | 6 | ✅ | 160.1M | ✅ | 55.1M | 🟢 **-66%** |
| format.json | ipv6 format | 6 | ✅ | 92.6M | ✅ | 55.6M | 🟢 **-40%** |
| format.json | hostname format | 6 | ✅ | 149.2M | ✅ | 53.0M | 🟢 **-64%** |
| format.json | date-time format | 6 | ✅ | 92.4M | ✅ | 55.1M | 🟢 **-40%** |
| format.json | uri format | 6 | ✅ | 162.5M | ✅ | 55.6M | 🟢 **-66%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 37.3M | -17% |
| items.json | a schema given for items | 4 | ✅ | 81.6M | ✅ | 42.6M | 🟢 **-48%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.1M | ✅ | 49.0M | 🟢 **-28%** |
| items.json | items and subitems | 6 | ✅ | 28.4M | ✅ | 21.1M | 🟢 **-26%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 11.9M | -2% |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 67.3M | -11% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.8M | ✅ | 68.2M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 48.1M | 🟢 **-41%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.5M | ✅ | 48.5M | 🟢 **-22%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 42.2M | 🟢 **-28%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.9M | ✅ | 35.5M | 🟢 **-30%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 47.5M | 🟢 **-38%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 48.4M | 🟢 **-36%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 78.5M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 76.1M | ✅ | 48.8M | 🟢 **-36%** |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ✅ | 44.6M | 🟢 **-23%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 42.9M | 🟢 **-28%** |
| minimum.json | minimum validation | 4 | ✅ | 77.0M | ✅ | 47.3M | 🟢 **-39%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 77.0M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 48.0M | 🟢 **-34%** |
| multipleOf.json | by int | 3 | ✅ | 66.1M | ✅ | 43.7M | 🟢 **-34%** |
| multipleOf.json | by number | 3 | ✅ | 58.6M | ✅ | 42.8M | 🟢 **-27%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 40.7M | 🟢 **-39%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 8.5M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ✅ | 9.1M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 43.8M | 🟢 **-43%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 37.4M | 🟢 **-47%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 40.0M | 🟢 **-41%** |
| not.json | forbidden property | 2 | ✅ | 53.2M | ✅ | 44.0M | -17% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.0M | ✅ | 38.8M | 🟢 **-35%** |
| not.json | double negation | 1 | ✅ | 157.2M | ✅ | 74.0M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 21.0M | 🟢 **-69%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.1M | ✅ | 24.8M | 🟢 **-33%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 21.8M | 🟢 **-48%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 39.7M | 🟢 **-48%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.5M | ✅ | 17.0M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 22.5M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.0M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 44.6M | -19% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.1M | ✅ | 31.0M | 🔴 **+29%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 13.7M | 🟢 **-50%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.0M | ✅ | 7.9M | 🟢 **-44%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ✅ | 7.9M | 🟢 **-52%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.5M | +19% |
| properties.json | object properties validation | 6 | ✅ | 56.3M | ✅ | 44.6M | 🟢 **-21%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.1M | ✅ | 10.6M | 🟢 **-44%** |
| properties.json | properties with escaped characters | 2 | ✅ | 48.9M | ✅ | 43.8M | -11% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.7M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.8M | ✅ | 21.0M | -18% |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.3M | ✅ | 43.8M | -16% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 44.8M | 🟢 **-25%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 39.8M | -16% |
| ref.json | nested refs | 2 | ✅ | 39.7M | ✅ | 47.9M | 🔴 **+21%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.6M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.2M | ✅ | 43.8M | -13% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ✅ | 44.6M | -19% |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.6M | ✅ | 44.7M | -18% |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.7M | ✅ | 17.5M | 🟢 **-69%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 76.9M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 48.6M | 🟢 **-37%** |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ✅ | 49.3M | -2% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.7M | ✅ | 48.0M | -5% |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.6M | ✅ | 40.9M | -17% |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.7M | ✅ | 47.8M | 🟢 **-26%** |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 74.1M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 53.0M | ✅ | 19.3M | 🟢 **-64%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ✅ | 36.0M | 🟢 **-44%** |
| type.json | number type matches numbers | 9 | ✅ | 68.6M | ✅ | 43.3M | 🟢 **-37%** |
| type.json | string type matches strings | 9 | ✅ | 85.9M | ✅ | 40.5M | 🟢 **-53%** |
| type.json | object type matches objects | 7 | ✅ | 58.6M | ✅ | 31.9M | 🟢 **-46%** |
| type.json | array type matches arrays | 7 | ✅ | 59.8M | ✅ | 40.2M | 🟢 **-33%** |
| type.json | boolean type matches booleans | 10 | ✅ | 86.3M | ✅ | 35.2M | 🟢 **-59%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.7M | ✅ | 27.2M | 🟢 **-59%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 36.8M | 🟢 **-44%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 48.6M | 🟢 **-37%** |
| type.json | type: array or object | 5 | ✅ | 66.3M | ✅ | 40.5M | 🟢 **-39%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 44.3M | 🟢 **-43%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 6.3M | 🟢 **-63%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.1M | ✅ | 19.2M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 25.2M | 🔴 **+34%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 54.5M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.4M | ✅ | 47.3M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 76.8M | ✅ | 48.3M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 14.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 66.9M | 🟢 **-25%** |
| optional/bignum.json | string | 1 | ✅ | 62.9M | ✅ | 34.7M | 🟢 **-45%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 66.7M | -16% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 39.5M | 🟢 **-50%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 63.6M | ✅ | 27.2M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 27.6M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 24.1M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 26.8M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.2M | ✅ | 25.9M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 28.7M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 26.8M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.9M | ✅ | 27.6M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 29.5M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.9M | ✅ | 24.9M | 🟢 **-22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.9M | ✅ | 17.2M | -13% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 13.9M | -8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.5M | -9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ✅ | 26.6M | -10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ✅ | 22.0M | +4% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ✅ | 22.9M | +3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.8M | ✅ | 19.9M | -4% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ✅ | 21.3M | +1% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 9.3M | +16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 9.2M | +5% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.4M | ✅ | 2.8M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ✅ | 22.6M | +19% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.1M | ✅ | 28.6M | 🟢 **-25%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ✅ | 2.8M | 🟢 **-84%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 55.0M | 🟢 **-43%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.2M | 🟢 **-35%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 24.4M | ✅ | 25.9M | +6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 14.4M | ✅ | 8.4M | 🟢 **-42%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 53.4M | 🔴 **+633%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.7M | ✅ | 34.5M | -8% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ✅ | 74.7M | 🟢 **-53%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 38.0M | ✅ | 52.1M | 🔴 **+37%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.8M | ✅ | 68.3M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 76.9M | ✅ | 66.8M | -13% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ✅ | 26.9M | 🟢 **-51%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.5M | ✅ | 37.4M | -8% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 48.8M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 74.6M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 59.3M | ✅ | 22.8M | 🟢 **-62%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 16.3M | ✅ | 23.1M | 🔴 **+42%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 16.7M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.6M | ✅ | 8.4M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 74.1M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.6M | ✅ | 7.5M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.4M | ✅ | 47.0M | 🟢 **-31%** |
| allOf.json | allOf | 4 | ✅ | 38.7M | ✅ | 12.1M | 🟢 **-69%** |
| allOf.json | allOf with base schema | 5 | ✅ | 22.0M | ✅ | 26.7M | 🔴 **+21%** |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 42.3M | 🟢 **-39%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 72.3M | 🟢 **-55%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.4M | ✅ | 40.2M | 🟢 **-37%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.1M | ✅ | 39.9M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 74.1M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 74.4M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.2M | ✅ | 49.2M | 🟢 **-33%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 48.6M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 50.3M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 134.0M | ✅ | 9.7M | 🟢 **-93%** |
| anyOf.json | anyOf | 4 | ✅ | 75.9M | ✅ | 25.6M | 🟢 **-66%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.3M | ✅ | 20.2M | 🟢 **-60%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 74.5M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 74.3M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 20.1M | 🟢 **-68%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 73.1M | ✅ | 27.2M | 🟢 **-63%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.9M | ✅ | 67.0M | 🟢 **-61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 27.5M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.2M | ✅ | 44.4M | 🟢 **-76%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 38.8M | 🟢 **-57%** |
| const.json | const validation | 3 | ✅ | 64.2M | ✅ | 38.7M | 🟢 **-40%** |
| const.json | const with object | 4 | ✅ | 50.0M | ✅ | 15.2M | 🟢 **-70%** |
| const.json | const with array | 3 | ✅ | 56.4M | ✅ | 16.8M | 🟢 **-70%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 49.1M | 🟢 **-59%** |
| const.json | const with false does not match 0 | 3 | ✅ | 72.2M | ✅ | 39.9M | 🟢 **-45%** |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 39.7M | 🟢 **-65%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 26.7M | 🟢 **-58%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 88.2M | ✅ | 26.6M | 🟢 **-70%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.6M | ✅ | 12.5M | 🟢 **-81%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ✅ | 12.4M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ✅ | 42.5M | 🟢 **-30%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 49.4M | 🟢 **-56%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.3M | ✅ | 40.9M | 🟢 **-41%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.7M | ✅ | 42.8M | 🟢 **-61%** |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 46.6M | 🟢 **-25%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 45.6M | 🟢 **-42%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.5M | ✅ | 46.8M | 🟢 **-26%** |
| contains.json | contains keyword validation | 6 | ✅ | 99.3M | ✅ | 12.4M | 🟢 **-87%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.4M | ✅ | 14.2M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 48.2M | 🟢 **-54%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.8M | ✅ | 32.7M | 🟢 **-52%** |
| contains.json | items + contains | 4 | ✅ | 50.7M | ✅ | 7.8M | 🟢 **-85%** |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 66.1M | -10% |
| default.json | invalid type for default | 2 | ✅ | 107.3M | ✅ | 58.4M | 🟢 **-46%** |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 49.2M | -7% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.3M | ✅ | 45.8M | 🟢 **-40%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.5M | ✅ | 1.3M | 🟢 **-88%** |
| dependencies.json | dependencies | 7 | ✅ | 91.7M | ✅ | 30.0M | 🟢 **-67%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.8M | ✅ | 64.6M | 🟢 **-63%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ✅ | 36.3M | -9% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.2M | ✅ | 37.9M | -18% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.0M | ✅ | 39.8M | 🟢 **-54%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ✅ | 22.2M | 🔴 **+95%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.5M | ✅ | 38.8M | -15% |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 49.2M | 🟢 **-31%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 11.5M | 🟢 **-81%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.4M | ✅ | 43.2M | 🟢 **-40%** |
| enum.json | enums in properties | 6 | ✅ | 15.9M | ✅ | 35.5M | 🔴 **+123%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.5M | ✅ | 45.2M | 🟢 **-41%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.8M | ✅ | 32.4M | 🟢 **-71%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.6M | ✅ | 20.9M | 🟢 **-67%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 38.7M | 🟢 **-65%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 62.1M | ✅ | 20.4M | 🟢 **-67%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 45.1M | 🟢 **-61%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 22.6M | 🟢 **-66%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 43.8M | 🟢 **-61%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.0M | ✅ | 22.4M | 🟢 **-66%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 44.9M | 🟢 **-51%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ✅ | 40.1M | 🟢 **-41%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.8M | ✅ | 40.4M | 🟢 **-63%** |
| format.json | email format | 6 | ✅ | 87.1M | ✅ | 54.3M | 🟢 **-38%** |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ✅ | 54.5M | 🟢 **-66%** |
| format.json | ipv6 format | 6 | ✅ | 87.1M | ✅ | 40.9M | 🟢 **-53%** |
| format.json | hostname format | 6 | ✅ | 161.1M | ✅ | 55.2M | 🟢 **-66%** |
| format.json | date-time format | 6 | ✅ | 87.3M | ✅ | 55.3M | 🟢 **-37%** |
| format.json | json-pointer format | 6 | ✅ | 160.4M | ✅ | 55.4M | 🟢 **-65%** |
| format.json | uri format | 6 | ✅ | 86.7M | ✅ | 54.7M | 🟢 **-37%** |
| format.json | uri-reference format | 6 | ✅ | 162.0M | ✅ | 53.0M | 🟢 **-67%** |
| format.json | uri-template format | 6 | ✅ | 87.3M | ✅ | 55.4M | 🟢 **-37%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 58.1M | ✅ | 33.1M | 🟢 **-43%** |
| items.json | a schema given for items | 4 | ✅ | 52.6M | ✅ | 43.4M | -17% |
| items.json | an array of schemas for items | 6 | ✅ | 106.0M | ✅ | 39.6M | 🟢 **-63%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 68.7M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 43.3M | 🟢 **-59%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.1M | ✅ | 41.4M | 🟢 **-33%** |
| items.json | items and subitems | 6 | ✅ | 28.5M | ✅ | 18.4M | 🟢 **-35%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 11.4M | -7% |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 67.1M | -7% |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 68.2M | -12% |
| maxItems.json | maxItems validation | 4 | ✅ | 75.0M | ✅ | 48.0M | 🟢 **-36%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 46.5M | 🟢 **-33%** |
| maxLength.json | maxLength validation | 5 | ✅ | 60.1M | ✅ | 45.5M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.5M | ✅ | 41.2M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ✅ | 26.8M | 🟢 **-52%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.3M | ✅ | 32.0M | 🟢 **-34%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 32.6M | 🟢 **-34%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 47.3M | 🟢 **-35%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 47.7M | 🟢 **-28%** |
| minItems.json | minItems validation | 4 | ✅ | 81.7M | ✅ | 48.1M | 🟢 **-41%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 48.1M | 🟢 **-31%** |
| minLength.json | minLength validation | 5 | ✅ | 55.5M | ✅ | 44.5M | -20% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 43.0M | 🟢 **-24%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ✅ | 42.6M | 🟢 **-26%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ✅ | 32.4M | 🟢 **-34%** |
| minimum.json | minimum validation | 4 | ✅ | 73.4M | ✅ | 46.9M | 🟢 **-36%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.1M | ✅ | 46.3M | 🟢 **-33%** |
| multipleOf.json | by int | 3 | ✅ | 74.1M | ✅ | 43.7M | 🟢 **-41%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 42.8M | 🟢 **-39%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 40.4M | 🟢 **-37%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 9.0M | 🟢 **-84%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 8.2M | 🟢 **-89%** |
| not.json | not | 2 | ✅ | 73.4M | ✅ | 43.0M | 🟢 **-41%** |
| not.json | not multiple types | 3 | ✅ | 53.8M | ✅ | 37.5M | 🟢 **-30%** |
| not.json | not more complex schema | 3 | ✅ | 65.6M | ✅ | 39.6M | 🟢 **-40%** |
| not.json | forbidden property | 2 | ✅ | 45.0M | ✅ | 44.0M | -2% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.3M | ✅ | 39.5M | 🟢 **-36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.3M | ✅ | 39.4M | 🟢 **-36%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.9M | ✅ | 55.0M | 🟢 **-69%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 73.6M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 53.8M | ✅ | 22.8M | 🟢 **-58%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 40.6M | ✅ | 26.4M | 🟢 **-35%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 34.7M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.0M | ✅ | 26.3M | 🟢 **-69%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 36.8M | 🟢 **-42%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 17.8M | 🟢 **-72%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 20.2M | 🟢 **-54%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 36.8M | 🟢 **-49%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ✅ | 20.6M | 🟢 **-56%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ✅ | 22.1M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.6M | ✅ | 28.4M | 🟢 **-61%** |
| pattern.json | pattern validation | 8 | ✅ | 54.4M | ✅ | 44.4M | -18% |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.4M | ✅ | 31.1M | 🔴 **+115%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ✅ | 14.1M | 🟢 **-47%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 7.5M | 🟢 **-50%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.4M | ✅ | 8.5M | 🟢 **-41%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ✅ | 8.5M | 🟢 **-56%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 21.2M | +19% |
| properties.json | object properties validation | 6 | ✅ | 53.1M | ✅ | 45.0M | -15% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 10.0M | 🟢 **-49%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ✅ | 40.7M | -15% |
| properties.json | properties with escaped characters | 2 | ✅ | 49.9M | ✅ | 43.7M | -12% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 60.7M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.8M | ✅ | 28.7M | 🟢 **-33%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 16.7M | -13% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 68.6M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.6M | ✅ | 29.0M | 🟢 **-42%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ✅ | 31.3M | -19% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.1M | ✅ | 34.1M | -17% |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 21.4M | -15% |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.8M | ✅ | 43.4M | -15% |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.9M | ✅ | 44.9M | 🟢 **-21%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.1M | ✅ | 40.2M | -13% |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 47.7M | 🔴 **+29%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ✅ | 4.9M | 🟢 **-80%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.4M | ✅ | 43.6M | -17% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.6M | ✅ | 43.3M | -14% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 68.2M | 🟢 **-57%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ✅ | 40.1M | 🟢 **-37%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 7.7M | -9% |
| ref.json | refs with quote | 2 | ✅ | 52.6M | ✅ | 44.6M | -15% |
| ref.json | Location-independent identifier | 2 | ✅ | 48.7M | ✅ | 47.8M | -2% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.5M | ✅ | 40.9M | -17% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.0M | ✅ | 47.4M | -1% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ✅ | 14.6M | 🟢 **-73%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.6M | ✅ | 33.6M | 0% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.5M | ✅ | 32.0M | -4% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.8M | ✅ | 24.0M | 🟢 **-41%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.8M | ✅ | 44.1M | -16% |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.7M | ✅ | 43.8M | -14% |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.7M | ✅ | 43.6M | -14% |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ✅ | 43.9M | -13% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 52.4M | ✅ | 43.7M | -17% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.0M | ✅ | 42.9M | +5% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.7M | ✅ | 48.3M | +4% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 48.8M | 🟢 **-34%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 46.6M | 🟢 **-37%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 44.2M | 🟢 **-40%** |
| refRemote.json | remote ref | 2 | ✅ | 49.1M | ✅ | 44.2M | -10% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.6M | ✅ | 47.4M | -3% |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.5M | ✅ | 46.8M | -4% |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ✅ | 28.1M | -3% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.8M | ✅ | 27.8M | -15% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.4M | ✅ | 27.6M | 🟢 **-28%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ✅ | 12.5M | 🟢 **-60%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.5M | ✅ | 37.1M | -6% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.5M | ✅ | 41.5M | +8% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.7M | ✅ | 26.7M | 🟢 **-40%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.1M | ✅ | 42.2M | +3% |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 49.0M | 🟢 **-21%** |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 74.4M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 74.3M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 50.1M | ✅ | 37.2M | 🟢 **-26%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 62.9M | ✅ | 38.3M | 🟢 **-39%** |
| type.json | number type matches numbers | 9 | ✅ | 66.3M | ✅ | 43.9M | 🟢 **-34%** |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 46.1M | 🟢 **-29%** |
| type.json | object type matches objects | 7 | ✅ | 56.7M | ✅ | 40.1M | 🟢 **-29%** |
| type.json | array type matches arrays | 7 | ✅ | 61.3M | ✅ | 40.9M | 🟢 **-33%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 44.0M | 🟢 **-30%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.0M | ✅ | 41.9M | 🟢 **-32%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.8M | ✅ | 37.6M | 🟢 **-40%** |
| type.json | type as array with one item | 2 | ✅ | 73.2M | ✅ | 48.7M | 🟢 **-33%** |
| type.json | type: array or object | 5 | ✅ | 68.6M | ✅ | 38.9M | 🟢 **-43%** |
| type.json | type: array, object or null | 5 | ✅ | 73.0M | ✅ | 46.5M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 10.5M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.8M | ✅ | 22.7M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ✅ | 27.3M | 🔴 **+50%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 54.3M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.6M | ✅ | 51.2M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ✅ | 49.2M | 🟢 **-23%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 14.2M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 68.8M | -18% |
| optional/bignum.json | string | 1 | ✅ | 60.7M | ✅ | 40.0M | 🟢 **-34%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 67.9M | -10% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 38.3M | 🟢 **-34%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 68.0M | -10% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 38.9M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 69.6M | ✅ | 27.8M | 🟢 **-60%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.9M | ✅ | 27.5M | -5% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 27.4M | -5% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.9M | ✅ | 27.5M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.4M | ✅ | 27.6M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 29.2M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 27.4M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.9M | ✅ | 27.8M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 29.8M | +11% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.4M | ✅ | 24.9M | 🟢 **-21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 18.2M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 13.9M | -6% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 14.2M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.9M | ✅ | 27.1M | -6% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.3M | ✅ | 23.0M | +3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 23.3M | +1% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.5M | ✅ | 19.8M | +7% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 21.8M | +14% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 8.9M | +6% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.8M | +2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.8M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ✅ | 22.3M | +19% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 42.9M | ✅ | 31.0M | 🟢 **-28%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ✅ | 2.8M | 🟢 **-84%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.0M | ✅ | 25.0M | 🟢 **-22%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ✅ | 55.7M | 🟢 **-33%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 9.3M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ✅ | 15.3M | -10% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.4M | 🟢 **-31%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.9M | ✅ | 14.7M | 🟢 **-60%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 46.3M | ✅ | 10.0M | 🟢 **-78%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 45.9M | ✅ | 9.7M | 🟢 **-79%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ✅ | 27.1M | -10% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ✅ | 8.5M | 🟢 **-49%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.8M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.9M | ✅ | 7.4M | 🟢 **-71%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.2M | ✅ | 34.2M | -8% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ✅ | 73.8M | 🟢 **-54%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 36.8M | ✅ | 49.7M | 🔴 **+35%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 161.3M | ✅ | 67.8M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 64.8M | -20% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.1M | ✅ | 26.7M | 🟢 **-52%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 37.6M | -12% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 48.0M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 73.9M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 30.1M | 🟢 **-29%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 16.5M | ✅ | 23.1M | 🔴 **+40%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.7M | ✅ | 17.0M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 12.5M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 74.1M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 13.8M | ✅ | 8.1M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 35.0M | ✅ | 46.4M | 🔴 **+33%** |
| allOf.json | allOf | 4 | ✅ | 40.6M | ✅ | 12.4M | 🟢 **-69%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 26.6M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 59.4M | ✅ | 45.9M | 🟢 **-23%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 73.7M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.6M | ✅ | 40.0M | 🟢 **-39%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 39.3M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 74.2M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 73.8M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 49.3M | 🟢 **-36%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 48.4M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 47.8M | 🟢 **-39%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ✅ | 5.0M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ✅ | 26.7M | 🟢 **-67%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ✅ | 20.3M | 🟢 **-60%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 66.1M | 🟢 **-59%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 74.0M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 19.6M | 🟢 **-70%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.5M | ✅ | 32.6M | 🟢 **-55%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 68.5M | 🟢 **-60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 27.5M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.1M | ✅ | 55.3M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.6M | ✅ | 38.4M | 🟢 **-58%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 36.7M | 🟢 **-45%** |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 14.7M | 🟢 **-70%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 14.8M | 🟢 **-75%** |
| const.json | const with null | 2 | ✅ | 118.8M | ✅ | 47.9M | 🟢 **-60%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.6M | ✅ | 39.6M | 🟢 **-48%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.3M | ✅ | 39.5M | 🟢 **-65%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ✅ | 25.1M | 🟢 **-62%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 25.0M | 🟢 **-74%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.8M | ✅ | 12.3M | 🟢 **-82%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.6M | ✅ | 12.2M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 39.1M | 🟢 **-38%** |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 31.6M | 🟢 **-70%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 71.1M | ✅ | 33.9M | 🟢 **-52%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.2M | ✅ | 41.0M | 🟢 **-64%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 45.9M | 🟢 **-29%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 77.9M | ✅ | 42.6M | 🟢 **-45%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 47.1M | 🟢 **-29%** |
| contains.json | contains keyword validation | 6 | ✅ | 99.4M | ✅ | 19.0M | 🟢 **-81%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 69.0M | ✅ | 13.2M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 44.0M | 🟢 **-58%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ✅ | 31.0M | 🟢 **-57%** |
| contains.json | items + contains | 4 | ✅ | 51.6M | ✅ | 7.0M | 🟢 **-86%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.8M | ✅ | 39.4M | 🟢 **-43%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 65.5M | 🟢 **-47%** |
| default.json | invalid type for default | 2 | ✅ | 71.4M | ✅ | 58.3M | -18% |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 48.3M | 🟢 **-35%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 57.3M | ✅ | 43.3M | 🟢 **-24%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ✅ | 1.4M | 🟢 **-89%** |
| dependencies.json | dependencies | 7 | ✅ | 65.1M | ✅ | 48.8M | 🟢 **-25%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.1M | ✅ | 63.7M | 🟢 **-64%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.3M | ✅ | 33.9M | -1% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ✅ | 38.4M | -18% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 61.3M | ✅ | 37.1M | 🟢 **-39%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ✅ | 20.9M | 🔴 **+81%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.3M | ✅ | 38.0M | -1% |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 36.7M | 🟢 **-51%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ✅ | 11.0M | 🟢 **-77%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ✅ | 26.8M | 🟢 **-64%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 35.1M | 🔴 **+142%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 44.0M | 🟢 **-45%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.0M | ✅ | 39.2M | 🟢 **-46%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 20.2M | 🟢 **-70%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 36.8M | 🟢 **-51%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.3M | ✅ | 20.2M | 🟢 **-70%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 73.5M | ✅ | 32.7M | 🟢 **-56%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.4M | ✅ | 22.2M | 🟢 **-68%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.5M | ✅ | 43.4M | 🟢 **-41%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 21.4M | 🟢 **-69%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 42.4M | 🟢 **-35%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ✅ | 40.2M | 🟢 **-43%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.9M | ✅ | 40.1M | 🟢 **-43%** |
| format.json | email format | 6 | ✅ | 92.1M | ✅ | 55.1M | 🟢 **-40%** |
| format.json | idn-email format | 6 | ✅ | 92.5M | ✅ | 54.7M | 🟢 **-41%** |
| format.json | regex format | 6 | ✅ | 92.5M | ✅ | 54.6M | 🟢 **-41%** |
| format.json | ipv4 format | 6 | ✅ | 92.6M | ✅ | 55.2M | 🟢 **-40%** |
| format.json | ipv6 format | 6 | ✅ | 92.8M | ✅ | 55.4M | 🟢 **-40%** |
| format.json | idn-hostname format | 6 | ✅ | 93.2M | ✅ | 55.3M | 🟢 **-41%** |
| format.json | hostname format | 6 | ✅ | 92.6M | ✅ | 55.2M | 🟢 **-40%** |
| format.json | date format | 6 | ✅ | 92.5M | ✅ | 54.7M | 🟢 **-41%** |
| format.json | date-time format | 6 | ✅ | 92.7M | ✅ | 54.5M | 🟢 **-41%** |
| format.json | time format | 6 | ✅ | 92.6M | ✅ | 55.2M | 🟢 **-40%** |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ✅ | 55.2M | 🟢 **-40%** |
| format.json | relative-json-pointer format | 6 | ✅ | 92.5M | ✅ | 55.3M | 🟢 **-40%** |
| format.json | iri format | 6 | ✅ | 92.7M | ✅ | 55.3M | 🟢 **-40%** |
| format.json | iri-reference format | 6 | ✅ | 92.6M | ✅ | 55.2M | 🟢 **-40%** |
| format.json | uri format | 6 | ✅ | 91.9M | ✅ | 54.4M | 🟢 **-41%** |
| format.json | uri-reference format | 6 | ✅ | 92.4M | ✅ | 55.5M | 🟢 **-40%** |
| format.json | uri-template format | 6 | ✅ | 92.9M | ✅ | 55.4M | 🟢 **-40%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 166.8M | ✅ | 68.8M | 🟢 **-59%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.1M | ✅ | 67.7M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 67.4M | 🟢 **-61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ✅ | 41.7M | 🟢 **-46%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ✅ | 36.3M | 🟢 **-52%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 70.6M | ✅ | 36.2M | 🟢 **-49%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 65.9M | 🟢 **-62%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.0M | ✅ | 40.5M | 🟢 **-47%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 47.0M | 🟢 **-38%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ✅ | 32.2M | 🟢 **-23%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.9M | ✅ | 37.9M | -5% |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 43.0M | 🟢 **-21%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.5M | ✅ | 49.8M | 🟢 **-26%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 69.0M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.5M | ✅ | 43.7M | 🟢 **-39%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.6M | ✅ | 43.5M | 🟢 **-34%** |
| items.json | items and subitems | 6 | ✅ | 27.7M | ✅ | 21.6M | 🟢 **-22%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 11.3M | -5% |
| items.json | single-form items with null instance ... | 1 | ✅ | 60.9M | ✅ | 48.2M | 🟢 **-21%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.8M | ✅ | 67.5M | -17% |
| maxItems.json | maxItems validation | 4 | ✅ | 80.6M | ✅ | 47.2M | 🟢 **-41%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 42.7M | 🟢 **-41%** |
| maxLength.json | maxLength validation | 5 | ✅ | 61.4M | ✅ | 47.5M | 🟢 **-23%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.4M | ✅ | 42.9M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.4M | ✅ | 42.4M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.9M | ✅ | 30.4M | 🟢 **-38%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.3M | ✅ | 34.6M | 🟢 **-31%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 47.0M | 🟢 **-39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.1M | ✅ | 47.6M | 🟢 **-37%** |
| minItems.json | minItems validation | 4 | ✅ | 78.5M | ✅ | 43.4M | 🟢 **-45%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.1M | ✅ | 47.2M | 🟢 **-32%** |
| minLength.json | minLength validation | 5 | ✅ | 57.4M | ✅ | 39.1M | 🟢 **-32%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 43.4M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.5M | ✅ | 42.5M | 🟢 **-29%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ✅ | 32.4M | 🟢 **-36%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 46.8M | 🟢 **-39%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 47.8M | 🟢 **-34%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 43.3M | 🟢 **-44%** |
| multipleOf.json | by number | 3 | ✅ | 71.1M | ✅ | 40.6M | 🟢 **-43%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 41.0M | 🟢 **-39%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 8.6M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 8.7M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 43.0M | 🟢 **-44%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 35.5M | 🟢 **-50%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 39.1M | 🟢 **-43%** |
| not.json | forbidden property | 2 | ✅ | 54.3M | ✅ | 43.2M | 🟢 **-20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.4M | ✅ | 39.0M | 🟢 **-35%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.2M | ✅ | 37.7M | 🟢 **-42%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.7M | ✅ | 54.5M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.4M | ✅ | 73.6M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 21.4M | 🟢 **-68%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 26.3M | 🟢 **-29%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 36.2M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 26.2M | 🟢 **-71%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 36.7M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 17.8M | 🟢 **-73%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 25.9M | 🟢 **-42%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 39.7M | 🟢 **-48%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ✅ | 16.5M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 22.6M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.2M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 55.6M | ✅ | 44.3M | 🟢 **-20%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.5M | ✅ | 30.7M | 🔴 **+112%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 13.8M | 🟢 **-50%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ✅ | 8.2M | 🟢 **-47%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ✅ | 8.3M | 🟢 **-51%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 8.0M | 🟢 **-62%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.5M | +19% |
| properties.json | object properties validation | 6 | ✅ | 55.5M | ✅ | 44.3M | 🟢 **-20%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 9.2M | 🟢 **-54%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.7M | ✅ | 39.2M | 🟢 **-21%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.0M | ✅ | 42.3M | -17% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.5M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.2M | ✅ | 28.3M | 🟢 **-39%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 16.7M | -16% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 67.2M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.2M | ✅ | 28.8M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.3M | ✅ | 30.8M | 🟢 **-24%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ✅ | 27.1M | 🟢 **-37%** |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 19.4M | 🟢 **-26%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.2M | ✅ | 41.6M | 🟢 **-25%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.9M | ✅ | 44.8M | 🟢 **-24%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 39.4M | -14% |
| ref.json | nested refs | 2 | ✅ | 40.0M | ✅ | 48.4M | 🔴 **+21%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.7M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 53.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ✅ | 4.2M | 🟢 **-83%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.4M | ✅ | 43.8M | 🟢 **-21%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 55.0M | ✅ | 43.5M | 🟢 **-21%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 73.5M | 🟢 **-54%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 65.3M | ✅ | 40.1M | 🟢 **-39%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 7.5M | -14% |
| ref.json | refs with quote | 2 | ✅ | 55.3M | ✅ | 44.4M | -20% |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ✅ | 47.6M | -6% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.2M | ✅ | 48.9M | -3% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.5M | ✅ | 49.2M | -3% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 13.3M | 🟢 **-77%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.0M | ✅ | 32.5M | -4% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.0M | ✅ | 31.4M | -8% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.0M | ✅ | 49.6M | -3% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ✅ | 24.1M | 🟢 **-45%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ✅ | 42.8M | 🟢 **-22%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.7M | ✅ | 43.5M | 🟢 **-20%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.8M | ✅ | 41.1M | 🟢 **-25%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 53.9M | ✅ | 43.4M | -19% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.4M | ✅ | 43.3M | 🟢 **-20%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.0M | ✅ | 43.1M | -2% |
| ref.json | ref to if | 2 | ✅ | 50.9M | ✅ | 47.0M | -8% |
| ref.json | ref to then | 2 | ✅ | 51.5M | ✅ | 48.1M | -6% |
| ref.json | ref to else | 2 | ✅ | 50.8M | ✅ | 48.7M | -4% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.7M | ✅ | 49.4M | -2% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 75.3M | ✅ | 49.2M | 🟢 **-35%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 49.5M | 🟢 **-36%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 49.8M | 🟢 **-35%** |
| refRemote.json | remote ref | 2 | ✅ | 51.7M | ✅ | 47.3M | -8% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.4M | ✅ | 45.2M | -10% |
| refRemote.json | ref within remote ref | 2 | ✅ | 50.6M | ✅ | 48.3M | -5% |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ✅ | 27.9M | -4% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ✅ | 27.1M | -19% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ✅ | 27.1M | 🟢 **-32%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.4M | ✅ | 11.6M | 🟢 **-65%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.7M | ✅ | 35.9M | -20% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.7M | ✅ | 39.8M | -9% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ✅ | 29.3M | 🟢 **-37%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.8M | ✅ | 41.1M | -2% |
| required.json | required validation | 5 | ✅ | 64.8M | ✅ | 48.7M | 🟢 **-25%** |
| required.json | required default validation | 1 | ✅ | 159.2M | ✅ | 74.3M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 74.3M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 52.4M | ✅ | 37.6M | 🟢 **-28%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 86.2M | ✅ | 40.7M | 🟢 **-53%** |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ✅ | 39.7M | 🟢 **-43%** |
| type.json | string type matches strings | 9 | ✅ | 69.0M | ✅ | 45.5M | 🟢 **-34%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 38.8M | 🟢 **-34%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 39.9M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.7M | ✅ | 42.7M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 36.4M | 🟢 **-45%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.0M | ✅ | 38.0M | 🟢 **-42%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 48.7M | 🟢 **-37%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 41.4M | 🟢 **-43%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 42.6M | 🟢 **-45%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 10.3M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 22.6M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 24.7M | 🔴 **+31%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 154.7M | ✅ | 54.2M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 52.5M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.2M | ✅ | 49.2M | 🟢 **-32%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 14.2M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 68.2M | 🟢 **-23%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 39.4M | 🟢 **-38%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.4M | -15% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 38.0M | 🟢 **-37%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.5M | -15% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 38.2M | 🟢 **-36%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 27.2M | 🟢 **-58%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 27.2M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 26.5M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 26.5M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 27.3M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 28.9M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 26.3M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 27.4M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 29.1M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 23.7M | 🟢 **-26%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 17.5M | +2% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 13.6M | -12% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.9M | ✅ | 14.4M | -10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 26.9M | -9% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ✅ | 23.2M | +18% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ✅ | 23.0M | -1% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 20.0M | -4% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 21.3M | +6% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.8M | 🔴 **+24%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 9.2M | +3% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.1M | ✅ | 7.8M | 🟢 **-71%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ✅ | 22.0M | +16% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ✅ | 30.6M | 🟢 **-20%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ✅ | 2.8M | 🟢 **-84%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 24.7M | 🟢 **-25%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.6M | ✅ | 908K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ✅ | 30.3M | 🟢 **-27%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ✅ | 5.5M | -18% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.3M | ✅ | 55.3M | 🟢 **-37%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 9.0M | -6% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ✅ | 15.5M | -5% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.3M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.8M | ✅ | 13.6M | 🟢 **-64%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.4M | ✅ | 37.4M | 🟢 **-37%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ✅ | 35.4M | 🟢 **-40%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 28.0M | -9% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ✅ | 8.1M | 🟢 **-51%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 7.1M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.2M | ✅ | 34.2M | -3% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.6M | ✅ | 59.7M | 🟢 **-63%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ✅ | 30.0M | 🟢 **-63%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.5M | ✅ | 69.6M | 🟢 **-59%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 37.1M | 🟢 **-54%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.9M | ✅ | 26.9M | 🟢 **-51%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.1M | ✅ | 34.7M | -19% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 45.6M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.7M | ✅ | 74.2M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.9M | ✅ | 32.9M | 🟢 **-48%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.1M | ✅ | 23.3M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 17.1M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ✅ | 13.3M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 74.4M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.4M | ✅ | 7.5M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 46.9M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.6M | ✅ | 10.6M | 🟢 **-64%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.4M | ✅ | 30.5M | -3% |
| allOf.json | allOf | 4 | ✅ | 40.9M | ✅ | 35.1M | -14% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 24.9M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 24.6M | 🟢 **-66%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 74.2M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 39.1M | 🟢 **-41%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 40.1M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 147.2M | ✅ | 74.1M | 🟢 **-50%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 73.9M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 49.7M | 🟢 **-36%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 48.3M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 49.0M | 🟢 **-38%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.7M | ✅ | 4.8M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ✅ | 44.9M | 🟢 **-42%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.2M | ✅ | 50.3M | 🟢 **-41%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.5M | ✅ | 48.7M | -4% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ✅ | 50.9M | 🟢 **-44%** |
| anyOf.json | anyOf | 4 | ✅ | 79.9M | ✅ | 27.6M | 🟢 **-66%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.0M | ✅ | 19.5M | 🟢 **-50%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 74.2M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 73.9M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 78.4M | ✅ | 20.2M | 🟢 **-74%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.9M | ✅ | 19.3M | 🟢 **-62%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 170.0M | ✅ | 56.1M | 🟢 **-67%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 27.7M | 🟢 **-65%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 177.2M | ✅ | 55.5M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.8M | ✅ | 39.2M | 🟢 **-35%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 38.6M | 🟢 **-42%** |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 15.3M | 🟢 **-63%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 15.9M | 🟢 **-73%** |
| const.json | const with null | 2 | ✅ | 78.8M | ✅ | 50.1M | 🟢 **-36%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 40.2M | 🟢 **-47%** |
| const.json | const with true does not match 1 | 3 | ✅ | 76.0M | ✅ | 39.6M | 🟢 **-48%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 27.0M | 🟢 **-59%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.1M | ✅ | 26.3M | 🟢 **-60%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.1M | ✅ | 12.9M | 🟢 **-81%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.6M | ✅ | 12.5M | 🟢 **-81%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 62.8M | ✅ | 43.6M | 🟢 **-31%** |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 50.0M | 🟢 **-32%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.1M | ✅ | 41.6M | 🟢 **-43%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 42.6M | 🟢 **-42%** |
| const.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 46.5M | 🟢 **-28%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 45.4M | 🟢 **-22%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.5M | ✅ | 46.4M | 🟢 **-29%** |
| contains.json | contains keyword validation | 6 | ✅ | 64.7M | ✅ | 14.3M | 🟢 **-78%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.4M | ✅ | 14.5M | 🟢 **-77%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.5M | ✅ | 47.6M | 🟢 **-33%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.3M | ✅ | 29.4M | 🟢 **-58%** |
| contains.json | items + contains | 4 | ✅ | 41.5M | ✅ | 8.1M | 🟢 **-81%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 48.0M | 🟢 **-30%** |
| contains.json | contains with null instance elements | 1 | ✅ | 76.6M | ✅ | 66.4M | -13% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 174.8M | ✅ | 55.7M | 🟢 **-68%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.1M | ✅ | 65.0M | 🟢 **-63%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 95.5M | ✅ | 59.1M | 🟢 **-38%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 181.7M | ✅ | 55.4M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 50.4M | ✅ | 59.3M | +18% |
| default.json | invalid string value for default | 2 | ✅ | 49.4M | ✅ | 49.2M | 0% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.5M | ✅ | 44.2M | -16% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ✅ | 784K | 🟢 **-58%** |
| dependentRequired.json | single dependency | 7 | ✅ | 63.7M | ✅ | 49.0M | 🟢 **-23%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.8M | ✅ | 63.9M | 🟢 **-63%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.4M | ✅ | 34.9M | 🔴 **+23%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ✅ | 38.5M | -19% |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.4M | ✅ | 42.6M | 🟢 **-23%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.1M | ✅ | 41.6M | 🟢 **-20%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ✅ | 30.4M | 🟢 **-27%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.6M | ✅ | 39.4M | +2% |
| enum.json | simple enum validation | 2 | ✅ | 69.6M | ✅ | 41.0M | 🟢 **-41%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ✅ | 10.6M | 🟢 **-78%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.7M | ✅ | 45.1M | 🟢 **-37%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 36.3M | 🔴 **+150%** |
| enum.json | enum with escaped characters | 3 | ✅ | 40.8M | ✅ | 46.8M | +15% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.2M | ✅ | 39.3M | 🟢 **-46%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 64.4M | ✅ | 21.1M | 🟢 **-67%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.2M | ✅ | 39.0M | 🟢 **-35%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ✅ | 20.7M | 🟢 **-68%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 72.0M | ✅ | 46.3M | 🟢 **-36%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.8M | ✅ | 22.1M | 🟢 **-63%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.6M | ✅ | 44.0M | 🟢 **-38%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 66.1M | ✅ | 22.4M | 🟢 **-66%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 46.0M | 🟢 **-29%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 64.9M | ✅ | 40.6M | 🟢 **-37%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 62.3M | ✅ | 41.5M | 🟢 **-33%** |
| format.json | email format | 6 | ✅ | 144.9M | ✅ | 55.4M | 🟢 **-62%** |
| format.json | idn-email format | 6 | ✅ | 179.1M | ✅ | 54.8M | 🟢 **-69%** |
| format.json | regex format | 6 | ✅ | 180.5M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | ipv4 format | 6 | ✅ | 179.5M | ✅ | 54.8M | 🟢 **-69%** |
| format.json | ipv6 format | 6 | ✅ | 179.5M | ✅ | 55.8M | 🟢 **-69%** |
| format.json | idn-hostname format | 6 | ✅ | 180.5M | ✅ | 55.5M | 🟢 **-69%** |
| format.json | hostname format | 6 | ✅ | 180.5M | ✅ | 55.1M | 🟢 **-69%** |
| format.json | date format | 6 | ✅ | 176.7M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | date-time format | 6 | ✅ | 170.5M | ✅ | 55.5M | 🟢 **-67%** |
| format.json | time format | 6 | ✅ | 179.4M | ✅ | 55.2M | 🟢 **-69%** |
| format.json | json-pointer format | 6 | ✅ | 180.8M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | relative-json-pointer format | 6 | ✅ | 180.9M | ✅ | 55.4M | 🟢 **-69%** |
| format.json | iri format | 6 | ✅ | 173.6M | ✅ | 55.4M | 🟢 **-68%** |
| format.json | iri-reference format | 6 | ✅ | 179.0M | ✅ | 55.5M | 🟢 **-69%** |
| format.json | uri format | 6 | ✅ | 180.6M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | uri-reference format | 6 | ✅ | 172.1M | ✅ | 55.7M | 🟢 **-68%** |
| format.json | uri-template format | 6 | ✅ | 180.6M | ✅ | 55.4M | 🟢 **-69%** |
| format.json | uuid format | 6 | ✅ | 179.4M | ✅ | 55.5M | 🟢 **-69%** |
| format.json | duration format | 6 | ✅ | 179.9M | ✅ | 55.8M | 🟢 **-69%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 170.0M | ✅ | 68.9M | 🟢 **-59%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.3M | ✅ | 68.3M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.2M | ✅ | 66.0M | 🟢 **-61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ✅ | 42.5M | 🟢 **-45%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ✅ | 38.7M | 🟢 **-49%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 37.6M | 🟢 **-48%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 170.5M | ✅ | 68.5M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 50.4M | 🟢 **-34%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 47.9M | 🟢 **-36%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.2M | ✅ | 31.8M | 🟢 **-33%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ✅ | 34.1M | 🟢 **-24%** |
| items.json | a schema given for items | 4 | ✅ | 53.3M | ✅ | 43.5M | -18% |
| items.json | an array of schemas for items | 6 | ✅ | 68.2M | ✅ | 50.3M | 🟢 **-26%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.5M | ✅ | 68.0M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 42.7M | 🟢 **-41%** |
| items.json | items with boolean schemas | 3 | ✅ | 59.2M | ✅ | 44.3M | 🟢 **-25%** |
| items.json | items and subitems | 6 | ✅ | 27.4M | ✅ | 20.8M | 🟢 **-24%** |
| items.json | nested items | 3 | ✅ | 7.7M | ✅ | 12.7M | 🔴 **+65%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 67.3M | -11% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 68.3M | -16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 168.1M | ✅ | 68.9M | 🟢 **-59%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.7M | ✅ | 28.1M | 🟢 **-53%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 45.1M | 🟢 **-32%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ✅ | 37.0M | 🟢 **-38%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.8M | ✅ | 48.3M | 🟢 **-40%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 47.6M | 🟢 **-34%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.0M | ✅ | 46.3M | 🟢 **-25%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 43.8M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.5M | ✅ | 42.9M | 🟢 **-23%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.8M | ✅ | 34.6M | 🟢 **-31%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 32.7M | 🟢 **-36%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 47.2M | 🟢 **-39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 47.9M | 🟢 **-37%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.6M | ✅ | 68.9M | 🟢 **-60%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 72.1M | ✅ | 35.5M | 🟢 **-51%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.7M | ✅ | 29.2M | 🟢 **-53%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ✅ | 45.2M | 🟢 **-32%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ✅ | 38.5M | 🟢 **-37%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.0M | ✅ | 39.0M | 🟢 **-32%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 170.2M | ✅ | 68.4M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ✅ | 45.1M | 🟢 **-37%** |
| minItems.json | minItems validation | 4 | ✅ | 80.4M | ✅ | 49.3M | 🟢 **-39%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 49.5M | 🟢 **-32%** |
| minLength.json | minLength validation | 5 | ✅ | 58.1M | ✅ | 44.1M | 🟢 **-24%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 43.7M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.2M | ✅ | 37.7M | 🟢 **-36%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ✅ | 34.6M | 🟢 **-31%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 47.1M | 🟢 **-39%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 48.3M | 🟢 **-33%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 46.6M | 🟢 **-40%** |
| multipleOf.json | by number | 3 | ✅ | 73.4M | ✅ | 43.0M | 🟢 **-42%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 41.5M | 🟢 **-38%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 8.8M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 9.1M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 43.7M | 🟢 **-43%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 37.8M | 🟢 **-47%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 35.4M | 🟢 **-49%** |
| not.json | forbidden property | 2 | ✅ | 53.7M | ✅ | 43.9M | -18% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.8M | ✅ | 39.2M | 🟢 **-36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.0M | ✅ | 39.4M | 🟢 **-39%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 177.3M | ✅ | 51.7M | 🟢 **-71%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 48.6M | 🟢 **-69%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.0M | ✅ | 23.8M | 🟢 **-30%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 22.1M | 🟢 **-67%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.3M | ✅ | 24.5M | 🟢 **-34%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 36.4M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 27.3M | 🟢 **-70%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 37.2M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 18.7M | 🟢 **-72%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 18.8M | 🟢 **-58%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 38.1M | 🟢 **-50%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.3M | ✅ | 17.0M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 19.8M | 🟢 **-60%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.1M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 56.6M | ✅ | 39.2M | 🟢 **-31%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.2M | ✅ | 31.1M | 🔴 **+23%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 11.4M | 🟢 **-58%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 6.3M | 🟢 **-58%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ✅ | 8.0M | 🟢 **-54%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ✅ | 5.6M | 🟢 **-74%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 17.9M | -1% |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 44.8M | 🟢 **-20%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 9.2M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.2M | ✅ | 41.0M | -17% |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ✅ | 43.3M | -17% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 69.9M | ✅ | 59.6M | -15% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.8M | ✅ | 27.1M | 🟢 **-41%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 14.1M | 🟢 **-28%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.3M | ✅ | 65.8M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.0M | ✅ | 28.7M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ✅ | 31.6M | 🟢 **-22%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.8M | ✅ | 26.9M | 🟢 **-37%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.0M | ✅ | 19.1M | 🔴 **+36%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ✅ | 1.9M | 🟢 **-69%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 2.6M | -16% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.4M | ✅ | 1.9M | 🟢 **-84%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.5M | ✅ | 2.6M | 🟢 **-79%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ✅ | 1.9M | 🟢 **-76%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ✅ | 3.8M | -10% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.3M | ✅ | 3.7M | -15% |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 18.5M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.0M | ✅ | 43.6M | -18% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.3M | ✅ | 45.2M | 🟢 **-24%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 39.2M | -16% |
| ref.json | nested refs | 2 | ✅ | 38.9M | ✅ | 45.1M | +16% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.8M | ✅ | 37.6M | -14% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ✅ | 2.4M | 🟢 **-25%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 43.2M | 🟢 **-21%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ✅ | 43.8M | -20% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 74.4M | 🟢 **-53%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 40.9M | 🟢 **-38%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 7.2M | -19% |
| ref.json | refs with quote | 2 | ✅ | 53.8M | ✅ | 44.4M | -17% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.7M | ✅ | 34.2M | 🔴 **+28%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 13.9M | 🟢 **-76%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.7M | ✅ | 50.2M | +8% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.5M | ✅ | 47.4M | -6% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ✅ | 47.6M | 🟢 **-35%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.9M | ✅ | 42.6M | +2% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ✅ | 22.7M | 🟢 **-48%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ✅ | 43.7M | -20% |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.4M | ✅ | 43.5M | -14% |
| ref.json | URN base URI with r-component | 2 | ✅ | 52.3M | ✅ | 44.0M | -16% |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.5M | ✅ | 39.3M | 🟢 **-25%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 51.5M | ✅ | 43.5M | -15% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.6M | ✅ | 44.1M | -19% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.0M | ✅ | 49.1M | +4% |
| ref.json | ref to then | 2 | ✅ | 51.2M | ✅ | 49.7M | -3% |
| ref.json | ref to else | 2 | ✅ | 48.6M | ✅ | 49.6M | +2% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.8M | ✅ | 49.0M | -4% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 48.6M | 🟢 **-37%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 48.7M | 🟢 **-37%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 47.9M | 🟢 **-38%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.3M | ✅ | 15.7M | 🔴 **+264%** |
| refRemote.json | remote ref | 2 | ✅ | 45.2M | ✅ | 48.2M | +7% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.3M | ✅ | 48.3M | -4% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.6M | ✅ | 49.2M | -3% |
| refRemote.json | ref within remote ref | 2 | ✅ | 50.6M | ✅ | 47.9M | -5% |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ✅ | 27.8M | -5% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.7M | ✅ | 27.1M | -17% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.2M | ✅ | 27.4M | 🟢 **-32%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.9M | ✅ | 12.3M | 🟢 **-63%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.2M | ✅ | 36.9M | -17% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.9M | ✅ | 40.5M | 🟢 **-20%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.9M | ✅ | 29.3M | 🟢 **-25%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.6M | ✅ | 41.9M | -17% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.4M | ✅ | 39.9M | 🟢 **-22%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 41.8M | ✅ | 41.9M | +0% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 51.0M | ✅ | 41.8M | -18% |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 49.0M | 🟢 **-25%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 70.5M | 🟢 **-56%** |
| required.json | required with empty array | 1 | ✅ | 157.8M | ✅ | 74.1M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 54.1M | ✅ | 38.5M | 🟢 **-29%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.7M | ✅ | 40.5M | 🟢 **-39%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 40.2M | 🟢 **-42%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 46.2M | 🟢 **-33%** |
| type.json | object type matches objects | 7 | ✅ | 59.3M | ✅ | 40.1M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 40.5M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.8M | ✅ | 43.5M | 🟢 **-35%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.7M | ✅ | 42.4M | 🟢 **-36%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 67.2M | ✅ | 38.2M | 🟢 **-43%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 49.6M | 🟢 **-36%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 43.0M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.1M | ✅ | 44.5M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 67.5M | -19% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.0M | ✅ | 49.0M | -20% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 52.7M | ✅ | 36.3M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 62.4M | -11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.0M | ✅ | 46.4M | -17% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.9M | ✅ | 67.2M | -15% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 44.7M | ✅ | 38.1M | -15% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 44.7M | ✅ | 35.0M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.1M | ✅ | 44.8M | -12% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.8M | ✅ | 64.3M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.4M | ✅ | 60.0M | 🔴 **+181%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ✅ | 26.4M | 🔴 **+114%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.4M | ✅ | 28.1M | 🔴 **+82%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.0M | ✅ | 37.3M | -9% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ✅ | 26.9M | 🔴 **+135%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 60.1M | ✅ | 45.8M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 36.5M | ✅ | 43.3M | +19% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.5M | ✅ | 44.0M | -9% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ✅ | 9.2M | 🔴 **+292%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.5M | ✅ | 39.3M | -15% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.2M | ✅ | 30.6M | 🔴 **+22%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ✅ | 55.3M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 66.3M | -12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.5M | ✅ | 37.1M | -13% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 61.9M | +6% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.2M | ✅ | 16.4M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.0M | ✅ | 40.3M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.1M | ✅ | 36.7M | +11% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.2M | ✅ | 12.9M | -15% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 58.8M | -15% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 19.5M | ✅ | 32.6M | 🔴 **+67%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.9M | ✅ | 9.0M | 🟢 **-35%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 59.8M | -14% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.8M | ✅ | 59.8M | 🔴 **+77%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ✅ | 9.8M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.5M | ✅ | 13.6M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.1M | ✅ | 29.7M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.7M | ✅ | 17.7M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ✅ | 17.9M | -2% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ✅ | 25.5M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 36.0M | ✅ | 37.8M | +5% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.9M | ✅ | 33.6M | +9% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.8M | ✅ | 31.3M | +2% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ✅ | 9.9M | 🔴 **+228%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.1M | ✅ | 33.9M | +13% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.9M | ✅ | 33.5M | +12% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.6M | ✅ | 59.9M | 🔴 **+84%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.7M | ✅ | 57.1M | 🔴 **+86%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.4M | ✅ | 30.7M | +17% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ✅ | 36.3M | 🔴 **+30%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ✅ | 18.7M | -11% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ✅ | 33.2M | 🔴 **+174%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.0M | ✅ | 21.3M | 🟢 **-24%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ✅ | 33.3M | +5% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.7M | ✅ | 18.2M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.6M | ✅ | 13.2M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 13.7M | 🟢 **-32%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 5.3M | 🟢 **-27%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 80.6M | ✅ | 55.5M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 46.9M | -11% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.9M | ✅ | 11.8M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.3M | ✅ | 27.2M | 🔴 **+22%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ✅ | 28.3M | +16% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 7.2M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 19.4M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 27.0M | 🔴 **+42%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.6M | ✅ | 53.4M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 59.3M | -17% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.0M | ✅ | 48.4M | 🟢 **-27%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 47.6M | 🟢 **-38%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.3M | ✅ | 12.6M | 🟢 **-77%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 14.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 69.0M | 🟢 **-22%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 40.1M | 🟢 **-37%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.7M | -14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 38.9M | 🟢 **-35%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 66.4M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 38.6M | 🟢 **-36%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ✅ | 49.2M | 🟢 **-25%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 63.8M | 🟢 **-64%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.2M | ✅ | 36.5M | +7% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ✅ | 39.6M | -19% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.5M | ✅ | 42.7M | 🟢 **-23%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ✅ | 40.9M | 🟢 **-33%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.2M | ✅ | 30.3M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 56.3M | ✅ | 27.7M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.9M | ✅ | 25.7M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 27.8M | -5% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 27.8M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 27.6M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.4M | ✅ | 29.1M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 27.3M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.0M | ✅ | 27.7M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 29.8M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.7M | ✅ | 25.4M | -20% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ✅ | 17.8M | +3% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.1M | ✅ | 14.1M | -7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 14.5M | -2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 26.7M | -10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ✅ | 23.6M | +9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ✅ | 22.5M | -5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 20.6M | +8% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ✅ | 21.6M | +3% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 9.1M | +12% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 7.9M | -11% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.7M | ✅ | 7.6M | 🟢 **-73%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ✅ | 22.9M | 🔴 **+20%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ✅ | 77K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.9M | ✅ | 30.6M | 🟢 **-21%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ✅ | 2.8M | 🟢 **-84%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 24.6M | 🟢 **-25%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.1M | ✅ | 883K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ✅ | 29.4M | 🟢 **-28%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.5M | -16% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.2M | ✅ | 55.1M | 🟢 **-42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 9.0M | -7% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.3M | ✅ | 15.4M | -11% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.4M | 🟢 **-32%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ✅ | 14.9M | -4% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.6M | ✅ | 12.0M | 🟢 **-68%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 44.9M | 🟢 **-34%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 23.0M | 🟢 **-26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ✅ | 6.9M | 🟢 **-61%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.7M | ✅ | 40.7M | 🟢 **-26%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.7M | ✅ | 43.5M | -17% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.1M | ✅ | 43.6M | -19% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 48.8M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.1M | ✅ | 43.2M | 🟢 **-21%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 25.2M | ✅ | 22.1M | -12% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.0M | ✅ | 23.1M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 17.5M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 17.9M | ✅ | 13.5M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.3M | ✅ | 73.2M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.4M | ✅ | 8.0M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 42.5M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.6M | ✅ | 7.3M | 🟢 **-75%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.5M | ✅ | 9.7M | 🟢 **-69%** |
| allOf.json | allOf | 4 | ✅ | 40.8M | ✅ | 32.0M | 🟢 **-22%** |
| allOf.json | allOf with base schema | 5 | ✅ | 28.9M | ✅ | 26.0M | -10% |
| allOf.json | allOf simple types | 2 | ✅ | 85.3M | ✅ | 49.7M | 🟢 **-42%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.1M | ✅ | 69.2M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 40.9M | 🟢 **-38%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 68.6M | ✅ | 40.2M | 🟢 **-41%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 73.9M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.7M | ✅ | 72.6M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 50.3M | 🟢 **-35%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 49.0M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 77.4M | ✅ | 50.7M | 🟢 **-34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 4.9M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 50.1M | 🟢 **-35%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 84.7M | ✅ | 50.4M | 🟢 **-40%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.7M | ✅ | 49.9M | -2% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ✅ | 50.1M | 🟢 **-35%** |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ✅ | 24.9M | 🟢 **-69%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.8M | ✅ | 20.6M | 🟢 **-46%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 70.9M | 🟢 **-56%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 70.8M | 🟢 **-56%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 21.5M | 🟢 **-67%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.2M | ✅ | 18.9M | 🟢 **-63%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.9M | ✅ | 56.9M | 🟢 **-67%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.1M | ✅ | 28.2M | 🟢 **-64%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.6M | ✅ | 55.7M | 🟢 **-70%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.0M | ✅ | 39.7M | 🟢 **-38%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 38.6M | 🟢 **-42%** |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 15.3M | 🟢 **-63%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 16.0M | 🟢 **-73%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 50.4M | 🟢 **-36%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 39.9M | 🟢 **-47%** |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 37.6M | 🟢 **-51%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.2M | ✅ | 26.7M | 🟢 **-60%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 25.8M | 🟢 **-61%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.6M | ✅ | 12.9M | 🟢 **-81%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 66.0M | ✅ | 12.6M | 🟢 **-81%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 40.0M | 🟢 **-37%** |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 43.8M | 🟢 **-41%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.1M | ✅ | 40.8M | 🟢 **-44%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 42.8M | 🟢 **-42%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 45.8M | 🟢 **-29%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 45.4M | 🟢 **-22%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 48.1M | 🟢 **-27%** |
| contains.json | contains keyword validation | 6 | ✅ | 64.3M | ✅ | 18.3M | 🟢 **-72%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.9M | ✅ | 10.0M | 🟢 **-84%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.7M | ✅ | 46.3M | 🟢 **-35%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.1M | ✅ | 31.5M | 🟢 **-56%** |
| contains.json | items + contains | 4 | ✅ | 42.4M | ✅ | 6.9M | 🟢 **-84%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 49.3M | 🟢 **-28%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 45.2M | 🟢 **-41%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.8M | ✅ | 64.6M | 🟢 **-63%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.6M | ✅ | 63.8M | 🟢 **-64%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 160.2M | ✅ | 57.2M | 🟢 **-64%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.5M | ✅ | 54.9M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 59.3M | -17% |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 47.3M | -14% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 57.5M | ✅ | 44.3M | 🟢 **-23%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ✅ | 737K | 🟢 **-66%** |
| dependentRequired.json | single dependency | 7 | ✅ | 65.3M | ✅ | 49.5M | 🟢 **-24%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.6M | ✅ | 64.5M | 🟢 **-63%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.9M | ✅ | 34.8M | 🔴 **+20%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.1M | ✅ | 37.8M | 🟢 **-23%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.4M | ✅ | 42.7M | 🟢 **-23%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.2M | ✅ | 40.8M | 🟢 **-31%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.2M | ✅ | 31.8M | 🟢 **-23%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.1M | ✅ | 38.9M | 0% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.7M | ✅ | 19.4M | 🔴 **+24%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.2M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.9M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.1M | ✅ | 10.2M | 🔴 **+67%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 29.6M | 🟢 **-61%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ✅ | 5.5M | 🟢 **-88%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 26.0M | 🟢 **-65%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 37.1M | 🔴 **+151%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 38.6M | 🟢 **-52%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 38.6M | 🟢 **-49%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ✅ | 20.4M | 🟢 **-69%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.5M | ✅ | 39.3M | 🟢 **-48%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 20.0M | 🟢 **-70%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 51.1M | 🟢 **-32%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 22.2M | 🟢 **-68%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.2M | ✅ | 43.3M | 🟢 **-35%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 22.1M | 🟢 **-68%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 45.9M | 🟢 **-29%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 39.9M | 🟢 **-44%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ✅ | 39.7M | 🟢 **-44%** |
| format.json | email format | 7 | ✅ | 183.0M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | idn-email format | 7 | ✅ | 180.7M | ✅ | 55.3M | 🟢 **-69%** |
| format.json | regex format | 7 | ✅ | 182.0M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | ipv4 format | 7 | ✅ | 182.7M | ✅ | 55.6M | 🟢 **-70%** |
| format.json | ipv6 format | 7 | ✅ | 175.6M | ✅ | 49.4M | 🟢 **-72%** |
| format.json | idn-hostname format | 7 | ✅ | 153.3M | ✅ | 54.3M | 🟢 **-65%** |
| format.json | hostname format | 7 | ✅ | 153.1M | ✅ | 55.7M | 🟢 **-64%** |
| format.json | date format | 7 | ✅ | 182.9M | ✅ | 43.7M | 🟢 **-76%** |
| format.json | date-time format | 7 | ✅ | 183.7M | ✅ | 55.4M | 🟢 **-70%** |
| format.json | time format | 7 | ✅ | 182.9M | ✅ | 55.8M | 🟢 **-70%** |
| format.json | json-pointer format | 7 | ✅ | 183.3M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | relative-json-pointer format | 7 | ✅ | 183.9M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | iri format | 7 | ✅ | 183.1M | ✅ | 56.0M | 🟢 **-69%** |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uri format | 7 | ✅ | 182.7M | ✅ | 55.4M | 🟢 **-70%** |
| format.json | uri-reference format | 7 | ✅ | 183.7M | ✅ | 54.8M | 🟢 **-70%** |
| format.json | uri-template format | 7 | ✅ | 182.7M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uuid format | 7 | ✅ | 183.1M | ✅ | 55.8M | 🟢 **-70%** |
| format.json | duration format | 7 | ✅ | 176.1M | ✅ | 55.6M | 🟢 **-68%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 68.9M | 🟢 **-60%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.9M | ✅ | 69.0M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.7M | ✅ | 68.6M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ✅ | 43.2M | 🟢 **-44%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.4M | ✅ | 37.3M | 🟢 **-51%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 36.7M | 🟢 **-49%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 163.6M | ✅ | 68.0M | 🟢 **-58%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 41.2M | 🟢 **-46%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 39.4M | 🟢 **-48%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ✅ | 31.9M | 🟢 **-33%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.4M | ✅ | 37.4M | -16% |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 43.3M | 🟢 **-21%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 68.8M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 43.9M | 🟢 **-39%** |
| items.json | items and subitems | 6 | ✅ | 22.5M | ✅ | 17.2M | 🟢 **-24%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 11.8M | -4% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.8M | ✅ | 46.6M | 🟢 **-42%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 47.9M | ✅ | 40.2M | -16% |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.9M | ✅ | 37.1M | -17% |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 47.6M | 🟢 **-35%** |
| items.json | items with null instance elements | 1 | ✅ | 74.9M | ✅ | 67.3M | -10% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 68.3M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.1M | ✅ | 28.2M | 🟢 **-52%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 43.5M | 🟢 **-34%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.4M | ✅ | 37.0M | 🟢 **-38%** |
| maxItems.json | maxItems validation | 4 | ✅ | 79.4M | ✅ | 48.0M | 🟢 **-40%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 48.4M | 🟢 **-33%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.7M | ✅ | 46.7M | 🟢 **-26%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.2M | ✅ | 43.4M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 42.7M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 34.7M | 🟢 **-31%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.3M | ✅ | 32.7M | 🟢 **-35%** |
| maximum.json | maximum validation | 4 | ✅ | 78.2M | ✅ | 47.6M | 🟢 **-39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 47.9M | 🟢 **-37%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 157.8M | ✅ | 68.2M | 🟢 **-57%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.4M | ✅ | 36.1M | 🟢 **-45%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ✅ | 34.6M | 🟢 **-44%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.7M | ✅ | 45.6M | 🟢 **-31%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ✅ | 37.7M | 🟢 **-38%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.1M | ✅ | 38.6M | 🟢 **-27%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.7M | ✅ | 53.9M | 🟢 **-69%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ✅ | 41.2M | 🟢 **-43%** |
| minItems.json | minItems validation | 4 | ✅ | 79.0M | ✅ | 47.9M | 🟢 **-39%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 48.6M | 🟢 **-33%** |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ✅ | 44.1M | 🟢 **-24%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 43.6M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 41.6M | 🟢 **-31%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.6M | ✅ | 35.3M | 🟢 **-27%** |
| minimum.json | minimum validation | 4 | ✅ | 78.7M | ✅ | 47.6M | 🟢 **-40%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.5M | ✅ | 47.3M | 🟢 **-32%** |
| multipleOf.json | by int | 3 | ✅ | 77.1M | ✅ | 44.0M | 🟢 **-43%** |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 41.1M | 🟢 **-44%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 41.4M | 🟢 **-38%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 8.8M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 8.8M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 43.6M | 🟢 **-43%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 39.9M | 🟢 **-44%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 39.9M | 🟢 **-42%** |
| not.json | forbidden property | 2 | ✅ | 54.6M | ✅ | 44.1M | -19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.7M | ✅ | 39.3M | 🟢 **-35%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 64.9M | ✅ | 32.7M | 🟢 **-50%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.7M | ✅ | 55.0M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 73.7M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.4M | ✅ | 24.3M | 🟢 **-27%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 22.8M | 🟢 **-66%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.4M | ✅ | 23.7M | 🟢 **-35%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 37.1M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 27.7M | 🟢 **-69%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 65.9M | ✅ | 37.1M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 18.0M | 🟢 **-73%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 18.3M | 🟢 **-59%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 36.9M | 🟢 **-51%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.3M | ✅ | 16.3M | 🟢 **-66%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 19.2M | 🟢 **-61%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.1M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 56.6M | ✅ | 42.0M | 🟢 **-26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 19.9M | ✅ | 31.1M | 🔴 **+56%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 10.8M | 🟢 **-60%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 6.2M | 🟢 **-57%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 8.0M | 🟢 **-49%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.2M | ✅ | 5.8M | 🟢 **-73%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 17.9M | -1% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.2M | ✅ | 49.6M | 🟢 **-27%** |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 64.8M | ✅ | 44.2M | 🟢 **-32%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 66.9M | -17% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 68.6M | -15% |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 45.1M | 🟢 **-20%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.2M | ✅ | 9.8M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.6M | ✅ | 40.9M | -18% |
| properties.json | properties with escaped characters | 2 | ✅ | 50.9M | ✅ | 44.1M | -13% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 61.0M | -13% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.8M | ✅ | 30.1M | 🟢 **-34%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 14.7M | 🟢 **-26%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.3M | ✅ | 65.8M | 🟢 **-62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.4M | ✅ | 29.2M | 🟢 **-42%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ✅ | 32.0M | 🟢 **-21%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.1M | ✅ | 33.9M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 19.1M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.9M | ✅ | 43.4M | -18% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.3M | ✅ | 45.0M | 🟢 **-24%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 39.6M | -17% |
| ref.json | nested refs | 2 | ✅ | 39.0M | ✅ | 35.0M | -10% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.2M | ✅ | 37.6M | -15% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ✅ | 2.2M | 🟢 **-38%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 39.1M | 🟢 **-29%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 43.7M | 🟢 **-20%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 74.6M | 🟢 **-53%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 39.9M | 🟢 **-40%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ✅ | 7.3M | -17% |
| ref.json | refs with quote | 2 | ✅ | 53.9M | ✅ | 43.7M | -19% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.2M | ✅ | 34.0M | 🔴 **+21%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 14.1M | 🟢 **-75%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.5M | ✅ | 50.2M | 0% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.4M | ✅ | 44.3M | -12% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.3M | ✅ | 47.7M | 🟢 **-35%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.9M | ✅ | 42.2M | +8% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 22.7M | 🟢 **-48%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.1M | ✅ | 43.7M | -19% |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.6M | ✅ | 44.0M | -16% |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.1M | ✅ | 43.2M | 🟢 **-20%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.3M | ✅ | 43.9M | -19% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.8M | ✅ | 44.1M | -20% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.5M | ✅ | 43.6M | -20% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.9M | ✅ | 49.8M | -2% |
| ref.json | ref to then | 2 | ✅ | 50.6M | ✅ | 48.4M | -4% |
| ref.json | ref to else | 2 | ✅ | 50.9M | ✅ | 49.4M | -3% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.7M | ✅ | 49.6M | -2% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 47.9M | 🟢 **-38%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.4M | ✅ | 49.0M | 🟢 **-36%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 45.1M | 🟢 **-42%** |
| refRemote.json | remote ref | 2 | ✅ | 50.3M | ✅ | 48.2M | -4% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.0M | ✅ | 49.3M | -3% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.6M | ✅ | 49.5M | -2% |
| refRemote.json | ref within remote ref | 2 | ✅ | 50.5M | ✅ | 49.5M | -2% |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ✅ | 27.7M | -6% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ✅ | 27.6M | -18% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ✅ | 27.6M | 🟢 **-31%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.2M | ✅ | 11.1M | 🟢 **-65%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.4M | ✅ | 40.0M | -10% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.5M | ✅ | 45.6M | -10% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.2M | ✅ | 28.9M | 🟢 **-37%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.5M | ✅ | 42.1M | -17% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.6M | ✅ | 41.9M | -17% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.2M | ✅ | 41.6M | +9% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 50.0M | ✅ | 42.2M | -16% |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 49.3M | 🟢 **-24%** |
| required.json | required default validation | 1 | ✅ | 158.7M | ✅ | 74.3M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.6M | ✅ | 74.5M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 54.0M | ✅ | 38.8M | 🟢 **-28%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 65.6M | ✅ | 40.8M | 🟢 **-38%** |
| type.json | number type matches numbers | 9 | ✅ | 66.3M | ✅ | 44.2M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 40.2M | 🟢 **-42%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 40.3M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 63.9M | ✅ | 40.6M | 🟢 **-36%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.6M | ✅ | 43.8M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.7M | ✅ | 36.3M | 🟢 **-42%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 61.5M | ✅ | 38.7M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 72.9M | ✅ | 50.3M | 🟢 **-31%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 42.9M | 🟢 **-41%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 44.7M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 68.8M | -17% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.1M | ✅ | 49.2M | -20% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 52.2M | ✅ | 42.3M | -19% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 62.8M | -11% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 55.6M | ✅ | 46.2M | -17% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 65.7M | -17% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 41.6M | -9% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.9M | ✅ | 44.6M | -12% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 64.2M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 47.5M | 🔴 **+124%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ✅ | 26.7M | 🔴 **+117%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ✅ | 21.0M | 🔴 **+33%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.5M | ✅ | 37.2M | -11% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 30.1M | 🔴 **+166%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ✅ | 49.2M | -20% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.2M | ✅ | 43.9M | -13% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 45.0M | ✅ | 44.4M | -1% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 38.7M | ✅ | 40.3M | +4% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.1M | ✅ | 30.6M | 🔴 **+22%** |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 79.7M | ✅ | 54.9M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 65.2M | -13% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.1M | ✅ | 37.2M | -14% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 69.0M | +18% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.0M | ✅ | 16.3M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 39.2M | ✅ | 39.5M | +1% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.8M | ✅ | 36.4M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.0M | ✅ | 12.8M | -15% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.9M | ✅ | 68.9M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 12.6M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.6M | ✅ | 31.1M | +9% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.0M | ✅ | 8.8M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 56.5M | -19% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.7M | ✅ | 60.3M | 🔴 **+103%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.3M | ✅ | 9.2M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ✅ | 15.8M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.0M | ✅ | 30.3M | 🔴 **+32%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.4M | ✅ | 18.6M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ✅ | 19.3M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ✅ | 25.1M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ✅ | 37.5M | +16% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.7M | ✅ | 33.5M | +17% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.7M | ✅ | 33.7M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.0M | ✅ | 34.1M | +14% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.0M | ✅ | 34.2M | +14% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 57.4M | 🔴 **+102%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 60.3M | 🔴 **+112%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 30.7M | +18% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.8M | ✅ | 36.4M | 🔴 **+31%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ✅ | 29.2M | 🔴 **+43%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ✅ | 36.6M | 🔴 **+209%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ✅ | 23.5M | -10% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.4M | ✅ | 32.6M | +0% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ✅ | 19.7M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 12.8M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.3M | ✅ | 14.1M | 🟢 **-30%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 5.4M | 🟢 **-24%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.4M | ✅ | 55.7M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 46.3M | -12% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 28.4M | ✅ | 12.4M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 9.0M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 14.6M | ✅ | 27.4M | 🔴 **+88%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ✅ | 23.4M | -4% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 10.4M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.1M | ✅ | 21.2M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 46.0M | ✅ | 25.8M | 🟢 **-44%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.4M | ✅ | 60.2M | 🟢 **-62%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.7M | ✅ | 54.5M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ✅ | 49.3M | 🟢 **-26%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 45.2M | 🟢 **-41%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.2M | ✅ | 11.8M | 🟢 **-82%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 14.2M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 68.8M | 🟢 **-22%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 40.0M | 🟢 **-37%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.4M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.8M | ✅ | 35.7M | 🟢 **-40%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.9M | -14% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 38.6M | 🟢 **-36%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 64.9M | ✅ | 49.6M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.6M | ✅ | 55.8M | 🟢 **-68%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.3M | ✅ | 33.9M | -1% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ✅ | 37.3M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.5M | ✅ | 42.6M | 🟢 **-23%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.5M | ✅ | 40.5M | 🟢 **-34%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ✅ | 32.1M | 🟢 **-23%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 27.5M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.2M | ✅ | 26.9M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 27.7M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 27.6M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 27.5M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 29.3M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 27.6M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 27.9M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 29.7M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.1M | ✅ | 25.2M | 🟢 **-21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ✅ | 17.7M | +3% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 14.6M | -6% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 13.8M | -10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 27.2M | -8% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.1M | ✅ | 23.5M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ✅ | 22.4M | -5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 20.5M | +4% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.0M | ✅ | 21.8M | +4% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 9.3M | +15% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 8.5M | +4% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ✅ | 3.0M | 🟢 **-89%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.4M | ✅ | 8.4M | 🟢 **-69%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.0M | ✅ | 79K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.5M | ✅ | 30.8M | 🟢 **-20%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ✅ | 2.8M | 🟢 **-84%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 33.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 25.8M | 🟢 **-21%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.8M | ✅ | 908K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.2M | ✅ | 28.9M | 🟢 **-20%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ✅ | 5.5M | -14% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.0M | ✅ | 55.2M | 🟢 **-42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 9.2M | -7% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.6M | ✅ | 15.5M | -7% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ✅ | 4.3M | 🟢 **-30%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.4M | ✅ | 15.1M | +5% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.7M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.2M | ✅ | 12.3M | 🟢 **-67%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 67.1M | ✅ | 45.0M | 🟢 **-33%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 27.4M | -11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ✅ | 6.8M | 🟢 **-61%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.0M | ✅ | 43.6M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.9M | ✅ | 43.3M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.3M | ✅ | 43.8M | -18% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 48.6M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.1M | ✅ | 43.8M | -19% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |
