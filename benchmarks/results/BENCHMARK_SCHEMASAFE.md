# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.9M | 184/199 | 21.9M | 184 | -19% |
| draft6 | 276 | ✅ 276 | 28.5M | 259/276 | 23.1M | 259 | -19% |
| draft7 | 313 | ✅ 313 | 14.8M | 281/313 | 21.1M | 281 | 🔴 **+42%** |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 399/435 | 19.0M | 399 | -2% |
| draft2020-12 | 448 | ✅ 448 | 18.6M | 389/448 | 15.2M | 389 | -19% |
| **Total** | 1671 | 1670/1671 | 19.5M | 1512/1671 | 19.1M | 1512 | -2% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.40x faster** (37 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 47.5M | ✅ | 16.3M | 🟢 **-66%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.7M | ✅ | 125.0M | 🔴 **+38%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 129.0M | ✅ | 100.1M | 🟢 **-22%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 94.4M | ✅ | 134.5M | 🔴 **+43%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 132.2M | ✅ | 69.3M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ✅ | 35.9M | +3% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.8M | ✅ | 28.6M | 🟢 **-38%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.9M | ✅ | 78.4M | +8% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 166.2M | ✅ | 123.9M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.9M | ✅ | 45.9M | 🔴 **+24%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.4M | ✅ | 24.5M | 🔴 **+20%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.8M | ✅ | 27.9M | -15% |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.5M | ✅ | 23.9M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 89.9M | ✅ | 124.8M | 🔴 **+39%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.4M | ✅ | 16.5M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 26.8M | 🟢 **-49%** |
| allOf.json | allOf | 4 | ✅ | 39.2M | ✅ | 39.8M | +2% |
| allOf.json | allOf with base schema | 5 | ✅ | 24.2M | ✅ | 25.6M | +6% |
| allOf.json | allOf simple types | 2 | ✅ | 122.9M | ✅ | 85.7M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.4M | ✅ | 125.2M | 🔴 **+40%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.1M | ✅ | 125.1M | 🟢 **-25%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.4M | ✅ | 87.5M | +15% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 125.4M | ✅ | 88.2M | 🟢 **-30%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 75.5M | ✅ | 88.1M | +17% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.6M | ✅ | 60.0M | 🟢 **-28%** |
| anyOf.json | anyOf | 4 | ✅ | 78.7M | ✅ | 89.9M | +14% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ✅ | 24.3M | 🟢 **-48%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.9M | ✅ | 23.0M | 🟢 **-56%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 176.3M | ✅ | 125.6M | 🟢 **-29%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.2M | ✅ | 85.8M | +10% |
| default.json | invalid type for default | 2 | ✅ | 104.8M | ✅ | 75.1M | 🟢 **-28%** |
| default.json | invalid string value for default | 2 | ✅ | 53.8M | ✅ | 48.2M | -10% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 67.8M | ✅ | 56.9M | -16% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ✅ | 72.2M | 🟢 **-21%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.0M | ✅ | 31.6M | +2% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 49.1M | ✅ | 35.3M | 🟢 **-28%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 12.0M | ✅ | 11.6M | -4% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 40.9M | ✅ | 26.8M | 🟢 **-35%** |
| enum.json | simple enum validation | 2 | ✅ | 75.5M | ✅ | 86.1M | +14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 38.5M | 🟢 **-37%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.6M | ✅ | 67.6M | -1% |
| enum.json | enums in properties | 6 | ✅ | 15.1M | ✅ | 37.1M | 🔴 **+146%** |
| enum.json | enum with escaped characters | 3 | ✅ | 58.1M | ✅ | 71.3M | 🔴 **+23%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 119.7M | ✅ | 75.4M | 🟢 **-37%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.0M | ✅ | 70.0M | 🔴 **+27%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 117.7M | ✅ | 75.8M | 🟢 **-36%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ✅ | 67.0M | 🔴 **+21%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 88.6M | 🟢 **-23%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.6M | ✅ | 81.4M | 🔴 **+28%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 110.1M | ✅ | 90.7M | -18% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.7M | ✅ | 80.5M | 🔴 **+26%** |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 72.7M | 🟢 **-25%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ✅ | 66.5M | 🔴 **+31%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 89.7M | ✅ | 71.6M | 🟢 **-20%** |
| format.json | email format | 6 | ✅ | 81.6M | ✅ | 128.6M | 🔴 **+58%** |
| format.json | ipv4 format | 6 | ✅ | 152.6M | ✅ | 109.4M | 🟢 **-28%** |
| format.json | ipv6 format | 6 | ✅ | 90.4M | ✅ | 121.3M | 🔴 **+34%** |
| format.json | hostname format | 6 | ✅ | 156.0M | ✅ | 132.5M | -15% |
| format.json | date-time format | 6 | ✅ | 81.4M | ✅ | 117.6M | 🔴 **+45%** |
| format.json | uri format | 6 | ✅ | 157.7M | ✅ | 132.9M | -16% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.0M | ✅ | 25.2M | 🟢 **-28%** |
| items.json | a schema given for items | 4 | ✅ | 64.8M | ✅ | 44.0M | 🟢 **-32%** |
| items.json | an array of schemas for items | 6 | ✅ | 53.6M | ✅ | 58.6M | +9% |
| items.json | items and subitems | 6 | ✅ | 27.8M | ✅ | 8.2M | 🟢 **-70%** |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 6.6M | 🟢 **-47%** |
| items.json | items with null instance elements | 1 | ✅ | 77.5M | ✅ | 66.4M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 81.0M | ✅ | 69.3M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 67.5M | ✅ | 99.8M | 🔴 **+48%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 41.6M | 🟢 **-28%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 68.9M | +18% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.0M | ✅ | 49.9M | +16% |
| maximum.json | maximum validation | 4 | ✅ | 69.4M | ✅ | 99.6M | 🔴 **+43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.8M | ✅ | 87.7M | 🔴 **+29%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 71.3M | ✅ | 99.5M | 🔴 **+40%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 69.3M | ✅ | 82.3M | +19% |
| minItems.json | minItems validation | 4 | ✅ | 68.6M | ✅ | 98.3M | 🔴 **+43%** |
| minLength.json | minLength validation | 5 | ✅ | 53.7M | ✅ | 32.1M | 🟢 **-40%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.5M | ✅ | 69.4M | 🔴 **+25%** |
| minimum.json | minimum validation | 4 | ✅ | 76.6M | ✅ | 98.4M | 🔴 **+28%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.2M | ✅ | 97.0M | 🔴 **+73%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 68.6M | ✅ | 82.8M | 🔴 **+21%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.7M | ✅ | 89.7M | 🔴 **+25%** |
| multipleOf.json | by int | 3 | ✅ | 78.5M | ✅ | 94.6M | 🔴 **+21%** |
| multipleOf.json | by number | 3 | ✅ | 72.8M | ✅ | 60.0M | -18% |
| multipleOf.json | by small number | 2 | ✅ | 61.4M | ✅ | 27.1M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 70.3M | ✅ | 17.2M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 77.4M | ✅ | 85.3M | +10% |
| not.json | not multiple types | 3 | ✅ | 70.8M | ✅ | 74.7M | +5% |
| not.json | not more complex schema | 3 | ✅ | 70.1M | ✅ | 51.4M | 🟢 **-27%** |
| not.json | forbidden property | 2 | ✅ | 41.3M | ✅ | 59.4M | 🔴 **+44%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.6M | ✅ | 61.3M | -4% |
| not.json | double negation | 1 | ✅ | 88.9M | ✅ | 124.6M | 🔴 **+40%** |
| oneOf.json | oneOf | 4 | ✅ | 69.7M | ✅ | 68.7M | -1% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 27.1M | 🟢 **-21%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 29.4M | 🟢 **-32%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.5M | ✅ | 85.8M | +14% |
| oneOf.json | oneOf with required | 4 | ✅ | 47.0M | ✅ | 26.8M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.4M | ✅ | 33.4M | 🟢 **-29%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 75.0M | ✅ | 86.7M | +16% |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 69.3M | 🔴 **+25%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 15.7M | ✅ | 60.5M | 🔴 **+286%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ✅ | 17.3M | 🟢 **-30%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 13.8M | +0% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 12.7M | -14% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.2M | ✅ | 22.4M | +16% |
| properties.json | object properties validation | 6 | ✅ | 47.2M | ✅ | 54.1M | +15% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.9M | ✅ | 12.2M | 🟢 **-28%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.2M | ✅ | 24.7M | 🟢 **-43%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 71.0M | ✅ | 60.3M | -15% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.3M | ✅ | 28.9M | +10% |
| ref.json | root pointer ref | 4 | ✅ | 23.0M | ✅ | 13.7M | 🟢 **-40%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.9M | ✅ | 29.3M | 🟢 **-35%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.2M | ✅ | 25.2M | 🟢 **-48%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ✅ | 29.5M | 🟢 **-27%** |
| ref.json | nested refs | 2 | ✅ | 28.6M | ✅ | 11.1M | 🟢 **-61%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 76.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 19.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.9M | ✅ | 49.0M | +14% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 29.9M | 🟢 **-30%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.5M | ✅ | 2.7M | 🟢 **-74%** |
| ref.json | refs with quote | 2 | ✅ | 46.2M | ✅ | 29.5M | 🟢 **-36%** |
| ref.json | Location-independent identifier | 2 | ✅ | 76.6M | ✅ | 43.4M | 🟢 **-43%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 36.8M | ✅ | 43.8M | +19% |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.3M | ✅ | 45.4M | -19% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 41.3M | ✅ | 43.2M | +5% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 75.5M | ✅ | 43.3M | 🟢 **-43%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 75.5M | ✅ | 43.4M | 🟢 **-42%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.5M | ✅ | 43.9M | 🟢 **-37%** |
| refRemote.json | remote ref | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 77.3M | 🔴 **+29%** |
| required.json | required default validation | 1 | ✅ | 90.2M | ✅ | 125.0M | 🔴 **+39%** |
| required.json | required with escaped characters | 2 | ✅ | 43.8M | ✅ | 24.0M | 🟢 **-45%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ✅ | 36.2M | 🔴 **+48%** |
| type.json | integer type matches integers | 8 | ✅ | 59.3M | ✅ | 57.9M | -2% |
| type.json | number type matches numbers | 9 | ✅ | 68.0M | ✅ | 74.6M | +10% |
| type.json | string type matches strings | 9 | ✅ | 66.2M | ✅ | 73.2M | +11% |
| type.json | object type matches objects | 7 | ✅ | 57.7M | ✅ | 59.5M | +3% |
| type.json | array type matches arrays | 7 | ✅ | 62.0M | ✅ | 56.6M | -9% |
| type.json | boolean type matches booleans | 10 | ✅ | 65.3M | ✅ | 59.8M | -9% |
| type.json | null type matches only the null object | 10 | ✅ | 64.1M | ✅ | 58.1M | -9% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 70.7M | +11% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 87.8M | +14% |
| type.json | type: array or object | 5 | ✅ | 70.7M | ✅ | 66.7M | -6% |
| type.json | type: array, object or null | 5 | ✅ | 76.3M | ✅ | 78.4M | +3% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 15.8M | ✅ | 8.1M | 🟢 **-49%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ✅ | 24.1M | -18% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ✅ | 29.7M | 🔴 **+51%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.4M | ✅ | 128.2M | 🔴 **+66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 67.8M | ✅ | 47.3M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 71.9M | ✅ | 42.7M | 🟢 **-41%** |
| optional/bignum.json | integer | 2 | ✅ | 83.6M | ✅ | 121.4M | 🔴 **+45%** |
| optional/bignum.json | number | 2 | ✅ | 87.7M | ✅ | 125.5M | 🔴 **+43%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 63.0M | -1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 79.8M | ✅ | 111.2M | 🔴 **+39%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 61.8M | ✅ | 59.9M | -3% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 79.8M | ✅ | 110.8M | 🔴 **+39%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 61.5M | ✅ | 60.3M | -2% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.4M | ✅ | 71.9M | 🔴 **+153%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.8M | ✅ | 35.6M | +19% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 35.9M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.9M | ✅ | 29.5M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 34.2M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.2M | ✅ | 36.0M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.2M | ✅ | 26.0M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 33.8M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 38.1M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.0M | ✅ | 33.0M | +6% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.7M | ✅ | 18.9M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.3M | ✅ | 16.4M | +1% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 15.4M | -1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 33.5M | +20% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ✅ | 26.3M | 🔴 **+21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.2M | ✅ | 19.0M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.0M | ✅ | 12.2M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 13.1M | -15% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 8.6M | +11% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 11.2M | 🔴 **+28%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.5M | ✅ | 16.5M | 🔴 **+44%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.6M | ✅ | 9.4M | 🟢 **-66%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 14.1M | 🟢 **-20%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ✅ | 34.5M | -6% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ✅ | 18.0M | 🔴 **+42%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ✅ | 4.8M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.6M | ✅ | 25.8M | -16% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 31.6M | ✅ | 34.8M | +10% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.7M | ✅ | 10.5M | 🟢 **-34%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 28.9M | 🔴 **+290%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 18.3M | 🟢 **-51%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.2M | ✅ | 136.5M | -10% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.7M | ✅ | 83.7M | +15% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ✅ | 143.4M | -13% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 76.3M | +4% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ✅ | 34.4M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.1M | ✅ | 29.4M | 🟢 **-30%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 69.5M | 🟢 **-36%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 136.1M | 🔴 **+85%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.2M | ✅ | 45.1M | 0% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.5M | ✅ | 24.7M | +15% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 26.0M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.9M | ✅ | 25.3M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 136.1M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.0M | ✅ | 17.1M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.1M | ✅ | 56.1M | -19% |
| allOf.json | allOf | 4 | ✅ | 38.0M | ✅ | 35.7M | -6% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 23.8M | 🟢 **-23%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ✅ | 72.4M | +9% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 113.9M | 🟢 **-25%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ✅ | 50.5M | -17% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 49.8M | 🟢 **-46%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 135.9M | 🔴 **+85%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 136.4M | -10% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.6M | ✅ | 74.7M | +7% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 76.8M | 🟢 **-35%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 75.4M | +6% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 49.0M | 🟢 **-42%** |
| anyOf.json | anyOf | 4 | ✅ | 72.0M | ✅ | 76.5M | +6% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 21.7M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.6M | ✅ | 122.0M | 🔴 **+51%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 113.9M | ✅ | 136.2M | +20% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ✅ | 50.2M | -17% |
| anyOf.json | anyOf complex types | 4 | ✅ | 65.4M | ✅ | 25.9M | 🟢 **-60%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.9M | ✅ | 142.8M | 🔴 **+88%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 75.7M | 🟢 **-37%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 145.7M | 🔴 **+85%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.5M | ✅ | 50.0M | 🟢 **-45%** |
| const.json | const validation | 3 | ✅ | 54.6M | ✅ | 57.0M | +4% |
| const.json | const with object | 4 | ✅ | 49.7M | ✅ | 28.4M | 🟢 **-43%** |
| const.json | const with array | 3 | ✅ | 53.1M | ✅ | 8.2M | 🟢 **-85%** |
| const.json | const with null | 2 | ✅ | 119.3M | ✅ | 76.2M | 🟢 **-36%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.4M | ✅ | 56.0M | -14% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 59.3M | 🟢 **-47%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.7M | ✅ | 52.1M | -13% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 53.3M | 🟢 **-44%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.0M | ✅ | 31.5M | 🟢 **-38%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 31.5M | 🟢 **-67%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.1M | ✅ | 58.1M | +2% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 79.7M | 🟢 **-29%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.7M | ✅ | 61.4M | +1% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 112.8M | ✅ | 64.3M | 🟢 **-43%** |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 67.5M | +13% |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 58.9M | 🟢 **-26%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.0M | ✅ | 68.4M | 🔴 **+37%** |
| contains.json | contains keyword validation | 6 | ✅ | 89.2M | ✅ | 17.8M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.9M | ✅ | 10.8M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ✅ | 68.1M | 🟢 **-35%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 55.4M | ✅ | 34.5M | 🟢 **-38%** |
| contains.json | items + contains | 4 | ✅ | 51.5M | ✅ | 16.8M | 🟢 **-67%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 33.5M | 🟢 **-52%** |
| default.json | invalid type for default | 2 | ✅ | 107.4M | ✅ | 81.9M | 🟢 **-24%** |
| default.json | invalid string value for default | 2 | ✅ | 49.6M | ✅ | 49.6M | +0% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.3M | ✅ | 53.0M | 🟢 **-30%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.3M | ✅ | 68.9M | 🟢 **-24%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 85.0M | ✅ | 145.5M | 🔴 **+71%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 38.0M | ✅ | 30.4M | -20% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.6M | ✅ | 33.2M | 🟢 **-24%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 40.2M | ✅ | 51.8M | 🔴 **+29%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.9M | ✅ | 15.8M | +6% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 24.5M | ✅ | 25.6M | +5% |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 66.4M | -3% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 35.5M | 🟢 **-41%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 82.7M | 🔴 **+21%** |
| enum.json | enums in properties | 6 | ✅ | 15.7M | ✅ | 37.9M | 🔴 **+141%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 85.9M | +18% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.6M | ✅ | 58.3M | 🟢 **-48%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.1M | ✅ | 54.3M | -8% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 104.8M | ✅ | 58.1M | 🟢 **-45%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.2M | ✅ | 52.7M | -1% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 102.9M | ✅ | 81.4M | 🟢 **-21%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 55.6M | ✅ | 66.9M | 🔴 **+20%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 79.3M | 🟢 **-29%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.3M | ✅ | 69.0M | +16% |
| enum.json | nul characters in strings | 2 | ✅ | 91.2M | ✅ | 66.9M | 🟢 **-27%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 30.4M | ✅ | 57.6M | 🔴 **+90%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.4M | ✅ | 65.1M | 🟢 **-40%** |
| format.json | email format | 6 | ✅ | 75.6M | ✅ | 130.3M | 🔴 **+72%** |
| format.json | ipv4 format | 6 | ✅ | 155.5M | ✅ | 118.1M | 🟢 **-24%** |
| format.json | ipv6 format | 6 | ✅ | 75.1M | ✅ | 123.4M | 🔴 **+64%** |
| format.json | hostname format | 6 | ✅ | 157.9M | ✅ | 109.3M | 🟢 **-31%** |
| format.json | date-time format | 6 | ✅ | 82.0M | ✅ | 134.4M | 🔴 **+64%** |
| format.json | json-pointer format | 6 | ✅ | 160.8M | ✅ | 116.9M | 🟢 **-27%** |
| format.json | uri format | 6 | ✅ | 81.1M | ✅ | 134.4M | 🔴 **+66%** |
| format.json | uri-reference format | 6 | ✅ | 154.4M | ✅ | 123.9M | -20% |
| format.json | uri-template format | 6 | ✅ | 81.4M | ✅ | 132.5M | 🔴 **+63%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.6M | ✅ | 24.2M | 🟢 **-58%** |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ✅ | 45.6M | -10% |
| items.json | an array of schemas for items | 6 | ✅ | 107.8M | ✅ | 55.7M | 🟢 **-48%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.6M | ✅ | 143.1M | 🔴 **+71%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 131.5M | ✅ | 63.1M | 🟢 **-52%** |
| items.json | items with boolean schemas | 3 | ✅ | 59.8M | ✅ | 72.6M | 🔴 **+22%** |
| items.json | items and subitems | 6 | ✅ | 18.2M | ✅ | 7.9M | 🟢 **-57%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 7.1M | 🟢 **-42%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 69.2M | +0% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.5M | ✅ | 67.9M | -8% |
| maxItems.json | maxItems validation | 4 | ✅ | 71.4M | ✅ | 78.0M | +9% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 72.1M | +9% |
| maxLength.json | maxLength validation | 5 | ✅ | 54.3M | ✅ | 42.2M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 43.1M | -19% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 61.2M | +14% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.0M | ✅ | 39.0M | -13% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.8M | ✅ | 39.1M | -13% |
| maximum.json | maximum validation | 4 | ✅ | 70.0M | ✅ | 81.5M | +16% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.3M | ✅ | 83.8M | 🔴 **+23%** |
| minItems.json | minItems validation | 4 | ✅ | 70.8M | ✅ | 79.1M | +12% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 71.2M | +7% |
| minLength.json | minLength validation | 5 | ✅ | 53.6M | ✅ | 35.5M | 🟢 **-34%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ✅ | 42.1M | 🟢 **-21%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 67.0M | 🔴 **+20%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.4M | ✅ | 42.2M | -11% |
| minimum.json | minimum validation | 4 | ✅ | 68.5M | ✅ | 76.9M | +12% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 80.4M | 🔴 **+23%** |
| multipleOf.json | by int | 3 | ✅ | 70.6M | ✅ | 81.0M | +15% |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 35.0M | 🟢 **-48%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 29.7M | 🟢 **-52%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 1.4M | 🟢 **-97%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 36.5M | 🟢 **-47%** |
| not.json | not | 2 | ✅ | 70.0M | ✅ | 72.7M | +4% |
| not.json | not multiple types | 3 | ✅ | 64.8M | ✅ | 53.9M | -17% |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 38.7M | 🟢 **-37%** |
| not.json | forbidden property | 2 | ✅ | 49.7M | ✅ | 22.6M | 🟢 **-54%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 46.7M | -19% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.9M | ✅ | 46.9M | -19% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.4M | ✅ | 142.1M | 🔴 **+77%** |
| not.json | double negation | 1 | ✅ | 80.7M | ✅ | 136.2M | 🔴 **+69%** |
| oneOf.json | oneOf | 4 | ✅ | 62.0M | ✅ | 62.9M | +2% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.2M | ✅ | 20.9M | 🟢 **-35%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 50.6M | -17% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 78.5M | ✅ | 136.1M | 🔴 **+73%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ✅ | 50.7M | -16% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 49.4M | -19% |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.2M | ✅ | 24.8M | 🟢 **-41%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.3M | ✅ | 33.1M | 🟢 **-52%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.1M | ✅ | 21.7M | 🟢 **-52%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.7M | ✅ | 25.2M | 🟢 **-46%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ✅ | 75.7M | +10% |
| pattern.json | pattern validation | 8 | ✅ | 52.0M | ✅ | 67.6M | 🔴 **+30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 71.5M | 🔴 **+408%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.3M | ✅ | 18.7M | 🟢 **-29%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 14.1M | -5% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 13.5M | -14% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.5M | ✅ | 18.6M | -5% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 23.2M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 52.2M | ✅ | 51.4M | -1% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 10.8M | 🟢 **-44%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.0M | ✅ | 40.4M | -12% |
| properties.json | properties with escaped characters | 2 | ✅ | 48.2M | ✅ | 11.8M | 🟢 **-75%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 64.6M | +1% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 27.7M | +1% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ✅ | 39.8M | +2% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 16.8M | -12% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.5M | ✅ | 142.1M | 🔴 **+70%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ✅ | 24.4M | 🟢 **-49%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.0M | ✅ | 28.2M | 🟢 **-26%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ✅ | 31.2M | 🟢 **-23%** |
| ref.json | root pointer ref | 4 | ✅ | 24.5M | ✅ | 14.4M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.6M | ✅ | 26.5M | 🟢 **-46%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 25.1M | 🟢 **-52%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.0M | ✅ | 27.6M | 🟢 **-37%** |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 12.6M | 🟢 **-66%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.7M | ✅ | 42.2M | -15% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.8M | ✅ | 28.4M | 🟢 **-42%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ✅ | 127.9M | 🔴 **+58%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ✅ | 22.9M | 🟢 **-62%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 2.0M | 🟢 **-76%** |
| ref.json | refs with quote | 2 | ✅ | 49.3M | ✅ | 13.4M | 🟢 **-73%** |
| ref.json | Location-independent identifier | 2 | ✅ | 48.0M | ✅ | 36.6M | 🟢 **-24%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 48.4M | ✅ | 35.1M | 🟢 **-28%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.5M | ✅ | 35.8M | 🟢 **-23%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.1M | ✅ | 34.5M | 🟢 **-35%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.9M | ✅ | 10.7M | 🟢 **-67%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.2M | ✅ | 10.7M | 🟢 **-67%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.1M | ✅ | 25.8M | 🟢 **-36%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.8M | ✅ | 28.6M | 🟢 **-44%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.3M | ✅ | 28.4M | 🟢 **-44%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.0M | ✅ | 28.7M | 🟢 **-38%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.3M | ✅ | 28.7M | 🟢 **-43%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.7M | ✅ | 28.4M | 🟢 **-38%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.2M | ✅ | 28.4M | 🟢 **-26%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.3M | ✅ | 35.6M | -18% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 36.0M | 🟢 **-49%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 36.2M | 🟢 **-48%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.5M | ✅ | 36.7M | 🟢 **-43%** |
| refRemote.json | remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 69.0M | +16% |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 135.8M | 🔴 **+68%** |
| required.json | required with empty array | 1 | ✅ | 80.8M | ✅ | 134.8M | 🔴 **+67%** |
| required.json | required with escaped characters | 2 | ✅ | 48.2M | ✅ | 22.4M | 🟢 **-53%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ✅ | 34.0M | 🔴 **+30%** |
| type.json | integer type matches integers | 9 | ✅ | 59.6M | ✅ | 52.7M | -12% |
| type.json | number type matches numbers | 9 | ✅ | 62.5M | ✅ | 58.4M | -7% |
| type.json | string type matches strings | 9 | ✅ | 61.5M | ✅ | 58.4M | -5% |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 47.0M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 57.9M | ✅ | 48.3M | -17% |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 52.3M | -12% |
| type.json | null type matches only the null object | 10 | ✅ | 56.3M | ✅ | 50.2M | -11% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.3M | ✅ | 55.3M | -8% |
| type.json | type as array with one item | 2 | ✅ | 69.5M | ✅ | 73.2M | +5% |
| type.json | type: array or object | 5 | ✅ | 65.8M | ✅ | 58.9M | -10% |
| type.json | type: array, object or null | 5 | ✅ | 67.5M | ✅ | 70.2M | +4% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 7.1M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 23.4M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 28.6M | 🔴 **+57%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.6M | ✅ | 133.1M | 🔴 **+71%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 52.3M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.1M | ✅ | 44.8M | 🟢 **-28%** |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 117.1M | 🔴 **+47%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 127.5M | 🔴 **+60%** |
| optional/bignum.json | string | 1 | ✅ | 56.3M | ✅ | 50.7M | -10% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 115.3M | 🔴 **+60%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 48.5M | -13% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 115.8M | 🔴 **+61%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 49.0M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 34.7M | ✅ | 64.8M | 🔴 **+87%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.6M | ✅ | 32.8M | 🔴 **+68%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 31.0M | +14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.0M | ✅ | 32.3M | 🔴 **+70%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.4M | ✅ | 30.7M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.9M | ✅ | 33.9M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.1M | ✅ | 32.4M | 🔴 **+70%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ✅ | 32.9M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 37.6M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.9M | ✅ | 30.0M | +4% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 20.6M | 🔴 **+22%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.6M | ✅ | 17.2M | +3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 16.8M | +13% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.2M | ✅ | 30.0M | +10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ✅ | 26.5M | 🔴 **+25%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 19.8M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 13.3M | 🟢 **-34%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.5M | ✅ | 14.5M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.8M | +11% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 10.9M | 🔴 **+32%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ✅ | 12.5M | 🟢 **-39%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 8.8M | 🟢 **-65%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 13.6M | 🟢 **-26%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ✅ | 31.8M | 🟢 **-24%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ✅ | 20.5M | 🔴 **+75%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ✅ | 33.2M | +5% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 8.9M | -9% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.8M | ✅ | 21.5M | 🔴 **+28%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 5.2M | -17% |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.1M | ✅ | 20.8M | 🟢 **-41%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 45.0M | ✅ | 26.1M | 🟢 **-42%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.8M | ✅ | 26.0M | 🟢 **-42%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.0M | ✅ | 30.7M | +10% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 11.1M | 🟢 **-32%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.4M | ✅ | 19.2M | 🔴 **+34%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.4M | +4% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.0M | ✅ | 15.9M | 🟢 **-56%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 125.4M | -18% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.8M | ✅ | 98.4M | 🔴 **+52%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 134.0M | -19% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.2M | ✅ | 69.3M | -1% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 35.8M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.9M | ✅ | 28.6M | 🟢 **-30%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 105.6M | ✅ | 79.1M | 🟢 **-25%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 124.0M | 🔴 **+77%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 42.5M | -8% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.6M | ✅ | 22.5M | +9% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.8M | ✅ | 27.6M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 24.4M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.2M | ✅ | 125.2M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.5M | ✅ | 17.3M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.9M | ✅ | 51.6M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 36.9M | ✅ | 39.6M | +7% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 25.1M | -19% |
| allOf.json | allOf simple types | 2 | ✅ | 53.2M | ✅ | 86.2M | 🔴 **+62%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 125.4M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 57.5M | ✅ | 64.5M | +12% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.3M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.9M | ✅ | 125.6M | 🔴 **+80%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 125.3M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 87.7M | 🔴 **+31%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 86.2M | 🟢 **-27%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 86.6M | 🔴 **+28%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 59.2M | 🟢 **-30%** |
| anyOf.json | anyOf | 4 | ✅ | 58.5M | ✅ | 87.8M | 🔴 **+50%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 26.5M | 🟢 **-42%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.7M | ✅ | 125.3M | 🔴 **+63%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 151.9M | ✅ | 125.1M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 64.6M | +11% |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.3M | ✅ | 30.6M | 🟢 **-54%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 71.4M | ✅ | 135.1M | 🔴 **+89%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 85.9M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 67.3M | ✅ | 138.6M | 🔴 **+106%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.3M | ✅ | 18.4M | 🟢 **-80%** |
| const.json | const validation | 3 | ✅ | 57.7M | ✅ | 71.1M | 🔴 **+23%** |
| const.json | const with object | 4 | ✅ | 49.3M | ✅ | 32.4M | 🟢 **-34%** |
| const.json | const with array | 3 | ✅ | 48.3M | ✅ | 8.8M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 88.1M | 🟢 **-27%** |
| const.json | const with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 64.1M | +3% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 74.6M | 🟢 **-33%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.8M | ✅ | 68.7M | 🔴 **+33%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 70.3M | 🟢 **-26%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.8M | ✅ | 33.6M | 🟢 **-42%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ✅ | 33.6M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 30.1M | ✅ | 65.4M | 🔴 **+117%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 90.1M | -19% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.6M | ✅ | 68.9M | +18% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 92.3M | ✅ | 79.5M | -14% |
| const.json | nul characters in strings | 2 | ✅ | 57.5M | ✅ | 74.1M | 🔴 **+29%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 67.0M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 74.8M | 🔴 **+51%** |
| contains.json | contains keyword validation | 6 | ✅ | 90.2M | ✅ | 20.0M | 🟢 **-78%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.7M | ✅ | 14.5M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 72.9M | 🟢 **-31%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.4M | ✅ | 42.9M | 🟢 **-21%** |
| contains.json | items + contains | 4 | ✅ | 51.5M | ✅ | 18.6M | 🟢 **-64%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.9M | ✅ | 72.2M | +19% |
| contains.json | contains with null instance elements | 1 | ✅ | 120.7M | ✅ | 38.1M | 🟢 **-68%** |
| default.json | invalid type for default | 2 | ✅ | 62.7M | ✅ | 75.5M | 🔴 **+20%** |
| default.json | invalid string value for default | 2 | ✅ | 59.5M | ✅ | 48.2M | -19% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 37.4M | ✅ | 57.1M | 🔴 **+53%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 55.6M | ✅ | 72.6M | 🔴 **+31%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 80.3M | ✅ | 137.3M | 🔴 **+71%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.8M | ✅ | 31.3M | -1% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 35.2M | -16% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 51.4M | ✅ | 53.5M | +4% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.5M | ✅ | 15.8M | +9% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 24.6M | ✅ | 26.5M | +8% |
| enum.json | simple enum validation | 2 | ✅ | 68.3M | ✅ | 85.7M | 🔴 **+26%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.4M | ✅ | 38.7M | -11% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.5M | ✅ | 89.0M | 🔴 **+42%** |
| enum.json | enums in properties | 6 | ✅ | 13.7M | ✅ | 41.2M | 🔴 **+202%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 96.4M | 🔴 **+61%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 33.5M | ✅ | 76.4M | 🔴 **+128%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 68.7M | 🔴 **+24%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.4M | ✅ | 76.1M | 🔴 **+30%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.9M | ✅ | 68.0M | +20% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.0M | ✅ | 86.2M | 🔴 **+37%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.7M | ✅ | 80.7M | 🔴 **+37%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 59.5M | ✅ | 91.1M | 🔴 **+53%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.8M | ✅ | 81.0M | 🔴 **+43%** |
| enum.json | nul characters in strings | 2 | ✅ | 54.0M | ✅ | 74.2M | 🔴 **+38%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 32.6M | ✅ | 70.8M | 🔴 **+117%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ✅ | 79.1M | 🔴 **+44%** |
| format.json | email format | 6 | ✅ | 73.0M | ✅ | 133.2M | 🔴 **+83%** |
| format.json | idn-email format | 6 | ✅ | 70.8M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 73.6M | ✅ | 131.1M | 🔴 **+78%** |
| format.json | ipv4 format | 6 | ✅ | 73.2M | ✅ | 122.5M | 🔴 **+67%** |
| format.json | ipv6 format | 6 | ✅ | 73.1M | ✅ | 117.8M | 🔴 **+61%** |
| format.json | idn-hostname format | 6 | ✅ | 73.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 77.2M | ✅ | 117.0M | 🔴 **+52%** |
| format.json | date format | 6 | ✅ | 72.9M | ✅ | 110.0M | 🔴 **+51%** |
| format.json | date-time format | 6 | ✅ | 73.3M | ✅ | 133.0M | 🔴 **+82%** |
| format.json | time format | 6 | ✅ | 73.1M | ✅ | 117.9M | 🔴 **+61%** |
| format.json | json-pointer format | 6 | ✅ | 72.8M | ✅ | 132.2M | 🔴 **+82%** |
| format.json | relative-json-pointer format | 6 | ✅ | 72.9M | ✅ | 132.8M | 🔴 **+82%** |
| format.json | iri format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 72.7M | ✅ | 132.7M | 🔴 **+82%** |
| format.json | uri-reference format | 6 | ✅ | 72.7M | ✅ | 110.1M | 🔴 **+51%** |
| format.json | uri-template format | 6 | ✅ | 73.0M | ✅ | 132.9M | 🔴 **+82%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 78.9M | ✅ | 135.5M | 🔴 **+72%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 135.5M | 🔴 **+71%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.1M | ✅ | 115.5M | 🔴 **+60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ✅ | 93.7M | 🔴 **+39%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.2M | ✅ | 94.6M | 🔴 **+43%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ✅ | 70.2M | +11% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 70.1M | ✅ | 127.9M | 🔴 **+83%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.1M | ✅ | 84.7M | 🔴 **+28%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.6M | ✅ | 80.1M | 🔴 **+22%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 37.2M | -5% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.8M | ✅ | 23.4M | 🟢 **-38%** |
| items.json | a schema given for items | 4 | ✅ | 49.0M | ✅ | 42.7M | -13% |
| items.json | an array of schemas for items | 6 | ✅ | 60.4M | ✅ | 55.8M | -8% |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.2M | ✅ | 134.7M | 🔴 **+70%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.0M | ✅ | 65.8M | +4% |
| items.json | items with boolean schemas | 3 | ✅ | 55.7M | ✅ | 75.2M | 🔴 **+35%** |
| items.json | items and subitems | 6 | ✅ | 15.9M | ✅ | 8.3M | 🟢 **-48%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 6.7M | 🟢 **-43%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 66.1M | ✅ | 66.4M | +1% |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.1M | ✅ | 69.3M | +8% |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 99.7M | 🔴 **+46%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 83.3M | 🔴 **+31%** |
| maxLength.json | maxLength validation | 5 | ✅ | 49.7M | ✅ | 44.5M | -11% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 51.3M | +0% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.6M | ✅ | 68.2M | 🔴 **+30%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.4M | ✅ | 47.2M | +9% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.3M | ✅ | 50.3M | +13% |
| maximum.json | maximum validation | 4 | ✅ | 67.0M | ✅ | 99.4M | 🔴 **+48%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.1M | ✅ | 101.2M | 🔴 **+53%** |
| minItems.json | minItems validation | 4 | ✅ | 67.9M | ✅ | 99.2M | 🔴 **+46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.8M | ✅ | 83.0M | 🔴 **+30%** |
| minLength.json | minLength validation | 5 | ✅ | 47.5M | ✅ | 35.5M | 🟢 **-25%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 50.9M | ✅ | 42.1M | -17% |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 68.8M | 🔴 **+29%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.1M | ✅ | 47.9M | +4% |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ✅ | 91.0M | 🔴 **+36%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.4M | ✅ | 80.2M | 🔴 **+27%** |
| multipleOf.json | by int | 3 | ✅ | 66.8M | ✅ | 91.3M | 🔴 **+37%** |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ✅ | 56.2M | -12% |
| multipleOf.json | by small number | 2 | ✅ | 59.0M | ✅ | 20.6M | 🟢 **-65%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.5M | ✅ | 17.1M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 66.8M | ✅ | 84.1M | 🔴 **+26%** |
| not.json | not multiple types | 3 | ✅ | 60.5M | ✅ | 71.8M | +19% |
| not.json | not more complex schema | 3 | ✅ | 60.1M | ✅ | 46.5M | 🟢 **-23%** |
| not.json | forbidden property | 2 | ✅ | 46.7M | ✅ | 59.3M | 🔴 **+27%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.1M | ✅ | 61.1M | +11% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ✅ | 62.3M | +13% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.9M | ✅ | 132.5M | 🔴 **+75%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 101.7M | 🔴 **+33%** |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 70.5M | +18% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.2M | ✅ | 27.3M | -13% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.0M | ✅ | 55.8M | -2% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 125.2M | 🔴 **+63%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 64.5M | +11% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.1M | ✅ | 64.5M | +11% |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 29.1M | 🟢 **-29%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.1M | ✅ | 85.3M | 🔴 **+29%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ✅ | 26.0M | 🟢 **-41%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 31.4M | 🟢 **-30%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.2M | ✅ | 86.6M | 🔴 **+31%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 71.1M | 🔴 **+44%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 23.4M | ✅ | 65.0M | 🔴 **+178%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.4M | ✅ | 19.2M | 🟢 **-25%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 14.3M | +3% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 13.6M | -8% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 18.0M | -12% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 19.4M | +11% |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 51.8M | +3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.3M | ✅ | 11.7M | 🟢 **-36%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.0M | ✅ | 52.9M | 🔴 **+20%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.5M | ✅ | 24.2M | 🟢 **-47%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.5M | ✅ | 59.9M | +1% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.7M | ✅ | 28.9M | +8% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.9M | ✅ | 38.6M | +2% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 16.7M | -13% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 134.6M | 🔴 **+70%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.3M | ✅ | 12.3M | 🟢 **-74%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 30.0M | -20% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.0M | ✅ | 30.7M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 22.8M | ✅ | 15.0M | 🟢 **-34%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.1M | ✅ | 29.1M | 🟢 **-38%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.9M | ✅ | 25.1M | 🟢 **-50%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 29.4M | 🟢 **-32%** |
| ref.json | nested refs | 2 | ✅ | 36.4M | ✅ | 11.8M | 🟢 **-68%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 24.8M | 🟢 **-47%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.5M | ✅ | 29.0M | 🟢 **-39%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ✅ | 121.1M | 🔴 **+58%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ✅ | 33.3M | 🟢 **-43%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 2.9M | 🟢 **-66%** |
| ref.json | refs with quote | 2 | ✅ | 47.2M | ✅ | 27.9M | 🟢 **-41%** |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ✅ | 38.7M | -15% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 43.3M | ✅ | 43.2M | 0% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 42.8M | ✅ | 39.5M | -8% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.2M | ✅ | 38.3M | 🟢 **-25%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ✅ | 10.4M | 🟢 **-67%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.6M | ✅ | 10.4M | 🟢 **-67%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.2M | ✅ | 43.0M | -5% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.8M | ✅ | 25.5M | 🟢 **-32%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.5M | ✅ | 29.1M | 🟢 **-39%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.4M | ✅ | 29.0M | 🟢 **-37%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 40.1M | ✅ | 28.9M | 🟢 **-28%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.9M | ✅ | 25.6M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.3M | ✅ | 29.0M | 🟢 **-35%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.1M | ✅ | 29.0M | 🟢 **-22%** |
| ref.json | ref to if | 2 | ✅ | 45.7M | ✅ | 41.4M | -9% |
| ref.json | ref to then | 2 | ✅ | 46.2M | ✅ | 43.4M | -6% |
| ref.json | ref to else | 2 | ✅ | 45.0M | ✅ | 40.9M | -9% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.8M | ✅ | 42.9M | -6% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.6M | ✅ | 42.8M | 🟢 **-36%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 43.3M | 🟢 **-35%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.2M | ✅ | 42.9M | 🟢 **-30%** |
| refRemote.json | remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 35.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.5M | ✅ | 82.5M | 🔴 **+44%** |
| required.json | required default validation | 1 | ✅ | 76.7M | ✅ | 125.2M | 🔴 **+63%** |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 125.3M | 🔴 **+63%** |
| required.json | required with escaped characters | 2 | ✅ | 45.6M | ✅ | 24.0M | 🟢 **-47%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ✅ | 36.1M | 🔴 **+38%** |
| type.json | integer type matches integers | 9 | ✅ | 58.0M | ✅ | 64.0M | +10% |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 73.6M | 🔴 **+23%** |
| type.json | string type matches strings | 9 | ✅ | 59.0M | ✅ | 72.7M | 🔴 **+23%** |
| type.json | object type matches objects | 7 | ✅ | 52.4M | ✅ | 60.3M | +15% |
| type.json | array type matches arrays | 7 | ✅ | 55.5M | ✅ | 60.0M | +8% |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 63.3M | +9% |
| type.json | null type matches only the null object | 10 | ✅ | 54.0M | ✅ | 60.1M | +11% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.9M | ✅ | 69.9M | 🔴 **+21%** |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 87.6M | 🔴 **+31%** |
| type.json | type: array or object | 5 | ✅ | 58.4M | ✅ | 66.4M | +14% |
| type.json | type: array, object or null | 5 | ✅ | 66.4M | ✅ | 72.9M | +10% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 7.9M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 24.2M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 25.3M | 🔴 **+40%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 73.2M | ✅ | 130.5M | 🔴 **+78%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 47.3M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.2M | ✅ | 42.8M | 🟢 **-28%** |
| optional/bignum.json | integer | 2 | ✅ | 75.4M | ✅ | 121.2M | 🔴 **+61%** |
| optional/bignum.json | number | 2 | ✅ | 75.7M | ✅ | 126.9M | 🔴 **+68%** |
| optional/bignum.json | string | 1 | ✅ | 73.1M | ✅ | 62.7M | -14% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 111.2M | 🔴 **+62%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 59.8M | +11% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 111.3M | 🔴 **+62%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 59.9M | +11% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 356K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 71.8M | 🔴 **+159%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.3M | ✅ | 35.8M | 🔴 **+86%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.3M | ✅ | 36.0M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.3M | ✅ | 36.2M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.2M | ✅ | 34.1M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 34.9M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 33.7M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.1M | ✅ | 36.0M | 🔴 **+44%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 38.0M | 🔴 **+52%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 33.1M | +15% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ✅ | 18.7M | 🔴 **+23%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 16.2M | +12% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 16.0M | +7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 30.9M | 🔴 **+22%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 9.8M | ✅ | 25.9M | 🔴 **+165%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 19.7M | -13% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.7M | ✅ | 13.4M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 15.2M | 🟢 **-21%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.0M | +16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 11.1M | 🔴 **+36%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ✅ | 15.9M | -19% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.7M | ✅ | 9.2M | 🟢 **-63%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ✅ | 24.6M | 🔴 **+195%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ✅ | 14.6M | 🟢 **-21%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.0M | ✅ | 34.5M | -1% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ✅ | 17.8M | 🔴 **+50%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 28.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 19.1M | ✅ | 36.1M | 🔴 **+89%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 933K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.7M | ✅ | 43.4M | 🔴 **+29%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.7M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ✅ | 19.1M | 🔴 **+25%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.9M | 🟢 **-23%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 31.7M | ✅ | 24.4M | 🟢 **-23%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 53.4M | ✅ | 36.7M | 🟢 **-31%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 53.4M | ✅ | 38.4M | 🟢 **-28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ✅ | 34.5M | 🔴 **+28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ✅ | 10.5M | 🟢 **-36%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ✅ | 24.7M | 🔴 **+80%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 7.5M | 🟢 **-83%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.7M | ✅ | 26.4M | 🟢 **-24%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 166.0M | ✅ | 125.5M | 🟢 **-24%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 91.3M | 🔴 **+25%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 175.2M | ✅ | 135.5M | 🟢 **-23%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 87.0M | ✅ | 69.3M | 🟢 **-20%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 33.7M | ✅ | 35.8M | +6% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 31.0M | ✅ | 26.3M | -15% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.7M | ✅ | 70.0M | 🟢 **-37%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 88.9M | ✅ | 65.8M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 43.9M | ✅ | 37.2M | -15% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.8M | ✅ | 21.9M | +6% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.9M | ✅ | 26.4M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.0M | ✅ | 24.8M | -17% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 166.3M | ✅ | 125.3M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 20.3M | ✅ | 14.6M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 71.8M | ✅ | 51.7M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.0M | ✅ | 13.7M | 🟢 **-45%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 23.5M | ✅ | 17.1M | 🟢 **-27%** |
| allOf.json | allOf | 4 | ✅ | 30.7M | ✅ | 40.1M | 🔴 **+31%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.8M | ✅ | 25.4M | -5% |
| allOf.json | allOf simple types | 2 | ✅ | 82.6M | ✅ | 85.9M | +4% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 166.2M | ✅ | 125.4M | 🟢 **-25%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.5M | ✅ | 64.5M | -13% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.9M | ✅ | 64.6M | 🟢 **-37%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 99.6M | ✅ | 125.4M | 🔴 **+26%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.3M | ✅ | 125.9M | 🟢 **-25%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.7M | ✅ | 47.1M | 🟢 **-44%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.6M | ✅ | 85.6M | 🟢 **-32%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 85.8M | ✅ | 86.7M | +1% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 59.3M | 🟢 **-31%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 83.3M | ✅ | 34.1M | 🟢 **-59%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 69.1M | ✅ | 35.7M | 🟢 **-48%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 34.3M | ✅ | 38.6M | +13% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 85.4M | ✅ | 38.2M | 🟢 **-55%** |
| anyOf.json | anyOf | 4 | ✅ | 86.7M | ✅ | 93.5M | +8% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.9M | ✅ | 27.4M | 🟢 **-31%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.1M | ✅ | 125.5M | 🔴 **+27%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 99.3M | ✅ | 125.4M | 🔴 **+26%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 74.4M | ✅ | 64.5M | -13% |
| anyOf.json | anyOf complex types | 4 | ✅ | 58.4M | ✅ | 23.3M | 🟢 **-60%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 90.2M | ✅ | 129.2M | 🔴 **+43%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 86.1M | ✅ | 87.3M | +1% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 77.8M | ✅ | 138.5M | 🔴 **+78%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 71.5M | ✅ | 15.7M | 🟢 **-78%** |
| const.json | const validation | 3 | ✅ | 76.9M | ✅ | 69.6M | -9% |
| const.json | const with object | 4 | ✅ | 44.1M | ✅ | 28.9M | 🟢 **-34%** |
| const.json | const with array | 3 | ✅ | 64.6M | ✅ | 9.0M | 🟢 **-86%** |
| const.json | const with null | 2 | ✅ | 86.4M | ✅ | 81.5M | -6% |
| const.json | const with false does not match 0 | 3 | ✅ | 81.6M | ✅ | 74.8M | -8% |
| const.json | const with true does not match 1 | 3 | ✅ | 78.6M | ✅ | 74.2M | -6% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 72.3M | ✅ | 67.7M | -6% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 72.1M | ✅ | 69.0M | -4% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 69.7M | ✅ | 33.7M | 🟢 **-52%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 70.8M | ✅ | 33.5M | 🟢 **-53%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 72.0M | ✅ | 65.6M | -9% |
| const.json | const with 1 does not match true | 3 | ✅ | 82.3M | ✅ | 91.0M | +11% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 79.0M | ✅ | 69.1M | -12% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 80.1M | ✅ | 79.4M | -1% |
| const.json | nul characters in strings | 2 | ✅ | 72.1M | ✅ | 74.2M | +3% |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.6M | ✅ | 66.9M | +2% |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.2M | ✅ | 76.1M | +4% |
| contains.json | contains keyword validation | 6 | ✅ | 71.1M | ✅ | 20.4M | 🟢 **-71%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 68.1M | ✅ | 14.5M | 🟢 **-79%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 79.0M | ✅ | 73.3M | -7% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 77.9M | ✅ | 42.8M | 🟢 **-45%** |
| contains.json | items + contains | 4 | ✅ | 38.3M | ✅ | 17.8M | 🟢 **-54%** |
| contains.json | contains with false if subschema | 2 | ✅ | 76.4M | ✅ | 73.3M | -4% |
| contains.json | contains with null instance elements | 1 | ✅ | 87.1M | ✅ | 38.6M | 🟢 **-56%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 104.3M | ✅ | 138.0M | 🔴 **+32%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 105.4M | ✅ | 136.8M | 🔴 **+30%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 90.5M | ✅ | 139.5M | 🔴 **+54%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 78.3M | ✅ | 138.1M | 🔴 **+76%** |
| default.json | invalid type for default | 2 | ✅ | 77.1M | ✅ | 68.6M | -11% |
| default.json | invalid string value for default | 2 | ✅ | 77.1M | ✅ | 45.0M | 🟢 **-42%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.3M | ✅ | 57.4M | +8% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.7M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 63.9M | ✅ | 72.2M | +13% |
| dependentRequired.json | empty dependents | 3 | ✅ | 104.9M | ✅ | 136.8M | 🔴 **+30%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.7M | ✅ | 31.6M | +18% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 44.8M | ✅ | 39.0M | -13% |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.7M | ✅ | 48.0M | -5% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 61.0M | ✅ | 54.9M | -10% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.0M | ✅ | 35.0M | -6% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.1M | ✅ | 26.2M | 🟢 **-21%** |
| enum.json | simple enum validation | 2 | ✅ | 82.0M | ✅ | 83.1M | +1% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 51.4M | ✅ | 38.9M | 🟢 **-24%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 81.5M | ✅ | 89.4M | +10% |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 40.4M | 🔴 **+170%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.4M | ✅ | 97.3M | +11% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 81.4M | ✅ | 76.0M | -7% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ✅ | 68.3M | -5% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 81.1M | ✅ | 75.7M | -7% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 72.1M | ✅ | 68.3M | -5% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 83.5M | ✅ | 89.4M | +7% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.1M | ✅ | 80.7M | +10% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 83.3M | ✅ | 90.7M | +9% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 72.0M | ✅ | 81.1M | +13% |
| enum.json | nul characters in strings | 2 | ✅ | 71.8M | ✅ | 74.3M | +3% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.2M | ✅ | 79.8M | +1% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.5M | ✅ | 79.3M | 0% |
| format.json | email format | 6 | ✅ | 103.5M | ✅ | 131.6M | 🔴 **+27%** |
| format.json | idn-email format | 6 | ✅ | 104.5M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 90.6M | ✅ | 131.9M | 🔴 **+46%** |
| format.json | ipv4 format | 6 | ✅ | 90.5M | ✅ | 106.2M | +17% |
| format.json | ipv6 format | 6 | ✅ | 76.7M | ✅ | 115.8M | 🔴 **+51%** |
| format.json | idn-hostname format | 6 | ✅ | 90.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 91.2M | ✅ | 132.0M | 🔴 **+45%** |
| format.json | date format | 6 | ✅ | 90.6M | ✅ | 121.8M | 🔴 **+35%** |
| format.json | date-time format | 6 | ✅ | 91.3M | ✅ | 131.2M | 🔴 **+44%** |
| format.json | time format | 6 | ✅ | 90.5M | ✅ | 122.3M | 🔴 **+35%** |
| format.json | json-pointer format | 6 | ✅ | 91.1M | ✅ | 132.8M | 🔴 **+46%** |
| format.json | relative-json-pointer format | 6 | ✅ | 90.2M | ✅ | 133.4M | 🔴 **+48%** |
| format.json | iri format | 6 | ✅ | 91.0M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 89.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 92.1M | ✅ | 132.9M | 🔴 **+44%** |
| format.json | uri-reference format | 6 | ✅ | 90.5M | ✅ | 132.6M | 🔴 **+47%** |
| format.json | uri-template format | 6 | ✅ | 89.9M | ✅ | 132.1M | 🔴 **+47%** |
| format.json | uuid format | 6 | ✅ | 91.0M | ✅ | 123.3M | 🔴 **+36%** |
| format.json | duration format | 6 | ✅ | 91.0M | ✅ | 119.5M | 🔴 **+31%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.2M | ✅ | 132.7M | 🔴 **+42%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.3M | ✅ | 134.6M | 🔴 **+44%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 93.1M | ✅ | 130.0M | 🔴 **+40%** |
| if-then-else.json | if and then without else | 3 | ✅ | 85.7M | ✅ | 95.4M | +11% |
| if-then-else.json | if and else without then | 3 | ✅ | 79.6M | ✅ | 95.3M | +20% |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 80.8M | ✅ | 41.4M | 🟢 **-49%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 93.7M | ✅ | 128.1M | 🔴 **+37%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 84.2M | ✅ | 81.9M | -3% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 74.9M | ✅ | 79.5M | +6% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.3M | ✅ | 35.5M | 🟢 **-23%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.5M | ✅ | 24.9M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 54.8M | ✅ | 41.7M | 🟢 **-24%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.8M | ✅ | 59.3M | -8% |
| items.json | items with boolean schema (true) | 2 | ✅ | 105.5M | ✅ | 130.1M | 🔴 **+23%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 78.1M | ✅ | 66.8M | -14% |
| items.json | items with boolean schemas | 3 | ✅ | 55.0M | ✅ | 79.9M | 🔴 **+45%** |
| items.json | items and subitems | 6 | ✅ | 14.2M | ✅ | 8.1M | 🟢 **-43%** |
| items.json | nested items | 3 | ✅ | 11.5M | ✅ | 6.7M | 🟢 **-42%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 83.8M | ✅ | 66.4M | 🟢 **-21%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.6M | ✅ | 69.3M | 🟢 **-22%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 104.0M | ✅ | 114.3M | +10% |
| maxContains.json | maxContains with contains | 5 | ✅ | 64.1M | ✅ | 24.8M | 🟢 **-61%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 72.8M | ✅ | 24.4M | 🟢 **-67%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 67.4M | ✅ | 20.8M | 🟢 **-69%** |
| maxItems.json | maxItems validation | 4 | ✅ | 88.1M | ✅ | 99.4M | +13% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 82.2M | ✅ | 83.4M | +1% |
| maxLength.json | maxLength validation | 5 | ✅ | 64.7M | ✅ | 43.4M | 🟢 **-33%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 62.2M | ✅ | 51.4M | -17% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 62.1M | ✅ | 68.9M | +11% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 47.6M | -5% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.2M | ✅ | 50.9M | -4% |
| maximum.json | maximum validation | 4 | ✅ | 85.7M | ✅ | 100.1M | +17% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 81.9M | ✅ | 102.6M | 🔴 **+25%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 104.8M | ✅ | 132.8M | 🔴 **+27%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 78.6M | ✅ | 29.2M | 🟢 **-63%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 67.9M | ✅ | 23.4M | 🟢 **-66%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 74.3M | ✅ | 23.6M | 🟢 **-68%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 67.8M | ✅ | 23.5M | 🟢 **-65%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 66.1M | ✅ | 23.2M | 🟢 **-65%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 103.9M | ✅ | 54.7M | 🟢 **-47%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 80.1M | ✅ | 28.7M | 🟢 **-64%** |
| minItems.json | minItems validation | 4 | ✅ | 89.0M | ✅ | 99.8M | +12% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.8M | ✅ | 83.4M | +1% |
| minLength.json | minLength validation | 5 | ✅ | 64.2M | ✅ | 36.0M | 🟢 **-44%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 62.3M | ✅ | 47.1M | 🟢 **-24%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.4M | ✅ | 69.8M | +8% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.9M | ✅ | 50.2M | -3% |
| minimum.json | minimum validation | 4 | ✅ | 85.4M | ✅ | 99.8M | +17% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 90.2M | +11% |
| multipleOf.json | by int | 3 | ✅ | 87.9M | ✅ | 95.3M | +8% |
| multipleOf.json | by number | 3 | ✅ | 81.5M | ✅ | 59.5M | 🟢 **-27%** |
| multipleOf.json | by small number | 2 | ✅ | 74.6M | ✅ | 27.1M | 🟢 **-64%** |
| multipleOf.json | float division = inf | 1 | ✅ | 64.6M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.5M | ✅ | 17.2M | 🟢 **-78%** |
| not.json | not | 2 | ✅ | 85.2M | ✅ | 85.4M | +0% |
| not.json | not multiple types | 3 | ✅ | 78.9M | ✅ | 73.0M | -8% |
| not.json | not more complex schema | 3 | ✅ | 75.7M | ✅ | 51.4M | 🟢 **-32%** |
| not.json | forbidden property | 2 | ✅ | 45.6M | ✅ | 60.0M | 🔴 **+32%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 71.4M | ✅ | 63.2M | -12% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 71.2M | ✅ | 61.1M | -14% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.7M | ✅ | 134.9M | 🔴 **+41%** |
| not.json | double negation | 1 | ✅ | 100.0M | ✅ | 102.0M | +2% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 35.5M | ✅ | 14.7M | 🟢 **-59%** |
| oneOf.json | oneOf | 4 | ✅ | 72.1M | ✅ | 68.9M | -4% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.3M | ✅ | 26.9M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 73.9M | ✅ | 63.3M | -14% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 98.9M | ✅ | 121.4M | 🔴 **+23%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 72.4M | ✅ | 63.0M | -13% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.3M | ✅ | 63.2M | -16% |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.3M | ✅ | 28.4M | 🟢 **-39%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.7M | ✅ | 85.3M | +3% |
| oneOf.json | oneOf with required | 4 | ✅ | 51.1M | ✅ | 25.9M | 🟢 **-49%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 51.0M | ✅ | 32.4M | 🟢 **-36%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 83.1M | ✅ | 86.1M | +4% |
| pattern.json | pattern validation | 8 | ✅ | 59.0M | ✅ | 69.1M | +17% |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.5M | ✅ | 57.1M | 🔴 **+107%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 18.1M | 🟢 **-30%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 14.1M | +3% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ✅ | 13.6M | -7% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.0M | ✅ | 18.2M | -4% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.4M | ✅ | 21.7M | +6% |
| properties.json | object properties validation | 6 | ✅ | 51.6M | ✅ | 52.9M | +2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 11.4M | 🟢 **-37%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.2M | ✅ | 53.2M | 🔴 **+23%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.3M | ✅ | 23.6M | 🟢 **-44%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.0M | ✅ | 58.1M | 🟢 **-25%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ✅ | 28.2M | +2% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.6M | ✅ | 37.8M | -5% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 15.9M | -17% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 105.0M | ✅ | 130.3M | 🔴 **+24%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 54.2M | ✅ | 24.8M | 🟢 **-54%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.7M | ✅ | 30.3M | -20% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.8M | ✅ | 32.5M | -16% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 11.7M | ✅ | 13.8M | +18% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ✅ | 10.7M | 🔴 **+89%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 10.6M | 🔴 **+293%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 10.6M | ✅ | 10.8M | +2% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.9M | ✅ | 10.9M | +10% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ✅ | 16.3M | 🔴 **+103%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.2M | ✅ | 14.7M | 🔴 **+102%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ✅ | 4.3M | +4% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 4.4M | +7% |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 13.6M | 🟢 **-39%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.7M | ✅ | 28.9M | 🟢 **-39%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.4M | ✅ | 24.7M | 🟢 **-51%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.2M | ✅ | 28.4M | 🟢 **-33%** |
| ref.json | nested refs | 2 | ✅ | 26.2M | ✅ | 11.3M | 🟢 **-57%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.1M | ✅ | 29.9M | 🟢 **-24%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.5M | ✅ | 48.0M | +1% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 28.6M | 🟢 **-36%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 98.9M | ✅ | 120.0M | 🔴 **+21%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 76.3M | ✅ | 35.0M | 🟢 **-54%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.6M | ✅ | 2.5M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 47.7M | ✅ | 28.8M | 🟢 **-40%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 21.7M | ✅ | 10.2M | 🟢 **-53%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.4M | ✅ | 38.1M | 🟢 **-39%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.0M | ✅ | 10.3M | 🟢 **-65%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 27.6M | ✅ | 10.3M | 🟢 **-63%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 33.3M | ✅ | 38.3M | +15% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 32.7M | ✅ | 39.9M | 🔴 **+22%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 83.6M | ✅ | 41.5M | 🟢 **-50%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 27.7M | ✅ | 24.9M | -10% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 46.4M | ✅ | 24.4M | 🟢 **-47%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ✅ | 28.4M | 🟢 **-40%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.3M | ✅ | 28.5M | 🟢 **-39%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ✅ | 27.7M | 🟢 **-34%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.7M | ✅ | 29.2M | 🟢 **-33%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 41.8M | ✅ | 27.7M | 🟢 **-34%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.3M | ✅ | 28.9M | 🟢 **-35%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 34.7M | ✅ | 23.6M | 🟢 **-32%** |
| ref.json | ref to if | 2 | ✅ | 34.0M | ✅ | 39.1M | +15% |
| ref.json | ref to then | 2 | ✅ | 35.0M | ✅ | 35.8M | +2% |
| ref.json | ref to else | 2 | ✅ | 34.0M | ✅ | 37.0M | +9% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 34.5M | ✅ | 36.3M | +5% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.2M | ✅ | 36.3M | 🟢 **-57%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.6M | ✅ | 36.1M | 🟢 **-58%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 43.5M | 🟢 **-44%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.3M | ✅ | 17.5M | 🔴 **+306%** |
| refRemote.json | remote ref | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 33.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.7M | ✅ | 80.5M | 🔴 **+24%** |
| required.json | required default validation | 1 | ✅ | 99.1M | ✅ | 121.5M | 🔴 **+23%** |
| required.json | required with empty array | 1 | ✅ | 98.6M | ✅ | 121.4M | 🔴 **+23%** |
| required.json | required with escaped characters | 2 | ✅ | 47.5M | ✅ | 22.8M | 🟢 **-52%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ✅ | 35.4M | 🔴 **+41%** |
| type.json | integer type matches integers | 9 | ✅ | 72.2M | ✅ | 63.9M | -11% |
| type.json | number type matches numbers | 9 | ✅ | 73.7M | ✅ | 68.3M | -7% |
| type.json | string type matches strings | 9 | ✅ | 73.8M | ✅ | 63.9M | -13% |
| type.json | object type matches objects | 7 | ✅ | 62.8M | ✅ | 57.2M | -9% |
| type.json | array type matches arrays | 7 | ✅ | 67.2M | ✅ | 59.5M | -11% |
| type.json | boolean type matches booleans | 10 | ✅ | 71.9M | ✅ | 63.3M | -12% |
| type.json | null type matches only the null object | 10 | ✅ | 71.6M | ✅ | 60.2M | -16% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.8M | ✅ | 64.4M | -8% |
| type.json | type as array with one item | 2 | ✅ | 81.5M | ✅ | 84.3M | +3% |
| type.json | type: array or object | 5 | ✅ | 79.2M | ✅ | 66.4M | -16% |
| type.json | type: array, object or null | 5 | ✅ | 83.1M | ✅ | 80.9M | -3% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 92.0M | ✅ | 130.1M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 49.5M | ✅ | 80.0M | 🔴 **+62%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.8M | ✅ | 53.9M | +8% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 77.5M | ✅ | 45.2M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 46.4M | ✅ | 49.0M | +6% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 86.4M | ✅ | 67.9M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 38.3M | ✅ | 27.4M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 33.8M | ✅ | 27.0M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 42.4M | ✅ | 37.4M | -12% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.4M | ✅ | 13.3M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 90.5M | ✅ | 70.7M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 70.6M | 🔴 **+232%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.5M | ✅ | 15.4M | 🔴 **+34%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.1M | ✅ | 23.4M | 🔴 **+65%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 30.5M | ✅ | 28.0M | -8% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.7M | ✅ | 14.4M | 🔴 **+34%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 50.1M | ✅ | 79.9M | 🔴 **+59%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 42.8M | ✅ | 35.1M | -18% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 41.7M | ✅ | 35.1M | -16% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.1M | ✅ | 58.1M | 🔴 **+66%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.7M | ✅ | 28.1M | +18% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 73.2M | ✅ | 130.1M | 🔴 **+78%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 85.0M | ✅ | 66.4M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.2M | ✅ | 20.5M | +7% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 32.2M | ✅ | 32.2M | +0% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 60.9M | ✅ | 98.4M | 🔴 **+61%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.3M | ✅ | 23.7M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.6M | ✅ | 24.1M | 🟢 **-26%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.8M | ✅ | 20.0M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ✅ | 15.5M | 🔴 **+34%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 75.1M | ✅ | 58.0M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.2M | ✅ | 16.8M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 12.7M | 🔴 **+34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 74.3M | ✅ | 58.0M | 🟢 **-22%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 34.8M | ✅ | 56.0M | 🔴 **+61%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.5M | ✅ | 5.7M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ✅ | 9.7M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 20.4M | ✅ | 11.9M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.1M | ✅ | 7.0M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.9M | ✅ | 7.6M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.9M | ✅ | 6.7M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.4M | ✅ | 12.8M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ✅ | 22.2M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.4M | ✅ | 15.4M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ✅ | 15.7M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.9M | ✅ | 15.6M | 🟢 **-35%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.9M | ✅ | 16.9M | 🟢 **-30%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 35.1M | ✅ | 58.0M | 🔴 **+65%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.3M | ✅ | 57.9M | 🔴 **+74%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.4M | ✅ | 14.5M | 🟢 **-36%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.7M | ✅ | 19.6M | 🟢 **-27%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 18.0M | ✅ | 14.5M | -20% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ✅ | 20.2M | 🔴 **+82%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.9M | ✅ | 15.2M | 🟢 **-46%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 27.4M | ✅ | 21.2M | 🟢 **-23%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 50.5M | ✅ | 21.4M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ✅ | 10.6M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.4M | ✅ | 9.4M | 🟢 **-54%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 2.9M | 🟢 **-60%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 92.5M | ✅ | 117.8M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 54.9M | ✅ | 50.2M | -9% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.3M | ✅ | 20.5M | -19% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ✅ | 4.0M | 🟢 **-67%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.2M | ✅ | 12.7M | 🟢 **-37%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 20.3M | ✅ | 11.8M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 7.9M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.7M | ✅ | 23.9M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.4M | ✅ | 29.7M | 🔴 **+46%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.5M | ✅ | 124.0M | 🔴 **+42%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ✅ | 46.3M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.1M | ✅ | 41.2M | 🟢 **-48%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.0M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 80.9M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 65.9M | ✅ | 24.2M | 🟢 **-63%** |
| optional/bignum.json | integer | 2 | ✅ | 93.6M | ✅ | 112.0M | +20% |
| optional/bignum.json | number | 2 | ✅ | 98.8M | ✅ | 121.8M | 🔴 **+23%** |
| optional/bignum.json | string | 1 | ✅ | 71.6M | ✅ | 60.9M | -15% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 89.2M | ✅ | 107.8M | 🔴 **+21%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 67.0M | ✅ | 59.9M | -11% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 89.0M | ✅ | 107.4M | 🔴 **+21%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.6M | ✅ | 59.9M | -10% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.5M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 77.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.9M | ✅ | 70.1M | +15% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 103.1M | ✅ | 133.2M | 🔴 **+29%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.9M | ✅ | 30.9M | -3% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.1M | ✅ | 39.4M | -12% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 47.5M | ✅ | 46.4M | -2% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 62.3M | ✅ | 55.0M | -12% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.8M | ✅ | 34.6M | -3% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 38.1M | ✅ | 68.6M | 🔴 **+80%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 35.0M | 🔴 **+65%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.2M | ✅ | 34.1M | +13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 35.1M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 32.6M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.5M | ✅ | 34.6M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 31.3M | ✅ | 34.8M | +11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 31.0M | ✅ | 34.9M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 28.4M | ✅ | 37.1M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 32.6M | -1% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.9M | ✅ | 19.5M | +9% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.8M | ✅ | 16.1M | -10% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ✅ | 15.0M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 30.7M | ✅ | 32.9M | +7% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.6M | ✅ | 23.3M | +3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 19.6M | -16% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 13.3M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 14.8M | -17% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.2M | +4% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 10.5M | 🔴 **+21%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.7M | ✅ | 13.5M | +16% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 28.0M | ✅ | 9.0M | 🟢 **-68%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.5M | ✅ | 24.4M | 🔴 **+155%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 44.2M | ✅ | 13.7M | 🟢 **-69%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.5M | ✅ | 14.3M | 🟢 **-27%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ✅ | 34.2M | -14% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.6M | ✅ | 16.8M | 🔴 **+33%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 35.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.3M | ✅ | 35.1M | +5% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 78.7M | ✅ | 943K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.9M | ✅ | 41.7M | +10% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 104.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ✅ | 7.7M | 🟢 **-26%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.5M | ✅ | 19.0M | +2% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.2M | ✅ | 4.7M | 🟢 **-35%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 16.5M | ✅ | 15.5M | -6% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 31.0M | ✅ | 25.1M | -19% |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 69.0M | ✅ | 58.8M | -15% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.9M | ✅ | 33.8M | +3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 10.3M | 🟢 **-36%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 43.5M | ✅ | 28.4M | 🟢 **-35%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 45.1M | ✅ | 28.7M | 🟢 **-36%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 27.8M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 84.8M | ✅ | 34.8M | 🟢 **-59%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.0M | ✅ | 27.1M | 🟢 **-41%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.8M | ✅ | 24.2M | 🔴 **+124%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.9M | ✅ | 21.1M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.0M | ✅ | 24.3M | +16% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 27.6M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 16.0M | ✅ | 25.1M | 🔴 **+57%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 151.6M | ✅ | 124.9M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.4M | ✅ | 17.4M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 51.5M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.7M | ✅ | 13.8M | 🟢 **-44%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.9M | ✅ | 9.5M | 🟢 **-69%** |
| allOf.json | allOf | 4 | ✅ | 37.7M | ✅ | 37.2M | -1% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.2M | ✅ | 25.4M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 64.7M | ✅ | 85.7M | 🔴 **+32%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 120.6M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ✅ | 64.3M | +6% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.3M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 125.0M | 🔴 **+70%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 150.8M | ✅ | 118.8M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ✅ | 84.3M | 🔴 **+21%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 87.4M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.8M | ✅ | 85.8M | 🔴 **+21%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 72.5M | ✅ | 59.9M | -17% |
| anchor.json | Location-independent identifier | 2 | ✅ | 84.5M | ✅ | 38.0M | 🟢 **-55%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 41.7M | ✅ | 38.3M | -8% |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.8M | ✅ | 38.3M | 🟢 **-55%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 69.6M | ✅ | 38.4M | 🟢 **-45%** |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ✅ | 90.4M | 🔴 **+26%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 27.9M | -19% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.8M | ✅ | 125.4M | 🔴 **+55%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 80.7M | ✅ | 124.9M | 🔴 **+55%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 64.4M | +6% |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.3M | ✅ | 30.4M | 🟢 **-36%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.1M | ✅ | 135.6M | 🔴 **+78%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 87.4M | 🔴 **+23%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 80.5M | ✅ | 137.8M | 🔴 **+71%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 56.7M | ✅ | 62.5M | +10% |
| const.json | const validation | 3 | ✅ | 60.1M | ✅ | 61.0M | +1% |
| const.json | const with object | 4 | ✅ | 38.9M | ✅ | 32.1M | -17% |
| const.json | const with array | 3 | ✅ | 54.0M | ✅ | 8.9M | 🟢 **-83%** |
| const.json | const with null | 2 | ✅ | 71.1M | ✅ | 86.8M | 🔴 **+22%** |
| const.json | const with false does not match 0 | 3 | ✅ | 68.2M | ✅ | 76.6M | +12% |
| const.json | const with true does not match 1 | 3 | ✅ | 67.5M | ✅ | 76.6M | +14% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.8M | ✅ | 70.6M | +16% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 60.3M | ✅ | 70.0M | +16% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.2M | ✅ | 33.4M | 🟢 **-44%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.5M | ✅ | 33.4M | 🟢 **-45%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.1M | ✅ | 65.1M | +12% |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ✅ | 90.8M | 🔴 **+35%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.9M | ✅ | 68.6M | +13% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.4M | ✅ | 81.4M | 🔴 **+23%** |
| const.json | nul characters in strings | 2 | ✅ | 58.2M | ✅ | 74.4M | 🔴 **+28%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ✅ | 67.1M | 🔴 **+23%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.5M | ✅ | 75.6M | 🔴 **+25%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.5M | ✅ | 19.9M | 🟢 **-67%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ✅ | 14.6M | 🟢 **-74%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.7M | ✅ | 72.9M | +11% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.1M | ✅ | 42.4M | 🟢 **-36%** |
| contains.json | items + contains | 4 | ✅ | 37.6M | ✅ | 18.1M | 🟢 **-52%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.3M | ✅ | 72.3M | +14% |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 38.3M | 🟢 **-46%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 84.8M | ✅ | 138.0M | 🔴 **+63%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 84.8M | ✅ | 137.1M | 🔴 **+62%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 75.8M | ✅ | 138.6M | 🔴 **+83%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 71.2M | ✅ | 138.4M | 🔴 **+94%** |
| default.json | invalid type for default | 2 | ✅ | 65.4M | ✅ | 75.1M | +15% |
| default.json | invalid string value for default | 2 | ✅ | 51.3M | ✅ | 47.6M | -7% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.4M | ✅ | 56.9M | +9% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.1M | ✅ | 72.4M | 🔴 **+21%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 84.8M | ✅ | 135.9M | 🔴 **+60%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.9M | ✅ | 31.3M | +12% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ✅ | 40.1M | -13% |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.8M | ✅ | 46.6M | -10% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.2M | ✅ | 54.6M | +1% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.7M | ✅ | 34.6M | -13% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.6M | ✅ | 26.6M | 🟢 **-27%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.7M | ✅ | 4.4M | 🟢 **-49%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.8M | ✅ | 19.4M | -7% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.3M | ✅ | 21.1M | 🔴 **+29%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ✅ | 2.4M | 🟢 **-79%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.4M | ✅ | 4.7M | 🟢 **-65%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.7M | ✅ | 2.7M | 🟢 **-75%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.8M | ✅ | 6.4M | -18% |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.5M | ✅ | 17.2M | -7% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.0M | ✅ | 8.4M | 🟢 **-30%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.1M | ✅ | 1.5M | 🟢 **-82%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.3M | ✅ | 12.9M | -16% |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ✅ | 2.1M | 🟢 **-63%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ✅ | 1.6M | 🟢 **-76%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.3M | ✅ | 28.8M | +5% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ✅ | 2.5M | 🟢 **-69%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.8M | ✅ | 85.9M | 🔴 **+32%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.9M | ✅ | 38.0M | -15% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.0M | ✅ | 88.5M | 🔴 **+30%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 40.5M | 🔴 **+179%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 96.6M | 🔴 **+33%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 65.7M | ✅ | 72.7M | +11% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.4M | ✅ | 70.2M | +14% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 68.1M | ✅ | 74.9M | +10% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.7M | ✅ | 60.5M | +1% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.4M | ✅ | 88.9M | 🔴 **+32%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.2M | ✅ | 81.8M | 🔴 **+29%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.4M | ✅ | 91.4M | 🔴 **+36%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ✅ | 80.6M | 🔴 **+28%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 58.5M | -2% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.6M | ✅ | 78.8M | 🔴 **+32%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 65.2M | ✅ | 79.5M | 🔴 **+22%** |
| format.json | email format | 7 | ✅ | 76.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 79.2M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 71.0M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 70.4M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 70.9M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 69.9M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 71.0M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 79.0M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 71.2M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 76.1M | ✅ | 134.7M | 🔴 **+77%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.6M | ✅ | 132.4M | 🔴 **+58%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 76.1M | ✅ | 135.7M | 🔴 **+78%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ✅ | 95.1M | 🔴 **+35%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.6M | ✅ | 94.9M | 🔴 **+36%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.8M | ✅ | 80.1M | 🔴 **+22%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 76.0M | ✅ | 127.9M | 🔴 **+68%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 68.1M | ✅ | 84.8M | 🔴 **+25%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.7M | ✅ | 80.3M | +17% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.1M | ✅ | 36.6M | -9% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.0M | ✅ | 20.1M | 🟢 **-48%** |
| items.json | a schema given for items | 4 | ✅ | 50.6M | ✅ | 35.7M | 🟢 **-30%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.5M | ✅ | 135.4M | 🔴 **+62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.5M | ✅ | 75.2M | +18% |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 8.0M | 🟢 **-37%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 6.7M | 🟢 **-44%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.7M | ✅ | 101.0M | 🔴 **+39%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 43.2M | ✅ | 29.1M | 🟢 **-33%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 42.0M | ✅ | 28.6M | 🟢 **-32%** |
| items.json | items with heterogeneous array | 2 | ✅ | 66.7M | ✅ | 78.2M | +17% |
| items.json | items with null instance elements | 1 | ✅ | 68.9M | ✅ | 66.4M | -4% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 82.9M | ✅ | 135.0M | 🔴 **+63%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.8M | ✅ | 23.3M | 🟢 **-58%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ✅ | 24.3M | 🟢 **-60%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 55.7M | ✅ | 20.2M | 🟢 **-64%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 97.8M | 🔴 **+37%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 83.0M | 🔴 **+25%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 44.5M | -19% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 39.3M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 66.4M | 🔴 **+22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.6M | ✅ | 45.1M | -3% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.9M | ✅ | 50.4M | +5% |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 85.8M | 🔴 **+24%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 83.7M | 🔴 **+21%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 82.5M | ✅ | 135.6M | 🔴 **+64%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 61.1M | ✅ | 29.1M | 🟢 **-52%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.5M | ✅ | 22.8M | 🟢 **-60%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.0M | ✅ | 24.6M | 🟢 **-60%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 49.8M | ✅ | 23.0M | 🟢 **-54%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 54.8M | ✅ | 22.9M | 🟢 **-58%** |
| minContains.json | minContains = 0 | 2 | ✅ | 83.6M | ✅ | 52.1M | 🟢 **-38%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ✅ | 31.3M | 🟢 **-52%** |
| minItems.json | minItems validation | 4 | ✅ | 68.3M | ✅ | 95.1M | 🔴 **+39%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 82.7M | 🔴 **+24%** |
| minLength.json | minLength validation | 5 | ✅ | 54.3M | ✅ | 35.8M | 🟢 **-34%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 49.6M | -7% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.4M | ✅ | 68.3M | 🔴 **+23%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.6M | ✅ | 49.4M | +4% |
| minimum.json | minimum validation | 4 | ✅ | 69.9M | ✅ | 99.7M | 🔴 **+43%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 89.0M | 🔴 **+35%** |
| multipleOf.json | by int | 3 | ✅ | 70.6M | ✅ | 96.2M | 🔴 **+36%** |
| multipleOf.json | by number | 3 | ✅ | 61.2M | ✅ | 59.5M | -3% |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 27.6M | 🟢 **-55%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 69.8M | ✅ | 84.9M | 🔴 **+22%** |
| not.json | not multiple types | 3 | ✅ | 65.0M | ✅ | 75.4M | +16% |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ✅ | 47.2M | 🟢 **-25%** |
| not.json | forbidden property | 2 | ✅ | 49.0M | ✅ | 59.4M | 🔴 **+21%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.6M | ✅ | 63.0M | +15% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ✅ | 62.8M | +9% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ✅ | 139.2M | 🔴 **+73%** |
| not.json | double negation | 1 | ✅ | 80.6M | ✅ | 101.4M | 🔴 **+26%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.9M | ✅ | 14.5M | 🟢 **-55%** |
| oneOf.json | oneOf | 4 | ✅ | 54.7M | ✅ | 75.3M | 🔴 **+38%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.9M | ✅ | 26.5M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 62.3M | +3% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 121.3M | 🔴 **+50%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 61.4M | +1% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 62.9M | +4% |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 28.3M | 🟢 **-33%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.2M | ✅ | 84.0M | 🔴 **+21%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ✅ | 13.7M | 🟢 **-70%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.5M | ✅ | 30.0M | 🟢 **-36%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.3M | ✅ | 85.0M | 🔴 **+23%** |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 69.1M | 🔴 **+33%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.5M | ✅ | 56.3M | 🔴 **+130%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 17.9M | 🟢 **-32%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ✅ | 14.5M | +3% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 13.5M | -11% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 18.3M | -10% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 12.8M | ✅ | 22.4M | 🔴 **+74%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 61.6M | ✅ | 58.7M | -5% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 60.1M | ✅ | 74.4M | 🔴 **+24%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 73.2M | ✅ | 67.9M | -7% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 73.4M | ✅ | 69.3M | -6% |
| properties.json | object properties validation | 6 | ✅ | 52.1M | ✅ | 52.3M | +0% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 11.4M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 52.3M | +13% |
| properties.json | properties with escaped characters | 2 | ✅ | 47.7M | ✅ | 22.6M | 🟢 **-53%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 58.1M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 28.3M | +3% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.5M | ✅ | 38.9M | +4% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 16.2M | -14% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 130.5M | 🔴 **+56%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.2M | ✅ | 25.0M | 🟢 **-47%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.0M | ✅ | 29.7M | 🟢 **-22%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.7M | ✅ | 33.4M | -18% |
| ref.json | root pointer ref | 4 | ✅ | 23.3M | ✅ | 14.7M | 🟢 **-37%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.9M | ✅ | 26.8M | 🟢 **-45%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.5M | ✅ | 24.4M | 🟢 **-55%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.5M | ✅ | 28.9M | 🟢 **-35%** |
| ref.json | nested refs | 2 | ✅ | 37.8M | ✅ | 11.2M | 🟢 **-70%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.6M | ✅ | 28.8M | 🟢 **-31%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.8M | ✅ | 47.6M | -2% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.6M | ✅ | 28.3M | 🟢 **-44%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.8M | ✅ | 117.0M | 🔴 **+45%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ✅ | 34.7M | 🟢 **-43%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 2.7M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 51.0M | ✅ | 27.3M | 🟢 **-46%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.6M | ✅ | 10.4M | 🟢 **-61%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 37.5M | 🟢 **-29%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ✅ | 10.2M | 🟢 **-69%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.3M | ✅ | 10.4M | 🟢 **-68%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.0M | ✅ | 42.5M | -10% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.7M | ✅ | 39.9M | -15% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.4M | ✅ | 40.3M | 🟢 **-40%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.7M | ✅ | 24.3M | 🟢 **-36%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ✅ | 24.3M | 🟢 **-38%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.8M | ✅ | 28.7M | 🟢 **-41%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.8M | ✅ | 27.2M | 🟢 **-44%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.7M | ✅ | 27.5M | 🟢 **-42%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.1M | ✅ | 27.5M | 🟢 **-40%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.4M | ✅ | 25.7M | 🟢 **-43%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ✅ | 27.6M | 🟢 **-40%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.0M | ✅ | 24.0M | 🟢 **-49%** |
| ref.json | ref to if | 2 | ✅ | 48.2M | ✅ | 38.1M | 🟢 **-21%** |
| ref.json | ref to then | 2 | ✅ | 48.5M | ✅ | 38.1M | 🟢 **-21%** |
| ref.json | ref to else | 2 | ✅ | 48.4M | ✅ | 38.1M | 🟢 **-21%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.9M | ✅ | 33.2M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.3M | ✅ | 33.3M | 🟢 **-52%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 35.0M | 🟢 **-50%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.6M | ✅ | 42.8M | 🟢 **-34%** |
| refRemote.json | remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 81.4M | 🔴 **+36%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 119.9M | 🔴 **+49%** |
| required.json | required with empty array | 1 | ✅ | 80.6M | ✅ | 121.5M | 🔴 **+51%** |
| required.json | required with escaped characters | 2 | ✅ | 43.0M | ✅ | 20.5M | 🟢 **-52%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.8M | ✅ | 34.3M | 🔴 **+28%** |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 63.6M | +6% |
| type.json | number type matches numbers | 9 | ✅ | 62.2M | ✅ | 68.4M | +10% |
| type.json | string type matches strings | 9 | ✅ | 61.8M | ✅ | 62.2M | +1% |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 57.0M | +4% |
| type.json | array type matches arrays | 7 | ✅ | 58.0M | ✅ | 59.0M | +2% |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 62.9M | +6% |
| type.json | null type matches only the null object | 10 | ✅ | 58.8M | ✅ | 59.0M | +0% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.9M | ✅ | 63.9M | +14% |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 83.8M | 🔴 **+20%** |
| type.json | type: array or object | 5 | ✅ | 60.4M | ✅ | 65.0M | +8% |
| type.json | type: array, object or null | 5 | ✅ | 69.8M | ✅ | 73.4M | +5% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.0M | ✅ | 129.7M | 🔴 **+73%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.6M | ✅ | 79.5M | 🔴 **+43%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ✅ | 51.7M | +7% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.7M | ✅ | 45.1M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.2M | ✅ | 47.0M | -10% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 71.7M | ✅ | 67.8M | -6% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.9M | ✅ | 26.4M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.6M | ✅ | 34.1M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.9M | ✅ | 12.1M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 68.3M | ✅ | 70.6M | +3% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.1M | ✅ | 70.6M | 🔴 **+252%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.0M | ✅ | 12.2M | +2% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.1M | ✅ | 22.9M | 🔴 **+51%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.3M | ✅ | 27.4M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ✅ | 11.2M | +1% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.9M | ✅ | 79.3M | 🔴 **+47%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 46.1M | ✅ | 34.9M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.0M | ✅ | 34.9M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.6M | ✅ | 57.8M | 🔴 **+33%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.3M | ✅ | 24.4M | +0% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.0M | ✅ | 12.4M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ✅ | 3.4M | 🟢 **-59%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ✅ | 6.0M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.6M | ✅ | 14.2M | 🟢 **-24%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 75.6M | ✅ | 131.0M | 🔴 **+73%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.9M | ✅ | 66.1M | -4% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.2M | ✅ | 16.3M | 🟢 **-23%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.7M | ✅ | 32.1M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.7M | ✅ | 130.3M | 🔴 **+147%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.1M | ✅ | 24.0M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.4M | ✅ | 24.5M | 🟢 **-26%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.3M | ✅ | 17.5M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ✅ | 15.0M | 🔴 **+34%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 83.5M | ✅ | 130.5M | 🔴 **+56%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.3M | ✅ | 15.5M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.7M | ✅ | 15.6M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.1M | ✅ | 11.1M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.9M | ✅ | 56.4M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.5M | ✅ | 57.0M | 🔴 **+107%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 12.8M | ✅ | 5.3M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.0M | ✅ | 7.8M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.1M | ✅ | 10.3M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.5M | ✅ | 8.9M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.8M | ✅ | 7.3M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ✅ | 6.3M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.5M | ✅ | 11.7M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.8M | ✅ | 19.1M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ✅ | 15.1M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.7M | ✅ | 15.3M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ✅ | 15.7M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.7M | ✅ | 15.9M | 🟢 **-44%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.7M | ✅ | 56.4M | 🔴 **+97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.5M | ✅ | 55.9M | 🔴 **+103%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.6M | ✅ | 13.4M | 🟢 **-43%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 19.2M | 🟢 **-27%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.6M | ✅ | 14.2M | 🟢 **-28%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ✅ | 18.2M | 🔴 **+54%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.2M | ✅ | 14.3M | 🟢 **-43%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.1M | ✅ | 21.1M | 🟢 **-32%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.1M | ✅ | 21.3M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.9M | ✅ | 9.5M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 9.1M | 🟢 **-54%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 2.9M | 🟢 **-58%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.8M | ✅ | 117.8M | 🔴 **+69%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.4M | ✅ | 50.6M | +2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.5M | ✅ | 21.0M | -18% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ✅ | 3.4M | 🟢 **-72%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.4M | ✅ | 11.8M | 🟢 **-42%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.7M | ✅ | 11.9M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 8.0M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.4M | ✅ | 23.5M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.5M | ✅ | 29.2M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.7M | ✅ | 126.2M | 🔴 **+62%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.9M | ✅ | 46.2M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 42.4M | 🟢 **-31%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 70.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 56.0M | ✅ | 23.6M | 🟢 **-58%** |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 112.1M | 🔴 **+41%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 121.4M | 🔴 **+52%** |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 57.7M | -2% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.9M | ✅ | 107.7M | 🔴 **+52%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 59.1M | +6% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 107.5M | 🔴 **+50%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 59.3M | +6% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 76.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 58.9M | ✅ | 69.7M | +18% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 84.9M | ✅ | 132.8M | 🔴 **+56%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 30.1M | -9% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.9M | ✅ | 38.4M | -16% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.7M | ✅ | 44.9M | -13% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.0M | ✅ | 53.3M | -7% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.9M | ✅ | 34.9M | -10% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ✅ | 2.6M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.2M | ✅ | 66.8M | 🔴 **+137%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 34.8M | 🔴 **+77%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 34.9M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 32.8M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 33.3M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 35.1M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 32.9M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.7M | ✅ | 34.9M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 36.8M | 🔴 **+46%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.3M | ✅ | 32.9M | +12% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 19.9M | +18% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 16.0M | +7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 15.9M | +7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.5M | ✅ | 32.2M | 🔴 **+26%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ✅ | 25.7M | 🔴 **+21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ✅ | 19.6M | -14% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 13.4M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 15.2M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.0M | +16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 10.9M | 🔴 **+30%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ✅ | 16.2M | 🟢 **-21%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ✅ | 9.3M | 🟢 **-63%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 7.9M | ✅ | 24.1M | 🔴 **+205%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.2M | ✅ | 11.9M | 🟢 **-70%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 48.3M | ✅ | 125K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ✅ | 34.7M | -17% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ✅ | 17.3M | 🔴 **+48%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ✅ | 34.9M | +12% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.8M | ✅ | 942K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.5M | ✅ | 41.6M | +5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.8M | 🟢 **-20%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.4M | ✅ | 18.8M | 🔴 **+23%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-27%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 14.9M | -2% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.0M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.4M | ✅ | 23.5M | 🟢 **-34%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 58.5M | ✅ | 61.2M | +5% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ✅ | 34.0M | +15% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 10.7M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.0M | ✅ | 28.4M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.2M | ✅ | 28.4M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.0M | ✅ | 27.0M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.3M | ✅ | 36.8M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.9M | ✅ | 27.0M | 🟢 **-46%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.7M | ✅ | 23.8M | 🔴 **+62%** |
