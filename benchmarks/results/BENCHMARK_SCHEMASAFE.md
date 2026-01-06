# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.7M | 184/199 | 21.1M | 184 | 🟢 **-21%** |
| draft6 | 276 | ✅ 276 | 26.7M | 259/276 | 23.4M | 259 | -12% |
| draft7 | 313 | ✅ 313 | 14.9M | 281/313 | 21.2M | 281 | 🔴 **+42%** |
| draft2019-09 | 435 | ✅ 435 | 18.3M | 399/435 | 18.8M | 399 | +3% |
| draft2020-12 | 448 | ✅ 448 | 19.1M | 389/448 | 15.2M | 389 | 🟢 **-20%** |
| **Total** | 1671 | 1670/1671 | 19.3M | 1512/1671 | 19.1M | 1512 | -1% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.37x faster** (38 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.4M | ✅ | 7.5M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 80.7M | ✅ | 125.4M | 🔴 **+55%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.0M | ✅ | 100.5M | 🟢 **-24%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 83.6M | ✅ | 132.3M | 🔴 **+58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 69.3M | 🟢 **-44%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 43.7M | ✅ | 35.9M | -18% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.4M | ✅ | 28.1M | 🟢 **-52%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 66.7M | ✅ | 79.2M | +19% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.1M | ✅ | 125.5M | -18% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.0M | ✅ | 43.1M | +13% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.4M | ✅ | 24.2M | -1% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.5M | ✅ | 27.0M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.7M | ✅ | 25.1M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 73.5M | ✅ | 125.4M | 🔴 **+71%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.9M | ✅ | 17.5M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.4M | ✅ | 51.0M | +3% |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 39.4M | -18% |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 25.2M | -5% |
| allOf.json | allOf simple types | 2 | ✅ | 108.7M | ✅ | 84.8M | 🟢 **-22%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.7M | ✅ | 125.4M | 🔴 **+56%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.1M | ✅ | 113.8M | 🟢 **-26%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.5M | ✅ | 88.2M | 🔴 **+27%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 88.5M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.3M | ✅ | 84.3M | +20% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 134.8M | ✅ | 59.6M | 🟢 **-56%** |
| anyOf.json | anyOf | 4 | ✅ | 72.1M | ✅ | 89.9M | 🔴 **+25%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 41.2M | ✅ | 27.8M | 🟢 **-33%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.5M | ✅ | 31.1M | 🟢 **-34%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 119.9M | 🟢 **-27%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 87.6M | 🔴 **+23%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 74.8M | 🟢 **-31%** |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ✅ | 45.4M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.6M | ✅ | 57.3M | 🟢 **-27%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.5M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.1M | ✅ | 72.7M | 🟢 **-20%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 25.9M | ✅ | 31.6M | 🔴 **+22%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.6M | ✅ | 35.5M | 🟢 **-39%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ✅ | 11.6M | +3% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.0M | ✅ | 25.8M | 🟢 **-45%** |
| enum.json | simple enum validation | 2 | ✅ | 79.7M | ✅ | 86.4M | +8% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 38.7M | 🟢 **-36%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.7M | ✅ | 88.7M | 🔴 **+31%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 37.0M | 🔴 **+151%** |
| enum.json | enum with escaped characters | 3 | ✅ | 54.6M | ✅ | 69.7M | 🔴 **+28%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 75.9M | 🟢 **-33%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.7M | ✅ | 68.6M | -6% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.7M | ✅ | 77.3M | 🟢 **-31%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.1M | ✅ | 69.3M | +13% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 90.0M | 🟢 **-21%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.8M | ✅ | 80.7M | 🔴 **+28%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 91.0M | -19% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.9M | ✅ | 79.4M | 🔴 **+26%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 74.5M | -18% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 54.5M | ✅ | 65.2M | +20% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 94.0M | ✅ | 76.3M | -19% |
| format.json | email format | 6 | ✅ | 79.9M | ✅ | 129.4M | 🔴 **+62%** |
| format.json | ipv4 format | 6 | ✅ | 160.7M | ✅ | 133.2M | -17% |
| format.json | ipv6 format | 6 | ✅ | 81.4M | ✅ | 121.4M | 🔴 **+49%** |
| format.json | hostname format | 6 | ✅ | 163.4M | ✅ | 133.1M | -19% |
| format.json | date-time format | 6 | ✅ | 81.6M | ✅ | 110.1M | 🔴 **+35%** |
| format.json | uri format | 6 | ✅ | 162.9M | ✅ | 102.8M | 🟢 **-37%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.5M | ✅ | 21.9M | 🟢 **-48%** |
| items.json | a schema given for items | 4 | ✅ | 82.2M | ✅ | 43.8M | 🟢 **-47%** |
| items.json | an array of schemas for items | 6 | ✅ | 61.9M | ✅ | 57.9M | -6% |
| items.json | items and subitems | 6 | ✅ | 28.1M | ✅ | 7.8M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 6.8M | 🟢 **-44%** |
| items.json | items with null instance elements | 1 | ✅ | 68.9M | ✅ | 66.4M | -4% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.5M | ✅ | 69.3M | -6% |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ✅ | 98.6M | 🔴 **+42%** |
| maxLength.json | maxLength validation | 5 | ✅ | 50.2M | ✅ | 40.4M | -20% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 68.4M | 🔴 **+25%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.0M | ✅ | 50.0M | +4% |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 95.1M | 🔴 **+36%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.1M | ✅ | 95.1M | 🔴 **+38%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 70.1M | ✅ | 98.0M | 🔴 **+40%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 64.7M | ✅ | 43.8M | 🟢 **-32%** |
| minItems.json | minItems validation | 4 | ✅ | 71.5M | ✅ | 96.7M | 🔴 **+35%** |
| minLength.json | minLength validation | 5 | ✅ | 54.1M | ✅ | 19.8M | 🟢 **-63%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.7M | ✅ | 69.0M | 🔴 **+24%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 97.1M | 🔴 **+39%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 70.0M | ✅ | 96.5M | 🔴 **+38%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 64.6M | ✅ | 67.3M | +4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.2M | ✅ | 90.0M | 🔴 **+36%** |
| multipleOf.json | by int | 3 | ✅ | 69.7M | ✅ | 94.8M | 🔴 **+36%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 35.8M | 🟢 **-47%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 27.1M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 70.1M | ✅ | 44.8M | 🟢 **-36%** |
| not.json | not multiple types | 3 | ✅ | 63.0M | ✅ | 62.5M | -1% |
| not.json | not more complex schema | 3 | ✅ | 60.9M | ✅ | 46.4M | 🟢 **-24%** |
| not.json | forbidden property | 2 | ✅ | 49.6M | ✅ | 58.9M | +19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 56.8M | ✅ | 61.5M | +8% |
| not.json | double negation | 1 | ✅ | 80.3M | ✅ | 124.2M | 🔴 **+55%** |
| oneOf.json | oneOf | 4 | ✅ | 70.9M | ✅ | 70.7M | 0% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.9M | ✅ | 26.2M | -18% |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.5M | ✅ | 28.9M | 🟢 **-30%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 67.0M | ✅ | 84.7M | 🔴 **+26%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.1M | ✅ | 26.0M | 🟢 **-42%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 53.5M | ✅ | 26.5M | 🟢 **-51%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.2M | ✅ | 86.4M | 🔴 **+27%** |
| pattern.json | pattern validation | 8 | ✅ | 51.8M | ✅ | 72.2M | 🔴 **+39%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.2M | ✅ | 60.5M | 🔴 **+186%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 17.1M | 🟢 **-36%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ✅ | 14.8M | +10% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 13.0M | -14% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.9M | ✅ | 22.4M | 🔴 **+32%** |
| properties.json | object properties validation | 6 | ✅ | 51.7M | ✅ | 45.2M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.8M | ✅ | 10.9M | 🟢 **-42%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.6M | ✅ | 24.5M | 🟢 **-49%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.0M | ✅ | 60.3M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 29.0M | +6% |
| ref.json | root pointer ref | 4 | ✅ | 24.4M | ✅ | 7.9M | 🟢 **-68%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.1M | ✅ | 25.4M | 🟢 **-50%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.9M | ✅ | 21.2M | 🟢 **-61%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.8M | ✅ | 25.9M | 🟢 **-39%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 10.7M | 🟢 **-72%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.7M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 69.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.9M | ✅ | 45.0M | -12% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.3M | ✅ | 22.4M | 🟢 **-55%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.0M | ✅ | 2.6M | 🟢 **-76%** |
| ref.json | refs with quote | 2 | ✅ | 51.3M | ✅ | 25.5M | 🟢 **-50%** |
| ref.json | Location-independent identifier | 2 | ✅ | 70.0M | ✅ | 18.3M | 🟢 **-74%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.6M | ✅ | 16.7M | 🟢 **-66%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.0M | ✅ | 20.4M | 🟢 **-62%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 48.7M | ✅ | 19.8M | 🟢 **-59%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 68.7M | ✅ | 17.2M | 🟢 **-75%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 67.4M | ✅ | 33.7M | 🟢 **-50%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.4M | ✅ | 34.4M | 🟢 **-45%** |
| refRemote.json | remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 83.0M | 🔴 **+39%** |
| required.json | required default validation | 1 | ✅ | 80.4M | ✅ | 125.5M | 🔴 **+56%** |
| required.json | required with escaped characters | 2 | ✅ | 49.7M | ✅ | 24.0M | 🟢 **-52%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.5M | ✅ | 36.2M | 🔴 **+37%** |
| type.json | integer type matches integers | 8 | ✅ | 57.6M | ✅ | 60.2M | +4% |
| type.json | number type matches numbers | 9 | ✅ | 61.7M | ✅ | 72.8M | +18% |
| type.json | string type matches strings | 9 | ✅ | 60.8M | ✅ | 72.6M | +19% |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 58.0M | +6% |
| type.json | array type matches arrays | 7 | ✅ | 57.4M | ✅ | 60.3M | +5% |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 63.3M | +6% |
| type.json | null type matches only the null object | 10 | ✅ | 59.0M | ✅ | 60.4M | +2% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.2M | ✅ | 69.0M | 🔴 **+21%** |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 87.2M | 🔴 **+25%** |
| type.json | type: array or object | 5 | ✅ | 43.7M | ✅ | 66.8M | 🔴 **+53%** |
| type.json | type: array, object or null | 5 | ✅ | 64.4M | ✅ | 81.0M | 🔴 **+26%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 7.8M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.2M | ✅ | 20.2M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 29.6M | 🔴 **+61%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.1M | ✅ | 130.8M | 🔴 **+70%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 47.3M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 41.4M | 🟢 **-33%** |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 121.4M | 🔴 **+53%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 127.2M | 🔴 **+59%** |
| optional/bignum.json | string | 1 | ✅ | 58.7M | ✅ | 63.2M | +8% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 111.3M | 🔴 **+55%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 60.5M | +8% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.5M | ✅ | 111.0M | 🔴 **+55%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 60.5M | +8% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.6M | ✅ | 70.2M | 🔴 **+155%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.3M | ✅ | 35.5M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.5M | ✅ | 31.7M | +20% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 32.3M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 33.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.6M | ✅ | 35.2M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 36.6M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.1M | ✅ | 36.0M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.7M | ✅ | 37.6M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.5M | ✅ | 33.6M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.2M | ✅ | 20.5M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 15.8M | +4% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 15.1M | 0% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.4M | ✅ | 32.8M | +20% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ✅ | 24.4M | 🔴 **+24%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ✅ | 20.8M | -9% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 11.7M | 🟢 **-41%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ✅ | 15.8M | -17% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.4M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 10.7M | 🔴 **+25%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.8M | ✅ | 15.9M | 🟢 **-23%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 9.2M | 🟢 **-64%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 14.0M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ✅ | 35.4M | -4% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ✅ | 18.0M | 🔴 **+53%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.7M | 🟢 **-26%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.2M | ✅ | 24.4M | 🟢 **-30%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.3M | ✅ | 34.8M | +19% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ✅ | 11.1M | 🟢 **-33%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.6M | +3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.1M | ✅ | 15.7M | 🟢 **-55%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 134.1M | ✅ | 124.7M | -7% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 61.1M | ✅ | 89.5M | 🔴 **+46%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 149.4M | ✅ | 125.3M | -16% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 62.1M | ✅ | 69.3M | +12% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.5M | ✅ | 35.7M | 🟢 **-36%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.5M | ✅ | 28.3M | 🟢 **-22%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 78.6M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 55.3M | ✅ | 125.4M | 🔴 **+127%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.5M | ✅ | 43.4M | -5% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.8M | ✅ | 24.4M | +17% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 27.1M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.6M | ✅ | 25.1M | -18% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 124.5M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.9M | ✅ | 16.2M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 51.6M | 🟢 **-25%** |
| allOf.json | allOf | 4 | ✅ | 35.2M | ✅ | 39.9M | +13% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 25.5M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 61.0M | ✅ | 64.1M | +5% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.8M | ✅ | 125.2M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 56.3M | ✅ | 63.9M | +14% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.3M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 66.7M | ✅ | 125.4M | 🔴 **+88%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 125.9M | -17% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 63.5M | ✅ | 87.7M | 🔴 **+38%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 85.0M | 🟢 **-28%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.6M | ✅ | 86.5M | 🔴 **+34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 81.8M | ✅ | 59.5M | 🟢 **-27%** |
| anyOf.json | anyOf | 4 | ✅ | 65.4M | ✅ | 93.4M | 🔴 **+43%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 40.9M | ✅ | 27.2M | 🟢 **-33%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.1M | ✅ | 125.5M | 🔴 **+72%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.6M | ✅ | 124.9M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 56.1M | ✅ | 63.8M | +14% |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 21.8M | 🟢 **-70%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.3M | ✅ | 127.2M | 🔴 **+86%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.5M | ✅ | 87.6M | 🟢 **-27%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 60.1M | ✅ | 126.3M | 🔴 **+110%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.8M | ✅ | 17.1M | 🟢 **-81%** |
| const.json | const validation | 3 | ✅ | 55.8M | ✅ | 66.8M | +20% |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 32.2M | 🟢 **-35%** |
| const.json | const with array | 3 | ✅ | 46.9M | ✅ | 8.9M | 🟢 **-81%** |
| const.json | const with null | 2 | ✅ | 114.0M | ✅ | 87.0M | 🟢 **-24%** |
| const.json | const with false does not match 0 | 3 | ✅ | 57.6M | ✅ | 62.8M | +9% |
| const.json | const with true does not match 1 | 3 | ✅ | 105.5M | ✅ | 72.7M | 🟢 **-31%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 47.0M | ✅ | 67.5M | 🔴 **+44%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 89.3M | ✅ | 63.9M | 🟢 **-28%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.7M | ✅ | 33.4M | 🟢 **-35%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 88.0M | ✅ | 33.4M | 🟢 **-62%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 48.9M | ✅ | 61.6M | 🔴 **+26%** |
| const.json | const with 1 does not match true | 3 | ✅ | 109.8M | ✅ | 89.4M | -19% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.1M | ✅ | 68.5M | 🔴 **+31%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 104.6M | ✅ | 80.9M | 🟢 **-23%** |
| const.json | nul characters in strings | 2 | ✅ | 52.5M | ✅ | 72.4M | 🔴 **+38%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 37.8M | ✅ | 67.2M | 🔴 **+78%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.3M | ✅ | 76.0M | 🔴 **+43%** |
| contains.json | contains keyword validation | 6 | ✅ | 95.2M | ✅ | 20.0M | 🟢 **-79%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 51.1M | ✅ | 14.6M | 🟢 **-71%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 98.9M | ✅ | 72.7M | 🟢 **-26%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 55.6M | ✅ | 42.3M | 🟢 **-24%** |
| contains.json | items + contains | 4 | ✅ | 50.4M | ✅ | 17.9M | 🟢 **-65%** |
| contains.json | contains with null instance elements | 1 | ✅ | 64.4M | ✅ | 38.0M | 🟢 **-41%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 75.6M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 48.2M | ✅ | 48.2M | +0% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 69.5M | ✅ | 54.7M | 🟢 **-21%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.5M | ✅ | 71.3M | 🟢 **-21%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 75.6M | ✅ | 137.9M | 🔴 **+82%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ✅ | 31.6M | 🟢 **-21%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.8M | ✅ | 34.0M | -17% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.0M | ✅ | 55.1M | 🟢 **-34%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 10.4M | ✅ | 16.7M | 🔴 **+60%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.1M | ✅ | 26.6M | 🟢 **-42%** |
| enum.json | simple enum validation | 2 | ✅ | 59.1M | ✅ | 85.7M | 🔴 **+45%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 38.7M | 🟢 **-36%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 55.8M | ✅ | 89.3M | 🔴 **+60%** |
| enum.json | enums in properties | 6 | ✅ | 15.5M | ✅ | 39.3M | 🔴 **+154%** |
| enum.json | enum with escaped characters | 3 | ✅ | 62.8M | ✅ | 96.3M | 🔴 **+53%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.8M | ✅ | 74.9M | 🟢 **-32%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.7M | ✅ | 68.0M | 🔴 **+24%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.4M | ✅ | 76.7M | 🟢 **-31%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 38.1M | ✅ | 68.3M | 🔴 **+79%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.6M | ✅ | 88.9M | 🟢 **-22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ✅ | 81.4M | 🔴 **+44%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 108.1M | ✅ | 88.9M | -18% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.2M | ✅ | 81.0M | 🔴 **+47%** |
| enum.json | nul characters in strings | 2 | ✅ | 81.6M | ✅ | 74.4M | -9% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ✅ | 75.5M | 🔴 **+36%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.5M | ✅ | 78.6M | 🟢 **-28%** |
| format.json | email format | 6 | ✅ | 69.5M | ✅ | 132.6M | 🔴 **+91%** |
| format.json | ipv4 format | 6 | ✅ | 157.1M | ✅ | 133.4M | -15% |
| format.json | ipv6 format | 6 | ✅ | 69.4M | ✅ | 124.0M | 🔴 **+79%** |
| format.json | hostname format | 6 | ✅ | 159.8M | ✅ | 132.8M | -17% |
| format.json | date-time format | 6 | ✅ | 69.5M | ✅ | 121.9M | 🔴 **+75%** |
| format.json | json-pointer format | 6 | ✅ | 158.3M | ✅ | 133.5M | -16% |
| format.json | uri format | 6 | ✅ | 69.6M | ✅ | 132.9M | 🔴 **+91%** |
| format.json | uri-reference format | 6 | ✅ | 151.0M | ✅ | 124.6M | -17% |
| format.json | uri-template format | 6 | ✅ | 69.6M | ✅ | 132.7M | 🔴 **+91%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 25.3M | ✅ | 25.1M | -1% |
| items.json | a schema given for items | 4 | ✅ | 45.5M | ✅ | 43.3M | -5% |
| items.json | an array of schemas for items | 6 | ✅ | 89.3M | ✅ | 58.2M | 🟢 **-35%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 55.2M | ✅ | 135.1M | 🔴 **+145%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 131.5M | ✅ | 66.7M | 🟢 **-49%** |
| items.json | items with boolean schemas | 3 | ✅ | 48.0M | ✅ | 79.4M | 🔴 **+65%** |
| items.json | items and subitems | 6 | ✅ | 27.7M | ✅ | 8.3M | 🟢 **-70%** |
| items.json | nested items | 3 | ✅ | 11.4M | ✅ | 6.8M | 🟢 **-40%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 60.2M | ✅ | 66.4M | +10% |
| items.json | array-form items with null instance e... | 1 | ✅ | 62.0M | ✅ | 69.3M | +12% |
| maxItems.json | maxItems validation | 4 | ✅ | 64.7M | ✅ | 95.5M | 🔴 **+48%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 57.8M | ✅ | 83.1M | 🔴 **+44%** |
| maxLength.json | maxLength validation | 5 | ✅ | 48.5M | ✅ | 47.1M | -3% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.8M | ✅ | 51.1M | +7% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.0M | ✅ | 68.3M | 🔴 **+42%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.3M | ✅ | 47.3M | +12% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.5M | ✅ | 48.8M | +12% |
| maximum.json | maximum validation | 4 | ✅ | 62.7M | ✅ | 99.8M | 🔴 **+59%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 59.3M | ✅ | 92.5M | 🔴 **+56%** |
| minItems.json | minItems validation | 4 | ✅ | 57.8M | ✅ | 99.5M | 🔴 **+72%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 52.9M | ✅ | 81.4M | 🔴 **+54%** |
| minLength.json | minLength validation | 5 | ✅ | 50.5M | ✅ | 36.8M | 🟢 **-27%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 48.1M | ✅ | 48.0M | 0% |
| minProperties.json | minProperties validation | 6 | ✅ | 51.9M | ✅ | 69.2M | 🔴 **+33%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.1M | ✅ | 49.0M | +14% |
| minimum.json | minimum validation | 4 | ✅ | 63.9M | ✅ | 92.5M | 🔴 **+45%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 56.4M | ✅ | 90.4M | 🔴 **+60%** |
| multipleOf.json | by int | 3 | ✅ | 62.6M | ✅ | 90.3M | 🔴 **+44%** |
| multipleOf.json | by number | 3 | ✅ | 56.8M | ✅ | 59.4M | +5% |
| multipleOf.json | by small number | 2 | ✅ | 53.5M | ✅ | 25.9M | 🟢 **-51%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.3M | ✅ | 1.0M | 🟢 **-97%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.2M | ✅ | 17.2M | 🟢 **-73%** |
| not.json | not | 2 | ✅ | 63.7M | ✅ | 85.8M | 🔴 **+35%** |
| not.json | not multiple types | 3 | ✅ | 54.9M | ✅ | 67.3M | 🔴 **+23%** |
| not.json | not more complex schema | 3 | ✅ | 48.7M | ✅ | 45.8M | -6% |
| not.json | forbidden property | 2 | ✅ | 45.1M | ✅ | 59.5M | 🔴 **+32%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.8M | ✅ | 62.7M | 🔴 **+26%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.0M | ✅ | 62.3M | 🔴 **+25%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 71.9M | ✅ | 139.0M | 🔴 **+93%** |
| not.json | double negation | 1 | ✅ | 73.0M | ✅ | 123.7M | 🔴 **+70%** |
| oneOf.json | oneOf | 4 | ✅ | 56.2M | ✅ | 62.8M | +12% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.8M | ✅ | 27.0M | -18% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 64.4M | +15% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.1M | ✅ | 125.2M | 🔴 **+71%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.1M | ✅ | 64.5M | +15% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.9M | ✅ | 64.6M | +16% |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ✅ | 28.2M | 🟢 **-29%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 59.6M | ✅ | 85.8M | 🔴 **+44%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.0M | ✅ | 25.6M | 🟢 **-41%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.8M | ✅ | 31.1M | 🟢 **-29%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 59.3M | ✅ | 87.1M | 🔴 **+47%** |
| pattern.json | pattern validation | 8 | ✅ | 47.1M | ✅ | 72.0M | 🔴 **+53%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.5M | ✅ | 60.5M | 🔴 **+169%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.2M | ✅ | 17.4M | 🟢 **-28%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.6M | ✅ | 14.8M | +10% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 13.2M | -9% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.3M | ✅ | 18.0M | -11% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 22.7M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 47.8M | ✅ | 54.5M | +14% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.0M | ✅ | 11.1M | 🟢 **-35%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.0M | ✅ | 58.3M | 🔴 **+35%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ✅ | 23.6M | 🟢 **-45%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 48.4M | ✅ | 60.3M | 🔴 **+24%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.5M | ✅ | 28.8M | +13% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 35.6M | ✅ | 39.9M | +12% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ✅ | 15.2M | -18% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 69.9M | ✅ | 135.5M | 🔴 **+94%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ✅ | 25.4M | 🟢 **-40%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 36.5M | ✅ | 28.9M | 🟢 **-21%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.7M | ✅ | 33.1M | -12% |
| ref.json | root pointer ref | 4 | ✅ | 21.3M | ✅ | 14.7M | 🟢 **-31%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.6M | ✅ | 29.1M | 🟢 **-35%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.1M | ✅ | 25.0M | 🟢 **-49%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.8M | ✅ | 29.5M | 🟢 **-29%** |
| ref.json | nested refs | 2 | ✅ | 35.7M | ✅ | 11.7M | 🟢 **-67%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 44.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 45.6M | ✅ | 49.3M | +8% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.1M | ✅ | 28.1M | 🟢 **-38%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.0M | ✅ | 121.1M | 🔴 **+66%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.0M | ✅ | 30.5M | 🟢 **-43%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 2.9M | 🟢 **-65%** |
| ref.json | refs with quote | 2 | ✅ | 47.0M | ✅ | 29.3M | 🟢 **-38%** |
| ref.json | Location-independent identifier | 2 | ✅ | 40.1M | ✅ | 43.2M | +8% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 45.4M | ✅ | 43.4M | -4% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 43.8M | ✅ | 43.4M | -1% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.3M | ✅ | 38.3M | -17% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.0M | ✅ | 10.7M | 🟢 **-66%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.1M | ✅ | 10.6M | 🟢 **-65%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.5M | ✅ | 25.6M | 🟢 **-28%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.8M | ✅ | 29.0M | 🟢 **-34%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.4M | ✅ | 27.8M | 🟢 **-39%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.5M | ✅ | 28.9M | 🟢 **-32%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 39.4M | ✅ | 27.5M | 🟢 **-30%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.4M | ✅ | 29.0M | 🟢 **-26%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 36.2M | ✅ | 27.2M | 🟢 **-25%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 42.5M | ✅ | 43.1M | +1% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 43.4M | 🟢 **-32%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 63.9M | ✅ | 43.5M | 🟢 **-32%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.8M | ✅ | 43.4M | 🟢 **-26%** |
| refRemote.json | remote ref | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 34.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.2M | ✅ | 76.0M | 🔴 **+38%** |
| required.json | required default validation | 1 | ✅ | 73.0M | ✅ | 123.3M | 🔴 **+69%** |
| required.json | required with empty array | 1 | ✅ | 73.0M | ✅ | 125.4M | 🔴 **+72%** |
| required.json | required with escaped characters | 2 | ✅ | 44.9M | ✅ | 24.0M | 🟢 **-47%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.3M | ✅ | 36.2M | 🔴 **+49%** |
| type.json | integer type matches integers | 9 | ✅ | 51.4M | ✅ | 64.6M | 🔴 **+26%** |
| type.json | number type matches numbers | 9 | ✅ | 53.5M | ✅ | 75.0M | 🔴 **+40%** |
| type.json | string type matches strings | 9 | ✅ | 55.9M | ✅ | 72.9M | 🔴 **+30%** |
| type.json | object type matches objects | 7 | ✅ | 49.9M | ✅ | 59.9M | +20% |
| type.json | array type matches arrays | 7 | ✅ | 54.2M | ✅ | 57.7M | +7% |
| type.json | boolean type matches booleans | 10 | ✅ | 55.6M | ✅ | 63.4M | +14% |
| type.json | null type matches only the null object | 10 | ✅ | 52.3M | ✅ | 60.4M | +15% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.2M | ✅ | 70.9M | 🔴 **+28%** |
| type.json | type as array with one item | 2 | ✅ | 63.6M | ✅ | 88.1M | 🔴 **+38%** |
| type.json | type: array or object | 5 | ✅ | 54.4M | ✅ | 66.6M | 🔴 **+22%** |
| type.json | type: array, object or null | 5 | ✅ | 59.8M | ✅ | 71.7M | +20% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 7.7M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.6M | ✅ | 23.8M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 16.5M | ✅ | 29.8M | 🔴 **+81%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 70.6M | ✅ | 130.8M | 🔴 **+85%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.4M | ✅ | 46.9M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 55.8M | ✅ | 43.0M | 🟢 **-23%** |
| optional/bignum.json | integer | 2 | ✅ | 71.6M | ✅ | 122.0M | 🔴 **+70%** |
| optional/bignum.json | number | 2 | ✅ | 72.1M | ✅ | 127.0M | 🔴 **+76%** |
| optional/bignum.json | string | 1 | ✅ | 53.9M | ✅ | 62.1M | +15% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 60.7M | ✅ | 110.3M | 🔴 **+82%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 52.0M | ✅ | 60.2M | +16% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 65.7M | ✅ | 111.0M | 🔴 **+69%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ✅ | 60.5M | +16% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.6M | ✅ | 71.0M | 🔴 **+158%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.8M | ✅ | 36.0M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.8M | ✅ | 35.8M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.3M | ✅ | 35.9M | 🔴 **+48%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 33.8M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 34.2M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.7M | ✅ | 36.5M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 36.1M | 🔴 **+50%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 38.2M | 🔴 **+51%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.0M | ✅ | 33.5M | +20% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.8M | ✅ | 20.7M | 🔴 **+31%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 16.5M | +17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 15.4M | +4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.8M | ✅ | 32.8M | 🔴 **+27%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.5M | ✅ | 27.9M | 🔴 **+51%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.1M | ✅ | 20.0M | +5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ✅ | 12.9M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.7M | ✅ | 15.3M | -18% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 9.0M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ✅ | 11.6M | 🔴 **+47%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.5M | ✅ | 15.9M | +3% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ✅ | 9.2M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.5M | ✅ | 14.7M | -16% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.0M | ✅ | 34.8M | -11% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.5M | ✅ | 17.9M | 🔴 **+56%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.3M | ✅ | 35.2M | 🔴 **+20%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 69.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ✅ | 8.1M | -13% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ✅ | 18.7M | 🔴 **+20%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ✅ | 4.7M | 🟢 **-21%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.3M | ✅ | 24.5M | 🟢 **-24%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.6M | ✅ | 32.4M | 🟢 **-20%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.1M | ✅ | 32.4M | 🟢 **-21%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ✅ | 34.8M | 🔴 **+29%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ✅ | 10.9M | 🟢 **-32%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.3M | ✅ | 24.9M | 🔴 **+87%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.5M | +2% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.6M | ✅ | 21.3M | 🟢 **-39%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 125.4M | -18% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 62.0M | ✅ | 55.8M | -10% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ✅ | 135.0M | -18% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 67.2M | ✅ | 69.3M | +3% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.1M | ✅ | 35.7M | 🟢 **-36%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.9M | ✅ | 14.1M | 🟢 **-62%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 78.9M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 66.1M | ✅ | 124.9M | 🔴 **+89%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 42.3M | -9% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.9M | ✅ | 24.0M | +15% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 27.6M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.2M | ✅ | 25.0M | -14% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.5M | ✅ | 125.1M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.0M | ✅ | 16.4M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 55.7M | ✅ | 51.4M | -8% |
| allOf.json | allOf | 4 | ✅ | 36.2M | ✅ | 40.0M | +10% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 25.2M | -19% |
| allOf.json | allOf simple types | 2 | ✅ | 58.4M | ✅ | 85.6M | 🔴 **+47%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.9M | ✅ | 125.4M | -17% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 56.3M | ✅ | 64.0M | +14% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.4M | ✅ | 64.5M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 66.1M | ✅ | 125.5M | 🔴 **+90%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 125.1M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 64.1M | ✅ | 87.7M | 🔴 **+37%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.8M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 87.0M | 🔴 **+34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 59.5M | 🟢 **-29%** |
| anyOf.json | anyOf | 4 | ✅ | 65.2M | ✅ | 90.0M | 🔴 **+38%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.8M | ✅ | 27.9M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.2M | ✅ | 124.4M | 🔴 **+70%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 153.0M | ✅ | 125.4M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 55.1M | ✅ | 64.3M | +17% |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 30.5M | 🟢 **-58%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.4M | ✅ | 133.5M | 🔴 **+95%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 84.1M | 🟢 **-30%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 64.0M | ✅ | 137.8M | 🔴 **+115%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 163.5M | ✅ | 45.4M | 🟢 **-72%** |
| const.json | const validation | 3 | ✅ | 56.6M | ✅ | 70.4M | 🔴 **+24%** |
| const.json | const with object | 4 | ✅ | 47.5M | ✅ | 32.4M | 🟢 **-32%** |
| const.json | const with array | 3 | ✅ | 49.6M | ✅ | 9.1M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 85.6M | 🟢 **-29%** |
| const.json | const with false does not match 0 | 3 | ✅ | 61.5M | ✅ | 63.1M | +3% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.6M | ✅ | 72.3M | 🟢 **-35%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.7M | ✅ | 59.1M | +8% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 68.9M | 🟢 **-28%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 25.2M | ✅ | 33.7M | 🔴 **+34%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 33.5M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.8M | ✅ | 64.7M | 🔴 **+23%** |
| const.json | const with 1 does not match true | 3 | ✅ | 110.9M | ✅ | 91.2M | -18% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 54.4M | ✅ | 69.4M | 🔴 **+28%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 103.2M | ✅ | 81.5M | 🟢 **-21%** |
| const.json | nul characters in strings | 2 | ✅ | 27.5M | ✅ | 71.7M | 🔴 **+160%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 67.4M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.7M | ✅ | 74.2M | 🔴 **+38%** |
| contains.json | contains keyword validation | 6 | ✅ | 90.1M | ✅ | 20.5M | 🟢 **-77%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 52.8M | ✅ | 14.4M | 🟢 **-73%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 72.1M | 🟢 **-32%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.0M | ✅ | 42.9M | 🟢 **-27%** |
| contains.json | items + contains | 4 | ✅ | 51.7M | ✅ | 18.0M | 🟢 **-65%** |
| contains.json | contains with false if subschema | 2 | ✅ | 58.3M | ✅ | 73.1M | 🔴 **+26%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.0M | ✅ | 38.3M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 49.7M | ✅ | 75.5M | 🔴 **+52%** |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 48.3M | 🟢 **-35%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.5M | ✅ | 57.1M | 🔴 **+26%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.5M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 54.2M | ✅ | 66.2M | 🔴 **+22%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 70.5M | ✅ | 137.6M | 🔴 **+95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.2M | ✅ | 31.3M | +0% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.1M | ✅ | 35.5M | -14% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 49.1M | ✅ | 55.2M | +12% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ✅ | 15.5M | -13% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 18.2M | ✅ | 26.8M | 🔴 **+48%** |
| enum.json | simple enum validation | 2 | ✅ | 62.9M | ✅ | 65.2M | +4% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.8M | ✅ | 38.9M | -7% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.4M | ✅ | 85.0M | 🔴 **+45%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 41.2M | 🔴 **+193%** |
| enum.json | enum with escaped characters | 3 | ✅ | 56.9M | ✅ | 97.3M | 🔴 **+71%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 29.5M | ✅ | 76.9M | 🔴 **+160%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.7M | ✅ | 70.8M | 🔴 **+29%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.2M | ✅ | 72.9M | 🔴 **+21%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.2M | ✅ | 68.4M | 🔴 **+29%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 60.6M | ✅ | 89.6M | 🔴 **+48%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.4M | ✅ | 82.3M | 🔴 **+46%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 57.8M | ✅ | 91.8M | 🔴 **+59%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 54.1M | ✅ | 81.3M | 🔴 **+50%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.1M | ✅ | 73.7M | 🔴 **+34%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.6M | ✅ | 78.9M | 🔴 **+42%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.5M | ✅ | 79.5M | 🔴 **+43%** |
| format.json | email format | 6 | ✅ | 69.4M | ✅ | 124.8M | 🔴 **+80%** |
| format.json | idn-email format | 6 | ✅ | 69.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 69.6M | ✅ | 119.0M | 🔴 **+71%** |
| format.json | ipv4 format | 6 | ✅ | 69.6M | ✅ | 131.4M | 🔴 **+89%** |
| format.json | ipv6 format | 6 | ✅ | 68.8M | ✅ | 123.7M | 🔴 **+80%** |
| format.json | idn-hostname format | 6 | ✅ | 68.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 69.4M | ✅ | 119.1M | 🔴 **+72%** |
| format.json | date format | 6 | ✅ | 69.5M | ✅ | 120.9M | 🔴 **+74%** |
| format.json | date-time format | 6 | ✅ | 69.4M | ✅ | 116.8M | 🔴 **+68%** |
| format.json | time format | 6 | ✅ | 61.4M | ✅ | 106.2M | 🔴 **+73%** |
| format.json | json-pointer format | 6 | ✅ | 68.0M | ✅ | 133.0M | 🔴 **+96%** |
| format.json | relative-json-pointer format | 6 | ✅ | 68.0M | ✅ | 119.3M | 🔴 **+75%** |
| format.json | iri format | 6 | ✅ | 57.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 69.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 68.1M | ✅ | 132.3M | 🔴 **+94%** |
| format.json | uri-reference format | 6 | ✅ | 69.5M | ✅ | 122.8M | 🔴 **+77%** |
| format.json | uri-template format | 6 | ✅ | 68.7M | ✅ | 131.5M | 🔴 **+91%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 75.2M | ✅ | 135.5M | 🔴 **+80%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 70.3M | ✅ | 134.0M | 🔴 **+91%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 68.4M | ✅ | 135.0M | 🔴 **+97%** |
| if-then-else.json | if and then without else | 3 | ✅ | 55.9M | ✅ | 95.7M | 🔴 **+71%** |
| if-then-else.json | if and else without then | 3 | ✅ | 56.2M | ✅ | 95.2M | 🔴 **+69%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 60.4M | ✅ | 80.7M | 🔴 **+34%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 68.4M | ✅ | 127.5M | 🔴 **+86%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 54.2M | ✅ | 85.6M | 🔴 **+58%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ✅ | 81.2M | 🔴 **+34%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.2M | ✅ | 32.6M | -12% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 25.2M | 🟢 **-35%** |
| items.json | a schema given for items | 4 | ✅ | 44.7M | ✅ | 43.6M | -3% |
| items.json | an array of schemas for items | 6 | ✅ | 55.6M | ✅ | 55.7M | +0% |
| items.json | items with boolean schema (true) | 2 | ✅ | 75.0M | ✅ | 135.4M | 🔴 **+81%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.7M | ✅ | 66.7M | +20% |
| items.json | items with boolean schemas | 3 | ✅ | 55.0M | ✅ | 68.6M | 🔴 **+25%** |
| items.json | items and subitems | 6 | ✅ | 12.3M | ✅ | 8.0M | 🟢 **-36%** |
| items.json | nested items | 3 | ✅ | 11.5M | ✅ | 6.7M | 🟢 **-42%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.2M | ✅ | 66.4M | +5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 67.2M | ✅ | 69.3M | +3% |
| maxItems.json | maxItems validation | 4 | ✅ | 65.0M | ✅ | 98.7M | 🔴 **+52%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 61.0M | ✅ | 82.7M | 🔴 **+36%** |
| maxLength.json | maxLength validation | 5 | ✅ | 51.3M | ✅ | 46.0M | -10% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.6M | ✅ | 51.4M | +4% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.2M | ✅ | 63.6M | 🔴 **+27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.8M | ✅ | 47.4M | +11% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.5M | ✅ | 49.1M | +10% |
| maximum.json | maximum validation | 4 | ✅ | 64.1M | ✅ | 100.1M | 🔴 **+56%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.0M | ✅ | 86.0M | 🔴 **+37%** |
| minItems.json | minItems validation | 4 | ✅ | 65.2M | ✅ | 95.5M | 🔴 **+46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 61.2M | ✅ | 83.8M | 🔴 **+37%** |
| minLength.json | minLength validation | 5 | ✅ | 50.6M | ✅ | 35.3M | 🟢 **-30%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ✅ | 47.4M | -4% |
| minProperties.json | minProperties validation | 6 | ✅ | 51.3M | ✅ | 68.5M | 🔴 **+33%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.2M | ✅ | 48.4M | +12% |
| minimum.json | minimum validation | 4 | ✅ | 64.1M | ✅ | 99.0M | 🔴 **+54%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.1M | ✅ | 90.6M | 🔴 **+48%** |
| multipleOf.json | by int | 3 | ✅ | 64.5M | ✅ | 96.6M | 🔴 **+50%** |
| multipleOf.json | by number | 3 | ✅ | 61.6M | ✅ | 59.9M | -3% |
| multipleOf.json | by small number | 2 | ✅ | 56.2M | ✅ | 27.1M | 🟢 **-52%** |
| multipleOf.json | float division = inf | 1 | ✅ | 50.3M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 55.5M | ✅ | 17.2M | 🟢 **-69%** |
| not.json | not | 2 | ✅ | 63.8M | ✅ | 85.3M | 🔴 **+34%** |
| not.json | not multiple types | 3 | ✅ | 58.1M | ✅ | 72.4M | 🔴 **+25%** |
| not.json | not more complex schema | 3 | ✅ | 56.1M | ✅ | 50.1M | -11% |
| not.json | forbidden property | 2 | ✅ | 45.1M | ✅ | 59.5M | 🔴 **+32%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.3M | ✅ | 63.2M | 🔴 **+26%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.4M | ✅ | 62.7M | 🔴 **+25%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 72.0M | ✅ | 138.8M | 🔴 **+93%** |
| not.json | double negation | 1 | ✅ | 73.1M | ✅ | 98.1M | 🔴 **+34%** |
| oneOf.json | oneOf | 4 | ✅ | 57.1M | ✅ | 76.5M | 🔴 **+34%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 27.9M | ✅ | 27.2M | -2% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 64.8M | +16% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.1M | ✅ | 125.4M | 🔴 **+72%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.0M | ✅ | 63.4M | +13% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.9M | ✅ | 65.0M | +16% |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 29.4M | 🟢 **-26%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.6M | ✅ | 83.4M | 🔴 **+38%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.2M | ✅ | 26.2M | 🟢 **-39%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.7M | ✅ | 33.1M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 86.1M | 🔴 **+38%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 72.9M | 🔴 **+48%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 23.4M | ✅ | 60.5M | 🔴 **+159%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ✅ | 17.3M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.2M | ✅ | 14.5M | +9% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.0M | ✅ | 13.5M | -4% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 18.6M | -6% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 22.5M | 🔴 **+30%** |
| properties.json | object properties validation | 6 | ✅ | 47.1M | ✅ | 51.7M | +10% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.5M | ✅ | 12.2M | 🟢 **-34%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.1M | ✅ | 54.2M | 🔴 **+29%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.3M | ✅ | 24.0M | 🟢 **-46%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.2M | ✅ | 60.3M | +2% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 29.1M | +11% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 36.2M | ✅ | 40.9M | +13% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.4M | ✅ | 17.1M | -2% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 75.1M | ✅ | 135.5M | 🔴 **+80%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.9M | ✅ | 25.3M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 36.3M | ✅ | 30.6M | -15% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.9M | ✅ | 33.3M | -12% |
| ref.json | root pointer ref | 4 | ✅ | 23.1M | ✅ | 13.6M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.8M | ✅ | 29.0M | 🟢 **-37%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.6M | ✅ | 23.7M | 🟢 **-51%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.8M | ✅ | 28.4M | 🟢 **-32%** |
| ref.json | nested refs | 2 | ✅ | 35.5M | ✅ | 11.1M | 🟢 **-69%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.5M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 44.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.6M | ✅ | 49.3M | +6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.3M | ✅ | 28.0M | 🟢 **-38%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.2M | ✅ | 121.2M | 🔴 **+65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 56.1M | ✅ | 33.7M | 🟢 **-40%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 2.7M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 45.4M | ✅ | 27.7M | 🟢 **-39%** |
| ref.json | Location-independent identifier | 2 | ✅ | 44.5M | ✅ | 40.0M | -10% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 44.4M | ✅ | 43.7M | -2% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 43.4M | ✅ | 42.9M | -1% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 49.4M | ✅ | 38.1M | 🟢 **-23%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.0M | ✅ | 10.5M | 🟢 **-66%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.0M | ✅ | 10.4M | 🟢 **-66%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 43.9M | ✅ | 43.6M | -1% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 36.2M | ✅ | 23.5M | 🟢 **-35%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.5M | ✅ | 28.9M | 🟢 **-36%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.3M | ✅ | 28.9M | 🟢 **-36%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.5M | ✅ | 28.4M | 🟢 **-33%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.9M | ✅ | 28.4M | 🟢 **-34%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.0M | ✅ | 29.0M | 🟢 **-32%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.0M | ✅ | 28.9M | 🟢 **-22%** |
| ref.json | ref to if | 2 | ✅ | 44.8M | ✅ | 37.6M | -16% |
| ref.json | ref to then | 2 | ✅ | 45.0M | ✅ | 43.3M | -4% |
| ref.json | ref to else | 2 | ✅ | 43.3M | ✅ | 42.9M | -1% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 44.5M | ✅ | 43.6M | -2% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 36.0M | 🟢 **-44%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 43.9M | 🟢 **-32%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 59.1M | ✅ | 42.7M | 🟢 **-28%** |
| refRemote.json | remote ref | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 37.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 35.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.7M | ✅ | 82.6M | 🔴 **+54%** |
| required.json | required default validation | 1 | ✅ | 66.9M | ✅ | 125.5M | 🔴 **+88%** |
| required.json | required with empty array | 1 | ✅ | 62.5M | ✅ | 125.4M | 🔴 **+101%** |
| required.json | required with escaped characters | 2 | ✅ | 44.8M | ✅ | 22.0M | 🟢 **-51%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.7M | ✅ | 35.5M | 🔴 **+38%** |
| type.json | integer type matches integers | 9 | ✅ | 70.3M | ✅ | 64.7M | -8% |
| type.json | number type matches numbers | 9 | ✅ | 56.7M | ✅ | 75.3M | 🔴 **+33%** |
| type.json | string type matches strings | 9 | ✅ | 55.3M | ✅ | 73.1M | 🔴 **+32%** |
| type.json | object type matches objects | 7 | ✅ | 50.6M | ✅ | 60.3M | +19% |
| type.json | array type matches arrays | 7 | ✅ | 53.5M | ✅ | 55.7M | +4% |
| type.json | boolean type matches booleans | 10 | ✅ | 55.0M | ✅ | 63.7M | +16% |
| type.json | null type matches only the null object | 10 | ✅ | 52.2M | ✅ | 60.1M | +15% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.1M | ✅ | 59.9M | +9% |
| type.json | type as array with one item | 2 | ✅ | 63.6M | ✅ | 87.5M | 🔴 **+38%** |
| type.json | type: array or object | 5 | ✅ | 56.1M | ✅ | 66.8M | +19% |
| type.json | type: array, object or null | 5 | ✅ | 59.6M | ✅ | 73.2M | 🔴 **+23%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 7.8M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.0M | ✅ | 24.1M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 28.6M | 🔴 **+61%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 71.1M | ✅ | 130.3M | 🔴 **+83%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.5M | ✅ | 46.0M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.3M | ✅ | 42.1M | 🟢 **-21%** |
| optional/bignum.json | integer | 2 | ✅ | 71.5M | ✅ | 122.1M | 🔴 **+71%** |
| optional/bignum.json | number | 2 | ✅ | 60.1M | ✅ | 126.4M | 🔴 **+110%** |
| optional/bignum.json | string | 1 | ✅ | 54.4M | ✅ | 53.1M | -2% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 65.9M | ✅ | 75.2M | +14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 52.1M | ✅ | 41.5M | 🟢 **-20%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 66.0M | ✅ | 111.3M | 🔴 **+69%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ✅ | 61.0M | +17% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.2M | ✅ | 71.5M | 🔴 **+163%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 36.2M | 🔴 **+91%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 36.3M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 36.1M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 34.3M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 36.1M | 🔴 **+46%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 21.8M | ✅ | 36.5M | 🔴 **+68%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.9M | ✅ | 36.1M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.6M | ✅ | 37.9M | 🔴 **+68%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 33.7M | 🔴 **+21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ✅ | 19.7M | 🔴 **+20%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.6M | ✅ | 16.2M | +11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 15.4M | +7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.9M | ✅ | 33.2M | 🔴 **+33%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.1M | ✅ | 27.1M | 🔴 **+58%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.0M | ✅ | 20.1M | -9% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 13.6M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.8M | ✅ | 15.5M | -18% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 8.8M | +14% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 10.6M | 🔴 **+28%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.5M | ✅ | 15.9M | +3% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.6M | ✅ | 9.5M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ✅ | 24.5M | 🔴 **+192%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ✅ | 14.6M | 🟢 **-20%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.1M | ✅ | 34.4M | -2% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ✅ | 18.1M | 🔴 **+54%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.0M | ✅ | 35.9M | +20% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 62.7M | ✅ | 933K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.5M | ✅ | 39.4M | +5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 71.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 8.0M | -16% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.6M | ✅ | 18.7M | 🔴 **+29%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.8M | 🟢 **-23%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.9M | ✅ | 23.4M | 🟢 **-29%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.6M | ✅ | 34.0M | 🟢 **-34%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 51.6M | ✅ | 38.8M | 🟢 **-25%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.3M | ✅ | 35.0M | 🔴 **+23%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 10.6M | 🟢 **-35%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ✅ | 24.4M | 🔴 **+79%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 14.2M | 🔴 **+90%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.6M | ✅ | 23.8M | 🟢 **-35%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.0M | ✅ | 125.3M | -18% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.5M | ✅ | 87.6M | 🔴 **+21%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 130.7M | 🟢 **-20%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 69.3M | -6% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.8M | ✅ | 35.1M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.3M | ✅ | 27.9M | 🟢 **-34%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 77.2M | 🟢 **-28%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 119.9M | 🔴 **+63%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 48.4M | ✅ | 28.9M | 🟢 **-40%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 24.3M | +14% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 27.7M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.1M | ✅ | 24.9M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 125.4M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.9M | ✅ | 17.3M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 51.4M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.9M | ✅ | 13.5M | 🟢 **-46%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.5M | ✅ | 9.3M | 🟢 **-71%** |
| allOf.json | allOf | 4 | ✅ | 38.5M | ✅ | 39.1M | +2% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 24.9M | -19% |
| allOf.json | allOf simple types | 2 | ✅ | 61.0M | ✅ | 82.0M | 🔴 **+34%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.7M | ✅ | 125.1M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.9M | ✅ | 61.7M | +1% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 61.8M | 🟢 **-33%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.6M | ✅ | 125.2M | 🔴 **+55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 120.9M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.5M | ✅ | 83.5M | 🔴 **+20%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 83.8M | 🟢 **-29%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.5M | ✅ | 77.9M | +11% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 59.5M | 🟢 **-29%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 69.9M | ✅ | 34.7M | 🟢 **-50%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.2M | ✅ | 37.5M | 🟢 **-57%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.7M | ✅ | 36.7M | 🟢 **-25%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 69.3M | ✅ | 37.1M | 🟢 **-47%** |
| anyOf.json | anyOf | 4 | ✅ | 71.5M | ✅ | 80.6M | +13% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.4M | ✅ | 27.1M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.8M | ✅ | 124.5M | 🔴 **+54%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 80.8M | ✅ | 125.1M | 🔴 **+55%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 62.1M | +2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.4M | ✅ | 30.8M | 🟢 **-35%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.0M | ✅ | 135.1M | 🔴 **+78%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.6M | ✅ | 80.4M | +14% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 126.6M | 🔴 **+59%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 58.0M | ✅ | 60.9M | +5% |
| const.json | const validation | 3 | ✅ | 61.9M | ✅ | 69.2M | +12% |
| const.json | const with object | 4 | ✅ | 39.1M | ✅ | 32.5M | -17% |
| const.json | const with array | 3 | ✅ | 54.4M | ✅ | 8.7M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 70.3M | ✅ | 80.7M | +15% |
| const.json | const with false does not match 0 | 3 | ✅ | 67.6M | ✅ | 71.7M | +6% |
| const.json | const with true does not match 1 | 3 | ✅ | 67.8M | ✅ | 72.6M | +7% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 61.3M | ✅ | 66.4M | +8% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 61.0M | ✅ | 68.5M | +12% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.4M | ✅ | 33.2M | 🟢 **-45%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.3M | ✅ | 33.6M | 🟢 **-44%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.1M | ✅ | 65.8M | +13% |
| const.json | const with 1 does not match true | 3 | ✅ | 67.2M | ✅ | 89.7M | 🔴 **+33%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.4M | ✅ | 68.6M | +5% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 65.9M | ✅ | 78.4M | +19% |
| const.json | nul characters in strings | 2 | ✅ | 59.4M | ✅ | 73.6M | 🔴 **+24%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ✅ | 67.0M | 🔴 **+25%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.6M | ✅ | 75.7M | 🔴 **+25%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.0M | ✅ | 20.3M | 🟢 **-66%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.8M | ✅ | 14.5M | 🟢 **-69%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.6M | ✅ | 64.8M | -1% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.2M | ✅ | 41.2M | 🟢 **-37%** |
| contains.json | items + contains | 4 | ✅ | 38.8M | ✅ | 17.9M | 🟢 **-54%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.4M | ✅ | 72.6M | +15% |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 37.9M | 🟢 **-46%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 84.4M | ✅ | 130.9M | 🔴 **+55%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 81.1M | ✅ | 123.5M | 🔴 **+52%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 75.1M | ✅ | 139.2M | 🔴 **+85%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 71.0M | ✅ | 138.3M | 🔴 **+95%** |
| default.json | invalid type for default | 2 | ✅ | 65.5M | ✅ | 75.6M | +15% |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ✅ | 43.2M | -16% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 48.9M | ✅ | 57.1M | +17% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.3M | ✅ | 72.3M | 🔴 **+22%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 84.6M | ✅ | 137.8M | 🔴 **+63%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.3M | ✅ | 31.6M | +16% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 45.9M | ✅ | 33.5M | 🟢 **-27%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.8M | ✅ | 41.6M | -20% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 55.0M | ✅ | 53.2M | -3% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.5M | ✅ | 35.4M | -10% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.9M | ✅ | 26.7M | 🟢 **-28%** |
| enum.json | simple enum validation | 2 | ✅ | 68.2M | ✅ | 75.4M | +11% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.3M | ✅ | 36.3M | -16% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.9M | ✅ | 88.4M | 🔴 **+32%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 40.3M | 🔴 **+175%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 93.0M | 🔴 **+28%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 67.6M | ✅ | 72.0M | +6% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 60.6M | ✅ | 69.7M | +15% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 67.9M | ✅ | 70.0M | +3% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 52.9M | ✅ | 69.5M | 🔴 **+31%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.0M | ✅ | 88.8M | 🔴 **+35%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 61.2M | ✅ | 81.6M | 🔴 **+33%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.2M | ✅ | 89.7M | 🔴 **+33%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.1M | ✅ | 80.8M | 🔴 **+37%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.0M | ✅ | 73.7M | 🔴 **+25%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 63.1M | ✅ | 78.2M | 🔴 **+24%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 60.1M | ✅ | 74.6M | 🔴 **+24%** |
| format.json | email format | 6 | ✅ | 77.2M | ✅ | 129.8M | 🔴 **+68%** |
| format.json | idn-email format | 6 | ✅ | 78.0M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 69.3M | ✅ | 118.8M | 🔴 **+71%** |
| format.json | ipv4 format | 6 | ✅ | 70.1M | ✅ | 124.5M | 🔴 **+77%** |
| format.json | ipv6 format | 6 | ✅ | 74.0M | ✅ | 118.6M | 🔴 **+60%** |
| format.json | idn-hostname format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 70.1M | ✅ | 131.8M | 🔴 **+88%** |
| format.json | date format | 6 | ✅ | 68.0M | ✅ | 118.1M | 🔴 **+74%** |
| format.json | date-time format | 6 | ✅ | 77.7M | ✅ | 127.0M | 🔴 **+63%** |
| format.json | time format | 6 | ✅ | 70.4M | ✅ | 121.2M | 🔴 **+72%** |
| format.json | json-pointer format | 6 | ✅ | 70.0M | ✅ | 133.0M | 🔴 **+90%** |
| format.json | relative-json-pointer format | 6 | ✅ | 69.9M | ✅ | 132.9M | 🔴 **+90%** |
| format.json | iri format | 6 | ✅ | 70.1M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 70.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 70.3M | ✅ | 132.3M | 🔴 **+88%** |
| format.json | uri-reference format | 6 | ✅ | 68.5M | ✅ | 133.2M | 🔴 **+94%** |
| format.json | uri-template format | 6 | ✅ | 70.2M | ✅ | 132.1M | 🔴 **+88%** |
| format.json | uuid format | 6 | ✅ | 70.1M | ✅ | 122.6M | 🔴 **+75%** |
| format.json | duration format | 6 | ✅ | 70.1M | ✅ | 118.8M | 🔴 **+70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 75.9M | ✅ | 134.5M | 🔴 **+77%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.3M | ✅ | 135.4M | 🔴 **+62%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 75.6M | ✅ | 116.6M | 🔴 **+54%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ✅ | 92.8M | 🔴 **+32%** |
| if-then-else.json | if and else without then | 3 | ✅ | 67.8M | ✅ | 93.5M | 🔴 **+38%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.8M | ✅ | 79.1M | 🔴 **+24%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 75.8M | ✅ | 128.0M | 🔴 **+69%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 68.3M | ✅ | 82.1M | 🔴 **+20%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 67.9M | ✅ | 75.6M | +11% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.0M | ✅ | 36.4M | -9% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.1M | ✅ | 22.2M | 🟢 **-42%** |
| items.json | a schema given for items | 4 | ✅ | 50.6M | ✅ | 43.6M | -14% |
| items.json | an array of schemas for items | 6 | ✅ | 62.6M | ✅ | 59.2M | -5% |
| items.json | items with boolean schema (true) | 2 | ✅ | 77.5M | ✅ | 135.5M | 🔴 **+75%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 65.3M | ✅ | 65.5M | +0% |
| items.json | items with boolean schemas | 3 | ✅ | 50.2M | ✅ | 78.3M | 🔴 **+56%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ✅ | 8.3M | 🟢 **-36%** |
| items.json | nested items | 3 | ✅ | 13.0M | ✅ | 6.6M | 🟢 **-50%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 66.4M | -4% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 69.3M | -6% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 83.4M | ✅ | 134.5M | 🔴 **+61%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.4M | ✅ | 23.7M | 🟢 **-57%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 60.9M | ✅ | 24.0M | 🟢 **-61%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 55.6M | ✅ | 19.6M | 🟢 **-65%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.4M | ✅ | 98.6M | 🔴 **+38%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 81.4M | 🔴 **+22%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.6M | ✅ | 42.6M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 51.5M | -3% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 68.2M | 🔴 **+25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.1M | ✅ | 49.1M | +4% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.8M | ✅ | 47.4M | -1% |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 99.9M | 🔴 **+43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.5M | ✅ | 100.8M | 🔴 **+47%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 83.5M | ✅ | 134.9M | 🔴 **+62%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 64.9M | ✅ | 29.8M | 🟢 **-54%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.2M | ✅ | 23.7M | 🟢 **-59%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.1M | ✅ | 23.9M | 🟢 **-61%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 54.0M | ✅ | 23.0M | 🟢 **-57%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.2M | ✅ | 23.2M | 🟢 **-56%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 83.4M | ✅ | 52.0M | 🟢 **-38%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.1M | ✅ | 31.1M | 🟢 **-52%** |
| minItems.json | minItems validation | 4 | ✅ | 71.0M | ✅ | 100.1M | 🔴 **+41%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.1M | ✅ | 81.1M | 🔴 **+23%** |
| minLength.json | minLength validation | 5 | ✅ | 53.9M | ✅ | 35.2M | 🟢 **-35%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.8M | ✅ | 49.5M | -6% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.9M | ✅ | 68.8M | 🔴 **+23%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.8M | ✅ | 47.1M | -1% |
| minimum.json | minimum validation | 4 | ✅ | 69.6M | ✅ | 91.2M | 🔴 **+31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.0M | ✅ | 90.2M | 🔴 **+37%** |
| multipleOf.json | by int | 3 | ✅ | 70.7M | ✅ | 93.4M | 🔴 **+32%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 61.2M | -9% |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 27.5M | 🟢 **-55%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 69.5M | ✅ | 80.7M | +16% |
| not.json | not multiple types | 3 | ✅ | 64.4M | ✅ | 72.5M | +13% |
| not.json | not more complex schema | 3 | ✅ | 62.8M | ✅ | 45.8M | 🟢 **-27%** |
| not.json | forbidden property | 2 | ✅ | 50.6M | ✅ | 55.8M | +10% |
| not.json | forbid everything with empty schema | 9 | ✅ | 56.1M | ✅ | 62.6M | +12% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.1M | ✅ | 62.5M | +8% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.4M | ✅ | 138.0M | 🔴 **+72%** |
| not.json | double negation | 1 | ✅ | 80.8M | ✅ | 125.2M | 🔴 **+55%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.4M | ✅ | 14.3M | 🟢 **-56%** |
| oneOf.json | oneOf | 4 | ✅ | 61.9M | ✅ | 73.3M | +18% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.9M | ✅ | 26.1M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 61.1M | +1% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.6M | ✅ | 120.8M | 🔴 **+50%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.2M | ✅ | 60.9M | +1% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.4M | ✅ | 60.8M | +1% |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 27.6M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.7M | ✅ | 81.7M | +19% |
| oneOf.json | oneOf with required | 4 | ✅ | 45.7M | ✅ | 25.9M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.5M | ✅ | 32.4M | 🟢 **-30%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.5M | ✅ | 83.6M | 🔴 **+22%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 70.1M | 🔴 **+42%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.6M | ✅ | 56.3M | 🔴 **+129%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.7M | ✅ | 17.6M | 🟢 **-32%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 15.1M | +0% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 14.2M | -9% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 18.2M | -11% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 22.0M | 🔴 **+24%** |
| properties.json | object properties validation | 6 | ✅ | 52.0M | ✅ | 51.8M | 0% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 11.4M | 🟢 **-42%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.8M | ✅ | 52.0M | +19% |
| properties.json | properties with escaped characters | 2 | ✅ | 49.1M | ✅ | 23.7M | 🟢 **-52%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.2M | ✅ | 58.1M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.1M | ✅ | 27.8M | +3% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.4M | ✅ | 40.7M | +9% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ✅ | 14.7M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.2M | ✅ | 120.4M | 🔴 **+45%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.2M | ✅ | 24.3M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.5M | ✅ | 29.4M | 🟢 **-24%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.8M | ✅ | 32.6M | 🟢 **-20%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.4M | ✅ | 13.2M | -8% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ✅ | 10.9M | 🔴 **+82%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ✅ | 10.3M | 🔴 **+243%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.2M | ✅ | 10.6M | -13% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.3M | ✅ | 11.2M | -9% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ✅ | 17.0M | 🔴 **+87%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ✅ | 14.5M | 🔴 **+81%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ✅ | 4.4M | +8% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ✅ | 4.3M | +3% |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 14.1M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.8M | ✅ | 28.9M | 🟢 **-41%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.8M | ✅ | 24.6M | 🟢 **-55%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.4M | ✅ | 28.5M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 37.6M | ✅ | 11.8M | 🟢 **-69%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 42.0M | ✅ | 30.0M | 🟢 **-29%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.7M | ✅ | 47.7M | -6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.8M | ✅ | 28.8M | 🟢 **-41%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.6M | ✅ | 119.8M | 🔴 **+49%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.9M | ✅ | 32.9M | 🟢 **-46%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 3.0M | 🟢 **-65%** |
| ref.json | refs with quote | 2 | ✅ | 49.1M | ✅ | 28.6M | 🟢 **-42%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.7M | ✅ | 10.2M | 🟢 **-60%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 37.8M | 🟢 **-29%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ✅ | 10.1M | 🟢 **-69%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.8M | ✅ | 9.9M | 🟢 **-70%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.3M | ✅ | 42.7M | -11% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.1M | ✅ | 40.7M | -14% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.3M | ✅ | 36.1M | 🟢 **-46%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 36.9M | ✅ | 24.6M | 🟢 **-33%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.1M | ✅ | 24.5M | 🟢 **-37%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.3M | ✅ | 28.8M | 🟢 **-43%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.9M | ✅ | 28.8M | 🟢 **-43%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.1M | ✅ | 25.7M | 🟢 **-44%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.0M | ✅ | 27.5M | 🟢 **-40%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.9M | ✅ | 27.6M | 🟢 **-40%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.9M | ✅ | 27.5M | 🟢 **-43%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 48.4M | ✅ | 23.2M | 🟢 **-52%** |
| ref.json | ref to if | 2 | ✅ | 47.8M | ✅ | 35.9M | 🟢 **-25%** |
| ref.json | ref to then | 2 | ✅ | 47.3M | ✅ | 37.0M | 🟢 **-22%** |
| ref.json | ref to else | 2 | ✅ | 46.4M | ✅ | 37.9M | -18% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.3M | ✅ | 33.6M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.5M | ✅ | 36.1M | 🟢 **-48%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 67.6M | ✅ | 35.9M | 🟢 **-47%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.1M | ✅ | 40.6M | 🟢 **-37%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ✅ | 17.3M | 🔴 **+269%** |
| refRemote.json | remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.9M | ✅ | 78.6M | 🔴 **+31%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 121.5M | 🔴 **+51%** |
| required.json | required with empty array | 1 | ✅ | 80.7M | ✅ | 121.5M | 🔴 **+50%** |
| required.json | required with escaped characters | 2 | ✅ | 48.3M | ✅ | 23.5M | 🟢 **-51%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.8M | ✅ | 35.1M | 🔴 **+31%** |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 61.5M | +3% |
| type.json | number type matches numbers | 9 | ✅ | 62.1M | ✅ | 68.5M | +10% |
| type.json | string type matches strings | 9 | ✅ | 61.8M | ✅ | 67.4M | +9% |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 56.8M | +4% |
| type.json | array type matches arrays | 7 | ✅ | 57.9M | ✅ | 59.6M | +3% |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 63.2M | +6% |
| type.json | null type matches only the null object | 10 | ✅ | 59.3M | ✅ | 60.2M | +2% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.5M | ✅ | 57.1M | -4% |
| type.json | type as array with one item | 2 | ✅ | 69.6M | ✅ | 79.0M | +13% |
| type.json | type: array or object | 5 | ✅ | 63.9M | ✅ | 66.1M | +3% |
| type.json | type: array, object or null | 5 | ✅ | 69.6M | ✅ | 79.2M | +14% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.7M | ✅ | 130.7M | 🔴 **+75%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.0M | ✅ | 78.7M | 🔴 **+43%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ✅ | 53.8M | +11% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.7M | ✅ | 45.2M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.1M | ✅ | 51.2M | -2% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 71.6M | ✅ | 67.9M | -5% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 42.4M | ✅ | 29.4M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.5M | ✅ | 27.5M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.1M | ✅ | 37.4M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.2M | ✅ | 14.4M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 74.0M | ✅ | 70.7M | -5% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 18.5M | ✅ | 70.6M | 🔴 **+283%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.8M | ✅ | 15.8M | 🔴 **+35%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.8M | ✅ | 23.9M | 🔴 **+73%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.2M | ✅ | 27.6M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.9M | ✅ | 14.7M | 🔴 **+35%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.6M | ✅ | 79.1M | 🔴 **+48%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.4M | ✅ | 33.7M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.8M | ✅ | 32.3M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.8M | ✅ | 57.1M | 🔴 **+30%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.0M | ✅ | 27.5M | +19% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 68.2M | ✅ | 130.4M | 🔴 **+91%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.9M | ✅ | 66.4M | -4% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 18.6M | ✅ | 20.5M | +10% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.4M | ✅ | 32.3M | 🟢 **-20%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.1M | ✅ | 98.8M | 🔴 **+83%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.9M | ✅ | 24.6M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.3M | ✅ | 22.4M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.7M | ✅ | 20.4M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.5M | ✅ | 15.7M | 🔴 **+49%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 63.7M | ✅ | 58.0M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.7M | ✅ | 17.1M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ✅ | 12.3M | 🔴 **+28%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.6M | ✅ | 58.0M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.4M | ✅ | 56.0M | 🔴 **+84%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.6M | ✅ | 5.5M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.0M | ✅ | 9.3M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.9M | ✅ | 11.8M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.6M | ✅ | 9.1M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.7M | ✅ | 7.9M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ✅ | 6.4M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.5M | ✅ | 13.0M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.7M | ✅ | 20.9M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.0M | ✅ | 15.8M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.2M | ✅ | 15.7M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ✅ | 16.3M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 24.8M | ✅ | 15.5M | 🟢 **-37%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.7M | ✅ | 58.0M | 🔴 **+89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.6M | ✅ | 58.0M | 🔴 **+96%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.4M | ✅ | 14.6M | 🟢 **-43%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.9M | ✅ | 20.4M | 🟢 **-24%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.8M | ✅ | 14.6M | 🟢 **-30%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ✅ | 20.2M | 🔴 **+70%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.1M | ✅ | 15.3M | 🟢 **-43%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.5M | ✅ | 21.2M | 🟢 **-31%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 51.1M | ✅ | 20.9M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.3M | ✅ | 6.9M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 9.2M | 🟢 **-51%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 2.7M | 🟢 **-63%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.6M | ✅ | 119.1M | 🔴 **+71%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.2M | ✅ | 50.4M | +2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.6M | ✅ | 21.1M | -17% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.4M | ✅ | 3.4M | 🟢 **-72%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.6M | ✅ | 12.0M | 🟢 **-45%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.6M | ✅ | 11.7M | 🟢 **-51%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 8.0M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 23.9M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.0M | ✅ | 29.4M | 🔴 **+73%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.9M | ✅ | 126.9M | 🔴 **+63%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.7M | ✅ | 46.3M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 40.2M | 🟢 **-35%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 56.2M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.9M | ✅ | 20.7M | 🟢 **-63%** |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 112.1M | 🔴 **+41%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 121.6M | 🔴 **+52%** |
| optional/bignum.json | string | 1 | ✅ | 57.7M | ✅ | 59.1M | +2% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 107.6M | 🔴 **+50%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 59.1M | +6% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 107.9M | 🔴 **+50%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 59.3M | +6% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 65.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.3M | ✅ | 69.6M | +15% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 85.1M | ✅ | 133.4M | 🔴 **+57%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.9M | ✅ | 30.9M | -6% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.4M | ✅ | 39.0M | -14% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.8M | ✅ | 46.4M | -10% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.5M | ✅ | 50.5M | -11% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.3M | ✅ | 34.6M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.5M | ✅ | 66.4M | 🔴 **+150%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.8M | ✅ | 34.3M | 🔴 **+74%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 32.8M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.8M | ✅ | 35.2M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 32.7M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 34.3M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.4M | ✅ | 32.7M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ✅ | 32.7M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ✅ | 35.4M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.9M | ✅ | 32.7M | -6% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 12.1M | ✅ | 19.8M | 🔴 **+64%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 16.0M | +7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 15.7M | +4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.6M | ✅ | 32.4M | 🔴 **+22%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.6M | ✅ | 26.5M | 🔴 **+29%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ✅ | 17.0M | 🟢 **-26%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 13.4M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ✅ | 12.2M | 🟢 **-37%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 8.9M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 10.5M | 🔴 **+28%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.9M | ✅ | 16.0M | 🟢 **-23%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 8.8M | 🟢 **-66%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ✅ | 24.7M | 🔴 **+196%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.1M | ✅ | 12.5M | 🟢 **-69%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ✅ | 14.1M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.9M | ✅ | 34.6M | -17% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 17.4M | 🔴 **+45%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.2M | ✅ | 34.9M | +12% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.4M | ✅ | 937K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.5M | ✅ | 41.7M | +5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.7M | 🟢 **-22%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ✅ | 18.9M | +15% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ✅ | 4.9M | -18% |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ✅ | 15.6M | +5% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.1M | ✅ | 24.2M | 🟢 **-31%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.4M | ✅ | 58.6M | -1% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.3M | ✅ | 33.8M | +16% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ✅ | 10.1M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.2M | ✅ | 28.1M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.4M | ✅ | 28.2M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 51.4M | ✅ | 26.7M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.5M | ✅ | 36.8M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.8M | ✅ | 26.9M | 🟢 **-47%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.6M | ✅ | 24.6M | 🔴 **+68%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.3M | ✅ | 20.9M | 🟢 **-47%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 21.9M | +1% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 27.8M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.5M | ✅ | 25.2M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 124.5M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.1M | ✅ | 17.5M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 64.6M | ✅ | 51.5M | 🟢 **-20%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.7M | ✅ | 9.8M | 🟢 **-62%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.6M | ✅ | 9.4M | 🟢 **-69%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 38.2M | -5% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 25.4M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 86.2M | +18% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.4M | ✅ | 125.3M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 63.7M | -4% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.9M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 125.6M | 🔴 **+55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.1M | ✅ | 125.4M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 88.7M | +15% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 88.8M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.4M | ✅ | 87.6M | 🔴 **+43%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.2M | ✅ | 59.3M | 🟢 **-28%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ✅ | 39.1M | 🟢 **-49%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.6M | ✅ | 38.9M | 🟢 **-55%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.4M | ✅ | 38.4M | 🟢 **-24%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ✅ | 38.6M | 🟢 **-50%** |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ✅ | 78.1M | -5% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.5M | ✅ | 24.9M | 🟢 **-30%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 125.3M | 🔴 **+39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 57.1M | ✅ | 125.5M | 🔴 **+120%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 64.5M | -2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 29.7M | 🟢 **-41%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 134.2M | 🔴 **+59%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 85.1M | +8% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.3M | ✅ | 131.5M | 🔴 **+66%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.4M | ✅ | 62.1M | +5% |
| const.json | const validation | 3 | ✅ | 66.7M | ✅ | 39.2M | 🟢 **-41%** |
| const.json | const with object | 4 | ✅ | 40.3M | ✅ | 31.7M | 🟢 **-21%** |
| const.json | const with array | 3 | ✅ | 55.2M | ✅ | 8.8M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 87.3M | +11% |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 63.2M | -17% |
| const.json | const with true does not match 1 | 3 | ✅ | 73.1M | ✅ | 76.9M | +5% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 56.8M | ✅ | 62.7M | +10% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 68.8M | +4% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 66.3M | ✅ | 33.6M | 🟢 **-49%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 59.4M | ✅ | 33.6M | 🟢 **-43%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 40.1M | ✅ | 65.8M | 🔴 **+64%** |
| const.json | const with 1 does not match true | 3 | ✅ | 38.4M | ✅ | 91.3M | 🔴 **+137%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 40.8M | ✅ | 66.3M | 🔴 **+62%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 68.8M | ✅ | 70.1M | +2% |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 74.3M | +15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 66.8M | 🔴 **+35%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.0M | ✅ | 75.2M | +14% |
| contains.json | contains keyword validation | 6 | ✅ | 64.7M | ✅ | 20.1M | 🟢 **-69%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.2M | ✅ | 14.8M | 🟢 **-73%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.0M | ✅ | 73.0M | +3% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.8M | ✅ | 39.4M | 🟢 **-46%** |
| contains.json | items + contains | 4 | ✅ | 41.1M | ✅ | 17.8M | 🟢 **-57%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.7M | ✅ | 73.0M | +6% |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 38.4M | 🟢 **-50%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.4M | ✅ | 138.1M | 🔴 **+53%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 96.0M | ✅ | 121.8M | 🔴 **+27%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 74.7M | ✅ | 139.5M | 🔴 **+87%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 79.0M | ✅ | 114.8M | 🔴 **+45%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 75.5M | +6% |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 18.8M | 🟢 **-66%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.9M | ✅ | 47.6M | -13% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.0M | ✅ | 72.5M | +13% |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 137.7M | 🔴 **+43%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.7M | ✅ | 31.4M | +9% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ✅ | 39.4M | -15% |
| dependentSchemas.json | single dependency | 8 | ✅ | 29.3M | ✅ | 47.7M | 🔴 **+63%** |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 30.1M | ✅ | 54.5M | 🔴 **+81%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.8M | ✅ | 35.2M | -11% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.0M | ✅ | 25.9M | 🟢 **-34%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ✅ | 6.2M | 🟢 **-52%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.3M | ✅ | 20.0M | -6% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.6M | ✅ | 20.8M | 🔴 **+33%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ✅ | 2.4M | 🟢 **-79%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 11.5M | ✅ | 4.8M | 🟢 **-58%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.8M | ✅ | 2.8M | 🟢 **-74%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.5M | ✅ | 6.5M | -14% |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 15.9M | ✅ | 18.9M | +19% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ✅ | 8.6M | 🟢 **-31%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.8M | ✅ | 1.6M | 🟢 **-80%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ✅ | 12.4M | 🟢 **-20%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ✅ | 1.6M | 🟢 **-73%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ✅ | 2.4M | 🟢 **-64%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.1M | ✅ | 29.1M | +3% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ✅ | 2.8M | 🟢 **-67%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.0M | ✅ | 84.3M | +12% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 38.7M | -19% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 83.3M | +11% |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 40.1M | 🔴 **+173%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 96.2M | +19% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 77.5M | +2% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.1M | ✅ | 67.8M | +3% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.4M | ✅ | 77.0M | +6% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 68.5M | +3% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 89.7M | +20% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.9M | ✅ | 77.9M | +13% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 90.3M | 🔴 **+23%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 81.0M | +19% |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 74.4M | +15% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 71.7M | +1% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 80.5M | +13% |
| format.json | email format | 7 | ✅ | 95.7M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 96.0M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 95.7M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 78.6M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 78.5M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 135.5M | 🔴 **+61%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.6M | ✅ | 134.4M | 🔴 **+44%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 135.6M | 🔴 **+61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ✅ | 93.8M | 🔴 **+21%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ✅ | 93.7M | 🔴 **+22%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ✅ | 79.8M | +11% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 127.9M | 🔴 **+52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 69.5M | -9% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ✅ | 79.9M | +6% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.8M | ✅ | 37.1M | -11% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.4M | ✅ | 22.3M | 🟢 **-50%** |
| items.json | a schema given for items | 4 | ✅ | 53.9M | ✅ | 42.1M | 🟢 **-22%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 133.3M | 🔴 **+42%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 77.9M | +8% |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 7.8M | 🟢 **-39%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 6.8M | 🟢 **-44%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.6M | ✅ | 101.9M | 🔴 **+26%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 45.9M | ✅ | 33.2M | 🟢 **-28%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.1M | ✅ | 30.3M | 🟢 **-31%** |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 78.7M | +8% |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 134.8M | 🔴 **+44%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.8M | ✅ | 22.7M | 🟢 **-62%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 24.6M | 🟢 **-63%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.9M | ✅ | 20.3M | 🟢 **-67%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 100.7M | 🔴 **+28%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 82.7M | +14% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ✅ | 42.4M | 🟢 **-29%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 51.6M | -9% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 68.0M | +16% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ✅ | 49.3M | 0% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 50.7M | -1% |
| maximum.json | maximum validation | 4 | ✅ | 78.6M | ✅ | 100.2M | 🔴 **+28%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 102.2M | 🔴 **+35%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 135.6M | 🔴 **+44%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.7M | ✅ | 29.4M | 🟢 **-55%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ✅ | 23.0M | 🟢 **-63%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.8M | ✅ | 25.0M | 🟢 **-62%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 59.0M | ✅ | 23.0M | 🟢 **-61%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.9M | ✅ | 22.7M | 🟢 **-58%** |
| minContains.json | minContains = 0 | 2 | ✅ | 71.7M | ✅ | 54.0M | 🟢 **-25%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 70.2M | ✅ | 31.4M | 🟢 **-55%** |
| minItems.json | minItems validation | 4 | ✅ | 80.6M | ✅ | 98.3M | 🔴 **+22%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 83.8M | +15% |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 34.9M | 🟢 **-40%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 48.9M | -14% |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 68.5M | +14% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ✅ | 49.1M | -4% |
| minimum.json | minimum validation | 4 | ✅ | 76.6M | ✅ | 98.8M | 🔴 **+29%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 90.2M | 🔴 **+25%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 47.6M | 🟢 **-38%** |
| multipleOf.json | by number | 3 | ✅ | 73.2M | ✅ | 56.1M | 🟢 **-23%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 27.2M | 🟢 **-59%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 17.2M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 85.0M | +10% |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 75.1M | +6% |
| not.json | not more complex schema | 3 | ✅ | 68.7M | ✅ | 51.4M | 🟢 **-25%** |
| not.json | forbidden property | 2 | ✅ | 51.9M | ✅ | 60.1M | +16% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.0M | ✅ | 62.4M | +4% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ✅ | 63.4M | +5% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.9M | ✅ | 138.9M | 🔴 **+54%** |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 101.6M | +13% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.2M | ✅ | 14.9M | 🟢 **-56%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 70.7M | +5% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.1M | ✅ | 26.7M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 63.7M | -4% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 121.0M | 🔴 **+35%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 62.0M | -6% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 63.1M | -5% |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 28.4M | 🟢 **-36%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 84.6M | +11% |
| oneOf.json | oneOf with required | 4 | ✅ | 49.5M | ✅ | 25.7M | 🟢 **-48%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.7M | ✅ | 32.6M | 🟢 **-33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 86.5M | +13% |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ✅ | 70.8M | 🔴 **+31%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 56.3M | 🔴 **+122%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 18.5M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 14.8M | -1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 13.3M | -8% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.5M | ✅ | 17.1M | -17% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.8M | 🔴 **+20%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.0M | ✅ | 55.9M | -18% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.6M | ✅ | 77.1M | +17% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 67.9M | -16% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 69.3M | -14% |
| properties.json | object properties validation | 6 | ✅ | 55.9M | ✅ | 50.7M | -9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.5M | ✅ | 11.5M | 🟢 **-31%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 52.6M | +6% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 22.0M | 🟢 **-51%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 58.1M | -17% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ✅ | 28.7M | +1% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ✅ | 39.6M | -3% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 16.6M | -17% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 130.4M | 🔴 **+39%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.2M | ✅ | 24.8M | 🟢 **-52%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 29.9M | 🟢 **-27%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 32.8M | 🟢 **-24%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 14.0M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.8M | ✅ | 28.0M | 🟢 **-49%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.9M | ✅ | 24.7M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ✅ | 28.2M | 🟢 **-40%** |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 12.5M | 🟢 **-68%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.0M | ✅ | 30.1M | 🟢 **-32%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.4M | ✅ | 47.7M | -9% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.8M | ✅ | 28.8M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 119.7M | 🔴 **+33%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 35.3M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 2.7M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 53.7M | ✅ | 27.6M | 🟢 **-49%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.3M | ✅ | 10.0M | 🟢 **-65%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.5M | ✅ | 37.2M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.1M | ✅ | 10.1M | 🟢 **-70%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.7M | ✅ | 10.6M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.3M | ✅ | 43.9M | -13% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.9M | ✅ | 40.8M | -18% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.5M | ✅ | 41.9M | 🟢 **-43%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.7M | ✅ | 25.1M | 🟢 **-35%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 24.5M | 🟢 **-44%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.3M | ✅ | 26.1M | 🟢 **-52%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.8M | ✅ | 28.6M | 🟢 **-47%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ✅ | 26.9M | 🟢 **-45%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.1M | ✅ | 27.6M | 🟢 **-44%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.1M | ✅ | 27.7M | 🟢 **-43%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.4M | ✅ | 27.0M | 🟢 **-44%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.5M | ✅ | 23.9M | 🟢 **-53%** |
| ref.json | ref to if | 2 | ✅ | 49.7M | ✅ | 38.9M | 🟢 **-22%** |
| ref.json | ref to then | 2 | ✅ | 50.7M | ✅ | 39.0M | 🟢 **-23%** |
| ref.json | ref to else | 2 | ✅ | 49.2M | ✅ | 39.0M | 🟢 **-21%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.4M | ✅ | 36.0M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 32.2M | 🟢 **-58%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 35.8M | 🟢 **-54%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 43.6M | 🟢 **-38%** |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 48.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.5M | ✅ | 76.9M | +19% |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 121.0M | 🔴 **+34%** |
| required.json | required with empty array | 1 | ✅ | 89.9M | ✅ | 121.2M | 🔴 **+35%** |
| required.json | required with escaped characters | 2 | ✅ | 51.6M | ✅ | 22.3M | 🟢 **-57%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.0M | ✅ | 34.7M | 🔴 **+24%** |
| type.json | integer type matches integers | 9 | ✅ | 66.9M | ✅ | 63.3M | -5% |
| type.json | number type matches numbers | 9 | ✅ | 68.5M | ✅ | 69.2M | +1% |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 68.0M | -2% |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 57.6M | -2% |
| type.json | array type matches arrays | 7 | ✅ | 63.8M | ✅ | 59.3M | -7% |
| type.json | boolean type matches booleans | 10 | ✅ | 66.1M | ✅ | 63.6M | -4% |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 60.9M | -8% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 64.6M | -3% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 84.7M | +10% |
| type.json | type: array or object | 5 | ✅ | 71.6M | ✅ | 64.7M | -10% |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 73.5M | -5% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 130.5M | 🔴 **+57%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.5M | ✅ | 79.4M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.4M | ✅ | 53.7M | +4% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 45.2M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.4M | ✅ | 51.8M | -1% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 72.9M | ✅ | 67.8M | -7% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 43.8M | ✅ | 26.7M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.3M | ✅ | 37.3M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.2M | ✅ | 12.7M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 70.6M | -14% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 70.6M | 🔴 **+233%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ✅ | 12.3M | +0% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.7M | ✅ | 23.6M | 🔴 **+50%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.0M | ✅ | 27.5M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 11.2M | -1% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.0M | ✅ | 80.2M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.4M | ✅ | 33.6M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.0M | ✅ | 35.0M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.2M | ✅ | 58.1M | 🔴 **+26%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.9M | ✅ | 24.5M | +2% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ✅ | 13.2M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ✅ | 3.6M | 🟢 **-60%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.1M | ✅ | 4.4M | 🟢 **-57%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ✅ | 13.8M | 🟢 **-28%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.6M | ✅ | 130.3M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.6M | ✅ | 15.4M | 🟢 **-25%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.0M | ✅ | 32.1M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 121.8M | 🔴 **+109%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.5M | ✅ | 22.4M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.1M | ✅ | 24.2M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.7M | ✅ | 18.3M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.4M | ✅ | 15.1M | 🔴 **+33%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.9M | ✅ | 127.2M | 🔴 **+35%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 33.2M | ✅ | 15.6M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.5M | ✅ | 15.2M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 12.0M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 57.0M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 56.9M | 🔴 **+100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 12.7M | ✅ | 5.6M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.7M | ✅ | 8.3M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.9M | ✅ | 10.6M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.9M | ✅ | 7.0M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.5M | ✅ | 7.7M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.8M | ✅ | 6.6M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.3M | ✅ | 12.7M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.3M | ✅ | 20.1M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.8M | ✅ | 15.2M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.9M | ✅ | 14.3M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ✅ | 16.8M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.2M | ✅ | 16.7M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 56.9M | 🔴 **+100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 57.0M | 🔴 **+100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ✅ | 13.6M | 🟢 **-48%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ✅ | 19.3M | 🟢 **-31%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ✅ | 14.0M | 🟢 **-32%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ✅ | 19.4M | 🔴 **+76%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ✅ | 14.7M | 🟢 **-44%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ✅ | 21.2M | 🟢 **-33%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ✅ | 20.8M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 10.3M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 9.2M | 🟢 **-52%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 2.9M | 🟢 **-58%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 76.9M | ✅ | 118.9M | 🔴 **+55%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 50.9M | -3% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.4M | ✅ | 21.2M | -20% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ✅ | 4.0M | 🟢 **-69%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ✅ | 12.9M | 🟢 **-41%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.6M | ✅ | 12.0M | 🟢 **-51%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 8.1M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.1M | ✅ | 22.6M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 52.0M | ✅ | 29.5M | 🟢 **-43%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 126.9M | 🔴 **+38%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.0M | ✅ | 45.3M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.9M | ✅ | 42.4M | 🟢 **-42%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 63.9M | ✅ | 23.8M | 🟢 **-63%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 112.1M | 🔴 **+27%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 121.8M | 🔴 **+37%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 60.9M | -4% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.9M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 59.7M | 0% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.7M | 🔴 **+36%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 60.0M | +0% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 42.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 70.2M | +8% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 130.0M | 🔴 **+35%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.4M | ✅ | 30.7M | -11% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ✅ | 39.6M | -20% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.5M | ✅ | 44.9M | -19% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.0M | ✅ | 53.5M | -5% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.3M | ✅ | 34.9M | -16% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ✅ | 2.8M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.1M | ✅ | 64.8M | 🔴 **+123%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 33.6M | +14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 32.8M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 34.9M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 33.3M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.3M | ✅ | 34.9M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.8M | ✅ | 35.1M | 🔴 **+109%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.1M | ✅ | 31.3M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 37.1M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 32.5M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 20.1M | +18% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 15.2M | -3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 15.5M | +6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 31.9M | +13% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.0M | ✅ | 24.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ✅ | 20.6M | -13% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 14.5M | 🟢 **-24%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.2M | ✅ | 15.5M | -15% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.4M | ✅ | 9.2M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 10.7M | 🔴 **+28%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ✅ | 16.0M | 🟢 **-24%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.4M | ✅ | 9.2M | 🟢 **-65%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.9M | ✅ | 24.9M | 🔴 **+181%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ✅ | 13.9M | 🟢 **-67%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ✅ | 125K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.2M | ✅ | 36.1M | -3% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 17.2M | 🔴 **+42%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.9M | ✅ | 34.6M | +5% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.8M | ✅ | 945K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.3M | ✅ | 42.2M | +2% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 93.5M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.8M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ✅ | 19.0M | +9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.7M | 🟢 **-25%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ✅ | 15.5M | -1% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.2M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.2M | ✅ | 23.6M | 🟢 **-37%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.6M | ✅ | 61.2M | -7% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.9M | ✅ | 33.3M | +19% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ✅ | 10.6M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.8M | ✅ | 28.5M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.8M | ✅ | 27.7M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 26.5M | 🟢 **-52%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 37.2M | 🟢 **-52%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.6M | ✅ | 27.0M | 🟢 **-51%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.2M | ✅ | 23.8M | 🔴 **+57%** |
