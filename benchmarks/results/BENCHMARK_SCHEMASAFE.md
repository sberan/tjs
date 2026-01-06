# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.8M | 184/199 | 21.7M | 184 | -19% |
| draft6 | 276 | ✅ 276 | 29.3M | 259/276 | 23.4M | 259 | 🟢 **-20%** |
| draft7 | 313 | ✅ 313 | 15.6M | 281/313 | 21.0M | 281 | 🔴 **+35%** |
| draft2019-09 | 435 | ✅ 435 | 17.4M | 399/435 | 18.9M | 399 | +9% |
| draft2020-12 | 448 | ✅ 448 | 19.3M | 389/448 | 15.2M | 389 | 🟢 **-21%** |
| **Total** | 1671 | 1670/1671 | 19.5M | 1512/1671 | 19.1M | 1512 | -2% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.39x faster** (38 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 19.5M | 🔴 **+165%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.0M | ✅ | 142.1M | 🔴 **+58%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.5M | ✅ | 84.1M | 🟢 **-43%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.8M | ✅ | 141.9M | 🔴 **+51%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 77.9M | 🟢 **-37%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.7M | ✅ | 35.5M | 🟢 **-24%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 57.4M | ✅ | 30.8M | 🟢 **-46%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 75.2M | +3% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 142.1M | -7% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 46.5M | +16% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.7M | ✅ | 24.9M | +1% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 26.8M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.0M | ✅ | 24.3M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 80.9M | ✅ | 142.0M | 🔴 **+76%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 16.9M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 57.1M | +9% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 36.3M | 🟢 **-24%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.6M | ✅ | 23.7M | -14% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 79.0M | 🟢 **-28%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 90.0M | ✅ | 141.9M | 🔴 **+58%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 141.7M | -7% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 79.0M | +3% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.9M | ✅ | 78.9M | 🟢 **-33%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 78.7M | 0% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.5M | ✅ | 49.3M | 🟢 **-40%** |
| anyOf.json | anyOf | 4 | ✅ | 76.1M | ✅ | 79.5M | +4% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.2M | ✅ | 21.9M | 🟢 **-52%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.7M | ✅ | 27.3M | 🟢 **-46%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 163.0M | ✅ | 137.4M | -16% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 78.8M | +0% |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 81.6M | 🟢 **-24%** |
| default.json | invalid string value for default | 2 | ✅ | 54.6M | ✅ | 50.5M | -8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.4M | ✅ | 55.0M | 🟢 **-31%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.3M | ✅ | 71.4M | 🟢 **-22%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.5M | ✅ | 30.6M | -11% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.8M | ✅ | 33.2M | 🟢 **-44%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.5M | ✅ | 12.3M | +7% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 43.4M | ✅ | 25.2M | 🟢 **-42%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 77.6M | +3% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 36.1M | 🟢 **-41%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 84.4M | +13% |
| enum.json | enums in properties | 6 | ✅ | 15.1M | ✅ | 34.6M | 🔴 **+129%** |
| enum.json | enum with escaped characters | 3 | ✅ | 57.9M | ✅ | 63.1M | +9% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.3M | ✅ | 60.5M | 🟢 **-46%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 57.9M | -13% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.6M | ✅ | 62.4M | 🟢 **-44%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 55.0M | -17% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 89.2M | 🟢 **-22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 69.0M | ✅ | 65.2M | -5% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 90.4M | -19% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.5M | ✅ | 68.0M | -1% |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 67.6M | 🟢 **-26%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 63.1M | +8% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 70.1M | 🟢 **-25%** |
| format.json | email format | 6 | ✅ | 92.5M | ✅ | 136.2M | 🔴 **+47%** |
| format.json | ipv4 format | 6 | ✅ | 160.9M | ✅ | 138.6M | -14% |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ✅ | 139.8M | 🔴 **+51%** |
| format.json | hostname format | 6 | ✅ | 163.5M | ✅ | 106.2M | 🟢 **-35%** |
| format.json | date-time format | 6 | ✅ | 92.5M | ✅ | 136.7M | 🔴 **+48%** |
| format.json | uri format | 6 | ✅ | 163.0M | ✅ | 139.8M | -14% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 25.0M | 🟢 **-44%** |
| items.json | a schema given for items | 4 | ✅ | 81.0M | ✅ | 46.0M | 🟢 **-43%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.3M | ✅ | 41.0M | 🟢 **-40%** |
| items.json | items and subitems | 6 | ✅ | 27.6M | ✅ | 7.9M | 🟢 **-71%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 7.1M | 🟢 **-42%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 70.1M | -7% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 78.0M | -4% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 82.3M | +4% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 42.9M | 🟢 **-28%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.0M | ✅ | 64.8M | +12% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 43.1M | -16% |
| maximum.json | maximum validation | 4 | ✅ | 76.2M | ✅ | 86.3M | +13% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 83.0M | +10% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 82.2M | +7% |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 69.9M | ✅ | 71.2M | +2% |
| minItems.json | minItems validation | 4 | ✅ | 80.3M | ✅ | 79.3M | -1% |
| minLength.json | minLength validation | 5 | ✅ | 58.4M | ✅ | 34.1M | 🟢 **-42%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.6M | ✅ | 44.6M | 🟢 **-25%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 83.3M | +8% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.8M | ✅ | 85.4M | +11% |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.3M | ✅ | 69.6M | -1% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 70.6M | ✅ | 85.8M | 🔴 **+22%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 75.6M | -3% |
| multipleOf.json | by number | 3 | ✅ | 63.5M | ✅ | 34.2M | 🟢 **-46%** |
| multipleOf.json | by small number | 2 | ✅ | 66.5M | ✅ | 29.6M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 36.5M | 🟢 **-52%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 76.6M | -1% |
| not.json | not multiple types | 3 | ✅ | 69.7M | ✅ | 55.9M | -20% |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 40.8M | 🟢 **-41%** |
| not.json | forbidden property | 2 | ✅ | 53.9M | ✅ | 58.0M | +8% |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.3M | ✅ | 50.5M | 🟢 **-21%** |
| not.json | double negation | 1 | ✅ | 89.6M | ✅ | 139.9M | 🔴 **+56%** |
| oneOf.json | oneOf | 4 | ✅ | 31.0M | ✅ | 64.6M | 🔴 **+108%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ✅ | 12.2M | 🟢 **-63%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 24.3M | 🟢 **-44%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.9M | ✅ | 75.1M | -1% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ✅ | 22.3M | 🟢 **-54%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 27.2M | 🟢 **-45%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 79.5M | +4% |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 69.0M | 🔴 **+33%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.4M | ✅ | 26.6M | +19% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.6M | ✅ | 18.9M | 🟢 **-29%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ✅ | 14.2M | -2% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.4M | ✅ | 13.5M | -18% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.0M | ✅ | 22.5M | 🔴 **+41%** |
| properties.json | object properties validation | 6 | ✅ | 54.0M | ✅ | 50.5M | -6% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 10.2M | 🟢 **-48%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.0M | ✅ | 21.1M | 🟢 **-50%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 64.9M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ✅ | 27.9M | -1% |
| ref.json | root pointer ref | 4 | ✅ | 25.9M | ✅ | 14.7M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 28.1M | 🟢 **-39%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.2M | ✅ | 24.7M | 🟢 **-58%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 28.0M | 🟢 **-40%** |
| ref.json | nested refs | 2 | ✅ | 38.6M | ✅ | 12.8M | 🟢 **-67%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.3M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 51.8M | ✅ | 41.7M | -20% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.1M | ✅ | 13.3M | 🟢 **-75%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.7M | ✅ | 2.8M | 🟢 **-76%** |
| ref.json | refs with quote | 2 | ✅ | 49.9M | ✅ | 28.8M | 🟢 **-42%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.0M | ✅ | 37.5M | 🟢 **-51%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.1M | ✅ | 36.5M | 🟢 **-31%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.6M | ✅ | 42.0M | 🟢 **-22%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 50.4M | ✅ | 37.8M | 🟢 **-25%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 71.6M | ✅ | 39.2M | 🟢 **-45%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.0M | ✅ | 37.2M | 🟢 **-52%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 39.2M | 🟢 **-44%** |
| refRemote.json | remote ref | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 32.5M | ✅ | 74.4M | 🔴 **+129%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 142.3M | 🔴 **+58%** |
| required.json | required with escaped characters | 2 | ✅ | 51.1M | ✅ | 21.9M | 🟢 **-57%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ✅ | 34.4M | 🔴 **+27%** |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ✅ | 51.3M | 🟢 **-21%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 60.6M | -13% |
| type.json | string type matches strings | 9 | ✅ | 68.6M | ✅ | 59.4M | -13% |
| type.json | object type matches objects | 7 | ✅ | 58.2M | ✅ | 49.1M | -16% |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 50.2M | 🟢 **-22%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 54.2M | -18% |
| type.json | null type matches only the null object | 10 | ✅ | 65.6M | ✅ | 52.1M | 🟢 **-21%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.2M | ✅ | 56.8M | -14% |
| type.json | type as array with one item | 2 | ✅ | 59.6M | ✅ | 79.0M | 🔴 **+33%** |
| type.json | type: array or object | 5 | ✅ | 50.6M | ✅ | 59.0M | +16% |
| type.json | type: array, object or null | 5 | ✅ | 70.6M | ✅ | 71.4M | +1% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.9M | ✅ | 7.3M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 23.7M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 29.0M | 🔴 **+54%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.5M | ✅ | 137.0M | 🔴 **+50%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 53.4M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.7M | ✅ | 45.6M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 88.0M | ✅ | 131.4M | 🔴 **+49%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 134.3M | 🔴 **+51%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 52.4M | -17% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 112.5M | 🔴 **+42%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 49.9M | -17% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 118.2M | 🔴 **+50%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 49.3M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 67.3M | 🔴 **+135%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 32.6M | +11% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.5M | ✅ | 33.4M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.0M | ✅ | 33.3M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.5M | ✅ | 32.0M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 32.9M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.8M | ✅ | 32.7M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 32.1M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.1M | ✅ | 38.3M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 30.7M | +1% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ✅ | 20.7M | 🔴 **+20%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 17.3M | +11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 16.9M | +15% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.4M | ✅ | 30.9M | +9% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ✅ | 27.5M | 🔴 **+26%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 20.8M | -10% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 13.5M | 🟢 **-35%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 14.7M | 🟢 **-27%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.6M | +10% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 10.6M | 🔴 **+26%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ✅ | 12.0M | 🟢 **-43%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.7M | ✅ | 9.0M | 🟢 **-65%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ✅ | 13.9M | 🟢 **-27%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ✅ | 30.9M | -20% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 20.3M | 🔴 **+70%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ✅ | 5.2M | -13% |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ✅ | 21.8M | 🟢 **-41%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ✅ | 31.2M | +6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.2M | ✅ | 11.0M | 🟢 **-28%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.6M | +4% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.1M | ✅ | 15.8M | 🟢 **-60%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 124.9M | -18% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.2M | ✅ | 91.3M | 🔴 **+25%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 134.8M | -18% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 69.3M | -14% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ✅ | 35.8M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ✅ | 28.2M | 🟢 **-37%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ✅ | 75.9M | 🟢 **-29%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 125.4M | 🔴 **+55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 43.1M | -6% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.2M | ✅ | 23.7M | +7% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.6M | ✅ | 27.0M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.4M | ✅ | 24.7M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 113.9M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.1M | ✅ | 17.3M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 51.5M | 🟢 **-26%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 39.0M | -3% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 25.4M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 58.9M | ✅ | 58.2M | -1% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.1M | ✅ | 125.1M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.9M | ✅ | 63.9M | -3% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.4M | ✅ | 63.0M | 🟢 **-32%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 125.1M | 🔴 **+55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.6M | ✅ | 125.3M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 88.0M | +14% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 88.0M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 87.4M | +11% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.7M | ✅ | 59.7M | 🟢 **-29%** |
| anyOf.json | anyOf | 4 | ✅ | 80.1M | ✅ | 90.9M | +13% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.2M | ✅ | 27.2M | 🟢 **-40%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.0M | ✅ | 125.3M | 🔴 **+41%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.8M | ✅ | 124.3M | -19% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 64.5M | -2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ✅ | 29.7M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 135.2M | 🔴 **+61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.4M | ✅ | 86.5M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.3M | ✅ | 137.9M | 🔴 **+76%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.0M | ✅ | 62.9M | 🟢 **-26%** |
| const.json | const validation | 3 | ✅ | 82.4M | ✅ | 70.4M | -15% |
| const.json | const with object | 4 | ✅ | 50.0M | ✅ | 32.0M | 🟢 **-36%** |
| const.json | const with array | 3 | ✅ | 58.3M | ✅ | 5.4M | 🟢 **-91%** |
| const.json | const with null | 2 | ✅ | 119.5M | ✅ | 86.0M | 🟢 **-28%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 62.8M | -17% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.1M | ✅ | 75.2M | 🟢 **-32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ✅ | 67.3M | +1% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.1M | ✅ | 68.0M | 🟢 **-29%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.4M | ✅ | 29.5M | 🟢 **-55%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.9M | ✅ | 30.1M | 🟢 **-68%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 62.9M | ✅ | 65.2M | +4% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 90.3M | -19% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ✅ | 68.6M | -6% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 112.6M | ✅ | 80.5M | 🟢 **-29%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 72.0M | +11% |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 67.0M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.1M | ✅ | 75.8M | +16% |
| contains.json | contains keyword validation | 6 | ✅ | 99.1M | ✅ | 19.4M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 62.9M | ✅ | 14.6M | 🟢 **-77%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.4M | ✅ | 72.8M | 🟢 **-31%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.7M | ✅ | 42.8M | 🟢 **-41%** |
| contains.json | items + contains | 4 | ✅ | 49.9M | ✅ | 18.0M | 🟢 **-64%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 37.8M | 🟢 **-51%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 75.5M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 44.7M | -19% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.9M | ✅ | 57.0M | 🟢 **-25%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.6M | ✅ | 72.5M | -20% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 138.2M | 🔴 **+44%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.5M | ✅ | 31.4M | 🟢 **-20%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ✅ | 35.1M | 🟢 **-25%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.3M | ✅ | 56.1M | 🟢 **-36%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 15.6M | ✅ | 16.3M | +5% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.9M | ✅ | 26.9M | 🟢 **-43%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 86.2M | +14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 38.6M | 🟢 **-37%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 89.1M | +20% |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 40.9M | 🔴 **+160%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 95.2M | +18% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.1M | ✅ | 76.6M | 🟢 **-32%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ✅ | 68.4M | +4% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.1M | ✅ | 73.5M | 🟢 **-34%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 65.4M | -2% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 89.1M | -18% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 82.0M | +19% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 89.6M | -19% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.1M | ✅ | 79.0M | +16% |
| enum.json | nul characters in strings | 2 | ✅ | 90.7M | ✅ | 74.0M | -18% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 79.6M | +12% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 107.6M | ✅ | 78.8M | 🟢 **-27%** |
| format.json | email format | 6 | ✅ | 92.3M | ✅ | 132.5M | 🔴 **+44%** |
| format.json | ipv4 format | 6 | ✅ | 161.5M | ✅ | 132.0M | -18% |
| format.json | ipv6 format | 6 | ✅ | 93.0M | ✅ | 121.0M | 🔴 **+30%** |
| format.json | hostname format | 6 | ✅ | 162.9M | ✅ | 118.8M | 🟢 **-27%** |
| format.json | date-time format | 6 | ✅ | 91.6M | ✅ | 119.1M | 🔴 **+30%** |
| format.json | json-pointer format | 6 | ✅ | 162.7M | ✅ | 132.2M | -19% |
| format.json | uri format | 6 | ✅ | 92.9M | ✅ | 118.9M | 🔴 **+28%** |
| format.json | uri-reference format | 6 | ✅ | 163.5M | ✅ | 121.9M | 🟢 **-25%** |
| format.json | uri-template format | 6 | ✅ | 93.0M | ✅ | 131.2M | 🔴 **+41%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 25.2M | ✅ | 24.9M | -1% |
| items.json | a schema given for items | 4 | ✅ | 27.4M | ✅ | 43.8M | 🔴 **+60%** |
| items.json | an array of schemas for items | 6 | ✅ | 96.1M | ✅ | 59.2M | 🟢 **-38%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 72.1M | ✅ | 135.3M | 🔴 **+88%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 40.3M | ✅ | 54.9M | 🔴 **+36%** |
| items.json | items with boolean schemas | 3 | ✅ | 28.0M | ✅ | 68.7M | 🔴 **+145%** |
| items.json | items and subitems | 6 | ✅ | 16.0M | ✅ | 7.8M | 🟢 **-51%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 6.7M | 🟢 **-48%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 69.3M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.7M | ✅ | 96.0M | 🔴 **+22%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 82.5M | +14% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ✅ | 44.7M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 45.8M | ✅ | 42.7M | -7% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.1M | ✅ | 65.3M | +19% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.0M | ✅ | 41.6M | -12% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.2M | ✅ | 42.7M | -6% |
| maximum.json | maximum validation | 4 | ✅ | 75.8M | ✅ | 95.6M | 🔴 **+26%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 39.0M | ✅ | 85.0M | 🔴 **+118%** |
| minItems.json | minItems validation | 4 | ✅ | 69.9M | ✅ | 46.5M | 🟢 **-34%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 82.9M | +14% |
| minLength.json | minLength validation | 5 | ✅ | 57.6M | ✅ | 32.5M | 🟢 **-44%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.0M | ✅ | 48.2M | -14% |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 68.1M | +14% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.6M | ✅ | 47.4M | -3% |
| minimum.json | minimum validation | 4 | ✅ | 75.8M | ✅ | 93.5M | 🔴 **+23%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.9M | ✅ | 86.5M | 🔴 **+20%** |
| multipleOf.json | by int | 3 | ✅ | 72.9M | ✅ | 93.8M | 🔴 **+29%** |
| multipleOf.json | by number | 3 | ✅ | 70.7M | ✅ | 50.3M | 🟢 **-29%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 27.0M | 🟢 **-59%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 16.2M | 🟢 **-79%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 83.8M | +9% |
| not.json | not multiple types | 3 | ✅ | 70.8M | ✅ | 70.5M | 0% |
| not.json | not more complex schema | 3 | ✅ | 66.6M | ✅ | 47.3M | 🟢 **-29%** |
| not.json | forbidden property | 2 | ✅ | 51.6M | ✅ | 59.1M | +15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.9M | ✅ | 61.5M | -4% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.9M | ✅ | 60.7M | +3% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.1M | ✅ | 135.9M | 🔴 **+51%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 124.5M | 🔴 **+38%** |
| oneOf.json | oneOf | 4 | ✅ | 72.3M | ✅ | 71.0M | -2% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.8M | ✅ | 26.0M | -18% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 64.4M | -3% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 124.8M | 🔴 **+39%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 56.1M | -15% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.8M | ✅ | 63.8M | 0% |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.2M | ✅ | 28.3M | 🟢 **-36%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 84.5M | +11% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.1M | ✅ | 24.3M | 🟢 **-50%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 32.4M | 🟢 **-34%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 86.3M | +13% |
| pattern.json | pattern validation | 8 | ✅ | 55.1M | ✅ | 71.8M | 🔴 **+30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 60.5M | 🔴 **+139%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.0M | ✅ | 18.0M | 🟢 **-25%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 13.7M | -6% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 12.8M | -19% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 17.7M | -16% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.3M | ✅ | 21.6M | 🔴 **+32%** |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ✅ | 53.4M | -5% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 11.5M | 🟢 **-42%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 58.2M | +18% |
| properties.json | properties with escaped characters | 2 | ✅ | 50.5M | ✅ | 24.2M | 🟢 **-52%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.3M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 28.6M | +1% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.7M | ✅ | 40.9M | +0% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 17.0M | -11% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 135.5M | 🔴 **+44%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ✅ | 25.0M | 🟢 **-51%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 30.4M | 🟢 **-25%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ✅ | 33.2M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 13.4M | 🟢 **-49%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.3M | ✅ | 29.1M | 🟢 **-47%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.4M | ✅ | 25.2M | 🟢 **-52%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ✅ | 29.7M | 🟢 **-37%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 12.5M | 🟢 **-68%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.5M | ✅ | 48.3M | -11% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ✅ | 29.0M | 🟢 **-47%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 47.5M | ✅ | 119.6M | 🔴 **+152%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 35.1M | ✅ | 33.0M | -6% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 2.8M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 55.2M | ✅ | 29.1M | 🟢 **-47%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ✅ | 43.2M | -15% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.9M | ✅ | 42.4M | -18% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.6M | ✅ | 38.4M | 🟢 **-21%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 37.5M | 🟢 **-34%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ✅ | 10.5M | 🟢 **-68%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.3M | ✅ | 11.0M | 🟢 **-68%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.3M | ✅ | 25.6M | 🟢 **-31%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.9M | ✅ | 28.9M | 🟢 **-47%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.9M | ✅ | 29.1M | 🟢 **-47%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.5M | ✅ | 29.0M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.7M | ✅ | 29.1M | 🟢 **-43%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.2M | ✅ | 30.7M | 🟢 **-38%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.5M | ✅ | 29.1M | 🟢 **-32%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.2M | ✅ | 41.1M | -18% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.8M | ✅ | 43.2M | 🟢 **-44%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 42.9M | 🟢 **-44%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 43.0M | 🟢 **-44%** |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.5M | ✅ | 83.2M | 🔴 **+29%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 125.3M | 🔴 **+39%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 125.3M | 🔴 **+39%** |
| required.json | required with escaped characters | 2 | ✅ | 52.9M | ✅ | 23.7M | 🟢 **-55%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ✅ | 35.6M | 🔴 **+27%** |
| type.json | integer type matches integers | 9 | ✅ | 64.3M | ✅ | 64.1M | 0% |
| type.json | number type matches numbers | 9 | ✅ | 67.8M | ✅ | 75.8M | +12% |
| type.json | string type matches strings | 9 | ✅ | 67.4M | ✅ | 73.3M | +9% |
| type.json | object type matches objects | 7 | ✅ | 57.1M | ✅ | 59.5M | +4% |
| type.json | array type matches arrays | 7 | ✅ | 62.8M | ✅ | 58.7M | -7% |
| type.json | boolean type matches booleans | 10 | ✅ | 64.9M | ✅ | 63.6M | -2% |
| type.json | null type matches only the null object | 10 | ✅ | 64.4M | ✅ | 59.6M | -7% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 64.9M | ✅ | 70.9M | +9% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 87.2M | +13% |
| type.json | type: array or object | 5 | ✅ | 67.2M | ✅ | 65.7M | -2% |
| type.json | type: array, object or null | 5 | ✅ | 77.0M | ✅ | 74.1M | -4% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 7.9M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.6M | ✅ | 23.6M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 29.1M | 🔴 **+54%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 90.5M | ✅ | 130.9M | 🔴 **+45%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.2M | ✅ | 47.2M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.5M | ✅ | 41.4M | 🟢 **-35%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 121.5M | 🔴 **+37%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 127.0M | 🔴 **+43%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 60.1M | -5% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 111.6M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 60.3M | +1% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 111.2M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 60.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 24.1M | ✅ | 72.0M | 🔴 **+199%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 35.8M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 36.2M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 36.0M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.6M | ✅ | 34.3M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.3M | ✅ | 33.2M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 35.9M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 33.7M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.5M | ✅ | 37.7M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 33.5M | +11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 20.3M | +19% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 16.5M | +7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.0M | ✅ | 15.4M | +19% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.0M | ✅ | 32.7M | 🔴 **+26%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.6M | ✅ | 27.6M | 🔴 **+27%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ✅ | 19.3M | -17% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 12.5M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 13.6M | 🟢 **-31%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.2M | +15% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 10.8M | 🔴 **+29%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ✅ | 15.9M | 🟢 **-26%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ✅ | 9.2M | 🟢 **-65%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ✅ | 14.5M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.2M | ✅ | 34.7M | 🟢 **-21%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ✅ | 18.0M | 🔴 **+53%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.6M | ✅ | 36.1M | +14% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ✅ | 7.3M | 🟢 **-26%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ✅ | 18.8M | +10% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.7M | 🟢 **-26%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ✅ | 23.6M | 🟢 **-36%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.2M | ✅ | 32.1M | 🟢 **-32%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.5M | ✅ | 30.2M | 🟢 **-36%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.4M | ✅ | 34.9M | 🔴 **+23%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.4M | ✅ | 10.4M | 🟢 **-33%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.2M | ✅ | 24.7M | 🔴 **+73%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 19.6M | ✅ | 7.7M | 🟢 **-61%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.9M | ✅ | 15.6M | 🟢 **-60%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 144.1M | ✅ | 125.3M | -13% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.1M | ✅ | 92.7M | 🔴 **+27%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.6M | ✅ | 124.4M | 🟢 **-24%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.6M | ✅ | 69.3M | -14% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.6M | ✅ | 30.0M | 🟢 **-46%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 24.9M | 🟢 **-45%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 78.6M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 124.3M | 🔴 **+54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.5M | ✅ | 42.2M | -7% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.0M | ✅ | 23.5M | +18% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.9M | ✅ | 24.8M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.8M | ✅ | 25.2M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 125.4M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 15.6M | ✅ | 8.4M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 51.0M | 🟢 **-26%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 36.7M | -9% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.0M | ✅ | 24.3M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 85.2M | +17% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 125.2M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 64.4M | -3% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.4M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.7M | ✅ | 125.6M | 🔴 **+56%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 123.0M | -20% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 87.6M | +14% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.0M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 86.3M | +10% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 131.2M | ✅ | 59.0M | 🟢 **-55%** |
| anyOf.json | anyOf | 4 | ✅ | 79.9M | ✅ | 89.3M | +12% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.3M | ✅ | 27.9M | 🟢 **-37%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 125.1M | 🔴 **+39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.8M | ✅ | 125.3M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 61.2M | ✅ | 64.4M | +5% |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.5M | ✅ | 30.7M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 133.2M | 🔴 **+58%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.1M | ✅ | 87.3M | 🟢 **-27%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.3M | ✅ | 137.7M | 🔴 **+76%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 91.9M | ✅ | 23.3M | 🟢 **-75%** |
| const.json | const validation | 3 | ✅ | 64.9M | ✅ | 70.0M | +8% |
| const.json | const with object | 4 | ✅ | 49.3M | ✅ | 31.0M | 🟢 **-37%** |
| const.json | const with array | 3 | ✅ | 53.5M | ✅ | 9.1M | 🟢 **-83%** |
| const.json | const with null | 2 | ✅ | 119.8M | ✅ | 79.1M | 🟢 **-34%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ✅ | 64.1M | -15% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 76.1M | 🟢 **-32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 65.5M | ✅ | 68.0M | +4% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 67.7M | 🟢 **-29%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.3M | ✅ | 33.7M | 🟢 **-48%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ✅ | 33.7M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.0M | ✅ | 65.8M | +4% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 90.9M | -19% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.2M | ✅ | 71.7M | +10% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 111.9M | ✅ | 79.0M | 🟢 **-29%** |
| const.json | nul characters in strings | 2 | ✅ | 52.5M | ✅ | 74.5M | 🔴 **+42%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 66.3M | -16% |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 76.1M | +15% |
| contains.json | contains keyword validation | 6 | ✅ | 89.1M | ✅ | 20.0M | 🟢 **-78%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.4M | ✅ | 12.8M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 99.3M | ✅ | 72.8M | 🟢 **-27%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 62.7M | ✅ | 42.4M | 🟢 **-32%** |
| contains.json | items + contains | 4 | ✅ | 51.7M | ✅ | 18.0M | 🟢 **-65%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 72.9M | +6% |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 38.1M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 75.6M | +6% |
| default.json | invalid string value for default | 2 | ✅ | 73.5M | ✅ | 46.5M | 🟢 **-37%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.4M | ✅ | 57.4M | +10% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 65.4M | ✅ | 63.9M | -2% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 137.5M | 🔴 **+43%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.5M | ✅ | 31.1M | -10% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 47.6M | ✅ | 33.0M | 🟢 **-31%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 61.4M | ✅ | 48.8M | 🟢 **-21%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ✅ | 16.7M | 🔴 **+45%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.9M | ✅ | 26.6M | 🟢 **-30%** |
| enum.json | simple enum validation | 2 | ✅ | 74.6M | ✅ | 84.6M | +13% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 39.2M | -18% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 87.1M | +16% |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 36.1M | 🔴 **+142%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 96.6M | +20% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.1M | ✅ | 71.0M | -7% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 68.3M | +3% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.0M | ✅ | 75.1M | -1% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.6M | ✅ | 68.5M | +3% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 88.8M | +19% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 80.4M | +17% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 90.4M | 🔴 **+23%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.0M | ✅ | 78.5M | +15% |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 74.1M | +14% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 79.8M | +13% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.6M | ✅ | 79.5M | +13% |
| format.json | email format | 6 | ✅ | 90.8M | ✅ | 133.1M | 🔴 **+47%** |
| format.json | idn-email format | 6 | ✅ | 93.0M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 93.0M | ✅ | 118.5M | 🔴 **+27%** |
| format.json | ipv4 format | 6 | ✅ | 92.7M | ✅ | 124.5M | 🔴 **+34%** |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 119.3M | 🔴 **+28%** |
| format.json | idn-hostname format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 92.9M | ✅ | 118.6M | 🔴 **+28%** |
| format.json | date format | 6 | ✅ | 92.8M | ✅ | 120.9M | 🔴 **+30%** |
| format.json | date-time format | 6 | ✅ | 92.4M | ✅ | 132.8M | 🔴 **+44%** |
| format.json | time format | 6 | ✅ | 93.0M | ✅ | 109.7M | +18% |
| format.json | json-pointer format | 6 | ✅ | 93.0M | ✅ | 133.0M | 🔴 **+43%** |
| format.json | relative-json-pointer format | 6 | ✅ | 92.8M | ✅ | 133.3M | 🔴 **+44%** |
| format.json | iri format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 93.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 83.9M | ✅ | 133.1M | 🔴 **+59%** |
| format.json | uri-reference format | 6 | ✅ | 90.7M | ✅ | 133.2M | 🔴 **+47%** |
| format.json | uri-template format | 6 | ✅ | 92.7M | ✅ | 124.7M | 🔴 **+35%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.9M | ✅ | 135.4M | 🔴 **+44%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ✅ | 135.4M | 🔴 **+44%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ✅ | 114.3M | 🔴 **+36%** |
| if-then-else.json | if and then without else | 3 | ✅ | 74.3M | ✅ | 77.1M | +4% |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ✅ | 95.2M | 🔴 **+24%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 70.6M | -2% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 128.0M | 🔴 **+52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.4M | ✅ | 62.7M | -17% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 80.8M | +7% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.2M | ✅ | 37.7M | -11% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ✅ | 25.2M | 🟢 **-44%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 43.9M | -20% |
| items.json | an array of schemas for items | 6 | ✅ | 68.1M | ✅ | 58.2M | -14% |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.8M | ✅ | 135.8M | 🔴 **+45%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 66.4M | -8% |
| items.json | items with boolean schemas | 3 | ✅ | 65.6M | ✅ | 78.3M | +19% |
| items.json | items and subitems | 6 | ✅ | 25.1M | ✅ | 7.9M | 🟢 **-69%** |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 6.8M | 🟢 **-45%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 69.3M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 99.4M | 🔴 **+26%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 83.0M | +14% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ✅ | 44.0M | 🟢 **-26%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.4M | ✅ | 51.3M | -9% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 68.6M | +17% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 47.9M | -4% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.0M | ✅ | 50.8M | +4% |
| maximum.json | maximum validation | 4 | ✅ | 78.6M | ✅ | 94.6M | 🔴 **+20%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 101.9M | 🔴 **+35%** |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 98.0M | 🔴 **+24%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 83.5M | +15% |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 35.7M | 🟢 **-39%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.7M | ✅ | 41.9M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 69.2M | +16% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ✅ | 48.8M | -4% |
| minimum.json | minimum validation | 4 | ✅ | 69.7M | ✅ | 97.3M | 🔴 **+40%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 90.4M | 🔴 **+25%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 82.2M | +6% |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 59.5M | -19% |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 27.3M | 🟢 **-59%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 17.1M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 76.9M | ✅ | 84.5M | +10% |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 71.6M | +1% |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 48.1M | 🟢 **-30%** |
| not.json | forbidden property | 2 | ✅ | 53.8M | ✅ | 59.7M | +11% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.0M | ✅ | 52.5M | -12% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.5M | ✅ | 63.2M | +4% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.2M | ✅ | 121.4M | 🔴 **+35%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 126.6M | 🔴 **+41%** |
| oneOf.json | oneOf | 4 | ✅ | 77.6M | ✅ | 70.9M | -9% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.9M | ✅ | 26.9M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.8M | ✅ | 64.1M | -3% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 125.5M | 🔴 **+40%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 65.0M | -2% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 64.7M | -2% |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.4M | ✅ | 28.8M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 86.4M | +14% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.0M | ✅ | 25.8M | 🟢 **-46%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 32.5M | 🟢 **-35%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.1M | ✅ | 87.1M | +14% |
| pattern.json | pattern validation | 8 | ✅ | 54.5M | ✅ | 72.1M | 🔴 **+32%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 63.2M | 🔴 **+149%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 16.3M | 🟢 **-40%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 14.6M | -3% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.9M | ✅ | 13.5M | -15% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ✅ | 18.1M | -14% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 21.2M | +18% |
| properties.json | object properties validation | 6 | ✅ | 56.4M | ✅ | 50.0M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 11.4M | 🟢 **-43%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 51.4M | +4% |
| properties.json | properties with escaped characters | 2 | ✅ | 52.9M | ✅ | 23.5M | 🟢 **-56%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.3M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ✅ | 28.7M | +1% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.7M | ✅ | 41.0M | +1% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 16.5M | -17% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 135.4M | 🔴 **+44%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.3M | ✅ | 25.2M | 🟢 **-51%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 29.9M | 🟢 **-26%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 31.0M | 🟢 **-27%** |
| ref.json | root pointer ref | 4 | ✅ | 26.0M | ✅ | 13.4M | 🟢 **-49%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.5M | ✅ | 26.7M | 🟢 **-46%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.3M | ✅ | 25.1M | 🟢 **-58%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.4M | ✅ | 29.8M | 🟢 **-33%** |
| ref.json | nested refs | 2 | ✅ | 39.1M | ✅ | 12.6M | 🟢 **-68%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 58.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.0M | ✅ | 49.0M | -11% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.4M | ✅ | 29.1M | 🟢 **-47%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 118.8M | 🔴 **+32%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 33.3M | 🟢 **-50%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ✅ | 2.7M | 🟢 **-69%** |
| ref.json | refs with quote | 2 | ✅ | 53.4M | ✅ | 29.3M | 🟢 **-45%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.0M | ✅ | 40.1M | 🟢 **-21%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.8M | ✅ | 43.6M | -14% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.2M | ✅ | 41.6M | -16% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 38.3M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.2M | ✅ | 10.2M | 🟢 **-69%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ✅ | 10.2M | 🟢 **-70%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.1M | ✅ | 43.5M | -13% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 25.1M | 🟢 **-43%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.6M | ✅ | 27.5M | 🟢 **-49%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.1M | ✅ | 27.6M | 🟢 **-49%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 51.0M | ✅ | 26.0M | 🟢 **-49%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.2M | ✅ | 27.1M | 🟢 **-45%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.8M | ✅ | 27.2M | 🟢 **-44%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.9M | ✅ | 27.6M | 🟢 **-36%** |
| ref.json | ref to if | 2 | ✅ | 50.4M | ✅ | 42.7M | -15% |
| ref.json | ref to then | 2 | ✅ | 50.3M | ✅ | 43.5M | -14% |
| ref.json | ref to else | 2 | ✅ | 49.0M | ✅ | 43.8M | -11% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.8M | ✅ | 43.0M | -15% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 43.7M | 🟢 **-43%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.8M | ✅ | 44.0M | 🟢 **-43%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.4M | ✅ | 39.7M | 🟢 **-44%** |
| refRemote.json | remote ref | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.6M | ✅ | 77.5M | +20% |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 125.4M | 🔴 **+39%** |
| required.json | required with empty array | 1 | ✅ | 89.6M | ✅ | 125.4M | 🔴 **+40%** |
| required.json | required with escaped characters | 2 | ✅ | 54.1M | ✅ | 24.0M | 🟢 **-56%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ✅ | 36.0M | 🔴 **+29%** |
| type.json | integer type matches integers | 9 | ✅ | 67.1M | ✅ | 65.1M | -3% |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 75.0M | +8% |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 73.1M | +5% |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 59.6M | +1% |
| type.json | array type matches arrays | 7 | ✅ | 63.9M | ✅ | 59.3M | -7% |
| type.json | boolean type matches booleans | 10 | ✅ | 66.6M | ✅ | 63.6M | -4% |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 60.4M | -8% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 71.4M | +8% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 87.6M | +14% |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 66.9M | -7% |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 73.6M | -5% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 8.0M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ✅ | 23.0M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 28.8M | 🔴 **+51%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.4M | ✅ | 130.9M | 🔴 **+43%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 46.1M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.6M | ✅ | 42.7M | 🟢 **-41%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 122.2M | 🔴 **+38%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 127.1M | 🔴 **+43%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 62.9M | -1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 111.2M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 60.6M | +1% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 111.2M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.8M | ✅ | 59.9M | +0% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 350K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 70.9M | 🔴 **+141%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 35.9M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 33.8M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 36.1M | 🔴 **+48%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 33.6M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 34.0M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 36.3M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 35.5M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 36.6M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 36.4M | ✅ | 33.5M | -8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 20.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 16.5M | +7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 15.8M | +6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.6M | ✅ | 33.5M | 🔴 **+21%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 26.6M | ✅ | 27.9M | +5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 19.3M | -16% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 12.7M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 14.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.9M | +10% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ✅ | 10.6M | 🔴 **+26%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ✅ | 15.9M | 🟢 **-25%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ✅ | 9.3M | 🟢 **-65%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ✅ | 23.4M | 🔴 **+175%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ✅ | 14.3M | 🟢 **-25%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.7M | ✅ | 35.4M | -9% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 17.8M | 🔴 **+47%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ✅ | 35.7M | +9% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.6M | ✅ | 941K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.6M | ✅ | 43.3M | +4% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 92.7M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 7.7M | 🟢 **-22%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ✅ | 18.5M | +14% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-25%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.5M | ✅ | 24.2M | 🟢 **-35%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ✅ | 38.7M | 🟢 **-35%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.4M | ✅ | 37.8M | 🟢 **-36%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 33.0M | +7% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ✅ | 9.9M | 🟢 **-43%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.7M | ✅ | 25.4M | 🔴 **+73%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 6.8M | -8% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 14.2M | ✅ | 24.7M | 🔴 **+74%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.8M | ✅ | 125.1M | -18% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 59.4M | ✅ | 98.3M | 🔴 **+65%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.3M | ✅ | 127.5M | 🟢 **-22%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 64.2M | ✅ | 69.3M | +8% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ✅ | 35.6M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.3M | ✅ | 28.5M | 🟢 **-26%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 79.3M | 🟢 **-26%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 63.2M | ✅ | 125.4M | 🔴 **+98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.4M | ✅ | 42.5M | -6% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.7M | ✅ | 24.5M | 🔴 **+24%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 28.2M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.8M | ✅ | 25.0M | -16% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 125.6M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.9M | ✅ | 16.4M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 26.4M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 23.6M | ✅ | 13.8M | 🟢 **-42%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.8M | ✅ | 9.1M | 🟢 **-70%** |
| allOf.json | allOf | 4 | ✅ | 34.5M | ✅ | 40.0M | +16% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 25.5M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 58.4M | ✅ | 81.9M | 🔴 **+40%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.6M | ✅ | 125.4M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 53.9M | ✅ | 64.9M | 🔴 **+20%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 65.2M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 63.4M | ✅ | 125.2M | 🔴 **+98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 126.1M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 87.9M | 🔴 **+44%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.9M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 60.8M | ✅ | 86.9M | 🔴 **+43%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 58.4M | 🟢 **-31%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 61.1M | ✅ | 18.7M | 🟢 **-69%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.0M | ✅ | 35.8M | 🟢 **-58%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 42.3M | ✅ | 35.8M | -15% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 60.2M | ✅ | 35.6M | 🟢 **-41%** |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 93.5M | 🔴 **+50%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.8M | ✅ | 27.8M | -13% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 69.6M | ✅ | 125.3M | 🔴 **+80%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 69.6M | ✅ | 125.6M | 🔴 **+80%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 54.0M | ✅ | 65.0M | 🔴 **+20%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 30.4M | 🟢 **-30%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 65.0M | ✅ | 135.5M | 🔴 **+109%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.6M | ✅ | 87.5M | 🔴 **+42%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 57.5M | ✅ | 138.6M | 🔴 **+141%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 51.7M | ✅ | 63.3M | 🔴 **+22%** |
| const.json | const validation | 3 | ✅ | 53.6M | ✅ | 60.7M | +13% |
| const.json | const with object | 4 | ✅ | 36.3M | ✅ | 32.6M | -10% |
| const.json | const with array | 3 | ✅ | 48.6M | ✅ | 8.7M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 61.7M | ✅ | 87.1M | 🔴 **+41%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ✅ | 74.4M | 🔴 **+27%** |
| const.json | const with true does not match 1 | 3 | ✅ | 57.8M | ✅ | 76.6M | 🔴 **+32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 53.1M | ✅ | 69.4M | 🔴 **+31%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 53.0M | ✅ | 70.3M | 🔴 **+33%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 53.5M | ✅ | 33.5M | 🟢 **-37%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.4M | ✅ | 33.7M | 🟢 **-37%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 51.9M | ✅ | 66.3M | 🔴 **+28%** |
| const.json | const with 1 does not match true | 3 | ✅ | 57.7M | ✅ | 91.3M | 🔴 **+58%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 54.4M | ✅ | 65.9M | 🔴 **+21%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 58.4M | ✅ | 81.5M | 🔴 **+39%** |
| const.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 74.5M | 🔴 **+40%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.2M | ✅ | 66.9M | 🔴 **+36%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.0M | ✅ | 75.2M | 🔴 **+39%** |
| contains.json | contains keyword validation | 6 | ✅ | 53.2M | ✅ | 20.2M | 🟢 **-62%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 51.1M | ✅ | 14.4M | 🟢 **-72%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 57.8M | ✅ | 73.1M | 🔴 **+27%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 56.5M | ✅ | 40.5M | 🟢 **-28%** |
| contains.json | items + contains | 4 | ✅ | 34.9M | ✅ | 18.1M | 🟢 **-48%** |
| contains.json | contains with false if subschema | 2 | ✅ | 56.3M | ✅ | 73.2M | 🔴 **+30%** |
| contains.json | contains with null instance elements | 1 | ✅ | 62.0M | ✅ | 38.3M | 🟢 **-38%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 71.8M | ✅ | 137.9M | 🔴 **+92%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 72.1M | ✅ | 138.4M | 🔴 **+92%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 64.6M | ✅ | 139.2M | 🔴 **+116%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 60.6M | ✅ | 133.2M | 🔴 **+120%** |
| default.json | invalid type for default | 2 | ✅ | 54.3M | ✅ | 75.6M | 🔴 **+39%** |
| default.json | invalid string value for default | 2 | ✅ | 46.2M | ✅ | 45.4M | -2% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 44.1M | ✅ | 57.1M | 🔴 **+30%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 52.5M | ✅ | 72.4M | 🔴 **+38%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 71.9M | ✅ | 137.6M | 🔴 **+92%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.9M | ✅ | 31.7M | 🔴 **+22%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ✅ | 40.3M | -4% |
| dependentSchemas.json | single dependency | 8 | ✅ | 46.3M | ✅ | 48.5M | +5% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.5M | ✅ | 55.0M | +18% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.4M | ✅ | 35.5M | -2% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.7M | ✅ | 27.0M | -20% |
| enum.json | simple enum validation | 2 | ✅ | 60.1M | ✅ | 86.1M | 🔴 **+43%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 40.7M | ✅ | 38.8M | -5% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.7M | ✅ | 88.8M | 🔴 **+49%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 41.0M | 🔴 **+193%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 88.9M | 🔴 **+46%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 59.2M | ✅ | 76.3M | 🔴 **+29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.1M | ✅ | 68.2M | 🔴 **+28%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 46.0M | ✅ | 77.6M | 🔴 **+69%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.4M | ✅ | 68.5M | 🔴 **+42%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.2M | ✅ | 89.2M | 🔴 **+53%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 54.5M | ✅ | 80.6M | 🔴 **+48%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 57.7M | ✅ | 91.4M | 🔴 **+58%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 54.4M | ✅ | 79.1M | 🔴 **+45%** |
| enum.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 73.4M | 🔴 **+38%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.6M | ✅ | 78.6M | 🔴 **+65%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 52.9M | ✅ | 79.7M | 🔴 **+51%** |
| format.json | email format | 6 | ✅ | 67.1M | ✅ | 129.3M | 🔴 **+93%** |
| format.json | idn-email format | 6 | ✅ | 67.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 59.6M | ✅ | 131.2M | 🔴 **+120%** |
| format.json | ipv4 format | 6 | ✅ | 59.6M | ✅ | 125.2M | 🔴 **+110%** |
| format.json | ipv6 format | 6 | ✅ | 58.5M | ✅ | 115.4M | 🔴 **+97%** |
| format.json | idn-hostname format | 6 | ✅ | 59.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 59.4M | ✅ | 132.9M | 🔴 **+124%** |
| format.json | date format | 6 | ✅ | 59.8M | ✅ | 109.8M | 🔴 **+84%** |
| format.json | date-time format | 6 | ✅ | 59.6M | ✅ | 128.6M | 🔴 **+116%** |
| format.json | time format | 6 | ✅ | 59.6M | ✅ | 119.5M | 🔴 **+101%** |
| format.json | json-pointer format | 6 | ✅ | 59.7M | ✅ | 132.4M | 🔴 **+122%** |
| format.json | relative-json-pointer format | 6 | ✅ | 67.2M | ✅ | 118.1M | 🔴 **+76%** |
| format.json | iri format | 6 | ✅ | 59.5M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 59.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 59.6M | ✅ | 132.6M | 🔴 **+122%** |
| format.json | uri-reference format | 6 | ✅ | 59.8M | ✅ | 122.5M | 🔴 **+105%** |
| format.json | uri-template format | 6 | ✅ | 59.2M | ✅ | 118.9M | 🔴 **+101%** |
| format.json | uuid format | 6 | ✅ | 59.6M | ✅ | 118.3M | 🔴 **+99%** |
| format.json | duration format | 6 | ✅ | 59.5M | ✅ | 132.4M | 🔴 **+123%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 64.8M | ✅ | 134.5M | 🔴 **+108%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 71.4M | ✅ | 135.0M | 🔴 **+89%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 64.8M | ✅ | 135.1M | 🔴 **+108%** |
| if-then-else.json | if and then without else | 3 | ✅ | 60.3M | ✅ | 90.3M | 🔴 **+50%** |
| if-then-else.json | if and else without then | 3 | ✅ | 60.0M | ✅ | 95.0M | 🔴 **+58%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.7M | ✅ | 80.7M | 🔴 **+40%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 64.4M | ✅ | 127.7M | 🔴 **+98%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 59.9M | ✅ | 85.4M | 🔴 **+43%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.1M | ✅ | 80.9M | 🔴 **+35%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.1M | ✅ | 37.7M | +2% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ✅ | 22.1M | 🟢 **-42%** |
| items.json | a schema given for items | 4 | ✅ | 35.4M | ✅ | 43.5M | 🔴 **+23%** |
| items.json | an array of schemas for items | 6 | ✅ | 54.4M | ✅ | 59.6M | +9% |
| items.json | items with boolean schema (true) | 2 | ✅ | 71.2M | ✅ | 135.6M | 🔴 **+90%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 57.5M | ✅ | 66.6M | +16% |
| items.json | items with boolean schemas | 3 | ✅ | 48.8M | ✅ | 79.9M | 🔴 **+64%** |
| items.json | items and subitems | 6 | ✅ | 24.2M | ✅ | 8.3M | 🟢 **-66%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 6.8M | 🟢 **-42%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 60.7M | ✅ | 65.9M | +9% |
| items.json | array-form items with null instance e... | 1 | ✅ | 57.6M | ✅ | 69.3M | 🔴 **+20%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 71.3M | ✅ | 134.4M | 🔴 **+88%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.3M | ✅ | 24.5M | 🟢 **-57%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.4M | ✅ | 23.2M | 🟢 **-57%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 46.5M | ✅ | 20.7M | 🟢 **-55%** |
| maxItems.json | maxItems validation | 4 | ✅ | 51.4M | ✅ | 100.3M | 🔴 **+95%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 40.2M | ✅ | 83.6M | 🔴 **+108%** |
| maxLength.json | maxLength validation | 5 | ✅ | 49.5M | ✅ | 38.7M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 44.4M | ✅ | 51.7M | +17% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 45.3M | ✅ | 68.7M | 🔴 **+52%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 48.4M | +17% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 38.7M | ✅ | 51.2M | 🔴 **+32%** |
| maximum.json | maximum validation | 4 | ✅ | 57.8M | ✅ | 99.8M | 🔴 **+73%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 53.2M | ✅ | 102.4M | 🔴 **+93%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 71.0M | ✅ | 135.3M | 🔴 **+91%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 48.2M | ✅ | 30.2M | 🟢 **-37%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 45.5M | ✅ | 23.8M | 🟢 **-48%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 54.4M | ✅ | 25.1M | 🟢 **-54%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 46.5M | ✅ | 23.6M | 🟢 **-49%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 46.1M | ✅ | 23.6M | 🟢 **-49%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 71.2M | ✅ | 54.3M | 🟢 **-24%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 56.0M | ✅ | 32.2M | 🟢 **-43%** |
| minItems.json | minItems validation | 4 | ✅ | 53.5M | ✅ | 99.2M | 🔴 **+86%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 58.4M | ✅ | 82.8M | 🔴 **+42%** |
| minLength.json | minLength validation | 5 | ✅ | 46.2M | ✅ | 35.6M | 🟢 **-23%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 46.0M | ✅ | 49.7M | +8% |
| minProperties.json | minProperties validation | 6 | ✅ | 48.9M | ✅ | 69.1M | 🔴 **+41%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 35.1M | ✅ | 50.4M | 🔴 **+44%** |
| minimum.json | minimum validation | 4 | ✅ | 59.8M | ✅ | 98.2M | 🔴 **+64%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.4M | ✅ | 90.5M | 🔴 **+58%** |
| multipleOf.json | by int | 3 | ✅ | 57.6M | ✅ | 96.5M | 🔴 **+68%** |
| multipleOf.json | by number | 3 | ✅ | 30.0M | ✅ | 59.7M | 🔴 **+99%** |
| multipleOf.json | by small number | 2 | ✅ | 54.5M | ✅ | 27.3M | 🟢 **-50%** |
| multipleOf.json | float division = inf | 1 | ✅ | 48.6M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 60.5M | ✅ | 17.2M | 🟢 **-72%** |
| not.json | not | 2 | ✅ | 50.8M | ✅ | 85.7M | 🔴 **+69%** |
| not.json | not multiple types | 3 | ✅ | 50.8M | ✅ | 71.7M | 🔴 **+41%** |
| not.json | not more complex schema | 3 | ✅ | 53.6M | ✅ | 48.0M | -10% |
| not.json | forbidden property | 2 | ✅ | 39.6M | ✅ | 56.5M | 🔴 **+43%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 27.5M | ✅ | 62.6M | 🔴 **+128%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 51.6M | ✅ | 58.5M | +13% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 35.3M | ✅ | 134.0M | 🔴 **+280%** |
| not.json | double negation | 1 | ✅ | 67.0M | ✅ | 125.4M | 🔴 **+87%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 27.2M | ✅ | 14.7M | 🟢 **-46%** |
| oneOf.json | oneOf | 4 | ✅ | 51.4M | ✅ | 73.0M | 🔴 **+42%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.8M | ✅ | 26.2M | -12% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 53.9M | ✅ | 62.9M | +17% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 69.8M | ✅ | 60.1M | -14% |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 47.3M | ✅ | 63.3M | 🔴 **+34%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 53.7M | ✅ | 63.2M | +18% |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.6M | ✅ | 28.4M | 🟢 **-26%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.4M | ✅ | 85.3M | 🔴 **+41%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.0M | ✅ | 26.0M | 🟢 **-38%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 42.6M | ✅ | 32.5M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.5M | ✅ | 86.3M | 🔴 **+43%** |
| pattern.json | pattern validation | 8 | ✅ | 46.4M | ✅ | 68.7M | 🔴 **+48%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.5M | ✅ | 56.3M | 🔴 **+174%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 22.6M | ✅ | 17.5M | 🟢 **-22%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.3M | ✅ | 14.8M | +4% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.6M | ✅ | 13.4M | -2% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.6M | ✅ | 18.5M | -1% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.1M | ✅ | 22.7M | 🔴 **+33%** |
| properties.json | object properties validation | 6 | ✅ | 46.4M | ✅ | 52.8M | +14% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.9M | ✅ | 12.2M | 🟢 **-32%** |
| properties.json | properties with boolean schema | 4 | ✅ | 41.6M | ✅ | 53.5M | 🔴 **+29%** |
| properties.json | properties with escaped characters | 2 | ✅ | 41.0M | ✅ | 24.0M | 🟢 **-41%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.2M | ✅ | 58.1M | +2% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 22.7M | ✅ | 28.3M | 🔴 **+25%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 35.7M | ✅ | 38.2M | +7% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ✅ | 15.9M | -14% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 61.8M | ✅ | 130.6M | 🔴 **+111%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.4M | ✅ | 25.1M | 🟢 **-41%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.0M | ✅ | 30.4M | -13% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.1M | ✅ | 33.4M | -10% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.8M | ✅ | 13.2M | +3% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.5M | ✅ | 10.5M | 🔴 **+89%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 10.1M | 🔴 **+253%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.1M | ✅ | 10.7M | -4% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 10.8M | ✅ | 10.9M | +1% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.6M | ✅ | 14.6M | 🔴 **+71%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.6M | ✅ | 15.0M | 🔴 **+97%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.9M | ✅ | 4.3M | +12% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 4.3M | +6% |
| ref.json | root pointer ref | 4 | ✅ | 20.0M | ✅ | 13.7M | 🟢 **-32%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.9M | ✅ | 28.0M | 🟢 **-35%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.8M | ✅ | 24.7M | 🟢 **-47%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.3M | ✅ | 28.6M | 🟢 **-29%** |
| ref.json | nested refs | 2 | ✅ | 34.6M | ✅ | 11.3M | 🟢 **-67%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.2M | ✅ | 29.9M | 🟢 **-22%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 43.9M | ✅ | 47.2M | +7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.9M | ✅ | 28.5M | 🟢 **-35%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 54.8M | ✅ | 119.1M | 🔴 **+117%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.0M | ✅ | 35.0M | 🟢 **-35%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ✅ | 2.6M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 28.7M | 🟢 **-35%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 23.6M | ✅ | 10.4M | 🟢 **-56%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.6M | ✅ | 37.8M | -19% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 30.7M | ✅ | 10.2M | 🟢 **-67%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.0M | ✅ | 10.8M | 🟢 **-64%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 42.4M | ✅ | 43.1M | +2% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 39.0M | ✅ | 36.3M | -7% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 59.0M | ✅ | 42.0M | 🟢 **-29%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 34.3M | ✅ | 24.7M | 🟢 **-28%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.0M | ✅ | 24.5M | 🟢 **-30%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 39.6M | ✅ | 28.7M | 🟢 **-27%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 36.8M | ✅ | 28.8M | 🟢 **-22%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 37.2M | ✅ | 28.8M | 🟢 **-23%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 37.5M | ✅ | 27.6M | 🟢 **-26%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 41.3M | ✅ | 27.7M | 🟢 **-33%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.7M | ✅ | 27.8M | 🟢 **-37%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 36.0M | ✅ | 24.9M | 🟢 **-31%** |
| ref.json | ref to if | 2 | ✅ | 39.9M | ✅ | 38.0M | -5% |
| ref.json | ref to then | 2 | ✅ | 42.8M | ✅ | 38.6M | -10% |
| ref.json | ref to else | 2 | ✅ | 37.3M | ✅ | 33.5M | -10% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 39.4M | ✅ | 33.6M | -15% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.1M | ✅ | 33.3M | 🟢 **-45%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.2M | ✅ | 33.6M | 🟢 **-45%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.1M | ✅ | 43.5M | 🟢 **-29%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.5M | ✅ | 18.4M | 🔴 **+307%** |
| refRemote.json | remote ref | 2 | ✅ | 42.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 41.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 32.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 35.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 42.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 35.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 76.0M | 🔴 **+43%** |
| required.json | required default validation | 1 | ✅ | 68.3M | ✅ | 121.4M | 🔴 **+78%** |
| required.json | required with empty array | 1 | ✅ | 69.8M | ✅ | 121.6M | 🔴 **+74%** |
| required.json | required with escaped characters | 2 | ✅ | 43.2M | ✅ | 23.5M | 🟢 **-46%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.4M | ✅ | 34.9M | 🔴 **+38%** |
| type.json | integer type matches integers | 9 | ✅ | 53.9M | ✅ | 63.2M | +17% |
| type.json | number type matches numbers | 9 | ✅ | 54.9M | ✅ | 66.5M | 🔴 **+21%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 66.8M | 🔴 **+21%** |
| type.json | object type matches objects | 7 | ✅ | 48.5M | ✅ | 57.4M | +18% |
| type.json | array type matches arrays | 7 | ✅ | 51.3M | ✅ | 59.7M | +16% |
| type.json | boolean type matches booleans | 10 | ✅ | 37.6M | ✅ | 63.9M | 🔴 **+70%** |
| type.json | null type matches only the null object | 10 | ✅ | 50.7M | ✅ | 58.6M | +16% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.1M | ✅ | 65.4M | 🔴 **+23%** |
| type.json | type as array with one item | 2 | ✅ | 60.9M | ✅ | 83.7M | 🔴 **+38%** |
| type.json | type: array or object | 5 | ✅ | 54.2M | ✅ | 66.4M | 🔴 **+22%** |
| type.json | type: array, object or null | 5 | ✅ | 57.2M | ✅ | 73.5M | 🔴 **+28%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 65.2M | ✅ | 129.3M | 🔴 **+98%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 47.5M | ✅ | 80.1M | 🔴 **+69%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 43.6M | ✅ | 53.6M | 🔴 **+23%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 57.4M | ✅ | 45.2M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.1M | ✅ | 52.0M | +15% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 62.9M | ✅ | 67.9M | +8% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 37.5M | ✅ | 29.1M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 33.0M | ✅ | 27.9M | -15% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 42.3M | ✅ | 34.7M | -18% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.5M | ✅ | 14.4M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 64.1M | ✅ | 70.7M | +10% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.6M | ✅ | 70.6M | 🔴 **+261%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.7M | ✅ | 16.0M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.7M | ✅ | 23.8M | 🔴 **+62%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.9M | ✅ | 28.0M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.8M | ✅ | 14.6M | 🔴 **+35%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 47.6M | ✅ | 80.2M | 🔴 **+69%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 41.8M | ✅ | 34.5M | -18% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 41.9M | ✅ | 35.0M | -16% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.5M | ✅ | 58.0M | 🔴 **+47%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.0M | ✅ | 27.8M | 🔴 **+21%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 54.3M | ✅ | 126.5M | 🔴 **+133%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 60.8M | ✅ | 63.8M | +5% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.3M | ✅ | 20.0M | -2% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.9M | ✅ | 32.0M | -13% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 48.8M | ✅ | 98.6M | 🔴 **+102%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 29.8M | ✅ | 23.2M | 🟢 **-22%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.2M | ✅ | 25.0M | -20% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.5M | ✅ | 20.6M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ✅ | 15.2M | 🔴 **+36%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 56.2M | ✅ | 58.0M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.8M | ✅ | 17.5M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.3M | ✅ | 12.1M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 56.3M | ✅ | 58.0M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.8M | ✅ | 55.8M | 🔴 **+94%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ✅ | 5.7M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.1M | ✅ | 9.7M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.4M | ✅ | 12.0M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.6M | ✅ | 7.4M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.8M | ✅ | 10.7M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.2M | ✅ | 6.6M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ✅ | 12.1M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.9M | ✅ | 22.2M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.8M | ✅ | 15.6M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.7M | ✅ | 15.9M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 25.3M | ✅ | 16.4M | 🟢 **-35%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 24.9M | ✅ | 16.6M | 🟢 **-33%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ✅ | 58.0M | 🔴 **+101%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.0M | ✅ | 58.0M | 🔴 **+108%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.9M | ✅ | 14.6M | 🟢 **-39%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ✅ | 20.6M | -19% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.6M | ✅ | 14.6M | 🟢 **-25%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ✅ | 20.6M | 🔴 **+79%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.6M | ✅ | 15.5M | 🟢 **-37%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 28.5M | ✅ | 20.9M | 🟢 **-27%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 33.5M | ✅ | 21.6M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.0M | ✅ | 10.3M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 16.5M | ✅ | 9.0M | 🟢 **-46%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 6.9M | ✅ | 2.7M | 🟢 **-61%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 60.6M | ✅ | 118.6M | 🔴 **+96%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 44.8M | ✅ | 51.0M | +14% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 23.5M | ✅ | 21.5M | -8% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ✅ | 4.0M | 🟢 **-68%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.4M | ✅ | 12.7M | 🟢 **-38%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 20.2M | ✅ | 12.0M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.3M | ✅ | 7.9M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.2M | ✅ | 24.0M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 29.6M | 🔴 **+66%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 67.3M | ✅ | 127.2M | 🔴 **+89%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 49.9M | ✅ | 46.3M | -7% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 41.9M | 🟢 **-22%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 44.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 61.5M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 49.9M | ✅ | 24.4M | 🟢 **-51%** |
| optional/bignum.json | integer | 2 | ✅ | 67.6M | ✅ | 112.2M | 🔴 **+66%** |
| optional/bignum.json | number | 2 | ✅ | 68.2M | ✅ | 121.7M | 🔴 **+79%** |
| optional/bignum.json | string | 1 | ✅ | 50.9M | ✅ | 61.2M | 🔴 **+20%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 63.3M | ✅ | 107.5M | 🔴 **+70%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.1M | ✅ | 59.9M | +20% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.3M | ✅ | 107.7M | 🔴 **+70%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ✅ | 59.7M | +19% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 13.3M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 58.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 33.7M | ✅ | 69.8M | 🔴 **+107%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 69.4M | ✅ | 131.8M | 🔴 **+90%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.6M | ✅ | 30.6M | +3% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ✅ | 39.3M | -6% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 46.4M | ✅ | 47.0M | +1% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 47.5M | ✅ | 53.6M | +13% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 36.0M | ✅ | 35.5M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.1M | ✅ | 59.9M | 🔴 **+138%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 34.9M | 🔴 **+84%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 34.6M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 33.3M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.6M | ✅ | 33.4M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.2M | ✅ | 34.6M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.5M | ✅ | 35.4M | 🔴 **+44%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.4M | ✅ | 33.0M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.2M | ✅ | 34.0M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 32.9M | +20% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ✅ | 19.7M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 16.2M | +10% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.1M | ✅ | 14.4M | +2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.6M | ✅ | 32.8M | 🔴 **+28%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.9M | ✅ | 24.7M | 🔴 **+31%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.1M | ✅ | 20.3M | -4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 13.4M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 15.0M | -19% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 8.2M | +6% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ✅ | 10.6M | 🔴 **+35%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 14.4M | ✅ | 16.0M | +11% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ✅ | 9.4M | 🟢 **-60%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ✅ | 23.9M | 🔴 **+182%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.2M | ✅ | 14.1M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ✅ | 13.9M | 🟢 **-22%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ✅ | 34.9M | -10% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.2M | ✅ | 17.2M | 🔴 **+54%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ✅ | 35.0M | 🔴 **+20%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 54.4M | ✅ | 923K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.4M | ✅ | 42.2M | +16% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 68.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.4M | ✅ | 7.8M | -17% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.7M | ✅ | 18.7M | 🔴 **+27%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.7M | 🟢 **-25%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 13.8M | ✅ | 15.6M | +13% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 30.3M | ✅ | 24.3M | -20% |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 52.9M | ✅ | 61.3M | +16% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.8M | ✅ | 27.7M | -1% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ✅ | 9.9M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.1M | ✅ | 27.8M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 43.8M | ✅ | 28.7M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.1M | ✅ | 26.5M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 60.6M | ✅ | 37.9M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 43.1M | ✅ | 27.2M | 🟢 **-37%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.1M | ✅ | 24.4M | 🔴 **+87%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 58.6M | 🔴 **+47%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 21.2M | -3% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 27.9M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.5M | ✅ | 25.2M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 125.0M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 16.6M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 47.7M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.3M | ✅ | 12.6M | 🟢 **-50%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.0M | ✅ | 9.4M | 🟢 **-70%** |
| allOf.json | allOf | 4 | ✅ | 39.6M | ✅ | 39.2M | -1% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.0M | ✅ | 25.1M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 83.5M | +15% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 125.4M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.9M | ✅ | 64.0M | -3% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.5M | ✅ | 63.1M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 90.0M | ✅ | 125.5M | 🔴 **+39%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 125.3M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 85.6M | +11% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 66.6M | 🟢 **-43%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 86.5M | +10% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ✅ | 55.5M | 🟢 **-33%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 34.1M | 🟢 **-56%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.0M | ✅ | 34.7M | 🟢 **-60%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.8M | ✅ | 21.1M | 🟢 **-58%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ✅ | 34.8M | 🟢 **-55%** |
| anyOf.json | anyOf | 4 | ✅ | 82.4M | ✅ | 89.5M | +9% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.2M | ✅ | 27.1M | 🟢 **-25%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 125.1M | 🔴 **+39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 90.0M | ✅ | 125.4M | 🔴 **+39%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 65.9M | ✅ | 60.6M | -8% |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.2M | ✅ | 30.9M | 🟢 **-39%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 82.0M | ✅ | 135.5M | 🔴 **+65%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 84.8M | +8% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.6M | ✅ | 125.2M | 🔴 **+57%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 63.8M | ✅ | 63.0M | -1% |
| const.json | const validation | 3 | ✅ | 64.2M | ✅ | 67.3M | +5% |
| const.json | const with object | 4 | ✅ | 40.9M | ✅ | 32.3M | 🟢 **-21%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 9.2M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 78.4M | ✅ | 84.1M | +7% |
| const.json | const with false does not match 0 | 3 | ✅ | 74.9M | ✅ | 66.6M | -11% |
| const.json | const with true does not match 1 | 3 | ✅ | 75.9M | ✅ | 72.3M | -5% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 62.7M | -6% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.0M | ✅ | 39.8M | 🟢 **-40%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 61.6M | ✅ | 33.5M | 🟢 **-46%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.6M | ✅ | 30.6M | 🟢 **-55%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 62.7M | -1% |
| const.json | const with 1 does not match true | 3 | ✅ | 68.7M | ✅ | 82.4M | +20% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 70.0M | ✅ | 68.6M | -2% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.0M | ✅ | 74.9M | +3% |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 72.6M | +12% |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 49.0M | -16% |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 75.0M | +13% |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ✅ | 19.2M | 🟢 **-70%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.3M | ✅ | 14.7M | 🟢 **-74%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 72.7M | +1% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.1M | ✅ | 40.6M | 🟢 **-42%** |
| contains.json | items + contains | 4 | ✅ | 42.2M | ✅ | 18.7M | 🟢 **-56%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 60.8M | -12% |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 28.2M | 🟢 **-63%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.0M | ✅ | 68.9M | 🟢 **-28%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 95.9M | ✅ | 122.2M | 🔴 **+27%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.3M | ✅ | 64.1M | 🟢 **-23%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 89.5M | ✅ | 124.5M | 🔴 **+39%** |
| default.json | invalid type for default | 2 | ✅ | 71.4M | ✅ | 75.4M | +6% |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 20.4M | 🟢 **-63%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.7M | ✅ | 53.1M | -3% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 32.8M | ✅ | 63.2M | 🔴 **+93%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 138.0M | 🔴 **+44%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.8M | ✅ | 30.5M | +6% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ✅ | 37.5M | 🟢 **-24%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.8M | ✅ | 47.6M | -15% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.6M | ✅ | 54.4M | 0% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.9M | ✅ | 34.3M | -16% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.9M | ✅ | 25.0M | 🟢 **-34%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ✅ | 3.5M | 🟢 **-73%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.7M | ✅ | 20.2M | -3% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ✅ | 21.5M | 🔴 **+33%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.3M | ✅ | 2.3M | 🟢 **-79%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.4M | ✅ | 5.5M | 🟢 **-59%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.7M | ✅ | 2.7M | 🟢 **-75%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.7M | ✅ | 6.2M | -19% |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 16.4M | ✅ | 18.3M | +11% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.3M | ✅ | 8.5M | 🟢 **-25%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.0M | ✅ | 2.1M | 🟢 **-74%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.9M | ✅ | 13.3M | -11% |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ✅ | 2.1M | 🟢 **-64%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.6M | ✅ | 1.5M | 🟢 **-78%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.1M | ✅ | 28.2M | +1% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.9M | ✅ | 2.5M | 🟢 **-68%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.1M | ✅ | 84.1M | +12% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.1M | ✅ | 38.4M | -19% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.1M | ✅ | 85.0M | +15% |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 39.6M | 🔴 **+170%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.8M | ✅ | 93.6M | +16% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 74.7M | ✅ | 63.5M | -15% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.8M | ✅ | 64.7M | 🔴 **+20%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.7M | ✅ | 73.8M | -2% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.6M | ✅ | 48.3M | 🟢 **-25%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.2M | ✅ | 82.0M | +10% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.4M | ✅ | 75.6M | +11% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 71.8M | ✅ | 83.9M | +17% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.3M | ✅ | 71.9M | +5% |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 73.2M | +13% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 71.0M | 0% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 73.9M | +4% |
| format.json | email format | 7 | ✅ | 95.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 95.0M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 76.1M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 77.6M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 96.2M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 95.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 73.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 78.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 78.6M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 77.6M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.1M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 78.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 134.8M | 🔴 **+60%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.2M | ✅ | 135.6M | 🔴 **+46%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.0M | ✅ | 135.4M | 🔴 **+61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.6M | ✅ | 90.9M | +17% |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ✅ | 93.5M | 🔴 **+22%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 80.6M | +12% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.1M | ✅ | 128.0M | 🔴 **+52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.9M | ✅ | 82.8M | +9% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 78.6M | +4% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.8M | ✅ | 35.0M | -16% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.0M | ✅ | 25.1M | 🟢 **-44%** |
| items.json | a schema given for items | 4 | ✅ | 54.7M | ✅ | 43.9M | -20% |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 134.1M | 🔴 **+43%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.1M | ✅ | 76.8M | +8% |
| items.json | items and subitems | 6 | ✅ | 19.5M | ✅ | 8.1M | 🟢 **-59%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 6.8M | 🟢 **-45%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ✅ | 101.7M | 🔴 **+26%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.6M | ✅ | 32.5M | 🟢 **-30%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.4M | ✅ | 28.6M | 🟢 **-37%** |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 75.4M | +4% |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 128.1M | 🔴 **+37%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.7M | ✅ | 24.7M | 🟢 **-57%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 24.7M | 🟢 **-63%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 60.7M | ✅ | 20.9M | 🟢 **-66%** |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 99.1M | 🔴 **+25%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 83.2M | +15% |
| maxLength.json | maxLength validation | 5 | ✅ | 58.2M | ✅ | 43.4M | 🟢 **-26%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 48.7M | -14% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 64.0M | +9% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.3M | ✅ | 47.5M | -4% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ✅ | 50.2M | -2% |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 95.9M | 🔴 **+25%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 100.8M | 🔴 **+33%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 92.9M | ✅ | 135.3M | 🔴 **+46%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.5M | ✅ | 30.2M | 🟢 **-58%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ✅ | 23.7M | 🟢 **-61%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.8M | ✅ | 25.1M | 🟢 **-62%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 61.0M | ✅ | 24.9M | 🟢 **-59%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.7M | ✅ | 23.5M | 🟢 **-60%** |
| minContains.json | minContains = 0 | 2 | ✅ | 93.5M | ✅ | 54.5M | 🟢 **-42%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.8M | ✅ | 31.2M | 🟢 **-57%** |
| minItems.json | minItems validation | 4 | ✅ | 79.0M | ✅ | 95.9M | 🔴 **+21%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 82.0M | +13% |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 35.5M | 🟢 **-39%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 50.4M | -11% |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 69.3M | +16% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.5M | ✅ | 48.3M | +4% |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 95.1M | 🔴 **+24%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 89.1M | 🔴 **+23%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 88.9M | +14% |
| multipleOf.json | by number | 3 | ✅ | 70.0M | ✅ | 59.3M | -15% |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 27.1M | 🟢 **-59%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 17.2M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 85.0M | +10% |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 69.7M | -2% |
| not.json | not more complex schema | 3 | ✅ | 68.7M | ✅ | 49.9M | 🟢 **-27%** |
| not.json | forbidden property | 2 | ✅ | 52.0M | ✅ | 58.3M | +12% |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.5M | ✅ | 60.3M | +9% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.5M | ✅ | 56.3M | -7% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 138.3M | 🔴 **+54%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 125.5M | 🔴 **+40%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.3M | ✅ | 14.5M | 🟢 **-58%** |
| oneOf.json | oneOf | 4 | ✅ | 66.9M | ✅ | 71.6M | +7% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.9M | ✅ | 25.7M | 🟢 **-30%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 59.9M | -9% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 121.1M | 🔴 **+35%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 57.8M | -13% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 59.7M | -10% |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 28.5M | 🟢 **-36%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 83.0M | +9% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 25.7M | 🟢 **-47%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 32.4M | 🟢 **-35%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 82.9M | +9% |
| pattern.json | pattern validation | 8 | ✅ | 55.9M | ✅ | 69.5M | 🔴 **+24%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 56.3M | 🔴 **+122%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 17.8M | 🟢 **-33%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ✅ | 13.5M | -12% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ✅ | 12.4M | 🟢 **-24%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.5M | ✅ | 18.0M | -16% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.1M | ✅ | 20.9M | 🔴 **+39%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.2M | ✅ | 57.4M | -16% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.3M | ✅ | 73.4M | +12% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 67.9M | -16% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 64.2M | 🟢 **-21%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 50.2M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 11.7M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.3M | ✅ | 45.7M | -7% |
| properties.json | properties with escaped characters | 2 | ✅ | 51.0M | ✅ | 24.1M | 🟢 **-53%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 58.1M | -17% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ✅ | 28.6M | +0% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ✅ | 39.3M | -4% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 15.7M | 🟢 **-21%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 130.7M | 🔴 **+39%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.6M | ✅ | 25.0M | 🟢 **-51%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 29.4M | 🟢 **-28%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.7M | ✅ | 33.0M | 🟢 **-23%** |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 14.4M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.5M | ✅ | 28.7M | 🟢 **-47%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 23.1M | 🟢 **-59%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 28.7M | 🟢 **-40%** |
| ref.json | nested refs | 2 | ✅ | 38.9M | ✅ | 11.3M | 🟢 **-71%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.8M | ✅ | 29.5M | 🟢 **-33%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.2M | ✅ | 47.3M | -9% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.3M | ✅ | 28.7M | 🟢 **-46%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 119.3M | 🔴 **+33%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 64.8M | ✅ | 34.3M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 2.7M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 28.6M | 🟢 **-45%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.9M | ✅ | 10.2M | 🟢 **-62%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 38.0M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.8M | ✅ | 10.4M | 🟢 **-68%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.0M | ✅ | 10.5M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.5M | ✅ | 41.6M | -18% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.8M | ✅ | 40.8M | -20% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ✅ | 41.9M | 🟢 **-43%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.2M | ✅ | 24.6M | 🟢 **-37%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.7M | ✅ | 24.5M | 🟢 **-43%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.7M | ✅ | 28.7M | 🟢 **-46%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 51.8M | ✅ | 28.7M | 🟢 **-44%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ✅ | 28.7M | 🟢 **-41%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.1M | ✅ | 28.7M | 🟢 **-41%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ✅ | 27.7M | 🟢 **-43%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.2M | ✅ | 28.8M | 🟢 **-43%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.2M | ✅ | 24.7M | 🟢 **-52%** |
| ref.json | ref to if | 2 | ✅ | 45.2M | ✅ | 37.1M | -18% |
| ref.json | ref to then | 2 | ✅ | 50.1M | ✅ | 38.3M | 🟢 **-24%** |
| ref.json | ref to else | 2 | ✅ | 48.1M | ✅ | 36.5M | 🟢 **-24%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.4M | ✅ | 35.2M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.0M | ✅ | 34.7M | 🟢 **-54%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.8M | ✅ | 35.3M | 🟢 **-54%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.1M | ✅ | 42.6M | 🟢 **-39%** |
| refRemote.json | remote ref | 2 | ✅ | 49.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.1M | ✅ | 76.4M | +17% |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 121.5M | 🔴 **+35%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 119.6M | 🔴 **+33%** |
| required.json | required with escaped characters | 2 | ✅ | 53.5M | ✅ | 23.4M | 🟢 **-56%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.6M | ✅ | 34.6M | 🔴 **+25%** |
| type.json | integer type matches integers | 9 | ✅ | 65.6M | ✅ | 59.8M | -9% |
| type.json | number type matches numbers | 9 | ✅ | 67.2M | ✅ | 63.9M | -5% |
| type.json | string type matches strings | 9 | ✅ | 65.8M | ✅ | 63.7M | -3% |
| type.json | object type matches objects | 7 | ✅ | 57.5M | ✅ | 51.9M | -10% |
| type.json | array type matches arrays | 7 | ✅ | 63.0M | ✅ | 54.2M | -14% |
| type.json | boolean type matches booleans | 10 | ✅ | 65.4M | ✅ | 59.6M | -9% |
| type.json | null type matches only the null object | 10 | ✅ | 65.0M | ✅ | 58.4M | -10% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.0M | ✅ | 59.5M | -8% |
| type.json | type as array with one item | 2 | ✅ | 76.3M | ✅ | 82.0M | +7% |
| type.json | type: array or object | 5 | ✅ | 71.6M | ✅ | 65.0M | -9% |
| type.json | type: array, object or null | 5 | ✅ | 74.8M | ✅ | 76.7M | +3% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.8M | ✅ | 130.5M | 🔴 **+57%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.8M | ✅ | 77.9M | 🔴 **+28%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.0M | ✅ | 53.9M | -4% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 69.8M | ✅ | 45.2M | 🟢 **-35%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.7M | ✅ | 51.2M | -10% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 67.9M | -14% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 26.6M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.6M | ✅ | 37.4M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.3M | ✅ | 13.5M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 70.6M | -14% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 70.6M | 🔴 **+233%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ✅ | 12.3M | +3% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ✅ | 23.6M | 🔴 **+51%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.4M | ✅ | 27.3M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ✅ | 12.0M | +8% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 60.4M | ✅ | 77.7M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 49.7M | ✅ | 32.5M | 🟢 **-35%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.3M | ✅ | 34.8M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.1M | ✅ | 55.7M | +18% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.2M | ✅ | 27.7M | +10% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.7M | ✅ | 10.9M | 🟢 **-50%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ✅ | 3.5M | 🟢 **-60%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.4M | ✅ | 5.8M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.0M | ✅ | 15.9M | -16% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.0M | ✅ | 130.5M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 59.6M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.2M | ✅ | 15.0M | 🟢 **-32%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.3M | ✅ | 31.5M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 130.3M | 🔴 **+124%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.4M | ✅ | 22.8M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 39.1M | ✅ | 24.8M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.8M | ✅ | 17.7M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.4M | ✅ | 14.1M | 🔴 **+24%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 130.0M | 🔴 **+39%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 36.0M | ✅ | 15.8M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.8M | ✅ | 15.6M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 11.5M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 56.9M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 56.6M | 🔴 **+99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ✅ | 5.0M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.5M | ✅ | 8.6M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ✅ | 10.7M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.1M | ✅ | 6.5M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.4M | ✅ | 7.1M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.6M | ✅ | 6.0M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.5M | ✅ | 12.5M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.1M | ✅ | 21.2M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.7M | ✅ | 15.1M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ✅ | 14.0M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ✅ | 15.8M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ✅ | 15.8M | 🟢 **-48%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 56.9M | 🔴 **+100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 57.0M | 🔴 **+100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ✅ | 14.0M | 🟢 **-46%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ✅ | 18.4M | 🟢 **-34%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ✅ | 13.9M | 🟢 **-32%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ✅ | 19.0M | 🔴 **+59%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ✅ | 14.0M | 🟢 **-46%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.2M | ✅ | 20.1M | 🟢 **-38%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.6M | ✅ | 19.9M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 9.2M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 9.2M | 🟢 **-55%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 2.9M | 🟢 **-60%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 81.5M | ✅ | 118.6M | 🔴 **+46%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 46.4M | -12% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ✅ | 21.2M | 🟢 **-20%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ✅ | 4.0M | 🟢 **-69%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ✅ | 13.1M | 🟢 **-40%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.7M | ✅ | 11.9M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 7.9M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 22.8M | ✅ | 23.8M | +4% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 42.6M | ✅ | 29.6M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 89.5M | ✅ | 127.1M | 🔴 **+42%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.3M | ✅ | 46.3M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.9M | ✅ | 42.3M | 🟢 **-32%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.0M | ✅ | 23.3M | 🟢 **-64%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 112.0M | 🔴 **+27%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 121.7M | 🔴 **+37%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 60.6M | -5% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.8M | ✅ | 107.7M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 57.5M | -4% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.7M | 🔴 **+36%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 59.3M | -1% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.3M | ✅ | 70.0M | +7% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 133.4M | 🔴 **+39%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.3M | ✅ | 30.6M | -11% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ✅ | 38.6M | 🟢 **-21%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 46.7M | -16% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 53.2M | -13% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.5M | ✅ | 33.8M | -14% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ✅ | 4.2M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 64.1M | 🔴 **+118%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 33.9M | +15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 32.9M | +17% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 16.0M | 🟢 **-44%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.2M | ✅ | 31.1M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.1M | ✅ | 34.8M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 31.2M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 33.0M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.5M | ✅ | 36.8M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 32.4M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ✅ | 19.5M | +13% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 15.9M | +3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 15.4M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 31.6M | +12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.6M | ✅ | 27.6M | 🔴 **+48%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ✅ | 17.7M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 12.2M | 🟢 **-41%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 15.1M | 🟢 **-24%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 8.2M | +7% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 10.7M | 🔴 **+25%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ✅ | 16.1M | 🟢 **-26%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ✅ | 9.3M | 🟢 **-63%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.8M | ✅ | 24.2M | 🔴 **+175%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.2M | ✅ | 14.3M | 🟢 **-65%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ✅ | 125K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.4M | ✅ | 35.2M | -19% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 17.3M | 🔴 **+43%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 35.1M | +7% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.6M | ✅ | 930K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.8M | ✅ | 41.2M | +9% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 7.9M | 🟢 **-20%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ✅ | 18.9M | +12% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.7M | 🟢 **-26%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.7M | ✅ | 15.6M | -1% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.1M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.1M | ✅ | 24.6M | 🟢 **-34%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.9M | ✅ | 57.5M | -13% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 35.9M | ✅ | 31.9M | -11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ✅ | 10.5M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.5M | ✅ | 28.6M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.5M | ✅ | 28.5M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.1M | ✅ | 27.7M | 🟢 **-50%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 37.0M | 🟢 **-52%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.7M | ✅ | 27.2M | 🟢 **-49%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.7M | ✅ | 24.4M | 🔴 **+56%** |
