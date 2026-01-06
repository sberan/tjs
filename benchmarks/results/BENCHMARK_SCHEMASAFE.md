# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 184/199 | 21.9M | 184 | -17% |
| draft6 | 276 | ✅ 276 | 29.7M | 259/276 | 23.5M | 259 | 🟢 **-21%** |
| draft7 | 313 | ✅ 313 | 16.3M | 281/313 | 21.2M | 281 | 🔴 **+30%** |
| draft2019-09 | 435 | ✅ 435 | 17.5M | 399/435 | 19.0M | 399 | +8% |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 389/448 | 15.1M | 389 | 🟢 **-23%** |
| **Total** | 1671 | 1670/1671 | 19.8M | 1512/1671 | 19.2M | 1512 | -3% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.43x faster** (36 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.7M | ✅ | 28.7M | 🟢 **-53%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.1M | ✅ | 141.8M | -11% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.8M | ✅ | 85.1M | 🟢 **-36%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 146.3M | -15% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 126.1M | ✅ | 77.9M | 🟢 **-38%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ✅ | 35.4M | +2% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 68.4M | ✅ | 30.2M | 🟢 **-56%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 71.2M | 🔴 **+26%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.2M | ✅ | 141.2M | -8% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.8M | ✅ | 43.3M | -5% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.1M | ✅ | 23.8M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.2M | ✅ | 28.3M | -15% |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 48.1M | ✅ | 25.3M | 🟢 **-47%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.8M | ✅ | 141.8M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 17.0M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 46.7M | ✅ | 56.9M | 🔴 **+22%** |
| allOf.json | allOf | 4 | ✅ | 49.1M | ✅ | 36.9M | 🟢 **-25%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.0M | ✅ | 24.3M | +6% |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 79.1M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 141.9M | -11% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 141.9M | -11% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 64.5M | +16% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 78.4M | 🟢 **-32%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 78.7M | 🔴 **+37%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 51.2M | 🟢 **-39%** |
| anyOf.json | anyOf | 4 | ✅ | 60.0M | ✅ | 79.7M | 🔴 **+33%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ✅ | 22.9M | 🟢 **-55%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.1M | ✅ | 27.6M | 🟢 **-37%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.1M | ✅ | 146.1M | -15% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 76.2M | 🔴 **+32%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 81.9M | -19% |
| default.json | invalid string value for default | 2 | ✅ | 48.7M | ✅ | 52.4M | +8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.7M | ✅ | 53.3M | 🟢 **-32%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 92.4M | ✅ | 68.5M | 🟢 **-26%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 28.9M | ✅ | 30.4M | +5% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.7M | ✅ | 33.4M | 🟢 **-43%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.2M | ✅ | 12.5M | 🟢 **-31%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ✅ | 24.6M | 🟢 **-54%** |
| enum.json | simple enum validation | 2 | ✅ | 56.6M | ✅ | 76.3M | 🔴 **+35%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.4M | ✅ | 36.6M | 🟢 **-39%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.4M | ✅ | 88.5M | 🔴 **+49%** |
| enum.json | enums in properties | 6 | ✅ | 48.9M | ✅ | 35.1M | 🟢 **-28%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.5M | ✅ | 64.0M | 🔴 **+29%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.4M | ✅ | 60.5M | 🟢 **-45%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.1M | ✅ | 56.2M | +17% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 106.9M | ✅ | 62.4M | 🟢 **-42%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.9M | ✅ | 57.1M | +19% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.4M | ✅ | 90.1M | -20% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.6M | ✅ | 68.6M | 🔴 **+28%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 87.8M | 🟢 **-23%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ✅ | 70.7M | 🔴 **+32%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 68.4M | 🟢 **-23%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ✅ | 58.0M | 🔴 **+25%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 69.1M | 🟢 **-24%** |
| format.json | email format | 6 | ✅ | 74.0M | ✅ | 138.8M | 🔴 **+88%** |
| format.json | ipv4 format | 6 | ✅ | 163.3M | ✅ | 121.5M | 🟢 **-26%** |
| format.json | ipv6 format | 6 | ✅ | 79.2M | ✅ | 127.1M | 🔴 **+61%** |
| format.json | hostname format | 6 | ✅ | 163.7M | ✅ | 138.0M | -16% |
| format.json | date-time format | 6 | ✅ | 78.5M | ✅ | 135.9M | 🔴 **+73%** |
| format.json | uri format | 6 | ✅ | 163.6M | ✅ | 120.6M | 🟢 **-26%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 25.4M | 🟢 **-29%** |
| items.json | a schema given for items | 4 | ✅ | 89.0M | ✅ | 46.7M | 🟢 **-48%** |
| items.json | an array of schemas for items | 6 | ✅ | 59.4M | ✅ | 60.5M | +2% |
| items.json | items and subitems | 6 | ✅ | 35.3M | ✅ | 7.9M | 🟢 **-78%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 7.1M | 🟢 **-45%** |
| items.json | items with null instance elements | 1 | ✅ | 70.3M | ✅ | 71.1M | +1% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 78.0M | +4% |
| maxItems.json | maxItems validation | 4 | ✅ | 65.6M | ✅ | 84.1M | 🔴 **+28%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.6M | ✅ | 42.6M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.1M | ✅ | 64.6M | 🔴 **+32%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.2M | ✅ | 43.0M | +9% |
| maximum.json | maximum validation | 4 | ✅ | 61.5M | ✅ | 88.1M | 🔴 **+43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ✅ | 91.3M | 🔴 **+50%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.8M | ✅ | 85.7M | 🔴 **+39%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.4M | ✅ | 74.5M | 🔴 **+39%** |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ✅ | 84.1M | 🔴 **+28%** |
| minLength.json | minLength validation | 5 | ✅ | 47.6M | ✅ | 37.2M | 🟢 **-22%** |
| minProperties.json | minProperties validation | 6 | ✅ | 50.3M | ✅ | 69.0M | 🔴 **+37%** |
| minimum.json | minimum validation | 4 | ✅ | 61.9M | ✅ | 82.5M | 🔴 **+33%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 61.8M | ✅ | 84.5M | 🔴 **+37%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 53.0M | ✅ | 73.3M | 🔴 **+38%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 58.0M | ✅ | 86.8M | 🔴 **+50%** |
| multipleOf.json | by int | 3 | ✅ | 61.3M | ✅ | 92.7M | 🔴 **+51%** |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 34.8M | 🟢 **-38%** |
| multipleOf.json | by small number | 2 | ✅ | 51.5M | ✅ | 30.1M | 🟢 **-42%** |
| multipleOf.json | float division = inf | 1 | ✅ | 39.0M | ✅ | 1.2M | 🟢 **-97%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 34.7M | 🟢 **-45%** |
| not.json | not | 2 | ✅ | 55.9M | ✅ | 78.6M | 🔴 **+41%** |
| not.json | not multiple types | 3 | ✅ | 49.0M | ✅ | 59.7M | 🔴 **+22%** |
| not.json | not more complex schema | 3 | ✅ | 52.7M | ✅ | 40.5M | 🟢 **-23%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 57.4M | 🔴 **+36%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.9M | ✅ | 48.3M | +18% |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 140.0M | -12% |
| oneOf.json | oneOf | 4 | ✅ | 54.3M | ✅ | 64.0M | +18% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.5M | ✅ | 22.7M | 🟢 **-23%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.3M | ✅ | 24.5M | 🟢 **-34%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 78.8M | 🔴 **+43%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.3M | ✅ | 23.1M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.2M | ✅ | 27.7M | 🟢 **-31%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 78.5M | 🔴 **+41%** |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ✅ | 66.7M | 🔴 **+36%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 70.8M | 🔴 **+54%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.9M | ✅ | 18.4M | 🟢 **-26%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 14.5M | -1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.9M | ✅ | 13.7M | -1% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 23.5M | 🔴 **+35%** |
| properties.json | object properties validation | 6 | ✅ | 45.7M | ✅ | 51.5M | +13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 11.3M | 🟢 **-41%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.0M | ✅ | 23.9M | 🟢 **-40%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 56.3M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ✅ | 27.3M | +9% |
| ref.json | root pointer ref | 4 | ✅ | 22.0M | ✅ | 13.9M | 🟢 **-37%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.4M | ✅ | 29.5M | 🟢 **-31%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 26.1M | 🟢 **-44%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ✅ | 27.8M | 🟢 **-26%** |
| ref.json | nested refs | 2 | ✅ | 37.3M | ✅ | 12.3M | 🟢 **-67%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 45.3M | +10% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.7M | ✅ | 29.4M | 🟢 **-31%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.3M | ✅ | 2.7M | 🟢 **-74%** |
| ref.json | refs with quote | 2 | ✅ | 42.4M | ✅ | 30.2M | 🟢 **-29%** |
| ref.json | Location-independent identifier | 2 | ✅ | 56.3M | ✅ | 39.4M | 🟢 **-30%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.5M | ✅ | 40.3M | 🟢 **-25%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 43.0M | ✅ | 44.3M | +3% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.5M | ✅ | 36.3M | 🟢 **-32%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 37.9M | 🟢 **-32%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.8M | ✅ | 36.1M | 🟢 **-35%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.8M | ✅ | 39.4M | 🟢 **-29%** |
| refRemote.json | remote ref | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 53.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 77.1M | 🔴 **+45%** |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 141.5M | -11% |
| required.json | required with escaped characters | 2 | ✅ | 40.6M | ✅ | 22.2M | 🟢 **-45%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.4M | ✅ | 34.6M | 🔴 **+48%** |
| type.json | integer type matches integers | 8 | ✅ | 41.3M | ✅ | 47.3M | +14% |
| type.json | number type matches numbers | 9 | ✅ | 45.7M | ✅ | 58.8M | 🔴 **+29%** |
| type.json | string type matches strings | 9 | ✅ | 48.4M | ✅ | 59.5M | 🔴 **+23%** |
| type.json | object type matches objects | 7 | ✅ | 41.4M | ✅ | 49.8M | 🔴 **+20%** |
| type.json | array type matches arrays | 7 | ✅ | 44.5M | ✅ | 52.5M | +18% |
| type.json | boolean type matches booleans | 10 | ✅ | 44.0M | ✅ | 55.0M | 🔴 **+25%** |
| type.json | null type matches only the null object | 10 | ✅ | 42.8M | ✅ | 52.6M | 🔴 **+23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.1M | ✅ | 57.6M | 🔴 **+25%** |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 74.5M | 🔴 **+34%** |
| type.json | type: array or object | 5 | ✅ | 49.6M | ✅ | 59.0M | +19% |
| type.json | type: array, object or null | 5 | ✅ | 55.7M | ✅ | 69.4M | 🔴 **+25%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 7.3M | 🟢 **-56%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ✅ | 23.7M | -19% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 29.1M | 🔴 **+63%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 137.3M | -15% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.0M | ✅ | 52.4M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.8M | ✅ | 45.1M | 🟢 **-23%** |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ✅ | 131.5M | 🔴 **+81%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 134.2M | 🔴 **+77%** |
| optional/bignum.json | string | 1 | ✅ | 42.5M | ✅ | 51.3M | 🔴 **+21%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 115.7M | 🔴 **+65%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ✅ | 49.7M | 🔴 **+21%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ✅ | 118.8M | 🔴 **+69%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 48.3M | +18% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.6M | ✅ | 66.5M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.3M | ✅ | 32.4M | 🔴 **+77%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.5M | ✅ | 32.7M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.2M | ✅ | 31.6M | 🔴 **+74%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 31.0M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.5M | ✅ | 34.1M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 32.8M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 29.8M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 37.9M | 🔴 **+51%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 30.8M | 🔴 **+20%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.3M | ✅ | 20.5M | 🔴 **+34%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.0M | ✅ | 17.2M | 🔴 **+23%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 17.0M | +19% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.7M | ✅ | 30.5M | 🔴 **+23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ✅ | 26.9M | 🔴 **+31%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ✅ | 20.6M | -8% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 14.6M | 🟢 **-26%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 15.1M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 8.7M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 10.7M | 🔴 **+24%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ✅ | 12.5M | 🟢 **-37%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.3M | ✅ | 9.0M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 13.9M | 🟢 **-22%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.3M | ✅ | 32.2M | -9% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ✅ | 20.5M | 🔴 **+28%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 5.3M | -16% |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.7M | ✅ | 21.4M | 🟢 **-40%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.9M | ✅ | 31.7M | 🔴 **+22%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ✅ | 11.0M | 🟢 **-28%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.1M | ✅ | 7.5M | 🟢 **-87%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.6M | ✅ | 16.0M | 🟢 **-61%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.3M | ✅ | 124.7M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.0M | ✅ | 91.3M | +19% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 167.7M | ✅ | 135.2M | -19% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 69.3M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 35.9M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.6M | ✅ | 28.6M | 🟢 **-24%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 79.0M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.6M | ✅ | 125.3M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.3M | ✅ | 45.8M | 🟢 **-32%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 23.5M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.3M | ✅ | 25.8M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ✅ | 25.2M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 17.1M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 51.7M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 40.1M | +15% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 25.2M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ✅ | 82.7M | 🔴 **+62%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 125.5M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 64.9M | 🔴 **+30%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.5M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 157.4M | ✅ | 125.4M | 🟢 **-20%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 125.1M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 88.4M | 🔴 **+42%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 87.2M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 87.7M | 🔴 **+35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 59.1M | 🟢 **-29%** |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ✅ | 90.1M | 🔴 **+35%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.7M | ✅ | 27.4M | 🟢 **-40%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 125.0M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 157.7M | ✅ | 124.9M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 64.7M | 🔴 **+30%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 30.8M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 166.8M | ✅ | 135.5M | -19% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ✅ | 87.8M | 🟢 **-27%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.6M | ✅ | 137.1M | 🟢 **-24%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 63.0M | 🟢 **-31%** |
| const.json | const validation | 3 | ✅ | 54.9M | ✅ | 69.8M | 🔴 **+27%** |
| const.json | const with object | 4 | ✅ | 37.9M | ✅ | 32.7M | -14% |
| const.json | const with array | 3 | ✅ | 25.1M | ✅ | 9.1M | 🟢 **-64%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 88.0M | 🟢 **-25%** |
| const.json | const with false does not match 0 | 3 | ✅ | 53.3M | ✅ | 74.1M | 🔴 **+39%** |
| const.json | const with true does not match 1 | 3 | ✅ | 54.7M | ✅ | 76.6M | 🔴 **+40%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 62.3M | +15% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 68.2M | 🟢 **-29%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 47.5M | ✅ | 32.7M | 🟢 **-31%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ✅ | 33.7M | 🟢 **-64%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 51.6M | ✅ | 65.8M | 🔴 **+28%** |
| const.json | const with 1 does not match true | 3 | ✅ | 57.9M | ✅ | 64.1M | +11% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ✅ | 66.0M | +19% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.0M | ✅ | 72.2M | 🟢 **-34%** |
| const.json | nul characters in strings | 2 | ✅ | 53.8M | ✅ | 73.7M | 🔴 **+37%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 66.8M | -14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 75.6M | 🔴 **+34%** |
| contains.json | contains keyword validation | 6 | ✅ | 90.1M | ✅ | 20.0M | 🟢 **-78%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ✅ | 14.7M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 72.6M | 🟢 **-30%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.6M | ✅ | 42.4M | 🟢 **-26%** |
| contains.json | items + contains | 4 | ✅ | 59.5M | ✅ | 11.2M | 🟢 **-81%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 37.5M | 🟢 **-54%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 74.7M | 🟢 **-26%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 47.9M | -9% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.0M | ✅ | 48.3M | 🟢 **-38%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 50.4M | ✅ | 72.4M | 🔴 **+44%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 171.5M | ✅ | 137.8M | -20% |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ✅ | 31.3M | 🟢 **-22%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ✅ | 35.2M | -13% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 82.5M | ✅ | 54.7M | 🟢 **-34%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ✅ | 15.8M | -15% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 26.6M | ✅ | 13.7M | 🟢 **-49%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 86.1M | 🔴 **+35%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 38.2M | 🟢 **-38%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 61.2M | ✅ | 88.1M | 🔴 **+44%** |
| enum.json | enums in properties | 6 | ✅ | 54.1M | ✅ | 40.0M | 🟢 **-26%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.7M | ✅ | 96.2M | 🔴 **+61%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ✅ | 76.5M | 🟢 **-30%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ✅ | 68.7M | 🔴 **+32%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.5M | ✅ | 73.8M | 🟢 **-31%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.1M | ✅ | 65.2M | 🔴 **+38%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.5M | ✅ | 85.4M | 🟢 **-25%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.4M | ✅ | 77.9M | 🔴 **+38%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 113.8M | ✅ | 91.9M | -19% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ✅ | 80.7M | 🔴 **+44%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 74.2M | -16% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ✅ | 43.5M | 🟢 **-21%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.5M | ✅ | 69.9M | 🟢 **-38%** |
| format.json | email format | 6 | ✅ | 81.0M | ✅ | 114.8M | 🔴 **+42%** |
| format.json | ipv4 format | 6 | ✅ | 147.6M | ✅ | 117.8M | 🟢 **-20%** |
| format.json | ipv6 format | 6 | ✅ | 85.2M | ✅ | 120.6M | 🔴 **+42%** |
| format.json | hostname format | 6 | ✅ | 156.4M | ✅ | 115.5M | 🟢 **-26%** |
| format.json | date-time format | 6 | ✅ | 81.2M | ✅ | 118.2M | 🔴 **+46%** |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ✅ | 82.0M | 🟢 **-48%** |
| format.json | uri format | 6 | ✅ | 88.5M | ✅ | 132.3M | 🔴 **+49%** |
| format.json | uri-reference format | 6 | ✅ | 157.0M | ✅ | 121.9M | 🟢 **-22%** |
| format.json | uri-template format | 6 | ✅ | 88.6M | ✅ | 62.0M | 🟢 **-30%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 20.5M | 🟢 **-64%** |
| items.json | a schema given for items | 4 | ✅ | 60.5M | ✅ | 42.9M | 🟢 **-29%** |
| items.json | an array of schemas for items | 6 | ✅ | 106.9M | ✅ | 57.7M | 🟢 **-46%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 167.5M | ✅ | 135.0M | -19% |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 66.6M | 🟢 **-36%** |
| items.json | items with boolean schemas | 3 | ✅ | 61.9M | ✅ | 78.8M | 🔴 **+27%** |
| items.json | items and subitems | 6 | ✅ | 35.3M | ✅ | 7.8M | 🟢 **-78%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 6.8M | 🟢 **-49%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 65.3M | -15% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 100.4M | 🔴 **+36%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 83.6M | 🔴 **+32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.6M | ✅ | 44.4M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.5M | ✅ | 48.7M | -5% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.8M | ✅ | 68.2M | 🔴 **+27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 47.8M | +15% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.8M | ✅ | 50.5M | +15% |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 100.5M | 🔴 **+46%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 94.9M | 🔴 **+44%** |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ✅ | 100.2M | 🔴 **+36%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 83.4M | 🔴 **+31%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 34.8M | 🟢 **-34%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 43.9M | -16% |
| minProperties.json | minProperties validation | 6 | ✅ | 54.2M | ✅ | 69.3M | 🔴 **+28%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ✅ | 49.1M | +17% |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 99.9M | 🔴 **+45%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.0M | ✅ | 87.2M | 🔴 **+34%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 94.5M | 🔴 **+37%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 59.5M | -7% |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 27.1M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.0M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 85.2M | 🔴 **+35%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 73.2M | 🔴 **+30%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 47.7M | -18% |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 54.8M | +19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 62.6M | 🔴 **+27%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ✅ | 63.5M | 🔴 **+29%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.4M | ✅ | 137.8M | -20% |
| not.json | double negation | 1 | ✅ | 158.6M | ✅ | 125.4M | 🟢 **-21%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 76.5M | 🔴 **+50%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.4M | ✅ | 25.7M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 64.7M | 🔴 **+30%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.7M | ✅ | 125.2M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 64.5M | 🔴 **+29%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 64.9M | 🔴 **+30%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 29.4M | 🟢 **-27%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 86.5M | 🔴 **+40%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.9M | ✅ | 26.8M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.5M | ✅ | 33.1M | 🟢 **-20%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 87.3M | 🔴 **+40%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ✅ | 71.3M | 🔴 **+36%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 60.5M | 🔴 **+26%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 17.2M | 🟢 **-33%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 14.6M | +1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 13.3M | 🟢 **-22%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 18.1M | -8% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 22.8M | 🔴 **+29%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 54.3M | +9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 11.5M | 🟢 **-43%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ✅ | 58.5M | 🔴 **+37%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 23.2M | 🟢 **-48%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 59.2M | -9% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ✅ | 29.5M | +13% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.0M | ✅ | 41.5M | -8% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 15.9M | 🟢 **-20%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 166.9M | ✅ | 126.6M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ✅ | 24.4M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.1M | ✅ | 30.4M | 🟢 **-26%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 33.5M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 14.2M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 29.0M | 🟢 **-37%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 23.9M | 🟢 **-53%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 29.4M | 🟢 **-27%** |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 11.7M | 🟢 **-76%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 49.3M | +6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.6M | ✅ | 29.2M | 🟢 **-37%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 121.2M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 33.3M | 🟢 **-33%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 2.7M | 🟢 **-70%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 29.3M | 🟢 **-37%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.9M | ✅ | 43.9M | -14% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.6M | ✅ | 43.8M | 🟢 **-26%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 58.5M | ✅ | 43.5M | 🟢 **-26%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 37.8M | 🟢 **-20%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.7M | ✅ | 10.6M | 🟢 **-71%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.1M | ✅ | 10.6M | 🟢 **-69%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 25.6M | 🟢 **-24%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 29.1M | 🟢 **-38%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 29.0M | 🟢 **-38%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 29.1M | 🟢 **-38%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 27.6M | 🟢 **-41%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.2M | ✅ | 42.7M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.1M | ✅ | 43.9M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 43.5M | 🟢 **-30%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.3M | ✅ | 44.1M | 🟢 **-20%** |
| refRemote.json | remote ref | 2 | ✅ | 53.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 82.9M | 🔴 **+43%** |
| required.json | required default validation | 1 | ✅ | 158.1M | ✅ | 125.6M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 158.6M | ✅ | 125.3M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 44.6M | ✅ | 23.8M | 🟢 **-47%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 35.8M | 🔴 **+42%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 63.3M | 🔴 **+20%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 70.9M | 🔴 **+28%** |
| type.json | string type matches strings | 9 | ✅ | 54.4M | ✅ | 73.9M | 🔴 **+36%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 60.7M | 🔴 **+31%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 58.3M | +13% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 60.9M | +18% |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 60.0M | 🔴 **+23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.0M | ✅ | 69.4M | 🔴 **+36%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 87.1M | 🔴 **+40%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 66.9M | 🔴 **+23%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 73.3M | +18% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 8.0M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 24.1M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 29.8M | 🔴 **+63%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.4M | ✅ | 130.6M | -18% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 47.3M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ✅ | 40.8M | 🟢 **-36%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 122.0M | 🔴 **+53%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 126.7M | 🔴 **+51%** |
| optional/bignum.json | string | 1 | ✅ | 47.5M | ✅ | 62.8M | 🔴 **+32%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 111.3M | 🔴 **+45%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 60.3M | 🔴 **+33%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 110.4M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 59.9M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 71.6M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.9M | ✅ | 34.2M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 36.1M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 35.7M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 34.0M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 36.0M | 🔴 **+46%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 36.5M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.3M | ✅ | 36.1M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 38.2M | 🔴 **+46%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 33.3M | 🔴 **+20%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ✅ | 20.1M | 🔴 **+23%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 15.4M | +6% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 15.5M | +8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.9M | ✅ | 33.2M | 🔴 **+28%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ✅ | 27.6M | 🔴 **+41%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ✅ | 19.9M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ✅ | 13.7M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 14.8M | 🟢 **-23%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 9.3M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 10.2M | +14% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ✅ | 15.9M | 🟢 **-20%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ✅ | 9.5M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ✅ | 13.5M | 🟢 **-26%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ✅ | 35.4M | -8% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 17.9M | +8% |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ✅ | 36.0M | +19% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.8M | -20% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ✅ | 19.1M | +19% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-22%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ✅ | 23.7M | 🟢 **-41%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.3M | ✅ | 32.6M | 🟢 **-25%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 42.9M | ✅ | 32.7M | 🟢 **-24%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.7M | ✅ | 35.0M | 🔴 **+31%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ✅ | 10.9M | 🟢 **-37%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ✅ | 25.4M | -9% |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 64.5M | ✅ | 28.1M | 🟢 **-56%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.3M | ✅ | 26.5M | 🟢 **-39%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.5M | ✅ | 123.8M | 🟢 **-29%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.4M | ✅ | 90.3M | +17% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 191.0M | ✅ | 133.0M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 85.4M | ✅ | 69.3M | -19% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 62.9M | ✅ | 35.9M | 🟢 **-43%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.0M | ✅ | 28.2M | 🟢 **-31%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.0M | ✅ | 75.7M | 🟢 **-32%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.8M | ✅ | 123.6M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 69.5M | ✅ | 43.5M | 🟢 **-37%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.1M | ✅ | 22.4M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.1M | ✅ | 27.8M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.4M | ✅ | 24.0M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.5M | ✅ | 121.1M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.3M | ✅ | 17.0M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 70.4M | ✅ | 51.7M | 🟢 **-27%** |
| allOf.json | allOf | 4 | ✅ | 35.4M | ✅ | 36.6M | +3% |
| allOf.json | allOf with base schema | 5 | ✅ | 32.1M | ✅ | 25.2M | 🟢 **-22%** |
| allOf.json | allOf simple types | 2 | ✅ | 62.4M | ✅ | 85.3M | 🔴 **+37%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ✅ | 123.9M | 🟢 **-29%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 51.6M | ✅ | 45.4M | -12% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 95.0M | ✅ | 64.6M | 🟢 **-32%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 123.4M | 🟢 **-29%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.6M | ✅ | 122.9M | 🟢 **-30%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 65.6M | ✅ | 87.2M | 🔴 **+33%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 123.4M | ✅ | 83.4M | 🟢 **-32%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.0M | ✅ | 86.4M | 🔴 **+29%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ✅ | 55.9M | 🟢 **-33%** |
| anyOf.json | anyOf | 4 | ✅ | 61.6M | ✅ | 86.0M | 🔴 **+40%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 26.9M | 🟢 **-48%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.7M | ✅ | 124.1M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 165.3M | ✅ | 120.7M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 51.5M | ✅ | 64.7M | 🔴 **+26%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 88.2M | ✅ | 29.2M | 🟢 **-67%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 146.5M | ✅ | 88.7M | 🟢 **-39%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 123.6M | ✅ | 86.5M | 🟢 **-30%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 151.5M | ✅ | 123.1M | -19% |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.7M | ✅ | 17.8M | 🟢 **-80%** |
| const.json | const validation | 3 | ✅ | 55.9M | ✅ | 39.3M | 🟢 **-30%** |
| const.json | const with object | 4 | ✅ | 53.6M | ✅ | 31.8M | 🟢 **-41%** |
| const.json | const with array | 3 | ✅ | 46.6M | ✅ | 8.5M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 123.9M | ✅ | 46.9M | 🟢 **-62%** |
| const.json | const with false does not match 0 | 3 | ✅ | 59.2M | ✅ | 72.3M | 🔴 **+22%** |
| const.json | const with true does not match 1 | 3 | ✅ | 106.9M | ✅ | 72.7M | 🟢 **-32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.9M | ✅ | 68.4M | 🔴 **+34%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 92.7M | ✅ | 60.6M | 🟢 **-35%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.5M | ✅ | 33.7M | 🟢 **-32%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ✅ | 33.6M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.2M | ✅ | 65.2M | 🔴 **+25%** |
| const.json | const with 1 does not match true | 3 | ✅ | 94.2M | ✅ | 90.0M | -4% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 56.7M | ✅ | 68.3M | 🔴 **+20%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ✅ | 80.0M | 🟢 **-29%** |
| const.json | nul characters in strings | 2 | ✅ | 55.5M | ✅ | 73.6M | 🔴 **+33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.5M | ✅ | 60.2M | 🟢 **-30%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 57.4M | ✅ | 76.1M | 🔴 **+32%** |
| contains.json | contains keyword validation | 6 | ✅ | 104.3M | ✅ | 19.3M | 🟢 **-82%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.6M | ✅ | 14.7M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 113.4M | ✅ | 73.1M | 🟢 **-36%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 50.4M | ✅ | 40.6M | -20% |
| contains.json | items + contains | 4 | ✅ | 59.2M | ✅ | 17.8M | 🟢 **-70%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.6M | ✅ | 72.4M | 🔴 **+22%** |
| contains.json | contains with null instance elements | 1 | ✅ | 133.3M | ✅ | 38.0M | 🟢 **-71%** |
| default.json | invalid type for default | 2 | ✅ | 66.9M | ✅ | 75.4M | +13% |
| default.json | invalid string value for default | 2 | ✅ | 71.1M | ✅ | 45.6M | 🟢 **-36%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.1M | ✅ | 52.9M | +12% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.2M | ✅ | 72.2M | 🔴 **+24%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.1M | ✅ | 130.0M | 🟢 **-34%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.3M | ✅ | 31.7M | +1% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.4M | ✅ | 34.7M | -14% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 49.4M | ✅ | 55.1M | +11% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 16.9M | -4% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.2M | ✅ | 23.0M | 🟢 **-38%** |
| enum.json | simple enum validation | 2 | ✅ | 64.3M | ✅ | 85.8M | 🔴 **+33%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.5M | ✅ | 38.9M | -9% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.1M | ✅ | 88.8M | 🔴 **+48%** |
| enum.json | enums in properties | 6 | ✅ | 37.2M | ✅ | 40.9M | +10% |
| enum.json | enum with escaped characters | 3 | ✅ | 68.6M | ✅ | 95.9M | 🔴 **+40%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 57.2M | ✅ | 76.3M | 🔴 **+33%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.5M | ✅ | 69.4M | 🔴 **+25%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.6M | ✅ | 76.0M | 🔴 **+25%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ✅ | 71.1M | 🔴 **+28%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 69.4M | ✅ | 88.8M | 🔴 **+28%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.7M | ✅ | 81.9M | 🔴 **+29%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 69.2M | ✅ | 90.5M | 🔴 **+31%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.4M | ✅ | 78.7M | 🔴 **+26%** |
| enum.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 74.1M | 🔴 **+40%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.1M | ✅ | 79.5M | 🔴 **+32%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 60.0M | ✅ | 77.7M | 🔴 **+29%** |
| format.json | email format | 6 | ✅ | 87.7M | ✅ | 131.2M | 🔴 **+50%** |
| format.json | idn-email format | 6 | ✅ | 93.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 93.7M | ✅ | 117.2M | 🔴 **+25%** |
| format.json | ipv4 format | 6 | ✅ | 93.6M | ✅ | 123.5M | 🔴 **+32%** |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 129.8M | 🔴 **+40%** |
| format.json | idn-hostname format | 6 | ✅ | 91.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 93.6M | ✅ | 109.4M | +17% |
| format.json | date format | 6 | ✅ | 93.8M | ✅ | 131.6M | 🔴 **+40%** |
| format.json | date-time format | 6 | ✅ | 93.0M | ✅ | 120.8M | 🔴 **+30%** |
| format.json | time format | 6 | ✅ | 90.7M | ✅ | 130.0M | 🔴 **+43%** |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ✅ | 127.4M | 🔴 **+38%** |
| format.json | relative-json-pointer format | 6 | ✅ | 84.9M | ✅ | 118.6M | 🔴 **+40%** |
| format.json | iri format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 83.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 93.0M | ✅ | 130.6M | 🔴 **+40%** |
| format.json | uri-reference format | 6 | ✅ | 93.4M | ✅ | 121.5M | 🔴 **+30%** |
| format.json | uri-template format | 6 | ✅ | 80.3M | ✅ | 129.4M | 🔴 **+61%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 190.4M | ✅ | 133.0M | 🟢 **-30%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 189.0M | ✅ | 132.7M | 🟢 **-30%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 188.0M | ✅ | 132.8M | 🟢 **-29%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.0M | ✅ | 89.3M | 🔴 **+28%** |
| if-then-else.json | if and else without then | 3 | ✅ | 71.3M | ✅ | 95.1M | 🔴 **+33%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 62.8M | ✅ | 79.6M | 🔴 **+27%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 191.1M | ✅ | 121.4M | 🟢 **-36%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 65.6M | ✅ | 84.6M | 🔴 **+29%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.9M | ✅ | 80.5M | 🔴 **+26%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.3M | ✅ | 37.3M | -18% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.9M | ✅ | 25.1M | 🟢 **-32%** |
| items.json | a schema given for items | 4 | ✅ | 59.6M | ✅ | 43.9M | 🟢 **-26%** |
| items.json | an array of schemas for items | 6 | ✅ | 63.0M | ✅ | 59.0M | -6% |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.6M | ✅ | 131.7M | -20% |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 66.4M | +7% |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ✅ | 76.2M | 🔴 **+23%** |
| items.json | items and subitems | 6 | ✅ | 28.6M | ✅ | 8.1M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 6.7M | 🟢 **-50%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 79.7M | ✅ | 64.9M | -19% |
| items.json | array-form items with null instance e... | 1 | ✅ | 85.2M | ✅ | 69.3M | -19% |
| maxItems.json | maxItems validation | 4 | ✅ | 75.7M | ✅ | 97.5M | 🔴 **+29%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 60.4M | ✅ | 83.3M | 🔴 **+38%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 41.1M | 🟢 **-29%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ✅ | 51.5M | -4% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.5M | ✅ | 67.7M | 🔴 **+29%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.2M | ✅ | 47.6M | +16% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.7M | ✅ | 51.0M | +19% |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 95.5M | 🔴 **+38%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 70.7M | ✅ | 99.4M | 🔴 **+41%** |
| minItems.json | minItems validation | 4 | ✅ | 75.7M | ✅ | 93.3M | 🔴 **+23%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 64.5M | ✅ | 83.1M | 🔴 **+29%** |
| minLength.json | minLength validation | 5 | ✅ | 56.6M | ✅ | 36.7M | 🟢 **-35%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.3M | ✅ | 42.8M | 🟢 **-21%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.3M | ✅ | 68.9M | 🔴 **+22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 49.5M | +18% |
| minimum.json | minimum validation | 4 | ✅ | 69.3M | ✅ | 99.3M | 🔴 **+43%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 89.5M | 🔴 **+38%** |
| multipleOf.json | by int | 3 | ✅ | 68.9M | ✅ | 94.8M | 🔴 **+38%** |
| multipleOf.json | by number | 3 | ✅ | 64.5M | ✅ | 59.7M | -8% |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 27.2M | 🟢 **-52%** |
| multipleOf.json | float division = inf | 1 | ✅ | 42.6M | ✅ | 1.0M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.6M | ✅ | 17.2M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 64.8M | ✅ | 85.3M | 🔴 **+32%** |
| not.json | not multiple types | 3 | ✅ | 58.4M | ✅ | 72.7M | 🔴 **+24%** |
| not.json | not more complex schema | 3 | ✅ | 60.3M | ✅ | 50.0M | -17% |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 59.6M | 🔴 **+25%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.7M | ✅ | 62.6M | 🔴 **+40%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.5M | ✅ | 62.6M | 🔴 **+41%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 200.6M | ✅ | 137.0M | 🟢 **-32%** |
| not.json | double negation | 1 | ✅ | 174.8M | ✅ | 91.2M | 🟢 **-48%** |
| oneOf.json | oneOf | 4 | ✅ | 60.6M | ✅ | 70.3M | +16% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.3M | ✅ | 27.3M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 51.0M | ✅ | 65.0M | 🔴 **+27%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 174.6M | ✅ | 123.5M | 🟢 **-29%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 51.2M | ✅ | 64.8M | 🔴 **+27%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 50.8M | ✅ | 65.0M | 🔴 **+28%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 29.5M | 🟢 **-29%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.9M | ✅ | 85.9M | 🔴 **+36%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ✅ | 26.9M | 🟢 **-34%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ✅ | 33.0M | 🟢 **-28%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 64.4M | ✅ | 86.7M | 🔴 **+35%** |
| pattern.json | pattern validation | 8 | ✅ | 51.5M | ✅ | 72.2M | 🔴 **+40%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 53.0M | ✅ | 60.5M | +14% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 15.9M | 🟢 **-39%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ✅ | 14.1M | -9% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ✅ | 13.3M | 🟢 **-23%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.8M | ✅ | 17.1M | 🟢 **-22%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.4M | ✅ | 22.5M | +16% |
| properties.json | object properties validation | 6 | ✅ | 47.0M | ✅ | 53.7M | +14% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 11.8M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.3M | ✅ | 58.4M | 🔴 **+35%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.2M | ✅ | 22.4M | 🟢 **-50%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.4M | ✅ | 60.3M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 29.2M | +7% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.8M | ✅ | 40.3M | -10% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 16.4M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 187.7M | ✅ | 132.5M | 🟢 **-29%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.5M | ✅ | 22.4M | 🟢 **-48%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 43.6M | ✅ | 28.9M | 🟢 **-34%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.0M | ✅ | 32.7M | 🟢 **-26%** |
| ref.json | root pointer ref | 4 | ✅ | 24.9M | ✅ | 13.4M | 🟢 **-46%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.8M | ✅ | 28.3M | 🟢 **-38%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.0M | ✅ | 24.8M | 🟢 **-53%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.4M | ✅ | 29.2M | 🟢 **-29%** |
| ref.json | nested refs | 2 | ✅ | 36.9M | ✅ | 10.7M | 🟢 **-71%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.1M | ✅ | 45.4M | -1% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ✅ | 28.2M | 🟢 **-39%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 140.4M | ✅ | 119.8M | -15% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 48.4M | ✅ | 33.1M | 🟢 **-32%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 2.8M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 47.4M | ✅ | 28.1M | 🟢 **-41%** |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ✅ | 39.3M | -14% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 46.5M | ✅ | 42.7M | -8% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.1M | ✅ | 43.3M | -6% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 48.3M | ✅ | 38.3M | 🟢 **-21%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.6M | ✅ | 10.3M | 🟢 **-70%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.2M | ✅ | 10.0M | 🟢 **-72%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.3M | ✅ | 42.3M | -9% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.6M | ✅ | 25.5M | 🟢 **-24%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.8M | ✅ | 28.9M | 🟢 **-37%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.9M | ✅ | 28.9M | 🟢 **-37%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 29.0M | 🟢 **-35%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ✅ | 28.5M | 🟢 **-39%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.8M | ✅ | 27.9M | 🟢 **-36%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.4M | ✅ | 28.9M | 🟢 **-25%** |
| ref.json | ref to if | 2 | ✅ | 45.3M | ✅ | 39.7M | -12% |
| ref.json | ref to then | 2 | ✅ | 43.8M | ✅ | 42.8M | -2% |
| ref.json | ref to else | 2 | ✅ | 45.1M | ✅ | 40.5M | -10% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.7M | ✅ | 42.7M | -2% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.4M | ✅ | 43.3M | 🟢 **-33%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 65.1M | ✅ | 43.5M | 🟢 **-33%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 65.1M | ✅ | 43.1M | 🟢 **-34%** |
| refRemote.json | remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 77.4M | 🔴 **+29%** |
| required.json | required default validation | 1 | ✅ | 175.1M | ✅ | 123.7M | 🟢 **-29%** |
| required.json | required with empty array | 1 | ✅ | 173.5M | ✅ | 123.7M | 🟢 **-29%** |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ✅ | 23.2M | 🟢 **-37%** |
| required.json | required properties whose names are J... | 7 | ✅ | 22.7M | ✅ | 35.8M | 🔴 **+58%** |
| type.json | integer type matches integers | 9 | ✅ | 51.9M | ✅ | 65.0M | 🔴 **+25%** |
| type.json | number type matches numbers | 9 | ✅ | 54.8M | ✅ | 70.2M | 🔴 **+28%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 72.8M | 🔴 **+32%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 60.1M | 🔴 **+30%** |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 57.8M | 🔴 **+20%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 59.7M | +16% |
| type.json | null type matches only the null object | 10 | ✅ | 47.5M | ✅ | 60.4M | 🔴 **+27%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 49.5M | ✅ | 71.0M | 🔴 **+43%** |
| type.json | type as array with one item | 2 | ✅ | 65.7M | ✅ | 80.5M | 🔴 **+23%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 66.1M | 🔴 **+21%** |
| type.json | type: array, object or null | 5 | ✅ | 62.4M | ✅ | 79.9M | 🔴 **+28%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 8.1M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 24.2M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 29.7M | 🔴 **+58%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 164.8M | ✅ | 126.3M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ✅ | 46.9M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 60.6M | ✅ | 39.2M | 🟢 **-35%** |
| optional/bignum.json | integer | 2 | ✅ | 86.6M | ✅ | 119.5M | 🔴 **+38%** |
| optional/bignum.json | number | 2 | ✅ | 90.3M | ✅ | 125.8M | 🔴 **+39%** |
| optional/bignum.json | string | 1 | ✅ | 48.3M | ✅ | 55.6M | +15% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 81.0M | ✅ | 109.6M | 🔴 **+35%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 46.4M | ✅ | 60.6M | 🔴 **+30%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 81.1M | ✅ | 111.0M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 46.6M | ✅ | 60.0M | 🔴 **+29%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 334K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 395K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 54.2M | ✅ | 68.6M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.6M | ✅ | 36.1M | 🔴 **+93%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 36.1M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 33.6M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 34.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 36.0M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.8M | ✅ | 36.5M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 36.1M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 38.0M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.3M | ✅ | 33.1M | +17% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ✅ | 19.3M | +12% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ✅ | 16.5M | +3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 15.3M | -2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 32.8M | 🔴 **+23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ✅ | 28.0M | 🔴 **+32%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ✅ | 20.9M | -15% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 21.3M | ✅ | 13.6M | 🟢 **-36%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 15.5M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 8.5M | +1% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ✅ | 11.1M | 🔴 **+23%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.3M | ✅ | 15.9M | 🔴 **+41%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ✅ | 9.6M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.8M | ✅ | 24.8M | -4% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ✅ | 14.4M | 🟢 **-22%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.3M | ✅ | 35.4M | +6% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.8M | ✅ | 18.1M | +7% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.7M | ✅ | 36.2M | 🔴 **+22%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.5M | ✅ | 921K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.1M | ✅ | 43.0M | 🔴 **+30%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ✅ | 7.8M | 🟢 **-23%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ✅ | 18.7M | +7% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ✅ | 4.8M | 🟢 **-31%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.5M | ✅ | 24.0M | 🟢 **-32%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 54.4M | ✅ | 37.5M | 🟢 **-31%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 51.8M | ✅ | 31.2M | 🟢 **-40%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.9M | ✅ | 34.8M | 🔴 **+25%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ✅ | 10.5M | 🟢 **-40%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 21.0M | ✅ | 25.9M | 🔴 **+24%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 21.4M | ✅ | 7.5M | 🟢 **-65%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 28.3M | ✅ | 26.6M | -6% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 155.3M | ✅ | 121.1M | 🟢 **-22%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.2M | ✅ | 85.9M | 🔴 **+36%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.5M | ✅ | 133.1M | -19% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 74.9M | ✅ | 69.3M | -7% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 35.9M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.6M | ✅ | 28.5M | -13% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 78.8M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 155.0M | ✅ | 124.4M | -20% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.5M | ✅ | 31.7M | 🟢 **-49%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.3M | ✅ | 24.5M | -13% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.5M | ✅ | 28.2M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 28.2M | ✅ | 25.2M | -11% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 155.0M | ✅ | 123.8M | 🟢 **-20%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 19.9M | ✅ | 17.5M | -12% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 51.7M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.8M | ✅ | 12.9M | 🟢 **-53%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 25.6M | ✅ | 17.9M | 🟢 **-30%** |
| allOf.json | allOf | 4 | ✅ | 31.7M | ✅ | 39.7M | 🔴 **+25%** |
| allOf.json | allOf with base schema | 5 | ✅ | 38.5M | ✅ | 25.5M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 54.3M | ✅ | 86.1M | 🔴 **+58%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 155.3M | ✅ | 123.8M | 🟢 **-20%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 43.6M | ✅ | 65.1M | 🔴 **+49%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.9M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 155.1M | ✅ | 113.4M | 🟢 **-27%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 124.8M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 84.0M | 🔴 **+51%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.4M | ✅ | 88.6M | 🟢 **-23%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 72.2M | 🔴 **+25%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ✅ | 60.0M | 🟢 **-28%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ✅ | 38.9M | 🟢 **-31%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.6M | ✅ | 38.4M | 🟢 **-66%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 36.6M | ✅ | 39.0M | +7% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.7M | ✅ | 38.7M | 🟢 **-31%** |
| anyOf.json | anyOf | 4 | ✅ | 59.2M | ✅ | 92.2M | 🔴 **+56%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.3M | ✅ | 27.9M | -11% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 154.4M | ✅ | 124.3M | -19% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.1M | ✅ | 124.3M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 65.0M | 🔴 **+47%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.0M | ✅ | 31.1M | 🟢 **-28%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.9M | ✅ | 134.6M | -18% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.5M | ✅ | 87.3M | 🔴 **+52%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.0M | ✅ | 126.3M | 🟢 **-31%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 41.2M | ✅ | 63.3M | 🔴 **+54%** |
| const.json | const validation | 3 | ✅ | 49.1M | ✅ | 70.7M | 🔴 **+44%** |
| const.json | const with object | 4 | ✅ | 31.5M | ✅ | 32.5M | +3% |
| const.json | const with array | 3 | ✅ | 37.0M | ✅ | 5.4M | 🟢 **-85%** |
| const.json | const with null | 2 | ✅ | 57.6M | ✅ | 87.2M | 🔴 **+51%** |
| const.json | const with false does not match 0 | 3 | ✅ | 51.7M | ✅ | 74.7M | 🔴 **+44%** |
| const.json | const with true does not match 1 | 3 | ✅ | 51.4M | ✅ | 70.2M | 🔴 **+36%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 48.1M | ✅ | 71.0M | 🔴 **+48%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.1M | ✅ | 68.8M | 🔴 **+43%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 40.8M | ✅ | 33.7M | -17% |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 40.5M | ✅ | 31.8M | 🟢 **-21%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 47.3M | ✅ | 66.2M | 🔴 **+40%** |
| const.json | const with 1 does not match true | 3 | ✅ | 60.0M | ✅ | 91.7M | 🔴 **+53%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.3M | ✅ | 69.6M | 🔴 **+41%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 50.8M | ✅ | 81.0M | 🔴 **+60%** |
| const.json | nul characters in strings | 2 | ✅ | 45.3M | ✅ | 74.7M | 🔴 **+65%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.5M | ✅ | 67.2M | 🔴 **+51%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 47.0M | ✅ | 75.9M | 🔴 **+61%** |
| contains.json | contains keyword validation | 6 | ✅ | 51.4M | ✅ | 20.1M | 🟢 **-61%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.5M | ✅ | 14.9M | 🟢 **-68%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ✅ | 73.3M | 🔴 **+34%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 38.8M | ✅ | 43.2M | +11% |
| contains.json | items + contains | 4 | ✅ | 18.2M | ✅ | 18.0M | -1% |
| contains.json | contains with false if subschema | 2 | ✅ | 53.5M | ✅ | 73.3M | 🔴 **+37%** |
| contains.json | contains with null instance elements | 1 | ✅ | 73.4M | ✅ | 38.4M | 🟢 **-48%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.1M | ✅ | 137.1M | 🟢 **-22%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.0M | ✅ | 132.7M | 🟢 **-24%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.3M | ✅ | 138.3M | 🟢 **-22%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 159.8M | ✅ | 137.4M | -14% |
| default.json | invalid type for default | 2 | ✅ | 61.2M | ✅ | 75.6M | 🔴 **+23%** |
| default.json | invalid string value for default | 2 | ✅ | 47.0M | ✅ | 48.3M | +3% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 27.3M | ✅ | 56.1M | 🔴 **+106%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.6M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 53.5M | ✅ | 72.6M | 🔴 **+36%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.3M | ✅ | 136.7M | 🟢 **-22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 17.9M | ✅ | 31.6M | 🔴 **+76%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ✅ | 40.2M | +5% |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.1M | ✅ | 48.3M | +9% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 41.5M | ✅ | 55.0M | 🔴 **+33%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 33.7M | ✅ | 36.0M | +7% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 30.2M | ✅ | 24.2M | 🟢 **-20%** |
| enum.json | simple enum validation | 2 | ✅ | 47.7M | ✅ | 83.7M | 🔴 **+75%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 34.8M | ✅ | 38.9M | +12% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 51.2M | ✅ | 87.2M | 🔴 **+70%** |
| enum.json | enums in properties | 6 | ✅ | 33.7M | ✅ | 41.2M | 🔴 **+22%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.8M | ✅ | 96.7M | 🔴 **+194%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 47.0M | ✅ | 77.0M | 🔴 **+64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 43.7M | ✅ | 68.8M | 🔴 **+58%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 51.4M | ✅ | 70.7M | 🔴 **+38%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ✅ | 68.8M | 🔴 **+45%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.6M | ✅ | 88.8M | 🔴 **+51%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ✅ | 78.2M | 🔴 **+46%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.8M | ✅ | 90.6M | 🔴 **+54%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.1M | ✅ | 80.5M | 🔴 **+52%** |
| enum.json | nul characters in strings | 2 | ✅ | 47.6M | ✅ | 74.3M | 🔴 **+56%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.9M | ✅ | 79.7M | 🔴 **+66%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 48.1M | ✅ | 79.1M | 🔴 **+65%** |
| format.json | email format | 6 | ✅ | 182.0M | ✅ | 132.0M | 🟢 **-27%** |
| format.json | idn-email format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 162.2M | ✅ | 118.4M | 🟢 **-27%** |
| format.json | ipv4 format | 6 | ✅ | 174.1M | ✅ | 123.9M | 🟢 **-29%** |
| format.json | ipv6 format | 6 | ✅ | 182.4M | ✅ | 118.5M | 🟢 **-35%** |
| format.json | idn-hostname format | 6 | ✅ | 174.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 171.6M | ✅ | 132.0M | 🟢 **-23%** |
| format.json | date format | 6 | ✅ | 174.2M | ✅ | 108.3M | 🟢 **-38%** |
| format.json | date-time format | 6 | ✅ | 182.5M | ✅ | 128.9M | 🟢 **-29%** |
| format.json | time format | 6 | ✅ | 181.3M | ✅ | 94.2M | 🟢 **-48%** |
| format.json | json-pointer format | 6 | ✅ | 182.6M | ✅ | 131.3M | 🟢 **-28%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.7M | ✅ | 132.4M | 🟢 **-28%** |
| format.json | iri format | 6 | ✅ | 179.0M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 181.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 174.3M | ✅ | 111.6M | 🟢 **-36%** |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ✅ | 132.2M | 🟢 **-28%** |
| format.json | uri-template format | 6 | ✅ | 182.3M | ✅ | 106.3M | 🟢 **-42%** |
| format.json | uuid format | 6 | ✅ | 182.0M | ✅ | 120.3M | 🟢 **-34%** |
| format.json | duration format | 6 | ✅ | 182.6M | ✅ | 118.7M | 🟢 **-35%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 160.5M | ✅ | 134.8M | -16% |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ✅ | 133.8M | 🟢 **-22%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 132.4M | 🟢 **-23%** |
| if-then-else.json | if and then without else | 3 | ✅ | 62.4M | ✅ | 90.2M | 🔴 **+45%** |
| if-then-else.json | if and else without then | 3 | ✅ | 60.0M | ✅ | 95.2M | 🔴 **+59%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 53.7M | ✅ | 78.3M | 🔴 **+46%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.0M | ✅ | 127.3M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.4M | ✅ | 80.5M | 🔴 **+40%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.1M | ✅ | 80.3M | 🔴 **+41%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ✅ | 37.4M | -12% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.6M | ✅ | 22.4M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 42.6M | ✅ | 43.9M | +3% |
| items.json | an array of schemas for items | 6 | ✅ | 58.7M | ✅ | 57.1M | -3% |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.5M | ✅ | 134.3M | -18% |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.1M | ✅ | 66.6M | 🔴 **+21%** |
| items.json | items with boolean schemas | 3 | ✅ | 53.9M | ✅ | 75.0M | 🔴 **+39%** |
| items.json | items and subitems | 6 | ✅ | 24.3M | ✅ | 8.1M | 🟢 **-67%** |
| items.json | nested items | 3 | ✅ | 10.2M | ✅ | 6.8M | 🟢 **-33%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ✅ | 66.4M | -5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 69.3M | -8% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 133.0M | 🟢 **-22%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 43.0M | ✅ | 24.6M | 🟢 **-43%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 50.5M | ✅ | 24.6M | 🟢 **-51%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 44.5M | ✅ | 20.8M | 🟢 **-53%** |
| maxItems.json | maxItems validation | 4 | ✅ | 65.7M | ✅ | 87.1M | 🔴 **+33%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 83.2M | 🔴 **+48%** |
| maxLength.json | maxLength validation | 5 | ✅ | 52.9M | ✅ | 23.4M | 🟢 **-56%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.0M | ✅ | 49.5M | +5% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 40.3M | ✅ | 68.8M | 🔴 **+71%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 29.0M | ✅ | 47.7M | 🔴 **+64%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.0M | ✅ | 48.9M | 🔴 **+96%** |
| maximum.json | maximum validation | 4 | ✅ | 61.9M | ✅ | 95.3M | 🔴 **+54%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ✅ | 101.2M | 🔴 **+66%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 133.2M | 🟢 **-22%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 51.3M | ✅ | 29.2M | 🟢 **-43%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 46.7M | ✅ | 23.3M | 🟢 **-50%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 50.9M | ✅ | 24.8M | 🟢 **-51%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 40.2M | ✅ | 23.3M | 🟢 **-42%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 36.3M | ✅ | 21.2M | 🟢 **-42%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.7M | ✅ | 51.0M | 🟢 **-70%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 56.1M | ✅ | 29.7M | 🟢 **-47%** |
| minItems.json | minItems validation | 4 | ✅ | 46.7M | ✅ | 95.6M | 🔴 **+104%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.4M | ✅ | 80.5M | 🔴 **+43%** |
| minLength.json | minLength validation | 5 | ✅ | 45.9M | ✅ | 37.1M | -19% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 47.2M | ✅ | 40.8M | -14% |
| minProperties.json | minProperties validation | 6 | ✅ | 36.3M | ✅ | 69.1M | 🔴 **+91%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 29.9M | ✅ | 22.8M | 🟢 **-24%** |
| minimum.json | minimum validation | 4 | ✅ | 61.7M | ✅ | 86.9M | 🔴 **+41%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 56.9M | ✅ | 49.7M | -13% |
| multipleOf.json | by int | 3 | ✅ | 61.6M | ✅ | 73.5M | +19% |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 31.0M | 🟢 **-45%** |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ✅ | 26.8M | 🟢 **-48%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 947K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.4M | ✅ | 16.6M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 56.2M | ✅ | 81.1M | 🔴 **+44%** |
| not.json | not multiple types | 3 | ✅ | 49.9M | ✅ | 68.6M | 🔴 **+38%** |
| not.json | not more complex schema | 3 | ✅ | 52.8M | ✅ | 47.9M | -9% |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 58.4M | 🔴 **+38%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.2M | ✅ | 46.0M | +12% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.0M | ✅ | 62.1M | 🔴 **+51%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.6M | ✅ | 124.4M | 🟢 **-30%** |
| not.json | double negation | 1 | ✅ | 157.8M | ✅ | 124.4M | 🟢 **-21%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 22.7M | ✅ | 12.4M | 🟢 **-45%** |
| oneOf.json | oneOf | 4 | ✅ | 45.9M | ✅ | 71.4M | 🔴 **+56%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.7M | ✅ | 26.7M | -10% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 43.7M | ✅ | 50.9M | +16% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 120.6M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.3M | ✅ | 63.1M | 🔴 **+43%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 34.4M | 🟢 **-22%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.0M | ✅ | 27.6M | 🟢 **-23%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 78.3M | 🔴 **+42%** |
| oneOf.json | oneOf with required | 4 | ✅ | 36.8M | ✅ | 26.5M | 🟢 **-28%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 32.5M | -15% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 40.0M | 🟢 **-28%** |
| pattern.json | pattern validation | 8 | ✅ | 41.9M | ✅ | 70.7M | 🔴 **+69%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 34.9M | ✅ | 56.3M | 🔴 **+61%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.6M | ✅ | 17.4M | 🟢 **-26%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 11.9M | ✅ | 15.0M | 🔴 **+26%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ✅ | 12.2M | -17% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.7M | ✅ | 18.1M | -3% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.9M | ✅ | 22.7M | 🔴 **+52%** |
| properties.json | object properties validation | 6 | ✅ | 45.2M | ✅ | 52.8M | +17% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.0M | ✅ | 11.7M | 🟢 **-31%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.6M | ✅ | 53.4M | 🔴 **+38%** |
| properties.json | properties with escaped characters | 2 | ✅ | 40.8M | ✅ | 24.2M | 🟢 **-41%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 58.1M | -3% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ✅ | 28.7M | +16% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ✅ | 40.7M | 0% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 16.0M | ✅ | 16.3M | +2% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.5M | ✅ | 130.2M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 28.9M | ✅ | 24.9M | -14% |
| propertyNames.json | propertyNames with const | 3 | ✅ | 33.9M | ✅ | 29.7M | -12% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.9M | ✅ | 33.3M | -7% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 10.7M | ✅ | 12.5M | +17% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 4.8M | ✅ | 10.9M | 🔴 **+125%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 10.4M | 🔴 **+291%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 9.8M | ✅ | 11.1M | +14% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.5M | ✅ | 10.6M | +12% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 6.2M | ✅ | 14.7M | 🔴 **+138%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 5.6M | ✅ | 14.6M | 🔴 **+163%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.4M | ✅ | 4.2M | 🔴 **+26%** |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 3.4M | ✅ | 4.5M | 🔴 **+33%** |
| ref.json | root pointer ref | 4 | ✅ | 20.4M | ✅ | 13.4M | 🟢 **-34%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 28.9M | 🟢 **-29%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 24.4M | 🟢 **-47%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.1M | ✅ | 28.9M | 🟢 **-22%** |
| ref.json | nested refs | 2 | ✅ | 30.2M | ✅ | 11.5M | 🟢 **-62%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.1M | ✅ | 26.1M | 🟢 **-23%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 47.4M | +15% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 28.8M | 🟢 **-32%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ✅ | 119.1M | 🟢 **-25%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.3M | ✅ | 34.9M | 🟢 **-21%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 6.8M | ✅ | 2.4M | 🟢 **-64%** |
| ref.json | refs with quote | 2 | ✅ | 42.7M | ✅ | 28.9M | 🟢 **-32%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 19.2M | ✅ | 10.4M | 🟢 **-46%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 38.3M | ✅ | 38.2M | 0% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.1M | ✅ | 10.1M | 🟢 **-64%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.3M | ✅ | 10.2M | 🟢 **-64%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 38.6M | ✅ | 43.4M | +12% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 37.2M | ✅ | 42.0M | +13% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 52.4M | ✅ | 42.0M | -20% |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 30.5M | ✅ | 23.8M | 🟢 **-22%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 29.4M | ✅ | 24.6M | -16% |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.8M | ✅ | 28.8M | 🟢 **-33%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.7M | ✅ | 28.7M | 🟢 **-33%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.8M | ✅ | 27.8M | 🟢 **-35%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 27.7M | 🟢 **-35%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ✅ | 27.8M | 🟢 **-34%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.6M | ✅ | 27.7M | 🟢 **-35%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 38.4M | ✅ | 25.1M | 🟢 **-35%** |
| ref.json | ref to if | 2 | ✅ | 39.5M | ✅ | 38.6M | -2% |
| ref.json | ref to then | 2 | ✅ | 39.4M | ✅ | 38.8M | -2% |
| ref.json | ref to else | 2 | ✅ | 38.3M | ✅ | 39.2M | +2% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 38.3M | ✅ | 36.1M | -6% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 33.8M | 🟢 **-39%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 36.3M | 🟢 **-35%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.7M | ✅ | 42.7M | 🟢 **-23%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 3.6M | ✅ | 18.4M | 🔴 **+409%** |
| refRemote.json | remote ref | 2 | ✅ | 37.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 25.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 24.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 26.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 26.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 25.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 37.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.8M | ✅ | 77.8M | 🔴 **+47%** |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 120.6M | 🟢 **-24%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 120.6M | 🟢 **-24%** |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ✅ | 23.5M | 🟢 **-39%** |
| required.json | required properties whose names are J... | 7 | ✅ | 15.2M | ✅ | 35.4M | 🔴 **+134%** |
| type.json | integer type matches integers | 9 | ✅ | 42.7M | ✅ | 64.1M | 🔴 **+50%** |
| type.json | number type matches numbers | 9 | ✅ | 45.1M | ✅ | 68.8M | 🔴 **+52%** |
| type.json | string type matches strings | 9 | ✅ | 47.3M | ✅ | 66.8M | 🔴 **+41%** |
| type.json | object type matches objects | 7 | ✅ | 39.9M | ✅ | 57.2M | 🔴 **+43%** |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ✅ | 59.7M | 🔴 **+33%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.2M | ✅ | 63.5M | 🔴 **+47%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ✅ | 60.3M | 🔴 **+40%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.8M | ✅ | 61.3M | +14% |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 84.1M | 🔴 **+51%** |
| type.json | type: array or object | 5 | ✅ | 48.3M | ✅ | 62.0M | 🔴 **+28%** |
| type.json | type: array, object or null | 5 | ✅ | 54.2M | ✅ | 80.3M | 🔴 **+48%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.4M | ✅ | 129.4M | 🔴 **+72%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.0M | ✅ | 80.0M | 🔴 **+67%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 39.7M | ✅ | 53.9M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.0M | ✅ | 45.1M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.7M | ✅ | 51.6M | +13% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 72.5M | ✅ | 65.0M | -10% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 31.9M | ✅ | 29.1M | -9% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 28.9M | ✅ | 27.5M | -5% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 43.5M | ✅ | 37.1M | -15% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 19.0M | ✅ | 14.3M | 🟢 **-25%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 75.8M | ✅ | 70.6M | -7% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 17.4M | ✅ | 70.0M | 🔴 **+303%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ✅ | 15.8M | 🔴 **+39%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.6M | ✅ | 23.9M | 🔴 **+76%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ✅ | 26.3M | -18% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.5M | ✅ | 14.1M | 🔴 **+34%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 48.2M | ✅ | 79.1M | 🔴 **+64%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.7M | ✅ | 35.0M | -20% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ✅ | 34.6M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.4M | ✅ | 58.2M | 🔴 **+64%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ✅ | 27.8M | +19% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 76.2M | ✅ | 128.3M | 🔴 **+68%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ✅ | 66.4M | -6% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.6M | ✅ | 18.0M | +3% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 44.7M | ✅ | 32.3M | 🟢 **-28%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.4M | ✅ | 98.8M | 🔴 **+92%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ✅ | 24.2M | 🟢 **-20%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 28.2M | ✅ | 24.7M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 25.9M | ✅ | 20.5M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.0M | ✅ | 15.6M | 🔴 **+20%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 60.3M | ✅ | 58.0M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 24.7M | ✅ | 17.5M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.5M | ✅ | 13.0M | +4% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.3M | ✅ | 58.0M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.7M | ✅ | 56.0M | 🔴 **+102%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.3M | ✅ | 6.0M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ✅ | 9.5M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 17.9M | ✅ | 12.0M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.0M | ✅ | 7.3M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.6M | ✅ | 10.2M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.2M | ✅ | 6.8M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 21.6M | ✅ | 12.6M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.5M | ✅ | 22.4M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 25.3M | ✅ | 16.0M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 25.4M | ✅ | 15.9M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.9M | ✅ | 16.7M | -16% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.4M | ✅ | 15.4M | 🟢 **-21%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 56.9M | 🔴 **+101%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 23.1M | ✅ | 58.0M | 🔴 **+151%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 18.5M | ✅ | 14.6M | 🟢 **-21%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.3M | ✅ | 19.4M | -16% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 15.4M | ✅ | 14.6M | -5% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.2M | ✅ | 20.3M | 🔴 **+81%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.6M | ✅ | 15.5M | 🟢 **-37%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 23.5M | ✅ | 21.3M | -9% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.9M | ✅ | 21.5M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.2M | ✅ | 10.0M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.8M | ✅ | 9.4M | 🟢 **-47%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 2.9M | 🟢 **-59%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.3M | ✅ | 117.3M | 🔴 **+74%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.7M | ✅ | 50.9M | +9% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.1M | ✅ | 21.5M | -11% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ✅ | 3.8M | 🟢 **-69%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 17.9M | ✅ | 13.1M | 🟢 **-27%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 17.8M | ✅ | 11.9M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 8.2M | 🟢 **-49%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.7M | ✅ | 24.2M | -18% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 13.3M | ✅ | 29.3M | 🔴 **+120%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 125.7M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ✅ | 46.3M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.5M | ✅ | 41.2M | 🟢 **-30%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 43.3M | ✅ | 17.1M | 🟢 **-60%** |
| optional/bignum.json | integer | 2 | ✅ | 72.6M | ✅ | 112.0M | 🔴 **+54%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 120.7M | 🔴 **+59%** |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 61.3M | 🔴 **+44%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 106.3M | 🔴 **+51%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ✅ | 59.2M | 🔴 **+45%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 107.6M | 🔴 **+53%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 59.7M | 🔴 **+46%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 14.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.2M | ✅ | 70.0M | 🔴 **+29%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.9M | ✅ | 132.7M | 🟢 **-25%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.9M | ✅ | 30.7M | +6% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ✅ | 39.4M | +3% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.2M | ✅ | 47.0M | +6% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.5M | ✅ | 56.2M | 🔴 **+29%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.6M | ✅ | 34.9M | +1% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 46.8M | ✅ | 68.7M | 🔴 **+47%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 13.4M | ✅ | 32.9M | 🔴 **+146%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 15.5M | ✅ | 34.8M | 🔴 **+125%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 16.2M | ✅ | 34.9M | 🔴 **+116%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 15.2M | ✅ | 33.2M | 🔴 **+119%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 15.1M | ✅ | 33.7M | 🔴 **+123%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.2M | ✅ | 35.5M | 🔴 **+119%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 15.8M | ✅ | 32.9M | 🔴 **+108%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 15.3M | ✅ | 36.1M | 🔴 **+136%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 15.7M | ✅ | 32.9M | 🔴 **+110%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 20.2M | +18% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.5M | ✅ | 16.2M | 🔴 **+29%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.0M | ✅ | 15.8M | 🔴 **+22%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 15.5M | ✅ | 32.4M | 🔴 **+109%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 14.8M | ✅ | 26.5M | 🔴 **+79%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.0M | ✅ | 20.0M | -5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.3M | ✅ | 12.4M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ✅ | 13.9M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.6M | +7% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 11.2M | 🔴 **+33%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ✅ | 16.4M | +2% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.5M | ✅ | 9.3M | 🟢 **-59%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 22.2M | ✅ | 24.9M | +12% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.8M | ✅ | 13.1M | 🟢 **-64%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ✅ | 14.2M | 🟢 **-20%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 27.6M | ✅ | 34.9M | 🔴 **+26%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ✅ | 17.2M | +8% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 23.0M | ✅ | 34.8M | 🔴 **+51%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.0M | ✅ | 930K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 23.2M | ✅ | 41.8M | 🔴 **+80%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.0M | ✅ | 7.8M | -14% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ✅ | 18.7M | +9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.6M | ✅ | 4.8M | -14% |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.1M | ✅ | 15.6M | +11% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 26.1M | ✅ | 25.3M | -3% |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.3M | ✅ | 61.3M | +13% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 16.5M | ✅ | 34.1M | 🔴 **+107%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ✅ | 11.2M | 🟢 **-29%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.5M | ✅ | 28.7M | 🟢 **-33%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ✅ | 28.8M | 🟢 **-32%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.4M | ✅ | 28.0M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.7M | ✅ | 37.1M | 🟢 **-33%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.3M | ✅ | 27.2M | 🟢 **-36%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ✅ | 24.6M | 🔴 **+82%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.5M | ✅ | 54.4M | +2% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.2M | ✅ | 13.3M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.1M | ✅ | 28.1M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 25.2M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 125.3M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.0M | ✅ | 15.9M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 51.5M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.5M | ✅ | 13.1M | 🟢 **-50%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 33.5M | ✅ | 15.8M | 🟢 **-53%** |
| allOf.json | allOf | 4 | ✅ | 32.3M | ✅ | 30.0M | -7% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 25.4M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ✅ | 85.6M | 🔴 **+49%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 122.3M | 🟢 **-23%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.9M | ✅ | 64.8M | 🔴 **+38%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.3M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 125.1M | 🟢 **-21%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 124.7M | 🟢 **-22%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 46.6M | 🟢 **-21%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 84.5M | 🟢 **-27%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 47.0M | ✅ | 65.0M | 🔴 **+39%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.9M | ✅ | 59.1M | 🟢 **-25%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 59.4M | ✅ | 20.4M | 🟢 **-66%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 18.1M | 🟢 **-84%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 56.4M | ✅ | 35.7M | 🟢 **-37%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 58.8M | ✅ | 35.5M | 🟢 **-40%** |
| anyOf.json | anyOf | 4 | ✅ | 63.3M | ✅ | 78.8M | 🔴 **+25%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.8M | ✅ | 27.7M | -10% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 157.2M | ✅ | 125.1M | 🟢 **-20%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 125.5M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 65.0M | 🔴 **+38%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 42.8M | ✅ | 31.0M | 🟢 **-28%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 135.2M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 87.4M | 🔴 **+43%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.4M | ✅ | 138.6M | 🟢 **-23%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 42.6M | ✅ | 18.0M | 🟢 **-58%** |
| const.json | const validation | 3 | ✅ | 49.7M | ✅ | 69.1M | 🔴 **+39%** |
| const.json | const with object | 4 | ✅ | 33.5M | ✅ | 32.4M | -3% |
| const.json | const with array | 3 | ✅ | 41.4M | ✅ | 8.8M | 🟢 **-79%** |
| const.json | const with null | 2 | ✅ | 61.0M | ✅ | 87.4M | 🔴 **+43%** |
| const.json | const with false does not match 0 | 3 | ✅ | 50.2M | ✅ | 73.1M | 🔴 **+46%** |
| const.json | const with true does not match 1 | 3 | ✅ | 54.6M | ✅ | 77.3M | 🔴 **+42%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.8M | ✅ | 68.4M | 🔴 **+34%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 36.2M | ✅ | 70.1M | 🔴 **+94%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 43.2M | ✅ | 33.7M | 🟢 **-22%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 42.5M | ✅ | 33.9M | 🟢 **-20%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.0M | ✅ | 64.9M | 🔴 **+30%** |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ✅ | 81.2M | 🔴 **+35%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 51.4M | ✅ | 68.7M | 🔴 **+34%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 57.4M | ✅ | 81.1M | 🔴 **+41%** |
| const.json | nul characters in strings | 2 | ✅ | 52.4M | ✅ | 72.3M | 🔴 **+38%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.6M | ✅ | 67.2M | 🔴 **+44%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ✅ | 76.0M | 🔴 **+42%** |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ✅ | 20.3M | 🟢 **-63%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ✅ | 14.7M | 🟢 **-73%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 50.3M | ✅ | 73.2M | 🔴 **+46%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 48.2M | ✅ | 42.8M | -11% |
| contains.json | items + contains | 4 | ✅ | 37.1M | ✅ | 17.6M | 🟢 **-53%** |
| contains.json | contains with false if subschema | 2 | ✅ | 28.7M | ✅ | 73.2M | 🔴 **+155%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 38.1M | 🟢 **-50%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 174.5M | ✅ | 138.1M | 🟢 **-21%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 137.3M | 🟢 **-22%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.8M | ✅ | 135.9M | 🟢 **-24%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.3M | ✅ | 118.5M | 🟢 **-32%** |
| default.json | invalid type for default | 2 | ✅ | 64.7M | ✅ | 73.2M | +13% |
| default.json | invalid string value for default | 2 | ✅ | 46.7M | ✅ | 36.9M | 🟢 **-21%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 41.2M | ✅ | 57.1M | 🔴 **+39%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.0M | ✅ | 71.5M | 🔴 **+33%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 136.9M | 🟢 **-22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.7M | ✅ | 31.7M | 🔴 **+28%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 37.9M | ✅ | 40.1M | +6% |
| dependentSchemas.json | single dependency | 8 | ✅ | 43.7M | ✅ | 47.7M | +9% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 24.0M | ✅ | 55.3M | 🔴 **+131%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.7M | ✅ | 36.0M | -2% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.2M | ✅ | 26.9M | 🟢 **-21%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ✅ | 4.3M | 🟢 **-67%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.2M | ✅ | 19.8M | -7% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.8M | ✅ | 21.6M | 🔴 **+29%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ✅ | 2.5M | 🟢 **-78%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.7M | ✅ | 4.9M | 🟢 **-64%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.9M | ✅ | 2.8M | 🟢 **-74%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ✅ | 6.4M | -20% |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.3M | ✅ | 18.8M | +8% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.3M | ✅ | 8.6M | 🟢 **-30%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.0M | ✅ | 1.5M | 🟢 **-81%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.7M | ✅ | 13.3M | -10% |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ✅ | 2.2M | 🟢 **-63%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ✅ | 1.5M | 🟢 **-77%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.6M | ✅ | 28.4M | +3% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ✅ | 2.8M | 🟢 **-67%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 57.6M | ✅ | 86.0M | 🔴 **+49%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.2M | ✅ | 38.8M | -1% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.9M | ✅ | 89.3M | 🔴 **+42%** |
| enum.json | enums in properties | 6 | ✅ | 34.7M | ✅ | 40.6M | +17% |
| enum.json | enum with escaped characters | 3 | ✅ | 67.2M | ✅ | 97.3M | 🔴 **+45%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.3M | ✅ | 70.8M | 🔴 **+28%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.0M | ✅ | 68.5M | 🔴 **+34%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 54.7M | ✅ | 70.1M | 🔴 **+28%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.9M | ✅ | 52.4M | +3% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.8M | ✅ | 88.8M | 🔴 **+44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ✅ | 79.9M | 🔴 **+42%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 61.7M | ✅ | 90.2M | 🔴 **+46%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ✅ | 79.4M | 🔴 **+42%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 72.2M | 🔴 **+37%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 56.0M | ✅ | 79.9M | 🔴 **+43%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.3M | ✅ | 79.5M | 🔴 **+41%** |
| format.json | email format | 7 | ✅ | 182.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 175.2M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 181.7M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 182.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 184.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 175.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 179.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 182.8M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 183.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 183.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.1M | ✅ | 135.1M | 🟢 **-21%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.3M | ✅ | 135.7M | 🟢 **-21%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 134.8M | 🟢 **-21%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.2M | ✅ | 94.8M | 🔴 **+43%** |
| if-then-else.json | if and else without then | 3 | ✅ | 65.5M | ✅ | 94.7M | 🔴 **+45%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.0M | ✅ | 72.8M | 🔴 **+28%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 128.0M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 60.9M | ✅ | 85.2M | 🔴 **+40%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ✅ | 79.0M | 🔴 **+31%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.5M | ✅ | 36.9M | -7% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.3M | ✅ | 25.0M | 🟢 **-33%** |
| items.json | a schema given for items | 4 | ✅ | 51.5M | ✅ | 44.0M | -15% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ✅ | 135.2M | 🟢 **-21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 58.6M | ✅ | 78.3M | 🔴 **+34%** |
| items.json | items and subitems | 6 | ✅ | 27.3M | ✅ | 7.9M | 🟢 **-71%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 6.8M | 🟢 **-46%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.0M | ✅ | 101.7M | 🔴 **+41%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.3M | ✅ | 33.6M | 🟢 **-24%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.3M | ✅ | 30.3M | 🟢 **-32%** |
| items.json | items with heterogeneous array | 2 | ✅ | 60.0M | ✅ | 78.7M | 🔴 **+31%** |
| items.json | items with null instance elements | 1 | ✅ | 73.6M | ✅ | 66.4M | -10% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ✅ | 134.4M | 🟢 **-21%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 48.0M | ✅ | 23.6M | 🟢 **-51%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.8M | ✅ | 24.7M | 🟢 **-55%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 48.2M | ✅ | 20.6M | 🟢 **-57%** |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ✅ | 100.4M | 🔴 **+44%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 58.8M | ✅ | 83.4M | 🔴 **+42%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ✅ | 39.7M | 🟢 **-26%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.3M | ✅ | 51.5M | +4% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 47.8M | ✅ | 67.4M | 🔴 **+41%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ✅ | 49.4M | 🔴 **+24%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.0M | ✅ | 50.4M | 🔴 **+23%** |
| maximum.json | maximum validation | 4 | ✅ | 65.3M | ✅ | 100.9M | 🔴 **+54%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.2M | ✅ | 102.4M | 🔴 **+60%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.5M | ✅ | 135.3M | 🟢 **-21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 54.8M | ✅ | 29.5M | 🟢 **-46%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 50.9M | ✅ | 23.5M | 🟢 **-54%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 55.2M | ✅ | 25.3M | 🟢 **-54%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 43.9M | ✅ | 24.9M | 🟢 **-43%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 40.5M | ✅ | 23.6M | 🟢 **-42%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.3M | ✅ | 54.3M | 🟢 **-68%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 60.5M | ✅ | 31.5M | 🟢 **-48%** |
| minItems.json | minItems validation | 4 | ✅ | 69.6M | ✅ | 98.9M | 🔴 **+42%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 53.2M | ✅ | 82.0M | 🔴 **+54%** |
| minLength.json | minLength validation | 5 | ✅ | 49.6M | ✅ | 34.2M | 🟢 **-31%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ✅ | 49.5M | -1% |
| minProperties.json | minProperties validation | 6 | ✅ | 50.8M | ✅ | 65.5M | 🔴 **+29%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.7M | ✅ | 49.2M | 🔴 **+21%** |
| minimum.json | minimum validation | 4 | ✅ | 65.4M | ✅ | 100.1M | 🔴 **+53%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 59.9M | ✅ | 87.1M | 🔴 **+45%** |
| multipleOf.json | by int | 3 | ✅ | 65.3M | ✅ | 94.7M | 🔴 **+45%** |
| multipleOf.json | by number | 3 | ✅ | 59.0M | ✅ | 59.6M | +1% |
| multipleOf.json | by small number | 2 | ✅ | 46.3M | ✅ | 27.1M | 🟢 **-41%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 1.1M | 🟢 **-97%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 17.2M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 85.5M | 🔴 **+44%** |
| not.json | not multiple types | 3 | ✅ | 52.9M | ✅ | 75.3M | 🔴 **+42%** |
| not.json | not more complex schema | 3 | ✅ | 55.3M | ✅ | 50.2M | -9% |
| not.json | forbidden property | 2 | ✅ | 43.6M | ✅ | 57.9M | 🔴 **+33%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.0M | ✅ | 62.6M | 🔴 **+46%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.6M | ✅ | 62.1M | 🔴 **+46%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.5M | ✅ | 122.4M | 🟢 **-31%** |
| not.json | double negation | 1 | ✅ | 157.4M | ✅ | 101.0M | 🟢 **-36%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.8M | ✅ | 14.3M | 🟢 **-52%** |
| oneOf.json | oneOf | 4 | ✅ | 47.6M | ✅ | 71.2M | 🔴 **+49%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.4M | ✅ | 27.4M | -10% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 50.7M | +8% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 121.5M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 61.1M | 🔴 **+30%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 63.3M | 🔴 **+35%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.4M | ✅ | 27.9M | 🟢 **-23%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.2M | ✅ | 85.4M | 🔴 **+47%** |
| oneOf.json | oneOf with required | 4 | ✅ | 37.4M | ✅ | 25.4M | 🟢 **-32%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 31.7M | -17% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.8M | ✅ | 86.2M | 🔴 **+47%** |
| pattern.json | pattern validation | 8 | ✅ | 49.7M | ✅ | 70.9M | 🔴 **+43%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 56.3M | +19% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.7M | ✅ | 17.5M | 🟢 **-26%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 14.5M | -1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ✅ | 13.6M | -19% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 18.2M | -11% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.9M | ✅ | 21.3M | 🔴 **+34%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 58.5M | ✅ | 57.3M | -2% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 57.2M | ✅ | 77.5M | 🔴 **+35%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 67.9M | -14% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.8M | ✅ | 69.3M | -12% |
| properties.json | object properties validation | 6 | ✅ | 45.0M | ✅ | 52.6M | +17% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 11.4M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.8M | ✅ | 53.4M | 🔴 **+38%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ✅ | 23.9M | 🟢 **-44%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 58.1M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ✅ | 28.8M | +15% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.4M | ✅ | 41.0M | -1% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 16.2M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 130.7M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.8M | ✅ | 24.7M | 🟢 **-39%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.6M | ✅ | 30.4M | -15% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.5M | ✅ | 33.1M | -14% |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ✅ | 14.0M | 🟢 **-37%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.0M | ✅ | 28.8M | 🟢 **-35%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.7M | ✅ | 24.0M | 🟢 **-51%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.9M | ✅ | 25.4M | 🟢 **-33%** |
| ref.json | nested refs | 2 | ✅ | 45.5M | ✅ | 11.6M | 🟢 **-74%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.0M | ✅ | 30.0M | -12% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.7M | ✅ | 47.7M | +7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 28.7M | 🟢 **-36%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 119.8M | 🟢 **-25%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ✅ | 35.0M | 🟢 **-25%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 2.8M | 🟢 **-69%** |
| ref.json | refs with quote | 2 | ✅ | 44.8M | ✅ | 28.8M | 🟢 **-36%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.7M | ✅ | 10.4M | 🟢 **-61%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.9M | ✅ | 38.1M | -15% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ✅ | 10.0M | 🟢 **-70%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.8M | ✅ | 10.4M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.0M | ✅ | 42.9M | 🟢 **-23%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 54.1M | ✅ | 41.6M | 🟢 **-23%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 57.8M | ✅ | 38.0M | 🟢 **-34%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 45.3M | ✅ | 24.6M | 🟢 **-46%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 24.5M | 🟢 **-23%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.8M | ✅ | 28.7M | 🟢 **-36%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 44.7M | ✅ | 28.8M | 🟢 **-36%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.7M | ✅ | 27.7M | 🟢 **-38%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 27.7M | 🟢 **-38%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.7M | ✅ | 27.7M | 🟢 **-38%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ✅ | 27.8M | 🟢 **-36%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 56.7M | ✅ | 24.2M | 🟢 **-57%** |
| ref.json | ref to if | 2 | ✅ | 56.6M | ✅ | 37.4M | 🟢 **-34%** |
| ref.json | ref to then | 2 | ✅ | 56.1M | ✅ | 35.8M | 🟢 **-36%** |
| ref.json | ref to else | 2 | ✅ | 56.8M | ✅ | 39.0M | 🟢 **-31%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ✅ | 36.0M | 🟢 **-36%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 33.8M | 🟢 **-43%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 36.3M | 🟢 **-38%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 43.5M | 🟢 **-26%** |
| refRemote.json | remote ref | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 56.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.8M | ✅ | 80.9M | 🔴 **+53%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 121.4M | 🟢 **-24%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 121.0M | 🟢 **-24%** |
| required.json | required with escaped characters | 2 | ✅ | 41.9M | ✅ | 23.5M | 🟢 **-44%** |
| required.json | required properties whose names are J... | 7 | ✅ | 22.4M | ✅ | 35.4M | 🔴 **+58%** |
| type.json | integer type matches integers | 9 | ✅ | 46.1M | ✅ | 63.4M | 🔴 **+37%** |
| type.json | number type matches numbers | 9 | ✅ | 50.8M | ✅ | 68.2M | 🔴 **+34%** |
| type.json | string type matches strings | 9 | ✅ | 51.3M | ✅ | 68.3M | 🔴 **+33%** |
| type.json | object type matches objects | 7 | ✅ | 43.5M | ✅ | 57.7M | 🔴 **+33%** |
| type.json | array type matches arrays | 7 | ✅ | 47.7M | ✅ | 59.3M | 🔴 **+24%** |
| type.json | boolean type matches booleans | 10 | ✅ | 47.4M | ✅ | 63.7M | 🔴 **+34%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.3M | ✅ | 60.9M | 🔴 **+40%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ✅ | 64.8M | 🔴 **+36%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 85.1M | 🔴 **+45%** |
| type.json | type: array or object | 5 | ✅ | 50.3M | ✅ | 66.1M | 🔴 **+32%** |
| type.json | type: array, object or null | 5 | ✅ | 55.6M | ✅ | 79.2M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 79.5M | ✅ | 130.3M | 🔴 **+64%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.7M | ✅ | 80.0M | 🔴 **+58%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ✅ | 54.0M | -1% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.9M | ✅ | 45.1M | 🟢 **-35%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.9M | ✅ | 50.7M | +6% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 76.9M | ✅ | 67.9M | -12% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.9M | ✅ | 26.8M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.7M | ✅ | 37.4M | -18% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ✅ | 13.1M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.8M | ✅ | 70.7M | -11% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 70.3M | 🔴 **+233%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ✅ | 12.4M | +2% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ✅ | 23.9M | 🔴 **+54%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 33.7M | ✅ | 26.5M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ✅ | 12.2M | +9% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 41.1M | ✅ | 79.7M | 🔴 **+94%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 39.1M | ✅ | 34.9M | -11% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 42.5M | ✅ | 34.6M | -19% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 37.2M | ✅ | 58.1M | 🔴 **+56%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.9M | ✅ | 27.7M | +11% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.1M | ✅ | 12.2M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ✅ | 3.5M | 🟢 **-60%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ✅ | 5.9M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.8M | ✅ | 15.8M | -20% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.3M | ✅ | 129.5M | 🔴 **+50%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 73.6M | ✅ | 66.4M | -10% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ✅ | 15.3M | 🟢 **-29%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 34.4M | ✅ | 32.3M | -6% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.9M | ✅ | 130.7M | 🔴 **+147%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ✅ | 24.5M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.6M | ✅ | 25.0M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.9M | ✅ | 18.6M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.2M | ✅ | 15.1M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 130.2M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 17.6M | ✅ | 16.0M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 25.9M | ✅ | 15.6M | 🟢 **-40%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.0M | ✅ | 11.5M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.8M | ✅ | 56.4M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.2M | ✅ | 57.0M | 🔴 **+89%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ✅ | 5.6M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.5M | ✅ | 8.6M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ✅ | 10.8M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.7M | ✅ | 6.4M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ✅ | 7.5M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.4M | ✅ | 9.1M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.2M | ✅ | 11.3M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.9M | ✅ | 21.1M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 26.4M | ✅ | 15.0M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 26.3M | ✅ | 14.1M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ✅ | 15.3M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ✅ | 16.8M | 🟢 **-41%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 56.9M | 🔴 **+110%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 56.9M | 🔴 **+110%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.1M | ✅ | 14.1M | 🟢 **-39%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ✅ | 19.2M | 🟢 **-26%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ✅ | 14.2M | 🟢 **-28%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ✅ | 19.4M | 🔴 **+65%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.2M | ✅ | 13.9M | 🟢 **-43%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.5M | ✅ | 19.6M | 🟢 **-34%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 34.8M | ✅ | 21.3M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.1M | ✅ | 9.5M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 9.1M | 🟢 **-51%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 2.6M | 🟢 **-63%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.4M | ✅ | 116.9M | 🔴 **+73%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 48.2M | ✅ | 50.4M | +5% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.4M | ✅ | 21.5M | -15% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ✅ | 4.1M | 🟢 **-69%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ✅ | 12.3M | 🟢 **-42%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ✅ | 12.0M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 7.9M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 23.9M | -20% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 37.2M | ✅ | 29.6M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 145.5M | ✅ | 126.9M | -13% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 46.3M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.2M | ✅ | 42.1M | 🟢 **-26%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 48.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 58.9M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.3M | ✅ | 24.1M | 🟢 **-49%** |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 112.1M | 🔴 **+47%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 120.2M | 🔴 **+50%** |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 61.3M | 🔴 **+36%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 107.4M | 🔴 **+46%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ✅ | 59.7M | 🔴 **+38%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 107.7M | 🔴 **+47%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ✅ | 59.8M | 🔴 **+39%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 82.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.5M | ✅ | 69.4M | 🔴 **+27%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.7M | ✅ | 133.2M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.0M | ✅ | 31.0M | +7% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.1M | ✅ | 39.0M | +2% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.6M | ✅ | 47.0M | +5% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.4M | ✅ | 53.7M | 🔴 **+24%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.0M | ✅ | 35.2M | -5% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ✅ | 2.8M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.2M | ✅ | 68.5M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.6M | ✅ | 34.9M | 🔴 **+48%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 34.9M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 34.8M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 33.2M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.1M | ✅ | 35.0M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 35.1M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.7M | ✅ | 34.9M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.8M | ✅ | 37.1M | 🔴 **+63%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.5M | ✅ | 32.8M | 🔴 **+24%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ✅ | 11.7M | 🟢 **-27%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 16.3M | +18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 15.4M | +11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ✅ | 32.2M | 🔴 **+31%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.8M | ✅ | 27.0M | 🔴 **+44%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 19.9M | -10% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 13.0M | 🟢 **-34%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 15.5M | 🟢 **-22%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.1M | +14% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ✅ | 11.0M | 🔴 **+21%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ✅ | 16.0M | -18% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ✅ | 9.4M | 🟢 **-61%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.1M | ✅ | 24.5M | +2% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.8M | ✅ | 13.9M | 🟢 **-62%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.7M | ✅ | 125K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ✅ | 34.8M | -1% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.2M | ✅ | 17.3M | +7% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.9M | ✅ | 34.8M | 🔴 **+20%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 66.1M | ✅ | 932K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.4M | ✅ | 42.0M | 🔴 **+22%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.7M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ✅ | 18.9M | 🔴 **+24%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-23%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.6M | ✅ | 15.7M | +8% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 21.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.3M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.4M | ✅ | 24.7M | 🟢 **-32%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 56.8M | ✅ | 60.2M | +6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.5M | ✅ | 33.5M | 🔴 **+27%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 10.1M | 🟢 **-38%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.3M | ✅ | 28.6M | 🟢 **-35%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.8M | ✅ | 28.7M | 🟢 **-33%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.4M | ✅ | 27.2M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 56.6M | ✅ | 37.5M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.3M | ✅ | 27.1M | 🟢 **-39%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.8M | ✅ | 24.2M | -3% |
