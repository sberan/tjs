# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 29.3M | 184/199 | 21.5M | 184 | 🟢 **-27%** |
| draft6 | 276 | ✅ 276 | 33.2M | 259/276 | 23.3M | 259 | 🟢 **-30%** |
| draft7 | 313 | ✅ 313 | 16.5M | 281/313 | 21.2M | 281 | 🔴 **+29%** |
| draft2019-09 | 435 | ✅ 435 | 20.7M | 399/435 | 17.8M | 399 | -14% |
| draft2020-12 | 448 | ✅ 448 | 20.9M | 389/448 | 15.3M | 389 | 🟢 **-27%** |
| **Total** | 1671 | 1670/1671 | 21.6M | 1512/1671 | 18.8M | 1512 | -13% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.66x faster** (32 ns vs 53 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.9M | ✅ | 19.7M | 🟢 **-68%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 146.8M | ✅ | 141.5M | -4% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 123.0M | ✅ | 87.9M | 🟢 **-29%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 146.3M | -15% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 73.1M | 🟢 **-41%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ✅ | 32.3M | 🟢 **-30%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 54.3M | ✅ | 28.1M | 🟢 **-48%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 73.4M | +1% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 140.2M | -12% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.0M | ✅ | 40.6M | 🟢 **-23%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 50.0M | ✅ | 15.0M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.2M | ✅ | 24.1M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 51.5M | ✅ | 23.2M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.7M | ✅ | 141.8M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.8M | ✅ | 15.4M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.7M | ✅ | 25.0M | 🟢 **-52%** |
| allOf.json | allOf | 4 | ✅ | 49.3M | ✅ | 34.4M | 🟢 **-30%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.3M | ✅ | 22.6M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 68.1M | 🟢 **-38%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.2M | ✅ | 141.9M | -10% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 141.6M | -11% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 36.3M | 🟢 **-53%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 65.5M | 🟢 **-44%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 76.5M | -3% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.1M | ✅ | 49.1M | 🟢 **-42%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 34.5M | 🟢 **-58%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 20.3M | 🟢 **-60%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.4M | ✅ | 25.9M | 🟢 **-50%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 142.9M | -17% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 76.4M | -3% |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 80.9M | 🟢 **-25%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 49.8M | -9% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.9M | ✅ | 53.8M | 🟢 **-33%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 100.1M | ✅ | 69.7M | 🟢 **-30%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.1M | ✅ | 30.4M | -11% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.8M | ✅ | 32.7M | 🟢 **-45%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.6M | ✅ | 15.5M | 🟢 **-21%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.0M | ✅ | 24.3M | 🟢 **-55%** |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 76.0M | -14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 35.2M | 🟢 **-42%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.7M | ✅ | 83.9M | +12% |
| enum.json | enums in properties | 6 | ✅ | 48.5M | ✅ | 34.1M | 🟢 **-30%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 61.6M | +1% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 59.0M | 🟢 **-48%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 54.2M | -18% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.0M | ✅ | 59.1M | 🟢 **-47%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 65.5M | ✅ | 54.5M | -17% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 83.3M | 🟢 **-27%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 68.1M | -1% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 81.7M | 🟢 **-27%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 74.2M | +9% |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 67.3M | 🟢 **-26%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 62.6M | +7% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 94.0M | ✅ | 69.9M | 🟢 **-26%** |
| format.json | email format | 6 | ✅ | 91.8M | ✅ | 133.5M | 🔴 **+45%** |
| format.json | ipv4 format | 6 | ✅ | 163.1M | ✅ | 137.7M | -16% |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ✅ | 137.3M | 🔴 **+49%** |
| format.json | hostname format | 6 | ✅ | 134.0M | ✅ | 137.8M | +3% |
| format.json | date-time format | 6 | ✅ | 92.9M | ✅ | 135.6M | 🔴 **+46%** |
| format.json | uri format | 6 | ✅ | 162.7M | ✅ | 123.1M | 🟢 **-24%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 25.1M | 🟢 **-46%** |
| items.json | a schema given for items | 4 | ✅ | 94.2M | ✅ | 45.7M | 🟢 **-51%** |
| items.json | an array of schemas for items | 6 | ✅ | 66.8M | ✅ | 60.8M | -9% |
| items.json | items and subitems | 6 | ✅ | 35.4M | ✅ | 7.9M | 🟢 **-78%** |
| items.json | nested items | 3 | ✅ | 13.9M | ✅ | 7.1M | 🟢 **-48%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 71.5M | -5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 77.1M | -2% |
| maxItems.json | maxItems validation | 4 | ✅ | 81.0M | ✅ | 85.4M | +5% |
| maxLength.json | maxLength validation | 5 | ✅ | 66.9M | ✅ | 43.1M | 🟢 **-36%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ✅ | 62.4M | +7% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ✅ | 34.2M | 🟢 **-34%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 84.2M | +10% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 83.9M | +11% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 87.3M | +13% |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 73.8M | +5% |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ✅ | 81.5M | +0% |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 33.0M | 🟢 **-43%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 64.0M | +7% |
| minimum.json | minimum validation | 4 | ✅ | 78.7M | ✅ | 86.4M | +10% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 82.4M | +7% |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 61.3M | ✅ | 70.8M | +15% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.8M | ✅ | 85.9M | +20% |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 91.3M | +18% |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 34.4M | 🟢 **-53%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 29.7M | 🟢 **-55%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 36.6M | 🟢 **-51%** |
| not.json | not | 2 | ✅ | 91.3M | ✅ | 77.1M | -16% |
| not.json | not multiple types | 3 | ✅ | 69.6M | ✅ | 58.8M | -16% |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 40.1M | 🟢 **-42%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 56.2M | +3% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 48.9M | -19% |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 138.4M | -13% |
| oneOf.json | oneOf | 4 | ✅ | 77.1M | ✅ | 62.5M | -19% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 20.9M | 🟢 **-44%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 23.8M | 🟢 **-47%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 76.0M | 0% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ✅ | 22.0M | 🟢 **-55%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 26.6M | 🟢 **-46%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 74.6M | -2% |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 73.3M | 🔴 **+30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 72.6M | 🔴 **+187%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 18.4M | 🟢 **-29%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 11.4M | 🟢 **-23%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.7M | ✅ | 13.5M | 🟢 **-28%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 23.0M | 🔴 **+27%** |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 52.6M | -6% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ✅ | 11.0M | 🟢 **-49%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.1M | ✅ | 23.3M | 🟢 **-55%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 56.2M | -20% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ✅ | 27.9M | -1% |
| ref.json | root pointer ref | 4 | ✅ | 28.1M | ✅ | 13.6M | 🟢 **-52%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.6M | ✅ | 30.0M | 🟢 **-45%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 25.8M | 🟢 **-56%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 28.0M | 🟢 **-41%** |
| ref.json | nested refs | 2 | ✅ | 57.0M | ✅ | 12.5M | 🟢 **-78%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 27.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 44.1M | -19% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 29.1M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.9M | ✅ | 2.6M | 🟢 **-78%** |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 29.0M | 🟢 **-47%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 36.8M | 🟢 **-52%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 72.0M | ✅ | 36.0M | 🟢 **-50%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.9M | ✅ | 42.7M | 🟢 **-25%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 71.8M | ✅ | 37.1M | 🟢 **-48%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 36.9M | 🟢 **-52%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 36.7M | 🟢 **-52%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 37.5M | 🟢 **-51%** |
| refRemote.json | remote ref | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 72.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 72.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 75.6M | +16% |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 141.6M | -11% |
| required.json | required with escaped characters | 2 | ✅ | 54.4M | ✅ | 21.8M | 🟢 **-60%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ✅ | 33.8M | 🔴 **+25%** |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ✅ | 49.8M | 🟢 **-23%** |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ✅ | 58.4M | -16% |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 59.0M | -15% |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 49.1M | -17% |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 50.6M | 🟢 **-22%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.0M | ✅ | 54.4M | -19% |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 49.3M | 🟢 **-25%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 56.3M | -15% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 78.4M | +2% |
| type.json | type: array or object | 5 | ✅ | 66.6M | ✅ | 59.4M | -11% |
| type.json | type: array, object or null | 5 | ✅ | 74.3M | ✅ | 69.1M | -7% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 7.2M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.8M | ✅ | 23.5M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ✅ | 29.7M | 🔴 **+57%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 137.2M | -15% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ✅ | 51.3M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.3M | ✅ | 45.7M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 88.2M | ✅ | 131.4M | 🔴 **+49%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 132.2M | 🔴 **+49%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 51.0M | -20% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.8M | ✅ | 111.5M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 48.1M | -20% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 111.5M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 49.1M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 66.4M | +3% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 31.8M | +8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 32.0M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 32.1M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 30.5M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.1M | ✅ | 34.1M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 30.2M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.6M | ✅ | 31.0M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 37.0M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.3M | ✅ | 28.6M | -9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ✅ | 20.8M | 🔴 **+36%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 16.4M | +9% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 16.8M | +10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ✅ | 28.7M | -3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ✅ | 12.3M | 🟢 **-45%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.8M | ✅ | 21.1M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 13.1M | 🟢 **-42%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.7M | ✅ | 14.3M | 🟢 **-37%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 8.9M | +6% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 10.9M | 🔴 **+30%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ✅ | 11.9M | 🟢 **-44%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.4M | ✅ | 8.9M | 🟢 **-60%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 13.6M | 🟢 **-26%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ✅ | 32.1M | -17% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ✅ | 20.4M | +17% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 5.2M | -18% |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 43.1M | ✅ | 21.2M | 🟢 **-51%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 31.9M | +3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.1M | ✅ | 10.9M | 🟢 **-40%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.7M | ✅ | 7.7M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 45.5M | ✅ | 16.0M | 🟢 **-65%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.7M | ✅ | 75.5M | 🟢 **-57%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 32.5M | ✅ | 101.5M | 🔴 **+212%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 187.2M | ✅ | 134.2M | 🟢 **-28%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 68.7M | ✅ | 69.3M | +1% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 59.8M | ✅ | 36.0M | 🟢 **-40%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.0M | ✅ | 28.5M | 🟢 **-35%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.6M | ✅ | 78.6M | 🟢 **-30%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.9M | ✅ | 125.2M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 58.4M | ✅ | 43.2M | 🟢 **-26%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 39.2M | ✅ | 24.6M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ✅ | 28.2M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 40.1M | ✅ | 25.2M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.4M | ✅ | 125.4M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 30.4M | ✅ | 17.6M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 51.7M | 🟢 **-25%** |
| allOf.json | allOf | 4 | ✅ | 41.8M | ✅ | 39.8M | -5% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.8M | ✅ | 25.0M | 🟢 **-22%** |
| allOf.json | allOf simple types | 2 | ✅ | 80.8M | ✅ | 86.7M | +7% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.6M | ✅ | 125.3M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.6M | ✅ | 65.1M | -13% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.2M | ✅ | 64.9M | 🟢 **-36%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 125.3M | 🟢 **-28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.3M | ✅ | 125.5M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.4M | ✅ | 88.0M | +4% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.9M | ✅ | 85.2M | 🟢 **-33%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 86.0M | ✅ | 87.4M | +2% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 85.5M | ✅ | 60.0M | 🟢 **-30%** |
| anyOf.json | anyOf | 4 | ✅ | 88.0M | ✅ | 83.3M | -5% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 54.2M | ✅ | 27.6M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 170.3M | ✅ | 125.5M | 🟢 **-26%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 175.5M | ✅ | 125.4M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 75.2M | ✅ | 65.0M | -14% |
| anyOf.json | anyOf complex types | 4 | ✅ | 79.2M | ✅ | 30.7M | 🟢 **-61%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 190.4M | ✅ | 130.0M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 128.9M | ✅ | 86.1M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 196.4M | ✅ | 126.6M | 🟢 **-36%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 86.4M | ✅ | 52.0M | 🟢 **-40%** |
| const.json | const validation | 3 | ✅ | 76.7M | ✅ | 61.8M | -19% |
| const.json | const with object | 4 | ✅ | 55.1M | ✅ | 30.4M | 🟢 **-45%** |
| const.json | const with array | 3 | ✅ | 64.4M | ✅ | 9.1M | 🟢 **-86%** |
| const.json | const with null | 2 | ✅ | 130.0M | ✅ | 87.4M | 🟢 **-33%** |
| const.json | const with false does not match 0 | 3 | ✅ | 82.4M | ✅ | 71.2M | -14% |
| const.json | const with true does not match 1 | 3 | ✅ | 120.2M | ✅ | 69.8M | 🟢 **-42%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 71.9M | ✅ | 71.9M | +0% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.1M | ✅ | 70.8M | 🟢 **-27%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 70.9M | ✅ | 33.8M | 🟢 **-52%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 91.6M | ✅ | 33.8M | 🟢 **-63%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 82.7M | ✅ | 36.2M | 🟢 **-56%** |
| const.json | const with 1 does not match true | 3 | ✅ | 128.0M | ✅ | 91.9M | 🟢 **-28%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 76.1M | ✅ | 68.5M | -10% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 114.1M | ✅ | 81.5M | 🟢 **-29%** |
| const.json | nul characters in strings | 2 | ✅ | 69.8M | ✅ | 74.6M | +7% |
| const.json | characters with the same visual repre... | 2 | ✅ | 87.2M | ✅ | 67.3M | 🟢 **-23%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.3M | ✅ | 74.5M | +2% |
| contains.json | contains keyword validation | 6 | ✅ | 106.1M | ✅ | 20.4M | 🟢 **-81%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 67.7M | ✅ | 14.7M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 112.0M | ✅ | 72.0M | 🟢 **-36%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 80.0M | ✅ | 40.7M | 🟢 **-49%** |
| contains.json | items + contains | 4 | ✅ | 61.3M | ✅ | 9.0M | 🟢 **-85%** |
| contains.json | contains with null instance elements | 1 | ✅ | 88.5M | ✅ | 38.4M | 🟢 **-57%** |
| default.json | invalid type for default | 2 | ✅ | 113.3M | ✅ | 50.6M | 🟢 **-55%** |
| default.json | invalid string value for default | 2 | ✅ | 59.7M | ✅ | 48.0M | -20% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 85.3M | ✅ | 55.0M | 🟢 **-35%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 97.6M | ✅ | 66.9M | 🟢 **-31%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.9M | ✅ | 137.7M | 🟢 **-30%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 43.7M | ✅ | 31.7M | 🟢 **-27%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.4M | ✅ | 35.4M | 🟢 **-30%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 93.3M | ✅ | 54.5M | 🟢 **-42%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 20.0M | ✅ | 16.4M | -18% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.1M | ✅ | 13.5M | 🟢 **-75%** |
| enum.json | simple enum validation | 2 | ✅ | 82.8M | ✅ | 86.3M | +4% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 67.1M | ✅ | 38.4M | 🟢 **-43%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 82.4M | ✅ | 84.4M | +2% |
| enum.json | enums in properties | 6 | ✅ | 59.5M | ✅ | 41.0M | 🟢 **-31%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.8M | ✅ | 97.1M | +10% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 118.6M | ✅ | 43.4M | 🟢 **-63%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ✅ | 64.4M | -11% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 119.9M | ✅ | 77.8M | 🟢 **-35%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 70.1M | ✅ | 60.5M | -14% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 127.6M | ✅ | 86.0M | 🟢 **-33%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.3M | ✅ | 78.5M | +7% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.2M | ✅ | 91.1M | 🟢 **-28%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 71.2M | ✅ | 81.0M | +14% |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 73.9M | 🟢 **-24%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.5M | ✅ | 72.5M | -9% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.6M | ✅ | 78.8M | 🟢 **-30%** |
| format.json | email format | 6 | ✅ | 99.7M | ✅ | 128.4M | 🔴 **+29%** |
| format.json | ipv4 format | 6 | ✅ | 158.9M | ✅ | 129.1M | -19% |
| format.json | ipv6 format | 6 | ✅ | 99.7M | ✅ | 121.0M | 🔴 **+21%** |
| format.json | hostname format | 6 | ✅ | 161.0M | ✅ | 114.1M | 🟢 **-29%** |
| format.json | date-time format | 6 | ✅ | 99.7M | ✅ | 116.2M | +17% |
| format.json | json-pointer format | 6 | ✅ | 159.3M | ✅ | 132.7M | -17% |
| format.json | uri format | 6 | ✅ | 99.7M | ✅ | 130.8M | 🔴 **+31%** |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ✅ | 123.1M | 🟢 **-23%** |
| format.json | uri-template format | 6 | ✅ | 96.9M | ✅ | 132.8M | 🔴 **+37%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 63.4M | ✅ | 20.9M | 🟢 **-67%** |
| items.json | a schema given for items | 4 | ✅ | 63.0M | ✅ | 43.9M | 🟢 **-30%** |
| items.json | an array of schemas for items | 6 | ✅ | 111.9M | ✅ | 59.5M | 🟢 **-47%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.4M | ✅ | 135.2M | 🟢 **-28%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 100.1M | ✅ | 66.7M | 🟢 **-33%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ✅ | 79.6M | 🔴 **+28%** |
| items.json | items and subitems | 6 | ✅ | 34.6M | ✅ | 7.6M | 🟢 **-78%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 6.8M | 🟢 **-47%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.9M | ✅ | 66.4M | 🟢 **-22%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 69.3M | -13% |
| maxItems.json | maxItems validation | 4 | ✅ | 84.2M | ✅ | 93.1M | +11% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 74.2M | ✅ | 80.5M | +9% |
| maxLength.json | maxLength validation | 5 | ✅ | 70.6M | ✅ | 43.4M | 🟢 **-39%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 66.2M | ✅ | 50.6M | 🟢 **-24%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 66.8M | +14% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.9M | ✅ | 46.1M | -6% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.3M | ✅ | 51.1M | -4% |
| maximum.json | maximum validation | 4 | ✅ | 87.1M | ✅ | 100.2M | +15% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 85.6M | ✅ | 101.8M | +19% |
| minItems.json | minItems validation | 4 | ✅ | 87.7M | ✅ | 100.0M | +14% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.3M | ✅ | 83.4M | +1% |
| minLength.json | minLength validation | 5 | ✅ | 65.8M | ✅ | 35.1M | 🟢 **-47%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 64.9M | ✅ | 49.4M | 🟢 **-24%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.3M | ✅ | 69.1M | +8% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.4M | ✅ | 49.0M | +8% |
| minimum.json | minimum validation | 4 | ✅ | 85.6M | ✅ | 43.3M | 🟢 **-49%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 81.9M | +1% |
| multipleOf.json | by int | 3 | ✅ | 84.0M | ✅ | 96.0M | +14% |
| multipleOf.json | by number | 3 | ✅ | 80.2M | ✅ | 59.4M | 🟢 **-26%** |
| multipleOf.json | by small number | 2 | ✅ | 74.3M | ✅ | 27.3M | 🟢 **-63%** |
| multipleOf.json | float division = inf | 1 | ✅ | 62.7M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.7M | ✅ | 17.2M | 🟢 **-78%** |
| not.json | not | 2 | ✅ | 83.7M | ✅ | 85.6M | +2% |
| not.json | not multiple types | 3 | ✅ | 78.8M | ✅ | 74.8M | -5% |
| not.json | not more complex schema | 3 | ✅ | 75.9M | ✅ | 48.6M | 🟢 **-36%** |
| not.json | forbidden property | 2 | ✅ | 56.9M | ✅ | 58.3M | +3% |
| not.json | forbid everything with empty schema | 9 | ✅ | 69.2M | ✅ | 61.8M | -11% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 69.4M | ✅ | 63.2M | -9% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 202.9M | ✅ | 138.6M | 🟢 **-32%** |
| not.json | double negation | 1 | ✅ | 174.5M | ✅ | 102.3M | 🟢 **-41%** |
| oneOf.json | oneOf | 4 | ✅ | 72.4M | ✅ | 77.7M | +7% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 38.6M | ✅ | 27.2M | 🟢 **-30%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 76.3M | ✅ | 64.7M | -15% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.6M | ✅ | 125.4M | 🔴 **+26%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 75.6M | ✅ | 64.9M | -14% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.6M | ✅ | 65.0M | -14% |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.4M | ✅ | 29.1M | 🟢 **-37%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.4M | ✅ | 87.7M | +6% |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 26.4M | 🟢 **-51%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 54.4M | ✅ | 33.5M | 🟢 **-38%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 82.1M | ✅ | 88.0M | +7% |
| pattern.json | pattern validation | 8 | ✅ | 59.9M | ✅ | 73.5M | 🔴 **+23%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 16.6M | ✅ | 60.5M | 🔴 **+264%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.9M | ✅ | 18.2M | 🟢 **-35%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 16.3M | ✅ | 14.8M | -9% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.8M | ✅ | 13.6M | 🟢 **-28%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.2M | ✅ | 18.3M | 🟢 **-21%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.2M | ✅ | 22.8M | +13% |
| properties.json | object properties validation | 6 | ✅ | 58.1M | ✅ | 54.4M | -6% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.8M | ✅ | 10.5M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.9M | ✅ | 57.5M | +13% |
| properties.json | properties with escaped characters | 2 | ✅ | 57.4M | ✅ | 22.5M | 🟢 **-61%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.4M | ✅ | 60.3M | 🟢 **-23%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 30.7M | ✅ | 28.3M | -8% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 49.9M | ✅ | 41.6M | -17% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.4M | ✅ | 16.5M | -11% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 182.9M | ✅ | 135.5M | 🟢 **-26%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 53.4M | ✅ | 25.5M | 🟢 **-52%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 46.5M | ✅ | 30.8M | 🟢 **-34%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.9M | ✅ | 33.7M | 🟢 **-23%** |
| ref.json | root pointer ref | 4 | ✅ | 28.2M | ✅ | 13.3M | 🟢 **-53%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 58.7M | ✅ | 25.8M | 🟢 **-56%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 64.1M | ✅ | 22.3M | 🟢 **-65%** |
| ref.json | escaped pointer ref | 6 | ✅ | 49.2M | ✅ | 25.6M | 🟢 **-48%** |
| ref.json | nested refs | 2 | ✅ | 43.6M | ✅ | 10.6M | 🟢 **-76%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 60.3M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 60.2M | ✅ | 45.4M | 🟢 **-25%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 60.2M | ✅ | 25.8M | 🟢 **-57%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.6M | ✅ | 119.0M | 🟢 **-32%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 75.7M | ✅ | 30.9M | 🟢 **-59%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 2.7M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 60.0M | ✅ | 26.0M | 🟢 **-57%** |
| ref.json | Location-independent identifier | 2 | ✅ | 55.1M | ✅ | 34.3M | 🟢 **-38%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 54.8M | ✅ | 34.4M | 🟢 **-37%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.9M | ✅ | 34.4M | 🟢 **-38%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 60.4M | ✅ | 38.3M | 🟢 **-37%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.0M | ✅ | 9.4M | 🟢 **-77%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.2M | ✅ | 8.7M | 🟢 **-78%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 44.7M | ✅ | 22.0M | 🟢 **-51%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 60.1M | ✅ | 25.1M | 🟢 **-58%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 59.4M | ✅ | 25.3M | 🟢 **-57%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 57.5M | ✅ | 23.8M | 🟢 **-59%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 60.6M | ✅ | 25.6M | 🟢 **-58%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 59.4M | ✅ | 25.4M | 🟢 **-57%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ✅ | 24.4M | 🟢 **-47%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 53.5M | ✅ | 32.7M | 🟢 **-39%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.4M | ✅ | 34.3M | 🟢 **-60%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 84.7M | ✅ | 32.2M | 🟢 **-62%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 86.6M | ✅ | 34.6M | 🟢 **-60%** |
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
| required.json | required validation | 5 | ✅ | 75.0M | ✅ | 83.2M | +11% |
| required.json | required default validation | 1 | ✅ | 175.4M | ✅ | 125.1M | 🟢 **-29%** |
| required.json | required with empty array | 1 | ✅ | 174.6M | ✅ | 125.1M | 🟢 **-28%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ✅ | 24.1M | 🟢 **-45%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 35.8M | 🔴 **+42%** |
| type.json | integer type matches integers | 9 | ✅ | 70.7M | ✅ | 65.0M | -8% |
| type.json | number type matches numbers | 9 | ✅ | 73.3M | ✅ | 72.3M | -1% |
| type.json | string type matches strings | 9 | ✅ | 73.0M | ✅ | 71.5M | -2% |
| type.json | object type matches objects | 7 | ✅ | 62.7M | ✅ | 59.7M | -5% |
| type.json | array type matches arrays | 7 | ✅ | 67.5M | ✅ | 58.6M | -13% |
| type.json | boolean type matches booleans | 10 | ✅ | 70.6M | ✅ | 63.2M | -10% |
| type.json | null type matches only the null object | 10 | ✅ | 65.1M | ✅ | 60.3M | -7% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.6M | ✅ | 71.2M | +2% |
| type.json | type as array with one item | 2 | ✅ | 84.3M | ✅ | 88.0M | +4% |
| type.json | type: array or object | 5 | ✅ | 79.3M | ✅ | 66.5M | -16% |
| type.json | type: array, object or null | 5 | ✅ | 84.0M | ✅ | 80.6M | -4% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 8.0M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 36.3M | ✅ | 24.1M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ✅ | 29.3M | 🔴 **+49%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 191.6M | ✅ | 130.8M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.9M | ✅ | 47.3M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 78.8M | ✅ | 41.4M | 🟢 **-47%** |
| optional/bignum.json | integer | 2 | ✅ | 94.0M | ✅ | 120.7M | 🔴 **+28%** |
| optional/bignum.json | number | 2 | ✅ | 96.2M | ✅ | 126.3M | 🔴 **+31%** |
| optional/bignum.json | string | 1 | ✅ | 71.8M | ✅ | 62.7M | -13% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 88.0M | ✅ | 111.4M | 🔴 **+27%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.5M | ✅ | 60.5M | -9% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 87.5M | ✅ | 110.9M | 🔴 **+27%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.5M | ✅ | 59.1M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.5M | ✅ | 71.3M | +6% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 35.8M | 🔴 **+69%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.4M | ✅ | 36.1M | +11% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.0M | ✅ | 36.2M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 32.4M | ✅ | 33.8M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 29.5M | ✅ | 35.7M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 32.6M | ✅ | 33.8M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 32.6M | ✅ | 36.1M | +11% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.1M | ✅ | 38.0M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.8M | ✅ | 33.6M | -4% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.0M | ✅ | 20.7M | +15% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.7M | ✅ | 16.5M | -7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.3M | ✅ | 15.9M | -3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.9M | ✅ | 33.6M | +12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 23.7M | ✅ | 27.1M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 25.4M | ✅ | 20.0M | 🟢 **-21%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 23.7M | ✅ | 13.0M | 🟢 **-45%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 23.1M | ✅ | 14.7M | 🟢 **-37%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ✅ | 8.6M | +0% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ✅ | 10.7M | +18% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.8M | ✅ | 15.9M | 🔴 **+35%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.5M | ✅ | 9.4M | 🟢 **-66%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ✅ | 14.5M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 45.3M | ✅ | 35.0M | 🟢 **-23%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ✅ | 18.1M | +4% |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ✅ | 36.1M | +8% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 101.8M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.4M | ✅ | 7.8M | 🟢 **-25%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ✅ | 19.1M | +5% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ✅ | 4.8M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.6M | ✅ | 25.4M | 🟢 **-34%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.6M | ✅ | 34.4M | 🟢 **-33%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.7M | ✅ | 33.5M | 🟢 **-34%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.8M | ✅ | 35.2M | +4% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.6M | ✅ | 10.5M | 🟢 **-44%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.9M | ✅ | 24.6M | +3% |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.8M | ✅ | 28.3M | 🟢 **-53%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 46.7M | ✅ | 26.2M | 🟢 **-44%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 125.2M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 75.6M | ✅ | 81.2M | +7% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 134.8M | 🟢 **-21%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 75.1M | ✅ | 69.3M | -8% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 57.9M | ✅ | 18.1M | 🟢 **-69%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.6M | ✅ | 24.1M | 🟢 **-42%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 78.5M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.4M | ✅ | 45.4M | 🟢 **-34%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.5M | ✅ | 23.8M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.7M | ✅ | 18.3M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.0M | ✅ | 24.0M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 17.4M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.7M | ✅ | 51.5M | 🟢 **-25%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 38.7M | -1% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 25.2M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 85.6M | 🔴 **+23%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 125.4M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 44.1M | ✅ | 64.0M | 🔴 **+45%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 65.0M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 146.9M | ✅ | 123.1M | -16% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 126.1M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 88.2M | 🔴 **+20%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.6M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 86.9M | +17% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ✅ | 60.0M | 🟢 **-28%** |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ✅ | 89.3M | +18% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ✅ | 27.4M | 🟢 **-42%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 125.2M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 125.4M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 64.7M | +2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.9M | ✅ | 30.9M | 🟢 **-58%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 170.7M | ✅ | 125.4M | 🟢 **-27%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 86.6M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.2M | ✅ | 138.6M | 🟢 **-22%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.8M | ✅ | 59.1M | 🟢 **-31%** |
| const.json | const validation | 3 | ✅ | 62.3M | ✅ | 71.5M | +15% |
| const.json | const with object | 4 | ✅ | 49.1M | ✅ | 32.2M | 🟢 **-34%** |
| const.json | const with array | 3 | ✅ | 54.6M | ✅ | 5.4M | 🟢 **-90%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 87.4M | 🟢 **-27%** |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ✅ | 64.5M | -10% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ✅ | 76.1M | 🟢 **-32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.9M | ✅ | 68.9M | +8% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 93.8M | ✅ | 70.8M | 🟢 **-25%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.9M | ✅ | 33.6M | 🟢 **-42%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.7M | ✅ | 33.5M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 59.8M | ✅ | 65.9M | +10% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.3M | ✅ | 90.5M | -19% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 63.7M | ✅ | 69.0M | +8% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 91.8M | ✅ | 80.7M | -12% |
| const.json | nul characters in strings | 2 | ✅ | 62.0M | ✅ | 73.8M | +19% |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 67.1M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.4M | ✅ | 75.8M | 🔴 **+45%** |
| contains.json | contains keyword validation | 6 | ✅ | 95.8M | ✅ | 20.0M | 🟢 **-79%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.3M | ✅ | 14.9M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 73.2M | 🟢 **-31%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.8M | ✅ | 41.5M | 🟢 **-40%** |
| contains.json | items + contains | 4 | ✅ | 58.8M | ✅ | 18.0M | 🟢 **-69%** |
| contains.json | contains with false if subschema | 2 | ✅ | 62.4M | ✅ | 73.0M | +17% |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 38.1M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 64.2M | ✅ | 75.5M | +18% |
| default.json | invalid string value for default | 2 | ✅ | 67.9M | ✅ | 43.4M | 🟢 **-36%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.7M | ✅ | 57.3M | 🔴 **+20%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.6M | ✅ | 71.1M | +14% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.6M | ✅ | 138.1M | 🟢 **-22%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.0M | ✅ | 31.3M | -5% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.7M | ✅ | 34.2M | 🟢 **-22%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 53.9M | ✅ | 54.3M | +1% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.5M | ✅ | 16.4M | -16% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 23.8M | ✅ | 25.9M | +9% |
| enum.json | simple enum validation | 2 | ✅ | 52.6M | ✅ | 85.7M | 🔴 **+63%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 34.4M | 🟢 **-26%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 86.8M | 🔴 **+22%** |
| enum.json | enums in properties | 6 | ✅ | 43.0M | ✅ | 40.4M | -6% |
| enum.json | enum with escaped characters | 3 | ✅ | 70.7M | ✅ | 97.0M | 🔴 **+37%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ✅ | 75.7M | +5% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.9M | ✅ | 64.5M | +1% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 76.7M | +7% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.5M | ✅ | 69.3M | +9% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 70.9M | ✅ | 84.2M | +19% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 80.4M | 🔴 **+22%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 91.4M | 🔴 **+30%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 80.6M | 🔴 **+23%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 73.9M | +19% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ✅ | 79.5M | +17% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.9M | ✅ | 80.4M | +18% |
| format.json | email format | 6 | ✅ | 86.4M | ✅ | 128.4M | 🔴 **+49%** |
| format.json | idn-email format | 6 | ✅ | 87.1M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 87.0M | ✅ | 126.9M | 🔴 **+46%** |
| format.json | ipv4 format | 6 | ✅ | 87.3M | ✅ | 106.6M | 🔴 **+22%** |
| format.json | ipv6 format | 6 | ✅ | 86.6M | ✅ | 131.0M | 🔴 **+51%** |
| format.json | idn-hostname format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 86.6M | ✅ | 132.9M | 🔴 **+53%** |
| format.json | date format | 6 | ✅ | 87.2M | ✅ | 105.6M | 🔴 **+21%** |
| format.json | date-time format | 6 | ✅ | 86.8M | ✅ | 130.2M | 🔴 **+50%** |
| format.json | time format | 6 | ✅ | 86.9M | ✅ | 121.8M | 🔴 **+40%** |
| format.json | json-pointer format | 6 | ✅ | 81.4M | ✅ | 132.9M | 🔴 **+63%** |
| format.json | relative-json-pointer format | 6 | ✅ | 87.2M | ✅ | 132.6M | 🔴 **+52%** |
| format.json | iri format | 6 | ✅ | 86.3M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 86.5M | ✅ | 111.8M | 🔴 **+29%** |
| format.json | uri-reference format | 6 | ✅ | 86.2M | ✅ | 132.1M | 🔴 **+53%** |
| format.json | uri-template format | 6 | ✅ | 79.0M | ✅ | 133.5M | 🔴 **+69%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 135.1M | 🟢 **-21%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 135.1M | 🟢 **-21%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 134.6M | 🟢 **-22%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.6M | ✅ | 95.6M | 🔴 **+30%** |
| if-then-else.json | if and else without then | 3 | ✅ | 68.7M | ✅ | 93.8M | 🔴 **+37%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.6M | ✅ | 70.2M | +2% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 128.1M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ✅ | 85.3M | +17% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 70.6M | ✅ | 80.4M | +14% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.9M | ✅ | 36.7M | 🟢 **-20%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 25.1M | 🟢 **-44%** |
| items.json | a schema given for items | 4 | ✅ | 61.8M | ✅ | 43.8M | 🟢 **-29%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.5M | ✅ | 59.2M | -8% |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ✅ | 135.6M | 🟢 **-21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ✅ | 64.9M | -6% |
| items.json | items with boolean schemas | 3 | ✅ | 65.3M | ✅ | 73.1M | +12% |
| items.json | items and subitems | 6 | ✅ | 30.6M | ✅ | 8.1M | 🟢 **-73%** |
| items.json | nested items | 3 | ✅ | 13.6M | ✅ | 6.7M | 🟢 **-51%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 66.3M | -8% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 69.3M | -8% |
| maxItems.json | maxItems validation | 4 | ✅ | 75.1M | ✅ | 99.8M | 🔴 **+33%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 82.4M | +19% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 45.3M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 57.3M | ✅ | 51.4M | -10% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ✅ | 67.4M | 🔴 **+21%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.5M | ✅ | 47.7M | -2% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 50.4M | +2% |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ✅ | 96.9M | 🔴 **+32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.1M | ✅ | 95.6M | 🔴 **+33%** |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 99.4M | 🔴 **+46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.0M | ✅ | 83.5M | 🔴 **+21%** |
| minLength.json | minLength validation | 5 | ✅ | 61.4M | ✅ | 37.0M | 🟢 **-40%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 48.3M | -15% |
| minProperties.json | minProperties validation | 6 | ✅ | 56.9M | ✅ | 68.0M | +19% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ✅ | 47.0M | -5% |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 98.7M | 🔴 **+35%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 88.7M | 🔴 **+29%** |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ✅ | 96.4M | 🔴 **+31%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 59.4M | -15% |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 27.2M | 🟢 **-58%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 17.2M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 73.7M | +1% |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 75.3M | +11% |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 49.7M | 🟢 **-25%** |
| not.json | forbidden property | 2 | ✅ | 52.6M | ✅ | 57.8M | +10% |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.0M | ✅ | 62.6M | +1% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.9M | ✅ | 62.9M | +2% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.8M | ✅ | 125.8M | 🟢 **-29%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 125.2M | 🟢 **-21%** |
| oneOf.json | oneOf | 4 | ✅ | 61.1M | ✅ | 77.0M | 🔴 **+26%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.7M | ✅ | 27.1M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.9M | ✅ | 64.8M | +3% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ✅ | 125.3M | 🔴 **+47%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 64.8M | +2% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 64.8M | +2% |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 28.4M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 86.1M | +19% |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ✅ | 26.4M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ✅ | 32.5M | 🟢 **-32%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 86.8M | +20% |
| pattern.json | pattern validation | 8 | ✅ | 53.6M | ✅ | 70.6M | 🔴 **+32%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 60.5M | 🔴 **+143%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 18.4M | 🟢 **-30%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.9M | ✅ | 14.1M | -11% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.8M | ✅ | 13.6M | 🟢 **-24%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.5M | ✅ | 18.4M | -18% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 22.8M | 🔴 **+27%** |
| properties.json | object properties validation | 6 | ✅ | 54.0M | ✅ | 52.4M | -3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ✅ | 11.0M | 🟢 **-46%** |
| properties.json | properties with boolean schema | 4 | ✅ | 33.3M | ✅ | 57.3M | 🔴 **+72%** |
| properties.json | properties with escaped characters | 2 | ✅ | 50.5M | ✅ | 21.8M | 🟢 **-57%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 60.3M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.6M | ✅ | 29.1M | +6% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.4M | ✅ | 40.6M | -12% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 16.2M | -16% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 134.3M | 🟢 **-22%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.8M | ✅ | 25.0M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.6M | ✅ | 28.0M | 🟢 **-34%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.2M | ✅ | 32.7M | 🟢 **-26%** |
| ref.json | root pointer ref | 4 | ✅ | 27.2M | ✅ | 14.3M | 🟢 **-48%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.0M | ✅ | 27.4M | 🟢 **-47%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 24.2M | 🟢 **-58%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 29.5M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 54.0M | ✅ | 12.4M | 🟢 **-77%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.6M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.6M | ✅ | 49.3M | -6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.9M | ✅ | 28.1M | 🟢 **-47%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 147.3M | ✅ | 113.9M | 🟢 **-23%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ✅ | 33.3M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.5M | ✅ | 2.8M | 🟢 **-71%** |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 29.2M | 🟢 **-44%** |
| ref.json | Location-independent identifier | 2 | ✅ | 68.8M | ✅ | 40.0M | 🟢 **-42%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 68.8M | ✅ | 43.0M | 🟢 **-37%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 68.9M | ✅ | 43.4M | 🟢 **-37%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.1M | ✅ | 36.6M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 40.2M | ✅ | 10.4M | 🟢 **-74%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.4M | ✅ | 10.5M | 🟢 **-74%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 68.4M | ✅ | 44.0M | 🟢 **-36%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ✅ | 25.1M | 🟢 **-39%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.7M | ✅ | 28.7M | 🟢 **-46%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.5M | ✅ | 30.6M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 52.4M | ✅ | 29.5M | 🟢 **-44%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.5M | ✅ | 28.8M | 🟢 **-45%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 52.4M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 53.3M | ✅ | 30.6M | 🟢 **-43%** |
| ref.json | ref to if | 2 | ✅ | 68.8M | ✅ | 43.9M | 🟢 **-36%** |
| ref.json | ref to then | 2 | ✅ | 68.8M | ✅ | 43.6M | 🟢 **-37%** |
| ref.json | ref to else | 2 | ✅ | 68.9M | ✅ | 43.6M | 🟢 **-37%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 68.6M | ✅ | 43.7M | 🟢 **-36%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 43.4M | 🟢 **-41%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 43.8M | 🟢 **-40%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 43.9M | 🟢 **-40%** |
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
| required.json | required validation | 5 | ✅ | 61.5M | ✅ | 82.2M | 🔴 **+34%** |
| required.json | required default validation | 1 | ✅ | 158.6M | ✅ | 125.1M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 125.1M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 50.7M | ✅ | 24.0M | 🟢 **-53%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.3M | ✅ | 35.5M | 🔴 **+30%** |
| type.json | integer type matches integers | 9 | ✅ | 63.5M | ✅ | 58.8M | -7% |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 73.8M | +12% |
| type.json | string type matches strings | 9 | ✅ | 65.4M | ✅ | 72.7M | +11% |
| type.json | object type matches objects | 7 | ✅ | 56.5M | ✅ | 59.9M | +6% |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 58.8M | -4% |
| type.json | boolean type matches booleans | 10 | ✅ | 61.9M | ✅ | 52.9M | -14% |
| type.json | null type matches only the null object | 10 | ✅ | 57.8M | ✅ | 58.0M | +0% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 70.6M | +11% |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 87.8M | 🔴 **+20%** |
| type.json | type: array or object | 5 | ✅ | 65.1M | ✅ | 65.4M | +0% |
| type.json | type: array, object or null | 5 | ✅ | 73.6M | ✅ | 82.4M | +12% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 8.1M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.2M | ✅ | 24.3M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 29.8M | 🔴 **+60%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.3M | ✅ | 126.8M | -20% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.4M | ✅ | 46.8M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ✅ | 40.7M | 🟢 **-36%** |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ✅ | 121.9M | 🔴 **+46%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 127.2M | 🔴 **+51%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 58.9M | -3% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 111.1M | 🔴 **+48%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 60.4M | +5% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 111.3M | 🔴 **+48%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 53.6M | -7% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 352K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 427K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.9M | ✅ | 72.0M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 36.1M | 🔴 **+82%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 36.2M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 34.9M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.3M | ✅ | 33.5M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.2M | ✅ | 35.2M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 36.4M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 36.1M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 38.0M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.2M | ✅ | 33.4M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 20.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 16.6M | +8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 15.9M | +7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 33.9M | 🔴 **+27%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.2M | ✅ | 24.0M | +8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.2M | ✅ | 19.5M | -19% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.3M | ✅ | 12.4M | 🟢 **-44%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 13.3M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 8.5M | +4% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ✅ | 11.6M | 🔴 **+27%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 14.2M | ✅ | 15.9M | +12% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ✅ | 9.4M | 🟢 **-64%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.9M | ✅ | 24.2M | -10% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 14.2M | 🟢 **-25%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ✅ | 35.2M | -7% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ✅ | 17.9M | +4% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.7M | ✅ | 36.0M | +14% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 70.0M | ✅ | 941K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.2M | ✅ | 43.2M | +7% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.8M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ✅ | 18.9M | +9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-23%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 41.1M | ✅ | 25.5M | 🟢 **-38%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 64.8M | ✅ | 38.5M | 🟢 **-41%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 57.3M | ✅ | 38.7M | 🟢 **-33%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ✅ | 34.7M | +18% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 10.0M | 🟢 **-39%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.9M | ✅ | 25.6M | -12% |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 26.6M | ✅ | 9.2M | 🟢 **-66%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 41.4M | ✅ | 18.9M | 🟢 **-54%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.6M | ✅ | 122.1M | 🟢 **-23%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ✅ | 84.0M | +15% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 87.7M | ✅ | 131.2M | 🔴 **+50%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 73.6M | -7% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.2M | ✅ | 30.1M | +3% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 29.7M | 🟢 **-30%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 70.2M | 🟢 **-35%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.3M | ✅ | 114.7M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.4M | ✅ | 39.0M | 🟢 **-37%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.6M | ✅ | 22.1M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.8M | ✅ | 25.9M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 22.5M | ✅ | 22.8M | +1% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 135.9M | -15% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 31.2M | ✅ | 14.4M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.0M | ✅ | 40.9M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.7M | ✅ | 12.5M | 🟢 **-61%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.0M | ✅ | 16.6M | 🟢 **-56%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 32.0M | 🟢 **-21%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 22.6M | 🟢 **-25%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 56.4M | 🟢 **-23%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 141.8M | -11% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 49.0M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 48.5M | 🟢 **-48%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 141.3M | -11% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 114.7M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 73.1M | -5% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 75.8M | 🟢 **-36%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 76.9M | -2% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.2M | ✅ | 46.3M | 🟢 **-44%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 33.9M | 🟢 **-56%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 33.7M | 🟢 **-70%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.5M | ✅ | 32.5M | 🟢 **-54%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ✅ | 33.7M | 🟢 **-63%** |
| anyOf.json | anyOf | 4 | ✅ | 81.4M | ✅ | 73.4M | -10% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.1M | ✅ | 19.6M | 🟢 **-50%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 141.7M | -11% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 124.3M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.0M | ✅ | 47.6M | 🟢 **-28%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 54.5M | ✅ | 26.0M | 🟢 **-52%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 121.8M | 🟢 **-29%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 75.9M | -4% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ✅ | 152.5M | -15% |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 65.3M | ✅ | 47.0M | 🟢 **-28%** |
| const.json | const validation | 3 | ✅ | 67.4M | ✅ | 57.7M | -14% |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 29.4M | 🟢 **-28%** |
| const.json | const with array | 3 | ✅ | 58.6M | ✅ | 6.9M | 🟢 **-88%** |
| const.json | const with null | 2 | ✅ | 78.6M | ✅ | 78.0M | -1% |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 56.7M | 🟢 **-25%** |
| const.json | const with true does not match 1 | 3 | ✅ | 76.0M | ✅ | 59.3M | 🟢 **-22%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ✅ | 53.9M | -19% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 50.5M | 🟢 **-24%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.9M | ✅ | 28.6M | 🟢 **-57%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.3M | ✅ | 19.8M | 🟢 **-67%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.8M | ✅ | 57.4M | -7% |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 81.6M | +11% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.2M | ✅ | 60.6M | -16% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 64.7M | -12% |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 67.9M | +5% |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 61.6M | +6% |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 68.5M | +4% |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ✅ | 16.0M | 🟢 **-75%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.1M | ✅ | 11.8M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.7M | ✅ | 67.8M | -6% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ✅ | 32.4M | 🟢 **-55%** |
| contains.json | items + contains | 4 | ✅ | 47.1M | ✅ | 16.4M | 🟢 **-65%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 64.2M | -7% |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 33.1M | 🟢 **-57%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 172.7M | ✅ | 150.2M | -13% |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.6M | ✅ | 134.3M | 🟢 **-24%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.7M | ✅ | 150.6M | -16% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.8M | ✅ | 151.8M | -17% |
| default.json | invalid type for default | 2 | ✅ | 70.4M | ✅ | 77.7M | +10% |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 47.7M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 53.1M | -5% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.2M | ✅ | 66.7M | +2% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 150.6M | -15% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ✅ | 29.4M | +6% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ✅ | 37.4M | 🟢 **-23%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ✅ | 44.0M | 🟢 **-21%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.5M | ✅ | 49.2M | -17% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 50.0M | ✅ | 30.2M | 🟢 **-40%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 43.2M | ✅ | 23.9M | 🟢 **-45%** |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 75.9M | -14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ✅ | 35.8M | 🟢 **-25%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 76.9M | +3% |
| enum.json | enums in properties | 6 | ✅ | 45.1M | ✅ | 36.4M | -19% |
| enum.json | enum with escaped characters | 3 | ✅ | 77.8M | ✅ | 81.6M | +5% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.2M | ✅ | 58.3M | 🟢 **-23%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 52.0M | 🟢 **-22%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 58.3M | 🟢 **-23%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 53.3M | -20% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 82.1M | +10% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.8M | ✅ | 70.0M | +2% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 84.1M | +14% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ✅ | 64.3M | -6% |
| enum.json | nul characters in strings | 2 | ✅ | 63.4M | ✅ | 69.0M | +9% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ✅ | 62.8M | -12% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 65.4M | -8% |
| format.json | email format | 6 | ✅ | 167.9M | ✅ | 115.7M | 🟢 **-31%** |
| format.json | idn-email format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 181.5M | ✅ | 128.4M | 🟢 **-29%** |
| format.json | ipv4 format | 6 | ✅ | 182.7M | ✅ | 109.7M | 🟢 **-40%** |
| format.json | ipv6 format | 6 | ✅ | 182.8M | ✅ | 135.6M | 🟢 **-26%** |
| format.json | idn-hostname format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 182.7M | ✅ | 139.0M | 🟢 **-24%** |
| format.json | date format | 6 | ✅ | 182.8M | ✅ | 100.4M | 🟢 **-45%** |
| format.json | date-time format | 6 | ✅ | 182.4M | ✅ | 130.1M | 🟢 **-29%** |
| format.json | time format | 6 | ✅ | 181.0M | ✅ | 113.0M | 🟢 **-38%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ✅ | 120.8M | 🟢 **-34%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.4M | ✅ | 138.6M | 🟢 **-24%** |
| format.json | iri format | 6 | ✅ | 179.5M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 182.3M | ✅ | 123.9M | 🟢 **-32%** |
| format.json | uri-reference format | 6 | ✅ | 182.9M | ✅ | 117.4M | 🟢 **-36%** |
| format.json | uri-template format | 6 | ✅ | 182.5M | ✅ | 120.7M | 🟢 **-34%** |
| format.json | uuid format | 6 | ✅ | 179.8M | ✅ | 118.0M | 🟢 **-34%** |
| format.json | duration format | 6 | ✅ | 182.5M | ✅ | 135.2M | 🟢 **-26%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 143.5M | -16% |
| if-then-else.json | ignore then without if | 2 | ✅ | 165.3M | ✅ | 146.3M | -12% |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.0M | ✅ | 140.9M | -18% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ✅ | 80.1M | +3% |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ✅ | 84.7M | +11% |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.7M | ✅ | 66.3M | -8% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 140.0M | -18% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 71.1M | -6% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 75.7M | +0% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ✅ | 29.3M | 🟢 **-38%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 21.5M | 🟢 **-54%** |
| items.json | a schema given for items | 4 | ✅ | 63.8M | ✅ | 46.0M | 🟢 **-28%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ✅ | 57.8M | -15% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.3M | ✅ | 145.9M | -15% |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 54.3M | 🟢 **-24%** |
| items.json | items with boolean schemas | 3 | ✅ | 68.3M | ✅ | 66.3M | -3% |
| items.json | items and subitems | 6 | ✅ | 31.0M | ✅ | 7.9M | 🟢 **-75%** |
| items.json | nested items | 3 | ✅ | 13.7M | ✅ | 6.9M | 🟢 **-49%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 66.3M | -12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 77.9M | -1% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 130.4M | 🟢 **-24%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.8M | ✅ | 19.4M | 🟢 **-68%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 65.1M | ✅ | 19.3M | 🟢 **-70%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.2M | ✅ | 16.6M | 🟢 **-73%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 82.5M | +2% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ✅ | 73.6M | +1% |
| maxLength.json | maxLength validation | 5 | ✅ | 62.4M | ✅ | 40.6M | 🟢 **-35%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 39.0M | 🟢 **-34%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 64.0M | +10% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.7M | ✅ | 37.5M | 🟢 **-25%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 38.8M | 🟢 **-24%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 85.9M | +12% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 85.8M | +13% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 146.2M | -15% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 81.4M | ✅ | 24.5M | 🟢 **-70%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.5M | ✅ | 18.8M | 🟢 **-69%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ✅ | 20.7M | 🟢 **-69%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ✅ | 19.4M | 🟢 **-68%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.3M | ✅ | 18.3M | 🟢 **-68%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ✅ | 45.8M | 🟢 **-73%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ✅ | 26.1M | 🟢 **-64%** |
| minItems.json | minItems validation | 4 | ✅ | 80.1M | ✅ | 82.6M | +3% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 73.1M | +1% |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ✅ | 33.0M | 🟢 **-43%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 39.3M | 🟢 **-33%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.3M | ✅ | 65.6M | +11% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 39.2M | 🟢 **-22%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 80.2M | +4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 85.9M | +19% |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 91.6M | +18% |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 33.9M | 🟢 **-54%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 29.3M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 36.6M | 🟢 **-51%** |
| not.json | not | 2 | ✅ | 67.5M | ✅ | 72.9M | +8% |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 55.6M | 🟢 **-22%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 39.1M | 🟢 **-43%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 54.6M | +0% |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.8M | ✅ | 46.3M | 🟢 **-23%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ✅ | 46.8M | 🟢 **-23%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 133.8M | 🟢 **-26%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 105.4M | 🟢 **-34%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ✅ | 10.1M | 🟢 **-70%** |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 61.3M | -9% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 20.1M | 🟢 **-46%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 48.6M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 134.8M | 🔴 **+50%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 48.1M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 47.7M | 🟢 **-28%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 24.2M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 74.3M | -2% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 21.5M | 🟢 **-56%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 25.2M | 🟢 **-49%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 75.6M | -1% |
| pattern.json | pattern validation | 8 | ✅ | 56.3M | ✅ | 68.6M | 🔴 **+22%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.3M | ✅ | 67.9M | 🔴 **+179%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.3M | ✅ | 17.6M | 🟢 **-38%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 14.4M | -5% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.0M | ✅ | 13.6M | 🟢 **-25%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ✅ | 17.5M | 🟢 **-23%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 23.3M | 🔴 **+29%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 50.5M | -10% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.9M | ✅ | 11.1M | 🟢 **-47%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.3M | ✅ | 49.5M | +0% |
| properties.json | properties with escaped characters | 2 | ✅ | 52.2M | ✅ | 22.0M | 🟢 **-58%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 62.9M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ✅ | 26.8M | -3% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.7M | ✅ | 39.8M | -7% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 16.1M | -18% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.9M | ✅ | 126.3M | 🟢 **-26%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 23.9M | 🟢 **-53%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ✅ | 29.5M | 🟢 **-37%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ✅ | 31.6M | 🟢 **-30%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.9M | ✅ | 12.4M | -17% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.2M | ✅ | 7.7M | 🔴 **+25%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 8.3M | 🔴 **+164%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ✅ | 8.1M | 🟢 **-42%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ✅ | 7.8M | 🟢 **-44%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ✅ | 12.7M | 🔴 **+38%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ✅ | 13.0M | 🔴 **+56%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ✅ | 4.5M | +11% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 4.9M | +20% |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ✅ | 13.2M | 🟢 **-51%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 28.2M | 🟢 **-49%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 25.4M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 26.8M | 🟢 **-44%** |
| ref.json | nested refs | 2 | ✅ | 57.3M | ✅ | 12.2M | 🟢 **-79%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 47.7M | ✅ | 27.7M | 🟢 **-42%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 41.9M | 🟢 **-23%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.8M | ✅ | 26.3M | 🟢 **-52%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 128.8M | -19% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 25.7M | 🟢 **-61%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.6M | ✅ | 2.6M | 🟢 **-73%** |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 28.8M | 🟢 **-47%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.9M | ✅ | 9.8M | 🟢 **-70%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ✅ | 33.6M | 🟢 **-41%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.3M | ✅ | 10.2M | 🟢 **-75%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 39.1M | ✅ | 10.3M | 🟢 **-74%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.8M | ✅ | 37.2M | 🟢 **-48%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 70.6M | ✅ | 34.6M | 🟢 **-51%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.7M | ✅ | 34.8M | 🟢 **-53%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 57.7M | ✅ | 23.8M | 🟢 **-59%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ✅ | 24.0M | 🟢 **-45%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.7M | ✅ | 28.4M | 🟢 **-48%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 29.0M | 🟢 **-47%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.5M | ✅ | 27.2M | 🟢 **-50%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 26.0M | 🟢 **-53%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.7M | ✅ | 26.5M | 🟢 **-52%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.4M | ✅ | 26.8M | 🟢 **-51%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.1M | ✅ | 23.0M | 🟢 **-68%** |
| ref.json | ref to if | 2 | ✅ | 71.3M | ✅ | 34.6M | 🟢 **-51%** |
| ref.json | ref to then | 2 | ✅ | 71.8M | ✅ | 33.8M | 🟢 **-53%** |
| ref.json | ref to else | 2 | ✅ | 71.1M | ✅ | 34.4M | 🟢 **-52%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 72.1M | ✅ | 32.1M | 🟢 **-56%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 32.4M | 🟢 **-58%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 32.5M | 🟢 **-58%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 36.8M | 🟢 **-52%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.9M | ✅ | 19.1M | 🔴 **+292%** |
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
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 73.8M | +18% |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 134.8M | -15% |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 131.7M | -17% |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 21.2M | 🟢 **-61%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ✅ | 32.0M | +14% |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ✅ | 52.0M | 🟢 **-22%** |
| type.json | number type matches numbers | 9 | ✅ | 66.8M | ✅ | 57.4M | -14% |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ✅ | 57.6M | -17% |
| type.json | object type matches objects | 7 | ✅ | 56.3M | ✅ | 46.5M | -17% |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 48.7M | 🟢 **-25%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 52.8M | 🟢 **-21%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.8M | ✅ | 49.1M | 🟢 **-23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.9M | ✅ | 53.4M | -19% |
| type.json | type as array with one item | 2 | ✅ | 91.2M | ✅ | 75.5M | -17% |
| type.json | type: array or object | 5 | ✅ | 87.7M | ✅ | 57.2M | 🟢 **-35%** |
| type.json | type: array, object or null | 5 | ✅ | 88.6M | ✅ | 68.4M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 126.1M | 🔴 **+52%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ✅ | 71.3M | +16% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 61.8M | ✅ | 49.7M | -20% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 50.4M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.9M | ✅ | 47.0M | -17% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.8M | ✅ | 77.0M | -2% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 51.7M | ✅ | 28.8M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 47.7M | ✅ | 28.3M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.4M | ✅ | 36.1M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.3M | ✅ | 12.5M | 🟢 **-48%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.9M | ✅ | 77.7M | -5% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 77.8M | 🔴 **+283%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.8M | ✅ | 13.2M | +3% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.4M | ✅ | 21.4M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ✅ | 20.2M | 🟢 **-52%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.6M | ✅ | 12.7M | +9% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ✅ | 72.7M | +18% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.9M | ✅ | 31.5M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.9M | ✅ | 33.6M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ✅ | 47.4M | 0% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.5M | ✅ | 27.2M | -4% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 142.9M | 🔴 **+56%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 69.3M | -8% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.7M | ✅ | 18.5M | 🟢 **-22%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.7M | ✅ | 29.7M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.1M | ✅ | 108.2M | 🔴 **+86%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.0M | ✅ | 21.7M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 42.8M | ✅ | 24.9M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 40.0M | ✅ | 20.5M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.9M | ✅ | 15.5M | -2% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 62.6M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 36.0M | ✅ | 16.8M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.5M | ✅ | 11.5M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 62.8M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.3M | ✅ | 60.8M | 🔴 **+88%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 18.7M | ✅ | 4.6M | 🟢 **-75%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 20.9M | ✅ | 6.6M | 🟢 **-69%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 32.2M | ✅ | 11.2M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 20.7M | ✅ | 7.3M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 23.1M | ✅ | 6.3M | 🟢 **-73%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ✅ | 5.3M | 🟢 **-73%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 32.9M | ✅ | 11.4M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 40.6M | ✅ | 21.1M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 35.4M | ✅ | 15.2M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 35.6M | ✅ | 15.2M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ✅ | 14.9M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ✅ | 15.1M | 🟢 **-57%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.2M | ✅ | 62.4M | 🔴 **+83%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.6M | ✅ | 63.6M | 🔴 **+89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 31.2M | ✅ | 13.4M | 🟢 **-57%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 33.0M | ✅ | 19.6M | 🟢 **-40%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 24.1M | ✅ | 12.9M | 🟢 **-47%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.4M | ✅ | 19.7M | 🔴 **+59%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 30.7M | ✅ | 15.0M | 🟢 **-51%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 35.7M | ✅ | 18.7M | 🟢 **-48%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.6M | ✅ | 18.5M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.3M | ✅ | 9.2M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 6.8M | 🟢 **-66%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ✅ | 2.4M | 🟢 **-67%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.6M | ✅ | 131.3M | 🔴 **+59%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.6M | ✅ | 55.2M | +7% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.7M | ✅ | 19.8M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.6M | ✅ | 3.1M | 🟢 **-79%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.0M | ✅ | 8.6M | 🟢 **-64%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.8M | ✅ | 11.9M | 🟢 **-60%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 6.9M | 🟢 **-60%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 23.8M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 28.4M | 🔴 **+49%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.9M | ✅ | 127.7M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.0M | ✅ | 53.4M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ✅ | 44.2M | 🟢 **-33%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 52.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 39.6M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ✅ | 19.1M | 🟢 **-70%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 122.2M | 🔴 **+38%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 132.8M | 🔴 **+50%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 47.9M | 🟢 **-25%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 115.1M | 🔴 **+46%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 44.9M | 🟢 **-25%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 116.0M | 🔴 **+47%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 46.2M | 🟢 **-23%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 29.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ✅ | 68.6M | +5% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 137.0M | 🟢 **-22%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.2M | ✅ | 28.9M | -16% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ✅ | 36.1M | 🟢 **-26%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 43.7M | 🟢 **-22%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 49.7M | -19% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.8M | ✅ | 29.5M | 🟢 **-41%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.5M | ✅ | 57.2M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.2M | ✅ | 30.8M | 🔴 **+53%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 29.6M | +1% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 30.0M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.5M | ✅ | 27.0M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 32.6M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 29.3M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 29.6M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 35.5M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 28.7M | -10% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ✅ | 20.2M | 🔴 **+20%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 16.7M | +7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ✅ | 16.0M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 26.6M | -10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.9M | ✅ | 26.1M | +19% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ✅ | 20.1M | -18% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 14.7M | 🟢 **-35%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.6M | ✅ | 14.6M | 🟢 **-36%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 8.1M | -4% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 10.5M | 🔴 **+25%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ✅ | 12.6M | 🟢 **-42%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ✅ | 8.8M | 🟢 **-66%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.0M | ✅ | 22.9M | -15% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ✅ | 13.3M | 🟢 **-68%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ✅ | 12.7M | 🟢 **-33%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ✅ | 32.0M | 🟢 **-28%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ✅ | 19.5M | +12% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ✅ | 33.9M | +4% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.6M | ✅ | 893K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ✅ | 37.9M | -9% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ✅ | 8.8M | -5% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ✅ | 21.5M | 🔴 **+23%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 5.2M | -17% |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.7M | ✅ | 16.1M | +3% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ✅ | 19.6M | 🟢 **-51%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 51.2M | 🟢 **-25%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ✅ | 29.8M | -3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ✅ | 10.9M | 🟢 **-36%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.8M | ✅ | 28.5M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ✅ | 28.2M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 25.5M | 🟢 **-53%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.5M | ✅ | 32.8M | 🟢 **-57%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 26.4M | 🟢 **-52%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.1M | ✅ | 18.0M | 🟢 **-42%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 54.5M | ✅ | 59.2M | +9% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.2M | ✅ | 24.0M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.0M | ✅ | 27.8M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ✅ | 25.2M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 17.1M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 51.7M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 34.9M | ✅ | 14.0M | 🟢 **-60%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.3M | ✅ | 17.9M | 🟢 **-53%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 36.5M | -9% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.2M | ✅ | 24.8M | 🟢 **-20%** |
| allOf.json | allOf simple types | 2 | ✅ | 85.3M | ✅ | 86.0M | +1% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 125.5M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 64.7M | -2% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.2M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 125.1M | 🟢 **-22%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 125.5M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 87.0M | +13% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.8M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 86.8M | +11% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.2M | ✅ | 60.1M | 🟢 **-29%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ✅ | 38.6M | 🟢 **-50%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 38.7M | 🟢 **-66%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.4M | ✅ | 38.6M | 🟢 **-46%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.3M | ✅ | 38.9M | 🟢 **-49%** |
| anyOf.json | anyOf | 4 | ✅ | 79.3M | ✅ | 90.0M | +13% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.0M | ✅ | 26.8M | 🟢 **-31%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 125.5M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 122.6M | 🟢 **-23%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 64.9M | -2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.2M | ✅ | 23.2M | 🟢 **-55%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 135.2M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 86.5M | +10% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ✅ | 137.5M | 🟢 **-23%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.5M | ✅ | 17.9M | 🟢 **-70%** |
| const.json | const validation | 3 | ✅ | 82.4M | ✅ | 70.7M | -14% |
| const.json | const with object | 4 | ✅ | 41.1M | ✅ | 32.0M | 🟢 **-22%** |
| const.json | const with array | 3 | ✅ | 58.5M | ✅ | 8.8M | 🟢 **-85%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 87.3M | +11% |
| const.json | const with false does not match 0 | 3 | ✅ | 69.9M | ✅ | 75.9M | +9% |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 76.8M | +1% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.1M | ✅ | 68.4M | +18% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 51.6M | 🟢 **-22%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.0M | ✅ | 33.6M | 🟢 **-51%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.9M | ✅ | 28.3M | 🟢 **-58%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 65.3M | +3% |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 74.4M | +1% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ✅ | 69.0M | -6% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ✅ | 38.5M | 🟢 **-47%** |
| const.json | nul characters in strings | 2 | ✅ | 64.0M | ✅ | 35.0M | 🟢 **-45%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.2M | ✅ | 67.2M | 🔴 **+24%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 75.7M | +15% |
| contains.json | contains keyword validation | 6 | ✅ | 64.4M | ✅ | 20.5M | 🟢 **-68%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.7M | ✅ | 14.8M | 🟢 **-77%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.9M | ✅ | 73.4M | +2% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ✅ | 26.0M | 🟢 **-64%** |
| contains.json | items + contains | 4 | ✅ | 47.1M | ✅ | 17.5M | 🟢 **-63%** |
| contains.json | contains with false if subschema | 2 | ✅ | 54.2M | ✅ | 73.3M | 🔴 **+35%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 38.5M | 🟢 **-50%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.5M | ✅ | 73.3M | 🟢 **-58%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 68.5M | 🟢 **-61%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 127.9M | 🟢 **-29%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.8M | ✅ | 136.2M | 🟢 **-23%** |
| default.json | invalid type for default | 2 | ✅ | 70.3M | ✅ | 72.8M | +4% |
| default.json | invalid string value for default | 2 | ✅ | 54.8M | ✅ | 46.0M | -16% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.5M | ✅ | 57.1M | +7% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.3M | ✅ | 68.0M | +4% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 137.9M | 🟢 **-22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.9M | ✅ | 30.8M | +7% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ✅ | 40.1M | -17% |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ✅ | 43.9M | 🟢 **-21%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.7M | ✅ | 54.5M | 0% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 49.5M | ✅ | 35.4M | 🟢 **-28%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 42.8M | ✅ | 26.3M | 🟢 **-39%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.2M | ✅ | 4.3M | 🟢 **-48%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.9M | ✅ | 18.9M | -14% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.8M | ✅ | 21.9M | 🔴 **+23%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ✅ | 3.2M | 🟢 **-72%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ✅ | 2.7M | 🟢 **-81%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ✅ | 2.6M | 🟢 **-75%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ✅ | 6.2M | 🟢 **-25%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.7M | ✅ | 15.2M | -14% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.8M | ✅ | 8.3M | 🟢 **-23%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.2M | ✅ | 2.1M | 🟢 **-74%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.8M | ✅ | 12.3M | -17% |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ✅ | 2.2M | 🟢 **-64%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ✅ | 1.4M | 🟢 **-79%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 31.7M | ✅ | 29.0M | -9% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ✅ | 4.2M | 🟢 **-48%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 8.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 38.0M | ✅ | 85.5M | 🔴 **+125%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.0M | ✅ | 38.9M | -12% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 86.0M | 🔴 **+34%** |
| enum.json | enums in properties | 6 | ✅ | 45.2M | ✅ | 40.0M | -12% |
| enum.json | enum with escaped characters | 3 | ✅ | 40.7M | ✅ | 96.4M | 🔴 **+137%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.0M | ✅ | 76.2M | +4% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 69.9M | +5% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.2M | ✅ | 75.2M | -1% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ✅ | 60.4M | -6% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.7M | ✅ | 89.4M | 🔴 **+34%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 35.5M | ✅ | 80.0M | 🔴 **+125%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.1M | ✅ | 91.0M | 🔴 **+30%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.8M | ✅ | 75.3M | +15% |
| enum.json | nul characters in strings | 2 | ✅ | 61.1M | ✅ | 73.6M | 🔴 **+20%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ✅ | 79.2M | +11% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 78.6M | +11% |
| format.json | email format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 183.8M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 181.9M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 181.3M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 183.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 147.0M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 177.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.8M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 184.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.9M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 177.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 150.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.3M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 183.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 134.8M | 🟢 **-22%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 134.7M | 🟢 **-21%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 130.2M | 🟢 **-24%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ✅ | 92.2M | +19% |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ✅ | 95.3M | 🔴 **+24%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 81.1M | +13% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 160.6M | ✅ | 125.9M | 🟢 **-22%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 85.4M | +12% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 79.9M | +6% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ✅ | 37.4M | 🟢 **-21%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.5M | ✅ | 24.7M | 🟢 **-47%** |
| items.json | a schema given for items | 4 | ✅ | 64.2M | ✅ | 42.7M | 🟢 **-33%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 168.5M | ✅ | 134.3M | 🟢 **-20%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ✅ | 77.9M | +8% |
| items.json | items and subitems | 6 | ✅ | 31.1M | ✅ | 8.2M | 🟢 **-74%** |
| items.json | nested items | 3 | ✅ | 13.8M | ✅ | 6.7M | 🟢 **-51%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ✅ | 102.0M | 🔴 **+26%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 53.5M | ✅ | 33.3M | 🟢 **-38%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 53.0M | ✅ | 28.9M | 🟢 **-45%** |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 78.9M | +8% |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 135.2M | 🟢 **-21%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ✅ | 24.4M | 🟢 **-68%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 22.6M | 🟢 **-66%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ✅ | 20.3M | 🟢 **-66%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 99.0M | 🔴 **+22%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 83.6M | +15% |
| maxLength.json | maxLength validation | 5 | ✅ | 62.2M | ✅ | 45.6M | 🟢 **-27%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 58.2M | ✅ | 50.7M | -13% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 69.0M | +18% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 48.1M | -3% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ✅ | 50.3M | -1% |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 99.3M | 🔴 **+29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 100.5M | 🔴 **+33%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 135.6M | 🟢 **-21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 72.0M | ✅ | 29.4M | 🟢 **-59%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.7M | ✅ | 23.4M | 🟢 **-62%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ✅ | 23.4M | 🟢 **-65%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ✅ | 24.6M | 🟢 **-60%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.8M | ✅ | 23.0M | 🟢 **-61%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.7M | ✅ | 53.7M | 🟢 **-69%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ✅ | 31.6M | 🟢 **-56%** |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ✅ | 99.6M | 🔴 **+23%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 83.1M | 🔴 **+25%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 36.5M | 🟢 **-37%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 46.0M | 🟢 **-22%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 69.3M | +16% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 43.4M | -14% |
| minimum.json | minimum validation | 4 | ✅ | 76.5M | ✅ | 98.6M | 🔴 **+29%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.2M | ✅ | 90.3M | 🔴 **+25%** |
| multipleOf.json | by int | 3 | ✅ | 76.8M | ✅ | 95.2M | 🔴 **+24%** |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 59.4M | -19% |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 27.2M | 🟢 **-59%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ✅ | 17.2M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 85.4M | +11% |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 75.5M | +6% |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 46.7M | 🟢 **-32%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 59.3M | +9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ✅ | 49.4M | -18% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.7M | ✅ | 61.5M | +1% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 185.2M | ✅ | 138.8M | 🟢 **-25%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 125.4M | 🟢 **-21%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ✅ | 14.8M | 🟢 **-57%** |
| oneOf.json | oneOf | 4 | ✅ | 65.4M | ✅ | 75.5M | +15% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.3M | ✅ | 26.9M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 63.4M | -4% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 121.3M | 🔴 **+35%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 63.1M | -4% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 63.6M | -4% |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 28.3M | 🟢 **-37%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 83.6M | +10% |
| oneOf.json | oneOf with required | 4 | ✅ | 41.7M | ✅ | 25.6M | 🟢 **-39%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 32.2M | 🟢 **-35%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 85.9M | +13% |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 69.1M | 🔴 **+22%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 56.3M | 🔴 **+300%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ✅ | 18.3M | 🟢 **-33%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 14.6M | -5% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ✅ | 13.4M | 🟢 **-25%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ✅ | 18.4M | -19% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 18.7M | +7% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.9M | ✅ | 56.0M | -18% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 68.0M | ✅ | 77.1M | +13% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 67.8M | -14% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 79.0M | ✅ | 69.3M | -12% |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 52.0M | -7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ✅ | 12.1M | 🟢 **-44%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 52.4M | +6% |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ✅ | 23.4M | 🟢 **-55%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 58.1M | -17% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ✅ | 27.5M | -1% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 47.8M | ✅ | 39.4M | -18% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 16.2M | -16% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.4M | ✅ | 130.4M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.8M | ✅ | 22.9M | 🟢 **-55%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ✅ | 29.8M | 🟢 **-37%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ✅ | 32.3M | 🟢 **-29%** |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ✅ | 15.0M | 🟢 **-44%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 27.6M | 🟢 **-50%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 23.7M | 🟢 **-60%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 28.7M | 🟢 **-40%** |
| ref.json | nested refs | 2 | ✅ | 54.7M | ✅ | 12.2M | 🟢 **-78%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 46.1M | ✅ | 28.9M | 🟢 **-37%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.8M | ✅ | 45.3M | -17% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 28.6M | 🟢 **-48%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 119.7M | 🟢 **-25%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 35.0M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.7M | ✅ | 2.9M | 🟢 **-70%** |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 27.8M | 🟢 **-49%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.8M | ✅ | 10.3M | 🟢 **-69%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ✅ | 36.9M | 🟢 **-35%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.7M | ✅ | 9.9M | 🟢 **-76%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 41.9M | ✅ | 10.4M | 🟢 **-75%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.3M | ✅ | 43.4M | 🟢 **-39%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 69.8M | ✅ | 40.1M | 🟢 **-42%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ✅ | 41.6M | 🟢 **-43%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 54.6M | ✅ | 24.4M | 🟢 **-55%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.2M | ✅ | 24.3M | 🟢 **-44%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ✅ | 28.2M | 🟢 **-49%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 26.7M | 🟢 **-51%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.8M | ✅ | 27.5M | 🟢 **-50%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 27.7M | 🟢 **-50%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.8M | ✅ | 27.5M | 🟢 **-50%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.8M | ✅ | 27.7M | 🟢 **-49%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.4M | ✅ | 23.6M | 🟢 **-67%** |
| ref.json | ref to if | 2 | ✅ | 70.8M | ✅ | 39.1M | 🟢 **-45%** |
| ref.json | ref to then | 2 | ✅ | 70.9M | ✅ | 39.0M | 🟢 **-45%** |
| ref.json | ref to else | 2 | ✅ | 70.8M | ✅ | 39.2M | 🟢 **-45%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 71.3M | ✅ | 35.4M | 🟢 **-50%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 36.4M | 🟢 **-53%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 31.1M | 🟢 **-60%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 43.5M | 🟢 **-43%** |
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
| required.json | required validation | 5 | ✅ | 77.2M | ✅ | 78.8M | +2% |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 121.6M | 🟢 **-24%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 121.6M | 🟢 **-24%** |
| required.json | required with escaped characters | 2 | ✅ | 53.9M | ✅ | 22.6M | 🟢 **-58%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ✅ | 35.2M | 🔴 **+27%** |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ✅ | 64.4M | -4% |
| type.json | number type matches numbers | 9 | ✅ | 69.3M | ✅ | 68.8M | -1% |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 67.0M | -3% |
| type.json | object type matches objects | 7 | ✅ | 58.6M | ✅ | 57.6M | -2% |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 59.5M | -7% |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 63.1M | -5% |
| type.json | null type matches only the null object | 10 | ✅ | 65.7M | ✅ | 49.6M | 🟢 **-25%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.1M | ✅ | 65.3M | -1% |
| type.json | type as array with one item | 2 | ✅ | 76.8M | ✅ | 83.0M | +8% |
| type.json | type: array or object | 5 | ✅ | 70.2M | ✅ | 65.5M | -7% |
| type.json | type: array, object or null | 5 | ✅ | 77.5M | ✅ | 73.7M | -5% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 118.0M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ✅ | 79.2M | 🔴 **+28%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.4M | ✅ | 50.7M | -12% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 45.2M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.8M | ✅ | 51.0M | -10% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 67.8M | -14% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 53.5M | ✅ | 25.5M | 🟢 **-52%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.3M | ✅ | 37.4M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.8M | ✅ | 14.0M | 🟢 **-43%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ✅ | 70.6M | -14% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.7M | ✅ | 70.6M | 🔴 **+226%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.0M | ✅ | 12.2M | -6% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.6M | ✅ | 23.8M | 🔴 **+43%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ✅ | 26.8M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.7M | ✅ | 11.6M | -1% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ✅ | 79.7M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 53.1M | ✅ | 34.9M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 53.0M | ✅ | 35.0M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ✅ | 57.9M | 🔴 **+22%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.1M | ✅ | 27.6M | -2% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 22.5M | ✅ | 12.3M | 🟢 **-46%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 9.1M | ✅ | 3.5M | 🟢 **-61%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.8M | ✅ | 5.9M | 🟢 **-46%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 20.8M | ✅ | 14.1M | 🟢 **-32%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 130.5M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.5M | ✅ | 15.2M | 🟢 **-35%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.8M | ✅ | 32.4M | 🟢 **-26%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 130.6M | 🔴 **+124%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.1M | ✅ | 24.9M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.7M | ✅ | 22.8M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 37.9M | ✅ | 19.4M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.3M | ✅ | 13.8M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.6M | ✅ | 130.6M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 39.0M | ✅ | 16.0M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.9M | ✅ | 15.5M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.9M | ✅ | 11.5M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 56.9M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 23.9M | ✅ | 57.0M | 🔴 **+138%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.4M | ✅ | 5.6M | 🟢 **-66%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.7M | ✅ | 8.8M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 28.7M | ✅ | 10.7M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.7M | ✅ | 6.9M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 22.4M | ✅ | 10.1M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ✅ | 6.6M | 🟢 **-66%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.9M | ✅ | 11.7M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 38.3M | ✅ | 20.6M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ✅ | 15.0M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 33.1M | ✅ | 15.1M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ✅ | 15.9M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ✅ | 16.5M | 🟢 **-53%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ✅ | 56.9M | 🔴 **+97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 57.0M | 🔴 **+97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ✅ | 14.1M | 🟢 **-50%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 32.3M | ✅ | 18.1M | 🟢 **-44%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 23.1M | ✅ | 14.0M | 🟢 **-39%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ✅ | 18.0M | 🔴 **+50%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.9M | ✅ | 14.5M | 🟢 **-50%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 36.9M | ✅ | 20.0M | 🟢 **-46%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ✅ | 20.6M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.0M | ✅ | 10.1M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 9.3M | 🟢 **-54%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ✅ | 2.7M | 🟢 **-64%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 81.9M | ✅ | 118.1M | 🔴 **+44%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.7M | ✅ | 50.9M | -1% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.1M | ✅ | 21.4M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.7M | ✅ | 4.2M | 🟢 **-72%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.2M | ✅ | 12.4M | 🟢 **-49%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.5M | ✅ | 12.0M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ✅ | 8.0M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ✅ | 23.8M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.8M | ✅ | 29.1M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ✅ | 126.8M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ✅ | 45.7M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.6M | ✅ | 41.9M | 🟢 **-40%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ✅ | 23.6M | 🟢 **-64%** |
| optional/bignum.json | integer | 2 | ✅ | 88.6M | ✅ | 112.0M | 🔴 **+27%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 121.8M | 🔴 **+37%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 60.7M | -4% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.7M | 🔴 **+36%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 59.8M | 0% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.8M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 59.7M | 0% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 70.0M | +8% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 133.3M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ✅ | 30.1M | -12% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ✅ | 39.1M | -19% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.6M | ✅ | 44.8M | -19% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ✅ | 52.6M | -14% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.9M | ✅ | 33.5M | 🟢 **-33%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ✅ | 4.1M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 68.5M | +6% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.6M | ✅ | 34.1M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 35.0M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 33.8M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 31.3M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.3M | ✅ | 35.1M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 33.7M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ✅ | 35.0M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 37.1M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 32.2M | +0% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ✅ | 19.4M | +12% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 15.7M | +4% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ✅ | 15.7M | +12% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 31.1M | +5% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ✅ | 27.6M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.3M | ✅ | 20.6M | -15% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 14.0M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 14.0M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ✅ | 8.8M | +3% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ✅ | 10.7M | +17% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ✅ | 16.0M | 🟢 **-26%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ✅ | 9.4M | 🟢 **-64%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.8M | ✅ | 24.3M | -13% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ✅ | 13.3M | 🟢 **-68%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.1M | ✅ | 124K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.3M | ✅ | 35.3M | 🟢 **-20%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ✅ | 16.9M | -3% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 24.4M | ✅ | 34.9M | 🔴 **+43%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.8M | ✅ | 947K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.0M | ✅ | 41.9M | +5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 8.1M | -18% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ✅ | 18.8M | +9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-23%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ✅ | 15.7M | +1% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.6M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 42.7M | ✅ | 23.9M | 🟢 **-44%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 61.6M | -9% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ✅ | 34.1M | +14% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ✅ | 10.1M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.9M | ✅ | 28.4M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ✅ | 28.6M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 27.1M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 37.5M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 27.2M | 🟢 **-50%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.2M | ✅ | 24.8M | 🟢 **-21%** |
